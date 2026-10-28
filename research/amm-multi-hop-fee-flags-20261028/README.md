# AMM multi-hop fee flags: 771/785

This source-only continuation of [the 770-window mint-scanner integration](../amm-union4-mint-scanner-integration-20261028/README.md) recovers the complete **704-byte normalized window at `0xfb08`**. The candidate reaches **771 / 785**, with **163 raw-equal bodies and zero normalized or raw losses**. Fourteen AMM windows remain; whole-ELF equality is false. Maintained checkpoints are unchanged.

## Source recovery

The original helper builds a byte vector of fee flags for a contiguous run of curve hops. Bit 0 gates protocol fees; bit 1 gates creator fees. A buy run charges protocol fees at the first hop and creator fees at the last; a sell run reverses those gates.

The source now captures an explicit `is_buy = !sell` flag, computes the first/last predicates together, and calls an ordinary generic collector using `Vec::from_iter`. `#[inline(never)]` preserves the observed call boundary. The helper is used exactly once by the real multi-hop handler; it is not an unused matching body. The only masked operand is its final direct call displacement. **The first 700 bytes are raw-equal**, and the verifier resolves the final call to the same `alloc::raw_vec::handle_error` body as the original. There are no helper relocations.

The increment `j + 1` is safe: the iterator guarantees `j < i <= count`, and `count` is the supplied account length divided by five. Existing error-site line numbers are preserved by keeping the edited closure's line count unchanged; the collector is appended after existing source. There is no added blank-line padding, assembly, embedded binary data, original-derived linker layout, or output editing. These are documented reconstruction choices, not historical source attribution.

A complete negative-control build uses the same fee predicates with a direct `Vec::from_iter` call. LLVM inlines the collector and the count stays at **770**. Making the original call boundary explicit produces **771**. Both complete source trees, compiler outputs and measurements are retained.

## Builds and runtime

Two AMM root recompiles produce identical stripped and unstripped ELFs. External dependencies and the unchanged native-transfer-fee crate are cached. The inherited incentive stack-frame diagnostic remains; this is not a warning-free maintained build.

- Candidate SHA-256: `c2a9b4573c7f236f9d5aa78aa211da499f0ae41b4f13f772fc4ca392c48c0173`
- Unstripped SHA-256: `777449947fbb477c966b1d4d4eaed53b04c51cc08553b1b9daadde241c525437`

All **25 suites / 17,462 cases** pass their compared state, error, event and CPI observations, including **735 multi-hop cases**. Complete case reports and sidecars retain **35,074 signed transactions / 35,418 signatures**; signature replay also passes. The five inherited incentive error-order controls pass in ten signed executions. Raw ordered logs remain different in some cases, so these results do not establish complete diagnostic parity or exhaustive behavior.

The unchanged scanner remains raw-equal for all 1,192 bytes. Its three companion functions preserve normalized bodies, relocation patterns and resolved call targets. Compiler, target libraries, source snapshots, exact controllers and input bindings are archived. Build receipts initially compare against union4's 769-window measurement; the verifier also independently proves the **770 -> 771** delta against the selected parent.

```sh
python3 -I -B research/amm-multi-hop-fee-flags-20261028/verify.py
python3 -I -B research/amm-multi-hop-fee-flags-20261028/test_verify.py
# Requires solders 0.27.1 in this interpreter:
python3 -B research/amm-multi-hop-fee-flags-20261028/verify.py --signatures
```

Verification recomputes the entire window inventory, parent/source delta, repeat equality, used-helper call relationship, resolved allocation-error target, all compared case observations and optional transaction signatures. Counterexamples reject resealed false counts, a changed source patch and a falsified case observation with a preserved pass flag. Optimized Python is rejected because it disables assertions.

The recorded controllers retain their original workspace paths; adapting paths or environments requires new receipts. Hashes and receipts are reproducibility evidence, not cryptographic execution attestation. Tests use bounded synthetic fixtures with captured dependencies and ordinary verified local signatures, without live-chain execution.
