#!/usr/bin/env python3
"""Syntax, suite inventory and retained-report checks; no runtime replay."""
from pathlib import Path
import ast
import copy
import gzip
import hashlib
import importlib.util
import json
import re
import shlex
import subprocess
import sys
import yaml

sys.dont_write_bytecode = True
W = Path(__file__).resolve().parent
R = next(p for p in W.parents if (p / 'repro/status.json').is_file())
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
read = lambda p: json.loads(p.read_text())
spec = importlib.util.spec_from_file_location('review_aggregate', R / 'scripts/pump_validate_all.py')
aggregate = importlib.util.module_from_spec(spec)
spec.loader.exec_module(aggregate)
assert len(aggregate.SUITES) == len(aggregate.EXPECTED_CASES) == len(dict(aggregate.SUITES)) == 38
assert set(dict(aggregate.SUITES)) == set(aggregate.EXPECTED_CASES)
assert sum(aggregate.EXPECTED_CASES.values()) == 9237
for name in ['scripts/pump_validate_all.py', 'scripts/verify_current_bindings.py']:
    compile((R / name).read_text(), name, 'exec')
workflow = yaml.safe_load((R / '.github/workflows/verify.yml').read_text())
matrix = workflow['jobs']['verify']['strategy']['matrix']['include']
groups, rows, extra, syntax = [], [], [], []
for group in matrix:
    commands = group['commands']
    check = subprocess.run(['bash', '-n'], input=commands, text=True, capture_output=True)
    assert check.returncode == 0, (group['suite'], check.stderr)
    blocks = re.findall(r"python - <<'PY'\n(.*?)\nPY(?:\n|$)", commands, re.S)
    for index, block in enumerate(blocks):
        tree = ast.parse(block)
        compile(tree, group['suite'] + ':' + str(index), 'exec')
        if group['suite'].startswith('pump-'):
            assignments = {n.targets[0].id: n.value for n in tree.body if isinstance(n, ast.Assign) and isinstance(n.targets[0], ast.Name)}
            if 'ROWS' in assignments:
                part = ast.literal_eval(assignments['ROWS'])
                rows.extend(part)
                groups.append({'group': group['suite'], 'cases': sum(r['case_count'] for r in part), 'suites': [r['id'] for r in part]})
                assert "command[command.index('--candidate')+1]=str(CANDIDATE)" in block
    syntax.append({'job': group['suite'], 'shell_syntax_passed': True, 'python_blocks': len(blocks)})
    for line in commands.splitlines():
        if line.startswith('python repro/pump/tokenkeg-two-curve-fortyeight/harness/'):
            extra.append({'group': group['suite'], 'command': shlex.split(line), 'id': 'tokenkeg_two_curve', 'case_count': 20})
assert len(rows) == len({r['id'] for r in rows}) == 37
assert len(extra) == 1 and extra[0]['group'] == 'pump-2'
all_rows = rows + extra
assert len(all_rows) == 38 and sum(r['case_count'] for r in all_rows) == 9237
for row in all_rows:
    script = aggregate.SUITES[[n for n, _ in aggregate.SUITES].index(row['id'])][1]
    expected_path = script if script.startswith('repro/') else 'scripts/' + script
    assert row['command'][1] == expected_path
    assert row['case_count'] == aggregate.EXPECTED_CASES[row['id']]
    assert row['command'][row['command'].index('--candidate') + 1] == 'repro/pump/tokenkeg-two-curve-fortyeight/candidate.so'
    assert (R / expected_path).is_file()
outputs = [r['command'][r['command'].index('--output') + 1] for r in all_rows]
assert len(outputs) == len(set(outputs)) == 38
status = read(R / 'repro/status.json')
packages = {'pump': R / 'repro/pump/tokenkeg-two-curve-fortyeight', 'pump_fees': R / 'repro/pump_fees/initializer-inline-v144'}
status_results = {}
for key, package in packages.items():
    proposal = read(package / ('status-pump-proposal.json' if key == 'pump' else 'status-proposal.json'))
    if key == 'pump':
        assert status[key] == proposal, key
    else:
        assert status[key]['candidate_artifact'] == proposal['candidate_path']
        assert status[key]['candidate_sha256'] == proposal['candidate_sha256']
        assert len(status[key]['implemented_handlers']) == proposal['implemented_handlers'] == 31
        assert status[key]['validated_cases'] == proposal['validated_comparison_receipts'] == 17441
        assert status[key]['initializer_inline_static_improvement'] == proposal['static_improvement']
    candidate = R / status[key]['candidate_artifact']
    comparison = read(R / status[key]['comparison_report'])
    assert sha(candidate) == comparison['comparison']['candidate_sha256']
    assert not status[key]['full_byte_equality']
    status_results[key] = {'artifact': str(candidate.relative_to(R)), 'candidate_sha256': sha(candidate), 'status_candidate_count_static_fields_agree_with_sealed_proposal': True}

pump = packages['pump']
result = json.loads(gzip.decompress((pump / 'canonical-harness-replay.json.gz').read_bytes()))
candidate_sha = sha(pump / 'candidate.so')
original_sha = sha(R / 'evidence/original/pump/deployed.so')
assert aggregate.validate_two_curve(result, candidate_sha, original_sha) == 20
negative = []
changes = {
    'missing_row': lambda d: d['cases'].pop(),
    'reported_mismatch': lambda d: d['cases'][0].__setitem__('mismatches', ['after']),
    'missing_candidate_result': lambda d: d['cases'][0].__setitem__('candidate', None),
    'wrong_candidate_hash': lambda d: d.__setitem__('candidate_sha256', '0' * 64),
    'wrong_original_hash': lambda d: d['provenance']['repository_inputs'].__setitem__('evidence/original/pump/deployed.so', '0' * 64),
    'changed_input_flag': lambda d: d.__setitem__('inputs_unchanged', False),
    'wrong_signature_count': lambda d: d.__setitem__('verified_outer_signatures', 39),
}
for name, mutate in changes.items():
    value = copy.deepcopy(result)
    mutate(value)
    try:
        aggregate.validate_two_curve(value, candidate_sha, original_sha)
    except (AssertionError, KeyError, TypeError) as error:
        negative.append({'case': name, 'rejected': True, 'exception': type(error).__name__})
    else:
        raise AssertionError('Malformed retained report accepted: ' + name)
out = {'status': 'PASS', 'syntax': syntax, 'pump_groups': groups, 'new_separate_suite': extra,
       'suite_count': 38, 'case_count': 9237, 'unique_output_paths': 38,
       'status_bindings': status_results, 'new_report_positive': True, 'new_report_negative_tests': negative,
       'runtime_suites_replayed': 0, 'compiler_executions': 0}
(W / 'integration-checks.json').write_text(json.dumps(out, indent=2) + '\n')
print(json.dumps({'status': 'PASS', 'suites': 38, 'cases': 9237, 'negative_report_tests': len(negative)}, indent=2))
