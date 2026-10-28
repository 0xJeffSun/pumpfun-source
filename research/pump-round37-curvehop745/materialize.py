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

def visibility_apply(staged):
    pins = json.loads((HERE / 'visibility-pins.json').read_text())
    if {n: digest(v) for n, v in staged.items()} != pins['parent_source_sha256']:
        raise ValueError('exact visibility parent inventory required')
    result = dict(staged)
    for path, change in pins['changes'].items():
        name = str(safe_relative(path))
        data = result[name]
        if digest(data) != change['parent_sha256']:
            raise ValueError('visibility parent source changed')
        for edit in change['replacements']:
            old, new = edit['old'].encode(), edit['new'].encode()
            if not old or data.count(old) != 1:
                raise ValueError('visibility source context changed')
            data = data.replace(old, new, 1)
        if digest(data) != change['changed_sha256']:
            raise ValueError('visibility source or coordinates changed')
        result[name] = data
    if {n: digest(v) for n, v in result.items()} != pins['source_sha256']:
        raise ValueError('visibility output inventory changed')
    return result

def v2rent_apply(staged):
    pins = json.loads((HERE / 'v2rent-pins.json').read_text())
    parent_map = json.loads((HERE / 'visibility-pins.json').read_text())['source_sha256']
    if {n: digest(v) for n, v in staged.items()} != parent_map:
        raise ValueError('exact v2 rent parent inventory required')
    name = str(safe_relative(pins['changed_path']))
    data = staged[name]
    old, new = pins['old'].encode(), pins['new'].encode()
    if digest(data) != pins['parent_sha256'] or not old or data.count(old) != 1:
        raise ValueError('exact v2 rent source context required')
    changed = data.replace(old, new, 1)
    if digest(changed) != pins['changed_sha256']:
        raise ValueError('v2 rent source, guards or coordinates changed')
    result = dict(staged)
    result[name] = changed
    expected = dict(parent_map)
    expected[name] = pins['changed_sha256']
    if {n: digest(v) for n, v in result.items()} != expected:
        raise ValueError('v2 rent output inventory changed')
    return result

def fourfronts_apply(staged):
    pins = json.loads((HERE / 'fourfronts-pins.json').read_text())
    if {n: digest(v) for n, v in staged.items()} != pins['parent_source_sha256']:
        raise ValueError('exact fourfronts parent inventory required')
    patch = (HERE / 'fourfronts.patch').read_bytes()
    if digest(patch) != pins['patch_sha256']:
        raise ValueError('fourfronts patch changed')
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
        raise ValueError('fourfronts output map changed')
    return changed

def harvest_apply(staged):
    pins = json.loads((HERE / 'harvest-pins.json').read_text())
    if {n: digest(v) for n, v in staged.items()} != pins['parent_source_sha256']:
        raise ValueError('exact harvest parent inventory required')
    patch = (HERE / 'harvest.patch').read_bytes()
    if digest(patch) != pins['patch_sha256']:
        raise ValueError('harvest patch changed')
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
        raise ValueError('harvest output map changed')
    return changed

def nextfronts_apply(staged):
    pins = json.loads((HERE / 'nextfronts-pins.json').read_text())
    if {n: digest(v) for n, v in staged.items()} != pins['parent_source_sha256']:
        raise ValueError('exact nextfronts parent inventory required')
    patch = (HERE / 'nextfronts.patch').read_bytes()
    if digest(patch) != pins['patch_sha256']:
        raise ValueError('nextfronts patch changed')
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
        raise ValueError('nextfronts output map changed')
    return changed

def chain_apply(staged):
    pins = json.loads((HERE / 'chain-pins.json').read_text())
    if {n: digest(v) for n, v in staged.items()} != pins['parent_source_sha256']:
        raise ValueError('exact chain parent inventory required')
    patch = (HERE / 'chain.patch').read_bytes()
    if digest(patch) != pins['patch_sha256']:
        raise ValueError('chain patch changed')
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
        raise ValueError('chain output map changed')
    return changed

def feeconfig_apply(staged):
    pins = json.loads((HERE / 'feeconfig-pins.json').read_text())
    if {n: digest(v) for n, v in staged.items()} != pins['parent_source_sha256']:
        raise ValueError('exact feeconfig parent inventory required')
    patch = (HERE / 'feeconfig.patch').read_bytes()
    if digest(patch) != pins['patch_sha256']:
        raise ValueError('feeconfig patch changed')
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
        raise ValueError('feeconfig output map changed')
    return changed

