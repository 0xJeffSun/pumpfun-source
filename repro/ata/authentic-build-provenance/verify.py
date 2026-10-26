"""Offline, read-only primary receipt checks. Python standard library only."""
from pathlib import Path, PurePosixPath
import argparse,datetime,hashlib,json,tomllib
P=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);args=p.parse_args()
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_bytes())
manifest=J(P/'manifest.json');assert {str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}==set(manifest)|{'manifest.json'}
for name,digest in manifest.items():assert H((P/name).read_bytes())==digest,name
D=P/'primary';facts=J(P/'findings.json');source=J(P/'source-receipts.json');tree=J(D/'best-tree.json');assert not tree['truncated'];by_path={r['path']:r for r in tree['tree']}
for r in source:
 b=(D/r['name']).read_bytes();assert len(b)==r['bytes'] and H(b)==r['sha256']
 blob=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest();assert blob==r['git_blob']==by_path[r['path']]['sha']
lock=(D/'source-Cargo.lock').read_bytes();assert len(lock)==180100 and H(lock)==facts['official_lock']['sha256']=='3c8f402f40488908503e9cc088388c1f95848d79da5141b5cb1a14006d74428b'
comparison=J(P/'candidate2-comparison.json');candidate_manifest=(P/'candidate2-source-manifest.json').read_bytes();assert H(candidate_manifest)==comparison['source_manifest_sha256'];assert json.loads(candidate_manifest)['Cargo.lock']==H(lock);assert comparison['source_commit']==facts['source_commit'] and not comparison['full_byte_equality']
best=J(D/'best-commit.json');head=J(D/'release-head-commit.json');pr=J(D/'release-pr.json');release=J(D/'release-refresh.json')
assert best['sha']==facts['source_commit']==pr['merge_commit_sha'];assert head['sha']==pr['head']['sha']==facts['pr_head_commit']
assert best['commit']['tree']['sha']==head['commit']['tree']['sha']==facts['source_tree']
# The API request used a commit ref; reconstruct real Git tree objects instead
# of assuming its response sha identifies the root tree object.
def tree_hash(directory):
 rows=[r for r in tree['tree'] if str(PurePosixPath(r['path']).parent)==(directory or '.')]
 rows.sort(key=lambda r:(PurePosixPath(r['path']).name+('/' if r['type']=='tree' else '')).encode())
 body=b''.join((str(int(r['mode']))+' '+PurePosixPath(r['path']).name).encode()+b'\0'+bytes.fromhex(r['sha']) for r in rows)
 return hashlib.sha1(b'tree '+str(len(body)).encode()+b'\0'+body).hexdigest()
for row in tree['tree']:
 if row['type']=='tree': assert tree_hash(row['path'])==row['sha']
assert tree_hash('')==facts['source_tree']
assert best['commit']['committer']['date']==facts['source_commit_time'];assert head['commit']['committer']['date']==facts['pr_head_commit_time'];assert pr['merged_at']==facts['release_pr_merged_at']
assets={a['id']:a for a in release['assets']};receipts=J(P/'asset-receipts.json');assert len(receipts)==2
for r in receipts:
 a=assets[r['asset_id']];b=(D/r['file']).read_bytes();assert H(b)==r['downloaded_sha256']==facts['captured_asset_sha256'];assert len(b)==r['downloaded_bytes']==a['size']==facts['captured_asset_bytes']==105032
 assert r['name']==a['name'] and r['created_at']==a['created_at'] and r['uploader_login']==a['uploader']['login']=='joncinque';assert a['digest'] is None and r['publisher_digest'] is None
 assert a['created_at']<head['commit']['committer']['date']<best['commit']['committer']['date']
records=[]
for name in ['access-record.json','access-record-second.json','access-record-final.json']:records+=J(P/name)
assert len(records)==facts['metadata_queries']==14
for r in records:
 b=(D/(r['name']+'.json')).read_bytes();assert len(b)==r['bytes'] and H(b)==r['sha256'] and r['status']==200 and r['pagination_link'] is None
 if r['name'].endswith('combined-status'):
  j=json.loads(b);assert j['total_count']==0 and not j['statuses']
for name,key in [('named-token-artifacts','artifacts'),('head-check-runs','check_runs')]:
 j=J(D/(name+'.json'));assert j['total_count']==0 and not j[key]
for name in ['release-pr-review-comments','release-pr-reviews']:assert J(D/(name+'.json'))==[]
anchor=tomllib.loads((D/'source-Anchor.toml').read_text());assert anchor['anchor_version']=='0.24.2' and anchor['solana_version']=='1.10.33'
workflow=(D/'source-.github_workflows_pull-request-token.yml').read_text();assert 'name: token-programs' in workflow and 'target/deploy/*.so' in workflow
assert not facts['asset_to_source_or_Cargo_unit_graph_association_proven'] and not facts['new_discriminating_build_receipt'] and not facts['experiments_authorized_by_findings'];assert facts['new_builds']==facts['new_compiler_runs']==facts['new_VM_or_chain_writes']==0
if args.repo:
 for name,digest in J(P/'prior-inputs.json').items():assert H((args.repo/name).read_bytes())==digest,name
 b=(args.repo/'evidence/dependencies/associated_token/deployed.so').read_bytes();assert H(b)==facts['captured_asset_sha256'] and len(b)==105032
print(json.dumps({'verified':True,'official_source_lock_authenticated':True,'lock_matches_candidate2':True,'release_assets_match_capture':2,'bounded_metadata_queries':14,'asset_to_original_build_association_proven':False,'new_build_or_compiler_runs':0,'live_repository_checks':args.repo is not None},indent=2))
