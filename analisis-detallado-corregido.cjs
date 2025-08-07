#!/usr/bin/env node

// ANÁLISIS DETALLADO Y CORREGIDO EL RECODO
// Incorporando precios reales de maquinaria y calendario agrícola

const fs = require('fs');

console.log("🔍 ANÁLISIS DETALLADO EL RECODO - CORREGIDO...\n");

// ===========================================
// RESPUESTAS A TUS PREGUNTAS ESPECÍFICAS
// ===========================================

console.log("❓ RESPUESTAS A TUS PREGUNTAS:");
console.log("=".repeat(60));

// 1. HECTÁREAS RESTANTES
const superficieDetallada = {
    campoTotal: 1600,
    monteNativo: 1584.78,
    chacrones: {
        alfalfa: 4,
        cebadaHermano: 2,
        subtotal: 6,
        restante: 15.22 - 6  // 9.22 ha restantes
    }
};

console.log("🌾 HECTÁREAS DESMONTADAS (15.22 ha):");
console.log(`  Alfalfa: ${superficieDetallada.chacrones.alfalfa} ha`);
console.log(`  Cebada hermano: ${superficieDetallada.chacrones.cebadaHermano} ha`);
console.log(`  Subtotal cultivado: ${superficieDetallada.chacrones.subtotal} ha`);
console.log(`  RESTANTE DISPONIBLE: ${superficieDetallada.chacrones.restante} ha`);

console.log("\n💡 OPCIONES PARA LAS 9.22 HA RESTANTES:");
console.log("  • Pasturas mejoradas (6-7 ha) → Suplemento ganado");
console.log("  • Avena forrajera (2-3 ha) → Forraje invierno");
console.log("  • Reserva para expansión futura");

// 2. COSTOS NO CONTEMPLADOS
const costosAdicionales = {
    tractorReparacion: {
        estimado: 2500000,  // Aumentado de 800k
        descripcion: "Reparación completa + service",
        urgencia: "Crítico antes de siembra"
    },
    granosPrimerSiembra: {
        alfalfa: 4 * 45000,      // 4 ha x $45k/ha semilla
        avena: 3 * 25000,        // 3 ha x $25k/ha semilla  
        pasturas: 6 * 35000,     // 6 ha x $35k/ha semilla
        total: 0
    },
    estudiosSubelo: {
        costo: 14 * 1600 * 140,  // USD 14/ha x 1600 ha x $140/USD
        descripcion: "Análisis completo del suelo",
        importancia: "Esencial para planificación"
    }
};

costosAdicionales.granosPrimerSiembra.total = 
    costosAdicionales.granosPrimerSiembra.alfalfa +
    costosAdicionales.granosPrimerSiembra.avena +
    costosAdicionales.granosPrimerSiembra.pasturas;

console.log("\n💰 COSTOS ADICIONALES NO CONTEMPLADOS:");
console.log(`  Reparación tractor: $${costosAdicionales.tractorReparacion.estimado.toLocaleString()}`);
console.log(`  Granos 1ra siembra: $${costosAdicionales.granosPrimerSiembra.total.toLocaleString()}`);
console.log(`  Estudios de suelo: $${costosAdicionales.estudiosSubelo.costo.toLocaleString()}`);

// 3. PRECIOS MAQUINARIA MERCADOLIBRE
const maquinariaPrecios = {
    tractores: {
        hanomag25hp: { precio: 8100, moneda: "USD", descripcion: "Hanomag Stark 25hp Parquero" },
        hanomag50hp: { precio: 15300, moneda: "USD", descripcion: "Hanomag Stark 50hp 4x4" },
        hanomag80hp: { precio: 28200, moneda: "USD", descripcion: "Hanomag 80hp 4x4 Nuevo" },
        chery45hp: { precio: 17500, moneda: "USD", descripcion: "Chery 45hp 4x4 tipo John Deere" },
        usados: {
            massey75hp: { precio: 25000, moneda: "USD", año: 1988, descripcion: "Massey Ferguson 75hp" },
            johnDeere: { precio: 27000, moneda: "USD", año: 1992, descripcion: "John Deere 2850" }
        }
    },
    implementos: {
        araDiscosUsado: { precio: 3500000, moneda: "ARS", descripcion: "Arado de discos usado" },
        sembradoraUsada: { precio: 6500000, moneda: "ARS", descripción: "Sembradora usada" },
        rastra: { precio: 2500000, moneda: "ARS", descripción: "Rastra de discos" }
    }
};

