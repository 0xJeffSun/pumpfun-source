from pathlib import Path
import hashlib,json,os,subprocess,sys,time
R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-int/repo-ro');D=Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-int/runtime-p441');C=D/'candidate.so';H=D/'control/initializer-producer.py';O=D/'runtime/initializer'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();expected='44e4f5400f18b3667c405d374004f53d0d937bdbcd9a52a1e672ec38ad1d39b9';assert sha(C)==expected and not O.exists()
files=[C,H,Path(__file__),R/'research/mayhem-initializer-validation/validation_matrix.py',R/'repro/behavioral-recovery/scripts/mayhem_initialize_state_differential.py',R/'research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py',R/'evidence/original/mayhem/deployed.so',R/'evidence/original/pump/deployed.so']
inputs={str(p):sha(p)for p in files};cmd=[sys.executable,'-B',str(H),'--repository-root',str(R),'--candidate',str(C),'--output',str(O)]
record=dict(command=cmd,cwd=str(R),candidate_sha256=expected,controller_sha256=sha(Path(__file__)),input_hashes=inputs)
(D/'control/initializer-launch.json').write_text(json.dumps(record,indent=2)+'\n');start=time.monotonic()
with(D/'runtime/initializer.log').open('wb')as f:p=subprocess.run(cmd,cwd=R,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=f,stderr=subprocess.STDOUT)
assert p.returncode==0 and all(sha(Path(p))==h for p,h in inputs.items())
(D/'control/initializer-result.json').write_text(json.dumps(dict(record,returncode=p.returncode,seconds=time.monotonic()-start,inputs_unchanged=True),indent=2)+'\n');print('COMPLETE69',flush=True)
