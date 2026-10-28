"""Use the four recorded current upstream metadata seeds and its section order."""
from pathlib import Path
import hashlib,json,re,shutil
W=Path(__file__).resolve().parent;P=W/'mayhem-qualified436-native';C=P/'controller';D=P/'controller-current';shutil.copytree(C,D)
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):return json.loads(p.read_bytes())
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
records=[read(p) for p in (P/'build-01/wrapper-records').glob('*.json')];records=[r for r in records if '--target' in r['after'] and any(a in r['after'] for a in ('--emit=dep-info,link','--emit=dep-info,metadata,link'))]
upstream=read(P/'upstream/current-unit-builds.json');names={'anchor_lang','anchor_spl','curve_accounts','mayhem_recovered'};assert {r['crate'] for r in upstream}==names
maps=[line.split('\t') for line in (D/'metadata-map.tsv').read_text().splitlines()];changes=[]
for u in upstream:
    name=u['crate'];native=[r for r in records if r['before'][r['before'].index('--crate-name')+1]==name];assert len(native)==1;old=[a[9:] for a in native[0]['before'] if a.startswith('metadata=')];new=[a[9:] for a in u['command'] if a.startswith('metadata=')];assert len(old)==len(new)==1
    indices=[i for i,row in enumerate(maps) if row[2]==name];assert len(indices)==1;i=indices[0];changes.append(dict(crate=name,previous=maps[i],current=[old[0],new[0],name],upstream_command=u['command']));maps[i]=[old[0],new[0],name]
newmap=''.join('\t'.join(row)+'\n' for row in maps).encode();oldhash=sha((D/'metadata-map.tsv').read_bytes());(D/'metadata-map.tsv').write_bytes(newmap)
builder=(D/'build.py').read_text(encoding='utf-8');assert builder.count(oldhash)==1;(D/'build.py').write_text(builder.replace(oldhash,sha(newmap)),encoding='utf-8',newline='\n')
wrapper=(D/'wrapper.rs').read_text(encoding='utf-8');begin=wrapper.index('        // The current Cargo.toml');end=wrapper.index('        assert_eq!(matched.len()',begin);wrapper=wrapper[:begin]+wrapper[end:];wrapper=wrapper.replace('let mut matched: Vec<Vec<&str>>','let matched: Vec<Vec<&str>>');(D/'wrapper.rs').write_text(wrapper,encoding='utf-8',newline='\n')
bindings=read(P/'link-order-port/bindings.json');actual={}
for crate in names-{'mayhem_recovered'}:
    rows=[x for x in bindings['archive_tables'] if Path(x['path']).name.startswith('lib'+crate+'-')];assert len(rows)==1;actual[crate]=Path(rows[0]['path']).name
original=(P/'upstream/builds/first/ordered.ld').read_bytes();lines=original.decode().splitlines(True);ports=[]
for x in bindings['changes']:
    i=x['line']-1;assert lines[i].count(x['before'])==1;lines[i]=lines[i].replace(x['before'],x['after'],1);ports.append(dict(x,method='Observed exact object-identity suffix in first native archive'))
for x in bindings['unresolved']:
    i=x['line']-1;crate=x['member'].split('.',1)[1].split('.',1)[0];assert crate in actual
    archive=actual[crate];member=archive.removeprefix('lib').removesuffix('.rlib')+'.'+x['member'].split('.',1)[1];old='*'+x['archive']+':'+x['member'];new='*'+archive+':'+member;assert lines[i].count(old)==1;lines[i]=lines[i].replace(old,new,1);ports.append(dict(line=i+1,before=old,after=new,method='Current recorded metadata seed; native Cargo filename from first build; verify member identity after second fresh build'))
newscript=''.join(lines).encode();(D/'ordered-native.ld').write_bytes(newscript)
def selectors(b):return [x.split('("',1)[1] for x in b.decode().splitlines() if '("' in x]
assert selectors(newscript)==selectors(original)
save(P/'current-recipe-binding.json',dict(metadata_changes=changes,source_unchanged=True,upstream_script_sha256=sha(original),native_script_sha256=sha(newscript),selectors_unchanged=True,filename_bindings=ports,scope='Four current upstream seeds replace the old native seeds. All upstream section strings and their order are exact. Native filename adaptation uses compiler/archive identities, not target byte matching. Post-build member checks remain required.'))
print('Prepared four exact current upstream metadata seeds and',len(ports),'filename bindings; unchanged section selectors')
