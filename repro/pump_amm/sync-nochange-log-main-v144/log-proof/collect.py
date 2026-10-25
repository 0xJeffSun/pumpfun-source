from pathlib import Path
import gzip,json,hashlib,subprocess,shutil
R=Path.cwd();W=Path(__file__).resolve().parent;P=R/'work/amm-sync-context-build/publication';L=json.load(gzip.open(P/'inventory/after/residual-ledger.json.gz'));H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();out={}
for side,roots in [('original',[0x5dc20,0x10e970,0x1113f8]),('candidate',[0xaf120])]:
 rows={r['start']:r for r in L[side]};targets=set(roots)
 for a in roots:targets.update(c['target']for c in rows[a]['direct_calls'])
 out[side]=[rows[a]for a in sorted(targets)if a in rows];d=W/side;d.mkdir(exist_ok=True)
 for a in roots:
  r=rows[a];z=subprocess.run(['/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-objdump','-d','--start-address='+str(a),'--stop-address='+str(r['end']),str(R/'evidence/original/pump_amm/deployed.so'if side=='original'else P/'unstripped.so')],capture_output=True);assert z.returncode==0;(d/(hex(a)+'.asm')).write_bytes(z.stdout)
(W/'rows.json').write_text(json.dumps(out,indent=2)+'\n');s=(P/'source/programs/pump-amm/src/incentives.rs').read_text();a=s.index('pub fn sync(');b=s.index('#[event_cpi]',a);old=s[a:b];needle='        emit!(event.clone());emit_cpi!(event);\n    }';addition='        emit!(event.clone());emit_cpi!(event);\n    }else{\n        msg!("No changes in accumulator for user={}",ctx.accounts.user.key());\n    }';assert old.count(needle)==1;new=old.replace(needle,addition);(W/'before.rs').write_text(s);(W/'after.rs').write_text(s[:a]+new+s[b:]);z=subprocess.run(['diff','-u','--label','a/programs/pump-amm/src/incentives.rs','--label','b/programs/pump-amm/src/incentives.rs',str(W/'before.rs'),str(W/'after.rs')],capture_output=True);assert z.returncode==1;(W/'proposal.patch').write_bytes(z.stdout)
receipt=P/'runtime-01/incentives_sync.json.gz';shutil.copy2(receipt,W/'existing-sync-receipt.json.gz');data=json.load(gzip.open(receipt));summ=[]
for i,row in enumerate(data['cases']):
 o=[v for v in row['original'].get('logs',[])if 'No changes in accumulator for user='in v];c=[v for v in row['candidate'].get('logs',[])if 'No changes in accumulator for user='in v]
 if o or c:summ.append({'case_index':i,'original_nochange_messages':o,'candidate_nochange_messages':c,'saved_diff':row['diff'],'original_error':row['original']['error'],'candidate_error':row['candidate']['error']})
(W/'existing-log-evidence.json').write_text(json.dumps({'receipt_sha256':H(receipt),'case_count':data['case_count'],'original_candidate_sha256':data['candidate_sha256'],'nochange_rows':summ,'no_new_execution':True},indent=2)+'\n')
shutil.copy2(R/'scripts/pump_amm_incentives_differential.py',W/'existing-harness.py')
paths=[R/'evidence/original/pump_amm/deployed.so',P/'candidate.so',P/'unstripped.so',P/'inventory/after/residual-ledger.json.gz',P/'source/programs/pump-amm/src/incentives.rs',receipt,R/'scripts/pump_amm_incentives_differential.py'];(W/'bindings.json').write_text(json.dumps({str(p.relative_to(R)):H(p)for p in paths},indent=2)+'\n');o=(R/'evidence/original/pump_amm/deployed.so').read_bytes();(W/'format-data.json').write_text(json.dumps({'format_piece_pointer':0x11ce7c,'format_piece_len':35,'format_piece_utf8':o[0x11ce7c:0x11ce7c+35].decode(),'piece_descriptor_address':0x122590,'piece_descriptor_hex':o[0x122590:0x1225a0].hex(),'argument_formatter':0x10e970},indent=2)+'\n')
print(len(summ),'existing rows contain original log absent candidate')
