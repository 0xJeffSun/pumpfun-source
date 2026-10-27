#!/usr/bin/env python3
"""Execute the earlier52-case full-log probe on the exact new compiled source."""
import argparse
import importlib.util
import json
from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[3]
sys.path.insert(0,str(ROOT/'repro/pump_amm/boost-burn-diagnostics'))
import boost
import verify_boost

def main():
    p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--source',type=Path,required=True);p.add_argument('--build-record',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
    raw=a.build_record.read_bytes();record=json.loads(raw)
    assert record['returncode']==0 and record['source_unchanged'] and record['source_sha256']==record['source_after_sha256']
    assert record['comparison']['candidate_sha256']==boost.digest(a.candidate.read_bytes())=='49d275e661057ce0a269f3d60f54e5c9ebad56647234b85a22e364bc57aa2e77'
    assert len(record['source_sha256'])==31
    for name,value in record['source_sha256'].items():
        relative='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]
        assert boost.digest((a.source/relative).read_bytes())==value
    def admit(repo,candidate,supplied):
        assert supplied==raw and boost.digest(candidate)==record['comparison']['candidate_sha256']
        return record
    spec=importlib.util.spec_from_file_location('final_prior_probe',boost.PACKAGE/'runtime_probe.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    module.check_build=admit;verify_boost.check_build=admit
    sys.argv=[str(__file__),'--candidate',str(a.candidate),'--build-record',str(a.build_record),'--output',str(a.output)];module.main()

if __name__=='__main__':main()
