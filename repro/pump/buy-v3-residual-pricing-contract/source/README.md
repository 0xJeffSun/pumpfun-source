# Source-only handoff

`residual_pricing.rs` is a bounded replacement for the copied historical explanatory arithmetic fragment, not current Pump source. `proposal.patch` records that exact transformation. No Rust compiler, typecheck, runtime, fixture or main edit was performed.

The callable boundary takes already selected first/residual quantities and explicitly excludes present quote-adjustment descriptors. Only logical error kinds/compared values are modeled; the original rich error ABI, allocation/cleanup timing and natural source-origin lowering remain required integration work. The required fee trait has no permissive implementation. `OrdinaryRate`/`AbsentQuoteAdjustment` are caller proof obligations, not new original guards or fabricated descriptor values.

No mutation, CPI, signing, event, exit or B7 adjustment is supplied here. Read the parent README and complete byte/error/result ledgers before considering integration. All 117 historical cases are unchanged obligations.
