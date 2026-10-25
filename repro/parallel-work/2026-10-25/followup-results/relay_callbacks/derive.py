"""Static extraction only: no target execution, loader, relocation application or emulation."""
import struct, hashlib
import disasm
B=disasm.B
H=lambda b:hashlib.sha256(b).hexdigest()
def span(a,z):
 assert 0<=a<=z<=len(B)
 return dict(start=a,end=z,sha256=H(B[a:z]),hex=B[a:z].hex())
def derive():
 sh=struct.unpack_from('<Q',B,40)[0];sz,n,st=struct.unpack_from('<HHH',B,58)
 ss=[struct.unpack_from('<IIQQQQIIQQ',B,sh+i*sz) for i in range(n)]
 ns=B[ss[st][4]:ss[st][4]+ss[st][5]]
 sect={ns[s[0]:].split(b'\0')[0].decode():s for s in ss};s=sect['.rel.dyn']
 rel={struct.unpack_from('<Q',B,p)[0]:(p,struct.unpack_from('<Q',B,p+8)[0]) for p in range(s[4],s[4]+s[5],16)}
 def ptr(a):
  p,i=rel[a];assert i&0xffffffff==8
  return dict(slot=span(a,a+8),relocation=span(p,p+16),encoded_file_target=struct.unpack_from('<Q',B,a)[0]>>32)
 tables=[]
 for a in [772792,774912,778488,778896]:
  row=ptr(a+24);row['base']=a;row['table_consumed_extent']=span(a+24,a+32);tables.append(row)
 literals=[]
 for a,z in [(754652,754656),(755544,755563),(767621,767641),(769325,769327),(769327,769330),(769330,769332),(769332,769335),(769335,769337),(769337,769338),(769338,769340),(769340,769341),(769341,769343)]:
  literals.append(dict(data=span(a,z),text=B[a:z].decode()))
 descriptors=[]
 for base,count in [(775056,4),(775328,4)]:
  entries=[]
  for a in range(base,base+16*count,16):
   q=ptr(a);length=struct.unpack_from('<Q',B,a+8)[0];target=q['encoded_file_target'];q.update(length=length,descriptor=span(a,a+16),pointee=span(target,target+length),text=B[target:target+length].decode());entries.append(q)
  descriptors.append(dict(base=base,count=count,entries=entries))
 # Callback value is constructed in the argument record, not inferred from a nearby symbol.
 assert struct.unpack_from('<I',B,653404)[0]==690744
 assert struct.unpack_from('<I',B,712692)[0]==778488
 assert B[566680:566688]==bytes.fromhex('9500000000000000')
 assert B[725720:725728]==bytes.fromhex('8d00000005000000')
 name=struct.pack('<Q',struct.unpack_from('<I',B,149356)[0]+(struct.unpack_from('<I',B,149364)[0]<<32))+struct.pack('<Q',struct.unpack_from('<I',B,149332)[0]+(struct.unpack_from('<I',B,149340)[0]<<32))+struct.pack('<H',struct.unpack_from('<I',B,149388)[0])
 assert name==b'ArithmeticOverflow'
 ordinals=[64,104,114,115,116,278,284,286,288,289,290,336,387,390,407,410,411,413,414,421,422,427,431]
 windows=[dict(ordinal=o,bytes=span(disasm.W[o]['start'],disasm.W[o]['end'])) for o in ordinals]
 ranges=[(566472,566688),(143608,143680),(143968,143992),(146464,146624),(149304,149400),(152016,152552),(516136,516208),(657016,657336),(657616,657648),(653320,653664),(692040,692080),(692376,692392)]
 return dict(binary_sha256=H(B),tables=tables,literals=literals,descriptor_arrays=descriptors,name_from_immediate_stores=name.decode(),windows=windows,witnesses=[span(a,z) for a,z in ranges],listing_ordinals=ordinals)
if __name__=='__main__':
 import json
 from pathlib import Path
 p=Path(__file__).resolve().parent
 (p/'static-evidence.json').write_text(json.dumps(derive(),indent=2)+'\n')
 (p/'disassembly').mkdir(exist_ok=True)
 for o in derive()['listing_ordinals']:(p/'disassembly'/f'{o:03}.txt').write_text(disasm.render(o))
 (p/'disassembly'/'allocator-cleanup.txt').write_text('\n'.join(f'{pc}: {raw} {t}' for a,z in [(566472,566688),(657016,657648)] for pc,raw,t in disasm.instructions(a,z))+'\n')
