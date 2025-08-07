// Análisis Completo de Elementos Faltantes - El Recodo
// Investigación de costos y proyecciones financieras

const elementosFaltantes = {
    // 1. DOMOS GEODÉSICOS Y TURISMO RURAL
    domos: {
        descripcion: "Alojamiento premium geodésico",
        costosReferencia: {
            chinosImportados: {
                chico: 18000, // USD
                grande: 24000, // USD
                cambio: 1200, // ARS por USD (estimado agosto 2025)
                chicoARS: 18000 * 1200, // $21.6M ARS
                grandeARS: 24000 * 1200 // $28.8M ARS
            },
            maderaLocal: {
                factorDescuento: 0.7, // 30% más barato que importado
                chicoEstimado: 18000 * 1200 * 0.7, // $15.12M ARS
                grandeEstimado: 24000 * 1200 * 0.7, // $20.16M ARS
                ventajas: ["Materiales locales", "Mano de obra argentina", "Personalización", "Mantenimiento local"]
            }
        },
        ingresos: {
            ocupacion: 0.6, // 60% ocupación promedio anual
            diasAnio: 365,
            diasOcupados: 365 * 0.6, // 219 días
            precioPorNoche: {
                domo4personas: 180000, // $180K por noche
                domo6personas: 250000  // $250K por noche
            }
        },
        configuracionRecomendada: {
            etapa: 2, // 2026
            cantidad: {
                chicos: 3, // 4 personas c/u
                grandes: 2  // 6 personas c/u
            },
            inversion: {
                chicos: 3 * 15120000, // $45.36M
                grandes: 2 * 20160000, // $40.32M
                infraestructura: 25000000, // Senderos, servicios, etc.
                total: (3 * 15120000) + (2 * 20160000) + 25000000 // $110.68M
            }
        }
    },

    // 2. CABALLERIZAS Y CLUB ECUESTRE
    clubEcuestre: {
        descripcion: "Pensionado equino y club de equitación",
        etapa: 3, // 2027
        instalaciones: {
            caballerizas: {
                boxes: 20,
                costoPorBox: 350000, // $350K por box
                subtotal: 20 * 350000 // $7M
            },
            pistas: {
                pistaEntrenamiento: 8000000, // $8M
                pistaSalto: 12000000, // $12M
                subtotal: 20000000 // $20M
            },
            infraestructura: {
                vestuarios: 5000000,
                oficinas: 3000000,
                galpones: 8000000,
                cercado: 10000000,
                subtotal: 26000000 // $26M
            },
            totalInversion: 7000000 + 20000000 + 26000000 // $53M
        },
        ingresos: {
            pensionado: {
                boxesPorMes: 15, // 15 caballos promedio
                precioPorBox: 450000, // $450K mensual por box
                ingresosAnuales: 15 * 450000 * 12 // $81M anuales
            },
            clases: {
                alumnosPromedio: 25,
                clasesPorMes: 8,
                precioPorClase: 35000, // $35K por clase
                ingresosAnuales: 25 * 8 * 35000 * 12 // $84M anuales
            },
            eventos: {
                competencias: 6, // por año
                ingresoPorEvento: 8000000, // $8M por evento
                ingresosAnuales: 6 * 8000000 // $48M anuales
            },
            totalAnual: 81000000 + 84000000 + 48000000 // $213M anuales
        }
    },

    // 3. EDIFICIO INDUSTRIAL (Tinglado)
    edificioIndustrial: {
        descripcion: "Fábrica cerveza/gin + procesamiento leña + enfermería",
        etapa: 2, // 2026
        construccion: {
            tinglado: {
                metros2: 800,
                costoPorM2: 180000, // $180K por m2 con instalaciones
                subtotal: 800 * 180000 // $144M
            },
            divisiones: {
                fabricaCerveza: 35000000, // Equipamiento cervecero
                fabricaGin: 25000000,     // Destilería básica
                procesamientoLeña: 15000000, // Automatización
                enfermeria: 8000000,      // Equipamiento médico
                oficinas: 12000000,       // Administración
                subtotal: 95000000 // $95M
            },
            totalInversion: 144000000 + 95000000 // $239M
        },
        ingresos: {
            cerveza: {
                litrosPorMes: 5000,
                precioPorLitro: 3500, // $3.5K por litro
                ingresosAnuales: 5000 * 3500 * 12 // $210M anuales
            },
            gin: {
                litrosPorMes: 800,
                precioPorLitro: 15000, // $15K por litro
                ingresosAnuales: 800 * 15000 * 12 // $144M anuales
            },
            procesamientoLeña: {
                incrementoEficiencia: 0.4, // 40% más productivo
                ingresosAdicionales: 48000000 // $48M anuales adicionales
            },
            totalAnual: 210000000 + 144000000 + 48000000 // $402M anuales
        }
    },

    // 4. PLANTA DE PELLETS
    plantaPellets: {
        descripcion: "Paleteadora y embolsadora para pellets de alimento",
        etapa: 3, // 2027
        equipamiento: {
            paleteadora: 45000000, // $45M
            embolsadora: 18000000,  // $18M
            secadero: 25000000,     // $25M
            instalacion: 12000000,  // $12M
            totalInversion: 100000000 // $100M
        },
        materiasPrimas: {
            sobrantes: ["Alfalfa", "Maíz", "Sorgo forrajero", "Chauchas de algarrobo"],
            disponibilidadAnual: {
                alfalfa: 150, // toneladas
                maiz: 200,
                sorgo: 180,
                algarroba: 120,
                totalToneladas: 650 // toneladas anuales
            }
        },
        ingresos: {
            pellets: {
                toneladasAnuales: 650 * 0.8, // 80% conversión
                precioPorTonelada: 380000, // $380K por tonelada
                ventaExterna: 0.6, // 60% para venta, 40% uso propio
                ingresosAnuales: (650 * 0.8) * 380000 * 0.6 // $118.56M anuales
            },
            ahorroAlimento: {
                reduccionCostos: 45000000 // $45M anuales en alimento
            },
            totalBeneficio: 118560000 + 45000000 // $163.56M anuales
        }
    },

    // CÁLCULO DE IMPACTO EN CRONOGRAMA
    cronogramaActualizado: {
        2025: {
            inversionesOriginales: 9750000,
            inversionesNuevas: 0,
            totalInversiones: 9750000,
            ingresosAdicionales: 0
        },
        2026: {
            inversionesOriginales: 30500000,
            inversionesNuevas: 110680000 + 239000000, // Domos + Edificio Industrial
            totalInversiones: 380180000,
            ingresosAdicionales: 0 // Construcción
        },
        2027: {
            inversionesOriginales: 7000000,
            inversionesNuevas: 53000000 + 100000000, // Club Ecuestre + Pellets
            totalInversiones: 160000000,
            ingresosAdicionales: 213000000 + 163560000 // Club + Pellets parcial
        },
        2028: {
            inversionesOriginales: 2000000,
            inversionesNuevas: 0,
            totalInversiones: 2000000,
            ingresosAdicionales: 402000000 + 213000000 + 163560000 // Todo operativo
        }
    }
};

