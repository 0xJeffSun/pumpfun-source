#!/usr/bin/env python3
"""Portable static proposal verification only. No builds, transactions or target execution."""
import argparse
import difflib
import gzip
import hashlib
import json
from pathlib import Path, PurePosixPath
import stat
import sys
import tarfile
import tomllib
sys.dont_write_bytecode = True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()

def safe(n):
 p=PurePosixPath(n)
 assert n and not p.is_absolute() and str(p)==n and '..' not in p.parts,n
 assert '__pycache__' not in p.parts and p.suffix not in ('.pyc','.pyo') and not p.name.endswith('-keypair.json'),n
 return p

def verify(repo):
 files={}
 for f in P.rglob('*'):
  n=f.relative_to(P).as_posix();safe(n)
  mode=f.lstat().st_mode;assert stat.S_ISDIR(mode) or stat.S_ISREG(mode),n
  if stat.S_ISREG(mode):files[n]=f
 mb=(P/'manifest.json').read_bytes();assert H(mb)==(P/'manifest.sha256').read_text().strip(),'seal'
 m=json.loads(mb);assert set(files)==set(m['files'])|{'manifest.json','manifest.sha256'},'payload set'
 for n,v in m['files'].items():
  safe(n);b=files[n].read_bytes();assert {'sha256':H(b),'bytes':len(b)}==v,n
 origins=json.loads((P/'input-origins.json').read_text())
 for n,v in origins.items():
  b=(P/n).read_bytes();assert H(b)==v['sha256'] and len(b)==v['bytes'],n
 source=json.loads((P/'inputs/current-source-sha256.json').read_text());assert len(source)==26
 for n,h in source.items():
  safe(n);assert H((P/'inputs/current-source'/n).read_bytes())==h,n
  if repo:assert H((repo/n).read_bytes())==h,('repo changed',n)
 lock=tomllib.loads((P/'inputs/current-source/Cargo.lock').read_text());locked={(x['name'],x['version']):x for x in lock['package']}
 deps=json.loads((P/'inputs/locked-dependencies.json').read_text());assert len(deps)==8
 for d in deps:
  a=P/d['archive_path'];assert H(a.read_bytes())==d['archive_sha256']==locked[d['name'],d['version']]['checksum']
  prefix=d['name']+'-'+d['version']
  with tarfile.open(a) as tf:
   for n,h in d['source_files'].items():
    safe(n);b=tf.extractfile(prefix+'/'+n).read();assert H(b)==h and b==(P/'inputs/locked'/prefix/n).read_bytes()
 from analyze import run
 evidence=run();assert evidence==json.loads((P/'static-evidence.json').read_text()),'static evidence changed'
 assert evidence['identities']['candidate']=={'bytes':770016,'sha256':'5cf8d567934188d1307d2f9f3d2220ede52f6978e389064b08897441fbdd7d49'}
 assert evidence['identities']['symbols']['sha256']=='99ac87e9b79e86e23d7458400475d5d967545e345767d0263d544bfd02660a07'
 proposal=json.loads((P/'proposal-source-map.json').read_text())
 assert set(proposal)=={'programs/pump-fees/src/social.rs','programs/pump-fees/src/instructions/fee_sharing/mod.rs'}
 patch=[]
 for n,r in proposal.items():
  before=(P/'inputs/current-source'/n).read_bytes();after=(P/'proposal'/n).read_bytes()
  assert H(before)==r['before_sha256'] and H(after)==r['after_sha256']
  patch.extend(difflib.unified_diff(before.decode().splitlines(keepends=True),after.decode().splitlines(keepends=True),fromfile='a/'+n,tofile='b/'+n))
 assert ''.join(patch)==(P/'social-ata-helper.patch').read_text(),'patch'
 # Check the proposal leaves all accepted native code/context/transfer/event bytes intact.
 a=(P/'inputs/current-source/programs/pump-fees/src/social.rs').read_text()
 b=(P/'proposal/programs/pump-fees/src/social.rs').read_text()
 assert a[:a.index('   amount=token_amount(')]==b[:b.index('   crate::instructions::fee_sharing::admit_associated_token_account(')]
 assert a[a.index('   let platform=[state.platform]'):a.index('fn token_amount(')]==b[b.index('   let platform=[state.platform]'):b.index('#[derive(Accounts)]\n#[instruction(user_id:String,platform:u8)]\npub struct ClaimSocialFeePdaV2')]
 assert a[a.index('#[derive(Accounts)]\n#[instruction(user_id:String,platform:u8)]\npub struct ClaimSocialFeePdaV2'):]==b[b.index('#[derive(Accounts)]\n#[instruction(user_id:String,platform:u8)]\npub struct ClaimSocialFeePdaV2'):]
 assert 'token_amount' not in b
 review=json.loads((P/'saved-evidence-review.json').read_text())
 r=(P/review['source_file']).read_bytes();assert H(r)==review['source_sha256']
 suite=json.loads(gzip.decompress(r))['suites'][review['suite']]
 assert len(suite['cases'])==review['suite_cases']==627 and all(x['match'] for x in suite['cases'])
 assert suite['candidate_sha256']==evidence['identities']['candidate']['sha256']
 assert len(review['selected'])==13
 for entry in review['selected']:
  c=suite['cases'][entry['index']];assert c['case']==entry['case'] and c['match']==entry['match']
  for side in ['original','candidate']:
   assert c[side]['error']==entry[side+'_error']
   assert H(c[side]['transaction_base64'].encode())==entry[side+'_transaction_sha256']
   assert H(json.dumps(c[side]['inner'],sort_keys=True).encode())==entry[side+'_inner_sha256']
 result=json.loads((P/'result.json').read_text());assert result['builds']==result['target_executions']==result['new_runtime_cases']==0
 assert result['runtime_validated_proposal'] is False and result['original_full_byte_equal'] is False
 print(json.dumps({'status':'PASS','payload_files':len(m['files']),'source_inputs':26,'locked_archives':8,'proposal_files':2,'complete_helper_bytes':6080,'helper_direct_targets':17,'matched_direct_targets':16,'decoded_six_account_drop':True,'historical_social_cases':627,'historical_selected_cases':13,'current_source_checked':bool(repo),'new_builds':0,'new_transactions':0,'proposal_runtime_accepted':False},sort_keys=True))

if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);args=ap.parse_args()
 verify(args.repo.resolve() if args.repo else None)
