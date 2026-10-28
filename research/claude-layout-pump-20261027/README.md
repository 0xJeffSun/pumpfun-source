# Main Pump: `.text` order derived from the original window sequence

**On Round36 (newest; published by the integration session with this
generator composed in): 121 raw → 145 raw.** The round's recorded
default-layout baseline (`layout-proof/baseline.so`) measures 121 raw. The
published candidate measures 145 raw. All 738 normalized windows are kept and
no raw window is lost. None of the 145 raw bodies has a data operand, so the
24 gains all come from the `.text` order. This generator, re-run on the
recorded baseline ELF and map, regenerates the round's
`layout-proof/text-order.ld` byte for byte (sha256 `7eb0404f…`). The round
then adds the integration session's separate data-order layer, which moves
two `.data.rel.ro` sections. `round36-composed.json` records this, and
`verify.py` re-derives it.

**On Round25: 123 raw → 135 raw.** All 720 / 1,035 normalized windows are kept,
no raw or normalized window is lost, and 315 windows stay unmatched. Raw-equal
text grows from 24,072 to 33,736 bytes. Matched text bytes stay at 871,992 of
1,792,208. The same generator, unchanged, was applied to every round recorded
here. Whole-ELF identity remains false.

| round | normalized (kept) | raw before → after | evidence in this packet |
|---|---|---|---|
| Round36 | 738 | 121 → 145 | composed into the published round; text order regenerated from its recorded baseline; both ELFs re-measured (`round36-composed.json`) |
| Round25 | 720 | 123 → 135 | baseline build = published ELF; 1 ordered build (persistent target, root recompiled) = relink; 44-suite runtime results; 5 policy controls |
| Round23 | 712 | 123 → 135 | 2 complete ordered builds (179 crates each) = relink |
| Round22 | 711 | 123 → 135 | 2 complete ordered builds = relink |
| Round21 | 708 | 123 → 135 | relink of the recorded baseline build |
| Round20 | 705 | 120 → 132 | relink of the recorded baseline build |

This is a build-recipe change only. The maintained Rust source is untouched.
One generated linker script lists the existing `.text` input sections in
original-window order through literal qualified object/archive-member
selectors. No instruction, padding, address statement or output patch is
added. The original binary is used for comparison only. rust-lld resolves
every call, pointer and relocation.

## Counts

| Round25 | normalized | raw | unmatched | matched text bytes | raw text bytes |
|---|---|---|---|---|---|
| published (default layout) | 720 | 123 | 315 | 871,992 | 24,072 |
| ordered (this packet) | 720 | 135 | 315 | 871,992 | 33,736 |

`tools/measure.py` computes the window inventory with the repository's
measurement primitives (`scripts/pump_compare_function_bytes.normalize/body`,
`scripts/pump_quote_control_function_match.sections`). With `--check-against`
it reproduces the published inventories of Round20–23 and Round25 exactly.

The repository's own inventory tool is tracked at
`repro/pump/reserve-helper-byte-recovery-20261027/research/inventory_current.py`
(sha256 `06c47748e46303bfc952b36fe9a6c3a44d62508d1341d8197e03788d625ad7e5`).
It was run unmodified on all five ordered candidates and gives the same
counts. It ran from a byte-identical copy at the `work/` path it resolves the
repository from. The results are recorded in `repo-tool-crosscheck.json`.
`verify.py` does not re-run that tool, because it calls llvm-objdump.

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

## How the order is derived

`tools/derive_layout.py` needs only the original ELF, the fixed original window
boundaries, and the unstripped ELF plus lld map of a default-layout build of
whatever source is current. Re-run it for each round.

**The function correspondence is an unauthenticated hypothesis.** It is a
deterministic, evidence-ranked assignment of candidate sections to original
windows. It is not recovered original attribution, and identical bodies can
be assigned in more than one way. The disclosure figures below are recorded
per round in `claims.json` (`correspondence`) and recomputed by `verify.py`.

