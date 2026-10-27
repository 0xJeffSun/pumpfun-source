"""Instruction-level proof for the main Pump cashback earned helper.

Domain: independent u64 native/stable totals and amount, and a Rust bool.
Memory is valid, aligned and disjoint. Models the returned Result tag and writes;
expect_failed is a terminal panic with its actual referenced UTF-8 message.
Excludes panic internals, source coordinates, callers, VM and whole-ELF equality.
"""
from pathlib import Path
import sys,json,struct,hashlib,time,argparse
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump/deployed.so').is_file())
sys.path[:0]=[str(ROOT/'scripts'),str(ROOT/'work/pump-claim-byte-recovery/z3-runtime')]
import z3
from pump_quote_control_function_match import sections,candidate_functions
from pump_compare_function_bytes import body,normalize
bv=lambda n:z3.BitVecVal(n%(1<<64),64)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
OUT,USER=0x100000,0x200000

def read_data(blob,sec,addr,size):
 for s in sec.values():
  if s['addr'] and s['addr']<=addr and addr+size<=s['addr']+s['size']:
   off=addr-s['addr']+s['offset'];return blob[off:off+size]
 raise AssertionError(('invalid data access',addr,size))

def symbolic(blob,start,size,inputs,panic_target):
 sec=sections(blob);text=sec['.text'];n,s,a,flag=inputs
 r=[bv(0)]*11;r[1],r[2],r[3],r[4]=bv(OUT),bv(USER),a,z3.If(flag,bv(1),bv(0))
 mem={USER+0x40:n,USER+0x50:s,OUT:bv(0xfeed)}
 pending=[(start,r,mem,z3.BoolVal(True),[])];leaves=[]
 def concrete(v):
  v=z3.simplify(v);assert z3.is_bv_value(v),v;return v.as_long()
 while pending:
  pc,r,m,pred,trace=pending.pop();pred=z3.simplify(pred)
  if z3.is_false(pred):continue
  assert start<=pc<start+size and len(trace)<40
  i=pc-text['addr']+text['offset'];op,rs,off,imm=struct.unpack_from('<BBhi',blob,i);dst,src=rs&15,rs>>4;nextpc=pc+8;trace=trace+[pc-start];cond=None
  if op==0x79:r[dst]=m[concrete(r[src])+off]
  elif op==0xbf:r[dst]=r[src]
  elif op==0x0f:r[dst]=r[dst]+r[src]
  elif op==0x07:r[dst]=r[dst]+bv(imm)
  elif op==0xb7:r[dst]=bv(imm)
  elif op==0x57:r[dst]=r[dst]&bv(imm)
  elif op==0xad:cond=z3.ULT(r[dst],r[src])
  elif op==0x55:cond=r[dst]!=bv(imm)
  elif op==0x05:nextpc+=off*8
  elif op==0x18:
   r[dst]=bv((imm&0xffffffff)|(struct.unpack_from('<I',blob,i+12)[0]<<32));nextpc+=8
  elif op in (0x7b,0x7a):
   address=concrete(r[dst])+off;assert address in m
   m[address]=r[src] if op==0x7b else bv(imm)
  elif op==0x85:
   assert src==1 and pc+8+imm*8==panic_target
   message=read_data(blob,sec,concrete(r[1]),concrete(r[2])).decode()
   leaves.append({'condition':pred,'kind':'panic','message':message,'memory':m,'trace':trace});continue
  elif op==0x95:
   leaves.append({'condition':pred,'kind':'return','message':None,'memory':m,'trace':trace});continue
  else:raise AssertionError(('unsupported opcode',op,pc))
  if cond is None:pending.append((nextpc,r,m,pred,trace))
  else:
   pending.append((nextpc+off*8,r.copy(),m.copy(),z3.And(pred,cond),trace))
   pending.append((nextpc,r.copy(),m.copy(),z3.And(pred,z3.Not(cond)),trace))
 return leaves

