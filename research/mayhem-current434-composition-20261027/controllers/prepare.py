from pathlib import Path
import hashlib,json,tarfile,importlib.util,difflib
R=Path.cwd();W=R/'work/mayhem-priority-20261027';A=R/'work/latest-review-20261027';D=W/'layout-frontier434-origins-01'
sha=lambda b:hashlib.sha256(b).hexdigest()
s=importlib.util.spec_from_file_location('qparent',A/'claude-mayhem-b-20261027/verify.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);m.ROOT=R;q=m.parent_sources()
origin={}
with tarfile.open(R/'research/mayhem-source-origin-recovery-20261027/source.tar.gz')as t:
 for x in t:origin[x.name]=t.extractfile(x).read()
assert len(origin)==67
cp={p.relative_to(A/'source434/programs/mayhem').as_posix():p.read_bytes()for p in(A/'source434/programs/mayhem').rglob('*')if p.is_file()}
print('origin changes', [n for n in origin if origin[n]!=q[n]])
print('cp changes', [n for n in cp if cp[n]!=q[n]])
combined=dict(origin);hunks={}
for name in q:
 if cp[name]==q[name]:continue
 if origin[name]==q[name]:combined[name]=cp[name];continue
 base=q[name].splitlines(True);a=origin[name].splitlines(True);b=cp[name].splitlines(True)
 edits=[]
 for label,variant in [('origin',a),('cp434',b)]:
  for op,i,j,x,y in difflib.SequenceMatcher(a=base,b=variant,autojunk=False).get_opcodes():
   if op!='equal':edits.append((i,j,variant[x:y],label))
 for idx,left in enumerate(edits):
  for right in edits[idx+1:]:
   if left[3]!=right[3] and (max(left[0],right[0])<min(left[1],right[1]) or left[0]==right[0]):raise RuntimeError(('overlap',name,left[:2],right[:2]))
 result=list(base)
 for i,j,repl,label in sorted(edits,key=lambda e:e[0],reverse=True):result[i:j]=repl
 combined[name]=b''.join(result);hunks[name]=[{"from":i+1,"through":j,"replacement_lines":len(repl),"owner":label}for i,j,repl,label in edits]
for label,data in [('base',origin),('composed',combined)]:
 out=D/label/'programs/mayhem';out.mkdir(parents=True,exist_ok=True)
 for n,b in data.items():p=out/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
 (D/(label+'-inputs.json')).write_text(json.dumps({n:sha(b)for n,b in data.items()},indent=2)+'\n')
(D/'composition.json').write_text(json.dumps({'source_origin_manifest':sha((R/'research/mayhem-source-origin-recovery-20261027/manifest.json').read_bytes()),'changes_from_origin':[n for n in origin if origin[n]!=combined[n]],'nonoverlapping_hunks':hunks},indent=2)+'\n')
print(D);print((D/'composition.json').read_text())
