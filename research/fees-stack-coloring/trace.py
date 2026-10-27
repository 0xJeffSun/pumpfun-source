"""Read the four retained MIR dumps; this does not run LLVM or prove equivalence."""
import re
from elf import require, identity

FUNCTION = '_ZN11anchor_lang8accounts7account16Account$LT$T$GT$8try_from17h35c4169a6471ee49E'
STAGES = {
    'before-coloring': 'Before Merge disjoint stack slots (stack-coloring)',
    'after-coloring': 'After Merge disjoint stack slots (stack-coloring)',
    'before-frame': 'Before Prologue/Epilogue Insertion & Frame Finalization (prologepilog)',
    'after-frame': 'After Prologue/Epilogue Insertion & Frame Finalization (prologepilog)',
}


def extract(log):
    stages = {}; ranges = []
    for name, label in STAGES.items():
        marker = ('# *** IR Dump ' + label + ' ***:\n').encode()
        require(log.count(marker) == 1, 'Dump marker missing or duplicated: ' + name)
        start = log.index(marker)
        end_marker = ('# End machine code for function ' + FUNCTION + '.\n').encode()
        end = log.find(end_marker, start)
        require(end >= start, 'Unterminated dump')
        raw = log[start:end + len(end_marker)]
        require(raw.count(b'# Machine code for function ') == 1 and
                ('# Machine code for function ' + FUNCTION + ':').encode() in raw,
                'Wrong or multiple functions in dump')
        stages[name] = raw
        ranges.append(dict(name=name, offset=start, **identity(raw)))
    require(all(a['offset'] + a['bytes'] <= b['offset'] for a, b in zip(ranges, ranges[1:])),
            'Overlapping or reordered stage dumps')
    return stages, ranges


def frames(raw):
    result = {}
    for line in raw.decode().splitlines():
        if not line.startswith('  fi#'):
            continue
        m = re.fullmatch(r'  fi#(\d+): (?:dead|size=(\d+), align=(\d+), at location \[SP(-?\d+)?\])', line)
        require(m is not None and m[1] not in result, 'Unexpected frame object')
        result[m[1]] = dict(dead=m[2] is None, size=int(m[2]) if m[2] else None,
                            offset=int(m[4] or 0) if m[2] else None)
    require(result, 'Missing frame objects')
    return result


def instruction_lines(raw):
    # SlotIndex prefixes and LIFETIME pseudo-instructions disappear in this pass.
    # Retain the complete raw snapshots; this projection is descriptive only.
    rows = []; started = False
    for line in raw.decode().splitlines():
        line = re.sub(r'^\d+B\t', '', line).strip()
        if line.startswith('bb.0 '):
            started = True
        if not started or not line or line.startswith('#') or line.startswith('LIFETIME_'):
            continue
        rows.append(line)
    return rows


def analyze(log):
    stages, ranges = extract(log)
    objects = {k: frames(v) for k, v in stages.items()}
    before = instruction_lines(stages['before-coloring'])
    after = instruction_lines(stages['after-coloring'])
    require(len(before) == len(after), 'Unexpected non-lifetime line count')
    remap = {}; metadata_changes = []; operand_changes = []
    for index, (a, b) in enumerate(zip(before, after)):
        ac, _, am = a.partition(' :: '); bc, _, bm = b.partition(' :: ')
        ai, bi = re.findall(r'%stack\.(\d+)', ac), re.findall(r'%stack\.(\d+)', bc)
        require(len(ai) == len(bi), 'Stack operand count differs')
        for src, dest in zip(ai, bi):
            require(src not in remap or remap[src] == dest, 'Inconsistent frame remapping')
            remap[src] = dest
        projected = re.sub(r'%stack\.(\d+)', lambda m: '%stack.' + remap[m[1]], ac)
        require(projected == bc, 'Non-frame machine operand changed')
        if ac != bc:
            operand_changes.append(dict(index=index, before=ac, after=bc))
        if am != bm:
            metadata_changes.append(dict(index=index, before=am, after=bm))
    changed = {a: b for a, b in remap.items() if a != b}
    require(changed == {'0':'1', '2':'1', '3':'4', '5':'4', '6':'4'}, 'Unexpected coloring map')
    require([k for k, v in objects['after-coloring'].items() if v['dead']] == ['0','2','3','5','6'],
            'Unexpected dead slots')
    require(objects['before-coloring']['0']['size'] == 16 and
            objects['after-frame']['1'] == dict(dead=False, size=24, offset=-24), 'Slice destination differs')
    require(objects['after-frame']['4'] == dict(dead=False, size=136, offset=-160), 'Result object differs')
    descriptor = [r for r in operand_changes if '%stack.0' in r['before']]
    require(len(descriptor) == 3 and sum('STD_V1' in r['before'] for r in descriptor) == 2 and
            sum('MOV_rr' in r['before'] for r in descriptor) == 1, 'Descriptor use count differs')
    return dict(ranges=ranges, frames=objects, frame_remapping=changed,
                live_object_bytes={k: sum(v['size'] for v in rows.values() if not v['dead'])
                                   for k, rows in objects.items()},
                operand_changes=operand_changes, memory_annotation_changes=metadata_changes,
                slice_descriptor_changes=descriptor)
