import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Database, Users, Calendar, Award, Clock } from "lucide-react"
import { Week1Slides } from "@/components/week-content/week1-slides"
import { Week2Slides } from "@/components/week-content/week2-slides"
import { Week3Slides } from "@/components/week-content/week3-slides"
import Week4Slides from "@/components/week-content/week4-slides"
import ExamenFinalSlides from "@/components/week-content/examen-final-slides"
import { Week5Slides } from "@/components/week-content/week5-slides"
import { Week6Slides } from "@/components/week-content/week6-slides"
import Week7Slides from "@/components/week-content/week7-slides"
import Week8Slides from "@/components/week-content/week8-slides"
import Week9Slides from "@/components/week-content/week9-slides"
import Week10Slides from "@/components/week-content/week10-slides"
import { Week12Slides } from "@/components/week-content/week12-slides"
import Week13Slides from "@/components/week-content/week13-slides"
import { Week14Slides } from "@/components/week-content/week14-slides"
import { Week15Slides } from "@/components/week-content/week15-slides"
import Week16Slides from "@/components/week-content/week16-slides"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CursoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Curso de PL/SQL y Administración Oracle
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Nivel Universitario</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Resumen del Curso</TabsTrigger>
            <TabsTrigger value="content">Contenido Semanal</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Información General */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  Información del Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">Duración</p>
                      <p className="text-gray-600">16 Semanas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">Modalidad</p>
                      <p className="text-gray-600">Presencial/Virtual</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">Nivel</p>
                      <p className="text-gray-600">Universitario</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Módulo 1: Fundamentos de PL/SQL */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
                  Módulo 1: Fundamentos de PL/SQL
                </CardTitle>
                <CardDescription>Semanas 1-9 | Base teórica y práctica</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {[
                    {
                      semana: 1,
                      tema: "Introducción y Repaso de SQL",
                      contenidos: "DDL, DML, DQL, subconsultas, JOINs, introducción a PL/SQL",
                    },
                    {
                      semana: 2,
                      tema: "Bloques PL/SQL y Tipos de Datos",
                      contenidos: "DECLARE, BEGIN, EXCEPTION, END, %TYPE, %ROWTYPE, RECORD, estructuras de control",
                    },
                    {
                      semana: 3,
                      tema: "Cursores y Procedimientos",
                      contenidos: "Cursores explícitos, OPEN/FETCH/CLOSE, procedimientos con parámetros",
                    },
                    {
                      semana: 5,
                      tema: "Funciones y Paquetes",
                      contenidos: "Funciones vs procedimientos, PACKAGE SPECIFICATION y BODY",
                    },
                    {
                      semana: 6,
                      tema: "Triggers",
                      contenidos: "BEFORE/AFTER, :NEW y :OLD, auditoría, asignación automática de IDs",
                    },
                    {
                      semana: 7,
                      tema: "Excepciones y Colecciones",
                      contenidos: "NO_DATA_FOUND, BULK COLLECT, FORALL, VARRAY, tablas anidadas",
                    },
                    {
                      semana: 8,
                      tema: "SQL Dinámico y Seguridad",
                      contenidos: "EXECUTE IMMEDIATE, inyección SQL, roles y privilegios",
                    },
                    {
                      semana: 9,
                      tema: "ACLs y Vistas Materializadas",
                      contenidos: "Seguridad de red, vistas materializadas, refresco de datos",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-1">
                          Semana {item.semana}
                        </Badge>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.tema}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.contenidos}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Módulo 2: Administración Oracle */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-green-700 dark:text-green-300">
                  Módulo 2: Administración Oracle (DBA)
                </CardTitle>
                <CardDescription>Semanas 12, 14-15 | Administración avanzada</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {[
                    {
                      semana: 12,
                      tema: "Arquitectura y Gestión de Usuarios",
                      contenidos: "SGA, datafiles, roles, privilegios, creación de usuarios",
                    },
                    {
                      semana: 14,
                      tema: "Optimización de Consultas",
                      contenidos: "EXPLAIN PLAN, índices, DBMS_STATS, hints",
                    },
                    {
                      semana: 15,
                      tema: "Gestión de Almacenamiento",
                      contenidos: "Tablespaces, datafiles, vistas DBA_TABLESPACES, DBA_DATA_FILES",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">
                          Semana {item.semana}
                        </Badge>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.tema}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.contenidos}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Módulo 3: Proyecto Final */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-purple-700 dark:text-purple-300">Módulo 3: Proyecto Final</CardTitle>
                <CardDescription>Semanas 4, 10, 13, 16 | Aplicación práctica</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {[
                    {
                      semana: 4,
                      tema: "Diseño del Proyecto",
                      actividades: "MER, esquema lógico, plan de implementación",
                    },
                    {
                      semana: 10,
                      tema: "Primera Entrega",
                      actividades: "MER, scripts DDL, pruebas iniciales",
                    },
                    {
                      semana: 13,
                      tema: "Segunda Entrega",
                      actividades: "PL/SQL completo, administración, pruebas de integración",
                    },
                    {
                      semana: 16,
                      tema: "Presentación Final",
                      actividades: "Demo, defensa técnica, retroalimentación",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-1 bg-purple-50 text-purple-700 border-purple-200">
                          Semana {item.semana}
                        </Badge>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.tema}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.actividades}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bibliografía */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-orange-700 dark:text-orange-300">Bibliografía Recomendada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {[
                    "Oracle PL/SQL Programming – Steven Feuerstein (O'Reilly)",
                    "Oracle Database 12c DBA Handbook – Bryla & Loney (McGraw-Hill)",
                    "Oracle Backup & Recovery – Robert G. Freeman (Oracle Press)",
                    "Expert Oracle Database Architecture – Tom Kyte (Apress)",
                  ].map((libro, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                    >
                      <BookOpen className="h-5 w-5 text-orange-600 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{libro}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline Visual */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Cronograma del Curso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500"></div>
                  <div className="space-y-6 pl-10">
                    <div className="relative">
                      <div className="absolute -left-7 w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300">Semanas 1-9</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Fundamentos de PL/SQL</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-7 w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Semanas 12, 14-15</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Administración Oracle (DBA)</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-7 w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-700 dark:text-purple-300">Semanas 4, 10, 13, 16</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Proyecto Final</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Contenido Semanal Detallado</CardTitle>
                <CardDescription>Diapositivas interactivas para cada semana del curso</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="week1" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
                    <TabsTrigger value="week1">Sem 1</TabsTrigger>
                    <TabsTrigger value="week2">Sem 2</TabsTrigger>
                    <TabsTrigger value="week3">Sem 3</TabsTrigger>
                    <TabsTrigger value="week4">Sem 4</TabsTrigger>
                    <TabsTrigger value="week5">Sem 5</TabsTrigger>
                    <TabsTrigger value="week6">Sem 6</TabsTrigger>
                    <TabsTrigger value="week7">Sem 7</TabsTrigger>
                    <TabsTrigger value="week8">Sem 8</TabsTrigger>
                    <TabsTrigger value="week9">Sem 9</TabsTrigger>
                    <TabsTrigger value="week10">Sem 10</TabsTrigger>
                    <TabsTrigger value="week12">Sem 12</TabsTrigger>
                    <TabsTrigger value="week13">Sem 13</TabsTrigger>
                    <TabsTrigger value="week14">Sem 14</TabsTrigger>
                    <TabsTrigger value="week15">Sem 15</TabsTrigger>
                    <TabsTrigger value="week16">Sem 16</TabsTrigger>
                    <TabsTrigger value="examen-final" className="bg-red-50 text-red-700 border-red-200">
                      Examen Final
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="week1">
                    <Week1Slides />
                  </TabsContent>

                  <TabsContent value="week2">
                    <Week2Slides />
                  </TabsContent>

                  <TabsContent value="week3">
                    <Week3Slides />
                  </TabsContent>

                  <TabsContent value="week4">
                    <Week4Slides />
                  </TabsContent>

                  <TabsContent value="week5">
                    <Week5Slides />
                  </TabsContent>

                  <TabsContent value="week6">
                    <Week6Slides />
                  </TabsContent>

                  <TabsContent value="week7">
                    <Week7Slides />
                  </TabsContent>

                  <TabsContent value="week8">
                    <Week8Slides />
                  </TabsContent>

                  <TabsContent value="week9">
                    <Week9Slides />
                  </TabsContent>

                  <TabsContent value="week10">
                    <Week10Slides />
                  </TabsContent>

                  <TabsContent value="week12">
                    <Week12Slides />
                  </TabsContent>

                  <TabsContent value="week13">
                    <Week13Slides />
                  </TabsContent>

                  <TabsContent value="week14">
                    <Week14Slides />
                  </TabsContent>

                  <TabsContent value="week15">
                    <Week15Slides />
                  </TabsContent>

                  <TabsContent value="week16">
                    <Week16Slides />
                  </TabsContent>

                  <TabsContent value="examen-final">
                    <ExamenFinalSlides />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">© 2025 Curso de PL/SQL y Administración Oracle - Nivel Universitario</p>
        </div>
      </footer>
    </div>
  )
}
