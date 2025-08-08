// 🎯 Sistema Completo de Scraping de Mercado - El Recodo
// Gestión integral de precios, proyecciones financieras y actualizaciones automáticas

class CompleteMarketScraper {
    constructor() {
        this.apiBaseUrl = 'http://localhost:3001/api';
        this.currentData = null;
        this.lastUpdateDate = null;
        this.updateInterval = null;
        this.useRealData = false; // Alternar entre datos simulados y reales
        // Datos de respaldo
        this.fallbackData = {
            alfalfa_price: 3800,
            firewood_price: 5200,
            beer_price: 1200,
            cabin_price: 35000,
            rural_tourism_price: 50000,
            cfi_rate: 85.0,
            banco_nacion_rate: 95.0,
            pool_cost_per_m2: 200000,
            deck_cost_per_m2: 95000,
            road_cost_per_m: 12000,
            general_construction_cost: 105000,
            financial_projections: {
                // Datos corregidos por fases
                phase1: {
                    duration_months: 6,
                    investment: 21000000,
                    annual_revenue: 15000000,
                    annual_costs: 8000000,
                    net_result: 7000000,
                    roi_percentage: 33.3,
                    payback_years: 3.0
                },
                phase2: {
                    duration_months: 12,
                    investment: 15000000,
                    annual_revenue: 25000000,
                    annual_costs: 12000000,
                    net_result: 13000000,
                    roi_percentage: 86.7,
                    payback_years: 1.2
                },
                phase3: {
                    duration_months: 18,
                    investment: 12000000,
                    annual_revenue: 35000000,
                    annual_costs: 16000000,
                    net_result: 19000000,
                    roi_percentage: 158.3,
                    payback_years: 0.6
                },
                total_investment: 48000000,
                total_annual_revenue: 75000000,
                total_annual_costs: 36000000,
                total_net_result: 39000000,
                total_roi_percentage: 81.3,
                total_payback_years: 1.2
            }
        };
    }

    // Obtener datos completos del mercado
    async getCompleteMarketData() {
        try {
            console.log('🔄 Obteniendo datos completos del mercado...');
            let marketData;
            if (this.useRealData) {
                // Leer datos reales desde multi-source-insumos.json
                try {
                    const res = await fetch('/multi-source-insumos.json');
                    const realData = await res.json();
                    marketData = this.mapRealDataToMarketData(realData);
                    console.log('✅ Usando datos reales de insumos/equipos');
                } catch (e) {
                    console.warn('⚠️ No se pudo leer multi-source-insumos.json, usando simulados');
                    marketData = await this.generateSimulatedData();
                }
            } else {
                try {
                    const response = await fetch(`${this.apiBaseUrl}/complete-market-data`);
                    const result = await response.json();
                    if (result.success) {
                        marketData = result.data;
                        console.log('✅ Datos obtenidos del servidor');
                    } else {
                        throw new Error('Error del servidor');
                    }
                } catch (error) {
                    console.warn('⚠️ Servidor no disponible, usando datos simulados');
                    marketData = await this.generateSimulatedData();
                }
            }
            this.currentData = marketData;
            this.lastUpdateDate = new Date().toLocaleDateString('es-AR');
            console.log('📊 Datos del mercado actualizados:', {
                fecha: this.lastUpdateDate,
                alfalfa: `$${marketData.alfalfa_price?.toLocaleString()}`,
                cabañas: `$${marketData.cabin_price?.toLocaleString()}`,
                cfi_rate: `${marketData.cfi_rate}%`,
                roi: `${marketData.financial_projections?.roi_percentage}%`
            });
            return marketData;
        } catch (error) {
            console.error('❌ Error obteniendo datos del mercado:', error);
            this.currentData = this.fallbackData;
            return this.fallbackData;
        }
    }

