# Main Pump: `.text` order derived from the original window sequence

**On Round22: 123 raw → 135 raw.** All 711 / 1,035 normalized windows are kept,
no raw or normalized window is lost, and 324 windows stay unmatched. Raw-equal
text grows from 24,072 to 33,736 bytes. Matched text bytes stay at 851,688 of
1,792,208. The same generator, unchanged, gives these results on earlier rounds:

- **Round21: 123 → 135 raw** (708 normalized kept).
- **Round20: 120 → 132 raw** (705 normalized kept).

Whole-ELF identity remains false.

This is a build-recipe change only. The maintained Rust source is untouched
(`programs/pump` equals each round's archived primary source). One generated
linker script lists the existing `.text` input sections in original-window
order through qualified object/archive-member selectors. No instruction,
padding, address statement or output patch is added; rust-lld resolves every
call, pointer and relocation.

## Counts

| Round22 | normalized | raw | unmatched | matched text bytes | raw text bytes |
|---|---|---|---|---|---|
| published (default layout) | 711 | 123 | 324 | 851,688 | 24,072 |
| ordered (this packet) | 711 | 135 | 324 | 851,688 | 33,736 |

Both rows are recomputed by `tools/measure.py`. That tool reproduces the
published Round20, Round21 and Round22 inventories exactly
(`--check-against`). They are also recomputed independently by the
repository's own `work/pump-reserve-byte-recovery/inventory_current.py`, run
unmodified (sha256 `06c47748…`). The two agree.

The twelve newly raw-equal original windows are the same on every round:

| window | bytes | candidate body | cause before |
|---|---|---|---|
| 0x18a4d8 | 944 | `Option<T>::serialize` (mpl_token_metadata) | two equal-shape instances swapped |
| 0x18a888 | 616 | `Option<T>::serialize` (mpl_token_metadata) | swapped with the above |
| 0x1a0f68 | 360 | `RawVec::grow_one` | callee drift |
| 0x1a2340 | 24 | `<&T as Debug>::fmt` | callee out of order |
| 0x1a6370 | 24 | `<&T as Debug>::fmt` | callee drift |
| 0x1a6940 | 328 | `RawVec::reserve::do_reserve_and_handle` | callee drift |
| 0x1ab220 | 40 | `<String as Display>::fmt` | callee drift |
| 0x1ab730 | 24 | `<FromUtf8Error as Display>::fmt` | callee drift |
| 0x1b3220 | 48 | `<&T as Display>::fmt` | callee out of order |
| 0x1b38c0 | 1,992 | `compiler_builtins::float::mul::__muldf3` | callee out of order |
| 0x1b4088 | 72 | `__udivti3` | callee out of order |
| 0x1b40d0 | 5,192 | `compiler_builtins::...::u128_div_rem` | 11 calls; callees out of order |

## How the order is derived (source-agnostic)

`tools/derive_layout.py` needs only the original ELF, the fixed original window
boundaries, and the unstripped ELF plus lld map of a default-layout build of
whatever source is current. Re-run it for each new round.

1. **Correspondence** (`tools/correspond.py`).
   - A window's domain is every candidate function with an equal normalized
     body.
   - Direct-call consistency narrows domains. If window O calls T at call slot
     k, then candidate C's slot-k callee must be in T's domain.
   - Assignment is injective. Unique bodies go first, then callers fix their
     callees' instances.
   - Remaining identical copies prefer the copy compiled into the same object
     as the assigned neighbours. Under the SDK default `*(.text*)` rule, every
     function inside an object's region of the original is that object's own
     copy.
2. **Counterparts.** An unmatched window gets an unassigned candidate when
   there is evidence:
   - a matched caller calls it from the same call slot; or
   - a same-size body differs in at most half of its slots; or
   - a same-size body has an identical opcode/register/offset skeleton, from
     the object that owns that region.

   The last rule pins `type_id` functions whose only difference is the TypeId
   constant. Those constants differ because the original's dependency crates
   carry different crate-metadata hashes.
3. **Order.** Sections follow original window order. Candidate sections with no
   original counterpart follow after all placed sections, outside the matched
   regions.

The recovered object order equals the candidate's link order: main CGU,
allocator shim, `anchor_spl`, `mpl_token_metadata`, `spl_token_2022`, …,
`std`, `alloc`, `core`, `compiler_builtins`. The original's main CGU ends at
0x17bc38, where the shim's `__rust_alloc_error_handler` sits. Within objects,
rustc's CGU order differs from the reconstruction; the script restores it.
That order is non-local items sorted by mangled name (which embeds
crate-dependent hashes), then local items in definition order.

**Build hook** (`tools/build.py`, `tools/rustc_wrapper.py`, `tools/linker.py`).

- Staging, environment, toolchain (v1.44, hashes equal to the Round receipts)
  and the Cargo command mirror `scripts/pump_build_verified.py
  --workspace-layout`.
- `RUSTC_WRAPPER` forwards every invocation through
  `scripts/pump_physical_source_wrapper.py`. Only the root crate's cdylib
  rustc also gets `-C linker=tools/linker.py`. Cargo never sees that argument,
  so `-C metadata`, symbol names and objects are unchanged.
- With no script given, the hook passes the default through. The passthrough
  build reproduces the published Round20, Round21 and Round22 hashes exactly.
- `linker.py` checks that rustc's temporary script equals the SDK default
  (`tools/default.ld`, identical to the Mayhem packet's).
  `tools/layout_script.py` checks that the replacement adds nothing but the
  expanded `.text` input list. `linker.py` also records an lld map and the
  compiler-produced object inputs.

## Evidence

- **Round22, two complete builds.** One build used an empty target directory
  and one a used one; they produce identical artifacts (`round22/ordered/`):
  candidate `076584d4ac8d7327f5abcd93485ef8b2b6702438c2484221bd077efc56d6074a`, unstripped `590c932df05e67e690f648cd8caf40936676215e8b2a459be9c71d19afc587b3`. Every build here
  recompiled all 179 crates; none reused a compiled dependency.
  `tools/relink.py`, which repeats the recorded link with the generated script,
  produced the same bytes before either build ran. Round20 and Round21 carry
  that relink as their evidence.
- **Translation proof** (`tools/translation.py`). The ordered ELF equals the
  default-layout ELF with its input sections permuted. For Round22's 924
  sections it checks:
  - every direct call retargeted to the translated callee;
  - lddw `.text` pointers and `.data.rel.ro` code pointers translated;
  - local branches confined to their sections;
  - all relocations equal as a translated multiset;
  - `.dynsym` values and the entry point translated;
  - every other allocated byte equal.

  Behaviour can differ only through code addresses.
- **Runtime.** The unchanged 44-suite captured-upgradeable-loader corpus ran
  on the ordered Round22 candidate (`076584d4…`) in one pass of the
  repository's `validate_optimized_loader.py`. Result: **44 suites, 10,468
  cases, 10,464 log-bearing diagnostic cases, 0 mismatches**
  (`round22/runtime/summary.json`). The validator, its combined base and the
  loader wrapper are hash-checked against the published receipt and ran
  unmodified, from gitignored copies so repository paths resolve to this
  checkout. The validator needs a build record in its own format;
  `round22/runtime/validator-build-*.json` supplies it. The 99-suite focused
  corpus was not run, because it depends on Codex `work/` harnesses outside
  this checkout.
- **Earlier checkpoint.** The first commit of this packet (`ad32a494b`) holds
  the v2 generator's Round21 evidence: two identical builds (`f69c5682…`),
  130 raw, and the 44-suite corpus with 10,468 cases and 0 mismatches.
- `verify.py` recomputes the raw and normalized counts, raw gains and residual
  classes from the saved artifacts. It regenerates each `ordered.ld` byte for
  byte from the saved baseline map and the published round ELF and re-runs the
  translation proof. It is pure Python: function symbols are read directly from
  each ELF's `.symtab` (identical, in content and order, to the repository's
  `llvm-objdump -t` based `candidate_functions` on every round's baseline and
  ordered ELF), so it needs no Solana platform-tools and compiles nothing. When
  the v1.44 SDK's `llvm-objcopy` is installed it also re-strips the saved ELF
  to the claimed candidate hash; without it that one check is reported as
  skipped and the stripped hash rests on the recorded build receipts.
  `test_scope.py` holds seven negative controls: padding
  statement, duplicate selector, foreign section change, swapped order,
  changed call immediate, changed `.rodata` byte, and changed entry point.

## Why only twelve: residual diagnosis

`roundNN/ordered/residuals.json.gz` explains every normalized-but-not-raw
window. Only masked operands can differ. Round22 class counts are in
`round22/claims.json` (`residual_classes`).

- **Data addresses.** On Round22 the candidate `.text` is 111,816 bytes
  shorter than the original's. `.rodata` therefore starts at 0x19a528 instead
  of 0x1b59f0, and every lddw into `.rodata`/`.data.rel.ro` differs. No ordering can fix this. Placing
  `.rodata` at the original address would be padding. For most of these
  windows every referenced 8-byte prefix agrees, so they are address-only
  differences that close once text size and relative data order converge.
  Data order is owned by the Codex build_identity lane.
- **Call drift.** A call is raw-equal only if the unmatched windows between
  caller and callee add no net size. `call_only_blockers` ranks the windows
  that gate the most call sites.

### Where closing windows pays most under this layout

`tools/unlock.py` (`roundNN/ordered/unlock.json`) prices blockers with an exact
model for call-only bodies; the model reproduces the measured raw count. On
Round22 (`round22/claims.json`, `unlock`):

- From `__rust_dealloc` (0x1570b8) onward, 14 unmatched windows (13,464
  bytes) change net size. Making them size-neutral would take this layout
  from **135 to 273 raw (+138)**. "Size-neutral" means matched, or the real
  function present.
  - Five are the leaf windows after the allocator shim: 0x17bc48, 0x17c0f0,
    0x17c3d8, 0x17c548, 0x17c850.
  - Six are dependency functions: 0x184e38, 0x18fc98, 0x1905a8, 0x199db8,
    0x19e3b0, 0x1ab1f8.
  - Three are in the main CGU: 0x163ea8, 0x1774f8, 0x177700.
- The 11 dependency-region windows alone (11,384 bytes) add +57.
- With every size-changing window neutral the ceiling is 334.

Single closures gain little, because the tail is gated by several blockers in
series. Most call-only bodies sit in the dependency tail and call
`__rust_dealloc` (main CGU) and `memcpy` (0x1b3610).

### What the blockers are (for the pump-lo/mid/hi lanes)

`tools/archive_identify.py` searches every function in the linked rlibs,
including those `--gc-sections` drops, with call and lddw immediates masked.
The original links these dependency functions, which the reconstruction never
calls (`roundNN/ordered/archive-identification.json`):

| window | bytes | dependency function |
|---|---|---|
| 0x180cc0 | 1,896 | `anchor_spl::token_2022::burn` (identified on Round21; matched in Round22) |
| 0x184e38 | 2,664 | `anchor_spl::token_2022_extensions::transfer_fee::harvest_withheld_tokens_to_mint` |
| 0x18fc98 | 2,320 | `spl_token_2022::extension::transfer_fee::instruction::TransferFeeInstruction::pack` |
| 0x1905a8 | 1,104 | `spl_token_2022::extension::transfer_fee::instruction::harvest_withheld_tokens_to_mint` |
| 0x192c20 | 1,384 | `spl_token_2022::instruction::burn` (earlier triage read it as `mint_to`; matched in Round22) |
| 0x19e3b0 | 896 | `anchor_lang::system_program::transfer_with_seed` |

So the original program burns Token-2022 tokens, harvests withheld transfer
fees and uses `transfer_with_seed`. Restoring those callers brings these
functions back automatically. Round22 did this for `burn`: both `burn`
windows now match.

The five windows just after the allocator shim (0x17bc48, 1,192 B; 0x17c0f0,
744; 0x17c3d8, 368; 0x17c548, 776; 0x17c850, 664) are leaf code. They have no
data references and no calls except `__multi3`/`__udivti3`. Each is called
once, from the unmatched main-CGU windows 0x1a918, 0x52660, 0x94e28, 0x95360
and 0x94908. Their position, before `anchor_spl` in link order, suggests
128-bit math in a separate crate. 0x1774f8 and 0x177700 (520 B each) are
main-CGU error-building closures with a `programs/pump/src/lib.rs` Location,
called from unmatched 0x14c038.

**Other whole-ELF gaps after reordering.**

- Already equal to the original: `.dynsym` names and `.dynstr`.
- Still different: `.rodata` is 456 bytes short and `.data.rel.ro` is 768
  bytes long.
- Relocations: the original has 5,877 relative and 270 syscall relocations;
  the Round21 candidate has 5,555 and 208.

## Tried and rejected

- **Extras in place.** Keeping unassigned candidates next to their candidate
  neighbours, instead of at the end, gave 124 raw on Round20 with one loss
  (0x1a0e20). Rejected.
- **Position-only tie-break (v1).** Ties between duplicate copies were broken
  by position only: 130 raw on Round21, but 26 copies came from other
  objects. Replaced by the same-object preference (v2: also 130).
- **v2's "at most half the slots" counterpart rule.** It missed same-function
  `type_id` bodies. v3 adds region-restricted skeleton equality and gains
  five windows on every round.
- **Pinning call-evidence and same-size counterparts.** No raw change on its
  own. Kept, because it is the more faithful layout as windows close.
- **Filler orders.** Putting unrelated functions into unmatched slots to
  equalize call distances was not attempted. It games the local metric
  without converging on the original layout.
- **`.rodata` at the original address.** An address assignment is padding,
  and `layout_script.check_script` excludes it.

## Reproduce

Run from the repository root. This needs the v1.44 SDK in `~/.cache/solana`
and a warm `~/.cargo` registry. Hold the shared build lock around `build.py`.

```sh
T=research/claude-layout-pump-20261027/tools
F=repro/pump/main-contract-round22-20261027
python3 $T/build.py --output OUT/base --target-dir TGT1          # default layout = published round
python3 $T/derive_layout.py --windows-from $F/inventory.json.gz \
  --candidate OUT/base/unstripped.so --map OUT/base/link/link.map --output-dir OUT/layout
python3 $T/build.py --output OUT/ordered --target-dir TGT2 --linker-script OUT/layout/ordered.ld
python3 $T/measure.py --candidate OUT/ordered/unstripped.so --windows-from $F/inventory.json.gz
python3 -B research/claude-layout-pump-20261027/verify.py        # offline re-verification
python3 -B research/claude-layout-pump-20261027/test_scope.py    # negative controls
```

For a new round:

1. Rebuild `OUT/base` from the new source.
2. Point `--windows-from` at that round's inventory. The windows are fixed
   properties of the original, so any round's inventory serves.
3. Package the round with `tools/package_round.py`.

`PROGRESS.md` has the running log.
