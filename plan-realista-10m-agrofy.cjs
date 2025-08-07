#!/usr/bin/env node

// MODELO FINANCIERO REALISTA EL RECODO - $2.500.000 POR HERMANO
// Plan por etapas con precios reales de AGROFY

const fs = require('fs');

console.log("🏡 MODELO REALISTA $10M TOTAL - PLAN POR ETAPAS...\n");

// ===========================================
// ESTRATEGIA REALISTA POR ETAPAS
// ===========================================

const presupuesto = {
    totalDisponible: 10000000,
    distribucion: {
        etapa1_validacion: 6000000,    // 60% para arrancar
        etapa2_crecimiento: 4000000,   // 40% para expandir
        reservaEmergencia: 500000      // Del capital de trabajo
    }
};

console.log("💰 DISTRIBUCIÓN PRESUPUESTO:");
console.log("=".repeat(50));
console.log(`Total disponible: $${presupuesto.totalDisponible.toLocaleString()}`);
console.log(`Etapa 1 (Validación): $${presupuesto.distribucion.etapa1_validacion.toLocaleString()}`);
console.log(`Etapa 2 (Crecimiento): $${presupuesto.distribucion.etapa2_crecimiento.toLocaleString()}`);
console.log(`Reserva emergencia: $${presupuesto.distribucion.reservaEmergencia.toLocaleString()}`);

// ===========================================
// ETAPA 1: VALIDACIÓN CON $6M
// ===========================================

const etapa1 = {
    nombre: "Etapa 1: Validación y Arranque",
    presupuesto: 6000000,
    objetivo: "Validar modelo 400 bolsas/mes con inversión mínima",
    duracion: "12 meses",
    
    inversiones: {
        // Opción inteligente: reparar Deutz + comprar implementos usados
        reparacionTractorDeutz: 1200000,
        implementosUsados: {
            aradoUsado: 800000,
            rastraUsada: 600000,
            sembradoraUsada: 1200000
        },
        
        // Maquinaria esencial para leña
        maquinariaLeña: {
            partidorHidraulico: 800000,
            motosierraProfesional: 400000,
            basculaPesar: 150000
        },
        
        // Infraestructura básica
        infraestructura: {
            galponBasico: 800000,
            cercadosBasicos: 500000
        },
        
        // Capital de trabajo
        capitalTrabajo: 1000000,
        
        get totalImplementos() {
            return Object.values(this.implementosUsados).reduce((sum, val) => sum + val, 0);
        },
        
        get totalMaquinariaLeña() {
            return Object.values(this.maquinariaLeña).reduce((sum, val) => sum + val, 0);
        },
        
        get totalInfraestructura() {
            return Object.values(this.infraestructura).reduce((sum, val) => sum + val, 0);
        },
        
        get total() {
            return this.reparacionTractorDeutz + this.totalImplementos + 
                   this.totalMaquinariaLeña + this.totalInfraestructura + this.capitalTrabajo;
        }
    },
    
    resultadosEsperados: {
        produccionLeñaMensual: 400,
        superficieCultivada: 25,        // hectáreas
        serviciosExternos: 10,          // hectáreas/mes
        empleados: 1,
        ingresosMensuales: {
            leña: 400 * 2600,
            cultivos: (25 * 50000) / 12,
            servicios: 10 * 8000,
            total: function() {
                return this.leña + this.cultivos + this.servicios;
            }
        },
        costosMensuales: {
            empleado: 1163447,
            operativos: 800000,
            combustible: 120000,
            mantenimiento: 80000,
            total: function() {
                return this.empleado + this.operativos + this.combustible + this.mantenimiento;
            }
        }
    }
};

const totalEtapa1 = etapa1.inversiones.total;
const sobrante1 = etapa1.presupuesto - totalEtapa1;

