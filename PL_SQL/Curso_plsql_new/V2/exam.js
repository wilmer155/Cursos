/* ============================================================
   EXAMEN FINAL — PL/SQL
   Portado del componente original (examen-final-slides.tsx).
   Se conserva la misma lógica de acceso por clave y de
   calificación automática basada en reglas sobre el código
   entregado (no es una IA externa: son validaciones de texto).

   NOTA DE SEGURIDAD: la clave del examen y la clave del docente
   quedan visibles en este archivo (ofuscadas con un cifrado muy
   simple, igual que en el original). Cualquiera que revise el
   código fuente de la página puede obtenerlas. Se mantiene así
   a pedido explícito, pero si este repositorio es público, esas
   claves NO deben considerarse secretas.
   ============================================================ */

/* ---------------- "Cifrado" (idéntico al original) ---------------- */
function encryptPassword(password) {
  let encrypted = "";
  const shift = 5;
  for (let i = 0; i < password.length; i++) {
    encrypted += String.fromCharCode(password.charCodeAt(i) + shift);
  }
  return btoa(encrypted);
}

function decryptPassword(encryptedPassword) {
  try {
    const decoded = atob(encryptedPassword);
    let decrypted = "";
    const shift = 5;
    for (let i = 0; i < decoded.length; i++) {
      decrypted += String.fromCharCode(decoded.charCodeAt(i) - shift);
    }
    return decrypted;
  } catch (e) {
    return "";
  }
}

const CORRECT_PASSWORD = "CurPlSql2025.+-*";
const CORRECT_PASSWORD_ENCRYPTED = encryptPassword(CORRECT_PASSWORD);

const TEACHER_KEY = "pl2025+-";
const TEACHER_KEY_ENCRYPTED = encryptPassword(TEACHER_KEY);

/* ---------------- Estado del examen ---------------- */
const examState = {
  authenticated: false,
  teacherKeyValid: false,
  slideIndex: 0,
};

