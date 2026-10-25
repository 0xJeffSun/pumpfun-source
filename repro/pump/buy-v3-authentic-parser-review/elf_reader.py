#!/usr/bin/env python3
"""Deterministic read-only ELF/source inventory. No execution or disassembly tool.
Usage: python3 -B analyze.py > residual-ledger.json
Optional: --original FILE --candidate FILE --symbols FILE for a later snapshot.
All interval ends are exclusive. Equality of inferred windows is conditional on
those boundaries; normalization masks ONLY signed direct-call immediates.
"""
from pathlib import Path
import argparse, hashlib, json, struct
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def ranges(indices):
 out=[]
 for n in indices:
  if out and out[-1][1]==n:out[-1][1]+=1
  else:out.append([n,n+1])
 return out
class ELF:
 def __init__(self,path):
  self.path=Path(path);self.b=self.path.read_bytes();b=self.b
  assert b[:6]==b'\x7fELF\x02\x01','requires ELF64 little endian'
  fields=struct.unpack_from('<HHIQQQIHHHHHH',b,16)
  keys=['type','machine','version','entry','phoff','shoff','flags','ehsize','phentsize','phnum','shentsize','shnum','shstrndx']
  self.h=dict(zip(keys,fields));h=self.h
  self.ss=[]
  for i in range(h['shnum']):
   v=struct.unpack_from('<IIQQQQIIQQ',b,h['shoff']+i*h['shentsize'])
   self.ss.append(dict(zip(['name_offset','type','flags','addr','offset','size','link','info','align','entsize'],v),index=i))
  names=self.data(self.ss[h['shstrndx']])
  for s in self.ss:s['name']=self.string(names,s['name_offset']);s['sha256']=H(self.data(s))
  self.ph=[dict(zip(['type','flags','offset','vaddr','paddr','filesz','memsz','align'],struct.unpack_from('<IIQQQQQQ',b,h['phoff']+i*h['phentsize']))) for i in range(h['phnum'])]
  self.syms=[];self.tables={};self.reloc=[]
  for s in self.ss:
   if s['type'] not in (2,11):continue
   tab=[];strings=self.data(self.ss[s['link']]);step=s['entsize'] or 24
   for off in range(s['offset'],s['offset']+s['size'],step):
    n,info,other,shndx,val,size=struct.unpack_from('<IBBHQQ',b,off)
    row=dict(table=s['index'],index=len(tab),name=self.string(strings,n),info=info,other=other,shndx=shndx,value=val,size=size,file_offset=off)
    tab.append(row);self.syms.append(row)
   self.tables[s['index']]=tab
  for s in self.ss:
   if s['type'] not in (4,9):continue
   step=s['entsize'] or (24 if s['type']==4 else 16)
   for off in range(s['offset'],s['offset']+s['size'],step):
    addr,info=struct.unpack_from('<QQ',b,off);idx=info>>32;table=self.tables.get(s['link'],[])
    self.reloc.append(dict(section=s['index'],file_offset=off,offset=addr,type=info&0xffffffff,symbol_index=idx,symbol=table[idx] if idx<len(table) else None,addend=struct.unpack_from('<q',b,off+16)[0] if s['type']==4 else None,raw=b[off:off+step].hex()))
  self.text=next(s for s in self.ss if s['name']=='.text')
 def string(self,b,n):return b[n:b.find(b'\0',n) if b.find(b'\0',n)>=0 else len(b)].decode('utf8','replace')
 def data(self,s):return b'' if s['type']==8 else self.b[s['offset']:s['offset']+s['size']]
 def at(self,addr,n):
  hits=[s for s in self.ss if s['type']!=8 and s['flags']&2 and s['addr']<=addr and addr+n<=s['addr']+s['size']]
  if len(hits)!=1:return None
  s=hits[0];return self.b[s['offset']+addr-s['addr']:s['offset']+addr-s['addr']+n]
 def instructions(self,a,z):
  pc=a
  while pc+8<=z:
   b=self.at(pc,8)
   if b is None:break
   op,reg,off,imm=struct.unpack('<BBhi',b);yield pc,op,reg,off,imm
   pc+=16 if op==0x18 else 8
 def record(self):return dict(size=len(self.b),sha256=H(self.b),header=self.h,header_bytes=self.b[:self.h['ehsize']].hex(),program_headers=self.ph,sections=self.ss,relocations=self.reloc,symbols=self.syms)
