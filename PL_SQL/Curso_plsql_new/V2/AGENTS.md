# AGENTS.md — Curso PL/SQL y Administración Oracle

Guía para cualquier agente o persona que modifique este repositorio. Léela completa antes del primer cambio.

---

## 1. Qué es este proyecto

Sitio estático que publica el programa de un curso universitario de 16 semanas de PL/SQL y administración Oracle: línea de tiempo de módulos, contenido de cada clase en diapositivas navegables, examen final autocalificado, seguimiento de avance en `localStorage` y bibliografía.

**Se sirve tal cual, sin build.** Debe seguir funcionando de las dos formas: publicado en GitHub Pages y abriendo `index.html` directamente desde el disco (`file://`). Esa segunda condición es la que más restringe el diseño (ver §2).

| Archivo | Rol | Editar cuando |
|---|---|---|
| `index.html` | Estructura, secciones fijas, contenedores de modales | Se agrega una sección o un modal nuevo |
| `styles.css` | Todo el diseño; tokens en `:root` | Cambios visuales |
| `data.js` | Temario: `CURSO`, `MODULOS`, `SEMANAS`, `BIBLIOGRAFIA` | Título, descripción o temas de una semana |
| `weeks-content.js` | `WEEKS_CONTENT[semana]`: las diapositivas de prosa | Contenido de una clase |
| `sql-datasets.js` | `DATASETS`: DDL, datos sembrados y consultas de verificación de los 3 esquemas de práctica | Cambia un esquema de práctica |
| `exercises.js` | `WEEK_EXERCISES[semana]`: los 48 ejercicios ejecutables | Se agrega o corrige un ejercicio |
| `script.js` | Render, filtros, búsqueda, progreso, visor de diapositivas, parser markdown | Lógica de la página |
| `exam.js` | Examen: acceso, rúbrica, calificador | Preguntas o criterios del examen |

---

## 2. Restricciones no negociables

1. **Sin dependencias, sin build, sin framework.** Nada de npm, bundlers, TypeScript ni JSX. El repositorio se despliega copiando archivos. La única petición externa permitida es Google Fonts, ya presente.
2. **Sin backend.** Todo corre en el navegador. Cualquier estado persistente va a `localStorage`.
3. **No usar `fetch()` para cargar contenido del propio repositorio.** Bajo `file://` falla por CORS y rompe el requisito de abrir `index.html` desde el disco. Los datos nuevos se cargan como un `<script>` más que declara un global — es el patrón que ya usan `data.js` y `weeks-content.js`, y hay que seguirlo.
4. **El orden de los `<script>` en `index.html` es un contrato.** Es:

   ```
   data.js → weeks-content.js → sql-datasets.js → exercises.js → script.js → exam.js
   ```

   Los archivos de datos primero porque solo declaran globals. `script.js` antes de `exam.js` porque `exam.js` consume `renderMarkdown`, `escapeHtml` y `SLIDE_TYPE_LABEL` de allí. A su vez `script.js` invoca `openExamModal` de `exam.js` protegido con `typeof === "function"`, así que la dependencia es circular blanda y **solo** el orden la resuelve.
