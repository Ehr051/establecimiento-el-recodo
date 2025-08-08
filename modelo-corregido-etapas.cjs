#!/usr/bin/env node

// MODELO FINANCIERO CORREGIDO EL RECODO
// Etapas progresivas, 1 peón rural, estructura socios flexible

const fs = require('fs');

console.log("🏡 GENERANDO MODELO FINANCIERO CORREGIDO EL RECODO...\n");

// ===========================================
// ESTRUCTURA DE SOCIOS FLEXIBLE
// ===========================================

const estructuraSociosBase = {
    hermano1: { nombre: "Hermano A", inversion: 625000, participacion: 0.25 },
    hermano2: { nombre: "Hermano B", inversion: 625000, participacion: 0.25 },
    hermano3: { nombre: "Hermano C", inversion: 625000, participacion: 0.25 },
    hermano4: { nombre: "Hermano D", inversion: 625000, participacion: 0.25 }
    // Posibles adicionales: mama, papa, primo, tio, amigo externo
};

const inversionInicialTotal = 2500000;

console.log("👥 ESTRUCTURA DE SOCIOS BASE:");
console.log("=".repeat(50));
Object.entries(estructuraSociosBase).forEach(([key, socio]) => {
    console.log(`${socio.nombre}: ${(socio.participacion * 100)}% - Inversión: $${socio.inversion.toLocaleString()}`);
});

// ===========================================
// COSTOS REALES CON 1 SOLO PEÓN RURAL
// ===========================================

const salarioPeonRural = 891530; // Agosto 2025
const cargasSociales = salarioPeonRural * 0.305;
const costoMensualPeon = salarioPeonRural + cargasSociales;

console.log(`\n💰 COSTO MENSUAL 1 PEÓN RURAL:`);
console.log(`Salario base: $${salarioPeonRural.toLocaleString()}`);
console.log(`Cargas sociales (30.5%): $${cargasSociales.toLocaleString()}`);
console.log(`TOTAL MENSUAL: $${costoMensualPeon.toLocaleString()}`);

// ===========================================
// ETAPAS CORREGIDAS
// ===========================================

const etapas = {
    // ETAPA 1: ESTABLECIMIENTO Y PRODUCCIÓN BÁSICA (Meses 1-18)
    etapa1: {
        nombre: "Establecimiento y Producción Básica",
        meses: "1-18",
        objetivos: [
            "Preparar 25 hectáreas para alfalfa",
            "Instalar infraestructura básica (agua, luz, cercos)",
            "Comenzar producción de leña",
            "Establecer 1 peón rural fijo",
            "Generar primeros ingresos"
        ],
        inversion: 2500000,
        productos: ["Leña", "Alfalfa (desde mes 6)"],
        personal: "1 peón rural + dueño ocasional"
    },
    
    // ETAPA 2: CONSOLIDACIÓN AGROPECUARIA (Meses 19-30)
    etapa2: {
        nombre: "Consolidación Agropecuaria",
        meses: "19-30", 
        objetivos: [
            "Maximizar producción alfalfa (25 hectáreas)",
            "Agregar ganadería extensiva",
            "Mejorar infraestructura productiva",
            "Generar capital para turismo"
        ],
        inversion: 5000000,
        productos: ["Leña", "Alfalfa", "Ganadería"],
        personal: "1 peón rural + personal temporario"
    },
    
    // ETAPA 3: DIVERSIFICACIÓN TURÍSTICA (Meses 31-42)
    etapa3: {
        nombre: "Diversificación Turística",
        meses: "31-42",
        objetivos: [
            "Construir Club House",
            "Construir 3-4 domos glamping",
            "Instalar cervecería artesanal",
            "Lanzar servicios turísticos"
        ],
        inversion: 15000000,
        productos: ["Campo (continuo)", "Turismo", "Cerveza"],
        personal: "Personal campo + personal turismo"
    }
};

