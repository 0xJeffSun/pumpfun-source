"""Verify the BuyV2 validator composition with the native Program recovery."""
from pathlib import Path
import sys,json,gzip,hashlib,difflib,tempfile,importlib.util,subprocess,re
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1];B=R/'research/mayhem-native-program-recovery'
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(raw(p))
def sha(b):return hashlib.sha256(b).hexdigest()
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify():
 assert not any(p.is_symlink()for p in P.rglob('*'));pins=load(P/'manifest.json');assert pins=={p.relative_to(P).as_posix():sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts}
 for n,h in load(P/'inputs.json').items():assert sha((R/n).read_bytes())==h,n
 parent_manifest=load(B/'manifest.json');before={}
 for p in(B/'sources').rglob('*.gz'):
  assert sha(p.read_bytes())==parent_manifest[p.relative_to(B).as_posix()];before[p.relative_to(B/'sources').as_posix().removesuffix('.gz')]=raw(p)
 assert len(before)==54;after=dict(before);name='src/instructions/buy_v2.rs';after[name]=(P/'override'/name).read_bytes()
 old=b''' require!(!a.global_params.paused,MayhemError::TradingPaused);
 let now=Clock::get().unwrap().unix_timestamp;
 let last=a.mayhem_state.field_89 as i64;
 let interval=(a.global_params.field_7 as i64);
 if last!=0&&interval!=0 {require!(now>=last+interval,SellError::TradeRateLimit);}
 a.mayhem_state.field_89=now as u64;'''
 assert before[name].count(old)==1 and after[name]==before[name].replace(old,b' a.mayhem_state.validate_trade(&a.global_params)?;\n\n\n\n\n')
 patch=''.join(difflib.unified_diff(before[name].decode().splitlines(True),after[name].decode().splitlines(True),fromfile='a/'+name,tofile='b/'+name)).encode();assert patch==(P/'source.patch').read_bytes();assert(P/'.gitattributes').read_bytes()==b'source.patch -whitespace\n'
 outputs={}
 for label in ['recovered','repeat']:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');assert launch['source_inputs']=={n:sha(b)for n,b in after.items()};assert result['returncode']==0 and result['root_invocations']==1 and result['source_unchanged']
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  b=raw(P/f'artifacts/{label}/candidate.so.gz');s=raw(P/f'artifacts/{label}/symbols.so.gz');assert sha(b)==result['candidate_sha256']and sha(s)==result['symbols_sha256'];outputs[label]=(b,s)
 assert outputs['recovered']==outputs['repeat'];candidate,symbols=outputs['recovered'];assert sha(candidate)=='14f7054abdedfe8986f0c1ee1a1a687239d1cbcece0cebe308f0a7c4ce9f2a26'
 for n,b in module('composition_analysis',P/'analysis.py').generate().items():assert(P/n).read_bytes()==b,n
 prior_rows=load(B/'audit.json')['rows'];rows=load(P/'audit.json')['rows'];assert[(r['id'],r['status'])for r in rows]==[(r['id'],r['status'])for r in prior_rows]
 static=module('composition_edge',R/'research/mayhem-buy-v2-shared-validation/static.py');edges={};summaries={};signatures=0
 with tempfile.TemporaryDirectory()as td:
  t=Path(td)
  for label,data,sym in [('parent',raw(B/'artifacts/recovered/candidate.so.gz'),raw(B/'artifacts/recovered/symbols.so.gz')),('composed',candidate,symbols)]:
   d=t/label;d.mkdir();(d/'candidate.so').write_bytes(data);(d/'symbols.so').write_bytes(sym);edges[label]=static.measure(d/'candidate.so',d/'symbols.so')
   for family in ['native','token','token22']:
    src=B/f'runtime/vendor-buy-v2-{family}.json.gz'if label=='parent'else P/f'runtime/{family}.json.gz';report=load(src);assert report['candidate_sha256']==sha(data)and report['original_sha256']=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'and report['case_count']==len(report['cases'])==613 and not report['mismatches']
    for n,h in report['harness_sha256'].items():assert sha((R/n).read_bytes())==h
    expected=load(R/'repro/mayhem/twentytwo/buy-v2-cases.json')['cases'];assert[r['case']['name']for r in report['cases']]==[c['name']for c in expected]
    receipt=d/(family+'.json');receipt.write_bytes(raw(src));out=d/(family+'-check.json');run=subprocess.run([sys.executable,'-I','-B',str(R/'scripts/verify_mayhem_buy_v2.py'),'--receipts',str(receipt),'--candidate',str(d/'candidate.so'),'--output',str(out)],capture_output=True,text=True);assert run.returncode==0,run.stderr;checked=load(out);assert checked['verified_signed_transactions']==1226;signatures+=1226
    norm=lambda ls:[s for s in ls if not re.search(r' consumed \d+ of \d+ compute units',s)];bad=sum(norm(r['original']['metadata']['logs'])!=norm(r['candidate']['metadata']['logs'])for r in report['cases']);summaries[label+'-'+family]=dict(cases=613,non_compute_log_differences=bad,successes=report['successful_original_cases'])
 assert edges==load(P/'edge.json');assert not edges['parent']['candidate_edges']and len(edges['composed']['candidate_edges'])==1;assert edges['composed']['helper']['bytes']==1192 and len(edges['composed']['helper']['callees'])==9
 assert sum(v['non_compute_log_differences']for k,v in summaries.items()if k.startswith('parent-'))==130
 assert sum(v['non_compute_log_differences']for k,v in summaries.items()if k.startswith('composed-'))==118
 assert signatures==7356
 result=dict(source_inputs=54,restored_call_edges=1,full_window_matches=341,new_complete_body_matches=0,raw_local_matches=58,verified_signature_entries=signatures,fresh_composed_comparisons=1839,log_differences_before=130,log_differences_after=118,corpora=summaries,compiler_executed=False,target_executed=False);print(json.dumps(result,indent=2))
if __name__=='__main__':verify()
