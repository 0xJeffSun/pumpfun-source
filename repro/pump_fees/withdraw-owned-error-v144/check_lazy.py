from pathlib import Path
import sys,struct,json,hashlib
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'analysis/method'));from elf_reader import Elf
O=Elf(P/'analysis/method/inputs/original.so');C=Elf(P/'candidate.so')
def ins(e,p):return struct.unpack('<BBhi',e.b[p:p+8])
def call(e,p,t):assert ins(e,p)[0]==0x85 and p+8+ins(e,p)[3]*8==t
for p,t in [(615272,632880),(615344,632880),(615696,632880)]:call(C,p,t);assert ins(C,p-8)[3]==35
for p,t in [(615232,615248),(615312,615656),(615664,616344)]:assert p+8+ins(C,p)[2]*8==t
assert ins(C,633272)[3]==6000
# Whole enum conversion body now exactly matches original under same accepted relocation normalization.
assert O.normalized[289880:290384]==C.normalized[632880:633384]
assert O.pattern(289880,504)==C.pattern(632880,504)
r={'passed':True,'scope':'new missing-option branches reach enum converter only on None; complete converter relocation-normalized against original','candidate_sha256':hashlib.sha256(C.b).hexdigest(),'missing_calls':[615272,615344,615696],'enum_converter':[632880,633384],'original_converter':[289880,290384],'origin_none':True,'whole_application_identity':False}
(P/'static-gate.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
