#!/usr/bin/env node

/**
 * MODELO FINANCIERO DETALLADO POR ETAPAS Y AÑOS - EL RECODO
 * Incluye desglose completo de gastos y proyecciones realistas
 */

const fs = require('fs');

// ESTRUCTURA DE ETAPAS Y CRONOGRAMA
const cronograma = {
    "Año 1": {
        "Etapa 1 (Meses 1-6)": {
            inversion: 21000000,
            descripcion: "Club House + Primer Domo + Infraestructura básica",
            activos: ["Club House", "Domo 1", "Accesos", "Servicios básicos"]
        },
        "Etapa 2A (Meses 7-12)": {
            inversion: 8000000,
            descripcion: "Inicio Segundo Domo + Preparación terreno alfalfa",
            activos: ["Domo 2 (50%)", "Preparación 25 hectáreas", "Maquinaria básica"]
        }
    },
    "Año 2": {
        "Etapa 2B (Meses 13-18)": {
            inversion: 7000000,
            descripcion: "Finalización Domo 2 + Cervecería + Siembra",
            activos: ["Domo 2 (100%)", "Cervecería", "Primera siembra alfalfa"]
        },
        "Etapa 3A (Meses 19-24)": {
            inversion: 6000000,
            descripcion: "Tercer Domo + Sistema solar básico",
            activos: ["Domo 3", "Paneles solares 50kW", "Optimización energética"]
        }
    },
    "Año 3": {
        "Etapa 3B (Meses 25-36)": {
            inversion: 6000000,
            descripcion: "Consolidación + Ganadería + Infraestructura final",
            activos: ["Feedlot bovino", "Sistema cama profunda cerdos", "Instalaciones caprinas"]
        }
    }
};

// DESGLOSE DETALLADO DE GASTOS OPERATIVOS ANUALES
const gastosOperativos = {
    sueldos: {
        "Peón rural permanente (2)": 891530 * 12 * 2, // Actualizado agosto 2025
        "Encargado/Capataz": 1200000 * 12,
        "Personal temporario turismo": 600000 * 8, // 8 meses temporada
        "Administrativo part-time": 800000 * 12,
        "Total sueldos": 0
    },
    impuestos: {
        "Cargas sociales (30%)": 0, // Se calcula sobre sueldos
        "Ingresos Brutos (2.5%)": 0, // Se calcula sobre ingresos
        "IVA diferencial": 800000,
        "Impuesto inmobiliario": 450000,
        "Patentes vehículos": 280000,
        "Total impuestos": 0
    },
    insumos_agricolas: {
        "Semillas alfalfa (25 ha)": 650000,
        "Fertilizantes NPK": 890000,
        "Insecticidas/herbicidas": 420000,
        "Correctores de suelo": 380000,
        "Inoculantes": 180000,
        "Total insumos agrícolas": 0
    },
    insumos_ganaderia: {
        "Alimento balanceado bovinos": 1200000,
        "Suplementos nutricionales": 450000,
        "Medicamentos veterinarios": 380000,
        "Vacunas obligatorias": 220000,
        "Sal mineral": 180000,
        "Total insumos ganadería": 0
    },
    combustibles: {
        "Gasoil maquinaria": 850000,
        "Nafta vehículos": 420000,
        "GLP cocina/calefacción": 380000,
        "Total combustibles": 0
    },
    maquinaria_herramientas: {
        "Mantenimiento tractor": 450000,
        "Reparaciones implementos": 280000,
        "Herramientas menores": 180000,
        "Repuestos maquinaria": 320000,
        "Total maquinaria": 0
    },
    servicios: {
        "Energía eléctrica": 650000,
        "Agua potable": 280000,
        "Internet/telefonía": 180000,
        "Seguros": 850000,
        "Mantenimiento general": 420000,
        "Total servicios": 0
    },
    insumos_cerveceria: {
        "Malta": 380000,
        "Lúpulo": 280000,
        "Levaduras": 120000,
        "Envases/etiquetas": 220000,
        "Total cervecería": 0
    },
    insumos_turismo: {
        "Limpieza domos": 180000,
        "Ropa de cama": 150000,
        "Productos amenities": 80000,
        "Mantenimiento domos": 280000,
        "Total turismo": 0
    }
};

// CALCULAR TOTALES
function calcularTotales() {
    // Calcular sueldos
    gastosOperativos.sueldos["Total sueldos"] = 
        gastosOperativos.sueldos["Peón rural permanente (2)"] +
        gastosOperativos.sueldos["Encargado/Capataz"] +
        gastosOperativos.sueldos["Personal temporario turismo"] +
        gastosOperativos.sueldos["Administrativo part-time"];

    // Calcular impuestos
    gastosOperativos.impuestos["Cargas sociales (30%)"] = gastosOperativos.sueldos["Total sueldos"] * 0.30;
    gastosOperativos.impuestos["Total impuestos"] = 
        gastosOperativos.impuestos["Cargas sociales (30%)"] +
        gastosOperativos.impuestos["IVA diferencial"] +
        gastosOperativos.impuestos["Impuesto inmobiliario"] +
        gastosOperativos.impuestos["Patentes vehículos"];

    // Calcular totales por categoría
    Object.keys(gastosOperativos).forEach(categoria => {
        if (categoria !== 'sueldos' && categoria !== 'impuestos') {
            gastosOperativos[categoria]["Total " + categoria.replace('_', ' ')] = 
                Object.keys(gastosOperativos[categoria])
                    .filter(key => !key.startsWith('Total'))
                    .reduce((sum, key) => sum + gastosOperativos[categoria][key], 0);
        }
    });
}

