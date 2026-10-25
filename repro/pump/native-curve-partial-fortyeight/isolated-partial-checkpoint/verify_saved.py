"""Read-only verification of saved fixtures, signatures and executable bindings."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json
from solders.transaction import Transaction
from solders.pubkey import Pubkey
P=Path(__file__).resolve().parent
AMM=Pubkey.from_string('pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA')
PUMP=Pubkey.from_string('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P')
ap=argparse.ArgumentParser();ap.add_argument('--receipt',type=Path,required=True);ap.add_argument('--candidate',type=Path,required=True);ap.add_argument('--repeat',type=Path,required=True);ap.add_argument('--output',type=Path,required=True);args=ap.parse_args()
def read(path):return json.loads(gzip.decompress(path.read_bytes())if path.suffix=='.gz'else path.read_bytes())
row=read(args.receipt);prior=read(args.repeat)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert row['candidate_sha256']==sha(args.candidate)
assert row['case_count']==row['passed']==56
keys=['error','events','inner','return_data','before','after']
counts={'cases':0,'verified_outer_signatures':0,'pump_cpi_comparisons':0,'successful_comparisons':0,'caller_rejection_comparisons':0}
for case,old in zip(row['cases'],prior['cases']):
 assert case['case']==old['case'] and not case['mismatches']
 assert all(case['original'][k]==case['candidate'][k]for k in keys)
 assert all(case[side][k]==old[side][k]for side in ['original','candidate']for k in keys)
 cpis=[]
 for side in ['original','candidate']:
  result=case[side];assert result['fresh_vm']
  assert result['program_sha256'][str(PUMP)]==(row['original_pump_sha256']if side=='original'else row['candidate_sha256'])
  tx=Transaction.from_bytes(base64.b64decode(result['transaction_base64']))
  assert all(tx.verify_with_results());counts['verified_outer_signatures']+=len(tx.signatures)
  assert len(tx.message.instructions)==1 and tx.message.account_keys[tx.message.instructions[0].program_id_index]==AMM
  pump_calls=[ix for group in result['inner']for ix in group if tx.message.account_keys[ix['instruction']['programIdIndex']]==PUMP and bytes(ix['instruction']['data'][1:]).startswith(bytes([225,154,117,22,215,86,246,103]))]
  assert len(pump_calls)<=1
  for ix in pump_calls:
   data=bytes(ix['instruction']['data'][1:]);assert len(data)==21 and data[16:]==bytes([1,0,0,0,3])
   assert len(ix['instruction']['accounts'][1:])==18
   config_index=ix['instruction']['accounts'][3]
   assert tx.message.account_keys[config_index]==Pubkey.find_program_address([b'global_config'],AMM)[0]
  cpis.append(bool(pump_calls))
 assert cpis[0]==cpis[1]
 counts['pump_cpi_comparisons'if cpis[0]else'caller_rejection_comparisons']+=1
 counts['successful_comparisons']+=case['original']['error'] is None
 counts['cases']+=1
out={'scope':'Read-only saved-evidence verification; no runtime re-execution. Case count excludes prior drafts and repeated final harness execution. Compute-unit and source-location log differences are not parity criteria.',**counts,'candidate_sha256':row['candidate_sha256'],'receipt_sha256':sha(args.receipt),'prior_receipt_sha256':sha(args.repeat),'repeat_results_identical':True,'full_byte_equality':False}
args.output.write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps(out,indent=2))
