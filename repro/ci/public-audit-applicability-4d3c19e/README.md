# Public source-review applicability at frozen checkpoint 4d3c19e

The four public reviews frozen at `517d77db988d8c63b6cf476f0be138c5a4f3128a` remain bounded candidate-source evidence. This ledger reconciles them with the then-current committed source at `4d3c19e3c58427f3604caede144b3322fa56d2b5`. It preserves all **25 candidate observations, 112 Accounts contexts and 422 function declarations/dispositions**, including four explicitly excluded Pump function-boundary rows. None of the observations is marked resolved, and no captured-original vulnerability or whole-program security sign-off is established.

| Public review | Function dispositions | Contexts | Observations | Source applicability |
|---|---:|---:|---:|---|
| Pump | 187 | 38 | 5 | Local source unchanged; four excluded boundary rows remain excluded. |
| AMM | 112 | 29 | 9 | One function changed: update_fee_config. All context declarations are unchanged. |
| Fees | 62 | 30 | 5 | Explicit function/context text unchanged; five complete account declarations moved with public reexports. |
| Mayhem | 61 | 15 | 6 | Local source unchanged; initialization/dependency exclusions remain. |

The reviewed historical candidate hashes remain recorded verbatim in `applicability.json`: Pump `5c1c1c2d…`, AMM `5a68db39…`, Fees `01fedce5…`, Mayhem `9e4e19df…`. The coordinator identifies the current AMM/Fees artifacts as `a6dbd0dc…` and `8cce74a5…`; Pump/Mayhem remain unchanged. This source-only reconciliation independently binds Git/source hashes, not new ELF or runtime acceptance. The changed artifacts' prior acceptance reports are outside this restricted input scope.

A separately authorized later AMM promotion changed the working tree during final verification. The optional live-source check rejected that drift, as recorded in `live-source-drift-detection.json`. This package does **not** review or certify the newer working source; references to current spans below mean the frozen 4d3c19e snapshot.

## Exhaustive span mapping

`applicability.json` contains an individual base/current path, byte range, line range and SHA-256 for every function and context, with the complete original review record retained. `functions.csv` and `contexts.csv` provide compact indexes. Of the functions, 375 remain at the same byte span, 46 have identical text at shifted offsets, and one changed body is directly rereviewed. All 112 contexts are text-identical: 99 at the same offsets and 13 shifted. Every primary cited span for all 25 observations is byte-identical in current source; `OBSERVATIONS.md` lists all observations and their retained scope.

The ledger also maps 1,185 nested supporting source references. Nine composite Fees references crossed account/event/context regions whose account declaration moved. Those entries explicitly reject a contiguous current-span claim and point to both the former module's reexport and the new declaration file. They are not quietly counted as unchanged references.

Ninety relevant source/manifest/lock paths are frozen from both Git checkpoints where present. The ten changed Rust paths are exactly the AMM setter file and the nine Fees module/source paths. All relevant retained manifests and locks are unchanged. Public audit metadata/dependency excerpts are checked against their original publication seals. Only selected audit files are copied; this is not a claim that these subsets are independently complete original audit packages. Their historical conclusions remain quoted evidence, not instructions or new proof.

## Changed source reviewed directly

**R1 — AMM scalar guard order.** The explicit AdminGlobal context is unchanged. Both versions accept the same scalar/recipient predicate: each rate at most 1000, recipients nonzero and strictly ascending. The current body checks and assigns LP, then protocol, then recipients, then creator. Recipient failure now wins over a simultaneously invalid creator fee after the first two checks pass. The retained Anchor require_gte macro attaches `Left: 1000` and the supplied value. The old conjunction did not attach those values. Current in-memory assignments precede later rejection paths, so any statement about persisted state must retain the existing exit/rollback assumptions. Successful assigned fields, event fields and authority policy are unchanged. This is a source-level rereview of the difference, not a new runtime rollback or original-instruction proof.

**R2 — Fees account placement.** BuybackVault, SocialFeePda, DonationFeePda and FeeProgramGlobal move to state.rs; SharingConfig moves to instructions/fee_sharing/create_fee_sharing_config.rs. The complete account declarations are byte-preserved, and public reexports keep existing imports valid. ConfigStatus, Shareholder, explicit handler bodies, account-context declarations and dependencies are unchanged. Seventeen contexts directly mention moved account names; the ledger also identifies direct function/context-type consumers. Module identities, generated-code locations and source diagnostics change, so old macro/ABI/codegen claims cannot be transferred solely because field text is unchanged. The source-level field/constraint review is preserved; complete generated behavior remains a separate review obligation.

**R3 — Preserved limitations.** Unchanged functions are not new security clearance. All 25 observations keep their exact authorization, reachability, configuration, policy and dependency prerequisites. Local Pump/Mayhem equality does not close their AMM/Fees composition assumptions. Missing initialization, unsupported asset paths, opaque state roles, errors/ABI, original-byte divergence and external runtime guarantees remain outside complete sign-off. Stopped handlers and probe lanes are not reopened; excluded rows receive only byte/disposition preservation.

`changed-source-review.json` records the specific preserved/changed assumptions and outstanding review boundaries. It also retains a narrowly scoped **F05 follow-up lead**: current Fees getter selection is local, the retained Anchor generator sets non-unit return data after successful return, and its two simple readonly/non-close accounts generate no later field exit. This does not resolve F05. The concrete next prerequisite is binding that generated code and return-data semantics to the relevant compiled/runtime identities; no new runtime test or original-security conclusion is supplied.

## Verification and limits

Run `python3 -B verify.py` from any directory. It verifies the seal, selected public-package hashes, Git blob/SHA-256 identities, exact source reconstruction and account moves, all 422/112 records, all 25 observation citations, the supporting-span dispositions and unchanged dependency boundaries. It checks mechanical consistency, not every manual review conclusion. No third-party package, network, compiler or Solana runtime is needed. Add `--git-repo /path/to/pumpfun-source` to rebind all inputs to the exact recorded Git commits. The separate `--repo /path/to/pumpfun-source` option checks live files and correctly fails after later authorized source changes; it does not replace the frozen commit scope.

One collector/verifier assumption was corrected and retained: Mayhem's public seal is plain `SHA256SUMS`, not JSON. Its exact original text is now parsed directly. No historical package was changed or resealed.

Only `work/public-audit-applicability-current` was written. Inputs were restricted to public tracked audit packages and relevant Git/current source. No private audit output, security-followup work directory, exploit material, new fixture, runtime probe, source build, network request, staging, commit or program-source edit was used. Source applicability is not deployment readiness, comprehensive audit completion or proof about captured-original vulnerabilities.
