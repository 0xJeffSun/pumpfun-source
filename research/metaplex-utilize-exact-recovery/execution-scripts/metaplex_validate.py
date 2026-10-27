from pathlib import Path
import json,subprocess,hashlib,gzip,time,sys
B=Path('/home/ahi200/pumpfun-work/20261027-metaplex');R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');P=R/'repro/pump/metaplex-owned-uses-20261026'
PY='/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python'
label=sys.argv[1] if len(sys.argv)>1 else 'control'
out=B/('runtime-'+label);out.mkdir(exist_ok=False);candidate=B/'builds'/label/'candidate.so';results=[]
for old in json.loads((P/'validation-results.json').read_text()):
 name=old['name'];script=old['command'][2];script=R/script[script.index('repro/'):]
 cmd=[PY,'-B',str(script),'--candidate',str(candidate),'--output',str(out/(name+'-validation.json.gz'))]
 start=time.time()
 with (out/(name+'.log')).open('wb') as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
 results.append({'name':name,'command':cmd,'returncode':r.returncode,'seconds':time.time()-start})
 print(name,r.returncode,flush=True);assert r.returncode==0
source=(P/'utilize_validation.py').read_text()
source=source.replace("p=Path(__file__).resolve().parent;root=next(x for x in p.parents if (x/'evidence/dependencies/token_metadata/deployed.so').is_file());",f"p=Path({str(out)!r});root=Path({str(R)!r});")
source=source.replace("'candidate':p/'candidate.so'",f"'candidate':Path({str(candidate)!r})")
script=out/'utilize_validation.py';script.write_text(source)
with (out/'utilize.log').open('wb') as f:r=subprocess.run([PY,'-B',str(script)],stdout=f,stderr=subprocess.STDOUT)
assert r.returncode==0
results.append({'name':'utilize','command':[PY,'-B',str(script)],'returncode':r.returncode})
(out/'execution.json').write_text(json.dumps(results,indent=2)+'\n')
total=0
for file in out.glob('*-validation.json.gz'):
 data=json.loads(gzip.decompress(file.read_bytes()));total+=data['case_count'];assert not data.get('mismatches',[])
print('fresh runtime cases',total,flush=True);assert total==147
