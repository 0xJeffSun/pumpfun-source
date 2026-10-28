#![no_std]

#[derive(Clone, Copy, Debug)]
pub struct DecodedTransferFee {
    pub epoch: u64,
    pub maximum_fee: u64,
    pub transfer_fee_basis_points: u16,
}

impl DecodedTransferFee {
    #[inline(never)]
pub fn calculate_fee(&self, amount:u64)->Option<u64> {
    if amount==0 {return Some(0); }
    let bps=self.transfer_fee_basis_points as u128;
    if bps==0 { return Some(0); }
    let n=(amount as u128).checked_mul(bps)?;
    let raw=n.checked_add(10000)?.checked_sub(1)?.checked_div(10000)?.try_into().ok()?;
    Some(core::cmp::min(raw,self.maximum_fee))
}
}
