# Portable verifier link hardening

This copied packet changes only verification logic and its package seal. No new build, source variant, compiler invocation, network request or target execution occurred. All original source, build logs, executable artifacts, distribution/source/dependency receipts and analysis results remain byte-identical to the original publication.

The verifier now derives the registry source root from the saved build environment and extracts its exact package-root set from the saved gzip verbose build log. It requires equality with the distinct dependency receipt entries, exactly 142 roots, and 3,392 verified source files.

The verifier also binds all six saved Unicode array addresses to actual LDDW operands and relocation records from the freshly recomputed unique complete 768-byte helper match. Every source-defined array length/hash and all 1,449 original/candidate/source bytes remain checked. Distinct constants and helper offsets must cover all six actual references exactly once.

Original `publication/` is unchanged. Differences from it are `verify.py`, the regenerated `manifest.json`, and this added note. Scientific conclusions, accepted artifacts, defaults and status are unchanged; whole-file identity and unique historical compiler identification remain false.
