#!/usr/bin/env python3
"""PROPOSED ONLY: ordinary nested creation over synthetic canonical Tokenkeg ancestry.

No claim that ancestry was created or migrated historically. The final ordinary
create_v2 uses real test-owned payer/mint signatures and the existing captured
program CPIs. No Mayhem invocation, extension variation or PDA signer bypass.
"""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,struct,sys,traceback
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent
ROOT=next(p for p in HERE.parents if(p/'evidence/original/pump/deployed.so').is_file())
from proposal_common import sha,logs_for_comparison,decode_event,event_bytes,compiled_binding,runtime_hashes
s=importlib.util.spec_from_file_location('proposed_nested_fixture',HERE/'pump_create_nested_fixture.py');h=importlib.util.module_from_spec(s);s.loader.exec_module(h)
AMM=h.Pubkey.from_string('pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA');WSOL=h.Pubkey.from_string('So11111111111111111111111111111111111111112')
C_DISC=bytes(next(x['discriminator']for x in h.IDL['accounts']if x['name']=='BondingCurve'))
AMM_IDL=json.loads((ROOT/'evidence/upstream/pump_amm.json').read_text());P_DISC=bytes(next(x['discriminator']for x in AMM_IDL['accounts']if x['name']=='Pool'))
CASES=HERE.parent/'cases.json';EXPECTED=HERE.parent/'expected-source-map.json'
ata=lambda authority,mint:h.Pubkey.find_program_address([bytes(authority),bytes(h.TOKEN),bytes(mint)],h.ATA)[0]

def mint_data():return struct.pack('<I',1)+bytes(h.USER.pubkey())+struct.pack('<Q',2*10**15)+bytes([6,1])+bytes(36)
def token_data(mint,owner,amount):
    b=bytearray(165);b[:32]=bytes(mint);b[32:64]=bytes(owner);struct.pack_into('<Q',b,64,amount);b[108]=1
    if mint==WSOL:struct.pack_into('<IQ',b,109,1,2039280)
    return bytes(b)
def curve_data(depth,quote,pool,position,asymmetric):
    b=bytearray(166);b[:8]=C_DISC;vt=10**15+(position*10**12 if asymmetric else 0);vq=10**12+(position*10**10 if asymmetric else 0)
    struct.pack_into('<QQQQQ',b,8,0 if pool else vt,0 if pool else vq,0 if pool else vt-1,0 if pool else 10**12,2*10**15)
    b[48]=bool(pool);b[49:81]=bytes(h.USER.pubkey());b[83:115]=bytes(quote);b[141]=depth;struct.pack_into('<Q',b,142,vq)
    return bytes(b)
def pool_data(bump,authority,mint,quote,lp,base,quote_vault,adjustment):
    b=bytearray(287);b[:8]=P_DISC;b[8]=bump;struct.pack_into('<H',b,9,0)
    for offset,key in [(11,authority),(43,mint),(75,quote),(107,lp),(139,base),(171,quote_vault),(211,h.USER.pubkey())]:b[offset:offset+32]=bytes(key)
    struct.pack_into('<Q',b,203,10**9);b[245:261]=int(adjustment).to_bytes(16,'little',signed=True)
    return bytes(b)

