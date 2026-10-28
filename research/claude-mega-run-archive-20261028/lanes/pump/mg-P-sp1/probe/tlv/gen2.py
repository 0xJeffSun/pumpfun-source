#!/usr/bin/env python3
"""gen2.py outprefix chunk: TLV parser variants (return-Ok structure) as pub #[inline(never)] fns; writes outprefix_K.rs files."""
import itertools,sys
head=open('head.rs').read()
common=open('common.rs').read()
R={'a':'let rest = tlv.get(offset..).ok_or(())?;','b':'let Some(rest) = tlv.get(offset..) else { return Err(()) };'}
C1={'a':'if rest.len() < 2 {{ {E} }}','b':'let Some(_) = rest.get(..2) else {{ {E} }};'}
C2={'a':'if tag == 0 {{ {E} }}','b':'match tag {{ 0 => {E}, _ => {{}} }}'}
C3={'a':'if rest.len() < 4 { return Err(()); }','b':'rest.get(2..4).ok_or(())?;','c':'let Some(_) = rest.get(..4) else { return Err(()) };'}
C4={'a':'if entry_len > rest.len() { return Err(()); }','b':'rest.get(..entry_len).ok_or(())?;','c':'let Some(_) = rest.get(..entry_len) else { return Err(()) };'}
C5={'a':('if tag == 1 {','}'),'b':('match tag { 1 => {','} _ => {} }')}
C6={'a':'if config.is_some() { return Err(()); }','b':'let None = config else { return Err(()) };','d':'match config { Some(_) => return Err(()), None => {} }'}
O={'a':'offset = offset.checked_add(entry_len).ok_or(())?;','b':'offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };'}
K={'k1':'''config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });''','k3':'config = Some(read_config(rest));'}
E='return Ok(config)'
fns=[]
for r,c1,c2,c3,c4,c5,c6,o,k in itertools.product(R,C1,C2,C3,C4,C5,C6,O,K):
    n=f'v_{r}{c1}{c2}{c3}{c4}{c5}{c6}{o}{k}'
    op,cl=C5[c5]
    fns.append((n,f'''#[inline(never)]
pub fn {n}(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {{
    if data.len() == MINT_LEN {{ return Ok(None); }}
    if data.len() < ACCOUNT_LEN + 2 {{ return Err(()); }}
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) {{ return Err(()); }}
    if data[ACCOUNT_LEN] != 1 {{ return Err(()); }}
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {{
        {R[r]}
        {C1[c1].format(E=E)}
        let tag = read_u16(rest, 0);
        {C2[c2].format(E=E)}
        {C3[c3]}
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        {C4[c4]}
        {op}
            {C6[c6]}
            if length < 108 {{ return Err(()); }}
            {K[k]}
        {cl}
        {O[o]}
    }}
}}
'''))
pre=sys.argv[1]; ch=int(sys.argv[2])
for i in range(0,len(fns),ch):
    open(f'{pre}_{i//ch}.rs','w').write(head+common+'\n'.join(f for _,f in fns[i:i+ch]))
print(len(fns),'fns in',(len(fns)+ch-1)//ch,'files')
