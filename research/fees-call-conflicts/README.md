# Fees: the two call-conflicting rows, resolved by static call-graph analysis

`docs/RECONSTRUCTION-AUDIT.md` records the selected Fees ledger as 461 mapped
patterns, 122 unattributed and two rows with call conflicts, and
`docs/RECONSTRUCTION-STATUS.md` adds that body existence does not resolve
those conflicts. This package identifies the two rows and resolves both,
using only retained artifacts and static analysis. No build, execution, or
selection change is proposed; status promotion is the maintainers' step.

Pinned at upstream main `dfe4411d8a390348666025296d4b563813bd41c9` (merge of
PR #476, 2026-10-28). All offsets are ELF file offsets; in both binaries the
`.text` virtual address equals the file offset.

## The two rows

The current full inventory (pass-23 fees-current-evidence) carries exactly
two original rows and two candidate rows with status `call_conflict`, and
they are the same pair of functions seen from both sides:

| Original window | Bytes | Candidate window | Candidate symbol |
| --- | ---: | --- | --- |
| 725664 to 726064 | 400 | 710688 to 711088 | `solana_rent::Rent::minimum_balance` |
| 726064 to 726488 | 424 | 711088 to 711512 | `solana_rent::Rent::is_exempt` |

Each pair is already size-equal, normalized-body-equal and
relocation-pattern-equal. Each has exactly one unresolved call offset: 232.
Every other direct call in both windows is consistent with the counterpart.
An independent slot comparison of each pair confirms the same picture from
bytes: the windows differ only in call immediates and in the LDDW slots at
the recorded relocation positions, which are exactly the fields the
inventory normalization masks.

## Why offset 232 is unresolved in the strict index

At offset 232, both original Rent windows call original window 799664
(272 bytes). The strict index assigns that target no candidate pattern at
all, for one stated reason: 799664 is the original's terminal `.text`
window, and the inventory's own limits say no next-entry terminal window
enters the strict index. Its boundary basis is recorded as "terminal text
end; no next inferred entry." The two immediate-call residuals for these
edges are the inventory's only `terminal_boundary_only_match` entries.

The window's extent is nevertheless bounded on both sides. Its start is a
direct-call target of two retained callers, and its end, 799936, is exactly
the original `.text` section end (section offset 288 plus 799,648 bytes).
The candidate's symbol-bounded windows have no such exclusion, which is
why the conflict appears only through the original side's rule.

## The resolution

Window 799664 belongs to a four-window duplicate-body group. Its body is
byte-identical (SHA-256 `5064629c0b173ec7…`) to original window 799392 and
to candidate windows 787152 (`__gedf2`) and 789432 (`__gtdf2`). The body
contains no calls and no relocations, so its raw hash is its normalized
hash: there is no masked field in which a difference could hide. Body
evidence alone therefore attributes 799664 to the group but cannot choose
between the two candidate copies. The call graph chooses:

| Edge (both Rent callers) | Original target | Candidate target | Pairing selected |
| --- | --- | --- | --- |
| offset 232 in both callers | 799664 | 787152 (`__gedf2`) | 799664 to `__gedf2` |
| offset 304 / 312 in the callers | 799392 | 789432 (`__gtdf2`) | 799392 to `__gtdf2` |

The caller set is closed. A whole-`.text` scan of both binaries finds no
call site outside the two Rent windows that reaches any of the four group
windows, and within the group the two edge sets are disjoint. The pairing
is a bijection forced by the encoded calls, the same attribution method
the `fees-call-target-attribution` study uses for duplicate bodies.

Admitting 799664 under this terminal supplemental pairing makes the
offset-232 edges consistent, and with them every direct call in both Rent
windows. Both rows then stand on the same footing as the 463
`normalized_call_consistent` rows: equal size, equal normalized body, equal
relocation pattern, all direct calls consistent.

**Verdicts, both established:** original 725664 (`minimum_balance`) and
original 726064 (`is_exempt`) are resolved; their `call_conflict` status is
an artifact of the terminal-window exclusion, not a correspondence failure.
Two corollaries follow at the same confidence: original 799664 is
attributed to candidate `__gedf2` (787152), moving it out of
`unattributed`; and original 799392's body-ambiguous match narrows to
candidate `__gtdf2` (789432).

## Bounds

- Correspondence is claimed at the inventory's own standard only.
  Transitive closure and referenced-data equivalence remain unproven for
  these rows, as they do for every `normalized_call_consistent` row.
- The within-group assignment rests on encoded call edges because the
  bodies are identical by construction. If a future candidate rebuild
  reorders the two compiler-rt copies, the assignment must be re-derived
  from the calls, never carried over from addresses.
- A third conflict record exists in the pass-01 refinement
  (`conflict-refinement.json`, original window 700488, under the pass-01
  candidate). It is already closed in the current inventory: 700488 is
  `mapped_pattern` via candidate 686080, raw and normalized equal, calls
  consistent. It is not one of the two current rows and is not reopened.

## Verification

```sh
python3 research/fees-call-conflicts/verify.py
```

The checker runs offline against the evidence in this folder: it re-hashes
the four retained window bodies, re-checks the call-edge bijection and the
closed caller set, re-checks the terminal extents against the recorded
section bounds, and confirms the register's claims against the retained
inventory extract. Reviewers with the repo ELFs can additionally run
`evidence/rederive.py <original.so> <candidate.so>`, which recomputes
every value in this package from ELF bytes and imports no repo code. The
three ELFs are bound by SHA-256 in `evidence/call_edges.json`.

## Sources (pinned at dfe4411)

| File | Blob SHA | Used for |
| --- | --- | --- |
| `docs/RECONSTRUCTION-AUDIT.md` | `89a3eba568537c15982bc302b909887c9e40acbf` | the 461 / 122 / 2 ledger counts |
| `docs/RECONSTRUCTION-STATUS.md` | `cc109483f62815beee023251bc47af83bc1ad3dd` | "Selected Fees retains two call-conflicting rows" |
| `docs/COMPLETION.md` | `45d0586ee6a007fa985457aa274772d0abddd89b` | current checkpoint; stopped-lane list (this item is not in it) |
| `repro/layered-passes/pass-23/fees-current-evidence/analysis/full-function-inventory.json` | `a71e9ad5150aa7592556dc0adb736c0de1ee6324` | row records, residuals, limits |
| `repro/layered-passes/pass-01/results/fees/conflict-refinement.json` | `238d0a0b7561f3e0db98b5c21a897ca253c0afdc` | the terminal-boundary refinement records and the closed 700488 record |
| `evidence/original/pump_fees/deployed.so` | `e330cbb6dfbc3351dbaaf594ba6e873d89af5f5e` | original ELF (SHA-256 in evidence) |
| `repro/pump_fees/sharing-authorize-main-v144/main/candidate.so` | `d2eb83140c0a525ca2719511e863308f64bfbd70` | candidate ELF (SHA-256 in evidence) |
| `repro/pump_fees/sharing-authorize-main-v144/main/symbols.so` | `5a56c2866635deec98f8fc2d807c6db3f089d0f5` | candidate symbol names and extents (SHA-256 in evidence) |
| `research/fees-call-target-attribution/README.md` | `04afadbe0c60221c61c110247e3c5d10936182b4` | precedent: encoded calls attribute duplicate bodies |

Prepared by TaoBot. All work was static analysis of retained artifacts.
