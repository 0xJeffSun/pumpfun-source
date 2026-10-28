# Mayhem 434: conditional Custom formatter route

This extends the [unit-tag formatting proof](../mayhem-current434-format-route-20261027/README.md)
to tag zero's `Custom` branch. The original ELF and exact qualified 434-window
candidate agree on five context-qualified indirect sites: the two earlier
`fmt::write` sites and three calls in the 720-byte tuple formatter:

| Tuple formatter offset | Selected operation |
| ---: | --- |
| 64 | Write the six-byte `Custom` name through the String writer |
| 144 | Write the one-byte opening parenthesis through the same writer |
| 192 | Load the nested vtable's slot at +24 and call its reference-Debug target |

After the last indirect call, the trace follows the reference dereference and
the default-format flag branch to the u32 numeric formatter. It stops at that
formatter's entry. The numeric payload is opaque throughout: this proves the
pointer's passage into the correct formatter, not the digits it prints.

The selected vtable prefix is exactly 32 bytes: three scalar words `(0, 8, 8)`
and one relocated function pointer. Those words agree and the pointed-to body
belongs to the existing recursive direct-call relation. Neither a following
object nor a larger allocation extent is inferred. Original function names
remain attributions from the matching candidate symbols.

## Conditions and limits

The input discriminator at offset zero is 2 and the ProgramError tag at offset
32 is zero. Allocation succeeds. The prefix and delimiter writers return Ok,
may mutate the String metadata and owned buffer, and preserve readonly data
and unrelated stack memory. All 24 String metadata bytes are made opaque after
each write. Stack frames are synthetic disjoint placements; numeric pointer
comparisons between frames are not claimed.

The scalar conversion uses the same bytecode contract as the prior route and its result
remains opaque. The new interpreter operation is u64 bitwise AND, needed by
the tuple/format-flag branches. `verify.py` requires `unit_trace.py` to equal
the frozen prior reader with only that explicit opcode extension.

This adds three conditional tuple sites beyond the previous route, with no
new whole-function match, build, or runtime execution. Generic indirect-call
closure, complete formatting, writer/allocator behavior, arbitrary inputs and
whole-ELF identity remain unproved. The source and compiled candidate are
unchanged.

## Verification

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current434-custom-format-route-20261027/verify.py
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current434-custom-format-route-20261027/test_verify.py
```

Verification checks the complete packet inventory, external input hashes,
the exact interpreter extension, and a fresh reconstruction of the saved
trace. Negative controls alter real ELF literals, the nested function pointer,
vtable scalar words, the reference dereference, and the tuple call register.
Positive controls keep bytes after the selected name/vtable outside this
bounded scope. Normal input-hash verification still rejects the changed ELF.
A FIFO regression rejects unlisted special files, and a model control checks
the added bitwise operation.
