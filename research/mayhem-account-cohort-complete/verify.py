"""Verify all 156 account-cohort data observations without compiler or VM execution."""
from pathlib import Path
import hashlib, importlib.util, json, subprocess, sys

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
R = P.parents[1]
sha = lambda p: hashlib.file_digest(p.open('rb'), 'sha256').hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec); spec.loader.exec_module(result)
    return result


def verify(tests=True):
    assert not any(f.is_symlink() for f in P.rglob('*'))
    actual = {f.relative_to(P).as_posix(): sha(f) for f in P.rglob('*')
              if f.is_file() and f.name != 'manifest.json' and '__pycache__' not in f.parts}
    assert json.loads((P / 'manifest.json').read_bytes()) == actual
    for name, digest in json.loads((P / 'external-inputs.json').read_bytes()).items():
        assert sha(R / name) == digest, name
    module('complete_cohort_parent', R / 'research/mayhem-account-data-extents/verify.py').verify()
    result = module('complete_cohort_refinement', P / 'refinement.py').generate()
    assert result == json.loads((P / 'audit.json').read_bytes())
    assert result['summary'] == {'new_typed_equal': 3, 'remaining_in_saved_cohort': 0, 'total_typed_equal': 156}
    assert result['candidate_sha256'] == 'fa4f81eb1d5953eb7f31b83bf783f7fc4f89b9573f1403b7c4e1efab76f763c4'
    assert result['abi'] == result['repeat_abi']
    assert [p['kind'] for p in result['proofs']] == ['tag0_std_io_SimpleMessage', 'empty_hashbrown_RawTable_header', 'tag0_std_io_SimpleMessage']
    receipt = json.loads((P / 'test-results.json').read_bytes())
    assert receipt['returncode'] == 0 and 'Ran 12 tests' in receipt['stderr'] and receipt['stderr'].rstrip().endswith('OK')
    assert receipt['tests_sha256'] == sha(P / 'test_scope.py') and receipt['refinement_sha256'] == sha(P / 'refinement.py')
    if tests:
        run = subprocess.run([sys.executable, '-B', str(P / 'test_scope.py')], capture_output=True, text=True)
        assert run.returncode == 0 and 'Ran 12 tests' in run.stderr and run.stderr.rstrip().endswith('OK'), run.stderr
    answer = dict(result['summary'], typed_different=0, compiler_executed=False, target_executed=False,
                  accepted_program_changed=False, mutation_tests=12 if tests else 'saved receipt')
    print(json.dumps(answer, indent=2))
    return answer


if __name__ == '__main__': verify()
