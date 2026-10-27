#!/usr/bin/env python3
"""Offline verification of the qualified 65-pair replay. Never runs a VM or RPC."""
from pathlib import Path
import argparse, gzip, hashlib, json, os, re, subprocess, sys, tempfile

CANDIDATE = '64da456052f6c359b5841e8e91c59db64a8e8778cf944fa13a158b141039c1ad'
ORIGINAL = 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
UNQUALIFIED = 'abf92fbec55ab3c48744ac2390e8295c1677d449b29cfd9b321f419b35e5c70f'
MANIFEST = '538ae4328ae2825b3ab1e1993e5107258bb1367101b44e539e84803e78f5816c'
MAYHEM = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
BASE = ['normal','math-reference-overflow','price-low','retained-overflow','zero-vt','zero-denominator','cap','halted','cpi-fee-recipient-reject']
GATES = ['quote-gate-pass','quote-gate-reject','quote-gate-native-only-threshold']

def sha(b): return hashlib.sha256(b).hexdigest()
def within(root, name):
    p = Path(name)
    assert not p.is_absolute() and '..' not in p.parts, name
    return root / p

def read_report(runtime, group, kind):
    raw = within(runtime, group[kind]).read_bytes()
    assert sha(raw) == group[kind + '_sha256']
    data = gzip.decompress(raw)
    assert sha(data) == group[kind + '_json_sha256']
    return json.loads(data)

def non_compute_logs(record):
    return [line for line in record['metadata']['logs']
            if not re.search(r' consumed \d+ of \d+ compute units', line)]

