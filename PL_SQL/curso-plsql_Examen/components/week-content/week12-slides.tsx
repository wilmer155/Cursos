import { SlideViewer } from "../slide-viewer"

const week12Slides = [
  {
    id: 1,
    title: "Arquitectura Oracle",
    subtitle: "Componentes fundamentales del SGBD",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Arquitectura de Oracle Database</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Comprender la arquitectura es fundamental para la administración efectiva
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Instancia Oracle</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>SGA:</strong> System Global Area
              </li>
              <li>
                • <strong>PGA:</strong> Program Global Area
              </li>
              <li>
                • <strong>Procesos Background:</strong> PMON, SMON, DBWn, LGWR
              </li>
              <li>
                • <strong>Procesos Server:</strong> Atienden conexiones
              </li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Base de Datos</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Datafiles:</strong> Archivos de datos
              </li>
              <li>
                • <strong>Control Files:</strong> Metadatos de la BD
              </li>
              <li>
                • <strong>Redo Logs:</strong> Registro de cambios
              </li>
              <li>
                • <strong>Archive Logs:</strong> Logs archivados
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">System Global Area (SGA)</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Database Buffer Cache:</strong>
              <p className="text-xs mt-1">Almacena bloques de datos más utilizados</p>
            </div>
            <div>
              <strong>Shared Pool:</strong>
              <p className="text-xs mt-1">SQL compartido, diccionario de datos</p>
            </div>
            <div>
              <strong>Redo Log Buffer:</strong>
              <p className="text-xs mt-1">Cambios antes de escribir a disco</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Gestión de Usuarios",
    subtitle: "Creación y administración de cuentas",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Administración de Usuarios Oracle</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Tipos de Usuarios</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>SYS:</strong> Propietario del diccionario
              </li>
              <li>
                • <strong>SYSTEM:</strong> Usuario administrativo
              </li>
              <li>
                • <strong>Usuarios de aplicación:</strong> Para desarrollo
              </li>
              <li>
                • <strong>Usuarios de esquema:</strong> Propietarios de objetos
              </li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Autenticación</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Password:</strong> Autenticación por contraseña
              </li>
              <li>
                • <strong>External:</strong> Autenticación del SO
              </li>
              <li>
                • <strong>Global:</strong> Directorio empresarial
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Perfiles de Usuario</h4>
          <p className="text-sm mb-2">Los perfiles controlan recursos y políticas de contraseñas:</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Límites de Recursos:</strong>
              <ul className="mt-1 space-y-1">
                <li>• SESSIONS_PER_USER</li>
                <li>• CPU_PER_SESSION</li>
                <li>• CONNECT_TIME</li>
                <li>• LOGICAL_READS_PER_SESSION</li>
              </ul>
            </div>
            <div>
              <strong>Políticas de Contraseña:</strong>
              <ul className="mt-1 space-y-1">
                <li>• PASSWORD_LIFE_TIME</li>
                <li>• PASSWORD_GRACE_TIME</li>
                <li>• PASSWORD_REUSE_TIME</li>
                <li>• FAILED_LOGIN_ATTEMPTS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Creación de Usuarios",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Comandos para Gestión de Usuarios</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Crear Usuario</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Crear usuario básico
CREATE USER desarrollo
IDENTIFIED BY password123
DEFAULT TABLESPACE users
TEMPORARY TABLESPACE temp
QUOTA 100M ON users;

-- Crear usuario con perfil personalizado
CREATE USER app_user
IDENTIFIED BY secure_pass
DEFAULT TABLESPACE app_data
TEMPORARY TABLESPACE temp
PROFILE app_profile
ACCOUNT UNLOCK;

-- Usuario con autenticación externa
CREATE USER ops_user
IDENTIFIED EXTERNALLY
DEFAULT TABLESPACE users;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">Modificar Usuario</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Cambiar contraseña
ALTER USER desarrollo IDENTIFIED BY nueva_password;

-- Cambiar tablespace por defecto
ALTER USER desarrollo DEFAULT TABLESPACE new_tablespace;

-- Modificar cuota
ALTER USER desarrollo QUOTA UNLIMITED ON users;

-- Bloquear/Desbloquear cuenta
ALTER USER desarrollo ACCOUNT LOCK;
ALTER USER desarrollo ACCOUNT UNLOCK;

-- Expirar contraseña (forzar cambio)
ALTER USER desarrollo PASSWORD EXPIRE;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Eliminar Usuario</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Eliminar usuario sin objetos
DROP USER desarrollo;

-- Eliminar usuario con todos sus objetos
DROP USER desarrollo CASCADE;

-- Verificar objetos antes de eliminar
SELECT object_name, object_type 
FROM dba_objects 
WHERE owner = 'DESARROLLO';`}</pre>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Roles y Privilegios",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Sistema de Seguridad Oracle</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Privilegios del Sistema</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>CREATE SESSION:</strong> Conectarse a la BD
              </li>
              <li>
                • <strong>CREATE TABLE:</strong> Crear tablas
              </li>
              <li>
                • <strong>CREATE VIEW:</strong> Crear vistas
              </li>
              <li>
                • <strong>CREATE PROCEDURE:</strong> Crear procedimientos
              </li>
              <li>
                • <strong>DBA:</strong> Administración completa
              </li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Privilegios de Objeto</h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>SELECT:</strong> Consultar datos
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
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Roles Predefinidos</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>CONNECT:</strong>
              <p className="text-xs mt-1">Privilegios básicos de conexión</p>
            </div>
            <div>
              <strong>RESOURCE:</strong>
              <p className="text-xs mt-1">Crear objetos en su esquema</p>
            </div>
            <div>
              <strong>DBA:</strong>
              <p className="text-xs mt-1">Administración completa</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Mejores Prácticas</h4>
          <ul className="text-sm space-y-1">
            <li>• Usar roles en lugar de privilegios directos</li>
            <li>• Aplicar principio de menor privilegio</li>
            <li>• Crear roles específicos por aplicación</li>
            <li>• Auditar cambios de privilegios</li>
            <li>• Revisar privilegios periódicamente</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Gestión de Roles",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Creación y Administración de Roles</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Crear y Configurar Roles</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Crear rol básico
CREATE ROLE app_developer;

-- Crear rol con contraseña
CREATE ROLE app_admin IDENTIFIED BY admin_pass;

-- Otorgar privilegios del sistema al rol
GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW TO app_developer;

-- Otorgar privilegios de objeto al rol
GRANT SELECT, INSERT, UPDATE ON empleados TO app_developer;
GRANT EXECUTE ON pkg_empleados TO app_developer;

-- Crear rol jerárquico
CREATE ROLE app_manager;
GRANT app_developer TO app_manager;
GRANT DELETE ON empleados TO app_manager;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">Asignar Roles a Usuarios</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Otorgar rol a usuario
GRANT app_developer TO desarrollo;
GRANT app_manager TO jefe_proyecto;

-- Otorgar rol con ADMIN OPTION
GRANT app_developer TO desarrollo WITH ADMIN OPTION;

-- Establecer rol por defecto
ALTER USER desarrollo DEFAULT ROLE app_developer;

-- Otorgar todos los roles excepto uno
ALTER USER desarrollo DEFAULT ROLE ALL EXCEPT app_admin;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Consultas de Auditoría</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`-- Ver roles de un usuario
SELECT * FROM dba_role_privs WHERE grantee = 'DESARROLLO';

-- Ver privilegios de un rol
SELECT * FROM dba_sys_privs WHERE grantee = 'APP_DEVELOPER';

-- Ver privilegios de objeto de un rol
SELECT * FROM dba_tab_privs WHERE grantee = 'APP_DEVELOPER';

-- Ver jerarquía de roles
SELECT * FROM role_role_privs WHERE role = 'APP_MANAGER';

-- Ver roles activos en sesión actual
SELECT * FROM session_roles;`}</pre>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Ejercicio Práctico",
    subtitle: "Configuración de Seguridad",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Ejercicio: Sistema de Seguridad para Aplicación</h3>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">
            Parte 1: Crear Perfil Personalizado
          </h4>
          <p className="text-sm mb-2">
            Crear perfil <strong>app_profile</strong> con:
          </p>
          <ul className="text-sm space-y-1">
            <li>• Máximo 3 sesiones concurrentes por usuario</li>
            <li>• Tiempo de conexión máximo: 8 horas</li>
            <li>• Contraseña válida por 90 días</li>
            <li>• Máximo 3 intentos fallidos de login</li>
            <li>• Bloqueo de cuenta por 30 minutos tras fallos</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Parte 2: Crear Estructura de Roles</h4>
          <ol className="text-sm space-y-1">
            <li>
              1. <strong>app_readonly:</strong> Solo lectura en todas las tablas
            </li>
            <li>
              2. <strong>app_operator:</strong> Incluye app_readonly + INSERT/UPDATE
            </li>
            <li>
              3. <strong>app_admin:</strong> Incluye app_operator + DELETE + gestión de usuarios
            </li>
            <li>
              4. <strong>app_developer:</strong> Crear objetos + EXECUTE en procedimientos
            </li>
          </ol>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Parte 3: Crear Usuarios</h4>
          <ol className="text-sm space-y-1">
            <li>
              1. <strong>app_user1:</strong> Operador con perfil personalizado
            </li>
            <li>
              2. <strong>app_admin1:</strong> Administrador con rol app_admin
            </li>
            <li>
              3. <strong>dev_user1:</strong> Desarrollador con cuota ilimitada
            </li>
            <li>4. Asignar tablespace apropiado a cada usuario</li>
          </ol>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">Parte 4: Verificación</h4>
          <ol className="text-sm space-y-1">
            <li>1. Probar conexión con cada usuario</li>
            <li>2. Verificar que los privilegios funcionan correctamente</li>
            <li>3. Intentar operaciones no permitidas (deben fallar)</li>
            <li>4. Consultar vistas del diccionario para verificar configuración</li>
          </ol>
        </div>
      </div>
    ),
  },
]

export function Week12Slides() {
  return <SlideViewer slides={week12Slides} moduleTitle="Módulo 2: Administración Oracle DBA" weekNumber={12} />
}
