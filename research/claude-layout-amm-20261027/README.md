# PumpSwap linker layout: 41 more raw-equal function bodies, no source change

The unchanged Rust source of the
[native-fee-cpi frontier](../../repro/pump_amm/native-fee-cpi-recovery-20261027/README.md)
(candidate `a4b978ee…`) now has **166 of 785 original windows with raw
byte-equal bodies, up from 125**. All **599 normalized matches** are kept, no
earlier raw or normalized match is lost, and **186 windows** remain unmatched.
Raw-matched original text rises from **21,880 to 41,136 bytes**. Complete ELF
identity is still false.

| | windows | normalized | raw | unmatched | raw-matched bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| frontier `a4b978ee…` | 785 | 599 | 125 | 186 | 21,880 |
| text-order-v1 `e3ca12ec…` | 785 | 599 | **166** | 186 | **41,136** |

Newly raw-equal original windows (41): `0xf7918 0xf8758 0xf8d08 0xf8fb8
0xf91b0 0xf92f8 0xf9458 0xfccb0 0xfcdf8 0xfcf58 0xfd098 0x100958 0x1011c8
0x101238 0x101268 0x101290 0x1012e8 0x1017d0 0x101a80 0x101c60 0x101da8
0x101ee8 0x102480 0x106ab8 0x107458 0x108810 0x108820 0x108838 0x1088a0
0x1094b8 0x1094e8 0x10c850 0x10c948 0x10c9b8 0x10c9e8 0x10cb00 0x10ce20
0x10dcb0 0x10ddc8 0x119b28 0x11a338`.

## What changed

Only the order of `.text` input sections. The compiler and linker receive
the same Rust source, dependencies, flags and SDK as the frontier build; the
root crate is compiled through `cargo rustc … -- -Clinker=<wrapper>` and the
wrapper forwards every rust-lld argument unchanged except the SDK linker
script, which it replaces with `layout/text-order-v1.ld`. That script differs
from the captured SDK script (`layout/sdk-default.ld`) only in the
`.text : { … }` selector list: 787 qualified `object(section)` /
`archive:member(section)` selectors followed by the SDK's `*(.text*)`.
No instruction, padding, address or output byte is supplied; the linker
resolves call displacements and relocations; ordinary `llvm-objcopy
--strip-all` follows. The same wrapper with no replacement script reproduces
the frontier exactly (`784592ce…` symbols / `a4b978ee…` stripped), so the
`cargo rustc` route itself changes nothing.

Raw equality of call-only bodies needs the original *relative* call
distances: SBPF direct calls are pc-relative, so a body matches raw only when
every function between caller and callee has its original size and order.
lddw immediates are absolute addresses and need the whole text size and data
layout, which source work has not reached yet (see residuals).

## Source-agnostic generator

`tools/plan.py` needs only an ordinary default-layout build of *any* AMM
checkpoint: original `deployed.so`, the candidate symbol artifact, the rust-lld
`-Map` and the captured SDK script. It walks the original windows in address
order and names the candidate input section for each:

- `normalized-unique` (423): the only normalized-equal body, and that body
  matches no other window;
- `normalized-graph` (174): one of several identical bodies, chosen by
  direct-call / code-pointer agreement with already placed pairs and by
  object locality (dependency rlib members keep their compiler-emitted
  section order, so an identical body between two placed sections of one
  member comes from that member);
- `call-graph` (61): no normalized-equal body; the section that already
  placed callers' call operands point at (never a body equal to another
  window).

127 windows have no identified counterpart; the 129 remaining candidate
sections follow in default order. Identities other than `normalized-unique`
are ordering hypotheses, not provenance. Re-running the generator on a new
checkpoint's default build re-derives the order (`tools/build_linux.py` builds
both the default and the ordered variant).

## Residual diagnosis (433 normalized-but-not-raw windows)

`tools/diagnose.py` labels every differing instruction slot
(`diagnosis/text-order-v1-diagnose.json.gz`):

| class | windows |
| --- | ---: |
| direct calls only, blocked by non-size-exact windows between caller and callee | 139 |
| calls + absolute data immediates (data offset differs) | 147 |
| data immediates only (offset differs) | 96 |
| calls + data immediates whose section offset already agrees (base shift only) | 47 |
| data immediates, base shift only | 3 |
| call to a non-corresponding target (window `0xf4180`) | 1 |

