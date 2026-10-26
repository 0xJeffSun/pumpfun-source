"""Independent saved-receipt/Ed25519/PDA audit. No harness import, VM or target execution."""
from pathlib import Path
import base64,hashlib,json,sys,importlib.metadata
from solders.transaction import Transaction
from solders.pubkey import Pubkey
W=Path(__file__).resolve().parent.parent
P=W/'cto-wallet-collector-preservation-plan';R=W/'cto-wallet-collector-preservation-01';B=W/'cto-wallet-collector-build-01';O=Path(__file__).resolve().parent
J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();HB=lambda b:hashlib.sha256(b).hexdigest()
def snapshot(root):
 assert not any(x.is_symlink()for x in root.rglob('*'))
 return {str(f.relative_to(root)):H(f)for f in root.rglob('*')if f.is_file()}
plan_before=snapshot(P);output_before=snapshot(R)
assert H(P/'manifest.json')=='58b09002d2f1562b702db7e09ca2b905fae305157448b9e6a1eaf8fd540da2b6'
for n,h in J(P/'manifest.json').items():assert H(P/n)==h
inputs=J(P/'inputs.json');assert len(inputs)==15
for n,h in inputs.items():assert H(P/'repo'/n)==h
source=J(P/'source37.json');assert len(source)==37
for n,h in source.items():assert H(B/'repo'/n)==h
assert source['programs/pump/src/admin_cto.rs']=='5499f2b14a7ad21ce1a4e5144882230d7bb668fce24fb735803fc78285f0f3a3'
candidate=B/'build-01/artifacts/pump_recovered.so';symbols=B/'build-01/target/sbf-solana-solana/release/pump_recovered.so'
expected='6e0c9002d09e0cee6cc738b3a9e0983a8d0cd89374fa2cc7c41fa45910515b9e';assert H(candidate)==expected and H(symbols)=='f09ac5696038d7ee9a2d28767b02cbae5b5504a56086d8baf4019f316b8a0c86'
receipt=J(R/'receipt.json');exit=J(R/'exit.json');launch=J(R/'launch.json')
assert launch=={k:exit[k]for k in launch}
assert exit['returncode']==0 and exit['passed']is True and exit['receipt_valid']is True and exit['inputs_unchanged']is True
assert exit['candidate_sha256']==receipt['candidate_sha256']==expected
assert receipt['original_sha256']=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
assert exit['new_cases']==exit['new_fixtures']==0 and exit['case_assertions_unchanged']is True and exit['source_selection_changed']is False and exit['full_byte_equality']is False
for n in ['stdout.log','stderr.log','receipt.json']:assert H(R/n)==exit[n.replace('.','_')+'_sha256']
assert exit['command']==[str(W.parent/'validation-venv/bin/python'),'-B',str(P/'repo/scripts/pump_admin_cto_differential.py'),'--candidate',str(candidate),'--output',str(R/'receipt.json')]
expected_provenance={str(P/'repo'/n):h for n,h in inputs.items()if n!='research/imported-lab/analysis/pump_fun/config-snapshot.json'};expected_provenance[str(candidate)]=expected
assert receipt['provenance']==expected_provenance
assert receipt['case_count']==exit['case_count']==len(receipt['cases'])==363 and receipt['mismatches']==exit['mismatches']==[]
oldpkg=W/'pr8-review/repro/pump/cto-wallet-composition-build-01';assert H(oldpkg/'manifest.json')=='d72e958aab8f069e5d687a59b2195c18ff9f536624370cfa7162e93a8f13fdc4'
oldpath=oldpkg/'preservation-results/receipt.json';assert H(oldpath)==J(oldpkg/'manifest.json')['preservation-results/receipt.json'];old=J(oldpath)
assert [x['case']for x in receipt['cases']]==[x['case']for x in old['cases']]
assert len({x['case']['name']for x in receipt['cases']})==363
pump=Pubkey.from_string(J(P/'repo/evidence/upstream/pump.json')['address']);mint=Pubkey.from_bytes(bytes([61])*32);authority,bump=Pubkey.find_program_address([b'pool-authority',bytes(mint)],pump)
assert str(pump)=='6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
assert "POOL_AUTH=Pubkey.find_program_address([b'pool-authority',bytes(MINT)],PUMP)[0]"in(P/'repo/scripts/fees_donation_create_differential.py').read_text()
fields=['error','before','after','events','inner','return'];rows=[];cases=[];success=0;signatures=0;old_original_differences=[];log_equal_count=0
for index,row in enumerate(receipt['cases']):
 assert row['match']is True and row['original']['case']==row['candidate']['case']==row['case']
 effect={k:row['original'][k]==row['candidate'][k]for k in fields};assert all(effect.values())
 success+=row['original']['error']is None
 oldeq={k:row['original'][k]==old['cases'][index]['original'][k]for k in fields}
 if not all(oldeq.values()):old_original_differences.append({'case':row['case']['name'],'fields':[k for k,v in oldeq.items()if not v]})
 logeq=row['original']['logs']==row['candidate']['logs'];log_equal_count+=logeq
 cases.append({'index':index,'case':row['case'],'six_effects_equal':effect,'original_success':row['original']['error']is None,'raw_logs_equal_observation_only':logeq})
 for side in ['original','candidate']:
  item=row[side];assert item['signatures_verified']is True and item['pool_authority_top_level_signer']is False
  raw=base64.b64decode(item['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert bytes(tx)==raw
  message=bytes(tx.message);required=tx.message.header.num_required_signatures;keys=tx.message.account_keys
  assert required==len(tx.signatures)>0 and authority not in keys[:required]
  checks=tx.verify_with_results();assert len(checks)==required and all(checks)
  individual=[signature.verify(keys[i],message)for i,signature in enumerate(tx.signatures)];assert all(individual)
  assert len(tx.message.instructions)==2 and keys[tx.message.instructions[-1].program_id_index]==pump
  signatures+=required;rows.append({'case_index':index,'case_name':row['case']['name'],'side':side,'transaction_sha256':HB(raw),'message_sha256':HB(message),'required_signatures':required,'signers':[str(k)for k in keys[:required]],'verify_with_results':checks,'individual_signature_verify':individual,'derived_pool_authority':str(authority),'pool_authority_required_signer':False,'last_instruction_program':str(pump)})
assert success==169 and len(rows)==726 and signatures==1448
parent=J(R/'independent-saved-signatures.json');assert parent['status']=='PASS_SAVED_363_ORDINARY_PRESERVATION_ONLY'and parent['case_count']==363 and parent['original_successes']==169 and parent['transaction_count']==726 and parent['signature_fields']==1448
assert len(parent['rows'])==len(rows)
for a,b in zip(parent['rows'],rows,strict=True):assert a['case']==b['case_name']and a['side']==b['side']and a['transaction_sha256']==b['transaction_sha256']and a['signatures']==b['required_signatures']and a['all_verified']is True and a['top_level_pool_authority_signer']is False
terminal=W/'cto-wallet-collector-preservation-terminal-observation.json';t=J(terminal);assert t['controller_actual_terminal_exit']==t['independent_saved_signature_verifier_actual_exit']==0 and t['signature_result_sha256']==H(R/'independent-saved-signatures.json')and t['whole_identity_claim']is False
assert plan_before==snapshot(P)and output_before==snapshot(R)
for n,h in source.items():assert H(B/'repo'/n)==h
proof={'status':'PASS_INDEPENDENT_SAVED_RECEIPT_AND_CRYPTO_ONLY','cases':cases,'transactions':rows,'counts':{'cases':363,'original_successes':success,'transactions':len(rows),'signature_fields':signatures},'candidate_sha256':expected,'symbols_sha256':H(symbols),'source37':source,'plan_snapshot':plan_before,'actual_output_snapshot':output_before,'all15inputs_bound':inputs,'provenance_exact':True,'all_363_ordered_case_definitions_match_authenticated_prior_suite':True,'prior_manifest_sha256':H(oldpkg/'manifest.json'),'prior_receipt_sha256':H(oldpath),'prior_original_effect_differences':old_original_differences,'raw_log_equal_case_count_observation_only':log_equal_count,'logs_required_equal':False,'root_terminal_observation_sha256':H(terminal),'root_terminal_observation_scope':'Recorded root observation authenticated, not independent repetition of its VM/harness run','python':sys.version,'python_executable':sys.executable,'solders_version':importlib.metadata.version('solders'),'vm_target_harness_executions_by_this_audit':0,'shared6093_or_new_changed_path_acceptance':False,'full_byte_identity':False,'frozen_plan_outputs_and_build_source_unchanged':True}
(O/'proof.json').write_text(json.dumps(proof,indent=2)+'\n')
print(json.dumps({k:proof[k]for k in ['status','counts','raw_log_equal_case_count_observation_only','prior_original_effect_differences','vm_target_harness_executions_by_this_audit','frozen_plan_outputs_and_build_source_unchanged']},indent=2))