5. **No agregar `defer` ni `async`, ni mover los scripts al `<head>`.** `script.js` toca el DOM en su top-level ([script.js:35](script.js#L35) y [script.js:130](script.js#L130)); funciona porque los scripts están al final del `<body>`. Cambiar eso lanza un `TypeError` en la carga. Si algún día hace falta `defer`, primero hay que mover ese código dentro de `DOMContentLoaded`.
6. **Nada en este repositorio es secreto.** Todo lo que esté en un archivo `.js` lo lee cualquiera con las herramientas de desarrollador. No introducir claves, tokens ni respuestas que dependan de no ser vistas. Si algo necesita protección real, necesita un backend, y eso es un cambio de alcance que se discute antes.

---

## 3. Convenciones de código

- Español para nombres de dominio (`SEMANAS`, `semana`, `titulo`, `temas`) e inglés para lo técnico heredado (`renderMarkdown`, `escapeHtml`). No renombrar lo existente sin motivo.
- Los datos son `const` en mayúsculas (`SEMANAS`, `DATASETS`). El estado mutable son `let` en minúsculas al tope de `script.js`.
- Colores, radios y tipografías **siempre** como variable CSS en `:root`. No escribir un hex suelto en una regla.
- Render por plantilla de string e `innerHTML`, re-render completo del bloque afectado. Es el patrón del proyecto y es adecuado para este volumen: no introducir render incremental ni un micro-framework.
- **Nunca interpolar entrada del usuario en `innerHTML` sin `escapeHtml()`.** Ver la regla R7 en §7.
- **No codificar números de semana.** Derivar del dato: `s.modulo === "ex"` para el examen, no `semana === 11`.

---

## 4. El dialecto markdown del proyecto

El campo `md` de cada diapositiva lo procesa `renderMarkdown()` ([script.js:290](script.js#L290)), que es un parser propio y limitado. **Solo** soporta:

| Sintaxis | Resultado |
|---|---|
| `## ` a `##### ` | `<h2>` a `<h5>` |
| `- texto` | Ítem de lista no ordenada |
| `**texto**` | Negrita |
| `` `texto` `` | Código inline |
| ` ```sql ... ``` ` | Bloque de código con resaltado |
| `[LINK]texto\|url[/LINK]` | Enlace externo |

**No soporta** (y usarlo produce salida rota, no un error):

- Listas ordenadas. `1. texto` se renderiza como párrafo literal. Escribir `- texto` y poner el número en el texto si importa el orden.
- Bloques de código con cualquier etiqueta distinta de `sql`. ` ```plsql ` o ` ``` ` a secas no hacen match y el código sale como párrafos.
- Tablas, imágenes, citas, HTML inline, énfasis con `_`, encabezado `#` de nivel 1.

**El bloque de código es lo más frágil del parser.** El regex es ` /```sql\n([\s\S]*?)```/ `: si falta la cerca de cierre, no hace match y **todo el SQL se renderiza como párrafos sueltos**, arrastrando el texto que venga después. Toda cerca abierta se cierra, sin excepción.

---

## 5. Anatomía de una semana

Las diapositivas de cada semana siguen esta secuencia. Es el activo pedagógico del curso: se respeta y se completa, no se reinventa.

| # | Tipo | Diapositiva | Propósito |
|---|---|---|---|
| 1 | `intro` | Presentación del tema | Encuadre y objetivos |
| 2–n | `content` / `code` | Teoría y ejemplos originales | Material base de la clase |
| n+1 | `code` | **Ejemplo adicional** | Un segundo ángulo del mismo concepto |
| n+2 | `content` | **Errores comunes** | Las trampas reales del tema |
| n+3 | `exercise` | **Practica antes de ver la solución** | Ejercicio sin resolver |
| n+4 | `exercise` | Ejercicio práctico | Ejercicio con solución |
| n+5 | `exercise` | **Ejercicios propuestos** ← nuevo, §6 | Enunciados ejecutables sobre un esquema real |

Reglas de contenido:

- **Cada diapositiva se queda en el tema declarado de su semana** en `data.js`. Si el contenido no encaja en `SEMANAS[n].temas`, va en otra semana o no va.
- **Mínimo sustantivo: ~350 caracteres de `md`.** Hoy hay diapositivas de 132 a 4005 caracteres; las de menos de 200 son títulos con una frase y hay que desarrollarlas o fusionarlas. Objetivo de rango sano: 400–2500.
- Todo código PL/SQL debe ser **ejecutable contra un dataset declarado** (§6). No inventar tablas al paso.
- Nada de restos del material original en React: `window.open`, `=>` de flecha JS, `className`, JSX. El `=>` de notación de parámetros nombrados de PL/SQL (`p_cod => valor`) sí es válido.

---

## 6. Ejercicios ejecutables: modelo y mapeo

### 6.1 El problema que resuelve

Verificado sobre el contenido actual: **no hay una sola línea de datos de prueba en el repositorio.** Los 17 `INSERT` que existen están todos dentro de la lógica de los ejemplos (tablas de auditoría, logs de error), ninguno siembra datos para practicar. Y no hay DDL para la familia `TBL_*` sobre la que el examen califica. El `CREATE TABLE empleados` de S1#3 referencia `departamentos(dept_id)`, tabla que nunca se crea: ejecutarlo tal cual falla.

Consecuencia: el estudiante puede leer 138 diapositivas y no tiene dónde escribir una línea de PL/SQL. Y el examen lo evalúa sobre un esquema (`TBL_PRODUCTOS`, `PESOXUNIDAD`, `TBL_INVENTARIOS`) que nunca practicó.

**Cada semana debe cerrar con ejercicios propuestos que traigan su propio DDL y sus datos**, de modo que el estudiante copie, ejecute y resuelva sin pedir nada.

### 6.2 Tres datasets canónicos, no uno por semana

No se define un esquema por semana: se definen **tres dominios estables** y cada ejercicio declara cuál usa. Evita 15 copias divergentes del mismo `CREATE TABLE` y, sobre todo, alinea la práctica con el examen.

| Dataset | Dominio | Tablas | Usado en |
|---|---|---|---|
| `rh` | Recursos humanos | `departamentos`, `empleados`, `empleados_audit` | Semanas 1, 2, 3, 6, 14 |
| `inventario` | Inventario y pedidos | `TBL_PRODUCTOS`, `TBL_LOTES`, `TBL_INVENTARIOS`, `TBL_ORDENPEDIDOS`, `TBL_DETALLEPEDIDOS`, `TBL_AUDITORIA_INVENTARIO` | Semanas 5, 7, 8, 9, 11 (examen) |
| `banco` | Sistema bancario | `clientes`, `cuentas`, `transacciones`, `auditoria_transacciones` | Semanas 4, 10, 13, 16 (proyecto) |

Las semanas **12 y 15** (arquitectura, usuarios, tablespaces) no usan dataset: requieren privilegios de DBA y vistas del diccionario. Sus ejercicios declaran `dataset: null` y deben advertir qué privilegios hacen falta y que no se ejecutan sobre una base compartida.

### 6.3 Nomenclatura canónica

Hay variantes en conflicto en el contenido actual. **Se resuelven así, sin excepciones:**

- **Sin prefijo ni calificador de esquema.** `TBL_INVENTARIOS`, no `CURSODB_TBL_INVENTARIOS` ni `CURSODB.TBL_INVENTARIOS`. La versión desnuda es la mayoritaria y es la única que el calificador de `exam.js` reconoce; además un nombre calificado solo corre para el dueño de ese esquema. Ya se normalizaron 16 referencias en el contenido.
- **`TBL_*` en mayúsculas** para el dataset `inventario`, porque el examen depende de esos nombres exactos.
- **minúsculas sin prefijo** para `rh` y `banco` (`empleados`, `cuentas`).
- **`departamento_id`**, no `dept_id` (29× contra 10× en el contenido original; ya normalizado).
- **`emp_id`**, no `id_empleado` (23× contra 10×; ya normalizado, incluido el parámetro `p_emp_id`).
- Columnas del dataset `inventario` congeladas por el examen: `COD_PRODUCTO`, `NOMBRE`, `PESOXUNIDAD`, `PESOXCAJA`, `CANTIDAD`, `INVEN_TOTAL`, `FECHA_VENCIMIENTO`. **Cambiar una de ellas rompe la calificación**; si hay que cambiarla, se actualiza `exam.js` en el mismo commit.
- Prefijos de identificadores PL/SQL: `p_` parámetros, `v_` variables locales, `c_` cursores, `seq_` secuencias, `trg_` triggers, `pkg_` paquetes.

### 6.4 Reglas del DDL y de los datos

1. **Idempotente.** Cada `ddl` empieza con un teardown que tolera que las tablas no existan. Oracle no tiene `DROP TABLE IF EXISTS` antes de 23c, así que se usa el patrón:

   ```sql
   BEGIN
     FOR t IN (SELECT table_name FROM user_tables
               WHERE table_name IN ('EMPLEADOS','DEPARTAMENTOS')) LOOP
       EXECUTE IMMEDIATE 'DROP TABLE ' || t.table_name || ' CASCADE CONSTRAINTS PURGE';
     END LOOP;
   END;
   /
   ```

   Nunca un `DROP TABLE` suelto que aborte el script en la primera ejecución.
2. **Sin privilegios de DBA.** Todo debe correr como un usuario normal con `CREATE TABLE`, `CREATE SEQUENCE`, `CREATE PROCEDURE`. Nada de `sys`, tablespaces ni `GRANT` de sistema (salvo semanas 12 y 15, que lo declaran explícitamente).
3. **Fechas: deterministas donde importa el resultado, relativas donde importa la vigencia.** Los agregados y conteos usan `TO_DATE('2024-03-15','YYYY-MM-DD')` para que el resultado esperado no cambie con el tiempo. Los escenarios de proximidad (`FECHA_VENCIMIENTO` frente a `SYSDATE`, "próximos a vencer en 30 días") usan `SYSDATE + 15`, `SYSDATE + 45`, etc., o el ejercicio se rompe solo al mes siguiente.
4. **Volumen adecuado al tema.** `BULK COLLECT`/`FORALL` (semana 7) y `EXPLAIN PLAN`/índices (semana 14) no significan nada con 10 filas. Esos datasets llevan un `seedMasivo` que genera decenas de miles de filas con un bucle `INSERT ... SELECT ... FROM dual CONNECT BY LEVEL <= n`, y el ejercicio indica cuál sembrar.
5. **Tipos explícitos.** `NUMBER(8,2)`, `VARCHAR2(50)`; nunca `NUMBER` o `VARCHAR2` sin dimensionar.
6. **Cerrar con `COMMIT;`** al final de cada `seed`.
7. **Verificable.** Cada dataset trae una consulta de comprobación que el estudiante corre para confirmar que sembró bien (`SELECT COUNT(*) FROM ...` con el número esperado).

### 6.5 Forma de un dataset

```js
const DATASETS = {
  rh: {
    nombre: "Recursos Humanos",
    descripcion: "Departamentos y empleados. Base de los ejercicios de SQL, bloques, cursores y triggers.",
    tablas: ["departamentos", "empleados", "empleados_audit"],
    ddl:         "```sql\n-- teardown idempotente + CREATE TABLE + CREATE SEQUENCE\n```",
    seed:        "```sql\n-- INSERT deterministas + COMMIT\n```",
    seedMasivo:  "```sql\n-- opcional: carga de volumen para BULK e índices\n```",
    verificacion:"```sql\nSELECT COUNT(*) FROM empleados; -- esperado: 24\n```",
  },
  // inventario, banco
};
```

### 6.6 Forma de un ejercicio

```js
const WEEK_EXERCISES = {
  "3": [
    {
      id: "s03-e01",                    // sNN-eMM, estable, nunca se reutiliza
      titulo: "Cursor explícito con parámetro",
      dataset: "rh",                    // clave de DATASETS, o null
      nivel: "propuesto",               // guiado | propuesto | reto
      objetivo: "Recorrer los empleados de un departamento con OPEN/FETCH/CLOSE y contar las filas procesadas.",
      enunciado: "…",                   // dialecto markdown de §4
      requisitos: [                     // criterios de aceptación, verificables uno por uno
        "Declarar un cursor con un parámetro p_dept_id",
        "Usar %NOTFOUND para salir del LOOP, no un contador fijo",
        "Reportar el total con %ROWCOUNT antes del CLOSE",
      ],
      pistas: ["…"],                    // opcional, se muestran plegadas
      resultadoEsperado: "```\nVentas: 7 empleados procesados\n```",
      solucion: null,                   // ver la nota de abajo
      temas: ["cursores", "%NOTFOUND", "%ROWCOUNT"],
    },
  ],
};
```

Sobre `solucion`: cualquier cosa que se ponga ahí queda visible en el código fuente. Por eso los ejercicios de nivel `propuesto` y `reto` van con `solucion: null` y se apoyan en `requisitos` y `resultadoEsperado`, que permiten autoverificar sin regalar el código. Los de nivel `guiado` sí llevan solución, y eso es deliberado.

### 6.7 Mapeo semana → dataset → ejercicios

**Implementado:** 48 ejercicios, 3 por semana (1 guiado, 1 propuesto, 1 reto) en las 16 semanas. Ése es también el mínimo para cualquier semana que se agregue.

| Semana | Tema | Dataset | Ejercicios propuestos |
|---|---|---|---|
| 1 | Repaso SQL | `rh` | JOIN de 3 tablas con agregado; subconsulta correlacionada de "salario sobre el promedio de su departamento"; `DDL` de una tabla nueva con las 5 restricciones |
| 2 | Bloques y tipos | `rh` | Bloque con `%TYPE` y `IF/ELSIF`; `%ROWTYPE` para una fila completa; `CASE` con bucle `WHILE` |
| 3 | Cursores y procedimientos | `rh` | Cursor explícito con parámetro y `%ROWCOUNT`; cursor `FOR LOOP` con cálculo; procedimiento con `IN`/`OUT` |
| 4 | Diseño del proyecto | `banco` | Detectar 3 fallas en un MER dado; escribir el DDL del MER corregido; justificar qué lógica va en PL/SQL y qué en restricciones |
| 5 | Funciones y paquetes | `inventario` | Función usable dentro de un `SELECT`; paquete con especificación y cuerpo; constante y variable de paquete con estado de sesión |
| 6 | Triggers | `rh` | Trigger `BEFORE` de normalización; trigger `AFTER` de auditoría con `:OLD`/`:NEW`; asignación de ID por secuencia sin caer en tabla mutante |
| 7 | Excepciones y colecciones | `inventario` + `seedMasivo` | Excepción propia con `PRAGMA EXCEPTION_INIT`; `BULK COLLECT` con `LIMIT` y comparación de tiempos contra cursor fila a fila; `FORALL` con `SAVE EXCEPTIONS` |
| 8 | SQL dinámico y seguridad | `inventario` | Convertir una consulta concatenada a variables bind; validar un nombre de tabla con `DBMS_ASSERT`; diseñar roles de lectura y escritura |
| 9 | ACLs y vistas materializadas | `inventario` | Vista materializada con `REFRESH COMPLETE`; pasarla a `FAST REFRESH` creando el `MATERIALIZED VIEW LOG`; medir el costo con y sin ella |
| 10 | 1ª entrega | `banco` | DDL completo del banco con restricciones; carga de datos de prueba coherentes; consultas de verificación de integridad |
| 11 | Examen | `inventario` | Tres **simulacros**, uno por cada pregunta del examen: análisis de productos con `CASE`, cursor explícito de lotes por vencer, y `PKG_INVENTARIO` completo. El dataset es el mismo que evalúa el examen, sembrado desde la semana 5 |
| 12 | Arquitectura y usuarios | `null` (requiere DBA) | Crear usuario con cuota y perfil; rol con privilegios mínimos; consultar `V$SGA` y `DBA_USERS` |
| 13 | 2ª entrega | `banco` | Paquete de transferencias con control transaccional; trigger de validación de saldo; pruebas de integración |
| 14 | Optimización | `inventario` + `seedMasivo` | Leer un `EXPLAIN PLAN` e identificar el `FULL SCAN`; reescribir un predicado para que use índice; recolectar estadísticas y comparar el plan |
| 15 | Almacenamiento | `null` (requiere DBA) | Crear tablespace y datafile; consultar espacio con `DBA_DATA_FILES`; script de monitoreo de porcentaje usado |
| 16 | Presentación final | `banco` | Guion de demo con datos sembrados; 10 preguntas de defensa con respuesta; checklist de verificación previa |

Dependencia importante: la semana 11 (examen) evalúa sobre `inventario`. Ese dataset se introduce en la semana 5 y se amplía en la 7, así que **al llegar al examen el estudiante ya lo tiene sembrado y practicado**. Es la razón principal para haber elegido tres datasets estables en lugar de uno por semana.

### 6.8 Cómo se renderiza

Implementado en `script.js`, en la sección **EJERCICIOS PROPUESTOS -> DIAPOSITIVAS**:

- `exercises.js` y `sql-datasets.js` declaran globals y se cargan como `<script>`, en el orden de §2.4.
- `getWeekSlides(semana)` devuelve el mazo completo: las diapositivas de clase de `weeks-content.js` **concatenadas** con las de ejercicios, generadas al vuelo por `buildExerciseSlides()`. Todo el visor (apertura, navegación, contador, línea de tiempo, botón de la tarjeta) pasa por esa función, así que nada queda desincronizado.
- Las diapositivas de ejercicios **no se escriben a mano** en `weeks-content.js`: se generan desde el dato, y por eso se pueden validar, contar y reutilizar.
- Cada semana con ejercicios añade: una **portada** que los enumera con su nivel, una diapositiva de **dataset** por cada esquema que usen (DDL, datos, volumen adicional y verificación) y una diapositiva **por ejercicio**.
- El dataset va en su propia diapositiva, no repetido dentro de cada ejercicio, y lleva la advertencia de no volver a sembrarlo si ya se hizo en una semana anterior, porque el DDL borra y recrea las tablas.

  *Nota de diseño:* el plan original era mostrarlo plegado. Se descartó porque el parser markdown de §4 no admite HTML inline y añadir `<details>` habría exigido modificarlo. Una diapositiva aparte cumple el mismo objetivo —no repetir el DDL, verlo solo cuando se necesita— sin tocar el parser.
- Nada de `navigator.clipboard`: bajo `file://` no es fiable. El SQL se muestra en un bloque seleccionable con `overflow-x: auto`.
- El buscador indexa el título, el objetivo y los temas de cada ejercicio, además de `data.js`. Buscar `FORALL` o `tabla mutante` encuentra la semana correcta.
- La semana del examen es un caso especial: su tarjeta ofrece **dos** botones, el examen y el simulacro de práctica. La línea de tiempo sigue llevando al examen.
- Todas las clases CSS que necesitan las diapositivas generadas (`slide-type-exercise`, `slide-type-code`, `.slide-subtitle`, `pre.md-code`) ya existían: no hizo falta tocar `styles.css`.

---

## 7. Reglas que no deben repetirse

Cada regla corresponde a un defecto que **estuvo** en el proyecto y ya fue corregido; el diagnóstico original está en [ANALISIS.md](ANALISIS.md). El propósito de esta sección no es la lista de pendientes: es que **ninguno vuelva a entrar**.

Estado: R1 a R7 y R10 corregidas y verificadas. R8 sigue abierta y es una decisión de producto (§9). R9 y R11 son restricciones permanentes, no defectos.

### R1 — Ningún bloque de código truncado ni cerca sin cerrar

Cinco diapositivas se cortan exactamente en el primer operador `<`, resto de una extracción desde JSX donde `<` se leyó como apertura de etiqueta. La cerca queda abierta y el SQL se renderiza como párrafos. **El operador `<` es legítimo en SQL y debe aparecer tal cual.** Verificación obligatoria antes de cada commit de contenido:

```bash
node -e 'const W=eval(require("fs").readFileSync("weeks-content.js","utf8")+"; WEEKS_CONTENT");
let e=0; for(const k in W) W[k].forEach((s,i)=>{ if(((s.md||"").match(/```/g)||[]).length%2) {console.log("CERCA ABIERTA S"+k+"#"+(i+1)+" "+s.title); e=1;} });
process.exit(e)'
```

### R2 — Ningún resto de React/JSX en el contenido

La primera diapositiva del curso muestra `window.open( "https://..." , "_blank", ) }` como texto del enlace. Buscar `window.open`, `className`, `useState`, `onClick` y etiquetas JSX en todo `md`.

### R3 — Cada diapositiva dentro del tema de su semana

S4#4 "Interfaz de Usuario Reactiva" habla de dashboards reactivos y eventos de front-end en una semana de modelado entidad-relación. Antes de agregar una diapositiva: confirmar que su tema está en `SEMANAS[n].temas` de `data.js`.

### R4 — El código de ejemplo debe ser correcto y ejecutable

S7#5 envuelve un `SELECT ... BULK COLLECT INTO` dentro de un cursor `FOR LOOP` sobre la misma tabla; no es el patrón de `BULK COLLECT` con `LIMIT`, y las viñetas al pie mencionan `LIMIT`, `SAVE EXCEPTIONS` y `EXTEND`, que no aparecen en el código. Todo ejemplo se ejecuta contra su dataset declarado antes de darlo por bueno, y **el texto explicativo solo menciona lo que el código realmente hace**.

### R5 — Nada de listas ordenadas

22 casos producen una viñeta que solo contiene el número y el texto como párrafo aparte. El parser no tiene listas ordenadas (§4).

### R6 — Sin diapositivas de relleno

Hoy hay 6 diapositivas de menos de 200 caracteres ("Criterios de Evaluación" con 132, "Estructura de la Presentación" con 164). Mínimo ~350 caracteres de `md`, o se fusiona con la vecina.

### R7 — Escapar toda entrada de usuario antes de `innerHTML`

[script.js:174](script.js#L174) interpola `searchTerm` sin escapar: escribir `<img src=x onerror=alert(1)>` en el buscador ejecuta el script. Todo valor que venga de un `input` pasa por `escapeHtml()`. Al agregar campos nuevos (por ejemplo en los ejercicios), aplicar la misma regla desde el principio.

### R8 — Ninguna evaluación por coincidencia de palabras clave

El calificador de `exam.js` da **100/100 a un bloque de puros comentarios** que liste las palabras clave, y **22/100 a PL/SQL correcto** con otra nomenclatura. Los `requisitos` de un ejercicio son criterios que una persona verifica, no cadenas que se buscan en el texto. Si alguna vez se automatiza la corrección, es contra una base real que ejecute el código, no con `includes()`.

### R9 — Sin dependencias, sin build, sin `fetch` local

Ver §2. Se repite aquí porque es la regla que más tienta al agregar funcionalidad.

### R10 — Sin números de semana codificados

Había un `if (semana === 11)` en la línea de tiempo para detectar el examen, mientras la tarjeta hacía lo correcto con `s.modulo === "ex"`. Ahora las dos derivan del dato. Derivar siempre del dato: si el cronograma cambia, nada debe romperse.

### R11 — Una sola forma de nombrar cada cosa

El contenido original tenía cuatro conflictos de nomenclatura simultáneos: `CURSODB_TBL_*` contra `TBL_*`, `CURSODB.TBL_*` contra `TBL_*`, `dept_id` contra `departamento_id` y `id_empleado` contra `emp_id`. Cada variante rompe algo distinto: el calificador solo reconoce una, el calificador ignora las otras, y los datasets no pueden servir para ejecutar ejemplos que llaman a las columnas de dos maneras.

Antes de introducir un nombre de tabla, columna o parámetro, comprobar que no exista ya con otra forma:

```bash
node -e 'const W=eval(require("fs").readFileSync("weeks-content.js","utf8")+"; WEEKS_CONTENT");
const t=Object.values(W).flat().map(s=>s.md).join("\n");
["departamento_id","dept_id","emp_id","id_empleado","CURSODB"].forEach(c=>{
  const n=(t.match(new RegExp("\\b"+c+"\\b","g"))||[]).length;
  console.log((n?"  ":"OK ")+c+": "+n)})'
