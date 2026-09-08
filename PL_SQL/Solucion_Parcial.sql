Thought for 2sPreguntas finales leídasBasándome en las preguntas del examen final actual, aquí están las soluciones completas:

# Soluciones del Examen Final PL/SQL - Sistema de Trilladora

## Pregunta 1: Sistema de Análisis de Productos (35 puntos)

```sql
DECLARE
    -- Variables con %TYPE para compatibilidad
    v_nombre_producto TBL_PRODUCTOS.NOMBRE%TYPE := 'Arroz Premium';
    v_total_lotes NUMBER := 0;
    v_cod_producto TBL_PRODUCTOS.COD_PRODUCTO%TYPE;
    
    -- Variables para clasificación
    v_clasificacion VARCHAR2(20);
    v_contador_liviano NUMBER := 0;
    v_contador_medio NUMBER := 0;
    v_contador_pesado NUMBER := 0;
    
    -- Cursor para recorrer productos
    CURSOR c_productos IS
        SELECT COD_PRODUCTO, NOMBRE, PESOXUNIDAD
        FROM TBL_PRODUCTOS
        ORDER BY NOMBRE;
    
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== ANÁLISIS COMPLETO DE PRODUCTOS ===');
    DBMS_OUTPUT.PUT_LINE('');
    
    -- PARTE 1: Total de lotes por producto específico
    DBMS_OUTPUT.PUT_LINE('--- PARTE 1: CONTEO DE LOTES ---');
    BEGIN
        SELECT COD_PRODUCTO 
        INTO v_cod_producto
        FROM TBL_PRODUCTOS 
        WHERE UPPER(NOMBRE) = UPPER(v_nombre_producto);
        
        -- Usar COUNT(*) para contar lotes
        SELECT COUNT(*)
        INTO v_total_lotes
        FROM TBL_LOTES
        WHERE COD_PRODUCTO = v_cod_producto;
        
        -- Estructura IF-THEN-ELSE para validaciones
        IF v_total_lotes > 0 THEN
            DBMS_OUTPUT.PUT_LINE('Producto: ' || v_nombre_producto);
            DBMS_OUTPUT.PUT_LINE('Total de lotes: ' || v_total_lotes);
        ELSE
            DBMS_OUTPUT.PUT_LINE('El producto ' || v_nombre_producto || ' no tiene lotes registrados.');
        END IF;
        
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            DBMS_OUTPUT.PUT_LINE('Error: No se encontró el producto ' || v_nombre_producto);
        WHEN TOO_MANY_ROWS THEN
            DBMS_OUTPUT.PUT_LINE('Error: Se encontraron múltiples productos con el nombre ' || v_nombre_producto);
    END;
    
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('--- PARTE 2: CLASIFICACIÓN POR PESO ---');
    
    -- PARTE 2: Clasificación de TODOS los productos por peso usando CASE
    FOR producto IN c_productos LOOP
        -- Clasificación usando estructura CASE
        v_clasificacion := CASE 
            WHEN producto.PESOXUNIDAD < 1 THEN 'LIVIANO'
            WHEN producto.PESOXUNIDAD BETWEEN 1 AND 5 THEN 'MEDIO'
            WHEN producto.PESOXUNIDAD > 5 THEN 'PESADO'
            ELSE 'SIN CLASIFICAR'
        END;
        
        -- Mostrar resultado por consola usando DBMS_OUTPUT
        DBMS_OUTPUT.PUT_LINE('Producto: ' || producto.NOMBRE || 
                           ' | Peso: ' || producto.PESOXUNIDAD || 
                           ' kg | Clasificación: ' || v_clasificacion);
        
        -- Contadores por categoría usando CASE
        CASE v_clasificacion
            WHEN 'LIVIANO' THEN v_contador_liviano := v_contador_liviano + 1;
            WHEN 'MEDIO' THEN v_contador_medio := v_contador_medio + 1;
            WHEN 'PESADO' THEN v_contador_pesado := v_contador_pesado + 1;
        END CASE;
    END LOOP;
    
    -- Resumen final con contadores
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('=== RESUMEN DE CLASIFICACIÓN ===');
    DBMS_OUTPUT.PUT_LINE('Productos livianos (<1 kg): ' || v_contador_liviano);
    DBMS_OUTPUT.PUT_LINE('Productos medios (1-5 kg): ' || v_contador_medio);
    DBMS_OUTPUT.PUT_LINE('Productos pesados (>5 kg): ' || v_contador_pesado);
    DBMS_OUTPUT.PUT_LINE('Total de productos analizados: ' || (v_contador_liviano + v_contador_medio + v_contador_pesado));
    
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error inesperado: ' || SQLERRM);
END;
/
```

