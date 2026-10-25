#!/usr/bin/env python3
"""Read-only CLI publication review; no compiler, SBF execution, or network."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent
sys.path.insert(0,str(W))
from rebind import check
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--repo',type=Path);a=parser.parse_args()
repo=a.repo.resolve()if a.repo else next(p for p in W.parents if(p/'evidence/original/pump/deployed.so').is_file())
if(W/'manifest-sha256.json').is_file():
 actual={}
 for p in W.rglob('*'):
  assert not p.is_symlink()
  if p.is_file()and p!=W/'manifest-sha256.json':actual[str(p.relative_to(W))]=H(p.read_bytes())
 assert actual==J(W/'manifest-sha256.json')
sources=J(W/'sources.json');results={}
with tempfile.TemporaryDirectory(prefix='cli-review-frozen-')as d:
 root=Path(d)
 with tarfile.open(W/'publications.tar.gz')as t:
  names=set()
  for m in t:
   p=PurePosixPath(m.name);assert m.isfile()and not p.is_absolute()and'..'not in p.parts and m.name not in names
   assert p.parts[0]in sources and not p.name.endswith('-keypair.json');names.add(m.name)
   q=root/m.name;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(t.extractfile(m).read())
 for name,row in sources.items():
  p=root/name;manifest=p/'manifest-sha256.json';assert H(manifest.read_bytes())==row['manifest_sha256']and row['exit']['exit_code']==0
  assert {str(f.relative_to(p)):H(f.read_bytes())for f in p.rglob('*')if f.is_file()and f!=manifest}==J(manifest)
  result=subprocess.run([sys.executable,'-B',str(p/'verify.py')],cwd=d,capture_output=True,text=True)
  assert result.returncode==0,(name,result.stdout,result.stderr)
  results[name]={'verified':True,'manifest_sha256':row['manifest_sha256'],'payload_files':len(J(manifest))}
 bindings=check(repo,root);assert bindings==J(W/'rebindings.json')
print(json.dumps({'verified':True,'packages':results,'frozen_git_objects_checked':len(bindings['git_objects']),'original_code_data_source_slices_checked':len(bindings['checked_slices']),'current_originals_equal_frozen_Git':True,'new_builds':0,'runtime_replays':0,'source_promotions':0,'all_prose_machine_proved':False,'whole_program_or_security_acceptance':False},indent=2))
