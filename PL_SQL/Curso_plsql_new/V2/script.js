/* ============================================================
   LÓGICA DE LA PÁGINA
   Todo el contenido viene de data.js. Este archivo solo se
   encarga de renderizarlo e interactuar con el usuario.
   ============================================================ */

const STORAGE_KEY = "curso-plsql-progreso";

function getModulo(id) {
  return MODULOS.find((m) => m.id === id);
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    /* almacenamiento no disponible: seguimos sin persistencia */
  }
}

let progress = loadProgress();
let activeFilter = "all";
let searchTerm = "";

/* ---------------- WhatsApp link ---------------- */
document.getElementById("wa-link").href = CURSO.whatsapp;

/* ---------------- Terminal hero ---------------- */
function typeTerminal() {
  const query = `SELECT * FROM curso WHERE nombre = '${CURSO.titulo}';`;
  const el = document.getElementById("typed-query");
  const cursor = document.getElementById("cursor");
  const table = document.getElementById("result-table");
  const meta = document.getElementById("result-meta");
  let i = 0;

  function step() {
    if (i <= query.length) {
      el.textContent = query.slice(0, i);
      i++;
      setTimeout(step, 22);
    } else {
      cursor.style.display = "none";
      setTimeout(() => {
        table.classList.add("show");
        meta.textContent = `5 filas seleccionadas.`;
      }, 200);
    }
  }
  step();
}

/* ---------------- Timeline (signature element) ---------------- */
function renderLegend() {
  const legend = document.getElementById("timeline-legend");
  legend.innerHTML = MODULOS.map(
    (m) => `
      <span class="item">
        <span class="swatch" style="background:${m.color}"></span>${m.nombre}
      </span>`
  ).join("");
}

function renderTimeline() {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = SEMANAS.map((s) => {
    const mod = getModulo(s.modulo);
    const isExam = s.modulo === "ex";
    const isDone = !!progress[s.semana];
    return `
      <button
        class="tl-cell ${isExam ? "is-exam" : ""} ${isDone ? "is-done" : ""}"
        data-semana="${s.semana}"
        title="Semana ${s.semana}: ${s.titulo} (${mod.nombre})"
      >
        <div class="n">S${String(s.semana).padStart(2, "0")}</div>
        <div class="bar" style="background:${mod.color}"></div>
        <div class="lbl">${s.titulo}</div>
      </button>`;
  }).join("");

  timeline.querySelectorAll(".tl-cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      const semana = parseInt(cell.getAttribute("data-semana"), 10);
      // R10: el examen se deriva del modulo, no de un numero de semana fijo
      const info = SEMANAS.find((x) => x.semana === semana);
      if (info && info.modulo === "ex") {
        if (typeof openExamModal === "function") openExamModal();
        return;
      }
      if (getWeekSlides(semana).length > 0) {
        openSlideModal(semana);
      } else {
        const target = document.querySelector(`[data-week-anchor="${semana}"]`);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
}

/* ---------------- Filtros y búsqueda ---------------- */
function renderFilters() {
  const group = document.getElementById("filter-group");
  const opciones = [{ id: "all", nombre: "Todas" }, ...MODULOS];
  group.innerHTML = opciones
    .map(
      (m) => `
      <button class="filter-btn ${activeFilter === m.id ? "active" : ""}" data-filter="${m.id}">
        ${m.nombre}
      </button>`
    )
    .join("");

  group.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter");
      renderFilters();
      renderWeeks();
    });
  });
}

document.getElementById("search-input").addEventListener("input", (e) => {
  searchTerm = e.target.value.trim().toLowerCase();
  renderWeeks();
});

/* ---------------- Tarjetas de semanas ---------------- */
function matchesSearch(semana) {
  if (!searchTerm) return true;
  // Se indexa tambien el titulo, objetivo y temas de los ejercicios
  const textoEjercicios = exercisesFor(semana.semana)
    .map((e) => e.titulo + " " + e.objetivo + " " + (e.temas || []).join(" "))
    .join(" ");
  const haystack = (
    semana.titulo +
    " " +
    semana.descripcion +
    " " +
    semana.temas.join(" ") +
    " " +
    textoEjercicios
  ).toLowerCase();
  return haystack.includes(searchTerm);
}

