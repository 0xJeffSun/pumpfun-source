#!/usr/bin/env python3
"""Compare all existing observations with the verified pre-structure checkpoint."""
import argparse
import base64
import difflib
import gzip
import hashlib
import json
from pathlib import Path
import re
from solders.transaction import Transaction

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
BASE=ROOT/'repro/pump_amm/cpi-return-balance-recovery-20261026/results'
PRIOR='51c051d22380001db39963ad697050622f172162727fe477d0d3faf587e5275f'

def load(path):
    path=Path(path)
    if not path.exists() and path.suffix=='.json':path=path.with_suffix('.json.gz')
    raw=path.read_bytes();return json.loads(gzip.decompress(raw)if path.suffix=='.gz'else raw)
def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def require(ok,message):
    if not ok:raise ValueError(message)
def without_logs(value):
    if isinstance(value,dict):return {k:without_logs(v)for k,v in value.items()if k!='logs'}
    if isinstance(value,list):return [without_logs(v)for v in value]
    return value
def log_fields(value,path=()):
    if isinstance(value,dict):
        result={}
        for key,item in value.items():
            if key=='logs':result[path+(key,)]=item
            else:result.update(log_fields(item,path+(key,)))
        return result
    if isinstance(value,list):
        result={}
        for i,item in enumerate(value):result.update(log_fields(item,path+(i,)))
        return result
    return {}
def compare_logs(now,old,source=None):
    a,b=log_fields(now),log_fields(old)
    require(a.keys()==b.keys(),'log coverage changed')
    return all(compute_removed(a[k])==(adjusted(b[k],source)if source else compute_removed(b[k]))for k in a)
def compute_removed(logs):return [s for s in logs if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',s)]

def source_line(file,old_line,logs,source):
    relative=Path('programs/pump-amm')/file
    old=(BASE/'source'/relative).read_text().splitlines();new=(source/relative).read_text().splitlines()
    text=old[old_line-1]
    if file=='src/legacy_buy.rs' and 'require_gt!(if exact' in text:
        exact='Program log: Instruction: BuyExactQuoteIn' in logs
        name='ZeroBaseAmount' if 'ZeroBaseAmount' in text else 'ZeroQuoteAmount'
        operand=('limit'if exact else'amount')if name=='ZeroBaseAmount' else('amount'if exact else'limit')
        needle=f'require_gt!({operand}, 0, PumpAmmError::{name});'
        matches=[i+1 for i,s in enumerate(new)if needle in s]
        require(len(matches)==1,'zero guard source ambiguity');return matches[0]
    for kind,a,b,c,d in difflib.SequenceMatcher(None,old,new,autojunk=False).get_opcodes():
        if a<=old_line-1<b:
            if kind=='equal' or b-a==d-c:return c+old_line-a
            raise ValueError('unmapped source change '+file+':'+str(old_line))
    raise ValueError('source line out of range')

def adjusted(logs,source):
    result=[]
    for line in compute_removed(logs):
        m=re.search(r'AnchorError thrown in (src/[^:]+):(\d+)\.',line)
        if not m:m=re.search(r'panicked at (src/[^:]+):(\d+):\d+:',line)
        if m:
            mapped=source_line(m[1],int(m[2]),logs,source)
            line=line[:m.start(2)]+str(mapped)+line[m.end(2):]
        result.append(line)
    return result

def verify(runtime,candidate,source,record_path):
    record=load(record_path);identity=sha(candidate)
    require(record['returncode']==0 and record['source_unchanged'] and record['source_sha256']==record['source_after_sha256'],'failed or changed build')
    require(record['comparison']['candidate_sha256']==identity and len(record['source_sha256'])==31,'incomplete build identity')
    for name,value in record['source_sha256'].items():
        require(name.count('programs/pump-amm/')==1,'bad source path')
        relative='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]
        require('..' not in Path(relative).parts and sha(source/relative)==value,'compiled source changed')
    results=[];total_cases=total_transactions=total_signatures=0
    for run in load(runtime/'progress.json'):
        suite=run['suite'];current=load(runtime/(suite+'.json'));prior=load(BASE/'runtime'/(suite+'.json'))
        require(current['candidate_sha256']==identity and prior['candidate_sha256']==PRIOR,'wrong candidate pair')
        require(current['mismatches']==[] and run['returncode']==0,'failed suite')
        require(current['case_count']==len(current['cases'])==len(prior['cases'])==run['case_count'],'incomplete suite')
        for index,(now,old) in enumerate(zip(current['cases'],prior['cases'])):
            require({k:v for k,v in now.items()if k not in ('original','candidate')}=={k:v for k,v in old.items()if k not in ('original','candidate')},'case inputs changed')
            require(without_logs(now['original'])==without_logs(old['original']),'original effects changed '+suite+':'+str(index))
            require(compare_logs(now['original'],old['original']),'original logs changed')
            require(without_logs(now['candidate'])==without_logs(old['candidate']),'candidate effects changed '+suite+':'+str(index))
            require(compare_logs(now['candidate'],old['candidate'],source),'candidate logs changed '+suite+':'+str(index))
        sidecar=load(runtime/(suite+'-transactions.json.gz'));require(sidecar['transaction_count']==len(sidecar['transactions'])==run['transactions'],'transaction coverage differs')
        signature_count=0
        for row in sidecar['transactions']:
            raw=base64.b64decode(row['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw)
            require(bytes(tx)==raw and all(tx.verify_with_results()) and len(tx.signatures)==row['signature_count'],'invalid observed transaction')
            require(hashlib.sha256(raw).hexdigest()==row['transaction_sha256'],'transaction hash differs');signature_count+=len(tx.signatures)
        require(signature_count==run['signatures'],'signature coverage differs')
        total_cases+=run['case_count'];total_transactions+=run['transactions'];total_signatures+=signature_count
        results.append({'suite':suite,'cases':run['case_count'],'observed_log_fields':sum(len(log_fields(c['candidate']))for c in current['cases']),'logs_match_previous_after_reviewed_coordinates':True})
    require((len(results),total_cases,total_transactions,total_signatures)==(25,17462,35074,35418),'incomplete complete-corpus comparison')
    return {'candidate_sha256':identity,'suites':results,'cases':total_cases,'transactions':total_transactions,'signature_fields':total_signatures,'scope':'Full25 corpus unchanged against prior verified source behavior; source coordinates mapped through exact source diff, compute costs excluded. Existing original-equivalence limits remain.'}

def main():
    p=argparse.ArgumentParser()
    for name in ('runtime','candidate','source','build-record','output'):p.add_argument('--'+name,type=Path,required=True)
    a=p.parse_args();require(not a.output.exists(),'output exists');result=verify(a.runtime,a.candidate,a.source,a.build_record);a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items()if k!='suites'}))

if __name__=='__main__':main()
