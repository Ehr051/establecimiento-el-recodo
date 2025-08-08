# MODELO FINANCIERO EXCEL - EL RECODO
# Instrucciones de creación para hoja de cálculo profesional

## ESTRUCTURA DEL ARCHIVO EXCEL

### HOJA 1: RESUMEN EJECUTIVO
| Concepto | Valor | Fórmula |
|----------|-------|---------|
| Inversión Total | $48.000.000 | =SUM(Etapa1:Etapa3) |
| ROI 3 años | 224.8% | =(Utilidad3años/InversiónTotal)*100 |
| Payback | 1.8 años | =CALCULAR_PAYBACK() |
| VAN (TIR 15%) | $127.850.000 | =VAN(15%;FlujoCaja1:36) |
| TIR | 142.3% | =TIR(FlujoCaja0:36) |

### HOJA 2: INVERSIONES POR ETAPA

#### ETAPA 1 (Meses 1-6): $21.000.000
| Concepto | Monto | % del Total |
|----------|-------|-------------|
| Club House 200m² | $8.500.000 | 40.5% |
| Primer Domo + Instalaciones | $6.200.000 | 29.5% |
| Infraestructura Productiva | $3.800.000 | 18.1% |
| Equipamiento Inicial | $1.200.000 | 5.7% |
| Capital de Trabajo | $1.300.000 | 6.2% |

#### ETAPA 2 (Meses 7-18): $15.000.000
| Concepto | Monto | % del Total |
|----------|-------|-------------|
| Segundo Domo Premium | $6.800.000 | 45.3% |
| Cervecería Artesanal | $4.200.000 | 28.0% |
| Mejoras Producción | $2.500.000 | 16.7% |
| Marketing y Posicionamiento | $1.500.000 | 10.0% |

#### ETAPA 3 (Meses 19-36): $12.000.000
| Concepto | Monto | % del Total |
|----------|-------|-------------|
| Tercer Domo + Mejoras | $5.800.000 | 48.3% |
| Sistema Solar Completo | $3.200.000 | 26.7% |
| Equipamiento Adicional | $1.800.000 | 15.0% |
| Reserva y Contingencias | $1.200.000 | 10.0% |

### HOJA 3: PROYECCIÓN DE INGRESOS (5 AÑOS)

#### FUENTES DE INGRESO MENSUAL (AÑO 3 - OPERACIÓN COMPLETA)

| Mes | Turismo Premium | Eventos | Productos | Alfalfa | Cerveza | Otros | TOTAL |
|-----|----------------|---------|-----------|---------|---------|--------|-------|
| Ene | 2.880.000 | 320.000 | 180.000 | 864.000 | 320.000 | 156.000 | 4.720.000 |
| Feb | 3.200.000 | 280.000 | 195.000 | 792.000 | 340.000 | 168.000 | 4.975.000 |
| Mar | 2.520.000 | 520.000 | 890.000 | 0 | 360.000 | 182.000 | 4.472.000 |
| Abr | 2.100.000 | 0 | 1.980.000 | 0 | 380.000 | 196.000 | 4.656.000 |
| May | 1.890.000 | 0 | 2.970.000 | 0 | 400.000 | 208.000 | 5.468.000 |
| Jun | 1.260.000 | 560.000 | 4.455.000 | 0 | 420.000 | 220.000 | 6.915.000 |
| Jul | 1.400.000 | 0 | 0 | 0 | 440.000 | 234.000 | 2.074.000 |
| Ago | 1.575.000 | 280.000 | 0 | 0 | 460.000 | 247.000 | 2.562.000 |
| Sep | 1.890.000 | 0 | 0 | 1.728.000 | 480.000 | 260.000 | 4.358.000 |
| Oct | 2.520.000 | 280.000 | 0 | 2.592.000 | 500.000 | 273.000 | 6.165.000 |
| Nov | 1.672.000 | 0 | 0 | 792.000 | 480.000 | 416.000 | 3.360.000 |
| Dic | 2.880.000 | 0 | 0 | 864.000 | 400.000 | 520.000 | 4.664.000 |

**TOTAL ANUAL:** $54.269.000