def fixture(case):
    depth=case['depth'];assert 1<=depth<=5
    mints=[h.OTHER.pubkey()]+[h.Pubkey.from_bytes(bytes([50+i])*32)for i in range(1,depth)]
    accounts={};tail=[];groups=[]
    def put(key,data,owner,lamports=10**9):accounts[str(key)]={'data':data.hex(),'owner':str(owner),'lamports':lamports}
    for i,mint in enumerate(mints):
        quote=mints[i+1]if i+1<depth else h.Pubkey.default();curve=h.Pubkey.find_program_address([b'bonding-curve',bytes(mint)],h.PROGRAM)[0];is_pool=i in case['pool_positions']
        put(mint,mint_data(),h.TOKEN);put(curve,curve_data(depth-i-1,quote,is_pool,i,case['asymmetric']),h.PROGRAM)
        group=[curve]
        if is_pool:
            authority=h.Pubkey.find_program_address([b'pool-authority',bytes(mint)],h.PROGRAM)[0];q=WSOL if quote==h.Pubkey.default()else quote
            pool,bump=h.Pubkey.find_program_address([b'pool',struct.pack('<H',0),bytes(authority),bytes(mint),bytes(q)],AMM)
            base=ata(pool,mint);qv=ata(pool,q);lp=h.Pubkey.find_program_address([b'pool_lp_mint',bytes(pool)],AMM)[0]
            put(pool,pool_data(bump,authority,mint,q,lp,base,qv,case['pool_adjustment']),AMM)
            put(base,token_data(mint,pool,8*10**14+i*10**12),h.TOKEN)
            q_amount=10**12+i*10**9;put(qv,token_data(q,pool,q_amount),h.TOKEN,q_amount+2039280 if q==WSOL else 10**9)
            assert q_amount+case['pool_adjustment']>0;group += [pool,base,qv]
        groups.append([str(k)for k in group]);tail.extend(group)
    unused=h.Pubkey.from_bytes(bytes([91])*32);put(unused,b'',h.Pubkey.default(),1000000)
    expected=4+depth+3*len(case['pool_positions']);assert 4+len(tail)==expected
    child={'instruction':'create_v2','name':'N','symbol':'N','uri':'','ordinary_unused_vault':str(unused),'quote':True,'quote_token22':False,'quote_whitelisted':False,'quote_control':True,'control_entries':[],'nested':True,'bootstrap_accounts':accounts,'extra_remaining':[str(k)for k in tail[1:]],'global_patches':[(1013,bytes(32).hex()),(1087,bytes([case.get('max_depth',5)]).hex())]}
    return child,{'scope':'Synthetic preexisting canonical ordinary ancestry; no bootstrap/migration execution or historical-state claim.','groups_nearest_first':groups,'remaining_count':expected,'unchanged_input_keys':sorted(accounts),'quote_mint':str(mints[0]),'final_curve':str(h.CURVE)}

def assertions(case,result,layout):
    errors=[]
    def check(value,why):
        if not value:errors.append(why)
    check(result['verified_signature_count']==2,'payer and mint signatures required')
    check(not any(line.startswith('Program MAyhSmz')and' invoke ['in line for line in result['logs']),'ordinary context must not invoke Mayhem')
    for key in layout['unchanged_input_keys']:check(result['before'][key]==result['after'][key],'read-only ancestry changed: '+key)
    if case['expected']=='success':
        check(result['error']is None,'expected ordinary success')
        if result['error']is None:
            curve=result['after'][str(h.CURVE)];d=bytes.fromhex(curve['data']);check(curve['owner']==str(h.PROGRAM)and len(d)==166,'new curve owner/size')
            check(d[141]==case['depth'],'stored depth');check(d[83:115]==bytes(h.OTHER.pubkey()),'stored immediate quote');check(d[48]==d[81]==d[82]==d[124]==0,'ordinary noncomplete flags')
            vq=struct.unpack_from('<Q',d,16)[0];check(vq>0 and struct.unpack_from('<Q',d,142)[0]==vq,'derived quote reserves stored consistently')
            ev=event_bytes(result['events'],h.IDL,'CreateEvent');check(len(ev)==1,'exactly one CreateEvent log')
            if len(ev)==1:
                event,tail=decode_event(ev[0],h.IDL,'CreateEvent',h.Pubkey);check(not tail,'complete CreateEvent decoding')
                for key,val in [('depth',case['depth']),('quote_mint',str(h.OTHER.pubkey())),('virtual_quote_reserves',vq),('mint',str(h.MINT.pubkey())),('bonding_curve',str(h.CURVE)),('token_program',str(h.TOKEN22)),('is_mayhem_mode',False),('is_cashback_enabled',False),('is_holder_reward',False)]:check(event[key]==val,'CreateEvent '+key)
            q=ata(h.CURVE,h.OTHER.pubkey());state=result['after'][str(q)];check(state is not None and state['owner']==str(h.TOKEN),'canonical quote ATA created')
            if state:
                d=bytes.fromhex(state['data']);check(len(d)==165 and d[:32]==bytes(h.OTHER.pubkey())and d[32:64]==bytes(h.CURVE)and struct.unpack_from('<Q',d,64)[0]==0,'ordinary quote ATA fields')
    else:
        check(result['error']is not None and 'Custom(6105)'in result['error'],'depth-limit error6105')
        for key in result['before']:
            if key!=str(h.USER.pubkey()):check(result['before'][key]==result['after'][key],'rollback '+key)
        check(not result['events'],'no committed creation event on depth rejection')
    return errors

