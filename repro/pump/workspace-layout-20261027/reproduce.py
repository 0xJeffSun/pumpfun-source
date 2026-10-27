#!/usr/bin/env python3
"""Build the archived main Pump inputs using the verified optional workspace recipe."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/original/pump/deployed.so').is_file())
def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--registry-home',type=Path,required=True)
    parser.add_argument('--output',type=Path,required=True)
    a=parser.parse_args();cp=json.loads((P/'CHECKPOINT.json').read_text())
    sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
    for name,digest in cp['primary_source_sha256'].items():assert sha(P/'primary'/name)==digest
    # The archived builder uses this repository-local wrapper. Require the
    # exact archived bytes before invoking it; no source/tool changes here.
    for name in ['scripts/pump_physical_source_wrapper.py']:
        assert sha(ROOT/name)==cp['input_python_sha256'][name],name
    sys.path.insert(0,str(P/'inputs/scripts'))
    path=P/'inputs/scripts/pump_build_verified.py'
    spec=importlib.util.spec_from_file_location('archived_workspace_builder',path)
    builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)
    builder.ROOT=ROOT
    sys.argv=[str(path),'--source-directory',str(P/'primary'),'--workspace-layout','--registry-home',str(a.registry_home.resolve()),'--output',str(a.output.resolve())]
    builder.main()
    report=json.loads((a.output/'build-comparison.json').read_text())
    assert report['comparison']['candidate_sha256']==cp['candidate_sha256']
    assert report['unstripped_sha256']==cp['unstripped_sha256']
    print('Archived workspace recipe reproduced both ELF hashes.')
if __name__=='__main__':main()
