#![allow(dead_code)]
pub enum PE { Custom(u32), A, B, C, D, E, F, G, H, I, J, K, L, M, BorshIoError(String), N, O, P, Q, R, S, T, U, V, W, X }
extern "Rust" { fn opaque(x: &[[u8; 32]; 7]); }
#[inline(never)] fn keys(src: &[[u8; 32]]) -> Vec<[u8; 32]> { src[..8].iter().copied().collect() }
#[no_mangle] pub fn q1(src: &[[u8; 32]], out: &mut [u8; 32]) -> Result<(), PE> {
    let a: [[u8; 32]; 8] = keys(src).try_into().map_err(|_| PE::Custom(7))?;
    let rest: [[u8; 32]; 7] = a[1..].try_into().unwrap(); unsafe { opaque(&rest) }; *out = a[0]; Ok(())
}
#[no_mangle] pub fn q2(src: &[[u8; 32]], out: &mut [u8; 32]) -> Result<(), PE> {
    let v = keys(src); let a: [[u8; 32]; 8] = v.as_slice().try_into().map_err(|_| PE::Custom(7))?;
    let rest: [[u8; 32]; 7] = a[1..].try_into().unwrap(); unsafe { opaque(&rest) }; *out = a[0]; Ok(())
}
#[no_mangle] pub fn q3(src: &[[u8; 32]], out: &mut [u8; 32]) -> Result<(), PE> {
    let v = keys(src); let first: [u8; 32] = v[0][..].try_into().map_err(|_| PE::Custom(7))?;
    let rest: [[u8; 32]; 7] = v[1..].try_into().unwrap(); unsafe { opaque(&rest) }; *out = first; Ok(())
}
