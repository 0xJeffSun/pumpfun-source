//! External runtime/token decode primitives only. No donate/swap/distribute hooks.
use crate::*;
pub trait Runtime {
 // Framework close282 primitives preserve order, borrow failures and aliases.
 fn lamports(&mut self,a:Account)->R<u64>;
 fn set_lamports(&mut self,a:Account,value:u64)->R<()>;
 fn assign(&mut self,a:Account,owner:Key)->R<()>;
 fn realloc_zero(&mut self,a:Account)->R<()>;
 fn invoke_signed(&mut self, ix:Cpi, infos:&[Account], seeds:&Seeds)->R<()>;
 // Helpers 8/21/110/111: supported token owner/base/extension decoding and borrow
 // errors, NOT application mint-safety policy 106. Reload observes current data.
 fn token(&mut self, account:Account)->R<TokenView>;
 fn mint(&mut self, account:Account)->R<MintView>;
 fn log_data(&mut self, data:&[u8])->R<()>;
 fn set_return_data(&mut self, data:&[u8])->R<()>;
}
fn meta(a:Account,writable:bool,signer:bool)->Meta {Meta{key:a.key,writable,signer}}
pub fn transfer_checked(rt:&mut impl Runtime,program:Account,source:Account,mint:Account,
 destination:Account,authority:Account,amount:u64,decimals:u8,seeds:&Seeds)->R<()> {
 supported_program(program.key)?;
 let mut data=vec![12];data.extend_from_slice(&amount.to_le_bytes());data.push(decimals);
 rt.invoke_signed(Cpi{program:program.key,metas:vec![meta(source,true,false),meta(mint,false,false),meta(destination,true,false),meta(authority,false,true)],data},
 &[source,mint,destination,authority],seeds)
}
pub fn close_token(rt:&mut impl Runtime,program:Account,source:Account,destination:Account,authority:Account,seeds:&Seeds)->R<()> {
 supported_program(program.key)?;
 rt.invoke_signed(Cpi{program:program.key,metas:vec![meta(source,true,false),meta(destination,true,false),meta(authority,false,true)],data:vec![9]},&[source,destination,authority],seeds)
}
pub fn burn_then_close(rt:&mut impl Runtime,program:Account,source:Account,mint:Account,authority:Account,destination:Account,seeds:&Seeds)->R<()> {
 let residual=rt.token(source)?.amount;
 if residual!=0 {
  supported_program(program.key)?;
  let mut data=vec![8];data.extend_from_slice(&residual.to_le_bytes());
  rt.invoke_signed(Cpi{program:program.key,metas:vec![meta(source,true,false),meta(mint,true,false),meta(authority,false,true)],data},&[source,mint,authority],seeds)?;
 }
 close_token(rt,program,source,destination,authority,seeds)
}
pub fn native_fund_sync(rt:&mut impl Runtime,system:Account,token_program:Account,from:Account,temp:Account,amount:u64)->R<()> {
 let mut data=2u32.to_le_bytes().to_vec();data.extend_from_slice(&amount.to_le_bytes());
 rt.invoke_signed(Cpi{program:system.key,metas:vec![meta(from,true,true),meta(temp,true,false)],data},&[from,temp],&vec![])?;
 rt.invoke_signed(Cpi{program:token_program.key,metas:vec![meta(temp,true,false)],data:vec![17]},&[temp],&vec![])
}
// APPLICATION boundary, not a Runtime trait method. Full106's TLV/authority
// predicate is incomplete. Never accept all mints, nor reject all as relay6031.
pub fn safe_mint_106(_rt:&mut impl Runtime,_mint:Account)->R<bool> {
 Err(Error::Incomplete("106 mint authority and Token2022 extension policy"))
}

fn supported_program(key:Key)->R<()> {
 if key==crate::codec::constants::TOKEN || key==crate::codec::constants::TOKEN2022 {Ok(())} else {Err(Error::IncorrectProgramId)}
}
// Scalar normal-success contract of282. Overflow is framework panic/abort, never6008.
// Err(External) marks that path without inventing the historical panic object.
pub fn close_program_account(rt:&mut impl Runtime,source:Account,destination:Account)->R<()> {
 let dst=rt.lamports(destination)?;
 let src=rt.lamports(source)?;
 let sum=dst.checked_add(src).ok_or(Error::External)?;
 rt.set_lamports(destination,sum)?;
 rt.set_lamports(source,0)?;
 rt.assign(source,[0;32])?;
 rt.realloc_zero(source)
}
