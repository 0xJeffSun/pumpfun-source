#!/usr/bin/env python3
import concurrent.futures,hashlib,json,urllib.request,urllib.error
from pathlib import Path
ROOT=Path(__file__).resolve().parent
refs={line.split()[1].split('/')[-1]:line.split()[0] for line in (ROOT/'rust-refs.txt').read_text().splitlines()}
builds=json.loads((ROOT/'official-build-references.json').read_text())
FILES=['src/version','library/alloc/src/string.rs','library/alloc/src/vec/mod.rs','library/alloc/src/vec/spec_from_iter_nested.rs','library/alloc/src/collections/btree/navigate.rs','library/alloc/src/fmt.rs','library/alloc/src/raw_vec.rs','library/alloc/src/raw_vec/mod.rs','library/alloc/src/slice.rs','library/core/src/fmt/mod.rs','library/core/src/str/mod.rs','library/core/src/panic/location.rs','library/core/src/slice/sort.rs','library/core/src/iter/traits/iterator.rs']
observed=json.loads((ROOT/'panic-locations.json').read_text())
FILES=sorted(set(FILES)|{p['path'].split('/rust/')[-1] for paths in observed.values() for p in paths})
def fetch(job):
 tag,file=job;ref=refs[builds[tag]['rust_refs'][0]];u=f'https://raw.githubusercontent.com/anza-xyz/rust/{ref}/{file}'
 p=ROOT/'remote'/tag/file
 if not p.exists():
  try:
   with urllib.request.urlopen(u,timeout=30) as r:data=r.read()
  except urllib.error.HTTPError as e:return (tag,file,{'url':u,'error':e.code})
  p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
 data=p.read_bytes();return (tag,file,{'url':u,'sha256':hashlib.sha256(data).hexdigest(),'saved_as':str(p.relative_to(ROOT))})
result={tag:{} for tag in builds}
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
 for tag,file,value in pool.map(fetch,[(t,f) for t in builds for f in FILES]):result[tag][file]=value
(ROOT/'official-source-files.json').write_text(json.dumps(result,indent=2)+'\n')
for tag in builds:
 base=ROOT/'remote'/tag
 print('\n'+tag,(base/'src/version').read_text().strip())
 for file,lineno in [('library/alloc/src/string.rs',2559),('library/alloc/src/vec/mod.rs',3112),('library/alloc/src/string.rs',2830),('library/core/src/fmt/mod.rs',2741)]:
  a=(base/file).read_text().splitlines();print(file,lineno,repr(a[lineno-1] if len(a)>=lineno else '<past EOF>'))
