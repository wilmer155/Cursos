"use client"

import { SlideViewer } from "../slide-viewer"

const week4Slides = [
  {
    id: 1,
    title: "Diseño de Sistemas Bancarios Modernos",
    subtitle: "Proyecto: Base de Datos y PL/SQL de un Banco",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Módulo 3: Proyecto Final</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Sistema de gestión bancaria con Oracle y PL/SQL
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Objetivos del Sistema</h4>
            <ul className="text-sm space-y-2">
              <li>• Diseño de base de datos relacional segura</li>
              <li>• Implementación de lógica de negocio con PL/SQL</li>
              <li>• Garantizar integridad y consistencia</li>
              <li>• Sistema de auditoría completo</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Metodología de Trabajo</h4>
            <ul className="text-sm space-y-2">
              <li>• 3 entregas incrementales</li>
              <li>• Equipos de 5 personas</li>
              <li>• Aplicación funcional completa</li>
              <li>• Interfaz reactiva moderna</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Modelo Entidad-Relación (MER)",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Estructura de la Base de Datos Bancaria</h3>
        </div>

        <div className="grid gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-3">Entidades Principales</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                <strong>Cliente:</strong>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• PK: cliente_id</li>
                  <li>• nombre_completo</li>
                  <li>• identificacion</li>
                  <li>• direccion</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                <strong>Cuenta:</strong>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• PK: numero_cuenta</li>
                  <li>• FK: cliente_id</li>
                  <li>• tipo_cuenta, saldo</li>
                  <li>• estado ('activa', 'inactiva', 'bloqueada')</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                <strong>Transacción:</strong>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• PK: transaccion_id</li>
                  <li>• FK: cuenta_id</li>
                  <li>• tipo_transaccion</li>
                  <li>• monto, fecha_transaccion</li>
                </ul>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
                <strong>Usuario:</strong>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• PK: usuario_id</li>
                  <li>• FK: rol_id</li>
                  <li>• nombre_usuario</li>
                  <li>• contrasena (encriptada)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-green-600 mb-3">Entidades de Soporte</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                <strong>Rol:</strong>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• PK: rol_id</li>
                  <li>• nombre_rol</li>
                </ul>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                <strong>Auditoria_Transacciones:</strong>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• PK: auditoria_id</li>
                  <li>• FKs: transaccion_id, usuario_id</li>
                  <li>• fecha_operacion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Lógica de Negocio con PL/SQL",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Implementación en la Base de Datos</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`-- Paquete de Gestión de Clientes
CREATE OR REPLACE PACKAGE gestion_clientes_pkg AS
    PROCEDURE crear_cliente(
        p_nombre_completo IN VARCHAR2,
        p_identificacion IN VARCHAR2,
        p_direccion IN VARCHAR2
    );
END gestion_clientes_pkg;

-- Paquete de Gestión de Cuentas
CREATE OR REPLACE PACKAGE gestion_cuentas_pkg AS
    PROCEDURE cambiar_estado_cuenta(
        p_numero_cuenta IN NUMBER,
        p_nuevo_estado IN VARCHAR2
    );
END gestion_cuentas_pkg;

-- Paquete de Transacciones
CREATE OR REPLACE PACKAGE gestion_transacciones_pkg AS
    PROCEDURE realizar_deposito(
        p_cuenta_id IN NUMBER,
        p_monto IN NUMBER
    );
    
    PROCEDURE realizar_retiro(
        p_cuenta_id IN NUMBER,
        p_monto IN NUMBER
    );
    
    PROCEDURE realizar_transferencia(
        p_cuenta_origen IN NUMBER,
        p_cuenta_destino IN NUMBER,
        p_monto IN NUMBER
    );
    
    FUNCTION generar_historial(
        p_cuenta_id IN NUMBER
    ) RETURN SYS_REFCURSOR;
END gestion_transacciones_pkg;

-- Trigger de Validación de Retiros
CREATE OR REPLACE TRIGGER trg_valida_transaccion_retiro
    BEFORE INSERT ON Transaccion
    FOR EACH ROW
WHEN (NEW.tipo_transaccion = 'RETIRO')
DECLARE
    v_saldo NUMBER;
    v_estado VARCHAR2(20);
BEGIN
    SELECT saldo, estado INTO v_saldo, v_estado
    FROM Cuenta WHERE numero_cuenta = :NEW.cuenta_id;
    
    IF v_estado != 'activa' THEN
        RAISE_APPLICATION_ERROR(-20001, 'Cuenta no está activa');
    END IF;
    
    IF v_saldo < :NEW.monto THEN
        RAISE_APPLICATION_ERROR(-20002, 'Saldo insuficiente');
    END IF;
END;`}</pre>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Componentes Clave:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>Paquetes:</strong> Organización modular de procedimientos y funciones
            </li>
            <li>
              • <strong>Triggers:</strong> Validación automática y auditoría de transacciones
            </li>
            <li>
              • <strong>Secuencias:</strong> Generación automática de IDs únicos
            </li>
            <li>
              • <strong>Seguridad:</strong> Autenticación y control de acceso por roles
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Interfaz de Usuario Reactiva",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Comportamiento Orientado a Eventos</h3>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Pantalla de Inicio de Sesión</h4>
            <ul className="text-sm space-y-1">
              <li>
                • Formulario que emite evento <code>usuario.login.solicitado</code>
              </li>
              <li>
                • Validación con <code>autenticacion_pkg.validar_credenciales</code>
              </li>
              <li>• Redirección al Dashboard o mensaje de error</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Dashboard Principal (Reactivo)</h4>
            <ul className="text-sm space-y-1">
              <li>• Métricas en tiempo real: "Total de Cuentas Activas"</li>
              <li>• Actualización automática con eventos del backend</li>
              <li>• Gráficos dinámicos de transacciones</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Gestión de Clientes y Cuentas</h4>
            <ul className="text-sm space-y-1">
              <li>
                • Tabla que se actualiza con evento <code>cuenta.estado.cambiado</code>
              </li>
              <li>• Filtros dinámicos por estado y tipo de cuenta</li>
              <li>• Acciones en tiempo real (activar/desactivar cuentas)</li>
            </ul>
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-r-lg">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Pantalla de Transacciones</h4>
            <ul className="text-sm space-y-1">
              <li>• Indicador de carga durante transferencias</li>
              <li>
                • Actualización de saldo con evento <code>transaccion.realizada</code>
              </li>
              <li>• Notificaciones de éxito/error en tiempo real</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Plan de Entregas del Proyecto",
    subtitle: "Cronograma de desarrollo incremental",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Entregas Incrementales - Sistema Bancario</h3>
        </div>

        <div className="grid gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Primera Entrega - Estructura Base</h4>
            <ul className="text-sm space-y-1">
              <li>• Creación de todas las tablas del MER bancario</li>
              <li>• Implementación de constraints y relaciones</li>
              <li>• Scripts de inserción de datos de prueba</li>
              <li>• Paquete básico de gestión de clientes</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">
              Segunda Entrega - Lógica de Negocio
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Paquetes completos de gestión (cuentas, transacciones)</li>
              <li>• Triggers de validación y auditoría</li>
              <li>• Sistema de autenticación y roles</li>
              <li>• Procedimientos de transferencias seguras</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">
              Tercera Entrega - Aplicación Completa
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Interfaz de usuario reactiva completa</li>
              <li>• Dashboard con métricas en tiempo real</li>
              <li>• Sistema de reportes y consultas</li>
              <li>• Documentación técnica y manual de usuario</li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Preguntas de Reflexión</h4>
            <ul className="text-sm space-y-1">
              <li>• ¿Cómo beneficia la lógica PL/SQL la integridad del sistema?</li>
              <li>• ¿Por qué son importantes los triggers y secuencias?</li>
              <li>• ¿Qué ventajas tiene una interfaz reactiva en sistemas bancarios?</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
]

export function Week4Slides() {
  return (
    <div className="space-y-6">
      <SlideViewer slides={week4Slides} moduleTitle="Módulo 3: Proyecto Final" weekNumber={4} />

      <div className="flex justify-center mt-8">
        <button
          className="pdf-button bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
          onClick={() =>
            window.open("https://wilmer155.github.io/Cursos/PL_SQL/Proyecto_Gestion_Banco_PLSQL.pdf", "_blank")
          }
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clipRule="evenodd"
            />
          </svg>
          Ver PDF del Proyecto
        </button>
      </div>
    </div>
  )
}

export default Week4Slides
