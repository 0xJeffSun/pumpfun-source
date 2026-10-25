#!/usr/bin/env python3
"""Assemble existing evidence only. Never open deployment keypair outputs."""
from pathlib import Path
import copy,difflib,gzip,hashlib,io,json,shutil,tarfile
R=Path(__file__).resolve().parents[2];W=R/'work/fees-social-v2-box-recovery';A=Path(__file__).resolve().parent;P=R/'repro/pump_fees/social-v2-account-layout-v144';V=W/'runtime-main-01'
sha=lambda b:hashlib.sha256(b).hexdigest();read=lambda p:json.loads(p.read_text());digest=lambda p:sha(p.read_bytes())
def safe(n):
 p=Path(n);assert not p.is_absolute()and'..'not in p.parts and not p.name.endswith('-keypair.json'),n
 return p
def cp(src,name):
 safe(name);assert not src.name.endswith('-keypair.json')and not src.is_symlink();dst=P/name;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dst)
def js(name,value):
 path=P/name;path.parent.mkdir(parents=True,exist_ok=True);path.write_text(json.dumps(value,indent=2)+'\n')
def arc(name,entries):
 with (P/name).open('wb')as f,gzip.GzipFile(fileobj=f,mode='wb',mtime=0)as gz,tarfile.open(fileobj=gz,mode='w|')as tar:
  for member,src in sorted(entries.items()):
   safe(member);assert not src.is_symlink();value=src.read_bytes();info=tarfile.TarInfo(member);info.size=len(value);info.mode=0o644;tar.addfile(info,io.BytesIO(value))
assert {p.name for p in P.iterdir()}=={'README.md'}
cp(P/'README.md','diagnostics/placeholder-README.md')
main=read(W/'main-build-01/build-comparison.json');summary=read(V/'summary.json');inputs=main['source_sha256'];assert len(inputs)==22
assert inputs==read(V/'source-sha256.json')
for path,h in inputs.items():assert digest(R/path)==h,path
harness=read(V/'harness-source-sha256.json');runtime=read(V/'runtime-inputs.json');assert len(harness)==46 and len(runtime)==18
for path,h in {**harness,**runtime}.items():assert digest(R/path)==h,path
assert len(summary['reports'])==10 and summary['comparison_receipts']==17441 and summary['donation_sequence_steps']==10 and not summary['mismatches']
for label,folder,prefix in [('trial1','build-01','work/fees-social-v2-box-recovery/source/'),('trial2','build-02','work/fees-social-v2-box-recovery/source-v2/'),('main','main-build-01','')]:
 report=read(W/folder/'build-comparison.json');attempt=read(W/folder/'build-attempt.json');assert attempt['returncode']==0 and attempt['source_unchanged']and attempt['source_sha256']==attempt['source_after_sha256']==report['source_sha256']
 for path,h in report['source_sha256'].items():assert digest(R/path)==h,path
 base=''if label=='main'else'trials/'+label+'/'
 for file in ['build-attempt.json','build-comparison.json']:cp(W/folder/file,base+file)
 (P/base/'build.log.gz').write_bytes(gzip.compress((W/folder/'build.log').read_bytes(),mtime=0));assert sha((W/folder/'build.log').read_bytes())==report['build_log_sha256']
 cp(W/folder/'artifacts/pump_fees_candidate.so',base+'pump_fees_candidate.so');cp(W/folder/'target/sbf-solana-solana/release/pump_fees_candidate.so',base+'symbol-source.so')
 canonical={path.removeprefix(prefix):h for path,h in report['source_sha256'].items()};assert len(canonical)==22
 js(base+'source-sha256.json',canonical);arc(base+'source-snapshot.tar.gz',{path.removeprefix(prefix):R/path for path in report['source_sha256']})