/* ---------------- Contenido informativo (diapositivas) ---------------- */
const EXAM_SLIDES = [
  {
    type: "intro",
    title: "Examen Final PL/SQL",
    md: `## Evaluación Integral PL/SQL

Evaluación de conocimientos de las semanas 2, 3, 5, 6, 7, 8 y 9

### 📋 Instrucciones del Examen

- **Duración:** 2 horas
- **Modalidad:** Práctica en Oracle
- **Puntaje:** 100 puntos total
- **Aprobación:** 60 puntos mínimo
- **Material:** Solo documentación Oracle oficial

### ⚠️ Criterios de Evaluación

- **Sintaxis correcta:** 30%
- **Lógica de negocio:** 25%
- **Manejo de errores:** 20%
- **Optimización:** 15%
- **Buenas prácticas:** 10%`,
  },
  {
    type: "content",
    title: "Pregunta 1: Sistema de Análisis de Productos (35 puntos)",
    md: `### Ejercicio Unificado: Sistema de Análisis de Productos

Escriba un bloque PL/SQL completo que:

#### Requerimientos del ejercicio:

- Muestre por consola el total de lotes que tiene un producto específico por nombre
- Clasifique TODOS los productos por peso usando estructura CASE
- Use variables con %TYPE para compatibilidad
- Implemente estructura IF-THEN-ELSE para validaciones
- Use cursor FOR LOOP para recorrer productos
- Maneje excepciones apropiadamente
- Use DBMS_OUTPUT para mostrar todos los resultados

#### 💡 Especificaciones técnicas:

- Tablas: \`TBL_LOTES\`, \`TBL_PRODUCTOS\`
- Campos: \`COD_PRODUCTO\`, \`NOMBRE\`, \`PESOXUNIDAD\`
- Clasificación: Liviano (menor a 1), Medio (1 a 5), Pesado (mayor a 5)
- Use \`COUNT(*)\` para contar lotes
- Muestre contadores por categoría de peso
- Implemente manejo completo de excepciones`,
  },
  {
    type: "content",
    title: "Pregunta 2: Cursores Explícitos (15 puntos)",
    md: `### Cursores Explícitos

Implemente un cursor que recorra todos los lotes próximos a vencer (30 días).

#### Debe incluir:

- Declaración del cursor con parámetros
- Manejo de atributos %FOUND, %NOTFOUND
- Loop manual (no FOR loop)
- Contador de registros procesados
- JOIN con TBL_PRODUCTOS para mostrar nombres
- Cálculo de días restantes hasta vencimiento

#### 🔍 Conceptos a evaluar:

- **CURSOR:** Declaración con SELECT
- **OPEN/FETCH/CLOSE:** Ciclo de vida
- **%ROWCOUNT:** Contador de filas
- **FECHA_VENCIMIENTO:** Comparación con SYSDATE`,
  },
  {
    type: "content",
    title: "Pregunta 3: Paquete Completo de Inventario (50 puntos)",
    md: `### Paquete PKG_INVENTARIO Completo

Diseñe e implemente un paquete completo \`PKG_INVENTARIO\` que contenga tanto la especificación como el cuerpo, incluyendo procedimientos y funciones integrados.

#### El paquete debe contener:

- **Constante:** STOCK_MINIMO (valor 10)
- **Excepción personalizada:** stock_insuficiente
- **Función:** obtener_stock_disponible(p_cod_producto)
- **Función:** calcular_peso_pedido(p_cod_orden) — que calcule peso total
- **Procedimiento:** actualizar_inventario_entrada(p_cod_producto, p_cantidad, p_resultado OUT)
- **Procedimiento:** generar_reporte_inventario

#### Especificaciones técnicas:

- **calcular_peso_pedido:** use cursor, fórmula CANTIDAD × PESOXCAJA
- **actualizar_inventario_entrada:** parámetros IN/OUT, validaciones, excepciones
- **obtener_stock_disponible:** retorne INVEN_TOTAL de TBL_INVENTARIOS
- **generar_reporte_inventario:** muestre todos los productos con stock
- Tablas: TBL_INVENTARIOS, TBL_PRODUCTOS, TBL_ORDENPEDIDOS, TBL_DETALLEPEDIDOS
- Implemente manejo completo de excepciones en todos los elementos

#### 🎯 Entregables requeridos:

- CREATE OR REPLACE PACKAGE PKG_INVENTARIO (especificación)
- CREATE OR REPLACE PACKAGE BODY PKG_INVENTARIO (implementación)
- Todas las funciones y procedimientos completamente implementados
- Ejemplo de uso del paquete con llamadas a sus elementos`,
  },
  {
    type: "exercise",
    title: "Criterios de Calificación",
    md: `### 📊 Rúbrica de Evaluación

#### Excelente (5.0)
- Código funciona perfectamente
- Sintaxis impecable
- Manejo completo de errores
- Optimización evidente
- Buenas prácticas aplicadas
- **Puntos requeridos:** 100 (cada punto = 0.05 décimas)

#### Bueno (4.0)
- Código funciona correctamente
- Sintaxis correcta
- Manejo básico de errores
- **Puntos requeridos:** 80

#### Satisfactorio (3.0) — APROBADO
- Código funciona con ajustes
- Sintaxis mayormente correcta
- **Puntos requeridos:** 60

#### Deficiente (2.0) — REPROBADO
- Código funciona parcialmente
- Algunos errores de sintaxis
- **Puntos obtenidos:** 40-59

#### Insuficiente (1.0) — REPROBADO
- Código no funciona
- Errores de sintaxis
- **Puntos obtenidos:** menos de 40

### 📝 Instrucciones de Entrega

- Pegue todo su código PL/SQL en el área de texto
- Incluya comentarios que identifiquen cada pregunta
- Asegúrese de que su código esté completo y bien formateado
- La evaluación es automática, basada en criterios técnicos`,
  },
];

