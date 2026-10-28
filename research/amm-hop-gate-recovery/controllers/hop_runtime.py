from pathlib import Path
import ast,sys,os,json,gzip,re,hashlib
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');H=Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume');G=Path('/home/ahi200/pumpfun-work/20261028-amm-incentive-regression');os.chdir(R);sys.path.insert(0,str(R/'scripts'));sys.dont_write_bytecode=True;os.environ['PUMP_AMM_FRESH_VM']='0'
reads=set()
def audit(event,args):
 if event=='open' and isinstance(args[0],str):
  p=Path(args[0]);mode=args[1]
  if p.is_relative_to(R) and (mode is None or not any(c in mode for c in 'wax+')):reads.add(p)
sys.addaudithook(audit)
import pump_amm_multi_hop_differential as h
images={'original':R/'evidence/original/pump_amm/deployed.so','baseline':G/'guard/candidate.so','candidate':H/'hop-lp-first/candidate.so'};rows=[];summary=[]
clean=lambda logs:[re.sub(r'\.rs:\d+:\d+', '.rs:SOURCE',re.sub(r'line: \d+', 'line: SOURCE',x)) for x in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
out=H/'hop-runtime';out.mkdir()
def test(label,**params):
 values={k:h.run(candidate=p,**params) for k,p in images.items()};o=values['original'];b=values['baseline'];c=values['candidate'];assert all(v['transaction_base64']==o['transaction_base64'] and v['before']==o['before'] for v in values.values());diff={k:[f for f in o if f!='logs' and o[f]!=v[f]] for k,v in values.items()};newdiff=[f for f in b if (clean(b[f])!=clean(c[f]) if f=='logs' else b[f]!=c[f])];row={'case':label,'results':values,'original_differences':diff,'candidate_baseline_differences':newdiff};rows.append(row);summary.append({'case':label,'original_differences':diff,'candidate_baseline_differences':newdiff,'noncompute_log_equal':{k:clean(o['logs'])==clean(v['logs']) for k,v in values.items()}})
 if len(rows)%100==0:print('multi-hop',len(rows),'newdiff',sum(bool(r['candidate_baseline_differences']) for r in summary),flush=True)
tree=ast.parse(Path(h.__file__).read_text());main=next(n for n in tree.body if isinstance(n,ast.If) and ast.unparse(n.test)=="__name__ == '__main__'");nodes=[n for n in main.body if isinstance(n,ast.For) or isinstance(n,ast.Expr) and isinstance(n.value,ast.Call) and isinstance(n.value.func,ast.Name) and n.value.func.id=='test'];ns=dict(vars(h),test=test);exec(compile(ast.Module(body=nodes,type_ignores=[]),str(h.__file__),'exec'),ns)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();report={'images':{k:{'path':str(p),'sha256':sha(p)} for k,p in images.items()},'case_count':len(rows),'fresh_vm':False,'cases':rows};(out/'triples.json.gz').write_bytes(gzip.compress((json.dumps(report,separators=(',',':'))+'\n').encode(),mtime=0));stats={'case_count':len(rows),'functional_mismatches':{k:sum(bool(r['original_differences'][k]) for r in summary) for k in images},'candidate_baseline_mismatches':sum(bool(r['candidate_baseline_differences']) for r in summary),'noncompute_log_mismatches':{k:sum(not r['noncompute_log_equal'][k] for r in summary) for k in images},'original_successes':sum(r['results']['original']['error'] is None for r in rows),'details':summary};(out/'summary.json').write_text(json.dumps(stats,indent=2));(out/'inputs.json').write_text(json.dumps({str(p.relative_to(R)):sha(p) for p in sorted(reads) if p.is_file()},indent=2));print({k:v for k,v in stats.items() if k!='details'},flush=True)
