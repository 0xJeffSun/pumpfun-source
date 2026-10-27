from pathlib import Path
import itertools,json,shutil,hashlib
root=Path(__file__).resolve().parents[2];w=root/'work/pump-reserve-byte-recovery';crate=w/'load-source/programs/pump';shutil.copytree(w/'error-source/programs/pump',crate,dirs_exist_ok=True)
s=(w/'error-source/programs/pump/src/reserve_trials.rs').read_text();base=s.split('pub fn pump_error_trial_016',1)[1].split('#[no_mangle]',1)[0];base=base[base.index('{')+1:base.rindex('}')]
old='let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;'
assert old in base
base=base.replace(old,'')
den='let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;'
assert den in base
rows=[];out=['use anchor_lang::prelude::*;use crate::{PumpError,trade_types::BondingCurve};']
for i,(before,order,cast,denform) in enumerate(itertools.product(range(4),range(2),range(2),range(3))):
 vtr='let vtr=bc.virtual_token_reserves'+(' as u128' if cast else '')+';';rqr='let rqr=bc.real_quote_reserves;';ls=[vtr,rqr] if order==0 else [rqr,vtr]
 newden=[den,'let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;','let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;'][denform]
 if before==0:body=base.replace(den,''.join(ls)+newden)
 elif before==1:body=base.replace(den,newden+''.join(ls))
 elif before==2:body=base.replace(den,ls[0]+newden+ls[1])
 else:body=base.replace(den,ls[1]+newden+ls[0])
 name=f'pump_load_trial_{i:03}';out.append(f'#[no_mangle]\n#[inline(never)]\npub fn {name}(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{{\n'+body+'}\n');rows.append(dict(name=name,before=before,order=order,cast=cast,denform=denform))
source='\n'.join(out);(crate/'src/reserve_trials.rs').write_text(source);(w/'load-trial-definitions.json').write_text(json.dumps({'source_sha256':hashlib.sha256(source.encode()).hexdigest(),'variants':rows},indent=2)+'\n')
p=w/'cohort-v1.45/target/sbf-solana-solana/release/pump_recovered.so';shutil.copy2(p,w/'error-cohort/unstripped.so')
s=(w/'build-errors.py').read_text().replace("work/pump-reserve-byte-recovery/error-cohort'","work/pump-reserve-byte-recovery/load-cohort'").replace("work/pump-reserve-byte-recovery/error-source/programs/pump'","work/pump-reserve-byte-recovery/load-source/programs/pump'")
(w/'build-loads.py').write_text(s);print(len(rows))
