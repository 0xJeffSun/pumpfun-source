"""Relate shipped alloc objects to retained linked and captured bytes; no execution."""
from pathlib import Path
import hashlib
import importlib.util
import json
import re
import struct
import sys
import tarfile

HERE = Path(__file__).resolve().parent
CAPTURE = 'evidence/original/mayhem/deployed.so'
LINKED = {
    'linux': 'repro/mayhem/linux-v154-recovery/results/run-40293434354/unstripped.so',
    'darwin': 'repro/identity-audit/2026-10-25/mayhem-v154/build-01/unstripped.so',
}
PARENT = 'research/mayhem-sysroot-object-provenance'
FAMILY = re.compile(r'_ZN4core5error5Error7type_id17h[0-9a-f]{16}E')


def require(ok, message):
    if not ok:
        raise ValueError(message)


def read(path):
    return json.loads(path.read_bytes())


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def helpers(repo):
    spec = importlib.util.spec_from_file_location('elf', repo / PARENT / 'elf.py')
    elf = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(elf)
    sys.modules['elf'] = elf
    spec = importlib.util.spec_from_file_location('shipped_object_method', repo / PARENT / 'analyze.py')
    method = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(method)
    return elf, method


def load_objects(package=HERE):
    metadata = read(package / 'provenance.json')
    expected = {host + '/' + row['sha256'] + '.o': row
                for host, data in metadata['hosts'].items() for row in data['objects']}
    result = {}
    with tarfile.open(package / 'objects.tar.gz', 'r:gz') as archive:
        for member in archive:
            require(member.isfile() and member.name in expected and member.name not in result,
                    'unexpected/duplicate object member')
            row = expected[member.name]
            require(member.size == row['bytes'], 'object size differs')
            raw = archive.extractfile(member).read()
            require(sha(raw) == row['sha256'], 'object hash differs')
            result[member.name] = raw
    require(set(result) == set(expected), 'incomplete object archive')
    return result


def decode_type_id(raw):
    require(len(raw) == 40, 'expected complete 40-byte body')
    values = []
    for at, register in ((0, 0), (16, 1)):
        op, regs, offset, low = struct.unpack_from('<BBhI', raw, at)
        continuation, high = struct.unpack_from('<II', raw, at + 8)
        require((op, regs, offset, continuation) == (0x18, register, 0, 0), 'unexpected LDDW shape')
        values.append(low | (high << 32))
    require(raw[32:] == bytes.fromhex('9500000000000000'), 'unexpected terminal instruction')
    return dict(r0=f'0x{values[0]:016x}', r1=f'0x{values[1]:016x}')


def symbol_table(obj, table):
    require(table['entsize'] == 24 and table['size'] % 24 == 0, 'bad symbol table')
    strings = obj.section_bytes(table['link'])
    rows = []
    for at in range(table['offset'], table['offset'] + table['size'], 24):
        n, info, other, section, value, size = struct.unpack_from('<IBBHQQ', obj.data, at)
        rows.append(dict(name=obj.string(strings, n), info=info, other=other,
                         section=section, value=value, bytes=size))
    return rows


def object_references(obj, function):
    """Record complete referring sections, without applying any relocation."""
    tables = []
    for rel in obj.sections:
        if rel['type'] not in (4, 9):
            continue
        stride = 24 if rel['type'] == 4 else 16
        require(rel['entsize'] == stride and rel['size'] % stride == 0, 'bad object relocation table')
        symbols = symbol_table(obj, obj.sections[rel['link']])
        data = obj.sections[rel['info']]
        records = []
        for at in range(rel['offset'], rel['offset'] + rel['size'], stride):
            offset, info = struct.unpack_from('<QQ', obj.data, at)
            require(info >> 32 < len(symbols), 'relocation symbol out of bounds')
            require(offset + 8 <= data['size'], 'relocation field outside section')
            symbol = symbols[info >> 32]
            addend = struct.unpack_from('<q', obj.data, at + 16)[0] if stride == 24 else None
            records.append(dict(offset=offset, type=info & 0xffffffff, symbol_index=info >> 32,
                                symbol=symbol, explicit_addend=addend))
        targets = [r for r in records if r['symbol']['name'] == function['symbol']
                   and r['symbol']['section'] == function['section']
                   and r['symbol']['value'] == function['section_relative_offset']]
        if not targets:
            continue
        raw = obj.section_bytes(rel['info'])
        require(data['name'].startswith('.data.rel.ro.') and len(raw) == 88, 'unexpected referring section')
        require(len(targets) == 1 and targets[0]['offset'] == 56, 'unexpected type-ID field')
        require([r['offset'] for r in records] == [0, 24, 32, 40, 48, 56, 64, 72, 80], 'unexpected table fields')
        require(all(r['type'] == 1 and r['explicit_addend'] is None for r in records), 'unexpected object relocation kind')
        require(all(raw[r['offset']:r['offset'] + 8] == b'\0' * 8 for r in records), 'nonzero object pointer addend')
        require(struct.unpack_from('<QQ', raw, 8) == (24, 8), 'size/alignment fields differ')
        by_offset = {r['offset']: r['symbol']['name'] for r in records}
        require(all('StringError' in by_offset[x] for x in (0, 24, 32, 64)), 'StringError annotation missing')
        require('Debug' in by_offset[24] and 'Display' in by_offset[32], 'formatter annotations differ')
        tables.append(dict(section=data['name'], section_index=rel['info'], bytes=len(raw),
                           raw_hex=raw.hex(), sha256=sha(raw), relocations=records))
    require(len(tables) == 1, 'expected one referring StringError table')
    return tables


