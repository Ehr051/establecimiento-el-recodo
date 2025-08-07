#!/usr/bin/env node

/**
 * MODELO AUTOFINANCIABLE EL RECODO - COMENZANDO CON LEÑA
 * Sistema de reinversión progresiva con dividendos mínimos iniciales
 */

const fs = require('fs');

// ETAPA 0: AUTOFINANCIAMIENTO INICIAL CON LEÑA
const etapaLena = {
    descripcion: "Autofinanciamiento inicial mediante venta de leña",
    inversion_inicial_minima: 2500000, // $2.5 millones ARS
    conceptos_inversion: {
        "Motosierra profesional": 450000,
        "Tractor usado básico": 800000,
        "Remolque para leña": 320000,
        "Herramientas (hachas, cuñas, etc.)": 180000,
        "Reparación alambradas existentes": 650000,
        "Capital de trabajo inicial": 100000
    },
    
    // PRODUCCIÓN DE LEÑA - OBJETIVOS CLAROS
    objetivos_leña: {
        bolsas_mes_objetivo: 800, // bolsas de 20kg
        precio_bolsa_20kg: 1800, // $1.800 ARS por bolsa
        ingresos_mensuales_objetivo: 800 * 1800, // $1.440.000 ARS/mes
        ingresos_anuales_objetivo: 800 * 1800 * 12, // $17.280.000 ARS/año
        
        // COSTOS OPERATIVOS LEÑA
        costos_mensuales: {
            "Combustible motosierra": 85000,
            "Mantenimiento herramientas": 45000,
            "Combustible tractor": 120000,
            "Mano de obra (1 peón part-time)": 400000,
            "Total costos mensuales": 650000
        },
        
        margen_bruto_mensual: (800 * 1800) - 650000, // $790.000 ARS/mes
        margen_bruto_anual: ((800 * 1800) - 650000) * 12, // $9.480.000 ARS/año
        
        // RECUPERO INVERSIÓN INICIAL
        meses_recupero_inversion: Math.ceil(2500000 / ((800 * 1800) - 650000)), // 3.2 meses
        
        // BENEFICIOS ADICIONALES
        beneficios_adicionales: {
            "Apertura de picadas/cortafuegos": "Más superficie para pasturas",
            "Limpieza monte": "Mejor aprovechamiento del campo",
            "División lógica cuadros": "Manejo ganadero eficiente",
            "Nuevas alambradas": "Control total del ganado"
        }
    }
};

// CRONOGRAMA DE REINVERSIÓN (VALORES EN PESOS ARGENTINOS)
const cronogramaAutofinanciable = {
    "Año 1 - Fase Leña": {
        mes_1_3: {
            inversion: 2500000, // $2,5 millones ARS
            actividad: "Setup inicial leña + reparación alambradas",
            ingresos_acumulados: 0,
            resultado: -2500000
        },
        mes_4_12: {
            ingresos_leña: 790000 * 9, // 9 meses producción
            gastos_operativos: 650000 * 9,
            resultado_neto: (790000 - 650000) * 9, // $1.260.000 ARS
            dividendos_socios: 200000, // Mínimos: $200k ARS
            reinversion_disponible: 1060000 // $1.06 millones ARS
        },
        objetivo_ano_1: "Recuperar inversión inicial + generar capital para Etapa 1"
    },
    
    "Año 2 - Etapa 1 Turismo": {
        capital_inicial: 1060000, // De año anterior
        ingresos_leña_continuos: 790000 * 12, // $9.48 millones ARS
        inversion_club_house: 8500000, // $8,5 millones ARS
        financiamiento_necesario: 7440000, // $7.44 millones ARS (crédito)
        
        ingresos_turismo_6_meses: 4200000, // $4,2 millones ARS (1 domo, 6 meses)
        resultado_neto_combinado: 2180000, // $2.18 millones ARS
        dividendos_socios: 300000, // $300k ARS
        reinversion_disponible: 1880000 // $1.88 millones ARS
    },
    
    "Año 3 - Etapa 2 Expansión": {
        capital_acumulado: 1880000,
        ingresos_combinados: 15800000, // Leña + Turismo (2 domos)
        inversion_domo_2_cerveceria: 12000000, // $12 millones ARS
        financiamiento_adicional: 10120000, // $10.12 millones ARS
        
        resultado_neto: 4500000, // $4,5 millones ARS
        dividendos_socios: 800000, // $800k ARS
        reinversion_disponible: 3700000 // $3.7 millones ARS
    }
};

// OBJETIVOS KPI CLAROS POR ETAPA
const kpis_por_etapa = {
    "Etapa 0 - Leña (Meses 1-12)": {
        "Objetivo bolsas/mes": 800,
        "Precio objetivo bolsa": "$ 1.800 ARS",
        "Ingresos mensuales meta": "$ 1.440.000 ARS",
        "Margen bruto mensual": "$ 790.000 ARS",
        "Recupero inversión": "3,2 meses",
        "Capital para Etapa 1": "$ 1.060.000 ARS"
    },
    
    "Etapa 1 - Club House (Meses 13-18)": {
        "Inversión total": "$ 8.500.000 ARS",
        "Financiamiento requerido": "$ 7.440.000 ARS", 
        "Ingresos turismo objetivo": "$ 4.200.000 ARS (6 meses)",
        "Ingresos leña continuos": "$ 9.480.000 ARS/año",
        "Recupero etapa": "18 meses",
        "Capital para Etapa 2": "$ 1.880.000 ARS"
    },
    
    "Etapa 2 - Expansión (Meses 19-30)": {
        "Inversión total": "$ 12.000.000 ARS",
        "Financiamiento requerido": "$ 10.120.000 ARS",
        "Ingresos combinados": "$ 15.800.000 ARS/año",
        "Margen neto objetivo": "$ 4.500.000 ARS/año",
        "Dividendos socios": "$ 800.000 ARS/año",
        "Reinversión": "$ 3.700.000 ARS/año"
    }
};

