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

    fn ceil_div(numerator: u128, denominator: u128) -> Option<u128> {
        numerator
            .checked_add(denominator)?
            .checked_sub(1)?
            .checked_div(denominator)
    }

    #[inline(never)]
    pub fn calculate_pre_fee_amount(&self, post_fee_amount: u64) -> Option<u64> {
        let transfer_fee_basis_points = self.transfer_fee_basis_points as u128;
        match (transfer_fee_basis_points, post_fee_amount) {
            (0, _) => Some(post_fee_amount),
            (_, 0) => Some(0),
            (ONE_IN_BASIS_POINTS, _) => self.maximum_fee.checked_add(post_fee_amount),
            _ => {
                let numerator = (post_fee_amount as u128).checked_mul(ONE_IN_BASIS_POINTS)?;
                let denominator = ONE_IN_BASIS_POINTS.checked_sub(transfer_fee_basis_points)?;
                let raw_pre_fee_amount = Self::ceil_div(numerator, denominator)?;

                if raw_pre_fee_amount.checked_sub(post_fee_amount as u128)? >= self.maximum_fee as u128 {
                    post_fee_amount.checked_add(self.maximum_fee)
                } else {
                    u64::try_from(raw_pre_fee_amount).ok()
                }
            }
        }
    }
}

const MAX_FEE_BASIS_POINTS: u16 = 10_000;
const ONE_IN_BASIS_POINTS: u128 = MAX_FEE_BASIS_POINTS as u128;
