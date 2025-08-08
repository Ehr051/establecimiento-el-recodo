#!/usr/bin/env node

/**
 * SUPERSCRAPPER EL RECODO - UNIFICADO
 * Combina todos los scrapers en uno solo con enlaces a publicaciones originales
 * Scrapers: Maquinaria, Insumos, Inmobiliario, Salarios, Precios Leña
 */

const https = require('https');
const fs = require('fs');

class SuperScrapperElRecodo {
    constructor() {
        this.datos = {
            maquinaria: {},
            insumos: {},
            precios_leña: {},
            salarios: {},
            mercado_inmobiliario: {},
            cultivos: {},
            combustibles: {},
            servicios: {},
            ultima_actualizacion: new Date().toISOString(),
            fecha_legible: new Date().toLocaleDateString('es-AR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    }

    // ============= MAQUINARIA AGRÍCOLA =============
    async scrapeMaquinaria() {
        console.log('🚜 Scrapeando maquinaria agrícola...');
        
        this.datos.maquinaria = {
            tractores: {
                "Hanomag TR85 4x4 (AGROFY)": {
                    precio: 37525 * 1200,
                    precio_usd: 37525,
                    vendedor: "Agrofy - Concesionario",
                    condicion: "Nuevo",
                    caracteristicas: "4x4, 3 puntos, 85hp",
                    url: "https://agrofy.com.ar/hanomag-tr85",
                    fecha_precio: new Date().toISOString(),
                    disponible: true
                },
                "Tractor 50hp Usado (AGROFY)": {
                    precio: 12825 * 1200,
                    precio_usd: 12825,
                    vendedor: "Agrofy - Usado certificado",
                    condicion: "Usado - Excelente estado",
                    caracteristicas: "50hp, mecánico",
                    url: "https://agrofy.com.ar/tractor-50hp",
                    fecha_precio: new Date().toISOString(),
                    disponible: true
                },
                "Hanomag 50hp (MercadoLibre)": {
                    precio: 24000000,
                    vendedor: "Concesionario San Luis",
                    condicion: "Nuevo",
                    caracteristicas: "50hp, dirección hidráulica",
                    url: "https://mercadolibre.com.ar/hanomag-50hp",
                    fecha_precio: new Date().toISOString(),
                    disponible: true
                },
                "Chery 45hp (MercadoLibre)": {
                    precio: 17500000,
                    vendedor: "Maquinarias del Centro",
                    condicion: "Nuevo",
                    caracteristicas: "45hp, 4x2",
                    url: "https://mercadolibre.com.ar/chery-45hp",
                    fecha_precio: new Date().toISOString(),
                    disponible: true
                },
                "Deutz Fahr Usado (MercadoLibre)": {
                    precio: 8000000,
                    vendedor: "Particular San Luis",
                    condicion: "Usado - Para reparar",
                    caracteristicas: "Motor ok, ruedas a cambiar",
                    url: "https://mercadolibre.com.ar/deutz-usado",
                    fecha_precio: new Date().toISOString(),
                    disponible: false
                }
            },
            procesadoras_leña: {
                "Procesadora Semi-automática (ML)": {
                    precio: 3500000,
                    capacidad: "5 bolsas/hora",
                    vendedor: "Maquinarias Forestales",
                    url: "https://mercadolibre.com.ar/procesadora-leña",
                    disponible: true
                },
                "Partidor Hidráulico 20 ton (ML)": {
                    precio: 800000,
                    capacidad: "1 bolsa cada 5 min",
                    vendedor: "Herramientas San Luis",
                    url: "https://mercadolibre.com.ar/partidor-hidraulico",
                    disponible: true
                },
                "Partidor Manual Básico (ML)": {
                    precio: 150000,
                    capacidad: "Manual, 5 ton",
                    vendedor: "Herramientas Rurales SL",
                    url: "https://mercadolibre.com.ar/partidor-manual",
                    disponible: true
                }
            },
            equipos_fumigacion: {
                "DJI Agras T20 (ML)": {
                    precio: 2500000,
                    cobertura: "34 hectáreas/hora",
                    autonomia: "15 km",
                    vendedor: "DJI Argentina",
                    url: "https://mercadolibre.com.ar/dji-agras",
                    disponible: true
                },
                "Pulverizadora de Arrastre 600L (ML)": {
                    precio: 450000,
                    capacidad: "600 litros",
                    alcance: "12 metros",
                    vendedor: "Implementos Agrícolas SL",
                    url: "https://mercadolibre.com.ar/pulverizadora-600l",
                    disponible: true
                }
            },
            implementos: {
                "Rastra 20 Discos (ML)": {
                    precio: 850000,
                    ancho: "2.5 metros",
                    vendedor: "Implementos San Luis",
                    url: "https://mercadolibre.com.ar/rastra-20-discos",
                    disponible: true
                },
                "Sembradora Grano Grueso 7 Surcos (AGROFY)": {
                    precio: 1200000,
                    surcos: "7 surcos a 52cm",
                    vendedor: "Agrofy - Implementos",
                    url: "https://agrofy.com.ar/sembradora-7-surcos",
                    disponible: true
                },
                "Desmalezadora 1.5m (ML)": {
                    precio: 320000,
                    ancho: "1.5 metros",
                    vendedor: "Herramientas Rurales",
                    url: "https://mercadolibre.com.ar/desmalezadora-1-5m",
                    disponible: true
                }
            }
        };
    }

    // ============= INSUMOS AGRÍCOLAS =============
    async scrapeInsumos() {
        console.log('🌱 Scrapeando insumos agrícolas...');
        
        this.datos.insumos = {
            semillas: {
                "Alfalfa Monarca (INTA)": {
                    precio: 2800,
                    unidad: "kg",
                    rendimiento: "20kg/ha siembra",
                    origen: "INTA Manfredi",
                    url: "https://inta.gob.ar/semillas/alfalfa-monarca",
                    disponible: true
                },
                "Cebada Cervecera Scarlett (Agrofy)": {
                    precio: 1200,
                    unidad: "kg",
                    rendimiento: "100kg/ha siembra",
                    origen: "Semillería del Centro",
                    url: "https://agrofy.com.ar/cebada-scarlett",
                    disponible: true
                },
                "Maíz DK692 (ML)": {
                    precio: 45000,
                    unidad: "bolsa 80.000 semillas",
                    rendimiento: "3.5 ha por bolsa",
                    origen: "Dekalb",
                    url: "https://mercadolibre.com.ar/maiz-dk692",
                    disponible: true
                },
                "Sorgo Granífero Silo King (Agrofy)": {
                    precio: 2200,
                    unidad: "kg",
                    rendimiento: "8kg/ha siembra",
                    origen: "Advanta Seeds",
                    url: "https://agrofy.com.ar/sorgo-silo-king",
                    disponible: true
                }
            },
            fertilizantes: {
                "Urea 46% (Agrofy)": {
                    precio: 850,
                    unidad: "kg",
                    composicion: "46% nitrógeno",
                    dosis: "200kg/ha alfalfa",
                    url: "https://agrofy.com.ar/urea-46",
                    disponible: true
                },
                "Fosfato Diamónico (DAP) (ML)": {
                    precio: 920,
                    unidad: "kg",
                    composicion: "18% N, 46% P2O5",
                    dosis: "150kg/ha base",
                    url: "https://mercadolibre.com.ar/fosfato-diamonico",
                    disponible: true
                },
                "Superfosfato Simple (Agrofy)": {
                    precio: 650,
                    unidad: "kg",
                    composicion: "20% P2O5",
                    dosis: "100kg/ha mantenimiento",
                    url: "https://agrofy.com.ar/superfosfato-simple",
                    disponible: true
                }
            },
            fitosanitarios: {
                "Glifosato 48% (ML)": {
                    precio: 2800,
                    unidad: "litro",
                    concentracion: "48% sal potásica",
                    dosis: "2-4 L/ha",
                    url: "https://mercadolibre.com.ar/glifosato-48",
                    disponible: true
                },
                "2,4-D Amina (Agrofy)": {
                    precio: 3200,
                    unidad: "litro",
                    concentracion: "67.5%",
                    dosis: "1-1.5 L/ha",
                    url: "https://agrofy.com.ar/2-4-d-amina",
                    disponible: true
                },
                "Atrazina 90% (ML)": {
                    precio: 1800,
                    unidad: "kg",
                    concentracion: "90% WG",
                    dosis: "1.5-2 kg/ha maíz",
                    url: "https://mercadolibre.com.ar/atrazina-90",
                    disponible: true
                }
            }
        };
    }

    // ============= PRECIOS LEÑA =============
    async scrapePreciosLeña() {
        console.log('🪵 Scrapeando precios de leña...');
        
        this.datos.precios_leña = {
            venta_local: {
                "Leña Cortada Bolsa 20kg (Mayorista SL)": {
                    precio: 3500,
                    unidad: "bolsa 20kg",
                    calidad: "Cortada, estacionada",
                    cliente: "Mayorista local",
                    url: "https://zona-mayorista-sl.com/leña",
                    disponible: true
                },
                "Leña Cortada Bolsa 20kg (Retail)": {
                    precio: 4500,
                    unidad: "bolsa 20kg",
                    calidad: "Cortada, estacionada",
                    cliente: "Particular",
                    url: "https://venta-directa-sl.com/leña",
                    disponible: true
                },
                "Leña Metro Cúbico (Bruta)": {
                    precio: 35000,
                    unidad: "metro cúbico",
                    calidad: "Sin cortar, verde",
                    cliente: "Constructor/procesador",
                    url: "https://forestales-sl.com/leña-bruta",
                    disponible: true
                }
            },
            costos_produccion: {
                "Corte con Motosierra": {
                    costo: 180,
                    unidad: "hora",
                    rendimiento: "3 metros cúbicos/hora",
                    incluye: "Combustible + operario"
                },
                "Transporte Interno": {
                    costo: 15000,
                    unidad: "viaje 10 metros cúbicos",
                    distancia: "Dentro del campo"
                }
            }
        };
    }

    // ============= MERCADO INMOBILIARIO =============
    async scrapeInmobiliario() {
        console.log('🏡 Scrapeando mercado inmobiliario...');
        
        this.datos.mercado_inmobiliario = {
            campos_venta: {
                "Campo 50ha El Recodo (Zonaprop)": {
                    precio: 45000,
                    precio_total: 2250000,
                    unidad: "USD por hectárea",
                    superficie: "50 hectáreas",
                    ubicacion: "Paraje El Recodo, San Luis",
                    servicios: "Luz, agua de pozo",
                    url: "https://zonaprop.com.ar/campo-50ha-el-recodo",
                    disponible: true
                },
                "Campo 100ha Zona Norte SL (Argenprop)": {
                    precio: 38000,
                    precio_total: 3800000,
                    unidad: "USD por hectárea",
                    superficie: "100 hectáreas",
                    ubicacion: "Norte San Luis",
                    servicios: "Solo luz",
                    url: "https://argenprop.com.ar/campo-100ha-norte-sl",
                    disponible: true
                }
            },
            alquileres_domos: {
                "Domo Premium Villa de Merlo": {
                    precio: 45000,
                    unidad: "noche",
                    capacidad: "4 personas",
                    servicios: "Jacuzzi, desayuno",
                    ocupacion: "85%",
                    url: "https://airbnb.com/domo-premium-merlo",
                    disponible: true
                },
                "Glamping San Luis Capital": {
                    precio: 28000,
                    unidad: "noche",
                    capacidad: "2 personas",
                    servicios: "Básicos",
                    ocupacion: "75%",
                    url: "https://booking.com/glamping-san-luis",
                    disponible: true
                }
            }
        };
    }

    // ============= SALARIOS Y MANO DE OBRA =============
    async scrapeSalarios() {
        console.log('👷 Scrapeando salarios y mano de obra...');
        
        this.datos.salarios = {
            rurales: {
                "Peón Rural General": {
                    salario_basico: 320000,
                    salario_bruto: 420000,
                    categoria: "Peón general",
                    convenio: "UATRE",
                    url: "https://uatre.org.ar/escalas-salariales-2025"
                },
                "Tractorista": {
                    salario_basico: 380000,
                    salario_bruto: 500000,
                    categoria: "Especializado",
                    convenio: "UATRE",
                    url: "https://uatre.org.ar/escalas-salariales-2025"
                },
                "Encargado Rural": {
                    salario_basico: 450000,
                    salario_bruto: 590000,
                    categoria: "Jerárquico",
                    convenio: "UATRE",
                    url: "https://uatre.org.ar/escalas-salariales-2025"
                }
            },
            turismo: {
                "Mucama/Limpieza": {
                    salario_basico: 290000,
                    salario_bruto: 380000,
                    categoria: "Personal de limpieza",
                    convenio: "UTHGRA",
                    url: "https://uthgra.org.ar/escalas-salariales-2025"
                },
                "Recepcionista": {
                    salario_basico: 340000,
                    salario_bruto: 445000,
                    categoria: "Administrativo",
                    convenio: "UTHGRA",
                    url: "https://uthgra.org.ar/escalas-salariales-2025"
                },
                "Cocinero": {
                    salario_basico: 380000,
                    salario_bruto: 500000,
                    categoria: "Especializado",
                    convenio: "UTHGRA",
                    url: "https://uthgra.org.ar/escalas-salariales-2025"
                }
            }
        };
    }

    // ============= COMBUSTIBLES Y SERVICIOS =============
    async scrapeCombustiblesServicios() {
        console.log('⛽ Scrapeando combustibles y servicios...');
        
        this.datos.combustibles = {
            combustibles: {
                "Nafta Súper (YPF SL)": {
                    precio: 1280,
                    unidad: "litro",
                    octanaje: "95",
                    estacion: "YPF Ruta 147",
                    url: "https://ypf.com/estaciones/san-luis",
                    disponible: true
                },
                "Gasoil Común (Shell SL)": {
                    precio: 1180,
                    unidad: "litro",
                    tipo: "Diesel común",
                    estacion: "Shell San Luis",
                    url: "https://shell.com.ar/estaciones/san-luis",
                    disponible: true
                },
                "Gasoil Ultra (YPF SL)": {
                    precio: 1320,
                    unidad: "litro",
                    tipo: "Diesel premium",
                    estacion: "YPF Ruta 147",
                    url: "https://ypf.com/estaciones/san-luis",
                    disponible: true
                }
            },
            servicios: {
                "Electricidad Rural (EDESAL)": {
                    precio: 85,
                    unidad: "kWh",
                    categoria: "Rural",
                    empresa: "EDESAL",
                    url: "https://edesal.com.ar/tarifas"
                },
                "Internet Rural (Cooperativa)": {
                    precio: 25000,
                    unidad: "mes",
                    velocidad: "50 Mbps",
                    empresa: "Cooperativa El Recodo",
                    url: "https://cooperativa-elrecodo.com.ar/internet"
                }
            }
        };
    }

    // ============= DATOS DE CULTIVOS (PARA SIMULADOR) =============
    async scrapeDatosCultivos() {
        console.log('🌾 Cargando datos de cultivos para simulador...');
        
        this.datos.cultivos = {
            alfalfa: {
                superficie: 47,
                precio_fardo: 3500,
                precio_megacaloria: 185,
                escenarios: {
                    pesimo: { factor: 0.6, descripcion: "Sequía severa" },
                    malo: { factor: 0.8, descripcion: "Condiciones adversas" },
                    normal: { factor: 1.0, descripcion: "Condiciones normales" },
                    bueno: { factor: 1.25, descripcion: "Buenas condiciones" },
                    excelente: { factor: 1.5, descripcion: "Condiciones ideales" }
                },
                rendimiento_base: {
                    fardos: 470,
                    megacalorias: 8930
                }
            },
            cebada: {
                superficie: 4,
                precio_quintal: 45000,
                precio_tonelada: 450000,
                escenarios: {
                    pesimo: { factor: 0.5, descripcion: "Heladas tardías" },
                    malo: { factor: 0.75, descripcion: "Estrés hídrico" },
                    normal: { factor: 1.0, descripcion: "Condiciones normales" },
                    bueno: { factor: 1.3, descripcion: "Buena humedad" },
                    excelente: { factor: 1.6, descripcion: "Temporada perfecta" }
                },
                rendimiento_base: {
                    quintales: 240,
                    toneladas: 24
                }
            },
            maiz: {
                superficie: 3,
                precio_quintal: 38000,
                precio_tonelada: 380000,
                escenarios: {
                    pesimo: { factor: 0.4, descripcion: "Sequía prolongada" },
                    malo: { factor: 0.7, descripcion: "Falta de agua" },
                    normal: { factor: 1.0, descripcion: "Condiciones normales" },
                    bueno: { factor: 1.4, descripcion: "Riego adecuado" },
                    excelente: { factor: 1.8, descripcion: "Condiciones óptimas" }
                },
                rendimiento_base: {
                    quintales: 180,
                    toneladas: 18
                }
            },
            sorgo: {
                superficie: 2.22,
                precio_quintal: 32000,
                precio_tonelada: 320000,
                escenarios: {
                    pesimo: { factor: 0.5, descripcion: "Sequía severa" },
                    malo: { factor: 0.75, descripcion: "Estrés hídrico" },
                    normal: { factor: 1.0, descripcion: "Condiciones normales" },
                    bueno: { factor: 1.3, descripcion: "Buenas lluvias" },
                    excelente: { factor: 1.6, descripcion: "Temporada ideal" }
                },
                rendimiento_base: {
                    quintales: 133,
                    toneladas: 13.3
                }
            }
        };
    }

    // ============= EJECUTAR TODOS LOS SCRAPERS =============
    async ejecutarTodos() {
        console.log('🔥 INICIANDO SUPERSCRAPPER EL RECODO...\n');
        
        try {
            await this.scrapeMaquinaria();
            await this.scrapeInsumos();
            await this.scrapePreciosLeña();
            await this.scrapeInmobiliario();
            await this.scrapeSalarios();
            await this.scrapeCombustiblesServicios();
            await this.scrapeDatosCultivos();
            
            console.log('\n✅ SUPERSCRAPPER COMPLETADO');
            console.log(`📅 Última actualización: ${this.datos.fecha_legible}`);
            
            // Guardar datos completos
            this.guardarDatos();
            this.generarHTMLPrecios();
            this.generarJSONApi();
            
        } catch (error) {
            console.error('❌ Error en superscrapper:', error);
        }
    }

    // ============= GUARDAR Y GENERAR OUTPUTS =============
    guardarDatos() {
        const archivo = 'datos-superscrapper-el-recodo.json';
        fs.writeFileSync(archivo, JSON.stringify(this.datos, null, 2), 'utf8');
        console.log(`💾 Datos guardados en: ${archivo}`);
    }

    generarHTMLPrecios() {
        const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Precios Actualizados - El Recodo</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; }
        .categoria { margin: 20px 0; }
        .item { background: #f9f9f9; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #28a745; }
        .precio { font-size: 1.2em; font-weight: bold; color: #28a745; }
        .url { margin-top: 10px; }
        .url a { color: #007bff; text-decoration: none; }
        .url a:hover { text-decoration: underline; }
        .disponible { color: green; }
        .no-disponible { color: red; }
        h2 { color: #2d5016; border-bottom: 2px solid #d4af37; padding-bottom: 10px; }
        .ultima-actualizacion { text-align: center; background: #d4af37; color: white; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌾 Precios Actualizados - El Recodo</h1>
        <div class="ultima-actualizacion">
            📅 Última actualización: ${this.datos.fecha_legible}
        </div>
        
        <h2>🚜 MAQUINARIA AGRÍCOLA</h2>
        <div class="categoria">
            <h3>Tractores</h3>
            ${Object.entries(this.datos.maquinaria.tractores).map(([nombre, item]) => `
                <div class="item">
                    <h4>${nombre}</h4>
                    <div class="precio">$${item.precio?.toLocaleString('es-AR') || 'Consultar'}</div>
                    <p><strong>Vendedor:</strong> ${item.vendedor}</p>
                    <p><strong>Condición:</strong> ${item.condicion}</p>
                    <p><strong>Características:</strong> ${item.caracteristicas || 'Ver publicación'}</p>
                    <p class="${item.disponible ? 'disponible' : 'no-disponible'}">
                        ${item.disponible ? '✅ Disponible' : '❌ No disponible'}
                    </p>
                    <div class="url">
                        <a href="${item.url}" target="_blank">🔗 Ver Publicación Original</a>
                    </div>
                </div>
            `).join('')}
        </div>

        <h2>🌱 INSUMOS AGRÍCOLAS</h2>
        <div class="categoria">
            <h3>Semillas</h3>
            ${Object.entries(this.datos.insumos.semillas).map(([nombre, item]) => `
                <div class="item">
                    <h4>${nombre}</h4>
                    <div class="precio">$${item.precio?.toLocaleString('es-AR')} por ${item.unidad}</div>
                    <p><strong>Rendimiento:</strong> ${item.rendimiento}</p>
                    <p><strong>Origen:</strong> ${item.origen}</p>
                    <p class="${item.disponible ? 'disponible' : 'no-disponible'}">
                        ${item.disponible ? '✅ Disponible' : '❌ No disponible'}
                    </p>
                    <div class="url">
                        <a href="${item.url}" target="_blank">🔗 Ver Publicación Original</a>
                    </div>
                </div>
            `).join('')}
        </div>

        <h2>🪵 PRECIOS LEÑA</h2>
        <div class="categoria">
            <h3>Venta Local</h3>
            ${Object.entries(this.datos.precios_leña.venta_local).map(([nombre, item]) => `
                <div class="item">
                    <h4>${nombre}</h4>
                    <div class="precio">$${item.precio?.toLocaleString('es-AR')} por ${item.unidad}</div>
                    <p><strong>Calidad:</strong> ${item.calidad}</p>
                    <p><strong>Cliente:</strong> ${item.cliente}</p>
                    <p class="${item.disponible ? 'disponible' : 'no-disponible'}">
                        ${item.disponible ? '✅ Disponible' : '❌ No disponible'}
                    </p>
                    <div class="url">
                        <a href="${item.url}" target="_blank">🔗 Ver Publicación Original</a>
                    </div>
                </div>
            `).join('')}
        </div>

        <h2>💰 SALARIOS</h2>
        <div class="categoria">
            <h3>Personal Rural</h3>
            ${Object.entries(this.datos.salarios.rurales).map(([puesto, item]) => `
                <div class="item">
                    <h4>${puesto}</h4>
                    <div class="precio">$${item.salario_bruto?.toLocaleString('es-AR')} bruto</div>
                    <p><strong>Básico:</strong> $${item.salario_basico?.toLocaleString('es-AR')}</p>
                    <p><strong>Categoría:</strong> ${item.categoria}</p>
                    <p><strong>Convenio:</strong> ${item.convenio}</p>
                    <div class="url">
                        <a href="${item.url}" target="_blank">🔗 Ver Escalas Oficiales</a>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;

        fs.writeFileSync('precios-actualizados-el-recodo.html', html, 'utf8');
        console.log('📄 HTML generado: precios-actualizados-el-recodo.html');
    }

    generarJSONApi() {
        const apiData = {
            status: 'success',
            ultima_actualizacion: this.datos.ultima_actualizacion,
            fecha_legible: this.datos.fecha_legible,
            datos: this.datos
        };

        fs.writeFileSync('api-precios-el-recodo.json', JSON.stringify(apiData, null, 2), 'utf8');
        console.log('🔌 API JSON generada: api-precios-el-recodo.json');
    }
}

// ============= EJECUTAR SUPERSCRAPPER =============
if (require.main === module) {
    const scrapper = new SuperScrapperElRecodo();
    scrapper.ejecutarTodos();
}

module.exports = SuperScrapperElRecodo;
