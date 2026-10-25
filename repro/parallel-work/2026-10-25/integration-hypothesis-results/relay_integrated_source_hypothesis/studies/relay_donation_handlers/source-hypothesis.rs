// Review-only natural source; not historical identity, a compiled candidate, or full ABI.
// Framework and runtime operations are explicit premises P0-P8 in REPORT.md.
// No inferred extra zero-amount, config-authority, or credited_to-signature check.
type Key = [u8; 32];
type R<T> = Result<T, Error>;
#[derive(Debug)]
pub enum Error { Custom(u32), Framework, Cpi }
fn require(ok: bool, code: u32) -> R<()> {
    if ok { Ok(()) } else { Err(Error::Custom(code)) }
}
pub struct Args { pub amount: u64, pub config_id: Key, pub tip_bps: u16,
                  pub message: String, pub credited_to: Key }
pub struct Epoch { pub bump: u8, pub initialized: bool, pub config_id: Key,
                   pub mint: Key, pub current_epoch: u128 }
pub struct Debouncer { pub bump: u8, pub initialized: bool, pub config_id: Key,
                       pub mint: Key, pub total_amount: u64 }
pub struct Accounts { pub epoch: Epoch, pub debouncer: Debouncer,
    pub mint: Key, pub mint_owner: Key, pub whitelist: Vec<Key>,
    pub epoch_bump: u8, pub debouncer_bump: u8 }
pub struct Event { pub daas_event_discriminator: u8, pub config_id: Key,
    pub mint: Key, pub epoch: u128, pub gross_amount: u64, pub tip: u64,
    pub message: String, pub credited_to: Key }
