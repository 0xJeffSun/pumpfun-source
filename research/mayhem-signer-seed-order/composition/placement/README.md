# Locate the callee-layout divergence in LLVM block placement

The parent composition's 50/51 versus 45/51 ordered-callee diagnostic is a
**file-layout difference**, not evidence of changed dynamic call order. Actual
compiler traces now locate the divergence: the two sources have identical
ordered 51-callee identities immediately before LLVM's `block-placement`
pass, then different sequences immediately after it. Each post-pass sequence
equals the resolved immediate callees in its corresponding final ELF.
Local callee identities use the parent's complete normalized body and
relocation-pattern comparison; imported calls use symbol names. Raw callee
bytes, referenced data, imported implementations and recursive identity are
not established by this comparison.

This follows the real compiler pipeline, using these diagnostic arguments:

```text
-C llvm-args=-print-before=block-placement
-C llvm-args=-print-after=block-placement
-C llvm-args=-filter-print-funcs=_ZN16mayhem_recovered12instructions14pump_interface19legacy_sell_handler17hf2e4c78980301589E
```

Both compilations reproduce **both complete parent outputs**, including the
unstripped symbols ELF and ordinary stripped ELF. The raw compiler stderr,
commands/environments, source/dependency/tool bindings, linker records and
complete outputs are retained. The trace identifies the pass as
`Branch Probability Basic Block Placement`; it has not been edited into an
assembler input or substituted for compiled Rust.

| Source | Blocks before pass | Blocks after pass | Calls before/after | Post-pass callees equal final ELF |
| --- | ---: | ---: | ---: | --- |
| Merged trade source, early seeds | 197 | 197 | 51 / 51 | Yes |
| Same source, inline late seeds | 199 | 197 | 51 / 51 | Yes |

Block numbers are local to a trace stage. They can be renumbered when blocks
are removed, so this reader does not compare block IDs across stages or claim
that identically numbered blocks have stable identities. Equal pre-pass
callee sequences do not imply equal machine instructions, CFGs, register
allocation, alias behavior or runtime results.

Two additional ordinary Rust compilations retain complete optimized LLVM IR
using `--emit=dep-info,link,llvm-ir`. Their **complete stripped outputs** and
all allocated sections equal the corresponding parents. Their unstripped
outputs differ: only `.symtab` and `.strtab` section contents change. This is
explicitly not full unstripped compiler-output identity. The verifier keeps
the actual whole-output comparisons and does not replace either artifact
with an allocation image or normalized match.

The extracted Legacy Sell definitions contain an exact **210-line prefix**,
from the first Context pointer access through the pre-CPI token snapshot,
after one explicitly checked return-label rename (`%bb67` to `%bb66`, three
occurrences). This covers the price and reserve arithmetic text. It is not
a general IR equivalence or metadata-closure proof. The Context byte-field
GEP at offset 34 appears at handler-relative IR line 260 in the early form
and 902 in the late form; the complete source, IR and machine receipts retain
their own precise bindings.

These four incremental diagnostic builds reuse the parent's 104 recorded
dependency artifacts and pinned native Windows compiler context. They are
not fresh dependency builds. The original ELF is only a comparison input.
No target was executed; older signed runtime receipts are not transferred.
No complete function, raw-byte frontier, historical recipe, full CFG or
behavioral equivalence is established. In particular, improving a sorted or
file-ordered callee score alone is not sufficient evidence of source recovery.

Run the standard-library-only offline replay directly, or run the parent
verifier, which includes it automatically:

```sh
python3 -I -B research/mayhem-signer-seed-order/composition/placement/verify.py
```

The actual exploratory compiler scripts are retained as `recorded-*.py`.
Their absolute workspace locators describe the recorded run; verification
uses only retained files and never invokes a compiler, VM, Git or network.
