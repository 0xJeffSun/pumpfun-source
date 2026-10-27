#!/usr/bin/env python3
"""Validate the integrated AMM checkpoint from saved code and signed observations."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,subprocess,sys,tempfile
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
ORIGINAL='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
CANDIDATE='36bd1a8bd989c5dbd6d1369d4ad6b7f99468204a720d848b3e4dbe9933c9f95c'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):
 p=Path(p)
 if not p.exists()and p.suffix=='.json':p=p.with_suffix('.json.gz')
 b=p.read_bytes();return json.loads(gzip.decompress(b)if p.suffix=='.gz'else b)
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def main():
 p=argparse.ArgumentParser();p.add_argument('--current-source',action='store_true');a=p.parse_args();d=HERE/'results';candidate=d/'build/candidate.so'
 assert sha(d/'manifest.json')==MANIFEST;entries=load(d/'manifest.json')
 assert set(entries)|{'manifest.json'}=={str(f.relative_to(d))for f in d.rglob('*')if f.is_file()}
 for name,digest in entries.items():assert sha(d/name)==digest
 record=load(d/'build/build-comparison.json');assert sha(candidate)==record['comparison']['candidate_sha256']==CANDIDATE
 assert record['returncode']==0 and record['source_unchanged'] and record['source_sha256']==record['source_after_sha256']
 assert record['dependency_cache_before']==record['dependency_cache_after'] and record['dependency_cache_before']
 assert record['unstripped_sha256']==sha(d/'build/unstripped.so') and record['build_log_sha256']==sha(d/'build/build.log')
 assert len(record['source_sha256'])==36
 for name,digest in record['source_sha256'].items():
  rel='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1];assert sha(d/'source'/rel)==digest
  if a.current_source:assert sha(ROOT/rel)==digest
 direct=module('order_direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py')
 corpus=direct.audit(d/'runtime',CANDIDATE);assert corpus==load(HERE/'direct-comparison.json')and not corpus['mismatches']
 assert(corpus['cases'],corpus['transactions'],corpus['signature_fields'])==(17462,35074,35418)
 inputs=load(d/'runtime/inputs.json');assert inputs['original_sha256']==ORIGINAL and inputs['candidate_sha256']==CANDIDATE
 for name,digest in inputs['harness_sha256'].items():assert sha(d/'harness'/Path(name).name)==digest
 assert inputs['observer_sha256']==sha(d/'harness/observe_suite.py')
 buy=load(d/'buyback.json');assert buy['candidate_sha256']==CANDIDATE and len(buy['cases'])==72
 for c in buy['cases']:
  assert not c['diff']and direct.clean(c['original'])==direct.clean(c['candidate'])
  for side in ['original','candidate']:assert all(Transaction.from_bytes(base64.b64decode(c[side]['transaction_base64'])).verify_with_results())
 assert module('order_cpi',ROOT/'repro/pump_amm/diagnostic-parity-20261027/verify_cpi.py').verify(d,candidate)==91
 agent=ROOT/'repro/pump_amm/fee-account-decoder-agent-20261027';ad=d/'account-probes'
 module('order_fees',agent/'verify_probe.py').verify(ad/'fee.json.gz',ad/'fee-transactions.json.gz',candidate)
 ev=module('order_extra',agent/'verify_extra.py')
 for kind in ['v2','multi']:ev.verify(kind,ad/(kind+'.json.gz'),ad/(kind+'-transactions.json.gz'),candidate)
 wv=module('order_whitelist',agent/'verify_whitelist.py')
 for kind,name in [('basic','whitelist'),('order','whitelist-order')]:wv.verify(kind,ad/(name+'.json.gz'),ad/(name+'-transactions.json.gz'),candidate)
 subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/trade-helpers-agent-20261027/verify_fee_order_receipts.py'),str(d/'trade-probes'),'--candidate',str(candidate),'--require-parity'],check=True,stdout=subprocess.DEVNULL)
 extra=load(d/'liquidity-extra.json');sidecar=load(d/'liquidity-extra-transactions.json.gz');assert len(extra['cases'])==18 and len(sidecar['transactions'])==36
 for i,c in enumerate(extra['cases']):
  assert direct.clean(c['original'])==direct.clean(c['candidate']) and not c['differences']
  pair=sidecar['transactions'][i*2:i*2+2];messages=[]
  for label,t,digest in zip(['original','candidate'],pair,[ORIGINAL,CANDIDATE]):
   raw=base64.b64decode(t['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert all(tx.verify_with_results())and t['all_signatures_verified'];assert hashlib.sha256(raw).hexdigest()==t['transaction_sha256']
   assert t['amm_program_sha256']==digest and t['logs_sha256']==hashlib.sha256(json.dumps(c[label]['logs'],separators=(',',':')).encode()).hexdigest();messages.append(bytes(tx.message))
  assert messages[0]==messages[1]
 v2=module('v2_boundaries',ROOT/'repro/pump_amm/v2-fee-boundaries-20261027/verify.py')
 for name,producer,count in [('boundary','probe.py',72),('transfer','probe_transfer.py',4),('validation-order','probe_validation_order.py',252),('curve-order','probe_curve_order.py',32),('legacy-curve-order','probe_legacy_curve_order.py',32),('matrix','../curve-arithmetic-recovery-20261027/probe_matrix.py',1536)]:
  v2.verify(d/'v2-probes'/(name+'.json.gz'),d/'v2-probes'/(name+'-transactions.json.gz'),candidate,producer,count,0)
 nd=HERE/'negative';assert sha(nd/'manifest.json')=='af6c3111142c1933ea125f48e0b560b1b6813b9742c48b76297cb783f0199de1'
 for name,digest in load(nd/'manifest.json').items():assert sha(nd/name)==digest
 previous=ROOT/'repro/pump_amm/v2-order-recovery-20261027/results/build/candidate.so'
 for name,producer,bad in [('curve-order','probe_curve_order.py',15),('legacy-curve-order','probe_legacy_curve_order.py',12)]:
  v2.verify(nd/(name+'.json.gz'),nd/(name+'-transactions.json.gz'),previous,producer,32,bad)
 symbols=d/'build/unstripped.so' 
 for name,path in [('pool','pool-layouts-agent-20261027'),('global','global-config-layouts-agent-20261027')]:
  result=module('order_'+name,ROOT/'repro/pump_amm'/path/'verify_static.py').verify(candidate,symbols);assert result==load(HERE/(name+'-static.json'))
 assert module('order_liquidity',ROOT/'repro/pump_amm/liquidity-account-audit-agent-20261027/audit.py').audit(candidate,symbols)==load(HERE/'liquidity-static.json')
 with tempfile.TemporaryDirectory()as tmp:
  out=Path(tmp)/'measurement.json';subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(candidate),'--symbols',str(symbols),'--output',str(out)],check=True,stdout=subprocess.DEVNULL);assert load(out)==load(d/'measurement.json')
 print(json.dumps({**corpus,'candidate_sha256':CANDIDATE,'buyback_cases':72,'cpi_cases':91,'account_fee_cases':1281,'trade_fee_cases':273,'liquidity_cases':18,'trade_boundary_cases':1928,'normalized_matches':557,'raw_matches':109,'current_source_checked':a.current_source,'whole_elf_equal':False}))
MANIFEST='dbe19b4ce38bed51d3c3bcc2c35e4ce5d9e9eac1479ccf228892b8e414a9d1ae'
if __name__=='__main__':main()
