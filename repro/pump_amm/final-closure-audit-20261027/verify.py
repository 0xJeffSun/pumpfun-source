#!/usr/bin/env python3
"""Recompute the guarded candidate's newly bound closure and literal reports."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
DEFAULT=ROOT/'repro/pump_amm/parallel-fee-gates-20261027/results'  # published copy of work/amm-parallel-fee-gates-20261027
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def module(name,p):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def uncompressed(p):
 # The recorded reports hash the uncompressed measurement; the published copy is gzipped.
 if p.suffix!='.gz':return p
 t=Path(tempfile.mkdtemp())/p.with_suffix('').name;t.write_bytes(gzip.decompress(p.read_bytes()));return t
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,default=DEFAULT/'build/candidate.so');p.add_argument('--symbols',type=Path,default=DEFAULT/'build/unstripped.so');p.add_argument('--measurement',type=Path,default=DEFAULT/'measurement.json.gz');a=p.parse_args();a.measurement=uncompressed(a.measurement)
 assert sha(HERE/'manifest.json')=='2b73071c567bd67424734b2f5e67c42d767c20e7837d218b9c44e17dc2883265'
 for name,digest in json.loads((HERE/'manifest.json').read_text()).items():assert sha(HERE/name)==digest,name
 assert sha(a.candidate)=='2f5dfd029128dd345dfe80a4fc5385fb4624127b5d77ddb3c81a2bba024b08dd'
 tool=ROOT/'repro/pump_amm/call-closure-audit-20261027';m=module('final_closure',tool/'audit.py');r=m.analyze(a.candidate,a.symbols,a.measurement);assert r==json.loads((HERE/'closure.json').read_text())
 n=module('final_literals',tool/'literal_constraints.py');lit=n.analyze(a.candidate,a.symbols,r);assert lit==json.loads((HERE/'literals.json').read_text())
 print(json.dumps({'closure':r['counts'],'literals':lit['counts']}))
if __name__=='__main__':main()