console.log("\n🚜 PRECIOS MAQUINARIA (MercadoLibre):");
Object.entries(maquinariaPrecios.tractores).forEach(([modelo, datos]) => {
    if (typeof datos.precio === 'number') {
        console.log(`  ${modelo}: ${datos.moneda} ${datos.precio.toLocaleString()} - ${datos.descripcion}`);
    }
});

// 4. CALENDARIO AGRÍCOLA
const calendarioAgricola = {
    diciembre: {
        actividad: "Siembra alfalfa",
        condiciones: "Temperatura ideal, humedad crítica",
        primer_corte: "Marzo (90-100 días después)"
    },
    enero: {
        actividad: "Siembra cebada",
        condiciones: "Época límite para cebada",
        cosecha: "Mayo-Junio (120-140 días después)"
    },
    marzo: {
        actividad: "Primer corte alfalfa",
        rendimiento: "50-60% del rendimiento anual",
        frecuencia: "Cada 45-60 días después"
    }
};

console.log("\n📅 CALENDARIO AGRÍCOLA:");
Object.entries(calendarioAgricola).forEach(([mes, info]) => {
    console.log(`  ${mes.toUpperCase()}: ${info.actividad}`);
    console.log(`    • ${info.condiciones || info.rendimiento}`);
    console.log(`    • ${info.primer_corte || info.cosecha || info.frecuencia}`);
});

// 5. PRODUCCIÓN LEÑA REALISTA CON 2H/DÍA
const analisisLenaRealista = {
    horasDiarias: 2,
    bolsasPorHora: 1.8,  // Ritmo sostenible
    bolsasDiarias: 2 * 1.8,
    diasMensuales: 22,    // Días hábiles
    bolsasMensuales: Math.floor(2 * 1.8 * 22),
    
    // Para llegar a 100 bolsas/semana
    objetivo: {
        semanal: 100,
        mensual: 430,
        deficitMensual: 430 - Math.floor(2 * 1.8 * 22)
    },
    
    // Cálculo días necesarios para completar objetivo
    diasExtrasNecesarios: function() {
        const deficit = this.objetivo.deficitMensual;
        return Math.ceil(deficit / this.bolsasPorHora);  // Horas extras ÷ 1.8 bolsas/hora
    }
};

analisisLenaRealista.horasExtrasNecesarias = analisisLenaRealista.diasExtrasNecesarios();

console.log("\n🪵 ANÁLISIS PRODUCCIÓN LEÑA CON 2H/DÍA:");
console.log(`  Producción base: ${analisisLenaRealista.bolsasMensuales} bolsas/mes`);
console.log(`  Objetivo: ${analisisLenaRealista.objetivo.mensual} bolsas/mes`);
console.log(`  DÉFICIT: ${analisisLenaRealista.objetivo.deficitMensual} bolsas/mes`);
console.log(`  Horas extras necesarias: ${analisisLenaRealista.horasExtrasNecesarias} horas/mes`);

// 6. DISTRIBUCIÓN HORARIA EMPLEADO RURAL
const distribucionHoraria = {
    jornadaCompleta: 8,  // 8 horas/día estándar rural
    distribuciones: {
        conservadora: {
            leña: 2,
            ganado: 4,
            cultivos: 1,
            mantenimiento: 1,
            total: 8,
            bolsasMes: 79
        },
        intensiva: {
            leña: 4,
            ganado: 3,
            cultivos: 0.5,
            mantenimiento: 0.5,
            total: 8,
            bolsasMes: 158
        },
        objetivo: {
            leña: 5.5,
            ganado: 2,
            cultivos: 0.5,
            mantenimiento: 0,
            total: 8,
            bolsasMes: 217
        }
    }
};

console.log("\n⏰ DISTRIBUCIÓN HORARIA EMPLEADO (8h/día):");
Object.entries(distribucionHoraria.distribuciones).forEach(([tipo, dist]) => {
    console.log(`  ${tipo.toUpperCase()}:`);
    console.log(`    Leña: ${dist.leña}h → ${dist.bolsasMes} bolsas/mes`);
    console.log(`    Ganado: ${dist.ganado}h`);
    console.log(`    Cultivos: ${dist.cultivos}h`);
    console.log(`    Mantenimiento: ${dist.mantenimiento}h`);
});

