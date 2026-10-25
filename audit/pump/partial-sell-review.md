# Pump regular-SOL sell reconstruction review

This review covers the partial source candidate and its bounded differential
fixtures. It is not a security clearance for the original program or this
incomplete reconstruction.

The217-case local SBF comparison covers161 reserve/amount scenarios,11 error or
account mutations, and45 explicit protocol/creator/buyback rate combinations.
It checks error results, all referenced account bytes/owners/lamports except the
replaced executable image, and raw emitted TradeEvent payloads. External CPI
programs are the immutable captured binaries. The independently built candidate
also passes the93-case administration regression suite.

Observed constraints recovered during implementation:

- The base token balance is checked before token CPI, returning6023 when short.
- Empty normal fee tiers return6096 instead of indexing an empty vector.
- FeeConfig's wrong program owner returns3007 rather than a generic owner
  constraint error2004.
- A zero creator address suppresses the creator fee payment, but the event still
  reports the configured creator fee basis points.
- Checked underflow in gross output less fees returns6024 and state rolls back.
- Token transfer uses the external mint's decimals through transfer_checked.
  No additional Token2022 extension behavior is claimed from this fixture.

Remaining reconstruction risks include validation order for combinations of
invalid accounts, arbitrary malformed FeeConfig serialization, unobserved fee
rate boundaries, fee-recipient aliasing, zero virtual reserve division, and
additional accounts/extensions. The final eight TradeEvent bytes remain
uninterpreted; writing zero matches the observed branch only. Quote-token,
Mayhem, cashback and holder-reward branches deliberately return an unsupported
reconstruction error and are not counted as recovered behavior. Complete
historical dependency versions and instruction bytes remain unresolved.

The source must not be deployed as a replacement. These are reconstruction
limitations, not assertions that the original program contains those flaws.

## Subsequent normal-SOL buy path

The expanded candidate also implements an existing-ATA regular-SOL `buy_v3`
path, including checked inverse-curve pricing, signed curve-to-user token CPI,
one System transfer of the full purchase cost to the curve, direct buyback
lamport accounting, and curve completion plus CompleteEvent. The250-case suite
includes low virtual reserve arithmetic, maximum-cost boundaries, explicit fee
rates, completion at the real token reserve boundary, and omitted/false/true/
malformed trailing optional boolean data. It additionally compares complete
recorded inner-instruction data and account indices. This does not cover missing
ATA creation, other quote mints, rewards, Mayhem, cashback, or every possible
semantic use of the optional boolean. Both trade instructions remain partial.
