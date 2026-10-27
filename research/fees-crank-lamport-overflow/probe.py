import argparse,base64,gzip,hashlib,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
import fees_donation_crank_probe as h
from solders.transaction_metadata import FailedTransactionMetadata

def cases():
 out=[]
 for flags in [0,8,4,12,255]:
  for label,extra in [('empty-new',{'amount':0}),('empty-existing',{'amount':0,'token_amount':0}),('native',{'amount':100}),('tokens',{'amount':0,'quote':str(h.MINT),'token_amount':100,'listed':True})]:
   out.append(dict(name=f'{label}-flags-{flags}',flags=flags,**extra))
 for total in [2**64-1,2**64-2]:
  for amount in [0,1,2]:out.append(dict(name=f'total-{total}-amount-{amount}',total=total,amount=amount))
 for flag in [0,8]:
  for label,extra in [('no-whitelist',{'whitelist':False}),('poor-payer',{'payer_lamports':1}),('wrong-quote',{'state_patches':[(74,'00')]}),('frozen',{'token_amount':1,'token_patches':[(108,'02')]})]:
   out.append(dict(name=f'{label}-flags-{flag}',flags=flag,amount=0,**extra))
 return out

def execute(binary,case):
 fixture=h.CrankFixture(binary)
 row=fixture.run(case)
 row['program_logs']=[s for s in row['logs']if s.startswith('Program log:')]
 row['events']=[s for s in row['logs']if s.startswith('Program data:')]
 return row

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--candidate',type=Path,required=True);ap.add_argument('--output',type=Path,required=True);a=ap.parse_args()
 original=ROOT/'evidence/original/pump_fees/deployed.so';rows=[]
 fields=['error','before','after','inner','transaction_base64','program_logs','events']
 for case in cases():
  left=execute(original,case);right=execute(a.candidate,case)
  diff=[key for key in fields if left[key]!=right[key]]
  rows.append(dict(case=case,original=left,candidate=right,differences=diff))
  print(case['name'],diff,flush=True)
 result=dict(original_sha256=hashlib.sha256(original.read_bytes()).hexdigest(),candidate_sha256=hashlib.sha256(a.candidate.read_bytes()).hexdigest(),fields=fields,case_count=len(rows),failures=[r['case']['name']for r in rows if r['differences']],cases=rows)
 a.output.write_bytes(gzip.compress(json.dumps(result,sort_keys=True).encode(),mtime=0))
 print('FINAL',len(rows),len(result['failures']),flush=True)
if __name__=='__main__':main()
