from pathlib import Path
import ast,hashlib,json,os,subprocess
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');T=Path(__file__).parent
B=Path('/home/ahi200/pumpfun-work/20261028-fees-causal');D=B/'runtime-after';D.mkdir(exist_ok=False)
PY='/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python'
driver=(R/'scripts/fees_validate_all.py').read_bytes();tree=ast.parse(driver)
loop=next(n for n in ast.walk(tree)if isinstance(n,ast.For)and isinstance(n.target,ast.Tuple)and [x.id for x in n.target.elts]==['name','script'])
suites=ast.literal_eval(loop.iter);assert len(suites)==18
candidate=B/'after/candidate.so';assert hashlib.sha256(candidate.read_bytes()).hexdigest()=='7f12e1313a5c6f028f9d124563109a02a6ac630f52d83203f65764c640ab3025'
env=dict(os.environ,PYTHONDONTWRITEBYTECODE='1',PYTHONPYCACHEPREFIX=str(D/'never-created-cache'))
commands=[];results=[]
for name,script in suites:
 cmd=[PY,'-B',str(T/'observer.py'),str(D/(name+'-observed')),str(R/'scripts'/script),'--candidate',str(candidate),'--output',str(D/(name+'.json'))]
 commands.append(cmd);(D/'commands.json').write_text(json.dumps(commands,indent=2)+'\n')
 with(D/(name+'.log')).open('wb')as log:run=subprocess.run(cmd,env=env,stdout=log,stderr=subprocess.STDOUT)
 result=dict(suite=name,returncode=run.returncode);results.append(result);(D/'results.json').write_text(json.dumps(results,indent=2)+'\n')
 print(name,run.returncode,flush=True)
 if run.returncode:print((D/(name+'.log')).read_text()[-2500:],flush=True);run.check_returncode()
 report=json.loads((D/(name+'.json')).read_bytes());assert not report.get('mismatches',report.get('failures',[]))
print('all18 suites complete',flush=True)
