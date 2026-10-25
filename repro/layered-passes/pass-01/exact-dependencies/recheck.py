#!/usr/bin/env python3
"""Read-only exact dependency comparison; no builds or binary transformations."""
from pathlib import Path
import argparse, hashlib, json

def digest(data):
    return hashlib.sha256(data).hexdigest()

def compare(root):
    rows=[]
    for name, candidate, expected in [
        ('spl_token','repro/pump/verified-spl-token/pinocchio_token_program.so','8190d3f7ceb6cb7a7a8d8924bff89f9f611e15ce1f806f2b6237f3311a98f697'),
        ('spl_token_2022','repro/pump/verified-token-2022/spl_token_2022.so','15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d'),
    ]:
        original_path='evidence/dependencies/'+name+'/deployed.so'
        original=(root/original_path).read_bytes()
        built=(root/candidate).read_bytes()
        assert digest(original)==expected, name
        row={'dependency':name,'original_path':original_path,'compiler_output_path':candidate,
             'original_sha256':digest(original),'compiler_output_sha256':digest(built),
             'original_bytes':len(original),'compiler_output_bytes':len(built),
             'compiler_output_equals_complete_capture':built==original,
             'compiler_output_equals_capture_prefix':original[:len(built)]==built,
             'new_builds':0,'new_target_executions':0}
        assert row['compiler_output_equals_capture_prefix']
        if name=='spl_token':
            assert built==original
            row['captured_payload_exact']=True
        else:
            assert len(built)==611056 and len(original)==1382016
            tail=original[len(built):]
            stored_path='repro/pump/verified-token-2022/rebuilt.deployed.so'
            stored=(root/stored_path).read_bytes()
            assert len(tail)==770960 and not any(tail)
            assert stored==original and stored[:len(built)]==built
            row.update({'captured_zero_allocation_tail_bytes':len(tail),
                        'captured_zero_allocation_tail_sha256':digest(tail),
                        'retained_allocation_image_path':stored_path,
                        'retained_allocation_image_sha256':digest(stored),
                        'retained_allocation_image_equals_complete_capture':True,
                        'captured_payload_exact':True})
        rows.append(row)
    return {'scope':'Fresh read-only byte comparisons of retained build artifacts; no new build or claimed historical invocation attestation.',
            'dependencies':rows,'captured_payloads_exact':2,'raw_compiler_outputs_equal_complete_capture':1}

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--repo',type=Path,default=Path.cwd());args=parser.parse_args()
    print(json.dumps(compare(args.repo.resolve()),indent=2))
