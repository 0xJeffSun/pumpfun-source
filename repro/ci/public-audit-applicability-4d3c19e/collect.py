from pathlib import Path
import hashlib,json,subprocess
ROOT=Path.cwd();W=ROOT/'work/public-audit-applicability-current';BASE='517d77db988d8c63b6cf476f0be138c5a4f3128a';CURRENT='4d3c19e3c58427f3604caede144b3322fa56d2b5';H=lambda b:hashlib.sha256(b).hexdigest();tracked=set(subprocess.check_output(['git','ls-files','-z']).decode().split('\0'));files=[];sources=set()

def save(name,data):
 p=W/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)

def nodes(value):
 if isinstance(value,dict):
  if 'path'in value and 'byte_start'in value and('byte_end_exclusive'in value):yield value
  for child in value.values():yield from nodes(child)
 elif isinstance(value,list):
  for child in value:yield from nodes(child)

for audit in ['audit_pump','audit_amm','audit_fees','audit_mayhem']:
 base=Path('repro/parallel-work/2026-10-25/results')/audit
 selected=[p for p in (ROOT/base).iterdir()if p.is_file()and (p.suffix in ['.json','.md','.py']or p.name=='SHA256SUMS')]
 selected+=list((ROOT/base/'dependencies').rglob('*.rs'))
 for p in selected:
  source=str(p.relative_to(ROOT));assert source in tracked;b=p.read_bytes();dest=Path('audit')/audit/p.relative_to(ROOT/base);save(dest,b);files.append({'source':source,'saved':str(dest),'sha256':H(b),'bytes':len(b),'git_blob':subprocess.check_output(['git','rev-parse',f'{CURRENT}:{source}']).decode().strip()})
 result=json.loads((ROOT/base/'result.json').read_text())
 for node in nodes(result):
  name=node['path'].removeprefix('inputs/').removeprefix('evidence/');sources.add(name)
 # Include source used by preserved account declarations and the complete relevant manifest/lock boundaries.
 for source in tracked:
  if source.startswith(str(base)+'/inputs/programs/')or source.startswith(str(base)+'/evidence/programs/'):
   name=source.split('/inputs/',1)[1]if'/inputs/'in source else source.split('/evidence/',1)[1]
   if name.endswith('.rs')or name.endswith('/Cargo.toml')or name.endswith('/Cargo.lock'):sources.add(name)
for name in ['Cargo.toml','Cargo.lock','programs/pump-fees/src/state.rs','programs/pump-fees/src/instructions/mod.rs','programs/pump-fees/src/instructions/fee_sharing/mod.rs','programs/pump-fees/src/instructions/fee_sharing/create_fee_sharing_config.rs']:sources.add(name)
source_files=[]
for name in sorted(sources):
 row={'path':name}
 for key,commit in [('base',BASE),('current',CURRENT)]:
  p=subprocess.run(['git','show',f'{commit}:{name}'],capture_output=True)
  if p.returncode:row[key]=None;continue
  b=p.stdout;dest=Path('source')/key/name;save(dest,b);row[key]={'saved':str(dest),'sha256':H(b),'bytes':len(b),'git_blob':subprocess.check_output(['git','rev-parse',f'{commit}:{name}']).decode().strip()}
  if key=='current':assert (ROOT/name).read_bytes()==b
 assert row['current'];source_files.append(row)
patch=subprocess.check_output(['git','diff','--no-ext-diff',BASE,CURRENT,'--','programs/pump/src','programs/pump/recovered','programs/pump-amm/src','programs/pump-fees/src','programs/mayhem/src','Cargo.lock','Cargo.toml','programs/pump/Cargo.lock','programs/pump/Cargo.toml','programs/pump-amm/Cargo.lock','programs/pump-amm/Cargo.toml','programs/pump-fees/Cargo.toml','programs/mayhem/Cargo.toml']);save('source-changes.patch',patch)
source_paths=[r['path']for r in source_files]
changes=subprocess.check_output(['git','diff','--name-only',BASE,CURRENT,'--','programs/pump/src','programs/pump/recovered','programs/pump-amm/src','programs/pump-fees/src','programs/mayhem/src']).decode().splitlines();assert all(x in source_paths for x in changes)
save('provenance.json',(json.dumps({'base_commit':BASE,'current_commit':CURRENT,'audit_files':files,'sources':source_files,'changed_rust_paths':changes,'excluded_inputs':['private audit output','work/security-followup','new runtime probes','stopped-lane semantic expansion'],'scope':'Public tracked audit files, relevant Git source blobs and current-source equality checks only; source hashes do not establish binary security identity.'},indent=2)+'\n').encode());print(len(files),'audit files',len(source_files),'source paths',len(changes),'changed Rust paths')
