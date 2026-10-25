# donation_relay reconstruction

Reconstruction of the `donation_relay` program
(`RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu`), referenced by the `pump_fees`
IDL. No recovered source existed for it before; this directory holds a buildable
Rust candidate recovered from the captured binary, a full instruction-dispatch
map, recovered handler logic, and a validated original-vs-candidate differential.

Oracle / comparison input (never a build input):
`evidence/dependencies/donation_relay/deployed.so`
(830,448 bytes, sha256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`).

This builds on the prior analysis under
`repro/donation-relay/` (latest checkpoint `source-build-11-idl-discriminator`);
the source here is that checkpoint's frozen source, re-verified by a fresh build.

## (a) Compiler determination

| Fact | Value |
|------|-------|
| ELF class / endianness | 64-bit, little-endian |
| `e_type` | 3 (ET_DYN) |
| **`e_machine`** | **263 (EM_SBF, "SBF new")** |
| Loader / owner | `BPFLoaderUpgradeab1e11111111111111111111111` |

`e_machine == 263` rules out platform-tools v1.43 (which emits `e_machine == 247`)
and fixes the compiler at **platform-tools v1.44+** (rustc/LLVM SBF "new"
encoding). The candidate is built with `cargo build-sbf --tools-version v1.44`
against `solana-program =2.2.1` / `spl-token-2022 =6.0.0`. A fresh build on this
machine reproduces the frozen checkpoint exactly:

- unstripped `…/release/donation_relay_source_proposal.so`:
  651,808 bytes, sha256 `ab5c3460e6d79a897e13343ca0683841035c7d60efe5085b8e808ab0b48507c7`
- stripped deploy artifact (`target/deploy/…`):
  471,192 bytes, sha256 `34c54b8e1e625a46fd446bb8e6fa7c7f17afcb1fd7d2ef3719a16f630c98ce91`
- built candidate `e_machine == 263` — matches the original (required for a valid rebuild).

Build command:
```
cd programs/donation-relay
PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH" \
  cargo-build-sbf --tools-version v1.44
```

## (b) Instruction dispatch map + interface

The entrypoint (`src/dispatch.rs`) checks declared program id (`4100` on
mismatch), requires `data.len() >= 8` (`101`), reads an 8-byte Anchor-style
selector, then routes. All 11 business discriminators match the captured IDL
(`donation_relay` v0.6.0) byte-for-byte, plus two reserved selectors:

| Selector (8 bytes) | Instruction | Handler |
|--------------------|-------------|---------|
| `136,8,102,156,214,4,17,171` | `donate_v1` | `handlers::donate_v1` |
| `187,141,207,216,60,246,196,155` | `donate_pubkey_config_id_v1` | `handlers::donate_pubkey_config_id_v1` |
| `120,217,57,241,135,104,139,184` | `donate_pubkey_config_id_with_payer_v1` | `handlers::donate_pubkey_config_id_with_payer_v1` |
| `121,160,15,44,219,43,134,7` | `donate_native_v1` | `handlers::donate_native_v1` |
| `192,254,132,16,208,43,154,82` | `donate_native_pubkey_config_id_v1` | `handlers::donate_native_pubkey_config_id_v1` |
| `171,28,54,214,140,137,101,90` | `close_donation_epoch_v1` | `handlers::close_donation_epoch_v1` |
| `209,133,253,12,80,9,231,128` | `upsert_mint_whitelist_v1` | `handlers::upsert_mint_whitelist_v1` |
| `204,159,132,117,132,86,223,73` | `just_swap_v1` | `handlers::just_swap_v1` |
| `218,85,237,178,24,174,102,41` | `swap_then_distribute_v1` | `handlers::swap_then_distribute_v1` |
| `210,176,49,190,147,105,115,119` | `distribute_after_just_swapping_v1` | `handlers::distribute_after_just_swapping_v1` |
| `152,149,100,48,118,236,9,243` | `distribute_non_swap_output_mint_v1` | `handlers::distribute_non_swap_output_mint_v1` |
| `64,244,188,120,167,233,105,10` | reserved **IDL** selector (Anchor `idl_*`: create/create_buffer/write/set_buffer/set_authority/close/resize) | `idl::dispatch170` |
| `228,69,165,46,81,203,154,29` | reserved **event-CPI** selector (self-CPI `__event_authority` recursion) | `dispatch::event_recursion` |

Unknown selector → `101` (fallback not supported).

Argument codec (`src/codec.rs`): little-endian; donations decode
`amount:u64, config_id:[u8;32], tip_bps:u16, message:len-prefixed utf8,
credited_to:[u8;32]`; shares decode `kind:u8{0..2}, authority:[u8;32], bps:u16`.
Account/context ordering and constraint checks are in `src/admission.rs`;
state-account wire layouts (`EpochTrackerV1`, `DebouncerV1`, `DistributionV1`,
`SwapReceiptV1`, `MintWhitelistV1`) and the four events are in `src/codec.rs` /
`src/model.rs`. Error numbers are the Anchor framework (2000–4102) plus the
program catalog `6000..6033` in `src/error_catalog.rs`.

## (c) Recovered handler logic

Recovered as buildable Rust (candidate **builds clean**, 3 warnings):

- **Donations** (`donation_shared` / `donation_body`): message `<256` (6009),
  `tip_bps<=10000` (6018), mint owner ∈ {Token, Token2022} (6029), whitelist /
  `safe_mint` gate (6031), lazy-init of tracker+debouncer, config/mint/state
  checks (6002/6006/6007), `transfer_checked` with measured before/after delta,
  tip = `delta*tip_bps/10000`, debouncer accumulation; native variants wrap/sync
  then close a temp WSOL account. Emits `DonationMadeV1Event` + return data.
- **close_donation_epoch_v1**: relayer auth (6015), non-zero gross (6012),
  epoch match (6011), creates `DistributionV1`, `transfer_checked` under
  debouncer PDA seeds, resets debouncer, increments epoch. Emits closed event.
- **upsert_mint_whitelist_v1**: relayer auth, `len<=32` (6032), replaces list.
- **just_swap / swap_then_distribute / distribute_after / distribute_non_swap**:
  relayer auth, epoch-closed (6028), state/mint checks, fair-share weights, a
  Jupiter-style `invoke_signed` with measured input-spent (6021) / output
  (6023) deltas, per-recipient `transfer_checked`, burn+close of the settlement
  vault, and `Processed`/`Swapped` events.

Event path (`emit_and_return`): serializes three times — `sol_log_data`, then a
self-CPI under `__event_authority`, then bare `set_return_data` — matching the
original's observed ordering.

## (d) Differential oracle (real, original vs candidate)

`scripts/donation_relay_differential.py` loads the original and the candidate
into two independent LiteSVM instances, seeds identical locally-owned fixtures,
submits the **same** signed transaction to both, and byte-compares error / logs
/ inner instructions / return data / before+after state, plus an independent
visible-effect check. No synthetic signer, no oracle fake, no replayed history.

| Group | Cases | Fully matched | Mismatches |
|-------|------:|--------------:|------------|
| `ordinary` (5 donations + 7 IDL ops) | 12 | **12** | none |
| `business_rejection` (6009 / 6018 / token-1) | 3 | 1 | 2 (logs only) |

The 2 `business_rejection` mismatches are **logs-only**: error code, number,
message and the `0x1782`/`0x1789` return all match; the original logs
`AnchorError thrown in programs/contracts/src/tools/checks.rs:192 …` while the
candidate logs the generic `AnchorError occurred. …` — the original source
file:line captured by Anchor's `require!` macro is not reconstructable from the
binary. All account state, CPIs and effects are identical.

Run:
```
python3 -I scripts/donation_relay_differential.py \
  --candidate programs/donation-relay/target/deploy/donation_relay_source_proposal.so \
  --group ordinary --output /tmp/diff-ordinary.json
```

## (e) Whole-binary comparison (candidate vs original)

Independently re-measured on the freshly built candidate:

| Section | Original | Candidate | Δ | Common-position diff bytes |
|---------|---------:|----------:|---:|---------------------------:|
| `.text` | 752,488 | 419,112 | −333,376 | 224,137 |
| `.rodata` | 19,863 | 16,511 | −3,352 | 15,887 |
| `.rel.dyn` | 37,232 | 27,984 | −9,248 | 5,042 |
| `.data.rel.ro` | 6,928 | 5,816 | −1,112 | 2,197 |
| `.dynstr`/`.dynsym`/`.dynamic` | equal size | equal size | 0 | 232 / 31 / 13 |
| `.shstrtab` | 72 | 72 | 0 | **0 (identical)** |

Whole file: not byte-equal. 257,767 common-position bytes differ; the original
is 359,256 bytes larger (the candidate covers ~56% of `.text`).

## (f) Remaining work (honest)

1. **Rich error-report metadata** — original `require!` log lines carry
   `thrown in <file>:<line>`; the candidate emits the generic form. Closing this
   needs the original crate's file paths/line numbers (not in the binary).
2. **~333 KB of unrecovered `.text`** — much of the gap is Anchor
   account-context codegen expansions, error-reporting/formatting/panic
   machinery and monomorphizations not yet reproduced instruction-for-
   instruction; `comparison-summary.json` still lists ~370 unmatched original
   windows.
3. **swap / distribute family not runtime-validated** — these need an external
   Jupiter-style CPI target to build a valid transaction; the oracle here covers
   donations + reserved IDL ops + donation rejections only. Handler logic is
   recovered but unexercised against the original at runtime.
4. **Whole-binary byte equality unproven** — build provenance (exact registry /
   SDK snapshot) is reproduced via the frozen launcher, but byte-identical
   `.text` is not achieved.
