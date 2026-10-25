#!/usr/bin/env python3
"""Reuse the frozen layer-one matching conventions for a selected input directory.

python -B run_layer.py pump|fees [--inputs PROGRAM_DIRECTORY] [--baseline JSON]
                         [--output NEW_DIRECTORY] [--check]
Input paths/maps are explicit; no compiler, VM, signing, network or source edits.
"""
from pathlib import Path
import argparse,gzip,hashlib,importlib,json,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
def encoded(v):return(json.dumps(v,sort_keys=True,separators=(',',':'))+'\n').encode()
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('program',choices=['pump','fees']);p.add_argument('--inputs',type=Path);p.add_argument('--baseline',type=Path);p.add_argument('--output',type=Path);p.add_argument('--check',action='store_true');a=p.parse_args();k=a.inputs.resolve()if a.inputs else P/a.program;output=a.output.resolve()if a.output else P/a.program/'ledgers'
 if not a.check:output.mkdir(parents=True,exist_ok=False)
 sys.path.insert(0,str(P/a.program));module=importlib.import_module('analyze');module.W=k;module.HERE=k
 selection=json.loads((k/'input-selection.json').read_text());sha=lambda f:hashlib.sha256(f.read_bytes()).hexdigest()
 for n,h in [('original.so',selection['original_sha256']),('current/candidate.so',selection['candidate_sha256']),('current/symbols.so',selection['symbols_sha256'])]:assert sha(k/'inputs'/n)==h,n
 if a.program=='pump':ledger=module.analyze(k);results={'residual-ledger.json':ledger}
 else:
  module.method.W=k;results=module.analyze();ledger=results['catalog.json']
 baseline=a.baseline or P/'before'/('pump-residual-ledger.json'if a.program=='pump'else'fees-catalog.json');prior=json.loads(baseline.read_text())
 from extended import supplements
 o=module.Elf(k/'inputs/original.so');c=module.Elf(k/'inputs/current/candidate.so');s=module.Elf(k/'inputs/current/symbols.so')
 results.update(supplements(a.program,ledger,o,c,s,prior))
 for name,v in results.items():
  b=encoded(v);f=output/(name+'.gz')
  if a.check:assert gzip.decompress(f.read_bytes())==b,name
  else:f.write_bytes(gzip.compress(b,mtime=0))
 print(json.dumps({'program':a.program,'summary':ledger['summary'],'ledger_files':len(results),'candidate_sha256':selection['candidate_sha256'],'target_executions':0,'builds':0,'check':a.check},sort_keys=True))
if __name__=='__main__':main()
