"""Bounded static constant propagation of the authorized 20-arm Display dispatch."""
from pathlib import Path
import struct,json,hashlib,importlib.util
R=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent;raw=(R/'repro/mayhem/compiler-v154-main/main/original.so').read_bytes()
s=importlib.util.spec_from_file_location('enum_elf',R/'repro/mayhem/compiler-v154-source-retarget/reviewed-plan/ledger-method/analyze_elf.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);e=m.Elf(raw)
# Authorized Debug helper loads u32 discriminant, scales by8, and indexes these two tables.
assert struct.unpack_from('<BBhi',raw,196896)==(0x61,0x11,0,0)
assert struct.unpack_from('<BBhi',raw,196904)==(0x67,0x01,0,3)
for pc,target in[(196912,713112),(196936,727696)]:assert raw[pc]==0x18 and struct.unpack_from('<I',raw,pc+4)[0]==target
known=json.loads((W/'unified-known-error-proposal/known-error-variants.json').read_bytes());rows=[]
for value in range(20):
 cell=727696+value*8;rel=e.relocations[cell];assert rel['type']==8;lo,pointer=struct.unpack_from('<II',raw,cell);assert lo==0;length=struct.unpack_from('<Q',raw,713112+value*8)[0];name=raw[pointer:pointer+length].decode();assert name.isidentifier()
 # Start after loading the enum into r2; symbolic execution has only constant integer comparisons/moves.
 pc=196096;regs={2:value};path=[]
 while pc!=196872:
  op,r,off,imm=struct.unpack_from('<BBhi',raw,pc);dst=r&15;path.append(dict(pc=pc,raw=raw[pc:pc+8].hex()))
  if op==0x18:regs[dst]=struct.unpack_from('<I',raw,pc+4)[0]+(struct.unpack_from('<I',raw,pc+12)[0]<<32);pc+=16
  elif op==0xb7:regs[dst]=imm;pc+=8
  elif op==0x05:pc+=8+off*8
  elif op in[0x65,0xd5,0x15,0x55]:
   a=regs[dst];take={0x65:a>imm,0xd5:a<=imm,0x15:a==imm,0x55:a!=imm}[op];pc+=8+(off*8 if take else 0)
  else:raise AssertionError((pc,op))
  assert 196096<=pc<=196872 and len(path)<50
 msg=raw[regs[2]:regs[2]+regs[3]].decode();r=dict(value=value,name=name,name_pointer=pointer,name_length=length,name_table_cell=cell,name_table_relocation=rel,message=msg,message_pointer=regs[2],message_length=regs[3],display_dispatch_path=path)
 if str(value)in known:assert known[str(value)]==dict(name=name,message=msg);r['matches_preexisting_source_anchor']=True
 else:r['matches_preexisting_source_anchor']=False
 rows.append(r)
out=dict(original_sha256=hashlib.sha256(raw).hexdigest(),new_explicitly_authorized_windows=[dict(start=190160,end=196056,role='shared enum name allocation'),dict(start=196056,end=196888,role='20-arm Display dispatch'),dict(start=196888,end=197000,role='discriminant-indexed Debug name/length tables')],scope='Static dispatch/data proof only. Does not execute helpers, follow indirect call, or admit unrelated opaque windows.',known_anchor_count=16,recovered_new_values=[r for r in rows if not r['matches_preexisting_source_anchor']],all20=rows)
(W/'error-table-recovery.json').write_text(json.dumps(out,indent=2,sort_keys=True)+'\n')
print(json.dumps(out['recovered_new_values'],indent=2))