def next369_apply(staged):
    pins = json.loads((HERE / 'next369-pins.json').read_text())
    if {n: digest(v) for n, v in staged.items()} != pins['parent_source_sha256']:
        raise ValueError('exact next369 parent inventory required')
    patch = (HERE / 'next369.patch').read_bytes()
    if digest(patch) != pins['patch_sha256']:
        raise ValueError('next369 patch changed')
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
        raise ValueError('next369 output map changed')
    return changed

def v2errors_apply(staged):
    pins = json.loads((HERE / 'v2errors-pins.json').read_text())
    if {n: digest(v) for n, v in staged.items()} != pins['parent_source_sha256']:
        raise ValueError('exact v2errors parent inventory required')
    patch = (HERE / 'v2errors.patch').read_bytes()
    if digest(patch) != pins['patch_sha256']:
        raise ValueError('v2errors patch changed')
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
        raise ValueError('v2errors output map changed')
    return changed

def truncation_apply(staged):
    pins = json.loads((HERE / 'truncation-pins.json').read_text())
    if {n: digest(v) for n, v in staged.items()} != pins['parent_source_sha256']:
        raise ValueError('exact truncation parent inventory required')
    patch = (HERE / 'truncation.patch').read_bytes()
    if digest(patch) != pins['patch_sha256']:
        raise ValueError('truncation patch changed')
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
        raise ValueError('truncation output map changed')
    return changed

def materialize(parent, output, stage='curvehop745'):
    if stage not in ('curvehop745', 'reserve746', 'arithmetic749', 'sourcefronts780', 'clamp786', 'visibility788', 'v2rent789', 'fourfronts795', 'harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
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
    if stage in ('reserve746', 'arithmetic749', 'sourcefronts780', 'clamp786', 'visibility788', 'v2rent789', 'fourfronts795', 'harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        reserve = json.loads((HERE / 'reserve-pins.json').read_text())
        name = str(safe_relative(reserve['changed_path']))
        staged[name] = reserve_swap(staged[name])
    if stage in ('arithmetic749', 'sourcefronts780', 'clamp786', 'visibility788', 'v2rent789', 'fourfronts795', 'harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        staged = arithmetic_apply(staged)
    if stage in ('sourcefronts780', 'clamp786', 'visibility788', 'v2rent789', 'fourfronts795', 'harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        staged = sourcefronts_apply(staged)
    if stage in ('clamp786', 'visibility788', 'v2rent789', 'fourfronts795', 'harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        staged = clamp_apply(staged)
    if stage in ('visibility788', 'v2rent789', 'fourfronts795', 'harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        staged = visibility_apply(staged)
    if stage in ('v2rent789', 'fourfronts795', 'harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        staged = v2rent_apply(staged)
    if stage in ('fourfronts795', 'harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        staged = fourfronts_apply(staged)
    if stage in ('harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        staged = harvest_apply(staged)
    if stage in ('nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        staged = nextfronts_apply(staged)
    if stage in ('chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        staged = chain_apply(staged)
    if stage in ('feeconfig806', 'next369810', 'v2errors814', 'truncation815'):
        staged = feeconfig_apply(staged)
    if stage in ('next369810', 'v2errors814', 'truncation815'):
        staged = next369_apply(staged)
    if stage in ('v2errors814', 'truncation815'):
        staged = v2errors_apply(staged)
    if stage == 'truncation815':
        staged = truncation_apply(staged)
    if len(staged) != (61 if stage in ('next369810', 'v2errors814', 'truncation815') else 60 if stage in ('sourcefronts780', 'clamp786', 'visibility788', 'v2rent789', 'fourfronts795', 'harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815') else 58 if stage == 'arithmetic749' else 57):
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
    parser.add_argument('--stage', choices=['curvehop745', 'reserve746', 'arithmetic749', 'sourcefronts780', 'clamp786', 'visibility788', 'v2rent789', 'fourfronts795', 'harvest799', 'nextfronts804', 'chain805', 'feeconfig806', 'next369810', 'v2errors814', 'truncation815'], default='curvehop745')
    args = parser.parse_args()
    result = materialize(args.parent, args.output, args.stage)
    print(json.dumps({'stage': args.stage, 'source_files': len(result), 'source_sha256': result}, indent=2, sort_keys=True))
if __name__ == '__main__':
    main()
