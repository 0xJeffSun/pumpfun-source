#!/usr/bin/env python3
"""Prepare a revision-bound, local-only validator plan for bounded SDK testing."""
import argparse
import base64
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys

DEPENDENCIES = ('spl_token', 'spl_token_2022', 'associated_token',
                'token_metadata', 'donation_relay')
SEEDS = ('pump', 'pump_amm', 'pump_fees')

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def inside(root, relative):
    path = root / relative
    resolved = path.resolve(strict=True)
    resolved.relative_to(root.resolve())
    if not resolved.is_file():
        raise ValueError(f'Expected a file: {relative}')
    return resolved

def read(root, relative):
    return json.loads(inside(root, relative).read_text())

def prepare(root, here, ledger, port):
    root = root.resolve()
    # Do not remove, reset, resume, or follow a preexisting ledger/symlink.
    if os.path.lexists(ledger):
        raise ValueError(f'Ledger already exists: {ledger}. Supply a fresh path; existing ledgers are preserved.')
    ledger = ledger.resolve()
    if not ledger.parent.is_dir():
        raise ValueError(f'Ledger parent must already exist: {ledger.parent}')
    if not 1 <= port <= 65534:
        raise ValueError('RPC_PORT must be between 1 and 65534.')
    status = read(root, 'repro/status.json')
    programs = read(root, 'repro/programs.json')
    rows = []
    for name, address in programs.items():
        item = status[name]
        candidate = inside(root, item['candidate_artifact'])
        report_path = inside(root, item['comparison_report'])
        report = json.loads(report_path.read_text())
        actual = digest(candidate)
        if report['program'] != name or report['comparison']['candidate_sha256'] != actual:
            raise ValueError(f'Candidate does not match its owning build comparison: {name}')
        original = inside(root, f'evidence/original/{name}/deployed.so')
        capture = read(root, f'evidence/original/{name}/capture.json')
        if capture['program'] != address or digest(original) != capture['payload_sha256']:
            raise ValueError(f'Original capture/address mismatch: {name}')
        if report['comparison']['original_sha256'] != capture['payload_sha256']:
            raise ValueError(f'Build comparison uses a different captured original: {name}')
        if item.get('candidate_sha256', actual) != actual:
            raise ValueError(f'Status candidate hash mismatch: {name}')
        rows.append(dict(name=name, address=address, path=str(candidate),
                         sha256=actual, build_comparison=str(report_path),
                         build_comparison_sha256=digest(report_path), kind='reconstructed_candidate'))
    for name in DEPENDENCIES:
        binary = inside(root, f'evidence/dependencies/{name}/deployed.so')
        capture_path = inside(root, f'evidence/dependencies/{name}/capture.json')
        capture = json.loads(capture_path.read_text())
        actual = digest(binary)
        if capture['payload_sha256'] != actual:
            raise ValueError(f'Dependency capture hash mismatch: {name}')
        rows.append(dict(name=name, address=capture['program'], path=str(binary),
                         sha256=actual, capture=str(capture_path),
                         capture_sha256=digest(capture_path), kind='captured_dependency'))
    if len(rows) != 9 or len({r['address'] for r in rows}) != 9:
        raise ValueError('Expected four core programs and five distinct dependency captures.')
    seeds = []
    for name in SEEDS:
        path = (here / 'seed-accounts' / f'{name}_global.json').resolve(strict=True)
        path.relative_to(root)
        value = json.loads(path.read_text())
        account = value['account']
        raw = base64.b64decode(account['data'][0], validate=True)
        if account['data'][1] != 'base64' or account['owner'] != programs[name]:
            raise ValueError(f'Seed encoding/owner mismatch: {name}')
        if account['executable'] or len(raw) != account['space']:
            raise ValueError(f'Seed executable/size mismatch: {name}')
        seeds.append(dict(name=name, address=value['pubkey'], path=str(path), sha256=digest(path)))
    command = ['solana-test-validator', '--ledger', str(ledger), '--quiet',
               '--bind-address', '127.0.0.1', '--rpc-port', str(port)]
    for row in rows:
        command += ['--bpf-program', row['address'], row['path']]
    for row in seeds:
        command += ['--account', row['address'], row['path']]
    return dict(scope='Local-only bounded SDK fixtures; no whole-program or ABI equivalence claim.',
                rpc_url=f'http://127.0.0.1:{port}', ledger=str(ledger),
                programs=rows, seeds=seeds, command=command,
                limits='Three captured global configs do not prepare every SDK flow; privileged, donation relay lifecycle, partial-route and extension acceptance need separate fixtures.')

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('ledger', nargs='?', type=Path)
    parser.add_argument('--dry-run', action='store_true', help='Verify inputs and print the plan without starting a validator or creating a ledger.')
    args = parser.parse_args()
    here = Path(__file__).resolve().parent
    root = Path(subprocess.check_output(['git', '-C', str(here), 'rev-parse', '--show-toplevel'], text=True).strip())
    ledger = args.ledger or root / 'work' / 'sdk-localnet-ledger'
    try:
        plan = prepare(root, here, ledger, int(os.environ.get('RPC_PORT', '8899')))
    except (OSError, ValueError, KeyError) as error:
        parser.exit(2, f'Localnet input verification failed: {error}\n')
    print(json.dumps(plan, indent=2), flush=True)
    if not args.dry_run:
        os.execvp(plan['command'][0], plan['command'])

if __name__ == '__main__':
    main()
