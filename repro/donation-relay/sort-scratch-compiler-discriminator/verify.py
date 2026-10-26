"""Portable static source/binary comparison only; no compilation or target execution."""
from pathlib import Path
import hashlib,json
from analyze import analyze,R
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p!=P/'manifest.json'and'__pycache__'not in p.parts}
for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
for n,h in J(P/'external-inputs.json').items():assert H(R/n)==h,n
result=analyze();assert result==J(P/'result.json')
assert result['element_byte_sizes_consistent_with_both_capacities']==[24] and result['original_min_direct_r10']==-2064 and result['candidate_min_direct_r10']==-4112
print(json.dumps({'verified':True,'whole_body_raw_equal':False,'different_instruction_words':9,'scratch_operand_changes':6,'original_scratch_bytes':2048,'v147_scratch_bytes':4096,'authentic_patch_in_v148':True,'unique_historical_compiler_proven':False,'executables_rewritten':0,'compiler_or_runtime_executions':0},indent=2))
