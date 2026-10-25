# Pump buy_v3 ordinary SOL partial/completion review

Disposition: **narrow prerequisite; no source patch justified**. Static review confirms that the original dispatch wrapper forwards the optional boolean and its called body contains conditional clipping plus residual-amount logic. Accepted source discards the boolean. This does not establish a correct replacement: the selected saved evidence contains no successful above-real-reserve case and no above-reserve case with explicit `partial_fill=true`. Field-to-register attribution and transitive fee/completion effects remain incomplete.

Implementation baseline is **8099031**, accepted Pump `92575cd082bf76b332044a7d09371a9764db8b2cc40180bf1418f261945bbd6a`. Original ELF is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Both retained receipt hashes are checked against accepted receipt-build bindings. Accepted source excerpts were obtained with `git show 8099031`; their full-file hashes also match current files. `source-ranges.json` gives exact inclusive lines, half-open byte ranges, slice hashes and full-file hashes. No current candidate build or replay was performed.

The prior function inventory is a historical **6271a6d…** Pump baseline, before accepted serializer promotion. Its original direct-call entry boundaries were used only to select windows; its candidate matches/counts are not current acceptance or proof of historical function identity.

## Corrected receipt scope

The prior `buy-partial-and-completion` filter has **44 rows, of which 38 are ordinary SOL quote and six explicitly set `token_quote=true`**. The six token quote rows (configured-fee indices 317–318, 321–322, 325–326) are excluded from analysis. No Token-2022 extension behavior was analyzed. Some SOL fixtures use a Token-2022 base program; ordinary SOL quote does not mean legacy base-token ownership.

The 38 rows have 14 saved successes, 15 custom-6002 errors, seven custom-102 errors and two custom-6024 errors. All retain matching original/candidate error status and saved match assertions. `result.json` preserves every selected SOL row's exact receipt pointer, metadata, canonical raw-row hash, error and decoded event prefix. Full compressed receipt bytes are preserved unchanged.

- `buy.json.gz /cases/218–221`: requested 499,999,999 and 500,000,000 against real reserve 500,000,000 succeed; requests 500,000,001 and 1,000,000,000 reject with 6024. These rows omit trailing-byte metadata; do not relabel them explicit false/true pairs.
- `buy.json.gz /cases/222–249`: seven max-cost groups, each with trailing `[]`, `[0]`, `[1]`, `[2]`. The first three have identical error outcomes within each group. All `[2]` rows reject with 102. Valid values reject at costs 0, 1, 100, 10,000 and 28,309; succeed at 28,310 and 10^12. Successful output remains exactly 1,000,000,000 tokens, far below the event-implied available reserve. These are not clipping witnesses.
- `v3_configured_fee.json.gz /cases/315–316,319–320,323–324`: amount 999,999 versus 1,000,000 against real reserve 1,000,000, with creator override metadata 0, 500, 10,000. All succeed; equality emits TradeEvent then CompleteEvent. No explicit trailing=true or above-reserve input occurs here.

For all 14 successes the verifier independently decodes the event prefix and checks `q = floor(amount * virtual_quote / (virtual_base - amount)) + 1`, token output equal to requested amount, virtual reserve updates, and protocol/creator fees rounded up individually. It also checks real-token subtraction where supplied and exact original/candidate event-payload equality. There are four equality completions with zero real tokens and ordered TradeEvent/CompleteEvent payloads; the other ten have only TradeEvent.

Concrete examples: /cases/219 has q=13,980, protocol fee=133, creator fee=42, token output=500,000,000, remaining real tokens=0. /cases/242–244 have q=27,960, protocol fee=266 and creator fee=84, totaling 28,310. Configured-fee equality rows have q=28, protocol fee=1, and creator fee 1/2/28 respectively. These are bounded observed arithmetic, not a proof across u64 boundaries or changed clipped inputs. Buyback accounting, full before/after account contents, post-completion counters and final event-suffix meaning are not newly recovered here; receipts contain account hashes rather than full account bytes.

## Accepted source trace

- `lib.rs:100`: `let _ = partial_fill; trade::buy(ctx,amount,max_sol_cost)`.
- `lib.rs:415–422`: absent boolean defaults false, byte 0 false, byte 1 true, other byte invalid.
- `trade.rs:114–142`: amount-positive and completion checks; direct requested-amount pricing, fee selection and max-cost check; checked subtraction of requested amount from real tokens. There is no clipping or residual-output branch.
- `trade.rs:148–160`: requested amount goes to base transfer; SOL user payment is quote plus fees, followed by buyback movement.
- `trade.rs:161–179`: state/event use the same requested amount; zero next-real-base sets complete and adds completion emission after trade emission.