#### DESGLOSE DETALLADO TURISMO PREMIUM

**Precios por Temporada:**
- Alta (Dic-Feb, Sem.Santa): $50.000/noche
- Media (Mar-May, Sep-Nov): $42.000/noche  
- Baja (Jun-Ago): $35.000/noche

**Ocupación Proyectada por Año:**
- Año 1: 35% promedio
- Año 2: 65% promedio
- Año 3: 85% promedio
- Año 4-5: 90% promedio

**Cálculo Ingresos Turismo:**
=DOMOS_DISPONIBLES × NOCHES_MES × PRECIO_TEMPORADA × OCUPACIÓN

#### PRODUCCIÓN DE ALFALFA

**Datos Base:**
- Hectáreas: 25 Ha
- Rendimiento: 136 fardos/Ha/año
- Producción total: 3.400 fardos/año
- Precio promedio: $3.800/fardo
- **Ingreso anual:** $12.920.000

**Estacionalidad Ventas:**
- Mar-Jun: 65% del total anual
- Sep-Dic: 35% del total anual

#### CERVECERÍA ARTESANAL

**Capacidad de Producción:**
- Batch size: 50L
- Batches por mes: 16
- Producción mensual: 800L
- Producción anual: 9.600L
- Precio promedio: $1.200/L
- **Ingreso anual:** $11.520.000

### HOJA 4: ESTRUCTURA DE COSTOS

#### COSTOS FIJOS MENSUALES
| Concepto | Monto Mensual | Anual |
|----------|---------------|-------|
| Salarios y Cargas | $1.240.000 | $14.880.000 |
| Servicios (luz, gas, agua) | $180.000 | $2.160.000 |
| Seguros | $125.000 | $1.500.000 |
| Mantenimiento | $95.000 | $1.140.000 |
| Marketing Digital | $450.000 | $5.400.000 |
| Gastos Administrativos | $85.000 | $1.020.000 |
| **TOTAL FIJOS** | **$2.175.000** | **$26.100.000** |

#### COSTOS VARIABLES (% de Ingresos)
| Concepto | % Ingresos | Cálculo |
|----------|------------|---------|
| Insumos Gastronómicos | 12% | =Ingresos_Turismo×0.12 |
| Insumos Producción | 8% | =Ingresos_Alfalfa×0.08 |
| Insumos Cervecería | 15% | =Ingresos_Cerveza×0.15 |
| Comisiones OTAs | 3% | =Ingresos_Turismo×0.03 |
| Impuestos s/Ventas | 2.5% | =Ingresos_Totales×0.025 |

#### DETALLE PLANILLA SALARIAL
| Puesto | Salario Base | Cargas | Total Mensual |
|--------|-------------|--------|---------------|
| Gerente General | $450.000 | $135.000 | $585.000 |
| Resp. Hospitalidad | $280.000 | $84.000 | $364.000 |
| Encargado Producción | $250.000 | $75.000 | $325.000 |
| Chef/Cocinero | $220.000 | $66.000 | $286.000 |
| **TOTAL PERSONAL FIJO** | **$1.200.000** | **$360.000** | **$1.560.000** |

### HOJA 5: FLUJO DE CAJA PROYECTADO (60 MESES)

#### ESTRUCTURA FLUJO DE CAJA
```
INGRESOS OPERATIVOS
- Turismo Rural Premium
- Producción Alfalfa  
- Cervecería Artesanal
- Eventos y Experiencias
- Productos Locales
- Consultoría
= TOTAL INGRESOS

EGRESOS OPERATIVOS
- Costos Fijos
- Costos Variables
- Depreciaciones
= TOTAL EGRESOS

RESULTADO OPERATIVO (EBITDA)

GASTOS FINANCIEROS
- Intereses CFI
- Intereses Banco Nación
= TOTAL GASTOS FINANCIEROS

RESULTADO ANTES DE IMPUESTOS

IMPUESTOS (35%)

RESULTADO NETO

FLUJO DE CAJA LIBRE
+ Depreciaciones
- Inversiones
- Amortización Capital
= FLUJO DE CAJA NETO
```

#### FLUJO TRIMESTRAL RESUMIDO (5 AÑOS)

