#!/usr/bin/env python3
"""Static comparison only. Normalization is in memory; no ELF is rewritten."""
from pathlib import Path
import collections, gzip, hashlib, json, struct, tarfile
from elf_reader import Elf

ROOT = Path(__file__).resolve().parent
PATHS = {'original': 'inputs/original.so', 'darwin': 'inputs/darwin.so',
         'linux': 'inputs/linux-build/artifact/pump_fees_candidate.so'}

def sha(b): return hashlib.sha256(b).hexdigest()
def js(p): return json.loads((ROOT / p).read_text())
def canonical(x): return json.dumps(x, sort_keys=True, separators=(',', ':')).encode()

def source_check():
    hashes = js('inputs/darwin-build/source-sha256.json')
    assert len(hashes) == 22
    with tarfile.open(ROOT / 'inputs/darwin-build/source-snapshot.tar.gz') as t:
        actual = {m.name: sha(t.extractfile(m).read()) for m in t.getmembers() if m.isfile()}
    assert actual == hashes
    for n in ['source-before', 'source-after-fetch', 'source-after']:
        assert js('inputs/linux-build/artifact/' + n + '.json') == hashes
    pins = js('inputs/linux-build/artifact/source-pins.json')
    assert pins['source_files_sha256'] == hashes
    assert pins['revision'] == '4ffe8bd88761059693e481ae972443c10204f7af'
    sdk = js('inputs/darwin-build/build-comparison.json')['sdk_source_sha256']
    with tarfile.open(ROOT / 'inputs/recorded-sdk-sbf-sdk-snapshot.tar.gz') as t:
        sdk_actual = {m.name: sha(t.extractfile(m).read()) for m in t.getmembers() if m.isfile()}
        installer=t.extractfile('scripts/install.sh').read()
        strip=t.extractfile('scripts/strip.sh').read()
    assert sdk_actual == sdk
    assert b'version=v1.52' in installer and b'--strip-all' in strip
    return {'source_count': len(hashes), 'revision': pins['revision'],
            'source_maps_and_archive_identical': True, 'files': hashes,
            'darwin_recorded_sdk_archive_equals_build_sdk_map': True,
            'recorded_sdk_source_count': len(sdk),
            'historical_darwin_strip_limit': 'SDK scripts establish the recorded v1.52 selection; later e501 tool-phase observation is corroboration, not a9c4 per-process invocation attestation.'}

def pointer(e, at):
    return (struct.unpack_from('<I', e.b, at+4)[0] |
            struct.unpack_from('<I', e.b, at+12)[0] << 32)

def windows(e, sym=None):
    rows = {}; names = collections.defaultdict(list)
    for f in (sym or e).funcs:
        names[(f['start'], f['size'])].append(f['name'])
    bases = collections.defaultdict(list)
    entry = struct.unpack_from('<Q', e.b, 24)[0]
    bases[entry].append({'kind': 'elf_entrypoint'})
    for pc, target in sorted(e.calls.items()):
        bases[target].append({'kind': 'direct_call', 'pc': pc,
                              'imm': struct.unpack_from('<i', e.b, pc+4)[0]})
    for at, r in sorted(e.relocations.items()):
        if r['type'] != 8: continue
        val = pointer(e, at) if e.lo <= at < e.hi and e.b[at] == 0x18 else struct.unpack_from('<Q', e.b, at)[0] >> 32
        if e.lo <= val < e.hi:
            bases[val].append({'kind': 'relocated_code_pointer', 'at': at})
    for f in e.funcs:
        bases[f['start']].append({'kind': 'present_function_symbol', 'name': f['name'], 'size': f['size']})
    assert e.entries[0] == e.lo
    for a, z in zip(e.entries, e.entries[1:] + [e.hi]):
        size = z-a
        rows[a] = {'start': a, 'end': z, 'size': size, 'raw_sha256': sha(e.b[a:z]),
                   'normalized_sha256': sha(e.normalized[a:z]),
                   'relocation_pattern': e.pattern(a, size),
                   'boundary_basis': bases[a], 'end_basis': 'next_entry' if z != e.hi else 'section_end',
                   'darwin_symbol_names' if sym else 'present_symbol_names': sorted(set(names[(a, size)])),
                   'direct_calls': [{'pc': pc, 'offset': pc-a,
                       'raw_imm': struct.unpack_from('<i', e.b, pc+4)[0], 'absolute_target': target}
                       for pc, target in sorted(e.calls.items()) if a <= pc < z],
                   'other_call_instructions': [{'pc': pc, 'raw_hex': e.b[pc:pc+8].hex(),
                       'relocation': e.relocations.get(pc)} for pc in range(a, z, 8)
                       if e.b[pc] in (0x85, 0x8d) and pc not in e.calls],
                   'relocated_pointers': [{'pc': pc, 'absolute_target': pointer(e, pc)}
                       for pc, r in sorted(e.relocations.items()) if a <= pc < z and r['type'] == 8 and e.b[pc] == 0x18]}
    assert sum(r['size'] for r in rows.values()) == e.text[5]
    return rows

