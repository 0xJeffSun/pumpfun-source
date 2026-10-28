# Mayhem CPI abort boundary and actual error references

This independently qualifies the unchanged candidate from
[PR330](https://github.com/lalalune/pumpfun-source/pull/330), commit
`ea2b4e13db1c4e3d81836a4bdacbf312697d74d1`. That packet preserves a closer
BuyV2 body and explicitly leaves CPI error callback execution unproved.
This follow-up checks two separate questions: the actual references in the
replacement-error block, and what happens when a real downstream transfer fails.
It adds no reconstructed contract source, native compilation, new complete
original-window match, or global frontier promotion.

## What the local execution establishes

The original and PR330 candidate each execute eleven normally signed BuyV2
transactions: native SOL, ordinary Token and Token-2022 quote families, each
with a successful control, frozen base destination and underfunded quote source.
The two token quote families additionally freeze the quote destination.
The canonical fixture, captured Pump/Fees/token programs, signers and authority
checks are unchanged. These are synthetic initial accounts, not live-chain tests.

| Case | Families | Observed result |
| --- | --- | --- |
| Control | All three | Base transfer of 100,003,404 and quote transfer of 2,796 succeed |
| Frozen base destination | All three | First token CPI fails with 17 |
| Underfunded quote source | All three | Base CPI succeeds; subsequent quote CPI fails with 1 |
| Frozen quote destination | Token and Token-2022 | Base CPI succeeds; subsequent quote CPI fails with 17 |

There are **11 pairs, 22 signed transactions, 44 verified signature fields,
three successful pairs and eight rejected pairs**. In five pairs the nonzero
base-token transfer reports success before the quote transfer fails. Every
failed transaction restores every watched non-payer account, including both
token balances, the bonding curve and Mayhem accounting. Only the two-signature
payer fee of 10,000 lamports remains. Successful controls independently debit
and credit the decoded transfer amounts.

The verifier parses a balanced invocation stack from unfiltered logs and binds
every nested invocation, program, depth and outcome to the actual compiled
inner instruction. It decodes real TransferChecked/System transfer data and
account indices, rather than inferring a transfer from a label or case name.
Ordinary Token's captured program can omit an `Instruction: TransferChecked`
log; the checker still derives the instruction from its actual payload.
All compared states, errors, CPI data, returns and non-compute logs agree.
Raw compute differences remain in the receipts.

The observed leaf failure propagates through Pump and Mayhem as **1 or 17**.
It does **not** become the replacement error **6008**. Therefore these successful
failure/rollback checks do not qualify the replacement callback's execution,
even though they enter Pump and can complete a prior token CPI. This is a
bounded observed output result, not an instruction-PC trace or a proof that
every possible error callback is unreachable. It does not change an existing
callback-coverage claim: PR330 already stated that limitation correctly.

## Separate static result

The complete 832-byte O0189 entry wrapper and its actual call at offset 760
bind original BuyV2 at 140512 to candidate 69080. BuyV2 itself remains unequal:
18,648 original bytes versus 18,376 candidate bytes.

In that actual handler, the checker reads the selected enum discriminant 8,
error-code store 6008, nearby byte/word stores, filename and line operands, and
the **actual referenced 48-byte formatter vtable**. Its size/alignment are 24/8.
All four method pointers, together with three actual direct calls in the error
construction block, lead to **26 complete normalized function pairs and 38
ordered direct-call edges**. Every edge follows its actual encoded target;
matching bodies somewhere else in the binary are insufficient. The allocated
sections of the executed stripped image and symbol image also agree.

The Source discrepancy is retained: original `pump_interface_v2.rs:376` versus
candidate `buy_v2.rs:101`. Other nested data references, indirect dispatch,
the complete error object and all paths through the unequal handler remain
unproved. This bounded vtable/call result is separate from callback execution,
the earlier allocator closure result, and whole-ELF identity.

## Reproduce and falsify

With the repository's Python 3.12 / solders 0.27.1 environment:

```sh
python -B research/mayhem-cpi-abort-proof/verify.py
python -B research/mayhem-cpi-abort-proof/test_verify.py
python -B research/mayhem-cpi-abort-proof/reproduce.py --output /tmp/mayhem-cpi-new
python -B research/mayhem-cpi-abort-proof/verify.py --runtime /tmp/mayhem-cpi-new
```

The first command rechecks retained evidence; reproduction requires an absent
directory and really executes new transactions. Its command, interpreter,
extension hash, environment and exit status are recorded. The forwarding
observer verifies all six actual program-account data hashes at load and
before/after each send. It changes no VM authorization or CPI implementation.
Eight in-memory negative controls reject leaked balance effects, missing prior
transfers, fabricated callback status, forged loader hashes, missing success
outcomes, wrong error stores, wrong vtable targets and changed method bodies.
Original binaries, public outputs and prior evidence are never mutated.

Executed candidate SHA-256:
`4c77fa48d44282c7b7c97580622bff00f5a570e5ba537d1b43376c70c36e7be4`.
Symbol SHA-256:
`7e317f633be8605eed4eedc905e3d7a95edd1a51d635ed2c49503f46ecdfded0`.
Original Mayhem SHA-256:
`a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.
Build credit remains with PR330. No new unique-fixture count is claimed.
No intermediate snapshot is injected into a child CPI, no callback is replaced
by a mock, and no universal atomicity or production-reachability claim is made.
