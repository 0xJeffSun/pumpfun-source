"""UNRUN: exact Elf class from method095fc2; instantiate ONLY on new candidate bytes."""
import struct,hashlib
H=lambda b:hashlib.sha256(b).hexdigest()
class Elf:
 def __init__(self,b):
  self.b=b; h=struct.unpack_from('<16sHHIQQQIHHHHHH',b);assert h[0][:6]==b'\x7fELF\x02\x01'
  self.sections=[]
  for i in range(h[12]):
   n,t,f,a,o,z,l,info,al,en=struct.unpack_from('<IIQQQQIIQQ',b,h[6]+i*h[11]);self.sections.append(dict(index=i,name_offset=n,type=t,flags=f,address=a,offset=o,size=z,link=l,info=info,alignment=al,entry_size=en))
  names=self.section_bytes(self.sections[h[13]])
  for s in self.sections:s['name']=self.string(names,s.pop('name_offset'))
  self.by_name={s['name']:s for s in self.sections};self.relocations={};self.symbols=[]
  for s in self.sections:
   if s['type'] in (2,11):
    strings=self.section_bytes(self.sections[s['link']]);ss=[]
    for off in range(s['offset'],s['offset']+s['size'],24):
     n,info,other,section,value,size=struct.unpack_from('<IBBHQQ',b,off)
     ss.append(dict(name=self.string(strings,n),type=info&15,binding=info>>4,section=section,start=value,size=size))
    if s['type']==2:self.symbols=ss
    s['_symbols']=ss
  for s in self.sections:
   if s['type']==9:
    syms=self.sections[s['link']]['_symbols']
    for off in range(s['offset'],s['offset']+s['size'],16):
     a,info=struct.unpack_from('<QQ',b,off);self.relocations[a]=dict(type=info&0xffffffff,symbol=syms[info>>32]['name'],record_offset=off)
  for s in self.sections:s.pop('_symbols',None)
 @staticmethod
 def string(b,i):return b[i:b.find(b'\0',i)].decode('utf8','replace')
 def section_bytes(self,s):return self.b[s['offset']:s['offset']+s['size']]
 def at(self,a,n):
  for s in self.sections:
   if s['type']!=8 and s['flags']&2 and s['address']<=a and a+n<=s['address']+s['size']:
    o=s['offset']+a-s['address'];return self.b[o:o+n]
  raise ValueError((a,n))
 def containing(self,a):
  return next((s for s in self.sections if s['flags']&2 and s['address']<=a<s['address']+s['size']),None)
 def function(self,start,size,names):
  b=self.at(start,size);assert len(b)%8==0;n=bytearray(b);calls=[];refs=[];indirect=[];external=[];stack=[];i=0
  while i<size:
   op,regs,off,imm=struct.unpack_from('<BBhi',b,i);pc=start+i
   if op==0x85:
    rel=self.relocations.get(pc)
    if rel and rel['type']==10:
     external.append(dict(offset=i,pc=pc,immediate=imm,relocation=rel))
    elif regs>>4==1:
     calls.append(dict(offset=i,pc=pc,displacement=imm,target=pc+8+8*imm));n[i+4:i+8]=b'\0'*4
    else:external.append(dict(offset=i,pc=pc,immediate=imm,relocation=rel))
   elif op==0x8d:indirect.append(dict(offset=i,pc=pc,register=imm))
   if op==0x18:
    assert i+16<=size
    rel=self.relocations.get(pc)
    if rel:
     lo=struct.unpack_from('<I',b,i+4)[0];hi=struct.unpack_from('<I',b,i+12)[0];a=lo+(hi<<32);s=self.containing(a)
     ref=dict(offset=i,pc=pc,target=a,relocation=rel,section=None if s is None else s['name'])
     if s:
      count=min(64,s['address']+s['size']-a);literal=self.at(a,count);ref.update(bounded_bytes=count,bounded_hex=literal.hex(),bounded_sha256=H(literal))
     refs.append(ref);n[i+4:i+8]=b'\0'*4;n[i+12:i+16]=b'\0'*4
    i+=16;continue
   # Direct r10 base accesses only; derived frame-pointer aliases are not inferred.
   if (op&7)==1 and regs>>4==10 or (op&7) in (2,3) and (regs&15)==10:
    stack.append(dict(pc=pc,offset=off,opcode=op))
   i+=8
  return dict(start=start,end=start+size,bytes=size,names=names,raw_sha256=H(b),normalized_sha256=H(n),direct_calls=calls,data_references=refs,external_calls=external,indirect_calls=indirect,direct_r10_accesses=stack)
