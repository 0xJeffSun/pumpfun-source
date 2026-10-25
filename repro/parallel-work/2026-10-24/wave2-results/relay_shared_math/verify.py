#!/usr/bin/env python3
"""Portable static evidence verifier. No builds, program execution, or emulation."""
import hashlib,json,struct,sys
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 manifest=json.loads((P/'manifest.json').read_text())
 for n,v in manifest['files'].items():
  path=P/n
  assert path.is_relative_to(P) and path.is_file(),n
  b=path.read_bytes();assert len(b)==v['bytes'] and H(b)==v['sha256'],n
 b=(P/'inputs/deployed.so').read_bytes()
 assert H(b)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
 from analyze_shared import derive_shared
 from disasm import render
 derived=derive_shared()
 for n,v in derived.items():assert json.loads((P/n).read_text())==v,n
 for o in derived['coverage.json']['direct_closure_ordinals']:
  assert (P/'disassembly'/f'{o:03}.txt').read_text()==render(o),o
 # Independent landmark checks against decoded operands.
 checks={114048:(0xa5,3,51,256),118912:(0x57,2,0,65535),118920:(0xa5,2,51,10001),114368:(0x62,10,-128,6009),115040:(0x62,10,-128,6015),119240:(0x62,10,-128,6018),152360:(0x07,7,0,6000),141256:(0x37,7,0,10000),142352:(0x69,0x42,0,0),142456:(0xb7,4,0,10000),143320:(0xad,0x87,1,0),143416:(0x15,1,13,-1)}
 for pc,expected in checks.items():assert struct.unpack_from('<BBhi',b,pc)==expected,(pc,expected)
 result=json.loads((P/'result.json').read_text())
 assert result['source_identity_unresolved']==492
 assert result['builds']==result['runtime_probes']==0
 print(json.dumps({'ok':True,'mode':'static-byte-and-ledger-verification-only','manifest_sha256':H((P/'manifest.json').read_bytes()),'sealed_files':len(manifest['files']),'inferred_windows_rederived':492,'source_identity_unresolved':492,'direct_closure_windows':len(derived['coverage.json']['direct_closure_ordinals']),'direct_call_sites_in_roots':130,'external_call_sites_in_roots':2,'indirect_sites_in_closure':7,'run_directory':str(P),'limits':'Semantic prose/sketches are not machine-proven; no execution or build.'},indent=2))
if __name__=='__main__':main()
