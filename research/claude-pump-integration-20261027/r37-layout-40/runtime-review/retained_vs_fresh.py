"""Compare candidate log sequences of the L39 packet corpus (r37-layout-39/full.json.gz) with L40's fresh run; compute lines excluded,
source coordinates kept verbatim. Reports every candidate log change."""
import gzip, json, sys, collections, difflib
from pathlib import Path
R = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump/wt39/research/claude-pump-integration-20261027')
W_ = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work')
RD = {'r37-layout-39': W_ / 'lanes/fz-int-pump/wt39/research/claude-pump-integration-20261027/r37-layout-39', 'r37-layout-40': W_ / 'full/work/claude-reg/r37-layout-40'}
ld = lambda p: json.loads(gzip.decompress((RD[p] / 'full.json.gz').read_bytes()))
a, b = ld('r37-layout-39'), ld('r37-layout-40')
def pairs(v, path, out):
    if isinstance(v, dict):
        if isinstance(v.get('original'), dict) and isinstance(v.get('candidate'), dict):
            out[path] = v; return
        for k, x in v.items(): pairs(x, path + '/' + k, out)
    elif isinstance(v, list):
        for i, x in enumerate(v): pairs(x, path + '/' + str(i), out)
pa, pb = {}, {}
for n, s in a['suites'].items(): pairs(s, n, pa)
for n, s in b['suites'].items(): pairs(s, n, pb)
assert pa.keys() == pb.keys(), 'pair sets differ'
keep = lambda L: [x for x in L if 'consumed' not in x and 'compute units' not in x]
c = collections.Counter(); ins = collections.Counter(); unexpected = []
for k in pa:
    if keep(pa[k]['original']['logs']) != keep(pb[k]['original']['logs']): c['original_changed'] += 1
    x, y = keep(pa[k]['candidate']['logs']), keep(pb[k]['candidate']['logs'])
    if x == y: c['candidate_unchanged'] += 1; continue
    ops = [o for o in difflib.SequenceMatcher(a=x, b=y, autojunk=False).get_opcodes() if o[0] != 'equal']
    if all(o[0] == 'insert' for o in ops):
        for o in ops:
            for line in y[o[3]:o[4]]: ins[line] += 1
        c['candidate_insert_only'] += 1
    else: unexpected.append(k)
print(json.dumps({'pairs': len(pa), **c, 'inserted_lines': ins, 'unexpected': unexpected[:10], 'unexpected_count': len(unexpected)}, indent=1))
