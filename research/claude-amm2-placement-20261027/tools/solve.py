#!/usr/bin/env python3
"""Re-runnable AMM source-coordinate placement solver: input tree -> placed tree + report.

  solve.py --tree <root containing programs/pump-amm> --symbols <unstripped.so built FROM THAT TREE>
           --output <new dir> [--only-files a.rs,b.rs | --exclude-files a.rs,b.rs] [--levels hard]
           [--no-reorder]

Run it from a pumpfun-source checkout (it needs evidence/original/pump_amm/deployed.so and the
repo's static ELF reader).  Steps:
  1. pair.py     original windows <-> candidate bodies; every paired S site (Anchor error Source
                 filename/line immediates, which decide normalized identity) and L site
                 (core::panic::Location records, raw/whole-ELF only) -> constraint.
  2. placer.py   dry run: per file, maximum-weight order-preserving chain of constraints.
  3. reorder.py  for files where a constrained site is impossible by order, move whole fns among the
                 file's same-type inherent impl blocks (constrained items sorted by original line,
                 L sites as fallback keys); pairs are remapped, no rebuild is needed.
  4. placer.py   whitespace-only placement on the (reordered) tree -> <output>/placed/programs/...
  5. proofs      whitespace-only files: rlex token stream identical (comments included) AND identical
                 after deleting all whitespace; reordered files: skeleton + item multiset identical
                 (reorder.py) and whitespace-only relative to the reordered text.
Outputs: <output>/placed (full tree), <output>/source.patch (diff -ruN against --tree, p1 from the tree
root), <output>/solve-report.json (predicted gains/losses, moves, residual sites with the move they imply).
The prediction is exact only for S sites; confirm with a native build + measure.py (it has been exact
on 647: 26/26 whitespace-only windows).
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import rlex  # noqa: E402

PFX = 'programs/pump-amm/src/'


def run(cmd):
    r = subprocess.run([str(c) for c in cmd], capture_output=True, text=True)
    if r.returncode:
        sys.stderr.write(r.stdout[-3000:] + r.stderr[-3000:])
        raise SystemExit(f'failed: {cmd[:3]}')
    return r.stdout


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--tree', required=True, type=Path)
    ap.add_argument('--symbols', required=True, type=Path)
    ap.add_argument('--output', required=True, type=Path)
    ap.add_argument('--only-files', default='')
    ap.add_argument('--exclude-files', default='')
    ap.add_argument('--levels', default='hard,loc', help='placer levels; loc = also place core::panic::Location lines')
    ap.add_argument('--no-reorder', action='store_true')
    a = ap.parse_args()
    out = a.output.resolve()
    assert not out.exists(), f'{out} exists'
    out.mkdir(parents=True)
    tree = a.tree.resolve()
    py = sys.executable
    sel = []
    if a.only_files:
        sel += ['--only-files', a.only_files]
    if a.exclude_files:
        sel += ['--exclude-files', a.exclude_files]
    pairs = out / 'pairs.json'
    run([py, HERE / 'pair.py', '--candidate-symbols', a.symbols, '--output', pairs, '--quiet'])
    run([py, HERE / 'placer.py', '--tree', tree, '--pairs', pairs, '--output', out / 'dry', '--levels', a.levels] + sel)
    dry = json.load(open(out / 'dry/placement-report.json'))
    order_files = sorted(f.replace(PFX, '') for f, r in dry['files'].items()
                         if any('code move' in d.get('reason', '') for d in r.get('dropped', [])))
    work_tree, work_pairs, reorder_rep = tree, pairs, None
    if order_files and not a.no_reorder:
        run([py, HERE / 'reorder.py', '--tree', tree, '--pairs', pairs, '--output', out / 'reordered',
             '--files', ','.join(order_files), '--levels', a.levels])
        work_tree, work_pairs = out / 'reordered', out / 'reordered/pairs.json'
        reorder_rep = json.load(open(out / 'reordered/reorder-report.json'))
    run([py, HERE / 'placer.py', '--tree', work_tree, '--pairs', work_pairs, '--output', out / 'placed', '--copy-tree',
         '--levels', a.levels] + sel)
    rep = json.load(open(out / 'placed/placement-report.json'))
    # proofs
    proofs = {}
    reordered = {f for f, r in (reorder_rep or {'files': {}})['files'].items() if r.get('moved')}
    for f in rep['changed_files']:
        before = (tree / f).read_text()
        mid = (work_tree / f).read_text()
        after = (out / 'placed' / f).read_text()
        ws_ok, _ = rlex.same_stream(mid, after)
        squeeze = lambda s: ''.join(s.split())
        proofs[f] = {'kind': 'reorder+whitespace' if f in reordered else 'whitespace',
                     'token_stream_equal_to_input' if f not in reordered else 'token_stream_equal_to_reordered': ws_ok,
                     'nonwhitespace_chars_equal': squeeze(mid) == squeeze(after)}
        if f in reordered:
            proofs[f]['item_permutation_verified'] = reorder_rep['files'][f].get('verified_permutation')
            proofs[f]['token_multiset_equal_to_input'] = sorted(rlex.stream(before)) == sorted(rlex.stream(after))
    for f in reordered - set(rep['changed_files']):
        proofs[f] = {'kind': 'reorder', 'item_permutation_verified': reorder_rep['files'][f].get('verified_permutation')}
    # patch (unified, a/ = input tree, b/ = placed tree; apply with patch -p1 from the tree root)
    tmp = out / 'diffroot'
    tmp.mkdir()
    (tmp / 'a').symlink_to(tree)
    (tmp / 'b').symlink_to(out / 'placed')
    files = sorted(set(rep['changed_files']) | reordered)
    chunks = []
    for f in files:
        r = subprocess.run(['diff', '-u', '--label', f'a/{f}', '--label', f'b/{f}', f'a/{f}', f'b/{f}'],
                           capture_output=True, text=True, cwd=tmp)
        chunks.append(r.stdout)
    (out / 'source.patch').write_text(''.join(chunks))
    for x in ('a', 'b'):
        (tmp / x).unlink()
    tmp.rmdir()
    # Location records after placement: token streams of reordered-input and output are identical, so every
    # candidate L site (line, col) maps to its new (line, col) exactly (reordered files: via remapped pairs)
    WP = json.load(open(work_pairs))
    loc = {'exact': 0, 'line_only_diff': 0, 'col_only_diff': 0, 'line_and_col_diff': 0, 'other_file': 0, 'sites': []}
    tokcache = {}
    def toks(path):
        if path not in tokcache:
            tokcache[path] = rlex.tokens(Path(path).read_text())
        return tokcache[path]
    for p in WP['pairs']:
        if p['kind'] != 'L' or not (p.get('cfile') or '').startswith(PFX):
            continue
        f = p['cfile']
        nl, nc = p['cline'], p['ccol']
        if f in rep['changed_files']:
            t0, t1 = toks(work_tree / f), toks(out / 'placed' / f)
            idx = [k for k, t in enumerate(t0) if t.line == p['cline'] and t.col == p['ccol']]
            if idx and len(t0) == len(t1):
                nl, nc = t1[idx[0]].line, t1[idx[0]].col
        if p['ofile'] != f:
            k = 'other_file'
        else:
            k = {(True, True): 'exact', (False, True): 'line_only_diff', (True, False): 'col_only_diff',
                 (False, False): 'line_and_col_diff'}[(nl == p['oline'], nc == p['ocol'])]
        loc[k] += 1
        if k != 'exact':
            loc['sites'].append({'owin': hex(p['owin']), 'file': f.replace(PFX, ''), 'new': [nl, nc],
                                 'original': [p['ofile'].replace(PFX, ''), p['oline'], p['ocol']], 'status': k})
    residual = {}
    for f, r in rep['files'].items():
        if r.get('dropped') or r.get('conflicts'):
            residual[f] = {'dropped': r.get('dropped', []), 'conflicts': r.get('conflicts', [])}
    summary = {'tree': str(tree), 'symbols': str(a.symbols), 'levels': a.levels,
               'reordered_files': sorted(reordered), 'moves': {f: r.get('moved') for f, r in
                                                               (reorder_rep or {'files': {}})['files'].items() if r.get('moved')},
               'changed_files': files, 'predicted_gained': rep['predicted_gained'],
               'predicted_lost': rep['predicted_lost'], 'proofs': proofs, 'residual': residual,
               'location_records': loc}
    (out / 'solve-report.json').write_text(json.dumps(summary, indent=1) + '\n')
    bad = [f for f, p in proofs.items() if not all(v for k, v in p.items() if k != 'kind')]
    print(f"changed {len(files)} files ({len(reordered)} reordered); predicted gained {len(rep['predicted_gained'])}, "
          f"lost {len(rep['predicted_lost'])}; proofs {'OK' if not bad else 'FAILED: ' + ','.join(bad)}")
    print('  gained:', ' '.join(rep['predicted_gained']))
    print('  program-crate Location records:', {k: v for k, v in loc.items() if k != 'sites'})
    if bad:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
