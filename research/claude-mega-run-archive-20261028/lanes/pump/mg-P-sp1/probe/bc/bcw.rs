#![no_std]
#![feature(core_intrinsics)]
use core::mem::MaybeUninit;
pub struct Pubkey(pub [u8; 32]);
pub struct BondingCurve { pub a:u64,pub b:u64,pub c:u64,pub d:u64,pub e:u64,pub f:bool,pub g:Pubkey,pub h:bool,pub i:bool,pub j:Pubkey,pub k:u64,pub l:bool,pub m:bool,pub n:u64,pub o:u64,pub p:u8,pub q:u64,pub r:u64,pub s:u64 }
pub enum Error { A(&'static u64), B(&'static u64) }
pub type Result<T> = core::result::Result<T, Error>;
pub struct PE(MaybeUninit<[u64; 3]>);
extern "Rust" { fn pe_into(p: PE) -> Error; fn decode_v0(buf:&mut &[u8])->Result<BondingCurve>; fn decode_v1(buf:&mut &[u8])->Result<BondingCurve>; fn decode_v2(buf:&mut &[u8])->Result<BondingCurve>; fn decode_v3(buf:&mut &[u8])->Result<BondingCurve>; fn decode_v4(buf:&mut &[u8])->Result<BondingCurve>; fn decode_v5(buf:&mut &[u8])->Result<BondingCurve>; fn decode_v6(buf:&mut &[u8])->Result<BondingCurve>; fn decode_v7(buf:&mut &[u8])->Result<BondingCurve>; fn decode_v8(buf:&mut &[u8])->Result<BondingCurve>; }
#[inline(always)] fn invalid() -> Error { let mut p = MaybeUninit::<[u64; 3]>::uninit(); unsafe { (p.as_mut_ptr() as *mut u64).write(0x8000000000000003) }; unsafe { pe_into(PE(p)) } }
use core::intrinsics::unlikely;
#[inline(always)] fn dop(buf:&mut &[u8])->Result<BondingCurve>{
    let n=buf.len();
    if unlikely(n<41){return Err(invalid());}
    if n<73{return unsafe{decode_v0(buf)};}
    if n==73{return unsafe{decode_v1(buf)};}
    if n<75{return unsafe{decode_v2(buf)};}
    if n<107{return unsafe{decode_v3(buf)};}
    if n<116{return unsafe{decode_v4(buf)};}
    if n==116{return unsafe{decode_v5(buf)};}
    if n<133{return unsafe{decode_v6(buf)};}
    if n<158{return unsafe{decode_v7(buf)};}
    unsafe{decode_v8(buf)}
}
#[inline(never)] pub fn un_w(buf:&mut &[u8])->Result<BondingCurve>{
    if unlikely(buf.len()<8){return Err(invalid());}
    *buf=&buf[8..];
    dop(buf)
}
