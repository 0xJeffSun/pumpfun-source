"""Freeze the fully regressed isolated composite without changing main."""
from pathlib import Path
import difflib,gzip,hashlib,json,shutil,tarfile
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if (p/'evidence/upstream/pump.json').is_file());D=W/'handoff'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
verification=json.loads((W/'independent-verification.json').read_text());expected=verification['candidate_sha256']
assert verification['differential_case_count']==9217 and verification['surfpool_comparisons']==1024 and verification['surfpool_signed_transactions']==2048 and not verification['mismatches']
build=json.loads((W/'build/build-comparison.json').read_text());inputs=json.loads((W/'inputs-before.json').read_text())
for group in ['harness_sha256','repository_fixture_snapshot_sha256','orchestration_sha256','main48_source_before']:
 for p,h in inputs[group].items():assert sha(R/p)==h,p
assert len(build['source_sha256'])==36
D.mkdir(exist_ok=False)
def cp(src,dst):
 dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst)
def gz(src,dst):
 dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(src.read_bytes(),mtime=0))
for name in ['inputs-before.json','source-delta.json','independent-verification.json','receipt-build-bindings.json','surfpool-executable-sha256.json','run_regressions.py','run_regressions_replay.py','run_surfpool.py','collect_regressions.py','verify_composite.py','freeze_composite.py','proposed-status-update.json']:
 cp(W/name,D/name)
for name in ['build-attempt.json','build-comparison.json']:cp(W/'build'/name,D/name)
cp(W/'build/artifacts/pump_recovered.so',D/'candidate.so');assert sha(D/'candidate.so')==expected
cp(W/'build/target/sbf-solana-solana/release/pump_recovered.so',D/'unstripped.so');gz(W/'build/build.log',D/'build.log.gz')
with tarfile.open(D/'source-snapshot.tar.gz','w:gz')as t:
 for p,h in build['source_sha256'].items():assert sha(R/p)==h;t.add(R/p,arcname=p)
(D/'source-sha256.json').write_text(json.dumps(build['source_sha256'],indent=2)+'\n')
before={str(Path(p).relative_to('programs/pump')):h for p,h in inputs['main48_source_before'].items()}
after={str(Path(p).relative_to(W.relative_to(R)/'source')):h for p,h in build['source_sha256'].items()}
changed=sorted(k for k in set(before)|set(after)if before.get(k)!=after.get(k));assert changed==['src/lib.rs','src/multi_hop_curve.rs']
(D/'source-delta.json').write_text(json.dumps({'base_revision':inputs['base_revision'],'base_candidate_sha256':inputs['base_candidate_sha256'],'before':before,'after':after,'changed_paths':changed,'unchanged_base_inputs':34,'main_source_changed':False},indent=2)+'\n')
for name in ['lib.rs','multi_hop_curve.rs']:cp(W/'source/src'/name,D/'source'/name)
old=(R/'programs/pump/src/lib.rs').read_text();new=(W/'source/src/lib.rs').read_text();patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/programs/pump/src/lib.rs',tofile='b/programs/pump/src/lib.rs'))
patch+=''.join(difflib.unified_diff([], (W/'source/src/multi_hop_curve.rs').read_text().splitlines(True),fromfile='/dev/null',tofile='b/programs/pump/src/multi_hop_curve.rs'))
(D/'integration.patch').write_text(patch)
tools=['scripts/build_partial_candidate.py','scripts/build_source_manifest.py','scripts/compare.py']
tool_hashes={p:sha(R/p)for p in tools}
with tarfile.open(D/'test-snapshot.tar.gz','w:gz')as t:
 for p,h in {**inputs['harness_sha256'],**inputs['orchestration_sha256'],**tool_hashes}.items():assert sha(R/p)==h;t.add(R/p,arcname=p)