The data immediates cannot be raw-equal until the text section has the
original size (`.rodata` starts right after `.text`; original text 1,162,040
bytes, candidate 1,199,104).

### Highest-value source targets for the source lanes

Seven unmatched windows sit in the dependency region between the root crate
and the first dependency archive members and block **58** call-only bodies
by themselves (53 blocked by exactly these seven, 5 by the first four):

| window | size | identification (from the original instructions) |
| --- | ---: | --- |
| `0xf28b8` | 1,192 | bounded Token-2022 TLV scanner (82/165-byte base checks, account-type byte 0xa5, TLV from 0xa6) |
| `0xf2d60` | 368 | `TransferFee::calculate_fee` shape (bps at +16, `ceil(amount*bps/10_000)`, `min(maximum_fee)`) |
| `0xf2ed0` | 776 | `TransferFee::calculate_pre_fee_amount` shape (0 / 10,000 bps special cases) |
| `0xf31d8` | 664 | second TLV scanner variant writing a parsed fee record |
| `0xf4030` | 336 | anchor_spl's own `RawVec::finish_grow` copy |
| `0xf4180` | 368 | anchor_spl's own `do_reserve_and_handle` copy |
| `0xf6eb0` | 2,664 | anchor_spl `token_2022_extensions` CPI wrapper calling `harvest_withheld_tokens_to_mint` (+ `invoke_signed`) |

The first four lie *after* the root crate's allocator shim
(`__rust_alloc_error_handler`, `0xf28a8`) and *before* the first anchor_spl
member, i.e. they are non-generic functions of a separate dependency crate
linked first, not root-crate code. Their callers are root windows `0x73ef0`,
`0x74128`, `0x74648`, `0x74b80`. The last three come with anchor_spl's
`harvest_withheld_tokens_to_mint` wrapper, which the original calls from root
window `0x74e30`; the candidate builds that instruction through
`spl_token_2022` directly, so the wrapper and its two RawVec helpers are
garbage-collected. Other single blockers: `0x89d0` (blocks `0x8740`),
`0xbb80` + `0xc5d0` (block `0xcaa8`). The remaining 79 call-only bodies need
many unmatched root windows to reach exact size.

## Verification

```sh
python3 -B research/claude-layout-amm-20261027/verify.py
```

Read-only: decompresses the saved artifacts and checks their SHA-256,
re-measures the frontier and the layout with the repository's AMM window
measurement logic, asserts no lost normalized/raw window and the exact gained
set, checks that the script differs from the SDK script only in the `.text`
selectors and that the ordered text is a permutation of the default sections,
regenerates the script byte-for-byte with `tools/plan.py`, and checks the
runtime summary binding.

Builds (both Linux v1.44 SBPF, frontier image/SDK/Cargo home/target cache,
`--locked --offline`, all 732 dependency artifacts unchanged, root crate
recompiled): `builds/default` reproduces the frontier; `builds/text-order-v1`
gives symbols `1e6402d1…` and stripped `e3ca12ec…`. An independent native
rust-lld v1.44 re-link of the captured link inputs with the same script gives
the identical pair.

Runtime: all **25 maintained suites, 17,462 cases, 35,074 transactions and
35,418 verified signature fields** pass against the original with zero
mismatches (`runtime/text-order-v1/summary.json`, per-suite receipts hashes
in `suites.json`).

Reproduce (from a lane with copies of the frontier Cargo home and target cache):

```sh
python3 tools/build_linux.py --source <frontier results/source> --output <dir>/default \
  --cargo-home <cargo-home copy> --target-cache <target copy> --lock <sbf_lock.py>
python3 tools/plan.py --symbols <dir>/default/artifacts/unstripped.so --map <dir>/default/link/link.map \
  --default-script <dir>/default/link/sdk-default.ld --out-dir <dir>/plan
python3 tools/build_linux.py … --output <dir>/ordered --ordered <dir>/plan/ordered.ld
python3 repro/pump_amm/focused-diagnostics-20261026/measure.py --candidate <dir>/ordered/artifacts/candidate.so \
  --symbols <dir>/ordered/artifacts/unstripped.so --output <dir>/measurement.json
```

`tools/relink.py` repeats a captured link natively in under a second for
iteration; adopted layouts are always rebuilt with `build_linux.py`.
