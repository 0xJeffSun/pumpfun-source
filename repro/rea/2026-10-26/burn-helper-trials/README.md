# Relay burn-and-close source trials

Six source-only experiments tested the still-unmatched burn-and-close helper
(original window 109, 2,856 bytes). All compiled successfully with the recorded
SDK v1.48 build pipeline. None produced an additional complete normalized match,
and none lost a previously matched original window. The accepted source remains
the 477-window Jupiter checkpoint; no source from these trials was promoted.

The trials cover direct context-field access, returning the close-account result
directly, binding the token alongside other fields, and crate-level visibility.
Candidate helper sizes range from 2,784 to 2,944 bytes. Size proximity is not
acceptance. In particular, removing initial local bindings shortened the helper
but reduced instruction-sequence agreement with the captured function.

`trials.json` records the exact changed function source, artifact digests, helper
size/hash, and matched-set differences for each trial. Per-trial files preserve
input-manifest and full-ELF comparison summaries. Original work directories retain
complete source snapshots, compiler logs, binaries, and complete function/call/data
ledgers. These experiments reused dependency outputs and did not run new runtime
suites because no candidate met the static promotion gate.

The current baseline still has 15 unmatched original windows. The helper's
captured opening copies the mint, authority, destination, and program account
records from its context before the conditional burn. Its error cleanup must be
reconciled with source ownership and declaration order. The six tested forms are
not evidence that alternative source forms or the original compiler cannot match.