// PROYECCIONES DE INGRESOS POR ETAPA
const ingresosProyectados = {
    "Año 1": {
        "Etapa 1": {
            "Turismo (1 domo, 6 meses)": 8400000,
            "Eventos privados": 1200000,
            "Total": 9600000
        },
        "Etapa 2A": {
            "Turismo (1.5 domos promedio)": 14000000,
            "Eventos privados": 1800000,
            "Total": 15800000
        },
        "Total Año 1": 25400000
    },
    "Año 2": {
        "Etapa 2B": {
            "Turismo (2 domos)": 26000000,
            "Alfalfa (primera cosecha parcial)": 4500000,
            "Cerveza artesanal": 2800000,
            "Eventos privados": 2400000,
            "Total": 35700000
        },
        "Etapa 3A": {
            "Turismo (3 domos)": 38000000,
            "Alfalfa (cosecha completa)": 12900000,
            "Cerveza artesanal": 4200000,
            "Eventos privados": 3200000,
            "Total": 58300000
        },
        "Total Año 2": 94000000
    },
    "Año 3": {
        "Consolidación": {
            "Turismo (3 domos optimizado)": 45000000,
            "Alfalfa (producción estabilizada)": 12900000,
            "Cerveza artesanal": 5800000,
            "Ganadería (feedlot/cerdos)": 8500000,
            "Eventos privados": 4200000,
            "Productos artesanales": 1500000,
            "Total": 77900000
        }
    }
};

// GENERAR REPORTE
function generarReporte() {
    calcularTotales();
    
    const reporte = {
        fecha_actualizacion: new Date().toISOString().split('T')[0],
        cronograma_inversiones: cronograma,
        gastos_operativos_anuales: gastosOperativos,
        proyecciones_ingresos: ingresosProyectados,
        resumen_financiero: {
            inversion_total: 48000000,
            gastos_operativos_anuales: Object.keys(gastosOperativos)
                .reduce((total, cat) => {
                    const catTotal = Object.keys(gastosOperativos[cat])
                        .filter(key => key.startsWith('Total'))
                        .reduce((sum, key) => sum + gastosOperativos[cat][key], 0);
                    return total + catTotal;
                }, 0),
            ingresos_ano_3: ingresosProyectados["Año 3"]["Consolidación"]["Total"],
            margen_operativo: 0,
            roi_proyectado: 0
        }
    };

    // Calcular margen y ROI
    reporte.resumen_financiero.margen_operativo = 
        reporte.resumen_financiero.ingresos_ano_3 - reporte.resumen_financiero.gastos_operativos_anuales;
    
    reporte.resumen_financiero.roi_proyectado = 
        (reporte.resumen_financiero.margen_operativo / reporte.resumen_financiero.inversion_total) * 100;

    return reporte;
}

// GENERAR Y GUARDAR
const reporte = generarReporte();

// Guardar como JSON
fs.writeFileSync('modelo-financiero-detallado.json', JSON.stringify(reporte, null, 2));

// Generar CSV para Excel
function generarCSV() {
    let csv = "MODELO FINANCIERO DETALLADO - EL RECODO\n";
    csv += `Fecha de actualización: ${reporte.fecha_actualizacion}\n\n`;
    
    // Cronograma de inversiones
    csv += "CRONOGRAMA DE INVERSIONES\n";
    csv += "Año,Etapa,Período,Inversión,Descripción\n";
    
    Object.keys(reporte.cronograma_inversiones).forEach(ano => {
        Object.keys(reporte.cronograma_inversiones[ano]).forEach(etapa => {
            const datos = reporte.cronograma_inversiones[ano][etapa];
            csv += `${ano},${etapa},"${datos.descripcion}",${datos.inversion}\n`;
        });
    });
    
    csv += "\nGASTOS OPERATIVOS ANUALES\n";
    csv += "Categoría,Concepto,Monto Anual\n";
    
    Object.keys(reporte.gastos_operativos_anuales).forEach(categoria => {
        Object.keys(reporte.gastos_operativos_anuales[categoria]).forEach(concepto => {
            const monto = reporte.gastos_operativos_anuales[categoria][concepto];
            csv += `${categoria.replace('_', ' ')},${concepto},${monto}\n`;
        });
    });
    
    return csv;
}

fs.writeFileSync('modelo-financiero-detallado.csv', generarCSV());

console.log('✅ Modelo financiero detallado generado:');
console.log('📄 modelo-financiero-detallado.json');
console.log('📊 modelo-financiero-detallado.csv');
console.log('\n📊 RESUMEN:');
console.log(`💰 Inversión Total: $${reporte.resumen_financiero.inversion_total.toLocaleString()}`);
console.log(`💸 Gastos Operativos Anuales: $${reporte.resumen_financiero.gastos_operativos_anuales.toLocaleString()}`);
console.log(`📈 Ingresos Año 3: $${reporte.resumen_financiero.ingresos_ano_3.toLocaleString()}`);
console.log(`💵 Margen Operativo: $${reporte.resumen_financiero.margen_operativo.toLocaleString()}`);
console.log(`📊 ROI Proyectado: ${reporte.resumen_financiero.roi_proyectado.toFixed(1)}%`);
