"""Signed local crank relay-address and executable-precedence cases."""
from pathlib import Path
import argparse,hashlib,itertools,json,sys
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
import fees_donation_crank_probe as h
FIELDS=['error','before','after','inner','events']
def cases():
 return [dict(name=f'{key}-{executable}-{amount}-{ata}',key=key,executable=executable,amount=amount,ata=ata)for key,executable,amount,ata in itertools.product(['canonical','wrong'],[False,True],[0,1],[False,True])]
class Override:
 def __init__(self,vm,c):self.vm=vm;self.c=c
 def __getattr__(self,n):return getattr(self.vm,n)
 def set_account(self,key,account):
  if (self.c['key']=='wrong'and key==h.OTHER.pubkey())or(self.c['key']=='canonical'and key==h.WHITELIST):
   relay_key=h.OTHER.pubkey()if self.c['key']=='wrong'else h.RELAY
   old=self.vm.get_account(h.RELAY)
   relay=h.Account(old.lamports,old.data,old.owner,self.c['executable'],old.rent_epoch)
   self.vm.set_account(relay_key,relay)
  return self.vm.set_account(key,account)if not(self.c['key']=='wrong'and key==h.OTHER.pubkey())else None
def run(binary,c):
 f=h.CrankFixture(binary);f.vm=Override(f.vm,c)
 case=dict(name=c['name'],amount=c['amount'])
 if c['key']=='wrong':case['wrong_account']='donation_relay_program'
 if c['ata']:case['token_amount']=0
 r=f.run(case);account=f.vm.get_account(h.OTHER.pubkey() if c['key']=='wrong'else h.RELAY);r['relay_account']=dict(key=str(h.OTHER.pubkey()if c['key']=='wrong'else h.RELAY),owner=str(account.owner),executable=account.executable,lamports=account.lamports,data_sha256=hashlib.sha256(account.data).hexdigest());r['events']=[x for x in r['logs']if x.startswith('Program data:')];return r
def validate(r):
 assert r['fields']==FIELDS and r['case_count']==len(r['cases'])==16
 assert [x['case']for x in r['cases']]==cases()
 bad=[]
 for i,x in enumerate(r['cases']):
  c=x['case'];expected=2007 if not c['executable']else 3007 if c['key']=='wrong'else None
  for side in ['original','candidate']:
   row=x[side];a=row['relay_account'];assert a['executable']==c['executable']
   assert a['key']==str(h.OTHER.pubkey()if c['key']=='wrong'else h.RELAY)
   assert row['events']==[l for l in row['logs']if l.startswith('Program data:')]
  assert x['original']['error']==(f'TransactionErrorInstructionError((1, Tagged(InstructionErrorCustom({expected}))))'if expected is not None else None)
  same=all(x['original'][k]==x['candidate'][k]for k in FIELDS)
  assert same==x['match']and x['original']['relay_account']==x['candidate']['relay_account']
  if not same:bad.append(i)
 assert r['mismatches']==bad
 return bad
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);p.add_argument('--allow-mismatch',action='store_true');a=p.parse_args();rows=[]
 for c in cases():
  x,y=run(ROOT/'evidence/original/pump_fees/deployed.so',c),run(a.candidate,c)
  rows.append(dict(case=c,original=x,candidate=y,match=all(x[k]==y[k]for k in FIELDS)))
 r=dict(wrong_public_key=str(h.OTHER.pubkey()),scope='16 signed local relay address/executable cases crossing zero/nonzero donation and ATA existence; only listed fields compared; program logs retained.',fields=FIELDS,case_count=len(rows),cases=rows,mismatches=[i for i,x in enumerate(rows)if not x['match']],original_sha256=hashlib.sha256((ROOT/'evidence/original/pump_fees/deployed.so').read_bytes()).hexdigest(),candidate_sha256=hashlib.sha256(a.candidate.read_bytes()).hexdigest())
 validate(r);a.output.write_text(json.dumps(r,indent=2)+'\n');print('cases',len(rows),'mismatches',r['mismatches'])
 for x in rows:print(x['case']['name'],x['original']['error'],x['candidate']['error'])
 raise SystemExit(bool(r['mismatches'])and not a.allow_mismatch)
if __name__=='__main__':main()
