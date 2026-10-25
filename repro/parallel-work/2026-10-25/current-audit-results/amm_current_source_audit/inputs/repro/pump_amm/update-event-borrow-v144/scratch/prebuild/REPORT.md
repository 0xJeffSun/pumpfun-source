# AMM shared-method residuals

The only justified source proposal in this package is to replace **`emit!(event.clone())` with `emit!(event)` in `update_fee_config`**. The current executable constructs two identical event values, while the original serializes one value twice. This extra construction accounts exactly for the 248-byte increase in the event-construction partition. The locked event macros borrow their expressions, so the clone is unnecessary for ownership.

The scalar 608-versus-616-byte residual is explained at the argument/return instruction level, but its underlying original source/compiler cause remains unproved. No scalar source, cast, artificial callsite, inline directive, diagnostic padding, compiler version or flag variant is proposed. This is a **read-only static analysis and one-line source proposal**; no build, runtime probe, main edit or initializer fixture was performed.

## Frozen inputs and independent check

All primary artifacts are copied and hash-checked against the accepted main package `repro/pump_amm/create-config-shared-methods-v144`, seal `af3d4992a4a9f4b01375d1fec610fb902bab321b5dce418f315e6a8bd6716dd8`. Candidate SHA-256 is `807010828fe3b4124b5e20c34ca627582e1718e9c5849bf0c15309983d4088b2`; captured original is `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`. Its 22 main source inputs, original/current ELFs, symbols, complete prior static windows and build provenance are retained. The original bytes are only evidence, never compiler inputs.

A separate child completed the event-copy analysis independently. Its 12-file payload and seal `0dc9c7e6b8ee1f6c1deb2bed86d316a9a298d5962fa66d55348f51f134ce7f1b` are immutable under `independent-event-review/`. It contains exact operand/field provenance, semantic call pairing and complete construction windows. Its portable verifier passed. The parent analysis independently covers the scalar/helper/caller residuals, with complete windows in `residual-ledger.json`.

The public `anchor-lang 0.31.1` error implementation is extracted byte-for-byte from the retained `.crate` archive; its archive hash agrees with the unchanged lockfile. `dependency-derivation.json` binds that extraction. The exact pinned event macro source is also retained from the accepted package.

## The three scalar methods

| Field | Original | Current | Result |
|---|---:|---:|---|
| LP fee | `0x61630`, 616 bytes | `0xf758`, 608 bytes | Same unsigned guard/store contract; error ABI specialized |
| Protocol fee | `0x61898`, 616 bytes | `0xf9b8`, 608 bytes | Same |
| Creator fee | `0x61b00`, 616 bytes | `0xfc18`, 608 bytes | Same |

Entry arguments are `r1 = Result output pointer`, `r2 = mutable GlobalConfig`, `r3 = supplied u64 fee`. Each copies fee into `r7`, branches on unsigned fee > 1000, and otherwise stores the fee to its own field (`+0x380`, `+0x388`, `+0x390`). The successful result tag is 2; the second result word is irrelevant on that success path. On failure, each constructs error 6000 with diagnostic source origin, adds compared values, and writes the same two-word Result representation. Both real callers inspect the success tag before proceeding.

Before relative offset +552, the only normalized instruction differences are:

- +40: success branch skips one fewer instruction in the current body.
- +456: truthful source line changes, original 220/230/243 versus current 7/13/19.
- +464: source filename length changes, original 44 versus current 26.

The argument block then explains the complete eight-byte reduction:

| Original scalar +552..576 | Current scalar +552..568 |
|---|---|
| `r4 = 1000` | `r4 = fee` |
| `r5 = fee` | call actual specialized helper `0x340` |
| call generic helper `0x1840` | — |

Original +576..616 and current +568..608 have identical normalized return-suffix instructions. The analyzer checks the entire prefix, argument block and shifted suffix rather than counting an arbitrary instruction window. The current path still preserves the original comparison order `(1000, fee)`; the accepted frozen corpus's 191 saved scalar cases independently corroborates those finite outputs, but no runtime is repeated here.

## Actual with_values helper, data and caller graph

The original called helper is `0x1840`, 1,336 bytes. The current scalar methods actually call `0x340`, also 1,336 bytes. Exactly four normalized instructions differ, at offsets **24, 32, 40, 48**:

- Original stores `r5 = fee` to stack `-288` and `r4 = 1000` to `-296`.
- Current stores `r4 = fee` to `-288`, moves the same stack pointer and stores immediate 1000 to `-296`.

The first 24 bytes and the complete tail from +56 through the return are normalized-identical, with the same relocation pattern. All **eight immediate direct targets** match completely. This is a real constant-specialized calling convention: the constant moves from the caller's register setup into the callee's stack setup. It is not a missing scalar validation or reversed compared-value diagnostic. The full original/current bodies, arguments, return sequences and targets are retained rather than replacing this target with a different helper.

