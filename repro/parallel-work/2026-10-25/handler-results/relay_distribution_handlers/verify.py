#!/usr/bin/env python3
"""Portable, read-only verification. No ELF loading, target execution or fixtures."""
import hashlib,json,struct
from pathlib import Path
import analyze,disasm
P=Path(__file__).resolve().parent

def check(ok,msg):
 if not ok: raise ValueError(msg)
def main():
 manifest_bytes=(P/'manifest.json').read_bytes()
 check(hashlib.sha256(manifest_bytes).hexdigest()==(P/'manifest.sha256').read_text().strip(),'manifest seal')
 m=json.loads(manifest_bytes)
 actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}-{ 'manifest.json','manifest.sha256' }
 check(actual==set(m),'exact file set')
 for rel,h in m.items():check(hashlib.sha256((P/rel).read_bytes()).hexdigest()==h,'file hash '+rel)
 for row in json.loads((P/'provenance.json').read_text()):
  b=(P/row['path']).read_bytes()
  check(len(b)==row['size'] and hashlib.sha256(b).hexdigest()==row['sha256'],'input '+row['path'])
  check(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==row['git_blob_sha1'],'Git content '+row['path'])
 check(analyze.derive()==json.loads((P/'static-evidence.json').read_text()),'static extraction')
 for n in analyze.SELECTED:check((P/'listings'/f'{n}.asm').read_text()==disasm.render(n),'listing '+str(n))
 b=disasm.B
 def instruction(pc,op,dst,src,off,imm):
  check(struct.unpack_from('<BBhi',b,pc)==(op,dst|(src<<4),off,imm),'operand '+str(pc))
 def call(pc,target):instruction(pc,0x85,0,1,0,(target-pc-8)//8)
 for pc,target in [(547520,402000),(549488,420984),(547904,570376),(549872,567392),(570520,91880),(567536,97096),(96112,119440),(101792,119440),(121640,141384),(123192,614432),(96240,17712),(101920,17712),(96544,127704),(102224,127704),(129680,616736),(128272,621096),(418112,651352),(418960,651352),(434880,651352),(412032,152048)]:call(pc,target)
 for pc in [93824,99920]:
  op,r,o,i=struct.unpack_from('<BBhi',b,pc);check((op,r,i)==(0x55,1,10000),'weight sum gate')
 instruction(412024,0xb7,2,0,0,33)
 instruction(120064,0xb7,2,0,0,30)
 instruction(94360,0x79,7,3,232,0)
 instruction(100456,0x79,0,3,408,0)
 instruction(94368,0x15,7,0,55,0)
 instruction(633904,0x72,0,0,0,8)
 instruction(634672,0x72,0,0,0,9)
 instruction(632696,0x72,0,0,0,12)
 instruction(639416,0x62,10,0,-80,12)
 instruction(636240,0x62,10,0,-80,8)
 instruction(124264,0x15,3,0,9,0)
 instruction(59528,0xa5,8,0,25,3)
 instruction(58864,0xb7,3,0,0,113)
 for pc,num in [(94176,6022),(100272,6022),(92312,6028),(97528,6028),(125872,6014),(126488,6024),(127128,6025)]:
  op,r,o,i=struct.unpack_from('<BBhi',b,pc);check(op==0x62 and i==num,'error code '+str(pc))
 check(b[754884:754899]==b'distribution_v1','PDA literal')
 check(b[756958:756975]==b'__event_authority','event PDA literal')
 check(b[759376:759380]==b'\x09\0\0\0','close enum descriptor')
 check(len(b)==830448 and hashlib.sha256(b).hexdigest()=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','original ELF')
 print(json.dumps({'status':'pass','files':len(m),'selected_windows':len(analyze.SELECTED),'static_only':True,'target_execution':False,'semantic_proof':'manual conditional; not certified by verifier'},sort_keys=True))
if __name__=='__main__':main()
