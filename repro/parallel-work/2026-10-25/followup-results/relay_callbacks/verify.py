#!/usr/bin/env python3
"""Location-independent static evidence checks; never runs target code."""
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import json,hashlib,struct
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P))
H=lambda b:hashlib.sha256(b).hexdigest()
def verify():
 m=json.loads((P/'manifest-sha256.json').read_text())
 actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f.name!='manifest-sha256.json'}
 assert actual==set(m),('file set differs',actual^set(m))
 for name,h in m.items():assert H((P/name).read_bytes())==h,name
 for r in json.loads((P/'provenance.json').read_text()):
  b=(P/r['path']).read_bytes();assert len(b)==r['size'] and H(b)==r['sha256'],r['path']
  if r.get('git_blob'):assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],r['path']
 old=json.loads((P/'inputs/prior-manifest.json').read_text())
 for f in ['REPORT.md','result.json','provenance.json']:assert H((P/('inputs/prior-'+f)).read_bytes())==old[f]
 old=json.loads((P/'inputs/error-codec-manifest-sha256.json').read_text())
 assert H((P/'inputs/error-codec-REPORT.md').read_bytes())==old['REPORT.md']
 import derive,disasm
 data=derive.derive();assert data==json.loads((P/'static-evidence.json').read_text())
 for o in data['listing_ordinals']:assert (P/'disassembly'/f'{o:03}.txt').read_text()==disasm.render(o)
 s='\n'.join(f'{pc}: {raw} {t}' for a,z in [(566472,566688),(657016,657648)] for pc,raw,t in disasm.instructions(a,z))+'\n'
 assert (P/'disassembly/allocator-cleanup.txt').read_text()==s
 targets={t['base']:t['encoded_file_target'] for t in data['tables']}
 assert targets=={772792:50616,774912:647008,778488:713040,778896:716584}
 b=disasm.B
 def ins(pc,op,regs,off,imm):assert b[pc:pc+8]==struct.pack('<BBhi',op,regs,off,imm),pc
 # Record2 producer, descriptor, fixed sink construction, callback and consumer.
 ins(653416,0x7b,0x1a,-200,0)
 ins(653496,0x7b,0x7a,-208,0)
 ins(653560,0x7a,0x0a,-96,0)
 ins(653576,0x7a,0x0a,-104,3)
 ins(721504,0x7b,0x1a,-32,0)
 ins(721496,0x7b,0x2a,-24,0)
 ins(721520,0x7a,0x0a,-16,32)
 ins(721744,0x8d,0,0,3)
 ins(725688,0x79,0x14,32,0)
 ins(725696,0x79,0x11,40,0)
 ins(725704,0x79,0x15,24,0)
 for pc in [717176,717384]:ins(pc,0x79,0x14,24,0)
 for pc in [717224,717408]:ins(pc,0x8d,0,0,4)
 ins(152368,0x63,0x7a,-128,0)
 ins(152376,0x72,0x0a,-200,2)
 ins(152384,0x7a,0x0a,-280,2)
 for pc in [657112,657152,657632]:
  assert b[pc]==0x85 and pc+8+8*struct.unpack_from('<i',b,pc+4)[0]==566680
 result=json.loads((P/'result.json').read_text())
 assert result['all_context_callback_closure'] is False
 assert result['concrete_contexts'][0]['targets']==[713040]
 assert result['concrete_contexts'][0]['site']==725720
 return dict(ok=True,mode='static-only',files=len(m),git_blobs=3,public_package_seals=2,concrete_sites=1,parametric_sites=2,all_context_closure=False)
if __name__=='__main__':print(json.dumps(verify(),indent=2))
