"""For every pair whose candidate log sequence changed between the L37 packet corpus and L38's fresh run (compute lines excluded),
classify: L38 candidate now equal to the original's logs / was equal before / neither; list differing lines by kind."""
import gzip, json, collections, difflib, re
from pathlib import Path
R = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump/wt37/research/claude-pump-integration-20261027')
W_ = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work')
RD = {'r37-layout-37': W_ / 'lanes/fz-int-pump/wt37/research/claude-pump-integration-20261027/r37-layout-37', 'r37-layout-38': W_ / 'full/work/claude-reg/r37-layout-38'}
ld = lambda p: json.loads(gzip.decompress((RD[p] / 'full.json.gz').read_bytes()))
a, b = ld('r37-layout-37'), ld('r37-layout-38')
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
c = collections.Counter(); kinds = collections.Counter(); suites = collections.Counter(); ex = {}
for k in pa:
    x, y = keep(pa[k]['candidate']['logs']), keep(pb[k]['candidate']['logs']); o = keep(pb[k]['original']['logs'])
    if x == y: continue
    suites[k.split('/')[0]] += 1
    c['now_equal_original' if y == o else ('was_equal_original' if x == o else 'neither')] += 1
    for op in difflib.SequenceMatcher(a=x, b=y, autojunk=False).get_opcodes():
        if op[0] == 'equal': continue
        for l1, l2 in zip(x[op[1]:op[2]], y[op[3]:op[4]]):
            key = re.sub(r'\d+', 'N', l1[:90]) + '  ->  ' + re.sub(r'\d+', 'N', l2[:90]); kinds[key] += 1; ex.setdefault(key, (k, l1[:160], l2[:160]))
        if op[2] - op[1] != op[4] - op[3]: kinds['length change ' + op[0]] += 1
print(json.dumps({'changed': sum(suites.values()), 'classes': c, 'suites': suites, 'line_kinds': kinds.most_common(30), 'examples': list(ex.values())[:12]}, indent=1))
