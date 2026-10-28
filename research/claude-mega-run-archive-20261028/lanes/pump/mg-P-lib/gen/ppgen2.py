#!/usr/bin/env python3
"""ppgen2.py <tree> <spec,...>  spec = H+A+B ; multiplex parse_pool variants (never deliver)."""
import sys
D=sys.argv[1]+'/src/pump_quote.rs'
G='    let header = data.get(..211).ok_or_else(|| error!(PumpError::InvalidQuotePool))?;\n'
H={'H2':G+'    require!(header[..8] == POOL_DISC, PumpError::InvalidQuotePool);\n',
'H2b':G+'    require!(header.starts_with(&POOL_DISC), PumpError::InvalidQuotePool);\n',
'H2c':G+'    require!(header[..8] == POOL_DISC[..], PumpError::InvalidQuotePool);\n',
'H2d':G+'    require!(&header[..8] == &POOL_DISC, PumpError::InvalidQuotePool);\n',
'H2f':G+'    let disc: [u8; 8] = header[..8].try_into().unwrap();\n    require!(disc == POOL_DISC, PumpError::InvalidQuotePool);\n',
'H2g':G+'    require!(header[..8].eq(&POOL_DISC), PumpError::InvalidQuotePool);\n',
'H2h':'    let header = &data.get(..211).ok_or_else(|| error!(PumpError::InvalidQuotePool))?[..];\n    require!(header[..8] == POOL_DISC, PumpError::InvalidQuotePool);\n',
}
A={'A21':'    let adjustment = if data.len() >= 261 {\n        let raw: [u8; 16] = data[245..261].try_into().map_err(|_| error!(PumpError::InvalidQuotePool))?;\n        i128::from_le_bytes(raw)\n    } else { 0 };\n','A20':'    let adjustment = if data.len() >= 261 {\n        i128::from_le_bytes(data[245..261].try_into().map_err(|_| error!(PumpError::InvalidQuotePool))?)\n    } else { 0 };\n'}
B={'B1':'    let base_vault = read_pubkey(header, 139)?;\n    let quote_vault = read_pubkey(header, 171)?;\n    Ok(PoolState { base_vault, quote_vault, adjustment })\n',
'B2':'    Ok(PoolState { base_vault: read_pubkey(header, 139)?, quote_vault: read_pubkey(header, 171)?, adjustment })\n',
'B5':'    let base_vault = read_pubkey(header, 139)?;\n    let quote_vault = read_pubkey(header, 171)?;\n    let state = PoolState { base_vault, quote_vault, adjustment };\n    Ok(state)\n',
'B6':'    let base_vault = read_pubkey(header, 139)?;\n    let quote_vault = read_pubkey(header, 171)?;\n    return Ok(PoolState { base_vault, quote_vault, adjustment });\n',
'B7':'    let base_vault = read_pubkey(header, 139)?;\n    let quote_vault = read_pubkey(header, 171)?;\n    Ok(PoolState { adjustment, base_vault, quote_vault })\n',
'B8':'    let base_vault = read_pubkey(&data[..211], 139)?;\n    let quote_vault = read_pubkey(&data[..211], 171)?;\n    Ok(PoolState { base_vault, quote_vault, adjustment })\n',
}
specs=[x.split('+') for x in sys.argv[2].split(',')]
s=open(D).read(); out=[]
for k,(h,a,b) in enumerate(specs,1):
    out.append(f'#[inline(never)]\npub fn pp_{k}(data: &[u8]) -> Result<PoolState> {{\n'+H[h]+A[a]+B[b]+'}\n')
old='    let state = parse_pool(pool.data)?;'
assert s.count(old)==1
s=s.replace(old,'    let state = match pool.data.len() { '+' '.join(f'{9000+k} => pp_{k}(pool.data)?,' for k in range(1,len(specs)+1))+' _ => parse_pool(pool.data)? };').rstrip('\n')+'\n'+''.join(out)
open(D,'w').write(s)
print('\n'.join(f'pp_{k} '+'+'.join(sp) for k,sp in enumerate(specs,1)))
