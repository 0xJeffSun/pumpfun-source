"""Preparation-only frozen corpus copy/hash inventory; no VM/compiler."""
from pathlib import Path
import json,hashlib,shutil,tarfile,sys,importlib.metadata,ast,os
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1];B=R/'repro/mayhem/sell-result-error-twentyfour';S=R/'work/mayhem-v154-retarget-validation/public-v2';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,v):(P/n).write_text(json.dumps(v,indent=2)+'\n')
source14=J(S/'reviewed-plan/audit/frozen-source.json')
seed=P/'seed'
vm={};imports={}
for f in(seed/'scripts').glob('*.py'):
 lines=f.read_text().splitlines();vm[str(f.relative_to(seed))]=[{'line':i+1,'text':line.strip()}for i,line in enumerate(lines)if any(x in line for x in ['LiteSVM(','.with_sigverify(','.with_blockhash_check(','.with_transaction_history(','.with_log_bytes_limit(','.add_program_from_file('])];assert not any('initialize_mayhem_state'in line for line in lines)
 tree=ast.parse(f.read_text());imports[str(f.relative_to(seed))]=sorted({n.module for n in ast.walk(tree)if isinstance(n,ast.ImportFrom)and n.module}|{a.name for n in ast.walk(tree)if isinstance(n,ast.Import)for a in n.names})
manifest=J(seed/'repro/mayhem/twentyfour/runtime-manifest.json');python=Path(sys.executable).resolve();assert H(python)==manifest['python_executable_sha256'];dist=importlib.metadata.distribution('solders');assert dist.version==manifest['solders_version']=='0.27.1';runtime={str(python):H(python)}
for package in ['solders','jsonalias','typing_extensions']:
 d=importlib.metadata.distribution(package)
 files=d.files
 if files is None:
  assert package=='typing_extensions';files=['typing_extensions.py']
  assert Path(d.locate_file(files[0])).is_file()
 for f in files:
  path=Path(d.locate_file(f)).resolve()
  if path.is_file()and '__pycache__'not in path.parts and not path.suffix=='.pyc':runtime[str(path)]=H(path)
assert any(h==manifest['solders_binary_sha256']for h in runtime.values())
# Metadata-only historical summary dependencies; exact bytes, never assertions/fixtures rewritten.
ancestors={}
for n in ['repro/mayhem/twentyfour/burn-sequences/comparison.json',*[f'repro/mayhem/buy-result-error-twentyfour/replay/{name}.json.gz'for name in ['buy-pump-swap-native','buy-pump-swap-token','sell-pump-swap-native','sell-pump-swap-token']]]:
 f=R/n;d=P/'historical-summary-inputs'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(f,d);ancestors[n]=H(f)
settings={'scope':'Exact settings lines from frozen accepted scripts. Administrative history0 is preexisting accepted exception; never claim all suites default history. Trade/burn explicitly signatureTrue/blockhashTrue; no new control change.','scripts':vm}
save('seed-origins.json',origins);save('vm-controls.json',settings);save('runtime-imports.json',imports);save('runtime-python-files.json',runtime);save('historical-summary-inputs.json',ancestors)
# Independent case/parameter/order inventories without fixture execution.
cases={}
for f in(seed/'repro/mayhem').rglob('*cases.json'):
 j=J(f);cases[str(f.relative_to(seed))]={'sha256':H(f),'top_keys':list(j),'case_count':len(j['cases'])if isinstance(j,dict)and isinstance(j.get('cases'),list)else None}
save('cases.json',cases)
save('inputs.json',{'baseline_seal':H(B/'manifest.json'),'static_seal':H(S/'manifest.json'),'candidate':H(S/'build/candidate.so'),'symbols':H(S/'build/unstripped.so'),'source14':source14,'python':str(python),'runtime_manifest':manifest,'runtime_source_map_rewrite_required':False,'old_seed_candidate':H(seed/'repro/mayhem/result-error-candidate.so'),'baseline_diagnostic_rows':len(J(B/'diagnostic-differences.json')),'baseline_comparisons':9595,'baseline_suite_count':21,'retained_signature_expected':[13284,26500],'runtime_authorized':False})
print('frozen seed',len(origins),'runtime files',len(runtime),flush=True)
