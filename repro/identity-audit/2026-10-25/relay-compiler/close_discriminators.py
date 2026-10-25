"""Close selected saved-byte code/callee/data extents; no builds or execution."""
from pathlib import Path
import ast,bisect,hashlib,json,re,struct
from match_helpers import ROOT,REPO,Elf,references
H=lambda b:hashlib.sha256(b).hexdigest()
def decode(e,lo,hi):
 rows=[];at=lo
 while at<hi:
  op,regs,off,imm=struct.unpack_from('<BBhi',e.b,at);size=16 if op==0x18 else 8
  row=dict(file_offset=at,body_offset=at-lo,raw=e.b[at:at+size].hex(),opcode=op,dst=regs&15,src=regs>>4,displacement=off,immediate=imm,size=size)
  if size==16:row['u64']=(imm&0xffffffff)|(struct.unpack_from('<I',e.b,at+12)[0]<<32)
  if at in e.calls:row['call_target']=e.calls[at]
  if (op&7)in[5,6] and op not in[0x85,0x95]:row['branch_target']=at+8+off*8
  if at in e.relocations:row['relocation']=e.relocations[at]
  rows.append(row);at+=size
 assert at==hi
 return rows
def analyze(results):
 O=Elf(REPO/'evidence/dependencies/donation_relay/deployed.so');source=ROOT/'v153-unicode-printable.rs';raw=source.read_bytes();arrays={}
 for m in re.finditer(r'const (SINGLETONS[01][UL]|NORMAL[01]):[^=]+= &\[(.*?)\];',raw.decode(),re.S):
  data=bytes(y for x in ast.literal_eval('['+m.group(2)+']')for y in(x if isinstance(x,tuple)else(x,)));arrays[m.group(1)]=data
 assert len(arrays)==6
 rows=[];unicode_sources=[]
 for name,data in arrays.items():
  hits=[];pos=0
  while(at:=O.b.find(data,pos))>=0:hits.append(at);pos=at+1
  assert len(hits)==1;location=hits[0];refs=[]
  at=O.lo
  while at<O.hi:
   if O.b[at]==0x18:
    val=struct.unpack_from('<I',O.b,at+4)[0]|(struct.unpack_from('<I',O.b,at+12)[0]<<32)
    if val==location:
     i=bisect.bisect_right(O.entries,at)-1;refs.append(dict(file_offset=at,body_start=O.entries[i],body_end=O.entries[i+1],relocation=O.relocations.get(at)))
    at+=16
   else:at+=8
  assert len(refs)==1 and refs[0]['relocation']=={'type':8,'symbol':''}
  rows.append(dict(constant=name,bytes=len(data),sha256=H(data),target_file_offset=location,actual_references=refs))
 assert sum(r['bytes']for r in rows)==1449
 assert {(r['actual_references'][0]['body_start'],r['actual_references'][0]['body_end'])for r in rows}=={(736464,737160)}
 lo,hi=736464,737160;calls=O.callsites(lo,hi-lo);assert calls==[{'offset':288,'target':735760}]
 assert O.entries[O.entries.index(735760)+1]==lo
 unicode=dict(source_sha256=H(raw),source_url='https://raw.githubusercontent.com/anza-xyz/rust/7a87f939d96c478029873d3d43f3a4372f484c42/library/core/src/unicode/printable.rs',full_arrays=rows,body_start=lo,body_end=hi,body_bytes=hi-lo,body_sha256=H(O.b[lo:hi]),body_calls=calls,callee_start=735760,callee_end=lo,callee_bytes=lo-735760,callee_sha256=H(O.b[735760:lo]),callee_calls=O.callsites(735760,lo-735760),callee_data_references=references(O,735760,lo-735760),label_basis='All six authentic printable arrays are consumed by actual six relocated LDDW operands in one inferred entry-bounded target body; naming is inferred from this binding, not target symbols',unclosed_edges='Callee panic/location/drop/formatter graph and diagnostic descriptor extents remain unproved')
 # Bind every same source-defined array to the actual retained v1.53 candidate
 # operand, even though its complete caller and callee do not match Relay.
 C=Elf(REPO/'repro/identity-audit/2026-10-25/mayhem-v153/build-01/candidate.so');f=next(f for f in results['builds']['v153']['functions']if any('is_printable'in n for n in f['names']));crefs=[]
 for ref in f['candidate_data_references']:
  pos=ref['immediate'];matches=[n for n,b in arrays.items()if C.b[pos:pos+len(b)]==b];assert len(matches)==1;n=matches[0];crefs.append(dict(constant=n,bytes=len(arrays[n]),sha256=H(arrays[n]),candidate_file_offset=pos,instruction_offset=ref['instruction_offset'],relocation=ref['relocation']))
 assert {r['constant']for r in crefs}==set(arrays);unicode['v153_candidate_full_array_references']=crefs
 def locations(e,start,size):
  records=[]
  for at in sorted({r['immediate'] for r in references(e,start,size)}):
   ptr,n,line,col=struct.unpack_from('<QQII',e.b,at);path=ptr>>32
   assert 0<n<256 and path+n<=len(e.b) and b'core/src/unicode/printable.rs' in e.b[path:path+n]
   records.append(dict(descriptor_file_offset=at,descriptor_bytes=24,descriptor_raw_hex=e.b[at:at+24].hex(),path_file_offset=path,path_bytes=n,path_sha256=H(e.b[path:path+n]),path=e.b[path:path+n].decode(),path_raw_hex=e.b[path:path+n].hex(),line=line,column=col))
  return records
 target_locations=locations(O,735760,704);check=next(x for x in results['builds']['v153']['functions']if any('unicode9printable5check'in n for n in x['names']));candidate_locations=locations(C,check['candidate_start'],check['bytes'])
 assert {(r['line'],r['column'])for r in target_locations}=={(r['line'],r['column'])for r in candidate_locations}=={(10,43),(26,54)}
 assert {r['path'] for r in target_locations}=={'core/src/unicode/printable.rs'} and {r['path'] for r in candidate_locations}=={'library/core/src/unicode/printable.rs\x00'}
 unicode['target_callee_decoded_location_descriptors']=target_locations;unicode['v153_callee_decoded_location_descriptors']=candidate_locations;unicode['location_limit']='24-byte pointer/length/line/column-shaped records decoded at actual operands: target path29B vs candidate38B including NUL differ, line/column pairs agree; no data-record identity or filename ABI equivalence asserted; transitive panic graph unclosed'
 unicode['callee_edge_records']=[]
 for call in unicode['callee_calls']:
  at=call['target'];i=O.entries.index(at);end=O.entries[i+1];unicode['callee_edge_records'].append(dict(start=at,end=end,bytes=end-at,sha256=H(O.b[at:end]),raw_hex=O.b[at:end].hex(),calls=O.callsites(at,end-at),data_references=references(O,at,end-at)))
 multiply={}
 for version in ['v145','v146','v1461']:
  fs=results['builds'][version]['functions'];mul=next(f for f in fs if any('compiler_builtins3int3mul3Mul3mul'in n for n in f['names']));m=next(m for m in mul['matches']if m['original_start']==751104)
  assert mul['bytes']==352 and m['raw_byte_equality']and m['inferred_function_entry']and m['next_entry_equals_window_end']and not mul['internal_calls']and not mul['candidate_data_references']and not m['original_data_references']
  wrapper=next(f for f in fs if '__multi3'in f['names']);surviving=[m for m in wrapper['matches']if m['inferred_function_entry']and m['next_entry_equals_window_end']and m['mapped_helper_calls_consistent']]
  assert len(surviving)==1 and surviving[0]['original_start']==752688 and surviving[0]['mapped_helper_call_checks']==[{'offset':24,'candidate_target':mul['candidate_start'],'mapped_original_target':751104,'actual_original_target':751104,'agrees':True}]
  multiply[version]=dict(callee=mul,wrapper=wrapper,surviving_wrapper_target=752688,rejected_pattern_windows=[m['original_start']for m in wrapper['matches']if not m['mapped_helper_calls_consistent']],data_extent_closure='No global LDDW references/relocations or internal calls in complete raw-exact352Bcallee; arithmetic memory effects still follow caller arguments')
 bodies={label:decode(O,a,b)for label,(a,b)in {'unicode_consumer':(736464,737160),'unicode_callee':(735760,736464),'multiply_callee':(751104,751456),'multiply_wrapper':(752688,752760)}.items()}
 return dict(unicode=unicode,multiply=multiply),bodies
if __name__=='__main__':
 r=json.loads((ROOT/'helper-results.json').read_text());a,b=analyze(r);(ROOT/'closed-discriminators.json').write_text(json.dumps(a,indent=2)+'\n');(ROOT/'complete-target-bodies.json').write_text(json.dumps(b,indent=2)+'\n');print(json.dumps(dict(unicode_target_body_bytes=a['unicode']['body_bytes'],unicode_target_callee_bytes=a['unicode']['callee_bytes'],full_arrays_bytes=sum(x['bytes']for x in a['unicode']['full_arrays']),multiply_callee_raw_exact352=True,wrapper_target=752688)))
