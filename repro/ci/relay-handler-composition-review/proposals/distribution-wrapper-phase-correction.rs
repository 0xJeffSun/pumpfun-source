// Natural, uncompiled source hypothesis on an already parsed/admitted context.
// Identifiers/layout are new. Error numbers describe normal returns, not Anchor ABI.
// Runtime is an explicit boundary: original allocation/borrow/failure ordering,
// token CPI, event emission and exit hooks must be retained by an implementation.
pub type Key = [u8;32];
pub type R<T> = Result<T,u32>;
#[derive(Clone)]
pub struct Share { pub address: Key, pub bps: u16, pub kind: u8 }
pub struct Receipt { pub share: Share, pub amount: u64 }
pub struct Token { pub authority: Key, pub mint: Key, pub program: Key }
pub struct Context {
    pub current_epoch: u128, pub epoch: u128, pub initialized: bool,
    pub distribution_mint: Key, pub debouncer_mint: Key, pub settlement_mint: Key,
    pub config_id: Key, pub bump: u8, pub total: u64, pub receipt_output: u64,
    pub token_balance: u64, pub token_program: Key, pub decimals: u8,
}
pub struct Event { pub config_id: Key, pub mint: Key, pub epoch: u128,
    pub settled_amount: u64, pub settlement_mint: Key, pub transfers: Vec<Receipt> }
pub trait Runtime {
    fn require_relayer(&mut self) -> R<()>;
    fn remaining_len(&self) -> usize;
    // Existing113 with conditional sort contract; not std sort byte equivalence.
    fn arithmetic113(&mut self,total:u64,weights:&[u16])->R<Vec<u64>>;
    fn decode_remaining_token(&mut self,index:usize)->R<Token>;
    fn transfer_checked(&mut self,index:usize,amount:u64,c:&Context)->R<()>;
    fn reload_source_amount(&mut self)->R<u64>;
    // burn: token wire 08 + amount LE; close: wire 09.
    fn burn_residual(&mut self,amount:u64,c:&Context)->R<()>;
    fn close_source_token_to_relayer(&mut self,c:&Context)->R<()>;
    fn log_event(&mut self,event:&Event)->R<()>;
    fn self_cpi_event(&mut self,event:&Event)->R<()>;
    // Wrapper119 serialization and302 set_return_data, before exit147/149.
    fn set_event_return_data(&mut self,event:&Event)->R<()>;
    // Complete generated exit, including close order and owner/borrow/serialization.
    fn generated_accounts_exit(&mut self,after_swap:bool)->R<()>;
}
fn admit_weights(shares:&[Share])->R<()> {
    let mut sum=0u32;
    for s in shares { sum=sum.checked_add(s.bps as u32).ok_or(6008u32)?; }
    if sum!=10000 { return Err(6022); } Ok(())
}
// shared108: source-program equality precedes count and arithmetic. Share.address
// is token authority, not token-account key. No uniqueness/ATA/positive-bps gate.
pub fn distribution108(rt:&mut impl Runtime,c:&Context,source_program:Key,
    shares:&[Share],total:u64)->R<Vec<Receipt>> {
    if source_program!=c.token_program {return Err(6025)}
    if rt.remaining_len()<shares.len() {return Err(6030)}
    let weights:Vec<u16>=shares.iter().map(|s|s.bps).collect();
    let amounts=rt.arithmetic113(total,&weights)?;
    // Premise: successful113 returns exactly shares.len() entries.
    for (i,s) in shares.iter().enumerate() {
        let t=rt.decode_remaining_token(i)?;
        if t.authority!=s.address {return Err(6014)}
        if t.mint!=c.settlement_mint {return Err(6024)}
        if t.program!=c.token_program {return Err(6025)}
        if amounts[i]!=0 {rt.transfer_checked(i,amounts[i],c)?;}
    }
    Ok(shares.iter().cloned().zip(amounts).map(|(share,amount)|Receipt{share,amount}).collect())
}
pub fn distribute(rt:&mut impl Runtime,c:&Context,source_program:Key,
    shares:&[Share],after_swap:bool)->R<Event> {
    // Fixed parsers146/148 have already succeeded, including receipt binding.
    rt.require_relayer()?;
    if c.epoch>=c.current_epoch {return Err(6028)}
    if !c.initialized {return Err(6007)}
    if after_swap {
        if c.distribution_mint!=c.debouncer_mint {return Err(6006)}
    } else {
        if c.distribution_mint!=c.settlement_mint {return Err(6006)}
        if c.debouncer_mint!=c.settlement_mint {return Err(6006)}
    }
    admit_weights(shares)?;
    let total=if after_swap {c.receipt_output} else {c.total};
    if (after_swap && total==0) || c.token_balance<total {return Err(6012)}
    if rt.remaining_len()<shares.len() {return Err(6030)}
    let transfers=distribution108(rt,c,source_program,shares,total)?;
    let residual=rt.reload_source_amount()?;
    if residual!=0 {rt.burn_residual(residual,c)?;}
    rt.close_source_token_to_relayer(c)?;
    let event=Event{config_id:c.config_id,mint:c.distribution_mint,epoch:c.epoch,
        settled_amount:total,settlement_mint:c.settlement_mint,transfers};
    rt.log_event(&event)?;
    rt.self_cpi_event(&event)?;
    rt.set_event_return_data(&event)?;
    rt.generated_accounts_exit(after_swap)?;
    Ok(event)
}
pub fn distribute_after_just_swapping_v1(rt:&mut impl Runtime,c:&Context,
    source_program:Key,shares:&[Share])->R<Event>{distribute(rt,c,source_program,shares,true)}
pub fn distribute_non_swap_output_mint_v1(rt:&mut impl Runtime,c:&Context,
    source_program:Key,shares:&[Share])->R<Event>{distribute(rt,c,source_program,shares,false)}
