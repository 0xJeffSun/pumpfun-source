#!/usr/bin/env python3
"""Portable sealed static-evidence verifier; Python standard library only."""
import hashlib,json,struct,sys
from pathlib import Path
P=Path(__file__).resolve().parent
sys.dont_write_bytecode=True
sys.path.insert(0,str(P))
def check(ok,why):
 if not ok:raise SystemExit('FAIL: '+why)
def sha(b):return hashlib.sha256(b).hexdigest()
def main():
 manifest=json.loads((P/'manifest.json').read_text())
 actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file() and x.name!='manifest.json'}
 check(actual==set(manifest['files']),'inventory')
 for path,rec in manifest['files'].items():
  b=(P/path).read_bytes();check(len(b)==rec['size'] and sha(b)==rec['sha256'],'sealed file '+path)
 for r in json.loads((P/'provenance.json').read_text()):
  b=(P/r['path']).read_bytes();check(len(b)==r['size'] and sha(b)==r['sha256'],'input '+r['source'])
  check(r['commit']=='476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40','checkpoint')
 import derive,disasm
 e=json.loads((P/'static-evidence.json').read_text());check(derive.derive()==e,'rederived evidence')
 for o in derive.ORDINALS:
  check((P/'disassembly'/f'{o:03}.txt').read_text()==disasm.render(o),'listing '+str(o))
  w=disasm.W[o];check(sha(disasm.B[w['start']:w['end']])==w['sha256'],'prior original window '+str(o))
 ranges=json.loads((P/'consumed-ranges.json').read_text())
 check(ranges['code_ranges']==[{'ordinal':x['ordinal'],'range':x['range'],'sha256':x['sha256']} for x in e['windows']],'consumed code ranges')
 check(ranges['literal_ranges']==e['literal_ranges'],'consumed literals')
 B=disasm.B
 # Semantic witnesses verify operands; they do not execute the captured program.
 anchors={131256:('call',114032),131320:('call',118896),134336:('call',115456),138296:('call',130560),138392:('call',130848),140704:('call',614432),140752:('call',130560),140896:('call',752688),71648:('call',661000),72432:('call',623160),74336:('call',131136),75976:('call',621096),554576:('call',662240),556152:('call',668496),531584:('call',159032),531624:('call',669720),531672:('call',201768)}
 for pc,(_,target) in anchors.items():
  op,r,off,imm=struct.unpack_from('<BBhi',B,pc);check(op==133 and pc+8+8*imm==target,'semantic call '+str(pc))
 for pc,wanted in {132792:(0x7a,6,80,0),132800:(0x7a,6,72,0),132808:(0x72,6,89,1),133040:(0x72,6,81,1),133048:(0x7a,6,72,0),141184:(0x7b,0x21,72,0),141256:(0x37,7,0,10000),85232:(0x72,6,152,0)}.items():
  check(struct.unpack_from('<BBhi',B,pc)==wanted,'semantic store/math '+str(pc))
 variants=json.loads((P/'variants.json').read_text());idl=json.loads((P/'inputs/inputs/idl.json').read_text())
 check(set(variants)==set(derive.CHAINS),'five variants')
 for name,v in variants.items():
  check(v['chain']==e['chains'][name],'variant chain '+name)
  check(v['idl']==next(x for x in idl['instructions'] if x['name']==name),'IDL '+name)
  check(len(v['ledger'])==11 and all(x['gap'] for x in v['ledger']),'gap ledger '+name)
 check(sha(B)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','whole ELF')
 print(json.dumps({'status':'PASS','kind':'static evidence, not execution or source equivalence','files':len(actual),'selected_windows':len(derive.ORDINALS),'variants':5,'manifest_sha256':sha((P/'manifest.json').read_bytes())},sort_keys=True))
if __name__=='__main__':main()
