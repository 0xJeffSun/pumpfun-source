#![no_std]
#[no_mangle]
pub fn adj1(data: &[u8]) -> i128 { if data.len() >= 261 { i128::from_le_bytes(data[245..261].try_into().unwrap()) } else { 0 } }
