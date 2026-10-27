"""Bounded direct-CFG provenance for the input slice object."""
from pathlib import Path
import importlib.util,json,struct,hashlib,collections
P=Path(__file__).resolve().parent;R=P.parents[1];sp=importlib.util.spec_from_file_location('m',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
# Conservative register/stack provenance: only the input slice object, not its data buffer.
def trace(e,start,end,input_register=2):
 work=collections.deque([(start,frozenset({input_register}),frozenset())]);seen=set();stores=[];loads=[];exposures=[];copies=[]
 while work:
  pc,rr,ss=work.popleft();state=pc,rr,ss
  if state in seen:continue
  seen.add(state);reg=set(rr);stack=set(ss)
  if not start<=pc<end:continue
  op,ds,off,imm=struct.unpack_from('<BBhi',e.b,pc);dst=ds&15;src=ds>>4;nxt=pc+8;cl=op&7;args=[]
  if op==0x18:reg.discard(dst);nxt+=8
  elif cl in [4,7]:
   if op&0xf0==0xb0:
    if op&8 and src in reg:reg.add(dst);copies.append((pc,src,dst))
    else:reg.discard(dst)
   elif op&0xf0 in [0,0x10]:
    if dst in reg or (op&8 and src in reg):reg.add(dst)
    else:reg.discard(dst)
   else:reg.discard(dst)
  elif cl==1:
   if src in reg:loads.append((pc,src,off,dst))
   if src==10 and off in stack:reg.add(dst)
   else:reg.discard(dst)
  elif cl in [2,3]:
   if dst in reg:stores.append((pc,dst,off,src if cl==3 else None))
   if dst==10:
    if cl==3 and src in reg:stack.add(off)
    else:stack.discard(off)
  elif cl in [5,6]:
   if op==0x95:continue
   if op in [0x85,0x8d]:
    if reg&{1,2,3,4,5}:exposures.append((pc,sorted(reg&{1,2,3,4,5}),pc+8+imm*8 if op==0x85 else None))
    reg-={0,1,2,3,4,5}
   elif op&0xf0==0:work.append((pc+8+off*8,frozenset(reg),frozenset(stack)));continue
   else:work.append((pc+8+off*8,frozenset(reg),frozenset(stack)))
  work.append((nxt,frozenset(reg),frozenset(stack)))
 return dict(states_examined=len(seen),input_slice_stores=sorted(set(stores)),input_slice_loads=sorted(set(loads)),input_slice_register_copies=sorted(set(copies)),potential_call_argument_exposures=sorted({(pc,tuple(args),target)for pc,args,target in exposures}))

def analyze(symbols_path):
 o=m.Elf(R/'evidence/original/mayhem/deployed.so');n=m.Elf(symbols_path)
 f=next(x for x in n.symbols if x['info']&15==2 and 'external_curve' in x['name']and'try_deserialize_unchecked'in x['name'])
 result={}
 for label,e,a,b in [('original',o,541576,543848),('recovered',n,f['value'],f['value']+f['size'])]:
  t=trace(e,a,b);assert t['input_slice_stores']==[]
  callees=[]
  for _,registers,target in t['potential_call_argument_exposures']:
   assert registers==(3,)
   window=e.window(target,target+416);child=trace(e,target,target+416,3)
   assert not child['input_slice_loads']and not child['input_slice_stores']and not child['potential_call_argument_exposures']
   callees.append(dict(target=target,bytes=416,normalized_sha256=window['normalized_sha256'],trace=child))
  result[label]=dict(sha256=hashlib.sha256(e.b).hexdigest(),start=a,end=b,trace=t,dead_argument_callees=callees)
 assert result['original']['dead_argument_callees'][0]['normalized_sha256']==result['recovered']['dead_argument_callees'][0]['normalized_sha256']
 result['original_short_padding']=trace(o,2752,6104)
 assert result['original_short_padding']['input_slice_stores']==[(4728,9,0,7),(4736,9,8,None)]
 result['limitations']=['Direct-CFG register/stack provenance only, not target execution or complete semantics.','Models the input slice object separately from data, output and stack; arbitrary aliasing is not asserted.','A single incoming r3 exposure is dead in the complete 416-byte callee; other transitive behavior is not proven.']
 return json.loads(json.dumps(result))
if __name__=='__main__':
 import gzip,tempfile
 with tempfile.TemporaryDirectory()as td:
  f=Path(td)/'symbols.so';f.write_bytes(gzip.decompress((P/'artifacts/recovered/symbols.so.gz').read_bytes()));print(json.dumps(analyze(f),indent=2))
