#!/usr/bin/env python3
"""Authenticate and recompute the frozen AMM closure/data audit."""
from pathlib import Path
import hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2];BASE=ROOT/'repro/pump_amm/diagnostic-parity-20261027/results'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def main():
 assert sha(HERE/'manifest.json')=='6bd8d6e7fc1a8c51fc951bd527d3c0d887170ae79a13f9a6f2dd8a1f058c950d'
 for name,digest in json.loads((HERE/'manifest.json').read_text()).items():assert sha(HERE/name)==digest,name
 assert sha(BASE/'build/candidate.so')=='fe3c75511a1499b496649313dc57a8fce0cacc88ceb23406a59be522dae458bf'
 a=module('closure_audit',HERE/'audit.py');r=a.analyze(BASE/'build/candidate.so',BASE/'build/unstripped.so',BASE/'measurement.json.gz');assert r==json.loads((HERE/'results.json').read_text())
 l=module('closure_literals',HERE/'literal_constraints.py');lit=l.analyze(BASE/'build/candidate.so',BASE/'build/unstripped.so',r);assert lit==json.loads((HERE/'literals.json').read_text())
 f=module('closure_frontier',HERE/'frontier.py');front=f.analyze(r,BASE/'build/candidate.so',BASE/'build/unstripped.so',BASE/'measurement.json.gz');assert front==json.loads((HERE/'frontier.json').read_text())
 print(json.dumps({'closure':r['counts'],'literal_checks':lit['counts'],'frontier_pairs':len(front['rows'])}))
if __name__=='__main__':main()
