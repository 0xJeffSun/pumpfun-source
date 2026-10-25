#!/usr/bin/env python3
"""Verify the bounded shared108 interface witness; no target execution."""
import argparse, hashlib, json, pathlib, struct
P=pathlib.Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
ap=argparse.ArgumentParser();ap.add_argument('--repo',type=pathlib.Path);a=ap.parse_args()
m=json.loads((P/'manifest-sha256.json').read_text())
actual={p.relative_to(P).as_posix():sha(p.read_bytes()) for p in P.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
assert actual==m
r=json.loads((P/'review.json').read_text());parts={}
for row in r['ranges']:
 b=bytes.fromhex(row['hex']);assert len(b)==row['end']-row['start'] and sha(b)==row['sha256']
 parts[row['start']]=b
 if a.repo:
  original=(a.repo/'evidence/dependencies/donation_relay/deployed.so').read_bytes()
  assert sha(original)==r['original_sha256'] and original[row['start']:row['end']]==b
def ins(pc):
 for start,b in parts.items():
  if start<=pc<start+len(b):return b[pc-start:pc-start+8]
 raise AssertionError(pc)
def call(pc,target):
 b=ins(pc);assert b[:2]==b'\x85\x10' and pc+8+8*struct.unpack_from('<i',b,4)[0]==target
call(95744,31368);call(95864,31368);call(96112,119440)
assert ins(95704).hex()=='7932000200000000'
assert ins(95840).hex()=='7992780100000000'
assert struct.unpack_from('<i',ins(95720),4)[0]==-224
assert struct.unpack_from('<i',ins(95856),4)[0]==-80
assert struct.unpack_from('<i',ins(96088),4)[0]==-240
print(json.dumps({'verified':True,'raw_ranges':5,'signed_calls':3,'repository_rebound':bool(a.repo),'semantic_scope':'Caller frame offsets only; typed roles require the retained context mapping.'}))
