"""Read-only inventory with the unchanged published normalization and decoder."""
from collections import Counter
from functools import lru_cache
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import sys

W = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('fees_windows', W/'reference/research/fees-composed-frontier188/window_map.py')
w = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w)
w.m.elf_layout = lru_cache(maxsize=6)(w.m.elf_layout)

def measure(path):
    image = path.read_bytes()
    if path.suffix == '.gz': image = gzip.decompress(image)
    original = (W/'reference/evidence/original/pump_fees/deployed.so').read_bytes()
    ow, cw = w.windows(original), w.windows(image)
    oc, cc = [Counter(r['signature'] for r in rows) for rows in (ow, cw)]
    raw = [Counter(r['raw_sha256'] for r in rows) for rows in (ow, cw)]
    frontier = gzip.decompress((W/'reference/research/fees-sweep-integration/builds/candidate/symbols.so.gz').read_bytes())
    fw = w.windows(frontier)
    missing = oc-cc
    result = dict(original_sha256=hashlib.sha256(original).hexdigest(),
        candidate_sha256=hashlib.sha256(image).hexdigest(),
        original_windows=len(ow), candidate_windows=len(cw),
        injective_normalized=sum((oc & cc).values()), raw=sum((raw[0] & raw[1]).values()),
        lost_qualified_normalized=dict((oc & Counter(r['signature'] for r in fw))-cc),
        whole_capture_equal=image==original, bodies={})
    for name, address, needle in [('Crank',147944,'19pump_fees_candidate22crank_donation_fee_pda'),
        ('CreateDonation',163920,'23create_donation_fee_pda6create')]:
        a=next(r for r in ow if r['address']==address)
        candidates=[r for r in cw if needle in (r.get('name') or '')]
        assert len(candidates)==1,(name,candidates)
        b=candidates[0]
        result['bodies'][name]=dict(original=a,candidate=b,normalized_equal=a['signature']==b['signature'])
    result['unmatched_original']=[dict(address=r['address'],bytes=r['bytes'],signature=r['signature'])
        for r in ow if missing[r['signature']]]
    return result

if __name__=='__main__':
    result=measure(Path(sys.argv[1]))
    Path(sys.argv[2]).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({**{k:v for k,v in result.items() if k not in ['bodies','unmatched_original']},
        'bodies':{n:{'bytes':b['candidate']['bytes'],'instructions':b['candidate']['instructions'],
            'normalized_equal':b['normalized_equal']}for n,b in result['bodies'].items()}}))
