#!/usr/bin/env python3
"""Validate complete trade/route effects and precisely mapped diagnostic witnesses."""
import argparse
import base64
import gzip
import hashlib
import json
from pathlib import Path
import re
import struct
import sys

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
ORIGINAL='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'

def load(path):
    path=Path(path)
    if not path.exists() and path.suffix=='.json':path=path.with_suffix('.json.gz')
    raw=path.read_bytes();return json.loads(gzip.decompress(raw) if str(path).endswith('.gz') else raw)
def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def require(value,message):
    if not value:raise ValueError(message)

def validate(runtime,candidate,source,build_record):
    record=load(build_record);candidate_sha=sha(candidate)
    require(record['returncode']==0 and record['source_unchanged'] and record['source_sha256']==record['source_after_sha256'],'failed/changed build')
    require(record['comparison']['candidate_sha256']==candidate_sha and len(record['source_sha256'])==30,'wrong build identity')
    for name,value in record['source_sha256'].items():
        require(name.count('programs/pump-amm/')==1,'bad source path')
        relative='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]
        require('..' not in Path(relative).parts and sha(source/relative)==value,'source changed')
    maps=load(HERE/'source-sites.json');roster=load(HERE/'roster.json')
    from solders.transaction import Transaction
    results={}
    for suite,count in [('trade_v2',870),('multi_hop',735)]:
        receipt_path=runtime/(suite+'.json');receipt=load(receipt_path)
        rows=receipt['cases'];observations=load(runtime/(suite+'-transactions.json.gz'))
        require(receipt['candidate_sha256']==candidate_sha and receipt['original_sha256']==ORIGINAL,'wrong receipt binaries')
        require(receipt['case_count']==len(rows)==count and receipt['mismatches']==[],'incomplete/failed corpus')
        require(observations['observer_sha256']==sha(HERE/'observe_suite.py'),'changed observer')
        require(observations['script_sha256']==sha(ROOT/('scripts/pump_amm_'+suite+'_differential.py')),'changed producer')
        if suite=='trade_v2':require(receipt['script_sha256']==observations['script_sha256'],'trade producer mismatch')
        require(observations['transaction_count']==len(observations['transactions'])==2*count,'wrong transaction coverage')
        signatures=0;accepted=[];residual=[]
        def normalized(logs):
            out=[]
            for line in logs:
                if re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',line):continue
                for original,new in maps[suite].items():
                    if line==original:line='<origin:'+original+'>'
                    else:
                        for location in new:
                            if line==location:line='<origin:'+original+'>';break
                out.append(line)
            return out
        for i,row in enumerate(rows):
            pair=observations['transactions'][2*i:2*i+2]
            require([r['amm_program_sha256'] for r in pair]==[ORIGINAL,candidate_sha],'wrong pair ordering')
            fields=({'error','logs','inner','states','events'} if suite=='trade_v2' else {'error','logs','events','inner','return_data','before','after','transaction_base64'})
            require(set(row['original'])==set(row['candidate'])==fields,'incomplete effect schema')
            require(all(row['original'][key]==row['candidate'][key] for key in fields-{'logs'}),'unmatched effects at '+suite+':'+str(i))
            for side,observation in zip(['original','candidate'],pair):
                encoded=base64.b64decode(observation['transaction_base64'],validate=True);tx=Transaction.from_bytes(encoded)
                require(bytes(tx)==encoded and all(tx.verify_with_results()) and sha_bytes(encoded)==observation['transaction_sha256'],'invalid raw signature')
                require(len(tx.signatures)==observation['signature_count'],'signature count changed');signatures+=len(tx.signatures)
                require(observation['logs']==row[side]['logs'] and observation['error']==row[side]['error'],'observation/receipt mismatch')
                keys={str(k) for k in tx.message.account_keys}
                expected_keys=keys-set(observation['executable_states'])
                require(set(observation['before'])==set(observation['after'])==expected_keys,'bad account routing')
                for state in [*observation['before'].values(),*observation['after'].values()]:
                    require(state is None or set(state)=={'owner','lamports','data_hex'},'incomplete observed account')
                result=row[side]
                if suite=='multi_hop':
                    require(result['before']==observation['before'] and result['after']==observation['after'] and result['transaction_base64']==observation['transaction_base64'],'route snapshot differs')
                else:
                    require(bool(result['states']),'missing trade states')
                    for key,state in result['states'].items():
                        require(set(state)=={'data_hex','lamports','owner','token_delta'},'incomplete trade state')
                        if key in observation['after']:
                            actual=observation['after'][key] or {'data_hex':None,'lamports':0,'owner':None}
                            require(all(state[name]==actual[name] for name in actual),'trade state differs from observation')
                        else:
                            actual=observation['executable_states'][key]
                            require(state['owner']==actual['owner'] and state['lamports']==actual['lamports'] and sha_bytes(bytes.fromhex(state['data_hex']))==actual['data_sha256'],'executable trade state differs')
            a,b=pair
            if i in roster[suite]['rows']:
                require(a['transaction_base64']==b['transaction_base64'] and a['before']==b['before'],'target input differs')
                require(a['after']==b['after'] and a['error']==b['error'],'target effects differ')
                require(normalized(a['logs'])==normalized(b['logs']),'target full logs differ at '+suite+':'+str(i))
                accepted.append(i)
            elif normalized(a['logs'])!=normalized(b['logs']):residual.append(i)
        require(accepted==roster[suite]['rows'],'missing targeted witnesses')
        results[suite]={'cases':count,'targeted_full_log_cases':len(accepted),'verified_signature_fields':signatures,'other_unmatched_log_rows':residual}
    return results

def sha_bytes(data):return hashlib.sha256(data).hexdigest()

def main():
    p=argparse.ArgumentParser();p.add_argument('--runtime',type=Path,required=True);p.add_argument('--candidate',type=Path,required=True);p.add_argument('--source',type=Path,required=True);p.add_argument('--build-record',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
    require(not a.output.exists(),'output exists')
    result=validate(a.runtime,a.candidate,a.source,a.build_record);a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:{f:v for f,v in r.items() if f!='other_unmatched_log_rows'} for k,r in result.items()}))

if __name__=='__main__':main()
