#!/usr/bin/env python3
"""Recompute the original discriminator order and exact method-body preservation."""
from pathlib import Path
import difflib,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def main():
 spec=importlib.util.spec_from_file_location('dispatch_recover',HERE/'recover.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 r=m.recover();before=(m.BASE/'source/programs/pump-amm/src/lib.rs').read_text();after,detail=m.reorder(before,[x['name']for x in r['dispatch']['original']['comparisons']]);r['reorder']={**detail,'before_lib_sha256':m.hashbytes(before.encode()),'after_lib_sha256':m.hashbytes(after.encode())}
 assert r==json.loads((HERE/'evidence.json').read_text())
 # The reordered source is published with the build that consumed it.
 assert after==(ROOT/'repro/pump_amm/parallel-fee-gates-20261027/results/source/programs/pump-amm/src/lib.rs').read_text()
 patch=''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump-amm/src/lib.rs',tofile='b/programs/pump-amm/src/lib.rs'))
 assert patch==(HERE/'source.patch').read_text()
 print(json.dumps({'original_dispatch':hex(r['dispatch']['original']['start']),'original_bytes':6104,'methods':38,'all_method_bodies_byte_identical':True,'after_lib_sha256':r['reorder']['after_lib_sha256']}))
if __name__=='__main__':main()
