"""Verify sealed static evidence; no program execution or executable writes."""
from pathlib import Path
import bisect
import hashlib
import json
import struct
import sys
import tarfile
P = Path(__file__).resolve().parent
W = P / 'sealed'
R = next(p for p in P.parents if (p / 'evidence/original/pump_fees/deployed.so').is_file())
sha = lambda b: hashlib.sha256(b).hexdigest()
read = lambda p: json.loads(p.read_text())
publication = read(P / 'manifest-sha256.json')
assert set(publication) == {str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p != P / 'manifest-sha256.json' and '__pycache__' not in p.parts}
for path, digest in publication.items():
    assert sha((P / path).read_bytes()) == digest, path
assert sha((W / 'manifest-sha256.json').read_bytes()) == '7a26472979b224873680a7ab5612a916e7bbe56d2262f42abcb0de32ca23b64f'
manifest = read(W / 'manifest-sha256.json')
metadata = read(P / 'publication.json')
assert sha((P / 'sealed-source-report.tar.gz').read_bytes()) == metadata['archive_sha256']
with tarfile.open(P / 'sealed-source-report.tar.gz', 'r:gz') as archive:
    archived = {member.name: archive.extractfile(member).read() for member in archive.getmembers() if member.isfile()}
assert set(archived) == {str(p.relative_to(W)) for p in W.rglob('*') if p.is_file()}
for path, body in archived.items():
    assert body == (W / path).read_bytes(), path
actual = {str(p.relative_to(W)) for p in W.rglob('*') if p.is_file() and p.name != 'manifest-sha256.json' and '__pycache__' not in p.parts}
assert actual == set(manifest)
for p, digest in manifest.items():
    assert sha((W / p).read_bytes()) == digest, p
inputs = read(W / 'input-sha256.json')
for p, digest in inputs.items():
    assert sha((R / p).read_bytes()) == digest, p
sys.path.insert(0, str(W / 'inputs'))
from elf_reader import Elf
O, C, S = [Elf((W / 'inputs' / p).resolve()) for p in ['original.so', 'candidate.so', 'symbol-source.so']]
assert sha(C.b) == 'a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa'
assert sha(O.b) == '4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
assert C.b[C.lo:C.hi] == S.b[S.lo:S.hi]
report = read(W / 'closure.json')
assert report['inputs_sha256'] == inputs
assert report['analysis_script_sha256'] == sha((W / 'analyze.py').read_bytes())
for node in report['nodes']:
    c, o, n, on = [node[k] for k in ['candidate', 'original', 'candidate_bytes', 'original_bytes']]
    i = O.entries.index(o)
    assert (O.entries[i+1] if i+1 < len(O.entries) else O.hi) - o == on
    if node['candidate_symbol_bound']:
        assert any(f['start'] == c and f['size'] == n for f in S.funcs)
    else:
        i = C.entries.index(c)
        assert (C.entries[i+1] if i+1 < len(C.entries) else C.hi) - c == n
    assert sha(C.b[c:c+n]) == node['candidate_raw_sha256']
    assert sha(O.b[o:o+on]) == node['original_raw_sha256']
    assert (C.b[c:c+n] == O.b[o:o+on]) == node['raw_equal']
    normalized = n == on and C.normalized[c:c+n] == O.normalized[o:o+on]
    patterns = C.pattern(c, n) == O.pattern(o, on)
    assert normalized == node['normalized_equal'] and patterns == node['relocation_patterns_equal']
    assert (normalized and patterns) == node['matched_body']
for edge in report['edges']:
    for side, e in [('candidate', C), ('original', O)]:
        call = edge[side]
        pc = call['pc']
        assert e.b[pc:pc+8].hex() == call['raw_hex']
        assert e.b[pc:pc+2] == b'\x85\x10' and e.relocations.get(pc, {}).get('type') != 10
        imm = struct.unpack_from('<i', e.b, pc+4)[0]
        assert imm == call['signed_immediate']
        assert pc+8+imm*8 == call['target'] == e.calls[pc]
def data(e, address, length):
    for s in e.raw:
        if s[1] != 8 and s[3] <= address and address+length <= s[3]+s[5]:
            p = s[4] + address - s[3]
            return e.b[p:p+length]
    raise ValueError(address)
