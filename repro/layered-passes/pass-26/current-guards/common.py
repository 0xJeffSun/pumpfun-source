"""P26 proposed metadata helpers. No code from a sealed evidence packet is executed here."""
from pathlib import Path,PurePosixPath
import hashlib,json,gzip,stat,importlib.util,subprocess,sys,tempfile,os,copy,re
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def write(p,d):p.write_text(json.dumps(d,indent=2)+'\n')
def safe(root,name):
 q=PurePosixPath(name);assert str(q)==name and not q.is_absolute() and '..' not in q.parts
 p=root/name
 for x in [p,*p.parents]:
  if x==root.parent:break
  assert not x.is_symlink(),name
 assert p.is_file(),name
 return p
def digest(root,name,expected):
 p=safe(root,name);assert H(p)==expected,name;return p
def sealed(root,row,strict=True):
 folder=root/row['path'];mf=row.get('manifest','manifest.json');m=digest(folder,mf,row['sha256']);payload=J(m).get('files',J(m))
 for n,r in payload.items():
  p=digest(folder,n,r['sha256'] if isinstance(r,dict) else r)
  if isinstance(r,dict) and 'bytes'in r:assert p.stat().st_size==r['bytes']
 if strict:
  excluded={mf,mf.replace('.json','.sha256')}
  actual={str(p.relative_to(folder)) for p in folder.rglob('*') if p.is_file() and str(p.relative_to(folder)) not in excluded}
  assert actual==set(payload),(row['path'],'full membership')
 return payload
