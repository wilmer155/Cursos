"use client"

import SlideViewer from "../slide-viewer"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Lock, CheckCircle, Upload, FileText, Star } from "lucide-react"

export default function ExamenFinalSlides() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [submittedCode, setSubmittedCode] = useState("")
  const [evaluationResult, setEvaluationResult] = useState(null)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [teacherKey, setTeacherKey] = useState("")
  const [isTeacherKeyValid, setIsTeacherKeyValid] = useState(false)

  const encryptPassword = (password: string): string => {
    // Encriptación simple usando desplazamiento de caracteres
    let encrypted = ""
    const shift = 5
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i)
      encrypted += String.fromCharCode(char + shift)
    }
    return btoa(encrypted) // Base64 para ofuscar más
  }

  const decryptPassword = (encryptedPassword: string): string => {
    try {
      const decoded = atob(encryptedPassword) // Decodificar Base64
      let decrypted = ""
      const shift = 5
      for (let i = 0; i < decoded.length; i++) {
        const char = decoded.charCodeAt(i)
        decrypted += String.fromCharCode(char - shift)
      }
      return decrypted
    } catch {
      return ""
    }
  }

  const correctPassword = "CurPlSql2025.+-*"
  const correctPasswordEncrypted = encryptPassword(correctPassword) // Esto generará la clave encriptada correcta

  const teacherEvaluationKey = "pl2025+-" // Cambiada la clave del docente a pl2025+-
  const teacherKeyEncrypted = encryptPassword(teacherEvaluationKey)

  const handleLogin = () => {
    console.log("[v0] Clave ingresada:", password)
    console.log("[v0] Clave encriptada almacenada:", correctPasswordEncrypted)

    const decryptedCorrectPassword = decryptPassword(correctPasswordEncrypted)
    console.log("[v0] Clave desencriptada:", decryptedCorrectPassword)

    if (password === decryptedCorrectPassword) {
      setIsAuthenticated(true)
      console.log("[v0] Acceso concedido")
    } else {
      console.log("[v0] Acceso denegado")
    }
  }

  const validateTeacherKey = () => {
    console.log("[v0] Validando clave del docente:", teacherKey)
    const decryptedTeacherKey = decryptPassword(teacherKeyEncrypted)
    console.log("[v0] Clave del docente desencriptada:", decryptedTeacherKey)

    if (teacherKey === decryptedTeacherKey) {
      setIsTeacherKeyValid(true)
      console.log("[v0] Clave del docente válida")
    } else {
      alert("Clave del docente incorrecta")
      console.log("[v0] Clave del docente inválida")
    }
  }

  const validateQuestion1 = (code) => {
    const codeUpper = code.toUpperCase()
    let score = 0
    const feedback = []
    const maxScore = 35

    console.log("[v0] Validando Pregunta 1 - Sistema de Análisis de Productos")

    // Parte A: Conteo de lotes (15 puntos)
    if (codeUpper.includes("DECLARE")) {
      score += 3
      feedback.push("✓ Sección DECLARE presente (3pts)")
    } else {
      feedback.push("✗ Falta sección DECLARE")
    }

    if (codeUpper.includes("BEGIN") && codeUpper.includes("END")) {
      score += 3
      feedback.push("✓ Estructura de bloque PL/SQL completa (3pts)")
    } else {
      feedback.push("✗ Estructura de bloque PL/SQL incompleta")
    }

    if (codeUpper.includes("COUNT(") || codeUpper.includes("COUNT *")) {
      score += 4
      feedback.push("✓ Uso correcto de COUNT para contar lotes (4pts)")
    } else {
      feedback.push("✗ No usa COUNT para contar lotes")
    }

    if (codeUpper.includes("TBL_LOTES") && codeUpper.includes("TBL_PRODUCTOS")) {
      score += 3
      feedback.push("✓ Uso correcto de tablas del sistema (3pts)")
    } else {
      feedback.push("✗ No usa las tablas correctas (TBL_LOTES, TBL_PRODUCTOS)")
    }

    if (codeUpper.includes("DBMS_OUTPUT")) {
      score += 2
      feedback.push("✓ Salida por consola implementada (2pts)")
    } else {
      feedback.push("✗ No implementa salida por consola")
    }

    // Parte B: Clasificación por peso (20 puntos)
    if (codeUpper.includes("CASE")) {
      score += 6
      feedback.push("✓ Estructura CASE implementada (6pts)")
    } else {
      feedback.push("✗ No usa estructura CASE para clasificación")
    }

    if (codeUpper.includes("PESOXUNIDAD")) {
      score += 4
      feedback.push("✓ Campo PESOXUNIDAD identificado correctamente (4pts)")
    } else {
      feedback.push("✗ No usa el campo PESOXUNIDAD")
    }

    if (codeUpper.includes("CURSOR")) {
      score += 4
      feedback.push("✓ Cursor implementado para recorrer productos (4pts)")
    } else {
      feedback.push("✗ No implementa cursor para productos")
    }

    if (
      (codeUpper.includes("LIVIANO") || codeUpper.includes("MEDIO") || codeUpper.includes("PESADO")) &&
      (codeUpper.includes("<1") || (codeUpper.includes("1") && codeUpper.includes("5")) || codeUpper.includes(">5"))
    ) {
      score += 4
      feedback.push("✓ Clasificaciones por peso implementadas (4pts)")
    } else {
      feedback.push("✗ Clasificaciones por peso incompletas")
    }

    if (codeUpper.includes("FOR") && codeUpper.includes("LOOP")) {
      score += 2
      feedback.push("✓ Estructura de bucle FOR LOOP (2pts)")
    } else {
      feedback.push("✗ No usa FOR LOOP")
    }

    return { score: Math.min(score, maxScore), feedback, maxScore }
  }

  const validateQuestion2 = (code) => {
    const codeUpper = code.toUpperCase()
    let score = 0
    const feedback = []
    const maxScore = 15

    console.log("[v0] Validando Pregunta 2 - Cursores Explícitos")

    if (codeUpper.includes("CURSOR") && codeUpper.includes("IS") && codeUpper.includes("SELECT")) {
      score += 4
      feedback.push("✓ Declaración de cursor explícito correcta (4pts)")
    } else {
      feedback.push("✗ Declaración de cursor explícito incorrecta")
    }

    if (codeUpper.includes("OPEN") && codeUpper.includes("CLOSE")) {
      score += 3
      feedback.push("✓ Apertura y cierre de cursor (3pts)")
    } else {
      feedback.push("✗ No maneja apertura/cierre de cursor correctamente")
    }

    if (codeUpper.includes("FETCH")) {
      score += 3
      feedback.push("✓ Uso correcto de FETCH (3pts)")
    } else {
      feedback.push("✗ No usa FETCH para obtener datos del cursor")
    }

    if (codeUpper.includes("%NOTFOUND") || codeUpper.includes("%FOUND")) {
      score += 2
      feedback.push("✓ Atributos de cursor utilizados (2pts)")
    } else {
      feedback.push("✗ No usa atributos de cursor (%NOTFOUND, %FOUND)")
    }

    if (codeUpper.includes("FECHA_VENCIMIENTO") && codeUpper.includes("SYSDATE")) {
      score += 2
      feedback.push("✓ Lógica de fechas de vencimiento (2pts)")
    } else {
      feedback.push("✗ No implementa lógica de fechas correctamente")
    }

    if (codeUpper.includes("30") && (codeUpper.includes("DIAS") || codeUpper.includes("DAY"))) {
      score += 1
      feedback.push("✓ Parámetro de 30 días implementado (1pt)")
    } else {
      feedback.push("✗ No implementa filtro de 30 días")
    }

    return { score: Math.min(score, maxScore), feedback, maxScore }
  }

  const validateQuestion3 = (code) => {
    const codeUpper = code.toUpperCase()
    let score = 0
    const feedback = []
    const maxScore = 50

    console.log("[v0] Validando Pregunta 3 - Paquete Completo PKG_INVENTARIO")

    // Estructura del paquete (15 puntos)
    if (codeUpper.includes("CREATE") && codeUpper.includes("PACKAGE") && codeUpper.includes("PKG_INVENTARIO")) {
      score += 5
      feedback.push("✓ Especificación del paquete PKG_INVENTARIO (5pts)")
    } else {
      feedback.push("✗ No crea la especificación del paquete PKG_INVENTARIO")
    }

    if (codeUpper.includes("PACKAGE BODY") && codeUpper.includes("PKG_INVENTARIO")) {
      score += 5
      feedback.push("✓ Cuerpo del paquete implementado (5pts)")
    } else {
      feedback.push("✗ No implementa el cuerpo del paquete")
    }

    if (codeUpper.includes("STOCK_MINIMO") && codeUpper.includes("CONSTANT")) {
      score += 3
      feedback.push("✓ Constante STOCK_MINIMO declarada (3pts)")
    } else {
      feedback.push("✗ No declara la constante STOCK_MINIMO")
    }

    if (codeUpper.includes("STOCK_INSUFICIENTE") && codeUpper.includes("EXCEPTION")) {
      score += 2
      feedback.push("✓ Excepción personalizada stock_insuficiente (2pts)")
    } else {
      feedback.push("✗ No declara excepción personalizada")
    }

    // Funciones dentro del paquete (15 puntos)
    if (codeUpper.includes("OBTENER_STOCK_DISPONIBLE") && codeUpper.includes("FUNCTION")) {
      score += 4
      feedback.push("✓ Función obtener_stock_disponible (4pts)")
    } else {
      feedback.push("✗ No implementa función obtener_stock_disponible")
    }

    if (codeUpper.includes("CALCULAR_PESO_PEDIDO") && codeUpper.includes("FUNCTION")) {
      score += 4
      feedback.push("✓ Función calcular_peso_pedido (4pts)")
    } else {
      feedback.push("✗ No implementa función calcular_peso_pedido")
    }

    if (codeUpper.includes("RETURN") && (codeUpper.includes("NUMBER") || codeUpper.includes("VARCHAR2"))) {
      score += 3
      feedback.push("✓ Tipos de retorno en funciones (3pts)")
    } else {
      feedback.push("✗ Tipos de retorno incorrectos en funciones")
    }

    if (codeUpper.includes("TBL_DETALLEPEDIDOS") && codeUpper.includes("CANTIDAD") && codeUpper.includes("PESOXCAJA")) {
      score += 4
      feedback.push("✓ Cálculo de peso con campos correctos (4pts)")
    } else {
      feedback.push("✗ No implementa cálculo de peso correctamente")
    }

    // Procedimientos dentro del paquete (20 puntos)
    if (codeUpper.includes("ACTUALIZAR_INVENTARIO_ENTRADA") && codeUpper.includes("PROCEDURE")) {
      score += 5
      feedback.push("✓ Procedimiento actualizar_inventario_entrada (5pts)")
    } else {
      feedback.push("✗ No implementa procedimiento actualizar_inventario_entrada")
    }

    if (codeUpper.includes("GENERAR_REPORTE_INVENTARIO") && codeUpper.includes("PROCEDURE")) {
      score += 3
      feedback.push("✓ Procedimiento generar_reporte_inventario (3pts)")
    } else {
      feedback.push("✗ No implementa procedimiento generar_reporte_inventario")
    }

    if (codeUpper.includes("IN") && codeUpper.includes("OUT")) {
      score += 4
      feedback.push("✓ Parámetros IN y OUT correctos (4pts)")
    } else {
      feedback.push("✗ Parámetros IN/OUT incorrectos o faltantes")
    }

    if (codeUpper.includes("UPDATE") || codeUpper.includes("INSERT") || codeUpper.includes("MERGE")) {
      score += 4
      feedback.push("✓ Operaciones DML en procedimientos (4pts)")
    } else {
      feedback.push("✗ No implementa operaciones DML")
    }

    if (codeUpper.includes("TBL_INVENTARIOS")) {
      score += 2
      feedback.push("✓ Uso de tabla TBL_INVENTARIOS (2pts)")
    } else {
      feedback.push("✗ No usa tabla TBL_INVENTARIOS")
    }

    if (codeUpper.includes("EXCEPTION") && (codeUpper.includes("WHEN") || codeUpper.includes("RAISE"))) {
      score += 2
      feedback.push("✓ Manejo de excepciones implementado (2pts)")
    } else {
      feedback.push("✗ Manejo de excepciones insuficiente")
    }

    return { score: Math.min(score, maxScore), feedback, maxScore }
  }

  const verifyCode = async () => {
    if (!submittedCode.trim()) {
      alert("Por favor ingrese su código PL/SQL antes de verificar.")
      return
    }

    setIsEvaluating(true)

    console.log("[v0] Iniciando verificación de código...")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const question1Result = validateQuestion1(submittedCode)
    const question2Result = validateQuestion2(submittedCode)
    const question3Result = validateQuestion3(submittedCode)

    console.log("[v0] Resultados de verificación:", {
      pregunta1: question1Result.score,
      pregunta2: question2Result.score,
      pregunta3: question3Result.score,
    })

    const verificationResult = {
      questionResults: [
        { question: "Pregunta 1: Sistema de Análisis de Productos", ...question1Result },
        { question: "Pregunta 2: Cursores Explícitos", ...question2Result },
        { question: "Pregunta 3: Paquete Completo de Inventario", ...question3Result },
      ],
      isVerification: true,
    }

    setEvaluationResult(verificationResult)
    setIsEvaluating(false)
  }

  const evaluateCode = async () => {
    if (!isTeacherKeyValid) {
      alert("Se requiere la clave del docente para evaluar y mostrar nota.")
      return
    }

    if (!submittedCode.trim()) {
      alert("Por favor ingrese su código PL/SQL antes de evaluar.")
      return
    }

    setIsEvaluating(true)

    console.log("[v0] Iniciando evaluación final...")
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const question1Result = validateQuestion1(submittedCode)
    const question2Result = validateQuestion2(submittedCode)
    const question3Result = validateQuestion3(submittedCode)

    const totalScore = question1Result.score + question2Result.score + question3Result.score

    let finalGrade = Math.max(1.0, totalScore * 0.05)
    finalGrade = Math.min(finalGrade, 5.0)

    const finalResult = {
      totalScore,
      finalGrade,
      grade:
        finalGrade >= 4.5
          ? "Excelente"
          : finalGrade >= 3.5
            ? "Bueno"
            : finalGrade >= 3.0
              ? "Satisfactorio"
              : finalGrade >= 2.0
                ? "Deficiente"
                : "Insuficiente",
      questionResults: [
        { question: "Pregunta 1: Sistema de Análisis de Productos", ...question1Result },
        { question: "Pregunta 2: Cursores Explícitos", ...question2Result },
        { question: "Pregunta 3: Paquete Completo de Inventario", ...question3Result },
      ],
      feedback: generateFeedback(finalGrade, totalScore),
      isApproved: finalGrade >= 3.0,
    }

    console.log("[v0] Evaluación completada - Nota:", finalGrade.toFixed(1))

    setEvaluationResult(finalResult)
    setIsEvaluating(false)
  }

  const generateFeedback = (grade, totalScore) => {
    if (grade >= 4.5) {
      return "¡Excelente trabajo! Su código demuestra un dominio sólido de PL/SQL con implementación correcta de todos los conceptos evaluados."
    } else if (grade >= 3.5) {
      return "Buen trabajo. Su código es funcional y demuestra comprensión de los conceptos, con algunas áreas de mejora."
    } else if (grade >= 3.0) {
      return "Trabajo satisfactorio. Cumple con los requisitos mínimos para aprobar, pero necesita reforzar algunos conceptos."
    } else if (grade >= 2.0) {
      return "Su código muestra comprensión básica pero necesita mejoras significativas en la implementación."
    } else {
      return "Su código necesita mejoras fundamentales. Revise los conceptos básicos de PL/SQL y practique más."
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-12 w-12 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-700">Examen Final Restringido</CardTitle>
            <p className="text-gray-600">Ingrese la clave proporcionada por el instructor</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Ingrese la clave del examen"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="text-center"
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-red-600 hover:bg-red-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Acceder al Examen
            </Button>
            <div className="text-xs text-gray-500 text-center">
              Solo estudiantes autorizados pueden acceder a esta evaluación
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const slides = [
    {
      type: "intro",
      title: "Examen Final PL/SQL",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Evaluación Integral PL/SQL</h2>
            <p className="text-lg text-gray-700 mb-6">
              Evaluación de conocimientos de las semanas 2, 3, 5, 6, 7, 8 y 9
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">📋 Instrucciones del Examen</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Duración:</strong> 2 horas
              </li>
              <li>
                • <strong>Modalidad:</strong> Práctica en Oracle
              </li>
              <li>
                • <strong>Puntaje:</strong> 100 puntos total
              </li>
              <li>
                • <strong>Aprobación:</strong> 60 puntos mínimo
              </li>
              <li>
                • <strong>Material:</strong> Solo documentación Oracle oficial
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-800 mb-4">⚠️ Criterios de Evaluación</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p>
                  <strong>Sintaxis correcta:</strong> 30%
                </p>
                <p>
                  <strong>Lógica de negocio:</strong> 25%
                </p>
                <p>
                  <strong>Manejo de errores:</strong> 20%
                </p>
              </div>
              <div>
                <p>
                  <strong>Optimización:</strong> 15%
                </p>
                <p>
                  <strong>Buenas prácticas:</strong> 10%
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "content",
      title: "Pregunta 1: Sistema de Análisis de Productos (35 puntos)",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              Ejercicio Unificado: Sistema de Análisis de Productos
            </h3>
            <p className="text-gray-700 mb-4">Escriba un bloque PL/SQL completo que:</p>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Requerimientos del ejercicio:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>1. Muestre por consola el total de lotes que tiene un producto específico por nombre</li>
                <li>2. Clasifique TODOS los productos por peso usando estructura CASE</li>
                <li>3. Use variables con %TYPE para compatibilidad</li>
                <li>4. Implemente estructura IF-THEN-ELSE para validaciones</li>
                <li>5. Use cursor FOR LOOP para recorrer productos</li>
                <li>6. Maneje excepciones apropiadamente</li>
                <li>7. Use DBMS_OUTPUT para mostrar todos los resultados</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">💡 Especificaciones técnicas:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Tablas: TBL_LOTES, TBL_PRODUCTOS</li>
                <li>• Campos: COD_PRODUCTO, NOMBRE, PESOXUNIDAD</li>
                <li>• Clasificación: Liviano (&lt;1), Medio (1-5), Pesado (&gt;5)</li>
                <li>• Use COUNT(*) para contar lotes</li>
                <li>• Muestre contadores por categoría de peso</li>
                <li>• Implemente manejo completo de excepciones</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "content",
      title: "Pregunta 2: Cursores Explícitos (15 puntos)",
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Cursores Explícitos</h3>
            <p className="text-gray-700 mb-4">
              Implemente un cursor que recorra todos los lotes próximos a vencer (30 días).
            </p>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Debe incluir:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Declaración del cursor con parámetros</li>
                <li>• Manejo de atributos %FOUND, %NOTFOUND</li>
                <li>• Loop manual (no FOR loop)</li>
                <li>• Contador de registros procesados</li>
                <li>• JOIN con TBL_PRODUCTOS para mostrar nombres</li>
                <li>• Cálculo de días restantes hasta vencimiento</li>
              </ul>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg mt-4">
              <h4 className="font-semibold mb-2">🔍 Conceptos a evaluar:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>CURSOR:</strong> Declaración con SELECT
                </li>
                <li>
                  • <strong>OPEN/FETCH/CLOSE:</strong> Ciclo de vida
                </li>
                <li>
                  • <strong>%ROWCOUNT:</strong> Contador de filas
                </li>
                <li>
                  • <strong>FECHA_VENCIMIENTO:</strong> Comparación con SYSDATE
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "content",
      title: "Pregunta 3: Paquete Completo de Inventario (50 puntos)",
      content: (
        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-800 mb-4">Paquete PKG_INVENTARIO Completo</h3>
            <p className="text-gray-700 mb-4">
              Diseñe e implemente un paquete completo PKG_INVENTARIO que contenga tanto la especificación como el
              cuerpo, incluyendo procedimientos y funciones integrados.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">El paquete debe contener:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  1. <strong>Constante:</strong> STOCK_MINIMO (valor 10)
                </li>
                <li>
                  2. <strong>Excepción personalizada:</strong> stock_insuficiente
                </li>
                <li>
                  3. <strong>Función:</strong> obtener_stock_disponible(p_cod_producto)
                </li>
                <li>
                  4. <strong>Función:</strong> calcular_peso_pedido(p_cod_orden) - que calcule peso total
                </li>
                <li>
                  5. <strong>Procedimiento:</strong> actualizar_inventario_entrada(p_cod_producto, p_cantidad,
                  p_resultado OUT)
                </li>
                <li>
                  6. <strong>Procedimiento:</strong> generar_reporte_inventario
                </li>
              </ul>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Especificaciones técnicas:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  • <strong>calcular_peso_pedido:</strong> Use cursor, fórmula CANTIDAD × PESOXCAJA
                </li>
                <li>
                  • <strong>actualizar_inventario_entrada:</strong> Parámetros IN/OUT, validaciones, excepciones
                </li>
                <li>
                  • <strong>obtener_stock_disponible:</strong> Retorne INVEN_TOTAL de TBL_INVENTARIOS
                </li>
                <li>
                  • <strong>generar_reporte_inventario:</strong> Muestre todos los productos con stock
                </li>
                <li>• Tablas: TBL_INVENTARIOS, TBL_PRODUCTOS, TBL_ORDENPEDIDOS, TBL_DETALLEPEDIDOS</li>
                <li>• Implemente manejo completo de excepciones en todos los elementos</li>
              </ul>
            </div>

            <div className="bg-green-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Entregables requeridos:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• CREATE OR REPLACE PACKAGE PKG_INVENTARIO (especificación)</li>
                <li>• CREATE OR REPLACE PACKAGE BODY PKG_INVENTARIO (implementación)</li>
                <li>• Todas las funciones y procedimientos completamente implementados</li>
                <li>• Ejemplo de uso del paquete con llamadas a sus elementos</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "exercise",
      title: "Criterios de Calificación",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">📊 Rúbrica de Evaluación</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-green-700 mb-3">Excelente (5.0)</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Código funciona perfectamente</li>
                  <li>• Sintaxis impecable</li>
                  <li>• Manejo completo de errores</li>
                  <li>• Optimización evidente</li>
                  <li>• Buenas prácticas aplicadas</li>
                  <li>
                    • <strong>Puntos requeridos:</strong> 100 (cada punto = 0.05 décimas)
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-blue-700 mb-3">Bueno (4.0)</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Código funciona correctamente</li>
                  <li>• Sintaxis correcta</li>
                  <li>• Manejo básico de errores</li>
                  <li>• Algunas optimizaciones</li>
                  <li>• Prácticas aceptables</li>
                  <li>
                    • <strong>Puntos requeridos:</strong> 80 (cada punto = 0.05 décimas)
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-yellow-700 mb-3">Satisfactorio (3.0) - APROBADO</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Código funciona con ajustes</li>
                  <li>• Sintaxis mayormente correcta</li>
                  <li>• Manejo mínimo de errores</li>
                  <li>• Poca optimización</li>
                  <li>• Prácticas básicas</li>
                  <li>
                    • <strong>Puntos requeridos:</strong> 60 (cada punto = 0.05 décimas)
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-orange-700 mb-3">Deficiente (2.0) - REPROBADO</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Código funciona parcialmente</li>
                  <li>• Algunos errores de sintaxis</li>
                  <li>• Manejo limitado de errores</li>
                  <li>• Sin optimización</li>
                  <li>• Prácticas deficientes</li>
                  <li>
                    • <strong>Puntos obtenidos:</strong> 40-59 (cada punto = 0.05 décimas)
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
                <h4 className="font-semibold text-red-700 mb-3">Insuficiente (1.0) - REPROBADO</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Código no funciona</li>
                  <li>• Errores de sintaxis</li>
                  <li>• Sin manejo de errores</li>
                  <li>• No hay optimización</li>
                  <li>• Malas prácticas</li>
                  <li>
                    • <strong>Puntos obtenidos:</strong> Menos de 40 (cada punto = 0.05 décimas)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">📝 Instrucciones de Entrega:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Pegue todo su código PL/SQL en el área de texto</li>
              <li>• Incluya comentarios que identifiquen cada pregunta</li>
              <li>• Asegúrese de que su código esté completo y bien formateado</li>
              <li>• La evaluación es automática basada en criterios técnicos</li>
              <li>• Su nota será enviada automáticamente al instructor</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">🔍 Criterios de Evaluación Automática:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <ul className="space-y-1">
                <li>• Estructura de bloques PL/SQL</li>
                <li>• Uso de cursores</li>
                <li>• Procedimientos y funciones</li>
                <li>• Manejo de excepciones</li>
              </ul>
              <ul className="space-y-1">
                <li>• Triggers implementados</li>
                <li>• Optimizaciones BULK</li>
                <li>• SQL dinámico</li>
                <li>• Uso correcto de tablas</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "exercise",
      title: "Entrega y Evaluación Automática",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
              <Upload className="h-6 w-6 mr-2" />
              Sistema de Evaluación Automática
            </h3>
            <p className="text-gray-700 mb-6">
              Pegue todo su código PL/SQL para recibir una evaluación automática y su nota final.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {evaluationResult && (
                <div className="bg-white p-4 rounded-lg shadow border">
                  <div className="flex items-center mb-3">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <h4 className="font-semibold text-lg">
                      {evaluationResult.isVerification ? "Verificación de Código" : "Resultado de Evaluación"}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {!evaluationResult.isVerification && (
                      <>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">Puntos Totales:</span>
                          <span className="text-lg font-semibold text-gray-700">{evaluationResult.totalScore}/100</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">Nota Final:</span>
                          <span
                            className={`text-3xl font-bold ${
                              evaluationResult.finalGrade >= 4.5
                                ? "text-green-600"
                                : evaluationResult.finalGrade >= 3.5
                                  ? "text-blue-600"
                                  : evaluationResult.finalGrade >= 3.0
                                    ? "text-yellow-600"
                                    : evaluationResult.finalGrade >= 2.0
                                      ? "text-orange-600"
                                      : "text-red-600"
                            }`}
                          >
                            {evaluationResult.finalGrade.toFixed(1)}/5.0
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">Estado:</span>
                          <span
                            className={`font-semibold text-lg ${
                              evaluationResult.isApproved ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {evaluationResult.isApproved ? "APROBADO" : "REPROBADO"}
                          </span>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-gray-700">{evaluationResult.feedback}</p>
                        </div>
                      </>
                    )}

                    {evaluationResult.isVerification && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>Verificación completada:</strong> Revise los resultados por pregunta. Cuando esté
                          listo, use "Evaluar y Enviar Nota" para la calificación final.
                        </p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <h5 className="font-semibold text-gray-800">Resultados por Pregunta:</h5>
                      {evaluationResult.questionResults.map((result, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-sm">{result.question}</span>
                            <span
                              className={`font-semibold ${result.score === result.maxScore ? "text-green-600" : result.score >= result.maxScore * 0.6 ? "text-yellow-600" : "text-red-600"}`}
                            >
                              {result.score}/{result.maxScore}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {result.feedback.map((item, idx) => (
                              <div key={idx} className="text-xs text-gray-600">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código PL/SQL completo (todas las preguntas) *
                </label>
                <Textarea
                  placeholder="Pegue aquí todo su código PL/SQL del examen..."
                  value={submittedCode}
                  onChange={(e) => setSubmittedCode(e.target.value)}
                  className="w-full h-64 font-mono text-sm"
                />
              </div>

              <div className="space-y-3">
                <Button
                  onClick={verifyCode}
                  disabled={isEvaluating}
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                >
                  {isEvaluating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verificando código...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verificar Código (Sin Nota)
                    </>
                  )}
                </Button>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    🔐 Clave del Docente (Requerida para Evaluación)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Ingrese clave del docente"
                      value={teacherKey}
                      onChange={(e) => setTeacherKey(e.target.value)}
                      className="flex-1"
                      disabled={isTeacherKeyValid}
                    />
                    {!isTeacherKeyValid ? (
                      <Button onClick={validateTeacherKey} size="sm" className="bg-red-600 hover:bg-red-700">
                        Validar
                      </Button>
                    ) : (
                      <div className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded text-sm">
                        ✓ Válida
                      </div>
                    )}
                  </div>
                  {isTeacherKeyValid && (
                    <p className="text-xs text-green-600 mt-1">
                      Clave del docente validada. Puede proceder con la evaluación.
                    </p>
                  )}
                </div>

                <Button
                  onClick={evaluateCode}
                  disabled={isEvaluating || !isTeacherKeyValid}
                  className={`w-full ${
                    isTeacherKeyValid
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isEvaluating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Evaluando código...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Evaluar y Mostrar Nota
                      {!isTeacherKeyValid && " (Requiere Clave del Docente)"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return <SlideViewer slides={slides} />
}
