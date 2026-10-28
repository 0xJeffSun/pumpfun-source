# g03: text + data input-section order on the integrate lane's u2b composition (680/148 → 680/169)

**Base.** This packet orders a source composition that is **not** a repository checkpoint: the integrate lane's
`g01-c680` (= its `u2b` step, PR [#319](https://github.com/lalalune/pumpfun-source/pull/319), `SP/shared/frontier/current.json`; built in `SP/lanes/integrate/out/linux-u2b-a`). That candidate is `0fb1f8860b4d0e54e4482ddac1b4752123ddd99b1f535046b44847487cfe2165`
(symbols `d691156e…`), measured at 680 normalized / 148 raw / 105 unmatched by Linux v1.44. Integrate's own 25-suite
replay of it passed with 17,462 cases and 0 mismatches. u2b is the 647 checkpoint `event-decoder-recovery-20261027` plus:

- amm-lo `dda784ddc`: admin toggles, disable, deposit/withdraw placement, and the legacy buy move to
  `instructions/swap/buy.rs` with the 623 inline reserve arithmetic;
- amm-hi `d92fefba8`: maintained-source gains (harvest helper calling anchor_spl's `harvest_withheld_tokens_to_mint`,
  `pub mod sweep`, trailing `pub use trade::{…}`, `transfer_fee.rs:57`).

The base artifacts are held in this packet (`artifacts/base-*.so.gz`). `verify.py` reads them through `baseline_artifacts`
in `claims.json`, because no repository packet holds them. The source tree is the staged workspace `ws/` of that
integrate build. This lane's default capture build of it reproduces `0fb1f886…` / `d691156e…` byte-for-byte
(`builds/default`). The recipe change is only the linker script, with the same rules as g01/g02:

- qualified input-section selectors only, each default input section named exactly once;
- no address, FILL or padding statement;
- no original byte enters the build, and no output is patched;
- section identities other than normalized-unique bodies are ordering hypotheses.

| measure | u2b (Linux) | ordered (Linux ×2) |
| --- | ---: | ---: |
| normalized windows | 680 | 680 (0 lost) |
| raw-equal windows | 148 | **169** (+21, 0 lost) |
| unmatched windows | 105 | 105 |
| normalized-matched original text bytes | 845,280 | 845,280 |
| raw-matched original text bytes | 36,984 | 42,048 |
| multiplicity deficit (normalized windows without a free equal body) | **none** | none |
| whole-ELF bytes in place | 6,004 | 8,575 |
| whole-ELF bytes reproduced modulo layout (incl. in place) | 900,027 | 925,312 |
| original bytes not reproduced | 368,477 | 343,192 |
| plain positional differences in the shared length | 709,871 | 711,876 |
| candidate SHA-256 | `0fb1f886…` | `ec076bf0fc0c7768…` |
| symbols SHA-256 | `d691156e…` | `6605794cb4f4fa11…` |

**New raw windows.** The usual 20 are `0x8740 0xf7918 0xf8758 0xf8d08 0xf8fb8 0xf91b0 0xf92f8 0xf9458 0xfccb0
0xfcdf8 0xfcf58 0x1011c8 0x101238 0x101268 0x101290 0x10c850 0x10c948 0x10c9b8 0x10c9e8 0x10dcb0`. The 21st is
**`0xf4180`**, anchor_spl's own `do_reserve_and_handle`. It now exists because u2b calls anchor_spl's harvest wrapper.
The two-window multiplicity deficit of 647/651 (`0xf4030`, `0xf4180`) is gone.

## Raw priority after this layer (`../tools/raw_priority.py`, `measurement/*-diagnose.json.gz`)

| close | raw gain | cumulative |
| --- | ---: | ---: |
| `0xf28b8 0xf2d60 0xf2ed0 0xf31d8` (the four bodies between the allocator shim and anchor_spl) | +59 | 59 |
| `0xb3460 0xb92c8 0xe31a0` | +8 | 67 |
| `0x73ef0 0x74128` | +5 | 72 |

Every other call-only window needs root slots. Windows with data immediates (absolute addresses) also need the
original `.text` size. Candidate `.text` is +31,824 B: candidate-only functions are 348,584 B against 316,760 B of
unmatched original windows.

## Whole-ELF scoreboard (`elfdiff/scoreboard.md`)

Each cell is in place / layout-only / missing bytes.

| region | original bytes | u2b | ordered |
| --- | ---: | ---: | ---: |
| .text | 1,162,040 | 5,747 / 836,631 / 319,662 | 8,318 / 836,360 / 317,362 |
| .rodata | 25,715 | 0 / 21,134 / 4,581 | 0 / 24,790 / 925 |
| .data.rel.ro | 8,584 | 0 / 7,096 / 1,488 | 0 / 7,608 / 976 |
| .rel.dyn | 70,384 | 0 / 27,664 / 42,720 | 0 / 46,480 / 23,904 |
| **ELF extent** | **1,268,504** | **6,004 / 894,023 / 368,477** | **8,575 / 916,737 / 343,192** |

## Verification

- **Linux builds.** The ordered script was built twice with Linux v1.44 (`builds/text-data`, `builds/text-data-repeat`).
  Both builds are identical, and source and all 762 dependency artifacts are unchanged.
- **Default build.** `builds/default` reproduces the base.
- **Native re-link.** The receipts in `receipts/` re-link the link kit in `kits/u2b/`.
- **Runtime.** The 25-suite replay used `repro/pump_amm/event-decoder-recovery-20261027/replay_parallel.py`, the same driver
  hash `0a740623…` that integrate used for u2b. On `ec076bf0…` it covered 17,462 cases, 35,074 transactions and
  35,418 signatures, with 0 mismatches.
- **Verifier.** `python3 verify.py` and `python3 test_scope.py` (9 mutation controls) pass. `verify.py` is g01's
  verifier plus `baseline_artifacts` support.

## Rebuild

1. Stage the u2b workspace (integrate's `ws/`).
2. Run `tools/build_linux.py --source <ws> …` for the default build, then `tools/dataplan.py`, then
   `tools/build_linux.py --ordered layout/u2b-text-data.ld` twice.
3. When the integrate lane publishes a 651-based composition, regenerate the order on that composition. The order is
   per-candidate.
