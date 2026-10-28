#![no_std]
#[no_mangle] pub fn a2(data: &[u8]) -> i128 { if data.len() >= 261 { let mut b=[0u8;16]; b.copy_from_slice(&data[245..261]); i128::from_le_bytes(b) } else { 0 } }
#[no_mangle] pub fn a3(data: &[u8]) -> i128 { if data.len() >= 261 { i128::from_le_bytes(*<&[u8;16]>::try_from(&data[245..261]).unwrap()) } else { 0 } }
#[no_mangle] pub fn a4(data: &[u8]) -> i128 { let mut v=0i128; if data.len() >= 261 { for (i,b) in data[245..261].iter().enumerate() { v |= (*b as i128) << (8*i); } } v }
#[no_mangle] pub fn a5(data: &[u8]) -> i128 { if data.len() >= 261 { u128::from_le_bytes(data[245..261].try_into().unwrap()) as i128 } else { 0 } }
#[no_mangle] pub fn a6(data: &[u8]) -> i128 { match <[u8;16]>::try_from(&data[245..261]) { Ok(b) => i128::from_le_bytes(b), Err(_) => 0 } }
#[no_mangle] pub fn a7(data: &[u8]) -> i128 { if data.len() > 260 { let (lo,hi)=data[245..261].split_at(8); (i64::from_le_bytes(hi.try_into().unwrap()) as i128) << 64 | u64::from_le_bytes(lo.try_into().unwrap()) as i128 } else { 0 } }
#[no_mangle] pub fn a8(data: &[u8]) -> i128 { data.get(245..261).map(|b| { let mut x=[0u8;16]; x.copy_from_slice(b); i128::from_le_bytes(x) }).unwrap_or(0) }
