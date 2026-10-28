"""Bind BuyV2 error stores and actual formatter vtable methods; no ELF rewriting."""
if not __debug__:
    raise RuntimeError('Evidence verification requires ordinary Python')
from pathlib import Path
import gzip, hashlib, importlib.util, json, struct, tempfile

P = Path(__file__).resolve().parent
R = P.parents[1]
BASE = R / 'research/mayhem-quotes-current-recovery-20261027'
sha = lambda b: hashlib.sha256(b).hexdigest()

def measure(candidate_override=None):
    spec = importlib.util.spec_from_file_location('cpi_proof_reader', BASE / 'reader.py')
    reader = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(reader)
    original = reader.Elf(R / 'evidence/original/mayhem/deployed.so')
    image = gzip.decompress((P/'public/symbols.so.gz').read_bytes()) if candidate_override is None else candidate_override
    with tempfile.TemporaryDirectory(prefix='mayhem-cpi-static-') as directory:
        path = Path(directory)/'symbols.so'
        path.write_bytes(image)
        candidate = reader.Elf(path)
        if candidate_override is None:
            stripped_path = Path(directory)/'candidate.so'
            stripped_path.write_bytes(gzip.decompress((P/'public/candidate.so.gz').read_bytes()))
            stripped = reader.Elf(stripped_path)
            for section in candidate.sections:
                if section['flags'] & 2 and section['type'] != 8:
                    peer = stripped.sec[section['name']]
                    assert (peer['address'],peer['size']) == (section['address'],section['size'])
                    assert stripped.b[peer['offset']:peer['offset']+peer['size']] == candidate.b[section['offset']:section['offset']+section['size']]
    inventory = json.loads((BASE/'inventory.json').read_bytes())['rows']
    originals = {r['start']: r['bytes'] for r in inventory}
    candidates = {s['value']: s['size'] for s in candidate.symbols if s['info'] & 15 == 2 and s['size']}
    assert originals[140512] == 18648 and candidates[69080] == 18376
    entry = next(row for row in inventory if row['id']=='O0189')
    original_entry = original.window(entry['start'],entry['start']+entry['bytes'])
    entry_calls = [call for call in original_entry['direct'] if call['target']==140512]
    assert len(entry_calls)==1
    entry_matches = []
    for address,size in candidates.items():
        if size!=entry['bytes'] or candidate.norm(address,address+size)!=original.norm(entry['start'],entry['start']+entry['bytes']):
            continue
        window=candidate.window(address,address+size)
        if any(call['offset']==entry_calls[0]['offset'] and call['target']==69080 for call in window['direct']):
            entry_matches.append(address)
    assert len(entry_matches)==1
    entry_binding=dict(original=entry['start'],candidate=entry_matches[0],bytes=entry['bytes'],
                       call_offset=entry_calls[0]['offset'],original_target=140512,candidate_target=69080)
    # Actual selected callback block in original O0083 and PR330's bound handler.
    profiles = [('original', original, 140512, 15248, 15024, 14976, 376, 61),
                ('candidate', candidate, 69080, 14816, 14600, 14552, 101, 50)]
    records = {}
    roots = []
    for side, elf, start, source, table, discriminant, line, length in profiles:
        def instruction(relative):
            return struct.unpack_from('<BBhi', elf.b, start+relative)
        def pointer(relative):
            at = start+relative
            assert elf.rel[at]['type'] == 8 and elf.b[at] == 0x18
            return struct.unpack_from('<I',elf.b,at+4)[0] | struct.unpack_from('<I',elf.b,at+12)[0]<<32
        filename = pointer(source)
        _, registers, slot, _ = instruction(source+16)
        assert registers == 0x1a
        assert instruction(source+24) == (0x62, 10, slot+144, 6008)
        assert instruction(source+32) == (0x72, 10, slot+72, 2)
        assert instruction(source+40) == (0x62, 10, slot+16, line)
        assert instruction(source+48) == (0x7a, 10, slot+8, length)
        assert instruction(source+56) == (0x7a, 10, slot-8, 0)
        filename_bytes = elf.b[filename:filename+length]
        expected = b'programs/mayhem-program/src/instructions/' + (b'pump_interface_v2.rs' if side=='original' else b'buy_v2.rs')
        assert filename_bytes == expected
        value = pointer(discriminant)
        assert elf.b[value:value+4] == struct.pack('<I',8)
        address = pointer(table)
        assert struct.unpack_from('<QQ',elf.b,address+8) == (24,8)
        methods = []
        for offset in [0,24,32,40]:
            assert elf.rel[address+offset]['type'] == 8
            encoded = struct.unpack_from('<Q',elf.b,address+offset)[0]
            assert encoded & 0xffffffff == 0
            methods.append(encoded >> 32)
        roots.append(methods)
        records[side] = dict(handler_start=start, handler_bytes=originals[start] if side=='original' else candidates[start],
                            source_offset=source, filename=filename_bytes.decode(), line=line,
                            error_code=6008, enum_discriminant=8, nearby_word_store=0,
                            nearby_byte_store=2, vtable_address=address,
                            vtable_bytes=48, size=24, alignment=8, methods=methods)
    pending = list(zip(*roots))
    block_calls = []
    for x,y in [(14992,14568),(15128,14704),(15328,14896)]:
        a,b=140512+x,69080+y
        assert original.b[a:a+2]==candidate.b[b:b+2]==b'\x85\x10'
        assert a not in original.rel and b not in candidate.rel
        target_a=a+8+struct.unpack_from('<i',original.b,a+4)[0]*8
        target_b=b+8+struct.unpack_from('<i',candidate.b,b+4)[0]*8
        block_calls.append(dict(original_offset=x,candidate_offset=y,original_target=target_a,candidate_target=target_b))
        pending.append((target_a,target_b))
    seen = set()
    pairs = []
    edges = []
    while pending:
        a,b = pending.pop()
        if (a,b) in seen:
            continue
        seen.add((a,b))
        assert a in originals and b in candidates
        assert originals[a] == candidates[b], (a,b,'complete extent')
        x = original.window(a,a+originals[a]); y = candidate.window(b,b+candidates[b])
        assert original.norm(a,a+originals[a]) == candidate.norm(b,b+candidates[b]), (a,b,'normalized body and relocations')
        assert len(x['direct']) == len(y['direct'])
        for u,v in zip(x['direct'],y['direct']):
            assert u['offset'] == v['offset']
            edges.append(dict(original=a,candidate=b,offset=u['offset'],original_target=u['target'],candidate_target=v['target']))
            pending.append((u['target'],v['target']))
        pairs.append(dict(original=a,candidate=b,bytes=originals[a],
                          indirect_calls=len(x['indirect']),data_references=len(x['data_references'])))
    return dict(entry_binding=entry_binding,records=records,block_calls=block_calls,
                pairs=sorted(pairs,key=lambda r:(r['original'],r['candidate'])),
                edges=sorted(edges,key=lambda r:(r['original'],r['candidate'],r['offset'])),
                scope='Selected 48-byte formatter vtable, code/enum/Source stores and complete actual direct-call descendants only. '
                      'Nested pointees, indirect dispatch, full error structure and callback execution are not proved.')

if __name__ == '__main__':
    result = measure()
    print(json.dumps(result,indent=2))
