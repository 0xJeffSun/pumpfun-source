"""Verify the qualified-source 436 composition; never compiles or runs ELF code."""
from pathlib import Path, PurePosixPath
from collections import Counter
import argparse, csv, difflib, gzip, hashlib, importlib.util, io, json, lzma, re, tarfile, tempfile

if not __debug__:
    raise RuntimeError('assertions are required')
P = Path(__file__).resolve().parent
R = P.parents[1]
PARENT = R / 'research/mayhem-current434-composition-20261027'
PR = R / 'research/claude-mayhem-436-20261027'
MACRO = R / 'research/mayhem-current-macro-call-closure-20261027'
ORIGIN = R / 'research/mayhem-source-origin-recovery-20261027'
CANDIDATE = 'cac32dadb032cc80366124ab3ceb430fdc5bfae23ab9cec1b5d18bb9e0f55e5b'
SYMBOLS = 'f03e73e7b82b152e64e9a999f4f9276ece9ebcd42d2273d0b8adaa7c5fb0c229'
ORIGINAL = 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
CHANGED = ['src/instructions/buy_pump_swap.rs', 'src/instructions/buy_v2.rs',
           'src/instructions/pump_interface.rs', 'src/instructions/pump_interface_v2.rs',
           'src/instructions/sell_pump_swap.rs', 'src/state.rs']
sha = lambda b: hashlib.sha256(b).hexdigest()
def raw(p):
    b = p.read_bytes()
    return gzip.decompress(b) if p.suffix == '.gz' else b
def load(p): return json.loads(raw(p))
def module(name, p):
    s = importlib.util.spec_from_file_location(name, p)
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m

def manifest():
    paths = list(P.rglob('*'))
    assert not any(p.is_symlink() for p in paths), 'packet symlink'
    assert all(p.is_file() or p.is_dir() for p in paths), 'packet special file'
    assert {p.relative_to(P).as_posix(): sha(p.read_bytes()) for p in paths
            if p.is_file() and p != P / 'manifest.json'} == load(P / 'manifest.json')
    for name, digest in load(P / 'external-inputs.json').items():
        n = PurePosixPath(name)
        assert not n.is_absolute() and '..' not in n.parts
        assert sha((R / name).read_bytes()) == digest, name

def archive(p):
    files = {}
    with tarfile.open(fileobj=io.BytesIO(raw(p)), mode='r:') as t:
        for m in t:
            n = PurePosixPath(m.name)
            assert m.isfile() and not n.is_absolute() and '..' not in n.parts
            assert str(n) == m.name and m.name not in files
            files[m.name] = t.extractfile(m).read()
    return files

def sources():
    base = archive(PARENT / 'source.tar.gz')
    assert len(base) == 67 and {n: sha(b) for n, b in base.items()} == load(P / 'source-inputs.parent.json') == load(PARENT / 'composed-inputs.json')
    expected = dict(base)
    for n in CHANGED:
        assert base[n] == (PR / 'sources/parent' / n[4:]).read_bytes()
        expected[n] = (PR / 'sources/shipped' / n[4:]).read_bytes()
        assert expected[n] == (P / 'overrides' / n).read_bytes()
    actual = archive(P / 'source.tar.gz')
    assert len(actual) == 67 and actual == expected
    assert {n: sha(b) for n, b in actual.items()} == load(P / 'composed-inputs.json')
    assert sorted(n for n in actual if actual[n] != base[n]) == CHANGED
    patch = ''.join(''.join(difflib.unified_diff(base[n].decode().splitlines(True), actual[n].decode().splitlines(True), fromfile='a/' + n, tofile='b/' + n)) for n in CHANGED)
    assert patch == (P / 'source.patch').read_text()
    c = load(P / 'composition.json')
    assert c['source_head'] == 'c82783e9ddedd6cbd1e91ddf2209f04a1e304b91' and c['changed_files'] == CHANGED
    return base, actual

