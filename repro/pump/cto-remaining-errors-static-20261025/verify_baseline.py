"""Check the named historical source baseline and retained static proofs only."""
from pathlib import Path
import argparse, hashlib, json, subprocess, sys
sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
H = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
J = lambda p: json.loads(p.read_text())

def verify(root):
    root = root.resolve()
    manifest = J(P/'manifest.json')
    assert H(P/'manifest.json') == (P/'manifest.sha256').read_text().split()[0]
    actual = {}
    for f in P.rglob('*'):
        assert not f.is_symlink() and f.name != '__pycache__' and f.suffix != '.pyc'
        if f.is_file() and f not in [P/'manifest.json',P/'manifest.sha256']:
            actual[str(f.relative_to(P))] = H(f)
    assert actual == manifest
    baseline = J(P/'baseline.json')
    assert baseline['recorded_main'] == '2508c2be79bc5e66956dcd979e5d2f2a780fd851'
    assert len(baseline['source_inputs']) == baseline['source_count'] == 37
    for name,digest in baseline['source_inputs'].items():
        assert H(root/name) == digest, 'Use the recorded historical Pump source baseline: '+name
    seals = {
        'pump-6019-static-recovery/manifest.json':'e22c4568aa73e1e7b173f2d39d3168a400107f5ab1e02504a17c4f7785ba3b46',
        'pump-6019-independent-review/MANIFEST.json':'a351305b8bae8aff67531936edf1db53a901ffafd44b920fe7fc514ad4c5c287',
        'pump-6092-static-recovery/manifest.json':'a0e040a58303ad9eb7b1a81e0d37348213a47a886b86aa12be8050315fc384e5',
        'pump-6092-eligibility-static-recovery/manifest.json':'d3c50aa30f6e6cf7360138ddea2719ccd1f554b9499623d0d11cb40b6805e8ab',
        'pump-error-static-next-lead/manifest.json':'38ea25fee0b527ac98384c8929029fe0af66ac6c66c5b75f68220837f09ce469',
        'pump-error-static-deserializers/manifest.json':'c7bee7149a56f5e0dad7a6143f1ee6b20580ac17f690128d447718b8dfb93e5e',
    }
    for name,digest in seals.items():
        assert H(P/name) == digest
    for folder in ['pump-6019-static-recovery','pump-6092-static-recovery','pump-6092-eligibility-static-recovery']:
        subprocess.run([sys.executable,'-B',str(P/folder/'verify.py'),'--repo',str(root)],check=True,capture_output=True)
    subprocess.run([sys.executable,'-B',str(P/'pump-6019-independent-review/verify.py'),
                    '--repo',str(root),'--packet',str(P/'pump-6019-static-recovery')],check=True,capture_output=True)
    return dict(status='HISTORICAL_BASELINE_STATIC_PROOFS_PASS',source_inputs=37,
                patches_applied=False,new_builds=0,new_target_executions=0,
                whole_handler_equivalence=False,whole_original_byte_identity=False)

if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--repo',type=Path,required=True)
    args=parser.parse_args()
    print(json.dumps(verify(args.repo),indent=2))
