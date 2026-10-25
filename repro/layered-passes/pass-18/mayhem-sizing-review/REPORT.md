# Mayhem non-initializer sizing/error review

No additional natural source correction is justified for the reviewed SellPumpSwap sizing paths. The remaining strict-guard difference is unreachable under the established caller domain; the retained-basis-points rejection uses the same subtraction-overflow panic family; the zero-quote typed Result error is already corrected in current7d416f84. This is a source-only review, not a build/test or an exhaustive Mayhem conclusion.

## Full bodies and provenance

The package binds current7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f and originala87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb. It retains the complete original SellPumpSwap caller95848..113160, sizing186552..187672, Debug196888..197000, Display196056..196888, Result unwrap674280..674512, subtraction panic690936..691024, and panic formatting673928..673976. Current full handler138824..152560, Debug290568..290672, Result unwrap574056..574288 and subtraction panic590720..590808 are retained with all decoded calls, data references and indirect targets.

The historical normalized inventory labels original sizing/Debug/Display rows opaque. That disposition is preserved in each copied row's historical_scope. Their complete bytes had already been independently authenticated and used in the published sell-result-error source proof, so this review cites that narrower source attribution; it does not silently claim the older inventory's opaque classification or all downstream callees were closed. No initializer body was decoded or initializer state inferred.

## Apparent retained-bps mismatch is already correct

Original sizing reads retained_reserve_bps as u16 at186552..186568, rejects >=10001 at186576, and reaches690936 through187664. Current handler masks the recorded argument to u16 at142080, rejects >10000 at142088, and reaches590720 via152440..152456. Both predicates reject exactly10001..65535; zero through10000 proceed.

Original690936 and current590720 are full88byte subtraction-overflow panic bodies. Their normalized instruction/relocation patterns match, including the final panic-format call. The original body passes its source descriptor separately from the fixed panic template; the current body is symbol-attributed as core::panicking::panic_const::panic_const_sub_overflow. Therefore the current natural `10_000u16-retained_reserve_bps` supplies the right error family and guard. Replacing this with Option/Result unwrap or a newly invented custom error would contradict the observed original. Source-coordinate and pointer differences remain and are not patched.

## Strict sizing guard is a bounded non-gap

Original187176 enters quotient calculation only for effective_quote>output. Both equality and underflow-side values enter the typed11 Result unwrap at187184..187264. Current142624 sends effective_quote<output to subtraction-overflow panic, while equality at142632 enters corrected typed11 Result unwrap152272..152352. This structural difference is real and remains in the ledger.

It does not justify adding a new checked-subtraction or guard to the admitted source path. The full caller domain supplies base-reserve u64 widened to u128 with base>0; token amount is u64 widened to u128; effective quote is checked into nonnegative u64 before sizing. Hence base+tokens>0 and fits u128, quote*tokens fits u128, and floor(quote*tokens/(base+tokens))<quote whenever quote>0. Configured cap and retained-reserve cap only take minima. Final output>quote cannot be reached; equality means both arezero. The original full caller passes the same bounded values at97736,97776,97784 and calls sizing97792. These premises are also retained in prior-source-domain-invariant.md. This is an algebraic source-domain proof, not a claim that arbitrary unconstrained calls to the original helper have equivalent errors.

The current equality arm stores enum11 at152272 and passes it with the4byte/alignment4 Debug descriptor to Result unwrap574056. Original187184/187264 does the same through674280. Full Debug paths select PumpSwapCpiMathOverflow, and original Display selects Math Overflow in Pump Swap CPI call. Existing source `.checked_div(...).ok_or(PumpSwapError::PumpSwapCpiMathOverflow).unwrap()` remains the supported natural expression. We do not introduce a helper/branch merely to resemble the old machine layout.

## Remaining blockers and scope

The reviewed full caller/sizing bodies still differ in factoring, ABI returns, arithmetic-library implementation, relocation/data layout and source diagnostics. The selected call/data ledger lists all outgoing targets; most arithmetic, allocator, formatter, panic-runtime and dynamic targets are transitive obligations rather than complete semantic equivalence. A new source correction would require a feasible caller value, differing observable field/error/ownership order and a complete source mapping beyond these already explained branches. Neither code size nor normalized matching supplies that witness.

No initializer, token-extension, Metaplex, private-security or other stopped lane was inspected. No source patch, build, VM, transaction, new fixture or compiler variant is proposed. All prior finite-test and original-build-provenance limitations remain. This review closes the retained-bps panic-family ambiguity and preserves the strict-guard limitation rather than manufacturing a correction.
