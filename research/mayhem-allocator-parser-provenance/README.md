# Mayhem allocator: historical event-parser context

The historical Anchor event-parser template supplies a source-backed example of
the zeroed-allocation context isolated in [PR #253](https://github.com/lalalune/pumpfun-source/pull/253).
Rendering that template with the public `CreateEvent` type changes the curve
crate's `finish_grow` from 312 to 328 bytes. Adding the historical Solana exclusion
reverses the change. Public IDL definitions alone do not produce it.

This is a **mixed-source diagnostic**, not recovered Mayhem source. It combines
the older event-parser template with Anchor 1.0.0-generated event types from the
current published Pump IDL. It does not compile the complete older Anchor macro,
establish the original IDL/version or promote a reconstruction. The qualified
source baseline is `21bf0cf41ffed3c753630235969b6f183efabf35`; this experiment has
not been composed with the newer provider-sharing checkpoint or its
[trade/validator successor](../mayhem-trade-origins-validator/README.md).
That successor independently reaches 429 normalized windows with twelve
unmatched; the counts below belong to this older qualified diagnostic only.

## Source history and controls

Anchor commit [`624f3ae`](https://github.com/otter-sec/anchor/commit/624f3ae95c84f65c16567f997f29721fb9827406)
(18 December 2025) added `#[cfg(not(target_os = "solana"))]` to the generated
utilities module. The retained earlier `utils.rs` comes from
[`c1c9261`](https://github.com/otter-sec/anchor/blob/c1c9261ca4e2f9ce3232e4fd41e4f6ad8742fe3e/lang/attribute/program/src/declare_program/mods/utils.rs).
Applying that one-line addition reproduces the exact post-change Git blob
`4fb84b0879c07819886ba419fee5b6434436555d`. Anchor 1.0.0's retained, checksum-bound
`parsers.rs` also contains the exclusion.

The [official Pump IDL](https://github.com/pump-fun/pump-public-docs/blob/639b87fb45c3adeffa6f7c4a1bf0cb85e392bf22/idl/pump.json)
has Git blob `bb79d04e5a4ef8b286d67511757c23a15672ef51` (328,788 bytes, no final
newline). Its current `CreateEvent` includes strings. `verify.py` deterministically
renders the retained historical `gen_event` templates with the IDL event names.
The `legacy_event_utils` namespace and imports are explicit experimental
adaptations; account/instruction parsers are not copied. Current Anchor emits
the event types. No shared vendor source was modified.

| Direct compiler control | Helper bytes | Changed existing text sections | Added sections |
| --- | ---: | ---: | ---: |
| Complete public IDL | 312 | 0; 8 names absent | 201 |
| Small instruction IDL + public accounts/events/errors/types | 312 | 0 | 59 |
| Small instruction IDL + all public events/types | 312 | 0 | 33 |
| Small instruction IDL + CreateEvent definition | 312 | 0 | 2 |
| CreateEvent + rendered historical parser, enabled | 328 | 1 | 5 |
| Same parser, excluded on Solana | 312 | 0 | 2 |
| All 32 events + rendered historical parser, enabled | 328 | 1 | 64 |

The one changed existing section is `finish_grow`. Its 328-byte object body
equals the earlier zeroed-vector diagnostic and the Token-2022 helper. The full
public IDL changes CPI interfaces, so its eight absent names are reported
explicitly; it is not an unchanged-interface control.

## Fresh full builds and byte boundaries

Three fresh offline Windows builds each compile 163 crates (85 target and 78
host). Two enabled-parser builds produce exactly identical raw and stripped
outputs. The gated build is a separate negative control.

| Output | Bytes | SHA-256 |
| --- | ---: | --- |
| Enabled raw ELF, both repetitions | 867,760 | `f8cc8fd6c8db36f87704023360290356dd4197347acfb4e3bfebe7f475051331` |
| Enabled separately stripped ELF | 733,368 | `56bd28a9c5956c01df8495647a4ea953840640a0f15fe3a260547d86efafe3a3` |
| Gated raw ELF | 867,744 | `d424098f47aab84e62aa5d4c407d4d15d544651ad4018b263c214b2a021c8934` |
| Gated separately stripped ELF | 733,352 | `03f1f70e6a33cb60a1a1fa7110cdecf03553ee30b1ff7b9a0e26905d0ba1c175` |

The enabled stripped output exactly equals PR #253's zeroed-vector diagnostic;
the gated stripped output equals PR #250's qualified baseline. **Neither raw
ELF equals the corresponding earlier raw ELF.** Only `.symtab` and `.strtab`
section payloads differ in those comparisons; this is not a claim that every
differing file byte lies inside those payloads (section-header metadata can
also differ). No padding or allocation-image comparison is performed.

All 456 linked function sections retain the same providers. The parser code
itself is absent from the final function map. Enabled text grows by 16 bytes;
only the allocator helper changes normalized shape. O0209 and O0237 each have
two matching 328-byte candidates, and the 640-byte reserve at 487224 calls the
new helper at 486896 at byte offset 528. Maximum injective local-shape matching
is 428, versus 427 gated. Both remain 428/441 normalized; raw-local counts are
139 enabled and 100 gated. The same thirteen original bodies remain unmatched.

These are local static correspondences, not full raw identity, transitive
call/data closure, behavioral equivalence or security evidence. No target
program or blockchain transaction was executed.

## Offline verification and retained material

```sh
python -I -B research/mayhem-allocator-parser-provenance/verify.py
python -I -B research/mayhem-allocator-parser-provenance/test_verify.py
```

The standard-library verifier checks Git-blob source associations, deterministic
IDL/template rendering, all seven direct archives, all 489 full-build crate
records and Cargo argument bindings, source scope, raw/stripped bytes, maps,
and local correspondence. It rejects symlinks, special files and unlisted files,
including nested manifests and Python cache files. It executes no compiler.

Both complete source/controller variants are retained. Each direct control
retains its two source files and complete after-run source snapshot; unchanged
files are supplied by the controller. The three parser controls also captured
all source hashes before compilation; the first four recorded only the changed
IDL hash before compilation. Full builds check all 66 files before and after.
All logs, compiler records, curve archives, linker invocations, retained temporary
inputs and link-input identities remain. Other dependency archives are rebuildable
from the controller's pinned inputs and are not duplicated here. Run either
`controller-*/build.py --help` for the native rebuild interface.

The first tool-written IDL included an extra final newline. The exact Git blob
was restored before any compilation; both forms remain under provenance and
exploration. All IDL-only negative results remain. `exploration/` also retains
the original probes and analysis scripts; their absolute workspace paths record
the experiment and are not the portable verification interface.

`context_helpers.py` is an exact copy of the merged PR #253 verifier at
`c07c578c0b4fc650e70f741c9dbc3d0e817ac3ad`; only its reading/comparison helpers
are used. The three helper modules retain their earlier implementations.
Anchor source and the rendered adaptations retain Apache-2.0 licensing; see
[source attribution](provenance/README.md) and the included license.

Next: test a fully version-consistent historical macro/IDL combination and then
compose justified context with provider sharing. This packet establishes a
reproducible mechanism for investigation, not the original source choice.
