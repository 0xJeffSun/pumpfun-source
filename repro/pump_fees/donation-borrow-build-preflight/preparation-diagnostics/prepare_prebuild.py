"""Freeze only approved source and read-only tool/cache evidence. Never builds."""
from pathlib import Path,PurePosixPath
import difflib,gzip,hashlib,importlib.util,io,json,shutil,subprocess,sys,tarfile,tomllib
R=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent;P=W/'prebuild';S=P/'source'
B=R/'repro/pump_fees/donation-business-v144';Q=R/'repro/pump_fees/donation-borrow-source-proposal'
sha=lambda b:hashlib.sha256(b).hexdigest()
def safe(n):
 p=PurePosixPath(n);assert not p.is_absolute()and'..'not in p.parts and not p.name.endswith('-keypair.json');return p
def raw(p):assert not p.name.endswith('-keypair.json')and not p.is_symlink();return p.read_bytes()
def write(n,b):
 p=P/safe(n);p.parent.mkdir(parents=True,exist_ok=True);assert not p.exists(),n;p.write_bytes(b)
def js(n,j):write(n,(json.dumps(j,indent=2)+'\n').encode())
def copy(p,n):write(n,raw(p))
base=json.loads(raw(B/'source-sha256.json'));assert len(base)==26
for n,h in base.items():
 assert sha(raw(R/n))==h,n;copy(R/n,'baseline-source/'+n);copy(R/n,'source/'+n)
n='programs/pump-fees/src/donation.rs';before=raw(S/n);assert sha(before)=='a99db3b6156a3009e805ea24ca087d1bea1eb28b90be076dda024f30ac0a14b9'
after=before
for a,b in [(b'let info=ctx.accounts.pool.to_account_info();',b'let info = &ctx.accounts.pool;'),(b'let sharing=ctx.accounts.sharing_config.to_account_info();',b'let sharing = &ctx.accounts.sharing_config;')]:assert after.count(a)==1;after=after.replace(a,b)
(S/n).write_bytes(after)
patch=''.join(difflib.unified_diff(before.decode().splitlines(True),after.decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n));assert patch.encode()==raw(Q/'borrowed-accounts.patch')
write('source.patch',patch.encode());source={x:sha(raw(S/x))for x in base};assert [x for x in base if base[x]!=source[x]]==[n]
js('baseline-source-sha256.json',base);js('source-sha256.json',source)
for filename in ['source-sha256.json','build-helper-sha256.json','build-launch.json','build-comparison.json','tool-phase-provenance.json','provenance.json','manifest-sha256.json']:
 copy(B/filename,'accepted-checkpoint/'+filename)
qm=json.loads(raw(Q/'manifest-sha256.json'));assert set(qm)=={x.relative_to(Q).as_posix()for x in Q.rglob('*')if x.is_file()and x!=Q/'manifest-sha256.json'}
for name,v in qm.items():
 b=raw(Q/name);assert v=={'sha256':sha(b),'bytes':len(b)};write('reviewed-proposal/'+name,b)
