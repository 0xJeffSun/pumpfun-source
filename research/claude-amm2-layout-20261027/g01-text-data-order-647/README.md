# g01: qualified text + data input-section order on the 647 frontier (raw 148 → 168)

Base checkpoint: `repro/pump_amm/event-decoder-recovery-20261027` (origin/main 0cc61d636), candidate
`0881a95dafe465623c7220fb3da84b3f9c7d9b0094d572f62487f05cbd80a07c`, symbols `16ddd88d…`.
Source is **unchanged** (the base's 52-file materialized workspace `results/source`, including its
`solana-program-entrypoint 2.2.1` lock). The only recipe change is the linker script: the SDK script with its
`.text`, `.rodata` and `.data.rel.ro` catch-alls replaced by an explicit list of qualified input-section names
(`*FILE("SECTION")`), each default input section named exactly once, followed by the SDK catch-all. No address,
`FILL`, padding or other statement is added; no original byte enters the compiler or linker; no output is patched.
The order is derived from the original by `tools/plan.py` + `tools/dataplan.py` (generator by the older
layout-amm lane; rules in its README) and is an **ordering hypothesis**: section identities other than
normalized-unique bodies are inferred from call graphs, data references and object locality.

| measure | base (Linux) | ordered (Linux ×2) |
| --- | ---: | ---: |
| normalized windows | 647 | 647 (0 lost) |
| raw-equal windows | 148 | **168** (+20, 0 lost) |
| unmatched windows | 138 | 138 |
| normalized-matched original text bytes | 810,544 | 810,544 |
| raw-matched original text bytes | 36,984 | 41,680 |
| data immediates at the original section offset (of 2,139 in placed equal pairs) | 387 | 436 |
| whole-ELF bytes in place | 5,998 | 8,568 |
| whole-ELF bytes reproduced modulo layout (incl. in place) | 864,568 | 887,177 |
| original bytes not reproduced | 403,936 | 381,327 |
| plain positional differences in the shared length | 699,299 | 700,238 |
| candidate SHA-256 | `0881a95d…` | `b05f7268b9d5ddfd723b060be1a32359bd2e8702a5d294646958895973eb55e0` |
| symbols SHA-256 | `16ddd88d…` | `5edda6f5cdfefee7466374a820dd4ab75f0eb224e47b2cda7185f1c335228d60` |

Newly raw windows (all were normalized-matched already; placement-only, no source coordinate involved):
`0x8740 0xf7918 0xf8758 0xf8d08 0xf8fb8 0xf91b0 0xf92f8 0xf9458 0xfccb0 0xfcdf8 0xfcf58 0x1011c8 0x101238 0x101268
0x101290 0x10c850 0x10c948 0x10c9b8 0x10c9e8 0x10dcb0` (`measurement/cmpm-vs-base.txt`).

Note on the 623 → 647 history: the same generator raised 623 from 128 to 168 raw (layout-amm `7f9a26712`);
the 20 raw windows Codex gained between 623 and 647 (`0xfd098 … 0x10ddc8`) are a subset of those 40, so on 647
the order adds the other 20.

## Multiplicity deficit (reported, not closable by order)

