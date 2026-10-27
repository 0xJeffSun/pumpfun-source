"""Fail-closed offline verification; no compiler, VM, Git or network fallback."""
import argparse
from collections import Counter
import difflib
import gzip
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import shlex
import sys
import tarfile
import tempfile
import tomllib

if not __debug__:
    raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode = True
from source import inputs, recover
from static import functions, inherited, inspect, key, module
from runtime_check import check

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
CURRENT = ROOT/'research/mayhem-initializer-current-recovery-20261027'
MACRO = ROOT/'research/mayhem-historical-macro-current-20261027'
TRADE = ROOT/'research/mayhem-trade-origins-validator'
sha = lambda b: hashlib.sha256(b).hexdigest()
raw = lambda p: gzip.decompress(p.read_bytes()) if p.suffix=='.gz' else p.read_bytes()
load = lambda p: json.loads(raw(p))


def archive(path):
    files = {}
    with tarfile.open(fileobj=io.BytesIO(path.read_bytes()),mode='r:gz') as tar:
        for member in tar:
            n = PurePosixPath(member.name)
            assert member.isfile() and not n.is_absolute() and '..' not in n.parts
            assert str(n)==member.name and member.name not in files
            files[member.name] = tar.extractfile(member).read()
    return files


def parent():
    before = archive(CURRENT/'source.tar.gz')
    for name in ('curve-accounts/src/interface_definition.rs','curve-accounts/idls/pump.json'):
        before[name] = raw(MACRO/'sources'/(name+'.gz'))
    assert {n:sha(b) for n,b in before.items()} == load(CURRENT/'builds/historical/launch.json')['source_inputs']
    return before


def manifest():
    paths = list(P.rglob('*'))
    assert not any(p.is_symlink() for p in paths), 'packet symlink'
    assert all(p.is_file() or p.is_dir() for p in paths), 'packet special file'
    assert load(P/'manifest.json') == {p.relative_to(P).as_posix():sha(p.read_bytes())
        for p in paths if p.is_file() and p!=P/'manifest.json'}, 'packet manifest'
    for n,h in load(P/'external-inputs.json').items():
        assert sha((ROOT/n).read_bytes())==h, n


def host():
    old = ROOT/'research/mayhem-historical-macro-context'
    tree = load(old/'source-tree.json')
    files = {r['path']:raw(old/('historical/'+r['path']+'.gz')) for r in tree['files']}
    assert len(files)==121
    for r in tree['files']:
        b = files[r['path']]
        assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['sha']
    files['Cargo.toml'] = raw(P/'host/Cargo.toml.gz')
    files['Cargo.lock'] = raw(P/'host/Cargo.lock.gz')
    assert files['Cargo.lock']==raw(old/'host/host-build-03/Cargo.lock.gz')
    docs = [tomllib.loads(b.decode()) for b in (files['Cargo.toml'],raw(old/'host/host-build-03/Cargo.toml.gz'))]
    for doc in docs:
        for item in doc['patch']['crates-io'].values():item['path']=item['path'].replace('\\','/').rsplit('/',1)[-1]
    assert docs[0]==docs[1]
    launch, result = load(P/'host/launch.json'),load(P/'host/result.json')
    assert launch['source_revision']==tree['revision'] and launch['source_inputs']=={n:sha(b) for n,b in files.items()}
    assert result['returncode']==0 and result['source_unchanged']
    macro = raw(P/'host/macro.dylib.gz')
    assert sha(macro)==result['outputs']['target/release/libanchor_attribute_program.dylib']
    assert macro[:4]==bytes.fromhex('cffaedfe')
    assert all(a in launch['command'] for a in ('--locked','--offline','anchor-attribute-program'))
    commands = [shlex.split(s.split('Running `',1)[1].rsplit('`',1)[0])
                for s in raw(P/'host/stderr.gz').decode().splitlines() if 'Running `' in s]
    crates = [a[a.index('--crate-name')+1] for a in commands if '--crate-name' in a]
    assert all(crates.count(n)==1 for n in ('anchor_attribute_program','anchor_syn','anchor_lang_idl','anchor_lang_idl_spec'))
    supplements = {}
    for package in load(old/'supplement-packages.json'):
        path = old/('supplements/'+package['name']+'-'+package['version']+'.crate')
        assert sha(path.read_bytes())==package['checksum']
        with tarfile.open(path) as tar:
            for m in tar:
                if m.isfile():supplements[m.name]=sha(tar.extractfile(m).read())
    assert supplements==load(P/'host/supplement-inputs.json')
    return sha(macro)


