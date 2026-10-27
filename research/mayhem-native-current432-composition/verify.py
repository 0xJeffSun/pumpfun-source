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
        controller='replay_historical_linux_432.py'if label in ['composed','repeat']else'build_native.py'
        assert launch['controller_sha256']==sha((P/'controllers'/controller).read_bytes())
        assert result['returncode']==0 and result['source_unchanged']and result['tools_unchanged']
        if label in ['composed','repeat']:
            assert result['dependencies_unchanged']
            assert launch['macro_sha256']==sha(unzip(P/'host-macro.so.gz'))=='3b0a5efc2cf5a15ac9b198ab2a6aa66650ababe46ee615a1bc45c796b1a7de31'
            assert launch['command'][launch['command'].index('--crate-name')+1]=='mayhem_recovered'
        else:
            for name in ['stdout','stderr']:assert result[name+'_sha256']==sha(unzip(d/(name+'.gz')))
        candidate,symbols=(unzip(d/(n+'.so.gz'))for n in ['candidate','symbols'])
        assert sha(candidate)==result['candidate_sha256']and sha(symbols)==result['symbols_sha256']
        if 'candidate_bytes'in result:assert len(candidate)==result['candidate_bytes']
        observations[label]=reference.observe(wm,original,ow,candidate,symbols);images[label]=(candidate,symbols)
        cw=wm.windows(symbols)
        legacy=next(r for r in cw if r['name']and'legacy_sell_handler'in r['name'])
        original_legacy=next(r for r in ow if r['address']==127520)
        oc=reference.calls(wm,original,original_legacy,ow)
        cc=reference.calls(wm,symbols,legacy,cw)
        observations[label]['legacy_sell']=dict(original_bytes=12992,candidate_bytes=legacy['bytes'],
            complete_equal=legacy['signature']==original_legacy['signature'],
            original_calls=oc,candidate_calls=cc,
            callee_multiset_equal=collections.Counter(map(reference.identity,oc))==collections.Counter(map(reference.identity,cc)))
    parent=observations['parent']
    assert parent['candidate_sha256']=='3c38a0607b3523c62a02e699a530c2945d3e190947edda09176b2dc17777c1d6'
    assert parent['symbols_sha256']=='1f8206f94d6ec3193ac92b71ab9abe3e5095c5d8e2721c61bf8fa2db1ec08e63'
    for label,row in observations.items():
        assert row['matched_windows']==432 and row['matched_original']==parent['matched_original']
        assert not row['whole_file_equal']and not row['meaningful_elf_equal']
        assert not row['legacy_sell']['complete_equal']
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
    assert observations['composed']['candidate_sha256']=='9d6b9032858aae91b63c95b496f9819501de0e0069edc323f3e609d734f445b8'
    assert images['parent']==images['legacy-sell-retained-error432']
    assert images['legacy-sell-value-price432']==images['legacy-sell-value64-price432']
    return observations

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--static-only',action='store_true');a=p.parse_args()
    manifest_check();result=static();assert result==json.loads(unzip(P/'observations.json.gz'))
    if a.static_only:
        print('PASS: static composition and negative controls only; no runtime/signature replay')
    else:
        checker=module('composition_runtime',P/'runtime_check.py');runtime=checker.check()
        assert runtime==load(P/'runtime-results.json')
        print('PASS: native432 composition, typed references, saved independent checks and signatures; whole core remains 0/4')

if __name__=='__main__':main()
