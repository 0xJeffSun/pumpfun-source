#!/usr/bin/env python3
"""Exhaustive invalid-byte runtime checks for the five optional-bool instruction positions."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import sys
ROOT=Path(__file__).resolve().parents[3]
sys.path.insert(0,str(ROOT/'scripts'))
from pump_amm_create_differential import create
from pump_amm_legacy_buy_differential import legacy_buy

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def cleaned(value):
    return {k:([x for x in v if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',x)]if k=='logs'else v)for k,v in value.items()if k!='transaction_base64'}
def main():
    p=argparse.ArgumentParser()
    for n in ('candidate','source','build-record','output'):p.add_argument('--'+n,type=Path,required=True)
    a=p.parse_args();assert not a.output.exists();record=json.loads(a.build_record.read_text());identity=sha(a.candidate)
    assert record['returncode']==0 and record['source_unchanged'] and record['source_sha256']==record['source_after_sha256'] and record['comparison']['candidate_sha256']==identity and len(record['source_sha256'])==31
    for name,digest in record['source_sha256'].items():assert sha(a.source/('programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]))==digest
    cases=[]
    for value in range(2,256):
        for position in ('create_cashback','create_edit_fee','create_holder','buy','buy_exact_quote_in'):
            def run(candidate):
                if position.startswith('create_'):
                    prefix={'create_cashback':b'','create_edit_fee':bytes(9),'create_holder':bytes(10)}[position]
                    return create(optional=prefix+bytes([value]),candidate=candidate)
                return legacy_buy(name=position,track=bytes([value]),candidate=candidate)
            original=run(ROOT/'evidence/original/pump_amm/deployed.so');current=run(a.candidate)
            assert 'InstructionDidNotDeserialize' in '\n'.join(original['logs']) and original['error'] is not None
            assert cleaned(original)==cleaned(current),(position,value)
            cases.append({'position':position,'byte':value,'original':original,'candidate':current})
    assert len(cases)==1270
    result={'status':'passed','candidate_sha256':identity,'original_sha256':sha(ROOT/'evidence/original/pump_amm/deployed.so'),'build_record_sha256':sha(a.build_record),'probe_sha256':sha(Path(__file__)),'cases':cases,'case_count':len(cases),'scope':'All invalid byte values2..255 at five optional-bool positions; full recorded output equality except compute lines. No direct runtime visibility of inner std::io message is claimed.'}
    a.output.write_text(json.dumps(result,separators=(',',':'))+'\n');print(json.dumps({k:v for k,v in result.items()if k!='cases'}))
if __name__=='__main__':main()
