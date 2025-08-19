import { SlideViewer } from "../slide-viewer"

const week6Slides = [
  {
    id: 1,
    title: "Triggers en Oracle",
    subtitle: "Código que se ejecuta automáticamente",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">¿Qué son los Triggers?</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Los triggers son bloques PL/SQL que se ejecutan automáticamente en respuesta a eventos específicos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Cuándo se Ejecutan</h4>
            <ul className="text-sm space-y-1">
              <li>INSERT</li>
              <li>UPDATE</li>
              <li>DELETE</li>
              <li>CREATE</li>
              <li>ALTER</li>
              <li>DROP</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Tipos de Timing</h4>
            <ul className="text-sm space-y-1">
              <li>
                <strong>BEFORE:</strong> Antes del evento
              </li>
              <li>
                <strong>AFTER:</strong> Después del evento
              </li>
              <li>
                <strong>INSTEAD OF:</strong> En lugar del evento (vistas)
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Usos Comunes</h4>
            <ul className="text-sm space-y-1">
              <li>Auditoría</li>
              <li>Validación compleja</li>
              <li>Logging</li>
              <li>Sincronización</li>
              <li>Cálculos automáticos</li>
            </ul>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Consideraciones Importantes</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Ventajas:</strong>
              <ul className="mt-1 space-y-1">
                <li>Ejecución automática</li>
                <li>Transparente para aplicaciones</li>
                <li>Integridad de datos</li>
                <li>Centralización de lógica</li>
              </ul>
            </div>
            <div>
              <strong>Desventajas:</strong>
              <ul className="mt-1 space-y-1">
                <li>Difíciles de debuggear</li>
                <li>Pueden afectar rendimiento</li>
                <li>Lógica oculta</li>
                <li>Cascadas complejas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Sintaxis de Triggers",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Estructura Básica de un Trigger</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`CREATE OR REPLACE TRIGGER nombre_trigger
    BEFORE | AFTER | INSTEAD OF
    INSERT | UPDATE | DELETE [OR INSERT | UPDATE | DELETE...]
    ON nombre_tabla
    [FOR EACH ROW]
    [WHEN (condicion)]
DECLARE
    -- Declaraciones (opcional)
BEGIN
    -- Código del trigger
    
EXCEPTION
    -- Manejo de excepciones (opcional)
END nombre_trigger;
/`}</pre>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Elementos Clave</h4>
            <ul className="text-sm space-y-1">
              <li>
                <strong>TIMING:</strong> BEFORE, AFTER, INSTEAD OF
              </li>
              <li>
                <strong>EVENTO:</strong> INSERT, UPDATE, DELETE
              </li>
              <li>
                <strong>FOR EACH ROW:</strong> Trigger de fila vs statement
              </li>
              <li>
                <strong>WHEN:</strong> Condición adicional
              </li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Pseudoregistros</h4>
            <ul className="text-sm space-y-1">
              <li>
                <strong>:NEW:</strong> Valores nuevos (INSERT/UPDATE)
              </li>
              <li>
                <strong>:OLD:</strong> Valores anteriores (UPDATE/DELETE)
              </li>
              <li>Solo disponibles en triggers FOR EACH ROW</li>
              <li>Se pueden modificar en BEFORE triggers</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Predicados Condicionales</h4>
          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
            <pre>{`IF INSERTING THEN
    -- Código para INSERT
ELSIF UPDATING THEN
    -- Código para UPDATE
    IF UPDATING('columna') THEN
        -- Código para UPDATE de columna específica
    END IF;
ELSIF DELETING THEN
    -- Código para DELETE
END IF;`}</pre>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Trigger de Auditoría",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Ejemplo: Auditoría de Cambios en Empleados</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">1. Crear Tabla de Auditoría</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`CREATE TABLE auditoria_empleados (
    audit_id        NUMBER PRIMARY KEY,
    emp_id          NUMBER,
    operacion       VARCHAR2(10),
    campo_modificado VARCHAR2(50),
    valor_anterior  VARCHAR2(200),
    valor_nuevo     VARCHAR2(200),
    usuario         VARCHAR2(50),
    fecha_cambio    DATE
);

CREATE SEQUENCE seq_auditoria START WITH 1;`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">2. Crear Trigger de Auditoría</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`CREATE OR REPLACE TRIGGER trg_auditoria_empleados
    AFTER INSERT OR UPDATE OR DELETE
    ON empleados
    FOR EACH ROW
DECLARE
    v_operacion VARCHAR2(10);
BEGIN
    -- Determinar tipo de operación
    IF INSERTING THEN
        v_operacion := 'INSERT';
        INSERT INTO auditoria_empleados VALUES (
            seq_auditoria.NEXTVAL,
            :NEW.emp_id,
            v_operacion,
            'NUEVO_EMPLEADO',
            NULL,
            :NEW.nombre || ' - ' || :NEW.salario,
            USER,
            SYSDATE
        );
    ELSIF UPDATING THEN
        v_operacion := 'UPDATE';
        
        -- Auditar cambio de nombre
        IF :OLD.nombre != :NEW.nombre THEN
            INSERT INTO auditoria_empleados VALUES (
                seq_auditoria.NEXTVAL, :NEW.emp_id, v_operacion,
                'NOMBRE', :OLD.nombre, :NEW.nombre, USER, SYSDATE
            );
        END IF;
        
        -- Auditar cambio de salario
        IF :OLD.salario != :NEW.salario THEN
            INSERT INTO auditoria_empleados VALUES (
                seq_auditoria.NEXTVAL, :NEW.emp_id, v_operacion,
                'SALARIO', TO_CHAR(:OLD.salario), TO_CHAR(:NEW.salario), 
                USER, SYSDATE
            );
        END IF;
        
    ELSIF DELETING THEN
        v_operacion := 'DELETE';
        INSERT INTO auditoria_empleados VALUES (
            seq_auditoria.NEXTVAL,
            :OLD.emp_id,
            v_operacion,
            'EMPLEADO_ELIMINADO',
            :OLD.nombre || ' - ' || :OLD.salario,
            NULL,
            USER,
            SYSDATE
        );
    END IF;
END trg_auditoria_empleados;
/`}</pre>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Trigger BEFORE para Validación",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Validación y Modificación de Datos</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`CREATE OR REPLACE TRIGGER trg_validar_empleado
    BEFORE INSERT OR UPDATE
    ON empleados
    FOR EACH ROW
DECLARE
    v_count NUMBER;
    v_salario_max NUMBER;
BEGIN
    -- Convertir nombre a formato apropiado
    :NEW.nombre := INITCAP(TRIM(:NEW.nombre));
    
    -- Validar email único (solo si se proporciona)
    IF :NEW.email IS NOT NULL THEN
        SELECT COUNT(*)
        INTO v_count
        FROM empleados
        WHERE UPPER(email) = UPPER(:NEW.email)
        AND emp_id != NVL(:NEW.emp_id, -1);
        
        IF v_count > 0 THEN
            RAISE_APPLICATION_ERROR(-20001, 
                'El email ya existe para otro empleado');
        END IF;
        
        -- Convertir email a minúsculas
        :NEW.email := LOWER(:NEW.email);
    END IF;
    
    -- Validar salario según el departamento
    SELECT MAX(salario) * 1.5
    INTO v_salario_max
    FROM empleados
    WHERE departamento_id = :NEW.departamento_id;
    
    IF :NEW.salario > NVL(v_salario_max, 10000) THEN
        RAISE_APPLICATION_ERROR(-20002, 
            'Salario excede el límite del departamento');
    END IF;
    
    -- Asignar fecha de contrato si es INSERT
    IF INSERTING AND :NEW.fecha_contrato IS NULL THEN
        :NEW.fecha_contrato := SYSDATE;
    END IF;
    
    -- Validar que no se reduzca el salario más del 10%
    IF UPDATING('salario') AND :NEW.salario < :OLD.salario * 0.9 THEN
        RAISE_APPLICATION_ERROR(-20003, 
            'No se puede reducir el salario más del 10%');
    END IF;
    
END trg_validar_empleado;
/`}</pre>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Características del Trigger:</h4>
          <ul className="text-sm space-y-1">
            <li>
              <strong>BEFORE:</strong> Permite modificar :NEW antes de guardar
            </li>
            <li>
              <strong>INITCAP:</strong> Formatea nombres apropiadamente
            </li>
            <li>
              <strong>RAISE_APPLICATION_ERROR:</strong> Lanza errores personalizados
            </li>
            <li>
              <strong>Validaciones complejas:</strong> Que no se pueden hacer con constraints
            </li>
            <li>
              <strong>Valores automáticos:</strong> Asigna fecha_contrato si es NULL
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Trigger para IDs Automáticos",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Asignación Automática de IDs</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Antes de Oracle 12c, los triggers eran la forma estándar de asignar IDs automáticos
          </p>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`-- Crear secuencia para IDs
CREATE SEQUENCE seq_empleados
    START WITH 1000
    INCREMENT BY 1
    NOCACHE;

-- Trigger para asignar ID automáticamente
CREATE OR REPLACE TRIGGER trg_empleados_id
    BEFORE INSERT
    ON empleados
    FOR EACH ROW
    WHEN (NEW.emp_id IS NULL)
BEGIN
    :NEW.emp_id := seq_empleados.NEXTVAL;
END trg_empleados_id;
/

-- Ejemplo de uso
INSERT INTO empleados (nombre, salario, departamento_id)
VALUES ('Carlos López', 4500, 20);
-- El emp_id se asigna automáticamente

-- También funciona si se especifica NULL
INSERT INTO empleados (emp_id, nombre, salario, departamento_id)
VALUES (NULL, 'María Rodríguez', 5200, 30);

-- Pero no interfiere si se proporciona un ID
INSERT INTO empleados (emp_id, nombre, salario, departamento_id)
VALUES (2000, 'Ana Martínez', 4800, 10);`}</pre>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Ventajas del Approach</h4>
            <ul className="text-sm space-y-1">
              <li>
                <strong>WHEN clause:</strong> Solo se ejecuta si ID es NULL
              </li>
              <li>
                <strong>Flexibilidad:</strong> Permite IDs manuales
              </li>
              <li>
                <strong>Transparente:</strong> Aplicación no necesita cambios
              </li>
              <li>
                <strong>Consistente:</strong> Siempre genera IDs únicos
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Oracle 12c+ Alternativa</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`-- Columna con IDENTITY (Oracle 12c+)
ALTER TABLE empleados 
MODIFY emp_id NUMBER 
GENERATED BY DEFAULT AS IDENTITY;`}</pre>
            </div>
            <p className="text-xs mt-2">Más eficiente que triggers para IDs automáticos</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Ejercicio Práctico",
    subtitle: "Triggers para Control de Inventario",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Sistema de Triggers - Trilladora</h3>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Contexto del Ejercicio</h4>
          <p className="text-sm mb-2">
            Implementar triggers para automatizar el control de inventario en la trilladora, incluyendo auditoría y
            validaciones.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Parte 1: Trigger de Auditoría</h4>
          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
            <pre>{`-- Actualizado para usar tablas reales de trilladora
-- Crear tabla de auditoría
CREATE TABLE TBL_AUDITORIA_INVENTARIO (
    audit_id NUMBER PRIMARY KEY,
    cod_producto NUMBER,
    operacion VARCHAR2(10),
    piso_afectado NUMBER,
    cantidad_anterior NUMBER,
    cantidad_nueva NUMBER,
    usuario VARCHAR2(50),
    fecha_cambio DATE
);

CREATE SEQUENCE seq_auditoria_inv START WITH 1;

-- Trigger de auditoría para TBL_INVENTARIOS
CREATE OR REPLACE TRIGGER trg_audit_inventarios
    AFTER UPDATE ON TBL_INVENTARIOS
    FOR EACH ROW
BEGIN
    -- Auditar cambios en INVEN_PISO1
    IF :OLD.INVEN_PISO1 != :NEW.INVEN_PISO1 THEN
        INSERT INTO TBL_AUDITORIA_INVENTARIO VALUES (
            seq_auditoria_inv.NEXTVAL,
            :NEW.COD_PRODUCTO,
            'UPDATE',
            1,
            :OLD.INVEN_PISO1,
            :NEW.INVEN_PISO1,
            USER,
            SYSDATE
        );
    END IF;
    
    -- Auditar cambios en INVEN_PISO2
    IF :OLD.INVEN_PISO2 != :NEW.INVEN_PISO2 THEN
        INSERT INTO TBL_AUDITORIA_INVENTARIO VALUES (
            seq_auditoria_inv.NEXTVAL,
            :NEW.COD_PRODUCTO,
            'UPDATE',
            2,
            :OLD.INVEN_PISO2,
            :NEW.INVEN_PISO2,
            USER,
            SYSDATE
        );
    END IF;
END;
/`}</pre>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Parte 2: Triggers de Validación</h4>
          <ol className="text-sm space-y-1">
            <li>Trigger BEFORE UPDATE en TBL_INVENTARIOS para validar que INVEN_TOTAL = INVEN_PISO1 + INVEN_PISO2</li>
            <li>Trigger para no permitir inventario negativo</li>
            <li>Trigger en TBL_DETALLEPEDIDOS para verificar stock disponible antes de crear pedidos</li>
            <li>Trigger para actualizar automáticamente TBL_HISTORICOSINVEN</li>
          </ol>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Bonus:</h4>
          <p className="text-sm">
            Crear trigger que genere alertas automáticas cuando un lote esté próximo a vencer (TBL_LOTES) y tenga
            inventario disponible.
          </p>
        </div>
      </div>
    ),
  },
]

export function Week6Slides() {
  return <SlideViewer slides={week6Slides} moduleTitle="Módulo 1: Fundamentos de PL/SQL" weekNumber={6} />
}
