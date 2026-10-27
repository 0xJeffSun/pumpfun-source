# Fresh portable Linux Mayhem diagnostic

Two independent empty-target Linux builds of the archived **67-file qualified
source** produce identical symbol and stripped ELFs. They preserve all **432/441
normalized windows**, with **84 raw-local** matches and the same nine unmatched
bodies. No new function is recovered. The selected checkpoint retains its 100
raw matches and is not replaced by this diagnostic.

Both builds use the official Linux platform-tools v1.54 archive, SHA-256
`fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e`.
All Cargo dependencies compile afresh from the locked registry versions; no
parent target cache, private host paths, or retained dependency archives are
needed. Only standard `llvm-objcopy --strip-all` follows linking. This uses the
default section order, not the qualified parent's whole-section order.

Repeated artifacts:

- Symbols: `9cd6ac43278b854d6d6a5fec9a1624ee205344a774714c893a2a3688ebc12301`
- Stripped: `a6adc4f876da179b4ce3daeebd55d24d17ca1aad4fc288085c5a1c5ba15069c5`

The first build's executed controller, both compiler logs and launch records,
source/tool hashes, compressed artifacts and complete per-window inventories
are retained. The second build ran the portable recipe below from an entirely
new directory, including another tool extraction and Cargo download/build.
This establishes a usable fresh-build baseline; neither original historical
toolchain attribution nor whole-original ELF equality is established.

## Reproduce

Use Linux x86-64 with Python 3.12+, a C linker/toolchain and network access for
locked Cargo package downloads. Download the public archive linked in
`manifest.json`, then run:

```sh
python3 -B research/mayhem-clean-linux-build-20261027/reproduce.py \
  --toolchain-archive /path/to/platform-tools-linux-x86_64.tar.bz2 \
  --output /path/to/new-empty-build
```

The output path must not exist. The recipe verifies the official archive hash,
safely extracts the tools/source, checks all 67 source hashes, fetches locked
dependencies, compiles offline into an empty target, retains compiler receipts,
strips a copy and measures all original windows. Source and checked tools are
verified again after compilation. Extraction and compilation need several GB.

Saved-evidence verification (no compiler or VM):

```sh
python3 -B research/mayhem-clean-linux-build-20261027/verify.py
python3 -O -B research/mayhem-clean-linux-build-20261027/verify.py
```

## Bounded Legacy Buy ownership control

A third, incremental root build replaces direct assignment to
`cpi_ctx.remaining_accounts` with Anchor's `with_remaining_accounts` builder.
The changed source, patch, exact input cohort, command, compiler logs and both
artifacts are retained under `control/`. To make a fresh control build, add
`--with-remaining-accounts` to the recipe with another new output path.

The handler remains **13,784 bytes**, versus **13,848 original bytes**. All 432
normalized and 84 raw-local window matches survive. Heuristic ordered-slot
alignment rises from **471 to 620** original slots, while same-offset equality
falls from **28 to 27**. The full body still differs. This isolates a real
ownership-expression effect but does not establish a recovery or justify
promotion. `analyze_control.py` re-derives both scores using the frozen reader
and Python SequenceMatcher with autojunk disabled.

No target executions, signed runtime comparisons or semantic qualifications
are transferred from the historical checkpoint to these artifacts. Code/data
closure, source coordinates, compute behavior, original provenance and complete
ELF identity remain open. No executable patching, dummy instructions, assembly
substitution or invented padding is used.
