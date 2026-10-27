#!/usr/bin/env python3
"""Run 197 original numeric error witnesses and eight successful controls."""
import argparse
import base64
import gzip
import hashlib
import json
from pathlib import Path
import re
import struct
import sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(ROOT/'scripts'))
import pump_amm_incentives_differential as harness

ORIGINAL_SHA = '6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
ORIGIN = 'programs/pump-amm/src/state/volume_accumulator.rs'
SITES = {313:'StartTimeInThePast',327:'EndTimeInThePast',329:'EndTimeBeforeStartTime',331:'TimeRangeTooLarge',
         352:'EndTimeBeforeCurrentDay',263:'DayIndexAfterEndIndex',291:'DayIndexAfterEndIndex',292:'DayInActiveRange'}
COMPUTE = re.compile(r'^Program \w+ consumed \d+ of \d+ compute units$')
INPUTS = ['scripts/pump_amm_incentives_differential.py','scripts/pump_amm_admin_differential.py','scripts/pump_amm_reusable_harness.py',
          'repro/pump_amm/incentive-diagnostics-20261026/cases.json',
          'evidence/dependencies/spl_token/deployed.so','evidence/dependencies/spl_token_2022/deployed.so','evidence/dependencies/associated_token/deployed.so']
FIELDS = {'signature_verification','sigverify_runtime_enabled','error','before','after','events','inner','return_data','transaction_base64','logs'}


def digest(data): return hashlib.sha256(data).hexdigest()
def sha(path): return digest(Path(path).read_bytes())
def require(value, message):
    if not value: raise ValueError(message)


def expected(case):
    c=case['input'];now=c.get('now',10);start=c.get('new_start',30);end=c.get('new_end',59)
    period=c.get('new_period',1);site=None;pair=None;s=20;e=49
    if start and end:
        if start!=s:
            if start<=now:return 313,(start,now)
            s=start
        if end<=now:return 327,(end,now)
        if end<=start:return 329,(end,start)
        if end-start>=period*30:return 331,(period*30-1,end-start)
        e=end
        if now>s:
            current=(now-s)//period;last=(e-s)//period
            if last<=current:return 352,(last,current)
    if c.get('supply',1000)>0:
        require(now<=e,'roster unexpectedly reaches nonnumeric finished range')
        current=0 if now<s else (now-s)//period;last=(e-s)//period;day=c.get('day',0)
        if day<30:
            if day>last:return (263 if now<s else 291),(last,day)
            if day<current:return 292,(day,current)
    return None,None


def normalized(logs, site, source_lines):
    result=[]
    for line in logs:
        if COMPUTE.fullmatch(line):continue
        if site:
            for name in (f'{ORIGIN}:{site}',f'src/incentives.rs:{source_lines[SITES[site]]}'):
                line=line.replace('AnchorError thrown in '+name+'.','AnchorError thrown in <'+str(site)+'>.')
        result.append(line)
    return result


