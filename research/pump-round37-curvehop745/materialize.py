#!/usr/bin/env python3
"""Materialize authenticated Round37 Rust inputs and explicitly selected attributed source stages.

No compiler, subprocess, network, ELF, VM, or original-program input is used.
"""
import argparse, hashlib, json, re
from pathlib import Path
HERE = Path(__file__).resolve().parent
PINS = json.loads((HERE / 'source-pins.json').read_text())
WORKSPACE = b'[workspace]\nmembers = ["programs/pump"]\nresolver = "2"\n\n[profile.release]\npanic = "abort"\noverflow-checks = true\nlto = false\ncodegen-units = 1\n'
OLD = b'constraint=bonding_curve.quote_mint==quote_mint.key()'
NEW = b'constraint=quote_mint.key()==bonding_curve.quote_mint'
def digest(data):
    return hashlib.sha256(data).hexdigest()
def swap(data):
    if data.count(OLD) != 1:
        raise ValueError('exact original comparison required')
    changed = data.replace(OLD, NEW, 1)
    if digest(changed) != PINS['changed_source_sha256']:
        raise ValueError('unexpected source, fallback, coordinates or surrounding text')
    return changed
def safe_relative(name):
    p = Path(name)
    if p.is_absolute() or '..' in p.parts or not p.parts:
        raise ValueError('unsafe relative source path')
    return p

def reserve_swap(data):
    pins = json.loads((HERE / 'reserve-pins.json').read_text())
    old = b'let numerator = (denominator as u128 + virtual_token_reserves as u128)'
    new = b'let numerator = (denominator as u128).checked_add(virtual_token_reserves as u128).ok_or(PumpError::Overflow)?'
    if digest(data) != pins['parent_sha256'] or data.count(old) != 1:
        raise ValueError('exact reserve parent source required')
    changed = data.replace(old, new, 1)
    if digest(changed) != pins['changed_sha256']:
        raise ValueError('reserve source, errors or coordinates changed')
    return changed

def arithmetic_apply(staged):
    pins = json.loads((HERE / 'arithmetic-pins.json').read_text())
    changed = dict(staged)
    for name, entry in pins['changes'].items():
        name = str(safe_relative(name))
        data = changed.get(name)
        expected = entry['parent_sha256']
        if (data is None) != (expected is None) or (data is not None and digest(data) != expected):
            raise ValueError('exact arithmetic parent source required: ' + name)
        for operation in entry['operations']:
            old = operation['old']
            new = operation['new'].encode()
            if old is None:
                if data is not None:
                    raise ValueError('arithmetic added source already exists')
                data = new
            else:
                old = old.encode()
                if not old or data is None or data.count(old) != 1:
                    raise ValueError('arithmetic source context must occur exactly once')
                data = data.replace(old, new, 1)
        if data is None or digest(data) != entry['changed_sha256']:
            raise ValueError('arithmetic source, errors or coordinates changed')
        changed[name] = data
    return changed

def sourcefronts_apply(staged):
    pins = json.loads((HERE / 'sourcefronts-pins.json').read_text())
    if {n: digest(v) for n, v in staged.items()} != pins['parent_source_sha256']:
        raise ValueError('exact sourcefronts parent inventory required')
    patch = (HERE / 'sourcefronts.patch').read_bytes()
    if digest(patch) != pins['patch_sha256']:
        raise ValueError('sourcefronts patch changed')
    lines = patch.decode().splitlines(True)
    changed = dict(staged)
    i = 0
    while i < len(lines):
        if not lines[i].startswith('--- ') or not lines[i+1].startswith('+++ b/'):
            raise ValueError('invalid source patch header')
        old = lines[i][4:].strip()
        name = str(safe_relative(lines[i+1][6:].strip()))
        if old not in ('a/' + name, '/dev/null') or (old == '/dev/null') != (name not in changed):
            raise ValueError('invalid source patch parent')
        before = changed.get(name, b'').decode().splitlines(True)
        result, cursor = [], 0
        i += 2
        while i < len(lines) and lines[i].startswith('@@'):
            match = re.fullmatch(r'@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@\n', lines[i])
            if not match:
                raise ValueError('invalid source hunk')
            start = max(0, int(match[1]) - 1)
            oldlen, newlen = int(match[2] or 1), int(match[4] or 1)
            if start < cursor:
                raise ValueError('overlapping source hunks')
            result += before[cursor:start]
            oldh, newh = [], []
            i += 1
            while i < len(lines) and not lines[i].startswith(('@@', '--- ')):
                line = lines[i]
                if line[0] not in ' +-':
                    raise ValueError('invalid source hunk line')
                if line[0] in ' -': oldh.append(line[1:])
                if line[0] in ' +': newh.append(line[1:])
                i += 1
            if len(oldh) != oldlen or len(newh) != newlen or before[start:start+oldlen] != oldh:
                raise ValueError('source hunk context changed')
            result += newh
            cursor = start + oldlen
        result += before[cursor:]
        changed[name] = ''.join(result).encode()
    if {n: digest(v) for n, v in changed.items()} != pins['source_sha256']:
        raise ValueError('sourcefronts output map changed')
    return changed