def builds(before, after):
    macro = host()
    prior = load(TRADE/'builds/recovered/launch.json')
    expected_tools = {Path(n).name:h for n,h in prior['checked_tools'].items()}
    prefix='lib/rustlib/sbpf-solana-solana/'
    target={n.removeprefix(prefix):h for n,h in prior['target_inputs']['files'].items()}
    outputs={}
    for role in ('control','recovered','repeat'):
        d=P/'builds'/role;launch=load(d/'launch.json');result=load(d/'result.json')
        source = before if role=='control' else after
        assert launch['source_inputs']=={n:sha(b) for n,b in source.items()}
        assert launch['controller_sha256']==sha((P/'build.py').read_bytes())
        assert launch['target_libraries']==target and len(target)==26
        for name in ('rustc','rustdoc','cargo','clang','llvm-ar'):
            assert [h for n,h in launch['checked_tools'].items() if Path(n).name==name]==[expected_tools[name]]
        assert expected_tools['llvm-objcopy'] in launch['checked_tools'].values()
        assert macro in launch['checked_tools'].values()
        assert sha((d/'rustc-wrapper.py').read_bytes()) in launch['checked_tools'].values()
        assert all(a in launch['command'] for a in ('--locked','--offline','sbpf-solana-solana'))
        assert launch['environment_overrides']['CARGO_NET_OFFLINE']=='true'
        assert result['returncode']==0 and all(result[k] for k in (
            'source_unchanged','tools_unchanged','target_libraries_unchanged','historical_macro_dependencies_unchanged'))
        assert result['build_log_sha256']==sha(raw(d/'build.log.gz'))
        assert raw(d/'build.log.gz').count(b'--crate-name mayhem_recovered ')==1
        assert (d/'ordered.ld').read_bytes()==(TRADE/'config/ordered.ld').read_bytes()
        assert launch['historical_macro_dependencies']==load(P/'builds/control/launch.json')['historical_macro_dependencies']
        invocation=load(d/'mayhem_recovered-invocation.json')
        assert invocation['forwarded'][:len(invocation['incoming'])]==invocation['incoming']
        assert invocation['forwarded'][-2]=='-L' and invocation['forwarded'][-1].endswith('/historical-native-macro-a/target/release/deps')
        outputs[role]=tuple(raw(P/f'artifacts/{role}/{n}.so.gz') for n in ('candidate','symbols'))
        for name,b in zip(('candidate','symbols'),outputs[role]):assert result[name+'_sha256']==sha(b)
        assert result['candidate_bytes']==len(outputs[role][0])
    curve=load(P/'builds/control/curve_accounts-invocation.json')
    assert any(a.startswith('historical_anchor_program=') for a in curve['forwarded'])
    assert outputs['recovered']==outputs['repeat']
    assert outputs['control']==tuple(raw(CURRENT/f'builds/historical/{n}.so.gz') for n in ('candidate','symbols'))
    return outputs


