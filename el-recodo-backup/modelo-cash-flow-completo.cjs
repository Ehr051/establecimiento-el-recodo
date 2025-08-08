#!/usr/bin/env node

// MODELO CASH FLOW COMPLETO - 4 TRIMESTRES + RENDIMIENTOS VARIABLES
// Para integrar en la web con tablas dinámicas

const fs = require('fs');

console.log("🏡 MODELO CASH FLOW COMPLETO - 4 TRIMESTRES...\n");

// ===========================================
// CASH FLOW COMPLETO 4 TRIMESTRES
// ===========================================

const cashFlowCompleto = {
    año1: {
        trimestre1: {
            ingresos: {
                leña: 400 * 2600 * 3,           // 400 bolsas x 3 meses
                ganaderia: 100 * 45000,         // Trimestral por cabeza
                cultivos: 264100,               // 25% anual
                serviciosDron: 50 * 8000        // 50 ha externas
            },
            egresos: {
                ayudaTemporal: 250 * 100 * 3,   // 250 bolsas x $100 x 3 meses
                operativos: 800000 * 3,         // Reducido sin empleado fijo
                combustible: 200000 * 3,
                mantenimiento: 150000 * 3,
                insumos: 300000
            },
            inversion: {
                reparacionTractor: 1200000,
                bascula: 150000,
                bolsas: 900000,
                dron: 2500000
            }
        },
        trimestre2: {
            ingresos: {
                leña: 400 * 2600 * 3,
                ganaderia: 100 * 45000,
                alfalfaPrimerCorte: 300000,     // Marzo - primer corte
                serviciosDron: 80 * 8000        // Aumenta demanda
            },
            egresos: {
                ayudaTemporal: 400 * 100 * 3,   // 400 bolsas x $100 x 3 meses  
                operativos: 900000 * 3,         // Operativos familiares
                combustible: 180000 * 3,        // Menos por dron
                mantenimiento: 120000 * 3,
                insumos: 250000
            },
            inversion: {
                partidorHidraulico: 800000,
                motosierraAdicional: 400000,
                herramientasVarias: 300000
            }
        },
        trimestre3: {
            ingresos: {
                leña: 400 * 2600 * 3,
                ganaderia: 100 * 45000,
                alfalfaSegundoCorte: 400000,    // Junio - segundo corte
                cebadaCosecha: 280000,          // Primera cosecha cebada
                serviciosDron: 100 * 8000       // Época alta servicios
            },
            egresos: {
                empleadoRural: 1163447 * 3,     // Contratar empleado fijo
                operativos: 700000 * 3,         // Reducir trabajo familiar
                combustible: 150000 * 3,
                mantenimiento: 180000 * 3,
                insumos: 200000
            },
            inversion: {
                capitalTrabajo: 1000000,        // Refuerzo capital trabajo
                infraestructura: 500000
            }
        },
        trimestre4: {
            ingresos: {
                leña: 400 * 2600 * 3,
                ganaderia: 100 * 45000,
                alfalfaTercerCorte: 350000,     // Septiembre - tercer corte
                serviciosDron: 120 * 8000,      // Temporada alta
                ventaNovillos: 20 * 180000      // Venta 20 novillos
            },
            egresos: {
                empleadoRural: 1163447 * 3,
                operativos: 650000 * 3,
                combustible: 140000 * 3,
                mantenimiento: 200000 * 3,
                insumos: 150000
            },
            inversion: {
                preparacionEtapa2: 2000000      // Preparación inversiones etapa 2
            }
        }
    }
};

// ===========================================
// RENDIMIENTOS VARIABLES DE CULTIVOS
// ===========================================

