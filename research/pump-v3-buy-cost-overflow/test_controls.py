"""Reject altered source-site, transaction, account and loaded-program evidence."""
import copy
import importlib.util
from pathlib import Path
import sys

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('cost_verify', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


def rejected(name, mutate):
    report = copy.deepcopy(v.record(HERE / 'runtime/focused.json.gz'))
    mutate(report)
    try:
        v.check_focused(report)
    except (ValueError, AssertionError):
        return
    raise AssertionError('accepted mutation: ' + name)


def source_site(report):
    row = report['cases'][0]
    row['runs']['proposal']['logs'] = [line.replace('trade_v3.rs:371.', 'trade_v3.rs:390.') for line in row['runs']['proposal']['logs']]
    row['observations']['proposal']['metadata']['logs'] = row['runs']['proposal']['logs']


def signature(report):
    import base64
    for run in report['cases'][0]['runs'].values():
        raw = bytearray(base64.b64decode(run['transaction_base64']))
        raw[1] ^= 1
        run['transaction_base64'] = base64.b64encode(raw).decode()
    for name, obs in report['cases'][0]['observations'].items():
        obs['transaction_base64'] = report['cases'][0]['runs'][name]['transaction_base64']


def account(report):
    accounts = report['cases'][0]['observations']['proposal']['after']
    key = next(k for k, value in accounts.items() if value is not None)
    accounts[key]['lamports'] += 1


def loaded_binary(report):
    report['cases'][0]['observations']['proposal']['loaded_programs'][-1]['elf_sha256'] = '0' * 64


def earlier_error(report):
    row = report['cases'][0]
    for name in ('original', 'proposal'):
        row['runs'][name]['logs'] = [line.replace('trade_v3.rs:371.', 'trade_v3.rs:285.') for line in row['runs'][name]['logs']]
        row['observations'][name]['metadata']['logs'] = row['runs'][name]['logs']


if __name__ == '__main__':
    for name, mutate in [('source_site', source_site), ('signature', signature), ('account', account),
                         ('loaded_binary', loaded_binary), ('earlier_error', earlier_error)]:
        rejected(name, mutate)
    changed = v.record(HERE / 'builds/proposal-result.json.gz')
    changed['tool_sha256']['rustc'] = '0' * 64
    try:
        v.check_toolchain(changed)
    except ValueError:
        pass
    else:
        raise AssertionError('accepted changed compiler pin')
    print('6 evidence mutations rejected.')
