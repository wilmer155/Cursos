/* Generado automáticamente: contenido original de cada semana + material adicional
   (ejemplos, errores comunes y ejercicios de práctica).
   WEEKS_CONTENT[n] = arreglo de diapositivas {title, subtitle, type, md} */

const WEEKS_CONTENT = {
  "1": [
    {
      "title": "Introducción al Curso",
      "subtitle": "PL/SQL y Administración Oracle",
      "type": "intro",
      "md": "### Bienvenidos al Curso de PL/SQL\n\nUn viaje completo desde los fundamentos hasta la administración avanzada\n\n[LINK]Ver Contenido Programático (PDF)|https://wilmer155.github.io/Cursos/PL_SQL/750116M_ActualizacionCompetenciasLaborales.pdf[/LINK]\n\n#### Objetivos del Curso\n\n- Dominar PL/SQL desde lo básico hasta lo avanzado\n\n- Aprender administración de bases de datos Oracle\n\n- Desarrollar un proyecto real e integral\n\n- Prepararse para certificaciones Oracle\n\n#### Metodología\n\n- Clases teóricas y prácticas\n\n- Laboratorios hands-on\n\n- Proyecto incremental\n\n- Evaluación continua"
    },
    {
      "title": "Repaso de SQL - DDL",
      "subtitle": "Data Definition Language",
      "type": "content",
      "md": "### Comandos DDL Fundamentales\n\nLos comandos DDL nos permiten definir y modificar la estructura de la base de datos.\n\n#### CREATE TABLE\n\nDefine la estructura de una nueva tabla con sus columnas, tipos de datos y restricciones.\n\n#### ALTER TABLE\n\nModifica la estructura de una tabla existente: agregar, modificar o eliminar columnas.\n\n#### DROP TABLE\n\nElimina completamente una tabla y todos sus datos de la base de datos."
    },
    {
      "title": "Ejemplo Práctico - CREATE TABLE",
      "subtitle": null,
      "type": "code",
      "md": "### Creando una Tabla de Empleados\n\n```sql\nCREATE TABLE empleados (\nemp_id NUMBER(6) PRIMARY KEY,\nnombre VARCHAR2(50) NOT NULL,\napellido VARCHAR2(50) NOT NULL,\nemail VARCHAR2(100) UNIQUE,\ntelefono VARCHAR2(20),\nfecha_contrato DATE DEFAULT SYSDATE,\nsalario NUMBER(8,2) CHECK (salario > 0),\ndepartamento_id NUMBER(4),\n\nCONSTRAINT fk_dept \nFOREIGN KEY (departamento_id) \nREFERENCES departamentos(departamento_id)\n);\n```\n\n#### Puntos Clave:\n\n- **PRIMARY KEY:** Identifica únicamente cada registro\n\n- **NOT NULL:** Campos obligatorios\n\n- **UNIQUE:** Valores únicos en la columna\n\n- **CHECK:** Validación de datos\n\n- **FOREIGN KEY:** Integridad referencial"
    },
    {
      "title": "Repaso de SQL - DML",
      "subtitle": "Data Manipulation Language",
      "type": "content",
      "md": "### Comandos DML Esenciales\n\nLos comandos DML nos permiten manipular los datos dentro de las tablas.\n\n#### INSERT\n\nAgrega nuevos registros a una tabla.\n\nINSERT INTO tabla VALUES (...)\n\n#### UPDATE\n\nModifica registros existentes.\n\nUPDATE tabla SET col = valor\n\n#### DELETE\n\nElimina registros de una tabla.\n\nDELETE FROM tabla WHERE...\n\n#### SELECT\n\nConsulta y recupera datos.\n\nSELECT * FROM tabla"
    },
    {
      "title": "JOINs y Subconsultas",
      "subtitle": null,
      "type": "content",
      "md": "### Combinando Datos de Múltiples Tablas\n\n#### INNER JOIN\n\nDevuelve registros que tienen coincidencias en ambas tablas.\n\nSELECT e.nombre, d.nombre_dept\n\nFROM empleados e INNER JOIN departamentos d\n\nON e.departamento_id = d.departamento_id;\n\n#### LEFT JOIN\n\nDevuelve todos los registros de la tabla izquierda.\n\nSELECT e.nombre, d.nombre_dept\n\nFROM empleados e LEFT JOIN departamentos d\n\nON e.departamento_id = d.departamento_id;\n\n#### Subconsultas\n\nConsultas anidadas para filtros complejos.\n\nSELECT nombre FROM empleados\n\nWHERE salario > (SELECT AVG(salario) FROM empleados);"
    },
    {
      "title": "Introducción a PL/SQL",
      "subtitle": "Procedural Language extension to SQL",
      "type": "content",
      "md": "### ¿Qué es PL/SQL?\n\nPL/SQL es una extensión procedimental de SQL que combina la potencia de SQL con las características de un\nlenguaje de programación estructurado.\n\n#### Ventajas de PL/SQL\n\n- Mejor rendimiento (ejecuta en el servidor)\n\n- Manejo robusto de errores\n\n- Reutilización de código\n\n- Seguridad mejorada\n\n#### Componentes Principales\n\n- Bloques anónimos\n\n- Procedimientos almacenados\n\n- Funciones\n\n- Triggers\n\n- Paquetes"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: combinando JOIN y subconsulta",
      "md": "### Un caso más realista\n\nLas consultas reales casi nunca usan un solo JOIN o una sola subconsulta de forma aislada: normalmente se combinan.\n\n```sql\n-- Empleados que ganan más que el promedio de su propio departamento\nSELECT e.nombre, d.nombre_departamento, e.salario\nFROM empleados e\nJOIN departamentos d\n  ON e.id_departamento = d.id_departamento\nWHERE e.salario > (\n  SELECT AVG(e2.salario)\n  FROM empleados e2\n  WHERE e2.id_departamento = e.id_departamento\n)\nORDER BY d.nombre_departamento, e.salario DESC;\n```\n\nEsta es una **subconsulta correlacionada**: la subconsulta interna usa `e.id_departamento` de la fila externa, por lo que se vuelve a evaluar para cada empleado."
    },
    {
      "type": "content",
      "title": "Errores comunes en SQL básico",
      "md": "### ⚠️ Errores frecuentes\n\n- **Confundir WHERE con HAVING.** `WHERE` filtra filas antes de agrupar; `HAVING` filtra grupos después de un `GROUP BY`. Poner una condición de agregado (`COUNT(*) > 5`) en `WHERE` produce error.\n- **Olvidar el manejo de NULL.** `columna = NULL` nunca es verdadero; se debe usar `columna IS NULL`. Un `NOT IN` con una subconsulta que devuelve algún NULL puede excluir todas las filas silenciosamente.\n- **Columnas ambiguas en JOINs.** Si dos tablas tienen una columna con el mismo nombre (por ejemplo `id`), hay que calificarla con el alias de la tabla (`e.id`) o Oracle marcará error de ambigüedad.\n- **Abusar de SELECT \\*.** Funciona en desarrollo, pero en producción rompe código si alguien agrega una columna nueva a la tabla, y es menos eficiente.\n- **JOIN vs LEFT JOIN sin pensarlo.** Un INNER JOIN descarta silenciosamente las filas sin coincidencia; si necesitas ver también los que no tienen relación (ej. clientes sin pedidos), se requiere LEFT JOIN."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nSin mirar la solución de la siguiente diapositiva, escribe en un papel o editor la consulta SQL para:\n\n> Listar el nombre de cada departamento junto con la cantidad de empleados que tiene, mostrando solo los departamentos con más de 3 empleados, ordenados de mayor a menor cantidad.\n\n**Pistas:**\n- Vas a necesitar `GROUP BY` y `HAVING` (no `WHERE`, porque el filtro es sobre un conteo).\n- Usa un `JOIN` entre `empleados` y `departamentos`.\n\nCuando tengas tu intento, revisa el ejercicio final de esta semana para comparar tu enfoque."
    },
    {
      "title": "Ejercicio Práctico",
      "subtitle": "Aplicando los conceptos aprendidos",
      "type": "exercise",
      "md": "### Ejercicio: Sistema de Gestión de Inventario\n\nDesarrollar un sistema completo de gestión de inventario para una empresa comercial.\n\n#### Descripción del Proyecto:\n\nCrear un sistema que permita gestionar productos, proveedores, categorías, y movimientos de inventario con\ntodas las funcionalidades necesarias para el control de stock.\n\n[LINK]Descargar Material de Apoyo|https://wilmer155.github.io/Cursos/PL_SQL/Material_Apoyo_Clases_PLSQL.rar[/LINK]\n\n📁 Dentro del archivo encontrará todo el material que necesita para realizar el ejercicio: scripts SQL,\ndiagramas ER, datos de prueba y guías detalladas."
    }
  ],
  "2": [
    {
      "title": "Bloques PL/SQL",
      "subtitle": "Estructura básica de un programa PL/SQL",
      "type": "intro",
      "md": "### Anatomía de un Bloque PL/SQL\n\nTodo programa PL/SQL está organizado en bloques con una estructura definida\n\n```sql\nDECLARE\n-- Sección de declaraciones (opcional)\nvariable_name datatype;\n\nBEGIN\n-- Sección ejecutable (obligatoria)\n-- Código PL/SQL aquí\n\nEXCEPTION\n-- Manejo de excepciones (opcional)\nWHEN exception_name THEN\n-- Código de manejo\n\nEND;\n/\n```\n\n#### DECLARE\n\nDeclaración de variables, constantes, cursores y tipos de datos\n\n#### BEGIN\n\nCódigo ejecutable, lógica del programa\n\n#### EXCEPTION\n\nManejo de errores y situaciones excepcionales"
    },
    {
      "title": "Tipos de Datos en PL/SQL",
      "subtitle": null,
      "type": "content",
      "md": "### Tipos de Datos Fundamentales\n\n#### Tipos Escalares\n\n**NUMBER:** Números enteros y decimales\nNUMBER(10,2), NUMBER(5)\n\n**VARCHAR2:** Cadenas de caracteres variables\nVARCHAR2(100)\n\n**DATE:** Fechas y horas\nSYSDATE, TO_DATE()\n\n**BOOLEAN:** Verdadero/Falso\nTRUE, FALSE, NULL\n\n#### Tipos de Referencia\n\n**%TYPE:** Hereda el tipo de una columna\nemp_name empleados.nombre%TYPE;\n\n**%ROWTYPE:** Hereda estructura completa\nemp_rec empleados%ROWTYPE;\n\n**RECORD:** Tipo compuesto personalizado\nTYPE emp_type IS RECORD(...)"
    },
    {
      "title": "Ejemplo Práctico - Variables",
      "subtitle": null,
      "type": "code",
      "md": "### Declaración y Uso de Variables\n\n```sql\nDECLARE\n-- Variables escalares\nv_nombre VARCHAR2(50) := 'Juan Pérez';\nv_salario NUMBER(8,2);\nv_fecha_ingreso DATE := SYSDATE;\nv_activo BOOLEAN := TRUE;\n\n-- Variables de referencia\nv_emp_nombre empleados.nombre%TYPE;\nv_empleado empleados%ROWTYPE;\n\n-- Constante\nc_tasa_impuesto CONSTANT NUMBER(3,2) := 0.15;\n\nBEGIN\n-- Asignación de valores\nv_salario := 5000.00;\n\n-- Selección en variable\nSELECT nombre, salario \nINTO v_emp_nombre, v_salario\nFROM empleados \nWHERE emp_id = 100;\n\n-- Mostrar resultado\nDBMS_OUTPUT.PUT_LINE('Empleado: ' || v_emp_nombre);\nDBMS_OUTPUT.PUT_LINE('Salario: ' || v_salario);\n\nEND;\n/\n```\n\n#### Puntos Importantes:\n\n- Las variables se declaran en la sección DECLARE\n\n- Se pueden inicializar al momento de la declaración\n\n- %TYPE garantiza compatibilidad con la base de datos\n\n- CONSTANT define valores que no pueden cambiar\n\n- DBMS_OUTPUT.PUT_LINE muestra mensajes en consola"
    },
    {
      "title": "Estructuras de Control",
      "subtitle": null,
      "type": "content",
      "md": "### Control de Flujo en PL/SQL\n\n#### Condicionales - IF\n\n```sql\nIF condicion THEN\n-- código\nELSIF otra_condicion THEN\n-- código\nELSE\n-- código\nEND IF;\n```\n\n#### Bucles - LOOP\n\n```sql\n-- Loop básico\nLOOP\n-- código\nEXIT WHEN condicion;\nEND LOOP;\n\n-- While Loop\nWHILE condicion LOOP\n-- código\nEND LOOP;\n\n-- For Loop\nFOR i IN 1..10 LOOP\n-- código\nEND LOOP;\n```\n\n#### CASE Statement\n\n```sql\nCASE variable\nWHEN valor1 THEN resultado1\nWHEN valor2 THEN resultado2\nELSE resultado_default\nEND CASE;\n```"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: %ROWTYPE para manejar una fila completa",
      "md": "### Trabajar con una fila entera, no campo por campo\n\n```sql\nDECLARE\n  v_empleado empleados%ROWTYPE;\nBEGIN\n  SELECT *\n  INTO v_empleado\n  FROM empleados\n  WHERE emp_id = 100;\n\n  DBMS_OUTPUT.PUT_LINE('Nombre: ' || v_empleado.nombre);\n  DBMS_OUTPUT.PUT_LINE('Salario: ' || v_empleado.salario);\n\n  IF v_empleado.salario < 2000 THEN\n    DBMS_OUTPUT.PUT_LINE('Candidato a revisión salarial');\n  END IF;\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN\n    DBMS_OUTPUT.PUT_LINE('No existe un empleado con ese ID');\nEND;\n/\n```\n\nCon `%ROWTYPE` no necesitas declarar una variable por cada columna, y si la tabla cambia de estructura, la variable se ajusta automáticamente."
    },
    {
      "type": "content",
      "title": "Errores comunes con bloques y tipos de datos",
      "md": "### ⚠️ Errores frecuentes\n\n- **Olvidar el punto y coma.** Cada sentencia dentro de PL/SQL termina en `;`, incluyendo `END;` del bloque. Es el error de sintaxis más común entre quienes vienen de otros lenguajes.\n- **Confundir `:=` con `=`.** La asignación en PL/SQL es `:=`; `=` se usa solo para comparar (por ejemplo en un `IF`).\n- **No manejar NO_DATA_FOUND.** Un `SELECT ... INTO` que no encuentra filas lanza esta excepción; si no se captura, el bloque termina abruptamente.\n- **Declarar variables con ancho fijo en vez de %TYPE.** Si declaras `v_nombre VARCHAR2(20)` y la columna real mide 50 caracteres, en algún momento vas a truncar datos o fallar con \"value too large\". `%TYPE` evita ese problema.\n- **Un SELECT ... INTO que devuelve más de una fila.** Lanza `TOO_MANY_ROWS`; si esperas varias filas, necesitas un cursor, no un `SELECT INTO`."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nEscribe un bloque PL/SQL que:\n\n1. Declare una variable con `%ROWTYPE` sobre la tabla `productos`.\n2. Traiga con `SELECT INTO` el producto con `cod_producto = 'P001'`.\n3. Imprima su nombre y, usando `IF`, indique si su precio es \"Alto\" (mayor a 100) o \"Normal\".\n4. Maneje el caso en que el producto no exista.\n\nCompara tu resultado con el patrón del ejemplo anterior antes de continuar."
    },
    {
      "title": "Ejercicio Práctico",
      "subtitle": "Aplicando bloques PL/SQL y tipos de datos",
      "type": "exercise",
      "md": "### Ejercicio: Calculadora de Comisiones por Ventas\n\nCrear un bloque PL/SQL que calcule comisiones para vendedores basado en sus ventas mensuales y años de\nexperiencia en la trilladora.\n\n#### Requerimientos:\n\n- 1. Declarar variables para: COD_VENDEDOR, NOMBRE, ventas_mes, años_experiencia, comision\n\n- 2. Leer datos de un vendedor específico de TBL_VENDEDORES (COD_VENDEDOR = 1)\n\n- 3. Calcular años de experiencia usando SYSDATE y fecha de ingreso\n\n- 4. Aplicar reglas de comisión sobre ventas mensuales:\n\n• Menos de 1 año: 2% de las ventas\n\n- 1-3 años: 3.5% de las ventas\n\n- Más de 3 años: 5% de las ventas\n\n- 5. Mostrar resultado con DBMS_OUTPUT incluyendo nombre del vendedor y comisión calculada\n\n#### Definiciones Clave:\n\n**%TYPE:** Hereda el tipo de dato de una columna específica de la base de datos\n\n**MONTHS_BETWEEN:** Función que calcula la diferencia en meses entre dos fechas\n\n**TRUNC:** Función que trunca decimales, útil para obtener años completos\n\n**TO_CHAR:** Convierte números a formato de texto con máscara de formato\n\n#### Ejemplo de Estructura Básica:\n\n```sql\nDECLARE\n-- Usar %TYPE para compatibilidad con la BD\nv_cod_vendedor TBL_VENDEDORES.COD_VENDEDOR%TYPE;\nv_nombre TBL_VENDEDORES.NOMBRE%TYPE;\n-- Agregar más variables aquí...\n\nBEGIN\n-- Consultar datos del vendedor\nSELECT COD_VENDEDOR, NOMBRE \nINTO v_cod_vendedor, v_nombre\nFROM TBL_VENDEDORES \nWHERE COD_VENDEDOR = 1;\n\n-- Calcular años de experiencia\n-- Usar MONTHS_BETWEEN y TRUNC aquí...\n\n-- Aplicar lógica IF-ELSIF-ELSE para comisiones\n-- Mostrar resultado con DBMS_OUTPUT.PUT_LINE\nEND;\n/\n```\n\n#### Recomendaciones:\n\n- Usa variables simuladas para ventas_mes y fecha_ingreso inicialmente\n\n- Prueba primero con un vendedor específico (COD_VENDEDOR = 1)\n\n- Verifica que la tabla TBL_VENDEDORES tenga datos antes de ejecutar\n\n- Usa TO_CHAR con formato '999,999.99' para mostrar montos legibles\n\n- Habilita DBMS_OUTPUT con SET SERVEROUTPUT ON antes de ejecutar"
    }
  ],
  "3": [
    {
      "title": "Cursores en PL/SQL",
      "subtitle": "Procesamiento de múltiples registros",
      "type": "intro",
      "md": "### ¿Qué son los Cursores?\n\nLos cursores permiten procesar el resultado de una consulta registro por registro\n\n#### Cursores Implícitos\n\n- Creados automáticamente por Oracle\n\n- Para SELECT INTO y DML\n\n- Un solo registro\n\n- Manejo automático\n\n#### Cursores Explícitos\n\n- Definidos por el programador\n\n- Para múltiples registros\n\n- Control manual del ciclo\n\n- OPEN, FETCH, CLOSE\n\n#### Ciclo de Vida del Cursor\n\nDECLARE\n→\nOPEN\n→\nFETCH\n→\nCLOSE"
    },
    {
      "title": "Cursores Explícitos - Sintaxis",
      "subtitle": null,
      "type": "code",
      "md": "### Estructura Básica de un Cursor\n\n```sql\nDECLARE\n-- 1. Declaración del cursor\nCURSOR c_empleados IS\nSELECT emp_id, nombre, salario\nFROM empleados\nWHERE departamento_id = 10;\n\n-- Variables para almacenar datos\nv_emp_id empleados.emp_id%TYPE;\nv_nombre empleados.nombre%TYPE;\nv_salario empleados.salario%TYPE;\n\nBEGIN\n-- 2. Abrir el cursor\nOPEN c_empleados;\n\n-- 3. Procesar registros\nLOOP\nFETCH c_empleados INTO v_emp_id, v_nombre, v_salario;\n\n-- Salir cuando no hay más registros\nEXIT WHEN c_empleados%NOTFOUND;\n\n-- Procesar el registro actual\nDBMS_OUTPUT.PUT_LINE('ID: ' || v_emp_id || \n' Nombre: ' || v_nombre || \n' Salario: ' || v_salario);\nEND LOOP;\n\n-- 4. Cerrar el cursor\nCLOSE c_empleados;\nEND;\n/\n```\n\n#### Atributos del Cursor\n\n- **%FOUND:** TRUE si FETCH fue exitoso\n\n- **%NOTFOUND:** TRUE si no hay más registros\n\n- **%ROWCOUNT:** Número de registros procesados\n\n- **%ISOPEN:** TRUE si el cursor está abierto\n\n#### Buenas Prácticas\n\n- Siempre cerrar los cursores\n\n- Verificar %NOTFOUND para salir\n\n- Usar %ROWTYPE cuando sea posible\n\n- Manejar excepciones apropiadamente"
    },
    {
      "title": "Cursor FOR Loop",
      "subtitle": "Simplificando el procesamiento",
      "type": "code",
      "md": "### Forma Simplificada con FOR Loop\n\nEl Cursor FOR Loop maneja automáticamente OPEN, FETCH y CLOSE\n\n```sql\nDECLARE\nCURSOR c_empleados IS\nSELECT emp_id, nombre, salario, departamento_id\nFROM empleados\nWHERE salario > 3000\nORDER BY salario DESC;\n\nBEGIN\n-- Cursor FOR Loop - manejo automático\nFOR emp_rec IN c_empleados LOOP\nDBMS_OUTPUT.PUT_LINE('Empleado: ' || emp_rec.nombre);\nDBMS_OUTPUT.PUT_LINE('Salario: $' || emp_rec.salario);\nDBMS_OUTPUT.PUT_LINE('Depto: ' || emp_rec.departamento_id);\nDBMS_OUTPUT.PUT_LINE('------------------------');\nEND LOOP;\n\n-- También se puede usar sin declarar cursor\nFOR emp_rec IN (SELECT nombre, salario \nFROM empleados \nWHERE departamento_id = 20) LOOP\nDBMS_OUTPUT.PUT_LINE(emp_rec.nombre || ': $' || emp_rec.salario);\nEND LOOP;\n\nEND;\n/\n```\n\n#### Ventajas del Cursor FOR Loop:\n\n- **Automático:** No necesita OPEN, FETCH, CLOSE\n\n- **Seguro:** Maneja automáticamente %NOTFOUND\n\n- **Limpio:** Código más legible y mantenible\n\n- **Eficiente:** Optimizado por Oracle"
    },
    {
      "title": "Introducción a Procedimientos",
      "subtitle": "Reutilización de código",
      "type": "content",
      "md": "### ¿Qué son los Procedimientos?\n\nLos procedimientos son bloques de código PL/SQL nombrados que pueden ser reutilizados\n\n#### Ventajas\n\n- Reutilización de código\n\n- Modularidad\n\n- Mantenimiento centralizado\n\n- Mejor rendimiento\n\n- Seguridad mejorada\n\n#### Tipos de Parámetros\n\n- **IN:** Solo entrada (por defecto)\n\n- **OUT:** Solo salida\n\n- **IN OUT:** Entrada y salida\n\n#### Sintaxis Básica\n\n```sql\nCREATE OR REPLACE PROCEDURE nombre_procedimiento (\nparametro1 IN tipo_dato,\nparametro2 OUT tipo_dato,\nparametro3 IN OUT tipo_dato\n) IS\n-- Declaraciones locales\nBEGIN\n-- Código del procedimiento\nEXCEPTION\n-- Manejo de excepciones\nEND nombre_procedimiento;\n/\n```"
    },
    {
      "title": "Ejemplo de Procedimiento",
      "subtitle": null,
      "type": "code",
      "md": "### Procedimiento para Actualizar Salarios\n\n```sql\nCREATE OR REPLACE PROCEDURE actualizar_salarios (\np_departamento_id IN NUMBER,\np_porcentaje IN NUMBER,\np_empleados_actualizados OUT NUMBER\n) IS\nv_contador NUMBER := 0;\nBEGIN\n-- Actualizar salarios del departamento\nUPDATE empleados \nSET salario = salario * (1 + p_porcentaje/100)\nWHERE departamento_id = p_departamento_id;\n\n-- Obtener número de registros afectados\np_empleados_actualizados := SQL%ROWCOUNT;\n\n-- Confirmar cambios\nCOMMIT;\n\nDBMS_OUTPUT.PUT_LINE('Salarios actualizados: ' || p_empleados_actualizados);\n\nEXCEPTION\nWHEN OTHERS THEN\nROLLBACK;\nDBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);\nRAISE;\nEND actualizar_salarios;\n/\n\n-- Llamada al procedimiento\nDECLARE\nv_total_actualizados NUMBER;\nBEGIN\nactualizar_salarios(\np_departamento_id => 10,\np_porcentaje => 5,\np_empleados_actualizados => v_total_actualizados\n);\n\nDBMS_OUTPUT.PUT_LINE('Total empleados actualizados: ' || v_total_actualizados);\nEND;\n/\n```\n\n#### Elementos Clave:\n\n- **CREATE OR REPLACE:** Crea o reemplaza el procedimiento\n\n- **SQL%ROWCOUNT:** Número de filas afectadas por DML\n\n- **COMMIT/ROLLBACK:** Control de transacciones\n\n- **EXCEPTION:** Manejo de errores"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: cursor con parámetros",
      "md": "### Reutilizar un cursor para distintos valores\n\n```sql\nDECLARE\n  CURSOR c_empleados_departamento (p_id_dpto NUMBER) IS\n    SELECT nombre, salario\n    FROM empleados\n    WHERE id_departamento = p_id_dpto;\n\n  v_nombre   empleados.nombre%TYPE;\n  v_salario  empleados.salario%TYPE;\nBEGIN\n  OPEN c_empleados_departamento(10);\n  LOOP\n    FETCH c_empleados_departamento INTO v_nombre, v_salario;\n    EXIT WHEN c_empleados_departamento%NOTFOUND;\n    DBMS_OUTPUT.PUT_LINE(v_nombre || ' - ' || v_salario);\n  END LOOP;\n  CLOSE c_empleados_departamento;\nEND;\n/\n```\n\nUn cursor con parámetros se puede abrir varias veces con distintos valores sin tener que redeclararlo."
    },
    {
      "type": "content",
      "title": "Errores comunes con cursores y procedimientos",
      "md": "### ⚠️ Errores frecuentes\n\n- **Olvidar CLOSE.** Un cursor abierto que nunca se cierra consume recursos de la sesión; en bloques largos con muchos cursores puede agotar el límite de cursores abiertos (`ORA-01000`).\n- **Usar %FOUND/%NOTFOUND antes de hacer FETCH.** Justo después de `OPEN`, estos atributos aún no tienen un valor útil; solo son confiables después del primer `FETCH`.\n- **Bucle infinito por olvidar EXIT WHEN.** Si el `EXIT WHEN cursor%NOTFOUND` se coloca en el lugar equivocado (antes del FETCH, o con una condición mal escrita), el LOOP nunca termina.\n- **Confundir el modo de los parámetros.** `IN` es de solo lectura (por defecto), `OUT` es de solo escritura y `IN OUT` permite ambas. Pasar un valor esperando que un parámetro `IN` lo modifique es un error conceptual común.\n- **No liberar el cursor si ocurre una excepción.** Si el bloque falla entre el `OPEN` y el `CLOSE`, el cursor queda abierto salvo que se maneje explícitamente en la sección `EXCEPTION`."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nEscribe un procedimiento `contar_empleados_por_departamento(p_id_dpto IN NUMBER, p_total OUT NUMBER)` que:\n\n1. Reciba el ID de un departamento.\n2. Use un cursor para contar cuántos empleados tiene.\n3. Devuelva el total en el parámetro `OUT`.\n\nLuego escribe un bloque anónimo que lo invoque y muestre el resultado con `DBMS_OUTPUT`."
    },
    {
      "title": "Ejercicio Práctico",
      "subtitle": "Cursores y Procedimientos",
      "type": "exercise",
      "md": "### Ejercicio: Reporte de Productos por Lote\n\n#### Parte 1: Crear Procedimiento\n\nCrear un procedimiento llamado **reporte_lote_productos** que:\n\n- 1. Reciba como parámetro el código del lote (COD_LOTE)\n\n- 2. Use un cursor para obtener todos los productos del lote desde TBL_PRODUCTOS\n\n- 3. Muestre: nombre del producto, peso por unidad, peso por embalaje\n\n- 4. Calcule y muestre el peso total de todos los productos del lote\n\n- 5. Cuente el total de productos en el lote\n\n#### Definiciones Clave:\n\n**CURSOR:** Estructura que permite procesar múltiples registros uno por uno\n\n**CURSOR FOR LOOP:** Forma automática de procesar cursores sin OPEN/FETCH/CLOSE manual\n\n**%NOTFOUND:** Atributo que indica cuando no hay más registros en el cursor\n\n**INNER JOIN:** Une tablas basándose en una condición de igualdad entre columnas\n\n#### Estructura Sugerida:\n\n```sql\nCREATE OR REPLACE PROCEDURE reporte_lote_productos (\np_cod_lote IN VARCHAR2\n) IS\n-- Cursor para productos del lote\nCURSOR c_productos IS\nSELECT p.NOMBRE, p.PESOXUNIDAD, p.PESOXEMBALAJE, p.UNIDADXEMBALAJE\nFROM TBL_PRODUCTOS p\nINNER JOIN TBL_LOTES l ON p.COD_PRODUCTO = l.COD_PRODUCTO\nWHERE l.COD_LOTE = p_cod_lote;\n\n-- Variables para cálculos\nv_peso_total NUMBER := 0;\nv_contador NUMBER := 0;\nv_fecha_lote DATE;\nv_fecha_venc DATE;\nBEGIN\n-- Obtener información del lote\nSELECT FECHA_LOTE, FECHA_VENCIMIENTO\nINTO v_fecha_lote, v_fecha_venc\nFROM TBL_LOTES\nWHERE COD_LOTE = p_cod_lote;\n\nDBMS_OUTPUT.PUT_LINE('=== REPORTE DE LOTE: ' || p_cod_lote || ' ===');\nDBMS_OUTPUT.PUT_LINE('Fecha Lote: ' || TO_CHAR(v_fecha_lote, 'DD/MM/YYYY'));\nDBMS_OUTPUT.PUT_LINE('Fecha Vencimiento: ' || TO_CHAR(v_fecha_venc, 'DD/MM/YYYY'));\nDBMS_OUTPUT.PUT_LINE('----------------------------------------');\n\n-- Procesar productos del lote\nFOR producto IN c_productos LOOP\nv_contador := v_contador + 1;\nv_peso_total := v_peso_total + (producto.PESOXUNIDAD * producto.UNIDADXEMBALAJE);\n\nDBMS_OUTPUT.PUT_LINE('Producto: ' || producto.NOMBRE);\nDBMS_OUTPUT.PUT_LINE(' Peso x Unidad: ' || producto.PESOXUNIDAD || ' kg');\nDBMS_OUTPUT.PUT_LINE(' Peso x Embalaje: ' || producto.PESOXEMBALAJE || ' kg');\nDBMS_OUTPUT.PUT_LINE(' Unidades x Embalaje: ' || producto.UNIDADXEMBALAJE);\nDBMS_OUTPUT.PUT_LINE('----------------------------------------');\nEND LOOP;\n\nIF v_contador = 0 THEN\nDBMS_OUTPUT.PUT_LINE('No se encontraron productos para el lote: ' || p_cod_lote);\nELSE\nDBMS_OUTPUT.PUT_LINE('RESUMEN:');\nDBMS_OUTPUT.PUT_LINE('Total productos: ' || v_contador);\nDBMS_OUTPUT.PUT_LINE('Peso total estimado: ' || v_peso_total || ' kg');\nEND IF;\n\nEXCEPTION\nWHEN NO_DATA_FOUND THEN\nDBMS_OUTPUT.PUT_LINE('ERROR: Lote ' || p_cod_lote || ' no encontrado');\nWHEN OTHERS THEN\nDBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);\nEND;\n/\n```\n\n#### Recomendaciones:\n\n- Usa Cursor FOR Loop para simplificar el código\n\n- Verifica que las tablas TBL_LOTES y TBL_PRODUCTOS tengan datos\n\n- Agrega formato visual con líneas separadoras\n\n- Incluye validación para lotes inexistentes\n\n- Usa TO_CHAR para formatear fechas legiblemente\n\n- Prueba primero con un lote que sepas que existe\n\n#### Desafío Adicional:\n\nUna vez que funcione el procedimiento básico, intenta agregar:\n\n- Parámetro opcional para mostrar solo productos con stock bajo\n\n- Cálculo de días desde la fecha del lote hasta hoy\n\n- Formato de salida como reporte profesional con encabezados"
    }
  ],
  "4": [
    {
      "title": "Diseño de Sistemas Bancarios Modernos",
      "subtitle": "Proyecto: Base de Datos y PL/SQL de un Banco",
      "type": "intro",
      "md": "### Módulo 3: Proyecto Final\n\nSistema de gestión bancaria con Oracle y PL/SQL\n\n#### Objetivos del Sistema\n\n- Diseño de base de datos relacional segura\n\n- Implementación de lógica de negocio con PL/SQL\n\n- Garantizar integridad y consistencia\n\n- Sistema de auditoría completo\n\n#### Metodología de Trabajo\n\n- 3 entregas incrementales\n\n- Equipos de 5 personas\n\n- Aplicación funcional completa\n\n- Interfaz reactiva moderna"
    },
    {
      "title": "Modelo Entidad-Relación (MER)",
      "subtitle": null,
      "type": "content",
      "md": "### Estructura de la Base de Datos Bancaria\n\n#### Entidades Principales\n\n**Cliente:**\n\n- PK: cliente_id\n\n- nombre_completo\n\n- identificacion\n\n- direccion\n\n**Cuenta:**\n\n- PK: numero_cuenta\n\n- FK: cliente_id\n\n- tipo_cuenta, saldo\n\n- estado ('activa', 'inactiva', 'bloqueada')\n\n**Transacción:**\n\n- PK: transaccion_id\n\n- FK: cuenta_id\n\n- tipo_transaccion\n\n- monto, fecha_transaccion\n\n**Usuario:**\n\n- PK: usuario_id\n\n- FK: rol_id\n\n- nombre_usuario\n\n- contrasena (encriptada)\n\n#### Entidades de Soporte\n\n**Rol:**\n\n- PK: rol_id\n\n- nombre_rol\n\n**Auditoria_Transacciones:**\n\n- PK: auditoria_id\n\n- FKs: transaccion_id, usuario_id\n\n- fecha_operacion"
    },
    {
      "title": "Lógica de Negocio con PL/SQL",
      "subtitle": null,
      "type": "code",
      "md": "### Implementación en la Base de Datos\n\n```sql\n-- Paquete de Gestión de Clientes\nCREATE OR REPLACE PACKAGE gestion_clientes_pkg AS\nPROCEDURE crear_cliente(\np_nombre_completo IN VARCHAR2,\np_identificacion IN VARCHAR2,\np_direccion IN VARCHAR2\n);\nEND gestion_clientes_pkg;\n\n-- Paquete de Gestión de Cuentas\nCREATE OR REPLACE PACKAGE gestion_cuentas_pkg AS\nPROCEDURE cambiar_estado_cuenta(\np_numero_cuenta IN NUMBER,\np_nuevo_estado IN VARCHAR2\n);\nEND gestion_cuentas_pkg;\n\n-- Paquete de Transacciones\nCREATE OR REPLACE PACKAGE gestion_transacciones_pkg AS\nPROCEDURE realizar_deposito(\np_cuenta_id IN NUMBER,\np_monto IN NUMBER\n);\n\nPROCEDURE realizar_retiro(\np_cuenta_id IN NUMBER,\np_monto IN NUMBER\n);\n\nPROCEDURE realizar_transferencia(\np_cuenta_origen IN NUMBER,\np_cuenta_destino IN NUMBER,\np_monto IN NUMBER\n);\n\nFUNCTION generar_historial(\np_cuenta_id IN NUMBER\n) RETURN SYS_REFCURSOR;\nEND gestion_transacciones_pkg;\n\n-- Trigger de Validación de Retiros\nCREATE OR REPLACE TRIGGER trg_valida_transaccion_retiro\nBEFORE INSERT ON Transaccion\nFOR EACH ROW\nWHEN (NEW.tipo_transaccion = 'RETIRO')\nDECLARE\nv_saldo NUMBER;\nv_estado VARCHAR2(20);\nBEGIN\nSELECT saldo, estado INTO v_saldo, v_estado\nFROM Cuenta WHERE numero_cuenta = :NEW.cuenta_id;\n\nIF v_estado != 'activa' THEN\nRAISE_APPLICATION_ERROR(-20001, 'Cuenta no está activa');\nEND IF;\n\nIF v_saldo < :NEW.monto THEN\nRAISE_APPLICATION_ERROR(-20002, 'Saldo insuficiente para el retiro');\nEND IF;\nEND;\n/\n```\n\n- **Paquetes:** Organización modular de procedimientos y funciones\n\n- **Triggers:** Validación automática y auditoría de transacciones\n\n- **Secuencias:** Generación automática de IDs únicos\n\n- **Seguridad:** Autenticación y control de acceso por roles"
    },
    {
      "title": "Plan de Implementación del Sistema",
      "subtitle": null,
      "type": "content",
      "md": "### Qué se resuelve en la base de datos y qué no\n\nAntes de escribir código hay que decidir dónde vive cada regla. Dejarlo todo en la aplicación deja la base sin defensa; resolverlo todo con triggers vuelve el sistema imposible de depurar.\n\n#### Reglas que van en restricciones (DDL)\n\n- **PRIMARY KEY / UNIQUE:** identificación del cliente y número de cuenta irrepetibles\n\n- **CHECK:** el saldo no puede quedar negativo; el tipo de cuenta pertenece a una lista cerrada\n\n- **FOREIGN KEY:** toda cuenta pertenece a un cliente existente y toda transacción a una cuenta existente\n\nSon declarativas, las valida el motor y ninguna aplicación puede esquivarlas.\n\n#### Reglas que van en PL/SQL\n\n- **Procedimientos:** operaciones que tocan varias tablas dentro de una sola transacción, como la transferencia\n\n- **Funciones:** cálculos reutilizables, como el saldo disponible o el interés del período\n\n- **Paquetes:** agrupan la lógica de un subdominio y ocultan el detalle interno\n\n- **Triggers:** auditoría y validaciones que necesitan comparar `:OLD` con `:NEW`\n\n#### Plan de seguridad y auditoría\n\nAl tratarse de datos financieros, el diseño lo contempla desde el inicio:\n\n- Un rol de solo consulta y otro con permiso de operación, nunca un único usuario dueño de todo\n\n- Una tabla de auditoría que registre usuario, fecha, valor anterior y valor nuevo de cada movimiento\n\n- Ningún borrado físico de transacciones: se anulan con un movimiento inverso que deja rastro"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: de un error de diseño a su corrección",
      "md": "### Antes: una tabla sin normalizar\n\n```sql\n-- Diseño problemático: repite datos del cliente en cada cuenta\nCREATE TABLE cuentas_mal (\n  numero_cuenta   NUMBER,\n  nombre_cliente  VARCHAR2(100),\n  telefono_cliente VARCHAR2(20),\n  saldo           NUMBER\n);\n```\n\nSi el cliente cambia de teléfono, hay que actualizarlo en **cada una** de sus cuentas: riesgo de inconsistencia.\n\n### Después: separando las entidades\n\n```sql\nCREATE TABLE clientes (\n  id_cliente  NUMBER PRIMARY KEY,\n  nombre      VARCHAR2(100) NOT NULL,\n  telefono    VARCHAR2(20)\n);\n\nCREATE TABLE cuentas (\n  numero_cuenta  NUMBER PRIMARY KEY,\n  id_cliente     NUMBER NOT NULL REFERENCES clientes(id_cliente),\n  saldo          NUMBER DEFAULT 0 CHECK (saldo >= 0)\n);\n```\n\nAhora el teléfono vive en un solo lugar, y la relación entre cliente y cuentas queda explícita con una clave foránea."
    },
    {
      "type": "content",
      "title": "Errores comunes al diseñar el proyecto",
      "md": "### ⚠️ Errores frecuentes\n\n- **No definir claves foráneas.** Sin ellas, Oracle no impide insertar una cuenta con un cliente que no existe: la integridad queda solo \"en la cabeza del programador\".\n- **Mezclar clave natural y clave sustituta sin decidir.** Usar a veces el número de cédula y a veces un ID autogenerado como clave en distintas tablas genera inconsistencias de diseño.\n- **Omitir las cardinalidades en el MER.** No dejar claro si una relación es 1:N o N:M lleva a implementar mal las tablas (por ejemplo, olvidar la tabla intermedia en una relación muchos a muchos).\n- **Diseñar sin pensar en auditoría.** Un sistema bancario necesita saber quién hizo qué y cuándo desde el día uno; agregarlo después obliga a modificar tablas ya en uso.\n- **Empezar a programar PL/SQL antes de validar el modelo.** Si el esquema cambia a mitad de camino, hay que reescribir triggers, procedimientos y paquetes que ya dependían de la estructura anterior."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nPara el sistema bancario, identifica (en un papel o documento) al menos 4 entidades además de `clientes` y `cuentas` (por ejemplo: transacciones, sucursales, tipos de cuenta...), y para cada una:\n\n1. Lista sus atributos principales.\n2. Indica su relación con `cuentas` o `clientes` (1:N, N:M, etc.).\n3. Señala qué claves foráneas necesitaría.\n\nEste ejercicio es la base real de tu entrega de diseño."
    },
    {
      "title": "Plan de Entregas del Proyecto",
      "subtitle": "Cronograma de desarrollo incremental",
      "type": "exercise",
      "md": "### Entregas Incrementales - Sistema Bancario\n\n#### Primera Entrega - Estructura Base\n\n- Creación de todas las tablas del MER bancario\n\n- Implementación de constraints y relaciones\n\n- Scripts de inserción de datos de prueba\n\n- Paquete básico de gestión de clientes\n\n#### Segunda Entrega - Lógica de Negocio\n\n- Paquetes completos de gestión (cuentas, transacciones)\n\n- Triggers de validación y auditoría\n\n- Sistema de autenticación y roles\n\n- Procedimientos de transferencias seguras\n\n#### Tercera Entrega - Aplicación Completa\n\n- Interfaz de usuario reactiva completa\n\n- Dashboard con métricas en tiempo real\n\n- Sistema de reportes y consultas\n\n- Documentación técnica y manual de usuario\n\n#### Preguntas de Reflexión\n\n- ¿Cómo beneficia la lógica PL/SQL la integridad del sistema?\n\n- ¿Por qué son importantes los triggers y secuencias?\n\n- ¿Qué ventajas tiene una interfaz reactiva en sistemas bancarios?"
    }
  ],
  "5": [
    {
      "title": "Funciones en PL/SQL",
      "subtitle": "Bloques que retornan valores",
      "type": "intro",
      "md": "### Funciones vs Procedimientos\n\nLas funciones siempre retornan un valor y pueden usarse en expresiones SQL\n\n#### Funciones\n\n- Siempre retornan un valor\n\n- Pueden usarse en SELECT\n\n- Ideales para cálculos\n\n- No deben modificar datos (buena práctica)\n\n- Palabra clave RETURN\n\n#### Procedimientos\n\n- No retornan valores directamente\n\n- Usan parámetros OUT\n\n- Ideales para procesos\n\n- Pueden modificar datos\n\n- Se ejecutan con EXECUTE\n\n#### Cuándo usar cada uno\n\n**Usar Funciones para:**\n\n- Cálculos matemáticos\n\n- Formateo de datos\n\n- Validaciones\n\n- Conversiones\n\n**Usar Procedimientos para:**\n\n- Procesos de negocio\n\n- Actualizaciones masivas\n\n- Reportes complejos\n\n- Mantenimiento de datos"
    },
    {
      "title": "Sintaxis de Funciones",
      "subtitle": null,
      "type": "code",
      "md": "### Estructura de una Función\n\n```sql\nCREATE OR REPLACE FUNCTION nombre_funcion (\nparametro1 IN tipo_dato,\nparametro2 IN tipo_dato DEFAULT valor\n) RETURN tipo_dato_retorno IS\n-- Declaraciones locales\nvariable_local tipo_dato;\nBEGIN\n-- Lógica de la función\n\nRETURN valor_retorno;\n\nEXCEPTION\nWHEN OTHERS THEN\n-- Manejo de errores\nRETURN valor_por_defecto;\nEND nombre_funcion;\n/\n```\n\n#### Elementos Clave\n\n- **RETURN tipo:** Especifica el tipo de retorno\n\n- **RETURN valor:** Retorna el resultado\n\n- **DEFAULT:** Valores por defecto para parámetros\n\n- **IS/AS:** Ambas palabras son válidas\n\n#### Buenas Prácticas\n\n- Siempre manejar excepciones\n\n- Un solo punto de retorno (recomendado)\n\n- Documentar parámetros y retorno\n\n- Evitar efectos secundarios"
    },
    {
      "title": "Ejemplo Práctico - Función",
      "subtitle": null,
      "type": "code",
      "md": "### Función para Calcular Días de Almacenamiento\n\n```sql\nCREATE OR REPLACE FUNCTION calcular_dias_almacenamiento (\np_fecha_entrada IN DATE\n) RETURN NUMBER IS\nv_dias NUMBER;\nBEGIN\n-- Calcular días desde la entrada hasta hoy\nv_dias := TRUNC(SYSDATE - p_fecha_entrada);\n\n-- Validar que la fecha no sea futura\nIF p_fecha_entrada > SYSDATE THEN\nRETURN -1; -- Código de error\nEND IF;\n\nRETURN v_dias;\n\nEXCEPTION\nWHEN OTHERS THEN\nRETURN -1; -- Error en el cálculo\nEND calcular_dias_almacenamiento;\n/\n\n-- Uso de la función con tabla de entradas\nSELECT \ne.COD_ENTRADA,\ne.FECHA_ENTRADA,\ncalcular_dias_almacenamiento(e.FECHA_ENTRADA) AS dias_almacenados\nFROM TBL_ENTRADAS e\nWHERE calcular_dias_almacenamiento(e.FECHA_ENTRADA) > 30;\n\n-- En un bloque PL/SQL\nDECLARE\nv_dias_producto NUMBER;\nBEGIN\nv_dias_producto := calcular_dias_almacenamiento(DATE '2024-01-15');\nDBMS_OUTPUT.PUT_LINE('Días almacenado: ' || v_dias_producto);\nEND;\n/\n```\n\n#### Características del Ejemplo:\n\n- **TRUNC:** Elimina la parte de hora para obtener días completos\n\n- **Validación:** Verifica fechas futuras\n\n- **Uso en SQL:** Se puede usar en SELECT con TBL_ENTRADAS\n\n- **Aplicación:** Útil para control de inventario y rotación de productos\n\n- **Manejo de errores:** Retorna -1 en caso de error"
    },
    {
      "title": "Introducción a Paquetes",
      "subtitle": "Agrupando código relacionado",
      "type": "content",
      "md": "### ¿Qué son los Paquetes?\n\nLos paquetes agrupan procedimientos, funciones, variables y tipos relacionados en una unidad lógica\n\n#### Ventajas de los Paquetes\n\n- **Modularidad:** Código organizado\n\n- **Encapsulación:** Elementos públicos y privados\n\n- **Rendimiento:** Carga en memoria una sola vez\n\n- **Sobrecarga:** Múltiples versiones de subprogramas\n\n- **Namespace:** Evita conflictos de nombres\n\n#### Componentes\n\n- **SPECIFICATION:** Interfaz pública\n\n- **BODY:** Implementación\n\n- **Variables globales:** Persistentes en sesión\n\n- **Tipos de datos:** Definiciones personalizadas\n\n- **Excepciones:** Personalizadas\n\n#### Estructura de un Paquete\n\n**PACKAGE SPECIFICATION:**\n\n- Declaraciones públicas\n\n- Firmas de funciones/procedimientos\n\n- Variables y constantes públicas\n\n- Tipos de datos públicos\n\n**PACKAGE BODY:**\n\n- Implementación de subprogramas\n\n- Elementos privados\n\n- Código de inicialización\n\n- Variables privadas"
    },
    {
      "title": "Ejemplo de Paquete",
      "subtitle": null,
      "type": "code",
      "md": "### Paquete para Gestión de Inventario\n\n#### PACKAGE SPECIFICATION\n\n```sql\nCREATE OR REPLACE PACKAGE pkg_inventario IS\n-- Constantes públicas\nc_peso_minimo_lote CONSTANT NUMBER := 100; -- kg\n\n-- Tipos públicos\nTYPE t_producto_rec IS RECORD (\ncod_producto VARCHAR2(20),\nnombre VARCHAR2(50),\npeso_total NUMBER\n);\n\n-- Procedimientos públicos\nPROCEDURE registrar_entrada (\np_cod_producto IN VARCHAR2,\np_cantidad IN NUMBER,\np_peso_unidad IN NUMBER,\np_cod_lote IN VARCHAR2\n);\n\n-- Funciones públicas\nFUNCTION obtener_stock_producto (\np_cod_producto IN VARCHAR2\n) RETURN NUMBER;\n\nFUNCTION validar_peso_lote (\np_peso_total IN NUMBER\n) RETURN BOOLEAN;\n\nEND pkg_inventario;\n/\n```\n\n#### PACKAGE BODY\n\n```sql\nCREATE OR REPLACE PACKAGE BODY pkg_inventario IS\n-- Variables privadas\ng_contador_entradas NUMBER := 0;\n\n-- Función privada\nFUNCTION generar_cod_entrada RETURN NUMBER IS\nBEGIN\nSELECT NVL(MAX(COD_ENTRADA), 0) + 1 \nINTO g_contador_entradas \nFROM TBL_ENTRADAS;\nRETURN g_contador_entradas;\nEND generar_cod_entrada;\n\n-- Implementación de función pública\nFUNCTION validar_peso_lote (p_peso_total IN NUMBER) RETURN BOOLEAN IS\nBEGIN\nRETURN p_peso_total >= c_peso_minimo_lote;\nEND validar_peso_lote;\n\n-- Implementación de procedimiento público\nPROCEDURE registrar_entrada (\np_cod_producto IN VARCHAR2,\np_cantidad IN NUMBER,\np_peso_unidad IN NUMBER,\np_cod_lote IN VARCHAR2\n) IS\nv_nuevo_cod NUMBER;\nv_peso_total NUMBER;\nBEGIN\nv_peso_total := p_cantidad * p_peso_unidad;\n\nIF NOT validar_peso_lote(v_peso_total) THEN\nRAISE_APPLICATION_ERROR(-20001, 'Peso del lote insuficiente');\nEND IF;\n\nv_nuevo_cod := generar_cod_entrada;\n\nINSERT INTO TBL_ENTRADAS (\nCOD_ENTRADA, FECHA_ENTRADA, REMESA, ORIGEN, OBSERVACIONES\n) VALUES (\nv_nuevo_cod, SYSDATE, p_cod_lote, 'TRILLADORA', \n'Entrada automática - ' || p_cantidad || ' unidades'\n);\n\nCOMMIT;\nEND registrar_entrada;\n\n-- Implementación de función pública\nFUNCTION obtener_stock_producto (p_cod_producto IN VARCHAR2) RETURN NUMBER IS\nv_stock NUMBER;\nBEGIN\nSELECT NVL(SUM(INVEN_TOTAL), 0) INTO v_stock\nFROM TBL_INVENTARIOS\nWHERE COD_PRODUCTO = p_cod_producto;\n\nRETURN v_stock;\nEND obtener_stock_producto;\n\nEND pkg_inventario;\n/\n```"
    },
    {
      "title": "Uso del Paquete",
      "subtitle": null,
      "type": "code",
      "md": "### Llamando Elementos del Paquete\n\n```sql\n-- Usar procedimiento del paquete\nBEGIN\npkg_inventario.registrar_entrada(\np_cod_producto => 'P001',\np_cantidad => 100,\np_peso_unidad => 10,\np_cod_lote => 'L001'\n);\nEND;\n/\n\n-- Usar función en consulta SQL\nSELECT \ni.COD_PRODUCTO,\npkg_inventario.obtener_stock_producto(i.COD_PRODUCTO) AS stock\nFROM TBL_INVENTARIOS i;\n\n-- Usar constante del paquete\nDECLARE\nv_peso NUMBER := 90;\nBEGIN\nIF v_peso < pkg_inventario.c_peso_minimo_lote THEN\nDBMS_OUTPUT.PUT_LINE('Peso ' || v_peso || ' kg por debajo del minimo de '\n|| pkg_inventario.c_peso_minimo_lote || ' kg');\nELSE\nDBMS_OUTPUT.PUT_LINE('Peso aceptado');\nEND IF;\nEND;\n/\n```\n\n- **paquete.elemento:** Notación punto para acceder\n\n- **Elementos públicos:** Solo los del SPECIFICATION\n\n- **Elementos privados:** Solo dentro del BODY\n\n- **Variables globales:** Persisten durante la sesión"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: función y procedimiento compartiendo estado en un paquete",
      "md": "### Un paquete con variable de estado compartida\n\n```sql\nCREATE OR REPLACE PACKAGE pkg_contador IS\n  PROCEDURE reiniciar;\n  PROCEDURE incrementar;\n  FUNCTION obtener_valor RETURN NUMBER;\nEND pkg_contador;\n/\n\nCREATE OR REPLACE PACKAGE BODY pkg_contador IS\n  v_contador NUMBER := 0;  -- variable de paquete: vive durante toda la sesión\n\n  PROCEDURE reiniciar IS\n  BEGIN\n    v_contador := 0;\n  END reiniciar;\n\n  PROCEDURE incrementar IS\n  BEGIN\n    v_contador := v_contador + 1;\n  END incrementar;\n\n  FUNCTION obtener_valor RETURN NUMBER IS\n  BEGIN\n    RETURN v_contador;\n  END obtener_valor;\nEND pkg_contador;\n/\n\n-- Uso:\nBEGIN\n  pkg_contador.reiniciar;\n  pkg_contador.incrementar;\n  pkg_contador.incrementar;\n  DBMS_OUTPUT.PUT_LINE(pkg_contador.obtener_valor); -- 2\nEND;\n/\n```\n\nLas variables declaradas en el `PACKAGE BODY` (fuera de cualquier procedimiento/función) mantienen su valor mientras dure la sesión, algo que un procedimiento suelto no puede hacer."
    },
    {
      "type": "content",
      "title": "Errores comunes con funciones y paquetes",
      "md": "### ⚠️ Errores frecuentes\n\n- **Funciones con efectos secundarios llamadas desde SQL.** Si una función modifica datos (INSERT/UPDATE) y se llama dentro de un `SELECT`, Oracle puede rechazarla o producir comportamiento inesperado; las funciones usadas en SQL deben ser lo más \"puras\" posible.\n- **Olvidar que la especificación y el cuerpo deben coincidir.** Si cambias la firma de un procedimiento en el `PACKAGE BODY` pero no en el `PACKAGE` (especificación), Oracle marcará error de compilación.\n- **No usar paquetes para agrupar lógica relacionada.** Tener 20 procedimientos sueltos sin ninguna organización dificulta mantener el código; agruparlos por área funcional (ej. `pkg_clientes`, `pkg_cuentas`) ordena el proyecto.\n- **Exponer todo en la especificación.** Si una función auxiliar solo se usa internamente, no debería estar en la `PACKAGE SPECIFICATION` — así se mantiene oculta y el paquete es más fácil de mantener.\n- **Confundir cuándo usar función vs. procedimiento.** Si necesitas usar el resultado dentro de una consulta SQL o una expresión, debe ser función; si solo ejecutas una acción (como un INSERT), un procedimiento es más claro."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nCrea un paquete `pkg_empleados` con:\n\n1. Una función `salario_anual(p_emp_id NUMBER) RETURN NUMBER` que calcule el salario anual (salario mensual × 12).\n2. Un procedimiento `mostrar_resumen(p_emp_id NUMBER)` que use la función anterior y muestre por consola el nombre del empleado junto a su salario anual.\n\nPiensa: ¿la función necesita estar en la especificación del paquete, o solo el procedimiento?"
    },
    {
      "title": "Ejercicio Práctico",
      "subtitle": "Funciones y Paquetes",
      "type": "exercise",
      "md": "### Ejercicio: Paquete de Utilidades de Trilladora\n\n#### Parte 1: Crear Funciones Básicas\n\nCrear las siguientes funciones independientes:\n\n- 1. **calcular_peso_neto(peso_bruto, tara):** Retorna el peso neto del producto\n\n- 2. **validar_humedad(porcentaje):** Retorna TRUE si la humedad está entre 10-14%\n\n- 3. **obtener_stock_total(cod_producto):** Consulta INVEN_TOTAL de TBL_INVENTARIOS\n\n#### Definiciones Clave:\n\n**PACKAGE SPECIFICATION:** Interfaz pública del paquete, define qué elementos son accesibles\n\n**PACKAGE BODY:** Implementación real de los procedimientos y funciones del paquete\n\n**CONSTANT:** Valor que no puede cambiar durante la ejecución del programa\n\n**RETURN:** Palabra clave que especifica el valor que devuelve una función\n\n**NVL:** Función que reemplaza valores NULL con un valor especificado\n\n#### Estructura del Paquete:\n\n```sql\n-- PASO 1: Crear la especificación\nCREATE OR REPLACE PACKAGE pkg_trilladora IS\n-- Constantes públicas\nHUMEDAD_OPTIMA CONSTANT NUMBER := 12;\n\n-- Funciones públicas (solo firmas)\nFUNCTION calcular_peso_neto(peso_bruto NUMBER, tara NUMBER) RETURN NUMBER;\nFUNCTION validar_humedad(porcentaje NUMBER) RETURN BOOLEAN;\nFUNCTION obtener_stock_total(p_cod_producto NUMBER) RETURN NUMBER;\n\n-- Procedimiento público\nPROCEDURE generar_reporte_inventario(p_cod_producto NUMBER DEFAULT NULL);\nEND pkg_trilladora;\n/\n\n-- PASO 2: Crear el cuerpo (implementación)\nCREATE OR REPLACE PACKAGE BODY pkg_trilladora IS\n-- Implementar cada función aquí\nFUNCTION calcular_peso_neto(peso_bruto NUMBER, tara NUMBER) RETURN NUMBER IS\nBEGIN\n-- Tu código aquí\nRETURN peso_bruto - tara;\nEND;\n\n-- Implementar las demás funciones...\n\nEND pkg_trilladora;\n/\n```\n\n#### Recomendaciones:\n\n- Crea primero la SPECIFICATION, luego el BODY\n\n- Usa nombres descriptivos para funciones y parámetros\n\n- Incluye manejo de excepciones en cada función\n\n- Prueba cada función individualmente antes de crear el paquete\n\n- Usa DEFAULT NULL para parámetros opcionales\n\n- Verifica que las tablas TBL_INVENTARIOS y TBL_PRODUCTOS existan\n\n#### Ejemplo de Uso:\n\n```sql\n-- Después de crear el paquete, úsalo así:\nDECLARE\nv_peso_neto NUMBER;\nv_humedad_ok BOOLEAN;\nv_stock NUMBER;\nBEGIN\n-- Usar funciones del paquete\nv_peso_neto := pkg_trilladora.calcular_peso_neto(1000, 50);\nv_humedad_ok := pkg_trilladora.validar_humedad(13);\nv_stock := pkg_trilladora.obtener_stock_total(1);\n\n-- Mostrar resultados\nDBMS_OUTPUT.PUT_LINE('Peso neto: ' || v_peso_neto);\nDBMS_OUTPUT.PUT_LINE('Stock producto 1: ' || v_stock);\n\n-- Usar procedimiento\npkg_trilladora.generar_reporte_inventario(1);\nEND;\n/\n```\n\n#### Desafío Avanzado:\n\nUna vez que tengas el paquete básico funcionando, intenta agregar:\n\n- Función para calcular merma entre peso inicial y final\n\n- Procedimiento que actualice inventarios automáticamente\n\n- Variable global que cuente cuántas veces se usa el paquete"
    }
  ],
  "6": [
    {
      "title": "Triggers en Oracle",
      "subtitle": "Código que se ejecuta automáticamente",
      "type": "intro",
      "md": "### ¿Qué son los Triggers?\n\nLos triggers son bloques PL/SQL que se ejecutan automáticamente en respuesta a eventos específicos\n\n#### Cuándo se Ejecutan\n\n- INSERT\n\n- UPDATE\n\n- DELETE\n\n- CREATE\n\n- ALTER\n\n- DROP\n\n#### Tipos de Timing\n\n- **BEFORE:** Antes del evento\n\n- **AFTER:** Después del evento\n\n- **INSTEAD OF:** En lugar del evento (vistas)\n\n#### Usos Comunes\n\n- Auditoría\n\n- Validación compleja\n\n- Logging\n\n- Sincronización\n\n- Cálculos automáticos\n\n#### Consideraciones Importantes\n\n**Ventajas:**\n\n- Ejecución automática\n\n- Transparente para aplicaciones\n\n- Integridad de datos\n\n- Centralización de lógica\n\n**Desventajas:**\n\n- Difíciles de debuggear\n\n- Pueden afectar rendimiento\n\n- Lógica oculta\n\n- Cascadas complejas"
    },
    {
      "title": "Sintaxis de Triggers",
      "subtitle": null,
      "type": "code",
      "md": "### Estructura Básica de un Trigger\n\n```sql\nCREATE OR REPLACE TRIGGER nombre_trigger\nBEFORE | AFTER | INSTEAD OF\nINSERT | UPDATE | DELETE [OR INSERT | UPDATE | DELETE...]\nON nombre_tabla\n[FOR EACH ROW]\n[WHEN (condicion)]\nDECLARE\n-- Declaraciones (opcional)\nBEGIN\n-- Código del trigger\n\nEXCEPTION\n-- Manejo de excepciones (opcional)\nEND nombre_trigger;\n/\n```\n\n#### Elementos Clave\n\n- **TIMING:** BEFORE, AFTER, INSTEAD OF\n\n- **EVENTO:** INSERT, UPDATE, DELETE\n\n- **FOR EACH ROW:** Trigger de fila vs statement\n\n- **WHEN:** Condición adicional\n\n#### Pseudoregistros\n\n- **:NEW:** Valores nuevos (INSERT/UPDATE)\n\n- **:OLD:** Valores anteriores (UPDATE/DELETE)\n\n- Solo disponibles en triggers FOR EACH ROW\n\n- Se pueden modificar en BEFORE triggers\n\n#### Predicados Condicionales\n\n```sql\nIF INSERTING THEN\n-- Código para INSERT\nELSIF UPDATING THEN\n-- Código para UPDATE\nIF UPDATING('columna') THEN\n-- Código para UPDATE de columna específica\nEND IF;\nELSIF DELETING THEN\n-- Código para DELETE\nEND IF;\n```"
    },
    {
      "title": "Trigger de Auditoría",
      "subtitle": null,
      "type": "code",
      "md": "### Ejemplo: Auditoría de Cambios en Empleados\n\n#### 1. Crear Tabla de Auditoría\n\n```sql\nCREATE TABLE auditoria_empleados (\naudit_id NUMBER PRIMARY KEY,\nemp_id NUMBER,\noperacion VARCHAR2(10),\ncampo_modificado VARCHAR2(50),\nvalor_anterior VARCHAR2(200),\nvalor_nuevo VARCHAR2(200),\nusuario VARCHAR2(50),\nfecha_cambio DATE\n);\n\nCREATE SEQUENCE seq_auditoria START WITH 1;\n```\n\n#### 2. Crear Trigger de Auditoría\n\n```sql\nCREATE OR REPLACE TRIGGER trg_auditoria_empleados\nAFTER INSERT OR UPDATE OR DELETE\nON empleados\nFOR EACH ROW\nDECLARE\nv_operacion VARCHAR2(10);\nBEGIN\n-- Determinar tipo de operación\nIF INSERTING THEN\nv_operacion := 'INSERT';\nINSERT INTO auditoria_empleados VALUES (\nseq_auditoria.NEXTVAL,\n:NEW.emp_id,\nv_operacion,\n'NUEVO_EMPLEADO',\nNULL,\n:NEW.nombre || ' - ' || :NEW.salario,\nUSER,\nSYSDATE\n);\nELSIF UPDATING THEN\nv_operacion := 'UPDATE';\n\n-- Auditar cambio de nombre\nIF :OLD.nombre != :NEW.nombre THEN\nINSERT INTO auditoria_empleados VALUES (\nseq_auditoria.NEXTVAL, :NEW.emp_id, v_operacion,\n'NOMBRE', :OLD.nombre, :NEW.nombre, USER, SYSDATE\n);\nEND IF;\n\n-- Auditar cambio de salario\nIF :OLD.salario != :NEW.salario THEN\nINSERT INTO auditoria_empleados VALUES (\nseq_auditoria.NEXTVAL, :NEW.emp_id, v_operacion,\n'SALARIO', TO_CHAR(:OLD.salario), TO_CHAR(:NEW.salario), \nUSER, SYSDATE\n);\nEND IF;\n\nELSIF DELETING THEN\nv_operacion := 'DELETE';\nINSERT INTO auditoria_empleados VALUES (\nseq_auditoria.NEXTVAL,\n:OLD.emp_id,\nv_operacion,\n'EMPLEADO_ELIMINADO',\n:OLD.nombre || ' - ' || :OLD.salario,\nNULL,\nUSER,\nSYSDATE\n);\nEND IF;\nEND trg_auditoria_empleados;\n/\n```"
    },
    {
      "title": "Trigger BEFORE para Validación",
      "subtitle": null,
      "type": "code",
      "md": "### Validación y Modificación de Datos\n\n```sql\nCREATE OR REPLACE TRIGGER trg_validar_empleado\nBEFORE INSERT OR UPDATE\nON empleados\nFOR EACH ROW\nDECLARE\nv_count NUMBER;\nv_salario_max NUMBER;\nBEGIN\n-- Convertir nombre a formato apropiado\n:NEW.nombre := INITCAP(TRIM(:NEW.nombre));\n\n-- Validar email único (solo si se proporciona)\nIF :NEW.email IS NOT NULL THEN\nSELECT COUNT(*)\nINTO v_count\nFROM empleados\nWHERE UPPER(email) = UPPER(:NEW.email)\nAND emp_id != NVL(:NEW.emp_id, -1);\n\nIF v_count > 0 THEN\nRAISE_APPLICATION_ERROR(-20001, \n'El email ya existe para otro empleado');\nEND IF;\n\n-- Convertir email a minúsculas\n:NEW.email := LOWER(:NEW.email);\nEND IF;\n\n-- Validar salario según el departamento\nSELECT MAX(salario) * 1.5\nINTO v_salario_max\nFROM empleados\nWHERE departamento_id = :NEW.departamento_id;\n\nIF :NEW.salario > NVL(v_salario_max, 10000) THEN\nRAISE_APPLICATION_ERROR(-20002, \n'Salario excede el límite del departamento');\nEND IF;\n\n-- Asignar fecha de contrato si es INSERT\nIF INSERTING AND :NEW.fecha_contrato IS NULL THEN\n:NEW.fecha_contrato := SYSDATE;\nEND IF;\n\n-- Validar que no se reduzca el salario más del 10%\nIF UPDATING('salario') AND :NEW.salario < :OLD.salario * 0.9 THEN\nRAISE_APPLICATION_ERROR(-20003,\n'No se permite reducir el salario mas del 10%');\nEND IF;\nEND;\n/\n```\n\n- **BEFORE:** Permite modificar :NEW antes de guardar\n\n- **INITCAP:** Formatea nombres apropiadamente\n\n- **RAISE_APPLICATION_ERROR:** Lanza errores personalizados\n\n- **Validaciones complejas:** Que no se pueden hacer con constraints\n\n- **Valores automáticos:** Asigna fecha_contrato si es NULL"
    },
    {
      "title": "Trigger para IDs Automáticos",
      "subtitle": null,
      "type": "code",
      "md": "### Asignación Automática de IDs\n\nAntes de Oracle 12c, los triggers eran la forma estándar de asignar IDs automáticos\n\n```sql\n-- Crear secuencia para IDs\nCREATE SEQUENCE seq_empleados\nSTART WITH 1000\nINCREMENT BY 1\nNOCACHE;\n\n-- Trigger para asignar ID automáticamente\nCREATE OR REPLACE TRIGGER trg_empleados_id\nBEFORE INSERT\nON empleados\nFOR EACH ROW\nWHEN (NEW.emp_id IS NULL)\nBEGIN\n:NEW.emp_id := seq_empleados.NEXTVAL;\nEND trg_empleados_id;\n/\n\n-- Ejemplo de uso\nINSERT INTO empleados (nombre, salario, departamento_id)\nVALUES ('Carlos López', 4500, 20);\n-- El emp_id se asigna automáticamente\n\n-- También funciona si se especifica NULL\nINSERT INTO empleados (emp_id, nombre, salario, departamento_id)\nVALUES (NULL, 'María Rodríguez', 5200, 30);\n\n-- Pero no interfiere si se proporciona un ID\nINSERT INTO empleados (emp_id, nombre, salario, departamento_id)\nVALUES (2000, 'Ana Martínez', 4800, 10);\n```\n\n#### Ventajas del Approach\n\n- **WHEN clause:** Solo se ejecuta si ID es NULL\n\n- **Flexibilidad:** Permite IDs manuales\n\n- **Transparente:** Aplicación no necesita cambios\n\n- **Consistente:** Siempre genera IDs únicos\n\n#### Oracle 12c+ Alternativa\n\n```sql\n-- Columna con IDENTITY (Oracle 12c+)\nALTER TABLE empleados \nMODIFY emp_id NUMBER \nGENERATED BY DEFAULT AS IDENTITY;\n```\n\nMás eficiente que triggers para IDs automáticos"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: ID automático y la trampa de la tabla mutante",
      "md": "### Asignación automática de ID con secuencia\n\n```sql\nCREATE SEQUENCE seq_pedidos START WITH 1 INCREMENT BY 1;\n\nCREATE OR REPLACE TRIGGER trg_pedidos_id\nBEFORE INSERT ON pedidos\nFOR EACH ROW\nBEGIN\n  IF :NEW.id_pedido IS NULL THEN\n    :NEW.id_pedido := seq_pedidos.NEXTVAL;\n  END IF;\nEND;\n/\n```\n\n### ⚠️ La trampa de la \"tabla mutante\"\n\nEste trigger **fallaría** con el error `ORA-04091` (tabla mutante) porque intenta consultar la misma tabla `pedidos` mientras se está insertando en ella:\n\n```sql\nCREATE OR REPLACE TRIGGER trg_pedidos_validar  -- ❌ incorrecto\nBEFORE INSERT ON pedidos\nFOR EACH ROW\nDECLARE\n  v_total NUMBER;\nBEGIN\n  SELECT COUNT(*) INTO v_total FROM pedidos;  -- consulta la misma tabla\n  IF v_total > 1000 THEN\n    RAISE_APPLICATION_ERROR(-20001, 'Límite de pedidos alcanzado');\n  END IF;\nEND;\n/\n```\n\nPara este tipo de validaciones (que dependen del estado completo de la tabla), es mejor usar una tabla auxiliar de control o validarlo desde el procedimiento que hace el INSERT, no desde un trigger de fila."
    },
    {
      "type": "content",
      "title": "Errores comunes con triggers",
      "md": "### ⚠️ Errores frecuentes\n\n- **Tabla mutante (ORA-04091).** Un trigger de fila que consulta o modifica la misma tabla sobre la que está disparado suele fallar. Es el error más característico de triggers mal diseñados.\n- **Olvidar FOR EACH ROW.** Sin esta cláusula, el trigger es de sentencia (se ejecuta una sola vez por el INSERT/UPDATE/DELETE completo) y no tiene acceso a `:NEW` o `:OLD` fila por fila.\n- **Triggers que se disparan a sí mismos.** Un trigger AFTER UPDATE que hace UPDATE sobre la misma tabla puede volver a dispararse, generando un ciclo o un error de recursión si no se controla.\n- **Poner demasiada lógica de negocio en triggers.** Los triggers son \"invisibles\" para quien lee el código de la aplicación; abusar de ellos para reglas de negocio complejas dificulta el mantenimiento. Suele ser mejor usarlos para auditoría, valores por defecto y validaciones simples.\n- **No considerar triggers múltiples sobre la misma tabla y evento.** Si hay varios triggers BEFORE INSERT en la misma tabla, el orden de ejecución no está garantizado a menos que se use `FOLLOWS`/`PRECEDES`, lo que puede causar comportamientos inesperados."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nEscribe un trigger `BEFORE UPDATE` sobre la tabla `empleados` que impida que el salario de un empleado se reduzca (es decir, que rechace la actualización si `:NEW.salario < :OLD.salario`), usando `RAISE_APPLICATION_ERROR`.\n\nPista: no necesitas consultar la tabla `empleados` dentro del trigger — ya tienes `:OLD` y `:NEW` disponibles, así que no hay riesgo de tabla mutante aquí."
    },
    {
      "title": "Ejercicio Práctico",
      "subtitle": "Triggers para Control de Inventario",
      "type": "exercise",
      "md": "### Sistema de Triggers - Trilladora\n\n#### Contexto del Ejercicio\n\nImplementar triggers para automatizar el control de inventario en la trilladora, incluyendo auditoría y\nvalidaciones.\n\n#### Parte 1: Trigger de Auditoría\n\n```sql\n-- Actualizado para usar tablas reales de trilladora\n-- Crear tabla de auditoría\nCREATE TABLE TBL_AUDITORIA_INVENTARIO (\naudit_id NUMBER PRIMARY KEY,\ncod_producto NUMBER,\noperacion VARCHAR2(10),\npiso_afectado NUMBER,\ncantidad_anterior NUMBER,\ncantidad_nueva NUMBER,\nusuario VARCHAR2(50),\nfecha_cambio DATE\n);\n\nCREATE SEQUENCE seq_auditoria_inv START WITH 1;\n\n-- Trigger de auditoría para TBL_INVENTARIOS\nCREATE OR REPLACE TRIGGER trg_audit_inventarios\nAFTER UPDATE ON TBL_INVENTARIOS\nFOR EACH ROW\nBEGIN\n-- Auditar cambios en INVEN_PISO1\nIF :OLD.INVEN_PISO1 != :NEW.INVEN_PISO1 THEN\nINSERT INTO TBL_AUDITORIA_INVENTARIO VALUES (\nseq_auditoria_inv.NEXTVAL,\n:NEW.COD_PRODUCTO,\n'UPDATE',\n1,\n:OLD.INVEN_PISO1,\n:NEW.INVEN_PISO1,\nUSER,\nSYSDATE\n);\nEND IF;\n\n-- Auditar cambios en INVEN_PISO2\nIF :OLD.INVEN_PISO2 != :NEW.INVEN_PISO2 THEN\nINSERT INTO TBL_AUDITORIA_INVENTARIO VALUES (\nseq_auditoria_inv.NEXTVAL,\n:NEW.COD_PRODUCTO,\n'UPDATE',\n2,\n:OLD.INVEN_PISO2,\n:NEW.INVEN_PISO2,\nUSER,\nSYSDATE\n);\nEND IF;\nEND;\n/\n```\n\n#### Parte 2: Triggers de Validación\n\n- Trigger BEFORE UPDATE en TBL_INVENTARIOS para validar que INVEN_TOTAL = INVEN_PISO1 + INVEN_PISO2\n\n- Trigger para no permitir inventario negativo\n\n- Trigger en TBL_DETALLEPEDIDOS para verificar stock disponible antes de crear pedidos\n\n- Trigger para actualizar automáticamente TBL_HISTORICOSINVEN\n\n#### Bonus:\n\nCrear trigger que genere alertas automáticas cuando un lote esté próximo a vencer (TBL_LOTES) y tenga\ninventario disponible."
    }
  ],
  "7": [
    {
      "title": "Excepciones y Colecciones",
      "subtitle": "Manejo avanzado de errores y estructuras de datos complejas",
      "type": "intro",
      "md": "### Módulo 1: Fundamentos de PL/SQL\n\nTécnicas avanzadas para el manejo robusto de errores y procesamiento eficiente de datos\n\n#### 🚨 Manejo de Excepciones\n\n- Excepciones predefinidas de Oracle\n\n- Excepciones definidas por el usuario\n\n- Propagación y manejo de errores\n\n- Logging y auditoría de errores\n\n#### 📊 Colecciones Avanzadas\n\n- BULK COLLECT para rendimiento\n\n- FORALL para operaciones masivas\n\n- VARRAY y Nested Tables\n\n- Associative Arrays"
    },
    {
      "title": "Excepciones Predefinidas",
      "subtitle": null,
      "type": "content",
      "md": "### Excepciones Comunes en PL/SQL\n\n{[\n{\nname: \"NO_DATA_FOUND\",\ndescription: \"SELECT INTO no encuentra registros\",\ncolor: \"red\",\ncode: \"ORA-01403\",\n},\n{\nname: \"TOO_MANY_ROWS\",\ndescription: \"SELECT INTO encuentra múltiples registros\",\ncolor: \"orange\",\ncode: \"ORA-01422\",\n},\n{\nname: \"DUP_VAL_ON_INDEX\",\ndescription: \"Violación de constraint UNIQUE\",\ncolor: \"yellow\",\ncode: \"ORA-00001\",\n},\n{\nname: \"VALUE_ERROR\",\ndescription: \"Error de conversión de tipos\",\ncolor: \"blue\",\ncode: \"ORA-06502\",\n},\n{\nname: \"INVALID_CURSOR\",\ndescription: \"Operación inválida en cursor\",\ncolor: \"purple\",\ncode: \"ORA-01001\",\n},\n].map((exc, index) => (\n\n#### {exc.name}\n\n{exc.description}\n\n{exc.code}\n\n))}"
    },
    {
      "title": "Manejo de Excepciones - Ejemplo",
      "subtitle": null,
      "type": "code",
      "md": "### Estructura Completa de Manejo de Errores\n\n```sql\nDECLARE\nv_nombre empleados.nombre%TYPE;\nv_salario empleados.salario%TYPE;\nv_count NUMBER;\n\n-- Excepción personalizada\nempleado_inactivo EXCEPTION;\nPRAGMA EXCEPTION_INIT(empleado_inactivo, -20001);\n\nBEGIN\n-- Verificar si el empleado existe y está activo\nSELECT COUNT(*) INTO v_count\nFROM empleados \nWHERE emp_id = 999 AND estado = 'ACTIVO';\n\nIF v_count = 0 THEN\nRAISE_APPLICATION_ERROR(-20001, 'Empleado no encontrado o inactivo');\nEND IF;\n\n-- Obtener datos del empleado\nSELECT nombre, salario \nINTO v_nombre, v_salario\nFROM empleados \nWHERE emp_id = 999;\n\nDBMS_OUTPUT.PUT_LINE('Empleado: ' || v_nombre);\nDBMS_OUTPUT.PUT_LINE('Salario: ' || TO_CHAR(v_salario, '999,999.99'));\n\nEXCEPTION\nWHEN NO_DATA_FOUND THEN\nDBMS_OUTPUT.PUT_LINE('ERROR: No se encontró el empleado especificado');\n-- Log del error\nINSERT INTO error_log (fecha, error_code, mensaje)\nVALUES (SYSDATE, 'NO_DATA_FOUND', 'Empleado ID 999 no encontrado');\n\nWHEN TOO_MANY_ROWS THEN\nDBMS_OUTPUT.PUT_LINE('ERROR: Se encontraron múltiples empleados');\n\nWHEN empleado_inactivo THEN\nDBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);\n\nWHEN OTHERS THEN\nDBMS_OUTPUT.PUT_LINE('ERROR INESPERADO: ' || SQLERRM);\nDBMS_OUTPUT.PUT_LINE('Código de error: ' || SQLCODE);\n-- Re-lanzar la excepción si es crítica\nIF SQLCODE BETWEEN -20999 AND -20000 THEN\nRAISE;\nEND IF;\nEND;\n/\n```\n\n- Usar excepciones específicas antes que OTHERS\n\n- Registrar errores en tablas de log para auditoría\n\n- PRAGMA EXCEPTION_INIT para asociar códigos de error\n\n- RAISE para re-lanzar excepciones críticas\n\n- SQLERRM y SQLCODE para información detallada"
    },
    {
      "title": "BULK COLLECT y FORALL",
      "subtitle": null,
      "type": "content",
      "md": "### Procesamiento Masivo de Datos\n\n#### BULK COLLECT\n\n- Recupera múltiples filas en una operación\n\n- Reduce context switches SQL-PL/SQL\n\n- Mejora significativa del rendimiento\n\n- Se usa con SELECT INTO y cursores\n\n- Ideal para procesamiento de lotes\n\n✓ Con BULK COLLECT\n\n1 context switch para 1000 filas\n\n#### FORALL\n\n- Ejecuta DML para múltiples valores\n\n- Procesa colecciones completas\n\n- Optimiza INSERT, UPDATE, DELETE\n\n- Manejo de errores con SAVE EXCEPTIONS\n\n- Complemento perfecto de BULK COLLECT\n\n✓ Con FORALL\n\n1 context switch para 1000 operaciones\n\n#### ⚡ Comparación de Rendimiento\n\nMétodo Tradicional\n\n1000\n\ncontext switches\n\nBULK COLLECT + FORALL\n\n2\n\ncontext switches\n\nMejora\n\n500x\n\nmás rápido"
    },
    {
      "title": "Ejemplo Práctico - BULK COLLECT con LIMIT",
      "subtitle": null,
      "type": "code",
      "md": "### Procesamiento Masivo por Lotes\n\nEl patrón correcto para volúmenes grandes es un cursor explícito con `FETCH ... BULK COLLECT INTO ... LIMIT`: trae un lote de filas por vuelta y lo aplica con `FORALL`.\n\n```sql\nDECLARE\nCURSOR c_empleados IS\nSELECT emp_id, salario\nFROM empleados\nWHERE departamento_id = 10\nORDER BY emp_id;\n\nTYPE t_lote IS TABLE OF c_empleados%ROWTYPE;\nv_lote t_lote;\n\nc_tam_lote CONSTANT PLS_INTEGER := 500;\nv_procesados PLS_INTEGER := 0;\n\nerrores_masivos EXCEPTION;\nPRAGMA EXCEPTION_INIT(errores_masivos, -24381);\nBEGIN\nOPEN c_empleados;\nLOOP\n-- Trae como maximo c_tam_lote filas en cada vuelta\nFETCH c_empleados BULK COLLECT INTO v_lote LIMIT c_tam_lote;\nEXIT WHEN v_lote.COUNT = 0;\n\nBEGIN\nFORALL i IN 1 .. v_lote.COUNT SAVE EXCEPTIONS\nUPDATE empleados\nSET salario = v_lote(i).salario * 1.05\nWHERE emp_id = v_lote(i).emp_id;\nEXCEPTION\nWHEN errores_masivos THEN\nFOR j IN 1 .. SQL%BULK_EXCEPTIONS.COUNT LOOP\nDBMS_OUTPUT.PUT_LINE('Fila '\n|| SQL%BULK_EXCEPTIONS(j).ERROR_INDEX || ': '\n|| SQLERRM(-SQL%BULK_EXCEPTIONS(j).ERROR_CODE));\nEND LOOP;\nEND;\n\nv_procesados := v_procesados + v_lote.COUNT;\nEND LOOP;\nCLOSE c_empleados;\n\nDBMS_OUTPUT.PUT_LINE('Filas procesadas: ' || v_procesados);\nCOMMIT;\nEND;\n/\n```\n\n#### Puntos Clave:\n\n- **LIMIT:** controla la memoria; sin él, una tabla grande carga entera en la colección\n\n- **EXIT WHEN v_lote.COUNT = 0:** la salida correcta del bucle. Usar `%NOTFOUND` aquí es el error clásico: descarta el último lote, que casi nunca viene completo\n\n- **FORALL:** envía el lote completo al motor SQL en un solo viaje, en lugar de una sentencia por fila\n\n- **SAVE EXCEPTIONS:** no se detiene en el primer error; guarda los fallos para revisarlos al final\n\n- **SQL%BULK_EXCEPTIONS:** trae el índice y el código de error de cada fila que falló\n\n- **PLS_INTEGER:** más rápido que `NUMBER` para contadores"
    },
    {
      "title": "Tipos de Colecciones",
      "subtitle": null,
      "type": "content",
      "md": "### Comparación de Estructuras de Datos\n\n#### VARRAY (Variable Array)\n\n##### Características:\n\n- Tamaño máximo fijo definido en creación\n\n- Elementos almacenados en orden secuencial\n\n- Índices numéricos consecutivos (1..n)\n\n- Puede almacenarse en tablas de BD\n\nTYPE t_numeros IS\n\nVARRAY(10) OF NUMBER;\n\nMax: 10 elementos\n\n#### Nested Tables\n\n##### Características:\n\n- Tamaño dinámico, puede crecer ilimitadamente\n\n- Elementos pueden eliminarse (gaps permitidos)\n\n- Índices numéricos no necesariamente consecutivos\n\n- Puede almacenarse en tablas de BD\n\nTYPE t_nombres IS\n\nTABLE OF VARCHAR2(50);\n\nTamaño: Ilimitado\n\n#### Associative Arrays (INDEX BY)\n\n##### Características:\n\n- Índices pueden ser strings o números\n\n- Solo existe en memoria (no en BD)\n\n- Acceso muy rápido tipo hash table\n\n- Ideal para lookups y caches\n\nTYPE t_cache IS TABLE OF\n\nNUMBER INDEX BY VARCHAR2(50);\n\nÍndice: String/Number"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: FORALL con SAVE EXCEPTIONS",
      "md": "### Continuar procesando aunque algunas filas fallen\n\n```sql\nDECLARE\n  TYPE t_ids IS TABLE OF NUMBER;\n  v_ids t_ids := t_ids(1, 2, 9999, 4); -- 9999 no existe, provocará error\n\n  errores_masivos EXCEPTION;\n  PRAGMA EXCEPTION_INIT(errores_masivos, -24381);\nBEGIN\n  FORALL i IN v_ids.FIRST .. v_ids.LAST SAVE EXCEPTIONS\n    UPDATE productos\n    SET stock = stock - 1\n    WHERE cod_producto = v_ids(i);\n\nEXCEPTION\n  WHEN errores_masivos THEN\n    FOR j IN 1 .. SQL%BULK_EXCEPTIONS.COUNT LOOP\n      DBMS_OUTPUT.PUT_LINE(\n        'Error en fila ' || SQL%BULK_EXCEPTIONS(j).ERROR_INDEX ||\n        ': ' || SQLERRM(-SQL%BULK_EXCEPTIONS(j).ERROR_CODE)\n      );\n    END LOOP;\nEND;\n/\n```\n\nSin `SAVE EXCEPTIONS`, el primer error detendría todo el `FORALL`; con esta cláusula, Oracle sigue procesando el resto y guarda los errores para revisarlos al final."
    },
    {
      "type": "content",
      "title": "Errores comunes con excepciones y colecciones",
      "md": "### ⚠️ Errores frecuentes\n\n- **Capturar WHEN OTHERS sin volver a lanzar el error.** Esto \"traga\" errores silenciosamente: el programa parece terminar bien, pero en realidad falló algo y nadie se entera. Buena práctica: registrar el error y usar `RAISE` para propagarlo si no puedes resolverlo ahí.\n- **Usar una colección sin inicializarla.** Declarar un `VARRAY` o tabla anidada y usarla directamente sin el constructor (`t_tipo()`) lanza `COLLECTION_IS_NULL`.\n- **Errores de índice fuera de rango.** Acceder a `mi_coleccion(5)` cuando solo tiene 3 elementos lanza `SUBSCRIPT_OUTSIDE_LIMIT` o `NO_DATA_FOUND` según el tipo de colección.\n- **BULK COLLECT sin LIMIT en tablas grandes.** Traer millones de filas de una sola vez con `BULK COLLECT` sin `LIMIT` puede agotar la memoria (PGA) de la sesión; siempre usar `LIMIT` en lotes (por ejemplo, de 100 o 1000) para tablas grandes.\n- **Olvidar que FORALL no soporta lógica condicional dentro del bucle.** No puedes poner un `IF` dentro del `FORALL` mismo; hay que filtrar los datos antes (por ejemplo, con una colección ya filtrada)."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nEscribe un bloque que:\n\n1. Use `BULK COLLECT ... LIMIT 50` dentro de un cursor para recorrer la tabla `productos` en lotes.\n2. Por cada lote, imprima cuántos productos trajo.\n3. Se detenga cuando ya no haya más filas.\n\nPista: necesitas un `LOOP` con `EXIT WHEN coleccion.COUNT = 0` después del `FETCH`."
    },
    {
      "title": "Ejercicios Prácticos",
      "subtitle": "Aplicando excepciones y colecciones",
      "type": "exercise",
      "md": "### Desafíos de Programación Avanzada - Sistema Trilladora\n\n#### 🚨 Ejercicio 1: Sistema de Manejo de Errores para Entradas\n\nCrear un procedimiento robusto para registrar entradas de productos que maneje todas las excepciones\nposibles.\n\n- Validar datos de entrada usando TBL_ENTRADAS y TBL_PRODUCTOS\n\n- Manejar duplicados, valores inválidos, constraints de FK\n\n- Registrar todos los errores en tabla de auditoría personalizada\n\n- Implementar reintentos automáticos para errores temporales\n\n- Validar que COD_PRODUCTO existe en TBL_PRODUCTOS antes de insertar\n\n#### 📊 Ejercicio 2: Procesamiento Masivo de Inventarios\n\nImplementar actualización masiva de inventarios usando BULK COLLECT y FORALL con tablas reales.\n\n- Procesar 1000+ registros de TBL_INVENTARIOS en lotes\n\n- Actualizar INVEN_TOTAL = INVEN_PISO1 + INVEN_PISO2 automáticamente\n\n- Manejar errores individuales sin afectar el lote completo\n\n- Generar reporte con estadísticas de procesamiento\n\n- Sincronizar con TBL_HISTORICOSINVEN para auditoría\n\n#### 🗂️ Ejercicio 3: Sistema de Cache para Productos\n\nDesarrollar un sistema de cache usando Associative Arrays para datos de TBL_PRODUCTOS.\n\n- Cache de productos por COD_PRODUCTO con datos completos\n\n- Cache de precios y pesos para cálculos rápidos\n\n- Implementar TTL para invalidar cache de productos\n\n- Métricas de hit/miss ratio del cache\n\n- Integración con TBL_LOTES para información de vencimientos"
    }
  ],
  "8": [
    {
      "title": "SQL Dinámico y Seguridad",
      "subtitle": "Construcción dinámica de SQL y principios de seguridad",
      "type": "intro",
      "md": "### Módulo 1: Fundamentos de PL/SQL\n\nTécnicas avanzadas para construcción dinámica de SQL y implementación de seguridad robusta\n\n#### 🔧 SQL Dinámico\n\n- EXECUTE IMMEDIATE para flexibilidad\n\n- Construcción de consultas en runtime\n\n- DDL dinámico para administración\n\n- Cursores dinámicos con REF CURSOR\n\n#### 🔒 Seguridad\n\n- Prevención de inyección SQL\n\n- Validación con DBMS_ASSERT\n\n- Gestión de roles y privilegios\n\n- Auditoría y logging de seguridad\n\n#### ⚠️ Advertencia de Seguridad\n\nEl SQL dinámico es una herramienta poderosa pero peligrosa. Un uso incorrecto puede exponer la aplicación a\nataques de inyección SQL. Siempre validar y sanitizar las entradas."
    },
    {
      "title": "EXECUTE IMMEDIATE - Fundamentos",
      "subtitle": null,
      "type": "content",
      "md": "### Construcción Dinámica de SQL\n\n#### Casos de Uso Comunes\n\n##### DML Dinámico:\n\n- Consultas con filtros variables\n\n- Nombres de tabla/columna dinámicos\n\n- Construcción de WHERE complejos\n\n- Operaciones condicionales\n\n##### DDL Dinámico:\n\n- Creación de tablas temporales\n\n- Modificación de estructuras\n\n- Gestión de índices dinámicos\n\n- Administración automatizada\n\n#### Sintaxis y Variaciones\n\n-- Básico\n\nEXECUTE IMMEDIATE 'sql_statement';\n\n-- Con parámetros\n\nEXECUTE IMMEDIATE 'sql_statement' USING param1, param2;\n\n-- Con resultado\n\nEXECUTE IMMEDIATE 'sql_statement' INTO variable USING param;"
    },
    {
      "title": "Ejemplos de SQL Dinámico",
      "subtitle": null,
      "type": "code",
      "md": "### Implementaciones Prácticas\n\n```sql\n-- Ejemplo 1: Consulta dinámica con filtros variables\nCREATE OR REPLACE PROCEDURE buscar_empleados(\np_filtro_campo VARCHAR2,\np_filtro_valor VARCHAR2,\np_orden_campo VARCHAR2 DEFAULT 'emp_id'\n) IS\nv_sql VARCHAR2(4000);\nv_cursor SYS_REFCURSOR;\nv_empleado empleados%ROWTYPE;\nBEGIN\n-- Construir consulta dinámica\nv_sql := 'SELECT * FROM empleados WHERE ' || \nDBMS_ASSERT.SIMPLE_SQL_NAME(p_filtro_campo) || \n' LIKE :valor ORDER BY ' || \nDBMS_ASSERT.SIMPLE_SQL_NAME(p_orden_campo);\n\n-- Ejecutar con parámetros seguros\nOPEN v_cursor FOR v_sql USING '%' || p_filtro_valor || '%';\n\nLOOP\nFETCH v_cursor INTO v_empleado;\nEXIT WHEN v_cursor%NOTFOUND;\n\nDBMS_OUTPUT.PUT_LINE(v_empleado.nombre || ' - ' || v_empleado.email);\nEND LOOP;\n\nCLOSE v_cursor;\nEND;\n\n-- Ejemplo 2: DDL dinámico para administración\nCREATE OR REPLACE PROCEDURE crear_tabla_auditoria(\np_tabla_base VARCHAR2\n) IS\nv_sql VARCHAR2(4000);\nv_tabla_audit VARCHAR2(100);\nBEGIN\n-- Validar nombre de tabla\nv_tabla_base := DBMS_ASSERT.SIMPLE_SQL_NAME(p_tabla_base);\nv_tabla_audit := v_tabla_base || '_audit';\n\n-- Construir DDL dinámico\nv_sql := 'CREATE TABLE ' || v_tabla_audit || ' AS ' ||\n'SELECT *, SYSDATE as fecha_audit, USER as usuario_audit ' ||\n'FROM ' || v_tabla_base || ' WHERE 1=0';\n\nEXECUTE IMMEDIATE v_sql;\n\n-- Agregar columnas adicionales de auditoría\nEXECUTE IMMEDIATE 'ALTER TABLE ' || v_tabla_audit || \n' ADD (operacion VARCHAR2(10), ip_origen VARCHAR2(50))';\n\nDBMS_OUTPUT.PUT_LINE('Tabla de auditoría creada: ' || v_tabla_audit);\n\nEXCEPTION\nWHEN OTHERS THEN\nDBMS_OUTPUT.PUT_LINE('Error creando tabla auditoría: ' || SQLERRM);\nEND;\n\n-- Ejemplo 3: Generador de reportes dinámico\nCREATE OR REPLACE FUNCTION generar_reporte(\np_tabla VARCHAR2,\np_columnas VARCHAR2,\np_condicion VARCHAR2 DEFAULT '1=1'\n) RETURN SYS_REFCURSOR IS\nv_cursor SYS_REFCURSOR;\nv_sql VARCHAR2(4000);\nBEGIN\nv_sql := 'SELECT ' || p_columnas || \n' FROM ' || DBMS_ASSERT.SIMPLE_SQL_NAME(p_tabla) ||\n' WHERE ' || p_condicion;\n\nOPEN v_cursor FOR v_sql;\nRETURN v_cursor;\nEND;\n```\n\n#### Características Importantes:\n\n- **DBMS_ASSERT.SIMPLE_SQL_NAME:** Valida nombres de objetos SQL\n\n- **USING clause:** Parámetros seguros para evitar inyección SQL\n\n- **SYS_REFCURSOR:** Cursores dinámicos para resultados variables\n\n- **Manejo de errores:** Siempre incluir EXCEPTION para DDL dinámico"
    },
    {
      "title": "Prevención de Inyección SQL",
      "subtitle": null,
      "type": "content",
      "md": "### Seguridad en SQL Dinámico\n\n#### ❌ Código Vulnerable\n\n```sql\n-- ¡NUNCA HACER ESTO!\nv_sql := 'SELECT * FROM usuarios WHERE nombre = ''' || p_nombre || '''';\nEXECUTE IMMEDIATE v_sql;\n\n-- Entrada maliciosa: p_nombre = \"'; DROP TABLE usuarios; --\"\n-- Resultado: SELECT * FROM usuarios WHERE nombre = ''; DROP TABLE usuarios; --'\n```\n\nEsta concatenación directa permite que un atacante ejecute comandos SQL arbitrarios.\n\n#### ✅ Código Seguro\n\n```sql\n-- Usar parámetros con USING\nv_sql := 'SELECT * FROM usuarios WHERE nombre = :nombre';\nEXECUTE IMMEDIATE v_sql INTO v_resultado USING p_nombre;\n\n-- Validar nombres de objetos\nv_tabla := DBMS_ASSERT.SIMPLE_SQL_NAME(p_tabla);\nv_sql := 'SELECT COUNT(*) FROM ' || v_tabla;\n```\n\nLos parámetros se tratan como valores literales, no como código SQL ejecutable.\n\n#### 🛡️ Funciones de Validación DBMS_ASSERT\n\n##### Validación de Nombres:\n\n- SIMPLE_SQL_NAME - Nombres simples\n\n- QUALIFIED_SQL_NAME - Nombres calificados\n\n- SCHEMA_NAME - Nombres de esquema\n\n- OBJECT_NAME - Nombres de objetos\n\n##### Validación de Valores:\n\n- ENQUOTE_LITERAL - Escapar literales\n\n- ENQUOTE_NAME - Escapar nombres\n\n- NOOP - Validación personalizada"
    },
    {
      "title": "Gestión de Roles y Privilegios",
      "subtitle": null,
      "type": "content",
      "md": "### Sistema de Seguridad Oracle\n\n#### System Privileges\n\n- **CREATE SESSION:** Conectarse a la BD\n\n- **CREATE TABLE:** Crear tablas\n\n- **CREATE USER:** Crear usuarios\n\n- **ALTER SYSTEM:** Modificar sistema\n\n- **DBA:** Administración completa\n\n#### Object Privileges\n\n- **SELECT:** Leer datos\n\n- **INSERT:** Insertar registros\n\n- **UPDATE:** Modificar datos\n\n- **DELETE:** Eliminar registros\n\n- **EXECUTE:** Ejecutar procedimientos\n\n#### 🎭 Roles Predefinidos\n\n##### CONNECT\n\nPrivilegios básicos de conexión\n\n##### RESOURCE\n\nCrear objetos en esquema propio\n\n##### DBA\n\nAdministración completa\n\n#### ⚖️ Principio de Menor Privilegio\n\nOtorgar solo los privilegios mínimos necesarios\n\nUsar roles para agrupar privilegios relacionados\n\nRevisar y auditar privilegios periódicamente\n\nRevocar privilegios no utilizados"
    },
    {
      "title": "Implementación de Seguridad",
      "subtitle": null,
      "type": "code",
      "md": "### Sistema Completo de Seguridad\n\n```sql\n-- 1. Crear usuarios y roles\nCREATE USER app_user IDENTIFIED BY SecurePass123!;\nCREATE USER app_admin IDENTIFIED BY AdminPass456!;\n\n-- 2. Crear roles personalizados\nCREATE ROLE empleados_role;\nCREATE ROLE admin_role;\n\n-- 3. Asignar privilegios a roles\nGRANT SELECT, INSERT, UPDATE ON empleados TO empleados_role;\nGRANT SELECT ON departamentos TO empleados_role;\nGRANT SELECT ON salarios TO empleados_role;\n\nGRANT ALL ON empleados TO admin_role;\nGRANT ALL ON departamentos TO admin_role;\nGRANT ALL ON salarios TO admin_role;\nGRANT CREATE TABLE, DROP TABLE TO admin_role;\n\n-- 4. Asignar roles a usuarios\nGRANT CONNECT, empleados_role TO app_user;\nGRANT CONNECT, admin_role TO app_admin;\n\n-- 5. Procedimiento seguro con AUTHID DEFINER\nCREATE OR REPLACE PROCEDURE actualizar_salario_seguro(\np_emp_id NUMBER,\np_nuevo_salario NUMBER,\np_usuario_solicitante VARCHAR2\n) AUTHID DEFINER -- Ejecuta con privilegios del propietario\nIS\nv_salario_actual NUMBER;\nv_es_admin BOOLEAN := FALSE;\nv_ip_cliente VARCHAR2(50);\nBEGIN\n-- Obtener IP del cliente para auditoría\nSELECT SYS_CONTEXT('USERENV', 'IP_ADDRESS') INTO v_ip_cliente FROM DUAL;\n\n-- Verificar si el usuario es administrador\nSELECT COUNT(*) INTO v_count\nFROM user_role_privs \nWHERE granted_role = 'ADMIN_ROLE' \nAND username = p_usuario_solicitante;\n\nv_es_admin := (v_count > 0);\n\n-- Validaciones de negocio\nIF p_nuevo_salario v_salario_actual * 1.20 THEN\nRAISE_APPLICATION_ERROR(-20002, \n'Incremento máximo permitido: 20%. Contacte al administrador.');\nEND IF;\n\n-- Actualizar salario\nUPDATE empleados \nSET salario = p_nuevo_salario,\nfecha_modificacion = SYSDATE,\nmodificado_por = p_usuario_solicitante\nWHERE emp_id = p_emp_id;\n\n-- Auditoría de la operación\nINSERT INTO auditoria_salarios (\nemp_id, salario_anterior, salario_nuevo, \nusuario, fecha, ip_origen, tipo_operacion\n) VALUES (\np_emp_id, v_salario_actual, p_nuevo_salario,\np_usuario_solicitante, SYSDATE, v_ip_cliente, 'UPDATE_SALARY'\n);\n\nCOMMIT;\n\nDBMS_OUTPUT.PUT_LINE('Salario actualizado exitosamente');\n\nEXCEPTION\nWHEN NO_DATA_FOUND THEN\nRAISE_APPLICATION_ERROR(-20003, 'Empleado no encontrado');\nWHEN OTHERS THEN\nROLLBACK;\n-- Log del error\nINSERT INTO error_log (fecha, usuario, error_code, mensaje, ip_origen)\nVALUES (SYSDATE, p_usuario_solicitante, SQLCODE, SQLERRM, v_ip_cliente);\nCOMMIT;\nRAISE;\nEND;\n\n-- 6. Función para validar permisos\nCREATE OR REPLACE FUNCTION tiene_permiso(\np_usuario VARCHAR2,\np_objeto VARCHAR2,\np_privilegio VARCHAR2\n) RETURN BOOLEAN IS\nv_count NUMBER;\nBEGIN\nSELECT COUNT(*) INTO v_count\nFROM (\n-- Privilegios directos\nSELECT 1 FROM user_tab_privs \nWHERE grantee = p_usuario \nAND table_name = p_objeto \nAND privilege = p_privilegio\n\nUNION\n\n-- Privilegios a través de roles\nSELECT 1 FROM user_role_privs urp\nJOIN role_tab_privs rtp ON urp.granted_role = rtp.role\nWHERE urp.username = p_usuario\nAND rtp.table_name = p_objeto\nAND rtp.privilege = p_privilegio\n);\n\nRETURN (v_count > 0);\nEND;\n```\n\n#### 🔐 Características de Seguridad:\n\n- **AUTHID DEFINER:** Ejecuta con privilegios del propietario del procedimiento\n\n- **Validación de roles:** Verifica permisos antes de operaciones críticas\n\n- **Auditoría completa:** Registra todas las operaciones con IP y usuario\n\n- **Validaciones de negocio:** Reglas específicas según el tipo de usuario\n\n- **Manejo de errores:** Log de errores para análisis de seguridad"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: mismo requerimiento, seguro vs. inseguro",
      "md": "### ❌ Inseguro: concatenación directa\n\n```sql\nDECLARE\n  v_nombre VARCHAR2(100) := :p_nombre_usuario; -- viene de un formulario\n  v_sql VARCHAR2(4000);\nBEGIN\n  v_sql := 'SELECT COUNT(*) FROM usuarios WHERE nombre = ''' || v_nombre || '''';\n  -- Si v_nombre = \"x'' OR ''1''=''1\", la condición queda siempre verdadera\n  EXECUTE IMMEDIATE v_sql;\nEND;\n/\n```\n\n### ✅ Seguro: variables bind\n\n```sql\nDECLARE\n  v_nombre VARCHAR2(100) := :p_nombre_usuario;\n  v_total  NUMBER;\nBEGIN\n  EXECUTE IMMEDIATE\n    'SELECT COUNT(*) FROM usuarios WHERE nombre = :1'\n    INTO v_total\n    USING v_nombre;\n  DBMS_OUTPUT.PUT_LINE(v_total);\nEND;\n/\n```\n\nCon `USING`, el valor se pasa como dato, nunca como parte del texto SQL, por lo que no puede alterar la estructura de la consulta."
    },
    {
      "type": "content",
      "title": "Errores comunes con SQL dinámico y seguridad",
      "md": "### ⚠️ Errores frecuentes\n\n- **Concatenar entradas de usuario en SQL dinámico.** Es la causa número uno de inyección SQL; siempre que el valor venga de fuera (formulario, parámetro), debe ir como variable bind (`USING`), nunca concatenado.\n- **Concatenar nombres de tablas/columnas sin validarlos.** Cuando el nombre de un objeto (no un valor) debe ser dinámico, no se puede usar bind variables (Oracle no lo permite para identificadores); ahí se debe validar con `DBMS_ASSERT` o una lista blanca de valores permitidos.\n- **Otorgar privilegios más amplios de lo necesario.** Usar `GRANT ALL` o dar el rol `DBA` a un usuario de aplicación viola el principio de mínimo privilegio.\n- **Olvidar revocar permisos temporales.** Si se otorga un privilegio para una tarea puntual, debe revocarse después; permisos \"temporales\" que nadie revoca se acumulan como riesgo de seguridad.\n- **No probar el SQL dinámico generado antes de ejecutarlo.** Un error de comillas o de concatenación en SQL dinámico solo se detecta en tiempo de ejecución, no de compilación — conviene imprimir el SQL generado durante las pruebas."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nEste bloque es vulnerable a inyección SQL. Reescríbelo usando variables bind:\n\n```sql\nDECLARE\n  v_categoria VARCHAR2(50) := :p_categoria;\n  v_sql VARCHAR2(4000);\nBEGIN\n  v_sql := 'SELECT COUNT(*) FROM productos WHERE categoria = ''' || v_categoria || '''';\n  EXECUTE IMMEDIATE v_sql;\nEND;\n/\n```\n\nIdentifica exactamente qué parte del código es la vulnerabilidad antes de corregirlo."
    },
    {
      "title": "Ejercicios Prácticos",
      "subtitle": "Aplicando SQL dinámico y seguridad",
      "type": "exercise",
      "md": "### Desafíos de Seguridad y SQL Dinámico - Sistema Trilladora\n\n#### 🔧 Ejercicio 1: Generador de Reportes Dinámico para Trilladora\n\nCrear un sistema de reportes que permita consultas flexibles pero seguras sobre las tablas de trilladora.\n\n- Permitir selección dinámica de columnas de TBL_PRODUCTOS, TBL_INVENTARIOS, TBL_LOTES\n\n- Implementar filtros variables por fechas, códigos, estados\n\n- Validar todos los nombres de tablas y columnas con DBMS_ASSERT\n\n- Usar parámetros seguros para valores de filtro\n\n- Incluir joins dinámicos entre tablas relacionadas\n\n#### 🛡️ Ejercicio 2: Sistema de Roles para Operaciones de Trilladora\n\nImplementar un sistema de permisos detallado para diferentes tipos de usuarios de la trilladora.\n\n- Crear roles para: Operador, Supervisor, Gerente, Administrador\n\n- Definir permisos específicos sobre TBL_ENTRADAS, TBL_FACTURAS, TBL_ORDENPEDIDOS\n\n- Implementar permisos por cliente (NIT_CLIENTE) y vendedor\n\n- Crear procedimientos que validen permisos antes de operaciones críticas\n\n- Sistema de auditoría para cambios en datos sensibles\n\n#### 🔍 Ejercicio 3: Validador de Seguridad para Datos de Trilladora\n\nDesarrollar herramientas para detectar y prevenir vulnerabilidades en operaciones de trilladora.\n\n- Función para detectar patrones sospechosos en campos de texto (OBSERVACIONES, REMESA)\n\n- Validador de integridad referencial entre tablas relacionadas\n\n- Monitor de operaciones masivas sospechosas en inventarios\n\n- Generador de reportes de inconsistencias en datos\n\n- Sistema de alertas para cambios críticos en facturas y pedidos"
    }
  ],
  "9": [
    {
      "title": "ACLs y Vistas Materializadas",
      "subtitle": "Seguridad de red y optimización con vistas materializadas",
      "type": "intro",
      "md": "### Módulo 1: Fundamentos de PL/SQL\n\nControl de acceso a recursos de red y optimización avanzada con vistas materializadas\n\n#### 🌐 Access Control Lists\n\n- Control de acceso a recursos de red\n\n- Restricción de conexiones HTTP/HTTPS\n\n- Configuración de hosts permitidos\n\n- Seguridad a nivel de base de datos\n\n#### 📊 Vistas Materializadas\n\n- Almacenamiento físico de consultas\n\n- Mejora significativa del rendimiento\n\n- Refresco automático y manual\n\n- Optimización para reportes y análisis\n\n#### 🎯 Objetivos de la Semana\n\nImplementar controles de seguridad de red robustos y optimizar el rendimiento de consultas complejas\nmediante vistas materializadas con diferentes estrategias de refresco."
    },
    {
      "title": "Access Control Lists (ACLs)",
      "subtitle": null,
      "type": "content",
      "md": "### Control de Acceso a Recursos de Red\n\n#### ¿Qué son las ACLs?\n\nLas Access Control Lists permiten controlar qué usuarios de la base de datos pueden acceder a recursos de\nred externos desde PL/SQL, como servicios web, servidores FTP, o envío de emails.\n\n##### Protocolos Soportados:\n\n- HTTP/HTTPS (UTL_HTTP)\n\n- FTP (UTL_FTP)\n\n- SMTP (UTL_SMTP)\n\n- TCP (UTL_TCP)\n\n##### Beneficios de Seguridad:\n\n- Previene accesos no autorizados\n\n- Control granular por usuario\n\n- Restricción por host y puerto\n\n- Auditoría de accesos de red\n\n#### Componentes de una ACL\n\n1\n\n**Principal:** Usuario o rol que recibe el permiso\n\n2\n\n**Privilege:** Tipo de acceso (connect, resolve)\n\n3\n\n**Host:** Servidor de destino (dominio o IP)\n\n4\n\n**Port Range:** Rango de puertos permitidos"
    },
    {
      "title": "Configuración de ACLs",
      "subtitle": null,
      "type": "code",
      "md": "### Implementación Práctica de ACLs\n\n```sql\n-- 1. Crear ACL para acceso a servicios web\nBEGIN\n-- Crear la ACL\nDBMS_NETWORK_ACL_ADMIN.CREATE_ACL(\nacl => 'web_services_acl.xml',\ndescription => 'ACL para acceso a servicios web externos',\nprincipal => 'APP_USER',\nis_grant => TRUE,\nprivilege => 'connect'\n);\n\n-- Agregar privilegio de resolución DNS\nDBMS_NETWORK_ACL_ADMIN.ADD_PRIVILEGE(\nacl => 'web_services_acl.xml',\nprincipal => 'APP_USER',\nis_grant => TRUE,\nprivilege => 'resolve'\n);\n\nCOMMIT;\nEND;\n/\n\n-- 2. Asignar ACL a hosts específicos\nBEGIN\n-- Permitir acceso a API externa\nDBMS_NETWORK_ACL_ADMIN.ASSIGN_ACL(\nacl => 'web_services_acl.xml',\nhost => 'api.ejemplo.com',\nlower_port => 80,\nupper_port => 443\n);\n\n-- Permitir acceso a servicios de Google\nDBMS_NETWORK_ACL_ADMIN.ASSIGN_ACL(\nacl => 'web_services_acl.xml',\nhost => '*.googleapis.com',\nlower_port => 443,\nupper_port => 443\n);\n\n-- Permitir acceso a servidor SMTP interno\nDBMS_NETWORK_ACL_ADMIN.ASSIGN_ACL(\nacl => 'web_services_acl.xml',\nhost => '192.168.1.100',\nlower_port => 25,\nupper_port => 587\n);\n\nCOMMIT;\nEND;\n/\n\n-- 3. Procedimiento para consumir API web con ACL\nCREATE OR REPLACE PROCEDURE consultar_api_externa(\np_endpoint VARCHAR2,\np_parametros VARCHAR2 DEFAULT NULL\n) IS\nv_request UTL_HTTP.REQ;\nv_response UTL_HTTP.RESP;\nv_data VARCHAR2(32767);\nv_url VARCHAR2(4000);\nBEGIN\n-- Construir URL completa\nv_url := 'https://api.ejemplo.com' || p_endpoint;\nIF p_parametros IS NOT NULL THEN\nv_url := v_url || '?' || p_parametros;\nEND IF;\n\n-- Configurar request HTTP\nv_request := UTL_HTTP.BEGIN_REQUEST(\nurl => v_url,\nmethod => 'GET'\n);\n\n-- Agregar headers necesarios\nUTL_HTTP.SET_HEADER(v_request, 'User-Agent', 'Oracle-PL/SQL-Client');\nUTL_HTTP.SET_HEADER(v_request, 'Accept', 'application/json');\n\n-- Obtener respuesta\nv_response := UTL_HTTP.GET_RESPONSE(v_request);\n\n-- Leer datos de respuesta\nBEGIN\nLOOP\nUTL_HTTP.READ_TEXT(v_response, v_data, 32767);\nDBMS_OUTPUT.PUT_LINE(v_data);\nEND LOOP;\nEXCEPTION\nWHEN UTL_HTTP.END_OF_BODY THEN\nNULL; -- Fin normal de la respuesta\nEND;\n\n-- Cerrar conexión\nUTL_HTTP.END_RESPONSE(v_response);\n\nDBMS_OUTPUT.PUT_LINE('Consulta API completada exitosamente');\n\nEXCEPTION\nWHEN UTL_HTTP.REQUEST_FAILED THEN\nDBMS_OUTPUT.PUT_LINE('Error en request HTTP: ' || SQLERRM);\nUTL_HTTP.END_RESPONSE(v_response);\nWHEN OTHERS THEN\nDBMS_OUTPUT.PUT_LINE('Error general: ' || SQLERRM);\nIF v_response.status_code IS NOT NULL THEN\nUTL_HTTP.END_RESPONSE(v_response);\nEND IF;\nEND;\n/\n\n-- 4. Consultar ACLs configuradas\nSELECT \nacl,\nprincipal,\nprivilege,\nis_grant,\nstart_date,\nend_date\nFROM dba_network_acl_privileges\nWHERE acl LIKE '%web_services%'\nORDER BY acl, principal;\n\n-- 5. Ver asignaciones de ACL a hosts\nSELECT \nacl,\nhost,\nlower_port,\nupper_port\nFROM dba_network_acls\nWHERE acl LIKE '%web_services%'\nORDER BY host;\n```\n\n#### Puntos Importantes:\n\n- **connect:** Permite establecer conexiones de red\n\n- **resolve:** Permite resolución de nombres DNS\n\n- **Wildcards:** Se pueden usar patrones como *.dominio.com\n\n- **Rangos de puertos:** Especificar puertos exactos o rangos\n\n- **Auditoría:** Todas las conexiones pueden ser auditadas"
    },
    {
      "title": "Vistas Materializadas - Conceptos",
      "subtitle": null,
      "type": "content",
      "md": "### Optimización con Vistas Materializadas\n\n#### ¿Qué son las Vistas Materializadas?\n\nLas vistas materializadas almacenan físicamente el resultado de una consulta compleja, mejorando\ndramáticamente el rendimiento de consultas repetitivas y reportes.\n\n##### Ventajas:\n\n- Consultas instantáneas\n\n- Reducción de carga en tablas base\n\n- Ideal para reportes y análisis\n\n- Soporte para agregaciones complejas\n\n##### Consideraciones:\n\n- Requiere espacio de almacenamiento\n\n- Datos pueden estar desactualizados\n\n- Costo de mantenimiento/refresco\n\n- Complejidad de gestión\n\n#### Tipos de Refresco\n\nC\n\n**COMPLETE:** Regenera completamente la vista desde cero.\nMás lento pero siempre funciona\n\nF\n\n**FAST:** Solo actualiza los cambios incrementales.\nMuy rápido pero requiere materialized view logs\n\n?\n\n**FORCE:** Intenta FAST, si no puede usa COMPLETE.\nOpción más flexible y recomendada\n\n#### Estrategias de Refresco\n\n##### ON DEMAND:\n\n- Refresco manual cuando sea necesario\n\n- Control total sobre el timing\n\n- Ideal para datos que cambian poco\n\n##### ON COMMIT:\n\n- Refresco automático al hacer COMMIT\n\n- Datos siempre actualizados\n\n- Impacto en rendimiento de DML"
    },
    {
      "title": "Creación de Vistas Materializadas",
      "subtitle": null,
      "type": "code",
      "md": "### Implementación Práctica\n\n```sql\n-- 1. Vista materializada básica para reportes de ventas\nCREATE MATERIALIZED VIEW mv_ventas_mensuales\nBUILD IMMEDIATE\nREFRESH COMPLETE ON DEMAND\nENABLE QUERY REWRITE\nAS\nSELECT \nEXTRACT(YEAR FROM fecha_venta) AS año,\nEXTRACT(MONTH FROM fecha_venta) AS mes,\nd.nombre_departamento,\nCOUNT(*) AS total_ventas,\nSUM(v.monto) AS monto_total,\nAVG(v.monto) AS promedio_venta,\nMIN(v.monto) AS venta_minima,\nMAX(v.monto) AS venta_maxima\nFROM ventas v\nJOIN empleados e ON v.vendedor_id = e.emp_id\nJOIN departamentos d ON e.departamento_id = d.id_departamento\nGROUP BY \nEXTRACT(YEAR FROM fecha_venta),\nEXTRACT(MONTH FROM fecha_venta),\nd.nombre_departamento;\n\n-- 2. Crear materialized view log para refresco FAST\nCREATE MATERIALIZED VIEW LOG ON ventas\nWITH ROWID, SEQUENCE (fecha_venta, monto, vendedor_id)\nINCLUDING NEW VALUES;\n\nCREATE MATERIALIZED VIEW LOG ON empleados\nWITH ROWID, SEQUENCE (emp_id, departamento_id)\nINCLUDING NEW VALUES;\n\n-- 3. Vista materializada con refresco FAST\nCREATE MATERIALIZED VIEW mv_inventario_actual\nBUILD IMMEDIATE\nREFRESH FAST ON COMMIT\nENABLE QUERY REWRITE\nAS\nSELECT \np.id_producto,\np.nombre_producto,\np.categoria,\np.precio_unitario,\nCOALESCE(SUM(i.cantidad_entrada), 0) - \nCOALESCE(SUM(i.cantidad_salida), 0) AS stock_actual,\nMAX(i.fecha_movimiento) AS ultima_actualizacion\nFROM productos p\nLEFT JOIN inventario_movimientos i ON p.id_producto = i.id_producto\nGROUP BY p.id_producto, p.nombre_producto, p.categoria, p.precio_unitario;\n\n-- 4. Vista materializada para análisis de rendimiento de empleados\nCREATE MATERIALIZED VIEW mv_rendimiento_empleados\nBUILD IMMEDIATE\nREFRESH COMPLETE\nSTART WITH SYSDATE\nNEXT SYSDATE + 1 -- Refresco diario automático\nAS\nSELECT \ne.emp_id,\ne.nombre,\ne.apellido,\nd.nombre_departamento,\nCOUNT(v.id_venta) AS total_ventas_mes,\nSUM(v.monto) AS monto_ventas_mes,\nAVG(v.monto) AS promedio_venta,\nRANK() OVER (\nPARTITION BY d.id_departamento \nORDER BY SUM(v.monto) DESC\n) AS ranking_departamento,\nCASE \nWHEN SUM(v.monto) >= 50000 THEN 'EXCELENTE'\nWHEN SUM(v.monto) >= 30000 THEN 'BUENO'\nWHEN SUM(v.monto) >= 15000 THEN 'REGULAR'\nELSE 'NECESITA_MEJORA'\nEND AS categoria_rendimiento\nFROM empleados e\nJOIN departamentos d ON e.departamento_id = d.id_departamento\nLEFT JOIN ventas v ON e.emp_id = v.vendedor_id\nAND v.fecha_venta >= TRUNC(SYSDATE, 'MM') -- Solo mes actual\nGROUP BY e.emp_id, e.nombre, e.apellido, d.id_departamento, d.nombre_departamento;\n\n-- 5. Procedimiento para gestión de refrescos\nCREATE OR REPLACE PROCEDURE gestionar_refrescos_mv IS\nv_start_time TIMESTAMP;\nv_end_time TIMESTAMP;\nv_duration INTERVAL DAY TO SECOND;\nBEGIN\nv_start_time := SYSTIMESTAMP;\n\n-- Refresco de vista de ventas mensuales\nDBMS_OUTPUT.PUT_LINE('Iniciando refresco de mv_ventas_mensuales...');\nDBMS_MVIEW.REFRESH('mv_ventas_mensuales', 'C');\n\n-- Refresco de vista de rendimiento (solo si es necesario)\nDBMS_OUTPUT.PUT_LINE('Iniciando refresco de mv_rendimiento_empleados...');\nDBMS_MVIEW.REFRESH('mv_rendimiento_empleados', 'F');\n\nv_end_time := SYSTIMESTAMP;\nv_duration := v_end_time - v_start_time;\n\n-- Log del proceso\nINSERT INTO mv_refresh_log (\nfecha_refresco, \nduracion_segundos, \nestado,\nobservaciones\n) VALUES (\nSYSDATE,\nEXTRACT(SECOND FROM v_duration) + \nEXTRACT(MINUTE FROM v_duration) * 60 +\nEXTRACT(HOUR FROM v_duration) * 3600,\n'COMPLETADO',\n'Refresco automático exitoso'\n);\n\nCOMMIT;\n\nDBMS_OUTPUT.PUT_LINE('Refresco completado en ' || \nTO_CHAR(v_duration));\n\nEXCEPTION\nWHEN OTHERS THEN\nROLLBACK;\nINSERT INTO mv_refresh_log (\nfecha_refresco, \nestado,\nobservaciones\n) VALUES (\nSYSDATE,\n'ERROR',\n'Error en refresco: ' || SQLERRM\n);\nCOMMIT;\nRAISE;\nEND;\n/\n```\n\n#### Características Avanzadas:\n\n- **BUILD IMMEDIATE:** Construye la vista inmediatamente\n\n- **ENABLE QUERY REWRITE:** Oracle puede usar la vista automáticamente\n\n- **START WITH/NEXT:** Programación automática de refrescos\n\n- **Materialized View Logs:** Necesarios para refresco FAST\n\n- **Gestión de errores:** Log de refrescos para monitoreo"
    },
    {
      "title": "Gestión y Monitoreo",
      "subtitle": null,
      "type": "content",
      "md": "### Administración de Vistas Materializadas\n\n#### Consultas de Monitoreo\n\n```sql\n-- Estado de vistas materializadas\nSELECT \nmview_name,\nrefresh_mode,\nrefresh_method,\nbuild_mode,\nlast_refresh_date,\nstaleness,\ncompile_state\nFROM user_mviews\nORDER BY last_refresh_date DESC;\n\n-- Logs de refresco\nSELECT \nlog_owner,\nlog_table,\nrowids,\nprimary_key,\nobject_id,\nfilter_columns\nFROM user_mview_logs;\n```\n\n#### Mejores Prácticas\n\n##### Diseño:\n\n- Identificar consultas costosas repetitivas\n\n- Usar agregaciones cuando sea posible\n\n- Considerar particionamiento para grandes volúmenes\n\n- Evaluar trade-off espacio vs rendimiento\n\n##### Mantenimiento:\n\n- Programar refrescos en horarios de baja carga\n\n- Monitorear espacio de almacenamiento\n\n- Revisar estadísticas de uso regularmente\n\n- Eliminar vistas no utilizadas\n\n#### Casos de Uso Ideales\n\n**Reportes Ejecutivos:** Dashboards con métricas agregadas que se consultan frecuentemente\n\n**Análisis Histórico:** Datos que cambian poco pero se consultan intensivamente\n\n**Data Warehousing:** Agregaciones complejas para análisis de negocio\n\n**Consultas Costosas:** JOINs complejos entre múltiples tablas grandes"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: vista materializada con refresco rápido",
      "md": "### El paso que muchos olvidan: el materialized view log\n\n```sql\n-- 1. Sin este log, el refresco FAST no es posible\nCREATE MATERIALIZED VIEW LOG ON ventas\n  WITH ROWID (id_venta, monto, fecha_venta)\n  INCLUDING NEW VALUES;\n\n-- 2. Ahora sí se puede crear con REFRESH FAST\nCREATE MATERIALIZED VIEW mv_resumen_ventas\n  REFRESH FAST ON DEMAND\nAS\n  SELECT fecha_venta, SUM(monto) AS total_dia\n  FROM ventas\n  GROUP BY fecha_venta;\n\n-- 3. Ejecutar el refresco manualmente cuando se necesite\nBEGIN\n  DBMS_MVIEW.REFRESH('MV_RESUMEN_VENTAS', 'F'); -- 'F' = fast\nEND;\n/\n\n-- 4. Verificar el estado del refresco\nSELECT mview_name, staleness, last_refresh_date\nFROM user_mviews\nWHERE mview_name = 'MV_RESUMEN_VENTAS';\n```\n\nSin el `MATERIALIZED VIEW LOG`, Oracle solo permite `REFRESH COMPLETE` (recalcular todo desde cero), que es mucho más costoso en tablas grandes."
    },
    {
      "type": "content",
      "title": "Errores comunes con ACLs y vistas materializadas",
      "md": "### ⚠️ Errores frecuentes\n\n- **Crear una vista materializada con REFRESH FAST sin el log correspondiente.** Oracle lanzará un error indicando que no puede hacer refresco rápido sin un `MATERIALIZED VIEW LOG` sobre la tabla base.\n- **Olvidar programar el refresco.** Una vista materializada con `ON DEMAND` no se actualiza sola; si nadie llama a `DBMS_MVIEW.REFRESH` (manualmente o con un job), los datos quedan obsoletos (\"stale\") indefinidamente.\n- **Configurar una ACL de red demasiado permisiva.** Dar acceso a todos los hosts (`*`) cuando solo se necesita conectar a un servicio específico amplía innecesariamente la superficie de ataque.\n- **No probar la ACL antes de usarla en producción.** Un paquete que use `UTL_HTTP` o `UTL_SMTP` fallará con errores de permisos de red si la ACL no está bien configurada; conviene probarlo en un ambiente controlado primero.\n- **Confundir REFRESH COMPLETE con REFRESH FAST en el diseño.** Elegir COMPLETE en una tabla de millones de filas que cambia constantemente puede generar una carga de procesamiento innecesaria en cada refresco."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nDada la tabla:\n\n```sql\nCREATE TABLE inventario_movimientos (\n  id_movimiento NUMBER PRIMARY KEY,\n  cod_producto  NUMBER,\n  cantidad      NUMBER,\n  fecha_mov     DATE\n);\n```\n\nEscribe:\n1. El `CREATE MATERIALIZED VIEW LOG` necesario para permitir refresco rápido.\n2. Una vista materializada `mv_stock_por_producto` que sume la cantidad movida por producto, con `REFRESH FAST ON DEMAND`."
    },
    {
      "title": "Ejercicios Prácticos",
      "subtitle": "Aplicando ACLs y vistas materializadas",
      "type": "exercise",
      "md": "### Desafíos de Optimización y Seguridad - Sistema Trilladora\n\n#### 🌐 Ejercicio 1: Sistema de Integración Segura para Trilladora\n\nImplementar un sistema que consuma APIs externas de forma segura para operaciones de trilladora.\n\n- Configurar ACLs para servicios de precios de commodities y clima\n\n- Crear procedimientos para consultar APIs de transportadores externos\n\n- Implementar integración con sistemas de facturación electrónica\n\n- Sistema de notificaciones automáticas a clientes vía APIs\n\n- Log de todas las llamadas externas para auditoría de trilladora\n\n#### 📊 Ejercicio 2: Dashboard de Métricas de Trilladora\n\nCrear un sistema de reportes optimizado con vistas materializadas usando tablas reales.\n\n- Vista materializada para métricas de entradas por día/mes usando TBL_ENTRADAS\n\n- Vista para análisis de inventario con alertas de stock bajo desde TBL_INVENTARIOS\n\n- Vista para rendimiento de vendedores con rankings desde TBL_VENDEDORES\n\n- Vista para análisis de vencimientos de lotes desde TBL_LOTES\n\n- Sistema de refresco inteligente basado en volumen de operaciones\n\n#### ⚡ Ejercicio 3: Optimización de Consultas de Trilladora\n\nIdentificar y optimizar las consultas más costosas del sistema de trilladora.\n\n- Crear vista materializada para reportes complejos de TBL_FACTURAS con TBL_ORDENPEDIDOS\n\n- Vista para análisis histórico de inventarios desde TBL_HISTORICOSINVEN\n\n- Implementar diferentes estrategias de refresco según criticidad de datos\n\n- Medir mejoras de rendimiento en consultas de clientes y productos\n\n- Documentar casos de uso específicos para operaciones de trilladora"
    }
  ],
  "10": [
    {
      "title": "Primera Entrega del Proyecto",
      "subtitle": "Módulo 3: Proyecto Final - Semana 10",
      "type": "intro",
      "md": "## Primera Entrega del Proyecto\n\nSistema Bancario: MER, scripts DDL y pruebas iniciales\n\n### Qué se entrega esta semana\n\nEste es el primer hito formal del proyecto y vale el 50% del avance. El equipo presenta la base de datos ya construida y funcionando, no un diseño en papel.\n\n- **MER definitivo** del sistema bancario, con las entidades, atributos y cardinalidades validadas\n\n- **Scripts DDL ejecutables** que crean las tablas de clientes, cuentas y transacciones con sus claves y restricciones\n\n- **Datos de prueba** coherentes que permitan verificar las relaciones\n\n- **Consultas de verificación** que demuestren que la estructura soporta las operaciones básicas\n\n### Por qué el orden importa\n\nLa lógica PL/SQL de la segunda entrega se construye encima de esta estructura. Un MER con un error de cardinalidad o una clave mal elegida obliga a rehacer los procedimientos después, así que esta entrega se valida a fondo antes de seguir."
    },
    {
      "title": "Objetivos de la Primera Entrega",
      "subtitle": null,
      "type": "content",
      "md": "### Avance del Proyecto: 50%\n\n- **1.** Presentar el MER del sistema bancario con todas las entidades\n\n- **2.** Entregar scripts DDL para tablas bancarias funcionales\n\n- **3.** Implementar 50% de los paquetes PL/SQL (gestion_clientes_pkg y gestion_cuentas_pkg)\n\n- **4.** Demostrar inserción de datos de clientes y cuentas de prueba\n\n- **5.** Realizar pruebas de integridad referencial bancaria\n\n- **6.** Documentar decisiones de diseño del sistema bancario"
    },
    {
      "title": "Script DDL - Creación de Tablas Bancarias",
      "subtitle": null,
      "type": "code",
      "md": "Ejemplo de script DDL para sistema bancario:\n\n`-- Script de creación de tablas para sistema bancario\n-- Tabla de clientes\nCREATE TABLE Cliente (\ncliente_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,\nnombre_completo VARCHAR2(200) NOT NULL,\nidentificacion VARCHAR2(20) UNIQUE NOT NULL,\ndireccion VARCHAR2(300),\ntelefono VARCHAR2(20),\nemail VARCHAR2(100),\nfecha_registro DATE DEFAULT SYSDATE,\nestado VARCHAR2(20) DEFAULT 'ACTIVO',\nCONSTRAINT ck_cliente_estado CHECK (estado IN ('ACTIVO', 'INACTIVO'))\n);\n\n-- Tabla de cuentas\nCREATE TABLE Cuenta (\nnumero_cuenta NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,\ncliente_id NUMBER NOT NULL,\ntipo_cuenta VARCHAR2(20) NOT NULL,\nsaldo NUMBER(15,2) DEFAULT 0,\nestado VARCHAR2(20) DEFAULT 'activa',\nfecha_apertura DATE DEFAULT SYSDATE,\nCONSTRAINT fk_cuenta_cliente FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id),\nCONSTRAINT ck_cuenta_tipo CHECK (tipo_cuenta IN ('AHORROS', 'CORRIENTE', 'CDT')),\nCONSTRAINT ck_cuenta_estado CHECK (estado IN ('activa', 'inactiva', 'bloqueada'))\n);`"
    },
    {
      "title": "Paquetes PL/SQL - Primera Entrega (50%)",
      "subtitle": null,
      "type": "code",
      "md": "Implementación de los primeros paquetes PL/SQL del sistema bancario:\n\n`-- Paquete de Gestión de Clientes\nCREATE OR REPLACE PACKAGE gestion_clientes_pkg AS\nPROCEDURE crear_cliente(\np_nombre_completo VARCHAR2,\np_identificacion VARCHAR2,\np_direccion VARCHAR2,\np_telefono VARCHAR2 DEFAULT NULL,\np_email VARCHAR2 DEFAULT NULL\n);\n\nFUNCTION validar_cliente(p_cliente_id NUMBER) RETURN BOOLEAN;\nPROCEDURE actualizar_cliente(p_cliente_id NUMBER, p_direccion VARCHAR2);\nEND gestion_clientes_pkg;\n\n-- Paquete de Gestión de Cuentas\nCREATE OR REPLACE PACKAGE gestion_cuentas_pkg AS\nPROCEDURE crear_cuenta(\np_cliente_id NUMBER,\np_tipo_cuenta VARCHAR2,\np_saldo_inicial NUMBER DEFAULT 0\n);\n\nPROCEDURE cambiar_estado_cuenta(\np_numero_cuenta NUMBER,\np_nuevo_estado VARCHAR2\n);\n\nFUNCTION consultar_saldo(p_numero_cuenta NUMBER) RETURN NUMBER;\nEND gestion_cuentas_pkg;`"
    },
    {
      "title": "Criterios de Evaluación",
      "subtitle": null,
      "type": "content",
      "md": "### Cómo se reparte la nota de esta entrega\n\n- **Completitud del MER — 25%:** todas las entidades del dominio bancario, con cardinalidades correctas y sin atributos huérfanos\n\n- **Scripts DDL — 20%:** ejecutan de principio a fin sin errores, con claves primarias, foráneas y restricciones `CHECK` declaradas\n\n- **Paquetes PL/SQL al 50% — 25%:** las especificaciones definidas y al menos la mitad de los cuerpos implementados\n\n- **Datos de prueba — 15%:** volumen suficiente y valores coherentes para probar los casos límite, no tres filas de ejemplo\n\n- **Documentación — 15%:** decisiones de diseño justificadas, en especial dónde se optó por restricción y dónde por lógica PL/SQL\n\n### Qué hace perder puntos\n\n- Un DDL que solo corre la primera vez porque no contempla que los objetos ya existan\n\n- Saldos declarados como `NUMBER` sin escala, que acumulan errores de redondeo en dinero\n\n- Datos de prueba que no ejercitan ninguna restricción: si nada falla al insertar, las restricciones no están probadas"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: DDL de referencia para el sistema bancario",
      "md": "### Un punto de partida (no la solución completa del proyecto)\n\n```sql\nCREATE TABLE clientes (\n  id_cliente   NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  nombre       VARCHAR2(100) NOT NULL,\n  documento    VARCHAR2(20) NOT NULL UNIQUE,\n  fecha_alta   DATE DEFAULT SYSDATE\n);\n\nCREATE TABLE cuentas (\n  numero_cuenta  NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  id_cliente     NUMBER NOT NULL REFERENCES clientes(id_cliente),\n  tipo_cuenta    VARCHAR2(20) NOT NULL CHECK (tipo_cuenta IN ('AHORROS','CORRIENTE')),\n  saldo          NUMBER(14,2) DEFAULT 0 CHECK (saldo >= 0),\n  fecha_apertura DATE DEFAULT SYSDATE\n);\n\nCREATE INDEX idx_cuentas_cliente ON cuentas(id_cliente);\n```\n\nNota el `CHECK (saldo >= 0)`: en un sistema bancario real, esta restricción a nivel de base de datos es una segunda línea de defensa además de la validación que haga el PL/SQL."
    },
    {
      "type": "content",
      "title": "Qué revisa el profesor en esta entrega",
      "md": "### ✅ Lista de verificación antes de entregar\n\n- **Claves primarias y foráneas** definidas en todas las tablas relevantes (no solo declaradas en el papel del MER).\n- **Restricciones CHECK** para reglas obvias del negocio (saldos no negativos, tipos de cuenta válidos, etc.).\n- **Nombres consistentes**: si empezaste con `snake_case` en singular o plural, mantenlo en todas las tablas.\n- **Índices en las columnas de clave foránea**, especialmente si se van a hacer JOINs frecuentes (como `cuentas.id_cliente`).\n- **Datos de prueba cargados** para poder demostrar que las relaciones funcionan, no solo que las tablas existen vacías.\n- **Un script único y ejecutable** (no capturas de pantalla) que el profesor pueda correr para recrear tu esquema desde cero."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nToma el DDL de `cuentas` de esta diapositiva y agrégale:\n\n1. Una columna `estado` (VARCHAR2) con un `CHECK` que solo permita `'ACTIVA'`, `'BLOQUEADA'` o `'CERRADA'`.\n2. Una tabla `transacciones` con clave foránea hacia `cuentas`, que registre `tipo` (DEPOSITO/RETIRO), `monto` y `fecha`.\n\nEsto es, en esencia, una porción real de tu primera entrega."
    },
    {
      "title": "Entregables Requeridos",
      "subtitle": null,
      "type": "exercise",
      "md": "### Lista de Entregables (50% del Proyecto):\n\n- **1.** Diagrama MER del sistema bancario en formato PDF o imagen de alta calidad\n\n- **2.** Script DDL completo para tablas bancarias (crear_tablas_banco.sql)\n\n- **3.** Paquetes PL/SQL: gestion_clientes_pkg y gestion_cuentas_pkg completos\n\n- **4.** Script de datos de prueba bancarios (insertar_datos_banco.sql)\n\n- **5.** Documento de diseño explicando arquitectura del sistema bancario\n\n- **6.** Scripts de prueba para validar funcionamiento de paquetes PL/SQL"
    }
  ],
  "12": [
    {
      "title": "Arquitectura Oracle",
      "subtitle": "Componentes fundamentales del SGBD",
      "type": "intro",
      "md": "### Arquitectura de Oracle Database\n\nComprender la arquitectura es fundamental para la administración efectiva\n\n#### Instancia Oracle\n\n- **SGA:** System Global Area\n\n- **PGA:** Program Global Area\n\n- **Procesos Background:** PMON, SMON, DBWn, LGWR\n\n- **Procesos Server:** Atienden conexiones\n\n#### Base de Datos\n\n- **Datafiles:** Archivos de datos\n\n- **Control Files:** Metadatos de la BD\n\n- **Redo Logs:** Registro de cambios\n\n- **Archive Logs:** Logs archivados\n\n#### System Global Area (SGA)\n\n**Database Buffer Cache:**\n\nAlmacena bloques de datos más utilizados\n\n**Shared Pool:**\n\nSQL compartido, diccionario de datos\n\n**Redo Log Buffer:**\n\nCambios antes de escribir a disco"
    },
    {
      "title": "Gestión de Usuarios",
      "subtitle": "Creación y administración de cuentas",
      "type": "content",
      "md": "### Administración de Usuarios Oracle\n\n#### Tipos de Usuarios\n\n- **SYS:** Propietario del diccionario\n\n- **SYSTEM:** Usuario administrativo\n\n- **Usuarios de aplicación:** Para desarrollo\n\n- **Usuarios de esquema:** Propietarios de objetos\n\n#### Autenticación\n\n- **Password:** Autenticación por contraseña\n\n- **External:** Autenticación del SO\n\n- **Global:** Directorio empresarial\n\n#### Perfiles de Usuario\n\nLos perfiles controlan recursos y políticas de contraseñas:\n\n**Límites de Recursos:**\n\n- SESSIONS_PER_USER\n\n- CPU_PER_SESSION\n\n- CONNECT_TIME\n\n- LOGICAL_READS_PER_SESSION\n\n**Políticas de Contraseña:**\n\n- PASSWORD_LIFE_TIME\n\n- PASSWORD_GRACE_TIME\n\n- PASSWORD_REUSE_TIME\n\n- FAILED_LOGIN_ATTEMPTS"
    },
    {
      "title": "Creación de Usuarios",
      "subtitle": null,
      "type": "code",
      "md": "### Comandos para Gestión de Usuarios\n\n#### Crear Usuario\n\n```sql\n-- Crear usuario básico\nCREATE USER desarrollo\nIDENTIFIED BY password123\nDEFAULT TABLESPACE users\nTEMPORARY TABLESPACE temp\nQUOTA 100M ON users;\n\n-- Crear usuario con perfil personalizado\nCREATE USER app_user\nIDENTIFIED BY secure_pass\nDEFAULT TABLESPACE app_data\nTEMPORARY TABLESPACE temp\nPROFILE app_profile\nACCOUNT UNLOCK;\n\n-- Usuario con autenticación externa\nCREATE USER ops_user\nIDENTIFIED EXTERNALLY\nDEFAULT TABLESPACE users;\n```\n\n#### Modificar Usuario\n\n```sql\n-- Cambiar contraseña\nALTER USER desarrollo IDENTIFIED BY nueva_password;\n\n-- Cambiar tablespace por defecto\nALTER USER desarrollo DEFAULT TABLESPACE new_tablespace;\n\n-- Modificar cuota\nALTER USER desarrollo QUOTA UNLIMITED ON users;\n\n-- Bloquear/Desbloquear cuenta\nALTER USER desarrollo ACCOUNT LOCK;\nALTER USER desarrollo ACCOUNT UNLOCK;\n\n-- Expirar contraseña (forzar cambio)\nALTER USER desarrollo PASSWORD EXPIRE;\n```\n\n#### Eliminar Usuario\n\n```sql\n-- Eliminar usuario sin objetos\nDROP USER desarrollo;\n\n-- Eliminar usuario con todos sus objetos\nDROP USER desarrollo CASCADE;\n\n-- Verificar objetos antes de eliminar\nSELECT object_name, object_type \nFROM dba_objects \nWHERE owner = 'DESARROLLO';\n```"
    },
    {
      "title": "Roles y Privilegios",
      "subtitle": null,
      "type": "content",
      "md": "### Sistema de Seguridad Oracle\n\n#### Privilegios del Sistema\n\n- **CREATE SESSION:** Conectarse a la BD\n\n- **CREATE TABLE:** Crear tablas\n\n- **CREATE VIEW:** Crear vistas\n\n- **CREATE PROCEDURE:** Crear procedimientos\n\n- **DBA:** Administración completa\n\n#### Privilegios de Objeto\n\n- **SELECT:** Consultar datos\n\n- **INSERT:** Insertar registros\n\n- **UPDATE:** Modificar datos\n\n- **DELETE:** Eliminar registros\n\n- **EXECUTE:** Ejecutar procedimientos\n\n#### Roles Predefinidos\n\n**CONNECT:**\n\nPrivilegios básicos de conexión\n\n**RESOURCE:**\n\nCrear objetos en su esquema\n\n**DBA:**\n\nAdministración completa\n\n#### Mejores Prácticas\n\n- Usar roles en lugar de privilegios directos\n\n- Aplicar principio de menor privilegio\n\n- Crear roles específicos por aplicación\n\n- Auditar cambios de privilegios\n\n- Revisar privilegios periódicamente"
    },
    {
      "title": "Gestión de Roles",
      "subtitle": null,
      "type": "code",
      "md": "### Creación y Administración de Roles\n\n#### Crear y Configurar Roles\n\n```sql\n-- Crear rol básico\nCREATE ROLE app_developer;\n\n-- Crear rol con contraseña\nCREATE ROLE app_admin IDENTIFIED BY admin_pass;\n\n-- Otorgar privilegios del sistema al rol\nGRANT CREATE SESSION, CREATE TABLE, CREATE VIEW TO app_developer;\n\n-- Otorgar privilegios de objeto al rol\nGRANT SELECT, INSERT, UPDATE ON empleados TO app_developer;\nGRANT EXECUTE ON pkg_empleados TO app_developer;\n\n-- Crear rol jerárquico\nCREATE ROLE app_manager;\nGRANT app_developer TO app_manager;\nGRANT DELETE ON empleados TO app_manager;\n```\n\n#### Asignar Roles a Usuarios\n\n```sql\n-- Otorgar rol a usuario\nGRANT app_developer TO desarrollo;\nGRANT app_manager TO jefe_proyecto;\n\n-- Otorgar rol con ADMIN OPTION\nGRANT app_developer TO desarrollo WITH ADMIN OPTION;\n\n-- Establecer rol por defecto\nALTER USER desarrollo DEFAULT ROLE app_developer;\n\n-- Otorgar todos los roles excepto uno\nALTER USER desarrollo DEFAULT ROLE ALL EXCEPT app_admin;\n```\n\n#### Consultas de Auditoría\n\n```sql\n-- Ver roles de un usuario\nSELECT * FROM dba_role_privs WHERE grantee = 'DESARROLLO';\n\n-- Ver privilegios de un rol\nSELECT * FROM dba_sys_privs WHERE grantee = 'APP_DEVELOPER';\n\n-- Ver privilegios de objeto de un rol\nSELECT * FROM dba_tab_privs WHERE grantee = 'APP_DEVELOPER';\n\n-- Ver jerarquía de roles\nSELECT * FROM role_role_privs WHERE role = 'APP_MANAGER';\n\n-- Ver roles activos en sesión actual\nSELECT * FROM session_roles;\n```"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: crear un usuario correctamente",
      "md": "### De cero a un usuario funcional y seguro\n\n```sql\n-- 1. Crear el usuario con tablespaces explícitos\nCREATE USER app_banco IDENTIFIED BY \"Cambiar_Esta_Clave123\"\n  DEFAULT TABLESPACE users\n  TEMPORARY TABLESPACE temp\n  QUOTA 500M ON users;\n\n-- 2. Privilegios mínimos para trabajar\nGRANT CREATE SESSION TO app_banco;\nGRANT CREATE TABLE, CREATE PROCEDURE, CREATE VIEW TO app_banco;\nGRANT CREATE SEQUENCE TO app_banco;\n\n-- 3. Un rol de solo lectura para auditoría, por ejemplo\nCREATE ROLE rol_auditor;\nGRANT SELECT ANY TABLE TO rol_auditor;\nGRANT rol_auditor TO auditor_externo;\n```\n\nNota que **no** se otorga `DBA` ni `GRANT ALL`: se listan explícitamente solo los privilegios que el usuario realmente necesita."
    },
    {
      "type": "content",
      "title": "Errores comunes en arquitectura y gestión de usuarios",
      "md": "### ⚠️ Errores frecuentes\n\n- **Dar el rol DBA a usuarios de aplicación.** Es la forma más rápida de perder el control de quién puede hacer qué en la base de datos; el rol DBA debería reservarse solo para administradores reales.\n- **No asignar tablespace por defecto ni cuota.** Si no se especifica, el usuario puede terminar creando objetos en `SYSTEM`, lo cual no es buena práctica y puede afectar el rendimiento del diccionario de datos.\n- **Usar SYS o SYSTEM para la conexión de las aplicaciones.** Estas cuentas tienen privilegios totales; usarlas para el día a día de una aplicación es un riesgo de seguridad innecesario.\n- **No usar profiles de contraseña.** Sin una política de expiración y complejidad de contraseñas (`PROFILE`), las cuentas quedan más expuestas a ataques de fuerza bruta.\n- **Confundir privilegios de sistema con privilegios de objeto.** `CREATE TABLE` (sistema) permite crear tablas propias; `SELECT` sobre una tabla específica (objeto) es distinto y se otorga por separado."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nEscribe las sentencias necesarias para crear un usuario `reportes_banco` que:\n\n1. Solo pueda conectarse e iniciar sesión.\n2. Pueda hacer `SELECT` sobre las tablas `cuentas` y `transacciones`, pero no modificarlas.\n3. No tenga permiso para crear ningún objeto propio."
    },
    {
      "title": "Ejercicio Práctico",
      "subtitle": "Configuración de Seguridad",
      "type": "exercise",
      "md": "### Ejercicio: Sistema de Seguridad para Aplicación\n\n#### Parte 1: Crear Perfil Personalizado\n\nCrear perfil **app_profile** con:\n\n- Máximo 3 sesiones concurrentes por usuario\n\n- Tiempo de conexión máximo: 8 horas\n\n- Contraseña válida por 90 días\n\n- Máximo 3 intentos fallidos de login\n\n- Bloqueo de cuenta por 30 minutos tras fallos\n\n#### Parte 2: Crear Estructura de Roles\n\n- 1. **app_readonly:** Solo lectura en todas las tablas\n\n- 2. **app_operator:** Incluye app_readonly + INSERT/UPDATE\n\n- 3. **app_admin:** Incluye app_operator + DELETE + gestión de usuarios\n\n- 4. **app_developer:** Crear objetos + EXECUTE en procedimientos\n\n#### Parte 3: Crear Usuarios\n\n- 1. **app_user1:** Operador con perfil personalizado\n\n- 2. **app_admin1:** Administrador con rol app_admin\n\n- 3. **dev_user1:** Desarrollador con cuota ilimitada\n\n- 4. Asignar tablespace apropiado a cada usuario\n\n#### Parte 4: Verificación\n\n- 1. Probar conexión con cada usuario\n\n- 2. Verificar que los privilegios funcionan correctamente\n\n- 3. Intentar operaciones no permitidas (deben fallar)\n\n- 4. Consultar vistas del diccionario para verificar configuración"
    }
  ],
  "13": [
    {
      "title": "Segunda Entrega del Proyecto",
      "subtitle": "Módulo 3: Proyecto Final - Semana 13",
      "type": "intro",
      "md": "## Segunda Entrega del Proyecto\n\nSistema Bancario: PL/SQL completo, administración y pruebas\n\n### Qué se entrega esta semana\n\nSobre la estructura aprobada en la semana 10, ahora se entrega la lógica de negocio que la hace funcionar.\n\n- **Procedimientos y funciones** que resuelven depósitos, retiros, transferencias e intereses\n\n- **Paquetes** que agrupan esa lógica por subdominio, con especificación y cuerpo completos\n\n- **Triggers** de validación y de auditoría sobre las tablas de cuentas y transacciones\n\n- **Tareas de administración** aplicadas al esquema propio: usuarios, roles y privilegios mínimos\n\n- **Pruebas de integración** que demuestren que estructura, lógica y permisos funcionan en conjunto\n\n### El criterio que más pesa\n\nLa transferencia es la operación que define esta entrega: toca dos cuentas, debe ser atómica y no puede dejar dinero a medio camino. Si falla el abono, el cargo se revierte. Un equipo que resuelve bien la transferencia entendió el control transaccional."
    },
    {
      "title": "Paquetes del Sistema Bancario",
      "subtitle": null,
      "type": "code",
      "md": "Paquete para gestión de transacciones bancarias:\n\n`CREATE OR REPLACE PACKAGE gestion_transacciones_pkg IS\n-- Procedimientos para operaciones bancarias\nPROCEDURE realizar_deposito(\np_numero_cuenta IN NUMBER,\np_monto IN NUMBER,\np_usuario_id IN NUMBER\n);\n\nPROCEDURE realizar_retiro(\np_numero_cuenta IN NUMBER,\np_monto IN NUMBER,\np_usuario_id IN NUMBER\n);\n\nPROCEDURE realizar_transferencia(\np_cuenta_origen IN NUMBER,\np_cuenta_destino IN NUMBER,\np_monto IN NUMBER,\np_usuario_id IN NUMBER\n);\n\n-- Función para generar historial\nFUNCTION generar_historial(\np_numero_cuenta IN NUMBER,\np_fecha_inicio IN DATE,\np_fecha_fin IN DATE\n) RETURN SYS_REFCURSOR;\nEND gestion_transacciones_pkg;`"
    },
    {
      "title": "Implementación de Procedimientos",
      "subtitle": null,
      "type": "code",
      "md": "Implementación del procedimiento de depósito:\n\n`CREATE OR REPLACE PACKAGE BODY gestion_transacciones_pkg IS\nPROCEDURE realizar_deposito(\np_numero_cuenta IN NUMBER,\np_monto IN NUMBER,\np_usuario_id IN NUMBER\n) IS\nv_estado_cuenta VARCHAR2(20);\nBEGIN\n-- Verificar estado de la cuenta\nSELECT estado INTO v_estado_cuenta\nFROM Cuenta WHERE numero_cuenta = p_numero_cuenta;\n\nIF v_estado_cuenta != 'activa' THEN\nRAISE_APPLICATION_ERROR(-20001, 'La cuenta no está activa');\nEND IF;\n\n-- Registrar la transacción\nINSERT INTO Transaccion (\nnumero_cuenta, tipo_transaccion, monto, \nfecha_transaccion, usuario_id\n) VALUES (\np_numero_cuenta, 'DEPOSITO', p_monto,\nSYSDATE, p_usuario_id\n);\n\n-- Actualizar saldo\nUPDATE Cuenta \nSET saldo = saldo + p_monto \nWHERE numero_cuenta = p_numero_cuenta;\n\nCOMMIT;\nEND realizar_deposito;\nEND gestion_transacciones_pkg;`"
    },
    {
      "title": "Triggers de Validación Bancaria",
      "subtitle": null,
      "type": "code",
      "md": "Trigger para validar retiros bancarios:\n\n`CREATE OR REPLACE TRIGGER trg_valida_transaccion_retiro\nBEFORE INSERT ON Transaccion\nFOR EACH ROW\nDECLARE\nv_saldo_actual NUMBER;\nv_estado_cuenta VARCHAR2(20);\nBEGIN\nIF :NEW.tipo_transaccion = 'RETIRO' THEN\n-- Verificar estado y saldo de la cuenta\nSELECT saldo, estado \nINTO v_saldo_actual, v_estado_cuenta\nFROM Cuenta \nWHERE numero_cuenta = :NEW.numero_cuenta;\n\n-- Validar estado de cuenta\nIF v_estado_cuenta != 'activa' THEN\nRAISE_APPLICATION_ERROR(-20002, \n'No se puede retirar de una cuenta inactiva');\nEND IF;\n\n-- Validar saldo suficiente\nIF v_saldo_actual"
    },
    {
      "title": "Administración Oracle Bancaria",
      "subtitle": null,
      "type": "content",
      "md": "### Aspectos de Administración para Sistema Bancario:\n\n#### Usuarios Bancarios\n\nRoles específicos: cajero, administrador, auditor con privilegios diferenciados\n\n#### Índices Financieros\n\nOptimización para consultas de saldos, transacciones y auditoría\n\n#### Seguridad Bancaria\n\nEncriptación de datos sensibles y control de acceso estricto\n\n#### Auditoría\n\nRegistro completo de todas las operaciones financieras"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: transferencia bancaria con control transaccional",
      "md": "### El ejemplo canónico de una transacción bancaria\n\n```sql\nCREATE OR REPLACE PROCEDURE transferir(\n  p_cuenta_origen  IN NUMBER,\n  p_cuenta_destino IN NUMBER,\n  p_monto          IN NUMBER\n) IS\n  v_saldo_origen NUMBER;\nBEGIN\n  -- Bloquea la fila para evitar que otra transacción la modifique al mismo tiempo\n  SELECT saldo INTO v_saldo_origen\n  FROM cuentas\n  WHERE numero_cuenta = p_cuenta_origen\n  FOR UPDATE;\n\n  IF v_saldo_origen < p_monto THEN\n    RAISE_APPLICATION_ERROR(-20010, 'Saldo insuficiente');\n  END IF;\n\n  UPDATE cuentas SET saldo = saldo - p_monto WHERE numero_cuenta = p_cuenta_origen;\n  UPDATE cuentas SET saldo = saldo + p_monto WHERE numero_cuenta = p_cuenta_destino;\n\n  COMMIT;\nEXCEPTION\n  WHEN OTHERS THEN\n    ROLLBACK;\n    RAISE; -- se relanza para que quien llamó se entere del fallo\nEND transferir;\n/\n```\n\nEl `FOR UPDATE` evita una condición de carrera: sin él, dos transferencias simultáneas desde la misma cuenta podrían leer el mismo saldo \"antes\" de que la otra lo actualice."
    },
    {
      "type": "content",
      "title": "Errores comunes en esta etapa del proyecto",
      "md": "### ⚠️ Errores frecuentes\n\n- **No usar SELECT ... FOR UPDATE en operaciones de dinero.** Sin bloquear la fila, dos operaciones concurrentes sobre la misma cuenta pueden generar saldos incorrectos (condición de carrera).\n- **Hacer COMMIT parcial.** Actualizar la cuenta origen, hacer COMMIT, y luego actualizar la cuenta destino en una transacción separada deja al sistema en un estado inconsistente si algo falla en el medio.\n- **Silenciar errores con WHEN OTHERS sin RAISE.** En un sistema bancario esto es especialmente grave: una transferencia podría \"fallar en silencio\" sin que nadie lo note.\n- **No validar saldo suficiente antes del UPDATE.** Confiar solo en el `CHECK (saldo >= 0)` de la tabla significa que el error se descubre después de intentar la operación, en vez de evitarla con una validación clara y un mensaje entendible.\n- **Probar solo el camino feliz.** No probar qué pasa si la cuenta destino no existe, si el monto es negativo, o si las dos cuentas son la misma, deja huecos que un evaluador (o un usuario real) puede encontrar fácilmente."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nEste procedimiento de transferencia tiene fallas. Identifica al menos 3 problemas antes de continuar:\n\n```sql\nCREATE OR REPLACE PROCEDURE transferir_v2(\n  p_origen  NUMBER,\n  p_destino NUMBER,\n  p_monto   NUMBER\n) IS\nBEGIN\n  UPDATE cuentas SET saldo = saldo - p_monto WHERE numero_cuenta = p_origen;\n  UPDATE cuentas SET saldo = saldo + p_monto WHERE numero_cuenta = p_destino;\n  COMMIT;\nEXCEPTION\n  WHEN OTHERS THEN\n    NULL; -- no hace nada\nEND;\n/\n```\n\nPista: piensa en concurrencia, validación de saldo y manejo de errores."
    },
    {
      "title": "Entregables Requeridos",
      "subtitle": null,
      "type": "exercise",
      "md": "### Segunda Entrega:\n\n- **1.** Paquetes PL/SQL bancarios implementados y documentados\n\n- **2.** Funciones de autenticación y validación con casos de prueba\n\n- **3.** Triggers de validación y auditoría bancaria\n\n- **4.** Scripts de administración (usuarios bancarios, roles, seguridad)\n\n- **5.** Suite completa de pruebas de transacciones bancarias"
    }
  ],
  "14": [
    {
      "title": "Optimización de Consultas",
      "subtitle": "Mejorando el rendimiento de la base de datos",
      "type": "intro",
      "md": "### Performance Tuning en Oracle\n\nLa optimización es clave para aplicaciones escalables y eficientes\n\n#### Factores de Rendimiento\n\n- Diseño de consultas SQL\n\n- Índices apropiados\n\n- Estadísticas actualizadas\n\n- Configuración de memoria\n\n#### Herramientas de Análisis\n\n- EXPLAIN PLAN\n\n- AUTOTRACE\n\n- SQL Trace\n\n- AWR Reports\n\n#### Métricas Clave\n\n- Tiempo de respuesta\n\n- Throughput (transacciones/seg)\n\n- I/O físico vs lógico\n\n- CPU utilization\n\n#### Metodología de Optimización\n\n1. Identificar\n→\n2. Analizar\n→\n3. Optimizar\n→\n4. Verificar"
    },
    {
      "title": "EXPLAIN PLAN",
      "subtitle": "Analizando planes de ejecución",
      "type": "code",
      "md": "### Usando EXPLAIN PLAN\n\nEXPLAIN PLAN muestra cómo Oracle ejecutará una consulta sin ejecutarla realmente\n\n#### Generar Plan de Ejecución\n\n```sql\n-- Generar plan para una consulta\nEXPLAIN PLAN FOR\nSELECT e.nombre, d.nombre_dept, e.salario\nFROM empleados e\nJOIN departamentos d ON e.departamento_id = d.departamento_id\nWHERE e.salario > 5000\nORDER BY e.salario DESC;\n\n-- Ver el plan generado\nSELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);\n\n-- Plan con más detalles\nSELECT * FROM TABLE(DBMS_XPLAN.DISPLAY(NULL, NULL, 'BASIC +COST +BYTES'));\n```\n\n#### Interpretar el Plan\n\n```sql\nPlan hash value: 2851391496\n\n--------------------------------------------------------------------------\n| Id | Operation | Name | Rows | Bytes | Cost (%CPU)|\n--------------------------------------------------------------------------\n| 0 | SELECT STATEMENT | | 10 | 520 | 8 (25)|\n| 1 | SORT ORDER BY | | 10 | 520 | 8 (25)|\n|* 2 | HASH JOIN | | 10 | 520 | 7 (15)|\n|* 3 | TABLE ACCESS FULL| EMPLEADOS | 10 | 360 | 3 (0)|\n| 4 | TABLE ACCESS FULL| DEPARTAMENTOS| 4 | 64 | 3 (0)|\n--------------------------------------------------------------------------\n\nPredicate Information (identified by operation id):\n---------------------------------------------------\n2 - access(\"E\".\"DEPARTAMENTO_ID\"=\"D\".\"DEPT_ID\")\n3 - filter(\"E\".\"SALARIO\">5000)\n```\n\n#### Elementos del Plan\n\n- **Id:** Orden de ejecución\n\n- **Operation:** Tipo de operación\n\n- **Rows:** Filas estimadas\n\n- **Cost:** Costo estimado\n\n- **%CPU:** Porcentaje de CPU\n\n#### Operaciones Comunes\n\n- **TABLE ACCESS FULL:** Scan completo\n\n- **INDEX RANGE SCAN:** Búsqueda por índice\n\n- **HASH JOIN:** Join por hash\n\n- **NESTED LOOPS:** Join anidado"
    },
    {
      "title": "Índices en Oracle",
      "subtitle": null,
      "type": "content",
      "md": "### Tipos de Índices\n\n#### B-Tree Index (Por Defecto)\n\n- Estructura balanceada\n\n- Ideal para búsquedas exactas y rangos\n\n- Soporta ORDER BY eficientemente\n\n- Único o no único\n\nCREATE INDEX idx_emp_salario ON empleados(salario);\n\n#### Bitmap Index\n\n- Para columnas con pocos valores distintos\n\n- Excelente para consultas analíticas\n\n- Problemas con DML concurrente\n\n- Ideal para data warehouses\n\nCREATE BITMAP INDEX idx_emp_genero ON empleados(genero);\n\n#### Function-Based Index\n\n- Índice sobre expresiones\n\n- Para consultas con funciones\n\n- Mejora búsquedas case-insensitive\n\nCREATE INDEX idx_emp_upper_name ON empleados(UPPER(nombre));\n\n#### Composite Index\n\n- Múltiples columnas\n\n- Orden de columnas importante\n\n- Útil para consultas complejas\n\nCREATE INDEX idx_emp_dept_sal ON empleados(departamento_id, salario);\n\n#### Consideraciones para Índices\n\n**Cuándo Crear:**\n\n- Columnas en WHERE frecuentemente\n\n- Columnas de JOIN\n\n- Columnas de ORDER BY\n\n- Foreign keys\n\n**Cuándo NO Crear:**\n\n- Tablas muy pequeñas\n\n- Columnas que cambian frecuentemente\n\n- Tablas con mucho DML\n\n- Cuando el costo supera el beneficio"
    },
    {
      "title": "Gestión de Estadísticas",
      "subtitle": null,
      "type": "code",
      "md": "### DBMS_STATS - Estadísticas del Optimizador\n\nLas estadísticas precisas son fundamentales para que el optimizador genere planes eficientes\n\n#### Recopilar Estadísticas\n\n```sql\n-- Estadísticas de una tabla\nEXEC DBMS_STATS.GATHER_TABLE_STATS('HR', 'EMPLEADOS');\n\n-- Estadísticas con histogramas\nEXEC DBMS_STATS.GATHER_TABLE_STATS(\nownname => 'HR',\ntabname => 'EMPLEADOS',\nmethod_opt => 'FOR ALL COLUMNS SIZE AUTO',\ncascade => TRUE -- Incluir índices\n);\n\n-- Estadísticas de todo un esquema\nEXEC DBMS_STATS.GATHER_SCHEMA_STATS('HR');\n\n-- Estadísticas de toda la base de datos\nEXEC DBMS_STATS.GATHER_DATABASE_STATS(\nestimate_percent => DBMS_STATS.AUTO_SAMPLE_SIZE,\nmethod_opt => 'FOR ALL COLUMNS SIZE AUTO',\ncascade => TRUE\n);\n```\n\n#### Consultar Estadísticas\n\n```sql\n-- Ver estadísticas de tabla\nSELECT table_name, num_rows, blocks, avg_row_len, last_analyzed\nFROM user_tables\nWHERE table_name = 'EMPLEADOS';\n\n-- Ver estadísticas de columnas\nSELECT column_name, num_distinct, density, num_nulls, histogram\nFROM user_tab_col_statistics\nWHERE table_name = 'EMPLEADOS';\n\n-- Ver estadísticas de índices\nSELECT index_name, blevel, leaf_blocks, distinct_keys, clustering_factor\nFROM user_indexes\nWHERE table_name = 'EMPLEADOS';\n\n-- Histogramas de una columna\nSELECT endpoint_number, endpoint_value\nFROM user_tab_histograms\nWHERE table_name = 'EMPLEADOS' AND column_name = 'SALARIO';\n```\n\n#### Gestión Avanzada\n\n```sql\n-- Bloquear estadísticas (evitar cambios automáticos)\nEXEC DBMS_STATS.LOCK_TABLE_STATS('HR', 'EMPLEADOS');\n\n-- Desbloquear estadísticas\nEXEC DBMS_STATS.UNLOCK_TABLE_STATS('HR', 'EMPLEADOS');\n\n-- Exportar estadísticas\nEXEC DBMS_STATS.CREATE_STAT_TABLE('HR', 'STATS_BACKUP');\nEXEC DBMS_STATS.EXPORT_TABLE_STATS('HR', 'EMPLEADOS', stattab => 'STATS_BACKUP');\n\n-- Restaurar estadísticas\nEXEC DBMS_STATS.IMPORT_TABLE_STATS('HR', 'EMPLEADOS', stattab => 'STATS_BACKUP');\n\n-- Eliminar estadísticas\nEXEC DBMS_STATS.DELETE_TABLE_STATS('HR', 'EMPLEADOS');\n```"
    },
    {
      "title": "Hints del Optimizador",
      "subtitle": null,
      "type": "code",
      "md": "### Dirigiendo al Optimizador\n\nLos hints permiten influir en las decisiones del optimizador cuando es necesario\n\n#### Hints de Acceso\n\n```sql\n-- Forzar uso de índice\nSELECT /*+ INDEX(e idx_emp_salario) */ nombre, salario\nFROM empleados e\nWHERE salario > 5000;\n\n-- Forzar full table scan\nSELECT /*+ FULL(e) */ nombre, salario\nFROM empleados e\nWHERE departamento_id = 10;\n\n-- Usar índice específico para join\nSELECT /*+ USE_NL(e d) INDEX(e idx_emp_dept) */ \ne.nombre, d.nombre_dept\nFROM empleados e, departamentos d\nWHERE e.departamento_id = d.departamento_id;\n```\n\n#### Hints de Join\n\n```sql\n-- Forzar hash join\nSELECT /*+ USE_HASH(e d) */ e.nombre, d.nombre_dept\nFROM empleados e\nJOIN departamentos d ON e.departamento_id = d.departamento_id;\n\n-- Forzar nested loop join\nSELECT /*+ USE_NL(e d) */ e.nombre, d.nombre_dept\nFROM empleados e\nJOIN departamentos d ON e.departamento_id = d.departamento_id;\n\n-- Forzar sort merge join\nSELECT /*+ USE_MERGE(e d) */ e.nombre, d.nombre_dept\nFROM empleados e\nJOIN departamentos d ON e.departamento_id = d.departamento_id;\n\n-- Controlar orden de join\nSELECT /*+ LEADING(d e) */ e.nombre, d.nombre_dept\nFROM empleados e\nJOIN departamentos d ON e.departamento_id = d.departamento_id;\n```\n\n#### Hints de Optimización\n\n```sql\n-- Optimizar para primera fila\nSELECT /*+ FIRST_ROWS(10) */ nombre, salario\nFROM empleados\nWHERE departamento_id = 10\nORDER BY salario DESC;\n\n-- Optimizar para todas las filas\nSELECT /*+ ALL_ROWS */ nombre, salario\nFROM empleados\nWHERE salario > 3000;\n\n-- Usar paralelismo\nSELECT /*+ PARALLEL(e, 4) */ COUNT(*)\nFROM empleados e;\n\n-- Evitar paralelismo\nSELECT /*+ NO_PARALLEL(e) */ nombre, salario\nFROM empleados e;\n```\n\n#### Precauciones con Hints\n\n- Usar solo cuando sea realmente necesario\n\n- Documentar por qué se usa cada hint\n\n- Revisar periódicamente si siguen siendo necesarios\n\n- Pueden volverse obsoletos con cambios en datos\n\n- Prefiere soluciones estructurales (índices, estadísticas)"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: leer un EXPLAIN PLAN",
      "md": "### Generar y leer un plan de ejecución\n\n```sql\nEXPLAIN PLAN FOR\nSELECT c.nombre, SUM(t.monto)\nFROM cuentas c\nJOIN transacciones t ON t.numero_cuenta = c.numero_cuenta\nWHERE c.tipo_cuenta = 'AHORROS'\nGROUP BY c.nombre;\n\nSELECT plan_table_output\nFROM TABLE(DBMS_XPLAN.DISPLAY());\n```\n\nEn la salida hay que fijarse en:\n\n- **Operaciones \"FULL TABLE SCAN\"** sobre tablas grandes: suelen ser candidatas a un índice.\n- **La columna \"Cost\"**: no es un valor absoluto de tiempo, pero sirve para comparar dos versiones de la misma consulta.\n- **\"Cardinality\" / \"Rows\"**: cuántas filas estima el optimizador que va a procesar en cada paso; si está muy lejos de la realidad, las estadísticas pueden estar desactualizadas."
    },
    {
      "type": "content",
      "title": "Errores comunes al optimizar consultas",
      "md": "### ⚠️ Errores frecuentes\n\n- **Crear un índice por cada columna \"por si acaso\".** Cada índice acelera lecturas pero ralentiza INSERT/UPDATE/DELETE, porque también hay que mantenerlo actualizado. Hay que indexar con criterio, no exhaustivamente.\n- **No ejecutar DBMS_STATS después de una carga masiva.** Si las estadísticas quedan desactualizadas tras insertar millones de filas, el optimizador puede elegir planes de ejecución muy ineficientes basados en información obsoleta.\n- **Aplicar una función sobre la columna indexada en el WHERE.** Por ejemplo, `WHERE UPPER(nombre) = 'JUAN'` no puede usar un índice normal sobre `nombre`; se necesitaría un índice basado en función o reestructurar la consulta.\n- **Usar hints como solución permanente.** Un `hint` puede resolver un problema puntual, pero si las estadísticas cambian con el tiempo, ese hint fijo puede terminar forzando un plan peor que el que el optimizador elegiría solo.\n- **Optimizar sin medir antes y después.** Cambiar índices o reescribir consultas \"a ojo\" sin comparar el `EXPLAIN PLAN` o el tiempo real de ejecución antes/después no permite saber si realmente mejoró algo."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nDada esta consulta que se ejecuta lento sobre una tabla `transacciones` de 5 millones de filas:\n\n```sql\nSELECT * FROM transacciones\nWHERE TO_CHAR(fecha_mov, 'YYYY-MM') = '2025-01';\n```\n\n1. Explica por qué esta consulta probablemente no puede usar un índice normal sobre `fecha_mov`.\n2. Proponte una reescritura de la condición que sí permita usar un índice de rango sobre `fecha_mov` (pista: usa comparaciones `>=` y `<` con fechas, en vez de convertir la columna a texto)."
    },
    {
      "title": "Ejercicio Práctico",
      "subtitle": "Optimización de Consultas",
      "type": "exercise",
      "md": "### Ejercicio: Análisis y Optimización de Performance\n\n#### Parte 1: Preparar Datos de Prueba\n\n- 1. Crear tabla **ventas** con 100,000+ registros\n\n- 2. Columnas: venta_id, producto_id, cliente_id, fecha_venta, monto, region\n\n- 3. Crear tabla **productos** con 1,000 productos\n\n- 4. Crear tabla **clientes** con 10,000 clientes\n\n- 5. Poblar con datos realistas usando PL/SQL\n\n#### Parte 2: Consultas Problemáticas\n\nAnalizar estas consultas con EXPLAIN PLAN:\n\n- 1. Reporte de ventas por región y mes (sin índices)\n\n- 2. Top 10 productos más vendidos\n\n- 3. Clientes con ventas superiores al promedio\n\n- 4. Join complejo entre las tres tablas con filtros\n\n#### Parte 3: Optimización\n\n- 1. Crear índices apropiados basados en los planes\n\n- 2. Actualizar estadísticas de todas las tablas\n\n- 3. Reescribir consultas ineficientes\n\n- 4. Experimentar con hints cuando sea necesario\n\n- 5. Medir mejoras en tiempo de ejecución\n\n#### Parte 4: Documentación\n\n- 1. Documentar planes de ejecución antes y después\n\n- 2. Registrar tiempos de ejecución\n\n- 3. Justificar cada índice creado\n\n- 4. Crear recomendaciones para mantenimiento"
    }
  ],
  "15": [
    {
      "title": "Gestión de Almacenamiento",
      "subtitle": "Tablespaces y Datafiles",
      "type": "intro",
      "md": "### Arquitectura de Almacenamiento Oracle\n\nComprender y gestionar el almacenamiento físico de la base de datos\n\n#### Jerarquía de Almacenamiento\n\n**Database** - Nivel más alto\n\n**Tablespaces** - Unidades lógicas\n\n**Datafiles** - Archivos físicos\n\n**Extents** - Bloques contiguos\n\n**Blocks** - Unidad mínima\n\n#### Tipos de Tablespaces\n\n- **SYSTEM:** Diccionario de datos\n\n- **SYSAUX:** Componentes auxiliares\n\n- **USERS:** Objetos de usuario por defecto\n\n- **TEMP:** Operaciones temporales\n\n- **UNDO:** Información de rollback\n\n- **Personalizados:** Para aplicaciones\n\n#### Beneficios de la Gestión Adecuada\n\n**Rendimiento:**\n\nDistribución eficiente de I/O\n\n**Mantenimiento:**\n\nBackup y recovery granular\n\n**Escalabilidad:**\n\nCrecimiento controlado"
    },
    {
      "title": "Creación de Tablespaces",
      "subtitle": null,
      "type": "code",
      "md": "### Comandos para Gestión de Tablespaces\n\n#### Tablespace Básico\n\n```sql\n-- Crear tablespace básico\nCREATE TABLESPACE app_data\nDATAFILE '/u01/oradata/orcl/app_data01.dbf' SIZE 100M\nAUTOEXTEND ON NEXT 10M MAXSIZE 1G\nEXTENT MANAGEMENT LOCAL\nSEGMENT SPACE MANAGEMENT AUTO;\n\n-- Tablespace con múltiples datafiles\nCREATE TABLESPACE large_data\nDATAFILE '/u01/oradata/orcl/large_data01.dbf' SIZE 500M,\n'/u02/oradata/orcl/large_data02.dbf' SIZE 500M\nAUTOEXTEND ON NEXT 50M MAXSIZE 2G\nEXTENT MANAGEMENT LOCAL\nUNIFORM SIZE 1M;\n```\n\n#### Tablespace Temporal\n\n```sql\n-- Crear tablespace temporal\nCREATE TEMPORARY TABLESPACE temp_large\nTEMPFILE '/u01/oradata/orcl/temp_large01.dbf' SIZE 200M\nAUTOEXTEND ON NEXT 20M MAXSIZE 1G\nEXTENT MANAGEMENT LOCAL\nUNIFORM SIZE 1M;\n\n-- Asignar como temporal por defecto\nALTER DATABASE DEFAULT TEMPORARY TABLESPACE temp_large;\n```\n\n#### Tablespace UNDO\n\n```sql\n-- Crear tablespace UNDO\nCREATE UNDO TABLESPACE undo_large\nDATAFILE '/u01/oradata/orcl/undo_large01.dbf' SIZE 300M\nAUTOEXTEND ON NEXT 30M MAXSIZE 2G;\n\n-- Cambiar a nuevo tablespace UNDO\nALTER SYSTEM SET UNDO_TABLESPACE = undo_large;\n\n-- Verificar cambio\nSHOW PARAMETER undo_tablespace;\n```\n\n#### Parámetros Importantes:\n\n- **EXTENT MANAGEMENT LOCAL:** Gestión local de extents (recomendado)\n\n- **SEGMENT SPACE MANAGEMENT AUTO:** Gestión automática de espacio\n\n- **UNIFORM SIZE:** Todos los extents del mismo tamaño\n\n- **AUTOEXTEND:** Crecimiento automático cuando sea necesario"
    },
    {
      "title": "Gestión de Datafiles",
      "subtitle": null,
      "type": "code",
      "md": "### Administración de Archivos de Datos\n\n#### Agregar Datafiles\n\n```sql\n-- Agregar datafile a tablespace existente\nALTER TABLESPACE app_data\nADD DATAFILE '/u03/oradata/orcl/app_data02.dbf' SIZE 200M\nAUTOEXTEND ON NEXT 20M MAXSIZE 1G;\n\n-- Agregar múltiples datafiles\nALTER TABLESPACE large_data\nADD DATAFILE '/u04/oradata/orcl/large_data03.dbf' SIZE 500M,\n'/u05/oradata/orcl/large_data04.dbf' SIZE 500M;\n```\n\n#### Redimensionar Datafiles\n\n```sql\n-- Aumentar tamaño de datafile\nALTER DATABASE DATAFILE '/u01/oradata/orcl/app_data01.dbf' \nRESIZE 500M;\n\n-- Modificar autoextend\nALTER DATABASE DATAFILE '/u01/oradata/orcl/app_data01.dbf'\nAUTOEXTEND ON NEXT 50M MAXSIZE 2G;\n\n-- Desactivar autoextend\nALTER DATABASE DATAFILE '/u01/oradata/orcl/app_data01.dbf'\nAUTOEXTEND OFF;\n```\n\n#### Mover y Renombrar Datafiles\n\n```sql\n-- Método 1: Tablespace offline\nALTER TABLESPACE app_data OFFLINE;\n-- Mover archivo físicamente en el SO\n-- mv /u01/oradata/orcl/app_data01.dbf /u02/oradata/orcl/app_data01.dbf\nALTER TABLESPACE app_data \nRENAME DATAFILE '/u01/oradata/orcl/app_data01.dbf' \nTO '/u02/oradata/orcl/app_data01.dbf';\nALTER TABLESPACE app_data ONLINE;\n\n-- Método 2: Para tablespaces SYSTEM (requiere shutdown)\nSHUTDOWN IMMEDIATE;\nSTARTUP MOUNT;\nALTER DATABASE \nRENAME FILE '/u01/oradata/orcl/system01.dbf' \nTO '/u02/oradata/orcl/system01.dbf';\nALTER DATABASE OPEN;\n```"
    },
    {
      "title": "Monitoreo de Espacio",
      "subtitle": null,
      "type": "code",
      "md": "### Vistas del Diccionario para Monitoreo\n\n#### Información de Tablespaces\n\n```sql\n-- Información general de tablespaces\nSELECT tablespace_name, status, contents, extent_management, \nsegment_space_management\nFROM dba_tablespaces;\n\n-- Espacio usado y libre por tablespace\nSELECT ts.tablespace_name,\nROUND(ts.total_mb, 2) AS total_mb,\nROUND(fs.free_mb, 2) AS free_mb,\nROUND((ts.total_mb - fs.free_mb), 2) AS used_mb,\nROUND(((ts.total_mb - fs.free_mb) / ts.total_mb) * 100, 2) AS pct_used\nFROM (SELECT tablespace_name, SUM(bytes)/1024/1024 AS total_mb\nFROM dba_data_files\nGROUP BY tablespace_name) ts,\n(SELECT tablespace_name, SUM(bytes)/1024/1024 AS free_mb\nFROM dba_free_space\nGROUP BY tablespace_name) fs\nWHERE ts.tablespace_name = fs.tablespace_name\nORDER BY pct_used DESC;\n```\n\n#### Información de Datafiles\n\n```sql\n-- Detalles de datafiles\nSELECT file_name, tablespace_name, \nROUND(bytes/1024/1024, 2) AS size_mb,\nROUND(maxbytes/1024/1024, 2) AS max_size_mb,\nautoextensible, status\nFROM dba_data_files\nORDER BY tablespace_name, file_id;\n\n-- Datafiles que pueden crecer\nSELECT file_name, tablespace_name,\nROUND(bytes/1024/1024, 2) AS current_mb,\nROUND(maxbytes/1024/1024, 2) AS max_mb,\nROUND((maxbytes - bytes)/1024/1024, 2) AS can_grow_mb\nFROM dba_data_files\nWHERE autoextensible = 'YES'\nAND maxbytes > bytes;\n```\n\n#### Alertas de Espacio\n\n```sql\n-- Tablespaces con más del 85% de uso\nSELECT tablespace_name,\nROUND(used_percent, 2) AS pct_used,\nROUND(total_mb, 2) AS total_mb,\nROUND(free_mb, 2) AS free_mb\nFROM (\nSELECT ts.tablespace_name,\n(ts.total_mb - NVL(fs.free_mb, 0)) / ts.total_mb * 100 AS used_percent,\nts.total_mb,\nNVL(fs.free_mb, 0) AS free_mb\nFROM (SELECT tablespace_name, SUM(bytes)/1024/1024 AS total_mb\nFROM dba_data_files GROUP BY tablespace_name) ts\nLEFT JOIN (SELECT tablespace_name, SUM(bytes)/1024/1024 AS free_mb\nFROM dba_free_space GROUP BY tablespace_name) fs\nON ts.tablespace_name = fs.tablespace_name\n)\nWHERE used_percent > 85\nORDER BY used_percent DESC;\n\n-- Objetos más grandes por tablespace\nSELECT owner, segment_name, segment_type, tablespace_name,\nROUND(bytes/1024/1024, 2) AS size_mb\nFROM dba_segments\nWHERE tablespace_name = 'APP_DATA'\nORDER BY bytes DESC\nFETCH FIRST 10 ROWS ONLY;\n```"
    },
    {
      "title": "Mantenimiento de Tablespaces",
      "subtitle": null,
      "type": "code",
      "md": "### Operaciones de Mantenimiento\n\n#### Estados de Tablespace\n\n```sql\n-- Poner tablespace offline\nALTER TABLESPACE app_data OFFLINE;\n\n-- Poner tablespace online\nALTER TABLESPACE app_data ONLINE;\n\n-- Modo read-only\nALTER TABLESPACE app_data READ ONLY;\n\n-- Volver a read-write\nALTER TABLESPACE app_data READ WRITE;\n\n-- Verificar estado\nSELECT tablespace_name, status \nFROM dba_tablespaces \nWHERE tablespace_name = 'APP_DATA';\n```\n\n#### Coalescing y Defragmentación\n\n```sql\n-- Coalescing de espacio libre (solo para DICTIONARY managed)\nALTER TABLESPACE app_data COALESCE;\n\n-- Ver fragmentación\nSELECT tablespace_name, COUNT(*) AS fragments,\nMAX(bytes/1024/1024) AS largest_mb,\nMIN(bytes/1024/1024) AS smallest_mb\nFROM dba_free_space\nGROUP BY tablespace_name\nHAVING COUNT(*) > 1;\n\n-- Reorganizar tabla para reducir fragmentación\nALTER TABLE empleados MOVE TABLESPACE app_data;\n\n-- Reconstruir índices después del MOVE\nALTER INDEX idx_emp_salario REBUILD;\n```\n\n#### Eliminar Tablespaces\n\n```sql\n-- Eliminar tablespace vacío\nDROP TABLESPACE app_data;\n\n-- Eliminar tablespace con contenido\nDROP TABLESPACE app_data INCLUDING CONTENTS;\n\n-- Eliminar tablespace, contenido y datafiles\nDROP TABLESPACE app_data INCLUDING CONTENTS AND DATAFILES;\n\n-- Eliminar con cascada de constraints\nDROP TABLESPACE app_data INCLUDING CONTENTS AND DATAFILES\nCASCADE CONSTRAINTS;\n```\n\n#### Mejores Prácticas:\n\n- Separar datos, índices y objetos temporales\n\n- Monitorear crecimiento regularmente\n\n- Configurar alertas automáticas de espacio\n\n- Planificar capacidad basada en tendencias\n\n- Hacer backup antes de operaciones de mantenimiento\n\n- Documentar la estructura de almacenamiento"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: monitorear y ampliar espacio",
      "md": "### Ver el espacio libre y agregar un datafile\n\n```sql\n-- Ver espacio usado vs. disponible por tablespace\nSELECT tablespace_name,\n       ROUND(SUM(bytes)/1024/1024, 2) AS mb_libres\nFROM dba_free_space\nGROUP BY tablespace_name;\n\n-- Ver tamaño total asignado\nSELECT tablespace_name, file_name,\n       ROUND(bytes/1024/1024, 2) AS mb_total,\n       autoextensible\nFROM dba_data_files\nWHERE tablespace_name = 'USERS';\n\n-- Si se está quedando sin espacio, agregar un datafile\nALTER TABLESPACE users\n  ADD DATAFILE '/u01/oradata/orcl/users02.dbf'\n  SIZE 500M AUTOEXTEND ON NEXT 100M MAXSIZE 2G;\n```\n\nRevisar `autoextensible` es clave: si está en `NO` y el tablespace se llena, cualquier INSERT fallará con `ORA-01653`, aunque el servidor tenga disco disponible."
    },
    {
      "type": "content",
      "title": "Errores comunes en gestión de almacenamiento",
      "md": "### ⚠️ Errores frecuentes\n\n- **Dejar AUTOEXTEND desactivado sin monitoreo.** Si un tablespace no crece automáticamente y nadie revisa el espacio libre, una tabla puede fallar en producción con `ORA-01653` (no se puede extender).\n- **No poner MAXSIZE en AUTOEXTEND.** Sin un límite, un error de aplicación que inserte datos en bucle podría llenar todo el disco del servidor.\n- **Mezclar datos e índices en el mismo tablespace sin necesidad.** En sistemas grandes, separarlos permite planificar el crecimiento y el I/O de forma más predecible (aunque en proyectos académicos no siempre es necesario).\n- **Crear datafiles enormes \"para no tener que pensarlo después\".** Reservar mucho más espacio del necesario desperdicia almacenamiento del servidor sin ningún beneficio real de rendimiento.\n- **No revisar el espacio libre periódicamente.** Confiar en que \"ya se verá cuando falle\" es la causa más común de interrupciones evitables por falta de espacio."
    },
    {
      "type": "exercise",
      "title": "Practica antes de ver la solución",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nSupón que `DBA_FREE_SPACE` muestra que el tablespace `USERS` tiene solo 50 MB libres, y `DBA_DATA_FILES` muestra que su único datafile no tiene `AUTOEXTEND` activado.\n\n1. Escribe la sentencia para activar `AUTOEXTEND` sobre ese datafile existente (pista: `ALTER DATABASE DATAFILE ... AUTOEXTEND ON ...`).\n2. Como alternativa, escribe la sentencia para agregar un segundo datafile de 200 MB al mismo tablespace.\n\n¿En qué situación elegirías una opción sobre la otra?"
    },
    {
      "title": "Ejercicio Práctico",
      "subtitle": "Gestión Completa de Almacenamiento",
      "type": "exercise",
      "md": "### Ejercicio: Diseño de Almacenamiento para Aplicación\n\n#### Parte 1: Diseñar Estructura\n\nCrear estructura de tablespaces para una aplicación ERP:\n\n- 1. **ERP_DATA:** Tablas principales (500MB inicial, max 5GB)\n\n- 2. **ERP_INDEX:** Índices (200MB inicial, max 2GB)\n\n- 3. **ERP_TEMP:** Operaciones temporales (100MB inicial, max 1GB)\n\n- 4. **ERP_UNDO:** Información de rollback (300MB inicial, max 3GB)\n\n- 5. Distribuir datafiles en diferentes discos para rendimiento\n\n#### Parte 2: Implementar y Poblar\n\n- 1. Crear todos los tablespaces con configuración óptima\n\n- 2. Crear usuarios asignados a tablespaces apropiados\n\n- 3. Crear tablas de ejemplo: empleados, departamentos, proyectos, asignaciones\n\n- 4. Poblar con datos de prueba (mínimo 10,000 registros por tabla)\n\n- 5. Crear índices en tablespace ERP_INDEX\n\n#### Parte 3: Monitoreo y Alertas\n\n- 1. Crear script de monitoreo de espacio\n\n- 2. Identificar tablespaces con más del 80% de uso\n\n- 3. Crear procedimiento para alertas automáticas\n\n- 4. Generar reporte de crecimiento semanal\n\n- 5. Documentar umbrales de alerta recomendados\n\n#### Parte 4: Operaciones de Mantenimiento\n\n- 1. Simular crecimiento agregando más datafiles\n\n- 2. Mover un datafile a otra ubicación\n\n- 3. Reorganizar una tabla fragmentada\n\n- 4. Crear tablespace de solo lectura para datos históricos\n\n- 5. Documentar procedimientos de mantenimiento"
    }
  ],
  "16": [
    {
      "title": "Presentación Final del Proyecto",
      "subtitle": "Sistema de Gestión Bancaria - Semana 16",
      "type": "intro",
      "md": "## Presentación Final\n\nDemo del Sistema Bancario, defensa técnica y retroalimentación\n\n### Cierre del curso\n\nÚltima sesión: cada equipo demuestra el sistema bancario completo y defiende sus decisiones de diseño ante el docente.\n\n- **Demo en vivo** sobre la base de datos real, con datos sembrados y operaciones ejecutándose\n\n- **Defensa técnica** de por qué se resolvió cada regla donde se resolvió\n\n- **Retroalimentación** individual y grupal sobre fortalezas y aspectos a mejorar\n\n### Cómo prepararse\n\nLa demo se ensaya completa al menos una vez con la base en el estado en que va a estar el día de la presentación. Los fallos más comunes no son de código: son datos sembrados que no alcanzan para mostrar el caso interesante, o una secuencia de pasos que nadie probó en orden. Se lleva un guion escrito y un plan B si algo no responde."
    },
    {
      "title": "Estructura de la Presentación",
      "subtitle": null,
      "type": "content",
      "md": "### Distribución del tiempo (40 minutos)\n\n- **Introducción al sistema bancario — 5 min:** el alcance, las entidades del dominio y qué decidió resolver el equipo\n\n- **Demostración del sistema — 10 min:** operaciones en vivo sobre la base; apertura de cuenta, depósito, retiro con saldo insuficiente y transferencia\n\n- **Explicación técnica — 10 min:** recorrido por los paquetes, los triggers de auditoría y el control transaccional de la transferencia\n\n- **Preguntas y respuestas — 10 min:** el docente indaga en las decisiones de diseño\n\n- **Retroalimentación — 5 min:** cierre y observaciones\n\n### Recomendaciones\n\n- Mostrar primero el caso que falla y luego el que funciona: demuestra que las validaciones existen de verdad\n\n- Tener las consultas de la demo guardadas y probadas, no escribirlas en vivo\n\n- Repartir la exposición entre los cinco integrantes; cada uno defiende la parte que implementó"
    },
    {
      "title": "Script de Demostración Bancaria",
      "subtitle": null,
      "type": "code",
      "md": "Script preparado para la demostración del sistema bancario:\n\n`-- Actualizado script para demostración bancaria\n-- 1. Mostrar estado inicial del sistema bancario\nSELECT 'Clientes registrados: ' || COUNT(*) FROM Cliente;\nSELECT 'Cuentas activas: ' || COUNT(*) FROM Cuenta WHERE estado = 'activa';\nSELECT 'Transacciones del día: ' || COUNT(*) FROM Transaccion \nWHERE DATE(fecha_transaccion) = DATE(SYSDATE);\n\n-- 2. Demostrar creación de cliente y cuenta\nBEGIN\ngestion_clientes_pkg.crear_cliente(\np_nombre_completo => 'Juan Pérez García',\np_identificacion => '12345678',\np_direccion => 'Calle 123 #45-67'\n);\n\ngestion_cuentas_pkg.crear_cuenta(\np_cliente_id => 1,\np_tipo_cuenta => 'AHORROS',\np_saldo_inicial => 500000\n);\nDBMS_OUTPUT.PUT_LINE('Cliente y cuenta creados exitosamente');\nEND;\n\n-- 3. Demostrar operaciones bancarias\nBEGIN\n-- Realizar depósito\ngestion_transacciones_pkg.realizar_deposito(\np_numero_cuenta => '1001',\np_monto => 100000,\np_usuario_id => 1\n);\n\n-- Realizar retiro\ngestion_transacciones_pkg.realizar_retiro(\np_numero_cuenta => '1001',\np_monto => 50000,\np_usuario_id => 1\n);\n\n-- Transferencia entre cuentas\ngestion_transacciones_pkg.realizar_transferencia(\np_cuenta_origen => '1001',\np_cuenta_destino => '1002',\np_monto => 25000,\np_usuario_id => 1\n);\nEND;\n\n-- 4. Mostrar auditoría y seguridad\nSELECT \nt.transaccion_id,\nc.numero_cuenta,\nt.tipo_transaccion,\nt.monto,\nt.fecha_transaccion,\nu.nombre_usuario\nFROM Transaccion t\nJOIN Cuenta c ON t.cuenta_id = c.numero_cuenta\nJOIN Auditoria_Transacciones a ON t.transaccion_id = a.transaccion_id\nJOIN Usuario u ON a.usuario_id = u.usuario_id\nORDER BY t.fecha_transaccion DESC;`"
    },
    {
      "title": "Criterios de Evaluación Final",
      "subtitle": null,
      "type": "content",
      "md": "### Cómo se reparte la nota final del proyecto\n\n- **Sistema bancario funcionando — 25%:** las operaciones se ejecutan de punta a punta sobre la base real\n\n- **Paquetes PL/SQL — 20%:** lógica agrupada por subdominio, con especificación y cuerpo, y detalle interno oculto\n\n- **Triggers y seguridad — 15%:** auditoría efectiva y roles con privilegios mínimos, no un usuario dueño de todo\n\n- **Validaciones — 15%:** las reglas de negocio se cumplen y los casos límite están cubiertos\n\n- **Presentación — 15%:** claridad de la demo y solidez en la defensa técnica\n\n- **Documentación — 10%:** MER, diccionario de datos y decisiones justificadas\n\n### Lo que el docente comprueba en vivo\n\n- Que la transferencia sea atómica: si el abono falla, el cargo se revierte\n\n- Que un retiro sobre saldo insuficiente sea rechazado con un mensaje claro\n\n- Que la tabla de auditoría registre quién hizo cada movimiento y cuándo"
    },
    {
      "title": "Preguntas Técnicas Bancarias",
      "subtitle": null,
      "type": "content",
      "md": "### Prepárate para estas preguntas sobre el sistema bancario:\n\n- ?\n\n¿Cómo garantiza la atomicidad en las transferencias bancarias?\n\n- ?\n\n¿Qué medidas de seguridad implementó para proteger los datos financieros?\n\n- ?\n\n¿Cómo maneja la concurrencia en operaciones simultáneas sobre la misma cuenta?\n\n- ?\n\n¿Qué papel juegan los triggers en la validación de transacciones?\n\n- ?\n\n¿Cómo implementaría límites de transacciones y detección de fraude?"
    },
    {
      "type": "code",
      "title": "Ejemplo adicional: preguntas típicas de la defensa técnica",
      "md": "### Prepara respuestas, no solo código\n\nEstas son preguntas frecuentes que un evaluador puede hacer sobre un sistema como el bancario, incluso si el código \"funciona\":\n\n1. **\"¿Por qué usaron un trigger aquí en vez de una restricción CHECK?\"** — Debes poder justificar la decisión de diseño, no solo que \"funcionó\".\n2. **\"¿Qué pasa si dos personas transfieren dinero desde la misma cuenta al mismo tiempo?\"** — Se espera que mencionen bloqueo de filas (`FOR UPDATE`) y control transaccional.\n3. **\"Muéstrame qué pasa si el saldo queda en negativo.\"** — Debe fallar de forma controlada (CHECK constraint o validación explícita), no romper la aplicación.\n4. **\"¿Por qué esta consulta del reporte es tan lenta?\"** — Se espera que sepan leer un EXPLAIN PLAN básico, no solo que \"funciona en su computadora\".\n5. **\"Si tuvieran que agregar un nuevo tipo de cuenta, ¿qué archivos/objetos tendrían que tocar?\"** — Evalúa qué tan bien organizado y desacoplado quedó el sistema."
    },
    {
      "type": "content",
      "title": "Errores comunes en la presentación final",
      "md": "### ⚠️ Errores frecuentes\n\n- **No poder explicar el \"por qué\" de una decisión propia.** Haber copiado o dejado que un solo integrante escribiera cierta parte sin que el resto del equipo la entienda es evidente en la defensa técnica.\n- **Depender de datos cargados manualmente durante la demo.** Si algo falla en vivo por datos mal cargados, toda la presentación se ve afectada; conviene tener un script de datos de prueba (\"seed\") listo y probado de antemano.\n- **No probar casos límite antes de presentar.** Muchas demos fallan justo con el caso que el profesor prueba primero: saldo insuficiente, cuenta inexistente, montos negativos.\n- **Repartirse el conocimiento en vez del trabajo.** Si solo una persona del equipo puede responder preguntas técnicas, el resto queda expuesto en la defensa individual.\n- **Improvisar la demo sin un guion.** Tener un flujo claro de qué se va a mostrar y en qué orden evita perder tiempo navegando la aplicación en vivo sin rumbo."
    },
    {
      "type": "exercise",
      "title": "Practica antes de la presentación",
      "md": "### 📝 Ejercicio propuesto (resuélvelo primero)\n\nCon tu equipo, respondan por escrito estas 3 preguntas antes del día de la presentación:\n\n1. ¿Por qué eligieron PL/SQL (triggers/procedimientos) para esta regla de negocio específica, en vez de resolverla en la aplicación cliente?\n2. ¿Qué pasaría si la tabla de transacciones creciera a 10 millones de filas? ¿Qué cambiarían?\n3. Si el profesor pide agregar \"transferencias entre bancos\" como nueva funcionalidad, ¿qué tendrían que modificar en su diseño actual?"
    },
    {
      "title": "Preparación para la Presentación",
      "subtitle": null,
      "type": "exercise",
      "md": "### Lista de Preparación del Sistema Bancario:\n\n- **1.** Preparar demo de operaciones bancarias: depósitos, retiros y transferencias\n\n- **2.** Explicar arquitectura del MER bancario y relaciones entre entidades\n\n- **3.** Demostrar funcionamiento de paquetes PL/SQL y triggers de validación\n\n- **4.** Mostrar sistema de auditoría y trazabilidad de transacciones\n\n- **5.** Practicar respuestas sobre seguridad y manejo de errores bancarios"
    }
  ]
};
