#!/usr/bin/env python3
"""swvar.py <outtree> v1 v2 ...: multiplex sweep variants as modules swvK (files sweep_feeK.rs, same path length)."""
import sys,os,subprocess,shutil,re
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b'
HEAD="""use anchor_lang::prelude::*;
use crate::PumpError;
use crate::sweep::{SweepFees,SweepBondingCurveFeeEvent};
"""
PRE="""pub fn execute(ctx:Context<SweepFees>,creator:bool)->Result<()>{
 let a=&mut *ctx.accounts;
 crate::trade_types::prepare_bonding_curve(&a.bonding_curve,&a.system_program,&a.payer)?;
@123  require_keys_neq!(a.recipient.key(),Pubkey::default(),PumpError::NotAuthorized);
"""
CRE_FIND="""  let expected=Pubkey::find_program_address(&[b"creator-vault",a.bonding_curve.creator.as_ref()],&crate::ID).0;
@145   require_keys_eq!(a.recipient.key(),expected,anchor_lang::error::ErrorCode::ConstraintSeeds);
"""
VAL="crate::legacy_sell::fee_recipient::validate_fee_recipient(&a.recipient,&a.global,&a.bonding_curve)?;"
RENT="let minimum=Rent::get()?.minimum_balance(0);if a.recipient.lamports()<minimum{crate::legacy_buy::native_payments::transfer(a.system_program.as_ref(),&a.payer,a.recipient.as_ref(),minimum)?;}"
ADMITS="""  let mint=a.quote_mint.key();let token_program=a.quote_token_program.key();let mint_info=a.quote_mint.to_account_info();let token_program_info=a.quote_token_program.to_account_info();
  crate::buy_v2::admit_associated_token_account(a.associated_quote_bonding_curve.as_ref(),&a.bonding_curve.to_account_info(),mint,token_program,&mint_info,&token_program_info,false,a.payer.as_ref(),a.system_program.as_ref())?;
  crate::buy_v2::admit_associated_token_account(a.associated_quote_recipient.as_ref(),a.recipient.as_ref(),mint,token_program,&mint_info,&token_program_info,true,a.payer.as_ref(),a.system_program.as_ref())?;
"""
MSG='msg!("Nothing to sweep for fee bucket {}",creator as u8);return Ok(());'
CALL_OPT="crate::trade::quote_payments::transfer_to_owned(native,a.base_mint.as_ref().as_ref(),&a.bonding_curve,a.recipient.to_account_info(),amount,&a.quote_token_program,a.quote_mint.decimals,a.quote_mint.as_ref().as_ref(),{SRC},{DST},ctx.bumps.bonding_curve)?;"
EVENT=""" let event=SweepBondingCurveFeeEvent{timestamp:Clock::get()?.unix_timestamp,mint:a.base_mint.key(),bonding_curve:a.bonding_curve.key(),quote_mint:a.bonding_curve.quote_mint,recipient:a.recipient.key(),amount,bucket:creator as u8};
 emit!(event);emit_cpi!(event);Ok(())
}
"""
AMT_IF=f""" let amount=if creator{{
{CRE_FIND}  core::mem::take(&mut a.bonding_curve.creator_fee)
 }}else{{{VAL}
  core::mem::take(&mut a.bonding_curve.protocol_fees)
 }};
"""
INL_SRC="if native{None}else{Some(a.associated_quote_bonding_curve.as_ref())}"
INL_DST="if native{None}else{Some(a.associated_quote_recipient.as_ref())}"
V={}
# v1 = sw1
V['1']=PRE+AMT_IF+f""" if amount==0{{{MSG}}}
 let native=a.bonding_curve.quote_mint==Pubkey::default();
 if native{{if creator{{{RENT}}}
 }}else{{
{ADMITS} }}
 let (source,destination)=if native{{(None,None)}}else{{(Some(a.associated_quote_bonding_curve.as_ref()),Some(a.associated_quote_recipient.as_ref()))}};
 """+CALL_OPT.replace('{SRC}','source').replace('{DST}','destination')+"\n"+EVENT
