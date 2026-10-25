"""Complete saved function decoding only; never execute target instructions."""
from pathlib import Path
import argparse,gzip,json,struct
P=Path(__file__).resolve().parent
def render(O,start,end):
 lines=[];pc=start
 while pc<end:
  op,reg,off,imm=struct.unpack_from('<BBhi',O,pc);dst=reg&15;src=reg>>4;step=8
  if op==24:step=16;t=f'r{dst}=LDDW '+str((imm&0xffffffff)|(struct.unpack_from('<I',O,pc+12)[0]<<32))
  elif op==133:t='CALL '+str(pc+8+imm*8)
  elif op==149:t='EXIT'
  elif op&7 in[1,2,3]:
   w={0:32,8:16,16:8,24:64}[op&24];t=f'r{dst}=u{w}[r{src}{off:+}]'if op&7==1 else f'u{w}[r{dst}{off:+}]='+('r'+str(src)if op&7==3 else str(imm))
  elif op&7 in[5,6]:t=f'JUMP op={op:x} r{dst},'+('r'+str(src)if op&8 else str(imm))+' ->'+str(pc+8+off*8)
  else:t=f'ALU op={op:x} r{dst},'+('r'+str(src)if op&8 else str(imm))
  lines.append(f'{pc}: {O[pc:pc+step].hex():32} {t}');pc+=step
 return '\n'.join(lines)+'\n'
def extract(repo,starts):
 q=repo/'repro/layered-passes/pass-24/pump-compared-errors-source-proof';O=(q/'original.so').read_bytes();by={f['start']:f for f in json.loads(gzip.decompress((q/'original-ledger.json.gz').read_bytes()))};old=P/'bounded-ledger.json';rows=json.loads(old.read_text())if old.exists()else{}
 for start in starts:
  f=by[start];rows[str(start)]=f;(P/(str(start)+'.asm')).write_text(render(O,start,f['end']))
 (P/'bounded-ledger.json').write_text(json.dumps(rows,indent=2)+'\n')
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('starts',nargs='+',type=int);r=a.parse_args();extract(r.repo,r.starts)
