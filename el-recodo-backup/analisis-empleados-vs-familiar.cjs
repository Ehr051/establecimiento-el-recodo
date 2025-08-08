#!/usr/bin/env node

// ANÁLISIS REALISTA: ¿EMPLEADOS O TRABAJO FAMILIAR?
// El dilema de los salarios reales vs rentabilidad

const fs = require('fs');

console.log("🤔 ANÁLISIS: EMPLEADOS vs TRABAJO FAMILIAR\n");

// ===========================================
// SALARIOS REALES ARGENTINA 2024/2025
// ===========================================

const salariosReales = {
    empleadoRural: {
        salarioBasico: 710000,           // UATRE 2024
        aguinaldo: 710000 / 12,          // Proporcional mensual
        aportes: 710000 * 0.17,          // 17% cargas sociales empleador
        arl: 710000 * 0.012,             // ART
        vacaciones: 710000 / 12,         // Proporcional
        totalMensual: function() {
            return this.salarioBasico + this.aguinaldo + this.aportes + this.arl + this.vacaciones;
        }
    },
    
    empleadoGeneral: {
        salarioMinimo: 1163447,          // Salario mínimo 2024
        aportes: 1163447 * 0.17,
        arl: 1163447 * 0.012,
        aguinaldo: 1163447 / 12,
        vacaciones: 1163447 / 12,
        totalMensual: function() {
            return this.salarioMinimo + this.aportes + this.arl + this.aguinaldo + this.vacaciones;
        }
    }
};

const costoEmpleadoRural = salariosReales.empleadoRural.totalMensual();
const costoEmpleadoGeneral = salariosReales.empleadoGeneral.totalMensual();

console.log("💰 COSTOS REALES EMPLEADOS (2024/2025):");
console.log("=".repeat(50));
console.log(`Empleado rural UATRE: $${costoEmpleadoRural.toLocaleString()}/mes`);
console.log(`Empleado general (salario mínimo): $${costoEmpleadoGeneral.toLocaleString()}/mes`);

// ===========================================
// PUNTO DE EQUILIBRIO PARA EMPLEADOS
// ===========================================

const puntosEquilibrio = {
    empleadoRural: {
        costoMensual: costoEmpleadoRural,
        bolsasNecesarias: Math.ceil(costoEmpleadoRural / 2600), // A $2600/bolsa
        produccionMinima: Math.ceil(costoEmpleadoRural / 2600),
        margenSeguridad: Math.ceil((costoEmpleadoRural * 1.3) / 2600), // 30% margen
    },
    
    empleadoGeneral: {
        costoMensual: costoEmpleadoGeneral,
        bolsasNecesarias: Math.ceil(costoEmpleadoGeneral / 2600),
        produccionMinima: Math.ceil(costoEmpleadoGeneral / 2600),
        margenSeguridad: Math.ceil((costoEmpleadoGeneral * 1.3) / 2600),
    }
};

console.log("\n📊 PUNTO DE EQUILIBRIO EMPLEADOS:");
console.log("=".repeat(50));
console.log("EMPLEADO RURAL:");
console.log(`  Debe producir mínimo: ${puntosEquilibrio.empleadoRural.bolsasNecesarias} bolsas/mes`);
console.log(`  Con margen seguridad: ${puntosEquilibrio.empleadoRural.margenSeguridad} bolsas/mes`);

console.log("\nEMPLEADO GENERAL:");
console.log(`  Debe producir mínimo: ${puntosEquilibrio.empleadoGeneral.bolsasNecesarias} bolsas/mes`);
console.log(`  Con margen seguridad: ${puntosEquilibrio.empleadoGeneral.margenSeguridad} bolsas/mes`);

// ===========================================
// ALTERNATIVAS REALISTAS
// ===========================================

