"""Verify ordinary-source Result/event construction trials without promoting them."""
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
LABELS = ('explicit-match', 'map-result', 'destructure-result', 'match-destructure', 'event-tag-last', 'event-load-order')
FRAGMENTS = ('24donate_native_v1_handler17h', '41donate_native_pubkey_config_id_v1_handler17h', '17donate_v1_handler17h', '45donate_pubkey_config_id_with_payer_v1_handler17h')


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def encoded(value):
    return (json.dumps(value, sort_keys=True, indent=2) + '\n').encode()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def sources():
    parent = module('result_shape_parent', ROOT / 'repro/donation-relay/donation-close-order-controls/verify.py')
    base = parent.sources()['after-close']
    name = 'src/donation_handlers.rs'
    original = base[name].decode()
    result = {}
    pattern = r'(let result=)(crate::shared_donation::donate_shared\([\s\S]*?debouncer_bump:debouncer_bump\}\))\?;'
    explicit, count = re.subn(pattern, lambda m: m[1] + 'match ' + m[2] + ' { Ok(value)=>value, Err(error)=>return Err(error) };', original)
    assert count == 5
    result['explicit-match'] = explicit
    pattern = r'let result=(crate::shared_donation::donate_shared\([\s\S]*?debouncer_bump:debouncer_bump\}\))\?;([\s\S]*?)            let event=(DonationMadeV1Event \{[^\n]+\});([\s\S]*?)            Ok\(event\)'
    counts = []
    def mapped(match):
        if 'close_account' in match[2] + match[4]:
            return match[0]
        counts.append(1)
        return 'let result=' + match[1] + ';' + match[2] + '            result.map(|result| ' + match[3] + ')' + match[4]
    result['map-result'] = re.sub(pattern, mapped, original)
    assert len(counts) == 3  # Native error/close order stays exactly as in the parent.
    for label, text in [('destructure-result', original), ('match-destructure', explicit)]:
        text = text.replace('let result=crate::shared_donation::donate_shared', 'let crate::shared_donation::DonationAmounts {epoch,gross_amount,tip}=crate::shared_donation::donate_shared').replace('let result=match crate::shared_donation::donate_shared', 'let crate::shared_donation::DonationAmounts {epoch,gross_amount,tip}=match crate::shared_donation::donate_shared')
        for field in ('epoch', 'gross_amount', 'tip'):
            text = text.replace('result.' + field, field)
        result[label] = text
    for label, order in [('event-tag-last', ['config_id', 'mint', 'epoch', 'gross_amount', 'tip', 'message', 'credited_to', 'daas_event_discriminator']), ('event-load-order', ['epoch', 'gross_amount', 'tip', 'mint', 'config_id', 'credited_to', 'message', 'daas_event_discriminator'])]:
        def reorder(match):
            fields = dict(x.split(':', 1) for x in match[1].split(','))
            assert set(fields) == set(order)
            return 'DonationMadeV1Event {' + ','.join(k + ':' + fields[k] for k in order) + '}'
        result[label], count = re.subn(r'DonationMadeV1Event \{([^{}]+)\}', reorder, original)
        assert count == 5
    return {label: dict(base, **{name: result[label].encode()}) for label in LABELS}


