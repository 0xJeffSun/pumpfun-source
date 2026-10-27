#!/usr/bin/env python3
"""Replay the 209 signed fee-order, waiver, and collision fixtures on a candidate."""
from pathlib import Path
import argparse, gzip, hashlib, json, subprocess, sys
HERE=Path(__file__).resolve().parent
SUITE=[
 ('exact-fee-order','probe_exact_fee_order.py',12),
 ('exact-fee-transfer','probe_exact_fee_transfer_operand.py',4),
 ('exact-fee-sum','probe_exact_fee_sum.py',16),
 ('zero-creator','probe_zero_creator_fee.py',18),
 ('whitelist','probe_whitelist_fee.py',10),
 ('whitelist-order','probe_whitelist_order.py',5),
 ('whitelist-creator','probe_whitelist_creator_consumption.py',12),
 ('legacy-fee-collisions','probe_legacy_fee_collisions.py',72),
 ('sell-reserve-collisions','probe_sell_reserve_collisions.py',60),
]
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output-dir',type=Path,required=True);p.add_argument('--include-creator-gates',action='store_true');a=p.parse_args();candidate=a.candidate.resolve();dest=a.output_dir.resolve();dest.mkdir();summary=[]
 suite=SUITE+([('creator-gate','probe_creator_fee_gate.py',24),('creator-gate-cashback','probe_creator_fee_gate_cashback.py',24),('multi-creator-gate','probe_multi_creator_gate.py',16)] if a.include_creator_gates else [])
 for name,producer,count in suite:
  output=dest/(name+'.json');log=dest/(name+'.log')
  result=subprocess.run([sys.executable,'-B',str(HERE/producer),'--candidate',str(candidate),'--output',str(output)],capture_output=True,text=True)
  log.write_text(result.stdout+result.stderr);assert result.returncode==0,(name,result.returncode,log)
  data=json.loads(output.read_text());assert len(data['cases'])==count
  receipt=dest/(name+'.json.gz');receipt.write_bytes(gzip.compress(output.read_bytes(),mtime=0));output.unlink()
  summary.append({'name':name,'producer':producer,'producer_sha256':hashlib.sha256((HERE/producer).read_bytes()).hexdigest(),'cases':count,'receipt':receipt.name,'sha256':hashlib.sha256(receipt.read_bytes()).hexdigest(),'mismatches':sum(bool(r['differences']) for r in data['cases'])})
 report={'candidate_sha256':hashlib.sha256(candidate.read_bytes()).hexdigest(),'cases':sum(r['cases'] for r in summary),'mismatches':sum(r['mismatches'] for r in summary),'receipts':summary}
 (dest/'manifest.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
if __name__=='__main__':main()
