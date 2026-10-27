#!/usr/bin/env python3
"""Mutation controls for verify.py: every tampering below must make verification fail.

Each control copies the packet to a temporary directory, applies one mutation,
rewrites manifest.json (except for the inventory control) so that the targeted
check — not the inventory — has to catch it, and runs the copied verify.py
against this repository. Read-only for the packet itself.
"""
import gzip, json, re, shutil, subprocess, sys, tempfile
from pathlib import Path

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = next(p for p in [P, *P.parents] if (p / 'evidence/original/pump_amm/deployed.so').is_file())
FRONTIER = 'event-decoder'
LAYOUT = 'event-decoder-text-data'


def load_claims(d):
    return json.loads((d / 'claims.json').read_text())


def save_claims(d, c):
    (d / 'claims.json').write_text(json.dumps(c, indent=1))


def edit_script(d, fn):
    f = d / 'layout' / (LAYOUT + '.ld')
    f.write_text(fn(f.read_text()))


def tamper_selector(d):
    edit_script(d, lambda s: s.replace('._ZN18pump_amm_recovered', '._ZN18pump_amm_recoverex', 1))


def glob_selector(d):
    def fn(s):
        lines = s.split('\n')
        i = next(k for k, l in enumerate(lines) if l.startswith('    *') and '(".text.' in l)
        lines[i] = re.sub(r'\("\.text\.[^"]*"\)', '(".text.*")', lines[i])
        return '\n'.join(lines)
    edit_script(d, fn)


def inserted_statement(d):
    edit_script(d, lambda s: s.replace('  .text : {\n', '  .text : {\n    . = . + 8;\n', 1))


def claims_counts(d):
    c = load_claims(d)
    c['frontiers'][FRONTIER]['layouts'][LAYOUT]['counts']['raw_matches'] += 1
    save_claims(d, c)


def measure_json(d):
    f = d / 'measurement' / (LAYOUT + '-measure.json.gz')
    m = json.loads(gzip.decompress(f.read_bytes()))
    row = next(r for r in m['rows'] if r['matches'] and not r['raw_match'])
    row['raw_match'] = True
    f.write_bytes(gzip.compress(json.dumps(m).encode(), mtime=0))


def runtime_summary(d):
    f = d / 'runtime' / LAYOUT / 'summary.json'
    s = json.loads(f.read_text())
    s['cases'] -= 1
    f.write_text(json.dumps(s, indent=2))


def runtime_case(d):
    f = d / 'runtime' / LAYOUT / 'cases.json.gz'
    c = json.loads(gzip.decompress(f.read_bytes()))
    suite = sorted(c['suites'])[0]
    c['suites'][suite]['cases'][0][1] = False
    f.write_bytes(gzip.compress(json.dumps(c).encode(), mtime=0))


def patched_byte(d):
    """Patch the last text instruction's immediate (a tail function with no original
    counterpart, so every count is unchanged) in both ELFs and re-seal their hashes:
    only the byte-level translation proof can reject it."""
    import hashlib, struct
    c = load_claims(d)
    rec = c['frontiers'][FRONTIER]['layouts'][LAYOUT]
    for key in ('candidate', 'symbols'):
        f = d / rec[key]
        b = bytearray(gzip.decompress(f.read_bytes()))
        shoff, shnum = struct.unpack_from('<Q', b, 40)[0], struct.unpack_from('<H', b, 60)[0]
        text = struct.unpack_from('<IIQQQQIIQQ', b, shoff + 64)          # section 1 is .text
        off = text[4] + text[5] - 8 + 4
        b[off] ^= 0x01
        f.write_bytes(gzip.compress(bytes(b), mtime=0))
        rec[key + '_sha256'] = hashlib.sha256(bytes(b)).hexdigest()
    m = d / rec['measurement']                          # re-seal the saved measurement binding too
    saved = json.loads(gzip.decompress(m.read_bytes()))
    saved['candidate_sha256'] = rec['candidate_sha256']
    m.write_bytes(gzip.compress(json.dumps(saved).encode(), mtime=0))
    save_claims(d, c)


def inventory(d):
    (d / 'README.md').write_text((d / 'README.md').read_text() + '\n')


CONTROLS = [
    ('tampered selector', tamper_selector, 'selector names no default input section', True),
    ('glob selector', glob_selector, 'selector is not a qualified input-section name', True),
    ('inserted statement', inserted_statement, 'selector is not a qualified input-section name', True),
    ('claims counts', claims_counts, 'claimed counts differ', True),
    ('measurement JSON', measure_json, 'saved measurement rows differ', True),
    ('runtime summary', runtime_summary, 'runtime summary counts', True),
    ('runtime case verdict', runtime_case, 'negative case verdict', True),
    ('patched ELF byte', patched_byte, 'predicted bytes differ', True),
    ('inventory', inventory, 'packet file inventory differs', False),
]


def run(d):
    return subprocess.run([sys.executable, '-B', str(d / 'verify.py'), '--repository-root', str(ROOT),
                           '--frontier', FRONTIER, '--skip-regenerate'], capture_output=True, text=True)


def main():
    results = []
    with tempfile.TemporaryDirectory() as tmp:
        clean = Path(tmp) / 'clean'
        shutil.copytree(P, clean)
        r = run(clean)
        assert r.returncode == 0 and r.stdout.strip().endswith('verified'), r.stderr[-2000:]
        results.append(('unmodified copy', 'passes'))
        for name, mutate, expect, reseal in CONTROLS:
            d = Path(tmp) / re.sub(r'\W+', '-', name)
            shutil.copytree(P, d)
            mutate(d)
            if reseal:
                subprocess.run([sys.executable, '-B', str(d / 'tools/manifest.py')], check=True, capture_output=True)
            r = run(d)
            assert r.returncode != 0, name + ': tampering was not detected'
            if expect:
                assert expect in r.stderr, (name, r.stderr[-1500:])
            results.append((name, 'rejected: ' + (expect or r.stderr.strip().splitlines()[-1][:120])))
    for name, outcome in results:
        print(f'{name}: {outcome}')
    print('mutation controls passed:', len(results) - 1)


if __name__ == '__main__':
    main()
