"""Independent bounded static data audit. No compiler, VM, Git or network."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,struct
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
s=importlib.util.spec_from_file_location('pause_windows',P/'window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
sha=lambda b:hashlib.sha256(b).hexdigest()
SPECS={180584:(45672,536,{32:4,80:48,168:4,296:36,472:55,496:32,512:24}),181120:(46208,536,{56:4,104:48,192:4,320:36,472:55,496:32,512:24}),523304:(368176,368,{24:26}),523672:(367808,368,{24:24})}
def obj(b,address,n,index):
 sec=next(x for x in w.m.elf_layout(b)['sections']if x['address']<=address and address+n<=x['address']+x['size']);assert sec['name']in ['.rodata','.data.rel.ro'];raw=w.m.at_address(b,address,n)
 if sec['name']=='.rodata':return dict(bytes=n,kind='literal',hex=raw.hex(),**({'text':raw.decode()}if all(32<=x<127 for x in raw)else {}))
 rel=dict(w.m.relocations(b));out=[]
 for k in range(0,n,8):
  word=raw[k:k+8]
  if rel.get(address+k,0)&0xffffffff!=8:out.append(dict(offset=k,raw=word.hex()));continue
  val=int.from_bytes(word,'little');assert val&0xffffffff==0;ptr=val>>32
  if ptr in index:out.append(dict(offset=k,function_bytes=index[ptr]['bytes'],function_signature=index[ptr]['signature']))
  else:
   assert k+16<=n;size=int.from_bytes(raw[k+8:k+16],'little');assert 0<size<1024;out.append(dict(offset=k,literal=obj(b,ptr,size,index)))
 return dict(bytes=n,kind='relocated_record',fields=out)
def audit(o,c):
 ow=w.windows(o);cw=w.windows(c);oi={x['address']:x for x in ow};ci={x['address']:x for x in cw};rows=[];calls=[]
 for a,(z,n,spec)in SPECS.items():
  assert oi[a]['bytes']==ci[z]['bytes']==n and oi[a]['signature']==ci[z]['signature'];ar={i['offset']:i for i in w.m.instructions(o,a,n)};cr={i['offset']:i for i in w.m.instructions(c,z,n)};orel=dict(w.m.relocations(o));crel=dict(w.m.relocations(c));assert {k for k in ar if orel.get(a+k,0)&0xffffffff==8}==set(spec)=={k for k in cr if crel.get(z+k,0)&0xffffffff==8}
  for k,size in spec.items():
   left=obj(o,ar[k]['lddw_value'],size,oi);right=obj(c,cr[k]['lddw_value'],size,ci);rows.append(dict(original_function=a,offset=k,bytes=size,original=left,candidate=right,equal=left==right))
  for k,i in ar.items():
   if 'call_target'not in i:continue
   info=orel.get(a+k,0)
   if info&0xffffffff==10:
    name=w.dynamic_symbols(o)[info>>32]['name'];other=w.dynamic_symbols(c)[crel[z+k]>>32]['name'];assert name==other;calls.append(dict(original_function=a,offset=k,kind='import',name=name))
   else:
    x,y=oi[i['call_target']],ci[cr[k]['call_target']];assert x['signature']==y['signature'];calls.append(dict(original_function=a,offset=k,kind='local',bytes=x['bytes'],signature=x['signature']))
 # Enum extent is established by the actual reader, not neighboring bytes.
 for b,target in [(o,190160),(c,397616)]:
  i=w.m.instructions(b,target,24)[1];assert i['opcode']==0x61 and i['source']==2 and i['displacement']==0
 for a,shift in [(180584,0),(181120,24)]:
  r={i['offset']:i for i in w.m.instructions(o,a,536)};assert r[344+shift]['immediate']==36 and r[320+shift]['immediate']==6000
 return dict(scope='Four normalized bodies, all16 direct data uses, immediate direct calls and bounded record children only. No recursive data/behavior/build/whole identity claim.',rows=rows,calls=calls,equal_uses=sum(x['equal']for x in rows),unequal_uses=[dict(original_function=x['original_function'],offset=x['offset'])for x in rows if not x['equal']])
def main():
 manifest=json.loads((P/'manifest.json').read_text())
 assert set(manifest)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts}
 for n,h in manifest.items():assert sha((P/n).read_bytes())==h,n
 inputs=json.loads((P/'inputs.json').read_text())['files']
 for n,h in inputs.items():assert sha((ROOT/n).read_bytes())==h,n
 o=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes();name=next(n for n in inputs if n.endswith('symbols.so.gz'));c=gzip.decompress((ROOT/name).read_bytes());r=audit(o,c)
 assert r['equal_uses']==14 and r['unequal_uses']==[dict(original_function=180584,offset=512),dict(original_function=181120,offset=512)]and len(r['rows'])==16 and len(r['calls'])==20
 assert r==json.loads((P/'expected.json').read_text())
 print(json.dumps(r,indent=2))
if __name__=='__main__':main()
