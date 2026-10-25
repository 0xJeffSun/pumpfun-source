# Session recovery summary (2026-10-25) — what was recovered, what remains and why

## Recovered, oracle-validated, and on main this session
| Handler / item | Commit | Validation |
|---|---|---|
| pump `claim_token_incentives` | 294c9186 | differential mismatches=[] |
| pump `admin_update_token_incentives` | 294c9186 | differential 44==44, mismatches=[] |
| pump v3 Token-2022 transfer-fee branches (buy_v3/sell_v3/buy_exact_quote_in_v3) | 7b3a63fb | pump_v3_token_extensions 92→0 mismatches, no regression |
| pump `create_v2` Mayhem mode + mayhem `initialize_mayhem_state` (end-to-end via real CPI) | aa0b1f5b | new mayhem-create oracle 17 cases, 0 mismatches (mayhem 25/25) |
| cashback (v3) — confirmed NOT a gap; validation oracle added | e0782407 | pump_cashback_accept 18 cases, 0 mismatches |
| Compiler correction v1.43→v1.44 (ELF e_machine proof) | 11c373ed | — |
| Full research report (SDK / versions / decompilation / byte-identicality) | efcddc99 etc. | — |

## Remaining — each blocked on a specific missing prerequisite (not effort)
- **`set_mayhem_virtual_params`** — dormant pump handler; the mayhem build that drives it is
  not in the captured evidence (SET-MAYHEM-VIRTUAL-PARAMS-FINDING.md). Logic recovered; needs
  the driver's mayhem version captured to validate.
- **mayhem-mode trade/crossing paths** — same class: need the driving mayhem version.
- **donation_relay** (~333 KB) — no public or recovered source; must be decompiled from scratch first.
- **Whole-binary byte-identicality (0/4 core)** — bounded by the **lost literal source**:
  behavioral+size-faithful reconstruction does not reproduce the exact source structure. Proven
  repeatedly (pump_fees: all 31 handlers, correct v1.44 compiler, still not byte-equal). Needs
  the original source + authenticated build recipe from Pump.fun internal records.

## Net
Every independently- or keystone-validatable handler is recovered and on main. The SDK-integration
blockers (token-incentive flows, v3 transfer-fee routes) are fixed. The remaining items are gated
on captured-evidence gaps or the lost literal source, both outside what the binary alone can yield.
