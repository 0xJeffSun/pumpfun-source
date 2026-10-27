"""Actual source, host-artifact and target-byte mutations; no compiler or VM."""
import copy
import json
from pathlib import Path
import sys

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
sys.path.insert(0, str(P))
import verify


def run():
    rejected = []
    original_archive, original_unzip = verify.archive, verify.unzip
    def failure(label, action):
        try:
            action()
        except (AssertionError, KeyError, StopIteration):
            rejected.append(label)
        else:
            raise AssertionError(('mutation accepted', label))
    for label, target, path in [('program_root_source', 'source.tar.gz', 'src/lib.rs'),
                                 ('historical_macro_source', 'historical-source.tar.gz', 'lang/attribute/program/src/declare_program/mods/utils.rs')]:
        def changed_archive(name, target=target, path=path):
            files = original_archive(name)
            if name == target:
                files[path] += b'\n// mutated input\n'
            return files
        verify.archive = changed_archive
        failure(label, verify.static)
        verify.archive = original_archive
    for label, filename in [('host_macro_bytes', 'host-macro.so.gz'), ('root_candidate_bytes', 'candidate.so.gz')]:
        def changed_unzip(name, filename=filename):
            data = original_unzip(name)
            return data[:-1] + bytes([data[-1] ^ 1]) if name == filename else data
        verify.unzip = changed_unzip
        failure(label, verify.static)
        verify.unzip = original_unzip
    wm = verify.module('mutation_windows', P / 'window_map.py')
    original, candidate = [verify.unzip(n + '.so.gz') for n in ['original', 'symbols']]
    source = next(x for x in wm.windows(original) if x['address'] == 538944)
    counterpart = [x for x in wm.windows(candidate) if x['raw_sha256'] == source['raw_sha256']]
    assert counterpart
    for label, byte_position in [('new_raw_body_register', 1), ('new_raw_body_scalar', 4)]:
        image = bytearray(candidate)
        for function in counterpart:
            rows = wm.m.instructions(candidate, function['address'], function['bytes'])
            row = (next(r for r in rows if r['opcode'] in [0xb7, 0x07, 0x57])
                   if byte_position == 4 else next(r for r in rows if r['opcode'] in [0x79, 0x7b]))
            address = function['address'] + row['offset']
            section = next(s for s in wm.m.elf_layout(candidate)['sections'] if s['type'] != 8 and s['address'] <= address < s['address'] + s['size'])
            offset = section['offset'] + address - section['address'] + byte_position
            image[offset] ^= 1 if byte_position == 4 else 0x10
        assert not any(r['raw_sha256'] == source['raw_sha256'] for r in wm.windows(bytes(image)))
        rejected.append(label)
    # These changes preserve the initializer's masked body, but must fail typed closure.
    import struct
    current = verify.unzip('current430-symbols.so.gz')
    windows = wm.windows(current)
    original_windows = wm.windows(original)
    init = next(r for r in windows if r['name'] and '5state10initialize17' in r['name'])
    rows = wm.m.instructions(current, init['address'], init['bytes'])
    def offset(address):
        section = next(s for s in wm.m.elf_layout(current)['sections'] if s['type'] != 8 and s['address'] <= address < s['address'] + s['size'])
        return section['offset'] + address - section['address']
    mutations = {}
    row = next(r for r in rows if r['offset'] == 736)
    image = bytearray(current)
    struct.pack_into('<I', image, offset(row['lddw_value'] + 16), 533)
    mutations['initializer_source_line'] = bytes(image)
    row = next(r for r in rows if r['offset'] == 920)
    method = next(r for r in windows if r['bytes'] == 328)
    image = bytearray(current)
    struct.pack_into('<Q', image, offset(row['lddw_value'] + 24), method['address'] << 32)
    mutations['initializer_vtable_method'] = bytes(image)
    row = next(r for r in rows if r['offset'] == 344)
    image = bytearray(current)
    struct.pack_into('<i', image, offset(init['address'] + row['offset']) + 4,
                     (method['address'] - (init['address'] + row['offset'] + 8)) // 8)
    mutations['initializer_clock_call_target'] = bytes(image)
    for label, image in mutations.items():
        assert next(r for r in wm.windows(image) if r['address'] == init['address'])['signature'] == init['signature']
        failure(label, lambda image=image: verify.initializer_references(wm, original, original_windows, image, wm.windows(image)))
    # Optional signature-library check, independent of the target execution harness.
    from solders.transaction import Transaction
    import base64, gzip
    receipt = json.loads(gzip.decompress((P / 'runtime/initializer-rejections.json.gz').read_bytes()))
    raw = bytearray(base64.b64decode(receipt['cases'][0]['original_executions'][0]['signed_transaction_base64']))
    assert all(Transaction.from_bytes(bytes(raw)).verify_with_results())
    raw[1] ^= 1
    assert not all(Transaction.from_bytes(bytes(raw)).verify_with_results())
    rejected.append('actual_signature_byte')
    assert len(rejected) == 10
    return dict(rejected=rejected, scope='Only these ten concrete mutations; no target execution.')


if __name__ == '__main__':
    print(json.dumps(run(), sort_keys=True))
