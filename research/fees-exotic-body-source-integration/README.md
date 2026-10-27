# Fees: exotic-fee body recovery on the pinned 558 union

This ordinary-source delta starts from the exact 43-input
[PR209 source](https://github.com/lalalune/pumpfun-source/blob/79e592bfdbd08a7e0129eccfa55087e2609fddda/research/fees-six-window-source-integration/README.md).
One `lib.rs` change recovers the complete **5,520-byte body at original 88552**,
`set_exotic_flat_fees`. The result is **559/585 normalized counterparts, 143 raw
local counterparts and 412 unique complete-body pairs**. No earlier normalized
or raw counterpart is lost. Twenty-six original windows remain unmatched.

The ordinary source resizing helper is inlined and borrows AccountInfo references
in the observed
fee-config / system-program / admin order; the event is emitted without an
unnecessary clone. Blank source lines retain existing source coordinates. No
assembly, machine-code payload, fake Source object or binary patch is inserted.
Helper naming/ownership is an inferred reconstruction, not historical-source proof.
All dependencies, features, lock records and the other 42 inputs are unchanged.
This is an attributable follow-on to PR209, not a new claim for its six gains.
Concurrent [PR207](https://github.com/lalalune/pumpfun-source/pull/207) independently
recovers parent encoder 270136 on a separate source chain and is credited; that
overlapping parent recovery is not new work in this packet.

## Fresh static evidence

An optional local reader recomputes both complete inventories, all actual direct
callee obligations, decoded Locations and raw section differences from explicitly
supplied ELF files. Three public parser source hashes are pinned before import.
It reads no saved build/runtime report and runs no Git, network, build or VM.
`expected.json` contains only freshly derived static hashes, counts, addresses
and correspondence; no executable bytes or archived receipt derivative.

- All **21 actual direct callees** from the recovered body have matching complete
  normalized shapes. Its `abort` import and incoming wrapper call are checked.
- All **four direct relocated objects** are value-equal at semantic extents: the
  whole 32-byte program ID, 17-byte event seed, complete format piece and complete
  Rust Location record/string. Raw relocated addresses need not equal.
- All **3,319 previously equal actual callee obligations** remain equal; **12
  actual edges still target unequal complete bodies**. All 165 prior decoded
  Location uses remain equal, with a new matched use (166 total).
- These are direct body/object/call facts, not transitive object, recursive,
  indirect or exhaustive runtime closure. Ambiguous shapes are not assigned
  arbitrary unique identities.

| Measure | PR209 parent | Recovered |
| --- | ---: | ---: |
| Normalized counterparts | 558 | 559 |
| Raw local counterparts | 143 | 143 |
| Candidate meaningful ELF bytes | 874,040 | 873,896 |
| Common-position differences | 446,635 | 448,155 |

**Positional byte differences worsen despite the complete-window gain.** The
candidate remains 640 bytes longer than the original 873,256-byte meaningful
ELF. It is not equal to that ELF or the full 948,944-byte allocation capture.
All four core whole identities remain unresolved; no selected checkpoint changes.
These counts/distances are not a completion percentage.

Candidate SHA-256: `b370edbb76146c7bcdeafd075a552aa33b761bf624dbed016c2bbd50ff4122a4`.
Symbols SHA-256: `24a4ea09f7f1bde993be2f1b9caf20aab605075a468d0aef99a4fc0ddc3ac6f8`.

## Local execution observations are not downloadable evidence

Two root-clean native builds reproduce both outputs exactly, with one real root
compiler invocation and a verified retained dependency/math cache. These are not
fresh all-dependency or OS-isolated build claims. Local finite regression passed
17,331 cases / 18 suites and both added arithmetic boundary cases. The earlier
fixed-admin success coverage limitation remains; finite tests do not establish
exhaustive behavior, full application-log/CU equality or untested privileges.
No compiler/runtime receipt, transaction fixture/log, archive, executable or
encoded derivative is published. Default verification explicitly reports
`native_build_verified=false`, `runtime_verified=false` and
`whole_binary_identity_verified=false`.

## Verify, materialize and build

```sh
P=research/fees-exotic-body-source-integration
python3 -B "$P/verify.py"
python3 -B "$P/test_scope.py"
python3 -B "$P/materialize.py" --parent-source /exact/pr209-source --output /fresh/source
```

`manifest.json` flattens all 43 public source origins at immutable revisions.
The readable patch must reverse to the exact parent hash and round-trip; other
inputs cannot change. Materialization checks the entire parent and output maps
and refuses unsafe paths, symlinks and existing outputs. Thirteen stdlib tests
cover source drift, patch integrity, path boundaries and false runtime claims.

Follow the [parent's pinned native Linux v1.44 recipe](https://github.com/lalalune/pumpfun-source/blob/79e592bfdbd08a7e0129eccfa55087e2609fddda/research/fees-six-window-source-integration/README.md#verify-and-materialize):
unchanged 252 registry packages, release profile, default Anchor/SPL features,
entrypoint 2.2.1, separate math crate, source-path remapping and pinned stripper.
Require a genuine root compiler invocation; require a real math invocation too
if rebuilding it instead of authenticating the retained cache. Fresh dependency
and relocated-path reproduction are separate checks. Never replace or patch an
output to repair its hash.

For optional static remeasurement, place the three public files listed by
`parser-inputs.json` under a parser root, preserving repository-relative paths,
at revision `fa8ef8040ee642302fd52f88656ddc8cf2b8cad9`:

```sh
python3 -B "$P/verify.py" --original /path/to/original.so \
  --baseline-build /path/to/pr209-build --candidate-build /path/to/recovered-build \
  --parser-root /path/to/pinned-parser-root
```

Each build folder contains `candidate.so` and `symbols.so`. Original/parser hashes
are checked, allocated symbol/stripped sections must agree, and every freshly
computed result must match `expected.json`. This mode remains static-only.
