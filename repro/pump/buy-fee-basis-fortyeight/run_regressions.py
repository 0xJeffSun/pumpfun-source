"""Replay unchanged 36 baseline suites, partial56 and two-curve20; no new cases."""
from pathlib import Path
import concurrent.futures,gzip,hashlib,json,subprocess,sys
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if (p/'evidence/upstream/pump.json').is_file())
OUT=W/'differential';OUT.mkdir(exist_ok=False);CAND=W/'build-01/artifacts/pump_recovered.so'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();expected=sha(CAND);original=sha(R/'evidence/original/pump/deployed.so')
inputs=json.loads((W/'inputs-before.json').read_text())
def check():
 for group in ['harness_sha256','repository_fixture_snapshot_sha256','published_additional_inputs','runtime_layer_sha256','baseline_main_source','compiler_source_sha256']:
  for path,digest in inputs[group].items():assert sha(R/path)==digest,path
 assert sha(CAND)==expected
check()
specs=json.loads((R/'repro/pump/quote-control-fortyeight/replay-commands.json').read_text())['differential'];assert len(specs)==36
specs.append({'suite':'multi_hop_curve_partial','family':'partial_curve','command':[str(R/'work/test-env/bin/python'),str(R/'repro/pump/native-curve-partial-fortyeight/harness/pump_multi_hop_curve_differential.py'),'--candidate',str(CAND),'--output','placeholder']})
specs.append({'suite':'tokenkeg_two_curve','family':'partial_curve_two','command':[str(R/'work/test-env/bin/python'),str(R/'repro/pump/nested-general-route-fortyeight/harness/pump_tokenkeg_two_curve_differential.py'),'--candidate',str(CAND),'--output','placeholder']})
def run(spec):
 name=spec['suite'];path=OUT/(name+'.json.gz');cmd=spec['command'].copy();cmd[0]=sys.executable;cmd[1]=str(R/cmd[1])if not Path(cmd[1]).is_absolute()else cmd[1]
 cmd[cmd.index('--candidate')+1]=str(CAND);cmd[cmd.index('--output')+1]=str(path)
 with (OUT/(name+'.log')).open('w')as log:proc=subprocess.run(cmd,cwd=R,stdout=log,stderr=subprocess.STDOUT)
 row={'suite':name,'family':spec['family'],'command':cmd,'returncode':proc.returncode,'log_sha256':sha(OUT/(name+'.log'))}
 if path.exists():
  raw=path.read_bytes();data=json.loads(gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw);prov=data.get('provenance',{});bound=data.get('bound_inputs_sha256',{})
  row.update(case_count=data.get('case_count',data['cases']if isinstance(data['cases'],int)else len(data['cases'])),candidate_sha256=data.get('candidate_sha256',bound.get(str(CAND.relative_to(R)),prov.get(str(CAND)))),original_sha256=data.get('original_sha256',data.get('original_pump_sha256',bound.get('evidence/original/pump/deployed.so',prov.get(str(R/'evidence/original/pump/deployed.so'))))),mismatches=data.get('mismatches',data.get('failures',[])),receipt_sha256=sha(path),receipt_gzip=raw.startswith(b'\x1f\x8b'))
  if name=='tokenkeg_two_curve':
   row['original_sha256']=prov['repository_inputs']['evidence/original/pump/deployed.so'];row['mismatches']=[c['case']for c in data['cases']if c['mismatches']]
  if name=='multi_hop_curve_partial':row['mismatches']=[c['case']for c in data['cases']if c['mismatches']]
  row['bound_hashes_match']=row['candidate_sha256']==expected and row['original_sha256']==original
 print(json.dumps(row),flush=True);return row
rows=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:
 pending={};remaining=iter(specs);failed=False
 def submit():
  try:spec=next(remaining)
  except StopIteration:return False
  pending[pool.submit(run,spec)]=spec;return True
 for _ in range(3):submit()
 while pending:
  done,_=concurrent.futures.wait(pending,return_when=concurrent.futures.FIRST_COMPLETED)
  for future in done:
   pending.pop(future);row=future.result();rows.append(row);failed=failed or row['returncode']!=0 or not row.get('bound_hashes_match')or bool(row.get('mismatches'))
  (OUT/'run.json').write_text(json.dumps(rows,indent=2)+'\n')
  if not failed:
   for _ in done:submit()
assert not failed,'Discrepancy preserved; no further suites scheduled'
(OUT/'run.json').write_text(json.dumps(rows,indent=2)+'\n');check()
for row in rows:assert row['returncode']==0 and row.get('bound_hashes_match')and not row['mismatches'],row
assert sum(r['case_count']for r in rows)==9237
assert next(r['case_count']for r in rows if r['suite']=='multi_hop_curve_partial')==56
summary={'candidate_sha256':expected,'original_sha256':original,'suite_count':38,'published48_suites':36,'published48_cases':9161,'partial_curve_cases':56,'two_curve_cases':20,'case_count':9237,'inputs_unchanged':True,'full_byte_equality':False,'mismatches':[]}
(OUT/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary),flush=True)
