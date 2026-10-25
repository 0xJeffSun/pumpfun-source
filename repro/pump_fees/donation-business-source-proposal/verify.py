#!/usr/bin/env python3
"""Verify the uncompiled source proposal and retained evidence; never builds/replays."""
from pathlib import Path,PurePosixPath
import argparse,difflib,hashlib,json,subprocess,sys,tarfile,tempfile,tomllib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
args=argparse.ArgumentParser(description=__doc__);args.add_argument('--current-main',type=Path);a=args.parse_args()
if(P/'manifest-sha256.json').exists():
 found={}
 for f in P.rglob('*'):
  assert not f.is_symlink()
  if f.is_file()and f!=P/'manifest-sha256.json':found[str(f.relative_to(P))]=H(f.read_bytes())
 assert found==J(P/'manifest-sha256.json')
def archive(path):
 out={}
 with tarfile.open(path)as t:
  for m in t:
   n=PurePosixPath(m.name);assert m.isfile()and not n.is_absolute()and'..'not in n.parts and m.name not in out and not n.name.endswith('-keypair.json')
   out[m.name]=t.extractfile(m).read()
 return out
accepted=J(P/'inputs/accepted-manifest-sha256.json')
assert H((P/'inputs/accepted-manifest-sha256.json').read_bytes())=='a544615738c62279f1ebfd9dae4107b1db5640ac55f05d25f65e939933f91340'
for n in ['source-snapshot.tar.gz','source-sha256.json','build-comparison.json','main-scratch-identity.json','caller-static-proof.json']:
 assert H((P/'inputs'/('accepted-'+n)).read_bytes())==accepted[n]
base=archive(P/'inputs/accepted-source-snapshot.tar.gz');hashes={n:H(b)for n,b in base.items()}
assert len(base)==26 and hashes==J(P/'baseline-source-sha256.json')==J(P/'inputs/accepted-source-sha256.json')
assert J(P/'inputs/accepted-build-comparison.json')['source_sha256']==hashes
identity=J(P/'inputs/accepted-main-scratch-identity.json');assert identity['whole_file_equal']and identity['main_binary_sha256']=='8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e'
source={str(f.relative_to(P/'source')):f.read_bytes()for f in(P/'source').rglob('*')if f.is_file()};assert set(source)==set(base)
assert {n:H(b)for n,b in source.items()}==J(P/'proposed-source-sha256.json')
name='programs/pump-fees/src/donation.rs';assert [n for n in source if source[n]!=base[n]]==[name]
old=(P/'inputs/donation-4d3c19e.rs').read_bytes()
assert hashlib.sha1(b'blob '+str(len(old)).encode()+b'\0'+old).hexdigest()=='7aa70fde36186baf356c58ea1d61fd769e458ee0'
assert old.replace(b"pub event_authority: UncheckedAccount<'info>,",b"pub event_authority: AccountInfo<'info>,",1)==base[name]
before=base[name].decode();after=source[name].decode();start=before.index('pub fn create(ctx: Context<CreateDonationFeePda>)');end=before.index('#[derive(Accounts)]',start)
assert after==before[:start]+(P/'proposed-create.rs').read_text()+before[end:]
assert "pub event_authority: AccountInfo<'info>"in after
patch=''.join(difflib.unified_diff(before.splitlines(keepends=True),after.splitlines(keepends=True),fromfile='a/'+name,tofile='b/'+name))
assert patch==(P/'source.patch').read_text()
lock=tomllib.loads(base['Cargo.lock'].decode());packages={(r['name'],r['version']):r for r in lock['package']}
for r in J(P/'dependency-source.json'):
 b=(P/r['archive']).read_bytes();assert H(b)==r['archive_sha256']==r['lock_checksum']
 package=r['member'].split('/')[0];pkg,version=package.rsplit('-',1);assert packages[pkg,version]['checksum']==H(b)
 members=archive(P/r['archive']);z=(P/r['output']).read_bytes();assert z==members[r['member']]and H(z)==r['sha256']
cli=archive(P/'inputs/business-branches-publication.tar.gz');seal=cli['manifest-sha256.json']
assert H(seal)=='39fd03b09e8f07d29ccd3fac6ebf59d609ccb87f5b52369fb6822abbb0e8dbe5'
assert {n:H(b)for n,b in cli.items()if n!='manifest-sha256.json'}==json.loads(seal)
prov=json.loads(cli['provenance.json']);r=next(r for r in prov['sources']if r['git_path']==name)
assert H(old)==r['whole_sha256']and old[r['start_byte']:r['end_byte_exclusive']]==cli[r['file']]
with tempfile.TemporaryDirectory(prefix='donation-source-evidence-')as d:
 q=Path(d)
 for n,b in cli.items():f=q/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b)
 result=subprocess.run([sys.executable,'-B',str(q/'verify.py')],cwd=d,capture_output=True,text=True);assert result.returncode==0,(result.stdout,result.stderr)
proposal=J(P/'proposal.json');assert not proposal['candidate_elf_created']and not proposal['main_changed']and proposal['new_handlers']==proposal['new_receipts']==0
live=False
if a.current_main:
 for n,h in hashes.items():assert H((a.current_main/n).read_bytes())==h,n
 live=True
print(json.dumps({'verified':True,'uncompiled_source_hypothesis':True,'baseline_source_inputs':26,'proposed_source_inputs':26,'changed_paths':[name],'proposed_donation_sha256':H(source[name]),'accepted_AccountInfo_field_preserved':True,'crank_and_account_context_unchanged':True,'historical_to_current_field_change_rebound':True,'locked_dependency_members':len(J(P/'dependency-source.json')),'current_baseline_bound':live,'builds':0,'runtime_replays':0,'new_handlers':0,'new_receipts':0,'original_equivalence_claimed':False},indent=2))
