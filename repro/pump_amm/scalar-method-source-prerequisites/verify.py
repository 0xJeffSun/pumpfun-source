from pathlib import Path
import hashlib,json,subprocess,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;sha=lambda b:hashlib.sha256(b).hexdigest();read=lambda p:json.loads((W/p).read_text())
def safe(p):
 x=Path(p);assert not x.is_absolute()and '..'not in x.parts and not any(n.endswith('-keypair.json')for n in x.parts);q=W/x;assert not q.is_symlink();return q
inputs=read('input-manifest.json')
for p,e in inputs.items():
 b=safe('inputs/'+p).read_bytes();assert sha(b)==e['sha256']and len(b)==e['bytes'],p
history=read('historical-source-binding.json')
for row in history['members'].values():
 b=safe(row['copy']).read_bytes();assert sha(b)==row['sha256']and len(b)==row['bytes']
build=read('inputs/repro/pump_amm/scalar-guard-order-v144/build-comparison.json');assert len(build['source_sha256'])==18
for p,h in build['source_sha256'].items():assert inputs[p]['sha256']==h
fragment=safe('source-fragments/scalar_methods.rs').read_text();assert '#['not in fragment and '\n\n\n'not in fragment
for field in ['lp_fee_basis_points','protocol_fee_basis_points','coin_creator_fee_basis_points']:
 assert f'pub(crate) fn set_{field}(&mut self, fee: u64) -> Result<()>'in fragment
 assert f'self.{field} = fee;'in fragment
assert fragment.count('require_gte!(1000u64, fee, PumpAmmError::FeeBasisPointsExceedsMaximum);')==3
r=subprocess.run([sys.executable,'-B',str(W/'analyze.py'),'--verify'],capture_output=True,text=True);assert r.returncode==0,r.stderr;e=json.loads(r.stdout)
sealed=False
if(W/'manifest.json').exists():
 m=read('manifest.json');paths=set()
 for p in W.rglob('*'):
  assert not p.name.endswith('-keypair.json')and not p.is_symlink()
  if p.is_file()and p!=W/'manifest.json':paths.add(str(p.relative_to(W)))
 assert paths==set(m['files'])
 for p,row in m['files'].items():
  b=safe(p).read_bytes();assert sha(b)==row['sha256']and len(b)==row['bytes']
 sealed=True
print(json.dumps({'status':'PASS','input_files':len(inputs),'main_source_inputs':18,'static':e,'seal_verified':sealed,'payload_files':len(m['files'])if sealed else None,'integration_patch_proposed':False,'build_or_runtime_executed':False},indent=2))
