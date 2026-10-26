"""Hash all exact locked regular files before/after one offline resolver process."""
from pathlib import Path
import base64,hashlib,io,json,os,subprocess,tarfile
P=Path(__file__).resolve().parent;R=P/'materialized-03';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text());expected={}
for rec in J(P/'archive-receipts.json')['archives']:
 raw=(P/rec['file']).read_bytes();assert H(P/rec['file'])==rec['sha256'];alg,digest=rec['integrity'].split('-',1);assert base64.b64encode(hashlib.new(alg,raw).digest()).decode()==digest
 for m in tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz').getmembers():
  if not m.isfile():continue
  t=tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz');b=t.extractfile(m).read();rel=Path(*Path(m.name).parts[1:]);assert not rel.is_absolute()and'..'not in rel.parts
  for placement in rec['lock_paths']:expected[str(Path(placement)/rel)]=hashlib.sha256(b).hexdigest()
def observe():
 actual={str(p.relative_to(R)):H(p)for p in(R/'node_modules').rglob('*')if p.is_file()};assert actual==expected
 assert not any(p.is_symlink()for p in(R/'node_modules').rglob('*'));return actual
before=observe();source=H(R/'resolve-ordinary.cjs');out=P/'resolver-checked-run';out.mkdir(exist_ok=False);cmd=['/opt/homebrew/bin/node',str(R/'resolve-ordinary.cjs')];env={'HOME':str(Path.home()),'PATH':'/opt/homebrew/bin:/usr/bin:/bin','LANG':'C.UTF-8','HTTP_PROXY':'http://127.0.0.1:1','HTTPS_PROXY':'http://127.0.0.1:1','NO_PROXY':'','NODE_OPTIONS':''}
with(out/'stdout.log').open('wb')as stdout,(out/'stderr.log').open('wb')as stderr:r=subprocess.run(cmd,cwd=R,env=env,stdout=stdout,stderr=stderr)
after=observe();assert before==after and H(R/'resolve-ordinary.cjs')==source;j=J(P/'resolver-result.json');assert j['networkAttempts']==j['rpcAttempts']==[]and j['transactionsSigned']==j['transactionsSubmitted']==0
for row in j['loadedModules']:assert expected[row['relative']]==row['sha256']
(P/'all-module-files.json').write_text(json.dumps(expected,indent=2)+'\n');(out/'result.json').write_text(json.dumps({'command':cmd,'returncode':r.returncode,'node_binary_sha256':H(Path(cmd[0]).resolve()),'test_sha256':source,'all4747_regular_files_unchanged':before==after,'files':len(expected),'loaded_module_count':len(j['loadedModules']),'loaded_module_hashes_all_archive_bound':True,'stdout_sha256':H(out/'stdout.log'),'stderr_sha256':H(out/'stderr.log'),'network_or_rpc_attempts':0,'target_executions':0,'lifecycle_execution':0,'limitations':'Nodecore/hostloader/nativeoptionalbindingidentitynotclosed; bigint native addon failed to load and pureJSfallbackwasobserved inrawstderr. No SDKwrapper/state/remaining or deploymentidentityclaim.'},indent=2)+'\n');print('resolver exit',r.returncode,'files',len(expected),'loadedmodules',len(j['loadedModules']));r.check_returncode()
