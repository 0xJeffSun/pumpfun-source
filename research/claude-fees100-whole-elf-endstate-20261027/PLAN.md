# Fees whole-ELF plan (layout-elf lane, 2026-10-27)

R = the fees100 run root. Tools are in `R/shared/tools/` (masters in `R/lanes/layout-elf/tools/`).

**Summary.** The current Linux recipe produces the original's complete ELF. Sources stay the same apart
from the two remaining bodies. A diagnostic transplant of the original bodies yields a stripped ELF
with **0 differing bytes** from the original. Recipe, linker, symbol-order and ELF-structure work are
therefore finished. Three things are still needed:

1. Crank 147944 and CreateDonation 163920 must match, **with the original call and data targets**.
2. The source change must not add, drop or reorder data objects.
3. `ordered.ld` must be regenerated for the changed source with `relayout.py`, which is delivered and
   proven.

## 1. Proven end state (diagnostic only, never harvestable)

`transplant.py` started from the w582 root object (`pump_fees_candidate…-cgu.0.rcgu.o`, saved by
`lbuild.py`). It replaced the three then-unmatched bodies (Sweep, Crank, Create) with the original window
bytes. Every call, lddw and syscall became an ordinary relocation against the candidate's corresponding
symbol: 149 calls, 76 lddw and 8 imports, with no new symbols needed. `relink.py` then re-ran the
container rust-lld with the **unchanged** w582 `ordered.ld`.

- The stripped result is **873,256 B, sha256 `5b6ceda5…`**. It equals `deployed.so[:873256]`, the
  original's meaningful ELF extent, byte for byte.
- The remaining 75,688 B of `deployed.so` are all zero. They are the loader's account allocation (the
  programdata account is a 45-byte header plus a 948,944-byte payload). As with Relay, this tail comes
  from deployment, not from the build.
- The symbols ELF measures **585/585 normalized and 585/585 raw-local**.
- `<DonationFeePdaCreated as Event>::data` disappears through `--gc-sections` once nothing calls it. Its
  selector in `ordered.ld` then matches nothing, which is harmless.
- Controls: replaying the saved link reproduces w582 exactly (`ca9e6a93…` / `7fdeefd6…`). So does
  round-tripping the object through `relobj.py` without changes.

Artifacts: `R/lanes/layout-elf/diag/transplant3-{candidate,symbols}.so` and `transplant3-report.json`.

## 2. Inventory of every current ELF difference

Run `python3 -I R/shared/tools/elfinv.py CAND.so --symbols SYM.so [--json OUT]`. It maps candidate
addresses to original ones through the positional window correspondence (the recipe orders functions by
original window, with extras last) and through the read-only section shifts. It then compares every
structure and classifies each difference:

- **(a) consequence** of the unmatched bodies;
- **(b) independent** of them.

Results:

- **w582** (stripped `7fdeefd6…`): (b) is empty.
- **w583** (stripped `e5c3d298…` = PR #301): (b) is empty. The new Sweep match is equal after
  translation, so it is raw-ready.
- **PR #304 create tree** after relayout: (b) is empty, and `.rodata` equals the original.

| item | original | w583 candidate | class |
| --- | --- | --- | --- |
| `.text` size | 799,648 | 796,856 | (a) gap 2,792 = Crank +752, Create +2,688, extra fn -648 |
| 583 matched windows | | | (a) byte-equal after translating 4,474 call displacements and 2,155 lddw addresses |
| `.rodata` | 21,079 B | 21,079 B | identical bytes |
| `.data.rel.ro` | 6,744 B | 6,744 B | (a) equal after translating all 379 relocated pointers |
| `.rel.dyn` | 2,748 entries | 2,746 entries | (a) see note 1 |
| `.dynsym` | 18 | 18 | (a) same order and names; only the `entrypoint` and `custom_panic` values differ (shifted) |
| `.dynamic` | 11 | 11 | (a) REL, SYMTAB and STRTAB addresses; RELSZ +32; RELCOUNT 2593 vs 2592 |
| ELF header | | | (a) `e_entry` shifted; `e_shoff` +2,824 (text gap + relocation gap) |
| program headers | 4 | 4 | (a) offset and address shifts; filesz/memsz gaps |
| section headers | 9 | 9 | (a) addresses, offsets and sizes only; names, flags, alignment and order are equal |
| `.dynstr`, `.shstrtab` | | | identical |
| padding | 1 B before `.data.rel.ro`, 4 B before `.rel.dyn` | same | identical |

Note 1 (`.rel.dyn`): the 2,682 entries outside the bodies are equal in content **and** order. lld sorts
RELATIVE entries first, then by symbol and offset, so order follows from addresses. Inside the bodies the
counts differ:

| relocation | original | candidate |
| --- | ---: | ---: |
| RELATIVE | 59 | 58 |
| `abort` | 2 | 2 |
| `sol_log_` | 5 | 4 |

**`.dynsym` order is fixed by the input objects, not by the bodies.** It is: exports
(`custom_panic`, `entrypoint`), then the root object's undefined syscalls in creation order (`abort`,
then `sol_log_`, both first referenced by earlier functions), then library syscalls in link order. The
remaining bodies cannot change it unless they become the first users of a syscall, and neither is.

