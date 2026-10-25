# BuyV3 residual-pool and pricing continuation

This packet recovers the ordinary arithmetic around original `0x82af8` and provides an **uncompiled, unintegrated source hypothesis**. It does not replace BuyV3, remove its current domain fence, establish preservation, or add a handler or runtime receipt. The 117 retained BuyV3 rows remain obligations. No compiler, target VM, transaction, fixture, network request or main-source edit was used.

The concrete source correction to the earlier ordinary fragment is to consume the already-selected `(S,D)` instead of recomputing `min(A,R)` and `A-S`, use explicit checked `(n+d)-1` ceiling, keep distinct arithmetic failures and compared-value order, and preserve the cost helper's exact sum order. First quote remains **floor plus one**, not ceiling. `source/proposal.patch` is a diff against the copied historical explanatory fragment, **not an applicable main-program patch**. The source uses logical errors; full Anchor origin/allocation/error-lowering is explicitly unimplemented. No captured historical path or line is spoofed in source.

## Frozen inputs and method

Original full allocation: 10,485,715 bytes, SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. It is retained unchanged inside the complete frozen public B6 package at `prior/b6/evidence/original.so`. That package and its original manifest are preserved byte-for-byte. Other inputs are selected public authentic-composition, scalar-selection, old residual and compiled-numeric reports, bound in `input-bindings.json`. `scope.json` records the observed Git head; this is not a claim that the source proposal equals current main.

`function-ledger.json` freshly analyzes 27 selected entry-bounded windows, 200 direct-call sites, and 15 outside-frontier targets. Nine arithmetic/error roots plus their actual immediate callees and the complete five-window numeric runtime are included. Boundaries use the next actual unrelocated signed direct-call entry, or text end. These are not original symbols. A separate caller slice binds `0x148248..0x148800`. Full original bytes remain available; every selected assembly file is regenerated and compared by the verifier.

The analyzer checks relocation type 10 **before** reading a call as PC-relative. Direct-call normalization zeroes only internal call immediates in memory; relocated data operands are recorded and masked in memory. There is no proposal executable and no raw/normalized proposal match claim. Every relocated LDDW has its actual target, section and up-to-64-byte bound recorded. A bounded prefix is not a complete vtable/object or a transitive data proof. Every direct call leaving the selected set is listed, and indirect/import calls remain explicit. No executable bytes are patched.

## Caller values and first versus residual pricing

Symbols below name recovered roles, not historical Rust identifiers. `K` is the admitted pretrade context; `S,D` are the already-produced first and residual quantities. `V` is actual base-vault token amount, `X,Y` virtual reserves, `Q` real quote reserve, `H` migration fee, and `N` the admitted native-quote flag. Native means the preflight's stored-zero quote distinction; this packet does not reinvent that admission.

1. `148270 -> a0070` receives decoded curve and `S`. It multiplies `S*Y` as u128, then rejects `X<S` with 6024 and `X==S` with 6026. It divides by `X-S` and adds one even when division was exact. The caller rejects a nonzero high limb before `148308 -> 7fde8`, so `q1 = floor(S*Y/(X-S))+1`, narrowed to u64, precedes first fees.
2. `1483a8` tests the preserved `D`. Zero skips residual pool/pricing; nonzero reaches `148418 -> 82128`. The caller loads `Q` from curve wrapper+`0x60`, `H` from Global wrapper+`0x410`, and `V` from base-token wrapper+`0x68`. Outgoing frame `-0x1000,-0xff8,-0xff0` holds `N,S,q1` respectively. These runtime offsets are not serialized account offsets.
3. The pool result supplies `B,T` to `148480 -> 82af8`, with `D` still from r8. This matters for mode/whitelist selection: `D` cannot always be reconstructed as `A-S`. This packet implements no alternate selection.
4. Both first and residual fees use the same `K`: first passes r9 at `1482f8`; residual passes r9 at `148470`, saves it at `82b18`, restores it at `82fe0`, and invokes `82ff0 -> 7fde8` on `q2`. There is no reserve write in between. The residual pool is not a substitute fee threshold context. Full ordinary fee and alternate-mode logic remain B5 dependencies.

