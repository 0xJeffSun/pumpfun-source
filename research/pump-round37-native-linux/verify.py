"""Recompute the native Round37 inventory without a compiler, network or VM."""
from collections import Counter
import argparse
import gzip
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import posixpath
import struct
import sys
import tarfile
import tempfile

if not __debug__:raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):
    b=p.read_bytes();return gzip.decompress(b)if p.suffix=='.gz'else b
def load(p):return json.loads(read(p))

def archive(name):
    with tarfile.open(P/(name+'.tar.xz'))as t:
        members=t.getmembers()
        assert all(m.isfile() and not m.name.startswith('/') and '..'not in Path(m.name).parts for m in members)
        assert len({m.name for m in members})==len(members)
        entries={m.name:t.extractfile(m).read()for m in members}
    assert {n:sha(b)for n,b in entries.items()}==load(P/(name+'-inputs.json'))
    return entries

def method():
    spec=importlib.util.spec_from_file_location('native_round37_inventory',P/'inventory.py')
    value=importlib.util.module_from_spec(spec);spec.loader.exec_module(value);return value

def verify(original):
    assert not any(x.is_symlink()for x in P.rglob('*'))
    actual={x.relative_to(P).as_posix():sha(x.read_bytes())for x in P.rglob('*')if x.is_file()and x.name!='manifest.json'}
    assert actual==load(P/'manifest.json')
    cp=load(P/'CHECKPOINT.json');provenance=load(P/'provenance.json')
    assert sha(original.read_bytes())==cp['original_sha256']==provenance['original_sha256']
    primary,source=archive('primary'),archive('source')
    assert len(primary)==56 and {n:sha(b)for n,b in primary.items()}==cp['primary_source_sha256']
    text=primary['Cargo.toml'].decode();start=text.index('[profile.release]');end=text.index('[workspace]')
    assert not text[end+len('[workspace]'):].strip()
    expected={'programs/pump/'+n:b for n,b in primary.items()if n not in ['Cargo.toml','Cargo.lock']}
    expected.update({'programs/pump/Cargo.toml':(text[:start].rstrip()+'\n').encode(),
        'Cargo.toml':('[workspace]\nmembers = ["programs/pump"]\nresolver = "2"\n\n'+text[start:end].strip()+'\n').encode(),
        'Cargo.lock':primary['Cargo.lock']})
    assert expected==source
    for n in ['pump_compare_function_bytes.py','pump_quote_control_function_match.py']:
        assert sha((P/'reference/inputs/scripts'/n).read_bytes())==cp['input_python_sha256']['scripts/'+n]
    assert sha((P/'inputs/scripts/pump_physical_source_wrapper.py').read_bytes())==cp['input_python_sha256']['scripts/pump_physical_source_wrapper.py']
    m=method();reports={};sdk=None;outputs={}
    with tempfile.TemporaryDirectory()as td:
        td=Path(td)
        baseline=read(P/'reference/unstripped.so.gz');assert sha(baseline)==cp['unstripped_sha256']
        candidate=read(P/'reference/candidate.so.gz');assert sha(candidate)==cp['candidate_sha256']
        bp=td/'baseline.so';bp.write_bytes(baseline);iv=m.inventory(bp,original)
        assert iv==load(P/'reference/baseline-inventory.json.gz')
        assert (iv['injective_normalized'],iv['injective_raw'])==(744,175) and not iv['gains'] and not iv['losses']
        reports['published-round37']={k:v for k,v in iv.items()if k!='windows'}
        for label,target,count,raw in [('linux-sbpf-wrapper-executable','sbpf-solana-solana',749,131),
            ('linux-sbf','sbf-solana-solana',744,121),('linux-sbpf-repeat','sbpf-solana-solana',749,131)]:
            p=P/'builds'/label;launch,result=load(p/'launch.json.gz'),load(p/'result.json')
            assert result['exit_code']==0 and result['root_invocations']==1
            assert result['primary_unchanged'] and result['source_unchanged'] and result['sdk_unchanged']
            assert launch['primary_source_inputs']==cp['primary_source_sha256']
            assert launch['workspace_inputs']=={n:sha(b)for n,b in source.items()}
            assert launch['wrapper_sha256']==cp['input_python_sha256']['scripts/pump_physical_source_wrapper.py']
            if sdk is None:sdk=launch['sdk_inputs']
            else:assert sdk==launch['sdk_inputs']
            assert sdk['rust/bin/rustc']=='c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97'
            command=launch['command'];assert '--locked'in command and '--offline'in command
            assert command[command.index('--target')+1]==target
            log=read(p/'build.log.gz');assert sha(log)==result['build_log_sha256']
            assert log.count(b'--crate-name pump_recovered ')==1 and b'Finished `release`'in log
            assert b'exceeded max offset'not in log
            symbols,stripped=[read(p/(n+'.gz'))for n in ['unstripped.so','candidate.so']]
            assert sha(symbols)==result['unstripped_sha256'] and sha(stripped)==result['candidate_sha256']
            assert stripped!=original.read_bytes()
            ss,ts=m.sections(symbols),m.sections(stripped)
            for n in ['.text','.rodata','.data.rel.ro','.dynsym','.dynstr','.dynamic','.rel.dyn']:
                assert ss[n]['addr']==ts[n]['addr'] and ss[n]['size']==ts[n]['size']
                assert symbols[ss[n]['offset']:ss[n]['offset']+ss[n]['size']]==stripped[ts[n]['offset']:ts[n]['offset']+ts[n]['size']]
            path=td/(label+'.so');path.write_bytes(symbols);iv=m.inventory(path,original)
            assert (iv['injective_normalized'],iv['membership_normalized'],iv['injective_raw'])==(count,count,raw)
            assert not iv['losses']
            if label!='linux-sbpf-repeat':assert iv==load(p/'inventory.json.gz')
            if count==749:
                assert iv['gains']==[52816,1608904,1679776,1740328,1751480]
                gained=[r for r in iv['windows']if r['start']in iv['gains']]
                assert all(r['bytes']==56 and all(c['raw_sha256']==r['raw_sha256']for c in r['candidates'])for r in gained)
                common=gained[0]['candidates'];assert len(common)==4 and len({r['start']for r in common})==4
                assert all('7type_id'in c['symbols'][0]for r in gained for c in r['candidates'])
                assert sum(r['bytes']for r in iv['windows']if r['candidates'])==924472
            else:assert not iv['gains']
            outputs[label]=(symbols,stripped);reports[label]={k:v for k,v in iv.items()if k!='windows'}
        assert outputs['linux-sbpf-wrapper-executable']==outputs['linux-sbpf-repeat']
        failed=P/'builds/linux-sbpf';failure=load(failed/'result.json')
        assert failure['exit_code']==101 and failure['root_invocations']==0
        assert sha(read(failed/'build.log.gz'))==failure['build_log_sha256']
        assert b'Permission denied'in read(failed/'build.log.gz')
    binding=load(P/'sdk-archive-binding.json.gz')
    assert binding['archive_sha256']==provenance['sdk_archive_sha256']=='6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9'
    assert binding['archive_bytes']==490710349 and binding['all_four_launches_equal_archive']
    members=binding['archive_members']
    def resolve(name,seen=()):
        assert name not in seen
        if name not in members:return None
        row=members[name]
        if row['kind']=='file':
            assert row['bytes']>=0 and len(bytes.fromhex(row['sha256']))==32
            return row['sha256']
        if row['kind']=='directory':return None
        assert row['kind']in ['symlink','hardlink']
        target=posixpath.normpath(posixpath.join(posixpath.dirname(name),row['target']))if row['kind']=='symlink'else posixpath.normpath(row['target'])
        return resolve(target,seen+(name,))
    expected={n:h for n in members if (h:=resolve(n))is not None}
    assert len(expected)==2775 and expected==binding['resolved_inputs']==sdk
    assert load(P/'builds/linux-sbpf/launch.json.gz')['sdk_inputs']==sdk
    assert not provenance['new_vm'] and provenance['maintained_frontier_unchanged'] and not provenance['whole_elf_equal']
    return dict(verified=True,profiles=reports,whole_elf_equal=False,new_vm=False)

def counter_control(original):
    """Four duplicate originals cannot share only three matching candidate extents."""
    m=method();symbols=bytearray(read(P/'builds/linux-sbpf-wrapper-executable/unstripped.so.gz'))
    section=m.sections(symbols)['.text'];offset=65504-section['addr']+section['offset']
    assert symbols[offset]==0x18
    symbols[offset+4]^=1
    with tempfile.TemporaryDirectory()as td:
        p=Path(td)/'one-typeid-mutated.so';p.write_bytes(symbols);result=m.inventory(p,original)
    assert result['membership_normalized']==749
    assert result['injective_normalized']==748
    assert result['injective_raw']==130
    return dict(duplicate_capacity_control=True,membership=749,injective=748)

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--original',type=Path,default=P.parents[1]/'evidence/original/pump/deployed.so')
    parser.add_argument('--counter-control',action='store_true')
    args=parser.parse_args();result=verify(args.original)
    if args.counter_control:result['control']=counter_control(args.original)
    print(json.dumps(result))
