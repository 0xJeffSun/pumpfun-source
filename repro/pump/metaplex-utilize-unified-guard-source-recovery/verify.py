"""Verify the single unified-guard source proposal, without compiler or runtime."""
from pathlib import Path
import difflib,hashlib,io,json,subprocess,sys,tarfile
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'repro/programs.json').is_file())
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
KEY='programs/token-metadata/program/src/processor/uses/utilize.rs'
OLD='''    let remaining_uses = metadata_uses
        .remaining
        .checked_sub(number_of_uses)
        .ok_or(MetadataError::NotEnoughUses)?;'''
NEW='    let remaining_uses = metadata_uses.remaining - number_of_uses;'
GUARD='''    if number_of_uses == 0
        || number_of_uses > metadata_uses.total
        || number_of_uses > metadata_uses.remaining
    {
        return Err(MetadataError::NotEnoughUses.into());
    }
'''
def archive(name):
    with tarfile.open(fileobj=io.BytesIO((P/name).read_bytes()),mode='r:gz') as t:
        members=t.getmembers()
        assert all(m.isfile() and not m.name.startswith('/') and '..' not in Path(m.name).parts for m in members)
        assert len(members)==18 and len({m.name for m in members})==18
        return {m.name:t.extractfile(m).read() for m in members}
def main():
    manifest=J(P/'manifest.json')
    actual={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file() and p!=P/'manifest.json' and '__pycache__' not in p.parts}
    assert actual==set(manifest)
    for name,digest in manifest.items():assert H((P/name).read_bytes())==digest,name
    for name,digest in J(P/'external-inputs.json').items():assert H((ROOT/name).read_bytes())==digest,name
    accepted=J(ROOT/'repro/pump/metaplex-candidate-build-11/patch-source-inputs.json')
    new=J(P/'source-inputs.json')
    assert accepted['upstream_commit']==new['upstream_commit']=='17e99434af5ead3e989c08f32af33609821d0bc0'
    assert accepted['baseline']==new['baseline']
    assert len(new['patched'])==18 and set(accepted['patched'])==set(new['patched'])
    assert [k for k in accepted['patched'] if accepted['patched'][k]!=new['patched'][k]]==[KEY]
    before=(P/'utilize.before.rs').read_text();after=(P/'utilize.proposed.rs').read_text()
    assert H(before.encode())==accepted['patched'][KEY]=='9ce4753676e73e6565b957d86eecf113ce16cade3f782d849e2f7a97b640bed7'
    assert H(after.encode())==new['patched'][KEY]=='2f403b698750ab295ffd88d71eb75cb594dd27eff67edcc7a260688e33f67ca3'
    assert before.count(OLD)==1 and before.replace(OLD,NEW)==after
    assert GUARD+NEW in after and before.count(GUARD)==after.count(GUARD)==1
    assert before.count('.checked_sub(number_of_uses)')==2 and after.count('.checked_sub(number_of_uses)')==1
    assert after.index('let must_burn')<after.index(GUARD)<after.index(NEW)<after.index('metadata.uses = Some(Uses')
    baseline=archive('baseline-source.tar.gz');proposed=archive('proposed-source.tar.gz')
    assert {n:H(b) for n,b in baseline.items()}==new['baseline']
    assert {n:H(b) for n,b in proposed.items()}==new['patched']
    assert proposed[KEY].decode()==after
    patch=[]
    for name in sorted(baseline):
        patch.append(f'diff --git a/{name} b/{name}\n'+''.join(difflib.unified_diff(baseline[name].decode().splitlines(True),proposed[name].decode().splitlines(True),fromfile='a/'+name,tofile='b/'+name)))
    assert ''.join(patch)==(P/'source.patch').read_text()
    assert J(P/'delta.json')['unchanged_patched_files']==17
    proof=subprocess.run([sys.executable,str(P/'proof/verify.py'),'--repo',str(ROOT)],check=True,capture_output=True,text=True)
    result=json.loads(proof.stdout)
    assert result['fresh_original_check'] and result['exact_single_source_change'] and not result['byte_identity_claimed']
    print(json.dumps(dict(verified=True,upstream_commit=new['upstream_commit'],changed_source_files_vs_candidate11=1,unchanged_patched_files=17,patched_public_source_files=18,ordered_unified_guard_preserved=True,delegated_checked_sub_preserved=True,all_u64_proof='guard success implies 1 <= n <= remaining; checked_sub error unreachable',original_control_bytes_rehashed=True,new_build=False,accepted_candidate_changed=False,byte_identity=False)))
if __name__=='__main__':main()