/* ---------------- Validadores (idénticos al original) ---------------- */
function validateQuestion1(code) {
  const codeUpper = code.toUpperCase();
  let score = 0;
  const feedback = [];
  const maxScore = 35;

  if (codeUpper.includes("DECLARE")) {
    score += 3;
    feedback.push("✓ Sección DECLARE presente (3pts)");
  } else feedback.push("✗ Falta sección DECLARE");

  if (codeUpper.includes("BEGIN") && codeUpper.includes("END")) {
    score += 3;
    feedback.push("✓ Estructura de bloque PL/SQL completa (3pts)");
  } else feedback.push("✗ Estructura de bloque PL/SQL incompleta");

  if (codeUpper.includes("COUNT(") || codeUpper.includes("COUNT *")) {
    score += 4;
    feedback.push("✓ Uso correcto de COUNT para contar lotes (4pts)");
  } else feedback.push("✗ No usa COUNT para contar lotes");

  if (codeUpper.includes("TBL_LOTES") && codeUpper.includes("TBL_PRODUCTOS")) {
    score += 3;
    feedback.push("✓ Uso correcto de tablas del sistema (3pts)");
  } else feedback.push("✗ No usa las tablas correctas (TBL_LOTES, TBL_PRODUCTOS)");

  if (codeUpper.includes("DBMS_OUTPUT")) {
    score += 2;
    feedback.push("✓ Salida por consola implementada (2pts)");
  } else feedback.push("✗ No implementa salida por consola");

  if (codeUpper.includes("CASE")) {
    score += 6;
    feedback.push("✓ Estructura CASE implementada (6pts)");
  } else feedback.push("✗ No usa estructura CASE para clasificación");

  if (codeUpper.includes("PESOXUNIDAD")) {
    score += 4;
    feedback.push("✓ Campo PESOXUNIDAD identificado correctamente (4pts)");
  } else feedback.push("✗ No usa el campo PESOXUNIDAD");

  if (codeUpper.includes("CURSOR")) {
    score += 4;
    feedback.push("✓ Cursor implementado para recorrer productos (4pts)");
  } else feedback.push("✗ No implementa cursor para productos");

  if (
    (codeUpper.includes("LIVIANO") || codeUpper.includes("MEDIO") || codeUpper.includes("PESADO")) &&
    (codeUpper.includes("<1") || (codeUpper.includes("1") && codeUpper.includes("5")) || codeUpper.includes(">5"))
  ) {
    score += 4;
    feedback.push("✓ Clasificaciones por peso implementadas (4pts)");
  } else feedback.push("✗ Clasificaciones por peso incompletas");

  if (codeUpper.includes("FOR") && codeUpper.includes("LOOP")) {
    score += 2;
    feedback.push("✓ Estructura de bucle FOR LOOP (2pts)");
  } else feedback.push("✗ No usa FOR LOOP");

  return { score: Math.min(score, maxScore), feedback, maxScore };
}

function validateQuestion2(code) {
  const codeUpper = code.toUpperCase();
  let score = 0;
  const feedback = [];
  const maxScore = 15;

  if (codeUpper.includes("CURSOR") && codeUpper.includes("IS") && codeUpper.includes("SELECT")) {
    score += 4;
    feedback.push("✓ Declaración de cursor explícito correcta (4pts)");
  } else feedback.push("✗ Declaración de cursor explícito incorrecta");

  if (codeUpper.includes("OPEN") && codeUpper.includes("CLOSE")) {
    score += 3;
    feedback.push("✓ Apertura y cierre de cursor (3pts)");
  } else feedback.push("✗ No maneja apertura/cierre de cursor correctamente");

  if (codeUpper.includes("FETCH")) {
    score += 3;
    feedback.push("✓ Uso correcto de FETCH (3pts)");
  } else feedback.push("✗ No usa FETCH para obtener datos del cursor");

  if (codeUpper.includes("%NOTFOUND") || codeUpper.includes("%FOUND")) {
    score += 2;
    feedback.push("✓ Atributos de cursor utilizados (2pts)");
  } else feedback.push("✗ No usa atributos de cursor (%NOTFOUND, %FOUND)");

  if (codeUpper.includes("FECHA_VENCIMIENTO") && codeUpper.includes("SYSDATE")) {
    score += 2;
    feedback.push("✓ Lógica de fechas de vencimiento (2pts)");
  } else feedback.push("✗ No implementa lógica de fechas correctamente");

  if (codeUpper.includes("30") && (codeUpper.includes("DIAS") || codeUpper.includes("DAY"))) {
    score += 1;
    feedback.push("✓ Parámetro de 30 días implementado (1pt)");
  } else feedback.push("✗ No implementa filtro de 30 días");

  return { score: Math.min(score, maxScore), feedback, maxScore };
}

