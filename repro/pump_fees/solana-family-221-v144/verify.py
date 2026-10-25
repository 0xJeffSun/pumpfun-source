#!/usr/bin/env python3
"""Verify portable publication and optional current-main bindings, without replay."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,io,json,os,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
ap=argparse.ArgumentParser();ap.add_argument('--current-main',action='store_true');args=ap.parse_args()
H=lambda b:hashlib.sha256(b).hexdigest();read=lambda n:json.loads((P/n).read_text())
def archive_bytes(data):
 with tarfile.open(fileobj=io.BytesIO(data),mode='r:*')as t:
  members=t.getmembers();assert all(m.isfile()and not m.name.startswith('/')and'..'not in Path(m.name).parts and not m.name.endswith('-keypair.json')for m in members)
  assert len({m.name for m in members})==len(members)
  return {m.name:t.extractfile(m).read()for m in members}
def archive(n):return archive_bytes((P/n).read_bytes())
def check_seal(files,digest):
 manifest=files['manifest-sha256.json'];assert H(manifest)==digest
 assert {n:H(b)for n,b in files.items()if n!='manifest-sha256.json'}==json.loads(manifest)
def materialize(files,dest):
 dest.mkdir()
 for name,data in files.items():
  p=dest/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
def run(cmd):
 result=subprocess.run(cmd,capture_output=True,text=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'})
 assert result.returncode==0,(result.stdout,result.stderr)
 return json.loads(result.stdout)
seal=read('manifest-sha256.json')
assert {str(p.relative_to(P)):H(p.read_bytes())for p in P.rglob('*')if p.is_file()and p!=P/'manifest-sha256.json'and'__pycache__'not in p.parts}==seal
prov=read('provenance.json');candidate=(P/'pump_fees_candidate.so').read_bytes();assert len(candidate)==768072 and H(candidate)==prov['candidate_sha256']
assert not prov['full_byte_equality']and prov['new_unique_cases']==prov['new_handlers']==0
assert not prov['main_runtime_replayed']and prov['receipts_carried_by_exact_whole_file_identity']
source=archive('source-snapshot.tar.gz');hashes=read('source-sha256.json');assert len(source)==22 and {n:H(b)for n,b in source.items()}==hashes
assert hashes['Cargo.lock']=='c198e9ce0aac25cf7b7ec20402b79739c8e670a40d2c8ae3a25bb7c0ad2cab3e'
assert hashes['programs/pump-fees/src/social.rs']==prov['social_source_sha256']=='75a20eaaca6067b253f722f9d98d18dca4c91358677fe08221d931352c0bf02b'
build,attempt=read('build-comparison.json'),read('build-attempt.json')
assert build['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==hashes
assert attempt['returncode']==0 and attempt['source_unchanged']
assert H(gzip.decompress((P/'build.log.gz').read_bytes()))==build['build_log_sha256']
assert build['comparison']['candidate_sha256']==H(candidate)and build['comparison']['full_byte_equality']is False
helpers=archive('build-helper-snapshot.tar.gz');assert len(helpers)==4 and {n:H(b)for n,b in helpers.items()}==read('build-helper-sha256.json')
for n,h in read('documentation-sha256.json').items():assert H((P/'documentation'/n).read_bytes())==h
assert (P/'documentation/programs/pump-fees/README.md').read_bytes()==source['programs/pump-fees/README.md']
retained={}
for binding in read('retained-package-bindings.json'):
 assert H((P/binding['archive']).read_bytes())==binding['archive_sha256']
 files=archive(binding['archive']);check_seal(files,binding['manifest_sha256']);assert len(files)-1==binding['payload_files'];retained[binding['label']]=files
combined=retained['combined-handoff'];assert candidate==combined['pump_fees_candidate.so']
assert H(combined['manifest-sha256.json'])==prov['combined_trial_manifest_sha256']
nested=read('nested-pure-binding.json');assert H(combined[nested['member']])==nested['sha256']
pure=archive_bytes(combined[nested['member']]);check_seal(pure,prov['pure_trial_manifest_sha256']);assert len(pure)-1==63
assert pure['manifest-sha256.json']==(P/'retained/pure-graph-manifest-sha256.json').read_bytes()
family=archive_bytes(pure['retained-family-graph.tar.gz']);check_seal(family,json.loads(pure['provenance.json'])['prior_graph_seal_sha256']);assert len(family)-1==290
scratch_source=archive_bytes(combined['source-snapshot.tar.gz']);assert sorted(n for n in source if source[n]!=scratch_source[n])==['programs/pump-fees/README.md']
identity=read('main-scratch-identity.json');assert identity['whole_file_equal']and identity['runtime_receipts_carried_by_whole_file_identity']
assert identity['main_binary_sha256']==identity['scratch_binary_sha256']==H(candidate)
assert identity['main_build_report_sha256']==H((P/'build-comparison.json').read_bytes())and identity['scratch_build_report_sha256']==H(combined['build-comparison.json'])
assert identity['main_source_sha256']==hashes and identity['scratch_source_sha256']==json.loads(combined['source-sha256.json'])
sdk=archive('sbf-sdk-snapshot.tar.gz');assert {n:H(b)for n,b in sdk.items()}==build['sdk_source_sha256']
phase=read('tool-phase-provenance.json');assert phase['compile']['requested_tools_version']=='v1.44'
assert phase['compile']['tool_hashes_before']==phase['compile']['tool_hashes_after']=={p:v['sha256']for p,v in phase['compile']['tool_files'].items()}
assert phase['strip']['sdk_marker']=='platform-tools-v1.52.md'and phase['strip']['file_sha256_before']==phase['strip']['file_sha256_after']=='12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be'
assert b'version=v1.52'in sdk['scripts/install.sh']and b'platform-tools/llvm/bin/llvm-objcopy --strip-all'in sdk['scripts/strip.sh']
assert {n:H(sdk[n])for n in phase['phase_source_sha256']}==phase['phase_source_sha256']
assert phase['strip']['candidate_sha256']==H(candidate)and phase['compile']['unstripped_sha256']==H((P/'symbol-source.so').read_bytes())
for binding in read('receipt-build-bindings.json'):
 assert (P/binding['published_report']).read_bytes()==combined[binding['published_report']]
 assert H((P/binding['published_report']).read_bytes())==binding['published_report_sha256']
 assert binding['executed_candidate_sha256']==binding['main_candidate_sha256']==H(candidate)
 assert binding['build_report_sha256']==H(combined['build-comparison.json'])and binding['main_build_report_sha256']==H((P/'build-comparison.json').read_bytes())
 assert binding['actual_source_sha256']==json.loads(combined['source-sha256.json'])and binding['main_source_sha256']==hashes
 assert binding['returncode']==0 and not binding['mismatches']
assert read('runtime-summary.json')['comparison_receipts']==17441 and read('runtime-summary.json')['donation_sequence_steps']==10
with tempfile.TemporaryDirectory(prefix='fees-family-publication-verify-')as directory:
 temp=Path(directory);cb=temp/'combined';pb=temp/'pure';materialize(combined,cb);materialize(pure,pb)
 pure_result=run([sys.executable,str(pb/'verify.py'),'--repo',str(cb/'runtime')])
 combined_result=run([sys.executable,str(cb/'verify.py')])
 spec=importlib.util.spec_from_file_location('fees_static_diagnostic',cb/'static_diagnostic.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
 main_symbols=module.ELF(P/'symbol-source.so');scratch_symbols=module.ELF(cb/'symbol-source.so');main=module.ELF(P/'pump_fees_candidate.so')
 assert main_symbols.b[main_symbols.lo:main_symbols.hi]==scratch_symbols.b[scratch_symbols.lo:scratch_symbols.hi]==main.b[main.lo:main.hi]
 assert main_symbols.rels==scratch_symbols.rels==main.rels
assert combined_result['runtime']==read('runtime-verification-result.json')and pure_result['runtime_cases']==0
assert (P/'static-gate.json').read_bytes()==combined['static-gate.json']
checked=False
if args.current_main:
 root=next(p for p in P.parents if(p/'evidence/original/pump_fees/deployed.so').is_file())
 for name in ['source-sha256.json','build-helper-sha256.json','documentation-sha256.json','harness-source-sha256.json','runtime-inputs.json']:
  for n,h in read(name).items():assert H((root/n).read_bytes())==h,(name,n)
 checked=True
status=read('status-pump_fees-proposal.json');assert status['candidate_sha256']==H(candidate)and status['validated_cases']==17441
print(json.dumps({'verified':True,'sealed_files':len(seal),'source_inputs':22,'helper_inputs':4,'main_scratch_whole_file_equal':True,'candidate_sha256':H(candidate),'original_full_byte_equal':False,'current_main_checked':checked,'pure_trial':pure_result,'combined_static':{'social_exit_bytes':560,'social_direct_calls':7,'social_literals':3,'pubkey_helpers':6,'formatter_direct_targets':10,'pubkey_source_records':9},'fresh_combined_runtime':combined_result['runtime'],'main_runtime_replayed':False},indent=2))
