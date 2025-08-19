import { SlideViewer } from "../slide-viewer"

const week14Slides = [
  {
    id: 1,
    title: "Optimización de Consultas",
    subtitle: "Mejorando el rendimiento de la base de datos",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Performance Tuning en Oracle</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            La optimización es clave para aplicaciones escalables y eficientes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Factores de Rendimiento</h4>
            <ul className="text-sm space-y-1">
              <li>• Diseño de consultas SQL</li>
              <li>• Índices apropiados</li>
              <li>• Estadísticas actualizadas</li>
              <li>• Configuración de memoria</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Herramientas de Análisis</h4>
            <ul className="text-sm space-y-1">
              <li>• EXPLAIN PLAN</li>
              <li>• AUTOTRACE</li>
              <li>• SQL Trace</li>
              <li>• AWR Reports</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Métricas Clave</h4>
            <ul className="text-sm space-y-1">
              <li>• Tiempo de respuesta</li>
              <li>• Throughput (transacciones/seg)</li>
              <li>• I/O físico vs lógico</li>
              <li>• CPU utilization</li>
            </ul>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Metodología de Optimización</h4>
          <div className="flex justify-between items-center text-sm">
            <span className="bg-orange-200 dark:bg-orange-800 px-3 py-1 rounded">1. Identificar</span>
            <span>→</span>
            <span className="bg-orange-200 dark:bg-orange-800 px-3 py-1 rounded">2. Analizar</span>
            <span>→</span>
            <span className="bg-orange-200 dark:bg-orange-800 px-3 py-1 rounded">3. Optimizar</span>
            <span>→</span>
            <span className="bg-orange-200 dark:bg-orange-800 px-3 py-1 rounded">4. Verificar</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "EXPLAIN PLAN",
    subtitle: "Analizando planes de ejecución",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Usando EXPLAIN PLAN</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            EXPLAIN PLAN muestra cómo Oracle ejecutará una consulta sin ejecutarla realmente
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Generar Plan de Ejecución</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Generar plan para una consulta
EXPLAIN PLAN FOR
SELECT e.nombre, d.nombre_dept, e.salario
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.dept_id
WHERE e.salario > 5000
ORDER BY e.salario DESC;

-- Ver el plan generado
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- Plan con más detalles
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY(NULL, NULL, 'BASIC +COST +BYTES'));`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">Interpretar el Plan</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`Plan hash value: 2851391496

--------------------------------------------------------------------------
| Id  | Operation          | Name        | Rows  | Bytes | Cost (%CPU)|
--------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |             |    10 |   520 |     8  (25)|
|   1 |  SORT ORDER BY     |             |    10 |   520 |     8  (25)|
|*  2 |   HASH JOIN        |             |    10 |   520 |     7  (15)|
|*  3 |    TABLE ACCESS FULL| EMPLEADOS  |    10 |   360 |     3   (0)|
|   4 |    TABLE ACCESS FULL| DEPARTAMENTOS|     4 |    64 |     3   (0)|
--------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access("E"."DEPARTAMENTO_ID"="D"."DEPT_ID")
   3 - filter("E"."SALARIO">5000)`}</pre>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Elementos del Plan</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Id:</strong> Orden de ejecución
              </li>
              <li>
                • <strong>Operation:</strong> Tipo de operación
              </li>
              <li>
                • <strong>Rows:</strong> Filas estimadas
              </li>
              <li>
                • <strong>Cost:</strong> Costo estimado
              </li>
              <li>
                • <strong>%CPU:</strong> Porcentaje de CPU
              </li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Operaciones Comunes</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>TABLE ACCESS FULL:</strong> Scan completo
              </li>
              <li>
                • <strong>INDEX RANGE SCAN:</strong> Búsqueda por índice
              </li>
              <li>
                • <strong>HASH JOIN:</strong> Join por hash
              </li>
              <li>
                • <strong>NESTED LOOPS:</strong> Join anidado
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Índices en Oracle",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Tipos de Índices</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">B-Tree Index (Por Defecto)</h4>
            <ul className="text-sm space-y-1">
              <li>• Estructura balanceada</li>
              <li>• Ideal para búsquedas exactas y rangos</li>
              <li>• Soporta ORDER BY eficientemente</li>
              <li>• Único o no único</li>
            </ul>
            <div className="mt-2 bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
              CREATE INDEX idx_emp_salario ON empleados(salario);
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Bitmap Index</h4>
            <ul className="text-sm space-y-1">
              <li>• Para columnas con pocos valores distintos</li>
              <li>• Excelente para consultas analíticas</li>
              <li>• Problemas con DML concurrente</li>
              <li>• Ideal para data warehouses</li>
            </ul>
            <div className="mt-2 bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
              CREATE BITMAP INDEX idx_emp_genero ON empleados(genero);
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Function-Based Index</h4>
            <ul className="text-sm space-y-1">
              <li>• Índice sobre expresiones</li>
              <li>• Para consultas con funciones</li>
              <li>• Mejora búsquedas case-insensitive</li>
            </ul>
            <div className="mt-2 bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
              CREATE INDEX idx_emp_upper_name ON empleados(UPPER(nombre));
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Composite Index</h4>
            <ul className="text-sm space-y-1">
              <li>• Múltiples columnas</li>
              <li>• Orden de columnas importante</li>
              <li>• Útil para consultas complejas</li>
            </ul>
            <div className="mt-2 bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
              CREATE INDEX idx_emp_dept_sal ON empleados(departamento_id, salario);
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Consideraciones para Índices</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Cuándo Crear:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Columnas en WHERE frecuentemente</li>
                <li>• Columnas de JOIN</li>
                <li>• Columnas de ORDER BY</li>
                <li>• Foreign keys</li>
              </ul>
            </div>
            <div>
              <strong>Cuándo NO Crear:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Tablas muy pequeñas</li>
                <li>• Columnas que cambian frecuentemente</li>
                <li>• Tablas con mucho DML</li>
                <li>• Cuando el costo supera el beneficio</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Gestión de Estadísticas",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">DBMS_STATS - Estadísticas del Optimizador</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Las estadísticas precisas son fundamentales para que el optimizador genere planes eficientes
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Recopilar Estadísticas</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Estadísticas de una tabla
EXEC DBMS_STATS.GATHER_TABLE_STATS('HR', 'EMPLEADOS');

-- Estadísticas con histogramas
EXEC DBMS_STATS.GATHER_TABLE_STATS(
    ownname => 'HR',
    tabname => 'EMPLEADOS',
    method_opt => 'FOR ALL COLUMNS SIZE AUTO',
    cascade => TRUE  -- Incluir índices
);

-- Estadísticas de todo un esquema
EXEC DBMS_STATS.GATHER_SCHEMA_STATS('HR');

-- Estadísticas de toda la base de datos
EXEC DBMS_STATS.GATHER_DATABASE_STATS(
    estimate_percent => DBMS_STATS.AUTO_SAMPLE_SIZE,
    method_opt => 'FOR ALL COLUMNS SIZE AUTO',
    cascade => TRUE
);`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">Consultar Estadísticas</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Ver estadísticas de tabla
SELECT table_name, num_rows, blocks, avg_row_len, last_analyzed
FROM user_tables
WHERE table_name = 'EMPLEADOS';

-- Ver estadísticas de columnas
SELECT column_name, num_distinct, density, num_nulls, histogram
FROM user_tab_col_statistics
WHERE table_name = 'EMPLEADOS';

-- Ver estadísticas de índices
SELECT index_name, blevel, leaf_blocks, distinct_keys, clustering_factor
FROM user_indexes
WHERE table_name = 'EMPLEADOS';

-- Histogramas de una columna
SELECT endpoint_number, endpoint_value
FROM user_tab_histograms
WHERE table_name = 'EMPLEADOS' AND column_name = 'SALARIO';`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Gestión Avanzada</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Bloquear estadísticas (evitar cambios automáticos)
EXEC DBMS_STATS.LOCK_TABLE_STATS('HR', 'EMPLEADOS');

-- Desbloquear estadísticas
EXEC DBMS_STATS.UNLOCK_TABLE_STATS('HR', 'EMPLEADOS');

-- Exportar estadísticas
EXEC DBMS_STATS.CREATE_STAT_TABLE('HR', 'STATS_BACKUP');
EXEC DBMS_STATS.EXPORT_TABLE_STATS('HR', 'EMPLEADOS', stattab => 'STATS_BACKUP');

-- Restaurar estadísticas
EXEC DBMS_STATS.IMPORT_TABLE_STATS('HR', 'EMPLEADOS', stattab => 'STATS_BACKUP');

-- Eliminar estadísticas
EXEC DBMS_STATS.DELETE_TABLE_STATS('HR', 'EMPLEADOS');`}</pre>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Hints del Optimizador",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Dirigiendo al Optimizador</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Los hints permiten influir en las decisiones del optimizador cuando es necesario
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Hints de Acceso</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Forzar uso de índice
SELECT /*+ INDEX(e idx_emp_salario) */ nombre, salario
FROM empleados e
WHERE salario > 5000;

