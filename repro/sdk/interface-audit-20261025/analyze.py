"""Static npm archive/interface comparison. No npm install, JS execution or network."""
from pathlib import Path
import base64,hashlib,io,json,re,tarfile
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/upstream/pump.json').is_file())
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_bytes())
PACKAGES=[('pump','4.3.1'),('amm','2.2.0'),('agent','1.0.7')]
def members(label,version):
    raw=(P/f'{label}-{version}.tgz').read_bytes();receipt=J(P/f'{label}-receipt.json');registry=J(P/f'{label}-registry.json')
    assert len(raw)==receipt['bytes'] and H(raw)==receipt['sha256']
    assert H((P/f'{label}-registry.json').read_bytes())==receipt['registry_sha256']
    assert registry['dist']['integrity']==receipt['integrity']=='sha512-'+base64.b64encode(hashlib.sha512(raw).digest()).decode()
    with tarfile.open(fileobj=io.BytesIO(raw)) as archive:
        files=[m for m in archive.getmembers() if m.isfile()]
        assert len({m.name for m in files})==len(files)
        assert all(not m.name.startswith('/') and '..' not in Path(m.name).parts for m in files)
        data={m.name:archive.extractfile(m).read() for m in files}
    package=json.loads(data['package/package.json']);assert package['version']==version and package['name']==registry['name']==receipt['package']
    return data,package
def delta(a,b):
    result={}
    for key in ['instructions','accounts','events','types','errors']:
        aa={x.get('name',str(x.get('code'))):x for x in a.get(key,[])};bb={x.get('name',str(x.get('code'))):x for x in b.get(key,[])}
        assert len(aa)==len(a.get(key,[])) and len(bb)==len(b.get(key,[])),('duplicate name',key)
        result[key]={'baseline_count':len(aa),'sdk_count':len(bb),'added':sorted(bb.keys()-aa.keys()),'removed':sorted(aa.keys()-bb.keys()),'changed':sorted(k for k in aa.keys()&bb.keys() if aa[k]!=bb[k])}
        if key=='types':
            result[key]['field_deltas']={k:{'added':[x for x in bb[k]['type']['fields'] if x not in aa[k]['type']['fields']],'removed':[x for x in aa[k]['type']['fields'] if x not in bb[k]['type']['fields']]} for k in result[key]['changed']}
        if key=='errors':result[key]['new_definitions']=[bb[k] for k in result[key]['added']]
    return result
