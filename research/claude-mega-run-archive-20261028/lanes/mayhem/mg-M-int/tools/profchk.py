# usage: profchk.py CAND BASE ID...  -> original vs base vs cand Source profile per data ref
import importlib.util, sys, gzip, json
from pathlib import Path
spec = importlib.util.spec_from_file_location('ms', '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build/measure.py')
ms = importlib.util.module_from_spec(spec); sys.argv, args = sys.argv[:1], sys.argv[1:]; spec.loader.exec_module(ms)
cand, base, ids = args[0], args[1], set(args[2:])
o, b, c = ms.m.Elf(ms.ORIG.resolve()), ms.m.Elf(Path(base).resolve()), ms.m.Elf(Path(cand).resolve())
rows = json.loads(gzip.decompress((ms.PKT / 'inputs/parent-audit.json.gz').read_bytes()))['rows']
bw, cw = ms.windows(b), ms.windows(c)
for row in rows:
    if row['id'] not in ids: continue
    w = o.window(row['start'], row['end'])
    ob = [z for z in bw.values() if ms.key(z) == ms.key(w)]; oc = [z for z in cw.values() if ms.key(z) == ms.key(w)]
    for ref in w['data_references']:
        e = ms.source(o, ref['target'])
        if e is None: continue
        pb = [ms.profile(b, z).get(ref['offset']) for z in ob]; pc = [ms.profile(c, z).get(ref['offset']) for z in oc]
        print(row['id'], ref['offset'], 'orig', e, '| base', pb, '| cand', pc)
