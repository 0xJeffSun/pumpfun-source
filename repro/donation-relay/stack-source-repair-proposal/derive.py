"""Exact natural source transform only; never compiles or executes Rust."""
from pathlib import Path
import re

def derive(base):
 out=dict(base);s=base['src/admission.rs']
 old='pub struct Loaded<T> {pub info:Account,pub value:T}'
 new='''// One decoded account allocation survives admission, body and generated exit.
// This candidate representation addresses the observed SBF stack overflow;
// it is not a claim that the historical source used this exact Box layout.
pub type Loaded<T> = Box<LoadedValue<T>>;
pub struct LoadedValue<T> {pub info:Account,pub value:T}'''
 assert s.count(old)==1 and s.count('Loaded{info:a,value}')==3
 s=s.replace(old,new).replace('impl<T> Loaded<T> {','impl<T> LoadedValue<T> {').replace('Loaded{info:a,value}','Box::new(LoadedValue{info:a,value})');out['src/admission.rs']=s
 s=base['src/dispatch.rs'];head=s[:s.index('/// Logical Result layer of169.')]
 dispatcher=s[s.index('/// Logical Result layer of169.'):s.index(' let (name,label)=business_selector')]
 process=s[s.index('/// Report propagated ordinary errors'):s.index('fn business_selector')]
 entries=re.findall(r'  (\[[0-9, ]+\])=>Some\(\("([a-z_0-9]+)","([^"]+)"\)\)',s)
 assert len(entries)==11
 patterns={'Donation':'kind,args','Close':'config,epoch','After':'shares','NonSwap':'shares','JustSwap':'swap_data','Combined':'swap_data,shares','Whitelist':'mints'}
 arms={}
 for typ,patt in patterns.items():
  start=s.index(f'  codec::Instruction::{typ}({patt})=>{{\n')+len(f'  codec::Instruction::{typ}({patt})=>{{\n')
  arms[typ]=s[start:].split('\n  }\n',1)[0]
 which={'close_donation_epoch_v1':'Close','distribute_after_just_swapping_v1':'After','distribute_non_swap_output_mint_v1':'NonSwap','just_swap_v1':'JustSwap','swap_then_distribute_v1':'Combined','upsert_mint_whitelist_v1':'Whitelist'}
 dispatcher+=' // Original169 routes to eleven distinct business wrappers178..188.\n match selector {\n'
 wrappers=[]
 for selector,name,label in entries:
  dispatcher+=f'  {selector}=>wrap_{name}(rt,contexts,program,accounts,raw_args),\n'
  typ=which.get(name,'Donation');patt=patterns[typ]
  wrappers.append(f'''// Instruction-specific wrapper: log, decode, admission, body, event/return, exit.
fn wrap_{name}<R:crate::idl_runtime::IdlRuntime,C:Admission<R>>(
 rt:&mut R,contexts:&mut C,program:Key,accounts:&[Account],raw_args:&[u8]
)->D<()> {{
 rt.log_instruction("{label}");
 let instruction=codec::decode_arguments("{name}",raw_args).map_err(Failure::Body)?;
 let codec::Instruction::{typ}({patt})=instruction else {{unreachable!("fixed decoder selection")}};
{arms[typ]}
}}
''')
 dispatcher+='  _=>Err(framework(101)),\n }\n}\n\n'
 out['src/dispatch.rs']=head+dispatcher+'\n'.join(wrappers)+'\n'+process
 return out
