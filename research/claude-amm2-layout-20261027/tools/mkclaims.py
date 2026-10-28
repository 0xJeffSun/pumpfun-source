#!/usr/bin/env python3
"""Write claims.json for a layout packet by computing every value with verify.py's own functions.

usage: mkclaims.py <packet dir> <frontier name> <frontier packet rel path> <layout name> <linux build dirs (rel)...>
"""
import gzip, hashlib, importlib.util, json, os, sys, tempfile
from pathlib import Path

G = Path(sys.argv[1]).resolve()
FR, FRPACKET, LAY = sys.argv[2], sys.argv[3], sys.argv[4]
BUILDS = sys.argv[5:]
sys.argv = [str(G / 'verify.py')]
spec = importlib.util.spec_from_file_location('verify', G / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
sha = lambda b: hashlib.sha256(b).hexdigest()

root = v.ROOT
base = root / FRPACKET / 'results/build'
base_c, base_s = base / 'candidate.so', base / 'unstripped.so'
if os.environ.get('BASE_C'):
    base_c, base_s = Path(os.environ['BASE_C']), Path(os.environ['BASE_S'])
with tempfile.TemporaryDirectory() as tmp:
    tmp = Path(tmp)
    dmap = tmp / 'default.map'
    dmap.write_bytes(gzip.decompress((G / 'builds/default/link.map.gz').read_bytes()))
    omap = tmp / 'layout.map'
    omap.write_bytes(gzip.decompress((G / 'builds/text-data/link.map.gz').read_bytes()))
    lc = tmp / 'c.so'; lc.write_bytes(gzip.decompress((G / f'artifacts/{LAY}-candidate.so.gz').read_bytes()))
    ls = tmp / 's.so'; ls.write_bytes(gzip.decompress((G / f'artifacts/{LAY}-unstripped.so.gz').read_bytes()))
    brows = v.measure(base_c, base_s)
    rows = v.measure(lc, ls)
    pl0 = v.planmod.Plan(v.ORIGINAL, base_s, dmap)
    pl0.assign()
    deficit = sorted(hex(pl0.W[w][0]) for w in range(len(pl0.W)) if pl0.C[w] and w not in pl0.A)
    proofs = {}
    for kind, before, after in (('stripped', base_c, lc), ('symbols', base_s, ls)):
        res = v.translation.prove(before, after, dmap, omap)
        proofs[kind] = {k: val for k, val in res.items() if k not in ('before_sha256', 'after_sha256')}
    gained = [hex(x['start']) for x, y in zip(brows, rows) if y['raw'] and not x['raw']]
    claims = {
        'scope': 'Source-unchanged PumpSwap linker layout (qualified .text/.rodata/.data.rel.ro input-section order) over the '
                 + FRPACKET.split('/')[-1] + ' frontier. Every count is recomputed by verify.py with the repository AMM window '
                 'measurement; identities other than normalized-unique are ordering hypotheses.',
        'frontiers': {FR: {
            'packet': FRPACKET, 'sdk_script': 'layout/sdk-default.ld', 'default_map': 'builds/default/link.map.gz',
            'default_map_sha256': sha(dmap.read_bytes()), 'kit': f'kits/{FR}', 'default_receipt': f'receipts/{FR}-default.json',
            'multiplicity_deficit': deficit,
            **({'baseline_artifacts': {'candidate': 'artifacts/base-candidate.so.gz', 'symbols': 'artifacts/base-unstripped.so.gz'}} if os.environ.get('BASE_C') else {}),
            'baseline': {'candidate_sha256': sha(base_c.read_bytes()), 'symbols_sha256': sha(base_s.read_bytes()),
                         'counts': v.counts(brows), 'measurement': f'measurement/{FR}-baseline-measure.json.gz',
                         'data_references': v.data_reference_offsets(pl0, base_s, dmap)},
            'layouts': {LAY: {
                'data_order': True, 'script': f'layout/{LAY}.ld', 'plan': f'layout/{LAY}-plan.json.gz',
                'map': 'builds/text-data/link.map.gz', 'candidate': f'artifacts/{LAY}-candidate.so.gz',
                'symbols': f'artifacts/{LAY}-unstripped.so.gz', 'measurement': f'measurement/{LAY}-measure.json.gz',
                'relink_receipt': f'receipts/{LAY}.json', 'runtime': f'runtime/{LAY}/summary.json',
                'runtime_suites': f'runtime/{LAY}/suites.json', 'runtime_cases': f'runtime/{LAY}/cases.json.gz',
                'linux_builds': [b + '/build-attempt.json' for b in BUILDS],
                'candidate_sha256': sha(lc.read_bytes()), 'symbols_sha256': sha(ls.read_bytes()),
                'map_sha256': sha(omap.read_bytes()), 'counts': v.counts(rows), 'gained_raw_windows': gained,
                'data_references': v.data_reference_offsets(pl0, ls, omap), 'translation': proofs}}}}}
(G / 'claims.json').write_text(json.dumps(claims, indent=1) + '\n')
f = claims['frontiers'][FR]
print(json.dumps({'deficit': deficit, 'baseline': f['baseline']['counts'], 'layout': f['layouts'][LAY]['counts'],
                  'gained': len(gained), 'data_refs': [f['baseline']['data_references'], f['layouts'][LAY]['data_references']]}))
