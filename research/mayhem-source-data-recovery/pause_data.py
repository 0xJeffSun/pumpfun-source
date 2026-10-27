from pathlib import Path
import gzip,json,importlib.util,sys
P=Path(__file__).resolve().parent;R=P.parents[1]
s=importlib.util.spec_from_file_location('pause_parent',R/'research/mayhem-pause-data-contract/verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v);w=v.w;obj=v.obj
SPECS={};READER=None
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
 for b,target in [(o,190160),(c,READER)]:
  i=w.m.instructions(b,target,24)[1];assert i['opcode']==0x61 and i['source']==2 and i['displacement']==0
 for a,shift in [(180584,0),(181120,24)]:
  r={i['offset']:i for i in w.m.instructions(o,a,536)};assert r[344+shift]['immediate']==36 and r[320+shift]['immediate']==6000
 return dict(scope='Four normalized bodies, all16 direct data uses, immediate direct calls and bounded record children only. No recursive data/behavior/build/whole identity claim.',rows=rows,calls=calls,equal_uses=sum(x['equal']for x in rows),unequal_uses=[dict(original_function=x['original_function'],offset=x['offset'])for x in rows if not x['equal']])

def main():
 global SPECS,READER
 o=(R/'evidence/original/mayhem/deployed.so').read_bytes();c=Path(sys.argv[1]).resolve().read_bytes();out=Path(sys.argv[2]);ow={x['address']:x for x in w.windows(o)};cw=w.windows(c)
 for a,(_,n,refs)in v.SPECS.items():
  matches=[x for x in cw if x['signature']==ow[a]['signature']];assert len(matches)==1,(a,len(matches));SPECS[a]=(matches[0]['address'],n,refs)
 READER={x['offset']:x for x in w.m.instructions(c,SPECS[180584][0],536)}[48]['call_target']
 r=audit(o,c);assert r['equal_uses']==16 and not r['unequal_uses'] and len(r['calls'])==20
 out.write_text(json.dumps(r,indent=2)+'\n');print('PASS: all16 pause/resume data uses and20 immediate calls match')
if __name__=='__main__':main()
