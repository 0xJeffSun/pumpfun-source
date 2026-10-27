"""Replay focused recovery corpora against an integrated main-Pump candidate."""
from pathlib import Path
import argparse,ast,concurrent.futures,gzip,hashlib,json,subprocess,sys,traceback
ROOT=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent;T=ROOT/'work/parallel-main-trading-third';N=ROOT/'work/parallel-main-trading-next';S=ROOT/'work/parallel-main-trading'
sys.path.insert(0,str(ROOT/'scripts'));from pump_diagnostic_audit import audit
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--source-directory',type=Path,required=True);p.add_argument('--build-comparison',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();a.candidate=a.candidate.resolve();a.output=a.output.resolve()
 record=read(a.build_comparison);assert record['returncode']==0 and record['source_unchanged'] and sha(a.candidate)==record['comparison']['candidate_sha256'];assert all(sha(ROOT/k)==v for k,v in record['source_sha256'].items())
 env={'R':ROOT,'S':S,'W':N,'T':T};fn=next(x for x in ast.parse((T/'verify_candidate.py').read_text()).body if isinstance(x,ast.FunctionDef)and x.name=='main');tests=[]
 for node in fn.body:
  if isinstance(node,ast.Assign)and any(isinstance(x,ast.Name)and x.id=='tests'for x in node.targets):tests=eval(compile(ast.Expression(node.value),'<known-suite-list>','eval'),env)
  elif isinstance(node,ast.AugAssign)and isinstance(node.target,ast.Name)and node.target.id=='tests':tests+=eval(compile(ast.Expression(node.value),'<known-suite-list>','eval'),env)
 skip={'buy_v2','sell_v2','legacy_buy','legacy_sell_configured','exact_quote_v3','buy_v3','sell_v3','quote_v3','legacy_sell','v3_configured','native_route_56'}
 previous=read(T/'final-validation-parallel-02/summary.json');counts={r['name']:r['case_count']for r in previous['suites']};tests=[(n,s,counts[n])for n,s in tests if n not in skip]
 tests += [('root_legacy_layouts',ROOT/'work/parallel-main-context2/migration_partial_layouts.py',27),('root_v2_layouts',ROOT/'work/parallel-main-context2/migration_v2_partial_layouts.py',54),('root_v2_bool_layouts',ROOT/'work/parallel-main-context2/migration_v2_decoder_boundaries.py',24),('root_account_origins',ROOT/'work/parallel-main-origins/compare_origins.py',47),('accounts_zero_payout',ROOT/'work/parallel-main-accounts/admin_cto_zero_token_payout.py',36),('accounts_contexts',ROOT/'work/parallel-main-accounts/account_context_probe.py',23),('scheduler_577',ROOT/'work/parallel-main-incentives/check-scheduler-final.py',577),('claim_grid_132',W/'claim_grid_cli.py',132),('authority_19',ROOT/'work/parallel-main-coverage/capture_authority_receipts.py',19)]
 out=a.output.parent/(a.output.name+'.suites');out.mkdir(parents=True,exist_ok=True);suites={};rows=[]
 wrapper=ROOT/'work/parallel-main-loader/run_with_captured_loader.py';inputs={str(p):sha(p)for p in [Path(__file__),a.candidate,a.build_comparison,wrapper,wrapper.with_name('captured_loader.py'),ROOT/'scripts/pump_diagnostic_audit.py',T/'verify_candidate.py',T/'final-validation-parallel-02/summary.json',*[s for _,s,_ in tests]]}
 def run(entry):
  name,script,count=entry;result_path=out/(name+'.json.gz');loader_path=out/(name+'.loader.json');cmd=[sys.executable,str(wrapper),'--receipt',str(loader_path),str(script),'--candidate',str(a.candidate),'--output',str(result_path)]
  if "'--source-directory'"in script.read_text()or'"--source-directory"'in script.read_text():cmd+=['--source-directory',str(a.source_directory.resolve())]
  if name=='completion_edges_27':cmd+=['--compute-unit-limit','600000']
  with(out/(name+'.log')).open('w')as f:r=subprocess.run(cmd,cwd=ROOT,stdout=f,stderr=subprocess.STDOUT)
  r.check_returncode();d=read(result_path);n=d.get('case_count',len(d.get('cases',[])));assert n==count,(name,n,count);assert not d.get('mismatches',[]),name
  def walk(x):
   if isinstance(x,dict):
    for key,val in x.items():
     if key in ['different_fields','differences','mismatches']:assert not val,(name,key,val)
     else:walk(val)
   elif isinstance(x,list):
    for y in x:walk(y)
  walk(d);l=read(loader_path);assert {x['elf_sha256']for x in l['loads']}=={sha(a.candidate),record['comparison']['original_sha256']}
  return name,d,{'name':name,'case_count':n,'script_sha256':sha(script),'result_sha256':sha(result_path),'loader_receipt_sha256':sha(loader_path),'command':cmd}
 errors=[]
 with concurrent.futures.ThreadPoolExecutor(max_workers=2)as pool:
  jobs={pool.submit(run,t):t[0] for t in tests}
  for future in concurrent.futures.as_completed(jobs):
   if future.cancelled():continue
   try:name,d,row=future.result()
   except Exception as exc:
    errors.append({'suite':jobs[future],'error':repr(exc),'traceback':traceback.format_exc()});print('failed',jobs[future],repr(exc),flush=True)
    for pending in jobs:pending.cancel()
    continue
   suites[name]=d;rows.append(row);print(name,row['case_count'],flush=True)
 if errors:
  a.output.with_name(a.output.name+'.failed.json').write_text(json.dumps({'complete':False,'completed_suites':list(suites),'errors':errors,'input_sha256':inputs},indent=2)+'\n');raise RuntimeError('suite failure; partial receipts retained')
 assert inputs=={k:sha(Path(k))for k in inputs};assert all(sha(ROOT/k)==v for k,v in record['source_sha256'].items());diagnostics=audit(suites)
 final={'scope':__doc__,'loader_profile':'captured-upgradeable','candidate_sha256':sha(a.candidate),'compiled_source_sha256':record['source_sha256'],'input_sha256':inputs,'suite_count':len(suites),'case_count':sum(x['case_count']for x in rows),'results':rows,'diagnostics':diagnostics,'suites':suites}
 a.output.write_bytes(gzip.compress(json.dumps(final,separators=(',',':')).encode(),mtime=0));print({'suite_count':len(suites),'case_count':final['case_count'],'diagnostic_cases':diagnostics['log_bearing_cases'],'diagnostic_mismatches':len(diagnostics['mismatches'])});assert not diagnostics['mismatches']
if __name__=='__main__':main()
