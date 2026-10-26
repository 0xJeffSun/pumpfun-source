"""Independent retained-data audit only. No original ELF, live cache paths or build tools."""
from pathlib import Path,PurePosixPath
import collections,difflib,hashlib,json,posixpath,re,shlex,subprocess,sys,tomllib
P=Path(__file__).resolve().parent;W=P.parent/'collector-current-cargo-unit-witness';R=W/'record';J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();SEAL='03ac2ad0eabbd58d97c034640357262572422a6044f04206303ffe586f5a5bb9';REC='9760c7c71676eefc98c023f1eea876c75f1af06ef4b9932f63361aed8aad140f'
def snapshot(root):return{str(f.relative_to(root)):H(f)for f in root.rglob('*')if f.is_file()}
before=snapshot(W);assert H(W/'manifest.json')==SEAL and H(R/'manifest.json')==REC
outer=J(W/'manifest.json');raw=J(R/'manifest.json');assert len(raw)==778
for root,manifest in[(W,outer),(R,raw)]:
 assert set(manifest)=={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()}-{'manifest.json','manifest.sha256'}
 for n,row in manifest.items():
  path=PurePosixPath(n);assert not path.is_absolute()and'..'not in path.parts
  f=root/n;assert not f.is_symlink()and H(f)==row['sha256']and f.stat().st_size==row['bytes']
# Declared JSON-wire normalization changes representation only; derive exact patch.
d=J(W/'derivation.json');original=(R/'verify.py').read_text();old,new=d['only_replacement'];assert old=='d=module.analyze();assert d==J(P/\'analysis.json\')'and new=='d=module.analyze();assert json.loads(json.dumps(d))==J(P/\'analysis.json\')'
assert original.count(old)==1;derived=original.replace(old,new);assert(W/'verify-record-portable.py').read_text()==derived
assert H(R/'verify.py')==d['original_checker_sha256']and H(W/'verify-record-portable.py')==d['derived_checker_sha256']and d['analysis_method_changed']is False
# Independent dep-info tokenization uses stdlib shlex, not the author's words parser.
c=J(R/'capture.json');cache=J(R/'context/cache-allowlist.json')['files'];lock=tomllib.loads((R/'context/Cargo.lock').read_text());locked={(x['name'],x['version']):x for x in lock['package']if x.get('source')};assert len(locked)==252
meta=R/'target-metadata';allmeta={str(f.relative_to(meta)):H(f)for f in meta.rglob('*')if f.is_file()};assert allmeta==c['metadata_before_after_sha256']and len(allmeta)==533
refs=set();perfile={}
for f in meta.rglob('*.d'):
 local=set()
 for line in f.read_text().replace('\\\n','').splitlines():
  if not line or line.startswith('#'):continue
  _,sep,tail=line.partition(':');assert sep
  local.update(shlex.split(tail,comments=False,posix=True))
 refs.update(local);perfile[str(f.relative_to(meta))]=local
assert len(perfile)==215 and refs==set(c['source_path_bindings'])and len(refs)==1351
ar=J(R/'archive-source-bindings.json');rows={r['relative_source']:r for r in ar['rows']};assert len(rows)==len(ar['rows'])==1283
roots=c['metadata_source_version_witnesses'];assert len(roots)==176
for rawpath,b in c['source_path_bindings'].items():
 if b['kind']!='approved-registry-source':continue
 relative=str(PurePosixPath(rawpath).relative_to(c['cache_root']));parts=PurePosixPath(relative).parts;package='/'.join(parts[:4]);assert package==b['package_root']
 # Normalize within package; reject both final escape and any intermediate traversal above it.
 suffix=parts[4:];stack=[]
 for part in suffix:
  if part=='..':assert stack;stack.pop()
  elif part not in['.','']:stack.append(part)
 normalized=package+'/'+('/'.join(stack));assert normalized==b['relative']and posixpath.normpath(relative)==normalized
 row=rows[normalized];pkg=roots[package];pin=locked[pkg['name'],pkg['version']]
 assert row['package_root']==package and rawpath in row['raw_path_aliases']and row['package_name']==pkg['name']and row['package_version']==pkg['version']
 assert row['source_sha256']==b['sha256']==cache[normalized]['sha256']and row['source_bytes']==b['bytes']==cache[normalized]['bytes']==row['archive_member_bytes']
 assert row['archive_sha256']==pkg['archive_sha256']==pkg['package_checksum']==pin['checksum']==cache[row['archive_path']]['sha256']
 assert row['archive_path']==pkg['archive_path']and row['archive_member']==pkg['name']+'-'+pkg['version']+'/'+('/'.join(stack))and row['source_equals_member_observed']is True
 assert not PurePosixPath(row['archive_member']).is_absolute()and'..'not in PurePosixPath(row['archive_member']).parts
assert set(rows)=={b['relative']for b in c['source_path_bindings'].values()if b['kind']=='approved-registry-source'}and sum(r['source_bytes']for r in rows.values())==18566442
versions=collections.defaultdict(set)
for pkg in roots.values():
 md=tomllib.loads((R/pkg['manifest_file']).read_text());assert(md['package']['name'],md['package']['version'])==(pkg['name'],pkg['version'])
 versions[pkg['name']].add(pkg['version'])
