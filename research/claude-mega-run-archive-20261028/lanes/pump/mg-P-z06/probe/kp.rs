#![allow(dead_code)]
pub enum PErr { Custom(u32), A, B, C, D, E, F, G, H, I, J, K, L, M, BorshIoError(String), N, O, P, Q, R, S, T, U, V, W, X }
pub enum AErr { A(Box<[u8; 160]>), B(Box<[u8; 64]>) }
extern "Rust" { fn opaque(x: &[[u8; 32]; 7]); }
#[inline(never)] fn keys(src: &[[u8; 32]]) -> Vec<[u8; 32]> { src[..8].iter().copied().collect() }
#[no_mangle] pub fn p1(src: &[[u8; 32]], out: &mut [u8; 32]) {
    let a: [[u8; 32]; 8] = keys(src).try_into().unwrap();
    let rest: [[u8; 32]; 7] = a[1..].try_into().unwrap();
    unsafe { opaque(&rest) }; *out = a[0];
}
#[no_mangle] pub fn p2(src: &[[u8; 32]], out: &mut [u8; 32]) -> Result<(), PErr> {
    let a: [[u8; 32]; 8] = keys(src).try_into().map_err(|_| PErr::A)?;
    let rest: [[u8; 32]; 7] = a[1..].try_into().unwrap();
    unsafe { opaque(&rest) }; *out = a[0]; Ok(())
}
#[no_mangle] pub fn p3(src: &[[u8; 32]], out: &mut [u8; 32]) -> Result<(), AErr> {
    let a: [[u8; 32]; 8] = keys(src).try_into().map_err(|_| AErr::A(Box::new([0; 160])))?;
    let rest: [[u8; 32]; 7] = a[1..].try_into().unwrap();
    unsafe { opaque(&rest) }; *out = a[0]; Ok(())
}