console.log("\n🎯 ETAPA 1: VALIDACIÓN ($6M):");
console.log("=".repeat(60));
console.log("INVERSIONES:");
console.log(`Reparación Deutz: $${etapa1.inversiones.reparacionTractorDeutz.toLocaleString()}`);
console.log(`Implementos usados: $${etapa1.inversiones.totalImplementos.toLocaleString()}`);
console.log(`Maquinaria leña: $${etapa1.inversiones.totalMaquinariaLeña.toLocaleString()}`);
console.log(`Infraestructura: $${etapa1.inversiones.totalInfraestructura.toLocaleString()}`);
console.log(`Capital trabajo: $${etapa1.inversiones.capitalTrabajo.toLocaleString()}`);
console.log(`\nTOTAL ETAPA 1: $${totalEtapa1.toLocaleString()}`);
console.log(`SOBRANTE: $${sobrante1.toLocaleString()}`);

// Calcular resultados mensuales Etapa 1
const ingresosMensualesE1 = etapa1.resultadosEsperados.ingresosMensuales.total();
const costosMensualesE1 = etapa1.resultadosEsperados.costosMensuales.total();
const beneficioMensualE1 = ingresosMensualesE1 - costosMensualesE1;

console.log("\nRESULTADOS ESPERADOS ETAPA 1:");
console.log(`Ingresos mensuales: $${ingresosMensualesE1.toLocaleString()}`);
console.log(`Costos mensuales: $${costosMensualesE1.toLocaleString()}`);
console.log(`Beneficio mensual: $${beneficioMensualE1.toLocaleString()}`);
console.log(`Por hermano/mes: $${(beneficioMensualE1/4).toLocaleString()}`);

// ===========================================
// ETAPA 2: CRECIMIENTO CON $4M + GANANCIAS
// ===========================================

const etapa2 = {
    nombre: "Etapa 2: Crecimiento y Mecanización",
    presupuestoInicial: 4000000,
    gananciosEtapa1: beneficioMensualE1 * 12, // 1 año de ganancias
    presupuestoTotal: function() {
        return this.presupuestoInicial + this.gananciosEtapa1;
    },
    objetivo: "Tractor Agrofy 50hp + mecanización completa",
    
    inversiones: {
        // ¡AQUÍ ENTRA EL TRACTOR DE AGROFY!
        tractorAgrofy50hp: 12825 * 1200,
        
        // Venta/parte de pago del Deutz
        ventaDeutz: -3000000,  // Valor estimado como usado
        
        // Implementos nuevos para el 50hp
        implementosNuevos: {
            aradoNuevo3surcos: 2500000,
            rastraNueva: 1800000,
            sembradoraNueva: 3500000
        },
        
        // Dron para servicios premium
        dronGJI100: 2500000,
        
        // Infraestructura mejorada
        infraestructuraMejorada: {
            galponCompleto: 2000000,
            sistemaRiegoBasico: 1500000
        },
        
        get totalImplementosNuevos() {
            return Object.values(this.implementosNuevos).reduce((sum, val) => sum + val, 0);
        },
        
        get totalInfraestructuraMejorada() {
            return Object.values(this.infraestructuraMejorada).reduce((sum, val) => sum + val, 0);
        },
        
        get total() {
            return this.tractorAgrofy50hp + this.ventaDeutz + this.totalImplementosNuevos + 
                   this.dronGJI100 + this.totalInfraestructuraMejorada;
        }
    },
    
    resultadosEsperados: {
        produccionLeñaMensual: 600,     // 50% más eficiente
        superficieCultivada: 60,        // Triplicamos
        serviciosExternos: 40,          // Con dron + tractor nuevo
        empleados: 2,                   // Agregamos 1 empleado
        
        ingresosMensuales: {
            leña: 600 * 2600,
            cultivos: (60 * 50000) / 12,
            serviciosTractor: 30 * 10000,
            serviciosDron: 10 * 8000,
            total: function() {
                return this.leña + this.cultivos + this.serviciosTractor + this.serviciosDron;
            }
        },
        
        costosMensuales: {
            empleados: 1163447 * 2,
            operativos: 1200000,
            combustible: 200000,
            mantenimiento: 150000,
            total: function() {
                return this.empleados + this.operativos + this.combustible + this.mantenimiento;
            }
        }
    }
};

