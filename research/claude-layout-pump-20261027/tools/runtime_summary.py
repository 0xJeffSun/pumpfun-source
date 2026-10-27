"""Assemble the 44-suite corpus summary from retained per-suite results (validator's own checks)."""
import gzip, hashlib, importlib.util, json, sys
from pathlib import Path
W = Path(sys.argv[1]); D = Path(sys.argv[2]); out = Path(sys.argv[3])
sys.path.insert(0, str(W / 'scripts'))
spec = importlib.util.spec_from_file_location('v', W / 'work/parallel-main-integration/validate_optimized_loader.py')
v = importlib.util.module_from_spec(spec); spec.loader.exec_module(v)
from pump_diagnostic_audit import audit
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
cand = D / 'candidate.so'; orig = W / 'evidence/original/pump/deployed.so'
S = D / 'full.json.gz.suites'; suites, rows = {}, []
for name, _ in v.base.SUITES:
    p = S / (name + '.json.gz')
    if not p.exists() and (D / (name + '.result.json')).exists():
        p = D / (name + '.result.json')
    raw = p.read_bytes(); r = json.loads(gzip.decompress(raw) if raw[:2] == b'\x1f\x8b' else raw)
    n = v.validate_result(name, r, cand, orig)
    loads = json.loads((S / (name + '.loader.json')).read_text())['loads']
    assert {x['elf_sha256'] for x in loads} == {sha(cand), sha(orig)}
    assert all(x['program_bytes'] == 36 and x['programdata_bytes'] == 10485760 and x['elf_prefix_unchanged'] and x['zero_allocation_tail'] for x in loads)
    suites[name] = r; rows.append({'suite': name, 'cases': n, 'result_sha256': sha(p), 'loader_loads': len(loads)})
a = audit(suites)
summary = {'scope': 'Unchanged 44-suite main-Pump corpus (captured upgradeable loader), original vs ordered candidate; each suite checked with validate_optimized_loader.validate_result; diagnostics via scripts/pump_diagnostic_audit.audit.',
           'candidate_sha256': sha(cand), 'original_sha256': sha(orig), 'suite_count': len(rows), 'case_count': sum(r['cases'] for r in rows),
           'diagnostic_log_cases': a['log_bearing_cases'], 'diagnostic_mismatches': len(a['mismatches']), 'suites': rows,
           'validator_sha256': {k: sha(W / k) for k in ['work/parallel-main-integration/validate_optimized_loader.py', 'work/parallel-main-integration/validate_combined.py', 'work/parallel-main-loader-optimized/pump_with_captured_loader.py', 'work/parallel-main-loader-optimized/pump_captured_loader.py', 'scripts/pump_diagnostic_audit.py']},
           'note': sys.argv[4] if len(sys.argv) > 4 else ''}
assert summary['suite_count'] == 44 and summary['case_count'] == 10468 and summary['diagnostic_mismatches'] == 0
out.write_text(json.dumps(summary, indent=1) + '\n'); print({k: summary[k] for k in ['suite_count', 'case_count', 'diagnostic_log_cases', 'diagnostic_mismatches', 'candidate_sha256']})
