"""Check bounded literal/schema spans from actual relocations in accepted roots."""
from pathlib import Path
import hashlib
import json
import re
import struct
import sys
W = Path(__file__).resolve().parent
sys.path.insert(0, str(W / 'inputs'))
from elf_reader import Elf
O, C = [Elf((W / 'inputs' / p).resolve()) for p in ['original.so', 'candidate.so']]
def pointer(e, pc):
    assert e.relocations[pc]['type'] == 8 and e.b[pc] == 0x18
    return struct.unpack_from('<I', e.b, pc+4)[0] | struct.unpack_from('<I', e.b, pc+12)[0] << 32
def at(e, va, length):
    for s in e.raw:
        if s[1] != 8 and s[3] <= va and va + length <= s[3] + s[5]:
            off = s[4] + va - s[3]
            return off, e.b[off:off+length]
    raise ValueError(va)
text = (W / 'inputs/current-source/programs/pump-fees/src/lib.rs').read_text()
key = re.search(r'declare_id!\("([^"]+)"\)', text)[1]
alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
number = 0
for char in key:
    number = number * 58 + alphabet.index(char)
key_bytes = number.to_bytes(32, 'big')
checks = []
for label, c, o, n, expected, basis in [
    ('FeeConfig discriminator', 23280+248, 24192+248, 8, bytes([143,52,146,187,219,123,76,155]), 'Direct pointer/length write_all call.'),
    ('handler CPI program id', 493504+2072, 94072+2072, 32, key_bytes, 'Pubkey is a fixed32-byte value; target equals frozen declare_id constant.'),
    ('dispatcher exit owner id', 373808+464, 634776+464, 32, key_bytes, 'Exit owner is a fixed32-byte Pubkey; target equals frozen declare_id constant.'),
    ('handler event-authority seed literal', 493504+2264, 94072+2264, 17, b'__event_authority', 'Named seed span only; no assertion about bytes following it.'),
    ('parser fee-config seed literal', 124104+2064, 326272+2064, 10, b'fee_config', 'Seed literal declared in frozen UpdateAdmin account constraints.'),
]:
    cp, op = pointer(C, c), pointer(O, o)
    cb, ob = at(C, cp, n)[1], at(O, op, n)[1]
    assert cb == ob == expected
    checks.append({'label': label, 'candidate_pc': c, 'original_pc': o,
                   'candidate_address': cp, 'original_address': op, 'bytes': n,
                   'data_hex': cb.hex(), 'data_sha256': hashlib.sha256(cb).hexdigest(),
                   'raw_equal': True, 'extent_basis': basis})
# The matched find_program_address call passes a count of one. The static
# seed-slice array therefore contains exactly one pointer/length record.
c, o = 124104+4368, 326272+4368
records = []
for e, pc in [(C, c), (O, o)]:
    assert e.b[pc+16:pc+24] == bytes.fromhex('b703000001000000')
    address = pointer(e, pc)
    offset, raw = at(e, address, 16)
    assert e.relocations[offset]['type'] == 8
    encoded, length = struct.unpack('<QQ', raw)
    target = encoded >> 32
    value = at(e, target, length)[1]
    assert length == 17 and value == b'__event_authority'
    records.append({'pc': pc, 'array_address': address, 'count': 1, 'array_bytes': 16,
                    'raw_record_hex': raw.hex(), 'relocation_type': 8,
                    'decoded_pointer': target, 'length': length, 'pointee_hex': value.hex()})
report = {'scope': 'Only the explicit bounded literal/schema spans below are checked, using actual ELF relocations. No arbitrary surrounding bytes or transitive object equality is assumed.',
          'source_program_id': key, 'literal_checks': checks,
          'parser_event_authority_seed_array': {'candidate': records[0], 'original': records[1],
                                               'relocation_decoded_value_equal': True},
          'script_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
(W / 'root-data-checks.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({'bounded_literal_checks': len(checks), 'one_record_seed_array_verified': True}))
