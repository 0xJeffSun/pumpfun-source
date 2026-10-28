"""Read-only source, compiler-artifact, construction-order and signed-receipt verification."""
import argparse
import difflib
import gzip
import hashlib
import io
import json
import lzma
from pathlib import Path,PurePosixPath
import re
import subprocess
import sys
import tarfile
import tempfile

if not __debug__:raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
from source import ROOT,FILE,parent,recover,archive,module
from analysis import TRADE,inspect,functions,measure,seed_control
P=Path(__file__).resolve().parent
CURRENT=ROOT/'research/mayhem-quotes-current-recovery-20261027'
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):
    b=p.read_bytes()
    return gzip.decompress(b) if p.suffix=='.gz' else lzma.decompress(b) if p.suffix=='.xz' else b
load=lambda p:json.loads(raw(p))

def manifest():
    paths=list(P.rglob('*'))
    assert not any(p.is_symlink() for p in paths)
    assert all(p.is_file() or p.is_dir() for p in paths)
    assert load(P/'manifest.json')=={p.relative_to(P).as_posix():sha(p.read_bytes()) for p in paths if p.is_file() and p!=P/'manifest.json'}
    for n,h in load(P/'external-inputs.json').items():assert sha((ROOT/n).read_bytes())==h,n

def build_record(launch,result,log,sources):
    prior=load(TRADE/'builds/recovered/launch.json')
    tools={Path(n).name:h for n,h in prior['checked_tools'].items()}
    libraries={n.removeprefix('lib/rustlib/sbpf-solana-solana/'):h for n,h in prior['target_inputs']['files'].items()}
    assert launch['source_inputs']=={n:sha(b) for n,b in sources.items()}
    assert launch['controller_sha256']==sha((P/'build.py').read_bytes())
    assert launch['target_libraries']==libraries and len(libraries)==26
    for name in ('rustc','rustdoc','cargo','clang','llvm-ar'):
        assert [h for n,h in launch['checked_tools'].items() if Path(n).name==name]==[tools[name]]
    assert tools['llvm-objcopy'] in launch['checked_tools'].values()
    assert [h for n,h in launch['checked_tools'].items() if Path(n).name=='rust-lld']==['79b0272b505cb5084ef6d160ea7e773ba0b2bd861c4c1af454a97e9c1cddc6af']
    assert all(x in launch['command'] for x in ('--locked','--offline','sbpf-solana-solana'))
    assert launch['environment_overrides']['CARGO_NET_OFFLINE']=='true'
    assert all(result[k] for k in ('source_unchanged','tools_unchanged','target_libraries_unchanged'))
    assert result['build_log_sha256']==sha(log) and b'--crate-name mayhem_recovered ' in log

def controls(before):
    files={}
    with tarfile.open(P/'controls.tar.xz','r:xz') as tar:
        for m in tar:
            n=PurePosixPath(m.name)
            assert m.isfile() and not n.is_absolute() and '..' not in n.parts and str(n)==m.name and m.name not in files
            files[m.name]=tar.extractfile(m).read()
    assert {n:sha(b) for n,b in files.items()}==load(P/'controls-index.json')
    reader=module('control_reader',TRADE/'reader.py');o=reader.Elf(ROOT/'evidence/original/mayhem/deployed.so')
    rows=load(TRADE/'audit.json')['rows'];ow={r['start']:o.window(r['start'],r['end']) for r in rows}
    successes=failures=0;causal={}
    with tempfile.TemporaryDirectory() as td:
        path=Path(td)/'symbols.so'
        for label in sorted(n[:-len('/build/result.json')] for n in files if n.endswith('/build/result.json')):
            launch=json.loads(files[label+'/build/launch.json']);result=json.loads(files[label+'/build/result.json'])
            src=dict(before);src[FILE]=files[label+'/source.rs'];prefix=label+'/overrides/'
            src.update({n[len(prefix):]:b for n,b in files.items() if n.startswith(prefix)})
            build_record(launch,result,files[label+'/build/build.log'],src)
            assert files[label+'/build/ordered.ld']==(TRADE/'config/ordered.ld').read_bytes()
            if result['returncode']:
                assert result['returncode']==101 and re.search(rb'error\[E(?:0382|0425|0716)\]',files[label+'/build/build.log'])
                assert label+'/build/symbols.so' not in files and label+'/measurement.json' not in files
                failures+=1;continue
            for name in ('candidate','symbols'):assert sha(files[label+'/build/'+name+'.so'])==result[name+'_sha256']
            path.write_bytes(files[label+'/build/symbols.so']);e=reader.Elf(path);ws=functions(e)
            matches={s['value'] for s in e.symbols if 'legacy_sell_handler17' in s['name'] and s['info']&15==2}
            assert len(matches)==1
            w=ws[matches.pop()]
            score=measure(o,ow,e,ws,w);assert score==json.loads(files[label+'/measurement.json']) and not score['equal']
            if label in ('baseline','named-seeds-inline-bump','inline-seeds-named-bump','inline-seeds'):
                causal[label]=seed_control(o,e,w)
            successes+=1
    result=dict(successful_builds=successes,failed_builds=failures)
    assert result==load(P/'controls-summary.json')==dict(successful_builds=39,failed_builds=4)
    assert causal==load(P/'seed-controls.json')
    return result

