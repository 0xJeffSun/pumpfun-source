# PumpSwap linker layout: +40 raw-equal bodies on account-context, no source change

A source-agnostic linker-ordering recipe applied unchanged to two successive
AMM frontiers. The Rust source, Cargo.lock, dependency artifacts, compiler
flags and SDK are the frontier's own; only the order of linker input sections
changes. The build route differs from the frontier's `cargo build` in two
recorded ways (see *Build route*): the root crate is compiled with
`cargo rustc … -- -Clinker=<wrapper> -Clink-arg=-Map=<file>`, and rust-lld
therefore receives one extra `-Map=` argument. With the SDK script left in
place, that route reproduces each frontier byte-for-byte.

| frontier (candidate) | normalized | raw before → after | raw-matched bytes | unmatched | Linux builds | runtime |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| **account-context** (`badc9498…`) | 623 kept | **128 → 168** | 29,584 → 41,680 | 162 | 2 identical | 17,462 / 17,462 pass |
| native-fee-cpi (`a4b978ee…`) | 599 kept | 125 → 166 | 21,880 → 41,136 | 186 | 2 identical per layout | 17,462 / 17,462 pass |

No normalized or raw window is lost on either frontier. Complete ELF identity
remains false: the account-context candidate text is still 29,816 bytes longer
than the original's 1,162,040. Raw-local equality is a per-window fact; it
does not place a body at its original address.

