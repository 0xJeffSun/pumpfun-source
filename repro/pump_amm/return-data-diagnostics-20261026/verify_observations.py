#!/usr/bin/env python3
"""Check an observational receipt's provenance, complete matrix and signed same-input executions."""
import argparse,base64,hashlib,json,sys
from pathlib import Path
from solders.transaction import Transaction
ROOT=Path(__file__).resolve().parents[3]
MAGIC=b'AMM_RETURN_ORACLE_V1'
LENGTHS=[None,0,1,7,8,15,16,17,23,24,25,31,32]
SUITES=['buy','buy_exact_quote_in','sell','curve_buy','curve_sell']
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def check(report,candidate,oracle,candidate_record,oracle_record):
 r=json.loads(report.read_text());assert r['genuine_candidate_sha256']==sha(candidate);assert r['genuine_original_sha256']==sha(ROOT/'evidence/original/pump_amm/deployed.so');assert r['synthetic_oracle_sha256']==sha(oracle)
 for path,elf,field in [(candidate_record,candidate,'candidate_build_record_sha256'),(oracle_record,oracle,'oracle_build_record_sha256')]:
  b=json.loads(path.read_text());assert r[field]==sha(path);assert b['source_unchanged'] and b['returncode']==0;assert b['comparison']['candidate_sha256']==sha(elf)
  assert b['source_sha256'] and any(k.endswith('/src/lib.rs')for k in b['source_sha256'])
  for source,digest in b['source_sha256'].items():assert sha(ROOT/source)==digest
 assert r['case_count']==65 and r['signed_executions']==130
 assert [(v['suite'],v['length'])for v in r['cases']]==[(s,n)for s in SUITES for n in LENGTHS]
 for v in r['cases']:
  control=bytes.fromhex(v['control_hex']);n=v['length'];mode=0 if n is None else 1;size=1 if n is None else n
  assert control[:len(MAGIC)]==MAGIC and control[len(MAGIC)]==mode;assert int.from_bytes(control[len(MAGIC)+1:len(MAGIC)+3],'little')==size;assert len(control)==len(MAGIC)+3+size
  x,y=v['original'],v['candidate'];assert x['before']==y['before'];assert x['transaction_base64']==y['transaction_base64'];assert v['differences']==[k for k in x if x[k]!=y[k]]
  for observed in [x,y]:
   assert set(observed)=={'error','logs','events','inner','return_data','before','after','transaction_base64','signature_verification','oracle_log'}
   tx=Transaction.from_bytes(base64.b64decode(observed['transaction_base64']));assert all(tx.verify_with_results());assert observed['signature_verification']==tx.verify_with_results()
   assert observed['events']==[z for z in observed['logs']if z.startswith('Program data: ')]
   logs=[z for z in observed['logs']if 'SYNTHETIC_RETURN_ORACLE' in z];assert logs==[f'Program log: SYNTHETIC_RETURN_ORACLE mode={mode} length={size}']==[observed['oracle_log']]
   assert any(a and bytes.fromhex(a['data_hex']).endswith(control)for a in observed['before'].values())
 return {'receipt_sha256':sha(report),'cases_checked':65,'signed_executions_checked':130,'scope':'Receipt integrity and actual oracle invocation only; no behavioral equivalence asserted.'}
def main():
 p=argparse.ArgumentParser(description=__doc__)
 for n in ['report','candidate','oracle','candidate_record','oracle_record','output']:p.add_argument('--'+n.replace('_','-'),type=Path,required=True)
 a=p.parse_args();assert not a.output.exists();v=check(a.report,a.candidate,a.oracle,a.candidate_record,a.oracle_record);a.output.write_text(json.dumps(v,indent=2)+'\n');print(json.dumps(v))
if __name__=='__main__':main()
