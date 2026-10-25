# Pump.fun reconstruction — consolidated review & remaining work (2026-10-25)

Independent review + fresh verification + four parallel agents + an adversarial
verification pass. Companion files in this folder: `STATUS_REPORT.md` (initial),
`SECTION_DIVERGENCE.md`, `CONCURRENCY-NOTE.md`, `AGENT_DISPATCH.md`, and
`A-reproduction/`, `B-differential/`, `C-dependencies/`, `D-sdk-localnet/`.

---

## 1. Bottom line

- **Behavioral / ABI reconstruction is strong and now independently re-verified.**
  86/90 differential runners pass (39,098 cases, 0 mismatches on the CI-gated set),
  and the localnet path runs end-to-end.
- **Whole-binary byte-identicality of the 4 core programs: 0/4, and not close.**
  Each candidate differs from its captured original in ~54–56% of overlapping bytes,
  and the gap is **84–98% in `.text` (compiled code)** — a code-recovery + exact-
  compiler-attribution problem, not a data/relocation cleanup.
- **The two tractable byte targets (dependencies) are pinned to precise root causes:**
  Metaplex `Utilize` = one redundant guard clause (concrete patch in hand);
  ATA = one compiler-snapshot difference in `custom_panic`. Neither is finishable in
  this environment (needs historical toolchains / docker, both unavailable here).
- **For the stated goal (local SDK integration testing): ready now.** All 4 candidates
  load into `solana-test-validator` at their mainnet IDs and dispatch through Anchor;
  behavioral parity holds for the common flows. Byte-identicality is not required for
  this and should be treated as a separate, longer-horizon track.

## 2. Verified this session (fresh, not just read)

| Check | Result |
|---|---|
| `verify_evidence.py` / `test_tooling.py` | 9/9 captures OK, 6/6 tooling OK |
| Build determinism, all 4 | pump `5c1c1c2d` (v1.44), pump_amm `d27be7e9` (v1.44, current head), pump_fees `8f89dbeb` (v1.44), mayhem `9e4e19df` (v1.52) — all reproduce from current source |
| Differential regression (agent B) | 86/90 runners pass, 39,098 cases, 4 mismatches (below) |
| Localnet (agent D) | test-validator + Surfpool 1.6.1 (18 cases/36 txs) + LiteSVM (16 flows) all run clean here |
| Section divergence | gap is 84–98% `.text`; `.rodata`/relocs near-matching |

## 3. Byte-identicality status (core programs)

| Program | candidate | reproduces from source | vs original: overlap differ | `.text` shortfall |
|---|---|---|---|---|
| pump | `5c1c1c2d` | yes | 55.8% | 335,544 B |
| pump_amm | `d27be7e9` (update-event-borrow-v144) | yes | 56.0% | ~57,912 B |
| pump_fees | `8f89dbeb` | yes | 54.6% | 102,792 B |
| mayhem | `9e4e19df` | yes | 54.2% | 100,816 B |

All diverge from the captured original at ELF byte 24 onward. "Reproduces from source"
means fresh build == committed candidate, NOT == deployed original.

## 4. Behavioral differential — the 4 real divergences (agent B)

Everything CI gates passes. The four mismatches, most actionable first:

1. **`pump_amm_transfer_creator` (CI-gated) — NEW.** On `transfer_creator_fees_to_pump`
   with rent-sized destination accounts, the original performs no inner CPI while the
   candidate emits transfer CPIs and mutates state (8/267). Reproduces against both AMM
   candidates → a real candidate bug, not a harness artifact. **Owner: the AMM lane.**
2. **Token-2022 `buy_v3` quote path (`pump_v3_token_extensions`)** — 92/126; diverges on
   accounts/inner-CPIs/logs. Consistent with `buy_v3` being a documented partial handler.
3. **`fees_sharing_update`** — 4/417 edge cases (empty-amm / graduated / 0-lamports): the
   original rejects (`InvalidAccountData` / `Custom 3007`), the candidate accepts + emits.
4. **`admin_update_token_incentives` (`pump_incentives_admin`)** — 297/299: unimplemented
   in the candidate (returns `InstructionFallbackNotFound`). A known STOPPED/unrecovered
   handler; expected.

Surfpool runners (16) all errored on a stale error-code mapping table vs the installed
`surfpool 1.6.1` — an environment/harness incompatibility, not a candidate mismatch and
not surfpool being unavailable.

## 5. Dependency byte-closure (agent C)

- **Metaplex `Utilize`:** 1,509 differing bytes = **one** branch polarity (JGE↔JGT) from a
  redundant source disjunct `|| number_of_uses > metadata_uses.remaining`, plus consequent
  block-reorder displacements (+30 B of panic line-number records). A minimal patch
  (`C-dependencies/utilize.proposed.patch`) is predicted to close 1,479 of 1,509 bytes.
  **Unverified** — faithful build needs rust-1.69 verifiable-build image; docker down here.
  The ~30 source-coordinate bytes are permanently unreachable (source whitespace).
