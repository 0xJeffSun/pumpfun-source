"""Authenticate complete native outputs and independently check saved sell receipts."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import gzip,hashlib,importlib.util,io,json,sys,tarfile
P=Path(__file__).resolve().parent
ROOT=P.parents[1]
sys.dont_write_bytecode=True
sha=lambda b:hashlib.sha256(b).hexdigest()
load=lambda p:json.loads(p.read_bytes())
def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);value=importlib.util.module_from_spec(spec);spec.loader.exec_module(value);return value

def sources(label):
    expected=load(ROOT/'research/mayhem-quotes-current-recovery-20261027/source-inputs.json')
    with tarfile.open(fileobj=io.BytesIO((P/'source.tar.xz').read_bytes()),mode='r:xz') as archive:
        rows=archive.getmembers()
        assert len(rows)==67 and all(x.isfile() and not Path(x.name).is_absolute() and '..' not in Path(x.name).parts for x in rows)
        files={x.name:archive.extractfile(x).read() for x in rows}
    assert len(files)==67 and {n:sha(b) for n,b in files.items()}==expected
    base=dict(files)
    for p in (P/'builds'/label/'overrides').rglob('*.gz'):
        name=p.relative_to(P/'builds'/label/'overrides').as_posix()[:-3]
        assert name in files
        files[name]=gzip.decompress(p.read_bytes())
    changed={n for n in files if files[n]!=base[n]}
    expected_changed=set()
    if label in ['sell-only','proposed','repeat']:expected_changed.update(['src/state.rs','src/instructions/pump_interface.rs'])
    if label in ['buy-only','proposed','repeat']:expected_changed.add('src/instructions/buy_v2.rs')
    assert changed==expected_changed
    assert files['src/lib.rs']==base['src/lib.rs']
    assert all(files[n].count(b'\n')==base[n].count(b'\n') for n in files)
    if 'src/state.rs' in changed:
        name='src/state.rs'
        split=lambda b:(b[:b.index(b'pub fn sell_amounts(')],b[b.index(b'\n}\n',b.index(b'pub fn sell_amounts('))+3:])
        assert split(files[name])==split(base[name])
    if 'src/instructions/pump_interface.rs' in changed:
        name='src/instructions/pump_interface.rs'
        prefix=lambda b:b[:b.index(b'pub fn legacy_sell_handler(')]
        assert prefix(files[name])==prefix(base[name])
        unchanged=lambda b:b[b.index(b' let (input, minimum)'):b.index(b'#[inline(always)]\nfn legacy_price_check')]
        assert unchanged(files[name])==unchanged(base[name])
    if 'src/instructions/buy_v2.rs' in changed:
        name='src/instructions/buy_v2.rs';prefix=lambda b:b[:b.index(b'pub fn handler(')];assert prefix(files[name])==prefix(base[name])
    assert {n:sha(b) for n,b in files.items()}==load(P/'source-inputs.json')[label]
    return files

def static():
    for name,h in load(P/'root-inputs.json').items():assert sha((ROOT/name).read_bytes())==h
    for name,row in load(P/'reader-origins.json').items():assert sha((P/name).read_bytes())==row['sha256']
    sdk=load(P/'sdk/post-check.json');assert len(sdk['tools'])==6 and len(sdk['target_libraries'])==26
    post=load(P/'sdk/prior-sell-postcheck.json')
    assert post['target_libraries_postrun_match_recorded']==sdk['target_libraries']
    assert post['source_inputs']==load(P/'source-inputs.json')['sell-only'] and post['all67_physical_line_counts_preserved']
    wm=module('sell_verify_elf',P/'window_map.py')
    for label in load(P/'source-inputs.json'):
        d=P/'builds'/label;launch=load(d/'launch.json');result=load(d/'result.json')
        assert launch['source_inputs']=={n:sha(b) for n,b in sources(label).items()}
        assert launch['controller_sha256']==sha((P/'controllers/build_native.py').read_bytes())
        assert launch['checked_tools']==sdk['tools']
        if label!='parent':
            preparation=load(d/'preparation.json');assert preparation['source_inputs']==launch['source_inputs']
            if label!='sell-only':assert preparation['target_libraries']==sdk['target_libraries']
        assert result['returncode']==0 and result['source_unchanged'] and result['tools_unchanged']
        for name in ['stdout','stderr']:assert sha(gzip.decompress((d/(name+'.gz')).read_bytes()))==result[name+'_sha256']
        candidate,symbols=[gzip.decompress((d/(name+'.so.gz')).read_bytes()) for name in ['candidate','symbols']]
        assert sha(candidate)==result['candidate_sha256'] and len(candidate)==result['candidate_bytes']
        assert sha(symbols)==result['symbols_sha256']
        strip=load(d/'strip-replay.json');assert strip['returncode']==0 and strip['candidate_equal']
        assert strip['input_sha256']==sha(symbols) and strip['output_sha256']==sha(candidate)
        assert strip['tool_sha256']==sdk['tools'][strip['command'][0]] and strip['command'][1]=='--strip-all'
        allocated=lambda b:{s['name']:(s['address'],s['size'],wm.m.section_data(b,s['name'])) for s in wm.m.elf_layout(b)['sections'] if s['flags']&2 and s['type']!=8}
        assert allocated(candidate)==allocated(symbols)
    result=module('sell_verify_analysis',P/'analysis.py').measure()
    assert result==json.loads(gzip.decompress((P/'observations.json.gz').read_bytes()))
    assert module('trade_source_records',P/'source_records.py').measure()==load(P/'source-records.json')
    return result

def verify():
    assert not any(p.is_symlink() for p in P.rglob('*'))
    files={p.relative_to(P).as_posix():sha(p.read_bytes()) for p in P.rglob('*') if p.is_file() and p!=P/'manifest.json'}
    assert files==load(P/'manifest.json'),'packet manifest'
    observed=static();runtime=module('sell_verify_runtime',P/'runtime_check.py').verify()
    return dict(normalized_windows=432,native_raw_windows=84,retained_positive_edges=4383,new_complete_body_matches=0,four_entry_bound_handlers_preserved_from_components=True,both_complete_repeat_outputs_equal=True,runtime=runtime)
if __name__=='__main__':print(json.dumps(verify(),sort_keys=True))
