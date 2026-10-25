"""Verify retained measurement bytes and saved provenance; never build or execute."""
from pathlib import Path
import argparse, hashlib, importlib.util, json, stat, subprocess, sys, zipfile
sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
H = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
J = lambda p: json.loads(p.read_text())

def verify_published_child(root, folder, source, old_seal, new_seal, with_prior=False):
    base = P/folder
    old, new = base/'original-record', base/'published-record'
    assert H(old/'manifest.json') == old_seal and H(new/'manifest.json') == new_seal
    before, after = J(old/'manifest.json'), J(new/'manifest.json')
    assert set(before) == set(after)
    changed = {source, 'input-references.json'} | ({'prior-reference.json'} if with_prior else set())
    assert {n for n in before if (old/n).read_bytes() != (new/n).read_bytes()} == changed
    for record, manifest in [(old,before),(new,after)]:
        assert {str(f.relative_to(record)) for f in record.rglob('*') if f.is_file() and f.name != 'manifest.json'} == set(manifest)
        for n, row in manifest.items():
            assert H(record/n) == row['sha256'] and (record/n).stat().st_size == row['bytes']
    previous = 'work/relay13-linux-v148-downloaded/extracted'
    published = 'repro/donation-relay/source-build-13-linux-v148-measurement/download/extracted'
    text = (old/source).read_text()
    assert text.count(previous) == 1 and (new/source).read_text() == text.replace(previous,published)
    refs = J(old/'input-references.json')
    expected = {n.replace(previous,published,1) if n.startswith(previous+'/') else n: v for n,v in refs.items()}
    assert len(expected) == len(refs) and J(new/'input-references.json') == expected
    if with_prior:
        prior = J(old/'prior-reference.json')
        assert prior['folder'] == 'relay13-recipe-static-comparison'
        prior['folder'] = '../recipe-comparison/original-record'
        assert J(new/'prior-reference.json') == prior
    subprocess.run([sys.executable,'-B',str(new/'verify.py'),'--repo',str(root.resolve())],check=True,capture_output=True)

def verify(root):
    manifest = J(P / 'manifest.json')
    assert H(P / 'manifest.json') == (P / 'manifest.sha256').read_text().split()[0]
    observed = {}
    for path in P.rglob('*'):
        assert not path.is_symlink() and path.name != '__pycache__' and path.suffix != '.pyc'
        if path.is_file() and path not in [P/'manifest.json', P/'manifest.sha256']:
            observed[str(path.relative_to(P))] = H(path)
    assert observed == manifest, 'Exact publication inventory changed'
    packet = P / 'download' / 'extracted'
    assert H(packet/'manifest.json') == '35dd05161b7872a2e770481422baf8d78ce50bc7d2e194d17d1b2e45e3ade66d'
    review = P / 'independent-review'
    assert H(review/'MANIFEST.json') == '380997520e97afd7b2fc0f12d148ed6a2ce44ba14f0007d5386fe6a18ee092dc'
    hosted = P / 'download'
    run, artifact = [J(hosted/n) for n in ['hosted-run.json', 'hosted-artifact.json']]
    request = J(P/'dispatch/request.json')
    assert run['id'] == 40209794148 and run['run_attempt'] == 1
    assert run['head_sha'] == request['expected_head_sha'] == '2508c2be79bc5e66956dcd979e5d2f2a780fd851'
    assert run['event'] == 'workflow_dispatch' and run['workflow_id'] == request['workflow_id'] == 396141467
    assert run['status'] == 'completed' and run['conclusion'] == 'success'
    assert request['dispatch_attempts'] == 1 and J(P/'dispatch/ack.json')['returncode'] == 0
    assert artifact['id'] == 12604389091 and artifact['name'] == 'relay13-linux-v148-publication-40209794148-1'
    assert H(hosted/'hosted-artifact.zip') == 'd88a7a9137ecffea1b3d5af5323a0389cc5369c3e68c19962a71ad6a00b8a978'
    assert artifact['digest'] == 'sha256:' + H(hosted/'hosted-artifact.zip')
    actual = {str(f.relative_to(packet)): f.read_bytes() for f in packet.rglob('*') if f.is_file()}
    with zipfile.ZipFile(hosted/'hosted-artifact.zip') as archive:
        files = [i for i in archive.infolist() if not i.is_dir()]
        assert len(files) == len({i.filename for i in files}) == len(actual) == 73
        assert {i.filename for i in files} == set(actual)
        for item in files:
            assert stat.S_IFMT(item.external_attr >> 16) != stat.S_IFLNK
            assert archive.read(item) == actual[item.filename]
    spec = importlib.util.spec_from_file_location('retained_independent_linux_review', review/'verify_actual.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    result = module.verify(root.resolve(), packet)
    assert result['status'] == 'PASS'
    measured = J(packet/'result.json')
    assert measured['state'] == 'MEASURED' and measured['program_build_attempts'] == 1
    assert measured['compile_returncode'] == measured['strip_returncode'] == 0 and measured['backend_diagnostics'] == []
    assert measured['source_unchanged'] and measured['runtime_executions'] == 0 and not measured['readiness_or_promotion']
    summary = J(packet/'static-comparison.json')['summary']
    assert summary['candidate_sha256'] == '506b11353f8eb15d079794656eaf6c10d1a8da2c50d2e90cbdbe949a3ecdd0fb'
    assert [summary[k] for k in ['candidate_bytes','original_normalized_match_windows','original_raw_match_windows','unmatched_original_windows']] == [501576,225,58,267]
    assert not summary['whole_file_equal']
    rows = J(packet/'static-comparison.json')['linux12_source_control']['original_window_transitions']
    assert len(rows) == 492 and all(all(r['linux12_'+k] == r['linux13_'+k] for k in ['status','raw_match','normalized_match']) for r in rows)
    verify_published_child(root,'recipe-comparison','compare.py',
        '17ed9b4fca9fdf0b6ecb5b30aaa4d86e457cea183000709986e4f69170eefe2c',
        'd4a6a0c150685f544647c2b0efe85ad202ccd1440d88af14cdb4ec8f2d2ea96a')
    verify_published_child(root,'unicode-data','analyze.py',
        '5bc7b7998732558e1ccd3246155d318c1a1446e02deba9c3cd3c9d3ba9d320bf',
        '37881f2455ac51a59b1f43a723ae1f59a893d2a8fd33ecbbf36301734d3ee0d1',with_prior=True)
    return dict(status='PASS', saved_measurement_builds=1, compile_returncode=0, strip_returncode=0,
                anchored_backend_errors=0, all492_window_status_raw_normalized_transitions_unchanged=True, same_method_recipe_comparison_recomputed=True,
                full_unicode_table_bytes_recomputed=1449, normalized_original_windows=225, raw_original_windows=58,
                unmatched_original_windows=267, descriptor_path_length_line_column_equal=True,
                raw_descriptor_prefix_equal=False, full_descriptor_extent_proven=False,
                whole_original_byte_identity=False, new_builds=0, new_target_executions=0,
                provenance_limit='Retained hosted observations and tool/cache attestations; no fresh API or unexported archive/cache/native-library rehash')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', type=Path, required=True)
    args = parser.parse_args()
    print(json.dumps(verify(args.repo), indent=2))
