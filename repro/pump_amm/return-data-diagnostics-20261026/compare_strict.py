#!/usr/bin/env python3
"""Compare strict oracle observations using exact known panic-site mappings only."""
import argparse,hashlib,json,re
from pathlib import Path
MAP={
 'Program log: panicked at src/lib.rs:41:1:\n':'Program log: panicked at programs/pump-amm/src/lib.rs:23:1:\n',
 'Program log: panicked at src/multi_hop.rs:893:39:\n':'Program log: panicked at programs/pump-amm/src/lib.rs:22:1:\n',
 'Program log: panicked at src/multi_hop.rs:894:30:\n':'Program log: panicked at programs/pump-amm/src/lib.rs:22:1:\n',
}
def norm(logs):
 out=[]
 for log in logs:
  if re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',log):continue
  for before,after in MAP.items():
   if log.startswith(before):log=after+log[len(before):];break
  out.append(log)
 return out
p=argparse.ArgumentParser(description=__doc__);p.add_argument('--report',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();r=json.loads(a.report.read_text());rows=[]
for row in r['cases']:
 x,y=row['original'],row['candidate'];nl=[k for k in x if k!='logs'and x[k]!=y[k]];u,v=norm(x['logs']),norm(y['logs'])
 rows.append({'suite':row['suite'],'length':row['length'],'non_log_differences':nl,'full_log_match_under_declared_mapping':u==v,'residual':None if u==v else {'original':[z for z in u if z not in v],'candidate':[z for z in v if z not in u]}})
result={'report_sha256':hashlib.sha256(a.report.read_bytes()).hexdigest(),'genuine_candidate_sha256':r['genuine_candidate_sha256'],'scope':__doc__,'exact_panic_prefix_map':MAP,'non_log_matches':sum(not v['non_log_differences']for v in rows),'full_log_matches':sum(v['full_log_match_under_declared_mapping']for v in rows),'case_count':len(rows),'rows':rows}
a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items()if k not in ['rows','exact_panic_prefix_map']}))
