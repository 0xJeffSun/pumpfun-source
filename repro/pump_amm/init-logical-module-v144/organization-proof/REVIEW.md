# Initializer source ownership and build-path feasibility

The original evidence supports a real initializer-specific source file as an organizational target. It does **not** recover the full file contents, module declarations, historical workspace root or a recipe that would emit its exact diagnostic filename. No source relocation, padding, remap, compiler invocation or main change was performed.

## What is proved

The accepted original initializer parser cfa98 calls helper d1290 at d08a0. The current matching parser calls the corresponding `InitUserVolumeAccumulator` Accounts closure. Their complete7824-byte helper windows differ in only two normalized instructions: offset2768 stores source line8 instead of449; offset2776 stores filename length83 instead of10. These are not a column number or runtime account value.

At original d1d38 the relocated string is exactly `programs/pump-amm/src/instructions/token_incentives/init_user_volume_accumulator.rs` (83 bytes). The current dbd20 string is exactly `src/lib.rs` (10 bytes). Both are followed by error4101, Source-origin metadata and the same compared-key/error construction. `helper-proof.json` binds whole windows, all immediate calls and relocations, the parser call and the decoded string/line values. It does not claim recursive target/data identity.

The pinned Anchor sources explain the ownership: `anchor-syn-0.31.2/src/codegen/accounts/constraints.rs:1646` emits `require_keys_neq!(payer.key(), field.key(), TryingToInitPayerAsProgramAccount)` while generating account creation. `anchor-attribute-error-0.31.2/src/lib.rs:99–100` emits Source `{ filename:file!(), line:line!() }`. Current diagnostic449 equals the `#[derive(Accounts)]` location, not the init attribute at455 or the handler. The near-complete body identity plus actual parser call therefore associates the original literal with the initializer Accounts-derived helper. It is not an unrelated string coincidence. The original error enum identity is also independently bound to4101 in the pinned anchor-lang source.

A normal source arrangement placing the initializer context in the indicated `instructions/token_incentives/init_user_volume_accumulator.rs` file is thus evidence-supported. Such an organizational restoration is not inherently prohibited or mere padding. However, exact original Rust module identity (`mod`, `#[path]`, `include!`, re-export strategy), contents before the derive and whether the handler shared that file are not established by this single origin. Original line8 is evidence about the originating span, not authorization to invent seven lines or move surrounding declarations solely to force it.

## What the accepted build establishes

The current AMM manifest declares its own empty `[workspace]`. The repository root workspace contains only pump-fees. The accepted build helper resolves workspace through `cargo locate-project --workspace`, then invokes `cargo build-sbf --manifest-path <repo>/programs/pump-amm/Cargo.toml` from repository root with the pinned SDK. That recipe produced `src/lib.rs` for the current derive even though the launcher was at root. Merely launching from root is therefore not sufficient proof of the original full prefix.

Neither the retained original binary nor these current build records establish the original root Cargo.toml, workspace membership, package lib path, compiler working directory, possible source inclusion strategy or path remapping. The recorded filename is the compiler's diagnostic source name, not proof of an absolute on-disk root. The full original relative prefix is compatible with a different workspace/source-root arrangement, but does not uniquely identify it. No layout/compiler experiment was used to choose among them.

## Decision

Keep the authentic logical-file ownership as a supported future source-organization hypothesis. Do not promise that moving only the context under the current isolated crate will reproduce83 bytes or line8. A complete historical module/workspace reconstruction requires independent source/build provenance; arbitrary remap flags, leading-line insertion or guessed root membership would not satisfy that requirement. The present evidence closes why these two instructions differ but leaves actual root-workspace provenance and exact module contents unresolved. There is no actionable source patch in this packet.

Run `python3 -B verify.py --repo .` for immutable input hashes, exact complete helper difference positions, pointer/string/line decoding and parser-call ownership. No build or target execution occurs.
