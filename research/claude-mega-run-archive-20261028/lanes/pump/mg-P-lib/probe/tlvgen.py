#!/usr/bin/env python3
"""tlvgen.py <out.rs> [limit]: emit all TLV-loop variants (cartesian product of check forms) appended to tlv0.rs."""
import sys, itertools
base=open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-lib/probe/tlv0.rs').read()
HEAD='''macro_rules! cfg_of { ($rest:expr) => { TransferFeeConfig {
    older_transfer_fee: Fee { epoch: read_u64($rest, 76), maximum_fee: read_u64($rest, 84), basis_points: read_u16($rest, 92) },
    newer_transfer_fee: Fee { epoch: read_u64($rest, 94), maximum_fee: read_u64($rest, 102), basis_points: read_u16($rest, 110) } } } }
macro_rules! head { ($data:expr) => {
    if $data.len() == MINT_LEN { return Ok(None); }
    if $data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if $data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if $data[ACCOUNT_LEN] != 1 { return Err(()); } } }
'''
C1={'a':'if rest.len() < 2 { break; }','b':'let Some(_) = rest.get(..2) else { break };','c':'if rest.get(..2).is_none() { break; }'}
C2={'a':'if tag == 0 { break; }','b':'match tag { 0 => break, _ => {} }','c':'if tag != 0 {} else { break; }'}
C3={'a':'if rest.len() < 4 { return Err(()); }','b':'rest.get(2..4).ok_or(())?;','c':'let Some(_) = rest.get(..4) else { return Err(()) };'}
C4={'a':'if entry_len > rest.len() { return Err(()); }','b':'rest.get(..entry_len).ok_or(())?;','c':'let Some(_) = rest.get(..entry_len) else { return Err(()) };'}
C5={'a':('if tag == 1 {','}'),'b':('match tag { 1 => {','} _ => {} }')}
C6={'a':'if config.is_some() { return Err(()); }','b':'let None = config else { return Err(()) };','d':'match config { Some(_) => return Err(()), None => {} }'}
out=[base,HEAD]; names=[]
for k,(c1,c2,c3,c4,c5,c6) in enumerate(itertools.product(C1,C2,C3,C4,C5,C6)):
    n=f'x_{c1}{c2}{c3}{c4}{c5}{c6}'; names.append(n)
    o,cl=C5[c5]
    out.append(f'''#[inline(never)] pub fn {n}(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {{ head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {{
        let rest = tlv.get(offset..).ok_or(())?;
        {C1[c1]}
        let tag = read_u16(rest, 0);
        {C2[c2]}
        {C3[c3]}
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        {C4[c4]}
        {o} {C6[c6]} if length < 108 {{ return Err(()); }} config = Some(cfg_of!(rest)); {cl}
        offset = offset.checked_add(entry_len).ok_or(())?;
    }}
    Ok(config) }}
''')
open(sys.argv[1],'w').write('\n'.join(out)); print(len(names))
