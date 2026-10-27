"""Verify rebuilt Sell source origins, complete saved observations and signatures."""
from pathlib import Path
import hashlib,gzip,json,re,importlib.util,tempfile,subprocess,sys,contextlib,io,struct
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(raw(p))
def module(name,p):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify():
 paths=list(P.rglob('*'));assert not any(p.is_symlink()for p in paths);pins=load(P/'manifest.json')
 assert {str(p.relative_to(P))for p in paths if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}==set(pins)
 for n,h in pins.items():assert sha((P/n).read_bytes())==h,n
 for n,h in load(P/'inputs.json').items():assert sha((R/n).read_bytes())==h,n
 prior=load(R/'repro/mayhem/global-params-layout-recovery/prior-inventory.json.gz');m=module('sell_origin_elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');o=m.Elf(R/'evidence/original/mayhem/deployed.so');analysis=load(P/'body-analysis.json');old_sources=None;outputs={}
 for label,key in [('baseline','interval-location-clean'),('arithmetic','sell-arithmetic-clean'),('recovered','sell-located-clean'),('repeat','sell-located-clean')]:
  sources={str(p.relative_to(P/'sources'/label)).removesuffix('.gz'):sha(raw(p))for p in(P/'sources'/label).rglob('*.gz')};assert len(sources)==15
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');assert sources==launch['source_inputs']and result['root_invocations']==1 and result['returncode']==0 and result['source_unchanged']
  if old_sources is None:old_sources=sources
  else:assert {n for n in sources if sources[n]!=old_sources[n]}=={'src/state.rs','src/instructions/sell.rs'}
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  b=raw(P/f'artifacts/{label}/candidate.so.gz');s=raw(P/f'artifacts/{label}/symbols.so.gz');outputs[label]=(b,s)
  assert sha(b)==result['candidate_sha256']and sha(s)==result['symbols_sha256']
  with tempfile.TemporaryDirectory()as td:
   f=Path(td)/'symbols.so';f.write_bytes(s);c=m.Elf(f);ranges={(v['value'],v['value']+v['size'])for v in c.symbols if v['info']&15==2 and v['size']>=8 and c.lo<=v['value']<c.hi};windows=[c.window(*ab)for ab in ranges];patterns={(w['end']-w['start'],w['normalized_sha256'],str(w['normalization_pattern']))for w in windows};expected=analysis[key]['matches'];matched=set()
   for row in prior['original_rows']:
    if row['id']not in expected:continue
    w=o.window(row['start'],row['end'])
    if(w['end']-w['start'],w['normalized_sha256'],str(w['normalization_pattern']))in patterns:matched.add(row['id'])
   assert matched=={k for k,v in expected.items()if v}and len(matched)==188 and 'O0095'not in matched
 assert outputs['recovered']==outputs['repeat']and sha(outputs['recovered'][0])=='669fe92c30299d9b2fee1ac42815d3a6cfadb3c747ef361e5b917c19c3073c3b'
 assert struct.unpack_from('<i',o.b,129324)[0]==9 and struct.unpack_from('<Q',o.b,727056)[0]>>32==196888
 table=load(R/'repro/mayhem/global-params-layout-recovery/error-table-recovery.json');assert table['all20'][9]['name']=='PumpCpiMathOverflow'
 state=raw(P/'sources/recovered/src/state.rs.gz').decode().splitlines();assert state[320].index('10000')+1==26 and state[397].index('unwrap')+1==90 and state[577].index('unwrap')+1==49
 assert '.ok_or(crate::MayhemError::PumpCpiMathOverflow)?'in state[325]
 receipt=load(P/'runtime/sell-located-runtime.json.gz');assert receipt['case_count']==396 and not receipt['mismatches']and not receipt['normalized_log_differences']and receipt['candidate_sha256']==sha(outputs['recovered'][0])
 norm=lambda xs:[s for s in xs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)]
 for row in receipt['cases']:assert norm(row['original']['metadata']['logs'])==norm(row['candidate']['metadata']['logs'])
 admin=module('origin_admin',R/'repro/mayhem/global-params-layout-recovery/tools/admin_checker.py').verify(P/'runtime/sell-located-admin.json.gz');assert admin['verified_signed_transactions']==2064 and admin['successful_account_bytes_rederived']==624
 with tempfile.TemporaryDirectory()as td:
  t=Path(td);(t/'candidate.so').write_bytes(outputs['recovered'][0]);subprocess.run([sys.executable,'-B',str(R/'scripts/verify_mayhem_sell.py'),'--receipts',str(P/'runtime/sell-located-runtime.json.gz'),'--candidate',str(t/'candidate.so'),'--output',str(t/'sell-check.json')],check=True,capture_output=True);assert load(t/'sell-check.json')['verified_signed_transactions']==792
  # Relocate recorded paths; keep every signed receipt and checker predicate unchanged.
  receipts=t/'receipts';receipts.mkdir()
  for p in(P/'runtime/burn').rglob('*.gz'):
   f=receipts/str(p.relative_to(P/'runtime/burn')).removesuffix('.gz');f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(raw(p))
  d=load(receipts/'comparison.json');fixtures=R/'repro/mayhem/compiler-v154-runtime/control/burn-fixtures'
  for name,h in d['input_sha256'].items():
   if name.startswith('fixtures:'):continue
   f=t/name;assert f.resolve().is_relative_to(t.resolve());f.parent.mkdir(parents=True,exist_ok=True);b=outputs['recovered'][0]if name.startswith('work/')else(R/name).read_bytes();assert sha(b)==h;f.write_bytes(b)
  f=t/'scripts/mayhem_burn_sequence.py';f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes((R/'scripts/mayhem_burn_sequence.py').read_bytes());check=module('origin_burn',R/'scripts/verify_mayhem_burn_sequence.py');check.REPO=t;argv=sys.argv
  try:
   sys.argv=['verify','--fixtures',str(fixtures),'--receipts',str(receipts)]
   with contextlib.redirect_stdout(io.StringIO()):check.main()
  finally:sys.argv=argv
  assert load(receipts/'verification.json')['verified_transactions']==12
 for name,data in module('sell_origin_inventory',P/'inventory.py').generate().items():assert(P/name).read_bytes()==data
 print('PASS:188 retained bodies;396 Sell cases with exact non-compute logs;1032 admin cases;2868 verified signatures;whole identity remains false')
if __name__=='__main__':verify()
