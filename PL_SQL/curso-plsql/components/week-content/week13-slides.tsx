import { SlideViewer } from "@/components/slide-viewer"

export default function Week13Slides() {
  const slides = [
    {
      id: 1,
      title: "Segunda Entrega del Proyecto",
      subtitle: "Módulo 3: Proyecto Final - Semana 13",
      type: "intro" as const,
      content: (
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-purple-600">Segunda Entrega del Proyecto</h2>
          <p className="text-xl text-gray-600">Sistema Bancario: PL/SQL completo, administración y pruebas</p>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <p className="text-lg">Implementación completa de la lógica de negocio bancaria y administración Oracle</p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Paquetes del Sistema Bancario",
      type: "code" as const,
      content: (
        <div className="space-y-4">
          <p className="text-lg mb-4">Paquete para gestión de transacciones bancarias:</p>
          <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm">
            <code>{`CREATE OR REPLACE PACKAGE gestion_transacciones_pkg IS
    -- Procedimientos para operaciones bancarias
    PROCEDURE realizar_deposito(
        p_numero_cuenta IN NUMBER,
        p_monto IN NUMBER,
        p_usuario_id IN NUMBER
    );
    
    PROCEDURE realizar_retiro(
        p_numero_cuenta IN NUMBER,
        p_monto IN NUMBER,
        p_usuario_id IN NUMBER
    );
    
    PROCEDURE realizar_transferencia(
        p_cuenta_origen IN NUMBER,
        p_cuenta_destino IN NUMBER,
        p_monto IN NUMBER,
        p_usuario_id IN NUMBER
    );
    
    -- Función para generar historial
    FUNCTION generar_historial(
        p_numero_cuenta IN NUMBER,
        p_fecha_inicio IN DATE,
        p_fecha_fin IN DATE
    ) RETURN SYS_REFCURSOR;
END gestion_transacciones_pkg;`}</code>
          </pre>
        </div>
      ),
    },
    {
      id: 3,
      title: "Implementación de Procedimientos",
      type: "code" as const,
      content: (
        <div className="space-y-4">
          <p className="text-lg mb-4">Implementación del procedimiento de depósito:</p>
          <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm">
            <code>{`CREATE OR REPLACE PACKAGE BODY gestion_transacciones_pkg IS
    PROCEDURE realizar_deposito(
        p_numero_cuenta IN NUMBER,
        p_monto IN NUMBER,
        p_usuario_id IN NUMBER
    ) IS
        v_estado_cuenta VARCHAR2(20);
    BEGIN
        -- Verificar estado de la cuenta
        SELECT estado INTO v_estado_cuenta
        FROM Cuenta WHERE numero_cuenta = p_numero_cuenta;
        
        IF v_estado_cuenta != 'activa' THEN
            RAISE_APPLICATION_ERROR(-20001, 'La cuenta no está activa');
        END IF;
        
        -- Registrar la transacción
        INSERT INTO Transaccion (
            numero_cuenta, tipo_transaccion, monto, 
            fecha_transaccion, usuario_id
        ) VALUES (
            p_numero_cuenta, 'DEPOSITO', p_monto,
            SYSDATE, p_usuario_id
        );
        
        -- Actualizar saldo
        UPDATE Cuenta 
        SET saldo = saldo + p_monto 
        WHERE numero_cuenta = p_numero_cuenta;
        
        COMMIT;
    END realizar_deposito;
END gestion_transacciones_pkg;`}</code>
          </pre>
        </div>
      ),
    },
    {
      id: 4,
      title: "Triggers de Validación Bancaria",
      type: "code" as const,
      content: (
        <div className="space-y-4">
          <p className="text-lg mb-4">Trigger para validar retiros bancarios:</p>
          <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm">
            <code>{`CREATE OR REPLACE TRIGGER trg_valida_transaccion_retiro
    BEFORE INSERT ON Transaccion
    FOR EACH ROW
DECLARE
    v_saldo_actual NUMBER;
    v_estado_cuenta VARCHAR2(20);
BEGIN
    IF :NEW.tipo_transaccion = 'RETIRO' THEN
        -- Verificar estado y saldo de la cuenta
        SELECT saldo, estado 
        INTO v_saldo_actual, v_estado_cuenta
        FROM Cuenta 
        WHERE numero_cuenta = :NEW.numero_cuenta;
        
        -- Validar estado de cuenta
        IF v_estado_cuenta != 'activa' THEN
            RAISE_APPLICATION_ERROR(-20002, 
                'No se puede retirar de una cuenta inactiva');
        END IF;
        
        -- Validar saldo suficiente
        IF v_saldo_actual < :NEW.monto THEN
            RAISE_APPLICATION_ERROR(-20003, 
                'Saldo insuficiente para realizar el retiro');
        END IF;
    END IF;
END;`}</code>
          </pre>
        </div>
      ),
    },
    {
      id: 5,
      title: "Administración Oracle Bancaria",
      type: "content" as const,
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold mb-4">Aspectos de Administración para Sistema Bancario:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Usuarios Bancarios</h4>
              <p className="text-sm">Roles específicos: cajero, administrador, auditor con privilegios diferenciados</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Índices Financieros</h4>
              <p className="text-sm">Optimización para consultas de saldos, transacciones y auditoría</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Seguridad Bancaria</h4>
              <p className="text-sm">Encriptación de datos sensibles y control de acceso estricto</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-2">Auditoría</h4>
              <p className="text-sm">Registro completo de todas las operaciones financieras</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Entregables Requeridos",
      type: "exercise" as const,
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-orange-700 dark:text-orange-300">Segunda Entrega:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>Paquetes PL/SQL bancarios implementados y documentados</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>Funciones de autenticación y validación con casos de prueba</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>Triggers de validación y auditoría bancaria</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <span>Scripts de administración (usuarios bancarios, roles, seguridad)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  5
                </span>
                <span>Suite completa de pruebas de transacciones bancarias</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ]

  return <SlideViewer slides={slides} moduleTitle="Módulo 3: Proyecto Final" weekNumber={13} />
}
