"""Read-only frozen source/tool/archive checks; executes no compiler/runtime."""
from pathlib import Path
import argparse,json,hashlib,tarfile,tomllib
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def verify(seal):
 assert H(P/'manifest.json')==seal and(P/'manifest.sha256').read_text().split()[0]==seal
 actual={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']};m=J(P/'manifest.json');assert actual==set(m)
 for f in P.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'and not f.name.endswith('-keypair.json')
 for n,h in m.items():assert H(P/n)==h,n
 z=J(P/'freeze.json');assert z['source_inputs']==23 and z['attempt_limit']==1 and z['runtime_authorized']is False
 assert H(P/'checkpoint-manifest.json')==z['checkpoint']=='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a'
 assert H(P/'source-proof-manifest.json')==z['source_proof']=='5072a6fbee2384849a24f2d034415d4bdf0cb948c1f78f31196b4ae7e6deb32a'
 assert z['baseline_source']==J(P/'baseline-source-sha256.json')and z['source']==J(P/'launcher/resolved-source-sha256.json')
 assert [n for n in z['source']if z['source'][n]!=z['baseline_source'][n]]==['src/idl.rs']
 for n,h in z['baseline_source'].items():assert H(P/'baseline-source'/n)==h
 for n,h in z['source'].items():assert H(P/'launcher/crate'/n)==h
 assert H(P/'launcher/relay_build_once.py')==z['launcher_code_sha256']=='1ee5bcb679e8e04ee8abd65f7630571a5577e2dd6d9ccab369a10cdf8f165bd7'
 lm=J(P/'launcher/manifest.json')['files'];assert lm=={str(f.relative_to(P/'launcher')):H(f)for f in(P/'launcher').rglob('*')if f.is_file()and f!=P/'launcher/manifest.json'}
 # Registry archives are exact Cargo.lock checksum inputs, not guessed cache trees.
 lock=tomllib.loads((P/'launcher/crate/Cargo.lock').read_text());pk={p['name']+'-'+p['version']:p['checksum']for p in lock['package']if'checksum'in p}
 archives=list((P/'launcher/registry/archives').glob('*.crate'));assert len(archives)==len(pk)
 for f in archives:assert H(f)==pk[f.name[:-6]],f.name
 tools=J(P/'launcher/tool-witness/tool-files.json')
 for n,v in tools.items():assert H(Path(v['path']))==v['sha256'],n
 sdk_expected=J(P/'launcher/tool-witness/sdk-files.json');sdk={}
 with tarfile.open(P/'launcher/tool-witness/sbf-sdk-snapshot.tar.gz')as t:
  for f in t:
   assert f.isfile();b=t.extractfile(f).read();sdk[f.name]={'sha256':hashlib.sha256(b).hexdigest(),'mode':f.mode&0o777,'size':len(b)}
 assert sdk==sdk_expected
 return{'status':'PASS_UNEXECUTED','source_inputs':23,'changed':['src/idl.rs'],'registry_archives':len(archives),'tool_files':len(tools),'sdk_files':len(sdk),'compile':'v1.44','strip':'v1.52','builds':0,'target_executions':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);args=a.parse_args();print(json.dumps(verify(args.reviewed_plan_sha256),indent=2))
