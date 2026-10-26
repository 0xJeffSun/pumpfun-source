"""Full named-body/callee/data witnesses; saved bytes only."""
import ast,hashlib,json,re,struct
from match_helpers import ROOT,REPO,Elf,references
H=lambda b:hashlib.sha256(b).hexdigest()
def arrays():
 s=(ROOT/'v144-cached-unicode-printable.rs').read_text()
 return {m.group(1):bytes(y for x in ast.literal_eval('['+m.group(2)+']')for y in(x if isinstance(x,tuple)else(x,)))for m in re.finditer(r'const (SINGLETONS[01][UL]|NORMAL[01]):[^=]+= &\[(.*?)\];',s,re.S)}
def decode(e,lo,size):
 out=[];at=lo
 while at<lo+size:
  op,regs,off,imm=struct.unpack_from('<BBhi',e.b,at);step=16 if op==0x18 else 8
  d=dict(offset=at-lo,raw_hex=e.b[at:at+step].hex(),opcode=op,dst=regs&15,src=regs>>4,displacement=off,immediate=imm)
  if step==16:d['u64']=(imm&0xffffffff)|(struct.unpack_from('<I',e.b,at+12)[0]<<32)
  if at in e.calls:d['call_target']=e.calls[at]
  if at in e.relocations:d['relocation']=e.relocations[at]
  if op&7 in[5,6]and op not in[0x85,0x95]:d['branch_target']=at+8+off*8
  out.append(d);at+=step
 assert at==lo+size
 return out
