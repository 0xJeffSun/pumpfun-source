"""Bounded static decoder inspection. Reads saved bytes; no program execution."""
from pathlib import Path
import bisect
import hashlib
import json
import struct
import sys

W = Path(__file__).resolve().parent
I = W / 'inputs/work/fees-update-admin-closure/inputs'
sys.path.insert(0, str(I))
from elf_reader import Elf

sha = lambda b: hashlib.sha256(b).hexdigest()

def instruction(e, pc):
    op, regs, off, imm = struct.unpack_from('<BBhi', e.b, pc)
    n = 16 if op == 0x18 else 8
    row = dict(pc=pc, raw_hex=e.b[pc:pc+n].hex(), opcode=op,
               dst=regs & 15, src=regs >> 4, offset=off, immediate=imm)
    if pc in e.calls:
        row['signed_call_target'] = pc + 8 + imm * 8
        assert row['signed_call_target'] == e.calls[pc]
    elif op & 7 == 5 and op not in (0x85, 0x8d, 0x95):
        row['signed_branch_target'] = pc + 8 + off * 8
    return row

def body(e, start, end):
    pc, ins = start, []
    while pc < end:
        row = instruction(e, pc)
        ins.append(row)
        pc += len(bytes.fromhex(row['raw_hex']))
    assert pc == end
    return dict(start=start, end=end, bytes=end-start,
                raw_sha256=sha(e.b[start:end]),
                normalized_sha256=sha(e.normalized[start:end]),
                relocation_pattern=e.pattern(start, end-start),
                instructions=ins)

def make_report():
    es = {s: Elf(I / (s+'.so')) for s in ['candidate', 'original', 'symbol-source']}
    C, O, S = [es[s] for s in ['candidate', 'original', 'symbol-source']]
    assert C.b[C.lo:C.hi] == S.b[S.lo:S.hi]
    specs = [('original-decoder', O, 257264, 259912),
             ('candidate-decoder', C, 78104, 79656),
             ('original-checked-wrapper', O, 36072, 37320),
             ('candidate-checked-wrapper', C, 30000, 31144),
             ('original-unchecked-wrapper', O, 18384, 19528),
             ('candidate-unchecked-wrapper', C, 13584, 14608)]
    bodies = {}
    for name, e, start, end in specs:
        k = e.entries.index(start)
        assert e.entries[k+1] == end
        b = body(e, start, end)
        b['candidate_symbols'] = [f for f in S.funcs if e is C and f['start'] == start]
        bodies[name] = b
    callers = {}
    for side, target in [('original', 257264), ('candidate', 78104)]:
        e = es[side]
        rows = []
        for pc, t in sorted(e.calls.items()):
            if t != target:
                continue
            k = bisect.bisect_right(e.entries, pc)-1
            rows.append(dict(**instruction(e, pc), containing_start=e.entries[k],
                             containing_end=e.entries[k+1], offset_from_entry=pc-e.entries[k]))
        callers[side] = rows
    assert [c['pc'] for c in callers['original']] == [19280, 37152]
    assert [c['pc'] for c in callers['candidate']] == [14240, 30976]
    pairs = []
    for c, o, label in [(56024,64680,'Vec<FeeTier> reader'),
                         (599576,709368,'Anchor Error from ProgramError'),
                         (599736,709528,'Anchor Error from I/O Error'),
                         (649840,756288,'Borsh unexpected EOF adapter')]:
        f = next(f for f in S.funcs if f['start'] == c)
        n = f['size']; oi = O.entries.index(o); on = O.entries[oi+1]-o
        pairs.append(dict(label=label, candidate=body(C,c,c+n), original=body(O,o,o+on),
                          symbol=f['name'], raw_equal=C.b[c:c+n] == O.b[o:o+on],
                          normalized_equal=n == on and C.normalized[c:c+n] == O.normalized[o:o+on],
                          relocation_patterns_equal=C.pattern(c,n) == O.pattern(o,on)))
    assert all(p['normalized_equal'] and p['relocation_patterns_equal'] for p in pairs)
    thresholds = []
    for o_slot, c_slot, body_bound, full_bound in [(32160,9765,2504,2512),
                                                (32161,9815,4065,4073),
                                                (32243,9831,4089,4097)]:
        oi,ci = instruction(O,o_slot*8),instruction(C,c_slot*8)
        assert oi['opcode'] == 0xa5 and oi['immediate'] == body_bound
        assert ci['opcode'] == (0xa5 if c_slot == 9765 else 0x25)
        assert ci['immediate'] == (full_bound if c_slot == 9765 else full_bound-1)
        assert body_bound+8 == full_bound
        thresholds.append(dict(original=oi,candidate=ci,original_body_threshold=body_bound,
                               candidate_account_threshold=full_bound))
    return dict(scope='Read-only raw-byte decoder and direct-caller comparison; no runtime or builds.',
                binaries={s:dict(sha256=sha(e.b),bytes=len(e.b)) for s,e in es.items()},
                bodies=bodies, direct_callers=callers, matched_direct_callees=pairs,
                threshold_correspondence=thresholds,
                original_decoder_direct_calls=O.callsites(257264,2648),
                candidate_decoder_direct_calls=C.callsites(78104,1552),
                limits=['Two direct callers inventoried; indirect invocation is not disproven.',
                        'No recursive closure of decoder callees or runtime equivalence proof.',
                        'Candidate symbol bounds and original next-known-entry bounds are distinct evidence.',
                        'No initializer handlers, source variants, builds or runtime probes inspected.'])

if __name__ == '__main__':
    (W/'analysis.json').write_text(json.dumps(make_report(),indent=2)+'\n')