assert (P/'pump_fees_candidate.so').read_bytes()==(P/'trials/trial2/pump_fees_candidate.so').read_bytes()
assert digest(P/'pump_fees_candidate.so')==summary['candidate_sha256']=='c181b0ba75aee67369385e04908d89088552c1fad756bf5a21d7fb21979e6a58'
second=read(P/'trials/trial2/source-sha256.json');assert {p for p in inputs if inputs[p]!=second[p]}=={'programs/pump-fees/README.md'}
for name in ['trial-plan.json','trial-plan-v2.json','source-change.patch','social-v2-box-hypothesis.json','social-v2-exit-candidate.asm','social-v2-exit-original.asm','strict-verification-failure.txt','exit-hypothesis-diagnostic.json','exit-comparison-v2.json','verify_exit.py','verify_exit_v2.py']:
 cp(W/name,'trials/'+name)
for before,after,name in [(W/'source/programs/pump-fees/src/social.rs',W/'source-v2/programs/pump-fees/src/social.rs','trial2-source-change.patch')]:
 (P/'trials'/name).write_text(''.join(difflib.unified_diff(before.read_text().splitlines(True),after.read_text().splitlines(True),fromfile='trial1/programs/pump-fees/src/social.rs',tofile='trial2/programs/pump-fees/src/social.rs')))
static=[]
for folder,sealname,expected in [('fees-social-v2-context-layout','manifest.json','9a85ed8b120b78daebe2acd5530289484cefa375518c0ea4a72a492f40d5dbfd'),('fees-mayhem-function-inventory','manifest-sha256.json','d7257e411a0344f41499d71bf37782f5845e60a0d81014a0fb1c76615b885abe')]:
 path=R/'work'/folder;assert digest(path/sealname)==expected;seal=read(path/sealname);files=seal.get('files',seal)
 for name,h in files.items():safe(name);assert digest(path/name)==h,name
 (P/'static').mkdir(exist_ok=True);cp(path/sealname,'static/'+folder+'-'+sealname);arc('static/'+folder+'.tar.gz',{name:path/name for name in [*files,sealname]});static.append({'name':folder,'archive':'static/'+folder+'.tar.gz','archive_sha256':digest(P/'static'/f'{folder}.tar.gz'),'manifest':'static/'+folder+'-'+sealname,'manifest_name':sealname,'manifest_sha256':expected,'payload_files':len(files)})
js('static-package-bindings.json',static);cp(R/'work/fees-mayhem-function-inventory/inputs/elf_reader.py','elf_reader.py')
for file in ['source-sha256.json','harness-source-sha256.json','runtime-inputs.json','harness-snapshot.tar.gz','summary.json','progress.json']:cp(V/file,'runtime-records/'+file)
cp(V/'harness-snapshot.tar.gz','harness-snapshot.tar.gz');cp(V/'harness-source-sha256.json','harness-source-sha256.json');cp(V/'runtime-inputs.json','runtime-inputs.json')
for path in runtime:cp(R/path,'runtime/'+path)
cp(W/'run-regressions.py','run-regressions.py');js('orchestration-sha256.json',{str((W/'run-regressions.py').relative_to(R)):digest(W/'run-regressions.py')})
receipts=[]
for row in summary['reports']:
 assert row['returncode']==0 and not row['mismatches']and row['actual_source_sha256']==inputs and row['build_report_sha256']==digest(P/'build-comparison.json')
 source=R/row['report'];assert digest(source)==row['report_sha256'];name=row['name']+'.json.gz';(P/name).write_bytes(gzip.compress(source.read_bytes(),mtime=0));cp(V/(row['name']+'.log'),'runtime-logs/'+row['name']+'.log')
 receipts.append({'name':row['name'],'source_report':row['report'],'raw_report_sha256':row['report_sha256'],'published_report':name,'published_report_sha256':digest(P/name),'executed_candidate_sha256':row['executed_candidate_sha256'],'actual_source_sha256':inputs,'build_report_sha256':row['build_report_sha256'],'case_count':row['case_count'],'expected_cases':row['expected_cases']})
