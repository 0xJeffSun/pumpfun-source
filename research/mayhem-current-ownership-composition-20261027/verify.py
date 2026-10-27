"""Read-only verification of current-source Legacy Buy ownership composition."""
from pathlib import Path,PurePosixPath
import difflib,gzip,hashlib,importlib.util,io,json,sys,tarfile,tempfile
from collections import Counter
if not __debug__:raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
CURRENT=ROOT/'research/mayhem-initializer-current-recovery-20261027'
LEGACY=ROOT/'research/mayhem-legacy-buy-cpi-ownership'
EXPECTED={'baseline':'56b4f3202ef42995be28753e05016e75b9015dccc6e13aad13f4d32be1c45f9f','owned':'6d9cfc047e2e1f75f2dba6a090eeae15b04bdef5b6b0b8ee6f85561e60d4343e','scoped':'5b285f86ba4759dab196d04007341f25e7769b0e4deaa82d151505e08fd1e181','scoped-owned':'a027087ba636d9930bb8ef02e255f402e39958bc9c31ee4d23943a825c3dbf7c','qualified':'389dce88e21ed06795b2d15ab837493bb883c32b614b6034ec85ff05d22db6b4','repeat':'389dce88e21ed06795b2d15ab837493bb883c32b614b6034ec85ff05d22db6b4'}
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):
 b=p.read_bytes();return gzip.decompress(b)if p.suffix=='.gz'else b
