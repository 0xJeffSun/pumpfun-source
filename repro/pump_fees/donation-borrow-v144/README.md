# Fees donation borrowed-account checkpoint

The clean main build contains exactly the two approved Pool and sharing-account
`AccountInfo` clone-to-borrow substitutions. All other Rust, lockfile, dependency,
profile and build-helper bytes are unchanged. The final program README is bound
among all 26 actual source/workspace/IDL inputs. No optional quote-helper change
is included. The 31 bounded handler count and 17,461 comparison count are unchanged.

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| Main stripped ELF | 770,016 | `5cf8d567934188d1307d2f9f3d2220ede52f6978e389064b08897441fbdd7d49` |
| Main symbol-bearing ELF | 1,098,232 | `99ac87e9b79e86e23d7458400475d5d967545e345767d0263d544bfd02660a07` |

One clean main build used the same pinned v1.44 compilation and actual v1.52
`llvm-objcopy` stripping recipe. Both entire files are byte-identical to the
approved scratch build. The saved 17,441 baseline comparisons, 20 focused
comparisons and separate ten-step donation sequence therefore apply to this
executable; they were not replayed on main. No newly unique cases are claimed.
The focused20 inputs were already accepted at the prior donation-business
checkpoint. Eleven strict saved diagnostic rows also pass. The saved verifier
checks 17,284 signatures in encoded fields and two unchanged historical messages
separately; some older baseline reports retain runtime signature assertions
without full transaction encodings.

The focused run's complete successful report and final zero-mismatch log are
retained, but its numeric process exit code was not separately persisted. No exit
code is fabricated. Every focused expected outcome and encoded signature is
rechecked. State, events, inner instructions, return data, rollback, errors and
semantic logs retain the existing strict assertions. Source coordinates and
compute-unit lines remain the established semantic-log exclusions, with raw logs
preserved.

The complete normalized 928-byte wrapper and 8,984-byte account parser still
match the original. The donation handler is 12,864 bytes versus the original
inferred 13,800-byte window and **still does not match**. A size reduction is not
proof of improved byte distance or complete semantics. The exact same executable
retains all ten prior complete-body gates, 26 direct-call checks, five literals,
and five codecs with 35 direct calls. Nineteen complete directly referenced data
objects and six business-error strings were checked. The 585-original-window /
546-candidate-window inventory and all residuals are retained. Indirect and
transitive closure, historical source/compiler identity, full original-ELF
equality and the security audit remain incomplete.

`scratch-handoff.tar.gz` preserves every byte of the approved 330-payload scratch
package, including its earlier prebuild, exact source proposal, failures from
read-only analysis preparation, fresh runtime receipts, signature verifier and
full static ledgers. Its manifest SHA-256 is
`3f6b1a631beb97ded199fa82dae1b25718da5cce9a553defb6002a79b1bcd6c5`.
`main-scratch-identity.json` and each receipt binding distinguish executed scratch
inputs from the final main inputs. Only the final README differs between their
source maps. The initially empty redirected build log is preserved in the exact
main-prebuild snapshot; the completed orchestration log is saved separately.
Generated deployment keypairs were excluded before reads and are not packaged.

`validation-layer/` retains the four byte-identical focused harness files and all
20 case definitions. The two publication adaptations are explicitly recorded in
`focused-publication-adaptation.json`: an expected-source map containing the
final main README, and its actual main build record. These are for future CI
execution; they do not replace the saved scratch receipt's original bindings.
Historical draft docstrings and scratch source-map metadata remain labeled by
their preserved context. The 46 recorded baseline harness entries map to 44
canonical tracked paths through the two existing exact aliases.

Saved verification uses Python with `solders` installed and makes no new
transactions, builds or network calls:

```sh
python -B repro/pump_fees/donation-borrow-v144/verify.py --runtime
python -B repro/pump_fees/donation-borrow-v144/verify.py --current-main --repo .
```

The second command requires current files to be tracked and checks all main
source, helper, harness, focused-map, fixture and executable bindings. It needs no
historical work directory, compiler installation or local Surfpool executable.
`ci-proposal.json`, `workflow-proposal.patch`, `dispatcher-proposal.patch` and
`status-proposal.json` are integration proposals only; this package does not
modify those central files. The earlier donation-business and other published
packages remain immutable. All previously stopped lanes remain stopped.

The copied tracked-checkout check passed outside the original workspace. Missing
candidate evidence, tracked README drift and candidate-byte tampering (even after
outer re-sealing) were all rejected. `verification/` retains the tested pre-final
manifest and outcomes; this final package seal additionally includes those records.
