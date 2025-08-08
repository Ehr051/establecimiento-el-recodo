#!/usr/bin/env node

// MODELO FINANCIERO DETALLADO EL RECODO
// Con costos reales de leña y dividendos mensuales

const fs = require('fs');

console.log("🌳 GENERANDO MODELO FINANCIERO DETALLADO...\n");

// ===========================================
// COSTOS DETALLADOS DE PRODUCCIÓN DE LEÑA
// ===========================================

const costosLena = {
    // COSTOS DE CORTE Y PRODUCCIÓN
    empleadoForestal: 350000,      // Empleado especializado en corte
    combustibleMotosierra: 45000,   // Nafta para motosierra
    combustibleTractor: 85000,      // Gasoil para tractor
    mantenimientoMotosierra: 25000, // Repuestos, aceite, cadenas
    mantenimientoTractor: 40000,    // Mantenimiento mensual
    
    // COSTOS DE EMBOLSADO Y PREPARACIÓN  
    bolsas: 32000,                  // 800 bolsas × $40 c/u
    etiquetas: 8000,               // Etiquetas con marca
    empleadoEmbolsado: 180000,     // Empleado para embolsar
    
    // COSTOS DE TRANSPORTE Y LOGÍSTICA
    combustibleTransporte: 95000,   // Gasoil para reparto
    mantenimientoVehiculo: 35000,  // Mantenimiento camión
    seguros: 25000,                // Seguros del vehículo
    
    // COSTOS ADMINISTRATIVOS
    ventasMarketing: 20000,        // Marketing y ventas
    administracion: 15000,         // Gastos administrativos
};

const totalCostosLena = Object.values(costosLena).reduce((a, b) => a + b, 0);
const ingresosBrutosLena = 800 * 1800; // 800 bolsas × $1800
const margenLena = ingresosBrutosLena - totalCostosLena;
const margenPorcentajeLena = (margenLena / ingresosBrutosLena * 100).toFixed(1);

console.log("📊 ANÁLISIS DETALLADO DE COSTOS DE LEÑA:");
console.log("=".repeat(50));
console.log(`💰 Ingresos Brutos: $${ingresosBrutosLena.toLocaleString()}`);
console.log(`💸 Costos Totales: $${totalCostosLena.toLocaleString()}`);
console.log(`📈 Margen Neto: $${margenLena.toLocaleString()} (${margenPorcentajeLena}%)`);
console.log("\n🔍 DESGLOSE DE COSTOS:");

Object.entries(costosLena).forEach(([concepto, monto]) => {
    const porcentaje = (monto / totalCostosLena * 100).toFixed(1);
    console.log(`  • ${concepto.padEnd(25)}: $${monto.toLocaleString().padStart(10)} (${porcentaje}%)`);
});

// ===========================================
// ESTRUCTURA DE SOCIOS Y DIVIDENDOS
// ===========================================

const estructuraSocios = {
    socio1: { nombre: "Socio A", participacion: 0.35, inversion: 875000 },
    socio2: { nombre: "Socio B", participacion: 0.35, inversion: 875000 },
    socio3: { nombre: "Socio C", participacion: 0.30, inversion: 750000 }
};

const inversionTotalInicial = 2500000;

console.log("\n👥 ESTRUCTURA DE SOCIOS:");
console.log("=".repeat(50));
Object.entries(estructuraSocios).forEach(([key, socio]) => {
    console.log(`${socio.nombre}: ${(socio.participacion * 100)}% - Inversión: $${socio.inversion.toLocaleString()}`);
});

// ===========================================
// CASH FLOW DETALLADO POR ETAPAS
// ===========================================

