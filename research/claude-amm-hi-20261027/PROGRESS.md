# Lane amm-hi progress (PumpSwap, original windows 0x73ef0 … 0xf6eb0)

Continuation notes for any agent resuming this lane. Newest entry last.

## Baseline

- Frontier: `repro/pump_amm/native-fee-cpi-recovery-20261027`, Linux v1.44 candidate
  `a4b978ee1ab15dd822a31bc42e85d55e409f4e777f7af671a3197ea175891101`:
  599/785 normalized, 125 raw, 186 unmatched. My range holds 57 unmatched windows.
- Native macOS v1.44 build of the same source (`builds/native-base`, sha `837c6ab0…`):
  594 normalized / 118 raw. The only differences from Linux are five 56-byte
  `type_id` windows (TypeId hashes depend on the host-specific `-C metadata`) and a
  few tail raw matches (0xfd098, 0x119460, 0x119b18, 0x11a2f0). None is in my range,
  so native builds are valid for iterating on my windows; finals are confirmed with
  the Linux recipe.

## Method

`tools/nbuild.py --src <root> --tag <t>` stages the frontier workspace recipe
(`workspace_recipe_v2.py`), builds natively under `sbf_lock.py --slots 6`, strips with
v1.52 llvm-objcopy and measures with `repro/pump_amm/focused-diagnostics-20261026/measure.py`.
`tools/cmpmeas.py A B` lists per-window gains/losses. `tools/origins.py` extracts
Anchor `Source{filename,line}` immediates; `tools/wdiff.py <orig> <symbol>` shows
normalized instruction diffs; `tools/nearmiss.py` ranks near misses.

Key finding: nearly every original window that carries an Anchor error-origin record
(filename length + line immediates in code) is unmatched, because the reconstruction's
file paths and lines differ. Several windows in my range differ ONLY in those
immediates.

## Gains

### Gain 1 (exp1): six windows, source-coordinate placement only

| Window | Bytes | Function | Original origin |
| --- | ---: | --- | --- |
| 0x74900 | 640 | `utils::transfer_fee::amount_after_fee` | transfer_fee.rs:57 |
| 0x82630 | 5896 | `CreateConfig::try_accounts` | instructions/admin/create_config.rs:6 |
| 0xd1290 | 7824 | `InitUserVolumeAccumulator::try_accounts` | instructions/token_incentives/init_user_volume_accumulator.rs:8 |
| 0xe0148 | 1376 | `__idl::__idl_write` | lib.rs:36 (`#[program]`) |
| 0xe0720 | 1240 | `__idl::__idl_set_buffer` | lib.rs:36 |
| 0xf23f0 | 728 | `IdlAccount::try_deserialize` | lib.rs:36 |

Native: 594→600 normalized, raw 118→118, no losses. Linux confirmation: pending.

Files changed (all under `programs/pump-amm/src`):
- `lib.rs`: the eight module glob imports plus `multi_hop`/`state` merged into one
  `use {…}` and the blank line before `#[program]` removed, so `#[program]` is on
  line 36. Lines 22/23 (`declare_program!`) are unchanged.
- `instructions/admin/create_config.rs`: one blank line removed; `#[derive(Accounts)]` on line 6.
- `instructions/token_incentives/init_user_volume_accumulator.rs`: explicit imports
  and a two-line struct doc comment; `#[derive(Accounts)]` on line 8.
- `utils/transfer_fee.rs`: doc comments and rustfmt-style method chains put the four
  `error!` sites on the original lines 32/49/57/67. Code is unchanged. Only line 57
  (0x74900) gains now: 0x74648/0x74b80/0x74128 also need the original 24-byte
  by-value fee copy and separate callees (0xf2d60/0xf2ed0/0xf31d8), which Codex
  `work/amm-fee-native-next-20261027` is researching.

### Gain 2 (exp2, exp3): six windows, ATA seeds program and handler linkage

| Window | Bytes | Function | Cause |
| --- | ---: | --- | --- |
| 0xc6530 | 7104 | `SweepFees::try_accounts` | `seeds::program` is the ATA program-id constant (original stores `ATokenGP…` via four `lddw`), not `associated_token_program.key()` |
| 0xe9b90 | 1072 | `__global::sweep_protocol_fee` | shared handler is publicly reachable (`pub mod sweep`) |
| 0xe9fc0 | 1072 | `__global::sweep_creator_fee` | same |
| 0xe8ae8 | 1064 | `__global::buy_v2` | `pub use trade::{execute_buy, …}` at the end of lib.rs |
| 0xe8f10 | 1064 | `__global::buy_exact_quote_in_v2` | same |
| 0xe9338 | 1064 | `__global::sell_v2` | same |

Mechanism: the crate builds as `cdylib` and `lib`, so publicly reachable functions
keep external linkage. LLVM then cannot apply argument promotion to the shared
handler, and the wrapper passes `&Context` (both bump bytes materialized,
`sth [r10-370], 65535`) exactly as in the original. With a private module the
handler is internal and gets promoted to `(accounts, event_authority_bump)`.
The original sweep handler 0x59408 reads only `ctx.accounts` and
`ctx.bumps.event_authority`, so field count does not explain it; linkage does.
`pub mod trade` was not used because it would export the dead `trade::execute`.
Behavior: `Program<AssociatedToken>` is validated during field deserialization,
before any seeds constraint runs, so the constant program id is equivalent.

Native: 600→606 normalized, raw 118→118, no losses; no symbols added or removed
(`tools/symdiff.py`), only the targeted bodies resized.
Files changed: `lib.rs` (`pub mod sweep;`, trailing `pub use trade::{…}`), `sweep.rs` (one constraint).

### Gain 3 (exp4): two windows, Token-2022 harvest through anchor_spl

| Window | Bytes | Function |
| --- | ---: | --- |
| 0x74e30 | 1480 | `utils::transfer_fee::harvest_to_mint` (new helper; original sits right after `amount_before_fee`) |
| 0xf6eb0 | 2664 | `anchor_spl::token_2022_extensions::transfer_fee::harvest_withheld_tokens_to_mint` |

Original evidence: the boost handler 0x1fed8 clones `quote_token_program`, `quote_mint`
and `boost_vault` AccountInfos and calls 0x74e30, which clones the token program twice
(CpiContext `program` and `token_program_id`) and the mint once, puts one source clone
in a heap Vec, and calls 0xf6eb0 (anchor_spl helper → spl builder + `invoke_signed`).
The reconstruction built the instruction and called `invoke` inline in `boost_burn`.
Same instruction; account-info list order differs only (`invoke` is order-independent),
signer seeds empty. Needs the boost runtime suite (pending).

Native: 606→608 normalized, raw unchanged, no losses. Symbols added: exactly the two.
Files changed: `utils/transfer_fee.rs` (helper appended after `amount_before_fee`),
`boost_burn.rs` (call site; unused import removed).

## Coordination notes

- Codex root privately recovered (not yet on main) 0x7d780, 0x80a00, 0x84d58,
  0x87290, 0x908e8, 0x928f8, 0xe1cc0, 0xe41c8, 0xe5ce8 and 0xea8e8 via Accounts
  field-type layout fixes (`work/amm-account-layout-integration-20261027`,
  `amm-incentive-context`). Do not duplicate.
- Codex `amm_v2_creator_helper` is creating `state/volume_accumulator.rs`, which
  affects 0xd44e0/0xd4f90 (decoders at volume_accumulator.rs:8/25). Avoided so far.
