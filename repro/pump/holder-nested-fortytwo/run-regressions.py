"""Run unchanged main41 suites and two frozen independent suites against one ELF."""
from pathlib import Path
import ast,concurrent.futures,gzip,hashlib,json,subprocess,sys
W=Path(__file__).resolve().parent;R=W.parents[1];OUT=W/'differential';OUT.mkdir(exist_ok=False)
CAND=W/'build/artifacts/pump_recovered.so';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();expected=sha(CAND)
inputs=json.loads((W/'inputs-before.json').read_text())
def verify_inputs():
 for group in ['harness_sha256','repository_fixture_snapshot_sha256','orchestration_sha256','main41_source_before']:
  for p,h in inputs[group].items():assert sha(R/p)==h,p
 assert sha(CAND)==expected
verify_inputs()
tree=ast.parse((R/'scripts/pump_validate_all.py').read_text())
baseline=next(ast.literal_eval(n.value)for n in tree.body if isinstance(n,ast.Assign)and any(isinstance(x,ast.Name)and x.id=='SUITES'for x in n.targets))
assert len(baseline)==33
commands=[('main41',name,filename)for name,filename in baseline]+[('focused','holder_distribution','pump_holder_distribution_differential.py'),('focused','nested_create','pump_create_nested_differential.py')]
original=sha(R/'evidence/original/pump/deployed.so')
def run(spec):
 family,name,filename=spec;output=OUT/(name+'.json.gz');cmd=[sys.executable,str(R/'scripts'/filename),'--candidate',str(CAND),'--output',str(output)]
 with (OUT/(name+'.log')).open('w')as log:p=subprocess.run(cmd,cwd=R,stdout=log,stderr=subprocess.STDOUT)
 row={'family':family,'suite':name,'command':cmd,'returncode':p.returncode,'log_sha256':sha(OUT/(name+'.log'))}
 if output.exists():
  raw=output.read_bytes();report=json.loads(gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw)
  count=report.get('case_count',len(report['cases']));provenance=report.get('provenance',{})
  row.update(case_count=count,candidate_sha256=report.get('candidate_sha256',provenance.get(str(CAND))),original_sha256=report.get('original_sha256',provenance.get(str(R/'evidence/original/pump/deployed.so'))),mismatches=report.get('mismatches',report.get('failures',[])))
  row['bound_hashes_match']=row['candidate_sha256']==expected and row['original_sha256']==original
  # Preserve actual runner bytes, even when a legacy script ignored the suffix.
  row['receipt_sha256']=sha(output);row['receipt_gzip']=raw.startswith(b'\x1f\x8b')
 print(json.dumps(row),flush=True);return row
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:rows=list(pool.map(run,commands))
(OUT/'run.json').write_text(json.dumps(rows,indent=2)+'\n');verify_inputs()
for row in rows:assert row['returncode']==0 and row.get('bound_hashes_match')and not row['mismatches'],row
counts={family:sum(r['case_count']for r in rows if r['family']==family)for family in ['main41','focused']}
assert counts=={'main41':7957,'focused':697},counts
assert next(r['case_count']for r in rows if r['suite']=='holder_distribution')==649
assert next(r['case_count']for r in rows if r['suite']=='nested_create')==48
summary={'scope':'33 unchanged main41 suites plus holder649 and nested48; no new trade-fee or extension probes.',
 'candidate_sha256':expected,'original_sha256':original,'case_count':sum(counts.values()),'group_cases':counts,
 'suite_count':len(rows),'suites':{r['suite']:r['case_count']for r in rows},'mismatches':[],'inputs_unchanged':True}
(OUT/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary),flush=True)
