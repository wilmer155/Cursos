import { SlideViewer } from "../slide-viewer"

const week8Slides = [
  {
    id: 1,
    title: "SQL Dinámico y Seguridad",
    subtitle: "Construcción dinámica de SQL y principios de seguridad",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Módulo 1: Fundamentos de PL/SQL</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Técnicas avanzadas para construcción dinámica de SQL y implementación de seguridad robusta
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">🔧 SQL Dinámico</h4>
            <ul className="text-sm space-y-2">
              <li>• EXECUTE IMMEDIATE para flexibilidad</li>
              <li>• Construcción de consultas en runtime</li>
              <li>• DDL dinámico para administración</li>
              <li>• Cursores dinámicos con REF CURSOR</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">🔒 Seguridad</h4>
            <ul className="text-sm space-y-2">
              <li>• Prevención de inyección SQL</li>
              <li>• Validación con DBMS_ASSERT</li>
              <li>• Gestión de roles y privilegios</li>
              <li>• Auditoría y logging de seguridad</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">⚠️ Advertencia de Seguridad</h4>
          <p className="text-sm">
            El SQL dinámico es una herramienta poderosa pero peligrosa. Un uso incorrecto puede exponer la aplicación a
            ataques de inyección SQL. Siempre validar y sanitizar las entradas.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "EXECUTE IMMEDIATE - Fundamentos",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Construcción Dinámica de SQL</h3>
        </div>

        <div className="grid gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-3">Casos de Uso Comunes</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2 text-green-600">DML Dinámico:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Consultas con filtros variables</li>
                  <li>• Nombres de tabla/columna dinámicos</li>
                  <li>• Construcción de WHERE complejos</li>
                  <li>• Operaciones condicionales</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-purple-600">DDL Dinámico:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Creación de tablas temporales</li>
                  <li>• Modificación de estructuras</li>
                  <li>• Gestión de índices dinámicos</li>
                  <li>• Administración automatizada</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-orange-600 mb-3">Sintaxis y Variaciones</h4>
            <div className="space-y-3">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <div className="font-mono text-sm">
                  <div className="text-blue-600">-- Básico</div>
                  <div>EXECUTE IMMEDIATE 'sql_statement';</div>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <div className="font-mono text-sm">
                  <div className="text-blue-600">-- Con parámetros</div>
                  <div>EXECUTE IMMEDIATE 'sql_statement' USING param1, param2;</div>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <div className="font-mono text-sm">
                  <div className="text-blue-600">-- Con resultado</div>
                  <div>EXECUTE IMMEDIATE 'sql_statement' INTO variable USING param;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Ejemplos de SQL Dinámico",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Implementaciones Prácticas</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`-- Ejemplo 1: Consulta dinámica con filtros variables
CREATE OR REPLACE PROCEDURE buscar_empleados(
    p_filtro_campo VARCHAR2,
    p_filtro_valor VARCHAR2,
    p_orden_campo VARCHAR2 DEFAULT 'id_empleado'
) IS
    v_sql VARCHAR2(4000);
    v_cursor SYS_REFCURSOR;
    v_empleado empleados%ROWTYPE;
BEGIN
    -- Construir consulta dinámica
    v_sql := 'SELECT * FROM empleados WHERE ' || 
             DBMS_ASSERT.SIMPLE_SQL_NAME(p_filtro_campo) || 
             ' LIKE :valor ORDER BY ' || 
             DBMS_ASSERT.SIMPLE_SQL_NAME(p_orden_campo);
    
    -- Ejecutar con parámetros seguros
    OPEN v_cursor FOR v_sql USING '%' || p_filtro_valor || '%';
    
    LOOP
        FETCH v_cursor INTO v_empleado;
        EXIT WHEN v_cursor%NOTFOUND;
        
        DBMS_OUTPUT.PUT_LINE(v_empleado.nombre || ' - ' || v_empleado.email);
    END LOOP;
    
    CLOSE v_cursor;
END;

-- Ejemplo 2: DDL dinámico para administración
CREATE OR REPLACE PROCEDURE crear_tabla_auditoria(
    p_tabla_base VARCHAR2
) IS
    v_sql VARCHAR2(4000);
    v_tabla_audit VARCHAR2(100);
BEGIN
    -- Validar nombre de tabla
    v_tabla_base := DBMS_ASSERT.SIMPLE_SQL_NAME(p_tabla_base);
    v_tabla_audit := v_tabla_base || '_audit';
    
    -- Construir DDL dinámico
    v_sql := 'CREATE TABLE ' || v_tabla_audit || ' AS ' ||
             'SELECT *, SYSDATE as fecha_audit, USER as usuario_audit ' ||
             'FROM ' || v_tabla_base || ' WHERE 1=0';
    
    EXECUTE IMMEDIATE v_sql;
    
    -- Agregar columnas adicionales de auditoría
    EXECUTE IMMEDIATE 'ALTER TABLE ' || v_tabla_audit || 
                     ' ADD (operacion VARCHAR2(10), ip_origen VARCHAR2(50))';
    
    DBMS_OUTPUT.PUT_LINE('Tabla de auditoría creada: ' || v_tabla_audit);
    
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error creando tabla auditoría: ' || SQLERRM);
END;

-- Ejemplo 3: Generador de reportes dinámico
CREATE OR REPLACE FUNCTION generar_reporte(
    p_tabla VARCHAR2,
    p_columnas VARCHAR2,
    p_condicion VARCHAR2 DEFAULT '1=1'
) RETURN SYS_REFCURSOR IS
    v_cursor SYS_REFCURSOR;
    v_sql VARCHAR2(4000);
BEGIN
    v_sql := 'SELECT ' || p_columnas || 
             ' FROM ' || DBMS_ASSERT.SIMPLE_SQL_NAME(p_tabla) ||
             ' WHERE ' || p_condicion;
    
    OPEN v_cursor FOR v_sql;
    RETURN v_cursor;
END;`}</pre>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Características Importantes:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>DBMS_ASSERT.SIMPLE_SQL_NAME:</strong> Valida nombres de objetos SQL
            </li>
            <li>
              • <strong>USING clause:</strong> Parámetros seguros para evitar inyección SQL
            </li>
            <li>
              • <strong>SYS_REFCURSOR:</strong> Cursores dinámicos para resultados variables
            </li>
            <li>
              • <strong>Manejo de errores:</strong> Siempre incluir EXCEPTION para DDL dinámico
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Prevención de Inyección SQL",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Seguridad en SQL Dinámico</h3>
        </div>

        <div className="grid gap-6">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">❌ Código Vulnerable</h4>
            <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-xs">
              <pre>{`-- ¡NUNCA HACER ESTO!
v_sql := 'SELECT * FROM usuarios WHERE nombre = ''' || p_nombre || '''';
EXECUTE IMMEDIATE v_sql;

-- Entrada maliciosa: p_nombre = "'; DROP TABLE usuarios; --"
-- Resultado: SELECT * FROM usuarios WHERE nombre = ''; DROP TABLE usuarios; --'`}</pre>
            </div>
            <p className="text-sm mt-2 text-red-600">
              Esta concatenación directa permite que un atacante ejecute comandos SQL arbitrarios.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">✅ Código Seguro</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`-- Usar parámetros con USING
v_sql := 'SELECT * FROM usuarios WHERE nombre = :nombre';
EXECUTE IMMEDIATE v_sql INTO v_resultado USING p_nombre;

-- Validar nombres de objetos
v_tabla := DBMS_ASSERT.SIMPLE_SQL_NAME(p_tabla);
v_sql := 'SELECT COUNT(*) FROM ' || v_tabla;`}</pre>
            </div>
            <p className="text-sm mt-2 text-green-600">
              Los parámetros se tratan como valores literales, no como código SQL ejecutable.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
              🛡️ Funciones de Validación DBMS_ASSERT
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Validación de Nombres:</h5>
                <ul className="text-sm space-y-1">
                  <li>
                    • <code>SIMPLE_SQL_NAME</code> - Nombres simples
                  </li>
                  <li>
                    • <code>QUALIFIED_SQL_NAME</code> - Nombres calificados
                  </li>
                  <li>
                    • <code>SCHEMA_NAME</code> - Nombres de esquema
                  </li>
                  <li>
                    • <code>OBJECT_NAME</code> - Nombres de objetos
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Validación de Valores:</h5>
                <ul className="text-sm space-y-1">
                  <li>
                    • <code>ENQUOTE_LITERAL</code> - Escapar literales
                  </li>
                  <li>
                    • <code>ENQUOTE_NAME</code> - Escapar nombres
                  </li>
                  <li>
                    • <code>NOOP</code> - Validación personalizada
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Gestión de Roles y Privilegios",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Sistema de Seguridad Oracle</h3>
        </div>

        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">System Privileges</h4>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>CREATE SESSION:</strong> Conectarse a la BD
                </li>
                <li>
                  • <strong>CREATE TABLE:</strong> Crear tablas
                </li>
                <li>
                  • <strong>CREATE USER:</strong> Crear usuarios
                </li>
                <li>
                  • <strong>ALTER SYSTEM:</strong> Modificar sistema
                </li>
                <li>
                  • <strong>DBA:</strong> Administración completa
                </li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Object Privileges</h4>
              <ul className="text-sm space-y-2">
                <li>
                  • <strong>SELECT:</strong> Leer datos
                </li>
                <li>
                  • <strong>INSERT:</strong> Insertar registros
                </li>
                <li>
                  • <strong>UPDATE:</strong> Modificar datos
                </li>
                <li>
                  • <strong>DELETE:</strong> Eliminar registros
                </li>
                <li>
                  • <strong>EXECUTE:</strong> Ejecutar procedimientos
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">🎭 Roles Predefinidos</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded">
                <h5 className="font-medium text-blue-600">CONNECT</h5>
                <p className="text-xs text-gray-500">Privilegios básicos de conexión</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded">
                <h5 className="font-medium text-green-600">RESOURCE</h5>
                <p className="text-xs text-gray-500">Crear objetos en esquema propio</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded">
                <h5 className="font-medium text-red-600">DBA</h5>
                <p className="text-xs text-gray-500">Administración completa</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">⚖️ Principio de Menor Privilegio</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm">Otorgar solo los privilegios mínimos necesarios</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm">Usar roles para agrupar privilegios relacionados</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm">Revisar y auditar privilegios periódicamente</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm">Revocar privilegios no utilizados</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Implementación de Seguridad",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Sistema Completo de Seguridad</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`-- 1. Crear usuarios y roles
CREATE USER app_user IDENTIFIED BY SecurePass123!;
CREATE USER app_admin IDENTIFIED BY AdminPass456!;

-- 2. Crear roles personalizados
CREATE ROLE empleados_role;
CREATE ROLE admin_role;

-- 3. Asignar privilegios a roles
GRANT SELECT, INSERT, UPDATE ON empleados TO empleados_role;
GRANT SELECT ON departamentos TO empleados_role;
GRANT SELECT ON salarios TO empleados_role;

GRANT ALL ON empleados TO admin_role;
GRANT ALL ON departamentos TO admin_role;
GRANT ALL ON salarios TO admin_role;
GRANT CREATE TABLE, DROP TABLE TO admin_role;

-- 4. Asignar roles a usuarios
GRANT CONNECT, empleados_role TO app_user;
GRANT CONNECT, admin_role TO app_admin;

-- 5. Procedimiento seguro con AUTHID DEFINER
CREATE OR REPLACE PROCEDURE actualizar_salario_seguro(
    p_emp_id NUMBER,
    p_nuevo_salario NUMBER,
    p_usuario_solicitante VARCHAR2
) AUTHID DEFINER -- Ejecuta con privilegios del propietario
IS
    v_salario_actual NUMBER;
    v_es_admin BOOLEAN := FALSE;
    v_ip_cliente VARCHAR2(50);
BEGIN
    -- Obtener IP del cliente para auditoría
    SELECT SYS_CONTEXT('USERENV', 'IP_ADDRESS') INTO v_ip_cliente FROM DUAL;
    
    -- Verificar si el usuario es administrador
    SELECT COUNT(*) INTO v_count
    FROM user_role_privs 
    WHERE granted_role = 'ADMIN_ROLE' 
    AND username = p_usuario_solicitante;
    
    v_es_admin := (v_count > 0);
    
    -- Validaciones de negocio
    IF p_nuevo_salario <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'El salario debe ser positivo');
    END IF;
    
    -- Obtener salario actual
    SELECT salario INTO v_salario_actual
    FROM empleados 
    WHERE id_empleado = p_emp_id;
    
    -- Validar incremento máximo (solo admins pueden exceder 20%)
    IF NOT v_es_admin AND p_nuevo_salario > v_salario_actual * 1.20 THEN
        RAISE_APPLICATION_ERROR(-20002, 
            'Incremento máximo permitido: 20%. Contacte al administrador.');
    END IF;
    
    -- Actualizar salario
    UPDATE empleados 
    SET salario = p_nuevo_salario,
        fecha_modificacion = SYSDATE,
        modificado_por = p_usuario_solicitante
    WHERE id_empleado = p_emp_id;
    
    -- Auditoría de la operación
    INSERT INTO auditoria_salarios (
        emp_id, salario_anterior, salario_nuevo, 
        usuario, fecha, ip_origen, tipo_operacion
    ) VALUES (
        p_emp_id, v_salario_actual, p_nuevo_salario,
        p_usuario_solicitante, SYSDATE, v_ip_cliente, 'UPDATE_SALARY'
    );
    
    COMMIT;
    
    DBMS_OUTPUT.PUT_LINE('Salario actualizado exitosamente');
    
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Empleado no encontrado');
    WHEN OTHERS THEN
        ROLLBACK;
        -- Log del error
        INSERT INTO error_log (fecha, usuario, error_code, mensaje, ip_origen)
        VALUES (SYSDATE, p_usuario_solicitante, SQLCODE, SQLERRM, v_ip_cliente);
        COMMIT;
        RAISE;
END;

-- 6. Función para validar permisos
CREATE OR REPLACE FUNCTION tiene_permiso(
    p_usuario VARCHAR2,
    p_objeto VARCHAR2,
    p_privilegio VARCHAR2
) RETURN BOOLEAN IS
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM (
        -- Privilegios directos
        SELECT 1 FROM user_tab_privs 
        WHERE grantee = p_usuario 
        AND table_name = p_objeto 
        AND privilege = p_privilegio
        
        UNION
        
        -- Privilegios a través de roles
        SELECT 1 FROM user_role_privs urp
        JOIN role_tab_privs rtp ON urp.granted_role = rtp.role
        WHERE urp.username = p_usuario
        AND rtp.table_name = p_objeto
        AND rtp.privilege = p_privilegio
    );
    
    RETURN (v_count > 0);
END;`}</pre>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">🔐 Características de Seguridad:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>AUTHID DEFINER:</strong> Ejecuta con privilegios del propietario del procedimiento
            </li>
            <li>
              • <strong>Validación de roles:</strong> Verifica permisos antes de operaciones críticas
            </li>
            <li>
              • <strong>Auditoría completa:</strong> Registra todas las operaciones con IP y usuario
            </li>
            <li>
              • <strong>Validaciones de negocio:</strong> Reglas específicas según el tipo de usuario
            </li>
            <li>
              • <strong>Manejo de errores:</strong> Log de errores para análisis de seguridad
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Ejercicios Prácticos",
    subtitle: "Aplicando SQL dinámico y seguridad",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Desafíos de Seguridad y SQL Dinámico - Sistema Trilladora</h3>
        </div>

        <div className="grid gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
              🔧 Ejercicio 1: Generador de Reportes Dinámico para Trilladora
            </h4>
            <p className="text-sm mb-3">
              Crear un sistema de reportes que permita consultas flexibles pero seguras sobre las tablas de trilladora.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Permitir selección dinámica de columnas de TBL_PRODUCTOS, TBL_INVENTARIOS, TBL_LOTES</li>
              <li>• Implementar filtros variables por fechas, códigos, estados</li>
              <li>• Validar todos los nombres de tablas y columnas con DBMS_ASSERT</li>
              <li>• Usar parámetros seguros para valores de filtro</li>
              <li>• Incluir joins dinámicos entre tablas relacionadas</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">
              🛡️ Ejercicio 2: Sistema de Roles para Operaciones de Trilladora
            </h4>
            <p className="text-sm mb-3">
              Implementar un sistema de permisos detallado para diferentes tipos de usuarios de la trilladora.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Crear roles para: Operador, Supervisor, Gerente, Administrador</li>
              <li>• Definir permisos específicos sobre TBL_ENTRADAS, TBL_FACTURAS, TBL_ORDENPEDIDOS</li>
              <li>• Implementar permisos por cliente (NIT_CLIENTE) y vendedor</li>
              <li>• Crear procedimientos que validen permisos antes de operaciones críticas</li>
              <li>• Sistema de auditoría para cambios en datos sensibles</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">
              🔍 Ejercicio 3: Validador de Seguridad para Datos de Trilladora
            </h4>
            <p className="text-sm mb-3">
              Desarrollar herramientas para detectar y prevenir vulnerabilidades en operaciones de trilladora.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Función para detectar patrones sospechosos en campos de texto (OBSERVACIONES, REMESA)</li>
              <li>• Validador de integridad referencial entre tablas relacionadas</li>
              <li>• Monitor de operaciones masivas sospechosas en inventarios</li>
              <li>• Generador de reportes de inconsistencias en datos</li>
              <li>• Sistema de alertas para cambios críticos en facturas y pedidos</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
]

export function Week8Slides() {
  return <SlideViewer slides={week8Slides} moduleTitle="Módulo 1: Fundamentos de PL/SQL" weekNumber={8} />
}

export default Week8Slides
