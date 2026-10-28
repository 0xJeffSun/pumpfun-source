"""Fresh composite-only execution; losslessly compact each owned receipt after proof."""
from pathlib import Path
import concurrent.futures,gzip,hashlib,json,re,subprocess,time
w=Path(__file__).resolve().parent;out=w/'current432-trade-composition-runtime';out.mkdir(exist_ok=True);candidate=w/'current432-buyv2-sell-composition-build/candidate.so';py=w/'venv/bin/python'
sha=lambda b:hashlib.sha256(b).hexdigest();digest=lambda p:sha(p.read_bytes())
assert digest(candidate)=='4c77fa48d44282c7b7c97580622bff00f5a570e5ba537d1b43376c70c36e7be4'
roots={'buy_v2':w/'buy-v2-current-ownership-runtime','sell':w/'sell-price-current-runtime'}
inputs={}
for kind,directory in roots.items():
 binding=json.loads((directory/'input-bindings.json').read_bytes())
 for name,row in binding['inputs'].items():
  path=directory/'inputs'/name;assert digest(path)==row['sha256']
  if name in inputs:assert inputs[name]['sha256']==row['sha256']
  inputs[name]=dict(**row,actual_input_path=str(path))
assert len(inputs)==25
(out/'input-bindings.json').write_text(json.dumps(dict(inputs=inputs,scope='Union of exact frozen17 BuyV2 and21 sell inputs. Shared names/bytes checked; source files unchanged.'),indent=2)+'\n')
jobs=[('buy_v2',f) for f in ['native','token','token22']]+[('sell',f) for f in ['legacy','native','token','token22']]
def compact(path):
 raw=path.read_bytes();target=path.with_suffix(path.suffix+'.gz');assert not target.exists()
 encoded=gzip.compress(raw,mtime=0);target.write_bytes(encoded)
 assert gzip.decompress(target.read_bytes())==raw and path.read_bytes()==raw
 record=dict(path=str(target),compressed_sha256=digest(target),raw_sha256=sha(raw),raw_bytes=len(raw),compressed_bytes=len(encoded),scope='Lossless compaction of this completed, independently checked, newly generated receipt only; no target binary or old capture changed.')
 path.unlink();return record

def execute(job):
 kind,family=job;directory=out/kind;directory.mkdir(exist_ok=True);p=directory/family;receipt=p.with_suffix('.json');stdout=p.with_suffix('.stdout');assert not receipt.exists() and not stdout.exists()
 observer='run_buy_v2_observed.py' if kind=='buy_v2' else 'run_sell_price_observed.py'
 command=[str(py),'-B',str(w/observer),'--candidate',str(candidate),'--family',family,'--output',str(receipt)]
 start=time.monotonic()
 with stdout.open('xb') as log:run=subprocess.run(command,stdout=log,stderr=subprocess.STDOUT)
 assert run.returncode==0,(kind,family,'comparison',run.returncode)
 script='verify_mayhem_buy_v2.py' if kind=='buy_v2' else 'verify_mayhem_sell.py' if family=='legacy' else 'verify_mayhem_sell_v2.py'
 proof=p.with_suffix('.verification.json');independent=[str(py),'-I','-B',str(roots[kind]/'inputs/scripts'/script),'--candidate',str(candidate),'--receipts',str(receipt),'--output',str(proof)]
 with p.with_suffix('.verification.stdout').open('xb') as log:verified=subprocess.run(independent,stdout=log,stderr=subprocess.STDOUT)
 assert verified.returncode==0,(kind,family,'independent',verified.returncode)
 report=json.loads(receipt.read_bytes());proof_data=json.loads(proof.read_bytes());observed=p.with_suffix('.program-bindings.json');observation=json.loads(observed.read_bytes())
 count=613 if kind=='buy_v2' else 396 if family=='legacy' else 473
 assert report['case_count']==len(report['cases'])==count and not report['mismatches'] and not proof_data['mismatches']
 assert proof_data['verified_signed_transactions']==2*count and len(observation['records'])==2*count and observation['exit_code']==0 and observation['failure'] is None
 compute=re.compile(r' consumed \d+ of \d+ compute units');strict=lambda rows:[x for x in rows if not compute.search(x)]
 noncompute=sum(strict(x['original']['metadata']['logs'])!=strict(x['candidate']['metadata']['logs']) for x in report['cases']);raw=sum(x['original']['metadata']['logs']!=x['candidate']['metadata']['logs'] for x in report['cases'])
 record=dict(kind=kind,family=family,command=command,returncode=0,independent_command=independent,independent_returncode=0,seconds=time.monotonic()-start,pairs=count,successes=proof_data['successful_cases'],rejections=proof_data['rejection_cases'],verified_signed_records=2*count,noncompute_log_differences=noncompute,raw_log_differences=raw,receipt_sha256=digest(receipt),observer_record_sha256=digest(observed),proof_sha256=digest(proof),stdout_sha256=digest(stdout),independent_stdout_sha256=digest(p.with_suffix('.verification.stdout')))
 record['receipt_storage']=compact(receipt);record['observer_record_storage']=compact(observed)
 p.with_suffix('.execution.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record),flush=True);return record
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:runs=list(pool.map(execute,jobs))
assert all(digest(Path(row['actual_input_path']))==row['sha256'] for row in inputs.values())
summary=dict(candidate_sha256=digest(candidate),fresh_pairs=sum(x['pairs'] for x in runs),verified_signed_records=sum(x['verified_signed_records'] for x in runs),runs=runs,frozen_inputs_unchanged=True,scope='Fresh composite artifact only; no component receipt reuse or retagging. Each own newly generated raw receipt was losslessly gzipped after independent verification, with raw/compressed hashes retained. Original programs/old captures are untouched. No new unique cases or callback coverage inferred.')
assert summary['fresh_pairs']==3654 and summary['verified_signed_records']==7308
(out/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print('ALL PASS',flush=True)
