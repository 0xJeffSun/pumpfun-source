#!/usr/bin/env python3
"""Read-only frozen prebuild validation. Does not compile or execute target programs."""
from pathlib import Path,PurePosixPath
import argparse,difflib,hashlib,json,subprocess,sys,tomllib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(n):
 p=PurePosixPath(n);assert not p.is_absolute()and'..'not in p.parts and not p.name.endswith('-keypair.json')
 f=P/p;assert not f.is_symlink();return f.read_bytes()
def read(n):return json.loads(raw(n))
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);ap.add_argument('--recheck-environment',action='store_true');a=ap.parse_args()
 manifest=read('manifest-sha256.json');actual=set()
 for p in P.rglob('*'):
  assert not p.is_symlink()
  if p.is_file()and p!=P/'manifest-sha256.json':actual.add(p.relative_to(P).as_posix())
 assert actual==set(manifest)
 for n,v in manifest.items():b=raw(n);assert v=={'sha256':sha(b),'bytes':len(b)},n
 base=read('baseline-source-sha256.json');source=read('source-sha256.json');n='programs/pump-fees/src/donation.rs'
 assert len(base)==len(source)==26 and set(base)==set(source)and[x for x in base if base[x]!=source[x]]==[n]
 assert base==read('accepted-checkpoint/source-sha256.json')and n in base
 for key,h in base.items():assert sha(raw('baseline-source/'+key))==h
 for key,h in source.items():assert sha(raw('source/'+key))==h
 before=raw('baseline-source/'+n);after=raw('source/'+n);expected=before
 for x,y in [(b'let info=ctx.accounts.pool.to_account_info();',b'let info = &ctx.accounts.pool;'),(b'let sharing=ctx.accounts.sharing_config.to_account_info();',b'let sharing = &ctx.accounts.sharing_config;')]:assert expected.count(x)==1;expected=expected.replace(x,y)
 assert expected==after and sha(before)=='a99db3b6156a3009e805ea24ca087d1bea1eb28b90be076dda024f30ac0a14b9'
 assert sha(after)=='540a659ea7d2867db556b2dc95a2b085fb99e4d34d59fc211488c33910d2d40b'
 patch=''.join(difflib.unified_diff(before.decode().splitlines(True),after.decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n)).encode()
 assert patch==raw('source.patch')==raw('reviewed-proposal/borrowed-accounts.patch')
 assert source['programs/pump-fees/README.md']==base['programs/pump-fees/README.md']
 proposal=read('reviewed-proposal/manifest-sha256.json')
 assert sha(raw('reviewed-proposal/manifest-sha256.json'))==read('baseline-identities.json')['accepted_proposal_manifest_sha256']
 for key,h in proposal.items():assert sha(raw('reviewed-proposal/'+key))==h
 p=subprocess.run([sys.executable,'-B',str(P/'reviewed-proposal/verify.py')],cwd='/',capture_output=True,text=True);assert p.returncode==0,p.stderr
 recorded=read('actual-prospective-build-inputs.json');assert len(recorded)==26
 assert {x[x.index('programs/pump-fees/'):]:h for x,h in recorded.items()if'programs/pump-fees/'in x}=={x:h for x,h in source.items()if x.startswith('programs/pump-fees/')}
 assert sorted(recorded.values())==sorted(source.values())
 tools=read('tools-recheck.json');old=read('accepted-checkpoint/build-launch.json')
 assert {n:v['sha256']for n,v in tools['compile_tools'].items()}==old['compile_hashes_before']
 assert tools['strip_tool']['sha256']==old['stripper_hash_before']
 assert tools['sdk_template_files']==old['sdk_source_sha256']
 for key,h in tools['helper_files'].items():assert sha(raw('build-helper-snapshot/'+key))==h
 for key,h in tools['sdk_template_files'].items():assert sha(raw('sdk-template/'+key))==h
 cache=read('cache-integrity.json');locked=tomllib.loads(raw('source/Cargo.lock').decode())['package'];expected={(x['name'],x['version']):x['checksum']for x in locked if'checksum'in x}
 assert cache['lock_sha256']==source['Cargo.lock']and cache['registry_packages']==len(cache['packages'])==len(expected)==252
 assert {(x['name'],x['version']):x['locked_checksum']for x in cache['packages']}==expected
 checked=0
 for row in cache['packages']:
  assert row['archives']and row['extracted_sources']
  for archive in row['archives']:assert archive['sha256']==row['locked_checksum']
  for extracted in row['extracted_sources']:assert len(extracted['files_sha256'])==extracted['archive_payload_files'];checked+=extracted['archive_payload_files']
 assert checked==cache['source_file_copies_checked']==13306
 plan=read('build-plan.json');assert plan['builds_executed']==plan['transactions_executed']==0
 assert plan['actual_prospective_source_sha256']==recorded and plan['source_sha256_before']==base[n]and plan['source_sha256_after']==source[n]
 assert plan['compiler']=='v1.44'and plan['unchanged_sdk_strip_expected']=='v1.52'and plan['source_inputs']==26
 if a.repo:
  root=a.repo.resolve()
  for key,h in base.items():assert sha((root/key).read_bytes())==h,('current main',key)
  for key,h in tools['helper_files'].items():assert sha((root/key).read_bytes())==h,('current helper',key)
 if a.recheck_environment:
  assert a.repo is not None
  for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert sha(Path(v['resolved_path']).read_bytes())==v['sha256']
  for row in cache['packages']:
   for archive in row['archives']:assert sha((root/archive['path']).read_bytes())==archive['sha256']
   for extracted in row['extracted_sources']:
    for key,h in extracted['files_sha256'].items():assert sha((root/extracted['path']/key).read_bytes())==h
 print(json.dumps({'status':'PASS','payloads':len(manifest),'source_inputs':26,'changed_source_files':1,'approved_substitutions':2,'proposed_donation_sha256':source[n],'registry_packages':252,'source_file_copies_checked':checked,'main_checked':bool(a.repo),'environment_rechecked':a.recheck_environment,'new_builds':0,'new_transactions':0},indent=2))
if __name__=='__main__':main()
