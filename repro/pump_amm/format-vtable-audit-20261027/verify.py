#!/usr/bin/env python3
"""Authenticate and recompute the bounded vtable/descriptor checks."""
from pathlib import Path
import hashlib,importlib.util,json,subprocess,sys
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 assert sha(HERE/'manifest.json')=='e196d9c4d1b686c218ec8a3c7c4965c82ea47a9f6dbf14b8fe5909f7902fe58e'
 for name,digest in json.loads((HERE/'manifest.json').read_text()).items():assert sha(HERE/name)==digest,name
 subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/call-closure-audit-20261027/verify.py')],check=True,stdout=subprocess.DEVNULL)
 s=importlib.util.spec_from_file_location('vtable_audit',HERE/'audit.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);r=m.audit();assert r==json.loads((HERE/'results.json').read_text())
 print(json.dumps({'verified_vtable_references':r['verified_vtable_reference_count'],'unresolved_vtable_references':r['unresolved_vtable_reference_count'],'vtable_constrained_direct_pairs':r['vtable_constrained_direct_closure_pairs'],'eof_descriptor_references':len(r['eof_descriptor_references']),'conditional_writer_method_sites':len(r['writer_wrapper']['conditional_writer_method_calls'])}))
if __name__=='__main__':main()
