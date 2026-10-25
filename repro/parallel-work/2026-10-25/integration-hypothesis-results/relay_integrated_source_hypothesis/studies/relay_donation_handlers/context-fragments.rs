// Review-only program-owned init helper fragments. No build/execution performed.
// Complete system CPI branches remain P1. Decoder must retain owner/discriminator
// checks and error origin decoration rather than treating bytes as trusted state.
type R<T> = Result<T,u32>;
fn require(ok: bool, code:u32)->R<()> { if ok {Ok(())} else {Err(code)} }
trait ExistingAccount {
    type State;
    fn typed_checked_decode(&self)->R<Self::State>;
    fn data_len(&self)->usize;
    fn owner_is_relay(&self)->bool;
    fn minimum_balance(&self, space:usize)->u64;
    fn borrow_lamports(&self)->R<u64>;
}
// Apply ONLY on the owner!=SystemProgram branch. The system-owned branch instead
// creates/allocates/assigns with genuine PDA signer seeds and the proper rent payer.
fn accept_existing<T:ExistingAccount>(a:&T,space:usize)->R<T::State> {
    let state=a.typed_checked_decode()?;  //122->25,123->23 BEFORE these checks
    require(a.data_len()==space,2019)?;   //176232/176240;185824/185832
    require(a.owner_is_relay(),2004)?;    //176296/176352;185888/185944
    let minimum=a.minimum_balance(space);
    require(a.borrow_lamports()?>=minimum,2005)?; //182192/182344/182384
    Ok(state)
}
fn epoch_existing<T:ExistingAccount>(a:&T)->R<T::State> { accept_existing(a,90) }
fn debouncer_existing<T:ExistingAccount>(a:&T)->R<T::State> { accept_existing(a,82) }
// The wire sizes include discriminator8+bump1+state1+config32+mint32+counter16/8.
// Existing state initialized flag is handled later by shared112, not reset here.
// System-owned prefunded epoch branch122:
//   current = borrow_lamports(target);                 //175688
//   if current != 0:
//     compare payer.key to target.key; reject equality via framework path //175920
//     rent_goal = max(minimum_balance(90),1);          //175968..175984
//     top_up = rent_goal.saturating_sub(current);      //175992..176080
//     transfer if necessary, allocate(90), assign(relay), decode unchecked
//   else: create_account with minimum_balance(90),space90,owner relay
// CPI construction/calls include293,294,291,292. Their all-error and payer-alias
// paths remain unimplemented P1; this sketch does not execute a prefunded fixture.
// ATA helper124 owner!=System path decodes token account first (194432), while
// owner==System branches to creation at195744. Native129 begins with lamports
// (238776), separately branches zero/prefunded (238800), then initializes temp
// with token helper228 (250624). Do not substitute ATA creation for this temp PDA.
