#!/usr/bin/env python3
"""Verify current pass25 saved evidence, split-stream exports and all retained ledger/byte rows."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,os,subprocess,sys,shutil,stat,gzip,tempfile,collections
def read_queue(path):
 raw=path.read_bytes();return json.loads(gzip.decompress(raw)if raw[:2]==b'\x1f\x8b'else raw)
def exact_queue(root,index,stored,expected_counts,generator_sha):
 generator=root/'repro/layered-passes/pass-25/make_window_queue.py';assert H(generator)==generator_sha
 queue=read_queue(stored)
 with tempfile.TemporaryDirectory(prefix='p25-independent-queue-')as temporary:
  rebuilt=Path(temporary)/'queue.json.gz';command=[sys.executable,'-B',str(generator),'--repo',str(root),'--index',str(index),'--output',str(rebuilt)]
  actual=subprocess.run(command,cwd=root,capture_output=True,text=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'});assert actual.returncode==0,actual.stdout+actual.stderr
  regenerated=read_queue(rebuilt)
 assert queue==regenerated,'Whole deterministic queue JSON differs: every row/classification/pointer must match'
 assert queue['total_window_records']==len(queue['tasks'])==3338
 assert queue['window_counts']==expected_counts and dict(collections.Counter(t['program']for t in queue['tasks']))==expected_counts
 assert sum(expected_counts.values())==3338 and queue['index_sha256']==H(index)
 return queue
P=Path(__file__).resolve().parent;p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--metadata',type=Path,default=P);p.add_argument('--runtime-signatures',action='store_true');p.add_argument('--relay-python',default='python3.12');a=p.parse_args();root=a.repo.absolute();metadata=a.metadata.absolute();H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text());results=[];env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'}
relay=shutil.which(a.relay_python);assert relay,'Explicit Python3.12 interpreter required for Relay current cryptographic verification'
probe=subprocess.run([relay,'-B','-c','import sys,json;assert sys.version_info[:2]==(3,12);print(json.dumps({"executable":sys.executable,"version":sys.version}))'],capture_output=True,text=True);assert probe.returncode==0,probe.stderr
relay_identity=json.loads(probe.stdout)
def run(label,cmd):
 r=subprocess.run(cmd,cwd=root,env=env,capture_output=True,text=True);assert r.returncode==0,(label,r.stdout,r.stderr)
 results.append({'name':label,'returncode':0,'stdout_sha256':hashlib.sha256(r.stdout.encode()).hexdigest(),'stderr_sha256':hashlib.sha256(r.stderr.encode()).hexdigest()});return r
for row in J(metadata/'packets.json'):
 package=root/row['path'];manifest=package/row['manifest'];assert H(manifest)==row['sha256'],row['path'];m=J(manifest);payload=m.get('files',m)
 for name,value in payload.items():
  rel=PurePosixPath(name);assert str(rel)==name and not rel.is_absolute()and'..'not in rel.parts
  f=package/name;assert f.is_file()and not f.is_symlink()and f.stat().st_size<100*1024*1024
  expected=value['sha256']if isinstance(value,dict)else value;assert H(f)==expected,(row['path'],name)
 actual={str(f.relative_to(package))for f in package.rglob('*')if f.is_file()and f not in[manifest,package/'manifest.sha256']};assert actual==set(payload),(row['path'],'membership')
 assert not any(f.is_symlink()or f.name=='__pycache__'or f.suffix in ['.pyc','.pyo']for f in package.rglob('*'))
 command=row.get('command')
 if row['path'].startswith('repro/layered-passes/pass-25/')and row['path']not in {'repro/layered-passes/pass-25/pump-current-evidence','repro/layered-passes/pass-25/pump-source-continuation'}:assert command is None,'Recursive applicability/reconciliation/CI commands forbidden'
 if command:
  interpreter=relay if row.get('interpreter')=='relay-python3.12'else sys.executable
  cmd=[interpreter,'-B',str(package/command[0]),*command[1:]]
  if a.runtime_signatures:cmd+=row.get('runtime_args',[])
  r=run(row['path'],cmd)
  if row.get('interpreter')=='relay-python3.12':
   result=json.loads(r.stdout);assert result['originating_runtime_byte_identity_asserted']is False,'Saved verification must not claim native Darwin runtime byte identity'
 else:results.append({'name':row['path'],'verification':'manifest integrity only','role':row.get('role'),'payloads':len(payload)})
# Current validators are NEW exact checkpoint routes, never historical/current snapshot checkers on newstate.
for program in ['pump','pump_amm','pump_fees']:run('current-'+program,[sys.executable,'-B',str(root/'scripts/verify_current_checkpoint.py'),program,'--repo',str(root)])
# E299 itself authenticates the WHOLE logical compressed stream from published385 splitparts, and exact member/export modes/bytes.
E=root/'repro/layered-passes/pass-25/pump-current-evidence'
run('E299-split-stream-members',[sys.executable,'-B',str(E/'verify.py'),'--expected-seal','e299855a87efe5770e3a22033c37bb969557854ea289fd8d231726c7bad15037','--wrapper',str(root/'repro/pump/remaining-guards-fortyeight'),'--main',str(root/'repro/pump/remaining-guards-main-fortyeight')])
index=J(metadata/'current-analysis-index.json');assert set(index['programs'])=={'pump','pump_amm','pump_fees','mayhem','donation_relay'}
current_status=J(root/'repro/status.json');current_relay=J(root/'repro/donation-relay/current.json')
for name,row in index['programs'].items():
 selection=current_relay if name=='donation_relay'else current_status[name]
 assert selection['candidate_artifact']==row['candidate_path']and selection['candidate_sha256']==row['candidate_sha256'],(name,'stale current index')
 for kind in ['original','candidate']:assert H(root/row[kind+'_path'])==row[kind+'_sha256'],(name,kind)
 for ledger in row['full_ledger_files']:assert H(root/ledger['path'])==ledger['sha256'],ledger['path']
queue=exact_queue(root,metadata/'current-analysis-index.json',metadata/'window-queue.json.gz',{'pump': 1035, 'pump_amm': 785, 'pump_fees': 585, 'mayhem': 441, 'donation_relay': 492},'f56d0357064b8b27bd946f2c98c285d35187c45b9b40880725a77ad4e2d08618')
for name in ['before-corrections','after-corrections']:run('snapshot-'+name,[sys.executable,'-B',str(root/'repro/layered-passes/pass-25/verify_comparison.py'),str(root/'repro/layered-passes/pass-25'/name),'--repo',str(root)])
print(json.dumps({'status':'PASS_SCOPE_BOUND_SAVED_EVIDENCE','target_executions':0,'builds':0,'current_analysis_programs':5,'original_queue_records':3338,'original_window_counts':queue['window_counts'],'exact_independent_queue_regeneration':True,'runtime_signature_option':a.runtime_signatures,'Relay_crypto_interpreter':relay_identity,'native_Darwin_byte_identity_claimed_by_saved_only':False,'historical_witness_policy':'all integrity-authenticated; original commands retained but stale current commands not rerun','results':results},indent=2))
