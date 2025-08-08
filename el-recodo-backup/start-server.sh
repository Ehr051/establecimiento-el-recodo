#!/bin/bash
# Script para iniciar servidor local del proyecto El Recodo

echo "🚀 Iniciando servidor local para El Recodo..."

# Verificar si Python está disponible
if command -v python3 &> /dev/null; then
    echo "📡 Servidor disponible en: http://localhost:8000"
    echo "🌐 Para compartir con tus hermanos, usa: http://$(ipconfig getifaddr en0):8000"
    echo "⏹️  Para detener el servidor, presiona Ctrl+C"
    echo ""
    
    # Iniciar servidor HTTP simple
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "📡 Servidor disponible en: http://localhost:8000"
    echo "🌐 Para compartir con tus hermanos, usa: http://$(ipconfig getifaddr en0):8000"
    echo "⏹️  Para detener el servidor, presiona Ctrl+C"
    echo ""
    
    # Iniciar servidor HTTP simple (Python 2)
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python no está disponible. Instalando alternativa..."
    
    # Usar Node.js si está disponible
    if command -v node &> /dev/null; then
        echo "📡 Servidor disponible en: http://localhost:8000"
        echo "🌐 Para compartir con tus hermanos, usa: http://$(ipconfig getifaddr en0):8000"
        echo ""
        
        # Crear servidor simple con Node.js
        node -e "
        const http = require('http');
        const fs = require('fs');
        const path = require('path');
        
        const server = http.createServer((req, res) => {
            let filePath = '.' + req.url;
            if (filePath == './') filePath = './website-el-recodo.html';
            
            const extname = path.extname(filePath).toLowerCase();
            const mimeTypes = {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpg',
                '.gif': 'image/gif',
                '.svg': 'image/svg+xml',
                '.wav': 'audio/wav',
                '.mp4': 'video/mp4',
                '.woff': 'application/font-woff',
                '.ttf': 'application/font-ttf',
                '.eot': 'application/vnd.ms-fontobject',
                '.otf': 'application/font-otf',
                '.wasm': 'application/wasm'
            };
            
            const contentType = mimeTypes[extname] || 'application/octet-stream';
            
            fs.readFile(filePath, (error, content) => {
                if (error) {
                    if(error.code == 'ENOENT') {
                        res.writeHead(404);
                        res.end('404 - Archivo no encontrado');
                    } else {
                        res.writeHead(500);
                        res.end('500 - Error interno del servidor');
                    }
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });
        });
        
        server.listen(8000);
        console.log('🎉 Servidor El Recodo funcionando en puerto 8000');
        "
    else
        echo "❌ Ni Python ni Node.js están disponibles"
        echo "💡 Simplemente abre website-el-recodo.html en tu navegador"
    fi
fi