expected={'anchor-lang':{'0.31.1'},'anchor-spl':{'0.31.1'},'anchor-syn':{'0.31.2'},'solana-program':{'2.3.0'},'solana-pubkey':{'2.4.0'},'borsh':{'0.10.4','1.8.1'},'spl-token':{'7.0.0'},'spl-token-2022':{'6.0.0'},'syn':{'1.0.109','2.0.119','3.0.9'}}
assert all(versions[n]==v for n,v in expected.items())
macro={n:sorted(v)for n,v in versions.items()if n.startswith(('anchor-attribute-','anchor-derive-'))};assert len(macro)==9 and all(v==['0.31.2']for v in macro.values())
fps=[];bykind=collections.Counter();feature_rows=[];flagrows=collections.Counter()
for f in meta.glob('**/.fingerprint/*/*.json'):
 row=J(f);relative=str(f.relative_to(meta));domain='host'if relative.startswith('release/')else'sbf';kind='run-build'if f.name.startswith('run-build-script-')else'build-script'if f.name.startswith('build-script-')else'library';bykind[domain+'/'+kind]+=1
 assert row['rustflags']==([]if domain=='host'else['-Zremap-cwd-prefix=']);flagrows[domain]+=1
 label=f.parent.name.rsplit('-',1)[0];features=json.loads(row['features'])if row['features']else None
 if label in['anchor-lang','anchor-spl','anchor-syn']:feature_rows.append({'domain':domain,'kind':kind,'package':label,'features':features})
 fps.append((domain,kind,label,row))
assert bykind=={'host/library':71,'host/build-script':20,'host/run-build':12,'sbf/library':122,'sbf/run-build':14}and flagrows=={'host':103,'sbf':136}
assert len(fps)==239 and sum(k!='run-build'for _,k,_,_ in fps)==213 and sum(k=='run-build'for _,k,_,_ in fps)==26
assert sum(k=='run-build'and any('Precalculated'in x for x in row['local'])for _,k,_,row in fps)==6
outfiles=list(meta.glob('**/build/*/output'));assert len(outfiles)==26
counts=collections.Counter()
for f in outfiles:
 for sibling in['output','stderr','root-output']:assert(f.parent/sibling).is_file()
 for line in f.read_text().splitlines():
  if line:assert line.startswith('cargo:');counts[line[6:].partition('=')[0]]+=1
assert counts=={'rustc-cfg':34,'rustc-check-cfg':94,'rerun-if-changed':56,'rerun-if-env-changed':12,'warning':2}
for name in['rustc-link-lib','rustc-link-search','rustc-env','rustc-flags']:assert counts[name]==0
ret=J(R/'generated-source-retention.json');assert len(ret['rows'])==6 and sum(x['bytes']for x in ret['rows'])==653
for row in ret['rows']:
 f=R/row['retained_file'];assert f.is_file()and H(f)==row['sha256']and f.stat().st_size==row['bytes']
# Independently prove the JSON-wire derivative changes only177 tuple/list pairs.
import importlib.util
spec=importlib.util.spec_from_file_location('independent_current_cargo_analysis',R/'analyze.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);python_value=module.analyze();wire=J(R/'analysis.json');tuple_paths=[]
def compare(a,b,path=''):
 if isinstance(a,tuple):assert isinstance(b,list)and path.startswith('/build_log_compiling_name_versions/');tuple_paths.append(path);assert list(a)==b
 elif isinstance(a,dict):
  assert isinstance(b,dict)and set(a)==set(b)
  for k in a:compare(a[k],b[k],path+'/'+k)
 elif isinstance(a,list):
  assert isinstance(b,list)and len(a)==len(b)
  for i,(x,y)in enumerate(zip(a,b)):compare(x,y,path+'/'+str(i))
 else:assert type(a)==type(b)and a==b
compare(python_value,wire);assert len(tuple_paths)==177
(P/'wire-type-differences.json').write_text(json.dumps({'only_differences':'177 Python tuple versus saved JSON array pairs','paths':tuple_paths},indent=2)+'\n')
# Passive portable checker executes only its declared JSON/TOML analyzer, not capture scripts.
child=subprocess.run([sys.executable,'-B',str(W/'verify.py'),'--expected-seal',SEAL],cwd=W,capture_output=True);(P/'portable-verify.stdout').write_bytes(child.stdout);(P/'portable-verify.stderr').write_bytes(child.stderr);assert child.returncode==0
assert snapshot(W)==before
result={'status':'PASS_CURRENT_CARGO_UNIT_WITNESS_PASSIVE_REVIEW','publication_seal':SEAL,'original_record_seal':REC,'original_payloads':778,'portable_checker_exit':0,'independent_registry_member_relations':len(rows),'registry_member_bytes_recorded':18566442,'registry_versions':176,'registry_lock_entries':252,'fingerprints':239,'artifact_fingerprints':213,'run_build_fingerprints':26,'host_flags_records':103,'sbf_flags_records':136,'generated_raw_files':6,'generated_raw_bytes':653,'features':feature_rows,'highlighted_versions':{n:sorted(v)for n,v in expected.items()},'anchor_macro_versions':macro,'directive_counts':dict(counts),'normalization_only_derivative':True,'packet_unchanged_before_after':True,'private_absolute_roots_opened':False,'new_original_reads_or_decoders':0,'build_or_target_executions':0,'network_requests':0,'limitations':['Raw registry source/crate bytes omitted: member byte equality is authenticated capture observation, not a fresh portable byte comparison','Metadata/source-version association is not actual complete argv, scheduling, final-link contribution or historical dependency provenance','Opaque fingerprint numbers are not reconstructed compiler arguments','No retained explicit link directives does not prove no implicit native link or CC invocation','Generated inputs retained as raw data do not close generator execution/argv or all environment/file reads']}
(P/'review.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