console.log("\n🎯 ETAPAS DEL PROYECTO:");
console.log("=".repeat(60));
Object.entries(etapas).forEach(([key, etapa]) => {
    console.log(`\n${key.toUpperCase()}: ${etapa.nombre} (${etapa.meses})`);
    console.log(`Inversión: $${etapa.inversion.toLocaleString()}`);
    console.log(`Productos: ${etapa.productos.join(", ")}`);
    console.log(`Personal: ${etapa.personal}`);
    console.log(`Objetivos:`);
    etapa.objetivos.forEach(obj => console.log(`  • ${obj}`));
});

// ===========================================
// CASH FLOW POR ETAPAS CON REINVERSIÓN PRIORITARIA
// ===========================================

function generarCashFlowCorregido() {
    const cashFlow = [];
    
    // ETAPA 1: ESTABLECIMIENTO (Meses 1-18)
    console.log("\n🌱 ETAPA 1: ESTABLECIMIENTO Y PRODUCCIÓN BÁSICA");
    console.log("=".repeat(70));
    
    for (let mes = 1; mes <= 18; mes++) {
        let ingresos = 0;
        let costos = costoMensualPeon; // Peón rural base
        let descripcion = "";
        
        if (mes === 1) {
            // Setup inicial
            costos += inversionInicialTotal;
            descripcion = "Inversión inicial + setup";
        } else if (mes <= 3) {
            // Preparación del campo
            costos += 180000; // Combustible, herramientas, semillas
            descripcion = "Preparación campo";
        } else if (mes <= 6) {
            // Inicio producción leña
            ingresos = 720000; // 400 bolsas × $1800 (producción menor)
            costos += 350000; // Costos producción leña
            descripcion = "Inicio leña (producción menor)";
        } else {
            // Producción leña + alfalfa
            ingresos = 1440000; // 800 bolsas leña
            if (mes >= 12) ingresos += 430000; // Alfalfa desde mes 12
            costos += 420000; // Costos producción
            descripcion = mes >= 12 ? "Leña + Alfalfa" : "Leña completa";
        }
        
        const resultado = ingresos - costos;
        const acumuladoAnterior = mes === 1 ? 0 : cashFlow[mes - 2].acumulado;
        const acumulado = acumuladoAnterior + resultado;
        
        // POLÍTICA DE DISTRIBUCIÓN: 80% reinversión, 20% dividendos (solo si acumulado > 0)
        let dividendos = {};
        let reinversion = 0;
        
        if (acumulado > 0 && resultado > 0) {
            const disponible = resultado;
            reinversion = disponible * 0.80;
            const dividendoTotal = disponible * 0.20;
            
            Object.entries(estructuraSociosBase).forEach(([key, socio]) => {
                dividendos[socio.nombre] = Math.round(dividendoTotal * socio.participacion);
            });
        }
        
        cashFlow.push({
            mes,
            etapa: "1 - Establecimiento",
            ingresos,
            costosDetallados: {
                peonRural: costoMensualPeon,
                produccion: costos - costoMensualPeon,
                total: costos
            },
            costos,
            resultado,
            acumulado,
            reinversion,
            dividendos,
            descripcion
        });
        
        console.log(`Mes ${mes.toString().padStart(2)}: Ingresos $${ingresos.toLocaleString().padStart(10)} | Costos $${costos.toLocaleString().padStart(10)} | Resultado $${resultado.toLocaleString().padStart(10)} | Acum $${acumulado.toLocaleString().padStart(10)} | ${descripcion}`);
    }
    
    // ETAPA 2: CONSOLIDACIÓN (Meses 19-30)
    console.log("\n🚜 ETAPA 2: CONSOLIDACIÓN AGROPECUARIA");
    console.log("=".repeat(70));
    
    const capitalDisponibleEtapa2 = cashFlow[17].acumulado; // Mes 18
    const inversionEtapa2 = 5000000;
    const financiamientoEtapa2 = Math.max(0, inversionEtapa2 - capitalDisponibleEtapa2);
    
    console.log(`💰 Capital disponible: $${capitalDisponibleEtapa2.toLocaleString()}`);
    console.log(`🏗️ Inversión requerida: $${inversionEtapa2.toLocaleString()}`);
    console.log(`💳 Financiamiento necesario: $${financiamientoEtapa2.toLocaleString()}\n`);
    
    for (let mes = 19; mes <= 30; mes++) {
        // Ingresos escalados
        const ingresoLeña = 1440000; // Leña constante
        const ingresoAlfalfa = mes <= 24 ? 645000 : 860000; // Escalamiento
        const ingresoGanaderia = mes <= 24 ? 320000 : 480000; // Ganadería extensiva
        const ingresos = ingresoLeña + ingresoAlfalfa + ingresoGanaderia;
        
        // Costos escalados
        const costos = costoMensualPeon + 480000 + (mes <= 24 ? 120000 : 180000); // Personal temporario
        
        const resultado = ingresos - costos;
        const acumuladoAnterior = cashFlow[mes - 2].acumulado;
        const acumulado = acumuladoAnterior + resultado;
        
        // POLÍTICA: 70% reinversión, 30% dividendos
        let dividendos = {};
        let reinversion = 0;
        
        if (resultado > 0) {
            reinversion = resultado * 0.70;
            const dividendoTotal = resultado * 0.30;
            
            Object.entries(estructuraSociosBase).forEach(([key, socio]) => {
                dividendos[socio.nombre] = Math.round(dividendoTotal * socio.participacion);
            });
        }
        
        cashFlow.push({
            mes,
            etapa: "2 - Consolidación",
            ingresos,
            costosDetallados: {
                peonRural: costoMensualPeon,
                personalTemporal: 120000,
                produccion: costos - costoMensualPeon - 120000,
                total: costos
            },
            costos,
            resultado,
            acumulado,
            reinversion,
            dividendos,
            descripcion: "Campo consolidado"
        });
        
        console.log(`Mes ${mes}: Leña $${ingresoLeña.toLocaleString()} + Alfalfa $${ingresoAlfalfa.toLocaleString()} + Ganadería $${ingresoGanaderia.toLocaleString()} = $${ingresos.toLocaleString()} | Resultado $${resultado.toLocaleString()} | Acum $${acumulado.toLocaleString()}`);
    }
    
    // ETAPA 3: TURISMO (Meses 31-42)
    console.log("\n🏡 ETAPA 3: DIVERSIFICACIÓN TURÍSTICA");
    console.log("=".repeat(70));
    
    const capitalDisponibleEtapa3 = cashFlow[29].acumulado; // Mes 30
    const inversionEtapa3 = 15000000;
    const financiamientoEtapa3 = Math.max(0, inversionEtapa3 - capitalDisponibleEtapa3);
    
    console.log(`💰 Capital disponible: $${capitalDisponibleEtapa3.toLocaleString()}`);
    console.log(`🏗️ Inversión requerida: $${inversionEtapa3.toLocaleString()}`);
    console.log(`💳 Financiamiento necesario: $${financiamientoEtapa3.toLocaleString()}\n`);
    
    for (let mes = 31; mes <= 42; mes++) {
        // Ingresos completos
        const ingresoCampo = 2925000; // Leña + Alfalfa + Ganadería consolidada
        const ingresoTurismo = mes <= 36 ? 1800000 : 3600000; // Escalamiento turismo
        const ingresoCerveza = mes <= 36 ? 420000 : 720000;
        const ingresos = ingresoCampo + ingresoTurismo + ingresoCerveza;
        
        // Costos completos
        const costos = costoMensualPeon + 180000 + 850000; // Personal campo + turismo
        
        const resultado = ingresos - costos;
        const acumuladoAnterior = cashFlow[mes - 2].acumulado;
        const acumulado = acumuladoAnterior + resultado;
        
        // POLÍTICA: 60% reinversión, 40% dividendos (fase madura)
        let dividendos = {};
        let reinversion = 0;
        
        if (resultado > 0) {
            reinversion = resultado * 0.60;
            const dividendoTotal = resultado * 0.40;
            
            Object.entries(estructuraSociosBase).forEach(([key, socio]) => {
                dividendos[socio.nombre] = Math.round(dividendoTotal * socio.participacion);
            });
        }
        
        cashFlow.push({
            mes,
            etapa: "3 - Turismo",
            ingresos,
            costosDetallados: {
                peonRural: costoMensualPeon,
                personalTurismo: 850000,
                personalCampo: 180000,
                total: costos
            },
            costos,
            resultado,
            acumulado,
            reinversion,
            dividendos,
            descripcion: "Operación completa"
        });
        
        console.log(`Mes ${mes}: Campo $${ingresoCampo.toLocaleString()} + Turismo $${ingresoTurismo.toLocaleString()} + Cerveza $${ingresoCerveza.toLocaleString()} = $${ingresos.toLocaleString()} | Resultado $${resultado.toLocaleString()} | Acum $${acumulado.toLocaleString()}`);
    }
    
    return cashFlow;
}