def key(row):
    return row['size'], row['normalized_sha256'], canonical(row['relocation_pattern'])

def compare(a, b, wa, wb):
    index = collections.defaultdict(list)
    for p, r in wb.items(): index[key(r)].append(p)
    pairs = {(p, q) for p, r in wa.items() for q in index[key(r)]}
    # A greatest fixed point of matching complete bodies/direct targets. Indirect
    # calls and relocated data are deliberately not asserted equivalent.
    live = set(pairs); removed = {}; rounds = 0
    while True:
        bad = {}
        for p, q in live:
            reasons = []
            ac, bc = wa[p]['direct_calls'], wb[q]['direct_calls']
            assert [x['offset'] for x in ac] == [x['offset'] for x in bc]
            for x, y in zip(ac, bc):
                edge = (x['absolute_target'], y['absolute_target'])
                if edge not in live: reasons.append({'offset': x['offset'], 'left_target': edge[0], 'right_target': edge[1]})
            if reasons: bad[(p, q)] = reasons
        if not bad: break
        rounds += 1
        for pair, reasons in bad.items(): removed[pair] = {'round': rounds, 'unclosed_edges': reasons}
        live -= bad.keys()
    rows = []
    for p, r in wa.items():
        matches = []
        for q in index[key(r)]:
            ac, bc = r['direct_calls'], wb[q]['direct_calls']
            matches.append({'right_start': q, 'right_end': wb[q]['end'],
                'raw_equal': a.b[p:r['end']] == b.b[q:wb[q]['end']],
                'direct_target_graph_consistent': (p, q) in live,
                'graph_rejection': removed.get((p,q)),
                'direct_targets': [{'offset': x['offset'], 'left_pc': x['pc'], 'right_pc': y['pc'],
                    'left_imm': x['raw_imm'], 'right_imm': y['raw_imm'],
                    'left_target': x['absolute_target'], 'right_target': y['absolute_target'],
                    'target_shape_equal': (x['absolute_target'],y['absolute_target']) in pairs,
                    'target_graph_consistent': (x['absolute_target'],y['absolute_target']) in live}
                    for x,y in zip(ac,bc)]})
        rows.append({'left_start': p, 'left_end': r['end'], 'left_size': r['size'], 'matches': matches})
    return {'summary': {'left_windows': len(wa), 'right_windows': len(wb),
        'shape_matched_left': sum(bool(x['matches']) for x in rows),
        'raw_matched_left': sum(any(m['raw_equal'] for m in x['matches']) for x in rows),
        'raw_and_direct_graph_consistent_left': sum(any(m['raw_equal'] and m['direct_target_graph_consistent'] for m in x['matches']) for x in rows),
        'one_hop_target_shapes_matched_left': sum(any(all(d['target_shape_equal'] for d in m['direct_targets']) for m in x['matches']) for x in rows),
        'direct_graph_consistent_left': sum(any(m['direct_target_graph_consistent'] for m in x['matches']) for x in rows),
        'initial_pairs': len(pairs), 'remaining_pairs': len(live), 'pruning_rounds': rounds}, 'windows': rows}

