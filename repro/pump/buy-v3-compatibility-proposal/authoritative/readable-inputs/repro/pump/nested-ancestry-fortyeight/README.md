# Pump ordinary nested ancestry checkpoint

This checkpoint expands the partial `create_v2` reconstruction to ordinary Tokenkeg curve and migrated Pool ancestry. It retains **48 bounded handlers and 5 partial paths**. The new finite matrix covers depth 1–5, mixed curve/Pool ancestry, asymmetric reserves, and Pool quote adjustments. Its 16 unique cases contain 15 successes and one expected depth-limit rollback with the original `Left: 1` / `Right: 2` diagnostics.

All ancestry is explicitly synthetic, canonical pre-existing state. Fixtures do not execute migration or an initializer to construct ancestors. The final ordinary child creation uses genuine test-owned payer/mint signatures and actual captured program CPIs. New fixtures enable signature verification, blockhash checking, default transaction history, and a 1,232-byte packet bound. No privileged PDA signing substitute or changed authentic historical message is used.

The earlier 9,237 comparisons passed again on the corrected scratch executable, alongside the 16 new cases: **9,253 differential comparisons across 39 suites**, plus **1,024 Surfpool comparisons across 28 suites**. These accepted comparisons contain 27,300 verified signatures. Repeated original-only acceptance contributes 32 separately reported signatures and no new unique cases. The preserved failed depth-diagnostic comparison and its original acceptance contain 96 separate historical signatures and are excluded from passing coverage.

The one clean main build produces the entire same stripped executable and symbol executable as the tested scratch build:

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| candidate.so | 1,598,992 | `568546bcf038740d995325c1e742528f218f630840ac152f96dcf5c2147eabc2` |
| unstripped.so | 2,180,904 | `ca42ab7b4ba47c3ce16929abaf5a62e8a0740877906e9b653c517492c0150025` |

`main-scratch-identity.json` binds both whole-file equalities, both build reports and their exact source maps. Saved runtime evidence applies to main by this identity; promotion did not rerun transactions. `build-comparison.json` records all **37 actual compiler inputs**. The final program README was recorded before the clean build and is checked separately by `documentation-sha256.json` and the current-main gate. It is not one of Pump's 37 compiler inputs. The fixed recipe uses CLI 2.1.21, actual v1.44 compilation/linking, and the unchanged SDK's actual v1.52 strip phase. These phases are recorded separately; the final rustup alias does not establish the compile version. Dependencies, profile and flags are unchanged. Generated deployment keypairs were never read, hashed, archived or uploaded.

`scratch-handoff.tar.gz` retains all 935 payloads and the exact accepted scratch seal `3a907ab0ae1ae926c94951c98aede4da512e8a39e5bca5c5a437fe5fd1464f9c`. It includes source/tool/harness snapshots, complete saved receipts and case journals, source reviews, the first build, the failed diagnostic comparison, packet-size preparation and the reviewed natural `require_gte!` correction. Preliminary unsaved observations from the first oversized-packet attempt are not accepted receipts. The new direct receipt files preserve decoded saved JSON without modifying signatures or results. Some legacy receipt source maps describe the old checkout snapshot; the actual 37 compiled scratch inputs are identified by the retained build record and per-receipt bindings, then bound to main by whole-file identity.

The complete 1,840-byte BondingCurve serializer, all 25 actual direct targets and the discriminator were recomputed against the fresh main symbols. The complete original routing/pricing function is not claimed equal. Guard evidence records the actual inlined diagnostic path and its three matched calls; unused generic helpers are not substituted for actual calls.

Run saved verification from the repository root with an environment containing `solders`:

```sh
python -B repro/pump/nested-ancestry-fortyeight/verify-package.py
python -B repro/pump/nested-ancestry-fortyeight/verify-package.py --current-main
```

The second command requires the package and all bound inputs to be Git-tracked. It checks current source, actual compiler-input closure, maintained and canonical harnesses, captured runtime programs, build helpers, and final README. It does not require a local Surfpool executable; that historical runtime identity is preserved without installation or execution.

The canonical 20-case two-curve harness is `harness/pump_tokenkeg_two_curve_differential.py`. Its only adaptation from the previous harness is the reviewed compiler-input count assertion, 36 to 37. The canonical new nested runner and supporting files are under `nested-harness/`. They are byte-identical to the accepted execution layer, including the expected source map; that exact map also matches the clean main build. Header text saying “proposed” is retained to preserve executed harness bytes. The proposed CI commands are:

```sh
python repro/pump/nested-ancestry-fortyeight/harness/pump_tokenkeg_two_curve_differential.py --candidate repro/pump/nested-ancestry-fortyeight/candidate.so --output work/pump-two-curve.json.gz
python repro/pump/nested-ancestry-fortyeight/nested-harness/proposed/pump_nested_general_differential.py --output work/pump-nested-original.json.gz
python repro/pump/nested-ancestry-fortyeight/nested-harness/proposed/pump_nested_general_differential.py --candidate repro/pump/nested-ancestry-fortyeight/candidate.so --build-report repro/pump/nested-ancestry-fortyeight/build-comparison.json --accepted-original work/pump-nested-original.json.gz --output work/pump-general-nested.json.gz
python repro/pump/nested-ancestry-fortyeight/nested-harness/proposed/verify_saved.py work/pump-general-nested.json.gz
```

`promotion/` contains central integration proposals only. Root integration owns status, completion, workflow and dispatcher changes. Full original ELF equality remains false; compiler/dependency historical exactness and the security audit remain incomplete. `create_v2` still lacks exhaustive ancestry/error/input and Mayhem coverage. New Token-2022 ancestry/extension modes are outside this checkpoint. The previous restricted one/two-curve route coverage is unchanged; this checkpoint does not implement general routing. The stopped sell_v2 transfer-fee, incentives, Mayhem initializer and v3 extension work remains stopped. The known sell_v2 transfer-fee boundary mismatch remains a current limitation.
