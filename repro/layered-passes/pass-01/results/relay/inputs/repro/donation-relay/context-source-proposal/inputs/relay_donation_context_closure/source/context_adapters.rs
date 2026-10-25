//! Natural source proposal, uncompiled. No runtime implementation or success stubs.
//! Account handles preserve shared AccountInfo/RefCell identity. See REPORT.md.
pub type Key = [u8;32];
pub type A = usize;
pub type R<T> = Result<T, Error>;
#[derive(Debug)]
pub struct Error { pub code: u32, pub field: &'static str }
fn check(ok: bool, code: u32, field: &'static str) -> R<()> {
    if ok { Ok(()) } else { Err(Error {code,field}) }
}
pub const ASSOCIATED: Key = [140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216, 219, 233, 248, 89];
pub const TOKEN: Key = [6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169];
pub const TOKEN2022: Key = [6,221,246,225,238,117,143,222,24,66,93,188,228,108,205,218,182,26,252,77,131,185,13,39,254,189,249,40,216,161,139,252];
pub const NATIVE: Key = [6,155,136,87,254,171,129,132,251,104,127,99,70,24,192,53,218,196,57,220,26,235,59,85,152,160,240,0,0,0,0,1];
pub const NATIVE2022: Key = [131,13,252,159,222,95,230,184,170,124,4,164,118,233,30,138,198,187,38,74,173,144,250,25,201,223,73,216,92,62,91,94];
// 103 is bool, not Result. Unknown program also returns false on ordinary path.
pub fn native_pair(mint: Key, program: Key) -> bool {
    if program == TOKEN { mint == NATIVE }
    else if program == TOKEN2022 { mint == NATIVE2022 }
    else { false }
}
pub enum StateKind { Epoch, Debouncer }
pub struct TokenState { pub mint: Key, pub authority: Key }
/// Only bounded runtime/framework primitives are imported. Implementations must
/// propagate their original errors, not return fabricated state or success.
pub trait Framework {
    type State;
    fn key(&self,a:A)->Key;
    fn owner(&self,a:A)->Key;
    fn writable(&self,a:A)->bool;
    fn signer(&self,a:A)->bool;
    fn executable(&self,a:A)->bool;
    fn decode_mint_checked(&self,a:A)->R<()>;
    fn decode_whitelist_checked(&self,a:A)->R<u8>;
    fn load_rent_sysvar(&mut self)->R<()>;
    fn program_id(&self)->Key;
    // 326/327 use ordinary borrow() and can panic on conflicting borrow.
    fn lamports(&self,a:A)->u64;
    fn data_len(&self,a:A)->usize;
    fn minimum_balance(&self,space:usize)->u64;
    // Must read lamports FIRST (326), then fallibly borrow data (328), then
    // check rent for current data length (325); release borrows before any CPI.
    fn rent_exempt_current(&self,a:A)->R<bool>;
    fn decode_checked(&self,a:A,kind:&StateKind)->R<Self::State>;
    fn decode_unchecked(&self,a:A,kind:&StateKind)->R<Self::State>;
    fn decode_token(&self,a:A)->R<TokenState>;
    // Signed System CPIs; no caller signature or target-owner checks bypassed.
    fn create(&mut self,payer:A,target:A,lamports:u64,space:usize,owner:Key,seeds:&[&[u8]])->R<()>;
    fn transfer(&mut self,payer:A,target:A,lamports:u64)->R<()>;
    fn allocate(&mut self,target:A,space:usize,seeds:&[&[u8]])->R<()>;
    fn assign(&mut self,target:A,owner:Key,seeds:&[&[u8]])->R<()>;
    fn create_ata(&mut self,payer:A,target:A,authority:A,mint:A,token_program:A)->R<()>;
    fn ata_address(&self,authority:Key,mint:Key,program:Key)->Key;
    // Token2022: fallible base-mint/TLV parse -> required account extensions ->
    // account length. Must retain malformed-TLV errors. Legacy length is 165.
    // Recomputed for allocate after prefunded transfer, as in 129/134.
    fn token2022_account_space(&self,mint:A)->R<usize>;
    fn initialize_account3(&mut self,target:A,mint:A,authority:A,program:A)->R<()>;
    fn find_pda(&self,seeds:&[&[u8]])->R<(Key,u8)>;
    fn create_pda(&self,seeds:&[&[u8]])->R<Key>;
}
fn mut_rent<F:Framework>(f:&F,a:A,name:&'static str)->R<()> {
    check(f.writable(a),2000,name)?;
    check(f.rent_exempt_current(a)?,2005,name)
}
/// Helpers122/127/132/136/139 and123/128/133/137/140.
/// Caller already checked canonical PDA; post-call mut/rent checks are separate.
pub fn program_account<F:Framework>(f:&mut F,a:A,payer:A,kind:StateKind,seeds:&[&[u8]],name:&'static str)->R<F::State> {
    let space=match kind { StateKind::Epoch=>90, StateKind::Debouncer=>82 };
    if f.owner(a)!=[0;32] {
        let state=f.decode_checked(a,&kind)?; // NOT unchecked, even before size
        check(f.data_len(a)==space,2019,name)?;
        check(f.owner(a)==f.program_id(),2004,name)?;
        let minimum=f.minimum_balance(space);
        check(f.lamports(a)>=minimum,2005,name)?;
        return Ok(state);
    }
    let current=f.lamports(a);
    if current==0 {
        f.create(payer,a,f.minimum_balance(space),space,f.program_id(),seeds)?;
    } else {
        check(f.key(payer)!=f.key(a),4101,name)?;
        let deficit=f.minimum_balance(space).max(1).saturating_sub(current);
        if deficit>0 { f.transfer(payer,a,deficit)?; }
        f.allocate(a,space,seeds)?;
        f.assign(a,f.program_id(),seeds)?;
    }
    f.decode_unchecked(a,&kind)
}
///124: system-owned ATA is created; other owners are decoded before constraints.
pub fn destination_ata<F:Framework>(f:&mut F,a:A,payer:A,authority:A,mint:A,program:A)->R<TokenState> {
    if f.owner(a)==[0;32] { f.create_ata(payer,a,authority,mint,program)?; }
    let t=f.decode_token(a)?;
    check(t.mint==f.key(mint),2014,"debouncer_token_account")?;
    check(t.authority==f.key(authority),2015,"debouncer_token_account")?;
    check(f.owner(a)==f.key(program),2023,"debouncer_token_account")?;
    check(f.key(a)==f.ata_address(f.key(authority),f.key(mint),f.key(program)),3014,"debouncer_token_account")?;
    Ok(t)
}
fn temp_space<F:Framework>(f:&F,mint:A)->R<usize> {
    //129 tests the MINT AccountInfo owner, not merely the token program key.
    if f.owner(mint)==TOKEN2022 { f.token2022_account_space(mint) } else { Ok(165) }
}
///129/134: init, not init_if_needed. No already-token-owned acceptance path.
pub fn native_temp<F:Framework>(f:&mut F,a:A,from:A,mint:A,program:A,seeds:&[&[u8]])->R<TokenState> {
    let current=f.lamports(a);
    if current==0 {
        let n=temp_space(f,mint)?;
        f.create(from,a,f.minimum_balance(n),n,f.key(program),seeds)?;
    } else {
        check(f.key(from)!=f.key(a),4101,"temp_wsol_token_account")?;
        let n=temp_space(f,mint)?;
        let deficit=f.minimum_balance(n).max(1).saturating_sub(current);
        if deficit>0 { f.transfer(from,a,deficit)?; }
        let n=temp_space(f,mint)?;
        f.allocate(a,n,seeds)?;
        f.assign(a,f.key(program),seeds)?;
    }
    f.initialize_account3(a,mint,from,program)?;
    f.decode_token(a)
}
#[derive(Clone,Copy)]
pub enum Variant { TokenBytes, TokenPubkey, TokenPubkeyWithPayer, NativeBytes, NativePubkey }
pub struct Accounts<S> {
    pub epoch:A, pub debouncer:A, pub destination:A, pub mint:A, pub source:A,
    pub from:A, pub payer:A, pub whitelist:A, pub token_program:A,
    pub event_authority:A, pub event_program:A, pub associated_program:A, pub system_program:A, pub whitelist_bump:u8,
    pub source_token:Option<TokenState>, pub epoch_state:Option<S>, pub debouncer_state:Option<S>,
}
pub struct Bumps { pub epoch:u8, pub debouncer:u8, pub temp:Option<u8>, pub event:u8 }
/// Input is AFTER the ordered account-type decoding phase documented in REPORT.
/// This adapter does not silently replace that phase or the wrapper argument parse.
/// payer=from except WithPayer; source is typed ATA except Native variants.
pub fn constraints<F:Framework>(f:&mut F,a:&mut Accounts<F::State>,config:Key,v:Variant)->R<Bumps> {
    let native=matches!(v,Variant::NativeBytes|Variant::NativePubkey);
    f.load_rent_sysvar()?;
    let payer=if matches!(v,Variant::TokenPubkeyWithPayer) {a.payer} else {a.from};
    let mint=f.key(a.mint); let program=f.key(a.token_program);
    let (epoch_key,eb)=f.find_pda(&[b"epoch_tracker_v1",&config,&mint])?;
    check(f.key(a.epoch)==epoch_key,2006,"epoch_tracker")?;
    a.epoch_state=Some(program_account(f,a.epoch,payer,StateKind::Epoch,&[b"epoch_tracker_v1",&config,&mint,&[eb]],"epoch_tracker")?);
    mut_rent(f,a.epoch,"epoch_tracker")?;
    let (debouncer_key,db)=f.find_pda(&[b"debouncer_v1",&config,&mint])?;
    check(f.key(a.debouncer)==debouncer_key,2006,"debouncer")?;
    a.debouncer_state=Some(program_account(f,a.debouncer,payer,StateKind::Debouncer,&[b"debouncer_v1",&config,&mint,&[db]],"debouncer")?);
    mut_rent(f,a.debouncer,"debouncer")?;
    destination_ata(f,a.destination,payer,a.debouncer,a.mint,a.token_program)?;
    mut_rent(f,a.destination,"debouncer_token_account")?;
    let temp=if native {
        let from=f.key(a.from);
        let (key,b)=f.find_pda(&[b"donate_native_wsol_tmp_v1",&from,&program])?;
        check(f.key(a.source)==key,2006,"temp_wsol_token_account")?;
        a.source_token=Some(native_temp(f,a.source,a.from,a.mint,a.token_program,&[b"donate_native_wsol_tmp_v1",&from,&program,&[b]])?);
        mut_rent(f,a.source,"temp_wsol_token_account")?;
        Some(b)
    } else { None };
    check(f.writable(a.mint),2000,"mint")?;
    if native { check(native_pair(mint,program),6006,"mint")?; }
    check(f.owner(a.mint)==program,2022,"mint")?;
    if !native {
        check(f.owner(a.source)==program,2023,"from_token_account")?;
        // Source token state must come from initial checked interface decode.
        // Missing typed state is an integration error, never accepted as success.
        let t=a.source_token.as_ref().expect("initial typed source decode required");
        check(t.authority==f.key(a.from),2015,"from_token_account")?;
        check(f.key(a.source)==f.ata_address(f.key(a.from),mint,program),2009,"from_token_account")?;
        check(f.writable(a.source),2000,"from_token_account")?;
    }
    check(f.writable(a.from),2000,"from")?;
    if matches!(v,Variant::TokenPubkeyWithPayer) {check(f.writable(a.payer),2000,"payer")?;}
    // Stored bump, NOT find_program_address. Derivation failure maps to2006.
    let whitelist=f.create_pda(&[b"mint_whitelist_v1",&[a.whitelist_bump]])
        .map_err(|_|Error{code:2006,field:"mint_whitelist"})?;
    check(f.key(a.whitelist)==whitelist,2006,"mint_whitelist")?;
    if native {check(program==TOKEN||program==TOKEN2022,6029,"token_program")?;}
    let (event,event_bump)=f.find_pda(&[b"__event_authority"])?;
    check(f.key(a.event_authority)==event,2006,"event_authority")?;
    Ok(Bumps{epoch:eb,debouncer:db,temp,event:event_bump})
}

fn take(it:&mut impl Iterator<Item=A>,field:&'static str)->R<A> {
    it.next().ok_or(Error{code:3005,field})
}
fn program_check<F:Framework>(f:&F,a:A,allowed:&[Key],name:&'static str)->R<()> {
    check(allowed.contains(&f.key(a)),3008,name)?;
    check(f.executable(a),3009,name)
}
/// Ordered type admission, after argument decoding. The ATA program is fixed.
/// This retains remaining
/// accounts; there is no invented requirement that the iterator be exhausted.
pub fn admit<F:Framework>(f:&F,it:&mut impl Iterator<Item=A>,v:Variant)->R<Accounts<F::State>> {
    let native=matches!(v,Variant::NativeBytes|Variant::NativePubkey);
    let epoch=take(it,"epoch_tracker")?;
    let debouncer=take(it,"debouncer")?;
    let destination=take(it,"debouncer_token_account")?;
    let mint=take(it,"mint")?;
    f.decode_mint_checked(mint)?;
    let source=take(it,if native {"temp_wsol_token_account"} else {"from_token_account"})?;
    let source_token=if native {None} else {Some(f.decode_token(source)?)};
    let from=take(it,"from")?;
    check(f.signer(from),3010,"from")?;
    let payer=if matches!(v,Variant::TokenPubkeyWithPayer) {
        let payer=take(it,"payer")?;check(f.signer(payer),3010,"payer")?;payer
    } else {from};
    let whitelist=take(it,"mint_whitelist")?;
    let whitelist_bump=f.decode_whitelist_checked(whitelist)?;
    let associated=take(it,"associated_token_program")?;
    program_check(f,associated,&[ASSOCIATED],"associated_token_program")?;
    let token_program=take(it,"token_program")?;
    program_check(f,token_program,&[TOKEN,TOKEN2022],"token_program")?;
    let system=take(it,"system_program")?;
    program_check(f,system,&[[0;32]],"system_program")?;
    let event_authority=take(it,"event_authority")?;
    let event_program=take(it,"program")?; // unchecked; keep handle for event CPI adapter
    Ok(Accounts {epoch,debouncer,destination,mint,source,from,payer,whitelist,
        token_program,event_authority,event_program,associated_program:associated,system_program:system,whitelist_bump,source_token,epoch_state:None,debouncer_state:None})
}

/// Concrete composition point for the integrated parse_context application.
/// `config` is the 32-byte instruction config already decoded by the wrapper;
/// wrapper deserialization, bodies, access-control and exits are NOT skipped.
pub fn parse_donation_accounts<F:Framework>(f:&mut F,it:&mut impl Iterator<Item=A>,v:Variant,config:Key)->R<(Accounts<F::State>,Bumps)> {
    let mut accounts=admit(f,it,v)?;
    let bumps=constraints(f,&mut accounts,config,v)?;
    Ok((accounts,bumps))
}