def load(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def sources():
 out={}
 with tarfile.open(CURRENT/'source.tar.gz','r:gz') as tar:
  for m in tar:
   p=PurePosixPath(m.name);assert m.isfile() and not p.is_absolute() and '..'not in p.parts and m.name not in out
   out[m.name]=tar.extractfile(m).read()
 assert len(out)==67
 return out
def source_forms(v):
 parent=sources();name='src/instructions/pump_interface.rs';before=parent[name].decode();assert before.count(v.OLD)==1
 owned=before.replace(v.OLD,v.NEW,1);a=before.index('pub fn legacy_buy_handler(');b=before.index(' let retained=',a);block=before[a:b]
 for old,new in [(' let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;',''),(' if vt==0{return Err(MayhemError::MathOverflow);}',' let vt=c.virtual_token_reserves as u128;if vt==0{return Err(MayhemError::MathOverflow);}'),(' let price=vs*1_000_000_000_000_000u128/vt;',' let vs=c.virtual_sol_reserves as u128;let price=vs*1_000_000_000_000_000u128/vt;'),(' })();price_check?;',' })();price_check?;let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;')]:
  assert block.count(old)==1;block=block.replace(old,new)
 scoped=before[:a]+block+before[b:];final=scoped.replace(v.OLD,v.NEW,1)
 forms={'baseline':before,'owned':owned,'scoped':scoped,'scoped-owned':final,'qualified':final,'repeat':final}
 for role,text in forms.items():
  assert len(text.splitlines())==len(before.splitlines())
  assert raw(P/f'sources/{role}.rs')==text.encode()
  expected={**parent,name:text.encode()};assert load(P/f'builds/{role}/launch.json')['source_inputs']=={n:sha(b)for n,b in expected.items()}
 patch=''.join(difflib.unified_diff(before.splitlines(True),final.splitlines(True),fromfile='a/'+name,tofile='b/'+name));assert patch.encode()==raw(P/'source.patch')
 return forms
def compute_static(v):
 v.image=lambda n:{'before-candidate':raw(P/'builds/scoped/candidate.so.gz'),'after-candidate':raw(P/'builds/qualified/candidate.so.gz')}[n]
 return v.check_handler_images((ROOT/'evidence/original/mayhem/deployed.so').read_bytes(),raw(P/'builds/scoped/symbols.so.gz'),raw(P/'builds/qualified/symbols.so.gz'))
def verify():
 paths=list(P.rglob('*'));assert not any(p.is_symlink() for p in paths);assert all(p.is_dir()or p.is_file()for p in paths)
 assert {str(p.relative_to(P)):sha(p.read_bytes())for p in paths if p.is_file()and p!=P/'manifest.json'}==load(P/'manifest.json')
 for n,h in load(P/'external-inputs.json').items():assert sha((ROOT/n).read_bytes())==h
 v=module('ownership_parent',LEGACY/'verify.py');source_forms(v)
 for role,h in EXPECTED.items():
  d=P/'builds'/role;r=load(d/'result.json');launch=load(d/'launch.json');assert r['returncode']==0 and r['source_unchanged'];assert sha(raw(d/'candidate.so.gz'))==r['candidate_sha256']==h;assert sha(raw(d/'symbols.so.gz'))==r['symbols_sha256']
  if role in ['qualified','repeat']:
   assert r['bound_inputs_unchanged'];assert sha(raw(P/'layout/ordered.ld'))in launch['bound_inputs'].values()
  else:assert r['tools_unchanged']and r['target_libraries_unchanged'] and r['root_rustc_invocations']==1
  cmd=launch['command'];assert cmd[cmd.index('--target')+1]=='sbpf-solana-solana'
  if role in ['baseline','owned','scoped','scoped-owned']:
   reader=module('control_reader',CURRENT/'reader.py')
   with tempfile.TemporaryDirectory() as tmp:
    a=Path(tmp)/'symbols';b=Path(tmp)/'stripped';a.write_bytes(raw(d/'symbols.so.gz'));b.write_bytes(raw(d/'candidate.so.gz'));e=reader.Elf(a);c=reader.Elf(b)
    table=v.windows(e);f=[x for x in e.symbols if 'legacy_buy_handler' in x['name']];assert len(f)==1;w=table[f[0]['value']];record=load(P/f'analysis/{role}.json')
    assert record['bytes']==w['end']-w['start']=={'baseline':13680,'owned':13704,'scoped':13760,'scoped-owned':13784}[role]
    assert record['candidate_sha256']==h and record['symbols_sha256']==sha(e.b)
    o=reader.Elf(ROOT/'evidence/original/mayhem/deployed.so');rows=v.load(LEGACY/'inputs/parent-audit.json')['rows'];ow={r['start']:o.window(r['start'],r['end'])for r in rows};original=ow[113672]
    source_equal=v.source_profile(e,w)==v.source_profile(o,original);calls_equal=Counter(v.key(table[d['target']])for d in w['direct'])==Counter(v.key(ow[d['target']])for d in original['direct'])
    assert record=={'bytes':w['end']-w['start'],'candidate_sha256':h,'symbols_sha256':sha(e.b),'calls':len(w['direct']),'Source_profile_equal':source_equal,'callee_shapes_equal':calls_equal}
    assert source_equal and calls_equal and len(w['direct'])==50
    for sec in e.sections:
     if sec['flags']&2 and sec['type']!=8:
      other=c.sec[sec['name']];assert e.b[sec['offset']:sec['offset']+sec['size']]==c.b[other['offset']:other['offset']+other['size']]
 for n in ['candidate.so.gz','symbols.so.gz']:assert raw(P/'builds/qualified'/n)==raw(P/'builds/repeat'/n)
 static=compute_static(v);assert static==load(P/'static.json')
 a=[(x['target_bytes'],x['target_normalized_sha256'])for x in static['callers']['original']['calls']];b=[(x['target_bytes'],x['target_normalized_sha256'])for x in static['callers']['after']['calls']]
 assert load(P/'call-order.json')=={'equal':a==b,'ordered_matches':sum(x.size for x in difflib.SequenceMatcher(a=a,b=b,autojunk=False).get_matching_blocks()),'original_calls':len(a),'candidate_calls':len(b)}
 progress=module('ownership_current_progress',CURRENT/'progress.py').compare((ROOT/'evidence/original/mayhem/deployed.so').read_bytes(),raw(CURRENT/'builds/current/symbols.so.gz'),raw(P/'builds/qualified/symbols.so.gz'))
 saved=load(P/'analysis/progress.json');saved.pop('preserved');assert progress==saved
 assert progress['matches']==430 and progress['raw_matches']==100 and not progress['gains'] and not progress['body_losses']
 v.HASHES['after-candidate']=EXPECTED['qualified'];report=load(P/'runtime/buy.json.gz');runtime=v.check_runtime(report,load(LEGACY/'cases.json')['cases'])
 may='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
 for n,h in report['harness_sha256'].items():assert sha((ROOT/n).read_bytes())==h
 for row in report['cases']:
  for side,h in [('original',report['original_sha256']),('candidate',EXPECTED['qualified'])]:
   for phase in ['before','after']:assert row[side][phase][may]['data_sha256']==h and row[side][phase][may]['executable']
 assert runtime==load(P/'runtime/verification.json')
 return {'normalized':430,'raw':100,'new_complete_matches':0,'handler_bytes':13784,'original_handler_bytes':13848,'preserved_actual_calls':50,'Source_records':7,'CPI_origin':313,'repeat_identical':True,'runtime':runtime,'whole_elf_equal':False}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