-- Forzar full table scan
SELECT /*+ FULL(e) */ nombre, salario
FROM empleados e
WHERE departamento_id = 10;

-- Usar índice específico para join
SELECT /*+ USE_NL(e d) INDEX(e idx_emp_dept) */ 
       e.nombre, d.nombre_dept
FROM empleados e, departamentos d
WHERE e.departamento_id = d.dept_id;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">Hints de Join</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Forzar hash join
SELECT /*+ USE_HASH(e d) */ e.nombre, d.nombre_dept
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.dept_id;

-- Forzar nested loop join
SELECT /*+ USE_NL(e d) */ e.nombre, d.nombre_dept
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.dept_id;

-- Forzar sort merge join
SELECT /*+ USE_MERGE(e d) */ e.nombre, d.nombre_dept
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.dept_id;

-- Controlar orden de join
SELECT /*+ LEADING(d e) */ e.nombre, d.nombre_dept
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.dept_id;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Hints de Optimización</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Optimizar para primera fila
SELECT /*+ FIRST_ROWS(10) */ nombre, salario
FROM empleados
WHERE departamento_id = 10
ORDER BY salario DESC;

-- Optimizar para todas las filas
SELECT /*+ ALL_ROWS */ nombre, salario
FROM empleados
WHERE salario > 3000;

