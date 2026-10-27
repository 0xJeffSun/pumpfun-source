"""Recheck source/artifact bindings, full-window inventory and signed observations."""
from pathlib import Path
import sys,json,hashlib,gzip,tempfile,importlib.util,base64,re,subprocess,contextlib,io,struct
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1]
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(raw(p))
def sha(b):return hashlib.sha256(b).hexdigest()
def module(name,p):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify():
 pins=load(P/'manifest.json');assert pins=={p.relative_to(P).as_posix():sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts}
 for n,h in load(P/'inputs.json').items():assert sha((R/n).read_bytes())==h,n
 src={p.relative_to(P/'sources').as_posix().removesuffix('.gz'):raw(p)for p in(P/'sources').rglob('*.gz')};assert len(src)==16
 prior={p.relative_to(R/'research/mayhem-sell-origin-recovery/sources/recovered').as_posix().removesuffix('.gz'):raw(p)for p in(R/'research/mayhem-sell-origin-recovery/sources/recovered').rglob('*.gz')}
 changed={n for n in src if src[n]!=prior.get(n)};assert changed=={'src/state.rs','src/instructions/mod.rs','src/instructions/buy_pump_swap.rs','src/instructions/pump_amm_interface.rs'}
 outputs={}
 for label in ['recovered','repeat']:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');assert launch['source_inputs']=={n:sha(b)for n,b in src.items()};assert result['returncode']==0 and result['root_invocations']==1 and result['source_unchanged']
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  b=raw(P/f'artifacts/{label}/candidate.so.gz');s=raw(P/f'artifacts/{label}/symbols.so.gz');assert sha(b)==result['candidate_sha256']and sha(s)==result['symbols_sha256'];outputs[label]=(b,s)
 assert outputs['recovered']==outputs['repeat'];candidate,symbols=outputs['recovered'];assert sha(candidate)=='fa4f9894cdecf2dd1528fe09e25aa8b762fea5771a8b32827ccff5f8c0b24da7'
 for n,b in module('amm_inventory',P/'inventory.py').generate().items():assert(P/n).read_bytes()==b
 state=src['src/state.rs'].decode().splitlines();adapter=src['src/instructions/pump_amm_interface.rs'].decode().splitlines()
 for n,needle,col in [(321,'10000',26),(424,'unwrap',43),(463,'unwrap',14),(464,'unwrap',34)]:assert state[n-1].index(needle)+1==col
 assert adapter[402].index('before_quote')+1==23 and adapter[403].index('after_tokens')+1==26
 m=module('amm_elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');o=m.Elf(R/'evidence/original/mayhem/deployed.so')
 # Check actual source-origin records, including the stored high-word pointer form.
 for at,line,col in [(726928,321,26),(727136,424,43),(727184,463,14),(727160,464,34),(726592,403,23),(726616,404,26)]:
  ptr,n,l,c=struct.unpack_from('<QQII',o.b,at);ptr=ptr>>32 if ptr>>32 else ptr;assert(l,c)==(line,col)
  suffix=b'instructions/pump_amm_interface.rs\0'if line in [403,404]else b'state.rs\0';assert o.b[ptr:ptr+n].endswith(suffix)
 with tempfile.TemporaryDirectory()as td:
  f=Path(td)/'symbols.so';f.write_bytes(symbols);c=m.Elf(f)
  for name,a,b,size in [('record_amm_buy',181656,184200,2536),('buy_quote',185296,186552,1120)]:
   h=next(s for s in c.symbols if s['info']&15==2 and name in s['name']);assert h['size']==size;assert c.norm(h['value'],h['value']+size)[0]!=o.norm(a,b)[0]
 from solders.transaction import Transaction
 may='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e';summaries=[]
 for family in ['native','token','token22','sell']:
  d=load(P/f'runtime/{family}.json.gz');expected=396 if family=='sell'else 419
  assert d['candidate_sha256']==sha(candidate)and d['original_sha256']==sha(o.b)and d['case_count']==len(d['cases'])==expected and not d['mismatches']
  for n,h in d['harness_sha256'].items():assert sha((R/n).read_bytes())==h
  equal_logs=0
  for row in d['cases']:
   a,b=row['original'],row['candidate'];assert not row['different_fields'];assert a['transaction_base64']==b['transaction_base64']and a['error']==b['error']
   for value in [a,b]:
    tx=Transaction.from_bytes(base64.b64decode(value['transaction_base64']));assert all(tx.verify_with_results())
    for phase in ['before','after']:
     for account in value[phase].values():
      if account is not None and not account['executable']:assert sha(base64.b64decode(account['data_base64']))==account['data_sha256']
   for phase in ['before','after']:assert{k:v for k,v in a[phase].items()if k!=may}=={k:v for k,v in b[phase].items()if k!=may}
   for field in ['inner_instructions','return_data']:assert a['metadata'][field]==b['metadata'][field]
   ev=lambda v:[s for s in v['metadata']['logs']if s.startswith('Program data: ')];assert ev(a)==ev(b)
   norm=lambda v:[s for s in v if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)]
   equal_logs+=norm(a['metadata']['logs'])==norm(b['metadata']['logs'])
  assert equal_logs==expected,(family,equal_logs,expected)
  summaries.append(dict(family=family,cases=expected,signatures=expected*2,successful_original_cases=sum(x['original']['error']is None for x in d['cases']),exact_noncompute_logs=equal_logs))
 admin=module('amm_admin',R/'repro/mayhem/global-params-layout-recovery/tools/admin_checker.py').verify(P/'runtime/admin.json.gz');assert admin['verified_signed_transactions']==2064 and admin['successful_account_bytes_rederived']==624
 with tempfile.TemporaryDirectory()as td:
  t=Path(td);f=t/'candidate.so';f.write_bytes(candidate);subprocess.run([sys.executable,'-B',str(R/'scripts/verify_mayhem_sell.py'),'--receipts',str(P/'runtime/sell.json.gz'),'--candidate',str(f),'--output',str(t/'sell-verification.json')],check=True,capture_output=True);assert load(t/'sell-verification.json')['verified_signed_transactions']==792
  receipts=t/'receipts';receipts.mkdir()
  for p in(P/'runtime/burn').rglob('*.gz'):
   f=receipts/p.relative_to(P/'runtime/burn').as_posix().removesuffix('.gz');f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(raw(p))
  comparison=load(receipts/'comparison.json');fixtures=R/'repro/mayhem/compiler-v154-runtime/control/burn-fixtures'
  for name,h in comparison['input_sha256'].items():
   if name.startswith('fixtures:'):continue
   f=t/name;assert f.resolve().is_relative_to(t.resolve());f.parent.mkdir(parents=True,exist_ok=True);b=candidate if name.startswith('work/')else(R/name).read_bytes();assert sha(b)==h;f.write_bytes(b)
  f=t/'scripts/mayhem_burn_sequence.py';f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes((R/'scripts/mayhem_burn_sequence.py').read_bytes());checker=module('amm_burn',R/'scripts/verify_mayhem_burn_sequence.py');checker.REPO=t;argv=sys.argv
  try:
   sys.argv=['verify','--fixtures',str(fixtures),'--receipts',str(receipts)]
   with contextlib.redirect_stdout(io.StringIO()):checker.main()
  finally:sys.argv=argv
  assert load(receipts/'verification.json')['verified_transactions']==12
 result=dict(trade_replays=summaries,admin_cases=1032,admin_complete_account_results=624,burn_signed_transactions=12,total_verified_signatures=5382,matched_examined_bodies=188,unmatched_examined_bodies=10,opaque_windows=243,compiler_executed=False,runtime_executed=False)
 assert load(P/'verification.json')==result
 print(json.dumps(result,indent=2))
if __name__=='__main__':verify()
