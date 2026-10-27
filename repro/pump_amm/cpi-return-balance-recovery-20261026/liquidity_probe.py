#!/usr/bin/env python3
"""Execute bounded liquidity diagnostics, preserving signed input and full effects.

Use --expect observe for an uncorrected candidate; it reports differences and
never calls them a pass. --expect corrected enforces all comparisons strictly.
"""
import argparse
import base64
import hashlib
import json
from pathlib import Path
import re
import struct
import sys

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / 'scripts'))
import pump_amm_liquidity_differential as pool
import pump_amm_reusable_harness as reusable

ORIGINAL_SHA = '6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
COMPUTE = re.compile(r'^Program [1-9A-HJ-NP-Za-km-z]+ consumed \d+ of \d+ compute units$')
SITES = {
    'seed': ('withdraw', 62, 'require_gte!(a.pool.lp_supply, a.lp_mint.supply, PumpAmmError::SeedLockViolation);'),
    'deposit-base': ('deposit', 79, 'require_gte!(base_limit, base_amount, PumpAmmError::ExceededSlippage);'),
    'deposit-quote': ('deposit', 100, 'require_gte!(quote_limit, quote_transfer_amount, PumpAmmError::ExceededSlippage);'),
    'withdraw-base': ('withdraw', 86, 'require_gte!(base_amount, base_limit, PumpAmmError::ExceededSlippage);'),
    'withdraw-quote': ('withdraw', 107, 'require_gte!(quote_received, quote_limit, PumpAmmError::ExceededSlippage);'),
}
INPUTS=['scripts/pump_amm_liquidity_differential.py','scripts/pump_amm_admin_differential.py','scripts/pump_amm_reusable_harness.py','research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json','research/imported-lab/analysis/pump_fun/config-snapshot.json','evidence/dependencies/spl_token/deployed.so','evidence/dependencies/spl_token_2022/deployed.so']

def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def require(value, message):
    if not value:
        raise ValueError(message)

