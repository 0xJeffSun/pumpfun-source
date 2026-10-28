"""Bind optimized IR functions to the actual allocator provider's machine symbol."""
import gzip, hashlib, json, re, tempfile
from pathlib import Path
from analyze import module


def derive_ir(root,packet):
    reader=module('ir_machine_reader',root/'research/mayhem-quotes-current-recovery-20261027/reader.py')
    audit=module('ir_machine_key',root/'research/mayhem-direct-call-closure-20261027/verify.py')
    original=reader.Elf(root/'evidence/original/mayhem/deployed.so')
    original_provider=original.window(539680,539680+328)
    functions={}
    for label in ['baseline','composed-linked','curve-baseline','curve-composed']:
        d=packet/'ir'/label
        text=gzip.decompress((d/'optimized.ll.gz').read_bytes()).decode()
        found={m[1]:m[0] for m in re.finditer(r'^define [^\n]*@([^ (]+)[^\n]*\{\n.*?^\}',text,re.M|re.S) if 'finish_grow'in m[1]}
        assert found==json.loads((d/'finish-grow.json').read_bytes()) and len(found)==1
        assert json.loads((d/'result.json').read_bytes())['returncode']==0
        functions[label]=found
    assert functions['baseline']==functions['composed-linked']
    name,old=next(iter(functions['curve-baseline'].items()))
    new=functions['curve-composed'][name]
    assert 'phi i64' in old and '%storemerge3 = select' in old
    assert 'phi i64' not in new and '%storemerge3 = select' not in new
    assert 'store i64 %1, ptr %16, align 8' in new
    machine={}
    with tempfile.TemporaryDirectory() as td:
        for label in ['baseline','composed-linked']:
            p=Path(td)/(label+'.so');p.write_bytes(gzip.decompress((packet/'builds'/label/'symbols.so.gz').read_bytes()))
            elf=reader.Elf(p)
            symbols=[s for s in elf.symbols if s['name']==name and s['info']&15==2]
            assert len(symbols)==1
            s=symbols[0];window=elf.window(s['value'],s['value']+s['size'])
            machine[label]=dict(symbol=name,start=s['value'],bytes=s['size'],normalized_original_provider=audit.key(window)==audit.key(original_provider),raw_sha256=window['raw_sha256'])
    assert machine['baseline']['bytes']==312 and not machine['baseline']['normalized_original_provider']
    assert machine['composed-linked']['bytes']==328 and machine['composed-linked']['normalized_original_provider']
    return dict(root_finish_grow_ir_identical=True,curve_finish_grow_symbol=name,
        baseline_size_phi_and_select=True,composed_direct_size_store=True,machine=machine,
        scope='Optimized IR output and linked symbol correspondence; no fresh pass-by-pass causal attribution or semantic proof.')
