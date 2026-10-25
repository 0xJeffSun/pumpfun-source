#!/usr/bin/env python3
"""Portable stdlib-only verifier. Runs static Python analyses, never target code."""
from pathlib import Path
import hashlib,json,subprocess,sys,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def verify_files():
 raw=(P/'manifest.json').read_bytes()
 assert sha(raw)==(P/'manifest.sha256').read_text().split()[0], 'manifest seal mismatch'
 manifest=json.loads(raw)
 for path,v in manifest['files'].items():
  f=P/path;assert f.is_file(),f'missing: {path}'
  b=f.read_bytes();assert len(b)==v['bytes']and sha(b)==v['sha256'],f'changed: {path}'
 for v in json.loads((P/'input-provenance.json').read_text()):
  b=(P/v['path']).read_bytes();assert sha(b)==v['sha256']
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==v['git_blob'],v['path']
 bindings=json.loads((P/'inputs/repro/pump_amm/update-event-borrow-v144/current-main-bindings.json').read_text())['compiled_source']
 for path,h in bindings.items():assert sha((P/'inputs'/path).read_bytes())==h,path
 assert len(bindings)==22
 return len(manifest['files'])
def main():
 count=verify_files()
 if '--files-only'in sys.argv:
  print(json.dumps(dict(status='PASS',sealed_files=count)));return
 for script in ['replay_static.py']:
  subprocess.run([sys.executable,'-B',str(P/script)],cwd=P,check=True,stdout=subprocess.PIPE)
 with tempfile.TemporaryDirectory(prefix='.static-verification-',dir=P)as tmp:
  tmp=Path(tmp)
  for script in ['analyze.py','enrich.py']:
   subprocess.run([sys.executable,'-B',str(P/script),'--out',str(tmp)],cwd=P,check=True,stdout=subprocess.PIPE)
  expected={p.name for p in (P/'analysis').iterdir()if p.is_file()}
  assert expected=={p.name for p in tmp.iterdir()if p.is_file()}
  for name in sorted(expected):assert (tmp/name).read_bytes()==(P/'analysis'/name).read_bytes(),f'nonrepeatable: {name}'
 summary=json.loads((P/'analysis/summary.json').read_text())
 assert summary['whole']['equal']is False and summary['original_windows']==785 and summary['candidate_symbol_windows']==653
 assert not summary['original_coverage']['uncovered_intervals']and not summary['candidate_symbol_coverage']['uncovered_intervals']
 print(json.dumps(dict(status='PASS',sealed_files=count,source_inputs=22,repeatable_analysis_files=len(expected),target_code_executed=False,network_used=False,whole_original_equal=False),indent=2))
if __name__=='__main__':main()