// NUEVAS ALAMBRADAS Y DIVISIÓN DE CUADROS
const plan_alambradas = {
    descripcion: "División lógica del campo para manejo eficiente",
    
    cuadros_propuestos: {
        "Cuadro 1 - Turismo": "20 hectáreas cercanas al club house",
        "Cuadro 2 - Alfalfa": "25 hectáreas mejores suelos", 
        "Cuadro 3 - Ganadería A": "50 hectáreas pastoreo rotativo",
        "Cuadro 4 - Ganadería B": "50 hectáreas descanso/reserva",
        "Cuadro 5 - Monte/Leña": "45 hectáreas monte nativo"
    },
    
    inversion_alambradas: {
        "Alambre galvanizado (25km)": 1800000, // $1,8 millones ARS
        "Postes quebracho (2500 unidades)": 950000, // $950k ARS
        "Varillas y tensores": 320000, // $320k ARS
        "Mano de obra alambrador": 850000, // $850k ARS
        "Total inversión alambradas": 3920000 // $3,92 millones ARS
    },
    
    beneficios_alambradas: {
        "Manejo rotativo ganado": "Mayor carga animal por hectárea",
        "Control sanitario": "Facilita vacunaciones y tratamientos", 
        "Optimización pasturas": "Siembra dirigida por cuadro",
        "Seguridad turismo": "Separación total área turística",
        "Eficiencia operativa": "Menor tiempo en tareas ganaderas"
    },
    
    financiamiento: "Con ingresos de leña del primer año (parte de los $9,48 millones)"
};

// GENERADOR DE REPORTE
function generarReporte() {
    const reporte = {
        fecha_actualizacion: "2025-08-06",
        titulo: "MODELO AUTOFINANCIABLE EL RECODO - COMENZANDO CON LEÑA",
        
        resumen_ejecutivo: {
            concepto: "Autofinanciamiento progresivo iniciando con venta de leña",
            inversion_inicial_minima: "$ 2.500.000 ARS ($2,5 millones de pesos argentinos)",
            recupero_inicial: "3,2 meses",
            estrategia: "Reinversión del 85% de utilidades, dividendos mínimos iniciales"
        },
        
        etapa_leña: etapaLena,
        cronograma_autofinanciable: cronogramaAutofinanciable,
        kpis_claros: kpis_por_etapa,
        plan_alambradas: plan_alambradas,
        
        aclaraciones_valores: {
            moneda: "Pesos Argentinos (ARS)",
            formato_millones: "Ej: $45M = $45.000.000 ARS (cuarenta y cinco millones de pesos)",
            formato_miles: "Ej: $2,5M = $2.500.000 ARS (dos millones quinientos mil pesos)",
            actualizacion_precios: "Agosto 2025 - Valores de mercado reales"
        }
    };
    
    return reporte;
}

// GENERAR Y GUARDAR ARCHIVOS
const reporte = generarReporte();

// Guardar JSON
fs.writeFileSync('modelo-autofinanciable-completo.json', JSON.stringify(reporte, null, 2));

// Generar CSV con cash flow por etapas
function generarCSVPorEtapas() {
    let csv = "CASH FLOW MENSUAL POR ETAPAS - EL RECODO\n";
    csv += "Valores en Pesos Argentinos (ARS)\n\n";
    
    csv += "ETAPA,MES,CONCEPTO,INGRESOS,EGRESOS,RESULTADO_NETO,ACUMULADO\n";
    
    // Etapa 0 - Leña
    let acumulado = -2500000;
    csv += `Etapa 0 - Leña,1-3,Inversión inicial,0,2500000,-2500000,${acumulado}\n`;
    
    for (let mes = 4; mes <= 12; mes++) {
        const resultado_mes = 790000;
        acumulado += resultado_mes;
        csv += `Etapa 0 - Leña,${mes},Operación leña,1440000,650000,790000,${acumulado}\n`;
    }
    
    // Etapa 1 - Turismo
    for (let mes = 13; mes <= 18; mes++) {
        const ingresos = 1440000 + 700000; // Leña + turismo
        const egresos = 650000 + 380000; // Costos leña + turismo
        const resultado = ingresos - egresos;
        acumulado += resultado;
        csv += `Etapa 1 - Turismo,${mes},Leña + Turismo,${ingresos},${egresos},${resultado},${acumulado}\n`;
    }
    
    return csv;
}

fs.writeFileSync('cash-flow-mensual-por-etapas.csv', generarCSVPorEtapas());

// Mostrar resumen
console.log('✅ MODELO AUTOFINANCIABLE GENERADO');
console.log('==========================================');
console.log(`📊 Inversión inicial mínima: $${etapaLena.inversion_inicial_minima.toLocaleString()} ARS`);
console.log(`🎯 Objetivo bolsas leña/mes: ${etapaLena.objetivos_leña.bolsas_mes_objetivo}`);
console.log(`💰 Ingresos mensuales objetivo: $${etapaLena.objetivos_leña.ingresos_mensuales_objetivo.toLocaleString()} ARS`);
console.log(`📈 Margen bruto mensual: $${etapaLena.objetivos_leña.margen_bruto_mensual.toLocaleString()} ARS`);
console.log(`⏰ Recupero inversión inicial: ${etapaLena.objetivos_leña.meses_recupero_inversion} meses`);
console.log('\n📄 Archivos generados:');
console.log('- modelo-autofinanciable-completo.json');
console.log('- cash-flow-mensual-por-etapas.csv');

module.exports = { etapaLena, cronogramaAutofinanciable, kpis_por_etapa };
