from pathlib import Path
import hashlib,json,subprocess,os,sys
W=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert not (W/'build-01').exists(),'The single authorized build cannot be repeated'
d=json.loads((W/'dependency-integrity.json').read_text());assert d['registry_packages']>0
b=json.loads((W/'proposed-source-sha256.json').read_text())
for p,h in b.items():assert sha(W/'source'/p)==h
before=json.loads((W/'tools-before.json').read_text())
for p,row in before['tools'].items():assert sha(Path(p))==row['sha256']
env=os.environ.copy();env['CARGO_HOME']=str(W/'cargo-home');env['PYTHONDONTWRITEBYTECODE']='1';env['CARGO_NET_OFFLINE']='true'
# Unmodified accepted helper: clean target, private SDK and rustup, v1.44 compile/v1.52 strip.
cmd=[sys.executable,str(W/'source/scripts/build_partial_candidate.py'),'--manifest',str(W/'source/programs/pump-amm/Cargo.toml'),'--program','pump_amm','--artifact-name','pump_amm_recovered.so','--tools-version','v1.44','--output',str(W/'build-01')]
(W/'build-command.json').write_text(json.dumps({'command':cmd,'environment_overrides':{k:env[k]for k in ['CARGO_HOME','PYTHONDONTWRITEBYTECODE','CARGO_NET_OFFLINE']},'attempt_limit':1},indent=2)+'\n')
with (W/'build-invocation.log').open('w')as log:r=subprocess.run(cmd,cwd=W/'source',env=env,stdout=log,stderr=subprocess.STDOUT)
(W/'build-exit.json').write_text(json.dumps({'returncode':r.returncode},indent=2)+'\n')
after={'tools':{p:{'sha256':sha(Path(p)),'bytes':Path(p).stat().st_size}for p in before['tools']}}
sdk=Path(next(iter(before['tools']))).parent/'sdk/sbf';after['sdk_source']={p:sha(sdk/p)for p in before['sdk_source']}
(W/'tools-after.json').write_text(json.dumps(after,indent=2)+'\n')
print(json.dumps({'returncode':r.returncode,'tools_unchanged':after['tools']==before['tools'],'sdk_unchanged':after['sdk_source']==before['sdk_source']}))
sys.exit(r.returncode)
