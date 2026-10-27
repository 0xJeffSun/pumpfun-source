"""Compare complete initializer bodies with the unchanged current normalizer."""
from pathlib import Path
import difflib, hashlib, importlib.util, json, struct, sys

W = Path(__file__).resolve().parent
ROOT = W.parents[1]

def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result

reader = module('initializer_reader', ROOT/'research/mayhem-trade-origins-validator/reader.py')
progress = module('initializer_progress', ROOT/'research/mayhem-trade-origins-validator/progress.py')
original = reader.Elf(ROOT/'evidence/original/mayhem/deployed.so')
rows = json.loads((ROOT/'research/mayhem-trade-origins-validator/audit.json').read_bytes())['rows']
originals = {r['start']: original.window(r['start'], r['end']) for r in rows}
expected = originals[534840]
baseline = (W/'layout-root-trade-origins-unqualified-01-build/symbols.so').read_bytes()
key = lambda w: (w['end']-w['start'], w['normalized_sha256'], json.dumps(w['normalization_pattern'], sort_keys=True))

def sources(elf, window):
    found = []
    for ref in window['data_references']:
        at = ref['target']
        if at not in elf.rel or elf.rel[at]['type'] != 8:
            continue
        zero, pointer, length, line, col = struct.unpack_from('<IIQII', elf.b, at)
        if zero == 0 and length == 37 and elf.b[pointer:pointer+length] == b'programs/mayhem-program/src/state.rs\0':
            found.append((line, col))
    return sorted(found)

for label in sys.argv[1:]:
    folder = W/(label+'-build')
    elf = reader.Elf(folder/'symbols.so')
    syms = [s for s in elf.symbols if 'state10initialize17' in s['name']]
    assert len(syms) == 1
    sym = syms[0]
    window = elf.window(sym['value'], sym['value']+sym['size'])
    functions = {s['value']: elf.window(s['value'], s['value']+s['size']) for s in elf.symbols
                 if s['info'] & 15 == 2 and s['size'] >= 8 and elf.lo <= s['value'] < elf.hi}
    a = original.norm(expected['start'], expected['end'])[0]
    b = elf.norm(window['start'], window['end'])[0]
    aa = [a[i:i+8] for i in range(0,len(a),8)]
    bb = [b[i:i+8] for i in range(0,len(b),8)]
    calls = [key(originals[x['target']]) for x in expected['direct']]
    candidate_calls = [key(functions[x['target']]) for x in window['direct']]
    result = dict(label=label, bytes=sym['size'], start=sym['value'],
                  normalized_equal=key(expected)==key(window),
                  original_sha256=hashlib.sha256(original.b).hexdigest(),
                  candidate_sha256=hashlib.sha256((folder/'candidate.so').read_bytes()).hexdigest(),
                  symbols_sha256=hashlib.sha256(elf.b).hexdigest(),
                  ordered_equal_slots=sum(x==y for x,y in zip(aa,bb)),
                  sequence_matching_slots=sum(z.size for z in difflib.SequenceMatcher(a=aa,b=bb,autojunk=False).get_matching_blocks()),
                  call_offsets=[x['offset'] for x in window['direct']],
                  ordered_callee_shapes_equal=calls==candidate_calls,
                  original_sources=sources(original,expected), candidate_sources=sources(elf,window),
                  preservation=progress.compare(original.b,baseline,elf.b),
                  differences=[dict(offset=i*8, original=list(struct.unpack('<BBhi',x)), candidate=list(struct.unpack('<BBhi',y)))
                               for i,(x,y) in enumerate(zip(aa,bb)) if x!=y])
    (W/'accounts-init-current'/f'{label}-current-review.json').write_text(json.dumps(result,indent=2)+'\n')
    print({k:v for k,v in result.items() if k not in ('preservation','differences')}, flush=True)
