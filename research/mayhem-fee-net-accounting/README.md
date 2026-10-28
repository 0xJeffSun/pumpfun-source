# Mayhem BuyV2: transfer fees, net positions and withheld rollback

This independently qualifies the unchanged Mayhem candidate published in
[PR330](https://github.com/lalalune/pumpfun-source/pull/330), pinned at
`ea2b4e13db1c4e3d81836a4bdacbf312697d74d1`. The existing canonical Mayhem quote
fixtures exercise Token-2022 program ownership but construct a plain quote mint;
they do not install a TransferFeeConfig. This follow-up adds actual extension
state and checks the resulting token custody and Mayhem accounting together.
It adds no contract-source recovery, native build, function count or promotion.

## Why gross and net must stay separate

The actual Pump CPI requests a base transfer of **100,003,404** and spends
**2,796** quote units in these fixed synthetic fixtures. A base-mint transfer fee
reduces the vault's spendable receipt and accumulates in its withheld field.
Mayhem's token position must use that **net receipt**, while its quote position
records the actual quote debit. An ordinary original/candidate comparison alone
would not independently establish this relationship.

| Base fee | Charged fee | Net base receipt | Result on both artifacts |
| --- | ---: | ---: | --- |
| No fee configuration / zero-fee extension | 0 | 100,003,404 | Success |
| 1 bps, uncapped | 10,001 | 99,993,403 | Success |
| 100 bps, uncapped | 1,000,035 | 99,003,369 | Success |
| 100%, capped at 7 | 7 | 100,003,397 | Success |
| 100%, uncapped | 100,003,404 | 0 | Success |

The checker decodes the actual mint TLV records and TransferChecked instructions,
calculates `min(maximum, ceil(gross * bps / 10000))`, and verifies source debit,
destination spendable credit, withheld increment and combined conservation.
The fee-extension cases start with nonzero withheld balances, so resetting them
cannot accidentally pass. Metadata and ImmutableOwner extensions in the plain
captured controls are parsed as TLV entries; they are not misclassified as fees.

Two additional cases hold the Mayhem token-position field at `i128::MIN`:

- With a positive net receipt, the subtraction overflows **after both token
  transfers and Pump succeed**. Mayhem returns MathOverflow and the entire
  transaction restores token balances, withheld fees and accounting.
- With an uncapped 100% base fee, net receipt is zero. The same position stays
  at `i128::MIN`, the transaction succeeds, quote accounting increases by 2,796,
  and the event reports zero received base tokens.

This is a causal check of net-position accounting, not a production reachability
or vulnerability claim. A successful transfer can place its entire amount in
withheld custody under this synthetic configuration; it is not a spendable
receipt for the Mayhem vault.

## Quote-fee rejection is a different outcome

Adding a 1-bps quote fee, with or without a base fee, causes the captured Pump
BuyV2 to reject the fixed quote limit as `TooMuchSolRequired`, before any token
transfer. These two cases are retained as rejections, not described as successful
quote-fee coverage. Both that Pump error and Mayhem's later `MathOverflow` use
numeric code **6002**. The checker therefore verifies the actual error name,
failing program and completed CPI stage, rather than treating the code alone
as sufficient evidence.

## Executed evidence

Ten original/candidate pairs produce **20 normally signed transactions and 40
verified signature fields**: seven successful pairs and three rejected pairs.
The unmodified canonical verifier independently checks all fourteen successful
event/state records, including each complete 303-byte event and self-CPI payload,
and six failed rollback records. Every compared account state, error, inner
instruction, return and non-compute log agrees. Raw logs remain unfiltered.
Only the two-signature payer fee of 10,000 lamports remains after rejection.

The forwarding observer verifies all six actual program-account data hashes at
load and before/after every send. The captured Pump, Fees, Token, Token-2022 and
ATA programs remain unchanged. Original captures and prior evidence are preserved;
extensions are constructed only in the local VM's synthetic starting accounts.
No RPC, live transaction, replacement CPI implementation or signature bypass is used.

```sh
python -B research/mayhem-fee-net-accounting/verify.py
python -B research/mayhem-fee-net-accounting/test_verify.py
python -B research/mayhem-fee-net-accounting/reproduce.py --output /tmp/mayhem-fee-new
python -B research/mayhem-fee-net-accounting/verify.py --runtime /tmp/mayhem-fee-new
```

Use the repository's Python 3.12 / solders 0.27.1 environment. Reproduction requires
an absent directory and executes new transactions; ordinary verification reads
the saved receipt. Launch/result files retain actual commands, interpreter and
extension hash. Seven in-memory falsifiers reject gross-position accounting,
floor rounding, an ignored cap, lost existing withholding, withheld leakage on
rollback, a forged error stage and a false loaded-program hash.

Executed candidate SHA-256:
`4c77fa48d44282c7b7c97580622bff00f5a570e5ba537d1b43376c70c36e7be4`.
Original Mayhem SHA-256:
`a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.
Source/build credit remains with PR330. This packet does not resume the stopped
Pump SellV2 corrective probe. It covers only BuyV2, fixed amounts, static equal
old/new fee schedules and these synthetic positions. Fee-authority changes,
withdrawal/harvest, arbitrary TLV combinations, production reachability and the
remaining source/whole-ELF differences are outside the result.
