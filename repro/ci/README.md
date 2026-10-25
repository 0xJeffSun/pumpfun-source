# Clean-clone verification portability

Hosted run 40165134672 on `8099031` completed the Pump group4 and Fees runtime suites, then failed optional current-main verification because historical scratch harness paths were absent. [Failure metadata](hosted-8099031/failures.json) retains exact exceptions, job links and raw log hashes.

The immutable saved-evidence packages are unchanged. CI runs their portable verifiers, then `scripts/verify_current_bindings.py`. It checks all 163 Pump and 92 Fees bindings, using exactly four byte-identical published harness copies, and retains the complete Pump serializer, all25calls and literal checks. The old Darwin Surfpool executable is only identified by saved hash; no Linux installation or Surfpool replay is claimed.

[Independent review](current-bindings-8099031/summary.json) used a 378-file tracked-only fixture without a work directory and an external working directory. Both new binding modes and both immutable package verifiers passed. All24missing/tamper/untracked-copy checks failed as intended; restored positive checks passed. This is local Darwin/Python3.14 verification, not a claim about a later hosted run. The review's original nine-file seal is preserved.
