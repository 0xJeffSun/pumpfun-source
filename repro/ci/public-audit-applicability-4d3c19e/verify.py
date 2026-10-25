#!/usr/bin/env python3
"""Check frozen public source applicability only; no compiler/runtime/network."""
from pathlib import Path
import argparse,csv,hashlib,json,subprocess
from analyze import ROOT,J,H,analyze,blob

def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--repo',type=Path);p.add_argument('--git-repo',type=Path);a=p.parse_args();seal=J(ROOT/'manifest-sha256.json')
 assert not any(f.is_symlink()for f in ROOT.rglob('*'))
 assert {str(f.relative_to(ROOT)):H(f.read_bytes())for f in ROOT.rglob('*')if f.is_file()and f!=ROOT/'manifest-sha256.json'and'__pycache__'not in f.parts}==seal
 result=analyze();assert result==J(ROOT/'applicability.json');prov=J(ROOT/'provenance.json')
 gitsha=lambda b:hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
 for row in prov['audit_files']:assert gitsha((ROOT/row['saved']).read_bytes())==row['git_blob']
 for row in prov['sources']:
  for side in ['base','current']:
   if row[side]:assert gitsha((ROOT/row[side]['saved']).read_bytes())==row[side]['git_blob']
 for group in ['functions','contexts']:
  with(ROOT/(group+'.csv')).open(newline='')as f:rows=list(csv.reader(f))[1:]
  assert len(rows)==len(result[group])
  for actual,row in zip(rows,result[group]):
   m=row['source_correspondence'];old,new=m['base'],m['current'];expected=[row['program'],row['name'],old['path'],str(old['line_start'])+'-'+str(old['line_end']),new['path'],str(new['line_start'])+'-'+str(new['line_end']),str(m['span_text_equal']),m['status'],','.join(row['rereview_obligations']),str(row['excluded_boundary_retained'])];assert actual==expected
 changed=next(x for x in result['functions']if x['name']=='update_fee_config'and x['program']=='pump_amm');c=changed['source_correspondence']['current'];body=blob('current',c['path'])[c['byte_start']:c['byte_end_exclusive']]
 sequence=[b'require_gte!(1000u64, lp_fee_basis_points',b'config.lp_fee_basis_points = lp_fee_basis_points;',b'require_gte!(1000u64, protocol_fee_basis_points',b'config.protocol_fee_basis_points = protocol_fee_basis_points;',b'for recipient in protocol_fee_recipients.iter()',b'for i in 1..8',b'config.protocol_fee_recipients = protocol_fee_recipients;',b'require_gte!(1000u64, coin_creator_fee_basis_points',b'config.coin_creator_fee_basis_points = coin_creator_fee_basis_points;']
 positions=[body.index(x)for x in sequence];assert positions==sorted(positions)
 macro=(ROOT/'audit/audit_amm/dependencies/anchor-lang-0.31.1/src/lib.rs').read_text();assert 'macro_rules! require_gte'in macro and 'return Err(error!($error_code).with_values(($value1, $value2)))'in macro
 review=J(ROOT/'changed-source-review.json');assert not review['whole_program_security_signoff']and not review['F05_followup_lead']['observation_F05_resolved']
 if a.git_repo:
  for row in prov['audit_files']:
   data=subprocess.check_output(['git','-C',str(a.git_repo),'show',prov['current_commit']+':'+row['source']]);assert H(data)==row['sha256']
  for row in prov['sources']:
   for side,commit in [('base',prov['base_commit']),('current',prov['current_commit'])]:
    if row[side]:
     data=subprocess.check_output(['git','-C',str(a.git_repo),'show',commit+':'+row['path']]);assert H(data)==row[side]['sha256']
 if a.repo:
  for row in prov['audit_files']:assert H((a.repo/row['source']).read_bytes())==row['sha256'],row['source']
  for row in prov['sources']:assert H((a.repo/row['path']).read_bytes())==row['current']['sha256'],row['path']
 print(json.dumps({'verified':True,'sealed_files':len(seal),'base_commit':prov['base_commit'],'current_commit':prov['current_commit'],'counts':result['counts'],'all_primary_observation_spans_preserved':True,'security_signoff':False,'original_vulnerabilities_proven':False,'runtime_probes':0,'builds':0,'stopped_lanes_reopened':False,'live_sources_checked':bool(a.repo),'exact_git_commits_checked':bool(a.git_repo)},indent=2))
if __name__=='__main__':main()
