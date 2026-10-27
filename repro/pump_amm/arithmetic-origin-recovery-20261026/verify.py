#!/usr/bin/env python3
"""Require complete trade and route logs, allowing only reviewed coordinates."""
import argparse
import importlib.util
import json
from pathlib import Path

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
spec=importlib.util.spec_from_file_location('route_origin_base',ROOT/'repro/pump_amm/v2-route-diagnostics-20261026/verify.py')
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)

def verify(runtime,candidate,source,record):
    summary=base.validate(runtime,candidate,source,record)
    mappings=base.load(HERE/'coordinate-map.json');result={}
    for suite in ('trade_v2','multi_hop'):
        receipt=base.load(runtime/(suite+'.json'));count=0
        for i,row in enumerate(receipt['cases']):
            original=list(row['original']['logs']);rebuilt=list(row['candidate']['logs'])
            original=[x for x in original if not base.re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',x)]
            rebuilt=[x for x in rebuilt if not base.re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',x)]
            m=mappings[suite].get(str(i))
            if m:
                base.require(original.count(m['original'])==1,'original error changed')
                base.require(rebuilt.count(m['expected'])==1,'expected reconstructed error absent at '+suite+':'+str(i))
                original[original.index(m['original'])]='<reviewed-coordinate>'
                rebuilt[rebuilt.index(m['expected'])]='<reviewed-coordinate>'
            base.require(original==rebuilt,'complete logs differ at '+suite+':'+str(i))
            count+=1
        result[suite]={'full_log_cases':count,'verified_signature_fields':summary[suite]['verified_signature_fields']}
    return {'status':'passed','suites':result,'scope':'All1605 complete logs/effects; only compute consumption and exact reviewed coordinates differ.'}

def main():
    p=argparse.ArgumentParser()
    for k in ('runtime','candidate','source','build-record','output'):p.add_argument('--'+k,type=Path,required=True)
    a=p.parse_args();base.require(not a.output.exists(),'output exists')
    result=verify(a.runtime,a.candidate,a.source,a.build_record);a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))

if __name__=='__main__':main()
