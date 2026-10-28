#!/usr/bin/env python3
"""Read-only integrity and exact whole-window preservation for partial controls."""
from pathlib import Path,PurePosixPath
import difflib,hashlib,importlib.util,io,json,sys,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return json.loads(p.read_text())
def check(ok,msg):
 if not ok:raise ValueError(msg)
def mod(n,p):
 spec=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
def unpack(p):
 out={}
 with tarfile.open(p)as t:
  for i in t:
   n=PurePosixPath(i.name);check(i.isfile()and not n.is_absolute()and '..'not in n.parts and i.name not in out,'invalid source member')
   check((i.uid,i.gid,i.mtime,i.mode,i.uname,i.gname)==(0,0,0,0o644,'',''),'non-deterministic source metadata')
   out[i.name]=t.extractfile(i).read()
 check(len(out)==67,'wrong source count');return out
def verify():
 paths=list(P.rglob('*'));check(not any(p.is_symlink()for p in paths),'symlink');check(all(p.is_file()or p.is_dir()for p in paths),'special file')
 actual={p.relative_to(P).as_posix():sha(p.read_bytes())for p in paths if p.is_file()and p!=P/'manifest.json'}
 check(actual==read(P/'manifest.json'),'manifest mismatch')
 q=mod('partial_matcher',P/'tools/matcher.py');r=mod('partial_reader',P/'tools/reader.py')
 refs=read(P/'reference/external-inputs.json');original_path=R/'evidence/original/mayhem/deployed.so'
 for n,h in refs.items():
  if not n.startswith('work/'):check(sha((R/n).read_bytes())==h,'external input differs: '+n)
 for n,ref in [('tools/matcher.py','research/mayhem-current-macro-call-closure-20261027/verify.py'),('tools/reader.py','research/mayhem-current-macro-call-closure-20261027/reader.py'),('tools/original-windows.json','research/mayhem-current-macro-call-closure-20261027/original-windows.json')]:check(sha((P/n).read_bytes())==refs[ref],'bundled reader input differs')
 check(sha(original_path.read_bytes())==refs['evidence/original/mayhem/deployed.so'],'original hash differs')
 check(sha((P/'reference/qualified436-symbols.so').read_bytes())==refs['work/mayhem-priority-20261027/fast-curve-pr404-qualified436-build/symbols.so'],'parent hash differs')
 original=r.Elf(original_path);before=r.Elf(P/'reference/qualified436-symbols.so');rows=read(P/'tools/original-windows.json')
 ow={x['start']:original.window(x['start'],x['start']+x['bytes'])for x in rows};bw,_=q.tables(before);bg,bpairs,bc,_=q.relation(ow,bw)
 result={}
 for x in ['sweep']:
  D=P/x;launch=read(D/'build/launch.json');built=read(D/'build/result.json')
  check(built['returncode']==0 and built['source_unchanged'],'build failed or source changed')
  check({n:sha(b)for n,b in unpack(D/'source.tar.gz').items()}==launch['source_inputs']==read(D/'source-inputs.json'),'source hashes differ')
  for n in ['candidate','symbols']:check(sha((D/f'build/{n}.so').read_bytes())==built[f'{n}_sha256'],'artifact hash differs')
  source=unpack(D/'source.tar.gz')
  with tarfile.open(R/'research/mayhem-current436-composition-20261027/source.tar.gz')as archive:
   base={member.name:archive.extractfile(member).read()for member in archive if member.isfile()}
  changed=sorted(n for n in source if source[n]!=base[n]);patches=[]
  for prefix in ['', 'programs/mayhem/']:
   patches.append(''.join(''.join(difflib.unified_diff(base[n].decode().splitlines(True),source[n].decode().splitlines(True),fromfile='a/'+prefix+n,tofile='b/'+prefix+n))for n in changed))
  check((D/'source.patch').read_text()in patches,'source patch differs')
  after=r.Elf(D/'build/symbols.so')
  import tempfile
  with tempfile.TemporaryDirectory()as temporary:q.verify_image_pair(r,after,(D/'build/candidate.so').read_bytes(),Path(temporary)/'candidate.so')
  cw,names=q.tables(after);cg,cpairs,cc,_=q.relation(ow,cw)
  out=dict(candidate_symbols_sha256=sha(after.b),normalized=len({a for a,b in cpairs}),raw=0,matched_text=0,direct_closed_windows=len({a for a,b in cc}),gains=[],body_losses=[],raw_losses=[],edge_losses=[],source_losses=[],profile_losses=[],positive_edges=[0,0],positive_sources=[0,0],unmatched=[])
  for row in rows:
   a=row['start'];w=ow[a];old=bg[q.key(w)];new=cg[q.key(w)];rb=any(bw[b]['raw_sha256']==w['raw_sha256']for b in old);rc=any(cw[b]['raw_sha256']==w['raw_sha256']for b in new)
   out['raw']+=rc;out['matched_text']+=row['bytes']if new else 0
   if new and not old:out['gains'].append(row['id'])
   if old and not new:out['body_losses'].append(row['id'])
   if rb and not rc:out['raw_losses'].append(row['id'])
   if not new:out['unmatched'].append(row['id'])
   bp=[q.profile(before,bw[b])for b in old];cp=[q.profile(after,cw[b])for b in new]
   for profile in bp:
    if profile not in cp:out['profile_losses'].append({'id':row['id'],'profile':profile})
   for call in w['direct']:
    if call['target']not in ow:continue
    expected=q.key(ow[call['target']])
    def support(hits,table):return any(any(z['offset']==call['offset']and z['target']in table and q.key(table[z['target']])==expected for z in table[b]['direct'])for b in hits)
    b,c=support(old,bw),support(new,cw);out['positive_edges'][0]+=b;out['positive_edges'][1]+=c
    if b and not c:out['edge_losses'].append([row['id'],call['offset']])
   for data in w['data_references']:
    expected=q.source(original,data['target'])
    if expected is None:continue
    b,c=any(p.get(str(data['offset']))==expected for p in bp),any(p.get(str(data['offset']))==expected for p in cp);out['positive_sources'][0]+=b;out['positive_sources'][1]+=c
    if b and not c:out['source_losses'].append([row['id'],data['offset']])
  check(out==read(D/'preservation.json'),'fresh preservation differs')
  check((out['normalized'],out['raw'],out['direct_closed_windows'])==(436,141,429),'frontier differs')
  check(out['positive_edges']==[4473,4473]and out['positive_sources']==[486,486],'call/Source frontier differs')
  check(not any(out[k]for k in ['gains','body_losses','raw_losses','edge_losses','source_losses','profile_losses']),'preservation failure')
  s=[w for at,w in cw.items()if any('16mayhem_recovered10sweep_fees17' in name for name in names[at])]
  check(len(s)==1,'sweep body is not unique');body=s[0];oldbody=ow[77200]
  check(body['end']-body['start']==8392 and q.key(body)!=q.key(oldbody),'partial Sweep body changed')
  check(len(body['direct'])==51 and [q.key(cw[z['target']])for z in body['direct']]==[q.key(ow[z['target']])for z in oldbody['direct']],'ordered Sweep callees differ')
  from collections import Counter
  check(Counter(q.profile(after,body).values())==Counter(q.profile(original,oldbody).values()),'Sweep Source values differ')
  repeated=read(D/'repeat/result.json');repeat_launch=read(D/'repeat/launch.json')
  check(repeated['returncode']==0 and repeated['source_unchanged'],'repeat build failed or source changed')
  check(repeat_launch['source_inputs']==launch['source_inputs'],'repeat source inputs differ')
  for image_name in ['candidate','symbols']:check(sha((D/f'repeat/{image_name}.so').read_bytes())==repeated[f'{image_name}_sha256'],'repeat artifact hash differs')
  check((D/'build/candidate.so').read_bytes()==(D/'repeat/candidate.so').read_bytes()and (D/'build/symbols.so').read_bytes()==(D/'repeat/symbols.so').read_bytes(),'repeat images differ')
  check(sha((P/'tools/cfg.py').read_bytes())==refs['research/mayhem-amm-sell-cfg-recovery-20261027/cfg.py'],'CFG tool differs')
  g=mod('sweep_cfg',P/'tools/cfg.py');_,ob=g.cfg(original,77200,85600);_,cb=g.cfg(after,body['start'],body['end'])
  pending=[(0,0)];mapping={};conflicts=[]
  while pending:
   a,b=pending.pop()
   if a in mapping:
    if mapping[a]!=b:conflicts.append(['map',a,mapping[a],b])
    continue
   mapping[a]=b
   if [k for k,_ in ob[a]['succ']]!=[k for k,_ in cb[b]['succ']]:conflicts.append(['edge',a,b,ob[a]['succ'],cb[b]['succ']]);continue
   pending.extend((u,v)for(_,u),(_,v)in zip(ob[a]['succ'],cb[b]['succ']))
  differences=[{'original':a,'candidate':b,'original_ops':len(ob[a]['ins']),'candidate_ops':len(cb[b]['ins'])}for a,b in mapping.items()if [i['op']for i in ob[a]['ins']]!=[i['op']for i in cb[b]['ins']]]
  cfg={'original_blocks':len(ob),'candidate_blocks':len(cb),'mapped':len(mapping),'conflicts':conflicts,'opcode_differences':differences}
  check(cfg==read(D/'cfg.json'),'CFG diagnostic differs')
  check(len(ob)==len(cb)==len(mapping)==len(set(mapping.values()))==189 and not conflicts and len(differences)==1,'unexpected CFG comparison')
  result[x]={'normalized':out['normalized'],'raw':out['raw'],'direct_closed_windows':out['direct_closed_windows'],'sweep_bytes':8392,'original_sweep_bytes':8400,'ordered_callees':51,'Source_values':len(q.profile(after,body)),'runtime_qualified':False}
 return result
if __name__=='__main__':print(json.dumps(verify(),indent=2))