def images(actual):
    tools = load(P / 'tools-observed.json'); old = load(PARENT / 'tools-observed.json')
    assert tools['tools'] == old['tools'] and tools['target_library_inventory'] == old['target_library_inventory']
    parent_archives = dict(load(PARENT / 'builds/first/result.json')['archives_after'])
    parent_archives.update({Path(n).name:h for n,h in tools['target_library_inventory']['files'].items()})
    archives = tools['linked_archive_observations']
    assert archives['first'] == archives['repeat']
    assert all(parent_archives.get(n) == h for n, h in archives['first'].items())
    expected_inputs = {n: sha(b) for n, b in actual.items()}
    result = {}
    for label in ('first', 'repeat'):
        d = P / 'builds' / label; launch = load(d / 'launch.json'); rec = load(d / 'result.json')
        assert launch['source_inputs'] == expected_inputs and rec['source_unchanged'] and rec['returncode'] == 0
        assert launch['controller_sha256'] == sha((P / 'controllers/build.py').read_bytes())
        cmd = launch['command']
        assert Path(cmd[0]).name == 'rustc' and cmd[cmd.index('--target') + 1] == 'sbpf-solana-solana'
        assert all(x in cmd for x in ('opt-level=3', 'panic=abort', 'codegen-units=1', 'overflow-checks=on'))
        assert not any('evidence/original' in x or 'deployed.so' in x for x in cmd)
        assert {Path(x.split('=', 1)[1]).name for i, x in enumerate(cmd) if i and cmd[i-1] == '--extern'} <= set(archives[label])
        stderr = raw(d / 'stderr.gz'); assert b'exceeded max offset' not in stderr and b'Stack offset' not in stderr
        result[label] = tuple(raw(d / (n + '.so.gz')) for n in ('candidate', 'symbols'))
        assert [sha(b) for b in result[label]] == [rec['candidate_sha256'], rec['symbols_sha256']] == [CANDIDATE, SYMBOLS]
        inv = load(d / 'invocation.json')
        assert inv['script_sha256'] == sha((d / 'ordered.ld').read_bytes())
        assert inv['real_sha256'] == tools['tools']['linker']['sha256']
        assert (d / 'ordered.ld').read_bytes() == (PARENT / 'builds/first/ordered.ld').read_bytes()
        assert not any('evidence/original' in x or 'deployed.so' in x for x in inv['incoming'])
        actual_libs = {Path(x).name for x in inv['incoming'] if x.endswith('.rlib')}
        assert actual_libs == set(archives[label])
    strips=load(P/'validation/strip-replay.json')
    assert [r['label'] for r in strips]==['first','repeat']
    for row in strips:
        assert row['returncode']==0 and row['identical']
        assert row['tool_sha256']==tools['tools']['strip']['sha256']
        assert row['command'][1]=='--strip-all'
        assert row['source_sha256']==SYMBOLS and row['candidate_sha256']==CANDIDATE
    assert result['first'] == result['repeat']
    result['control'] = tuple(raw(P / 'builds/control' / (n + '.so.gz')) for n in ('candidate', 'symbols'))
    assert result['control'] == tuple(raw(PARENT / 'builds/first' / (n + '.so.gz')) for n in ('candidate', 'symbols'))
    return result

