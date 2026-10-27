#!/usr/bin/env python3
"""Recompute this packet's claims from saved artifacts; no compiler, linker or VM runs.

For each recorded round directory (e.g. round21/):
  1. every file matches MANIFEST.json;
  2. the default-layout baseline is the round's published unstripped ELF, and its
     window inventory (repository measurement primitives) has the published counts;
  3. derive_layout.py, re-run on that ELF and the saved baseline map, regenerates
     the saved ordered.ld byte for byte; the script is the SDK default plus a
     qualified `.text` input list only;
  4. the saved ordered ELF's inventory reproduces the recorded counts, with no
     normalized or raw window lost and exactly the recorded raw gains;
  5. the residual classification is recomputed; the translation proof holds: the
     ordered ELF is the baseline with functions permuted and every
     call/pointer/relocation/entry translated;
  6. both recorded ordered builds produced the saved artifacts with the saved
     script; the runtime corpus report is bound to the same candidate and has
     no mismatch.
"""
import gzip
import hashlib
import json
import sys
import tempfile
from pathlib import Path

if not __debug__:
    raise RuntimeError('verification requires assertions; do not use Python -O')
sys.dont_write_bytecode = True

P = Path(__file__).resolve().parent
sys.path.insert(0, str(P / 'tools'))
import derive_layout  # noqa: E402
import layout_script  # noqa: E402
import measure  # noqa: E402
import translation  # noqa: E402

ROOT = measure.ROOT
sha = lambda b: hashlib.sha256(b).hexdigest()


def read(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)


def unpacked(p, tmp):
    p = Path(p)
    if p.suffix != '.gz':
        return p
    out = Path(tmp) / '-'.join(p.relative_to(P).parts)[:-3]  # unique per packet path
    out.write_bytes(gzip.decompress(p.read_bytes()))
    return out


def verify_round(d, tmp):
    claims = read(d / 'claims.json')
    frontier = ROOT / claims['frontier_packet']
    cp = read(frontier / 'CHECKPOINT.json')
    base_elf = frontier / 'unstripped.so'
    assert sha(base_elf.read_bytes()) == cp['unstripped_sha256'] == claims['baseline']['unstripped_sha256']
    base_map = unpacked(d / 'baseline/link.map.gz', tmp)
    windows_from = frontier / 'inventory.json.gz'
    windows = [{'start': w['start'], 'bytes': w['bytes']} for w in read(windows_from)['windows']]
    base = measure.inventory(base_elf, windows)
    assert {k: base['counts'][k] for k in ('raw', 'normalized', 'unmatched')} == \
           {'raw': cp['raw_windows'], 'normalized': cp['normalized_windows'], 'unmatched': 1035 - cp['normalized_windows']}
    # 3. regenerate the script
    ordered, counts = derive_layout.plan(ROOT / 'evidence/original/pump/deployed.so', windows, base_elf, base_map)
    default = (P / 'tools/default.ld').read_text()
    script = layout_script.render(default, [layout_script.selector(x['owner'], x['section']) for x in ordered])
    saved = (d / 'ordered.ld').read_text()
    assert script == saved, 'ordered.ld is not the generator output'
    assert layout_script.check_script(default, saved) == len(ordered)
    # 4. ordered inventory
    ord_elf = unpacked(d / 'ordered/unstripped.so.gz', tmp)
    new = measure.inventory(ord_elf, windows)
    norm = lambda inv: {w['start'] for w in inv['windows'] if w['normalized_matches']}
    raw = lambda inv: {w['start'] for w in inv['windows'] if w['raw_match']}
    assert norm(base) <= norm(new) and raw(base) <= raw(new), 'a match was lost'
    gained = sorted(raw(new) - raw(base))
    assert gained == claims['raw_gained_windows'] and norm(new) == norm(base)
    assert new['counts']['raw'] == claims['ordered']['raw'] and new['counts']['normalized'] == claims['ordered']['normalized']
    objcopy = Path.home() / '.cache/solana/v1.44/platform-tools/llvm/bin/llvm-objcopy'
    if objcopy.is_file():  # optional: the stripped candidate is the SDK strip of the saved ELF
        import subprocess
        stripped = Path(tmp) / (d.name + '-candidate.so')
        subprocess.run([str(objcopy), '--strip-all', str(ord_elf), str(stripped)], check=True)
        assert sha(stripped.read_bytes()) == claims['ordered']['candidate_sha256']
    # residual classes and blocker pricing recomputed from the saved ELF, map and plan
    import classify
    plan = read(d / 'plan.json.gz')
    res = classify.classify(new, plan, ROOT / 'evidence/original/pump/deployed.so', ord_elf, unpacked(d / 'ordered/link.map.gz', tmp))
    assert res['counts'] == claims['residual_classes']
    # 5. translation proof
    t = translation.check(base_elf, base_map, ord_elf, unpacked(d / 'ordered/link.map.gz', tmp))
    assert t['sections'] == claims['translation']['sections'] and t['direct_calls'] == claims['translation']['direct_calls']
    # 6. builds (or, for relink-only rounds, the recorded relink) and runtime
    if not claims['ordered_builds']:
        rl = read(d / 'ordered/relink.json')
        assert rl['unstripped_sha256'] == sha(ord_elf.read_bytes()) and rl['script_sha256'] == sha(saved.encode())
    for name in claims['ordered_builds']:
        b = read(d / 'ordered' / name)
        assert b['returncode'] == 0 and b['source_unchanged']
        assert b['unstripped_sha256'] == sha(ord_elf.read_bytes()) and b['candidate_sha256'] == claims['ordered']['candidate_sha256']
        assert b['linker_script_sha256'] == sha(saved.encode())
        assert all(v == read(d / 'ordered' / claims['ordered_builds'][0])['primary_source_sha256'][k] for k, v in b['primary_source_sha256'].items())
    if 'runtime' in claims:
        r = read(d / claims['runtime']['summary'])
        assert r['candidate_sha256'] == claims['ordered']['candidate_sha256']
        assert r['case_count'] == claims['runtime']['case_count'] and r['diagnostic_mismatches'] == 0
    return {'round': d.name, 'baseline_raw': base['counts']['raw'], 'ordered_raw': new['counts']['raw'],
            'normalized': new['counts']['normalized'], 'raw_gained': [hex(x) for x in gained],
            'selectors': len(ordered), 'translation_sections': t['sections']}


def main():
    manifest = read(P / 'MANIFEST.json')
    paths = list(P.rglob('*'))
    assert not any(f.is_symlink() for f in paths), 'packet includes a symlink'
    assert all(f.is_file() or f.is_dir() for f in paths), 'packet includes a special file'
    files = {f.relative_to(P).as_posix() for f in paths if f.is_file()}
    assert files == set(manifest) | {'MANIFEST.json'}, 'packet file inventory differs'
    for name, digest in manifest.items():
        assert sha((P / name).read_bytes()) == digest, name
    results = []
    with tempfile.TemporaryDirectory(prefix='layout-pump-verify-') as tmp:
        for d in sorted(P.glob('round*/')):
            if (d / 'claims.json').is_file():
                results.append(verify_round(d, tmp))
    print(json.dumps({'verified': True, 'rounds': results}, indent=1))


if __name__ == '__main__':
    main()
