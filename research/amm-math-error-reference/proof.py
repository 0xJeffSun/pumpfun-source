"""Bounded original machine-body, direct-call and typed root-reference check."""
from pathlib import Path
from functools import lru_cache
import gzip,hashlib,importlib.util,json,struct
P=Path(__file__).resolve().parent;R=P.parents[1]
s=importlib.util.spec_from_file_location('amm_math_windows',R/'research/fees-composed-frontier188/window_map.py')
w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
sha=lambda b:hashlib.sha256(b).hexdigest()
def require(condition,reason):
 if not condition:raise AssertionError(reason)
def u64(image,addr):return int.from_bytes(w.m.at_address(image,addr,8),'little')
def pointer(image,addr):
 require(dict(w.m.relocations(image)).get(addr,0)&0xffffffff==8,'actual type8 data relocation')
 value=u64(image,addr);require(value&0xffffffff==0,'encoded data pointer low half');return value>>32

def compare(original,candidate):
 ow={n['address']:n for n in w.windows(original)};cw={n['address']:n for n in w.windows(candidate)}
 roots=[(addr,next(n['address']for n in cw.values()if n['name']and name in n['name']))for addr,name in [(0x12310,'14base_for_quote'),(0x123a0,'12base_for_buy')]]
 for a,b in roots:require(ow[a]['signature']==cw[b]['signature'],'complete root body')
 oa,ca=roots[1];oi={r['offset']:r for r in w.m.instructions(original,oa,1184)};ci={r['offset']:r for r in w.m.instructions(candidate,ca,1184)}
 expected=[232,280,376,432,480,576,624,648,664,784,1040]
 require([o for o,r in oi.items()if 'lddw_value'in r]==expected and [o for o,r in ci.items()if 'lddw_value'in r]==expected,'all root pointer sites enumerated')
 refs=[];method_roots=[]
 for offset in expected:
  a,b=oi[offset]['lddw_value'],ci[offset]['lddw_value']
  require(dict(w.m.relocations(original)).get(oa+offset,0)&0xffffffff==8 and dict(w.m.relocations(candidate)).get(ca+offset,0)&0xffffffff==8,'actual instruction pointer relocations')
  row=dict(offset=offset,original=a,candidate=b)
  if offset in [232,376,432,576]:
   # Enum discriminant passed to the same complete Display/from routine.
   size=4;value=w.m.at_address(original,a,size);require(value==w.m.at_address(candidate,b,size),'error discriminant')
   require(int.from_bytes(value,'little')==(24 if offset in [232,376] else 25),'Truncation/DivisionByZero variant')
   row.update(kind='error_discriminant',value=value.hex(),bytes=size)
  elif offset in [280,480,648]:
   size=48 if offset in [280,480] else 32
   layout=w.m.at_address(original,a+8,16);require(layout==w.m.at_address(candidate,b+8,16),'vtable size/alignment')
   require(struct.unpack('<QQ',layout)==((24,8)if size==48 else(0,1)),'typed table layout')
   slots=[0,24,32,40]if size==48 else[0,24];methods=[]
   for slot in slots:
    x,y=pointer(original,a+slot),pointer(candidate,b+slot)
    require(x in ow and y in cw and ow[x]['signature']==cw[y]['signature'],'actual vtable method body')
    method_roots.append((x,y));methods.append(dict(slot=slot,original=x,candidate=y))
   row.update(kind='vtable',bytes=size,layout=layout.hex(),methods=methods)
  elif offset==664:
   x,y=pointer(original,a),pointer(candidate,b);tail=w.m.at_address(original,a+8,16)
   require(tail==w.m.at_address(candidate,b+8,16),'panic Location length/line/column')
   length,line,column=struct.unpack('<QII',tail);value=w.m.at_address(original,x,length)
   require(value==w.m.at_address(candidate,y,length),'actual panic Location filename')
   row.update(kind='panic_location',filename=value.decode(),line=line,column=column,bytes=24)
  else:
   size=55 if offset==624 else 47;value=w.m.at_address(original,a,size)
   require(value==w.m.at_address(candidate,b,size),'actual string referent')
   row.update(kind='panic_message'if offset==624 else'source_filename',bytes=size,value=value.decode())
  refs.append(row)
 # Exact, straight-line Source construction through the call boundary. Raw-equal
 # scalar/store instructions bind pointer, length, line and error discriminant.
 sources=[]
 for start,line,error in [(784,85,6025),(1040,87,6024)]:
  seq=[(16,0x7b,10,1,-272,0),(24,0x62,10,0,-128,error),(32,0x72,10,0,-200,2),(40,0x62,10,0,-256,line),(48,0x7a,10,0,-264,47),(56,0x7a,10,0,-280,0)]
  for delta,op,dst,src,disp,imm in seq:
   for rows in [oi,ci]:
    r=rows[start+delta];require((r['opcode'],r['destination'],r['source'],r['displacement'],r['immediate'])==(op,dst,src,disp,imm),'typed Source construction')
  require(oi[start]['destination']==ci[start]['destination']==1,'Source pointer register')
  require(oi[start+96]['call_target'] and ci[start+96]['call_target'],'Source conversion call')
  sources.append(dict(offset=start,line=line,error=error,filename=next(r['value']for r in refs if r['offset']==start)))
 pending=roots+method_roots;seen=set();edges=[];syscalls=[]
 while pending:
  a,b=pending.pop()
  if (a,b)in seen:continue
  seen.add((a,b));require(ow[a]['signature']==cw[b]['signature'],'recursive direct callee body')
  aa=w.m.instructions(original,a,ow[a]['bytes']);bb=w.m.instructions(candidate,b,cw[b]['bytes'])
  require(len(aa)==len(bb),'callee instruction count')
  for x,y in zip(aa,bb):
   if x['opcode']!=0x85:continue
   require(x['source']==y['source']==1,'unexpected indirect CALL in bounded traversal')
   ra=dict(w.m.relocations(original)).get(a+x['offset'],0);rb=dict(w.m.relocations(candidate)).get(b+y['offset'],0)
   if ra&0xffffffff==10 or rb&0xffffffff==10:
    # window signature includes resolved imported syscall name.
    require(ra&0xffffffff==rb&0xffffffff==10,'syscall classification');syscalls.append([a,b,x['offset']]);continue
   ta,tb=x['call_target'],y['call_target'];require(ta in ow and tb in cw,'complete direct target')
   edges.append([a,b,x['offset'],ta,tb]);pending.append((ta,tb))
 return dict(original_sha256=sha(original),candidate_symbol_sha256=sha(candidate),roots=[list(p)for p in roots],typed_references=refs,source_records=sources,reachable_pairs=len(seen),direct_edges=edges,imported_calls=syscalls,scope='All 11 pointer sites in base_for_buy only; two full roots and bounded direct callees plus root vtable methods. Transitive data and other indirect dispatch are not closed.')

def all_builds():
 original=(R/'evidence/original/pump_amm/deployed.so').read_bytes()
 return {b['label']:compare(original,gzip.decompress((P/'public'/b['label']/'unstripped.so.gz').read_bytes()))for b in json.loads((P/'builds.json').read_bytes())}
if __name__=='__main__':print(json.dumps(all_builds(),indent=2))
