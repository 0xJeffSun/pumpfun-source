# usage: winnames.py SYMBOLS.so ID... -> candidate function name(s) normalized-matching each original window
import importlib.util, sys, gzip, json
from pathlib import Path
spec = importlib.util.spec_from_file_location('ms', '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build/measure.py')
ms = importlib.util.module_from_spec(spec); sys.argv, args = sys.argv[:1], sys.argv[1:]; spec.loader.exec_module(ms)
o, c = ms.m.Elf(ms.ORIG.resolve()), ms.m.Elf(Path(args[0]).resolve())
rows = json.loads(gzip.decompress((ms.PKT / 'inputs/parent-audit.json.gz').read_bytes()))['rows']
cw = ms.windows(c); names = {s['value']: s for s in c.symbols if s['info'] & 15 == 2}
for row in rows:
    if row['id'] in args[1:]:
        w = o.window(row['start'], row['end']); hits = [a for a, z in cw.items() if ms.key(z) == ms.key(w)]
        print(row['id'], row['start'], row['end'] - row['start'], [c.name(names[a]) if hasattr(c, 'name') else names[a].get('name', a) for a in hits][:2])