function renderWeeks() {
  const container = document.getElementById("modules-groups");
  const modulosAMostrar = activeFilter === "all" ? MODULOS : MODULOS.filter((m) => m.id === activeFilter);

  let html = "";
  let totalVisible = 0;

  modulosAMostrar.forEach((mod) => {
    const semanasDelModulo = SEMANAS.filter((s) => s.modulo === mod.id && matchesSearch(s));
    if (semanasDelModulo.length === 0) return;
    totalVisible += semanasDelModulo.length;

    html += `
      <div>
        <div class="module-block-title">
          <span class="swatch" style="background:${mod.color}"></span>
          <h3>${mod.nombre}</h3>
          <span class="count">${semanasDelModulo.length} semana(s)</span>
        </div>
        <div class="week-grid">
          ${semanasDelModulo.map((s) => weekCardHtml(s, mod)).join("")}
        </div>
      </div>`;
  });

  if (totalVisible === 0) {
    // R7: searchTerm viene del usuario, siempre escapado antes de innerHTML
    html = `<div class="week-grid"><div class="empty-state">No se encontraron semanas para "${escapeHtml(
      searchTerm
    )}".</div></div>`;
  }

  container.innerHTML = html;
  attachWeekCardEvents();
  updateProgressUI();
}

function weekCardHtml(s, mod) {
  const isDone = !!progress[s.semana];
  const isExam = s.modulo === "ex";
  const hasSlides = getWeekSlides(s.semana).length > 0;
  return `
    <div class="week-card ${isDone ? "done" : ""}" data-week-anchor="${s.semana}">
      <div class="week-card-top">
        <span class="week-tag" style="background:${mod.color}22; color:${mod.color}">
          Semana ${s.semana}
        </span>
      </div>
      <h4>${s.titulo}</h4>
      <p class="week-desc">${s.descripcion}</p>
      <button class="expand" data-toggle="${s.semana}">Ver temas puntuales</button>
      <ul class="week-topics" data-topics="${s.semana}">
        ${s.temas.map((t) => `<li>${t}</li>`).join("")}
      </ul>
      <div class="week-actions">
        ${
          isExam
            ? `<button class="btn btn-primary btn-sm" data-open-exam="1">Ir al examen final</button>` +
              (hasSlides
                ? `<button class="btn btn-ghost btn-sm" data-open-slides="${s.semana}">Simulacro de práctica</button>`
                : "")
            : hasSlides
            ? `<button class="btn btn-primary btn-sm" data-open-slides="${s.semana}">Ver clase (diapositivas)</button>`
            : ""
        }
      </div>
      <label class="done-toggle">
        <input type="checkbox" data-check="${s.semana}" ${isDone ? "checked" : ""} />
        Marcar como completada
      </label>
    </div>`;
}

function attachWeekCardEvents() {
  document.querySelectorAll("[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-toggle");
      const list = document.querySelector(`[data-topics="${id}"]`);
      const open = list.classList.toggle("open");
      btn.textContent = open ? "Ocultar temas" : "Ver temas puntuales";
    });
  });

  document.querySelectorAll("[data-check]").forEach((chk) => {
    chk.addEventListener("change", () => {
      const id = chk.getAttribute("data-check");
      if (chk.checked) {
        progress[id] = true;
      } else {
        delete progress[id];
      }
      saveProgress(progress);
      chk.closest(".week-card").classList.toggle("done", chk.checked);
      renderTimeline();
      updateProgressUI();
    });
  });

  document.querySelectorAll("[data-open-slides]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wk = parseInt(btn.getAttribute("data-open-slides"), 10);
      openSlideModal(wk);
    });
  });

  document.querySelectorAll("[data-open-exam]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof openExamModal === "function") openExamModal();
    });
  });
}

function updateProgressUI() {
  const total = SEMANAS.length;
  const done = Object.keys(progress).length;
  document.getElementById("progress-label").textContent = `${done} / ${total} semanas`;
  document.getElementById("progress-fill").style.width = `${(done / total) * 100}%`;
}

