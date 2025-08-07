// CÁLCULO RÁPIDO LEÑA REALISTA

console.log("🪵 LEÑA - NÚMEROS REALISTAS\n");

// PRODUCCIÓN
const bolsasPorSemana = 100;
const bolsasPorMes = bolsasPorSemana * 4.3; // 430 bolsas/mes
const horasPorDia = 2; // 1h corte + 1h embolsado

console.log("PRODUCCIÓN:");
console.log(`Bolsas por semana: ${bolsasPorSemana}`);
console.log(`Bolsas por mes: ${Math.round(bolsasPorMes)}`);
console.log(`Horas por día dedicadas: ${horasPorDia}h`);

// PRECIOS Y VENTAS
const precioDirecto = 4000;
const precioMayorista = 1100; // promedio 1000-1200
const porcentajeDirecto = 0.50;
const porcentajeMayorista = 0.50;

const ventaDirecta = Math.round(bolsasPorMes * porcentajeDirecto);
const ventaMayorista = Math.round(bolsasPorMes * porcentajeMayorista);

const ingresoDirecto = ventaDirecta * precioDirecto;
const ingresoMayorista = ventaMayorista * precioMayorista;
const ingresoTotal = ingresoDirecto + ingresoMayorista;

console.log("\nVENTAS:");
console.log(`Venta directa: ${ventaDirecta} bolsas × $${precioDirecto} = $${ingresoDirecto.toLocaleString()}`);
console.log(`Venta mayorista: ${ventaMayorista} bolsas × $${precioMayorista} = $${ingresoMayorista.toLocaleString()}`);
console.log(`INGRESO MENSUAL: $${ingresoTotal.toLocaleString()}`);
console.log(`INGRESO ANUAL: $${(ingresoTotal * 12).toLocaleString()}`);

// OTROS INGRESOS
const ganaderia = 100 * 180000; // 100 cabezas
const alfalfa = 4 * 285000 * 0.6; // 4 ha × 60% venta
const cebada = 2 * 380000 * 0.85; // 2 ha × precio hermano

const ingresoTotalAnual = (ingresoTotal * 12) + ganaderia + alfalfa + cebada;

console.log("\nOTROS INGRESOS ANUALES:");
console.log(`Ganadería (100 cabezas): $${ganaderia.toLocaleString()}`);
console.log(`Alfalfa (4 ha, 60% venta): $${alfalfa.toLocaleString()}`);
console.log(`Cebada hermano (2 ha): $${cebada.toLocaleString()}`);
console.log(`TOTAL INGRESOS ANUALES: $${ingresoTotalAnual.toLocaleString()}`);

// COSTOS
const empleado = (891530 + 891530 * 0.305) * 12; // Con cargas sociales
const operativos = 200000 * 12; // Combustible, veterinario, etc.
const impuestos = 180000 * 12;
const varios = 150000 * 12;

const costosTotal = empleado + operativos + impuestos + varios;
const resultado = ingresoTotalAnual - costosTotal;

console.log("\nCOSTOS ANUALES:");
console.log(`Empleado 1 (con cargas): $${empleado.toLocaleString()}`);
console.log(`Operativos: $${operativos.toLocaleString()}`);
console.log(`Impuestos: $${impuestos.toLocaleString()}`);
console.log(`Varios: $${varios.toLocaleString()}`);
console.log(`TOTAL COSTOS: $${costosTotal.toLocaleString()}`);

console.log("\nRESULTADO:");
console.log(`Resultado anual: $${resultado.toLocaleString()}`);
console.log(`Resultado por hermano: $${Math.round(resultado/4).toLocaleString()}`);

// INVERSIÓN
const inversionTotal = 10000000; // Estimado realista
const inversionPorHermano = inversionTotal / 4;
const roi = (resultado / 4) / inversionPorHermano * 100;

console.log(`\nINVERSIÓN Y ROI:`);
console.log(`Inversión por hermano: $${inversionPorHermano.toLocaleString()}`);
console.log(`ROI anual: ${roi.toFixed(1)}%`);
console.log(`ROI 24 meses: ${(roi * 2).toFixed(1)}%`);
