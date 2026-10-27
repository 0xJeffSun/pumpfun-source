from pathlib import Path
import base64,gzip,hashlib,importlib.util,json
from solders.transaction import Transaction
ROOT=Path(__file__).resolve().parents[3];HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d)
load=lambda p:json.loads(gzip.decompress(p.read_bytes()));sha=lambda b:hashlib.sha256(b).hexdigest()
r=load(HERE/'results.json.gz');o=load(HERE/'transactions.json.gz');assert r['producer_sha256']==o['script_sha256']==sha((HERE/'probe.py').read_bytes());assert r['case_count']==len(r['cases'])==1342 and len(o['transactions'])==2684
candidate=ROOT/'repro/pump_amm/buy-route-recovery-20261027/results/build/candidate.so';assert sha(candidate.read_bytes())==r['candidate_sha256'];assert r['original_sha256']==sha((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes())
cache={};signatures=0
for i,c in enumerate(r['cases']):
 assert d.clean(c['original'])==d.clean(c['candidate']) and not c['mismatched_fields'];messages=[]
 for label,t,pid in zip(['original','candidate'],o['transactions'][2*i:2*i+2],[r['original_sha256'],r['candidate_sha256']]):
  raw=base64.b64decode(t['transaction_base64'],validate=True);assert t['transaction_base64']==c['transaction_base64'];assert sha(raw)==t['transaction_sha256'];assert t['amm_program_sha256']==pid
  if raw not in cache:
   tx=Transaction.from_bytes(raw);assert all(tx.verify_with_results());cache[raw]=tx
  tx=cache[raw];assert t['all_signatures_verified'] and len(tx.signatures)==t['signature_count'];signatures+=len(tx.signatures)
  ix=tx.message.instructions[0];assert len(ix.accounts)==0 and bytes(ix.data).hex()==c['data_hex'];assert str(tx.message.account_keys[ix.program_id_index])=='pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'
  assert t['logs_sha256']==sha(json.dumps(c[label]['logs'],separators=(',',':')).encode());messages.append(bytes(tx.message))
 assert messages[0]==messages[1]
assert r['mismatch_count']==0
result={'cases':1342,'transactions':2684,'verified_signature_fields':signatures,'mismatches':0,'candidate_sha256':r['candidate_sha256'],'scope':'No instruction accounts; establishes bounded raw argument/discriminator decoding only.'};(HERE/'verification.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
