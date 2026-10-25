//! Natural relay dispatch/wrapper proposal. Uncompiled, not a complete entrypoint.
//! Names/phase edges bind original169,178..189 and190..204. See contract ledger.
use crate::{Account,Key,Event,DonationVariant,codec,handlers as body,runtime::Runtime};
use crate::codec::constants::RELAY;
use crate::generated_exit as exit;
use crate::dispatch_interfaces::*;

#[derive(Debug)]
pub struct SourceOrigin {pub file:String,pub line:u32}
#[derive(Debug)]
pub struct FrameworkFailure {
 pub code:u32,pub account:Option<&'static str>,pub compared_keys:Option<(Key,Key)>,
 pub origin:Option<SourceOrigin>,
 // Original297 constructor on dispatch/event failures has no source origin.
 // Exact error-name/message allocation and heap representation remain a premise.
}
#[derive(Debug)]
pub enum Failure {
 Framework(FrameworkFailure),ProgramNotEnoughAccountKeys,
 Body(crate::Error),Exit(exit::ExitError),Idl(crate::idl::IdlError),
 // An analysis stop, never a relay/Anchor error or a successful instruction.
 Unrecovered(&'static str),
}
pub type D<T> = Result<T,Failure>;
fn framework(code:u32)->Failure {Failure::Framework(FrameworkFailure{code,account:None,compared_keys:None,origin:None})}
fn named(code:u32,compared_keys:Option<(Key,Key)>)->Failure {
 Failure::Framework(FrameworkFailure{code,account:Some("event_authority"),compared_keys,origin:None})
}
const IDL_SELECTOR:[u8;8]=[64,244,188,120,167,233,105,10];
const EVENT_SELECTOR:[u8;8]=[228,69,165,46,81,203,154,29];

// No payload parsing/logging, exact-account-count check, return-data clear or
// generated exit occurs on this branch. The first real AccountInfo must sign.
fn event_recursion<R:DispatchRuntime>(rt:&mut R,program:&Key,accounts:&[Account])->D<()> {
 let authority=accounts.first().ok_or(Failure::ProgramNotEnoughAccountKeys)?;
 if !authority.signer {return Err(named(2002,None));}
 let (expected,_bump)=rt.find_program_address(&[b"__event_authority"],program);
 if authority.key!=expected {return Err(named(2006,Some((authority.key,expected))));}
 Ok(())
}

fn emit_and_return<R:DispatchRuntime>(rt:&mut R,event:&Event,context:EventContext)->D<()> {
 // First serialization for log. Dynamic serialization failure unwraps/panics;
 // allocation/panic object identity is not established by this natural source.
 let (disc,bytes)=codec::event_bytes(event).unwrap();
 let mut logged=disc.to_vec();logged.extend(bytes);
 rt.log_event_data(&logged);
 // SECOND serialization for self-CPI, after the log. Do not reuse logged bytes.
 let (disc,bytes)=codec::event_bytes(event).unwrap();
 let mut data=EVENT_SELECTOR.to_vec();data.extend(disc);data.extend(bytes);
 let ix=crate::Cpi{program:RELAY,metas:vec![crate::Meta{key:context.authority.key,writable:false,signer:true}],data};
 // `program` is retained from the admitted context but is not an extra meta or
 // an invented executable/address constraint. Original uses fixed relay ID.
 let _program=context.program;
 rt.invoke_signed(ix,&[context.authority],&vec![b"__event_authority".to_vec(),vec![context.bump]])
   .map_err(Failure::Body)?;
 // THIRD serialization: bare enum-tagged return payload, no event discriminator.
 // Set-return-data is a syscall with no ordinary Result; generated exit follows.
 let (_,returned)=codec::event_bytes(event).unwrap();
 exit::AccountRuntime::set_return_data(rt,&returned);
 Ok(())
}

/// Logical Result layer of169. The surrounding loader ABI, rich error reporting
/// and lowering are separate. Input memory/account deserialization is assumed real.
pub fn dispatch<R:crate::idl_runtime::IdlRuntime,C:Admission<R>>(
 rt:&mut R,contexts:&mut C,program:Key,accounts:&[Account],data:&[u8]
)->D<()> {
 // Declared-program check precedes even the input-length check.
 if program!=RELAY {return Err(framework(4100));}
 if data.len()<8 {return Err(framework(101));}
 let selector:[u8;8]=data[..8].try_into().unwrap();
 let raw_args=&data[8..];
 if selector==IDL_SELECTOR {
  // Concrete reserved-IDL prefix decoder, ordered admission, bodies and exits.
  // Its rich metadata is preserved separately; report_error must handle Idl.
  return crate::idl::dispatch170(rt,&program,accounts,raw_args).map_err(Failure::Idl);
 }
 if selector==EVENT_SELECTOR {return event_recursion(rt,&program,accounts);}
 let (name,label)=business_selector(selector).ok_or_else(||framework(101))?;
 // All eleven wrappers log BEFORE argument decoding or account admission.
 rt.log_instruction(label);
 let instruction=codec::decode_arguments(name,raw_args).map_err(Failure::Body)?;
 // The inherited normal-value decoder accepts suffix bytes. No maximum shares,
 // whitelist length or account-count preflight is added here.
 match instruction {
  codec::Instruction::Donation(kind,args)=>{
   let mut frame=contexts.donation(rt,&program,accounts,raw_args,kind,&args)?;
   let event={let mut c=frame.body();match kind {
    DonationVariant::TokenBytes=>body::donate_v1(rt,&mut c,args),
    DonationVariant::TokenPubkey=>body::donate_pubkey_config_id_v1(rt,&mut c,args),
    DonationVariant::TokenPubkeyWithPayer=>body::donate_pubkey_config_id_with_payer_v1(rt,&mut c,args),
    DonationVariant::NativeBytes=>body::donate_native_v1(rt,&mut c,args),
    DonationVariant::NativePubkey=>body::donate_native_pubkey_config_id_v1(rt,&mut c,args),
   }}.map_err(Failure::Body)?;
   emit_and_return(rt,&event,frame.event())?;
   let c=frame.exit();
   match kind {
    DonationVariant::TokenBytes|DonationVariant::TokenPubkey=>exit::account_exit125(rt,&program,&c),
    DonationVariant::NativeBytes|DonationVariant::NativePubkey=>exit::account_exit130(rt,&program,&c),
    DonationVariant::TokenPubkeyWithPayer=>exit::account_exit141(rt,&program,&c),
   }.map_err(Failure::Exit)
  }
  codec::Instruction::Close(config,epoch)=>{
   let mut frame=contexts.epoch(rt,&program,accounts,raw_args,config,epoch)?;
   let event=body::close_donation_epoch_v1(rt,&mut frame.body(),config,epoch).map_err(Failure::Body)?;
   emit_and_return(rt,&event,frame.event())?;
   exit::account_exit145(rt,&program,&frame.exit()).map_err(Failure::Exit)
  }
  codec::Instruction::After(shares)=>{
   let frame=contexts.after(rt,&program,accounts,raw_args,&shares)?;
   let c=frame.body();
   let event=body::distribute_after_just_swapping_v1(rt,&c.body,c.receipt,&shares,c.remaining).map_err(Failure::Body)?;
   emit_and_return(rt,&event,frame.event())?;
   exit::account_exit147(rt,&program,&frame.exit()).map_err(Failure::Exit)
  }
  codec::Instruction::NonSwap(shares)=>{
   let frame=contexts.non_swap(rt,&program,accounts,raw_args,&shares)?;
   let c=frame.body();
   let event=body::distribute_non_swap_output_mint_v1(rt,&c.body,&shares,c.remaining).map_err(Failure::Body)?;
   emit_and_return(rt,&event,frame.event())?;
   exit::account_exit149(rt,&program,&frame.exit()).map_err(Failure::Exit)
  }
  codec::Instruction::JustSwap(swap_data)=>{
   let mut frame=contexts.just_swap(rt,&program,accounts,raw_args,&swap_data)?;
   let event={let c=frame.body();body::just_swap_v1(rt,&c.body,c.receipt,c.receipt_account,c.receipt_bump,&swap_data,c.remaining)}.map_err(Failure::Body)?;
   emit_and_return(rt,&event,frame.event())?;
   exit::account_exit153(rt,&program,&frame.exit()).map_err(Failure::Exit)
  }
  codec::Instruction::Combined(swap_data,shares)=>{
   let frame=contexts.combined(rt,&program,accounts,raw_args,&swap_data,&shares)?;
   let c=frame.body();
   let event=body::swap_then_distribute_v1(rt,&c.body,&swap_data,&shares,c.remaining).map_err(Failure::Body)?;
   emit_and_return(rt,&event,frame.event())?;
   exit::account_exit155(rt,&program,&frame.exit()).map_err(Failure::Exit)
  }
  codec::Instruction::Whitelist(mints)=>{
   let mut frame=contexts.whitelist(rt,&program,accounts,raw_args,&mints)?;
   {let c=frame.body();body::upsert_mint_whitelist_v1(c.signer,c.state,c.canonical_bump,mints)}.map_err(Failure::Body)?;
   // Original188 has no event adapter or set_return_data, even with prior data.
   exit::account_exit158(rt,&program,&frame.exit()).map_err(Failure::Exit)
  }
 }
}

/// Report propagated ordinary errors once, as169 calls286 before290 lowering.
/// This is not the raw Solana u64 ABI: rich error encoding/lowering still needs
/// the actual framework adapter. Unrecovered is never reported as a real error.
pub fn process<R:crate::idl_runtime::IdlRuntime,C:Admission<R>>(rt:&mut R,c:&mut C,program:Key,accounts:&[Account],data:&[u8])->D<()> {
 let result=dispatch(rt,c,program,accounts,data);
 if let Err(error)=&result {if !matches!(error,Failure::Unrecovered(_)) {rt.report_error(error);}}
 result
}

fn business_selector(selector:[u8;8])->Option<(&'static str,&'static str)> {
 match selector {
  [136, 8, 102, 156, 214, 4, 17, 171]=>Some(("donate_v1","Instruction: DonateV1")),
  [187, 141, 207, 216, 60, 246, 196, 155]=>Some(("donate_pubkey_config_id_v1","Instruction: DonatePubkeyConfigIdV1")),
  [120, 217, 57, 241, 135, 104, 139, 184]=>Some(("donate_pubkey_config_id_with_payer_v1","Instruction: DonatePubkeyConfigIdWithPayerV1")),
  [121, 160, 15, 44, 219, 43, 134, 7]=>Some(("donate_native_v1","Instruction: DonateNativeV1")),
  [192, 254, 132, 16, 208, 43, 154, 82]=>Some(("donate_native_pubkey_config_id_v1","Instruction: DonateNativePubkeyConfigIdV1")),
  [171, 28, 54, 214, 140, 137, 101, 90]=>Some(("close_donation_epoch_v1","Instruction: CloseDonationEpochV1")),
  [209, 133, 253, 12, 80, 9, 231, 128]=>Some(("upsert_mint_whitelist_v1","Instruction: UpsertMintWhitelistV1")),
  [204, 159, 132, 117, 132, 86, 223, 73]=>Some(("just_swap_v1","Instruction: JustSwapV1")),
  [218, 85, 237, 178, 24, 174, 102, 41]=>Some(("swap_then_distribute_v1","Instruction: SwapThenDistributeV1")),
  [210, 176, 49, 190, 147, 105, 115, 119]=>Some(("distribute_after_just_swapping_v1","Instruction: DistributeAfterJustSwappingV1")),
  [152, 149, 100, 48, 118, 236, 9, 243]=>Some(("distribute_non_swap_output_mint_v1","Instruction: DistributeNonSwapOutputMintV1")),
  _=>None,
 }
}
