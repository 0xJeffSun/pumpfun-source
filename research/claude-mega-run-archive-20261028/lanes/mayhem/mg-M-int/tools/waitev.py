# usage: waitev.py MAX_SECONDS PR...  -> blocks until a new Mayhem WIN/BASE/NOTE line (not mg-M-int) appears in EVENTS.log,
# a watched PR changes state (merged/closed) or gets a failing check, or the time runs out. Prints what happened.
import json, subprocess, sys, time
from pathlib import Path
EV = Path('/Users/shawwalters/Documents/Codex/2026-10-24/mega-run/EVENTS.log')
ST = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-int/logs/waitev.state')
limit, prs = float(sys.argv[1]), sys.argv[2:]
state = json.loads(ST.read_text()) if ST.exists() else {'offset': EV.stat().st_size, 'pr': {}}
def pr_state(n):
    try:
        v = json.loads(subprocess.run(['gh', 'pr', 'view', n, '--repo', 'lalalune/pumpfun-source', '--json', 'state,mergeable'], capture_output=True, text=True, timeout=60).stdout)
        ch = subprocess.run(['gh', 'pr', 'checks', n, '--repo', 'lalalune/pumpfun-source'], capture_output=True, text=True, timeout=60).stdout.splitlines()
        b = [l.split('\t')[1] for l in ch if '\t' in l]
        return f"{v['state']} {v['mergeable']} fail={sum(x == 'fail' for x in b)} pending={sum(x == 'pending' for x in b)} pass={sum(x == 'pass' for x in b)}"
    except Exception as e:
        return 'ERR'
start = time.time(); last_pr = 0; out = []
while time.time() - start < limit and not out:
    size = EV.stat().st_size
    if size > state['offset']:
        with EV.open('rb') as f:
            f.seek(state['offset']); new = f.read().decode('utf-8', 'replace')
        state['offset'] = size
        out += [l for l in new.splitlines() if ('mayhem' in l.lower() or 'mg-M-' in l) and 'mg-M-int' not in l and ' BASE mayhem parent-' not in l and ' PR mayhem #' not in l and any(k in l for k in (' WIN ', ' BASE ', ' NOTE ', ' STOP', ' PR '))]
    if time.time() - last_pr > 150:
        last_pr = time.time()
        for n in prs:
            s = pr_state(n); old = state['pr'].get(n)
            key = lambda x: (x or '').split(' pending=')[0]
            if s != 'ERR' and (key(s) != key(old) or (s.endswith('pending=0') != (old or '').endswith('pending=0'))):
                out.append(f'PR#{n} {s}')
            if s != 'ERR': state['pr'][n] = s
    if not out: time.sleep(5)
ST.write_text(json.dumps(state))
print(time.strftime('%H:%M'), '\n'.join(out) if out else 'timeout (no new events)')