const alternativasRealistas = {
    trabajoFamiliar: {
        descripcion: "Solo hermanos trabajando",
        ventajas: [
            "Sin costos laborales fijos",
            "100% margen para la familia",
            "Flexibilidad total horarios",
            "Reinversión completa ganancias"
        ],
        desventajas: [
            "Limitado por tiempo disponible",
            "Dependiente presencia hermanos",
            "Crecimiento más lento"
        ],
        produccionRealista: 300, // bolsas/mes entre hermanos
        ingresoNeto: 300 * 2600
    },
    
    trabajoFamiliar_temporada: {
        descripcion: "Hermanos + ayuda temporal",
        ventajas: [
            "Flexibilidad contratar solo cuando necesario",
            "Sin cargas sociales permanentes",
            "Pagos por tarea/día",
            "Control total costos"
        ],
        modalidades: {
            jornal: 25000,        // Por día
            porTarea: 100,        // Por bolsa armada
            temporada: 400000     // Por mes temporada alta
        },
        produccionRealista: 400, // Con ayuda temporal
        costoVariable: 400 * 100 // $100 por bolsa en ayuda
    },
    
    cooperativismo: {
        descripcion: "Cooperativa familiar + vecinos",
        ventajas: [
            "Compartir costos y riesgos",
            "Mayor escala producción",
            "Beneficios impositivos",
            "Economías de escala"
        ],
        estructura: {
            familias: 3,
            aporteInicial: 3000000, // Por familia
            produccionConjunta: 800, // bolsas/mes
            distribucionGanancias: "33% cada familia"
        }
    }
};

console.log("\n🎯 ALTERNATIVAS REALISTAS:");
console.log("=".repeat(60));

console.log("1. TRABAJO FAMILIAR PURO:");
console.log(`   Producción: ${alternativasRealistas.trabajoFamiliar.produccionRealista} bolsas/mes`);
console.log(`   Ingreso neto: $${alternativasRealistas.trabajoFamiliar.ingresoNeto.toLocaleString()}/mes`);
console.log(`   Por hermano: $${(alternativasRealistas.trabajoFamiliar.ingresoNeto/4).toLocaleString()}/mes`);

console.log("\n2. TRABAJO FAMILIAR + AYUDA TEMPORAL:");
console.log(`   Producción: ${alternativasRealistas.trabajoFamiliar_temporada.produccionRealista} bolsas/mes`);
const ingresoTemporal = alternativasRealistas.trabajoFamiliar_temporada.produccionRealista * 2600;
const costoTemporal = alternativasRealistas.trabajoFamiliar_temporada.costoVariable;
const netoTemporal = ingresoTemporal - costoTemporal;
console.log(`   Ingresos: $${ingresoTemporal.toLocaleString()}/mes`);
console.log(`   Costos ayuda: $${costoTemporal.toLocaleString()}/mes`);
console.log(`   Neto: $${netoTemporal.toLocaleString()}/mes`);
console.log(`   Por hermano: $${(netoTemporal/4).toLocaleString()}/mes`);

// ===========================================
// MODELO RECOMENDADO: HÍBRIDO INTELIGENTE
// ===========================================

const modeloHibrido = {
    nombre: "Modelo Híbrido Inteligente",
    filosofia: "Combinar trabajo familiar con ayuda estratégica",
    
    fases: {
        arranque: {
            duracion: "6 meses",
            estrategia: "Solo trabajo familiar",
            objetivo: "Validar demanda y procesos",
            produccion: 250, // bolsas/mes
            empleados: 0,
            ingresoNeto: 250 * 2600,
            porHermano: (250 * 2600) / 4
        },
        
        crecimiento: {
            duracion: "6-18 meses",
            estrategia: "Trabajo familiar + ayuda por tareas",
            objetivo: "Alcanzar 400 bolsas/mes",
            produccion: 400,
            ayudaTemporal: "2 días/semana",
            costoAyuda: 50000, // Por mes
            ingresoNeto: (400 * 2600) - 50000,
            porHermano: ((400 * 2600) - 50000) / 4
        },
        
        consolidacion: {
            duracion: "18+ meses",
            estrategia: "Evaluar empleado según números",
            objetivo: "Eficiencia y crecimiento sostenible",
            decision: "Solo si se supera punto equilibrio consistentemente"
        }
    }
};