function validateQuestion3(code) {
  const codeUpper = code.toUpperCase();
  let score = 0;
  const feedback = [];
  const maxScore = 50;

  if (codeUpper.includes("CREATE") && codeUpper.includes("PACKAGE") && codeUpper.includes("PKG_INVENTARIO")) {
    score += 5;
    feedback.push("✓ Especificación del paquete PKG_INVENTARIO (5pts)");
  } else feedback.push("✗ No crea la especificación del paquete PKG_INVENTARIO");

  if (codeUpper.includes("PACKAGE BODY") && codeUpper.includes("PKG_INVENTARIO")) {
    score += 5;
    feedback.push("✓ Cuerpo del paquete implementado (5pts)");
  } else feedback.push("✗ No implementa el cuerpo del paquete");

  if (codeUpper.includes("STOCK_MINIMO") && codeUpper.includes("CONSTANT")) {
    score += 3;
    feedback.push("✓ Constante STOCK_MINIMO declarada (3pts)");
  } else feedback.push("✗ No declara la constante STOCK_MINIMO");

  if (codeUpper.includes("STOCK_INSUFICIENTE") && codeUpper.includes("EXCEPTION")) {
    score += 2;
    feedback.push("✓ Excepción personalizada stock_insuficiente (2pts)");
  } else feedback.push("✗ No declara excepción personalizada");

  if (codeUpper.includes("OBTENER_STOCK_DISPONIBLE") && codeUpper.includes("FUNCTION")) {
    score += 4;
    feedback.push("✓ Función obtener_stock_disponible (4pts)");
  } else feedback.push("✗ No implementa función obtener_stock_disponible");

  if (codeUpper.includes("CALCULAR_PESO_PEDIDO") && codeUpper.includes("FUNCTION")) {
    score += 4;
    feedback.push("✓ Función calcular_peso_pedido (4pts)");
  } else feedback.push("✗ No implementa función calcular_peso_pedido");

  if (codeUpper.includes("RETURN") && (codeUpper.includes("NUMBER") || codeUpper.includes("VARCHAR2"))) {
    score += 3;
    feedback.push("✓ Tipos de retorno en funciones (3pts)");
  } else feedback.push("✗ Tipos de retorno incorrectos en funciones");

  if (codeUpper.includes("TBL_DETALLEPEDIDOS") && codeUpper.includes("CANTIDAD") && codeUpper.includes("PESOXCAJA")) {
    score += 4;
    feedback.push("✓ Cálculo de peso con campos correctos (4pts)");
  } else feedback.push("✗ No implementa cálculo de peso correctamente");

  if (codeUpper.includes("ACTUALIZAR_INVENTARIO_ENTRADA") && codeUpper.includes("PROCEDURE")) {
    score += 5;
    feedback.push("✓ Procedimiento actualizar_inventario_entrada (5pts)");
  } else feedback.push("✗ No implementa procedimiento actualizar_inventario_entrada");

  if (codeUpper.includes("GENERAR_REPORTE_INVENTARIO") && codeUpper.includes("PROCEDURE")) {
    score += 3;
    feedback.push("✓ Procedimiento generar_reporte_inventario (3pts)");
  } else feedback.push("✗ No implementa procedimiento generar_reporte_inventario");

  if (codeUpper.includes("IN") && codeUpper.includes("OUT")) {
    score += 4;
    feedback.push("✓ Parámetros IN y OUT correctos (4pts)");
  } else feedback.push("✗ Parámetros IN/OUT incorrectos o faltantes");

  if (codeUpper.includes("UPDATE") || codeUpper.includes("INSERT") || codeUpper.includes("MERGE")) {
    score += 4;
    feedback.push("✓ Operaciones DML en procedimientos (4pts)");
  } else feedback.push("✗ No implementa operaciones DML");

  if (codeUpper.includes("TBL_INVENTARIOS")) {
    score += 2;
    feedback.push("✓ Uso de tabla TBL_INVENTARIOS (2pts)");
  } else feedback.push("✗ No usa tabla TBL_INVENTARIOS");

  if (codeUpper.includes("EXCEPTION") && (codeUpper.includes("WHEN") || codeUpper.includes("RAISE"))) {
    score += 2;
    feedback.push("✓ Manejo de excepciones implementado (2pts)");
  } else feedback.push("✗ Manejo de excepciones insuficiente");

  return { score: Math.min(score, maxScore), feedback, maxScore };
}

function generateExamFeedback(grade) {
  if (grade >= 4.5) return "¡Excelente trabajo! Su código demuestra un dominio sólido de PL/SQL con implementación correcta de todos los conceptos evaluados.";
  if (grade >= 3.5) return "Buen trabajo. Su código es funcional y demuestra comprensión de los conceptos, con algunas áreas de mejora.";
  if (grade >= 3.0) return "Trabajo satisfactorio. Cumple con los requisitos mínimos para aprobar, pero necesita reforzar algunos conceptos.";
  if (grade >= 2.0) return "Su código muestra comprensión básica pero necesita mejoras significativas en la implementación.";
  return "Su código necesita mejoras fundamentales. Revise los conceptos básicos de PL/SQL y practique más.";
}

