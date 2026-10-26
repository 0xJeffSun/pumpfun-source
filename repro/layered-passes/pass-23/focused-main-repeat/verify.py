from pathlib import Path
import hashlib,json,sys,importlib.util,base64
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;h=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();j=lambda p:json.loads(p.read_text())
def verify():
 m=j(P/'manifest.json');assert h(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in [P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc'
 for n,d in m.items():assert h(P/n)==d,n
 assert j(P/'before.json')==j(P/'after.json');r=j(P/'receipt.json');w=j(P/'prepared/source-binding-witness.json');assert r['candidate_sha256']=='2387f8139a13918a5c9c523f140ecdd72db7243c8e2ed9cd7e1ff9d42ad6c8af';assert r['source_sha256']==w['new_source_sha256'];assert len(r['source_sha256'])==26;assert r['build_record_sha256']==w['current']['report_sha256'];assert r['build_record']['source_sha256']==r['source_sha256'];assert r['case_count']==20 and r['transaction_count']==40 and r['signature_count']==80 and not r['mismatches']
 s=importlib.util.spec_from_file_location('assertions',P/'prepared/validation-layer/harness/assertions.py');a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
 from solders.transaction import Transaction
 sigs=set();txs=set();errors={};raw=0
 cases=j(P/'prepared/validation-layer/cases.json');assert [x['case'] for x in r['cases']]==cases
 for row in r['cases']:
  assert row['match'] and not row['mismatches'];assert not any(row['expected_failures'].values());raw+=row['raw_logs_equal'];assert a.comparable(row['original'],r['roles']['PROGRAM']['str'])==a.comparable(row['candidate'],r['roles']['PROGRAM']['str'])
  for side in ['original','candidate']:
   v=row[side];assert not a.check_expected(v,row['case'],r['roles']);tx=Transaction.from_bytes(base64.b64decode(v['transaction_base64']));assert len(tx.signatures)==2 and all(tx.verify_with_results()) and v['signature_verification']==[True,True];sigs.update(str(x) for x in tx.signatures);txs.add(bytes(tx));errors[v['error']]=errors.get(v['error'],0)+1
 assert len(r['cases'])==20
 return {'status':'PASS','comparisons':20,'executions':40,'signature_fields':80,'unique_transactions':len(txs),'unique_signatures':len(sigs),'raw_log_pairs_equal':raw,'error_execution_counts':errors,'target_executions_by_verifier':0,'admin_only_coverage':0}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