The helper has five relocated data references. Its explicitly length-bounded 55-byte Display panic message matches; the other four formatting/vtable/panic metadata extents are retained as unresolved, with exact reference sites and pointers. Normalized tail identity alone does not prove recursive compiler data identity.

The complete direct incoming graph for these specific targets is:

| Target | Direct calls | Distinct containing bodies |
|---|---:|---:|
| Original `0x1840` | 24 | 16 |
| Current actual scalar helper `0x340` | 3 | 3 |
| Current other generic matching helper `0x1308` | 6 | 6 |

`0x1308` is a complete normalized match to original `0x1840`, but **none of the three scalar methods calls it**. It is used by other account/IDL routines. Calling it “unused” would be inaccurate globally; it is merely not the scalar target. It cannot substitute for the actual `0x340` comparison.

Each scalar itself has exactly two real direct callers in both programs: create_config and update_fee_config. Each handler has one identified wrapper caller. All callsites, before/after argument/result instructions, complete containing caller windows and recognized relocated-address references are retained. No recognized relocated function-address reference adds a caller here. This direct graph does not prove dynamically computed indirect calls are impossible.

The original helper's additional caller contexts do differ from the reconstructed graph. However, lowered 64-bit operations cannot uniquely reveal the original generic source types (`u64`, `usize`, references, etc.) or the compiler phase that produced specialization and/or merged equal bodies. The locked `with_values` source generically accepts two `ToString` values and records both; `require_gte!` passes its two expressions in order. These facts support the instruction-level explanation, **not a unique source correction for scalar codegen**. Adding fake callers or coercions to change optimizer decisions would not be source recovery.

## The fee-update event copy

The original handler is `0x1d8a0..0x1e400`, 2,912 bytes. Current is `0xc8340..0xc8f98`, 3,160 bytes. The original passes the same in-memory event at `r10−584` to both serializers (`0x1dc58`, `0x1ddc0`). The current first serializes a temporary at `r10−504` (`0xc87f0`), then the retained event at `r10−856` (`0xc8958`). Their event serializer bodies are complete 744-byte normalized matches.

The event's 352-byte in-memory representation consists of 256 recipient bytes plus 96 bytes for admin, creator authority, timestamp and three fee values. The current temporary duplicates every field from the same input provenance: an extra 256-byte memcpy at `0xc8758` plus twelve eight-byte stores. The original has one event recipients copy; the current has two. Removing only that extra memcpy aligns the semantic sequence of the remaining sixteen direct calls. Twelve paired targets match; the three scalar targets and recipient setter retain their already documented differences.

| Complete handler partition | Original bytes | Current bytes | Difference |
|---|---:|---:|---:|
| Prefix before event construction | 680 | 680 | 0 |
| Event construction through first serialization | 280 | 528 | **248** |
| Remaining log/CPI/error tail | 1952 | 1952 | 0 |

Equal instruction counts outside the construction region do not imply identical instructions: frame offsets, registers and branch displacements differ and are preserved in the complete windows. The 248-byte arithmetic localizes the observed extra construction; it does not guarantee that a subsequent build will shrink by exactly that amount or match the original.

The current source explicitly uses `emit!(event.clone()); emit_cpi!(event);`. Pinned `emit!` expands its input inside `Event::data(&expression)`, and `emit_cpi!` likewise borrows its event. Thus the clone is unnecessary to keep the event available for the second serialization. The original's single-buffer operation supports removing this redundant source operation. Exact original token spelling is still non-unique; a different compiler could also have eliminated a clone.

## Minimal proposal and validation boundary

`remove-update-event-clone.patch` changes **one line only**, inside update_fee_config. `proposal/programs/pump-amm/src/lib.rs` is the concrete proposed file; the 22-file proposed source hash map changes only that file. Nothing is applied to main or to any old sealed package.

This proposal addresses the duplicate event operation only. Scalar specialization, diagnostic path coordinates, compiler metadata and full ELF identity remain unresolved. No source-only claim predicts future machine code. A separately authorized fixed-recipe build would be required before any new executable/static comparison, and any changed executable would need the existing authorized corpus before promotion. No new case or initializer-success fixture is proposed.

Creation remains static-only, counts remain 37 bounded handlers and 17,462 existing comparisons, whole ELF equality remains false, and all stopped lanes remain excluded. Run `python3 -B work/amm-shared-method-residuals/verify.py`; optional `--current-source /path/to/repo` verifies the accepted 22 current inputs. The portable verifier verifies both seals, source/dependency bindings, the exact one-line patch, complete static windows and independent event evidence without building or executing a program.
