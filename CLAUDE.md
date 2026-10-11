# Finanzas Familia Díaz González — notas para seguir trabajando

App estática (`index.html`, v8.7) en GitHub Pages: control financiero de Emmanuel y Elibel (gastos por mes y categoría,
nóminas, créditos, tarjetas, ahorro de los niños, «A mi favor», jubilación CASS).

- Datos: Firestore `appdata/familia-diaz-gonzalez` (mismo proyecto que el calendario). Casi todos los campos son
  **JSON guardado como texto** (`meses`, `creditos`, `tarjetas`, `ninos`, `otrosIngresos`, `nominasEditadas`…);
  `saldoCuenta` y `tarjetaConsumo` son números. Copias automáticas en `appdata/backup-AAAA-MM-DD`.
- La app escribe todos los campos a la vez (`syncToCloud`, `set` + `merge`) y recarga cuando cambian desde otro
  dispositivo. Para tocar datos desde fuera: PATCH con `updateMask` solo de los campos tocados, copia antes y releer después.
- `appdata` es de acceso libre y el repositorio es público: **nunca guardar números completos de tarjetas, IBAN ni
  datos que permitan pagar**. Las tarjetas van con los 4 últimos dígitos (`•••• 3012` Elibel, `•••• 4332` Emmanuel).
- Gastos de un mes: `meses[i].gastos` = `[concepto, importe, categoría, fecha?]`; categorías `fijos`, `variable`,
  `super`, `restaurante`, `salud`, `otros`. Se apuntan agrupados como en septiembre de 2026 («Caprabo (varias)»…).
- El usuario manda los movimientos en PDF de MoraBanc (cuenta y tarjetas) y capturas de la banca online.

## Actualización del 11/10/2026 (desde los PDF del 11/09 al 11/10 y capturas)
- Saldo en cuenta 1.469,74 €; préstamos tras las cuotas de octubre: coche 12.090,12 €, consumo 9.244,22 € (deuda 21.334,34 €, igual que el banco).
- Tarjeta de Elibel: 1.107,64 € consumidos (disponible 892,36 € de 2.000 €). La de Emmanuel: 985,64 € consumidos (disponible 214,36 € de 1.200 €), con los retenidos del 8 al 11/10 (Burger King, Repsol, Tabacs, Anthropic 10 USD ≈ 8,62 €).
- Octubre: +31 gastos agrupados (1.534,57 €) y 1.140 € «Devolución a los niños» (2 × 570, a sus cuentas de ahorro: +570 a cada niño).
- Ingresos extra de octubre: CA Vida 80,20 €, CASS 65,52 € (reembolsos de salud).
- **Salud se devuelve**: la CASS y CA Vida reembolsan fisioterapia, farmacia, dental y la FPNSM (fundación del hijo, 41,66 €/mes). Lo pagado y aún no devuelto va en «A mi favor» → «Reembolsos de salud pendientes» (399,87 € en oct.: dental 281, fisio 66,42, farmacia 52,45); ajustarlo cuando llegue el reembolso.
- Bizum de «Chiqui» (50 €): favor a un tercero, no es ingreso. Caprabo, Hiper, Andorra 2000… = supermercado.
- Números completos de tarjeta quitados de la base de datos, de las 8 copias y del código (siguen en el historial de Git).