## Residual pool and error order

`82128..82af8` performs these checks in this order:

| Order | Operation | Failure |
|---|---|---|
| 1 | Require `V >= S` | 6024 Overflow; captured original line 494 |
| 2 | Checked `Q+q1` | 6024; line 498 |
| 3 | Only if N, checked subtraction of H | 6024; line 502 |
| 4 | Require `B=V-S > 0` | 6021 NotEnoughTokensToBuy; line 506; compared values zero/zero |
| 5 | Require `T=Q+q1-(N?H:0) > 0` | 6024; line 507; compared values zero/zero |

The two zero failures call `0x340`, whose u64 zero and supplied i32 zero are formatted through the recorded comparison machinery. They are not key comparisons. Success returns `(tag0,B,T)` with B at +8 and T at +16. This function writes its result and error temporaries only. It does not debit migration lamports, remove tokens or update curve state.

`82af8..83088` first requires **B>D**, otherwise 6021 with compared values **(B,D)** via `82ea0 -> 11b0`. It then multiplies `D*T` as u128 and invokes `82b90 -> 88908` with divisor `B-D`. Ceiling helper order is:

```
sum = checked(n + d)       // 6024, original util/fee line 15
rounded = checked(sum - 1) // 6024, line 17; zero sum wins over zero d
require d != 0            // 6026, line 19
a = rounded / d
```

The machine checks sum-zero before divisor-zero and performs the final subtract after those predicates; the source's checked subtraction has the same scalar failure order. It does not claim identical allocation or instruction scheduling. The caller next rejects a nonzero high quotient with 6025 Truncation (line 526), then calls fees. The result is `q2=ceil(D*T/(B-D))`, not q1's floor-plus-one rule.

Residual success record, relative to the **tagged result base**, is tag+0, protocol amount+8, creator amount+16, protocol rate+24, creator rate+32, D+40, q2+48, B+56, T+64. The caller copies 64 payload bytes into its stack record at `-232`. B6 receives the **payload pointer**, so D and q2 there are +32/+40, not +40/+48. Confusing those bases changes settlement quantities.

All captured code/line stores, ordered comparisons, precise call displacements, result stores and original path literal bytes are in `arithmetic-contract.json`. They are evidence metadata only. The new Rust error type is not the original Anchor error ABI.

## Cost continuation and return fields

`1485c8 -> 80df8` receives Global buyback bps, the curve's mode byte, the caller-owned quote descriptor, q1 and its fee amounts, and the optional residual **payload** pointer. The following source is limited to ordinary mode, a previously-proved bps rate <=10000, and an **absent** quote descriptor. These are domain assumptions, not new original rejection checks.

For ordinary mode, b1=`floor(protocol1*bps/10000)` and b2 similarly if residual exists. Original checks high product limb <=9999 before each u128 division, and then buyback <= protocol. The latter failing path panics with `buyback_fee never exceeds protocol_fee`; the high-limb path is an unwrap/panic frontier. The mode-nonzero branch sets both buybacks to zero, but this packet does not claim a complete alternate-mode implementation. Within the stated bps domain, the two assertions hold mathematically.

Exact ordinary cost order:

1. Checked `b1+b2` **before either gross sum** (6024, original line 371).
2. `81098 -> 801f8`: checked `(q1+protocol1)+creator1`. If residual exists, `810f8 -> 801f8` does the same on q2. Each individual add shares the helper's 6024 line 285.
3. Checked `gross1+gross2`, then require it >= combined buyback and subtract (shared 6024 line 375).
4. `81180 -> 95360` adapts that curve-directed amount. The absent tag at `95368..95380` returns its input. **No present-tag implementation is supplied.** A successful adapted amount must be >= its unadapted input, or `81640` creates 6024 at line 382.
5. Return `(tag0, adapted_curve_payment, total_buyback, adapted_curve_payment-unadapted_curve_payment)` at +0,+8,+16,+24. Only the absent descriptor implies the last quantity is zero. That zero is **not** an implementation of B7's trailing adjustment or B6's present descriptor quantities.
6. `148660 -> 81848` checked-adds curve payment and buyback (6024, line 390). `148698` rejects only if total > max; equality passes. On failure the body builds 6002 at original line 842, calls the same checked total helper again at `148798`, then attaches compared values **(max,total)** via `1487e8 -> 11b0`. The logical source preserves those values but does not implement the intermediate rich-error allocation/recomputation path.

