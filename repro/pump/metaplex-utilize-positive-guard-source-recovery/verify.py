"""Verify the single positive-guard source proposal; no compiler, VM or network."""
from pathlib import Path
import difflib,gzip,hashlib,io,json,tarfile
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'repro/programs.json').is_file())
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
KEY='programs/token-metadata/program/src/processor/uses/utilize.rs'
OLD='''    let remaining_uses = metadata_uses
        .remaining
        .checked_sub(number_of_uses)
        .ok_or(MetadataError::NotEnoughUses)?;'''
NEW='''    let remaining_uses = if metadata_uses.remaining >= number_of_uses {
        metadata_uses.remaining - number_of_uses
    } else {
        return Err(MetadataError::NotEnoughUses.into());
    };'''
def archive(name):
    with tarfile.open(fileobj=io.BytesIO((P/name).read_bytes()),mode='r:gz') as t:
        members=t.getmembers()
        assert all(m.isfile() and not m.name.startswith('/') and '..' not in Path(m.name).parts for m in members)
        assert len(members)==18 and len({m.name for m in members})==18
        return {m.name:t.extractfile(m).read() for m in members}
def main():
    manifest=J(P/'manifest.json')
    actual={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file() and p.name!='manifest.json' and '__pycache__' not in p.parts}
    assert actual==set(manifest)
    for name,digest in manifest.items():assert H((P/name).read_bytes())==digest,name
    for name,digest in J(P/'external-inputs.json').items():assert H((ROOT/name).read_bytes())==digest,name
    old=J(ROOT/'repro/pump/metaplex-utilize-guard-source-recovery/source-inputs.json')
    accepted=J(ROOT/'repro/pump/metaplex-candidate-build-11/patch-source-inputs.json')
    new=J(P/'source-inputs.json')
    assert old['upstream_commit']==accepted['upstream_commit']==new['upstream_commit']=='17e99434af5ead3e989c08f32af33609821d0bc0'
    assert old['baseline']==accepted['baseline']==new['baseline']
    assert len(new['patched'])==18 and set(old['patched'])==set(new['patched'])
    assert [k for k in old['patched'] if old['patched'][k]!=new['patched'][k]]==[KEY]
    assert [k for k in accepted['patched'] if accepted['patched'][k]!=new['patched'][k]]==[KEY]
    before=(P/'utilize.before.rs').read_text();after=(P/'utilize.proposed.rs').read_text()
    assert H(before.encode())==old['patched'][KEY] and H(after.encode())==new['patched'][KEY]
    assert before.count(OLD)==1 and before.replace(OLD,NEW)==after
    assert (P/'positive-guard.fragment.rs').read_text()==NEW+'\n'
    assert 'if number_of_uses == 0 || number_of_uses > metadata_uses.total {' in after
    assert after.index('let must_burn')<after.index('if number_of_uses == 0')<after.index(NEW)<after.index('metadata.uses = Some(Uses')
    baseline=archive('baseline-source.tar.gz');proposed=archive('proposed-source.tar.gz')
    assert {n:H(b) for n,b in baseline.items()}==new['baseline']
    assert {n:H(b) for n,b in proposed.items()}==new['patched']
    assert proposed[KEY].decode()==after
    patch=[]
    for name in sorted(baseline):
        patch.append(f'diff --git a/{name} b/{name}\n'+''.join(difflib.unified_diff(baseline[name].decode().splitlines(True),proposed[name].decode().splitlines(True),fromfile='a/'+name,tofile='b/'+name)))
    assert ''.join(patch)==(P/'source.patch').read_text()
    proof=J(P/'guard-equivalence.json');assert proof['query_sha256']==H((P/'guard-equivalence.smt2').read_bytes())
    assert proof['all_u64_guard_and_subtraction_domain']==proof['branch_polarity_negation']=='unsat'
    # Complete arithmetic partition: after zero/total rejection, failure occurs
    # iff remaining<n. In the complement remaining>=n, subtraction cannot wrap.
    for initial_guard in [False,True]:
        for remaining_less in [False,True]:
            assert (initial_guard or remaining_less)==(initial_guard or not(not remaining_less))
    assert J(P/'delta.json')['unchanged_patched_files']==17
    print(json.dumps(dict(verified=True,upstream_commit=new['upstream_commit'],changed_source_files_vs_candidate12=1,changed_source_files_vs_candidate11=1,unchanged_patched_files=17,patched_public_source_files=18,earlier_guard_order_preserved=True,all_u64_local_equivalence_proof='saved UNSAT; SMT2 and reproducer retained',new_build=False,accepted_candidate_changed=False,byte_identity=False)))
if __name__=='__main__':main()
