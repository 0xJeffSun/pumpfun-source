# Pump token-incentive claim source slice

This branch starts from public Pump source checkpoint
`4ffe8bd88761059693e481ae972443c10204f7af` and adds a **bounded**
`claim_token_incentives` Rust body. The pinned deployed Pump ELF is SHA-256
`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
The current candidate is not an original-source or deployed-byte match.

The [validly signed offline differential](differential.json) matches **60/60**
target/candidate outcomes, complete watched account bytes/owners/lamports,
event payloads and both Token-2022 `TransferChecked` and Pump event-CPI
instructions: **48 successful calls**, of which 31 pay and emit events, and
**12 failures with rollback**. A baseline synthetic claim transfers **200**
raw tokens from the global incentive ATA to the user's ATA and updates
`total_claimed_tokens` 0→200, `current_sol_volume` 20→0,
`needs_claim` 1→0 and the local timestamp to 10. A separate fee payer signs
the transaction; the `user` account is an unsigned beneficiary in the IDL.

The user volume, Token-2022 mint and user ATA come from a saved signed
Pump-created/traded local lifecycle. The **GlobalVolumeAccumulator and funded
canonical incentive ATA are synthetic**: 30 daily supply entries and SOL
volume denominators are set locally, and the vault balance is assigned from
a captured Token-2022 account template. Their state is not proven to be
reachable through `admin_update_token_incentives` or to exist on mainnet.
All keys/funds are disposable, the clock is set locally, and no live
transaction is sent.

Within the tested domain, reward arithmetic follows
`floor(current_sol_volume × day_supply / day_sol_volume)` using the day from
the user's **prior** `last_update_timestamp`, plus pending unclaimed tokens.
The matrix includes seven independent arithmetic/rounding holdouts, separate
day-index selectors, changed start/end times, zero numerator or denominator,
preexisting claimed/unclaimed counters, and Token CPI underfunding. The
`needs_claim` flag alone does not bar a tested payout. A zero daily SOL-volume
denominator retains the current volume and flag, but a previously unclaimed
amount can still be paid. An end time exceeded by less than one configured
day can still admit a claim, consistent with a day-index comparison.
With an explicitly inconsistent synthetic 100-day end and a 30-entry array,
day indices 30 and 31 cause the **pinned ELF itself** to panic and roll back;
the candidate reproduces that bounded error. This is not a demonstrated
reachable live panic or fund loss. Owner/PDA/program/writability and token
vault failure controls are also recorded.

The [independent verifier](../../../scripts/pump_claim_token_incentives_verify.py)
re-executes all 60 cases, checks the valid payer signatures, full watched
state, conservation of the two Token-2022 balances, event fields, CPI bytes
and order, rollback, source/IDL/fixture/dependency hashes, and two clean
build records. The [fresh inherited regression packet](inherited-regressions.json)
binds **9,161 passing cases** to this candidate: 7,957 maintained Pump cases
across 33 suites, 649 holder-distribution cases, 48 nested-create cases, and
507 QuoteControl cases. Each compressed receipt is saved beside the summary.
These fixtures remain bounded; the known `sell_v2` quote-transfer-fee gap is
outside their passing coverage. The maintained runner's embedded scope string
predates this branch and still says “forty-one”; its saved candidate hash and
33 actual suite results bind execution to the current candidate.

Two isolated clean SBF builds with the saved Anchor 0.31.1 lock and explicit
platform-tools **v1.44** produced identical candidate SHA-256
`54f79cfdfdd027ab0d1447f4e25ed6236424ecbf778893e85887c5df493c3541`
([build receipt](build-reproducibility.json)). Build attempts/comparisons and
compressed logs are adjacent, and the exact [candidate ELF](candidate.so) is
retained for replay. No generated keypair is committed. The active host's
`cargo-build-sbf` lacked an adjacent `sdk/sbf`,
so a temporary wrapper supplied a copy of the saved SDK to the standard
isolated builder. Target executable bytes were never compiler inputs.

To reproduce, pass the retained candidate (or a fresh v1.44 build with the
same SHA-256) to the importable differential and verifier:

```sh
<venv>/bin/python scripts/pump_claim_token_incentives_differential.py \
  --candidate repro/pump/claim-token-incentives/candidate.so --output <new-receipt.json>
<venv>/bin/python scripts/pump_claim_token_incentives_verify.py \
  --candidate repro/pump/claim-token-incentives/candidate.so --receipt <new-receipt.json>
```

The fixture builder `fixture_data` and executor `run_case` are reusable for
a later **signed admin-update → claim** composition. Other legitimate
reward schedules, mint extensions, overflow and malformed-account branches,
historical state, full handler behavior, and exact ELF identity remain open.