def windows(e,symbols=None):
 t=e.text;a=t['addr'];z=a+t['size'];out=[]
 if symbols:
  assert e.data(t)==symbols.data(symbols.text),'symbol text must be byte-identical'
  for sym in symbols.syms:
   if sym['info']&15==2 and a<=sym['value']<z:
    end=sym['value']+sym['size'];out.append(dict(start=sym['value'],end=end,symbol=sym,boundary='ELF STT_FUNC size; zero/overlap retained',status='inventory-only; attribution unresolved'))
 else:
  starts={a};calls=list(e.instructions(a,z))
  for pc,op,reg,off,imm in calls:
   target=pc+8+8*imm
   if op==0x85 and reg==0x10 and not any(pc<=r['offset']<pc+8 for r in e.reloc) and a<=target<z and (target-a)%8==0:starts.add(target)
  starts=sorted(starts)
  for i,s in enumerate(starts):out.append(dict(start=s,end=starts[i+1] if i+1<len(starts) else z,boundary='direct-call-target inferred; may include multiple functions or interior entries',status='inventory-only; attribution unresolved'))
 for i,w in enumerate(out):
  w['id']=i;w['raw_sha256']=None;w['normalized_sha256']=None;w['calls']=[];w['branches']=[];w['data_references']=[]
  if not a<=w['start']<w['end']<=z:continue
  raw=e.at(w['start'],w['end']-w['start']);norm=bytearray(raw)
  w['file_range']=[t['offset']+w['start']-a,t['offset']+w['end']-a];w['raw_sha256']=H(raw)
  for pc,op,reg,off,imm in e.instructions(w['start'],w['end']):
   if op==0x85:
    direct=reg==0x10;target=pc+8+8*imm if direct else None
    rel=[r for r in e.reloc if pc<=r['offset']<pc+8]
    encoded_target=target
    if rel:target=None # loader binding overrides the encoded displacement
    w['calls'].append(dict(pc=pc,bytes=e.at(pc,8).hex(),kind='relocation-bound' if rel else ('signed-relative' if direct else 'external/immediate-unresolved'),encoded_target=encoded_target,target=target,relocations=rel))
    if direct and not rel:norm[pc-w['start']+4:pc-w['start']+8]=bytes(4)
   elif op==0x8d:w['calls'].append(dict(pc=pc,bytes=e.at(pc,8).hex(),kind='indirect-register-unresolved',target=None,relocations=[]))
   elif op&7 in (5,6) and op!=0x95:w['branches'].append(dict(pc=pc,target=pc+8+8*off,bytes=e.at(pc,8).hex(),status='edge only; feasibility unresolved'))
   elif op==0x18 and pc+16<=w['end']:
    high=struct.unpack_from('<I',e.at(pc+8,8),4)[0];val=(imm&0xffffffff)|(high<<32)
    refs=[]
    for s in e.ss:
     if s['flags']&2 and s['addr']<=val<s['addr']+s['size']:
      refs.append(dict(section=s['index'],offset=val-s['addr'],pointee_extent='unknown; not compared',section_sha256=s['sha256']))
    rel=[r for r in e.reloc if pc<=r['offset']<pc+16]
    w['data_references'].append(dict(pc=pc,immediate=val,possible_absolute_sections=refs,relocations=rel,status='relocation/immediate inventory, no inferred object length'))
  w['normalized_sha256']=H(norm);w['normalization']='zero unrelocated signed direct-call immediates only; relocations/data not masked'
  w['relocations']=[r for r in e.reloc if w['start']<=r['offset']<w['end']]
 return out

