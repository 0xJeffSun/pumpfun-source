import sys
head=open('head.rs').read(); common=open('common.rs').read()
# Thin-wrapper / inner-fn forms to steer exit-block placement (z10 lever).
body='''
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config)'''
V=[]
# p1: inner #[inline(never)] fn, pub is a tail call
V.append(('p1', f'''#[inline(never)]
fn inner_p1(data:&[u8])->Result<Option<TransferFeeConfig>,()> {{{body}
}}
#[inline(never)]
pub fn p1(data:&[u8])->Result<Option<TransferFeeConfig>,()> {{ inner_p1(data) }}'''))
# p2: inner #[inline] (inlined) fn
V.append(('p2', f'''#[inline]
fn inner_p2(data:&[u8])->Result<Option<TransferFeeConfig>,()> {{{body}
}}
#[inline(never)]
pub fn p2(data:&[u8])->Result<Option<TransferFeeConfig>,()> {{ inner_p2(data) }}'''))
# p3: Ok(None) early-return is the LAST textual return but via a label/loop so exit is created differently
V.append(('p3', f'''#[inline(never)]
pub fn p3(data:&[u8])->Result<Option<TransferFeeConfig>,()> {{
    let r: Result<Option<TransferFeeConfig>,()> = (|| {{{body}
    }})();
    r
}}'''))
# p4: mint-len guard pulled out, main as inner
V.append(('p4', f'''#[inline(never)]
pub fn p4(data:&[u8])->Result<Option<TransferFeeConfig>,()> {{
    if data.len() == MINT_LEN {{ return Ok(None); }}
    if data.len() < ACCOUNT_LEN + 2 {{ return Err(()); }}
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) {{ return Err(()); }}
    if data[ACCOUNT_LEN] != 1 {{ return Err(()); }}
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    while let Some(rest) = tlv.get(offset..) {{
        if rest.len() < 2 {{ break; }}
        let tag = read_u16(rest, 0);
        if tag == 0 {{ break; }}
        if rest.len() < 4 {{ return Err(()); }}
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() {{ return Err(()); }}
        if tag == 1 {{
            if config.is_some() {{ return Err(()); }}
            if length < 108 {{ return Err(()); }}
            config = Some(read_config(rest));
        }}
        offset = offset.checked_add(entry_len).ok_or(())?;
    }}
    if offset <= tlv.len() {{ Ok(config) }} else {{ Err(()) }}
}}'''))
open(sys.argv[1],'w').write(head+common+'\n'.join(b for _,b in V))