```

Las formas canónicas están en §6.3 y son las que usan los datasets. Un ejemplo cuyo código no corre contra su dataset declarado es un ejemplo roto, aunque se vea bien.

---

## 8. Verificación antes de entregar

```bash
# 1. Los archivos de datos parsean y los globals existen
# (nota: un `const` dentro de eval no escapa al scope exterior; hay que devolverlo explícitamente)
node -e 'const d=eval(require("fs").readFileSync("data.js","utf8")+"; ({SEMANAS,MODULOS,CURSO})");
console.log(d.SEMANAS.length+" semanas, "+d.MODULOS.length+" modulos, curso: "+d.CURSO.titulo)'

# 2. Cercas de código balanceadas (regla R1)
node -e 'const W=eval(require("fs").readFileSync("weeks-content.js","utf8")+"; WEEKS_CONTENT");
let e=0; for(const k in W) W[k].forEach((s,i)=>{ if(((s.md||"").match(/```/g)||[]).length%2){console.log("CERCA ABIERTA S"+k+"#"+(i+1));e=1;} });
console.log(e?"FALLA":"OK cercas"); process.exit(e)'

# 3. Restos de JSX (regla R2)
grep -nE 'window\.open|className|useState|onClick' weeks-content.js exercises.js sql-datasets.js \
  && echo "FALLA: restos de JSX" || echo "OK sin restos JSX"

# 4. Nomenclatura canonica (regla R11) — ver el comando de R11 arriba

# 5. Integridad de los ejercicios: ids unicos y bien formados, dataset existente,
#    nivel valido, guiado con solucion, propuesto/reto sin solucion, 3+ requisitos,
#    cercas balanceadas en todos los campos, sin listas ordenadas
node -e 'const D=eval(require("fs").readFileSync("sql-datasets.js","utf8")+"; DATASETS");
const E=eval(require("fs").readFileSync("exercises.js","utf8")+"; WEEK_EXERCISES");
const ids=new Set(); const err=[];
for(const k in E) E[k].forEach(x=>{
  if(ids.has(x.id)) err.push("id duplicado "+x.id); ids.add(x.id);
  if(!/^s\d\d-e\d\d$/.test(x.id)) err.push("id mal formado "+x.id);
  if(x.dataset!==null && !D[x.dataset]) err.push(x.id+" dataset inexistente");
  if(!["guiado","propuesto","reto"].includes(x.nivel)) err.push(x.id+" nivel invalido");
  if(x.nivel==="guiado" && !x.solucion) err.push(x.id+" guiado sin solucion");
  if(x.nivel!=="guiado" && x.solucion) err.push(x.id+" "+x.nivel+" NO debe traer solucion");
  if(!x.requisitos || x.requisitos.length<3) err.push(x.id+" menos de 3 requisitos");
  ["enunciado","solucion","resultadoEsperado"].forEach(c=>{
    if(x[c] && (x[c].match(/```/g)||[]).length%2) err.push(x.id+" cerca abierta en "+c)});
  if(x.enunciado && /^\d+\.\s/m.test(x.enunciado)) err.push(x.id+" lista ordenada")});
