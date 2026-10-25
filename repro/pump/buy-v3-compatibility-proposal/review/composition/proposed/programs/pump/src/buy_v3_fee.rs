// Natural source hypothesis, ordinary BuyV3 only. Not historical Rust.
// Numeric errors name constructor arguments, not original error-object bytes.
// Admitted AccountInfo identities/ownership, mint decoding, successful bounded
// allocations and error construction are supplied by the context/runtime owner.
pub type FeeResult<T> = core::result::Result<T, u32>;
#[derive(Clone, Copy)]
pub struct FeeTuple {
    pub protocol_amount: u64, pub creator_amount: u64,
    pub protocol_fee_bps: u64, pub creator_fee_bps: u64,
}
#[derive(Clone, Copy)]
pub struct Pretrade {
    pub mint_supply: u64, pub virtual_base: u64, pub virtual_quote: u64,
    pub quote_key: [u8; 32], pub creator_key: [u8; 32],
    pub creator_configurable: bool, pub curve_creator_bps: u64,
}
#[derive(Clone, Copy)]
pub struct Rates { pub lp: u64, pub protocol: u64, pub creator: u64 }
#[derive(Clone)]
pub struct Tier { pub threshold: u128, pub rates: Rates }
#[derive(Clone)]
pub struct Decoded {
    pub serialized_len: usize, pub bump: u8, pub admin: [u8; 32],
    pub flat: Rates, pub first: Vec<Tier>, pub second: Vec<Tier>, pub exotic: Rates,
}
struct Cursor<'a> { bytes: &'a [u8], at: usize }
impl<'a> Cursor<'a> {
    fn take<const N: usize>(&mut self) -> FeeResult<[u8; N]> {
        if self.bytes.len() - self.at < N { return Err(3003); }
        let mut value = [0; N];
        value.copy_from_slice(&self.bytes[self.at..self.at + N]);
        self.at += N; Ok(value)
    }
    fn word(&mut self) -> FeeResult<u64> { Ok(u64::from_le_bytes(self.take()?)) }
    fn rates(&mut self) -> FeeResult<Rates> {
        Ok(Rates { lp: self.word()?, protocol: self.word()?, creator: self.word()? })
    }
    fn tiers(&mut self) -> FeeResult<Vec<Tier>> {
        let n = u32::from_le_bytes(self.take()?) as usize;
        // 102 is initial capacity, not an acceptance bound. Runtime allocation
        // failures are a premise, not mapped to fabricated application errors.
        let mut out = Vec::with_capacity(n.min(102));
        for _ in 0..n {
            let threshold = u128::from_le_bytes(self.take()?);
            let rates = self.rates()?;
            out.push(Tier { threshold, rates });
        }
        Ok(out)
    }
}
pub fn decode(bytes: &[u8]) -> FeeResult<Decoded> {
    if bytes.len() < 8 { return Err(3001); }
    if bytes[..8] != [0x8f,0x34,0x92,0xbb,0xdb,0x7b,0x4c,0x9b] { return Err(3002); }
    let mut c = Cursor { bytes, at: 8 };
    // Original checks the combined bump/admin prefix before extracting either.
    if bytes.len() - 8 < 33 { return Err(3003); }
    let bump = c.take::<1>()?[0]; let admin = c.take()?;
    let flat = c.rates()?;
    let first = c.tiers()?; let second = c.tiers()?;
    let exotic = c.rates()?; // mandatory, even when selection will ignore it
    Ok(Decoded { serialized_len: bytes.len(), bump, admin, flat, first, second, exotic })
    // Trailing bytes allowed; no cap, sorting, monotonicity or rate validation.
}
fn table(tiers: &[Tier], threshold: u128) -> FeeResult<Rates> {
    let first = tiers.first().ok_or(6096u32)?;
    if threshold < first.threshold { return Ok(first.rates); }
    Ok(tiers.iter().rev().find(|t| t.threshold <= threshold)
        .unwrap_or(first).rates)
}
fn ceiling_fee(amount: u64, rate: u64) -> FeeResult<u64> {
    // (2^64-1)^2 + 10000 < 2^128: original checked ceil intermediates
    // cannot overflow here. Narrow each leg after division, never before.
    let value = (amount as u128 * rate as u128 + 9999) / 10000;
    if value > u64::MAX as u128 { return Err(6025); }
    Ok(value as u64)
}
pub const QUOTE_1: [u8; 32] = [6,155,136,87,254,171,129,132,251,104,127,99,70,24,192,53,218,196,57,220,26,235,59,85,152,160,240,0,0,0,0,1];
pub const QUOTE_2: [u8; 32] = [131,13,252,159,222,95,230,184,170,124,4,164,118,233,30,138,198,187,38,74,173,144,250,25,201,223,73,216,92,62,91,94];
pub const QUOTE_SECOND: [u8; 32] = [198,250,122,243,190,219,173,58,61,101,243,106,171,201,116,49,177,187,228,194,210,246,224,228,124,166,2,3,69,47,93,97];
pub fn ordinary_leg(c: &Decoded, s: &Pretrade, amount: u64, serialized_len: usize) -> FeeResult<FeeTuple> {
    // Called twice with identical pretrade inputs; this division precedes L gate.
    if s.virtual_base == 0 { return Err(6026); }
    let threshold = s.mint_supply as u128 * s.virtual_quote as u128 / s.virtual_base as u128;
    if serialized_len < 2512 { return Err(6097); }
    let mut rates = if s.quote_key == [0; 32] || s.quote_key == QUOTE_1 || s.quote_key == QUOTE_2 {
        table(&c.first, threshold)?
    } else if s.quote_key == QUOTE_SECOND {
        if serialized_len <= 4072 { return Err(6096); }
        table(&c.second, threshold)?
    } else if serialized_len > 4096 && (c.exotic.lp != 0 || c.exotic.protocol != 0 || c.exotic.creator != 0) {
        c.exotic
    } else { c.flat };
    if s.creator_configurable && s.curve_creator_bps != 0 { rates.creator = s.curve_creator_bps; }
    let protocol_amount = ceiling_fee(amount, rates.protocol)?;
    let creator_amount = if s.creator_key == [0; 32] { 0 } else { ceiling_fee(amount, rates.creator)? };
    Ok(FeeTuple { protocol_amount, creator_amount, protocol_fee_bps: rates.protocol, creator_fee_bps: rates.creator })
}

