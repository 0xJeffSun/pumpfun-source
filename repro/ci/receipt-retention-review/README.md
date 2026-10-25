# Receipt references and Linux output retention: independent review

The receipt-reference fix at `641b042` is consistent with the sealed Fees `01fedce5…` checkpoint. All ten public gzip files are exact copies of their sealed archive members. The unchanged generic verifier passes with 17,441 saved comparison receipts, ten donation steps, and the two original signed historical transactions. No new program build or runtime replay was performed. There is no remaining review blocker after the root-owned symlink-order correction described below.

`revisions.json` binds the exact before/after commits. `fixture/` contains only 51 required public files read with `git show 641b042:<path>`, including the 22 source inputs of that historical checkpoint. The current working program source is intentionally not used: another agent was legitimately promoting it during review. `fixture-git-bindings.json` records each byte count, SHA-256 and Git blob ID. The source, artifact, comparison report and build log checks therefore describe the old `01f…` checkpoint accurately.

The first generic-verifier fixture attempt lacked its transitive `scripts/analyze.py` import and stopped before validation. That setup failure is preserved in `first-command-results.json` and `logs/generic-fees-first.*`. Adding the unchanged file from the same commit completed the 51-file fixture; the subsequent unmodified verifier passed. This is a fixture-closure correction, not a repository source or verifier change.

## Receipt checks

The archive is `repro/pump_fees/initializer-inline-v144/scratch-handoff.tar.gz`, SHA-256 `ff459202581b853106f3c461c05233819a012cd4d47895602bbd3e491350e4ca`. Its inner manifest SHA-256 is `e1826ed7fa4018274c46d2df281ac294411269ae788369669cbacaa38dd188b8`. Each published gzip file equals its archive member byte for byte, and its SHA equals both the archive's sealed manifest and the new provenance map. The candidate remains `01fedce5878ec14618233c4683bcb4149e471775acb48ffb69614d9df570bb95`; the original remains `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.

| Public receipt | Comparison count |
|---|---:|
| initializer-history | 2 |
| initializer-rejections | 28 |
| messages | 2 |
| compared-values | 9 |
| authority-logs | 3 |
| codec-rejections | 9 |
| signed-transfers | 56 |
| serialization-error | 1 |
| differential | 17,331 |
| **Nine-report total** | **17,441** |

The tenth file is the separate ten-step donation sequence. Status points to the nine comparison reports exactly once each, the donation receipt in `signed_sequence_reports`, and the actual history receipt in `authentic_historical_replays`. The four focused assertion pointers also identify their corresponding public receipts. Candidate identity, counts, old checkpoint links, and every other program's status are unchanged. The history report participates in the nine-report total; its separate history pointer does not add another two cases.

`scripts/verify_recovered_builds.py` is byte-identical before/after. Its source hashes, complete candidate/original comparison, build-log hash, receipt identities/counts, donation signatures/step equality, and authentic captured transaction signatures/messages remain checked. The workflow adds the archive-copy verifier immediately before this unchanged generic verifier. The public-copy verifier supplements the generic checks; its condensed summary is not used as a replacement receipt. The review did not broaden the historical bank/freshness claim or transfer old runtime acceptance to another candidate.

## Retention checks and resolved finding

At committed `641b042`, output retention adds the emitted unstripped path `target/sbf-solana-solana/release/pump_fees_candidate.so` under evidence name `pump_fees_candidate-unstripped.so`, alongside the existing stripped candidate. The common finalization path retains outputs after success or failure once a compiler attempt was counted. Existing generated `*-keypair.json` exclusions operate by path before opening or hashing content; omitted entries record paths only. Retained ordinary files are included in the final evidence hashes. These tests use synthetic bytes, not a compiler or executable program.

All **13 committed retention tests and 20 unchanged pipeline tests** passed. The three new committed cases cover unstripped retention on failure with hashing, rejection of an unstripped leaf symlink to an excluded key file, and rejection of a nested parent-directory symlink before copying.

The independent review found a pre-existing gap: `retain_generated_outputs` called `tree_hashes(target/artifacts)` before the candidate path-chain symlink guard. Python's `os.walk(root, followlinks=False)` still follows a symlink supplied as the root. A bounded synthetic observer intercepted `digest` before opening bytes and proved that `attempt/target/object.bin` was requested through an aliased root. The same observation occurs in both `517d77d` and `641b042`; no actual key material or external content was read. Initial observations and the original code are preserved.

The root agent moved the entire two-path chain guard ahead of inventory and added `test_output_root_symlink_is_rejected_before_inventory`, which forbids every file read and checks an empty read list. This follow-up is retained separately in `fixed/`, not substituted into the historical Git fixture:

| Corrected file | SHA-256 |
|---|---|
| core_linux_v144_build.py | `0e73e769f7ee982f47c9b8a07875955b855f5710a69494d96df8409859c7cffe` |
| test_core_linux_v144_retention.py | `8656371c72f49e0ec3da8e4abcc4602bc651370ad8e3bee63d6b77711539b12c` |

Independent execution of those frozen corrected files passes **14 retention tests and 20 pipeline tests**. The same digest observer now receives `ValueError` before inventory with **zero digest calls**, and no target inventory is written. Only `retain_generated_outputs` changes in the helper; build commands, source pins, compilation/strip phases, registry checks and other functions remain unchanged. The correction addresses this ordering finding; it is not a general defense against concurrent filesystem replacement or a promise to validate every partial failure output as a complete ELF.

## Verification and scope

Run `python3 -B verify.py`. It checks the complete review seal, recomputes archive/receipt/status/fixture checks, repeats the small before/after ordering observation, and runs the frozen generic, receipt-copy and synthetic checks. It uses only retained files and local Python (`solders` is required by the unchanged history verifier). It needs no Git checkout, network, compiler or Solana runtime. `command-results.json`, `review-results.json`, and `logs/` preserve the actual outcomes; `change.patch` and `followup-fix.patch` distinguish the reviewed commit from the root-owned subsequent fix.

This review owns only `work/receipt-retention-independent-review`. It did not edit central source/status/workflows, stage or commit files, read private audit material, perform network requests, build programs or create runtime receipts. The positive checks are local saved-evidence validation, not a claim that a later hosted CI run passed.