Both frontiers are now superseded on main (account-context by the PumpSwap
session's 647-window integration). The generator is the reusable deliverable;
the PumpSwap session's layout lane re-applies it to newer checkpoints.

## Current frontier: account-context-recovery-20261027

Frontier `repro/pump_amm/account-context-recovery-20261027`, candidate
`badc9498…` / symbols `9c8fc524…`. The lane's default-layout control build
reproduces both hashes exactly. `tools/dataplan.py` on that build gives
`layout/account-context-text-data.ld` (text order plus readonly-data order):

- **168/785 raw-equal windows (was 128)**, 623 normalized kept, 162 unmatched.
- Gained (40): `0x8740 0xf7918 0xf8758 0xf8d08 0xf8fb8 0xf91b0 0xf92f8 0xf9458
  0xfccb0 0xfcdf8 0xfcf58 0xfd098 0x100958 0x1011c8 0x101238 0x101268 0x101290
  0x1012e8 0x1017d0 0x101a80 0x101c60 0x101da8 0x101ee8 0x102480 0x106ab8
  0x107458 0x108810 0x108820 0x108838 0x1088a0 0x1094b8 0x1094e8 0x10c850
  0x10c948 0x10c9b8 0x10c9e8 0x10cb00 0x10ce20 0x10dcb0 0x10ddc8`.
- Data immediates (lddw into `.rodata`/`.data.rel.ro`) inside normalized-equal
  placed pairs at the original section-relative offset: **342 → 391 of 1,971**.
- Two full Linux v1.44 builds (root crate recompiled each time) give symbols
  `81c21dc7…` and stripped `120d78d2…`; a native rust-lld re-link of the
  captured link inputs gives the same pair (`receipts/`).
- Complete-ELF positional differences against the original fall from 700,934
  to 696,699 (shared length).
- Runtime: the maintained 25-suite replay, **17,462 cases, 35,074 executions,
  35,418 verified signature fields**, zero mismatches.

Text-only ordering (`tools/plan.py`) gives the same 168 raw; the data order is
included because it puts more data references at their original relative
offsets without changing any count.

## Earlier frontier: native-fee-cpi-recovery-20261027

`text-order-v1` (text only) and `text-data-order-v2` (text + data) both give
125 → 166 raw with 599 normalized kept; data immediates at original offsets
374 → 419 of 1,800 for v2. Each layout has two identical Linux builds
(`builds/<layout>` and `builds/<layout>-repeat`) and an identical native
re-link, and passes all 17,462 runtime cases. Reordering moves bytes, so
complete-ELF positional differences rise from 696,053 to 700,125 (v1) and
705,786 (v2); they are not a measure of correspondence.

## Multiplicity deficit (disclosed)

Measurement lets one candidate body match several original windows, so the
normalized count exceeds what one layout can place: **599 normalized → 597
placeable** on native-fee-cpi and **623 → 621** on account-context. In both,
two candidate `RawVec::finish_grow` bodies (`hb7b22d8a…` in mpl-token-metadata,
`had5bbd3f…` in spl-token-2022) are normalized-equal to three original windows
(`0xf4030`, `0xf9060`, `0xfcb60`), and one `do_reserve_and_handle` body
(`hce305870…`, root crate) to two (`0xb8a8`, `0xf4180`). Object locality places
the bodies at `0xf9060`, `0xfcb60` and `0xb8a8`; `0xf4030` and `0xf4180` stay
empty slots. The original has a third copy and a second copy that the
candidate does not link (anchor_spl's own, see below). `verify.py` recomputes
this list. The Mayhem layout packet disclosed the analogous deficit.

## Build route

The default and ordered builds use the frontier image, SDK, Cargo home and
target cache (lane copies mounted at the frontier's container paths; all 732
dependency artifacts unchanged; root crate recompiled), release profile and
`--locked --offline`. Differences from the frontier's own driver:

- `cargo rustc -p pump-amm-recovered --lib … -- -Clinker=<wrapper>
  -Clink-arg=-Map=<file>` instead of `cargo build`; both arguments reach only
  the root crate.
- rust-lld receives the extra `-Map=<file>` argument; the wrapper
  (`tools/link-wrapper.sh.in`) forwards every other argument unchanged and
  replaces only the SDK script operand. Incoming and effective argument lists
  are kept in `builds/`.

The default control (`builds/default`, `builds/account-context/default`)
reproduces each frontier's symbol and stripped ELF exactly, so the route alone
changes no byte. The ordered script differs from the captured SDK script
(`layout/sdk-default.ld`) only in the `.text`, `.rodata` and `.data.rel.ro`
selector lists: qualified `*object("section")` / `*archive:member("section")`
lines (plus `*(".rodata.cstN")` for merged constant pools), then the SDK's own
catch-all. No instruction, padding, address or output byte is supplied;
ordinary `llvm-objcopy --strip-all` follows.

SBPF direct calls are pc-relative, so a call-only body becomes raw-equal when
every function between caller and callee has its original size and order.
Absolute lddw immediates additionally need the original text size and data
layout, which source work has not reached yet.

## Generator (source-agnostic)

Inputs: original `deployed.so`, a default-layout build's symbol artifact and
rust-lld map, and the captured SDK script. `tools/plan.py` walks the original
windows in address order and names a candidate input section for each:

| basis | account-context | native-fee-cpi |
| --- | ---: | ---: |
| `normalized-unique` (only normalized-equal body, used by no other window) | 447 | 423 |
| `normalized-graph` (one of several identical bodies; call/code-pointer agreement + object locality) | 174 | 174 |
| `call-graph` (no equal body; the section placed callers' operands point at) | 56 | 61 |
| unplaced windows / candidate tail sections | 108 / 113 | 127 / 129 |

Dependency rlib members keep their compiler-emitted section order, so for
identical bodies the generator prefers the copy from the archive member of the
neighbouring placed windows (worth +10 raw over call agreement alone).
`tools/dataplan.py` then places readonly-data input sections from lddw
references in placed pairs, pointer fields of placed `.data.rel.ro` objects
and unique content matches; unplaced objects follow in default order.
Identities other than `normalized-unique` are ordering hypotheses, not
provenance claims.

Re-apply to a later checkpoint (default build → plan → ordered build →
measure → no-loss check):

```sh
python3 tools/apply.py --source <workspace root> --work <new dir> \
  --cargo-home <frontier Cargo home copy> --target-cache <frontier target copy> --lock <sbf_lock.py>
```

## Residuals on account-context (455 normalized-but-not-raw windows)

`tools/diagnose.py` labels every differing slot
(`diagnosis/account-context-diagnose.json.gz`):

| class | windows |
| --- | ---: |
| direct calls only, blocked by non-size-exact windows between caller and callee | 138 |
| calls + data immediates at a different section offset | 165 |
| data immediates at a different section offset only | 98 |
| calls + data immediates whose section offset already agrees (base shift only) | 50 |
| data immediates, base shift only | 3 |
| call to a non-corresponding copy (window `0xb8a8`'s body serving `0xf4180`) | 1 |

### Highest-value targets for the source lanes

Seven windows between the root crate and the first dependency members are
empty or size-inexact slots that block **58 call-only bodies** by themselves
(53 need exactly these seven, 5 only the first four). **Five are unmatched;
two are normalized-matched windows that the multiplicity deficit leaves
without a placeable body:**

| window | size | status | identification (from original instructions and position) |
| --- | ---: | --- | --- |
| `0xf28b8` | 1,192 | unmatched | bounded Token-2022 TLV scanner (82/165-byte checks, account type at 0xa5, TLV from 0xa6) |
| `0xf2d60` | 368 | unmatched | `TransferFee::calculate_fee` shape (`ceil(amount*bps/10_000)`, `min(maximum_fee)`) |
| `0xf2ed0` | 776 | unmatched | `TransferFee::calculate_pre_fee_amount` shape (0 / 10,000 bps cases) |
| `0xf31d8` | 664 | unmatched | second TLV scanner variant returning a parsed fee record |
| `0xf4030` | 336 | normalized (`finish_grow` shape), no free body | anchor_spl's own `RawVec::finish_grow` copy |
| `0xf4180` | 368 | normalized (`do_reserve_and_handle` shape), no free body | anchor_spl's own `do_reserve_and_handle` copy |
| `0xf6eb0` | 2,664 | unmatched | anchor_spl `token_2022_extensions` wrapper calling `harvest_withheld_tokens_to_mint` |

The first four follow the root crate's allocator shim (`0xf28a8`) and precede
the first anchor_spl member, so they are non-generic functions of a separate
dependency crate linked first, not root-crate code; the candidate instead has
root `utils::transfer_fee::*` helpers plus spl-token-2022's own
`TransferFee::calculate_fee` (360 B) / `calculate_pre_fee_amount` (736 B) in
its tail. The last three arrive together with anchor_spl's
`harvest_withheld_tokens_to_mint` wrapper, which the original calls from root
window `0x74e30`; linking it would bring anchor_spl's own RawVec copies and
remove the deficit.

Other text-size leads (candidate functions with no original counterpart):
`solana_pubkey::Pubkey::from_str_const` + `five8_const` decoding (4,976 B,
reached at runtime from `admin_cto_pool`); 39 separate 520-byte `{{closure}}`
bodies (`deposit`, `withdraw`, `legacy_buy/sell`, `multi_hop`, `boost_burn`,
`incentives::claim`, `trade::execute_sell`); `[V]::concat` from
`multi_hop::emit_event`; `CheckOwner::check_owner` from `legacy_sell::cashback`.

### Readonly data and Location records

The original `.rodata` gaps that no candidate object fills are original
module paths: `programs/pump-amm/src/instructions/admin/{admin_cto_pool,
set_reserved_fee_recipients,toggle_cashback_enabled,…}.rs`,
`instructions/coin_creator/{collect_coin_creator_fee,migrate_pool_coin_creator,
set_coin_creator,transfer_creator_fees_to_pump}.rs`, `instructions/create_pool.rs`,
`instructions/extend_account.rs`, `instructions/swap/{buy,sell,mod,multi_hop_swap}.rs`,
`instructions/sweep_fees.rs`, `instructions/token_incentives/claim.rs`,
`state/volume_accumulator.rs`. Every placed object after the first gap is
shifted, which is why most data immediates still differ in offset.

Of 113 original Location records (report inside the plan JSON), 58 are equal,
20 differ in line/column, 3 in file and 32 have no candidate counterpart.
Seventeen line differences are `solana-program-entrypoint` `src/lib.rs`
records that sit exactly 51 lines earlier in the original — the 2.2.1 layout,
while the frontier locks 2.3.0 (the Fees lane found the same version). A
native diagnostic build with only that Cargo.lock entry changed to 2.2.1
(crate checksum equal to the crates.io index) keeps 623 normalized / 128 raw
and raises equal records 58 → 75 (`diagnosis/entrypoint-221-native/`); it is
not Linux-confirmed and not adopted. Remaining root differences:
`state/global_config.rs` 388:45 and 391:14, `utils/math.rs` 14:1 (line/column);
`instructions/swap/buy.rs` 233:1 and `state/volume_accumulator.rs` 8:1, 25:1 (file).

## Verification

```sh
python3 -B research/claude-layout-amm-20261027/verify.py      # about a minute
python3 -B research/claude-layout-amm-20261027/test_scope.py  # mutation controls, about five minutes
```

`verify.py` is read-only and runs no compiler, linker, VM or network. Per
frontier and layout it checks the packet inventory; artifact and map SHA-256
values; the repository's AMM window measurement of baseline and layout,
claimed counts, the exact gained set, no lost window, and equality with the
saved measurement JSON; a strict linker-script grammar (SDK text outside the
selector lists; every list line `*FILE("SECTION")` naming exactly one input
section of the default map, every input section named once, no other
statement); byte-for-byte regeneration of each script by the tools; and a
**byte-level translation proof** (`tools/translation.py`) for the stripped
and the symbol ELF: every byte of the layout ELF follows from the frontier ELF
and the two maps by moving input sections, recomputing direct-call immediates
and translating relocated immediates, data pointers and symbol values, with
zero padding and only layout fields changed in headers. It also recomputes the
multiplicity deficit and data-immediate offsets, checks the native re-link
receipts against the packet's link-kit inputs (root objects, `symbols.o`,
version script; dependency rlibs by SHA-256 from the frontier dependency
cache), both Linux build records per layout, and the runtime summaries plus
per-case digests (`runtime/*/cases.json.gz`: case digest and comparator verdict
for all 17,462 cases; 0 negative).

`test_scope.py` copies the packet and shows that each mutation is rejected by
its intended check: a tampered selector, a glob selector, an inserted linker
statement, changed claim counts, an altered measurement JSON, a tampered
runtime summary, a negative runtime case verdict, a patched ELF byte with all
hashes re-sealed (rejected only by the translation proof), and an inventory
change.

Runtime scope: the 25 maintained suites were rerun for each layout. The
frontiers' supplemental evidence (934 decoder/TLV cases, 91 CPI probes,
focused receipts and the 17,537 identical signed-message pairs) was not rerun
on these layouts.

`tools/relink.py` repeats a captured link natively in under a second for
iteration; adopted layouts are always rebuilt with `tools/build_linux.py`.
`tools/build_native.py` (macOS v1.44 rustc with the Linux target libraries)
reproduces the counts but not the bytes — Cargo's metadata hash includes the
host line of `rustc -vV`, which changes symbol hashes, default order and some
type ids — so it is an iteration aid only.
