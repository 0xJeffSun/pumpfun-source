# Fees whole-ELF end state: only the two remaining bodies separate the build from the original

**Diagnostic evidence, not a reconstruction.** It shows that the current Fees build recipe already produces the
original's complete meaningful ELF once the remaining function bodies match. No new function match is claimed.

## What was shown

1. **Transplant control.** We started from the accepted 582-function source build
   (`research/fees-extend-integration`). Its saved root object had the three then-unmatched bodies (Sweep 120816,
   Crank 147944, CreateDonation 163920) replaced by the original window bytes. Every call, `lddw` and syscall in
   them was re-expressed as an ordinary relocation against the candidate's corresponding symbol: 149 calls,
   76 data loads, 8 imports, no new symbols. The unchanged container `rust-lld` command and the **unchanged accepted
   `ordered.ld`** were then rerun.
   - The stripped result is **873,256 bytes, byte-identical to the original `deployed.so` meaningful ELF extent**:
     0 differing bytes, SHA-256 `5b6ceda5…`.
   - The remaining 75,688 bytes of the capture are zero loader allocation.
   - The extra candidate-only `<DonationFeePdaCreated as Event>::data` function disappears through
     `--gc-sections` once nothing calls it.
   - Controls: relinking the saved objects unchanged reproduces the accepted artifacts exactly (`7fdeefd6…` /
     `ca9e6a93…`), and so does an object round trip through the relocation writer.
2. **Inventory.** `tools/elfinv.py` accounts for every byte of the original meaningful ELF extent against a stripped
   candidate. It translates addresses through the positional window correspondence and the read-only section shifts,
   then classifies each difference:
   - **(a)** consequences of the unmatched bodies (sizes, address shifts, the relocations inside them);
   - **(b)** independent differences.

   For the accepted 582 parent and for the 583-window Sweep source of PR #301, (b) is **empty**.
   - `.rodata`, `.dynstr` and `.shstrtab` are byte-identical.
   - `.data.rel.ro` is equal after translating all 379 relocated pointers.
   - `.dynsym` has the same order and names.
   - The 2,682 `.rel.dyn` entries outside the bodies are equal in content and order.
3. **What a "match" must also satisfy.** Normalization masks call targets and data addresses, so a body counts for
   whole-ELF identity only if it also reaches the original callees and data objects. `PLAN.md` §2 lists what is still
   hidden in the two remaining bodies:
   - Crank has a second `msg!("Nothing to donate")` site and calls `handle_alloc_error` rather than `exchange_malloc`.
   - Create inlines `to_string` (direct `<FeeError as Display>::fmt` with the `String` `fmt::Write` vtable), and loads
     the public `ID` program-id statics.

So the recipe, linker script, symbol order and ELF structure need no further work. What remains is exactly the
Crank and CreateDonation bodies, matched with their original call/data targets. Any source change also needs
`ordered.ld` re-bound to the changed sections, which `tools/relayout.py` does.

## Tools

- `tools/elfinv.py`: the whole-ELF inventory described above.
- `tools/relayout.py`: regenerates `ordered.ld` after a source change. It binds complete input sections by exact
  name, hash-free alias, content identity, call/pointer graph propagation and recursive colors. Every matched
  function keeps its window slot, a newly matching body moves into its original window, and vanished sections are
  dropped. On three real transitions it reproduces the integrators' `ordered.ld` byte for byte: w580→w582 ordinal
  renumbering, 582→583 (eight impl hash changes), and PR #301's hash space → an independent container build (964
  renamed sections). See `PLAN.md` §3.
- `tools/transplant.py`, `relobj.py`, `relink.py`, `lbuild.py`: the diagnostic transplant and link-only replay. They
  record the run's local container paths as provenance; they are not portable materializers.

`transplant/` keeps the transplanted object (gzipped), the link map, the effective linker arguments and the result
receipt. `reports/` keeps the inventories for the parent, the PR #304 Create tree and two synthetic relayout
controls. `PLAN.md` is the full lane write-up.

```sh
python3 -B research/claude-fees100-whole-elf-endstate-20261027/verify.py
```

The verifier is stdlib-only. It:
- rejects extra, symlinked or special files and optimized Python;
- checks that the original's bytes past the meaningful extent are zero and that the transplant receipt's stripped
  hash equals the original meaningful ELF;
- re-runs `tools/elfinv.py` on `research/fees-extend-integration`'s committed candidate and symbols ELFs and requires
  zero independent differences, with the same consequence list as the saved report.

It does not re-run the link (that needs the pinned Linux SDK container; `tools/relink.py` records the exact command).

Produced by the parallel Claude `fees100` run (layout-elf lane), 2026-10-27.
