/* ============================================================
   DATOS DEL CURSO
   Edita este archivo para actualizar contenido sin tocar el
   diseño ni la lógica de la página (index.html / script.js).
   ============================================================ */

const CURSO = {
  titulo: "PL/SQL y Administración Oracle",
  subtitulo: "Nivel Universitario",
  descripcion:
    "Curso completo de PL/SQL y Administración de Bases de Datos Oracle: 16 semanas de contenido teórico y práctico, desde los fundamentos del lenguaje hasta la administración avanzada y un proyecto final integrador.",
  duracion: "16 semanas",
  modalidad: "Presencial / Virtual",
  nivel: "Universitario",
  whatsapp: "https://chat.whatsapp.com/Hio8Fe0LE8d6x7JH6U4ECU",
};

/* Cada módulo tiene un id, nombre, color (variable CSS) y descripción corta */
const MODULOS = [
  {
    id: "m1",
    nombre: "Fundamentos de PL/SQL",
    color: "var(--mod1)",
    resumen: "Base teórica y práctica del lenguaje PL/SQL.",
  },
  {
    id: "m2",
    nombre: "Administración Oracle (DBA)",
    color: "var(--mod2)",
    resumen: "Administración avanzada de bases de datos Oracle.",
  },
  {
    id: "m3",
    nombre: "Proyecto Final",
    color: "var(--mod3)",
    resumen: "Aplicación práctica e integradora de todo el curso.",
  },
  {
    id: "ex",
    nombre: "Evaluación",
    color: "var(--mod-ex)",
    resumen: "Parciales y evaluaciones de seguimiento.",
  },
];

/* Contenido semana a semana. modulo debe coincidir con un id de MODULOS.
   El campo "descripcion" es un párrafo explicativo del tema de la semana;
   "temas" sigue siendo la lista corta de subtemas puntuales. */
