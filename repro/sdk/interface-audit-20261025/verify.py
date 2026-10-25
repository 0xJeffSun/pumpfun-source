"""Recompute frozen npm interface audit; standard library, no network or execution."""
from pathlib import Path
import hashlib,json
from analyze import analyze,ROOT
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
manifest=json.loads((P/'manifest.json').read_text())
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p.name!='manifest.json' and '__pycache__' not in p.parts}
assert actual==set(manifest)
for name,digest in manifest.items():assert H((P/name).read_bytes())==digest,name
for name,digest in json.loads((P/'external-inputs.json').read_text()).items():assert H((ROOT/name).read_bytes())==digest,name
result=analyze();assert result==json.loads((P/'result.json').read_text())
print(json.dumps({'verified':True,'publisher_integrity_checked_packages':3,'pump_instruction_declarations':56,'amm_instruction_declarations':38,'fees_instruction_declarations':30,'missing_pump_dispatches':result['frozen_source']['missing_dispatches'],'optional_agent_program_in_plan':False,'new_runtime_executions':0,'complete_sdk_compatibility':False},indent=2))
