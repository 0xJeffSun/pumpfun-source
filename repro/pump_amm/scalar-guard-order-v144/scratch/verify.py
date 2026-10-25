"""Verify the portable source/build/static/signed-receipt handoff without execution."""
from pathlib import Path
import gzip,hashlib,json,subprocess,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def safe(rel):
 p=Path(rel);assert not p.is_absolute()and '..'not in p.parts and not any(x.endswith('-keypair.json')for x in p.parts)
 q=W/p;assert not q.is_symlink()and q.resolve().is_relative_to(W);return q
read=lambda rel:json.loads(safe(rel).read_text())
def run(script,*args):
 p=subprocess.run([sys.executable,'-B',str(W/script),*args],capture_output=True,text=True)
 assert p.returncode==0,p.stderr
 return json.loads(p.stdout)
sealed=False
if (W/'manifest.json').exists():
 m=read('manifest.json');actual=set()
 for p in W.rglob('*'):
  assert not p.name.endswith('-keypair.json')and not p.is_symlink()
  if p.is_file()and str(p.relative_to(W))!='manifest.json':actual.add(str(p.relative_to(W)))
 assert actual==set(m['files']),actual^set(m['files'])
 for p,v in m['files'].items():
  data=safe(p).read_bytes();assert sha(data)==v['sha256']and len(data)==v['bytes'],p
 sealed=True
assert sha(safe('prebuild/manifest.json').read_bytes())=='082e7ed00f538ea2ba0967badd284912d2bf213ff88621be8a330b9427b21fac'
pre=run('prebuild/verify.py');assert pre['seal_verified']and pre['compiler_inputs']==18
build=read('build-comparison.json');attempt=read('build-attempt.json');assert attempt['returncode']==0 and attempt['source_unchanged']and attempt['source_sha256']==attempt['source_after_sha256']==build['source_sha256']
proposal=read('proposed-source-sha256.json');prefix='work/amm-scalar-setter-build/source/'
assert len(build['source_sha256'])==18 and {p.removeprefix(prefix):v for p,v in build['source_sha256'].items()}==proposal
for rel,h in proposal.items():assert sha(safe('source/'+rel).read_bytes())==h
candidate=safe('candidate.so').read_bytes();assert sha(candidate)=='a6dbd0dc24e28a9459e50858136a2cfabb59fb8aa8399d58499d047a76ec291f'and len(candidate)==1177512
assert build['comparison']['candidate_sha256']==sha(candidate)and build['comparison']['full_byte_equality']is False
assert sha(safe('build.log').read_bytes())==build['build_log_sha256']==attempt['build_log_sha256']
phase=read('toolchain-phases.json');assert phase['compile']['tools']['bin/rustc']['sha256']==build['rustc_sha256']=='1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a'
assert phase['strip']['tool']['sha256']=='12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be'
assert sha(safe('unstripped.so').read_bytes())==phase['compiled_unstripped']['sha256']
assert sha(safe('rustc_info.json').read_bytes())==phase['cargo_rustc_info']['sha256']
for rel,record in phase['strip']['scripts'].items():assert sha(safe('sdk-scripts/'+rel).read_bytes())==record['sha256']
inputs=read('runtime-01/inputs-before.json');assert inputs==read('runtime-01/inputs-after.json')and inputs['actual_compiled_source']==build['source_sha256']and inputs['build_report_sha256']==sha(safe('build-comparison.json').read_bytes())
locations=read('input-location-map.json')
for group in ['actual_compiled_source','harness','runtime','legacy_checkout_snapshot']:
 for path,h in inputs[group].items():assert sha(safe(locations[path]).read_bytes())==h,path
static=run('static_compare.py','--verify');runtime=run('verify_runtime.py','--verify')
assert runtime['case_count']==17462 and runtime['signature_count']==35418 and runtime['stricter_existing_scalar_cases']==191
print(json.dumps({'status':'PASS','seal_verified':sealed,'payload_files':len(m['files'])if sealed else None,'approved_prebuild':pre,'candidate_sha256':sha(candidate),'compiler_inputs':18,'static':static,'runtime':runtime,'builds_or_runtime_executed_by_verifier':False},indent=2))