# v2 = options inline in args
V['2']=PRE+AMT_IF+f""" if amount==0{{{MSG}}}
 let native=a.bonding_curve.quote_mint==Pubkey::default();
 if native{{if creator{{{RENT}}}
 }}else{{
{ADMITS} }}
 """+CALL_OPT.replace('{SRC}',INL_SRC).replace('{DST}',INL_DST)+"\n"+EVENT
# v3 = per-arm amount check+msg
V['3']=PRE+f""" let amount=if creator{{
{CRE_FIND}  let amount=core::mem::take(&mut a.bonding_curve.creator_fee);if amount==0{{{MSG}}}amount
 }}else{{{VAL}
  let amount=core::mem::take(&mut a.bonding_curve.protocol_fees);if amount==0{{{MSG}}}amount
 }};
 let native=a.bonding_curve.quote_mint==Pubkey::default();
 if native{{if creator{{{RENT}}}
 }}else{{
{ADMITS} }}
 """+CALL_OPT.replace('{SRC}',INL_SRC).replace('{DST}',INL_DST)+"\n"+EVENT
# v4 = native && creator first, then !native admits
V['4']=PRE+AMT_IF+f""" if amount==0{{{MSG}}}
 let native=a.bonding_curve.quote_mint==Pubkey::default();
 if native&&creator{{{RENT}}}
 if !native{{
{ADMITS} }}
 """+CALL_OPT.replace('{SRC}',INL_SRC).replace('{DST}',INL_DST)+"\n"+EVENT
# v5 = creator && native order
V['5']=V['4'].replace('if native&&creator{','if creator&&native{')
# v6 = !native first: if !native {admits} else if creator {rent}
V['6']=PRE+AMT_IF+f""" if amount==0{{{MSG}}}
 let native=a.bonding_curve.quote_mint==Pubkey::default();
 if !native{{
{ADMITS} }}else if creator{{{RENT}}}
 """+CALL_OPT.replace('{SRC}',INL_SRC).replace('{DST}',INL_DST)+"\n"+EVENT
# v7 = v2 but native evaluated inline in the if (no let), call uses separate let after? (native needed twice -> let) ; use match on creator
V['7']=V['2'].replace(' let amount=if creator{', ' let amount=match creator{true=>{').replace(""" }else{"""+VAL, """ }false=>{"""+VAL).replace("core::mem::take(&mut a.bonding_curve.protocol_fees)\n };","core::mem::take(&mut a.bonding_curve.protocol_fees)\n }};")
# v8 = v2 with then_some style options
V['8']=V['2'].replace(INL_SRC,"(!native).then_some(a.associated_quote_bonding_curve.as_ref())").replace(INL_DST,"(!native).then_some(a.associated_quote_recipient.as_ref())")

# v9 = labeled block yielding amount; per-arm nonzero break; shared msg
V['9']=PRE+f""" let amount='sweep:{{
  if creator{{
{CRE_FIND}   let amount=core::mem::take(&mut a.bonding_curve.creator_fee);if amount!=0{{break 'sweep amount;}}
  }}else{{{VAL}
   let amount=core::mem::take(&mut a.bonding_curve.protocol_fees);if amount!=0{{break 'sweep amount;}}
  }}
  {MSG}
 }};
 let native=a.bonding_curve.quote_mint==Pubkey::default();
 if native{{if creator{{{RENT}}}
 }}else{{
{ADMITS} }}
 """+CALL_OPT.replace('{SRC}',INL_SRC).replace('{DST}',INL_DST)+"\n"+EVENT