def bounded(e, address, size):
    for name, s in e.secs.items():
        if s[1] != 8 and s[3] <= address and address+size <= s[3]+s[5]:
            off = s[4]+address-s[3]
            return {'address': address, 'file_offset': off, 'section': name, 'bytes': size,
                    'sha256': sha(e.b[off:off+size]), 'hex': e.b[off:off+size].hex()}
    return None

def location_record(e, address):
    r = bounded(e,address,24)
    if r is None or e.relocations.get(r['file_offset'],{}).get('type') != 8: return None
    rawptr, length, line, column = struct.unpack('<QQII',bytes.fromhex(r['hex']))
    if not 1 <= length <= 512: return None
    data = bounded(e,rawptr >> 32,length)
    if data is None: return None
    try: name=bytes.fromhex(data['hex']).decode('utf-8')
    except UnicodeDecodeError: return None
    if not name.endswith('.rs') or not 0 < line < 100000 or not 0 < column < 10000: return None
    return {'record': r, 'encoded_pointer': rawptr, 'decoded_pointer': rawptr >> 32,
            'path': name, 'path_bytes': length, 'line': line, 'column': column, 'pointee': data}

def location_inventory(e, ws):
    rows=[]
    for p,w in ws.items():
        for ref in w['relocated_pointers']:
            record=location_record(e,ref['absolute_target'])
            if record: rows.append({'window_start':p,'instruction_offset':ref['pc']-p,'pc':ref['pc'],**record})
    return rows

