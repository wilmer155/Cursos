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
  departamento_id NUMBER(4),
  nombre          VARCHAR2(50) NOT NULL UNIQUE,
  ubicacion       VARCHAR2(60)
) TABLESPACE CURSOPLSQL_DAT;

CREATE UNIQUE INDEX IDX_PK_DEPARTAMENTO_ID ON CURSOPLSQL.departamentos(departamento_id) TABLESPACE CURSOPLSQL_IDX;

ALTER TABLE CURSOPLSQL.departamentos ADD CONSTRAINT PK_DEPARTAMENTO_ID PRIMARY KEY (DEPARTAMENTO_ID) USING INDEX IDX_PK_DEPARTAMENTO_ID;

CREATE TABLE empleados (
  emp_id          NUMBER(6),
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
  CONSTRAINT fk_empleados_deptamentos FOREIGN KEY (departamento_id)
    REFERENCES departamentos (departamento_id)
) TABLESPACE CURSOPLSQL_DAT;

CREATE UNIQUE INDEX IDX_PK_EMP_ID ON CURSOPLSQL.empleados(emp_id) TABLESPACE CURSOPLSQL_IDX;

ALTER TABLE CURSOPLSQL.empleados ADD CONSTRAINT PK_EMP_ID PRIMARY KEY (emp_id) USING INDEX IDX_PK_EMP_ID;

-- Se llena con los triggers de la semana 6
CREATE TABLE empleados_audit (
  audit_id    NUMBER(10),
  emp_id      NUMBER(6),
  campo       VARCHAR2(30),
  valor_ant   VARCHAR2(100),
  valor_nue   VARCHAR2(100),
  operacion   VARCHAR2(10),
  usuario     VARCHAR2(30) DEFAULT USER,
  fecha       DATE         DEFAULT SYSDATE
);

CREATE UNIQUE INDEX IDX_PK_AUDIT_ID ON CURSOPLSQL.empleados_audit(audit_id) TABLESPACE CURSOPLSQL_IDX;

ALTER TABLE CURSOPLSQL.empleados_audit ADD CONSTRAINT PK_AUDIT_ID PRIMARY KEY (audit_id) USING INDEX IDX_PK_AUDIT_ID;

CREATE SEQUENCE seq_empleados START WITH 1000 INCREMENT BY 1 NOCACHE;
CREATE SEQUENCE seq_audit     START WITH 1    INCREMENT BY 1 NOCACHE;

-- Indice sobre la FK: Oracle NO lo crea solo y las semanas 3 y 14 lo necesitan
CREATE INDEX IDX_EMP_DEPT ON empleados (departamento_id);


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