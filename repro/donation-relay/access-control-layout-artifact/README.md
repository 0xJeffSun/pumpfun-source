# Relay access-control placement: build and replay evidence

One ordinary Rust source change restores the original runtime and settlement
entry-function placement while preserving all492 normalized function matches.
Complete raw-local matches increase317→376 with59 gains and no losses. Differing
common file positions fall18,623→9,398. Whole captured-file identity remains false.

The [source packet](../access-control-layout-source/README.md) replaces six
explicit leading checks with Anchor's authentic access-control attribute.
This packet retains three actual root builds: the492-window parent, the new
source and an independent materialization/rebuild of that same new source.
Recovered and repeat builds produce identical stripped and unstripped files:

- Stripped818,280 bytes: `06e7f3e0c42f243d8d1c7a3550520b3efdbfe28a2f721870ff98c6038bad1dfd`.
- Symbols929,536 bytes: `8267d231c008e1a064ad9aee27145d078edb6e782b224cec5f75eb705dcb12b6`.

Each build used the pinned Linux v1.48 compiler and authenticated dependency
cache. The parent baseline first reproduced its published hashes. Each retained
log has one real root invocation and unchanged-source checks. Reused dependencies
are stated explicitly; these are not three fresh all-dependency compilations.
Recorded controllers retain the actual work/container recipes; adapt those
paths before a new build.

## Static and runtime checks

All original windows194–204 have the correct address, candidate index and
complete raw body. Their103 actual direct calls bind matching full callee bodies
and closed direct-call shapes. These windows have no indirect-call instructions;
that does not settle indirect behavior elsewhere. ELF/program/section headers
and the entire `.dynsym`, `.dynamic`, `.rodata`, `.dynstr` and `.shstrtab` now match.

The complete positional data check retains359 pointers and507 raw-equal nonpointer
qwords:282 corresponding read-only offsets,74 closed text targets,three relative
data targets. Five text targets contain indirect calls, outside behavioral proof.
There are still9,324 differing `.text` positions,25 in `.data.rel.ro`, and49 in
`.rel.dyn` (34 changed records out of2,327). All section lengths match.

Fresh signed offline replay passes536 records /534 unique fixtures against the
captured original using the existing comparator and exclusions. This does not
prove arbitrary allocation/alias behavior or protected relayer settlement success.
No live-chain transaction was submitted. The captured12,168-byte allocation tail
remains separate from compiler output; its history is documented by the
[allocation provenance packet](../allocation-provenance/README.md).

```sh
python3 -B repro/donation-relay/access-control-layout-artifact/verify.py
```

Use the same Python environment with `solders` as the retained replay harness.
Verification rechecks source/build/artifact bindings, repeats the complete
static comparison from ELF bytes and validates retained signed replay records.
It does not compile or run a VM. No code bytes are patched or used as compiler
inputs, no linker order is synthesized, and no candidate is padded to match the
captured ProgramData payload. Full byte identity remains an open requirement.
