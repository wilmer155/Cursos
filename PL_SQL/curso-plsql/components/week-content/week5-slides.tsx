import { SlideViewer } from "../slide-viewer"

const week5Slides = [
  {
    id: 1,
    title: "Funciones en PL/SQL",
    subtitle: "Bloques que retornan valores",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Funciones vs Procedimientos</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Las funciones siempre retornan un valor y pueden usarse en expresiones SQL
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Funciones</h4>
            <ul className="text-sm space-y-1">
              <li>• Siempre retornan un valor</li>
              <li>• Pueden usarse en SELECT</li>
              <li>• Ideales para cálculos</li>
              <li>• No deben modificar datos (buena práctica)</li>
              <li>• Palabra clave RETURN</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Procedimientos</h4>
            <ul className="text-sm space-y-1">
              <li>• No retornan valores directamente</li>
              <li>• Usan parámetros OUT</li>
              <li>• Ideales para procesos</li>
              <li>• Pueden modificar datos</li>
              <li>• Se ejecutan con EXECUTE</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Cuándo usar cada uno</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Usar Funciones para:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Cálculos matemáticos</li>
                <li>• Formateo de datos</li>
                <li>• Validaciones</li>
                <li>• Conversiones</li>
              </ul>
            </div>
            <div>
              <strong>Usar Procedimientos para:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Procesos de negocio</li>
                <li>• Actualizaciones masivas</li>
                <li>• Reportes complejos</li>
                <li>• Mantenimiento de datos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Sintaxis de Funciones",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Estructura de una Función</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`CREATE OR REPLACE FUNCTION nombre_funcion (
    parametro1 IN tipo_dato,
    parametro2 IN tipo_dato DEFAULT valor
) RETURN tipo_dato_retorno IS
    -- Declaraciones locales
    variable_local tipo_dato;
BEGIN
    -- Lógica de la función
    
    RETURN valor_retorno;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de errores
        RETURN valor_por_defecto;
END nombre_funcion;
/`}</pre>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Elementos Clave</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>RETURN tipo:</strong> Especifica el tipo de retorno
              </li>
              <li>
                • <strong>RETURN valor:</strong> Retorna el resultado
              </li>
              <li>
                • <strong>DEFAULT:</strong> Valores por defecto para parámetros
              </li>
              <li>
                • <strong>IS/AS:</strong> Ambas palabras son válidas
              </li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Buenas Prácticas</h4>
            <ul className="text-sm space-y-1">
              <li>• Siempre manejar excepciones</li>
              <li>• Un solo punto de retorno (recomendado)</li>
              <li>• Documentar parámetros y retorno</li>
              <li>• Evitar efectos secundarios</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Ejemplo Práctico - Función",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Función para Calcular Días de Almacenamiento</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`CREATE OR REPLACE FUNCTION calcular_dias_almacenamiento (
    p_fecha_entrada IN DATE
) RETURN NUMBER IS
    v_dias NUMBER;
BEGIN
    -- Calcular días desde la entrada hasta hoy
    v_dias := TRUNC(SYSDATE - p_fecha_entrada);
    
    -- Validar que la fecha no sea futura
    IF p_fecha_entrada > SYSDATE THEN
        RETURN -1; -- Código de error
    END IF;
    
    RETURN v_dias;
    
EXCEPTION
    WHEN OTHERS THEN
        RETURN -1; -- Error en el cálculo
END calcular_dias_almacenamiento;
/

-- Uso de la función con tabla de entradas
SELECT 
    e.COD_ENTRADA,
    e.FECHA_ENTRADA,
    calcular_dias_almacenamiento(e.FECHA_ENTRADA) AS dias_almacenados
FROM CURSODB_TBL_ENTRADAS e
WHERE calcular_dias_almacenamiento(e.FECHA_ENTRADA) > 30;

-- En un bloque PL/SQL
DECLARE
    v_dias_producto NUMBER;
BEGIN
    v_dias_producto := calcular_dias_almacenamiento(DATE '2024-01-15');
    DBMS_OUTPUT.PUT_LINE('Días almacenado: ' || v_dias_producto);
END;
/`}</pre>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Características del Ejemplo:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>TRUNC:</strong> Elimina la parte de hora para obtener días completos
            </li>
            <li>
              • <strong>Validación:</strong> Verifica fechas futuras
            </li>
            <li>
              • <strong>Uso en SQL:</strong> Se puede usar en SELECT con CURSODB_TBL_ENTRADAS
            </li>
            <li>
              • <strong>Aplicación:</strong> Útil para control de inventario y rotación de productos
            </li>
            <li>
              • <strong>Manejo de errores:</strong> Retorna -1 en caso de error
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Introducción a Paquetes",
    subtitle: "Agrupando código relacionado",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">¿Qué son los Paquetes?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Los paquetes agrupan procedimientos, funciones, variables y tipos relacionados en una unidad lógica
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Ventajas de los Paquetes</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Modularidad:</strong> Código organizado
              </li>
              <li>
                • <strong>Encapsulación:</strong> Elementos públicos y privados
              </li>
              <li>
                • <strong>Rendimiento:</strong> Carga en memoria una sola vez
              </li>
              <li>
                • <strong>Sobrecarga:</strong> Múltiples versiones de subprogramas
              </li>
              <li>
                • <strong>Namespace:</strong> Evita conflictos de nombres
              </li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Componentes</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>SPECIFICATION:</strong> Interfaz pública
              </li>
              <li>
                • <strong>BODY:</strong> Implementación
              </li>
              <li>
                • <strong>Variables globales:</strong> Persistentes en sesión
              </li>
              <li>
                • <strong>Tipos de datos:</strong> Definiciones personalizadas
              </li>
              <li>
                • <strong>Excepciones:</strong> Personalizadas
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Estructura de un Paquete</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>PACKAGE SPECIFICATION:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Declaraciones públicas</li>
                <li>• Firmas de funciones/procedimientos</li>
                <li>• Variables y constantes públicas</li>
                <li>• Tipos de datos públicos</li>
              </ul>
            </div>
            <div>
              <strong>PACKAGE BODY:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Implementación de subprogramas</li>
                <li>• Elementos privados</li>
                <li>• Código de inicialización</li>
                <li>• Variables privadas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Ejemplo de Paquete",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Paquete para Gestión de Inventario</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">PACKAGE SPECIFICATION</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`CREATE OR REPLACE PACKAGE pkg_inventario IS
    -- Constantes públicas
    c_peso_minimo_lote CONSTANT NUMBER := 100; -- kg
    
    -- Tipos públicos
    TYPE t_producto_rec IS RECORD (
        cod_producto    VARCHAR2(20),
        nombre          VARCHAR2(50),
        peso_total      NUMBER
    );
    
    -- Procedimientos públicos
    PROCEDURE registrar_entrada (
        p_cod_producto IN VARCHAR2,
        p_cantidad IN NUMBER,
        p_peso_unidad IN NUMBER,
        p_cod_lote IN VARCHAR2
    );
    
    -- Funciones públicas
    FUNCTION obtener_stock_producto (
        p_cod_producto IN VARCHAR2
    ) RETURN NUMBER;
    
    FUNCTION validar_peso_lote (
        p_peso_total IN NUMBER
    ) RETURN BOOLEAN;
    
END pkg_inventario;
/`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">PACKAGE BODY</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`CREATE OR REPLACE PACKAGE BODY pkg_inventario IS
    -- Variables privadas
    g_contador_entradas NUMBER := 0;
    
    -- Función privada
    FUNCTION generar_cod_entrada RETURN NUMBER IS
    BEGIN
        SELECT NVL(MAX(COD_ENTRADA), 0) + 1 
        INTO g_contador_entradas 
        FROM CURSODB_TBL_ENTRADAS;
        RETURN g_contador_entradas;
    END generar_cod_entrada;
    
    -- Implementación de función pública
    FUNCTION validar_peso_lote (p_peso_total IN NUMBER) RETURN BOOLEAN IS
    BEGIN
        RETURN p_peso_total >= c_peso_minimo_lote;
    END validar_peso_lote;
    
    -- Implementación de procedimiento público
    PROCEDURE registrar_entrada (
        p_cod_producto IN VARCHAR2,
        p_cantidad IN NUMBER,
        p_peso_unidad IN NUMBER,
        p_cod_lote IN VARCHAR2
    ) IS
        v_nuevo_cod NUMBER;
        v_peso_total NUMBER;
    BEGIN
        v_peso_total := p_cantidad * p_peso_unidad;
        
        IF NOT validar_peso_lote(v_peso_total) THEN
            RAISE_APPLICATION_ERROR(-20001, 'Peso del lote insuficiente');
        END IF;
        
        v_nuevo_cod := generar_cod_entrada;
        
        INSERT INTO CURSODB_TBL_ENTRADAS (
            COD_ENTRADA, FECHA_ENTRADA, REMESA, ORIGEN, OBSERVACIONES
        ) VALUES (
            v_nuevo_cod, SYSDATE, p_cod_lote, 'TRILLADORA', 
            'Entrada automática - ' || p_cantidad || ' unidades'
        );
        
        COMMIT;
    END registrar_entrada;
    
    -- Implementación de función pública
    FUNCTION obtener_stock_producto (p_cod_producto IN VARCHAR2) RETURN NUMBER IS
        v_stock NUMBER;
    BEGIN
        SELECT NVL(SUM(INVEN_TOTAL), 0) INTO v_stock
        FROM CURSODB_TBL_INVENTARIOS
        WHERE COD_PRODUCTO = p_cod_producto;
        
        RETURN v_stock;
    END obtener_stock_producto;
    
END pkg_inventario;
/`}</pre>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Uso del Paquete",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Llamando Elementos del Paquete</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`-- Usar procedimiento del paquete
BEGIN
    pkg_inventario.registrar_entrada(
        p_cod_producto => 'P001',
        p_cantidad => 100,
        p_peso_unidad => 10,
        p_cod_lote => 'L001'
    );
END;
/

-- Usar función en consulta SQL
SELECT 
    i.COD_PRODUCTO,
    pkg_inventario.obtener_stock_producto(i.COD_PRODUCTO) AS stock
FROM CURSODB_TBL_INVENTARIOS i;

-- Usar constante del paquete
DECLARE
    v_peso NUMBER := 90;
BEGIN
    IF v_peso < pkg_inventario.c_peso_minimo_lote THEN
        DBMS_OUTPUT.PUT_LINE('Peso del lote por debajo del mínimo');
    END IF;
END;
/

-- Usar tipo de dato del paquete
DECLARE
    v_producto pkg_inventario.t_producto_rec;
BEGIN
    SELECT COD_PRODUCTO, NOMBRE, PESO_TOTAL
    INTO v_producto
    FROM CURSODB_TBL_INVENTARIOS
    WHERE COD_PRODUCTO = 'P001';
    
    DBMS_OUTPUT.PUT_LINE('Producto: ' || v_producto.nombre);
END;
/`}</pre>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Sintaxis de Acceso:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>paquete.elemento:</strong> Notación punto para acceder
            </li>
            <li>
              • <strong>Elementos públicos:</strong> Solo los del SPECIFICATION
            </li>
            <li>
              • <strong>Elementos privados:</strong> Solo dentro del BODY
            </li>
            <li>
              • <strong>Variables globales:</strong> Persisten durante la sesión
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Ejercicio Práctico",
    subtitle: "Funciones y Paquetes",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Ejercicio: Paquete de Utilidades de Trilladora</h3>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Parte 1: Crear Funciones Básicas</h4>
          <p className="text-sm mb-2">Crear las siguientes funciones independientes:</p>
          <ol className="text-sm space-y-1">
            <li>
              1. <strong>calcular_peso_neto(peso_bruto, tara):</strong> Retorna el peso neto del producto
            </li>
            <li>
              2. <strong>validar_humedad(porcentaje):</strong> Retorna TRUE si la humedad está entre 10-14%
            </li>
            <li>
              3. <strong>obtener_stock_total(cod_producto):</strong> Consulta INVEN_TOTAL de TBL_INVENTARIOS
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Definiciones Clave:</h4>
          <div className="text-sm space-y-2">
            <p>
              <strong>PACKAGE SPECIFICATION:</strong> Interfaz pública del paquete, define qué elementos son accesibles
            </p>
            <p>
              <strong>PACKAGE BODY:</strong> Implementación real de los procedimientos y funciones del paquete
            </p>
            <p>
              <strong>CONSTANT:</strong> Valor que no puede cambiar durante la ejecución del programa
            </p>
            <p>
              <strong>RETURN:</strong> Palabra clave que especifica el valor que devuelve una función
            </p>
            <p>
              <strong>NVL:</strong> Función que reemplaza valores NULL con un valor especificado
            </p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Estructura del Paquete:</h4>
          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
            <pre>{`-- PASO 1: Crear la especificación
CREATE OR REPLACE PACKAGE pkg_trilladora IS
    -- Constantes públicas
    HUMEDAD_OPTIMA CONSTANT NUMBER := 12;
    
    -- Funciones públicas (solo firmas)
    FUNCTION calcular_peso_neto(peso_bruto NUMBER, tara NUMBER) RETURN NUMBER;
    FUNCTION validar_humedad(porcentaje NUMBER) RETURN BOOLEAN;
    FUNCTION obtener_stock_total(p_cod_producto NUMBER) RETURN NUMBER;
    
    -- Procedimiento público
    PROCEDURE generar_reporte_inventario(p_cod_producto NUMBER DEFAULT NULL);
END pkg_trilladora;
/

-- PASO 2: Crear el cuerpo (implementación)
CREATE OR REPLACE PACKAGE BODY pkg_trilladora IS
    -- Implementar cada función aquí
    FUNCTION calcular_peso_neto(peso_bruto NUMBER, tara NUMBER) RETURN NUMBER IS
    BEGIN
        -- Tu código aquí
        RETURN peso_bruto - tara;
    END;
    
    -- Implementar las demás funciones...
    
END pkg_trilladora;
/`}</pre>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Recomendaciones:</h4>
          <ul className="text-sm space-y-1">
            <li>• Crea primero la SPECIFICATION, luego el BODY</li>
            <li>• Usa nombres descriptivos para funciones y parámetros</li>
            <li>• Incluye manejo de excepciones en cada función</li>
            <li>• Prueba cada función individualmente antes de crear el paquete</li>
            <li>• Usa DEFAULT NULL para parámetros opcionales</li>
            <li>• Verifica que las tablas TBL_INVENTARIOS y TBL_PRODUCTOS existan</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Ejemplo de Uso:</h4>
          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
            <pre>{`-- Después de crear el paquete, úsalo así:
DECLARE
    v_peso_neto NUMBER;
    v_humedad_ok BOOLEAN;
    v_stock NUMBER;
BEGIN
    -- Usar funciones del paquete
    v_peso_neto := pkg_trilladora.calcular_peso_neto(1000, 50);
    v_humedad_ok := pkg_trilladora.validar_humedad(13);
    v_stock := pkg_trilladora.obtener_stock_total(1);
    
    -- Mostrar resultados
    DBMS_OUTPUT.PUT_LINE('Peso neto: ' || v_peso_neto);
    DBMS_OUTPUT.PUT_LINE('Stock producto 1: ' || v_stock);
    
    -- Usar procedimiento
    pkg_trilladora.generar_reporte_inventario(1);
END;
/`}</pre>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Desafío Avanzado:</h4>
          <p className="text-sm">Una vez que tengas el paquete básico funcionando, intenta agregar:</p>
          <ul className="text-sm space-y-1 mt-2">
            <li>• Función para calcular merma entre peso inicial y final</li>
            <li>• Procedimiento que actualice inventarios automáticamente</li>
            <li>• Variable global que cuente cuántas veces se usa el paquete</li>
          </ul>
        </div>
      </div>
    ),
  },
]

export function Week5Slides() {
  return <SlideViewer slides={week5Slides} moduleTitle="Módulo 1: Fundamentos de PL/SQL" weekNumber={5} />
}
