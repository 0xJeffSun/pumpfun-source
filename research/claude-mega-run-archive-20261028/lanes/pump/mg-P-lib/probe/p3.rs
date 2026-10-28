#![no_std]
#[no_mangle] pub fn b1(d: &[u8]) -> i128 { if d.len() >= 261 { i128::from_le_bytes([d[245],d[246],d[247],d[248],d[249],d[250],d[251],d[252],d[253],d[254],d[255],d[256],d[257],d[258],d[259],d[260]]) } else { 0 } }
#[no_mangle] pub fn b2(d: &[u8]) -> i128 { if d.len() >= 261 { d[245..261].iter().rev().fold(0i128, |acc, b| (acc << 8) | *b as i128) } else { 0 } }
#[no_mangle] pub fn b3(d: &[u8]) -> i128 { if d.len() >= 261 { let mut b=[0u8;16]; for i in 0..16 { b[i]=d[245+i]; } i128::from_le_bytes(b) } else { 0 } }
#[no_mangle] pub fn b4(d: &[u8]) -> i128 { if d.len() >= 261 { let p: &[u8;261] = d[..261].try_into().unwrap(); let mut b=[0u8;16]; b.copy_from_slice(&p[245..]); i128::from_le_bytes(b) } else { 0 } }
#[no_mangle] pub fn b5(d: &[u8]) -> i128 { if d.len() >= 261 { let t: [u8;17] = d[244..261].try_into().unwrap(); i128::from_le_bytes(t[1..].try_into().unwrap()) } else { 0 } }
#[no_mangle] pub fn b6(d: &[u8]) -> i128 { if d.len() >= 261 { let t: [u8;24] = { let mut x=[0u8;24]; x[..17].copy_from_slice(&d[244..261]); x }; i128::from_le_bytes(t[1..17].try_into().unwrap()) } else { 0 } }
#[no_mangle] pub fn b7(d: &[u8]) -> i128 { if d.len() >= 261 { let mut v=0u128; for i in (0..16).rev() { v = v << 8 | d[245+i] as u128; } v as i128 } else { 0 } }
