"""New explicit P27 context. Frozen P26 modules are authenticated, never imported."""
from pathlib import Path,PurePosixPath
import copy,gzip,hashlib,importlib.util,json,re,stat,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
BASE=Path('repro/layered-passes/pass-26/current-metadata')
OLD_GUARD=Path('repro/layered-passes/pass-26/current-guards')
GUARD='repro/layered-passes/pass-27/current-guards'
METADATA='repro/layered-passes/pass-27/current-metadata'
CONTROLLER='repro/donation-relay/linux15-v148-one-shot-controller'
BASE_SEAL='0ac073c2c17ca609e42a87a79fbfd71b72746de05b45ee3411217beca307c4b3'
OLD_GUARD_SEAL='13a80187425066a758f319219a4d6857d22e19812dd07cf05b46fddb02c8e4ab'
CONTROLLER_SEAL='627a70041f0e32600528b44a5c116a5ad8460f74bbbc8482809df1716f7b1086'
BASE_CAPSULE='77abefd0a1624d3bb2df53fb27f6879d7b85aa0568d72063b360c81526b5c00c'
H=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
J=lambda p:json.loads(Path(p).read_bytes())
def write(p,v):p=Path(p);p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,indent=2)+'\n')
def safe(root,name):
 root=Path(root);q=PurePosixPath(name);assert str(q)==name and not q.is_absolute()and'..'not in q.parts
 p=root/name
 for x in[p,*p.parents]:
  if x==root.parent:break
  assert not x.is_symlink(),name
 assert p.is_file(),name;return p

def file_digest(root,name,expected):
 p=safe(root,name);assert H(p)==expected,name;return p

def package(folder,seal):
 folder=Path(folder);assert H(folder/'manifest.json')==seal and(folder/'manifest.sha256').read_text().split()[0]==seal
 document=J(folder/'manifest.json');rows=document.get('files',document)
 actual={str(p.relative_to(folder))for p in folder.rglob('*')if p.is_file()and p not in[folder/'manifest.json',folder/'manifest.sha256']};assert actual==set(rows)
 for n,r in rows.items():
  p=file_digest(folder,n,r['sha256']if isinstance(r,dict)else r)
  if isinstance(r,dict)and'bytes'in r:assert p.stat().st_size==r['bytes']
 return rows

def proposal_integrity():return package(P,H(P/'manifest.json'))
def seal(folder):
 folder=Path(folder);files={str(p.relative_to(folder)):{'sha256':H(p),'bytes':p.stat().st_size}for p in sorted(folder.rglob('*'))if p.is_file()and p not in[folder/'manifest.json',folder/'manifest.sha256']};write(folder/'manifest.json',{'files':files});s=H(folder/'manifest.json');(folder/'manifest.sha256').write_text(s+'  manifest.json\n');return s

def accepted_template():
 T=copy.deepcopy(J(P/'seed/TRANSITION-CAPSULE.NOT_ACCEPTED.json'));assert T['root_accepted']is False;T['root_accepted']=True;return T

def project_bindings(F,T):
 assert T==accepted_template(),'Exactly the separately reviewed transition, no alternatives'
 F=copy.deepcopy(F);changes=T['asset_changes'];assert len(changes)==3 and len({x['path']for x in changes})==3
 for x in changes:assert F['assets'][x['path']]==x['before_sha256'];F['assets'][x['path']]=x['after_sha256']
 assert F==J(P/'seed/bindings.PROPOSED.json');return F

def project_catalogue(prior,guard_path,guard_seal):
 assert len(prior)==51 and guard_path==GUARD and re.fullmatch('[0-9a-f]{64}',guard_seal)
 rows=copy.deepcopy(prior);rows.append({'path':CONTROLLER,'manifest':'manifest.json','sha256':CONTROLLER_SEAL,'command':None,'runtime_args':[],'role':'Unexecuted reviewed Linux controller; integrity only'});rows.append({'path':GUARD,'manifest':'manifest.json','sha256':guard_seal,'command':None,'runtime_args':[],'role':'P27 current guard code; integrity only, no catalogue invocation'})
 assert len(rows)==53 and len({r['path']for r in rows})==53
 for r in rows:assert r.get('command')is None and r.get('runtime_args')==[]
 return rows

