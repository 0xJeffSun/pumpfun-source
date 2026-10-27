"""All-input equivalence of the two day-index helper instruction windows.

Models only their supported SBF opcodes, valid global-struct memory, and terminal
panic kind/message. Does not model panic allocation, source locations, the caller,
transaction execution, or whole-contract behavior. Equality here is not ELF equality.
"""
from pathlib import Path
import sys,json,struct,hashlib,time,argparse
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'work/pump-claim-byte-recovery/z3-runtime'))
sys.path.insert(0,str(ROOT/'scripts'))
import z3
from pump_quote_control_function_match import sections,candidate_functions
MASK=(1<<64)-1
bv=lambda x:z3.BitVecVal(x&MASK,64)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()

def symbolic(blob,start,size,inputs,panic_targets):
 sec=sections(blob);text=sec['.text'];regs=[bv(0)]*11;regs[1]=bv(0x100000);regs[10]=bv(0x70000000)
 memory={0x100000+512:inputs[0],0x100000+520:inputs[1],0x100000+528:inputs[2]}
 stack=[(regs,start,z3.BoolVal(True),[])];leaves=[];divzero=[]
 def concrete(x):
  x=z3.simplify(x);assert z3.is_bv_value(x),x;return x.as_long()
 def string(addr,n):
  addr,n=concrete(addr),concrete(n)
  for s in sec.values():
   if s['addr'] and s['addr']<=addr and addr+n<=s['addr']+s['size']:
    p=addr-s['addr']+s['offset'];return blob[p:p+n].decode()
  raise AssertionError(('invalid message pointer',addr,n))
 while stack:
  r,pc,pred,trace=stack.pop()
  pred=z3.simplify(pred)
  if z3.is_false(pred):continue
  assert len(trace)<100 and start<=pc<start+size
  i=pc-text['addr']+text['offset'];op,regs_,off,imm=struct.unpack_from('<BBhi',blob,i);dst,src=regs_&15,regs_>>4;nxt=pc+8;trace=trace+[pc-start]
  cond=None
  if op==0x79:r[dst]=memory[concrete(r[src])+off]
  elif op==0xbf:r[dst]=r[src]
  elif op==0x07:r[dst]=r[dst]+bv(imm)
  elif op==0x18:
   r[dst]=bv((imm&0xffffffff)|(struct.unpack_from('<I',blob,i+12)[0]<<32));nxt+=8
  elif op==0xb7:r[dst]=bv(imm)
  elif op==0x65:cond=r[dst]>bv(imm)
  elif op==0xad:cond=z3.ULT(r[dst],r[src])
  elif op==0x15:cond=r[dst]==bv(imm)
  elif op==0x55:cond=r[dst]!=bv(imm)
  elif op==0x05:nxt+=off*8
  elif op==0x1f:r[dst]=r[dst]-r[src]
  elif op==0x3f:
   divzero.append(z3.And(pred,r[src]==bv(0)));r[dst]=z3.UDiv(r[dst],r[src])
  elif op==0x85:
   assert src==1;target=pc+8+imm*8;assert target in panic_targets
   leaves.append({'condition':pred,'kind':panic_targets[target],'message':string(r[1],r[2]),'trace':trace});continue
  elif op==0x95:
   leaves.append({'condition':pred,'kind':'return','value':r[0],'trace':trace});continue
  else:raise AssertionError(('unimplemented opcode',hex(op),hex(pc)))
  if cond is not None:
   stack.append((r.copy(),nxt+off*8,z3.And(pred,cond),trace))
   stack.append((r.copy(),nxt,z3.And(pred,z3.Not(cond)),trace))
  else:stack.append((r,nxt,pred,trace))
  assert len(stack)+len(leaves)<128
 return leaves,divzero

def check(formula,path):
 s=z3.Solver();s.set(timeout=30000);s.add(formula);path.write_text(s.to_smt2());t=time.monotonic();result=s.check()
 return {'result':str(result),'elapsed_seconds':time.monotonic()-t,'counterexample':str(s.model()) if result==z3.sat else None}

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--candidate',type=Path,default=ROOT/'work/pump-claim-byte-recovery/final/unstripped.so');parser.add_argument('--output',type=Path,default=ROOT/'work/pump-claim-byte-recovery/day-symbolic');args=parser.parse_args()
 out=args.output;out.mkdir(exist_ok=True)
 original=ROOT/'evidence/original/pump/deployed.so';candidate=args.candidate;obj=Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump';funcs=candidate_functions(candidate,str(obj),'.')
 a,n,_=next(x for x in funcs if 'volume_accumulator7end_day17h' in x[2]);panics={address:('conversion-panic' if 'unwrap_failed' in name else 'schedule-panic') for address,_,name in funcs if 'core6result13unwrap_failed' in name or 'core6option13expect_failed' in name}
 inputs=z3.BitVecs('start_time end_time seconds_in_a_day',64)
 left,ld=symbolic(original.read_bytes(),0x7dfc8,232,inputs,{0x1ace18:'conversion-panic',0x1ac528:'schedule-panic'})
 right,rd=symbolic(candidate.read_bytes(),a,n,inputs,panics)
 mismatch=[]
 for x in left:
  for y in right:
   different=z3.BoolVal(x['kind']!=y['kind'] or x.get('message')!=y.get('message'))
   if x['kind']==y['kind']=='return':different=x['value']!=y['value']
   mismatch.append(z3.And(x['condition'],y['condition'],different))
 proofs={
  'no_mismatch':check(z3.Or(*mismatch),out/'mismatch.smt2'),
  'original_paths_cover_all_inputs':check(z3.Not(z3.Or(*(x['condition'] for x in left))),out/'original-coverage.smt2'),
  'candidate_paths_cover_all_inputs':check(z3.Not(z3.Or(*(x['condition'] for x in right))),out/'candidate-coverage.smt2'),
  'no_reachable_divide_by_zero':check(z3.Or(*(ld+rd)),out/'division-by-zero.smt2'),
 }
 def public(x):return {k:str(v) if k in ('condition','value') else v for k,v in x.items()}
 record={'scope':__doc__,'solver':z3.get_version_string(),'script_sha256':sha(Path(__file__)),'objdump_sha256':sha(obj),'original_sha256':sha(original),'candidate_sha256':sha(candidate),'original_start':0x7dfc8,'candidate_start':a,'candidate_bytes':n,'original_panic_targets':{str(k):v for k,v in {0x1ace18:'conversion-panic',0x1ac528:'schedule-panic'}.items()},'candidate_panic_targets':{str(k):v for k,v in panics.items()},'input_domain':'Three independent 64-bit bit-vectors, interpreted as signed i64 fields at conversion guards.','proofs':proofs,'original_paths':[public(x) for x in left],'candidate_paths':[public(x) for x in right]}
 (out/'proof.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(proofs,indent=2));assert all(p['result']=='unsat' for p in proofs.values())
if __name__=='__main__':main()
