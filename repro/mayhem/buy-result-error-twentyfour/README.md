# Mayhem BuyPumpSwap typed-result error refinement

One isolated build of the reviewed two-file source change passed the unchanged21-suite baseline: **9595 functional instruction comparisons, zero functional mismatches, no new unique cases**. The recorded/derived signed-execution count is19190; this is not a claim that every signature was independently reverified from retained raw transaction bytes. The prior source path/line and compute differences remain explicit, including the three second-burn rows.

The candidate is668544 bytes, SHA256 `dda5554a2faf8aa40fc86547e91c4b32c6ac44b878073dcb8bd9f7ac60b47cd4`. Its unstripped file SHA256 is `f356e4a5c28ba6b5fb2312c6799470a0ffc9e8bec39984650de33797042ba1d2`. The original SHA256 is `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. Full original ELF equality is false.

## Change and observed behavior

`proposal.patch` adds the original `PumpSwapCpiMathOverflow=11` name/message to the existing `PumpSwapError` and replaces the sizing division's `Option::unwrap` with `checked_div(...).ok_or(PumpSwapError::PumpSwapCpiMathOverflow).unwrap()`. Arithmetic and the terminal failure remain; no recoverable error return is substituted. No other handler is changed.

The original sizing routine stores discriminant11 and constructs a typed `Result::unwrap` failure. Its Debug table yields `PumpSwapCpiMathOverflow`; its Display branch yields `Math Overflow in Pump Swap CPI call`. The built candidate now has the same typed error construction and name, with a size4/alignment4 formatter vtable. These facts are asserted by `static/check.py` and recorded with whole-function assembly. In the unchanged exercised BuyPumpSwap zero-effective-reserve case, the earlier extra Option-unwrap message disappears. Its source location still differs from original. We do not claim exact full logs or complete formatter/allocator equivalence.

## Files and provenance

- `build01/artifacts/mayhem_recovered.so`: raw compiler output after normal SDK stripping; no padding or byte patch.
- `build01/target/sbf-solana-solana/release/mayhem_recovered.so`: unstripped build for symbol evidence.
- `build01/build-attempt.json`, `build-comparison.json`, `build.log`: exactly one v1.52 pinned-recipe build, source closure, compiler/SDK hashes, and warnings. There were no backend/compiler errors. Existing unused/dead-code and tool syscall-discovery warnings are retained.
- `proposal/`: exact two Rust source files, README proposal, and a Mayhem-only status-object proposal. It preserves detailed family counts, receipt hashes and burn known differences; it must not overwrite other programs' concurrent status entries.
- `source/programs/mayhem/`: complete scratch source/lockfile. Decoder, preparation, account and other handler sources were unchanged. `gate-before.json`, `gate-after-build.json` and `gate-after-runtime.json` bind those sources, helpers, fixtures and tools. `dependency-integrity.json` verifies215 retained registry archives against Cargo.lock and each archive member against cached source; selected compiler/SDK hashes equal the accepted baseline.
- `replay/*.json.gz`: all20 flat fresh receipts. They contain9589 comparisons. `replay/burn/` holds three two-step sequences, supplying the additional6 comparisons. All raw state, errors, transaction records and log differences are retained. `verification/` contains unchanged verifier outputs. Administrative receipts do not all retain transaction bytes; the derived19190 count is not independent byte-level signature proof.
- `receipts-and-verification.tar.gz`: full uncompressed receipt/log/attempt/verification corpus and original captured burn fixtures. `runtime-repository.tar.gz`: unchanged runtime helpers, exact input images/cases/captures and scratch source arranged at their required relative paths. Neither archive contains the generated deployment keypair.
- `static/complete-inventory.json.gz`: full original/new inventories, call/data/branch/relocation rows, complete file mismatch intervals and sections. It uses the prior normalization method and candidate alias grouping. There are441 original windows and410 new grouped candidate windows (504 symbols);184 previously admitted original bodies are refreshed and257 original windows remain opaque.172 candidate windows have admitted-original matches. No percentage is inferred from these counts.
- `static/full-ledger.json`: retained441 original and409 prior candidate rows plus all504 new candidate symbol rows, explicitly distinguishing symbol aliases from windows. No excluded or opaque original region was newly decoded.
- `initial-source-review.tar.gz`: the immutable source-only review and original evidence preceding build approval.
- `PROMOTION-UNRUN.md`: the worker's unrun one-clean-main-build recipe. Main promotion and source/identity gating belong to the separate companion `repro/mayhem/buy-result-error-main-twentyfour`; this scratch package does not assert that companion's result.

## Verification and reproduction

Run `python3 -B verify.py` to verify the full package seal, candidate hashes, all receipt counts and explicit burn differences without running a program. Run static regenerators only in a disposable copy because they rewrite their derived evidence. They use only package-local files and the standard library.

To replay the same cases on a compatible host, extract `runtime-repository.tar.gz` and use its unchanged scripts with the candidate at `runtime-repository/repro/mayhem/result-error-candidate.so`; use the fixed case paths already in that tree. Burn fixtures are in `receipts-and-verification.tar.gz`. The full original commands are retained in replay attempt logs, and `methods/replay.py` preserves orchestration logic. Paths in historical command records are provenance, not portable working-directory assumptions. Python/solders/tool versions and file hashes remain recorded; no new fixture or network lookup is needed.

## Failure history and limits

No target/build failure occurred. Three preparation/analysis assumptions failed and are retained: an absent `.cargo-checksum.json` assumption was replaced by authenticated archive-member verification; an equality check of enriched versus basic inventory dictionaries was narrowed to raw/normalized hash agreement; and an initial summary incorrectly assumed the burn runner's mismatch array was empty. The final summary preserves the three known diagnostic-only burn mismatches and unchanged verifier acceptance. No failure was hidden by modifying a target, harness, fixture or comparison policy.

The excluded Mayhem initializer, Pump sell_v2 correction lane, incentive paths, other stopped token-extension work and extra Metaplex probes were not worked on. This is a bounded source/error-construction refinement and finite regression result, not full program/security/source/compiler recovery.
