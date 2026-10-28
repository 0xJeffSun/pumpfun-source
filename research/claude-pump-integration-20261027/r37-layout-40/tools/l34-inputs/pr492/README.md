# Pump Main L32 creator diagnostic log parity

This research-only packet composes three already-observed Round47 `admin_cto` diagnostics into the qualified L32 source and independently rebuilds and replays the resulting executable. It is source integration and fresh qualification, not a new historical-source discovery, full `admin_cto` recovery, whole-ELF parity, or a deployable program claim.

## Source correction

The immutable L32 source is left unchanged. `source.patch` adds only:

- `Creator is not a system-owned wallet; fees left in the vaults` after the existing wallet/frozen predicate, for five authenticated non-shared, non-default, non-executable, non-system creator cases;
- `Creator quote token account is frozen; fees left in the vaults` in the mutually exclusive wallet-frozen branch, for nine authenticated cases; and
- `No canonical pump pool for this mint; curve only` in the existing skipped-pool-update `else` branch, for three authenticated cases.

The combined file remains 700 physical lines. Authorization, account validation, transfers, CPI, events, errors, return data, and state are unchanged. The full `admin_cto` function remains unmatched.

## Original observations

The exact saved-original case identities reauthenticated by `analyze_original_cases.py` are:

| Family | Admin CTO case indices | Count |
| --- | --- | ---: |
| non-system creator | 41, 56, 241, 344, 345 | 5 |
| frozen quote account | 338, 348–355 | 9 |
| canonical pool absent | 231–233 | 3 |

All 17 serialized transactions have valid signatures. The retained observations are used only to identify the gap; the staged and final binaries were freshly executed.

## Qualified artifacts

| Configuration | Stripped SHA-256 | Unstripped SHA-256 |
| --- | --- | --- |
| A: immutable L32 | `45c5af2485f6d8138b471cbd6b56e0bf59135dcefea15f055d6387b4f1ac0bca` | `868a868be78e576143fdb8bc8c5a3681410e186a11856c62405ed5e217d0bc5c` |
| B: non-system only | `a91a5c2d0908c546cbddc875e49f67cfc31fd549c96bb8e49dcb1dd32292eeaf` | `78662e16a2acfe5f093ab0bf6c0f2c01cf31ab0e25f3eb9a0eac625cc2585714` |
| C: frozen only | `d57f94a11f700391269d017feb6e05cf3bc75ad85f4652615090cb3d89df5bf2` | `5b15a3a3f082ea92e869bffa6d6893562cbe7e37e5bee0a98f1c4923e12fb5e5` |
| D: canonical only | `0dbdcf74a7783ae071f1348461be7c390dc43818a680f726fa8f4a5a037c8329` | `a2bbc0a3f59d6f92d4349d7637f4cc4367bea3082eeed3cc26c13c91d3b50553` |
| E: combined (both builds) | `3461cd9b1878083bb3af3d30ec5765de6392072acf38184c96a7ca9c5c857d36` | `f3aae993141c81277d8a14ac66331dbd59f646bd03d7a371ef201475af19a219` |

The untouched L32 build exactly reproduces its published hashes. Two isolated final builds are byte-identical. The final build has the same 59 pre-existing compiler warnings as baseline, no new warning, and no stack-offset warning.

Every staged build retains exactly 990/1,035 normalized windows, 166/1,035 raw-equal windows, 45 unmatched windows, and 1,446,072 matched text bytes. There are zero normalized or raw gains/losses. The separate generated-linker result of 204 raw matches is not used.

## Fresh runtime results

The focused staged matrix contains four newly executed 363-case `admin_cto` comparisons (1,452 paired executions total):

- B restores exactly the five non-system notices;
- C restores exactly the nine frozen notices;
- D restores exactly the three canonical-pool notices; and
- E restores all 17 with zero error, state, rollback, event, CPI, or return-data differences.

All serialized transaction signatures and captured-loader program identities are rechecked. After excluding compute-consumption lines and normalizing only numeric source coordinates while retaining filenames, the final focused run has six known message-order differences (`No creator fee to collect` around ATA creation).

The final full-corpus audit covers 44 suites and 10,468 paired cases. Its measured ordered-log matrix is:

| Difference family | L32 baseline | Corrected L32 |
| --- | ---: | ---: |
| missing non-system creator notice | 5 | 0 |
| missing frozen quote notice | 9 | 0 |
| missing canonical-pool notice | 3 | 0 |
| ordinary message order | 6 | 6 |
| **non-filename total** | **23** | **6** |
| source filename only | 52 | 52 |

No structured runtime difference was observed. This is not full log parity: the six order differences and 52 filename-only differences remain explicit.

## Integrity and limitations

`verify.py` is relocatable and fail-closed: it rejects optimized Python, unexpected files, symlinks, changed source, inconsistent builds, altered artifacts, signature failures, changed case identities, and changed expected results. `test_negative_controls.py` applies 20 independent mutations and confirms each is rejected.

The runtime tests are local LiteSVM captured-loader executions, not mainnet transactions. The original 10,485,715-byte ELF and final 2,005,152-byte ELF are not byte-equal. The correction does not recover the large `admin_cto` machine function and does not alter maintained `programs/pump` source.

See [REPRODUCE.md](REPRODUCE.md) for build and replay commands.
