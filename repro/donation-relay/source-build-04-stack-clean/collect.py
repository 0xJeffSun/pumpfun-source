from pathlib import Path
import gzip,hashlib,io,json,re,shutil,tarfile
P=Path(__file__).resolve().parent;R=P.parents[1];B=R/'work/relay-source-build-04';L=R/'work/relay-source-build-04-launcher'
H=lambda b:hashlib.sha256(b).hexdigest()
def J(n,v):q=P/n;q.parent.mkdir(parents=True,exist_ok=True);q.write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
def copy(src,dest):q=P/dest;q.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,q)
def arc(src,name):
 with (P/name).open('wb') as f:
  with gzip.GzipFile(fileobj=f,mode='wb',mtime=0,filename='') as g:
   with tarfile.open(fileobj=g,mode='w') as t:
    for p in sorted(src.rglob('*')):
     if p.is_file():
      assert not p.is_symlink();b=p.read_bytes();i=tarfile.TarInfo(p.relative_to(src).as_posix());i.size=len(b);i.mode=0o644;i.mtime=0;t.addfile(i,io.BytesIO(b))
assert (B/'build-result.json').is_file(),'Wait until authorized build exits; never retries'
for name in ['build-launch.json','build-result.json','build.stdout','build.stderr','tool-phase-before.json','tool-phase-after.json','dependency-source-after.json','retained-artifacts.json']:
 if (B/name).exists():copy(B/name,'attempt/'+name)
for name in ['failure.txt']:
 if (B/name).exists():copy(B/name,'attempt/'+name)
for name in ['manifest.json','relay_build_once.py','resolved-source-sha256.json','build04-source-adaptation.json','tool-witness/tool-files.json','tool-witness/sdk-files.json']:
 copy(L/name,'launcher/'+name)
for suffix in ['json','stdout','stderr']:copy(R/('work/relay-source-build-04-launch.'+suffix),'attempt/relay-source-build-04-launch.'+suffix)
for p in sorted((B/'source').rglob('*')):
 if p.is_file():copy(p,'source/'+p.relative_to(B/'source').as_posix())
for n in ['candidate.so','unstripped.so']:
 if (B/'retained'/n).exists():copy(B/'retained'/n,n)
expected=json.loads((L/'tool-witness/sdk-files.json').read_text());actual={}
for n in expected:
 p=B/'sdk'/n;actual[n]=dict(sha256=H(p.read_bytes()),mode=p.stat().st_mode&0o777,size=p.stat().st_size)
assert expected==actual;J('SDK-source-after.json',actual)
allerrors=[];by={}
for no,line in enumerate((B/'build.stderr').read_text().splitlines(),1):
 if line.startswith('Error:'):
  m=re.search(r'(?:Function |method )(\S+)',line);symbol=m.group(1) if m else None
  row=dict(line=no,text=line,symbol=symbol);allerrors.append(row);by.setdefault(symbol,[]).append(row)
rows=[]
for sym,lines in by.items():
 row=dict(symbol=sym,diagnostics=len(lines));st=next((x for x in lines if 'Stack offset' in x['text']),None)
 if st:
  m=re.search(r'Stack offset of (\d+) exceeded max offset of (\d+) by (\d+) bytes.*?frame size: (\d+) bytes',st['text']);row.update(stack_diagnostic=st,stack_offset=int(m[1]),limit=int(m[2]),excess=int(m[3]),estimated_frame=int(m[4]))
 rows.append(row)
J('stack-diagnostics.json',dict(all=allerrors,by_function=rows,total=len(allerrors),backend_exitcode_is_not_clean_build=bool(allerrors)))
arc(R/'work/relay-source-build-03-handoff','prior/build03.tar.gz')
arc(R/'work/relay-settlement-borrow-source-proposal','prior/source-repair.tar.gz')
print(json.dumps({'command_returncode':json.loads((B/'build-result.json').read_text())['returncode'],'backend_errors':len(allerrors),'affected_symbols':len(rows),'candidate_retained':(P/'candidate.so').exists()}))
