# Source-only follow-up: SellPumpSwap typed sizing error

## Minimal proposal

The single-line `proposal.patch` reuses the `PumpSwapCpiMathOverflow` variant already present in current main and changes only SellPumpSwap's final checked-division None handling:

```rust
// Current
let input=u64::try_from((output as u128*vt).checked_div(vs-output as u128).unwrap()).unwrap();
// Proposed
let input=u64::try_from((output as u128*vt).checked_div(vs-output as u128).ok_or(PumpSwapError::PumpSwapCpiMathOverflow).unwrap()).unwrap();
```

This would construct a typed Result error before the terminal unwrap, rather than unwrap Option::None. It does not return a recoverable Anchor6011 error, change a successful quotient, change the outer u64 conversion, or change any existing multiplication/subtraction. No new error enum, layout/discriminant, message, manual logging or source coordinate is introduced. `PumpSwapError` is already imported by this module.

No main edit, build, program execution, new fixture or runtime case occurred. Current accepted source baseline is the typed-BuyPumpSwap candidate `dda5554a2faf8aa40fc86547e91c4b32c6ac44b878073dcb8bd9f7ac60b47cd4`; the older `9e4e19df...` candidate is historical here. This proposal does not activate or modify the earlier BuyPumpSwap line.

## Existing full-function evidence

The original sizing window [186552,187672) and original SellPumpSwap handler [95848,113160) are already retained as `sell-budget.asm` and `sell-handler.asm` in `repro/mayhem/twentyfour/static-evidence.tar.gz`. The handler is the prior ledger's admitted non-initializer O0079. The sizing routine is an exact, complete published sibling window; the older general inventory's opaque classification is retained in its historical record and is not treated as a license to decode surrounding unknown functions. This review only regenerates those exact published bounds.

`inspect.py` authenticates every instruction byte in both archived assembly members against the pinned original ELF; it does not trust historical textual branch annotations. `evidence/retained-*.asm` preserves the archived source, while `original-*.asm` contains fresh signed-target decoding. There is no new original-region expansion.

Original full-program SHA256 is `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. The current stripped/symbol files are the already validated typed-BuyPumpSwap build from the published scratch package. Their allocated sections and baseline identity were established in that package; no new build is inferred.

## Branch/call/error proof

1. Original SellPumpSwap handler calls sizing at97792 ->186552.
2. After output selection, the sizing routine tests `r7 > r9` at187176, where the size calculation uses effective quote versus selected output. Only that strict comparison branches to187272 for the subtraction/division path. Falling through writes error discriminant11 to frame-8 at187184.
3. The error path passes its value pointer, Debug vtable727032, source descriptor727232, and the43-byte literal at709876 to `core::result::unwrap_failed` through187264 ->674280. The literal is exactly `called Result::unwrap() on an Err value`, with backticks in the retained bytes. Full unwrap body [674280,674512) is copied from the previously admitted proof.
4. The vtable has size4/alignment4; relocation727056 points to the previously admitted full Debug body [196888,197000). Index11 selects pointer710761/length23, exactly `PumpSwapCpiMathOverflow`.
5. Previously admitted full Display [196056,196888) selects value11 through196096 ->196168,196176 ->196376,196376 ->196784, then loads pointer711138/length35: `Math Overflow in Pump Swap CPI call`.
6. Current candidate's full named SellPumpSwap handler [138824,152496) handles the equality case at142632 ->152272, then calls Option unwrap at152288 ->573600. `current-option-unwrap.asm` retains that complete40-byte function. Thus this is a concrete failure-construction discrepancy, not a compiler-layout similarity guess.

The proposal reuses the natural typed variant and its existing Debug implementation; it does not try to force register allocation, ABI, source locations or raw byte identity.

## Critical guard limit

The original guard is **effective_quote > output**, so it constructs error11 for both equality and effective_quote < output. Current source evaluates `vs-output` directly before checked_div; its generated subtraction-underflow branch142624 ->152400 remains a different failure path. The proposal intentionally changes only checked_div's None/equality case and leaves that subtraction path intact. It is not a claim of complete sizing-helper or all-input equivalence. No broader checked-subtraction rewrite is supplied without a separately reviewed source/effect-order contract.

The existing published `sell-pump-swap-native` case `virtual_-122946690720` exercises the relevant zero-effective-quote equality case. The retained original fails without the candidate's extra Option-unwrap text; the current candidate logs that Option text. `evidence/existing-diagnostic.json` preserves the entire existing case receipt. It is evidence motivating the proposal, not a test of the uncompiled source. Source-location and other diagnostic differences remain outside this change.

## Remaining scope

The legacy buy/sell and V2 math helpers at181656/184200 are not investigated here. Their older ledger entries remain opaque, and I did not find an admitted full-function source packet to justify extending this pass into them. No initializer, Pump sell_v2 corrective/transfer-fee lane, incentives, token-extension or additional Metaplex work is included.

## Reproduce static checks

`PYTHONDONTWRITEBYTECODE=1 python3 inspect.py` authenticates archived instruction bytes, exact full-window bounds, the original guard/call/error data and the current Option path against copied pinned ELFs. It performs no target execution or build. `manifest.json` seals the proposal and evidence. The next step, only after review, is a single approved pinned build and unchanged permitted baseline replay; neither is included in this source-only result.
