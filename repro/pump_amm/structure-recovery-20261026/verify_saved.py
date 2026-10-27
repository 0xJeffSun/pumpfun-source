#!/usr/bin/env python3
"""Verify retained source/build/runtime evidence without executing SBF."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
behavior=module('structure_behavior',HERE/'verify_behavior.py')
load,sha=behavior.load,behavior.sha

def main():
    p=argparse.ArgumentParser();p.add_argument('--current-source',action='store_true');a=p.parse_args()
    d=HERE/'results';manifest=d/'manifest.json'
    assert sha(manifest)=='eb05721b04b70728179d0350c5cd360d82068bceab4dce0883242b64b6f5d267'
    entries=load(manifest)['files']
    assert {str(x.relative_to(d))for x in d.rglob('*')if x.is_file()}==set(entries)|{'manifest.json'}
    for name,entry in entries.items():assert sha(d/name)==entry['sha256'] and (d/name).stat().st_size==entry['bytes']
    candidate=d/'build/candidate.so';build=d/'build/build-comparison.json';source=d/'source';record=load(build)
    assert sha(candidate)=='5a18dd61d26fba038cec4321558312430901b92afbb81fbb7bda34a2ff0343bd'
    assert record['unstripped_sha256']==sha(d/'build/unstripped.so') and record['build_log_sha256']==sha(d/'build/build.log')
    if a.current_source:
        for name,digest in record['source_sha256'].items():assert sha(ROOT/('programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]))==digest
    # Validate the predecessor too: the behavior proof relies on its original comparisons.
    subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/arithmetic-origin-recovery-20261026/verify_saved.py')],cwd=ROOT,check=True,stdout=subprocess.DEVNULL)
    result=behavior.verify(d/'runtime',candidate,source,build)
    for name,package,file in [('incentive','incentive-diagnostics-20261026','incentives.rs'),('cto','cto-diagnostics-20261026','creator_reassignment.rs'),('liquidity','liquidity-numeric-diagnostics-20261026','lib.rs')]:
        m=module('structure_'+name,ROOT/'repro/pump_amm'/package/'probe.py');m.validate(load(d/(name+'.json')),candidate,source/'programs/pump-amm/src'/file,build)
    sys.path.insert(0,str(ROOT/'repro/pump_amm/boost-burn-diagnostics'));import verify_boost
    def admission(repo,output,supplied):
        assert supplied==build.read_bytes() and hashlib.sha256(output).hexdigest()==sha(candidate);return record
    verify_boost.check_build=admission;verify_boost.validate(load(d/'prior-52.json'),ROOT,candidate.read_bytes(),build.read_bytes())
    with tempfile.TemporaryDirectory(prefix='amm-structure-measure-')as tmp:
        out=Path(tmp)/'measure.json';subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(candidate),'--symbols',str(d/'build/unstripped.so'),'--output',str(out)],cwd=ROOT,check=True,stdout=subprocess.DEVNULL)
        measured=load(out);assert measured==load(d/'measurement.json')
    graph=module('structure_static_graph',HERE/'static_graph.py')
    assert graph.audit(candidate,d/'build/unstripped.so',d/'measurement.json.gz')==load(HERE/'static-graph.json')
    old=load(ROOT/'repro/pump_amm/arithmetic-origin-recovery-20261026/results/measurement.json')
    gains=[n for o,n in zip(old['rows'],measured['rows'])if not o['matches'] and n['matches']]
    losses=[o for o,n in zip(old['rows'],measured['rows'])if o['matches'] and not n['matches']]
    delta=load(HERE/'delta.json');assert gains==delta['gains'] and losses==delta['losses']==[]
    print(json.dumps({'candidate_sha256':sha(candidate),'normalized_matches':measured['normalized_matches'],'raw_matches':measured['raw_matches'],'gains':len(gains),'losses':len(losses),'cases':result['cases'],'transactions':result['transactions'],'signature_fields':result['signature_fields'],'prior_focused_cases':285,'observed_log_fields':sum(s['observed_log_fields']for s in result['suites']),'current_source_checked':a.current_source,'whole_elf_equal':False}))
if __name__=='__main__':main()
