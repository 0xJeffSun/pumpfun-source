#!/usr/bin/env python3
"""Validate the integrated AMM checkpoint from saved code and signed observations."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,subprocess,sys,tempfile
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
ORIGINAL='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
CANDIDATE='132f05e7233cd17a666dadf157018d3976732a066a15194ff737d093a79382ef'
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
 assert len(record['source_sha256'])==38
 for name,digest in record['source_sha256'].items():
  rel='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1];assert sha(d/'source'/rel)==digest
  if a.current_source:assert sha(ROOT/rel)==digest
 direct=module('order_direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py')
 corpus=direct.audit(d/'runtime',CANDIDATE);assert corpus==load(HERE/'direct-comparison.json')and not corpus['mismatches']
 assert(corpus['cases'],corpus['transactions'],corpus['signature_fields'])==(17462,35074,35418)
 inputs=load(d/'runtime/inputs.json');assert inputs['original_sha256']==ORIGINAL and inputs['candidate_sha256']==CANDIDATE
 for name,digest in inputs['harness_sha256'].items():assert sha(d/'harness'/Path(name).name)==digest
 assert inputs['observer_sha256']==sha(d/'harness/observe_suite.py')
 assert inputs['replay_driver_sha256']==sha(d/'harness/replay_parallel.py')==sha(HERE/'replay_parallel.py') and inputs['workers']==8 and inputs['ordering']=='descending-case-count'
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
 for name,producer,count in [('boundary','probe.py',72),('transfer','probe_transfer.py',4),('validation-order','probe_validation_order.py',252),('curve-order','probe_curve_order.py',32),('legacy-curve-order','probe_legacy_curve_order.py',32),('matrix','../curve-arithmetic-recovery-20261027/probe_matrix.py',1536),('market-cap','../fee-selection-recovery-20261027/probe_market_cap_order.py',48),('quote-routes','../fee-selection-recovery-20261027/probe_quote_routes.py',20)]:
  v2.verify(d/'v2-probes'/(name+'.json.gz'),d/'v2-probes'/(name+'-transactions.json.gz'),candidate,producer,count,0)
 nd=HERE/'negative';assert sha(nd/'manifest.json')=='f42fc10ff3713eb51eb6e4bf6f8c88816e02030eb5a3eaf9c80fa78a52e40dba'
 for name,digest in load(nd/'manifest.json').items():assert sha(nd/name)==digest
 previous=ROOT/'repro/pump_amm/fee-selection-recovery-20261027/results/build/candidate.so'
 v2.verify(nd/'quote-routes.json.gz',nd/'quote-routes-transactions.json.gz',previous,'../fee-selection-recovery-20261027/probe_quote_routes.py',20,1)
 symbols=d/'build/unstripped.so'
 helpers=module('fee_helpers',HERE/'inspect_helpers.py').inspect(candidate,symbols)
 assert helpers==load(d/'helper-comparison.json')
 for target in [0x14700,0x4fba0,0xdade8,0x727b8,0xd5848,0xd69a0,0x73118,0x72128,0x716b8,0x70280]:assert any(p['normalized_exact'] for row in helpers['rows'] if row['original_start']==target for p in row['candidates']) 
 for name,path in [('pool','pool-layouts-agent-20261027'),('global','global-config-layouts-agent-20261027')]:
  result=module('order_'+name,ROOT/'repro/pump_amm'/path/'verify_static.py').verify(candidate,symbols);assert result==load(HERE/(name+'-static.json'))
 assert module('order_liquidity',ROOT/'repro/pump_amm/liquidity-account-audit-agent-20261027/audit.py').audit(candidate,symbols)==load(HERE/'liquidity-static.json')

 sqrt=module('sqrt_proof',ROOT/'repro/pump_amm/create-sqrt-recovery-20261027/verify_sqrt.py')
 assert sqrt.verify(d/'sqrt.json.gz',d/'sqrt-transactions.json.gz',candidate)=={'cases':40,'successful_original_supply_checks':33,'mismatches':0}
 assert sqrt.verify(d/'sqrt-negative/sqrt.json.gz',d/'sqrt-negative/sqrt-transactions.json.gz',d/'sqrt-negative/candidate.so',3)=={'cases':40,'successful_original_supply_checks':33,'mismatches':3}
 dependencies=load(d/'dependency-provenance.json')
 assert set(dependencies)=={'uint','hex','static_assertions'}
 for row in dependencies.values():assert sha(d/'dependencies'/row['crate_file'])==row['archive_sha256']==row['cached_registry_checksum']
 closure=module('sqrt_closure',ROOT/'repro/pump_amm/call-closure-audit-20261027/audit.py').analyze(candidate,symbols,d/'measurement.json.gz')
 assert closure==load(d/'call-closure.json')
 literals=module('sqrt_literals',ROOT/'repro/pump_amm/call-closure-audit-20261027/literal_constraints.py').analyze(candidate,symbols,closure)
 assert literals==load(d/'literal-constraints.json') and not literals['counts']['unequal_literal_uses']

 extra=module('parallel_supplemental',HERE/'verify_supplemental.py')
 for name,producer,count in [('order','probe_order.py',8),('buyback-payout','probe_buyback.py',14),('buyback-malformed','probe_buyback_malformed.py',16),('preview','probe_preview.py',36),('token-preview','probe_token_preview.py',24)]:
  assert sha(d/'supplemental'/producer)==sha(HERE/producer)
  assert extra.verify(d/'supplemental'/(name+'.json.gz'),d/'supplemental'/(name+'-transactions.json.gz'),candidate,HERE/producer,count)=={'cases':count,'mismatches':0}
 preview_bad=15
 assert sha(d/'failure-baselines/preview-candidate.so')=='b4578a32eb691945ad6c89f30121582f854d64a6d5946f1048c66043fa6b9085'
 assert extra.verify(d/'failure-baselines/preview.json.gz',d/'failure-baselines/preview-transactions.json.gz',d/'failure-baselines/preview-candidate.so',HERE/'probe_preview.py',36,preview_bad)=={'cases':36,'mismatches':preview_bad}
 baseline=d/'failure-baselines/candidate.so' 
 assert sha(baseline)=='6f5050382173bd166e5370594ddc1c67a4b1ce9ddec631656cee41371bc0425b'
 assert extra.verify(d/'failure-baselines/token-preview.json.gz',d/'failure-baselines/token-preview-transactions.json.gz',baseline,HERE/'probe_token_preview.py',24,4)=={'cases':24,'mismatches':4}
 assert extra.verify(d/'failure-baselines/order.json.gz',d/'failure-baselines/order-transactions.json.gz',baseline,HERE/'probe_order.py',8,4)=={'cases':8,'mismatches':4}
 canonical=module('parallel_canonical',HERE/'verify_canonical_mint.py')
 assert canonical.verify(d/'supplemental/canonical-mint.json.gz',candidate,d/'build/build-comparison.json')=={'cases':12,'signed_transactions':24,'mismatches':0}
 policy=module('parallel_policy',HERE/'verify_mint_policy.py')
 assert policy.verify(d/'supplemental/mint-policy.json.gz',candidate,d/'build/build-comparison.json')=={'cases':46,'signed_transactions':92,'mismatches':0}
 assert policy.verify(d/'failure-baselines/mint-policy.json.gz',baseline,d/'failure-baselines/build-comparison.json',15)=={'cases':46,'signed_transactions':92,'mismatches':15}
 raw=module('parallel_raw',HERE/'verify_raw_payout.py')
 assert raw.verify(d/'supplemental/raw.json.gz',candidate,d/'build/build-comparison.json')=={'cases':36,'signed_transactions':72,'mismatches':0}
 assert raw.verify(d/'failure-baselines/raw.json.gz',baseline,d/'failure-baselines/build-comparison.json',1)=={'cases':36,'signed_transactions':72,'mismatches':1}
 with tempfile.TemporaryDirectory()as tmp:
  out=Path(tmp)/'measurement.json';subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(candidate),'--symbols',str(symbols),'--output',str(out)],check=True,stdout=subprocess.DEVNULL);assert load(out)==load(d/'measurement.json');assert (load(out)['normalized_matches'],load(out)['raw_matches'])==(569,115)
 print(json.dumps({**corpus,'candidate_sha256':CANDIDATE,'buyback_cases':72,'cpi_cases':91,'account_fee_cases':1281,'trade_fee_cases':273,'liquidity_cases':18,'trade_boundary_cases':1996,'sqrt_cases':40,'new_transfer_order_cases':134,'mint_policy_cases':58,'normalized_matches':569,'raw_matches':115,'current_source_checked':a.current_source,'whole_elf_equal':False}))
MANIFEST='1ca9f4dcff1b62ae80f65c214597a3e8ba9e32cfc4cf7e784758a3073da08615'
if __name__=='__main__':main()
