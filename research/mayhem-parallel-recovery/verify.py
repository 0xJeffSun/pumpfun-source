"""Verify the composed parallel source, new original windows and signed replay."""
from pathlib import Path
import sys,json,gzip,hashlib,difflib,importlib.util,tempfile,base64
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1]
def raw(p):return gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
def load(p):return json.loads(raw(p))
def sha(b):return hashlib.sha256(b).hexdigest()
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def source_inputs():
 b=R/'research/mayhem-native-program-recovery';mf=load(b/'manifest.json');before={}
 for f in(b/'sources').rglob('*.gz'):
  assert sha(f.read_bytes())==mf[f.relative_to(b).as_posix()];before[f.relative_to(b/'sources').as_posix().removesuffix('.gz')]=raw(f)
 for packet,name in [('mayhem-native-buy-v2-validation','buy_v2.rs'),('mayhem-full-curve-recovery','sell.rs')]:
  d=R/'research'/packet;f=d/'override/src/instructions'/name;assert sha(f.read_bytes())==load(d/'manifest.json')[f.relative_to(d).as_posix()];before['src/instructions/'+name]=f.read_bytes()
 assert len(before)==54
 after=dict(before);overrides={f.relative_to(P/'overrides').as_posix():f.read_bytes()for f in(P/'overrides').rglob('*')if f.is_file()}
 after.update(overrides);assert len(after)==60 and len(overrides)==19 and before.keys()<=after.keys()
 assert {n:sha(b)for n,b in after.items()}==load(P/'source-inputs.json')
 assert all(b!=before.get(n)for n,b in overrides.items())
 patch=''.join(''.join(difflib.unified_diff(before.get(n,b'').decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n if n in before else'/dev/null',tofile='b/'+n))for n in sorted(overrides)).encode()
 assert patch==(P/'source.patch').read_bytes();assert(P/'.gitattributes').read_bytes()==b'source.patch -whitespace\noverrides/src/instructions/admin.rs -whitespace\n'
 return after

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
  log=raw(P/f'builds/{label}/stderr.gz');assert log.count(b'--crate-name anchor_lang ')==1 and log.count(b'--crate-name pump_interface ')==1 and log.count(b'--crate-name mayhem_recovered ')==1
  for kind in ['candidate','symbols']:assert sha(raw(P/f'artifacts/{label}/{kind}.so.gz'))==result[kind+'_sha256']
  outputs[label]=(raw(P/f'artifacts/{label}/candidate.so.gz'),raw(P/f'artifacts/{label}/symbols.so.gz'))
 assert outputs['recovered']==outputs['repeat'];candidate,symbols=outputs['recovered'];assert sha(candidate)=='96fc7a96d0f7e622ce46436573ac2166c92c6d8180e3bfa3d69fadc176c2e7b6'
 for n,b in module('parallel_analysis',P/'analysis.py').generate().items():assert(P/n).read_bytes()==b,n
 prior=load(R/'research/mayhem-full-curve-recovery/audit.json')['rows'];before={r['id']:r for r in prior};audit=load(P/'audit.json');rows=audit['rows']
 assert audit['summary']['statuses']==dict(raw_local_match=59,normalized_only=316,unmatched=66)
 assert all(r['status']!='unmatched'for r in rows if before[r['id']]['status']!='unmatched')
 assert {r['id']for r in rows if r['status']=='raw_local_match'}=={r['id']for r in prior if r['status']=='raw_local_match'}
 gains=[r for r in rows if before[r['id']]['status']=='unmatched'and r['status']!='unmatched']
 assert len(gains)==30 and sum(r['bytes']for r in gains)==80576
 assert load(P/'gains.json')==dict(gains=gains,matching_window_bytes=80576)
 for r in gains:
  bad=sorted(set(e['original_target']for c in r['counterparts']for e in c['direct_edges']if e['status']!='matching_target_shape'))
  assert bad==({'O0021':[250208],'O0028':[249208]}.get(r['id'],[])),(r['id'],bad)
 with tempfile.TemporaryDirectory()as td:
  f=Path(td)/'symbols.so';f.write_bytes(symbols)
  assert module('parallel_burn',P/'burn_audit.py').analyze(f)==load(P/'burn-audit.json')
  bd=load(P/'burn-audit.json')['data_references'];assert sum(x['equal']for x in bd)==23 and [x['offset']for x in bd if not x['equal']]==[3968,5536]
  assert module('parallel_consumption',P/'consumption.py').analyze(f)==load(P/'consumption.json')
 result=dict(source_inputs=60,matched_windows=375,raw_local_matches=59,new_complete_normalized_windows=30,new_matching_text_bytes=80576,unmatched_windows=66,unmatched_text_bytes=268000,compiler_executed=False,target_executed=False)
 if runtime:
  result.update(module('parallel_runtime',P/'runtime_check.py').verify_runtime(candidate))
  from solders.transaction import Transaction
  extra=[];records=0
  for label,count in [('fee-recipient',306),('sweeps',692),('withdraw',274),('quote-withdraw',329)]:
   d=load(P/f'runtime/extra/{label}.json.gz');assert d['candidate_sha256']==sha(candidate)and d['original_sha256']==sha((R/'evidence/original/mayhem/deployed.so').read_bytes())
   assert d['case_count']==len(d['cases'])==count and not d['mismatches']
   for n,h in d['harness_sha256'].items():assert sha((R/n).read_bytes())==h,n
   for row in d['cases']:
    assert not row['different_fields']and row['fields']==sorted(set(row['original'])-{'logs'})
    assert set(row['original'])==set(row['candidate'])
    assert all(row['original'][k]==row['candidate'][k]for k in row['fields'])
    assert row['original_transaction_base64']==row['candidate_transaction_base64']
    for phase in ['original','candidate']:
     tx=Transaction.from_bytes(base64.b64decode(row[phase+'_transaction_base64']));assert all(tx.verify_with_results());records+=1
   extra.append(dict(family=label,cases=count))
  assert records==3202;result.update(extra_cases=1601,extra_signed_transaction_records=records,extra_corpora=extra)
  known=load(P/'known-gaps/sweep-rate.json.gz');assert known['count']==len(known['cases'])==150
  assert known['binary_sha256']==dict(original=sha((R/'evidence/original/mayhem/deployed.so').read_bytes()),baseline=sha(candidate))
  assert sha((P/'known-gaps/recorded-harness.py.txt').read_bytes())==known['harness_sha256']
  fields=['error','accounts','events','inner','return_data'];bad=[]
  for i,row in enumerate(known['cases']):
   a,b=row['results']['original'],row['results']['baseline'];equal=all(a[k]==b[k]for k in fields)
   assert row['equal']['baseline']==equal
   if not equal:bad.append(i)
   for phase in ['original','baseline']:
    receipt=known['receipts'][phase][i];tx=Transaction.from_bytes(bytes.fromhex(receipt['transaction_hex']))
    assert all(tx.verify_with_results())and tx.verify_with_results()==receipt['signature_verification']
   assert known['receipts']['original'][i]['transaction_hex']==known['receipts']['baseline'][i]['transaction_hex']
  assert bad==known['mismatches']['baseline']and len(bad)==34
  assert len({json.dumps(row['case'],sort_keys=True)for row in known['cases']})==150
  result.update(known_sweep_rate_cases=150,known_sweep_rate_mismatches=34,known_sweep_signed_records=300)
 print(json.dumps(result,indent=2));return result
if __name__=='__main__':verify()
