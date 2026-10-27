#!/usr/bin/env python3
"""Verify sealed current-source build and saved fresh-execution receipts; no compiler, VM or network."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,re
from solders.transaction import VersionedTransaction
P=Path(__file__).resolve().parent
MAY='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
H=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def J(path):
 b=Path(path).read_bytes();return json.loads(gzip.decompress(b)if b[:2]==b'\x1f\x8b'else b)
def clean(x):
 if isinstance(x,dict):return{k:clean(v)for k,v in x.items()}
 if isinstance(x,list):return[clean(v)for v in x if not(isinstance(v,str)and re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',v))]
 if isinstance(x,str):return re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',re.sub(r'(?<=panicked at )[^ ]+:[0-9]+:[0-9]+','<source>',x))
 return x
def snapshot(root):
 crate=root/'programs/mayhem'
 return{str(f.relative_to(root)):H(f)for f in sorted(crate.rglob('*'))if f.is_file()and not{'target','.git'}.intersection(f.relative_to(crate).parts)and(f.suffix=='.rs'or f.name in['Cargo.toml','Cargo.lock'])}
def accounts(a):return{k:v for k,v in a.items()if k!=MAY}
def trade_pair(a,b):
 assert a['transaction_base64']==b['transaction_base64']and a['error']==b['error']
 for phase in ['before','after']:assert accounts(a[phase])==accounts(b[phase])
 for field in ['inner_instructions','return_data']:assert a['metadata'][field]==b['metadata'][field]
 assert [l for l in a['metadata']['logs']if l.startswith('Program data: ')]==[l for l in b['metadata']['logs']if l.startswith('Program data: ')]
def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--current-source','--current-root',dest='current_source',type=Path,required=True,help='repository root containing programs/mayhem');ap.add_argument('--expected-seal',required=True);args=ap.parse_args()
 assert H(P/'manifest.json')==args.expected_seal
 manifest=J(P/'manifest.json')
 for name,digest in manifest['files'].items():assert H(P/name)==digest,name
 stats=J(P/'stats.json');source=J(P/'source14.json');assert source==stats['source14']and len(source)==14
 for root in [P/'source',args.current_source.resolve()]:
  assert snapshot(root)==source,'Exact current source inventory/hash mismatch'
  for name in source:assert not(root/name).is_symlink()
 original=args.current_source/'evidence/original/mayhem/deployed.so';assert H(original)==stats['original_mayhem_sha256']
 raw=J(P/'recorded-build-inputs.json');assert raw==stats['recorded_build_inputs']
 for name,digest in raw.items():assert H(P/('source'if name in source else'recorded-generated-inputs')/name)==digest
 for filename in ['build.json','repeat-build.json']:
  r=J(P/filename);assert r['returncode']==0 and r['source_unchanged'];assert r['source_sha256']==r['source_after_sha256']==raw
  assert r['candidate_sha256']==stats['candidate_sha256']==H(P/'candidate.so');assert r['unstripped_sha256']==H(P/'unstripped.so')
  assert H(P/('build.log'if filename=='build.json'else'repeat-build.log'))==r['log_sha256']
 totals=signatures=transactions=message_pairs=0
 for suite in stats['baseline_suites']:
  r=J(P/suite['report']);name=suite['name'];assert hashlib.sha256(gzip.decompress((P/suite['report']).read_bytes())).hexdigest()==suite['raw_report_sha256']
  if 'candidate_sha256'in r:assert r['candidate_sha256']==stats['candidate_sha256']
  if name!='burn':assert not r.get('mismatches',r.get('failures',[])),name
  rows=r.get('cases',[]);assert r['case_count']==len(rows)==suite['case_count'];totals+=len(rows)
  for row in rows:
   a,b=row['original'],row['candidate']
   if name=='burn':
    assert a['binary_sha256']==stats['original_mayhem_sha256']and b['binary_sha256']==stats['candidate_sha256']
    assert set(row['different_fields'])<= {'second.logs_without_compute_numbers'}
    for x,y in [(a,b),(a['sequential_second'],b['sequential_second'])]:
     assert x['transaction_base64']==y['transaction_base64']and x['error']==y['error']
     for phase in ['before','after']:assert accounts(x[phase])==accounts(y[phase])
     for field in ['inner_instructions','return_data']:assert x['metadata'][field]==y['metadata'][field]
     assert clean(x['logs_without_compute_numbers'])==clean(y['logs_without_compute_numbers'])
   elif name in ['admin','fee_recipient','extend','withdraw','quote_withdraw','sweeps']:
    fields=['error','data','lamports','events','inner_instructions','owner','admin_lamports_delta','payer_lamports_delta']if name=='admin'else['error','accounts','events',('inner'if name in ['quote_withdraw','sweeps']else'inner_instructions'),'return_data']
    assert row['equal']and all(a[f]==b[f]for f in fields),name
   else:assert not row['different_fields'];trade_pair(a,b)
  txs=J(P/suite['transactions'])['transactions'];transactions+=len(txs)
  for tx in txs:
   parsed=VersionedTransaction.from_bytes(base64.b64decode(tx['transaction_base64'],validate=True));checks=parsed.verify_with_results();assert checks and all(checks)and checks==tx['signature_verification'];signatures+=len(checks)
  i=0
  while i<len(txs):
   j=i
   while j<len(txs)and txs[j]['program_sha256']==stats['original_mayhem_sha256']:j+=1
   k=j
   while k<len(txs)and txs[k]['program_sha256']==stats['candidate_sha256']:k+=1
   assert j>i and k-j==j-i,(name,i,j,k)
   for x,y in zip(txs[i:j],txs[j:k]):assert x['transaction_base64']==y['transaction_base64'];message_pairs+=1
   i=k
 init=J(P/'runtime/initializer.json.gz');assert init['candidate_sha256']==stats['candidate_sha256']and init['original_mayhem_sha256']==stats['original_mayhem_sha256']and not init['mismatches']
 assert init['pump_is_original_on_both_sides']and init['success_cases']==9 and init['case_count']==16
 init_txs=J(P/'runtime/initializer-transactions.json.gz')['transactions'];cursor=0
 for tx in init_txs:
  parsed=VersionedTransaction.from_bytes(base64.b64decode(tx['transaction_base64'],validate=True));checks=parsed.verify_with_results();assert checks and all(checks)and checks==tx['signature_verification'];signatures+=len(checks)
 for case in init['cases']:
  assert not case['differences']and clean(case['original'])==clean(case['candidate'])
  count=case['transactions_per_side'];left=init_txs[cursor:cursor+count];right=init_txs[cursor+count:cursor+2*count];cursor+=2*count
  assert len(left)==len(right)==count
  for x,y in zip(left,right):assert x['transaction_base64']==y['transaction_base64']and x['before']==y['before']and x['after']==y['after']
 assert cursor==len(init_txs)
 checks=J(P/'receipt-verification/attempts.json');assert len(checks)==15 and all(x['returncode']==0 for x in checks)
 for result in (P/'receipt-verification').glob('*.json'):
  if result.name=='attempts.json':continue
  v=J(result);assert not v.get('mismatches',[]);assert v.get('candidate_sha256',stats['candidate_sha256'])==stats['candidate_sha256']
 assert totals==stats['baseline_case_count']and transactions==stats['baseline_transaction_count']and signatures==stats['verified_signature_count']and message_pairs==stats['baseline_identical_message_pairs']
 print(json.dumps({'passed':True,'schema':'mayhem-current-initializer-v1','candidate_sha256':stats['candidate_sha256'],'source_files':14,'baseline_cases':totals,'baseline_instruction_comparisons':stats['baseline_instruction_comparisons'],'initializer_cases':16,'initializer_successes':9,'verified_transactions':transactions+len(init_txs),'verified_signatures':signatures,'baseline_identical_message_pairs':message_pairs,'fresh_runtime_evidence':True,'executes_new_runtime':False,'whole_byte_equality':False,'historical_source_recovered':False},indent=2))
if __name__=='__main__':main()