def analyze(original,candidate,symbols):
 o,c,s=ELF(original),ELF(candidate),ELF(symbols);ow=windows(o);cw=windows(c,s)
 # Retain the initial raw-operand inventory as superseded evidence: relocation
 # placeholders are not actual call destinations or verified entry boundaries.
 a=o.text['addr'];z=a+o.text['size'];provisional={a}
 for pc,op,reg,off,imm in o.instructions(a,z):
  target=pc+8+8*imm
  if op==0x85 and reg==0x10 and a<=target<z and (target-a)%8==0:provisional.add(target)
 starts=sorted(provisional)
 provisional_rows=[dict(id=i,start=v,end=starts[i+1] if i+1<len(starts) else z,status='superseded raw-operand interval; may split on relocated call placeholders',overlapping_corrected_ids=[w['id'] for w in ow if w['start']<(starts[i+1] if i+1<len(starts) else z) and w['end']>v]) for i,v in enumerate(starts)]
 for rows,other,e,oe in [(ow,cw,o,c),(cw,ow,c,o)]:
  rawidx={};normidx={};entry={}
  for q in other:
   if q['raw_sha256']:rawidx.setdefault(q['raw_sha256'],[]).append(q['id'])
   if q['normalized_sha256']:normidx.setdefault(q['normalized_sha256'],[]).append(q['id'])
   entry.setdefault(q['start'],[]).append(q['id'])
  ownentries={}
  for q in rows:ownentries.setdefault(q['start'],[]).append(q)
  for w in rows:
   w['raw_equal_candidates']=rawidx.get(w['raw_sha256'],[]);w['normalized_equal_candidates']=normidx.get(w['normalized_sha256'],[])
   w['category']='ambiguous/unattributed';w['referenced_data_equality']='unresolved';w['semantic_equality']='not established'
   comparisons=[]
   for j in w['normalized_equal_candidates']:
    q=other[j];checks=[]
    for left,right in zip(w['calls'],q['calls']):
     lt=left.get('target');rt=right.get('target');candidates=ownentries.get(lt,[]);opposites=entry.get(rt,[])
     eq=[(x['id'],k) for x in candidates for k in opposites if x['raw_sha256'] and x['raw_sha256']==other[k]['raw_sha256']]
     checks.append(dict(left_pc=left['pc'],right_pc=right['pc'],left_target=lt,right_target=rt,raw_target_window_equal_pairs=eq,status='raw target-window correspondence, boundary conditional' if eq else 'unresolved'))
    comparisons.append(dict(other_id=j,call_checks=checks,actual_call_target_equality='not proven transitively',referenced_data_equality='unresolved'))
   w['normalized_comparisons']=comparisons
   for call in w['calls']:
    call['target_window_ids']=[x['id'] for x in ownentries.get(call.get('target'),[])]
 def gaps(e,rows):
  a=e.text['addr'];z=a+e.text['size'];covered=sorted((max(a,w['start']),min(z,w['end'])) for w in rows if w['end']>w['start']);out=[];cur=a
  for l,h in covered:
   if l>cur:out.append([cur,l])
   cur=max(cur,h)
  if cur<z:out.append([cur,z])
  return out
 n=min(len(o.b),len(c.b));diff=ranges(i for i in range(n) if o.b[i]!=c.b[i]);tails=[]
 if len(o.b)!=len(c.b):tails=[[n,max(len(o.b),len(c.b))]]
 section_diff=[]
 for os in o.ss:
  for cs in c.ss:
   if os['name']==cs['name']:
    x=o.data(os);y=c.data(cs);nn=min(len(x),len(y));rr=ranges(i for i in range(nn) if x[i]!=y[i]);ex=[] if len(x)==len(y) else [[nn,max(len(x),len(y))]]
    section_diff.append(dict(original_index=os['index'],candidate_index=cs['index'],name=os['name'],headers_equal=os==cs,bytes_equal=x==y,mismatch_ranges=rr,excess_ranges=ex,mismatch_count=sum(b-a for a,b in rr+ex)))
 return dict(schema=1,scope='static byte inventory; no original-source or executable equivalence claim',original=o.record(),candidate=c.record(),symbols=s.record(),structural_differences=dict(header_fields={k:[o.h[k],c.h[k]] for k in o.h if o.h[k]!=c.h[k]},program_headers_equal=o.ph==c.ph,original_only_section_indices=[q['index'] for q in o.ss if q['name'] not in {v['name'] for v in c.ss}],candidate_only_section_indices=[q['index'] for q in c.ss if q['name'] not in {v['name'] for v in o.ss}],relocation_records_equal=o.reloc==c.reloc),whole_file_equal=o.b==c.b,positional=dict(common_size=n,mismatch_ranges=diff,excess_tail_ranges=tails,mismatch_count=sum(b-a for a,b in diff+tails)),section_comparisons=section_diff,original_windows=ow,candidate_windows=cw,provisional_raw_operand_intervals=provisional_rows,uncovered_original_text=gaps(o,ow),uncovered_candidate_text=gaps(c,cw),boundary_limits='All original windows are direct-call inferred; no named historical boundary is certified. No symbol row dropped. Other entry mechanisms and undecoded data references remain unresolved.',stopped_scope='All non-BuyV3 windows are inventory-only; stopped handlers/extensions have no semantic inspection or implementation. Symbol names are opaque metadata.',proposed_candidate=None,proposed_candidate_status='not built by authorization; no binary comparison available')
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--original',type=Path,default=P/'review/composition/prior/pump_buy_fee_selection_closure/evidence/original.so');p.add_argument('--candidate',type=Path,default=P/'inputs/binary/candidate.so');p.add_argument('--symbols',type=Path,default=P/'inputs/binary/unstripped.so');args=p.parse_args()
 print(json.dumps(analyze(args.original,args.candidate,args.symbols),sort_keys=True,indent=2))
