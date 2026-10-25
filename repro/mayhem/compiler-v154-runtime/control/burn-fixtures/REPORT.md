# Mayhem burn fixtures: read-only acquisition

**Three genuine, currently unburned account families pass the recovered deadline/status guards in their captured bank snapshot. Four genuine signed historical transactions containing twenty successful burns are also retained.** These are separate input sets: the signed historical messages name completed families, while the three eligible families have no captured signed burn message. Historical success replay is not yet fully specified because its original raw pre-burn account bytes are unavailable.

The acquisition phase used only public read-only RPC requests and offline byte/signature analysis. Its frozen manifest records that phase. A subsequently authorized offline comparison is documented in `runtime-01/REPORT.md` and retains the exact fixture bytes. No live transaction was submitted, and no initializer was invoked or revisited. Main program sources/status and the reviewed static draft were not modified.

## Concrete available inputs

`fixture-manifest.json` contains every selected account address, lamports, owner, executable flag, rent epoch, raw-data file, SHA-256, context slot and decoded relationship. The original base64 JSON RPC bodies remain unchanged under `rpc/`; each has a separate exact request and provenance record with endpoint, HTTP response headers, host UTC start/end time and hashes. Binary account files under `accounts/` are direct base64 decodings of those responses, with no padding, trimming or field changes.

All captures use the public `https://api.mainnet-beta.solana.com` endpoint and finalized commitment. `getGenesisHash` returned mainnet genesis `5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d`, matching the repository's original-program capture.

| Snapshot | Context slot | Host receive UTC | Contents |
|---|---:|---|---|
| `active-accounts` | 461063670 | 2026-10-25 01:02:48.237880 | One recent family plus shared accounts and Clock; state status 1, deadline not elapsed |
| `burn-batch0-accounts` | 461064010 | 2026-10-25 01:04:02.924095 | All five completed families named by the first historical burn batch; shared accounts, payer, Clock and three programdata accounts |
| `boundary-accounts` | 461064598 | 2026-10-25 01:06:05.663356 | Three eligible unburned families, shared accounts, payer and Clock, in one response |

The captured Clock in the eligible snapshot has slot **461064598** and unix timestamp **1792890365**. All three states are **106 bytes**, have status **1**, burned amount **0**, correct Mayhem ownership/discriminator, and elapsed deadlines:

| Mint | Mayhem state | Deadline | Vault amount, raw units |
|---|---|---:|---:|
| `2gURYNuuorC24zLSPGnmCPRCgxwxFRA85YSsFisMpump` | `5z2nEFHkoLThBCQx1e3dcMwh7sqsbDakGh9H1fX6Re3T` | 1792889371 | 2,894,293 |
| `65bGTX3rZfgN2TLBw2NwSApeeTPXnwL4nb32Lx6Gpump` | `2db9dT2LiFTGWpTJVyvWF5xeXLSyKio86A6XtHCM1P5B` | 1792889840 | 979,278,522,536,693 |
| `GdAewvFBHyq5dxeJwrRNFXuBFbt5EjmG9JydcLixpump` | `9fQXHAPGDUagkSWZfpbdLF7PMacQ2yjtgyMSKYpDUMvY` | 1792889383 | 6,525,568 |

The analyzer independently verifies canonical state/SOL-vault/curve/event-authority PDAs, the mint-specific Token-2022 ATA, state and token-account mint agreement, token authority = SOL vault, correct account owners, initialized mint/account states and mint supply >= vault amount. The complete Token-2022 extension bytes are preserved; these static checks do not establish every runtime token-program condition or transaction success. The mint supply in each eligible family is 2,000,000,000,000,000 raw units. All have genuine Pump bonding-curve data and correct Pump ownership. These are actual returned accounts, not state inferred from token balances.

The Mayhem event-authority address `8FoNgzmjuSmiy86EPCWxvv1q7oJSu2WGA7wPymwki2LJ` is **absent/null** in all three current snapshots. That absence is preserved. The successful historical messages nevertheless reference it, as does their self-CPI. No dummy event-authority account was manufactured.

