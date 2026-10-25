#!/usr/bin/env python3
"""Compare complete retained ledgers and raw artifacts; no build or target execution."""
from pathlib import Path
import argparse,collections,gzip,hashlib,importlib.util,json,re,sys
P=Path(__file__).resolve().parent
J=lambda p:json.loads(p.read_text());G=lambda p:json.loads(gzip.decompress(p.read_bytes()));H=lambda b:hashlib.sha256(b).hexdigest()
def encoded(x):return(json.dumps(x,sort_keys=True,separators=(',',':'))+'\n').encode()
def output(n,x,check):
 f=P/n;b=encoded(x)
 if check:assert gzip.decompress(f.read_bytes())==b,n
 else:f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(gzip.compress(b,mtime=0))
def transition(k):
 name='residual-ledger.json.gz'if k=='amm'else'catalog.json.gz';a,b=[G(P/'ledgers'/k/side/name)for side in ['before','after']]
 ok='original'if k=='amm'else'original_rows';ck='candidate'if k=='amm'else'candidate_rows'
 am={r['start']:r for r in a[ok]};bm={r['start']:r for r in b[ok]};assert am.keys()==bm.keys();rows=[]
 for at,o in am.items():
  n=bm[at];assert all(o[x]==n[x]for x in ['start','end','raw_sha256','normalized_sha256'])
  rows.append({'original_start':at,'original_end':o['end'],'raw_sha256':o['raw_sha256'],'before_status':o['status'],'after_status':n['status'],'before_matches':o['candidate_matches'],'after_matches':n['candidate_matches'],'before_ambiguity':len(o['candidate_matches'])>1,'after_ambiguity':len(n['candidate_matches'])>1,'semantic_improvement_claim':False})
 stem=lambda s:re.sub(r'17h[0-9a-f]{16}E$','E',s)
 before=collections.defaultdict(list)
 for r in a[ck]:
  for n in r['names']:before[stem(n)].append(r)
 assoc=[];used=set()
 for r in b[ck]:
  same={o['start']:o for n in r['names']for o in before[stem(n)]};used.update(same)
  assoc.append({'after_start':r['start'],'after_end':r['end'],'after_names':r['names'],'before_symbol_stem_options':[{'start':o['start'],'end':o['end'],'names':o['names'],'size_equal':o['end']-o['start']==r['end']-r['start'],'raw_equal':o['raw_sha256']==r['raw_sha256'],'normalized_equal':o['normalized_sha256']==r['normalized_sha256']}for o in same.values()],'basis':'symbol stem only; ambiguity retained, not inferred original names'})
 return {'scope':'Every original row and every new candidate row is retained; unmatched previous candidate rows also listed. Full before/after ledgers retain every raw row, call, branch, data pointer and ambiguity.','original_rows':rows,'candidate_associations':assoc,'before_candidates_without_symbol_stem_option':[r['start']for r in a[ck]if r['start']not in used],'before_original_rows':len(a[ok]),'after_original_rows':len(b[ok]),'before_candidate_rows':len(a[ck]),'after_candidate_rows':len(b[ck])}
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path,required=True);ap.add_argument('--check',action='store_true');args=ap.parse_args();repo=args.repo.resolve();cfg=J(P/'input-config.json')
 for n,v in J(P/'external-inputs.json').items():assert H((repo/n).read_bytes())==v['sha256'],n
 s=importlib.util.spec_from_file_location('whole',P/'methods/compare_all.py');mod=importlib.util.module_from_spec(s);s.loader.exec_module(mod)
 whole=[];summary={}
 for k in ['amm','fees']:
  output('comparisons/'+k+'-all-rows.json.gz',transition(k),args.check)
  for side,row in cfg['programs'][k].items():
   whole.append(mod.one(repo,k+':'+side,row['original'],row['candidate'],row['scope']))
  n='summary.json.gz'if k=='amm'else'result.json.gz';summary[k]={side:G(P/'ledgers'/k/side/n)for side in ['before','after']}
 unchanged=[]
 for key,row in cfg['unchanged'].items():
  out=mod.one(repo,key,row['original'],row['candidate'],row['kind']);assert out['candidate_sha256']==row['before_candidate_sha256']and out['original_sha256']==row['before_original_sha256'];out['baseline_candidate_unchanged']=True
  if 'source_inputs'in row:
   build=J(repo/row['build_report']);assert build['source_sha256']==row['source_inputs'];out['source_inputs']=row['source_inputs'];out['source_binding_scope']='The unchanged accepted artifact binds the same14 recorded build inputs; no rebuild or new source recovery asserted.'
  unchanged.append(out)
 pumpbase=cfg['pump_baseline'];pump=mod.one(repo,'pump:accepted_baseline','evidence/original/pump/deployed.so',pumpbase['candidate'],'accepted baseline, unchanged pending metadata promotion at this snapshot');assert not pump['whole_file_equal']
 pumpmain=None
 if 'pump_main_acceptance'in cfg:
  p=cfg['pump_main_acceptance'];pumpmain=mod.one(repo,'pump:accepted_main','evidence/original/pump/deployed.so',p['candidate'],'accepted clean main metadata correction; scratch ledger retained separately');assert not pumpmain['whole_file_equal']
 output('comparisons/whole-files.json.gz',{'changed_core_before_after':whole,'pump_accepted_baseline':pump,'pump_accepted_main':pumpmain,'unchanged':unchanged},args.check)
 summary['unchanged']=[{k:v for k,v in r.items()if k!='common_extent_mismatch_ranges'}for r in unchanged]
 summary['pump_accepted_main']={k:v for k,v in pumpmain.items()if k!='common_extent_mismatch_ranges'}if pumpmain else None
 summary['pump_accepted_baseline']={k:v for k,v in pump.items()if k!='common_extent_mismatch_ranges'}
 summary['whole_files']=[{k:v for k,v in r.items()if k!='common_extent_mismatch_ranges'}for r in whole]
 summary['completion_denominators']={'whole_core':{'matched':0,'total':4},'captured_dependency_payloads':{'matched':sum(r['whole_file_equal']for r in unchanged if r['name']!='mayhem'and not r['name'].endswith(':raw')),'total':5},'function_window_counts':'Per-program methods differ; do not sum or convert to semantic completion percentages.','instructions':'140/150 bounded implementations is a separate retained project measure, not calculated from these byte/window ledgers.'}
 assert summary['completion_denominators']['captured_dependency_payloads']['matched']==2
 output('comparisons/summary.json.gz',summary,args.check)
 print(json.dumps({'status':'PASS','original_rows':{'amm':785,'fees':585},'unchanged_records':len(unchanged),'whole_core_equal':0,'dependency_payloads_equal':2,'check':args.check}))
if __name__=='__main__':main()
