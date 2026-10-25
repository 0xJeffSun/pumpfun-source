#!/usr/bin/env python3
"""Portable main/scratch static and saved-receipt verification. Never build or replay SBF."""
from pathlib import Path,PurePosixPath
import argparse,gzip,hashlib,json,os,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();read=lambda n:json.loads((P/n).read_text())
parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--runtime',action='store_true',help='Recheck saved cryptographic signatures; no VM execution');parser.add_argument('--current-main',action='store_true');parser.add_argument('--repo',type=Path);args=parser.parse_args()
assert not any(f.is_symlink() for f in P.rglob('*'))
manifest=read('manifest-sha256.json');assert {f.relative_to(P).as_posix():H(f.read_bytes()) for f in P.rglob('*') if f.is_file() and f!=P/'manifest-sha256.json'}==manifest,'Package file inventory/hash mismatch'
def archive(name):
 out={}
 with tarfile.open(P/name) as t:
  for m in t:
   n=PurePosixPath(m.name);assert m.isfile() and not n.is_absolute() and '..' not in n.parts and m.name not in out and not n.name.endswith('-keypair.json')
   out[m.name]=t.extractfile(m).read()
 return out
def check_archive(name,mapping):
 d=archive(name);assert {n:H(b) for n,b in d.items()}==mapping,name
 return d