function generarCashFlowDetallado() {
    const cashFlow = [];
    
    // ETAPA 0: AUTOFINANCIAMIENTO CON LEÑA (Meses 1-12)
    console.log("\n🌳 ETAPA 0: AUTOFINANCIAMIENTO CON LEÑA");
    console.log("=".repeat(60));
    
    for (let mes = 1; mes <= 12; mes++) {
        let ingresos = 0;
        let costos = 0;
        let descripcion = "";
        
        if (mes <= 3) {
            // Setup inicial - solo costos
            costos = mes === 1 ? inversionTotalInicial : 0;
            descripcion = "Setup inicial";
        } else {
            // Producción normal
            ingresos = ingresosBrutosLena;
            costos = totalCostosLena;
            descripcion = "Producción leña";
        }
        
        const resultado = ingresos - costos;
        const acumuladoAnterior = mes === 1 ? 0 : cashFlow[mes - 2].acumulado;
        const acumulado = acumuladoAnterior + resultado;
        
        // Calcular dividendos (solo si hay ganancia acumulada positiva)
        let dividendos = {};
        if (acumulado > 0 && mes >= 4) {
            const dividendoTotal = resultado * 0.3; // 30% de la ganancia mensual se reparte
            Object.entries(estructuraSocios).forEach(([key, socio]) => {
                dividendos[socio.nombre] = Math.round(dividendoTotal * socio.participacion);
            });
        }
        
        cashFlow.push({
            mes,
            etapa: "0 - Leña",
            ingresos,
            costosDetallados: {
                empleados: costosLena.empleadoForestal + costosLena.empleadoEmbolsado,
                combustibles: costosLena.combustibleMotosierra + costosLena.combustibleTractor + costosLena.combustibleTransporte,
                mantenimiento: costosLena.mantenimientoMotosierra + costosLena.mantenimientoTractor + costosLena.mantenimientoVehiculo,
                materiales: costosLena.bolsas + costosLena.etiquetas,
                otros: costosLena.seguros + costosLena.ventasMarketing + costosLena.administracion
            },
            costos,
            resultado,
            acumulado,
            dividendos,
            descripcion
        });
        
        console.log(`Mes ${mes.toString().padStart(2)}: Ingresos $${ingresos.toLocaleString().padStart(10)} | Costos $${costos.toLocaleString().padStart(10)} | Resultado $${resultado.toLocaleString().padStart(10)} | Acum $${acumulado.toLocaleString().padStart(10)} | ${descripcion}`);
    }
    
    // ETAPA 1: TURISMO INICIAL (Meses 13-18)
    console.log("\n🏡 ETAPA 1: CLUB HOUSE + PRIMER DOMO");
    console.log("=".repeat(60));
    
    const inversionEtapa1 = 8500000;
    const capitalDisponible = cashFlow[11].acumulado; // Mes 12
    const financiamientoNecesario1 = Math.max(0, inversionEtapa1 - capitalDisponible);
    
    console.log(`💰 Capital disponible: $${capitalDisponible.toLocaleString()}`);
    console.log(`🏗️ Inversión requerida: $${inversionEtapa1.toLocaleString()}`);
    console.log(`💳 Financiamiento necesario: $${financiamientoNecesario1.toLocaleString()}\n`);
    
    const costosEtapa1 = {
        empleadosLeña: costosLena.empleadoForestal + costosLena.empleadoEmbolsado,
        empleadosTurismo: 450000, // Chef + limpieza + atención
        combustibles: 120000,
        mantenimiento: 80000,
        servicios: 95000, // Luz, gas, agua, internet
        marketing: 85000,
        administracion: 60000,
        otros: 45000
    };
    
    for (let mes = 13; mes <= 18; mes++) {
        const ingresoLeña = ingresosBrutosLena;
        const ingresoTurismo = mes === 13 ? 0 : 420000; // Primer mes sin turismo
        const ingresos = ingresoLeña + ingresoTurismo;
        
        const costosLenaBase = totalCostosLena;
        const costosTurismoBase = Object.values(costosEtapa1).reduce((a, b) => a + b, 0) - costosEtapa1.empleadosLeña;
        const costos = costosLenaBase + costosTurismoBase;
        
        const resultado = ingresos - costos;
        const acumuladoAnterior = cashFlow[mes - 2].acumulado;
        const acumulado = acumuladoAnterior + resultado;
        
        // Dividendos (35% se reparte, resto se reinvierte)
        let dividendos = {};
        if (resultado > 0) {
            const dividendoTotal = resultado * 0.35;
            Object.entries(estructuraSocios).forEach(([key, socio]) => {
                dividendos[socio.nombre] = Math.round(dividendoTotal * socio.participacion);
            });
        }
        
        cashFlow.push({
            mes,
            etapa: "1 - Turismo Inicial",
            ingresos,
            costosDetallados: {
                empleados: costosEtapa1.empleadosLeña + costosEtapa1.empleadosTurismo,
                combustibles: costosEtapa1.combustibles,
                mantenimiento: costosEtapa1.mantenimiento,
                servicios: costosEtapa1.servicios,
                marketing: costosEtapa1.marketing,
                administracion: costosEtapa1.administracion,
                otros: costosEtapa1.otros
            },
            costos,
            resultado,
            acumulado,
            dividendos,
            descripcion: mes === 13 ? "Construcción Club House" : "Operación 1 Domo"
        });
        
        console.log(`Mes ${mes}: Leña $${ingresoLeña.toLocaleString()} + Turismo $${ingresoTurismo.toLocaleString()} = $${ingresos.toLocaleString()} | Costos $${costos.toLocaleString()} | Resultado $${resultado.toLocaleString()} | Acum $${acumulado.toLocaleString()}`);
    }
    
    // ETAPA 2: EXPANSIÓN COMPLETA (Meses 19-30)
    console.log("\n🚀 ETAPA 2: EXPANSIÓN COMPLETA");
    console.log("=".repeat(60));
    
    const inversionEtapa2 = 12000000;
    const capitalDisponibleEtapa2 = cashFlow[17].acumulado; // Mes 18
    const financiamientoNecesario2 = Math.max(0, inversionEtapa2 - capitalDisponibleEtapa2);
    
    console.log(`💰 Capital disponible: $${capitalDisponibleEtapa2.toLocaleString()}`);
    console.log(`🏗️ Inversión requerida: $${inversionEtapa2.toLocaleString()}`);
    console.log(`💳 Financiamiento necesario: $${financiamientoNecesario2.toLocaleString()}\n`);
    
    const costosEtapa2 = {
        empleadosLeña: costosLena.empleadoForestal + costosLena.empleadoEmbolsado,
        empleadosTurismo: 850000, // Personal para 2 domos + cervecería
        empleadosAlfalfa: 400000, // Personal agrícola
        combustibles: 180000,
        mantenimiento: 120000,
        servicios: 140000,
        marketing: 120000,
        administracion: 95000,
        insumos: 320000, // Insumos cervecería + alfalfa
        otros: 85000
    };
    
    for (let mes = 19; mes <= 30; mes++) {
        const ingresoLeña = ingresosBrutosLena;
        const ingresoTurismo = mes <= 24 ? 1800000 : 2700000; // 2 domos luego escalamiento
        const ingresoAlfalfa = mes <= 24 ? 645000 : 1075000;
        const ingresoCerveza = mes <= 24 ? 210000 : 420000;
        const ingresos = ingresoLeña + ingresoTurismo + ingresoAlfalfa + ingresoCerveza;
        
        const costos = Object.values(costosEtapa2).reduce((a, b) => a + b, 0);
        const resultado = ingresos - costos;
        const acumuladoAnterior = cashFlow[mes - 2].acumulado;
        const acumulado = acumuladoAnterior + resultado;
        
        // Dividendos (40% se reparte, resto se reinvierte)
        let dividendos = {};
        if (resultado > 0) {
            const dividendoTotal = resultado * 0.40;
            Object.entries(estructuraSocios).forEach(([key, socio]) => {
                dividendos[socio.nombre] = Math.round(dividendoTotal * socio.participacion);
            });
        }
        
        cashFlow.push({
            mes,
            etapa: "2 - Expansión",
            ingresos,
            costosDetallados: costosEtapa2,
            costos,
            resultado,
            acumulado,
            dividendos,
            descripcion: mes <= 24 ? "Consolidación" : "Operación completa"
        });
        
        console.log(`Mes ${mes}: Total $${ingresos.toLocaleString()} | Costos $${costos.toLocaleString()} | Resultado $${resultado.toLocaleString()} | Acum $${acumulado.toLocaleString()}`);
    }
    
    return cashFlow;
}