def attributes_projection(before,current,witness,T,controller_rows):
 assert T==accepted_template()and hashlib.sha256(before).hexdigest()==T['attributes']['before_sha256']
 assert current.startswith(before)and hashlib.sha256(current).hexdigest()==T['attributes']['after_sha256']
 assert witness==J(P/'seed/attributes12-witness.json')and witness['rules']==T['attributes']['new_rules']and len(witness['rules'])==12 and witness['old_prefix_bytes']==len(before)
 assert current[len(before):]==(''.join(w['literal_rule']+'\n'for w in witness['rules'])).encode();seen=set()
 for w in witness['rules']:
  assert re.fullmatch(r'repro/[^\s*?\[\]{}\\]+',w['path'])and w['path']not in seen;seen.add(w['path']);assert w['literal_rule']==w['path']+' -whitespace'
  assert w['owning_manifest_path']==CONTROLLER+'/manifest.json'and w['owning_manifest_sha256']==CONTROLLER_SEAL and CONTROLLER+'/'+w['member']==w['path']
  assert controller_rows[w['member']]['sha256']==w['sha256']and controller_rows[w['member']]['bytes']==w['bytes']
 return True

def source_names(crate,workspace,repository,extra_inputs=()):
 crate,workspace,repository=map(lambda p:Path(p).resolve(),(crate,workspace,repository));crate.relative_to(workspace);workspace.relative_to(repository)
 files={p for p in crate.rglob('*')if p.is_file()and not{'target','.git'}.intersection(p.relative_to(crate).parts)and(p.suffix=='.rs'or p.name in('Cargo.toml','Cargo.lock'))}
 for name in('Cargo.toml','Cargo.lock'):
  if(workspace/name).is_file():files.add(workspace/name)
 for directory in(crate,*crate.parents):
  files.update(p for p in(directory/'idls').glob('**/*.json')if p.is_file())
  if directory==workspace:break
 for start in(crate,repository):
  for directory in(start,*start.parents):
   for name in('.cargo/config','.cargo/config.toml','rust-toolchain','rust-toolchain.toml'):
    if(directory/name).is_file():files.add(directory/name)
   if directory==repository:break
 for extra in extra_inputs:
  p=Path(extra).resolve();p.relative_to(repository);assert p.exists()
  if p.is_file():files.add(p)
  else:files.update(f for f in p.rglob('*')if f.is_file()and not{'target','.git'}.intersection(f.relative_to(p).parts))
 return{str(p.relative_to(repository))for p in files}

