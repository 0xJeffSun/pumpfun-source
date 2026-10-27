"""Recompute two rejected ordinary-source controls against the 488-window build."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json
import re
import shutil
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
PARENT = ROOT / 'repro/donation-relay/settlement-artifact-recovery'


def sha(data):
    return hashlib.sha256(data).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def encoded(value):
    return (json.dumps(value, sort_keys=True, indent=2) + '\n').encode()


def sources():
    parent = module('close_order_source', ROOT / 'repro/donation-relay/settlement-bodies-source-proposal/verify.py')
    parent.manifest()
    baseline = parent.sources()['recovered']
    after = dict(baseline)
    name = 'src/donation_handlers.rs'
    lines = after[name].decode().splitlines(True)
    count = 0
    for i in range(len(lines) - 1):
        if 'let event=' in lines[i] and 'close_account' in lines[i + 1]:
            lines[i], lines[i + 1] = lines[i + 1], lines[i]
            count += 1
    assert count == 2
    after[name] = ''.join(lines).encode()
    borrowed = dict(after)
    name = 'src/tools/donate/shared.rs'
    borrowed[name] = borrowed[name].decode().replace('pub struct DonationAmounts', '''impl DonationArgs {
 pub fn new(config_id:&[u8;32],amount:u64,message:String,tip_bps:u16,epoch_tracker_bump:u8,debouncer_bump:u8)->Self {
  Self {config_id:*config_id,amount,message,tip_bps,epoch_tracker_bump,debouncer_bump}
 }
}
pub struct DonationAmounts''').encode()
    name = 'src/donation_handlers.rs'
    pattern = r'crate::shared_donation::DonationArgs \{config_id:(config_id(?:\.to_bytes\(\))?),amount:amount,tip_bps:tip_bps,message:message.clone\(\),epoch_tracker_bump:epoch_tracker_bump,debouncer_bump:debouncer_bump\}'
    text, count = re.subn(pattern, lambda m: 'crate::shared_donation::DonationArgs::new(&' + m[1] + ',amount,message.clone(),tip_bps,epoch_tracker_bump,debouncer_bump)', borrowed[name].decode())
    assert count == 5
    borrowed[name] = text.encode()
    return {'baseline': baseline, 'after-close': after, 'borrowed-key': borrowed}


def derive():
    parser = module('close_order_parser', ROOT / 'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py')
    meta = json.loads((PARENT / 'metadata.json').read_bytes())
    result = {}
    with tempfile.TemporaryDirectory(prefix='relay-close-order-') as tmp:
        folder = Path(tmp)
        shutil.copyfile(ROOT / 'evidence/dependencies/donation_relay/deployed.so', folder / 'original.so')
        shutil.copyfile(ROOT / 'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json', folder / 'original-windows.json')
        for label in ('baseline', 'after-close', 'borrowed-key'):
            artifacts = meta['variants']['recovered']['artifacts'] if label == 'baseline' else json.loads((HERE / 'artifacts.json').read_bytes())
            owner = PARENT if label == 'baseline' else HERE
            for kind, dest in [('candidate', 'candidate.so'), ('symbols', 'unstripped.so')]:
                descriptor = artifacts[kind]
                data = gzip.decompress((owner / descriptor['path']).read_bytes())
                assert sha(data) == descriptor['sha256'] and len(data) == descriptor['bytes']
                (folder / dest).write_bytes(data)
            analysis = parser.analyze(folder)
            original = analysis['original-function-ledger.json']
            candidate = analysis['candidate-function-ledger.json']
            target_to_original = {row['start']: row['ordinal'] for row in original}
            target_to_matches = {}
            for row in candidate:
                target_to_matches[row['start']] = [other['ordinal'] for other in original if (other['bytes'], other['normalized_sha256']) == (row['bytes'], row['normalized_sha256'])]
            wrappers = []
            for ordinal in (92, 93, 94, 95):
                a, b = original[ordinal], candidate[ordinal]
                assert any('donation_handlers' in name and 'donate' in name for name in b['names'])
                wrappers.append(dict(ordinal=ordinal, original_bytes=a['bytes'], candidate_bytes=b['bytes'], original_normalized_sha256=a['normalized_sha256'], candidate_normalized_sha256=b['normalized_sha256'], original_calls=[dict(offset=c['offset'], target_ordinal=target_to_original.get(c['target'])) for c in a['direct_calls']], candidate_calls=[dict(offset=c['offset'], matching_target_ordinals=target_to_matches[c['target']]) for c in b['direct_calls']]))
            result[label] = dict(summary=analysis['comparison-summary.json'], matched_ordinals=[row['ordinal'] for row in analysis['match-ledger.json'] if row['normalized_candidate_indices']], wrappers=wrappers)
    return result


def verify():
    for name, digest in json.loads((HERE / 'manifest.json').read_bytes()).items():
        file = HERE / name
        assert not file.is_symlink() and file.resolve().is_relative_to(HERE) and sha(file.read_bytes()) == digest, name
    for name, digest in json.loads((HERE / 'parents.json').read_bytes()).items():
        assert sha((ROOT / name).read_bytes()) == digest, name
    variants = sources()
    artifacts = json.loads((HERE / 'artifacts.json').read_bytes())
    for label in ('after-close', 'borrowed-key'):
        path = HERE / 'builds' / label
        launch = json.loads((path / 'launch.json').read_bytes())
        result = json.loads((path / 'result.json').read_bytes())
        log = (path / 'build.log').read_bytes()
        assert launch['inputs'] == {name: sha(data) for name, data in variants[label].items()}
        assert len(launch['inputs']) == 60 and launch['fresh_target'] is False
        assert launch['rustc_sha256'] == '89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'
        assert all(flag in launch['command'] for flag in ('--locked', '--offline', 'sbpf-solana-solana', '--remap-path-prefix=src/=programs/contracts/src/'))
        assert result['exit_code'] == 0 and result['source_unchanged'] and result['root_invocations'] == 1
        assert log.count(b'--crate-name donation_relay_source_proposal ') == 1 and sha(log) == result['build_log_sha256']
        for kind in ('candidate', 'symbols'):
            assert artifacts[kind]['sha256'] == result[kind + '_sha256']
        assert result['candidate_bytes'] == artifacts['candidate']['bytes']
    report = derive()
    assert report == json.loads((HERE / 'report.json').read_bytes())
    for label, row in report.items():
        assert row['summary']['original_normalized_match_windows'] == 488
        assert row['summary']['original_raw_match_windows'] == 142
        assert row['matched_ordinals'] == report['baseline']['matched_ordinals']
        assert not row['summary']['whole_file_equal']
    assert report['after-close'] == report['borrowed-key']
    for row in report['after-close']['wrappers']:
        assert row['original_normalized_sha256'] != row['candidate_normalized_sha256']
        assert row['candidate_bytes'] == (6232 if row['ordinal'] < 94 else 2552)
        assert len(row['original_calls']) == len(row['candidate_calls'])
        assert all(a['target_ordinal'] in b['matching_target_ordinals'] for a, b in zip(row['original_calls'], row['candidate_calls']))
    print('PASS: two actual root builds; identical rejected outputs; 488/492 unchanged; native cleanup call restored, full wrappers unequal; no runtime claim')


if __name__ == '__main__':
    verify()