/* ---------------- Bibliografía ---------------- */
function renderBiblio() {
  const grid = document.getElementById("biblio-grid");
  grid.innerHTML = BIBLIOGRAFIA.map(
    (b) => `
      <div class="biblio-card">
        <h4>${b.titulo}</h4>
        <div class="autor">${b.autor}</div>
        <div class="editorial">${b.editorial}</div>
      </div>`
  ).join("");
}

/* ============================================================
   MARKDOWN LIGERO -> HTML
   Soporta lo que genera weeks-content.js: encabezados (## a #####),
   negritas **texto**, listas "- item", bloques ```sql ... ```
   y enlaces [LINK]texto|url[/LINK].
   ============================================================ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMarkdown(md) {
  if (!md) return "";

  // Extraer bloques de código primero para no procesarlos como texto normal
  const codeBlocks = [];
  let working = md.replace(/```sql\n([\s\S]*?)```/g, (m, code) => {
    codeBlocks.push(code.trim());
    return `@@CODEBLOCK${codeBlocks.length - 1}@@`;
  });

  // Enlaces [LINK]texto|url[/LINK]
  working = working.replace(/\[LINK\](.*?)\|(.*?)\[\/LINK\]/g, (m, text, url) => {
    return `@@LINK@@${encodeURIComponent(text)}@@${encodeURIComponent(url)}@@`;
  });

  const lines = working.split("\n");
  let html = "";
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (let raw of lines) {
    const line = raw.trim();
    if (line === "") {
      closeList();
      continue;
    }
    if (/^@@CODEBLOCK\d+@@$/.test(line)) {
      closeList();
      const idx = parseInt(line.match(/\d+/)[0], 10);
      html += `<pre class="md-code"><code>${escapeHtml(codeBlocks[idx])}</code></pre>`;
      continue;
    }
    let m;
    if ((m = line.match(/^#####\s+(.*)/))) {
      closeList();
      html += `<h5>${inlineMd(m[1])}</h5>`;
    } else if ((m = line.match(/^####\s+(.*)/))) {
      closeList();
      html += `<h4>${inlineMd(m[1])}</h4>`;
    } else if ((m = line.match(/^###\s+(.*)/))) {
      closeList();
      html += `<h3>${inlineMd(m[1])}</h3>`;
    } else if ((m = line.match(/^##\s+(.*)/))) {
      closeList();
      html += `<h2>${inlineMd(m[1])}</h2>`;
    } else if ((m = line.match(/^-\s+(.*)/))) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineMd(m[1])}</li>`;
    } else {
      closeList();
      html += `<p>${inlineMd(line)}</p>`;
    }
  }
  closeList();
  return html;
}

function inlineMd(text) {
  let t = escapeHtml(text);
  // restaurar marcadores de link (fueron encodeURIComponent antes del escape de <>&, son seguros)
  t = t.replace(/@@LINK@@(.*?)@@(.*?)@@/g, (m, encText, encUrl) => {
    const linkText = decodeURIComponent(encText);
    const url = decodeURIComponent(encUrl);
    // Solo esquemas seguros: descarta javascript:, data:, vbscript:
    const seguro = /^(https?:\/\/|mailto:|#|\.{0,2}\/)/i.test(url);
    if (!seguro) return escapeHtml(linkText);
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="md-link">${escapeHtml(
      linkText
    )} ↗</a>`;
  });
  t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  return t;
}

/* ============================================================
   EJERCICIOS PROPUESTOS -> DIAPOSITIVAS
   Se generan desde WEEK_EXERCISES y DATASETS en lugar de
   escribirse a mano en weeks-content.js, para poder validarlos
   y reutilizar el dataset entre las semanas que lo comparten.
   ============================================================ */
const NIVEL_LABEL = {
  guiado: "Guiado · con solución",
  propuesto: "Propuesto · sin solución",
  reto: "Reto · sin solución",
};

function exercisesFor(semana) {
  if (typeof WEEK_EXERCISES === "undefined") return [];
  return WEEK_EXERCISES[semana] || WEEK_EXERCISES[String(semana)] || [];
}

function datasetFor(clave) {
  if (!clave || typeof DATASETS === "undefined") return null;
  return DATASETS[clave] || null;
}