def _verify(root, runtime, candidate_path):
    root, runtime, candidate_path = Path(root).resolve(), Path(runtime).resolve(), Path(candidate_path).resolve()
    raw_manifest = (runtime/'manifest.json').read_bytes()
    assert sha(raw_manifest) == MANIFEST, 'Runtime manifest changed'
    manifest = json.loads(raw_manifest)
    assert (manifest['candidate_sha256'], manifest['original_sha256'], manifest['unqualified_sha256']) == (CANDIDATE, ORIGINAL, UNQUALIFIED)
    assert (manifest['case_count'], manifest['signed_records']) == (65, 130)
    candidate = candidate_path.read_bytes()
    if candidate_path.suffix == '.gz': candidate = gzip.decompress(candidate)
    assert sha(candidate) == CANDIDATE, 'Wrong qualified candidate'
    original = (root/'evidence/original/mayhem/deployed.so').read_bytes()
    assert sha(original) == ORIGINAL, 'Original ELF changed'
    expected = {(role, family, gated) for role, families in [('buy',['native']),('sell',['native']),('sell_v2',['native','token','token22'])]
                for family in families for gated in [False, True]}
    seen = set(); cases = signed = successes = originals_equal = program_bindings = 0
    checks = []
    with tempfile.TemporaryDirectory(prefix='mayhem-offline-receipts-') as temp:
        staged = Path(temp)
        original_path = staged/'evidence/original/mayhem/deployed.so'
        original_path.parent.mkdir(parents=True)
        original_path.write_bytes(original)
        candidate_path = staged/'qualified-candidate.so'; candidate_path.write_bytes(candidate)
        for relative, item in manifest['harness_sources'].items():
            source = within(runtime, item['payload']) if 'payload' in item else within(root, relative)
            raw = source.read_bytes(); assert sha(raw) == item['sha256'], relative
            target = within(staged, relative); target.parent.mkdir(parents=True, exist_ok=True); target.write_bytes(raw)
        for role, checker in manifest['checkers'].items():
            source = within(runtime, checker['payload']); raw = source.read_bytes()
            assert sha(raw) == checker['sha256'], checker['path']
            target = within(staged, checker['path']); target.parent.mkdir(parents=True, exist_ok=True); target.write_bytes(raw)
        for group in manifest['groups']:
            report = read_report(runtime, group, 'qualified'); prior = read_report(runtime, group, 'unqualified')
            role, family = group['role'], group['family']; gated = group['name'].startswith('gate-')
            cohort = (role, family, gated); assert cohort in expected and cohort not in seen; seen.add(cohort)
            names = GATES if gated else BASE + ['cpi-sharing-reject' if role == 'sell_v2' else 'cpi-creator-reject']
            assert [c['name'] for c in group['cases']] == names
            assert report['role'] == role and report['family'] == family
            assert report['candidate_sha256'] == CANDIDATE and prior['candidate_sha256'] == UNQUALIFIED
            assert report['original_sha256'] == prior['original_sha256'] == ORIGINAL
            assert report['case_count'] == prior['case_count'] == len(names)
            assert report['signed_transactions'] == 2 * len(names)
            assert not report['mismatches'] and not report['normalized_log_differences']
            assert [p['case'] for p in report['cases']] == [p['case'] for p in prior['cases']] == group['cases']
            for pair, old in zip(report['cases'], prior['cases']):
                assert pair['original'] == old['original'], (group['name'], pair['case']['name'], 'Original outcome drift')
                originals_equal += 1
                assert not pair['different_fields'] and not pair['normalized_log_difference']
                assert non_compute_logs(pair['original']) == non_compute_logs(pair['candidate']), 'Source-bearing logs changed'
                for side, digest in [('original', ORIGINAL), ('candidate', CANDIDATE)]:
                    for phase in ['before','after']:
                        account = pair[side][phase][MAYHEM]
                        assert account['executable'] and account['data_sha256'] == digest
                    program_bindings += 1
            for relative, digest in report['harness_sha256'].items():
                assert manifest['harness_sources'][relative]['sha256'] == digest
            receipt = staged/(group['name']+'.json'); receipt.write_bytes(gzip.decompress(within(runtime, group['qualified']).read_bytes()))
            output = staged/(group['name']+'-verified.json')
            checker = within(staged, manifest['checkers'][role]['path'])
            env = dict(os.environ, PYTHONDONTWRITEBYTECODE='1')
            result = subprocess.run([sys.executable,'-B',str(checker),'--receipts',str(receipt),'--candidate',str(candidate_path),'--output',str(output)],
                                    env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            assert result.returncode == 0, (group['name'], result.stdout, result.stderr)
            verified = json.loads(output.read_bytes())
            assert verified['candidate_sha256'] == CANDIDATE and verified['original_sha256'] == ORIGINAL
            assert verified['case_count'] == len(names) and verified['verified_signed_transactions'] == 2*len(names)
            assert not verified['mismatches']
            cases += len(names); signed += verified['verified_signed_transactions']; successes += verified['successful_cases']
            checks.append(dict(cohort=group['name'], checker_sha256=manifest['checkers'][role]['sha256'], verified=verified))
    assert seen == expected and (cases, signed, originals_equal, program_bindings, successes) == (65,130,65,130,17)
    summary = dict(candidate_sha256=CANDIDATE, original_sha256=ORIGINAL, runtime_manifest_sha256=MANIFEST,
                   case_pairs=cases, verified_signed_records=signed, successful_pairs=successes,
                   exact_original_records_preserved=originals_equal, actual_program_bindings=program_bindings,
                   exact_non_compute_log_pairs=cases, independent_checker_runs=len(checks), checks=checks,
                   scope='Offline receipt verification only; no VM or RPC execution and no complete behavioral equivalence claim.')
    return summary

def verify(root, packet):
    """Validate the portable packet and return a deterministic JSON-ready summary."""
    packet = Path(packet).resolve()
    return _verify(root, packet/'runtime', packet/'artifacts/recovered/candidate.so.gz')

def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--packet', type=Path, default=Path(__file__).resolve().parent)
    ap.add_argument('--candidate', type=Path, help='Optional explicit qualified ELF or .gz path')
    ap.add_argument('--runtime', type=Path, help='Optional explicit runtime directory')
    ap.add_argument('--root', type=Path, help='Repository root containing authenticated scripts and original ELF')
    ap.add_argument('--output', type=Path)
    args = ap.parse_args()
    root = args.root.resolve() if args.root else next(p for p in Path(__file__).resolve().parents
        if (p/'scripts/verify_mayhem_buy.py').is_file() and (p/'evidence/original/mayhem/deployed.so').is_file())
    if args.candidate or args.runtime:
        summary = _verify(root, args.runtime or args.packet/'runtime', args.candidate or args.packet/'artifacts/recovered/candidate.so.gz')
    else:
        summary = verify(root,args.packet)
    if args.output: args.output.write_text(json.dumps(summary,indent=2)+'\n')
    print(json.dumps({k:v for k,v in summary.items() if k != 'checks'}, indent=2))

if __name__ == '__main__': main()
