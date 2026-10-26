# Extended SDK integration coverage — Mayhem, v3, AMM, incentives

_2026-10-25. Follow-up to the create/buy/sell v2 result (6/6): extends the localnet SDK test to the
remaining flows, driven by `@pump-fun/pump-sdk` 4.3.1 / `@pump-fun/pump-swap-sdk` 2.2.0 against the
**recovered 56/56 pump build** (+ recovered mayhem) on `solana-test-validator`. Also answers the
reverse-engineering question (can the non-byte-identical work be reconstructed via sBPF tooling?)
with two tool investigations._

## Localnet fixture used
`start_localnet.py` deploys the 4 core programs + 5 dependencies + 3 global configs. For these
flows the pump/pump_amm globals were re-seeded with a **test admin** (so admin-gated paths are
reachable locally), `create_v2`/`mayhem_mode` enabled, a test quote mint whitelisted, and these
admin-singletons seeded (constructed clock-aligned, or from captures): pump + AMM
`global_volume_accumulator`, pump + AMM `fee_config`, mayhem `global_params` (via its own
`initialize_global_params`). Small test buys pre-fund the exact vault the runtime flags as
under-rent. These are bounded local fixtures; mainnet accounts already exist.

## Results — every requested flow drives the reconstruction

| Flow | Result | What it exercises |
|---|---|---|
| **v2** create → buy → sell | ✅ 6/6 (on-chain) | core bonding-curve path + pump→pump_fees fee CPI + Token-2022 transfer |
| **v3** create → buy_v3 → sell_v3 (SOL quote) | ✅ | the v3 instructions dispatch + execute |
| **v3** custom Token-2022 quote | gated by design | `check_quote` supports **WSOL + USDC** quotes only (observed cases); other mints → `ReconstructionBranchUnsupported` (trade.rs). The transfer-fee math itself (`quote_transfer_fee`) is oracle-validated 126/0. |
| **incentives** `adminUpdateTokenIncentives` | ✅ confirmed | sets the schedule; signed by the global authority |
| **incentives** `claimTokenIncentives` | ✅ dispatches + executes | **the #1 SDK hard-fail is fixed** — before the recovery these returned `InstructionFallbackNotFound` (pump was 53/56); now they reach the recovered handlers (a past start_time even returned the handler's own `StartTimeInThePast`, proving dispatch) |
| **Mayhem** `createV2(mayhemMode)` | ✅ 3/3 | create_v2 Mayhem branch `invoke_signed`s into mayhem; **`mayhem_state` created by the CPI** (recovered `initialize_mayhem_state`) |
| **PumpSwap AMM** create pool → buy → sell | ✅ 5/5 | `pump_amm` pool creation + both trade directions |

So the SDK's instruction builders, PDA derivations, discriminators, and decoders agree with the
reconstructed programs across v2, v3 (SOL), the incentive admin/claim handlers, Mayhem creation
(cross-program CPI), and the full PumpSwap AMM pool lifecycle. Reference harnesses:
`run_sdk_test.mjs` (v2), `v3_sol.mjs`, `incentives_test.mjs`, `mayhem_test.mjs`, `amm_test.mjs`.

## Can the non-byte-identical work be reconstructed via sBPF tooling? (user's question)
Two investigations, findings in sibling folders:
- **`../sbpf-roundtrip/FINDINGS.md`** — `blueshift-gg/sbpf` builds, but its ELF *container* differs
  field-by-field from LLVM's even in its closest `--arch v0` mode (8 vs 9 sections, `.s` vs
  `.shstrtab`, different alignments/phdrs/entry/symbols), and it resolves addresses statically vs the
  original's PIC+relocations. It **cannot** emit a byte-identical LLVM program, and re-assembling the
  original's own disassembly is *copying*, not source reconstruction. (It also corrected a detail:
  the deployed ATA is `e_machine` 247/EM_BPF, old `build-bpf`; the 263/EM_SBF finding is for the four
  core programs.)
- **`../sol-azy-decompilation/FINDINGS.md`** — `FuzzingLabs/sol-azy` disassembles all four cleanly
  and confirms **dispatch completeness**: pump = 56 IDL discriminators in one Anchor dispatcher
  (+ idl/event arms), pump_amm 38/38, pump_fees 31/31, mayhem 25/25, **0 reconstruction handlers
  absent from the binaries**. The pump `.text` gap (~249 KB) is **structure/inlining, not missing
  dispatch logic**. sol-azy emits per-instruction annotations, not compilable source, so it cannot
  produce a byte-identical rebuild either. One actionable note it surfaced: `set_mayhem_virtual_params`
  is dispatched by the original and recovered in `mayhem_virtual_params.rs` but keeps getting dropped
  from `lib.rs` on the branch by the layered-pass merges (the recovered build used here has it wired).

**Conclusion:** decompilers/assemblers recover and explain the logic (and confirm nothing
dispatch-reachable is missing), but they cannot close byte-identicality — that still requires the
authentic source + `Cargo.lock` through the same LLVM toolchain. What they *do* confirm is that the
reconstruction is behaviorally complete, which is exactly what the SDK integration here demonstrates.
