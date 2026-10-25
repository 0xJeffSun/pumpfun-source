#!/usr/bin/env python3
"""Verify main/scratch bytes and saved evidence; no build, VM, network or transaction."""
from pathlib import Path, PurePosixPath
import argparse, gzip, hashlib, json, os, subprocess, sys, tarfile, tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent; H=lambda b:hashlib.sha256(b).hexdigest()
def raw(n):
 path=PurePosixPath(n);assert not path.is_absolute() and '..' not in path.parts and not path.name.endswith('-keypair.json')
 f=P/path;assert not f.is_symlink();return f.read_bytes()
def read(n):return json.loads(raw(n))
def archive(n,expected=None):
 data={}
 with tarfile.open(P/n) as t:
  for m in t:
   name=PurePosixPath(m.name);assert m.isfile() and not name.is_absolute() and '..' not in name.parts and not name.name.endswith('-keypair.json') and m.name not in data
   data[m.name]=t.extractfile(m).read()
 if expected is not None:assert {n:H(b) for n,b in data.items()}==expected,n
 return data
def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--runtime',action='store_true',help='Compatibility flag; saved signatures are always verified. No VM execution.');ap.add_argument('--current-main',action='store_true');ap.add_argument('--repo',type=Path);a=ap.parse_args()
 files=[]
 for f in P.rglob('*'):
  assert not f.is_symlink()
  if f.is_file() and f!=P/'manifest-sha256.json':
   assert not f.name.endswith('-keypair.json');files.append(f.relative_to(P).as_posix())
 manifest=read('manifest-sha256.json');assert set(files)==set(manifest),'Package inventory mismatch'
 assert {n:H(raw(n)) for n in files}==manifest,'Package payload hash mismatch'
 source=read('source-sha256.json');assert len(source)==26
 src=archive('source-snapshot.tar.gz',source);helper=read('build-helper-sha256.json');assert len(helper)==4;archive('build-helper-snapshot.tar.gz',helper)
 docs=read('documentation-sha256.json');assert docs=={'programs/pump-fees/README.md':source['programs/pump-fees/README.md']}
 for n,h in docs.items():assert H(raw('documentation/'+n))==h and raw('documentation/'+n)==src[n]
 assert source['programs/pump-fees/src/donation.rs']=='540a659ea7d2867db556b2dc95a2b085fb99e4d34d59fc211488c33910d2d40b'
 build=read('build-comparison.json');attempt=read('build-attempt.json');identity=read('main-scratch-identity.json');prov=read('provenance.json')
 assert build['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source and attempt['returncode']==0 and attempt['source_unchanged']
 assert read('build-result.json')=={'returncode':0,'source_after':source,'source_unchanged':True}
 assert H(gzip.decompress(raw('build.log.gz')))==build['build_log_sha256']==attempt['build_log_sha256']
 C=raw('pump_fees_candidate.so');S=raw('symbols.so');digest=H(C)
 assert digest==prov['candidate_sha256']==identity['main_binary_sha256']==identity['scratch_binary_sha256']=='5cf8d567934188d1307d2f9f3d2220ede52f6978e389064b08897441fbdd7d49'
 assert len(C)==identity['bytes']==prov['candidate_bytes']==770016 and identity['whole_file_equal'] and identity['whole_symbols_equal']
 assert H(S)==prov['symbols_sha256']==identity['main_symbols_sha256']==identity['scratch_symbols_sha256']=='99ac87e9b79e86e23d7458400475d5d967545e345767d0263d544bfd02660a07'
 assert identity['main_source_sha256']==source and identity['main_build_report_sha256']==H(raw('build-comparison.json')) and not identity['main_runtime_replayed']
 phase=read('tool-phase-provenance.json');tools=read('tools-before.json');sdk=archive('sbf-sdk-snapshot.tar.gz',build['sdk_source_sha256']);assert len(sdk)==53
 assert phase['compile']['requested_tools_version']=='v1.44' and phase['compile']['unstripped_sha256']==H(S)
 assert phase['compile']['tool_hashes_before']==phase['compile']['tool_hashes_after']=={n:v['sha256'] for n,v in tools['compile_tools'].items()}=={n:v['sha256'] for n,v in phase['compile']['tool_files'].items()}
 assert H(raw('cargo-rustc-info.json'))==phase['compile']['cargo_rustc_info_sha256']
 roots={line for v in read('cargo-rustc-info.json')['outputs'].values() for line in v.get('stdout','').splitlines() if line.startswith('/') and line.endswith('/rust')};assert roots=={phase['compile']['observed_sysroot']}
 assert phase['strip']['file_sha256_before']==phase['strip']['file_sha256_after']==tools['strip_tool']['sha256']=='12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be'
 assert phase['strip']['sdk_marker']=='platform-tools-v1.52.md' and phase['strip']['candidate_sha256']==digest and phase['cli']==tools['cli']
 assert phase['helper_files']==helper and phase['sdk_template_files']==build['sdk_source_sha256']==tools['sdk_template_files']
 pre=archive('main-prebuild-snapshot.tar.gz',read('main-prebuild-manifest-sha256.json'))
 assert pre['source-snapshot.tar.gz']==raw('source-snapshot.tar.gz') and json.loads(pre['source-sha256.json'])==source
 for n in ['build_once.py','build-launch.json','main-promotion.patch','tools-before.json','build-helper-sha256.json']:assert pre[n]==raw(n)
 assert pre['build-orchestration.log']==b'' and H(pre['build-orchestration.log'])==read('prebuild-preservation.json')['empty_initial_orchestration_log_sha256']
 assert read('build-launch.json')['runner_sha256']==H(raw('build_once.py'))
 scratch=archive('scratch-handoff.tar.gz');seal=scratch['manifest-sha256.json'];assert seal==raw('scratch-manifest-sha256.json')
 assert H(seal)==prov['scratch_manifest_sha256']=='3f6b1a631beb97ded199fa82dae1b25718da5cce9a553defb6002a79b1bcd6c5'
 assert {n:H(b) for n,b in scratch.items() if n!='manifest-sha256.json'}==json.loads(seal) and H(raw('scratch-handoff.tar.gz'))==prov['scratch_handoff_sha256']
 assert C==scratch['candidate.so'] and S==scratch['symbols.so']
 ss=json.loads(scratch['source-sha256.json']);assert ss==identity['scratch_source_sha256'] and [n for n in source if source[n]!=ss[n]]==['programs/pump-fees/README.md']
 assert identity['scratch_build_report_sha256']==H(scratch['build-01/build-comparison.json'])
 st=json.loads(scratch['tool-phase-provenance.json']);assert {n:r['sha256'] for n,r in st['compile']['tool_files'].items()}==phase['compile']['tool_hashes_after'] and st['strip']['sha256']==phase['strip']['file_sha256_after']
 O=scratch['analysis-method/inputs/original.so']
 comparison={'original_bytes':len(O),'candidate_bytes':len(C),'original_sha256':H(O),'candidate_sha256':H(C),'full_byte_equality':O==C,'first_difference':next((i for i,(x,y) in enumerate(zip(O,C)) if x!=y),None),'different_positions_in_shared_length':sum(x!=y for x,y in zip(O,C)),'length_difference':len(C)-len(O)}
 assert comparison==build['comparison'] and not comparison['full_byte_equality']
 copied=['caller-static-proof.json','fresh-instruction-ledger.json','fresh-data-reference-ledger.json','full-function-inventory.json','inventory-vs-fc1088.json','retained-static-gate.json','complete-data-comparison.json','static-gate.json','source.patch','harness-source-sha256.json','harness-snapshot.tar.gz','published-harness-sha256.json','runtime-inputs.json','runtime-summary.json','runtime-verification-result.json','runtime-engine.json','runtime-retained-diagnostics.json','evidence-collection-notes.json']
 for n in copied:assert raw(n)==scratch[n],n
 recorded=read('harness-source-sha256.json');canonical=read('published-harness-sha256.json');origins=read('harness-origin-map.json')
 assert len(recorded)==len(origins)==46 and len(canonical)==44 and {r['recorded_path']:r['sha256'] for r in origins}==recorded and {r['published_path']:r['sha256'] for r in origins}==canonical
 assert {r['recorded_path']:r['published_path'] for r in origins if r['recorded_path']!=r['published_path']}=={'work/fees-update-admin-dataflow/signed_transfers.py':'repro/pump_fees/fee-config-serialization-v144/signed_transfers.py','work/fees-config-serialization/serialization_error.py':'repro/pump_fees/fee-config-serialization-v144/serialization_error.py'}
 oldrows={r['name']:r for r in json.loads(scratch['receipt-build-bindings.json'])};rows=read('receipt-build-bindings.json');assert len(rows)==10
 for r in rows:
  for k,v in oldrows[r['name']].items():assert r[k]==v
  assert raw(r['saved_report'])==scratch[r['saved_report']] and r['main_candidate_sha256']==digest and r['main_symbols_sha256']==H(S) and r['main_source_sha256']==source and r['main_build_report_sha256']==H(raw('build-comparison.json'))
 focus=read('focused-main-bindings.json');assert gzip.decompress(raw('focused20.json.gz'))==scratch['runtime-focused/focused20.json']
 assert focus['raw_report_sha256']==H(scratch['runtime-focused/focused20.json']) and focus['report_sha256']==H(raw('focused20.json.gz'))
 assert focus['executed_source_sha256']==ss and focus['main_source_sha256']==source and focus['executed_candidate_sha256']==focus['main_candidate_sha256']==digest
 assert focus['executed_symbols_sha256']==focus['main_symbols_sha256']==H(S) and focus['main_build_report_sha256']==H(raw('build-comparison.json')) and not focus['main_runtime_replayed'] and not focus['numeric_focused_exit_code_separately_saved']
 changed=[]
 for f in (P/'validation-layer').rglob('*'):
  if f.is_file():
   n=f.relative_to(P).as_posix()
   if raw(n)!=scratch[n]:changed.append(n)
 assert set(changed)=={'validation-layer/corrected-source-sha256.json','validation-layer/current-build-binding.json'}
 assert read('validation-layer/corrected-source-sha256.json')==source
 future=read('validation-layer/current-build-binding.json');assert future['source_sha256']==future['actual_source_sha256']==source and future['candidate_sha256']==digest and future['symbols_sha256']==H(S) and future['build_comparison_sha256']==H(raw('build-comparison.json')) and future['build_attempt_sha256']==H(raw('build-attempt.json')) and future['tool_phase_sha256']==H(raw('tool-phase-provenance.json'))
 adaptation=read('focused-publication-adaptation.json');assert set(adaptation['changed_files'])==set(changed)
 for name,key in [('corrected-source-sha256.json','source_map'),('current-build-binding.json','build_binding')]:
  assert adaptation['before_'+key+'_sha256']==H(scratch['validation-layer/'+name]) and adaptation['after_'+key+'_sha256']==H(raw('validation-layer/'+name))
 prefix='repro/pump_fees/donation-borrow-v144/'
 focused_harness=read('published-focused-harness-sha256.json');assert focused_harness=={prefix+'validation-layer/harness/'+f.name:H(f.read_bytes()) for f in (P/'validation-layer/harness').glob('*.py')}
 inputs=read('published-focused-inputs-sha256.json');assert inputs=={prefix+n:H(raw(n)) for n in ['validation-layer/cases.json','validation-layer/corrected-source-sha256.json','validation-layer/current-build-binding.json']}
 for index in [80,81]:assert raw(f'transactions/admin-success-{index}.json')==scratch[f'runtime/repro/pump_fees/initializer-history/transactions/admin-success-{index}.json']
 status=read('status-proposal.json');assert status['candidate_artifact']==prefix+'pump_fees_candidate.so' and status['candidate_sha256']==digest and status['validated_cases']==status['total_comparison_receipts']==17461
 assert len(status['implemented_handlers'])==31 and len(status['validation_reports'])==10 and sum(json.loads(gzip.decompress(raw(Path(n).name)))['case_count'] for n in status['validation_reports'])==17461
 assert status['signed_sequence_reports']==[prefix+'donation-sequence.json.gz'] and prov['new_unique_cases']==0
 with tempfile.TemporaryDirectory(prefix='fees-borrow-main-saved-') as temp:
  tmp=Path(temp)
  for n,b in scratch.items():
   f=tmp/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b)
  p=subprocess.run([sys.executable,'-B',str(tmp/'verify.py')],cwd='/',capture_output=True,text=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'})
  assert p.returncode==0,(p.stdout,p.stderr);result=json.loads(p.stdout)
  assert result['baseline_comparisons']==17441 and result['focused_comparisons']==20 and result['saved_diagnostic_rows']==11 and result['verified_signatures_in_saved_fields']==17284
 groups=None
 if a.current_main:
  if a.repo:root=a.repo.resolve()
  else:
   roots=[p for p in P.parents if (p/'repro/status.json').is_file() and (p/'Cargo.toml').is_file()];assert roots,'Pass --repo';root=roots[0]
  tracked=set(subprocess.check_output(['git','-C',str(root),'ls-files','-z']).decode().split('\0'))
  groups={'source':source,'build_helpers':helper,'documentation':docs,'baseline_harness':canonical,'focused_harness':focused_harness,'focused_inputs':inputs,'runtime':read('runtime-inputs.json'),'candidate':{prefix+'pump_fees_candidate.so':digest,prefix+'symbols.so':H(S)}}
  for group,mapping in groups.items():
   for n,h in mapping.items():
    path=PurePosixPath(n);assert not path.is_absolute() and '..' not in path.parts and not path.name.endswith('-keypair.json') and not n.startswith('work/') and n in tracked,('Untracked current input',group,n)
    f=root/n;assert not f.is_symlink() and H(f.read_bytes())==h,('Current input mismatch',group,n)
 print(json.dumps({'verified':True,'sealed_payloads':len(manifest),'candidate_sha256':digest,'candidate_bytes':len(C),'source_inputs':26,'whole_main_scratch_elf_equal':True,'whole_main_scratch_symbols_equal':True,'baseline_comparisons':17441,'focused_comparisons':20,'total_comparisons':17461,'new_unique_cases':0,'donation_sequence_steps_separate':10,'saved_diagnostic_rows':11,'verified_signatures_in_saved_fields':17284,'separately_verified_historical_transactions':2,'bounded_handlers':31,'main_runtime_replayed':False,'full_original_equality':False,'current_main_bindings_checked':a.current_main,'tracked_groups':{n:len(m) for n,m in groups.items()} if groups else None},indent=2))
if __name__=='__main__':main()