console.log(err.length? "FALLA:\n  "+err.join("\n  ") : "OK "+ids.size+" ejercicios validos");
process.exit(err.length?1:0)'

# 6. Prueba de humo end-to-end: carga los 6 scripts en orden como el navegador,
#    genera los 16 mazos y comprueba que todo bloque SQL produce <pre class=md-code>.
#    Es la verificacion mas valiosa: detecta cualquier desincronizacion entre
#    los datos, el generador de diapositivas y el parser markdown.
node tools/smoke.js
```

Y a mano, en el navegador: abrir `index.html` desde el disco, recorrer las diapositivas de la semana tocada con las flechas, comprobar que **todo bloque SQL se ve con fondo de código** y no como párrafos, y que el DDL nuevo corre limpio dos veces seguidas en Oracle (prueba de idempotencia).

---

## 9. Estado del trabajo

**Hecho:**

1. **Este archivo.**
2. **Ejercicios ejecutables (§6).** `sql-datasets.js` con los tres datasets, `exercises.js` con 48 ejercicios, el generador de diapositivas en `script.js` y los `<script>` en `index.html`. El sitio pasó de 138 a 216 diapositivas.
3. **Defectos de [ANALISIS.md](ANALISIS.md) corregidos:** los 5 truncamientos de R1, el enlace JSX de R2, la reescritura de S7#5 (`BULK COLLECT`) y S4#4 (fuera de alcance), el XSS de R7, las 22 listas de R5, las 6 diapositivas de relleno de R6, el número de semana fijo de R10 y los 4 conflictos de nomenclatura de R11.
4. **`tools/smoke.js`**, que verifica todo lo anterior en una sola ejecución.

**Pendiente, y es una decisión de producto, no técnica:**

5. **Qué es el examen.** Hoy su calificador da 100/100 a un bloque de puros comentarios y 22/100 a PL/SQL correcto con otra nomenclatura, sus dos claves están en claro y la nota no se guarda en ningún lado. Las opciones son:

   - **Backend:** califica de verdad, las claves dejan de estar en el cliente y la nota queda registrada. Rompe la restricción de "sin backend" de §2, así que es un cambio de alcance.
   - **Autoevaluación honesta:** se le quitan las claves y el discurso de nota, y se presenta como lo que es: una guía de estudio con retroalimentación automática.

   **No tocar `exam.js` sin decidir esto primero.** Cualquier arreglo parcial —cambiar las claves, endurecer el calificador— gasta trabajo sin resolver el problema de fondo, porque la lógica es visible en el cliente por diseño.

Los ejercicios de la semana 11 son simulacros de las tres preguntas del examen y son independientes de esa decisión: sirven igual en cualquiera de los dos escenarios.

### La carpeta `tools/`

No se despliega: no forma parte del sitio. Contiene `smoke.js`, sin dependencias, que corre con `node` a secas. Al publicar en GitHub Pages puede subirse o no, es indiferente para la página.
