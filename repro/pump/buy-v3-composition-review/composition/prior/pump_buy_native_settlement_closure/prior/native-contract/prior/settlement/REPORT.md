# Pump ordinary route settlement — O3 continuation

A partial static closure of settlement, with new fee-accrual, Tokenkeg amount-adapter, event-object and return-layout results. **No complete settlement implementation or source patch is supplied.** The post-reserve caller order is established at explicit call boundaries; transitive transfer, event serialization and account-identity obligations remain. No runtime mismatch or exploit is asserted.

Source checkpoint: `517d77db988d8c63b6cf476f0be138c5a4f3128a`. Original Pump ELF: SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`, Git blob `85cb0059f2814c86224fdfea778c56df770dd920`. All byte intervals below are ELF file offsets, end-exclusive. `provenance.json` supplies full hashes and Git identities for every frozen source object and exact slice ranges. Function labels here describe observed interfaces; bounded windows are not historical symbol extents.

## Admission and evidence

The root-reviewed `followup-results/pump_route_arithmetic` package identifies the original route body at `0x5b3b0` and the specific O3 edges `0x5d8b8 -> 0xa1bd8` and `0x5e6a8 -> 0x8bbd0`. Its whole manifest was checked against its files before collection; its unchanged report, result, provenance and seal are copied. That inherited identity is the basis for reading this route, rather than guessing an instruction from proximity. The current source is read only as the frozen Git blob, not as a historical function-name authority.

New dependencies were admitted before interpretation from the established caller ABI:

- `0xa1bd8`: receives result buffer, the reserve-state pointer, configuration pointer, and two selected fee amounts at `0x5d828..0x5d8c0`. Internal state arithmetic; no handler dispatcher was followed.
- `0x8bbd0`: receives result-object buffer, the same state and configuration, zeroed context, and a stack argument record at `0x5e450..0x5e6b0`. Internal event-object producer, not an instruction handler.
- `0x950e0`: established amount adapter invoked with the route's `fp-0x818` record and an amount. Its `0x95100 -> 0x94e28` dependency is admitted solely for the record-tag-zero branch. The nonzero-tag branch is not followed.
- `0x94908`: the route's producer of that record, explicitly called at `0x5b948`. Only its owner comparison and non-extension return are interpreted. The equal-owner branch is not followed.

No excluded instruction body, extension implementation, new fixture or runtime execution was used. Transfer callees and event serialization callees below are recorded as call edges, without reading their bodies or assigning unsupported historical identities. The initial mechanical CFG extractor ran past apparent terminal panic/allocation calls into adjacent instructions. Those overextended windows were discarded; final windows use explicit excerpt boundaries, with no closure claim or semantic reliance on the adjacent instructions. Existing prior packages and their errors/corrections remain unchanged.

## Tokenkeg amount path: identity, not a fee deduction

The 32 bytes `0x1b5ca8..0x1b5cc8` encode `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`. The owner comparison at `0x94918..0x94958` branches on inequality to `0x94b00`, which writes four zero words, then exits through `0x94d90`. For an admitted Tokenkeg-owned account, this is the non-extension path. It is not a general account-validation proof: the inequality alone also includes other owners, whose rejection must be established upstream.

The route copies those four result words to `fp-0x818..fp-0x7f8` at `0x5b950..0x5b998`; tag 2 instead follows an error path. `0x94e28..0x94e58`, given record tag zero, returns `(2,0)` without entering its nonzero branch. `0x950e0..0x95130` tests that success tag and compares the input amount against the returned zero. `0x95250..0x95270` subtracts zero, writes `(2, input_amount)` and jumps to the exit at `0x95358`.

Consequently the adapter is locally an identity on this branch, including amount zero. This closes the ordinary Tokenkeg-only adapter obligation left in O1 without reading extension logic. It does not close the upstream five-account parser or all owner checks.

## Accrual contract and exact local error order

Use `C = *(fp-0xab8)`, `G = *(*(fp-0xa48))+8`, `P = *(fp-0xaf8)`, `F = *(fp-0xb00)`. The latter two are fee **amounts**, not rates. At `0x5d808..0x5d848`, the caller separately saves `(P,F,first_rate,second_rate)` into `fp-0x730` for the event. The first accrual call is `accrue(out,C,G,P,F)`.

`0xa1bd8..0xa2188` establishes this conditional source-level arithmetic contract:

```
buyback = 0
if C.byte[0x9a] == 0:
    product = wide_multiply(G.u64[0x418], P)
    require product.high <= 9999       // terminal-call path on failure
    buyback = wide_divide(product, 10000).low
    require P >= buyback              // terminal-call path on failure
    P -= buyback
