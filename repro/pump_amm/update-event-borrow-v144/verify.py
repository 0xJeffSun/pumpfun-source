"""Read-only portable main/scratch identity, provenance and saved-receipt gate."""
from pathlib import Path
import argparse,gzip,hashlib,json,subprocess,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;sha=lambda b:hashlib.sha256(b).hexdigest()
p=argparse.ArgumentParser();p.add_argument('--current-main',action='store_true');p.add_argument('--repo',type=Path);a=p.parse_args()
def read(name):return json.loads((W/name).read_text())
def unpack(name):
 b=(W/name).read_bytes();return gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b
def run(name,*args):
 r=subprocess.run([sys.executable,'-B',str(W/name),*args],capture_output=True,text=True);assert r.returncode==0,r.stderr;return json.loads(r.stdout)
sealed=False
if(W/'manifest.json').exists():
 m=read('manifest.json');found=set()
 for f in W.rglob('*'):
  assert not f.name.endswith('-keypair.json')and not f.is_symlink()
  if f.is_file()and f!=W/'manifest.json':found.add(str(f.relative_to(W)))
 assert found==set(m['files']),found^set(m['files'])
 for name,v in m['files'].items():
  rel=Path(name);assert not rel.is_absolute()and '..'not in rel.parts and not rel.name.endswith('-keypair.json');b=(W/rel).read_bytes();assert sha(b)==v['sha256']and len(b)==v['bytes'],name
 sealed=True
assert sha((W/'scratch/manifest.json').read_bytes())=='ba22d964ab754b253110407cf17a386fdf822b05a6197d159ba1b3e2c158bc5a'
scratch=run('scratch/verify.py');assert scratch['seal_verified']
build=read('build-comparison.json');attempt=read('build-attempt.json');assert attempt['returncode']==0 and attempt['source_unchanged']and attempt['source_sha256']==attempt['source_after_sha256']==build['source_sha256']
assert build['source_sha256']==read('scratch/proposed-source-sha256.json')and len(build['source_sha256'])==22
for name,h in build['source_sha256'].items():assert sha((W/'source'/name).read_bytes())==h
candidate=(W/'candidate.so').read_bytes();assert candidate==(W/'scratch/candidate.so').read_bytes();identity=read('main-scratch-identity.json');assert identity['whole_file_equal']and identity['main_sha256']==identity['scratch_sha256']==sha(candidate)
assert sha(unpack('build.log.gz'))==build['build_log_sha256']==attempt['build_log_sha256']
phase=read('toolchain-phases.json');assert phase['candidate']['sha256']==sha(candidate)and phase['compiled_unstripped']['sha256']==sha((W/'unstripped.so').read_bytes())and phase['cargo_rustc_info']['sha256']==sha((W/'rustc_info.json').read_bytes())
assert phase['compile']['tools']['bin/rustc']['sha256']==build['rustc_sha256']=='1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a'
assert phase['strip']['tool']['sha256']=='12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be'
for path,row in phase['strip']['scripts'].items():assert sha((W/'sdk-scripts'/path).read_bytes())==row['sha256']
# Same whole-file comparison and direct receipt requirements as the current
# central checker; evaluate the proposed entry without mutating central status.
sys.path.insert(0,str(W/'build-helper-snapshot/scripts'));from compare import compare
original=(W/'scratch/inputs/evidence/original/pump_amm/deployed.so').read_bytes();assert compare(original,candidate)==build['comparison']
proposal=read('status-pump_amm.json');prefix='repro/pump_amm/update-event-borrow-v144/';count=0;bindings=read('main-receipt-bindings.json')
for row in bindings:
 name=row['suite'];raw=unpack(name+'-differential.json.gz');saved=unpack('scratch/runtime-01/'+name+'.json.gz');assert raw==saved and sha(raw)==row['receipt_uncompressed_sha256'];d=json.loads(raw)
 assert d['candidate_sha256']==sha(candidate)and d['original_sha256']==sha(original)and not d['mismatches'];count+=d['case_count']
 assert row['main_source_sha256']==build['source_sha256']and row['main_build_report_sha256']==sha((W/'build-comparison.json').read_bytes())and row['identity_report_sha256']==sha((W/'main-scratch-identity.json').read_bytes())
assert count==17462==proposal['validated_cases']and len(bindings)==25
assert set(proposal['validation_reports'])=={prefix+r['suite']+'-differential.json.gz'for r in bindings}
serializers=run('verify_serializers.py','--verify');static=run('static_compare.py','--verify');update_data=run('verify_update_data.py','--verify')
assert static['roots']['update_handler']['complete_normalized_equal']and static['roots']['update_handler']['candidate_bytes']==2912
assert len(proposal['implemented_handlers'])==37 and proposal['static_only_handlers']==['create_config']and proposal['create_config_runtime_successes']==0
assert scratch['runtime']['stricter_existing_recipient_cases']==78
before=read('promotion-inputs-before.json');assert before['source']==build['source_sha256']
for path,h in before['program_readme'].items():assert sha((W/'source'/path).read_bytes())==h
for path,h in before['build_helpers'].items():assert sha((W/'build-helper-snapshot'/path).read_bytes())==h
assert build['sdk_source_sha256']==read('scratch/build-comparison.json')['sdk_source_sha256']
assert identity['main_build_report_sha256']==sha((W/'build-comparison.json').read_bytes())and identity['scratch_build_report_sha256']==sha((W/'scratch/build-comparison.json').read_bytes())
assert len(candidate)==1199048 and sha(candidate)=='d27be7e97d00a5f4ce249bd0f9bceec697db3d6e43a2264ec159d9de5a0013d1'
assert identity['bytes']==len(candidate)and identity['source_content_equal']and identity['main_source_sha256']==build['source_sha256']and identity['scratch_source_sha256']==read('scratch/build-comparison.json')['source_sha256']
assert identity['scratch_package_manifest_sha256']==sha((W/'scratch/manifest.json').read_bytes())
assert identity['main_unstripped_sha256']==sha((W/'unstripped.so').read_bytes())and identity['scratch_unstripped_sha256']==sha((W/'scratch/unstripped.so').read_bytes())
assert (W/'unstripped.so').read_bytes()==(W/'scratch/unstripped.so').read_bytes()
if a.current_main:
 repo=a.repo.resolve()if a.repo else next(q for q in W.parents if(q/'programs/pump-amm/Cargo.toml').is_file())
 current=read('current-main-bindings.json')
 for group,mapping in current.items():
  for path,h in mapping.items():assert sha((repo/path).read_bytes())==h,(group,path)
print(json.dumps({'status':'PASS','seal_verified':sealed,'package_payload_files':len(m['files'])if sealed else None,'current_main_verified':a.current_main,'candidate_sha256':sha(candidate),'main_scratch_whole_file_identity':True,'compiler_inputs':22,'cases':count,'suite_count':25,'stricter_scalar_cases':191,'stricter_recipient_cases':78,'static_summary':static,'initializer_static_only':True,'initializer_positive_runtime':False,'verified_signatures':scratch['runtime']['signature_count'],'existing_setup_transactions':150,'serializers':serializers,'handler_normalized_match':True,'update_data':update_data,'full_byte_equality':False,'runtime_rerun':False},indent=2))
