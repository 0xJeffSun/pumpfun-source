from pathlib import Path
import itertools,json,shutil,hashlib
root=Path(__file__).resolve().parents[2];w=root/'work/pump-reserve-byte-recovery';crate=w/'error-source/programs/pump'
shutil.copytree(w/'source/programs/pump',crate,dirs_exist_ok=True)
header='use anchor_lang::prelude::*;\nuse crate::{PumpError,trade_types::BondingCurve};\n'
base=(w/'source/programs/pump/src/reserve_trials.rs').read_text();base=base.split('pub fn pump_trial_062',1)[1].split('#[no_mangle]',1)[0];base=base[base.index('{')+1:base.rindex('}')]
old='let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;'
assert old in base
rows=[];out=[header]
errors=['.ok_or(PumpError::Overflow)?','.ok_or_else(|| PumpError::Overflow)?','.ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?','.ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?']
for i,(form,mulerr,diverr) in enumerate(itertools.product(range(5),range(4),range(4))):
 mul='(denominator as u128 + vtr as u128).checked_mul(rqr as u128)'+errors[mulerr]
 div='numerator.checked_div(denominator as u128)'+errors[diverr]
 if form==0: calc='let computed='+mul+'.checked_div(denominator as u128)'+errors[diverr]+';'
 elif form==1:calc='let numerator='+mul+';let computed='+div+';'
 elif form==2:calc='let computed={let numerator='+mul+';'+div+'};'
 elif form==3:calc='let numerator='+mul+';let divisor=denominator as u128;let computed=numerator.checked_div(divisor)'+errors[diverr]+';'
 else:calc='let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128)'+errors[mulerr]+';let computed='+div+';'
 name=f'pump_error_trial_{i:03}'
 out.append(f'#[no_mangle]\n#[inline(never)]\npub fn {name}(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{{\n'+base.replace(old,calc)+'}\n')
 rows.append(dict(name=name,form=form,mulerr=mulerr,diverr=diverr))
source='\n'.join(out);(crate/'src/reserve_trials.rs').write_text(source);(w/'error-trial-definitions.json').write_text(json.dumps({'source_sha256':hashlib.sha256(source.encode()).hexdigest(),'variants':rows},indent=2)+'\n')
p=w/'cohort-v1.45/target/sbf-solana-solana/release/pump_recovered.so';shutil.copy2(p,w/'cohort-v1.45/unstripped.so')
s=(w/'build-v1.45.py').read_text().replace("work/pump-reserve-byte-recovery/cohort-v1.45'","work/pump-reserve-byte-recovery/error-cohort'").replace("work/pump-reserve-byte-recovery/source/programs/pump'","work/pump-reserve-byte-recovery/error-source/programs/pump'").replace("str(out/'target')","str(ROOT/'work/pump-reserve-byte-recovery/cohort-v1.45/target')").replace("unstripped=out/'target/sbf-solana-solana/release/pump_recovered.so'","unstripped=ROOT/'work/pump-reserve-byte-recovery/cohort-v1.45/target/sbf-solana-solana/release/pump_recovered.so'")
s=s.replace("'scope':'Direct invocation of the existing v1.44 compiler", "'scope':'Direct invocation of the existing v1.45 compiler")
(w/'build-errors.py').write_text(s)
print(len(rows))