-- Usar paralelismo
SELECT /*+ PARALLEL(e, 4) */ COUNT(*)
FROM empleados e;

-- Evitar paralelismo
SELECT /*+ NO_PARALLEL(e) */ nombre, salario
FROM empleados e;`}</pre>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Precauciones con Hints</h4>
          <ul className="text-sm space-y-1">
            <li>• Usar solo cuando sea realmente necesario</li>
            <li>• Documentar por qué se usa cada hint</li>
            <li>• Revisar periódicamente si siguen siendo necesarios</li>
            <li>• Pueden volverse obsoletos con cambios en datos</li>
            <li>• Prefiere soluciones estructurales (índices, estadísticas)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Ejercicio Práctico",
    subtitle: "Optimización de Consultas",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Ejercicio: Análisis y Optimización de Performance</h3>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Parte 1: Preparar Datos de Prueba</h4>
          <ol className="text-sm space-y-1">
            <li>
              1. Crear tabla <strong>ventas</strong> con 100,000+ registros
            </li>
            <li>2. Columnas: venta_id, producto_id, cliente_id, fecha_venta, monto, region</li>
            <li>
              3. Crear tabla <strong>productos</strong> con 1,000 productos
            </li>
            <li>
              4. Crear tabla <strong>clientes</strong> con 10,000 clientes
            </li>
            <li>5. Poblar con datos realistas usando PL/SQL</li>
          </ol>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Parte 2: Consultas Problemáticas</h4>
          <p className="text-sm mb-2">Analizar estas consultas con EXPLAIN PLAN:</p>
          <ol className="text-sm space-y-1">
            <li>1. Reporte de ventas por región y mes (sin índices)</li>
            <li>2. Top 10 productos más vendidos</li>
            <li>3. Clientes con ventas superiores al promedio</li>
            <li>4. Join complejo entre las tres tablas con filtros</li>
          </ol>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Parte 3: Optimización</h4>
          <ol className="text-sm space-y-1">
            <li>1. Crear índices apropiados basados en los planes</li>
            <li>2. Actualizar estadísticas de todas las tablas</li>
            <li>3. Reescribir consultas ineficientes</li>
            <li>4. Experimentar con hints cuando sea necesario</li>
            <li>5. Medir mejoras en tiempo de ejecución</li>
          </ol>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">Parte 4: Documentación</h4>
          <ol className="text-sm space-y-1">
            <li>1. Documentar planes de ejecución antes y después</li>
            <li>2. Registrar tiempos de ejecución</li>
            <li>3. Justificar cada índice creado</li>
            <li>4. Crear recomendaciones para mantenimiento</li>
          </ol>
        </div>
      </div>
    ),
  },
]

export function Week14Slides() {
  return <SlideViewer slides={week14Slides} moduleTitle="Módulo 2: Administración Oracle DBA" weekNumber={14} />
}
