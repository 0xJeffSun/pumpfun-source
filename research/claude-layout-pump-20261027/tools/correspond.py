"""Original-window / candidate-function correspondence for layout derivation.

Inputs are the original ELF, the fixed original window list, and one unstripped
candidate ELF (whatever the current maintained source produces). Everything is
derived from bytes and symbols; nothing here edits an ELF.

A candidate function may be assigned to at most one original window. Domains
start from normalized-body equality and are narrowed by direct-call
consistency: if original window O calls window T at call slot k and candidate
C calls function U at the same slot, then U must be in T's domain. Remaining
choices are resolved deterministically (nearest original-relative position),
and every assignment carries its basis.
"""
import collections
import hashlib
import struct
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())
sys.path.insert(0, str(ROOT / 'scripts'))
from pump_compare_function_bytes import normalize, body  # noqa: E402
from pump_quote_control_function_match import sections  # noqa: E402
sys.path.insert(0, str(HERE))
from measure import elf_functions  # noqa: E402


class Image:
    """Functions (address -> size, names, raw, normalized, operands) of one ELF."""

    def __init__(self, path, windows=None):
        self.path = Path(path)
        self.b = self.path.read_bytes()
        self.secs = sections(self.b)
        self.text = self.secs['.text']
        self.funcs = {}
        if windows is None:
            for addr, size, name in elf_functions(self.path):
                f = self.funcs.setdefault(addr, {'start': addr, 'bytes': size, 'names': []})
                assert f['bytes'] == size
                f['names'].append(name)
        else:
            for w in windows:
                self.funcs[w['start']] = {'start': w['start'], 'bytes': w['bytes'], 'names': []}
        self.order = sorted(self.funcs)
        for a in self.order:
            f = self.funcs[a]
            f['raw'] = body(self.b, self.secs, a, f['bytes'])
            f['norm'], f['ops'] = normalize(f['raw'], a, self.secs)
            f['calls'] = [op['target'] for op in f['ops'] if op['kind'] == 'direct-call']
            f['data'] = [op for op in f['ops'] if op['kind'] == 'elf-pointer']
            f['key'] = (f['bytes'], hashlib.sha256(f['norm']).hexdigest())
        self.by_key = collections.defaultdict(list)
        for a in self.order:
            self.by_key[self.funcs[a]['key']].append(a)


def call_slots(f):
    return [op['offset'] for op in f['ops'] if op['kind'] == 'direct-call']


def derive(orig, cand, owner_of=None):
    """Return ({original_start: candidate_start}, {original_start: basis}, domains).

    `owner_of` (candidate start -> object/archive member) enables the region-aware
    tie-break: among identical free bodies, prefer the copy compiled into the same
    object as the nearest already-assigned neighbours (inline functions and
    generic instances are often duplicated across objects)."""
    dom = {o: set(cand.by_key.get(orig.funcs[o]['key'], [])) for o in orig.order}
    eo = {o: orig.funcs[o]['calls'] for o in orig.order}
    ec = {c: cand.funcs[c]['calls'] for c in cand.order}

    def consistent(o, c):
        for t, u in zip(eo[o], ec[c]):
            if t in dom and dom[t] and u not in dom[t]:
                return False
        return len(eo[o]) == len(ec[c])

    changed = True
    while changed:
        changed = False
        for o in orig.order:
            if len(dom[o]) > 0:
                keep = {c for c in dom[o] if consistent(o, c)}
                if keep != dom[o]:
                    # never empty a domain through propagation alone: an empty result means the
                    # callee domains conflict (duplicates/merges); keep the unconstrained set.
                    if keep:
                        dom[o] = keep
                        changed = True
    # injective resolution: unique-domain originals first, then forced callee pairs, then nearest
    assign, basis, used = {}, {}, set()

    def take(o, c, why):
        assign[o] = c
        basis[o] = why
        used.add(c)

    for o in orig.order:
        if len(dom[o]) == 1:
            c = next(iter(dom[o]))
            if c not in used:
                take(o, c, 'unique normalized body')
    def propagate(frontier):
        # callers fix the instance of their callees: the candidate caller's actual call target
        while frontier:
            o = frontier.pop()
            c = assign[o]
            for t, u in zip(eo[o], ec[c]):
                if t in dom and t not in assign and u in dom[t] and u not in used:
                    take(t, u, 'callee of matched caller')
                    frontier.append(t)

    propagate(list(assign))
    # remaining multi-domain originals, in original order: same-object copy as the assigned
    # neighbours first, then nearest relative position; propagate after every choice
    scale = cand.text['size'] / orig.text['size']
    order = orig.order

    def region_owners(i):
        owners = set()
        for rng in (range(i - 1, -1, -1), range(i + 1, len(order))):
            for j in rng:
                if order[j] in assign and basis[order[j]] == 'unique normalized body':
                    owners.add(owner_of[assign[order[j]]])
                    break
        return owners

    for i, o in enumerate(order):
        if o in assign or not dom[o]:
            continue
        free = [c for c in dom[o] if c not in used]
        if not free:
            continue
        rel = (o - orig.text['addr']) * scale + cand.text['addr']
        owners = region_owners(i) if owner_of else set()
        c = min(free, key=lambda c: (owner_of[c] not in owners if owner_of else 0, abs(c - rel), c))
        take(o, c, 'equal body in neighbouring object' if owner_of and owner_of[c] in owners else 'nearest equal body')
        propagate([o])
    return assign, basis, dom
