"""Verify the shared original deposit/withdraw account parser and direct callees."""
from pathlib import Path
import argparse,hashlib,json,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def audit(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols);start=0xa8460;size=8936
 f=next(f for f in s.funcs if 'Liquidity$'in f['name']and'12try_accounts17'in f['name'])
 assert f['size']==size and o.normalized[start:start+size]==c.normalized[f['start']:f['start']+size] and o.pattern(start,size)==c.pattern(f['start'],size)
 assert o.calls[0xe5380]==o.calls[0xe58b8]==start
 assert o.b[0x11e828:0x11e83c]==b'Instruction: Deposit' and o.b[0x11e83c:0x11e851]==b'Instruction: Withdraw'
 calls=[]
 for at,to in o.calls.items():
  if not start<=at<start+size:continue
  site=f['start']+at-start;target=c.calls[site];end=next(x for x in o.entries if x>to);n=end-to
  same=o.normalized[to:end]==c.normalized[target:target+n] and o.pattern(to,n)==c.pattern(target,n)
  names=[g['name']for g in s.funcs if g['start']==target]
  calls.append({'offset':at-start,'original_target':to,'candidate_target':target,'callee_body_match':same,'candidate_names':names})
 assert all(x['callee_body_match']for x in calls)
 return {'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'original_sha256':hashlib.sha256(o.b).hexdigest(),'parser':{'original':start,'candidate':f,'bytes':size},'original_callers':[{'instruction':'deposit','wrapper':0xe5278,'call':0xe5380},{'instruction':'withdraw','wrapper':0xe57b0,'call':0xe58b8}],'direct_callees':calls,'scope':'Both original instruction wrappers share this exact normalized parser body. All actual direct callee bodies match. This does not establish complete transitive/data identity or full program equivalence.'}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--symbols',type=Path,required=True);a=p.parse_args();print(json.dumps(audit(a.candidate,a.symbols),indent=2))
