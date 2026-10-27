"""Verify saved builds, full receipts and negative controls without executing target code."""
import argparse
import difflib
import gzip
import hashlib
import io
import json
import lzma
from pathlib import Path,PurePosixPath
import sys
import tarfile
import tempfile

if not __debug__:raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
from source import ROOT,parent,recover,archive,module
from analysis import inspect

P=Path(__file__).resolve().parent
CURRENT=ROOT/'research/mayhem-quotes-current-recovery-20261027'
SWEEP=ROOT/'research/mayhem-sweep-failure-recovery'
TRADE=ROOT/'research/mayhem-trade-origins-validator'
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):
    b=p.read_bytes()
    return gzip.decompress(b) if p.suffix=='.gz' else lzma.decompress(b) if p.suffix=='.xz' else b
load=lambda p:json.loads(raw(p))


def manifest():
    paths=list(P.rglob('*'))
    assert not any(p.is_symlink() for p in paths)
    assert all(p.is_dir() or p.is_file() for p in paths)
    assert load(P/'manifest.json')=={p.relative_to(P).as_posix():sha(p.read_bytes()) for p in paths if p.is_file() and p!=P/'manifest.json'}
    for n,h in load(P/'external-inputs.json').items():assert sha((ROOT/n).read_bytes())==h,n


def build_record(launch,result,log,sources):
    prior=load(TRADE/'builds/recovered/launch.json')
    tools={Path(n).name:h for n,h in prior['checked_tools'].items()}
    target={n.removeprefix('lib/rustlib/sbpf-solana-solana/'):h for n,h in prior['target_inputs']['files'].items()}
    assert launch['source_inputs']=={n:sha(b) for n,b in sources.items()}
    assert launch['controller_sha256']==sha((P/'build.py').read_bytes())
    assert launch['target_libraries']==target and len(target)==26
    for name in ('rustc','rustdoc','cargo','clang','llvm-ar'):
        assert [h for n,h in launch['checked_tools'].items() if Path(n).name==name]==[tools[name]]
    assert tools['llvm-objcopy'] in launch['checked_tools'].values()
    assert [h for n,h in launch['checked_tools'].items() if Path(n).name=='rust-lld']==['79b0272b505cb5084ef6d160ea7e773ba0b2bd861c4c1af454a97e9c1cddc6af']
    assert all(a in launch['command'] for a in ('--locked','--offline','sbpf-solana-solana'))
    assert launch['environment_overrides']['CARGO_NET_OFFLINE']=='true'
    assert all(result[k] for k in ('source_unchanged','tools_unchanged','target_libraries_unchanged'))
    assert sha(log)==result['build_log_sha256']
    assert log.count(b'--crate-name mayhem_recovered ')>0


def controls(before):
    files={}
    with tarfile.open(P/'controls.tar.xz','r:xz') as tar:
        for m in tar:
            n=PurePosixPath(m.name)
            assert m.isfile() and not n.is_absolute() and '..' not in n.parts and str(n)==m.name and m.name not in files
            files[m.name]=tar.extractfile(m).read()
    assert {n:sha(b) for n,b in files.items()}==load(P/'controls-index.json')
    labels=sorted(n[:-len('/build/result.json')] for n in files if n.endswith('/build/result.json'))
    reader=module('controls_reader',TRADE/'reader.py')
    original=reader.Elf(ROOT/'evidence/original/mayhem/deployed.so');on,op=original.norm(65472,66384)
    scores=[];failed=[]
    with tempfile.TemporaryDirectory() as td:
        path=Path(td)/'symbols.so'
        for name in labels:
            launch=json.loads(files[name+'/build/launch.json']);result=json.loads(files[name+'/build/result.json'])
            src=dict(before)
            prefix=name+'/overrides/'
            src.update({n[len(prefix):]:b for n,b in files.items() if n.startswith(prefix)})
            build_record(launch,result,files[name+'/build/build.log'],src)
            assert files[name+'/build/ordered.ld']==(TRADE/'config/ordered.ld').read_bytes()
            if result['returncode']:
                assert result['returncode']==101 and b'error[E0308]' in files[name+'/build/build.log']
                assert name+'/build/symbols.so' not in files and name+'/measurement.json' not in files
                failed.append(dict(name=name,returncode=101));continue
            a,b=[files[name+'/build/'+n+'.so'] for n in ('candidate','symbols')]
            assert sha(a)==result['candidate_sha256'] and sha(b)==result['symbols_sha256'] and len(a)==result['candidate_bytes']
            path.write_bytes(b);e=reader.Elf(path)
            fs=[s for s in e.symbols if '14validate_sweep' in s['name'] and s['info']&15==2]
            assert len(fs)==1;f=fs[0];cn,cp=e.norm(f['value'],f['value']+f['size'])
            aa=[on[i:i+8] for i in range(0,len(on),8)];bb=[cn[i:i+8] for i in range(0,len(cn),8)]
            score=dict(name=name,start=f['value'],bytes=f['size'],equal=(on,op)==(cn,cp),equal_slots=sum(a==b for a,b in zip(aa,bb)),aligned_slots=sum(x.size for x in difflib.SequenceMatcher(a=aa,b=bb,autojunk=False).get_matching_blocks()))
            assert score==json.loads(files[name+'/measurement.json']) and not score['equal']
            scores.append(score)
    report=dict(successful_builds=len(scores),failed_builds=failed,scores=scores)
    assert report==load(P/'controls-summary.json') and len(scores)==90 and len(failed)==8
    return dict(successful_builds=90,failed_builds=8,complete_helper_matches=0)


