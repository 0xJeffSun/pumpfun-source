# Pump TradeEvent final u64: legacy dataflow

The ordinary legacy `buy`, `buy_exact_sol_in`, and `sell` bodies construct the final field with an **immediate zero**. This establishes a bounded upstream write, rather than merely observing zero-valued receipts. It does **not** establish its historical name, business meaning, or value in other producers. No source change or recovery proposal is justified: the current legacy source already uses `unparsed_trailing_field: 0`.

## Identity and baseline

- Captured original ELF SHA-256: `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
- Current Pump ELF SHA-256: `92575cd082bf76b332044a7d09371a9764db8b2cc40180bf1418f261945bbd6a`.
- The supplied published checkpoint is `8099031`; this work binds exact files, not mutable HEAD.
- Historical inventory baseline is Pump `6271a6d5782d350f6d716a91712d283592d4589aa8e9befb9c1f1a0dd3ac7ebe`, not current Pump. Its serializer address `0xea260` is stale for the current candidate.
- Reverified current serializer: original `[0x1624b0,0x1639e8)` versus candidate `[0xea1d8,0xeb710)`, 5,432 bytes. Complete normalized equality masks actual relocations and internal call operands; no executable is modified. This verifier does not independently re-prove the old inventory's direct-target-pair closure. Whole ELF equality remains false.

## Exact dataflow

All ranges are half-open virtual addresses; for these retained ELFs the inspected text addresses are also file offsets. Raw instruction bytes and disassembly slices are preserved in `evidence/`, with range hashes in `ranges.json` and full input hashes in `inputs.json`.

Serializer entry `0x1624b0` preserves event pointer `r2` in `r7`. At `0x1638d8`, it loads `u64 [r7+0x198]` into `r6`. At `0x163920` it stores that value at the output cursor, then advances length by eight at `0x163928`. It returns the buffer at `0x163938..0x163960`; this is the final appended field. The possible reserve call between load and store preserves callee-saved `r6` under the SBF ABI. Offset `0x198` is the in-memory Rust event layout, **not** a fixed serialized-wire offset (the event has variable-length fields).

| Legacy path | Wrapper call to body | Body range | Zero write | Event base | Field stack slot | Serializer calls |
| --- | --- | --- | --- | --- | --- | --- |
| buy | `0x12a888 → 0x14c038` | `[0x14c038,0x14eab8)` | `0x14de28` | `r10-0x420` | `r10-0x288` | `0x14de70`, `0x14df18` |
| buy_exact_sol_in | `0x12af70 → 0x14f4e0` | `[0x14f4e0,0x152888)` | `0x151d50` | `r10-0x420` | `r10-0x288` | `0x151d98`, `0x151e48` |
| sell | `0x12b4c0 → 0x152888` | `[0x152888,0x1549b0)` | `0x1544d0` | `r10-0x308` | `r10-0x170` | `0x154518`, `0x1545c0` |

Each write is `stdw [r10 + slot], 0`, and `slot = event_base + 0x198`. Event pointer setup is verified directly before each first call; second calls reuse the same callee-saved event pointer. The portable verifier checks that no intraprocedural CFG path from each body entry to its first serializer call avoids the zero store. Calls are opaque returning nodes for this check; this is not a transitive alias-effect proof. The immediate construction intervals have no intervening call before first serialization.

Dispatch attribution is independently retained in `evidence/dispatch-map.json`: `buy` dispatch calls wrapper `0x12a4e0` at `0x11cb58`; `buy_exact_sol_in` calls `0x12abc8` at `0x11cbc8`; `sell` calls `0x12b2b0` at `0x11cc38`. These wrappers then make the body calls shown above. Body boundaries remain inferred windows, not recovered historical source-function identities.

Source correspondence: `evidence/trade_types.rs:56–95` declares the event and final `unparsed_trailing_field: u64`; `evidence/legacy_buy.rs:66` and `evidence/legacy_sell.rs:67` initialize it to zero. Names in reconstructed source are not evidence of historical names.

## What remains unresolved

1. A historical schema or source definition naming this last u64 is absent from the supplied attribution evidence. The retained inventory explicitly says its captured IDL does not name it.
2. These three producers provide a constant, not an account load or computed value. There is no additional upstream account/fee/reserve dependency to trace for this immediate write. Zero alone cannot distinguish a reserved field from an inactive feature amount or another meaning.
3. Determining general semantics requires independent naming evidence or supported nonconstant provenance in another authorized producer. This assignment does not infer such provenance or recommend reopening excluded lanes.
4. Source identity, full transitive helper/data equality, exhaustive semantics and whole-byte reconstruction remain incomplete. No historical name, universal-zero invariant, or exhaustive security conclusion is asserted.

## Reproduction and scope

Run `python3 verify.py` from any location with this package intact. It uses only Python's standard library, validates input hashes, checks every retained assembly instruction against raw ELF bytes, checks exact stores/pointer arithmetic/calls, checks first-call dominance, and rechecks the complete current serializer match. `verification.json` preserves the passing output. `result.json` is the parent handoff.

No build, runtime probe, network request, chain call, signature alteration, binary patch, further worker, commit or publication was performed. No main-repository file was changed. Existing files were copied without modifying raw evidence. A preparation script was briefly staged in `/private/tmp` and moved into this assigned directory; all retained outputs are here. No excluded handler body was analyzed; whole raw ELFs and the preexisting dispatch metadata are preserved solely as evidence inputs.
