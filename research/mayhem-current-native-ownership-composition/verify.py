"""Authenticate saved native composition evidence without compiling or running a VM."""
if not __debug__:
    raise RuntimeError('Optimized Python disables evidence assertions')
from pathlib import Path
import argparse,collections,gzip,hashlib,importlib.util,io,json,sys,tarfile
P=Path(__file__).resolve().parent
ROOT=P.parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
load=lambda p:json.loads(p.read_bytes())
unzip=lambda p:gzip.decompress(p.read_bytes())
sys.dont_write_bytecode=True

def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def manifest_check(root=None):
    root=P if root is None else root
    paths=list(root.rglob('*'))
    assert not any(p.is_symlink()for p in paths)
    actual={p.relative_to(root).as_posix():sha(p.read_bytes())for p in paths if p.is_file()and p!=root/'manifest.json'}
    assert actual==load(root/'manifest.json'),'packet manifest'

def source_files(label):
    expected=load(P/'source-inputs.json');files={}
    with tarfile.open(P/'source.tar.xz','r:xz')as t:
        for m in t:
            assert m.isfile()and m.name in expected and m.name not in files
            assert not Path(m.name).is_absolute()and '..'not in Path(m.name).parts
            files[m.name]=t.extractfile(m).read()
    assert {n:sha(b)for n,b in files.items()}==expected and len(files)==67
    before=dict(files)
    for p in (P/'builds'/label/'overrides').rglob('*.gz'):
        name=p.relative_to(P/'builds'/label/'overrides').as_posix()[:-3]
        assert name in files
        files[name]=unzip(p)
    changed={n for n in files if files[n]!=before[n]}
    wanted=({'curve-accounts/src/interface_definition.rs','curve-accounts/idls/pump.json'}
        if label in ['composed','repeat']else set()if label=='parent'else{'src/instructions/pump_interface.rs'})
    assert changed==wanted
    assert files['src/lib.rs']==before['src/lib.rs']
    for n in changed:
        if n.endswith('.rs'):assert files[n].count(b'\n')==before[n].count(b'\n')
    assert {n:sha(b)for n,b in files.items()}==load(P/'all-source-inputs.json')[label]
    return files