const SEMANAS = [
  {
    semana: 1,
    modulo: "m1",
    titulo: "Introducción y Repaso de SQL",
    descripcion:
      "Antes de entrar a PL/SQL es necesario afianzar el SQL estándar sobre el que se apoya todo el lenguaje. Esta semana se repasan las sentencias de definición de datos (DDL) para crear y modificar estructuras, las de manipulación (DML) para insertar, actualizar y eliminar registros, y las de consulta (DQL) para recuperarlos. Se profundiza en subconsultas (anidadas, correlacionadas) y en los distintos tipos de JOIN (INNER, LEFT, RIGHT, FULL) para combinar tablas relacionadas. La semana cierra con una primera mirada a PL/SQL: qué problema resuelve frente al SQL puro (lógica procedimental, variables, control de flujo) y por qué es la base de todo el resto del curso.",
    temas: ["DDL", "DML", "DQL", "Subconsultas", "JOINs", "Introducción a PL/SQL"],
  },
  {
    semana: 2,
    modulo: "m1",
    titulo: "Bloques PL/SQL y Tipos de Datos",
    descripcion:
      "Se presenta la estructura fundamental de todo programa PL/SQL: el bloque anónimo con sus secciones DECLARE (declaración de variables), BEGIN (lógica ejecutable), EXCEPTION (manejo de errores) y END. A partir de ahí se estudian los tipos de datos que hacen a PL/SQL especialmente útil para trabajar con la base de datos: %TYPE, que ancla una variable al tipo de una columna existente para evitar inconsistencias, y %ROWTYPE junto con RECORD, que permiten manejar una fila completa de una tabla como una sola variable estructurada. La semana se completa con las estructuras de control (IF/ELSIF, CASE, LOOP, WHILE, FOR) necesarias para construir lógica condicional e iterativa dentro de los bloques.",
    temas: ["DECLARE / BEGIN / EXCEPTION / END", "%TYPE", "%ROWTYPE", "RECORD", "Estructuras de control"],
  },
  {
    semana: 3,
    modulo: "m1",
    titulo: "Cursores y Procedimientos",
    descripcion:
      "Cuando una consulta puede devolver varias filas, PL/SQL necesita un mecanismo para recorrerlas una por una: los cursores. Esta semana cubre los cursores explícitos y su ciclo de vida completo —OPEN para ejecutar la consulta, FETCH para traer cada fila y CLOSE para liberar los recursos—, incluyendo el uso de atributos como %FOUND, %NOTFOUND y %ROWCOUNT para controlar el recorrido. Sobre esa base se introducen los procedimientos almacenados: bloques con nombre que reciben parámetros (IN, OUT, IN OUT) y quedan guardados en la base de datos para ser invocados repetidamente, sentando las bases de la programación modular en Oracle.",
    temas: ["Cursores explícitos", "OPEN / FETCH / CLOSE", "Procedimientos con parámetros"],
  },
  {
    semana: 4,
    modulo: "m3",
    titulo: "Diseño del Proyecto: Sistema Bancario",
    descripcion:
      "Arranca el proyecto final: un sistema de gestión bancaria completo sobre Oracle y PL/SQL, trabajado en equipos de 5 personas a lo largo de 3 entregas incrementales. Esta semana se define el Modelo Entidad-Relación (MER) del banco (clientes, cuentas, transacciones, etc.), el esquema lógico derivado de ese modelo y el plan de implementación: qué lógica de negocio se resolverá con PL/SQL (procedimientos, triggers, paquetes) y qué mecanismos de seguridad y auditoría tendrá el sistema, dado que se trata de datos financieros.",
    temas: ["Modelo Entidad-Relación (MER)", "Esquema lógico", "Plan de implementación", "Sistema Bancario"],
  },
  {
    semana: 5,
    modulo: "m1",
    titulo: "Funciones y Paquetes",
    descripcion:
      "Se distingue entre funciones y procedimientos: ambos son bloques con nombre, pero una función siempre retorna un valor y puede usarse directamente dentro de una sentencia SQL, mientras que un procedimiento ejecuta una acción. Luego se avanza hacia los paquetes (PACKAGE), la forma en que Oracle agrupa procedimientos, funciones, variables y cursores relacionados en una sola unidad lógica. Se trabajan sus dos partes: la PACKAGE SPECIFICATION, que define la interfaz pública visible para otros programas, y el PACKAGE BODY, donde vive la implementación real, permitiendo ocultar detalles internos y organizar mejor sistemas grandes.",
    temas: ["Funciones vs. procedimientos", "PACKAGE SPECIFICATION", "PACKAGE BODY"],
  },
  {
    semana: 6,
    modulo: "m1",
    titulo: "Triggers",
    descripcion:
      "Los triggers son bloques PL/SQL que se ejecutan automáticamente en respuesta a un evento sobre una tabla, sin que el usuario los invoque directamente. Se estudia la diferencia entre triggers BEFORE (se ejecutan antes de que el cambio se aplique, útiles para validar o modificar datos) y AFTER (se ejecutan después, útiles para registrar auditoría), así como los pseudo-registros :NEW y :OLD que exponen los valores antes y después de una operación de INSERT, UPDATE o DELETE. Con estas herramientas se implementan dos casos de uso clásicos: tablas de auditoría que registran quién cambió qué y cuándo, y la asignación automática de identificadores (IDs) sin depender de que la aplicación cliente los calcule.",
    temas: ["BEFORE / AFTER", ":NEW y :OLD", "Auditoría", "Asignación automática de IDs"],
  },
  {
    semana: 7,
    modulo: "m1",
    titulo: "Excepciones y Colecciones",
    descripcion:
      "Todo programa robusto necesita anticipar errores: esta semana se profundiza en el manejo de excepciones, incluyendo las predefinidas por Oracle como NO_DATA_FOUND (cuando una consulta no devuelve filas) y la posibilidad de declarar excepciones propias. En paralelo se introducen las colecciones, estructuras que permiten manejar conjuntos de datos en memoria: VARRAY (arreglos de tamaño fijo) y tablas anidadas (de tamaño variable). Sobre estas colecciones se aplican BULK COLLECT, que trae múltiples filas de una consulta en una sola operación, y FORALL, que ejecuta sentencias DML en bloque en lugar de fila por fila, mejorando notablemente el rendimiento frente a los cursores tradicionales.",
    temas: ["NO_DATA_FOUND", "BULK COLLECT", "FORALL", "VARRAY", "Tablas anidadas"],
  },
  {
    semana: 8,
    modulo: "m1",
    titulo: "SQL Dinámico y Seguridad",
    descripcion:
      "Hay situaciones donde la sentencia SQL a ejecutar no se conoce hasta el momento de la ejecución (por ejemplo, el nombre de una tabla que llega como parámetro): para eso existe el SQL dinámico, implementado con EXECUTE IMMEDIATE. Esta flexibilidad tiene un riesgo asociado si no se maneja con cuidado: la inyección SQL, por lo que se estudian las buenas prácticas para prevenirla (variables bind en lugar de concatenar texto, validación de entradas). La semana se cierra con el modelo de seguridad de Oracle a nivel de roles y privilegios: cómo restringir qué puede hacer cada usuario sobre qué objetos de la base de datos.",
    temas: ["EXECUTE IMMEDIATE", "Inyección SQL", "Roles y privilegios"],
  },
  {
    semana: 9,
    modulo: "m1",
    titulo: "ACLs y Vistas Materializadas",
    descripcion:
      "Se cierra el módulo de fundamentos con dos temas de infraestructura importantes. Primero, las ACLs (Access Control Lists) de red, que en Oracle regulan qué hosts y puertos externos puede contactar la base de datos —relevante cuando PL/SQL necesita comunicarse con servicios externos—. Segundo, las vistas materializadas, que a diferencia de una vista normal almacenan físicamente el resultado de una consulta para acelerar el acceso a datos costosos de calcular. Se estudian las distintas estrategias de refresco (completo, incremental o rápido, bajo demanda o programado) para mantener esos datos razonablemente actualizados sin sacrificar rendimiento.",
    temas: ["Seguridad de red (ACLs)", "Vistas materializadas", "Refresco de datos"],
  },
  {
    semana: 10,
    modulo: "m3",
    titulo: "Primera Entrega: Sistema Bancario (MER y DDL)",
    descripcion:
      "Primer hito formal de evaluación del proyecto (50% de avance). Se presenta el MER definitivo del sistema bancario ya validado, junto con los scripts DDL que crean físicamente en Oracle las tablas de clientes, cuentas y transacciones, con sus claves y restricciones. Se realizan pruebas iniciales de carga de datos y de las relaciones entre tablas, verificando que la estructura soporta correctamente las operaciones básicas antes de construir la lógica PL/SQL sobre ella.",
    temas: ["MER", "Scripts DDL", "Pruebas iniciales", "Sistema Bancario"],
  },
  {
    semana: 11,
    modulo: "ex",
    titulo: "Examen Final",
    descripcion:
      "Evaluación integral de PL/SQL que cubre las semanas 2, 3, 5, 6, 7, 8 y 9: bloques y tipos de datos, cursores y procedimientos, funciones y paquetes, triggers, excepciones y colecciones, SQL dinámico y seguridad, ACLs y vistas materializadas. Consiste en tres preguntas prácticas de código PL/SQL (análisis de productos con cursores y CASE, cursores explícitos, y un paquete completo de inventario) que se envían y evalúan directamente desde esta página.",
    temas: ["Evaluación de las semanas 2, 3, 5, 6, 7, 8 y 9", "Envío de código PL/SQL y nota automática"],
  },
  {
    semana: 12,
    modulo: "m2",
    titulo: "Arquitectura y Gestión de Usuarios",
    descripcion:
      "Arranca el módulo de administración con la arquitectura interna de una base de datos Oracle. Se estudia la SGA (System Global Area), el área de memoria compartida que usa la instancia para cachear datos y coordinar procesos, y los datafiles, los archivos físicos donde realmente se almacenan los datos en disco. Con esa base arquitectónica se pasa a la gestión de usuarios desde el rol de administrador: creación de usuarios, asignación de roles y privilegios a nivel de sistema y de objetos, y las implicaciones de seguridad de cada decisión.",
    temas: ["SGA", "Datafiles", "Roles y privilegios", "Creación de usuarios"],
  },
  {
    semana: 13,
    modulo: "m3",
    titulo: "Segunda Entrega: Sistema Bancario (PL/SQL y Admin)",
    descripcion:
      "Segundo hito del proyecto. Se presenta el desarrollo PL/SQL completo del sistema bancario —procedimientos, funciones, triggers y paquetes que resuelven la lógica de negocio: transferencias, intereses, validaciones— junto con las primeras tareas de administración aplicadas al proyecto (usuarios y privilegios propios del esquema). Se ejecutan pruebas de integración para confirmar que la estructura de datos, la lógica PL/SQL y la capa de administración funcionan correctamente en conjunto.",
    temas: ["PL/SQL completo", "Administración", "Pruebas de integración", "Sistema Bancario"],
  },
  {
    semana: 14,
    modulo: "m2",
    titulo: "Optimización de Consultas",
    descripcion:
      "Una base de datos bien diseñada también debe responder rápido: esta semana se enseña a diagnosticar y mejorar el rendimiento de las consultas. Se usa EXPLAIN PLAN para visualizar cómo Oracle piensa ejecutar una sentencia (qué índices usa, en qué orden accede a las tablas) y así detectar cuellos de botella. Se profundiza en el diseño de índices para acelerar accesos frecuentes, en el paquete DBMS_STATS para mantener actualizadas las estadísticas que el optimizador de Oracle usa para tomar decisiones, y en el uso puntual de hints para sugerir un plan de ejecución específico cuando es necesario.",
    temas: ["EXPLAIN PLAN", "Índices", "DBMS_STATS", "Hints"],
  },
  {
    semana: 15,
    modulo: "m2",
    titulo: "Gestión de Almacenamiento",
    descripcion:
      "Se estudia cómo Oracle organiza el espacio físico en disco a través de tablespaces, agrupaciones lógicas de uno o más datafiles donde se almacenan las tablas e índices de la base de datos. Se cubre la creación, redimensionamiento y administración de tablespaces y sus datafiles asociados, así como el uso de las vistas de diccionario de datos DBA_TABLESPACES y DBA_DATA_FILES para monitorear el espacio usado y disponible, una tarea rutinaria pero crítica para cualquier administrador de bases de datos en producción.",
    temas: ["Tablespaces", "Datafiles", "DBA_TABLESPACES", "DBA_DATA_FILES"],
  },
  {
    semana: 16,
    modulo: "m3",
    titulo: "Presentación Final: Sistema Bancario",
    descripcion:
      "Cierre del curso y del proyecto integrador. Cada equipo realiza una demo en vivo del sistema bancario completo, mostrando la base de datos, la lógica PL/SQL implementada y las tareas de administración aplicadas a lo largo del semestre. Sigue una defensa técnica ante el docente, donde se justifican las decisiones de diseño y se responde a preguntas sobre el funcionamiento interno del sistema. La sesión termina con retroalimentación individual y grupal sobre fortalezas y aspectos a mejorar.",
    temas: ["Demo", "Defensa técnica", "Retroalimentación", "Sistema Bancario"],
  },
];

const BIBLIOGRAFIA = [
  {
    titulo: "Oracle PL/SQL Programming",
    autor: "Steven Feuerstein",
    editorial: "O'Reilly",
  },
  {
    titulo: "Oracle Database 12c DBA Handbook",
    autor: "Bryla & Loney",
    editorial: "McGraw-Hill",
  },
  {
    titulo: "Oracle Backup & Recovery",
    autor: "Robert G. Freeman",
    editorial: "Oracle Press",
  },
  {
    titulo: "Expert Oracle Database Architecture",
    autor: "Tom Kyte",
    editorial: "Apress",
  },
];
