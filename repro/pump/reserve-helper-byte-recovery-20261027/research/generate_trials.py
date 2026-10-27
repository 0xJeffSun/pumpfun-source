from pathlib import Path
import itertools,json,shutil,hashlib
ROOT=Path(__file__).resolve().parents[2];w=ROOT/'work/pump-reserve-byte-recovery';crate=w/'source/programs/pump'
shutil.copytree(ROOT/'programs/pump/src',crate/'src',dirs_exist_ok=True)
p=crate/'src/lib.rs';p.write_text(p.read_text()+'\npub mod reserve_trials;\n')
functions=['use anchor_lang::prelude::*;\nuse crate::{PumpError,trade_types::BondingCurve};\n'];rows=[]
for i,(threshold,cap,errors,expression,locals_) in enumerate(itertools.product(range(3),range(3),range(2),range(2),range(3))):
 name=f'pump_trial_{i:03}'
 err='.ok_or(PumpError::Overflow)?' if errors==0 else '.ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?'
 den='let denominator = bc.token_total_supply.checked_mul(2)'+err+'.checked_sub(initial)'+err+'.checked_sub(vault)'+err+';'
 loads=['let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;','let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;','let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;'][locals_]
 begin=(loads+den) if locals_==2 else (den+loads)
 thresholds=[
 'let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}',
 'if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}',
 'if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}'
 ][threshold]
 expr=('(denominator as u128 + vtr as u128).checked_mul(rqr as u128)' if expression==0 else '(rqr as u128).checked_mul(denominator as u128 + vtr as u128)')
 calc='let computed='+expr+err+'.checked_div(denominator as u128)'+err+';'
 caps=[
 'let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});',
 'bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};',
 'if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}'
 ][cap]
 functions.append(f'#[no_mangle]\n#[inline(never)]\npub fn {name}(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{{\nif bc.complete || !bc.is_mayhem_mode{{return Ok(())}}\n{begin}\n{thresholds}\n{calc}\n{caps}\nOk(())\n}}\n')
 rows.append(dict(name=name,threshold=threshold,cap=cap,errors=errors,expression=expression,locals=locals_))
source='\n'.join(functions);(crate/'src/reserve_trials.rs').write_text(source)
(w/'trial-definitions.json').write_text(json.dumps({'source_sha256':hashlib.sha256(source.encode()).hexdigest(),'variants':rows},indent=2)+'\n')
s=(w/'build-branching.py').read_text().replace("work/pump-reserve-byte-recovery/branching-build'","work/pump-reserve-byte-recovery/cohort-build'");(w/'build-cohort.py').write_text(s)
print(len(rows),'source variants')
