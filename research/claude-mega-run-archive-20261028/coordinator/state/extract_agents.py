import json, glob, os, sys
P = os.path.expanduser('~/.claude/projects/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source')
out = []
for meta in sorted(glob.glob(f'{P}/*/subagents/workflows/*/agent-*.meta.json')):
    sess = meta.split('/')[-5][:8]; wf = meta.split('/')[-2]
    jl = meta.replace('.meta.json', '.jsonl')
    try: m = json.load(open(meta))
    except Exception: m = {}
    desc = m.get('description') or m.get('label') or ''
    last_ts = None; last_txt = ''; n = 0
    if os.path.exists(jl):
        for line in open(jl):
            n += 1
            try: o = json.loads(line)
            except Exception: continue
            if o.get('timestamp'): last_ts = o['timestamp']
            if o.get('type') == 'assistant':
                c = o.get('message', {}).get('content')
                if isinstance(c, list):
                    t = '\n'.join(x.get('text', '') for x in c if isinstance(x, dict) and x.get('type') == 'text').strip()
                    if t: last_txt = t
    out.append({'session': sess, 'workflow': wf, 'agent': os.path.basename(jl)[:-6], 'description': desc,
                'lines': n, 'last_ts': last_ts, 'last_text': last_txt})
json.dump(out, open(sys.argv[1], 'w'), indent=1)
for r in out:
    print(f"{r['session']} {r['workflow']} {(r['last_ts'] or '')[11:16]} | {r['description'][:60]} | {r['last_text'][:230].replace(chr(10),' ')}")
