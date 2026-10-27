"""Authenticate full curve source, complete body gains and bounded signed replay."""
from pathlib import Path
import sys,json,gzip,hashlib,difflib,importlib.util
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1]
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(raw(p))
def sha(b):return hashlib.sha256(b).hexdigest()
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify(runtime=True):
 assert not any(p.is_symlink()for p in P.rglob('*'))
 assert load(P/'manifest.json')=={p.relative_to(P).as_posix():sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts}
 for n,h in load(P/'inputs.json').items():assert sha((R/n).read_bytes())==h,n
 base=R/'research/mayhem-native-program-recovery';manifest=load(base/'manifest.json');before={}
 for p in(base/'sources').rglob('*.gz'):
  assert sha(p.read_bytes())==manifest[p.relative_to(base).as_posix()];before[p.relative_to(base/'sources').as_posix().removesuffix('.gz')]=raw(p)
 prior=R/'research/mayhem-native-buy-v2-validation';prior_manifest=load(prior/'manifest.json');p=prior/'override/src/instructions/buy_v2.rs';assert sha(p.read_bytes())==prior_manifest[p.relative_to(prior).as_posix()];before['src/instructions/buy_v2.rs']=p.read_bytes()
 assert len(before)==54
 after=dict(before);name='src/instructions/sell.rs';after[name]=(P/'override'/name).read_bytes()
 assert after[name]!=before[name]
 patch=''.join(difflib.unified_diff(before[name].decode().splitlines(True),after[name].decode().splitlines(True),fromfile='a/'+name,tofile='b/'+name)).encode();assert patch==(P/'source.patch').read_bytes();assert(P/'.gitattributes').read_bytes()==b'source.patch -whitespace\n'
 # Existing handlers and their source coordinates are retained; the external codec is appended.
 tail='fn math()->Error'
 assert before[name].decode().split(tail,1)[1]==after[name].decode().split(tail,1)[1].split('\nmod external_curve {',1)[0]
 assert before[name].decode().split(tail,1)[0].count('\n')==after[name].decode().split(tail,1)[0].count('\n')
 outputs={}
 for label in ['recovered','repeat']:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');assert launch['source_inputs']=={n:sha(b)for n,b in after.items()};assert result['returncode']==0 and result['root_invocations']==1 and result['source_unchanged']
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  log=raw(P/f'builds/{label}/stderr.gz');assert log.count(b'--crate-name anchor_lang ')==1 and log.count(b'--crate-name mayhem_recovered ')==1
  assert b'Compiling anchor-lang v1.0.0' in log
  for n in ['candidate','symbols']:assert sha(raw(P/f'artifacts/{label}/{n}.so.gz'))==result[n+'_sha256']
  outputs[label]=(raw(P/f'artifacts/{label}/candidate.so.gz'),raw(P/f'artifacts/{label}/symbols.so.gz'))
 assert outputs['recovered']==outputs['repeat'];candidate,symbols=outputs['recovered'];assert sha(candidate)=='995fc5a04fb8c8554a491082cf01cf6f36d595d55d649e011470b0641f637fad'
 for n,b in module('curve_analysis',P/'analysis.py').generate().items():assert(P/n).read_bytes()==b,n
 old={r['id']:r for r in load(prior/'audit.json')['rows']};rows=load(P/'audit.json')['rows'];gains=[r for r in rows if old[r['id']]['status']=='unmatched'and r['status']!='unmatched'];assert[r['id']for r in gains]==['O0018','O0020','O0047','O0059'];assert sum(r['bytes']for r in gains)==1640
 assert all(r['status']!='unmatched'for r in rows if old[r['id']]['status']!='unmatched')
 assert {r['id']for r in rows if r['status']=='raw_local_match'}-{r['id']for r in old.values()if r['status']=='raw_local_match'}=={'O0045'}
 for r in gains:
  for c in r['counterparts']:
   bad=[e['original_target']for e in c['direct_edges']if e['status']!='matching_target_shape'];assert bad==([26272]if r['id']=='O0059'else[])
 assert load(P/'gains.json')==dict(gains=gains,new_matching_window_bytes=1640,raw_upgrade='O0045',remaining_decoder=26272)
 result=dict(source_inputs=54,full_window_matches=345,raw_local_matches=59,normalized_only=286,unmatched_windows=96,new_complete_body_matches=4,unmatched_text_bytes=348576,compiler_executed=False,target_executed=False)
 if runtime:result.update(module('curve_runtime',P/'runtime_check.py').verify_runtime(candidate))
 print(json.dumps(result,indent=2));return result
if __name__=='__main__':verify()