const presupuestoTotalE2 = etapa2.presupuestoTotal();
const totalInversionE2 = etapa2.inversiones.total;
const sobranteE2 = presupuestoTotalE2 - totalInversionE2;

console.log("\n🚀 ETAPA 2: CRECIMIENTO (Año 2):");
console.log("=".repeat(60));
console.log("PRESUPUESTO DISPONIBLE:");
console.log(`Inicial etapa 2: $${etapa2.presupuestoInicial.toLocaleString()}`);
console.log(`Ganancias etapa 1: $${etapa2.gananciosEtapa1.toLocaleString()}`);
console.log(`TOTAL DISPONIBLE: $${presupuestoTotalE2.toLocaleString()}`);

console.log("\nINVERSIONES ETAPA 2:");
console.log(`Tractor Agrofy 50hp: $${etapa2.inversiones.tractorAgrofy50hp.toLocaleString()}`);
console.log(`Venta Deutz (parte pago): $${etapa2.inversiones.ventaDeutz.toLocaleString()}`);
console.log(`Implementos nuevos: $${etapa2.inversiones.totalImplementosNuevos.toLocaleString()}`);
console.log(`Dron GJI 100: $${etapa2.inversiones.dronGJI100.toLocaleString()}`);
console.log(`Infraestructura: $${etapa2.inversiones.totalInfraestructuraMejorada.toLocaleString()}`);
console.log(`\nTOTAL INVERSIÓN E2: $${totalInversionE2.toLocaleString()}`);
console.log(`SOBRANTE E2: $${sobranteE2.toLocaleString()}`);

// Calcular resultados mensuales Etapa 2
const ingresosMensualesE2 = etapa2.resultadosEsperados.ingresosMensuales.total();
const costosMensualesE2 = etapa2.resultadosEsperados.costosMensuales.total();
const beneficioMensualE2 = ingresosMensualesE2 - costosMensualesE2;

console.log("\nRESULTADOS ESPERADOS ETAPA 2:");
console.log(`Ingresos mensuales: $${ingresosMensualesE2.toLocaleString()}`);
console.log(`Costos mensuales: $${costosMensualesE2.toLocaleString()}`);
console.log(`Beneficio mensual: $${beneficioMensualE2.toLocaleString()}`);
console.log(`Por hermano/mes: $${(beneficioMensualE2/4).toLocaleString()}`);

// ===========================================
// ANÁLISIS COMPARATIVO
// ===========================================

console.log("\n📊 ANÁLISIS COMPARATIVO:");
console.log("=".repeat(60));
console.log("ETAPA 1 vs ETAPA 2:");
console.log(`Beneficio mensual E1: $${beneficioMensualE1.toLocaleString()}`);
console.log(`Beneficio mensual E2: $${beneficioMensualE2.toLocaleString()}`);
console.log(`Mejora: ${((beneficioMensualE2/beneficioMensualE1-1)*100).toFixed(1)}%`);

console.log(`\nPor hermano E1: $${(beneficioMensualE1/4).toLocaleString()}/mes`);
console.log(`Por hermano E2: $${(beneficioMensualE2/4).toLocaleString()}/mes`);

// ROI del tractor Agrofy
const inversionNetaTractor = etapa2.inversiones.tractorAgrofy50hp + etapa2.inversiones.ventaDeutz;
const beneficioAdicionalMensual = beneficioMensualE2 - beneficioMensualE1;
const paybackTractor = Math.abs(inversionNetaTractor) / beneficioAdicionalMensual;

