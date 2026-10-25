"""Package an authorized clean main promotion with exact scratch ELF identity."""
from pathlib import Path
import gzip,hashlib,json,shutil,tarfile
P=Path(__file__).resolve().parent;R=P.parents[1];W=P/'composite48';D=W/'handoff';B=P/'main-build-01';Q=R/'repro/pump/native-curve-partial-fortyeight'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
manifest=json.loads((D/'manifest-sha256.json').read_text())
for p,h in manifest.items():assert sha(D/p)==h,p
assert (B/'artifacts/pump_recovered.so').read_bytes()==(D/'candidate.so').read_bytes()
main=json.loads((B/'build-comparison.json').read_text());scratch=json.loads((D/'build-comparison.json').read_text());assert len(main['source_sha256'])==36
main_relative={str(Path(p).relative_to('programs/pump')):h for p,h in main['source_sha256'].items()}
scratch_root=str((W/'source').relative_to(R));scratch_relative={str(Path(p).relative_to(scratch_root)):h for p,h in scratch['source_sha256'].items()}
assert main_relative==scratch_relative
for p,h in main['source_sha256'].items():assert sha(R/p)==h,p
shutil.copytree(D,Q)
def cp(src,dst):
 dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst)
def gz(src,dst):
 dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(src.read_bytes(),mtime=0))
replaced=['README.md','build-attempt.json','build-comparison.json','build.log.gz','source-snapshot.tar.gz','source-sha256.json','source-harness-sha256.json','summary.json','unstripped.so','manifest-sha256.json']
bindings={p:p for p in manifest}
for p in replaced:
 cp(Q/p,Q/'scratch-composite'/p)
 if p in bindings:bindings[p]='scratch-composite/'+p
(Q/'scratch-package-bindings.json').write_text(json.dumps(bindings,indent=2)+'\n')
for name in ['build-attempt.json','build-comparison.json']:cp(B/name,Q/name)
gz(B/'build.log',Q/'build.log.gz');cp(B/'artifacts/pump_recovered.so',Q/'candidate.so');cp(B/'target/sbf-solana-solana/release/pump_recovered.so',Q/'unstripped.so')
with tarfile.open(Q/'source-snapshot.tar.gz','w:gz')as t:
 for p,h in main['source_sha256'].items():assert sha(R/p)==h;t.add(R/p,arcname=p)
