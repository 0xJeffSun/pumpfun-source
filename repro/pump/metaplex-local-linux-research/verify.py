#!/usr/bin/env python3
import hashlib,json,sys
from pathlib import Path
P=Path(__file__).resolve().parent
ROOT=P.parents[2]
sys.path.insert(0,str(ROOT/'repro/pump_fees/framework-matching'))
from elf_reader import Elf
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 for n,h in json.loads((P/'manifest.json').read_text()).items(): assert H((P/n).read_bytes())==h,n
 original=(ROOT/'evidence/dependencies/token_metadata/deployed.so').read_bytes()
 assert H(original)=='31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011'
 target=Elf(ROOT/'evidence/dependencies/token_metadata/deployed.so')
 baseline=json.loads((P/'baseline/source-manifest.json').read_text())
 assert len(baseline)==812
 assert baseline==json.loads((ROOT/'repro/pump/metaplex-candidate-build-11/source-manifest.json').read_text())
 raw=(P/'baseline/candidate.so').read_bytes()
 assert H(raw)=='3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec'
 assert original[len(raw):]==bytes(len(original)-len(raw))
 assert sum(a!=b for a,b in zip(raw+bytes(len(original)-len(raw)),original))==1509
 known=json.loads((P/'baseline/resume-result.json').read_text())
 assert known['returncode']==0 and known['all_812_source_hashes_unchanged'] and known['equals_linux_candidate11']
 assert H((P/'baseline/resumed-build.log').read_bytes())==known['build_log_sha256']
 assert H((P/'baseline/source-manifest.json').read_bytes())==known['source_manifest_sha256']
 rows=json.loads((P/'results.json').read_text());assert len(rows)==16
 for row in rows:
  d=P/'cases'/row['name'];r=json.loads((d/'result.json').read_text())
  assert r['returncode']==0 and r['all_planned_source_hashes_unchanged'] and not r['accepted']
  sm=json.loads((d/'source-manifest.json').read_text());assert sm.keys()==baseline.keys()
  changed=[n for n in baseline if sm[n]!=baseline[n]]
  if 'changed_source_files' in r: assert sorted(changed)==sorted(r['changed_source_files'])
  allowed={'programs/token-metadata/program/src/processor/uses/utilize.rs':'applied-source.rs','programs/token-metadata/program/src/lib.rs':'applied-lib.rs'}
  assert set(changed)<=set(allowed)
  for n in changed: assert H((d/allowed[n]).read_bytes())==sm[n]
  assert H((d/'build.log').read_bytes())==r['build_log_sha256']
  assert H((d/'source-manifest.json').read_bytes())==r['source_manifest_sha256']
  raw=(d/'candidate.so').read_bytes();payload=raw+bytes(max(0,len(original)-len(raw)))
  assert len(raw)==r['candidate_bytes']==row['bytes']
  assert H(raw)==r['candidate_sha256']==row['sha256']
  assert payload==(d/'allocation-image.so').read_bytes()
  assert H(payload)==r['allocation_image_sha256']
  assert sum(a!=b for a,b in zip(payload,original))+abs(len(payload)-len(original))==r['differing_payload_positions']==row['diff']
  candidate=Elf(d/'candidate.so');lo,hi=r['utilize_range']
  assert lo==236632 and hi==next(at for at in candidate.entries if at>lo)
  assert (candidate.normalized[lo:hi]==target.normalized[236632:241736])==r['utilize_normalized_equals_target']==False
  assert (candidate.b[candidate.lo:candidate.hi]==target.b[target.lo:target.hi])==r['whole_text_equality']==False
  assert payload!=original and not r['full_byte_equality']
  if r['expected_control_sha256']: assert r['known_control_reproduced'] and H(raw)==r['expected_control_sha256']
 print(json.dumps(dict(verified=True,source_files=812,successful_baseline_builds=1,cached_trials=len(rows),accepted=False)))
if __name__=='__main__':main()
