"""Verify the composed Mayhem source, 441-window audit and saved signed execution."""
from pathlib import Path
import sys,json,gzip,hashlib,difflib,importlib.util,tempfile,base64,subprocess
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1]
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(raw(p))
def sha(b):return hashlib.sha256(b).hexdigest()
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def source_inputs():
 parent=module('composed_parent',R/'research/mayhem-parallel-recovery/verify.py')
 parent.verify(runtime=False)
 before=parent.source_inputs();after=dict(before)
 overrides={f.relative_to(P/'overrides').as_posix():f.read_bytes()for f in(P/'overrides').rglob('*')if f.is_file()}
 after.update(overrides);assert len(after)==64 and len(overrides)==16 and before.keys()<=after.keys()
 assert all(b!=before.get(n)for n,b in overrides.items())
 assert {n:sha(b)for n,b in after.items()}==load(P/'source-inputs.json')
 patch=''.join(''.join(difflib.unified_diff(before.get(n,b'').decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n if n in before else'/dev/null',tofile='b/'+n))for n in sorted(overrides)).encode()
 assert patch==(P/'source.patch').read_bytes()
 rules='source.patch -whitespace\n'+''.join('overrides/'+n+' -whitespace\n'for n in sorted(overrides)if any(line.rstrip(b'\r\n').rstrip(b' \t')!=line.rstrip(b'\r\n')for line in after[n].splitlines(keepends=True))or after[n].endswith(b'\n\n'))
 assert(P/'.gitattributes').read_bytes()==rules.encode()
 return after