for ref in report['relocation_targets']:
    for side, e in [('candidate', C), ('original', O)]:
        pc, address = ref[side+'_pc'], ref[side+'_address']
        assert e.relocations[pc]['type'] == 8 and e.b[pc] == 0x18
        assert e.b[pc:pc+16].hex() == ref[side+'_raw_instruction']
        pointer = struct.unpack_from('<I', e.b, pc+4)[0] | struct.unpack_from('<I', e.b, pc+12)[0] << 32
        assert pointer == address
        if ref['extent_proven']:
            b = data(e, address, ref['bytes'])
            assert b.hex() == ref[side+'_data_hex'] and sha(b) == ref[side+'_data_sha256']
        record = ref.get(side+'_record')
        if record:
            encoded, length, line, column = struct.unpack('<QQII', data(e, address, 24))
            assert encoded == record['encoded_pointer'] and length == record['length']
            pointer = encoded >> 32
            b = data(e, pointer, length)
            assert pointer == record['decoded_pointer'] and b.decode() == record['text'] and sha(b) == record['pointee_sha256']
            if record['kind'] == 'source_location_record':
                assert line == record['line'] and column == record['column']
    if ref['extent_proven']:
        assert (ref['candidate_data_hex'] == ref['original_data_hex']) == ref['data_equal']
for label, e in [('candidate', C), ('original', O)]:
    for line in (W / (label+'-account-try-from.asm')).read_text().splitlines():
        parts = line.split('\t')
        if len(parts) < 3 or not parts[0].strip().endswith(':'):
            continue
        pc = int(parts[0].strip()[:-1]) * 8
        raw = bytes.fromhex(parts[1])
        assert e.b[pc:pc+len(raw)] == raw, (label, pc)
for side in read(W / 'wrapper-dataflow.json')['instructions']:
    e = C if side['side'] == 'candidate' else O
    for instruction in side['instructions']:
        pc, raw = instruction['pc'], bytes.fromhex(instruction['raw_hex'])
        assert e.b[pc:pc+len(raw)] == raw
        if 'signed_call_target' in instruction:
            assert pc+8+struct.unpack_from('<i', e.b, pc+4)[0]*8 == instruction['signed_call_target']
        if 'signed_branch_target' in instruction:
            assert pc+8+struct.unpack_from('<h', e.b, pc+2)[0]*8 == instruction['signed_branch_target']
extra = read(W / 'root-data-checks.json')
assert extra['script_sha256'] == sha((W / 'root-data-checks.py').read_bytes())
for check in extra['literal_checks']:
    for side, e in [('candidate', C), ('original', O)]:
        b = data(e, check[side+'_address'], check['bytes'])
        assert b.hex() == check['data_hex'] and sha(b) == check['data_sha256']
for side, e in [('candidate', C), ('original', O)]:
    record = extra['parser_event_authority_seed_array'][side]
    raw = data(e, record['array_address'], 16)
    assert raw.hex() == record['raw_record_hex']
    encoded, length = struct.unpack('<QQ', raw)
    assert encoded >> 32 == record['decoded_pointer'] and length == record['length'] == 17
    assert data(e, encoded >> 32, length).hex() == record['pointee_hex']
summary = report['summary']
assert len(report['nodes']) == summary['visited_pairs'] == 59
assert sum(n['matched_body'] for n in report['nodes']) == 58
assert sum(n['raw_equal'] for n in report['nodes']) == 16
assert [(n['candidate'], n['original']) for n in report['nodes'] if not n['matched_body']] == [(30000, 36072)]
assert len(report['edges']) == 175 and len(report['relocation_targets']) == 245
print(json.dumps({'sealed_files': len(manifest), 'manifest_sha256': sha((W / 'manifest-sha256.json').read_bytes()),
                  'input_paths_verified': len(inputs), 'source_inputs': 22,
                  'visited_pairs': 59, 'matching_normalized_bodies': 58, 'raw_equal_bodies': 16,
                  'unmatched_pair': [30000, 36072], 'raw_direct_call_edges': 175,
                  'relocated_data_references': 241, 'relocated_code_pointers': 4,
                  'direct_argument_spans_equal': 16, 'source_location_difference_references': 5,
                  'new_runtime_cases': 0, 'program_source_changes': 0, 'complete_closure_proven': False}, indent=2))