def check(formula,path):
 solver=z3.Solver();solver.set(timeout=30000);solver.add(formula);path.write_text(solver.to_smt2());t=time.monotonic();r=solver.check()
 return {'result':str(r),'seconds':time.monotonic()-t,'counterexample':str(solver.model()) if r==z3.sat else None}

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--candidate',type=Path,required=True);ap.add_argument('--output',type=Path,required=True);args=ap.parse_args();out=args.output;out.mkdir(exist_ok=True)
 original=ROOT/'evidence/original/pump/deployed.so';obj=Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
 funcs=candidate_functions(args.candidate,str(obj),'.');start,size,_=next(f for f in funcs if 'record_cashback_earned' in f[2]);target,tsize,_=next(f for f in funcs if 'core6option13expect_failed' in f[2]);assert tsize==48
 ob,cb=original.read_bytes(),args.candidate.read_bytes();os,cs=sections(ob),sections(cb)
 # Independently check the masked panic callee's own full instruction body.
 oc=body(ob,os,0x1ac528,48);cc=body(cb,cs,target,48)
 assert normalize(oc,0x1ac528,os)[0]==normalize(cc,target,cs)[0]
 n,s,a=z3.BitVecs('native_total stable_total amount',64);flag=z3.Bool('native');inputs=(n,s,a,flag)
 left=symbolic(ob,0x7bda8,280,inputs,0x1ac528);right=symbolic(cb,start,size,inputs,target)
 mismatch=[]
 for x in left:
  for y in right:
   diff=[z3.BoolVal(x['kind']!=y['kind'] or x['message']!=y['message'])]+[x['memory'][k]!=y['memory'][k] for k in x['memory']]
   mismatch.append(z3.And(x['condition'],y['condition'],z3.Or(*diff)))
 # Also verify each image against the independent checked-u64 specification.
 total=z3.If(flag,n,s);overflow=z3.UGT(z3.ZeroExt(1,total)+z3.ZeroExt(1,a),z3.BitVecVal((1<<64)-1,65));expected=[]
 for leaves in (left,right):
  bad=[]
  for x in leaves:
   if x['kind']=='panic':
    text=z3.If(flag,z3.BoolVal(x['message']=='Overflowing cashback earned'),z3.BoolVal(x['message']=='Overflowing stable cashback earned'))
    diff=z3.Or(z3.Not(overflow),z3.Not(text),x['memory'][USER+0x40]!=n,x['memory'][USER+0x50]!=s,x['memory'][OUT]!=bv(0xfeed))
   else:
    diff=z3.Or(overflow,x['memory'][USER+0x40]!=z3.If(flag,n+a,n),x['memory'][USER+0x50]!=z3.If(flag,s,s+a),x['memory'][OUT]!=bv(2))
   bad.append(z3.And(x['condition'],diff))
  expected.append(z3.Or(*bad))
 queries={'equivalence':z3.Or(*mismatch),'original_specification':expected[0],'candidate_specification':expected[1],'original_coverage':z3.Not(z3.Or(*(x['condition'] for x in left))),'candidate_coverage':z3.Not(z3.Or(*(x['condition'] for x in right)))}
 proofs={name:check(q,out/(name+'.smt2')) for name,q in queries.items()}
 def public(x):return {**x,'condition':str(x['condition']),'memory':{str(k):str(v) for k,v in x['memory'].items()}}
 result={'scope':__doc__,'solver':z3.get_version_string(),'script_sha256':sha(Path(__file__)),'original_sha256':sha(original),'candidate_sha256':sha(args.candidate),'original_start':0x7bda8,'original_bytes':280,'candidate_start':start,'candidate_bytes':size,'original_panic_target':0x1ac528,'candidate_panic_target':target,'panic_callee_normalized_equal':True,'proofs':proofs,'original_paths':[public(x) for x in left],'candidate_paths':[public(x) for x in right]}
 (out/'proof.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(proofs,indent=2));assert all(r['result']=='unsat' for r in proofs.values())
if __name__=='__main__':main()
