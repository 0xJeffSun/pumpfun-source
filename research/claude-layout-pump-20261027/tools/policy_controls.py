#!/usr/bin/env python3
"""Layout-policy controls: what each alternative placement rule does on one round.

Every control regenerates a script from the same inputs as the adopted layout,
changing one rule (derive_layout.plan policy), relinks the recorded default
build with it (relink.py) and measures the result with measure.py. The output
records each script's sha256 (verify.py regenerates and checks these), the
relinked ELF hashes, raw/normalized counts, gained/lost windows against the
published round, and the correspondence disclosure figures.
"""
import sys
sys.dont_write_bytecode = True  # keep the packet free of __pycache__
import argparse
import hashlib
import json
import tempfile
from pathlib import Path

import derive_layout
import disclose
import layout_script
import measure
import relink

HERE = Path(__file__).resolve().parent
CONTROLS = {
    'adopted': {},
    'extras_in_place': {'extras': 'in_place'},
    'position_only_duplicate_choice': {'owner_preference': False},
    'without_skeleton_counterparts': {'skeleton_rule': False},
    'without_counterparts': {'counterparts': False},
}


def script_for(policy, windows, base_elf, base_map):
    ordered, _ = derive_layout.plan(measure.ROOT / 'evidence/original/pump/deployed.so', windows, base_elf, base_map, policy)
    default = (HERE / 'default.ld').read_text()
    return ordered, layout_script.render(default, [layout_script.selector(x['owner'], x['section']) for x in ordered])


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--frontier', required=True)
    ap.add_argument('--baseline-build', type=Path, required=True)
    ap.add_argument('--output', type=Path, required=True)
    ap.add_argument('--objcopy', default=str(Path.home() / '.cache/solana/v1.44/platform-tools/llvm/bin/llvm-objcopy'))
    a = ap.parse_args()
    frontier = measure.ROOT / a.frontier
    ref = measure.read(frontier / 'inventory.json.gz')
    windows = [{'start': w['start'], 'bytes': w['bytes']} for w in ref['windows']]
    base = measure.inventory(frontier / 'unstripped.so', windows)
    raw0 = {w['start'] for w in base['windows'] if w['raw_match']}
    norm0 = {w['start'] for w in base['windows'] if w['normalized_matches']}
    rows = {}
    with tempfile.TemporaryDirectory(prefix='layout-pump-controls-') as tmp:
        for name, policy in CONTROLS.items():
            ordered, script = script_for(policy, windows, frontier / 'unstripped.so', a.baseline_build / 'link/link.map')
            sp = Path(tmp) / f'{name}.ld'
            sp.write_text(script)
            r = relink.relink(a.baseline_build, sp, Path(tmp) / name, a.objcopy)
            inv = measure.inventory(Path(tmp) / name / 'unstripped.so', windows)
            raw = {w['start'] for w in inv['windows'] if w['raw_match']}
            norm = {w['start'] for w in inv['windows'] if w['normalized_matches']}
            rows[name] = {'policy': {**derive_layout.DEFAULT_POLICY, **policy},
                          'script_sha256': hashlib.sha256(script.encode()).hexdigest(),
                          'unstripped_sha256': r['unstripped_sha256'], 'candidate_sha256': r['candidate_sha256'],
                          'raw': len(raw), 'normalized': len(norm),
                          'raw_gained': sorted(raw - raw0), 'raw_lost': sorted(raw0 - raw), 'normalized_lost': sorted(norm0 - norm),
                          'disclosure': disclose.disclose(ordered, base)}
            print(name, len(raw0), '->', len(raw), 'lost', [hex(x) for x in sorted(raw0 - raw)], flush=True)
    result = {'scope': __doc__.split('\n')[0], 'frontier_packet': a.frontier, 'baseline_raw': len(raw0),
              'baseline_normalized': len(norm0), 'controls': rows,
              'note': 'Recorded relink observations; verify.py regenerates every control script and checks its sha256.'}
    a.output.write_text(json.dumps(result, indent=1) + '\n')


if __name__ == '__main__':
    main()