// Typed cross-program account reader. Account::try_from supplies ownership,
// uninitialized-state and borrow checks; Accounts expansion supplies field name.
use anchor_lang::prelude::*;
#[derive(Clone)]
pub struct BuyFeeConfig { pub decoded: Decoded }
impl Owner for BuyFeeConfig { fn owner() -> Pubkey { super::FEE_PROGRAM } }
impl Discriminator for BuyFeeConfig {
    const DISCRIMINATOR: &'static [u8] = &[0x8f,0x34,0x92,0xbb,0xdb,0x7b,0x4c,0x9b];
}
impl AccountDeserialize for BuyFeeConfig {
    fn try_deserialize(bytes: &mut &[u8]) -> Result<Self> {
        Ok(Self { decoded: decode(bytes).map_err(anchor_error)? })
    }
    fn try_deserialize_unchecked(bytes: &mut &[u8]) -> Result<Self> {
        // No init/reload-unchecked use exists for this foreign readonly account.
        // Still validate rather than providing a permissive success path.
        Self::try_deserialize(bytes)
    }
}
impl AccountSerialize for BuyFeeConfig {
    fn try_serialize<W: std::io::Write>(&self, w: &mut W) -> Result<()> {
        // Foreign account exits never serialize under Pump. A complete writer
        // makes the trait real; no Ok(()) placeholder for accidental use.
        fn rates<W: std::io::Write>(w:&mut W,r:Rates)->std::io::Result<()> {
            for v in [r.lp,r.protocol,r.creator] { w.write_all(&v.to_le_bytes())?; } Ok(())
        }
        w.write_all(Self::DISCRIMINATOR)?;
        w.write_all(&[self.decoded.bump])?; w.write_all(&self.decoded.admin)?;
        rates(w,self.decoded.flat)?;
        for tiers in [&self.decoded.first,&self.decoded.second] {
            let count=u32::try_from(tiers.len()).map_err(|_| Error::from(anchor_lang::error::ErrorCode::AccountDidNotSerialize))?;
            w.write_all(&count.to_le_bytes())?;
            for t in tiers { w.write_all(&t.threshold.to_le_bytes())?; rates(w,t.rates)?; }
        }
        rates(w,self.decoded.exotic)?; Ok(())
    }
}
pub fn anchor_error(code:u32)->Error {
    use anchor_lang::error::ErrorCode as E;
    // No raw ProgramError::Custom adapter: these remain AnchorError objects.
    match code {
        3001=>E::AccountDiscriminatorNotFound.into(),
        3002=>Error::from(E::AccountDiscriminatorMismatch).with_account_name("FeeConfig"),
        3003=>E::AccountDidNotDeserialize.into(),
        6025=>crate::PumpError::Truncation.into(),
        6026=>crate::PumpError::DivisionByZero.into(),
        6096=>crate::PumpError::FeeTiersEmpty.into(),
        6097=>crate::PumpError::FeeConfigTooShort.into(),
        _=>unreachable!("closed numeric fee contract"),
    }
}