### What normalization hides in the two remaining bodies

**Crank (w583 = PR #304 targets apart from the anchor patch):**
- The original has a second `msg!("Nothing to donate")` site. It loads the rodata at 803046 at offsets
  7336 **and** 11528; the candidate loads it only at 7336. That accounts for the extra `sol_log_` and the
  extra RELATIVE relocation.
- Callee difference: the original calls `alloc::alloc::handle_alloc_error`; the candidate calls
  `alloc::alloc::exchange_malloc`.

**Create (PR #304 tree, 13,448 B):**
- The callees differ only by `<FeeError as Display>::fmt` ×2 (original) against `ToString::to_string` ×2
  (PR #304).
- The original loads the `<String as fmt::Write>` vtable (`.data.rel.ro` 821240: drop, size 24,
  align 8, write_str/char/fmt) at offsets 2232, 2912, 5112 and 5320. It loads the message
  "a Display implementation returned an error unexpectedly" at 5472. So `to_string` is **inlined** in the
  original.
- Program-id references: the original loads the **first** of each equal-valued pair. That is PUMP 806605
  and PUMP_AMM 806716 ×2, the public `ID` statics. PR #304 loads the copies 32 bytes later (806637,
  806748), the private `__ID`. The affected offsets are 440, 10368 and 11808; use the public-static borrow
  form from `research/fees-program-id-references`.

## 3. Keeping the layout right while sources change: `relayout.py`

```
python3 -I R/shared/tools/relayout.py \
  --old-ld R/shared/frontier/w583/ordered.ld --old-map R/shared/frontier/container/w583.map \
  --old-symbols R/shared/frontier/w583-container-symbols.so \
  --new-map NEW.map --new-symbols NEW-symbols.so --out NEW.ld [--report R.json]
python3 -I R/shared/tools/relayout.py --check --old-ld NEW.ld --new-map BUILT.map   # verifies a link that USED NEW.ld
python3 -I R/shared/tools/relayout_build.py SRC_DIR OUT_PREFIX [--stale LBUILD_PREFIX]  # one shot
```

`NEW` can be any container link of the changed source, for example `cbuild.py` or `lbuild.py` with the
stale `ordered.ld`.

**How `relayout.py` binds sections.** Atoms are complete input sections from the map. Old and new atoms
are matched by these passes, in order:

1. exact owner and section name (never for ordinal `.L__unnamed_N` or merged pools);
2. alias-name sets with the legacy hashes removed;
3. content identity (the window-normalizer signature, or relocated data contents with recursive target
   identities);
4. call/lddw/pointer graph propagation;
5. recursive colors;
6. stable order inside equal groups (reported);
7. a call-site successor pass: the same call offset in an unchanged caller binds an otherwise unbound
   callee, for example a handler body that moved into another function.

**How it places them.**
- Every bound atom keeps its old slot. The old `.text` order is aligned to the original windows.
- A new function whose signature equals an original window moves into that window.
- An empty window takes the most similar unplaced function (displacement-masked shape ratio).
- Vanished sections are dropped.
- Extra functions and genuinely new data are appended and reported. A new data atom fills a dropped atom
  of the same size if one exists.
- A change in a merged constant pool (`.rodata.cstN`) is flagged. The linker cannot reorder inside a
  pool; its order comes from first emission, which is set by source declaration order.

**Proofs.** All are reproduced by `tools/regress.sh` in about 5 s.

| case | change | result |
| --- | --- | --- |
| T1 w580→w582 | Extend; `.L__unnamed_86/87` swap between `.rodata` and `.data.rel.ro` | output == `frontier/w582/ordered.ld` byte-for-byte. The stale ld gives `.rodata` 21,086 B. |
| T2 w582→w583 | Sweep; 8 impl hashes changed in `state.rs` | output == `frontier/w583/ordered.ld`. The stale ld gives raw 195. |
| T3 PR #301 → our container | crate hash `363d1ec1` → `85ade9ce`; 964 atoms renamed | output == `frontier/w583/ordered.ld` |
| S1 synthetic | renamed fn + `impl BuybackVault {}` on a blank line | stale ld: raw 195. Relayout: 11 renamed; the full `cbuild.py` stripped output is **`e5c3d298…` == w583**; raw 200. |
| S2 synthetic | extra `msg!` in create (215 renumbered, 1 new string) | stale ld: `.rodata` scrambled, 314 windows and 832 pointers wrong. Relayout: the original 21,079-B `.rodata` is an exact prefix and the new string is appended; raw 200; full `cbuild` confirmed. |
| S3 synthetic | old = w582 layout, new = w583 with the matched Sweep handler renamed | the call-site successor pass and, separately, the signature-move fallback each put it at 120816; stripped **`e5c3d298…`**. |
| T4 PR #304 create | body moved into `pump_fees_candidate::create_donation_fee_pda`; event fn gone | successor pass (or similarity 0.54 fallback) puts it at window 163920; 585 compiled windows; `--check` perfect; (b) empty; `.rodata` == original; 583/200 with no loss. |

`relink.py` (≈3 s) gives output identical to a full `cbuild.py` with the same `ordered.ld`. This was
verified on S1 (`725ab649…`) and S2 (`7970c425…`).

## 4. Final recipe and integration checklist

The recipe is unchanged from `research/fees-extend-integration` and PR #301:
- pinned Linux platform-tools v1.44 container;
- `cargo rustc --release --target sbpf-solana-solana --locked --offline --lib` with the three
  `--remap-path-prefix` flags and `RUSTFLAGS=-Zremap-cwd-prefix=`;
- vendored `anchor-attribute-program` at `/work/next637/vendor/used-public` (the path is hashed into
  crate metadata);
- a linker wrapper that swaps the SDK script for `ordered.ld`;
- `llvm-objcopy --strip-all` (v1.52).

When the last bodies land, follow these steps:

1. Build the composed source and regenerate the layout in one step. Install `X.ld` as the tree's
   `ordered.ld`.
   `python3 -I R/shared/tools/relayout_build.py TREE OUT/X`
2. Accept only if `X-summary.json` shows all of the following:
   - `check_ok`;
   - `normalized == 585`, `raw_local == 585`;
   - no `dropped_old` and no `unplaced_new` beyond the event-data body;
   - `merged_pool_changes == []`;
   - `whole_elf_equal == true`.
3. If the result is normalized 585 but raw < 585, the cause is target identity (section 2). `elfinv.py`
   lists the windows that differ after translation. Fix the callee choice or data object in source;
   never in the layout.
4. If `whole_elf_equal` is false while (b) is empty and raw is 585, compare the data sets. The usual
   causes are a new or removed `.rodata` atom and a merged-pool order change, both fixable only in
   source.
5. Confirm with one fresh `cbuild.py` of the final tree. Check that the stripped output equals
   `deployed.so[:873256]` (sha256 `5b6ceda5…`). The captured payload is that ELF plus 75,688 zero bytes.

## 5. Remaining delta (as of w583)

| window | original | best known source | gap |
| --- | --- | --- | --- |
| Crank 147944 | 15,976 B / 1,950 insns | PR #304: 15,952 B / 1,947 insns, with an anchor-lang patch | 24 B / 3 insns; plus the second "Nothing to donate" site and `handle_alloc_error` targets |
| Create 163920 | 13,800 B / 1,641 insns | PR #304: 13,448 B / 1,599 insns, event fn already inlined | 352 B / 42 insns; inlined `to_string` (String vtable + direct `Display::fmt` ×2); public-ID program-id loads |

Nothing outside these two bodies differs.