def proposal_integrity():
 m=J(P/'manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 assert set(m['files'])=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
 for n,r in m['files'].items():
  f=digest(P,n,r['sha256']);assert f.stat().st_size==r['bytes']
def verify_p25_history(root):
 for r in J(P/'seed/immutable-P25-guard-pins.json'):
  digest(root,r['path'],r['sha256']) # Old current assertions remain byte-identical, never reinterpreted/executed.
 d=J(P/'seed/P25-immutable-membership.json');expected={r['path']:r for r in d['files']}
 actual={str(p.relative_to(root)) for p in(root/d['prefix']).rglob('*') if p.is_file()}
 assert actual==set(expected),'P25 historical selection records/guards/witness membership changed'
 for n,r in expected.items():
  p=safe(root,n);b=p.read_bytes();oid=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest();assert oid==r['oid'],n
  assert bool(p.stat().st_mode&stat.S_IXUSR)==(r['mode']=='100755'),n
def check_attributes(root,A):
 B=J(P/'seed/P25-known-bindings.json');before=(P/'seed/P25-gitattributes.before').read_bytes()
 assert hashlib.sha256(before).hexdigest()==B['assets']['.gitattributes']=='586b55d3d226d22ec96f0f9f974cbe7ec39ed8e706a0bf7e07f1b8956e6b7005'
 # Preserve the old P25 regexp/witness invariant, including ONLY its preexisting pinned dispatch exception.
 legacy=(P/'seed/P25-attributes.legacy-before').read_bytes();assert before.startswith(legacy);observed={}
 for line in before[len(legacy):].decode().splitlines():
  if not line.strip()or line.startswith('#'):continue
  if line=='programs/donation-relay/src/dispatch.rs -whitespace':
   n='programs/donation-relay/src/dispatch.rs';h='e8f649f4468ea1f178af86739333bd28076fb42b756270c2e1f99f13826f42e7';assert B['relay']['source23']['src/dispatch.rs']==h;digest(root,n,h)
  else:
   m=re.fullmatch(r'(repro/[^\s*?\[\]{}\\]+) -whitespace',line);assert m,line;n=m[1];h=H(safe(root,n))
  assert n not in observed;observed[n]=h
 assert observed==B['attributes_appended_witness']
 for row in J(P/'seed/P25-attributes.initial12.json')+J(P/'seed/P25-attributes.postmerge3.json'):assert observed.get(row['path'])==row['sha256']
 # New additions never inherit that old active-source exception.
 t=A['attributes'];assert t['purpose']=='retained-evidence-whitespace'and t['before_sha256']==B['assets']['.gitattributes']
 current=safe(root,'.gitattributes').read_bytes();assert current.startswith(before)and hashlib.sha256(current).hexdigest()==t['after_sha256']
 lines=current[len(before):].decode().splitlines();new={}
 for line in lines:
  m=re.fullmatch(r'(repro/[^\s*?\[\]{}\\]+) -whitespace',line);assert m,('Only literal repro/path -whitespace additions',line)
  n=m[1];assert n not in new and n not in observed;new[n]=H(safe(root,n))
 assert len(t['additions'])==len(new)and {w['path']for w in t['additions']}==set(new)
 owner_cache={} # Exact owner manifests checked once per invocation; every witness still checked below.
 for witness in t['additions']:
  n=witness['path'];assert witness['literal_rule']==n+' -whitespace' and new[n]==witness['sha256']
  owner=witness['owning_manifest'];key=(owner['path'],owner.get('manifest','manifest.json'),owner['sha256'])
  if key not in owner_cache:owner_cache[key]=sealed(root,owner)
  members=owner_cache[key];assert owner['path']+'/'+witness['member']==n
  r=members[witness['member']];h=r['sha256']if isinstance(r,dict)else r;assert h==witness['sha256']
 replacements={r['path']:r for r in A['final_asset_replacements']}
 if current!=before:
  assert replacements['.gitattributes']['purpose']=='retained-evidence-whitespace'and replacements['.gitattributes']['after_sha256']==t['after_sha256']
 else:assert '.gitattributes'not in replacements

def rendered_workflow(A):
 R=J(P/'rules.json');B=J(P/'seed/P25-known-bindings.json');before=(P/'seed/P25-verify.before.yml').read_text();assert hashlib.sha256(before.encode()).hexdigest()==B['assets']['.github/workflows/verify.yml']
 public=A['public']['path'];assert re.fullmatch(r'repro/[A-Za-z0-9._/-]+',public)and A['compiled_amm']['candidate']==public+'/main/candidate.so'
 guard=R['guard_install_path'];metadata=R['metadata_install_path'];base='python -B '+guard+'/';tail=' --repo . --metadata '+metadata
 replacements=[('repro/pump_amm/init-logical-module-main-v144/main/candidate.so',public+'/main/candidate.so',25),('python repro/pump_amm/init-logical-module-main-v144/verify.py --current-main .','python '+public+'/verify_public.py --current-main .',1),('python -B repro/layered-passes/pass-25/current-applicability/verify.py --repo .',base+'verify_current.py'+tail,1),('python -B repro/layered-passes/pass-25/current-reconciliation/verify.py --repo .',base+'verify_metadata.py'+tail,1),('python -B repro/layered-passes/pass-25/verify_pass.py --repo . --relay-python python --runtime-signatures',base+'verify_portable_crypto.py'+tail+' --python312 python',1)]
 after=before
 for old,new,count in replacements:assert after.count(old)==count,(old,count);after=after.replace(old,new)
 return after,replacements

def check_workflow(root,A):
 text,replacements=rendered_workflow(A);h=hashlib.sha256(text.encode()).hexdigest();t=A['ci_transition'];assert t['before_sha256']==J(P/'seed/P25-known-bindings.json')['assets']['.github/workflows/verify.yml']and t['after_sha256']==h
 assert t['replacement_counts']==[25,1,1,1,1]and safe(root,'.github/workflows/verify.yml').read_text()==text
 rows=[r for r in A['final_asset_replacements']if r['path']=='.github/workflows/verify.yml'];assert len(rows)==1 and rows[0]['purpose']=='P26 exact current-guard endpoint'and rows[0]['after_sha256']==h
 # Exact byte reconstruction preserves every other Pump/Mayhem/Relay/current gate and execution stop.

def check_docs(root,A):
 required=J(P/'seed/active-docs-before-after.json');row=A['documentation_proposal'];assert row['sha256']==required['proposal_seal'];sealed(root,row)
 assert J(root/row['path']/'proposal.json')==J(P/'seed/root-documentation-proposal.json')
 replacements={r['path']:r for r in A['final_asset_replacements']}
 for n,r in required['records'].items():
  actual=replacements[n];assert actual['purpose']=='active current-state documentation'and actual['before_sha256']==r['before_sha256']and actual['after_sha256']==r['after_sha256'];digest(root,n,r['after_sha256'])

def validate_acceptance(root,capsule,expected_sha,selection_seal,public_seal):
 assert H(capsule)==expected_sha and all(len(s)==64 for s in [expected_sha,selection_seal,public_seal])
 pins=J(P/'ROOT-PINS.json');assert pins['root_reviewed_final']is True,'Root final external AMM pins are absent'
 assert (expected_sha,selection_seal,public_seal)==(pins['acceptance_capsule_sha256'],pins['accepted_selection_seal'],pins['accepted_public_seal'])
 A=J(capsule);R=J(P/'rules.json');B=J(P/'seed/P25-known-bindings.json')
 assert A['schema']==1 and A['root_accepted'] is True and len(A['accepted_selection_commit'])==40
 assert A['selection']['sha256']==selection_seal and A['public']['sha256']==public_seal
 assert A['selection']['path'].startswith('repro/') and A['public']['path'].startswith('repro/')
 sealed(root,A['selection']);sealed(root,A['public'])
 selected=J(digest(root,A['selection']['path']+'/'+A['selection']['acceptance_record'],A['selection']['acceptance_record_sha256']))
 assert selected['selected'] is True and selected['genuine_managed_main_passed'] is True and selected['main_build_exit']==0
 assert selected['candidate_sha256']==R['required_amm_candidate'] and selected['public_seal']==public_seal
 assert selected['source_sha256']==A['compiled_amm']['source']
 proof=A['source_proof'];assert proof['sha256']==R['source_proof_seal'];sealed(root,proof)
 digest(root,proof['path']+'/'+proof['before'],R['collect_before']);digest(root,proof['path']+'/'+proof['after'],R['collect_after'])
 source=copy.deepcopy(B['compiled']['pump_amm']['source']);assert source[R['collect_path']]==R['collect_before'];source[R['collect_path']]=R['collect_after']
 assert A['compiled_amm']['source']==source and len(source)==30
 assert A['compiled_amm']['candidate_sha256']==A['amm_status']['candidate_sha256']==R['required_amm_candidate']
 assert A['symbols']['sha256']==R['required_amm_symbols'];digest(root,A['symbols']['path'],A['symbols']['sha256'])
 c=A['compiled_amm'];assert c['candidate'].startswith('repro/') and c['report'].startswith('repro/') and A['symbols']['path'].startswith('repro/');digest(root,c['candidate'],c['candidate_sha256']);report=J(digest(root,c['report'],c['report_sha256']))
 assert report['source_sha256']==source and report['comparison']['candidate_sha256']==R['required_amm_candidate']
 assert A['amm_status']['candidate_artifact']==c['candidate'] and A['amm_status']['comparison_report']==c['report']
 assert A['analysis']['candidate_path']==c['candidate'] and A['analysis']['candidate_sha256']==R['required_amm_candidate']
 assert A['analysis']['original_path']==J(P/'seed/P25-analysis-index.json')['programs']['pump_amm']['original_path']
 assert A['analysis']['original_sha256']==J(P/'seed/P25-analysis-index.json')['programs']['pump_amm']['original_sha256']
 for l in A['analysis']['full_ledger_files']:
  assert l['path'].startswith('repro/');assert digest(root,l['path'],l['sha256']).stat().st_size==l['bytes']
 suffixes=['summary.json.gz','residual-ledger.json.gz','relocation-data-graph.json.gz','all-window-dispositions.tsv','header-differences.json.gz','section-differences.json.gz','file-region-coverage.json.gz','all-symbols.json.gz']
 assert all(sum(l['path'].endswith('/'+s) for l in A['analysis']['full_ledger_files'])==1 for s in suffixes),'Need the new complete AMM ledger/export set, never old6dc or matches-only rows'
 ledger=next(l for l in A['analysis']['full_ledger_files'] if l['path'].endswith('/residual-ledger.json.gz'))
 document=json.loads(gzip.decompress((root/ledger['path']).read_bytes()));assert len(document['original'])==785
 oldbinding=J(P/'seed/P25-analysis-index.json')['programs']['pump_amm']
 oldledger=next(x for x in oldbinding['full_ledger_files']if x['path'].endswith('/residual-ledger.json.gz'))
 olddoc=json.loads(gzip.decompress(digest(root,oldledger['path'],oldledger['sha256']).read_bytes()))
 oldids=[(x['start'],x['end'])for x in olddoc['original']];newids=[(x['start'],x['end'])for x in document['original']]
 assert len(set(newids))==785 and newids==oldids,'Every original AMM window retained exactly once; no matches-only filtering'
 # The one externally accepted capsule names all final metadata/helper/workflow replacements, each exact.
 changed={r['path']:r for r in A['final_asset_replacements']};assert len(changed)==len(A['final_asset_replacements'])
 assert R['source_scanner'] not in changed,'The exact source scanner is not an implicit helper exception'
 docs=J(P/'seed/active-docs-before-after.json')['records']
 for n,r in changed.items():
  if n in docs:assert r['before_sha256']==docs[n]['before_sha256']and r['after_sha256']==docs[n]['after_sha256']and r['purpose']=='active current-state documentation'
  else:assert n in B['assets']and r['before_sha256']==B['assets'][n],n
  digest(root,n,r['after_sha256'])
  if n=='.gitattributes':assert r['purpose']=='retained-evidence-whitespace'
  elif n not in docs:assert r['purpose']in['AMM selected README/provenance','AMM selected helper route','P26 exact current-guard endpoint']
 check_attributes(root,A);check_workflow(root,A);check_docs(root,A)
 required=set(R['required_new_integrity_seals']);assert required<={r['sha256']for r in A['new_packets']if r.get('command')is None},'Missing reviewed companion integrity pointer'
 return A

def expected_state(A):
 B=copy.deepcopy(J(P/'seed/P25-known-bindings.json'));B['compiled']['pump_amm']=A['compiled_amm'];B['status']['pump_amm']=A['amm_status']
 for r in A['final_asset_replacements']:B['assets'][r['path']]=r['after_sha256']
 sets=J(P/'seed/proposed-final-script-workflow-sets.json');B['script_set']=sets['script_set'];B['workflow_set']=sets['workflow_set']
 for r in sets['added_passive_assets']:B['assets'][r['path']]=r['incoming']['sha256']
 return B

def source_names(crate,workspace,repository,extra_inputs=()):
 # Exact names-only preflight mirrors the frozen scanner before ANY source-body hash/read.
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
 return {str(p.relative_to(repository))for p in files}

def current_assertions(root,A):
 R=J(P/'rules.json');F=expected_state(A);verify_p25_history(root)
 sealed(root,{'path':A['incoming_preservation_path'],'manifest':'manifest.json','sha256':R['pinned515_plan_seal']})
 digest(root,A['incoming_preservation_path']+'/opaque-archive-manifest.json',R['pinned515_archive_seal'])
 for r in J(P/'seed/passive-retention-exact343.json'):
  p=digest(root,r['path'],r['incoming']['sha256']);assert bool(p.stat().st_mode&stat.S_IXUSR)==(r['incoming']['mode']=='100755')
 for r in J(P/'seed/inactive-exact10.json'):assert not(root/r['path']).exists() and not(root/r['path']).is_symlink(),r['path']
 assert sorted(str(p.relative_to(root)) for p in(root/'scripts').glob('*.py'))==F['script_set'] and len(F['script_set'])==187
 assert sorted(str(p.relative_to(root)) for p in(root/'.github/workflows').rglob('*') if p.is_file())==F['workflow_set'] and len(F['workflow_set'])==6
 for n,h in F['assets'].items():digest(root,n,h)
 assert J(root/'repro/status.json')==F['status'] and J(root/'repro/donation-relay/current.json')==F['relay']['current']
 for role,c in F['compiled'].items():
  l=R['source_layout'][role];assert source_names(root/l['crate'],root/l['workspace'],root,[root/n for n in l.get('extra_inputs',[])])==set(c['source']),(role,'unaccepted source membership; do not read as current')
  for n in c['source']:safe(root,n)
 C=root/'programs/donation-relay';assert source_names(C,C,root)=={'programs/donation-relay/'+n for n in F['relay']['source23']}
 for n in F['relay']['source23']:safe(root,'programs/donation-relay/'+n)
 scanner_path=digest(root,R['source_scanner'],R['source_scanner_sha256']);spec=importlib.util.spec_from_file_location('p26_exact_source_scanner',scanner_path);scanner=importlib.util.module_from_spec(spec);spec.loader.exec_module(scanner)
 total=0
 for role,c in F['compiled'].items():
  layout=R['source_layout'][role];actual=scanner.source_manifest(root/layout['crate'],root/layout['workspace'],root,extra_inputs=[root/n for n in layout.get('extra_inputs',[])])
  assert actual==c['source'] and len(actual)==R['counts'][role],(role,'no unaccepted Pump38 or extra source')
  digest(root,c['candidate'],c['candidate_sha256']);report=J(digest(root,c['report'],c['report_sha256']));assert report['source_sha256']==actual and report['comparison']['candidate_sha256']==c['candidate_sha256'];total+=len(actual)
 assert total==107
 C=root/'programs/donation-relay';assert scanner.source_manifest(C,C,root)=={'programs/donation-relay/'+n:h for n,h in F['relay']['source23'].items()}
 digest(root,'programs/donation-relay/README.md',F['relay']['canonical_readme_sha256']);digest(root,'programs/donation-relay/source-selected.json',F['relay']['source_selected_sha256'])
 return F

def metadata_seal(folder,external=None):
 saved=safe(folder,'manifest.sha256').read_text().split()[0];assert len(saved)==64
 if external is not None:assert external==saved,'Externally pinned metadata seal differs'
 return saved

def run_queue(root,index,output):
 R=J(P/'rules.json');g=digest(root,R['queue_generator'],R['queue_generator_sha256'])
 actual=subprocess.run([sys.executable,'-B',str(g),'--repo',str(root),'--index',str(index),'--output',str(output)],capture_output=True,text=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'})
 assert actual.returncode==0,actual.stdout+actual.stderr
 q=json.loads(gzip.decompress(output.read_bytes()));assert q['window_counts']==R['window_counts'] and len(q['tasks'])==q['total_window_records']==3338
 return q


def raw_comparison_matrices(root,F):
 R=J(P/'rules.json');f=digest(root,R['raw_comparison_method'],R['raw_comparison_method_sha256'])
 spec=importlib.util.spec_from_file_location('p26_frozen_raw_compare_only',f);method=importlib.util.module_from_spec(spec);spec.loader.exec_module(method)
 raw=(P/'seed/P25-before-all-byte-ranges.json.gz').read_bytes();summary=J(P/'seed/P25-before-raw-summary.json');assert hashlib.sha256(raw).hexdigest()==summary['ranges_sha256'];saved=json.loads(gzip.decompress(raw))
 assert list(saved)==['programs','raw_compiler_supplement'] and len(saved['programs'])==9 and len(saved['raw_compiler_supplement'])==2
 before={};after={}
 for group,rows in saved.items():
  before[group]=[];after[group]=[]
  for row in rows:
   actual=method.one(root,row['name'],row['original_path'],row['candidate_path'],row['kind']);assert actual==row,('Frozen before raw image changed',row['name'])
   before[group].append(actual);candidate=F['compiled']['pump_amm']['candidate']if group=='programs'and row['name']=='pump_amm'else row['candidate_path']
   fresh=method.one(root,row['name'],row['original_path'],candidate,row['kind'])
   if not(group=='programs'and row['name']=='pump_amm'):assert fresh==actual
   after[group].append(fresh)
 return before,after

def write_raw_snapshot(folder,full,role,accepted_commit):
 folder.mkdir();raw=gzip.compress((json.dumps(full,separators=(',',':'))+'\n').encode(),mtime=0);(folder/'all-byte-ranges.json.gz').write_bytes(raw)
 summary={k:[{x:y for x,y in row.items()if x!='common_extent_mismatch_ranges'}|{'common_extent_mismatch_range_count':len(row['common_extent_mismatch_ranges'])}for row in rows]for k,rows in full.items()}
 summary.update(scope='Every byte/range in all9 program comparisons and2 raw compiler supplements; separate from3338function queue; no semantic distance or completion percentage.',snapshot_role=role,accepted_AMM_selection_commit=accepted_commit,ranges_sha256=hashlib.sha256(raw).hexdigest(),whole_core_equal=sum(r['whole_file_equal']for r in full['programs'][:4]),whole_core_total=4,dependency_capture_equal=sum(r['whole_file_equal']for r in full['programs'][4:]),dependency_total=5)
 write(folder/'summary.json',summary)

def verify_raw_snapshot(folder,expected):
 raw=(folder/'all-byte-ranges.json.gz').read_bytes();s=J(folder/'summary.json');assert hashlib.sha256(raw).hexdigest()==s['ranges_sha256']and json.loads(gzip.decompress(raw))==expected
 assert len(expected['programs'])==9 and len(expected['raw_compiler_supplement'])==2
 for group,rows in expected.items():
  assert [{x:y for x,y in row.items()if x!='common_extent_mismatch_ranges'}|{'common_extent_mismatch_range_count':len(row['common_extent_mismatch_ranges'])}for row in rows]==s[group]
 assert s['whole_core_equal']==sum(r['whole_file_equal']for r in expected['programs'][:4])and s['dependency_capture_equal']==sum(r['whole_file_equal']for r in expected['programs'][4:])