def analyze():
    packages={};archives={}
    for label,version in PACKAGES:
        data,metadata=members(label,version);archives[label]=data
        packages[label]={'name':metadata['name'],'version':version,'archive_files':len(data),'declared_dependencies':metadata.get('dependencies',{}),'installed_or_resolved':False}
    pump=archives['pump'];amm=archives['amm'];agent=archives['agent']
    p=json.loads(pump['package/src/idl/pump.json']);a=json.loads(pump['package/src/idl/pump_amm.json'])
    assert pump['package/src/idl/pump_amm.json']==amm['package/src/idl/pump_amm.json']
    interfaces={}
    for name,value in [('pump',p),('pump_amm',a)]:
        baseline=J(ROOT/f'evidence/upstream/{name}.json');interfaces[name]=delta(baseline,value)
        for key in ['instructions','accounts','events']:assert baseline[key]==value[key],(name,key,'ordered array differs')
        expected_types=json.loads(json.dumps(baseline['types']))
        changed={'TradeEvent'} if name=='pump' else {'BuyEvent','SellEvent','DepositEvent','WithdrawEvent'}
        for entry in expected_types:
            if entry['name'] in changed:entry['type']['fields'].append({'name':'quote_transfer_fee','type':'u64'})
        assert value['types']==expected_types,(name,'not exact field append')
        assert value['errors']==baseline['errors']+interfaces[name]['errors']['new_definitions'],(name,'error order/prefix differs')
    for result in interfaces.values():
        for key in ['instructions','accounts','events']:
            assert not result[key]['added'] and not result[key]['removed'] and not result[key]['changed']
    assert interfaces['pump']['types']['changed']==['TradeEvent']
    assert interfaces['pump_amm']['types']['changed']==['BuyEvent','DepositEvent','SellEvent','WithdrawEvent']
    for result in interfaces.values():
        for fields in result['types']['field_deltas'].values():assert fields=={'added':[{'name':'quote_transfer_fee','type':'u64'}],'removed':[]}
        assert result['errors']['added']==['QuoteMintNotWritable'] and not result['errors']['changed'] and not result['errors']['removed']
    fees=json.loads(pump['package/src/idl/pump_fees.json']);fd=delta(J(ROOT/'evidence/upstream/pump_fees.json'),fees)
    assert all(not value['added'] and not value['changed'] for value in fd.values())
    assert {key:value['removed'] for key,value in fd.items()}=={'instructions':['withdraw'],'accounts':[],'events':['WithdrawEvent'],'types':['WithdrawEvent'],'errors':['IncompleteTokenAccounts','NothingToWithdraw']}
    fees_baseline=J(ROOT/'evidence/upstream/pump_fees.json')
    for key in ['instructions','accounts','events','types','errors']:
        assert fees[key]==[entry for entry in fees_baseline[key] if entry['name'] not in fd[key]['removed']],('fees',key,'ordered subset differs')
    fee_wrappers=set(re.findall(r'pub fn (\w+)',(P/'observed-fees-lib.rs').read_text()))
    assert {x['name'] for x in fees['instructions']}<=fee_wrappers
    interfaces['pump_fees']=fd
    client=pump['package/src/onlineSdk.ts'].decode();library=(P/'observed-pump-lib.rs').read_text()
    wrappers=set(re.findall(r'pub fn (\w+)',library));idl_names={x['name'] for x in p['instructions']}
    assert idl_names-wrappers=={'admin_update_token_incentives','claim_token_incentives','set_mayhem_virtual_params'}
    assert 'this.offlinePumpProgram.methods\n      .adminUpdateTokenIncentives(' in client
    assert 'this.offlinePumpProgram.methods\n        .claimTokenIncentives()' in client
    assert 'return [];' in client[client.index('  async claimTokenIncentives('):client.index('  async claimTokenIncentivesBothPrograms(')]
    sdk=pump['package/src/sdk.ts'].decode();assert 'from "@pump-fun/agent-payments-sdk"' in sdk
    assert sdk.count('const agentPaymentsSdk = PumpAgentOffline.load(mint);')==2
    assert sdk.count('instructions.push(agentInitializeIx);')==2
    agent_js=agent['package/dist/index.js'].decode();program=re.search(r'var w=\{address:"([^"]+)"',agent_js).group(1)
    assert 'this.program.methods.agentInitialize(r,o)' in agent_js
    plan=J(P/'observed-localnet-plan.json');assert program not in {row['address'] for row in plan['programs']}
    return {'scope':'Frozen static client/interface evidence; no JS/SDK/VM execution, dependency installation or deployment identity proof','packages':packages,'interfaces':interfaces,'amm_idls_identical_across_packages':True,'frozen_source':{'observed_revision':'8435d7e576ca38e36c486038d7f26868992e818a','lib_sha256':H((P/'observed-pump-lib.rs').read_bytes()),'idl_instructions':len(idl_names),'source_wrappers':len(wrappers),'missing_dispatches':sorted(idl_names-wrappers),'incentive_builders_present':True,'claim_builder_can_return_empty_before_dispatch':True,'fees_sdk_instruction_count':len(fees['instructions']),'fees_source_wrapper_count':len(fee_wrappers),'fees_sdk_missing_named_source_wrappers':[],'runtime_coverage_proved':False},'optional_tokenized_agent_flow':{'dependency':packages['pump']['declared_dependencies']['@pump-fun/agent-payments-sdk'],'program_id':program,'builder':'PumpAgentOffline.create -> agentInitialize','sdk_append_sites':2,'program_in_frozen_nine_program_plan':False,'capture_or_execution_claimed':False},'client_transitive_lock_retained':False,'all_sdk_compatibility_proved':False}
if __name__=='__main__':print(json.dumps(analyze(),indent=2))
