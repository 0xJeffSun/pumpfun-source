# Mayhem 434: one conditional formatting route

This follows a real `ProgramErrorWithOrigin::log` route from the
[qualified 434-window image](../mayhem-current434-composition-20261027/README.md)
through `format_inner`, `fmt::write`, ProgramError Debug, and a String writer.
It checks the original ELF against the exact qualified candidate using a
bounded static instruction interpreter. No target VM executes.

For tag inputs **1–25**, under the explicit contracts below, both images
select the same three indirect sites and corresponding complete functions:

| Original function | Offset | Selected target |
| --- | ---: | --- |
| `fmt::write` at 678,096 | 672 | String `write_str`, for the initial literal |
| `fmt::write` at 678,096 | 720 | ProgramError Debug, from the first argument descriptor |
| Formatter `write_str` at 682,144 | 32 | The same String writer, from the formatter's vtable |

That is **three context-qualified sites**, observed in 25 tag traces per
image, not 75 distinct sites or generic closure of these functions. The reader
checks four piece-length words, a 138-byte allocation request with alignment
one, the 35-byte prefix, and each of the 25 counted Debug names. It validates
the actual code-address loads, stack stores/reloads, vtable-slot reads and
register-selected calls. Each selected target pair belongs to the existing
recursive ordered direct-call relation.

## Contracts and boundary

The selected input has an eight-byte value of 2 at the error wrapper's offset
zero and a four-byte ProgramError tag of 1–25 at offset 32. These are explicit
input constraints, not authentication of the original source enum domain.

Allocation succeeds. The prefix writer returns Ok and preserves readonly data
and unrelated stack memory. It may change the String's 24-byte metadata and owned
buffer: the interpreter makes all metadata bytes opaque after this call, and
does not read the buffer. Those side effects cannot affect the selected
dispatches before the stop point. The reader stops on entry to the second
String writer, before claiming its output or return behavior.

The ProgramError-to-u64 conversion's result also stays opaque. Its complete
864-byte body has no memory operations or calls, 50 forward branches, and one
final exit. This justifies skipping its numeric result while checking that no
overlapping read consumes that opaque value before the stop point. Arithmetic
wraps to u64, signed jumps use signed values, stack frames preserve the SBPF
callee-saved registers, and opaque writes taint overlapping read widths.
Stack addresses are synthetic, disjoint 64-KiB placements. The selected route
does not compare numeric pointers across frames, so this is an alias/value-flow
trace rather than a reproduction of VM stack addresses.

This adds **zero function matches, builds, or runtime executions**. It does not
prove complete formatting, allocator or writer semantics, arbitrary tags,
generic indirect-call closure, general data identity, or whole-ELF identity.
The candidate remains 434/441 normalized windows, 141 raw windows, and 425
windows in the prior direct-call relation.

The attempted unwrap route is a separate boundary: `unwrap_failed` and
`panic_fmt` reach `rust_begin_unwind` and a 16-byte body calling the external
`custom_panic` and `abort` symbols. No internal formatter dispatch is established
through those external calls. This packet uses the direct logging route.

## Reproduce

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current434-format-route-20261027/verify.py
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current434-format-route-20261027/test_verify.py
```

The manifest covers every packet file and rejects extra files, symlinks and
special files. `inputs.json` pins the original and candidate ELF archives,
unchanged ELF reader, normalizer, original window inventory, and the imported
code-reference helper. Verification recomputes all 25 traces and compares them
with the saved report. No compiler, VM, network call or Git command runs.

Negative controls alter actual ELF callback operands, vtable entries, all 25
counted names, the prefix, piece lengths, and a call-register operand. A pair
of compensating length changes is rejected even when the allocation total
stays the same. Positive controls accept a corresponding formatter alias and
a byte beyond the selected literal; normal input-hash verification still
rejects both altered ELF files. Model controls cover u64 wrapping, signed
branches and overlapping opaque memory, and a FIFO control checks package
membership enforcement.
