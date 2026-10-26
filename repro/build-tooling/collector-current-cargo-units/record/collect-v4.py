"""Capture only current-build Cargo metadata/source-version hash witnesses. No builds or target execution."""
from pathlib import Path
import hashlib,json,shutil,tomllib,tarfile,io
P=Path(__file__).resolve().parent;W=P.parent;B=W/'cto-wallet-collector-build-01';T=B/'build-01/target';PLAN=W/'cto-wallet-collector-build-plan'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def put(src,dest):
 assert src.is_file()and not src.is_symlink();dest.parent.mkdir(parents=True,exist_ok=True)
 if dest.exists():assert H(src)==H(dest)
 else:dest.write_bytes(src.read_bytes());assert H(src)==H(dest)
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
  assert ':'in line and '$('not in line,line
  a,b=line.split(':',1);outputs.update(words(a));refs.update(words(b))
 return sorted(refs),sorted(outputs),env
assert H(PLAN/'MANIFEST.json')=='ff7a857b5394b57c61eebb19cf6265fa001b18b2d0f3db4936fd00c48cbb2fa0'
assert H(B/'build-01/artifacts/pump_recovered.so')=='6e0c9002d09e0cee6cc738b3a9e0983a8d0cd89374fa2cc7c41fa45910515b9e'
assert H(B/'build-01/target/sbf-solana-solana/release/pump_recovered.so')=='f09ac5696038d7ee9a2d28767b02cbae5b5504a56086d8baf4019f316b8a0c86'
assert (P/'target-metadata').is_dir();metadata=[]
for root in[T/'release',T/'sbf-solana-solana/release']:
 metadata+=list(root.glob('.fingerprint/*/*.json'));metadata+=list(root.rglob('*.d'))
 for name in['output','stderr','root-output']:metadata+=list(root.glob('build/*/'+name))
metadata+=[T/'.rustc_info.json'];metadata=sorted(set(metadata));before={str(f.relative_to(T)):H(f)for f in metadata}
for f in metadata:put(f,P/'target-metadata'/f.relative_to(T))
context={'plan-manifest.json':PLAN/'MANIFEST.json','cache-allowlist.json':PLAN/'cache-allowlist.json','availability.json':PLAN/'availability.json','source37.json':PLAN/'source-proposed.json','Cargo.lock':B/'repo/programs/pump/Cargo.lock','Cargo.toml':B/'repo/programs/pump/Cargo.toml','controller-result.json':B/'controller-result.json','build-attempt.json':B/'build-01/build-attempt.json','build-comparison.json':B/'build-01/build-comparison.json','build.log':B/'build-01/build.log'}
for name,src in context.items():put(src,P/'context'/name)
cache=J(PLAN/'cache-allowlist.json')['files'];source=J(PLAN/'source-proposed.json');bindings={};packages={};cache_root=B/'cargo-home';repo_root=B/'repo';source_paths=set();source_referrers={}
for f in metadata:
 if f.suffix=='.d':
  for path in parse_d(f.read_text())[0]:source_paths.add(path);source_referrers.setdefault(path,[]).append(str(f.relative_to(T)))
for path in sorted(source_paths):
 raw_f=Path(path)
 if not raw_f.is_absolute():
  assert source_referrers[path]==['sbf-solana-solana/release/deps/pump_recovered.d'],source_referrers[path]
  raw_f=repo_root/'programs/pump'/raw_f
 assert raw_f.is_file()and all(not a.is_symlink()for a in[raw_f,*raw_f.parents]),path;f=raw_f.resolve(strict=True)
 if f.is_relative_to(cache_root):
  rel=f.relative_to(cache_root).as_posix();assert rel in cache and H(f)==cache[rel]['sha256'];parts=Path(rel).parts;assert parts[:2]==('registry','src');package='/'.join(parts[:4]);bindings[path]={'kind':'approved-registry-source','relative':rel,'sha256':H(f),'bytes':f.stat().st_size,'package_root':package};packages.setdefault(package,{})
 elif f.is_relative_to(repo_root):
  rel=f.relative_to(repo_root).as_posix();assert rel in source and H(f)==source[rel];bindings[path]={'kind':'source37','relative':rel,'sha256':H(f),'bytes':f.stat().st_size}
 elif f.is_relative_to(T):bindings[path]={'kind':'generated-target-source','relative':f.relative_to(T).as_posix(),'sha256_observation':H(f),'bytes_observation':f.stat().st_size,'raw_source_retained':False}
 else:raise AssertionError('Unexpected unapproved source root '+path)
lock=tomllib.loads((P/'context/Cargo.lock').read_text());locked={(x['name'],x['version']):x for x in lock['package']}
for root in packages:
 rel=root+'/Cargo.toml';f=cache_root/rel;assert rel in cache and H(f)==cache[rel]['sha256'];put(f,P/'registry-manifests'/rel)
 manifest=tomllib.loads(f.read_text());name=manifest['package']['name'];version=manifest['package']['version'];pin=locked[name,version];archive_rel='registry/cache/'+root.split('/')[2]+'/'+name+'-'+version+'.crate';archive=cache_root/archive_rel;assert archive_rel in cache and H(archive)==cache[archive_rel]['sha256']==pin['checksum'];raw=archive.read_bytes();member=name+'-'+version+'/Cargo.toml'
 with tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz')as tar:
  m=tar.getmember(member);assert m.isfile();assert tar.extractfile(m).read()==f.read_bytes()
 packages[root]={'name':name,'version':version,'manifest_file':'registry-manifests/'+rel,'manifest_sha256':H(f),'archive_path':archive_rel,'archive_sha256':H(archive),'archive_bytes':len(raw),'archive_member':member,'archive_manifest_equal_observation':True,'archive_raw_bytes_retained':False,'package_checksum':pin['checksum'],'vendor_checksum_file_present':(cache_root/root/'.cargo-checksum.json').exists()}
assert before=={str(f.relative_to(T)):H(f)for f in metadata}
assert all(H(B/'repo'/n)==h for n,h in source.items());assert H(B/'controller-result.json')==H(P/'context/controller-result.json')
receipt={'scope':'Fresh current-build metadata/source hash observations only; no original ELF/decode/compiler/target/network action','build_root':str(B),'target_root':str(T),'repo_root':str(repo_root),'cache_root':str(cache_root),'plan_seal':H(PLAN/'MANIFEST.json'),'candidate_sha256':H(B/'build-01/artifacts/pump_recovered.so'),'symbols_sha256':H(B/'build-01/target/sbf-solana-solana/release/pump_recovered.so'),'metadata_before_after_sha256':before,'context_sha256':{n:H(f)for n,f in context.items()},'metadata_source_version_witnesses':packages,'source_path_referrers':source_referrers,'source_path_bindings':bindings,'metadata_and_source_unchanged':True,'source_file_bytes_retained':False,'generated_source_hashes_are_observations_not_full_source_replay':True,'compiler_target_network_original_decoder_invocations':0}
(P/'capture.json').write_text(json.dumps(receipt,indent=2)+'\n');print(json.dumps({'metadata_files':len(metadata),'metadata_bytes':sum(f.stat().st_size for f in metadata),'source_paths':len(bindings),'registry_package_roots':len(packages)},indent=2))
