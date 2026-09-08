# Análisis del proyecto — Curso PL/SQL y Administración Oracle

**Fecha:** 3 de septiembre de 2026
**Alcance:** los 7 archivos del sitio (`index.html`, `styles.css`, `data.js`, `weeks-content.js`, `script.js`, `exam.js`, `README.md`), ~246 KB.
**Método:** lectura completa del código y del contenido, más verificación ejecutable de dos hipótesis: la explotabilidad del calificador automático y la integridad de los bloques de código del material didáctico.

---

## Resumen ejecutivo

**Arquitectura: sólida para su propósito.** La separación datos / contenido / lógica / estilo está bien pensada y el render data-driven hace el sitio fácil de mantener. Los defectos son de higiene, no estructurales: dependencias globales implícitas y sensibles al orden de carga, un número mágico inconsistente para la semana del examen, DOM tocado en el top-level, y 158 KB de contenido bloqueando el primer render. Un XSS menor en el buscador.

**Contenido: pedagógicamente muy bueno, con daño mecánico visible.** El patrón de 7 pasos por semana y el material añadido (tabla mutante, `SAVE EXCEPTIONS`, `DBMS_ASSERT`) son de calidad profesional. Pero el 10 % de las diapositivas de código está truncado y se renderiza roto, la diapositiva 1 muestra JSX crudo, una diapositiva enseña mal `BULK COLLECT`, otra está fuera de tema, y la profundidad oscila 30× entre semanas.

**El examen es lo más débil, y no por poco.** Un bloque de puros comentarios saca 5.0 y código correcto con otra nomenclatura saca 1.1. Sumado a que las claves están en claro, la rúbrica es pública y la nota no se guarda, el examen no funciona como instrumento de evaluación: funciona como guía de estudio.

### Prioridad de arreglo

1. Recuperar los 5 fragmentos de código truncados en `<` — es media hora de trabajo y devuelve el 10 % del código del curso.
2. Limpiar el texto del enlace JSX en la diapositiva 1 de la semana 1.
3. Corregir S7#5 (`BULK COLLECT`) y sacar o reescribir S4#4 ("Interfaz de Usuario Reactiva").
4. Decidir qué es el examen: si va a calificar de verdad, necesita backend; si es autoestudio, quitarle las claves y la nota.

Lo demás es opcional.

---

## 1. Arquitectura

### 1.1 Stack y forma

Sitio **estático puro**: HTML + CSS + JS vanilla. Cero dependencias, cero build, cero backend. 7 archivos planos. La única petición externa es Google Fonts.

```
index.html ──► carga en orden:
   data.js          (CURSO, MODULOS, SEMANAS, BIBLIOGRAFIA)   ─┐
   weeks-content.js (WEEKS_CONTENT: 138 diapositivas)         ─┤ datos (globals)
   script.js        (render + filtros + progreso + visor)     ─┤ lógica
   exam.js          (login + rúbrica + calificador)           ─┘
styles.css          (1242 líneas, tokens en :root)
```

| Archivo | Tamaño | Rol |
|---|---|---|
| `weeks-content.js` | 158 KB | Contenido de las 138 diapositivas |
| `exam.js` | 24 KB | Examen y calificador |
| `styles.css` | 22 KB | Diseño completo |
| `data.js` | 15 KB | Temario y metadatos |
| `script.js` | 14 KB | Lógica de render |
| `index.html` | 7 KB | Estructura |

### 1.2 Patrón

Separación **datos / contenido / presentación / lógica**, ejecutada con disciplina real. El render es *data-driven*: agregar una semana en [data.js](data.js) actualiza sola la línea de tiempo, la leyenda, los filtros, las tarjetas y la barra de progreso. Es lo mejor del diseño.