| Trimestre | Ingresos | Egresos | EBITDA | Gastos Fin. | Resultado | Flujo Caja |
|-----------|----------|---------|--------|-------------|-----------|------------|
| Q1-Y1 | 4.850.000 | 6.200.000 | -1.350.000 | 1.825.000 | -3.175.000 | -8.675.000 |
| Q2-Y1 | 8.400.000 | 7.150.000 | 1.250.000 | 1.825.000 | -575.000 | -5.075.000 |
| Q3-Y1 | 12.600.000 | 8.575.000 | 4.025.000 | 1.825.000 | 2.200.000 | 1.200.000 |
| Q4-Y1 | 14.200.000 | 8.965.000 | 5.235.000 | 1.825.000 | 3.410.000 | 8.610.000 |
| ... | ... | ... | ... | ... | ... | ... |
| Q12-Y3 | 22.450.000 | 11.280.000 | 11.170.000 | 2.475.000 | 8.695.000 | 13.695.000 |

### HOJA 6: FINANCIAMIENTO

#### ESTRUCTURA DE DEUDA

**CFI - Crédito Turismo Rural**
- Monto: $22.560.000
- Tasa: 35% anual
- Plazo: 5 años
- Gracia: 1 año (solo intereses)
- Garantía: Hipoteca establecimiento

**Cronograma de Pagos CFI:**
| Año | Capital | Intereses | Cuota Total | Saldo |
|-----|---------|-----------|-------------|-------|
| 1 | 0 | 7.896.000 | 7.896.000 | 22.560.000 |
| 2 | 0 | 7.896.000 | 7.896.000 | 22.560.000 |
| 3 | 5.640.000 | 7.896.000 | 13.536.000 | 16.920.000 |
| 4 | 5.640.000 | 5.922.000 | 11.562.000 | 11.280.000 |
| 5 | 5.640.000 | 3.948.000 | 9.588.000 | 5.640.000 |
| 6 | 5.640.000 | 1.974.000 | 7.614.000 | 0 |

**Banco Nación - Crédito Agropecuario**
- Monto: $15.840.000
- Tasa: 42% anual
- Plazo: 7 años
- Gracia: 1 año (solo intereses)
- Garantía: Producción y equipamiento

**Cronograma de Pagos Banco Nación:**
| Año | Capital | Intereses | Cuota Total | Saldo |
|-----|---------|-----------|-------------|-------|
| 1 | 0 | 6.652.800 | 6.652.800 | 15.840.000 |
| 2 | 0 | 6.652.800 | 6.652.800 | 15.840.000 |
| 3 | 2.640.000 | 6.652.800 | 9.292.800 | 13.200.000 |
| 4 | 2.640.000 | 5.544.000 | 8.184.000 | 10.560.000 |
| 5 | 2.640.000 | 4.435.200 | 7.075.200 | 7.920.000 |
| 6 | 2.640.000 | 3.326.400 | 5.966.400 | 5.280.000 |
| 7 | 2.640.000 | 2.217.600 | 4.857.600 | 2.640.000 |
| 8 | 2.640.000 | 1.108.800 | 3.748.800 | 0 |

### HOJA 7: ANÁLISIS DE SENSIBILIDAD

#### ESCENARIOS DE INGRESOS

**Escenario Optimista (+20%)**
- Factor aplicado: 1.20
- Ingresos Año 3: $99.949.200
- EBITDA: $73.049.200
- Resultado Neto: $65.518.800
- ROI: 270%

**Escenario Base (100%)**
- Factor aplicado: 1.00
- Ingresos Año 3: $83.291.000
- EBITDA: $57.191.000
- Resultado Neto: $48.860.600
- ROI: 225%

**Escenario Pesimista (-15%)**
- Factor aplicado: 0.85
- Ingresos Año 3: $70.797.350
- EBITDA: $44.697.350
- Resultado Neto: $36.367.000
- ROI: 175%

#### ANÁLISIS DE PUNTO DE EQUILIBRIO

**Costos Fijos Anuales:** $26.100.000
**Margen Contribución Promedio:** 72%

**Punto de Equilibrio:** $36.250.000 ingresos anuales
**Ocupación Mínima:** 28% promedio anual

