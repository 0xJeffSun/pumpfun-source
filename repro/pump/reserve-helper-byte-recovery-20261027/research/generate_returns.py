from pathlib import Path
import json,shutil,hashlib,itertools
root=Path(__file__).resolve().parents[2];w=root/'work/pump-reserve-byte-recovery';crate=w/'return-source/programs/pump';shutil.copytree(w/'load-source/programs/pump',crate,dirs_exist_ok=True)
s=(w/'load-source/programs/pump/src/reserve_trials.rs').read_text();base=s.split('pub fn pump_load_trial_006',1)[1].split('#[no_mangle]',1)[0];base=base[base.index('{')+1:base.rindex('}')]
needle='let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;';assert needle in base
product='(denominator as u128 + vtr as u128).checked_mul(rqr as u128)';err='anchor_lang::error::Error::from(PumpError::Overflow)'
forms=[needle,'let numerator=match '+product+'{Some(value)=>value,None=>return Err('+err+')};','let numerator=if let Some(value)='+product+'{value}else{return Err('+err+');};','let Some(numerator)='+product+' else{return Err('+err+');};','let product='+product+';if product.is_none(){return Err('+err+')}let numerator=product.unwrap();','let numerator='+product+'.ok_or(PumpError::Overflow).map_err(anchor_lang::error::Error::from)?;','let numerator='+product+'.ok_or_else(|| PumpError::Overflow.into()).and_then(|n|Ok::<u128,anchor_lang::error::Error>(n))?;','let numerator=match '+product+'{None=>Err('+err+'),Some(value)=>Ok(value)}?;','let numerator='+product+'.ok_or(PumpError::Overflow);let numerator=numerator?;']
rows=[];out=['use anchor_lang::prelude::*;use crate::{PumpError,trade_types::BondingCurve};']
for i,f in enumerate(forms):
 name=f'pump_return_trial_{i:03}';b=base.replace(needle,f);out.append(f'#[no_mangle]\n#[inline(never)]\npub fn {name}(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{{\n'+b+'}\n');rows.append(dict(name=name,form=i))
source='\n'.join(out);(crate/'src/reserve_trials.rs').write_text(source);(w/'return-trial-definitions.json').write_text(json.dumps({'source_sha256':hashlib.sha256(source.encode()).hexdigest(),'variants':rows},indent=2)+'\n')
p=crate/'src/mayhem_virtual_params.rs';s=p.read_text();start=s.index('        let bc = self;',s.index('fn sync_virtual_quote_reserves'));end=s.index('\n    }\n}',start);s=s[:start]+'        let bc=self;let initial=initial_real_token_reserves;let vault=vault_amount;let quote=quote_mint;\n'+base+s[end:];p.write_text(s)
shutil.copy2(w/'cohort-v1.45/target/sbf-solana-solana/release/pump_recovered.so',w/'load-cohort/unstripped.so')
s=(w/'build-loads.py').read_text().replace("work/pump-reserve-byte-recovery/load-cohort'","work/pump-reserve-byte-recovery/return-cohort'").replace("work/pump-reserve-byte-recovery/load-source/programs/pump'","work/pump-reserve-byte-recovery/return-source/programs/pump'");(w/'build-returns.py').write_text(s)
print(len(rows))