def static():
    for n,h in load(P/'root-inputs.json').items():assert sha((ROOT/n).read_bytes())==h,n
    wm=module('composition_windows',P/'window_map.py')
    reference=module('quote_reference',P/'quote_reference.py')
    init=module('initializer_reference',P/'initializer_reference.py')
    original=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes();ow=wm.windows(original)
    assert len(ow)==441 and sum(x['bytes']for x in ow)==706744
    labels=load(P/'all-source-inputs.json');observations={};images={}
    tools=load(P/'sdk/post-run.json')['tools']
    assert len(tools)==6 and len(load(P/'sdk/post-run.json')['target_libraries'])==26
    for label in labels:
        d=P/'builds'/label;launch,result=load(d/'launch.json'),load(d/'result.json')
        assert {n:sha(b)for n,b in source_files(label).items()}==launch['source_inputs']
        assert launch['checked_tools']==tools
        controller='replay_qualified_current432_historical.py'if label in ['composed','repeat']else'build_native.py'
        assert launch['controller_sha256']==sha((P/'controllers'/controller).read_bytes())
        assert result['returncode']==0 and result['source_unchanged']and result['tools_unchanged']
        if label in ['composed','repeat']:
            assert result['dependencies_unchanged']
            assert launch['macro_sha256']==sha(unzip(ROOT/'research/mayhem-historical-macro-linux/captures/host-macro.so.gz'))=='3b0a5efc2cf5a15ac9b198ab2a6aa66650ababe46ee615a1bc45c796b1a7de31'
            assert launch['command'][launch['command'].index('--crate-name')+1]=='mayhem_recovered'
        else:
            for name in ['stdout','stderr']:assert result[name+'_sha256']==sha(unzip(d/(name+'.gz')))
        candidate,symbols=(unzip(d/(n+'.so.gz'))for n in ['candidate','symbols'])
        assert sha(candidate)==result['candidate_sha256']and sha(symbols)==result['symbols_sha256']
        strip=load(d/'strip-replay.json')
        assert strip['returncode']==0 and strip['candidate_equal']
        assert strip['input_sha256']==sha(symbols)and strip['output_sha256']==sha(candidate)
        assert strip['tool_sha256']==tools[strip['command'][0]]
        assert strip['command'][1]=='--strip-all'
        sections=lambda im:{s['name']:(s['address'],s['size'],wm.m.section_data(im,s['name']))for s in wm.m.elf_layout(im)['sections']if s['flags']&2 and s['type']!=8}
        assert sections(candidate)==sections(symbols)
        if 'candidate_bytes'in result:assert len(candidate)==result['candidate_bytes']
        observations[label]=reference.observe(wm,original,ow,candidate,symbols);images[label]=(candidate,symbols)
        cw=wm.windows(symbols)
        legacy=next(r for r in cw if r['name']and'legacy_buy_handler'in r['name'])
        original_legacy=next(r for r in ow if r['address']==113672)
        oc=reference.calls(wm,original,original_legacy,ow)
        cc=reference.calls(wm,symbols,legacy,cw)
        observations[label]['legacy_buy']=dict(original_bytes=13848,candidate_bytes=legacy['bytes'],
            complete_equal=legacy['signature']==original_legacy['signature'],
            original_calls=oc,candidate_calls=cc,
            callee_multiset_equal=collections.Counter(map(reference.identity,oc))==collections.Counter(map(reference.identity,cc)))
    parent=observations['parent']
    assert parent['candidate_sha256']=='a6adc4f876da179b4ce3daeebd55d24d17ca1aad4fc288085c5a1c5ba15069c5'
    assert parent['symbols_sha256']=='9cd6ac43278b854d6d6a5fec9a1624ee205344a774714c893a2a3688ebc12301'
    for label,row in observations.items():
        assert row['matched_windows']==432 and row['matched_original']==parent['matched_original']
        assert not row['whole_file_equal']and not row['meaningful_elf_equal']
        assert not row['legacy_buy']['complete_equal']
        assert {tuple(x)for x in parent['positive_immediate_edges']}<={tuple(x)for x in row['positive_immediate_edges']}
        if label in ['composed','repeat']:
            assert set(row['raw_local_windows'])-set(parent['raw_local_windows'])=={538944}
            assert set(parent['raw_local_windows'])<=set(row['raw_local_windows'])and len(row['raw_local_windows'])==85
            for name in ['buy_quote','sell_quote']:
                q=row['helpers'][name]
                assert q['complete_normalized_equal']and q['callee_multiset_equal']
                assert [(c['offset'],reference.identity(c))for c in q['original_calls']]==[(c['offset'],reference.identity(c))for c in q['candidate_calls']]
            row['initializer']=init.initializer_references(wm,original,ow,images[label][1],wm.windows(images[label][1]))
            for name in ['typed_data_reader.py','sell_typed_reader.py']:
                typed=module('typed_'+name,P/name)
                import tempfile
                with tempfile.TemporaryDirectory()as directory:
                    target=Path(directory)/'symbols.so';target.write_bytes(images[label][1]);data=typed.inspect(target)
                assert data['whole_body_normalized_equal']and data['direct_callee_multiset_equal']
                assert data['original_data']==data['candidate_data']and len(data['original_data'])==10
                row[name]=data
    assert images['composed']==images['repeat']
    assert observations['composed']['candidate_sha256']=='78e3ccb13f531b0724bf1f60c82744092c8dcbdeb2162c0755dc88ecc0186932'
    assert images['parent']==images['legacy-buy-positive-range-current432']
    assert images['legacy-buy-scaled-result-current432']==images['legacy-buy-eager-scaled-current432']
    observations['ownership_proof']=ownership_proof(images,wm)
    return observations