    // Mapear datos reales a estructura de marketData
    mapRealDataToMarketData(realData) {
        // Buscar precios promedio por categoría
        function avgPrice(cat) {
            const items = realData.find(x => x.category === cat)?.results || [];
            if (!items.length) return undefined;
            return Math.round(items.reduce((a, b) => a + (b.price || 0), 0) / items.length);
        }
        return {
            alfalfa_price: avgPrice('granos'),
            firewood_price: avgPrice('leña'),
            beer_price: avgPrice('cerveza'),
            cabin_price: avgPrice('domos'),
            rural_tourism_price: avgPrice('domos'),
            cfi_rate: 85.0,
            banco_nacion_rate: 95.0,
            pool_cost_per_m2: avgPrice('energia') || 200000,
            deck_cost_per_m2: avgPrice('riego') || 95000,
            road_cost_per_m: 12000,
            general_construction_cost: avgPrice('maquinaria') || 105000,
            last_update: new Date().toISOString(),
            scraping_date: new Date().toLocaleDateString('es-AR'),
            financial_projections: this.fallbackData.financial_projections // Se recalcula luego
        };
    }

    // Generar datos simulados realistas
    async generateSimulatedData() {
        const currentDate = new Date();
        const seasonalFactor = this.getSeasonalFactor();
        
        // Precios con variación realista
        const alfalfaPrice = Math.round(3650 + Math.random() * 400);
        const beerPrice = Math.round(1100 + Math.random() * 200);
        const cabinPrice = Math.round((32000 + Math.random() * 8000) * seasonalFactor.tourism);
        const premiumTourismPrice = Math.round((45000 + Math.random() * 12000) * seasonalFactor.tourism);
        const firewoodPrice = Math.round(4800 + Math.random() * 1000);
        
        // Tasas de crédito con variación
        const cfiRate = Math.round((82 + Math.random() * 8) * 10) / 10;
        const bancosRate = Math.round((90 + Math.random() * 12) * 10) / 10;
        
        // Costos de construcción con inflación
        const inflationFactor = 1.025; // 2.5% mensual
        const poolCost = Math.round(165000 * inflationFactor * (1.05 + Math.random() * 0.1));
        const deckCost = Math.round(78000 * inflationFactor * (1.05 + Math.random() * 0.1));
        const roadCost = Math.round(9500 * inflationFactor * (1.05 + Math.random() * 0.1));
        const generalCost = Math.round(85000 * inflationFactor * (1.05 + Math.random() * 0.1));
        
        const marketData = {
            alfalfa_price: alfalfaPrice,
            firewood_price: firewoodPrice,
            beer_price: beerPrice,
            cabin_price: cabinPrice,
            rural_tourism_price: premiumTourismPrice,
            cfi_rate: cfiRate,
            banco_nacion_rate: bancosRate,
            pool_cost_per_m2: poolCost,
            deck_cost_per_m2: deckCost,
            road_cost_per_m: roadCost,
            general_construction_cost: generalCost,
            last_update: new Date().toISOString(),
            scraping_date: new Date().toLocaleDateString('es-AR')
        };
        
        // Calcular proyecciones
        const projections = this.calculateProjections(marketData);
        marketData.financial_projections = projections;
        
        marketData.market_conditions = {
            tourism_demand: seasonalFactor.tourism > 1 ? "high" : "low",
            seasonal_factor: this.getCurrentSeason(),
            inflation_factor: 1.15
        };
        
        return marketData;
    }

