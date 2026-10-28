"""Verify the saved 434-window composition; no compiler, VM, Git or network calls."""
from pathlib import Path,PurePosixPath
from collections import Counter
import argparse,difflib,gzip,hashlib,importlib.util,io,json,tarfile,tempfile
if not __debug__:raise RuntimeError('assertions are required')
P=Path(__file__).resolve().parent;R=P.parents[1];BASE=R/'research/mayhem-source-origin-recovery-20261027';MACRO=R/'research/mayhem-current-macro-call-closure-20261027'
CANDIDATE='66de019be880ca9997d4f37c5c521b8d9efa8ea8bebd31e969623290586b97c2';SYMBOLS='deae63269e24093b477d35b72b62190e812f1d3ec62aa7a8db2f9f751fd2f08c';ORIGINAL='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def manifest():
 files=list(P.rglob('*'));assert not any(p.is_symlink()for p in files);assert all(p.is_file()or p.is_dir()for p in files)
 assert {p.relative_to(P).as_posix():sha(p.read_bytes())for p in files if p.is_file()and p!=P/'manifest.json'}==load(P/'manifest.json')
 for n,h in load(P/'external-inputs.json').items():assert sha((R/n).read_bytes())==h,n

def archive(p):
 files={}
 with tarfile.open(fileobj=io.BytesIO(raw(p)),mode='r:')as t:
  for m in t:
   name=PurePosixPath(m.name);assert m.isfile()and not name.is_absolute()and'..'not in name.parts and str(name)==m.name and m.name not in files;files[m.name]=t.extractfile(m).read()
 return files

