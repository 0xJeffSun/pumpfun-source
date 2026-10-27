# Fees: compose both source frontiers and recover the payout adapter

The Rust candidate preserves the latest merged Social, Crank, exotic-fee and
initializer source corrections, restores three helpers from the independent
Fees558 chain, and adds a complete normalized match for the 1,688-byte legacy
payout adapter at original address 204080. It reaches **563/585 normalized
original functions**, with **143 raw local matches** and **22 unmatched**.
Whole-ELF and whole-capture equality remain false.

The latest-main source baseline is the exact 43-input
`fees-social-claim-semantics-source-proposal` composition. It has 559 normalized
matches, but lacks three matches retained in the separate 42-input Fees558
chain: preprocessing at 231576 and distribution helpers at 235304/236240.
This candidate preserves the union of both frontiers and all their positive
direct-callee observations, source-location observations and raw matches.
Equal counts did not mean equal coverage; both complete source maps and native
baselines are included and compared independently.

| Measurement | Fees558 | Latest-main Social baseline | Composed candidate |
| --- | ---: | ---: | ---: |
| Normalized original functions | 558 | 559 | 563 |
| Unique pairs | 411 | 412 | 416 |
| Raw local original matches | 118 | 143 | 143 |
| Equal decoded Location uses | 166 | 166 | 167 |
| Equal direct-callee observations | 3310 | 3341 | 3383 |

## New adapter recovery and remaining dependency

The adapter receives a mutable Anchor instruction context. Its preparation
result is a tuple of shareholders, a change flag and accounts, destructured by
the caller. Public module/helper visibility preserves the out-of-line functions
under the pinned compiler. These ordinary Rust changes reproduce its context
loads, tuple accesses, flag masking, branches and cleanup. They are sufficient
source reconstruction, not proof of the historical spelling.

Its three actual direct calls remain separately classified:

- Offset 80 calls preparation at original 199072, whose complete body is still
  **unequal**. The caller match does not close this dependency.
- Offsets 1344 and 1680 call complete matching bodies.
- Both relocated 32-byte program IDs, at offsets 1312 and 1328, match by value.

The matching algorithm is unchanged. It masks only existing relocated-pointer
and call-displacement fields, retaining scalar values, registers, stack offsets,
branch offsets and import identities. No assembly or emitted-byte patch is used.
The preparation helper and complete program remain unfinished.

## Reproduction and verification

The latest-main baseline reproduces its published stripped and unstripped
hashes. Two separate candidate root compilations produce identical outputs with
unchanged source inputs. Builds use official Linux platform-tools v1.44 and the
existing dependency cache, offline and locked, with the existing math mappings
and v1.52 stripping tool. These are not clean all-dependency builds. Complete
input maps, native outputs, command records and build logs are retained. Absolute
paths in the controller are historical locators; a different machine requires
equivalent SDK, registry and mount paths.

Fresh full regression passes **17,331 cases across 18 suites**, plus **24**
completed-curve/pool-boundary cases. Each suite keeps its original observation
limits. These synthetic signed cases are finite evidence, not exhaustive
behavior, universal application-log equality or whole-program identity.

Candidate SHA-256:
`487d8124f2e205a21e4511160e2070b393380901213a1d0ab87c343b5de70a7b`.
Unstripped SHA-256:
`5337e4fc7d582338242a2c4d98810e7329070e576eea77d960155f5734740eff`.

Run:

```sh
python3 -B research/fees-payout-context-recovery/verify.py
python3 -B research/fees-payout-context-recovery/test_scope.py
```

The verifier recomputes source, complete-function, direct-callee, referenced-data
and saved-runtime assertions without compiling or executing contracts. Negative
controls reject unsealed claims, a resealed replacement without the new match,
and a missing runtime case. Canonical selected checkpoints are unchanged.
