"""Saved ELF direct descriptor and bounded r10 scan, no execution or edits."""
from pathlib import Path
import hashlib,importlib.util,struct
METHOD='79deec70c7e2751cd5e3733566ca4fcca9666268b2cb056a447118cadb80b4ed'
def descriptor(elf,start):
 pc=start+584;raw=elf.b[pc:pc+16];assert raw[0]==0x18 and elf.relocations[pc]=={'type':8,'symbol':''};ptr=struct.unpack_from('<I',raw,4)[0]|struct.unpack_from('<I',raw,12)[0]<<32;assert 0<=ptr<=len(elf.b)-24;prefix=elf.b[ptr:ptr+24];v,n,line,column=struct.unpack('<QQII',prefix);fileoffset=v>>32;assert 0<=fileoffset<=len(elf.b)and n<=len(elf.b)-fileoffset;path=elf.b[fileoffset:fileoffset+n]
 return dict(scratch_start=start,reference_pc=pc,reference_raw_hex=raw.hex(),reference_relocation=elf.relocations[pc],descriptor_file_offset=ptr,prefix_bytes=24,prefix_hex=prefix.hex(),serialized_pointer_raw_u64=v,path_file_offset=fileoffset,path_length=n,path_hex=path.hex(),path_utf8=path.decode('utf-8'),line=line,column=column,full_descriptor_extent_proven=False)
def scan(elf):
 entries=[];pc=elf.lo;outside=[]
 while pc<elf.hi:
  op,regs,offset,imm=struct.unpack_from('<BBhi',elf.b,pc);cls=op&7;mode=op&0xe0;width={0:4,8:2,16:1,24:8}[op&0x18]
  is_direct=mode in[0x60,0xc0]and((cls==1 and regs>>4==10)or(cls in[2,3]and regs&15==10))
  if is_direct:
   row=dict(pc=pc,opcode=op,raw_hex=elf.b[pc:pc+8].hex(),offset=offset,width=width,end_exclusive=offset+width);entries.append(row)
   if offset< -4096 or offset+width>0:outside.append(row)
  pc+=16 if op==0x18 else 8
 assert pc==elf.hi
 return dict(scan_scope='Raw .text instruction walk; direct LDX/ST/STX memory base r10 only, MEM/XADD modes, skipping LDDW continuations; no target execution',text_file_offset=elf.lo,text_bytes=elf.hi-elf.lo,direct_access_count=len(entries),minimum_direct_offset=min(x['offset']for x in entries),maximum_end_exclusive=max(x['end_exclusive']for x in entries),direct_accesses_outside_nominal_minus4096_to_0=outside,accesses=entries,limits='No alias/derived-pointer tracking, dynamic frames, call-stack/recursive depth, syscall or runtime verifier acceptance proof. An out-of-frame syntactic access does not establish an executed fault on all states.')
def analyze(repo,packet):
 repo=Path(repo);packet=Path(packet);method=repo/'repro/donation-relay/source-build-12-v148-measurement/match_helpers.py';assert hashlib.sha256(method.read_bytes()).hexdigest()==METHOD;spec=importlib.util.spec_from_file_location('direct_saved_descriptor_reader',method);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);o=m.Elf(repo/'evidence/dependencies/donation_relay/deployed.so');c=m.Elf(packet/'build-01/candidate.so');descs={'original':descriptor(o,36192),'linux':descriptor(c,10224)};equality={key:descs['original'][key]==descs['linux'][key]for key in['path_hex','path_length','line','column','prefix_hex']};return dict(descriptors=descs,equality=equality,semantic_descriptor_fields_equal=all(equality[k]for k in['path_hex','path_length','line','column']),full_object_extent_proven=False),dict(original=scan(o),linux=scan(c))
