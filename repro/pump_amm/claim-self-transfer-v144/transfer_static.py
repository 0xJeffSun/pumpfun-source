from pathlib import Path
import json,struct,sys
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'static-tool'));from elf_reader import Elf
C=Elf(W/'candidate.so');S=Elf(W/'unstripped.so');O=Elf(W/'source/evidence/original/pump_amm/deployed.so');I=lambda e,a:struct.unpack_from('<BBhi',e.b,a)
def call(e,a):assert I(e,a)[:2]==(0x85,0x10);return a+8+I(e,a)[3]*8
def branch(e,a):return a+8+I(e,a)[2]*8
f=next(f for f in S.funcs if 'pump_amm_recovered18pump_amm_recovered22claim_token_incentives17h'in f['name']);t=next(f for f in S.funcs if 'anchor_spl10token_202216transfer_checked17h'in f['name'])
assert I(C,0xb1de0)==(0x55,0,0x42,0)and I(C,0xb1e78)==(0x15,0,0x2f,0)
assert branch(C,0xb1de0)==branch(C,0xb1e78)==0xb1ff8
assert call(C,0xb1dc8)==call(C,0xb1e60)
assert I(C,0xb1dc0)==I(C,0xb1e58)==(0xb7,3,0,32)
assert I(C,0xb36a0)==(0x62,0x0a,-0x140,6087)
assert C.normalized[t['start']:t['start']+t['size']]==O.normalized[0xf4a30:0xf4a30+t['size']]and t['size']==2192
calls=[x for x in C.callsites(f['start'],f['size'])if x['target']==t['start']];assert len(calls)==1 and calls[0]['offset']>0xb1ff8-f['start']
result={'candidate_handler':f,'source_destination_compare':0xb1dc8,'owner_authority_compare':0xb1e60,'key_inequality_success_branch':0xb1de0,'owner_equality_success_branch':0xb1e78,'success_block':0xb1ff8,'plain_error_6087_store':0xb36a0,'transfer_checked':t,'transfer_call':calls[0],'downstream_original':0xf4a30,'downstream_normalized_body_equal':True,'note':'No new reachability claim; the existing ATA parser constraints may exclude this failure. This proves compiled predicate/error presence, not complete handler/call/data equality.'}
(W/'transfer-static.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
