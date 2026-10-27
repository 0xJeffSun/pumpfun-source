"""Run the existing Metaplex runtime differential suites (original vs this packet's candidate).

Harnesses are the unmodified scripts already in the repository (hash-checked below);
`utilize_validation.py` is an unmodified copy of
repro/pump/metaplex-owned-uses-20261026/utilize_validation.py placed beside candidate.so,
because that script reads `candidate.so` from its own directory.
Use: REPO/work/test-env/bin/python -B research/claude-deps-metaplex-20261027/run_validation.py
"""
from pathlib import Path
import concurrent.futures, hashlib, json, os, subprocess, sys

p = Path(__file__).resolve().parent
root = p.parents[1]
h = lambda b: hashlib.sha256(b).hexdigest()
refs = json.loads((root / 'repro/pump/metaplex-owned-uses-20261026/harness-references.json').read_text())
for name, digest in refs.items():
    assert h((root / name).read_bytes()) == digest, name
assert h((p / 'utilize_validation.py').read_bytes()) == h((root / 'repro/pump/metaplex-owned-uses-20261026/utilize_validation.py').read_bytes())
jobs = {
    'edition': ['repro/pump/metaplex-candidate-build-6/validation.py'],
    'uses': ['repro/pump/metaplex-uses-source-recovery/validation.py'],
    'burn': ['repro/pump/metaplex-context-source-recovery/burn_probe.py'],
    'context': ['repro/pump/metaplex-context-source-recovery/validation.py'],
    'validation': ['repro/pump/metaplex-validation-source-recovery/validation.py'],
}
env = dict(os.environ, PYTHONDONTWRITEBYTECODE='1')
py = sys.executable


def run(item):
    name, (script,) = item
    cmd = [py, '-B', str(root / script), '--candidate', str(p / 'candidate.so'), '--output', str(p / (name + '-validation.json.gz'))]
    with (p / 'logs' / (name + '-validation.log')).open('w') as log:
        r = subprocess.run(cmd, env=env, stdout=log, stderr=subprocess.STDOUT, cwd=root)
    result = {'name': name, 'returncode': r.returncode, 'script': script, 'script_sha256': h((root / script).read_bytes())}
    print(json.dumps(result), flush=True)
    return result


(p / 'logs').mkdir(exist_ok=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:
    results = list(ex.map(run, jobs.items()))
cmd = [py, '-B', str(p / 'utilize_validation.py')]
with (p / 'logs' / 'utilize-validation.log').open('w') as log:
    r = subprocess.run(cmd, env=env, stdout=log, stderr=subprocess.STDOUT, cwd=root)
results.append({'name': 'utilize', 'returncode': r.returncode, 'script': 'research/claude-deps-metaplex-20261027/utilize_validation.py',
                'script_sha256': h((p / 'utilize_validation.py').read_bytes())})
print(json.dumps(results[-1]), flush=True)
(p / 'validation-results.json').write_text(json.dumps(results, indent=2) + '\n')
assert all(x['returncode'] == 0 for x in results)
