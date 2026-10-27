"""Verify the current-source initializer composition, without compiling or executing a VM."""
from pathlib import Path, PurePosixPath
import argparse,difflib,gzip,hashlib,importlib.util,io,json,sys,tarfile,tempfile
if not __debug__:raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
HASHES={'current':('499d43ac1e178752cb7ff3899fef103b0ffb9be345aea67af07bbd5c62af6dc6','a96fca79ad903c9bb1fb1c714271019a34d874d64c4b4b9f44ab669afddbf833'),'historical':('9e0e32a9395b5ab6eebd239fd7d0fbc04c4c1b0981a83857f0cbeef2352ec869','a6a4e593a08f50aae3c03dae02d1afc1ed32f24cc43f430e43b161422c43d7bb')}
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):
 b=p.read_bytes();return gzip.decompress(b) if p.suffix=='.gz' else b
def load(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def archive(p):
 d={}
 with tarfile.open(fileobj=io.BytesIO(p.read_bytes()),mode='r:gz') as t:
  for m in t:
   q=PurePosixPath(m.name);assert m.isfile() and not q.is_absolute() and '..' not in q.parts and str(q)==m.name and m.name not in d
   d[m.name]=t.extractfile(m).read()
 return d
def manifest():
 paths=list(P.rglob('*'));assert not any(p.is_symlink() for p in paths)
 assert all(p.is_dir() or p.is_file() for p in paths)
 assert {str(p.relative_to(P)):sha(p.read_bytes()) for p in paths if p.is_file() and p!=P/'manifest.json'}==load(P/'manifest.json')
def verify(runtime=True):
 manifest()
 for n,h in load(P/'external-inputs.json').items():assert sha((ROOT/n).read_bytes())==h,n
 src=archive(P/'source.tar.gz');old=archive(ROOT/'research/mayhem-sizing-panic-recovery/source.tar.gz')
 assert len(src)==len(old)==67 and src.keys()==old.keys()
 assert [n for n in sorted(src) if src[n]!=old[n]]==['src/state.rs']
 assert {n:sha(b) for n,b in src.items()}==load(P/'source-inputs.json')
 delta=''.join(difflib.unified_diff(old['src/state.rs'].decode().splitlines(True),src['src/state.rs'].decode().splitlines(True),fromfile='a/src/state.rs',tofile='b/src/state.rs'))
 assert delta.encode()==raw(P/'source.patch')
 staged=ROOT/'research/mayhem-initializer-staged-snapshot-20261027'
 assert src['src/state.rs']==archive(staged/'source.tar.gz')['src/state.rs']
 hist=dict(src);macro=ROOT/'research/mayhem-historical-macro-current-20261027'
 for n in ['curve-accounts/src/interface_definition.rs','curve-accounts/idls/pump.json']:hist[n]=raw(macro/'sources'/(n+'.gz'))
 assert sha(raw(P/'layout/ordered.ld'))=='35d793e8766685441ce6202fd3c999b7962474f23e543819f0ecfcead50b1ca4'
 reader=module('composed_reader',P/'reader.py');progress=module('composed_progress',P/'progress.py');analysis=module('composed_initializer',P/'analysis.py')
 original=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes();assert sha(original)=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
 assert raw(P/'baseline/current/candidate.so.gz')==raw(ROOT/'research/mayhem-sizing-panic-recovery/artifacts/recovered/candidate.so.gz')
 assert raw(P/'baseline/historical/candidate.so.gz')==raw(macro/'program/enabled/candidate.so.gz')
 output={}
 with tempfile.TemporaryDirectory() as td:
  td=Path(td)
  for role,(ch,sh) in HASHES.items():
   expected={n:sha(b) for n,b in (src if role=='current' else hist).items()}
   for label in [role,role+'-repeat']:
    d=P/'builds'/label;candidate,symbols=raw(d/'candidate.so.gz'),raw(d/'symbols.so.gz')
    assert (sha(candidate),sha(symbols))==(ch,sh)
    launch,result=load(d/'launch.json'),load(d/'result.json')
    assert launch['source_inputs']==expected and result['returncode']==0 and result['source_unchanged'] and result['bound_inputs_unchanged']
    assert (result['candidate_sha256'],result['symbols_sha256'])==(ch,sh)
    cmd=launch['command'];assert cmd[cmd.index('--crate-name')+1]=='mayhem_recovered' and cmd[cmd.index('--target')+1]=='sbpf-solana-solana'
    assert '--remap-path-prefix=src/=programs/mayhem-program/src/' in cmd and '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs' in cmd
    assert sha(raw(P/'layout/ordered.ld')) in launch['bound_inputs'].values()
    if label.endswith('repeat'):assert result['candidate_identical'] and result['symbols_identical']
    paths=[]
    for name,data in [('symbols',symbols),('candidate',candidate)]:
     path=td/(label+'-'+name+'.so');path.write_bytes(data);paths.append(reader.Elf(path))
    allocated=lambda e:{s['name']:(s['address'],s['size'],e.b[s['offset']:s['offset']+s['size']]) for s in e.sections if s['flags']&2 and s['type']!=8}
    assert allocated(paths[0])==allocated(paths[1])
   before=raw(P/f'baseline/{role}/symbols.so.gz');after=raw(P/f'builds/{role}/symbols.so.gz')
   measured=progress.compare(original,before,after);assert measured==load(P/f'analysis/{role}-progress.json')
   assert measured['matches']==430 and measured['gains']==['O0193'] and measured['raw_matches']==(100 if role=='current' else 141)
   assert measured['positive_direct_edges_after']==(4289 if role=='current' else 4290) and measured['positive_Source_records_after']==446
   a=td/(role+'-before.so');a.write_bytes(before);b=td/(role+'-after.so');b.write_bytes(after)
   proof=analysis.inspect(ROOT,P,a,b);assert proof==load(P/f'analysis/{role}-body.json')
   assert proof['snapshot']['exact_eight_byte_slots']==120 and proof['snapshot']['complete_normalized_equal'] and proof['snapshot']['typed_data']['references']==4
   output[role]={'normalized':430,'raw':measured['raw_matches'],'initializer_slots':120,'whole_elf_equal':False}
 ledger=module('current_window_inventory',P/'inventory.py').inventory(ROOT,P)
 assert ledger==load(P/'inventory.json')
 if runtime:
  init=module('composed_init_runtime',P/'runtime_check.py')
  for role,(ch,_) in HASHES.items():output[role]['initializer_runtime']=init.verify(ROOT,P,True,ch,role)
  trades=module('composed_trade_runtime',ROOT/'research/mayhem-accounting-extend-recovery/verify.py')
  command=load(P/'runtime/trades/commands.json');assert command['candidate_sha256']==HASHES['current'][0] and len(command['runs'])==14
  candidate=raw(P/'builds/current/candidate.so.gz');rows=[]
  for n,count in trades.EXPECTED.items():
   r=load(P/f'runtime/trades/{n}.json.gz');v=trades.check_trade_receipts(n,r,candidate,ROOT);assert v['exact_noncompute_logs']==count;rows.append(v)
   for row in r['cases']:
    for label,h in [('original',sha(original)),('candidate',sha(candidate))]:
     for phase in ['before','after']:
      account=row[label][phase]['MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'];assert account['executable'] and account['data_sha256']==h
  assert {r['family']:(r['returncode'],r['cases'],r['mismatches']) for r in command['runs']}=={n:(0,c,0) for n,c in trades.EXPECTED.items()}
  assert sum(r['cases'] for r in rows)==6636
  output['current']['trade_runtime']={'cases':6636,'verified_signed_records':13272,'noncompute_log_differences':0}
 return output
if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--skip-runtime',action='store_true');a=p.parse_args();print(json.dumps(verify(not a.skip_runtime),indent=2))
