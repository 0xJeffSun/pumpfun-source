# g02: qualified text + data input-section order on the 651 frontier (raw 148 → 168)

Base checkpoint: `repro/pump_amm/optional-context-recovery-20261027` (main's AMM checkpoint since 5f295723a), candidate
`97bd5553c199cd24fb2d07034c365527bee5b138bf5dd7a0aa3099186aad2643`, symbols `0142baee…`. The method is the same as
[g01](../g01-text-data-order-647/README.md), re-generated for this candidate. Source is **unchanged**: the base's
materialized workspace `results/source`, with the same 762 dependency artifacts and Cargo.lock as 647. The only
recipe change is the linker script. It replaces the SDK script's `.text`, `.rodata` and `.data.rel.ro` catch-alls
with an explicit list of qualified input-section names (`*FILE("SECTION")`), naming each default input section once.
The SDK catch-all follows the list. The script adds no address, `FILL`, padding or other statement. No original byte
enters the compiler or linker, and no output is patched. Section identities other than normalized-unique bodies are
**ordering hypotheses**. They are derived from call graphs, data references and object locality by `tools/plan.py` +
`tools/dataplan.py`.

| measure | base (Linux) | ordered (Linux ×2) |
| --- | ---: | ---: |
| normalized windows | 651 | 651 (0 lost) |
| raw-equal windows | 148 | **168** (+20, 0 lost) |
| unmatched windows | 134 | 134 |
| normalized-matched original text bytes | 816,800 | 816,800 |
| raw-matched original text bytes | 36,984 | 41,680 |
| data immediates at the original section offset (of 2,149 in placed equal pairs) | 393 | 442 |
| whole-ELF bytes in place | 6,103 | 8,574 |
| whole-ELF bytes reproduced modulo layout (incl. in place) | 875,260 | 893,692 |
| original bytes not reproduced | 393,244 | 374,812 |
| plain positional differences in the shared length | 708,987 | 709,902 |
| candidate SHA-256 | `97bd5553…` | `ef65f2fed6698b85…` |
| symbols SHA-256 | `0142baee…` | `039554e2af1c0abb…` |

The newly raw windows are the same 20 as on 647. All are placement-only and no source coordinate is involved:
`0x8740 0xf7918 0xf8758 0xf8d08 0xf8fb8 0xf91b0 0xf92f8 0xf9458 0xfccb0 0xfcdf8 0xfcf58 0x1011c8 0x101238 0x101268
0x101290 0x10c850 0x10c948 0x10c9b8 0x10c9e8 0x10dcb0` (`measurement/cmpm-vs-base.txt`).

## Multiplicity deficit

The deficit is unchanged from 647: `0xf4030` (`finish_grow`) and `0xf4180` (`do_reserve_and_handle`) have no free
equal body, so 649 of the 651 normalized windows are placed with an equal section. In the original these two bodies are anchor_spl's own
RawVec copies. They are called from anchor_spl's `harvest_withheld_tokens_to_mint` wrapper `0xf6eb0`, which in the
original also calls anchor_spl's `drop_in_place<Vec<AccountInfo>>` `0xf3ec8`, spl-token-2022's instruction builder
`0xfd9a8` and `invoke_signed` `0x106ab8`. amm-hi's boost-harvest change should provide both copies.

## Residuals

483 windows are normalized but not raw (`measurement/*-diagnose.json.gz`):

| class | windows |
| --- | ---: |
| calls only | 143 |
| calls and data immediates | 239 |
| data immediates at another section offset | 98 |
| base-shift-only data | 3 |

Data immediates are absolute addresses. They cannot become raw until `.text` has its original size:

| `.text` size budget | bytes |
| --- | ---: |
| candidate-only functions | +373,320 |
| unmatched original windows | −345,240 |
| windows sharing one body | −704 |
| **candidate − original** | **+27,376** |

Only five unmatched windows remain in the dependency region (`0xf28a8` onward): `0xf28b8 0xf2d60 0xf2ed0 0xf31d8 0xf6eb0`.
Everything else from `0xf3470` to the end is normalized-matched, so once these five and the deficit are closed, calls
inside the dependency region become displacement-exact.

Bodies blocked per slot (calls that cross it):

| slot(s) | blocked bodies |
| --- | ---: |
| `0xf28b8 0xf2d60 0xf2ed0 0xf31d8` | 374 each |
| `0xf4030 0xf4180` | 369 each |
| `0xf6eb0` | 364 |
| `0xe9b90 0xe9fc0` (size −88) | 284 |
| `0xb3460 0xb92c8` | 277 |
| `0x73ef0 0x74128 0x74648` | 273 |

## Whole-ELF scoreboard

`elfdiff/scoreboard.md` gives in place / layout-only / missing bytes per region. The tools are `../tools/elfdiff.py`
and `../tools/scoreboard.py`.

| region | original bytes | 651 | ordered |
| --- | ---: | ---: | ---: |
| ELF + program headers | 288 | 253 / 23 / 12 | 252 / 24 / 12 |
| .text | 1,162,040 | 5,845 / 808,185 / 348,010 | 8,318 / 807,985 / 345,737 |
| .rodata | 25,715 | 0 / 21,114 / 4,601 | 0 / 24,602 / 1,113 |
| .data.rel.ro | 8,584 | 0 / 7,096 / 1,488 | 0 / 7,608 / 976 |
| .rel.dyn | 70,384 | 0 / 31,264 / 39,120 | 0 / 43,424 / 26,960 |
| other (.dynamic, .dynsym, .dynstr, .shstrtab, section headers, padding) | 1,493 | 5 / 1,475 / 13 | 4 / 1,475 / 14 |
| **ELF extent** | **1,268,504** | **6,103 / 869,157 / 393,244** | **8,574 / 885,118 / 374,812** |

## Verification

- **Linux builds.** The ordered script was built twice with Linux v1.44 (`builds/text-data`, `builds/text-data-repeat`).
  Both builds are identical (`ef65f2fe…` / `039554e2…`), and source and all 762 dependency artifacts are unchanged.
  The default build (`builds/default`) reproduces the base `97bd5553…` / `0142baee…` byte-for-byte.
- **Native re-link.** The receipts in `receipts/` re-link the packet's link kit (`kits/optional-context/`) and
  reproduce both Linux outputs.
- **Runtime.** The maintained 25-suite replay ran on `ef65f2fe…`
  (`repro/pump_amm/optional-context-recovery-20261027/replay_parallel.py`). It covered 17,462 cases,
  35,074 transactions and 35,418 signatures, with 0 mismatches. Per-case digests are in `runtime/`.
- **Verifier.** `python3 verify.py` and `python3 test_scope.py` (mutation controls) pass. Run them from a checkout that
  contains `evidence/`, `repro/pump_amm/optional-context-recovery-20261027` and
  `repro/pump_amm/claim-self-transfer-v144`.

## Rebuild

The commands are the same as for g01, run on `repro/pump_amm/optional-context-recovery-20261027/results/source`:
`tools/build_linux.py` (default, captures the link kit and map) → `tools/dataplan.py` (= `layout/optional-context-text-data.ld`) →
`tools/build_linux.py --ordered layout/optional-context-text-data.ld` (twice).
