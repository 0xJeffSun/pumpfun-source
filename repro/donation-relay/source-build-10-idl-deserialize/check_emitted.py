from pathlib import Path
import json,struct
from analyze import Elf
P=Path(__file__).resolve().parent
def check():
 c=Elf((P/'candidate.so').read_bytes())
 for pc in [324976,325488,113872]:assert struct.unpack('<BBhi',c.at(pc,8))==(0xb7,2,0,0)
 for pc in [324984,325496,113880]:
  op,rg,off,imm=struct.unpack('<BBhi',c.at(pc,8));assert op==0x85 and pc+8+imm*8==71016
 for pc in [325104,325584,113968]:assert c.at(pc,1)==b'\x8d'
 for pc in [325696,114080]:assert c.at(pc,1)==b'\x7b'
 assert c.at(422438,26)==b'Unexpected length of input'
 assert c.at(421409,33)==b'Failed to deserialize the account'
 assert struct.unpack('<BBhi',c.at(71976,8))==(0xb7,2,0,3003)
 assert struct.unpack('<BBhi',c.at(71960,8))==(0xb7,2,0,3004)
 assert struct.unpack('<BBhi',c.at(72088,8))==(0x63,0x21,152,0)
 rows=json.loads((P/'candidate-function-ledger.json').read_text());r=next(x for x in rows if x['start']==71016);assert r['end']==72264
 return {'factory_full_body':True,'typed_and_create_owned_then_io_drop_then_borrow_release':True}