1. **Assignment** (`tools/correspond.py`).
   - A window's domain is every candidate function with an equal normalized
     body.
   - Direct-call consistency narrows domains: if window O calls T at call slot
     k, then candidate C's slot-k callee must be in T's domain.
   - Assignment is injective. Unique bodies go first, then callers fix their
     callees' instances.
   - Remaining identical copies prefer the copy compiled into the same object
     as the assigned neighbours, then the nearest relative position.

   Round25 disclosure:
   - 718 injective assignments for 720 normalized windows. 0x199db8 and
     0x1ab1f8 stay unassigned: the original has two copies of a body the
     candidate has once.
   - By basis: 580 unique bodies, 58 fixed by a matched caller, 77 identical
     copies chosen from the neighbouring object, and 3 by position only. The
     three are an `anchor_lang` copy at 0xe9c0, a `std` copy at 0x19a9e0 and
     an `alloc` copy at 0x1a9250.
   - 22 assigned sections come from an object other than their neighbours'
     (unique bodies included).
2. **Counterparts.** Unmatched windows receive unassigned candidate sections
   on one of three kinds of evidence:
   - a matched caller calls the section from the same call slot;
   - a same-size body differs in at most half of its slots;
   - a same-size body has an identical opcode/register/offset skeleton and
     comes from the object owning that region. This rule pins `type_id`
     bodies whose only difference is the TypeId constant.

   Round25 has 95 counterpart placements (57 on body similarity, 38 on call
   evidence). **37 of them differ in size from their window.** Without the
   skeleton rule, or without any counterpart, raw is 130 instead of 135 (see
   controls). The other counterparts have no measured raw effect, so this
   packet does not claim that they make the layout more faithful.
3. **Order.** Sections follow original window order. The 127 candidate
   sections with no counterpart follow after all placed sections.

Observed structure, which is also hypothesis-level. The object order implied
by the assignment equals the candidate's link order: main CGU, allocator
shim, `anchor_spl`, `mpl_token_metadata`, `spl_token_2022`, …, `std`,
`alloc`, `core`, `compiler_builtins`. The original's main CGU appears to end
at 0x17bc38, where the shim's `__rust_alloc_error_handler` matches.

### Build hook

`tools/build.py`, `tools/rustc_wrapper.py` and `tools/linker.py` make up the
hook.

- **Mirrors the published recipe.** Staging, environment and the Cargo
  command mirror `scripts/pump_build_verified.py --workspace-layout`, with one
  difference: `cargo build` also gets `-v` (logging only).
- **Toolchain.** The v1.44 tools come from `~/.cache/solana/v1.44/platform-tools`.
  On the build host this resolves to the primary checkout's
  `work/fees-compat/toolchains/v1.44`. The rustc, cargo and llvm-objcopy
  sha256 equal the published Round build receipts.
- **Root-only linker change.** `RUSTC_WRAPPER` forwards every invocation
  through `scripts/pump_physical_source_wrapper.py`. Only the root crate's
  cdylib rustc also receives `-C linker=tools/linker.py`. Cargo never sees
  that argument, so `-C metadata`, symbol names and objects are unchanged.
- **Passthrough.** With no script given, the hook passes the SDK default
  through. The passthrough build reproduces the published hashes of every
  round recorded here (Round20–23 and Round25) exactly.
- **Script checks.** `linker.py` checks that rustc's temporary script equals
  the SDK default (`tools/default.ld`). `tools/layout_script.py` checks that
  the replacement adds only an expanded `.text` input list. Each line must be
  one leading `*`, a literal object or archive:member basename, and a literal
  quoted section name; any other glob metacharacter is rejected.
- **Records.** `linker.py` records an lld map, the compiler-produced object
  inputs and, since Round25, the sha256 of every input archive.
- **Relinks.** `tools/relink.py` repeats a recorded link with another script.
  It hash-checks object copies, records archive hashes, and compares them
  with the build's when present. On every round with real builds, the relink
  output equalled the build output.