## Pregunta 2: Cursores Explícitos (15 puntos)

```sql
DECLARE
    -- Declaración del cursor con parámetros
    CURSOR c_lotes_vencimiento(p_dias_limite NUMBER) IS
        SELECT l.COD_LOTE, l.COD_PRODUCTO, l.FECHA_LOTE, l.FECHA_VENCIMIENTO,
               p.NOMBRE as NOMBRE_PRODUCTO,
               (l.FECHA_VENCIMIENTO - SYSDATE) as DIAS_RESTANTES
        FROM TBL_LOTES l
        INNER JOIN TBL_PRODUCTOS p ON l.COD_PRODUCTO = p.COD_PRODUCTO
        WHERE l.FECHA_VENCIMIENTO BETWEEN SYSDATE AND (SYSDATE + p_dias_limite)
        ORDER BY l.FECHA_VENCIMIENTO;
    
    -- Variables para el cursor usando %ROWTYPE
    v_lote c_lotes_vencimiento%ROWTYPE;
    v_contador_procesados NUMBER := 0;
    v_dias_limite NUMBER := 30;
    
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== LOTES PRÓXIMOS A VENCER (30 DÍAS) ===');
    DBMS_OUTPUT.PUT_LINE('Fecha de consulta: ' || TO_CHAR(SYSDATE, 'DD/MM/YYYY'));
    DBMS_OUTPUT.PUT_LINE('');
    
    -- OPEN cursor explícito
    OPEN c_lotes_vencimiento(v_dias_limite);
    
    -- Loop manual (no FOR loop) con FETCH
    LOOP
        -- FETCH del cursor
        FETCH c_lotes_vencimiento INTO v_lote;
        
        -- Verificar %NOTFOUND para salir del loop
        EXIT WHEN c_lotes_vencimiento%NOTFOUND;
        
        -- Procesar registro
        v_contador_procesados := v_contador_procesados + 1;
        
        DBMS_OUTPUT.PUT_LINE('Lote #' || v_contador_procesados);
        DBMS_OUTPUT.PUT_LINE('  Código Lote: ' || v_lote.COD_LOTE);
        DBMS_OUTPUT.PUT_LINE('  Producto: ' || v_lote.NOMBRE_PRODUCTO);
        DBMS_OUTPUT.PUT_LINE('  Fecha Vencimiento: ' || TO_CHAR(v_lote.FECHA_VENCIMIENTO, 'DD/MM/YYYY'));
        DBMS_OUTPUT.PUT_LINE('  Días Restantes: ' || ROUND(v_lote.DIAS_RESTANTES));
        
        -- Alerta por urgencia usando SYSDATE
        IF v_lote.DIAS_RESTANTES <= 7 THEN
            DBMS_OUTPUT.PUT_LINE('  *** ALERTA: VENCE EN MENOS DE 7 DÍAS ***');
        ELSIF v_lote.DIAS_RESTANTES <= 15 THEN
            DBMS_OUTPUT.PUT_LINE('  ** ADVERTENCIA: VENCE EN MENOS DE 15 DÍAS **');
        END IF;
        
        DBMS_OUTPUT.PUT_LINE('');
        
    END LOOP;
    
    -- CLOSE cursor explícito
    CLOSE c_lotes_vencimiento;
    
    -- Resumen final usando atributos del cursor
    DBMS_OUTPUT.PUT_LINE('=== RESUMEN ===');
    DBMS_OUTPUT.PUT_LINE('Total de lotes procesados: ' || v_contador_procesados);
    DBMS_OUTPUT.PUT_LINE('Registros encontrados con %ROWCOUNT: ' || c_lotes_vencimiento%ROWCOUNT);
    
    IF v_contador_procesados = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No hay lotes próximos a vencer en los próximos ' || v_dias_limite || ' días.');
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Asegurar que el cursor se cierre en caso de error
        IF c_lotes_vencimiento%ISOPEN THEN
            CLOSE c_lotes_vencimiento;
        END IF;
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END;
/
```

