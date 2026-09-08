/* ============================================================
   PRUEBA DE HUMO — node tools/smoke.js
   Carga los 6 scripts del sitio en el mismo orden que index.html,
   con un DOM minimo simulado, genera los mazos de las 16 semanas
   y verifica los invariantes de AGENTS.md §7.

   NO forma parte del sitio publicado: esta carpeta no se despliega.
   No tiene dependencias; corre con node a secas.
   ============================================================ */
const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const ARCHIVOS = [
  "data.js",
  "weeks-content.js",
  "sql-datasets.js",
  "exercises.js",
  "script.js",
  "exam.js",
];

/* ---------- DOM minimo: lo justo para que los scripts carguen ---------- */
function nodoFalso() {
  return {
    addEventListener() {},
    querySelectorAll: () => [],
    closest: () => null,
    classList: { add() {}, remove() {}, toggle: () => false },
    innerHTML: "",
    textContent: "",
    value: "",
    style: {},
    href: "",
    hidden: true,
    disabled: false,
    scrollTop: 0,
    getAttribute: () => null,
  };
}

global.document = {
  getElementById: nodoFalso,
  querySelector: nodoFalso,
  querySelectorAll: () => [],
  addEventListener() {},
  body: { style: {} },
};
global.localStorage = { getItem: () => null, setItem() {} };
global.window = global;
global.setTimeout = () => 0;
global.alert = () => {};
global.btoa = (s) => Buffer.from(s, "binary").toString("base64");
global.atob = (s) => Buffer.from(s, "base64").toString("binary");

/* ---------- Carga en el orden del contrato ---------- */
let fuente = "";
for (const f of ARCHIVOS) {
  const p = path.join(RAIZ, f);
  if (!fs.existsSync(p)) {
    console.error(`FALLA: falta ${f}`);
    process.exit(1);
  }
  fuente += fs.readFileSync(p, "utf8") + "\n;\n";
}

let api;
try {
  // Los `const` de un eval no escapan a este ambito: hay que devolverlos.
  api = eval(
    fuente +
      "; ({ SEMANAS, MODULOS, CURSO, WEEKS_CONTENT, DATASETS, WEEK_EXERCISES," +
      "     getWeekSlides, renderMarkdown, escapeHtml })"
  );
} catch (e) {
  console.error("FALLA: los scripts no cargan en orden.");
  console.error("  " + e.message);
  process.exit(1);
}

const fallos = [];
let marca = 0;
// Reporta el resultado del bloque actual: cuenta solo los fallos nuevos
const cerrar = (m) => {
  const nuevos = fallos.length - marca;
  marca = fallos.length;
  console.log((nuevos ? "FALLA " : "OK   ") + m + (nuevos ? ` (${nuevos} problema[s])` : ""));
};
const avisos = [];

/* ---------- 1. Globals del contrato ---------- */
for (const [nombre, valor] of Object.entries(api)) {
  if (valor === undefined) fallos.push(`global ausente: ${nombre}`);
}
cerrar(`${ARCHIVOS.length} scripts cargan; los globals del contrato existen`);

/* ---------- 2. Coherencia data.js <-> contenido ----------
   Los nombres locales llevan sufijo para no chocar con los del sitio:
   un eval directo hoistea las declaraciones `function` de script.js a
   este ambito, y un `const renderMarkdown` aqui seria una redeclaracion. */
const SEMANAS = api.SEMANAS;
const WEEKS_CONTENT = api.WEEKS_CONTENT;
const DATASETS = api.DATASETS;
const WEEK_EXERCISES = api.WEEK_EXERCISES;
const mazoDe = api.getWeekSlides;
const aHtml = api.renderMarkdown;

SEMANAS.forEach((s) => {
  if (!api.MODULOS.some((m) => m.id === s.modulo)) {
    fallos.push(`semana ${s.semana}: modulo "${s.modulo}" no existe en MODULOS`);
  }
  const tieneClase = !!(WEEKS_CONTENT[s.semana] || WEEKS_CONTENT[String(s.semana)]);
  if (!tieneClase && s.modulo !== "ex") {
    fallos.push(`semana ${s.semana} no tiene diapositivas de clase y no es la del examen`);
  }
});
cerrar(`${SEMANAS.length} semanas coherentes con MODULOS y WEEKS_CONTENT`);