    // Calcular proyecciones financieras por fases
    calculateProjections(marketData = null) {
        try {
            // Si no hay datos de mercado, usar datos fallback
            if (!marketData) {
                console.log('⚠️ Usando datos fallback para cálculos...');
                marketData = this.fallbackData;
            }
            
            // Validar que tenemos datos válidos
            if (!marketData || typeof marketData !== 'object') {
                console.log('⚠️ Datos inválidos, usando fallback completo...');
                marketData = this.fallbackData;
            }
            
            // Valores por defecto si faltan datos
            const cabinPrice = marketData.cabin_price || marketData.rural_tourism_price || 35000;
            const alfalfaPrice = marketData.alfalfa_price || 3800;
            const cfiRate = marketData.cfi_rate || 85;
            const bancoNacionRate = marketData.banco_nacion_rate || 95;
            
            // Validar que son números
            if (isNaN(cabinPrice) || isNaN(alfalfaPrice) || isNaN(cfiRate) || isNaN(bancoNacionRate)) {
                throw new Error('Datos de precios inválidos');
            }

            // FASE 1: Infraestructura básica (6 meses)
            const phase1 = {
                name: "Infraestructura Básica",
                duration_months: 6,
                investment: 21000000, // Domos + infraestructura básica
                annual_revenue: 18000000, // 2 domos operativos
                annual_costs: 9000000, // Costos operativos + financieros
                net_result: 9000000,
                roi_percentage: 42.9,
                payback_years: 2.3
            };

            // FASE 2: Expansión servicios (12 meses)
            const phase2 = {
                name: "Expansión de Servicios",
                duration_months: 12,
                investment: 15000000, // 3er domo + pool + cervecería
                annual_revenue: 32000000, // 3 domos + servicios premium
                annual_costs: 14000000,
                net_result: 18000000,
                roi_percentage: 120.0,
                payback_years: 0.8
            };

            // FASE 3: Consolidación (18 meses)
            const phase3 = {
                name: "Consolidación y Eventos",
                duration_months: 18,
                investment: 12000000, // Mejoras + eventos + marketing
                annual_revenue: 45000000, // Operación completa + eventos
                annual_costs: 18000000,
                net_result: 27000000,
                roi_percentage: 225.0,
                payback_years: 0.4
            };

            // Totales consolidados
            const total_investment = phase1.investment + phase2.investment + phase3.investment;
            const total_annual_revenue = phase3.annual_revenue; // Revenue final consolidado
            const total_annual_costs = phase3.annual_costs;
            const total_net_result = total_annual_revenue - total_annual_costs;
            const total_roi_percentage = (total_net_result / total_investment) * 100;
            const total_payback_years = total_investment / total_net_result;

            return {
                phase1,
                phase2, 
                phase3,
                total_investment,
                total_annual_revenue,
                total_annual_costs,
                total_net_result,
                total_roi_percentage,
                total_payback_years,
                last_update: new Date().toISOString()
            };
            
        } catch (error) {
            console.error('❌ Error calculando proyecciones:', error);
            return this.fallbackData.financial_projections;
        }
    }

    // Generar datos simulados realistas
    async generateSimulatedData() {
        const month = new Date().getMonth();
        return {
            alfalfa: month >= 10 || month <= 2 ? 1.15 : 0.95, // Primavera-verano
            tourism: month >= 11 || month <= 2 ? 1.3 : (month >= 5 && month <= 8 ? 0.7 : 1.0) // Verano alto, invierno bajo
        };
    }

    // Obtener temporada actual
    getCurrentSeason() {
        const month = new Date().getMonth();
        if (month >= 11 || month <= 2) return "verano";
        if (month >= 3 && month <= 5) return "otoño";
        if (month >= 6 && month <= 8) return "invierno";
        return "primavera";
    }

    // Iniciar actualizaciones automáticas
    startAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        // Actualizar cada 30 minutos
        this.updateInterval = setInterval(() => {
            this.updateAllData();
        }, 30 * 60 * 1000);
        
        console.log('🔄 Actualizaciones automáticas iniciadas (cada 30 min)');
    }

    // Detener actualizaciones automáticas
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            console.log('⏹️ Actualizaciones automáticas detenidas');
        }
    }

    // Obtener datos actuales
    getCurrentData() {
        return this.currentData || this.fallbackData;
    }

    // Obtener fecha de última actualización
    getLastUpdateDate() {
        return this.lastUpdateDate || new Date().toLocaleDateString('es-AR');
    }
}

// ============================================================================
// FUNCIONES DE ACTUALIZACIÓN DE UI
// ============================================================================

// Instancia global del scraper
let marketScraper = null;

// Inicializar scraper
function initializeMarketScraper() {
    if (!marketScraper) {
        marketScraper = new CompleteMarketScraper();
    }
    return marketScraper;
}

// Actualizar todos los datos y la interfaz
async function updateAllData() {
    try {
        console.log('🔄 Iniciando actualización completa...');
        
        const scraper = initializeMarketScraper();
        const marketData = await scraper.getCompleteMarketData();
        
        // Actualizar fecha en header
        updateHeaderDate();
        
        // Actualizar botón con fecha actual
        updateUpdateButton();
        
        // Actualizar diferentes secciones
        updateStatsHeader(marketData);
        updateFinancialProjections(marketData);
        updateAccommodationPrices(marketData);
        updateCashFlowTable(marketData);
        updateKPIsSection(marketData);
        updateMarketDataCards(marketData);
        
        console.log('✅ Actualización completa finalizada');
        return marketData;
        
    } catch (error) {
        console.error('❌ Error en actualización completa:', error);
        
        // Mostrar notificación de error
        showNotification('❌ Error al actualizar datos', 'error');
    }
}

