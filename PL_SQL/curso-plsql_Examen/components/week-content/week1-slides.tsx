"use client"

import { SlideViewer } from "../slide-viewer"

const week1Slides = [
  {
    id: 1,
    title: "Introducción al Curso",
    subtitle: "PL/SQL y Administración Oracle",
    type: "intro" as const,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Bienvenidos al Curso de PL/SQL</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Un viaje completo desde los fundamentos hasta la administración avanzada
          </p>
          <button
            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg mb-6"
            onClick={() =>
              window.open(
                "https://wilmer155.github.io/Cursos/PL_SQL/750116M_ActualizacionCompetenciasLaborales.pdf",
                "_blank",
              )
            }
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            Ver Contenido Programático (PDF)
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Objetivos del Curso</h4>
            <ul className="text-sm space-y-1">
              <li>• Dominar PL/SQL desde lo básico hasta lo avanzado</li>
              <li>• Aprender administración de bases de datos Oracle</li>
              <li>• Desarrollar un proyecto real e integral</li>
              <li>• Prepararse para certificaciones Oracle</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Metodología</h4>
            <ul className="text-sm space-y-1">
              <li>• Clases teóricas y prácticas</li>
              <li>• Laboratorios hands-on</li>
              <li>• Proyecto incremental</li>
              <li>• Evaluación continua</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Repaso de SQL - DDL",
    subtitle: "Data Definition Language",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Comandos DDL Fundamentales</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Los comandos DDL nos permiten definir y modificar la estructura de la base de datos.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-2">CREATE TABLE</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Define la estructura de una nueva tabla con sus columnas, tipos de datos y restricciones.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-green-600 mb-2">ALTER TABLE</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Modifica la estructura de una tabla existente: agregar, modificar o eliminar columnas.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-600 mb-2">DROP TABLE</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Elimina completamente una tabla y todos sus datos de la base de datos.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Ejemplo Práctico - CREATE TABLE",
    type: "code" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Creando una Tabla de Empleados</h3>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`CREATE TABLE empleados (
    emp_id          NUMBER(6) PRIMARY KEY,
    nombre          VARCHAR2(50) NOT NULL,
    apellido        VARCHAR2(50) NOT NULL,
    email           VARCHAR2(100) UNIQUE,
    telefono        VARCHAR2(20),
    fecha_contrato  DATE DEFAULT SYSDATE,
    salario         NUMBER(8,2) CHECK (salario > 0),
    departamento_id NUMBER(4),
    
    CONSTRAINT fk_dept 
        FOREIGN KEY (departamento_id) 
        REFERENCES departamentos(dept_id)
);`}</pre>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Puntos Clave:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>PRIMARY KEY:</strong> Identifica únicamente cada registro
            </li>
            <li>
              • <strong>NOT NULL:</strong> Campos obligatorios
            </li>
            <li>
              • <strong>UNIQUE:</strong> Valores únicos en la columna
            </li>
            <li>
              • <strong>CHECK:</strong> Validación de datos
            </li>
            <li>
              • <strong>FOREIGN KEY:</strong> Integridad referencial
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Repaso de SQL - DML",
    subtitle: "Data Manipulation Language",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Comandos DML Esenciales</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Los comandos DML nos permiten manipular los datos dentro de las tablas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-green-600 mb-2">INSERT</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Agrega nuevos registros a una tabla.</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs font-mono">
              INSERT INTO tabla VALUES (...)
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 mb-2">UPDATE</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Modifica registros existentes.</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs font-mono">
              UPDATE tabla SET col = valor
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-red-600 mb-2">DELETE</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Elimina registros de una tabla.</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs font-mono">DELETE FROM tabla WHERE...</div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-600 mb-2">SELECT</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Consulta y recupera datos.</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs font-mono">SELECT * FROM tabla</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "JOINs y Subconsultas",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Combinando Datos de Múltiples Tablas</h3>
        </div>

        <div className="grid gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">INNER JOIN</h4>
            <p className="text-sm mb-2">Devuelve registros que tienen coincidencias en ambas tablas.</p>
            <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
              SELECT e.nombre, d.nombre_dept
              <br />
              FROM empleados e INNER JOIN departamentos d<br />
              ON e.departamento_id = d.dept_id;
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">LEFT JOIN</h4>
            <p className="text-sm mb-2">Devuelve todos los registros de la tabla izquierda.</p>
            <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
              SELECT e.nombre, d.nombre_dept
              <br />
              FROM empleados e LEFT JOIN departamentos d<br />
              ON e.departamento_id = d.dept_id;
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Subconsultas</h4>
            <p className="text-sm mb-2">Consultas anidadas para filtros complejos.</p>
            <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
              SELECT nombre FROM empleados
              <br />
              WHERE salario &gt; (SELECT AVG(salario) FROM empleados);
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Introducción a PL/SQL",
    subtitle: "Procedural Language extension to SQL",
    type: "content" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">¿Qué es PL/SQL?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            PL/SQL es una extensión procedimental de SQL que combina la potencia de SQL con las características de un
            lenguaje de programación estructurado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-green-600">Ventajas de PL/SQL</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Mejor rendimiento (ejecuta en el servidor)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Manejo robusto de errores</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Reutilización de código</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Seguridad mejorada</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600">Componentes Principales</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Bloques anónimos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Procedimientos almacenados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Funciones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Triggers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Paquetes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Ejercicio Práctico",
    subtitle: "Aplicando los conceptos aprendidos",
    type: "exercise" as const,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Ejercicio: Sistema de Gestión de Inventario</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Desarrollar un sistema completo de gestión de inventario para una empresa comercial.
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">Descripción del Proyecto:</h4>
          <p className="text-sm mb-3">
            Crear un sistema que permita gestionar productos, proveedores, categorías, y movimientos de inventario con
            todas las funcionalidades necesarias para el control de stock.
          </p>

          <div className="mb-4">
            <a
              href="https://wilmer155.github.io/Cursos/PL_SQL/Material_Apoyo_Clases_PLSQL.rar"
              download="Material_Apoyo_Clases_PLSQL.rar"
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Descargar Material de Apoyo
            </a>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400">
            📁 Dentro del archivo encontrará todo el material que necesita para realizar el ejercicio: scripts SQL,
            diagramas ER, datos de prueba y guías detalladas.
          </p>
        </div>
      </div>
    ),
  },
]

export function Week1Slides() {
  return <SlideViewer slides={week1Slides} moduleTitle="Módulo 1: Fundamentos de PL/SQL" weekNumber={1} />
}
