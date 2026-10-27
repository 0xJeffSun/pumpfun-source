"""Read-only verification of one Legacy Buy CPI error-ownership correction."""
from pathlib import Path, PurePosixPath
from collections import Counter
import argparse, base64, difflib, gzip, hashlib, importlib.util, io, json, re, struct, tarfile, tempfile
import sys
if not __debug__: raise RuntimeError("verification requires assertions")
sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
HASHES = {
    'original': 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb',
    'before-candidate': 'fa1299f6e363ae6287d18b74b14f244b33e40875c4df1d1c5de3363bbc862417',
    'before-symbols': '3f0eb23d7a2ed4b625ff472223454cfb23e5f81289b35d1e4e219289e6391e5a',
    'after-candidate': 'b5802973b20409f7b728045a0ecf395a68bf71699a8212f46d1e07b9817ff71f',
    'after-symbols': '7d145b746b2ce7e2786eafcd87315b10132ee75c9ca932a7f560f9208dacfc6a',
}
SOURCE_FILE = 'src/instructions/pump_interface.rs'
OLD = ''' let cpi_result:Result<()> = if crate::pump::cpi::buy(cpi_ctx,input,output,false).is_ok() {
    Ok(())
 } else {
    Err(error!(BuyError::PumpCpiFailed))
 };
 cpi_result?;'''
NEW = ''' crate::pump::cpi::buy(cpi_ctx,input,output,false).map_err(|_| {


    error!(BuyError::PumpCpiFailed)
 })?;
'''

def sha(b): return hashlib.sha256(b).hexdigest()
def read(path):
    return path.read_bytes() if path.is_file() else gzip.decompress(path.with_name(path.name + '.gz').read_bytes())
def load(path): return json.loads(read(path))
def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m
def image(name): return read(P / 'artifacts' / (name + '.so'))

def sources(role):
    result = {}
    with tarfile.open(fileobj=io.BytesIO(read(P / 'sources' / (role + '.tar'))), mode='r:') as archive:
        for item in archive:
            name = PurePosixPath(item.name)
            assert item.isfile() and not name.is_absolute() and '..' not in name.parts
            assert item.name not in result
            result[item.name] = archive.extractfile(item).read()
    assert len(result) == 66
    return result

def check_sources():
    assert sha((P / 'sources/before.tar.gz').read_bytes()) == '519f314c5c6aade56ca1752c21821dd7e58414477b1c7ec0b191ec782b290071'
    before, after = sources('before'), sources('after')
    expected = dict(before)
    text = before[SOURCE_FILE].decode(); assert text.count(OLD) == 1
    expected[SOURCE_FILE] = text.replace(OLD, NEW, 1).encode()
    assert after == expected, 'source transformation differs'
    assert len(before[SOURCE_FILE].splitlines()) == len(after[SOURCE_FILE].splitlines())
    assert 'error!(BuyError::PumpCpiFailed)' in after[SOURCE_FILE].decode().splitlines()[312]
    assert load(P / 'source-inputs.json') == {
        role: {name: sha(data) for name, data in values.items()}
        for role, values in [('before', before), ('after', after)]}
    patch = ''.join(difflib.unified_diff(before[SOURCE_FILE].decode().splitlines(True), after[SOURCE_FILE].decode().splitlines(True), fromfile='before/' + SOURCE_FILE, tofile='after/' + SOURCE_FILE))
    assert patch.encode() == read(P / 'source.patch')
    assert load(P / 'archive-hashes.json') == {role: sha((P / 'sources' / (role + '.tar.gz')).read_bytes()) for role in ['before', 'after']}
    return after

def key(w):
    return w['end'] - w['start'], w['normalized_sha256'], json.dumps(w['normalization_pattern'], sort_keys=True)
def windows(e):
    return {s['value']: e.window(s['value'], s['value'] + s['size']) for s in e.symbols
            if s['info'] & 15 == 2 and s['size'] >= 8 and e.lo <= s['value'] < e.hi}
def source_profile(e, w):
    result = []
    for d in w['data_references']:
        p = d['target']
        if p not in e.rel or e.rel[p]['type'] != 8: continue
        try:
            zero, payload = struct.unpack_from('<II', e.b, p)
            size, line, column = struct.unpack_from('<QII', e.b, p + 8)
            if zero or not (1 <= size < 300 and 1 <= line < 100000 and 1 <= column < 10000): continue
            name = e.b[payload:payload + size].decode()
            if name.endswith('.rs\0'): result.append((name[:-1], line, column))
        except (UnicodeError, struct.error): pass
    return Counter(result)
def cpi_origin(e, w):
    path = b'programs/mayhem-program/src/instructions/pump_interface.rs'
    results = []
    for d in w['data_references']:
        if e.b[d['target']:d['target'] + len(path)] != path: continue
        ops = [struct.unpack_from('<BBhi', e.b, d['pc'] + i) for i in [24, 32, 40, 48, 56]]
        if [x[0] for x in ops] == [0x62, 0x72, 0x62, 0x7a, 0x7a]:
            results.append((path.decode(), *(x[3] for x in ops)))
    return results