const rendimientosCultivos = {
    alfalfa: {
        superficie: 47,                 // hectáreas necesarias
        rendimientoBase: 50000,         // pesos por hectárea por año
        escenarios: {
            pesimo: { factor: 0.5, descripcion: "50% - Sequía severa" },
            malo: { factor: 0.7, descripcion: "70% - Condiciones adversas" },
            normal: { factor: 1.0, descripcion: "100% - Condiciones normales" },
            bueno: { factor: 1.2, descripcion: "120% - Condiciones favorables" },
            excelente: { factor: 1.5, descripcion: "150% - Año excepcional" }
        }
    },
    cebada: {
        superficie: 4,
        rendimientoBase: 2800000,       // por hectárea por año
        escenarios: {
            pesimo: { factor: 0.4, descripcion: "40% - Granizo/helada" },
            malo: { factor: 0.7, descripcion: "70% - Condiciones adversas" },
            normal: { factor: 1.0, descripcion: "100% - Condiciones normales" },
            bueno: { factor: 1.3, descripcion: "130% - Condiciones favorables" },
            excelente: { factor: 1.6, descripcion: "160% - Año excepcional" }
        }
    },
    maiz: {
        superficie: 3,
        rendimientoBase: 3150000,       // por hectárea por año
        escenarios: {
            pesimo: { factor: 0.3, descripcion: "30% - Sequía/plaga" },
            malo: { factor: 0.7, descripcion: "70% - Condiciones adversas" },
            normal: { factor: 1.0, descripcion: "100% - Condiciones normales" },
            bueno: { factor: 1.4, descripcion: "140% - Condiciones favorables" },
            excelente: { factor: 1.8, descripcion: "180% - Año excepcional" }
        }
    },
    sorgo: {
        superficie: 2.22,
        rendimientoBase: 1943243,       // por hectárea por año
        escenarios: {
            pesimo: { factor: 0.6, descripcion: "60% - Condiciones adversas" },
            malo: { factor: 0.8, descripcion: "80% - Condiciones adversas" },
            normal: { factor: 1.0, descripcion: "100% - Condiciones normales" },
            bueno: { factor: 1.2, descripcion: "120% - Condiciones favorables" },
            excelente: { factor: 1.4, descripcion: "140% - Año excepcional" }
        }
    }
};

// ===========================================
// FUNCIÓN PARA CALCULAR RENDIMIENTOS
// ===========================================

function calcularRendimientos(cultivo, escenario) {
    const datos = rendimientosCultivos[cultivo];
    const factor = datos.escenarios[escenario].factor;
    const ingresoTotal = datos.superficie * datos.rendimientoBase * factor;
    
    return {
        superficie: datos.superficie,
        rendimientoBase: datos.rendimientoBase,
        factor: factor,
        descripcion: datos.escenarios[escenario].descripcion,
        ingresoTotal: Math.round(ingresoTotal),
        ingresoPorHa: Math.round(datos.rendimientoBase * factor)
    };
}

// ===========================================
// CALCULAR TODOS LOS TRIMESTRES
// ===========================================

function calcularTrimestre(numeroTrimestre) {
    const trimestre = cashFlowCompleto.año1[`trimestre${numeroTrimestre}`];
    
    const ingresosTotales = Object.values(trimestre.ingresos).reduce((sum, val) => sum + val, 0);
    const egresosTotales = Object.values(trimestre.egresos).reduce((sum, val) => sum + val, 0);
    const inversionTotal = Object.values(trimestre.inversion).reduce((sum, val) => sum + val, 0);
    const flujoNeto = ingresosTotales - egresosTotales - inversionTotal;
    
    return {
        numero: numeroTrimestre,
        ingresos: trimestre.ingresos,
        egresos: trimestre.egresos,
        inversiones: trimestre.inversion,
        totales: {
            ingresos: ingresosTotales,
            egresos: egresosTotales,
            inversiones: inversionTotal,
            flujoNeto: flujoNeto,
            porHermano: flujoNeto / 4
        }
    };
}

// Calcular todos los trimestres
const trimestres = [1, 2, 3, 4].map(num => calcularTrimestre(num));

// Mostrar resultados
console.log("💰 CASH FLOW DETALLADO POR TRIMESTRES:");
console.log("=".repeat(80));

