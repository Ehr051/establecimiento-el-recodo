#!/usr/bin/env node

// MODELO FINANCIERO COMPLETO POR ETAPAS 2025-2028
// Con sistema de participaciones y dividendos proporcionales

const fs = require('fs');

console.log("🏡 MODELO FINANCIERO COMPLETO POR ETAPAS 2025-2028...\n");

// ===========================================
// SISTEMA DE PARTICIPACIONES
// ===========================================

const sistemaParticipaciones = {
    descripcion: "Sistema de acciones/cuotas proporcional a la inversión",
    
    etapa1_2025: {
        inversion_total: 8250000,           // $8.25M
        inversion_por_hermano: 2062500,     // $2.0625M por hermano
        participacion_base: 25              // 25% cada hermano si todos invierten igual
    },
    
    etapa2_2026: {
        inversion_total: 29500000,          // $29.5M adicionales
        inversion_por_hermano: 7375000,     // $7.375M por hermano
        participacion_acumulada: "Depende de inversión real vs proyectada"
    },
    
    calculoParticipaciones: function(hermano, etapa1_real, etapa2_real) {
        const inversion_total_real = etapa1_real.h1 + etapa1_real.h2 + etapa1_real.h3 + etapa1_real.h4;
        const inversion_total_etapa2 = etapa2_real.h1 + etapa2_real.h2 + etapa2_real.h3 + etapa2_real.h4;
        
        let participacion_hermano;
        switch(hermano) {
            case 'h1': participacion_hermano = (etapa1_real.h1 + etapa2_real.h1); break;
            case 'h2': participacion_hermano = (etapa1_real.h2 + etapa2_real.h2); break;
            case 'h3': participacion_hermano = (etapa1_real.h3 + etapa2_real.h3); break;
            case 'h4': participacion_hermano = (etapa1_real.h4 + etapa2_real.h4); break;
        }
        
        const inversion_total_final = inversion_total_real + inversion_total_etapa2;
        const participacion_porcentual = (participacion_hermano / inversion_total_final) * 100;
        
        return {
            inversion_total: participacion_hermano,
            participacion_porcentual: participacion_porcentual,
            dividendos_anuales: function(ganancia_anual) {
                return ganancia_anual * (participacion_porcentual / 100);
            }
        };
    },
    
    ejemplo_escenarios: {
        escenario_equitativo: {
            etapa1: { h1: 2062500, h2: 2062500, h3: 2062500, h4: 2062500 },
            etapa2: { h1: 7375000, h2: 7375000, h3: 7375000, h4: 7375000 },
            resultado: "25% participación cada hermano"
        },
        escenario_desigual: {
            etapa1: { h1: 4125000, h2: 2062500, h3: 2062500, h4: 0 },         // H1 pone doble, H4 no pone
            etapa2: { h1: 14750000, h2: 7375000, h3: 7375000, h4: 0 },        // H1 pone doble, H4 no pone
            resultado: "H1: 50%, H2: 25%, H3: 25%, H4: 0%"
        },
        escenario_mixto: {
            etapa1: { h1: 3093750, h2: 2062500, h3: 2062500, h4: 1031250 },   // H1 +50%, H4 -50%
            etapa2: { h1: 11062500, h2: 7375000, h3: 7375000, h4: 3687500 },  // H1 +50%, H4 -50%
            resultado: "H1: 37.5%, H2: 25%, H3: 25%, H4: 12.5%"
        }
    }
};

// ===========================================
// CASH FLOW POR ETAPAS 2025-2028
// ===========================================