# v10 = v9 but options via let before call (as v1)
V['10']=V['9'].replace(CALL_OPT.replace('{SRC}',INL_SRC).replace('{DST}',INL_DST), "let (source,destination)=if native{(None,None)}else{(Some(a.associated_quote_bonding_curve.as_ref()),Some(a.associated_quote_recipient.as_ref()))};\n "+CALL_OPT.replace('{SRC}','source').replace('{DST}','destination'))
# v11 = v9 with if !native {admits} else if creator {rent}
V['11']=V['9'].replace(""" if native{if creator{"""+RENT+"""}
 }else{
"""+ADMITS+""" }""", """ if !native{
"""+ADMITS+""" }else if creator{"""+RENT+"""}""")
# v12 = v9 with native&&creator then !native
V['12']=V['9'].replace(""" if native{if creator{"""+RENT+"""}
 }else{
"""+ADMITS+""" }""", """ if native&&creator{"""+RENT+"""}
 if !native{
"""+ADMITS+""" }""")

TAIL_NAT=""" if !native{
"""+ADMITS+""" }
 """+CALL_OPT.replace('{SRC}',INL_SRC).replace('{DST}',INL_DST)+"\n"+EVENT
NATIVE="a.bonding_curve.quote_mint==Pubkey::default()"
# v13: per-arm amount check (labeled break to shared msg), per-arm native, rent in creator arm
V['13']=PRE+f""" let (amount,native)='sweep:{{
  if creator{{
{CRE_FIND}   let amount=core::mem::take(&mut a.bonding_curve.creator_fee);
   if amount!=0{{let native={NATIVE};if native{{{RENT}}}break 'sweep (amount,native);}}
  }}else{{{VAL}
   let amount=core::mem::take(&mut a.bonding_curve.protocol_fees);
   if amount!=0{{break 'sweep (amount,{NATIVE});}}
  }}
  {MSG}
 }};
"""+TAIL_NAT
# v14: per-arm early-return msg (no label), per-arm native
V['14']=PRE+f""" let (amount,native)=if creator{{
{CRE_FIND}  let amount=core::mem::take(&mut a.bonding_curve.creator_fee);if amount==0{{{MSG}}}
  let native={NATIVE};if native{{{RENT}}}(amount,native)
 }}else{{{VAL}
  let amount=core::mem::take(&mut a.bonding_curve.protocol_fees);if amount==0{{{MSG}}}
  (amount,{NATIVE})
 }};
"""+TAIL_NAT
# v15: shared amount (phi) check, then per-bucket native: if creator {native; rent} else {native}
V['15']=PRE+AMT_IF+f""" if amount==0{{{MSG}}}
 let native=if creator{{let native={NATIVE};if native{{{RENT}}}native}}else{{{NATIVE}}};
"""+TAIL_NAT
# v16: (amount,bucket) tuple with const bucket per arm, shared check
V['16']=PRE+f""" let (amount,bucket)=if creator{{
{CRE_FIND}  (core::mem::take(&mut a.bonding_curve.creator_fee),1u8)
 }}else{{{VAL}
  (core::mem::take(&mut a.bonding_curve.protocol_fees),0u8)
 }};
 if amount==0{{msg!("Nothing to sweep for fee bucket {{}}",bucket);return Ok(());}}
 let native={NATIVE};
 if native{{if creator{{{RENT}}}
 }}else{{
{ADMITS} }}
 """+CALL_OPT.replace('{SRC}',INL_SRC).replace('{DST}',INL_DST)+"\n"+EVENT.replace('bucket:creator as u8','bucket')
# v17: v13 but options via let before call
V['17']=V['13'].replace(CALL_OPT.replace('{SRC}',INL_SRC).replace('{DST}',INL_DST), "let (source,destination)=if native{(None,None)}else{(Some(a.associated_quote_bonding_curve.as_ref()),Some(a.associated_quote_recipient.as_ref()))};\n "+CALL_OPT.replace('{SRC}','source').replace('{DST}','destination'))

