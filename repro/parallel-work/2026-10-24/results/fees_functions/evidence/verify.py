#!/usr/bin/env python3
"""Portable stdlib-only static verifier. No network, compilation or ELF execution."""
from pathlib import Path
import hashlib,json,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
for name,record in json.loads((W/'inputs.json').read_text()).items():
 b=(W/'inputs'/name).read_bytes();assert sha(b)==record['sha256'] and len(b)==record['bytes'],name
for name,digest in json.loads((W/'manifest-sha256.json').read_text()).items():assert sha((W/name).read_bytes())==digest,name
from analyze import main
j,l=main();assert j==json.loads((W/'catalog.json').read_text());assert l==json.loads((W/'leads.json').read_text())
from focus import run
assert run()==json.loads((W/'focused-proof.json').read_text())
from elf_reader import Elf
C=Elf(W/'inputs/candidate.so');O=Elf(W/'inputs/original.so')
g=json.loads((W/'inputs/static-gate.json').read_text())
for r in [g['social_exit']]+g['social_direct_calls']+g['pubkey_helpers']+g['formatter_direct_targets']:
 a,b,n=r['candidate_start'],r['original_start'],r['bytes']
 assert sha(C.b[a:a+n])==r['candidate_raw_sha256'];assert sha(O.b[b:b+n])==r['original_raw_sha256']
 assert C.normalized[a:a+n]==O.normalized[b:b+n] and C.pattern(a,n)==O.pattern(b,n)
for r in g['social_literals']:
 a,b,n=r['candidate_address'],r['original_address'],r['bytes'];assert C.b[a:a+n]==O.b[b:b+n];assert sha(C.b[a:a+n])==r['sha256']
res=json.loads((W/'residuals.json').read_text())
assert {r['start'] for r in res['candidate']}=={r['start'] for r in j['candidate_rows'] if r['status']!='normalized_call_consistent'}
assert {r['start'] for r in res['original']}=={r['start'] for r in j['original_rows'] if r['status']!='mapped_pattern'}
assert len(j['candidate_rows'])==548 and len(j['original_rows'])==585
print('PASS: sealed inputs, complete catalogs, 55 leads, six focused proofs, accepted social/dependency body gates, exhaustive residual membership; no program execution.')
