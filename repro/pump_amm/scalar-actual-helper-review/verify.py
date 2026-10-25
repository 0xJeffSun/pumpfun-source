#!/usr/bin/env python3
"""Offline standard-library verifier; never compiles or runs the captured programs."""
from pathlib import Path
import hashlib,json,sys,tomllib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def main():
 manifest=json.loads((P/'manifest.json').read_text())
 assert sha((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().strip()
 expected=set(manifest)|{'manifest.json','manifest.sha256'}
 actual={p.relative_to(P).as_posix()for p in P.rglob('*') if p.is_file()}
 assert expected==actual,(expected-actual,actual-expected)
 assert not any(p.is_symlink()for p in P.rglob('*'))
 for name,h in manifest.items():assert sha((P/name).read_bytes())==h,name
 provenance=json.loads((P/'input-provenance.json').read_text())
 for row in provenance:assert sha((P/row['file']).read_bytes())==row['sha256']
 src=json.loads((P/'inputs/source22.json').read_text());assert len(src)==22
 for path,h in src.items():assert sha((P/'inputs/source'/path).read_bytes())==h
 lock=tomllib.loads((P/'inputs/source/programs/pump-amm/Cargo.lock').read_text())
 for r in json.loads((P/'dependency-members.json').read_text()):
  pkg=next(x for x in lock['package'] if x['name']==r['package'] and x['version']==r['version'])
  assert pkg['checksum']==r['archive_sha256'];assert sha((P/r['file']).read_bytes())==r['member_sha256']
 # Full upstream archive equality was checked during packaging, not reasserted without the archives.
 from analyze import analyze
 result=analyze();assert result==json.loads((P/'analysis.json').read_text())
 macro=(P/'inputs/anchor/anchor-lang-0.31.1/src/lib.rs').read_text()
 assert 'if $value1 < $value2 {' in macro and 'return Err(error!($error_code).with_values(($value1, $value2)));' in macro
 setters=(P/'inputs/source/programs/pump-amm/src/state/global_config.rs').read_text()
 assert setters.count('require_gte!(1000u64, fee, PumpAmmError::FeeBasisPointsExceedsMaximum);')==3
 print(json.dumps({'verified':True,'source_inputs':22,'complete_scalar_bodies':3,'actual_helper_bytes':1336,'original_helper_callers':24,'candidate_actual_helper_callers':3,'candidate_other_helper_callers':6,'helper_immediate_calls':8,'patch_produced':False,'whole_original_equal':False,'runtime_executed':False},sort_keys=True))
if __name__=='__main__':main()
