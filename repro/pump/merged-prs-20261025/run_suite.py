"""Run a published harness against the combined candidate without editing snapshots."""
import argparse
import importlib.util
from pathlib import Path
import runpy
import sys

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / 'scripts'))

def install_fixture_loader_compatibility():
    # LiteSVM 0.27.1 validates an upgradeable Program's ProgramData when it is
    # installed. Old snapshots contain only the Program account. Preserve the
    # VM's bundled executable by wrapping those same bytes in ProgramData at
    # the snapshot's address. No target/candidate Pump code is substituted.
    from solders.account import Account
    from solders.pubkey import Pubkey
    from solders.litesvm import LiteSVM
    original = LiteSVM.set_account
    def set_account(vm, key, account):
        raw = bytes(account.data)
        if account.executable and len(raw) == 36 and raw[:4] == b'\x02\x00\x00\x00':
            programdata = Pubkey.from_bytes(raw[4:])
            if vm.get_account(programdata) is None:
                existing = vm.get_account(key)
                if existing is not None and bytes(existing.data).startswith(b'\x7fELF'):
                    data = b'\x03\x00\x00\x00' + bytes(41) + bytes(existing.data)
                    original(vm, programdata, Account(10**9, data, account.owner))
        return original(vm, key, account)
    LiteSVM.set_account = set_account

def compiled_binding(root, candidate, report_path, expected_map=None):
    import hashlib, json
    from build_source_manifest import source_manifest
    sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
    report=json.loads(report_path.read_text())
    attempt_path=report_path.with_name('build-attempt.json')
    attempt=json.loads(attempt_path.read_text())
    actual=source_manifest(ROOT/'programs/pump',ROOT/'programs/pump',ROOT,cwd=ROOT)
    assert actual==report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']
    assert attempt['returncode']==0 and attempt['source_unchanged']
    assert sha(candidate)==report['comparison']['candidate_sha256']
    return dict(report_sha256=sha(report_path),attempt_sha256=sha(attempt_path),
                actual_source_sha256=actual,candidate_sha256=sha(candidate),
                expected_source_map_sha256=sha(HERE/'source-map.json'))

def main():
    p = argparse.ArgumentParser()
    p.add_argument('script')
    p.add_argument('args', nargs=argparse.REMAINDER)
    a = p.parse_args()
    install_fixture_loader_compatibility()
    script = (ROOT / a.script).resolve()
    sys.path.insert(0, str(script.parent))
    sys.argv = [str(script), *a.args]
    if script.name == 'pump_tokenkeg_two_curve_differential.py':
        from build_source_manifest import source_manifest
        source=script.read_text().replace("assert len(report['source_sha256'])==37", "assert report['source_sha256']==__combined_source_manifest()")
        exec(compile(source,str(script),'exec'), {'__name__':'__main__','__file__':str(script),
            '__combined_source_manifest':lambda:source_manifest(ROOT/'programs/pump',ROOT/'programs/pump',ROOT,cwd=ROOT)})
    elif script.name in ('pump_claim_token_incentives_differential.py', 'pump_nested_general_differential.py', 'pump_general_route_differential.py'):
        spec = importlib.util.spec_from_file_location('combined_claim', script)
        m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
        if script.name == 'pump_claim_token_incentives_differential.py':
            m.BUILD = HERE / 'build-comparison.json'
        elif script.name == 'pump_nested_general_differential.py':
            m.compiled_binding = compiled_binding
        else:
            original_bindings = m.bindings
            def bindings(repo, candidate=None, report=None, source_root=None):
                result=original_bindings(repo)
                if candidate:
                    result['candidate']=compiled_binding(source_root,candidate,report)
                return result
            m.bindings=bindings
        m.main()
    else:
        runpy.run_path(str(script), run_name='__main__')
if __name__ == '__main__': main()
