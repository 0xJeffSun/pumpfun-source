# Pump partial SOL trade recovery

The current independently built candidate implements partial SOL `buy_v3` and
`sell_v3` paths. It passes 334 buy, 301 sell and 93 administration cases against
the captured original. Tests compare errors, involved account bytes/owners/lamports
and raw events; the buy suite additionally compares complete recorded inner CPI
instructions. Captured external programs execute in the fixtures. This is bounded
behavioral agreement, not complete source identity or a security sign-off.

The buy path includes inverse-curve pricing, signed curve-to-user token transfer,
one System transfer of the full cost to the curve, direct buyback lamport accounting,
and completion with its CompleteEvent. Tests include reserve and maximum-cost
boundaries, fee-rate combinations and omitted/false/true/malformed optional boolean
data. The existing user ATA is required by this reconstruction; creation behavior
remains unrecovered.

The sell path checks the user's token balance before CPI (6023), rejects empty
normal fee tiers (6096), checks FeeConfig ownership (3007), and returns 6024 for
checked subtraction failure with rollback. A zero creator suppresses its payment
while the event retains the configured creator fee basis points. Token transfers
use the mint's decimals through TransferChecked.

Allocation-aware FeeConfig parsing maps tiny malformed buffers to 3001/3002/3003
and an otherwise decoded 2,511-byte account to 6097. Legacy accounts begin at
2,512 bytes; stable schedules are consumed at 4,073 and exotic fees at 4,097.
Mayhem SOL trades use normal fee tiers and suppress buyback. Holder-reward SOL
trades populate holder fields from the creator fee, retaining accrued fees in the
curve. V3 cashback coins explicitly reject with 6094. Tests include combinations
of these flags, fee rates and invalid recipients.

Quote-token trading, missing ATA creation, every token extension combination and
all malformed-account/aliasing cases remain incomplete. The last eight TradeEvent
bytes remain uninterpreted; zero matches the tested paths only. Historical compiler,
dependency graph and instruction-byte identity are unresolved. The whole-file
comparison still differs, and the candidate must not replace the deployed program.
No original-program vulnerability follows from these reconstruction limitations.