// ===========================================
// GENERACIÓN Y ANÁLISIS
// ===========================================

const cashFlowCompleto = generarCashFlowCorregido();

// Resumen de dividendos por socio
console.log("\n💰 RESUMEN DE DIVIDENDOS POR SOCIO (42 MESES):");
console.log("=".repeat(60));

const dividendosPorSocio = {};
const reinversionTotal = cashFlowCompleto.reduce((sum, p) => sum + (p.reinversion || 0), 0);

Object.values(estructuraSociosBase).forEach(socio => {
    dividendosPorSocio[socio.nombre] = 0;
});

cashFlowCompleto.forEach(periodo => {
    if (periodo.dividendos && Object.keys(periodo.dividendos).length > 0) {
        Object.entries(periodo.dividendos).forEach(([socio, monto]) => {
            dividendosPorSocio[socio] += monto;
        });
    }
});

Object.entries(dividendosPorSocio).forEach(([socio, total]) => {
    const inversionSocio = Object.values(estructuraSociosBase).find(s => s.nombre === socio).inversion;
    const roi = ((total / inversionSocio) * 100).toFixed(1);
    console.log(`${socio}: $${total.toLocaleString()} dividendos | ROI: ${roi}%`);
});

console.log(`\n💹 REINVERSIÓN TOTAL: $${reinversionTotal.toLocaleString()}`);
console.log(`🏆 CAPITAL FINAL: $${cashFlowCompleto[41].acumulado.toLocaleString()}`);