These facts explain why merely threading the boolean into `buy` or applying unconditional `min(amount,real_reserve)` is not a grounded patch.

## Original static trace (virtual addresses, half-open ranges)

`wrapper.asm` preserves [0x1286c8,0x128c28); `body.asm` preserves [0x147ba0,0x1489f8). Every instruction's raw bytes are checked against ELF section mapping. Printed LLVM `<.text+...>` annotations in this retained disassembly are not reliable branch addresses: the verifier calculates targets as PC+8+8*offset (or call immediate). Do not follow the printed annotations.

1. **Boolean ABI**: [0x128738,0x128798) loads amount and max cost, defaults r5=0, skips boolean read when payload length is 16, accepts 0/1 at payload+16 and branches on other values. At [0x128918,0x128938), saved amount/max/boolean reload into r3/r4/r5 and the call at 0x128930 targets 0x147ba0. This is direct dispatch/call/dataflow evidence, not inferred-window name matching.
2. **Body input preservation**: [0x147ba0,0x147bd0) puts boolean in r6, amount in r8 and max-cost at stack -0x1e0. At 0x147c80 r7 loads from an object at offset +0x58. That object's +0xa2 byte gates the branch at 0x147ce0. The physical offsets are proven; their historical semantic field names are not established by this package. Accepted Rust field declaration order is not sufficient evidence of compiled in-memory layout.
3. **Conditional clipping**: 0x147ce8 sets r1=0. At 0x147cf0 a false boolean skips to 0x147d08; at 0x147cf8 amount<r7 also skips; otherwise 0x147d00 assigns r8=r7. Selected r8 is saved at stack -0x1f0 at 0x147d10. The next branch checks r7<r8. This is a real register-level minimum path; it is not yet a proof that it is the ordinary SOL branch for all account states.
4. **Alternative residual path**: zero object byte branches from 0x147ce0 to 0x147e10. [0x147e10,0x147e78) calls 0x1b3678 with length 32, compares amount against r7, checks the low 32-bit returned value, and on one outcome computes r1=r8-r7 at 0x147e60–0x147e68, then jumps to 0x147d00. Thus this path clips and preserves a residual without consulting the boolean gate. Assigning the comparison a specific account/quote identity still requires field and helper attribution.
5. **Downstream consequences cannot be omitted**: r1 becomes r8 at 0x148098; selected amount reloads from stack -0x1f0 into r3 before call 0xa0070 at 0x148270. Residual-dependent calls occur at 0x148418→0x82128 and 0x148480→0x82af8. Further calls include 0x148308→0x7fde8, 0x1485c8→0x80df8, 0x148660→0x81848, 0x1488c0→0x83c00 and 0x1489d8→0x859b0. At 0x148690 max cost reloads, followed by comparison at 0x148698. These are call/argument prerequisites, not recovered fee/event function identities. Their transitive arithmetic, error precedence, state changes and event construction are not closed by this review.

## Narrow prerequisite before a patch

First establish the ordinary-SOL predicate and object +0x58/+0xa2 meanings from existing parser/serializer/layout evidence, then close the selected-amount and residual paths through the listed helpers. Required consequences are first-leg and residual quote arithmetic, fee bases/rounding, combined max-cost check, actual vault funding, reserve and post-completion counter changes, transfer amounts/order and ordered events. Reconcile those facts against retained evidence containing an explicit true/above-reserve crossing and sufficiently funded completion **if such evidence exists**. This package's 38 rows do not provide that witness. Missing evidence is not permission to generate it.

No patch is included because every relevant ordinary branch and its arithmetic/fee/event effects are not grounded. The original conditional-min fact alone cannot justify a source correction, nor can these retained successes establish that ignored partial_fill is harmless.

## Portable verification and publication

Run `python3 verify.py` from this copied package (Python 3.9+). It checks input and source-slice hashes, accepted receipt bindings, raw ELF/disassembly equality, exact branch/call destinations, 38 selected SOL rows, seven optional-byte groups, 14 success arithmetic/event prefixes, four completion payloads and the artifact manifest. It does not build, run a program, import a harness, verify signatures anew or certify semantic closure. A copied-directory run is recorded as `verification.json` in this package (the prior manifest hash records the verification before adding that receipt).

All reviewable artifacts are in `publication/`. `manifest.json` seals these files and excludes itself; no CLI telemetry is included. Prior research remains immutable. No main edits, commits, pushes, further workers, external messages, real-chain calls, new fixtures, runtime probes, builds, binary patches or stopped-lane work occurred. Whole-byte acceptance remains incomplete.
