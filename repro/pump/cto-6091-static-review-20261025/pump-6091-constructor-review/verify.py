"""Independent source-only patch/receipt verifier; no native process/network."""
from pathlib import Path
import argparse,hashlib,json,difflib,tarfile,tomllib
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
for n,row in J(P/'manifest.json').items():raw=(P/n).read_bytes();assert H(raw)==row['sha256']and len(raw)==row['bytes']
for n,row in J(P/'input-references.json').items():raw=(R/n).read_bytes();assert H(raw)==row['sha256']and len(raw)==row['bytes'],n
w=J(P/'witness.json');source='programs/pump/src/admin_cto.rs';before=(R/source).read_text();old,new=w['constructor_replacement']['before'],w['constructor_replacement']['after'];assert before.count(old)==1;after=before.replace(old,new)
assert H(before.encode())==w['candidate_source_before_sha256']and H(after.encode())==w['candidate_source_after_sha256']and before.count('\n')==after.count('\n')
assert (P/'constructor-only.patch').read_text()==''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/'+source,tofile='b/'+source))
assert next(i for i,line in enumerate(after.splitlines(),1)if new in line)==108 and w['original_source_line']==326
pkg=next(x for x in tomllib.loads((R/'programs/pump/Cargo.lock').read_text())['package']if x['name']=='anchor-attribute-error');base=R/'repro/pump_fees/legacy-quote-admission-source-proposal/inputs/framework';archive=base/'anchor-attribute-error-0.31.2.crate';assert H(archive.read_bytes())==pkg['checksum']==w['attribute_archive_checksum']
with tarfile.open(archive)as tf:assert tf.extractfile('anchor-attribute-error-0.31.2/src/lib.rs').read()==(base/'anchor-attribute-error-0.31.2/src/lib.rs').read_bytes()
print('PASS: exact constructor-only expression, predicates/line count unchanged, natural108 distinct from326, locked owning attribute factory member verified; no build/runtime or eligibility equivalence claimed')