/* ---------------- UI: login ---------------- */
function renderExamLogin() {
  const body = document.getElementById("exam-modal-body");
  const foot = document.getElementById("exam-modal-foot");
  foot.innerHTML = "";
  body.innerHTML = `
    <div class="exam-login">
      <div class="exam-login-icon">🔒</div>
      <h3>Examen Final Restringido</h3>
      <p>Ingrese la clave proporcionada por el instructor</p>
      <input type="password" id="exam-password-input" placeholder="Clave del examen" class="exam-input" />
      <button class="btn btn-primary" id="exam-login-btn" style="width:100%; justify-content:center; margin-top:10px;">
        Acceder al Examen
      </button>
      <p class="exam-hint">Solo estudiantes autorizados pueden acceder a esta evaluación.</p>
    </div>
  `;
  const input = document.getElementById("exam-password-input");
  const loginBtn = document.getElementById("exam-login-btn");
  const tryLogin = () => {
    const val = input.value;
    if (val === decryptPassword(CORRECT_PASSWORD_ENCRYPTED)) {
      examState.authenticated = true;
      examState.slideIndex = 0;
      renderExamSlide();
    } else {
      input.classList.add("input-error");
      setTimeout(() => input.classList.remove("input-error"), 600);
    }
  };
  loginBtn.addEventListener("click", tryLogin);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryLogin();
  });
}

/* ---------------- UI: diapositivas informativas + entrega ---------------- */
function renderExamSlide() {
  const body = document.getElementById("exam-modal-body");
  const foot = document.getElementById("exam-modal-foot");
  const total = EXAM_SLIDES.length + 1; // +1 = pantalla de entrega
  const idx = examState.slideIndex;

  if (idx < EXAM_SLIDES.length) {
    const slide = EXAM_SLIDES[idx];
    body.innerHTML = `
      <span class="slide-type-badge slide-type-${slide.type}">${SLIDE_TYPE_LABEL[slide.type] || "Contenido"}</span>
      <div class="md-content">${renderMarkdown(slide.md)}</div>
    `;
  } else {
    renderExamSubmission(body);
  }

  foot.innerHTML = `
    <button class="btn btn-ghost" id="exam-prev" ${idx === 0 ? "disabled" : ""}>← Anterior</button>
    <span class="slide-counter">${idx + 1} / ${total}</span>
    <button class="btn btn-ghost" id="exam-next" ${idx === total - 1 ? "disabled" : ""}>Siguiente →</button>
  `;
  document.getElementById("exam-prev").addEventListener("click", () => {
    if (examState.slideIndex > 0) {
      examState.slideIndex--;
      renderExamSlide();
    }
  });
  document.getElementById("exam-next").addEventListener("click", () => {
    if (examState.slideIndex < total - 1) {
      examState.slideIndex++;
      renderExamSlide();
    }
  });
  body.scrollTop = 0;
}

function renderExamSubmission(body) {
  body.innerHTML = `
    <span class="slide-type-badge slide-type-exercise">Entrega</span>
    <div class="md-content">
      <h3>📤 Sistema de Evaluación Automática</h3>
      <p>Pegue todo su código PL/SQL para recibir una evaluación automática y su nota final.</p>
    </div>
    <div id="exam-result-area"></div>
    <label class="exam-label">Código PL/SQL completo (todas las preguntas) *</label>
    <textarea id="exam-code-input" class="exam-textarea" placeholder="Pegue aquí todo su código PL/SQL del examen..."></textarea>

    <button class="btn btn-ghost exam-full-btn" id="exam-verify-btn">✔ Verificar código (sin nota)</button>

    <div class="exam-teacher-box">
      <label class="exam-label">🔐 Clave del docente (requerida para evaluación)</label>
      <div class="exam-teacher-row">
        <input type="password" id="exam-teacher-input" class="exam-input" placeholder="Clave del docente" ${
          examState.teacherKeyValid ? "disabled" : ""
        } />
        ${
          examState.teacherKeyValid
            ? `<span class="exam-teacher-ok">✓ Válida</span>`
            : `<button class="btn btn-primary btn-sm" id="exam-teacher-btn">Validar</button>`
        }
      </div>
    </div>

    <button class="btn btn-primary exam-full-btn" id="exam-evaluate-btn" ${
      examState.teacherKeyValid ? "" : "disabled"
    }>
      📄 Evaluar y mostrar nota ${examState.teacherKeyValid ? "" : "(requiere clave del docente)"}
    </button>
  `;

  const codeInput = document.getElementById("exam-code-input");
  const resultArea = document.getElementById("exam-result-area");

  document.getElementById("exam-verify-btn").addEventListener("click", () => {
    if (!codeInput.value.trim()) {
      alert("Por favor ingrese su código PL/SQL antes de verificar.");
      return;
    }
    runExamCheck(codeInput.value, false, resultArea);
  });

  const teacherBtn = document.getElementById("exam-teacher-btn");
  if (teacherBtn) {
    teacherBtn.addEventListener("click", () => {
      const val = document.getElementById("exam-teacher-input").value;
      if (val === decryptPassword(TEACHER_KEY_ENCRYPTED)) {
        examState.teacherKeyValid = true;
        renderExamSubmission(body);
      } else {
        alert("Clave del docente incorrecta");
      }
    });
  }

  document.getElementById("exam-evaluate-btn").addEventListener("click", () => {
    if (!examState.teacherKeyValid) {
      alert("Se requiere la clave del docente para evaluar y mostrar nota.");
      return;
    }
    if (!codeInput.value.trim()) {
      alert("Por favor ingrese su código PL/SQL antes de evaluar.");
      return;
    }
    runExamCheck(codeInput.value, true, resultArea);
  });
}

