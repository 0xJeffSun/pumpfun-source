#!/usr/bin/env python3
"""ppgen.py <tree>: append parse_pool variants pp_<k> to pump_quote.rs and dispatch them from validate_pool (multiplex; never deliver)."""
import sys
D=sys.argv[1]+'/src/pump_quote.rs'
H={
'H1':('    require!(data.len() >= 211, PumpError::InvalidQuotePool);\n    require!(data[..8] == POOL_DISC, PumpError::InvalidQuotePool);\n','    let header = &data[..211];\n'),
'H3':('    require!(data.len() >= 211, PumpError::InvalidQuotePool);\n    let header = &data[..211];\n    require!(header[..8] == POOL_DISC, PumpError::InvalidQuotePool);\n',''),
'H4':('    let header = data.get(..211).ok_or_else(|| error!(PumpError::InvalidQuotePool))?;\n    if header[..8] != POOL_DISC { return err!(PumpError::InvalidQuotePool); }\n',''),
'H2':('    let header = data.get(..211).ok_or_else(|| error!(PumpError::InvalidQuotePool))?;\n    require!(header[..8] == POOL_DISC, PumpError::InvalidQuotePool);\n',''),
}
A={
'A20':'    let adjustment = if data.len() >= 261 {\n        i128::from_le_bytes(data[245..261].try_into().map_err(|_| error!(PumpError::InvalidQuotePool))?)\n    } else { 0 };\n',
'A21':'    let adjustment = if data.len() >= 261 {\n        let raw: [u8; 16] = data[245..261].try_into().map_err(|_| error!(PumpError::InvalidQuotePool))?;\n        i128::from_le_bytes(raw)\n    } else { 0 };\n',
'A22':'    let adjustment = if data.len() > 260 {\n        i128::from_le_bytes(data[245..261].try_into().map_err(|_| error!(PumpError::InvalidQuotePool))?)\n    } else { 0 };\n',
'A1':'    let adjustment = if data.len() >= 261 {\n        i128::from_le_bytes(data[245..261].try_into().unwrap())\n    } else { 0 };\n',
'A2':'    let adjustment = if data.len() >= 261 {\n        let mut buf = [0u8; 16];\n        buf.copy_from_slice(&data[245..261]);\n        i128::from_le_bytes(buf)\n    } else { 0 };\n',
'A5':'    let adjustment = if data.len() >= 261 {\n        let raw: [u8; 16] = data[245..261].try_into().unwrap();\n        i128::from_le_bytes(raw)\n    } else { 0 };\n',
'A7':'    let adjustment = match data.get(245..261) {\n        Some(b) => i128::from_le_bytes(b.try_into().unwrap()),\n        None => 0,\n    };\n',
'A8':'    let adjustment = data.get(245..261).map(|b| i128::from_le_bytes(b.try_into().unwrap())).unwrap_or(0);\n',
'A9':'    let adjustment = data.get(245..261).and_then(|b| <[u8; 16]>::try_from(b).ok()).map(i128::from_le_bytes).unwrap_or(0);\n',
'A10':'    let adjustment = if data.len() >= 261 {\n        i128::deserialize(&mut &data[245..261]).unwrap()\n    } else { 0 };\n',
'A11':'    let adjustment = if data.len() >= 261 {\n        <i128 as AnchorDeserialize>::deserialize(&mut &data[245..]).unwrap_or(0)\n    } else { 0 };\n',
}
combos=[tuple(x.split('+')) for x in sys.argv[2].split(',')]
s=open(D).read()
out=[]
for k,(h,a) in enumerate(combos,1):
    hh,hdr=H[h]
    out.append(f'#[inline(never)]\npub fn pp_{k}(data: &[u8]) -> Result<PoolState> {{\n'+hh+A[a]+hdr+'    let base_vault = read_pubkey(header, 139)?;\n    let quote_vault = read_pubkey(header, 171)?;\n    Ok(PoolState { base_vault, quote_vault, adjustment })\n}\n')
old='    let state = parse_pool(pool.data)?;'
assert s.count(old)==1
disp='    let state = match pool.data.len() { '+' '.join(f'{9000+k} => pp_{k}(pool.data)?,' for k in range(1,len(combos)+1))+' _ => parse_pool(pool.data)? };'
s=s.replace(old,disp).rstrip('\n')+'\n'+''.join(out)
open(D,'w').write(s)
print('\n'.join(f'pp_{k} {h} {a}' for k,(h,a) in enumerate(combos,1)))