def roster():
    amount = 1000000
    b = int(pool.f['pool_base_vault_amount_raw'])
    q = int(pool.f['pool_quote_vault_amount_raw'])
    supply = pool.supply
    out = []
    maximum = 2**64-1
    for instruction in ('deposit', 'withdraw'):
        ceiling = supply-1 if instruction == 'deposit' else 0
        base_amount, quote_amount = ((v*amount+ceiling)//supply for v in (b,q))
        default = maximum if instruction == 'deposit' else 0
        base_bad = base_amount-1 if instruction == 'deposit' else base_amount+1
        quote_bad = quote_amount-1 if instruction == 'deposit' else quote_amount+1
        for name, bl, ql, site in (
            ('base-reject',base_bad,default,instruction+'-base'),
            ('quote-reject',default,quote_bad,instruction+'-quote'),
            ('both-reject-base-first',base_bad,quote_bad,instruction+'-base'),
            ('equal-success',base_amount,quote_amount,None),
            ('ordinary-success',default,default,None),
        ):
            values = {'base':(bl,base_amount) if instruction=='deposit' else (base_amount,bl),
                      'quote':(ql,quote_amount) if instruction=='deposit' else (quote_amount,ql)}
            out.append(dict(id=instruction+'-'+name,instruction=instruction,amount=amount,
                            maxbase=bl,maxquote=ql,site=site,
                            compared=list(values[site.split('-')[-1]]) if site else None))
        out.append(dict(id=instruction+'-zero-success',instruction=instruction,amount=0,
                        maxbase=0,maxquote=0,site=None,compared=None))
    out.append(dict(id='withdraw-seed-lock',instruction='withdraw',amount=amount,maxbase=0,maxquote=0,
                    mint_supply=supply+1,site='seed',compared=[supply,supply+1]))
    return out

def normalized(logs, case, source_lines):
    out=[]
    site=case['site']
    for line in logs:
        if COMPUTE.fullmatch(line):
            continue
        if site:
            instruction, original_line, _ = SITES[site]
            locations = [f'programs/pump-amm/src/instructions/liquidity/{instruction}.rs:{original_line}']
            if site in source_lines:
                locations.append(f'src/lib.rs:{source_lines[site]}')
            for location in locations:
                line=line.replace('AnchorError thrown in '+location+'.','AnchorError thrown in <'+site+'>.')
        out.append(line)
    return out

def validate(report, candidate, source, build_record=None):
    keys={'status','original_sha256','candidate_sha256','source_sha256','source_lines','probe_sha256','cases','input_sha256','build_record'}
    require(set(report) in (keys,keys|{'validation'}),'incomplete/unexpected receipt schema')
    require(report['status']=='completed','receipt incomplete')
    require(report['candidate_sha256']==sha(candidate) and report['source_sha256']==sha(source),'candidate/source binding differs')
    require(report['original_sha256']==ORIGINAL_SHA,'wrong original')
    require(report['probe_sha256']==sha(__file__),'probe changed')
    require(report['input_sha256']=={name:sha(ROOT/name) for name in INPUTS},'input binding changed')
    require(set(report['build_record'])=={'sha256','record'},'build binding incomplete')
    bound=report['build_record']
    if build_record is not None:
        require(bound=={'sha256':sha(build_record),'record':json.loads(Path(build_record).read_bytes())},'build record differs')
    record=bound['record']
    require(record.get('returncode')==0 and record.get('source_unchanged') is True and record.get('accepted_build',True) is True,'build not successful')
    require(record.get('candidate_sha256',record.get('comparison',{}).get('candidate_sha256'))==sha(candidate),'build/binary mismatch')
    require(record.get('source_after_sha256')==record.get('source_sha256') and len(record.get('source_sha256',{}))==31,'complete stable source manifest required')
    source_root=Path(source).resolve().parents[3]
    source_manifest={}
    for name,value in record['source_sha256'].items():
        marker='programs/pump-amm/'
        require(name.count(marker)==1,'unexpected source path')
        relative=Path(marker+name.split(marker,1)[1])
        require('..' not in relative.parts and str(relative) not in source_manifest,'invalid/duplicate source path')
        require(sha(source_root/relative)==value,'compiled source bytes changed')
        source_manifest[str(relative)]=value
    require(source_manifest.get('programs/pump-amm/src/lib.rs')==sha(source),'lib source missing')
    source_text=Path(source).read_text().splitlines()
    expected_lines={key:next((i for i,line in enumerate(source_text,1) if text in line),None) for key,(_,_,text) in SITES.items()}
    require(all(expected_lines.values()) and report['source_lines']==expected_lines,'guard source locations differ')
    require(len(report['cases'])==len(roster())==13,'wrong case count')
    from solders.transaction import Transaction
    signatures=0
    for row,case in zip(report['cases'],roster()):
        require(set(row)=={'case','original','candidate'},'incomplete case schema')
        require(row['case']==case,'case roster changed')
        original, rebuilt=row['original'],row['candidate']
        expected_state_keys={str(k) for k in (pool.pool,pool.CONFIG_KEY,pool.PAYER.pubkey(),pool.base,pool.quote,pool.lp,pool.userbase,pool.userquote,pool.userlp,pool.vaultbase,pool.vaultquote,pool.EVENT)}
        expected_account_keys=expected_state_keys-{str(pool.PAYER.pubkey()),str(pool.EVENT)}
        expected_amount_keys={str(k) for k in (pool.userbase,pool.userquote,pool.userlp,pool.vaultbase,pool.vaultquote)}
        for side in (original,rebuilt):
            require(set(side)=={'before','transaction','result'} and set(side['before'])==expected_state_keys,'incomplete signed observation')
            require(all(value is None or set(value)=={'owner','lamports','data'} for value in side['before'].values()),'incomplete pre-state')
            result=side['result']
            require(set(result)=={'accounts','pool_data','inner_instructions','error','logs','amounts','pool_supply','lp_supply'},'incomplete effects')
            require(set(result['accounts'])==expected_account_keys and set(result['amounts'])==expected_amount_keys,'incomplete account effects')
            require(all(set(value)=={'owner','lamports','data_hex'} for value in result['accounts'].values()),'incomplete account record')
            require(isinstance(result['logs'],list) and isinstance(result['inner_instructions'],list),'invalid logs/instructions')
            before=side['before']
            for name,key in (('base_mint',pool.base),('quote_mint',pool.quote),('pool_base_token_account',pool.vaultbase),('pool_quote_token_account',pool.vaultquote)):
                fixture=pool.f['accounts'][name]
                require(before[str(key)]=={'owner':fixture['owner'],'lamports':fixture['lamports'],'data':base64.b64decode(fixture['data_base64'],validate=True).hex()},'labelled fixture state changed')
            pool_bytes=bytearray(pool.poolraw);pool_bytes[245:261]=bytes(16);pool_bytes[271:287]=bytes(16)
            require(before[str(pool.pool)]=={'owner':str(pool.PROGRAM),'lamports':pool.f['accounts']['pool']['lamports'],'data':pool_bytes.hex()},'labelled pool state changed')
            mint=struct.pack('<I',1)+bytes(pool.pool)+struct.pack('<Q',case.get('mint_supply',pool.supply))+bytes([9,1])+bytes(36)
            require(before[str(pool.lp)]=={'owner':str(pool.TOKEN22),'lamports':10**9,'data':mint.hex()},'labelled LP supply changed')
        require(original['before']==rebuilt['before'],'different original/candidate pre-state')
        require(original['transaction']==rebuilt['transaction'],'different signed input')
        raw=base64.b64decode(original['transaction'],validate=True)
        tx=Transaction.from_bytes(raw)
        require(bytes(tx)==raw and all(tx.verify_with_results()) and len(tx.signatures)==1,'invalid signature')
        ix=tx.message.instructions[0]
        disc=next(x['discriminator'] for x in pool.IDL['instructions'] if x['name']==case['instruction'])
        require(bytes(ix.data)==bytes(disc)+struct.pack('<QQQ',case['amount'],case['maxbase'],case['maxquote']),'wrong signed payload')
        expected_route=[pool.pool,pool.CONFIG_KEY,pool.PAYER.pubkey(),pool.base,pool.quote,pool.lp,pool.userbase,pool.userquote,pool.userlp,pool.vaultbase,pool.vaultquote,pool.TOKEN,pool.TOKEN22,pool.EVENT,pool.PROGRAM]
        require([tx.message.account_keys[i] for i in ix.accounts]==expected_route and tx.message.account_keys[ix.program_id_index]==pool.PROGRAM,'wrong account route')
        header=tx.message.header
        for index,key in enumerate(tx.message.account_keys):
            writable=(index<header.num_required_signatures-header.num_readonly_signed_accounts or
                      header.num_required_signatures<=index<len(tx.message.account_keys)-header.num_readonly_unsigned_accounts)
            require(writable==(key in {expected_route[i] for i in (0,2,5,6,7,8,9,10)}),'wrong account privileges')
        signatures+=2
        for key in ('result','before'):
            if key=='result':
                require({k:v for k,v in original[key].items() if k!='logs'}=={k:v for k,v in rebuilt[key].items() if k!='logs'},'non-log effects differ')
        code=6067 if case['site']=='seed' else 6004 if case['site'] else None
        if case['site']:
            instruction,number,_=SITES[case['site']]
            require(any(f'AnchorError thrown in programs/pump-amm/src/instructions/liquidity/{instruction}.rs:{number}.' in log for log in original['result']['logs']),'wrong original guard site')
            require(any(f'AnchorError thrown in src/lib.rs:{report["source_lines"][case["site"]]}.' in log for log in rebuilt['result']['logs']),'wrong candidate guard site')
        for side in (original,rebuilt):
            result=side['result']
            require(result['error']==(f'TransactionErrorInstructionError((0, Tagged(InstructionErrorCustom({code}))))' if code else None),'wrong error disposition')
            numeric=[line for line in result['logs'] if line.startswith(('Program log: Left:','Program log: Right:'))]
            expected=[f'Program log: Left: {case["compared"][0]}',f'Program log: Right: {case["compared"][1]}'] if code else []
            require(numeric==expected,'wrong numeric operands')
        require(normalized(original['result']['logs'],case,report['source_lines'])==normalized(rebuilt['result']['logs'],case,report['source_lines']),'full logs differ')
    return {'status':'passed','cases':13,'verified_signature_fields':signatures,'scope':'Bounded synthetic local execution; complete logs excluding compute and five exact source-coordinate pairs.'}

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--candidate',type=Path,required=True)
    p.add_argument('--source',type=Path,required=True,help='Exact compiled lib.rs')
    p.add_argument('--build-record',type=Path,help='Actual build-comparison.json or build-record.json; required for corrected acceptance')
    p.add_argument('--output',type=Path,required=True)
    p.add_argument('--expect',choices=('observe','corrected'),default='corrected')
    args=p.parse_args()
    require(not args.output.exists(),'refusing to replace receipt')
    source=args.source.read_text().splitlines()
    source_lines={key:next((i for i,line in enumerate(source,1) if text in line),None) for key,(_,_,text) in SITES.items()}
    source_lines={key:line for key,line in source_lines.items() if line is not None}
    if args.expect=='corrected':require(len(source_lines)==5,'five source guards required')
    report={'status':'incomplete','original_sha256':sha(ROOT/'evidence/original/pump_amm/deployed.so'),'candidate_sha256':sha(args.candidate),'source_sha256':sha(args.source),'source_lines':source_lines,'probe_sha256':sha(__file__),'cases':[]}
    inputs=INPUTS
    report['input_sha256']={name:sha(ROOT/name) for name in inputs}
    if args.expect=='corrected':require(args.build_record is not None,'actual build record required')
    if args.build_record:
        record=json.loads(args.build_record.read_bytes())
        require(record.get('candidate_sha256',record.get('comparison',{}).get('candidate_sha256'))==report['candidate_sha256'],'build/candidate binding differs')
        source_hashes=record['source_sha256']
        require(any(name.endswith('/programs/pump-amm/src/lib.rs') or name=='programs/pump-amm/src/lib.rs' for name in source_hashes),'missing compiled source')
        require(all(value==report['source_sha256'] for name,value in source_hashes.items() if name.endswith('/programs/pump-amm/src/lib.rs') or name=='programs/pump-amm/src/lib.rs'),'compiled source binding differs')
        report['build_record']={'sha256':sha(args.build_record),'record':record}
    require(report['original_sha256']==ORIGINAL_SHA,'original changed')
    original_send=reusable._ResettableVM.send_transaction
    captured=[]
    def observe(self,tx):
        require(all(tx.verify_with_results()),'invalid actual signature')
        before={}
        for key in tx.message.account_keys:
            account=self.get_account(key)
            if account is not None and account.executable:
                continue
            before[str(key)]=None if account is None else dict(owner=str(account.owner),lamports=account.lamports,data=bytes(account.data).hex())
        captured.append({'before':before,'transaction':base64.b64encode(bytes(tx)).decode()})
        return original_send(self,tx)
    def save():
        args.output.parent.mkdir(parents=True,exist_ok=True)
        temporary=args.output.with_suffix(args.output.suffix+'.tmp')
        temporary.write_text(json.dumps(report,separators=(',',':'))+'\n')
        temporary.replace(args.output)
    reusable._ResettableVM.send_transaction=observe
    try:
        for case in roster():
            row={'case':case};report['cases'].append(row)
            kwargs={key:value for key,value in case.items() if key in ('amount','maxbase','maxquote','mint_supply')}
            for side,binary in [('original',ROOT/'evidence/original/pump_amm/deployed.so'),('candidate',args.candidate)]:
                captured.clear()
                result=pool.run(case['instruction'],candidate=binary,**kwargs)
                require(len(captured)==1,'wrong transaction count')
                row[side]={**captured[0],'result':result};save()
        report['status']='completed';save()
        require(report['input_sha256']=={name:sha(ROOT/name) for name in inputs},'inputs changed during replay')
        require(report['candidate_sha256']==sha(args.candidate) and report['source_sha256']==sha(args.source),'candidate/source changed during replay')
        if args.expect=='corrected':
            report['validation']=validate(report,args.candidate,args.source,args.build_record);save()
            print(json.dumps(report['validation']))
        else:print(json.dumps({'status':'observed','cases':len(report['cases']),'acceptance':False}))
    except Exception as exc:
        report['status']='failed';report['failure']=str(exc);save();raise
    finally:reusable._ResettableVM.send_transaction=original_send

if __name__=='__main__':main()