CALLN=CALL_OPT.replace('{SRC}','None').replace('{DST}','None')
CALLT=CALL_OPT.replace('{SRC}','Some(a.associated_quote_bonding_curve.as_ref())').replace('{DST}','Some(a.associated_quote_recipient.as_ref())')
# v18: two call sites (native arm / token arm), native var passed
V['18']=PRE+AMT_IF+f""" if amount==0{{{MSG}}}
 let native={NATIVE};
 if native{{if creator{{{RENT}}}
  {CALLN}
 }}else{{
{ADMITS}  {CALLT}
 }}
"""+EVENT
# v19: v18 with literal true/false
V['19']=V['18'].replace(CALLN,CALLN.replace('transfer_to_owned(native,','transfer_to_owned(true,')).replace(CALLT,CALLT.replace('transfer_to_owned(native,','transfer_to_owned(false,'))
# v20: per-arm amount+native (v13) with two call sites
V['20']=PRE+f""" let (amount,native)='sweep:{{
  if creator{{
{CRE_FIND}   let amount=core::mem::take(&mut a.bonding_curve.creator_fee);
   if amount!=0{{let native={NATIVE};if native{{{RENT}}}break 'sweep (amount,native);}}
  }}else{{{VAL}
   let amount=core::mem::take(&mut a.bonding_curve.protocol_fees);
   if amount!=0{{break 'sweep (amount,{NATIVE});}}
  }}
  {MSG}
 }};
 if native{{{CALLN}}}else{{
{ADMITS}  {CALLT}
 }}
"""+EVENT
# v21: v18 but the token arm first: if !native {admits; call} else {rent; call}
V['21']=PRE+AMT_IF+f""" if amount==0{{{MSG}}}
 let native={NATIVE};
 if !native{{
{ADMITS}  {CALLT}
 }}else{{if creator{{{RENT}}}
  {CALLN}
 }}
"""+EVENT

CALLI=CALL_OPT.replace('{SRC}',INL_SRC).replace('{DST}',INL_DST)
# v22: per-arm complete (native/admits/transfer), shared msg (labeled) and shared event
V['22']=PRE+f""" let amount='sweep:{{
  if creator{{
{CRE_FIND}   let amount=core::mem::take(&mut a.bonding_curve.creator_fee);
   if amount!=0{{let native={NATIVE};if native{{{RENT}}}else{{
{ADMITS}   }}
   {CALLI}
   break 'sweep amount;}}
  }}else{{{VAL}
   let amount=core::mem::take(&mut a.bonding_curve.protocol_fees);
   if amount!=0{{let native={NATIVE};if !native{{
{ADMITS}   }}
   {CALLI}
   break 'sweep amount;}}
  }}
  {MSG}
 }};
"""+EVENT
# v23: per-arm with early-return msg and per-arm event (full duplication)
EV1=EVENT.replace('\n}\n','\n')
V['23']=PRE+f""" if creator{{
{CRE_FIND}  let amount=core::mem::take(&mut a.bonding_curve.creator_fee);
  if amount==0{{{MSG}}}
  let native={NATIVE};if native{{{RENT}}}else{{
{ADMITS}  }}
  {CALLI}
 {EV1} }}else{{{VAL}
  let amount=core::mem::take(&mut a.bonding_curve.protocol_fees);
  if amount==0{{{MSG}}}
  let native={NATIVE};if !native{{
{ADMITS}  }}
  {CALLI}
 {EV1} }}
}}
"""
def build(out,keys):
    if os.path.exists(out): shutil.rmtree(out)
    subprocess.check_call(['cp','-c','-R',L+'/src',out])
    lib=open(out+'/src/lib.rs').read().split('\n')
    i=[k for k,l in enumerate(lib) if l.startswith('#[path="sweep_fees.rs"]pub mod sweep;')][0]
    for k in keys:
        lib[i]+=f' #[path="sweep_fee{k}.rs"]pub mod swv{k};'
        tpl=HEAD+V[k]
        open(L+f'/gen/swv{k}.tpl','w').write(tpl)
        subprocess.check_call(['python3','-B',L+'/gen/place.py',L+f'/gen/swv{k}.tpl',out+f'/src/sweep_fee{k}.rs'],stdout=subprocess.DEVNULL)
    open(out+'/src/lib.rs','w').write('\n'.join(lib))
if __name__=='__main__':
    build(sys.argv[1],sys.argv[2:])
