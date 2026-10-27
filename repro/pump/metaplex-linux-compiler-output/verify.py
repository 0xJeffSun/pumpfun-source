#!/usr/bin/env python3
from pathlib import Path
import hashlib,gzip,json,re
P=Path(__file__).resolve().parent;ROOT=P.parents[2]
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 for n,h in json.loads((P/'manifest.json').read_text()).items():assert H((P/n).read_bytes())==h,n
 source=json.loads((ROOT/'repro/pump/metaplex-candidate-build-11/source-manifest.json').read_text());assert len(source)==812
 expected=(ROOT/'repro/pump/metaplex-candidate-build-11/token_metadata.so').read_bytes()
 assert H(expected)=='3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec'
 for name in ['ir-capture','machine-capture']:
  d=P/name;r=json.loads((d/'result.json').read_text());assert r['returncode']==0 and r['equals_candidate11']
  assert (d/'candidate.so').read_bytes()==expected and H(expected)==r['candidate_sha256']
  assert json.loads((d/'source-manifest.json').read_text())==source
  assert H((d/'build.log').read_bytes())==r['log_sha256']
  for o in r['outputs']:
   raw=gzip.decompress((d/o['name']).read_bytes());assert len(raw)==o['raw_bytes'] and H(raw)==o['raw_sha256']
  ll=gzip.decompress((d/'module.ll.gz').read_bytes()).decode();body=(d/'utilize.ll').read_text();assert body in ll
  assert 'store i32 86' in body and '%or.cond = select i1' in body
  assert body.index('bb103:')<body.index('bb109:')
  assert 'label %bb103, label %bb109' in body
 log=(P/'machine-capture/build.log').read_text()
 assert 'IR Dump After Branch Probability Basic Block Placement' in log
 for text in ['JEQ_ri $r9, 0, %bb.39','JUGT_rr $r9, $r1, %bb.39','JUGT_rr $r9, $r7, %bb.39','%bb.39(33.33%), %bb.36(66.67%)']:
  assert text in log,text
 assert log.index('bb.36.bb109:')<log.index('bb.39.bb103:')
 print(json.dumps(dict(verified=True,diagnostic_builds=2,source_files=812,actual_elf_equals_candidate11=True,full_original_identity=False)))
if __name__=='__main__':main()
