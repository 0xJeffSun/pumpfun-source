#!/usr/bin/env python3
"""Resume a failed main-Pump corpus from verified completed suite receipts.

Each reused suite keeps its execution script hash and loader receipt. Suites
whose script changed must be executed again. No runtime result is synthesized.
"""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,shutil,subprocess,sys,tempfile
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
spec=importlib.util.spec_from_file_location('pump_original_parallel',ROOT/'work/parallel-main-integration/validate_parallel.py')
original_driver=importlib.util.module_from_spec(spec);spec.loader.exec_module(original_driver)
base=original_driver.base
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(gzip.decompress(p.read_bytes()) if p.read_bytes().startswith(b'\x1f\x8b') else p.read_bytes())
write=lambda p,r:p.write_bytes(gzip.compress(json.dumps(r,separators=(',',':')).encode(),mtime=0))

def main():
 p=argparse.ArgumentParser(description=__doc__)
 for k in ['candidate','source-directory','build-comparison','previous-failed','prior-hashes','output']:p.add_argument('--'+k,type=Path,required=True)
 p.add_argument('--workers',type=int,choices=range(1,5),default=3)
 a=p.parse_args()
 for k,v in vars(a).items():
  if isinstance(v,Path):setattr(a,k,v.resolve())
 assert not a.output.exists(), 'fresh output required'
 old=read(a.previous_failed);prior=read(a.prior_hashes);build=read(a.build_comparison)
 assert not old['complete']
 assert old['candidate_sha256']==prior['candidate_sha256']==build['comparison']['candidate_sha256']==sha(a.candidate)
 assert prior['source_sha256']==build['source_sha256']==build['source_after_sha256'] and build['returncode']==0 and build['source_unchanged']
 scripts={name:ROOT/path if path.startswith('repro/') else ROOT/'scripts'/path for name,path in base.SUITES}
 assert set(scripts)==set(prior['script_sha256'])==set(prior['script_paths'])
 assert all(str(path.relative_to(ROOT))==prior['script_paths'][name]for name,path in scripts.items())
 current_hashes={name:sha(path)for name,path in scripts.items()}
 candidate=a.candidate;original=ROOT/'evidence/original/pump/deployed.so';sources=build['source_sha256'];suites={};counts={};receipts={};reused={}
 assert a.previous_failed.name.endswith('.failed.json')
 previous_dir=a.previous_failed.with_name(a.previous_failed.name.removesuffix('.failed.json')+'.suites')
 retained=a.output.with_name(a.output.name+'.suites');retained.mkdir(exist_ok=False)
 wrapper=ROOT/'work/parallel-main-loader/run_with_captured_loader.py'
 bounds={str(p):sha(p)for p in [Path(__file__),a.candidate,original,a.build_comparison,a.previous_failed,a.prior_hashes,wrapper,wrapper.with_name('captured_loader.py')]}
 def check():
  assert all(sha(ROOT/k)==v for k,v in sources.items())
  assert all(sha(Path(k))==v for k,v in old['bound_files_sha256'].items()), 'an original run bound input changed'
  assert all(sha(Path(k))==v for k,v in bounds.items())
  assert all(sha(scripts[n])==v for n,v in current_hashes.items())
 def verify(name,result,receipt):
  count=original_driver.validate_result(name,result,candidate,original)
  loaded=read(receipt)
  assert loaded['loads'] and {x['elf_sha256']for x in loaded['loads']}=={sha(candidate),sha(original)}
  assert all(x['program_bytes']==36 and x['program_owner']=='BPFLoaderUpgradeab1e11111111111111111111111' and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged'] and x['zero_allocation_tail']for x in loaded['loads'])
  assert all(sha(Path(k))==v for k,v in loaded['input_sha256'].items())
  receipts[name]={'path':str(receipt.relative_to(ROOT)),'sha256':sha(receipt),'load_count':len(loaded['loads'])}
  result['case_count']=count
  return count
 check()
 for name in old['completed_suites']:
  assert name in scripts
  if prior['script_sha256'][name]!=current_hashes[name]:continue
  result_path=previous_dir/(name+'.json.gz');receipt_path=previous_dir/(name+'.loader.json')
  r=read(result_path);counts[name]=verify(name,r,receipt_path);suites[name]=r
  reused[name]={'result_path':str(result_path.relative_to(ROOT)),'result_sha256':sha(result_path),'script_sha256':prior['script_sha256'][name],'loader_receipt_sha256':sha(receipt_path)}
  for suffix in ['.json.gz','.loader.json','.log']:
   old_path=previous_dir/(name+suffix)
   if old_path.exists():shutil.copy2(old_path,retained/old_path.name)
 print(json.dumps({'reused_suites':len(reused),'remaining_suites':[n for n in scripts if n not in reused]}),flush=True)
 def execute(name):
  script=scripts[name];receipt=retained/(name+'.loader.json')
  with tempfile.TemporaryDirectory(prefix='pump-resumed-'+name+'-')as d:
   output=Path(d)/'result.json';cmd=[sys.executable,str(wrapper),'--receipt',str(receipt),str(script),'--candidate',str(candidate),'--output',str(output)]
   text=script.read_text()
   if "'--source-directory'"in text or '"--source-directory"'in text:cmd+=['--source-directory',str(a.source_directory)]
   proc=subprocess.run(cmd,cwd=ROOT,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True);(retained/(name+'.log')).write_text(proc.stdout);proc.check_returncode();r=read(output)
  count=verify(name,r,receipt);write(retained/(name+'.json.gz'),r);check();return name,count,r
 with ThreadPoolExecutor(max_workers=a.workers)as pool:
  jobs={pool.submit(execute,n):n for n in scripts if n not in reused}
  for job in as_completed(jobs):
   n,c,r=job.result();counts[n]=c;suites[n]=r;print(json.dumps({'executed':n,'cases':c}),flush=True)
 check();assert len(suites)==44 and sum(counts.values())==10468
 diagnostics=original_driver.audit(suites)
 report={'scope':__doc__,'candidate_sha256':sha(candidate),'original_sha256':sha(original),'bound_files_sha256':bounds,'compiled_source_sha256':sources,'source_directory':str(a.source_directory),'script_sha256':{str(scripts[n].relative_to(ROOT)):v for n,v in current_hashes.items()},'workers':a.workers,'loader_profile':'captured-upgradeable','loader_receipts':receipts,'resumed_from':reused,'case_count':sum(counts.values()),'diagnostics':diagnostics,'mismatches':diagnostics['mismatches'],'suites':suites}
 write(a.output,report);print(json.dumps({'suites':len(suites),'cases':report['case_count'],'reused_suites':len(reused),'diagnostic_log_cases':diagnostics['log_bearing_cases'],'diagnostic_mismatches':len(diagnostics['mismatches'])}),flush=True)
 assert not diagnostics['mismatches']
if __name__=='__main__':main()
