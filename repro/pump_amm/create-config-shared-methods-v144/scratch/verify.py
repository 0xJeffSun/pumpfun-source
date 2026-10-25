"""Portable verification of saved build/static/runtime evidence; no program execution."""
from pathlib import Path
import gzip,hashlib,json,subprocess,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;sha=lambda b:hashlib.sha256(b).hexdigest()
def safe(rel):
 p=Path(rel);assert not p.is_absolute()and '..'not in p.parts and not any(x.endswith('-keypair.json')for x in p.parts)
 q=W/p;assert not q.is_symlink()and q.resolve().is_relative_to(W);return q
def raw(rel):
 p=safe(rel)
 if not p.exists():p=safe(rel+'.gz')
 b=p.read_bytes();return gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b
read=lambda rel:json.loads(raw(rel))
def run(rel,*args):
 r=subprocess.run([sys.executable,'-B',str(safe(rel)),*args],capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr;return json.loads(r.stdout)
sealed=False
if(W/'manifest.json').exists():
 m=read('manifest.json');actual=set()
 for p in W.rglob('*'):
  assert not p.is_symlink()and not p.name.endswith('-keypair.json')
  if p.is_file()and p!=W/'manifest.json':actual.add(str(p.relative_to(W)))
 assert actual==set(m['files'])
 for p,row in m['files'].items():b=safe(p).read_bytes();assert sha(b)==row['sha256']and len(b)==row['bytes'],p
 sealed=True
assert sha(raw('prebuild/manifest.json'))=='12b3943b4fefbb510c0f7786caf42ade28aeca0031a518a455e3e4d95236b6d8'
pre=run('prebuild/verify.py');assert pre['sealed']and pre['proposed_inputs']==22
proposal=read('proposed-source-sha256.json');assert proposal==read('prebuild/proposed-source-sha256.json')and len(proposal)==22
for p,h in proposal.items():assert sha(raw('source/'+p))==h
attempt=read('build-attempt.json');build=read('build-comparison.json');prefix='work/amm-create-config-build/source/'
assert attempt['returncode']==0 and attempt['source_unchanged']and attempt['source_sha256']==attempt['source_after_sha256']==build['source_sha256']
assert {p.removeprefix(prefix):h for p,h in build['source_sha256'].items()}==proposal
cand=raw('candidate.so');assert len(cand)==1199296 and sha(cand)=='807010828fe3b4124b5e20c34ca627582e1718e9c5849bf0c15309983d4088b2'
assert build['comparison']['candidate_sha256']==sha(cand)and build['comparison']['full_byte_equality']is False
assert sha(raw('build.log'))==build['build_log_sha256']==attempt['build_log_sha256']
phase=read('toolchain-phases.json');assert phase['compile']['tools']['bin/rustc']['sha256']==build['rustc_sha256']=='1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a'
assert phase['strip']['tool']['sha256']=='12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be'
assert phase['candidate']['sha256']==sha(cand)and phase['compiled_unstripped']['sha256']==sha(raw('unstripped.so'))and phase['cargo_rustc_info']['sha256']==sha(raw('rustc_info.json'))
for p,r in phase['strip']['scripts'].items():assert sha(raw('sdk-scripts/'+p))==r['sha256']
before=read('tools-before.json');after=read('tools-after.json');assert before==after
for p,h in before['build_helpers'].items():assert sha(raw('build-helper-snapshot/'+p))==h
assert build['sdk_source_sha256']==before['sdk_source']
inputs=read('runtime-01/inputs-before.json');assert inputs==read('runtime-01/inputs-after.json')and inputs['actual_compiled_source']==build['source_sha256']and inputs['build_report_sha256']==sha(raw('build-comparison.json'))
locations=read('input-location-map.json')
for group in ['actual_compiled_source','harness','runtime','legacy_checkout_snapshot']:
 for p,h in inputs[group].items():assert sha(raw(locations[p]))==h,p
frozen=read('frozen-inputs.json');assert frozen['source']==proposal and frozen['maintained_harness']=={p:h for p,h in inputs['harness'].items()if p.startswith('scripts/')}and frozen['runtime']==inputs['runtime']
for p,h in frozen['local_runner_files'].items():assert sha(raw(p))==h
for p,row in frozen['input_snapshots'].items():assert sha(safe('inputs/'+p).read_bytes())==row['sha256']
assert read('verification-tools-before-runtime.json')['verify_runtime.py']==sha(raw('verify_runtime.py'))
static=run('static_compare.py','--verify');serializer=run('verify_serializers.py','--verify');runtime=run('verify_runtime.py','--verify')
assert runtime['case_count']==17462 and runtime['signature_count']==35418 and runtime['stricter_existing_scalar_cases']==191 and runtime['stricter_existing_recipient_cases']==78
live=False
if '--current-source'in sys.argv:
 root=Path(sys.argv[sys.argv.index('--current-source')+1]).resolve()
 for p,h in read('baseline-source-sha256.json').items():assert sha((root/p).read_bytes())==h,p
 live=True
print(json.dumps({'status':'PASS','seal_verified':sealed,'payload_files':len(m['files'])if sealed else None,'candidate_sha256':sha(cand),'compiler_inputs':22,'static_summary':static,'serializers':serializer,'runtime':{k:v for k,v in runtime.items()if k!='suites'},'current_baseline_verified':live,'initializer_positive_runtime':False,'full_byte_equality':False,'new_builds_or_runtime_by_verifier':False},indent=2))
