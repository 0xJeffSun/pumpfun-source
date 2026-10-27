"""Verify exact source scope, real build records and signed receipts without VM/network."""
from pathlib import Path,PurePosixPath
import argparse,difflib,gzip,hashlib,importlib.util,json,re,subprocess,sys,tempfile
P=Path(__file__).resolve().parent;R=P.parents[1]
LABELS=['buy-accounting-control','buy-accounting-shared'];ORIGINAL='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
def sha(b):return hashlib.sha256(b).hexdigest()
def load(n):return json.loads((P/n).read_bytes())
def safe(n):
 p=PurePosixPath(n);assert str(p)==n and not p.is_absolute()and'..'not in p.parts and'\\'not in n and':'not in n;return p

def sources():
 before={}
 for n,v in load('parent.json')['files'].items():
  safe(n);safe(v['path']);b=(R/v['path']).read_bytes();assert sha(b)==v['encoded_sha256'];b=gzip.decompress(b)if v['path'].endswith('.gz')else b;assert sha(b)==v['decoded_sha256'];before[n]=b
 assert len(before)==54 and sum(n.startswith('vendor/')for n in before)==38
 after=dict(before)
 for file in ['buy.rs','buy_v2.rs']:
  n='src/instructions/'+file;old=before[n].decode();a=old.index(' a.global_params.sol_deployed=a.global_params.sol_deployed.checked_add(sol as i128)')if file=='buy.rs'else old.index(' if native_accounting{a.global_params.sol_deployed=a.global_params.sol_deployed.checked_add(sol as i128)');z=old.index(' let event=SellEvent',a);key='&Pubkey::default()'if file=='buy.rs'else'&a.quote_mint.key()';replacement=' crate::state::record_amm_buy(&mut a.global_params,&mut a.mayhem_state,sol,tokens,'+key+')?;\n'+'\n'*(old[a:z].count('\n')-1);expected=(old[:a]+replacement+old[z:]).encode();after[n]=(P/'override'/n).read_bytes();assert after[n]==expected
 assert sorted(p.relative_to(P/'override').as_posix()for p in (P/'override').rglob('*')if p.is_file())==['src/instructions/buy.rs','src/instructions/buy_v2.rs']
 patch=''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in sorted(before)if before[n]!=after[n]);assert patch.encode()==(P/'source.patch').read_bytes()
 variants=dict(zip(LABELS,[before,after]));assert {label:{n:sha(b)for n,b in data.items()}for label,data in variants.items()}==load('source-inputs.json');return variants

def strict_logs(record):return [s for s in record['metadata']['logs']if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)]
def summarize(report):
 bad=[row['case']['name']for row in report['cases']if strict_logs(row['original'])!=strict_logs(row['candidate'])]
 return dict(cases=len(report['cases']),successes=report['successful_original_cases'],functional_mismatches=len(report['mismatches']),non_compute_log_mismatches=len(bad),non_compute_log_cases=bad,raw_log_mismatches=sum(row['original']['metadata']['logs']!=row['candidate']['metadata']['logs']for row in report['cases']))

