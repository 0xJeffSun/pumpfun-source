"""Read retained inputs only; writes this audit packet, never Cargo/source/target."""
import hashlib,importlib.util,json,re,shutil,struct,tomllib
from pathlib import Path
R=Path.cwd();W=R/'work/mayhem-hashbrown-audit';D=W/'inputs';D.mkdir(exist_ok=True)
H=lambda b:hashlib.sha256(b).hexdigest()
old=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source');tool=Path('/Users/shawwalters/.cache/solana/v1.52/platform-tools');cache=old/'work/mayhem-burn-fixtures/cargo-home/registry/src/index.crates.io-1949cf8c6b5b557f';target=old/'work/mayhem-sell-result-error-main/target'
files={
 'accepted-Cargo.toml':R/'programs/mayhem/Cargo.toml','accepted-Cargo.lock':R/'programs/mayhem/Cargo.lock',
 'prior-mayhem-Cargo.lock':R/'repro/parallel-work/2026-10-24/wave2-results/public_audit_coverage/evidence/baseline/programs/mayhem/Cargo.lock',
 'sysroot-Cargo.lock':tool/'rust/lib/rustlib/src/rust/library/Cargo.lock','sysroot-std-Cargo.toml':tool/'rust/lib/rustlib/src/rust/library/std/Cargo.toml',
 'build-attempt.json':R/'repro/mayhem/sell-result-error-main-twentyfour/main/build-attempt.json','build.log':R/'repro/mayhem/sell-result-error-main-twentyfour/main/build.log',
 'host-hashbrown.d':target/'release/deps/hashbrown-418e238472dd724c.d',
 'host-hashbrown-fingerprint.json':target/'release/.fingerprint/hashbrown-418e238472dd724c/lib-hashbrown.json',
 'host-indexmap-fingerprint.json':target/'release/.fingerprint/indexmap-ca9c934745307969/lib-indexmap.json',
 'target-mayhem.d':target/'sbf-solana-solana/release/deps/mayhem_recovered.d',
}
for pkg in ['anchor-derive-serde-1.0.0','borsh-derive-1.8.1','num_enum_derive-0.7.6','indexmap-2.14.2','toml_edit-0.25.17+spec-1.1.0','proc-macro-crate-3.5.0']:
 files[pkg+'-Cargo.toml']=cache/pkg/'Cargo.toml'
receipts={}
for name,p in files.items():
 b=p.read_bytes();(D/name).write_bytes(b);receipts[name]={'origin':str(p.relative_to(R)) if p.is_relative_to(R) else str(p),'bytes':len(b),'sha256':H(b)}
lock=tomllib.loads((D/'accepted-Cargo.lock').read_text())['package'];oldlock=tomllib.loads((D/'prior-mayhem-Cargo.lock').read_text())['package'];syslock=tomllib.loads((D/'sysroot-Cargo.lock').read_text())['package']
reverse={n:[{'name':p['name'],'version':p['version']} for p in lock if any(x.split()[0]==n for x in p.get('dependencies',[]))] for n in ['hashbrown','indexmap','toml_edit','proc-macro-crate']}
artifacts={}
for name,p in {'original':R/'evidence/original/mayhem/deployed.so','candidate':R/'repro/mayhem/sell-result-error-main-twentyfour/main/candidate.so','candidate-symbols':R/'repro/mayhem/sell-result-error-main-twentyfour/main/unstripped.so','sysroot-hashbrown':tool/'rust/lib/rustlib/sbf-solana-solana/lib/libhashbrown-a37bb642aaee996c.rlib'}.items():
 b=p.read_bytes();tokens=[]
 for m in re.finditer(rb'hashbrown-0\.(?:15\.4|17\.1)/src/[A-Za-z0-9_/.-]{1,160}',b):
  if len(tokens)<12:tokens.append({'file_offset':m.start(),'token':m.group().decode('utf8','replace')})
 artifacts[name]={'origin':str(p.relative_to(R)) if p.is_relative_to(R) else str(p),'bytes':len(b),'sha256':H(b),'positive_path_witnesses':tokens}
spec=importlib.util.spec_from_file_location('e',R/'repro/pump/buy-v3-quote-vault-contract/elf_reader.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
e=m.ELF(R/artifacts['candidate-symbols']['origin']);syms=[{'name':s['name'],'value':s['value'],'bytes':s['size'],'body_sha256':H(e.at(s['value'],s['size']))} for s in e.syms if 'hashbrown' in s['name'] and s['size'] and s['info']&15==2]
# File literal positions must belong to an allocated section to count as target-data witnesses.
for name in ['original','candidate']:
 e=m.ELF(R/artifacts[name]['origin'])
 for v in artifacts[name]['positive_path_witnesses']:
  v['allocated_sections']=[s['name'] for s in e.ss if s['flags']&2 and s['offset']<=v['file_offset']<s['offset']+s['size']]
source_hashes={str(p.relative_to(R)):H(p.read_bytes()) for p in sorted((R/'programs/mayhem').rglob('*.rs')) if '/target/' not in str(p)}
searchroot=R/'repro/parallel-work/2026-10-25/independent-reconstruction-review';searched=[];matches=[]
pattern=re.compile(r'failed to select a version for.{0,60}hashbrown|hashbrown.{0,60}(?:\^0\.17|=0\.15\.4)|pin.{0,40}hashbrown',re.I)
for p in sorted(searchroot.rglob('*')):
 if p.is_file() and p.suffix in {'.md','.log','.json','.out','.txt','.stderr','.stdout','.patch','.toml','.lock'} and p.stat().st_size<=2000000:
  b=p.read_bytes();searched.append({'path':str(p.relative_to(R)),'bytes':len(b),'sha256':H(b)})
  for i,line in enumerate(b.decode('utf8','replace').splitlines(),1):
   if pattern.search(line):matches.append({'path':str(p.relative_to(R)),'line':i,'text':line})
out={'scope':'read-only retained source/lock/metadata/build graph audit; no Cargo, update, build or runtime','input_receipts':receipts,'source_hashes':source_hashes,'reverse_edges':reverse,'project_hashbrown_versions':[p['version'] for p in lock if p['name']=='hashbrown'],'prior_project_hashbrown_versions':[p['version'] for p in oldlock if p['name']=='hashbrown'],'sysroot_hashbrown_versions':[p['version'] for p in syslock if p['name']=='hashbrown'],'artifacts':artifacts,'candidate_hashbrown_function_symbols':syms,'pin_failure_receipt_search':{'root':str(searchroot.relative_to(R)),'pattern':pattern.pattern,'file_selection':'listed suffixes, <=2000000bytes; no broad filesystem absence claim','files':searched,'matches':matches},'target_hashbrown_depinfo_files_observed':[str(p.relative_to(target)) for p in target.glob('sbf-solana-solana/release/deps/*hashbrown*')],'version_to_original_source_or_compiler_identity_proven':False}
(W/'findings.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'copied_inputs':len(files),'target_function_symbols':len(syms),'project_hashbrown_versions':out['project_hashbrown_versions'],'prior_project_hashbrown_versions':out['prior_project_hashbrown_versions'],'sysroot_hashbrown_versions':out['sysroot_hashbrown_versions'],'searched_files':len(searched),'receipt_search_matches':len(matches)}))
