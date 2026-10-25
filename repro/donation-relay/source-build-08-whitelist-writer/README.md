# Relay build08: whitelist writer error boundary

Candidate `ef91a674f2180f4500a087585c5f7e1e90758b9e05fe8e77a7f2669bdbdd898f` built successfully in one authorized attempt. It is460,272 bytes. The exact23 source files differ from build07 only in `src/generated_exit.rs`, using the isolated proposal retained under `proposal/`. The compiler/dependency recipe is unchanged. Build command exited0; no backend stack error was emitted, and all301 complete candidate symbol windows passed the direct-r10 offset check. Logs retain the10 ordinary source warnings. No target binary was edited.

## Observed result and remaining mismatch

The full original has492 inferred windows; the new candidate has301 symbol windows. Counts remain33 raw-matching original windows,121 normalized instruction-shape matches, and371 unmatched original windows. There are no gained or lost normalized matches relative to build07. Whole-file identity is false. All full bytes and mismatch ranges are retained; normalized matching is not substituted for byte identity.

The complete original whitelist window158 (503808–505216,1408 bytes) still has no complete candidate match. Its new enclosing candidate wrapper99 is162616–175488 (12,872 bytes),136 bytes smaller than build07's13,008-byte wrapper. The wrapper includes admission and handler work; its size is not an isolated serializer comparison.

The source change produces the expected I/O error boundary in the complete new wrapper. The length-overflow simple error value appears at174424, with the u32 maximum check at174456–174480. The four field writes remain inlined with `sol_memcpy_` calls, rather than calling the out-of-line writer. The short-write route calls the existing WriteZero constructor1 at175024→1744; the common I/O-error drop dispatch is175032–175104 (conditional indirect destructor call at175104). Only afterward does175128 call owned3004 constructor83 at67672. The mutable borrow is released at175152–175176, followed by account-name decoration at175224→68536. These are concrete new source/operand observations, not proof that the entire wrapper, formatting, allocator or error closure is identical to the original.

Original writer281 remains a complete normalized288-byte instruction-shape match to candidate80 (64360–64648), but raw bytes differ and its WriteZero constructor differs from the original. Owned3004 factory83 remains864 bytes, while original297 is592 bytes. Original factory/name/logging/conversion and complete candidate counterparts are retained in `review.json` and full disassemblies. `review.json` contains complete direct closures of42 original and90 candidate windows; every direct target resolves. All indirect calls and data operands are retained, without treating arbitrary bounded literal previews as complete objects or claiming indirect closure proof.

## Exact build and runtime records

`attempt/build-launch.json` records the exact pinned `cargo build-sbf --tools-version v1.44 --offline ... -- --locked --offline` command and environment. The unchanged SDK uses the recorded v1.52 strip tools. Before/after tool hashes, dependency-source archive equality, actual extracted dependency hashes and all source hashes are retained. `attempt/build-result.json` records exit0. `attempt/retained-artifacts.json` binds the stripped and unstripped output. No generated keypair was opened or included.

After the initial static verifier passed, only the published ordinary12 harness ran: five donation handlers and seven IDL operations. All12 passed on24 submissions. Independent saved-transaction verification checked12 unique transactions,50 encoded signature fields,25 unique signatures and24 effect sets. Signature, blockhash and transaction-history controls remained enabled. No fixed-authority or source-origin6009 probe ran, and these ordinary cases do not cover the changed privileged whitelist operation or all serializer failures. Receipt package `build08-ordinary12` contains the complete results and exact unchanged signature/effect loop.

The original pre-runtime manifest is preserved as `pre-runtime-manifest.json`; its verification source is retained verbatim as `runtime-static-verify.py`. That is the exact seal recorded in the actual runtime launch. Final packaging adds this README and complete proposal provenance, without changing those sealed payloads. The final verifier checks both seals and recomputes all full function/mismatch ledgers and review data. This distinction avoids relabeling the launch as if it used a later package seal.

## Portable verification

Run `python3 -B verify.py` inside this package; optional `--repo /path/to/repository` also binds the published build07 original/candidate. Verification runs no target and requires no toolchain or cache. The ordinary receipt verifier separately takes `--repo` and optional `--build /path/to/this/package`; `--runtime` only rechecks saved Ed25519 signatures using the pinned runtime, without replaying any transaction.
