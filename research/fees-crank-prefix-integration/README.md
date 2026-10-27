# Integrate relay rejection with the full-buffer decoder

This separately built artifact combines the relay-address correction from
[the prior study](../fees-crank-relay-rejection/README.md) with the full-buffer
unchecked FeeConfig decoder from
[the later upstream study](../fees-unchecked-prefix-recovery/README.md).
It retains **396 unique structural pairs / 42 unmatched windows**, with
588 candidate windows and 64 unique raw-equal local pairs.

The two parents each had 395 unique pairs on different artifacts. Their sets
intersect at 394; this candidate contains their exact union, with no raw or
normalized losses. It adds the 10,872-byte crank parser to the decoder parent,
and preserves the 1,144-byte unchecked helper absent from the prior relay build.
This is an integration milestone, not a second independent discovery of either
body. Full-binary raw identity remains **0/4**.

Only the relay address constraint differs from the decoder parent. The original
36-input map is retained, with every file resolved by exact hash to its existing
snapshot. Relative to the prior relay build, only `types.rs` changes, exactly
to the decoder parent's captured bytes. Namespace and generated program-type
references stay unchanged. No old capture or runtime receipt is retagged.

The complete new compiler output differs from the decoder parent's ELF at two
bytes, mapping wrong executable relay addresses from error 2012 to the original
3007. The 97 direct local parser calls and imported call agree. The unchecked
helper's 11 local calls, its actual incoming initializer edge, checked decoder
and payload-helper calls agree as well. Both owner constants, the real relocated
error-message record and text, relay ID, 35 parser literal ranges and previously
recovered panic-location contracts are checked separately. This does not prove
all transitive data or indirect calls. The crank business body remains unmatched.

Fresh local validation covers 17,331 comparisons across 18 suites, 1,542 exact
query outcome/log/compute cases, the five 24/32/20/8/30-case matrices and 16 relay
rejection cases. The control's 16 relay cases are fresh; its other receipts are
explicitly reused from the unchanged upstream decoder artifact. The candidate
has its own new receipts for its own hash. Each harness retains its observation
limits. These VM suites do not validate authentic fixed-admin
`initialize_fee_config`; the upstream 35 native source cases remain parent
native evidence, not new VM execution for this artifact.

The canonical Linux v1.44 build uses all three recorded math path remappings.
Source hashes, actual root compiler log, symbols and strip replay are retained.
Candidate: 868,120 bytes, SHA-256
`d556795d75b8df392201fcc595db64ee62fead568b9b7a42db0fa23c872e48ae`.
Source and artifact dependencies already retained in the two parents are listed
in `parents.json`. The four selected stored artifacts are compared separately
without rewriting, normalization or padding; they were not freshly rebuilt here.
Selected checkpoints, scripts, workflows and ledgers are unchanged.

```sh
python3 -I -B research/fees-crank-prefix-integration/verify.py
python3 -I -B research/fees-crank-prefix-integration/test_scope.py
```

These commands inspect saved evidence without compiling or executing targets.
Four mutations exercise unmasked scalar changes and the separate CALL, relay-ID
and decoder-owner contracts. Reproduction uses the hash-resolved source map,
the prior packet's recorded builder and runtime drivers, and this packet's
actual launch records.
