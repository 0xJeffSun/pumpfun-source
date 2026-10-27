"""Offline verification of the unchanged-source native Linux reproduction."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,re,subprocess,sys,tempfile,tomllib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1];PARENT=R/'research/mayhem-sell-quote-call-recovery'
CANDIDATE='9d242979b15dbac90be979732d4929ab58eb9d8b81051127424194ae3e60b291'
SYMBOLS='452db6e0196bae7918791987bdfd351c015289510f19619eee760d882fe9b082'
sha=lambda b:hashlib.sha256(b).hexdigest()
raw=lambda p:gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
load=lambda p:json.loads(raw(p))
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def source_inputs():
 d=module('native_source_parent',PARENT/'verify.py').source_inputs()
 assert len(d)==65 and {n:sha(b)for n,b in d.items()}==load(P/'source-inputs.json')==load(PARENT/'source-inputs.json')
 return d

def check_build(launch,result,log,sources,candidate_sha=CANDIDATE,symbols_sha=SYMBOLS):
 assert launch['fresh'] and launch['originals_mounted']is False
 assert launch['source_inputs']=={n:sha(b)for n,b in sources.items()}
 expected={p['name']+'-'+p['version']:p['checksum']for p in tomllib.loads(sources['Cargo.lock'].decode())['package']if p.get('source','').startswith('registry+')}
 assert launch['registry']==expected
 assert result['exit_code']==0 and all(result[n]for n in ['source_unchanged','registry_unchanged','tools_unchanged'])
 assert result['build_log_sha256']==sha(log) and result['root_invocations']==1
 assert launch['controller_sha256']==sha((P/'build.py').read_bytes())
 command=launch['command'];assert command[:3]==['docker','run','--rm']and command[command.index('--network')+1]=='none'
 assert 'solanafoundation/solana-verifiable-build@sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50'in command
 assert all(v in command for v in ['env','-i','--locked','--offline','--verbose','sbpf-solana-solana'])
 assert command[-2:]==['--remap-path-prefix=src/=programs/mayhem-program/src/','--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
 assert launch['environment']['CARGO_TARGET_DIR']=='/target' and launch['environment']['RUSTC']=='/sdk/rust/bin/rustc'
 mounts=[command[i+1]for i,v in enumerate(command)if v=='--mount']
 assert len(mounts)==6 and all(not any(x in v for x in ['/evidence/','/artifacts/','.so,'])for v in mounts)
 for guest in ['/source','/sdk','/strip-sdk']:assert any('target='+guest+',readonly'in x for x in mounts)
 assert any('target=/target'in x and '/builds/'in x and '/target,'in x for x in mounts)
 invocations=re.findall(rb'--crate-name ([a-zA-Z0-9_]+) ',log)
 assert invocations.count(b'mayhem_recovered')==1
 for name in ['anchor_lang','curve_accounts','anchor_spl','borsh','solana_program_entrypoint']:assert name.encode()in invocations,name
 assert len(invocations)==163 and len(set(invocations))==132
 for v in ['1.54','1.52']:
  pin=P/'toolchains'/('sdk-'+v+'-full.json');sdk=load(pin);c=launch['sdk_checks'][v]
  assert c==dict(manifest_sha256=sha(pin.read_bytes()),files=len(sdk['files']),symlinks=len(sdk['symlinks']))
 assert result['artifacts']['candidate.so']['sha256']==candidate_sha and result['artifacts']['symbols.so']['sha256']==symbols_sha
 return len(invocations)

def verify(runtime=True):
 assert not any(p.is_symlink()for p in P.rglob('*'))
 assert load(P/'manifest.json')=={p.relative_to(P).as_posix():sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}
 for n,h in load(P/'inputs.json').items():assert sha((R/n).read_bytes())==h,n
 module('native_verified_parent',PARENT/'verify.py').verify(runtime=False)
 sources=source_inputs();candidate=raw(P/'artifacts/recovered/candidate.so.gz');symbols=raw(P/'artifacts/recovered/symbols.so.gz')
 assert sha(candidate)==CANDIDATE and sha(symbols)==SYMBOLS
 assert candidate!=raw(PARENT/'artifacts/recovered/candidate.so.gz')
 builds={}
 for label in ['native-current-authenticated','native-current-repeat']:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');log=raw(P/f'builds/{label}/build.log.gz');builds[label]=check_build(launch,result,log,sources)
  assert raw(P/f'artifacts/{label}/candidate.so.gz')==candidate and raw(P/f'artifacts/{label}/symbols.so.gz')==symbols
 for n,b in module('native_inventory',P/'analysis.py').generate().items():assert (P/n).read_bytes()==b,n
 audit=load(P/'audit.json');prior=load(PARENT/'audit.json');assert audit['summary']['statuses']==dict(normalized_only=355,raw_local_match=71,unmatched=15)
 assert audit['summary']['unmatched_window_bytes']==119400 and not audit['summary']['whole_file_equal']
 current={r['id']:r for r in audit['rows']}
 for r in prior['rows']:
  if r['status']!='unmatched':assert current[r['id']]['status']!='unmatched'
  if r['status']=='raw_local_match':assert current[r['id']]['status']=='raw_local_match'
 assert [r['id']for r in prior['rows']if r['status']!='raw_local_match'and current[r['id']]['status']=='raw_local_match']==['O0297']
 with tempfile.TemporaryDirectory()as td:
  t=Path(td);sy=t/'symbols.so';so=t/'candidate.so';base=t/'baseline.so';sy.write_bytes(symbols);so.write_bytes(candidate);base.write_bytes(raw(PARENT/'artifacts/recovered/symbols.so.gz'))
  out=t/'progress.json';subprocess.run([sys.executable,'-B',str(P/'progress.py'),str(base),str(sy),str(out)],check=True,capture_output=True);assert load(out)==load(P/'progress.json')
  progress=load(out);assert progress['positive_direct_edges_before']==progress['positive_direct_edges_after']==4234;assert progress['positive_Source_records_before']==progress['positive_Source_records_after']==441
  assert module('native_helper',P/'helper.py').inspect(sy)==load(P/'helper.json')
  data=module('native_account_bounds',R/'research/mayhem-account-data-extents/analysis.py');data.PARENT=P
  for n,b in data.generate().items():assert(P/'data'/n).read_bytes()==b
  assert load(P/'data/audit.json')['summary']==dict(references_reexamined=59,new_typed_equal=56,new_typed_different=0,still_unresolved=3,total_typed_equal=153,total_typed_different=0)
  result=dict(source_inputs=65,changed_source_files=0,matched_windows=426,new_complete_matches=0,raw_local_windows=71,unmatched_windows=15,compiler_invocations=builds,compiler_executed=False,target_executed=False)
  if runtime:result.update(verify_runtime(so))
 print(json.dumps(result,indent=2));return result

def verify_runtime(candidate):
 from solders.transaction import Transaction
 check=module('native_parent_receipts',PARENT/'verify.py');summary={};signed=0
 for j in load(P/'validation/commands.json'):
  name=j['instruction'].replace('buy_pump_swap','buy-amm').replace('sell_pump_swap','sell-amm').replace('_','-')+(('-'+j['family'])if j['family']!='legacy'else'')
  report=load(P/'validation'/(j['name']+'.json.gz'));summary[name]=check.check_receipts(name,report,candidate.read_bytes())
  with tempfile.TemporaryDirectory()as td:
   t=Path(td);rp=t/'receipt.json';out=t/'checked.json';rp.write_bytes(raw(P/'validation'/(j['name']+'.json.gz')))
   script=Path(j['verify'][3]).name;subprocess.run([sys.executable,'-I','-B',str(R/'scripts'/script),'--candidate',str(candidate),'--receipts',str(rp),'--output',str(out)],check=True,capture_output=True)
   assert load(out)==load(P/'validation'/(j['name']+'-independent.json'))
 assert set(summary)==set(check.EXPECTED)and sum(r['cases']for r in summary.values())==6636;signed=13272
 extra_summary={}
 for label,count in [('admin',1032),('fee-recipient',306),('sweeps',692),('withdraw',274),('quote-withdraw',329)]:
  d=load(P/'validation'/('extra-'+label+'.json.gz'));assert d['candidate_sha256']==CANDIDATE and d['original_sha256']==sha((R/'evidence/original/mayhem/deployed.so').read_bytes());assert d['case_count']==len(d['cases'])==count and not d['mismatches']
  prior_path=R/'research/mayhem-source-data-recovery/runtime'/('admin.json.gz'if label=='admin'else 'extra/'+label+'.json.gz')
  assert [r['case']for r in d['cases']]==[r['case']for r in load(prior_path)['cases']]
  if label!='admin':
   for n,h in d['harness_sha256'].items():assert sha((R/n).read_bytes())==h
  diagnostics=0
  for row in d['cases']:
   a,b=row['original'],row['candidate'];fields=['error','data','lamports','events','inner_instructions','owner','admin_lamports_delta','payer_lamports_delta']if label=='admin'else sorted(set(a)-{'logs'})
   assert not row['different_fields']and all(a[k]==b[k]for k in fields)
   assert row['original_transaction_base64']==row['candidate_transaction_base64']
   for phase in ['original','candidate']:assert all(Transaction.from_bytes(base64.b64decode(row[phase+'_transaction_base64'])).verify_with_results());signed+=1
   norm=lambda r:[x for x in r.get('logs',[])if not re.search(r' consumed \d+ of \d+ compute units',x)]
   diagnostics+=norm(a)!=norm(b)
  extra_summary[label]=dict(cases=count,noncompute_log_mismatches=diagnostics)
 boundaries=load(P/'validation/sweep-boundaries.json.gz');assert boundaries['binary_sha256']==dict(original=sha((R/'evidence/original/mayhem/deployed.so').read_bytes()),candidate=CANDIDATE);assert boundaries['count']==len(boundaries['cases'])==240 and not boundaries['mismatches']
 assert len({json.dumps(r['case'],sort_keys=True)for r in boundaries['cases']})==240
 for row in boundaries['cases']:
  a,b=row['results']['original'],row['results']['candidate'];assert not row['different_fields']and all(a[k]==b[k]for k in ['error','accounts','events','inner','return_data'])
  assert row['receipts']['original']['transaction']==row['receipts']['candidate']['transaction']
  for phase in ['original','candidate']:
   receipt=row['receipts'][phase];tx=Transaction.from_bytes(base64.b64decode(receipt['transaction']));assert all(tx.verify_with_results())and tx.verify_with_results()==receipt['verified'];signed+=1
 assert signed==19018
 initializers={}
 for label,count in [('initializer-rejections',53),('initializer-cpi',16),('token-program',2),('global-init',6)]:
  d=load(P/'validation'/(label+'.json.gz'));assert d['candidate_sha256']==CANDIDATE and d['original_sha256']==sha((R/'evidence/original/mayhem/deployed.so').read_bytes());assert len(d['cases'])==count and not d['mismatches']
  expected_script=R/'research/mayhem-initializer-validation/validation_matrix.py'if label=='initializer-rejections'else P/('run_'+label.replace('-','_')+'.py')
  assert d['runner_sha256']==sha(expected_script.read_bytes())
  successes=0
  for row in d['cases']:
   a,b=row['original'],row['candidate'];assert not row['differences']
   if label=='global-init':
    fields=['before','after','error','transaction','anchor_errors','events','inner','returned'];txs=[a['transaction']];assert a['transaction']==b['transaction']
   elif label=='initializer-cpi':
    fields=['before','after','error','events','inner','return'];txs=row['original_signed_transactions'];assert txs==row['candidate_signed_transactions']
   else:
    fields=d['compared_fields'];txs=[a['signed_transaction_base64']];assert a['signed_transaction_base64']==b['signed_transaction_base64']
   assert all(a[k]==b[k]for k in fields);successes+=a['error']is None
   for tx in txs:assert all(Transaction.from_bytes(base64.b64decode(tx)).verify_with_results());signed+=2
  initializers[label]=dict(cases=count,successes=successes)
 assert initializers['initializer-cpi']['successes']==10 and initializers['global-init']['successes']==2
 assert signed==19202
 observed=dict(trades=summary,extra=extra_summary,boundaries=240,initializers=initializers,comparisons=9586,signed_transaction_records=signed)
 assert observed==load(P/'validation/summary.json');return observed

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--skip-runtime',action='store_true');p.add_argument('--materialize',type=Path);a=p.parse_args();verify(runtime=not a.skip_runtime)
 if a.materialize:
  a.materialize.mkdir(parents=True,exist_ok=False)
  for n,b in source_inputs().items():q=a.materialize/n;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(b)