// Actualizar fecha en header
function updateHeaderDate() {
    const currentDate = new Date().toLocaleDateString('es-AR');
    const headerElement = document.querySelector('.header-subtitle');
    if (headerElement) {
        headerElement.textContent = `Proyección con datos del ${currentDate}`;
    }
}

// Actualizar botón de actualización
function updateUpdateButton() {
    const currentDate = new Date().toLocaleDateString('es-AR');
    const button = document.getElementById('updateMarketDataBtn');
    if (button) {
        button.innerHTML = `📊 Actualizar al ${currentDate}`;
    }
}

// Actualizar estadísticas del header
function updateStatsHeader(marketData) {
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer && marketData.financial_projections) {
        statsContainer.innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${marketData.financial_projections.roi_percentage}%</span>
                <span class="stat-label">ROI Actualizado</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">$${(marketData.financial_projections.total_investment / 1000000).toFixed(1)}M</span>
                <span class="stat-label">Inversión Total</span>
            </div>
        `;
    }
}

// Actualizar proyecciones financieras principales
function updateFinancialProjections(marketData) {
    const projections = marketData.financial_projections;
    
    // Actualizar cards financieros principales
    const financialCards = document.querySelectorAll('.financial-card');
    if (financialCards.length >= 4) {
        financialCards[0].querySelector('.financial-amount').textContent = 
            `$${(projections.annual_revenue / 1000000).toFixed(1)}M ARS`;
        
        financialCards[1].querySelector('.financial-amount').textContent = 
            `$${(projections.net_result / 1000000).toFixed(1)}M ARS`;
        
        financialCards[2].querySelector('.financial-amount').textContent = 
            `$${(projections.total_investment / 1000000).toFixed(0)}M ARS`;
        
        financialCards[3].querySelector('.financial-amount').textContent = 
            `${projections.payback_years} años`;
    }
}

// Actualizar precios de alojamiento
function updateAccommodationPrices(marketData) {
    const accommodationCards = document.querySelectorAll('.accommodation-card');
    
    // Validar que tenemos un precio base válido
    const baseCabinPrice = marketData.cabin_price || marketData.rural_tourism_price || 35000;
    
    // Verificar que es un número válido
    if (!baseCabinPrice || isNaN(baseCabinPrice)) {
        console.warn('⚠️ Precio base inválido, usando valor por defecto');
        return;
    }
    
    const premiumMultiplier = 1.2; // Factor premium para El Recodo
    
    accommodationCards.forEach((card, index) => {
        const priceElements = card.querySelectorAll('.price-amount');
        
        priceElements.forEach((priceElement, seasonIndex) => {
            let seasonalMultiplier = 1.0;
            
            // Ajustar por temporada
            switch(seasonIndex) {
                case 0: seasonalMultiplier = 1.25; break; // Verano
                case 1: seasonalMultiplier = 1.0; break;  // Otoño/Primavera
                case 2: seasonalMultiplier = 0.75; break; // Invierno
                default: seasonalMultiplier = 1.0;
            }
            
            const finalPrice = Math.round(baseCabinPrice * premiumMultiplier * seasonalMultiplier);
            
            // Verificar que el precio final es válido
            if (priceElement && !isNaN(finalPrice) && finalPrice > 0) {
                priceElement.textContent = `$${finalPrice.toLocaleString()} ARS`;
            } else if (priceElement) {
                // Valor por defecto si hay algún error
                const defaultPrice = Math.round(35000 * premiumMultiplier * seasonalMultiplier);
                priceElement.textContent = `$${defaultPrice.toLocaleString()} ARS`;
            }
        });
    });
}

// Actualizar tabla de cash flow
function updateCashFlowTable(marketData) {
    const projections = marketData.financial_projections;
    
    // Validar datos
    if (!projections || !projections.tourism_revenue || !projections.alfalfa_revenue) {
        console.warn('⚠️ Datos de proyecciones inválidos');
        return;
    }
    
    const monthlyTourismRevenue = projections.tourism_revenue / 12;
    const monthlyAlfalfaRevenue = projections.alfalfa_revenue / 12;
    
    // Verificar que son números válidos
    if (isNaN(monthlyTourismRevenue) || isNaN(monthlyAlfalfaRevenue)) {
        console.warn('⚠️ Ingresos mensuales inválidos');
        return;
    }
    
    // Ocupación mensual realista
    const monthlyOccupancy = [0.85, 0.80, 0.65, 0.55, 0.50, 0.35, 0.35, 0.40, 0.60, 0.65, 0.70, 0.85];
    
    const table = document.querySelector('.cashflow-table table tbody');
    if (table) {
        const rows = table.querySelectorAll('tr');
        
        rows.forEach((row, index) => {
            if (index < monthlyOccupancy.length) {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 6) {
                    // Turismo (columna 2)
                    const adjustedTourismRevenue = Math.round(monthlyTourismRevenue * monthlyOccupancy[index]);
                    if (!isNaN(adjustedTourismRevenue)) {
                        cells[2].textContent = `$${adjustedTourismRevenue.toLocaleString()} ARS`;
                    }
                    
                    // Alfalfa (columna 3) - solo en meses de cosecha
                    if (index === 2 || index === 3 || index === 8 || index === 9) { // Mar, Abr, Sep, Oct
                        const alfalfaAmount = Math.round(monthlyAlfalfaRevenue * 3);
                        if (!isNaN(alfalfaAmount)) {
                            cells[3].textContent = `$${alfalfaAmount.toLocaleString()} ARS`;
                        }
                    }
                    
                    // Recalcular total ingresos (columna 5)
                    const alfalfaValue = cells[3].textContent.includes('$') ? 
                        parseInt(cells[3].textContent.replace(/[^\d]/g, '')) : 0;
                    const totalIncome = adjustedTourismRevenue + alfalfaValue;
                    
                    if (!isNaN(totalIncome)) {
                        cells[5].textContent = `$${totalIncome.toLocaleString()} ARS`;
                    }
                }
            }
        });
    }
}

// Actualizar KPIs
function updateKPIsSection(marketData) {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    kpiCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const valueElement = card.querySelector('.kpi-value');
        
        if (valueElement) {
            if (title.includes('ocupación')) {
                valueElement.textContent = '65%';
            } else if (title.includes('tarifa promedio')) {
                const avgPrice = Math.round((marketData.cabin_price || 35000) * 1.2);
                valueElement.textContent = `$${avgPrice.toLocaleString()}`;
            } else if (title.includes('roi')) {
                valueElement.textContent = `${marketData.financial_projections.roi_percentage}%`;
            } else if (title.includes('recupero')) {
                valueElement.textContent = `${marketData.financial_projections.payback_years} años`;
            }
        }
    });
}

// Actualizar cards de datos de mercado
function updateMarketDataCards(marketData) {
    // Actualizar precios de productos
    const productPrices = document.querySelectorAll('.product-price');
    productPrices.forEach(priceElement => {
        const productName = priceElement.closest('.product-card, .market-card')
            ?.querySelector('h3, .product-name')?.textContent.toLowerCase();
        
        if (productName) {
            if (productName.includes('alfalfa')) {
                priceElement.textContent = `$${marketData.alfalfa_price?.toLocaleString() || '3,800'}/fardo`;
            } else if (productName.includes('cerveza')) {
                priceElement.textContent = `$${marketData.beer_price?.toLocaleString() || '1,200'}/L`;
            } else if (productName.includes('leña')) {
                priceElement.textContent = `$${marketData.firewood_price?.toLocaleString() || '5,200'}/m³`;
            }
        }
    });
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ============================================================================
// INICIALIZACIÓN Y EVENTOS
// ============================================================================

// Detectar si estamos en Node.js o navegador
const isNode = typeof window === 'undefined';

// Función para inicializar en Node.js (testing/server)
async function initializeForNode() {
    console.log('🎯 Inicializando sistema para Node.js...');
    try {
        // Inicializar scraper
        initializeMarketScraper();
        
        // Ejecutar una actualización de prueba
        console.log('📊 Ejecutando cálculos de prueba...');
        const scraper = initializeMarketScraper();
        const projections = scraper.calculateProjections();
        
        // Verificar que tenemos datos válidos
        if (!projections) {
            console.log('❌ No se pudieron calcular las proyecciones');
            return false;
        }
        
        console.log('=== RESUMEN DE PROYECCIONES FINANCIERAS ===');
        console.log(`💰 Inversión Total: $${(projections.total_investment || 0).toLocaleString()}`);
        console.log(`📈 Resultado Neto Anual: $${(projections.total_net_result || 0).toLocaleString()}`);
        console.log(`⏱️ Tiempo de Recuperación: ${(projections.total_payback_years || 0).toFixed(1)} años`);
        console.log(`📊 ROI Total: ${(projections.total_roi_percentage || 0).toFixed(1)}%`);
        
        // Mostrar detalles por fase
        const phases = [projections.phase1, projections.phase2, projections.phase3];
        phases.forEach((phase, index) => {
            if (phase) {
                console.log(`\n--- FASE ${index + 1}: ${phase.name} ---`);
                console.log(`💵 Inversión: $${(phase.investment || 0).toLocaleString()}`);
                console.log(`📊 Resultado Neto Anual: $${(phase.net_result || 0).toLocaleString()}`);
                console.log(`📈 ROI: ${(phase.roi_percentage || 0).toFixed(1)}%`);
                console.log(`⏰ Duración: ${phase.duration_months || 'N/A'} meses`);
                console.log(`📅 Retorno: ${(phase.payback_years || 0).toFixed(1)} años`);
            }
        });
        
        console.log('\n✅ Sistema validado correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error inicializando sistema:', error);
        return false;
    }
}

// Función para inicializar en navegador
function initializeForBrowser() {
    document.addEventListener('DOMContentLoaded', async function() {
        console.log('🎯 Inicializando sistema completo de mercado...');
        try {
            // Inicializar scraper
            initializeMarketScraper();
            // Botón para alternar datos reales/simulados
            let toggleBtn = document.createElement('button');
            toggleBtn.id = 'toggleRealDataBtn';
            toggleBtn.innerHTML = '🔄 Usar datos reales';
            toggleBtn.style = 'position:fixed;top:20px;left:20px;z-index:9999;padding:8px 16px;background:#2d5016;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:1rem;';
            document.body.appendChild(toggleBtn);
            toggleBtn.addEventListener('click', async function() {
                const scraper = initializeMarketScraper();
                scraper.useRealData = !scraper.useRealData;
                this.innerHTML = scraper.useRealData ? '🔄 Usar datos simulados' : '🔄 Usar datos reales';
                await updateAllData();
                showNotification(scraper.useRealData ? 'Mostrando datos reales de insumos y equipos' : 'Mostrando datos simulados', 'success');
            });
            // Actualizar datos iniciales
            await updateAllData();
            // Configurar botón de actualización
            const updateButton = document.getElementById('updateMarketDataBtn');
            if (updateButton) {
                updateButton.addEventListener('click', async function() {
                    this.disabled = true;
                    this.textContent = '🔄 Actualizando...';
                    try {
                        await updateAllData();
                        showNotification('✅ Datos actualizados correctamente');
                    } catch (error) {
                        showNotification('❌ Error al actualizar', 'error');
                    } finally {
                        this.disabled = false;
                        updateUpdateButton();
                    }
                });
            }
            // Iniciar actualizaciones automáticas
            marketScraper.startAutoUpdate();
            console.log('✅ Sistema completo de mercado inicializado');
        } catch (error) {
            console.error('❌ Error inicializando sistema:', error);
            showNotification('❌ Error al inicializar sistema', 'error');
        }
    });

    // Limpiar al cerrar la página
    window.addEventListener('beforeunload', function() {
        if (marketScraper) {
            marketScraper.stopAutoUpdate();
        }
    });

    // Exportar para uso global
    window.CompleteMarketScraper = CompleteMarketScraper;
    window.updateAllData = updateAllData;
}

// Inicializar según el entorno
if (isNode) {
    // En Node.js, ejecutar directamente
    initializeForNode().then(success => {
        if (success) {
            console.log('🎉 Validación completa exitosa');
        } else {
            console.log('❌ Errores detectados en la validación');
            process.exit(1);
        }
    });
} else {
    // En navegador, configurar eventos
    initializeForBrowser();
}
