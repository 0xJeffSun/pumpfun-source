"""Verify the four-line retained-bps source recovery and its saved local evidence."""
from pathlib import Path
import argparse,base64,difflib,gzip,hashlib,importlib.util,json,re,subprocess,sys,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1];N=R/'research/mayhem-native-clean-reproduction';PARENT=R/'research/mayhem-sell-quote-call-recovery'
CANDIDATE='795ed55672f855fcfc1902120604e5c6500e2b05b9ff01005fa6751fbb4373ae';SYMBOLS='28bcf5f0c40a35a05da80854004831d9815200f7a4b23da3d5df69a9b58e9d9f'
sha=lambda b:hashlib.sha256(b).hexdigest();raw=lambda p:gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes();load=lambda p:json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def expected_sources(before):
 expected=dict(before)
 for n in ['src/instructions/buy.rs','src/instructions/buy_v2.rs','src/instructions/sell_v2.rs']:
  needle=b'let retained=10_000u16-retained_reserve_bps;';assert before[n].count(needle)==1
  expected[n]=before[n].replace(needle,b'let retained=crate::state::retained_basis_points(retained_reserve_bps);')
 needle=b'fn retained_basis_points(';assert before['src/state.rs'].count(needle)==1
 expected['src/state.rs']=before['src/state.rs'].replace(needle,b'pub(crate) fn retained_basis_points(',1)
 return expected

def check_sources(before,after):
 assert after==expected_sources(before)
 for n in after:assert len(before[n].splitlines())==len(after[n].splitlines())
 return after

def source_inputs():
 before=module('retained_native_source',N/'verify.py').source_inputs();after=dict(before)
 names=sorted(p.relative_to(P/'overrides').as_posix()for p in(P/'overrides').rglob('*')if p.is_file())
 assert names==['src/instructions/buy.rs','src/instructions/buy_v2.rs','src/instructions/sell_v2.rs','src/state.rs']
 assert load(P/'source-delta.json')==dict(overrides=names,removed=[])
 for n in names:after[n]=(P/'overrides'/n).read_bytes()
 check_sources(before,after);assert len(after)==65 and {n:sha(b)for n,b in after.items()}==load(P/'source-inputs.json')
 patch=''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in names);assert(P/'source.patch').read_bytes()==patch.encode()
 return after

def check_diagnostic_delta(before,after):
 assert len(before['cases'])==len(after['cases'])
 norm=lambda row:[s for s in row['metadata']['logs']if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)]
 fixed=[];regressed=[];old_bad=[];new_bad=[]
 for a,b in zip(before['cases'],after['cases']):
  assert a['case']==b['case'];name=a['case']['name']
  assert a['original']['transaction_base64']==b['original']['transaction_base64'] and norm(a['original'])==norm(b['original'])
  x=norm(a['original'])==norm(a['candidate']);y=norm(b['original'])==norm(b['candidate'])
  if not x:old_bad.append(name)
  if not y:new_bad.append(name)
  if not x and y:fixed.append(name)
  if x and not y:regressed.append(name)
 return dict(before=old_bad,after=new_bad,fixed=fixed,regressed=regressed)

