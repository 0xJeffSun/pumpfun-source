#!/usr/bin/env python3
"""Reproduce the recorded REA 6.8.0 sBPF adapter in a new, caller-selected directory."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[2]
RECORD = ROOT / 'repro/rea/2026-10-26'
RECORD_SHA = 'f3ee042d5b0fdc1f54542eb2d65317623427f1c9e8c73592ba0001f3b674955f'
RELOCATIONS_SHA = 'a1f5676b7531c0a3ed317aa1c1eabfcfc48e49d30392c2f76b6d8fe5ea45d302'
REPORT = 'sbpf-adapter-report.json'


def sha(data):
    return hashlib.sha256(data).hexdigest()


def recorded_recipe():
    manifest = (RECORD / 'adapter-manifest.json').read_bytes()
    relocations = (RECORD / 'relocation-method.java.txt').read_bytes()
    if sha(manifest) != RECORD_SHA or sha(relocations) != RELOCATIONS_SHA:
        raise ValueError('Recorded adapter recipe changed; do not silently reseal it')
    return json.loads(manifest), relocations.decode('utf-8')


def replace_once(text, old, new):
    if text.count(old) != 1:
        raise ValueError('Expected exactly one occurrence of a recorded patch boundary')
    return text.replace(old, new, 1)


def transform(name, data, relocations):
    """The original two scripts' ordered text transforms, without their host paths."""
    text = data.decode('utf-8')
    if name == 'dist/domain/elfFixedHeader.js' or '/peMachine-' in name:
        if name == 'dist/domain/elfFixedHeader.js':
            old = '        case 243: // EM_RISCV:'
            new = ('        case 263: // Local adapter: EM_SBF; requires explicit Ghidra sBPF processor.\n'
                   '            return "sbpf";\n' + old)
        else:
            old = '\t\t\t\tcase 243: return "riscv";'
            new = '\t\t\t\tcase 263: return "sbpf";\n' + old
        text = replace_once(text, old, new)
        header = 'const headerSize = readU16(elfClass === 32 ? 40 : 52);'
        gate = ('if (machine === 263 && (elfClass !== 64 || !littleEndian || readU16(16) !== 3 || readU32(48) !== 0)) '
                'return err("Local sBPF adapter admits only ELF64 little-endian ET_DYN with flags zero");')
        text = replace_once(text, header, header + '\n' + gate)
    if name.endswith('.js'):
        pattern = r'((?:BINARY_ARCHITECTURES = \[|SUPPORTED_ARCHITECTURES = new Set\(\[)(.*?)(?:\]))'
        text = re.sub(pattern, lambda m: m.group(0).replace('"hexagon"', '"hexagon", "sbpf"'), text, flags=re.S)
        annotation = 'annotation_policy: "atomic-function-entry-metadata-v1",'
        label = 'local_sbpf_call_relocations: "ELF-R_BPF_64_32-in-ephemeral-memory-v1",'
        text = text.replace(annotation, annotation + '\n' + label)
        old = '"The session serves operations only after Ghidra reports default auto-analysis complete; incomplete analysis does not expose partial results.",'
        limit = '"Local sBPF adapter: declared ELF call relocations are applied in temporary Ghidra memory using the ELF symbol table and the installed processor syscall map. Original files are unchanged; read_bytes may return relocated analysis bytes. Function seeds remain analyst assertions.",'
        text = text.replace(old, limit + '\n' + old)
    else:
        text = replace_once(text, '        String[] args = getScriptArgs();',
                            '        applySbfCallRelocations();\n        String[] args = getScriptArgs();')
        index = text.index('    @Override')
        text = text[:index] + relocations + '\n' + text[index:]
    return text.encode('utf-8')


def inventory(root):
    """Hash package files, excluding installed dependencies; never follow symlinks."""
    result = {}
    for directory, directories, files in os.walk(root, followlinks=False):
        directories[:] = sorted(name for name in directories if name != 'node_modules')
        for name in directories + sorted(files):
            path = Path(directory) / name
            if path.is_symlink():
                raise ValueError(f'Package symlink is not supported: {path.relative_to(root)}')
            if path.is_file():
                result[str(path.relative_to(root))] = sha(path.read_bytes())
    return result


def prepare(source, output, dependencies):
    source = source.resolve(strict=True)
    dependencies = dependencies.resolve(strict=True)
    # Check lexically first so an existing dangling symlink is also refused.
    if output.exists() or output.is_symlink():
        raise ValueError('Output already exists; choose a new directory')
    output = output.resolve()
    if output.is_relative_to(source) or source.is_relative_to(output):
        raise ValueError('Source and output must not overlap')
    if dependencies.is_relative_to(output) or not dependencies.is_dir():
        raise ValueError('Dependencies must be an existing directory outside output')
    nested = source / 'node_modules'
    if nested.exists() and nested.resolve() != dependencies:
        raise ValueError('A separate nested dependency tree exists; select that tree explicitly')
    package = json.loads((source / 'package.json').read_bytes())
    if (package.get('name'), package.get('version')) != ('rea-agents', '6.8.0'):
        raise ValueError('This recipe supports only the recorded rea-agents@6.8.0 package')
    recipe, relocations = recorded_recipe()
    before = inventory(source)
    if REPORT in before:
        raise ValueError('Source already contains an adapter report')
    patches = {}
    for row in recipe['files']:
        name = row['file']
        if before.get(name) != row['original_sha256']:
            raise ValueError(f'Original package file differs from the recorded input: {name}')
        patched = transform(name, (source / name).read_bytes(), relocations)
        if sha(patched) != row['adapter_sha256']:
            raise ValueError(f'Transform differs from the recorded adapter: {name}')
        patches[name] = patched
    # Validate every transform before creating output. Never remove/reuse a directory.
    shutil.copytree(source, output, ignore=shutil.ignore_patterns('node_modules'))
    for name, patched in patches.items():
        (output / name).write_bytes(patched)
    expected = dict(before)
    expected.update({name: sha(data) for name, data in patches.items()})
    if inventory(source) != before or inventory(output) != expected:
        raise ValueError('Package changed during copying; preserve this failed output for inspection')
    (output / 'node_modules').symlink_to(dependencies, target_is_directory=True)
    report = {
        'package': recipe['package'], 'source': str(source), 'output': str(output),
        'dependency_root': str(dependencies), 'source_unchanged': True,
        'recipe_sha256': RECORD_SHA, 'relocations_sha256': RELOCATIONS_SHA,
        'matched_adapter_files': len(patches), 'files': recipe['files'],
        'package_source_sha256': before, 'package_output_sha256': expected,
        'scope': ('Reproduces the 12 recorded adapter files, not the Pump programs. '
                  'Other package files are copied unchanged. Dependencies are linked, '
                  'not authenticated by this report. No Ghidra/processor installation, '
                  'MCP registration, target execution, or program byte-equality claim.'),
    }
    with (output / REPORT).open('x', encoding='utf-8') as stream:
        json.dump(report, stream, indent=2, sort_keys=True)
        stream.write('\n')
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True, help='Unmodified rea-agents@6.8.0 package directory')
    parser.add_argument('--output', type=Path, required=True, help='New directory; must not exist')
    parser.add_argument('--dependencies', type=Path, required=True, help='Existing node_modules used by the package')
    args = parser.parse_args()
    try:
        report = prepare(args.source, args.output, args.dependencies)
    except (OSError, ValueError) as error:
        parser.exit(2, f'{error}\n')
    print(json.dumps({key: report[key] for key in ['package', 'output', 'matched_adapter_files', 'source_unchanged', 'scope']}, indent=2))


if __name__ == '__main__':
    main()
