#!/usr/bin/env python3
"""Final-run (fz) lane groups: windows still unmatched on the newest bases + every prior note on them -> fz/groups.json."""
import json, os, re, sys, glob
sys.path.insert(0, os.path.dirname(__file__))
import make_tasks as mt
MR, WP, WA, WM = mt.MR, mt.WP, mt.WA, mt.WM

PUMP = {  # group -> windows (all 45 unmatched on L31)
 'P-buyv2a': ['0x14910','0x173d8'], 'P-buyv2b': ['0x13b9b8'], 'P-buyv2c': ['0x13f630'],
 'P-crv2a': ['0x18678','0x1ac28'], 'P-crv2b': ['0x1e7c0'], 'P-crv2c': ['0x138b20'],
 'P-cto': ['0x22a10'], 'P-cfee1': ['0x298b0','0x2bf18'], 'P-cfee2': ['0x2fa60','0x34558'],
 'P-mig1': ['0x3e550','0x3fb70'], 'P-mig2': ['0x49888','0x4c158','0x52660'],
 'P-hop': ['0x567d8','0x57e40','0x5b3b0'], 'P-sweep': ['0x6cd78','0x72810','0x6fef8','0x75308'],
 'P-inc': ['0x77940','0x7bfd8','0x7c720'], 'P-v3a': ['0x80df8','0x83088','0x837a8'],
 'P-v3b': ['0x83c00','0x857a8','0x859b0'], 'P-misc': ['0x9b148','0x9b430','0xcd3d8','0x17c850'],
 'P-sellv2': ['0x144508'], 'P-v3c': ['0x147ba0','0x1489f8','0x14a8a8'],
 'P-legacy': ['0x14c038','0x14f4e0','0x152888'], 'P-raw': [],
}
AMM = {
 'A-srf': ['0x19138','0xc5d0','0x2288','0x14088'], 'A-small': ['0xfb08','0x50f00'],
 'A-buy': ['0x3a5a0','0x351a8','0x14920'], 'A-pool': ['0x2ba60','0x2e720'],
 'A-mh1': ['0x3dbc0'], 'A-mh2': ['0x40a08'], 'A-mh3': ['0x45940'],
 'A-trade': ['0x4c750','0x54a20','0x53350'], 'A-vol': ['0x6d408','0x6db20','0xf28b8'], 'A-raw': [],
}
MAY = {'M-dyn': []}

def lanes_mentioning(w):
    out = []
    for f in sorted(glob.glob(f'{MR}/lanes/*/PROGRESS.md')) + sorted(glob.glob(f'{WP}/lanes/*/PROGRESS.md')) + sorted(glob.glob(f'{WA}/lanes/*/PROGRESS.md')):
        try:
            if w in open(f, errors='replace').read(): out.append(f)
        except OSError: pass
    return out

def notes(ws, table):
    seen, txt = set(), []
    for lane, s in table.items():
        if any(w in s['windows'] for w in ws) and s['prior'] not in seen:
            seen.add(s['prior']); txt.append(f'[{lane}] {s["prior"]}')
    for line in open(f'{MR}/LANES-B.md'):
        if any(w in line for w in ws): txt.append('[fleet B] ' + line.strip())
    for line in open(f'{MR}/EVENTS.log'):
        if ' NOTE ' in line and any(w in line for w in ws): txt.append('[EVENTS] ' + line.strip())
    return txt

pt = {r['start']: r for r in json.load(open(f'{WP}/base/L31/triage.json'))}
groups = []
for c, table, src in (('pump', PUMP, mt.pump_lanes), ('amm', AMM, mt.amm_lanes), ('mayhem', MAY, {})):
    for g, ws in table.items():
        files = sorted({f for w in ws for f in lanes_mentioning(w)})
        rows = []
        for w in ws:
            r = pt.get(w, {}); size = r.get('bytes') or mt.amm_sizes.get(w, '?')
            sites = ' '.join(sorted({x['path'].split('/')[-1] + ':' + str(x['line']) for x in r.get('original_sites', [])})[:4])
            rows.append(f'{w} {size} B {r.get("category","")} {sites}'.strip())
        groups.append(dict(contract=c, group=g, windows=ws, rows=rows, notes=notes(ws, src), progress_files=files))
json.dump(groups, open(f'{MR}/fz/groups.json', 'w'), indent=1)
assert sorted(w for g in groups if g['contract'] == 'pump' for w in g['windows']) == sorted(pt), 'pump groups != L31 unmatched'
print(len(groups), 'groups', sum(len(g['windows']) for g in groups), 'windows',
      max(len(' '.join(g['notes'])) for g in groups), 'max note chars')