- **Persistent mode.** `--persistent DIR` keeps workspace, cargo home and
  target. Dependencies compile once. Before each build,
  `cargo clean -p pump-recovered` forces the root crate to recompile and
  relink.

## Verification and evidence

`verify.py` compiles and links nothing. Per round it checks the following.

- **Manifest.** Packet files match `MANIFEST.json`, with no symlinks or
  special files.
- **Baseline.** The published ELF has the round CHECKPOINT hash. Its
  recomputed inventory gives the published normalized, raw and unmatched
  counts and the matched and raw text bytes.
- **Script.** Re-running the generator on the published ELF and the saved
  baseline map reproduces `ordered.ld` byte for byte.
- **Ordered counts.** The saved ordered ELF reproduces every recorded count,
  with the recorded gains and no normalized or raw loss.
- **Recomputed records.** These recompute exactly:
  - the full translation-proof statistics (sections, moved sections, direct
    calls, lddw `.text` and other pointers, data pointers, relocations, local
    branches, entry);
  - residual classes, data-operand and Location breakdown;
  - top-12 call-only blockers;
  - blocker pricing;
  - correspondence disclosure.
- **Stripped candidate.** It has the claimed sha256 and carries exactly the
  unstripped ELF's allocated sections and program headers. This is checked in
  pure Python, with no objcopy.
- **Build records.** Each record binds the saved script and artifacts. Every
  build (baseline and ordered) compiled exactly the round's archived primary
  source; only the two READMEs are extra.
- **Runtime (Round25).** For the 44 saved per-suite results and loader
  receipts it checks:
  - sha256;
  - artifact binding;
  - per-suite case counts;
  - absence of any recorded mismatch;
  - loader invariants;
  - the diagnostic audit (`scripts/pump_diagnostic_audit.py`): 10,468 cases,
    10,464 log-bearing, 0 mismatches.
- **Policy controls (Round25).** Every control script regenerates from its
  policy to the recorded sha256.

Not re-derived by the verifier:

- the archive identification, which needs the dependency rlibs;
- the relinked control ELFs and their raw counts (recorded observations);
- the build and relink executions themselves (records only).

Candidate function symbols are listed by `tools/measure.py`.

`test_scope.py` runs twelve negative controls, all of which must be rejected.

- Seven run the copied `verify.py` on a tampered packet copy:
  - swapped selector order (manifest refreshed) fails the regeneration check;
  - a raised claimed raw count fails the count check;
  - a changed MANIFEST digest fails the manifest check;
  - a changed runtime total fails the runtime totals;
  - an injected per-case mismatch, with hashes kept consistent, fails the
    per-case check;
  - a changed call immediate fails the translation proof;
  - a changed stripped byte fails the strip check.
- Four are static script checks: an address statement, a duplicate selector,
  a glob selector, and an edit to a section other than `.text`.
- One requires the unmodified copy to verify.

### Runtime

The unchanged 44-suite captured-upgradeable-loader corpus ran on the ordered
Round25 candidate (`87ba67cc…`) in one pass of the repository's
`validate_optimized_loader.py`: **10,468 cases, 10,464 log-bearing diagnostic
cases, 0 mismatches.** The per-suite results and loader receipts are saved in
`round25/runtime/suites/`. `tools/runtime_summary.py` computes the summary
from them and asserts no expected totals. The validator, its combined base
and the loader wrapper are hash-checked against the published receipt and ran
unmodified, from gitignored copies so repository paths resolve to this
checkout. The validator needs a build record in its own format:
`round25/runtime/validator-build-*.json`. Earlier corpus runs on Round21–23
are not part of this packet's verifiable evidence. The 99-suite focused
corpus was not run, because it needs Codex `work/` harnesses outside this
checkout.

### Translation proof

`tools/translation.py` derives the section bijection from the two lld maps
and predicts every byte of the ordered ELF from the default-layout ELF. For
Round25's 940 sections it checks:

- 10,695 direct calls retargeted;
- 116 lddw `.text` pointers and 158 `.data.rel.ro` code pointers translated;
- 20,880 local branches confined to their sections;
- 5,792 relocations equal as a translated multiset;
- `.dynsym` values and the entry point translated;
- every other allocated byte equal.

## Policy controls (Round25, `round25/policy-controls.json`)

| control | raw | lost | position fallbacks | assigned outside neighbouring objects |
|---|---|---|---|---|
| adopted | 135 | none | 3 | 22 |
| extras kept beside their default-layout neighbour | 128 | none | 3 | 22 |
| duplicate choice by position only (no object preference) | 135 | none | 80 | 45 |
| without skeleton counterparts | 130 | none | 3 | 22 |
| without any counterpart | 130 | none | 3 | 22 |

All rows keep 720 normalized windows. The control ELFs are relinks of the
recorded Round25 baseline link. The verifier regenerates every control
script.

Not attempted:

- **Filler orders** that put unrelated functions into unmatched slots to
  equalize call distances. They game the local metric without converging on
  the original layout.
- **Placing `.rodata` at the original address.** An address assignment is
  padding, and the script grammar rejects it.

## Why only twelve: residual diagnosis

`roundNN/ordered/residuals.json.gz` explains every normalized-but-not-raw
window; only masked operands can differ. Class counts are in each round's
`claims.json` (`residual_classes`).

- **Data addresses.** On Round25 the candidate `.text` is shorter than the
  original's (1,696,712 against 1,792,208 bytes). Every `.rodata`/`.data.rel.ro`
  address therefore differs, and no ordering can fix this. For most such
  windows every referenced 8-byte prefix agrees, so the difference is address
  only. Data order is owned by the Codex build_identity lane.
- **Call drift.** A call is raw-equal only if the unmatched windows between
  caller and callee add no net size. `claims.json`
  (`call_only_blockers_top12`) lists the windows that gate the most call
  sites.

### Readonly constants and Source/Location records

Round25 figures (`residual_data_operands`):

- The normalized-but-not-raw windows hold 2,560 data operands: 1,718 point
  into `.rodata` and 736 into `.data.rel.ro`.
- 265 are `core::panic::Location` records, decoded as string pointer,
  length, line and column. 204 agree in file, line and column.
- **38 windows reference a Location that differs.** The differences fall
  into three groups:
  - **Std paths.** The original reads `/home/runner/work/platform-tools/...`,
    from a Linux-built sysroot; the candidate reads `/Users/runner/...`, from
    the macOS SDK's prebuilt std. Line and column agree. The Codex root
    lane's `linux-sysroot-linked` build explores this.
  - **`solana_program_entrypoint::deserialize` (0x1a10d0).** Seventeen
    Locations sit uniformly 51 lines later in the candidate (`src/lib.rs`
    374… against 323…). In `solana-program-entrypoint` 2.2.1, line 323 is
    the original's `offset += size_of::<u64>();`. The maintained `Cargo.lock`
    pins 2.3.0, where that line is 374, so the original likely links 2.2.1.
    The Codex `pubkey-221` lock trial did not include this crate.
  - **Pump source placement.** Examples:
    - `lib.rs:90:1` against `lib.rs:66:1`;
    - `split_protocol_fee` (0x9a048) at `lib.rs:1936/1939` against
      `v2_recipient_payments.rs:37/39`;
    - `volume_accumulator.rs` lines in `end_day` (0x7dfc8) and its
      neighbours.

    Line, column and module file belong to the pump lanes.

### Where closing windows pays most under this layout

`tools/unlock.py` prices blockers with an exact model for call-only bodies;
the model reproduces the measured raw count. Round25 figures (`unlock`):

