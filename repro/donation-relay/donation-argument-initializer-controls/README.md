# Relay DonationArgs initializer controls

Two ordinary Rust controls test a previously unchanged initializer sequence in
all five public donation bodies. One puts `message.clone()` first within the
`DonationArgs` literal; the other follows the declaration order, putting message
before tip. Context evaluation still comes first. Whole-argument locals, Context
field orders and event field orders are separate controls.

Both compile to **exactly the same stripped and unstripped ELF files** as the
parent after-close source. They therefore add no matches: the inventory remains
488/492 normalized and 142 raw-local. The initializer variants are rejected.
This is a measured absence of compiler effect for these forms, not a claim about
all possible Rust expressions or about original source text.

The source hypothesis came from original94 preserving an argument pointer and
amount across AccountInfo clones differently from the reconstructed caller.
Every one of the 340 previously inspected DonationArgs literals kept the same
initializer order. These two controls change only that sequence. They do not
change field layout, types, values, ownership, CPI order or return handling.

Each retained log contains one actual root compiler invocation. Complete
60-input maps, compiler hash, offline command, source-unchanged checks and
artifact hashes are bound. Identical ELF files are referenced from the existing
[event initializer packet](../donation-event-initializer-controls/README.md),
not duplicated. Controllers archive the work-directory recipes; adapt their
container/workspace paths before reusing them.

```sh
python3 -I -B repro/donation-relay/donation-argument-initializer-controls/verify.py
```

The verifier reconstructs both source maps and reanalyzes complete original
windows. It masks only direct call displacements and relocation words, and
resolves wrapper subjects by symbol names. No runtime execution, semantic
closure, source authenticity or whole captured-ELF identity is claimed.
