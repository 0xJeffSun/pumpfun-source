//! Natural-source fragments, not historical source or a deployable program.
//! Account admission/initialization is specified in context-hypothesis.rs and REPORT.md.
//! Framework errors, CPI, borrow/allocator failure and rollback are explicit premises.
pub type Key = [u8; 32];
pub type Result<T> = core::result::Result<T, u32>;
#[derive(Clone)]
pub struct Debouncer { pub bump: u8, pub state: u8, pub config_id: Key, pub mint: Key, pub total_amount: u64 }
pub struct Tracker { pub bump: u8, pub state: u8, pub config_id: Key, pub mint: Key, pub current_epoch: u128 }
pub struct Distribution { pub bump: u8, pub state: u8, pub config_id: Key, pub mint: Key, pub epoch: u128, pub total_amount: u64 }
pub struct Whitelist { pub bump: u8, pub mints: Vec<Key> }
pub struct Closed { pub config_id: Key, pub mint: Key, pub epoch: u128, pub gross_epoch_amount: u64 }
pub const RELAYER: Key = [6,60,9,17,1,167,148,6,84,61,7,80,243,128,167,83,22,146,37,6,191,90,134,99,143,124,30,98,184,78,58,237];
pub const WHITELIST_SPACE: usize = 8 + 1 + 4 + 32 * 32;
pub const EVENT_DISCRIMINATOR: [u8; 8] = [155,169,23,14,6,117,86,147];
pub const EVENT_CPI_TAG: [u8; 8] = [228,69,165,46,81,203,154,29];

pub fn authorize(key: &Key) -> Result<()> {
    if key != &RELAYER { return Err(6015); }
    Ok(())
}

// W101: context already parsed and address checked; preserve duplicates and ordering.
// Allocation needed to deserialize input occurs BEFORE this length check.
pub fn upsert_mint_whitelist_v1(signer: &Key, account: &mut Whitelist,
                               canonical_bump: u8, mints: Vec<Key>) -> Result<()> {
    authorize(signer)?;
    if mints.len() > 32 { return Err(6032); }
    account.mints = mints;
    account.bump = canonical_bump;
    Ok(())
}

// Fixed external contracts: transfer_checked emits [12, amount_le[8], decimals].
// Backend has parsed from/mint/to/authority/token_program account identities.
// It uses exactly [b"debouncer_v1", stored_config, stored_mint, stored_bump]
// as one signer group, no remaining multisig signers/accounts in this helper.
// Logs, self-CPI and return-data operations below are distinct effects.
pub trait CloseEffects {
    fn transfer_checked(&mut self, amount: u64, decimals: u8,
        config: &Key, mint: &Key, bump: u8) -> Result<()>;
    fn log_data(&mut self, event: &[u8]);
    fn event_cpi(&mut self, data: &[u8], event_authority_bump: u8) -> Result<()>;
    fn set_return_data(&mut self, data: &[u8]);
    // Exit order: Distribution serialization, distribution ATA borrow/exit,
    // Tracker serialization, Debouncer serialization, other account exits.
    fn exit(&mut self, d: &Distribution, t: &Tracker, b: &Debouncer) -> Result<()>;
}

