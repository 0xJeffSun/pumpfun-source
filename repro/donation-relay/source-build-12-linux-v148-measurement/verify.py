"""Verify retained measurement bytes and saved provenance; never build or execute."""
from pathlib import Path
import argparse, hashlib, importlib.util, json, stat, sys, zipfile
sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
H = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
J = lambda p: json.loads(p.read_text())

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
    assert H(packet/'manifest.json') == 'd576fc96411768fc659c0523d6d0633eba95de15ee87270f9e29cf8183f41e8a'
    review = P / 'independent-review'
    assert H(review/'MANIFEST.json') == 'cffcb50c1dbf2a3ff64bbf268c4aa8caadeca2b9793b1f1d09ed43c4ea4e9a28'
    hosted = P / 'download'
    run, artifact = [J(hosted/n) for n in ['hosted-run.json', 'hosted-artifact.json']]
    request = J(P/'dispatch/request.json')
    assert run['id'] == 40207765391 and run['run_attempt'] == 1
    assert run['head_sha'] == request['expected_head_sha'] == 'a71de2091f0ab56a4eb2996777f0ecbf51986aa3'
    assert run['event'] == 'workflow_dispatch' and run['workflow_id'] == request['workflow_id'] == 396120018
    assert run['status'] == 'completed' and run['conclusion'] == 'success'
    assert request['dispatch_attempts'] == 1 and J(P/'dispatch/ack.json')['returncode'] == 0
    assert artifact['id'] == 12604207171 and artifact['name'] == 'relay-linux-v148-publication-40207765391-1'
    assert H(hosted/'hosted-artifact.zip') == 'bc6ab05803118461a09522f1c9cdf4b43232df7ee37652d99a67577a09b00a44'
    assert artifact['digest'] == 'sha256:' + H(hosted/'hosted-artifact.zip')
    actual = {str(f.relative_to(packet)): f.read_bytes() for f in packet.rglob('*') if f.is_file()}
    with zipfile.ZipFile(hosted/'hosted-artifact.zip') as archive:
        files = [i for i in archive.infolist() if not i.is_dir()]
        assert len(files) == len({i.filename for i in files}) == len(actual) == 72
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
    assert summary['candidate_sha256'] == '41bb7d4a3fc3ca64bad9fee44be2ee034392a1910f746e12a9c421b0f143cdbb'
    assert [summary[k] for k in ['candidate_bytes','original_normalized_match_windows','original_raw_match_windows','unmatched_original_windows']] == [501144,225,58,267]
    assert not summary['whole_file_equal']
    return dict(status='PASS', saved_measurement_builds=1, compile_returncode=0, strip_returncode=0,
                anchored_backend_errors=0, normalized_original_windows=225, raw_original_windows=58,
                unmatched_original_windows=267, descriptor_path_length_line_column_equal=True,
                raw_descriptor_prefix_equal=False, full_descriptor_extent_proven=False,
                whole_original_byte_identity=False, new_builds=0, new_target_executions=0,
                provenance_limit='Retained hosted observations and tool/cache attestations; no fresh API or unexported archive/cache/native-library rehash')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', type=Path, required=True)
    args = parser.parse_args()
    print(json.dumps(verify(args.repo), indent=2))
