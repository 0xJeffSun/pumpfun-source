# Stateful Token-2022 fee activation through AMM swaps

This independently checks an uncovered composition property: a reconstructed
AMM must use the active Token-2022 transfer-fee schedule while prior withheld
fees, pool balances and user state persist across transactions. It compares the
captured AMM, maintained 651 checkpoint and unchanged public
[PR319 g02-c726 artifact](https://github.com/lalalune/pumpfun-source/pull/319).
It adds no source recovery, function-match count, native build or promotion.

## Why this scope

The canonical broad matrix normally constructs fresh per-case inputs. Its
`transferfee()` helper writes identical old/new fee records. The retained TLV
decoder probes also include distinct old/new selections at epoch zero; those
already prove useful isolated cases and are not counted again here. This packet
instead keeps one real VM and account state through fee activation, rejection
and retry, and checks each actual Token-2022 CPI against an independent integer
fee calculation. It does not merely compare two programs' final snapshots.

A preceding machine-code screen found that the unmatched 696-byte
`calculate_fee` and 688-byte `amount_before_fee` wrappers differ in by-value fee
copying and SPL helper calls. The public AMM-high progress record already assigns
the 24-byte ABI recovery to another source lane. This packet avoids that rewrite.

## Executed cases

Each profile executes four normally signed `buy_exact_quote_in` transactions:
success at epoch 4, rejection at activation epoch 5 (`min_base_amount_out =
u64::MAX`), retry at epoch 5 with minimum 1, and success at epoch 6. Every trade
offers 10,000,000 quote units. Only the clock and blockhash advance between sends;
account state is never restored or reinitialized. Each profile/artifact gets
its own VM, with transaction history enabled and a distinct blockhash per step.

| Profile | Old (bps, maximum) | New at epoch 5 | Pool-transfer fee before / at / after |
| --- | --- | --- | --- |
| Increase | 10, 1,000 | 100, 2,000 | 1,000 / 2,000 / 2,000 |
| Decrease | 100, 2,000 | 10, 1,000 | 2,000 / 1,000 / 1,000 |
| Activate capped 100% | 0, 0 | 10,000, 123 | 0 / 123 / 123 |
| Disable | 100, 1,000 | 0, 0 | 1,000 / 0 / 0 |

Results across three artifacts: **12 persistent sequences, 48 signed
transactions, 36 successes, 12 slippage rejections and 144 actual quote-token
transfer CPIs**. All 32 candidate/original transaction pairs agree in error,
all message-account states, inner instructions, return data and serialized
events. The rejected transaction charges only its 5,000-lamport payer fee;
all other accounts roll back, then the retry succeeds in that same VM.

The independent checker selects the fee record from the **actual mint bytes and
VM epoch**, and calculates `min(maximum, ceil(gross * bps / 10000))` using Python
integers. For each decoded TransferChecked CPI it checks the sender debit,
recipient spendable credit, recipient withheld increment and overall conservation.
Existing withheld amounts remain in place after both failures and fee disabling.
The `BuyEvent.quote_transfer_fee` suffix equals the actual pool-transfer fee.
The historical captured IDL omits this suffix, so the verifier consumes its
entire typed prefix and requires exactly one additional u64, matching the
already recovered event structure. It does not treat arbitrary trailing data
as an event field.

## Reproduce

With the repository's Python 3.12 environment and `requirements.txt` installed:

```sh
python -B research/amm-transfer-fee-epoch/verify.py
python -B research/amm-transfer-fee-epoch/test_verify.py
python -B research/amm-transfer-fee-epoch/reproduce.py --output /tmp/amm-epoch-new-run
python -B research/amm-transfer-fee-epoch/verify.py --runtime /tmp/amm-epoch-new-run
```

The reproduction command requires an absent directory and performs fresh local
execution; the following command verifies its new receipts. The first command
checks the retained receipts. `runtime/launch.json` records the exact
executed command, working directory, Python/Solders versions and cache settings.
The observer captures actual loader hashes, full signed bytes, real VM identity,
clock, every message non-executable account, unfiltered logs and return/inner data.
Signatures are independently rechecked. The verifier checks continuous account
state between every adjacent transaction, so a reset fixture cannot pass merely
because its original and candidate runs both reset.

Six in-memory falsifiers reject stale/premature epoch selection, withheld reset,
omitted transfer, incorrect spendable balance and corrupted event fee. A separate
fixed-value check covers fee rounding and capping. No original binary, account
capture or published candidate is edited. No RPC or live-chain transaction is used.

## Inputs and limits

Based on `b855ede024ac3bac603405db1d874ee58e651b38`. PR319 public input ref:
`63d108022f6be295d9e8e7f697f3024f4aa44fea`, packet
`research/claude-amm2-integrate-20261027/g02-c726`. The copied candidate and its
README are unchanged public inputs; build credit remains with that packet.

| AMM | Executed SHA-256 |
| --- | --- |
| Original | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| Maintained 651 | `97bd5553c199cd24fb2d07034c365527bee5b138bf5dd7a0aa3099186aad2643` |
| Public 726 | `4e58c47139798d743c325c8ee9c3a98f4fd7cc4ceba2d6a5763e66899c4efd25` |

Captured original Fees, Token, Token-2022 and ATA programs supply the CPIs. Their
actual loader hashes and all fixture/script reads are bound in the receipt and
manifest. The fee formula/epoch-selection reference is the retained SPL Token-2022
6.0.0 source, also hash-bound; this is not a claim to have rebuilt that dependency.

This covers synthetic legacy exact-quote swaps with quote-mint transfer fees,
four schedules and one transition. It does not qualify schedule-update authority,
harvest/withdraw instructions, malformed bps, base-mint fees, other swap modes,
all arithmetic extremes or production-pool reachability. Native source/ABI and
whole-ELF recovery remain unfinished. Full logs remain unfiltered: known Source
file/line and compute-consumption differences are not described as equal. The
two diagnostic-origin regressions reported separately in
[PR328](https://github.com/lalalune/pumpfun-source/pull/328) remain unresolved.