// SIMULADOR DE PARTICIPANTES AMPLIADO
const participantesAmpliado = {
    configuracion: {
        maxParticipantes: 10, // Ampliado a 10 participantes
        roles: [
            "Hermano 1", "Hermano 2", "Hermano 3", "Hermano 4",
            "Padre", "Madre", "Primo/a", "Amigo/a", "Inversor Externo 1", "Inversor Externo 2"
        ]
    },
    ejemploDistribucion: {
        "Hermano 1": { inversion: 15000000, participacion: 0 },
        "Hermano 2": { inversion: 12000000, participacion: 0 },
        "Hermano 3": { inversion: 10000000, participacion: 0 },
        "Hermano 4": { inversion: 8000000, participacion: 0 },
        "Padre": { inversion: 25000000, participacion: 0 },
        "Madre": { inversion: 5000000, participacion: 0 },
        "Primo/a": { inversion: 8000000, participacion: 0 },
        "Amigo/a": { inversion: 12000000, participacion: 0 },
        "Inversor Externo 1": { inversion: 30000000, participacion: 0 },
        "Inversor Externo 2": { inversion: 20000000, participacion: 0 }
    }
};

// Calcular participaciones
const totalInversion = Object.values(participantesAmpliado.ejemploDistribucion)
    .reduce((sum, p) => sum + p.inversion, 0);

Object.keys(participantesAmpliado.ejemploDistribucion).forEach(participante => {
    const inversion = participantesAmpliado.ejemploDistribucion[participante].inversion;
    participantesAmpliado.ejemploDistribucion[participante].participacion = 
        ((inversion / totalInversion) * 100).toFixed(1);
});

