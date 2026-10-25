# Recovery: pump `set_mayhem_virtual_params` (the 56th / last handler)

_2026-10-25. `set_mayhem_virtual_params` was the one pump dispatch target still
unimplemented (pump had 55 of 56 IDL instructions). It is **dormant** — no program in the
captured system (original pump or original mayhem) builds its discriminator, confirmed by
disassembling both — and its account #0 `sol_vault_authority` is mayhem's `["sol-vault"]`
PDA that must sign, so it is reachable only through a mayhem `invoke_signed` CPI. It is not
built by the @pump-fun SDK. Previously it was documented as "cannot be honestly validated";
that was wrong — a differential does not need the *authentic* caller, only one correctly-
authorized invocation that drives both binaries identically. pump now dispatches all 56._

## How it was recovered
The handler body's arithmetic could not be read byte-exact from SBF alone (the u128
multiply/divide resisted static decompilation). Instead it was **reverse-engineered
empirically**: the captured original was driven on a controlled grid of inputs through a
minimal signer-forwarder stub (`scripts/fixtures/signer_stub`) deployed at the mayhem
program id, which signs `["sol-vault"]` via a genuine `invoke_signed` (a real signature, not
a LiteSVM signer bypass) and forwards the 8 accounts to pump. Observing input→output pinned
the formula exactly; the same stub then validates the candidate against the original.

## Recovered semantics (every clause confirmed by exact integer match vs the original)
```
if is_mayhem_mode {
    den = 2*token_total_supply - global.initial_real_token_reserves - mayhem_token_vault.amount   // checked; underflow -> Overflow(6024)
    if real_quote_reserves >= 10_000_000 && den >= 1_000_000_000_000 {
        raw = real_quote_reserves + (real_quote_reserves as u128 * virtual_token_reserves as u128 / den as u128) as u64
        cap = if quote_mint == Pubkey::default() { 2_000_000_000_000 } else { 160_000_000_000 }
        virtual_quote_reserves = min(raw, cap)
    }
}
emit UpdateMayhemVirtualParamsEvent{ timestamp, mint, virtual_token_reserves, virtual_sol_reserves,
    new_virtual_token_reserves, new_virtual_sol_reserves, real_token_reserves, real_sol_reserves }   // always
```
Key facts established empirically: output is exactly proportional to `real_quote_reserves`;
`real_token_reserves` and the input `virtual_quote_reserves` do not affect it;
`initial_real_token_reserves` is read from the **global** account (not hardcoded); the
`den >= 1e12` and `real_quote_reserves >= 10_000_000` write-gates and the `2e12` (SOL) /
`1.6e11` (SPL-quote) caps were each located to the exact boundary; `den` underflow is
`PumpError::Overflow` (6024); the event is emitted on every path (new == old when skipped).

## Validation
`scripts/pump_set_mayhem_virtual_params_differential.py` — fresh v1.44 candidate
(`e_machine=263`), **84 cases, mismatches=[]** vs `evidence/original/pump/deployed.so`
(60 randomized + 24 edge: rqr threshold, den=1e12 boundary, den underflow/skip, SOL & SPL
caps, vtr=0, is_mayhem=false, varying global IRTR), comparing account state, errors, logs
and the emitted event. No regression on the same candidate:
`pump_v3_token_extensions_differential` 126/0, `pump_create_mayhem_differential` 17/0,
`pump_claim_token_incentives_differential` 60/0.

Behavioral recovery; not a whole-binary byte-identity claim. pump dispatch coverage is now
56/56 — the complete IDL instruction set.