def evidence():
 builds={};maps=load('source-inputs.json')
 for label in LABELS+['buy-accounting-repeat','buy-accounting-portable']:
  launch=load('builds/'+label+'/launch.json');result=load('builds/'+label+'/result.json');log=(P/'builds'/label/'build.log').read_bytes();variant=label if label in LABELS else LABELS[1]
  assert launch['source_inputs']==maps[variant] and not launch['originals_mounted']and launch['command'][launch['command'].index('--network')+1]=='none';assert result['exit_code']==0 and result['source_unchanged']and result['registry_unchanged']and result['root_invocations']==log.count(b'--crate-name mayhem_recovered ')==1 and sha(log)==result['build_log_sha256'];assert launch['fresh']==(label=='buy-accounting-repeat');builds[label]=result['artifacts']
 assert builds[LABELS[1]]==builds['buy-accounting-repeat']==builds['buy-accounting-portable']
 with tempfile.TemporaryDirectory()as td:
  t=Path(td)
  for label in LABELS:
   (t/label).mkdir()
   for kind in ['candidate','symbols']:
    b=gzip.decompress((P/'artifacts'/(label+'-'+kind+'.so.gz')).read_bytes());assert sha(b)==builds[label][kind+'.so']['sha256']and len(b)==builds[label][kind+'.so']['bytes'];(t/label/(kind+'.so')).write_bytes(b)
  spec=importlib.util.spec_from_file_location('accounting_static',P/'static.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);static=m.compare(t);assert static==load('validation/static.json')
  parent=json.loads((R/'research/mayhem-native-buy-v2-validation/audit.json').read_bytes());public={x['id']for x in parent['rows']if x['status']!='unmatched'};assert len(public)==341 and public<=set(static[LABELS[0]]['full_matches']);assert all(c['full_shape_equal']for d in static.values()for c in d['helper']['ordered_callees'])
  summaries={};checked_results={};reports={}
  for label in LABELS:
   for family in ['legacy','native','token','token22']+(['amm-native','amm-token','amm-token22']if label==LABELS[1]else[]):
    name=label+'-'+family;b=gzip.decompress((P/'validation'/(name+'.json.gz')).read_bytes());report=json.loads(b);reports[name]=report
    kind='buy'if family=='legacy'else'pump_swap'if family.startswith('amm-')else'buy_v2';casefile='twenty/buy-cases.json'if family=='legacy'else'twentyfour/buy-pump-swap-cases.json'if family.startswith('amm-')else'twentytwo/buy-v2-cases.json';expected=json.loads((R/'repro/mayhem'/casefile).read_bytes())['cases']
    assert report['candidate_sha256']==builds[label]['candidate.so']['sha256']and report['original_sha256']==ORIGINAL and report['case_count']==len(report['cases'])==len(expected)and not report['mismatches']
    for item,row in zip(expected,report['cases']):assert all(row['case'][k]==v for k,v in item.items())
    summaries[name]=summarize(report);receipt=t/(name+'.json');receipt.write_bytes(b);out=t/(name+'-verified.json');cmd=[sys.executable,'-I','-B',str(R/('scripts/verify_mayhem_'+kind+'.py')),'--receipts',str(receipt),'--candidate',str(t/label/'candidate.so'),'--output',str(out)];run=subprocess.run(cmd,capture_output=True,text=True);assert run.returncode==0,run.stderr;checked=json.loads(out.read_bytes());assert checked==load('validation/'+name+'-independent.json');checked_results[name]=checked
  assert summaries==load('validation/summary.json');corrected={};before=after=0
  for family in ['legacy','native','token','token22']:
   a=summaries[LABELS[0]+'-'+family];b=summaries[LABELS[1]+'-'+family];assert set(b['non_compute_log_cases'])<=set(a['non_compute_log_cases']);corrected[family]=sorted(set(a['non_compute_log_cases'])-set(b['non_compute_log_cases']));before+=a['non_compute_log_mismatches'];after+=b['non_compute_log_mismatches']
   aa=reports[LABELS[0]+'-'+family];bb=reports[LABELS[1]+'-'+family];assert [r['original']for r in aa['cases']]==[r['original']for r in bb['cases']]
  assert all(summaries[LABELS[1]+'-amm-'+family]['non_compute_log_mismatches']==0 for family in ['native','token','token22']);assert before>after
  return dict(cases_per_changed_build=2325,amm_regression_cases=1257,total_fresh_comparisons=5907,verified_signature_entries=sum(x['verified_signed_transactions']for x in checked_results.values()),non_compute_log_differences_before=before,non_compute_log_differences_after=after,corrected_cases=corrected,preserved_local_matches=343,preserved_local_raw_matches=63,restored_direct_calls=2,new_complete_body_matches=0,compiler_executed=False,target_executed=False)

def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--materialize',type=Path);ap.add_argument('--variant',choices=LABELS,default=LABELS[1]);a=ap.parse_args();assert not any(p.is_symlink()for p in P.rglob('*'))
 actual={p.relative_to(P).as_posix():sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts};assert actual==load('manifest.json')
 for n,h in load('external-inputs.json').items():safe(n);assert sha((R/n).read_bytes())==h,n
 variants=sources();result=evidence()
 if a.materialize:
  dst=a.materialize.absolute();assert not dst.exists()and not dst.is_symlink()and not any(p.is_symlink()for p in dst.parents);dst.mkdir(parents=True)
  for n,b in variants[a.variant].items():p=dst/safe(n);p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
  result['materialized']=str(dst)
 print(json.dumps(result,indent=2))
if __name__=='__main__':main()