For the eligible states, subsequent finalized `getSignaturesForAddress(limit=1)` reads returned latest records at slots 460655084, 460655572 and 460660250 respectively, approximately a day before acquisition. The returned records include two failed trading-era transactions and one success. No raw signed burn naming these three states was recovered in this bounded search. These statements concern the retained observation times, not their future live status.

## Intact historical burn transactions

All four raw transactions are **1,199-byte version-0 messages with one ordinary fee-payer signature and no address-table lookups**. Each has two Compute Budget instructions followed by five no-argument Mayhem BurnTokens instructions. The sole signer is the on-curve public key `Gygj9QQby4j2jryqyqBHvLP7ctv2SaANgh4sCb69BUpA`; no BurnTokens account is marked as an outer signer. The original message bytes, recent blockhash and signature are retained unchanged. `solders` verifies all four Ed25519 signatures.

| Batch | Slot | Block UTC | Transaction SHA-256 |
|---:|---:|---|---|
| 0 | 461023006 | 2026-10-24 22:39:01 | `6820054226894e8f35497298fb40f911c17aa565fb9964bfbbfeb0279b9eca7b` |
| 1 | 461023012 | 2026-10-24 22:39:02 | `479f090d10387c0d882024d5d7edd1a8e246b1c027db98b561daacfd64af7722` |
| 2 | 461023070 | 2026-10-24 22:39:14 | `aca8490181c6c2ea548be5c85c035a2639ff11f26331ad11317348270e8a9686` |
| 3 | 461005922 | 2026-10-24 21:38:38 | `ab76e0e6b2cff16c25a9eb1f063e462aaf72b3b5c809991b9a5251cbd2e1d21b` |

Retrievable signatures, in batch order:

```text
2hLLyVdY6XCR4qjvG223odwNzSjNYoyox35TT46BoG2Bc6cgg2UPLuxoD7J66m8eBhXYieQnLxoU8TKHcmkEKi6Z
5WqrxnanuRxbuGz3X22xKkC5wUr6S1541KLvVamesuW6M9pwmi5SDSFueFsyfuA31KuCYEpnxmmEGpPNCXFS84UT
59PyDzwxMUKGRXhYxHm31KtcRvXXdWywy9CR1tbe3miMRR2RXX2ZwnPBNZEXjZo9Gh7knaxzgt3trcV91KQtDrhb
2U1QQg7GBBYkNd71q2vymwxvRjuGtrjfE1tWpZbJJK52C9fnEyGaDpWbQoTEhXo1rChHT9WytR7dsbRH1w8HoRW2
```

Exact wire bytes are `transactions/burn-batch-{0,1,2,3}.transaction.bin`; the corresponding signed message is in `.message.bin`. The full unmodified RPC transaction/metadata responses are `rpc/older-state-{0,1,2,3}-tx-0.response.json`.

For every burn, the analyzer checks the twelve account positions and recovered instruction discriminator `4c0f33fee5d77942`, the expected writable flags, the Token-2022 inner Burn instruction (tag 8, amount u64, vault/mint/SOL-vault order), the 88-byte BurnEvent log, and the 96-byte event self-CPI. The log and CPI event payloads agree exactly. Historical pre-token balances equal the burned amounts and post-token balances are zero. RPC reports transaction error null. This establishes the retained message signatures and recorded public execution metadata; these historical signed messages were not locally executed.

Current batch-0 account bytes independently show status 2, zero vault balances and burned amounts equal to those five historical events. They are useful post-state observations, but the later capture slot must not be relabeled as the transaction's immediate post-state or pre-state.

## Code-version alignment

The complete Mayhem, Pump and Token-2022 programdata account bytes captured at slot 461064010 are byte-for-byte identical to the repository's earlier original captures, including their full allocated payloads. The analyzer checks equality against the retained `.bin` accounts and deployed payloads directly.