/* Diapositiva de portada: que se practica esta semana */
function exerciseIndexSlide(semana, ejercicios) {
  const claves = [...new Set(ejercicios.map((e) => e.dataset).filter(Boolean))];
  const ds = claves.map((c) => datasetFor(c)).filter(Boolean);

  let md = `### Ejercicios de esta semana\n\n`;
  md += `Cada ejercicio trae su enunciado, sus criterios de aceptación y el esquema sobre el que se ejecuta. Los de nivel **guiado** incluyen la solución; los **propuestos** y los **retos** no, a propósito.\n\n`;

  ejercicios.forEach((e, i) => {
    md += `- **${i + 1}. ${e.titulo}** — ${NIVEL_LABEL[e.nivel] || e.nivel}. ${e.objetivo}\n\n`;
  });

  if (ds.length) {
    md += `#### Antes de empezar\n\n`;
    ds.forEach((d) => {
      md += `- Siembra el dataset **${d.nombre}** (${d.tablas.length} tablas). Está en la diapositiva siguiente.\n\n`;
    });
    md += `Si ya lo sembraste en una semana anterior, no lo repitas: el DDL borra y vuelve a crear las tablas, y perderías lo que hayas hecho sobre ellas.\n\n`;
  } else {
    md += `#### Nota\n\n- Los ejercicios de esta semana **requieren privilegios de administrador** y no usan un dataset de práctica. Si trabajas contra una base compartida, entrégalos como scripts documentados sin ejecutarlos.\n\n`;
  }
  return { title: "Ejercicios propuestos", subtitle: null, type: "exercise", md };
}

/* Diapositiva del dataset: DDL, datos y verificacion */
function datasetSlide(d, necesitaMasivo) {
  let md = `### ${d.nombre}\n\n${d.descripcion}\n\n`;
  md += `Tablas: ${d.tablas.map((t) => "`" + t + "`").join(", ")}\n\n`;
  md += `#### 1. Estructura (DDL)\n\nCorre limpio dos veces seguidas: empieza borrando lo que pudiera existir.\n\n${d.ddl}\n\n`;
  md += `#### 2. Datos\n\n${d.seed}\n\n`;
  if (d.seedMasivo) {
    md += `#### 3. Volumen adicional${necesitaMasivo ? "" : " (opcional)"}\n\n`;
    md += necesitaMasivo
      ? `Los ejercicios de esta semana **lo necesitan**: con pocas filas no se nota ninguna diferencia.\n\n`
      : `Solo si quieres probar con volumen. Tarda un poco.\n\n`;
    md += `${d.seedMasivo}\n\n`;
  }
  md += `#### ${d.seedMasivo ? "4" : "3"}. Verificación\n\nComprueba que sembraste bien antes de empezar.\n\n${d.verificacion}`;

  return {
    title: `Dataset: ${d.nombre}`,
    subtitle: "DDL, datos y verificación",
    type: "code",
    md,
  };
}

/* Una diapositiva por ejercicio */
function exerciseSlide(e, indice) {
  let md = `#### Objetivo\n\n${e.objetivo}\n\n${e.enunciado}\n\n`;

  md += `#### Criterios de aceptación\n\n`;
  e.requisitos.forEach((r) => {
    md += `- ${r}\n\n`;
  });

  if (e.pistas && e.pistas.length) {
    md += `#### Pistas\n\n`;
    e.pistas.forEach((p) => {
      md += `- ${p}\n\n`;
    });
  }

  if (e.resultadoEsperado) {
    md += `#### Resultado esperado\n\n${e.resultadoEsperado}\n\n`;
  }

  if (e.solucion) {
    md += `#### Solución\n\n${e.solucion}`;
  } else {
    md += `#### Solución\n\nEste ejercicio no trae solución escrita, y es deliberado: los criterios de aceptación de arriba te permiten verificar tu propia respuesta. Si tuviera la solución aquí, la leerías antes de intentarlo.`;
  }

  const ds = datasetFor(e.dataset);
  return {
    title: `Ejercicio ${indice}: ${e.titulo}`,
    subtitle: `${NIVEL_LABEL[e.nivel] || e.nivel}${ds ? " · dataset " + ds.nombre : " · requiere privilegios DBA"}`,
    type: "exercise",
    md,
  };
}