copy(Q/'manifest-sha256.json','reviewed-proposal/manifest-sha256.json')
helpers=json.loads(raw(B/'build-helper-sha256.json'))
for name,h in helpers.items():assert sha(raw(R/name))==h;copy(R/name,'build-helper-snapshot/'+name)
js('build-helper-sha256.json',helpers)
spec=importlib.util.spec_from_file_location('borrow_source_manifest',R/'scripts/build_source_manifest.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
actual=mod.source_manifest(S/'programs/pump-fees',S,R,[S/'programs/pump-fees/README.md'],cwd=R)
prefix=S.relative_to(R).as_posix()+'/';assert len(actual)==26 and {x.removeprefix(prefix):h for x,h in actual.items()}==source
js('actual-prospective-build-inputs.json',actual)
old=json.loads(raw(B/'build-launch.json'));phase=json.loads(raw(B/'tool-phase-provenance.json'));tools={}
for name,v in phase['compile']['tool_files'].items():
 p=Path(v['resolved_path']).resolve();b=p.read_bytes();assert sha(b)==old['compile_hashes_before'][name];tools[name]={'resolved_path':str(p),'sha256':sha(b),'bytes':len(b)}
strip=Path(phase['strip']['llvm_objcopy_resolved_path']).resolve();assert sha(strip.read_bytes())==old['stripper_hash_before']
cli=Path(shutil.which('cargo-build-sbf')).resolve();sdk=cli.parent/'sdk/sbf'
sdk_map=old['sdk_source_sha256'];assert len(sdk_map)==53
for name,h in sdk_map.items():assert sha(raw(sdk/name))==h;copy(sdk/name,'sdk-template/'+name)
observed=set()
for p in sdk.rglob('*'):
 if 'dependencies'in p.relative_to(sdk).parts:continue
 if p.is_file():assert not p.name.endswith('-keypair.json');observed.add(p.relative_to(sdk).as_posix())
assert observed==set(sdk_map)
cache=R/'work/fees-family-221-trial/cargo-home';assert cache.is_dir()
packages=tomllib.loads(raw(S/'Cargo.lock').decode())['package'];ledger=[];checked=0
for row in packages:
 if 'checksum'not in row:continue
 assert row['source']=='registry+https://github.com/rust-lang/crates.io-index'
 key=row['name']+'-'+row['version'];archives=sorted((cache/'registry/cache').glob('*/'+key+'.crate'));assert archives,key
 archive_rows=[];expected_files=None
 for archive in archives:
  data=raw(archive);assert sha(data)==row['checksum'],str(archive);archive_rows.append({'path':str(archive.relative_to(R)),'sha256':sha(data),'bytes':len(data)})
  if expected_files is None:
   expected_files={}
   with tarfile.open(fileobj=io.BytesIO(data))as tar:
    for member in tar.getmembers():
     path=safe(member.name);assert path.parts[0]==key
     if member.isdir():continue
     assert member.isfile(),member.name
     rel=PurePosixPath(*path.parts[1:]).as_posix();safe(rel);assert rel not in expected_files
     expected_files[rel]=sha(tar.extractfile(member).read())
 sources=sorted((cache/'registry/src').glob('*/'+key));assert sources,key;source_rows=[]
 for directory in sources:
  for name,h in expected_files.items():assert sha(raw(directory/name))==h,(key,name)
  checksum=directory/'.cargo-checksum.json';c=json.loads(raw(checksum));assert c['package']==row['checksum']and c['files']==expected_files,(key,'checksum manifest')
  extras=[]
  for path in directory.rglob('*'):
   if path.is_file():
    rel=path.relative_to(directory).as_posix()
    if rel not in expected_files:assert rel in ['.cargo-checksum.json','.cargo-ok'],(key,rel);extras.append({'path':rel,'sha256':sha(raw(path))})
  source_rows.append({'path':str(directory.relative_to(R)),'archive_payload_files':len(expected_files),'files_sha256':expected_files,'generated_registry_metadata':extras});checked+=len(expected_files)
 ledger.append({'name':row['name'],'version':row['version'],'locked_checksum':row['checksum'],'archives':archive_rows,'extracted_sources':source_rows})
js('cache-integrity.json',{'scope':'Read-only exact locked registry archives and extracted files verified against the public archive bytes; no cache writes, resolution, fetch or compiler launch.','lock_sha256':source['Cargo.lock'],'cache':str(cache.relative_to(R)),'registry_packages':len(ledger),'archive_copies':sum(len(x['archives'])for x in ledger),'source_file_copies_checked':checked,'packages':ledger})
js('tools-recheck.json',{'scope':'Read-only prebuild hashes. Future actual compile and strip observations must still be recorded separately after an authorized build.','compile_tools':tools,'strip_tool':{'resolved_path':str(strip),'sha256':sha(strip.read_bytes()),'bytes':strip.stat().st_size},'cli':{'resolved_path':str(cli),'sha256':sha(cli.read_bytes()),'bytes':cli.stat().st_size},'cli_version':subprocess.check_output([str(cli),'--version'],text=True).strip(),'sdk_template_files':sdk_map,'helper_files':helpers})
command=[str(Path(sys.executable).resolve()),str(R/'scripts/build_partial_candidate.py'),'--manifest',str(S/'programs/pump-fees/Cargo.toml'),'--program','pump_fees','--artifact-name','pump_fees_candidate.so','--tools-version','v1.44','--output',str(W/'build-01'),'--extra-input',str(S/'programs/pump-fees/README.md')]
js('build-plan.json',{'scope':'PROPOSED ONLY; root approval required before this one fixed-recipe build. No optional quote-helper fragment. Only two approved AccountInfo clone-to-borrow substitutions.','command':command,'cwd':str(R),'environment':{'CARGO_HOME':str(cache),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'},'compiler':'v1.44','unchanged_sdk_strip_expected':'v1.52','own_target_sdk_rustup':True,'source_inputs':26,'actual_prospective_source_sha256':actual,'changed_files':[n],'source_sha256_before':base[n],'source_sha256_after':source[n],'builds_executed':0,'transactions_executed':0,'excluded_keypair_policy':'Never read/hash/copy generated deployment keypairs. Only filename metadata may be recorded; no whole target archival.','later_runtime_plan':'Existing17441 baseline plus exact accepted20 strict focused comparisons and separate10step sequence; no new cases or probes. Any fresh ELF must pass new static comparisons and unchanged existing evidence guards.'})
js('baseline-identities.json',{'git_revision_at_freeze':subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip(),'accepted_checkpoint':'repro/pump_fees/donation-business-v144','accepted_manifest_sha256':sha(raw(B/'manifest-sha256.json')),'accepted_candidate_sha256':sha(raw(B/'pump_fees_candidate.so')),'accepted_symbols_sha256':sha(raw(B/'symbols.so')),'accepted_proposal':'repro/pump_fees/donation-borrow-source-proposal','accepted_proposal_manifest_sha256':sha(raw(Q/'manifest-sha256.json')),'source_count':26,'source_delta_paths':[n]})
copy(Path(__file__),'evidence-tools/prepare_prebuild.py')
print(json.dumps({'prepared':True,'changed':n,'after_sha256':source[n],'source_inputs':26,'registry_packages':len(ledger),'cache_source_files_checked':checked,'new_builds':0,'new_transactions':0},indent=2))