C.u64[0x78] = checked_add(C.u64[0x78], P)  // first check and store
C.u64[0x70] = checked_add(C.u64[0x70], F)  // second check and store
return (tag=2, buyback)
```

This is a contract transcription, not a source patch. `wide_multiply` and `wide_divide` retain O1's unclosed primitive contracts (`0xa1c38 -> 0x1b55c8`, `0xa1c78 -> 0x1b4088`). Conditional on those contracts, buyback is `floor(G[0x418]*P/10000)`. There is no ceiling adjustment. The high-limb bound precedes division and the subtraction check precedes both accrual stores. The guard byte is reported by offset; no excluded-mode body is interpreted to assign it a new domain meaning.

The first store is `0xa1cf0`; second is `0xa1ff8`. The first overflow reaches numeric code 6024 at `0xa1f90`, with source-line constant `0x9f6`; the second reaches code 6024 at `0xa2090`, line `0x9fa`. Complete constructor/serialization semantics remain open. The high-limb failure calls `0x1ace18` at `0xa2150`, with the exact 35-byte text `buyback fee is at most protocol_fee`. Subtraction failure calls `0x1ac528` at `0xa2180`, with the exact 38-byte text `buyback_fee never exceeds protocol_fee`. Neither is proved here to be a recoverable Anchor error. Referenced descriptor bytes are copied, not recursively interpreted.

For ordinary noncompleting buy, `0x5dbf8..0x5dc10` sets `fp-0xa98=0`; for the ordinary sell continuation `0x5d7f8..0x5d808` does so. Thus `0x5d8f0` skips the second accrual call at `0x5d968`. The skipped call and its state rewrites are not generalized to ordinary settlement. Its initial return accumulator `r9` is zero. The first buyback is `r6`; `r7=r6+r9` is checked at `0x5d990..0x5d9c8`. Overflow calls `0x60670` at `0x5dfc0` before the amount-adapter calls. Those calls process total buyback then second-leg buyback (`0x5d9f0`, `0x5da48`), store them at `fp-0xa80` and `fp-0xad0`, and compare the former against the latter. Failure calls `0x60878` at `0x5daa0`. For the admitted ordinary Tokenkeg branch these are `(buyback,0)` and the comparison succeeds.

## Flag zero and suppression of final output

Keep two independent predicates: `flag&1` is saved to `fp-0xad8` at `0x5c480..0x5c498`; the transfer-enable value is copied from the caller stack `-0xfe0` to `fp-0xa88` at `0x5b478..0x5b488`. The latter's full outer-caller meaning is not re-proved by this package. “No final transfer” here means exactly that it is zero.

- Sell reserve success reaches `0x5d440`. For non-native quote and nonzero transfer-enable, it calls `0x8eda0` at `0x5d518` and tests tag 2 before accrual. Zero transfer-enable branches `0x5d470 -> 0x5d7e8`, bypassing this output-transfer call.
- Buy reserve success reaches `0x5e0b8`. Nonzero transfer-enable calls `0x93050` at `0x5e1d0` and tests tag 2 before accrual. Zero branches through `0x5e0c8..0x5e128 -> 0x5d808`, bypassing it.
- After accrual and adapter checks, `flag&1 == 0` at `0x5e1f8..0x5e208` bypasses the buyback-transfer branches (`0x5e398 -> 0x940c0` for non-native quote; native path `0x5eb68 -> 0x58f58`). It does not bypass accrual or event construction.
- For non-native quote, `0x5e220` then jumps directly to `0x5e3b8`, bypassing the native-output branch as well. For native quote, an additional direction and transfer-enable gate exists at `0x5e228..0x5e258`; its called body was not followed.

Flag zero makes selected ordinary fee amounts/rates zero subject to successful prior selection and arithmetic, as established in the inherited report. Combined with transfer-enable zero and non-native Tokenkeg quote, both ordinary output-transfer calls and the buyback transfer are absent. Accrual still executes, including its wide arithmetic on zero P when the guard byte is zero. The event and return paths still execute. This is not evidence of a new flag-zero runtime observation.

## Post-reserve operation/error precedence

For the ordinary noncompleting path, the caller order is:

1. Reserve result tag must be 2 (`0x5d428..0x5d440` sell; `0x5e080..0x5e098` buy). The inherited reserve order is virtual base, real base, virtual quote, real quote, with each store after its own check.
2. Conditional final output transfer and its result check, as above. All argument-loading instructions are retained at `0x5d478..0x5d540` and `0x5e130..0x5e1f8`. Their bodies and complete CPI/error ABI remain unclosed.
3. First accrual call/result check; skip second call under ordinary `fp-0xa98=0`; checked buyback sum; first adapter result check; second adapter result check; adapted-amount comparison.
4. Conditional buyback transfer/result check, then any applicable native output path/result check. Flag zero with non-native quote skips these.
5. `0x5e3c8 -> 0x1a0938`; a zero result tag continues at `0x5e450`, otherwise `0x5e430 -> 0x19bbb8` converts the result and returns through `0x5dac8`. The call is consistent with the source's clock acquisition, but its body is not consumed; the returned word at `fp-0x6a8` is passed to the event.
6. Event-object production at `0x5e6a8`, followed by calls at `0x5e6c8 -> 0x1624b0`, `0x5e708 -> 0x1a04f8`, `0x5e760 -> 0x1624b0`, `0x5e800 -> 0x12ae8`, `0x5e830 -> 0xd4c0`, `0x5e8e8 -> 0x1a78e0`, and `0x5e9e0 -> 0x1a0530`. These edges are not a proof of exact log/CPI wire bytes. The final call's sentinel comparison is at `0x5e9e8..0x5ea10`; failure converts at `0x5ebc0` before returning an error.
7. After cleanup, the state-view word `(*(fp-0xab0))[0x58]` is tested at `0x5ea90..0x5eaa8`. Nonzero follows the noncompleting return path; zero leaves this scope. Then select direction-dependent key/vault and write the return object.

This is exact caller-local precedence, not complete nested-error precedence. Failed transactions are not claimed to commit intermediate state writes.

## Event object: grounded producers

Let `E` be the output object of `0x8bbd0`. It is an in-memory object, not the serialized TradeEvent wire layout. The route supplies an exact `multi_hop_swap` string, 14 bytes at `0x1b6ec8`, through stack slots `-0xfc0/-0xfb8`. It supplies `fp-0x730` at `-0xfd8`, `(adapted_total-adapted_second)` at `-0xfd0`, the residual amount in `r8` at `-0xfc8`, and the clock-candidate word at `-0xfb0`. The subtraction is dominated by the earlier comparison.

| Object field | Producer | Evidence |
|---|---|---|
| +0x00/+0x08/+0x10 | string length / allocated pointer / length | 0x8bcb8..0x8bed8; 0x8c138..0x8c158 |
| +0x50 | quote amount iff state bytes +0x20..+0x40 are zero; else zero | 0x8bc18..0x8bca8; 0x8bf80..0x8bfc0 |
| +0x58 | caller base amount at stack -0xfe8 | 0x8bcf8..0x8bd08; 0x8bf50..0x8bf60 |
| +0x80 | caller clock-candidate word | 0x8bcb8..0x8bcc8; 0x8c048..0x8c058 |
| +0x88/+0x98 | virtual/real quote reserves, zeroed for nonzero quote key | 0x8bc00..0x8bc18; 0x8bff8..0x8c048 |
| +0x90/+0xa0 | state +0x40/+0x50 | 0x8bdb8..0x8bdd8; 0x8bfe8..0x8c028 |
| +0xc8/+0xd0 | first rate / first fee amount | 0x8bd78..0x8bdb8; 0x8c058..0x8c078 |
| +0xd8..+0xf8 | state first 32 bytes | 0x8c0b8..0x8c0f8 |
| +0xf8/+0x100 | second rate / second fee amount | 0x8bd78..0x8bdb8; 0x8c158..0x8c178 |
| +0x138 | G[0x418] when state byte +0x9a is zero, else zero | 0x8bed8..0x8bef0; 0x8c1b0..0x8c208 |
| +0x140 | adapted_total minus adapted_second | 0x8bcd8..0x8bce8; 0x8c1f0..0x8c200 |
| +0x148..+0x168 | state quote key +0x20..+0x40 | 0x8c220..0x8c260 |
| +0x168/+0x170/+0x178 | quote amount / virtual quote / real quote, without native masking | 0x8c290..0x8c2c0 |
| +0x190/+0x198 | state accrual +0x70 / caller residual amount | 0x8bf18..0x8bf28; 0x8c260..0x8c280 |
| byte +0x1a0 | direction predicate (caller comparison == 0) | 0x5e468..0x5e498; 0x8bf38..0x8bf50 |

The pointer-copy fields are preserved in the byte evidence; assigning all account-key names still requires O2. The event helper itself allocates/copies the string and exits at `0x8c2c0`; its allocation-failure edge ends at the unclosed call `0x8c2d0 -> 0x1ab198`. There is no local tagged Result check after `0x5e6a8`. This must not be rewritten as a guaranteed infallible end-to-end emission.

## Returned amount, buyback and output-vault selection

At `0x5f508..0x5f570`, returned bytes +0..+32 are the key selected into `fp-0x50`; +0x20 is `fp-0xa70` and +0x28 is `fp-0xa80`. The +0x20 producer is the net sell amount after the identity adapter (`0x5d070..0x5d088`), or the buy base amount plus the ordinary zero extra leg (`0x5dc08..0x5dc58`). Thus ordinary Tokenkeg return amount is net sell quote or buy base output, independent of final-transfer suppression. The +0x28 value is the adapted total buyback, equal to the first accrual buyback in this branch.

At `0x5eaa8..0x5eb38`, nonzero direction comparison selects key `(*(*(fp-0xac0)+0x58))[0..32]` and the vault handle slot at original route argument r4+0x20. Zero comparison branches to `0x5f470`, selects the corresponding `fp-0xaa8` key, and uses the pointer saved in `fp-0xae8`. In both cases `0x5f4d8..0x5f508` loads the selected handle and calls `0x10c78`; `0x5f570..0x5f590` copies 48 returned bytes into output+0x30. The direction matches buy versus sell arithmetic and event `is_buy`, but the exact five-account-to-base/quote-vault naming and clone contract remain O2 obligations. Calling +0x30 a verified arbitrary-route output vault would overstate this evidence.

## Source discrepancy and unclosed prerequisites

Frozen `evidence/source.rs:253-254` precomputes reserve values and fee totals before input transfer at lines 256-261. It orders reserve expressions virtual base, virtual quote, real base, real quote and fee totals creator before protocol. The original reserve stores precede output transfer; its accrual checks/stores protocol before creator after conditional output transfer. Source lines 263-268 assign reserves, optionally transfer buy output, then assign the precomputed accrual values. The source's early checked arithmetic can therefore have different exceptional precedence from the original. This remains a **static discrepancy**, not a demonstrated reachable runtime exploit or failing fixture.

A complete ordinary settlement source hypothesis is withheld for these precise reasons:

- Bind outer caller stack -0xfe0 to its exact transfer predicate, and finish the five-account parser/state-view aliases and selected handle identities. Prerequisite: admitted parser/caller byte slices and their dynamic-field provenance, not arbitrary routes or alias experiments.
- Close the numeric primitives already admitted in O1 before promoting the conditional buyback formula. Bind error constructors and terminal-call behavior if exact error ABI is required.
- For nonzero final-transfer or fee flags, first establish Tokenkeg-only entry gates and all account/seed/amount arguments for `0x8eda0`, `0x93050`, and `0x940c0`; only then inspect permitted dependency paths. This package supplies exact callsites, not their unproved implementation.
- Bind event serializer, logging/CPI construction, invocation and clone dependencies to the permitted event identity and consume the required descriptor/data bytes. The producer layout and caller sentinel are now known, but exact event wire bytes and nested failure order are not.

No source builds, runtime probes, new fixtures, signatures, broadcasts, staging, commits, pushes, parent writes or global changes occurred. Whole-file inequalities and the broader 140/150 bounded-handler status are unchanged.

## Verification

Run `python3 verify.py` from any location. It checks the exact file seal (the manifest excludes only itself), source Git-blob identity, copied prior-file hashes, every retained disassembly instruction against raw slices, decoded direct call/branch targets, selected call/branch and store assertions, and the Token-2022 constant/string bytes. The verifier itself is sealed. It does not execute the program or certify prose. Whole ELF/disassembly hashes were checked during extraction; a bounded package cannot independently bind slices to the absent whole ELF. Copied-directory verification outcome is outside the seal in `verification-outcome.json`.
