from pathlib import Path
import argparse,json,hashlib,gzip,sys
from analyze import analyze
from review import generate
from check_owned3002 import check
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def verify():
 m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
 for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
 src=json.loads((P/'launcher/resolved-source-sha256.json').read_text());assert len(src)==23 and src=={str(f.relative_to(P/'source')):H(f)for f in(P/'source').rglob('*')if f.is_file()}
 base={str(f.relative_to(P/'baseline-source')):H(f)for f in(P/'baseline-source').rglob('*')if f.is_file()};assert set(base)==set(src);assert sorted(n for n in src if src[n]!=base[n])==['src/exit_error.rs','src/idl.rs']
 for n in ['idl.rs','exit_error.rs']:assert(P/'source/src'/n).read_bytes()==(P/'proposal/after'/n).read_bytes()
 b=json.loads((P/'attempt/build-result.json').read_text());assert b['returncode']==0 and b['source_after']==src and json.loads((P/'runner-exit.json').read_text())['returncode']==0
 before=json.loads((P/'attempt/tool-phase-before.json').read_text());after=json.loads((P/'attempt/tool-phase-after.json').read_text());assert before['tools']==after['tools']
 launch=json.loads((P/'attempt/build-launch.json').read_text());assert launch['command'][launch['command'].index('--tools-version')+1]=='v1.44'
 for n,v in analyze(P).items():assert json.loads(gzip.decompress((P/n).read_bytes())if n.endswith('.gz')else(P/n).read_bytes())==v,n
 for n,v in generate().items():assert(P/n).read_text()==(v if isinstance(v,str)else json.dumps(v,indent=2,sort_keys=True)+'\n'),n
 assert check()==json.loads((P/'owned3002-emitted.json').read_text())
 assert json.loads((P/'ordinary/process-result.json').read_text())['returncode']==0
 return {'status':'PASS','candidate_sha256':H(P/'candidate.so'),'source_inputs':23,'complete_original_current_inventories_recomputed':True,'owned3002_emitted_order_checked':True,'ordinary_cases':12,'saved_signatures_verified_separately':True,'new_target_executions':0,'main_plan':'UNRUN'}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
