from pathlib import Path
import base64,hashlib,json,re,subprocess,sys
from solders.transaction import Transaction
R=Path(__file__).resolve().parents[3];W=R/'work/mayhem-priority-20261027';D=Path(__file__).resolve().parent/'runtime437-prefix7200';candidate=W/'qualified-amm437-buy-sol-after-globals-01-build/candidate.so';h=hashlib.sha256(candidate.read_bytes()).hexdigest();M='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e';count=signatures=successes=0;groups=[]
for f in sorted(D.glob('*.json')):
 if f.name=='launch.json'or f.name=='commands.json'or f.name.endswith('-verified.json')or f.name=='summary.json':continue
 j=json.loads(f.read_bytes());assert j['candidate_sha256']==h and j['case_count']==9 and not j['mismatches']
 out=f.with_name(f.stem+'-verified.json');subprocess.run([sys.executable,'-B',str(R/'scripts/verify_mayhem_pump_swap.py'),'--candidate',str(candidate),'--receipts',str(f),'--output',str(out)],check=True,stdout=subprocess.DEVNULL)
 for pair in j['cases']:
  a,b=pair['original'],pair['candidate'];assert a['transaction_base64']==b['transaction_base64']
  for side,digest in [(a,j['original_sha256']),(b,h)]:
   tx=Transaction.from_bytes(base64.b64decode(side['transaction_base64']));assert all(tx.verify_with_results());signatures+=len(tx.signatures)
   for phase in ['before','after']:assert side[phase][M]['executable']and side[phase][M]['data_sha256']==digest
  logs=lambda r:[x for x in r['metadata']['logs']if not re.search(r' consumed \d+ of \d+ compute units',x)]
  assert logs(a)==logs(b);count+=1;successes+=a['error']is None
 groups.append(f.stem)
assert count==36 and len(groups)==4
summary={'candidate_sha256':h,'pairs':count,'signed_transaction_records':count*2,'verified_signature_fields':signatures,'successful_original_cases':successes,'groups':groups,'exact_noncompute_logs':True,'actual_program_accounts_checked':True}
(D/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary))
