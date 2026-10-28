# mg-P-lib-04: +0x63cf0 pump_quote::parse_pool (on L13; cumulative with mg-P-lib-03)

Base WP/base/L13 (962/165). Result 967 normalized / 165 raw; gains 0x60ee0 0x63cf0 0x806c8 0x93050 0x940c0 (0x63cf0 new); no losses,
no raw losses. nbuild ok, runtime_valid, no stack warnings. synthetic_layout: true (inherited layout-pad positioning).

## 0x63cf0 parse_pool (pump_quote.rs 278-285; sites 279/280 unchanged, lines 286-288 now blank)
    let header = data.get(..211).ok_or_else(|| error!(PumpError::InvalidQuotePool))?;          // 279
    require!(header.starts_with(&POOL_DISC), PumpError::InvalidQuotePool);                       // 280
    let adjustment = if data.len() >= 261 {
        i128::from_le_bytes(data[245..261].try_into().map_err(|_| error!(PumpError::InvalidQuotePool))?)
    } else { 0 };
    Ok(PoolState { base_vault: read_pubkey(header, 139)?, quote_vault: read_pubkey(header, 171)?, adjustment })
Evidence / mechanisms (multiplex builds pp1-pp4, probes in lanes/mg-P-lib/probe):
- The original reads the i128 at 245 as byte pieces 245:4, 249:2, 251:1, 252:8, 260:1 (+104 B vs two ldxdw). That is SROA
  splitting a Result<[u8;16], anchor Error> temporary: the Ok payload sits at offset 1 and overlaps the Err Box at 8..16, so the
  payload is split 7/8/1 (i56/i64/i8). `.try_into().map_err(|_| error!(..))?` reproduces it exactly (the Err arm is statically
  dead: no error code is emitted); `.try_into().unwrap()`, copy_from_slice, get().map(), borsh-like forms all give 2 loads.
- `data.get(..211).ok_or_else(..)?` (z05's g5_1) fixes the error-temp frame (0.51 -> 0.84); `starts_with(&POOL_DISC)` (or
  `== POOL_DISC[..]`) fixes the shared Err-return block placement (0.84 -> 0.90); the struct-literal form with both read_pubkey
  calls inside the literal fixes the Pubkey piece spill slots (0.84 -> 0.93); together 1.000.
- Semantics unchanged: len < 211 -> InvalidQuotePool (6103) @279, discriminator mismatch -> InvalidQuotePool @280, adjustment
  read only when len >= 261, then base/quote vault keys at 139/171 of the 211-byte header.
