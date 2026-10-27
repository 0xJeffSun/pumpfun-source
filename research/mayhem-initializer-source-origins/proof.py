"""Bound the initializer Source correction without enlarging body masks."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,struct,tempfile
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
raw=lambda p:gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def key(w):return(w['end']-w['start'],w['normalized_sha256'],w['normalization_pattern'])
def source(e,p):
 assert e.rel[p]['type']==8;z,q=struct.unpack_from('<II',e.b,p);assert not z;n,line,col=struct.unpack_from('<QII',e.b,p+8);assert n==37
 text=e.b[q:q+n];assert text==b'programs/mayhem-program/src/state.rs\0'
 return dict(filename=text.decode(),line=line,column=col,descriptor_bytes=24,filename_bytes=n)
def initializer(e):
 s=next(s for s in e.symbols if 'state10initialize17' in s['name']);return e.window(s['value'],s['value']+s['size'])
def records(e,w):
 out={}
 for d in w['data_references']:
  p=d['target']
  if p not in e.rel:continue
  _,q=struct.unpack_from('<II',e.b,p);n=struct.unpack_from('<Q',e.b,p+8)[0]
  if n!=37 or e.b[q:q+n]!=b'programs/mayhem-program/src/state.rs\0':continue
  op,reg,_,_=struct.unpack_from('<BBhi',e.b,w['start']+d['offset']);assert op==0x18 and reg in (1,5)
  call=next(c for c in w['direct']if c['offset']==d['offset']+16)
  out['overflow'if reg==1 else'unwrap']=dict(offset=d['offset'],target=p,call_offset=call['offset'],call_target=call['target'],value=source(e,p))
 assert set(out)=={'overflow','unwrap'};return out
def generate(root):
 root=Path(root);reader=module('source_elf',P/'reader.py');progress=module('source_progress',P/'progress.py');deltas=[];pairs={}
 with tempfile.TemporaryDirectory()as td:
  t=Path(td);original=reader.Elf(root/'evidence/original/mayhem/deployed.so');ow=original.window(534840,535800);orefs=records(original,ow)
  for name in ['baseline','recovered','repeat','unqualified-baseline','unqualified']:
   for kind in ['candidate','symbols']:(t/(name+'-'+kind)).write_bytes(raw(P/f'artifacts/{name}/{kind}.so.gz'))
   pairs[name]={kind:reader.Elf(t/(name+'-'+kind))for kind in ['candidate','symbols']}
  before,after=pairs['baseline']['symbols'],pairs['recovered']['symbols'];bw,cw=initializer(before),initializer(after);br,cr=records(before,bw),records(after,cw)
  assert key(bw)==key(cw)and cw['end']-cw['start']==920 and key(ow)!=key(cw)
  for role in orefs:assert orefs[role]['value']==cr[role]['value']and orefs[role]['value']!=br[role]['value']
  assert(cr['overflow']['value']['line'],cr['overflow']['value']['column'])==(532,32)
  assert(cr['unwrap']['value']['line'],cr['unwrap']['value']['column'])==(531,43)
  # Authenticate the overflow callee beyond its ambiguous normalized panic shape.
  for e,w in [(original,orefs),(after,cr)]:
   callee=e.window(w['overflow']['call_target'],w['overflow']['call_target']+88);ref=next(r for r in callee['data_references']if r['offset']==8);p=ref['target'];_,q=struct.unpack_from('<II',e.b,p);n=struct.unpack_from('<Q',e.b,p+8)[0];assert n==28 and e.b[q:q+n]==b'attempt to add with overflow'
  for family,oldname,newname in [('qualified','baseline','recovered'),('unqualified','unqualified-baseline','unqualified')]:
   for kind in ['candidate','symbols']:
    a,b=pairs[oldname][kind],pairs[newname][kind];assert len(a.b)==len(b.b);changes=[dict(offset=i,before=x,after=y)for i,(x,y)in enumerate(zip(a.b,b.b))if x!=y];assert len(changes)==3
    wa,wb=initializer(pairs[oldname]['symbols']),initializer(pairs[newname]['symbols']);ra,rb=records(pairs[oldname]['symbols'],wa),records(pairs[newname]['symbols'],wb)
    expected=[]
    for role in ra:
     assert ra[role]['target']==rb[role]['target'];base=ra[role]['target']
     for off,field in [(16,'line'),(20,'column')]:
      aa=struct.pack('<I',ra[role]['value'][field]);bb=struct.pack('<I',rb[role]['value'][field]);expected += [dict(offset=base+off+i,before=x,after=y)for i,(x,y)in enumerate(zip(aa,bb))if x!=y]
    assert changes==sorted(expected,key=lambda x:x['offset']);assert a.b[a.lo:a.hi]==b.b[b.lo:b.hi]
    deltas.append(dict(family=family,kind=kind,before_sha256=sha(a.b),after_sha256=sha(b.b),bytes=len(a.b),changes=changes,text_unchanged=True,text_sha256=sha(b.b[b.lo:b.hi])))
  for kind in ['candidate','symbols']:assert pairs['recovered'][kind].b==pairs['repeat'][kind].b
  preserved=progress.compare(original.b,before.b,after.b)
 result=dict(original_sha256=sha(original.b),candidate_sha256=sha(pairs['recovered']['candidate'].b),symbols_sha256=sha(after.b),initializer_original=[ow['start'],ow['end']],initializer_candidate=[cw['start'],cw['end']],initializer_body_unchanged=True,initializer_original_body_equal=False,records=[dict(role=k,original=orefs[k],before=br[k],after=cr[k],equal_after=True)for k in orefs],elf_deltas=deltas,preservation=preserved,scope='Two Source descriptors corrected. Four complete-ELF comparisons each change exactly three descriptor bytes; .text is identical. The initializer remains920/960bytes and whole-original-ELF identity is not claimed.')
 return result
if __name__=='__main__':
 import argparse
 p=argparse.ArgumentParser();p.add_argument('--repository-root',type=Path,required=True);p.add_argument('--check',action='store_true');a=p.parse_args();data=(json.dumps(generate(a.repository_root),indent=2)+'\n').encode();dest=P/'proof.json'
 if a.check:assert dest.read_bytes()==data
 else:dest.write_bytes(data)
 print(json.loads(data)['preservation'])
