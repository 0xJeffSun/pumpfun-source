#![no_std]
pub struct Info { pub key: [u8; 32], pub v: u64 }
pub struct Signer<'a> { info: &'a Info }
impl<'a> core::ops::Deref for Signer<'a> { type Target = Info; #[inline] fn deref(&self) -> &Info { self.info } }
impl<'a> AsRef<Info> for Signer<'a> { #[inline] fn as_ref(&self) -> &Info { self.info } }
pub struct Mint { pub supply: u64, pub decimals: u8 }
pub struct Acc<'a> { pub info: &'a Info, pub data: Mint }
pub struct Accts<'a> { pub user: Signer<'a>, pub uv: &'a mut Acc<'a>, pub uq: &'a Acc<'a>, pub qm: &'a Acc<'a>, pub qtp: Signer<'a>, pub bm: &'a Acc<'a> }
#[inline(never)] pub fn callee(p: &Info, uv: &mut Acc, uq: &Acc, dec: u8, qm: &Info, qtp: &Info, amount: u64, bm: &[u8; 32]) -> u64 {
    uv.data.supply += amount + dec as u64 + p.v + uq.data.supply + qm.v + qtp.v + bm[0] as u64; uv.data.supply }
pub fn caller_mut(a: &mut Accts, amount: u64) -> u64 {
    callee(a.user.as_ref(), &mut *a.uv, &*a.uq, a.qm.data.decimals, a.qm.info, a.qtp.as_ref(), amount, &a.bm.info.key)
}

pub fn caller_deref(a: &mut Accts, amount: u64) -> u64 {
    callee(&a.user, &mut *a.uv, &*a.uq, a.qm.data.decimals, a.qm.info, &a.qtp, amount, &a.bm.info.key)
}
