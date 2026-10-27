#!/usr/bin/env python3
from pathlib import Path
import argparse,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2];DEFAULT=ROOT/'work/amm-parallel-fee-gates-20261027'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,default=DEFAULT/'build/artifacts/pump_amm_recovered.so');p.add_argument('--symbols',type=Path,default=DEFAULT/'build/artifacts/unstripped.so');p.add_argument('--closure',type=Path,default=ROOT/'repro/pump_amm/final-closure-audit-20261027/closure.json');p.add_argument('--measurement',type=Path,default=DEFAULT/'measurement.json');a=p.parse_args()
 assert sha(HERE/'manifest.json')=='d0f94745a7230a7408d456163d8f774de7197911ebcf80ccb0be7ff94d9f5ae6'
 for name,digest in json.loads((HERE/'manifest.json').read_text()).items():assert sha(HERE/name)==digest,name
 assert sha(a.candidate)=='2f5dfd029128dd345dfe80a4fc5385fb4624127b5d77ddb3c81a2bba024b08dd'
 s=importlib.util.spec_from_file_location('table_closure',HERE/'audit.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);r=m.audit(a.candidate,a.symbols,a.closure,a.measurement);assert r==json.loads((HERE/'results.json').read_text())
 print(json.dumps(r['counts']))
if __name__=='__main__':main()
