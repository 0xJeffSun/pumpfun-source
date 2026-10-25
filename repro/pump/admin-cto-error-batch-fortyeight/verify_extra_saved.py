"""Saved nested/route checks; never imports or creates a VM or signs a transaction."""
from pathlib import Path
import ast,base64,gzip,hashlib,importlib.util,json,sys,types
from solders.pubkey import Pubkey
from solders.transaction import Transaction,VersionedTransaction
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def run():
 f=P/'runtime-layer/nested-harness';s=importlib.util.spec_from_file_location('saved_nested_common',f/'proposed/proposal_common.py');common=importlib.util.module_from_spec(s);s.loader.exec_module(common)
 ids=read(P/'historical-nested-identities.json');idl=read(P/'pump-idl.json');h=types.SimpleNamespace(Pubkey=Pubkey,IDL=idl)
 for k,v in ids['public_keys'].items():
  key=Pubkey.from_string(v);setattr(h,k,types.SimpleNamespace(pubkey=lambda key=key:key)if k in ['USER','MINT','OTHER']else key)
 ns={'h':h,'struct':__import__('struct'),'event_bytes':common.event_bytes,'decode_event':common.decode_event,'ata':lambda a,m:Pubkey.find_program_address([bytes(a),bytes(h.TOKEN),bytes(m)],h.ATA)[0]}
 tree=ast.parse((f/'proposed/pump_nested_general_differential.py').read_text());fn=next(n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='assertions');exec(compile(ast.Module(body=[fn],type_ignores=[]),'<unchanged saved assertions>','exec'),ns)
 expected=read(f/'cases.json')['cases'];counts={}
 for name in ['nested-original','nested-differential']:
  j=read(P/(name+'.json.gz'));assert j['complete']and j['inputs_unchanged']and not j['failures'];assert j['case_count']==len(j['cases'])==16
  count=0
  for case,row in zip(expected,j['cases']):
   assert row['case']==case and not row['mismatches']and not row['original_assertion_failures']and not row['candidate_assertion_failures']
   for side in ['original','candidate']:
    v=row[side]
    if v is None:assert name=='nested-original'and side=='candidate';continue
    assert not ns['assertions'](case,v,row['layout']);assert v['fresh_vm']and v['verified_signature_count']==2
    raw=base64.b64decode(v['transaction_base64']);tx=Transaction.from_bytes(raw);assert len(raw)<=1232 and len(tx.signatures)==2 and all(tx.verify_with_results())
    assert set(map(str,tx.message.account_keys[:2]))=={ids['public_keys']['USER'],ids['public_keys']['MINT']};assert H(raw)==v['transaction_sha256'];count+=2
    journal=read(P/(name+'.json.gz.case-journal')/(case['id']+'-'+side+'.json'));assert journal['stage']=='complete'and journal['result']==v and journal['fixture']==row['fixture']
   if row['candidate']:
    assert row['original']['transaction_base64']==row['candidate']['transaction_base64']
    for k in ['before','after','error','events','inner','return']:assert row['original'][k]==row['candidate'][k]
    assert common.logs_for_comparison(row['original']['logs'])==common.logs_for_comparison(row['candidate']['logs'])
    if case['id']=='depth-limit-rollback':
     for side in ['original','candidate']:assert row[side]['logs'].count('Program log: Left: 1')==row[side]['logs'].count('Program log: Right: 2')==1
  assert count==j['verified_signatures']==(32 if name=='nested-original'else 64);counts[name]={'cases':16,'signatures':count}
 original=read(P/'route-original/summary.json');candidate=read(P/'route-candidate/summary.json')
 assert original['all_pass']and candidate['all_pass']and original['case_count']==candidate['case_count']==16
 fields=['error','normalized_logs','events','inner','return_data','before','after','pump_calls','token_calls'];signatures=0
 for left,right in zip(original['rows'],candidate['rows']):
  assert left['case']==right['case']and not left['mismatches']and not right['mismatches']
  a=read(P/'route-original'/left['file']);b=read(P/'route-candidate'/right['file'])
  assert a['case']==b['case']and all(a[k]==b[k]for k in fields)
  for row in [a,b]:
   assert row['all_assertions_pass']and all(row['assertions'].values())and row['fresh_vm']and row['default_signature_blockhash_history']and row['verified_signature_count']==1
   raw=base64.b64decode(row['transaction_base64']);tx=VersionedTransaction.from_bytes(raw);assert len(raw)<=1232 and H(raw)==row['transaction_sha256']and all(tx.verify_with_results())and len(tx.signatures)==1;signatures+=1
  assert a['transaction_base64']==b['transaction_base64']
 assert signatures==32;counts['route']={'cases':16,'signatures':signatures}
 return counts
if __name__=='__main__':print(json.dumps(run(),indent=2))