trimestres.forEach((t, index) => {
    console.log(`\n📊 TRIMESTRE ${t.numero}:`);
    console.log("-".repeat(50));
    
    console.log("INGRESOS:");
    Object.entries(t.ingresos).forEach(([concepto, monto]) => {
        console.log(`  ${concepto}: $${monto.toLocaleString()}`);
    });
    console.log(`  TOTAL: $${t.totales.ingresos.toLocaleString()}`);
    
    console.log("\nEGRESOS:");
    Object.entries(t.egresos).forEach(([concepto, monto]) => {
        console.log(`  ${concepto}: $${monto.toLocaleString()}`);
    });
    console.log(`  TOTAL: $${t.totales.egresos.toLocaleString()}`);
    
    console.log("\nINVERSIONES:");
    Object.entries(t.inversiones).forEach(([concepto, monto]) => {
        console.log(`  ${concepto}: $${monto.toLocaleString()}`);
    });
    console.log(`  TOTAL: $${t.totales.inversiones.toLocaleString()}`);
    
    console.log(`\nFLUJO NETO: $${t.totales.flujoNeto.toLocaleString()}`);
    console.log(`Por hermano: $${t.totales.porHermano.toLocaleString()}`);
    
    if (t.totales.flujoNeto >= 0) {
        console.log("✅ TRIMESTRE POSITIVO");
    } else {
        console.log("⚠️ TRIMESTRE NEGATIVO (inversiones)");
    }
});

// Resumen anual
const totalAnual = {
    ingresos: trimestres.reduce((sum, t) => sum + t.totales.ingresos, 0),
    egresos: trimestres.reduce((sum, t) => sum + t.totales.egresos, 0),
    inversiones: trimestres.reduce((sum, t) => sum + t.totales.inversiones, 0)
};

totalAnual.flujoNeto = totalAnual.ingresos - totalAnual.egresos - totalAnual.inversiones;
totalAnual.porHermano = totalAnual.flujoNeto / 4;

console.log("\n🎯 RESUMEN ANUAL:");
console.log("=".repeat(50));
console.log(`Ingresos totales: $${totalAnual.ingresos.toLocaleString()}`);
console.log(`Egresos totales: $${totalAnual.egresos.toLocaleString()}`);
console.log(`Inversiones totales: $${totalAnual.inversiones.toLocaleString()}`);
console.log(`FLUJO NETO ANUAL: $${totalAnual.flujoNeto.toLocaleString()}`);
console.log(`Por hermano: $${totalAnual.porHermano.toLocaleString()}`);

// ===========================================
// TABLA DE RENDIMIENTOS
// ===========================================

console.log("\n\n🌾 TABLA DE RENDIMIENTOS POR ESCENARIO:");
console.log("=".repeat(80));

Object.keys(rendimientosCultivos).forEach(cultivo => {
    console.log(`\n${cultivo.toUpperCase()}:`);
    console.log("-".repeat(40));
    
    Object.keys(rendimientosCultivos[cultivo].escenarios).forEach(escenario => {
        const resultado = calcularRendimientos(cultivo, escenario);
        console.log(`${escenario.padEnd(12)}: $${resultado.ingresoTotal.toLocaleString().padStart(12)} (${resultado.descripcion})`);
    });
});

// Guardar datos para la web
const datosCompletos = {
    cashFlowTrimestres: trimestres,
    resumenAnual: totalAnual,
    rendimientosCultivos: rendimientosCultivos,
    calculoRendimientos: function(cultivo, escenario) {
        return calcularRendimientos(cultivo, escenario);
    }
};

// Convertir función a string para guardar
const datosParaWeb = {
    ...datosCompletos,
    funcionCalculoRendimientos: calcularRendimientos.toString()
};

fs.writeFileSync('cash-flow-completo.json', JSON.stringify(datosParaWeb, null, 2));
console.log("\n✅ Archivo generado: cash-flow-completo.json");
console.log("💡 Datos listos para integrar en la web con tablas dinámicas");
