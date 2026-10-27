"""Read-only signed verification of the Q18 bounded V2 replay; no VM or RPC."""
from pathlib import Path
import base64,hashlib,json,re,struct,subprocess,sys,tempfile
from solders.transaction import Transaction
if not __debug__:raise SystemExit("Run without Python optimization")
P=Path(__file__).resolve().parent;W=P.parent;R=W.parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
BINDINGS_SHA='7a9b4b864d7abf6ed661358a611c0089f451c93c38a08f555f0d2de3123ea809'
assert sha((P/'bindings.json').read_bytes())==BINDINGS_SHA
binding=json.loads((P/'bindings.json').read_bytes())
candidate=W/'fast-accounts-buyv2-owned-source-q18-build/candidate.so'
assert sha(candidate.read_bytes())==binding['candidate_sha256']
assert sha((R/'evidence/original/mayhem/deployed.so').read_bytes())==binding['original_sha256']
may='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e';groups=[];signed=programs=successes=0
with tempfile.TemporaryDirectory(prefix='q18-verify-') as tmp:
 for role in ['buy','sell']:
  casepath=W/f'{role}v2-body-audit/bounded-cases.json';assert sha(casepath.read_bytes())==binding['case_files'][role]
  basecases=json.loads(casepath.read_bytes())['cases'];assert len(basecases)==8
  checker=R/f'scripts/verify_mayhem_{role}_v2.py';assert sha(checker.read_bytes())==binding['checkers'][str(checker.relative_to(R))]
  for family in ['native','token','token22']:
   path=P/f'{role}-{family}.json';report=json.loads(path.read_bytes());assert report['candidate_sha256']==binding['candidate_sha256'] and report['original_sha256']==binding['original_sha256']
   expected=[dict(c,token_quote=family!='native',quote_token22=family=='token22')for c in basecases]
   assert [v['case']for v in report['cases']]==expected
   assert report['case_count']==8 and not report['mismatches'] and not report['normalized_log_differences']
   for relative,digest in report['harness_sha256'].items():assert sha((R/relative).read_bytes())==digest
   for pair,case in zip(report['cases'],expected):
    clean=lambda r:[v for v in r['metadata']['logs']if not re.search(r' consumed \d+ of \d+ compute units',v)]
    assert clean(pair['original'])==clean(pair['candidate'])
    for name,digest in [('original',binding['original_sha256']),('candidate',binding['candidate_sha256'])]:
     record=pair[name];assert record['case']==case
     for phase in ['before','after']:
      account=record[phase][may];assert account['executable'] is True and account['data_sha256']==digest
     programs+=1
     tx=Transaction.from_bytes(base64.b64decode(record['transaction_base64'],validate=True));assert all(tx.verify_with_results())
     assert record['signature']==str(tx.signatures[0])==record['metadata']['signature'] and record['signature_verified'] is True
     ix=tx.message.instructions[-1];assert str(tx.message.account_keys[ix.program_id_index])==may
     raw=bytes(ix.data);vt,vs,*_=record['inputs']['curve'];reference=case.get('reference',vs*10**15//vt if vt else 0)
     assert raw==hashlib.sha256(f'global:{role}_v2'.encode()).digest()[:8]+reference.to_bytes(16,'little')+struct.pack('<HH',case.get('tolerance',2400),case.get('retained',9000))
     keys=[tx.message.account_keys[i]for i in ix.accounts];quote='So11111111111111111111111111111111111111112'if family=='native'else'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
     assert str(keys[4])==quote
     token='TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'if family=='token22'else'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
     assert record['before'][quote]['owner']==token
     signed+=1
    successes+=pair['original']['error'] is None
   output=Path(tmp)/f'{role}-{family}.json';result=subprocess.run([sys.executable,'-B',str(checker),'--receipts',str(path),'--candidate',str(candidate),'--output',str(output)],capture_output=True,text=True)
   assert result.returncode==0,(role,family,result.stderr);check=json.loads(output.read_bytes());assert check['case_count']==8 and check['verified_signed_transactions']==16 and check['successful_cases']==2
   groups.append({'role':role,'family':family,'receipt_sha256':sha(path.read_bytes()),'cases':8,'signed_records':16,'successes':2,'complete_event_state_checks':check['complete_event_and_state_checks'],'complete_rollback_checks':check['complete_failed_transaction_rollback_checks']})
assert signed==96 and programs==96 and successes==12 and len(groups)==6
print(json.dumps({'candidate_sha256':binding['candidate_sha256'],'original_sha256':binding['original_sha256'],'cases':48,'signed_records':signed,'program_bindings':programs,'successes':successes,'exact_noncompute_log_pairs':48,'groups':groups,'scope':'Fresh ordinary signed synthetic V2 cases, native/token/token22; no full-body or historical-state identity claim.'},indent=2))
