# Metaplex audit-source recovery trial

This five-file source patch retains candidate5's two recovered edition behaviors and adds two further capture-supported changes. The burn handler checks the edition PDA even when a nonce is stored; static instructions show a cloned seed vector concatenated with the nonce before the derivation call. The metadata creation helper removes the legacy seed-authority exception; its32-byte key appears in candidate5 but is absent from the capture.

These changes are consistent with fixes documented in the [July2025 Neodyme audit](https://neodyme.io/reports/Metaplex.pdf). The audit names private-source revisions unavailable through the current repository connection. It does not establish that this patch reproduces their exact source, nor imply a current vulnerability in the captured program.

`source-inputs.json` binds the unchanged public baseline and all five patched files. No executable bytes or headers are edited. This package is an input trial; compilation, post-build function comparisons and runtime checks remain required before any result is claimed. The prior immutable source-recovery and candidate5 packages retain the preceding experiment.
