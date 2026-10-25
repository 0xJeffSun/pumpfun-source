from pathlib import Path
import sys,json,struct,hashlib
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'analysis/method'));from elf_reader import Elf
C=Elf(P/'candidate.so');O=Elf(P/'analysis/method/inputs/original.so');S=Elf(P/'symbols.so')
def ins(e,p):return struct.unpack('<BBhi',e.b[p:p+8])
f=next(f for f in S.funcs if '19pump_fees_candidate25create_fee_sharing_config' in f['name']);assert(f['start'],f['size'])==(509160,13056)
assert ins(C,509240)==(0x71,0x73,580,0)
assert ins(C,509248)==(0x15,0x03,316,2) and 509248+8+316*8==511784
assert ins(C,511800)[3]==19 and ins(C,511808)[0]==0x85 and 511816+ins(C,511808)[3]*8==632328
assert C.normalized[632328:632832]==O.normalized[289880:290384]and C.pattern(632328,504)==O.pattern(289880,504)
assert ins(C,632328+408)==(0x72,0x0a,-192,2)
g=json.loads((P/'gate-before.json').read_text());assert len(g['scratch_source'])==26
for n,h in g['scratch_source'].items():assert hashlib.sha256((P/'source'/n).read_bytes()).hexdigest()==h
before=(P/'before-sharing.rs').read_text();after=(P/'source/programs/pump-fees/src/sharing.rs').read_text();assert after==before.replace('.ok_or(error!(FeeError::AmmAccountsRequiredForGraduatedCoin))?','.ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?')
r={'passed':True,'candidate_sha256':hashlib.sha256(C.b).hexdigest(),'scope':'first optional pool now branches on missing marker before enum19 conversion; all other control domains remain separately unresolved','application':[509160,522216],'missing_branch':509248,'missing_arm':511784,'enum_call':511808,'enum_converter':[632328,632832],'converter_normalized_equal_original':True,'origin_none':True,'whole_application_identity':False,'unchanged_source_lines_except_approved_site':True}
(P/'static-gate.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
