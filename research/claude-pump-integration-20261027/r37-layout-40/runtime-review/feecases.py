"""Corpus cases whose ORIGINAL logs report an Anchor account error on fee_config; compare candidate logs (compute lines excluded)."""
import gzip, json, re, sys, collections
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
d = json.loads(gzip.decompress(open(W + '/full/work/claude-reg/' + sys.argv[1] + '/full.json.gz', 'rb').read()))
def pairs(v, path, out):
    if isinstance(v, dict):
        if isinstance(v.get('original'), dict) and isinstance(v.get('candidate'), dict): out[path] = v; return
        for k, x in v.items(): pairs(x, path + '/' + k, out)
    elif isinstance(v, list):
        for i, x in enumerate(v): pairs(x, path + '/' + str(i), out)
P = {}; pairs(d, '', P)
logs = lambda r: [x for x in (r.get('logs') or r.get('log_messages') or []) if 'consumed' not in x and 'compute units' not in x]
c = collections.Counter(); same = diff = 0; ex = []
for k, v in P.items():
    o = logs(v['original'])
    hit = [x for x in o if 'caused by account: fee_config' in x]
    if not hit: continue
    code = re.search(r'Error Code: (\w+)', hit[0]); suite = k.split('/')[2] if k.count('/') > 2 else k
    c[(suite, code.group(1) if code else '?')] += 1
    if logs(v['candidate']) == o: same += 1
    else: diff += 1; ex.append(k)
print('fee_config account-error cases:', sum(c.values()), dict(c)); print('candidate logs identical:', same, 'different:', diff, ex[:5])
