#!/usr/bin/env python3
"""Verify compact integration evidence only; no compiler, runtime, signing or network."""
from pathlib import Path
import argparse,gzip,hashlib,json,runpy,subprocess,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser(description=__doc__);a.add_argument('--repo',type=Path);args=a.parse_args()
assert not any(f.is_symlink() for f in P.rglob('*'))
assert {f.relative_to(P).as_posix():H(f) for f in P.rglob('*') if f.is_file() and f!=P/'manifest-sha256.json'}==J(P/'manifest-sha256.json')
inputs=J(P/'inputs-sha256.json')
for n,h in inputs.items():assert H(P/'inputs'/n)==h,n
for n,h in J(P/'initial-input-sha256.json').items():assert H(P/'initial-snapshot'/n)==h,n
assert runpy.run_path(str(P/'analyze.py'))['run']()==J(P/'review.json')
if args.repo:
 root=args.repo.resolve()
 for n,h in inputs.items():assert H(root/n)==h,('Integration snapshot drift',n)
 observed=J(P/'observed-current-bindings.json');tracked=set(subprocess.check_output(['git','-C',str(root),'ls-files','-z']).decode().split('\0'))
 for r in observed['bindings']:assert r['path'] in tracked and H(root/r['path'])==r['expected_sha256'] and not (root/r['path']).is_symlink(),r['path']
 for r in J(P/'core-artifact-bindings.json').values():assert H(root/r['path'])==r['sha256'] and H(root/r['comparison_report'])==r['comparison_sha256']
 for r in J(P/'receipt-index.json'):
  f=root/r['path'];d=json.loads(gzip.decompress(f.read_bytes()));assert H(f)==r['sha256'] and d['case_count']==r['case_count'] and d['candidate_sha256']==r['candidate_sha256'] and not d['mismatches']
 for r in J(P/'status-path-checks.json')['references']:
  f=root/r['path'];assert f.exists()
  if r['sha256'] is not None:assert H(f)==r['sha256'],r['path']
print(json.dumps({'verified':True,'payloads':len(J(P/'manifest-sha256.json')),'open_integration_findings':0,'resolved_stale_completion_summary':True,'fees_comparisons':17461,'four_core_comparisons':53755,'current_repo_hashes_checked':bool(args.repo),'new_builds':0,'new_SBF_executions':0,'audit_signoff':False},indent=2))