class Context:
 def __init__(self,root,transition):
  proposal_integrity();self.root=Path(root).resolve();self.cache={};pins=J(P/'ROOT-PINS.json');assert pins['root_reviewed_final']is True,'Final root transition pins are absent'
  assert pins['base_metadata_seal']==BASE_SEAL and pins['base_guard_seal']==OLD_GUARD_SEAL and pins['controller_seal']==CONTROLLER_SEAL
  assert H(transition)==pins['transition_capsule_sha256'];self.T=J(transition);assert self.T==accepted_template()
  self.sealed(str(BASE),BASE_SEAL);self.sealed(str(OLD_GUARD),OLD_GUARD_SEAL)
  self.old=self.root/OLD_GUARD;self.base=self.root/BASE;self.R=J(self.old/'rules.json');self.B=J(self.old/'seed/P25-known-bindings.json');self.oldA=J(self.base/'accepted-AMM-capsule.json');assert H(self.base/'accepted-AMM-capsule.json')==BASE_CAPSULE
  self.F=project_bindings(J(self.base/'bindings.json'),self.T)
 def sealed(self,path,seal_value,manifest='manifest.json'):
  assert manifest=='manifest.json';key=(path,manifest,seal_value)
  if key not in self.cache:self.cache[key]=package(self.root/path,seal_value)
  return self.cache[key]
 def row(self,r):return self.sealed(r['path'],r['sha256'],r.get('manifest','manifest.json'))
 def history(self):
  # Literal historical invariants, not old current-entrypoint execution.
  for row in J(self.old/'seed/immutable-P25-guard-pins.json'):file_digest(self.root,row['path'],row['sha256'])
  d=J(self.old/'seed/P25-immutable-membership.json');expected={x['path']:x for x in d['files']};actual={str(p.relative_to(self.root))for p in(self.root/d['prefix']).rglob('*')if p.is_file()};assert actual==set(expected)and len(actual)==1159
  for n,row in expected.items():
   p=safe(self.root,n);data=p.read_bytes();assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==row['oid'];assert bool(p.stat().st_mode&stat.S_IXUSR)==(row['mode']=='100755')
  self.sealed(self.oldA['incoming_preservation_path'],self.R['pinned515_plan_seal']);file_digest(self.root,self.oldA['incoming_preservation_path']+'/opaque-archive-manifest.json',self.R['pinned515_archive_seal'])
  for row in J(self.old/'seed/passive-retention-exact343.json'):
   p=file_digest(self.root,row['path'],row['incoming']['sha256']);assert bool(p.stat().st_mode&stat.S_IXUSR)==(row['incoming']['mode']=='100755')
  for row in J(self.old/'seed/inactive-exact10.json'):assert not(self.root/row['path']).exists()and not(self.root/row['path']).is_symlink()
 def owner_witness(self,w):
  p=file_digest(self.root,w['path'],w['sha256']);owner=w['owning_manifest'];rows=self.row(owner);assert owner['path']+'/'+w['member']==w['path'];row=rows[w['member']];assert(row['sha256']if isinstance(row,dict)else row)==w['sha256'];return p
 def attributes(self):
  root=self.root;before=(self.old/'seed/P25-gitattributes.before').read_bytes();assert hashlib.sha256(before).hexdigest()==self.B['assets']['.gitattributes']=='586b55d3d226d22ec96f0f9f974cbe7ec39ed8e706a0bf7e07f1b8956e6b7005'
  legacy=(self.old/'seed/P25-attributes.legacy-before').read_bytes();assert before.startswith(legacy);observed={}
  for line in before[len(legacy):].decode().splitlines():
   if not line.strip()or line.startswith('#'):continue
   if line=='programs/donation-relay/src/dispatch.rs -whitespace':
    n='programs/donation-relay/src/dispatch.rs';h='e8f649f4468ea1f178af86739333bd28076fb42b756270c2e1f99f13826f42e7';assert self.B['relay']['source23']['src/dispatch.rs']==h;file_digest(root,n,h)
   else:
    match=re.fullmatch(r'(repro/[^\s*?\[\]{}\\]+) -whitespace',line);assert match;n=match[1];h=H(safe(root,n))
   assert n not in observed;observed[n]=h
  assert observed==self.B['attributes_appended_witness']
  for row in J(self.old/'seed/P25-attributes.initial12.json')+J(self.old/'seed/P25-attributes.postmerge3.json'):assert observed.get(row['path'])==row['sha256']
  p26=(P/'seed/P26-attributes.before').read_bytes();prior=self.oldA['attributes'];assert p26.startswith(before)and hashlib.sha256(p26).hexdigest()==prior['after_sha256']==self.T['attributes']['before_sha256'];assert prior['purpose']=='retained-evidence-whitespace'and prior['before_sha256']==hashlib.sha256(before).hexdigest()
  appended={}
  for line in p26[len(before):].decode().splitlines():
   match=re.fullmatch(r'(repro/[^\s*?\[\]{}\\]+) -whitespace',line);assert match;name=match[1];assert name not in appended and name not in observed;appended[name]=H(safe(root,name))
  assert len(prior['additions'])==len(appended)and{w['path']for w in prior['additions']}==set(appended)
  for w in prior['additions']:assert w['literal_rule']==w['path']+' -whitespace'and appended[w['path']]==w['sha256'];self.owner_witness(w)
  witness=J(P/'seed/attributes12-witness.json');assert H(P/'seed/attributes12-witness.json')==self.T['attributes']['witness_sha256'];assert witness['rules']==self.T['attributes']['new_rules']and witness['new_literal_paths']==12 and witness['old_prefix_bytes']==len(p26)
  current=safe(root,'.gitattributes').read_bytes();rows=self.sealed(CONTROLLER,CONTROLLER_SEAL);attributes_projection(p26,current,witness,self.T,rows);seen=set()
  for w in witness['rules']:
   assert re.fullmatch(r'repro/[^\s*?\[\]{}\\]+',w['path'])and w['path']not in seen;seen.add(w['path']);assert w['literal_rule']==w['path']+' -whitespace'
   assert w['owning_manifest_path']==CONTROLLER+'/manifest.json'and w['owning_manifest_sha256']==CONTROLLER_SEAL and CONTROLLER+'/'+w['member']==w['path'];assert rows[w['member']]['sha256']==w['sha256'];p=file_digest(root,w['path'],w['sha256']);assert p.stat().st_size==w['bytes']
 def current(self):
  F=self.F;root=self.root;self.history();self.attributes();self.sealed(CONTROLLER,CONTROLLER_SEAL)
  assert sorted(str(p.relative_to(root))for p in(root/'scripts').glob('*.py'))==F['script_set']and len(F['script_set'])==187
  assert sorted(str(p.relative_to(root))for p in(root/'.github/workflows').rglob('*')if p.is_file())==F['workflow_set']and len(F['workflow_set'])==6
  for n,h in F['assets'].items():file_digest(root,n,h)
  assert J(root/'repro/status.json')==F['status']and J(root/'repro/donation-relay/current.json')==F['relay']['current']
  # Names-only before any source-body hash; an unaccepted extra source cannot become current.
  for role,c in F['compiled'].items():
   l=self.R['source_layout'][role];assert source_names(root/l['crate'],root/l['workspace'],root,[root/n for n in l.get('extra_inputs',[])])==set(c['source'])
  C=root/'programs/donation-relay';assert source_names(C,C,root)=={'programs/donation-relay/'+n for n in F['relay']['source23']}
  scanner_file=file_digest(root,self.R['source_scanner'],self.R['source_scanner_sha256']);spec=importlib.util.spec_from_file_location('p27_known_pure_source_inventory',scanner_file);scanner=importlib.util.module_from_spec(spec);spec.loader.exec_module(scanner)
  total=0
  for role,c in F['compiled'].items():
   l=self.R['source_layout'][role];actual=scanner.source_manifest(root/l['crate'],root/l['workspace'],root,extra_inputs=[root/n for n in l.get('extra_inputs',[])]);assert actual==c['source']and len(actual)==self.R['counts'][role];total+=len(actual)
   file_digest(root,c['candidate'],c['candidate_sha256']);report=J(file_digest(root,c['report'],c['report_sha256']));assert report['source_sha256']==actual and report['comparison']['candidate_sha256']==c['candidate_sha256']
  assert total==107 and scanner.source_manifest(C,C,root)=={'programs/donation-relay/'+n:h for n,h in F['relay']['source23'].items()}
  file_digest(root,'programs/donation-relay/README.md',F['relay']['canonical_readme_sha256']);file_digest(root,'programs/donation-relay/source-selected.json',F['relay']['source_selected_sha256']);return F
 def catalogue(self):
  prior=J(self.base/'packets.json');assert P.is_relative_to(self.root)and str(P.relative_to(self.root))==GUARD,'Install reviewed code at exact P27 guard path'
  rows=project_catalogue(prior,str(P.relative_to(self.root)),H(P/'manifest.json'))
  for row in rows:self.row(row)
  return rows
 def unchanged(self,folder):
  for row in self.T['unchanged_metadata_payloads']:
   old=file_digest(self.base,row['path'],row['sha256']);new=file_digest(folder,row['path'],row['sha256']);assert old.stat().st_size==new.stat().st_size==row['bytes']
  q=json.loads(gzip.decompress((folder/'window-queue.json.gz').read_bytes()));assert q['total_window_records']==len(q['tasks'])==3338 and q['target_executions']==0 and q['completion_percentage']is None and q['index_sha256']==H(folder/'current-analysis-index.json')
  assert q['window_counts']=={'pump':1035,'pump_amm':785,'pump_fees':585,'mayhem':441,'donation_relay':492}
  for name in['before-corrections','after-corrections']:
   s=J(folder/name/'summary.json');assert len(s['programs'])==9 and len(s['raw_compiler_supplement'])==2 and s['ranges_sha256']==H(folder/name/'all-byte-ranges.json.gz')
  index=J(folder/'current-analysis-index.json');assert index==J(self.base/'current-analysis-index.json')
  for program,row in index['programs'].items():
   state=self.F['relay']['current']if program=='donation_relay'else self.F['status'][program];assert state['candidate_artifact']==row['candidate_path']and state['candidate_sha256']==row['candidate_sha256']
   for side in['original','candidate']:file_digest(self.root,row[side+'_path'],row[side+'_sha256'])
   for f in row['full_ledger_files']:assert file_digest(self.root,f['path'],f['sha256']).stat().st_size==f['bytes']
  return q

