# Fees inline runtime receipt copies

These ten compressed receipts are byte-identical members of the immutable `initializer-inline-v144/scratch-handoff.tar.gz`. They expose the already verified 17,441 comparisons and ten donation steps to the standard repository provenance verifier. No program was rebuilt, transaction replayed, signature changed or case added.

Hosted evidence job 121090394372 at commit517d77d failed because its status references selected the condensed runtime summary, which lacks the per-receipt schema required by `scripts/verify_recovered_builds.py`. This publication restores references to actual receipts; it does not relax that verifier or alter the sealed source/build package. Fresh hosted runtime jobs have independent outcomes.

Run `python3 -B verify.py --repo /path/to/pumpfun-source`. It requires the original published archive and candidate, validates the seal and each exact compressed member, and checks original/candidate identities and counts. The standard repository verifier additionally checks its existing historical signature/state/balance and sequence assertions. The main inline package retains the deeper static/runtime saved verification. The receipt source identities remain the actual scratch build, carried to main only through complete ELF equality.
