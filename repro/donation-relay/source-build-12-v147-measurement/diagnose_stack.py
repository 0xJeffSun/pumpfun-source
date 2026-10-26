"""Recompute retained backend diagnostics and static full-function r10 witness."""
from pathlib import Path
import gzip,hashlib,json,re,struct
from match_helpers import ROOT,REPO,Elf
H=lambda b:hashlib.sha256(b).hexdigest()
def analyze(ledger):
 path=ROOT/'build-01/build.log';log=path.read_bytes()if path.is_file()else gzip.decompress((ROOT/'build-01/build.log.gz').read_bytes());lines=log.decode().splitlines();errors=[line for line in lines if line.startswith('Error: Function ')];assert len(errors)==2
 for line in errors:assert'core5slice4sort6stable14driftsort_main'in line and'Stack offset of 4104 exceeded max offset of 4096 by 8 bytes'in line and'Estimated function frame size: 4160 bytes'in line
 e=Elf(ROOT/'build-01/candidate.so');u=Elf(ROOT/'build-01/unstripped.so');frames=[]
 for f in ledger['candidate-function-ledger.json']:
  offending=[r for r in f['direct_r10_accesses']if r['offset']<-4096]
  if not offending:continue
  start=f['start'];size=f['bytes'];assert start in e.entries and next(at for at in e.entries if at>start)==start+size
  assert any(s['start']==start and s['size']==size for s in u.funcs)
  assert e.b[start:start+size]==u.b[start:start+size]and H(e.b[start:start+size])==f['raw_sha256']
  rows=[]
  for r in offending:
   at=r['pc'];op,regs,off,imm=struct.unpack_from('<BBhi',e.b,at);assert off==r['offset']and op==r['opcode'];assert(op&7)==1 and regs>>4==10 or(op&7)in[2,3]and(regs&15)==10
   rows.append(dict(file_offset=at,body_offset=at-start,raw=e.b[at:at+8].hex(),opcode=op,dst=regs&15,src=regs>>4,displacement=off,immediate=imm))
  frames.append(dict(start=start,end=start+size,bytes=size,names=f['names'],raw_sha256=f['raw_sha256'],entry_and_next_entry_bounded=True,minimum_direct_r10_offset=min(r['offset']for r in f['direct_r10_accesses']),offending_operands=rows,source_symbol_size_proven=True))
 assert len(frames)==1 and frames[0]['start']==10224 and frames[0]['bytes']==608 and frames[0]['minimum_direct_r10_offset']==-4112
 return dict(scope='Compiler diagnostics plus static direct-r10 operands; no runtime path executed or universal/all-state fault claim',build_log_sha256=H(log),backend_diagnostic_lines=errors,linked_frames=frames,cargo_returncode=0,strip_returncode=0,runtime_executions=0,all_state_fault_proven=False,execution_readiness_established=False)
if __name__=='__main__':
 from full_ledger import analyze as full
 r=analyze(full());(ROOT/'stack-diagnostics.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(dict(diagnostics=2,min_direct_r10_offset=-4112,entry_bounded_bytes=608,universal_fault_claimed=False)))
