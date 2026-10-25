from pathlib import Path
import gzip,json,hashlib,subprocess,shutil
R=Path.cwd();W=R/'work/fees-next-residual-pass2';P=R/'repro/pump_fees/v2-caller-v144';x=json.load(gzip.open(P/'v2-static-proof.json.gz'));legacy=json.load(gzip.open(P/'legacy-static-proof.json.gz'));names=['handler','authorize','preprocess','zero_payout','paired_payout','final_validation','pump_adapter']
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
proof={'original_sha256':x['original_sha256'],'candidate_sha256':x['candidate_sha256'],'symbols_sha256':x['symbols_sha256'],'roots':{n:x['roots'][n]for n in names},'full_instructions_and_data':{n:x['full_instructions_and_data'][n]for n in names if n in x['full_instructions_and_data']},'direct_target_inventory':x['direct_target_inventory'],'actual_handler_paths':x['actual_handler_paths'],'limits':x['limits'],'legacy_original_roots':{n:legacy['roots']['original'][n]for n in ['amm_adapter','payout_adapter','final_validation','pump_adapter']}}
(W/'selected-proof.json.gz').write_bytes(gzip.compress((json.dumps(proof,indent=2)+'\n').encode(),mtime=0))
inputs=[P/'v2-static-proof.json.gz',P/'legacy-static-proof.json.gz',P/'full-function-inventory.json',P/'pump_fees_candidate.so',P/'symbols.so',R/'evidence/original/pump_fees/deployed.so',R/'programs/pump-fees/src/sharing_update.rs',R/'programs/pump-fees/src/donation.rs',R/'programs/pump-fees/src/lib.rs']
(W/'input-bindings.json').write_text(json.dumps({str(p.relative_to(R)):H(p)for p in inputs},indent=2)+'\n')
for n in ['sharing_update.rs','donation.rs','lib.rs']:shutil.copy2(R/'programs/pump-fees/src'/n,W/n)
obj='/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-objdump'
for n in names:
 for side,binary in [('original',R/'evidence/original/pump_fees/deployed.so'),('candidate',P/'symbols.so')]:
  r=x['roots'][n][side];out=W/'windows'/(n+'-'+side+'.asm');out.parent.mkdir(exist_ok=True);a=subprocess.run([obj,'--disassemble','--start-address='+str(r['start']),'--stop-address='+str(r['end']),str(binary)],capture_output=True,text=True,check=True);out.write_text(a.stdout)
