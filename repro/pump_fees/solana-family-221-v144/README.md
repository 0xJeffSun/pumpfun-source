# Fees Solana dependency-family checkpoint

The clean main build exactly matches the tested combined social-layout/dependency candidate: **768,072 bytes**, SHA-256 `e501ca2c744373e5653a5ac7e25a3fd20f6058765808b888c3605fd03adba60f`. The combined scratch ELF freshly passed **17,441 comparison receipts**, including 69 repeat-input checks, and the separate **ten-step donation sequence**. The saved-evidence verifier checks 17,204 signatures in 8,644 encoded transaction fields, plus the two unchanged genuine historical signed messages. No new handlers or unique cases are claimed.

Main inputs differ from the tested combined source only in the finalized program README. `main-scratch-identity.json` proves complete ELF identity; `receipt-build-bindings.json` preserves the actual scratch execution source/build hashes and separately links the clean main build. Runtime was not rerun on the byte-identical main output. All 22 main source/workspace/IDL inputs, four build helpers, source snapshots, SDK sources, build logs, documentation and tool-phase records are bound here.

The root `Cargo.lock` changes exactly eight selections witnessed together in one official SPL release lock; the other 245 selections remain unchanged. Actual offline Cargo resolution verifies the complete 253-package graph and feature sets. Pubkey 2.2.1 reproduces the captured `131:18` and `612:32` source records, six complete helper bodies, the 1,520-byte base58 formatter with ten direct targets, and all nine checked source records. The accepted social-v2 layout retains the complete 560-byte exit, seven direct calls and three literals. See the [recovery report](../../../audit/pump_fees/SOLANA_FAMILY_RECOVERY.md) for the exact dependency table, provenance and limits.

The unchanged recipe selects **platform-tools v1.44 compilation**, followed by the retained SDK's **v1.52 `llvm-objcopy` stripping**. Before/after retained tool-file hashes, SDK scripts and observed links/markers are recorded separately. There is no complete process-level invocation-hash trace for every historical build, and the captured program's unique compiler/dependency recipe remains unproven.

Full original ELF equality is **false**: the captured artifact is 948,944 bytes, with 419,662 differing shared positions and a −180,872-byte candidate length difference. Static normalization is diagnostic and occurs only in memory. Complete parser behavior, all transitive data, compute equality and historical source identity remain outside the proof.

`retained/combined-handoff.tar.gz` preserves the complete 83-file combined seal and its complete nested 63-file pure graph trial. The latter includes the original 290-file compatible-family evidence, official changed archives, graph/dependency inventories and the missing-helper failure before compiler launch. Earlier 133-file Pubkey feasibility and 208-file unsatisfied single-lock reports remain separately sealed. The distinct [social-layout checkpoint](../social-v2-account-layout-v144/README.md) and its `c181b0ba…` executable remain unchanged historical evidence.

Verify saved hashes, raw static windows, dependency provenance, original seals, runtime assertions and signatures without network, building, or program execution:

```sh
python3 repro/pump_fees/solana-family-221-v144/verify.py
```

The default verifier works from a copied package with `solders` installed. Add `--current-main` to also compare the repository's current source, helpers, documentation, harness and runtime inputs. The source/build recipe is documented in the [program README](../../../programs/pump-fees/README.md); rebuilding additionally requires the pinned compiler/stripping tools and unchanged public crate archives whose hashes are retained. The status proposal is for central integration and does not modify central status itself.
