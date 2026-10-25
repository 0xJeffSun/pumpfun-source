# Future normal-operation validation matrix

No runtime cases, fixtures, transaction messages, signatures, executable tests, builds or program executions were created or performed. These are review criteria for a future parent decision, not authorization to execute them now.

| Normal-operation family | Future observation | Acceptance criterion |
|---|---|---|
| Existing ordinary empty-remaining native creation | Initialization account states and event | Frozen context, ordinary CPI effects and native seed remain supported |
| Existing whitelist and quote-control entry routes | Chosen seed, configurable-fee flag, quote ATA behavior | Same intended bypass; owner validation follows selection |
| Native-root trading chains of each admitted length 1..5 | Consumed group positions, output seed and stored/emitted depth | Exactly n records, reverse fold, one rescale |
| Canonical migrated Pool at immediate, intermediate and terminal positions | Pool authority/PDA, stored vault keys, actual balances | Real Pool variant uses base balance and signed-adjusted quote balance; 4+n+3m consumed |
| Mixed ordinary Curve and Pool chains | Selection and arithmetic trace | Nearest-first decoding and root-first conversion, no repeated initial/final rescaling |
| Supported historical curve account lengths | Decoded values and zero defaults | Match documented compatibility dispatch; valid bools and suffix tolerance |
| Trading conversion crossing normal completion threshold | Completion cost, remainder and migration pool amount | Floor-plus-one, saturating remainder, <=1 early return, fee subtraction order |
| Legitimate wide intermediate amounts | Full intermediate arithmetic and final stored u64 | No early u64 narrowing or intermediate-zero rejection |
| Ordinary positive/negative Pool quote adjustments with valid result | Adjusted u128 quote used for pricing | Checked signed addition and nonnegative successful result |
| Normal terminal native root | Account 3 borrow lifetime/order | Control data borrowed before record selection even without lookup |
| Normal initialized contexts, including rent top-up variants | CPI data/metas, owners, serialized curve/event | Retained framework hypotheses match original ordinary behavior and order |
| Already supported Token-2022 quote creation | Existing decoder/CPI acceptance | Parent separately establishes inherited extension and initialization contracts; no expansion of stopped research lanes |

Review absent positional-depth/trailing-count checks statically against the retained caller and walk evidence. Do not turn this matrix into adversarial malformed-account probes or changed historical messages. No count or acceptance gate changes until the parent independently reviews evidence and decides subsequent work.
