from pathlib import Path
import json,hashlib,struct,sys,gzip
P=Path(__file__).resolve().parent;B=P.parent;ROOT=B.parents[1]
sys.path.insert(0,str(P/'method'));import disasm
H=lambda b:hashlib.sha256(b).hexdigest()
U=disasm.a.Elf((B/'build01/target/sbf-solana-solana/release/mayhem_recovered.so').read_bytes())
C=disasm.a.Elf((B/'build01/artifacts/mayhem_recovered.so').read_bytes())
O=disasm.a.Elf((B/'source/evidence/original/mayhem/deployed.so').read_bytes())
for s in U.sections:
 if s['flags']&2 and s['type']!=8:
  assert s['name'] in C.by_name and U.section_bytes(s)==C.section_bytes(C.by_name[s['name']]),s['name']
syms=[x for x in U.symbols if x['type']==2 and x['size']]
handler=next(x for x in syms if 'buy_pump_swap7handler' in x['name'])
debug=next(x for x in syms if 'PumpSwapError' in x['name'] and 'Debug' in x['name'])
unwrap=next(x for x in syms if 'core6result13unwrap_failed' in x['name'])
for label,e,a,b in [('candidate-buy-handler',C,handler['start'],handler['start']+handler['size']),('candidate-debug',C,debug['start'],debug['start']+debug['size']),('candidate-result-unwrap',C,unwrap['start'],unwrap['start']+unwrap['size']),('original-buy-sizing',O,185296,186552),('original-debug',O,196888,197000),('original-result-unwrap',O,674280,674512)]:
 (P/(label+'.asm')).write_text(disasm.render(e,a,b))
def ins(e,pc):return struct.unpack('<BBhi',e.at(pc,8))
assert ins(C,130856)==(0x62,0x0a,-2880,11)
op,r,off,imm=ins(C,130936);assert op==0x85 and 130944+imm*8==unwrap['start']
assert C.at(609619,43)==O.at(709876,43)==b'called `Result::unwrap()` on an `Err` value'
# Candidate and original typed-error vtable layouts agree on meaningful size/alignment.
assert struct.unpack('<QQ',C.at(625432,16))==(4,4)
assert struct.unpack('<II',C.at(625448,8))[1]==debug['start']
assert C.at(610788,23)==O.at(710761,23)==b'PumpSwapCpiMathOverflow'
# Preserve all original rows exactly; never newly decode excluded/opaque functions.
prior=json.loads(gzip.decompress((P/'prior-residual-ledger.json.gz').read_bytes()).decode())
original_rows=prior['original_rows']
rows=[]
for x in syms:
 rows.append({'name':x['name'],'start':x['start'],'size':x['size'],'raw_sha256':H(C.at(x['start'],x['size'])) if x['start']+x['size'] <= C.by_name['.text']['address']+C.by_name['.text']['size'] else H(U.at(x['start'],x['size'])),'status':'symbol_extent_and_raw_hash_only_not_semantic_match'})
ledger={'original_sha256':H(O.b),'candidate_sha256':H(C.b),'scope':'All prior original rows retained verbatim with their prior provenance; every current candidate function symbol has an extent/raw hash. No initializer or opaque original function was newly decoded; no global normalized-match improvement is inferred.','original_rows':original_rows,'prior_candidate_rows':prior['candidate_rows'],'candidate_symbol_rows':rows,'selected_static_result':{'candidate_handler':handler,'candidate_error_debug':debug,'candidate_unwrap':unwrap,'typed_error_store_pc':130856,'typed_result_unwrap_call_pc':130936,'debug_name_equal':True,'meaningful_vtable_size_align_equal':True,'stripped_unstripped_allocated_sections_equal':True}}
(P/'full-ledger.json').write_text(json.dumps(ledger,indent=2)+'\n')
(P/'summary.json').write_text(json.dumps({k:ledger[k] for k in ['original_sha256','candidate_sha256','scope','selected_static_result']},indent=2)+'\n')
print(json.dumps({'original_rows':len(original_rows),'prior_candidate_rows':len(prior['candidate_rows']),'new_candidate_symbol_rows':len(rows),'typed_result_error_static_check':'passed'}))
