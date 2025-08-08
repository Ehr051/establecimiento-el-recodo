const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const CompleteMarketScraper = require('./complete-scraper');

const app = express();
const port = 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'file://'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.static('.'));

// Instancia del scraper completo
const marketScraper = new CompleteMarketScraper();
let lastScrapingResult = null;

// Endpoints de API
app.get('/api/complete-market-data', async (req, res) => {
    try {
        console.log('📡 Solicitud de datos completos del mercado...');
        
        // Usar datos en caché si están disponibles y son recientes (menos de 1 hora)
        if (lastScrapingResult && 
            (new Date() - new Date(lastScrapingResult.last_updated)) < 3600000) {
            console.log('📋 Enviando datos en caché');
            return res.json({
                success: true,
                data: lastScrapingResult,
                cached: true
            });
        }
        
        // Obtener datos frescos
        console.log('🔄 Obteniendo datos frescos del mercado...');
        const marketData = await marketScraper.scrapeCompleteMarketData();
        lastScrapingResult = marketData;
        
        res.json({
            success: true,
            data: marketData,
            cached: false
        });
        
    } catch (error) {
        console.error('❌ Error en endpoint complete-market-data:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            data: await marketScraper.getStoredData()
        });
    }
});

// Mantener compatibilidad con endpoint anterior
app.get('/api/market-data', async (req, res) => {
    try {
        const marketData = await marketScraper.scrapeCompleteMarketData();
        lastScrapingResult = marketData;
        
        res.json({
            success: true,
            data: marketData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: await marketScraper.getStoredData()
        });
    }
});

// Endpoint para forzar actualización
app.post('/api/update-complete-market-data', async (req, res) => {
    try {
        console.log('🔄 Forzando actualización completa de datos...');
        const marketData = await marketScraper.scrapeCompleteMarketData();
        lastScrapingResult = marketData;
        
        res.json({
            success: true,
            data: marketData,
            message: 'Datos actualizados correctamente'
        });
        
    } catch (error) {
        console.error('❌ Error forzando actualización:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Endpoint para obtener historial de precios
app.get('/api/price-history/:product?', async (req, res) => {
    try {
        const fs = require('fs').promises;
        const path = require('path');
        
        const historyFile = path.join(__dirname, 'complete-price-history.json');
        const historyData = await fs.readFile(historyFile, 'utf8');
        const history = JSON.parse(historyData);
        
        const { product } = req.params;
        
        if (product) {
            // Filtrar por producto específico
            const filteredHistory = history.map(entry => ({
                date: entry.date,
                timestamp: entry.timestamp,
                price: entry.prices[product] || null,
                projections: entry.projections
            })).filter(entry => entry.price !== null);
            
            res.json({
                success: true,
                data: filteredHistory,
                product: product
            });
        } else {
            // Enviar historial completo
            res.json({
                success: true,
                data: history
            });
        }
        
    } catch (error) {
        console.error('❌ Error obteniendo historial:', error);
        res.json({
            success: false,
            error: error.message,
            data: []
        });
    }
});

// Endpoint de estado del sistema
app.get('/api/system-status', (req, res) => {
    res.json({
        success: true,
        status: 'active',
        last_update: lastScrapingResult?.last_updated || null,
        scraping_date: lastScrapingResult?.scraping_date || null,
        server_uptime: process.uptime(),
        system: {
            node_version: process.version,
            platform: process.platform,
            memory_usage: process.memoryUsage()
        }
    });
});

// Servir el sitio web
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/website-el-recodo.html');
});

// Iniciar servidor
app.listen(port, async () => {
    console.log('🚀 Servidor iniciado en http://localhost:' + port);
    console.log('📊 Sistema de scraping completo de mercado activo');
    
    // Ejecutar primera actualización
    console.log('🔄 Ejecutando primera actualización completa de datos...');
    try {
        lastScrapingResult = await marketScraper.scrapeCompleteMarketData();
        console.log('✅ Primera actualización completa exitosa');
    } catch (error) {
        console.error('❌ Error en primera actualización:', error.message);
    }
});

// Programar actualizaciones automáticas cada 6 horas
cron.schedule('0 */6 * * *', async () => {
    console.log('⏰ Ejecutando actualización programada completa...');
    try {
        lastScrapingResult = await marketScraper.scrapeCompleteMarketData();
        console.log('✅ Actualización programada completa exitosa');
    } catch (error) {
        console.error('❌ Error en actualización programada:', error.message);
    }
});

// Actualización diaria a las 9:00 AM
cron.schedule('0 9 * * *', async () => {
    console.log('🌅 Actualización diaria matutina - datos completos...');
    try {
        lastScrapingResult = await marketScraper.scrapeCompleteMarketData();
        console.log('✅ Actualización matutina completa exitosa');
    } catch (error) {
        console.error('❌ Error en actualización matutina:', error.message);
    }
});

console.log('⏰ Tareas programadas configuradas:');
console.log('   - Cada 6 horas: Actualización completa');
console.log('   - Diario 9:00 AM: Actualización matutina');
console.log('🎯 Sistema completo listo para uso');
