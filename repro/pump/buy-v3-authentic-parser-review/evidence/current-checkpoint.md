# Pump: nested ancestry and ordinary general route

This checkpoint adds the reviewed ordinary Tokenkeg route source to the accepted nested-ancestry source. The sole Rust change is `programs/pump/src/multi_hop_curve.rs`, SHA-256 `f8091a092a7974c1f33e53ff65113e48c628435ffaa266c5de5a12bc0447a92d`. All 37 compiler inputs are frozen here; the program README has a separate binding. The nested files, library wrapper, lockfile, dependencies, profile and compiler flags are unchanged.

The clean main candidate is **1,579,424 bytes**, SHA-256 **`731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93`**. Its full file and the full symbol ELF (`151727642ec97f48b7bc3aba5f3311a09c1a2400f6b8a757210aa83e63454b7d`) are byte-identical to the separately tested combined scratch build. This measured identity carries those saved receipts to main. Original whole-file equality remains **false**.

## Validation

**9,269 differential comparisons** passed on the exact combined candidate: the unchanged 9,237-case corpus, sixteen accepted nested-creation cases and sixteen general-route cases. The 40 suites retain individual receipts under `differential/`; `all-differential.json.gz` is their combined view. The route view is derived from the complete original/candidate sidecars under `route-original/` and `route-candidate/`, without altering them.

The differential evidence contains **15,934 transactions and 24,352 verified signatures**. All 28 established Surfpool runners also passed **1,024 comparisons**, with **2,048 transactions and 2,980 signatures**. Repeated original-only nested acceptance adds sixteen transactions and thirty-two signatures, recorded separately and excluded from paired totals. No unequal-candidate receipt was reused, and promotion ran no additional transactions. Forty-eight handlers remain bounded and five instruction paths remain partial.

The new sixteen route cases exercise successful three-hop paths through the captured AMM's genuine PDA-signed Pump invocation, flags `[1,0,2]` / `[2,0,1]`, four fixed fee modes and two amounts. Each transaction uses one ordinary test-owned signer, a standard 600,000-compute-unit instruction, a 1,128-byte packet and default signature/blockhash/history controls. Errors, normalized logs, events, inner instructions, return data, watched before/after state and Pump/Token calls match. Only compute counters are normalized in these route logs. The prior default-budget failure remains preserved in the scratch proposal history and is not counted as passing evidence.

The nested suite retains fifteen successes and one expected depth-limit rejection, including the original ordered `Left: 1` / `Right: 2` logs and rollback. The fixture ancestry is synthetic and pre-existing. Its ordinary child creation uses genuine payer and mint signatures; no signer substitute or initializer recovery was introduced.

## Static evidence and remaining gaps

The complete 1,840-byte BondingCurve serializer, all 25 immediate target bodies and its discriminator remain matched. The complete 11,432-byte nested walker and its 85 immediate callees remain normalized-identical to the accepted nested candidate; this is not a claim that the full walker matches the original.

The 3,512-byte route hop parser matches all 33 immediate callee bodies. Four consumed account names and lengths now match the original; its three remaining normalized differences at offsets 2544/2552/2560 exchange `memcmp` arguments. The 560-byte CurveHop exit matches. The 785-window current symbol inventory and 24-window route ledger are retained with the full static evidence in the scratch archive. The public JSON copies describe these exact same executable bytes.

The full route context, handler, helper and transitive data closure remain incomplete. Ordinary noncompleting Tokenkeg routes beyond two hops have finite three-hop validation; arbitrary lengths, packet capacity and all-input semantics remain unproved. Native/WSOL-specific behavior, completion/migration, short-account resizing, other quote currencies, Token-2022 extensions, and holder/cashback/Mayhem modes are not newly validated. Explicit reconstruction domain fences are not claimed original rejection behavior. The source's opening proposal-status comment is retained verbatim as part of the reviewed source; this package records its later actual build and execution status.

The known `sell_v2` quote transfer-fee minimum-output and fee-event mismatch remains unchanged and outside the passing suite's coverage. No stopped or private lane was reopened. This is neither an exact historical source recovery nor a deployable replacement or completed security audit.

## Build and package provenance

Exactly one clean main build used the recorded **v1.44 compiler / v1.52 stripper** pipeline, the unchanged 53-file SDK and the authenticated 252-package cache. The source, tools and 14,281 observed cache files passed before/after checks. These observations do not identify a unique historical recipe.

The compiler succeeded, but the outer launcher returned failure after mistakenly including its live `build-invocation.log` in the prebuild immutable set. That was the only changed entry. `preserved-launcher-failure/` retains the original launcher, seal and exact empty-before/failure-after log bytes. `prebuild-inputs.tar.gz` reproduces the original sealed inputs, including the then-empty log. The separately authorized `postbuild-completion.json` excludes only that mutable orchestration log, completes the source/tool/cache/identity checks, and records **zero rebuilds and zero source repairs**. No failure record was rewritten.

`scratch-handoff.tar.gz` preserves the complete **385-payload** scratch package and seal **`0e4e2d6644c6bede5b164f6c2450c3ebd95460173f27e1537979a052f6d92aa1`**, including the earlier proposals, failed default-budget attempt, source/build/tool records, full static comparisons and raw runtime sidecars. `receipt-build-bindings.json` ties all 68 published suite reports to their executed scratch bytes and the identical main artifact. Historical embedded main-checkout source maps are preserved as incidental snapshots, separately from actual compiler inputs.

Canonical two-curve and nested harnesses retain their approved bytes. The canonical route runner changes only `bindings()` to consume main repository-relative build inputs; its fixture, case matrix, VM controls, signer use, assertions and failure handling are unchanged. The exact patch and hashes are under `route-harness/`. Future fresh execution must repeat original acceptance with that canonical runner before candidate comparison. No previous scratch receipt is mislabelled as a canonical-harness execution.

## Verification

```sh
python -B repro/pump/nested-general-route-fortyeight/verify.py --runtime
python -B repro/pump/nested-general-route-fortyeight/verify.py --current-main --repo .
```

Both modes verify saved evidence and signatures without creating a VM or transaction. The first works on a standalone copied package. The second additionally requires every package/input file to be tracked and checks the actual current compiler-input closure. Its canonical published aliases require no pre-existing `work/` tree. `--check-canonical --repo .` checks the route runner's current build bindings without executing a program.

Historical Darwin Python/solders and Surfpool identities are retained; their installation on Linux is not asserted. Integration proposals under `integration/` are review inputs, not claims that central status, workflow or documentation changes have already been applied.