def ownership_proof(images,wm):
    legacy=module('legacy_profile',ROOT/'research/mayhem-legacy-buy-cpi-ownership/verify.py')
    reader=module('legacy_reader',ROOT/'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
    import tempfile,difflib
    original=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes()
    expected_source=load(ROOT/'research/mayhem-quotes-current-recovery-20261027/source-inputs.json')
    assert {n:sha(b)for n,b in source_files('parent').items()}==expected_source
    records={}
    with tempfile.TemporaryDirectory()as directory:
        root=Path(directory)
        source=root/'original.so';source.write_bytes(original);o=reader.Elf(source)
        catalog=load(ROOT/'research/mayhem-full-curve-recovery/audit.json')['rows']
        ow={r['start']:o.window(r['start'],r['end'])for r in catalog};original_handler=ow[113672]
        mixed=root/'mixed.so';mixed.write_bytes(unzip(ROOT/'research/mayhem-quotes-current-recovery-20261027/builds/current/symbols.so.gz'))
        mixed=reader.Elf(mixed)
        def body(e):
            symbols=[s for s in e.symbols if s['info']&15==2 and 'legacy_buy_handler'in s['name']]
            assert len(symbols)==1
            s=symbols[0];return e.window(s['value'],s['value']+s['size'])
        mixed_handler=body(mixed)
        oc=collections.Counter(r['signature']for r in wm.windows(original))
        cpi_shape=legacy.key(ow[452576]);conversion_shape=legacy.key(ow[620712])
        def ownership(e,w,table):
            cp=next(x['pc']for x in w['direct']if legacy.key(table[x['target']])==cpi_shape)
            conversion=next(x['pc']for x in w['direct']if x['pc']>cp and legacy.key(table[x['target']])==conversion_shape)
            captures=e.b[cp+8:cp+24]==bytes.fromhex('bf07000000000000bf16000000000000')
            after=e.b[conversion+8:conversion+32]
            drops=after[:4]==bytes.fromhex('15070300')and after[8:12]==bytes.fromhex('79620000')
            return [captures,drops]
        assert ownership(o,original_handler,ow)==[True,True]
        for label in ['parent','composed','repeat']:
            path=root/(label+'.so');path.write_bytes(images[label][1]);e=reader.Elf(path);w=body(e);table=legacy.windows(e)
            assert w['end']-w['start']==13784 and legacy.key(w)==legacy.key(mixed_handler)
            assert legacy.key(w)!=legacy.key(original_handler)
            profile=legacy.source_profile(e,w)
            assert profile==legacy.source_profile(o,original_handler)and sum(profile.values())==7
            assert legacy.cpi_origin(e,w)==legacy.cpi_origin(o,original_handler)==[('programs/mayhem-program/src/instructions/pump_interface.rs',6008,2,313,58,0)]
            assert ownership(e,w,table)==[True,True]
            assert len(w['direct'])==50
            assert collections.Counter(legacy.key(table[x['target']])for x in w['direct'])==collections.Counter(legacy.key(ow[x['target']])for x in original_handler['direct'])
            cc=collections.Counter(r['signature']for r in wm.windows(images[label][1]))
            cardinality=sum(min(n,cc[k])for k,n in oc.items())
            assert cardinality==(431 if label=='parent'else 432)
            records[label]=dict(handler_bytes=13784,original_bytes=13848,local_callees=50,Source_records=sorted([list(k)+[v]for k,v in profile.items()]),CPI_origin_line=313,
                ownership=[True,True],same_normalized_partial_body_as_qualified=True,injective_window_shape_cardinality=cardinality,
                scope='Distinct window-shape assignment only, not call-graph or data-graph isomorphism; no complete Legacy Buy body.')
    return records

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--static-only',action='store_true');a=p.parse_args()
    manifest_check();result=static();assert result==json.loads(unzip(P/'observations.json.gz'))
    if a.static_only:
        print('PASS: static composition and negative controls only; no runtime/signature replay')
    else:
        checker=module('composition_runtime',P/'runtime_check.py');runtime=checker.check()
        assert runtime==load(P/'runtime-results.json')
        print('PASS: current native ownership composition, injective shapes, typed references and saved signatures; whole core remains 0/4')

if __name__=='__main__':main()