def static(out):
    v = module('q436_matcher', MACRO / 'verify.py'); reader = module('q436_reader', MACRO / 'reader.py')
    rows = load(MACRO / 'original-windows.json'); assert len(rows) == 441
    assert sha((R / 'evidence/original/mayhem/deployed.so').read_bytes()) == ORIGINAL
    results, details = {}, {}
    with tempfile.TemporaryDirectory(prefix='mayhem436-static-') as td:
        t = Path(td); o = reader.Elf(R / 'evidence/original/mayhem/deployed.so')
        ow = {r['start']: o.window(r['start'], r['start'] + r['bytes']) for r in rows}
        for label in ('control', 'first'):
            path = t / (label + '.so'); path.write_bytes(out[label][1]); e = reader.Elf(path)
            v.verify_image_pair(reader, e, out[label][0], t / (label + '-stripped.so'))
            cw, names = v.tables(e); groups, pairs, closed, rounds = v.relation(ow, cw)
            inventory, edges, source_refs, profiles = [], set(), set(), {}
            for row in rows:
                a = row['start']; w = ow[a]; hits = groups[v.key(w)]
                equal = any(cw[c]['raw_sha256'] == w['raw_sha256'] for c in hits)
                ps = [v.profile(e, cw[c]) for c in hits]; profiles[a] = ps
                inventory.append(dict(id=row['id'], start=a, bytes=row['bytes'], status='raw' if equal else 'normalized' if hits else 'unmatched', direct_closed=any((a,c) in closed for c in hits), counterparts=[dict(start=c, names=sorted(names[c])) for c in hits]))
                for call in w['direct']:
                    if call['target'] in ow and any(any(x['offset'] == call['offset'] and x['target'] in cw and v.key(cw[x['target']]) == v.key(ow[call['target']]) for x in cw[c]['direct']) for c in hits): edges.add((row['id'], call['offset']))
                for ref in w['data_references']:
                    value = v.source(o, ref['target'])
                    if value and any(p.get(str(ref['offset'])) == value for p in ps): source_refs.add((row['id'],ref['offset']))
            results[label] = dict(counts=dict(Counter(r['status'] for r in inventory)), direct_closed=sum(r['direct_closed'] for r in inventory), matched_text=sum(r['bytes'] for r in inventory if r['status'] != 'unmatched'), positive_edges=len(edges), positive_Source=len(source_refs), inventory=inventory)
            details[label] = edges, source_refs, profiles
            if label == 'first':
                for ident, start, size in [('O0081',113672,13848),('O0082',127520,12992)]:
                    hits = groups[v.key(ow[start])]; assert hits and ow[start]['end'] - start == size
                    assert any((start,c) in closed for c in hits)
                    assert all(v.profile(o, ow[start]) == v.profile(e, cw[c]) for c in hits)
        b,c = results['control'],results['first']
        assert b['counts'] == {'raw':141,'normalized':293,'unmatched':7}
        assert c['counts'] == {'raw':141,'normalized':295,'unmatched':5}
        assert (b['direct_closed'],c['direct_closed']) == (425,429)
        assert (c['positive_edges'],c['positive_Source'],c['matched_text']) == (4473,486,634552)
        delta = {}
        for what,pred in [('matched',lambda x:x['status']!='unmatched'),('raw',lambda x:x['status']=='raw'),('closed',lambda x:x['direct_closed'])]:
            before = {x['id'] for x in b['inventory'] if pred(x)}; after = {x['id'] for x in c['inventory'] if pred(x)}
            assert before <= after
            delta[what] = dict(gains=sorted(after-before), losses=sorted(before-after))
        assert delta['matched']['gains'] == ['O0081','O0082'] and not delta['raw']['gains']
        assert details['control'][0] <= details['first'][0] and details['control'][1] <= details['first'][1]
        assert all(p in details['first'][2][a] for a,ps in details['control'][2].items() for p in ps)
        results['delta'] = delta
        typed = {}
        for name in ('buy','sell'):
            m = module('q436_typed_'+name, ORIGIN/'typed'/(name+'_reader.py')); m.R = R
            result = m.inspect(t/'first.so'); assert result['whole_body_normalized_equal'] and result['typed_data_multiset_equal']; typed[name] = result
        typed['initializer'] = module('q436_init',ORIGIN/'typed/initializer.py').inspect(R,ORIGIN,t/'control.so',t/'first.so')
        typed['nested'] = module('q436_nested',R/'research/mayhem-quote-integer-debug-data/reader.py').inspect(o.b,e.b)
    return results, typed


def compression():
    original=(R/'research/mayhem-sweep-failure-recovery/runtime_check.py').read_text()
    old="assert len(repaired) == (58 if suite=='sweeps' else 0)"
    new='assert len(repaired) == 0  # The qualified 434 control already has the diagnostic fixes.'
    assert original.count(old)==1 and (P/'runtime/sweep_check.py').read_text()==original.replace(old,new)
    rows=load(P/'runtime/compression.json')['files']
    assert len(rows)==14
    assert {r['stored'] for r in rows}=={p.relative_to(P).as_posix() for p in (P/'runtime/trades').glob('*.json.xz')}
    for row in rows:
        name=PurePosixPath(row['stored'])
        assert not name.is_absolute() and '..' not in name.parts
        stored=(P/row['stored']).read_bytes();decoded=lzma.decompress(stored)
        assert len(stored)==row['stored_bytes'] and sha(stored)==row['stored_sha256']
        assert len(decoded)==row['raw_bytes'] and sha(decoded)==row['raw_sha256']
    commands=load(P/'runtime/trades/commands.json')
    assert commands['candidate_sha256']==CANDIDATE
    assert commands['controller_sha256']==sha((P/'controllers/run_trades.py').read_bytes())
    assert len(commands['runs'])==14 and len({r['family']for r in commands['runs']})==14
    assert sum(r['cases']for r in commands['runs'])==6636
    assert all(r['returncode']==0 and r['mismatches']==0 for r in commands['runs'])


def verify(runtime=True):
    manifest(); _, actual = sources(); out = images(actual); result, typed = static(out)
    assert result == load(P/'static.json') and typed == load(P/'typed.json')
    assert result['first']['inventory'] == load(P/'inventory.json')
    summary = dict(normalized=436, raw=141, normalized_only=295, unmatched=5, unmatched_text=72192, direct_closed=429, positive_edges=4473, positive_Source=486, whole_elf_equal=False)
    if runtime:
        assert load(P/'runtime/status.json')['state'] == 'complete', 'runtime qualification pending'
        compression()
        summary['runtime'] = module('q436_runtime',P/'runtime_check.py').verify(P,R,out['first'][0])
    return summary

if __name__ == '__main__':
    p=argparse.ArgumentParser();p.add_argument('--static-only',action='store_true');a=p.parse_args()
    print(json.dumps(verify(not a.static_only),indent=2))
