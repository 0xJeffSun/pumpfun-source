# Metaplex Utilize local investigation — 2026-10-27

No accepted source improvement and no new GitHub PR. This is a retained negative research record, not a fidelity gain or a deployment approval.

The pinned public source (812 tracked files), 18 recorded source overrides, SDK v1.37 and exact Linux image reproduced the accepted owned-Uses checkpoint byte for byte: 707,448 raw ELF bytes, SHA-256 `0b9e26663abd22ba76e6b978423dcb9c18f28fcdcbfb877feb4fb714346538b7`. Original allocation has 86,543 extra zero bytes; those are counted only for comparisons, never written into the compiler artifact. The original remains `31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011`.

## Result

The control still differs at 80 allocation positions: 79 instruction bytes in Utilize and one relocation byte. All 1,250 other inferred function windows remain raw equal. Current source is not historically authenticated. Twenty source experiments produced either identical control code or regressions. They are not selected. `Copy` implementations additionally lost an existing normalized body match (original range 326416+3184); a closer-looking Utilize instruction sequence is therefore not a program recovery.

Fresh local execution: 147 cases, 294 verified signed transactions, zero error/state/inner-instruction mismatches. These receipts apply only to the exact rebuilt control, not the rejected trials. The direct 12-case Utilize matrix does not establish delegated-authority success. Finite cases do not prove universal equivalence. Existing sealed packet and all source hashes were rechecked; scratch source was restored to the control.

## Execution and evidence

All commands, source manifests, build logs, candidate artifacts and trial source files are retained here. Compiler containers used `--network none`, the pinned SDK read-only and no captured binary mount. Public dependency fetching ran separately with network access. Cargo cache and build target were writable; this was a cached-dependency reproduction, not a fresh hermetic registry audit. The first control build started with a new target; subsequent variants reused dependency outputs. The local SDK archive hash is in `setup.json` and rustc matches the recorded SHA-256.

The scripts retain absolute local paths for replay. Workspace: `/home/ahi200/pumpfun-work/20261027-metaplex`; source repository: `/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source`. Setup: `python3 metaplex_setup.py`; dependency fetch: `python3 metaplex_build.py fetch`; offline control: `python3 metaplex_build.py control`; each experiment script invokes that builder serially. Runtime: `python3 metaplex_validate.py`; independent receipt checks: `runtime-venv/bin/python metaplex_archive.py` (writes a new review directory).

The last check used main `2f594eb4f917f779467cb06c1aa1975f575703c9`, Actions run [40502777082](https://github.com/lalalune/pumpfun-source/actions/runs/40502777082): evidence, imported-lab and pump-amm succeeded; nine jobs were still running. Earlier runs were cancelled by successive main updates. PR245 merged at 2026-10-27 11:21:01 UTC. Its merge CI failed on missing Mayhem generated inputs, repaired upstream by PR247; no duplicate repair was submitted.

## Before / after

The byte-position count below includes address-shift cascades; it is not a normalized-function score. Rejected sources are not runtime validated. No binary, relocation or instruction was patched.

| Trial | Raw bytes | Different allocation positions | SHA-256 prefix |
| --- | ---: | ---: | --- |
| as-ref-clone | 707496 | 208051 | 930f8c3fce20 |
| as-ref-cloned | 707512 | 340654 | 646983ae1042 |
| clone-into | 707448 | 196574 | d1bc08cafbb7 |
| control | 707448 | 80 | 0b9e26663abd |
| explicit-option | 707528 | 228424 | 0d14a24f1cf6 |
| if-let-remaining | 707448 | 80 | 0b9e26663abd |
| inline-fields | 707592 | 226727 | 94936800afb4 |
| inline-forward | 707448 | 81 | c537ba422bc8 |
| manual-copy-clone | 707432 | 176946 | 596184a9ba11 |
| manual-copy-owned | 707448 | 47619 | 5b11acc3b365 |
| mapped-owned | 707592 | 226723 | c100b3083be1 |
| match-none-first | 707448 | 80 | 0b9e26663abd |
| match-some-first | 707448 | 80 | 0b9e26663abd |
| ok-or-else | 707448 | 80 | 0b9e26663abd |
| replace-owned | 707464 | 220501 | 4645b650fcbf |
| restore-none | 707464 | 220442 | c5d4e7f39a9f |
| restore-some | 707544 | 228290 | 86c10d78cade |
| take-after-copy | 707496 | 219158 | b1ab37b9526b |
| take-owned | 707464 | 220501 | 955d8cbd732b |
| to-owned | 707448 | 81 | 5884b89dce89 |
| unwrap-clone | 707560 | 228343 | 171cebc1200e |

## Remaining work

The value-copy sequence and underflow branch layout remain unresolved. Additional expression sweeps have no demonstrated value. A next investigation should identify the exact compiler stage where owned-value and cleanup behavior diverge, using the reproduced control and existing candidate12 / branch-layout traces. No claim is made that such an investigation will recover original source.

Fees experiments from the same session remain under `/home/ahi200/pumpfun-work/20261027-fees-next`. The local rodata order result was independently superseded by upstream PR249, so it was not submitted; its fresh 17,331-case runtime receipt belongs to candidate `190c8bd4608d173264f39b35c8c9c7d2d1a207d4c370a650210f410ad5cab785`, not PR249's artifact. Remaining Fees lanes were explicitly assigned in PR251, so overlapping work stopped.
