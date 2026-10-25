from pathlib import Path
import json,hashlib,shutil,sys
P=Path(__file__).resolve().parent;R=P.parents[1];S=R/'repro/donation-relay/source-build-12-idl-discriminator-owned';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n in['analyze.py','disasm.py','original.so','unstripped.so','original-function-ledger.json','candidate-function-ledger.json','match-ledger.json','whole-file-residuals.json.gz']:shutil.copyfile(S/n,P/n)
shutil.copytree(S/'source',P/'source');shutil.copyfile(S/'manifest.json',P/'checkpoint-manifest.json');shutil.copyfile(S/'launcher/resolved-source-sha256.json',P/'source-map.json');sys.path.insert(0,str(P));import disasm
selected={}
for kind,roots in [('original',[13984,14936,16672,651064,652280,665312]),('candidate',[71016,71880,73560,75256])]:
 e=disasm.a.Elf((P/('original.so'if kind=='original'else'unstripped.so')).read_bytes());rows=json.loads((P/f'{kind}-function-ledger.json').read_text());by={r['start']:r for r in rows};ss=set(roots)
 # Complete direct-target bodies for fixed writers/factories; deeper semantics remain opaque.
 for a in roots:ss.update(c['target']for c in by[a]['direct_calls']if c['target']in by)
 selected[kind]=[by[a]for a in sorted(ss)];(P/kind).mkdir()
 for f in selected[kind]:(P/kind/f"{f['start']}.asm").write_text(disasm.render(e,f['start'],f['end']))
(P/'selected-rows.json').write_text(json.dumps(selected,indent=2)+'\n')
proof={'baseline_checkpoint_seal':H(S/'manifest.json'),'candidate_sha256':H(S/'candidate.so'),'symbols_sha256':H(S/'unstripped.so'),'source_map_sha256':H(S/'launcher/resolved-source-sha256.json'),'pairs':[{'role':'epoch_tracker','original':[14936,15904],'candidate':[73560,75256],'original_3004_factory_call':15816,'candidate_3004_factory_call':74976,'original_error_drop_callx':15784,'candidate_error_drop_callx':74952,'original_guard_release':15856,'candidate_guard_release':75016},{'role':'debouncer','original':[13984,14936],'candidate':[71880,73560],'original_3004_factory_call':14848,'candidate_3004_factory_call':73296,'original_error_drop_callx':14816,'candidate_error_drop_callx':73272,'original_guard_release':14888,'candidate_guard_release':73336},{'role':'distribution','original':[16672,17712],'candidate':[75256,77024],'original_3004_factory_call':17624,'candidate_3004_factory_call':76760,'original_error_drop_callx':17592,'candidate_error_drop_callx':76736,'original_guard_release':17664,'candidate_guard_release':76800}],'source_change_proposed':False,'new_builds':0,'new_target_executions':0}
(P/'closure.json').write_text(json.dumps(proof,indent=2)+'\n')
