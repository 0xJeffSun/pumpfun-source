from pathlib import Path
import json,hashlib,struct
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def verify():
 m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 for n,h in m.items():assert H(P/n)==h
 assert H(P/'original-141384.bin')=='5d61813ede0d82d1888060f3a333dfd08c2df602f7770239200f38646ceb9525';b=(P/'original-141384.bin').read_bytes();ins=lambda pc:struct.unpack_from('<BBhi',b,pc-141384)
 for pc in [143048,143200,143552]:
  op,r,o,i=ins(pc);assert op==133 and pc+8+8*i==152048
 assert ins(142496)==(121,162,-96,0) and ins(142504)==(121,163,-88,0);assert ins(142736)==(123,49,0,0)
 for pc in [142976,142984,142992]:assert ins(pc)[0]==123
 assert ins(143016)[0]==85 and ins(143080)[0]==173 and ins(143416)==(21,1,13,-1)
 return {'status':'PASS_LOCAL_EDGE_PROOF','numeric_error8_sites':3,'quotient_high_rejection':False,'owned_formatter_scope_pending':True,'source_patch':False,'new_compiler_or_VM_runs':0}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
