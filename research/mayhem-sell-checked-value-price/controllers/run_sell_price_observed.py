"""Run frozen LegacySell and SellV2 comparisons with read-only observations of loaded programs."""
from pathlib import Path
import argparse
import hashlib
import importlib.metadata
import importlib.util
import json
import sys
import time

W = Path(__file__).resolve().parent
ap = argparse.ArgumentParser()
ap.add_argument('--candidate', type=Path, required=True)
ap.add_argument('--family', choices=['legacy', 'native', 'token', 'token22'], required=True)
ap.add_argument('--output', type=Path, required=True)
ap.add_argument('--limit', type=int)
a = ap.parse_args()
root = W / 'sell-price-current-runtime/inputs'
binding = json.loads((root.parent / 'input-bindings.json').read_bytes())
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
assert all(sha(root / name) == row['sha256'] for name, row in binding['inputs'].items())
candidate = a.candidate.absolute()
candidate_hash = sha(candidate)
sys.dont_write_bytecode = True
sys.path.insert(0, str(root / 'scripts'))
script = 'mayhem_sell_differential.py' if a.family == 'legacy' else 'mayhem_sell_v2_differential.py'
spec = importlib.util.spec_from_file_location('frozen_sell_price_comparison', root / 'scripts' / script)
d = importlib.util.module_from_spec(spec)
spec.loader.exec_module(d)
RealVM = d.p.f.LiteSVM
MAY = str(d.p.MAY)
current = None
records = []


class ObservedVM:
    def __init__(self):
        self.vm = RealVM()
        self.config = {}
        self.loaded = {}

    def __getattr__(self, name):
        return getattr(self.vm, name)

    def configure(self, name, value):
        result = getattr(self.vm, name)(value)
        if isinstance(result, RealVM):
            self.vm = result
        self.config[name] = value
        return self

    def with_sigverify(self, value):
        assert value is True
        return self.configure('with_sigverify', value)

    def with_blockhash_check(self, value):
        assert value is True
        return self.configure('with_blockhash_check', value)

    def with_log_bytes_limit(self, value):
        return self.configure('with_log_bytes_limit', value)

    def add_program_from_file(self, key, path):
        path = Path(path).absolute()
        if str(key) == MAY:
            wanted = candidate if current['side'] == 'candidate' else root / 'evidence/original/mayhem/deployed.so'
            assert path == wanted
        else:
            relative = path.relative_to(root).as_posix()
            assert relative in binding['inputs'] and relative.endswith('/deployed.so')
        digest = sha(path)
        result = self.vm.add_program_from_file(key, path)
        account = self.vm.get_account(key)
        observed = hashlib.sha256(account.data).hexdigest()
        assert account.executable and observed == digest
        self.loaded[str(key)] = dict(key=key, input_path=str(path), sha256=digest,
                                     bytes=len(account.data), owner=str(account.owner))
        return result

    def program_state(self):
        observed = {}
        assert len(self.loaded) == 6
        for key, row in self.loaded.items():
            account = self.vm.get_account(row['key'])
            assert account is not None and account.executable
            digest = hashlib.sha256(account.data).hexdigest()
            assert digest == row['sha256']
            observed[key] = dict(sha256=digest, bytes=len(account.data),
                                 executable=account.executable, owner=str(account.owner))
        return observed

    def send_transaction(self, transaction):
        assert self.config['with_sigverify'] is True
        assert self.config['with_blockhash_check'] is True
        assert all(transaction.verify_with_results())
        before = self.program_state()
        result = self.vm.send_transaction(transaction)
        after = self.program_state()
        assert before == after
        assert all(transaction.verify_with_results())
        records.append(dict(**current, signature=str(transaction.signatures[0]),
                            config=dict(self.config), before=before, after=after))
        return result


# The frozen comparison, fixture, transaction construction and VM methods run
# unchanged. This proxy delegates all actions and observes account bytes only.
frozen_run = d.p.run


def observed_run(case, binary=None):
    global current
    current = dict(case=case['name'], family=a.family,
                   side='original' if binary is None else 'candidate')
    return frozen_run(case, binary)


d.p.f.LiteSVM = ObservedVM
d.p.run = observed_run
a.output.parent.mkdir(parents=True, exist_ok=True)
argv = [str(root / 'scripts' / script), '--candidate', str(candidate), '--output', str(a.output)]
if a.family != 'legacy':
    argv += ['--cases', str(root / 'repro/mayhem/twentyone/sell-v2-cases.json'), '--family', a.family]
if a.limit is not None:
    argv += ['--limit', str(a.limit)]
sys.argv = argv
start = time.monotonic()
exit_code = 0
failure = None
try:
    d.main()
except SystemExit as error:
    exit_code = error.code
except Exception as error:
    exit_code = 1
    failure = repr(error)
finally:
    unchanged = all(sha(root / name) == row['sha256'] for name, row in binding['inputs'].items())
    record = dict(command=argv, candidate_sha256=candidate_hash, family=a.family,
                  seconds=time.monotonic() - start, exit_code=exit_code, failure=failure,
                  frozen_inputs_unchanged=unchanged,
                  python=sys.version, solders=importlib.metadata.version('solders'),
                  observer_sha256=sha(Path(__file__)),
                  records=records,
                  scope='Actual six-program data hashes before/after each real signed VM execution. '
                        'Only a read-only forwarding observer is added; frozen fixtures/predicates, '
                        'signature/blockhash checks, CPI, signers and callees are unchanged.')
    a.output.with_suffix('.program-bindings.json').write_text(json.dumps(record, indent=2) + '\n')
    assert unchanged and sha(candidate) == candidate_hash
assert exit_code == 0 and failure is None, (exit_code, failure)
expected = 2 * (a.limit if a.limit is not None else (396 if a.family == 'legacy' else 473))
assert len(records) == expected
