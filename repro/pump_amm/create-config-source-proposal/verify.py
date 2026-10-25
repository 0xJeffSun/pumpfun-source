"""Portable read-only verification. Does not compile or execute a Solana program."""
from pathlib import Path
import difflib,hashlib,json,subprocess,sys,tarfile,tomllib
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;sha=lambda b:hashlib.sha256(b).hexdigest();read=lambda p:json.loads((W/p).read_text())
def safe(rel):
 p=Path(rel);assert not p.is_absolute()and '..'not in p.parts
 assert not any(x.endswith('-keypair.json')for x in p.parts)
 q=W/p;assert not q.is_symlink();return q
r=subprocess.run([sys.executable,'-B',str(W/'prerequisites/verify.py')],capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr
assert sha((W/'prerequisites/manifest.json').read_bytes())=='d4f0ef70d0eaa53476c9430d561ad664c8e05b691ab27a2c571040696cabb887'
base=read('baseline-source-sha256.json');proposal=read('proposed-source-sha256.json');assert len(base)==18 and len(proposal)==22
assert base==read('prerequisites/inputs/repro/pump_amm/scalar-guard-order-v144/build-comparison.json')['source_sha256']
for p,h in base.items():assert sha(safe('prerequisites/inputs/'+p).read_bytes())==h
for p,h in proposal.items():assert sha(safe('source/'+p).read_bytes())==h
modified=sorted(p for p in base if base[p]!=proposal[p]);new=sorted(set(proposal)-set(base))
assert modified==['programs/pump-amm/src/lib.rs','programs/pump-amm/src/state.rs']
assert new==['programs/pump-amm/src/instructions/admin/create_config.rs','programs/pump-amm/src/instructions/admin/mod.rs','programs/pump-amm/src/instructions/mod.rs','programs/pump-amm/src/state/global_config.rs']
diff=''
for p in sorted(set(modified+new)):
 old=safe('prerequisites/inputs/'+p).read_text()if p in base else ''
 current=safe('source/'+p).read_text();diff+=''.join(difflib.unified_diff(old.splitlines(True),current.splitlines(True),fromfile='a/'+p if p in base else '/dev/null',tofile='b/'+p))
assert diff==safe('source-only-proposal.patch').read_text()
for p in new:
 s=safe('source/'+p).read_text();assert '#[inline'not in s and '#[path'not in s and '\n\n\n'not in s
lib=safe('source/programs/pump-amm/src/lib.rs').read_text();methods=safe('source/programs/pump-amm/src/state/global_config.rs').read_text();context=safe('source/programs/pump-amm/src/instructions/admin/create_config.rs').read_text()
assert lib.count('pub fn create_config(')==1
for s in ['lp_fee_basis_points','protocol_fee_basis_points','protocol_fee_recipients','coin_creator_fee_basis_points']:assert lib.count('.set_'+s+'(')==2
assert methods.count('require_gte!(1000u64, fee, PumpAmmError::FeeBasisPointsExceedsMaximum);')==3
assert 'require_keys_neq!'not in methods and 'recipients.windows(2).all(|pair| pair[0] < pair[1])'in methods
for s in ['8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8','#[event_cpi]','#[account(mut, address = FIXED_ADMIN @ PumpAmmError::InvalidAdmin)]','#[account(init, payer = admin, space = 949, seeds = [b"global_config"], bump)]','pub admin: Signer<\'info>','pub system_program: Program<\'info, System>']:assert s in context
lock=tomllib.loads(safe('source/programs/pump-amm/Cargo.lock').read_text());pkgs={p['name']+'-'+p['version']:p for p in lock['package']};deps=read('dependency-source-manifest.json')
for crate,row in deps['archives'].items():
 b=safe(row['path']).read_bytes();assert len(b)==row['bytes']and sha(b)==row['sha256']==pkgs[crate]['checksum']
for p,row in deps['source_files'].items():
 b=safe('dependency-source/'+p).read_bytes();assert len(b)==row['bytes']and sha(b)==row['sha256'];crate=p.split('/')[0]
 with tarfile.open(safe(deps['archives'][crate]['path']))as tf:assert tf.extractfile(p).read()==b
r=subprocess.run([sys.executable,'-B',str(W/'analyze.py'),'--verify'],capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr;static=json.loads(r.stdout)
fields=read('field-stores-and-defaults.json');offset=8
for field in fields['fields']:assert field['serialized_offset']==offset;offset+=field['serialized_bytes']
assert offset==949
live=False
if '--current-source'in sys.argv:
 root=Path(sys.argv[sys.argv.index('--current-source')+1]).resolve()
 for p,h in base.items():assert sha((root/p).read_bytes())==h,p
 live=True
sealed=False
if(W/'manifest.json').exists():
 m=read('manifest.json');actual=set()
 for p in W.rglob('*'):
  assert not p.is_symlink()and not p.name.endswith('-keypair.json')
  if p.is_file()and p!=W/'manifest.json':actual.add(str(p.relative_to(W)))
 assert actual==set(m['files'])
 for p,row in m['files'].items():
  b=safe(p).read_bytes();assert sha(b)==row['sha256']and len(b)==row['bytes'],p
 sealed=True
print(json.dumps({'status':'PASS','prerequisite_manifest_verified':True,'baseline_inputs':len(base),'proposed_inputs':len(proposal),'modified_files':modified,'new_files':new,'locked_dependency_archives':len(deps['archives']),'verified_dependency_source_files':len(deps['source_files']),'static':static,'current_source_verified':live,'sealed':sealed,'payload_files':len(m['files'])if sealed else None,'build_executed':False,'runtime_executed':False,'positive_initializer_coverage':False},indent=2))
