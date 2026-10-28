"""Bind upstream whole-section selectors to exact observed archive member suffixes."""
from pathlib import Path
import hashlib,json,re,subprocess
W=Path(__file__).resolve().parent;P=W/'mayhem-qualified436-native';B=P/'build-01';A=P/'link-order-port';A.mkdir(exist_ok=False)
sha=lambda b:hashlib.sha256(b).hexdigest()
tool=W/'mayhem-native-build/sdk/llvm/bin/llvm-ar.exe';launch=json.loads((B/'launch.json').read_bytes());assert launch['checked_executables'][str(tool)]==sha(tool.read_bytes())
inv=json.loads((B/'link/invocation.json').read_bytes());archives=[Path(x['path']) for x in inv['inputs'] if x['path'].endswith('.rlib')];assert len({p.name for p in archives})==len(archives)
tables=[];index={}
for archive in archives:
    r=subprocess.run([str(tool),'t',str(archive)],capture_output=True,check=True);members=r.stdout.decode('utf-8').splitlines();assert members
    tables.append(dict(path=str(archive),sha256=sha(archive.read_bytes()),members=members))
    for name in members:
        if '.' in name and name.endswith('.rcgu.o'):index.setdefault(name.split('.',1)[1],[]).append((archive.name,name))
original=(P/'upstream/builds/first/ordered.ld').read_bytes();lines=original.decode().splitlines(True);changes=[];unresolved=[]
for i,line in enumerate(lines):
    m=re.search(r'\*(lib[^:()]+\.rlib):([^()]+)\(',line)
    if not m:continue
    suffix=m[2].split('.',1)[1];matches=index.get(suffix,[])
    if len(matches)!=1:unresolved.append(dict(line=i+1,archive=m[1],member=m[2],matches=matches));continue
    archive,member=matches[0];before=m[0][:-1];after='*'+archive+':'+member
    assert line.count(before)==1
    if before!=after:lines[i]=line.replace(before,after,1);changes.append(dict(line=i+1,before=before,after=after,unchanged_object_identity=suffix))
receipt=dict(upstream_revision='18131c169d26d10fb0899bf42d981da2cb47aa45',upstream_script_sha256=sha(original),llvm_ar_sha256=sha(tool.read_bytes()),archive_tables=tables,changes=changes,unresolved=unresolved,scope='Whole input filename/archivemember bindings from actual native linked archives. Object module hash suffix and complete section selector stay unchanged; no byte matching or normalization used to choose order.')
(A/'bindings.json').write_text(json.dumps(receipt,indent=2)+'\n',encoding='utf-8')
assert not unresolved,[(r['line'],r['member']) for r in unresolved]
out=''.join(lines).encode();(A/'ordered-native.ld').write_bytes(out);print('Ported',len(changes),'filename selectors;',len(tables),'actual archive tables; unchanged section order and selector strings')
