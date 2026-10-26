# Everything remaining for full byte-identicality — the actionable input list

_2026-10-25. The byte-identical target is met for 2/6 artifacts and blocked on exactly one class
of missing input for the other four: authentic build provenance (source tree + `Cargo.lock` +
toolchain). This is the shopping list. The method is proven — SPL Token and Token-2022 reach
`full_byte_equality: true` from public source in their verifiable-build images — so each row below
closes to byte-zero once its input is supplied; nothing here needs more decompilation or compute._

| Artifact | Byte status | Exact missing input | Where to get it |
|---|---|---|---|
| SPL Token | ✅ 0 B | — | done |
| Token-2022 | ✅ 0 B | — | done |
| **pump** | ✗ lost-source | the original Rust source tree **+ `Cargo.lock`** for the deployed program | pump.fun source control / the CI job that built+deployed pump (toolchain is known: platform-tools **v1.44**, e_machine 263) |
| **pump_amm** | ✗ lost-source | original source + `Cargo.lock` | pump.fun records (toolchain **v1.44**) |
| **pump_fees** | ✗ lost-source | original source + `Cargo.lock` | pump.fun records (toolchain **v1.44**) — note: all 31 handlers are already reconstructed, so *only* the literal source structure + lockfile are missing |
| **mayhem** | ✗ lost-source | original source + `Cargo.lock` (pins `hashbrown 0.15.4`, not the 0.17.x the public graph resolves) | pump.fun records (toolchain **v1.52**) |
| **ATA** | ✗ 1,506 B | the exact **`Cargo.lock`** the deployed ATA **v1.1.1** was built with (its pinned `spl-token-2022`) — the canonical v1.1.1 lockfile does not reproduce it | Solana Labs release/deploy records, or pump.fun's captured dependency lockfile |
| **Metaplex** | ✗ 1,509 B | the exact **`Cargo.lock` / commit** the deployed `metaqbxx…` was built with (pinned `spl-token-2022`/`mpl-utils`/`auth-rules`); v1.15.0 is size-close but off by a dependency/inter-release delta | Metaplex deploy records |
| **donation_relay** | ✗ lost-source | original Rust source + `Cargo.lock` + toolchain (emits e_machine 263) | pump.fun records — no public source exists; ~56% of `.text` behaviorally reconstructed |

## Why decompilation cannot substitute for the lost source (core 4 + donation_relay)
The deployed `.so` is a pure function of the exact source *structure* (item/declaration order,
inlining, generic-instantiation order, macro expansion) × the exact lockfile × the toolchain. A
stripped SBF binary does not carry that structure — only the resulting machine code — so no
decompiler (Ghidra/radare included; llvm-objdump is the authoritative SBF tool and was used
throughout) can reconstruct a source text that recompiles to the identical bytes. Proof: pump_fees
has every handler and the correct v1.44 compiler and is still not byte-equal. This is an
information limit of what was lost, not a tooling or effort gap.

## What is already done (does not need the inputs above)
Behavioral/ABI reconstruction is complete and oracle-validated on `main`: pump dispatches **56/56**
IDL instructions; all SDK-exercised paths match the captured originals byte-for-byte in
state/logs/events/errors; the recovered handlers (incentives, create_v2 Mayhem + mayhem
initialize_mayhem_state, v3 Token-2022 transfer-fee, set_mayhem_virtual_params) each pass their
differential (set_mayhem 84/0, v3 126/0, mayhem-create 17/0, claim 60/0, admin 98/44==44). This is
exactly what local SDK integration testing requires.

## Hand-off
Supply any row's input and I build it in the established recipe and iterate to `full_byte_equality`,
the same way SPL Token/Token-2022 already verify. Until then, byte-identicality is 2/6 by the limit
above — not by unfinished work.
