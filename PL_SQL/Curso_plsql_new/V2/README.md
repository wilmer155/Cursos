# Curso PL/SQL y Administración Oracle — Sitio del curso

Sitio estático (HTML + CSS + JavaScript puro, sin frameworks ni build) que
presenta el programa de un curso universitario de PL/SQL y Administración
Oracle: línea de tiempo de 16 semanas, contenido semanal filtrable y
buscable, **el contenido real de cada clase en formato de diapositivas
navegables**, un **examen final con calificación automática**, seguimiento
de avance y bibliografía.

## Archivos

| Archivo             | Qué contiene                                                                 |
|----------------------|-------------------------------------------------------------------------------|
| `index.html`         | Estructura de la página (secciones, textos fijos, modales).                  |
| `styles.css`         | Todo el diseño visual (colores, tipografías, layout, responsive, modales).   |
| `data.js`            | Resumen del curso: título, módulos, descripción corta por semana, bibliografía. |
| `weeks-content.js`   | **Contenido real de cada clase** (diapositivas con teoría, código y ejercicios), extraído del material original del curso. |
| `sql-datasets.js`    | **DDL y datos de prueba** de los tres esquemas sobre los que se ejecutan los ejercicios (RH, inventario y banco). |
| `exercises.js`       | **48 ejercicios propuestos** (3 por semana) con enunciado, criterios de aceptación y dataset asociado. |
| `script.js`          | Lógica general: renderiza `data.js`, filtros, búsqueda, progreso, visor de diapositivas. |
| `exam.js`            | Examen final: control de acceso por clave y calificación automática del código PL/SQL entregado. |

## Editar el contenido

- Para el resumen de cada semana (título corto, descripción, temas puntuales
  en la tarjeta): edita **`data.js`**.
- Para el contenido real de cada clase (lo que se ve al pulsar "Ver clase
  (diapositivas)"): edita **`weeks-content.js`**. Cada semana es un arreglo
  de diapositivas con esta forma:

```js
{
  "title": "Título de la diapositiva",
  "subtitle": null,           // opcional
  "type": "content",          // "intro" | "content" | "code" | "exercise"
  "md": "### Encabezado\n\nTexto...\n\n- punto 1\n- punto 2\n\n```sql\nSELECT 1 FROM dual;\n```"
}
```

El campo `md` acepta un formato de texto simple: `##`, `###`, `####` para
encabezados, `- ` para viñetas, `**texto**` para negrita, y bloques de
código con ```` ```sql ... ``` ````.

- Para los **ejercicios propuestos** de cada semana: edita **`exercises.js`**.
  Cada ejercicio declara sobre qué dataset se ejecuta, su nivel (`guiado`,
  `propuesto` o `reto`), el enunciado y sus criterios de aceptación. Las
  diapositivas de ejercicios **no se escriben a mano**: `script.js` las genera
  desde ese archivo.

- Para el **DDL y los datos de prueba**: edita **`sql-datasets.js`**. Hay tres
  esquemas (`rh`, `inventario` y `banco`) y cada uno trae estructura, datos,
  carga de volumen y consultas de verificación.

- Para el examen final (preguntas, rúbrica y lógica de calificación): edita
  **`exam.js`**. Antes de tocarlo, lee la sección 9 de `AGENTS.md`.

Antes de dar por bueno un cambio de contenido, corre la verificación:

```
node tools/smoke.js
```

Carga los seis scripts en el mismo orden que `index.html`, genera las 216
diapositivas y comprueba que ningún bloque de código quedó sin cerrar, que no
hay restos del material original en React y que la nomenclatura de tablas y
columnas es consistente. Las convenciones del proyecto están en `AGENTS.md`.

## ⚠️ Nota de seguridad sobre el examen final

`exam.js` incluye, tal como estaba en el material original, la clave de
acceso al examen y la clave del docente **directamente en el código**,
con una ofuscación simple (desplazamiento de caracteres + Base64) que
**no es segura**: cualquiera que abra las herramientas de desarrollador
del navegador puede leer ambas claves en segundos.

Esto se mantuvo así a petición explícita, pero si vas a publicar este
repositorio en GitHub de forma pública:

- Cambia esas claves por otras que no te importe que se filtren, o
- Considera mover la validación de claves y la calificación a un backend
  (por ejemplo, una función serverless) en vez de dejarlas en el cliente.

La calificación del examen es 100% basada en reglas (búsqueda de palabras
clave y estructuras en el texto del código entregado), no usa ninguna IA
ni servicio externo.

## Funcionalidades

- **Línea de tiempo de módulos**: muestra visualmente que el proyecto final
  (un sistema bancario) y el examen se intercalan entre las semanas de
  teoría. Al hacer clic en una semana se abre directamente su clase o el
  examen.
- **Visor de diapositivas por semana**: cada tarjeta tiene un botón "Ver
  clase (diapositivas)" que abre un modal navegable (← →, teclado incluido)
  con el contenido real de esa semana: teoría, ejemplos de código SQL/PL-SQL
  y ejercicios. Cada semana incluye además un **ejemplo adicional**, una
  sección de **errores comunes** y un **ejercicio de práctica sin resolver**
  antes del ejercicio final original, para reforzar el aprendizaje.
- **Examen final interactivo**: acceso protegido por clave, envío de código
  PL/SQL, verificación sin nota y evaluación con nota final (clave del
  docente requerida para esta última), igual que en el material original.
- **Ejercicios propuestos con su DDL y sus datos**: cada semana cierra con tres
  ejercicios ejecutables (uno guiado con solución, uno propuesto y un reto) más
  una diapositiva con el esquema completo —estructura, datos de prueba, carga de
  volumen y consultas de verificación— para que el estudiante pueda practicar en
  una base real sin pedir nada. El DDL es idempotente: corre limpio dos veces
  seguidas. Los ejercicios de la semana 11 son simulacros de las tres preguntas
  del examen, sobre el mismo esquema que éste evalúa.

- **Filtros por módulo** y **buscador** por palabra clave sobre el
  contenido semanal (incluye las descripciones y los ejercicios).
- **Seguimiento de avance**: cada semana se puede marcar como completada;
  se guarda en el navegador del usuario (`localStorage`).
- Totalmente responsive y con foco de teclado visible para accesibilidad.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube estos archivos (`index.html`,
   `styles.css`, `data.js`, `weeks-content.js`, `sql-datasets.js`,
   `exercises.js`, `script.js`, `exam.js`) tal cual, en la raíz del repo.
   La carpeta `tools/` es solo para verificación y no hace falta subirla.
2. Ve a **Settings → Pages**.
3. En "Branch", selecciona `main` y la carpeta `/root`, luego **Save**.
4. Espera uno o dos minutos: GitHub te dará una URL del tipo
   `https://tu-usuario.github.io/tu-repositorio/`.

También puedes simplemente abrir `index.html` directamente en el navegador
para probarlo en tu computador, sin necesidad de subirlo a ningún lado.

## Personalizar el diseño

Los colores y tipografías están centralizados como variables al inicio de
`styles.css`, dentro de `:root`. Por ejemplo, para cambiar el color del
Módulo 1 (ámbar) por otro color, solo cambia:

```css
--mod1: #f2b84b;
```