def diff(a,b):
    n=min(len(a),len(b)); runs=[];start=None
    for i in range(n+1):
        unequal=i<n and a[i]!=b[i]
        if unequal and start is None:start=i
        if not unequal and start is not None:
            runs.append({'offset':start,'left_hex':a[start:i].hex(),'right_hex':b[start:i].hex()});start=None
    return {'left_bytes':len(a),'right_bytes':len(b),'left_sha256':sha(a),'right_sha256':sha(b),
            'differing_shared_bytes':sum(len(r['left_hex'])//2 for r in runs),
            'runs':runs,'tail':{'offset':n,'left_hex':a[n:].hex(),'right_hex':b[n:].hex()}}

def header(e):
    return {'class':e.b[4],'endianness':e.b[5],'os_abi':e.b[7],
            'type':struct.unpack_from('<H',e.b,16)[0],'machine':struct.unpack_from('<H',e.b,18)[0],
            'entrypoint':struct.unpack_from('<Q',e.b,24)[0], 'flags':struct.unpack_from('<I',e.b,48)[0],
            'sections':{n:{'address':s[3],'file_offset':s[4],'size':s[5],'flags':s[2],
                'type':s[1],'sha256':sha(e.b[s[4]:s[4]+s[5]])} for n,s in e.secs.items() if s[1]!=8}}

def compute():
    inputs=js('input-bindings.json')
    for p,r in inputs.items():
        b=(ROOT/p).read_bytes();assert len(b)==r['bytes'] and sha(b)==r['sha256'],p
    e={k:Elf(ROOT/v) for k,v in PATHS.items()}
    sym=Elf(ROOT/'inputs/darwin-symbols.so')
    assert sym.b[sym.lo:sym.hi]==e['darwin'].b[e['darwin'].lo:e['darwin'].hi]
    assert sym.pattern(sym.lo,sym.hi-sym.lo)==e['darwin'].pattern(sym.lo,sym.hi-sym.lo)
    w={k:windows(x,sym if k=='darwin' else None) for k,x in e.items()}
    symbol_ranges={(f['start'],f['size']) for f in sym.funcs}
    assert symbol_ranges=={(p,r['size']) for p,r in w['darwin'].items()}
    c={}
    for a,b in [('darwin','original'),('linux','original'),('linux','darwin'),('original','darwin'),('original','linux')]:
        c[a+'-vs-'+b]=compare(e[a],e[b],w[a],w[b])
    output={'source-identity.json':source_check(),'input-identity.json':{k:x.identity() for k,x in e.items()},
            'headers-sections.json':{k:header(x) for k,x in e.items()},
            'boundary-ledger.json.gz':w}
    for k,v in c.items():output[k+'-windows.json.gz']=v
    original_maps={k:{x['left_start']:x for x in c['original-vs-'+k]['windows']} for k in ['darwin','linux']}
    gains={}
    for metric in ['shape','raw','direct_graph']:
        def hit(row):
            return bool(row['matches']) if metric=='shape' else any(m['raw_equal' if metric=='raw' else 'direct_target_graph_consistent'] for m in row['matches'])
        gains[metric]={'gained_original_windows':[p for p in w['original'] if hit(original_maps['linux'][p]) and not hit(original_maps['darwin'][p])],
                       'lost_original_windows':[p for p in w['original'] if hit(original_maps['darwin'][p]) and not hit(original_maps['linux'][p])]}
    loc={k:location_inventory(x,w[k]) for k,x in e.items()}
    output['source-location-ledger.json']=loc
    loc_idx={k:{(r['window_start'],r['instruction_offset']):r for r in rows} for k,rows in loc.items()}
    supported=[]; ambiguous=[]
    # Every location whose Linux path/line/column equals the original, but whose
    # corroborated Darwin complete-body counterpart differs, is retained.
    for row in c['linux-vs-original']['windows']:
        lp=row['left_start']
        dr=next(x for x in c['linux-vs-darwin']['windows'] if x['left_start']==lp)
        for om in row['matches']:
            op=om['right_start']
            for dm in dr['matches']:
                dp=dm['right_start']
                for rr in loc['linux']:
                    if rr['window_start']!=lp:continue
                    off=rr['instruction_offset'];oo=loc_idx['original'].get((op,off));dd=loc_idx['darwin'].get((dp,off))
                    sig=lambda r:(r['path'],r['line'],r['column'])
                    if oo and dd and sig(rr)==sig(oo) and sig(dd)!=sig(oo):
                        record={'linux':rr,'original':oo,'darwin':dd,
                            'linux_original_match':om,'linux_darwin_match':dm,
                            'darwin_names':w['darwin'][dp]['darwin_symbol_names']}
                        # Identical instruction shapes can belong to different
                        # SPL types. Do not call an arbitrary crossed pairing an
                        # improvement when another Darwin body already supplies
                        # the identical original location tuple.
                        alternatives=[]
                        for old in original_maps['darwin'][op]['matches']:
                            oldloc=loc_idx['darwin'].get((old['right_start'],off))
                            if oldloc and sig(oldloc)==sig(oo): alternatives.append(old['right_start'])
                        if alternatives:
                            record['darwin_already_matching_alternatives']=alternatives;ambiguous.append(record)
                        else:supported.append(record)
    output['linux-path-improvements.json']=supported
    output['rejected-crossed-location-pairings.json']=ambiguous
    typeid={}
    for k,x in e.items():
        rows=[]
        for p,r in w[k].items():
            if r['size']==56 and x.b[p]==0x18 and x.b[p+24]==0x18 and x.b[p+48]==0x95:
                rows.append({'start':p,'end':p+56,'raw_hex':x.b[p:p+56].hex(),
                    'store_offset_8_value':pointer(x,p),'store_offset_0_value':pointer(x,p+24),
                    'relocation_pattern':r['relocation_pattern'],
                    'darwin_names':r.get('darwin_symbol_names',[])})
        typeid[k]=rows
    output['type-id-immediates.json']=typeid
    templates=[]
    for k,rows in typeid.items():
        for row in rows:
            template=bytearray.fromhex(row['raw_hex'])
            for offset in [4,12,28,36]:template[offset:offset+4]=bytes(4)
            templates.append(bytes(template))
    assert len(set(templates))==1
    output['type-id-comparison.json']={'instruction_template_hex':templates[0].hex(),
        'template_note':'Only for describing the four nonrelocated immediate words; this extra mask is NOT used in matching/counts.',
        'same_template_all_three':True,
        'linux_or_darwin_original_constant_matches':[
            {'platform':k,'candidate':r['start'],'original':o['start']}
            for k in ['linux','darwin'] for r in typeid[k] for o in typeid['original'] if r['raw_hex']==o['raw_hex']],
        'linux_darwin_unmatched_windows':[r['left_start'] for r in c['linux-vs-darwin']['windows'] if not r['matches']]}
    assert output['type-id-comparison.json']['linux_darwin_unmatched_windows']==[r['start'] for r in typeid['linux']]
    # Every relocation and its literal encoding remains inspectable, including
    # data/vtable references whose object bounds cannot be recovered here.
    output['all-relocation-ledger.json.gz']={k:[{'file_offset':at,**r,
        'raw_hex':x.b[at:at+(16 if x.lo<=at<x.hi and x.b[at]==0x18 else 8)].hex(),
        'decoded_target':(pointer(x,at) if x.lo<=at<x.hi and x.b[at]==0x18 else struct.unpack_from('<Q',x.b,at)[0]>>32) if r['type']==8 else None}
        for at,r in sorted(x.relocations.items())] for k,x in e.items()}
    for a,b in [('linux','darwin'),('darwin','original'),('linux','original')]:
        output[a+'-vs-'+b+'-complete-residual.json.gz']=diff(e[a].b,e[b].b)
    # Per-section comparison is relative to each section start, not a claim of
    # corresponding objects when internal layout differs.
    sections={}
    for a,b in [('linux','darwin'),('darwin','original'),('linux','original')]:
        rows=[]
        for n in sorted(e[a].secs.keys()|e[b].secs.keys()):
            sa=e[a].secs.get(n);sb=e[b].secs.get(n)
            if sa and sb and sa[1]!=8 and sb[1]!=8:
                aa=e[a].b[sa[4]:sa[4]+sa[5]];bb=e[b].b[sb[4]:sb[4]+sb[5]]
                rows.append({'name':n,'left_bytes':len(aa),'right_bytes':len(bb),'equal':aa==bb,
                    'differing_shared_bytes':sum(x!=y for x,y in zip(aa,bb))})
            else:rows.append({'name':n,'left_present':sa is not None,'right_present':sb is not None})
        sections[a+'-vs-'+b]=rows
    output['section-comparison.json']=sections
    output['unmatched-window-bytes.json.gz']={k:[{'start':r['left_start'],'end':r['left_end'],
        'raw_hex':e[k].b[r['left_start']:r['left_end']].hex()} for r in c[k+'-vs-original']['windows'] if not r['matches']]
        for k in ['linux','darwin']}
    output['summary.json']={'comparisons':{k:v['summary'] for k,v in c.items()},'linux_changes_to_original_matches':gains,
        'linux_path_improvement_references':len(supported),'linux_path_improvement_windows':len({r['linux']['window_start'] for r in supported}),
        'linux_path_improvements_with_consistent_direct_graph':sum(x['linux_original_match']['direct_target_graph_consistent'] for x in supported),
        'rejected_crossed_location_pairings':len(ambiguous),
        'darwin_named_partition_matches_all_inferred_windows':True,
        'linux_unstripped_retained':False,'source_input_count':22,'new_runtime_receipts':0,
        'normalization':'Only direct-call immediates and relocated address/external-call immediates; in memory only. Nonrelocated constants (including TypeId) are retained.',
        'limits':['Original and Linux boundaries are entry windows from calls, relocated code pointers, entrypoint and available symbols, not recovered original/Linux debug symbols.',
                  'A consistent direct-call graph does not close indirect calls or prove relocated data equivalence.',
                  'Raw matches with ambiguous same-shape thunks may result from coincidentally equal displacement values.',
                  'No new source correction or unique historical toolchain is established.']}
    return output

def write_output(output):
    out=ROOT/'analysis';out.mkdir(exist_ok=True)
    for name,value in output.items():
        b=canonical(value)+b'\n'
        (out/name).write_bytes(gzip.compress(b,mtime=0) if name.endswith('.gz') else json.dumps(value,indent=2,sort_keys=True).encode()+b'\n')

if __name__=='__main__':
    output=compute();write_output(output);print(json.dumps(output['summary.json'],indent=2))