#[derive(Clone,Copy)]
pub enum Variant { TokenBytes, TokenPubkey, TokenPubkeyWithPayer, NativeBytes, NativePubkey }
// All methods are fallible and called in the observed order. Neither a mocked CPI
// nor arbitrary successful acceptance satisfies these contracts.
pub trait Premises {
    // Exact entry context parsers121/135/138/126/131 incl init helpers, constraints,
    // signer checks and account error origin. P1 is deliberately not an empty hook.
    fn parse_context(&mut self, v: Variant, a: &Args) -> R<Accounts>;
    // [753024,753056) or [753152,753184), compared to mint AccountInfo.owner.
    fn supported_token_owner(&self, owner: &Key) -> bool;
    // Exactly [753184,753216) or [752800,752832), not any mint with is_native flag.
    fn builtin_native_mint(&self, mint: &Key) -> bool;
    // Window106 [115456,118896): borrow/base-mint parsing and extension policy.
    // A parse error propagates; a successful false becomes6031 in shared112.
    fn safe_mint_106(&mut self) -> R<bool>;
    // The same debouncer ATA AccountInfo, reborrowed/decoded each time:110/231/251.
    fn read_destination_amount(&mut self) -> R<u64>;
    //111/232 supplies decimals. This does not itself transfer any tokens.
    fn read_mint_decimals(&mut self) -> R<u8>;
    //226/248: transfer_checked(source,mint,destination,from,amount,decimals).
    // Four metas, from signer, no multisigners or remaining accounts forwarded here.
    fn transfer_checked(&mut self, amount: u64, decimals: u8) -> R<()>;
    //294: system transfer from -> temporary WSOL PDA, exact requested amount.
    fn fund_temp_native(&mut self, amount: u64) -> R<()>;
    //230/249: token sync_native(temp).
    fn sync_temp_native(&mut self) -> R<()>;
    //229/247: token close_account(temp, destination=from, authority=from).
    fn close_temp_native(&mut self) -> R<()>;
    //190..193: log discriminator+serialized Event, then event-authority-signed self CPI.
    fn log_and_emit_self_cpi(&mut self, e: &Event) -> R<()>;
    // Wrapper120->302 then125/130/141: set return bytes, then account exit.
    fn set_event_return_data(&mut self, e: &Event) -> R<()>;
    fn accounts_exit(&mut self, v: Variant, c: &Accounts) -> R<()>;
}
// Body shared112. Initialized booleans mean the decoded enum state: decoder
// premise rejects invalid enum tags; internal Rust offsets are NOT wire offsets.
fn donate_shared(p: &mut impl Premises, c: &mut Accounts, a: &Args) -> R<(u128,u64,u64)> {
    require(a.message.as_bytes().len() < 256, 6009)?;       //131256
    require(a.tip_bps <= 10000, 6018)?;                    //131320
    require(p.supported_token_owner(&c.mint_owner), 6029)?;//131896..132392
    if !p.builtin_native_mint(&c.mint) && !c.whitelist.contains(&c.mint) {
        require(p.safe_mint_106()?, 6031)?;                //134336..134920
    }
    if !c.epoch.initialized {                             //132568..132808
        c.epoch.config_id = a.config_id;
        c.epoch.mint = c.mint;
        c.epoch.bump = c.epoch_bump;
        c.epoch.current_epoch = 0;
        c.epoch.initialized = true;
    }
    if !c.debouncer.initialized {                         //132824..133048
        c.debouncer.config_id = a.config_id;
        c.debouncer.mint = c.mint;
        c.debouncer.bump = c.debouncer_bump;
        c.debouncer.initialized = true;
        c.debouncer.total_amount = 0;
    }
    require(c.epoch.config_id == a.config_id, 6002)?;      //133056..133824
    require(c.debouncer.config_id == a.config_id, 6002)?;  //134952..135976
    require(c.debouncer.mint == c.mint, 6006)?;            //136024
    require(c.debouncer.initialized, 6007)?;              //137096
    require(c.epoch.mint == c.mint, 6006)?;                //137160
    require(c.epoch.initialized, 6007)?;                  //138224
    let before = p.read_destination_amount()?;           //138296
    let decimals = p.read_mint_decimals()?;               //138392
    p.transfer_checked(a.amount, decimals)?;             //140704
    let after = p.read_destination_amount()?;            //140752
    let delta = after.checked_sub(before).ok_or(Error::Custom(6008))?;
    let product = delta.checked_mul(u64::from(a.tip_bps)).ok_or(Error::Custom(6008))?;
    let total = c.debouncer.total_amount.checked_add(delta).ok_or(Error::Custom(6008))?;
    c.debouncer.total_amount = total;                     //141184
    let tip = product / 10000;                           //141256
    Ok((c.epoch.current_epoch, delta, tip))
}
fn run(p: &mut impl Premises, v: Variant, a: Args) -> R<Event> {
    let mut c = p.parse_context(v, &a)?;
    let native = matches!(v, Variant::NativeBytes | Variant::NativePubkey);
    if native {                                         //92 or93 BEFORE shared112
        p.fund_temp_native(a.amount)?;
        p.sync_temp_native()?;
    }
    let (epoch, gross_amount, tip) = donate_shared(p, &mut c, &a)?;
    if native { p.close_temp_native()?; }                //75976 or82248
    let event = Event { daas_event_discriminator: 0, config_id: a.config_id,
        mint: c.mint, epoch, gross_amount, tip, message: a.message, credited_to: a.credited_to };
    p.log_and_emit_self_cpi(&event)?;
    p.set_event_return_data(&event)?;
    p.accounts_exit(v, &c)?;
    Ok(event)
}
// Pubkey representation is its existing raw32 bytes. No hash, key-derived authority,
// account lookup, relayer approval, or recipient payout is introduced by conversion.
pub fn donate_v1(p: &mut impl Premises, a: Args) -> R<Event> { run(p, Variant::TokenBytes, a) }
pub fn donate_pubkey_config_id_v1(p: &mut impl Premises, a: Args) -> R<Event> { run(p, Variant::TokenPubkey, a) }
pub fn donate_pubkey_config_id_with_payer_v1(p: &mut impl Premises, a: Args) -> R<Event> { run(p, Variant::TokenPubkeyWithPayer, a) }
pub fn donate_native_v1(p: &mut impl Premises, a: Args) -> R<Event> { run(p, Variant::NativeBytes, a) }
pub fn donate_native_pubkey_config_id_v1(p: &mut impl Premises, a: Args) -> R<Event> { run(p, Variant::NativePubkey, a) }
