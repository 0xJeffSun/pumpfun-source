from pathlib import Path
import json,hashlib,sys,struct
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'method'));from elf_reader import Elf
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();O=Elf(P/'original.so');C=Elf(P/'current-symbols.so')
assert O.normalized[540216:544192]==C.normalized[368328:372304]and O.pattern(540216,3976)==C.pattern(368328,3976)
assert any(f['start']==368328 and 'accounts..Global'in f['name']and'try_deserialize_unchecked'in f['name']for f in C.funcs)
for p,t in [(445672,71656),(71824,35064),(35720,539488),(540200,540216),(35968,796360),(446320,796360),(455480,796360),(541736,60128),(541896,60128)]:assert O.calls[p]==t,(p,t)
def eq(p,v):assert struct.unpack('<BBhi',O.b[p:p+8])==v,p
for p,v in [(35928,(7,1,0,24)),(35952,(7,2,0,-720)),(35960,(183,3,0,715)),(446304,(7,2,0,-2384)),(446312,(183,3,0,723)),(455448,(7,1,0,432)),(455464,(7,2,0,-1656)),(455472,(183,3,0,723)),(543544,(99,0x16,352,0))]:eq(p,v)
assert 432+(352+8-16)==776
fields=next(t for t in json.loads((P/'pump.json').read_text())['types']if t['name']=='Global')['type']['fields'];assert [x['name']for x in fields][12:16]==['fee_recipients','set_creator_authority','admin_set_creator_authority','create_v2_enabled']
for n,h in json.loads((P/'manifest.json').read_text()).items():assert H(P/n)==h,n
print(json.dumps({'passed':True,'full_typed_decoder_match_bytes':3976,'context776_decoded_offset':352,'typed_role_lead':'admin_set_creator_authority','source_patch':None,'remaining_gap':'independent serialized-cursor/member ordering proof and complete authorization truth table','builds':0,'target_executions':0}))
