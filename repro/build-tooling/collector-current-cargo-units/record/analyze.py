"""Pure portable Cargo metadata/source-version analysis; never executes Cargo or source code."""
from pathlib import Path,PurePosixPath
import collections,hashlib,json,posixpath,re,tomllib
P=Path(__file__).resolve().parent
J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def words(s):
 out=[];word='';escape=False
 for c in s:
  if escape:word+=c;escape=False
  elif c=='\\':escape=True
  elif c.isspace():
   if word:out.append(word);word=''
  else:word+=c
 assert not escape
 if word:out.append(word)
 return out
def parse_d(text):
 refs=set();outputs=set();env={};text=text.replace('\\\n','')
 for line in text.splitlines():
  if not line:continue
  if line.startswith('# env-dep:'):
   k,sep,v=line[len('# env-dep:'):].partition('=');env[k]=v if sep else None;continue
  if line.startswith('#'):continue
  assert ':'in line and '$('not in line
  a,b=line.split(':',1);outputs.update(words(a));refs.update(words(b))
 return sorted(refs),sorted(outputs),env
def domain(n):return 'host-layout'if n.startswith('release/')else'sbf-layout'
def analyze():
 capture=J(P/'capture.json');ctx=P/'context';metadata=P/'target-metadata';plan=J(ctx/'plan-manifest.json');assert H(ctx/'plan-manifest.json')==capture['plan_seal']=='ff7a857b5394b57c61eebb19cf6265fa001b18b2d0f3db4936fd00c48cbb2fa0'
 for n in ['cache-allowlist.json','availability.json']:assert H(ctx/n)==plan[n]
 source=J(ctx/'source37.json');assert H(ctx/'source37.json')==plan['source-proposed.json']and len(source)==37
 for n in ['Cargo.lock','Cargo.toml']:assert H(ctx/n)==source['programs/pump/'+n]
 assert capture['metadata_before_after_sha256']=={str(f.relative_to(metadata)):H(f)for f in metadata.rglob('*')if f.is_file()}
 assert all(H(ctx/n)==h for n,h in capture['context_sha256'].items())
 controller=J(ctx/'controller-result.json');assert controller['state']=='requires-cache-review'and controller['helper_exit']==controller['build_sbf_aggregate_exit']==0 and controller['compiler_child_exit']is None and controller['strip_child_exit']is None and controller['source_after']==source and controller['tool_sdk_before']==controller['tool_sdk_after']and controller['source_unchanged']and controller['private_cache_existing_unchanged']
 comparison=J(ctx/'build-comparison.json');assert comparison['source_sha256']==source and comparison['comparison']['candidate_sha256']==capture['candidate_sha256']=='6e0c9002d09e0cee6cc738b3a9e0983a8d0cd89374fa2cc7c41fa45910515b9e'
 assert capture['symbols_sha256']=='f09ac5696038d7ee9a2d28767b02cbae5b5504a56086d8baf4019f316b8a0c86'
 cache=J(ctx/'cache-allowlist.json')['files'];lock=tomllib.loads((ctx/'Cargo.lock').read_text());locked={(x['name'],x['version']):x for x in lock['package']};registry_locked={k:v for k,v in locked.items()if v.get('source')};assert len(registry_locked)==252
 roots=capture['metadata_source_version_witnesses'];packages={}
 for root,r in roots.items():
  assert not PurePosixPath(r['manifest_file']).is_absolute()and'..'not in PurePosixPath(r['manifest_file']).parts
  manifest=tomllib.loads((P/r['manifest_file']).read_text());key=(manifest['package']['name'],manifest['package']['version']);assert key==(r['name'],r['version'])and key in registry_locked
  assert H(P/r['manifest_file'])==r['manifest_sha256']==cache[root+'/Cargo.toml']['sha256']
  assert registry_locked[key]['checksum']==r['package_checksum']==r['archive_sha256']==cache[r['archive_path']]['sha256']
  assert r['archive_bytes']==cache[r['archive_path']]['bytes']and r['archive_member']==key[0]+'-'+key[1]+'/Cargo.toml'and r['archive_manifest_equal_observation']is True and r['archive_raw_bytes_retained']is False
  packages[root]={'name':key[0],'version':key[1],'archive_sha256':r['archive_sha256'],'source_manifest_sha256':r['manifest_sha256']}
 bindings=capture['source_path_bindings'];drecords={};referrers=collections.defaultdict(list)
 for f in sorted(metadata.rglob('*.d')):
  n=str(f.relative_to(metadata));refs,outputs,env=parse_d(f.read_text());pkgroots=set();owned=False;generated=[]
  for path in refs:
   referrers[path].append(n);assert path in bindings;row=bindings[path]
   canonical=posixpath.normpath(path if path.startswith('/')else capture['repo_root']+'/programs/pump/'+path)
   if row['kind']=='approved-registry-source':
    assert canonical==capture['cache_root']+'/'+row['relative']and row['relative']in cache and row['sha256']==cache[row['relative']]['sha256']and row['bytes']==cache[row['relative']]['bytes']and row['package_root']in roots;pkgroots.add(row['package_root'])
   elif row['kind']=='source37':assert canonical==capture['repo_root']+'/'+row['relative']and row['sha256']==source[row['relative']];owned=True
   else:assert row['kind']=='generated-target-source'and canonical==capture['target_root']+'/'+row['relative']and row['raw_source_retained']is False;generated.append(row['relative'])
  versions=[packages[root]for root in sorted(pkgroots)]
  if owned:
   md=tomllib.loads((ctx/'Cargo.toml').read_text());versions.append({'name':md['package']['name'],'version':md['package']['version'],'local_source37':True})
  drecords[n]={'domain':domain(n),'source_paths':refs,'output_paths':outputs,'environment_dependencies':env,'package_roots':sorted(pkgroots),'source_version_candidates':versions,'generated_source_paths':generated}
 assert dict(referrers)==capture['source_path_referrers']
 relative={n:r for n,r in bindings.items()if not n.startswith('/')};assert len(relative)==31 and all(referrers[n]==['sbf-solana-solana/release/deps/pump_recovered.d']for n in relative)
 canonical=lambda n:posixpath.normpath(n if n.startswith('/')else capture['repo_root']+'/programs/pump/'+n)
 assert {canonical(n)for n in drecords['sbf-solana-solana/release/deps/pump_recovered.d']['source_paths']}=={canonical(n)for n in drecords['sbf-solana-solana/release/pump_recovered.d']['source_paths']}
 archive=J(P/'archive-source-bindings.json');assert archive['status']=='PASS_ALL_OBSERVED_REGISTRY_SOURCE_FILES_MATCH_APPROVED_LOCKED_ARCHIVE_MEMBERS'
 ar={x['relative_source']:x for x in archive['rows']};expected_registry={b['relative']for b in bindings.values()if b['kind']=='approved-registry-source'};assert len(ar)==len(archive['rows'])and set(ar)==expected_registry
 for raw,b in bindings.items():
  if b['kind']!='approved-registry-source':continue
  r=ar[b['relative']];pkg=roots[b['package_root']];rawrel=PurePosixPath(raw).relative_to(PurePosixPath(capture['cache_root']));assert '/'.join(rawrel.parts[:4])==b['package_root']
  assert r['package_root']==b['package_root']and r['source_sha256']==b['sha256']==cache[b['relative']]['sha256']and r['source_bytes']==b['bytes']==cache[b['relative']]['bytes']and r['archive_member_bytes']==b['bytes']and r['source_equals_member_observed']is True
  assert r['archive_sha256']==pkg['archive_sha256']and r['archive_path']==pkg['archive_path']and r['archive_member']==pkg['name']+'-'+pkg['version']+'/'+b['relative'][len(b['package_root'])+1:]and raw in r['raw_path_aliases']
 assert archive['unique_registry_source_files']==len(ar)==1283 and archive['registry_packages']==len(roots)==176 and archive['source_file_bytes']==sum(r['source_bytes']for r in ar.values())==18566442
 assert archive['non_registry_source_path_bindings']==[{'raw_source_path':n,**b}for n,b in bindings.items()if b['kind']!='approved-registry-source']
 generated=J(P/'generated-source-retention.json');assert generated['status']=='PASS_GENERATED_SOURCE_DATA_RETENTION'and generated['capture_sha256']==H(P/'capture.json')and not generated['oversized_hash_only']and len(generated['rows'])==6
 expected_gen={n:b for n,b in bindings.items()if b['kind']=='generated-target-source'};assert set(expected_gen)=={x['raw_path']for x in generated['rows']}
 for r in generated['rows']:
  b=expected_gen[r['raw_path']];path=PurePosixPath(r['retained_file']);assert not path.is_absolute()and'..'not in path.parts and path.parts[0]=='generated-source';f=P/path
  assert H(f)==r['sha256']==b['sha256_observation']and f.stat().st_size==r['bytes']==b['bytes_observation']and r['relative_target_path']==b['relative']and r['generator_identity_or_actual_argv_proved']is False
 units=[];used_depinfos=set();unresolved=[]
 for f in sorted(metadata.glob('**/.fingerprint/*/*.json')):
  n=str(f.relative_to(metadata));raw=J(f);directory=f.parent.name;pkg,sep,artifact_hash=directory.rpartition('-');assert sep and re.fullmatch('[0-9a-f]{16}',artifact_hash)
  prefix=f.name[:-5];kind='run-build-script'if prefix.startswith('run-build-script-')else'build-script'if prefix.startswith('build-script-')else'library'if prefix.startswith('lib-')else'unknown'
  assert kind!='unknown';unit={'file':n,'domain':domain(n),'package_directory_label':pkg,'artifact_filename_hash':artifact_hash,'kind':kind,'features':json.loads(raw['features'])if raw['features']else None,'fingerprint_fields':raw,'source_depinfo_files':[],'source_versions':[]}
  if kind!='run-build-script':
   target=prefix[len('lib-'):]if kind=='library'else'build_script_build'
   ds=[x for x in drecords if domain(x)==domain(n)and PurePosixPath(x).stem==target+'-'+artifact_hash]
   if not ds:ds=[x for x in drecords if domain(x)==domain(n)and PurePosixPath(x).stem==target]
   if not ds:unresolved.append(n)
   else:
    versions={}
    for x in ds:
     used_depinfos.add(x)
     for v in drecords[x]['source_version_candidates']:versions[v['name'],v['version']]=v
    assert len(versions)==1,(n,versions);v=next(iter(versions.values()));assert v['name']==pkg;unit['source_versions']=[v];unit['source_depinfo_files']=ds
  else:
   outputrefs=[x['RerunIfChanged']['output']for x in raw['local']if'RerunIfChanged'in x]
   assert all(not PurePosixPath(x).is_absolute()and'..'not in PurePosixPath(x).parts and(metadata/x).is_file()for x in outputrefs)
   if not outputrefs:assert raw['local']and all('Precalculated'in x for x in raw['local'])
   unit['build_output_references']=outputrefs;unit['precalculated_payloads']=[x['Precalculated']for x in raw['local']if'Precalculated'in x];unit['source_version_binding']='Not independently resolved from opaque dependency fingerprint IDs; package label and any literal Precalculated payload retained as observations only'
  units.append(unit)
 assert not unresolved
 outputs={}
 for f in sorted(metadata.glob('**/build/*/output')):
  n=str(f.relative_to(metadata));lines=f.read_text().splitlines();assert all(line.startswith('cargo:')or not line for line in lines),n;outputs[n]={'directives':lines,'domain':domain(n)}
 directive_counts=collections.Counter();explicit={k:[]for k in['rustc-cfg','rustc-check-cfg','rustc-link-lib','rustc-link-search','rustc-env','rustc-flags']}
 for n,r in outputs.items():
  for line in r['directives']:
   if not line:continue
   key=line[len('cargo:'):].partition('=')[0];directive_counts[key]+=1
   if key in explicit:explicit[key].append({'file':n,'directive':line})
 rustcinfo=J(metadata/'.rustc_info.json');vv=[x['stdout']for x in rustcinfo['outputs'].values()if x.get('stdout','').startswith('rustc ')];assert len(vv)==1 and vv[0].strip()==comparison['rustc_version'];assert all(x['success']is True and x['code']==0 for x in rustcinfo['outputs'].values())
 log=re.sub(r'\x1b\[[0-?]*[ -/]*[@-~]','',(ctx/'build.log').read_text());compiling=sorted(set(re.findall(r'^\s*Compiling ([A-Za-z0-9_-]+) v([^\s]+)',log,re.M)))
 observed={(r['name'],r['version'])for r in roots.values()};counts=collections.Counter((u['domain'],u['kind'])for u in units)
 key_names=['anchor-lang','anchor-spl','anchor-syn','solana-program','solana-pubkey','borsh','spl-token','spl-token-2022','syn']
 highlighted={name:sorted({v for n,v in observed if n==name})for name in key_names}
 return {'scope':'Current fresh-build artifact metadata/source-version witnesses only; no complete linked closure, historical graph or actual per-unit argv proof','counts':{'fingerprint_json':len(units),'textual_depinfo':len(drecords),'build_output_sets':len(outputs),'registry_lock_packages':len(registry_locked),'registry_source_roots_observed':len(roots),'unique_registry_name_versions_observed':len(observed),'registry_lock_packages_without_depinfo_source_witness':len(set(registry_locked)-observed),'registry_source_files_authenticated_to_archive_members':len(ar),'registry_source_bytes_authenticated_to_archive_members':archive['source_file_bytes'],'source_path_spellings':len(bindings),'relative_primary_source_paths':len(relative),'artifact_units_with_source_version_binding':sum(u['kind']!='run-build-script'for u in units),'generated_source_files_raw_retained':len(generated['rows']),'generated_source_bytes_raw_retained':sum(x['bytes']for x in generated['rows']),'run_build_fingerprint_records':sum(u['kind']=='run-build-script'for u in units),'compiled_name_version_log_observations':len(compiling)},'counts_by_domain_kind':{'/'.join(k):v for k,v in sorted(counts.items())},'highlighted_versions':highlighted,'units':units,'depinfo':drecords,'unmatched_depinfo_files':sorted(set(drecords)-used_depinfos),'observed_registry_packages':packages,'locked_without_depinfo_source_witness':[{'name':n,'version':v,'checksum':registry_locked[n,v]['checksum']}for n,v in sorted(set(registry_locked)-observed)],'build_script_directives':outputs,'build_script_directive_counts':dict(directive_counts),'explicit_cfg_link_and_env_directives':explicit,'build_log_compiling_name_versions':compiling,'toolchain_record':{'selected_toolchain':comparison['selected_toolchain'],'cargo_build_sbf_version_banner':comparison['cargo_build_sbf_version'],'rustc_version':comparison['rustc_version'],'rustc_binary_sha256':comparison['rustc_sha256'],'fingerprint_rustc_opaque_values':sorted({u['fingerprint_fields']['rustc']for u in units}),'rustc_info_fingerprint_opaque_value':rustcinfo['rustc_fingerprint'],'rustc_info_query_outputs':rustcinfo['outputs']},'generated_source_inputs_retained_as_data':generated['rows'],'archive_member_equalities':'Actual capture observations tied to pinned archive hash/cache/lock; raw archives not retained, so portable replay does not independently decompress them','original_or_target_execution':0,'actual_rustc_argv_complete':False,'fingerprint_metadata_is_C_metadata_argv':False,'link_closure_proved':False,'historical_graph_proved':False}
if __name__=='__main__':
 data=analyze();(P/'analysis.json').write_text(json.dumps(data,indent=2)+'\n');print(json.dumps({k:data[k]for k in['counts','counts_by_domain_kind','highlighted_versions','unmatched_depinfo_files']},indent=2))
