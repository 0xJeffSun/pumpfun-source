"""Recompute saved backend-diagnostic facts; no compiler or runtime execution."""
from pathlib import Path
import hashlib,importlib.util,json,subprocess,sys
P=Path(__file__).resolve().parent;R=P.parents[1]
J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p!=P/'manifest.json'and'__pycache__'not in p.parts}
for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
for n,h in J(P/'external-inputs.json').items():assert H(R/n)==h,n
s=importlib.util.spec_from_file_location('backend_diagnostic_gate',R/'scripts/check_sbf_backend_diagnostics.py');gate=importlib.util.module_from_spec(s);s.loader.exec_module(gate)
saved=J(P/'diagnostic-scan.json');old=Path.cwd()
try:
 import os;os.chdir(R);actual=gate.check([r['input']for r in saved['logs']])
finally:os.chdir(old)
assert actual==saved and actual['backend_error_count']==3 and not actual['diagnostic_gate_passed']and not actual['program_readiness_proven']
assert [len(r['backend_errors'])for r in actual['logs']]==[1,2,0,0,0]
p=subprocess.run([sys.executable,'-B',str(R/'scripts/test_sbf_backend_diagnostics.py')],capture_output=True,text=True)
assert p.returncode==0 and 'Ran 5 tests'in p.stderr,p.stdout+p.stderr
print(json.dumps({'verified':True,'saved_logs':5,'backend_stack_diagnostics':3,'synthetic_regressions':5,'historical_process_exits_changed':False,'accepted_artifact_promotions':0,'runtime_executions':0},indent=2))