- From `__rust_dealloc` (0x1570b8) onward, 14 unmatched windows (13,464 bytes)
  change net size. Making them size-neutral would give **273 raw (+138)**.
  "Size-neutral" means matched, or the real function present.
  - Five are leaf windows after the allocator shim: 0x17bc48, 0x17c0f0,
    0x17c3d8, 0x17c548, 0x17c850.
  - Six are dependency windows, including the unassigned duplicates 0x199db8
    and 0x1ab1f8: 0x184e38, 0x18fc98, 0x1905a8, 0x199db8, 0x19e3b0, 0x1ab1f8.
  - Three are in the main CGU: 0x163ea8, 0x1774f8, 0x177700.
- The 11 dependency-region windows alone give +57.
- With every size-changing window neutral the ceiling is 342 (333–342 on
  earlier rounds; each round's figure is in its claims).

### What the blockers are (for the pump-lo/mid/hi lanes)

`tools/archive_identify.py` searches every function in the linked rlibs,
including those `--gc-sections` drops, with call and lddw immediates masked.
These are recorded observations (`roundNN/ordered/archive-identification.json`)
that need the dependency archives to re-derive.

| window | bytes | dependency function |
|---|---|---|
| 0x180cc0 | 1,896 | `anchor_spl::token_2022::burn` (identified on Round21; matched since Round22) |
| 0x184e38 | 2,664 | `anchor_spl::token_2022_extensions::transfer_fee::harvest_withheld_tokens_to_mint` |
| 0x18fc98 | 2,320 | `spl_token_2022::extension::transfer_fee::instruction::TransferFeeInstruction::pack` |
| 0x1905a8 | 1,104 | `spl_token_2022::extension::transfer_fee::instruction::harvest_withheld_tokens_to_mint` |
| 0x192c20 | 1,384 | `spl_token_2022::instruction::burn` (matched since Round22) |
| 0x19e3b0 | 896 | `anchor_lang::system_program::transfer_with_seed` |

The five leaf windows after the allocator shim have no data references, and
no calls except `__multi3`/`__udivti3`. Each is called once, from unmatched
main-CGU windows 0x1a918, 0x52660, 0x94e28, 0x95360 and 0x94908. Their
position before `anchor_spl` in link order suggests 128-bit math in a
separate crate. 0x1774f8 and 0x177700 are main-CGU error-building closures,
called from unmatched 0x14c038.

**Other whole-ELF gaps.**

- Already equal to the original: `.dynsym` names and `.dynstr`.
- Still different, measured on Round21: `.rodata` was 456 bytes short and
  `.data.rel.ro` 768 bytes long.
- Relocations: the original has 5,877 relative and 270 syscall relocations;
  the Round21 candidate had 5,555 and 208.

## Reproduce

The lane branch fast-forwarded to each new origin/main round, so
`programs/pump` holds only the newest round's source. Build any recorded
round from its archived primary source. Run from the repository root with
the v1.44 SDK in `~/.cache/solana` and a warm `~/.cargo` registry, holding the
shared build lock around `build.py`.

```sh
T=research/claude-layout-pump-20261027/tools
F=repro/pump/main-contract-round25-20261027        # or round20/21/22/23
python3 $T/build.py --source-directory $F/primary --output OUT/base --persistent PERSIST
#   OUT/base/unstripped.so must equal $F/unstripped.so (published round)
python3 $T/derive_layout.py --windows-from $F/inventory.json.gz \
  --candidate OUT/base/unstripped.so --map OUT/base/link/link.map --output-dir OUT/layout
#   OUT/layout/ordered.ld equals research/claude-layout-pump-20261027/roundNN/ordered.ld
python3 $T/build.py --source-directory $F/primary --output OUT/ordered --persistent PERSIST \
  --linker-script OUT/layout/ordered.ld
python3 $T/measure.py --candidate OUT/ordered/unstripped.so --windows-from $F/inventory.json.gz
python3 research/claude-layout-pump-20261027/verify.py        # offline re-verification
python3 research/claude-layout-pump-20261027/test_scope.py    # negative controls
```

For a complete build, omit `--persistent` and pass a fresh `--target-dir`.
`tools/package_round.py` assembles a round directory. `tools/policy_controls.py`
regenerates the controls. `PROGRESS.md` has the running log and the
verified-gains ledger.