// NUEVO MODELO FINANCIERO COMPLETO
const modeloCompleto = {
    inversiones: {
        2025: elementosFaltantes.cronogramaActualizado[2025].totalInversiones,
        2026: elementosFaltantes.cronogramaActualizado[2026].totalInversiones,
        2027: elementosFaltantes.cronogramaActualizado[2027].totalInversiones,
        2028: elementosFaltantes.cronogramaActualizado[2028].totalInversiones,
        total: 0
    },
    ingresos: {
        2025: 38470000, // Base original
        2026: 60970000, // Base original (construcción)
        2027: 57160000 + 376560000, // Base + nuevos ingresos
        2028: 76500000 + 778560000, // Base + todos los ingresos nuevos
        total: 0
    },
    calcularTotales() {
        this.inversiones.total = Object.values(this.inversiones).slice(0, 4).reduce((a, b) => a + b, 0);
        this.ingresos.total = Object.values(this.ingresos).slice(0, 4).reduce((a, b) => a + b, 0);
    },
    calcularPayback() {
        let acumulado = 0;
        let paybackEncontrado = false;
        
        for (let año = 2025; año <= 2028; año++) {
            const flujo = this.ingresos[año] - this.inversiones[año];
            acumulado += flujo;
            
            if (acumulado > 0 && !paybackEncontrado) {
                const meses = (año - 2025 + 1) * 12;
                console.log(`Nuevo Payback: ${meses} meses (${año})`);
                paybackEncontrado = true;
                return meses;
            }
        }
        return "No se recupera en el período";
    }
};

modeloCompleto.calcularTotales();

console.log("=== ANÁLISIS DE ELEMENTOS FALTANTES ===\n");

console.log("1. 🏠 DOMOS GEODÉSICOS:");
console.log(`   Inversión: $${(elementosFaltantes.domos.configuracionRecomendada.inversion.total/1000000).toFixed(1)}M`);
console.log(`   Ingresos estimados: $${((elementosFaltantes.domos.ingresos.diasOcupados * (3 * elementosFaltantes.domos.ingresos.precioPorNoche.domo4personas + 2 * elementosFaltantes.domos.ingresos.precioPorNoche.domo6personas))/1000000).toFixed(1)}M/año`);

console.log("\n2. 🐎 CLUB ECUESTRE:");
console.log(`   Inversión: $${(elementosFaltantes.clubEcuestre.instalaciones.totalInversion/1000000).toFixed(1)}M`);
console.log(`   Ingresos: $${(elementosFaltantes.clubEcuestre.ingresos.totalAnual/1000000).toFixed(1)}M/año`);

console.log("\n3. 🏭 EDIFICIO INDUSTRIAL:");
console.log(`   Inversión: $${(elementosFaltantes.edificioIndustrial.construccion.totalInversion/1000000).toFixed(1)}M`);
console.log(`   Ingresos: $${(elementosFaltantes.edificioIndustrial.ingresos.totalAnual/1000000).toFixed(1)}M/año`);

console.log("\n4. 🌾 PLANTA PELLETS:");
console.log(`   Inversión: $${(elementosFaltantes.plantaPellets.equipamiento.totalInversion/1000000).toFixed(1)}M`);
console.log(`   Beneficio: $${(elementosFaltantes.plantaPellets.ingresos.totalBeneficio/1000000).toFixed(1)}M/año`);

console.log("\n=== MODELO FINANCIERO ACTUALIZADO ===");
console.log(`Inversión total 4 años: $${(modeloCompleto.inversiones.total/1000000).toFixed(1)}M`);
console.log(`Ingresos total 4 años: $${(modeloCompleto.ingresos.total/1000000).toFixed(1)}M`);
console.log(`Nuevo payback: ${modeloCompleto.calcularPayback()}`);

console.log("\n=== PARTICIPANTES AMPLIADO (Ejemplo) ===");
console.log(`Total inversión: $${(totalInversion/1000000).toFixed(1)}M`);
Object.entries(participantesAmpliado.ejemploDistribucion).forEach(([nombre, datos]) => {
    console.log(`${nombre}: $${(datos.inversion/1000000).toFixed(1)}M (${datos.participacion}%)`);
});
