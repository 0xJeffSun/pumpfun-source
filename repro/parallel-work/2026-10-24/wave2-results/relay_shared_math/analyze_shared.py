"""Static extraction only; does not execute/emulate instructions or compile Rust."""
import json,hashlib,struct
from pathlib import Path
from derive_baseline import derive
from disasm import instructions,render
P=Path(__file__).resolve().parent
ROOTS=[104,105,107,112,108,113]
H=lambda b:hashlib.sha256(b).hexdigest()
def derive_shared():
 raw=(P/'inputs/deployed.so').read_bytes(); all_=derive();w=all_['windows.json']
 assert w==json.loads((P/'inputs/prior-windows.json').read_text())
 closure=set();todo=ROOTS[:]
 while todo:
  o=todo.pop()
  if o in closure:continue
  closure.add(o);todo+=w[o]['dependency_ordinals']
 ledgers=[]
 for o in sorted(closure):
  r=w[o];memory=[];calls=[]
  ins=list(instructions(r['start'],r['end']))
  for i,(pc,hex_,text) in enumerate(ins):
   op,regs,off,imm=struct.unpack_from('<BBhi',raw,pc)
   if op&7 in (1,2,3) and op!=24:
    memory.append({'pc':pc,'raw':hex_,'operand':text,'resolution':'machine memory operand; pointee provenance and dynamic bytes not generally resolved'})
   if op in (133,141):
    calls.append({'pc':pc,'raw':hex_,'target':text,'preceding_instructions':[{'pc':a,'raw':b,'operand':c} for a,b,c in ins[max(0,i-12):i]],'limit':'context is not a complete interprocedural argument proof'})
  ledgers.append({'ordinal':o,'start':r['start'],'end':r['end'],'sha256':r['sha256'],'source_identity':None,'direct_calls':r['direct_calls'],'external_calls':r['external_calls'],'indirect_calls':r['indirect_calls'],'branches':r['branches'],'data_references':r['data_references'],'memory_operands':memory,'call_contexts':calls})
 roots=[w[o] for o in ROOTS]
 # Raw extents are witnesses, not guessed object sizes.
 ranges=[('check104',114032,114568),('check105',114568,115456),('check107',118896,119440),('donation_entry_precedence',131136,131352),('donation_arithmetic_tail',140728,141368),('distribution_entry',119440,120104),('distribution_weights_to113',121272,121744),('allocation_and_empty113',141384,142240),('quotient_remainder113',142328,143080),('remainder_assignment113',143080,143608),('small_sort58',35648,36192),('wide_multiply483',751104,751456),('division_small_denominator',743872,745848),('error_code_offset115',152048,152552),('relayer_key',752896,752928)]
 witnesses=[{'name':n,'start':a,'end':z,'sha256':H(raw[a:z]),'raw_hex':raw[a:z].hex()} for n,a,z in ranges]
 return {'roots.json':roots,'helper-ledger.json':ledgers,'witnesses.json':witnesses,'coverage.json':{'roots':ROOTS,'inferred_windows':492,'source_unattributed':492,'direct_closure_ordinals':sorted(closure),'direct_call_sites_in_roots':sum(len(r['direct_calls']) for r in roots),'external_call_sites_in_roots':sum(len(r['external_calls']) for r in roots),'indirect_sites_in_closure':sum(len(w[o]['indirect_calls']) for o in closure),'limitations':['Direct closure is structural, not executable path coverage.','Indirect targets and consumed dynamic pointees remain unresolved.','Calls crossing into excluded invocation work are recorded as boundaries, not reconstructed.']}}
if __name__=='__main__':
 for n,v in derive_shared().items():(P/n).write_text(json.dumps(v,indent=2)+'\n')
 (P/'disassembly').mkdir(exist_ok=True)
 for o in derive_shared()['coverage.json']['direct_closure_ordinals']:(P/'disassembly'/f'{o:03}.txt').write_text(render(o))
 print((P/'coverage.json').read_text())
