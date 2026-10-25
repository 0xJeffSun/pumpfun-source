"""Independently compare whole ELF bytes and section extents without editing."""
from pathlib import Path
import hashlib
import json
import struct

WORK = Path(__file__).resolve().parent
ROOT = WORK.parents[1]
sha = lambda data: hashlib.sha256(data).hexdigest()

def read_elf(path):
    data = path.read_bytes()
    offset = struct.unpack_from('<Q', data, 40)[0]
    size, count, names_index = struct.unpack_from('<HHH', data, 58)
    headers = [struct.unpack_from('<IIQQQQIIQQ', data, offset + i * size) for i in range(count)]
    names_header = headers[names_index]
    names = data[names_header[4]:names_header[4] + names_header[5]]
    extent = max(offset + size * count, max(h[4] + h[5] for h in headers if h[1] != 8))
    return data, {'path': str(path.relative_to(ROOT)), 'bytes': len(data), 'sha256': sha(data),
                  'elf_extent': extent, 'elf_extent_sha256': sha(data[:extent]),
                  'e_machine': struct.unpack_from('<H', data, 18)[0],
                  'e_flags': struct.unpack_from('<I', data, 48)[0],
                  'sections': {names[h[0]:].split(b'\0', 1)[0].decode():
                               {'offset': h[4], 'bytes': h[5], 'type': h[1], 'flags': h[2],
                                'sha256': sha(data[h[4]:h[4] + h[5]])} for h in headers}}

a, original = read_elf(ROOT / 'evidence/original/pump_amm/deployed.so')
rows = {}
for label, path in [('serializer_only', WORK / 'build/artifacts/pump_amm_recovered.so'),
                    ('published_amm37', ROOT / 'repro/pump_amm/multi-hop-thirty-seven/pump_amm_recovered.so')]:
    b, candidate = read_elf(path)
    differences = [i for i, (x, y) in enumerate(zip(a, b)) if x != y]
    comparison = {'full_byte_equality': a == b,
                  'elf_extent_byte_equality': a[:original['elf_extent']] == b[:candidate['elf_extent']],
                  'first_difference': differences[0] if differences else None,
                  'different_positions_in_shared_length': len(differences),
                  'length_difference': len(b) - len(a)}
    rows[label] = {'candidate': candidate, 'comparison': comparison}
generated = json.loads((WORK / 'build/build-comparison.json').read_text())['comparison']
assert all(value == generated[key] for key, value in rows['serializer_only']['comparison'].items() if key in generated)
report = {'scope': 'Independent whole-byte and ELF extent comparison; source-only serializer correction, no executable edits.',
          'original': original, 'builds': rows, 'agrees_with_build_helper': True}
(WORK / 'independent-comparisons.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({label: {'sha256': row['candidate']['sha256'], 'bytes': row['candidate']['bytes'], **row['comparison']} for label, row in rows.items()}, indent=2))
