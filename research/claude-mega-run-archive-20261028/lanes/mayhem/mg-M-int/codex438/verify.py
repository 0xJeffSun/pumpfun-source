"""Verify the qualified-source 438 composition; never compiles or runs ELF code."""
from pathlib import Path, PurePosixPath
from collections import Counter
import argparse, csv, difflib, gzip, hashlib, importlib.util, io, json, lzma, re, tarfile, tempfile

if not __debug__:
    raise RuntimeError('assertions are required')
P = Path(__file__).resolve().parent
R = next(p for p in P.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
PARENT = R / 'research/mayhem-current437-composition-20261028'
MACRO = R / 'research/mayhem-current-macro-call-closure-20261027'
ORIGIN = R / 'research/mayhem-source-origin-recovery-20261027'
CANDIDATE = 'b69ee99d83cb1eaaa999082dc707560e95e1540174f27b5e6a8e1438cc4c34fc'
SYMBOLS = 'a4e4768d99d31f078ef876b71faca42acd774db00c53f75e888bc1b1c119aa4a'
ORIGINAL = 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
CHANGED = ['src/instructions/sell_pump_swap.rs']
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
    assert len(base) == 67 and {n: sha(b) for n,b in base.items()} == load(P/'source-inputs.parent.json') == load(PARENT/'composed-inputs.json')
    expected = dict(base)
    for n in CHANGED: expected[n] = (P/'overrides'/n).read_bytes()
    actual = archive(P/'source.tar.gz')
    assert len(actual) == 67 and actual == expected
    assert {n:sha(b) for n,b in actual.items()} == load(P/'composed-inputs.json')
    assert sorted(n for n in actual if actual[n] != base[n]) == CHANGED
    patch = ''.join(''.join(difflib.unified_diff(base[n].decode().splitlines(True),actual[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n)) for n in CHANGED)
    assert patch == (P/'source.patch').read_text()
    c = load(P/'composition.json');assert c['changed_files'] == CHANGED
    assert c['parent_manifest_sha256'] == sha((PARENT/'manifest.json').read_bytes())
    assert c['upstream_PR']==417 and c['upstream_head']=='05f9b64d31e926d78d87cca74b4b43c55a34946e'
    assert c['upstream_source_sha256']==sha(actual[CHANGED[0]])=='a4f06ec545f854e7274a18b6e124c6bc6891cf5675fe9828ed78ee40ec74b4fe'
    return base,actual

def images(actual):
    tools=load(P/'tools-observed.json');old=load(PARENT/'tools-observed.json')
    assert tools['tools']==old['tools'] and tools['target_library_inventory']==old['target_library_inventory']
    archives=tools['linked_archive_observations'];assert archives['first']==archives['repeat']==archives['independent']
    assert archives['first']==old['linked_archive_observations']['first']
    expected={n:sha(b)for n,b in actual.items()};result={}
    for label in ('first','repeat','independent'):
        d=P/'builds'/label;launch=load(d/'launch.json');rec=load(d/'result.json')
        assert launch['source_inputs']==expected and rec['source_unchanged'] and rec['returncode']==0
        controller=P/'controllers'/('independent-build.py'if label=='independent'else'build.py')
        assert launch['controller_sha256']==sha(controller.read_bytes())
        cmd=launch['command'];assert Path(cmd[0]).name=='rustc' and cmd[cmd.index('--target')+1]=='sbpf-solana-solana'
        assert all(x in cmd for x in ('opt-level=3','panic=abort','codegen-units=1','overflow-checks=on'))
        assert not any('evidence/original'in x or'deployed.so'in x for x in cmd)
        assert {Path(x.split('=',1)[1]).name for i,x in enumerate(cmd)if i and cmd[i-1]=='--extern'}<=set(archives[label])
        inv=load(d/'invocation.json');assert inv['script_sha256']==sha((d/'ordered.ld').read_bytes())
        assert inv['real_sha256']==tools['tools']['linker']['sha256']
        assert(d/'ordered.ld').read_bytes()==(PARENT/'builds/first/ordered.ld').read_bytes()
        assert not any('evidence/original'in x or'deployed.so'in x for x in inv['incoming'])
        assert {Path(x).name for x in inv['incoming']if x.endswith('.rlib')}==set(archives[label])
        stderr=raw(d/'stderr.gz');assert b'exceeded max offset'not in stderr and b'Stack offset'not in stderr
        result[label]=tuple(raw(d/(n+'.so.gz'))for n in ('candidate','symbols'))
        assert[sha(b)for b in result[label]]==[rec['candidate_sha256'],rec['symbols_sha256']]==[CANDIDATE,SYMBOLS]
    assert result['first']==result['repeat']==result['independent']
    result['control']=tuple(raw(PARENT/'builds/first'/(n+'.so.gz'))for n in ('candidate','symbols'))
    return result

def static(out):
    v = module('q438_matcher', MACRO / 'verify.py'); reader = module('q438_reader', MACRO / 'reader.py')
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
                for ident, start, size in [('O0079',95848,17312)]:
                    hits = groups[v.key(ow[start])]; assert hits and ow[start]['end'] - start == size
                    assert any((start,c) in closed for c in hits)
                    assert all(v.profile(o, ow[start]) == v.profile(e, cw[c]) for c in hits)
        b,c = results['control'],results['first']
        assert b['counts'] == {'raw':141,'normalized':296,'unmatched':4}
        assert c['counts'] == {'raw':141,'normalized':297,'unmatched':3}
        assert (b['direct_closed'],c['direct_closed']) == (431,433)
        assert (c['positive_edges'],c['positive_Source'],c['matched_text']) == (4573,502,660264)
        delta = {}
        for what,pred in [('matched',lambda x:x['status']!='unmatched'),('raw',lambda x:x['status']=='raw'),('closed',lambda x:x['direct_closed'])]:
            before = {x['id'] for x in b['inventory'] if pred(x)}; after = {x['id'] for x in c['inventory'] if pred(x)}
            assert before <= after
            delta[what] = dict(gains=sorted(after-before), losses=sorted(before-after))
        assert delta['matched']['gains'] == ['O0079'] and not delta['raw']['gains']
        assert details['control'][0] <= details['first'][0] and details['control'][1] <= details['first'][1]
        assert all(p in details['first'][2][a] for a,ps in details['control'][2].items() for p in ps)
        results['delta'] = delta
        typed = {}
        for name in ('buy','sell'):
            m = module('q438_typed_'+name, ORIGIN/'typed'/(name+'_reader.py')); m.R = R
            result = m.inspect(t/'first.so'); assert result['whole_body_normalized_equal'] and result['typed_data_multiset_equal']; typed[name] = result
        typed['initializer'] = module('q438_init',ORIGIN/'typed/initializer.py').inspect(R,ORIGIN,t/'control.so',t/'first.so')
        typed['nested'] = module('q438_nested',R/'research/mayhem-quote-integer-debug-data/reader.py').inspect(o.b,e.b)
        typed['new_sell_data']=module('q438_sell_data',P/'sell_data.py').inspect(R,o.b,e.b)
    return results, typed



def verify(runtime=True):
    manifest();_,actual=sources();out=images(actual);result,typed=static(out)
    assert result==load(P/'static.json') and typed==load(P/'typed.json')
    assert result['first']['inventory']==load(P/'inventory.json')
    summary=dict(normalized=438,raw=141,normalized_only=297,unmatched=3,unmatched_text=46480,direct_closed=433,positive_edges=4573,positive_Source=502,whole_elf_equal=False,runtime_verified=False)
    if runtime:
        assert load(P/'runtime/status.json')['state']=='complete','fresh438 runtime qualification pending'
        assert load(P/'runtime/status.json')['candidate_sha256']==CANDIDATE
        summary['runtime']=module('q438_runtime',P/'runtime_check.py').verify(P,R,out['first'][0])
        summary['runtime_verified']=True
    return summary
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--runtime',action='store_true');parser.add_argument('--static-only',action='store_true');a=parser.parse_args()
    assert not(a.runtime and a.static_only)
    print(json.dumps(verify(not a.static_only),indent=2))