console.log("\n🚀 MODELO HÍBRIDO RECOMENDADO:");
console.log("=".repeat(60));

Object.entries(modeloHibrido.fases).forEach(([fase, datos]) => {
    console.log(`\n${fase.toUpperCase()} (${datos.duracion}):`);
    console.log(`  Estrategia: ${datos.estrategia}`);
    console.log(`  Objetivo: ${datos.objetivo}`);
    if (datos.produccion) {
        console.log(`  Producción: ${datos.produccion} bolsas/mes`);
        console.log(`  Ingreso neto: $${datos.ingresoNeto.toLocaleString()}/mes`);
        console.log(`  Por hermano: $${datos.porHermano.toLocaleString()}/mes`);
    }
});

// ===========================================
// ANÁLISIS FINANCIERO HÍBRIDO
// ===========================================

const analisisAnual = {
    fase1_6meses: {
        produccion: 250 * 6,
        ingresos: 250 * 2600 * 6,
        costos: 0, // Solo trabajo familiar
        neto: 250 * 2600 * 6
    },
    
    fase2_6meses: {
        produccion: 400 * 6,
        ingresos: 400 * 2600 * 6,
        costos: 50000 * 6, // Ayuda temporal
        neto: (400 * 2600 * 6) - (50000 * 6)
    }
};

const totalAnual = analisisAnual.fase1_6meses.neto + analisisAnual.fase2_6meses.neto;
const totalProduccion = analisisAnual.fase1_6meses.produccion + analisisAnual.fase2_6meses.produccion;

console.log("\n📈 PROYECCIÓN ANUAL MODELO HÍBRIDO:");
console.log("=".repeat(50));
console.log(`Total producción año 1: ${totalProduccion} bolsas`);
console.log(`Total ingresos netos: $${totalAnual.toLocaleString()}`);
console.log(`Por hermano/año: $${(totalAnual/4).toLocaleString()}`);
console.log(`Por hermano/mes promedio: $${(totalAnual/4/12).toLocaleString()}`);

// ===========================================
// RECOMENDACIÓN FINAL
// ===========================================

console.log("\n💡 RECOMENDACIÓN FINAL:");
console.log("=".repeat(60));
console.log("Con salarios reales argentinos, la única forma viable es:");
console.log("");
console.log("✅ EMPEZAR CON TRABAJO FAMILIAR");
console.log("   • Sin empleados fijos los primeros 12 meses");
console.log("   • Cada hermano dedica 2-3 días/semana");
console.log("   • Ganancias: $" + (totalAnual/4/12).toLocaleString() + "/mes por hermano");
console.log("");
console.log("✅ AGREGAR AYUDA TEMPORAL GRADUAL");
console.log("   • Por tareas específicas ($100/bolsa)");
console.log("   • Solo cuando demanda lo justifique");
console.log("   • Sin cargas sociales");
console.log("");
console.log("⚠️  EMPLEADO FIJO SOLO SI:");
console.log("   • Producción consistente >450 bolsas/mes");
console.log("   • Demanda asegurada por 12+ meses");
console.log("   • Múltiples fuentes ingreso (leña+cultivos+turismo)");
console.log("");
console.log("🎯 CONCLUSIÓN:");
console.log("El proyecto ES VIABLE, pero debe empezar como emprendimiento");
console.log("familiar y crecer orgánicamente. Los empleados vienen después,");
console.log("cuando los números lo justifiquen claramente.");

// Guardar análisis
const analisisCompleto = {
    salariosReales,
    puntosEquilibrio,
    alternativasRealistas,
    modeloHibrido,
    analisisAnual,
    recomendacion: "Trabajo familiar + ayuda temporal",
    viable: true,
    ingresoAnualFamiliar: totalAnual,
    fecha: new Date().toISOString()
};

fs.writeFileSync('analisis-empleados-vs-familiar.json', JSON.stringify(analisisCompleto, null, 2));
console.log("\n✅ Análisis guardado: analisis-empleados-vs-familiar.json");
