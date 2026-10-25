#!/usr/bin/env python3
"""Freeze the approved main source checkpoint, using only explicit file allowlists."""
from pathlib import Path
import copy,gzip,hashlib,io,json,shutil,tarfile
W=Path(__file__).resolve().parent;R=W.parents[1];H=W/'handoff';B=W/'main-build-01';P=R/'repro/pump/bonding-curve-serializer-fortyeight'
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(path):return json.loads(path.read_text())
def digest(path):return sha(path.read_bytes())
def write(name,value):
 p=P/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(value,indent=2)+'\n')
def copyfile(source,name):
 assert not source.name.endswith('-keypair.json') and not source.is_symlink()
 p=P/name;p.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,p)
def archive(out,files,base):
 with out.open('wb')as f,gzip.GzipFile(fileobj=f,mode='wb',mtime=0)as gz,tarfile.open(fileobj=gz,mode='w|')as tar:
  for name in files:
   assert '..'not in Path(name).parts and not Path(name).is_absolute() and not Path(name).name.endswith('-keypair.json')
   src=base/name;assert src.is_file()and not src.is_symlink();raw=src.read_bytes();item=tarfile.TarInfo(name);item.size=len(raw);item.mode=0o644;tar.addfile(item,io.BytesIO(raw))
seal=read(H/'manifest-sha256.json');assert digest(H/'manifest-sha256.json')=='32cc9e674f38ed552ceeb06021a7fd3fe1140cbbade4bfff01db6b84f0c099bc'
for p,row in seal.items():assert digest(H/p)==row['sha256']and(H/p).stat().st_size==row['bytes'],p
main=read(B/'build-comparison.json');attempt=read(B/'build-attempt.json');scratch=read(H/'build-comparison.json');v=read(H/'independent-verification.json');inputs=read(H/'inputs-before.json')
assert attempt['returncode']==0 and attempt['source_unchanged']
assert main['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==read(H/'candidate-source-sha256.json')
for p,d in main['source_sha256'].items():assert digest(R/p)==d,p
for group in ['harness_sha256','repository_fixture_snapshot_sha256']:
 for p,d in inputs[group].items():assert digest(R/p)==d,p
assert digest(R/inputs['surfpool_path'])==inputs['surfpool_sha256']
for p,d in read(H/'helper-sha256.json').items():assert digest(R/p)==d,p
assert(B/'artifacts/pump_recovered.so').read_bytes()==(H/'candidate.so').read_bytes()
assert main['comparison']['candidate_sha256']==v['candidate_sha256']=='92575cd082bf76b332044a7d09371a9764db8b2cc40180bf1418f261945bbd6a'
assert len(main['source_sha256'])==36 and v['differential_case_count']==9217 and v['surfpool_comparisons']==1024
assert not P.exists();P.mkdir(parents=True)
for name in ['build-attempt.json','build-comparison.json']:copyfile(B/name,name)
copyfile(B/'artifacts/pump_recovered.so','candidate.so');copyfile(B/'target/sbf-solana-solana/release/pump_recovered.so','unstripped.so')
(P/'build.log.gz').write_bytes(gzip.compress((B/'build.log').read_bytes(),mtime=0));copyfile(W/'main-build-launcher.log','main-build-launcher.log')
write('source-sha256.json',main['source_sha256']);archive(P/'source-snapshot.tar.gz',sorted(main['source_sha256']),R)
archive(P/'scratch-handoff.tar.gz',sorted([*seal,'manifest-sha256.json']),H)
copyfile(H/'manifest-sha256.json','scratch-manifest-sha256.json')
copyfile(W/'main-function-match.json','function-match.json');copyfile(W/'match-main-serializer.py','match-main-serializer.py')
for name in ['elf_reader.py','serializer.patch','harness-snapshot.tar.gz','harness-snapshot-sha256.json','helper-sha256.json','dependency-provenance.json']:
 copyfile(H/name,name)
for p in read(H/'helper-sha256.json'):copyfile(R/p,'build-helper-snapshot/'+p)
copyfile(W/'verify-package.py','verify-package.py');copyfile(W/'promote-package.py','promote-package.py')
tools=read(H/'toolchain-provenance.json')
for row in tools['tools'].values():assert digest(Path(row['path']))==row['sha256']and Path(row['path']).stat().st_size==row['bytes']
tools['scope']='Observed pinned tools after the clean main build; hashes equal the tested scratch toolchain. Not historical compiler proof.';write('toolchain-provenance.json',tools)
copyfile(H/'all-differential.json.gz','all-differential.json.gz')
original_copy_map=read(H/'receipt-copy-map.json');original_bindings=read(H/'receipt-build-bindings.json');bindings=[];copymap={};surfpaths=[]
for item in original_bindings:
 entry=original_copy_map[item['receipt']];original=H/entry['path'];raw=original.read_bytes();assert sha(raw)==item['receipt_sha256']
 name=entry['path']if entry['path'].endswith('.gz')else entry['path']+'.gz'
 stored=raw if raw.startswith(b'\x1f\x8b')else gzip.compress(raw,mtime=0)
 (P/name).parent.mkdir(parents=True,exist_ok=True);(P/name).write_bytes(stored)
 copymap[item['receipt']]={'path':name,'archive_member':entry['path'],'original_sha256':sha(raw),'stored_sha256':sha(stored),'original_storage':'identity'if raw.startswith(b'\x1f\x8b')else'gzip'}
 binding=copy.deepcopy(item);binding['scratch_receipt_binding_preserved_in']='scratch-handoff.tar.gz::receipt-build-bindings.json';binding['archived_receipt_member']=entry['path'];binding['published_receipt']=name;binding['published_receipt_sha256']=sha(stored);binding['main_build_report']='build-comparison.json';binding['main_build_report_sha256']=digest(P/'build-comparison.json');binding['actual_main_compiler_inputs_sha256']=main['source_sha256'];binding['main_scratch_identity_report']='main-scratch-identity.json';bindings.append(binding)
 if item['kind']=='surfpool':surfpaths.append(str((P/name).relative_to(R)))
write('receipt-copy-map.json',copymap);write('receipt-build-bindings.json',bindings)
identity={'scope':'Exact entire-file main/scratch equality permits reuse of the fully regressed scratch receipts. No runtime rerun or new comparison count.','whole_file_equal':True,'candidate_bytes':(P/'candidate.so').stat().st_size,'main_candidate_sha256':digest(P/'candidate.so'),'scratch_candidate_sha256':v['candidate_sha256'],'main_build_report_sha256':digest(P/'build-comparison.json'),'scratch_build_report_sha256':digest(H/'build-comparison.json'),'main_source_inputs':36,'scratch_source_inputs':36,'source_bytes_equal_after_path_mapping':True,'scratch_source_root':'work/pump-bonding-curve-serializer-recovery/source','scratch_manifest_sha256':digest(H/'manifest-sha256.json'),'scratch_archive_sha256':digest(P/'scratch-handoff.tar.gz'),'receipt_files_reused':65,'differential_comparisons_reused':9217,'differential_transactions_reused':15830,'differential_signatures_reused':24216,'surfpool_comparisons_reused':1024,'surfpool_transactions_reused':2048,'surfpool_signatures_reused':2980,'full_original_byte_equality':False}
write('main-scratch-identity.json',identity)
docs=['programs/pump/README.md','audit/pump/BONDING_CURVE_SERIALIZATION_RECOVERY.md'];docsmap={p:digest(R/p)for p in docs}
for p in docs:copyfile(R/p,'documentation-snapshot/'+p)
write('source-harness-sha256.json',{'source':main['source_sha256'],'harness':inputs['harness_sha256'],'runtime':inputs['repository_fixture_snapshot_sha256'],'documentation':docsmap,'build_helpers':read(H/'helper-sha256.json'),'surfpool':{'path':inputs['surfpool_path'],'sha256':inputs['surfpool_sha256']},'scope':'Main compiler inputs plus unchanged executed helper/runtime references. Historical source maps embedded in raw receipts are incidental baseline checkout snapshots.'})
write('scratch-package-bindings.json',{'scope':'Every original sealed scratch member is preserved byte-for-byte inside the archive, including original filenames and raw JSON bytes. The additional compressed receipt copies have an explicit reversible storage map.','archive':'scratch-handoff.tar.gz','archive_sha256':digest(P/'scratch-handoff.tar.gz'),'manifest':'scratch-manifest-sha256.json','manifest_sha256':digest(P/'scratch-manifest-sha256.json'),'sealed_files_including_manifest':174,'payload_files':173,'source_snapshot_inputs':36})
summary={k:value for k,value in v.items()if k not in ['differential_suites','surfpool_suites']};summary.update({'scope':'Main promotion of the already tested scratch source via exact whole-file identity. No new runtime execution at promotion.','main_build_report_sha256':digest(P/'build-comparison.json'),'receipt_build_bindings_sha256':digest(P/'receipt-build-bindings.json'),'main_source_unchanged_during_build':True,'source_delta_from_previous_main':['programs/pump/src/trade_types.rs'],'source_input_count':36,'main_build_attempts':1,'scratch_build_attempts':1,'failed_builds':0,'serializer_direct_call_sites':25,'serializer_unique_direct_targets':6,'serializer_body_bytes':1840,'implemented_handlers':48,'partial_paths':5,'new_cases':0,'differential_signed_transactions':15830,'differential_verified_signatures':24216});summary.pop('main_source_unchanged',None);write('verification-summary.json',summary)
status=read(R/'repro/status.json')['pump'];prefix=str(P.relative_to(R));status.update({'candidate_artifact':prefix+'/candidate.so','comparison_report':prefix+'/build-comparison.json','build_log':prefix+'/build.log.gz','validation_reports':[prefix+'/all-differential.json.gz'],'signed_sequence_reports':sorted(surfpaths),'candidate_build_identity_report':prefix+'/main-scratch-identity.json','prior_checkpoint':'repro/pump/native-curve-partial-fortyeight','receipt_build_bindings_report':prefix+'/receipt-build-bindings.json','bonding_curve_serialization_recovery_report':'audit/pump/BONDING_CURVE_SERIALIZATION_RECOVERY.md','bonding_curve_serialization_body_evidence':prefix+'/function-match.json','differential_signed_transactions':15830,'differential_verified_signatures':24216})
assert len(status['implemented_handlers'])==48 and len(status['partially_implemented_handlers'])==5;write('status-pump-proposal.json',status)
write('owned-source-documentation-sha256.json',{'programs/pump/src/trade_types.rs':digest(R/'programs/pump/src/trade_types.rs'),**docsmap})
(P/'README.md').write_text('''# Pump48 BondingCurve serialization checkpoint

The main source retains 48 recovered handlers and five partial paths. Only `programs/pump/src/trade_types.rs` changes from the native-curve-partial checkpoint: equivalent explicit account traits propagate ordinary serializer I/O errors instead of wrapping them as Anchor error 3004. Field layout, owner, discriminator and deserialization logic remain unchanged; macro source coordinates can differ.

One clean main v1.44 build produced 1,534,768 bytes, SHA-256 `92575cd082bf76b332044a7d09371a9764db8b2cc40180bf1418f261945bbd6a`. The entire executable equals the fully regressed scratch candidate. `main-scratch-identity.json` establishes receipt reuse. No executable patch, path padding, dependency/profile change or compiler-version search was used.

The captured original BondingCurve exit at `0x5a28..0x6158` and candidate body at `0x7110` are both 1,840 bytes. Complete bodies match after strict normalization of actual relocation and internal-call immediates. All 25 direct-call sites reach matching complete bodies, with six unique targets, and the consumed eight-byte discriminator matches exactly. `function-match.json` is a fresh main-artifact comparison. Full original ELF equality remains false; transitive rodata and historical source identity are not established.

The scratch candidate passed all 37 unchanged differential suites (9,217 comparisons) and 28 unchanged Surfpool runners (1,024 comparisons). The saved receipts contain 15,830 differential transactions with 24,216 verified signatures and 2,048 Surfpool transactions with 2,980 verified signatures. All 65 receipts bind the tested executable and its actual 36 source inputs; identity-backed main bindings add the clean main build without overwriting raw historical maps. Quote-control directly binds its adjacent scratch build report. The older runners' embedded source maps remain baseline checkout snapshots, not compiled serializer input maps. Promotion adds no runtime case or new fixture.

The partial native-route suite remains bounded to one native curve per genuine AMM-signed Pump CPI, fee flag 3, legacy Tokenkeg layouts and an ordinary 166-byte non-holder curve. Its 56 comparisons include 50 Pump CPIs, six caller rejections and only 11 successes. Multi-curve, other endpoint flags, nested/non-native quotes, Token-2022, holder rewards and synthetic completion remain unsupported. The known sell_v2 quote-transfer-fee minimum-output/event mismatch and other partial-path limitations remain unchanged.

`scratch-handoff.tar.gz` preserves every byte of the original 174-file sealed scratch handoff, including failed-preflight diagnostics, source/lock/compiler/dependency records, original receipts and the original seal. `scratch-manifest-sha256.json` is an identical copy of that seal. `receipt-copy-map.json` maps the additional compressed receipt copies reversibly to the original receipt bytes. The aggregate and compressed Surfpool receipts are exposed for status readers. Public dependency archive/source hashes were observed after the scratch build; they are not proof of immutable caches during either build or the historical dependency graph.

`source-snapshot.tar.gz` and `source-sha256.json` bind the 36 actual main compiler inputs. Both finalized program/audit documents are snapshotted separately because they are not compiler inputs. The current source/build helpers, unchanged 94 helper/reference inputs, 28 runtime/fixture files and pinned tool hashes are retained. Generated deployment keypairs are not opened or included.

Run `python repro/pump/bonding-curve-serializer-fortyeight/verify-package.py` from any directory, using its absolute path if needed. It requires `solders` and verifies package/archive/source hashes, all receipt bindings and saved transaction signatures without executing a program. Add `--current-main` to check current source/helper/runtime/documentation files and recompute the complete original/candidate static match. The preserved scratch orchestration scripts retain their original work paths as provenance; they are not standalone replay commands.

The scratch preparation had one preflight failure before any runtime test because an unused aggregate helper changed independently. All successful individual runners were unchanged. Both scratch and main clean compiler attempts succeeded. Historical compiler/dependency/source identity, exhaustive behavior, full byte equality and the security audit remain incomplete. This checkpoint is reconstruction evidence, not a deployable replacement.
''')
manifest={str(p.relative_to(P)):{'sha256':digest(p),'bytes':p.stat().st_size}for p in sorted(P.rglob('*'))if p.is_file()}
write('manifest-sha256.json',manifest)
print(json.dumps({'package':str(P.relative_to(R)),'payload_files':len(manifest),'manifest_sha256':digest(P/'manifest-sha256.json'),'candidate_sha256':digest(P/'candidate.so'),'source_inputs':36,'owned_main_files':read(P/'owned-source-documentation-sha256.json')},indent=2))
