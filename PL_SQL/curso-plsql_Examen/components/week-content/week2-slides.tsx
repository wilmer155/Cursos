import { SlideViewer } from "../slide-viewer"

const week2Slides = [
  {
    id: 1,
    title: "Bloques PL/SQL",
    subtitle: "Estructura básica de un programa PL/SQL",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Anatomía de un Bloque PL/SQL</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Todo programa PL/SQL está organizado en bloques con una estructura definida
          </p>
        </div>

        <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm">
          <pre>{`DECLARE
    -- Sección de declaraciones (opcional)
    variable_name datatype;
    
BEGIN
    -- Sección ejecutable (obligatoria)
    -- Código PL/SQL aquí
    
EXCEPTION
    -- Manejo de excepciones (opcional)
    WHEN exception_name THEN
        -- Código de manejo
        
END;
/`}</pre>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">DECLARE</h4>
            <p className="text-sm">Declaración de variables, constantes, cursores y tipos de datos</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">BEGIN</h4>
            <p className="text-sm">Código ejecutable, lógica del programa</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">EXCEPTION</h4>
            <p className="text-sm">Manejo de errores y situaciones excepcionales</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Tipos de Datos en PL/SQL",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Tipos de Datos Fundamentales</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600">Tipos Escalares</h4>
            <div className="space-y-2">
              <div className="border rounded p-3">
                <strong>NUMBER:</strong> Números enteros y decimales
                <div className="text-xs text-gray-500 mt-1">NUMBER(10,2), NUMBER(5)</div>
              </div>
              <div className="border rounded p-3">
                <strong>VARCHAR2:</strong> Cadenas de caracteres variables
                <div className="text-xs text-gray-500 mt-1">VARCHAR2(100)</div>
              </div>
              <div className="border rounded p-3">
                <strong>DATE:</strong> Fechas y horas
                <div className="text-xs text-gray-500 mt-1">SYSDATE, TO_DATE()</div>
              </div>
              <div className="border rounded p-3">
                <strong>BOOLEAN:</strong> Verdadero/Falso
                <div className="text-xs text-gray-500 mt-1">TRUE, FALSE, NULL</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-green-600">Tipos de Referencia</h4>
            <div className="space-y-2">
              <div className="border rounded p-3">
                <strong>%TYPE:</strong> Hereda el tipo de una columna
                <div className="text-xs text-gray-500 mt-1">emp_name empleados.nombre%TYPE;</div>
              </div>
              <div className="border rounded p-3">
                <strong>%ROWTYPE:</strong> Hereda estructura completa
                <div className="text-xs text-gray-500 mt-1">emp_rec empleados%ROWTYPE;</div>
              </div>
              <div className="border rounded p-3">
                <strong>RECORD:</strong> Tipo compuesto personalizado
                <div className="text-xs text-gray-500 mt-1">TYPE emp_type IS RECORD(...)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Ejemplo Práctico - Variables",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Declaración y Uso de Variables</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`DECLARE
    -- Variables escalares
    v_nombre        VARCHAR2(50) := 'Juan Pérez';
    v_salario       NUMBER(8,2);
    v_fecha_ingreso DATE := SYSDATE;
    v_activo        BOOLEAN := TRUE;
    
    -- Variables de referencia
    v_emp_nombre    empleados.nombre%TYPE;
    v_empleado      empleados%ROWTYPE;
    
    -- Constante
    c_tasa_impuesto CONSTANT NUMBER(3,2) := 0.15;
    
BEGIN
    -- Asignación de valores
    v_salario := 5000.00;
    
    -- Selección en variable
    SELECT nombre, salario 
    INTO v_emp_nombre, v_salario
    FROM empleados 
    WHERE emp_id = 100;
    
    -- Mostrar resultado
    DBMS_OUTPUT.PUT_LINE('Empleado: ' || v_emp_nombre);
    DBMS_OUTPUT.PUT_LINE('Salario: ' || v_salario);
    
END;
/`}</pre>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Puntos Importantes:</h4>
          <ul className="text-sm space-y-1">
            <li>• Las variables se declaran en la sección DECLARE</li>
            <li>• Se pueden inicializar al momento de la declaración</li>
            <li>• %TYPE garantiza compatibilidad con la base de datos</li>
            <li>• CONSTANT define valores que no pueden cambiar</li>
            <li>• DBMS_OUTPUT.PUT_LINE muestra mensajes en consola</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Estructuras de Control",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Control de Flujo en PL/SQL</h3>
        </div>

        <div className="grid gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-3">Condicionales - IF</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`IF condicion THEN
    -- código
ELSIF otra_condicion THEN
    -- código
ELSE
    -- código
END IF;`}</pre>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-green-600 mb-3">Bucles - LOOP</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`-- Loop básico
LOOP
    -- código
    EXIT WHEN condicion;
END LOOP;

-- While Loop
WHILE condicion LOOP
    -- código
END LOOP;

-- For Loop
FOR i IN 1..10 LOOP
    -- código
END LOOP;`}</pre>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-600 mb-3">CASE Statement</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`CASE variable
    WHEN valor1 THEN resultado1
    WHEN valor2 THEN resultado2
    ELSE resultado_default
END CASE;`}</pre>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Ejercicio Práctico",
    subtitle: "Aplicando bloques PL/SQL y tipos de datos",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Ejercicio: Calculadora de Comisiones por Ventas</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Crear un bloque PL/SQL que calcule comisiones para vendedores basado en sus ventas mensuales y años de
            experiencia en la trilladora.
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Requerimientos:</h4>
          <ol className="text-sm space-y-2">
            <li>1. Declarar variables para: COD_VENDEDOR, NOMBRE, ventas_mes, años_experiencia, comision</li>
            <li>2. Leer datos de un vendedor específico de CURSODB.TBL_VENDEDORES (COD_VENDEDOR = 1)</li>
            <li>3. Calcular años de experiencia usando SYSDATE y fecha de ingreso</li>
            <li>
              4. Aplicar reglas de comisión sobre ventas mensuales:
              <ul className="ml-4 mt-1 space-y-1">
                <li>• Menos de 1 año: 2% de las ventas</li>
                <li>• 1-3 años: 3.5% de las ventas</li>
                <li>• Más de 3 años: 5% de las ventas</li>
              </ul>
            </li>
            <li>5. Mostrar resultado con DBMS_OUTPUT incluyendo nombre del vendedor y comisión calculada</li>
          </ol>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Definiciones Clave:</h4>
          <div className="text-sm space-y-2">
            <p>
              <strong>%TYPE:</strong> Hereda el tipo de dato de una columna específica de la base de datos
            </p>
            <p>
              <strong>MONTHS_BETWEEN:</strong> Función que calcula la diferencia en meses entre dos fechas
            </p>
            <p>
              <strong>TRUNC:</strong> Función que trunca decimales, útil para obtener años completos
            </p>
            <p>
              <strong>TO_CHAR:</strong> Convierte números a formato de texto con máscara de formato
            </p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Ejemplo de Estructura Básica:</h4>
          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
            <pre>{`DECLARE
    -- Usar %TYPE para compatibilidad con la BD
    v_cod_vendedor    CURSODB.TBL_VENDEDORES.COD_VENDEDOR%TYPE;
    v_nombre          CURSODB.TBL_VENDEDORES.NOMBRE%TYPE;
    -- Agregar más variables aquí...
    
BEGIN
    -- Consultar datos del vendedor
    SELECT COD_VENDEDOR, NOMBRE 
    INTO v_cod_vendedor, v_nombre
    FROM CURSODB.TBL_VENDEDORES 
    WHERE COD_VENDEDOR = 1;
    
    -- Calcular años de experiencia
    -- Usar MONTHS_BETWEEN y TRUNC aquí...
    
    -- Aplicar lógica IF-ELSIF-ELSE para comisiones
    -- Mostrar resultado con DBMS_OUTPUT.PUT_LINE
END;
/`}</pre>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Recomendaciones:</h4>
          <ul className="text-sm space-y-1">
            <li>• Usa variables simuladas para ventas_mes y fecha_ingreso inicialmente</li>
            <li>• Prueba primero con un vendedor específico (COD_VENDEDOR = 1)</li>
            <li>• Verifica que la tabla TBL_VENDEDORES tenga datos antes de ejecutar</li>
            <li>• Usa TO_CHAR con formato '999,999.99' para mostrar montos legibles</li>
            <li>• Habilita DBMS_OUTPUT con SET SERVEROUTPUT ON antes de ejecutar</li>
          </ul>
        </div>
      </div>
    ),
  },
]

export function Week2Slides() {
  return <SlideViewer slides={week2Slides} moduleTitle="Módulo 1: Fundamentos de PL/SQL" weekNumber={2} />
}
