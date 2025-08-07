#!/bin/bash

echo "🧹 Limpiando repositorio de El Recodo..."
echo "📂 Directorio actual: $(pwd)"

# Cambiar al directorio github-clean que será nuestro directorio principal
cd "github-clean"

echo "✅ Manteniendo archivos esenciales:"
echo "   - index.html (website principal con todas las funcionalidades)"
echo "   - README.md (documentación)"
echo "   - .git/ (control de versiones)"
echo ""

echo "🗑️ Eliminando archivos obsoletos/duplicados:"

# Eliminar archivos HTML duplicados/obsoletos en github-clean
rm -f index-dinamico.html
rm -f index-original.html
rm -f index-completo.html
rm -f index-complete.html
rm -f informe-el-recodo.html
rm -f test-functions.html
rm -f advanced-testing-suite.html

echo "   ✅ Eliminados HTML duplicados en github-clean/"

# Volver al directorio principal
cd ..

echo "🗑️ Eliminando archivos obsoletos en directorio principal:"

# Eliminar archivos HTML obsoletos del directorio principal
rm -f website-el-recodo.html
rm -f index-completo-dinamico.html
rm -f index-actualizado.html
rm -f test-functions.html
rm -f advanced-testing-suite.html

echo "   ✅ Eliminados HTML obsoletos en directorio principal"

# Eliminar archivos JavaScript de modelos (ya integrados en la web)
rm -f modelo-*.cjs

echo "   ✅ Eliminados modelos JavaScript (integrados en website)"

# Crear estructura final limpia
echo ""
echo "📁 Estructura final del repositorio:"
echo "el-recodo/"
echo "├── github-clean/"
echo "│   ├── index.html          # 🌐 Website principal completo"
echo "│   ├── README.md           # 📖 Documentación"
echo "│   └── .git/              # 🔧 Control de versiones"
echo "└── limpiar-repositorio.sh  # 🧹 Script de limpieza"

echo ""
echo "🎉 ¡Repositorio limpio y consolidado!"
echo "🚀 El website principal está en: github-clean/index.html"
echo ""
echo "📋 Características del website final:"
echo "   ✅ Experiencia completa de huéspedes"
echo "   ✅ Análisis financiero MBA nivel"
echo "   ✅ Cash flow por trimestres"
echo "   ✅ Simulador dinámico de rendimientos"
echo "   ✅ Plan financiero 2025-2028"
echo "   ✅ Sistema de participaciones interactivo"
echo "   ✅ Plan de inversiones por etapas"
echo "   ✅ Análisis de viabilidad"
echo "   ✅ Estrategia de marketing"
echo "   ✅ Formulario de contacto"
echo ""
echo "💻 Para ver el website: abrir github-clean/index.html en navegador"
