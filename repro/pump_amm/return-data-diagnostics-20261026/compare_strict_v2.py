#!/usr/bin/env python3
"""Compare strict oracle logs with complete ordered residuals; numeric omissions remain mismatches."""
import argparse,hashlib,json,re,difflib
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
 blocks=[]
 for tag,a0,a1,b0,b1 in difflib.SequenceMatcher(a=u,b=v,autojunk=False).get_opcodes():
  if tag!='equal':blocks.append({'operation':tag,'original_range':[a0,a1],'candidate_range':[b0,b1],'original':u[a0:a1],'candidate':v[b0:b1]})
 missing_numeric=[z for block in blocks for z in block['original'] if z.startswith(('Program log: Left:','Program log: Right:'))]
 rows.append({'suite':row['suite'],'length':row['length'],'non_log_differences':nl,'full_log_match_under_declared_mapping':u==v,'missing_numeric_diagnostics':missing_numeric,'all_unmatched_log_blocks':blocks})
result={'report_sha256':hashlib.sha256(a.report.read_bytes()).hexdigest(),'genuine_candidate_sha256':r['genuine_candidate_sha256'],'scope':__doc__,'supersedes_summary':'The prior claim that all five exact-length residuals were only source origins was incorrect: curve_sell16 is missing Left/Right numeric diagnostics. Original raw receipts and comparison-v1 remain unchanged.','exact_panic_prefix_map':MAP,'non_log_matches':sum(not v['non_log_differences']for v in rows),'full_log_matches':sum(v['full_log_match_under_declared_mapping']for v in rows),'case_count':len(rows),'numeric_diagnostic_gap_cases':sum(bool(x['missing_numeric_diagnostics'])for x in rows),'rows':rows}
a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items()if k not in ['rows','exact_panic_prefix_map']}))
