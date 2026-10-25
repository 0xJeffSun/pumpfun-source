"""Read-only saved verification in relocated temp copy, denying original work reads."""
from pathlib import Path
import tempfile,shutil,subprocess,sys,os,json,hashlib
P=Path(__file__).resolve().parent;R=P.parents[1];seal=hashlib.sha256((P/'public/manifest.json').read_bytes()).hexdigest()
with tempfile.TemporaryDirectory(prefix='pump-cto-portable-')as temp:
 T=Path(temp);target=T/'packet';shutil.copytree(P/'public',target);guard=T/'guard';guard.mkdir()
 (guard/'sitecustomize.py').write_text('''import sys,os,runpy,importlib.machinery\nfrom pathlib import Path\n# Preserve normal interpreter startup before adding a read-denial audit hook.\nsearch=[p for p in sys.path if Path(p or os.getcwd()).resolve()!=Path(__file__).resolve().parent]\nspec=importlib.machinery.PathFinder.find_spec("sitecustomize",search)\nif spec and spec.origin:runpy.run_path(spec.origin,run_name="normal_sitecustomize")\nprefix=Path(os.environ["PUMP_SAVED_DENY_PREFIX"]).resolve()\ndef audit(event,args):\n if event=="open" and args and isinstance(args[0],(str,bytes,os.PathLike)):\n  p=Path(os.fsdecode(args[0])).resolve()\n  if p==prefix or prefix in p.parents:raise RuntimeError("Forbidden original-work dependency: "+str(p))\nsys.addaudithook(audit)\n''')
 env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1','PYTHONPATH':str(guard),'PUMP_SAVED_GUARD_PATH':str(guard),'PUMP_SAVED_DENY_PREFIX':str(R/'work')}
 r=subprocess.run([sys.executable,'-B',str(target/'verify.py'),'--expected-seal',seal,'--runtime-signatures'],cwd=target,env=env,capture_output=True,text=True)
 (P/'portability.stdout').write_text(r.stdout);(P/'portability.stderr').write_text(r.stderr);(P/'portability-exit.json').write_text(json.dumps({'returncode':r.returncode,'verified_manifest_seal':seal,'runtime_signatures':True,'relocated':True,'original_work_reads_denied':True,'builds':0,'target_executions':0})+'\n');r.check_returncode()
print('PASS relocated full saved-signature verification; original work reads denied')
