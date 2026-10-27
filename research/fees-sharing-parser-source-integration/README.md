# Fees: two account parsers and attributed distribution helpers

This one-file ordinary-source integration starts from the exact **43-input
PR215 Social-corrected 559 source**, not an older isolated parser trial:
[immutable parent](https://github.com/lalalune/pumpfun-source/blob/eae87f58426911685a908340354d2a3868e2ede3/research/fees-social-claim-semantics-source-proposal/README.md).
The measured result has **563/585 normalized counterparts, 143 raw local
counterparts and 416 unique complete-body pairs**. All prior normalized/raw
counterparts remain. Twenty-two original windows are still unmatched.

## Source changes and attribution

| Original complete body | Bytes | Source recovery | Attribution |
| --- | ---: | --- | --- |
| 235304 | 936 | Individual owned AccountInfo inputs, in-body account struct and `mem::take` remaining Vec transfer | Existing [PR206](https://github.com/lalalune/pumpfun-source/pull/206), independently reproduced and composed; not a new discovery |
| 236240 | 1,224 | Corresponding V2 owned-input/account-struct boundary | Same PR206 recovery |
| 484816 | 16,112 | Legacy creator ATA constraint uses fixed native-mint and legacy-token program constants | Independently measured account-constraint source recovery |
| 502096 | 16,880 | V2 quote-mint constraint explicitly binds `mint::token_program=token_program` | Independently measured account-owner constraint recovery |

Only `programs/pump-fees/src/sharing_update.rs` changes. The ordinary constraints
restore the observed validation semantics instead of merely rearranging code.
All other 42 inputs, account field types/order, dependencies, locked versions and
features remain unchanged. Blank lines preserve existing source coordinates.
No assembly, executable byte template, invented Source object or output patch
is inserted. Rust helper spelling/ownership is inferred, not historical proof.

The public remaining-account preprocessing recovery in
[PR213](https://github.com/lalalune/pumpfun-source/pull/213) is **not incorporated**
in this frozen source. Nor does this packet silently incorporate later native
Crank lifetime experiments. It establishes its exact attributable parent/delta,
not completeness against a moving upstream frontier. Concurrent
[PR216](https://github.com/lalalune/pumpfun-source/pull/216) also reaches 563 on
this same Social parent, but with **different coverage**: it composes preprocessing
231576 and a new payout adapter 204080 rather than these two parser recoveries.
Its shared PR206 helper gains are credited; its adapter/preprocessing are not
included here. Equal totals must not be interpreted as equal inventories.

## Fresh optional static verification

`compare.py` remeasures supplied original/parent/candidate ELF files using three
hash-pinned public parser sources. It consumes no saved measurement or execution
receipt and invokes no Git, network, compiler or VM. `expected.json` was generated
by that fresh reader and contains static counts/hashes/addresses only.

All **252 actual direct callees** from the four gained bodies have matching
complete shapes: 9 legacy-helper calls, 14 V2-helper calls, 113 legacy-parser
calls and 116 V2-parser calls. All **3,341 previously equal direct-callee
obligations** survive. The result has 3,605 actual edges, **10 still targeting
unequal complete bodies**, and all 166 prior decoded Location values remain
equal. Ambiguous duplicate shapes are not arbitrarily assigned unique identities.
These are one-hop body/Location facts, not recursive object/indirect semantics.

Separate local static audits checked the two parsers' 47 and 45 complete direct
objects, respectively, and both helpers' direct-call/zero-direct-object boundary.
Those local audit reports are not published or consumed by the source tools.
The included optional reader does not claim unrestricted object extent closure.

| Measure | PR215 parent | This integration |
| --- | ---: | ---: |
| Normalized counterparts | 559 | 563 |
| Raw local counterparts | 143 | 143 |
| Meaningful candidate ELF bytes | 873,176 | 874,688 |
| Common-position differences | 453,541 | 464,073 |

**Raw positional differences worsen despite the four complete-window gains.**
The output is 1,432 bytes longer than the original 873,256-byte meaningful ELF;
section deltas are `.text` +664, `.rodata` +40, `.data.rel.ro` +200 and `.rel.dyn`
+528. Meaningful ELF and full 948,944-byte capture equality both remain false.
All four core whole identities remain unresolved. No checkpoint is replaced;
window counts and raw distances are not a reconstruction percentage.

Candidate SHA-256: `659c8ff63e8d50043a394f67f76b85fb607a24889c614e65c61c67714c26510e`.
Symbols SHA-256: `25d04cc166981863a3a87f4ded524fb95e23bb8a0b5e9e9587972716e72142e9`.

## Local build/runtime observations

Fresh local regression on this exact composition passes 17,331 cases / 18
suites, with all 201 pinned inputs unchanged. Stronger checks preserve all 348
legacy Social outcomes/application logs, 357 covered Crank application-log cases
and both added native arithmetic boundaries. An eight-case quote-owner matrix
repairs four failures freshly observed in the actual Social parent. Recorded
synthetic signatures were independently checked. These are bounded local
observations, not downloadable execution proof in this packet.

Two root-clean native builds reproduce both hashes with a real root compiler
invocation and an authenticated retained dependency/math cache. This is not a
fresh all-dependency or OS-isolated build claim. Execution receipts, runtime
fixtures/logs, archives, binaries and encoded derivatives are not published.
Finite coverage cannot prove exhaustive semantics, full runtime log/CU equality
or authentic fixed-admin initializer success. Default verification reports
`native_build_verified=false`, `runtime_verified=false` and
`whole_binary_identity_verified=false`.

## Source-only materialization and optional comparison

```sh
P=research/fees-sharing-parser-source-integration
python3 -B "$P/verify.py"
python3 -B "$P/test_scope.py"
python3 -B "$P/materialize.py" --parent-source /exact/pr215-source --output /fresh/source
```

`manifest.json` flattens every immutable public parent source origin. The one-file
readable patch must reverse to the parent hash and round-trip exactly. Full
43-input parent/output maps are checked; unrelated drift, unsafe paths, symlinks
and existing outputs are refused. Thirteen stdlib source tests cover mutation,
patch/path boundaries and false execution claims. No default mode reads an ELF.

Follow the [pinned native Linux v1.44 build recipe](https://github.com/lalalune/pumpfun-source/blob/79e592bfdbd08a7e0129eccfa55087e2609fddda/research/fees-six-window-source-integration/README.md#verify-and-materialize)
with unchanged 252 registry packages, default Anchor/SPL features, entrypoint
2.2.1, separate math crate, source-path remapping, release profile and pinned
stripper. Require a real root compiler invocation; require a real math invocation
if rebuilding it instead of verifying the retained cache. Fresh dependencies and
relocated paths need separate reproduction. Never patch or substitute outputs.

Optional explicit static comparison requires the three public source files in
`parser-inputs.json`, preserving their repository-relative paths at revision
`fa8ef8040ee642302fd52f88656ddc8cf2b8cad9` beneath a parser root:

```sh
python3 -B "$P/verify.py" --original /path/to/original.so \
  --baseline-build /path/to/pr215-build --candidate-build /path/to/sharing-build \
  --parser-root /path/to/pinned-parser-root
```

Each build directory contains `candidate.so` and `symbols.so`. The full fresh
result must equal `expected.json`; original/parser hashes and allocated
symbol/stripped section consistency are checked. This is static-only analysis,
not downloadable native execution or behavioral proof.

Review preserves exact patch context with one package-local Git whitespace rule,
whose literal contents are checked by the source verifier. Source bytes and
source-only verification scope remain unchanged.
