"""Verify one guarded-source delta against candidate11; no compiler or VM."""
from pathlib import Path
import hashlib,json
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'repro/programs.json').is_file())
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
manifest=J(P/'manifest.json')
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest.json' and '__pycache__' not in p.parts}
assert actual==set(manifest)
for name,digest in manifest.items():assert H((P/name).read_bytes())==digest,name
old=J(ROOT/'repro/pump/metaplex-candidate-build-11/patch-source-inputs.json')
new=J(P/'source-inputs.json')
assert old['upstream_commit']==new['upstream_commit']=='17e99434af5ead3e989c08f32af33609821d0bc0'
assert old['baseline']==new['baseline'] and len(new['patched'])==18
name='programs/token-metadata/program/src/processor/uses/utilize.rs'
assert [k for k in old['patched'] if old['patched'][k]!=new['patched'][k]]==[name]
before=(P/'utilize.before.rs').read_text();after=(P/'utilize.proposed.rs').read_text()
assert H(before.encode())==old['patched'][name]
assert H(after.encode())==new['patched'][name]
needle='''    if number_of_uses == 0
        || number_of_uses > metadata_uses.total
        || number_of_uses > metadata_uses.remaining
    {'''
assert before.count(needle)==1
assert before.replace(needle,'    if number_of_uses == 0 || number_of_uses > metadata_uses.total {')==after
assert '.checked_sub(number_of_uses)\n        .ok_or(MetadataError::NotEnoughUses)?' in after
assert after.index('checked_sub(number_of_uses)')<after.index('metadata.uses = Some(Uses')
print(json.dumps({'verified':True,'changed_source_files_vs_candidate11':1,'unchanged_prior_patch_files':17,'new_build':False,'full_byte_identity':False}))
