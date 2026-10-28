"""Run immutable upstream layout tools with local reader/inventory bindings."""
from pathlib import Path
import gzip,hashlib,json,re,shutil,subprocess,sys
D=Path(__file__).resolve().parent;W=D.parent;R=W/'pumpfun-source'
rev='dc8f791d32ae7fd6d9660cd1bf003fb02737f78f'
rows=[]
for name in ['elfcmp.py','datamap.py','gen_ordered.py']:
    path='research/claude-mayhem-441-20261028/layout/tools/'+name
    b=subprocess.check_output(['git','show',rev+':'+path],cwd=R)
    p=D/'layout/tools'/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
    rows.append(dict(revision=rev,path=path,bytes=len(b),sha256=hashlib.sha256(b).hexdigest(),git_blob=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()))
I=D/'layout/inputs';(I/'inputs').mkdir(parents=True,exist_ok=True)
for src,dst in [(W/'mayhem-current441-native/publication/reference/reader.py',I/'reader.py'),(W/'mayhem-current-trade-control/original.so',I/'deployed.so')]:
    shutil.copyfile(src,dst);b=dst.read_bytes();rows.append(dict(local_path=str(src),destination=str(dst.relative_to(D)),bytes=len(b),sha256=hashlib.sha256(b).hexdigest()))
inv=json.loads((W/'mayhem-amm-lifetimes/current438/inventory.json').read_text())
adapted=[dict(r,end=r['start']+r['bytes']) for r in inv]
(I/'inputs/parent-audit.json.gz').write_bytes(gzip.compress(json.dumps(dict(rows=adapted)).encode(),mtime=0))
(D/'layout-acquisition.json').write_text(json.dumps(dict(inputs=rows,inventory_adapter='Each inventory row gains end = start + bytes; rows otherwise unchanged.'),indent=2)+'\n')
B=D/'layout-build-01';B.mkdir(exist_ok=True)
shutil.copyfile(D/'build-01-anchor-module-order/symbols.so',B/'symbols.so')
shutil.copyfile(D/'build-01-anchor-module-order/link/link.map',B/'link.map')
base=(W/'mayhem-current441-native/ordered-native.ld').read_text()
for name in ['.rodata','.data.rel.ro']:
    base,n=re.subn(r'(?ms)^  '+re.escape(name)+r' : \{\n.*?^  \} :rodata',f'  {name} : {{ *({name}*) }} :rodata',base)
    assert n==1,(name,n)
(B/'ordered.ld').write_bytes(base.encode())
sys.path.insert(0,str(D/'layout/tools'))
import elfcmp,datamap,gen_ordered
o=elfcmp.m.Elf((I/'deployed.so').resolve());c=elfcmp.m.Elf((B/'symbols.so').resolve());corr=elfcmp.Corr(o,c)
assert len(corr.o2c)==441 and len(corr.c2o)==441
rep=datamap.analyze(B);(D/'01-data-binding.json').write_text(json.dumps(rep,indent=2)+'\n')
order,rest,notes=gen_ordered.generate(B)
assert len(order)==441 and not rest and not notes,(len(order),len(rest),notes)
gen_ordered.write(B,D/'ordered-module.ld',order,rest,gen_ordered.data_entries(B))
# Upstream writer uses text mode; canonicalize only the script's line endings.
p=D/'ordered-module.ld';p.write_bytes(p.read_text().encode())
print({k:{x:len(v[x]) if x in ['unbound','merged','gaps'] else v[x] for x in ['bound','unbound','merged','covered_bytes','orig_bytes','gaps','out_of_order']} for k,v in rep.items() if k!='problems'})
print('problems',rep['problems'],'script',hashlib.sha256(p.read_bytes()).hexdigest())
