"""Verify saved source, real build, decoded call and signed replay evidence; no VM/compiler."""
from pathlib import Path,PurePosixPath
import argparse,base64,difflib,gzip,hashlib,importlib.util,json,re,subprocess,sys,tempfile
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1];MAY='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
ORIGINAL='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
def sha(b):return hashlib.sha256(b).hexdigest()
def read(name):return json.loads((HERE/name).read_bytes())
def safe(name):
 p=PurePosixPath(name);assert name and str(p)==name and not p.is_absolute()and'..'not in p.parts and'\\'not in name and':'not in name;return p
def integrity():
 assert not any(p.is_symlink()for p in HERE.rglob('*'))
 actual={p.relative_to(HERE).as_posix():sha(p.read_bytes())for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and'__pycache__'not in p.parts};assert actual==read('manifest.json')
 for name,digest in read('external-inputs.json').items():safe(name);assert sha((ROOT/name).read_bytes())==digest,name
def sources():
 baseline={}
 for name,row in read('parent.json')['files'].items():
  safe(name);safe(row['path']);data=(ROOT/row['path']).read_bytes();assert sha(data)==row['encoded_sha256'];data=gzip.decompress(data);assert sha(data)==row['decoded_sha256'];baseline[name]=data
 proposal=dict(baseline);name='src/instructions/buy_v2.rs';proposal[name]=(HERE/'override'/name).read_bytes()
 old=b''' require!(!a.global_params.paused,MayhemError::TradingPaused);
 let now=Clock::get().unwrap().unix_timestamp;
 let last=a.mayhem_state.field_89 as i64;
 let interval=(a.global_params.field_7 as i64);
 if last!=0&&interval!=0 {require!(now>=last+interval,SellError::TradeRateLimit);}
 a.mayhem_state.field_89=now as u64;'''
 assert baseline[name].count(old)==1
 assert proposal[name]==baseline[name].replace(old,b' a.mayhem_state.validate_trade(&a.global_params)?;\n\n\n\n\n')
 patch=''.join(difflib.unified_diff(baseline[name].decode().splitlines(True),proposal[name].decode().splitlines(True),fromfile='a/'+name,tofile='b/'+name));assert patch.encode()==(HERE/'source.patch').read_bytes()
 variants={'current':baseline,'buy-v2-shared':proposal}
 for label,data in variants.items():assert len(data)==15 and {n:sha(b)for n,b in data.items()}==read('source-inputs.json')[label]
 return variants
def probe_diff(a,b):
 result=[]
 for r in [a,b]:assert all(Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify_with_results())
 for f in ['error','transaction_base64']:
  if a[f]!=b[f]:result.append(f)
 for phase in ['before','after']:
  if {k:v for k,v in a[phase].items()if k!=MAY}!={k:v for k,v in b[phase].items()if k!=MAY}:result.append(phase)
 for f in ['inner_instructions','return_data']:
  if a['metadata'][f]!=b['metadata'][f]:result.append(f)
 logs=lambda r:[s for s in r['metadata']['logs']if not re.search(r' consumed \d+ of \d+ compute units',s)]
 if logs(a)!=logs(b):result.append('non_compute_logs')
 return result
