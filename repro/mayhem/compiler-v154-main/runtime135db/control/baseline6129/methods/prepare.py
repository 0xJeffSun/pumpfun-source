from pathlib import Path
import json,hashlib,tarfile,shutil
P=Path(__file__).resolve().parent;ROOT=P.parents[1];A=ROOT/'repro/mayhem/buy-result-error-twentyfour'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
manifest=json.loads((A/'manifest.json').read_text())
for rel,row in manifest['files'].items():assert H(A/rel)==row['sha256'],rel
with tarfile.open(A/'runtime-repository.tar.gz') as t:t.extractall(P,filter='data')
shutil.move(str(P/'runtime-repository'),str(P/'source'))
S=P/'source';base=json.loads((A/'gate-before.json').read_text());g={}
for rel,old in base['main_sources'].items():
 f=ROOT/rel
 if f.suffix=='.rs' or f.name in ['Cargo.toml','Cargo.lock']:
  assert f.read_bytes()==(S/rel).read_bytes(),rel
 g[rel]=H(f)
 shutil.copy2(f,S/rel)
for kind in ['helpers','runtime_inputs','tools']:
 for rel,h in base[kind].items():assert H(Path(rel) if kind=='tools' else ROOT/rel)==h,(kind,rel)
proposal=ROOT/'work/mayhem-next-error-pass'
assert (proposal/'before/sell_pump_swap.rs').read_bytes()==(S/'programs/mayhem/src/instructions/sell_pump_swap.rs').read_bytes()
shutil.copy2(proposal/'proposal/sell_pump_swap.rs',S/'programs/mayhem/src/instructions/sell_pump_swap.rs')
for rel in g:
 if rel!='programs/mayhem/src/instructions/sell_pump_swap.rs':assert H(S/rel)==g[rel]
(P/'gate-before.json').write_text(json.dumps({'main_sources':g,'helpers':base['helpers'],'runtime_inputs':base['runtime_inputs'],'tools':base['tools'],'baseline_candidate':'dda5554a2faf8aa40fc86547e91c4b32c6ac44b878073dcb8bd9f7ac60b47cd4','source_delta_files':['programs/mayhem/src/instructions/sell_pump_swap.rs'],'base_publication_manifest_sha256':H(A/'manifest.json')},indent=2)+'\n')
with tarfile.open(S/'repro/mayhem/twentyfour/captured-fixtures.tar.gz') as t:
 f=P/'burn-fixtures';f.mkdir();t.extractall(f,filter='data')
print('Current typed-buy baseline/source/tool/runtime gates passed; exactly one reviewed sell expression differs in isolated source.')
