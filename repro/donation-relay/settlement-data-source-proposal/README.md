# Relay: exact read-only data from ordinary source, not whole identity

This source-only follow-on composes the previously recovered epoch and just-swap
bodies with the [module/facade source from PR175](https://github.com/lalalune/pumpfun-source/pull/175),
then retains a frozen ordinary-source settlement refinement. **485/492 normalized
windows and 142 raw local matches are preserved.** The final complete `.rodata`
section is **19,863 bytes equal**, SHA-256
`353454bb0f6cd671503726c5427817c16f7c9c0054d8568ddd9d0cf8be11f2df`.
The final `.text` exceeds the original by 120 bytes, down from 304 in the composed
baseline. This is not whole-file identity, a percentage of completion or proof
of historical source provenance.

## Attributable source stages

All stages have exactly 60 source inputs. Baseline mappings pin public source
blobs at PR175 commit `a56a22f32fce7dfe4e05c47d48e7b18651438779` rather than
copying another full source tree into this packet.

| Stage | ELF bytes | Normalized / raw | `.text` length excess | `.rodata` differing positions | `.data.rel.ro` differing positions |
| --- | ---: | ---: | ---: | ---: | ---: |
| Anchor facade baseline | 818600 | 483 / 142 | 320 | 321 | 677 |
| Known epoch + just-swap composition | 818584 | 485 / 142 | 304 | 321 | 675 |
| Frozen shared-check / recipient refinement | 818400 | 485 / 142 | 120 | 0 | 473 |

The first transition adds only already-published normalized ordinals 96 and 99;
no new discovery is claimed for them. The second adds no complete normalized or
raw window. All existing windows are retained, including 650 recursively
**direct-call-shape**-closed pairs in the two 485 stages. Positional byte counts
are not missing-code or semantic-closure measurements.

Three ordinary files change in each transition, with complete readable patches.
The final refinement puts share admission in the captured source-attributed `tools/checks.rs` module
as an `#[inline(always)]` Result-returning helper, uses explicit wire argument
ownership and nested signer-seed arrays, bounds recipient slices, and preserves
the measured compared-key order. No assembly, linker order file, copied target
instructions, output patching or padding is used. It is a frozen research
candidate, not a selected checkpoint promotion or exhaustive semantic guarantee.

## Complete positional data audit, with limits

The optional static checker independently revisits **all 359** positional
`.data.rel.ro` relocation sites, including raw-equal pointers, and confirms
**507 nonpointer qwords** are exact. All 282 read-only-data targets have identical
section-relative positions in the fully identical `.rodata`; all 3 data-to-data
pointers preserve their relative offsets. The remaining 74 targets bind complete
normalized function bodies with recursively closed direct-call shapes.

**Five text targets contain indirect calls.** This is a relocation-aware data
shape result, not proof of indirect-call behavior, arbitrary-state equivalence,
complete pointer type recovery or whole-file identity. Original capture is
830,448 bytes; meaningful ELF extent is 818,280. The final output is 818,400;
393,528 common file positions differ, with a 12,048-byte original-only tail.
Neither capture nor meaningful ELF equals the candidate. Seven original windows
remain unmatched. Protected relayer settlement success is not dynamically covered.

## Source-only verification

This packet contains ordinary sources, exact maps/patches, static hashes/counts
and address inventories, and stdlib Python checks. No ELF, archive, encoded
machine payload, replay cases, build receipt or runtime receipt/excerpt is
included. Measurements and data-graph records were freshly recomputed directly
from the local original/compiler outputs, without reading archived receipts.

Two independent root-clean local builds agreed on both output hashes; local
finite offline replay also passed. These are observations, **not downloadable
runtime proof**. Default verification reports `compiler_executed=false` and
`runtime_verified=false`; it checks source integrity and recorded static metadata,
not ELF bytes. No verifier mode compiles or executes a VM.

From a Git clone containing the pinned public commit, using Python 3.11+:

```sh
P=repro/donation-relay/settlement-data-source-proposal
python3 -I -B "$P/verify.py"
python3 -I -B "$P/test_verify.py"
python3 -I -B "$P/verify.py" --materialize work/relay-settlement-source-fresh
```

Use `--variant anchor-facade` or `--variant natural485-facade` to materialize the
controls. Existing destinations, unsafe names and symlinks are rejected. Nine
tests check mutation, path/read boundaries and exact source materialization.

## Portable build and optional remeasurement

Use the full [pinned PR175 native v1.48 recipe](https://github.com/lalalune/pumpfun-source/blob/a56a22f32fce7dfe4e05c47d48e7b18651438779/repro/donation-relay/module-layout-facade-source-proposal/README.md#portable-local-compilation-recipe),
substituting this packet's materialized source as `SOURCE`. It pins the official
Linux x86_64 Anza platform-tools v1.48 archive and 253 public locked registry
packages, explicit credential-free build environment, target/strip commands,
release profile and source-path remap. Authenticate tools and dependency sources
before executing their native build scripts/procedural macros. The source-only
materializer does not install tools, fetch dependencies or sandbox compilation.
No captured executable payload, ELF or assembly template enters compiler inputs.

Local results used root-clean dependency-cache reuse. Fresh all-dependency builds
at relocated paths require independent comparison; equality is not assumed.
Never repair discrepancies by copying or patching a program artifact.

For opt-in remeasurement, place each stage's local compiler products under
`/path/to/builds/<variant>-build01/{candidate.so,symbols.so}`. The original,
public ELF parser and original-window inventory are hash-pinned in
`comparison-inputs.json`:

```sh
python3 -I -B "$P/verify.py" --verify-local /path/to/builds
```

This recomputes all three full section/window inventories and the final 359-site
data graph, and verifies the local file hashes. It does not read build/replay
receipts or execute target code. Final check hashes:

- Stripped: `95a5eb2f7a29be9dfe890c93c8f388533c403e999e370e2e00f665c8c49218c6`
- Symbols: `651f4351925eb382a32dd78ce9e64fb3f4d480c2ede40bac176989aa21b62043`

No protected source-selected checkpoint, workflow or deployment is changed.
Whole-byte completion of the four core programs remains 0/4.