// Guardar archivos
const cashFlowJSON = JSON.stringify(cashFlowCompleto, null, 2);
fs.writeFileSync('cash-flow-corregido.json', cashFlowJSON);

const csvHeaders = "Mes,Etapa,Ingresos,Peon_Rural,Personal_Extra,Produccion,Costos_Total,Resultado,Acumulado,Reinversion,Div_HermanoA,Div_HermanoB,Div_HermanoC,Div_HermanoD\n";
const csvData = cashFlowCompleto.map(p => {
    const divA = p.dividendos["Hermano A"] || 0;
    const divB = p.dividendos["Hermano B"] || 0;
    const divC = p.dividendos["Hermano C"] || 0;
    const divD = p.dividendos["Hermano D"] || 0;
    
    return `${p.mes},"${p.etapa}",${p.ingresos},${costoMensualPeon},${(p.costosDetallados.personalTemporal || p.costosDetallados.personalTurismo || 0)},${p.costosDetallados.produccion || 0},${p.costos},${p.resultado},${p.acumulado},${p.reinversion || 0},${divA},${divB},${divC},${divD}`;
}).join('\n');

fs.writeFileSync('cash-flow-corregido.csv', csvHeaders + csvData);

console.log("\n✅ ARCHIVOS GENERADOS:");
console.log("  📄 cash-flow-corregido.json");
console.log("  📊 cash-flow-corregido.csv");

console.log("\n🎯 CONCLUSIONES CLAVE:");
console.log("=".repeat(50));
console.log(`⏰ Break-even: Mes ${cashFlowCompleto.findIndex(p => p.acumulado > 0) + 1}`);
console.log(`🌱 Etapa 1 (18 meses): Campo establecido, ingresos básicos`);
console.log(`🚜 Etapa 2 (12 meses): Campo consolidado, ganadería`);
console.log(`🏡 Etapa 3 (12 meses): Turismo, operación completa`);
console.log(`💰 Política: Reinversión prioritaria (60-80%)`);
console.log(`👥 Dividendos: Según % inversión de cada socio`);
