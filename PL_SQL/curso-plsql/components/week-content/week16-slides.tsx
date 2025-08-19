"use client"

import { SlideViewer } from "@/components/slide-viewer"

export default function Week16Slides() {
  const slides = [
    {
      id: 1,
      title: "Presentación Final del Proyecto",
      subtitle: "Sistema de Gestión Bancaria - Semana 16",
      type: "intro" as const,
      content: (
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-purple-600">Presentación Final</h2>
          <p className="text-xl text-gray-600">Demo del Sistema Bancario, defensa técnica y retroalimentación</p>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <p className="text-lg">
              Culminación del curso con la demostración completa del sistema bancario desarrollado
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Estructura de la Presentación",
      type: "content" as const,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex justify-between items-center">
              <span className="font-semibold">Introducción al sistema bancario</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">5 min</span>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex justify-between items-center">
              <span className="font-semibold">Demostración del sistema bancario</span>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">10 min</span>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg flex justify-between items-center">
              <span className="font-semibold">Explicación técnica</span>
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">10 min</span>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg flex justify-between items-center">
              <span className="font-semibold">Preguntas y respuestas</span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">10 min</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg flex justify-between items-center">
              <span className="font-semibold">Retroalimentación</span>
              <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm">5 min</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Script de Demostración Bancaria",
      type: "code" as const,
      content: (
        <div className="space-y-4">
          <p className="text-lg mb-4">Script preparado para la demostración del sistema bancario:</p>
          <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm">
            <code>{`-- Actualizado script para demostración bancaria
-- 1. Mostrar estado inicial del sistema bancario
SELECT 'Clientes registrados: ' || COUNT(*) FROM Cliente;
SELECT 'Cuentas activas: ' || COUNT(*) FROM Cuenta WHERE estado = 'activa';
SELECT 'Transacciones del día: ' || COUNT(*) FROM Transaccion 
WHERE DATE(fecha_transaccion) = DATE(SYSDATE);

-- 2. Demostrar creación de cliente y cuenta
BEGIN
    gestion_clientes_pkg.crear_cliente(
        p_nombre_completo => 'Juan Pérez García',
        p_identificacion => '12345678',
        p_direccion => 'Calle 123 #45-67'
    );
    
    gestion_cuentas_pkg.crear_cuenta(
        p_cliente_id => 1,
        p_tipo_cuenta => 'AHORROS',
        p_saldo_inicial => 500000
    );
    DBMS_OUTPUT.PUT_LINE('Cliente y cuenta creados exitosamente');
END;

-- 3. Demostrar operaciones bancarias
BEGIN
    -- Realizar depósito
    gestion_transacciones_pkg.realizar_deposito(
        p_numero_cuenta => '1001',
        p_monto => 100000,
        p_usuario_id => 1
    );
    
    -- Realizar retiro
    gestion_transacciones_pkg.realizar_retiro(
        p_numero_cuenta => '1001',
        p_monto => 50000,
        p_usuario_id => 1
    );
    
    -- Transferencia entre cuentas
    gestion_transacciones_pkg.realizar_transferencia(
        p_cuenta_origen => '1001',
        p_cuenta_destino => '1002',
        p_monto => 25000,
        p_usuario_id => 1
    );
END;

-- 4. Mostrar auditoría y seguridad
SELECT 
    t.transaccion_id,
    c.numero_cuenta,
    t.tipo_transaccion,
    t.monto,
    t.fecha_transaccion,
    u.nombre_usuario
FROM Transaccion t
JOIN Cuenta c ON t.cuenta_id = c.numero_cuenta
JOIN Auditoria_Transacciones a ON t.transaccion_id = a.transaccion_id
JOIN Usuario u ON a.usuario_id = u.usuario_id
ORDER BY t.fecha_transaccion DESC;`}</code>
          </pre>
        </div>
      ),
    },
    {
      id: 4,
      title: "Criterios de Evaluación Final",
      type: "content" as const,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Sistema Bancario</h4>
              <p className="text-3xl font-bold text-blue-600">25%</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Paquetes PL/SQL</h4>
              <p className="text-3xl font-bold text-green-600">20%</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
              <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Triggers & Seguridad</h4>
              <p className="text-3xl font-bold text-purple-600">15%</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
              <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-2">Validaciones</h4>
              <p className="text-3xl font-bold text-orange-600">15%</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Presentación</h4>
              <p className="text-3xl font-bold text-red-600">15%</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg text-center">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Documentación</h4>
              <p className="text-3xl font-bold text-gray-600">10%</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Preguntas Técnicas Bancarias",
      type: "content" as const,
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold mb-4">Prepárate para estas preguntas sobre el sistema bancario:</h3>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                ?
              </span>
              <span>¿Cómo garantiza la atomicidad en las transferencias bancarias?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                ?
              </span>
              <span>¿Qué medidas de seguridad implementó para proteger los datos financieros?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                ?
              </span>
              <span>¿Cómo maneja la concurrencia en operaciones simultáneas sobre la misma cuenta?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                ?
              </span>
              <span>¿Qué papel juegan los triggers en la validación de transacciones?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                ?
              </span>
              <span>¿Cómo implementaría límites de transacciones y detección de fraude?</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 6,
      title: "Preparación para la Presentación",
      type: "exercise" as const,
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-orange-700 dark:text-orange-300">
              Lista de Preparación del Sistema Bancario:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>Preparar demo de operaciones bancarias: depósitos, retiros y transferencias</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>Explicar arquitectura del MER bancario y relaciones entre entidades</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>Demostrar funcionamiento de paquetes PL/SQL y triggers de validación</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <span>Mostrar sistema de auditoría y trazabilidad de transacciones</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  5
                </span>
                <span>Practicar respuestas sobre seguridad y manejo de errores bancarios</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ]

  return <SlideViewer slides={slides} moduleTitle="Módulo 3: Proyecto Final" weekNumber={16} />
}
