import { SlideViewer } from "../slide-viewer"

const week7Slides = [
  {
    id: 1,
    title: "Excepciones y Colecciones",
    subtitle: "Manejo avanzado de errores y estructuras de datos complejas",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Módulo 1: Fundamentos de PL/SQL</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Técnicas avanzadas para el manejo robusto de errores y procesamiento eficiente de datos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">🚨 Manejo de Excepciones</h4>
            <ul className="text-sm space-y-2">
              <li>• Excepciones predefinidas de Oracle</li>
              <li>• Excepciones definidas por el usuario</li>
              <li>• Propagación y manejo de errores</li>
              <li>• Logging y auditoría de errores</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">📊 Colecciones Avanzadas</h4>
            <ul className="text-sm space-y-2">
              <li>• BULK COLLECT para rendimiento</li>
              <li>• FORALL para operaciones masivas</li>
              <li>• VARRAY y Nested Tables</li>
              <li>• Associative Arrays</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Excepciones Predefinidas",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Excepciones Comunes en PL/SQL</h3>
        </div>

        <div className="grid gap-4">
          {[
            {
              name: "NO_DATA_FOUND",
              description: "SELECT INTO no encuentra registros",
              color: "red",
              code: "ORA-01403",
            },
            {
              name: "TOO_MANY_ROWS",
              description: "SELECT INTO encuentra múltiples registros",
              color: "orange",
              code: "ORA-01422",
            },
            {
              name: "DUP_VAL_ON_INDEX",
              description: "Violación de constraint UNIQUE",
              color: "yellow",
              code: "ORA-00001",
            },
            {
              name: "VALUE_ERROR",
              description: "Error de conversión de tipos",
              color: "blue",
              code: "ORA-06502",
            },
            {
              name: "INVALID_CURSOR",
              description: "Operación inválida en cursor",
              color: "purple",
              code: "ORA-01001",
            },
          ].map((exc, index) => (
            <div
              key={index}
              className={`border-l-4 border-${exc.color}-500 bg-${exc.color}-50 dark:bg-${exc.color}-900/20 p-4 rounded-r-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-semibold text-${exc.color}-700 dark:text-${exc.color}-300`}>{exc.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{exc.description}</p>
                </div>
                <span className={`bg-${exc.color}-500 text-white px-2 py-1 rounded text-xs font-mono`}>{exc.code}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Manejo de Excepciones - Ejemplo",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Estructura Completa de Manejo de Errores</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`DECLARE
    v_nombre empleados.nombre%TYPE;
    v_salario empleados.salario%TYPE;
    v_count NUMBER;
    
    -- Excepción personalizada
    empleado_inactivo EXCEPTION;
    PRAGMA EXCEPTION_INIT(empleado_inactivo, -20001);
    
BEGIN
    -- Verificar si el empleado existe y está activo
    SELECT COUNT(*) INTO v_count
    FROM empleados 
    WHERE id_empleado = 999 AND estado = 'ACTIVO';
    
    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Empleado no encontrado o inactivo');
    END IF;
    
    -- Obtener datos del empleado
    SELECT nombre, salario 
    INTO v_nombre, v_salario
    FROM empleados 
    WHERE id_empleado = 999;
    
    DBMS_OUTPUT.PUT_LINE('Empleado: ' || v_nombre);
    DBMS_OUTPUT.PUT_LINE('Salario: ' || TO_CHAR(v_salario, '999,999.99'));
    
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: No se encontró el empleado especificado');
        -- Log del error
        INSERT INTO error_log (fecha, error_code, mensaje)
        VALUES (SYSDATE, 'NO_DATA_FOUND', 'Empleado ID 999 no encontrado');
        
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: Se encontraron múltiples empleados');
        
    WHEN empleado_inactivo THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
        
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('ERROR INESPERADO: ' || SQLERRM);
        DBMS_OUTPUT.PUT_LINE('Código de error: ' || SQLCODE);
        -- Re-lanzar la excepción si es crítica
        IF SQLCODE < -20000 THEN
            RAISE;
        END IF;
END;
/`}</pre>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Mejores Prácticas:</h4>
          <ul className="text-sm space-y-1">
            <li>• Usar excepciones específicas antes que OTHERS</li>
            <li>• Registrar errores en tablas de log para auditoría</li>
            <li>• PRAGMA EXCEPTION_INIT para asociar códigos de error</li>
            <li>• RAISE para re-lanzar excepciones críticas</li>
            <li>• SQLERRM y SQLCODE para información detallada</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "BULK COLLECT y FORALL",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Procesamiento Masivo de Datos</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">BULK COLLECT</h4>
            <ul className="text-sm space-y-2">
              <li>• Recupera múltiples filas en una operación</li>
              <li>• Reduce context switches SQL-PL/SQL</li>
              <li>• Mejora significativa del rendimiento</li>
              <li>• Se usa con SELECT INTO y cursores</li>
              <li>• Ideal para procesamiento de lotes</li>
            </ul>

            <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded">
              <div className="text-xs font-mono">
                <div className="text-green-600">✓ Con BULK COLLECT</div>
                <div className="text-gray-500">1 context switch para 1000 filas</div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">FORALL</h4>
            <ul className="text-sm space-y-2">
              <li>• Ejecuta DML para múltiples valores</li>
              <li>• Procesa colecciones completas</li>
              <li>• Optimiza INSERT, UPDATE, DELETE</li>
              <li>• Manejo de errores con SAVE EXCEPTIONS</li>
              <li>• Complemento perfecto de BULK COLLECT</li>
            </ul>

            <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded">
              <div className="text-xs font-mono">
                <div className="text-purple-600">✓ Con FORALL</div>
                <div className="text-gray-500">1 context switch para 1000 operaciones</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">⚡ Comparación de Rendimiento</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-red-600">Método Tradicional</div>
              <div className="text-2xl font-bold text-red-600">1000</div>
              <div className="text-gray-500">context switches</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">BULK COLLECT + FORALL</div>
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-gray-500">context switches</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-600">Mejora</div>
              <div className="text-2xl font-bold text-blue-600">500x</div>
              <div className="text-gray-500">más rápido</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Ejemplo Práctico - BULK Operations",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Procesamiento Masivo con Colecciones</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`DECLARE
    -- Definir tipos de colección
    TYPE t_empleados IS TABLE OF empleados%ROWTYPE;
    TYPE t_ids IS TABLE OF NUMBER;
    TYPE t_salarios IS TABLE OF NUMBER;
    
    v_empleados t_empleados;
    v_ids_actualizacion t_ids := t_ids();
    v_nuevos_salarios t_salarios := t_salarios();
    
    -- Variables para control
    v_batch_size CONSTANT NUMBER := 1000;
    v_total_procesados NUMBER := 0;
    
BEGIN
    -- BULK COLLECT con LIMIT para manejar grandes volúmenes
    FOR emp_cursor IN (
        SELECT * FROM empleados 
        WHERE departamento_id = 10 
        ORDER BY id_empleado
    ) LOOP
        -- Procesar en lotes
        SELECT * BULK COLLECT INTO v_empleados
        FROM empleados
        WHERE departamento_id = 10
        AND ROWNUM <= v_batch_size;
        
        -- Preparar datos para actualización masiva
        FOR i IN 1..v_empleados.COUNT LOOP
            v_ids_actualizacion.EXTEND;
            v_nuevos_salarios.EXTEND;
            
            v_ids_actualizacion(v_ids_actualizacion.COUNT) := v_empleados(i).id_empleado;
            -- Aumentar salario 10% si es menor a 5000
            IF v_empleados(i).salario < 5000 THEN
                v_nuevos_salarios(v_nuevos_salarios.COUNT) := v_empleados(i).salario * 1.10;
            ELSE
                v_nuevos_salarios(v_nuevos_salarios.COUNT) := v_empleados(i).salario * 1.05;
            END IF;
        END LOOP;
        
        -- FORALL para actualización masiva
        FORALL i IN 1..v_ids_actualizacion.COUNT SAVE EXCEPTIONS
            UPDATE empleados 
            SET salario = v_nuevos_salarios(i),
                fecha_modificacion = SYSDATE
            WHERE id_empleado = v_ids_actualizacion(i);
        
        v_total_procesados := v_total_procesados + v_empleados.COUNT;
        
        -- Limpiar colecciones para siguiente lote
        v_ids_actualizacion.DELETE;
        v_nuevos_salarios.DELETE;
        
        EXIT WHEN v_empleados.COUNT < v_batch_size;
    END LOOP;
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Total empleados procesados: ' || v_total_procesados);
    
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error en procesamiento masivo: ' || SQLERRM);
        
        -- Mostrar errores específicos de FORALL
        FOR i IN 1..SQL%BULK_EXCEPTIONS.COUNT LOOP
            DBMS_OUTPUT.PUT_LINE('Error ' || i || ': ' || 
                               SQL%BULK_EXCEPTIONS(i).ERROR_CODE || ' - ' ||
                               SQL%BULK_EXCEPTIONS(i).ERROR_INDEX);
        END LOOP;
END;
/`}</pre>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Características Avanzadas:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>LIMIT:</strong> Controla memoria usando lotes pequeños
            </li>
            <li>
              • <strong>SAVE EXCEPTIONS:</strong> Continúa procesando aunque haya errores
            </li>
            <li>
              • <strong>SQL%BULK_EXCEPTIONS:</strong> Información detallada de errores
            </li>
            <li>
              • <strong>DELETE:</strong> Limpia colecciones para reutilización
            </li>
            <li>
              • <strong>EXTEND:</strong> Agrega espacio a nested tables
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Tipos de Colecciones",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Comparación de Estructuras de Datos</h3>
        </div>

        <div className="grid gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-3">VARRAY (Variable Array)</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Características:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Tamaño máximo fijo definido en creación</li>
                  <li>• Elementos almacenados en orden secuencial</li>
                  <li>• Índices numéricos consecutivos (1..n)</li>
                  <li>• Puede almacenarse en tablas de BD</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                <div className="font-mono text-xs">
                  <div className="text-blue-600">TYPE t_numeros IS</div>
                  <div className="text-blue-600">VARRAY(10) OF NUMBER;</div>
                  <div className="mt-2 text-gray-500">Max: 10 elementos</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-green-600 mb-3">Nested Tables</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Características:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Tamaño dinámico, puede crecer ilimitadamente</li>
                  <li>• Elementos pueden eliminarse (gaps permitidos)</li>
                  <li>• Índices numéricos no necesariamente consecutivos</li>
                  <li>• Puede almacenarse en tablas de BD</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                <div className="font-mono text-xs">
                  <div className="text-green-600">TYPE t_nombres IS</div>
                  <div className="text-green-600">TABLE OF VARCHAR2(50);</div>
                  <div className="mt-2 text-gray-500">Tamaño: Ilimitado</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-600 mb-3">Associative Arrays (INDEX BY)</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Características:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Índices pueden ser strings o números</li>
                  <li>• Solo existe en memoria (no en BD)</li>
                  <li>• Acceso muy rápido tipo hash table</li>
                  <li>• Ideal para lookups y caches</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                <div className="font-mono text-xs">
                  <div className="text-purple-600">TYPE t_cache IS TABLE OF</div>
                  <div className="text-purple-600">NUMBER INDEX BY VARCHAR2(50);</div>
                  <div className="mt-2 text-gray-500">Índice: String/Number</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Ejercicios Prácticos",
    subtitle: "Aplicando excepciones y colecciones",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Desafíos de Programación Avanzada - Sistema Trilladora</h3>
        </div>

        <div className="grid gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">
              🚨 Ejercicio 1: Sistema de Manejo de Errores para Entradas
            </h4>
            <p className="text-sm mb-3">
              Crear un procedimiento robusto para registrar entradas de productos que maneje todas las excepciones
              posibles.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Validar datos de entrada usando CURSODB.TBL_ENTRADAS y TBL_PRODUCTOS</li>
              <li>• Manejar duplicados, valores inválidos, constraints de FK</li>
              <li>• Registrar todos los errores en tabla de auditoría personalizada</li>
              <li>• Implementar reintentos automáticos para errores temporales</li>
              <li>• Validar que COD_PRODUCTO existe en TBL_PRODUCTOS antes de insertar</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
              📊 Ejercicio 2: Procesamiento Masivo de Inventarios
            </h4>
            <p className="text-sm mb-3">
              Implementar actualización masiva de inventarios usando BULK COLLECT y FORALL con tablas reales.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Procesar 1000+ registros de CURSODB.TBL_INVENTARIOS en lotes</li>
              <li>• Actualizar INVEN_TOTAL = INVEN_PISO1 + INVEN_PISO2 automáticamente</li>
              <li>• Manejar errores individuales sin afectar el lote completo</li>
              <li>• Generar reporte con estadísticas de procesamiento</li>
              <li>• Sincronizar con TBL_HISTORICOSINVEN para auditoría</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">
              🗂️ Ejercicio 3: Sistema de Cache para Productos
            </h4>
            <p className="text-sm mb-3">
              Desarrollar un sistema de cache usando Associative Arrays para datos de TBL_PRODUCTOS.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Cache de productos por COD_PRODUCTO con datos completos</li>
              <li>• Cache de precios y pesos para cálculos rápidos</li>
              <li>• Implementar TTL para invalidar cache de productos</li>
              <li>• Métricas de hit/miss ratio del cache</li>
              <li>• Integración con TBL_LOTES para información de vencimientos</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
]

export function Week7Slides() {
  return <SlideViewer slides={week7Slides} moduleTitle="Módulo 1: Fundamentos de PL/SQL" weekNumber={7} />
}

export default Week7Slides