def verify(runtime=True,check_manifest=True,check_controls=True):
    if check_manifest:manifest()
    before=parent();after=archive(P/'source.tar.gz')
    assert after==recover(before) and {n:sha(b) for n,b in after.items()}==load(P/'source-inputs.json')
    changes=sorted(n for n in before if before[n]!=after[n])
    assert changes==['src/instructions/fee_recipients.rs','src/lib.rs']
    assert {p.relative_to(P/'overrides').as_posix():p.read_bytes() for p in (P/'overrides').rglob('*') if p.is_file()}=={n:after[n] for n in changes}
    patch=''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n)) for n in changes)
    assert patch.encode()==(P/'source.patch').read_bytes()
    outputs={}
    for role in ('control','recovered','repeat'):
        d=P/'builds'/role;launch=load(d/'launch.json');result=load(d/'result.json')
        build_record(launch,result,raw(d/'build.log.gz'),before if role=='control' else after)
        assert result['returncode']==0 and raw(d/'build.log.gz').count(b'--crate-name mayhem_recovered ')==1
        assert (d/'ordered.ld').read_bytes()==(TRADE/'config/ordered.ld').read_bytes()
        outputs[role]=tuple(raw(d/(n+'.so.gz')) for n in ('candidate','symbols'))
        assert [sha(b) for b in outputs[role]]==[result[n+'_sha256'] for n in ('candidate','symbols')]
        assert len(outputs[role][0])==result['candidate_bytes']
    assert outputs['control']==tuple(raw(CURRENT/'builds/current'/(n+'.so.gz')) for n in ('candidate','symbols'))
    assert outputs['recovered']==outputs['repeat']
    original=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes()
    progress=module('current_rate_progress',TRADE/'progress.py').compare(original,outputs['control'][1],outputs['recovered'][1])
    assert progress==load(P/'progress.json') and progress['matches']==432 and progress['raw_matches']==100 and not progress['gains']
    reader=module('rate_image_reader',TRADE/'reader.py')
    with tempfile.TemporaryDirectory() as td:
        td=Path(td)
        for role,pair in outputs.items():
            for name,data in zip(('candidate','symbols'),pair):(td/(role+'-'+name+'.so')).write_bytes(data)
            a,b=[reader.Elf(td/(role+'-'+name+'.so')) for name in ('candidate','symbols')]
            allocated=lambda e:{s['name']:(s['address'],s['size'],e.b[s['offset']:s['offset']+s['size']]) for s in e.sections if s['flags']&2 and s['type']!=8}
            assert allocated(a)==allocated(b)
        assert inspect(td/'control-symbols.so',td/'recovered-symbols.so')==load(P/'analysis.json')
    summary=dict(normalized_matches=432,raw_matches=100,new_complete_matches=0,remaining=9,
                 helper_bytes=912,helper_differing_slots=19,helper_blocks=22,typed_references=11,
                 compiler_executed=False,target_executed=False,whole_elf_equal=False)
    if check_controls:summary['controls']=controls(before)
    if runtime:
        # The original runner is retained unchanged in the merged sweep packet.
        sys.path.insert(0,str(SWEEP))
        sweep=module('current_rate_runtime',SWEEP/'runtime_check.py')
        trade=module('current_rate_trade',ROOT/'research/mayhem-accounting-extend-recovery/verify.py')
        attest=module('current_rate_attest',SWEEP/'trade_attest.py')
        binaries=dict(original=sha(original),control=sha(outputs['control'][0]),candidate=sha(outputs['recovered'][0]))
        suites=[sweep.check(load(P/f'runtime/{n}.json.gz'),n,binaries,sha((SWEEP/'replay_sweeps.py').read_bytes())) for n in ('sweeps','rates')]
        assert suites==load(P/'sweep-runtime-summary.json')
        execution=load(P/'runtime/execution.json')
        assert execution['binaries']==binaries and execution['runner_sha256']==sha((SWEEP/'replay_sweeps.py').read_bytes())
        reports=[]
        for name,count in trade.EXPECTED.items():
            report=load(P/f'runtime/trades/{name}.json.gz')
            row=trade.check_trade_receipts(name,report,outputs['recovered'][0],ROOT)
            assert row['exact_noncompute_logs']==count;reports.append(row)
            for case in report['cases']:
                for side in ('original','candidate'):attest.attest(case[side],binaries[side])
                assert attest.logs(case['original'])==attest.logs(case['candidate'])
        assert reports==load(P/'trade-runtime-summary.json') and sum(r['cases'] for r in reports)==6636
        commands=load(P/'runtime/trades/commands.json')
        assert commands['candidate_sha256']==binaries['candidate']
        assert {r['family']:(r['returncode'],r['cases'],r['mismatches']) for r in commands['runs']}=={n:(0,c,0) for n,c in trade.EXPECTED.items()}
        summary.update(sweep_cases=692,rate_cases=150,trade_cases=6636,signed_records=15798,repaired_diagnostics=58)
    return summary


if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--skip-runtime',action='store_true');p.add_argument('--materialize',type=Path);a=p.parse_args()
    print(json.dumps(verify(not a.skip_runtime),indent=2))
    if a.materialize:
        a.materialize.mkdir(parents=True,exist_ok=False)
        for n,b in archive(P/'source.tar.gz').items():
            path=a.materialize/n;path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(b)
