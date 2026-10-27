"""Verify retained full-suite evidence and current inventory; executes no VM."""
from pathlib import Path
import gzip,hashlib,json
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
CANDIDATE='fcb56a875b8f3a2e4805986f488b27708b77b2b66d8bbd04d71ddd3931d1cf52'
def sha(data):return hashlib.sha256(data).hexdigest()
def verify():
 manifest=json.loads((HERE/'manifest.json').read_text())
 actual={str(p.relative_to(HERE))for p in HERE.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}
 assert actual==set(manifest['files'])
 for n,h in manifest['files'].items():
  p=HERE/n;assert not p.is_symlink()and sha(p.read_bytes())==h,n
 for n,h in manifest['inputs'].items():assert sha((ROOT/n).read_bytes())==h,n
 candidate=gzip.decompress((ROOT/'repro/pump_fees/distribution-helper-recovery/artifacts/candidate-candidate.so.gz').read_bytes());assert sha(candidate)==CANDIDATE
 r=json.loads(gzip.decompress((HERE/'full-validation.json.gz').read_bytes()))
 assert r['candidate_sha256']==CANDIDATE and r['case_count']==17331 and not r['mismatches']and len(r['suites'])==18
 assert r['original_sha256']==sha((ROOT/'evidence/original/pump_fees/deployed.so').read_bytes())
 for n,s in r['suites'].items():
  assert not s.get('mismatches',[]) and not s.get('failures',[]) and not s.get('mismatch_count',0),n
  if 'candidate_sha256'in s:assert s['candidate_sha256']==CANDIDATE,n
 print('PASS: retained 17,331-case / 18-suite result; candidate and harness inputs bound; no new execution')
if __name__=='__main__':verify()
