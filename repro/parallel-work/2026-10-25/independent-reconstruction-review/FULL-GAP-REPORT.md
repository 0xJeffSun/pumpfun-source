# Full gap report — everything remaining for byte-identical + SDK + decompilation + versions

_2026-10-25. Synthesis of a 4-thread deep research pass (SDK coverage, version forensics,
decompilation of unrecovered handlers, byte-identicality consolidation) over the live repo
and real sources. Supersedes nothing; extends MASTER-GAP-LEDGER.md, RECIPE-REVERSE-
ENGINEERING.md, BYTE-IDENTICALITY-FUNDAMENTAL-LIMIT.md._

## 0. The one framing that governs everything
Full whole-binary byte-identicality of the 4 core programs is **bounded by the lost
literal source**. The deployed `.so` is determined by the exact original source *structure*
(inlining/factoring/item order) + the exact toolchain/lockfile, and a behaviorally- and
size-faithful reconstruction does **not** uniquely determine either. This is proven, not
asserted: pump_fees has **all 31 handlers implemented** yet is still not byte-identical (it
even *over*-emits `.data.rel.ro`), and pump_amm is behaviorally complete yet differs by
994 calls / 663 relocations that no reorder can fix. The only core artifacts that are
byte-identical are the two dependencies whose **source is public** (SPL Token, Token-2022).

So "remaining work for byte-identical" splits into four categories per program:
- **(a) genuinely-missing code** — unimplemented handlers. *Recoverable* (decompilation below).
- **(b) source-structure** — inlining/factoring/item-order. *Bounded by lost source.*
- **(c) compiler/lockfile provenance** — exact tools + dependency versions + build paths. *Partly closable, provenance-bounded.*
- **(d) relocation/layout** — addresses, `e_entry` (first diff at offset 24 everywhere). *Auto-closes once a+b+c are exact; cannot be faked.*

## 1. SDK coverage (@pump-fun/pump-sdk 4.3.1 + @pump-fun/pump-swap-sdk 2.2.0)
Anchor 0.31.1 / web3.js 1.98 / spl-token 0.4.13. **All instruction/account/event
discriminators and all SDK-decoded account layouts MATCH the reconstruction** — SDK txs
dispatch to the right handlers and SDK decoders parse recon state/events correctly. The
reconstruction source is aligned to SDK 4.3.1 (carries the quote_transfer_fee event field +
QuoteMintNotWritable error). The in-repo `work/pump-public-docs` IDL snapshot and
`programs/pump-fees/idls/pump.json` (28 instr) are STALE and must not be used as the coverage baseline.

**SDK-integration failures against the reconstruction:**
1. **HARD FAIL — pump `claim_token_incentives` + `admin_update_token_incentives` are ABSENT**
   from the compiled pump program (53 `pub fn` vs 56 IDL instructions). The SDK builds both
   on `offlinePumpProgram` (and `*BothPrograms` helpers call both pump+amm legs), so
   bonding-curve token-incentive flows return Anchor `InstructionFallbackNotFound`. The
   pump_amm twins ARE implemented. **Genuinely recoverable** (module
   `programs/pump/src/token_incentives/` is in the captured binary; logic decompiled in §3).
2. **pump_amm `create_config`** dispatches with real logic but is gated on the hardcoded
   mainnet admin `8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8` (`@InvalidAdmin`) and is
   marked static-only/unvalidated. A localnet `createConfig` test fails the admin check
   unless it signs as that key or clones the live `GlobalConfig`.
3. **Partials** `buy_v3` / `sell_v3` / `buy_exact_quote_in_v3` / `create_v2` dispatch and
   pass simple SOL-quote paths but diverge on Token-2022/transfer-fee quote routes, nested
   routes, Mayhem crossing, exhaustive account validation, and the TradeEvent trailing field.
4. **No SDK risk:** pump `multi_hop_curve_swap` (partial) and `set_mayhem_virtual_params`
   (absent) are never built by the SDK (it builds the pump_amm `multiHopSwap`); fees — all
   30 SDK-referenced instructions implemented (recon superset, 31).

## 2. Version forensics (per-program toolchain + dependency evidence)
| Program | platform-tools | Rust / LLVM | Anchor / Solana | std fingerprint |
|---|---|---|---|---|
| pump | **v1.43** (v1.44 not excludable by version) | 1.79.0 / 18 | 0.31.1 / 2.x | `raw_vec.rs` single-file (Rust ≤1.86) |
| pump_amm | **v1.43** | 1.79.0 / 18 | 0.31.1 / 2.x | `raw_vec.rs` single-file |
| pump_fees | **v1.43** | 1.79.0 / 18 | 0.31.1 / 2.x | `raw_vec.rs` + single-file `slice/sort.rs` (Rust ≤1.80) |
| mayhem | **v1.52** (v1.53–56 not excludable) | 1.89.0 / 20 | 1.0.0 / 3.x | `raw_vec/mod.rs` module (Rust ≥1.87) + `hashbrown-0.15.4` |

Proven boundaries: RawVec file→module split lands at **Rust 1.87.0**; `slice/sort.rs`→module
at **Rust 1.81.0**. All four embed the Anza GitHub-runner std path (`/home/runner/work/
platform-tools/...`) — none is a stock-rustup build; ELF machine 263, SBPFv1 (e_flags=0).
No in-binary rustc/LLVM producer string (stripped, no `.comment`).

**Actionable version discrepancies:**
- **mayhem: original links `hashbrown 0.15.4`, reconstruction resolves `0.17.1`.** 0.15 vs
  0.16/0.17 differ in monomorphized codegen; pinning `hashbrown = "=0.15.4"` in mayhem is a
  concrete fix that closes codegen drift. (pump/amm/fees embed no hashbrown path.)
