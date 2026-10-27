#!/usr/bin/env python3
"""Strict signed Pump->PumpSwap CTO diagnostics with real PDA-signed CPI."""
import argparse
import base64
import gzip
import hashlib
import json
from pathlib import Path
import re
import sys

P=Path(__file__).resolve().parent
ROOT=P.parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_creator_reassignment_cto_differential as cto
from solders.transaction import Transaction

ORIGINAL_SHA='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
PRIOR_SHA='03554fa0f7e5ffe54ed7a88ce50e07ab3ee62a9f45034432763cd0a2b9d5cf1b'
BASELINE_SOURCE_SHA='1d9dd70a389a046d325a45a2523ae7637451262c4570d32f4f516da4d7de691a'
SAVED_RECEIPT_SHA='e70e491dbbf3c3a4d03a4f81e10f57581feb8ab5063417cb21e0f65a1e90e761'
PRIOR=ROOT/'repro/pump_amm/focused-diagnostics-20261026/results/liquidity'
RECEIPT=PRIOR/'runtime/creator_reassignment_cto.json.gz'
ORIGIN='programs/pump-amm/src/instructions/admin/admin_cto_pool.rs'
INDICES=[0,1,2,3,4,5,12,13,14,58,59,123,124,125,151]
SHAPE={'case','error','before','after','logs','events','inner','return','transaction_base64','pool_authority_top_level_signer','signatures_verified'}
COMPUTE=re.compile(r'^Program [1-9A-HJ-NP-Za-km-z]+ consumed \d+ of \d+ compute units$')
CHANGES=[('require_keys_eq!(pool.creator,ctx.accounts.pool_authority.key(),PumpAmmError::OnlyCanonicalPumpPoolsCanHaveCoinCreator);','require!(pool.creator==ctx.accounts.pool_authority.key(),PumpAmmError::OnlyCanonicalPumpPoolsCanHaveCoinCreator);'),('require_eq!(pool.creator_fees,0,PumpAmmError::CreatorFeesNotSwept);','require!(pool.creator_fees==0,PumpAmmError::CreatorFeesNotSwept);')]
INPUTS=['scripts/pump_amm_creator_reassignment_cto_differential.py','scripts/fees_donation_create_differential.py','scripts/fees_admin_differential.py','scripts/pump_validate_admin.py','scripts/pump_amm_admin_differential.py','evidence/original/pump/deployed.so','evidence/original/pump_fees/deployed.so','evidence/dependencies/spl_token/deployed.so','evidence/dependencies/associated_token/deployed.so']

def require(value,message):
    if not value:raise ValueError(message)
def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def encoded_sha(value):return hashlib.sha256(value).hexdigest()
def saved():
    require(sha(RECEIPT)==SAVED_RECEIPT_SHA,'saved receipt changed')
    report=json.loads(gzip.decompress(RECEIPT.read_bytes()))
    require(report['original_sha256']==ORIGINAL_SHA and report['candidate_sha256']==PRIOR_SHA and len(report['cases'])==159 and report['mismatches']==[],'wrong saved input')
    return report
def patch(raw):
    require(encoded_sha(raw.encode())==BASELINE_SOURCE_SHA,'baseline source changed')
    prefix,body=raw.split('pub fn admin_cto(',1)
    for old,new in CHANGES:
        require(body.count(old)==1,'unexpected source guard');body=body.replace(old,new)
    return prefix+'pub fn admin_cto('+body
def lines(raw):
    tokens={64:'OnlyCanonicalPumpPoolsCanHaveCoinCreator);',77:'require!(!pool.is_holder_reward || is_holder_reward,',121:'require!(pool.creator_fees==0,PumpAmmError::CreatorFeesNotSwept);'}
    result={}
    start=raw.splitlines().index(next(x for x in raw.splitlines() if x.startswith('pub fn admin_cto(')))
    for origin,token in tokens.items():
        found=[i for i,line in enumerate(raw.splitlines(),1) if i>start and token in line]
        require(len(found)==1,'missing/ambiguous source origin');result[origin]=found[0]
    return result
def normalize(logs,mapping):
    out=[]
    for line in logs:
        if COMPUTE.fullmatch(line):continue
        for origin,number in mapping.items():
            for path,n in [(ORIGIN,origin),('src/creator_reassignment.rs',number)]:
                line=line.replace(f'AnchorError thrown in {path}:{n}.',f'AnchorError thrown in <cto:{origin}>.')
        out.append(line)
    return out
def signature(raw):
    binary=base64.b64decode(raw,validate=True);tx=Transaction.from_bytes(binary)
    require(bytes(tx)==binary and len(tx.signatures)==2 and all(tx.verify_with_results()),'invalid signatures')
    require(tx.message.header.num_required_signatures==2,'unexpected signer count')
    for index in range(2):require(tx.message.account_keys[index]!=cto.POOL_AUTH,'PDA incorrectly signs top-level transaction')
    return binary

def validate_build(candidate,source,record):
    require(record['returncode']==0 and record['source_unchanged'] is True,'unsuccessful build')
    require(record.get('candidate_sha256',record.get('comparison',{}).get('candidate_sha256'))==sha(candidate),'build/candidate mismatch')
    require(record['source_sha256']==record['source_after_sha256'] and len(record['source_sha256'])==30,'wrong source manifest')
    source_root=source.resolve().parents[3]
    for name,digest in record['source_sha256'].items():
        marker='programs/pump-amm/';require(name.count(marker)==1,'unexpected input path')
        relative=Path(marker+name.split(marker,1)[1]);require('..' not in relative.parts,'unsafe input path')
        require(sha(source_root/relative)==digest,'compiled input changed')
    require(source.read_text()==patch((P/'baseline-creator-reassignment.rs').read_text()),'creator source change exceeds two guards')

