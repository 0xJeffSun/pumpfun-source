#!/usr/bin/env python3
"""Inspect only frozen provenance and the already identified error boundary."""
from pathlib import Path
import hashlib,importlib.util,json,re,struct,tomllib
ROOT=Path(__file__).resolve().parent
def sha(b):return hashlib.sha256(b).hexdigest()
def analyze():
 inputs=json.loads((ROOT/'inputs.json').read_text())
 for r in inputs:assert sha((ROOT/r['copy']).read_bytes())==r['sha256']
 spec=importlib.util.spec_from_file_location('er',ROOT/'elf_reader_portable.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 o=m.Elf(ROOT/'inputs/original.so');c=m.Elf(ROOT/'inputs/candidate.so');s=m.Elf(ROOT/'inputs/symbols.so');assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
 def ins(e,pc):
  op,reg,off,imm=struct.unpack_from('<BBhi',e.b,pc);return {'pc':pc,'raw':e.b[pc:pc+8].hex(),'opcode':op,'dst':reg&15,'src':reg>>4,'offset':off,'immediate':imm}
 def loc(e,pc):
  assert e.relocations[pc]['type']==8
  at=struct.unpack_from('<I',e.b,pc+4)[0]|struct.unpack_from('<I',e.b,pc+12)[0]<<32
  assert e.relocations[at]['type']==8
  ptr,n,line,col=struct.unpack_from('<QQII',e.b,at);ptr>>=32
  raw=e.b[ptr:ptr+n]
  return {'reference_pc':pc,'record_address':at,'record_raw':e.b[at:at+24].hex(),'file_pointer':ptr,'file_length':n,'file_raw_hex':raw.hex(),'file_display':raw.rstrip(b'\0').decode(),'line':line,'column':col}
 # The referenced panic location is the fifth argument to unwrap_failed.
 locations=[]
 for name,op,cp in [('Display_to_string_panic',79104*8,66370*8),('writer_overflow',77574*8,64804*8),('state_unchecked_slice',0x692e0,20209*8)]:
  a=loc(o,op);b=loc(c,cp);locations.append({'name':name,'original':a,'candidate':b})
 assert locations[0]['original']['line']==locations[0]['candidate']['line']==2830
 assert locations[0]['original']['column']==locations[0]['candidate']['column']==14
 assert locations[1]['original']['line']==locations[1]['candidate']['line']==33
 assert locations[2]['original']['line']==505 and locations[2]['candidate']['line']==6
 strings=(ROOT/'inputs/platform-v1.52-string.rs').read_text().splitlines()
 assert '.expect(' in strings[2829]
 current_error=(ROOT/'inputs/anchor-error-1.0.0.rs').read_text()
 ref_error=(ROOT/'inputs/reference-anchor-error-0.31.1.rs').read_text()
 def enum(text):return re.search(r'pub enum Error \{.*?\n\}',text,re.S).group(0)
 assert enum(current_error)==enum(ref_error)
 assert (ROOT/'inputs/official-anchor-error-1.0.0.rs').read_text()==current_error
 provenance=json.loads((ROOT/'inputs/official-anchor-source-provenance.json').read_text())
 assert sha(current_error.encode())==provenance['files']['lang/src/error.rs']['sha256']
 # Same constructor payload layout; compare the writes, not only total size.
 original_stores=[ins(o,i*8) for i in range(79080,79095) if ins(o,i*8)['opcode'] in [0x7a,0x7b,0x63,0x72] and ins(o,i*8)['dst']==1]
 candidate_stores=[ins(c,i*8) for i in range(66345,66360) if ins(c,i*8)['opcode'] in [0x7a,0x7b,0x63,0x72] and ins(c,i*8)['dst']==0]
 assert [(r['opcode'],r['offset'],r['immediate']) for r in original_stores]==[(r['opcode'],r['offset'],r['immediate']) for r in candidate_stores]
 assert ins(o,79108*8)['immediate']==ins(c,66374*8)['immediate']==160
 assert ins(o,79095*8)['opcode']==0xb7 and ins(o,79095*8)['dst']==0 and ins(o,79095*8)['immediate']==0
 assert ins(c,66360*8)['opcode']==0x7b and ins(c,66360*8)['offset']==8
 assert ins(c,66361*8)['opcode']==0x7a and ins(c,66361*8)['offset']==0 and ins(c,66361*8)['immediate']==0
 matches=[]
 for name,cp,op,n in [('ErrorCode_name',527344,629224,3072),('ErrorCode_Display',531008,632880,2552)]:
  assert c.normalized[cp:cp+n]==o.normalized[op:op+n] and c.pattern(cp,n)==o.pattern(op,n)
  matches.append({'label':name,'candidate_start':cp,'original_start':op,'size':n,'normalized_equal':True,'raw_equal':c.b[cp:cp+n]==o.b[op:op+n],'candidate_calls':c.callsites(cp,n),'original_calls':o.callsites(op,n),'transitive_data_closure':False})
 # Same flag bit, different load narrowing; no layout mismatch follows.
 fmt=[]
 for op,cp in [(675984+80,574880+80),(676840+72,575736+72),(677080+48,575976+48),(677720+80,576616+80),(682288+256,581120+256),(682832+88,581664+88),(682832+544,581664+544)]:
  a=ins(o,op);b=ins(c,cp);am=ins(o,op+8);bm=ins(c,cp+8)
  assert a['opcode']==0x71 and a['offset']==18 and b['opcode']==0x61 and b['offset']==16
  assert am['immediate']==128 and bm['immediate']==1<<23
  fmt.append({'original_load':a,'candidate_load':b,'original_mask':am,'candidate_mask':bm,'same_little_endian_flag_bit':True})
 hashes=[]
 for name,e in [('original',o),('candidate',c)]:
  token=b'hashbrown-0.15.4/src/raw/mod.rs';at=e.b.index(token);start=e.b.rfind(b'\0',0,at)+1;end=e.b.index(b'\0',at)
  hashes.append({'binary':name,'token_address':at,'literal_address':start,'literal':e.b[start:end].decode(),'kind':'embedded path inventory; not a newly resolved executable reference'})
 info=json.loads((ROOT/'inputs/current-rustc-info.json').read_text());versions=[r['stdout'] for r in info['outputs'].values() if r['stdout'].startswith('rustc ')]
 assert len(versions)==1 and '1.89.0-dev' in versions[0] and 'LLVM version: 20.1.7' in versions[0]
 toolversion=(ROOT/'inputs/platform-v1.52-version.md').read_text();assert toolversion.startswith('790f1537507dbdb0da320fbb3b1c1eca3b33c474')
 prior=json.loads((ROOT/'inputs/historical-build03-comparison.json').read_text());assert prior['selected_toolchain']=='v1.52'
 build=json.loads((ROOT/'inputs/current-build-attempt.json').read_text());assert build['selected_toolchain']=='v1.52'
 return {'conclusion':'Compiler/framework lowering provenance remains unresolved; no Error-type source correction or uniquely identified replacement toolchain follows.',
  'original_sha256':sha(o.b),'candidate_sha256':sha(c.b),'inputs':len(inputs),'source_edits':0,'compiler_invocations':0,'runtime_probes':0,
  'error_enum_source_equal_between_reference_0311_and_selected_100':True,'error_enum':enum(current_error),'official_anchor_source':provenance['files']['lang/src/error.rs'],
  'payload_shape':{'allocated_bytes':160,'original_stores':original_stores,'candidate_stores':candidate_stores,'observed_store_layout_equal':True,'original_return':[ins(o,79095*8),ins(o,79096*8)],'candidate_return':[ins(c,66360*8),ins(c,66361*8),ins(c,66362*8)],'limit':'One constructor/variant, not proof of every Error or payload type.'},
  'referenced_source_locations':locations,'normalized_framework_body_matches':matches,'format_flag_accesses':fmt,'hashbrown_path_markers':hashes,
  'retained_toolchain':{'selected_version':'v1.52','rustc_info_stdout':versions[0],'release_version_file':toolversion,'historical_executable_sha256':prior['rustc_sha256'],'current_build_uses_same_selected_version':True},
  'historical_burn_trials':{'build01':'E0614 attribute expression failure; v1.52.','build02':'Successful v1.52 draft with convenience event macro; account layout mismatch.','build03':'Successful v1.52 draft using explicit borrowed event accounts.','macro_pins':'Recorded downgrade from unconstrained1.2.1 macros to exact1.0.0; not an ABI trial.','limit':'Bounded burn lineage only; no assertion of exhaustive repository-wide trial history.'},
  'inferences':['The inspected constructor payload layout does not support changing Error enum shape.','Original Linux-style and candidate Darwin-style stdlib paths identify different artifact build roots, assuming truthful unremapped metadata; they do not prove target build hosts or the cause of the return convention.','Shared string.rs2830:14, BpfWriter33:9, hashbrown0.15.4 and matching framework bodies are family compatibility evidence, not a unique compiler release identification.','Byte18 bit7 and word16 bit23 access the same little-endian flag; the small formatting mismatches do not establish a changed Formatter layout.'],
  'remaining_evidence_needed':['Exact original platform-tools release/build or a retained official artifact tied to its returned-register convention.','Evidence separating Rust/LLVM lowering, build profile and dependency representation effects without source or compiler variant guessing.'],
  'recommendation':'Keep source and selected build fixed. No new compiler build, enum rewrite, manual serializer or source-location remapping is justified by this report.'}
if __name__=='__main__':print(json.dumps(analyze(),indent=2))
