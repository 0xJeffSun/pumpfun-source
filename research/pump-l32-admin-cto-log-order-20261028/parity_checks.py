#!/usr/bin/env python3
"""Fail-closed helpers shared by the L32 creator evidence checks."""
from pathlib import Path
import base64
import gzip
import hashlib
import json
import re

from solders.transaction import VersionedTransaction

NON_SYSTEM = 'Program log: Creator is not a system-owned wallet; fees left in the vaults'
FROZEN = 'Program log: Creator quote token account is frozen; fees left in the vaults'
CANONICAL = 'Program log: No canonical pump pool for this mint; curve only'
MESSAGES = {
    'non_system_creator': NON_SYSTEM,
    'frozen_quote_account': FROZEN,
    'missing_canonical_pool': CANONICAL,
}
SOURCE_SITE = re.compile(r'(AnchorError (?:thrown|caused by account).*?\.rs):\d+(?::\d+)?')


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load_json(path):
    path = Path(path)
    raw = path.read_bytes()
    if path.suffix == '.gz':
        raw = gzip.decompress(raw)
    return json.loads(raw)


def verify_signed_transaction(encoded):
    raw = base64.b64decode(encoded, validate=True)
    results = VersionedTransaction.from_bytes(raw).verify_with_results()
    require(bool(results) and all(results), 'transaction signature verification failed')
    return hashlib.sha256(raw).hexdigest()


def normalize_logs(logs, *, source_sites=False):
    result = [line for line in logs if ' consumed ' not in line]
    if source_sites:
        result = [SOURCE_SITE.sub(r'\1:<line>', line) for line in result]
    return result


def structured(outcome):
    return {key: outcome.get(key) for key in (
        'case', 'error', 'before', 'after', 'events', 'inner', 'return',
        'pool_authority_top_level_signer',
    )}


def verify_manifest(root, manifest):
    root = Path(root)
    require(all(not path.is_symlink() for path in root.rglob('*')), 'symlink rejected')
    actual = {
        str(path.relative_to(root)): sha256(path)
        for path in sorted(root.rglob('*'))
        if path.is_file() and path.name != 'MANIFEST.json'
    }
    require(set(actual) == set(manifest), f'unexpected files: {sorted(set(actual) ^ set(manifest))}')
    for name, digest in manifest.items():
        require(actual[name] == digest, f'manifest digest mismatch: {name}')


def validate_repeated_build(first, second, expected):
    require(hashlib.sha256(first).hexdigest() == expected, 'first build hash mismatch')
    require(hashlib.sha256(second).hexdigest() == expected, 'second build hash mismatch')
    require(first == second, 'repeated build bytes differ')
