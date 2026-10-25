from pathlib import Path
import sys,json,hashlib,importlib.util
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'reference/analysis-method'))
from elf_reader import Elf
from window_tools import instructions,window,comparison
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
C=Elf(W/'candidate.so');S=Elf(W/'symbols.so');O=Elf(W/'reference/analysis-method/inputs/original.so')
def ins(e,pc):return instructions(e,pc,16 if e.b[pc]==24 else 8)[0]
rows=[]
for side,e,starts,offs,ends in [('original',O,[237576,240232],[64,48,56,40],[237872,240464]),('candidate',C,[505656,514672],[424,408,416,400],[506872,516048])]:
 for start,end in zip(starts,ends):
  for i,off in enumerate(offs):
   x=ins(e,start+i*16);b=ins(e,start+i*16+8)
   assert x['opcode']==0x79 and x['offset_signed']==off
   assert b['opcode']==0x55 and b['immediate_signed']==0 and b['branch_target']==end
  rows.append({'side':side,'start':start,'reserve_field_order':['real_sol','virtual_sol','real_token','virtual_token'],'offsets':offs,'nonzero_skip_target':end,'instructions':instructions(e,start,136 if side=='candidate' else (216 if start==237576 else 152))})
for e,pc,pointer in [(C,505736,698656),(C,514752,698656),(O,237656,800416),(O,240312,800416)]:assert ins(e,pc)['imm64_unsigned']==pointer and e.b[pointer:pointer+32]==bytes(32)
for e,pc,target in [(C,505784,506872),(C,514800,516048),(O,237784,237872),(O,240376,240464)]:
 x=ins(e,pc);assert x['opcode']==0x15 and x['immediate_signed']==0 and x['branch_target']==target
# Raw quote reads, Ref release, two Rc strong/conditional weak decrements precede comparison.
for pc,off in [(425256,107),(425272,99),(425288,91),(425304,83)]:assert ins(C,pc)['opcode']==0x79 and ins(C,pc)['offset_signed']==off
assert (ins(C,425320)['opcode'],ins(C,425320)['offset_signed'])==(0x7b,16)
for pc in [425416,425448,425472,425504]:assert (ins(C,pc)['opcode'],ins(C,pc)['immediate_signed'])==(7,-1)
assert ins(C,425432)['branch_target']==425464 and ins(C,425488)['branch_target']==425520
assert ins(C,425600)['immediate_signed']==32 and ins(C,425608)['direct_target']==694768
assert ins(C,425120)['branch_target']==425328 # short account joins before Rc destruction
assert ins(O,165200)['opcode']==0x7b
# Original ownership slice is re-decoded from original ELF, not accepted on prose alone.
quote={'original':instructions(O,164864,856),'candidate':instructions(C,425064,576),'candidate_ref_release':425320,'candidate_rc_decrements':[425416,425448,425472,425504],'candidate_zero_compare':425608,'owned_helper_inlined':True}
# Both published patch results are exact; borrowed Pool and SharingConfig remain untouched.
src=W/'source/programs/pump-fees/src';assert H(src/'donation.rs')==H(W/'inputs/fees-quote-ownership/proposed-donation.rs');assert H(src/'sharing_update.rs')==H(W/'inputs/fees-sharing/pending-sharing_update.rs')
d=(src/'donation.rs').read_text();assert 'let info = &ctx.accounts.pool;' in d and 'let sharing = &ctx.accounts.sharing_config;' in d
spec=importlib.util.spec_from_file_location('retained',W/'reference/verify_retained.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);retained=m.run();(W/'retained-static-gate.json').write_text(json.dumps(retained,indent=2)+'\n')
# Recheck every validated registry payload and archived dependency after the compiler.
cache=J(W/'inputs/cache-integrity.json');count=0
for p in cache['packages']:
 for a in p['archives']:
  assert H(W/'cargo-home'/Path(a['path']).relative_to(cache['cache']))==a['sha256'];count+=1
 for s in p['extracted_sources']:
  for n,h in s['files_sha256'].items():assert H(W/'cargo-home'/Path(s['path']).relative_to(cache['cache'])/n)==h;count+=1
for n,h in J(W/'inputs/corrected-source-sha256.json').items():assert H(W/'source'/n)==h
build=J(W/'build-result.json');assert build['returncode']==0 and not build['backend_stack_diagnostics'] and build['source_unchanged']
pairs=[]
for tag,oa,os,ca,cs in [('sharing_legacy',193400,5672,505064,7648),('sharing_v2',211408,14312,512712,11568)]:
 # Use authoritative inferred original window extent, not an assumed size.
 from window_tools import extent
 os=extent(O,oa)
 pairs.append({'role':tag,'original':window(O,oa,os,[]),'candidate':window(C,ca,cs,S.funcs),'comparison':comparison(O,C,oa,ca,os,cs)})
out={'passed':True,'candidate_sha256':H(W/'candidate.so'),'symbols_sha256':H(W/'symbols.so'),'reserve_predicates':rows,'quote_ownership':quote,'sharing_complete_windows':pairs,'dependency_payloads_rechecked':count,'whole_original_equal':C.b==O.b,'limitations':['No added reserve-variant cases or observable zero-lamport presence cases.','Static bounded def-use checks and finite tests are not exhaustive semantic or security proofs.','Whole handler and whole ELF equality not established.']}
(W/'static-gate.json').write_text(json.dumps(out,indent=2)+'\n');print('Static gate passed')
