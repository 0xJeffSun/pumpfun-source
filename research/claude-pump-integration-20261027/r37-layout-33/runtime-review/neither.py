"""Changed pairs whose L33 candidate logs still differ from the original: show the L33-vs-original differing lines (compute lines excluded)."""
import gzip, json, collections, difflib, re
from pathlib import Path
R = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump/wt33/research/claude-pump-integration-20261027')
ld = lambda p: json.loads(gzip.decompress((R / p / 'full.json.gz').read_bytes()))
a, b = ld('r37-layout-32'), ld('r37-layout-33')
def pairs(v, path, out):
    if isinstance(v, dict):
        if isinstance(v.get('original'), dict) and isinstance(v.get('candidate'), dict): out[path] = v; return
        for k, x in v.items(): pairs(x, path + '/' + k, out)
    elif isinstance(v, list):
        for i, x in enumerate(v): pairs(x, path + '/' + str(i), out)
pa, pb = {}, {}
for n, s in a['suites'].items(): pairs(s, n, pa)
for n, s in b['suites'].items(): pairs(s, n, pb)
keep = lambda L: [x for x in L if 'consumed' not in x and 'compute units' not in x]
kinds = collections.Counter(); ex = {}; norm_equal = 0
N = lambda s: re.sub(r'\.rs:\d+(:\d+)?', '.rs:L', s)
for k in pa:
    x, y = keep(pa[k]['candidate']['logs']), keep(pb[k]['candidate']['logs']); o = keep(pb[k]['original']['logs'])
    if x == y or y == o: continue
    if [N(s) for s in y] == [N(s) for s in o]: norm_equal += 1
    for op in difflib.SequenceMatcher(a=o, b=y, autojunk=False).get_opcodes():
        if op[0] == 'equal': continue
        key = (op[0], tuple(s[:110] for s in o[op[1]:op[2]]), tuple(s[:110] for s in y[op[3]:op[4]]))
        kinds[key] += 1
print('neither pairs with only source-coordinate differences vs original:', norm_equal)
for (t, ol, yl), n in kinds.most_common(12): print(n, t, '\n   orig:', ol, '\n   L33 :', yl)
