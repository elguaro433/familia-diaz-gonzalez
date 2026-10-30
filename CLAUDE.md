# Finanzas Familia Díaz González — notas para seguir trabajando

App estática (`index.html`, v8.9) en GitHub Pages: control financiero de Emmanuel y Elibel (gastos por mes y categoría,
nóminas, créditos, tarjetas, ahorro de los niños, «A mi favor», jubilación CASS).

- **Clave familiar (25/10/2026):** los datos están en `familias/<id>/appdata/...`. `<id>` = PBKDF2-SHA256 de la clave familiar
  (normalizada: minúsculas, sin tildes, espacios simples; sal `familia-diaz-gonzalez`, 210000 vueltas, 32 bytes en hex).
  El `<id>` está solo en el PC: `Proyectos\Familia\.clave_familiar_id`. La colección vieja `appdata` está cerrada.
  La app pide la clave una vez por móvil (`famListo()`), guarda el `<id>` en `localStorage.familiadiaz_fam`. Sin Google.
- Datos: Firestore `familias/<id>/appdata/familia-diaz-gonzalez` (mismo proyecto que el calendario). Casi todos los campos son
  **JSON guardado como texto** (`meses`, `creditos`, `tarjetas`, `ninos`, `otrosIngresos`, `nominasEditadas`…);
  `saldoCuenta` y `tarjetaConsumo` son números. Copias automáticas en `familias/<id>/appdata/backup-AAAA-MM-DD`.
- La app escribe todos los campos a la vez (`syncToCloud`, `set` + `merge`) y recarga cuando cambian desde otro
  dispositivo. Para tocar datos desde fuera: PATCH con `updateMask` solo de los campos tocados, copia antes y releer después.
- El repositorio es público: **nunca guardar números completos de tarjetas, IBAN ni
  datos que permitan pagar**. Las tarjetas van solo con los 4 últimos dígitos.
- **Nada de datos en el código (25/10/2026):** `MESES`, `NOMINAS_REAL`, `CREDITOS`, `TARJETAS`, `NINOS`, saldo… arrancan
  vacíos; todo viene de la nube (o de la copia local del móvil, `loadAllData` rehace los meses). No volver a escribir
  gastos ni cifras en `index.html`. Historial de Git reiniciado ese día (copia del viejo en `..\backups\*.bundle`, solo PC).
- Gastos de un mes: `meses[i].gastos` = `[concepto, importe, categoría, fecha?]`; categorías `fijos`, `variable`,
  `super`, `restaurante`, `salud`, `otros`. Se apuntan agrupados como en septiembre de 2026 («Caprabo (varias)»…).
- El usuario manda los movimientos en PDF de MoraBanc (cuenta y tarjetas) y capturas de la banca online.

## Notas con cifras (privadas)
El repositorio es público: las cifras (saldos, préstamos, tarjetas, seguros, reembolsos, APACEF, Ford, pensión) y la
historia de cada actualización NO van aquí. Están en Firestore `familias/<id>/appdata/notas-claude`, campo `finanzas`
(GET con la `apiKey` de `index.html`); los datos de verdad, en `familias/<id>/appdata/familia-diaz-gonzalez`. Al hacer una
actualización, apuntar el detalle allí (PATCH con `updateMask=finanzas`) y aquí solo reglas generales.

## Reglas que salieron de las actualizaciones
- Salud se devuelve (CASS y CA Vida): lo pagado y aún no devuelto va en «A mi favor» → «Reembolsos de salud pendientes».
- Un Bizum que es un favor a un tercero no es ingreso. Caprabo, Hiper, Andorra 2000… = supermercado.
- Pensión: `jubilacion.e.meses` = { ordinaria, anticipada, fecha }; `jubMeses()` pinta las dos barras.
- Un crédito nuevo va en `creditos` con su cuadro de cuotas; la cuota de los años sin crear sale con «+ Mes».
- APACEF: julio y agosto sin cobro.
- «Basas salud» y «Crem Salud» son seguros FIJOS de por vida: categoría `fijos` en todos los meses (no `salud`).
- Los PDF del banco NO se suben al repositorio (llevan IBAN y números de tarjeta completos).