// 7. MOMENTO CRÍTICO PARA SEGUNDO EMPLEADO
const criteriosSegundoEmpleado = {
    produccionLeña: {
        limite1Empleado: 217,  // Máximo con 5.5h leña
        objetivoTotal: 430,
        momentoCritico: "Cuando la demanda supere 217 bolsas/mes"
    },
    ganado: {
        limite1Empleado: 120,  // Cabezas manejables
        siguienteNivel: 150,
        momentoCritico: "Cuando superemos 120 cabezas"
    },
    cultivos: {
        limite1Empleado: 10,   // Hectáreas manejables
        siguienteNivel: 15,
        momentoCritico: "Cuando cultivemos más de 10 ha"
    },
    ingresos: {
        minimoViabilidad: 2000000,  // $2M/mes para justificar 2do empleado
        costoSegundoEmpleado: 1200000  // Salario + cargas
    }
};

console.log("\n👥 CRITERIOS PARA SEGUNDO EMPLEADO:");
Object.entries(criteriosSegundoEmpleado).forEach(([aspecto, datos]) => {
    if (datos.momentoCritico) {
        console.log(`  ${aspecto.toUpperCase()}: ${datos.momentoCritico}`);
    }
});

// ===========================================
// MODELO FINANCIERO CORREGIDO
// ===========================================

const modeloCorregido = {
    inversionInicial: {
        ganado: 100 * 100000,                           // 100 cabezas x $100k
        tractorReparacion: costosAdicionales.tractorReparacion.estimado,
        implementos: 8000000,                           // Arado, sembradora, rastra usados
        infraestructura: 3000000,                       // Corrales, aguadas, alambrados
        estudiosSubelo: costosAdicionales.estudiosSubelo.costo,
        semillas: costosAdicionales.granosPrimerSiembra.total,
        herramientas: 800000,
        capitalTrabajo: 2000000,                        // 6 meses operación
        total: 0
    },
    
    ingresosAnuales: {
        // PRODUCCIÓN REALISTA CON 1 EMPLEADO
        leña: 79 * 2550 * 12,                          // 79 bolsas/mes x $2550 x 12 meses
        ganaderia: 100 * 180000,                       // 100 cabezas x $180k/año
        alfalfa: 684000 * 0.6,                         // 60% venta (40% consumo propio)
        cebada: 646000,                                 // Venta al hermano
        total: 0
    },
    
    costosAnuales: {
        empleado: 1163447 * 12,                        // Salario + cargas
        combustible: 200000 * 12,                      // Aumentado
        veterinario: 120000 * 12,
        alimentos: 150000 * 12,                        // Aumentado
        mantenimiento: 180000 * 12,                    // Aumentado  
        impuestos: 200000 * 12,                        // Aumentado
        seguros: 100000 * 12,
        semillas: 300000,                              // Reposición anual
        varios: 150000 * 12,                           // Aumentado
        total: 0
    }
};

// Calcular totales
modeloCorregido.inversionInicial.total = Object.values(modeloCorregido.inversionInicial)
    .slice(0, -1).reduce((sum, val) => sum + val, 0);

modeloCorregido.ingresosAnuales.total = Object.values(modeloCorregido.ingresosAnuales)
    .slice(0, -1).reduce((sum, val) => sum + val, 0);

modeloCorregido.costosAnuales.total = Object.values(modeloCorregido.costosAnuales)
    .slice(0, -1).reduce((sum, val) => sum + val, 0);

const resultadoAnual = modeloCorregido.ingresosAnuales.total - modeloCorregido.costosAnuales.total;
const inversionPorHermano = modeloCorregido.inversionInicial.total / 4;
const resultadoPorHermano = resultadoAnual / 4;

console.log("\n💰 MODELO FINANCIERO CORREGIDO:");
console.log("=".repeat(60));
console.log("INVERSIÓN INICIAL:");
Object.entries(modeloCorregido.inversionInicial).forEach(([concepto, monto]) => {
    if (concepto !== 'total') {
        console.log(`  ${concepto}: $${monto.toLocaleString()}`);
    }
});
console.log(`  TOTAL: $${modeloCorregido.inversionInicial.total.toLocaleString()}`);
console.log(`  POR HERMANO: $${inversionPorHermano.toLocaleString()}`);

console.log("\nINGRESOS ANUALES:");
console.log(`  Leña (79 bolsas/mes): $${modeloCorregido.ingresosAnuales.leña.toLocaleString()}`);
console.log(`  Ganadería: $${modeloCorregido.ingresosAnuales.ganaderia.toLocaleString()}`);
console.log(`  Alfalfa: $${modeloCorregido.ingresosAnuales.alfalfa.toLocaleString()}`);
console.log(`  Cebada: $${modeloCorregido.ingresosAnuales.cebada.toLocaleString()}`);
console.log(`  TOTAL: $${modeloCorregido.ingresosAnuales.total.toLocaleString()}`);

