from pathlib import Path
from collections import defaultdict
import gzip,json,re,shlex
W=Path(__file__).resolve().parent;P=W/'mayhem-qualified436-native';D=W/'mayhem-allocator-provider'
text=gzip.decompress((D/'upstream/builds/recovered/stderr.gz').read_bytes()).decode();up=[]
for line in text.splitlines():
 line=line.strip()
 if not(line.startswith('Running `') and line.endswith('`')):continue
 cmd=shlex.split(line[9:-1])
 if '--target' in cmd and '--crate-name' in cmd and any(a in cmd for a in ['--emit=dep-info,metadata,link','--emit=dep-info,link']):up.append(dict(command=cmd))
native=[json.loads(p.read_bytes()) for p in (P/'build-05-v2path/wrapper-records').glob('*.json')];native=[dict(command=r['after'],cwd=r['cwd']) for r in native if '--target' in r['after'] and '--crate-name' in r['after'] and any(a in r['after'] for a in ['--emit=dep-info,metadata,link','--emit=dep-info,link'])]
def describe(row):
 cmd=row['command'];name=cmd[cmd.index('--crate-name')+1];seed=next(x[9:] for x in cmd if x.startswith('metadata='));rs=next(x for x in cmd if x.endswith('.rs'));source=(row.get('cwd','')+'/'+rs).replace('\\','/');versions=re.findall('/'+re.escape(name.replace('_','-'))+r'-([0-9][^/]+)/',source);version=versions[-1] if versions else None;return name,version,seed
u=defaultdict(list);n=defaultdict(list)
for row in up:u[describe(row)[0]].append((describe(row),row))
for row in native:n[describe(row)[0]].append((describe(row),row))
rows=[]
for name,items in n.items():
 for descr,row in items:
  candidates=u[name]
  if len(candidates)>1:candidates=[x for x in candidates if x[0][1]==descr[1]]
  assert len(candidates)==1,(descr,candidates);other,uprow=candidates[0]
  rows.append(dict(crate=name,version=descr[1],native_seed=descr[2],upstream_seed=other[2],equal=descr[2]==other[2],upstream_command=uprow['command'],native_command=row['command']))
known={'anchor_lang','anchor_spl','curve_accounts','mayhem_recovered'}
result=dict(native_units=len(native),upstream_units=len(up),compared=len(rows),differences=[x for x in rows if not x['equal']],remaining_prior_dependency_differences=[x for x in rows if not x['equal'] and x['crate'] not in known],rows=sorted(rows,key=lambda x:(x['crate'],x['version'] or '')))
(D/'seed-comparison.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8');print('Units',len(native),len(up),'all seed differences',[(x['crate'],x['version'],x['native_seed'],x['upstream_seed']) for x in result['differences']]);print('Remaining dependency differences',len(result['remaining_prior_dependency_differences']))
