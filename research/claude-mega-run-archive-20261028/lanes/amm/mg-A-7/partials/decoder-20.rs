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

fn read_fee(bytes: &[u8]) -> DecodedTransferFee {
    DecodedTransferFee {
        epoch: u64::from_le_bytes(bytes[..8].try_into().unwrap()),
        maximum_fee: u64::from_le_bytes(bytes[8..16].try_into().unwrap()),
        transfer_fee_basis_points: u16::from_le_bytes(bytes[16..18].try_into().unwrap()),
    }
}
pub fn decode_transfer_fees(data: &[u8]) -> Result<Option<(DecodedTransferFee, DecodedTransferFee)>, ()> {
if data.len() != 82 && data.len() < 167 { return Err(()); }
 if data.len() == 82 { return Ok(None); }
 if data[82..165].iter().any(|byte| *byte != 0) { return Err(()); }
 if data[165] != 1 { return Err(()); }
 let tlv = &data[166..];
 let mut fees = None;
 let mut offset = 0usize;
 loop {
 let remaining = match tlv.get(offset..) { Some(remaining) => remaining, None => return Err(()) };
 if remaining.len() < 2 { return Ok(fees); }
 let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());
 if kind == 0 { return Ok(fees); }
 if remaining.len() < 4 { return Err(()); }
 let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;
let entry_size = length + 4;
 let value = match remaining.get(4..entry_size) { Some(value) => value, None => return Err(()) };
 if kind == 1 {
 if fees.is_some() || length < 108 { return Err(()); }
 fees = Some((read_fee(&value[72..90]), read_fee(&value[90..108])));
 }
 offset = match offset.checked_add(entry_size) { Some(next) => next, None => return Err(()) };
 }
}