def derive():
    parser = module('result_shape_elf', ROOT / 'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py')
    descriptors = json.loads((HERE / 'artifacts.json').read_bytes())
    rows = {}
    with tempfile.TemporaryDirectory(prefix='relay-result-shape-') as tmp:
        folder = Path(tmp)
        shutil.copyfile(ROOT / 'evidence/dependencies/donation_relay/deployed.so', folder / 'original.so')
        shutil.copyfile(ROOT / 'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json', folder / 'original-windows.json')
        for label in LABELS:
            for kind, filename in [('candidate', 'candidate.so'), ('symbols', 'unstripped.so')]:
                row = descriptors[label][kind]
                raw = gzip.decompress((ROOT / row['path']).read_bytes())
                assert sha(raw) == row['sha256'] and len(raw) == row['bytes']
                (folder / filename).write_bytes(raw)
            data = parser.analyze(folder)
            original, candidate = data['original-function-ledger.json'], data['candidate-function-ledger.json']
            wrappers = []
            for ordinal, fragment in zip((92, 93, 94, 95), FRAGMENTS):
                found = [f for f in candidate if any(fragment in name for name in f['names'])]
                assert len(found) == 1, (label, ordinal)
                a, b = original[ordinal], found[0]
                wrappers.append(dict(ordinal=ordinal, candidate_index=b['index'], original_bytes=a['bytes'], candidate_bytes=b['bytes'], original_normalized_sha256=a['normalized_sha256'], candidate_normalized_sha256=b['normalized_sha256'], candidate_call_offsets=[c['offset'] for c in b['direct_calls']]))
            rows[label] = dict(summary=data['comparison-summary.json'], normalized_ordinals=[r['ordinal'] for r in data['match-ledger.json'] if r['normalized_candidate_indices']], raw_ordinals=[r['ordinal'] for r in data['match-ledger.json'] if r['raw_candidate_indices']], wrappers=wrappers)
    return rows


def verify():
    manifest = json.loads((HERE / 'manifest.json').read_bytes())
    assert set(manifest) == {str(p.relative_to(HERE)) for p in HERE.rglob('*') if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    for name, digest in manifest.items():
        path = HERE / name
        assert not path.is_symlink() and path.resolve().is_relative_to(HERE) and sha(path.read_bytes()) == digest, name
    for name, digest in json.loads((HERE / 'parents.json').read_bytes()).items():
        assert sha((ROOT / name).read_bytes()) == digest, name
    source_maps = sources()
    artifacts = json.loads((HERE / 'artifacts.json').read_bytes())
    for label in LABELS:
        folder = HERE / 'builds' / label
        launch = json.loads((folder / 'launch.json').read_bytes())
        result = json.loads((folder / 'result.json').read_bytes())
        log = (folder / 'build.log').read_bytes()
        assert len(source_maps[label]) == 60
        assert launch['inputs'] == {n: sha(raw) for n, raw in source_maps[label].items()}
        assert launch['rustc_sha256'] == '89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'
        assert launch['fresh_target'] == (label == 'match-destructure')
        assert result['exit_code'] == 0 and result['source_unchanged'] and result['root_invocations'] == 1
        assert log.count(b'--crate-name donation_relay_source_proposal ') == 1 and sha(log) == result['build_log_sha256']
        if label == 'match-destructure':
            assert not re.search(rb'^\s*Fresh ', log, re.M)
            assert len(re.findall(rb'^\s*Compiling ', log, re.M)) > 100
        assert all(flag in launch['command'] for flag in ('--locked', '--offline', 'sbpf-solana-solana', '--remap-path-prefix=src/=programs/contracts/src/'))
        for kind in ('candidate', 'symbols'):
            assert result[kind + '_sha256'] == artifacts[label][kind]['sha256']
    data = derive()
    assert data == json.loads((HERE / 'report.json').read_bytes())
    parent = json.loads((ROOT / 'repro/donation-relay/donation-close-order-controls/report.json').read_bytes())['after-close']
    for label, row in data.items():
        assert row['normalized_ordinals'] == parent['matched_ordinals']
        assert row['summary']['original_normalized_match_windows'] == 488
        assert not row['summary']['whole_file_equal']
        assert all(r['original_normalized_sha256'] != r['candidate_normalized_sha256'] for r in row['wrappers'])
    assert data['map-result']['summary']['original_raw_match_windows'] == 140
    assert all(data[label]['summary']['original_raw_match_windows'] == 142 for label in LABELS if label != 'map-result')
    print('PASS: six actual root builds; one fresh all-dependency build; no complete-window gains; map-result loses two raw matches; all controls rejected')


if __name__ == '__main__':
    verify()
