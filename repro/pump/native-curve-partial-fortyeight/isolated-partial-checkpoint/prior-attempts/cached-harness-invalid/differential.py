"""Bounded native/legacy fixtures via captured AMM's genuine CPI signer.

Synthetic local accounts; ordinary test-owned verified outer signatures.
No live traffic, fabricated PDA signatures or executable modification.
"""
from pathlib import Path
import argparse,hashlib,json,sys
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_multi_hop_differential as h

def legacy_curve(sell,candidate=None,mutation=None):
 def setup(vm,metas):
  h.curve_route(sell)(vm,metas)
  # The fixture is deliberately re-owned and truncated to the ordinary legacy
  # mint/account layouts. This is synthetic state, not a historical creation.
  mint=vm.vm.get_account(h.CM)
  vm.vm.set_account(h.CM,h.Account(mint.lamports,bytes(mint.data[:82]),h.TOKEN))
  vault=h.Pubkey.find_program_address([bytes(h.CURVE),bytes(h.TOKEN),bytes(h.CM)],h.ATA)[0]
  old=vm.vm.get_account(h.CB)
  vm.vm.set_account(vault,h.Account(old.lamports,bytes(old.data[:165]),h.TOKEN))
  user=vm.vm.get_account(h.CU)
  vm.vm.set_account(h.CU,h.Account(user.lamports,bytes(user.data[:165]),h.TOKEN))
  metas[19]=h.AccountMeta(vault,False,True)
  if mutation:mutation(vm,metas)
  if candidate:vm.vm.add_program_from_file(h.PUMP,candidate)
 return setup

def invoke(sell,amount,candidate=None,mutation=None,limit=1):
 # candidate argument on the old harness selects its AMM. Leave that unchanged;
 # only the nested Pump executable is selected by the callback above.
 return h.run(amount=amount,limit=limit,sell=sell,overrides=legacy_curve(sell,candidate,mutation))

def compare(a,b):
 return [k for k in ['error','events','inner','return_data','before','after'] if a[k]!=b[k]]

if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--candidate',type=Path);ap.add_argument('--output',type=Path,required=True);args=ap.parse_args()
 cases=[]
 for sell in [False,True]:
  for amount in [100,10000,1000000000]:
   original=invoke(sell,amount)
   candidate=invoke(sell,amount,args.candidate.resolve()) if args.candidate else None
   mismatches=compare(original,candidate) if candidate else []
   cases.append({'case':f'native-legacy-{sell}-{amount}','mismatches':mismatches,'original':original,'candidate':candidate})
 result={'scope':__doc__,'candidate_sha256':hashlib.sha256(args.candidate.read_bytes()).hexdigest()if args.candidate else None,'original_pump_sha256':hashlib.sha256((ROOT/'evidence/original/pump/deployed.so').read_bytes()).hexdigest(),'captured_amm_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'case_count':len(cases),'passed':sum(not r['mismatches']for r in cases)if args.candidate else None,'cases':cases}
 args.output.write_text(json.dumps(result,indent=2)+'\n')
 print(json.dumps({'cases':len(cases),'passed':result['passed'],'results':[(r['case'],r['original']['error'],r['mismatches'])for r in cases]},indent=2))
