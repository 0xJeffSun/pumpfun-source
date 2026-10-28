#!/usr/bin/env python3
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2];DEFAULT=ROOT/'repro/pump_amm/parallel-fee-gates-20261027/results'  # published copy of work/amm-parallel-fee-gates-20261027
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def uncompressed(p):
 # The recorded reports hash the uncompressed measurement; the published copy is gzipped.
 if p.suffix!='.gz':return p
 t=Path(tempfile.mkdtemp())/p.with_suffix('').name;t.write_bytes(gzip.decompress(p.read_bytes()));return t
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,default=DEFAULT/'build/candidate.so');p.add_argument('--symbols',type=Path,default=DEFAULT/'build/unstripped.so');p.add_argument('--closure',type=Path,default=ROOT/'repro/pump_amm/final-closure-audit-20261027/closure.json');p.add_argument('--measurement',type=Path,default=DEFAULT/'measurement.json.gz');a=p.parse_args();a.measurement=uncompressed(a.measurement)
 assert sha(HERE/'manifest.json')=='d0f94745a7230a7408d456163d8f774de7197911ebcf80ccb0be7ff94d9f5ae6'
 for name,digest in json.loads((HERE/'manifest.json').read_text()).items():assert sha(HERE/name)==digest,name
 assert sha(a.candidate)=='2f5dfd029128dd345dfe80a4fc5385fb4624127b5d77ddb3c81a2bba024b08dd'
 s=importlib.util.spec_from_file_location('table_closure',HERE/'audit.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);r=m.audit(a.candidate,a.symbols,a.closure,a.measurement);assert r==json.loads((HERE/'results.json').read_text())
 print(json.dumps(r['counts']))
if __name__=='__main__':main()