(Q/'source-sha256.json').write_text(json.dumps(main['source_sha256'],indent=2)+'\n')
source_harness=json.loads((Q/'source-harness-sha256.json').read_text());source_harness['source_sha256']=main['source_sha256'];(Q/'source-harness-sha256.json').write_text(json.dumps(source_harness,indent=2)+'\n')
identity={'scope':'Exact entire-file identity permits reusing the fully regressed composite receipts for the clean main build. Runtime testing is not rerun or counted again.','whole_file_equal':True,'candidate_bytes':(Q/'candidate.so').stat().st_size,'main_candidate_sha256':sha(Q/'candidate.so'),'scratch_candidate_sha256':sha(D/'candidate.so'),'main_build_report_sha256':sha(Q/'build-comparison.json'),'scratch_build_report_sha256':sha(D/'build-comparison.json'),'main_source_inputs':36,'scratch_source_inputs':36,'source_bytes_equal_after_path_mapping':True,'scratch_source_root':scratch_root,'scratch_candidate_path':str((W/'build/artifacts/pump_recovered.so').relative_to(R)),'original_scratch_manifest_sha256':sha(D/'manifest-sha256.json'),'receipt_comparisons_reused':9217,'surfpool_comparisons_reused':1024,'signed_surfpool_transactions_reused':2048,'full_original_byte_equality':False}
(Q/'main-scratch-identity.json').write_text(json.dumps(identity,indent=2)+'\n')
cp(P/'verify_package.py',Q/'verify-package.py');cp(P/'differential.py',Q/'harness/pump_multi_hop_curve_differential.py');cp(Path(__file__),Q/'promote_package.py')
docpaths=['programs/pump/README.md','audit/pump/MULTI_HOP_CURVE_RECOVERY.md'];docs={p:sha(R/p)for p in docpaths};(Q/'documentation-sha256.json').write_text(json.dumps(docs,indent=2)+'\n')
summary=json.loads((Q/'summary.json').read_text());summary.update(scope='Clean main48 promotion plus a fifth partial native/legacy curve-run path; whole-file identical to the fully regressed scratch composite.',main_source_changed=True,main_scratch_whole_file_equal=True,compiled_source_paths='programs/pump',partial_curve_pump_cpi_comparisons=50,partial_curve_caller_rejections=6,partial_curve_successful_comparisons=11)
(Q/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
replays=json.loads((R/'repro/pump/quote-control-fortyeight/replay-commands.json').read_text());candidate=str((Q/'candidate.so').relative_to(R))
for kind in ['differential','surfpool']:
 for item in replays[kind]:
  cmd=item['command'];cmd[cmd.index('--candidate')+1]=candidate;cmd[cmd.index('--output')+1]='work/pump-native-curve-replay/'+kind+'/'+item['suite']+('.json.gz'if kind=='differential'else'')
replays['differential'].append({'suite':'multi_hop_curve_partial','family':'partial_curve','command':['work/test-env/bin/python',str((Q/'harness/pump_multi_hop_curve_differential.py').relative_to(R)),'--candidate',candidate,'--output','work/pump-native-curve-replay/differential/multi_hop_curve_partial.json']})
replays['saved_package_verifier']=['python',str((Q/'verify-package.py').relative_to(R)),'--current-main'];replays['scope']='Replay commands for this exact main candidate; unchanged shared-port Surfpool runners must not overlap. The saved-package verifier does not execute programs.'
(Q/'replay-commands.json').write_text(json.dumps(replays,indent=2)+'\n')
(Q/'README.md').write_text('''# Pump48 with a partial native/legacy curve run

The main source retains 48 recovered handlers and adds a fifth partial path, `multi_hop_curve_swap`. The clean pinned v1.44 main executable is 1,534,904 bytes, SHA-256 `6271a6d5782d350f6d716a91712d283592d4589aa8e9befb9c1f1a0dd3ac7ebe`. It is byte-for-byte identical to the fully regressed scratch composite; `main-scratch-identity.json` justifies receipt reuse. Full captured-original byte equality remains false.

All 37 differential suites pass: 9,161 published48 comparisons plus 56 new fixed-scope cases. Fifty of the new comparisons reach Pump through the captured AMM's genuine PDA-signed CPI; six stop in AMM before Pump, and only 11 succeed. All 112 outer signatures were independently verified. All 28 unchanged Surfpool runners pass: 1,024 comparisons, 2,048 signed transactions and 2,980 individual signatures. Repeated verification runs add no unique cases.

The new partial branch accepts one native curve per Pump CPI with flag 3, legacy Tokenkeg 82/165-byte layouts and an ordinary 166-byte non-holder curve. Multi-curve runs, mixed endpoint flags, non-native/nested quotes, Token-2022, holder rewards and synthetic completion remain unsupported. Local fixtures are synthetic and use normal test-owned signatures. No PDA signature bypass, live mutation, executable patch or expansion of a stopped recovery lane was used.

`build-comparison.json`, `source-snapshot.tar.gz` and `source-harness-sha256.json` bind all 36 actual main compiler inputs, 94 helper/orchestration-related harness inputs and 28 runtime/fixture inputs. The unchanged v1.44 lock compatibility graph is not proof of historical build provenance. `receipt-build-bindings.json` retains all 65 receipt-to-composite-build mappings; main reuse additionally relies on exact executable identity. Legacy embedded source maps remain incidental Pump48 checkout snapshots and are not represented as the compiled candidate's input map. Quote-control directly binds the adjacent scratch build report and all 36 source inputs.

Both immutable scratch stages and the read-only static mapping are retained. `scratch-package-bindings.json` maps every file of the full composite handoff to its preserved bytes, including replaced build/source records under `scratch-composite/`. Raw receipts are unchanged; `receipt-copy-map.json` maps execution bytes to compressed copies. Failed compiler/runtime drafts and the invalid cached-harness diagnostic are retained and excluded from current passing counts. The current harness uses a fresh VM for each side. An initial metadata collector failed on the quote-control count schema after the runners completed; the first receipt and log are retained, and a repeat produced identical JSON.

Run `python repro/pump/native-curve-partial-fortyeight/verify-package.py` from any directory using its absolute path when needed. It requires the recorded Python dependencies, including solders, and verifies saved hashes, source/test archives, receipt bindings and transaction signatures without program execution. Add `--current-main` to check current source/runtime/documentation files. `replay-commands.json` lists individual runtime replays; the portable focused harness is under `harness/`.

The known sell_v2 quote-transfer-fee minimum-output/event mismatch is unchanged. The other partial paths, historical source/compiler/dependency identity, exhaustive account/extension behavior and the security audit remain incomplete. This is bounded reconstruction evidence, not a deployable replacement.
''')
new_manifest={str(p.relative_to(Q)):sha(p)for p in sorted(Q.rglob('*'))if p.is_file()and p.name!='manifest-sha256.json'}
# Nested checkpoint manifests remain artifacts; exclude only this package's own manifest.
new_manifest={str(p.relative_to(Q)):sha(p)for p in sorted(Q.rglob('*'))if p.is_file()and p!=Q/'manifest-sha256.json'}
(Q/'manifest-sha256.json').write_text(json.dumps(new_manifest,indent=2)+'\n')
status={'package':str(Q.relative_to(R)),'package_files':len(new_manifest)+1,'manifest_sha256':sha(Q/'manifest-sha256.json'),'candidate_sha256':sha(Q/'candidate.so'),'candidate_bytes':(Q/'candidate.so').stat().st_size,'source_inputs':36,'differential_cases':9217,'differential_suites':37,'surfpool_comparisons':1024,'surfpool_signed_transactions':2048,'surfpool_verified_signatures':2980,'full_byte_equality':False}
(P/'promotion-status.json').write_text(json.dumps(status,indent=2)+'\n');print(json.dumps(status,indent=2))
