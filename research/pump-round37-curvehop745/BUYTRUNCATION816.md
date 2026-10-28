# Optional buytruncation816: buy conversion error ownership

## Source and attribution

This local, original-backed source reconstruction adds `--stage buytruncation816` after `truncation815`. All fifteen earlier stages and the default `curvehop745` remain selectable, with their upstream attribution unchanged. It retains the earlier sell conversion repair and excludes the negative receiver/setter experiments.

Only two lines in `trade_v3.rs` change: the buy quote conversion at line 200 becomes `u64::try_from(curve.buy_quote(amount)?).map_err(buy_quote_truncation)?`, and the previously empty line 811 becomes an ordinary private callback constructing Truncation. The file remains 1,140 lines. Sell Source 1140, its line-124 caller, the shared narrow helper and all other source inputs remain unchanged. There are still 61 inputs.

The callback name is locally inferred from the observed error boundary, not claimed historical source. No attribute, forced copy, custom pass, numeric layout or SDK change is added. The actual emitted implementation is a natural `FnOnce::call_once` adapter; this result is measured, not assumed from the spelling.

## Accepted bounded static-plus-repeat result

The accepted checkpoint has **816 / 1,035 injective normalized windows and 133 raw windows**, retaining every prior 815 normalized and 133 raw match. The sole new original window is the complete 520-byte Truncation constructor at original address 544128. Its actual adapter matches the original normalized body and owned Error ABI, with error 6025 and `programs/pump/src/trade_v3.rs:811`. All immediate callee boundaries, resolved imports, seven data operands and three typed records are checked.

A separate compilation of the exact same source reproduced both complete generated ELF files byte-for-byte. Independent preservation and backend-diagnostic checks passed. This is the accepted bounded static-plus-repeat checkpoint, not runtime validation.

## Actual caller and retained conversions

The producer is still the original-equal 1,224-byte buy quote function. The current receiver is traced through the same boxed curve and the amount remains the unsigned minimum of the requested amount and real token reserves. Quote failure propagates before conversion. Success checks the returned u128 high word; zero continues with the low word, while nonzero lazily constructs the new owned error and returns before later fee work. The pinned unit-only, Copy `TryFromIntError` introduces no resource-owning payload or destructor.

All old immediate calls, referenced data and resolved imports in the changed buy handler are accounted for. Exactly one shared-narrow call is replaced. The unchanged shared narrow function retains its other 20 callsites. Five are inside this changed handler and receive additional local checks:

- Four fee conversions retain their u128 carry, division by 10,000, low/high argument slots and Result handling. Independent operand checks bind first-fill quote spill versus live register, protocol and creator fee fields, and post-fill quote slots.
- The remaining checked-ceiling-division conversion retains the original-equal multiply and 1,672-byte division helper, zero extension, numerator/denominator order, successful checked-subtraction result, low/high words and error-before-conversion control flow.

These are explicit local encoded-CFG, typed frame and callee-saved-register checks, not arbitrary-alias, indirect-flow or whole-business-handler equivalence. Other caller bodies are protected by complete function/graph transport.

The other 982 functions retain complete normalized bodies, 10,773 direct-call occurrences, 5,113 data operands and resolved import correspondence. All 645 readonly-record relocations, old readonly literals and 32,059 rodata bytes remain exact. The earlier sell and chain error adapters are rebound separately rather than confused by address movement. All 30 earlier clamp arguments remain qualified.

## Limits and reproducibility

The buy business handler is still original-unmatched. Earlier explicit limits remain: BondingCurve's 624-versus-600-byte dispatcher; fee calculator and inverse wrapper body identity; bounded PDA extents/dominance; unmatched specialized handlers and trade panic origins; the third original split-record owner; broader chain traversal; and historical identity of duplicate compiler-generated instances. The prior complete 1,176-byte FeeConfig qualification remains intact. There is no new open immediate edge or old qualified data-boundary regression in this control.

The source-only materializer has 116 pure tests across sixteen stages, checking exact inventories, strict patches, preserved earlier stages and rejection cases. They do not execute the target or held fixtures. **Runtime is NOT RUN. Full original binary identity is false.** Original binaries are comparison-only, never compiler inputs or output patches. Only reviewed UTF-8 source, tests and technical reports are published; no binary, IR, SDK, raw build/runtime receipt or archive is included.
