"""Check installed source/control bytes and a no-write plan; never execute tools."""
from pathlib import Path
import argparse, hashlib, importlib.util, json, sys, tempfile, uuid
sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
H = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()

def verify(root):
    root = root.resolve()
    manifest = json.loads((P/'manifest.json').read_text())
    actual = {}
    for f in P.rglob('*'):
        assert not f.is_symlink() and f.name != '__pycache__' and f.suffix != '.pyc'
        if f.is_file() and f not in [P/'manifest.json', P/'manifest.sha256']:
            actual[str(f.relative_to(P))] = H(f)
    assert actual == manifest
    assert H(P/'manifest.json') == (P/'manifest.sha256').read_text().split()[0]
    record = P/'record'
    assert H(record/'manifest.json') == '5ab8ea521e79126e26051162fa26abe14589e3c712df7a6c5921c1df266121a5'
    for name, digest in json.loads((record/'manifest.json').read_text()).items():
        assert H(record/name) == digest
    script = root/'scripts/measure_relay13_linux_v148.py'
    workflow = root/'.github/workflows/measure-relay13-linux-v148.yml'
    assert script.read_bytes() == (record/'measure_relay13_linux_v148.py').read_bytes()
    assert workflow.read_bytes() == (record/'measure-relay13-linux-v148.yml').read_bytes()
    assert H(script) == '445bc1298834758770c5d145d7dc75811a76627f963857b8e7a6bb3ae457bfbd'
    assert H(root/'scripts/measure_relay_linux_v148.py') == '350695dc5eb5d8efdf7b37ec542cc6456b55d28ec4bd4ca2edc73856751b54de'
    spec = importlib.util.spec_from_file_location('installed_relay13_measurement', script)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    output = Path(tempfile.gettempdir())/('relay13-installation-check-'+uuid.uuid4().hex)
    plan = module.plan(root, output)
    assert not output.exists() and len(plan['frozen_source']) == 23
    assert plan['source_delta_from_linux12'] == ['src/idl.rs'] and plan['program_build_attempt_limit'] == 1
    assert not plan['runtime_or_chain_execution'] and not plan['accepted_or_default_changes']
    return dict(status='PASS', installed_source_equals_reviewed_proposal=True,
                selected_source_inputs=23, source_delta=['src/idl.rs'],
                linux12_parent_seal=module.LINUX12_PARENT_SEAL,
                new_downloads=0, new_builds=0, new_dispatches=0, new_target_executions=0)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', type=Path, required=True)
    args = parser.parse_args()
    print(json.dumps(verify(args.repo), indent=2))
