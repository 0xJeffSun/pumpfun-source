from pathlib import Path
import hashlib,json,shutil,subprocess,tomllib,tarfile
W=Path(__file__).resolve().parent;R=W.parents[1];P=W/'publication';assert P.is_dir()
H=lambda b:hashlib.sha256(b).hexdigest()
origins={}
def cp(src,dst):
 s=R/src if not Path(src).is_absolute() else Path(src);d=P/dst
 assert not s.is_symlink() and not s.name.endswith('-keypair.json')
 d.parent.mkdir(parents=True,exist_ok=True)
 if d.exists(): assert d.read_bytes()==s.read_bytes()
 else: shutil.copyfile(s,d)
 b=d.read_bytes()
 origins[dst]={'source':str(s.relative_to(R)) if s.is_relative_to(R) else 'locked-registry/'+s.parent.parent.name+'/'+s.name,'sha256':H(b),'bytes':len(b)}
 return b
base='repro/pump_fees/donation-borrow-v144'
smap=json.loads((R/base/'source-sha256.json').read_text());assert len(smap)==26
for n,h in smap.items():assert H(cp(n,'inputs/current-source/'+n))==h
for src,dst in [('evidence/original/pump_fees/deployed.so','inputs/original.so'),(base+'/pump_fees_candidate.so','inputs/candidate.so'),(base+'/symbols.so','inputs/symbols.so'),(base+'/source-sha256.json','inputs/current-source-sha256.json'),(base+'/manifest-sha256.json','inputs/current-package-manifest.json'),(base+'/README.md','inputs/current-package-README.md'),(base+'/provenance.json','inputs/current-package-provenance.json'),('repro/layered-passes/pass-01/results/fees/social-helper-lead.json','inputs/prior-social-helper-lead.json'),('repro/layered-passes/pass-01/results/fees/REPORT.md','inputs/prior-layer01-REPORT.md'),('repro/layered-passes/pass-01/results/fees/elf_reader.py','elf_reader.py')]:cp(src,dst)
registry=Path('/Users/shawwalters/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f')
lock=tomllib.loads((R/'Cargo.lock').read_text());packages={p['name']:p for p in lock['package']}
needed={'anchor-lang':['src/lib.rs','src/error.rs','src/accounts/signer.rs','src/accounts/program.rs'], 'anchor-spl':['src/token_interface.rs','src/associated_token.rs'], 'solana-account-info':['src/lib.rs'], 'solana-program':['src/program.rs'], 'spl-associated-token-account':['src/lib.rs','src/instruction.rs'], 'spl-associated-token-account-client':['src/address.rs','src/instruction.rs'], 'spl-token-2022':['src/state.rs']}
deps=[]
for name,files in needed.items():
 rec=packages[name];version=rec['version'];r=registry/(name+'-'+version)
 archive=registry.parents[1]/'cache'/registry.name/(name+'-'+version+'.crate')
 assert H(archive.read_bytes())==rec['checksum']
 with tarfile.open(archive) as tf:
  checks={'files':{f:H(tf.extractfile(name+'-'+version+'/'+f).read()) for f in files}}
 for f in files:
  src=r/f;d='inputs/locked/'+name+'-'+version+'/'+f;b=cp(src,d);assert H(b)==checks['files'][f]
  origins[d]['source']='locked-registry/'+name+'-'+version+'/'+f
 deps.append({'name':name,'version':version,'archive_sha256':rec['checksum'],'source_files':{f:checks['files'][f] for f in files}})
(P/'inputs/locked-dependencies.json').write_text(json.dumps(deps,indent=2)+'\n')
(P/'input-origins.json').write_text(json.dumps(origins,indent=2,sort_keys=True)+'\n')
(P/'baseline.json').write_text(json.dumps({'observed_HEAD':subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip(),'candidate_sha256':H((P/'inputs/candidate.so').read_bytes()),'symbols_sha256':H((P/'inputs/symbols.so').read_bytes()),'source_inputs':26,'source_claim':'Actual current 5cf8 compiler inputs checked against accepted source-sha256.json; observed HEAD is context, not a claim that uncommitted source is included in that revision.','prior_layer01_candidate':'fc1088; old offsets are not reused without current symbol lookup and full-window comparison.','builds':0,'target_executions':0,'runtime_cases':0},indent=2)+'\n')
print('prepared',len(origins),'copied inputs')
