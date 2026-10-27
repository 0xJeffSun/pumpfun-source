"""Observe the owned-Uses control compiler; reject traces unless raw output is exact."""
from pathlib import Path
import subprocess,hashlib,json,shutil,time,sys
B=Path('/home/ahi200/pumpfun-work/20261027-metaplex')
H=lambda b:hashlib.sha256(b).hexdigest()
name=sys.argv[1] if len(sys.argv)>1 else 'owned-control-stages'
baseline=sys.argv[2] if len(sys.argv)>2 else 'control'
out=B/'traces'/name;out.mkdir(parents=True,exist_ok=False)
manifest=json.loads((B/'builds'/baseline/'source-manifest.json').read_text())
assert all(H((B/'source'/n).read_bytes())==v for n,v in manifest.items())
cmd=json.loads((B/'builds/control/command.json').read_text())
assert cmd[-1]=='--emit=link'
function='_ZN14token_metadata9processor4uses7utilize15process_utilize17h9789c7990f4c0b83E'
cmd[-1:] = ['--emit=link,llvm-ir,mir','-Csave-temps','-Cllvm-args=-print-before-all','-Cllvm-args=-print-after-all','-Cllvm-args=-filter-print-funcs='+function,'-Cllvm-args=-print-isel-input']
(out/'command.json').write_text(json.dumps(cmd,indent=2)+'\n')
start=time.time()
with (out/'trace.log').open('wb') as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
q=B/'target/sbf-solana-solana/release/token_metadata.so';shutil.copy2(q,out/'compiler-output.so')
image='solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467'
subprocess.run(['docker','run','--rm','--network','none','-v',str(B/'sdk')+':/sdk:ro','-v',str(out)+':/out:rw',image,'/sdk/llvm/bin/llvm-objcopy','--strip-all','/out/compiler-output.so','/out/candidate.so'],check=True)
for q in (B/'target/sbf-solana-solana/release/deps').glob('token_metadata*'):
 if q.suffix in ['.ll','.mir','.bc']:
  shutil.copy2(q,out/q.name)
result={'returncode':r.returncode,'seconds':time.time()-start,'sha256':H((out/'candidate.so').read_bytes()),'source_unchanged':all(H((B/'source'/n).read_bytes())==v for n,v in manifest.items()),'trace_bytes':(out/'trace.log').stat().st_size}
result['expected_sha256']=json.loads((B/'builds'/baseline/'result.json').read_text())['candidate_sha256']
result['exact_control']=result['sha256']==result['expected_sha256']
(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
assert r.returncode==0 and result['source_unchanged'] and result['exact_control']
