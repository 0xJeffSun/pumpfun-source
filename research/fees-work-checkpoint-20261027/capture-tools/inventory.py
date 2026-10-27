from pathlib import Path
import os,stat,json,collections
ROOT=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/fees-next-trial')
OUT=ROOT.parent/'fees-checkpoint-20261027'
SKIP_TOP={'sdk','target','parallel-admin-fast-target','parallel-donation-fast-target','parallel-sharing-fast-target','parallel-donation-direct-ir','parallel-sharing-direct-ir','__pycache__'}
SKIP_DIR={'.git','__pycache__','target','node_modules','.venv','venv','registry'}
SKIP_FILES={'.DS_Store','credentials','credentials.toml','.env','.env.local'}
files=[];links=[];excluded=[];summary=collections.Counter();sizes=collections.Counter()
for base,dirs,names in os.walk(ROOT,followlinks=False):
 base=Path(base);rel=base.relative_to(ROOT)
 keep=[]
 for name in dirs:
  p=base/name;part=p.relative_to(ROOT)
  if (len(part.parts)==1 and name in SKIP_TOP)or name in SKIP_DIR:excluded.append(str(part));continue
  if p.is_symlink():links.append(dict(path=str(part),target=os.readlink(p)));continue
  keep.append(name)
 dirs[:]=sorted(keep)
 for name in sorted(names):
  p=base/name;part=p.relative_to(ROOT)
  if name in SKIP_FILES or name.endswith('.pyc')or name.endswith('.lock')and name!='Cargo.lock':excluded.append(str(part));continue
  st=p.lstat()
  if stat.S_ISLNK(st.st_mode):links.append(dict(path=str(part),target=os.readlink(p)));continue
  if not stat.S_ISREG(st.st_mode):excluded.append(str(part));continue
  files.append(dict(path=str(part),bytes=st.st_size,mode=stat.S_IMODE(st.st_mode),mtime_ns=st.st_mtime_ns));summary[part.parts[0]]+=1;sizes[part.parts[0]]+=st.st_size
(OUT/'inventory.json').write_text(json.dumps(dict(root=str(ROOT),files=files,symlinks=links,excluded=excluded),separators=(',',':'))+'\n')
print(json.dumps(dict(files=len(files),symlinks=len(links),logical_bytes=sum(x['bytes']for x in files),excluded_roots=sorted(SKIP_TOP),largest=[dict(path=k,files=summary[k],bytes=v)for k,v in sizes.most_common(12)]),indent=2))