(D/'source-harness-sha256.json').write_text(json.dumps({'source_sha256':build['source_sha256'],'harness_sha256':inputs['harness_sha256'],'repository_fixture_snapshot_sha256':inputs['repository_fixture_snapshot_sha256'],'tool_sha256':tool_hashes,'full_byte_equality':False},indent=2)+'\n')
copy_map={};suites={}
for row in json.loads((W/'differential/run.json').read_text()):
 p=W/'differential'/(row['suite']+'.json.gz');raw=p.read_bytes();plain=gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw;data=json.loads(plain)
 data['case_count']=row['case_count'];suites[row['suite']]=data;dst=D/'differential'/p.name;dst.parent.mkdir(exist_ok=True);dst.write_bytes(raw if raw.startswith(b'\x1f\x8b')else gzip.compress(raw,mtime=0))
 copy_map[str(dst.relative_to(D))]={'executed_path':str(p.relative_to(R)),'executed_file_sha256':sha(p),'stored_file_sha256':sha(dst),'decompressed_sha256':hashlib.sha256(plain).hexdigest()}
 gz(W/'differential'/(row['suite']+'.log'),D/'differential'/(row['suite']+'.log.gz'))
for name in ['run.json','summary.json','quote_control-first-receipt.json.gz','quote_control-first.log']:
 cp(W/'differential'/name,D/'differential'/name)
aggregate={'scope':'Derived convenience aggregate of raw saved receipts. 48 full handlers plus five partial paths, including fixed-scope native/legacy multi_hop_curve_swap. Existing sell_v2 gap unchanged.','candidate_sha256':expected,'original_sha256':verification['original_sha256'],'case_count':9217,'group_cases':{'published48':9161,'partial_multi_hop':56},'mismatches':[],'suites':suites}
(D/'all-differential.json.gz').write_bytes(gzip.compress((json.dumps(aggregate,separators=(',',':'))+'\n').encode(),mtime=0))
for row in json.loads((W/'surfpool/run.json').read_text()):
 directory=R/row['output'];dest=D/'surfpool'/row['name'];dest.mkdir(parents=True)
 for p in sorted(directory.iterdir()):
  if not p.is_file():continue
  if p.suffix=='.so':assert sha(p)==(expected if p.name=='candidate.so'else verification['original_sha256'])
  elif p.suffix in ['.json','.log']:
   dst=dest/(p.name+'.gz');gz(p,dst);copy_map[str(dst.relative_to(D))]={'executed_path':str(p.relative_to(R)),'executed_file_sha256':sha(p),'stored_file_sha256':sha(dst),'decompressed_sha256':sha(p)}
  else:raise AssertionError(('Unexpected Surfpool file',str(p)))
 gz(W/'surfpool'/(row['name']+'.log'),dest/'runner.log.gz')
cp(W/'surfpool/run.json',D/'surfpool-run.json')
for name in ['differential-orchestration.log','surfpool-orchestration.log','collection.log']:gz(W/name,D/(name+'.gz'))
(D/'receipt-copy-map.json').write_text(json.dumps(copy_map,indent=2)+'\n')
partial=W.parent/'checkpoint-native-legacy-partial';partial_manifest=json.loads((partial/'manifest-sha256.json').read_text())
for p,h in partial_manifest.items():assert sha(partial/p)==h
shutil.copytree(partial,D/'isolated-partial-checkpoint')
static=R/'work/pump-multi-hop-curve-static'
for line in (static/'MANIFEST.sha256').read_text().splitlines():
 h,p=line.split('  ',1);assert sha(static/p)==h;cp(static/p,D/'static-mapping'/p)
