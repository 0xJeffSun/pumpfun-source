"""Run the captured sweep fixtures with signed prestate and binary attestations."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts'))
import mayhem_validate_sweeps as fixture

sha = lambda data: hashlib.sha256(data).hexdigest()


def rate_cases():
    mask = (1 << 64) - 1
    values = [(0,10,0),(90,0,0),(90,10,99),(90,10,100),(90,10,101),
              (-90,10,-81),(-90,10,-80),(-90,10,-79),(90,-10,79),(90,-10,80),
              (90,-10,81),(-90,-10,-101),(-90,-10,-100),(-90,-10,-99),
              ((1<<63)-1,1,100),(-(1<<63),-1,100)]
    rows = []
    for op in ('sweep_fees', 'sweep_fees_admin'):
        for native in (False, True):
            for last, interval, now in values:
                for limit in (0, 1000000):
                    data = bytearray(32)
                    offset = 0 if native else 24
                    data[offset:offset+8] = (last & mask).to_bytes(8, 'little')
                    rows.append(dict(op=op,native=native,opaque=data.hex(),timestamp=now,
                                     global_offset=166,global_value=interval & mask,
                                     limit=limit,tokens=100000,last=last,interval=interval))
    for native in (False, True):
        for kind in ('wrong_disc','short','wrong_owner','wrong_token_mint','wrong_token_owner',
                     'wrong_token_program','uninitialized_token','short_token','wrong_bump',
                     'wrong_index','bad_last'):
            data = bytearray(32)
            offset = 0 if native else 24
            data[offset:offset+8] = (90).to_bytes(8, 'little')
            rows.append(dict(op='sweep_fees',native=native,opaque=data.hex(),timestamp=99,
                             global_offset=166,global_value=10,kind=kind,last=90,interval=10))
    assert len(rows) == 150
    return rows


class Recorder:
    def __init__(self, vm):
        self.vm = vm
        self.receipt = None

    def __getattr__(self, name):
        return getattr(self.vm, name)

    def accounts(self, keys):
        result = {}
        for key in keys:
            account = self.vm.get_account(key)
            if account is None:
                result[str(key)] = None
            elif account.executable:
                result[str(key)] = dict(executable=True, owner=str(account.owner),
                                       lamports=account.lamports, rent_epoch=account.rent_epoch,
                                       data_bytes=len(account.data), data_sha256=sha(bytes(account.data)))
            else:
                result[str(key)] = json.loads(account.to_json())
        return result

    def send_transaction(self, tx):
        keys = tx.message.account_keys
        before = self.accounts(keys)
        result = self.vm.send_transaction(tx)
        self.receipt = dict(transaction_hex=bytes(tx).hex(), before=before, after=self.accounts(keys))
        return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ('control', 'candidate', 'output'):
        parser.add_argument('--' + name, required=True, type=Path)
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=False)
    paths = dict(original=ROOT/'evidence/original/mayhem/deployed.so',
                 control=args.control.resolve(), candidate=args.candidate.resolve())
    binaries = {name: sha(path.read_bytes()) for name, path in paths.items()}
    fixtures = {name: fixture.SweepFixture(path) for name, path in paths.items()}
    for item in fixtures.values():
        item.vm = Recorder(item.vm)
    for suite, cases in (('sweeps', fixture.rows), ('rates', rate_cases())):
        records = []
        for case in cases:
            results, receipts = {}, {}
            for name, item in fixtures.items():
                results[name] = item.execute(case)
                receipts[name] = item.vm.receipt
            records.append(dict(case=case, results=results, receipts=receipts))
        report = dict(binaries=binaries, cases=records, count=len(records),
                      runner_sha256=sha(Path(__file__).read_bytes()))
        (args.output/(suite+'.json.gz')).write_bytes(gzip.compress(
            (json.dumps(report, separators=(',', ':'))+'\n').encode(), mtime=0))
        print(json.dumps(dict(suite=suite, cases=len(records), signed_records=3*len(records))), flush=True)
    (args.output/'execution.json').write_text(json.dumps(dict(
        argv=sys.argv, cwd=str(Path.cwd()), binaries=binaries,
        runner_sha256=sha(Path(__file__).read_bytes())), indent=2)+'\n')


if __name__ == '__main__':
    main()
