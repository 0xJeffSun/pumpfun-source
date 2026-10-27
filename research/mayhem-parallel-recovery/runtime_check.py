"""Recompute saved signed runtime predicates without executing a target."""
from pathlib import Path
import sys,hashlib,json,gzip,base64,re,tempfile,subprocess,contextlib,io,importlib.util
P=Path(__file__).resolve().parent;R=P.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify_runtime(candidate):
 from solders.transaction import Transaction
 may='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e';summaries=[];signatures=0
 expected={'native':419,'token':419,'token22':419,'sell':396,'buy':486,**{f'sell-amm-{f}':413 for f in ['native','token','token22']},**{f'buy-v2-{f}':613 for f in ['native','token','token22']},**{f'sell-v2-{f}':473 for f in ['native','token','token22']}}
 for family,count in expected.items():
  d=load(P/f'runtime/vendor-{family}.json.gz');assert d['original_sha256']==sha((R/'evidence/original/mayhem/deployed.so').read_bytes());assert d['candidate_sha256']==sha(candidate)and d['case_count']==len(d['cases'])==count and not d['mismatches']
  for n,h in d['harness_sha256'].items():assert sha((R/n).read_bytes())==h
  case_path=('repro/mayhem/nineteen/sell-cases.json'if family=='sell'else'repro/mayhem/twenty/buy-cases.json'if family=='buy'else'repro/mayhem/twentyone/sell-v2-cases.json'if family.startswith('sell-v2-')else'repro/mayhem/twentytwo/buy-v2-cases.json'if family.startswith('buy-v2-')else'repro/mayhem/twentyfour/sell-pump-swap-cases.json'if family.startswith('sell-amm-')else'repro/mayhem/twentyfour/buy-pump-swap-cases.json')
  assert [r['case']['name']for r in d['cases']]==[c['name']for c in load(R/case_path)['cases']]
  exact_logs=0
  for row in d['cases']:
   a,b=row['original'],row['candidate'];assert not row['different_fields'];assert a['transaction_base64']==b['transaction_base64']and a['error']==b['error']
   for v in [a,b]:
    tx=Transaction.from_bytes(base64.b64decode(v['transaction_base64']));assert all(tx.verify_with_results());signatures+=1
    for phase in ['before','after']:
     for account in v[phase].values():
      if account is not None and not account['executable']:assert sha(base64.b64decode(account['data_base64']))==account['data_sha256']
   for phase in ['before','after']:assert{k:v for k,v in a[phase].items()if k!=may}=={k:v for k,v in b[phase].items()if k!=may}
   for field in ['inner_instructions','return_data']:assert a['metadata'][field]==b['metadata'][field]
   ev=lambda v:[s for s in v['metadata']['logs']if s.startswith('Program data: ')];assert ev(a)==ev(b)
   norm=lambda v:[s for s in v if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)]
   exact_logs+=norm(a['metadata']['logs'])==norm(b['metadata']['logs'])
  if family in ['native','token','token22','sell']:assert exact_logs==count
  summaries.append(dict(family=family,cases=count,signatures=count*2,successful_original_cases=sum(r['original']['error']is None for r in d['cases']),exact_noncompute_logs=exact_logs))
 assert load(P/'runtime/admin.json.gz')['candidate_sha256']==sha(candidate)
 admin=module('native_admin',R/'repro/mayhem/global-params-layout-recovery/tools/admin_checker.py').verify(P/'runtime/admin.json.gz');assert admin['verified_signed_transactions']==2064 and admin['successful_account_bytes_rederived']==624;signatures+=2064
 with tempfile.TemporaryDirectory()as td:
  t=Path(td);f=t/'candidate.so';f.write_bytes(candidate);subprocess.run([sys.executable,'-B',str(R/'scripts/verify_mayhem_sell.py'),'--receipts',str(P/'runtime/vendor-sell.json.gz'),'--candidate',str(f),'--output',str(t/'sell-check.json')],check=True,capture_output=True)
  receipts=t/'receipts';receipts.mkdir()
  for p in(P/'runtime/burn').rglob('*.gz'):
   f=receipts/p.relative_to(P/'runtime/burn').as_posix().removesuffix('.gz');f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(raw(p))
  comparison=load(receipts/'comparison.json');fixtures=R/'repro/mayhem/compiler-v154-runtime/control/burn-fixtures'
  for n,h in comparison['input_sha256'].items():
   if n.startswith('fixtures:'):continue
   f=t/n;assert f.resolve().is_relative_to(t.resolve());f.parent.mkdir(parents=True,exist_ok=True);b=candidate if n.startswith('work/')else(R/n).read_bytes();assert sha(b)==h;f.write_bytes(b)
  f=t/'scripts/mayhem_burn_sequence.py';f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes((R/'scripts/mayhem_burn_sequence.py').read_bytes());checker=module('native_burn',R/'scripts/verify_mayhem_burn_sequence.py');checker.REPO=t;argv=sys.argv
  try:
   sys.argv=['verify','--fixtures',str(fixtures),'--receipts',str(receipts)]
   with contextlib.redirect_stdout(io.StringIO()):checker.main()
  finally:sys.argv=argv
  assert load(receipts/'verification.json')['verified_transactions']==12;signatures+=12
 assert signatures==15348
 return dict(verified_signatures=signatures,trade_comparisons=sum(x['cases']for x in summaries),admin_cases=1032,burn_transactions=12,corpora=summaries)