def positive(row):return {(e['offset'],e['original_target'])for c in row['counterparts']for e in c['direct_edges']if e['status']=='matching_target_shape'}
def verify(runtime=True):
 assert not any(f.is_symlink()for f in P.rglob('*'))
 assert load(P/'manifest.json')=={f.relative_to(P).as_posix():sha(f.read_bytes())for f in P.rglob('*')if f.is_file()and f.name!='manifest.json'and'__pycache__'not in f.parts}
 for n,h in load(P/'inputs.json').items():assert sha((R/n).read_bytes())==h,n
 sources=source_inputs();outputs={}
 for label in ['recovered','repeat']:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');assert launch['source_inputs']=={n:sha(b)for n,b in sources.items()}
  assert result['returncode']==0 and result['source_unchanged']and result['root_invocations']==1
  assert '--locked'in launch['command']and'--offline'in launch['command']and'sbpf-solana-solana'in launch['command']
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  log=raw(P/f'builds/{label}/stderr.gz')
  for crate in ['anchor_lang','pump_interface','curve_accounts','mayhem_recovered']:assert log.count(('--crate-name '+crate+' ').encode())==1,crate
  for kind in ['candidate','symbols']:assert sha(raw(P/f'artifacts/{label}/{kind}.so.gz'))==result[kind+'_sha256']
  outputs[label]=(raw(P/f'artifacts/{label}/candidate.so.gz'),raw(P/f'artifacts/{label}/symbols.so.gz'))
 assert outputs['recovered']==outputs['repeat'];candidate,symbols=outputs['recovered']
 assert sha(candidate)=='17869439c63dd10e06a87252b770ff7041654768d7b419e014d09a0b4422ba97'
 for n,b in module('composed_analysis',P/'analysis.py').generate().items():assert(P/n).read_bytes()==b,n
 prior=load(R/'research/mayhem-parallel-recovery/audit.json')['rows'];before={r['id']:r for r in prior};audit=load(P/'audit.json');rows=audit['rows']
 assert audit['summary']['statuses']==dict(raw_local_match=59,normalized_only=352,unmatched=30)
 assert audit['summary']['unmatched_window_bytes']==155520 and not audit['summary']['whole_file_equal']
 assert all(r['status']!='unmatched'for r in rows if before[r['id']]['status']!='unmatched')
 assert {r['id']for r in rows if r['status']=='raw_local_match'}=={r['id']for r in prior if r['status']=='raw_local_match'}
 assert all(positive(before[r['id']])<=positive(r)for r in rows)
 gains=[r for r in rows if before[r['id']]['status']=='unmatched'and r['status']!='unmatched'];assert len(gains)==36 and sum(r['bytes']for r in gains)==112480
 assert load(P/'gains.json')==dict(gains=gains,matching_window_bytes=112480)
 for r in gains:
  bad=sorted(set(e['original_target']for c in r['counterparts']for e in c['direct_edges']if e['status']!='matching_target_shape'))
  assert bad==({'O0166':[516064],'O0185':[430840,534840]}.get(r['id'],[])),(r['id'],bad)
 with tempfile.TemporaryDirectory()as td:
  t=Path(td);sy=t/'symbols.so';so=t/'candidate.so';sy.write_bytes(symbols);so.write_bytes(candidate)
  for name in ['account','trade','cpi']:
   output=t/(name+'.json')
   subprocess.run([sys.executable,'-B',str(P/(name+'_data.py')),str(sy),str(so),str(output)],check=True,capture_output=True)
   assert load(output)==load(P/(name+'-data.json')),name
  account=load(P/'account-data.json')['summary'];assert (account['rows'],account['counterparts'],account['data_refs'],account['typed_equal'],account['typed_different'],account['unresolved'])==(26,30,156,34,63,59)
  cpi=load(P/'cpi-data.json')['summary'];assert (cpi['normalized_bodies'],cpi['direct_calls_checked'],cpi['source_records_checked'],cpi['source_records_equal'])==(7,297,48,46)
 result=dict(source_inputs=64,matched_windows=411,raw_local_matches=59,new_complete_normalized_windows=36,new_matching_text_bytes=112480,unmatched_windows=30,unmatched_text_bytes=155520,compiler_executed=False,target_executed=False)
 if runtime:
  from solders.transaction import Transaction
  result.update(module('composed_runtime',P/'runtime_check.py').verify_runtime(candidate))
  records=0
  for label,count in [('fee-recipient',306),('sweeps',692),('withdraw',274),('quote-withdraw',329)]:
   d=load(P/f'runtime/extra/{label}.json.gz');assert d['candidate_sha256']==sha(candidate)and d['original_sha256']==sha((R/'evidence/original/mayhem/deployed.so').read_bytes())
   assert d['case_count']==len(d['cases'])==count and not d['mismatches']
   for n,h in d['harness_sha256'].items():assert sha((R/n).read_bytes())==h,n
   for row in d['cases']:
    assert not row['different_fields']and row['fields']==sorted(set(row['original'])-{'logs'})and set(row['original'])==set(row['candidate'])
    assert all(row['original'][k]==row['candidate'][k]for k in row['fields'])
    assert row['original_transaction_base64']==row['candidate_transaction_base64']
    for phase in ['original','candidate']:
     tx=Transaction.from_bytes(base64.b64decode(row[phase+'_transaction_base64']));assert all(tx.verify_with_results());records+=1
  assert records==3202;result.update(extra_cases=1601,extra_signed_transaction_records=records)
  sweep=load(P/'runtime/sweep-rate.json.gz');assert sweep['count']==len(sweep['cases'])==150
  assert sweep['binary_sha256']==dict(original=sha((R/'evidence/original/mayhem/deployed.so').read_bytes()),baseline=sha(raw(R/'research/mayhem-parallel-recovery/artifacts/recovered/candidate.so.gz')),candidate=sha(candidate))
  assert sweep['harness_sha256']==sha((P/'runners/sweep.py.txt').read_bytes())
  assert set(sweep['receipts'])=={'original','baseline','candidate'}and all(len(v)==150 for v in sweep['receipts'].values())
  fields=['error','accounts','events','inner','return_data'];bad=[]
  for i,row in enumerate(sweep['cases']):
   a=row['results']['original']
   for phase in ['baseline','candidate']:
    equal=all(a[k]==row['results'][phase][k]for k in fields);assert row['equal'][phase]==equal
    if phase=='candidate':assert equal
    elif not equal:bad.append(i)
   for phase in ['original','baseline','candidate']:
    receipt=sweep['receipts'][phase][i];tx=Transaction.from_bytes(bytes.fromhex(receipt['transaction_hex']));assert all(tx.verify_with_results())and tx.verify_with_results()==receipt['signature_verification']
   assert len({sweep['receipts'][phase][i]['transaction_hex']for phase in ['original','baseline','candidate']})==1
  assert bad==sweep['mismatches']['baseline']and len(bad)==34 and not sweep['mismatches']['candidate']
  assert len({json.dumps(row['case'],sort_keys=True)for row in sweep['cases']})==150
  result.update(sweep_rate_cases=150,repaired_sweep_rate_mismatches=34,sweep_signed_records=450)
  tx_records=0
  for label,count in [('initializer-rejections',53),('initializer-cpi',16)]:
   d=load(P/f'runtime/{label}.json.gz');assert d['case_count']==len(d['cases'])==count and not d['mismatches']
   assert d['candidate_sha256']==sha(candidate)and d['original_sha256']==sha((R/'evidence/original/mayhem/deployed.so').read_bytes())
   if label=='initializer-cpi':
    assert d['runner_sha256']==sha((P/'runners/initializer-cpi.py.txt').read_bytes())and d['harness_sha256']==sha((R/'research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py').read_bytes())
    assert d['original_pump_sha256']==sha((R/'evidence/original/pump/deployed.so').read_bytes())
   else:
    assert d['runner_sha256']==sha((R/'research/mayhem-initializer-validation/validation_matrix.py').read_bytes())and d['harness_sha256']==sha((R/'repro/behavioral-recovery/scripts/mayhem_initialize_state_differential.py').read_bytes())
    assert d['compared_fields']==['error','anchor_errors','before','after','events','inner','return','signed_transaction_base64']
   success=0
   for row in d['cases']:
    a,b=row['original'],row['candidate'];fields=['before','after','error','events','inner','return']if label=='initializer-cpi'else d['compared_fields'];assert all(a[k]==b[k]for k in fields)and not row['differences']
    if label=='initializer-cpi':
     assert row['original_signed_transactions']==row['candidate_signed_transactions'];txs=row['original_signed_transactions'];success+=a['error']is None
    else:assert a['error']is not None;txs=[a['signed_transaction_base64']]
    for data in txs:
     tx=Transaction.from_bytes(base64.b64decode(data));assert all(tx.verify_with_results());tx_records+=2
   if label=='initializer-cpi':assert success==10
  assert tx_records==168;result.update(initializer_rejections=53,initializer_cpi_cases=16,initializer_successes=10,initializer_signed_records=168)
 print(json.dumps(result,indent=2));return result
if __name__=='__main__':verify()
