#!/usr/bin/env python3
"""Run earlier full-log regressions with this exact expanded source manifest."""
import argparse
import importlib.util
import json
from pathlib import Path
import sys

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
sys.path.insert(0,str(HERE))
from probe import sha, require


def expected_source():
    prior=json.loads((ROOT/'repro/pump_amm/focused-diagnostics-20261026/results/liquidity/build/build-comparison.json').read_bytes())
    expected={'programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]:value for name,value in prior['source_sha256'].items()}
    expected['programs/pump-amm/src/incentives.rs']='27b133b58ba6afaced750a080249ddc4fa1adc1a082c56792c1636808752873a'
    expected['programs/pump-amm/src/creator_reassignment.rs']='a1cc2af404212843499a6ede9c816dd758f814ca90956c1feaf80b12e37c508f'
    return expected


def main():
    p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--source-root',type=Path,required=True);p.add_argument('--build-record',type=Path,required=True);p.add_argument('--output',type=Path,required=True)
    args=p.parse_args();record=json.loads(args.build_record.read_bytes());expected=expected_source()
    actual={'programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]:value for name,value in record['source_sha256'].items()}
    require(len(actual)==len(expected)==30 and actual==expected,'unexpected expanded source manifest')
    require(all(sha(args.source_root/name)==value for name,value in expected.items()),'compiled source changed')
    require(record['returncode']==0 and record['source_unchanged'] and record['source_after_sha256']==record['source_sha256'],'failed/changed build')
    require(record['comparison']['candidate_sha256']==sha(args.candidate),'wrong candidate')
    sys.path.insert(0,str(ROOT/'repro/pump_amm/boost-burn-diagnostics'))
    import boost
    import verify_boost
    spec=importlib.util.spec_from_file_location('incentive_prior_runtime',boost.PACKAGE/'runtime_probe.py')
    runtime=importlib.util.module_from_spec(spec);spec.loader.exec_module(runtime)
    def admission(repo,candidate,raw):
        require(raw==args.build_record.read_bytes(),'changed build record')
        require(boost.digest(candidate)==record['comparison']['candidate_sha256'],'wrong admitted candidate')
        return record
    runtime.check_build=admission;verify_boost.check_build=admission
    sys.argv=[str(__file__),'--candidate',str(args.candidate),'--build-record',str(args.build_record),'--output',str(args.output)]
    runtime.main()


if __name__=='__main__':main()