def evidence():
 hashes={};maps=read('source-inputs.json')
 for label in ['current','buy-v2-shared','buy-v2-repeat','portable']:
  launch=read('builds/'+label+'/launch.json');result=read('builds/'+label+'/result.json');log=(HERE/'builds'/label/'build.log').read_bytes();source='buy-v2-shared'if label in ['buy-v2-repeat','portable']else label
  assert launch['source_inputs']==maps[source]and not launch['originals_mounted']and launch['command'][launch['command'].index('--network')+1]=='none'
  assert result['exit_code']==0 and result['source_unchanged']and result['registry_unchanged']and result['root_invocations']==log.count(b'--crate-name mayhem_recovered ')==1 and sha(log)==result['build_log_sha256']
  assert launch['fresh']==(label=='buy-v2-repeat');hashes[label]=result['artifacts']
 assert hashes['buy-v2-shared']==hashes['buy-v2-repeat']==hashes['portable']
 with tempfile.TemporaryDirectory()as td:
  temp=Path(td)
  for label in ['current','buy-v2-shared']:
   for kind in ['candidate','symbols']:
    raw=gzip.decompress((HERE/'artifacts'/(label+'-'+kind+'.so.gz')).read_bytes());assert sha(raw)==hashes[label][kind+'.so']['sha256']and len(raw)==hashes[label][kind+'.so']['bytes'];dest=temp/label/(kind+'.so');dest.parent.mkdir(exist_ok=True);dest.write_bytes(raw)
  s=importlib.util.spec_from_file_location('pinned_static',HERE/'static.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);static=m.compare(temp);assert static==read('validation/buy-v2-static.json')
  results={};summaries={};clean=lambda r:[s for s in r['metadata']['logs']if not re.search(r' consumed \d+ of \d+ compute units',s)]
  for label in ['current','buy-v2-shared']:
   for family in ['native','token','token22']:
    name=label+'-'+family;raw=gzip.decompress((HERE/'validation'/(name+'.json.gz')).read_bytes());report=json.loads(raw)
    assert report['candidate_sha256']==hashes[label]['candidate.so']['sha256']and report['original_sha256']==ORIGINAL and report['case_count']==613 and not report['mismatches']
    summaries[name]=dict(cases=613,successes=report['successful_original_cases'],functional_mismatches=len(report['mismatches']),non_compute_log_mismatches=sum(clean(r['original'])!=clean(r['candidate'])for r in report['cases']),raw_log_mismatches=sum(r['original']['metadata']['logs']!=r['candidate']['metadata']['logs']for r in report['cases']))
    receipt=temp/(name+'.json');receipt.write_bytes(raw);output=temp/(name+'-check.json')
    command=[sys.executable,'-I','-B',str(ROOT/'scripts/verify_mayhem_buy_v2.py'),'--receipts',str(receipt),'--candidate',str(temp/label/'candidate.so'),'--output',str(output)]
    checked=subprocess.run(command,capture_output=True,text=True);assert checked.returncode==0,checked.stderr
    result=json.loads(output.read_bytes());assert result==read('validation/'+name+'-independent.json');results[name]=result
  assert summaries==read('validation/corpus-summary.json')
  strict={}
  for label in ['current','buy-v2-shared']:
   report=json.loads(gzip.decompress((HERE/'validation'/(label+'-probe.json.gz')).read_bytes()));assert report['candidate_sha256']==hashes[label]['candidate.so']['sha256']and report['original_sha256']==ORIGINAL and len(report['cases'])==24
   failed=[]
   for row in report['cases']:
    diff=probe_diff(row['original'],row['candidate']);assert diff==row['differences']
    if diff:assert diff==['non_compute_logs'];failed.append(row['case']['name'])
   assert failed==report['mismatches'];strict[label]=len(failed)
  assert strict=={'current':12,'buy-v2-shared':0}
 return dict(focused_cases=24,corrected_non_compute_log_cases=12,corpus_cases_per_build=1839,verified_signature_entries=sum(r['verified_signed_transactions']for r in results.values()),preserved_examined_matches=188,new_complete_body_matches=0,restored_direct_edges=1,compiler_executed=False,target_executed=False)
def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--materialize',type=Path);p.add_argument('--variant',choices=['current','buy-v2-shared'],default='buy-v2-shared');a=p.parse_args();integrity();data=sources();result=evidence()
 if a.materialize:
  dest=a.materialize.absolute();assert not dest.exists()and not dest.is_symlink()and not any(x.is_symlink()for x in dest.parents);dest.mkdir(parents=True)
  for name,value in data[a.variant].items():path=dest/safe(name);path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(value)
  result['materialized']=str(dest)
 print(json.dumps(result,sort_keys=True))
if __name__=='__main__':main()
