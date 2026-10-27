"""Relocation-aware diagnostic CFG; not a byte acceptance matcher."""
import struct
def cfg(e,lo,hi):
 ins={};pc=lo
 while pc<hi:
  op,rs,off,imm=struct.unpack_from('<BBhi',e.b,pc);n=16 if op==0x18 else 8
  ins[pc-lo]={'at':pc-lo,'op':op,'dst':rs&15,'src':rs>>4,'offset':off,'imm':imm,'length':n};pc+=n
 leaders={0};succ={}
 for p,i in ins.items():
  op=i['op'];n=p+i['length'];j=(op&7) in (5,6)
  target=lo+p+8+i['imm']*8
  reloc=e.rel.get(lo+p);target_reloc=e.rel.get(target)
  abort_symbols={'abort','sol_panic_','__rust_abort'}
  trap=op==0x85 and ((reloc is not None and reloc.get('type')==10 and reloc.get('symbol') in abort_symbols) or (reloc is None and 0<=target<len(e.b)-8 and e.b[target]==0x85 and target_reloc is not None and target_reloc.get('type')==10 and target_reloc.get('symbol') in abort_symbols))
  if op==0x95 or trap:
   succ[p]=[]
   if n in ins:leaders.add(n)
  elif j and (op&0xf0)not in (0x80,0x90):
   t=n+i['offset']*8;succ[p]=[('jump',t)]if op==0x05 else [('true',t),('false',n)]
   leaders.update(x for _,x in succ[p]if x in ins)
   if n in ins:leaders.add(n)
  else:continue
 ends=sorted(leaders)+[hi-lo];blocks={};owner={}
 for l,h in zip(ends,ends[1:]):
  xs=[i for p,i in ins.items()if l<=p<h];last=xs[-1];ss=succ.get(last['at'],[('next',h)]if h<hi-lo else[])
  blocks[l]={'start':l,'end':h,'ins':xs,'succ':ss}
  for i in xs:owner[i['at']]=l
 for b in blocks.values():
  b['succ']=[(k,owner[t])for k,t in b['succ']]
 return ins,blocks

