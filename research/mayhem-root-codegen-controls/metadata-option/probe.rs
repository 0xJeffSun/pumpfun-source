#![no_std]
#[inline(never)]
pub fn bump(value: u64) -> u64 { value.wrapping_add(1) }
