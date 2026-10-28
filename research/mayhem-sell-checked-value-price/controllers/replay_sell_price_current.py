"""Fresh observed comparison of one actual sell composition; frozen scripts unchanged."""
from pathlib import Path
import concurrent.futures,hashlib,json,re,subprocess,time
w=Path(__file__).resolve().parent;d=w/'sell-price-current-runtime';out=d/'proposed';out.mkdir(exist_ok=True)
py=w/'venv/bin/python';candidate=w/'legacy-sell-checked-value-price-current432-build/candidate.so'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(candidate)=='ae841f49d2786b78daab90d7ec5cd2f228af9992cec2d2cb425d0ef9fcc9bfd3'
binding=json.loads((d/'input-bindings.json').read_bytes());assert all(sha(d/'inputs'/n)==r['sha256'] for n,r in binding['inputs'].items())
def execute(family):
 p=out/family;receipt=p.with_suffix('.json');stdout=p.with_suffix('.stdout')
 assert not receipt.exists() and not stdout.exists(),('refuse overwrite',family)
 command=[str(py),'-B',str(w/'run_sell_price_observed.py'),'--candidate',str(candidate),'--family',family,'--output',str(receipt)]
 start=time.monotonic()
 with stdout.open('xb') as log: run=subprocess.run(command,stdout=log,stderr=subprocess.STDOUT)
 assert run.returncode==0,(family,'comparison',run.returncode)
 proof=p.with_suffix('.verification.json');verifier='verify_mayhem_sell.py' if family=='legacy' else 'verify_mayhem_sell_v2.py'
 independent=[str(py),'-I','-B',str(d/'inputs/scripts'/verifier),'--candidate',str(candidate),'--receipts',str(receipt),'--output',str(proof)]
 with p.with_suffix('.verification.stdout').open('xb') as log: verified=subprocess.run(independent,stdout=log,stderr=subprocess.STDOUT)
 assert verified.returncode==0,(family,'independent',verified.returncode)
 report=json.loads(receipt.read_bytes());verified=json.loads(proof.read_bytes());observed=json.loads(p.with_suffix('.program-bindings.json').read_bytes())
 count=396 if family=='legacy' else 473
 assert report['case_count']==count and not report['mismatches'] and not verified['mismatches']
 assert verified['verified_signed_transactions']==2*count and len(observed['records'])==2*count and observed['exit_code']==0 and observed['failure'] is None
 compute=re.compile(r' consumed \d+ of \d+ compute units');strict=lambda rows:[x for x in rows if not compute.search(x)]
 noncompute=sum(strict(x['original']['metadata']['logs'])!=strict(x['candidate']['metadata']['logs']) for x in report['cases'])
 raw=sum(x['original']['metadata']['logs']!=x['candidate']['metadata']['logs'] for x in report['cases'])
 record=dict(family=family,command=command,returncode=run.returncode,seconds=time.monotonic()-start,independent_command=independent,independent_returncode=0,pairs=count,successes=verified['successful_cases'],rejections=verified['rejection_cases'],verified_signed_records=2*count,noncompute_log_differences=noncompute,raw_log_differences=raw,receipt_sha256=sha(receipt),proof_sha256=sha(proof),observer_record_sha256=sha(p.with_suffix('.program-bindings.json')),stdout_sha256=sha(stdout),independent_stdout_sha256=sha(p.with_suffix('.verification.stdout')))
 p.with_suffix('.execution.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record),flush=True);return record
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool: runs=list(pool.map(execute,['legacy','native','token','token22']))
assert all(sha(d/'inputs'/n)==r['sha256'] for n,r in binding['inputs'].items())
summary=dict(candidate_sha256=sha(candidate),fresh_pairs=sum(x['pairs'] for x in runs),verified_signed_records=sum(x['verified_signed_records'] for x in runs),runs=runs,frozen_inputs_unchanged=True,scope='Fresh proposed artifact only.21 frozen public inputs, four complete sell families, real six-program observations. No old receipts retagged, no new unique cases or CPI-error callback coverage inferred.')
assert summary['fresh_pairs']==1815 and summary['verified_signed_records']==3630
(d/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print('ALL PASS',flush=True)
