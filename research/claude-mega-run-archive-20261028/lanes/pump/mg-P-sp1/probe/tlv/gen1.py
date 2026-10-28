import itertools,sys
head=open('head.rs').read()
common='''
#[repr(C)]
#[derive(Clone, Copy)]
pub struct TransferFeeConfig {
    pub older_transfer_fee: Fee,
    pub newer_transfer_fee: Fee,
}
const MINT_LEN: usize = 82;
const ACCOUNT_LEN: usize = 165;
#[inline(always)]
fn read_u64(data: &[u8], offset: usize) -> u64 {
    unsafe { core::ptr::read_unaligned(data.as_ptr().add(offset) as *const u64) }
}
#[inline(always)]
fn read_u16(data: &[u8], offset: usize) -> u16 {
    unsafe { core::ptr::read_unaligned(data.as_ptr().add(offset) as *const u16) }
}
#[inline(always)]
fn read_fee(data: &[u8], offset: usize) -> Fee {
    Fee { epoch: read_u64(data, offset), maximum_fee: read_u64(data, offset + 8), basis_points: read_u16(data, offset + 16) }
}
#[inline(always)]
fn read_config(rest: &[u8]) -> TransferFeeConfig {
    TransferFeeConfig { older_transfer_fee: read_fee(rest, 76), newer_transfer_fee: read_fee(rest, 94) }
}
'''
A={
'a1':'''config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });''',
'a2':'''let older = Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) };
            let newer = Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) };
            config = Some(TransferFeeConfig { older_transfer_fee: older, newer_transfer_fee: newer });''',
'a3':'''config = Some(read_config(rest));''',
'a4':'''config.replace(read_config(rest));''',
'a5':'''let c = read_config(rest); config = Some(c);''',
}
B={'b1':('break;','break;','Ok(config)'),'b2':('return Ok(config);','return Ok(config);','')}
out=[head,common]; names=[]
for (an,a),(bn,(br1,br2,tail)) in itertools.product(A.items(),B.items()):
    n=f'v_{an}{bn}'; names.append(n)
    out.append(f'''#[inline(never)]
pub fn {n}(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {{
    if data.len() == MINT_LEN {{ return Ok(None); }}
    if data.len() < ACCOUNT_LEN + 2 {{ return Err(()); }}
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) {{ return Err(()); }}
    if data[ACCOUNT_LEN] != 1 {{ return Err(()); }}
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {{
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 {{ {br1} }}
        let tag = read_u16(rest, 0);
        if tag == 0 {{ {br2} }}
        if rest.len() < 4 {{ return Err(()); }}
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() {{ return Err(()); }}
        if tag == 1 {{
            if config.is_some() {{ return Err(()); }}
            if length < 108 {{ return Err(()); }}
            {a}
        }}
        offset = offset.checked_add(entry_len).ok_or(())?;
    }}
    {tail}
}}
''')
open(sys.argv[1],'w').write('\n'.join(out)); print(' '.join(names))