def metadata_result():return {'status':'METADATA_ONLY','catalogue_rows':53,'prior_rows_preserved':51,'queue_records':3338,'source107':107,'Relay23':23,'programs_per_raw_snapshot':9,'supplements_per_snapshot':2,'raw_snapshots':2,'controller_executed':False,'new_builds':0,'new_target_executions':0,'active_source_CI_Git_writes':False,'originating_runtime_byte_identity_asserted':False}

def metadata_context(root,folder,expected_seal=None):
 root=Path(root).resolve();folder=Path(folder).resolve();assert folder.is_relative_to(root);own=(folder/'manifest.sha256').read_text().split()[0]
 if expected_seal is not None:assert own==expected_seal
 rows=package(folder,own);required={r['path']for r in accepted_template()['unchanged_metadata_payloads']}|{'bindings.json','packets.json','transition-capsule.json','metadata-pins.json','builder-result.json'};assert set(rows)==required and len(required)==11;assert J(folder/'builder-result.json')==metadata_result();ctx=Context(root,folder/'transition-capsule.json');pins=J(folder/'metadata-pins.json');assert pins=={'transition_capsule_sha256':H(folder/'transition-capsule.json'),'guard_manifest_sha256':H(P/'manifest.json'),'base_metadata_seal':BASE_SEAL,'controller_seal':CONTROLLER_SEAL};return ctx
