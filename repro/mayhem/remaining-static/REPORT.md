# Mayhem remaining-handler static inventory

**Recover `burn_tokens` next, using static analysis first.** It is the smallest independently inspectable absent operation, has a distinctive token-burn CPI, and does not use the ordinary trader-signature parser shared by all six absent trading handlers. This recommendation does not establish runtime reachability or a fully recovered account schema.

The current source implements 17 of 25 router-matched instructions. Eight remain. This work only read the existing source, captured executable and disassembly; it performed no program execution, live writes, header patching or main-source edits. The stopped `initialize_mayhem_state` lane was not revisited: its preexisting router metadata is inventoried, but its body was not analyzed or tested.

## Remaining inventory

Offsets below are hexadecimal **ELF file offsets**, not transaction indices. Ends are inferred from internal call targets, so size is a triage measure rather than original debug-symbol proof.

| Instruction | Discriminator | Account parser | Handler start | Inferred handler bytes | Ordinary authorization / dependencies |
|---|---|---:|---:|---:|---|
| `burn_tokens` | `4c0f33fee5d77942` | `0x38670` | `0xd898` | 5752 | Existing Mayhem state, mint/vaults, Pump context accounts; no direct outer signer check found in its parser |
| `buy` | `66063d1201daebea` | `0x525f8` | `0x1bc08` | 13848 | Configured trader signer; GlobalParams and state; Pump trading accounts |
| `sell` | `33e685a4017f83ad` | `0x56f08` | `0x1f220` | 12992 | Same signer/configuration dependency; Pump trading accounts |
| `buy_v2` | `b817ee6167c5d33d` | `0x5c6d8` | `0x224e0` | 18648 | Same signer/configuration dependency; additional base/quote token accounts |
| `sell_v2` | `5df6823ce7e940b2` | `0x61b40` | `0x26db8` | 18096 | Same signer/configuration dependency; additional base/quote token accounts |
| `buy_pump_swap` | `de939d076c089151` | `0x46378` | `0x14e60` | 9736 | Same signer/configuration dependency; pool, token vault, fee and PumpSwap accounts |
| `sell_pump_swap` | `10c691f0ee6589cb` | `0x4cc98` | `0x17668` | 17312 | Same signer/configuration dependency; PumpSwap accounts |
| `initialize_mayhem_state` | `9dbd5e485545cc2d` | Not analyzed | Not analyzed | — | Stopped lane; excluded from next-step recommendation |

Trade argument types and complete CPI account order remain unresolved. Their wrappers inspect several input lengths and unpack fixed-width fields; this inventory does not infer an exact argument schema merely from the common wrapper shape. There is no official Mayhem IDL in the reviewed inputs.

## Ordinary-signature evidence

Each of the six trading account parsers calls `0xa030` for its first account. That helper consumes one AccountInfo and calls `0x976d8`, which reads byte offset `0x28` (`is_signer`) at `0x976e8` and constructs error **3010** at `0x976f8` when false. The account-name path identifies `trader`, e.g. `buy` at `0x555c8` with length 6. Each parser also constructs error **2001**, attached to `global_params`, consistent with a `has_one = trader` constraint. In `buy`, the four-word key comparison at `0x54550..0x54608` branches directly to that error path. The current recovered GlobalParams source has its trader public key at serialized offset 81.

The legitimate ordinary-signature dependency is therefore the configured trader's actual signature, plus valid existing configuration/state and the external trading accounts. Existing admin handlers can update trader configuration only under their own recovered admin signature/has-one checks. This inventory authorizes no configuration changes or transaction execution.

Burn's parser has five direct writable-flag loads (`0x29`) but no direct `is_signer` byte load, no direct call to either observed Signer helper, and no direct signer-error construction. Its first consumed account instead uses the state deserializer at `0xa138`. This is a **bounded static negative**, not proof of all transitive behavior or runtime acceptance. No trader/admin account field is identified in this burn parser. An ordinary transaction fee payer would still sign any future transaction; no foreign-program PDA signature is proposed.