- **ATA:** 307 differing bytes, **100% inside the compiler-emitted `custom_panic` function**;
  program logic is byte-identical under source `f5ce86d4`. Root cause = bpf-tools v1.27
  (candidate) vs Solana 1.10.33 (deployed) toolchain-snapshot mismatch. No source edit
  closes it; needs the exact 1.10.33 bpf-tools (unavailable offline).

## 6. Remaining work ledger

**Byte-identicality, core programs (hard / open research):**
- Recover the missing `.text` (per §3: 58 KB–336 KB per program) — the unimplemented/partial
  handler branches AND the compiler-driven codegen differences.
- Resolve the historical build recipe: exact platform-tools build × dependency lockfile ×
  flags × complete source. The repo (correctly) forbids brute-force search here.

**Byte-identicality, dependencies (tractable, environment-blocked):**
- Metaplex `Utilize`: apply the proposed guard patch and verify under rust-1.69 verifiable
  build (needs docker). Closes ~1,479/1,509 bytes if confirmed.
- ATA: build under Solana 1.10.33 bpf-tools (needs that toolchain). Closes all 307 bytes.

**Behavioral (for SDK testing):**
- Fix `pump_amm_transfer_creator` rent-sized-destination CPI behavior (real bug).
- Close `fees_sharing_update` empty-AMM edge-case acceptance.
- `buy_v3`/`sell_v3` Token-2022 + nested/extension routes remain partial.
- STOPPED lanes (incentives ×2, set_mayhem_virtual_params, mayhem init, create_config
  positive replay) — left untouched per repo rules.
- Refresh the Surfpool suites' error-code mapping for surfpool 1.6.1 (harness maintenance).

## 7. SDK integration testing — ready now (agent D)

Runnable path verified this session (setup + scripts under `D-sdk-localnet/`):
- `solana-test-validator` loads all 4 candidates + 4 captured deps at mainnet IDs with
  seeded global configs; Anchor dispatch confirmed live.
- **Safe for SDK testing (fully differential-covered):** create, buy/buy_v2, sell/sell_v2,
  migrate/migrate_v2, all PumpSwap trading + pool-create + liquidity + AMM multi-hop, fee
  collection (all 31 Fees handlers), quote-control, cashback claims, holder-reward distribution.
- **Partial — exercise with care:** `buy_v3`/`sell_v3` (SOL+USDC only), `create_v2` (Mayhem
  mode / migrated-parent / deep-nested diverge), native `multi_hop_curve_swap` (2 routes),
  `sell_v2` with a Token-2022 transfer-fee quote mint, and the `transfer_creator` bug in §4.
- **Unavailable:** the STOPPED lanes in §6.

## 8. Adversarial verification of this report's load-bearing claims

Three load-bearing new claims were each handed to two independent skeptics instructed to
**refute** them (distinct methods; default-to-refuted if unconfirmable). All three HELD,
0/2 refuted:

| Claim | Verdict | How it was independently confirmed |
|---|---|---|
| `pump_amm_transfer_creator` is a real candidate↔original divergence (not a harness artifact) | **HOLDS (0/2)** | Both skeptics reproduced exactly 8/267 mismatches at the same indices against both AMM candidates; an original-vs-original control gave 0 mismatches, proving it's the binary, not the runner; raw lamport flows re-derived (AUTH 1e9→0, 7 inner CPIs vs original's 0). |
| Metaplex `Utilize` .text delta = a single JGE↔JGT instruction | **HOLDS (0/2)** | Re-derived 3 ways with the manifest-matched v1.52 llvm-objdump: full-.text multiset, window canonical multiset (all 51 calls → identical callees), and the agent's own script on freshly-extracted dumps — all show exactly one instruction differs. Caveat confirmed: the *source-level* patch is an **unbuilt hypothesis** (no rust-1.69 build here); and there are 32 additional non-.text bytes (30 `.data.rel.ro` + 2 `.rel.dyn`) outside the `.text`-delta scope. |
| pump + mayhem rebuild byte-identical to committed candidates | **HOLDS (0/2)** | Independent offline rebuilds: fresh `pump_recovered.so` = `5c1c1c2d…` and `mayhem_recovered.so` = `9e4e19df…`, `cmp` IDENTICAL to the committed files. (Parent separately reproduced pump_fees `8f89dbeb…` and pump_amm `d27be7e9…` → all four deterministic.) |

## 9. Concurrency & push posture

This is a **single shared checkout with other active sessions** (HEAD `f0c80ca`; siblings
have uncommitted edits to `programs/pump-fees/src/donation.rs`, `docs/*`, and new untracked
`repro/parallel-work/2026-10-25/*` dirs). `/work/` is gitignored. Therefore this review's
artifacts are local under `work/`, and any push is staged as **only this review's own paths
on a dedicated branch** — never `git add -A`, never onto `main`, never touching sibling files.
