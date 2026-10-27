"""Fresh initializer comparison through the genuine original Pump CPI signer."""
from pathlib import Path
import sys,json,gzip,base64,hashlib,re
W=Path(__file__).resolve().parent;ROOT=W.parents[1];sys.path.insert(0,str(ROOT/'scripts'))
import pump_create_mayhem_differential as h
from solders.litesvm import LiteSVM
send=LiteSVM.send_transaction;txs=[]
def snap(vm,keys):
    out={}
    for key in sorted(set(keys),key=str):
        a=vm.get_account(key)
        if a and a.executable:continue
        out[str(key)]=None if a is None else {'lamports':a.lamports,'owner':str(a.owner),'data_hex':bytes(a.data).hex(),'rent_epoch':a.rent_epoch}
    return out
def wrapped(vm,tx):
    valid=tx.verify_with_results();assert valid and all(valid)
    raw=bytes(tx);before=snap(vm,tx.message.account_keys);result=send(vm,tx)
    assert bytes(tx)==raw
    txs.append({'transaction_base64':base64.b64encode(raw).decode(),'signature_verification':valid,'before':before,'after':snap(vm,tx.message.account_keys)})
    return result
LiteSVM.send_transaction=wrapped
def clean(x):
    if isinstance(x,dict):return{k:clean(v)for k,v in x.items()}
    if isinstance(x,list):return[clean(v)for v in x if not(isinstance(v,str)and re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',v))]
    if isinstance(x,str):return re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',re.sub(r'(?<=panicked at )[^ ]+:[0-9]+:[0-9]+','<source>',x))
    return x
candidate=W/'build/candidate.so';rows=[]
# The inherited creator case does not wire its creator field into the payload;
# exclude it explicitly rather than claim coverage from its label.
cases=[x for x in h.cases()if 'creator'not in x]
for case in cases:
    sides=[];receipts=[]
    for binary in [h.ORIGINAL_MAYHEM,candidate]:
        start=len(txs);sides.append(h.run(case,h.ORIGINAL_PUMP,binary));receipts.append(txs[start:])
    assert len(receipts[0])==len(receipts[1])
    for x,y in zip(*receipts):assert x['transaction_base64']==y['transaction_base64']and x['before']==y['before']
    diff=[k for k in sides[0]if clean(sides[0][k])!=clean(sides[1][k])]
    for x,y in zip(*receipts):
        if x['after']!=y['after']:diff.append('full_after_snapshot')
    rows.append({'case':case,'original':sides[0],'candidate':sides[1],'differences':sorted(set(diff)),'transactions_per_side':len(receipts[0])})
    print(case['case'],rows[-1]['differences'],flush=True)
success=[x for x in rows if x['candidate']['error']is None and x['case'].get('is_mayhem_mode',True)]
result={'scope':__doc__,'candidate_sha256':hashlib.sha256(candidate.read_bytes()).hexdigest(),'original_mayhem_sha256':hashlib.sha256(h.ORIGINAL_MAYHEM.read_bytes()).hexdigest(),'pump_is_original_on_both_sides':True,'case_count':len(rows),'success_cases':len(success),'mismatches':[i for i,x in enumerate(rows)if x['differences']],'cases':rows,'signature_count':sum(len(t['signature_verification'])for t in txs),'transaction_count':len(txs),'excluded_case':'creator argument label is not wired by inherited helper'}
(W/'initializer.json').write_text(json.dumps(result,indent=2)+'\n');(W/'initializer-transactions.json.gz').write_bytes(gzip.compress(json.dumps({'transactions':txs}).encode(),mtime=0));print(json.dumps({k:result[k]for k in ['case_count','success_cases','signature_count','transaction_count','mismatches']},indent=2))
assert success and not result['mismatches']
