// Cálculo de Payback Realista El Recodo
// Basado en modelo financiero 2025-2028

const modeloRealista = {
    // Inversión inicial requerida (total para arrancar)
    inversionInicial: 9750000, // $9.75M para 2025
    
    // Flujo anual proyectado
    flujoAnual: {
        2025: 7540000,   // $7.54M neto
        2026: -16630000, // -$16.63M (año de inversión fuerte)
        2027: -2800000,  // -$2.80M (última inversión)
        2028: 23940000   // $23.94M (éxito total)
    },
    
    // Cálculo de payback acumulado
    calcularPayback() {
        let acumulado = -this.inversionInicial;
        let meses = 0;
        
        console.log("=== ANÁLISIS DE PAYBACK REALISTA ===\n");
        console.log(`Inversión inicial: $${(this.inversionInicial/1000000).toFixed(2)}M`);
        console.log("Flujo acumulado por año:\n");
        
        for (let año = 2025; año <= 2028; año++) {
            const flujoAnual = this.flujoAnual[año];
            acumulado += flujoAnual;
            meses += 12;
            
            console.log(`${año}: Flujo $${(flujoAnual/1000000).toFixed(2)}M | Acumulado: $${(acumulado/1000000).toFixed(2)}M | Meses: ${meses}`);
            
            if (acumulado > 0 && this.paybackEncontrado === undefined) {
                // Interpolación para encontrar el mes exacto
                const flujoMensual = flujoAnual / 12;
                const exceso = acumulado;
                const mesesExactos = meses - (exceso / flujoMensual);
                
                this.paybackEncontrado = mesesExactos;
                console.log(`\n🎯 PAYBACK ENCONTRADO: ${mesesExactos.toFixed(1)} meses (${(mesesExactos/12).toFixed(1)} años)`);
            }
        }
        
        return this.paybackEncontrado || "No se recupera en 4 años";
    },
    
    // Análisis de ROI por período
    calcularROI() {
        const flujoTotal4Anos = Object.values(this.flujoAnual).reduce((a, b) => a + b, 0);
        const roi4Anos = (flujoTotal4Anos / this.inversionInicial) * 100;
        const roiAnual = roi4Anos / 4;
        
        console.log("\n=== ANÁLISIS DE ROI ===");
        console.log(`Flujo total 4 años: $${(flujoTotal4Anos/1000000).toFixed(2)}M`);
        console.log(`ROI 4 años: ${roi4Anos.toFixed(1)}%`);
        console.log(`ROI promedio anual: ${roiAnual.toFixed(1)}%`);
        
        return { roi4Anos, roiAnual };
    },
    
    // Análisis de recuperación con reinversión vs retiro
    analizarEscenarios() {
        console.log("\n=== ANÁLISIS DE ESCENARIOS POST-PAYBACK ===");
        
        // Escenario 1: Retiro de ganancias
        console.log("\n📤 ESCENARIO RETIRO:");
        console.log("- A partir de 2028: $23.94M anuales de flujo libre");
        console.log("- Sin nuevas inversiones");
        console.log("- Ganancia estable por hermano: $5.98M/año");
        
        // Escenario 2: Reinversión
        console.log("\n🔄 ESCENARIO REINVERSIÓN:");
        console.log("- Reinvertir 50% de ganancias 2028 = $11.97M");
        console.log("- Proyección: Aumentar flujo 30% = $31.12M en 2029");
        console.log("- Ganancia con crecimiento por hermano: $7.78M/año");
        console.log("- Tiempo adicional payback reinversión: 6 meses");
        
        return {
            retiro: { gananciaAnual: 23940000, porHermano: 5985000 },
            reinversion: { 
                reinversion: 11970000, 
                flujoNuevo: 31122000, 
                porHermano: 7780500,
                paybackAdicional: 6
            }
        };
    }
};

// Ejecutar análisis
const payback = modeloRealista.calcularPayback();
const roi = modeloRealista.calcularROI();
const escenarios = modeloRealista.analizarEscenarios();

console.log("\n=== RESUMEN PARA WEBSITE ===");
console.log(`Payback: ${payback} meses`);
console.log(`ROI anual: ${roi.roiAnual.toFixed(1)}%`);
console.log(`Ganancia post-payback (retiro): $${(escenarios.retiro.porHermano/1000000).toFixed(2)}M por hermano`);
console.log(`Ganancia post-payback (reinversión): $${(escenarios.reinversion.porHermano/1000000).toFixed(2)}M por hermano`);
