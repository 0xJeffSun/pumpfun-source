from pathlib import Path
import json,struct
from analyze import Elf,H
P=Path(__file__).resolve().parent
def check():
 e=Elf((P/'candidate.so').read_bytes());ins=lambda pc:struct.unpack('<BBhi',e.at(pc,8));rows=json.loads((P/'candidate-function-ledger.json').read_text());by={r['start']:r for r in rows}
 def call(pc,target):assert ins(pc)[0]==0x85 and pc+8+ins(pc)[3]*8==target
 assert ins(325792)==(0x62,0x08,152,3002);assert ins(325720)==(0x62,0x08,24,115);assert ins(325728)==(0x7a,0x08,16,10)
 ptr=lambda pc:struct.unpack('<I',e.at(pc+4,4))[0]|struct.unpack('<I',e.at(pc+12,4))[0]<<32
 assert e.at(ptr(325680),10)==b'src/idl.rs';assert e.at(424009,53)==b'Account discriminator did not match what was expected';assert e.at(425158,10)==b'IdlAccount'
 call(325432,395120);call(325952,399200);assert 325432<325792<325952<326744
 assert ins(326744)==(0x7a,0x08,0,1);assert ins(326800)==(0x7b,0x86,40,0)
 call(327664,324792);assert ins(327912)==(0x07,0x01,0,-1);assert ins(327920)==(0x7b,0x17,0,0)
 # Existing3001 remains separately boxed,3003/3004 emit their own code; all constructors checked below by full ledger.
 assert ins(326632)==(0x62,0x01,152,3001)
 found={k:[] for k in [3001,3002,3003,3004]}
 for r in rows:
  if not any(t in ' '.join(r['names'])for t in ['idl','exit_error']):continue
  for pc in range(r['start'],r['end'],8):
   op,reg,off,imm=ins(pc)
   if imm in found and op in [0x62,0xb7]:found[imm].append({'pc':pc,'row':r['index'],'opcode':op,'offset':off})
 assert all(found.values()),found
 stack=json.loads((P/'stack-observations.json').read_text());assert not stack['backend_errors'];assert not any(r['out_of_range']for r in stack['frames'])
 result={'pass':True,'candidate_sha256':H((P/'candidate.so').read_bytes()),'source_origin':{'filename':'src/idl.rs','line':115,'original_filename':'programs/contracts/src/lib.rs','original_line':36,'truthful_difference':True},'owned3002_code_store':325792,'message_format_call':325432,'IdlAccount_name_format_call':325952,'source_to_account_name_store':326744,'checked_header_call_while_guard_held':327664,'guard_release':327920,'distinct_codes':found,'limits':['Natural constructor is inlined and uses formatting specialization; not original raw-body equality.','Outer rename/log/lower/drop full bodies retained; no recursive metadata equivalence.','Existing3001/3003/3004 source paths preserved; no exhaustive malformed/OOM runtime.']}
 return result
if __name__=='__main__':print(json.dumps(check(),indent=2))
