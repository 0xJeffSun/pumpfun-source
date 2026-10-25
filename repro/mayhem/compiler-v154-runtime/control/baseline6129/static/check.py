from pathlib import Path
import sys,json,struct,hashlib
P=Path(__file__).resolve().parent;B=P.parent
sys.path.insert(0,str(P/'method'));import disasm
H=lambda b:hashlib.sha256(b).hexdigest()
C=disasm.a.Elf((B/'build01/artifacts/mayhem_recovered.so').read_bytes());U=disasm.a.Elf((B/'build01/target/sbf-solana-solana/release/mayhem_recovered.so').read_bytes());O=disasm.a.Elf((B/'source/evidence/original/mayhem/deployed.so').read_bytes())
ins=lambda e,pc:struct.unpack('<BBhi',e.at(pc,8))
assert ins(C,142632)==(0x1d,0x68,1204,0)
assert ins(C,152272)==(0x62,0x0a,-2688,11)
assert ins(C,152288)==(0x07,0x03,0,-2688)
assert ins(C,152352)[0]==0x85 and 152360+ins(C,152352)[3]*8==574056
assert C.at(609683,43)==O.at(709876,43)==b'called `Result::unwrap()` on an `Err` value'
assert struct.unpack('<QQ',C.at(625496,16))==(4,4)
assert struct.unpack('<II',C.at(625512,8))[1]==290568
assert C.at(610852,23)==O.at(710761,23)==b'PumpSwapCpiMathOverflow'
for s in U.sections:
 if s['flags']&2 and s['type']!=8:assert U.section_bytes(s)==C.section_bytes(C.by_name[s['name']])
for label,e,lo,hi in [('new-sell-handler',C,138824,152560),('new-debug',C,290568,290672),('new-result-unwrap',C,574056,574288),('original-sell-sizing',O,186552,187672),('original-debug',O,196888,197000),('original-result-unwrap',O,674280,674512)]:
 (P/(label+'.asm')).write_text(disasm.render(e,lo,hi))
r={'original_sha256':H(O.b),'candidate_sha256':H(C.b),'candidate_symbols_sha256':H(U.b),'equality_branch':142632,'typed_error11_store':152272,'typed_result_unwrap_call':152352,'result_unwrap_target':574056,'debug_formatter':290568,'correct_name_and_4_byte_vtable':True,'allocated_sections_equal':True,'scope':'Zero-divisor/equality error construction only; subtraction-underflow path unchanged; no full equivalence claim.'}
(P/'summary.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
