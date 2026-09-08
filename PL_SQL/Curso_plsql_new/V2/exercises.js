/* ============================================================
   EJERCICIOS PROPUESTOS POR SEMANA
   WEEK_EXERCISES[n] = arreglo de ejercicios.

   Forma de un ejercicio (ver AGENTS.md §6.6):
     id                sNN-eMM, estable, nunca se reutiliza
     titulo
     dataset           clave de DATASETS en sql-datasets.js, o null
     nivel             "guiado" | "propuesto" | "reto"
     objetivo          una frase: que se practica
     enunciado         dialecto markdown de AGENTS.md §4
     requisitos        criterios de aceptacion verificables
     pistas            opcional
     resultadoEsperado opcional
     solucion          solo en nivel "guiado" (ver nota abajo)
     temas             para el buscador

   NOTA: todo lo que se escriba en "solucion" queda visible en el
   codigo fuente de la pagina. Por eso los niveles "propuesto" y
   "reto" van con solucion: null y se apoyan en "requisitos" y
   "resultadoEsperado", que permiten autoverificar sin regalar
   el codigo.
   ============================================================ */

const WEEK_EXERCISES = {
  /* ========================= SEMANA 1 ========================= */
  1: [
    {
      id: "s01-e01",
      titulo: "Reporte de plantilla por departamento",
      dataset: "rh",
      nivel: "guiado",
      objetivo:
        "Combinar dos tablas con JOIN y agrupar con funciones de agregado, cuidando el caso de los registros sin pareja.",
      enunciado: `Construye una consulta que muestre, para **cada departamento**, cuántos empleados tiene, el salario promedio y el salario más alto.

El resultado debe incluir también a los empleados que **no tienen departamento asignado** (hay dos en el dataset), agrupados bajo la etiqueta \`SIN ASIGNAR\`.

Ordena de mayor a menor masa salarial.`,
      requisitos: [
        "Usar `RIGHT JOIN` o `LEFT JOIN` según desde qué tabla se parta, no `INNER JOIN`",
        "Agrupar por el nombre del departamento, no por su id",
        "Usar `NVL` o `COALESCE` para la etiqueta `SIN ASIGNAR`",
        "Redondear el promedio a cero decimales",
      ],
      pistas: [
        "Con `INNER JOIN` los dos empleados sin departamento desaparecen del resultado. Ese es justamente el punto del ejercicio.",
        "`COUNT(*)` cuenta filas; `COUNT(columna)` ignora los NULL. Aquí importa la diferencia.",
      ],
      resultadoEsperado: `\`\`\`
NOMBRE          EMPLEADOS  SALARIO_PROM  SALARIO_MAX  MASA
Sistemas                5       6420000      9500000  32100000
Finanzas                4       5550000      8900000  22200000
Ventas                  5       3900000      6800000  19500000
Logística               6       3666667      7600000  22000000
SIN ASIGNAR             2       3800000      4100000   7600000
\`\`\``,
      solucion: `\`\`\`sql
SELECT NVL(d.nombre, 'SIN ASIGNAR')      AS nombre,
       COUNT(e.emp_id)                   AS empleados,
       ROUND(AVG(e.salario))             AS salario_prom,
       MAX(e.salario)                    AS salario_max,
       SUM(e.salario)                    AS masa
FROM empleados e
LEFT JOIN departamentos d
  ON e.departamento_id = d.departamento_id
GROUP BY NVL(d.nombre, 'SIN ASIGNAR')
ORDER BY masa DESC;
\`\`\`

Se parte de \`empleados\` con \`LEFT JOIN\` porque son los empleados los que pueden no tener pareja. Si se partiera de \`departamentos\`, el \`LEFT JOIN\` mostraría departamentos vacíos pero perdería a los empleados sin asignar.`,
      temas: ["JOIN", "LEFT JOIN", "GROUP BY", "agregados", "NVL"],
    },
    {
      id: "s01-e02",
      titulo: "Empleados que ganan más que el promedio de su departamento",
      dataset: "rh",
      nivel: "propuesto",
      objetivo:
        "Escribir una subconsulta correlacionada: la subconsulta depende de la fila que está evaluando la consulta externa.",
      enunciado: `Lista los empleados cuyo salario **supera el promedio de su propio departamento**. No sirve comparar contra el promedio general de la empresa: cada empleado se compara contra el promedio del departamento al que pertenece.

Muestra nombre completo, departamento, salario del empleado y el promedio de su departamento, ordenado por departamento y luego por salario descendente.

Los empleados sin departamento quedan fuera de este reporte.`,
      requisitos: [
        "La subconsulta debe estar correlacionada con la consulta externa por `departamento_id`",
        "No usar una tabla temporal ni una vista: se resuelve en una sola sentencia",
        "Concatenar nombre y apellido en una sola columna",
        "El promedio mostrado debe ser el del departamento de esa fila, no el global",
      ],
      pistas: [
        "Una subconsulta correlacionada referencia un alias de la consulta externa dentro de su propio `WHERE`.",
        "Si el resultado te da el mismo promedio en todas las filas, la subconsulta no está correlacionada.",
      ],
      resultadoEsperado: `Deben salir **8 filas**. Por ejemplo, en Ventas el promedio es 3.900.000, así que aparecen Marta Gil (6.800.000) y Ana Ríos (4.200.000), pero no Luis Peña (3.100.000).`,
      solucion: null,
      temas: ["subconsulta correlacionada", "AVG", "comparación por grupo"],
    },
    {
      id: "s01-e03",
      titulo: "DDL de una tabla de capacitaciones",
      dataset: "rh",
      nivel: "reto",
      objetivo:
        "Escribir DDL desde cero aplicando los cinco tipos de restricción y comprobar que cada una realmente rechaza lo que debe rechazar.",
      enunciado: `Crea una tabla \`capacitaciones\` que registre los cursos que toma cada empleado. Debe tener, como mínimo: un identificador propio, el empleado que la tomó, el nombre del curso, la fecha de inicio, la fecha de fin, la cantidad de horas y el estado.

La tabla debe llevar **las cinco clases de restricción**: clave primaria, clave foránea hacia \`empleados\`, \`NOT NULL\`, \`UNIQUE\` y \`CHECK\`.

Después de crearla, escribe **cinco sentencias \`INSERT\` que deban fallar**, una por cada restricción, y anota qué error de Oracle devuelve cada una.`,
      requisitos: [
        "El `CHECK` debe validar algo no trivial: que la fecha de fin no sea anterior a la de inicio, o que las horas sean positivas",
        "El `UNIQUE` debe impedir que el mismo empleado se inscriba dos veces al mismo curso (restricción sobre dos columnas)",
        "La clave foránea debe declarar explícitamente su comportamiento ante el borrado del empleado",
        "Cada `INSERT` que falla viene acompañado del código `ORA-` que produce",
        "El script completo debe ser idempotente: correrlo dos veces seguidas no da error",
      ],
      pistas: [
        "Un `UNIQUE` sobre varias columnas se declara a nivel de tabla, no de columna.",
        "`ORA-02290` es violación de CHECK, `ORA-00001` de UNIQUE, `ORA-02291` de clave foránea. Confírmalos ejecutando.",
      ],
      solucion: null,
      temas: ["DDL", "CREATE TABLE", "restricciones", "CHECK", "UNIQUE", "FOREIGN KEY"],
    },
  ],

  /* ========================= SEMANA 2 ========================= */
  2: [
    {
      id: "s02-e01",
      titulo: "Clasificar un salario con %TYPE e IF/ELSIF",
      dataset: "rh",
      nivel: "guiado",
      objetivo:
        "Escribir un bloque anónimo completo declarando variables ancladas al tipo de la columna con %TYPE.",
      enunciado: `Escribe un bloque PL/SQL anónimo que reciba un \`emp_id\` fijo en una variable, consulte ese empleado y muestre por consola su nombre, su salario y una categoría calculada:

- menos de 3.000.000 → \`BASICO\`
- entre 3.000.000 y 6.000.000 → \`MEDIO\`
- más de 6.000.000 → \`ALTO\`

Todas las variables que reciban datos de la tabla deben declararse con \`%TYPE\`, nunca con un tipo escrito a mano.`,
      requisitos: [
        "Declarar las variables con `%TYPE` sobre las columnas de `empleados`",
        "Usar `IF / ELSIF / ELSE`, no `CASE`",
        "Manejar `NO_DATA_FOUND` con un mensaje claro si el empleado no existe",
        "Habilitar la salida con `SET SERVEROUTPUT ON` antes de ejecutar",
      ],
      pistas: [
        "`%TYPE` se escribe `tabla.columna%TYPE`. Si mañana la columna cambia de tamaño, el bloque sigue funcionando sin tocarlo.",
        "Prueba con el emp_id 1006 (9.500.000) y con uno que no exista, como 9999.",
      ],
      resultadoEsperado: `\`\`\`
Empleado: Diego Lara
Salario: 9500000
Categoria: ALTO
\`\`\``,
      solucion: `\`\`\`sql
SET SERVEROUTPUT ON;

DECLARE
  v_emp_id    empleados.emp_id%TYPE   := 1006;
  v_nombre    empleados.nombre%TYPE;
  v_apellido  empleados.apellido%TYPE;
  v_salario   empleados.salario%TYPE;
  v_categoria VARCHAR2(10);
BEGIN
  SELECT nombre, apellido, salario
    INTO v_nombre, v_apellido, v_salario
  FROM empleados
  WHERE emp_id = v_emp_id;

  IF v_salario < 3000000 THEN
    v_categoria := 'BASICO';
  ELSIF v_salario <= 6000000 THEN
    v_categoria := 'MEDIO';
  ELSE
    v_categoria := 'ALTO';
  END IF;

  DBMS_OUTPUT.PUT_LINE('Empleado: ' || v_nombre || ' ' || v_apellido);
  DBMS_OUTPUT.PUT_LINE('Salario: '  || v_salario);
  DBMS_OUTPUT.PUT_LINE('Categoria: '|| v_categoria);
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('No existe el empleado ' || v_emp_id);
END;
/
\`\`\`

Nótese el orden de las condiciones: como el \`ELSIF\` solo se evalúa si el \`IF\` fue falso, basta con \`v_salario <= 6000000\` sin repetir la cota inferior.`,
      temas: ["bloque anónimo", "%TYPE", "IF ELSIF", "DBMS_OUTPUT", "NO_DATA_FOUND"],
    },
    {
      id: "s02-e02",
      titulo: "Una fila completa en una sola variable con %ROWTYPE",
      dataset: "rh",
      nivel: "propuesto",
      objetivo:
        "Manejar un registro completo con %ROWTYPE en lugar de declarar una variable por columna.",
      enunciado: `Reescribe el ejercicio anterior usando **una sola variable** \`%ROWTYPE\` en lugar de una variable por columna.

Además, amplíalo: el bloque debe mostrar también la antigüedad del empleado en años completos y una advertencia si el empleado está \`INACTIVO\`.

Luego declara un \`RECORD\` propio que contenga solo tres campos (nombre completo, salario y antigüedad) y llénalo a partir del \`%ROWTYPE\`. Compara en un comentario cuándo conviene cada uno.`,
      requisitos: [
        "Una única variable `empleados%ROWTYPE` recibe el `SELECT * INTO`",
        "El `RECORD` propio se declara con `TYPE ... IS RECORD` en la sección `DECLARE`",
        "La antigüedad se calcula con funciones de fecha, no restando días a mano",
        "El comentario explica la diferencia: `%ROWTYPE` se adapta si la tabla cambia, el `RECORD` expone solo lo que interesa",
      ],
      pistas: [
        "`MONTHS_BETWEEN(SYSDATE, fecha) / 12` con `FLOOR` da los años completos.",
        "Con `%ROWTYPE` el `SELECT` es `SELECT * INTO v_emp FROM ...`, sin listar columnas.",
      ],
      resultadoEsperado: `Para el emp_id 1005 (Sofía Mora, INACTIVO) debe aparecer la advertencia de estado, y la antigüedad calculada desde el 2022-05-30.`,
      solucion: null,
      temas: ["%ROWTYPE", "RECORD", "MONTHS_BETWEEN", "bloque anónimo"],
    },
    {
      id: "s02-e03",
      titulo: "Escalafón salarial con CASE y WHILE",
      dataset: "rh",
      nivel: "reto",
      objetivo:
        "Combinar un bucle WHILE con una expresión CASE y entender por qué CASE no siempre puede sustituir a IF.",
      enunciado: `Escribe un bloque que simule el crecimiento del salario de un empleado a lo largo de los años.

Partiendo del salario actual del empleado 1004, aplica un aumento anual con un bucle \`WHILE\` hasta que el salario supere los 5.000.000. El porcentaje de aumento depende del tramo en el que esté el salario en cada vuelta, y se decide con una expresión \`CASE\`:

- por debajo de 3.000.000 → 12% anual
- entre 3.000.000 y 4.000.000 → 8% anual
- por encima de 4.000.000 → 5% anual

Muestra el detalle de cada año y, al final, cuántos años tomó y el salario alcanzado.`,
      requisitos: [
        "El bucle es `WHILE`, no `FOR` ni `LOOP` con `EXIT`",
        "El porcentaje se resuelve con `CASE`, en su forma de expresión que devuelve un valor",
        "Un tope de seguridad corta el bucle si pasa de 50 años, para no colgar la sesión",
        "El bloque no modifica la tabla: es una simulación en memoria",
      ],
      pistas: [
        "`CASE` como expresión (`v_pct := CASE WHEN ... THEN ... END;`) devuelve un valor. `CASE` como sentencia ejecuta instrucciones. Aquí quieres el primero.",
        "Un bucle `WHILE` cuya condición nunca cambia es un cuelgue. El tope de seguridad no es opcional.",
      ],
      solucion: null,
      temas: ["WHILE", "CASE", "estructuras de control", "simulación"],
    },
  ],

  /* ========================= SEMANA 3 ========================= */
  3: [
    {
      id: "s03-e01",
      titulo: "Cursor explícito con parámetro y contador de filas",
      dataset: "rh",
      nivel: "guiado",
      objetivo:
        "Recorrer un resultado fila por fila con el ciclo completo OPEN / FETCH / CLOSE y controlar la salida con %NOTFOUND.",
      enunciado: `Escribe un bloque que recorra los empleados **activos** de un departamento recibido como parámetro del cursor, muestre cada uno por consola y al final informe cuántos procesó.

El cursor debe declararse con un parámetro. El bucle debe ser manual: \`OPEN\`, \`FETCH\` dentro de un \`LOOP\`, salida por \`%NOTFOUND\` y \`CLOSE\`. No uses cursor \`FOR LOOP\` en este ejercicio; ese es el siguiente.`,
      requisitos: [
        "El cursor recibe el departamento como parámetro, no lo lleva fijo en el `WHERE`",
        "La salida del bucle es `EXIT WHEN c_emp%NOTFOUND`, colocado inmediatamente después del `FETCH`",
        "El total se reporta con `%ROWCOUNT` **antes** del `CLOSE`",
        "El cursor se cierra siempre, incluso si ocurre una excepción",
      ],
      pistas: [
        "Si pones el `EXIT WHEN` antes del `FETCH`, procesas una fila de más o de menos. El orden importa.",
        "`%ROWCOUNT` después del `CLOSE` lanza `ORA-01001: invalid cursor`. Léelo mientras el cursor sigue abierto.",
      ],
      resultadoEsperado: `\`\`\`
Departamento 20
  1006 Diego Lara            9500000
  1007 Elena Ruiz            7200000
  1008 Pablo Cano            5400000
  1009 Irene Vega            3900000
  1010 Hugo Nieto            6100000
Empleados procesados: 5
\`\`\``,
      solucion: `\`\`\`sql
SET SERVEROUTPUT ON;

DECLARE
  CURSOR c_emp (p_departamento_id NUMBER) IS
    SELECT emp_id, nombre, apellido, salario
    FROM empleados
    WHERE departamento_id = p_departamento_id
      AND estado = 'ACTIVO'
    ORDER BY emp_id;

  v_fila   c_emp%ROWTYPE;
  v_total  PLS_INTEGER := 0;
  v_dept   NUMBER := 20;
BEGIN
  DBMS_OUTPUT.PUT_LINE('Departamento ' || v_dept);

  OPEN c_emp(v_dept);
  LOOP
    FETCH c_emp INTO v_fila;
    EXIT WHEN c_emp%NOTFOUND;

    DBMS_OUTPUT.PUT_LINE('  ' || v_fila.emp_id || ' ' ||
      RPAD(v_fila.nombre || ' ' || v_fila.apellido, 20) || v_fila.salario);
  END LOOP;

  v_total := c_emp%ROWCOUNT;   -- antes del CLOSE
  CLOSE c_emp;

  DBMS_OUTPUT.PUT_LINE('Empleados procesados: ' || v_total);
EXCEPTION
  WHEN OTHERS THEN
    IF c_emp%ISOPEN THEN
      CLOSE c_emp;
    END IF;
    RAISE;
END;
/
\`\`\`

El bloque \`EXCEPTION\` con \`%ISOPEN\` es lo que evita dejar cursores abiertos si algo falla a mitad del recorrido.`,
      temas: ["cursores explícitos", "OPEN FETCH CLOSE", "%NOTFOUND", "%ROWCOUNT", "%ISOPEN"],
    },
    {
      id: "s03-e02",
      titulo: "Cursor FOR LOOP con cálculo acumulado",
      dataset: "rh",
      nivel: "propuesto",
      objetivo:
        "Usar el cursor FOR LOOP, que declara la variable de recorrido y gestiona OPEN, FETCH y CLOSE por sí solo.",
      enunciado: `Reescribe el ejercicio anterior con un cursor \`FOR LOOP\` y amplíalo: recorre **todos** los departamentos y, para cada uno, lista sus empleados activos y muestra un subtotal de la masa salarial del departamento. Al final, el total general.

Vas a necesitar dos cursores anidados: uno sobre departamentos y otro sobre los empleados de cada departamento.

En un comentario, explica cuántas líneas de código te ahorró el \`FOR LOOP\` frente a la versión manual y en qué caso seguirías prefiriendo la manual.`,
      requisitos: [
        "Los dos bucles son cursores `FOR LOOP`; no aparece ningún `OPEN`, `FETCH` ni `CLOSE`",
        "El cursor interno recibe el departamento del externo como parámetro",
        "Hay un subtotal por departamento y un total general, ambos calculados en PL/SQL",
        "El comentario menciona al menos un caso donde el cursor manual sigue siendo necesario",
      ],
      pistas: [
        "En un `FOR LOOP` la variable de recorrido no se declara: existe solo dentro del bucle.",
        "El cursor manual sigue haciendo falta cuando necesitas `BULK COLLECT ... LIMIT`, o cuando la salida del bucle depende de algo más que el fin de los datos.",
      ],
      resultadoEsperado: `Cuatro bloques de departamento más los subtotales. El total general de los empleados activos debe dar **95.800.000** (los 22 empleados menos los dos inactivos: 2.600.000 de Sofía Mora y 3.000.000 de Sara Luna, y menos los dos sin departamento).`,
      solucion: null,
      temas: ["cursor FOR LOOP", "cursores anidados", "acumuladores"],
    },
    {
      id: "s03-e03",
      titulo: "Procedimiento de ajuste salarial con parámetros IN y OUT",
      dataset: "rh",
      nivel: "reto",
      objetivo:
        "Crear un procedimiento almacenado que reciba datos, devuelva resultados por parámetros OUT y valide sus entradas antes de tocar la tabla.",
      enunciado: `Crea un procedimiento \`ajustar_salarios\` que aplique un aumento porcentual a todos los empleados activos de un departamento.

Firma esperada:

\`\`\`sql
PROCEDURE ajustar_salarios (
  p_departamento_id IN  NUMBER,
  p_porcentaje      IN  NUMBER,
  p_afectados       OUT NUMBER,
  p_masa_anterior   OUT NUMBER,
  p_masa_nueva      OUT NUMBER
);
\`\`\`

Debe validar que el departamento exista y que el porcentaje esté entre 0 y 30. Si algo no cuadra, lanza un error de negocio con \`RAISE_APPLICATION_ERROR\` y **no modifica nada**.

Después escribe un bloque anónimo que lo invoque y muestre los tres valores de salida.`,
      requisitos: [
        "Los parámetros `OUT` se asignan siempre, incluso cuando no se afecta ninguna fila",
        "Las validaciones ocurren antes del `UPDATE`, no después",
        "Los códigos de `RAISE_APPLICATION_ERROR` están en el rango permitido, entre -20000 y -20999",
        "El procedimiento no hace `COMMIT`: la transacción la decide quien lo llama",
        "El bloque de prueba demuestra un caso válido y uno que falla",
      ],
      pistas: [
        "Un procedimiento que hace `COMMIT` por su cuenta le quita al llamador la posibilidad de deshacer. Es una decisión de diseño, no un detalle.",
        "`SQL%ROWCOUNT` después del `UPDATE` te da las filas afectadas sin una consulta extra.",
      ],
      solucion: null,
      temas: ["procedimientos", "parámetros IN OUT", "RAISE_APPLICATION_ERROR", "SQL%ROWCOUNT"],
    },
  ],

  /* ========================= SEMANA 4 ========================= */
  4: [
    {
      id: "s04-e01",
      titulo: "Auditar un MER con errores",
      dataset: "banco",
      nivel: "guiado",
      objetivo:
        "Leer un diseño ajeno y detectar los problemas estructurales antes de escribir una línea de código.",
      enunciado: `Un equipo entrega este diseño para el sistema bancario:

\`\`\`sql
CREATE TABLE cuentas_mal (
  numero_cuenta   VARCHAR2(20),
  nombre_cliente  VARCHAR2(80),
  cedula_cliente  VARCHAR2(20),
  direccion       VARCHAR2(120),
  tipo            VARCHAR2(50),
  saldo           NUMBER,
  ultimo_movim    VARCHAR2(200)
);
\`\`\`

Encuentra **al menos cinco defectos** y explica en cada caso qué problema concreto causa en producción, no solo que "está mal".

Luego indica qué entidades debería haber en su lugar y qué relación tienen entre sí.`,
      requisitos: [
        "Identificar la falta de clave primaria y qué permite eso (filas duplicadas indistinguibles)",
        "Identificar la redundancia de los datos del cliente y el problema de actualización que genera",
        "Identificar `saldo NUMBER` sin escala y por qué es grave que sea dinero",
        "Identificar el historial guardado como texto en una sola columna",
        "Proponer la separación en al menos tres entidades con sus relaciones",
      ],
      pistas: [
        "Piensa qué pasa cuando un cliente con tres cuentas se cambia de casa: ¿cuántas filas hay que actualizar y qué pasa si una falla?",
        "`NUMBER` sin escala acepta 0.333333333. En dinero, eso son centavos que aparecen de la nada.",
      ],
      solucion: `Los defectos principales:

- **Sin clave primaria.** Nada impide insertar dos veces la misma cuenta, y no hay forma de referenciar una fila desde otra tabla.

- **Datos del cliente repetidos en cada cuenta.** Un cliente con tres cuentas tiene su nombre y dirección escritos tres veces. Al cambiar de dirección hay que actualizar tres filas: si una falla, el sistema queda con dos versiones de la verdad. Es la anomalía de actualización clásica.

- **\`saldo NUMBER\` sin escala.** Acepta cualquier cantidad de decimales. En dinero debe ser \`NUMBER(14,2)\`, y además necesita un \`CHECK (saldo >= 0)\` si el producto no admite sobregiro.

- **\`tipo VARCHAR2(50)\` sin restricción.** Acepta 'AHORROS', 'ahorros', 'Ahoros' y 'cuenta de ahorro' como valores distintos. Necesita un \`CHECK\` con la lista cerrada.

- **\`ultimo_movim\` como texto.** Solo guarda el último movimiento, así que no hay historial, y al ser texto libre no se puede sumar, filtrar por fecha ni auditar.

- **\`numero_cuenta VARCHAR2\`.** Si es un número, el tipo debe ser numérico; como texto, '0010' y '10' son cuentas diferentes.

Estructura correcta: **clientes** (uno por persona, con la identificación como \`UNIQUE\`), **cuentas** (varias por cliente, con \`FOREIGN KEY\` hacia clientes) y **transacciones** (varias por cuenta, con \`FOREIGN KEY\` hacia cuentas y una fila por movimiento). La relación es uno a muchos en ambos saltos.`,
      temas: ["MER", "normalización", "anomalías de actualización", "tipos de datos", "dinero"],
    },
    {
      id: "s04-e02",
      titulo: "DDL del modelo bancario corregido",
      dataset: "banco",
      nivel: "propuesto",
      objetivo:
        "Traducir un modelo entidad-relación a DDL ejecutable, con las restricciones que hacen cumplir las reglas del negocio.",
      enunciado: `Escribe el DDL completo del modelo que propusiste en el ejercicio anterior: \`clientes\`, \`cuentas\` y \`transacciones\`, con sus secuencias.

Cada regla de negocio que se pueda expresar como restricción declarativa debe estar como restricción, no dejada a la aplicación:

- una cuenta pertenece siempre a un cliente que existe
- el saldo nunca queda negativo
- el tipo de cuenta y el estado pertenecen a listas cerradas
- la identificación del cliente es única
- el monto de una transacción es siempre positivo

El script debe correr limpio dos veces seguidas.`,
      requisitos: [
        "Todas las restricciones llevan nombre explícito (`CONSTRAINT ck_...`), no el nombre generado por Oracle",
        "Los importes de dinero son `NUMBER(14,2)`",
        "El teardown inicial tolera que las tablas no existan todavía",
        "El orden de creación y de borrado respeta las dependencias de clave foránea",
        "Se incluyen al menos tres `INSERT` que deban ser rechazados, con el error que producen",
      ],
      pistas: [
        "Las restricciones sin nombre aparecen en los errores como `SYS_C0011234`, que no le dice nada a nadie. Nómbralas.",
        "Para borrar, el orden es el inverso al de creación: primero las tablas que apuntan, después las apuntadas.",
      ],
      resultadoEsperado: `Compara tu resultado con el DDL del dataset **Sistema Bancario** que trae esta semana. No tiene que ser idéntico, pero sí debe cubrir las mismas reglas.`,
      solucion: null,
      temas: ["DDL", "esquema lógico", "restricciones nombradas", "idempotencia"],
    },
    {
      id: "s04-e03",
      titulo: "Decidir dónde vive cada regla del negocio",
      dataset: "banco",
      nivel: "reto",
      objetivo:
        "Justificar, regla por regla, si se resuelve con una restricción declarativa, con un trigger o con un procedimiento.",
      enunciado: `Para cada una de estas reglas del sistema bancario, decide **dónde** debe implementarse y **por qué**. Las opciones son: restricción del DDL, trigger, procedimiento o paquete, o lógica de la aplicación.

- El saldo de una cuenta no puede quedar negativo
- Una transferencia mueve dinero entre dos cuentas y no puede quedar a medias
- El número de cuenta se asigna automáticamente al abrirla
- Toda modificación de saldo queda registrada con usuario y fecha
- Un cliente no puede tener más de cinco cuentas activas
- Una cuenta bloqueada no admite retiros
- El interés mensual se calcula sobre el saldo promedio del período

La respuesta de cada una debe explicar qué se pierde si se implementa en el lugar equivocado.`,
      requisitos: [
        "Cada regla tiene una decisión y una justificación, no solo la decisión",
        "Al menos una regla se identifica como imposible de resolver con restricción declarativa, explicando por qué",
        "La regla de las cinco cuentas se discute a fondo: es la más engañosa del conjunto",
        "Se menciona el problema de la tabla mutante donde corresponde",
      ],
      pistas: [
        "La regla de las cinco cuentas parece un trigger obvio, pero un trigger de fila sobre `cuentas` que cuente cuentas del mismo cliente choca con `ORA-04091`.",
        "Una regla que necesita ver varias filas de la misma tabla que se está modificando casi nunca va en un trigger de fila.",
      ],
      solucion: null,
      temas: ["plan de implementación", "restricciones vs triggers", "tabla mutante", "diseño"],
    },
  ],

  /* ========================= SEMANA 5 ========================= */
  5: [
    {
      id: "s05-e01",
      titulo: "Función invocable desde SQL",
      dataset: "inventario",
      nivel: "guiado",
      objetivo:
        "Escribir una función que devuelva un valor y usarla directamente dentro de una sentencia SELECT.",
      enunciado: `Crea una función \`fn_stock_disponible\` que reciba un \`COD_PRODUCTO\` y devuelva su \`INVEN_TOTAL\`, o cero si el producto no tiene registro de inventario.

Después úsala en un \`SELECT\` que liste todos los productos con su nombre, su stock y una marca \`REPONER\` cuando el stock esté por debajo de 10 unidades.

Éste es el dataset del examen final: conviene que lo siembres ahora y no en la semana 11.`,
      requisitos: [
        "La función devuelve `NUMBER` y nunca propaga `NO_DATA_FOUND` al llamador",
        "Se invoca dentro de la lista de columnas de un `SELECT`, no desde un bloque",
        "El producto P008 debe aparecer marcado como `REPONER`",
        "La función no modifica datos: solo consulta",
      ],
      pistas: [
        "Una función que se usa en SQL no puede hacer `COMMIT` ni `ROLLBACK`, ni lanzar excepciones sin manejar, o la consulta entera falla.",
        "`NVL` sobre el resultado de un `SELECT ... INTO` no evita `NO_DATA_FOUND`: el error ocurre antes. Necesitas el `EXCEPTION`, o un agregado como `SUM` que siempre devuelve una fila.",
      ],
      resultadoEsperado: `\`\`\`
COD_PRODUCTO  NOMBRE                    STOCK  ALERTA
P001          Café molido 500g            970
P002          Azúcar refinada 1kg        1540
...
P008          Especias surtidas 50g         4  REPONER
\`\`\``,
      solucion: `\`\`\`sql
CREATE OR REPLACE FUNCTION fn_stock_disponible (
  p_cod_producto IN VARCHAR2
) RETURN NUMBER IS
  v_stock NUMBER;
BEGIN
  SELECT INVEN_TOTAL INTO v_stock
  FROM TBL_INVENTARIOS
  WHERE COD_PRODUCTO = p_cod_producto;

  RETURN v_stock;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RETURN 0;
END fn_stock_disponible;
/

SELECT p.COD_PRODUCTO,
       p.NOMBRE,
       fn_stock_disponible(p.COD_PRODUCTO) AS stock,
       CASE WHEN fn_stock_disponible(p.COD_PRODUCTO) < 10
            THEN 'REPONER' END              AS alerta
FROM TBL_PRODUCTOS p
ORDER BY p.COD_PRODUCTO;
\`\`\`

La alternativa sin \`EXCEPTION\` es usar un agregado, que siempre devuelve una fila:

\`\`\`sql
SELECT NVL(SUM(INVEN_TOTAL), 0) INTO v_stock
FROM TBL_INVENTARIOS
WHERE COD_PRODUCTO = p_cod_producto;
\`\`\``,
      temas: ["funciones", "RETURN", "función en SELECT", "NO_DATA_FOUND"],
    },
    {
      id: "s05-e02",
      titulo: "Paquete PKG_INVENTARIO con especificación y cuerpo",
      dataset: "inventario",
      nivel: "propuesto",
      objetivo:
        "Agrupar lógica relacionada en un paquete, separando la interfaz pública de la implementación privada.",
      enunciado: `Construye un paquete \`PKG_INVENTARIO\` con especificación y cuerpo. Es el mismo paquete que pide el examen final, así que trabajarlo aquí es preparación directa.

La **especificación** expone:

- una constante \`STOCK_MINIMO\` con valor 10
- una excepción \`stock_insuficiente\`
- la función \`obtener_stock_disponible(p_cod_producto)\`
- la función \`calcular_peso_pedido(p_cod_orden)\`
- el procedimiento \`actualizar_inventario_entrada(p_cod_producto, p_cantidad, p_resultado OUT)\`
- el procedimiento \`generar_reporte_inventario\`

El **cuerpo** los implementa, más al menos un elemento privado que no aparezca en la especificación.

\`calcular_peso_pedido\` recorre el detalle del pedido con un cursor y suma \`CANTIDAD * PESOXCAJA\`.`,
      requisitos: [
        "La especificación y el cuerpo son dos objetos separados: `CREATE OR REPLACE PACKAGE` y `CREATE OR REPLACE PACKAGE BODY`",
        "Hay al menos un procedimiento o función privada, declarada solo en el cuerpo",
        "`actualizar_inventario_entrada` valida la cantidad y lanza `stock_insuficiente` cuando corresponde",
        "`generar_reporte_inventario` marca los productos por debajo de `STOCK_MINIMO`",
        "Se incluye un bloque que llame a cada elemento público con la notación `paquete.elemento`",
      ],
      pistas: [
        "Un elemento privado se prueba indirectamente, a través de los públicos que lo usan. Si necesitas probarlo directo, quizá debería ser público.",
        "Para la orden 503, el peso es 30×12 + 25×6 + 5×36 = 690 kg. Úsalo para verificar `calcular_peso_pedido`.",
      ],
      resultadoEsperado: `\`calcular_peso_pedido(503)\` debe devolver **690**. \`generar_reporte_inventario\` debe marcar únicamente P008.`,
      solucion: null,
      temas: ["paquetes", "PACKAGE SPECIFICATION", "PACKAGE BODY", "elementos privados", "excepción propia"],
    },
    {
      id: "s05-e03",
      titulo: "Estado de sesión en una variable de paquete",
      dataset: "inventario",
      nivel: "reto",
      objetivo:
        "Comprobar que las variables de paquete conservan su valor durante toda la sesión y entender cuándo eso ayuda y cuándo estorba.",
      enunciado: `Amplía \`PKG_INVENTARIO\` con un contador privado de operaciones que se incremente en cada llamada a \`actualizar_inventario_entrada\`, y una función pública \`operaciones_de_la_sesion\` que lo devuelva.

Después demuestra experimentalmente tres cosas:

- que el contador crece entre llamadas dentro de la misma sesión
- que al abrir una sesión nueva el contador vuelve a cero
- qué pasa si recompilas el paquete con la sesión abierta

Documenta el resultado del tercer caso: es el comportamiento que más sorprende en producción.`,
      requisitos: [
        "El contador es una variable privada del cuerpo, no de la especificación",
        "Se prueba con al menos tres llamadas seguidas en la misma sesión",
        "Se abre una segunda sesión y se comprueba que arranca en cero",
        "Se documenta el error exacto que aparece al recompilar el paquete con estado vivo",
      ],
      pistas: [
        "El error de la recompilación es `ORA-04068: existing state of packages has been discarded`. Provócalo y lee qué pasa con la llamada siguiente.",
        "Un paquete con estado de sesión no sirve para guardar nada que deba sobrevivir a la desconexión. Para eso está una tabla.",
      ],
      solucion: null,
      temas: ["variables de paquete", "estado de sesión", "ORA-04068", "recompilación"],
    },
  ],

  /* ========================= SEMANA 6 ========================= */
  6: [
    {
      id: "s06-e01",
      titulo: "Trigger BEFORE de normalización de datos",
      dataset: "rh",
      nivel: "guiado",
      objetivo:
        "Modificar los valores que se van a guardar usando :NEW en un trigger BEFORE, antes de que lleguen a la tabla.",
      enunciado: `Crea un trigger \`trg_emp_normaliza\` que, antes de cada \`INSERT\` o \`UPDATE\` sobre \`empleados\`:

- ponga el nombre y el apellido en formato de nombre propio (primera letra en mayúscula)
- pase el email a minúsculas
- asigne la fecha de contrato de hoy si viene nula en un \`INSERT\`
- rellene el estado con \`ACTIVO\` si viene nulo

Después pruébalo insertando un empleado con los datos deliberadamente mal escritos y comprueba cómo quedó guardado.`,
      requisitos: [
        "El trigger es `BEFORE`, no `AFTER`: en un `AFTER` la asignación a `:NEW` da error",
        "Es un trigger de fila (`FOR EACH ROW`)",
        "Usa `INSERTING` para distinguir la operación cuando haga falta",
        "El `INSERT` de prueba usa nombres en minúscula y email en mayúscula",
      ],
      pistas: [
        "Asignar a `:NEW` en un trigger `AFTER` produce `ORA-04084`. Pruébalo para verlo.",
        "`INITCAP` y `LOWER` hacen el trabajo. `TRIM` de paso quita los espacios que siempre llegan de un formulario.",
      ],
      resultadoEsperado: `Al insertar \`('maría','GÓMEZ','MARIA.GOMEZ@EMPRESA.COM')\` debe quedar guardado como \`María\`, \`Gómez\` y \`maria.gomez@empresa.com\`, con la fecha de hoy y estado \`ACTIVO\`.`,
      solucion: `\`\`\`sql
CREATE OR REPLACE TRIGGER trg_emp_normaliza
BEFORE INSERT OR UPDATE ON empleados
FOR EACH ROW
BEGIN
  :NEW.nombre   := INITCAP(TRIM(:NEW.nombre));
  :NEW.apellido := INITCAP(TRIM(:NEW.apellido));

  IF :NEW.email IS NOT NULL THEN
    :NEW.email := LOWER(TRIM(:NEW.email));
  END IF;

  IF INSERTING THEN
    IF :NEW.fecha_contrato IS NULL THEN
      :NEW.fecha_contrato := TRUNC(SYSDATE);
    END IF;
    IF :NEW.estado IS NULL THEN
      :NEW.estado := 'ACTIVO';
    END IF;
  END IF;
END trg_emp_normaliza;
/

INSERT INTO empleados (emp_id, nombre, apellido, email, salario, departamento_id)
VALUES (1030, '  maría ', 'GÓMEZ', 'MARIA.GOMEZ@EMPRESA.COM', 4000000, 20);

SELECT nombre, apellido, email, fecha_contrato, estado
FROM empleados WHERE emp_id = 1030;
\`\`\`

\`TRUNC(SYSDATE)\` en lugar de \`SYSDATE\` para que la fecha no arrastre la hora, que casi nunca interesa en una fecha de contrato y complica las comparaciones.`,
      temas: ["triggers", "BEFORE", ":NEW", "INSERTING", "INITCAP"],
    },
    {
      id: "s06-e02",
      titulo: "Auditoría de cambios de salario",
      dataset: "rh",
      nivel: "propuesto",
      objetivo:
        "Registrar en una tabla de auditoría el valor anterior y el nuevo, comparando :OLD con :NEW.",
      enunciado: `Crea un trigger que registre en \`empleados_audit\` **cada cambio de salario o de estado** de un empleado.

Cada fila de auditoría debe guardar qué campo cambió, el valor anterior, el valor nuevo, la operación, el usuario de base de datos y la fecha. Un \`UPDATE\` que cambie los dos campos debe generar **dos filas** de auditoría, no una.

El trigger no debe escribir nada cuando el \`UPDATE\` no cambió realmente el valor (por ejemplo, poner el mismo salario que ya tenía).`,
      requisitos: [
        "El trigger es `AFTER UPDATE` de fila sobre `empleados`",
        "Usa `UPDATING('columna')` o compara `:OLD` con `:NEW` para saber qué cambió",
        "Un cambio en dos campos genera dos filas; un `UPDATE` sin cambio real genera cero",
        "El id de auditoría viene de `seq_audit`",
        "Contempla que `:OLD` o `:NEW` puedan ser nulos al comparar",
      ],
      pistas: [
        "`:OLD.salario != :NEW.salario` da NULL, no TRUE, cuando alguno es nulo, y un `IF` con NULL no entra. Usa `NVL` o el operador de comparación que maneja nulos.",
        "Prueba con un `UPDATE` que ponga exactamente el mismo salario. Si aparece una fila de auditoría, la comparación está mal.",
      ],
      resultadoEsperado: `Un \`UPDATE\` que cambie salario y estado del empleado 1002 debe dejar dos filas en \`empleados_audit\`. Repetir el mismo \`UPDATE\` no debe dejar ninguna nueva.`,
      solucion: null,
      temas: ["triggers", "AFTER", ":OLD", ":NEW", "UPDATING", "auditoría"],
    },
    {
      id: "s06-e03",
      titulo: "ID automático y la trampa de la tabla mutante",
      dataset: "rh",
      nivel: "reto",
      objetivo:
        "Asignar identificadores con una secuencia y comprobar de primera mano el error ORA-04091.",
      enunciado: `Dos partes.

**Primera:** crea un trigger que asigne automáticamente el \`emp_id\` desde \`seq_empleados\` cuando venga nulo en el \`INSERT\`. Demuestra que funciona insertando sin especificar el id.

**Segunda:** intenta agregar al mismo trigger una validación que impida que un departamento supere los 8 empleados. Escríbela primero de la forma "obvia" —consultando \`empleados\` dentro del trigger de fila— y **ejecútala para ver el error**. Documenta el código de error y por qué ocurre.

Después resuelve la misma validación de una forma que sí funcione, y explica el compromiso que aceptas al hacerlo.`,
      requisitos: [
        "El trigger de asignación de id es `BEFORE INSERT` de fila y respeta el id si viene informado",
        "Se muestra el error exacto de la versión ingenua, con su código `ORA-`",
        "La explicación dice por qué Oracle prohíbe esa consulta, no solo que la prohíbe",
        "La solución alternativa funciona y se identifica su punto débil",
      ],
      pistas: [
        "El error es `ORA-04091: table ... is mutating, trigger/function may not see it`. Oracle lo impide porque el resultado dependería del orden de las filas, que no está definido.",
        "Las salidas habituales son: un trigger de sentencia (`AFTER INSERT` sin `FOR EACH ROW`) con una colección, un trigger compuesto, o mover la validación al procedimiento que hace el `INSERT`. Cada una cede algo.",
      ],
      solucion: null,
      temas: ["triggers", "secuencias", "ORA-04091", "tabla mutante", "trigger compuesto"],
    },
  ],

  /* ========================= SEMANA 7 ========================= */
  7: [
    {
      id: "s07-e01",
      titulo: "Excepción propia con PRAGMA EXCEPTION_INIT",
      dataset: "inventario",
      nivel: "guiado",
      objetivo:
        "Declarar excepciones propias, asociarlas a un código de error y distinguirlas de las predefinidas de Oracle.",
      enunciado: `Escribe un bloque que intente despachar una cantidad de un producto y maneje tres situaciones distintas con tres excepciones diferentes:

- el producto no existe → \`NO_DATA_FOUND\`, que es predefinida
- el stock es insuficiente → \`stock_insuficiente\`, una excepción propia que declaras
- la cantidad pedida es negativa o cero → \`cantidad_invalida\`, otra excepción propia

Cada rama debe imprimir un mensaje distinto. Prueba el bloque con los tres casos: producto \`P999\`, pedir 5000 unidades de \`P008\` y pedir -3 unidades de \`P001\`.`,
      requisitos: [
        "Las dos excepciones propias se declaran en la sección `DECLARE`",
        "Al menos una se asocia a un número de error con `PRAGMA EXCEPTION_INIT`",
        "El manejador de `NO_DATA_FOUND` va antes de `WHEN OTHERS`",
        "`WHEN OTHERS` existe, imprime `SQLCODE` y `SQLERRM`, y no se usa para silenciar errores",
      ],
      pistas: [
        "`RAISE mi_excepcion` lanza una excepción declarada. `RAISE_APPLICATION_ERROR(-20001, ...)` lanza un error con número, que es lo que `PRAGMA EXCEPTION_INIT` permite capturar por nombre.",
        "Si pones `WHEN OTHERS` primero, atrapa todo y las ramas específicas nunca se ejecutan. El orden importa.",
      ],
      resultadoEsperado: `\`\`\`
Caso P999: el producto solicitado no existe
Caso P008 x5000: stock insuficiente. Disponible: 4
Caso P001 x-3: la cantidad debe ser mayor que cero
\`\`\``,
      solucion: `\`\`\`sql
SET SERVEROUTPUT ON;

DECLARE
  v_cod      TBL_INVENTARIOS.COD_PRODUCTO%TYPE := 'P008';
  v_pedida   NUMBER := 5000;
  v_stock    TBL_INVENTARIOS.INVEN_TOTAL%TYPE;

  stock_insuficiente EXCEPTION;
  PRAGMA EXCEPTION_INIT(stock_insuficiente, -20010);

  cantidad_invalida  EXCEPTION;
BEGIN
  IF v_pedida <= 0 THEN
    RAISE cantidad_invalida;
  END IF;

  SELECT INVEN_TOTAL INTO v_stock
  FROM TBL_INVENTARIOS
  WHERE COD_PRODUCTO = v_cod;

  IF v_stock < v_pedida THEN
    RAISE_APPLICATION_ERROR(-20010,
      'stock insuficiente. Disponible: ' || v_stock);
  END IF;

  DBMS_OUTPUT.PUT_LINE('Despacho autorizado');

EXCEPTION
  WHEN cantidad_invalida THEN
    DBMS_OUTPUT.PUT_LINE('La cantidad debe ser mayor que cero');
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('El producto solicitado no existe');
  WHEN stock_insuficiente THEN
    DBMS_OUTPUT.PUT_LINE(SQLERRM);
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error inesperado ' || SQLCODE || ': ' || SQLERRM);
    RAISE;
END;
/
\`\`\`

El \`RAISE\` final dentro de \`WHEN OTHERS\` es importante: registra el error y lo vuelve a propagar en lugar de tragárselo.`,
      temas: ["excepciones", "PRAGMA EXCEPTION_INIT", "RAISE", "SQLCODE", "SQLERRM"],
    },
    {
      id: "s07-e02",
      titulo: "BULK COLLECT con LIMIT contra cursor fila a fila",
      dataset: "inventario",
      nivel: "propuesto",
      objetivo:
        "Medir con datos reales la diferencia entre procesar fila por fila y procesar por lotes.",
      enunciado: `Siembra primero el **volumen adicional** de este dataset (200.000 lotes). Después escribe dos bloques que hagan exactamente lo mismo: recorrer todos los lotes y contar cuántos vencen en los próximos 60 días.

- **Versión A:** cursor \`FOR LOOP\` fila por fila
- **Versión B:** cursor explícito con \`FETCH ... BULK COLLECT INTO ... LIMIT 1000\`

Mide el tiempo de cada una y reporta la diferencia. Prueba la versión B con \`LIMIT\` de 100, 1.000 y 10.000, y anota qué pasa.`,
      requisitos: [
        "Los dos bloques dan exactamente el mismo resultado",
        "La versión B usa `EXIT WHEN v_lote.COUNT = 0`, no `%NOTFOUND`",
        "Se reporta el tiempo de cada versión, medido dentro del bloque",
        "Se prueban tres valores de `LIMIT` y se comenta el efecto de subirlo mucho",
      ],
      pistas: [
        "`DBMS_UTILITY.GET_TIME` devuelve centésimas de segundo. La diferencia entre dos llamadas te da el tiempo transcurrido.",
        "Usar `%NOTFOUND` como salida con `LIMIT` descarta el último lote, que casi nunca viene completo. Es el error clásico de este patrón.",
        "Subir el `LIMIT` mejora hasta cierto punto y luego deja de ayudar, porque la colección ocupa memoria de sesión.",
      ],
      resultadoEsperado: `La versión B debe ser varias veces más rápida. La cifra exacta depende de la máquina, pero la diferencia debe ser evidente y consistente entre ejecuciones.`,
      solucion: null,
      temas: ["BULK COLLECT", "LIMIT", "rendimiento", "colecciones", "DBMS_UTILITY.GET_TIME"],
    },
    {
      id: "s07-e03",
      titulo: "FORALL con SAVE EXCEPTIONS sobre datos sucios",
      dataset: "inventario",
      nivel: "reto",
      objetivo:
        "Aplicar un lote de sentencias DML en un solo viaje al motor y recuperar el detalle de las filas que fallaron.",
      enunciado: `Construye una colección de actualizaciones de inventario donde **algunas filas están destinadas a fallar**: códigos de producto que no existen y cantidades que dejarían el \`INVEN_TOTAL\` negativo, lo cual viola el \`CHECK\` de la tabla.

Aplícalas con \`FORALL ... SAVE EXCEPTIONS\` y produce al final un informe que diga cuántas filas se aplicaron, cuántas fallaron, y para cada fallo el índice de la colección y el motivo.

Después responde: al terminar el bloque, ¿las filas que sí funcionaron quedaron aplicadas? Compruébalo.`,
      requisitos: [
        "La colección contiene al menos dos filas válidas y dos que deben fallar por motivos distintos",
        "Se captura el error -24381 con `PRAGMA EXCEPTION_INIT`",
        "Se recorre `SQL%BULK_EXCEPTIONS` mostrando `ERROR_INDEX` y el mensaje de `ERROR_CODE`",
        "Se verifica y documenta el estado de la tabla después del bloque",
        "Se explica qué habría pasado sin `SAVE EXCEPTIONS`",
      ],
      pistas: [
        "El mensaje se obtiene con `SQLERRM(-SQL%BULK_EXCEPTIONS(j).ERROR_CODE)`. El signo menos no es un adorno: `ERROR_CODE` viene positivo.",
        "`ERROR_INDEX` es la posición en la colección, no la clave del registro. Úsalo para recuperar el dato original y decir cuál falló.",
        "Sin `SAVE EXCEPTIONS`, el primer error aborta el `FORALL` completo.",
      ],
      solucion: null,
      temas: ["FORALL", "SAVE EXCEPTIONS", "SQL%BULK_EXCEPTIONS", "colecciones", "DML masivo"],
    },
  ],

  /* ========================= SEMANA 8 ========================= */
  8: [
    {
      id: "s08-e01",
      titulo: "De consulta concatenada a variables bind",
      dataset: "inventario",
      nivel: "guiado",
      objetivo:
        "Reconocer una consulta vulnerable a inyección y convertirla usando USING, comprobando que el ataque deja de funcionar.",
      enunciado: `Este procedimiento es vulnerable:

\`\`\`sql
CREATE OR REPLACE PROCEDURE buscar_producto_malo (
  p_nombre IN VARCHAR2
) IS
  v_sql   VARCHAR2(4000);
  v_total NUMBER;
BEGIN
  v_sql := 'SELECT COUNT(*) FROM TBL_PRODUCTOS WHERE NOMBRE = ''' || p_nombre || '''';
  EXECUTE IMMEDIATE v_sql INTO v_total;
  DBMS_OUTPUT.PUT_LINE('Encontrados: ' || v_total);
END;
/
\`\`\`

Primero **demuestra el problema**: encuentra un valor de \`p_nombre\` que haga que el procedimiento devuelva los 8 productos en lugar de los que coinciden. Después reescríbelo con variables bind y comprueba que el mismo valor ya no funciona.`,
      requisitos: [
        "Se muestra la entrada concreta que rompe la consulta y el resultado que produce",
        "La versión segura usa un marcador `:1` o `:nombre` y la cláusula `USING`",
        "Se ejecuta el mismo ataque contra la versión segura y se muestra que ahora devuelve cero",
        "Se explica en una frase por qué `USING` cierra el problema",
      ],
      pistas: [
        "La entrada clásica cierra la comilla y agrega una condición siempre verdadera. Piensa en qué texto produce `WHERE NOMBRE = '' OR 1=1`.",
        "Con `USING`, el valor viaja como dato y nunca se concatena al texto de la sentencia, así que no puede alterar su estructura.",
      ],
      resultadoEsperado: `Con la entrada maliciosa, la versión vulnerable informa **8** y la segura informa **0**, porque busca literalmente un producto que se llame así.`,
      solucion: `La entrada que rompe la consulta:

\`\`\`sql
EXEC buscar_producto_malo(''' OR 1=1 --');
\`\`\`

La sentencia armada queda \`WHERE NOMBRE = '' OR 1=1 --'\`, cuya condición es siempre verdadera, así que cuenta las 8 filas.

Versión segura:

\`\`\`sql
CREATE OR REPLACE PROCEDURE buscar_producto (
  p_nombre IN VARCHAR2
) IS
  v_total NUMBER;
BEGIN
  EXECUTE IMMEDIATE
    'SELECT COUNT(*) FROM TBL_PRODUCTOS WHERE NOMBRE = :1'
    INTO v_total
    USING p_nombre;

  DBMS_OUTPUT.PUT_LINE('Encontrados: ' || v_total);
END;
/
\`\`\`

Con \`USING\`, Oracle recibe la sentencia y el valor por separado. El texto \`' OR 1=1 --\` se busca como si fuera un nombre de producto, y no hay ninguno, así que devuelve 0. Además la sentencia se parsea una sola vez y se reutiliza del caché, lo que también mejora el rendimiento.`,
      temas: ["EXECUTE IMMEDIATE", "inyección SQL", "variables bind", "USING", "SQL dinámico"],
    },
    {
      id: "s08-e02",
      titulo: "Validar nombres de objeto con DBMS_ASSERT",
      dataset: "inventario",
      nivel: "propuesto",
      objetivo:
        "Resolver el caso que las variables bind no cubren: cuando lo dinámico es el nombre de la tabla, no un valor.",
      enunciado: `Escribe un procedimiento \`contar_filas(p_tabla)\` que reciba el nombre de una tabla y devuelva cuántas filas tiene.

Aquí **no puedes usar variables bind**: un marcador \`:1\` sirve para valores, no para nombres de objeto. Por eso el nombre hay que validarlo.

Implementa dos capas de defensa: validar el nombre con \`DBMS_ASSERT\` y además comprobar contra el diccionario de datos que la tabla realmente pertenece al usuario actual.

Prueba el procedimiento con un nombre válido, con uno inexistente y con un intento de inyección.`,
      requisitos: [
        "Se usa `DBMS_ASSERT.SIMPLE_SQL_NAME` o `QUALIFIED_SQL_NAME` sobre el nombre recibido",
        "Se verifica la existencia contra `USER_TABLES` antes de construir la sentencia",
        "El intento de inyección es rechazado con un mensaje claro, no con un error de sintaxis de Oracle",
        "Se explica por qué una sola de las dos capas no basta",
      ],
      pistas: [
        "`DBMS_ASSERT.SIMPLE_SQL_NAME('TBL_LOTES; DROP TABLE X')` lanza `ORA-44003`. Pruébalo directo para ver qué acepta y qué no.",
        "`DBMS_ASSERT` valida la forma del identificador, pero no que exista ni que sea tuya. La consulta a `USER_TABLES` cubre eso.",
      ],
      resultadoEsperado: `\`contar_filas('TBL_LOTES')\` devuelve 12 con el dataset base. \`contar_filas('TBL_LOTES; DROP TABLE TBL_PRODUCTOS')\` es rechazado sin ejecutar nada.`,
      solucion: null,
      temas: ["DBMS_ASSERT", "SQL dinámico", "nombres de objeto", "USER_TABLES", "seguridad"],
    },
    {
      id: "s08-e03",
      titulo: "Roles con privilegios mínimos",
      dataset: "inventario",
      nivel: "reto",
      objetivo:
        "Diseñar un esquema de permisos donde cada perfil pueda hacer exactamente lo que necesita y nada más.",
      enunciado: `Diseña tres roles para el sistema de inventario y escribe los \`GRANT\` correspondientes:

- **rol_consulta:** puede leer productos, lotes e inventario. No puede modificar nada.
- **rol_operacion:** además puede registrar entradas y salidas de inventario, pero **solo a través del paquete** \`PKG_INVENTARIO\`, nunca con \`UPDATE\` directo sobre las tablas.
- **rol_supervisor:** todo lo anterior más lectura de la tabla de auditoría.

La parte interesante es la segunda: hay que lograr que un usuario pueda cambiar el inventario ejecutando el paquete pero no pueda hacer \`UPDATE TBL_INVENTARIOS\` por su cuenta.

Explica qué mecanismo de Oracle lo hace posible.`,
      requisitos: [
        "Los tres roles se crean y se les otorgan privilegios explícitos, sin usar `ANY`",
        "`rol_operacion` recibe `EXECUTE` sobre el paquete y **no** recibe `UPDATE` sobre las tablas",
        "Se explica el concepto que permite esto y cómo se relaciona con los derechos del definidor",
        "Se documenta cómo se probaría el diseño con un usuario real",
      ],
      pistas: [
        "Un paquete se ejecuta por defecto con los privilegios de quien lo creó, no de quien lo llama. Ese es el mecanismo. Busca `AUTHID DEFINER`.",
        "Si el paquete se declarara `AUTHID CURRENT_USER`, el diseño se cae: el llamador necesitaría los permisos sobre las tablas.",
        "Este ejercicio requiere privilegios para crear roles y usuarios. Si no los tienes, entrégalo como diseño documentado.",
      ],
      solucion: null,
      temas: ["roles", "privilegios", "GRANT", "AUTHID DEFINER", "privilegio mínimo"],
    },
  ],

  /* ========================= SEMANA 9 ========================= */
  9: [
    {
      id: "s09-e01",
      titulo: "Vista materializada con refresco completo",
      dataset: "inventario",
      nivel: "guiado",
      objetivo:
        "Crear una vista materializada, comprobar que almacena físicamente el resultado y ver qué pasa cuando los datos base cambian.",
      enunciado: `Crea una vista materializada \`mv_stock_por_producto\` que consolide, por producto: el nombre, el stock total del inventario, la cantidad de lotes y la suma de unidades en lotes.

Créala con \`REFRESH COMPLETE ON DEMAND\`.

Después demuestra el comportamiento clave: consulta la vista, modifica un dato base con un \`UPDATE\`, vuelve a consultar la vista **sin refrescarla** y observa que el valor viejo sigue ahí. Luego refréscala y comprueba que ya cambió.`,
      requisitos: [
        "La vista se crea con `BUILD IMMEDIATE` para que quede poblada de inmediato",
        "Se consulta antes del cambio, después del cambio sin refrescar, y después de refrescar",
        "El refresco se hace con `DBMS_MVIEW.REFRESH`",
        "Se explica la diferencia con una vista normal en una frase",
      ],
      pistas: [
        "Una vista normal se recalcula en cada consulta y siempre está al día. Una materializada guarda el resultado en disco: es rápida pero puede estar desactualizada. Ese es el intercambio.",
        "`SELECT * FROM USER_MVIEWS` te dice cuándo se refrescó por última vez y si está obsoleta.",
      ],
      resultadoEsperado: `Después del \`UPDATE\` y antes del refresco, la vista debe seguir mostrando el valor anterior. \`STALENESS\` en \`USER_MVIEWS\` debe pasar a \`NEEDS_COMPILE\` o \`STALE\`.`,
      solucion: `\`\`\`sql
CREATE MATERIALIZED VIEW mv_stock_por_producto
BUILD IMMEDIATE
REFRESH COMPLETE ON DEMAND
AS
SELECT p.COD_PRODUCTO,
       p.NOMBRE,
       NVL(i.INVEN_TOTAL, 0)   AS stock_inventario,
       COUNT(l.COD_LOTE)       AS total_lotes,
       NVL(SUM(l.CANTIDAD), 0) AS unidades_en_lotes
FROM TBL_PRODUCTOS p
LEFT JOIN TBL_INVENTARIOS i ON i.COD_PRODUCTO = p.COD_PRODUCTO
LEFT JOIN TBL_LOTES       l ON l.COD_PRODUCTO = p.COD_PRODUCTO
GROUP BY p.COD_PRODUCTO, p.NOMBRE, NVL(i.INVEN_TOTAL, 0);

-- 1. Valor inicial
SELECT * FROM mv_stock_por_producto WHERE COD_PRODUCTO = 'P008';

-- 2. Se cambia el dato base
UPDATE TBL_INVENTARIOS SET INVEN_TOTAL = 250 WHERE COD_PRODUCTO = 'P008';
COMMIT;

-- 3. La vista NO cambio: sigue mostrando 4
SELECT * FROM mv_stock_por_producto WHERE COD_PRODUCTO = 'P008';

SELECT mview_name, staleness, last_refresh_date FROM USER_MVIEWS;

-- 4. Refresco explicito
BEGIN
  DBMS_MVIEW.REFRESH('MV_STOCK_POR_PRODUCTO', 'C');
END;
/

-- 5. Ahora si muestra 250
SELECT * FROM mv_stock_por_producto WHERE COD_PRODUCTO = 'P008';
\`\`\`

La \`C\` del segundo parámetro es el método: \`C\` completo, \`F\` rápido, \`?\` que Oracle elija.`,
      temas: ["vistas materializadas", "REFRESH COMPLETE", "DBMS_MVIEW", "USER_MVIEWS"],
    },
    {
      id: "s09-e02",
      titulo: "Pasar la vista a refresco rápido",
      dataset: "inventario",
      nivel: "propuesto",
      objetivo:
        "Habilitar FAST REFRESH creando los logs necesarios y entender por qué no toda consulta lo admite.",
      enunciado: `Convierte la vista del ejercicio anterior a \`REFRESH FAST\`, que en lugar de recalcular todo aplica solo los cambios ocurridos desde el último refresco.

Para eso necesitas crear un \`MATERIALIZED VIEW LOG\` sobre cada tabla base, con las cláusulas correctas.

Usa \`DBMS_MVIEW.EXPLAIN_MVIEW\` para que Oracle te diga si tu consulta admite refresco rápido **antes** de intentarlo. Si no lo admite, ajusta la consulta hasta que sí.

Documenta qué tuviste que agregar y por qué cada cosa era necesaria.`,
      requisitos: [
        "Hay un `MATERIALIZED VIEW LOG` por cada tabla base de la vista",
        "Los logs incluyen `WITH ROWID`, las columnas usadas y `INCLUDING NEW VALUES`",
        "Se ejecuta `DBMS_MVIEW.EXPLAIN_MVIEW` y se muestra su salida",
        "La consulta de la vista incluye lo que el refresco rápido exige para agregados",
        "Se comprueba que un cambio pequeño se refleja tras un refresco `F`",
      ],
      pistas: [
        "Para una vista con `GROUP BY` y agregados, el refresco rápido suele exigir que estén presentes `COUNT(*)` y un `COUNT` de cada columna agregada. Sin eso, Oracle no sabe deshacer un cambio.",
        "`EXPLAIN_MVIEW` escribe sus resultados en la tabla `MV_CAPABILITIES_TABLE`, que se crea con el script `utlxmv.sql`. Si no existe, créala primero.",
      ],
      solucion: null,
      temas: ["FAST REFRESH", "MATERIALIZED VIEW LOG", "EXPLAIN_MVIEW", "agregados"],
    },
    {
      id: "s09-e03",
      titulo: "Medir el beneficio real de la vista materializada",
      dataset: "inventario",
      nivel: "reto",
      objetivo:
        "Cuantificar la ganancia de una vista materializada en lugar de asumirla, y decidir si vale su costo.",
      enunciado: `Siembra el volumen adicional del dataset. Después compara tres formas de responder la misma pregunta de negocio —el stock consolidado por producto—:

- consulta directa contra las tablas base
- vista normal
- vista materializada

Para cada una, mide el tiempo de respuesta y revisa el plan de ejecución. Después mide **el otro lado de la balanza**: cuánto tarda el refresco de la vista materializada y cuánto espacio ocupa.

Concluye con una recomendación: ¿en qué condiciones vale la pena y en cuáles no?`,
      requisitos: [
        "Se miden las tres alternativas con el mismo volumen de datos",
        "Se incluye el plan de ejecución de la consulta directa y el de la vista materializada",
        "Se mide el costo del refresco, no solo el beneficio de la lectura",
        "Se consulta el espacio ocupado en `USER_SEGMENTS`",
        "La conclusión menciona la frecuencia de lectura frente a la de escritura",
      ],
      pistas: [
        "Una vista normal no debe mostrar ninguna mejora frente a la consulta directa: es la misma consulta con otro nombre. Si tu medición dice otra cosa, es el caché.",
        "Ejecuta cada medición dos veces y quédate con la segunda, para que el caché no distorsione la comparación.",
        "Si la tabla se escribe más de lo que se lee, la vista materializada puede costar más de lo que ahorra.",
      ],
      solucion: null,
      temas: ["vistas materializadas", "rendimiento", "EXPLAIN PLAN", "USER_SEGMENTS", "costo-beneficio"],
    },
  ],

  /* ========================= SEMANA 10 ======================== */
  10: [
    {
      id: "s10-e01",
      titulo: "DDL completo del sistema bancario",
      dataset: "banco",
      nivel: "guiado",
      objetivo:
        "Entregar un script de creación que corra de principio a fin sin intervención y sea repetible.",
      enunciado: `Escribe el script \`crear_tablas_banco.sql\` que construya el esquema completo del proyecto: clientes, cuentas, transacciones y la tabla de auditoría, con sus secuencias e índices.

Requisito clave de la entrega: el script debe poder **ejecutarse dos veces seguidas sin error**. Eso significa que empieza limpiando lo que pudiera existir, en el orden correcto según las dependencias.

Al final, incluye consultas al diccionario de datos que demuestren que todo quedó creado: tablas, restricciones e índices.`,
      requisitos: [
        "El teardown recorre el diccionario y no falla si los objetos no existen",
        "El orden de borrado es inverso al de creación",
        "Todas las restricciones tienen nombre explícito",
        "Los índices sobre las claves foráneas están creados a mano: Oracle no los crea solo",
        "Las consultas finales listan lo creado desde `USER_TABLES`, `USER_CONSTRAINTS` y `USER_INDEXES`",
      ],
      pistas: [
        "Oracle crea índice automáticamente para la clave primaria y para `UNIQUE`, pero **no** para las claves foráneas. Sin ese índice, borrar un cliente bloquea la tabla de cuentas entera.",
        "Compara tu script con el DDL del dataset de esta semana, pero escríbelo tú primero.",
      ],
      resultadoEsperado: `Cuatro tablas, cuatro secuencias y las restricciones nombradas. Ejecutar el script dos veces seguidas debe terminar sin un solo error.`,
      solucion: `El patrón del teardown idempotente, que es la parte que más se falla:

\`\`\`sql
BEGIN
  -- Orden inverso al de creacion: primero las que apuntan
  FOR t IN (SELECT table_name FROM user_tables WHERE table_name IN (
              'AUDITORIA_TRANSACCIONES','TRANSACCIONES','CUENTAS','CLIENTES')) LOOP
    EXECUTE IMMEDIATE 'DROP TABLE ' || t.table_name || ' CASCADE CONSTRAINTS PURGE';
  END LOOP;

  FOR s IN (SELECT sequence_name FROM user_sequences WHERE sequence_name IN (
              'SEQ_CLIENTES','SEQ_CUENTAS','SEQ_TRANSACCIONES','SEQ_AUD_TRX')) LOOP
    EXECUTE IMMEDIATE 'DROP SEQUENCE ' || s.sequence_name;
  END LOOP;
END;
/
\`\`\`

\`CASCADE CONSTRAINTS\` quita las claves foráneas que apuntan a la tabla; \`PURGE\` evita que quede en la papelera de reciclaje ocupando espacio y estorbando al siguiente \`CREATE\`.

Los índices de clave foránea que faltan:

\`\`\`sql
CREATE INDEX ix_cta_cliente ON cuentas (cliente_id);
CREATE INDEX ix_trx_cuenta  ON transacciones (cuenta_id);
CREATE INDEX ix_trx_fecha   ON transacciones (fecha);
\`\`\`

El resto del DDL está en el dataset **Sistema Bancario** de esta semana.`,
      temas: ["DDL", "idempotencia", "índices de clave foránea", "diccionario de datos"],
    },
    {
      id: "s10-e02",
      titulo: "Datos de prueba que ejerciten las restricciones",
      dataset: "banco",
      nivel: "propuesto",
      objetivo:
        "Sembrar datos que cubran los casos límite, no solo el camino feliz.",
      enunciado: `Escribe \`insertar_datos_banco.sql\` con datos de prueba para el esquema. El criterio de calidad no es la cantidad de filas: es que los datos **permitan probar todos los casos que el sistema debe manejar**.

Como mínimo debe haber: un cliente con varias cuentas, una cuenta con saldo cero, una cuenta inactiva, una bloqueada, una cuenta sin ninguna transacción, y una transferencia registrada en ambas cuentas.

Además, escribe un segundo bloque con los \`INSERT\` que **deben ser rechazados**, uno por cada restricción del esquema, y captura el error de cada uno para demostrar que la restricción funciona.`,
      requisitos: [
        "Los datos válidos cubren los seis casos límite listados",
        "Los importes son coherentes: la suma de transacciones de una cuenta concuerda con su saldo",
        "Hay un `INSERT` de rechazo por cada restricción, con su error capturado y mostrado",
        "El script termina con `COMMIT` y con consultas que resumen lo sembrado",
      ],
      pistas: [
        "Si ningún `INSERT` de prueba falla, no probaste las restricciones: solo probaste que el camino feliz funciona.",
        "Un bloque `BEGIN ... EXCEPTION WHEN OTHERS THEN DBMS_OUTPUT.PUT_LINE(SQLERRM); END;` por cada caso te deja demostrar el rechazo sin abortar el script.",
      ],
      solucion: null,
      temas: ["datos de prueba", "casos límite", "restricciones", "coherencia de datos"],
    },
    {
      id: "s10-e03",
      titulo: "Consultas de verificación de integridad",
      dataset: "banco",
      nivel: "reto",
      objetivo:
        "Escribir las consultas que un revisor usaría para detectar que los datos están mal, aunque las restricciones estén bien.",
      enunciado: `Hay incoherencias que ninguna restricción de Oracle puede impedir. Escribe un conjunto de consultas de auditoría que las detecten, cada una devolviendo cero filas cuando todo está bien.

Como mínimo, detecta:

- cuentas cuyo saldo no concuerda con la suma de sus transacciones
- transferencias registradas en la cuenta de origen pero no en la de destino
- cuentas activas de clientes que no existen (imposible con la FK, pero verifica que la FK esté puesta)
- transacciones con fecha posterior a hoy
- cuentas con saldo distinto de cero en estado inactivo
- clientes sin ninguna cuenta

Junta todo en un solo script que informe, para cada verificación, si pasó o falló y cuántas filas problemáticas encontró.`,
      requisitos: [
        "Cada verificación devuelve cero filas en un esquema sano",
        "El script informa el resultado de cada una, no solo vuelca filas",
        "Al menos una verificación se prueba **rompiendo** los datos a propósito para ver que la detecta",
        "Se explica por qué cada caso no se puede prevenir con una restricción declarativa",
      ],
      pistas: [
        "La incoherencia entre saldo y suma de transacciones es la más importante y la más difícil de prevenir: requiere que toda modificación de saldo pase por el mismo camino.",
        "Un script de verificación que nunca has visto fallar no sirve de nada. Rompe los datos, confirma que salta, y arréglalos.",
      ],
      solucion: null,
      temas: ["integridad", "consultas de auditoría", "verificación", "pruebas"],
    },
  ],

  /* ========================= SEMANA 11 ======================== */
  11: [
    {
      id: "s11-e01",
      titulo: "Simulacro de la pregunta 1: análisis de productos",
      dataset: "inventario",
      nivel: "guiado",
      objetivo:
        "Resolver, con el dataset ya sembrado, el mismo tipo de ejercicio que pide la primera pregunta del examen.",
      enunciado: `El examen final evalúa sobre **este mismo dataset**. Si lo sembraste en las semanas 5 y 7, ya estás listo.

Escribe un bloque PL/SQL que:

- reciba un nombre de producto y muestre cuántos lotes tiene
- clasifique **todos** los productos por peso con una estructura \`CASE\`: liviano por debajo de 1, medio entre 1 y 5, pesado por encima de 5
- use variables con \`%TYPE\`
- recorra los productos con un cursor \`FOR LOOP\`
- muestre contadores por categoría de peso
- maneje las excepciones que puedan ocurrir`,
      requisitos: [
        "Las variables que reciben datos de la tabla usan `%TYPE`",
        "La clasificación por peso se resuelve con `CASE` sobre `PESOXUNIDAD`",
        "Se muestran los tres contadores por categoría al final",
        "Hay manejo de excepciones, incluido el caso del producto que no existe",
        "Todo se imprime con `DBMS_OUTPUT`",
      ],
      pistas: [
        "Con el dataset base: livianos son P001, P004 y P008; medios P002, P005 y P006; pesados P003 y P007. Úsalo para verificar tus contadores.",
        "El campo se llama `PESOXUNIDAD`, exactamente así. El examen espera ese nombre.",
      ],
      resultadoEsperado: `\`\`\`
Producto 'Café molido 500g': 3 lotes

Clasificacion por peso:
  Livianos (<1): 3
  Medios (1-5):  3
  Pesados (>5):  2
\`\`\``,
      solucion: `\`\`\`sql
SET SERVEROUTPUT ON;

DECLARE
  v_nombre_buscado TBL_PRODUCTOS.NOMBRE%TYPE := 'Café molido 500g';
  v_total_lotes    NUMBER;
  v_livianos       PLS_INTEGER := 0;
  v_medios         PLS_INTEGER := 0;
  v_pesados        PLS_INTEGER := 0;
  v_categoria      VARCHAR2(10);
BEGIN
  SELECT COUNT(*)
    INTO v_total_lotes
  FROM TBL_LOTES l
  JOIN TBL_PRODUCTOS p ON p.COD_PRODUCTO = l.COD_PRODUCTO
  WHERE p.NOMBRE = v_nombre_buscado;

  IF v_total_lotes = 0 THEN
    DBMS_OUTPUT.PUT_LINE('Sin lotes o producto inexistente: ' || v_nombre_buscado);
  ELSE
    DBMS_OUTPUT.PUT_LINE('Producto ''' || v_nombre_buscado || ''': '
      || v_total_lotes || ' lotes');
  END IF;

  DBMS_OUTPUT.PUT_LINE(CHR(10) || 'Clasificacion por peso:');

  FOR r IN (SELECT COD_PRODUCTO, NOMBRE, PESOXUNIDAD FROM TBL_PRODUCTOS) LOOP
    v_categoria := CASE
      WHEN r.PESOXUNIDAD < 1 THEN 'LIVIANO'
      WHEN r.PESOXUNIDAD <= 5 THEN 'MEDIO'
      ELSE 'PESADO'
    END;

    CASE v_categoria
      WHEN 'LIVIANO' THEN v_livianos := v_livianos + 1;
      WHEN 'MEDIO'   THEN v_medios   := v_medios   + 1;
      ELSE                v_pesados  := v_pesados  + 1;
    END CASE;
  END LOOP;

  DBMS_OUTPUT.PUT_LINE('  Livianos (<1): ' || v_livianos);
  DBMS_OUTPUT.PUT_LINE('  Medios (1-5):  ' || v_medios);
  DBMS_OUTPUT.PUT_LINE('  Pesados (>5):  ' || v_pesados);

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('No se encontraron datos');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error ' || SQLCODE || ': ' || SQLERRM);
END;
/
\`\`\`

Nótese el uso de las dos formas de \`CASE\`: como expresión que devuelve un valor, y como sentencia que ejecuta instrucciones.`,
      temas: ["examen", "CASE", "%TYPE", "cursor FOR LOOP", "contadores", "excepciones"],
    },
    {
      id: "s11-e02",
      titulo: "Simulacro de la pregunta 2: lotes por vencer",
      dataset: "inventario",
      nivel: "propuesto",
      objetivo:
        "Practicar el cursor explícito con parámetros, atributos y bucle manual, que es lo que pide la segunda pregunta.",
      enunciado: `Implementa un cursor explícito que recorra los lotes próximos a vencer en los siguientes 30 días.

Debe incluir declaración del cursor con parámetros, manejo de \`%FOUND\` y \`%NOTFOUND\`, bucle manual —no \`FOR LOOP\`—, contador de registros procesados, \`JOIN\` con \`TBL_PRODUCTOS\` para mostrar el nombre, y el cálculo de los días que faltan hasta el vencimiento.`,
      requisitos: [
        "El cursor recibe los días de anticipación como parámetro",
        "El bucle es manual: `OPEN`, `FETCH`, `EXIT WHEN %NOTFOUND`, `CLOSE`",
        "Se reporta el total con `%ROWCOUNT` antes de cerrar",
        "Los días restantes se calculan con aritmética de fechas y se muestran como entero",
        "Los lotes ya vencidos quedan excluidos",
      ],
      pistas: [
        "Con el dataset base deben salir 6 lotes: L001, L003, L005, L007, L010 y L012. El L009 ya venció y no cuenta.",
        "`TRUNC(FECHA_VENCIMIENTO - SYSDATE)` da los días completos que faltan.",
      ],
      resultadoEsperado: `Seis lotes listados con su producto y los días restantes, más la línea final con el total procesado.`,
      solucion: null,
      temas: ["examen", "cursores explícitos", "%NOTFOUND", "%ROWCOUNT", "fechas", "JOIN"],
    },
    {
      id: "s11-e03",
      titulo: "Simulacro de la pregunta 3: paquete completo",
      dataset: "inventario",
      nivel: "reto",
      objetivo:
        "Integrar todo el módulo en un paquete con constantes, excepciones, funciones y procedimientos.",
      enunciado: `Es la pregunta de mayor peso del examen: 50 de los 100 puntos. Implementa \`PKG_INVENTARIO\` completo, especificación y cuerpo.

Debe contener la constante \`STOCK_MINIMO\` con valor 10, la excepción \`stock_insuficiente\`, las funciones \`obtener_stock_disponible\` y \`calcular_peso_pedido\`, y los procedimientos \`actualizar_inventario_entrada\` —con parámetro \`OUT\`— y \`generar_reporte_inventario\`.

\`calcular_peso_pedido\` usa un cursor y la fórmula \`CANTIDAD * PESOXCAJA\`. Todo debe tener manejo de excepciones. Al final, un bloque de ejemplo que llame a cada elemento.

Si ya lo hiciste en la semana 5, esta es la ocasión de completarlo y probarlo entero.`,
      requisitos: [
        "La especificación declara los seis elementos pedidos con esos nombres exactos",
        "El cuerpo los implementa todos, ninguno queda como esqueleto",
        "`actualizar_inventario_entrada` valida y usa su parámetro `OUT` para informar el resultado",
        "Cada función y procedimiento tiene su propio manejo de excepciones",
        "El bloque de ejemplo demuestra un caso exitoso y uno que lanza `stock_insuficiente`",
      ],
      pistas: [
        "Los nombres importan: el examen los busca literalmente. `PKG_INVENTARIO`, `STOCK_MINIMO`, `stock_insuficiente`, `obtener_stock_disponible`, `calcular_peso_pedido`, `actualizar_inventario_entrada`, `generar_reporte_inventario`.",
        "Verifica `calcular_peso_pedido(503)` = 690 y que `generar_reporte_inventario` marque P008.",
      ],
      solucion: null,
      temas: ["examen", "paquetes", "funciones", "procedimientos", "excepciones", "integración"],
    },
  ],

  /* ========================= SEMANA 12 ======================== */
  12: [
    {
      id: "s12-e01",
      titulo: "Crear un usuario con cuota y privilegios básicos",
      dataset: null,
      nivel: "guiado",
      objetivo:
        "Crear un usuario de base de datos desde cero y entender qué necesita para poder trabajar.",
      enunciado: `**Esta semana requiere privilegios de administrador.** Si trabajas contra una base compartida, entrégalo como script documentado sin ejecutarlo.

Crea un usuario \`alumno_prueba\` con contraseña, tablespace por defecto, cuota limitada y los privilegios mínimos para que pueda conectarse y crear sus propias tablas y procedimientos.

Después conéctate como ese usuario y comprueba dos cosas: que puede crear una tabla, y que **no** puede ver las tablas de otro esquema.

Al final, elimina el usuario y todo lo que creó.`,
      requisitos: [
        "El `CREATE USER` especifica `DEFAULT TABLESPACE` y `QUOTA`",
        "Los privilegios se otorgan uno por uno, sin usar el rol `DBA`",
        "Se demuestra la conexión efectiva con el usuario nuevo",
        "Se comprueba que un `SELECT` sobre otro esquema es rechazado",
        "El `DROP USER ... CASCADE` deja la base como estaba",
      ],
      pistas: [
        "Sin `QUOTA` sobre el tablespace, el usuario puede conectarse y crear la tabla pero falla al insertar la primera fila con `ORA-01950`. Es el error más confuso de este tema.",
        "`GRANT DBA` resuelve todo y enseña nada. El ejercicio es dar lo mínimo.",
      ],
      resultadoEsperado: `El usuario se conecta, crea una tabla, inserta una fila, y recibe \`ORA-00942\` al intentar leer una tabla ajena.`,
      solucion: `\`\`\`sql
-- Como usuario con privilegios de administrador
CREATE USER alumno_prueba
  IDENTIFIED BY "Clave_Segura_2026"
  DEFAULT TABLESPACE users
  TEMPORARY TABLESPACE temp
  QUOTA 50M ON users;

-- Privilegios minimos, uno por uno
GRANT CREATE SESSION   TO alumno_prueba;
GRANT CREATE TABLE     TO alumno_prueba;
GRANT CREATE SEQUENCE  TO alumno_prueba;
GRANT CREATE PROCEDURE TO alumno_prueba;
GRANT CREATE VIEW      TO alumno_prueba;

-- Verificacion
SELECT username, default_tablespace, account_status
FROM DBA_USERS WHERE username = 'ALUMNO_PRUEBA';

SELECT username, tablespace_name, max_bytes
FROM DBA_TS_QUOTAS WHERE username = 'ALUMNO_PRUEBA';

-- Conectado como alumno_prueba
CREATE TABLE mi_tabla (id NUMBER PRIMARY KEY, dato VARCHAR2(50));
INSERT INTO mi_tabla VALUES (1, 'funciona');
COMMIT;

-- Esto debe fallar con ORA-00942
SELECT * FROM otro_esquema.empleados;

-- Limpieza, de vuelta como administrador
DROP USER alumno_prueba CASCADE;
\`\`\`

\`CREATE SESSION\` es el que permite conectarse: sin él, todos los demás privilegios son inútiles porque el usuario no puede ni entrar.`,
      temas: ["CREATE USER", "GRANT", "QUOTA", "privilegios de sistema", "DBA_USERS"],
    },
    {
      id: "s12-e02",
      titulo: "Rol con privilegios mínimos para una aplicación",
      dataset: null,
      nivel: "propuesto",
      objetivo:
        "Agrupar privilegios en roles y razonar sobre la diferencia entre privilegios de sistema y de objeto.",
      enunciado: `Diseña el esquema de permisos para una aplicación con tres perfiles: consulta, operación y administración funcional.

Crea un rol por perfil, otórgale los privilegios que corresponden y asígnalos a usuarios de prueba. La aplicación accede a las tablas del esquema del proyecto, así que aquí trabajas con privilegios **de objeto**, no de sistema.

Después responde con consultas al diccionario: qué roles tiene cada usuario, qué privilegios tiene cada rol, y qué puede hacer exactamente un usuario dado sobre una tabla dada.`,
      requisitos: [
        "Tres roles creados, cada uno con privilegios distintos y justificados",
        "Ningún rol recibe privilegios con `ANY`",
        "El rol de consulta solo tiene `SELECT`",
        "Se usan `DBA_ROLE_PRIVS`, `ROLE_TAB_PRIVS` y `DBA_TAB_PRIVS` para demostrar el resultado",
        "Se explica la diferencia entre privilegio de sistema y de objeto con un ejemplo de cada uno",
      ],
      pistas: [
        "`GRANT SELECT ANY TABLE` le da acceso a todas las tablas de la base, incluidas las de otros proyectos. Casi nunca es lo que quieres.",
        "Los privilegios que llegan por rol no sirven dentro de un procedimiento con `AUTHID DEFINER`: ahí hacen falta otorgados directamente. Es una trampa clásica.",
      ],
      solucion: null,
      temas: ["roles", "privilegios de objeto", "GRANT", "DBA_ROLE_PRIVS", "privilegio mínimo"],
    },
    {
      id: "s12-e03",
      titulo: "Explorar la arquitectura de la instancia",
      dataset: null,
      nivel: "reto",
      objetivo:
        "Relacionar los conceptos de la arquitectura Oracle con lo que las vistas del diccionario reportan realmente.",
      enunciado: `Escribe un informe del estado de la instancia usando las vistas dinámicas de rendimiento. Para cada punto, la consulta y una interpretación de lo que devuelve:

- el tamaño y la composición de la SGA, componente por componente
- la tasa de acierto del buffer cache y qué significa el número que obtienes
- los datafiles de la base, con su tamaño y su crecimiento máximo
- los procesos de fondo activos y para qué sirve cada uno
- los parámetros de memoria configurados

El entregable no son las consultas: es la interpretación. Un número sin lectura no dice nada.`,
      requisitos: [
        "Se usan `V$SGA`, `V$SGAINFO`, `V$SYSSTAT`, `V$DATAFILE` y `V$PARAMETER`",
        "La tasa de acierto se calcula, no se copia de una vista",
        "Cada resultado va acompañado de una interpretación de una o dos frases",
        "Se identifican al menos cuatro procesos de fondo y su función",
        "Se comenta qué se haría si la tasa de acierto fuera baja",
      ],
      pistas: [
        "La tasa de acierto sale de `db block gets`, `consistent gets` y `physical reads` en `V$SYSSTAT`.",
        "Cuidado con interpretar la tasa de acierto como una nota: un 99% puede convenir a consultas mal escritas que leen mucho del caché. Es un indicador, no un objetivo.",
        "Estas vistas requieren `SELECT` sobre las vistas dinámicas. Si no tienes acceso, documenta las consultas y qué esperarías ver.",
      ],
      solucion: null,
      temas: ["SGA", "arquitectura Oracle", "vistas dinámicas", "buffer cache", "datafiles"],
    },
  ],

  /* ========================= SEMANA 13 ======================== */
  13: [
    {
      id: "s13-e01",
      titulo: "Transferencia bancaria atómica",
      dataset: "banco",
      nivel: "guiado",
      objetivo:
        "Implementar la operación que define el proyecto: mover dinero entre dos cuentas sin que pueda quedar a medias.",
      enunciado: `Crea un procedimiento \`transferir\` que mueva un monto de una cuenta a otra. Es la operación central del sistema y la que el docente revisa primero.

Debe validar que las dos cuentas existan y estén activas, que el monto sea positivo, y que la cuenta de origen tenga saldo suficiente. Debe registrar la transacción en ambas cuentas.

El requisito crítico: si **cualquier** paso falla después de haber empezado a modificar, no debe quedar ningún cambio aplicado. El dinero no puede desaparecer ni duplicarse.`,
      requisitos: [
        "Todas las validaciones ocurren antes de la primera modificación",
        "Se usa `SAVEPOINT` y `ROLLBACK TO` para deshacer solo esta operación si algo falla",
        "El cargo y el abono ocurren dentro de la misma transacción",
        "Se registra una fila en `transacciones` por cada lado del movimiento",
        "Se prueba el caso exitoso y al menos dos que fallan, verificando los saldos después de cada uno",
      ],
      pistas: [
        "`ROLLBACK` sin más deshace toda la transacción del llamador, incluso lo que hizo antes de llamarte. `ROLLBACK TO SAVEPOINT` deshace solo tu parte. La diferencia importa cuando tu procedimiento es una pieza de algo mayor.",
        "El `CHECK (saldo >= 0)` de la tabla es tu red de seguridad, pero no tu validación: si llegas a él, ya fallaste antes.",
      ],
      resultadoEsperado: `Transferir 200.000 de la cuenta 10001 a la 10003 deja 4.300.000 y 1.050.000. Intentar transferir 99.000.000 falla y deja los saldos **exactamente como estaban**.`,
      solucion: `\`\`\`sql
CREATE OR REPLACE PROCEDURE transferir (
  p_origen  IN NUMBER,
  p_destino IN NUMBER,
  p_monto   IN NUMBER
) IS
  v_saldo_origen  cuentas.saldo%TYPE;
  v_estado_origen cuentas.estado%TYPE;
  v_estado_dest   cuentas.estado%TYPE;
BEGIN
  IF p_monto IS NULL OR p_monto <= 0 THEN
    RAISE_APPLICATION_ERROR(-20101, 'El monto debe ser mayor que cero');
  END IF;

  IF p_origen = p_destino THEN
    RAISE_APPLICATION_ERROR(-20102, 'Las cuentas deben ser distintas');
  END IF;

  -- FOR UPDATE bloquea las filas y evita que otra sesion las cambie
  -- entre la validacion y el UPDATE
  SELECT saldo, estado INTO v_saldo_origen, v_estado_origen
  FROM cuentas WHERE numero_cuenta = p_origen FOR UPDATE;

  SELECT estado INTO v_estado_dest
  FROM cuentas WHERE numero_cuenta = p_destino FOR UPDATE;

  IF v_estado_origen != 'ACTIVA' THEN
    RAISE_APPLICATION_ERROR(-20103, 'La cuenta origen no esta activa');
  END IF;

  IF v_estado_dest != 'ACTIVA' THEN
    RAISE_APPLICATION_ERROR(-20104, 'La cuenta destino no esta activa');
  END IF;

  IF v_saldo_origen < p_monto THEN
    RAISE_APPLICATION_ERROR(-20105,
      'Saldo insuficiente. Disponible: ' || v_saldo_origen);
  END IF;

  SAVEPOINT antes_transferencia;

  UPDATE cuentas SET saldo = saldo - p_monto WHERE numero_cuenta = p_origen;
  UPDATE cuentas SET saldo = saldo + p_monto WHERE numero_cuenta = p_destino;

  INSERT INTO transacciones (transaccion_id, cuenta_id, tipo_transaccion,
                             monto, cuenta_destino, descripcion)
  VALUES (seq_transacciones.NEXTVAL, p_origen, 'TRANSFERENCIA',
          p_monto, p_destino, 'Envio a ' || p_destino);

  INSERT INTO transacciones (transaccion_id, cuenta_id, tipo_transaccion,
                             monto, descripcion)
  VALUES (seq_transacciones.NEXTVAL, p_destino, 'DEPOSITO',
          p_monto, 'Recepcion de ' || p_origen);

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    ROLLBACK TO antes_transferencia;
    RAISE_APPLICATION_ERROR(-20106, 'Alguna de las cuentas no existe');
  WHEN OTHERS THEN
    ROLLBACK TO antes_transferencia;
    RAISE;
END transferir;
/
\`\`\`

Dos decisiones que valen la nota: el \`FOR UPDATE\` cierra la ventana entre validar el saldo y descontarlo, donde otra sesión podría retirar el dinero; y el procedimiento **no hace \`COMMIT\`**, dejando esa decisión al llamador.

Un \`SAVEPOINT\` declarado antes de la primera modificación, no al inicio del procedimiento, es lo que permite deshacer exactamente lo propio.`,
      temas: ["transacciones", "SAVEPOINT", "ROLLBACK TO", "FOR UPDATE", "atomicidad", "concurrencia"],
    },
    {
      id: "s13-e02",
      titulo: "Trigger de auditoría de saldos",
      dataset: "banco",
      nivel: "propuesto",
      objetivo:
        "Registrar automáticamente toda modificación de saldo, sin depender de que la aplicación lo recuerde.",
      enunciado: `Crea un trigger que registre en \`auditoria_transacciones\` **cada** cambio del saldo de una cuenta, venga de donde venga: del procedimiento de transferencia, de un \`UPDATE\` manual o de cualquier otra vía.

Debe guardar la cuenta, la operación, el saldo anterior, el nuevo, el usuario y la fecha.

Después demuestra el punto que hace valioso el trigger: haz un \`UPDATE\` directo sobre \`cuentas\` desde una sesión, sin pasar por ningún procedimiento, y comprueba que quedó auditado igual.`,
      requisitos: [
        "El trigger captura los cambios de saldo vengan de donde vengan",
        "No registra nada cuando el `UPDATE` no cambió el saldo",
        "Se demuestra con un `UPDATE` directo, fuera de todo procedimiento",
        "El id de auditoría viene de `seq_aud_trx`",
        "Se explica por qué esta lógica va en un trigger y no en el procedimiento",
      ],
      pistas: [
        "La razón para que sea un trigger es exactamente la del ejercicio: la auditoría no puede depender de que quien modifica se acuerde de auditar.",
        "`USER` devuelve el usuario de base de datos. Si la aplicación se conecta con un único usuario técnico, la auditoría no distingue personas: es una limitación real que conviene documentar.",
      ],
      solucion: null,
      temas: ["triggers", "auditoría", ":OLD", ":NEW", "trazabilidad"],
    },
    {
      id: "s13-e03",
      titulo: "Pruebas de integración del sistema bancario",
      dataset: "banco",
      nivel: "reto",
      objetivo:
        "Escribir un conjunto de pruebas repetible que verifique que estructura, lógica y permisos funcionan juntos.",
      enunciado: `Escribe un script de pruebas que valide el sistema completo de punta a punta. Debe poder ejecutarse tantas veces como se quiera, dejando la base en el mismo estado en que la encontró.

Cada prueba declara qué espera, ejecuta, compara y reporta \`OK\` o \`FALLA\` con el detalle de la diferencia.

Cubre al menos: una transferencia exitosa con verificación de los dos saldos, una transferencia rechazada por saldo insuficiente verificando que **nada** cambió, una rechazada por cuenta inactiva, el registro correcto en la tabla de auditoría, y la coherencia entre el saldo de cada cuenta y la suma de sus transacciones.

Al final, un resumen con el total de pruebas pasadas y falladas.`,
      requisitos: [
        "El script es idempotente: al terminar deshace sus cambios o restaura el estado inicial",
        "Cada prueba compara contra un valor esperado explícito, no solo imprime resultados",
        "Las pruebas negativas verifican que el estado **no** cambió, no solo que hubo error",
        "El resumen final cuenta pasadas y falladas",
        "Al menos una prueba se rompe a propósito para comprobar que el script la detecta",
      ],
      pistas: [
        "Encierra cada prueba en su propio bloque con `SAVEPOINT` y `ROLLBACK`, así una prueba no contamina a la siguiente.",
        "Una prueba negativa que solo verifica que se lanzó el error es incompleta: lo importante es que los saldos siguieran intactos.",
        "Un conjunto de pruebas que nunca has visto fallar no te dice nada. Rompe una a propósito.",
      ],
      solucion: null,
      temas: ["pruebas de integración", "idempotencia", "SAVEPOINT", "verificación", "casos negativos"],
    },
  ],

  /* ========================= SEMANA 14 ======================== */
  14: [
    {
      id: "s14-e01",
      titulo: "Leer un plan de ejecución",
      dataset: "inventario",
      nivel: "guiado",
      objetivo:
        "Interpretar la salida de EXPLAIN PLAN e identificar dónde una consulta pierde el tiempo.",
      enunciado: `Siembra primero el **volumen adicional** del dataset, para que los planes sean realistas.

Toma esta consulta y obtén su plan de ejecución:

\`\`\`sql
SELECT p.NOMBRE, COUNT(*) AS lotes
FROM TBL_LOTES l
JOIN TBL_PRODUCTOS p ON p.COD_PRODUCTO = l.COD_PRODUCTO
WHERE TO_CHAR(l.FECHA_VENCIMIENTO, 'YYYY-MM') = '2026-06'
GROUP BY p.NOMBRE;
\`\`\`

Responde con evidencia del plan: qué operación consume el costo, si hay recorrido completo de tabla y sobre cuál, cuántas filas estima Oracle y cuántas devuelve en realidad, y por qué el índice sobre \`FECHA_VENCIMIENTO\` —si lo creas— no se usa.`,
      requisitos: [
        "Se obtiene el plan con `EXPLAIN PLAN` y `DBMS_XPLAN.DISPLAY`, o con `DBMS_XPLAN.DISPLAY_CURSOR`",
        "Se identifica la operación de mayor costo citando la línea del plan",
        "Se compara la estimación de filas con el número real",
        "Se explica por qué la función sobre la columna impide usar el índice",
      ],
      pistas: [
        "`DBMS_XPLAN.DISPLAY_CURSOR(NULL, NULL, 'ALLSTATS LAST')` después de ejecutar la consulta te muestra estimado y real lado a lado. Es mucho más útil que el plan estimado a secas.",
        "Aplicar `TO_CHAR` a una columna indexada convierte el acceso en un recorrido completo: el índice guarda fechas, no cadenas con formato.",
      ],
      resultadoEsperado: `El plan debe mostrar \`TABLE ACCESS FULL\` sobre \`TBL_LOTES\`, con las 200.000 filas recorridas para devolver unas pocas.`,
      solucion: `\`\`\`sql
CREATE INDEX ix_lotes_venc ON TBL_LOTES (FECHA_VENCIMIENTO);

BEGIN
  DBMS_STATS.GATHER_TABLE_STATS(USER, 'TBL_LOTES');
END;
/

EXPLAIN PLAN FOR
SELECT p.NOMBRE, COUNT(*) AS lotes
FROM TBL_LOTES l
JOIN TBL_PRODUCTOS p ON p.COD_PRODUCTO = l.COD_PRODUCTO
WHERE TO_CHAR(l.FECHA_VENCIMIENTO, 'YYYY-MM') = '2026-06'
GROUP BY p.NOMBRE;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
\`\`\`

El plan muestra \`TABLE ACCESS FULL\` sobre \`TBL_LOTES\` aunque el índice exista.

La razón: el índice almacena valores \`DATE\`, y el predicado no pregunta por una fecha sino por el resultado de \`TO_CHAR\` aplicado a ella. Para saber qué filas cumplen, Oracle tendría que aplicar la función a cada valor del índice, lo que equivale a recorrerlo entero, así que prefiere recorrer la tabla directamente.

La reescritura que sí usa el índice expresa la condición como un rango sobre la columna sin transformarla:

\`\`\`sql
WHERE l.FECHA_VENCIMIENTO >= DATE '2026-06-01'
  AND l.FECHA_VENCIMIENTO <  DATE '2026-07-01'
\`\`\`

Nótese \`< '2026-07-01'\` y no \`<= '2026-06-30'\`: la segunda pierde las filas del último día que tengan hora distinta de medianoche.`,
      temas: ["EXPLAIN PLAN", "DBMS_XPLAN", "FULL SCAN", "índices", "predicados sargables"],
    },
    {
      id: "s14-e02",
      titulo: "Reescribir predicados para que usen índice",
      dataset: "inventario",
      nivel: "propuesto",
      objetivo:
        "Reconocer los patrones que impiden el uso de un índice y corregirlos sin cambiar el resultado.",
      enunciado: `Estas cuatro consultas no pueden usar índice por cómo está escrito su \`WHERE\`. Reescribe cada una para que sí pueda, verificando con el plan que el acceso cambió, y comprobando que el resultado es idéntico al original.

\`\`\`sql
-- A
SELECT * FROM TBL_LOTES WHERE TRUNC(FECHA_INGRESO) = DATE '2026-01-15';

-- B
SELECT * FROM TBL_PRODUCTOS WHERE UPPER(NOMBRE) LIKE 'CAFÉ%';

-- C
SELECT * FROM TBL_LOTES WHERE CANTIDAD + 0 > 400;

-- D
SELECT * FROM TBL_LOTES WHERE COD_PRODUCTO LIKE '%001';
\`\`\`

Una de las cuatro **no se puede arreglar solo reescribiéndola**. Identifica cuál y explica qué haría falta.`,
      requisitos: [
        "Cada reescritura devuelve exactamente el mismo conjunto de filas que la original",
        "Se muestra el plan antes y después de cada cambio",
        "Se identifica cuál de las cuatro necesita algo más que una reescritura",
        "Se explica qué patrón concreto rompe el uso del índice en cada caso",
      ],
      pistas: [
        "Cuando la función sobre la columna es inevitable, la salida es un índice basado en función: `CREATE INDEX ... ON tabla (UPPER(columna))`.",
        "Un `LIKE` que empieza con comodín no puede usar un índice B-tree normal, porque el índice está ordenado por el principio del valor.",
        "Verifica siempre que el resultado no cambió: una reescritura más rápida pero incorrecta no es una optimización.",
      ],
      solucion: null,
      temas: ["índices", "predicados sargables", "índice basado en función", "LIKE", "EXPLAIN PLAN"],
    },
    {
      id: "s14-e03",
      titulo: "El efecto de las estadísticas en el plan",
      dataset: "inventario",
      nivel: "reto",
      objetivo:
        "Comprobar que el optimizador decide según las estadísticas, y qué pasa cuando están desactualizadas.",
      enunciado: `Demuestra experimentalmente que el mismo SQL sobre los mismos datos puede recibir planes distintos según las estadísticas disponibles.

El experimento: siembra el volumen, borra las estadísticas de \`TBL_LOTES\` con \`DBMS_STATS.DELETE_TABLE_STATS\` y obtén el plan de una consulta selectiva. Después recoge estadísticas con \`GATHER_TABLE_STATS\` y obtén el plan otra vez. Compara.

Después ve más lejos: carga muchas filas nuevas **sin** recoger estadísticas y observa cómo la estimación de Oracle se separa de la realidad. Reporta el factor de error.

Cierra explicando qué hace un \`HINT\` en este contexto y por qué es una mala primera respuesta a un plan malo.`,
      requisitos: [
        "Se muestran los planes con y sin estadísticas, señalando la diferencia concreta",
        "Se cuantifica la separación entre filas estimadas y reales tras la carga sin estadísticas",
        "Se prueba al menos un `HINT` y se muestra cómo fuerza el plan",
        "La conclusión argumenta por qué el `HINT` es un parche y qué se debería revisar antes",
      ],
      pistas: [
        "Sin estadísticas Oracle usa valores por defecto que suelen ser muy malos. El plan resultante puede ser absurdo, y eso es justamente lo que quieres ver.",
        "`ALLSTATS LAST` en `DISPLAY_CURSOR` muestra `E-Rows` y `A-Rows` juntas. Un factor de error de 100 o más entre ellas explica casi cualquier plan malo.",
        "El `HINT` congela una decisión que era correcta el día que lo escribiste. Cuando los datos cambien, seguirá ahí.",
      ],
      solucion: null,
      temas: ["DBMS_STATS", "optimizador", "cardinalidad", "hints", "EXPLAIN PLAN"],
    },
  ],

  /* ========================= SEMANA 15 ======================== */
  15: [
    {
      id: "s15-e01",
      titulo: "Crear y dimensionar un tablespace",
      dataset: null,
      nivel: "guiado",
      objetivo:
        "Crear un tablespace con su datafile y entender la diferencia entre espacio reservado y espacio usado.",
      enunciado: `**Esta semana requiere privilegios de administrador.** Si trabajas contra una base compartida, entrégalo como script documentado.

Crea un tablespace \`ts_curso\` con un datafile de 50 MB, con crecimiento automático en incrementos de 10 MB y un tope de 200 MB.

Después crea una tabla dentro de él, insértale suficientes filas para que crezca, y observa cómo cambian las cifras de espacio. Al final, elimina el tablespace junto con su archivo físico.

La pregunta a responder: justo después de crear el tablespace, ¿cuánto espacio está libre y por qué no son los 50 MB completos?`,
      requisitos: [
        "El `CREATE TABLESPACE` especifica tamaño, `AUTOEXTEND`, `NEXT` y `MAXSIZE`",
        "Se consulta el espacio libre y usado antes y después de cargar datos",
        "Se demuestra que el datafile creció automáticamente",
        "El `DROP TABLESPACE` incluye `INCLUDING CONTENTS AND DATAFILES`",
        "Se explica la diferencia entre el tamaño del datafile y el espacio realmente disponible",
      ],
      pistas: [
        "`DBA_DATA_FILES` te da el tamaño del archivo; `DBA_FREE_SPACE` el espacio libre dentro. La diferencia no es solo los datos: hay cabeceras y estructuras internas.",
        "Sin `INCLUDING DATAFILES`, el `DROP` quita el tablespace del diccionario pero deja el archivo ocupando disco.",
      ],
      resultadoEsperado: `El datafile debe pasar de 50 MB a más de 50 MB tras la carga, y \`DBA_FREE_SPACE\` debe reflejar el consumo. Tras el \`DROP\`, ninguna de las dos vistas debe mencionar \`TS_CURSO\`.`,
      solucion: `\`\`\`sql
CREATE TABLESPACE ts_curso
  DATAFILE 'ts_curso01.dbf'
  SIZE 50M
  AUTOEXTEND ON NEXT 10M MAXSIZE 200M
  EXTENT MANAGEMENT LOCAL
  SEGMENT SPACE MANAGEMENT AUTO;

-- Estado inicial
SELECT tablespace_name, file_name, bytes/1024/1024 AS mb,
       autoextensible, maxbytes/1024/1024 AS max_mb
FROM DBA_DATA_FILES WHERE tablespace_name = 'TS_CURSO';

SELECT tablespace_name, SUM(bytes)/1024/1024 AS mb_libres
FROM DBA_FREE_SPACE WHERE tablespace_name = 'TS_CURSO'
GROUP BY tablespace_name;

-- Se carga para forzar el crecimiento
CREATE TABLE prueba_espacio (id NUMBER, relleno VARCHAR2(4000))
  TABLESPACE ts_curso;

INSERT INTO prueba_espacio
SELECT LEVEL, RPAD('X', 4000, 'X') FROM dual CONNECT BY LEVEL <= 20000;
COMMIT;

-- El datafile crecio solo
SELECT file_name, bytes/1024/1024 AS mb FROM DBA_DATA_FILES
WHERE tablespace_name = 'TS_CURSO';

SELECT segment_name, bytes/1024/1024 AS mb FROM DBA_SEGMENTS
WHERE tablespace_name = 'TS_CURSO';

-- Limpieza completa, archivo incluido
DROP TABLESPACE ts_curso INCLUDING CONTENTS AND DATAFILES;
\`\`\`

Sobre la pregunta: el espacio libre inicial es menor que los 50 MB porque Oracle reserva la cabecera del datafile y las estructuras de gestión de extents. Es espacio ocupado por el archivo pero no disponible para datos, y por eso \`DBA_DATA_FILES\` y \`DBA_FREE_SPACE\` nunca coinciden.`,
      temas: ["tablespaces", "datafiles", "AUTOEXTEND", "DBA_DATA_FILES", "DBA_FREE_SPACE"],
    },
    {
      id: "s15-e02",
      titulo: "Informe de ocupación de todos los tablespaces",
      dataset: null,
      nivel: "propuesto",
      objetivo:
        "Escribir la consulta que un administrador ejecuta a diario para saber si le va a faltar espacio.",
      enunciado: `Escribe una consulta que produzca, para **cada** tablespace de la base: el espacio asignado, el usado, el libre, el porcentaje de ocupación y el espacio máximo al que podría crecer contando el \`AUTOEXTEND\`.

El porcentaje debe calcularse contra el **máximo alcanzable**, no contra el tamaño actual. Un tablespace al 95% de su tamaño actual pero con autoextend hasta el triple no es una urgencia; uno al 85% sin autoextend sí lo es. Esa distinción es el punto del ejercicio.

Ordena poniendo primero los que están en riesgo real y agrega una columna de semáforo con el nivel de alerta.`,
      requisitos: [
        "El informe combina `DBA_DATA_FILES` y `DBA_FREE_SPACE` en una sola consulta",
        "El porcentaje se calcula contra `MAXBYTES` cuando hay autoextend y contra `BYTES` cuando no",
        "Se contemplan los tablespaces sin espacio libre registrado, que no deben desaparecer del informe",
        "Hay una columna de alerta con al menos tres niveles y un umbral justificado",
        "Se incluyen los tablespaces temporales, que se consultan en otra vista",
      ],
      pistas: [
        "Un tablespace sin filas en `DBA_FREE_SPACE` está lleno. Con `INNER JOIN` desaparece justo el caso más grave: usa `LEFT JOIN` y `NVL`.",
        "Cuando `AUTOEXTENSIBLE` es `NO`, `MAXBYTES` viene en 0. Un `CASE` resuelve cuál usar.",
        "Los tablespaces temporales viven en `DBA_TEMP_FILES` y `V$TEMP_SPACE_HEADER`, no en las vistas normales.",
      ],
      solucion: null,
      temas: ["DBA_DATA_FILES", "DBA_FREE_SPACE", "monitoreo", "AUTOEXTEND", "tablespaces temporales"],
    },
    {
      id: "s15-e03",
      titulo: "Procedimiento de alerta de espacio",
      dataset: null,
      nivel: "reto",
      objetivo:
        "Convertir una consulta de monitoreo en un procedimiento reutilizable que registre histórico y avise.",
      enunciado: `Convierte el informe del ejercicio anterior en un procedimiento \`revisar_espacio(p_umbral)\` que se pueda programar para que corra solo.

Debe recorrer los tablespaces, comparar contra el umbral recibido, registrar cada medición en una tabla de histórico y devolver por un parámetro \`OUT\` cuántos tablespaces están en alerta.

El histórico es la parte interesante: con varias mediciones puedes calcular la **tendencia** y estimar en cuántos días se llenará un tablespace si sigue creciendo al ritmo actual. Impleméntalo.

Documenta cómo programarías su ejecución diaria con \`DBMS_SCHEDULER\`.`,
      requisitos: [
        "La tabla de histórico guarda tablespace, fecha, espacio usado y porcentaje",
        "El procedimiento recibe el umbral como parámetro, no lo lleva fijo",
        "La proyección de días restantes se calcula sobre al menos dos mediciones y maneja el caso de crecimiento cero o negativo",
        "Los tablespaces en alerta se reportan con el detalle de por qué",
        "Se incluye el `DBMS_SCHEDULER.CREATE_JOB` documentado, aunque no se ejecute",
      ],
      pistas: [
        "Con una sola medición no hay tendencia. El procedimiento debe manejar con elegancia la primera ejecución, sin dividir por cero.",
        "Un tablespace que decreció da una proyección negativa. Decide qué reportar en ese caso: no es un error, es un tablespace que se liberó.",
        "Este ejercicio necesita acceso a las vistas `DBA_*`. Sin él, escríbelo contra `USER_SEGMENTS` para tu propio esquema y documenta la diferencia.",
      ],
      solucion: null,
      temas: ["monitoreo", "DBMS_SCHEDULER", "histórico", "proyección", "procedimientos"],
    },
  ],

  /* ========================= SEMANA 16 ======================== */
  16: [
    {
      id: "s16-e01",
      titulo: "Guion de la demostración",
      dataset: "banco",
      nivel: "guiado",
      objetivo:
        "Preparar una demo que se pueda ejecutar sin improvisar, con los datos en el estado correcto.",
      enunciado: `Escribe el guion completo de los 10 minutos de demostración, en forma de script SQL comentado que puedas ejecutar de arriba abajo.

La secuencia debe contar una historia: abrir una cuenta, depositar, intentar un retiro que **falla** por saldo insuficiente, hacer un retiro válido, transferir a otra cuenta, y mostrar la auditoría de todo lo anterior.

Incluye al inicio un bloque que deje la base en el estado exacto que la demo necesita, para poder repetirla tantas veces como haga falta.

El error que se muestra a propósito es la parte más importante: demuestra que las validaciones existen de verdad.`,
      requisitos: [
        "El script se ejecuta completo sin intervención manual",
        "Incluye un bloque de preparación que hace la demo repetible",
        "La secuencia contiene al menos un caso que falla deliberadamente, con su error visible",
        "Cada paso lleva un comentario con lo que hay que decir mientras se ejecuta",
        "Termina mostrando la tabla de auditoría con el rastro completo",
      ],
      pistas: [
        "Una demo que solo muestra lo que funciona no demuestra que el sistema valide nada. El caso que falla es el que convence.",
        "Si la demo depende del estado en que quedó la base la última vez que la probaste, va a fallar el día de la presentación.",
      ],
      solucion: `Estructura del guion:

\`\`\`sql
-- ============ PREPARACION (no se muestra) ============
-- Deja la base en el estado exacto que la demo necesita.
-- Permite repetir la demo cuantas veces haga falta.
DELETE FROM auditoria_transacciones WHERE cuenta_id >= 90000;
DELETE FROM transacciones          WHERE cuenta_id >= 90000;
DELETE FROM cuentas                WHERE numero_cuenta >= 90000;
DELETE FROM clientes               WHERE cliente_id >= 900;
COMMIT;

-- ============ PASO 1: alta de cliente y cuenta ============
-- "Registramos un cliente nuevo y le abrimos una cuenta de ahorros."
INSERT INTO clientes (cliente_id, nombre_completo, identificacion, direccion)
VALUES (900, 'Cliente Demostración', 'DEMO-001', 'Cra 1 #1-1, Cali');

INSERT INTO cuentas (numero_cuenta, cliente_id, tipo, saldo, estado)
VALUES (90001, 900, 'AHORROS', 0, 'ACTIVA');

INSERT INTO cuentas (numero_cuenta, cliente_id, tipo, saldo, estado)
VALUES (90002, 900, 'CORRIENTE', 0, 'ACTIVA');
COMMIT;

SELECT numero_cuenta, tipo, saldo, estado FROM cuentas WHERE cliente_id = 900;

-- ============ PASO 2: deposito ============
-- "Depositamos un millon. Noten que el saldo se actualiza y queda auditado."
BEGIN
  depositar(90001, 1000000);
  COMMIT;
END;
/

-- ============ PASO 3: el retiro que FALLA ============
-- "Ahora intentamos retirar mas de lo que hay. El sistema debe rechazarlo
--  y, sobre todo, NO debe dejar el saldo modificado."
BEGIN
  retirar(90001, 5000000);
  COMMIT;
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Rechazado correctamente: ' || SQLERRM);
END;
/

-- "Verificamos que el saldo sigue intacto"
SELECT numero_cuenta, saldo FROM cuentas WHERE numero_cuenta = 90001;

-- ============ PASO 4: retiro valido ============
BEGIN
  retirar(90001, 200000);
  COMMIT;
END;
/

-- ============ PASO 5: transferencia ============
-- "Movemos dinero entre las dos cuentas del cliente. Es atomica:
--  o se mueve todo, o no se mueve nada."
BEGIN
  transferir(90001, 90002, 300000);
  COMMIT;
END;
/

SELECT numero_cuenta, saldo FROM cuentas WHERE cliente_id = 900;

-- ============ PASO 6: la auditoria ============
-- "Y aqui esta el rastro completo: quien, cuando, de cuanto a cuanto."
SELECT cuenta_id, operacion, saldo_ant, saldo_nue, usuario,
       TO_CHAR(fecha, 'HH24:MI:SS') AS hora
FROM auditoria_transacciones
WHERE cuenta_id IN (90001, 90002)
ORDER BY auditoria_id;
\`\`\`

El bloque de preparación usa identificadores altos (900, 90001) para no chocar con los datos sembrados. Así la demo es repetible sin borrar el resto del dataset.`,
      temas: ["demo", "guion", "repetibilidad", "casos negativos", "auditoría"],
    },
    {
      id: "s16-e02",
      titulo: "Banco de preguntas de la defensa técnica",
      dataset: "banco",
      nivel: "propuesto",
      objetivo:
        "Anticipar lo que el docente va a preguntar y tener la respuesta con evidencia en el código.",
      enunciado: `Prepara diez preguntas técnicas sobre tu implementación, con su respuesta, y para cada una **el fragmento de código concreto** que la respalda.

No sirven preguntas de definición ("¿qué es un trigger?"). Tienen que ser sobre decisiones que tomaste en el proyecto. Por ejemplo:

- ¿Por qué la validación del saldo está donde está y no en otro lugar?
- ¿Qué pasa si dos personas retiran de la misma cuenta en el mismo instante?
- ¿Por qué el procedimiento no hace \`COMMIT\`?
- Si borro un cliente, ¿qué pasa con sus cuentas y transacciones, y por qué elegiste ese comportamiento?
- ¿Cómo garantizas que el saldo concuerda con la suma de transacciones?

Las cinco restantes las escribes tú, y deben ser sobre las partes de tu código de las que menos seguro estés.`,
      requisitos: [
        "Las diez preguntas son sobre decisiones de la implementación, no definiciones de manual",
        "Cada respuesta cita el fragmento de código que la sustenta",
        "Al menos dos preguntas tratan de concurrencia o de transacciones",
        "Al menos una admite una limitación del diseño y explica qué se haría distinto",
        "Las cinco propias apuntan a las zonas menos sólidas del proyecto",
      ],
      pistas: [
        "La pregunta de los dos retiros simultáneos es la que más proyectos tumba. Si tu respuesta no menciona bloqueos o `FOR UPDATE`, revísala antes de la presentación.",
        "Admitir una limitación con criterio suma. Inventar una justificación para algo que no pensaste, resta.",
      ],
      solucion: null,
      temas: ["defensa técnica", "concurrencia", "transacciones", "decisiones de diseño"],
    },
    {
      id: "s16-e03",
      titulo: "Checklist de verificación previa",
      dataset: "banco",
      nivel: "reto",
      objetivo:
        "Construir la verificación automática que se corre antes de presentar, para no descubrir los problemas en vivo.",
      enunciado: `Escribe un script \`verificar_antes_de_presentar.sql\` que compruebe, en una sola ejecución, que el sistema está listo. Debe informar \`OK\` o \`FALLA\` por cada punto y terminar con un veredicto global.

Como mínimo debe verificar: que todos los objetos estén compilados sin errores, que exista cada tabla y cada restricción esperada, que los datos de la demo estén en el estado correcto, que las operaciones críticas funcionen, que los casos de error sean rechazados, que la auditoría registre, y que no haya incoherencias entre saldos y transacciones.

La verificación de objetos inválidos es la que más presentaciones salva: un paquete que quedó \`INVALID\` tras un cambio de última hora falla en el primer uso.`,
      requisitos: [
        "Se consulta `USER_OBJECTS` por objetos en estado `INVALID` y `USER_ERRORS` por errores de compilación",
        "Cada verificación reporta `OK` o `FALLA` con detalle del problema",
        "El script no modifica nada de forma permanente: lo que prueba, lo deshace",
        "Termina con un veredicto global y un conteo de fallos",
        "Se ejecuta con un objeto roto a propósito para comprobar que lo detecta",
      ],
      pistas: [
        "`SELECT object_name, object_type FROM USER_OBJECTS WHERE status = 'INVALID'` en un solo renglón te ahorra el peor momento de la presentación.",
        "Un objeto `INVALID` puede recompilarse solo al usarlo, pero si el error es real fallará. `ALTER PACKAGE ... COMPILE` te lo dice antes.",
        "Rompe algo a propósito, corre el script, confirma que lo detecta, arréglalo. Un verificador no probado no verifica nada.",
      ],
      solucion: null,
      temas: ["verificación", "USER_OBJECTS", "objetos inválidos", "preparación", "pruebas"],
    },
  ],
};