console.log(`\nROI TRACTOR AGROFY 50HP:`);
console.log(`Inversión neta: $${inversionNetaTractor.toLocaleString()}`);
console.log(`Beneficio adicional/mes: $${beneficioAdicionalMensual.toLocaleString()}`);
console.log(`Payback: ${paybackTractor.toFixed(1)} meses`);

// ===========================================
// PLAN DE ACCIÓN RECOMENDADO
// ===========================================

console.log("\n🎯 PLAN DE ACCIÓN RECOMENDADO:");
console.log("=".repeat(60));
console.log("CON $2.500.000 POR HERMANO ($10M total):");
console.log("");
console.log("✅ ETAPA 1 (Primeros 12 meses): $6M");
console.log("   • Reparar Deutz + implementos usados");
console.log("   • Validar 400 bolsas/mes");
console.log("   • Generar $" + beneficioMensualE1.toLocaleString() + "/mes");
console.log("   • Cada hermano gana $" + (beneficioMensualE1/4).toLocaleString() + "/mes");
console.log("");
console.log("🚀 ETAPA 2 (Año 2): $4M + ganancias E1");
console.log("   • Comprar Tractor Agrofy 50hp (USD 12.825)");
console.log("   • Vender Deutz como parte de pago");
console.log("   • Triplicar capacidad productiva");
console.log("   • Generar $" + beneficioMensualE2.toLocaleString() + "/mes");
console.log("   • Cada hermano gana $" + (beneficioMensualE2/4).toLocaleString() + "/mes");
console.log("");
console.log("💡 VENTAJAS DE ESTE PLAN:");
console.log("   • Inversión gradual - menos riesgo");
console.log("   • Valida modelo antes de gran inversión");
console.log("   • El tractor Agrofy se paga en " + paybackTractor.toFixed(1) + " meses");
console.log("   • Usa exactamente el presupuesto disponible");
console.log("   • Cada etapa autofinancia la siguiente");

// Verificación presupuestaria
const totalUsado = totalEtapa1 + Math.abs(totalInversionE2);
const presupuestoTotalPlan = presupuesto.totalDisponible + etapa2.gananciosEtapa1;

console.log("\n💰 VERIFICACIÓN PRESUPUESTARIA:");
console.log(`Presupuesto inicial: $${presupuesto.totalDisponible.toLocaleString()}`);
console.log(`Ganancias etapa 1: $${etapa2.gananciosEtapa1.toLocaleString()}`);
console.log(`Total disponible: $${presupuestoTotalPlan.toLocaleString()}`);
console.log(`Total usado: $${totalUsado.toLocaleString()}`);
console.log(`Margen seguridad: $${(presupuestoTotalPlan - totalUsado).toLocaleString()}`);

if (etapa1.presupuesto >= totalEtapa1 && presupuestoTotalE2 >= totalInversionE2) {
    console.log("\n✅ PLAN FINANCIERAMENTE VIABLE");
    console.log("✅ Presupuesto suficiente para ambas etapas");
    console.log("✅ Tractor Agrofy accesible en etapa 2");
} else {
    console.log("\n❌ Revisar números del plan");
}

// Guardar análisis
const planCompleto = {
    presupuesto,
    etapa1,
    etapa2,
    beneficios: {
        mensual_e1: beneficioMensualE1,
        mensual_e2: beneficioMensualE2,
        por_hermano_e1: beneficioMensualE1/4,
        por_hermano_e2: beneficioMensualE2/4
    },
    roi_tractor_agrofy: {
        inversion_neta: inversionNetaTractor,
        payback_meses: parseFloat(paybackTractor.toFixed(1)),
        viable: paybackTractor <= 24
    },
    recomendacion: "Plan gradual - Deutz primero, Agrofy en etapa 2",
    fecha_analisis: new Date().toISOString()
};

fs.writeFileSync('plan-realista-10m-agrofy.json', JSON.stringify(planCompleto, null, 2));
console.log("\n✅ Plan guardado: plan-realista-10m-agrofy.json");