def receipts(report,candidate):
    checker=module('sell_receipt_fields',ROOT/'research/mayhem-accounting-extend-recovery/verify.py')
    attest=module('sell_program_binding',ROOT/'research/mayhem-sweep-failure-recovery/trade_attest.py')
    summary=checker.check_trade_receipts('sell',report,candidate,ROOT)
    assert summary['exact_noncompute_logs']==396
    for row in report['cases']:
        for side,h in [('original',report['original_sha256']),('candidate',sha(candidate))]:attest.attest(row[side],h)
    return summary

def verify(runtime=True,check_manifest=True):
    if check_manifest:manifest()
    before=parent();after=archive(P/'source.tar.gz')
    assert after==recover(before) and {n:sha(b) for n,b in after.items()}==load(P/'source-inputs.json')
    assert sorted(n for n in before if before[n]!=after[n])==[FILE]
    assert {p.relative_to(P/'overrides').as_posix():p.read_bytes() for p in (P/'overrides').rglob('*') if p.is_file()}=={FILE:after[FILE]}
    patch=''.join(difflib.unified_diff(before[FILE].decode().splitlines(True),after[FILE].decode().splitlines(True),fromfile='a/'+FILE,tofile='b/'+FILE))
    assert patch.encode()==(P/'source.patch').read_bytes()
    outputs={}
    for role in ('control','recovered','repeat'):
        d=P/'builds'/role;launch=load(d/'launch.json');result=load(d/'result.json');log=raw(d/'build.log.gz')
        build_record(launch,result,log,before if role=='control' else after)
        assert result['returncode']==0 and log.count(b'--crate-name mayhem_recovered ')==1
        assert (d/'ordered.ld').read_bytes()==(TRADE/'config/ordered.ld').read_bytes()
        outputs[role]=tuple(raw(d/(n+'.so.gz')) for n in ('candidate','symbols'))
        assert [sha(b) for b in outputs[role]]==[result[n+'_sha256'] for n in ('candidate','symbols')]
        assert len(outputs[role][0])==result['candidate_bytes']
    assert outputs['control']==tuple(raw(CURRENT/'builds/current'/(n+'.so.gz')) for n in ('candidate','symbols'))
    assert outputs['recovered']==outputs['repeat']
    original=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes()
    progress=module('sell_progress',TRADE/'progress.py').compare(original,outputs['control'][1],outputs['recovered'][1])
    assert progress==load(P/'progress.json') and progress['matches']==432 and progress['raw_matches']==100 and not progress['gains']
    reader=module('sell_allocated_reader',TRADE/'reader.py')
    result=dict(normalized_matches=432,raw_matches=100,new_complete_matches=0,remaining=9,seed_constructor_bytes=176,controls=controls(before),compiler_executed=False,target_executed=False,whole_elf_equal=False)
    with tempfile.TemporaryDirectory() as td:
        td=Path(td)
        for role,pair in outputs.items():
            for name,data in zip(('candidate','symbols'),pair):(td/(role+'-'+name+'.so')).write_bytes(data)
            a,b=[reader.Elf(td/(role+'-'+name+'.so')) for name in ('candidate','symbols')]
            allocated=lambda e:{s['name']:(s['address'],s['size'],e.b[s['offset']:s['offset']+s['size']]) for s in e.sections if s['flags']&2 and s['type']!=8}
            assert allocated(a)==allocated(b)
        assert inspect(td/'control-symbols.so',td/'recovered-symbols.so')==load(P/'analysis.json')
        if runtime:
            reports=[];original_records=[]
            for role,name in [('control','control'),('candidate','recovered')]:
                d=P/'runtime'/role;report=load(d/'sell.json.xz')
                assert report['original_sha256']==sha(original)
                reports.append(dict(role=role,**receipts(report,outputs[name][0])))
                original_records.append([r['original'] for r in report['cases']])
                # Execute only the frozen, read-only independent receipt checker.
                (td/'sell.json').write_bytes(raw(d/'sell.json.xz'))
                cmd=[sys.executable,'-B',str(ROOT/'scripts/verify_mayhem_sell.py'),'--candidate',str(td/(name+'-candidate.so')),'--receipts',str(td/'sell.json'),'--output',str(td/'check.json')]
                run=subprocess.run(cmd,capture_output=True,text=True);assert run.returncode==0,run.stderr
                assert load(td/'check.json')==load(d/'independent-verification.json')
            assert original_records[0]==original_records[1]
            result.update(runtime=reports,fresh_pair_comparisons=792,signed_records=1584)
    return result

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--skip-runtime',action='store_true');p.add_argument('--materialize',type=Path);a=p.parse_args()
    print(json.dumps(verify(not a.skip_runtime),indent=2))
    if a.materialize:
        a.materialize.mkdir(parents=True,exist_ok=False)
        for n,b in archive(P/'source.tar.gz').items():
            path=a.materialize/n;path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(b)
