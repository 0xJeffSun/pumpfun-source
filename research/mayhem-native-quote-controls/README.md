# Native Mayhem quote-helper source controls

This packet preserves **negative source experiments**, not a recovered function.
Sixteen actual Linux SDK builds all retain the same **429/441 normalized original
windows**, **84 raw-local windows** and **4,356 positive immediate-call
observations** on this unqualified native recipe. Both AMM quote helpers remain
unmatched. No candidate is promoted, and no new global instruction coverage,
runtime equivalence, historical source or whole-binary identity is claimed.

The source recovery belongs to the upstream
[trade origins and validator checkpoint](../mayhem-trade-origins-validator/README.md),
commit `e2b9060f`. In particular, its complete 1,296-byte O0095 validator is
preserved in every control. Its qualified 100 raw-local measurement is a different
recipe from the 84 raw-local native controls here. These counts are not added.

## What was actually tested

| Source control | Builds | Buy helper bytes | Sell helper bytes | Complete helper gain |
| --- | ---: | ---: | ---: | --- |
| Unchanged native control and repeat | 2 | 1,120 | 1,096 | None |
| SPL native-mint `ID` to `id()`, individually and together | 3 | 1,120 | 1,096 or 1,120 | None |
| Sell checked subtraction converted to Result before chaining division, with/without `id()` | 2 | 1,120 | 1,096 or 1,120 | None |
| Retained reserve narrowing through `u64::try_from(...).unwrap()`, individually and together | 3 | 1,120 | 1,096 | None |
| Cap field selected by reference, individually and together | 3 | 1,120 or 1,144 | 1,096 | None |
| Reference cap selection plus `id()` in both helpers | 1 | 1,176 | 1,120 | None |
| Mint borrowed at both helper boundaries, with/without reference-cap/`id()` combination | 2 | 1,120 or 1,176 | 1,096 or 1,120 | None |

Original O0092 is 1,256 bytes; O0093 is 1,120 bytes. Equal size is insufficient:
the 1,120-byte Sell variants still have different complete normalized bodies.
The three checked-narrowing builds reproduce **both entire control artifacts
raw-byte exactly**. This only bounds these particular forms under this recipe;
it does not rule out every source form in these hypothesis families.

All variants resolve 67 exact inputs through one unchanged upstream archive and
explicit captured overrides. Only the ordinary quote-helper region of
`state.rs` changes, plus the two actual callers for borrowed parameters. Physical
line counts and the whole root `lib.rs` remain unchanged. Existing program
namespaces and generated program-type definitions/references are preserved.

## Compiler and comparison evidence

The repeated unqualified native control produces:

- Candidate, 755,768 bytes: `9b35a92953d9bcd3c3cf5e5b1d968c59dfd68169bf165441b6ccbf950068d264`
- Symbols: `06d996838d2aeeeac6a4f978388aab2168bd068957e98945ebbcff2c7c86974a`

The actual launch records retain all 67 input hashes, six executable hashes,
commands, environment overrides, compiler logs and both outputs for each build.
The copied controller is exactly the controller that ran. Builds were sequential
against one locked mutable target directory using official Linux platform-tools
v1.54, `sbpf-solana-solana` and the recorded path remappings. Existing dependency
caches were reused; no clean dependency rebuild or pinning of every host library
is claimed. The archive receipt and 26-target-library check are retained.
The host `rust-lld` required a recorded executable-mode repair; its bytes were
unchanged. The separate strip phase uses native v1.54, not the earlier mixed
recipe's v1.52. Sixteen additional real strip replays equal their respective
captured candidates. Original bytes were comparison inputs only.

`observations.json.gz` retains the complete original-window membership, actual
helper CALL operands and callee shapes, the positive edge cohort, and literal
whole/meaningful-ELF comparisons for each artifact. All sixteen whole Mayhem
comparisons fail. The other three core programs are not freshly compiled or
compared here; this packet does not change the overall **0/4** status.

The reader masks only encoded local CALL operands and declared relocated LDDW
addresses, binding imported names. Registers, scalar constants, stack offsets
and branches remain literal. A positive immediate edge is recorded only when
all normalized caller counterparts have the original callee's complete shape.
This is bounded shape evidence, not unique duplicate attribution, pointed-to
data closure or a recursive proof. The quote-helper callee lists and their
multiset comparisons are reported separately from complete body equality.

## Offline verification

```sh
python3 -B research/mayhem-native-quote-controls/verify.py
python3 -B research/mayhem-native-quote-controls/test_verify.py
```

Verification needs only this packet and the exact pinned `scripts/analyze.py`.
Missing inputs fail; there is no Git, network, SDK, compiler or VM fallback.
The reader copies are retained from the earlier tagged-data packet. The 220
current script hashes are inventoried for provenance; none is changed or
executed as a runtime harness by this packet. The historical 187-script seal
and all existing workflows, selections and ledgers remain unchanged.

Six actual byte-mutation tests check scalar/register/stack/branch retention,
encoded-call target inspection and imported-name binding. A separate relocated
pointer boundary test deliberately remains normalized-equal: no unexamined
pointed-to data identity is asserted. A root-source mutation is rejected by the
source-scope checker. Normal and minimal isolated verification, these eight
tests, and whitespace checks are required before publication.

There is **no fresh target execution or runtime claim**. Historical 6,636-case
and other parent receipts retain their own artifact bindings; they are not
reused as executions of any variant here. `prepare_packet.py` captures completed
builds and performs real strip replays; it refuses an existing capture directory.
`build_native.py` retains its actual workspace/cache paths and is provenance,
not a promise that an unprepared checkout can rebuild offline.