def analyze(results):
 out={};A=arrays();assert sum(map(len,A.values()))==1403
 for target,r in results.items():
  O=Elf(REPO/'evidence/original'/target/'deployed.so');C=Elf(REPO/r['builds']['v144']['candidate']['path']);S=Elf(REPO/r['builds']['v144']['symbol_source']['path']);fs=r['builds']['v144']['functions']
  named={}
  for key,token in [('fmt_write','fmt5write'),('multiply_leaf','__multi3'),('unicode_consumer','unicode9printable12is_printable'),('unicode_check','unicode9printable5check')]:
   f=next(f for f in fs if any(token in n for n in f['names']));assert len(f['matches'])==1;m=f['matches'][0];assert m['inferred_function_entry']and m['next_entry_equals_window_end']and m['mapped_helper_calls_consistent'];lo=m['original_start'];size=f['bytes']
   named[key]=dict(candidate_start=f['candidate_start'],target_start=lo,target_end=lo+size,bytes=size,raw_equal=m['raw_byte_equality'],candidate_raw_sha256=f['raw_sha256'],target_raw_sha256=m['original_raw_sha256'],target_body_hex=O.b[lo:lo+size].hex(),target_instructions=decode(O,lo,size),mapped_calls=m['mapped_helper_call_checks'],unresolved_calls=m['unresolved_internal_calls'],relocations=f['relocations'])
   if key in ['fmt_write','multiply_leaf']:assert m['raw_byte_equality']and not f['internal_calls']and not f['candidate_data_references']and not f['relocations']
  consumer=next(f for f in fs if any('unicode9printable12is_printable'in n for n in f['names']));check=next(f for f in fs if any('unicode9printable5check'in n for n in f['names']));m=consumer['matches'][0];c0=consumer['candidate_start'];o0=m['original_start'];refs={x['instruction_offset']:x for x in m['original_data_references']};crefs={x['instruction_offset']:x for x in consumer['candidate_data_references']};full=[]
  for off,ref in refs.items():
   if not ref['relocation']:continue
   pos=ref['immediate'];found=[n for n,b in A.items()if O.b[pos:pos+len(b)]==b];assert len(found)==1;n=found[0];cp=crefs[off]['immediate'];assert C.b[cp:cp+len(A[n])]==A[n]and ref['relocation']==crefs[off]['relocation']=={'type':8,'symbol':''}
   full.append(dict(constant=n,bytes=len(A[n]),sha256=H(A[n]),instruction_offset=off,target_file_offset=pos,candidate_file_offset=cp))
  assert len(full)==6 and {x['constant']for x in full}==set(A)
  # The complete caller contains two banks with explicit byte lengths and
  # tuple count. Assert exact decoded operands in target and candidate.
  argrows=[]
  for bank,start in [(1,104),(0,200)]:
   count=len(A['SINGLETONS'+str(bank)+'U'])//2;lower=len(A['SINGLETONS'+str(bank)+'L']);normal=len(A['NORMAL'+str(bank)])
   for E,base in [(O,o0),(C,c0)]:
    for off,fields in [(start+16,(0x7b,0x2a,-4088,0)),(start+24,(0x7a,0x0a,-4080,normal)),(start+32,(0x7a,0x0a,-4096,lower)),(start+40,(0xbf,0xa5,0,0)),(start+64,(0xb7,0x03,0,count))]:assert struct.unpack_from('<BBhi',E.b,base+off)==fields
   argrows.append(dict(bank=bank,normal_pointer_offset=start,normal_bytes=normal,normal_stack=-4088,normal_length_stack=-4080,upper_pointer_offset=start+48,upper_tuple_count=count,upper_tuple_stride=2,upper_bytes=count*2,lower_pointer_offset=start+72,lower_bytes=lower,lower_length_stack=-4096,frame_register=5))
  assert O.callsites(o0,consumer['bytes'])==[{'offset':288,'target':named['unicode_check']['target_start']}]
  # Decode the check's actual argument consumption and tuple stride.
  k=named['unicode_check']['target_start'];anchors=[(8,(0x79,0x51,-4080,0)),(16,(0x7b,0x1a,-16,0)),(24,(0x79,0x56,-4088,0)),(40,(0x67,0x03,0,1)),(48,(0xbf,0x21,0,0)),(56,(0x0f,0x31,0,0)),(72,(0x79,0x58,-4096,0)),(168,(0x71,0x27,1,0)),(192,(0x71,0x21,0,0)),(200,(0x07,0x02,0,2)),(288,(0x71,0x48,0,0)),(296,(0x07,0x04,0,1))]
  for off,fields in anchors:assert struct.unpack_from('<BBhi',O.b,k+off)==fields and struct.unpack_from('<BBhi',C.b,check['candidate_start']+off)==fields
  diagnostics={};edges=[]
  for label,E,start in [('target',O,k),('candidate',C,check['candidate_start'])]:
   rows=[]
   for ref in references(E,start,check['bytes']):
    at=ref['immediate'];ptr,n,line,col=struct.unpack_from('<QQII',E.b,at);path=ptr>>32;assert 0<n<256 and b'core/src/unicode/printable.rs'in E.b[path:path+n]
    rows.append(dict(body_operand_offset=ref['instruction_offset'],descriptor_file_offset=at,descriptor_bytes=24,descriptor_raw_hex=E.b[at:at+24].hex(),path_offset=path,path_bytes=n,path_raw_hex=E.b[path:path+n].hex(),line=line,column=col))
   diagnostics[label]=rows
  for call in O.callsites(k,check['bytes']):
   at=call['target'];end=next(x for x in O.entries if x>at);candidate_call=next(c for c in check['internal_calls']if c['offset']==call['offset']);cs=[f for f in S.funcs if f['start']==candidate_call['target']]
   edges.append(dict(call_offset=call['offset'],actual_target=at,target_next_inferred_entry=end,target_bytes=end-at,target_sha256=H(O.b[at:end]),candidate_target=candidate_call['target'],candidate_symbol_extents=cs,closed_by_unique_helper_map=any(c['offset']==call['offset']for c in check['matches'][0]['mapped_helper_call_checks'])))
  # The generic inventory excludes8-byte thunks and therefore leaves two
  # edges unresolved. Follow each actual callee, retaining the200-byte
  # implementation's ambiguous global patterns and unclosed data.
  for edge in edges:
   if edge['target_bytes']!=8:continue
   ca=edge['candidate_target'];oa=edge['actual_target'];cc=C.callsites(ca,8);oc=O.callsites(oa,8);assert len(cc)==len(oc)==1
   ct=cc[0]['target'];ot=oc[0]['target'];cf=next(f for f in fs if f['candidate_start']==ct);oe=next(x for x in O.entries if x>ot);assert oe-ot==cf['bytes']==200
   assert C.normalized[ca:ca+8]==O.normalized[oa:oa+8]and C.pattern(ca,8)==O.pattern(oa,8)
   fm=next(m for m in cf['matches']if m['original_start']==ot);assert fm['inferred_function_entry']and fm['next_entry_equals_window_end']and fm['mapped_helper_calls_consistent']and not fm['unresolved_internal_calls']
   edge['explicit_thunk_chain']=dict(candidate_thunk_raw_hex=C.b[ca:ca+8].hex(),target_thunk_raw_hex=O.b[oa:oa+8].hex(),candidate_actual_callee=ct,target_actual_callee=ot,target_callee_end=oe,callee_bytes=200,candidate_names=cf['names'],target_callee_raw_hex=O.b[ot:oe].hex(),candidate_callee_raw_sha256=cf['raw_sha256'],target_callee_raw_sha256=fm['original_raw_sha256'],raw_equal=fm['raw_byte_equality'],all_global_pattern_windows=[m['original_start']for m in cf['matches']],actual_callee_mapped_calls=fm['mapped_helper_call_checks'],actual_callee_data_references=references(O,ot,200),complete_global_data_closure=False)
  deltas={}
  leaf=O.b[named['multiply_leaf']['target_start']:named['multiply_leaf']['target_end']]
  for version in ['v143','v145','v146','v1461']:
   fs2=r['builds'][version]['functions'];f=next(f for f in fs2 if any(('compiler_builtins3int3mul3Mul3mul'in n if version!='v143' else n=='__multi3')for n in f['names']));E=Elf(REPO/r['builds'][version]['candidate']['path']);b=E.b[f['candidate_start']:f['candidate_start']+f['bytes']];assert len(b)==len(leaf)==352
   deltas[version]=dict(candidate_start=f['candidate_start'],candidate_symbol_names=f['names'],complete_target_bytes=352,different_instructions=[dict(offset=i,candidate_hex=b[i:i+8].hex(),target_hex=leaf[i:i+8].hex())for i in range(0,352,8)if b[i:i+8]!=leaf[i:i+8]],full_pattern_matches=f['matches'])
  out[target]=dict(named_complete_bodies=named,unicode_full_arrays=full,unicode_arrays_total_bytes=1403,unicode_argument_extents=argrows,unicode_callee_argument_anchors=[dict(offset=o,opcode=x[0],registers=x[1],displacement=x[2],immediate=x[3])for o,x in anchors],unicode_diagnostic_records=diagnostics,unicode_check_immediate_edges=edges,multiply_negative_instruction_deltas=deltas,unclosed='Generic helper map leaves two8-byte Unicode check callees unresolved; explicit thunk chains separately follow their actual destinations into complete200-byte patterns with three ambiguous global windows. Full transitive panic/formatter graph,200-byte panic body global data and diagnostic record raw identity remain unproved. Pointer/length/line/column-shaped records are decoded at actual operands; no blanket data ABI equivalence. Entry boundaries inferred, not target debug symbols.')
 return out
