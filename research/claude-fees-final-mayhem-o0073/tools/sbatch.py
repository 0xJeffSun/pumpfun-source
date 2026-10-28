#!/usr/bin/env python3
"""Source-variant batch for lane fees-final O0073.

Each variant replaces the whole validate_sweep body (fee_recipients.rs lines 45-66) with a
candidate, keeping the closing brace on line 66 so every line below is byte-identical
(mayhem-b owns 264+). Builds root-only under the shared lock, measures vs parent-432,
prints a one-line O0073 report.

  sbatch.py SLOT spec.json     spec: [{"label":..., "body":"<lines 46..65 incl, no final }>"}...]
The body must be exactly 20 physical lines (46..65); the tool asserts it.
"""
import json, os, subprocess, sys
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work'
MB = W + '/mayhem-b'
FF = W + '/fees-final'
PY = '/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/test-env/bin/python'
REL = 'programs/mayhem/src/instructions/fee_recipients.rs'

if os.environ.get('LANE_BATCH_LOCKED') != '1':
    env = dict(os.environ, LANE_BATCH_LOCKED='1')
    sys.exit(subprocess.call([PY, '-B', W + '/sbf_lock.py', '--slots', '6', '--name', 'sbf', '--', PY, '-B', __file__] + sys.argv[1:], env=env))

slot, spec = sys.argv[1], json.load(open(sys.argv[2]))
root = f'{FF}/roots/{slot}'
os.makedirs(root + '/programs', exist_ok=True)
import shutil
for v in spec:
    label = v['label']
    subprocess.run(['rsync', '-a', '--delete', '--exclude', '.git', f'{FF}/roots/p432/programs/mayhem/', f'{root}/programs/mayhem/'], check=True)
    p = f'{root}/{REL}'
    lines = open(p).read().split('\n')
    # lines[0] is file line 1; function header at line 45 (index 44), body lines 46..65 = indices 45..64, close at line 66 index 65
    assert lines[44].strip().startswith('impl FeeRecipient'), lines[44]
    assert lines[45].strip().startswith('pub fn validate_sweep'), lines[45]
    assert lines[64].strip() == '}' and lines[65].strip() == '}', (lines[64], lines[65])
    body = v['body'].split('\n')
    if len(body) != 19:
        print(f'{label}: body is {len(body)} lines, need 19', flush=True); continue
    lines[45:64] = body
    open(p, 'w').write('\n'.join(lines))
    env = dict(os.environ, LANE_CLEAN_ANCHOR='0')
    r = subprocess.run([PY, '-B', f'{MB}/build/build_lane.py', label, root, 'ff-o73'], env=env, capture_output=True, text=True)
    if r.returncode != 0:
        err = open(f'{MB}/out/builds/{label}/stderr').read() if os.path.exists(f'{MB}/out/builds/{label}/stderr') else r.stderr
        el = [l for l in err.splitlines() if l.startswith('error') or l.startswith('  -->')][:6]
        print(f'{label}: BUILD FAILED ' + ' | '.join(el) + (r.stderr[-300:] if not el else ''), flush=True); continue
    subprocess.run([PY, '-B', f'{MB}/build/measure.py', f'{MB}/out/builds/{label}/symbols.so', MB + '/out/q432/symbols.so', '--json', f'{MB}/out/builds/{label}/measure.json'], capture_output=True)
    d = json.load(open(f'{MB}/out/builds/{label}/measure.json'))
    losses = {k: d[k] for k in ['body_losses', 'raw_losses', 'edge_losses', 'source_losses', 'profile_losses'] if d[k]}
    wr = subprocess.run([PY, '-B', f'{FF}/tools/o73.py', 'report', label], capture_output=True, text=True)
    o73line = wr.stdout.strip() or wr.stderr.strip()[-200:]
    gained = 'O0073' in d['gains']
    print(f'== {label}: O0073_gained={gained} gains={len(d["gains"])} raw_gains={len(d["raw_gains"])} '
          f'losses={json.dumps(losses)[:200]} no_losses={d["no_losses"]}', flush=True)
    print('   ' + o73line, flush=True)
