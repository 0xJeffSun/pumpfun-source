"""Read-only verification of the pinned audit, artifact measurements and corrections."""
import hashlib
import json
from pathlib import Path
import subprocess
import sys

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
from reconstruction_identity_audit import measure
H=lambda raw:hashlib.sha256(raw).hexdigest()
J=lambda p:json.loads(p.read_text())
manifest=J(HERE/'manifest.json')
actual={str(p.relative_to(HERE)) for p in HERE.rglob('*')
        if p.is_file() and p.name!='manifest.json' and '__pycache__' not in p.parts}
# Nested packages each own a manifest; include them in the outer seal.
actual|={str(p.relative_to(HERE)) for p in HERE.rglob('manifest.json') if p!=HERE/'manifest.json'}
assert actual==set(manifest),(actual-set(manifest),set(manifest)-actual)
for name,expected in manifest.items():
    path=HERE/name;assert not path.is_symlink() and H(path.read_bytes())==expected,name
for package in ['compiler-sdk','ata','compiler-v1461','mayhem-hashbrown']:
    subprocess.run([sys.executable,'-B',str(HERE/package/'verify.py')],check=True)
source=J(HERE/'source/audit.json')
assert source['ref']=='3c5b492be7ed793e062bc14f57c7abf3b3823c61'
assert len(source['handler_rows'])==150 and len(source['explicit_source_boundaries'])==123
for snapshot in ['structural-audit.json','repaired-status-audit.json']:
    audit=J(HERE/snapshot)
    for name,row in audit['snapshot_programs'].items():
        recomputed=measure((ROOT/row['original_path']).read_bytes(),(ROOT/row['candidate_path']).read_bytes())
        assert recomputed=={k:v for k,v in row.items() if k not in ['original_path','candidate_path']},name
health=J(HERE/'repaired-status-audit.json')['current_status_health']
assert all(v['candidate_exists'] and v['candidate_matches_build_report']
           and not v['missing_compiler_inputs'] and not v['different_compiler_inputs'] for v in health.values())
plan=J(HERE/'localnet-plan.json')
assert len(plan['programs'])==9 and len(plan['seeds'])==3
assert 'donation_relay' in {r['name'] for r in plan['programs']}
assert '--reset' not in plan['command']
print(json.dumps({'verified':True,'pinned_instruction_dispositions':150,
                  'explicit_boundary_rows':123,'structural_snapshots':2,
                  'repaired_candidate_bindings':4,'dry_run_programs':9,
                  'new_contract_builds':0,'new_contract_runtime_tests':0,
                  'core_byte_identity_achieved':False},indent=2))