Anchor source semantics were cross-checked against [Signer at v0.31.1](https://github.com/coral-xyz/anchor/blob/v0.31.1/lang/src/accounts/signer.rs) and [error definitions](https://github.com/coral-xyz/anchor/blob/v0.31.1/lang/src/error.rs). Local source hashes are recorded in `static-evidence.json`; these API references do not establish the captured binary's exact dependency graph.

## Burn evidence and implementation plan

The wrapper at `0x7ff08` calls account parsing, copies the parsed context, calls `0xd898`, then exits accounts. It contains no instruction-argument decoder, supporting a no-argument `burn_tokens` entrypoint.

Identified account fields are `mayhem_state`, `mint`, `mayhem_token_vault`, `sol_vault`, `bonding_curve`, `global`, `pump_program`, `pump_event_authority`, `system_program`, `token_program`, `event_authority`, and `program`. The first three consumption paths and several field-name/error blocks are clear; treat this list as a provisional schema until the complete consumption order is traced. Adjacent strings in concatenated rodata are not additional accounts. In particular, this inventory does not add `trader`, `global_params`, or `associated_token_program` solely because they appear nearby in rodata.

The parser contains mutable, seed, token-owner and address constraints. Evidence includes the `mayhem-state`, `sol-vault`, `bonding-curve` and event-authority seeds, and a Pump program address constraint. Pump context accounts are thus still required even if the handler's principal effect is token burning; do not claim independence from all Pump state.

1. **Recover the state serialization independently of initialization.** Trace `0xa138` and the exit serializer at `0x3afb8`. Existing `extend_account` recognizes the MayhemState discriminator `b1fdbf7dcb16866b` and target allocation 170, but that is not a recovered field schema. Map the handler's Rust-memory fields to exact serialized offsets; never treat memory offsets below as Borsh offsets.
2. **Recover guards and their ordering.** At `0xd8a8`, the handler loads a state value at context-memory offset `0x1a8`; it obtains Clock and requires the signed value to be <= current timestamp (`0xd8e0`). Failure constructs error 6005 at `0xda18`, with embedded `burn.rs:78`. Next it rejects state byte 2 (`0xda38..0xda40`) with error 6004 at `0xdb78`, `burn.rs:82`. Retain numeric errors until enum/message mapping is proven.
3. **Recover the exact burn CPI and state updates.** The amount comes from context-memory offset `0xe8` at `0xdbc0`; the helper at `0x90bc0` receives it at `0xe120`. Its instruction constructor at `0x93510` checks the two token program IDs and constructs token instruction tag 8 at `0x93640`, strongly identifying Burn. The caller's seed literal is exactly `sol-vault` at file offset `0xad4a9`, length 9, plus the recovered bump. This corresponds to the shape of [Anchor's token-2022 burn helper](https://github.com/coral-xyz/anchor/blob/v0.31.1/spl/src/token_2022.rs), which accepts the supplied token program and invokes it with signer seeds. After CPI success, the handler stores the amount at context-memory `0x1b8` (`0xe138`). Trace the authority/account mapping before implementing it.
4. **Recover both event paths before marking the handler complete.** The body constructs an 88-byte event payload, calls the log helper at `0xe468`, and constructs the Anchor event-CPI prefix at `0xe980` before invoking at `0xebe8`. The final success path writes state byte 2 at `0xed80`. Decode exact event discriminator, field order, timestamps and rollback/error ordering.
5. **Compile and compare statically in a separately authorized implementation phase.** Preserve source provenance and all original constraints. Future positive validation requires legitimate existing state and token/vault accounts, ordinary signatures where required, and the program's own valid CPI PDA authority. If those inputs are unavailable, retain a validation gap. Do not manufacture privileged state, alter signature validation, or resume the stopped initializer experiment to obtain a passing test.

The trading handlers should follow only after state serialization, common trader validation, quote/fee arithmetic and each external CPI schema are recovered. Their shared signature path is a useful source-comparison target, but the present inventory is insufficient to implement six trading paths faithfully.

## Reproducibility and limitations

`inventory.py` independently parses ELF `.rel.dyn` and dynamic symbols, excludes relocated R10 syscalls from internal-call inference, and extracts annotated function windows. It does not execute the executable. Internal call destinations are computed from instruction bytes. Some rendered branch labels in the supplied disassembly appear offset by `.text` base `0x120`; use the raw displacement plus the instruction address instead of trusting those labels.

`remaining-dispatch.json` contains all router-derived call locations; the `.asm` extracts preserve original instruction bytes; `static-evidence.json` records representative byte windows and hashes; `input-hashes.json` identifies reviewed files. Captured Mayhem executable SHA-256: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. Reviewed seventeen-handler source SHA-256: `728469bf4ccdb3c1292313954229427f0fe0de85ad28c378585dee977284f5e7`.

Reproduce with `python3 repro/mayhem/remaining-static/inventory.py` and `python3 repro/mayhem/remaining-static/summarize.py`. Source/interface hypotheses remain explicitly qualified; no new handler or differential coverage is claimed.

## Portable publication

This directory freezes the reviewed seventeen-handler source, status and dispatch inputs under `inputs/`. It bundles only the disassembly windows used by this inventory, compressed with a deterministic gzip timestamp. The inventory verifies every disassembled instruction byte against `evidence/original/mayhem/deployed.so` before generating extracts. The four versioned framework-source files used for API/error interpretation are bundled and hash-checked; a Cargo cache and LLVM installation are unnecessary for these static reproduction commands. `publication-provenance.json` retains the original input hashes and disassembly-tool metadata. No initializer body is included in the excerpts.

Run the two commands above from any working directory using the scripts’ absolute paths, then run `python3 repro/mayhem/remaining-static/verify_publication.py` from the repository root. `artifact-hashes.json` covers every published file except itself. The source snapshot is historical evidence and is not a new implementation crate.