js('receipt-build-bindings.json',receipts)
for name in ['verify_static.py','verify_saved_runtime.py','verify-package.py','runtime-assertion-provenance.json','assemble.py']:cp(A/name,name)
cp(R/'repro/pump_fees/fee-config-serialization-v144/verify_publication.py','reference/verify_publication.py')
for name in ['build_partial_candidate.py','build_source_manifest.py','compare.py']:cp(R/'scripts'/name,'build-helper-snapshot/scripts/'+name)
js('build-helper-sha256.json',{f'scripts/{name}':digest(R/'scripts'/name)for name in ['build_partial_candidate.py','build_source_manifest.py','compare.py']})
identity={'whole_file_equal':True,'main_binary_sha256':digest(P/'pump_fees_candidate.so'),'scratch_binary_sha256':digest(P/'trials/trial2/pump_fees_candidate.so'),'bytes':770624,'main_build_report_sha256':digest(P/'build-comparison.json'),'scratch_build_report_sha256':digest(P/'trials/trial2/build-comparison.json'),'main_source_inputs':22,'scratch_source_inputs':22,'source_difference_after_path_mapping':['programs/pump-fees/README.md'],'runtime_receipts_inherited':False,'scope':'The fresh runtime corpus executed this clean main candidate. Main and accepted scratch binaries are identical; runtime results are not carried over from a previous checkpoint.','full_original_byte_equality':False};js('main-scratch-identity.json',identity)
audit='audit/pump_fees/SOCIAL_V2_LAYOUT_RECOVERY.md';cp(R/audit,'documentation/SOCIAL_V2_LAYOUT_RECOVERY.md');js('documentation-sha256.json',{audit:digest(R/audit)})
prior=R/'repro/pump_fees/readme-provenance-v144';js('prior-checkpoint.json',{'path':str(prior.relative_to(R)),'source_manifest_sha256':digest(prior/'source-sha256.json'),'candidate_sha256':'a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa','runtime_receipts_inherited':False})
status=copy.deepcopy(read(R/'repro/status.json')['pump_fees']);prefix=str(P.relative_to(R));old='repro/pump_fees/fee-config-serialization-v144/'
status.update({'candidate_artifact':prefix+'/pump_fees_candidate.so','candidate_sha256':identity['main_binary_sha256'],'comparison_report':prefix+'/build-comparison.json','build_log':prefix+'/build.log.gz','workspace_source_manifest':prefix+'/source-sha256.json','main_scratch_identity_evidence':prefix+'/main-scratch-identity.json','validation_reports':[prefix+'/'+row['published_report']for row in receipts if row['expected_cases']is not None],'signed_sequence_reports':[prefix+'/donation-sequence.json.gz'],'authentic_historical_replays':[{'report':prefix+'/initializer-history.json.gz','transactions':prefix+'/runtime/repro/pump_fees/initializer-history/transactions'}],'social_v2_layout_recovery_report':audit,'social_v2_layout_evidence':prefix+'/trials/exit-comparison-v2.json','social_v2_layout_package':prefix+'/README.md','receipt_build_bindings_report':prefix+'/receipt-build-bindings.json','prior_checkpoint':'repro/pump_fees/readme-provenance-v144','current_runtime_receipts_inherited':False})
for key in ['compared_value_assertions','authority_log_assertions','repeated_transfer_receipts','serialization_error_assertions']:status[key]['report']=status[key]['report'].replace(old,prefix+'/')
status['coverage_limitations'].append('Social claim v2 complete 560-byte exit, seven direct-call targets and three bounded literals now match after boxing the mint and retaining by-value event-CPI fields. Complete parser/transitive data closure and historical whole-ELF identity remain unproven.')
js('status-pump_fees-proposal.json',status)
(P/'README.md').write_text('''# Fees social claim v2 context layout

This checkpoint retains all 31 instruction bodies and changes only the recovered in-memory `ClaimSocialFeePdaV2` account context. The quote mint is boxed; event authority and program fields are by-value `AccountInfo` with their previous constraints. Persistent account layouts are unchanged. Full original-byte equality and the security audit remain incomplete.

The clean main v1.44 executable is 770,624 bytes, SHA-256 `c181b0ba75aee67369385e04908d89088552c1fad756bf5a21d7fb21979e6a58`. It is byte-for-byte identical to the accepted second scratch trial. Both snapshots bind 22 inputs; main differs from trial two only in its bound program README. Locks, profiles, compiler version and flags remain unchanged.

The complete original exit at 405560–406120 and candidate exit at 209184 are 560 bytes and match after strict relocation/internal-call normalization. All seven direct-call sites reach complete matching target bodies (six unique targets); three consumed literals of 32, 14 and 10 bytes match exactly. The first boxing-only trial failed one normalized context-offset instruction at byte 88. Its successful compiler build, source, executable, failed strict comparison and diagnostics are retained. The second trial followed separately sealed original-parser evidence for the two by-value fields. No executable patch or padding was used. Complete parser equivalence and transitive data/source identity remain unproven.

All current runtime evidence was freshly executed against this main candidate: 17,331 comparisons across the unchanged 18-suite aggregate plus 110 comparisons in eight focused reports, totaling 17,441 receipts. Of these, 69 repeat existing inputs with stronger assertions. The separate donation sequence has ten steps. There are no new handlers or unique fixture cases, and these receipts are not inherited from the previous checkpoint. Prior Surfpool validation remains bound to its separate executable.

`verify_saved_runtime.py` contains the exact unchanged runtime assertion body from `reference/verify_publication.py`; only its file-resolution prelude selects this package and its copied runtime inputs. It retains genuine historical signed-message identity, signature/freshness controls, compared-value and authority logs, codec logs, donation steps, signed-transfer assertions and serialization-error rollback. It additionally verifies every retained `transaction_base64` field. This does not claim that every comparison saved an encoded transaction. Historical initializer replays preserve the original message and signature and adapt only stale-blockhash freshness; they do not reproduce the complete historical bank.

`source-snapshot.tar.gz`, both trial snapshots, build reports/logs, actual 46-file harness snapshot, separately retained orchestrator, 18 runtime inputs, fresh receipts and their build bindings are retained. Counting the orchestrator separately yields 47 helper/orchestration provenance files. The two sealed static packages are preserved in full under `static/`. `main-scratch-identity.json` binds the clean main and accepted scratch files; every runtime binding points directly to the actual main build. Generated deployment keypairs were not opened or packaged; no build target tree was archived.

The program README is one of the 22 bound inputs. It retains an older opening “current checkpoint” pointer alongside its appended social-v2 section. That stale wording is recorded here without changing the source after its clean build. The original working placeholder README is retained under `diagnostics/`.

Run `python repro/pump_fees/social-v2-account-layout-v144/verify-package.py` with `solders` available, using an absolute script path from another directory. It checks saved hashes, source/test/static archives, both trial identities, the complete current static match, all existing runtime assertions and retained signatures without building or executing the program. Add `--current-main` to verify the current source, helper, runtime and audit files. Preserved historical build/orchestration scripts retain their original work paths as provenance.

This is bounded source-reconstruction evidence, not a deployable replacement or proof of exhaustive behavior, historical compiler/dependency identity, full binary equality or security completeness.
''')
manifest={str(p.relative_to(P)):{'sha256':digest(p),'bytes':p.stat().st_size}for p in sorted(P.rglob('*'))if p.is_file()}
js('manifest-sha256.json',manifest)
print(json.dumps({'package':str(P.relative_to(R)),'payload_files':len(manifest),'manifest_sha256':digest(P/'manifest-sha256.json'),'candidate_sha256':identity['main_binary_sha256'],'audit_sha256':digest(R/audit)},indent=2))