// ===========================================
// GENERACIÓN DE REPORTES
// ===========================================

const cashFlowCompleto = generarCashFlowDetallado();

// Resumen de dividendos por socio
console.log("\n💰 RESUMEN DE DIVIDENDOS POR SOCIO (30 MESES):");
console.log("=".repeat(60));

const dividendosPorSocio = {};
Object.values(estructuraSocios).forEach(socio => {
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
    const inversionSocio = Object.values(estructuraSocios).find(s => s.nombre === socio).inversion;
    const roi = ((total / inversionSocio) * 100).toFixed(1);
    console.log(`${socio}: $${total.toLocaleString()} dividendos | ROI: ${roi}%`);
});

// Guardar datos en archivos
const cashFlowJSON = JSON.stringify(cashFlowCompleto, null, 2);
fs.writeFileSync('cash-flow-detallado.json', cashFlowJSON);

// CSV para análisis
const csvHeaders = "Mes,Etapa,Ingresos,Empleados,Combustibles,Mantenimiento,Servicios,Marketing,Admin,Otros,Costos_Total,Resultado,Acumulado,Div_SocioA,Div_SocioB,Div_SocioC\n";
const csvData = cashFlowCompleto.map(p => {
    const divA = p.dividendos["Socio A"] || 0;
    const divB = p.dividendos["Socio B"] || 0;
    const divC = p.dividendos["Socio C"] || 0;
    
    return `${p.mes},"${p.etapa}",${p.ingresos},${p.costosDetallados.empleados || 0},${p.costosDetallados.combustibles || 0},${p.costosDetallados.mantenimiento || 0},${p.costosDetallados.servicios || 0},${p.costosDetallados.marketing || 0},${p.costosDetallados.administracion || 0},${p.costosDetallados.otros || 0},${p.costos},${p.resultado},${p.acumulado},${divA},${divB},${divC}`;
}).join('\n');

fs.writeFileSync('cash-flow-detallado.csv', csvHeaders + csvData);

console.log("\n✅ ARCHIVOS GENERADOS:");
console.log("  📄 cash-flow-detallado.json");
console.log("  📊 cash-flow-detallado.csv");

console.log("\n🎯 CONCLUSIONES CLAVE:");
console.log("=".repeat(50));
console.log(`💰 Margen real leña: ${margenPorcentajeLena}% (con todos los costos)`);
console.log(`⏰ Break-even real: Mes ${cashFlowCompleto.findIndex(p => p.acumulado > 0) + 1}`);
console.log(`🏆 Capital final (30 meses): $${cashFlowCompleto[29].acumulado.toLocaleString()}`);
console.log(`📈 ROI promedio socios: ${((dividendosPorSocio["Socio A"] / 875000) * 100).toFixed(1)}%`);
