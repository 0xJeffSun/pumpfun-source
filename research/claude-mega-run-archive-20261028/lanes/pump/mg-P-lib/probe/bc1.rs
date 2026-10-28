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
extern "Rust" { fn pe_into(p: PE) -> Error; fn decode_v0(buf: &mut &[u8]) -> Result<BondingCurve>; fn decode_v1(buf: &mut &[u8]) -> Result<BondingCurve>; fn decode_v2(buf: &mut &[u8]) -> Result<BondingCurve>; fn decode_v3(buf: &mut &[u8]) -> Result<BondingCurve>; fn decode_v4(buf: &mut &[u8]) -> Result<BondingCurve>; fn decode_v5(buf: &mut &[u8]) -> Result<BondingCurve>; fn decode_v6(buf: &mut &[u8]) -> Result<BondingCurve>; fn decode_v7(buf: &mut &[u8]) -> Result<BondingCurve>; fn decode_v8(buf: &mut &[u8]) -> Result<BondingCurve>; }
#[inline(always)] fn invalid() -> Error { let mut p = MaybeUninit::<[u64; 3]>::uninit(); unsafe { (p.as_mut_ptr() as *mut u64).write(0x8000000000000003) }; unsafe { pe_into(PE(p)) } }
fn decode_original_curve_payload(buf: &mut &[u8]) -> Result<BondingCurve> {
    let n = buf.len();
    if n < 41 { return Err(invalid()); }
    if n < 73 { return unsafe { decode_v0(buf) }; }
    if n == 73 { return unsafe { decode_v1(buf) }; }
    if n < 75 { return unsafe { decode_v2(buf) }; }
    if n < 107 { return unsafe { decode_v3(buf) }; }
    if n < 116 { return unsafe { decode_v4(buf) }; }
    if n == 116 { return unsafe { decode_v5(buf) }; }
    if n < 133 { return unsafe { decode_v6(buf) }; }
    if n < 158 { return unsafe { decode_v7(buf) }; }
    unsafe { decode_v8(buf) }
}
#[inline(never)] pub fn base_unchecked(buf: &mut &[u8]) -> Result<BondingCurve> {
    if buf.len() < 8 { return Err(invalid()); }
    *buf = &buf[8..];
    decode_original_curve_payload(buf)
}