function buildExerciseSlides(semana) {
  const ejercicios = exercisesFor(semana);
  if (!ejercicios.length) return [];

  const slides = [exerciseIndexSlide(semana, ejercicios)];

  const claves = [...new Set(ejercicios.map((e) => e.dataset).filter(Boolean))];
  claves.forEach((c) => {
    const d = datasetFor(c);
    if (!d) return;
    const necesitaMasivo = ejercicios.some(
      (e) => e.dataset === c && /volumen adicional|seedMasivo/i.test(e.enunciado || "")
    );
    slides.push(datasetSlide(d, necesitaMasivo));
  });

  ejercicios.forEach((e, i) => slides.push(exerciseSlide(e, i + 1)));
  return slides;
}

/* Mazo completo de una semana: contenido de clase + ejercicios generados */
function getWeekSlides(semana) {
  const base = (typeof WEEKS_CONTENT !== "undefined" && WEEKS_CONTENT[semana]) || [];
  return base.concat(buildExerciseSlides(semana));
}

/* ============================================================
   VISOR DE DIAPOSITIVAS (modal)
   ============================================================ */
const SLIDE_TYPE_LABEL = {
  intro: "Introducción",
  content: "Teoría",
  theory: "Teoría",
  code: "Código",
  exercise: "Ejercicio",
};

let slideState = { semana: null, index: 0 };

function openSlideModal(semana) {
  const slides = getWeekSlides(semana);
  if (!slides || slides.length === 0) return;
  slideState = { semana, index: 0 };
  const semanaInfo = SEMANAS.find((s) => s.semana === semana);
  document.getElementById("slide-modal-eyebrow").textContent = semanaInfo
    ? `Semana ${semana} · ${getModulo(semanaInfo.modulo).nombre}`
    : `Semana ${semana}`;
  renderSlide();
  document.getElementById("slide-modal").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeSlideModal() {
  document.getElementById("slide-modal").hidden = true;
  document.body.style.overflow = "";
}

function renderSlide() {
  const slides = getWeekSlides(slideState.semana);
  const slide = slides[slideState.index];
  document.getElementById("slide-modal-title").textContent = slide.title;
  const bodyEl = document.getElementById("slide-modal-body");
  const typeLabel = SLIDE_TYPE_LABEL[slide.type] || "Contenido";
  bodyEl.innerHTML = `
    <span class="slide-type-badge slide-type-${slide.type}">${typeLabel}</span>
    ${slide.subtitle ? `<p class="slide-subtitle">${escapeHtml(slide.subtitle)}</p>` : ""}
    <div class="md-content">${renderMarkdown(slide.md)}</div>
  `;
  document.getElementById("slide-counter").textContent = `${slideState.index + 1} / ${slides.length}`;
  document.getElementById("slide-prev").disabled = slideState.index === 0;
  document.getElementById("slide-next").disabled = slideState.index === slides.length - 1;
  bodyEl.scrollTop = 0;
}

document.getElementById("slide-modal-close").addEventListener("click", closeSlideModal);
document.getElementById("slide-modal").addEventListener("click", (e) => {
  if (e.target.id === "slide-modal") closeSlideModal();
});
document.getElementById("slide-prev").addEventListener("click", () => {
  if (slideState.index > 0) {
    slideState.index--;
    renderSlide();
  }
});
document.getElementById("slide-next").addEventListener("click", () => {
  const slides = getWeekSlides(slideState.semana);
  if (slideState.index < slides.length - 1) {
    slideState.index++;
    renderSlide();
  }
});
document.addEventListener("keydown", (e) => {
  if (document.getElementById("slide-modal").hidden) return;
  if (e.key === "Escape") closeSlideModal();
  if (e.key === "ArrowLeft") document.getElementById("slide-prev").click();
  if (e.key === "ArrowRight") document.getElementById("slide-next").click();
});

/* ---------------- Init ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  typeTerminal();
  renderLegend();
  renderTimeline();
  renderFilters();
  renderWeeks();
  renderBiblio();
});
