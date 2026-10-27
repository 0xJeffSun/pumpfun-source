# Fees InitializeFeeConfig: compile the admin Pubkey as a constant

This one-file ordinary-source proposal recovers the complete 6,232-byte
`InitializeFeeConfig::try_accounts` body at original address **295800** under the
existing full-window comparison. It moves the unchanged base58 admin key into a
named `const Pubkey`, then uses that constant in the existing address constraint.
No account types, error codes, literal key value, source line count or dependency
features change.

The exact parent is the `integrated` 42-input, 550-window state from
[the published upstream/Crank packet, commit ebb90eee](https://github.com/lalalune/pumpfun-source/blob/ebb90eeecb1ecb5ff00adacc507f8b8f3881ead3/research/fees-upstream-crank-source-proposal/README.md).
This is **not** that packet's later `diagnostics` stage. All 41 unrelated source
files remain byte-identical to the specified parent. Newer global compositions
are separate experiments; this packet does not claim their counts.

## Why the source boundary matters

In the locked `solana-pubkey` 2.2.1, `pubkey!` expands to a call to the const-capable
`Pubkey::from_str_const`, not an inline `const` block. The old address expression
actually emitted a runtime base58-decoder call and an extra stack slot. The
original parser instead compares against a static 32-byte key and constructs the
error's compared values from that constant. The existing source base58 literal
independently decodes to exactly that complete captured key.

The declaration forces ordinary compile-time evaluation. Its identifier is a
reconstruction choice; the historical name is unknown. This does not embed
captured executable bytes, patch an ELF, widen comparison masks or replace the
public key with a guessed value. The original address constraint and
`FeeError::InvalidAdmin` remain intact.

## Local observations, not published execution evidence

Two root-clean native v1.44 builds reproduced the same candidate and symbols
using the verified dependency cache. These are not fresh all-dependency builds.
The isolated result is **551/585 normalized bodies**, up from 550, with no losses.
All 42 actual parser direct callees have complete matching normalized bodies;
all 14 direct relocated objects have complete matching values/extents, including
account names, the entire admin key and the single event-authority seed descriptor.
All 163 decoded Location uses still agree. The pairing is bound through the
actual call in the already matched generated wrapper, not inferred from size.
Transitive callee data and indirect runtime behavior are not fully established.

Raw local-body matches increase from **118 to 142**, with no losses. Four
candidate-only runtime-decoder windows disappear (591 to 587 candidate windows).
These local gains are not whole-byte identity: the candidate is 866,336 bytes,
versus 873,256 bytes in the meaningful original ELF and 948,944 in the capture.
Common-position differing bytes actually rise from 456,100 to 466,938 as layout
moves. Such positional counts are not estimates of remaining work or code.
Whole meaningful-ELF and complete-capture equality both remain false.

A separate local 18-suite, 17,331-case offline regression passed without
mismatches. **That standard regression does not execute authentic fixed-admin
`initialize_fee_config` success.** It establishes only absence of detected
regressions in its covered cases, not runtime proof of this initializer. The
parser result above rests on static source/build evidence.

Native outputs, build receipts, runtime cases/logs and encoded derivatives are
not included. The observations above report unpublished local results, not
execution proof contained in this source-only packet.

## Source-only verification

```sh
python3 -B verify.py
python3 -B test_scope.py
python3 -B materialize.py --parent-source /exact/integrated550/source --output /fresh/source
```

`manifest.json` pins each parent source's public revision/path and complete
before/after hashes. First materialize the pinned parent package's `integrated`
stage, then use this exact-parent materializer. The readable patch reverses to
the public parent hashes; a strict source check permits only this unchanged-key
constant boundary. Output must be fresh; symlink inputs/outputs and symlink
output ancestors are rejected. No network, subprocess, compiler or VM is run.

Default reports leave `runtime_verified`, `native_build_verified` and
`whole_binary_identity_verified` **false**. Native reconstruction is a separate
opt-in operation using the [pinned v1.44 recipe](https://github.com/lalalune/pumpfun-source/blob/0b5b69c6d4396ac520d1723fa8bd005e2cbbe549/research/fees-current-source-integration/README.md#guarded-portable-build-recipe)
and unchanged locked Anchor/SPL feature set, entrypoint 2.2.1 and separate math
crate. This packet does not execute or silently alter that recipe.
