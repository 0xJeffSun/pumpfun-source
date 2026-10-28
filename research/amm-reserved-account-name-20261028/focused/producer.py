#!/usr/bin/env python3
from pathlib import Path
import argparse,base64,gzip,hashlib,json,re,sys
R=next(p for p in Path(__file__).resolve().parents if(p/'evidence/original/pump_amm/deployed.so').is_file());sys.path.insert(0,str(R/'scripts'))
import pump_amm_reserved_differential as h
from solders.litesvm import LiteSVM
from solders.transaction_metadata import FailedTransactionMetadata
sha=lambda b:hashlib.sha256(b).hexdigest();original_send=LiteSVM.send_transaction

def send(self,tx):
 raw=bytes(tx);checks=tx.verify_with_results();assert checks and all(checks)
 result=original_send(self,tx);assert bytes(tx)==raw
 meta=result.meta()if isinstance(result,FailedTransactionMetadata)else result
 self._error_probe_observation={'transaction_base64':base64.b64encode(raw).decode(),'transaction_sha256':sha(raw),'signature_count':len(checks),'logs':meta.logs()}
 return result
LiteSVM.send_transaction=send

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();original=R/'evidence/original/pump_amm/deployed.so';rows=[]
 for kind,error in [('executable',2007),('rent',2005)]:
  for index in range(8):
   observations=[]
   for binary in [original,a.candidate]:
    harness=h.ReservedHarness(binary);harness.vm.with_sigverify(True)
    keys=[h.Pubkey.from_bytes(bytes([i+30])*32)for i in range(8)]
    keys[index]=h.PROGRAM if kind=='executable'else h.EVENT
    if kind=='rent':harness.vm.set_account(h.EVENT,h.Account(1,b'',h.Pubkey.default()))
    result=harness.run(bytes(32),keys);result.update(harness.vm._error_probe_observation)
    assert f'Custom({error})'in result['error'],(kind,index,result['error'])
    result['compared_logs']=[line for line in result['logs']if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',line)]
    assert any(f'reserved_fee_recipients[{index}]'in line for line in result['compared_logs'])
    observations.append(result)
   left,right=observations;fields=['error','state_hex','events','compared_logs'];differences=[k for k in fields if left[k]!=right[k]]
   rows.append(dict(kind=kind,index=index,expected_error=error,original=left,candidate=right,mismatched_fields=differences,match=not differences))
 report=dict(scope='Sixteen signed synthetic reserved-recipient error paths. Compare errors, global state, events and every log except runtime compute-meter lines; full logs retained. No signature bypass or live-chain claim.',candidate_sha256=sha(a.candidate.read_bytes()),original_sha256=sha(original.read_bytes()),producer_sha256=sha(Path(__file__).read_bytes()),harness_sha256={str(p.relative_to(R)):sha(p.read_bytes())for p in [R/'scripts/pump_amm_reserved_differential.py',R/'scripts/pump_amm_admin_differential.py']},case_count=16,transaction_count=32,signature_count=sum(x[k]['signature_count']for x in rows for k in ['original','candidate']),cases=rows,mismatches=[i for i,x in enumerate(rows)if not x['match']])
 a.output.write_bytes(gzip.compress((json.dumps(report,separators=(',',':'))+'\n').encode(),mtime=0));print({k:report[k]for k in ['case_count','transaction_count','signature_count','mismatches']});assert not report['mismatches']
if __name__=='__main__':main()
