"""Replay only the 36 published48 suites and 56 bounded partial fixtures."""
from pathlib import Path
import concurrent.futures,gzip,hashlib,json,subprocess,sys
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if (p/'evidence/upstream/pump.json').is_file())
OUT=W/'differential';OUT.mkdir(exist_ok=False);CAND=W/'build/artifacts/pump_recovered.so'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();expected=sha(CAND);original=sha(R/'evidence/original/pump/deployed.so')
inputs=json.loads((W/'inputs-before.json').read_text())
def check():
 for group in ['harness_sha256','repository_fixture_snapshot_sha256','orchestration_sha256','main48_source_before']:
  for path,digest in inputs[group].items():assert sha(R/path)==digest,path
 assert sha(CAND)==expected
check()
specs=json.loads((R/'repro/pump/quote-control-fortyeight/replay-commands.json').read_text())['differential'];assert len(specs)==36
specs.append({'suite':'multi_hop_curve_partial','family':'partial_curve','command':[str(R/'work/test-env/bin/python'),str(W.parent/'differential.py'),'--candidate',str(CAND),'--output','placeholder']})
def run(spec):
 name=spec['suite'];path=OUT/(name+'.json.gz');cmd=spec['command'].copy();cmd[0]=sys.executable;cmd[1]=str(R/cmd[1])if not Path(cmd[1]).is_absolute()else cmd[1]
 cmd[cmd.index('--candidate')+1]=str(CAND);cmd[cmd.index('--output')+1]=str(path)
 with (OUT/(name+'.log')).open('w')as log:proc=subprocess.run(cmd,cwd=R,stdout=log,stderr=subprocess.STDOUT)
 row={'suite':name,'family':spec['family'],'command':cmd,'returncode':proc.returncode,'log_sha256':sha(OUT/(name+'.log'))}
 if path.exists():
  raw=path.read_bytes();data=json.loads(gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw);prov=data.get('provenance',{})
  row.update(case_count=data.get('case_count',len(data['cases'])),candidate_sha256=data.get('candidate_sha256',prov.get(str(CAND))),original_sha256=data.get('original_sha256',data.get('original_pump_sha256',prov.get(str(R/'evidence/original/pump/deployed.so')))),mismatches=data.get('mismatches',data.get('failures',[])),receipt_sha256=sha(path),receipt_gzip=raw.startswith(b'\x1f\x8b'))
  if name=='multi_hop_curve_partial':row['mismatches']=[c['case']for c in data['cases']if c['mismatches']]
  row['bound_hashes_match']=row['candidate_sha256']==expected and row['original_sha256']==original
 print(json.dumps(row),flush=True);return row
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:rows=list(pool.map(run,specs))
(OUT/'run.json').write_text(json.dumps(rows,indent=2)+'\n');check()
for row in rows:assert row['returncode']==0 and row.get('bound_hashes_match')and not row['mismatches'],row
assert sum(r['case_count']for r in rows)==9217
assert next(r['case_count']for r in rows if r['suite']=='multi_hop_curve_partial')==56
summary={'candidate_sha256':expected,'original_sha256':original,'suite_count':37,'published48_suites':36,'published48_cases':9161,'partial_curve_cases':56,'case_count':9217,'inputs_unchanged':True,'full_byte_equality':False,'mismatches':[]}
(OUT/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary),flush=True)
