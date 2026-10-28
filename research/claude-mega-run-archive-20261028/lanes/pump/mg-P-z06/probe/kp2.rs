#![allow(dead_code)]
extern "Rust" { fn opaque(x: &[[u8; 32]; 7]); }
#[inline(never)] fn keys(src: &[[u8; 32]]) -> Vec<[u8; 32]> { src[..8].iter().copied().collect() }
#[no_mangle] pub fn p4(src: &[[u8; 32]], out: &mut [u8; 32]) {
    let v = keys(src); let a: [[u8; 32]; 8] = v.as_slice().try_into().unwrap();
    let rest: [[u8; 32]; 7] = a[1..].try_into().unwrap(); unsafe { opaque(&rest) }; *out = a[0];
}
#[no_mangle] pub fn p5(src: &[[u8; 32]], out: &mut [u8; 32]) {
    let v = keys(src); let first = v.first().copied().unwrap();
    let rest: [[u8; 32]; 7] = v[1..].try_into().unwrap(); unsafe { opaque(&rest) }; *out = first;
}
#[no_mangle] pub fn p6(src: &[[u8; 32]], out: &mut [u8; 32]) {
    let v = keys(src); let (first, rest) = v.split_first().unwrap();
    let first = *first; let rest: [[u8; 32]; 7] = rest.try_into().unwrap(); unsafe { opaque(&rest) }; *out = first;
}
#[no_mangle] pub fn p7(src: &[[u8; 32]], out: &mut [u8; 32]) {
    let v = keys(src); let first: [u8; 32] = v[0][..].try_into().unwrap();
    let rest: [[u8; 32]; 7] = v[1..].try_into().unwrap(); unsafe { opaque(&rest) }; *out = first;
}
#[no_mangle] pub fn p8(src: &[[u8; 32]], out: &mut [u8; 32]) {
    let v = keys(src); let first = v[0];
    let rest: [[u8; 32]; 7] = v[1..8].try_into().unwrap(); unsafe { opaque(&rest) }; *out = first;
}
