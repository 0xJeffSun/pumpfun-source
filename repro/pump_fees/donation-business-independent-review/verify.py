#!/usr/bin/env python3
"""Portable source/static-evidence review verifier. Never compiles or replays."""
from pathlib import Path,PurePosixPath
import difflib,hashlib,json,subprocess,sys,tarfile,tempfile,tomllib
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
assert {str(p.relative_to(W)):H(p.read_bytes()) for p in W.rglob('*') if p.is_file() and p!=W/'manifest-sha256.json'}==J(W/'manifest-sha256.json')
assert H((W/'proposal/manifest-sha256.json').read_bytes())=='69e1830d5d10b1153f801b3634104e406594904cdec51bb5777c9f866e48d0c1'
for name,r in J(W/'inputs.json').items():
    b=(W/name).read_bytes();assert H(b)==r['sha256'] and len(b)==r['bytes'],name
def members(path):
    result={}
    with tarfile.open(path) as t:
        for m in t:
            n=PurePosixPath(m.name);assert m.isfile() and not n.is_absolute() and '..' not in n.parts and m.name not in result
            result[m.name]=t.extractfile(m).read()
    return result
business=members(W/'proposal/inputs/business-branches-publication.tar.gz')
assert {str(p.relative_to(W/'business-evidence')):p.read_bytes() for p in (W/'business-evidence').rglob('*') if p.is_file()}==business
lock=tomllib.loads((W/'proposal/source/Cargo.lock').read_text())
package=next(r for r in lock['package'] if r['name']=='anchor-attribute-error')
assert package['version']=='0.31.2'
crate=W/'inputs/anchor-attribute-error-0.31.2.crate';assert H(crate.read_bytes())==package['checksum']
assert members(crate)['anchor-attribute-error-0.31.2/src/lib.rs']==(W/'inputs/anchor-attribute-error-lib.rs').read_bytes()
before=(W/'proposal/source/programs/pump-fees/src/donation.rs').read_text();after=(W/'correction/donation.rs').read_text()
assert ''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump-fees/src/donation.rs',tofile='b/programs/pump-fees/src/donation.rs'))==(W/'correction.patch').read_text()
mapping=J(W/'proposal/proposed-source-sha256.json');mapping['programs/pump-fees/src/donation.rs']=H(after.encode())
assert mapping==J(W/'correction-source-sha256.json') and len(mapping)==26
result=subprocess.run([sys.executable,'-B',str(W/'proposal/verify.py')],capture_output=True,text=True)
assert result.returncode==0,(result.stdout,result.stderr)
inventory=members(W/'inputs/current-inventory.tar.gz')
assert inventory['manifest-sha256.json']==(W/'inputs/current-inventory-manifest.json').read_bytes()
assert H(inventory['manifest-sha256.json'])=='7c1bd0902fb1e71fd0c074758d75d627b10b35ec1c0646f687f98cd067de8b63'
with tempfile.TemporaryDirectory(prefix='fees-review-inventory-') as td:
    root=Path(td)
    for name,b in inventory.items():
        p=root/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
    result=subprocess.run([sys.executable,'-B',str(root/'verify.py')],cwd=td,capture_output=True,text=True)
    assert result.returncode==0,(result.stdout,result.stderr)
from analyze import run
assert run()==J(W/'review-evidence.json')
print(json.dumps(dict(status='PASS',proposal_seal_preserved=True,original_ranges_rebound=31,
                     original_data_previews_rebound=49,correction_paths=1,source_inputs=26,
                     inventory_original_rows=585,inventory_candidate_rows=548,
                     builds=0,runtime_cases=0,new_fixtures=0,main_source_changes=0),indent=2))