def sources():
 q=archive(R/'research/mayhem-initializer-current-recovery-20261027/source.tar.gz')
 q['src/instructions/pump_interface.rs']=raw(R/'research/mayhem-current-ownership-composition-20261027/sources/qualified.rs')
 for n in ['src/state.rs','src/instructions/sell_pump_swap.rs']:q[n]=raw(R/'research/mayhem-sell-current-recovery-20261027/overrides'/n)
 for n in ['src/state.rs','src/instructions/buy_pump_swap.rs']:q[n]=raw(R/'research/mayhem-quotes-current-recovery-20261027/overrides'/n)
 assert {n:sha(b)for n,b in q.items()}==load(R/'research/mayhem-quotes-current-recovery-20261027/source-inputs.json')
 origin=archive(BASE/'source.tar.gz');cp=dict(q);changed=['src/instructions/fee_recipients.rs','src/lib.rs','src/state.rs']
 for n in changed:cp[n]=(R/'research/claude-mayhem-b-20261027/checkpoints/cp4-q04-o0075/overrides'/n).read_bytes()
 assert {n:sha(b)for n,b in cp.items()}==load(R/'research/claude-mayhem-b-20261027/checkpoints/cp4-q04-o0075/source-inputs.json')
 cp['src/instructions/fee_recipients.rs']=(R/'research/claude-fees-final-mayhem-o0073/composition-cp4/fee_recipients.rs').read_bytes();expected=dict(origin)
 for n in changed:
  if origin[n]==q[n]:expected[n]=cp[n];continue
  before=q[n].splitlines(True);edits=[]
  for label,variant in [('origin',origin[n].splitlines(True)),('recovery',cp[n].splitlines(True))]:
   for op,i,j,a,b in difflib.SequenceMatcher(a=before,b=variant,autojunk=False).get_opcodes():
    if op!='equal':edits.append((i,j,variant[a:b],label))
  for i,x in enumerate(edits):
   for y in edits[i+1:]:assert x[3]==y[3]or not(max(x[0],y[0])<min(x[1],y[1])or x[0]==y[0]),'overlapping independent source edits'
  for i,j,new,label in sorted(edits,key=lambda r:r[0],reverse=True):before[i:j]=new
  expected[n]=b''.join(before)
 actual=archive(P/'source.tar.gz');assert len(actual)==67 and actual==expected;assert {n:sha(b)for n,b in actual.items()}==load(P/'composed-inputs.json')
 assert sorted(n for n in actual if actual[n]!=origin[n])==changed
 for n in changed:assert(P/'overrides'/n).read_bytes()==actual[n]
 patch=''.join(''.join(difflib.unified_diff(origin[n].decode().splitlines(True),actual[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in changed);assert patch==(P/'source.patch').read_text()
 return origin,actual

def images(origin,actual):
 observed=load(P/'tools-observed.json');parent=load(BASE/'provenance.json');assert observed['tools']==parent['tools'] and observed['target_library_inventory']==parent['target_library_inventory']
 strips=load(P/'validation/strip-replay.json');assert [r['label']for r in strips]==['control','first','repeat']
 out={};archives=[]
 for label in ['control','first','repeat']:
  d=P/'builds'/label;records=load(d/'builds.json');result=load(d/'result.json');expected=origin if label=='control'else actual
  assert [r['crate']for r in records]==(['anchor_lang','anchor_spl','curve_accounts','mayhem_recovered']if label=='control'else['mayhem_recovered'])
  for r in records:
   assert r['returncode']==0 and r['source_unchanged'] and r['source_inputs']=={n:sha(b)for n,b in expected.items()}
   cmd=r['command'];assert Path(cmd[0]).name=='rustc'and cmd[cmd.index('--target')+1]=='sbpf-solana-solana';assert not any('evidence/original'in x or'deployed.so'in x for x in cmd)
   assert raw(d/(r['crate']+'.stderr.gz')) and not b'exceeded max offset' in raw(d/(r['crate']+'.stderr.gz'))
  out[label]=tuple(raw(d/(n+'.so.gz'))for n in ['candidate','symbols']);assert [sha(b)for b in out[label]]==[result['candidate_sha256'],result['symbols_sha256']]
  assert result['source_unchanged']and result['archives_before']==result['archives_after'];assert result['controller_sha256']==sha((P/'controllers/build.py').read_bytes());archives.append(result['archives_after'])
  strip=next(r for r in strips if r['label']==label);assert strip['returncode']==0 and strip['identical'] and strip['tool_sha256']==observed['tools']['strip']['sha256'] and strip['command'][1]=='--strip-all' and strip['source_sha256']==sha(out[label][1]) and strip['candidate_sha256']==sha(out[label][0])
  inv=load(d/'invocation.json');assert inv['script_sha256']==sha((d/'ordered.ld').read_bytes());assert (d/'ordered.ld').read_bytes()==(BASE/'layout/ordered.ld').read_bytes() and inv['real_sha256']==observed['tools']['linker']['sha256'];assert not any('evidence/original'in x or'deployed.so'in x for x in inv['incoming'])
 assert archives[0]==archives[1]==archives[2];assert out['first']==out['repeat'];assert out['control']==tuple(raw(BASE/'builds/first'/(n+'.so.gz'))for n in ['candidate','symbols'])
 assert [sha(b)for b in out['first']]==[CANDIDATE,SYMBOLS];return out

def static(out):
 v=module('composed_macro',MACRO/'verify.py');m=module('composed_reader',MACRO/'reader.py');rows=load(MACRO/'original-windows.json');assert sha((R/'evidence/original/mayhem/deployed.so').read_bytes())==ORIGINAL
 results={};detail={}
 with tempfile.TemporaryDirectory()as directory:
  t=Path(directory);original=m.Elf(R/'evidence/original/mayhem/deployed.so');ow={r['start']:original.window(r['start'],r['start']+r['bytes'])for r in rows}
  for label in ['control','first']:
   path=t/(label+'.so');path.write_bytes(out[label][1]);e=m.Elf(path);v.verify_image_pair(m,e,out[label][0],t/(label+'-stripped.so'));cw,names=v.tables(e);group,pairs,closed,rounds=v.relation(ow,cw);inventory=[];edges=set();sources=set();profiles={}
   for r in rows:
    a=r['start'];w=ow[a];hits=group[v.key(w)];raw_equal=any(cw[c]['raw_sha256']==w['raw_sha256']for c in hits);ps=[v.profile(e,cw[c])for c in hits];profiles[a]=ps
    inventory.append(dict(id=r['id'],start=a,bytes=r['bytes'],status='raw'if raw_equal else'normalized'if hits else'unmatched',direct_closed=any((a,c)in closed for c in hits),counterparts=[dict(start=c,names=sorted(names[c]))for c in hits]))
    for x in w['direct']:
     if x['target']in ow and any(any(y['offset']==x['offset']and y['target']in cw and v.key(cw[y['target']])==v.key(ow[x['target']])for y in cw[c]['direct'])for c in hits):edges.add((r['id'],x['offset']))
    for x in w['data_references']:
     target=v.source(original,x['target'])
     if target and any(p.get(str(x['offset']))==target for p in ps):sources.add((r['id'],x['offset']))
   partials={}
   for symbol,start,size,calls in [('legacy_sell_handler',127520,12992,50),('sell_v2_handler',159160,18096,48)]:
    selected=[w for a,w in cw.items()if any(symbol in n for n in names[a])];assert len(selected)==1;w=selected[0];original_body=ow[start]
    assert Counter(v.profile(e,w).values())==Counter(v.profile(original,original_body).values())and len(v.profile(e,w))==7
    assert len(w['direct'])==calls and Counter(v.key(cw[x['target']])for x in w['direct'])==Counter(v.key(ow[x['target']])for x in original_body['direct'])
    partials[symbol]={'bytes':w['end']-w['start'],'Source_values_match_original':True,'callee_shape_multiset_matches_original':True,'complete_body_equal':v.key(w)==v.key(original_body)}
    assert not partials[symbol]['complete_body_equal']
   results[label]=dict(counts=dict(Counter(x['status']for x in inventory)),direct_closed=sum(x['direct_closed']for x in inventory),matched_text=sum(x['bytes']for x in inventory if x['status']!='unmatched'),positive_edges=len(edges),positive_Source=len(sources),inventory=inventory,partial_handlers=partials);detail[label]=(edges,sources,profiles)
  b,c=results['control'],results['first'];assert b['counts']=={'raw':141,'normalized':291,'unmatched':9}and c['counts']=={'raw':141,'normalized':293,'unmatched':7};assert(b['direct_closed'],c['direct_closed'])==(422,425);assert(c['positive_edges'],c['positive_Source'],c['matched_text'])==(4371,472,607712)
  for predicate in [lambda x:x['status']!='unmatched',lambda x:x['status']=='raw',lambda x:x['direct_closed']]:assert {x['id']for x in b['inventory']if predicate(x)}<={x['id']for x in c['inventory']if predicate(x)}
  assert detail['control'][0]<=detail['first'][0] and detail['control'][1]<=detail['first'][1]
  assert all(p in detail['first'][2][a]for a,ps in detail['control'][2].items()for p in ps)
  after=t/'first.so';before=t/'control.so';typed={}
  for name in ['buy','sell']:
   mod=module('composed_'+name,BASE/'typed'/(name+'_reader.py'));mod.R=R;x=mod.inspect(after);assert x['whole_body_normalized_equal']and x['typed_data_multiset_equal'];typed[name]=x
  typed['initializer']=module('composed_initializer',BASE/'typed/initializer.py').inspect(R,BASE,before,after)
  typed['nested']=module('composed_nested',R/'research/mayhem-quote-integer-debug-data/reader.py').inspect(original.b,e.b)
 return results,typed

def verify(runtime=True):
 manifest();origin,actual=sources();out=images(origin,actual);measurements,typed=static(out)
 assert measurements==load(P/'static.json')and typed==load(P/'typed.json')
 result=dict(normalized=434,raw=141,normalized_only=293,unmatched=7,unmatched_text=99032,direct_closed=425,positive_edges=4371,positive_Source=472,whole_elf_equal=False)
 if runtime:result['runtime']=module('composed_runtime',P/'runtime_check.py').verify(P,R,out['first'][0])
 return result
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--static-only',action='store_true');a=p.parse_args();print(json.dumps(verify(not a.static_only),indent=2))
