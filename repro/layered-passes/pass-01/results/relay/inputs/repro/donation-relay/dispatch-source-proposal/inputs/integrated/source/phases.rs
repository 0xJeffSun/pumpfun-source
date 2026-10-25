use crate::{*,runtime::Runtime,codec::event_bytes};
// Called only after body success. Adapter log, then signed self CPI, then wrapper
// return-data. Account exit MUST follow; this function is not wrapper success.
pub fn emit_and_set_return(rt:&mut impl Runtime,event:&Event,_relay:Account,event_authority:Account,event_bump:u8)->R<()> {
 let(disc,payload)=event_bytes(event)?;let mut logged=disc.to_vec();logged.extend(&payload);
 rt.log_data(&logged)?;
 let mut data=vec![228,69,165,46,81,203,154,29];data.extend(logged);
 rt.invoke_signed(Cpi{program:crate::codec::constants::RELAY,metas:vec![Meta{key:event_authority.key,writable:false,signer:true}],data},&[event_authority],&vec![b"__event_authority".to_vec(),vec![event_bump]])?;
 // Original serializes again; preserve that fallible phase, not a return before CPI.
 let(_,returned)=event_bytes(event)?;rt.set_return_data(&returned)
}
pub enum ExitKind {Donation,NativeDonation,PayerDonation,EpochClose,JustSwap,AfterSwap,NonSwap,Combined,Whitelist}
// An explicit application/framework integration gap, never a successful no-op.
// Existing serializers are codec::*_bytes/write_prefix; parser-specific ownership,
// closed-account, borrow/alias and residual wrapper ordering remain unimplemented.
pub fn account_exit(_kind:ExitKind)->R<()> {
 Err(Error::Incomplete("generated account exit: serializers/close/borrow schedule in ledger"))
}
// Body errors bypass emission, return-data and exit. Whitelist has NO event or
// event return; after its body success it runs whitelist exit158 directly.
// AfterSwap: exit147 close distribution THEN receipt. NonSwap exit149 and Combined
// exit155 close distribution. JustSwap exit153 SERIALIZES both, closes neither.
// EpochClose exit145 distribution, ATA checks, tracker, debouncer, remaining exits.
// Donation exit125/130/141 tracker then debouncer, remaining exits.