def verify(runtime=True):
 assert not any(p.is_symlink()for p in P.rglob('*'))
 assert load(P/'manifest.json')=={p.relative_to(P).as_posix():sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}
 for n,h in load(P/'inputs.json').items():assert sha((R/n).read_bytes())==h,n
 native=module('retained_native_control',N/'verify.py');native.verify(runtime=False);sources=source_inputs();candidate=raw(P/'artifacts/recovered/candidate.so.gz');symbols=raw(P/'artifacts/recovered/symbols.so.gz');assert sha(candidate)==CANDIDATE and sha(symbols)==SYMBOLS
 for label in ['retained-authenticated','retained-repeat']:
  native.check_build(load(P/f'builds/{label}/launch.json'),load(P/f'builds/{label}/result.json'),raw(P/f'builds/{label}/build.log.gz'),sources,candidate_sha=CANDIDATE,symbols_sha=SYMBOLS)
  assert raw(P/f'artifacts/{label}/candidate.so.gz')==candidate and raw(P/f'artifacts/{label}/symbols.so.gz')==symbols
 for n,b in module('retained_inventory',P/'analysis.py').generate().items():assert(P/n).read_bytes()==b,n
 assert load(P/'audit.json')['summary']['statuses']==dict(normalized_only=355,raw_local_match=71,unmatched=15)
 result=dict(source_inputs=65,changed_source_files=4,changed_source_lines=4,matched_windows=426,new_complete_matches=0,raw_local_windows=71,compiler_executed=False,target_executed=False)
 with tempfile.TemporaryDirectory()as td:
  t=Path(td);sy=t/'symbols.so';so=t/'candidate.so';base=t/'control.so';sy.write_bytes(symbols);so.write_bytes(candidate);base.write_bytes(raw(N/'artifacts/recovered/symbols.so.gz'))
  for name,path in [('control',base),('candidate',sy)]:assert module('retained_source_data_'+name,P/'data.py').inspect(path)==load(P/(name+'-data.json'))
  for old,new in zip(load(P/'control-data.json')['handlers'],load(P/'candidate-data.json')['handlers']):
   assert len(old['matching_source_records'])==0 and len(old['former_local_records'])==1
   assert len(new['matching_source_records'])==1 and len(new['former_local_records'])==0 and not new['whole_handler_normalized_equal']
  out=t/'progress.json';subprocess.run([sys.executable,'-B',str(N/'progress.py'),str(base),str(sy),str(out)],check=True,capture_output=True);assert load(out)==load(P/'progress.json');progress=load(out)
  assert not progress['body_losses']and not progress['positive_direct_edge_losses']and not progress['positive_Source_record_losses']
  assert progress['positive_direct_edges_before']==progress['positive_direct_edges_after']==4234 and progress['positive_Source_records_before']==progress['positive_Source_records_after']==441
  if runtime:result.update(verify_runtime(so))
 print(json.dumps(result,indent=2));return result

def verify_runtime(candidate):
 parent=module('retained_runtime',PARENT/'verify.py');summaries={};delta={}
 for j in load(P/'validation/commands.json'):
  name=j['instruction'].replace('buy_pump_swap','buy-amm').replace('sell_pump_swap','sell-amm').replace('_','-')+(('-'+j['family'])if j['family']!='legacy'else'')
  report=load(P/'validation'/(j['name']+'.json.gz'));summaries[name]=parent.check_receipts(name,report,candidate.read_bytes())
  old=load(N/'validation'/(j['name'].replace('retained-shared-full','native-current')+'.json.gz'));delta[name]=check_diagnostic_delta(old,report)
  expected=['retained10001','retained65535']if j['instruction']in ['buy','buy_v2','sell_v2']else[]
  assert sorted(delta[name]['fixed'])==expected and not delta[name]['regressed'],name
  with tempfile.TemporaryDirectory()as td:
   t=Path(td);rp=t/'receipt.json';out=t/'checked.json';rp.write_bytes(raw(P/'validation'/(j['name']+'.json.gz')));script=Path(j['verify'][3]).name
   subprocess.run([sys.executable,'-I','-B',str(R/'scripts'/script),'--candidate',str(candidate),'--receipts',str(rp),'--output',str(out)],check=True,capture_output=True);assert load(out)==load(P/'validation'/(j['name']+'-independent.json'))
 assert set(summaries)==set(parent.EXPECTED)and sum(x['cases']for x in summaries.values())==6636
 assert sum(len(x['before'])for x in delta.values())==21 and sum(len(x['after'])for x in delta.values())==7 and sum(len(x['fixed'])for x in delta.values())==14
 assert summaries==load(P/'validation/summary.json')and delta==load(P/'validation/diagnostic-delta.json')
 return dict(trade_comparisons=6636,signed_transaction_records=13272,repaired_noncompute_diagnostic_cases=14,remaining_noncompute_diagnostic_cases=7)

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--skip-runtime',action='store_true');p.add_argument('--materialize',type=Path);a=p.parse_args();verify(runtime=not a.skip_runtime)
 if a.materialize:
  a.materialize.mkdir(parents=True,exist_ok=False)
  for n,b in source_inputs().items():q=a.materialize/n;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(b)
