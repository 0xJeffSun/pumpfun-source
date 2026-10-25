#!/usr/bin/env python3
"""Verify published static evidence and representative bytes; never execute SBF."""
from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parent
REPO=next(p for p in ROOT.parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
def sha(b):return hashlib.sha256(b).hexdigest()
manifest=json.loads((ROOT/'artifact-hashes.json').read_text())
for rel,expected in manifest.items():assert sha((ROOT/rel).read_bytes())==expected,rel
x=json.loads((ROOT/'selected-helper-evidence.json').read_text())
assert x['source_and_lock_hashes_identical_across_builds']
ref=(REPO/'evidence/original/pump_fees/deployed.so').read_bytes()
assert sha(ref)==x['original']['sha256']
expected_counts={'v143-build-02':(97,32,4),'v144-build-01':(97,94,22),'v145-build-01':(112,65,14),'v146-build-01':(112,64,14)}
notes=json.loads((ROOT/'run-notes.json').read_text())
for name,(total,bounded,raw) in expected_counts.items():
 build=x['builds'][name];counts=build['diagnostic_counts'];candidate=(ROOT/name/'pump_fees_candidate.so').read_bytes()
 assert sha(candidate)==build['binary']['sha256'],name
 assert (counts['candidate_functions'],counts['entry_bounded_call_consistent_matches'],counts['entry_bounded_raw_exact_matches'])==(total,bounded,raw),name
 assert build['additional_environment']==notes['additional_build_environment'],name
 assert build['returncode']==0 and build['source_unchanged'],name
for label,offset,size,digest in [('core_fmt_write',775776,1056,'7a5339492369c3813ea033c29cf8313288cf8efa07b2da552321cebc9c9f13c1'),('integer_entry',799040,352,'face056642083fcc15c6737f1910030a4b59b6a78a4fa523f142dc0f28635762')]:
 f=x['builds']['v144-build-01']['selected_helpers'][label];b=(ROOT/'v144-build-01/pump_fees_candidate.so').read_bytes();body=b[f['candidate_start']:f['candidate_start']+size]
 assert body==ref[offset:offset+size] and sha(body)==digest,label
 assert any(m['original_start']==offset and m['inferred_function_entry'] and m['next_entry_equals_window_end'] and m['raw_byte_equality'] for m in f['matches']),label
for name in ['v145-build-01','v146-build-01']:
 fs=x['builds'][name]['selected_helpers']
 assert not fs['core_fmt_write']['matches'] and not fs['integer_entry']['matches'] and not fs['unicode_is_printable']['matches']
 assert [d['function_relative_offset'] for d in fs['integer_inner']['instruction_differences_to_captured_352_byte_multiply']]==[328,336]
 assert fs['panic_fmt']['matches'] and fs['panic_bounds_check']['matches']
assert x['builds']['v145-build-01']['selected_helpers']['fmt_u64']['matches']
assert not x['builds']['v146-build-01']['selected_helpers']['fmt_u64']['matches']
print('PASS: all publication hashes, four candidate identities, recorded environment, corrected counts, exact fmt/write and multiply bodies, and representative negative/control paths')
