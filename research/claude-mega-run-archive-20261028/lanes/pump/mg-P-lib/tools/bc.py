import sys
src,variant=sys.argv[1],sys.argv[2]
p=src+'/src/trade_types.rs'; L=open(p).read().split('\n')
a=L.index('impl anchor_lang::AccountDeserialize for BondingCurve {')
b=L.index('mod historical_curve {')
n_old=b-a
E='return Err(anchor_lang::solana_program::program_error::ProgramError::InvalidAccountData.into());'
EE='Err(anchor_lang::solana_program::program_error::ProgramError::InvalidAccountData.into())'
chain=['    if n < 73 { return historical_curve::decode_v0(buf); }','    if n == 73 { return historical_curve::decode_v1(buf); }','    if n < 75 { return historical_curve::decode_v2(buf); }','    if n < 107 { return historical_curve::decode_v3(buf); }','    if n < 116 { return historical_curve::decode_v4(buf); }','    if n == 116 { return historical_curve::decode_v5(buf); }','    if n < 133 { return historical_curve::decode_v6(buf); }','    if n < 158 { return historical_curve::decode_v7(buf); }','    historical_curve::decode_v8(buf)']
impl=['impl anchor_lang::AccountDeserialize for BondingCurve {','    #[inline(never)]','    fn try_deserialize(buf: &mut &[u8]) -> Result<Self> {',
 '        if buf.len() < 8 { '+E+' }','        if &buf[..8] != Self::DISCRIMINATOR { '+E+' }','        *buf = &buf[8..];','        decode_original_curve_payload(buf)','    }',
 '    fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {','        if buf.len() < 8 { '+E+' }','        *buf = &buf[8..];','        decode_original_curve_payload(buf)','    }','}']
inl='#[inline(always)]'
if variant=='A':
    dec=[inl,'fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {','    let n = buf.len();','    if n < 41 { '+E+' }']+chain+['}']
elif variant=='B':
    dec=[inl,'fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {','    let n = buf.len();','    if n >= 41 {']+['    '+c for c in chain]+['    } else { '+EE+' }','}']
elif variant=='C':
    dec=[inl,'fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {','    match buf.len() {','        0..=40 => '+EE+',','        41..=72 => historical_curve::decode_v0(buf),','        73 => historical_curve::decode_v1(buf),','        74 => historical_curve::decode_v2(buf),','        75..=106 => historical_curve::decode_v3(buf),','        107..=115 => historical_curve::decode_v4(buf),','        116 => historical_curve::decode_v5(buf),','        117..=132 => historical_curve::decode_v6(buf),','        133..=157 => historical_curve::decode_v7(buf),','        _ => historical_curve::decode_v8(buf),','    }','}']
elif variant=='G':
    arms=['if n < 73 { historical_curve::decode_v0(buf) }','else if n == 73 { historical_curve::decode_v1(buf) }','else if n < 75 { historical_curve::decode_v2(buf) }','else if n < 107 { historical_curve::decode_v3(buf) }','else if n < 116 { historical_curve::decode_v4(buf) }','else if n == 116 { historical_curve::decode_v5(buf) }','else if n < 133 { historical_curve::decode_v6(buf) }','else if n < 158 { historical_curve::decode_v7(buf) }','else { historical_curve::decode_v8(buf) }']
    dec=[inl,'fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {','    let n = buf.len();','    if n >= 41 {']+['        '+x for x in arms]+['    } else { '+EE+' }','}']
elif variant=='H':
    dec=[inl,'fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {','    let n = buf.len();','    if n >= 41 {} else { '+E+' }']+chain+['}']
elif variant=='I':
    dec=[inl,'fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {','    let n = buf.len();','    let Some(_) = n.checked_sub(41) else { '+E+' };']+chain+['}']
elif variant=='J':
    dec=[inl,'fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {','    let n = buf.len();','    if n >= 41 { dispatch_curve(buf, n) } else { '+EE+' }','}',inl,'fn dispatch_curve(buf: &mut &[u8], n: usize) -> Result<BondingCurve> {']+chain+['}']
elif variant=='D':  # A but decode without inline attr; unchecked inline(always)? no: helper inline hint
    dec=['#[inline]','fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {','    let n = buf.len();','    if n < 41 { '+E+' }']+chain+['}']
new=impl+dec
assert len(new)<=n_old,(len(new),n_old)
new+=['']*(n_old-len(new))
L[a:b]=new
open(p,'w').write('\n'.join(L))
