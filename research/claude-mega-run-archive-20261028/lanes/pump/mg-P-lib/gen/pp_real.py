import sys
D=sys.argv[1]+'/src/pump_quote.rs'; disc=sys.argv[2]
l=open(D).read().split('\n')
assert l[277].startswith('pub fn parse_pool(') and l[287]=='}', (l[277],l[287])
new=['pub fn parse_pool(data: &[u8]) -> Result<PoolState> {',
'    let header = data.get(..211).ok_or_else(|| error!(PumpError::InvalidQuotePool))?;',
'    require!('+disc+', PumpError::InvalidQuotePool);',
'    let adjustment = if data.len() >= 261 {',
'        i128::from_le_bytes(data[245..261].try_into().map_err(|_| error!(PumpError::InvalidQuotePool))?)',
'    } else { 0 };',
'    Ok(PoolState { base_vault: read_pubkey(header, 139)?, quote_vault: read_pubkey(header, 171)?, adjustment })',
'}','','','']
l[277:288]=new
open(D,'w').write('\n'.join(l)); print('ok')
