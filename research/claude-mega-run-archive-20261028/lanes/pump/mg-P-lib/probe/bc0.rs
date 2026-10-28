#![no_std]
use core::mem::MaybeUninit;
#[derive(Clone, Copy, Default)] pub struct Pubkey(pub [u8; 32]);
pub struct BondingCurve {
    pub virtual_token_reserves: u64, pub virtual_quote_reserves: u64, pub real_token_reserves: u64, pub real_quote_reserves: u64,
    pub token_total_supply: u64, pub complete: bool, pub creator: Pubkey, pub is_mayhem_mode: bool, pub is_cashback_coin: bool,
    pub quote_mint: Pubkey, pub creator_fee_bps: u64, pub can_edit_creator_fee: bool, pub is_holder_reward: bool, pub creator_fee: u64,
    pub protocol_fees: u64, pub depth: u8, pub initial_virtual_quote_reserves: u64, pub post_complete_base_out: u64, pub post_complete_quote_in: u64,
}
pub enum Error { A(&'static u64), B(&'static u64) }
pub type Result<T> = core::result::Result<T, Error>;
pub struct PE(MaybeUninit<[u64; 3]>);
#[inline(never)] pub fn pe_into(_p: PE) -> Error { static X: u64 = 1; Error::A(&X) }
#[inline(always)] fn invalid() -> Error { let mut p = MaybeUninit::<[u64; 3]>::uninit(); unsafe { (p.as_mut_ptr() as *mut u64).write(0x8000000000000003) }; pe_into(PE(p)) }
macro_rules! dec { ($n:ident, $k:expr) => { #[inline(never)] pub fn $n(buf: &mut &[u8]) -> Result<BondingCurve> {
    if buf.len() < $k { return Err(invalid()); }
    Ok(BondingCurve { virtual_token_reserves: buf[0] as u64 + $k, virtual_quote_reserves: 0, real_token_reserves: 0, real_quote_reserves: 0, token_total_supply: 0,
      complete: false, creator: Pubkey::default(), is_mayhem_mode: false, is_cashback_coin: false, quote_mint: Pubkey::default(), creator_fee_bps: 0,
      can_edit_creator_fee: false, is_holder_reward: false, creator_fee: 0, protocol_fees: 0, depth: 0, initial_virtual_quote_reserves: 0,
      post_complete_base_out: 0, post_complete_quote_in: 0 }) } } }
dec!(decode_v0,1); dec!(decode_v1,2); dec!(decode_v2,3); dec!(decode_v3,4); dec!(decode_v4,5); dec!(decode_v5,6); dec!(decode_v6,7); dec!(decode_v7,8); dec!(decode_v8,9);
fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {
    let n = buf.len();
    if n < 41 { return Err(invalid()); }
    if n < 73 { return decode_v0(buf); }
    if n == 73 { return decode_v1(buf); }
    if n < 75 { return decode_v2(buf); }
    if n < 107 { return decode_v3(buf); }
    if n < 116 { return decode_v4(buf); }
    if n == 116 { return decode_v5(buf); }
    if n < 133 { return decode_v6(buf); }
    if n < 158 { return decode_v7(buf); }
    decode_v8(buf)
}
#[inline(never)] pub fn base_unchecked(buf: &mut &[u8]) -> Result<BondingCurve> {
    if buf.len() < 8 { return Err(invalid()); }
    *buf = &buf[8..];
    decode_original_curve_payload(buf)
}
