# CTO wallet-effects source gaps

Static recovery and independent review at baseline b4e344536977d45e982259f1d7690c751c57b423 close the ordinary eligibility flag through all six current wallet uses and original collection/withdrawal/event gates. The original r6 eligibility bit is later reused as a context pointer; downstream V/A flags are distinct. The proposed global wallet/shared-order/two-constructor correction remains unapplied and unbuilt.

Five concrete gaps remain: token-wallet ATA prelude order, explicit WSOL native selection, native recipient rent gate, native event quote bytes, and shared frozen-positive-balance 6093 rejection. Exact complete35-body evidence, branches, scalar operations, proposal, raw ledger and independent review are retained without mutation. Transitive CPI, syscall, borrow, OOM, cleanup, ABI and whole-handler equivalence remain open. These findings do not certify the current main source or any newly promoted artifact.

Recompute from a checkout with the named historical baseline's source and captures:

```
python3 -B repro/pump/cto-wallet-effects-static-20261025/verify.py --repo .
```

The root verifies exact package seals and runs both unchanged saved-byte checkers. No compiler, probe, fixture, transaction or runtime executes. Future implementation must compose all disclosed effect gates before making a whole-wallet claim.