const cashFlowEtapas = {
    etapa1_2025: {
        año: 2025,
        descripcion: "Infraestructura y Validación",
        duracion: "12 meses",
        
        trimestre1: {
            periodo: "Ene-Mar 2025",
            ingresos: {
                leña: 400 * 2600 * 3,           // 400 bolsas x 3 meses
                ganaderia: 100 * 45000,         // 100 cabezas
                cultivos: 264100,               // Inicio cultivos
                serviciosDron: 50 * 8000        // 50 ha servicios
            },
            egresos: {
                ayudaTemporal: 250 * 100 * 3,
                operativos: 800000 * 3,
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
            periodo: "Abr-Jun 2025",
            ingresos: {
                leña: 400 * 2600 * 3,
                ganaderia: 100 * 45000,
                alfalfaPrimerCorte: 300000,
                serviciosDron: 80 * 8000
            },
            egresos: {
                ayudaTemporal: 400 * 100 * 3,
                operativos: 900000 * 3,
                combustible: 180000 * 3,
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
            periodo: "Jul-Sep 2025",
            ingresos: {
                leña: 400 * 2600 * 3,
                ganaderia: 100 * 45000,
                alfalfaSegundoCorte: 400000,
                cebadaCosecha: 280000,
                serviciosDron: 100 * 8000
            },
            egresos: {
                empleadoRural: 1163447 * 3,
                operativos: 700000 * 3,
                combustible: 150000 * 3,
                mantenimiento: 180000 * 3,
                insumos: 200000
            },
            inversion: {
                capitalTrabajo: 1000000,
                infraestructura: 500000
            }
        },
        
        trimestre4: {
            periodo: "Oct-Dic 2025",
            ingresos: {
                leña: 400 * 2600 * 3,
                ganaderia: 100 * 45000,
                alfalfaTercerCorte: 350000,
                serviciosDron: 120 * 8000,
                ventaNovillos: 20 * 180000
            },
            egresos: {
                empleadoRural: 1163447 * 3,
                operativos: 650000 * 3,
                combustible: 140000 * 3,
                mantenimiento: 200000 * 3,
                insumos: 150000
            },
            inversion: {
                preparacionEtapa2: 2000000
            }
        }
    },
    
    etapa2_2026: {
        año: 2026,
        descripcion: "Escalamiento y Maquinaria",
        duracion: "12 meses",
        
        trimestre1: {
            periodo: "Ene-Mar 2026",
            ingresos: {
                leña: 600 * 2600 * 3,           // Aumento a 600 bolsas con procesadora
                ganaderia: 120 * 50000,         // Aumento a 120 cabezas
                cultivos: 350000,               // Mejores rendimientos
                serviciosDron: 150 * 8000,      // Más servicios externos
                turismoRural: 500000            // Inicio turismo rural
            },
            egresos: {
                empleadoRural: 1163447 * 3,
                empleadoAdicional: 1000000 * 3, // Segundo empleado
                operativos: 1200000 * 3,        // Más operativos
                combustible: 300000 * 3,        // Más maquinaria
                mantenimiento: 400000 * 3,
                insumos: 500000
            },
            inversion: {
                tractorNuevo: 24000000,
                entregaTractorDeutz: -8000000,
                procesadoraLeña: 3500000
            }
        },
        
        trimestre2: {
            periodo: "Abr-Jun 2026",
            ingresos: {
                leña: 600 * 2600 * 3,
                ganaderia: 120 * 50000,
                alfalfaMejorada: 500000,        // Mejor rendimiento
                serviciosDron: 180 * 8000,
                turismoRural: 800000            // Crecimiento turismo
            },
            egresos: {
                empleadoRural: 1163447 * 3,
                empleadoAdicional: 1000000 * 3,
                operativos: 1100000 * 3,
                combustible: 280000 * 3,
                mantenimiento: 350000 * 3,
                insumos: 400000
            },
            inversion: {
                implementosAgricolas: 4000000,
                infraestructuraTurismo: 2000000
            }
        },
        
        trimestre3: {
            periodo: "Jul-Sep 2026",
            ingresos: {
                leña: 600 * 2600 * 3,
                ganaderia: 120 * 50000,
                cultivosExpandidos: 600000,
                serviciosDron: 200 * 8000,
                turismoRural: 1200000           // Consolidación turismo
            },
            egresos: {
                empleadoRural: 1163447 * 3,
                empleadoAdicional: 1000000 * 3,
                operativos: 1000000 * 3,
                combustible: 250000 * 3,
                mantenimiento: 300000 * 3,
                insumos: 350000
            },
            inversion: {
                implementosAdicionales: 2000000,
                infraestructuraAdicional: 1000000
            }
        },
        
        trimestre4: {
            periodo: "Oct-Dic 2026",
            ingresos: {
                leña: 600 * 2600 * 3,
                ganaderia: 120 * 50000,
                cosechaMejorada: 800000,
                serviciosDron: 220 * 8000,
                turismoRural: 1500000,          // Temporada alta
                ventaNovillos: 30 * 200000      // Más novillos, mejor precio
            },
            egresos: {
                empleadoRural: 1163447 * 3,
                empleadoAdicional: 1000000 * 3,
                operativos: 900000 * 3,
                combustible: 200000 * 3,
                mantenimiento: 250000 * 3,
                insumos: 300000
            },
            inversion: {
                preparacionEtapa3: 2000000
            }
        }
    },
    
    etapa3_2027: {
        año: 2027,
        descripcion: "Consolidación y Expansión Turística",
        duracion: "12 meses",
        
        resumenAnual: {
            ingresos: {
                leña: 800 * 2600 * 12,          // 800 bolsas/mes optimizado
                ganaderia: 150 * 60000,         // 150 cabezas premium
                cultivos: 4000000,              // Cultivos optimizados
                serviciosDron: 300 * 8000,      // Servicios consolidados
                turismoRural: 8000000,          // Turismo establecido
                ventaNovillos: 40 * 220000      // Más volumen, mejor precio
            },
            egresos: {
                empleados: (1163447 + 1000000 + 800000) * 12, // 3 empleados
                operativos: 800000 * 12,
                combustible: 150000 * 12,
                mantenimiento: 200000 * 12,
                insumos: 300000 * 12
            },
            inversion: {
                expansionTuristica: 5000000,
                mejorasContinuas: 2000000
            }
        }
    },
    
    etapa4_2028: {
        año: 2028,
        descripcion: "Operación Optimizada",
        duracion: "12 meses",
        
        resumenAnual: {
            ingresos: {
                leña: 1000 * 2600 * 12,         // 1000 bolsas/mes máximo
                ganaderia: 180 * 70000,         // 180 cabezas máximo
                cultivos: 5000000,              // Rendimientos máximos
                serviciosDron: 400 * 8000,      // Servicios regionales
                turismoRural: 12000000,         // Turismo consolidado
                ventaNovillos: 50 * 250000      // Máximo volumen y precio
            },
            egresos: {
                empleados: (1163447 + 1000000 + 800000) * 12,
                operativos: 700000 * 12,        // Eficiencias logradas
                combustible: 120000 * 12,       // Menos consumo por eficiencia
                mantenimiento: 180000 * 12,
                insumos: 250000 * 12
            },
            inversion: {
                mantenimientoEquipos: 1000000,  // Solo mantenimiento
                reservaEmergencia: 1000000
            }
        }
    }
};

// ===========================================
// FUNCIONES DE CÁLCULO
// ===========================================

function calcularTrimestre(etapa, trimestre) {
    const datos = cashFlowEtapas[etapa][trimestre];
    
    const ingresosTotales = Object.values(datos.ingresos).reduce((sum, val) => sum + val, 0);
    const egresosTotales = Object.values(datos.egresos).reduce((sum, val) => sum + val, 0);
    const inversionTotal = Object.values(datos.inversion).reduce((sum, val) => sum + val, 0);
    const flujoNeto = ingresosTotales - egresosTotales - inversionTotal;
    
    return {
        periodo: datos.periodo,
        ingresos: datos.ingresos,
        egresos: datos.egresos,
        inversiones: datos.inversion,
        totales: {
            ingresos: ingresosTotales,
            egresos: egresosTotales,
            inversiones: inversionTotal,
            flujoNeto: flujoNeto,
            porHermano: flujoNeto / 4
        }
    };
}

function calcularEtapaCompleta(etapa) {
    if (etapa === 'etapa3_2027' || etapa === 'etapa4_2028') {
        // Para etapas 3 y 4 usamos resumen anual
        const datos = cashFlowEtapas[etapa].resumenAnual;
        const ingresosTotales = Object.values(datos.ingresos).reduce((sum, val) => sum + val, 0);
        const egresosTotales = Object.values(datos.egresos).reduce((sum, val) => sum + val, 0);
        const inversionTotal = Object.values(datos.inversion).reduce((sum, val) => sum + val, 0);
        const flujoNeto = ingresosTotales - egresosTotales - inversionTotal;
        
        return {
            año: cashFlowEtapas[etapa].año,
            descripcion: cashFlowEtapas[etapa].descripcion,
            tipo: 'anual',
            totales: {
                ingresos: ingresosTotales,
                egresos: egresosTotales,
                inversiones: inversionTotal,
                flujoNeto: flujoNeto,
                porHermano: flujoNeto / 4
            },
            detalles: datos
        };
    } else {
        // Para etapas 1 y 2 calculamos por trimestres
        const trimestres = ['trimestre1', 'trimestre2', 'trimestre3', 'trimestre4']
            .map(t => calcularTrimestre(etapa, t));
        
        const totalesEtapa = {
            ingresos: trimestres.reduce((sum, t) => sum + t.totales.ingresos, 0),
            egresos: trimestres.reduce((sum, t) => sum + t.totales.egresos, 0),
            inversiones: trimestres.reduce((sum, t) => sum + t.totales.inversiones, 0)
        };
        
        totalesEtapa.flujoNeto = totalesEtapa.ingresos - totalesEtapa.egresos - totalesEtapa.inversiones;
        totalesEtapa.porHermano = totalesEtapa.flujoNeto / 4;
        
        return {
            año: cashFlowEtapas[etapa].año,
            descripcion: cashFlowEtapas[etapa].descripcion,
            tipo: 'trimestral',
            trimestres: trimestres,
            totales: totalesEtapa
        };
    }
}

// ===========================================
// CALCULAR Y MOSTRAR RESULTADOS
// ===========================================

console.log("💰 CASH FLOW COMPLETO POR ETAPAS 2025-2028:");
console.log("=".repeat(80));

const etapas = ['etapa1_2025', 'etapa2_2026', 'etapa3_2027', 'etapa4_2028'];
const resultadosCompletos = {};

etapas.forEach(etapaKey => {
    const resultado = calcularEtapaCompleta(etapaKey);
    resultadosCompletos[etapaKey] = resultado;
    
    console.log(`\n🏗️ ${resultado.año} - ${resultado.descripcion.toUpperCase()}`);
    console.log("-".repeat(60));
    
    if (resultado.tipo === 'trimestral') {
        resultado.trimestres.forEach((t, index) => {
            console.log(`\n📊 ${t.periodo}:`);
            console.log(`  Ingresos: $${t.totales.ingresos.toLocaleString()}`);
            console.log(`  Egresos: $${t.totales.egresos.toLocaleString()}`);
            console.log(`  Inversiones: $${t.totales.inversiones.toLocaleString()}`);
            console.log(`  Flujo Neto: $${t.totales.flujoNeto.toLocaleString()}`);
            console.log(`  Por hermano: $${t.totales.porHermano.toLocaleString()}`);
        });
    }
    
    console.log(`\n📈 TOTAL ${resultado.año}:`);
    console.log(`  Ingresos: $${resultado.totales.ingresos.toLocaleString()}`);
    console.log(`  Egresos: $${resultado.totales.egresos.toLocaleString()}`);
    console.log(`  Inversiones: $${resultado.totales.inversiones.toLocaleString()}`);
    console.log(`  FLUJO NETO: $${resultado.totales.flujoNeto.toLocaleString()}`);
    console.log(`  Por hermano: $${resultado.totales.porHermano.toLocaleString()}`);
    
    if (resultado.totales.flujoNeto >= 0) {
        console.log(`  ✅ AÑO POSITIVO`);
    } else {
        console.log(`  ⚠️ AÑO NEGATIVO (inversiones)`);
    }
});

// Resumen consolidado 2025-2028
const resumenTotal = {
    ingresos: Object.values(resultadosCompletos).reduce((sum, etapa) => sum + etapa.totales.ingresos, 0),
    egresos: Object.values(resultadosCompletos).reduce((sum, etapa) => sum + etapa.totales.egresos, 0),
    inversiones: Object.values(resultadosCompletos).reduce((sum, etapa) => sum + etapa.totales.inversiones, 0)
};

resumenTotal.flujoNeto = resumenTotal.ingresos - resumenTotal.egresos - resumenTotal.inversiones;
resumenTotal.porHermano = resumenTotal.flujoNeto / 4;

console.log("\n\n🎯 RESUMEN CONSOLIDADO 2025-2028:");
console.log("=".repeat(60));
console.log(`Ingresos 4 años: $${resumenTotal.ingresos.toLocaleString()}`);
console.log(`Egresos 4 años: $${resumenTotal.egresos.toLocaleString()}`);
console.log(`Inversiones 4 años: $${resumenTotal.inversiones.toLocaleString()}`);
console.log(`FLUJO NETO 4 AÑOS: $${resumenTotal.flujoNeto.toLocaleString()}`);
console.log(`Por hermano 4 años: $${resumenTotal.porHermano.toLocaleString()}`);
console.log(`Promedio anual/hermano: $${(resumenTotal.porHermano/4).toLocaleString()}`);

// ===========================================
// SISTEMA DE PARTICIPACIONES - EJEMPLOS
// ===========================================

console.log("\n\n💼 SISTEMA DE PARTICIPACIONES - EJEMPLOS:");
console.log("=".repeat(60));

Object.entries(sistemaParticipaciones.ejemplo_escenarios).forEach(([nombre, escenario]) => {
    console.log(`\n${nombre.toUpperCase().replace('_', ' ')}:`);
    
    const participaciones = {};
    ['h1', 'h2', 'h3', 'h4'].forEach(hermano => {
        const resultado = sistemaParticipaciones.calculoParticipaciones(
            hermano, 
            escenario.etapa1, 
            escenario.etapa2
        );
        participaciones[hermano] = resultado;
        
        const inversionTotal = escenario.etapa1[hermano] + escenario.etapa2[hermano];
        console.log(`  ${hermano.toUpperCase()}: Inversión $${inversionTotal.toLocaleString()} → ${resultado.participacion_porcentual.toFixed(1)}%`);
    });
    
    console.log(`  Resultado: ${escenario.resultado}`);
    
    // Ejemplo de dividendos con ganancia anual de $10M
    const gananciaEjemplo = 10000000;
    console.log(`  Dividendos (si ganancia $${(gananciaEjemplo/1000000).toFixed(1)}M):`);
    ['h1', 'h2', 'h3', 'h4'].forEach(hermano => {
        const dividendo = participaciones[hermano].dividendos_anuales(gananciaEjemplo);
        console.log(`    ${hermano.toUpperCase()}: $${dividendo.toLocaleString()}`);
    });
});

// Guardar datos completos
const datosCompletos = {
    sistemaParticipaciones,
    cashFlowEtapas,
    resultadosCompletos,
    resumenTotal,
    fechaGeneracion: new Date().toISOString()
};

fs.writeFileSync('modelo-etapas-completo.json', JSON.stringify(datosCompletos, null, 2));
console.log("\n✅ Archivo generado: modelo-etapas-completo.json");
console.log("💡 Modelo completo 2025-2028 con sistema de participaciones listo");
