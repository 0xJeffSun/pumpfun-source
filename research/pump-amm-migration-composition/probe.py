"""Four-way signed migration replay: replace Pump, AMM, both, or neither."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.metadata,json,os,sys,time,types
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2]
PUMP='repro/pump/main-contract-round34-20261027/candidate.so'
AMM='repro/pump_amm/quote-guard-recovery-20261027/results/build/candidate.so'
MODES={'original':(False,False),'pump_only':(True,False),'amm_only':(False,True),'both':(True,True)}

def cases():
    rows=[]
    routes=[('legacy',{}),('v2',{}),('v2',{'token22':False}),
            ('v2',{'stable':True}),('v2',{'stable':True,'quote22':True})]
    for route,opts in routes:
        profiles=[('boost',{}),('no_boost',{'boost':False}),
            ('readonly_boost',{'readonly_boost':True}),('one_remaining',{'remaining_count':1})]
        for balance in [1,890880,10000000]:
            profiles.append(('authority_'+str(balance),{'mutations':{'pool_authority':{'lamports':balance}}}))
        for balance in [0,2039279,2039280,2039281]:
            profiles.append(('user_'+str(balance),{'mutations':{'user':{'lamports':balance}}}))
        profiles += [('disabled',{'mutations':{'amm_global_config':{'patches':[(56,'ff')]}}}),('mayhem',{'mayhem':1})]
        for profile,kw in profiles:
            rows.append({'route':route,'profile':profile,'input':dict(opts,boost=True)|kw})
    return json.loads(json.dumps(rows))

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
    if not __debug__:raise RuntimeError('Assertions required')
    out=a.output.resolve();assert not out.is_relative_to(ROOT)
    out.mkdir(parents=True,exist_ok=False)
    reads={};busy=False
    def audit(event,args):
        nonlocal busy
        if busy or event!='open':return
        name,mode,_=args
        if not isinstance(name,(str,bytes,os.PathLike)) or (mode and any(c in mode for c in 'wax+')):return
        path=Path(name).resolve()
        if not path.is_relative_to(ROOT) or not path.is_file():return
        rel=path.relative_to(ROOT).as_posix()
        if not rel.startswith(('scripts/','evidence/','research/','repro/')):return
        busy=True
        try:reads[rel]=hashlib.sha256(path.read_bytes()).hexdigest()
        finally:busy=False
    sys.addaudithook(audit)
    # Execute the immutable Round34 copies unchanged. Their logical __file__
    # preserves existing repository-relative asset lookup; compile/audit paths
    # identify the physical archived source that is actually read.
    fixture_sources={}
    def fixture(name):
        path=ROOT/'repro/pump/main-contract-round34-20261027/inputs/scripts'/(name+'.py')
        source=path.read_bytes();m=types.ModuleType(name)
        m.__file__=str(ROOT/'scripts'/(name+'.py'));sys.modules[name]=m
        fixture_sources[name]={'physical_source':path.relative_to(ROOT).as_posix(),
            'logical_file':Path(m.__file__).relative_to(ROOT).as_posix(),'sha256':hashlib.sha256(source).hexdigest()}
        exec(compile(source,str(path),'exec'),m.__dict__)
        return m
    loader=fixture('pump_captured_loader')
    loader.install()
    legacy=fixture('pump_migrate_probe')
    v2=fixture('pump_migrate_v2_probe')
    from solders.transaction_metadata import FailedTransactionMetadata
    from solders.transaction import Transaction
    from composition_compare import clean
    original_load=loader.CapturedLiteSVM.add_program_from_file
    original_send=loader.CapturedLiteSVM.send_transaction
    original_sigverify=loader.CapturedLiteSVM.with_sigverify
    active_amm=False;observed=[]
    sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
    def load(vm,pid,path):
        actual=ROOT/AMM if active_amm and pid==legacy.A else Path(path)
        result=original_load(vm,pid,actual)
        if not hasattr(vm,'_composition_loads'):vm._composition_loads={}
        vm._composition_loads[str(pid)]={'path':actual.relative_to(ROOT).as_posix(),'sha256':sha(actual)}
        return result
    def sigverify(vm,enabled):
        assert enabled is True
        return original_sigverify(vm,enabled)
    def send(vm,tx):
        raw=bytes(tx);checks=tx.verify_with_results();assert checks and all(checks)
        def snap():
            result={}
            for key in tx.message.account_keys:
                account=vm.get_account(key)
                if account is None or not account.executable:
                    result[str(key)]=None if account is None else {'lamports':account.lamports,'owner':str(account.owner),'data':bytes(account.data).hex()}
            return result
        before=snap();result=original_send(vm,tx);assert bytes(tx)==raw
        failed=isinstance(result,FailedTransactionMetadata);meta=result.meta() if failed else result
        pd=vm.get_account(loader.PROGRAMDATA)
        observed.append({'transaction_base64':base64.b64encode(raw).decode(),
            'transaction_sha256':hashlib.sha256(raw).hexdigest(),'verified_signatures':len(checks),
            'programs':dict(vm._composition_loads),'before':before,'after':snap(),
            'pump_programdata_sha256':hashlib.sha256(bytes(pd.data)).hexdigest(),
            'error':str(result.err()) if failed else None,
            'logs_sha256':hashlib.sha256(json.dumps(meta.logs(),separators=(',',':')).encode()).hexdigest()})
        return result
    loader.CapturedLiteSVM.add_program_from_file=load
    loader.CapturedLiteSVM.with_sigverify=sigverify
    loader.CapturedLiteSVM.send_transaction=send
    rows=[];start=time.monotonic()
    for i,c in enumerate(cases()):
        probe=legacy if c['route']=='legacy' else v2;row={'case':c,'runs':{}}
        for label,(pump,amm) in MODES.items():
            active_amm=amm;before=len(observed);load_start=len(loader.LOADS)
            q=probe.run(c['input'],ROOT/PUMP if pump else None)
            assert len(observed)==before+1
            row['runs'][label]={'result':q,'observation':observed[-1],'pump_loader':loader.LOADS[load_start:]}
        ref=clean(row['runs']['original']['result']);row['differences']={}
        for label in list(MODES)[1:]:
            other=clean(row['runs'][label]['result'])
            assert ref['before']==other['before'] and ref['transaction_base64']==other['transaction_base64']
            row['differences'][label]=sorted(k for k in ref if ref[k]!=other[k])
        rows.append(row)
        print(json.dumps({'case':i,'profile':c['profile'],'error':ref['error'],'differences':row['differences']}),flush=True)
    before=dict(reads);after={rel:sha(ROOT/rel) for rel in before};assert before==after
    report={'scope':__doc__,'probe_sha256':sha(Path(__file__)),'solders':importlib.metadata.version('solders'),'fixture_sources':fixture_sources,
        'runtime_reads_before':before,'runtime_reads_after':after,'elapsed_seconds':time.monotonic()-start,'rows':rows}
    (out/'report.json.gz').write_bytes(gzip.compress((json.dumps(report,separators=(',',':'))+'\n').encode(),mtime=0))
    print('complete',len(rows),'mismatched comparisons',sum(bool(d) for r in rows for d in r['differences'].values()),flush=True)

if __name__=='__main__':main()
