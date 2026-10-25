#!/usr/bin/env python3
"""Verify retained failure and uncompiled repair proposal; execute no transaction."""
import argparse,base64,difflib,hashlib,importlib.util,json,re,struct
from pathlib import Path
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def mod(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify(runtime=False):
 m=json.loads((P/'manifest.json').read_text());files={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and str(f.relative_to(P))!='manifest.json'};assert files==set(m['files'])
 for n,h in m['files'].items():assert H((P/n).read_bytes())==h,n
 proposal=P/'proposal';assert H((proposal/'manifest.json').read_bytes())=='2ecc00fa48a19065fae6a2e8a43a9ab5ad4fe5de7c514b6fd3cd93faa118012c'
 pv=mod('frozen_proposal_verifier',proposal/'verify.py');pv.verify(runtime=runtime)
 old=mod('independent_receipt_parser',P/'inputs/ordinary-receipt-verifier.py');assert H((P/'inputs/ordinary-receipt-verifier.py').read_bytes())==json.loads((P/'inputs/ordinary12-manifest.json').read_text())['files']['verify.py']
 j=json.loads((P/'run/business-rejection.json').read_text());result=json.loads((P/'run/process-result.json').read_text());launch=json.loads((P/'run/launch.json').read_text())
 assert result['returncode']==1 and result['inputs_unchanged'] and result['report_exists']
 assert launch['argv']==['work/test-env/bin/python','-B','work/relay-local-validation-proposal/harness_proposal.py','--execute','--repo','.','--candidate','work/relay-local-validation-proposal/artifacts/candidate.so','--group','business_rejection','--output','work/relay-first-rejection-run/business-rejection.json']
 for n,h in launch['input_sha256'].items():assert H((proposal/n.removeprefix('work/relay-local-validation-proposal/')).read_bytes())==h
 assert j['candidate_sha256']=='4954fdc437beed0f73e00d25f1df656ce7fdf0279f8f9bb8e70ca0bced4b53dd' and j['original_sha256']=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
 assert j['harness_sha256']==H((proposal/'harness_proposal.py').read_bytes()) and j['proposal_manifest_sha256']==H((proposal/'manifest.json').read_bytes())
 assert j['normal_signature_blockhash_history_checks'] and not j['historical_transactions_rewritten']
 assert j['runtime_sha256_map']==json.loads((proposal/'loader-results.json').read_text())['runtime_files']
 assert j['group']=='business_rejection' and j['passed']==0 and j['case_count']==len(j['cases'])==1 and not j['all_requested_completed']
 row=j['cases'][0];f=next(x for x in json.loads((proposal/'fixture-blueprints.json').read_text()) if x['case']['name']=='donation_message_too_long');assert row['case']==f['case'] and row['fixture']==f['fixture'] and row['mismatches']==['logs']
 assert row['original']['transaction_base64']==row['candidate']['transaction_base64'];raw=base64.b64decode(row['original']['transaction_base64']);tx=old.parse(raw);keys=list(map(old.b58,tx['keys']))
 assert old.b58(tx['blockhash'])==json.loads((proposal/'loader-results.json').read_text())['results'][0]['latest_blockhash']
 assert keys[0]==f['fee_payer'] and set(keys[:tx['required']])==set(f['required_test_owned_signers']) and tx['required']==2
 assert len(tx['instructions'])==2;budget,call=tx['instructions'];assert keys[budget[0]]=='ComputeBudget111111111111111111111111111111' and budget[2]==b'\2'+(1400000).to_bytes(4,'little') and not budget[1]
 assert keys[call[0]]==old.RELAY and call[2].hex()==f['fixture']['instruction_hex'] and [keys[x] for x in call[1]]==[x['pubkey'] for x in f['fixture']['instruction_accounts']]
 privileges={x['pubkey']:(x['signer'],x['writable']) for x in f['fixture']['instruction_accounts']};privileges[f['fee_payer']]=(True,True);privileges[old.RELAY]=(False,False);privileges[keys[budget[0]]]=(False,False)
 assert set(keys)==set(privileges)
 for index,k in enumerate(keys):
  signer=index<tx['required'];writable=index<tx['required']-tx['readonly_signers'] if signer else index<len(keys)-tx['readonly_unsigned'];assert (signer,writable)==privileges[k]
 if runtime:
  from solders.pubkey import Pubkey
  from solders.signature import Signature
  assert all(Signature.from_bytes(s).verify(Pubkey.from_bytes(k),tx['message']) for s,k in zip(tx['signatures'],tx['keys']))
 error='TransactionErrorInstructionError((1, Tagged(InstructionErrorCustom(6009))))'
 for side in ['original','candidate']:
  r=row[side];assert r['error']==error and r['signature_verification']==[True,True] and r['metadata']['signature']==old.b58(tx['signatures'][0])
  for field in ['logs','inner_instructions','return_data']:assert r[field]==r['metadata'][field]
  assert set(r['before'])==set(r['after'])==set(f['fixture']['accounts'])|set(keys)
  for k in r['before']:
   if k!=keys[0]:assert r['before'][k]==r['after'][k],('rollback',k)
   else:
    before=dict(r['before'][k]);after=dict(r['after'][k]);assert before.pop('lamports')-after.pop('lamports')==10000;assert before==after
  for k,x in f['fixture']['accounts'].items():
   y=r['before'][k]
   if y is None:assert x['lamports']==0 and x['data_base64']=='' and x['owner']==old.SYSTEM and not x['executable']
   else:assert all(y[field]==x[field] for field in x)
 a,b=row['original'],row['candidate'];assert a['error']==b['error'] and a['inner_instructions']==b['inner_instructions'] and a['return_data']==b['return_data']
 logs=lambda x:[s for s in x if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)]
 left,right=logs(a['logs']),logs(b['logs']);assert len(left)==len(right)
 delta=[(x,y) for x,y in zip(left,right) if x!=y]
 assert delta==[('Program log: AnchorError thrown in programs/contracts/src/tools/checks.rs:55. Error Code: InvalidMessageLength. Error Number: 6009. Error Message: Invalid message length.','Program log: AnchorError occurred. Error Code: InvalidMessageLength. Error Number: 6009. Error Message: Invalid message length.')]
 for stage in ['before','after']:
  for k in a[stage]:
   if k!=old.RELAY:assert a[stage][k]==b[stage][k]
   else:
    assert a[stage][k]['data_sha256']=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563' and b[stage][k]['data_sha256']=='4954fdc437beed0f73e00d25f1df656ce7fdf0279f8f9bb8e70ca0bced4b53dd'
    assert all(a[stage][k][x]==b[stage][k][x] for x in ['owner','executable','rent_epoch'])
 original=(proposal/'artifacts/original.so').read_bytes();at=pv.address_reader(original)
 for w in json.loads((P/'evidence/original-windows.json').read_text()):
  assert H(at(w['start'],w['bytes']))==w['raw_sha256']
  for c in w['direct_calls']:assert c['target']==c['pc']+8+8*struct.unpack_from('<i',at(c['pc'],8),4)[0]
 points=json.loads((P/'evidence/diagnostic-points.json').read_text())
 for point in points['points']:assert at(point['pc'],len(bytes.fromhex(point['raw_hex']))).hex()==point['raw_hex']
 assert at(755233,38).decode()=='programs/contracts/src/tools/checks.rs'
 assert struct.unpack_from('<i',at(114384,8),4)[0]==55 and struct.unpack_from('<i',at(114368,8),4)[0]==6009
 assert struct.unpack_from('<i',at(114400,8),4)[0]==0 and struct.unpack_from('<i',at(114392,8),4)[0]==38
 assert at(114048,8).hex()=='a503330000010000'
 changed=[];patch=[];source_map=json.loads((P/'source-proposal-sha256.json').read_text())
 for name,h in source_map.items():
  f=P/'source-proposal'/name;assert H(f.read_bytes())==h;before=proposal/'build04-source'/name
  if before.read_bytes()!=f.read_bytes():changed.append(name);patch.extend(difflib.unified_diff(before.read_text().splitlines(True),f.read_text().splitlines(True),fromfile='a/'+name,tofile='b/'+name))
 assert len(source_map)==21 and sorted(changed)==['src/error_report.rs','src/handlers.rs','src/lib.rs'];assert ''.join(patch)==(P/'source-origin-proposal.patch').read_text()
 source=(P/'source-proposal/src/handlers.rs').read_text();assert 'require_at(a.message.len()<256,6009,file!(),line!())?;' in source
 for f in (P/'source-proposal').rglob('*.rs'):assert 'programs/contracts/src/tools/checks.rs' not in f.read_text()
 assert 'Error::LocatedCode{code,..}=>ProgramError::Custom(code)' in (P/'source-proposal/src/error_report.rs').read_text()
 return {'artifact_verified':True,'runtime_comparison_passed':False,'attempted_cases':1,'comparisons_passed':0,'not_run_cases':2,'transaction_submissions':2,'unique_transactions':1,'encoded_signatures':4,'runtime_signature_reverification':runtime,'exact_mismatch':['source-origin log'],'source_proposal_compiled':False,'new_target_executions':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--runtime',action='store_true');a=a.parse_args();print(json.dumps(verify(a.runtime),indent=2))
