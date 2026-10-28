from pathlib import Path
import difflib,gzip,hashlib,io,json,tarfile,subprocess
W=Path(__file__).resolve().parent;D=W/'mayhem-v2-phases';P=D/'publication';P.mkdir(exist_ok=False);A=W/'mayhem-amm-lifetimes';REF=W/'mayhem-current437-native/publication/reference'
labels=['01-current439','02-r-on439','03-sell-phased','04-shared-scalars','05-tuple-quote-last','06-named-price','07-native-first','08-tuple-repeat']
def put(n,b):
 p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
def cp(p,n):put(n,p.read_bytes())
def gz(p,n):put(n,gzip.compress(p.read_bytes(),mtime=0))
def save(n,x):put(n,(json.dumps(x,indent=2)+'\n').encode())
def tar(files):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w') as t:
  for n,data in sorted(files.items()):
   m=tarfile.TarInfo(n);m.size=len(data);m.mode=0o644;t.addfile(m,io.BytesIO(data))
 return gzip.compress(b.getvalue(),mtime=0)
sha=lambda b:hashlib.sha256(b).hexdigest()
for p in (D/'controller-05-tuple-quote-last').rglob('*'):
 if p.is_file():cp(p,'controller/'+p.relative_to(D/'controller-05-tuple-quote-last').as_posix())
origins={
 'reference/reader.py':'research/mayhem-current-macro-call-closure-20261027/reader.py',
 'reference/closure.py':'research/mayhem-current-macro-call-closure-20261027/verify.py',
 'reference/parent_verify.py':'research/mayhem-current436-native-20261028/verify.py',
 'reference/seed_verify.py':'research/mayhem-current436-native-seed-20261028/verify.py',
 'reference/event_order.py':'research/mayhem-current436-amm-event-controls-20261027/event_order.py',
 'reference/cfg.py':'research/mayhem-current437-buy-prefix-20261028/helpers/cfg.py',
 'reference/analysis.py':'research/mayhem-current437-buy-prefix-20261028/helpers/analysis.py',
 'reference/inventory.json':'research/mayhem-current438-composition-20261028/inventory.json',
 'reference/parent438-source.tar.gz':'research/mayhem-current438-composition-20261028/source.tar.gz',
 'reference/r-source.tar.gz':'research/mayhem-current436-v2-controls-20261027/r/source.tar.gz',
 'reference/r-source-inputs.json':'research/mayhem-current436-v2-controls-20261027/r/source-inputs.json',
 'reference/current439-source-inputs.json':'research/claude-mayhem-439-20261028/sources/source-inputs.json',
 'reference/current439-buy.rs':'research/claude-mayhem-439-20261028/sources/shipped/instructions/buy_pump_swap.rs',
 'reference/current439-amm.rs':'research/claude-mayhem-439-20261028/sources/shipped/instructions/pump_amm_interface.rs',
 'reference/current439-symbols.so.gz':'research/claude-mayhem-439-20261028/builds/symbols.so.gz',
 'reference/current439-candidate.so.gz':'research/claude-mayhem-439-20261028/builds/candidate.so.gz'}
for n in ['build.py','wrapper.rs','metadata-map.tsv','path-map.tsv','linker.rs','ordered-native.ld','default.ld','sdk-components.json.gz','target-components.json','vendor-inputs.json','host-tools.json','historical-macro.json']:origins['controller/'+n]='research/mayhem-current437-native-20261028/controller/'+n
rev='e91c97097f334683d3f905ff0b0eb91612b4f51e';bound=[]
for local,remote in origins.items():
 data=subprocess.run(['git','cat-file','blob',rev+':'+remote],cwd=W/'pumpfun-source',capture_output=True,check=True).stdout;oid=subprocess.run(['git','rev-parse',rev+':'+remote],cwd=W/'pumpfun-source',capture_output=True,check=True,text=True).stdout.strip();assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==oid
 if local.startswith('controller/'):assert (P/local).read_bytes()==data
 else:put(local,data)
 bound.append(dict(local=local,path=remote,bytes=len(data),sha256=sha(data),git_blob=oid))
save('provenance/bindings.json',dict(revision=rev,files=bound));cp(REF/'original-allocation.so.gz','reference/original-allocation.so.gz')
cases={}
for label in labels:
 B=D/('build-'+label);out='builds/'+label
 source={p.relative_to(B/'source/programs/mayhem').as_posix():p.read_bytes() for p in (B/'source/programs/mayhem').rglob('*') if p.is_file()};assert len(source)==67
 archive=tar(source);put(out+'/source.tar.gz',archive)
 for n in ['launch.json','result.json','wrapper-compile-result.json','linker-compile-result.json']:cp(B/n,out+'/'+n)
 for n in ['symbols.so','candidate-v154-strip.so','stderr.log','stdout.log']:gz(B/n,out+'/'+n+'.gz')
 put(out+'/wrapper-records.tar.gz',tar({p.name:p.read_bytes() for p in (B/'wrapper-records').glob('*.json')}))
 for p in (B/'link').iterdir():
  if p.is_file():gz(p,out+'/link/'+p.name+'.gz')
 inv=json.loads((B/'link/invocation.json').read_text());inputs=[]
 for r in inv['inputs']:
  data=(B/'link'/r['retained'] if r['retained'] else Path(r['path'])).read_bytes();inputs.append(dict(**r,bytes=len(data),sha256=sha(data),scope='Post-build content acquisition; ephemeral copies were captured by the linker wrapper.'))
 save(out+'/link/input-identities.json',inputs)
 cases[label]=dict(source_archive_sha256=sha(archive),outputs=json.loads((B/'result.json').read_text())['outputs'])
 if label!='01-current439':
  baseline='02-r-on439' if label not in ['02-r-on439'] else '01-current439';old=D/('build-'+baseline)/'source/programs/mayhem';delta=''.join(''.join(difflib.unified_diff((old/n).read_bytes().decode().splitlines(True),b.decode().splitlines(True),fromfile=baseline+'/'+n,tofile=label+'/'+n)) for n,b in sorted(source.items()) if (old/n).read_bytes()!=b);put(out+'/source.patch',delta.encode())
save('cases.json',cases)
for n in ['source_controls.py','build_control.py','audit.py']:cp(D/n,'provenance/local-'+n)
for n in ['02-r-on439','03-sell-phased','04-shared-scalars','05-tuple-quote-last','06-named-price','07-native-first']:cp(D/(n+'-hypothesis.json'),'provenance/'+n+'-hypothesis.json')
cp(D/'source-controls-07.log','provenance/preparation-failure.log');cp(W/'prepare_v2_phases.py','provenance/acquire.py');cp(Path(__file__),'provenance/package.py');put('.gitattributes',b'* -text\n')
print('Packaged',len(cases),'builds;',sum(p.is_file() for p in P.rglob('*')),'files;',sum(p.stat().st_size for p in P.rglob('*') if p.is_file()),'bytes')
