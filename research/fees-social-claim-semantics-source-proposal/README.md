# Fees legacy social claim: saturated deadline, diagnostics and ownership

This source-only proposal corrects observed legacy `claim_social_fee_pda`
behavior. **It does not add a complete matched function window.** The pinned
frontier remains 559/585 normalized original windows and 143 raw local matches.
The original 4,536-byte business body at 132744 remains unmatched because one
rate-limit diagnostic block is placed differently.

The exact parent is the 43-input
[public exotic-body source packet, PR212](https://github.com/lalalune/pumpfun-source/blob/9b09de84c9422ec6bacb363231a0f8a2d8c14a31/research/fees-exotic-body-source-integration/README.md). Only `social.rs` and the root module's visibility
change. The V2 claim handler, all account declaration text and all other 41
source inputs remain byte-identical. Newer global integrations are separate
experiments, not counts established by this packet.

## Recovered ordinary source boundaries

* Disabled claims log the observed message and return plain `FeeError::into`,
  without the extra Source-bearing `require!` construction.
* Rate admission uses the observed saturated **deadline** comparison, gated by
  nonzero rate and previous claim. Subtracting the previous timestamp from the
  current time is not equivalent at the integer boundary.
* The four complete captured diagnostics are restored for disabled, rate-limited,
  zero-amount and executable-recipient branches.
* Transfers use the observed saturating subtraction/addition. Both AccountInfo
  clones and mutable lamport borrows retain the observed lifetimes; recipient
  balance after transfer is captured before updating state.
* `emit_cpi!(event)` borrows the event. The previous explicit `event.clone()`
  added an unobserved second String clone and event copy.
* Making the already-public helper's `social` module public preserves its
  Context ABI without relocating the handler into the program function.

The original/candidate pair is bound by the actual call in the fully matched
wrapper at 645864, not inferred from function size. Historical helper/module
visibility is inferred, not proven. No assembly, emitted program bytes, forged
Source values, ELF patching or widened matching mask is used.

## Local observations, not execution evidence included here

Two root-clean native v1.44 builds reproduce the same candidate and symbols using
an immutable verified dependency cache; this is not a fresh all-dependency build.
There are no normalized or raw local-body losses. All 166 decoded Location uses
remain equal. The candidate is 873,176 bytes versus 873,256 bytes in the meaningful
original ELF and 948,944 in its complete capture. Both whole-file comparisons fail. Common-position differences worsen from
448,155 to 453,541 despite the semantic correction; the output is 80 bytes
shorter than the meaningful original. Neither smaller size nor window counts
are completion percentages. All four core whole identities remain unresolved.
No selected checkpoint is changed.

A separate static audit verifies all 26 ordered actual direct callee bodies and
all 8 complete direct relocated objects. Their different instruction offsets
remain explicit. The 32-byte rate-limit log block is emitted at offset 440 rather
than original 1024, with corresponding branch differences. This is still a
canonical full-window mismatch; neither graph similarity nor equal length is
counted as a match. Transitive data, indirect semantics and whole layout remain
open.

A stronger local comparison covers the existing 347 signed synthetic fixtures
plus one saturated-deadline case, and additionally compares application log lines.
Both the actual PR212 parent and this composition were freshly tested. The
comparison finds **1 state/event mismatch and 144 application-log mismatches**
in that parent, and **zero of either** in the proposal. These are not results
borrowed from the earlier isolated 550-window source trial. VM compute-consumption and
invocation metadata lines are not asserted equal. These finite cases are not
exhaustive equivalence proof.

A separate fresh full offline regression also passes all 17,331 cases across
18 suites. The existing covered Crank application-log checks and both arithmetic
boundaries remain accepted. Each suite retains its own observation limits;
authentic fixed-admin initializer success is not covered. Native artifacts,
receipts, runtime inputs, logs and encoded derivatives are not included in this
packet. All observations above report unpublished local results, not replayable
execution proof supplied here.

Candidate SHA-256: `ed0d7bf81b71d2cd514d8e69beecf51a9767e0ba66a8c1b317dbf83d57cd01db`.
Symbols SHA-256: `f4d5e2f40061a716218c2860b8869bec884a67b9fc8d0bb69936dbbebbef7721`.

## Source-only verification

```sh
python3 -B verify.py
python3 -B test_scope.py
python3 -B materialize.py --parent-source /exact/pr212-source --output /fresh/source
```

`manifest.json` pins every parent source's public revision/path and complete
before/after hash maps. Materialize the parent's exact recovered stage first.
The readable patch reverses to those parent hashes. The verifier checks that V2
and all account declaration text are untouched, and that root changes only the
module visibility. The materializer writes only fresh source files and rejects
source drift, symlink inputs/outputs and symlink output ancestors. It executes
no network operation, subprocess, compiler or target.

Default reports set `runtime_verified`, `native_build_verified` and
`whole_binary_identity_verified` to **false**. Native builds are separate opt-in
operations using the [pinned v1.44 recipe](https://github.com/lalalune/pumpfun-source/blob/0b5b69c6d4396ac520d1723fa8bd005e2cbbe549/research/fees-current-source-integration/README.md#guarded-portable-build-recipe),
the unchanged locked Anchor/SPL features, entrypoint 2.2.1 and separate math crate.
This packet does not execute or silently modify that recipe.

Review retains significant source/patch whitespace with two exact package-local
Git attribute rules. The source verifier checks their literal contents; compiler
inputs and the source-only evidence boundary are unchanged.