console.log("\nCOSTOS ANUALES:");
console.log(`  Empleado: $${modeloCorregido.costosAnuales.empleado.toLocaleString()}`);
console.log(`  Operativos: $${(modeloCorregido.costosAnuales.total - modeloCorregido.costosAnuales.empleado).toLocaleString()}`);
console.log(`  TOTAL: $${modeloCorregido.costosAnuales.total.toLocaleString()}`);

console.log(`\nRESULTADO ANUAL: $${resultadoAnual.toLocaleString()}`);
console.log(`POR HERMANO: $${resultadoPorHermano.toLocaleString()}`);

// ===========================================
// ANÁLISIS DE VIABILIDAD
// ===========================================

console.log("\n🎯 ANÁLISIS DE VIABILIDAD:");
console.log("=".repeat(60));

if (resultadoAnual > 0) {
    const roi = ((resultadoPorHermano * 2) / inversionPorHermano * 100).toFixed(1);
    const payback = Math.ceil(inversionPorHermano / resultadoPorHermano);
    
    console.log(`✅ PROYECTO VIABLE`);
    console.log(`ROI 24 meses: ${roi}%`);
    console.log(`Payback: ${payback} años`);
    
    console.log("\n💡 CLAVES DEL ÉXITO:");
    console.log("• Producción leña DEBE aumentar a 150+ bolsas/mes");
    console.log("• Ganadería debe mantenerse en 100+ cabezas");
    console.log("• Control estricto de costos operativos");
    console.log("• Diversificación de ingresos");
    
} else {
    console.log(`❌ PROYECTO NO VIABLE`);
    console.log(`Pérdida anual: $${Math.abs(resultadoAnual).toLocaleString()}`);
    
    console.log("\n🔧 CORRECCIONES NECESARIAS:");
    console.log("• Aumentar producción leña a 200+ bolsas/mes");
    console.log("• Reducir costos operativos 20-30%");
    console.log("• Buscar precios premium para productos");
    console.log("• Evaluar actividades adicionales");
}

// ===========================================
// OPCIONES DE MEJORA
// ===========================================

console.log("\n🚀 OPCIONES DE MEJORA:");
console.log("=".repeat(60));

const opcionesMejora = {
    produccionLeña: {
        actual: 79,
        objetivo: 200,
        metodo: "Empleado 4-5h/día + mejor organización",
        impacto: (200 - 79) * 2550 * 12  // Aumento ingreso anual
    },
    preciosPremium: {
        lenaActual: 2550,
        lenaPremium: 3500,  // 37% más
        impacto: 79 * (3500 - 2550) * 12
    },
    serviciosAdicionales: {
        corteLenaClientes: 150000,  // Por mes
        alquilerTractor: 80000,     // Por mes
        impactoAnual: (150000 + 80000) * 12
    }
};

console.log("AUMENTAR PRODUCCIÓN LEÑA:");
console.log(`  De ${opcionesMejora.produccionLeña.actual} a ${opcionesMejora.produccionLeña.objetivo} bolsas/mes`);
console.log(`  Método: ${opcionesMejora.produccionLeña.metodo}`);
console.log(`  Impacto: +$${opcionesMejora.produccionLeña.impacto.toLocaleString()}/año`);

console.log("\nPRECIOS PREMIUM:");
console.log(`  Leña premium: $${opcionesMejora.preciosPremium.lenaPremium}/bolsa`);
console.log(`  Impacto: +$${opcionesMejora.preciosPremium.impacto.toLocaleString()}/año`);

console.log("\nSERVICIOS ADICIONALES:");
console.log(`  Corte leña clientes: $${opcionesMejora.serviciosAdicionales.corteLenaClientes.toLocaleString()}/mes`);
console.log(`  Alquiler tractor: $${opcionesMejora.serviciosAdicionales.alquilerTractor.toLocaleString()}/mes`);
console.log(`  Impacto: +$${opcionesMejora.serviciosAdicionales.impactoAnual.toLocaleString()}/año`);

// Guardar análisis
const analisis = {
    superficieDetallada,
    costosAdicionales,
    maquinariaPrecios,
    calendarioAgricola,
    analisisLenaRealista,
    distribucionHoraria,
    criteriosSegundoEmpleado,
    modeloCorregido,
    resultados: {
        inversionTotal: modeloCorregido.inversionInicial.total,
        inversionPorHermano,
        resultadoAnual,
        resultadoPorHermano,
        viable: resultadoAnual > 0
    },
    opcionesMejora
};

fs.writeFileSync('analisis-detallado-corregido.json', JSON.stringify(analisis, null, 2));
console.log("\n✅ Archivo generado: analisis-detallado-corregido.json");
