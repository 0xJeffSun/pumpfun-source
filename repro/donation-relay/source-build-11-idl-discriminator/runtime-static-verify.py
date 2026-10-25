from pathlib import Path
import argparse,json,hashlib,gzip
from analyze import analyze
from review import generate
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def verify(repo=None):
 manifest=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 files={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in [P/'manifest.json',P/'manifest.sha256'] and '__pycache__'not in p.parts};assert files==set(manifest)
 for n,h in manifest.items():assert H(P/n)==h,n
 sources=json.loads((P/'launcher/resolved-source-sha256.json').read_text());assert len(sources)==23
 assert sources=={str(f.relative_to(P/'source')):H(f) for f in (P/'source').rglob('*') if f.is_file()}
 old={str(f.relative_to(P/'previous/source')):H(f) for f in (P/'previous/source').rglob('*') if f.is_file()};assert set(old)==set(sources);assert [n for n in sources if old[n]!=sources[n]]==['src/exit_error.rs','src/idl.rs']
 build=json.loads((P/'attempt/build-result.json').read_text());assert build['returncode']==0 and build['source_after']==sources
 before=json.loads((P/'attempt/tool-phase-before.json').read_text());after=json.loads((P/'attempt/tool-phase-after.json').read_text());assert before['tools']==after['tools']
 for name,row in json.loads((P/'attempt/retained-artifacts.json').read_text()).items():
  if name.endswith('.so'):assert H(P/name)==row['sha256'] and (P/name).stat().st_size==row['bytes']
 for n,v in analyze(P).items():assert json.loads(gzip.decompress((P/n).read_bytes()) if n.endswith('.gz') else (P/n).read_bytes())==v,n
 for n,v in generate().items():assert (P/n).read_text()==(v if isinstance(v,str)else json.dumps(v,indent=2,sort_keys=True)+'\n'),n
 stack=json.loads((P/'stack-observations.json').read_text());assert not stack['backend_errors'] and not any(x['out_of_range']for x in stack['frames'])
 review=json.loads((P/'review.json').read_text());assert not review['original_closure']['unresolved_direct_calls'] and not review['candidate_closure']['unresolved_direct_calls']
 if repo:
  b=Path(repo)/'repro/donation-relay/source-build-10-idl-deserialize';assert H(b/'candidate.so')==H(P/'previous/candidate.so') and H(b/'original.so')==H(P/'original.so')
 return {'status':'PASS','candidate_sha256':H(P/'candidate.so'),'source_inputs':23,'build_exit':0,'backend_stack_errors':0,'complete_function_ledgers_recomputed':True,'target_executions_by_verifier':0}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);a=p.parse_args();print(json.dumps(verify(a.repo),indent=2))
