/* ============================================================
   DATASETS DE PRÁCTICA
   Esquemas ejecutables sobre los que corren los ejercicios de
   exercises.js. Tres dominios estables, no uno por semana.

   Reglas (ver AGENTS.md §6.4):
   - Todo DDL es idempotente: corre limpio dos veces seguidas.
   - Nada requiere privilegios de DBA.
   - Fechas fijas donde el resultado debe ser reproducible;
     relativas a SYSDATE donde importa la vigencia.
   - Tipos siempre dimensionados. COMMIT al final del seed.
   ============================================================ */

const DATASETS = {
  /* ---------------------------------------------------------- */
  rh: {
    nombre: "Recursos Humanos",
    descripcion:
      "Departamentos y empleados. Es la base de los ejercicios de SQL, bloques PL/SQL, cursores, procedimientos y triggers.",
    tablas: ["departamentos", "empleados", "empleados_audit"],
    ddl: `\`\`\`sql
-- Teardown idempotente: Oracle no tiene DROP TABLE IF EXISTS
-- antes de 23c, asi que se recorre el diccionario del usuario.
BEGIN
  FOR t IN (SELECT table_name FROM user_tables
            WHERE table_name IN ('EMPLEADOS_AUDIT','EMPLEADOS','DEPARTAMENTOS')) LOOP
    EXECUTE IMMEDIATE 'DROP TABLE ' || t.table_name || ' CASCADE CONSTRAINTS PURGE';
  END LOOP;
  FOR s IN (SELECT sequence_name FROM user_sequences
            WHERE sequence_name IN ('SEQ_EMPLEADOS','SEQ_AUDIT')) LOOP
    EXECUTE IMMEDIATE 'DROP SEQUENCE ' || s.sequence_name;
  END LOOP;
END;
/

CREATE TABLE departamentos (
  departamento_id NUMBER(4)    PRIMARY KEY,
  nombre          VARCHAR2(50) NOT NULL UNIQUE,
  ubicacion       VARCHAR2(60)
);

CREATE TABLE empleados (
  emp_id          NUMBER(6)    PRIMARY KEY,
  nombre          VARCHAR2(50) NOT NULL,
  apellido        VARCHAR2(50) NOT NULL,
  email           VARCHAR2(100) UNIQUE,
  telefono        VARCHAR2(20),
  fecha_contrato  DATE         DEFAULT SYSDATE NOT NULL,
  salario         NUMBER(9,2)  NOT NULL,
  cargo           VARCHAR2(40),
  estado          VARCHAR2(10) DEFAULT 'ACTIVO' NOT NULL,
  departamento_id NUMBER(4),
  CONSTRAINT ck_emp_salario CHECK (salario > 0),
  CONSTRAINT ck_emp_estado  CHECK (estado IN ('ACTIVO','INACTIVO')),
  CONSTRAINT fk_emp_dept    FOREIGN KEY (departamento_id)
    REFERENCES departamentos (departamento_id)
);

-- Se llena con los triggers de la semana 6
CREATE TABLE empleados_audit (
  audit_id    NUMBER(10)   PRIMARY KEY,
  emp_id      NUMBER(6),
  campo       VARCHAR2(30),
  valor_ant   VARCHAR2(100),
  valor_nue   VARCHAR2(100),
  operacion   VARCHAR2(10),
  usuario     VARCHAR2(30) DEFAULT USER,
  fecha       DATE         DEFAULT SYSDATE
);

CREATE SEQUENCE seq_empleados START WITH 1000 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE seq_audit     START WITH 1    INCREMENT BY 1 NOCACHE;

-- Indice sobre la FK: Oracle NO lo crea solo y las semanas 3 y 14 lo necesitan
CREATE INDEX ix_emp_dept ON empleados (departamento_id);
\`\`\``,
    seed: `\`\`\`sql
INSERT INTO departamentos VALUES (10, 'Ventas',    'Cali');
INSERT INTO departamentos VALUES (20, 'Sistemas',  'Bogotá');
INSERT INTO departamentos VALUES (30, 'Finanzas',  'Cali');
INSERT INTO departamentos VALUES (40, 'Logística', 'Buenaventura');

-- Fechas fijas: los promedios y conteos deben dar siempre lo mismo
INSERT INTO empleados VALUES (1001,'Ana','Ríos','ana.rios@empresa.com','3001112233',
  DATE '2019-03-04', 4200000, 'Ejecutiva de cuenta','ACTIVO',10);
INSERT INTO empleados VALUES (1002,'Luis','Peña','luis.pena@empresa.com','3002223344',
  DATE '2020-07-15', 3100000, 'Vendedor','ACTIVO',10);
INSERT INTO empleados VALUES (1003,'Marta','Gil','marta.gil@empresa.com','3003334455',
  DATE '2018-01-22', 6800000, 'Jefe de ventas','ACTIVO',10);
INSERT INTO empleados VALUES (1004,'Jorge','Toro','jorge.toro@empresa.com','3004445566',
  DATE '2021-11-02', 2800000, 'Vendedor','ACTIVO',10);
INSERT INTO empleados VALUES (1005,'Sofía','Mora','sofia.mora@empresa.com','3005556677',
  DATE '2022-05-30', 2600000, 'Vendedor','INACTIVO',10);
INSERT INTO empleados VALUES (1006,'Diego','Lara','diego.lara@empresa.com','3006667788',
  DATE '2017-09-11', 9500000, 'Arquitecto','ACTIVO',20);
INSERT INTO empleados VALUES (1007,'Elena','Ruiz','elena.ruiz@empresa.com','3007778899',
  DATE '2019-06-18', 7200000, 'Desarrolladora','ACTIVO',20);
INSERT INTO empleados VALUES (1008,'Pablo','Cano','pablo.cano@empresa.com','3008889900',
  DATE '2021-02-08', 5400000, 'Desarrollador','ACTIVO',20);
INSERT INTO empleados VALUES (1009,'Irene','Vega','irene.vega@empresa.com','3009990011',
  DATE '2023-04-17', 3900000, 'Analista','ACTIVO',20);
INSERT INTO empleados VALUES (1010,'Hugo','Nieto','hugo.nieto@empresa.com','3010001122',
  DATE '2020-10-05', 6100000, 'DBA','ACTIVO',20);
INSERT INTO empleados VALUES (1011,'Clara','Soto','clara.soto@empresa.com','3011112233',
  DATE '2016-08-29', 8900000, 'Directora financiera','ACTIVO',30);
INSERT INTO empleados VALUES (1012,'Iván','Bravo','ivan.bravo@empresa.com','3012223344',
  DATE '2019-12-01', 5200000, 'Contador','ACTIVO',30);
INSERT INTO empleados VALUES (1013,'Nora','Pardo','nora.pardo@empresa.com','3013334455',
  DATE '2022-03-14', 3400000, 'Auxiliar contable','ACTIVO',30);
INSERT INTO empleados VALUES (1014,'Raúl','Mesa','raul.mesa@empresa.com','3014445566',
  DATE '2018-05-21', 4700000, 'Tesorero','ACTIVO',30);
INSERT INTO empleados VALUES (1015,'Lucía','Rey','lucia.rey@empresa.com','3015556677',
  DATE '2021-07-26', 2900000, 'Operaria','ACTIVO',40);
INSERT INTO empleados VALUES (1016,'Tomás','Ossa','tomas.ossa@empresa.com','3016667788',
  DATE '2020-01-13', 3300000, 'Coordinador','ACTIVO',40);
INSERT INTO empleados VALUES (1017,'Paula','Cruz','paula.cruz@empresa.com','3017778899',
  DATE '2023-09-04', 2500000, 'Operaria','ACTIVO',40);
INSERT INTO empleados VALUES (1018,'Mario','Duque','mario.duque@empresa.com','3018889900',
  DATE '2017-04-19', 7600000, 'Jefe de logística','ACTIVO',40);
INSERT INTO empleados VALUES (1019,'Sara','Luna','sara.luna@empresa.com','3019990011',
  DATE '2022-11-08', 3000000, 'Operaria','INACTIVO',40);
INSERT INTO empleados VALUES (1020,'Óscar','Rueda','oscar.rueda@empresa.com','3020001122',
  DATE '2024-02-26', 2700000, 'Aprendiz','ACTIVO',40);

-- Dos empleados sin departamento: obligan a pensar en NULL y en LEFT JOIN
INSERT INTO empleados VALUES (1021,'Elsa','Prada','elsa.prada@empresa.com','3021112233',
  DATE '2024-06-03', 3500000, 'Consultora','ACTIVO',NULL);
INSERT INTO empleados VALUES (1022,'Bruno','Salas','bruno.salas@empresa.com','3022223344',
  DATE '2024-08-12', 4100000, 'Consultor','ACTIVO',NULL);

COMMIT;
\`\`\``,
    seedMasivo: `\`\`\`sql
-- Volumen para los ejercicios de BULK COLLECT (semana 7) y de
-- indices y EXPLAIN PLAN (semana 14). Genera 50.000 empleados.
INSERT INTO empleados (emp_id, nombre, apellido, email, fecha_contrato,
                       salario, cargo, estado, departamento_id)
SELECT 2000 + LEVEL,
       'Nombre'   || LEVEL,
       'Apellido' || LEVEL,
       'emp' || LEVEL || '@empresa.com',
       DATE '2015-01-01' + MOD(LEVEL * 7, 3650),
       1500000 + MOD(LEVEL * 1237, 8000000),
       CASE MOD(LEVEL, 4)
         WHEN 0 THEN 'Vendedor'
         WHEN 1 THEN 'Analista'
         WHEN 2 THEN 'Operario'
         ELSE 'Auxiliar'
       END,
       CASE WHEN MOD(LEVEL, 17) = 0 THEN 'INACTIVO' ELSE 'ACTIVO' END,
       10 + (MOD(LEVEL, 4) * 10)
FROM dual
CONNECT BY LEVEL <= 50000;

COMMIT;

-- Estadisticas actualizadas: sin esto el optimizador decide a ciegas
BEGIN
  DBMS_STATS.GATHER_TABLE_STATS(USER, 'EMPLEADOS');
END;
/
\`\`\``,
    verificacion: `\`\`\`sql
SELECT COUNT(*) AS empleados FROM empleados;        -- esperado: 22
SELECT COUNT(*) AS departamentos FROM departamentos; -- esperado: 4
SELECT SUM(salario) AS masa_salarial FROM empleados;  -- esperado: 103400000
SELECT ROUND(AVG(salario)) AS salario_promedio FROM empleados; -- esperado: 4700000
\`\`\``,
  },

  /* ---------------------------------------------------------- */
  inventario: {
    nombre: "Inventario y Pedidos",
    descripcion:
      "Productos, lotes, inventario y pedidos. Es el esquema sobre el que se evalúa el examen final de la semana 11, así que conviene tenerlo sembrado desde la semana 5.",
    tablas: [
      "TBL_PRODUCTOS",
      "TBL_LOTES",
      "TBL_INVENTARIOS",
      "TBL_ORDENPEDIDOS",
      "TBL_DETALLEPEDIDOS",
      "TBL_AUDITORIA_INVENTARIO",
    ],
    ddl: `\`\`\`sql
BEGIN
  FOR t IN (SELECT table_name FROM user_tables WHERE table_name IN (
              'TBL_AUDITORIA_INVENTARIO','TBL_DETALLEPEDIDOS','TBL_ORDENPEDIDOS',
              'TBL_INVENTARIOS','TBL_LOTES','TBL_PRODUCTOS')) LOOP
    EXECUTE IMMEDIATE 'DROP TABLE ' || t.table_name || ' CASCADE CONSTRAINTS PURGE';
  END LOOP;
  FOR s IN (SELECT sequence_name FROM user_sequences
            WHERE sequence_name IN ('SEQ_AUDITORIA_INV','SEQ_ORDEN')) LOOP
    EXECUTE IMMEDIATE 'DROP SEQUENCE ' || s.sequence_name;
  END LOOP;
END;
/

CREATE TABLE TBL_PRODUCTOS (
  COD_PRODUCTO VARCHAR2(10)  PRIMARY KEY,
  NOMBRE       VARCHAR2(60)  NOT NULL,
  PESOXUNIDAD  NUMBER(8,3)   NOT NULL,
  PESOXCAJA    NUMBER(8,3)   NOT NULL,
  PRECIO       NUMBER(12,2)  NOT NULL,
  CONSTRAINT ck_prod_peso   CHECK (PESOXUNIDAD > 0),
  CONSTRAINT ck_prod_precio CHECK (PRECIO > 0)
);

CREATE TABLE TBL_LOTES (
  COD_LOTE          VARCHAR2(10) PRIMARY KEY,
  COD_PRODUCTO      VARCHAR2(10) NOT NULL,
  CANTIDAD          NUMBER(8)    NOT NULL,
  FECHA_INGRESO     DATE         NOT NULL,
  FECHA_VENCIMIENTO DATE         NOT NULL,
  CONSTRAINT ck_lote_cant CHECK (CANTIDAD >= 0),
  CONSTRAINT fk_lote_prod FOREIGN KEY (COD_PRODUCTO)
    REFERENCES TBL_PRODUCTOS (COD_PRODUCTO)
);

CREATE TABLE TBL_INVENTARIOS (
  COD_PRODUCTO        VARCHAR2(10) PRIMARY KEY,
  INVEN_TOTAL         NUMBER(10)   DEFAULT 0 NOT NULL,
  FECHA_ACTUALIZACION DATE         DEFAULT SYSDATE,
  CONSTRAINT ck_inv_total CHECK (INVEN_TOTAL >= 0),
  CONSTRAINT fk_inv_prod  FOREIGN KEY (COD_PRODUCTO)
    REFERENCES TBL_PRODUCTOS (COD_PRODUCTO)
);

CREATE TABLE TBL_ORDENPEDIDOS (
  COD_ORDEN   NUMBER(8)     PRIMARY KEY,
  FECHA       DATE          NOT NULL,
  ESTADO      VARCHAR2(15)  DEFAULT 'PENDIENTE' NOT NULL,
  COD_CLIENTE VARCHAR2(10),
  CONSTRAINT ck_orden_estado CHECK (ESTADO IN ('PENDIENTE','DESPACHADA','ANULADA'))
);

CREATE TABLE TBL_DETALLEPEDIDOS (
  COD_ORDEN    NUMBER(8)    NOT NULL,
  COD_PRODUCTO VARCHAR2(10) NOT NULL,
  CANTIDAD     NUMBER(8)    NOT NULL,
  CONSTRAINT pk_detalle PRIMARY KEY (COD_ORDEN, COD_PRODUCTO),
  CONSTRAINT ck_det_cant CHECK (CANTIDAD > 0),
  CONSTRAINT fk_det_orden FOREIGN KEY (COD_ORDEN)
    REFERENCES TBL_ORDENPEDIDOS (COD_ORDEN),
  CONSTRAINT fk_det_prod  FOREIGN KEY (COD_PRODUCTO)
    REFERENCES TBL_PRODUCTOS (COD_PRODUCTO)
);

CREATE TABLE TBL_AUDITORIA_INVENTARIO (
  COD_AUDITORIA NUMBER(10)   PRIMARY KEY,
  COD_PRODUCTO  VARCHAR2(10),
  OPERACION     VARCHAR2(10),
  STOCK_ANT     NUMBER(10),
  STOCK_NUE     NUMBER(10),
  USUARIO       VARCHAR2(30) DEFAULT USER,
  FECHA         DATE         DEFAULT SYSDATE
);

CREATE SEQUENCE seq_auditoria_inv START WITH 1   INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE seq_orden         START WITH 500 INCREMENT BY 1 NOCACHE;
\`\`\``,
    seed: `\`\`\`sql
INSERT INTO TBL_PRODUCTOS VALUES ('P001','Café molido 500g',      0.500,  12.000,  18500);
INSERT INTO TBL_PRODUCTOS VALUES ('P002','Azúcar refinada 1kg',   1.000,  24.000,   4200);
INSERT INTO TBL_PRODUCTOS VALUES ('P003','Arroz premium 5kg',     5.000, 120.000,  21000);
INSERT INTO TBL_PRODUCTOS VALUES ('P004','Sal marina 250g',       0.250,   6.000,   2300);
INSERT INTO TBL_PRODUCTOS VALUES ('P005','Aceite girasol 900ml',  0.920,  11.040,   9800);
INSERT INTO TBL_PRODUCTOS VALUES ('P006','Harina de trigo 1kg',   1.000,  24.000,   5100);
INSERT INTO TBL_PRODUCTOS VALUES ('P007','Panela cuadrada 6kg',   6.000,  36.000,  15400);
INSERT INTO TBL_PRODUCTOS VALUES ('P008','Especias surtidas 50g', 0.050,   1.200,   7600);

-- FECHA_VENCIMIENTO relativa a SYSDATE: los ejercicios de
-- "proximos a vencer en 30 dias" deben seguir funcionando el ano que viene.
INSERT INTO TBL_LOTES VALUES ('L001','P001', 400, SYSDATE - 120, SYSDATE + 12);
INSERT INTO TBL_LOTES VALUES ('L002','P001', 250, SYSDATE -  90, SYSDATE + 200);
INSERT INTO TBL_LOTES VALUES ('L003','P002', 900, SYSDATE - 200, SYSDATE + 25);
INSERT INTO TBL_LOTES VALUES ('L004','P003', 150, SYSDATE -  60, SYSDATE + 400);
INSERT INTO TBL_LOTES VALUES ('L005','P003', 180, SYSDATE -  30, SYSDATE + 5);
INSERT INTO TBL_LOTES VALUES ('L006','P004',1200, SYSDATE - 150, SYSDATE + 700);
INSERT INTO TBL_LOTES VALUES ('L007','P005', 300, SYSDATE - 100, SYSDATE + 18);
INSERT INTO TBL_LOTES VALUES ('L008','P006', 500, SYSDATE -  45, SYSDATE + 90);
INSERT INTO TBL_LOTES VALUES ('L009','P007',  60, SYSDATE - 220, SYSDATE - 10); -- ya vencido
INSERT INTO TBL_LOTES VALUES ('L010','P001', 320, SYSDATE -  15, SYSDATE + 28);
INSERT INTO TBL_LOTES VALUES ('L011','P008',  80, SYSDATE -  10, SYSDATE + 365);
INSERT INTO TBL_LOTES VALUES ('L012','P002', 640, SYSDATE -  75, SYSDATE + 3);

-- P008 queda deliberadamente por debajo del STOCK_MINIMO de 10
INSERT INTO TBL_INVENTARIOS VALUES ('P001', 970, SYSDATE);
INSERT INTO TBL_INVENTARIOS VALUES ('P002',1540, SYSDATE);
INSERT INTO TBL_INVENTARIOS VALUES ('P003', 330, SYSDATE);
INSERT INTO TBL_INVENTARIOS VALUES ('P004',1200, SYSDATE);
INSERT INTO TBL_INVENTARIOS VALUES ('P005', 300, SYSDATE);
INSERT INTO TBL_INVENTARIOS VALUES ('P006', 500, SYSDATE);
INSERT INTO TBL_INVENTARIOS VALUES ('P007',  60, SYSDATE);
INSERT INTO TBL_INVENTARIOS VALUES ('P008',   4, SYSDATE);

INSERT INTO TBL_ORDENPEDIDOS VALUES (501, DATE '2024-02-10','DESPACHADA','C001');
INSERT INTO TBL_ORDENPEDIDOS VALUES (502, DATE '2024-03-05','DESPACHADA','C002');
INSERT INTO TBL_ORDENPEDIDOS VALUES (503, DATE '2024-03-18','PENDIENTE', 'C001');
INSERT INTO TBL_ORDENPEDIDOS VALUES (504, DATE '2024-04-02','PENDIENTE', 'C003');
INSERT INTO TBL_ORDENPEDIDOS VALUES (505, DATE '2024-04-21','ANULADA',   'C002');

INSERT INTO TBL_DETALLEPEDIDOS VALUES (501,'P001', 20);
INSERT INTO TBL_DETALLEPEDIDOS VALUES (501,'P002', 15);
INSERT INTO TBL_DETALLEPEDIDOS VALUES (502,'P003',  8);
INSERT INTO TBL_DETALLEPEDIDOS VALUES (502,'P005', 12);
INSERT INTO TBL_DETALLEPEDIDOS VALUES (503,'P001', 30);
INSERT INTO TBL_DETALLEPEDIDOS VALUES (503,'P004', 25);
INSERT INTO TBL_DETALLEPEDIDOS VALUES (503,'P007',  5);
INSERT INTO TBL_DETALLEPEDIDOS VALUES (504,'P006', 40);
INSERT INTO TBL_DETALLEPEDIDOS VALUES (504,'P002', 18);
INSERT INTO TBL_DETALLEPEDIDOS VALUES (505,'P003', 10);

COMMIT;
\`\`\``,
    seedMasivo: `\`\`\`sql
-- 200.000 lotes para que BULK COLLECT y los indices tengan sentido
INSERT INTO TBL_LOTES (COD_LOTE, COD_PRODUCTO, CANTIDAD,
                       FECHA_INGRESO, FECHA_VENCIMIENTO)
SELECT 'X' || LPAD(LEVEL, 9, '0'),
       'P00' || (1 + MOD(LEVEL, 8)),
       1 + MOD(LEVEL * 13, 500),
       SYSDATE - MOD(LEVEL, 400),
       SYSDATE + MOD(LEVEL * 7, 500) - 60
FROM dual
CONNECT BY LEVEL <= 200000;

COMMIT;

BEGIN
  DBMS_STATS.GATHER_TABLE_STATS(USER, 'TBL_LOTES');
END;
/
\`\`\``,
    verificacion: `\`\`\`sql
SELECT COUNT(*) AS productos FROM TBL_PRODUCTOS;   -- esperado: 8
SELECT COUNT(*) AS lotes     FROM TBL_LOTES;       -- esperado: 12
SELECT COUNT(*) AS detalles  FROM TBL_DETALLEPEDIDOS; -- esperado: 10
-- Lotes por vencer en 30 dias: esperado 6 (L001 +12, L003 +25, L005 +5,
-- L007 +18, L010 +28, L012 +3). L009 ya vencio y queda fuera del rango.
SELECT COUNT(*) FROM TBL_LOTES
WHERE FECHA_VENCIMIENTO BETWEEN SYSDATE AND SYSDATE + 30;
\`\`\``,
  },

  /* ---------------------------------------------------------- */
  banco: {
    nombre: "Sistema Bancario",
    descripcion:
      "Clientes, cuentas y transacciones. Es el esquema del proyecto final: se diseña en la semana 4, se construye en la 10, se le agrega la lógica en la 13 y se defiende en la 16.",
    tablas: ["clientes", "cuentas", "transacciones", "auditoria_transacciones"],
    ddl: `\`\`\`sql
BEGIN
  FOR t IN (SELECT table_name FROM user_tables WHERE table_name IN (
              'AUDITORIA_TRANSACCIONES','TRANSACCIONES','CUENTAS','CLIENTES')) LOOP
    EXECUTE IMMEDIATE 'DROP TABLE ' || t.table_name || ' CASCADE CONSTRAINTS PURGE';
  END LOOP;
  FOR s IN (SELECT sequence_name FROM user_sequences WHERE sequence_name IN (
              'SEQ_CLIENTES','SEQ_CUENTAS','SEQ_TRANSACCIONES','SEQ_AUD_TRX')) LOOP
    EXECUTE IMMEDIATE 'DROP SEQUENCE ' || s.sequence_name;
  END LOOP;
END;
/

CREATE TABLE clientes (
  cliente_id      NUMBER(8)     PRIMARY KEY,
  nombre_completo VARCHAR2(80)  NOT NULL,
  identificacion  VARCHAR2(20)  NOT NULL UNIQUE,
  direccion       VARCHAR2(120),
  telefono        VARCHAR2(20),
  fecha_registro  DATE          DEFAULT SYSDATE NOT NULL
);

-- El saldo es NUMBER(14,2): dinero SIEMPRE con escala explicita
CREATE TABLE cuentas (
  numero_cuenta  NUMBER(12)    PRIMARY KEY,
  cliente_id     NUMBER(8)     NOT NULL,
  tipo           VARCHAR2(10)  NOT NULL,
  saldo          NUMBER(14,2)  DEFAULT 0 NOT NULL,
  estado         VARCHAR2(10)  DEFAULT 'ACTIVA' NOT NULL,
  fecha_apertura DATE          DEFAULT SYSDATE NOT NULL,
  CONSTRAINT ck_cta_saldo  CHECK (saldo >= 0),
  CONSTRAINT ck_cta_tipo   CHECK (tipo   IN ('AHORROS','CORRIENTE')),
  CONSTRAINT ck_cta_estado CHECK (estado IN ('ACTIVA','INACTIVA','BLOQUEADA')),
  CONSTRAINT fk_cta_cliente FOREIGN KEY (cliente_id)
    REFERENCES clientes (cliente_id)
);

CREATE TABLE transacciones (
  transaccion_id   NUMBER(12)    PRIMARY KEY,
  cuenta_id        NUMBER(12)    NOT NULL,
  tipo_transaccion VARCHAR2(15)  NOT NULL,
  monto            NUMBER(14,2)  NOT NULL,
  fecha            DATE          DEFAULT SYSDATE NOT NULL,
  cuenta_destino   NUMBER(12),
  descripcion      VARCHAR2(120),
  CONSTRAINT ck_trx_monto CHECK (monto > 0),
  CONSTRAINT ck_trx_tipo  CHECK (tipo_transaccion IN
    ('DEPOSITO','RETIRO','TRANSFERENCIA','REVERSO')),
  CONSTRAINT fk_trx_cuenta FOREIGN KEY (cuenta_id)
    REFERENCES cuentas (numero_cuenta)
);

CREATE TABLE auditoria_transacciones (
  auditoria_id NUMBER(12)   PRIMARY KEY,
  cuenta_id    NUMBER(12),
  operacion    VARCHAR2(15),
  saldo_ant    NUMBER(14,2),
  saldo_nue    NUMBER(14,2),
  usuario      VARCHAR2(30) DEFAULT USER,
  fecha        DATE         DEFAULT SYSDATE
);

CREATE SEQUENCE seq_clientes      START WITH 1     INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE seq_cuentas       START WITH 10001 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE seq_transacciones START WITH 1     INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE seq_aud_trx       START WITH 1     INCREMENT BY 1 NOCACHE;
\`\`\``,
    seed: `\`\`\`sql
INSERT INTO clientes VALUES (1,'Ana María Ríos','1144556677','Cra 5 #12-34, Cali','3001112233', DATE '2022-01-15');
INSERT INTO clientes VALUES (2,'Luis Fernando Peña','7788990011','Av 6N #22-10, Cali','3002223344', DATE '2022-03-20');
INSERT INTO clientes VALUES (3,'Marta Lucía Gil','2233445566','Calle 9 #45-67, Palmira','3003334455', DATE '2023-02-08');
INSERT INTO clientes VALUES (4,'Jorge Enrique Toro','9900112233','Cra 100 #16-20, Cali','3004445566', DATE '2023-07-11');
INSERT INTO clientes VALUES (5,'Sofía Alejandra Mora','5566778899','Calle 70 #3-15, Yumbo','3005556677', DATE '2024-05-02');

INSERT INTO cuentas VALUES (10001, 1,'AHORROS',  4500000.00,'ACTIVA',   DATE '2022-01-15');
INSERT INTO cuentas VALUES (10002, 1,'CORRIENTE',12800000.00,'ACTIVA',   DATE '2022-06-01');
INSERT INTO cuentas VALUES (10003, 2,'AHORROS',   850000.00,'ACTIVA',   DATE '2022-03-20');
INSERT INTO cuentas VALUES (10004, 3,'AHORROS',  7200000.00,'ACTIVA',   DATE '2023-02-08');
INSERT INTO cuentas VALUES (10005, 3,'CORRIENTE',       0.00,'INACTIVA', DATE '2023-02-08');
INSERT INTO cuentas VALUES (10006, 4,'AHORROS',  2300000.00,'BLOQUEADA', DATE '2023-07-11');
INSERT INTO cuentas VALUES (10007, 5,'AHORROS',   150000.00,'ACTIVA',   DATE '2024-05-02');

INSERT INTO transacciones VALUES (1,10001,'DEPOSITO',      5000000.00, DATE '2024-01-10', NULL,'Apertura con nómina');
INSERT INTO transacciones VALUES (2,10001,'RETIRO',         500000.00, DATE '2024-01-25', NULL,'Cajero automático');
INSERT INTO transacciones VALUES (3,10002,'DEPOSITO',     13000000.00, DATE '2024-02-01', NULL,'Transferencia externa');
INSERT INTO transacciones VALUES (4,10002,'RETIRO',          200000.00, DATE '2024-02-14', NULL,'Pago proveedor');
INSERT INTO transacciones VALUES (5,10003,'DEPOSITO',       1000000.00, DATE '2024-02-20', NULL,'Consignación');
INSERT INTO transacciones VALUES (6,10003,'TRANSFERENCIA',   150000.00, DATE '2024-03-01',10007,'Envío a Sofía');
INSERT INTO transacciones VALUES (7,10004,'DEPOSITO',       7500000.00, DATE '2024-03-15', NULL,'Venta de vehículo');
INSERT INTO transacciones VALUES (8,10004,'RETIRO',          300000.00, DATE '2024-04-02', NULL,'Cajero automático');
INSERT INTO transacciones VALUES (9,10007,'DEPOSITO',        150000.00, DATE '2024-03-01', NULL,'Recepción de transferencia');

COMMIT;
\`\`\``,
    verificacion: `\`\`\`sql
SELECT COUNT(*) AS clientes FROM clientes;      -- esperado: 5
SELECT COUNT(*) AS cuentas  FROM cuentas;       -- esperado: 7
SELECT SUM(saldo) AS saldo_total FROM cuentas;  -- esperado: 27800000
-- Coherencia: una cuenta INACTIVA con saldo 0 y una BLOQUEADA con saldo,
-- para que los ejercicios de validacion de estado tengan casos reales.
SELECT estado, COUNT(*) FROM cuentas GROUP BY estado;
\`\`\``,
  },
};
