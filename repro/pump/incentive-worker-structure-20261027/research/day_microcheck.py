"""Bounded execution of the two straight-line SBF day-index helpers.

Only the decoded opcodes present in these helpers are implemented. Panic calls
are terminal outcomes identified by their captured callee and message. This is
an independent function-level check, not a general SBF VM or transaction test.
Source-location metadata and panic allocator behavior are outside its scope.
"""
from pathlib import Path
import sys,json,struct,hashlib,itertools,random,argparse
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
from pump_quote_control_function_match import sections,candidate_functions
MASK=(1<<64)-1
signed=lambda x:x if x<1<<63 else x-(1<<64)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()

def run(blob,start,size,values,panic_targets):
 sec=sections(blob);text=sec['.text'];r=[0]*11;r[1]=0x100000;r[10]=0x70000000
 memory={r[1]+512:values[0]&MASK,r[1]+520:values[1]&MASK,r[1]+528:values[2]&MASK}
 pc=start;visited=[]
 def string(addr,n):
  for s in sec.values():
   if s['addr'] and s['addr']<=addr and addr+n<=s['addr']+s['size']:
    p=addr-s['addr']+s['offset'];return blob[p:p+n].decode()
  raise AssertionError(('invalid message address',addr,n))
 for step in range(100):
  assert start<=pc<start+size,('outside helper',pc)
  i=pc-text['addr']+text['offset'];op,regs,off,imm=struct.unpack_from('<BBhi',blob,i);dst,src=regs&15,regs>>4;visited.append(pc-start);nxt=pc+8
  if op==0x79:r[dst]=memory[r[src]+off]
  elif op==0xbf:r[dst]=r[src]
  elif op==0x07:r[dst]=(r[dst]+imm)&MASK
  elif op==0x18:
   r[dst]=(imm&0xffffffff)|(struct.unpack_from('<I',blob,i+12)[0]<<32);nxt+=8
  elif op==0xb7:r[dst]=imm&MASK
  elif op==0x65:
   if signed(r[dst])>imm:nxt+=off*8
  elif op==0xad:
   if r[dst]<r[src]:nxt+=off*8
  elif op==0x15:
   if r[dst]==(imm&MASK):nxt+=off*8
  elif op==0x55:
   if r[dst]!=(imm&MASK):nxt+=off*8
  elif op==0x05:nxt+=off*8
  elif op==0x1f:r[dst]=(r[dst]-r[src])&MASK
  elif op==0x3f:
   assert r[src]!=0;r[dst]//=r[src]
  elif op==0x85:
   assert src==1;target=pc+8+imm*8;assert target in panic_targets,(target,panic_targets)
   return {'kind':panic_targets[target],'message':string(r[1],r[2])},visited
  elif op==0x95:return {'kind':'return','value':r[0]},visited
  else:raise AssertionError(('unimplemented opcode',hex(op),hex(pc)))
  pc=nxt
 raise AssertionError('step limit')

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--candidate',type=Path,default=ROOT/'work/pump-claim-byte-recovery/final/unstripped.so');parser.add_argument('--output',type=Path,default=ROOT/'work/pump-claim-byte-recovery/day-microcheck.json');args=parser.parse_args()
 original=ROOT/'evidence/original/pump/deployed.so';candidate=args.candidate
 ob,cb=original.read_bytes(),candidate.read_bytes();obj=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
 funcs=candidate_functions(candidate,obj,'.');a,n,_=next(x for x in funcs if 'volume_accumulator7end_day17h' in x[2]);panics={address:('conversion-panic' if 'unwrap_failed' in name else 'schedule-panic') for address,_,name in funcs if 'core6result13unwrap_failed' in name or 'core6option13expect_failed' in name}
 originals={0x1ace18:'conversion-panic',0x1ac528:'schedule-panic'}
 edges=[-(1<<63),-100,-1,0,1,2,29,30,99,100,101,1000,10000,(1<<63)-2,(1<<63)-1]
 triples=list(itertools.product(edges,repeat=3));rng=random.Random(20261027)
 triples += [tuple(rng.randrange(-(1<<63),1<<63) for _ in range(3)) for _ in range(1000)]
 triples += [(start,start+elapsed,period) for start in (0,1,1000,10**9) for elapsed in (0,1,29,30,100,86400,10**9) for period in (1,2,30,100,86400)]
 rows=[];failures=[]
 for i,values in enumerate(triples):
  x,xpath=run(ob,0x7dfc8,232,values,originals);y,ypath=run(cb,a,n,values,panics)
  row={'inputs':values,'original':x,'candidate':y,'original_path':xpath,'candidate_path':ypath};rows.append(row)
  if x!=y:failures.append(i)
  start,end,period=values
  expected=({'kind':'conversion-panic','message':'SVM is 64-bit'} if end<0 or start<0 else
    {'kind':'schedule-panic','message':'end_time should be bigger than start_time'} if end<start or period==0 else
    {'kind':'conversion-panic','message':'SVM is 64-bit'} if period<0 else
    {'kind':'return','value':(end-start)//period})
  assert x==expected,(values,x,expected)
 out={'scope':__doc__,'original_sha256':sha(original),'candidate_sha256':sha(candidate),'script_sha256':sha(Path(__file__)),'original_start':0x7dfc8,'candidate_start':a,'candidate_bytes':n,'case_count':len(rows),'mismatches':failures,'cases':rows}
 dest=args.output;dest.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':failures}));assert not failures
if __name__=='__main__':main()
