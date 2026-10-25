from pathlib import Path
import hashlib,json,shutil,subprocess
ROOT=Path(__file__).resolve().parent;repo=Path.cwd();R=ROOT/'inputs';P=Path('repro/pump_fees/sharing-module-v144');H=lambda b:hashlib.sha256(b).hexdigest()
assert H((P/'manifest-sha256.json').read_bytes())=='07f2f80658251434d3ba3090a25f651b770b2aa688b86c6c07f5226359094db2'
paths={str(p)for p in P.rglob('*')if p.is_file()and'__pycache__'not in p.parts}
for name in ['source-sha256.json','build-helper-sha256.json','documentation-sha256.json','published-harness-sha256.json','runtime-inputs.json']:
 for name,h in json.loads((P/name).read_text()).items():assert H(Path(name).read_bytes())==h;paths.add(name)
central=['repro/status.json','repro/completion.json','.github/workflows/verify.yml','README.md','audit/AUDIT.md','docs/RECOVERY.md','docs/COMPLETION.md','scripts/verify_current_bindings.py','scripts/verify_recovered_builds.py','scripts/compare.py','scripts/analyze.py']
paths.update(central)
checked={}
for name in sorted(paths):
 p=repo/name;assert p.is_file()and not p.is_symlink();b=p.read_bytes();dest=R/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(b);checked[name]={'sha256':H(b),'bytes':len(b)}
(ROOT/'checked-inputs.json').write_text(json.dumps(checked,indent=2,sort_keys=True)+'\n')
for name in ['repro/status.json','repro/completion.json','.github/workflows/verify.yml']:
 src=repo/'work/amm-scalar-integration-review/central'/name;dest=ROOT/'baseline-central'/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dest)
(ROOT/'baseline-central/scripts').mkdir(parents=True,exist_ok=True)
(ROOT/'baseline-central/scripts/verify_current_bindings.py').write_bytes(subprocess.check_output(['git','show','HEAD:scripts/verify_current_bindings.py']))
(ROOT/'snapshot-provenance.json').write_text(json.dumps({'head':subprocess.check_output(['git','rev-parse','HEAD']).decode().strip(),'package_manifest_sha256':H((P/'manifest-sha256.json').read_bytes()),'baseline_central_source':'Prior sealed AMM acceptance review with current AMM a6db and Fees d5; other program changes preserved','baseline_amm_review_seal':'14bdf64c42f310369c75c43b3283d48ecac9dd423a159f535682e1a6e9d392f0','checked_files':len(checked),'central_paths':central},indent=2)+'\n')
for n in ['owned-file-sha256.json','clean-checkout-verification.json']:
 shutil.copyfile(repo/'work/fees-sharing-module-recovery/main-promotion'/n,ROOT/n)
print(json.dumps({'snapshotted_files':len(checked),'current_owned_files':len(json.loads((ROOT/'owned-file-sha256.json').read_text())),'package_manifest_sha256':H((P/'manifest-sha256.json').read_bytes())}))
