#!/usr/bin/env python3
"""Fail-closed helpers for the L33 creator-parity evidence packet."""
from collections import Counter
from pathlib import Path
import base64
import difflib
import gzip
import hashlib
import json
import re

from solders.transaction import VersionedTransaction

PUMP = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
ORIGINAL = '7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
L33 = 'b20fdec45ba0309840ab50e984c58393116d066f3b31bf2608aa12778d83ac9a'
STAGE_B = 'bbe4e46043a0967455d52ef5efbffc7dc39bdd7efb9940d880763c30d12e0bb3'
FINAL = '4b838f6015b5235298a6450bcb15a2034454d69b0423f47329847135e30af330'
NON_SYSTEM = 'Program log: Creator is not a system-owned wallet; fees left in the vaults'
FROZEN = 'Program log: Creator quote token account is frozen; fees left in the vaults'
CANONICAL = 'Program log: No canonical pump pool for this mint; curve only'
COORD = re.compile(r'(programs/pump/[^ :\s]+):\d+(?::\d+)?')
PATH_COORD = re.compile(r'programs/pump/[^ :\s]+:<source>')
COMPUTE = re.compile(r'^Program \S+ consumed \d+ of \d+ compute units$')


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_json(path):
    path = Path(path)
    raw = path.read_bytes()
    if raw[:2] == b'\x1f\x8b':
        raw = gzip.decompress(raw)
    return json.loads(raw)


def verify_manifest(root, manifest_path):
    root, manifest_path = Path(root), Path(manifest_path)
    require(manifest_path.is_file() and not manifest_path.is_symlink(), 'manifest missing or symlinked')
    require(all(not path.is_symlink() for path in root.rglob('*')), 'packet symlink rejected')
    expected = json.loads(manifest_path.read_text())
    actual = {
        str(path.relative_to(root)): sha256(path)
        for path in sorted(root.rglob('*'))
        if path.is_file() and path != manifest_path and '__pycache__' not in path.parts
    }
    require(set(actual) == set(expected),
            f'unexpected or omitted packet files: {sorted(set(actual) ^ set(expected))}')
    for name, digest in expected.items():
        require(actual[name] == digest, f'manifest digest mismatch: {name}')


def verify_signed_transaction(encoded):
    raw = base64.b64decode(encoded, validate=True)
    checks = VersionedTransaction.from_bytes(raw).verify_with_results()
    require(bool(checks) and all(checks), 'transaction signature verification failed')
    return hashlib.sha256(raw).hexdigest()


def norm_logs(lines):
    require(isinstance(lines, list) and all(isinstance(line, str) for line in lines),
            'invalid ordered logs')
    return [COORD.sub(r'\1:<source>', line) for line in lines if not COMPUTE.fullmatch(line)]


def scope_main(lines):
    stack, parts, active, active_depth = [], [], None, None
    for line in lines:
        invoke = re.fullmatch(r'Program (\S+) invoke \[(\d+)\]', line)
        finish = re.fullmatch(r'Program (\S+) (?:success|failed:.*)', line)
        if invoke:
            pid, depth = invoke.group(1), int(invoke.group(2))
            require(depth == len(stack) + 1, f'invalid invocation stack: {line}')
            stack.append(pid)
            if pid == PUMP and active is None:
                active, active_depth = [], len(stack)
        if active is not None:
            active.append(line)
        if finish:
            pid = finish.group(1)
            require(bool(stack) and stack[-1] == pid, f'invalid completion stack: {line}')
            if active is not None and len(stack) == active_depth:
                require(pid == PUMP, f'wrong active program: {pid}')
                parts.append(active)
                active, active_depth = None, None
            stack.pop()
    require(active is None and not stack, 'unterminated invocation trace')
    if not parts:
        return None
    return [line for part in parts for line in part]


def structured(outcome):
    return {key: outcome.get(key) for key in (
        'case', 'error', 'before', 'after', 'events', 'inner', 'return',
        'pool_authority_top_level_signer',
    )}


def normalize_runtime(value, key=''):
    if key in ('logs', 'relevant_logs'):
        return norm_logs(value)
    if isinstance(value, dict):
        return {name: normalize_runtime(child, name) for name, child in value.items()
                if name not in ('compute_units', 'compute_units_consumed')}
    if isinstance(value, list):
        return [normalize_runtime(child) for child in value]
    return value


def without_logs(value):
    if isinstance(value, dict):
        return {name: without_logs(child) for name, child in value.items()
                if name not in ('logs', 'relevant_logs')}
    if isinstance(value, list):
        return [without_logs(child) for child in value]
    return value


def classify_logs(left, right):
    changes = []
    for tag, a, b, c, d in difflib.SequenceMatcher(None, left, right, autojunk=False).get_opcodes():
        if tag != 'equal':
            changes.append({'operation': tag, 'original_index': a, 'candidate_index': c,
                            'original': left[a:b], 'candidate': right[c:d]})
    removed = [line for change in changes for line in change['original']]
    added = [line for change in changes for line in change['candidate']]
    if Counter(left) == Counter(right):
        family = 'ordinary_message_order'
    elif [PATH_COORD.sub('<source-file>', line) for line in left] == [
            PATH_COORD.sub('<source-file>', line) for line in right]:
        family = 'source_file_path_only'
    elif not added and len(removed) == 1:
        families = {
            NON_SYSTEM: 'missing_creator_non_system_notice',
            FROZEN: 'missing_creator_quote_frozen_notice',
            CANONICAL: 'missing_canonical_pool_notice',
        }
        family = families.get(removed[0], 'other_missing_log')
    elif any(line.startswith('Program data:') for line in removed + added):
        family = 'event_payload_difference'
    else:
        family = 'other_log_difference'
    return family, changes


def verify_loader_receipt(path, expected_count, expected_candidate):
    doc = load_json(path)
    loads = doc.get('loads')
    require(isinstance(loads, list) and len(loads) == expected_count,
            f'{Path(path).name}: loader count mismatch')
    candidate_loads = 0
    original_loads = 0
    for index, load in enumerate(loads):
        require(load.get('elf_prefix_unchanged') is True and load.get('zero_allocation_tail') is True,
                f'{Path(path).name}:{index}: invalid loader preservation')
        digest = load.get('elf_sha256')
        if digest == ORIGINAL:
            original_loads += 1
        elif digest == expected_candidate:
            candidate_loads += 1
    require(original_loads > 0 and candidate_loads > 0,
            f'{Path(path).name}: missing original/candidate loads')
    return {'loads': len(loads), 'original': original_loads, 'candidate': candidate_loads}