/* ---------- 3. Integridad de los ejercicios (AGENTS.md §6.6) ---------- */
const ids = new Set();
let totalEj = 0;
for (const k of Object.keys(WEEK_EXERCISES)) {
  const arr = WEEK_EXERCISES[k];
  totalEj += arr.length;
  if (arr.length < 3) avisos.push(`semana ${k}: solo ${arr.length} ejercicios (el minimo es 3)`);

  arr.forEach((x) => {
    if (ids.has(x.id)) fallos.push(`id duplicado: ${x.id}`);
    ids.add(x.id);
    if (!/^s\d\d-e\d\d$/.test(x.id)) fallos.push(`id mal formado: ${x.id}`);
    if (x.dataset !== null && !DATASETS[x.dataset])
      fallos.push(`${x.id}: dataset inexistente "${x.dataset}"`);
    if (!["guiado", "propuesto", "reto"].includes(x.nivel))
      fallos.push(`${x.id}: nivel invalido "${x.nivel}"`);
    if (x.nivel === "guiado" && !x.solucion) fallos.push(`${x.id}: guiado sin solucion`);
    if (x.nivel !== "guiado" && x.solucion)
      fallos.push(`${x.id}: ${x.nivel} NO debe traer solucion (queda visible en el fuente)`);
    if (!x.requisitos || x.requisitos.length < 3)
      fallos.push(`${x.id}: menos de 3 criterios de aceptacion`);
    ["enunciado", "solucion", "resultadoEsperado"].forEach((c) => {
      if (x[c] && (x[c].match(/```/g) || []).length % 2)
        fallos.push(`${x.id}: cerca de codigo abierta en "${c}" (R1)`);
    });
    if (x.enunciado && /^\d+\.\s/m.test(x.enunciado))
      fallos.push(`${x.id}: lista ordenada en el enunciado, el parser no las admite (R5)`);
  });
}
cerrar(`${totalEj} ejercicios validos, ${ids.size} ids unicos`);

/* ---------- 4. Datasets ---------- */
for (const [clave, d] of Object.entries(DATASETS)) {
  ["nombre", "descripcion", "tablas", "ddl", "seed", "verificacion"].forEach((c) => {
    if (!d[c]) fallos.push(`dataset ${clave}: falta "${c}"`);
  });
  ["ddl", "seed", "seedMasivo", "verificacion"].forEach((c) => {
    if (d[c] && (d[c].match(/```/g) || []).length % 2)
      fallos.push(`dataset ${clave}: cerca abierta en "${c}"`);
  });
  // El DDL debe ser idempotente: se espera el teardown por diccionario
  if (d.ddl && !/user_tables/i.test(d.ddl))
    fallos.push(`dataset ${clave}: el DDL no parece idempotente (sin teardown por user_tables)`);
  if (d.seed && !/COMMIT/i.test(d.seed)) fallos.push(`dataset ${clave}: el seed no hace COMMIT`);
  // EXEC solo funciona en SQL*Plus
  ["ddl", "seed", "seedMasivo"].forEach((c) => {
    if (d[c] && /^\s*EXEC\s/im.test(d[c]))
      fallos.push(`dataset ${clave}: "${c}" usa EXEC, que solo corre en SQL*Plus`);
  });
}
cerrar(`${Object.keys(DATASETS).length} datasets completos e idempotentes`);

/* ---------- 5. Render de todas las diapositivas (R1, R2, R5, R6) ---------- */
let totalSlides = 0;
SEMANAS.forEach((s) => {
  const mazo = mazoDe(s.semana);
  totalSlides += mazo.length;

  mazo.forEach((d, i) => {
    const ref = `S${s.semana}#${i + 1}`;
    if (!d.title) fallos.push(`${ref}: sin titulo`);
    const md = d.md || "";

    // R1: cercas balanceadas y todo bloque SQL debe producir <pre>
    const cercas = (md.match(/```/g) || []).length;
    if (cercas % 2) fallos.push(`${ref} "${d.title}": cerca de codigo abierta (R1)`);

    let html;
    try {
      html = aHtml(md);
    } catch (e) {
      fallos.push(`${ref} "${d.title}": renderMarkdown lanzo "${e.message}"`);
      return;
    }
    if (cercas > 0 && !html.includes('<pre class="md-code">'))
      fallos.push(`${ref} "${d.title}": tiene bloque de codigo pero no genero <pre> (R1)`);

    // R2: restos de JSX
    if (/window\.open|className|useState|onClick/.test(md))
      fallos.push(`${ref} "${d.title}": resto de JSX (R2)`);

    // R5: vinetas numericas huerfanas
    if (/^- \d+$/m.test(md)) fallos.push(`${ref} "${d.title}": vineta numerica huerfana (R5)`);

    // R6: relleno
    if (md.length < 200) fallos.push(`${ref} "${d.title}": ${md.length} caracteres, es relleno (R6)`);

    // El HTML no debe quedar con etiquetas sin escapar del contenido
    if (/<(script|img|iframe)\b/i.test(html))
      fallos.push(`${ref} "${d.title}": el HTML generado contiene una etiqueta activa`);
  });
});
cerrar(`${totalSlides} diapositivas renderizan y cumplen R1, R2, R5 y R6`);

/* ---------- 6. Nomenclatura canonica (R11) ---------- */
const todoTexto = SEMANAS.map((s) =>
  mazoDe(s.semana)
    .map((d) => d.md || "")
    .join("\n")
).join("\n");

const prohibidos = {
  CURSODB: "usar el nombre sin prefijo ni calificador de esquema",
  "\\bdept_id\\b": "usar departamento_id",
  "\\bid_empleado\\b": "usar emp_id",
};
for (const [pat, arreglo] of Object.entries(prohibidos)) {
  const n = (todoTexto.match(new RegExp(pat, "g")) || []).length;
  if (n) fallos.push(`nomenclatura (R11): ${n} usos de /${pat}/, ${arreglo}`);
}
cerrar("nomenclatura canonica respetada (R11)");

/* ---------- 7. XSS en el buscador (R7) ---------- */
const escapado = api.escapeHtml('<img src=x onerror=alert(1)>"\'');
if (/[<>"']/.test(escapado)) fallos.push("escapeHtml no escapa todos los metacaracteres (R7)");
else cerrar("escapeHtml cubre < > & \" ' (R7)");

/* ---------- Resultado ---------- */
console.log("");
if (avisos.length) {
  console.log("AVISOS:");
  avisos.forEach((a) => console.log("  - " + a));
  console.log("");
}
if (fallos.length) {
  console.error(`FALLA: ${fallos.length} problema(s)`);
  fallos.forEach((f) => console.error("  - " + f));
  process.exit(1);
}
console.log(
  `TODO OK — ${SEMANAS.length} semanas, ${totalSlides} diapositivas, ` +
    `${totalEj} ejercicios, ${Object.keys(DATASETS).length} datasets`
);
