#!/usr/bin/env python3
"""Portable wrapper for the unchanged independent Pump review; no build or VM."""
from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys,tempfile
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=json.loads((P/'manifest.json').read_text())
assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().strip()
actual={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in [P/'manifest.json',P/'manifest.sha256']}
assert actual==set(m['files']),'Unexpected/missing package file'
for n,h in m['files'].items():assert H(P/n)==h,n
scratch=json.loads((P/'provenance/scratch-manifest.json').read_text())
assert H(P/'provenance/scratch-manifest.json')==(P/'provenance/scratch-manifest.sha256').read_text().split()[0]
history=json.loads((P/'history/manifest.json').read_text())
for n,h in history.items():assert H(P/'history'/n)==h,n
for row in json.loads((P/'input-origins.json').read_text()):
 assert H(P/row['packaged'])==row['sha256']
 if row['source'].startswith('repro/pump/buy-fee-basis-fortyeight/'):
  n=row['source'].removeprefix('repro/pump/buy-fee-basis-fortyeight/')
  if n not in ['manifest.json','manifest.sha256']:assert scratch[n]['sha256']==row['sha256'],n
 elif row['source'].startswith('research/'):
  assert row['source']=='research/imported-lab/analysis/pump_fun/curve-fresh-trades-v3-signed-surfpool.json' and row['sha256']=='54d69dd4f11a61cc6cea3076e3e89fd4aa31ea6ff835f8ea316646a7b1642920'
 elif row['source'].startswith('original independent review '):
  n=row['source'].removeprefix('original independent review ')
  if n!='manifest.json':assert history[n]==row['sha256']
 else:raise AssertionError(row['source'])
with tempfile.TemporaryDirectory(prefix='pump-independent-portable-',dir=P.parent)as td:
 R=Path(td);W=R/'work/pump-buy-fee-basis-independent-review';W.mkdir(parents=True)
 shutil.copy2(P/'history/review.py',W/'review.py')
 shutil.copytree(P/'inputs/proposal',R/'work/pump-fee-basis-review')
 shutil.copytree(P/'inputs/build',R/'work/pump-buy-fee-basis-build')
 f=R/'research/imported-lab/analysis/pump_fun/curve-fresh-trades-v3-signed-surfpool.json';f.parent.mkdir(parents=True);shutil.copy2(P/'inputs/baseline-fixture.json',f)
 result=subprocess.run([sys.executable,'-B',str(W/'review.py')],cwd=R,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},capture_output=True,text=True)
 assert result.returncode==0,result.stdout+result.stderr
 observed=json.loads((W/'result.json').read_text());assert observed==json.loads((P/'history/result.json').read_text()),'Independent result changed'
 print(json.dumps({'status':'PASS','review_script_unchanged':True,'old_work_directory_dependency':False,'active_buy_calls':observed['only_two_actual_cap_call_sites'],'saved_fixtures_checked':sum(x['cases']for x in observed['coverage']),'targeted_divergent_supply_runtime_coverage':observed['runtime_divergent_supply_coverage_established'],'new_build_or_runtime_executed':False,'candidate_sha256':observed['candidate_sha256']},indent=2))
