# Recover the complete AMM pool preparation body

The single-use account-expansion helper creates an extra `Result` boundary in
`prepare_pool`. Inlining that helper **in Rust source** recovers original
`0x58028`: all **3,552 bytes / 443 instructions** match after the documented
relocation normalization. Review [source.patch](source.patch) and
[the proposed module](proposed/instructions/swap/mod.rs).

| Same native Linux v1.44 / SBPF recipe | Baseline | Candidate |
| --- | ---: | ---: |
| Injective normalized original functions / 785 | 729 | **730** |
| Raw-equal bodies | 148 | **148** |
| Lost normalized / raw matches | — | **0 / 0** |
| `prepare_pool` bytes (original 3,552) | 3,544 | **3,552** |

The nine ordered direct callees independently match, the external relocation
resolves to `abort` in both images, and the one 64-bit literal is equal. This
body has no relocated data references. `analyze.py` checks those facts in
addition to the normalized body, including branch destinations, registers and
stack operands. Original and candidate incoming edges are recorded separately:
there are nine original callers and seven candidate callers. Surrounding handler
boundaries still differ; neither transitive call closure nor whole-ELF identity
is claimed. The recovered body itself is not raw-equal.

## Source and compiler cause

Baseline `extend_account_if_needed(...)?; Ok(())` leaves a second tag-equals-two
test after the inlined helper's error conversion. Qualified optimized LLVM
(`compiler/baseline/pass-250.txt`) retains this test. Its generated return blocks
and register assignments differ from the original.

A direct-return control removes that test but still has nested return PHIs.
It holds the success tag across calls and adds spills: 3,632 bytes. A Result-valued
if/else produces the same complete ELF. Returning the mapped reallocation result
instead changes the error/temporary boundary and yields 3,320 bytes. None of
these controls adds a match. Their actual hashes, source patches, build commands
and measurements are retained in `experiments.json`.

The selected source moves the private helper's operations into `prepare_pool`.
All early errors now join the same return PHI. LLVM and machine passes retain
the change through PHI elimination, register allocation and block placement,
producing the original complete body. Both observed length checks and their
AccountInfo clone/drop sequences are retained, as are rent lookup, saturating
funding calculation, conditional system transfer and `realloc(287, false)`.
Only `instructions/swap/mod.rs` changes among 52 inputs. Other module source
coordinates, including the recipient validator at line 164, are preserved.

This is an ordinary Rust source reconstruction consistent with the original;
it is not a claim to know the historical source spelling. There is no unsafe
code, inline assembly, binary patch, synthetic machine padding or changed build
flag. The maintained 651-function selection and sealed evidence are untouched.

The diagnostic LLVM/MIR builds reproduce their normal **stripped** artifacts.
Additional diagnostic emits change unstripped outputs; those are not described
as normal-build repeats. Full filtered logs and selected passes are retained
for baseline, failed direct-return control and final source.

## Local execution and reproduction

Baseline is [PR #383](https://github.com/lalalune/pumpfun-source/pull/383), head
`0fb8a5d3a3416db408218ddec385ef039b181cda`, composed on #379, #374 and #319.
Its actual prior build is retained, not described as a newly executed baseline
build. Two fresh normal candidate root builds produce identical stripped and
unstripped ELF outputs, with unchanged tools, 393 dependencies and `--extern`
inputs. Both complete source workspaces are included.

| Fresh signed comparisons, original / baseline / candidate | Case triples | Functional differences | Non-compute-log differences before → after |
| --- | ---: | ---: | ---: |
| Existing legacy buy and exact-quote suite | 1,011 | 0 | 76 → 76 |
| Existing legacy sell suite | 575 | 0 | 88 → 88 |
| Existing protocol/creator sweep suite | 254 | 0 | 16 → 16 |
| Separate fresh-VM growth/rent boundary suite | 84 | 0 | 0 → 0 |

The first three use the existing resettable VM harness: 1,840 triples and 5,520
observed signed executions. The focused suite uses a fresh VM for each of 252
executions across buy, exact-quote and sell, both legacy and v2. It checks pool
lengths 243/286/287/300, one lamport, one below the 287-byte rent threshold, and that exact threshold,
readonly pools and insufficient payer funds. There are 36 successful growth
triples. Inputs, before/after accounts, CPI, return data and signatures are
recorded. The observer records actual loaded hashes; the portable verifier
rechecks transaction signatures and reconciles receipts against those hashes.
The corpora overlap and are not asserted as 1,924 unique scenarios.

This change closes a machine-code body; no new behavioral/log correction is
claimed. The full 17,462-case corpus was not rerun, and this packet does not
replay the multi-hop or admin-CTO incoming callers. Unrelated inherited backend
frame diagnostics for `admin_update_token_incentives` remain in all normal
build logs despite Cargo exit zero. Full reconstruction and deployment safety
are not established.

Latest overlap review includes #381's deposit ordering and #384–#387's separate
work; no open proposal for this `prepare_pool` source boundary was found.
Archived AMM experiment metadata was searched before these controls; no
target-specific recorded trial was found. Exact scope is in
`prior-archive-read.json` and `overlap-review.json`.

| Artifact | SHA-256 |
| --- | --- |
| Captured original | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| 729 baseline stripped | `869b91bb8172a79f8daf3335e0a05c76b973f4a582ed14cff128ca618077285a` |
| 730 candidate stripped | `0e8ce26a1ad788ffdc2a54be5f61c58c1cc57f6d7a0714d65ea2b8080143103c` |
| 730 candidate symbols | `31fb61558d816d6d9f365827516895afda7ef1f80f49c9459afb853beab9cb48` |

```sh
python -I -B research/amm-prepare-pool-recovery/verify.py
python research/amm-prepare-pool-recovery/materialize.py /tmp/amm-prepare-source
python research/amm-prepare-pool-recovery/rebuild.py \
  --source /tmp/amm-prepare-source --sdk /path/to/captured-v144-sdk \
  --cargo-home /path/to/qualified-cargo-home \
  --target-dir /path/to/qualified-build-target --output /tmp/amm-prepare-build
```

The verifier requires the repository Python requirements and checks saved
evidence; it does not execute SBF or rebuild. Exact offline Docker commands,
source/tool/dependency hashes and logs are in `builds/`. Runtime commands are in
`runtime/commands.json`; executed controllers preserve their scratch paths.
Replay requires the qualified SDK and already populated Cargo inputs. All
executions were local, with no live transactions, coordination comments,
automatic merge or deployment.
