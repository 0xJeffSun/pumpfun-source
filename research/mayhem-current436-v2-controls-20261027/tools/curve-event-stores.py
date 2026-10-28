"""Event-memory write-order diagnostic, not a byte identity rule."""
from pathlib import Path
import importlib.util,json,struct,sys,difflib
W=Path(__file__).resolve().parent;D=W/'curve-latest-audit';R=W.parents[1]
def mod(name,p):
 q=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(q);q.loader.exec_module(m);return m
reader=mod('store_reader',R/'research/mayhem-amm-sell-cfg-recovery-20261027/helpers/reader.py');audit=mod('store_audit',R/'research/mayhem-amm-sell-cfg-recovery-20261027/analysis.py')
o=reader.Elf(R/'evidence/original/mayhem/deployed.so');event=o.window(374528,378584)
def extract(e,w,ew):
 calls=[x for x in w['direct']if x['target']==ew['start']];call=calls[0]['pc'];rr={10:0};base=None;writes=[]
 for pc in range(w['start'],call,8):
  op,r,off,k=struct.unpack_from('<BBhi',e.b,pc);d=r&15;s=r>>4
  if op==0xbf:
   if s in rr:rr[d]=rr[s]
   else:rr.pop(d,None)
  elif op==0x07:
   if d in rr:rr[d]+=k
  elif op&7==3 and op&0xe0==0x60:
   if d in rr:writes.append({'at':pc-w['start'],'slot':rr[d]+off,'width':{0:4,8:2,16:1,24:8}[op&0x18]})
  elif op&7==2 and op&0xe0==0x60:
   if d in rr:writes.append({'at':pc-w['start'],'slot':rr[d]+off,'width':{0:4,8:2,16:1,24:8}[op&0x18]})
  elif op==0x85:
   for z in range(6):rr.pop(z,None)
  elif op&7 in(1,4,7)or op==0x18:rr.pop(d,None)
 base=rr[2];writes=[dict(x,offset=x['slot']-base)for x in writes if base<=x['slot']<base+296];last={}
 for x in writes:
  for key,y in list(last.items()):
   if x['offset']<y['offset']+y['width'] and y['offset']<x['offset']+x['width']:del last[key]
  last[(x['offset'],x['width'])]=x
 writes=sorted(last.values(),key=lambda x:x['at'])
 return dict(event_base=base,first_data_call=call-w['start'],writes=writes)
orig=extract(o,o.window(140512,159160),event);out={'original':orig,'controls':{}}
for label in sys.argv[1:]:
 e=reader.Elf(W/(label+'-build/symbols.so'));ws=audit.windows(e);w=audit.named(e,ws,'buy_v2_handler17h');ew=next(z for z in ws.values()if audit.key(z)==audit.key(event));v=extract(e,w,ew);a=[(x['offset'],x['width'])for x in orig['writes']];b=[(x['offset'],x['width'])for x in v['writes']];v.update(positional_write_offsets=sum(x==y for x,y in zip(a,b)),aligned_write_offsets=sum(x.size for x in difflib.SequenceMatcher(a=a,b=b,autojunk=False).get_matching_blocks()),post_clock_offsets=b);out['controls'][label]=v;print(label,'base',v['event_base'],'firstcall',v['first_data_call'],'matchedwrites',v['positional_write_offsets'],v['aligned_write_offsets'])
(D/'buyv2-event-store-order.json').write_text(json.dumps(out,indent=2)+'\n')
