import { SlideViewer } from "../slide-viewer"

const week9Slides = [
  {
    id: 1,
    title: "ACLs y Vistas Materializadas",
    subtitle: "Seguridad de red y optimización con vistas materializadas",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Módulo 1: Fundamentos de PL/SQL</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Control de acceso a recursos de red y optimización avanzada con vistas materializadas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">🌐 Access Control Lists</h4>
            <ul className="text-sm space-y-2">
              <li>• Control de acceso a recursos de red</li>
              <li>• Restricción de conexiones HTTP/HTTPS</li>
              <li>• Configuración de hosts permitidos</li>
              <li>• Seguridad a nivel de base de datos</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">📊 Vistas Materializadas</h4>
            <ul className="text-sm space-y-2">
              <li>• Almacenamiento físico de consultas</li>
              <li>• Mejora significativa del rendimiento</li>
              <li>• Refresco automático y manual</li>
              <li>• Optimización para reportes y análisis</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">🎯 Objetivos de la Semana</h4>
          <p className="text-sm">
            Implementar controles de seguridad de red robustos y optimizar el rendimiento de consultas complejas
            mediante vistas materializadas con diferentes estrategias de refresco.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Access Control Lists (ACLs)",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Control de Acceso a Recursos de Red</h3>
        </div>

        <div className="grid gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-3">¿Qué son las ACLs?</h4>
            <p className="text-sm mb-4">
              Las Access Control Lists permiten controlar qué usuarios de la base de datos pueden acceder a recursos de
              red externos desde PL/SQL, como servicios web, servidores FTP, o envío de emails.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                <h5 className="font-medium text-blue-600 mb-2">Protocolos Soportados:</h5>
                <ul className="text-sm space-y-1">
                  <li>• HTTP/HTTPS (UTL_HTTP)</li>
                  <li>• FTP (UTL_FTP)</li>
                  <li>• SMTP (UTL_SMTP)</li>
                  <li>• TCP (UTL_TCP)</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                <h5 className="font-medium text-green-600 mb-2">Beneficios de Seguridad:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Previene accesos no autorizados</li>
                  <li>• Control granular por usuario</li>
                  <li>• Restricción por host y puerto</li>
                  <li>• Auditoría de accesos de red</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-600 mb-3">Componentes de una ACL</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <strong>Principal:</strong> Usuario o rol que recibe el permiso
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <strong>Privilege:</strong> Tipo de acceso (connect, resolve)
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <strong>Host:</strong> Servidor de destino (dominio o IP)
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <strong>Port Range:</strong> Rango de puertos permitidos
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
    title: "Configuración de ACLs",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Implementación Práctica de ACLs</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`-- 1. Crear ACL para acceso a servicios web
BEGIN
    -- Crear la ACL
    DBMS_NETWORK_ACL_ADMIN.CREATE_ACL(
        acl         => 'web_services_acl.xml',
        description => 'ACL para acceso a servicios web externos',
        principal   => 'APP_USER',
        is_grant    => TRUE,
        privilege   => 'connect'
    );
    
    -- Agregar privilegio de resolución DNS
    DBMS_NETWORK_ACL_ADMIN.ADD_PRIVILEGE(
        acl       => 'web_services_acl.xml',
        principal => 'APP_USER',
        is_grant  => TRUE,
        privilege => 'resolve'
    );
    
    COMMIT;
END;
/

-- 2. Asignar ACL a hosts específicos
BEGIN
    -- Permitir acceso a API externa
    DBMS_NETWORK_ACL_ADMIN.ASSIGN_ACL(
        acl        => 'web_services_acl.xml',
        host       => 'api.ejemplo.com',
        lower_port => 80,
        upper_port => 443
    );
    
    -- Permitir acceso a servicios de Google
    DBMS_NETWORK_ACL_ADMIN.ASSIGN_ACL(
        acl        => 'web_services_acl.xml',
        host       => '*.googleapis.com',
        lower_port => 443,
        upper_port => 443
    );
    
    -- Permitir acceso a servidor SMTP interno
    DBMS_NETWORK_ACL_ADMIN.ASSIGN_ACL(
        acl        => 'web_services_acl.xml',
        host       => '192.168.1.100',
        lower_port => 25,
        upper_port => 587
    );
    
    COMMIT;
END;
/

-- 3. Procedimiento para consumir API web con ACL
CREATE OR REPLACE PROCEDURE consultar_api_externa(
    p_endpoint VARCHAR2,
    p_parametros VARCHAR2 DEFAULT NULL
) IS
    v_request UTL_HTTP.REQ;
    v_response UTL_HTTP.RESP;
    v_data VARCHAR2(32767);
    v_url VARCHAR2(4000);
BEGIN
    -- Construir URL completa
    v_url := 'https://api.ejemplo.com' || p_endpoint;
    IF p_parametros IS NOT NULL THEN
        v_url := v_url || '?' || p_parametros;
    END IF;
    
    -- Configurar request HTTP
    v_request := UTL_HTTP.BEGIN_REQUEST(
        url    => v_url,
        method => 'GET'
    );
    
    -- Agregar headers necesarios
    UTL_HTTP.SET_HEADER(v_request, 'User-Agent', 'Oracle-PL/SQL-Client');
    UTL_HTTP.SET_HEADER(v_request, 'Accept', 'application/json');
    
    -- Obtener respuesta
    v_response := UTL_HTTP.GET_RESPONSE(v_request);
    
    -- Leer datos de respuesta
    BEGIN
        LOOP
            UTL_HTTP.READ_TEXT(v_response, v_data, 32767);
            DBMS_OUTPUT.PUT_LINE(v_data);
        END LOOP;
    EXCEPTION
        WHEN UTL_HTTP.END_OF_BODY THEN
            NULL; -- Fin normal de la respuesta
    END;
    
    -- Cerrar conexión
    UTL_HTTP.END_RESPONSE(v_response);
    
    DBMS_OUTPUT.PUT_LINE('Consulta API completada exitosamente');
    
EXCEPTION
    WHEN UTL_HTTP.REQUEST_FAILED THEN
        DBMS_OUTPUT.PUT_LINE('Error en request HTTP: ' || SQLERRM);
        UTL_HTTP.END_RESPONSE(v_response);
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error general: ' || SQLERRM);
        IF v_response.status_code IS NOT NULL THEN
            UTL_HTTP.END_RESPONSE(v_response);
        END IF;
END;
/

-- 4. Consultar ACLs configuradas
SELECT 
    acl,
    principal,
    privilege,
    is_grant,
    start_date,
    end_date
FROM dba_network_acl_privileges
WHERE acl LIKE '%web_services%'
ORDER BY acl, principal;

-- 5. Ver asignaciones de ACL a hosts
SELECT 
    acl,
    host,
    lower_port,
    upper_port
FROM dba_network_acls
WHERE acl LIKE '%web_services%'
ORDER BY host;`}</pre>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Puntos Importantes:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>connect:</strong> Permite establecer conexiones de red
            </li>
            <li>
              • <strong>resolve:</strong> Permite resolución de nombres DNS
            </li>
            <li>
              • <strong>Wildcards:</strong> Se pueden usar patrones como *.dominio.com
            </li>
            <li>
              • <strong>Rangos de puertos:</strong> Especificar puertos exactos o rangos
            </li>
            <li>
              • <strong>Auditoría:</strong> Todas las conexiones pueden ser auditadas
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Vistas Materializadas - Conceptos",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Optimización con Vistas Materializadas</h3>
        </div>

        <div className="grid gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-green-600 mb-3">¿Qué son las Vistas Materializadas?</h4>
            <p className="text-sm mb-4">
              Las vistas materializadas almacenan físicamente el resultado de una consulta compleja, mejorando
              dramáticamente el rendimiento de consultas repetitivas y reportes.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                <h5 className="font-medium text-green-600 mb-2">Ventajas:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Consultas instantáneas</li>
                  <li>• Reducción de carga en tablas base</li>
                  <li>• Ideal para reportes y análisis</li>
                  <li>• Soporte para agregaciones complejas</li>
                </ul>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
                <h5 className="font-medium text-orange-600 mb-2">Consideraciones:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Requiere espacio de almacenamiento</li>
                  <li>• Datos pueden estar desactualizados</li>
                  <li>• Costo de mantenimiento/refresco</li>
                  <li>• Complejidad de gestión</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-3">Tipos de Refresco</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  C
                </div>
                <div>
                  <strong>COMPLETE:</strong> Regenera completamente la vista desde cero.
                  <div className="text-xs text-gray-500 mt-1">Más lento pero siempre funciona</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  F
                </div>
                <div>
                  <strong>FAST:</strong> Solo actualiza los cambios incrementales.
                  <div className="text-xs text-gray-500 mt-1">Muy rápido pero requiere materialized view logs</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ?
                </div>
                <div>
                  <strong>FORCE:</strong> Intenta FAST, si no puede usa COMPLETE.
                  <div className="text-xs text-gray-500 mt-1">Opción más flexible y recomendada</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-600 mb-3">Estrategias de Refresco</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                <h5 className="font-medium text-purple-600 mb-2">ON DEMAND:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Refresco manual cuando sea necesario</li>
                  <li>• Control total sobre el timing</li>
                  <li>• Ideal para datos que cambian poco</li>
                </ul>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded">
                <h5 className="font-medium text-indigo-600 mb-2">ON COMMIT:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Refresco automático al hacer COMMIT</li>
                  <li>• Datos siempre actualizados</li>
                  <li>• Impacto en rendimiento de DML</li>
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
    title: "Creación de Vistas Materializadas",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Implementación Práctica</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`-- 1. Vista materializada básica para reportes de ventas
CREATE MATERIALIZED VIEW mv_ventas_mensuales
BUILD IMMEDIATE
REFRESH COMPLETE ON DEMAND
ENABLE QUERY REWRITE
AS
SELECT 
    EXTRACT(YEAR FROM fecha_venta) AS año,
    EXTRACT(MONTH FROM fecha_venta) AS mes,
    d.nombre_departamento,
    COUNT(*) AS total_ventas,
    SUM(v.monto) AS monto_total,
    AVG(v.monto) AS promedio_venta,
    MIN(v.monto) AS venta_minima,
    MAX(v.monto) AS venta_maxima
FROM ventas v
JOIN empleados e ON v.vendedor_id = e.id_empleado
JOIN departamentos d ON e.departamento_id = d.id_departamento
GROUP BY 
    EXTRACT(YEAR FROM fecha_venta),
    EXTRACT(MONTH FROM fecha_venta),
    d.nombre_departamento;

-- 2. Crear materialized view log para refresco FAST
CREATE MATERIALIZED VIEW LOG ON ventas
WITH ROWID, SEQUENCE (fecha_venta, monto, vendedor_id)
INCLUDING NEW VALUES;

CREATE MATERIALIZED VIEW LOG ON empleados
WITH ROWID, SEQUENCE (id_empleado, departamento_id)
INCLUDING NEW VALUES;

-- 3. Vista materializada con refresco FAST
CREATE MATERIALIZED VIEW mv_inventario_actual
BUILD IMMEDIATE
REFRESH FAST ON COMMIT
ENABLE QUERY REWRITE
AS
SELECT 
    p.id_producto,
    p.nombre_producto,
    p.categoria,
    p.precio_unitario,
    COALESCE(SUM(i.cantidad_entrada), 0) - 
    COALESCE(SUM(i.cantidad_salida), 0) AS stock_actual,
    MAX(i.fecha_movimiento) AS ultima_actualizacion
FROM productos p
LEFT JOIN inventario_movimientos i ON p.id_producto = i.id_producto
GROUP BY p.id_producto, p.nombre_producto, p.categoria, p.precio_unitario;

-- 4. Vista materializada para análisis de rendimiento de empleados
CREATE MATERIALIZED VIEW mv_rendimiento_empleados
BUILD IMMEDIATE
REFRESH COMPLETE
START WITH SYSDATE
NEXT SYSDATE + 1  -- Refresco diario automático
AS
SELECT 
    e.id_empleado,
    e.nombre,
    e.apellido,
    d.nombre_departamento,
    COUNT(v.id_venta) AS total_ventas_mes,
    SUM(v.monto) AS monto_ventas_mes,
    AVG(v.monto) AS promedio_venta,
    RANK() OVER (
        PARTITION BY d.id_departamento 
        ORDER BY SUM(v.monto) DESC
    ) AS ranking_departamento,
    CASE 
        WHEN SUM(v.monto) >= 50000 THEN 'EXCELENTE'
        WHEN SUM(v.monto) >= 30000 THEN 'BUENO'
        WHEN SUM(v.monto) >= 15000 THEN 'REGULAR'
        ELSE 'NECESITA_MEJORA'
    END AS categoria_rendimiento
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.id_departamento
LEFT JOIN ventas v ON e.id_empleado = v.vendedor_id
    AND v.fecha_venta >= TRUNC(SYSDATE, 'MM')  -- Solo mes actual
GROUP BY e.id_empleado, e.nombre, e.apellido, d.id_departamento, d.nombre_departamento;

-- 5. Procedimiento para gestión de refrescos
CREATE OR REPLACE PROCEDURE gestionar_refrescos_mv IS
    v_start_time TIMESTAMP;
    v_end_time TIMESTAMP;
    v_duration INTERVAL DAY TO SECOND;
BEGIN
    v_start_time := SYSTIMESTAMP;
    
    -- Refresco de vista de ventas mensuales
    DBMS_OUTPUT.PUT_LINE('Iniciando refresco de mv_ventas_mensuales...');
    DBMS_MVIEW.REFRESH('mv_ventas_mensuales', 'C');
    
    -- Refresco de vista de rendimiento (solo si es necesario)
    DBMS_OUTPUT.PUT_LINE('Iniciando refresco de mv_rendimiento_empleados...');
    DBMS_MVIEW.REFRESH('mv_rendimiento_empleados', 'F');
    
    v_end_time := SYSTIMESTAMP;
    v_duration := v_end_time - v_start_time;
    
    -- Log del proceso
    INSERT INTO mv_refresh_log (
        fecha_refresco, 
        duracion_segundos, 
        estado,
        observaciones
    ) VALUES (
        SYSDATE,
        EXTRACT(SECOND FROM v_duration) + 
        EXTRACT(MINUTE FROM v_duration) * 60 +
        EXTRACT(HOUR FROM v_duration) * 3600,
        'COMPLETADO',
        'Refresco automático exitoso'
    );
    
    COMMIT;
    
    DBMS_OUTPUT.PUT_LINE('Refresco completado en ' || 
                        TO_CHAR(v_duration));
    
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        INSERT INTO mv_refresh_log (
            fecha_refresco, 
            estado,
            observaciones
        ) VALUES (
            SYSDATE,
            'ERROR',
            'Error en refresco: ' || SQLERRM
        );
        COMMIT;
        RAISE;
END;
/`}</pre>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Características Avanzadas:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>BUILD IMMEDIATE:</strong> Construye la vista inmediatamente
            </li>
            <li>
              • <strong>ENABLE QUERY REWRITE:</strong> Oracle puede usar la vista automáticamente
            </li>
            <li>
              • <strong>START WITH/NEXT:</strong> Programación automática de refrescos
            </li>
            <li>
              • <strong>Materialized View Logs:</strong> Necesarios para refresco FAST
            </li>
            <li>
              • <strong>Gestión de errores:</strong> Log de refrescos para monitoreo
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Gestión y Monitoreo",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Administración de Vistas Materializadas</h3>
        </div>

        <div className="grid gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-3">Consultas de Monitoreo</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-xs">
              <pre>{`-- Estado de vistas materializadas
SELECT 
    mview_name,
    refresh_mode,
    refresh_method,
    build_mode,
    last_refresh_date,
    staleness,
    compile_state
FROM user_mviews
ORDER BY last_refresh_date DESC;

-- Logs de refresco
SELECT 
    log_owner,
    log_table,
    rowids,
    primary_key,
    object_id,
    filter_columns
FROM user_mview_logs;`}</pre>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-green-600 mb-3">Mejores Prácticas</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2 text-green-600">Diseño:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Identificar consultas costosas repetitivas</li>
                  <li>• Usar agregaciones cuando sea posible</li>
                  <li>• Considerar particionamiento para grandes volúmenes</li>
                  <li>• Evaluar trade-off espacio vs rendimiento</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-blue-600">Mantenimiento:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Programar refrescos en horarios de baja carga</li>
                  <li>• Monitorear espacio de almacenamiento</li>
                  <li>• Revisar estadísticas de uso regularmente</li>
                  <li>• Eliminar vistas no utilizadas</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-600 mb-3">Casos de Uso Ideales</h4>
            <div className="space-y-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                <strong>Reportes Ejecutivos:</strong> Dashboards con métricas agregadas que se consultan frecuentemente
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                <strong>Análisis Histórico:</strong> Datos que cambian poco pero se consultan intensivamente
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                <strong>Data Warehousing:</strong> Agregaciones complejas para análisis de negocio
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
                <strong>Consultas Costosas:</strong> JOINs complejos entre múltiples tablas grandes
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
    subtitle: "Aplicando ACLs y vistas materializadas",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Desafíos de Optimización y Seguridad - Sistema Trilladora</h3>
        </div>

        <div className="grid gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
              🌐 Ejercicio 1: Sistema de Integración Segura para Trilladora
            </h4>
            <p className="text-sm mb-3">
              Implementar un sistema que consuma APIs externas de forma segura para operaciones de trilladora.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Configurar ACLs para servicios de precios de commodities y clima</li>
              <li>• Crear procedimientos para consultar APIs de transportadores externos</li>
              <li>• Implementar integración con sistemas de facturación electrónica</li>
              <li>• Sistema de notificaciones automáticas a clientes vía APIs</li>
              <li>• Log de todas las llamadas externas para auditoría de trilladora</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">
              📊 Ejercicio 2: Dashboard de Métricas de Trilladora
            </h4>
            <p className="text-sm mb-3">
              Crear un sistema de reportes optimizado con vistas materializadas usando tablas reales.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Vista materializada para métricas de entradas por día/mes usando TBL_ENTRADAS</li>
              <li>• Vista para análisis de inventario con alertas de stock bajo desde TBL_INVENTARIOS</li>
              <li>• Vista para rendimiento de vendedores con rankings desde TBL_VENDEDORES</li>
              <li>• Vista para análisis de vencimientos de lotes desde TBL_LOTES</li>
              <li>• Sistema de refresco inteligente basado en volumen de operaciones</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">
              ⚡ Ejercicio 3: Optimización de Consultas de Trilladora
            </h4>
            <p className="text-sm mb-3">
              Identificar y optimizar las consultas más costosas del sistema de trilladora.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Crear vista materializada para reportes complejos de TBL_FACTURAS con TBL_ORDENPEDIDOS</li>
              <li>• Vista para análisis histórico de inventarios desde TBL_HISTORICOSINVEN</li>
              <li>• Implementar diferentes estrategias de refresco según criticidad de datos</li>
              <li>• Medir mejoras de rendimiento en consultas de clientes y productos</li>
              <li>• Documentar casos de uso específicos para operaciones de trilladora</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
]

export function Week9Slides() {
  return <SlideViewer slides={week9Slides} moduleTitle="Módulo 1: Fundamentos de PL/SQL" weekNumber={9} />
}

export default Week9Slides