cp(static/'MANIFEST.sha256',D/'static-mapping/MANIFEST.sha256')
limitations=['Only one native curve per Pump CPI, flag 3, legacy 82/165-byte layouts and ordinary 166-byte curve are accepted by the new partial module.','Multi-curve, mixed endpoint flags, non-native/nested quote routes, Token22, holder rewards and synthetic completion are unsupported.','The existing sell_v2 quote-transfer-fee mismatch remains unchanged.','Existing v3/create_v2 partial limits, historical compiler/dependency identity and security audit remain incomplete.','Legacy runner embedded source maps are main48 checkout snapshots; receipt-build-bindings.json binds all 65 receipt files to the actual 36-input compiled candidate.','An initial metadata collector failed on the QC integer case-count schema after completed tests; raw diagnostics are retained and QC was repeated with identical JSON, without adding unique cases.']
summary={'scope':'Fully regressed isolated Pump48 plus partial native/legacy curve run; no main promotion.','candidate_sha256':expected,'candidate_bytes':(D/'candidate.so').stat().st_size,'base_revision':inputs['base_revision'],'base_candidate_sha256':inputs['base_candidate_sha256'],'instruction_bodies':48,'partial_paths':['buy_v3','sell_v3','buy_exact_quote_in_v3','create_v2','multi_hop_curve_swap'],'differential_suites':37,'differential_cases':9217,'surfpool_runners':28,'surfpool_comparisons':1024,'surfpool_signed_transactions':2048,'surfpool_verified_signatures':verification['surfpool_verified_signatures'],'partial_curve_verified_signatures':112,'source_inputs':36,'harness_inputs':len(inputs['harness_sha256']),'runtime_inputs':len(inputs['repository_fixture_snapshot_sha256']),'main_source_changed':False,'full_byte_equality':False,'security_audit_complete':False,'mismatches':[],'limitations':limitations}
(D/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
(D/'README.md').write_text('''# Pump48 plus partial native/legacy curve run

This isolated composite preserves all published 48-handler source except the minimal new module/export/entrypoint insertion. It has 48 full handlers and five partial paths. The new partial path accepts one native curve per Pump CPI, fee flag 3, legacy 82/165-byte token layouts and an ordinary 166-byte curve; multi-curve, mixed endpoint flags, non-native/nested quotes, Token22, holder rewards and completion crossing remain unsupported.

All 37 differential suites pass: the 9,161 published48 comparisons plus 56 fixed-scope multi-hop comparisons. All 28 unchanged Surfpool runners pass: 1,024 comparisons and 2,048 independently verified signed transactions. The new cases use fresh VMs, synthetic local state, ordinary verified outer signatures, and captured AMM's genuine PDA-signed Pump CPI. No stopped source lane was changed, and no new token-extension/fee/initializer experiment was added. Existing approved regression fixtures remain unchanged.

The clean pinned v1.44 build, actual 36 source inputs, toolchain/lock records and source/test snapshots are bound here. `summary.json` gives exact executable identity and counts. `receipt-build-bindings.json` binds each saved receipt to that executable and its actual compiler inputs. Legacy receipts' embedded source maps are incidental main48 checkout snapshots; they do not describe the composite compilation. Quote-control directly binds the adjacent composite build report and all 36 source inputs. `receipt-copy-map.json` links execution bytes to compressed package copies without rewriting raw receipts.

`integration.patch` contains only the new module and minimal insertion against published48. Main source has not been changed. The immutable isolated partial checkpoint and read-only static mapping are retained, including failed drafts and the excluded cached-harness diagnostic. An initial results collector failed on quote-control's integer case-count schema; the completed raw receipt and log are retained, and a repeated QC run produced identical JSON. Repeats add no unique cases.

Full original-byte equality remains false. The known sell_v2 quote-transfer-fee mismatch, other partial branches, historical source/compiler/dependency identity and security audit remain incomplete. This is bounded reconstruction evidence, not a deployable substitute.
''')
manifest={str(p.relative_to(D)):sha(p)for p in sorted(D.rglob('*'))if p.is_file()};(D/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
for p,h in manifest.items():assert sha(D/p)==h
status={'package':str(D.relative_to(R)),'files':len(manifest)+1,'manifest_sha256':sha(D/'manifest-sha256.json'),**summary}
(W/'handoff-status.json').write_text(json.dumps(status,indent=2)+'\n');print(json.dumps(status,indent=2))
