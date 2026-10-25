from pathlib import Path
import argparse, hashlib, json, subprocess

parser = argparse.ArgumentParser()
parser.add_argument('worktree', type=Path)
args = parser.parse_args()
R = args.worktree.resolve()
BASE = 'b3f23323f93061821ff98221dfbf6ed34f6f9918'
UP = 'bde19c4ee0632cfe0d22c9100f55b0475c8aff24'
P = R / 'repro/upstream-reconciliation/main-bde19c4e'
protected = ['programs/pump', '.github/workflows/verify.yml', 'repro/status.json',
             'scripts/verify_current_bindings.py', 'scripts/verify_recovered_builds.py',
             'audit/AUDIT.md', 'docs/RECOVERY.md']
def git(*a):
    return subprocess.check_output(['git', *a], cwd=R)
def digest(b):
    return hashlib.sha256(b).hexdigest()
def save(p, b):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_bytes(b)
def is_protected(n):
    return any(n == x or n.startswith(x + '/') for x in protected)
assert git('rev-parse', 'HEAD').decode().strip() == BASE
assert not git('status', '--porcelain').strip()
assert not P.exists()
paths = [x.split('\t') for x in git('diff', '--name-status', BASE + '...' + UP).decode().splitlines()]
assert len(paths) == 266
assert all(len(x) == 2 and x[0] in ('A', 'M') for x in paths)
assert not any(any(v in n for v in ['private-security-review', 'security-followup', 'audit_coverage']) for _, n in paths)
P.mkdir(parents=True)
# Preserve every incoming variant of active protected files before resolution.
incoming = git('ls-tree', '-r', '--name-only', UP, '--', *protected).decode().splitlines()
accepted = git('ls-tree', '-r', '--name-only', BASE, '--', *protected).decode().splitlines()
for revision, names, folder in [(UP, incoming, 'upstream-files'), (BASE, accepted, 'accepted-files')]:
    for n in names:
        mode = git('ls-tree', revision, '--', n).decode().split()[0]
        assert mode in ('100644', '100755'), (n, mode)
        save(P / folder / n, git('show', revision + ':' + n))
run = subprocess.run(['git', 'merge', '--no-commit', '--no-ff', UP], cwd=R, capture_output=True)
save(P / 'merge.stdout', run.stdout)
save(P / 'merge.stderr', run.stderr)
assert run.returncode in (0, 1)
conflicts = git('diff', '--name-only', '--diff-filter=U').decode().splitlines()
save(P / 'initial-conflicts.json', (json.dumps(conflicts, indent=2) + '\n').encode())
assert all(is_protected(n) for n in conflicts), conflicts
subprocess.run(['git', 'restore', '--source', BASE, '--staged', '--worktree', '--', *protected], cwd=R, check=True)
assert not git('diff', '--name-only', '--diff-filter=U').strip()
assert not git('diff', BASE, '--', *protected).strip(), 'Accepted protected contents changed'
rows = []
for status, n in paths:
    upstream = git('show', UP + ':' + n)
    current = R / n
    disposition = 'incoming research retained, unexecuted'
    if is_protected(n):
        disposition = 'accepted active version retained; incoming variant archived'
        assert (P / 'upstream-files' / n).read_bytes() == upstream
    else:
        assert current.is_file() and not current.is_symlink() and current.read_bytes() == upstream, n
    rows.append({'path': n, 'incoming_status': status, 'upstream_sha256': digest(upstream),
                 'resolved_sha256': digest(current.read_bytes()) if current.is_file() else None,
                 'disposition': disposition})
record = {'base': BASE, 'upstream': UP, 'incoming_paths': len(rows), 'protected_roots': protected,
          'initial_conflicts': conflicts, 'paths': rows, 'target_executions': 0,
          'active_protected_tree_equal_to_base': True,
          'limits': ['Incoming candidates, alternate recipes and runtime claims remain unverified.',
                     'No stopped handler, synthetic caller, path remap or alternate compiler recipe was executed.']}
save(P / 'resolution.json', (json.dumps(record, indent=2, sort_keys=True) + '\n').encode())
save(P / 'method.py', Path(__file__).read_bytes())
print(json.dumps({'status': 'MERGED_PENDING_REVIEW', 'paths': len(rows), 'conflicts': conflicts, 'record': str(P)}))