// W96 plus W204/W183. config_id argument governs parser PDA derivations;
// W96 copies the STORED debouncer config and mint, not these argument bytes.
// Caller supplies admitted context. Atomic transaction rollback is required on Err.
// Do not use these mutations as a standalone nontransactional account engine.
pub fn close_donation_epoch_v1<E: CloseEffects>(effects: &mut E,
    signer: &Key, _config_id: Key, epoch: u128, decimals: u8,
    distribution_bump: u8, event_bump: u8,
    d: &mut Distribution, t: &mut Tracker, b: &mut Debouncer) -> Result<Closed> {
    authorize(signer)?;
    let amount = b.total_amount;
    if amount == 0 { return Err(6012); }
    if t.current_epoch != epoch { return Err(6011); }
    let closed_epoch = t.current_epoch;
    d.config_id = b.config_id;
    d.mint = b.mint;
    d.epoch = closed_epoch;
    d.bump = distribution_bump;
    d.total_amount = amount;
    d.state = 1;
    effects.transfer_checked(amount, decimals, &b.config_id, &b.mint, b.bump)?;
    b.total_amount = 0;
    t.current_epoch = t.current_epoch.checked_add(1).ok_or(6008u32)?;
    let e = Closed { config_id: b.config_id, mint: b.mint,
        epoch: closed_epoch, gross_epoch_amount: amount };
    let payload = e.payload();
    let mut logged = Vec::with_capacity(97);
    logged.extend_from_slice(&EVENT_DISCRIMINATOR);
    logged.extend_from_slice(&payload);
    effects.log_data(&logged);
    let mut cpi = Vec::with_capacity(105);
    cpi.extend_from_slice(&EVENT_CPI_TAG);
    cpi.extend_from_slice(&logged);
    effects.event_cpi(&cpi, event_bump)?;
    effects.set_return_data(&payload);
    effects.exit(d, t, b)?;
    Ok(e)
}
impl Closed {
    // W117: enum ordinal 1 precedes fields. Return data excludes Anchor event prefix.
    pub fn payload(&self) -> [u8; 89] {
        let mut v = [0; 89]; v[0] = 1;
        v[1..33].copy_from_slice(&self.config_id);
        v[33..65].copy_from_slice(&self.mint);
        v[65..81].copy_from_slice(&self.epoch.to_le_bytes());
        v[81..89].copy_from_slice(&self.gross_epoch_amount.to_le_bytes()); v
    }
}

// W79 normal-success wire contract: no max-32 check in this parser.
// The original allocates min(n,128)*32 before checking all elements, then grows.
// This portable fragment preserves decoded values/cursor, not OOM precedence.
pub fn read_keys(input: &mut &[u8]) -> Result<Vec<Key>> {
    if input.len() < 4 { *input = &[]; return Err(3003); }
    let n = u32::from_le_bytes(input[..4].try_into().unwrap()) as usize;
    *input = &input[4..];
    let mut keys = Vec::with_capacity(n.min(128));
    for _ in 0..n {
        if input.len() < 32 { *input = &[]; return Err(3003); }
        keys.push(input[..32].try_into().unwrap()); *input = &input[32..];
    }
    Ok(keys)
}
pub fn parse_whitelist(data: &[u8]) -> Result<Whitelist> {
    const DISC: [u8;8] = WHITELIST_DISC;
    if data.len() < 8 { return Err(3001); }
    if data[..8] != DISC { return Err(3002); }
    if data.len() == 8 { return Err(3003); }
    let mut rest = &data[9..];
    Ok(Whitelist { bump: data[8], mints: read_keys(&mut rest)? })
}
// W158 writes a prefix into the existing allocation and leaves unused tail untouched.
// It does not resize, sort, deduplicate, or clear the old suffix after a shorter update.
pub fn serialize_whitelist(w: &Whitelist, out: &mut [u8]) -> Result<usize> {
    fn put(out: &mut [u8], pos: &mut usize, bytes: &[u8]) -> Result<()> {
        let n = bytes.len().min(out.len().saturating_sub(*pos));
        out[*pos..*pos+n].copy_from_slice(&bytes[..n]); *pos += n;
        if n == bytes.len() { Ok(()) } else { Err(3004) }
    }
    let mut p = 0;
    put(out,&mut p,&WHITELIST_DISC)?;
    put(out,&mut p,&[w.bump])?;
    let n = u32::try_from(w.mints.len()).map_err(|_|3004u32)?;
    put(out,&mut p,&n.to_le_bytes())?;
    for key in &w.mints { put(out,&mut p,key)?; }
    Ok(p)
}

pub const WHITELIST_DISC: [u8;8] = [73, 115, 177, 235, 234, 1, 95, 67];
