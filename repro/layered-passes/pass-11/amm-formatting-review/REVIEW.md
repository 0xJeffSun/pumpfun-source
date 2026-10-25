# AMM next source pass: formatting-error attribution

**No natural application-source patch is justified by this hypothesis.** The examined near-shape residual is not evidence that the reconstructed AMM serializers should emit a different `core::fmt::Error`. A newly bounded literal and its actual vtable/caller link show a distinct original zero-sized error formatter used in the base58-formatting path.

The pass uses only the admitted complete `accumulator-order-v144` ledgers and their exact original/current binaries. No main edit, build, runtime, compiler/version search, diagnostic-coordinate change or additional original decoding scope was introduced.

## Concrete new evidence

The original48-byte window `[0x10de40,0x10de70)` has no direct caller. It loads data pointer `0x120c0b`, passes length14, and calls the48-byte Formatter `write_str` body at `0x1154f0`. The consumed bytes are exactly **`BufferTooSmall`**. This closes that specific literal extent; it does not close arbitrary adjacent data or infer an enum's Rust type name.

Its formatter address is carried by the relocated vtable entry at `0x123bf8`. The surrounding observed layout is drop pointer at `0x123be0`, size0 at `0x123be8`, alignment1 at `0x123bf0`, and formatter pointer at `0x123bf8`. This is compatible with a zero-sized error value. The admitted full caller `[0x10e380,0x10e970)` loads this vtable at `0x10e678` and the Result-unwrapping literal at `0x10e660`; the actual call is `0x10e698`. Its whole window and all existing call/data obligations are retained.

The40-byte wrapper `[0x10e970,0x10e998)` calls that original function at `0x10e988`. Its instructions correspond to the current40-byte symbol-named `Pubkey` Debug/Display wrapper at `[0xffa98,0xffac0)`, apart from the direct-call target. The current target is `solana_pubkey::write_as_base58`, `[0xfe510,0xffa98)`,5512 bytes. This wrapper/caller evidence supports a base58-formatting attribution; it does not establish full renderer equivalence or a particular historical crate/version.

The candidate near-shape48-byte `core::fmt::Error` Debug body at `[0x1032b8,0x1032e8)` instead passes length5 and the exact literal **`Error`** to its Formatter `write_str`. Original and candidate Formatter `write_str` bodies are the same complete48-byte instruction sequence; their indirect writer targets remain runtime-dependent. The similarity in those tiny Debug bodies is a common formatting template, not evidence that their error values have the same role.

## Why no source correction follows

The active application serializers already have complete matched exit/serialization evidence from prior work. This result does not identify an incorrect application error conversion, reversed scalar compared values, missing fee guard, or a source-level owned-error move/drop bug. Adding `BufferTooSmall` to `PumpAmmError`, replacing a Borsh error mapping, changing scalar `with_values`, or rewriting every Pubkey formatter would be unsupported.

The original renderer is1520 bytes while the current renderer is5512. That is a concrete unresolved dependency/source-algorithm gap. It is not permission to select compiler variants, reproduce layout, fabricate unreachable errors, or claim missing behavior from sizes. Establishing a replacement would require a complete renderer algorithm and error/ownership proof, including the writer's indirect behavior; this pass does not provide it.

This pass leaves310 unmatched original windows, scalar specialization, all broader serialization/data obligations and whole-original identity unchanged. The only newly closed item is the14-byte literal consumed by this original formatter and its traced existing caller relationship.

## Verification

Run `python3 -B work/amm-next-source-pass/verify.py` from the repository root. It checks input hashes, every selected full-window raw hash, literal lengths/bytes, vtable metadata, actual call operands, wrapper correspondence and the complete writer body. `selected-ledger.json` preserves all existing branch/call/data records and `bounded-data.json` records only the justified bounded fields. Nothing executes a target program.
