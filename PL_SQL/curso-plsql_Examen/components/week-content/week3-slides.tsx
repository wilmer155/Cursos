import { SlideViewer } from "../slide-viewer"

const week3Slides = [
  {
    id: 1,
    title: "Cursores en PL/SQL",
    subtitle: "Procesamiento de múltiples registros",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">¿Qué son los Cursores?</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Los cursores permiten procesar el resultado de una consulta registro por registro
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Cursores Implícitos</h4>
            <ul className="text-sm space-y-1">
              <li>• Creados automáticamente por Oracle</li>
              <li>• Para SELECT INTO y DML</li>
              <li>• Un solo registro</li>
              <li>• Manejo automático</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Cursores Explícitos</h4>
            <ul className="text-sm space-y-1">
              <li>• Definidos por el programador</li>
              <li>• Para múltiples registros</li>
              <li>• Control manual del ciclo</li>
              <li>• OPEN, FETCH, CLOSE</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Ciclo de Vida del Cursor</h4>
          <div className="flex justify-between items-center text-sm">
            <span className="bg-purple-200 dark:bg-purple-800 px-3 py-1 rounded">DECLARE</span>
            <span>→</span>
            <span className="bg-purple-200 dark:bg-purple-800 px-3 py-1 rounded">OPEN</span>
            <span>→</span>
            <span className="bg-purple-200 dark:bg-purple-800 px-3 py-1 rounded">FETCH</span>
            <span>→</span>
            <span className="bg-purple-200 dark:bg-purple-800 px-3 py-1 rounded">CLOSE</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Cursores Explícitos - Sintaxis",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Estructura Básica de un Cursor</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`DECLARE
    -- 1. Declaración del cursor
    CURSOR c_empleados IS
        SELECT emp_id, nombre, salario
        FROM empleados
        WHERE departamento_id = 10;
    
    -- Variables para almacenar datos
    v_emp_id    empleados.emp_id%TYPE;
    v_nombre    empleados.nombre%TYPE;
    v_salario   empleados.salario%TYPE;
    
BEGIN
    -- 2. Abrir el cursor
    OPEN c_empleados;
    
    -- 3. Procesar registros
    LOOP
        FETCH c_empleados INTO v_emp_id, v_nombre, v_salario;
        
        -- Salir cuando no hay más registros
        EXIT WHEN c_empleados%NOTFOUND;
        
        -- Procesar el registro actual
        DBMS_OUTPUT.PUT_LINE('ID: ' || v_emp_id || 
                           ' Nombre: ' || v_nombre || 
                           ' Salario: ' || v_salario);
    END LOOP;
    
    -- 4. Cerrar el cursor
    CLOSE c_empleados;
END;
/`}</pre>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Atributos del Cursor</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>%FOUND:</strong> TRUE si FETCH fue exitoso
              </li>
              <li>
                • <strong>%NOTFOUND:</strong> TRUE si no hay más registros
              </li>
              <li>
                • <strong>%ROWCOUNT:</strong> Número de registros procesados
              </li>
              <li>
                • <strong>%ISOPEN:</strong> TRUE si el cursor está abierto
              </li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Buenas Prácticas</h4>
            <ul className="text-sm space-y-1">
              <li>• Siempre cerrar los cursores</li>
              <li>• Verificar %NOTFOUND para salir</li>
              <li>• Usar %ROWTYPE cuando sea posible</li>
              <li>• Manejar excepciones apropiadamente</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Cursor FOR Loop",
    subtitle: "Simplificando el procesamiento",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Forma Simplificada con FOR Loop</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            El Cursor FOR Loop maneja automáticamente OPEN, FETCH y CLOSE
          </p>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`DECLARE
    CURSOR c_empleados IS
        SELECT emp_id, nombre, salario, departamento_id
        FROM empleados
        WHERE salario > 3000
        ORDER BY salario DESC;
        
BEGIN
    -- Cursor FOR Loop - manejo automático
    FOR emp_rec IN c_empleados LOOP
        DBMS_OUTPUT.PUT_LINE('Empleado: ' || emp_rec.nombre);
        DBMS_OUTPUT.PUT_LINE('Salario: $' || emp_rec.salario);
        DBMS_OUTPUT.PUT_LINE('Depto: ' || emp_rec.departamento_id);
        DBMS_OUTPUT.PUT_LINE('------------------------');
    END LOOP;
    
    -- También se puede usar sin declarar cursor
    FOR emp_rec IN (SELECT nombre, salario 
                    FROM empleados 
                    WHERE departamento_id = 20) LOOP
        DBMS_OUTPUT.PUT_LINE(emp_rec.nombre || ': $' || emp_rec.salario);
    END LOOP;
    
END;
/`}</pre>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Ventajas del Cursor FOR Loop:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>Automático:</strong> No necesita OPEN, FETCH, CLOSE
            </li>
            <li>
              • <strong>Seguro:</strong> Maneja automáticamente %NOTFOUND
            </li>
            <li>
              • <strong>Limpio:</strong> Código más legible y mantenible
            </li>
            <li>
              • <strong>Eficiente:</strong> Optimizado por Oracle
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Introducción a Procedimientos",
    subtitle: "Reutilización de código",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">¿Qué son los Procedimientos?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Los procedimientos son bloques de código PL/SQL nombrados que pueden ser reutilizados
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Ventajas</h4>
            <ul className="text-sm space-y-1">
              <li>• Reutilización de código</li>
              <li>• Modularidad</li>
              <li>• Mantenimiento centralizado</li>
              <li>• Mejor rendimiento</li>
              <li>• Seguridad mejorada</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Tipos de Parámetros</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>IN:</strong> Solo entrada (por defecto)
              </li>
              <li>
                • <strong>OUT:</strong> Solo salida
              </li>
              <li>
                • <strong>IN OUT:</strong> Entrada y salida
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Sintaxis Básica</h4>
          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
            <pre>{`CREATE OR REPLACE PROCEDURE nombre_procedimiento (
    parametro1 IN tipo_dato,
    parametro2 OUT tipo_dato,
    parametro3 IN OUT tipo_dato
) IS
    -- Declaraciones locales
BEGIN
    -- Código del procedimiento
EXCEPTION
    -- Manejo de excepciones
END nombre_procedimiento;
/`}</pre>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Ejemplo de Procedimiento",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Procedimiento para Actualizar Salarios</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`CREATE OR REPLACE PROCEDURE actualizar_salarios (
    p_departamento_id IN NUMBER,
    p_porcentaje IN NUMBER,
    p_empleados_actualizados OUT NUMBER
) IS
    v_contador NUMBER := 0;
BEGIN
    -- Actualizar salarios del departamento
    UPDATE empleados 
    SET salario = salario * (1 + p_porcentaje/100)
    WHERE departamento_id = p_departamento_id;
    
    -- Obtener número de registros afectados
    p_empleados_actualizados := SQL%ROWCOUNT;
    
    -- Confirmar cambios
    COMMIT;
    
    DBMS_OUTPUT.PUT_LINE('Salarios actualizados: ' || p_empleados_actualizados);
    
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        RAISE;
END actualizar_salarios;
/

-- Llamada al procedimiento
DECLARE
    v_total_actualizados NUMBER;
BEGIN
    actualizar_salarios(
        p_departamento_id => 10,
        p_porcentaje => 5,
        p_empleados_actualizados => v_total_actualizados
    );
    
    DBMS_OUTPUT.PUT_LINE('Total empleados actualizados: ' || v_total_actualizados);
END;
/`}</pre>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Elementos Clave:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>CREATE OR REPLACE:</strong> Crea o reemplaza el procedimiento
            </li>
            <li>
              • <strong>SQL%ROWCOUNT:</strong> Número de filas afectadas por DML
            </li>
            <li>
              • <strong>COMMIT/ROLLBACK:</strong> Control de transacciones
            </li>
            <li>
              • <strong>EXCEPTION:</strong> Manejo de errores
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Ejercicio Práctico",
    subtitle: "Cursores y Procedimientos",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Ejercicio: Reporte de Productos por Lote</h3>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Parte 1: Crear Procedimiento</h4>
          <p className="text-sm mb-2">
            Crear un procedimiento llamado <strong>reporte_lote_productos</strong> que:
          </p>
          <ol className="text-sm space-y-1">
            <li>1. Reciba como parámetro el código del lote (COD_LOTE)</li>
            <li>2. Use un cursor para obtener todos los productos del lote desde CURSODB.TBL_PRODUCTOS</li>
            <li>3. Muestre: nombre del producto, peso por unidad, peso por embalaje</li>
            <li>4. Calcule y muestre el peso total de todos los productos del lote</li>
            <li>5. Cuente el total de productos en el lote</li>
          </ol>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Definiciones Clave:</h4>
          <div className="text-sm space-y-2">
            <p>
              <strong>CURSOR:</strong> Estructura que permite procesar múltiples registros uno por uno
            </p>
            <p>
              <strong>CURSOR FOR LOOP:</strong> Forma automática de procesar cursores sin OPEN/FETCH/CLOSE manual
            </p>
            <p>
              <strong>%NOTFOUND:</strong> Atributo que indica cuando no hay más registros en el cursor
            </p>
            <p>
              <strong>INNER JOIN:</strong> Une tablas basándose en una condición de igualdad entre columnas
            </p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Estructura Sugerida:</h4>
          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
            <pre>{`CREATE OR REPLACE PROCEDURE reporte_lote_productos (
    p_cod_lote IN VARCHAR2
) IS
    -- Cursor para productos del lote
    CURSOR c_productos IS
        SELECT p.NOMBRE, p.PESOXUNIDAD, p.PESOXEMBALAJE, p.UNIDADXEMBALAJE
        FROM CURSODB.TBL_PRODUCTOS p
        INNER JOIN CURSODB.TBL_LOTES l ON p.COD_PRODUCTO = l.COD_PRODUCTO
        WHERE l.COD_LOTE = p_cod_lote;
    
    -- Variables para cálculos
    v_peso_total NUMBER := 0;
    v_contador NUMBER := 0;
    v_fecha_lote DATE;
    v_fecha_venc DATE;
BEGIN
    -- Obtener información del lote
    SELECT FECHA_LOTE, FECHA_VENCIMIENTO
    INTO v_fecha_lote, v_fecha_venc
    FROM CURSODB.TBL_LOTES
    WHERE COD_LOTE = p_cod_lote;
    
    DBMS_OUTPUT.PUT_LINE('=== REPORTE DE LOTE: ' || p_cod_lote || ' ===');
    DBMS_OUTPUT.PUT_LINE('Fecha Lote: ' || TO_CHAR(v_fecha_lote, 'DD/MM/YYYY'));
    DBMS_OUTPUT.PUT_LINE('Fecha Vencimiento: ' || TO_CHAR(v_fecha_venc, 'DD/MM/YYYY'));
    DBMS_OUTPUT.PUT_LINE('----------------------------------------');
    
    -- Procesar productos del lote
    FOR producto IN c_productos LOOP
        v_contador := v_contador + 1;
        v_peso_total := v_peso_total + (producto.PESOXUNIDAD * producto.UNIDADXEMBALAJE);
        
        DBMS_OUTPUT.PUT_LINE('Producto: ' || producto.NOMBRE);
        DBMS_OUTPUT.PUT_LINE('  Peso x Unidad: ' || producto.PESOXUNIDAD || ' kg');
        DBMS_OUTPUT.PUT_LINE('  Peso x Embalaje: ' || producto.PESOXEMBALAJE || ' kg');
        DBMS_OUTPUT.PUT_LINE('  Unidades x Embalaje: ' || producto.UNIDADXEMBALAJE);
        DBMS_OUTPUT.PUT_LINE('----------------------------------------');
    END LOOP;
    
    IF v_contador = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No se encontraron productos para el lote: ' || p_cod_lote);
    ELSE
        DBMS_OUTPUT.PUT_LINE('RESUMEN:');
        DBMS_OUTPUT.PUT_LINE('Total productos: ' || v_contador);
        DBMS_OUTPUT.PUT_LINE('Peso total estimado: ' || v_peso_total || ' kg');
    END IF;
    
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: Lote ' || p_cod_lote || ' no encontrado');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
END;
/`}</pre>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Recomendaciones:</h4>
          <ul className="text-sm space-y-1">
            <li>• Usa Cursor FOR Loop para simplificar el código</li>
            <li>• Verifica que las tablas TBL_LOTES y TBL_PRODUCTOS tengan datos</li>
            <li>• Agrega formato visual con líneas separadoras</li>
            <li>• Incluye validación para lotes inexistentes</li>
            <li>• Usa TO_CHAR para formatear fechas legiblemente</li>
            <li>• Prueba primero con un lote que sepas que existe</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Desafío Adicional:</h4>
          <p className="text-sm">Una vez que funcione el procedimiento básico, intenta agregar:</p>
          <ul className="text-sm space-y-1 mt-2">
            <li>• Parámetro opcional para mostrar solo productos con stock bajo</li>
            <li>• Cálculo de días desde la fecha del lote hasta hoy</li>
            <li>• Formato de salida como reporte profesional con encabezados</li>
          </ul>
        </div>
      </div>
    ),
  },
]

export function Week3Slides() {
  return <SlideViewer slides={week3Slides} moduleTitle="Módulo 1: Fundamentos de PL/SQL" weekNumber={3} />
}