| Program | Last deployment slot in captured programdata | Payload SHA-256 |
|---|---:|---|
| Mayhem | 452655053 | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| Pump | 458921440 | `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` |
| Token-2022 | 460497271 | `15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d` |

All four historical burn slots fall after those last deployment slots and before both retained program captures. This supports testing against the already captured original deployment, without substituting a different current binary. It does not establish reconstructed-source equivalence. The later eligible-account snapshot has its own context slot; the earlier programdata capture is explicitly retained as a separate observation.

## Replay feasibility and next concrete inputs

There are two distinct paths available for review:

1. **Unchanged historical-message replay:** raw signed transactions are available, and there are no lookup-table dependencies. The missing material is the full raw Mayhem state, mint and vault data immediately before the five burns in a batch, plus historical bank/sysvar context and acceptance of the message's original recent blockhash. Standard retained `getTransaction` metadata supplies token amounts, lamports, events and inner instructions, not full account data or historical mint supply/extensions. The current completed snapshot has status 2 and zero vault balances. Editing those fields backward would create inferred state, which this lane did not do. The `minContextSlot` request for 461023006 returned context 461064010; it did not fetch accounts as of the historical slot.
2. **Fresh source comparison using genuine eligible state:** the three unmodified eligible account families and their Clock are available now, and all recovered account relationships and body guards check out statically. The burn path itself requires no ordinary account signer, while the token/self-CPI authorities are the program's own canonical PDAs. A future test still needs a separately authorized execution environment, a new valid ordinary fee-payer signature with legitimate payer state, and a supported bank context. No new signed burn message, local bank or funded account was created here. This path is a new controlled comparison, not a replay of one of the historical signed batches.

The active snapshot predicts body error 6005 (deadline ahead of Clock), and the completed snapshot predicts 6004 (ended status), if their account parsing succeeds. These are static predictions only; they are additional genuine rejection-state inputs, not executed test results.

The unresolved historical pre-state gap is concrete: acquire an archival account-write snapshot for the exact transaction boundary, or preserve an already observed genuine eligible snapshot through a later naturally occurring public burn and verify account-write continuity. No future monitoring was scheduled and no live burn was triggered.

## Discovery bounds and reproduction

Existing repository/imported captures were inspected first. `localnet/evidence/mayhem-summary.json` explicitly identifies synthetic admin fixtures; these were not promoted to public burn evidence. Imported config/AMM fixtures contain public Pump/Fees/AMM data but no recovered raw Mayhem-state family. `local-input-inventory.json` records reviewed paths/hashes and scopes.

The public search first sampled ten recent Mayhem transactions, which were trades. A single historical block at slot 460600000 exposed four older state addresses; their latest transaction records supplied the four burn batches. A second deliberately chosen block at slot 460655000 exposed the three eligible families near the 24-hour boundary. Discovery blocks contain other public transactions and are retained as raw provenance; no unrelated program transactions were executed. The first historical-block read requested max transaction version 0 and received an explicit version-1 error; its response remains saved alongside the successful version-1-capable read. The selected burn messages themselves are version 0.

Read-only RPC behavior follows the official [signature-history](https://solana.com/docs/rpc/http/getsignaturesforaddress), [transaction](https://solana.com/docs/rpc/http/gettransaction), and [multiple-account](https://solana.com/docs/rpc/http/getmultipleaccounts) APIs. `rpc_read.py` allowlists read methods only and records requests/responses without overwriting prior captures.

Reproduce offline checks from repository root:

```sh
work/test-env/bin/python work/mayhem-burn-fixtures/analyze_fixtures.py
work/test-env/bin/python work/mayhem-burn-fixtures/verify_fixtures.py
```

These commands make no network request and execute no program. The manifest is evidence and a feasibility boundary, not a safety assessment, deployment approval, or exact-equivalence claim.
