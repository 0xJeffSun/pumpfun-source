"""Actual complete named code/callee/table links for the one retained v147 build."""
from pathlib import Path
import ast,hashlib,json,re,struct
from match_helpers import ROOT,REPO,Elf,references
from extent_links import analyze as extent_links
H=lambda b:hashlib.sha256(b).hexdigest()
def analyze(results):
 O=Elf(REPO/'evidence/dependencies/donation_relay/deployed.so');C=Elf(ROOT/'build-02/pump_fees_candidate.so');S=Elf(ROOT/'build-02/unstripped.so');fs=results['builds']['v147']['functions']
 def get(token):return next(f for f in fs if any(token in n for n in f['names']))
 def matches(f):return[m for m in f['matches']if m['inferred_function_entry']and m['next_entry_equals_window_end']and m['mapped_helper_calls_consistent']]
 fmt=get('fmt5write');fm=matches(fmt);assert len(fm)==1 and fmt['bytes']==1128 and fm[0]['original_start']==721496 and fm[0]['raw_byte_equality'];fmt_result=dict(function=fmt,positive_target=721496,indirect_call_limit='Rawcompletecodeidentity; dynamicformatter/vtable/inputdata edges not recursivelyproved')
 caller=get('unicode9printable12is_printable');check=get('unicode9printable5check');cm=matches(caller);km=matches(check);assert len(cm)==len(km)==1 and caller['bytes']==696 and check['bytes']==704;cm=cm[0];km=km[0];assert cm['original_start']==736464 and km['original_start']==735760
 assert cm['mapped_helper_call_checks']==[dict(offset=288,candidate_target=check['candidate_start'],mapped_original_target=735760,actual_original_target=735760,agrees=True)]
 source=ROOT/'primary-source/rust-library_core_src_unicode_printable.rs';raw=source.read_bytes();arrays={}
 for m in re.finditer(r'const (SINGLETONS[01][UL]|NORMAL[01]):[^=]+= &\[(.*?)\];',raw.decode(),re.S):arrays[m.group(1)]=bytes(y for x in ast.literal_eval('['+m.group(2)+']')for y in(x if isinstance(x,tuple)else(x,)))
 assert len(arrays)==6
 targetrefs={r['instruction_offset']:r for r in cm['original_data_references']};records=[]
 for r in caller['candidate_data_references']:
  cp=r['immediate'];tp=targetrefs[r['instruction_offset']]['immediate'];hits=[n for n,b in arrays.items()if C.b[cp:cp+len(b)]==b];assert len(hits)==1;n=hits[0];b=arrays[n];assert O.b[tp:tp+len(b)]==b;assert r['relocation']==targetrefs[r['instruction_offset']]['relocation']=={'type':8,'symbol':''};records.append(dict(constant=n,bytes=len(b),sha256=H(b),helper_instruction_offset=r['instruction_offset'],candidate_file_offset=cp,target_file_offset=tp,actual_target_reference=targetrefs[r['instruction_offset']],actual_candidate_reference=r))
 assert len(records)==6 and {r['constant']for r in records}==set(arrays)and sum(r['bytes']for r in records)==1449
 def locations(e,start,size):
  rows=[]
  for at in sorted({r['immediate']for r in references(e,start,size)}):
   ptr,n,line,col=struct.unpack_from('<QQII',e.b,at);path=ptr>>32;b=e.b[path:path+n];assert b==b'core/src/unicode/printable.rs'and n==29;rows.append(dict(descriptor_file_offset=at,descriptor_bytes=24,raw_hex=e.b[at:at+24].hex(),path_file_offset=path,path_bytes=n,path_hex=b.hex(),path_sha256=H(b),line=line,column=col))
  return rows
 ol=locations(O,735760,704);cl=locations(C,check['candidate_start'],704);assert {(r['line'],r['column'],r['path_sha256'])for r in ol}=={(r['line'],r['column'],r['path_sha256'])for r in cl}and{(r['line'],r['column'])for r in ol}=={(10,43),(26,54)}
 original_extents=extent_links({'unicode':{'full_arrays':[dict(constant=r['constant'],bytes=r['bytes'],target_file_offset=r['target_file_offset'])for r in records]}})
 delta=caller['candidate_start']-736464;assert check['candidate_start']==735760+delta
 candidate_extents=extent_links({'unicode':{'full_arrays':[dict(constant=r['constant'],bytes=r['bytes'],target_file_offset=r['candidate_file_offset'])for r in records]}},elf=C,delta=delta)
 # Explicitly bind the two size8 thunks omitted by the >=16 scan filter;
 # keep their onward helper/data closure separate and visible.
 tc={r['offset']:r['target']for r in km['original_internal_calls']};thunks=[]
 for call in check['internal_calls']:
  if call['offset']not in[632,672]:continue
  ca=call['target'];ta=tc[call['offset']];ce=C.entries[C.entries.index(ca)+1];te=O.entries[O.entries.index(ta)+1];assert ce-ca==te-ta==8 and C.normalized[ca:ce]==O.normalized[ta:te]and C.pattern(ca,8)==O.pattern(ta,8)
  cc=C.callsites(ca,8);oc=O.callsites(ta,8);assert len(cc)==len(oc)==1;nextf=next(f for f in fs if f['candidate_start']==cc[0]['target']);next_matches=[m for m in matches(nextf)if m['original_start']==oc[0]['target']];assert len(next_matches)==1
  thunks.append(dict(caller_offset=call['offset'],candidate_start=ca,target_start=ta,bytes=8,candidate_raw_hex=C.b[ca:ce].hex(),target_raw_hex=O.b[ta:te].hex(),candidate_calls=cc,target_calls=oc,onward_complete_function=nextf,onward_target=oc[0]['target'],limit='Actualthinwrapper and completeonwardbody linked; onwarddata/panic/indirectclosure notclaimed'))
 mul=get('compiler_builtins3int3mul3Mul3mul');mm=matches(mul);assert len(mm)==1 and mm[0]['original_start']==751104 and mm[0]['raw_byte_equality']and mul['bytes']==352 and not mul['internal_calls']and not mul['candidate_data_references'];wrapper=get('__multi3');wm=matches(wrapper);assert len(wm)==1 and wm[0]['original_start']==752688 and wrapper['bytes']==72 and wm[0]['mapped_helper_call_checks']==[dict(offset=24,candidate_target=mul['candidate_start'],mapped_original_target=751104,actual_original_target=751104,agrees=True)]
 return dict(fmt_write=fmt_result,unicode=dict(caller=caller,check=check,source_sha256=H(raw),full_six_arrays=records,target_locations=ol,candidate_locations=cl,location_raw_limit='Full24Bpointer/length/line/column-shaped records and29Bpath closed; path+positions equal, pointer/placementrawbytes differ',target_argument_extents=original_extents,candidate_argument_extents=candidate_extents,size8_thunk_links=thunks,transitive_limit='Indirect/panic/inputdata graph remains open; not uniquehistoricalsource/compiler'),multiply=dict(callee=mul,wrapper=wrapper,surviving_target=752688,rejected_callee_windows=[m['original_start']for m in wrapper['matches']if not m['mapped_helper_calls_consistent']]))
if __name__=='__main__':
 r=json.loads((ROOT/'helper-results.json').read_text());out=analyze(r);(ROOT/'closed-discriminators.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(dict(fmt_write_raw1128=True,unicode_complete696to704=True,full_array_bytes=1449,both_target_candidate_argument_extents_verified=True,multiply_raw352_and_wrapper72=True,size8_thunks_linked=2)))
