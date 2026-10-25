//! Concrete existing-account branches122/123/157; deliberately no admission bypass.
//! Separate fragment: runtime borrow and rent lookup precedences still require review.
use crate::{*,codec};
pub enum Existing {Tracker(Tracker),Debouncer(Debouncer),Whitelist(Whitelist)}
pub enum ExistingKind {Tracker,Debouncer,Whitelist}
// Call only after ORIGINAL typed-owner gate/checked decoding admission, on owner !=
// System branch. Raw bytes alone cannot establish an admitted context.
pub fn existing_size_owner_rent(kind:ExistingKind,data:&[u8],owner:Key,relay:Key,lamports:u64,rent_minimum:u64)->R<Existing> {
 let (state,size)=match kind {
  ExistingKind::Tracker=>(Existing::Tracker(codec::tracker(data)?),90),
  ExistingKind::Debouncer=>(Existing::Debouncer(codec::debouncer(data)?),82),
  ExistingKind::Whitelist=>(Existing::Whitelist(codec::whitelist(data)?),1037),
 };
 require(data.len()==size,2019)?;
 require(owner==relay,2004)?;
 require(lamports>=rent_minimum,2005)?;
 Ok(state)
}
// Fresh/prefunded creation is NOT supplied by this helper. It remains a named
// application-context gap; no zeroed guessed state is returned for that branch.
