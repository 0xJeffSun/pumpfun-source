"""Signed local Crank cases comparing every retained field, including application logs."""
from pathlib import Path
import argparse,hashlib,json,sys
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
import fees_donation_crank_probe as h
def cases():
 rows=[dict(name='flags-'+str(n),flags=n,amount=0,token_amount=0)for n in range(256)]
 for quote in [str(h.QUOTE),str(h.MINT)]:
  for amount in [0,1]:
   for token in [None,0,1]:
    for flags in [0,8]:
     for listed in [False,True]:
      c=dict(name=f'flow-{quote}-{amount}-{token}-{flags}-{listed}',quote=quote,amount=amount,flags=flags,listed=listed)
      if token is not None:c['token_amount']=token
      rows.append(c)
 return rows
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);p.add_argument('--allow-mismatch',action='store_true');a=p.parse_args();original=h.CrankFixture(ROOT/'evidence/original/pump_fees/deployed.so');candidate=h.CrankFixture(a.candidate);rows=[]
 for c in cases():
  x,y=original.run(c),candidate.run(c);rows.append(dict(case=c,original=x,candidate=y,match=x==y))
 r=dict(scope='Signed local synthetic Crank cases; every retained field including raw logs and transaction bytes. No authentic protected relayer settlement success or exhaustive behavior claim.',original_sha256=hashlib.sha256((ROOT/'evidence/original/pump_fees/deployed.so').read_bytes()).hexdigest(),candidate_sha256=hashlib.sha256(a.candidate.read_bytes()).hexdigest(),case_count=len(rows),cases=rows,mismatches=[i for i,x in enumerate(rows)if not x['match']]);a.output.write_text(json.dumps(r,separators=(',',':'))+'\n');print('strict Crank',len(rows),'cases',len(r['mismatches']),'mismatches');raise SystemExit(bool(r['mismatches'])and not a.allow_mismatch)
if __name__=='__main__':main()