Two normalized windows have no free equal candidate body, so only 645 of 647 can be placed with an equal section:
`0xf4030` (`finish_grow`) and `0xf4180` (`do_reserve_and_handle`). In the original both sit inside anchor_spl's
object (between its `drop_in_place<Vec<AccountInfo>>` and `associated_token::create_idempotent`), i.e. they are
anchor_spl's own RawVec instantiations, which the original pulls in through anchor_spl's
`token_2022_extensions::harvest_withheld_tokens_to_mint` (unmatched window `0xf6eb0`). The 647 source calls
spl-token-2022's instruction builder instead; amm-hi's boost-harvest change (call anchor_spl's wrapper; in the
integrate lane's composition) should supply these copies. Re-run the generator after composing it.

## Residuals (479 normalized-but-not-raw windows after ordering; `measurement/*-diagnose.json.gz`)

143 call-only (a non-size-exact slot between caller and callee), 235 calls + data immediates, 98 data immediates
at a different section offset, 3 base-shift-only data. Data classes cannot become raw until `.text` has its original
size (candidate +24,056 B: 376,256 B candidate-only functions vs 351,496 B unmatched original windows, −704 B for
the deficit). Largest blockers (bodies whose calls cross the slot): `0xf28b8 0xf2d60 0xf2ed0 0xf31d8` (370 each:
the four bodies linked between the allocator shim and anchor_spl, see the lane README), `0xf4030 0xf4180 0xf6eb0`
(365/365/360), `0xe31a0` and the dispatch wrappers `0xe8ae8 0xe8f10 0xe9338 0xe9b90 0xe9fc0` (280, size −88…−112),
`0xb3460 0xb92c8` (273), `0x73ef0 0x74128 0x74648 0x74900 0x74e30` (269).

## Whole-ELF scoreboard (`elfdiff/`, tool `../tools/elfdiff.py`, summary `../tools/scoreboard.py`)

`elfdiff/scoreboard.md` (in place / layout-only / missing bytes per region of the original ELF extent):

| region | original bytes | 647 | ordered |
| --- | ---: | ---: | ---: |
| ELF + program headers | 288 | 251 / 23 / 14 | 250 / 24 / 14 |
| .text | 1,162,040 | 5,747 / 802,055 / 354,238 | 8,318 / 801,734 / 351,988 |
| .rodata | 25,715 | 0 / 21,122 / 4,593 | 0 / 24,601 / 1,114 |
| .data.rel.ro | 8,584 | 0 / 7,096 / 1,488 | 0 / 7,608 / 976 |
| .rel.dyn | 70,384 | 0 / 26,800 / 43,584 | 0 / 43,168 / 27,216 |
| .dynamic/.dynsym/.dynstr/.shstrtab/section headers/padding | 1,493 | 0 / 1,474 / 19 | 0 / 1,474 / 19 |
| **ELF extent** | **1,268,504** | **5,998 / 858,570 / 403,936** | **8,568 / 878,609 / 381,327** |

## Verification

- Two Linux v1.44 builds of the ordered script (`builds/text-data`, `builds/text-data-repeat`): identical
  `b05f7268…` / `5edda6f5…`, source and all 762 dependency artifacts unchanged; the default build
  (`builds/default`, same driver without `--ordered`) reproduces the base `0881a95d…` / `16ddd88d…` byte-for-byte.
- Native re-link receipts (`receipts/`) against the packet's link kit (`kits/event-decoder/`: root objects,
  `symbols.o`, version script, effective arguments; dependency rlibs by SHA-256 = the base record's
  `dependency_cache_after`) reproduce both Linux outputs exactly.
- Runtime: maintained 25-suite replay (`repro/pump_amm/event-decoder-recovery-20261027/replay_parallel.py`) on
  `b05f7268…`: 17,462 cases, 35,074 transactions, 35,418 signatures, 0 mismatches; per-case digests in
  `runtime/event-decoder-text-data/cases.json.gz`.
- `python3 verify.py` (read-only; recomputes counts with the repository measurement, checks the strict selector
  grammar against the default map, regenerates the script with `tools/`, byte-level translation proof
  (`tools/translation.py`) for stripped and symbol ELFs, receipts, builds, runtime digests, inventory) and
  `python3 test_scope.py` (mutation controls) both pass; run them from a checkout that contains
  `evidence/`, `repro/pump_amm/event-decoder-recovery-20261027` and `repro/pump_amm/claim-self-transfer-v144`.

## Rebuild

```sh
# 1. default build with link-kit capture (reproduces the base)
python3 tools/build_linux.py --source <copy of repro/pump_amm/event-decoder-recovery-20261027/results/source> \
  --output D/default --cargo-home <cargo home with the base registry inputs> --target-cache <copy of the base target cache> \
  --lock <sbf_lock.py>
# 2. order
python3 tools/dataplan.py --symbols D/default/artifacts/unstripped.so --map D/default/link/link.map \
  --default-script D/default/link/sdk-default.ld --out-dir D/plan      # = layout/event-decoder-text-data.ld
# 3. ordered build (twice)
python3 tools/build_linux.py ... --output D/ordered --ordered D/plan/ordered.ld
```