def validate(report,candidate,source,record_path):
    required={'status','expect','original_sha256','prior_sha256','candidate_sha256','source_sha256','probe_sha256','input_sha256','saved_receipt_sha256','build_record','cases'}
    require(set(report) in (required,required|{'validation'}) and report['status']=='completed' and report['expect']=='corrected','receipt incomplete')
    require(report['candidate_sha256']==sha(candidate) and report['source_sha256']==sha(source) and report['probe_sha256']==sha(__file__),'input binding changed')
    require(report['original_sha256']==ORIGINAL_SHA and report['prior_sha256']==PRIOR_SHA and report['saved_receipt_sha256']==sha(RECEIPT),'baseline binding changed')
    require(report['input_sha256']=={name:sha(ROOT/name) for name in INPUTS},'harness or dependency changed')
    record=json.loads(record_path.read_bytes())
    require(report['build_record']=={'sha256':sha(record_path),'record':record},'build record changed')
    validate_build(candidate,source,record)
    baseline=saved();mapping=lines(source.read_text());signatures=0
    require(len(report['cases'])==len(INDICES),'wrong case count')
    for row,index in zip(report['cases'],INDICES):
        require(set(row)=={'saved_index','case','original','prior','candidate'} and row['saved_index']==index and row['case']==baseline['cases'][index]['case'],'wrong roster')
        expected=baseline['cases'][index]['original'];expected_raw=signature(expected['transaction_base64'])
        for side in ('original','prior','candidate'):
            result=row[side];require(set(result)==SHAPE,'incomplete effect schema')
            require(result['case']==expected['case'] and result['pool_authority_top_level_signer'] is False and result['signatures_verified'] is True,'invalid CPI signer claim')
            require(signature(result['transaction_base64'])==expected_raw,'signed route, privileges or payload changed');signatures+=2
            for key in SHAPE-{'logs','signatures_verified'}:require(result[key]==expected[key],f'{side} {key} changed')
            if side!='prior':
                require(not any(x.startswith(('Program log: Left:','Program log: Right:')) for x in result['logs']),'unexpected compared-value decoration')
                require(normalize(result['logs'],mapping)==normalize(expected['logs'],mapping),'full logs differ')
            else:
                require(normalize(result['logs'],mapping)==normalize(baseline['cases'][index]['candidate']['logs'],mapping),'prior full logs changed')
            require(sum('Instruction: AdminCtoPool' in x for x in result['logs'])==1,'missing actual PumpSwap invocation')
    return {'status':'passed','cases':len(INDICES),'signature_fields':signatures,'unique_signed_messages':len({row['original']['transaction_base64'] for row in report['cases']}),'scope':'Actual ordinary signatures and Pump PDA-signed CPI. Only compute and three exact source-coordinate pairs excluded from corrected full-log comparison.'}

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--candidate',type=Path,required=True);p.add_argument('--source',type=Path,required=True);p.add_argument('--build-record',type=Path);p.add_argument('--output',type=Path,required=True);p.add_argument('--expect',choices=('observe','corrected'),default='corrected');a=p.parse_args()
    require(not a.output.exists(),'refusing to replace receipt')
    prior_candidate=PRIOR/'build/artifacts/pump_amm_recovered.so'
    if not prior_candidate.exists():
        matches=[x for x in (PRIOR/'build').rglob('*.so') if sha(x)==PRIOR_SHA];require(len(matches)==1,'prior ELF missing/ambiguous');prior_candidate=matches[0]
    require(sha(prior_candidate)==PRIOR_SHA and sha(ROOT/'evidence/original/pump_amm/deployed.so')==ORIGINAL_SHA,'program identity changed')
    if a.expect=='corrected':require(a.build_record is not None,'build record required')
    record=json.loads(a.build_record.read_bytes()) if a.build_record else None
    report={'status':'incomplete','expect':a.expect,'original_sha256':ORIGINAL_SHA,'prior_sha256':PRIOR_SHA,'candidate_sha256':sha(a.candidate),'source_sha256':sha(a.source),'probe_sha256':sha(__file__),'input_sha256':{name:sha(ROOT/name) for name in INPUTS},'saved_receipt_sha256':sha(RECEIPT),'build_record':None if record is None else {'sha256':sha(a.build_record),'record':record},'cases':[]}
    if a.expect=='corrected':validate_build(a.candidate,a.source,record)
    def save():
        a.output.parent.mkdir(parents=True,exist_ok=True);temp=a.output.with_suffix(a.output.suffix+'.tmp');temp.write_text(json.dumps(report,separators=(',',':'))+'\n');temp.replace(a.output)
    baseline=saved()
    try:
        for index in INDICES:
            case=baseline['cases'][index]['case'];row={'saved_index':index,'case':case};report['cases'].append(row)
            for side,binary in [('original',None),('prior',prior_candidate),('candidate',a.candidate)]:
                # The harness creates tuple patch pairs for exotic fixtures;
                # use their JSON representation consistently before validation.
                row[side]=json.loads(json.dumps(cto.run_case(case,binary)));save()
        report['status']='completed';save()
        if a.expect=='corrected':report['validation']=validate(report,a.candidate,a.source,a.build_record);save();print(json.dumps(report['validation']))
        else:print(json.dumps({'status':'observed','cases':len(INDICES),'acceptance':False}))
    except Exception as exc:report.update(status='failed',failure=str(exc));save();raise

if __name__=='__main__':main()
