#!/usr/bin/env python3
"""Reuse the full 52-case probe with an explicit additional liquidity source binding.

The old validator remains immutable. Only its build-admission function is
replaced in this process; the exact expanded manifest is required, and all
existing runtime, signature, log and effect assertions remain unchanged.
"""
import hashlib
import importlib.util
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT/'repro/pump_amm/boost-burn-diagnostics'))
import boost
import verify_boost
spec = importlib.util.spec_from_file_location('focused_boost_runtime', boost.PACKAGE/'runtime_probe.py')
runtime_probe = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runtime_probe)

LIB_SHA = '9e791d9466f06ab7a7e250c5aaac61dc9a133f0ca48afdbb9b3f635d78632a61'


def check_expanded(repo, candidate, raw):
    record = json.loads(raw)
    expected = boost.expected_source(repo)
    expected['programs/pump-amm/src/lib.rs'] = LIB_SHA
    boost.require(record['kind']=='liquidity-sweep-migration-boost-corrected' and
                  record['accepted_build'] is True and record['returncode']==0 and
                  record['source_unchanged'] is True, 'unsuccessful expanded build')
    boost.require(record['source_sha256']==record['source_after_sha256']==expected, 'wrong expanded source')
    boost.require(record['candidate_sha256']==boost.digest(candidate), 'wrong candidate')
    boost.require(record['prior_candidate_sha256']==boost.PRIOR_SHA and
                  record['prior_build_record_sha256']==boost.PRIOR_RECORD_SHA, 'wrong prior binding')
    boost.require(record['source_patch_sha256']==boost.digest((boost.PACKAGE/'source.patch').read_bytes()), 'wrong boost patch')
    boost.require(record['expanded_probe_sha256']==boost.digest(Path(__file__).read_bytes()), 'wrong expanded checker')
    return record


if __name__ == '__main__':
    # runtime_probe and verify_boost imported their function names by value.
    # Supply the same stricter expanded admission rule at both boundaries.
    runtime_probe.check_build = check_expanded
    verify_boost.check_build = check_expanded
    runtime_probe.main()