def capture_pointers(obj, method):
    text, relocations, calls, boundaries = method.context(obj)
    pointers = []
    for r in relocations:
        if r['type'] != 8:
            continue
        sites = [s for s in obj.sections if s['flags'] & 2 and s['type'] != 8
                 and s['addr'] <= r['address'] and r['address'] + 8 <= s['addr'] + s['size']]
        require(len(sites) == 1, 'stored relocation outside one allocated section')
        section = sites[0]
        if section['name'] == '.text':
            continue
        at = section['offset'] + r['address'] - section['addr']
        stored, = struct.unpack_from('<Q', obj.data, at)
        target = stored >> 32
        if text['addr'] <= target < text['addr'] + text['size']:
            require(stored & 0xffffffff == 0, 'nonzero stored pointer low word')
            require(target in boundaries, 'stored pointer targets a continuation/noninstruction')
            pointers.append(dict(site_address=r['address'], file_offset=at, target=target,
                                 raw_hex=obj.data[at:at + 8].hex(), relocation=r))
    return pointers, calls


def capture_matches(capture, body, method):
    ctx = method.context(capture)
    pointers, calls = capture_pointers(capture, method)
    entries = sorted(set(calls) | {r['target'] for r in pointers})
    hits = method.occurrences(capture, body, ctx)
    for hit in hits:
        start, end = hit['address'], hit['end_address']
        start_refs = [r for r in pointers if r['target'] == start]
        end_refs = [r for r in pointers if r['target'] == end]
        following = next((x for x in entries if x > start), None)
        require(start_refs and following == end and (end_refs or calls.get(end)), 'inferred boundary evidence missing')
        require(hit['relocation_free'], 'captured body has loader relocation overlap')
        hit.update(start_pointer_references=start_refs, end_pointer_references=end_refs,
                   next_referenced_entry=following)
    return hits


def derive(repo, package=HERE):
    elf, method = helpers(repo)
    objects = load_objects(package)
    metadata = read(package / 'provenance.json')
    capture = elf.Elf((repo / CAPTURE).read_bytes())
    result = {}
    for host, record in metadata['hosts'].items():
        selected = []
        function_count = 0
        for row in record['objects']:
            raw = objects[host + '/' + row['sha256'] + '.o']
            obj = elf.Elf(raw)
            require((obj.kind, obj.machine, obj.flags) == (1, 263, 0), 'expected generic-v0 relocatable object')
            functions = method.functions(obj)
            function_count += len(functions)
            for f in functions:
                if not FAMILY.fullmatch(f['symbol']):
                    continue
                require(not obj.object_relocations(f), 'type-ID body has object relocations')
                body = elf.body(obj, f)
                selected.append(dict(member=row['name'], object_sha256=row['sha256'], function=f,
                    raw_hex=body.hex(), constants=decode_type_id(body), object_references=object_references(obj, f),
                    capture_matches=capture_matches(capture, body, method)))
        require(len(selected) == 1, 'expected exactly one type-ID object function per host')
        target = selected[0]
        linked = elf.Elf((repo / LINKED[host]).read_bytes())
        method.context(linked)
        counterparts = [f for f in method.functions(linked) if FAMILY.fullmatch(f['symbol'])]
        require(len(counterparts) == 2, 'expected two linked type-ID symbols')
        for f in counterparts:
            require(elf.body(linked, f) == bytes.fromhex(target['raw_hex']), 'linked body differs from shipped object')
        target['linked_functions'] = counterparts
        result[host] = dict(total_object_function_records=function_count, selected_type_id=target)
    linux, darwin = (result[h]['selected_type_id'] for h in ('linux', 'darwin'))
    require([h['file_offset'] for h in linux['capture_matches']] == [599768, 666624], 'Linux capture cohort differs')
    require(not darwin['capture_matches'], 'unexpected Darwin raw capture match')
    a, b = bytes.fromhex(linux['raw_hex']), bytes.fromhex(darwin['raw_hex'])
    differences = [i for i, (x, y) in enumerate(zip(a, b)) if x != y]
    require(differences and set(differences) <= set(range(4, 8)) | set(range(12, 16)) |
            set(range(20, 24)) | set(range(28, 32)), 'host difference outside constant immediates')
    return dict(hosts=result, host_body_differing_offsets=differences,
                raw_capture_ranges=2, newly_added_raw_capture_ranges=0,
                possible_linked_to_capture_pairs=4, unique_copy_attribution=False,
                compiler_linker_or_vm_executions=0, historical_type_identity_proven=False)