function runExamCheck(code, withGrade, resultArea) {
  resultArea.innerHTML = `<div class="exam-loading">⏳ ${withGrade ? "Evaluando" : "Verificando"} código…</div>`;

  setTimeout(
    () => {
      const q1 = validateQuestion1(code);
      const q2 = validateQuestion2(code);
      const q3 = validateQuestion3(code);
      const questionResults = [
        { question: "Pregunta 1: Sistema de Análisis de Productos", ...q1 },
        { question: "Pregunta 2: Cursores Explícitos", ...q2 },
        { question: "Pregunta 3: Paquete Completo de Inventario", ...q3 },
      ];

      let headerHtml = "";
      if (withGrade) {
        const totalScore = q1.score + q2.score + q3.score;
        let finalGrade = Math.max(1.0, totalScore * 0.05);
        finalGrade = Math.min(finalGrade, 5.0);
        const isApproved = finalGrade >= 3.0;
        const feedback = generateExamFeedback(finalGrade);
        headerHtml = `
          <div class="exam-result-row"><span>Puntos totales:</span><strong>${totalScore}/100</strong></div>
          <div class="exam-result-row"><span>Nota final:</span><strong class="exam-grade">${finalGrade.toFixed(
            1
          )}/5.0</strong></div>
          <div class="exam-result-row"><span>Estado:</span><strong class="${
            isApproved ? "exam-approved" : "exam-failed"
          }">${isApproved ? "APROBADO" : "REPROBADO"}</strong></div>
          <p class="exam-feedback-text">${escapeHtml(feedback)}</p>
        `;
      } else {
        headerHtml = `<p class="exam-feedback-text">Verificación completada. Revise los resultados por pregunta. Cuando esté listo, valide la clave del docente y use "Evaluar y mostrar nota" para la calificación final.</p>`;
      }

      const questionsHtml = questionResults
        .map(
          (r) => `
        <div class="exam-question-result">
          <div class="exam-question-head">
            <span>${escapeHtml(r.question)}</span>
            <strong>${r.score}/${r.maxScore}</strong>
          </div>
          <div class="exam-question-feedback">
            ${r.feedback.map((f) => `<div>${escapeHtml(f)}</div>`).join("")}
          </div>
        </div>`
        )
        .join("");

      resultArea.innerHTML = `
        <div class="exam-result-card">
          <h4>${withGrade ? "⭐ Resultado de Evaluación" : "Verificación de código"}</h4>
          ${headerHtml}
          <h5>Resultados por pregunta:</h5>
          ${questionsHtml}
        </div>
      `;
    },
    withGrade ? 1200 : 800
  );
}

/* ---------------- Apertura / cierre del modal ---------------- */
function openExamModal() {
  document.getElementById("exam-modal").hidden = false;
  document.body.style.overflow = "hidden";
  if (examState.authenticated) {
    renderExamSlide();
  } else {
    renderExamLogin();
  }
}

function closeExamModal() {
  document.getElementById("exam-modal").hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("exam-modal-close").addEventListener("click", closeExamModal);
document.getElementById("exam-modal").addEventListener("click", (e) => {
  if (e.target.id === "exam-modal") closeExamModal();
});
document.addEventListener("keydown", (e) => {
  if (document.getElementById("exam-modal").hidden) return;
  if (e.key === "Escape") closeExamModal();
});
