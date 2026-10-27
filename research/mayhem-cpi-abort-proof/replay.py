"""Observe unchanged canonical fixtures on real, unmodified local programs."""
from pathlib import Path
import argparse, base64, gzip, hashlib, json, os, sys

R = Path(__file__).resolve().parents[2]
P = Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()
MAY = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
ap = argparse.ArgumentParser()
ap.add_argument('--output', type=Path, required=True)
a = ap.parse_args()
out = a.output.resolve()
reads = {}
busy = False

def audit(event, args):
    global busy
    if busy or event != 'open':
        return
    name, mode, _ = args
    if not isinstance(name, (str, bytes, os.PathLike)):
        return
    path = Path(name).resolve()
    try:
        relative = path.relative_to(R).as_posix()
    except ValueError:
        return
    if not path.is_file() or (mode and any(c in mode for c in 'wax+')):
        return
    assert path.suffix != '.pyc', 'No cached Python inputs'
    if relative not in reads:
        busy = True
        try:
            reads[relative] = sha(path.read_bytes())
        finally:
            busy = False

sys.addaudithook(audit)
sys.dont_write_bytecode = True
from solders.litesvm import LiteSVM

load_program = LiteSVM.add_program_from_file
send_transaction = LiteSVM.send_transaction
set_sigverify = LiteSVM.with_sigverify
set_blockhash_check = LiteSVM.with_blockhash_check
observations = []
context = {}

def load(self, key, path):
    image = Path(path).read_bytes()
    result = load_program(self, key, path)
    account = self.get_account(key)
    assert account.executable and sha(account.data) == sha(image)
    if not hasattr(self, '_proof_programs'):
        self._proof_programs = {}
    self._proof_programs[str(key)] = dict(key=key, sha256=sha(image), bytes=len(image))
    return result

def programs(self):
    records = {}
    assert len(self._proof_programs) == 6
    for key, row in self._proof_programs.items():
        account = self.get_account(row['key'])
        assert account.executable and sha(account.data) == row['sha256']
        records[key] = dict(sha256=sha(account.data), bytes=len(account.data),
                            owner=str(account.owner), executable=account.executable)
    return records

def send(self, tx):
    assert all(tx.verify_with_results())
    before = programs(self)
    result = send_transaction(self, tx)
    after = programs(self)
    assert before == after
    observations.append(dict(**context, signature=str(tx.signatures[0]),
                             transaction_base64=base64.b64encode(bytes(tx)).decode(),
                             before=before, after=after))
    return result

def sigverify(self, enabled):
    assert enabled is True
    return set_sigverify(self, enabled)

def blockhash(self, enabled):
    assert enabled is True
    return set_blockhash_check(self, enabled)

LiteSVM.add_program_from_file = load
LiteSVM.send_transaction = send
LiteSVM.with_sigverify = sigverify
LiteSVM.with_blockhash_check = blockhash
sys.path.insert(0, str(R / 'scripts'))
import mayhem_buy_v2_fixture as fixture

candidate = out / 'candidate.so'
candidate.write_bytes(gzip.decompress((P / 'public/candidate.so.gz').read_bytes()))
rows = []
for family in ['native', 'token', 'token22']:
    cases = [dict(name='control'),
             dict(name='base_frozen', mutations={'6': {'bytes': [[108, 2]]}}),
             dict(name='late_unfunded', mutations=(
                 {'8': {'lamports': 1}} if family == 'native' else
                 {'7': {'u64': [[64, 0]]}}))]
    if family != 'native':
        cases.append(dict(name='late_frozen', mutations={'14': {'bytes': [[108, 2]]}}))
    for case in cases:
        case = dict(case, token_quote=family != 'native', quote_token22=family == 'token22')
        row = dict(family=family, case=case)
        for side, image in [('original', None), ('candidate', candidate)]:
            context = dict(family=family, case=case['name'], side=side)
            row[side] = fixture.run(case, image)
        rows.append(row)
        print(family, case['name'], row['original']['error'], row['candidate']['error'], flush=True)

assert len(rows) == 11 and len(observations) == 22
assert all(sha((R / n).read_bytes()) == digest for n, digest in reads.items())
assert sha(candidate.read_bytes()) == '4c77fa48d44282c7b7c97580622bff00f5a570e5ba537d1b43376c70c36e7be4'
report = dict(cases=rows, programs=observations, input_reads=reads,
              scope='Fresh synthetic local execution, unchanged canonical fixture and program bytes. '
                    'Program-account hashes observed before/after; no instruction-PC trace.')
(out / 'receipts.json.gz').write_bytes(gzip.compress(json.dumps(report, indent=2).encode(), mtime=0))
