# Quote integer-error nested Debug data

This extends the current qualified Mayhem quote checks past the previously
checked Debug formatter shape into one selected nested data route. Both quote
helpers have two integer-conversion unwrap sites. All four sites select the
same integer-error formatter and agree with the original on these contracts:

| Selected reference | Checked contract |
| --- | --- |
| Quote unwrap vtables | Four incoming sites, scalar prefix `(0, 0, 1)`, relocated formatter pointer, and complete immediate unwrap body |
| Integer-error Debug body | Complete 88-byte shape, counted 15-byte `TryFromIntError` name, and nested vtable passed as argument five |
| Nested vtable prefix | Exactly 32 selected bytes: scalar fields `(0, 8, 8)` and relocated formatter pointer |
| Actual tuple consumer | Complete 720-byte shape; both normal and alternate paths reload argument five, load an eight-byte pointer at `+24`, and call that register |
| Nested Debug body | Complete 48-byte shape, counted two-byte `()` literal, and complete immediate 1,320-byte padding body |

The two counted literals and selected vtable fields agree. Addresses differ;
`observations.json` retains both sides and all four incoming sites. Literal
lengths come from the actual instructions. No string terminator, neighboring
vtable, allocation size, or historical source type is inferred from adjacency.

The input is the unchanged qualified 432-window artifact, symbols SHA256
`440b92811753dd9af1468f6bf2d0e9139309984de3519a8f9a937babfdb6c903`.
This is an additional data check, with **zero new function matches or builds**.
It does not change that artifact, source, matcher masks, frozen scripts,
workflows, ledgers, or status counts. PR #295's separate native compilation and
runtime receipts are not used as evidence for this packet.

The generic tuple/padding routines still contain other data references and
indirect calls outside this selected route. Unwrap's downstream panic machinery
is not recursively closed here. These observations do not establish complete
formatter output, runtime error behavior, whole-data identity, or whole-ELF
identity. No target program, compiler, VM, Git command, or network request runs
during verification.

## Reproduce

From the repository root, using ordinary Python 3:

```sh
python3 -I -B research/mayhem-quote-integer-debug-data/verify.py
python3 -I -B research/mayhem-quote-integer-debug-data/test_scope.py
```

The packet manifest authenticates every packet file. `root-inputs.json` pins
exactly three external inputs: the original ELF, current qualified symbols
archive, and existing ELF-layout reader. `reader-origins.json` binds the two
unchanged copied matcher/ELF helpers to their Git blobs. Verification recomputes
the report from those ELF bytes using the existing normalization policy.

The scope tests independently change actual in-memory artifact bytes. Fifteen
negative controls cover literals and lengths, vtable fields and relocations,
pointer/call routing, load widths, and both consumer paths. Two positive scope
controls change a byte immediately after the counted name or selected vtable
prefix; the bounded reader accepts those changes. Ordinary verification still
rejects either changed input hash. Reference files are never modified.

## Prior work and preparation

The current quote packets already check the 88-byte formatter body, its caller
vtables, and the broader immediate quote data records. The added check follows
the formatter's nested vtable, its two actual consumer sites, and its two-byte
formatter literal. It is not a new discovery of those already matched bodies.

The separate twenty-tag MayhemError Debug-table lead was excluded: all twenty
names and their original indexed tables are already recovered and independently
checked in `repro/mayhem/shared-errors-typed-cpi/recover_error_table.py`.
No new error namespace or enum-table recovery is claimed.