- **v1.43 vs v1.44 is NOT resolvable by version forensics** (identical Rust 1.79/LLVM 18) —
  the v1.43 pin rests on the section-size sweep (v1.43 matched `.text` to ~99–100% for
  pump_amm/pump_fees), a codegen conclusion, not a version string. The repo is internally
  inconsistent (README favors v1.44; build helper defaulted v1.43; some verify scripts
  assert v1.44). This must be reconciled to one recipe.

## 3. Decompilation — recovered logic of the unrecovered/partial handlers
Via platform-tools v1.52 `llvm-objdump` (the authoritative SBF disassembler; no Ghidra/
radare needed — SBF support in those is weak). Dispatch located by Anchor discriminator;
handler bodies resolved by the SBF pseudo-call formula `target = site + 8 + imm*8`; syscalls
resolved via `.dynsym` + type-10 relocations. **Caveat: this recovers semantic LOGIC, not
byte-identical source.**

- **pump `admin_update_token_incentives`** (disc `0xcc7c17d557730bd1`): args
  `start_time:i64, end_time:i64, seconds_in_a_day:i64, day_number:u64,
  pump_token_supply_per_day:u64`; accounts per IDL; 6 range-validation errors + 2 day-index
  errors; ATA-init CPI; per-day supply array write; event. **High recoverability.**
- **pump `claim_token_incentives`** (disc `0x1b2801cc1c470410`): no args; full account set;
  UserVolumeAccumulator layout; `>0` guard; claimed/unclaimed bookkeeping; token-transfer
  CPI (PDA signer); user_ata init; event. **High recoverability.** pump_amm twin is a reference.
- **pump `set_mayhem_virtual_params`**: logic matches prior static recovery; runtime blocker
  is the genuine Mayhem-PDA invocation prerequisite, not the logic. Not SDK-blocking.
- **mayhem `initialize_mayhem_state`** (disc `0x2dcc4555485ebd9d`): 6 PDA derivations
  (mayhem-state, bonding-curve, sol-vault, sol_vault_quote_ata, mayhem_token_vault,
  fee_recipient), create-account CPI, full MayhemState layout. **Medium-High** (2 i128 field
  names uncertain).
- **Partial handlers' missing branches located:** buy_v3/sell_v3 share a **cashback-accept
  helper at 0x6cd78** (errors 6072/6073/6076) — on a cashback coin the original *accrues* to
  the user_volume_accumulator instead of rejecting; buy_exact_quote_in_v3 Mayhem partial-fill
  crossing; create_v2 Mayhem-creation CPI; multi_hop AMM-CPI threading. All characterized for
  genuine completion.

## 4. Byte-identicality remaining-work, per program (zero-padding excluded)
Real ELF-content shortfall (not the ~96% zero allocation padding, which is trivially
reproducible — Token-2022/Metaplex already regenerate their zero tails exactly):

| Program | real shortfall | in-extent diffs | dominant cause |
|---|---:|---:|---|
| pump | 353,568 B (.text −330,824) | 882,320 | (a) 3 missing handlers + 255 missing windows, then (b)+(c) |
| pump_amm | 67,888 B (.text −57,528) | 672,774 | **(b) structure + (c) provenance** — little missing code (37/38) |
| pump_fees | 17,632 B (.text −18,504, +.data.rel.ro) | 465,417 | **(b)+(c) only** — 0 missing handlers; clearest proof behavioral≠byte |
| mayhem | 106,776 B (.text −99,968) | 362,490 | (a) initializer + 257 opaque windows + error-ABI + hashbrown 0.15.4 pin |

**Dependencies:** SPL Token ✅ byte-exact; Token-2022 ✅ byte-exact; ATA 307 B (two RawVec
monomorphizations emitted in swapped order — bounded by lost source/recipe); Metaplex 1,509 B
(the `Utilize` block reordered — bounded); donation_relay ~347 KB short (no public/recovered
source — ~333 KB of codec/handler logic must be decompiled first, category (a)).

## 5. What is implementable now (and being implemented)
1. **Recover pump `claim_token_incentives` + `admin_update_token_incentives`** — the SDK
   hard-fail handlers; logic decompiled (§3), pump_amm twins + the differential harnesses
   (`scripts/pump_{claim,admin}_token_incentives*_differential.py`) exist as oracles.
2. ~~Pin mayhem `hashbrown = "=0.15.4"`~~ — **attempted, BLOCKED**: `indexmap 2.14.2`
   (via `anchor-lang 1.0.0` → proc-macro-crate → toml_edit) requires `hashbrown ^0.17`, so a
   lone pin fails resolution. Closing it needs the original's *whole* older dependency graph
   (the lost `Cargo.lock`) — this is category-(c) provenance, not a one-line fix. The real
   signal stands: the original's lockfile differs from the reconstruction's, and the mayhem
   `.text` gap is partly this codegen drift.
3. **Re-apply the v1.43 per-program build-recipe default** (reverted by a concurrent edit) — done.
4. **Localnet `create_config`**: seed/clone the live `GlobalConfig` so SDK `createConfig` tests pass the admin gate.

## 6. What remains fundamentally bounded (honest)
- Whole-binary byte-identicality of pump_fees / pump_amm: **not reachable** without the lost
  literal source (category b) and an authenticated build recipe (category c). Even perfect
  handler code won't close it.
- pump / mayhem: recover the missing handlers (closes category a), after which the same b/c
  walls remain.
- donation_relay: needs the authentic source recovered from disassembly first.
- The durable path to byte-identicality remains: obtain the original source + the
  authenticated build recipe (Cargo.lock + exact tools) from Pump.fun's internal records.
