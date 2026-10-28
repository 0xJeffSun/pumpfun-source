# PumpSwap fee sweeps: owed fees collectable only by the right party

## Problem

The full-drain packet showed that withdraw leaves the pool's
recorded protocol and creator fees behind in the quote vault. Those
balances are collectable, but only through the sweep instructions
and only by the right party: sweep_protocol_fee moves exactly the
recorded protocol fees to the config's fee recipient, and
sweep_creator_fee moves exactly the recorded creator fees to the
creator-vault PDA. An unsigned payer, a wrong protocol recipient,
and a wrong creator recipient each fail with a distinct error.

## Cases

Five fresh-VM triples (original / #424 control / #427 candidate),
15 signed executions: `sweep_protocol_fee` and
`sweep_creator_fee` with no arguments on the repository's own sweep
differential harness (`scripts/pump_amm_sweep_differential.py`),
using the fixture's real pool balances (protocol fees 2,488,
creator fees 123,394) rather than patched values. The clock is slot
100, epoch 0. `producer.py` reproduces every receipt from the
repository files.

| Case | Result |
| --- | --- |
| sweep-protocol-baseline | recipient ATA gained 2,488, vault spent 2,488, protocol fees left 0 |
| sweep-creator-baseline | recipient ATA gained 123,394, vault spent 123,394, creator fees left 0 |
| sweep-protocol-unsigned | 3010 AccountNotSigner |
| sweep-protocol-wrong-recipient | 6013 InvalidProtocolFeeRecipient |
| sweep-creator-wrong-recipient | 2006 ConstraintSeeds |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the ATA
gain and vault spend against the expected fee, the pool fee field
at zero after a successful sweep, the error code and log fragment,
the recorded error site (6013 at `swap/mod.rs:164` original vs
`:23` control/candidate; 2006 at `sweep_fees.rs:113` vs `:43`),
rollback on the failures, and agreement of amounts across images.
Receipts are stored as parts
(`runtime/raw-transactions-part1/2.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **Sweeps zero the field they collect**: each sweep moves the
  full recorded balance and leaves its field at 0, so a second
  sweep collects nothing.
- **Three distinct authorization failures**: the payer must sign
  (3010), the protocol recipient must match the config (6013),
  and the creator recipient must be the derived PDA (2006).

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- No live transaction was submitted. All executions are offline LiteSVM
  replays with normally signed transactions.