def bindings(candidate,report):
    paths=['scripts/pump_create_nested_fixture.py','scripts/pump_create_nested_differential.py','evidence/upstream/pump.json','evidence/upstream/pump_amm.json','research/imported-lab/analysis/pump_fun/config-snapshot.json','evidence/original/pump/deployed.so','evidence/original/mayhem/deployed.so']+['evidence/dependencies/'+n+'/deployed.so'for n in ['spl_token','spl_token_2022','associated_token','token_metadata']]
    local=[Path(__file__),HERE/'pump_create_nested_fixture.py',HERE/'proposal_common.py',HERE/'verify_saved.py',CASES,EXPECTED]
    return {'repository_inputs':{p:sha(ROOT/p)for p in paths},'proposed_harness_inputs':{str(p.relative_to(HERE.parent)):sha(p)for p in local},'runtime_files':runtime_hashes(),'compiled_candidate_binding':compiled_binding(ROOT,candidate,report,EXPECTED)if candidate else None}

def main():
    p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path);p.add_argument('--build-report',type=Path);p.add_argument('--accepted-original',type=Path);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists()
    candidate=a.candidate.resolve()if a.candidate else None;report=a.build_report.resolve()if a.build_report else None;before=bindings(candidate,report);cases=json.loads(CASES.read_text())['cases'];assert len(cases)==16
    if candidate:
        assert a.accepted_original is not None,'Complete and preserve original-only fixture acceptance first'
        accepted=json.loads(gzip.decompress(a.accepted_original.read_bytes()));assert accepted['case_count']==16 and not accepted['failures']and accepted['candidate_sha256']is None
        assert accepted['provenance']['repository_inputs']==before['repository_inputs']and accepted['provenance']['proposed_harness_inputs']==before['proposed_harness_inputs']
    rows=[];failures=[];current=None
    journal=a.output.with_name(a.output.name+'.case-journal');journal.mkdir(exist_ok=False)
    partial=a.output.with_name(a.output.name+'.partial.json.gz')
    def persist_partial(stage,exception=None):
        body={'scope':'Partial attempt only; never an accepted16-case receipt','complete':False,'stage':stage,'provenance':before,'candidate_sha256':sha(candidate)if candidate else None,'completed_rows':len(rows),'cases':rows,'current_case':current,'failures':failures,'exception':exception,'inputs_unchanged':False}
        partial.write_bytes(gzip.compress((json.dumps(body,separators=(',',':'))+'\n').encode(),mtime=0))
    try:
        for case in cases:
            child,layout=fixture(case);current={'case':case,'fixture':child,'layout':layout};persist_partial('before-original')
            x=h.run(child,record_path=journal/(case['id']+'-original.json'));current['original']=x;persist_partial('original-captured')
            y=h.run(child,candidate,record_path=journal/(case['id']+'-candidate.json'))if candidate else None;current['candidate']=y;persist_partial('both-captured')
            left=assertions(case,x,layout);right=assertions(case,y,layout)if y else[];diff=[k for k in ['before','after','error','events','inner','return']if y and x[k]!=y[k]]
            if y and logs_for_comparison(x['logs'])!=logs_for_comparison(y['logs']):diff.append('semantic_logs')
            row={'case':case,'fixture':child,'layout':layout,'original':x,'candidate':y,'original_assertion_failures':left,'candidate_assertion_failures':right,'mismatches':diff};rows.append(row)
            if left or right or diff:failures.append(case['id'])
            persist_partial('case-complete');print(json.dumps({'case':case['id'],'original_error':x['error'],'assertions':left+right,'mismatches':diff}),flush=True)
        assert before==bindings(candidate,report)
    except BaseException as error:
        persist_partial('exception',{'type':type(error).__name__,'message':str(error),'traceback':traceback.format_exc()});raise
    out={'scope':__doc__,'complete':True,'mode':'fresh original/candidate'if candidate else'original-only acceptance; no candidate/runtime-equivalence claim','provenance':before,'inputs_unchanged':True,'candidate_sha256':sha(candidate)if candidate else None,'case_count':len(rows),'new_unique_cases':16,'baseline_repeats_in_this_runner':0,'cases':rows,'failures':failures,'verified_signatures':sum(r['original']['verified_signature_count']+(r['candidate']['verified_signature_count']if r['candidate']else 0)for r in rows)}
    a.output.write_bytes(gzip.compress((json.dumps(out,separators=(',',':'))+'\n').encode(),mtime=0));persist_partial('aggregate-written');raise SystemExit(bool(failures))
if __name__=='__main__':main()
