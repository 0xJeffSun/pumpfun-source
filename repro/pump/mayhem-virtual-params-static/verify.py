#!/usr/bin/env python3
"""Portable static-only verifier. Standard library; no extraction or program execution."""
import argparse
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import struct
import tarfile

HERE = Path(__file__).resolve().parent
sha256 = lambda data: hashlib.sha256(data).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def archive(path):
    result = {}
    with tarfile.open(path, 'r:gz') as stream:
        for member in stream.getmembers():
            p = PurePosixPath(member.name)
            require(member.isfile() and not p.is_absolute() and '..' not in p.parts,
                    f'Unexpected archive member: {member.name}')
            require(member.name not in result, f'Duplicate archive member: {member.name}')
            result[member.name] = stream.extractfile(member).read()
    return result


def git_id(kind, data):
    return hashlib.sha1(f'{kind} {len(data)}\0'.encode() + data).hexdigest()


def tree_entries(raw):
    result = {}
    cursor = 0
    while cursor < len(raw):
        space = raw.index(b' ', cursor)
        end = raw.index(b'\0', space)
        mode = raw[cursor:space].decode()
        name = raw[space + 1:end].decode()
        object_id = raw[end + 1:end + 21].hex()
        require(len(object_id) == 40 and name not in result, 'Malformed Git tree')
        result[name] = (mode, object_id)
        cursor = end + 21
    require(cursor == len(raw), 'Truncated Git tree')
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=HERE.parents[2])
    parser.add_argument('--original', type=Path)
    parser.add_argument('--candidate', type=Path)
    args = parser.parse_args()
    manifest = json.loads((HERE / 'package-manifest.json').read_bytes())
    for row in manifest['files']:
        data = (HERE / row['path']).read_bytes()
        require(len(data) == row['bytes'] and sha256(data) == row['sha256'],
                f"Publication file mismatch: {row['path']}")
    require({p.name for p in HERE.iterdir() if p.is_file()} ==
            {row['path'] for row in manifest['files']} | {'package-manifest.json'},
            'Unexpected or missing publication file')
    provenance = json.loads((HERE / 'provenance.json').read_bytes())
    for name, row in provenance['archives'].items():
        data = (HERE / name).read_bytes()
        require(len(data) == row['bytes'] and sha256(data) == row['sha256'], name)
    historical = archive(HERE / 'historical-evidence.tar.gz')
    original_manifest = historical['manifest.json']
    require(sha256(original_manifest) == provenance['historical_manifest_sha256'],
            'Historical manifest changed')
    sealed = json.loads(original_manifest)
    require(len(sealed['files']) == 59, 'Historical file count changed')
    require(set(historical) == {row['path'] for row in sealed['files']} | {'manifest.json'},
            'Historical archive membership changed')
    for row in sealed['files']:
        data = historical[row['path']]
        require(len(data) == row['bytes'] and sha256(data) == row['sha256'],
                f"Historical file mismatch: {row['path']}")
    inputs = json.loads(historical['inputs.json'])
    require(inputs['source_git_revision'] == provenance['source_git_revision'],
            'Source revision mismatch')
    refs = archive(HERE / 'reference-snapshots.tar.gz')
    require(set(refs) == {row['path'] for row in inputs['references']},
            'Historical reference membership mismatch')
    for row in inputs['references']:
        require(sha256(refs[row['path']]) == row['sha256'], row['path'])
    require(sha256(refs['evidence/upstream/pump.json']) == provenance['captured_idl_sha256'],
            'Captured IDL mismatch')
    idl = json.loads(refs['evidence/upstream/pump.json'])
    excerpt = json.loads(historical['idl-excerpt.json'])
    instruction = next(x for x in idl['instructions'] if x['name'] == 'set_mayhem_virtual_params')
    require(instruction == excerpt['instruction'] and instruction['args'] == [],
            'Instruction IDL excerpt mismatch')
    require(bytes(instruction['discriminator']).hex() == '3da9bcbf99952a61', 'Discriminator mismatch')
    require(instruction['accounts'][0]['signer'] is True, 'PDA signer prerequisite changed')

    sources = archive(HERE / 'frozen-source.tar.gz')
    objects = {}
    for name, data in sources.items():
        if name.startswith('git-objects/'):
            object_id, kind = name.split('/')[1].split('.')
            require(kind in {'commit', 'tree'} and git_id(kind, data) == object_id,
                    f'Invalid Git object: {name}')
            objects[object_id] = (kind, data)
    revision = inputs['source_git_revision']
    kind, commit = objects[revision]
    require(kind == 'commit', 'Source revision is not a commit')
    root_tree = commit.split(b'\n', 1)[0].decode().removeprefix('tree ')
    require(len(root_tree) == 40, 'Malformed commit tree')
    for row in inputs['baseline_source_files']:
        data = sources[row['path']]
        require(len(data) == row['bytes'] and sha256(data) == row['sha256'], row['path'])
        tree_id = root_tree
        parts = PurePosixPath(row['path']).parts
        for i, part in enumerate(parts):
            tree_kind, tree_data = objects[tree_id]
            require(tree_kind == 'tree', f'Expected tree: {tree_id}')
            mode, object_id = tree_entries(tree_data)[part]
            if i == len(parts) - 1:
                require(mode in {'100644', '100755'} and git_id('blob', data) == object_id,
                        f'Git source binding mismatch: {row["path"]}')
            else:
                require(mode == '40000', f'Expected directory: {part}')
                tree_id = object_id
    require(set(sources) == {row['path'] for row in inputs['baseline_source_files']} |
            {f'git-objects/{key}.{value[0]}' for key, value in objects.items()},
            'Source archive membership mismatch')

    original_path = args.original or args.repo / inputs['original_elf']['path']
    candidate_path = args.candidate or args.repo / inputs['published_candidate_elf']['path']
    original = original_path.read_bytes()
    candidate = candidate_path.read_bytes()
    for row, data, label in [(inputs['original_elf'], original, 'original'),
                             (inputs['published_candidate_elf'], candidate, 'Pump42 candidate')]:
        require(len(data) == row['bytes'] and sha256(data) == row['sha256'], f'{label} ELF mismatch')
        require(row['sha256'] == provenance[f'{"original" if label == "original" else "pump42_candidate"}_sha256'],
                f'{label} provenance mismatch')
    instructions = branches = calls = 0
    for window in inputs['windows']:
        start, end = int(window['start'], 16), int(window['end'], 16)
        require(end - start == window['bytes'] and sha256(original[start:end]) == window['sha256'],
                f'Original window mismatch: {window["name"]}')
        rows = json.loads(historical[window['name'] + '.json'])
        cursor = start
        for row in rows:
            at = int(row['at'], 16)
            raw = bytes.fromhex(row['raw_hex'])
            require(at == cursor and original[at:at + len(raw)] == raw, f'Raw instruction mismatch: {at:#x}')
            cursor += len(raw)
            instructions += 1
            if 'branch_displacement' in row:
                displacement = struct.unpack_from('<h', raw, 2)[0]
                require(displacement == row['branch_displacement'] and
                        at + 8 + 8 * displacement == int(row['branch_target'], 16), f'Branch mismatch: {at:#x}')
                branches += 1
            if 'call_target' in row:
                require(raw[0] == 0x85 and raw[1] >> 4 == 1 and
                        at + 8 + 8 * struct.unpack_from('<i', raw, 4)[0] == int(row['call_target'], 16),
                        f'Direct call mismatch: {at:#x}')
                calls += 1
            if 'pointer' in row:
                ptr = int(row['pointer'], 16)
                require(original[ptr:ptr + 80].hex() == row['data80_hex'], f'Data pointer mismatch: {at:#x}')
        require(cursor == end, f'Incomplete window: {window["name"]}')
        require(historical[window['name'] + '.asm'].decode() == '\n'.join(x['annotated'] for x in rows) + '\n',
                f'Assembly annotation mismatch: {window["name"]}')
    require(inputs['full_bytes_equal'] is False and inputs['recovered_handler_count_increment'] == 0,
            'Historical scope changed')
    return {
        'result': 'pass', 'scope': 'portable static evidence verification only',
        'historical_sealed_files': 59, 'historical_manifest_sha256': sha256(original_manifest),
        'source_git_revision': revision, 'source_files': len(inputs['baseline_source_files']),
        'git_objects': len(objects), 'historical_references': len(refs),
        'windows': len(inputs['windows']), 'instructions': instructions,
        'branch_targets': branches, 'direct_call_targets': calls,
        'original_sha256': sha256(original), 'pump42_candidate_sha256': sha256(candidate),
        'captured_idl_sha256': provenance['captured_idl_sha256'],
        'source_hypothesis': 'uncompiled', 'genuine_signer_invocation': 'unavailable in this lane',
        'new_handlers': 0, 'new_runtime_receipts': 0, 'builds': 0, 'full_bytes_equal': False,
    }


if __name__ == '__main__':
    print(json.dumps(main(), indent=2))
