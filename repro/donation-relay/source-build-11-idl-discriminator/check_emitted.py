from pathlib import Path
import struct,json
from analyze import Elf
P=Path(__file__).resolve().parent
def check():
 c=Elf((P/'candidate.so').read_bytes())
 def ins(pc):return struct.unpack('<BBhi',c.at(pc,8))
 def call(pc):
  op,r,off,imm=ins(pc);assert op==0x85 and pc+8+imm*8==71016
 assert ins(325320)==(0xb7,2,0,0);call(325328)
 assert not any(ins(pc)[0]in[0x85,0x8d]for pc in range(325296,325328,8))
 assert c.at(325928,1)==b'\x7b'
 for pc in [325720,326120,114392]:assert ins(pc)==(0xb7,2,0,1)
 for pc in [325728,326128,114400]:call(pc)
 for pc in [325816,326256,114488]:assert c.at(pc,1)==b'\x8d'
 assert ins(330096)==(0xb7,2,0,2);call(330104);assert c.at(330072,1)==b'\x8d'
 for pc,n in [(72688,3001),(71760,3003),(72040,3004)]:assert ins(pc)==(0xb7,1,0,n)
 assert ins(72384)==(0x63,0x13,152,0)
 assert c.at(422021,41)==b'No discriminator was found on the account'
 rows=json.loads((P/'candidate-function-ledger.json').read_text());assert next(x for x in rows if x['start']==71016)['end']==72784
 return {'owned3001_before_guard_release':True,'3003_owned_before_io_drop':True,'3004_io_drop_before_owned':True}
