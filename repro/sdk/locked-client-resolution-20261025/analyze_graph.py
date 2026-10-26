"""Pure locked-archive graph and executed-file binding checks; no JS/network/target."""
from pathlib import Path,PurePosixPath
import base64,hashlib,io,json,tarfile
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest()
def analyze():
 lock=J(P/'resolution/package-lock.json');manifest=J(P/'resolution/package.json');assert lock['lockfileVersion']==3 and lock['packages']['']['dependencies']==manifest['dependencies'];pins=lock['packages'];assert len(pins)==100
 receipts=J(P/'archive-receipts.json')['archives'];assert len(receipts)==91;metadata={};archive_files={};placements={}
 for r in receipts:
  raw=(P/r['file']).read_bytes();assert H(raw)==r['sha256']and len(raw)==r['bytes'];alg,digest=r['integrity'].split('-',1);assert base64.b64encode(hashlib.new(alg,raw).digest()).decode()==digest
  t=tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz');members=t.getmembers();roots={PurePosixPath(m.name).parts[0]for m in members};assert len(roots)==1;files={};names=set()
  for m in members:
   n=PurePosixPath(m.name);assert not n.is_absolute()and'..'not in n.parts and m.name not in names;names.add(m.name)
   if m.isdir():continue
   assert m.isfile();files[str(PurePosixPath(*n.parts[1:]))]=t.extractfile(m).read()
  md=json.loads(files['package.json']);prefix=next(iter(roots));assert prefix in ['package',md['name'].split('/')[-1]]or(prefix=='node v12.20'and md['name']=='@types/node'and md['version']=='12.20.55'and r['sha256']=='e29266aed51ed53bf01570a1bd8d0f0c435c83b44cbd10b7ef785d3bd8d3bdf1')
  for n in r['lock_paths']:
   assert n not in metadata;pin=pins[n];assert pin['version']==md['version']and pin['integrity']==r['integrity']and pin['resolved']==r['url'];assert n.endswith('node_modules/'+md['name']);metadata[n]=md;placements[n]={'name':md['name'],'version':md['version'],'archive_sha256':r['sha256'],'archive_root':prefix,'files':len(files),'scripts':{k:v for k,v in md.get('scripts',{}).items()if k in ['preinstall','install','postinstall']}}
   for name,b in files.items():archive_files[str(PurePosixPath(n)/name)]=H(b)
 assert set(metadata)==set(pins)-{''}and archive_files==J(P/'all-module-files.json')and len(archive_files)==4747
 def resolve(owner,name):
  p=PurePosixPath(owner)
  for ancestor in [p,*p.parents]:
   n=str(ancestor/'node_modules'/name)
   if n.startswith('./'):n=n[2:]
   if n in metadata:return n
  return None
 edges=[]
 for owner,md in [('',manifest),*metadata.items()]:
  for group in ['dependencies','optionalDependencies','peerDependencies']:
   for name,required in md.get(group,{}).items():
    target=resolve(owner,name);edges.append({'owner':owner,'role':group,'name':name,'declared_range':required,'resolved_path':target,'resolved_version':metadata[target]['version']if target else None,'optional_peer':bool(md.get('peerDependenciesMeta',{}).get(name,{}).get('optional'))})
 loaded=J(P/'resolver-result.json');assert loaded['networkAttempts']==loaded['rpcAttempts']==[]and loaded['transactionsSigned']==loaded['transactionsSubmitted']==0
 for x in loaded['loadedModules']:assert archive_files[x['relative']]==x['sha256']
 assert len(loaded['loadedModules'])==152
 split={n:v for n,v in placements.items()if v['name']=='@solana/web3.js'};assert len(split)==3 and sorted(v['version']for v in split.values())==['1.98.0','1.99.0','1.99.0']
 return {'scope':'New private reproducible npm graph + offline Anchor named resolver only; not historical SDK/deployment graph or target compatibility','packages':placements,'edges':edges,'counts':{'lock_nodes':99,'unique_archives':91,'regular_files':4747,'loaded_commonjs_modules':152,'dependency_edges':len(edges),'unresolved_edges':sum(x['resolved_path']is None for x in edges)},'web3_split':split,'install_script_nodes':[n for n,x in placements.items()if x['scripts']],'lifecycle_scripts_executed':0,'target_program_executions':0,'original_deployment_dependencies_closed':False,'SDK_wrappers_remaining_and_fee_state_compatibility_closed':False,'native_addon_loader_identity_closed':False}
if __name__=='__main__':
 d=analyze();(P/'graph.json').write_text(json.dumps(d,indent=2)+'\n');print(d['counts']);print('unresolvededges',[x for x in d['edges']if x['resolved_path']is None])
