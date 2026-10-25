from pathlib import Path
import json,gzip,hashlib,shutil
W=Path(__file__).resolve().parent;P=W/'publication';P.mkdir(exist_ok=False)
def copy(a,n):
 assert a.is_file()and not a.is_symlink()and not a.name.endswith('-keypair.json');d=P/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(a,d)
def tree(src,prefix):
 for f in sorted(src.rglob('*')):
  if f.is_file()and '__pycache__'not in f.parts:copy(f,Path(prefix)/f.relative_to(src))
def compress(a,n):
 d=P/n;d.parent.mkdir(parents=True,exist_ok=True)
 with d.open('wb')as f:
  with gzip.GzipFile(filename='',mode='wb',fileobj=f,mtime=0)as z:z.write(a.read_bytes())
for n in ['provenance','static','static-tool','runtime-source','inputs']:tree(W/n,n)
for n in ['baseline-source-sha256.json','proposed-source-sha256.json','preflight-source.json','tools-before.json','tools-after.json','dependency-integrity.json','dependency-integrity-after.json','dependency-integrity.log','destination-rent.patch','build-command.json','build-exit.json','build-invocation.log','static-invocation.log','static-tool-provenance.json','targeted-static.json','ata-selector-static.json','runtime-gate.json','toolchain-phases.json','runtime-environment.json','runtime-invocation.log','runtime-verification.log','runtime-summary.json','receipt-bindings.json','scalar-diagnostics.json','recipient-diagnostics.json','verify_runtime.py','run_regressions.py','observe_suite.py','prepare.py','build_once.py','check_dependencies.py','prepare_static.py','prepare_runtime.py','gate.py','package.py','summarize_transfer.py','transfer-summary.json']:
 copy(W/n,n)
for p in json.loads((W/'proposed-source-sha256.json').read_text()):copy(W/'source'/p,'source/'+p)
tree(W/'source/scripts','build-helper-snapshot/scripts')
for p in (W/'runtime-01').iterdir():
 if p.suffix=='.json'and p.stem not in ['inputs-before','inputs-after','run','summary','progress']:compress(p,'runtime-01/'+p.name+'.gz')
 else:copy(p,'runtime-01/'+p.name)
B=W/'build-01'
for n in ['build-attempt.json','build-comparison.json','build.log']:copy(B/n,n)
copy(B/'artifacts/pump_amm_recovered.so','candidate.so');copy(B/'target/sbf-solana-solana/release/pump_amm_recovered.so','unstripped.so');copy(B/'target/.rustc_info.json','rustc_info.json')
for n in json.loads((W/'tools-before.json').read_text())['sdk_source']:copy(B/'sdk'/n,'sdk/'+n)
copy(W/'verify_publication.py','verify.py');copy(W/'REPORT.md','REPORT.md')
files={str(f.relative_to(P)):{'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'bytes':f.stat().st_size}for f in sorted(P.rglob('*'))if f.is_file()}
(P/'manifest.json').write_text(json.dumps({'schema':'amm-destination-rent-build-v1','scope':'One source build; unchanged regression evidence; not main acceptance or whole-original equality','files':files},indent=2)+'\n')
seal=hashlib.sha256((P/'manifest.json').read_bytes()).hexdigest();(P/'manifest.sha256').write_text(seal+'  manifest.json\n')
owned={str(f.relative_to(W)):{'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'bytes':f.stat().st_size}for f in sorted(P.rglob('*'))if f.is_file()}
(W/'owned-publication-files.json').write_text(json.dumps(owned,indent=2)+'\n');print(json.dumps({'files':len(files),'manifest_sha256':seal}))