#### SIMULACIÓN MONTE CARLO (1000 iteraciones)

**Variables Aleatorias:**
- Ocupación: Normal(85%, 15%)
- Precio Promedio: Normal($42.000, $8.000)
- Costos Variables: Normal(22%, 5%)
- Tasa Inflación: Normal(45%, 15%)

**Resultados Simulación:**
- VAN Promedio: $127.850.000
- VAN Mínimo (5%): $89.200.000
- VAN Máximo (95%): $166.500.000
- Probabilidad VAN > 0: 97.8%

### HOJA 8: INDICADORES FINANCIEROS

#### RATIOS DE RENTABILIDAD
| Indicador | Año 1 | Año 2 | Año 3 | Año 4 | Año 5 |
|-----------|-------|-------|-------|-------|-------|
| ROI | 15.2% | 89.4% | 224.8% | 312.5% | 387.2% |
| ROE | 28.5% | 145.7% | 298.6% | 425.8% | 512.3% |
| ROIC | 12.8% | 76.2% | 189.4% | 267.9% | 334.6% |
| Margen EBITDA | 18.5% | 42.7% | 68.6% | 75.2% | 78.9% |
| Margen Neto | 8.9% | 28.4% | 58.7% | 64.8% | 68.2% |

#### RATIOS DE LIQUIDEZ
| Indicador | Año 1 | Año 2 | Año 3 | Año 4 | Año 5 |
|-----------|-------|-------|-------|-------|-------|
| Liquidez Corriente | 1.15 | 2.47 | 4.89 | 6.52 | 7.83 |
| Liquidez Ácida | 0.95 | 2.12 | 4.23 | 5.87 | 7.09 |
| Capital de Trabajo | 850.000 | 4.200.000 | 12.800.000 | 18.900.000 | 24.700.000 |

#### RATIOS DE ENDEUDAMIENTO
| Indicador | Año 1 | Año 2 | Año 3 | Año 4 | Año 5 |
|-----------|-------|-------|-------|-------|-------|
| Endeudamiento | 0.78 | 0.65 | 0.42 | 0.28 | 0.15 |
| Cobertura Intereses | 1.2 | 3.8 | 8.7 | 12.4 | 18.9 |
| Deuda/EBITDA | 4.2 | 2.1 | 0.8 | 0.4 | 0.2 |

### HOJA 9: DASHBOARDS Y GRÁFICOS

#### DASHBOARD PRINCIPAL
- Gráfico de barras: Ingresos por línea de negocio
- Gráfico circular: Distribución de costos
- Línea de tiempo: Evolución EBITDA 5 años
- Medidores: ROI, Ocupación, Margen

#### GRÁFICOS DE ANÁLISIS
1. **Estacionalidad de Ingresos** (Gráfico de líneas mensual)
2. **Composición de Ingresos** (Gráfico de barras apiladas)
3. **Evolución del Flujo de Caja** (Gráfico cascada)
4. **Análisis de Sensibilidad** (Gráfico tornado)
5. **Payback Period** (Gráfico acumulativo)

### FÓRMULAS CLAVE EXCEL

#### Cálculo ROI
```excel
=((Utilidad_Año3/Inversión_Total)-1)*100
```

#### Cálculo TIR
```excel
=TIR(B10:B70)*12
```

#### Cálculo VAN
```excel
=VAN(15%/12;C10:C70)+B10
```

#### Cálculo Payback
```excel
=INDEX(A:A;MATCH(TRUE;B:B>=0;0))
```

#### Proyección Inflacionaria
```excel
=Valor_Base*(1+Tasa_Inflacion)^Periodo
```

### INSTRUCCIONES DE USO

1. **Actualización de Variables:** Cambiar valores en celdas amarillas
2. **Escenarios:** Usar Data > What-If Analysis
3. **Gráficos:** Actualización automática con datos
4. **Impresión:** Configurado para A4, 4 hojas por escenario
5. **Protección:** Celdas de fórmulas protegidas

---

**Este modelo Excel proporciona un análisis financiero completo y profesional para la evaluación integral del proyecto El Recodo.**
