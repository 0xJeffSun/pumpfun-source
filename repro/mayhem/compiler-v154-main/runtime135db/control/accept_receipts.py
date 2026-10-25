"""Saved receipt/case/diagnostic acceptance only; no VM/network."""
from pathlib import Path
import json,gzip,hashlib,sys
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if b[:2]==b'\x1f\x8b'else b)
def canon(j):return json.dumps(j,sort_keys=True,separators=(',',':'))
def jobs(j):
 out=[]
 for r in j:
  args=r['args'].copy()
  for i,v in enumerate(args):
   if i and args[i-1]=='--cases':assert'/repro/mayhem/'in v;args[i]='repro/mayhem/'+v.split('/repro/mayhem/',1)[1]
   elif i and args[i-1]=='--fixtures':assert v.endswith('/burn-fixtures');args[i]='burn-fixtures'
  out.append({'name':r['name'],'script':r['script'],'args':args})
 return out
if __name__=='__main__':
 W=Path(sys.argv[1]);B=P/'baseline6129';g=J(P/'inputs.json');assert jobs(J(W/'replay-plan.json'))==jobs(J(B/'replay-plan.json'));assert len(J(W/'replay-attempts.json'))==21 and all(r['returncode']==0 for r in J(W/'replay-attempts.json'))
 assert J(W/'summary.json')['instruction_comparisons']==9595 and J(W/'summary.json')['suites']==21 and J(W/'summary.json')['functional_mismatches']==0
 binding=[]
 for suite in J(B/'summary.json')['rows']:
  name=suite['name'];old=read(B/('replay/burn/comparison.json'if name=='burn'else'replay/'+name+'.json.gz'));f=W/('replay/burn/comparison.json'if name=='burn'else'replay/'+name+'.json');new=read(f);assert new['case_count']==old['case_count']
  if name=='burn':
   assert new['input_sha256']['repro/mayhem/result-error-candidate.so']==g['candidate'];assert new['program_loading']==old['program_loading'];assert[new['cases'][i]['mint']for i in range(3)]==[old['cases'][i]['mint']for i in range(3)]
   for row in new['cases']:assert row['candidate']['binary_sha256']==g['candidate']
  else:
   assert new['candidate_sha256']==g['candidate']and new['original_sha256']==old['original_sha256'];assert[newrow['case']for newrow in new['cases']]==[oldrow['case']for oldrow in old['cases']]
  binding.append({'suite':name,'receipt_sha256':H(f),'candidate_sha256':g['candidate'],'case_parameters_and_order_match_frozen_baseline':True,'actual_candidate_load_evidence':'Frozen runner always uses add_program_from_file(candidate); successful actual calls plus exact per-suite candidate hash, not SDK warning inference'})
 old=J(B/'diagnostic-differences.json');new=J(W/'diagnostic-differences.json');assert len(old)==61
 key=lambda r:canon({'suite':r['suite'],'case':r['case']});lookup={key(r):r for r in new};oldkeys={key(r)for r in old};assert len(oldkeys)==61;assert set(lookup)<=oldkeys,'New diagnostic domain requires separate review; raw rows preserved'
 rows=[]
 for r in old:
  fresh=lookup.get(key(r));status='resolved'if fresh is None else'unchanged_raw_diagnostic'if fresh==r else'changed_retained_diagnostic'
  if fresh:assert fresh['original_logs']==r['original_logs']
  rows.append({'baseline':r,'current':fresh,'status':status})
 report={'passed':True,'candidate':g['candidate'],'source14':g['source14'],'instruction_comparisons':9595,'suites':21,'metadata_only_candidate_rebind':True,'source_map_rewrite_required':False,'existing61diagnostics':rows,'current_diagnostic_rows':len(new),'receipt_bindings':binding,'new_unique_cases':0,'sdk_allowlist_authority_decisive':False,'promotion_authorized':False}
 (W/'retarget-acceptance.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items()if k not in['existing61diagnostics','receipt_bindings','source14']}))