The source does not collapse this into one combined fee round or `q1+q2+fees`, even though ordinary successful values can simplify algebraically. Reordering checked sums changes rejection precedence.

## Mutation and lifetime boundary

B6 is retained as the authoritative following settlement contract, not reimplemented. `1488c0 -> 83c00` occurs only after the cost bound. The original `83c70 -> a0bf0` changes the **first leg only**, sequentially: decoded virtual base at +0x40 subtract S/store; real base+0x50 subtract S/store; virtual quote+0x48 add q1/store; real quote+0x58 add q1/store. Do not precompute all stores or add D/q2 to these four fields. Then checked S+D feeds one base transfer.

After the common zero-user-volume initialization and first fee accrual, residual D/q2 **overwrite** wrapper+0x90/+0x98 before second fee accrual. B6's corrected whitelist-success path rejoins the common zero-user init; the older copied residual/authentic prose describing a blanket nonwhitelist-only initialization is superseded. That older evidence remains intact.

Pricing holds only scalar copies and caller-owned stack records, not token data borrows. K stays the same admitted pretrade context through both fee calls. Residual payload remains alive through synchronous cost/settlement/event use; an Option<&ResidualLeg> models borrowing and does not claim original heap layout. The quote descriptor remains borrowed caller-owned data; its type/present-case meaning stays opaque. B6 CPI AccountInfo clones, signer seeds, borrow release, error/rollback and event success remain separate obligations. No extra authority or signature is introduced.

The later B6 outputs are `(first_adjusted_buyback, second_adjusted_buyback)`, produced by two `950e0 -> 94e28` calls and checked subtraction. They are distinct from this cost helper's total buyback. B7 event/trailing adjustment is owned by another lane and is not modeled here.

## Source limits, remaining inputs and validation

`source/residual_pricing.rs` supplies scalar pool, ceiling, residual quote, ordinary absent-descriptor cost and max comparison. It requires a real `PretradeFees` implementation and passes its error through; no default fee callback exists. `OrdinaryRate` is a source-domain witness, not an original-program validation; rejection of constructing it cannot be wired into BuyV3. The source neither accepts nor guesses a present descriptor. It is not typechecked, linked or executed.

The published wide-runtime ledger attributes five complete original numeric windows to the accepted 5c candidate's `__multi3`, `__udivti3`, divide core and shifts. This packet rebinds all five original full windows and call targets. Their published complete-body equivalence is retained evidence, not a new unique compiler-builtins source pin or all-input mathematical proof. Original compiler-builtins source/build association, SBF integer/ABI semantics and transitive error/formatter/allocation behavior remain explicit premises.

The 15 outside-frontier targets include the two fee dependencies, error/formatting/drop paths and memcmp. Included immediate bodies do not mean their semantics or every data object are closed. Required integration inputs remain: admitted K/N/V identity; B3 exact S,D; concrete B5 selector/error adapter; rich-error origins/lowering without spoofing; descriptor-present behavior; B6 settlement/CPI/alias/rollback; B7 trailing adjustment/event/exit. No new test is proposed for excluded token extensions or unavailable authority routes.

Run `python3 -B verify.py` from a copied directory. Optional `--repo /path/to/repo` rebinds all selected public input bytes. It checks exact inventory/hashes, preserved B6 seal and its 117 saved-row checks, regenerates all selected original disassembly/call/data/error/result ledgers, rebinds numeric windows, and checks source-scope markers and the historical-proposal diff. These are static integrity and consistency tests, not Rust semantic proof or runtime preservation. Copy/negative test results are recorded separately; no receipt is renamed as new coverage.