El render es *full re-render* por `innerHTML` en cada cambio de estado ([script.js:141](script.js#L141)), con estado mutable en globals de módulo (`progress`, `activeFilter`, `searchTerm`, `slideState`, `examState`). Para 16 semanas y 138 diapositivas es la decisión correcta; un framework aquí sería sobreingeniería.

Persistencia: `localStorage` con clave `curso-plsql-progreso`, envuelto en `try/catch` en lectura y escritura ([script.js:12-30](script.js#L12-L30)). Degrada bien si el almacenamiento está bloqueado.

### 1.3 Problemas de acoplamiento

**Contrato implícito por namespace global.** Nada declara las dependencias:

- `script.js` asume que `SEMANAS`, `MODULOS` y `WEEKS_CONTENT` ya existen.
- `exam.js` usa `renderMarkdown`, `escapeHtml` y `SLIDE_TYPE_LABEL`, definidos en `script.js`.
- `script.js` llama `openExamModal`, definido en `exam.js`, protegido con `typeof === "function"` ([script.js:103](script.js#L103)).

Es una **dependencia circular blanda** entre `script.js` y `exam.js`, resuelta solo por el orden de los `<script>` en el HTML. Funciona, pero es frágil y no está documentado.

**DOM tocado en el top-level del módulo.** [script.js:35](script.js#L35) (`wa-link.href`) y [script.js:130](script.js#L130) (listener del buscador) se ejecutan fuera de `DOMContentLoaded`. Funciona *solo* porque los scripts están al final del `<body>`. Agregar `defer` o moverlos al `<head>` rompe la página con un `TypeError`. El resto sí está bien encapsulado en `DOMContentLoaded` ([script.js:404](script.js#L404)).

**Número mágico inconsistente.** [script.js:98](script.js#L98) codifica `if (semana === 11)` para detectar el examen, mientras [script.js:210](script.js#L210) lo hace bien con `s.modulo === "ex"`. Si el cronograma cambia, la línea de tiempo abre la diapositiva equivocada y las tarjetas siguen correctas.

**Sin delegación de eventos.** `attachWeekCardEvents()` ([script.js:236](script.js#L236)) re-vincula todos los listeners en cada `renderWeeks()`, es decir en **cada pulsación de tecla del buscador**. No hay fuga de memoria (los nodos viejos se descartan), pero es trabajo O(n) innecesario donde bastaba un listener en el contenedor.

**Carga bloqueante de todo el contenido.** Los 158 KB de `weeks-content.js` se descargan y parsean sincrónicamente antes del primer render, aunque el usuario puede no abrir ninguna diapositiva. Es el 64 % del peso del sitio para una función opcional.

**Parser markdown propio.** ~80 líneas ([script.js:290-366](script.js#L290-L366)) para un dialecto reducido (`##` a `#####`, `-`, `**`, código inline, bloques de SQL, `[LINK]texto|url[/LINK]`). Razonable para el alcance, con una consecuencia real descrita en §3.2: si un bloque de código queda sin cerrar, el regex no hace match y el SQL se renderiza como párrafos.

**Otros:** sin tests, sin validación de forma de los datos, CSS monolítico de 1242 líneas con bloques `@media` fragmentados y duplicados ([styles.css:1209-1229](styles.css#L1209-L1229)) — el orden en cascada resulta correcto, pero por suerte más que por diseño.

### 1.4 Seguridad y accesibilidad

**XSS reflejado en el buscador.** [script.js:174](script.js#L174) interpola `searchTerm` sin escapar en `innerHTML`. Escribir `<img src=x onerror=alert(1)>` en el buscador ejecuta el script. Es *self-XSS* (no hay lectura de query params, así que no se puede entregar por URL), severidad baja, pero es un defecto real y la corrección es un solo `escapeHtml()`.

`escapeHtml` ([script.js:281](script.js#L281)) no escapa comillas, e `inlineMd` inyecta el `url` de un `[LINK]` en un atributo `href` sin validar el esquema (`javascript:` pasaría). El contenido es del autor, no del usuario, así que el riesgo es teórico; vale anotarlo si algún día el contenido se vuelve editable.

**Accesibilidad.** Bien: `prefers-reduced-motion` ([styles.css:41](styles.css#L41)), `aria-label` en los botones de cierre y `.modal-overlay[hidden]{display:none}` correctamente definido. Falta **focus trap** y devolución del foco al cerrar, pese a que los modales declaran `aria-modal="true"` — con teclado se puede tabular fuera del modal abierto.

---

## 2. Qué es el contenido y qué expone

### 2.1 Qué es

El sitio-programa de un curso universitario de **PL/SQL y Administración Oracle**, 16 semanas, 3 módulos más evaluación.

| Módulo | Semanas | Contenido |
|---|---|---|
| Fundamentos PL/SQL | 1, 2, 3, 5, 6, 7, 8, 9 | SQL → bloques → cursores → funciones/paquetes → triggers → excepciones/colecciones → SQL dinámico → ACLs/vistas materializadas |
| Administración (DBA) | 12, 14, 15 | Arquitectura y usuarios, optimización, almacenamiento |
| Proyecto Final | 4, 10, 13, 16 | Sistema bancario en 3 entregas incrementales más defensa |
| Evaluación | 11 | Examen final calificado en el navegador |

**138 diapositivas** distribuidas en 15 semanas (la 11 es el examen, sin diapositivas): 50 de código, 43 de teoría, 30 de ejercicio, 15 de introducción.

### 2.2 Qué expone

Lo esperado: temario, descripciones semanales, las 138 diapositivas, bibliografía, línea de tiempo, seguimiento de avance local.

Lo que expone y probablemente no debería:

**Las dos claves, en texto plano.** [exam.js:44](exam.js#L44) y [exam.js:47](exam.js#L47):

```js
const CORRECT_PASSWORD = "CurPlSql2025.+-*";
const TEACHER_KEY = "pl2025+-";
```

El README dice que están "ofuscadas con un cifrado muy simple". No lo están: la constante es **literal en claro**, y el código la cifra en tiempo de ejecución solo para descifrarla de vuelta y comparar ([exam.js:502](exam.js#L502)). No hay nada que decodificar: se leen con `Ctrl+F`. El README subestima el problema que él mismo señala.

**El examen completo y su rúbrica exacta.** Las 3 preguntas, los criterios y **el peso en puntos de cada palabra clave** están en el mismo archivo que el navegador descarga.

**El enlace de invitación permanente al grupo de WhatsApp** ([data.js:15](data.js#L15)): cualquiera que encuentre la página entra al grupo del curso. Y un PDF de contenido programático alojado en `wilmer155.github.io`.

### 2.3 El calificador automático no mide lo que dice medir

La calificación es *substring matching* sobre el código en mayúsculas. Nunca compila ni ejecuta nada. Verificado ejecutando los tres validadores de `exam.js`:

| Entrega | Resultado |
|---|---|
| **Un bloque de puros comentarios** con las palabras clave listadas, sin una sola línea ejecutable | **100/100 → 5.0 APROBADO** |
| **PL/SQL válido y correcto** (cursor explícito completo, `OPEN`/`FETCH`/`%NOTFOUND`/`CLOSE`) con nomenclatura propia | **22/100 → 1.1 REPROBADO** |
| Entrega vacía | 0/100 → 1.0 |

Un estudiante que copia una lista de identificadores dentro de comentarios saca la nota máxima; uno que escribe código funcional pero llama a sus tablas de otro modo, reprueba. El calificador premia la transcripción de vocabulario, no la programación.

Casos concretos donde los puntos son gratis:

- [exam.js:399](exam.js#L399): `codeUpper.includes("IN") && codeUpper.includes("OUT")` → 4 pts. `"IN"` está dentro de `INSERT`, `INVENTARIO`, `MINIMO`; `"OUT"` dentro de `DBMS_OUTPUT`. Siempre verdadero.
- [exam.js:296](exam.js#L296): la clasificación por peso acepta `includes("1") && includes("5")` → verdadero para casi cualquier código.
- [exam.js:288](exam.js#L288): 4 pts por que la cadena `PESOXUNIDAD` aparezca en cualquier parte, incluido un comentario.

Dos huecos más, de proceso:

- La diapositiva anuncia **"Duración: 2 horas"** y nada la impone.
- **La nota no se guarda ni se envía a ningún lado**: se muestra y se pierde. La clave del docente protege *ver* la nota, no *registrarla*, así que el flujo exige al profesor presente frente al equipo del estudiante.

Sin backend, el examen es una autoevaluación, no una evaluación.

---

## 3. Calidad del contenido

### 3.1 Lo bueno, y es bastante

**El patrón didáctico es excelente y consistente.** Las 15 semanas siguen la misma secuencia deliberada:

> intro → teoría → código → **ejemplo adicional** → **errores comunes** → **práctica sin solución** → ejercicio resuelto

Poner el ejercicio sin resolver *antes* de la solución, y dedicar una diapositiva por semana a errores comunes, es diseño instruccional de verdad, no relleno. Se sostiene en las 15 semanas sin excepción.

**Las descripciones de [data.js](data.js) están muy bien escritas.** Prosa explicativa que argumenta el *por qué*, no viñetas: la semana 2 justifica `%TYPE` como ancla contra inconsistencias; la 9 explica en qué difiere una vista materializada de una vista; la 8 conecta SQL dinámico con inyección como consecuencia, no como tema aparte. Es el mejor texto del proyecto.

**El material añadido es el contenido más fuerte y es técnicamente correcto.** Cubre precisamente las trampas que los manuales entierran:

- **`ORA-04091`, la tabla mutante** (S6#6): muestra el trigger correcto con secuencia y luego el que falla, explicando por qué y qué hacer en su lugar.
- **`FORALL ... SAVE EXCEPTIONS`** (S7#7) con `PRAGMA EXCEPTION_INIT(-24381)` y recorrido de `SQL%BULK_EXCEPTIONS`. Correcto hasta el detalle del `SQLERRM` con el código negado.
- **Seguro vs. inseguro en `EXECUTE IMMEDIATE`** (S8#7): la misma consulta concatenada y con `USING`, con el payload de inyección explicado.
- **`DBMS_ASSERT.SIMPLE_SQL_NAME`** (S8#4) para validar nombres de objeto: el caso que `USING` no cubre y que casi nadie enseña.

**Bibliografía canónica y correcta**: Feuerstein, Kyte, Bryla & Loney, Freeman. Es exactamente la lista que corresponde.

### 3.2 Defectos concretos

#### 1. Cinco diapositivas de código truncadas — el defecto más grave

El código se corta **exactamente en el primer operador `<`**. Es un error de extracción del `.tsx` original, donde `<` se interpretó como apertura de etiqueta JSX. La evidencia es concluyente: en los 158 KB de contenido sobreviven **solo 4 caracteres `<`**, y los 4 están en diapositivas escritas nuevas (S2#5, S6#8, S13#6, S14#8), ninguna en material extraído.

| Diapositiva | Se corta en | Qué se pierde |
|---|---|---|
| S4#3 *Lógica de Negocio* | `IF v_saldo ` | La validación de saldo insuficiente, el corazón del trigger de retiro |
| S5#6 *Uso del Paquete* | `IF v_peso ` | El uso de la constante del paquete, que es el tema de la diapositiva |
| S6#4 *Trigger BEFORE* | `IF UPDATING('salario') AND :NEW.salario ` | La validación de reducción de salario |
| S7#3 *Manejo de Excepciones* | `IF SQLCODE ` | El re-lanzamiento de excepciones críticas |
| S7#5 *BULK Operations* | `AND ROWNUM ` | El control de lote, tema de la diapositiva |

**El daño es doble**: al cortarse, la cerca de cierre del bloque de código desaparece, el regex de bloques SQL de [script.js:293](script.js#L293) no hace match, y **todo el SQL se renderiza como párrafos sueltos sin formato**, con la lista de "Puntos clave" pegada al final como si fuera parte del código. Son 5 de las 50 diapositivas de código: **el 10 % del código del curso se ve roto en pantalla**.

#### 2. La primera diapositiva del curso muestra código JSX crudo

El texto del enlace en S1#1 es literalmente:

> `window.open( "https://..." , "_blank", ) } > Ver Contenido Programático (PDF)`

Es lo primero que ve un estudiante en la semana 1.

#### 3. S4#4 "Interfaz de Usuario Reactiva" está fuera de alcance

Habla de formularios de login, dashboards reactivos, gráficos en tiempo real y eventos como `usuario.login.solicitado`. No tiene relación con el tema declarado de la semana (MER, esquema lógico, plan de implementación) ni con un curso de PL/SQL y DBA. Es herencia del deck original.

#### 4. S7#5 enseña el patrón equivocado

Envuelve un `SELECT ... BULK COLLECT INTO` dentro de un cursor `FOR LOOP` sobre la misma tabla. No es así como funciona `BULK COLLECT` con `LIMIT`: el patrón requiere cursor explícito y `FETCH ... BULK COLLECT INTO ... LIMIT n` en un `LOOP` simple. Peor: las viñetas al pie explican `LIMIT`, `SAVE EXCEPTIONS` y `EXTEND`, que **no aparecen en el código**. El "Ejemplo Práctico" del tema central de la semana desorienta.

#### 5. Profundidad muy desigual

Rango de 132 a 4005 caracteres por diapositiva:

- Las semanas 8, 9, 14 y 15 tienen diapositivas de código de 2000–4000 caracteres, sustanciales.
- La semana 1 cubre DDL + DML + DQL + subconsultas + JOINs + introducción a PL/SQL con **394 caracteres para DML** y **559 para JOINs**. Es un listado, no una lección, y es justo donde los estudiantes con SQL flojo más necesitan profundidad.
- Las semanas de proyecto y cierre son las más delgadas: intros de 165, 174 y 171 caracteres (S10, S13, S16), "Criterios de Evaluación" con 132, "Estructura de la Presentación" con 164, "Criterios de Evaluación Final" con 158. Son títulos con una frase.
- Ejercicios entre 3370 (S3) y 327 caracteres (S13).

#### 6. Listas numeradas mal formadas

22 casos en 4 diapositivas (S10#2, S10#9, S13#9, S16#9) con el patrón de una viñeta que contiene solo el número y el texto como párrafo separado. Se ve como una lista rota. Son precisamente las diapositivas de entregables, las que el estudiante más consulta.

---

## Anexo: inventario de diapositivas por semana

| Semana | Módulo | Diapositivas | Nota |
|---|---|---|---|
| 1 | Fundamentos | 10 | Enlace JSX crudo en S1#1; teoría muy delgada |
| 2 | Fundamentos | 8 | |
| 3 | Fundamentos | 9 | Ejercicio más extenso del curso (3370 ch) |
| 4 | Proyecto | 8 | S4#3 truncada; S4#4 fuera de alcance |
| 5 | Fundamentos | 10 | S5#6 truncada |
| 6 | Fundamentos | 9 | S6#4 truncada; S6#6 es contenido excelente |
| 7 | Fundamentos | 10 | S7#3 y S7#5 truncadas; S7#5 además conceptualmente errónea |
| 8 | Fundamentos | 10 | Semana más sólida del curso |
| 9 | Fundamentos | 10 | Diapositivas más extensas (hasta 4005 ch) |
| 10 | Proyecto | 9 | Relleno; viñetas numéricas rotas |
| 11 | Evaluación | — | Examen, sin diapositivas |
| 12 | DBA | 9 | |
| 13 | Proyecto | 9 | Relleno; viñetas numéricas rotas |
| 14 | DBA | 9 | |
| 15 | DBA | 9 | |
| 16 | Proyecto | 9 | Relleno; viñetas numéricas rotas |

**Total: 138 diapositivas** — 50 código, 43 teoría, 30 ejercicio, 15 introducción.
