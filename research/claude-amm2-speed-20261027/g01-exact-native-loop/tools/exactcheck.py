#!/usr/bin/env python3
"""Continuous exactness audit: every lane Linux build (SP/lanes/*/out/*/build-record.json + stage.json) whose staged workspace also
has an exact-native result in the shared cache (SP/shared/buildcache/xnative-v144/<key>) must have identical candidate AND unstripped
sha256. Prints one line per pair and exits 1 on any mismatch (a mismatch would mean exact native builds are not Linux builds).
usage: exactcheck.py [--json out.json]"""
import glob, json, os, sys
SP = '/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad'
sys.path.insert(0, SP + '/shared/tools'); import buildcache as bc
TC = SP + '/shared/toolchain/v144x'
rows = []
for f in sorted(glob.glob(SP + '/lanes/*/out/*/build-record.json') + glob.glob(SP + '/lanes/*/out/*/*/build-record.json')):
    d = os.path.dirname(f)
    try: r = json.load(open(f))
    except Exception: continue
    if not r.get('candidate_sha256') or not os.path.exists(d + '/stage.json'): continue
    try: k = bc.key(d + '/stage.json', 'xnative-v144', TC)
    except Exception: continue
    e = SP + '/shared/buildcache/xnative-v144/' + k + '/meta.json'
    if not os.path.exists(e): continue
    m = json.load(open(e))
    rows.append({'linux_build': d.split('/lanes/', 1)[1], 'exact_entry_lane': m['lane'], 'candidate_sha256': r['candidate_sha256'],
                 'candidate_equal': m['sha256']['candidate.so'] == r['candidate_sha256'],
                 'unstripped_equal': m['sha256']['unstripped.so'] == r.get('unstripped_sha256')})
for x in rows:
    print(('OK  ' if x['candidate_equal'] and x['unstripped_equal'] else 'MISMATCH ') + f"{x['linux_build']:<45} {x['candidate_sha256'][:16]} exact by {x['exact_entry_lane']}")
bad = [x for x in rows if not (x['candidate_equal'] and x['unstripped_equal'])]
print(f'{len(rows)} Linux builds with an exact-native twin; {len(bad)} mismatches')
if len(sys.argv) > 2 and sys.argv[1] == '--json': json.dump(rows, open(sys.argv[2], 'w'), indent=1)
sys.exit(1 if bad else 0)
