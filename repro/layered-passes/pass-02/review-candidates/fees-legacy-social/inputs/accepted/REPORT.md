# Fees predicate and quote ownership candidate

This is an isolated review candidate, not a main acceptance. Exactly one offline SBF source build was executed. Only the two root-reviewed patches were applied to the exact 26-input Fees5cf8d567 source map. No source-origin remapping, ELF modification, compiler search, new runtime cases, or assertion changes were used.

## Identity and scope

- Base: `5cf8d567934188d1307d2f9f3d2220ede52f6978e389064b08897441fbdd7d49` from `repro/pump_fees/donation-borrow-v144`.
- Candidate: `a769ab3ccbb343e19a8aace7f7fd537725c27c90e09768daa4cd13cd73f4b9a9`, 770,000 bytes.
- Symbols: `caf22f0a97af5be2da5a2dda0f61aa61ee6e2c8c546b591740febe2b287782f3`, 1,098,152 bytes.
- Original: `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`, 948,944 bytes.
- Sharing proposal seal: `8ad432b810ef4a0ec6a80a791d7fe16217f7f23f1278d502831bdfae3b62bb77`.
- Quote ownership proposal seal: `5f29f97327a5aed7d5145ec603cf680af37da80f4c78cd0e0d6d5badb05ee3bb`.

The quote patch base is exactly `540a659ea7d2867db556b2dc95a2b085fb99e4d34d59fc211488c33910d2d40b`. The sharing patch base is exactly `b9027bc812dd287859171bad6471302e079abd0609461fc124e8abbf6188c009`. The prior Pool and SharingConfig clone-to-borrow changes remain present. `approved-source.patch` is the concatenation of the two supplied patches; the other 24 mapped inputs are unchanged. No social-helper, legacy quote-admission, or remaining-account proposal is included.

## Build and static findings

The unchanged successful main runner's four build helpers were reused from its snapshot. The local adapter copied the exact source snapshot and verified dependency cache into this assigned directory; the helper retained its own clean target, SDK copy, isolated rustup alias, locked/offline options, and v1.44 compile / v1.52 strip behavior. The paths are honest isolated paths; no remapping was introduced. The 252 locked registry packages and their recorded archive/source hashes were verified before compilation and rechecked afterwards. The public registry index was copied and separately inventoried. Mutable orchestration logs were excluded from immutable prebuild source assertions.

Compiler return code was 0. The full `build-01/build.log`, outer stdout/stderr, build attempt, source before/after map, tool observations, and compiler sysroot record are retained. No backend stack diagnostics were found. Only named candidate and symbols outputs were copied. Generated deployment keypairs were not opened, hashed, copied, or published; build target directories are not part of this publication.

Fresh static evidence records:

- Original four-reserve predicates at 237576 and 240232; candidate equivalents at 505656 and 514672. Each loads the four reserves and skips the AMM path on any nonzero value. Both then compare owner against the 32-byte System key. No lamport-value condition intervenes in either candidate gate.
- The owned raw quote helper was inlined. Candidate reads the raw quote words at offsets 107, 99, 91 and 83, releases the data Ref at 425320, then decrements the two cloned Rc strong handles (including their conditional weak cleanup) before the zero comparison at 425608. The short-data branch joins before ownership destruction. Original ownership instructions are retained and freshly decoded alongside them.
- The normalized complete donation wrapper (928 bytes) and parser (8,984 bytes) match. The full donation handler (12,864 bytes versus the original inferred 13,800-byte window) does not match. Full sharing-handler comparisons are also retained without promoting short matching instruction runs to full handler equality.
- Every one of 585 original windows and 546 candidate windows is retained. The inventory includes 145 unattributed original rows, 105 unmatched candidate rows, three call-conflict rows on each side, and ambiguous alternatives. Inferred original boundaries are not claims of historical source function boundaries.

Whole original ELF equality is **false**: first differing byte 25; 421,313 differing positions in the shared length; candidate is 178,944 bytes shorter. Normalized windows and finite runtime tests are not whole-binary equality or a security proof.

## Runtime and portable verification

All 17,441 baseline comparisons, all 20 focused comparisons, and the separate ten-step sequence passed. All eleven processes returned 0. Saved verification checked 18956 signatures across 9520 encoded transaction fields (including bootstrap fields); all eleven retained diagnostic rows matched. These are repeated saved fields, not a count of unique transactions.

Final results are recorded in `runtime/summary.json`, `runtime/progress.json`, and `saved-verification.json`. Each process has separate stdout/stderr and numeric return code, including the focused process. The unchanged 17,441 baseline comparisons, unchanged 20 focused comparisons, and separate ten-step sequence retain their own reports. The existing eleven saved diagnostic rows and saved encoded transaction signatures are checked by `verify_saved.py`; the inherited saved-runtime assertions are preserved with only file-location adaptation in `verify_prior_saved.py`.

The baseline suite retains its original approved controls and limitations. The focused suite uses real signatures, blockhash checking and default history. No cases or expectations were changed. Historical initializer transactions remain the original signed inputs and retain their freshness control. No chain transaction was submitted.

`verify_saved.py` performs offline saved-evidence verification only: it does not run an SBF program or submit a transaction. It validates the seal/file inventory, source and tool bindings, original comparison, runtime signatures/diagnostics, targeted static bytes and regenerated full function inventory. `portable-exit.json` and `portable-verification.json` outside the publication record execution on a separate complete copy. `ownedmap.json` maps every published file and the portable verification outputs; build caches, generated artifacts, and live supervisor logs are intentionally outside the proposed integration set.

## Remaining limits

No new reserve-variant cases or genuinely present zero-lamport account cases were added. Those coverage gaps remain explicit. Existing zero-lamport edge fixtures do not establish presence of such an account in the VM. Historical compiler/dependency provenance, indirect calls, transitive data, full diagnostics and exhaustive input semantics remain unresolved. The registry/tool witnesses establish this build's selected inputs, not unique historical provenance or a complete trusted-computing-base proof. This publication requires root review before any main acceptance.
