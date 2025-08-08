#!/bin/bash

# 🔍 VERIFICACIÓN COMPLETA DEL PROYECTO EL RECODO
echo "🌾 VERIFICANDO PROYECTO EL RECODO..."
echo "=================================="

# 1. Verificar archivos principales
echo ""
echo "📁 ARCHIVOS PRINCIPALES:"
files=("website-el-recodo.html" "complete-server.js" "cash-flow-plurianual.js" "package.json")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - OK"
    else
        echo "❌ $file - FALTANTE"
    fi
done

# 2. Verificar carpetas
echo ""
echo "📂 CARPETAS:"
dirs=("images" "info" "node_modules")
for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir/ - OK"
    else
        echo "❌ $dir/ - FALTANTE"
    fi
done

# 3. Verificar imágenes críticas
echo ""
echo "🖼️ IMÁGENES CRÍTICAS:"
critical_images=("logo-el-recodo.svg" "favicon.svg" "grafico-inversion.svg" "grafico-ingresos.svg" "mapa-ubicacion.svg")
for img in "${critical_images[@]}"; do
    if [ -f "images/$img" ]; then
        echo "✅ images/$img - OK"
    else
        echo "❌ images/$img - FALTANTE"
    fi
done

# 4. Probar análisis financiero
echo ""
echo "💰 PROBANDO ANÁLISIS FINANCIERO:"
if node cash-flow-plurianual.js > /dev/null 2>&1; then
    echo "✅ Análisis financiero - FUNCIONA"
else
    echo "❌ Análisis financiero - ERROR"
fi

# 5. Verificar puerto del servidor
echo ""
echo "🌐 VERIFICANDO SERVIDOR:"
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Servidor puerto 3001 - ACTIVO"
else
    echo "⚠️ Servidor puerto 3001 - INACTIVO (normal si no está corriendo)"
fi

# 6. Contar archivos archivados
echo ""
echo "📦 ARCHIVOS ARCHIVADOS:"
if [ -d "archivo_desarrollo" ]; then
    archived_count=$(find archivo_desarrollo -type f | wc -l)
    echo "✅ archivo_desarrollo/ - $archived_count archivos archivados"
else
    echo "❌ archivo_desarrollo/ - FALTANTE"
fi

echo ""
echo "🎯 VERIFICACIÓN COMPLETADA"
echo "=========================="
