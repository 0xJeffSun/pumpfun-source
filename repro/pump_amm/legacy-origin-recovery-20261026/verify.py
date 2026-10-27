#!/usr/bin/env python3
"""Verify all legacy observations with exact originating-error mappings."""
import argparse
import base64
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
from solders.transaction import Transaction

P=Path(__file__).resolve().parent
ROOT=P.parents[2]
BASE=ROOT/'repro/pump_amm/v2-route-diagnostics-20261026/results/legacy'
PRIOR='dac4b7c26dfe8bad24d31d17fa40ca12fd3fc1e13bcab7f57ea67e91318262ca'
ORIGINAL='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
spec=importlib.util.spec_from_file_location('prior_legacy_check',ROOT/'repro/pump_amm/legacy-trade-diagnostics-20261026/verify.py')
prior=importlib.util.module_from_spec(spec);spec.loader.exec_module(prior)
prior.P=P # Reuse the exact mapper against this package's pinned source baseline.
FIELDS=prior.FIELDS
sha,require,read,strip_compute=prior.sha,prior.require,prior.read,prior.strip_compute

def verify(runtime,candidate,source,record_path):
    record=read(record_path)
    require(record['returncode']==0 and record['source_unchanged'] is True and record['source_sha256']==record['source_after_sha256'],'unsuccessful build')
    require(record['comparison']['candidate_sha256']==sha(candidate) and len(record['source_sha256'])==30,'wrong/incomplete build')
    normalized={}
    for name,value in record['source_sha256'].items():
        require(name.count('programs/pump-amm/')==1,'invalid source path')
        relative='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]
        require('..' not in Path(relative).parts and relative not in normalized and sha(source/relative)==value,'source changed/duplicated')
        normalized[relative]=value
    for file in ('legacy_buy.rs','legacy_sell.rs'):
        require((source/'programs/pump-amm/src'/file).read_bytes()==(P/('proposed-'+file)).read_bytes(),'legacy source differs from proposal')
    maps=read(P/'origin-map.json');manifest=read(P/'baseline-manifest.json')
    results=[];signatures=0;fixed=0;owners=0
    for suite,count in [('legacy_buy',1011),('legacy_sell',575)]:
        path=BASE/(suite+'.json.gz');stored=path.read_bytes();entry=manifest[suite]
        require(sha(path)==entry['stored_sha256'] and hashlib.sha256(gzip.decompress(stored)).hexdigest()==entry['raw_sha256'],'baseline receipt changed')
        baseline=read(path);report_path=runtime/(suite+'.json')
        if not report_path.exists():report_path=report_path.with_suffix('.json.gz')
        report=read(report_path)
        require(report['script_sha256']==sha(ROOT/'scripts'/('pump_amm_'+suite+'_differential.py')),'changed runtime producer')
        require(baseline['candidate_sha256']==PRIOR and baseline['original_sha256']==ORIGINAL,'baseline binary changed')
        require(report['candidate_sha256']==sha(candidate) and report['original_sha256']==ORIGINAL,'wrong binary observations')
        require(report['case_count']==len(report['cases'])==count and report['mismatches']==[],'incomplete suite')
        for index,(row,old) in enumerate(zip(report['cases'],baseline['cases'])):
            require(row['case']==old['case'] and row.get('instruction')==old.get('instruction'),'wrong case order')
            a,b=row['original'],row['candidate']
            require(set(a)==set(b)==FIELDS,'incomplete effects')
            for key in FIELDS-{'logs'}:require(a[key]==b[key]==old['original'][key],'changed signed input or non-log effects')
            for result in (a,b):
                raw=base64.b64decode(result['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw)
                require(bytes(tx)==raw and len(tx.signatures)==1 and all(tx.verify_with_results()),'invalid signature');signatures+=1
            original=strip_compute(a['logs']);rebuilt=strip_compute(b['logs'])
            require(original==strip_compute(old['original']['logs']),'original logs changed')
            targets=[header for header,entry in maps[suite].items() if index in entry['rows']]
            if targets:
                require(len(targets)==1,'ambiguous origin map');header=targets[0];mapped=maps[suite][header]['candidate_header']
                require(header in original and mapped in rebuilt,'wrong exact originating site')
                rebuilt=[header if line==mapped else line for line in rebuilt]
                require(original==rebuilt,'other targeted log changed');fixed+=1
            elif suite=='legacy_sell' and index in (262,264):
                tx=Transaction.from_bytes(base64.b64decode(a['transaction_base64']))
                ata=str(tx.message.account_keys[tx.message.instructions[0].accounts[21]])
                owner=a['before'][ata]['owner']
                require(any(f'AnchorError caused by account: {owner}. Error Code: AccountOwnedByWrongProgram.' in line for line in original),'wrong originating owner')
                require(original==rebuilt,'owner account-name origin not preserved');owners+=1
            else:
                x,y,unknown=prior.normalize_pair(a['logs'],b['logs'],old['candidate']['logs'],source)
                require(unknown is None and x==y,'unexpected legacy log difference '+suite+':'+str(index))
        results.append({'suite':suite,'cases':count,'full_log_matches':count,'receipt_sha256':sha(report_path)})
    require(fixed==99 and owners==2,'incomplete error-origin coverage')
    return {'status':'passed','candidate_sha256':sha(candidate),'suites':results,'new_source_origins':fixed,'account_name_origins':owners,'verified_signature_fields':signatures,'scope':'All1586 retained cases; complete logs except compute and explicit exact source/panic coordinates. Not exhaustive contract equivalence.'}

def main():
    p=argparse.ArgumentParser(description=__doc__)
    for name in ('runtime','candidate','source','build-record','output'):p.add_argument('--'+name,type=Path,required=True)
    a=p.parse_args();require(not a.output.exists(),'output exists');result=verify(a.runtime,a.candidate,a.source,a.build_record);a.output.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
if __name__=='__main__':main()
