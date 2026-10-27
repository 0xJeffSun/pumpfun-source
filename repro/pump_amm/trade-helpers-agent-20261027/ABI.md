# Shared trade helper ABI recovery

Target: captured PumpSwap AMM SHA-256 `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.
Base: frozen `diagnostic-parity-20261027/results/source`; maintained source is not edited here.

## Pool-v2 validation

The complete original window `0x4ea90..0x4efb8` (1,320 bytes) takes an error/result output pointer in `r1`, remaining-account pointer/length in `r2/r3`, a mint-key pointer in `r4`, and index in `r5`. The first branch compares index with the slice length. It derives `[b"pool-v2", base_mint]`, compares the account key at that index, and produces error 6062 for either missing or mismatched input. The two error branches retain source metadata for the original sell module.

The isolated `pool-v2.patch` therefore extracts `validate_pool_v2(&[AccountInfo], &Pubkey, usize) -> Result<()>` in `legacy_sell` and uses it from both legacy trade handlers. Its build/result is tracked separately; the source signature itself is an inference from concrete parameter use.

## Buy cashback handling

Original window `0x351a8..0x37150` (8,104 bytes); direct call sites `0x38c00` and `0x3c4e0` belong to ordinary and exact-quote buy. It returns `Result<()>` through `r1`, receives the remaining-account slice in `r2/r3`, and the payer account in `r4`. `r5` is the caller's stack-argument frame.

| Stack argument | Caller producer | Inferred role |
| --- | --- | --- |
| 0 | account-struct pointer field `+0x1a8` | mutable user-volume accumulator |
| 8 | field `+0x150` | user quote interface account |
| 16 | quote mint byte `+0x30` | quote decimals |
| 24 | quote mint account-info field `+0x58` | quote mint account info |
| 32 | account-struct field `+0x178` | quote token program |
| 40 | account-struct field `+0x180` | system program |
| 48 | account-struct field `+0x188` | associated-token program |
| 56 | handler's creator-fee value | amount |
| 64 | local copy of base-mint key | base mint for the next pool-v2 check |

The caller uses direct pointer values; exact original Rust wrapper/reference spelling is not established. The isolated `distribute_cashback` candidate uses the corresponding concrete account types and references without layout directives.

Observed order: remaining[0] existence; derived ATA equality; writability; conditional ATA creation; self-transfer ownership check; checked token transfer; checked increment with eagerly constructed Overflow error; accumulator exit/serialization; pool-v2 validation at index 1. The self-transfer checker at `0x6f608` takes source key, source owner, destination key, authority key, and a result pointer; its two equality checks correspond to `source != destination || source_owner == authority`.

The candidate consumes the cashback ATA and pool-v2 entry inside this helper, so its caller advances to remaining index 2. Ordinary creator-fee payout validates index 0 and advances to index 1. No new public handler or account layout is introduced.

## Build boundaries

The first private-cache attempt changed the Cargo registry path and caused dependency recompilation; it was deliberately stopped when the parent offered a warm pool-v2 build. Its failed/terminated record is retained under `work/amm-trade-helpers-agent-20261027/pool-v2-build-v2`. The later cashback attempt used a private target cache and the existing registry, but relocating the target cache also invalidated dependency fingerprints. It was deliberately stopped before a root artifact was accepted; the parent is compiling the frozen patches in sequence with the established warm cache. Both attempts retain their actual stopped build records. A local Podman-loopback sandbox escalation was approved for these offline builds; no container network was enabled.

This is source/ABI evidence and an isolated reconstruction experiment, not whole-ELF identity or runtime acceptance.

The self-transfer checker carries the concrete source string `programs/pump-amm/src/utils/token.rs` at original file offset `0x11d020`. Its 656-byte body has six direct calls, including the two memcmp calls that implement the two Pubkey equalities. The isolated variant currently keeps this helper in legacy_buy for a bounded experiment; original Rust by-value versus borrowed parameter spelling and source coordinates remain unproven.
