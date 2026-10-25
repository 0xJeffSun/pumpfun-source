#![no_std]
#![crate_type = "lib"]

#[panic_handler]
fn ph(_: &core::panic::PanicInfo) -> ! { loop {} }

pub struct Uses { pub total: u64, pub remaining: u64 }

// Mirrors candidate11 / public baseline: explicit `n > remaining` disjunct in the guard,
// followed by the redundant checked_sub.
#[no_mangle]
#[inline(never)]
pub extern "C" fn guard_explicit(n: u64, u: &Uses) -> u64 {
    if n == 0 || n > u.total || n > u.remaining {
        return 0x56;
    }
    match u.remaining.checked_sub(n) {
        Some(r) => r,
        None => 0x56,
    }
}

// Mirrors the hypothesized ORIGINAL source: no explicit `n > remaining` disjunct;
// the remaining bound is enforced solely by checked_sub.
#[no_mangle]
#[inline(never)]
pub extern "C" fn guard_checked(n: u64, u: &Uses) -> u64 {
    if n == 0 || n > u.total {
        return 0x56;
    }
    match u.remaining.checked_sub(n) {
        Some(r) => r,
        None => 0x56,
    }
}
