# Fees 556 inventory review

The PR206 distribution-helper candidate is the current research inventory.
All 17,331 comparisons across 18 suites were freshly executed after merge,
with zero mismatches. This packet retains the complete result and stdout.
The candidate is `repro/pump_fees/distribution-helper-recovery/artifacts/candidate-candidate.so.gz`
and has SHA-256 `fcb56a875b8f3a2e4805986f488b27708b77b2b66d8bbd04d71ddd3931d1cf52`.

The generated inventory recomputes complete normalized/raw window matching and
call attribution against the captured original: 556 normalized, 118 raw-local,
409 unique structural pairs plus 69 call-attributed pairs, 29 unmatched windows
containing 196,880 original instruction bytes. Matching normalized bodies does
not establish whole-file, transitive or unrestricted behavioral equivalence.

Command: `python3 -B scripts/fees_validate_all.py --candidate work/pr206-review/candidate.so --output work/pr206-review/full-validation.json`

The full result retains the harness's existing comparison fields and exclusions.
No mainnet transaction was executed. The four core selected builds are unchanged.
