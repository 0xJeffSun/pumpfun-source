"""Static decoded ABI/extent links. No target instructions are executed."""
import json,struct
from match_helpers import ROOT,REPO,Elf

def analyze(closed, elf=None, delta=0):
 e=elf if elf is not None else Elf(REPO/'evidence/dependencies/donation_relay/deployed.so');anchors={}
 def instruction(at,op,dst,src,off=0,imm=0):
  physical=at+delta;fields=struct.unpack_from('<BBhi',e.b,physical);actual=(fields[0],fields[1]&15,fields[1]>>4,fields[2],fields[3]);assert actual==(op,dst,src,off,imm),(at,actual,(op,dst,src,off,imm))
  size=16 if op==0x18 else 8;r=dict(file_offset=physical,logical_anchor_offset=at,raw=e.b[physical:physical+size].hex(),opcode=op,dst=dst,src=src,displacement=off,immediate=imm,size=size)
  if op==0x18:r['u64']=(imm&0xffffffff)|(struct.unpack_from('<I',e.b,physical+12)[0]<<32)
  if physical in e.calls:r['call_target']=e.calls[physical]
  if physical in e.relocations:r['relocation']=e.relocations[physical]
  if op&7 in[5,6] and op not in[0x85,0x95]:r['branch_target']=physical+8+off*8
  anchors[at]=r;return r
 arrays={a['constant']:a for a in closed['unicode']['full_arrays']}
 branches=[]
 for bank,start,normal_count,lower_count,upper_count in [(1,736568,486,208,44),(0,736664,297,290,40)]:
  normal=arrays['NORMAL'+str(bank)];upper=arrays['SINGLETONS'+str(bank)+'U'];lower=arrays['SINGLETONS'+str(bank)+'L']
  assert normal['bytes']==normal_count and lower['bytes']==lower_count and upper['bytes']==upper_count*2
  load=instruction(start,0x18,2,0,imm=normal['target_file_offset']);assert load['u64']==normal['target_file_offset'] and load['relocation']=={'type':8,'symbol':''}
  instruction(start+16,0x7b,10,2,-4088)  # normal pointer
  instruction(start+24,0x7a,10,0,-4080,normal_count)  # normal byte length
  instruction(start+32,0x7a,10,0,-4096,lower_count)  # lower byte length
  instruction(start+40,0xbf,5,10)  # r5 passes this frame base
  load=instruction(start+48,0x18,2,0,imm=upper['target_file_offset']);assert load['u64']==upper['target_file_offset'] and load['relocation']=={'type':8,'symbol':''}
  instruction(start+64,0xb7,3,0,imm=upper_count)  # tuple count
  load=instruction(start+72,0x18,4,0,imm=lower['target_file_offset']);assert load['u64']==lower['target_file_offset'] and load['relocation']=={'type':8,'symbol':''}
  end=start+88
  if bank==1:
   jump=instruction(end,0x05,0,0,11);assert jump['branch_target']==736752+delta
  else:assert end==736752
  branches.append(dict(bank=bank,branch_start=start+delta,common_call=736752+delta,callee=735760+delta,normal=dict(constant=normal['constant'],pointer_stack_offset=-4088,length_stack_offset=-4080,passed_byte_length=normal_count,full_source_array_bytes=normal['bytes']),lower=dict(constant=lower['constant'],pointer_register=4,length_stack_offset=-4096,passed_byte_length=lower_count,full_source_array_bytes=lower['bytes']),upper=dict(constant=upper['constant'],pointer_register=2,count_register=3,passed_tuple_count=upper_count,tuple_stride_bytes=2,passed_byte_extent=upper_count*2,full_source_array_bytes=upper['bytes']),frame_base_register=5))
 call=instruction(736752,0x85,0,1,imm=-125);assert call['call_target']==735760+delta
 # Callee receives normal pointer/length and lower byte length from this exact
 # caller frame; upper pointer/count and lower pointer arrive in r2/r3/r4.
 for args in [(735760,0xbf,9,1,0,0),(735768,0x79,1,5,-4080,0),(735776,0x7b,10,1,-16,0),(735784,0x79,6,5,-4088,0),(735792,0x15,3,0,41,0),(735800,0x67,3,0,0,1),(735808,0xbf,1,2,0,0),(735816,0x0f,1,3,0,0),(735824,0x7b,10,1,-8,0),(735832,0x79,8,5,-4096,0),(735872,0x7b,10,4,-24,0),(735880,0x7b,10,8,-32,0),(735888,0x71,7,2,1,0),(735912,0x71,1,2,0,0),(735920,0x07,2,0,0,2),(736056,0x79,1,10,-8,0),(736064,0x1d,2,1,7,0),(736072,0x05,0,0,-24,0),(736104,0x79,1,10,-8,0),(736112,0x1d,2,1,1,0),(736120,0x05,0,0,-30,0)]:instruction(*args)
 assert anchors[736072]['branch_target']==anchors[736120]['branch_target']==735888+delta
 assert anchors[736064]['branch_target']==anchors[736112]['branch_target']==736128+delta
 # Lower byte slice uses r8 as its passed bound before r4+lowerstart; reads and
 # increments are byte-sized. These are decoded checks, not a runtime proof.
 for args in [(735944,0xad,5,0,51,0),(735952,0x2d,5,8,55,0),(735960,0x0f,4,0,0,0),(736008,0x71,8,4,0,0),(736016,0x07,4,0,0,1),(736032,0x05,0,0,-9,0)]:instruction(*args)
 assert anchors[735944]['branch_target']==736360+delta and anchors[735952]['branch_target']==736400+delta
 # Normal slice: original byte length -> end pointer; one-byte or two-byte
 # cursor steps; explicit end check before the second byte and loop bound.
 for args in [(736136,0x79,1,10,-16,0),(736144,0x15,1,0,24,0),(736152,0xbf,2,6,0,0),(736160,0x79,1,10,-16,0),(736168,0x0f,2,1,0,0),(736184,0xbf,4,6,0,0),(736192,0x07,4,0,0,1),(736200,0x71,3,6,0,0),(736232,0xbf,6,4,0,0),(736248,0x1d,4,2,23,0),(736272,0x71,4,6,1,0),(736288,0x07,6,0,0,2),(736336,0x5d,6,2,-20,0)]:instruction(*args)
 assert anchors[736248]['branch_target']==736440+delta and anchors[736336]['branch_target']==736184+delta
 return dict(scope='Static decoded caller/callee argument and iteration anchors only; no target execution, no claim every byte is read for one input',caller_branches=branches,callee_argument_bindings=dict(normal_pointer='r6 <- [r5-4088]',normal_length='r1 <- [r5-4080], saved at callee [r10-16]',lower_pointer='r4, saved at callee [r10-24]',lower_length='r8 <- [r5-4096]',upper_pointer='r2',upper_length='r3 tuple count shifted left1 -> byte end r2+2*count'),upper_stride_bytes=2,lower_stride_bytes=1,normal_strides_bytes=[1,2],all_six_full_array_extents_passed=True,full_array_bytes=1449,decoded_anchors=[anchors[k]for k in sorted(anchors)],runtime_reads_of_every_byte_claimed=False)
