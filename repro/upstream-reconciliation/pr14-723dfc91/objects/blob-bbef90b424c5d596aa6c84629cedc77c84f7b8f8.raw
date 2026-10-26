#![no_std]
use core::panic::PanicInfo;
#[panic_handler]
fn panic(_: &PanicInfo) -> ! { loop {} }
#[repr(C)]
pub struct Meta { pub total: u64, pub remaining: u64, pub opaque: [u64; 8] }
extern "C" { fn cleanup(meta: *mut Meta); fn success(meta: *mut Meta, remaining: u64) -> u64; }
impl Drop for Meta { fn drop(&mut self) { unsafe { cleanup(self); } } }
#[no_mangle]
pub fn guard(mut m: Meta, n: u64) -> Result<u64, u32> {
    if n == 0 || n > m.total { return Err(86); }
    if m.remaining >= n {
        let r = m.remaining - n;
        m.remaining = r;
        Ok(unsafe { success(&mut m, r) })
    } else { Err(86) }
}
