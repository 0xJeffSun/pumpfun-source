"""Build actual five-program/full-ledger index and packet catalogue after final selections only."""
from pathlib import Path
import argparse,json,hashlib,gzip,subprocess,sys,tempfile,os,collections
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
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text());p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();root=a.repo.absolute();g=J(P/'config.json');status=J(root/'repro/status.json');relay=J(root/'repro/donation-relay/current.json')
for n,b in g['programs'].items():
 if n=='donation_relay':assert relay['candidate_artifact']==b['candidate_path']and relay['candidate_sha256']==b['candidate_sha256'];assert relay['source_manifest']==g['relay_selection_path']+'/source-map.json'
 else:assert status[n]['candidate_artifact']==b['candidate_path']and H(root/b['candidate_path'])==b['candidate_sha256'],(n,'FINAL SELECTION NOT APPLIED')
for row in g['current_packets']:assert H(root/row['path']/'manifest.json')==row['sha256'],row['path']
assert not a.output.exists();a.output.mkdir(parents=True);programs={}
for n,b in g['programs'].items():
 row={k:v for k,v in b.items()if k!='full_ledger_paths'};assert H(root/row['original_path'])==row['original_sha256'];assert H(root/row['candidate_path'])==row['candidate_sha256'];row['full_ledger_files']=[]
 for name in b['full_ledger_paths']:
  f=root/name;assert f.is_file()and not f.is_symlink()and f.stat().st_size<100*1024*1024;row['full_ledger_files'].append({'path':name,'sha256':H(f),'bytes':f.stat().st_size})
 row['ledger_policy']='Complete supplied files, no filtering to matches. All rows, ambiguity, opacity, calls, branches, relocations/data and unresolved closure remain in source ledgers.';programs[n]=row
index={'scope':'Five actual current candidates and complete retained ledgers. No window count is a semantic-completion percentage; original boundaries retain inferred/symbol distinctions. Stopped scopes remain opaque and this index authorizes no execution.','programs':programs}
(a.output/'current-analysis-index.json').write_text(json.dumps(index,indent=2)+'\n')
# Keep EVERY historical row and its original command as a witness, never run stale current assertions against new selections.
packets=[]
for old in J(root/'repro/layered-passes/pass-24/packets.json'):
 row={**old,'historical_command':old.get('command'),'historical_runtime_args':old.get('runtime_args',[]),'command':None,'runtime_args':[],'role':'immutable historical witness; integrity only, not a claimed current-verifier pass'};packets.append(row)
for row in g['current_packets']:packets.append({'manifest':'manifest.json','runtime_args':[],**row})
seen={x['path']for x in packets}
# Catalogue every additional frozen direct pass25 child; no changing prose/log directory or self-circular top-level metadata.
for manifest in sorted((root/'repro/layered-passes/pass-25').glob('*/manifest.json')):
 path=str(manifest.parent.relative_to(root))
 if path in seen:continue
 packets.append({'path':path,'manifest':'manifest.json','sha256':H(manifest),'command':None,'runtime_args':[],'role':'additional immutable pass25 packet; integrity only'});seen.add(path)
allowed_P25_commands={'repro/layered-passes/pass-25/pump-current-evidence','repro/layered-passes/pass-25/pump-source-continuation'}
for row in packets:
 if row['path'].startswith('repro/layered-passes/pass-25/')and row['path']not in allowed_P25_commands:
  assert row.get('command')is None,'No recursive applicability/reconciliation/CI proposal command'
  row['catalogue_policy']='integrity-only; never a selectedguard invocation'
 assert H(root/row['path']/row['manifest'])==row['sha256'],row['path']
(a.output/'packets.json').write_text(json.dumps(packets,indent=2)+'\n')
cmd=[sys.executable,'-B',str(root/'repro/layered-passes/pass-25/make_window_queue.py'),'--repo',str(root),'--index',str(a.output/'current-analysis-index.json'),'--output',str(a.output/'window-queue.json.gz')];r=subprocess.run(cmd,capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr
queue=exact_queue(root,a.output/'current-analysis-index.json',a.output/'window-queue.json.gz',g['expected_original_window_counts'],g['queue_generator_sha256'])
(a.output/'builder-result.json').write_text(json.dumps({'passed':True,'programs':5,'packet_count':len(packets),'queue_records':3338,'window_counts':queue['window_counts'],'exact_independent_queue_regeneration':True,'final_snapshot_executed':False,'status_sha256':H(root/'repro/status.json'),'relay_current_sha256':H(root/'repro/donation-relay/current.json'),'queue_command':cmd,'queue_stdout':r.stdout},indent=2)+'\n');print(json.dumps({'built':str(a.output),'programs':5,'packets':len(packets),'queue':3338,'final_snapshot_executed':False}))