def validate(report, candidate, source, build_record):
    require(set(report)=={'status','candidate_sha256','original_sha256','source_sha256','source_lines','cases','probe_sha256','input_sha256','build_record'},'wrong report schema')
    require(report['status']=='completed' and report['candidate_sha256']==sha(candidate),'incomplete or wrong candidate')
    require(report['original_sha256']==ORIGINAL_SHA and sha(ROOT/'evidence/original/pump_amm/deployed.so')==ORIGINAL_SHA,'wrong original')
    require(report['source_sha256']==sha(source) and report['probe_sha256']==sha(__file__),'wrong source or checker')
    require(report['input_sha256']=={p:sha(ROOT/p) for p in INPUTS},'changed harness')
    build=json.loads(Path(build_record).read_bytes())
    require(report['build_record']=={'sha256':sha(build_record),'record':build},'wrong build record')
    require(build['returncode']==0 and build['source_unchanged'] and build['source_sha256']==build['source_after_sha256'],'failed/changed build')
    require(build['comparison']['candidate_sha256']==sha(candidate),'wrong compiled candidate')
    require(len(build['source_sha256'])==30,'incomplete compiled source manifest')
    root=Path(source).resolve().parents[3]
    compiled={}
    for name,value in build['source_sha256'].items():
        require(name.count('programs/pump-amm/')==1,'unexpected build source path')
        name='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]
        require('..' not in Path(name).parts and name not in compiled,'invalid/duplicate compiled source path')
        require(sha(root/name)==value,'compiled source changed')
        compiled[name]=value
    require(compiled.get('programs/pump-amm/src/incentives.rs')==sha(source),'incentive source not bound to build')
    lines={name:next(i for i,line in enumerate(Path(source).read_text().splitlines(),1) if 'require_' in line and 'PumpAmmError::'+name in line) for name in set(SITES.values())}
    require(report['source_lines']==lines,'source coordinates changed')
    roster=json.loads((HERE/'cases.json').read_bytes())['cases']
    require(len(report['cases'])==len(roster)==205,'missing cases')
    from solders.transaction import Transaction
    signatures=0
    for row,case in zip(report['cases'],roster):
        require(set(row)=={'case','original','candidate'} and row['case']==case,'wrong case schema/identity')
        original,rebuilt=row['original'],row['candidate']
        require(set(original)==set(rebuilt)==FIELDS,'missing effect fields')
        ga=harness.Pubkey.find_program_address([bytes(harness.G),bytes(harness.TOKEN),bytes(harness.MINT)],harness.ATA)[0]
        ua=harness.Pubkey.find_program_address([bytes(harness.USER),bytes(harness.TOKEN),bytes(harness.MINT)],harness.ATA)[0]
        state_keys={str(key) for key in (harness.PAYER.pubkey(),harness.USER,harness.CONFIG_KEY,harness.G,harness.U,harness.MINT,ga,ua,harness.EVENT)}
        for side in (original,rebuilt):
            require(isinstance(side['logs'],list) and isinstance(side['events'],list) and isinstance(side['inner'],list),'invalid effect value types')
            for phase in ('before','after'):
                require(set(side[phase])==state_keys,'missing account state')
                require(all(value is None or set(value)=={'data','owner','lamports'} for value in side[phase].values()),'incomplete account record')
        require({k:v for k,v in original.items() if k!='logs'}=={k:v for k,v in rebuilt.items() if k!='logs'},'signed inputs or effects differ')
        site,pair=expected(case)
        require((site is None)==(case['original_error'] is None),'unexpected fixture disposition')
        c=case['input'];g=original['before'][str(harness.G)]
        require(g['owner']==str(harness.PROGRAM) and bytes.fromhex(g['data'])==harness.disc('GlobalVolumeAccumulator')+struct.pack('<qqq',20,49,1)+bytes(harness.MINT)+struct.pack('<30Q',*([1000]*30))+struct.pack('<30Q',*([100]*30))+bytes(56),'wrong initial accumulator')
        for side in (original,rebuilt):
            require(side['error']==case['original_error'] and side['signature_verification'] is True and side['sigverify_runtime_enabled'] is True,'wrong error/signature status')
            labels=[x for x in side['logs'] if x.startswith(('Program log: Left:','Program log: Right:'))]
            wanted=[] if site is None else [f'Program log: Left: {pair[0]}',f'Program log: Right: {pair[1]}']
            require(labels==wanted==case['original_numeric'],'wrong numeric operands')
            if site:
                coordinate=f'{ORIGIN}:{site}' if side is original else f'src/incentives.rs:{lines[SITES[site]]}'
                require(any('AnchorError thrown in '+coordinate+'.' in x for x in side['logs']),'wrong error site')
            raw=base64.b64decode(side['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw)
            require(bytes(tx)==raw and len(tx.signatures)==1 and all(tx.verify_with_results()),'invalid transaction signature')
            require(len(tx.message.instructions)==1,'extra instruction')
            ix=tx.message.instructions[0];idl=next(x for x in harness.IDL['instructions'] if x['name']=='admin_update_token_incentives')
            require(bytes(ix.data)==bytes(idl['discriminator'])+struct.pack('<qqqQQ',c.get('new_start',30),c.get('new_end',59),c.get('new_period',1),c.get('day',0),c.get('supply',1000)),'wrong signed arguments')
            ga=harness.Pubkey.find_program_address([bytes(harness.G),bytes(harness.TOKEN),bytes(harness.MINT)],harness.ATA)[0]
            route=[harness.PAYER.pubkey(),harness.CONFIG_KEY,harness.G,harness.MINT,ga,harness.ATA,harness.Pubkey.default(),harness.TOKEN,harness.EVENT,harness.PROGRAM]
            require([tx.message.account_keys[i] for i in ix.accounts]==route and tx.message.account_keys[ix.program_id_index]==harness.PROGRAM,'wrong account route')
            header=tx.message.header
            for i,key in enumerate(tx.message.account_keys):
                writable=i<header.num_required_signatures-header.num_readonly_signed_accounts or header.num_required_signatures<=i<len(tx.message.account_keys)-header.num_readonly_unsigned_accounts
                require(writable==(key in {route[0],route[2],route[4]}),'wrong writable privileges')
            signatures+=1
        require(normalized(original['logs'],site,lines)==normalized(rebuilt['logs'],site,lines),'full logs differ')
    return {'cases':205,'numeric_rejections':197,'success_controls':8,'verified_signatures':signatures,'full_logs_equal':True}


def main():
    p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--source',type=Path,required=True);p.add_argument('--build-record',type=Path,required=True);p.add_argument('--output',type=Path,required=True)
    args=p.parse_args();require(not args.output.exists(),'output exists')
    lines={name:next(i for i,line in enumerate(args.source.read_text().splitlines(),1) if 'require_' in line and 'PumpAmmError::'+name in line) for name in set(SITES.values())}
    report={'status':'incomplete','candidate_sha256':sha(args.candidate),'original_sha256':ORIGINAL_SHA,'source_sha256':sha(args.source),'source_lines':lines,'cases':[],'probe_sha256':sha(__file__),'input_sha256':{p:sha(ROOT/p) for p in INPUTS},'build_record':{'sha256':sha(args.build_record),'record':json.loads(args.build_record.read_bytes())}}
    def save():args.output.parent.mkdir(parents=True,exist_ok=True);args.output.write_text(json.dumps(report,separators=(',',':'))+'\n')
    try:
        for case in json.loads((HERE/'cases.json').read_bytes())['cases']:
            row={'case':case};report['cases'].append(row)
            for name,binary in [('original',ROOT/'evidence/original/pump_amm/deployed.so'),('candidate',args.candidate)]:row[name]=harness.run(case['input'],binary)
        report['status']='completed';save();print(json.dumps(validate(report,args.candidate,args.source,args.build_record)))
    except Exception:
        report['status']='failed';save();raise


if __name__=='__main__':main()
