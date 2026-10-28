"""Relocation-aware CFG and conservative stack/value-flow diagnostics.

This module does not modify ELF bytes or define function equality. Unknown calls
return conservatively. Only relocation-confirmed abort-family calls and direct
one-instruction wrappers of those calls terminate flow. Direct stack liveness
excludes indirect memory and call writes; field flow is syntactic must-alias
tracking, not a proof of whole-program semantic equivalence.
"""
import collections,struct
sizes={0:4,8:2,16:1,24:8}
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

def access(i):
 cl=i['op']&7;mode=i['op']&0xe0
 if mode!=0x60:return None
 width=sizes[i['op']&0x18]
 if cl==1 and i['src']==10:return ('read',i['offset'],width)
 if cl in(2,3)and i['dst']==10:return ('write',i['offset'],width)
 return None

def stack(ins,blocks):
 accesses=[];slots=collections.defaultdict(lambda:{'reads':[],'writes':[],'widths':set()})
 for p,i in ins.items():
  ac=access(i)
  if not ac:continue
  kind,off,w=ac;slots[off][kind+'s'].append(p);slots[off]['widths'].add(w);accesses.append({'at':p,'kind':kind,'slot':off,'width':w})
 U={};DE={}
 for l,blk in blocks.items():
  use=set();de=set()
  for i in blk['ins']:
   ac=access(i)
   if ac:
    k,o,w=ac;s=set(range(o,o+w))
    if k=='read':use.update(s-de)
    else:de.update(s)
  U[l]=use;DE[l]=de
 IN={l:set()for l in blocks};OUT={l:set()for l in blocks};changed=True
 while changed:
  changed=False
  for l,blk in reversed(list(blocks.items())):
   out=set().union(*(IN[x]for _,x in blk['succ']))if blk['succ']else set();inn=U[l]|(out-DE[l])
   if inn!=IN[l]or out!=OUT[l]:IN[l]=inn;OUT[l]=out;changed=True
 for off,v in slots.items():
  v['widths']=sorted(v['widths']);v['first']=min(v['reads']+v['writes']);v['last']=max(v['reads']+v['writes']);v['live_in_blocks']=[l for l,z in IN.items()if off in z];v['live_out_blocks']=[l for l,z in OUT.items()if off in z]
 return accesses,dict(slots)

names=['trader','global_params','mayhem_state','mint','mayhem_token_vault','mayhem_quote_vault','sol_vault','system_program','quote_token_program','base_token_program','associated_token_program','pool','global_config','quote_mint','pool_base_token_account','pool_quote_token_account','protocol_fee_recipient','protocol_fee_recipient_token_account','pump_swap_event_authority','pump_swap_program','coin_creator_vault_ata','coin_creator_vault_authority','fee_config','fee_program','event_authority','program','pool_v2','buyback_recipient','buyback_recipient_ata']
fields={i*8:n for i,n in enumerate(names)}

def field_reads(blocks):
 initial=({1:('ctx',0),10:('stack',0)},{});incoming={0:initial};pending=collections.deque([0]);observed={};iterations=0
 def merge(a,b):return({r:v for r,v in a[0].items()if b[0].get(r)==v},{r:v for r,v in a[1].items()if b[1].get(r)==v})
 while pending:
  l=pending.popleft();rr,ss=incoming[l];regs=dict(rr);stack=dict(ss);loads=[]
  for i in blocks[l]['ins']:
   op,d,src,o,k=i['op'],i['dst'],i['src'],i['offset'],i['imm'];val=regs.get(src);base=regs.get(d)
   if op==0xbf:
    if val is not None:regs[d]=val
    else:regs.pop(d,None)
   elif op==0x07 and base:regs[d]=(base[0],base[1]+k)
   elif op&7==1:
    width=sizes[op&0x18];v=None
    if val:
     typ,off=val;off+=o
     if typ=='ctx'and off==8:v=('accounts',0)
     elif typ=='accounts'and off in fields:v=(fields[off],0)
     elif typ=='stack':v=stack.get((off,width))
     elif typ!='accounts':
      loads.append({'at':i['at'],'base':typ,'offset':off,'width':width});v=(typ+'@'+str(off),0)
    if v:regs[d]=v
    else:regs.pop(d,None)
   elif op&7 in(2,3)and op&0xe0==0x60:
    if base and base[0]=='stack':
     addr=base[1]+o;width=sizes[op&0x18]
     for key in list(stack):
      if key[0]<addr+width and addr<key[0]+key[1]:del stack[key]
     if op&7==3 and val:stack[(addr,width)]=val
   elif op==0x85:
    for r in range(6):regs.pop(r,None)
   elif op&7 in(4,7)or op==0x18:regs.pop(d,None)
  observed[l]=loads;out=(regs,stack);iterations+=1;assert iterations<5000
  for _,target in blocks[l]['succ']:
   old=incoming.get(target);new=out if old is None else merge(old,out)
   if old!=new:incoming[target]=new;pending.append(target)
 return observed
