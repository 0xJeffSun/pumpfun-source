from pathlib import Path
import hashlib,json,subprocess,time
W=Path(__file__).resolve().parent;R=W.parent/'pumpfun-current'
C=W/'qualified-current432-historical/build/candidate.so'
D=W/'qualified-current432-historical-buy-runtime';D.mkdir(exist_ok=False)
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
assert sha(C)=='78e3ccb13f531b0724bf1f60c82744092c8dcbdeb2162c0755dc88ecc0186932'
inputs=['scripts/mayhem_buy_differential.py','scripts/verify_mayhem_buy.py','repro/mayhem/twenty/buy-cases.json']
hashes={n:sha(R/n)for n in inputs}
PY=W/'venv/bin/python';receipt=D/'buy.json';checked=D/'buy-independent.json'
run=[str(PY),'-B',str(R/inputs[0]),'--candidate',str(C),'--output',str(receipt),'--cases',str(R/inputs[2])]
verify=[str(PY),'-I','-B',str(R/inputs[1]),'--candidate',str(C),'--receipts',str(receipt),'--output',str(checked)]
(D/'commands.json').write_text(json.dumps(dict(candidate_sha256=sha(C),run=run,verify=verify,input_hashes=hashes,scope='Fresh486case legacy Buy execution only, not prior AMM/initializer/Burn/sweep matrices.'),indent=2)+'\n')
for name,command in [('run',run),('verify',verify)]:
 with(D/(name+'.log')).open('xb')as log:result=subprocess.run(command,cwd=R,stdout=log,stderr=subprocess.STDOUT)
 assert result.returncode==0,(name,result.returncode)
report=json.loads(receipt.read_bytes());independent=json.loads(checked.read_bytes())
assert report['case_count']==486 and not report['mismatches']
assert independent['case_count']==486 and independent['verified_signed_transactions']==972
assert sha(C)=='78e3ccb13f531b0724bf1f60c82744092c8dcbdeb2162c0755dc88ecc0186932'
assert hashes=={n:sha(R/n)for n in inputs}
(D/'summary.json').write_text(json.dumps(dict(cases=486,candidate_sha256=sha(C),receipt_sha256=sha(receipt),independent=independent,source_inputs_unchanged=True),indent=2)+'\n')
print('PASS486 legacy Buy pairs,972 independently verified signedrecords',flush=True)
