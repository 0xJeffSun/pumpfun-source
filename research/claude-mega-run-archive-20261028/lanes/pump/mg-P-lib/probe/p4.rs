#![no_std]
pub enum E { A(&'static u64), B(&'static u64) }
static X: u64 = 5;
#[no_mangle] pub fn c1(d: &[u8], out: &mut i128) -> Result<(), E> { let a = if d.len() >= 261 { i128::from_le_bytes(d[245..261].try_into().map_err(|_| E::A(&X))?) } else { 0 }; *out = a; Ok(()) }
#[no_mangle] pub fn c2(d: &[u8], out: &mut i128) -> Result<(), E> { let a = if d.len() >= 261 { let b: [u8;16] = d[245..261].try_into().map_err(|_| E::B(&X))?; i128::from_le_bytes(b) } else { 0 }; *out = a; Ok(()) }
