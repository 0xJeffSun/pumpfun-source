"""Verify the current qualified Sell quote composition and its signed local evidence."""
from pathlib import Path,PurePosixPath
from collections import Counter
import argparse,difflib,gzip,hashlib,importlib.util,json,lzma,sys,tarfile,tempfile
if not __debug__:raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
DIGEST='7acb628e142bcc74534249dcefa04162331f4630ced4bc035c051ea7bf1b12fc'
SYMBOLS='8674c1feff4f220aa0b9450c1b9b255d4047d23b0dd5354cc92e69988cb28c57'
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):
 if not p.exists()and p.suffix=='.gz':p=p.with_suffix('.xz')
 b=p.read_bytes();return gzip.decompress(b)if p.suffix=='.gz'else lzma.decompress(b)if p.suffix=='.xz'else b
def load(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify(P):
 paths=list(P.rglob('*'));assert not any(p.is_symlink()for p in paths),'symlink';assert all(p.is_file()or p.is_dir()for p in paths),'special file'
 assert {p.relative_to(P).as_posix():sha(p.read_bytes())for p in paths if p.is_file()and p!=P/'manifest.json'}==load(P/'manifest.json'),'manifest'
 for n,h in load(P/'external-inputs.json').items():assert sha((ROOT/n).read_bytes())==h,('external input',n)
 C=ROOT/'research/mayhem-initializer-current-recovery-20261027';O=ROOT/'research/mayhem-current-ownership-composition-20261027'
 parent={}
 with tarfile.open(C/'source.tar.gz')as t:
  for m in t:
   n=PurePosixPath(m.name);assert m.isfile()and not n.is_absolute()and '..'not in n.parts and str(n)==m.name and m.name not in parent
   parent[m.name]=t.extractfile(m).read()
 parent['src/instructions/pump_interface.rs']=raw(O/'sources/qualified.rs');assert len(parent)==67
 expected=dict(parent);names=['src/instructions/sell_pump_swap.rs','src/state.rs'];patch=[]
 assert {p.relative_to(P/'overrides').as_posix()for p in (P/'overrides').rglob('*')if p.is_file()}==set(names)
 for n in names:
  expected[n]=raw(P/'overrides'/n);assert expected[n].count(b'\n')==parent[n].count(b'\n')
  patch.extend(difflib.unified_diff(parent[n].decode().splitlines(True),expected[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))
 assert ''.join(patch).encode()==raw(P/'source.patch')
 assert {n:sha(b)for n,b in expected.items()}==load(P/'source-inputs.json')
 for role in ['current','repeat']:
  d=P/'builds'/role;r=load(d/'result.json');l=load(d/'launch.json')
  assert r['returncode']==0 and r['source_unchanged']and r['bound_inputs_unchanged']
  assert sha(raw(d/'candidate.so.gz'))==r['candidate_sha256']==DIGEST
  assert sha(raw(d/'symbols.so.gz'))==r['symbols_sha256']==SYMBOLS
  assert l['source_inputs']==load(P/'source-inputs.json')and l['parent_candidate_sha256']=='389dce88e21ed06795b2d15ab837493bb883c32b614b6034ec85ff05d22db6b4'
  assert l['command'][l['command'].index('--target')+1]=='sbpf-solana-solana'
  assert sha(raw(P/'layout/ordered.ld'))in l['bound_inputs'].values()
 r=load(P/'builds/repeat/result.json');assert r['candidate_identical']and r['symbols_identical']
 reader=module('sell_current_reader',P/'reader.py');progress=module('sell_current_progress',C/'progress.py')
 original=raw(ROOT/'evidence/original/mayhem/deployed.so');before=raw(O/'builds/qualified/symbols.so.gz');after=raw(P/'builds/current/symbols.so.gz');candidate=raw(P/'builds/current/candidate.so.gz')
 p=progress.compare(original,before,after);p['scope']='Preserve all 430 baseline normalized bodies, 100 raw bodies, positive direct calls and Source records; newly matched Sell quote callees/data checked separately.'
 assert p==load(P/'analysis/progress.json')and p['matches']==431 and p['raw_matches']==100 and p['gains']==['O0093']and not p['body_losses']
 with tempfile.TemporaryDirectory(prefix='current-sell-read-')as td:
  td=Path(td);files={}
  for n,b in [('before',before),('after',after),('candidate',candidate)]:files[n]=td/(n+'.so');files[n].write_bytes(b)
  a,b=reader.Elf(files['after']),reader.Elf(files['candidate'])
  for s in a.sections:
   if s['flags']&2 and s['type']!=8:
    t=b.sec[s['name']];assert s['address']==t['address']and s['size']==t['size']and a.b[s['offset']:s['offset']+s['size']]==b.b[t['offset']:t['offset']+t['size']]
  quote=module('current_sell_quote_refs',ROOT/'research/mayhem-sell-retained-recovery/typed_data_reader.py').inspect(files['after'])
  assert quote==load(P/'analysis/quote-static.json')and quote['whole_body_normalized_equal']and quote['direct_callee_multiset_equal']and quote['typed_data_multiset_equal']
  assert quote['original_data']==quote['candidate_data']and len(quote['original_data'])==10
  ow=reader.Elf(ROOT/'evidence/original/mayhem/deployed.so')
  rows=load(ROOT/'research/mayhem-trade-origins-validator/audit.json')['rows'];originals={r['start']:ow.window(r['start'],r['end'])for r in rows}
  windows={s['value']:a.window(s['value'],s['value']+s['size'])for s in a.symbols if s['info']&15==2 and s['size']>=8 and a.lo<=s['value']<a.hi}
  key=lambda w:(w['end']-w['start'],w['normalized_sha256'],w['normalization_pattern'])
  sym=next(s for s in a.symbols if '10sell_quote17'in s['name']);w=windows[sym['value']];o=originals[186552]
  assert [(x['offset'],key(originals[x['target']]))for x in o['direct']]==[(x['offset'],key(windows[x['target']]))for x in w['direct']]
  init=module('current_sell_initializer',P/'initializer_analysis.py').inspect(ROOT,P,files['before'],files['after'])
  assert init==load(P/'analysis/initializer-static.json')and init['snapshot']['complete_normalized_equal']and init['snapshot']['exact_eight_byte_slots']==120
  def legacy(e):
   fs=[s for s in e.symbols if 'legacy_buy_handler17'in s['name']];assert len(fs)==1;s=fs[0];return e.window(s['value'],s['value']+s['size'])
  old=legacy(reader.Elf(files['before']));new=legacy(a);assert key(old)==key(new)
  assert load(P/'analysis/legacy-buy-preservation.json')=={'same_complete_normalized_body_as_qualified_parent':True,'bytes':13784,'original_match':False}
 ledger=module('current_sell_inventory',P/'inventory.py').inventory(ROOT,P);assert ledger==load(P/'inventory.json')
 assert ledger['counts']=={'raw-equal':100,'normalized-only':331,'unmatched':10}and ledger['matched_text_bytes']==597536
 assert original!=candidate
 init_runtime=module('current_sell_init_runtime',P/'runtime_check.py').verify(ROOT,P,True,DIGEST,'current')
 assert init_runtime==load(P/'runtime/initializer-verification.json')
 trades=module('current_sell_trade_runtime',ROOT/'research/mayhem-accounting-extend-recovery/verify.py');commands=load(P/'runtime/trades/commands.json');assert commands['candidate_sha256']==DIGEST and len(commands['runs'])==14
 reports=[]
 for name,count in trades.EXPECTED.items():
  receipt=load(P/f'runtime/trades/{name}.json.gz');r=trades.check_trade_receipts(name,receipt,candidate,ROOT);assert r['exact_noncompute_logs']==count;reports.append(r)
  for row in receipt['cases']:
   for label,h in [('original',sha(original)),('candidate',DIGEST)]:
    for phase in ['before','after']:
     account=row[label][phase]['MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'];assert account['data_sha256']==h and account['executable']
 assert sum(r['cases']for r in reports)==6636
 assert {r['family']:(r['returncode'],r['cases'],r['mismatches'])for r in commands['runs']}=={n:(0,c,0)for n,c in trades.EXPECTED.items()}
 assert reports==load(P/'runtime/trade-verification.json')
 return {'normalized':431,'raw':100,'unmatched':10,'matched_text_bytes':597536,'new_window':'O0093','ordered_immediate_callees':10,'ordered_typed_references':10,'initializer_slots':120,'trade_cases':6636,'trade_signed_records':13272,'initializer':init_runtime,'whole_elf_equal':False}
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--packet',type=Path,default=HERE);a=ap.parse_args();print(json.dumps(verify(a.packet.resolve()),indent=2))
