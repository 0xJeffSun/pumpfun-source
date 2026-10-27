# Fees: restore native-only Crank work and retain strict compute differences

The original Crank compares the quote mint before cloning the donation account
and reading Rent. Its zero-amount exits have separate native and non-native
lifetimes. The previous current source performed the clone/Rent work for every
quote mint. This experiment restores the observed branch order and scoped
account lifetime on the complete 552-window source from PR #195.

The disabled/zero messages and ordinary overflow-error conversion overlap the
independently published PR #197. They are credited there; its older 550-window
source is a separate dataset. The additional contribution here is the native
branch/lifetime reconstruction and independently retained evidence on the latest
source. No new complete instruction body is recovered.

| Bound artifact | Strict raw equality | Application-log differences | Nonlog differences |
| --- | ---: | ---: | ---: |
| PR #195 control | 0/304 | 292 | 0 |
| Messages alone | 0/304 | 0 | 0 |
| Native branch/lifetime | 292/304 | 0 | 0 |
| Native flow plus ordinary overflow conversion | 292/304 | 0 | 0 |

Every report compares every retained field, including unmodified raw logs and
transaction bytes. **The final proposal still fails 12 strict comparisons.**
All their differing lines describe runtime compute consumption or remaining
budgets. The checker keeps these failures and separately derives application-log
and nonlog classifications; it never normalizes or overwrites the receipts.
The matrix has 256 flag cases plus 48 native/non-native, amount, ATA and whitelist
combinations. Twenty-six fixtures retain nonempty inner-instruction traces; the
serialized records agree in all variants. This finite trace equality does not
prove unrecorded privileges, exhaustive CPI behavior or protected settlement.

All four artifacts retain 405 unique structural pairs, 552 normalized original
counterparts, 33 unmatched windows, 591 candidate windows, 64 unique raw-equal
pairs and 118 total raw-local counterparts. All 163 decoded Location uses agree.
The 3249 observed direct edges remain; all previously equal callee shapes remain
equal. Exactly one previously unequal edge changes with the business body:
dispatcher656832+464 still targets the corresponding unmatched Crank body147944.
It remains unequal. The full original 15976-byte Crank body is not recovered.

The reader separately binds both application-message byte ranges and their
encoded `sol_log_` calls. It preserves the decoder owners/message, slice/common/
buyback/relay contracts and SyncNative helper/discriminant proof. These selected
contracts are not exhaustive transitive or indirect-call semantics.

Only the real `donation.rs` crank function changes. Every other one of the 42
inputs, and every byte outside that function, stays unchanged; later source line
positions are preserved. Root program namespaces, generated program types,
context declarations, events and dependency selections remain unchanged. This is
a reproduction of observed behavior, not authenticated historical source text.
This is a pinned PR #195 comparison, not a claim about the latest global
frontier. Later initializer-wrapper and PR #200 admin-body recoveries are not
measured in this packet; they retain their own source/artifact scopes.

Three fresh canonical Linux v1.44 root builds retain all 42-input maps, source
overrides, actual logs, symbol/stripped outputs and strip replays, using the
canonical target, cwd flag and three math-path remappings. Control build evidence
is explicitly reused from the exact PR #195 artifact. No receipt is retagged.

The final candidate freshly passes 17331 comparisons across 18 frozen suites,
1542 exact query outcome/log/compute comparisons, five 24/32/20/8/30-case matrices,
16 relay cases and 157 strict social cases. Their existing comparison predicates
and coverage limits remain intact. The intermediate native-flow artifact also
retains its own fresh 17331/1542 receipts, with its own candidate hash; it is not
silently substituted for the final build. No fresh native decoder-test or
authentic fixed-admin FeeConfig initialization VM claim is made.

```sh
python3 -I -B research/fees-crank-native-order/verify.py
python3 -I -B research/fees-crank-native-order/test_scope.py
```

Normal and minimal isolated standalone checks, six mutation tests and whitespace
checks pass. The separate saved-signature checker validates 2432 retained records
containing two unique signed payloads, using solders0.27.1 without a VM or RPC. `parents.json` seals exactly the 65 needed files of the published
parent. The unchanged set of 187 harness scripts is checked. Historical P27 guard
results retain their f8582fbd1 scope; no later branch guard pass is claimed.
Selected programs, checkpoints, workflows and ledgers are unchanged.

Final candidate: 871256 bytes, SHA-256
`0c9fec3e80398e6f6e022a97a4fbbfeb6e0a97e66f3179594d7388fb5301e36c`.
Raw comparison of the four stored selected artifacts and this fresh Fees ELF
still fails against the full captures and meaningful ELF extents: whole core
identity remains **0/4**. The other three core programs were not freshly built.
