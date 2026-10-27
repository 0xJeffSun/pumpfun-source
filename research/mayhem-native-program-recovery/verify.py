"""Authenticate native-Program recovery, full window gains and signed replay."""
from pathlib import Path
import sys,hashlib,json,gzip,tarfile,importlib.util,difflib,tomllib,base64,re,tempfile,subprocess,contextlib,io
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify():
 assert not any(p.is_symlink()for p in P.rglob('*'))
 actual={p.relative_to(P).as_posix():sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts};assert actual==load(P/'manifest.json')
 for n,h in load(P/'inputs.json').items():assert sha((R/n).read_bytes())==h,n
 src={p.relative_to(P/'sources').as_posix().removesuffix('.gz'):raw(p)for p in(P/'sources').rglob('*.gz')};root={k:v for k,v in src.items()if not k.startswith('vendor/')};assert len(root)==16
 prior={p.relative_to(R/'research/mayhem-amm-source-origins/sources').as_posix().removesuffix('.gz'):raw(p)for p in(R/'research/mayhem-amm-source-origins/sources').rglob('*.gz')}
 for n,b in prior.items():
  if n=='src/checked_program.rs':assert root[n]==b
  elif n.endswith('.rs'):assert root[n]==b.replace(b"CheckedSystemProgram<'info>",b"Program<'info,System>")
  elif n=='Cargo.toml':assert root[n]==b+b'\n[patch.crates-io]\nanchor-lang = { path = "vendor/anchor-lang" }\n'
  elif n!='Cargo.lock':assert root[n]==b
 before=tomllib.loads(prior['Cargo.lock'].decode());after=tomllib.loads(root['Cargo.lock'].decode());expected=json.loads(json.dumps(before))
 item=next(p for p in expected['package']if p['name']=='anchor-lang');checksum=item.pop('checksum');item.pop('source');assert after==expected
 archive=P/'upstream/anchor-lang-1.0.0.crate';assert sha(archive.read_bytes())==checksum
 with tarfile.open(archive)as t:
  assert not any(x.issym()or x.islnk()for x in t.getmembers());upstream={x.name.split('/',1)[1]:t.extractfile(x).read()for x in t.getmembers()if x.isfile()}
 vendor={k.removeprefix('vendor/anchor-lang/'):v for k,v in src.items()if k.startswith('vendor/anchor-lang/')};assert set(vendor)==set(upstream)|{'.cargo-ok'}and vendor['.cargo-ok']==b'{"v":1}'
 for n,b in upstream.items():
  if n=='src/accounts/program.rs':
   assert b.count(b'let is_unit_type = T::id() == Pubkey::default();')==1
   b=b.replace(b'let is_unit_type = T::id() == Pubkey::default();',b'// The captured System parser checks the all-zero ID too.').replace(b'if !is_unit_type && info.key != &T::id() {',b'if info.key != &T::id() {')
  assert vendor[n]==b,n
 patch=''.join(''.join(difflib.unified_diff(prior[n].decode().splitlines(True),root[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in sorted(prior)if prior[n]!=root[n]);assert patch.encode()==(P/'source.patch').read_bytes()
 outputs={}
 for label in ['recovered','repeat']:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');assert launch['source_inputs']=={n:sha(b)for n,b in src.items()};assert result['returncode']==0 and result['root_invocations']==1 and result['source_unchanged']
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  b=raw(P/f'artifacts/{label}/candidate.so.gz');s=raw(P/f'artifacts/{label}/symbols.so.gz');assert sha(b)==result['candidate_sha256']and sha(s)==result['symbols_sha256'];outputs[label]=(b,s)
 assert outputs['recovered']==outputs['repeat'];candidate,symbols=outputs['recovered'];assert sha(candidate)=='62a9e700ea52f7afb269e1aea22e4c163221cbe353539829cc1e1010bfcb819a'
 for n,b in module('native_analysis',P/'analysis.py').generate().items():assert(P/n).read_bytes()==b,n
 before_rows=load(R/'research/mayhem-full-window-audit/audit.json')['rows'];before={r['id']:r for r in before_rows};rows=load(P/'audit.json')['rows'];gains=[r for r in rows if before[r['id']]['status']=='unmatched'and r['status']!='unmatched'];losses=[r['id']for r in rows if before[r['id']]['status']!='unmatched'and r['status']=='unmatched'];assert not losses and [r['id']for r in gains]==['O0062','O0099','O0102','O0104','O0109','O0111','O0120','O0122','O0124','O0127','O0129','O0131','O0134','O0136'];assert load(P/'transition.json')==dict(gains=gains,losses=losses,new_matching_window_bytes=145720)
 assert {r['id']for r in rows if r['status']=='raw_local_match'}=={r['id']for r in before_rows if r['status']=='raw_local_match'}
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
 result=dict(source_inputs=len(src),new_normalized_bodies=14,full_window_matches=341,raw_local_matches=58,unmatched_windows=100,matched_new_window_bytes=145720,verified_signatures=signatures,admin_complete_accounts=624,runtime=summaries,compiler_executed=False,runtime_executed=False)
 assert load(P/'verification.json')==result
 print(json.dumps(result,indent=2))
if __name__=='__main__':verify()