def check_handler_images(original, before, after):
    reader = module('ownership_reader', P / 'reader.py')
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        for name, data in [('o', original), ('b', before), ('c', after)]: (root / name).write_bytes(data)
        o, b, c = [reader.Elf(root / name) for name in ['o', 'b', 'c']]
        rows = load(P / 'inputs/parent-audit.json')['rows']
        original_windows = {r['start']: o.window(r['start'], r['end']) for r in rows}
        ow = original_windows[113672]
        def handler(e):
            entries = [s for s in e.symbols if s['info'] & 15 == 2 and 'legacy_buy_handler' in s['name']]
            assert len(entries) == 1
            s = entries[0]; return e.window(s['value'], s['value'] + s['size'])
        bw, cw = handler(b), handler(c)
        assert ow['end'] - ow['start'] == 13848
        assert bw['end'] - bw['start'] == 13760 and cw['end'] - cw['start'] == 13784
        assert key(ow) != key(cw), 'this packet does not claim a complete O0081 body'
        shapes = Counter(key(original_windows[x['target']]) for x in ow['direct'])
        for e, w in [(b, bw), (c, cw)]:
            table = windows(e)
            assert len(w['direct']) == 50
            assert Counter(key(table[x['target']]) for x in w['direct']) == shapes, 'immediate callee shapes differ'
            assert source_profile(e, w) == source_profile(o, ow) and sum(source_profile(e, w).values()) == 7, 'handler Source values differ'
            assert cpi_origin(e, w) == cpi_origin(o, ow) == [('programs/mayhem-program/src/instructions/pump_interface.rs', 6008, 2, 313, 58, 0)], 'CPI Source origin differs'
        cpi_shape = key(original_windows[452576]); from_shape = key(original_windows[620712])
        def ownership(e, w, table):
            cp = next(x['pc'] for x in w['direct'] if key(table[x['target']]) == cpi_shape)
            conversion = next(x['pc'] for x in w['direct'] if x['pc'] > cp and key(table[x['target']]) == from_shape)
            captures = e.b[cp + 8:cp + 24] == bytes.fromhex('bf07000000000000bf16000000000000')
            after_from = e.b[conversion + 8:conversion + 32]
            drops_later = after_from[:4] == bytes.fromhex('15070300') and after_from[8:12] == bytes.fromhex('79620000')
            return captures, drops_later
        assert ownership(o, ow, original_windows) == (True, True)
        assert ownership(b, bw, windows(b)) == (False, False)
        assert ownership(c, cw, windows(c)) == (True, True), 'CPI error ownership order differs'
        for label, raw, e in [('before', image('before-candidate'), b), ('after', image('after-candidate'), c)]:
            (root / label).write_bytes(raw); stripped = reader.Elf(root / label)
            for s in e.sections:
                if s['flags'] & 2 and s['type'] != 8:
                    other = stripped.sec[s['name']]
                    assert (s['address'], s['size']) == (other['address'], other['size'])
                    assert e.b[s['offset']:s['offset'] + s['size']] == raw[other['offset']:other['offset'] + other['size']]
    result = {'original_bytes': 13848, 'before_bytes': 13760, 'after_bytes': 13784, 'callee_shapes': 50, 'handler_Source_records': 7, 'CPI_origin_line': 313, 'full_body_equal': False}
    result['callers'] = {}
    for label, e, w, table in [('original', o, ow, original_windows), ('before', b, bw, windows(b)), ('after', c, cw, windows(c))]:
        result['callers'][label] = {'start': w['start'], 'end': w['end'], 'raw_sha256': w['raw_sha256'], 'normalized_sha256': w['normalized_sha256'],
            'calls': [{'offset': d['offset'], 'target': d['target'], 'target_bytes': table[d['target']]['end'] - table[d['target']]['start'], 'target_normalized_sha256': table[d['target']]['normalized_sha256']} for d in w['direct']]}
    return result

