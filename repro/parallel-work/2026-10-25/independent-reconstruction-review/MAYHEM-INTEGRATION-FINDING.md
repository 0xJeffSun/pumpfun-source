# Finding: the remaining unrecovered handlers are entangled Mayhem-integration CPI targets

_2026-10-25. Evidence-backed result from attempting to recover mayhem `initialize_mayhem_state`._

## `initialize_mayhem_state` is reachable only via a genuine pump CPI (not standalone)
Driving the **unmodified captured original** (`evidence/original/mayhem/deployed.so`) in
LiteSVM and reading its own `AnchorError` output recovered the full account layout:

| # | account | kind |
|---|---|---|
| 0 | payer | signer, mut |
| 1 | global_params | `Account<GlobalParams>`, PDA `["global-params"]`@mayhem |
| 2 | **mint_authority** | PDA `["mint-authority"]`@**pump** (`TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM`, off-curve, bump 255) — **must be a Signer** |
| 3 | sol_vault | PDA `["sol-vault"]`@mayhem |
| 4 | mint | `InterfaceAccount<Mint>`, Token-2022, must pre-exist |
| 5 | mayhem_token_vault | Token-2022 ATA (authority = sol_vault), must pre-exist |
| 6 | mayhem_state | `init`, PDA `["mayhem-state", mint]` |
| 7 | system_program | |
| 8 | token_program | Token-2022 (`TokenzQdB…`) |
| 9 | associated_token_program | |

All constraints on accounts 0,1,3–9 can be satisfied locally (mayhem_state actually gets
created — the `System::Allocate` CPI fires). The chain **terminates at account 2**:
`mint_authority` is the **pump** program's off-curve `mint-authority` PDA *and* must sign,
so it can only be signed by **pump** via `invoke_signed`. No standalone transaction or
local keypair can honestly supply that signature. Therefore `initialize_mayhem_state` is a
**pump→mayhem CPI target**, and a standalone behavioral oracle is impossible to build
without a synthetic-signer bypass (forbidden).

**Recovered body logic** (handler at `0x82938`, for whoever builds the genuine driver):
sets `mayhem_state.mint` from the arg pubkey; `end_timestamp = now + duration_hours*3600`;
a start timestamp; zeroes the two i128 fields. A differential harness documenting the
terminal blocker (`mint_authority / ConstraintSigner / 2002`, confirmed on the original) was
built but no handler was committed (it can't be validated standalone → integrity bar).

## The pattern: the remaining unrecovered handlers are a coupled Mayhem subsystem
The handlers still open are **mutually dependent cross-program Mayhem-integration paths**,
not individually-recoverable units:
- **mayhem `initialize_mayhem_state`** — only reachable via pump's mayhem-create CPI (above).
- **pump `set_mayhem_virtual_params`** — needs a genuine Mayhem-PDA (`sol_vault_authority`)
  invocation (same class of cross-program signer prerequisite).
- **pump `create_v2` Mayhem mode** — builds the mayhem-create CPI that would in turn drive
  `initialize_mayhem_state`; itself only partially reconstructed.
- The pump↔mayhem leg has **no captured mayhem-mode `create` fixture** to replay.

**Consequence:** none of these can be *validated* in isolation. Honestly recovering them
requires reconstructing the **pump mayhem-create path end-to-end first** (so pump can
`invoke_signed` into mayhem), then building one coordinated end-to-end fixture that exercises
pump-create → mayhem-init → set_mayhem_virtual_params together. That is a single coupled
sub-project gated on the pump mayhem-create reconstruction — not four independent handler
recoveries. Implementing any of them standalone would be unvalidated code.

## What this does NOT block
The independently-validatable recoveries are already done and on main this session: pump
`claim_token_incentives` + `admin_update_token_incentives` (`294c9186`) and the pump v3
Token-2022 transfer-fee quote branches (`7b3a63fb`). Those had clean standalone oracles; the
Mayhem-integration handlers do not, by the architecture above.
