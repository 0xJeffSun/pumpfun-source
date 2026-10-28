#![no_std]
#[derive(Clone,Copy,Debug)]
pub struct DecodedTransferFee {pub epoch:u64,pub maximum_fee:u64,pub transfer_fee_basis_points:u16}
#[no_mangle]
pub fn fee_return(fee:&DecodedTransferFee, amount:u64)->Option<u64> {
    let bps=fee.transfer_fee_basis_points as u128;
    let zero = &(bps==0 || amount==0); if *zero {return Some(0); }
    let n=(amount as u128).checked_mul(bps)?;
    let raw=n.checked_add(10000)?.checked_sub(1)?.checked_div(10000)?.try_into().ok()?;
    Some(core::cmp::min(raw,fee.maximum_fee))
}