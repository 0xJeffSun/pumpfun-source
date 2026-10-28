from pathlib import Path
import gzip,hashlib,importlib.util,json,shutil
W=Path(__file__).resolve().parents[1];R=W.parents[1];P=R/'research/mayhem-source-origin-recovery-20261027';V=W/'source-origin-runtime-verification-view';D=W/'source-origins-composed-runtime-01'
assert not V.exists()
(V/'builds/first').mkdir(parents=True);shutil.copyfile(P/'builds/first/candidate.so.gz',V/'builds/first/candidate.so.gz');shutil.copytree(W/'source-origin-runtime-stage',V/'runtime')
candidate=gzip.decompress((V/'builds/first/candidate.so.gz').read_bytes());sha=lambda b:hashlib.sha256(b).hexdigest()
def write(p,j):p.write_text(json.dumps(j,indent=2)+'\n')
shutil.copyfile(D/'production-summary.json',V/'runtime/production-summary.json')
write(V/'runtime/status.json',{'state':'complete','candidate_sha256':sha(candidate),'trade_pairs':6636,'extend_pairs':301,'initializer_pairs':69,'qualified':True})
e=V/'runtime/extend';(e/'fixtures').mkdir(parents=True)
shutil.copyfile(D/'extend/report.json.gz',e/'report.json.gz');shutil.copyfile(W/'macro-closure-whole-elf-audit/capture_extend.py',e/'capture.py')
for n in ['mayhem_validate_extend.py','mayhem_validate_admin.py']:shutil.copyfile(R/'scripts'/n,e/'fixtures'/n)
inputs=json.loads((V/'runtime/inputs.json').read_text())
for f in [V/'runtime/production-summary.json',*e.rglob('*')]:
 if f.is_file():inputs['staged_files'][f.relative_to(V/'runtime').as_posix()]=sha(f.read_bytes())
write(V/'runtime/inputs.json',inputs)
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
base=module('new_origins_base_runtime',R/'research/mayhem-current-macro-call-closure-20261027/runtime_verifier.py')
print('BEGIN INDEPENDENT TRADE + INITIALIZER VERIFICATION',flush=True)
result=base.check(V,R,candidate,False);write(V/'runtime/verification.json',result)
print('PASS trade + initializer',result['total_pairs'],result['total_signed_records'],flush=True)
extra=module('new_origins_extend_runtime',P/'runtime_verify.py');ext=extra.check_extend(V,R,candidate);write(e/'verification.json',ext);summary=extra.compose(result,ext);write(V/'runtime/origin-verification.json',summary)
print(json.dumps(summary,indent=2),flush=True)
