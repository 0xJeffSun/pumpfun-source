#!/usr/bin/env python3
"""Portable static verification using hash-pinned public repository inputs; never builds or executes programs."""
from pathlib import Path,PurePosixPath
import argparse,concurrent.futures,gzip,hashlib,json,os,subprocess,sys,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--repo',type=Path,required=True);ap.add_argument('--integrity-only',action='store_true');a=ap.parse_args();repo=a.repo.resolve()
 manifest=J(P/'manifest-sha256.json');assert H(P/'manifest-sha256.json')==(P/'MANIFEST.sha256').read_text().split()[0]
 actual={p.relative_to(P).as_posix()for p in P.rglob('*')if p.is_file()and p.relative_to(P).as_posix()not in['manifest-sha256.json','MANIFEST.sha256']};assert actual==set(manifest)
 for n,v in manifest.items():
  p=P/n;assert not p.is_symlink()and H(p)==v['sha256']and p.stat().st_size==v['bytes'],('Package mismatch',n)
 for n,v in J(P/'external-inputs.json').items():
  q=PurePosixPath(n);assert not q.is_absolute()and'..'not in q.parts and not n.startswith('work/')
  p=repo/n;assert not p.is_symlink()and H(p)==v['sha256']and p.stat().st_size==v['bytes'],('External mismatch',n)
 for o in J(P/'method-origins.json'):assert H(P/o['path'])==o['sha256'],('Method changed',o['path'])
 cfg=J(P/'input-config.json')
 assert cfg['baseline_commit']=='dff3b7ddc64dc2ae1f3253252e096723998ce861'
 for k in ['amm','fees']:
  for side,row in cfg['programs'][k].items():
   b=J(repo/row['build_report']);assert b['source_sha256']==row['source_inputs']
   assert b['comparison']['candidate_sha256']==H(repo/row['candidate'])and b['comparison']['original_sha256']==H(repo/row['original'])
   if k=='amm':
    for n,path in row['source_files'].items():assert H(repo/path)==row['source_inputs'][n]
    assert len(row['source_inputs'])==22
   else:assert len(row['source_inputs'])==26
 for key,row in cfg['unchanged'].items():
  assert H(repo/row['candidate'])==row['before_candidate_sha256']and H(repo/row['original'])==row['before_original_sha256']
  if 'source_inputs'in row:
   assert J(repo/row['build_report'])['source_sha256']==row['source_inputs']
   for n,h in row['source_inputs'].items():assert H(P/'history/mayhem-source'/n)==h
 if 'pump_main_acceptance'in cfg:
  row=cfg['pump_main_acceptance'];identity=J(repo/row['identity']);assert row['candidate_sha256']==H(repo/row['candidate'])==H(repo/cfg['pump_metadata']['candidate'])
  assert row['symbols_sha256']==H(repo/row['symbols'])==H(repo/cfg['pump_metadata']['symbols'])
  assert H(repo/row['paired_ledger'])==H(repo/cfg['pump_metadata']['ledger'])
  assert H(repo/row['manifest'])==row['manifest_sha256']=='b8906c998c01a0dee9e8eb2f6bfbcc3c903e97d8753b22dbb316cc8dc0cc787e'
  for name,expected in [('candidate.so',row['candidate_sha256']),('unstripped.so',row['symbols_sha256'])]:
   f=identity['files'][name];assert f['entire_files_equal']and f['main_sha256']==f['scratch_sha256']==expected
  main_source=J(repo/row['source_map']);assert len(main_source)==37 and identity['main_source_sha256']==main_source and J(repo/row['build_report'])['source_sha256']==main_source
  assert identity['scratch_manifest_sha256']==cfg['pump_metadata']['manifest_sha256']and identity['main_build_report_sha256']==H(repo/row['build_report'])
  with tarfile.open(repo/row['source_archive'])as t:archived={m.name.removeprefix('./'):hashlib.sha256(t.extractfile(m).read()).hexdigest()for m in t if m.isfile()}
  assert archived==main_source
  docs=J(repo/row['documentation_map'])
  for name,path in row['documentation_files'].items():assert H(repo/path)==docs[name]
  # Entire-file comparisons supplement the preserved native identity record.
  assert (repo/row['candidate']).read_bytes()==(repo/cfg['pump_metadata']['candidate']).read_bytes()
  assert (repo/row['symbols']).read_bytes()==(repo/cfg['pump_metadata']['symbols']).read_bytes()
 results=[]
 if not a.integrity_only:
  commands=[[sys.executable,'-B',str(P/'run_one.py'),k,s,'--repo',str(repo),'--check']for k in ['amm','fees']for s in ['before','after']]
  def run(cmd):
   p=subprocess.run(cmd,cwd='/',capture_output=True,text=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'});assert p.returncode==0,(cmd,p.stdout,p.stderr);return {'tool':Path(cmd[2]).name,'arguments':cmd[3:5],'returncode':p.returncode,'stdout_sha256':hashlib.sha256(p.stdout.encode()).hexdigest()}
  with concurrent.futures.ThreadPoolExecutor(max_workers=2)as pool:results=list(pool.map(run,commands))
  for name in ['compare_results.py','check_pump.py']:results.append(run([sys.executable,'-B',str(P/name),'--repo',str(repo),'--check']))
 print(json.dumps({'status':'PASS','payloads':len(manifest),'external_inputs':len(J(P/'external-inputs.json')),'replayed':not a.integrity_only,'checks':results,'core_exact':0,'core_total':4,'dependency_capture_exact':2,'dependency_total':5,'new_builds':0,'target_executions':0,'original_denominators':{'pump':1035,'amm':785,'fees':585},'limits':'Per-program inferred windows are not semantic functions or additive completion percentages.'},sort_keys=True))
if __name__=='__main__':main()