def check_runtime(run, cases):
    from solders.transaction import Transaction
    assert run['candidate_sha256'] == HASHES['after-candidate'] and run['original_sha256'] == HASHES['original']
    assert run['case_count'] == len(cases) == 486 and len(run['cases']) == 486
    assert not run['mismatches'] and not run['normalized_log_differences']
    def norm(logs):
        return [re.sub(r'AnchorError thrown in .+?:\d+\.', 'AnchorError thrown in <source>.', s)
                for s in logs if not re.search(r' consumed \d+ of \d+ compute units', s) and 'panicked at' not in s]
    successes = 0
    for expected, row in zip(cases, run['cases']):
        assert row['case'] == expected and not row['different_fields'] and not row['normalized_log_difference']
        a, b = row['original'], row['candidate']
        for value in [a, b]:
            if 'case' in value: assert value['case'] == expected
            tx = Transaction.from_bytes(base64.b64decode(value['transaction_base64']))
            assert all(tx.verify_with_results()), 'invalid transaction signature'
        assert a['transaction_base64'] == b['transaction_base64']
        for phase in ['before', 'after']:
            filtered = lambda value: {k: v for k, v in value[phase].items() if k != 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'}
            assert filtered(a) == filtered(b)
        assert a['error'] == b['error']; successes += a['error'] is None
        for field in ['inner_instructions', 'return_data']: assert a['metadata'][field] == b['metadata'][field]
        events = lambda value: [s for s in value['metadata']['logs'] if s.startswith('Program data: ')]
        assert events(a) == events(b) and norm(a['metadata']['logs']) == norm(b['metadata']['logs'])
        noncompute = lambda logs: [s for s in logs if not re.search(r' consumed \d+ of \d+ compute units', s)]
        assert noncompute(a['metadata']['logs']) == noncompute(b['metadata']['logs'])
    assert run['successful_original_cases'] == successes and run['signed_transactions'] == 972
    return {'cases': 486, 'original_successes': successes, 'verified_signed_records': 972}

def verify():
    paths = list(P.rglob('*')); assert not any(x.is_symlink() for x in paths)
    assert all(x.is_file() or x.is_dir() for x in paths)
    assert {x.relative_to(P).as_posix(): sha(x.read_bytes()) for x in paths if x.is_file() and x != P / 'manifest.json'} == load(P / 'manifest.json')
    for name, digest in {
        'cases.json': 'ae3ea4b6049294418102af7a9c5b739979d757eae4013e792ced0441bbfed145',
        'inputs/parent-audit.json.gz': '78bb6b0aa6858ecc4f54d1e52fbcdf2ff6e5f62063b14e162d3dfabf68f209c2',
        'builds/target-libraries.json': 'd1cfdc689c392c46658582032138f0eb89bb854f6860986311cab6be343b71f3',
    }.items(): assert sha((P / name).read_bytes()) == digest
    after_sources = check_sources()
    for name, digest in HASHES.items(): assert sha(image(name)) == digest
    original, before, after = [image(n) for n in ['original', 'before-symbols', 'after-symbols']]
    static = check_handler_images(original, before, after)
    assert static == load(P / 'static-observations.json')
    progress = module('ownership_progress', P / 'progress.py').compare(original, before, after)
    for field, value in [('baseline_matches', 429), ('matches', 429), ('baseline_raw_matches', 73), ('raw_matches', 73), ('positive_direct_edges_before', 4288), ('positive_direct_edges_after', 4288), ('positive_Source_records_before', 446), ('positive_Source_records_after', 446)]: assert progress[field] == value
    assert progress['gains'] == []
    target_inputs = load(P / 'builds/target-libraries.json'); assert target_inputs['archive_sha256'] == 'fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
    assert len(target_inputs['files']) == 26
    tools = None
    for role in ['fast', 'clean', 'repeat']:
        folder = P / 'builds' / role; launch, result = load(folder / 'launch.json'), load(folder / 'result.json')
        assert result['returncode'] == 0 and all(result[k] is True for k in ['source_unchanged', 'tools_unchanged', 'target_libraries_unchanged'])
        assert result['candidate_sha256'] == HASHES['after-candidate'] and result['symbols_sha256'] == HASHES['after-symbols']
        assert launch['source_inputs'] == {n: sha(b) for n, b in after_sources.items()} and launch['target_inputs'] == target_inputs
        if tools is None: tools = launch['checked_tools']
        assert tools == launch['checked_tools']
        controller = 'fast_controller.py' if role == 'fast' else 'controller.py'
        assert launch['controller_sha256'] == sha(read(P / 'builds' / controller))
        for name in ['stdout', 'stderr']: assert result[name + '_sha256'] == sha(read(folder / name))
        log = read(folder / 'stderr'); assert log.count(b'--crate-name mayhem_recovered ') == 1 and b'Finished `release`' in log
        assert '--locked' in launch['command'] and '--offline' in launch['command'] and 'sbpf-solana-solana' in launch['command']
    runtime = check_runtime(load(P / 'runtime/report.json'), load(P / 'cases.json')['cases'])
    summary = load(P / 'runtime/summary.json')
    assert summary['case_count'] == 486 and summary['successful_original_cases'] == runtime['original_successes'] and summary['signed_records'] == 972
    assert summary['checked_mismatches'] == summary['normalized_log_differences'] == 0 and summary['raw_noncompute_log_differences'] == []
    assert summary['candidate_sha256'] == HASHES['after-candidate'] and summary['original_sha256'] == HASHES['original']
    return dict(static=static, preserved_windows=429, preserved_unqualified_raw=73, preserved_positive_edges=4288, preserved_positive_Source=446, runtime=runtime, whole_elf_equal=False)

if __name__ == '__main__':
    result = verify()
    result['static'] = {k: v for k, v in result['static'].items() if k != 'callers'}
    print(json.dumps(result, indent=2))