source=read('source-sha256.json');assert len(source)==26
source_bytes=check_archive('source-snapshot.tar.gz',source)
assert source['programs/pump-fees/src/donation.rs']=='a99db3b6156a3009e805ea24ca087d1bea1eb28b90be076dda024f30ac0a14b9'
helper=read('build-helper-sha256.json');assert len(helper)==4;check_archive('build-helper-snapshot.tar.gz',helper)
docs=read('documentation-sha256.json')
for n,h in docs.items():assert H((P/'documentation'/n).read_bytes())==h
assert source_bytes['programs/pump-fees/README.md']==(P/'documentation/programs/pump-fees/README.md').read_bytes()
build=read('build-comparison.json');attempt=read('build-attempt.json');identity=read('main-scratch-identity.json');prov=read('provenance.json')
assert build['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source and attempt['returncode']==0 and attempt['source_unchanged']
assert read('build-result.json')['source_after']==source and read('build-result.json')['source_unchanged']
assert H(gzip.decompress((P/'build.log.gz').read_bytes()))==build['build_log_sha256']==attempt['build_log_sha256']
candidate=(P/'pump_fees_candidate.so').read_bytes();symbols=(P/'symbols.so').read_bytes();digest=H(candidate)
assert digest==prov['candidate_sha256']==build['comparison']['candidate_sha256']==identity['main_binary_sha256']==identity['scratch_binary_sha256']=='fc1088f3e25738267a49aaa2b5189f1ab77c487f1023d45fede11e14e5a086b2'
assert len(candidate)==prov['candidate_bytes']==identity['bytes']==770744 and identity['whole_file_equal'] and identity['whole_symbols_equal']
assert H(symbols)==identity['main_symbols_sha256']==identity['scratch_symbols_sha256']==prov['symbols_sha256']=='0c85263619cd44252e91d412aa82294879740089e2eef3c4feb47ab9f94e8fd1'
assert identity['main_build_report_sha256']==H((P/'build-comparison.json').read_bytes()) and identity['main_source_sha256']==source and not identity['main_runtime_replayed']
sdk=check_archive('sbf-sdk-snapshot.tar.gz',build['sdk_source_sha256']);assert len(sdk)==53
phase=read('tool-phase-provenance.json');assert phase['compile']['requested_tools_version']=='v1.44'
assert phase['compile']['tool_hashes_before']==phase['compile']['tool_hashes_after']=={n:r['sha256'] for n,r in phase['compile']['tool_files'].items()}
assert phase['compile']['unstripped_sha256']==H(symbols) and phase['strip']['candidate_sha256']==digest and phase['strip']['sdk_marker']=='platform-tools-v1.52.md'
assert phase['strip']['file_sha256_before']==phase['strip']['file_sha256_after']=='12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be'
assert b'version=v1.52' in sdk['scripts/install.sh'] and b'platform-tools/llvm/bin/llvm-objcopy --strip-all' in sdk['scripts/strip.sh']
assert {n:H(sdk[n]) for n in phase['phase_source_sha256']}==phase['phase_source_sha256']
pre=check_archive('main-prebuild-snapshot.tar.gz',read('main-prebuild-manifest-sha256.json'))
assert pre['source-snapshot.tar.gz']==(P/'source-snapshot.tar.gz').read_bytes() and json.loads(pre['source-sha256.json'])==source
scratch=archive('scratch-handoff.tar.gz');seal=scratch['manifest-sha256.json'];assert seal==(P/'scratch-manifest-sha256.json').read_bytes()
assert H(seal)==prov['scratch_manifest_sha256']=='ee487e38055c9bccda0df1d587518bbedcc21df826394b09b5e9a2eb37eedf05'
assert H((P/'scratch-handoff.tar.gz').read_bytes())==prov['scratch_handoff_sha256'] and {n:H(b) for n,b in scratch.items() if n!='manifest-sha256.json'}==json.loads(seal)
assert candidate==scratch['pump_fees_candidate.so'] and symbols==scratch['unstripped.so']
ss=json.loads(scratch['source-sha256.json']);assert identity['scratch_source_sha256']==ss and [n for n in source if source[n]!=ss[n]]==['programs/pump-fees/README.md']
assert identity['scratch_build_report_sha256']==H(scratch['build-02/build-comparison.json'])
assert phase['compile']['tool_hashes_before']==json.loads(scratch['tool-phase-provenance.json'])['compile']['tool_hashes_before'] and build['sdk_source_sha256']==json.loads(scratch['build-02/build-comparison.json'])['sdk_source_sha256']
original=scratch['analysis-method/inputs/original.so']
comparison={'original_bytes':len(original),'candidate_bytes':len(candidate),'original_sha256':H(original),'candidate_sha256':digest,'full_byte_equality':original==candidate,'first_difference':next((i for i,(x,y) in enumerate(zip(original,candidate)) if x!=y),None),'different_positions_in_shared_length':sum(x!=y for x,y in zip(original,candidate)),'length_difference':len(candidate)-len(original)}
assert comparison==build['comparison'] and not comparison['full_byte_equality']
for name in ['runtime-inputs.json','harness-source-sha256.json','harness-snapshot.tar.gz','harness-origin-map.json','published-harness-sha256.json','runtime-summary.json','runtime-verification-result.json','runtime-engine.json','source.patch','caller-static-proof.json','fresh-instruction-ledger.json','fresh-data-reference-ledger.json','full-function-inventory.json','inventory-vs-8f.json','retained-static-gate.json','static-gate.json','runtime-retained-diagnostics.json']:
 assert (P/name).read_bytes()==scratch[name],name
for f in (P/'validation-layer').rglob('*'):
 if f.is_file():assert f.read_bytes()==scratch[f.relative_to(P).as_posix()]
origins=read('harness-origin-map.json');recorded=read('harness-source-sha256.json');canonical=read('published-harness-sha256.json');focused_harness=read('published-focused-harness-sha256.json')
assert len(origins)==len(recorded)==46 and len(canonical)==44 and len(focused_harness)==4
assert {r['recorded_path']:r['sha256'] for r in origins}==recorded and {r['published_path']:r['sha256'] for r in origins}==canonical
expected_aliases={'work/fees-update-admin-dataflow/signed_transfers.py':'repro/pump_fees/fee-config-serialization-v144/signed_transfers.py','work/fees-config-serialization/serialization_error.py':'repro/pump_fees/fee-config-serialization-v144/serialization_error.py'}
assert {r['recorded_path']:r['published_path'] for r in origins if r['recorded_path']!=r['published_path']}==expected_aliases
prefix='repro/pump_fees/donation-business-v144/'
assert focused_harness=={prefix+'validation-layer/harness/'+f.name:H(f.read_bytes()) for f in (P/'validation-layer/harness').glob('*.py')}
old_bindings={r['name']:r for r in json.loads(scratch['receipt-build-bindings.json'])};rows=read('receipt-build-bindings.json');assert len(rows)==10
for r in rows:
 for k,v in old_bindings[r['name']].items():assert r[k]==v
 assert (P/r['saved_report']).read_bytes()==scratch[r['saved_report']]
 assert r['main_candidate_sha256']==digest and r['main_source_sha256']==source and r['main_build_report_sha256']==H((P/'build-comparison.json').read_bytes()) and r['main_symbols_sha256']==H(symbols)
focused=read('focused-main-bindings.json');raw=gzip.decompress((P/'focused20.json.gz').read_bytes());assert raw==scratch['runtime-focused/focused20.json']
assert H(raw)==focused['raw_report_sha256'] and H((P/'focused20.json.gz').read_bytes())==focused['report_sha256']
assert focused['executed_candidate_sha256']==focused['main_candidate_sha256']==digest and focused['executed_source_sha256']==ss and focused['main_source_sha256']==source
assert focused['executed_build_record_sha256']==H(scratch['validation-layer/build02-bindings.json']) and focused['main_build_report_sha256']==H((P/'build-comparison.json').read_bytes()) and focused['main_symbols_sha256']==H(symbols)
assert (focused['case_count'],focused['transaction_count'],focused['signature_count'],focused['repeated_inputs'],focused['new_typed_input_combinations'])==(20,40,80,8,12) and not focused['main_runtime_replayed']
for index in [80,81]:assert (P/f'transactions/admin-success-{index}.json').read_bytes()==scratch[f'runtime/repro/pump_fees/initializer-history/transactions/admin-success-{index}.json']
status=read('status-proposal.json');assert len(status['validation_reports'])==10 and status['validated_cases']==status['total_comparison_receipts']==17461
assert sum(json.loads(gzip.decompress((P/Path(n).name).read_bytes()))['case_count'] for n in status['validation_reports'])==17461
assert status['signed_sequence_reports']==[prefix+'donation-sequence.json.gz'] and status['candidate_artifact']==prefix+'pump_fees_candidate.so'
assert prov['total_comparison_receipts']==17461 and prov['scratch_build_attempts']==2 and prov['main_build_attempts']==1 and not prov['main_runtime_replayed']
with tempfile.TemporaryDirectory(prefix='fees-donation-main-saved-') as temp:
 T=Path(temp)
 for n,b in scratch.items():
  f=T/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b)
 command=[sys.executable,'-B',str(T/'verify.py')]+(['--runtime'] if args.runtime else [])
 checked=subprocess.run(command,cwd=T,text=True,capture_output=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'});assert checked.returncode==0,(checked.stdout,checked.stderr)
 result=json.loads(checked.stdout);assert result['baseline_comparisons']==17441 and result['focused_cases']==20 and result['saved_diagnostic_rows']==11
 assert result['saved_signature_verifier_rerun']==args.runtime
current_counts=None
if args.current_main:
 if args.repo:root=args.repo.resolve()
 else:
  roots=[r for r in P.parents if (r/'repro/status.json').is_file() and (r/'Cargo.toml').is_file()];assert roots,'Pass --repo to identify current checkout';root=roots[0]
 tracked=set(subprocess.check_output(['git','-C',str(root),'ls-files','-z']).decode().split('\0'))
 groups={'source':source,'build_helpers':helper,'documentation':docs,'baseline_harness':canonical,'focused_harness':focused_harness,'runtime':read('runtime-inputs.json'),'candidate':{prefix+'pump_fees_candidate.so':digest}}
 assert len(groups['runtime'])==18
 for group,mapping in groups.items():
  for name,expected in mapping.items():
   assert not name.startswith('work/') and name in tracked,('Untracked/unpublished current input',group,name)
   f=root/name;assert not f.is_symlink() and H(f.read_bytes())==expected,('Current bytes differ',group,name)
 current_counts={n:len(m) for n,m in groups.items()}
print(json.dumps({'verified':True,'sealed_payloads':len(manifest),'candidate_sha256':digest,'candidate_bytes':len(candidate),'main_scratch_whole_elf_equal':True,'main_scratch_whole_symbols_equal':True,'source_inputs':26,'baseline_comparisons':17441,'focused_comparisons':20,'total_comparisons':17461,'focused_repeated_inputs':8,'focused_new_typed_combinations':12,'focused_transactions':40,'focused_signatures':80,'donation_sequence_steps_separate':10,'saved_diagnostic_rows':11,'bounded_handlers':31,'main_runtime_replayed':False,'full_original_equality':False,'saved_signature_verifier_rerun':args.runtime,'current_main_bindings_checked':args.current_main,'current_tracked_groups':current_counts},indent=2))