def verify(runtime=True, manifest_check=True):
    if manifest_check:manifest()
    before,after=parent(),archive(P/'source.tar.gz')
    assert len(before)==len(after)==67 and after==recover(before)
    assert {n:sha(b) for n,b in after.items()}==load(P/'source-inputs.json')
    changes=sorted(n for n in before if before[n]!=after[n])
    assert changes==['src/instructions/fee_recipients.rs','src/lib.rs']
    assert {p.relative_to(P/'overrides').as_posix():p.read_bytes() for p in (P/'overrides').rglob('*') if p.is_file()}=={n:after[n] for n in changes}
    patch=''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n)) for n in changes)
    assert (P/'source.patch').read_bytes()==patch.encode()
    outputs=builds(before,after)
    original=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes()
    progress=module('sweep_progress',TRADE/'progress.py').compare(original,outputs['control'][1],outputs['recovered'][1])
    assert progress==load(P/'progress.json')
    assert (progress['matches'],progress['raw_matches'])==(430,141)
    assert not progress['gains'] and progress['positive_direct_edges_after']==4295 and progress['positive_Source_records_after']==448
    reader=module('sweep_reader',TRADE/'reader.py')
    with tempfile.TemporaryDirectory() as directory:
        paths={}
        for role,pair in outputs.items():
            for name,b in zip(('candidate','symbols'),pair):
                p=Path(directory)/(role+'-'+name+'.so');p.write_bytes(b);paths[role,name]=p
            a,b=[reader.Elf(paths[role,n]) for n in ('candidate','symbols')]
            allocated=lambda e:{s['name']:(s['address'],s['size'],e.b[s['offset']:s['offset']+s['size']]) for s in e.sections if s['flags']&2 and s['type']!=8}
            assert allocated(a)==allocated(b)
        path=paths['recovered','symbols']
        assert inspect(path)==load(P/'static.json')
        assert inherited(path)==load(P/'inherited.json')
        assert module('sweep_initializer',CURRENT/'analysis.py').inspect(ROOT,CURRENT,paths['control','symbols'],path)==load(P/'initializer.json')
        ow=reader.Elf(ROOT/'evidence/original/mayhem/deployed.so')
        rows=load(TRADE/'audit.json')['rows']
        oc=Counter(key(ow.window(r['start'],r['end'])) for r in rows)
        cc=Counter(key(w) for w in functions(reader.Elf(path)).values())
        assert sum((oc & cc).values())==430, 'injective body capacity'
        baseline=Counter(key(w) for w in functions(reader.Elf(paths['control','symbols'])).values())
        assert sum((baseline & cc).values())==444
        assert sorted(k[0] for k in (baseline-cc).elements())==[4408,4712,7272]
        assert sorted(k[0] for k in (cc-baseline).elements())==[8864,9352]
    summary=dict(changed_sources=2,normalized_matches=430,raw_local_matches=141,
                 unmatched=11,new_complete_matches=0,whole_original_equal=False,
                 compiler_executed=False,target_executed=False)
    if runtime:
        binaries=dict(original=sha(original),control=sha(outputs['control'][0]),candidate=sha(outputs['recovered'][0]))
        sweeps=[check(load(P/f'runtime/{n}.json.gz'),n,binaries,sha((P/'replay_sweeps.py').read_bytes())) for n in ('sweeps','rates')]
        assert sweeps==load(P/'sweep-runtime-summary.json')
        trade=module('sweep_trade_check',ROOT/'research/mayhem-accounting-extend-recovery/verify.py')
        # This helper's imports are resolved explicitly without selecting another packet's source.py.
        attest=module('sweep_trade_attest',P/'trade_attest.py')
        trades=[]
        for name in trade.EXPECTED:
            report=load(P/f'runtime/trades/{name}.json.gz')
            trades.append(trade.check_trade_receipts(name,report,outputs['recovered'][0],ROOT))
            for row in report['cases']:
                for side in ('original','candidate'):attest.attest(row[side],binaries[side])
                assert attest.logs(row['original'])==attest.logs(row['candidate'])
        assert trades==load(P/'trade-runtime-summary.json')
        assert sum(r['cases'] for r in trades)==sum(r['exact_noncompute_logs'] for r in trades)==6636
        commands=load(P/'runtime/trades/commands.json')
        assert commands['candidate_sha256']==binaries['candidate']
        assert {r['family']:(r['returncode'],r['cases'],r['mismatches']) for r in commands['runs']}=={n:(0,c,0) for n,c in trade.EXPECTED.items()}
        summary.update(sweeps=sweeps,trade_cases=6636,signed_trade_records=13272)
    return summary


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--skip-runtime',action='store_true')
    parser.add_argument('--materialize',type=Path)
    args=parser.parse_args()
    print(json.dumps(verify(not args.skip_runtime),indent=2))
    if args.materialize:
        args.materialize.mkdir(parents=True,exist_ok=False)
        for n,b in archive(P/'source.tar.gz').items():
            p=args.materialize/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
