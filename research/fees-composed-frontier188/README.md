# Fees: verified composition of the reviewed reconstruction branches

This artifact-backed build combines PR #188's math/SyncNative work with the
sharing-account changes from #176/#185 and the social-PDA creation fix from
#172. The independently rebuilt baseline exactly reproduces #188's published
stripped and unstripped hashes. Four ordinary source files then change.

The composition advances **545 → 551/585 normalized windows**, or **398 → 404
unique structural pairs**, with no lost normalized or raw-local matches.
**118 raw-local matches remain; 34 windows are unmatched.** Those unmatched
bodies occupy 206,360 of 799,648 original text bytes (25.8%); this is not a
percentage of source work remaining. All four core whole binaries remain unequal.

| Added complete original window | Bytes | Boundary |
| --- | ---: | --- |
| 190104 | 3296 | social-PDA creation body |
| 381352 | 6152 | admin sharing account parser |
| 445160 | 11016 | sharing creation account parser |
| 464168 | 3000 | sharing creation account exit |
| 639104 | 1360 | sharing creation dispatch |
| 642848 | 1416 | admin sharing dispatch |

The two dispatchers still call unmatched business bodies: their callee matches
are 4/5 and 9/10, respectively. The remaining added bodies have fully matching
immediate callees. The analysis checks parser strings and owner IDs, the typed
program reader's ID/error/allocation operands, and the social creation messages
and full diagnostic path. All 163 decoded Location-shaped uses agree. It also
rechecks the SyncNative pack helper and its incoming discriminant/encoded byte.
These are bounded data/call proofs, not exhaustive transitive semantics.

The original-order baseline's 3,033 direct-edge observations remain present;
three previously unequal callee bodies now agree. The composition contains
3,238 such observations. Call attribution is recomputed separately in the
current inventory; body matches and attributed duplicate bodies remain distinct.

## Build and runtime evidence

Both v1.44 root builds retain exact 42-file input maps, source snapshots derived
from immutable public parent blobs, actual compiler commands/logs, unchanged-input
checks, strip commands and both binaries. Builds reuse the dependency target
cache. Before compilation one missing cache entry was recovered from another
local Cargo cache and checked against its locked archive SHA; no registry package
or lockfile was changed. No all-dependency clean rebuild is claimed here.

The composition freshly passes **17,331 comparisons across 18 suites**, including
63 captured-Pump admin-CTO cases, and **157 strict signed social-creation cases**.
The latter compare every retained original/candidate field, including raw logs
and transaction bytes. The verifier recomputes those saved strict equalities;
it checks the full-suite report's bindings and per-suite outcomes without
reexecuting the VM. Earlier exact-query and other targeted matrices retain their
own candidate bindings; they were not newly replayed for this composition.

Known Crank application-log gaps, authentic fixed-admin initializer coverage,
allocator exhaustion, complete data/indirect closure and whole-ELF identity
remain open. No deployment or live blockchain action was performed.

```sh
python3 -I -B research/fees-composed-frontier188/verify.py
python3 -I -B research/fees-composed-frontier188/test_verify.py
```

The candidate is 872,080 bytes, SHA-256
`4b487083016620adcdd36cbde8088c7d8bfbf6263199e6a223a332eda402a3e3`.
Its unstripped SHA-256 is
`8890cab6a583c34acb5a3121fe4f1a0012a5dfa0cc909848300484befa8a2977`.
The selected program sources and historical checkpoints remain unchanged.