## Pregunta 3: Paquete Completo de Inventario (50 puntos)

```sql
-- ESPECIFICACIÓN DEL PAQUETE (PACKAGE)
CREATE OR REPLACE PACKAGE PKG_INVENTARIO IS
    
    -- Constante STOCK_MINIMO
    STOCK_MINIMO CONSTANT NUMBER := 10;
    
    -- Excepción personalizada stock_insuficiente
    stock_insuficiente EXCEPTION;
    
    -- Función obtener_stock_disponible
    FUNCTION obtener_stock_disponible(
        p_cod_producto IN NUMBER
    ) RETURN NUMBER;
    
    -- Función calcular_peso_pedido
    FUNCTION calcular_peso_pedido(
        p_cod_orden IN NUMBER
    ) RETURN NUMBER;
    
    -- Procedimiento actualizar_inventario_entrada
    PROCEDURE actualizar_inventario_entrada(
        p_cod_producto IN NUMBER,
        p_cantidad IN NUMBER,
        p_resultado OUT VARCHAR2
    );
    
    -- Procedimiento generar_reporte_inventario
    PROCEDURE generar_reporte_inventario;
    
END PKG_INVENTARIO;
/

-- CUERPO DEL PAQUETE (PACKAGE BODY)
CREATE OR REPLACE PACKAGE BODY PKG_INVENTARIO IS
    
    -- Implementación de obtener_stock_disponible
    FUNCTION obtener_stock_disponible(
        p_cod_producto IN NUMBER
    ) RETURN NUMBER IS
        v_stock_total NUMBER := 0;
    BEGIN
        SELECT NVL(INVEN_TOTAL, 0)
        INTO v_stock_total
        FROM TBL_INVENTARIOS
        WHERE COD_PRODUCTO = p_cod_producto;
        
        RETURN v_stock_total;
        
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 0;
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20003, 'Error al obtener stock: ' || SQLERRM);
    END obtener_stock_disponible;
    
    -- Implementación de calcular_peso_pedido
    FUNCTION calcular_peso_pedido(
        p_cod_orden IN NUMBER
    ) RETURN NUMBER IS
        
        v_peso_total NUMBER := 0;
        v_existe_orden NUMBER := 0;
        
        -- Cursor para obtener detalles del pedido
        CURSOR c_detalles IS
            SELECT dp.CANTIDAD, dp.PESOXCAJA
            FROM TBL_DETALLEPEDIDOS dp
            WHERE dp.COD_ORDEN = p_cod_orden;
        
        -- Excepciones personalizadas
        ex_orden_no_existe EXCEPTION;
        
    BEGIN
        -- Verificar que la orden existe en TBL_ORDENPEDIDOS
        SELECT COUNT(*)
        INTO v_existe_orden
        FROM TBL_ORDENPEDIDOS
        WHERE COD_ORDEN = p_cod_orden;
        
        IF v_existe_orden = 0 THEN
            RAISE ex_orden_no_existe;
        END IF;
        
        -- Calcular peso total usando cursor y fórmula CANTIDAD × PESOXCAJA
        FOR detalle IN c_detalles LOOP
            v_peso_total := v_peso_total + (detalle.CANTIDAD * detalle.PESOXCAJA);
        END LOOP;
        
        -- RETURN peso total
        RETURN v_peso_total;
        
    EXCEPTION
        WHEN ex_orden_no_existe THEN
            RAISE_APPLICATION_ERROR(-20001, 'La orden ' || p_cod_orden || ' no existe.');
            
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Error al calcular peso del pedido: ' || SQLERRM);
            
    END calcular_peso_pedido;
    
    -- Implementación de actualizar_inventario_entrada
    PROCEDURE actualizar_inventario_entrada(
        p_cod_producto IN NUMBER,
        p_cantidad IN NUMBER,
        p_resultado OUT VARCHAR2
    ) IS
        v_inventario_actual TBL_INVENTARIOS.INVEN_TOTAL%TYPE;
        v_nuevo_piso1 TBL_INVENTARIOS.INVEN_PISO1%TYPE;
        v_nuevo_total TBL_INVENTARIOS.INVEN_TOTAL%TYPE;
        v_nombre_producto TBL_PRODUCTOS.NOMBRE%TYPE;
        
        -- Excepciones personalizadas
        ex_producto_no_existe EXCEPTION;
        ex_cantidad_invalida EXCEPTION;
        
    BEGIN
        -- Validar parámetros IN
        IF p_cantidad <= 0 THEN
            RAISE ex_cantidad_invalida;
        END IF;
        
        -- Verificar que el producto existe en TBL_PRODUCTOS
        BEGIN
            SELECT NOMBRE INTO v_nombre_producto
            FROM TBL_PRODUCTOS
            WHERE COD_PRODUCTO = p_cod_producto;
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                RAISE ex_producto_no_existe;
        END;
        
        -- Obtener inventario actual de TBL_INVENTARIOS
        BEGIN
            SELECT INVEN_PISO1, INVEN_TOTAL
            INTO v_nuevo_piso1, v_inventario_actual
            FROM TBL_INVENTARIOS
            WHERE COD_PRODUCTO = p_cod_producto;
            
            -- UPDATE inventario (agregar al piso 1 y total)
            v_nuevo_piso1 := v_nuevo_piso1 + p_cantidad;
            v_nuevo_total := v_inventario_actual + p_cantidad;
            
            UPDATE TBL_INVENTARIOS
            SET INVEN_PISO1 = v_nuevo_piso1,
                INVEN_TOTAL = v_nuevo_total
            WHERE COD_PRODUCTO = p_cod_producto;
            
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                -- INSERT si no existe registro de inventario
                INSERT INTO TBL_INVENTARIOS (COD_PRODUCTO, INVEN_PISO1, INVEN_PISO2, INVEN_TOTAL)
                VALUES (p_cod_producto, p_cantidad, 0, p_cantidad);
                
                v_nuevo_total := p_cantidad;
        END;
        
        -- Confirmar transacción
        COMMIT;
        
        -- Parámetro OUT con mensaje de éxito
        p_resultado := 'ÉXITO: Inventario actualizado para ' || v_nombre_producto || 
                       '. Cantidad agregada: ' || p_cantidad || 
                       '. Nuevo total: ' || v_nuevo_total;
        
    EXCEPTION
        WHEN ex_producto_no_existe THEN
            ROLLBACK;
            p_resultado := 'ERROR: El producto con código ' || p_cod_producto || ' no existe.';
            
        WHEN ex_cantidad_invalida THEN
            ROLLBACK;
            p_resultado := 'ERROR: La cantidad debe ser mayor a cero.';
            
        WHEN OTHERS THEN
            ROLLBACK;
            p_resultado := 'ERROR: ' || SQLERRM;
    END actualizar_inventario_entrada;
    
    -- Implementación de generar_reporte_inventario
    PROCEDURE generar_reporte_inventario IS
        CURSOR c_inventario IS
            SELECT p.COD_PRODUCTO, p.NOMBRE, 
                   NVL(i.INVEN_PISO1, 0) as PISO1,
                   NVL(i.INVEN_PISO2, 0) as PISO2,
                   NVL(i.INVEN_TOTAL, 0) as TOTAL
            FROM TBL_PRODUCTOS p
            LEFT JOIN TBL_INVENTARIOS i ON p.COD_PRODUCTO = i.COD_PRODUCTO
            ORDER BY p.NOMBRE;
        
        v_total_productos NUMBER := 0;
        v_productos_criticos NUMBER := 0;
    BEGIN
        DBMS_OUTPUT.PUT_LINE('=== REPORTE DE INVENTARIO ===');
        DBMS_OUTPUT.PUT_LINE('Fecha: ' || TO_CHAR(SYSDATE, 'DD/MM/YYYY HH24:MI:SS'));
        DBMS_OUTPUT.PUT_LINE('Stock mínimo definido: ' || STOCK_MINIMO);
        DBMS_OUTPUT.PUT_LINE('');
        
        FOR inv IN c_inventario LOOP
            v_total_productos := v_total_productos + 1;
            
            DBMS_OUTPUT.PUT_LINE('Producto: ' || inv.NOMBRE);
            DBMS_OUTPUT.PUT_LINE('  Código: ' || inv.COD_PRODUCTO);
            DBMS_OUTPUT.PUT_LINE('  Piso 1: ' || inv.PISO1);
            DBMS_OUTPUT.PUT_LINE('  Piso 2: ' || inv.PISO2);
            DBMS_OUTPUT.PUT_LINE('  Total: ' || inv.TOTAL);
            
            -- Usar CONSTANT para verificar stock crítico
            IF inv.TOTAL <= STOCK_MINIMO THEN
                DBMS_OUTPUT.PUT_LINE('  *** STOCK CRÍTICO ***');
                v_productos_criticos := v_productos_criticos + 1;
            END IF;
            
            DBMS_OUTPUT.PUT_LINE('');
        END LOOP;
        
        DBMS_OUTPUT.PUT_LINE('=== RESUMEN ===');
        DBMS_OUTPUT.PUT_LINE('Total de productos: ' || v_total_productos);
        DBMS_OUTPUT.PUT_LINE('Productos con stock crítico: ' || v_productos_criticos);
        
    EXCEPTION
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('Error en reporte: ' || SQLERRM);
    END generar_reporte_inventario;
    
END PKG_INVENTARIO;
/

-- Ejemplo de uso completo del paquete PKG_INVENTARIO
DECLARE
    v_resultado VARCHAR2(500);
    v_stock NUMBER;
    v_peso_pedido NUMBER;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== PRUEBA DEL PAQUETE PKG_INVENTARIO ===');
    DBMS_OUTPUT.PUT_LINE('');
    
    -- Probar función obtener_stock_disponible
    v_stock := PKG_INVENTARIO.obtener_stock_disponible(1);
    DBMS_OUTPUT.PUT_LINE('Stock actual del producto 1: ' || v_stock);
    
    -- Probar función calcular_peso_pedido
    v_peso_pedido := PKG_INVENTARIO.calcular_peso_pedido(1001);
    DBMS_OUTPUT.PUT_LINE('Peso total del pedido 1001: ' || v_peso_pedido || ' kg');
    
    -- Probar procedimiento actualizar_inventario_entrada
    PKG_INVENTARIO.actualizar_inventario_entrada(1, 50, v_resultado);
    DBMS_OUTPUT.PUT_LINE(v_resultado);
    
    DBMS_OUTPUT.PUT_LINE('');
    
    -- Generar reporte completo
    PKG_INVENTARIO.generar_reporte_inventario;
    
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END;
/
```