def clamp_apply(staged):
    pins = json.loads((HERE / 'clamp-pins.json').read_text())
    parent_map = json.loads((HERE / 'sourcefronts-pins.json').read_text())['source_sha256']
    if {n: digest(v) for n, v in staged.items()} != parent_map:
        raise ValueError('exact clamp parent inventory required')
    name = str(safe_relative(pins['changed_path']))
    data = staged[name]
    old, new = pins['old'].encode(), pins['new'].encode()
    if digest(data) != pins['parent_sha256'] or not old or data.count(old) != 1:
        raise ValueError('exact clamp source context required')
    changed = data.replace(old, new, 1)
    if digest(changed) != pins['changed_sha256']:
        raise ValueError('clamp source, guards or coordinates changed')
    result = dict(staged)
    result[name] = changed
    expected = dict(parent_map)
    expected[name] = pins['changed_sha256']
    if {n: digest(v) for n, v in result.items()} != expected:
        raise ValueError('clamp output inventory changed')
    return result

def materialize(parent, output, stage='curvehop745'):
    if stage not in ('curvehop745', 'reserve746', 'arithmetic749', 'sourcefronts780', 'clamp786'):
        raise ValueError('unknown source stage')
    parent, output = Path(parent).absolute(), Path(output).absolute()
    if any(p.is_symlink() for p in [parent, *parent.parents, output, *output.parents]):
        raise ValueError('symlink path')
    if output.exists():
        raise ValueError('output must not exist')
    checkpoint = (parent / 'CHECKPOINT.json').read_bytes()
    if digest(checkpoint) != PINS['checkpoint_sha256']:
        raise ValueError('wrong parent checkpoint')
    if json.loads(checkpoint)['source_sha256'] != PINS['parent_source_sha256']:
        raise ValueError('parent source map changed')
    staged = {}
    for name, expected in PINS['parent_source_sha256'].items():
        rel = safe_relative(name)
        if name == 'Cargo.toml':
            data = WORKSPACE
        else:
            local = Path('Cargo.lock') if name == 'Cargo.lock' else rel.relative_to('programs/pump')
            source = parent / 'primary' / local
            if any(p.is_symlink() for p in [source, *source.parents]):
                raise ValueError('symlink input')
            data = source.read_bytes()
        if digest(data) != expected:
            raise ValueError('source mismatch: ' + name)
        staged[name] = swap(data) if name == PINS['changed_path'] else data
    if stage in ('reserve746', 'arithmetic749', 'sourcefronts780', 'clamp786'):
        reserve = json.loads((HERE / 'reserve-pins.json').read_text())
        name = str(safe_relative(reserve['changed_path']))
        staged[name] = reserve_swap(staged[name])
    if stage in ('arithmetic749', 'sourcefronts780', 'clamp786'):
        staged = arithmetic_apply(staged)
    if stage in ('sourcefronts780', 'clamp786'):
        staged = sourcefronts_apply(staged)
    if stage == 'clamp786':
        staged = clamp_apply(staged)
    if len(staged) != (60 if stage in ('sourcefronts780', 'clamp786') else 58 if stage == 'arithmetic749' else 57):
        raise ValueError('unexpected source inventory')
    output.mkdir(parents=True)
    for name, data in staged.items():
        dst = output / safe_relative(name)
        dst.parent.mkdir(parents=True, exist_ok=True)
        with dst.open('xb') as stream:
            stream.write(data)
    return {name: digest(data) for name, data in staged.items()}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--parent', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    parser.add_argument('--stage', choices=['curvehop745', 'reserve746', 'arithmetic749', 'sourcefronts780', 'clamp786'], default='curvehop745')
    args = parser.parse_args()
    result = materialize(args.parent, args.output, args.stage)
    print(json.dumps({'stage': args.stage, 'source_files': len(result), 'source_sha256': result}, indent=2, sort_keys=True))
if __name__ == '__main__':
    main()
