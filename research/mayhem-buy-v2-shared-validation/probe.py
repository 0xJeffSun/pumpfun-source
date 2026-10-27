from pathlib import Path
import sys,json,gzip,hashlib,re,argparse,base64
config=argparse.ArgumentParser(add_help=False);config.add_argument('--work',type=Path,required=True);options,remaining=config.parse_known_args();sys.argv=[sys.argv[0]]+remaining
R=Path(__file__).resolve().parents[2];B=options.work.resolve();sys.path.insert(0,str(R/'scripts'))
import mayhem_buy_v2_fixture as fixture
from solders.transaction import Transaction
cases=[dict(name='ordinary'),dict(name='paused',paused=1),dict(name='rate-limited',last=95,interval=10),dict(name='rate-equal',last=90,interval=10),dict(name='future-last',last=110,interval=1),dict(name='rate-disabled',last=110,interval=0),dict(name='interval-overflow',last=2**63-1,interval=1),dict(name='negative-clock',now=-1,last=0,interval=1)]
def compare(a,b):
 fields=[]
 for row in [a,b]:assert all(Transaction.from_bytes(base64.b64decode(row['transaction_base64'])).verify_with_results())
 for field in ['error','transaction_base64']:
  if a[field]!=b[field]:fields.append(field)
 for phase in ['before','after']:
  if {k:v for k,v in a[phase].items()if k!=str(fixture.MAY)}!={k:v for k,v in b[phase].items()if k!=str(fixture.MAY)}:fields.append(phase)
 for f in ['inner_instructions','return_data']:
  if a['metadata'][f]!=b['metadata'][f]:fields.append(f)
 logs=lambda row:[line for line in row['metadata']['logs']if not re.search(r' consumed \d+ of \d+ compute units',line)]
 if logs(a)!=logs(b):fields.append('non_compute_logs')
 return fields
def main():
 p=argparse.ArgumentParser();p.add_argument('label');a=p.parse_args();candidate=B/'builds'/a.label/'candidate.so';assert not (B/(a.label+'-buy-v2-probe.json.gz')).exists();rows=[]
 for family in ['native','token','token22']:
  for case in cases:
   c=dict(case,name=family+'-'+case['name'],token_quote=family!='native',quote_token22=family=='token22');original=fixture.run(c);proposal=fixture.run(c,candidate);diff=compare(original,proposal)
   rows.append(dict(case=c,original=original,candidate=proposal,differences=diff));print(c['name'],original['error'],diff,flush=True)
 report=dict(candidate_sha256=hashlib.sha256(candidate.read_bytes()).hexdigest(),original_sha256=hashlib.sha256((R/'evidence/original/mayhem/deployed.so').read_bytes()).hexdigest(),cases=rows,mismatches=[r['case']['name']for r in rows if r['differences']])
 (B/(a.label+'-buy-v2-probe.json.gz')).write_bytes(gzip.compress(json.dumps(report,sort_keys=True).encode(),mtime=0));print('CASES',len(rows),'MISMATCHES',len(report['mismatches']),flush=True)
if __name__=='__main__':main()
