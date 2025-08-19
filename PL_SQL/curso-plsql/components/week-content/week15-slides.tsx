import { SlideViewer } from "../slide-viewer"

const week15Slides = [
  {
    id: 1,
    title: "Gestión de Almacenamiento",
    subtitle: "Tablespaces y Datafiles",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Arquitectura de Almacenamiento Oracle</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Comprender y gestionar el almacenamiento físico de la base de datos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Jerarquía de Almacenamiento</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>
                  <strong>Database</strong> - Nivel más alto
                </span>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>
                  <strong>Tablespaces</strong> - Unidades lógicas
                </span>
              </div>
              <div className="flex items-center gap-2 ml-8">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>
                  <strong>Datafiles</strong> - Archivos físicos
                </span>
              </div>
              <div className="flex items-center gap-2 ml-12">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>
                  <strong>Extents</strong> - Bloques contiguos
                </span>
              </div>
              <div className="flex items-center gap-2 ml-16">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>
                  <strong>Blocks</strong> - Unidad mínima
                </span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Tipos de Tablespaces</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>SYSTEM:</strong> Diccionario de datos
              </li>
              <li>
                • <strong>SYSAUX:</strong> Componentes auxiliares
              </li>
              <li>
                • <strong>USERS:</strong> Objetos de usuario por defecto
              </li>
              <li>
                • <strong>TEMP:</strong> Operaciones temporales
              </li>
              <li>
                • <strong>UNDO:</strong> Información de rollback
              </li>
              <li>
                • <strong>Personalizados:</strong> Para aplicaciones
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Beneficios de la Gestión Adecuada</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Rendimiento:</strong>
              <p className="text-xs mt-1">Distribución eficiente de I/O</p>
            </div>
            <div>
              <strong>Mantenimiento:</strong>
              <p className="text-xs mt-1">Backup y recovery granular</p>
            </div>
            <div>
              <strong>Escalabilidad:</strong>
              <p className="text-xs mt-1">Crecimiento controlado</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Creación de Tablespaces",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Comandos para Gestión de Tablespaces</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Tablespace Básico</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Crear tablespace básico
CREATE TABLESPACE app_data
DATAFILE '/u01/oradata/orcl/app_data01.dbf' SIZE 100M
AUTOEXTEND ON NEXT 10M MAXSIZE 1G
EXTENT MANAGEMENT LOCAL
SEGMENT SPACE MANAGEMENT AUTO;

-- Tablespace con múltiples datafiles
CREATE TABLESPACE large_data
DATAFILE '/u01/oradata/orcl/large_data01.dbf' SIZE 500M,
         '/u02/oradata/orcl/large_data02.dbf' SIZE 500M
AUTOEXTEND ON NEXT 50M MAXSIZE 2G
EXTENT MANAGEMENT LOCAL
UNIFORM SIZE 1M;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">Tablespace Temporal</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Crear tablespace temporal
CREATE TEMPORARY TABLESPACE temp_large
TEMPFILE '/u01/oradata/orcl/temp_large01.dbf' SIZE 200M
AUTOEXTEND ON NEXT 20M MAXSIZE 1G
EXTENT MANAGEMENT LOCAL
UNIFORM SIZE 1M;

-- Asignar como temporal por defecto
ALTER DATABASE DEFAULT TEMPORARY TABLESPACE temp_large;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Tablespace UNDO</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Crear tablespace UNDO
CREATE UNDO TABLESPACE undo_large
DATAFILE '/u01/oradata/orcl/undo_large01.dbf' SIZE 300M
AUTOEXTEND ON NEXT 30M MAXSIZE 2G;

-- Cambiar a nuevo tablespace UNDO
ALTER SYSTEM SET UNDO_TABLESPACE = undo_large;

-- Verificar cambio
SHOW PARAMETER undo_tablespace;`}</pre>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Parámetros Importantes:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>EXTENT MANAGEMENT LOCAL:</strong> Gestión local de extents (recomendado)
            </li>
            <li>
              • <strong>SEGMENT SPACE MANAGEMENT AUTO:</strong> Gestión automática de espacio
            </li>
            <li>
              • <strong>UNIFORM SIZE:</strong> Todos los extents del mismo tamaño
            </li>
            <li>
              • <strong>AUTOEXTEND:</strong> Crecimiento automático cuando sea necesario
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Gestión de Datafiles",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Administración de Archivos de Datos</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Agregar Datafiles</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Agregar datafile a tablespace existente
ALTER TABLESPACE app_data
ADD DATAFILE '/u03/oradata/orcl/app_data02.dbf' SIZE 200M
AUTOEXTEND ON NEXT 20M MAXSIZE 1G;

-- Agregar múltiples datafiles
ALTER TABLESPACE large_data
ADD DATAFILE '/u04/oradata/orcl/large_data03.dbf' SIZE 500M,
             '/u05/oradata/orcl/large_data04.dbf' SIZE 500M;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">Redimensionar Datafiles</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Aumentar tamaño de datafile
ALTER DATABASE DATAFILE '/u01/oradata/orcl/app_data01.dbf' 
RESIZE 500M;

-- Modificar autoextend
ALTER DATABASE DATAFILE '/u01/oradata/orcl/app_data01.dbf'
AUTOEXTEND ON NEXT 50M MAXSIZE 2G;

-- Desactivar autoextend
ALTER DATABASE DATAFILE '/u01/oradata/orcl/app_data01.dbf'
AUTOEXTEND OFF;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Mover y Renombrar Datafiles</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Método 1: Tablespace offline
ALTER TABLESPACE app_data OFFLINE;
-- Mover archivo físicamente en el SO
-- mv /u01/oradata/orcl/app_data01.dbf /u02/oradata/orcl/app_data01.dbf
ALTER TABLESPACE app_data 
RENAME DATAFILE '/u01/oradata/orcl/app_data01.dbf' 
TO '/u02/oradata/orcl/app_data01.dbf';
ALTER TABLESPACE app_data ONLINE;

-- Método 2: Para tablespaces SYSTEM (requiere shutdown)
SHUTDOWN IMMEDIATE;
STARTUP MOUNT;
ALTER DATABASE 
RENAME FILE '/u01/oradata/orcl/system01.dbf' 
TO '/u02/oradata/orcl/system01.dbf';
ALTER DATABASE OPEN;`}</pre>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Monitoreo de Espacio",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Vistas del Diccionario para Monitoreo</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Información de Tablespaces</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Información general de tablespaces
SELECT tablespace_name, status, contents, extent_management, 
       segment_space_management
FROM dba_tablespaces;

-- Espacio usado y libre por tablespace
SELECT ts.tablespace_name,
       ROUND(ts.total_mb, 2) AS total_mb,
       ROUND(fs.free_mb, 2) AS free_mb,
       ROUND((ts.total_mb - fs.free_mb), 2) AS used_mb,
       ROUND(((ts.total_mb - fs.free_mb) / ts.total_mb) * 100, 2) AS pct_used
FROM (SELECT tablespace_name, SUM(bytes)/1024/1024 AS total_mb
      FROM dba_data_files
      GROUP BY tablespace_name) ts,
     (SELECT tablespace_name, SUM(bytes)/1024/1024 AS free_mb
      FROM dba_free_space
      GROUP BY tablespace_name) fs
WHERE ts.tablespace_name = fs.tablespace_name
ORDER BY pct_used DESC;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">Información de Datafiles</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Detalles de datafiles
SELECT file_name, tablespace_name, 
       ROUND(bytes/1024/1024, 2) AS size_mb,
       ROUND(maxbytes/1024/1024, 2) AS max_size_mb,
       autoextensible, status
FROM dba_data_files
ORDER BY tablespace_name, file_id;

-- Datafiles que pueden crecer
SELECT file_name, tablespace_name,
       ROUND(bytes/1024/1024, 2) AS current_mb,
       ROUND(maxbytes/1024/1024, 2) AS max_mb,
       ROUND((maxbytes - bytes)/1024/1024, 2) AS can_grow_mb
FROM dba_data_files
WHERE autoextensible = 'YES'
AND maxbytes > bytes;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Alertas de Espacio</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Tablespaces con más del 85% de uso
SELECT tablespace_name,
       ROUND(used_percent, 2) AS pct_used,
       ROUND(total_mb, 2) AS total_mb,
       ROUND(free_mb, 2) AS free_mb
FROM (
    SELECT ts.tablespace_name,
           (ts.total_mb - NVL(fs.free_mb, 0)) / ts.total_mb * 100 AS used_percent,
           ts.total_mb,
           NVL(fs.free_mb, 0) AS free_mb
    FROM (SELECT tablespace_name, SUM(bytes)/1024/1024 AS total_mb
          FROM dba_data_files GROUP BY tablespace_name) ts
    LEFT JOIN (SELECT tablespace_name, SUM(bytes)/1024/1024 AS free_mb
               FROM dba_free_space GROUP BY tablespace_name) fs
    ON ts.tablespace_name = fs.tablespace_name
)
WHERE used_percent > 85
ORDER BY used_percent DESC;

-- Objetos más grandes por tablespace
SELECT owner, segment_name, segment_type, tablespace_name,
       ROUND(bytes/1024/1024, 2) AS size_mb
FROM dba_segments
WHERE tablespace_name = 'APP_DATA'
ORDER BY bytes DESC
FETCH FIRST 10 ROWS ONLY;`}</pre>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Mantenimiento de Tablespaces",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Operaciones de Mantenimiento</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Estados de Tablespace</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Poner tablespace offline
ALTER TABLESPACE app_data OFFLINE;

-- Poner tablespace online
ALTER TABLESPACE app_data ONLINE;

-- Modo read-only
ALTER TABLESPACE app_data READ ONLY;

-- Volver a read-write
ALTER TABLESPACE app_data READ WRITE;

-- Verificar estado
SELECT tablespace_name, status 
FROM dba_tablespaces 
WHERE tablespace_name = 'APP_DATA';`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">Coalescing y Defragmentación</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Coalescing de espacio libre (solo para DICTIONARY managed)
ALTER TABLESPACE app_data COALESCE;

-- Ver fragmentación
SELECT tablespace_name, COUNT(*) AS fragments,
       MAX(bytes/1024/1024) AS largest_mb,
       MIN(bytes/1024/1024) AS smallest_mb
FROM dba_free_space
GROUP BY tablespace_name
HAVING COUNT(*) > 1;

-- Reorganizar tabla para reducir fragmentación
ALTER TABLE empleados MOVE TABLESPACE app_data;

-- Reconstruir índices después del MOVE
ALTER INDEX idx_emp_salario REBUILD;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Eliminar Tablespaces</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Eliminar tablespace vacío
DROP TABLESPACE app_data;

-- Eliminar tablespace con contenido
DROP TABLESPACE app_data INCLUDING CONTENTS;

-- Eliminar tablespace, contenido y datafiles
DROP TABLESPACE app_data INCLUDING CONTENTS AND DATAFILES;

-- Eliminar con cascada de constraints
DROP TABLESPACE app_data INCLUDING CONTENTS AND DATAFILES
CASCADE CONSTRAINTS;`}</pre>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Mejores Prácticas:</h4>
          <ul className="text-sm space-y-1">
            <li>• Separar datos, índices y objetos temporales</li>
            <li>• Monitorear crecimiento regularmente</li>
            <li>• Configurar alertas automáticas de espacio</li>
            <li>• Planificar capacidad basada en tendencias</li>
            <li>• Hacer backup antes de operaciones de mantenimiento</li>
            <li>• Documentar la estructura de almacenamiento</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Ejercicio Práctico",
    subtitle: "Gestión Completa de Almacenamiento",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Ejercicio: Diseño de Almacenamiento para Aplicación</h3>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Parte 1: Diseñar Estructura</h4>
          <p className="text-sm mb-2">Crear estructura de tablespaces para una aplicación ERP:</p>
          <ol className="text-sm space-y-1">
            <li>
              1. <strong>ERP_DATA:</strong> Tablas principales (500MB inicial, max 5GB)
            </li>
            <li>
              2. <strong>ERP_INDEX:</strong> Índices (200MB inicial, max 2GB)
            </li>
            <li>
              3. <strong>ERP_TEMP:</strong> Operaciones temporales (100MB inicial, max 1GB)
            </li>
            <li>
              4. <strong>ERP_UNDO:</strong> Información de rollback (300MB inicial, max 3GB)
            </li>
            <li>5. Distribuir datafiles en diferentes discos para rendimiento</li>
          </ol>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Parte 2: Implementar y Poblar</h4>
          <ol className="text-sm space-y-1">
            <li>1. Crear todos los tablespaces con configuración óptima</li>
            <li>2. Crear usuarios asignados a tablespaces apropiados</li>
            <li>3. Crear tablas de ejemplo: empleados, departamentos, proyectos, asignaciones</li>
            <li>4. Poblar con datos de prueba (mínimo 10,000 registros por tabla)</li>
            <li>5. Crear índices en tablespace ERP_INDEX</li>
          </ol>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Parte 3: Monitoreo y Alertas</h4>
          <ol className="text-sm space-y-1">
            <li>1. Crear script de monitoreo de espacio</li>
            <li>2. Identificar tablespaces con más del 80% de uso</li>
            <li>3. Crear procedimiento para alertas automáticas</li>
            <li>4. Generar reporte de crecimiento semanal</li>
            <li>5. Documentar umbrales de alerta recomendados</li>
          </ol>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">
            Parte 4: Operaciones de Mantenimiento
          </h4>
          <ol className="text-sm space-y-1">
            <li>1. Simular crecimiento agregando más datafiles</li>
            <li>2. Mover un datafile a otra ubicación</li>
            <li>3. Reorganizar una tabla fragmentada</li>
            <li>4. Crear tablespace de solo lectura para datos históricos</li>
            <li>5. Documentar procedimientos de mantenimiento</li>
          </ol>
        </div>
      </div>
    ),
  },
]

export function Week15Slides() {
  return <SlideViewer slides={week15Slides} moduleTitle="Módulo 2: Administración Oracle DBA" weekNumber={15} />
}
