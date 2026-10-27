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
    assert sha(manifest)=='c1ecde59d03c7176e89bebd75a7474bd07a1ad53674cda01e87424483ae34586'
    entries=load(manifest)['files']
    assert {str(x.relative_to(d))for x in d.rglob('*')if x.is_file()}==set(entries)|{'manifest.json'}
    for name,entry in entries.items():assert sha(d/name)==entry['sha256'] and (d/name).stat().st_size==entry['bytes']
    candidate=d/'build/candidate.so';build=d/'build/build-comparison.json';source=d/'source';record=load(build)
    assert sha(candidate)=='2af1fd3607ae9289415f6403aaadfb9a29752ecb567218f65cb1601aed24f935'
    assert record['unstripped_sha256']==sha(d/'build/unstripped.so') and record['build_log_sha256']==sha(d/'build/build.log')
    if a.current_source:
        for name,digest in record['source_sha256'].items():assert sha(ROOT/('programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]))==digest
    # Validate the predecessor too: the behavior proof relies on its original comparisons.
    subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/legacy-transfer-constraint-20261027/verify_saved.py')],cwd=ROOT,check=True,stdout=subprocess.DEVNULL)
    control=HERE/'control'
    assert sha(control/'manifest.json')=='473bbbf3b6ef9f56a30220ec9c4e1917be3a78737a4ae7b24969006f5b66b0c9'
    cm=load(control/'manifest.json')['files']
    assert {str(f.relative_to(control))for f in control.rglob('*')if f.is_file()}==set(cm)|{'manifest.json'}
    for name,entry in cm.items():assert sha(control/name)==entry['sha256'] and (control/name).stat().st_size==entry['bytes']
    cb=load(control/'build/build-comparison.json')
    assert cb['returncode']==0 and cb['source_unchanged'] and cb['source_sha256']==cb['source_after_sha256']
    assert cb['build_log_sha256']==sha(control/'build/build.log')
    assert cb['comparison']['candidate_sha256']==sha(control/'build/candidate.so') and cb['unstripped_sha256']==sha(control/'build/unstripped.so')
    for name,digest in cb['source_sha256'].items():assert sha(control/'source'/('programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]))==digest
    assert record['archive_provenance']['sha256']==cb['archive_provenance']['sha256']=='6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9'
    assert record['target_rlib_sha256']==cb['target_rlib_sha256'] and record['tool_sha256']==cb['tool_sha256']
    assert record['container_image']['Os']=='linux' and record['container_image']['Architecture']=='amd64'
    assert record['dependency_cache_before'] and record['dependency_cache_before']==record['dependency_cache_after']
    assert 'Compiling pump-amm-recovered' in (d/'build/build.log').read_text()
    result=behavior.verify(d/'runtime',candidate,source,build)
    for name,file in [('incentive','incentives.rs'),('cto','creator_reassignment.rs'),('liquidity','lib.rs')]:
        m=module('generated_fee_'+name,HERE/(name+'_probe.py'));m.validate(load(d/(name+'.json')),candidate,source/'programs/pump-amm/src'/file,build)
    sys.path.insert(0,str(ROOT/'repro/pump_amm/boost-burn-diagnostics'));import verify_boost
    def admission(repo,output,supplied):
        assert supplied==build.read_bytes() and hashlib.sha256(output).hexdigest()==sha(candidate);return record
    verify_boost.check_build=admission;verify_boost.validate(load(d/'prior-52.json'),ROOT,candidate.read_bytes(),build.read_bytes())
    with tempfile.TemporaryDirectory(prefix='amm-structure-measure-')as tmp:
        out=Path(tmp)/'measure.json';subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(candidate),'--symbols',str(d/'build/unstripped.so'),'--output',str(out)],cwd=ROOT,check=True,stdout=subprocess.DEVNULL)
        measured=load(out);assert measured==load(d/'measurement.json')
    graph=module('structure_static_graph',HERE/'static_graph.py')
    assert graph.audit(candidate,d/'build/unstripped.so',d/'measurement.json.gz')==load(HERE/'static-graph.json')
    old=load(ROOT/'repro/pump_amm/legacy-transfer-constraint-20261027/results/measurement.json')
    gains=[n for o,n in zip(old['rows'],measured['rows'])if not o['matches'] and n['matches']]
    losses=[o for o,n in zip(old['rows'],measured['rows'])if o['matches'] and not n['matches']]
    delta=load(HERE/'delta.json');assert gains==delta['gains'] and losses==delta['losses']==[]
    probe=module('optional_bool_probe_verifier',HERE/'verify_optional.py')
    optional=probe.verify(d/'optional.json',d/'optional-transactions.json.gz',candidate,build)
    cpi=module('cpi_return_verifier',HERE/'verify_cpi_returns.py').verify(d,candidate,build,source)
    balance=module('curve_balance_verifier',HERE/'verify_curve_balances.py').verify(d,candidate,build,source)
    typed=module('typed_account_verifier',HERE/'verify_typed.py').verify(d/'typed.json',candidate,build)
    mint=module('mint_constraint_verifier',HERE/'verify_probe.py').verify(d/'mint.json',candidate,build)
    print(json.dumps({'candidate_sha256':sha(candidate),'normalized_matches':measured['normalized_matches'],'raw_matches':measured['raw_matches'],'gains':len(gains),'losses':len(losses),'cases':result['cases'],'transactions':result['transactions'],'signature_fields':result['signature_fields'],'prior_focused_cases':285,'mint_constraint_checks':mint,'typed_account_checks':typed,'cpi_return_checks':cpi,'curve_balance_checks':balance,'optional_bool_cases':optional['cases'],'optional_bool_transactions':optional['verified_transactions'],'observed_log_fields':sum(s['observed_log_fields']for s in result['suites']),'current_source_checked':a.current_source,'whole_elf_equal':False}))
if __name__=='__main__':main()
