"""Final stores in the inferred296-byte Event object; diagnostic only."""
import struct
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
