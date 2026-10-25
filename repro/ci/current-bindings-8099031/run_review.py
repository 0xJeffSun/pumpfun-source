#!/usr/bin/env python3
"""Static acceptance and negative tests in an isolated tracked-only file subset."""
from pathlib import Path
import hashlib, importlib.util, json, os, shutil, subprocess, sys, time

REPO=Path(__file__).resolve().parents[2]
OUT=Path(__file__).resolve().parent
FIX=OUT/'checkout'
assert not FIX.exists()
FIX.mkdir()
sha=lambda b:hashlib.sha256(b).hexdigest()
script=REPO/'scripts/verify_current_bindings.py'
spec=importlib.util.spec_from_file_location('current_binding_reviewed',script)
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
tracked=set(subprocess.check_output(['git','-C',str(REPO),'ls-files','-z']).decode().split('\0'))
allgroups={}
files={'scripts/verify_current_bindings.py','.github/workflows/verify.yml','requirements.txt','evidence/original/pump/deployed.so'}
for program,package in m.PACKAGES.items():
 p=REPO/package
 files.update(str(x.relative_to(REPO)) for x in p.rglob('*') if x.is_file() and '__pycache__'not in x.parts)
 if program=='pump':
  maps=json.loads((p/'source-harness-sha256.json').read_text())
  groups={k:maps[k] for k in ['source','harness','runtime','documentation','build_helpers']}
 else:
  groups={k:json.loads((p/k).read_text()) for k in ['source-sha256.json','build-helper-sha256.json','documentation-sha256.json','harness-source-sha256.json','runtime-inputs.json']}
 allgroups[program]=groups
 for entries in groups.values():
  files.update(m.HISTORICAL_COPIES.get(n,n) for n in entries)
assert files-{'scripts/verify_current_bindings.py'}<=tracked
assert not any(n.startswith('work/') for n in files)
manifest={}
for name in sorted(files):
 src=REPO/name; assert src.is_file() and not src.is_symlink(),name
 value=src.read_bytes();manifest[name]={'sha256':sha(value),'bytes':len(value)}
 dst=FIX/name;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(value)
(OUT/'tested-inputs.json').write_text(json.dumps(manifest,indent=2)+'\n')
(OUT/'reviewed-verify_current_bindings.py').write_bytes(script.read_bytes())
(OUT/'reviewed-verify.yml').write_bytes((REPO/'.github/workflows/verify.yml').read_bytes())
subprocess.run(['git','init','-q',str(FIX)],check=True)
subprocess.run(['git','-C',str(FIX),'add','-f','--','.'],check=True)
assert not (FIX/'work').exists()
records=[]
env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'}
def run(label,program=None,command=None,expected_pass=True):
 command=command or [sys.executable,'-B',str(FIX/'scripts/verify_current_bindings.py'),program]
 started=time.monotonic()
 result=subprocess.run(command,cwd=OUT,env=env,capture_output=True,text=True)
 row={'label':label,'program':program,'expected_pass':expected_pass,'returncode':result.returncode,'stdout':result.stdout,'stderr':result.stderr,'elapsed_seconds':round(time.monotonic()-started,3)}
 records.append(row)
 (OUT/'results.json').write_text(json.dumps(records,indent=2)+'\n')
 assert (result.returncode==0)==expected_pass,row
 print(label,'PASS',flush=True)
for program in m.PACKAGES:run('clean-current-bindings-'+program,program)
for program,package in m.PACKAGES.items():
 verifier='verify-package.py'if program=='pump'else'verify.py'
 run('clean-immutable-package-'+program,program,command=[sys.executable,'-B',str(FIX/package/verifier)])
# Every exact published fallback must be present and unmodified. No work tree fallback exists.
for recorded,published in m.HISTORICAL_COPIES.items():
 program='pump'if recorded.startswith('work/pump-')else'fees'
 path=FIX/published;original=path.read_bytes()
 path.unlink()
 run('missing-published-copy-'+published,program,expected_pass=False)
 path.write_bytes(original+b'\n# independent negative-test tamper\n')
 run('tampered-published-copy-'+published,program,expected_pass=False)
 path.write_bytes(original)
 subprocess.run(['git','-C',str(FIX),'rm','--cached','--quiet','--',published],check=True)
 run('untracked-published-copy-'+published,program,expected_pass=False)
 subprocess.run(['git','-C',str(FIX),'add','-f','--',published],check=True)
# Exercise all five groups, independently, for both programs.
for program,groups in allgroups.items():
 for group,entries in groups.items():
  name=next(n for n in entries if n not in m.HISTORICAL_COPIES)
  path=FIX/name;original=path.read_bytes();path.write_bytes(original+b'\nBINDING-TAMPER\n')
  run('tampered-group-'+program+'-'+group,program,expected_pass=False)
  path.write_bytes(original)
# Candidate and full unstripped text guard are independent static checks.
p=FIX/m.PACKAGES['pump']
for file in ['candidate.so','unstripped.so']:
 path=p/file;original=path.read_bytes();value=bytearray(original);value[512]^=1;path.write_bytes(value)
 run('tampered-pump-'+file,'pump',expected_pass=False)
 path.write_bytes(original)
for program in m.PACKAGES:run('restored-current-bindings-'+program,program)
assert not (FIX/'work').exists()
assert {n:{'sha256':sha((FIX/n).read_bytes()),'bytes':(FIX/n).stat().st_size}for n in manifest}==manifest
status=subprocess.check_output(['git','-C',str(FIX),'diff','--exit-code']).decode();assert not status
(OUT/'summary.json').write_text(json.dumps({'reviewed_script_sha256':manifest['scripts/verify_current_bindings.py']['sha256'],'reviewed_workflow_sha256':manifest['.github/workflows/verify.yml']['sha256'],'tracked_checkout_file_count':len(files),'untracked_new_script_explicitly_added_to_fixture_index':True,'checkout_has_work_directory':False,'tests':len(records),'positive_tests':sum(x['expected_pass']for x in records),'negative_tests':sum(not x['expected_pass']for x in records),'all_expected_outcomes_observed':True,'fixture_bytes_restored':True,'new_builds':0,'new_runtime_executions':0,'python_version':sys.version,'platform':sys.platform,'limitation':'Local Python and host test only; hosted Ubuntu Python3.12 acceptance requires CI.'},indent=2)+'\n')
shutil.rmtree(FIX)
print('ALL STATIC CHECKS PASS; isolated fixture removed',flush=True)
