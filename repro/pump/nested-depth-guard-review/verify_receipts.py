"""Read saved transactions/results only; preserve and require the known parity failure."""
from pathlib import Path
import ast,base64,gzip,hashlib,importlib.util,json,re,sys,types
sys.dont_write_bytecode=True
from solders.pubkey import Pubkey
from solders.transaction import Transaction
P=Path(__file__).resolve().parent
R=P/'retained-focused-01'
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(n):return json.loads((P/n).read_text())
def run():
    s=importlib.util.spec_from_file_location('review_common',R/'execution-harness-v2/proposed/proposal_common.py');common=importlib.util.module_from_spec(s);s.loader.exec_module(common)
    ids=read('saved-identities.json');idl=read('inputs/pump.json')
    h=types.SimpleNamespace(Pubkey=Pubkey,IDL=idl)
    for k,v in ids['public_keys'].items():
        key=Pubkey.from_string(v)
        setattr(h,k,types.SimpleNamespace(pubkey=lambda key=key:key)if k in ['USER','MINT','OTHER']else key)
    ns={'h':h,'bytes':bytes,'struct':__import__('struct'),'event_bytes':common.event_bytes,'decode_event':common.decode_event,
        'ata':lambda authority,mint:Pubkey.find_program_address([bytes(authority),bytes(h.TOKEN),bytes(mint)],h.ATA)[0]}
    tree=ast.parse((R/'execution-harness-v2/proposed/pump_nested_general_differential.py').read_text())
    fn=next(n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='assertions')
    # Execute only the unchanged pure saved-result assertions, never a fixture/VM runner.
    exec(compile(ast.Module(body=[fn],type_ignores=[]),'<retained assertions>','exec'),ns)
    expected=json.loads((R/'execution-harness-v2/cases.json').read_text())['cases']
    total=0;per_run={};receipt_rows=[]
    for name in ['original-acceptance-02','focused-01']:
        j=json.loads(gzip.decompress((R/(name+'.json.gz')).read_bytes()))
        paired=name=='focused-01'
        assert j['complete']and j['inputs_unchanged']and j['case_count']==j['new_unique_cases']==16 and j['baseline_repeats_in_this_runner']==0
        assert len(j['cases'])==16 and j['failures']==(['depth-limit-rollback']if paired else [])
        assert j['candidate_sha256']==(ids['candidate_sha256']if paired else None)
        signatures=0
        for case,row in zip(expected,j['cases']):
            assert row['case']==case and not row['original_assertion_failures']and not row['candidate_assertion_failures']
            want_mismatch=['semantic_logs']if paired and case['id']=='depth-limit-rollback'else []
            assert row['mismatches']==want_mismatch
            for side in ['original','candidate']:
                result=row[side]
                if result is None:assert not paired and side=='candidate';continue
                assert not ns['assertions'](case,result,row['layout']),(case['id'],side)
                assert result['fresh_vm']and result['verified_signature_count']==2
                raw=base64.b64decode(result['transaction_base64']);assert len(raw)<=1232
                tx=Transaction.from_bytes(raw);assert len(tx.signatures)==2 and all(tx.verify_with_results())
                assert set(map(str,tx.message.account_keys[:2]))=={ids['public_keys']['USER'],ids['public_keys']['MINT']}
                assert sha(raw)==result['transaction_sha256']
                calls=[ix for ix in tx.message.instructions if tx.message.account_keys[ix.program_id_index]==h.PROGRAM]
                assert len(calls)==1 and bytes(calls[0].data)[:8]==bytes(next(i['discriminator']for i in idl['instructions']if i['name']=='create_v2'))
                journal=json.loads((R/(name+'.json.gz.case-journal')/(case['id']+'-'+side+'.json')).read_text())
                assert journal['stage']=='complete'and journal['result']==result and journal['fixture']==row['fixture']
                assert journal['transaction_base64']==result['transaction_base64']and journal['serialized_bytes']==len(raw)
                signatures+=2
            if paired:
                a,b=row['original'],row['candidate'];assert a['transaction_base64']==b['transaction_base64']
                for key in ['before','after','error','events','inner','return']:assert a[key]==b[key],(case['id'],key)
                al=common.logs_for_comparison(a['logs']);bl=common.logs_for_comparison(b['logs'])
                if want_mismatch:
                    assert al!=bl
                    extra=['Program log: Left: 1','Program log: Right: 2']
                    assert all(al.count(x)==1 and x not in bl for x in extra)
                    assert [x for x in al if x not in extra]==bl
                else:assert al==bl
            receipt_rows.append({'run':name,'case':case['id'],'mismatches':row['mismatches']})
        assert signatures==j['verified_signatures']==(64 if paired else 32)
        total+=signatures;per_run[name]=signatures
    assert total==96
    return {'saved_evidence_verification':'PASS','focused_differential_result':'FAIL_PRESERVED','unique_case_specs':16,'original_only_signatures':32,'focused_signatures':64,'verified_signatures_total':96,'complete_case_journals':48,'mismatched_case':'depth-limit-rollback','mismatched_field':'semantic_logs','new_transactions':0,'new_builds':0}
if __name__=='__main__':print(json.dumps(run(),sort_keys=True))
