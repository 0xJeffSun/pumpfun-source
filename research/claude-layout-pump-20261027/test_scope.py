#!/usr/bin/env python3
"""Negative controls: verify.py must reject tampered copies of this packet.

Each control copies the packet into a temporary directory inside the
repository (so the copied tools resolve the repository root exactly as the
original does). It applies one change, refreshes MANIFEST.json when the
control targets a deeper check than the manifest, and runs the copied
verify.py on one round. A control passes only when verify.py exits non-zero
and its error names the expected check. The unmodified copy must verify.
Static checks confirm layout_script rejects padding, duplicate and glob
selectors.
"""
import sys
sys.dont_write_bytecode = True  # keep the packet free of __pycache__
import gzip
import hashlib
import json
import shutil
import struct
import subprocess
import tempfile
from pathlib import Path

P = Path(__file__).resolve().parent
sys.path.insert(0, str(P / 'tools'))
import layout_script  # noqa: E402

ROOT = next(p for p in P.parents if (p / 'evidence/original/pump/deployed.so').is_file())
ROUND = 'round25'
DEFAULT = (P / 'tools/default.ld').read_text()
sha = lambda b: hashlib.sha256(b).hexdigest()


def refresh_manifest(q):
    files = sorted(f.relative_to(q).as_posix() for f in q.rglob('*') if f.is_file() and f.name != 'MANIFEST.json')
    (q / 'MANIFEST.json').write_text(json.dumps({f: sha((q / f).read_bytes()) for f in files}, indent=1) + '\n')


def edit_json(path, fn):
    data = json.loads(gzip.decompress(path.read_bytes()) if path.suffix == '.gz' else path.read_text())
    fn(data)
    raw = json.dumps(data, indent=1).encode()
    path.write_bytes(gzip.compress(raw, mtime=0) if path.suffix == '.gz' else raw + b'\n')


def run(q):
    r = subprocess.run([sys.executable, str(q / 'verify.py'), '--round', ROUND], capture_output=True, text=True)
    return r.returncode, (r.stderr.strip().splitlines() or [''])[-1]


def swap_selectors(q):
    p = q / ROUND / 'ordered.ld'
    lines = p.read_text().split('\n')
    sel = [i for i, x in enumerate(lines) if x.startswith('    *') and '("' in x]
    lines[sel[5]], lines[sel[6]] = lines[sel[6]], lines[sel[5]]
    p.write_text('\n'.join(lines))


def raise_claimed_raw(q):
    edit_json(q / ROUND / 'claims.json', lambda c: c['ordered'].__setitem__('raw', c['ordered']['raw'] + 1))


def change_runtime_total(q):
    edit_json(q / ROUND / 'runtime/summary.json', lambda s: s.__setitem__('case_count', s['case_count'] + 1))


def inject_runtime_mismatch(q):
    summary_path = q / ROUND / 'runtime/summary.json'
    summary = json.loads(summary_path.read_text())
    row = summary['suites'][0]
    f = q / ROUND / 'runtime/suites' / (row['suite'] + '.json.gz')
    edit_json(f, lambda r: r.__setitem__('mismatches', [{'case': 'injected'}]))
    row['result_sha256'] = sha(f.read_bytes())  # keep hashes consistent so the content check must catch it
    summary_path.write_text(json.dumps(summary, indent=1) + '\n')


def change_call_immediate(q):
    p = q / ROUND / 'ordered/unstripped.so.gz'
    b = bytearray(gzip.decompress(p.read_bytes()))
    shoff = struct.unpack_from('<Q', b, 0x28)[0]
    text = struct.unpack_from('<IIQQQQIIQQ', b, shoff + 1 * 64)  # section 1 is .text
    i = text[4]
    while not (b[i] == 0x85 and b[i + 1] >> 4 == 1 and struct.unpack_from('<i', b, i + 4)[0] != -1):
        i += 8
    struct.pack_into('<i', b, i + 4, struct.unpack_from('<i', b, i + 4)[0] + 1)
    p.write_bytes(gzip.compress(bytes(b), mtime=0))
    edit_json(q / ROUND / 'claims.json', lambda c: c['ordered'].__setitem__('unstripped_sha256', sha(bytes(b))))


def change_stripped_byte(q):
    p = q / ROUND / 'ordered/candidate.so.gz'
    b = bytearray(gzip.decompress(p.read_bytes()))
    b[0x200] ^= 1  # inside .text
    p.write_bytes(gzip.compress(bytes(b), mtime=0))
    edit_json(q / ROUND / 'claims.json', lambda c: c['ordered'].__setitem__('candidate_sha256', sha(bytes(b))))


CONTROLS = [  # (name, mutation, refresh manifest, expected text in the failing assertion)
    ('swapped_selector_order', swap_selectors, True, 'ordered.ld is not the generator output'),
    ('claimed_raw_count_raised', raise_claimed_raw, True, 'AssertionError'),
    ('manifest_digest_changed', lambda q: edit_json(q / 'MANIFEST.json', lambda m: m.__setitem__('README.md', '0' * 64)), False, 'README.md'),
    ('runtime_summary_total_changed', change_runtime_total, True, 'AssertionError'),
    ('runtime_case_mismatch_injected', inject_runtime_mismatch, True, 'mismatches'),
    ('ordered_call_immediate_changed', change_call_immediate, True, 'AssertionError'),
    ('stripped_candidate_byte_changed', change_stripped_byte, True, 'AssertionError'),
]


def main():
    results = {}
    # static grammar controls
    script = (P / ROUND / 'ordered.ld').read_text()
    lines = script.split('\n')
    sel = [i for i, x in enumerate(lines) if x.startswith('    *') and '("' in x]

    def rejects(text):
        try:
            layout_script.check_script(DEFAULT, text)
        except AssertionError:
            return True
        return False
    results['static_address_statement_rejected'] = rejects(script.replace(lines[sel[10]] + '\n', lines[sel[10]] + '\n    . = . + 8;\n'))
    results['static_duplicate_selector_rejected'] = rejects(script.replace(lines[sel[3]] + '\n', lines[sel[3]] + '\n' + lines[sel[3]] + '\n'))
    results['static_glob_selector_rejected'] = rejects(script.replace(lines[sel[4]], '    *lib*.rlib(".text*")'))
    results['static_other_section_change_rejected'] = rejects(script.replace('.rodata : { *(.rodata*) }', '.rodata : { *(.rodata.str*) *(.rodata*) }'))
    base = ROOT / 'work'
    base.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='layout-pump-controls-', dir=base) as tmp:
        clean = Path(tmp) / 'unmodified'
        shutil.copytree(P, clean, ignore=shutil.ignore_patterns('__pycache__'))
        code, err = run(clean)
        results['unmodified_copy_verifies'] = code == 0
        assert code == 0, err
        for name, mutate, refresh, expect in CONTROLS:
            q = Path(tmp) / name
            shutil.copytree(clean, q)
            mutate(q)
            if refresh:
                refresh_manifest(q)
            code, err = run(q)
            results[name] = code != 0 and expect in err
            print(name, 'rejected' if results[name] else 'NOT REJECTED', '|', err[:160], flush=True)
    print(json.dumps(results, indent=1))
    assert all(results.values()), results
    print('all', len(results), 'negative controls passed')


if __name__ == '__main__':
    main()
