# Twenty counted instruction-label byte intervals

This adds exact literal-byte obligations to the [writer48 relation](../mayhem-current436-writer-records-20261028/README.md). Twenty matched wrapper prologues place a relocated literal address in r1 and an immediate byte count in r2 immediately before a relocation-confirmed `sol_log_` call. Their **553 distinct counted bytes are identical** in the original and qualified436 candidate.

The lengths come from the actual machine instructions. Selection requires a straight-line entry prefix containing only register moves and stack stores before the pointer/length setup, and no branch in the whole window may enter the middle of that setup. The verifier checks both images independently, including pointer relocations, instruction fields and an allocated-section bound for each counted range. It neither uses NUL termination nor infers object size from a neighboring address.

All **429 windows / 579 counterpart pairs** in the prior data relation remain valid; local coverage remains **436 normalized / 141 raw-local**. No function or runtime count is added. Each selected range and both exact pointers, lengths, owner windows, call offsets and bytes are retained in `observations.json`.

The qualified source archive supplies the Rust instruction-function names. The two native source archives under `source-context/` are authenticated against that archive's Cargo.lock package checksums. They show Anchor's `Instruction: {ix_name}` construction and the Solana string logger's pointer/length call. This is source context for the observed call arguments, not proof of the original historical macro implementation or an executed syscall result.

Verification recursively propagates literal failures through the existing direct-call, Source-coordinate, relocated-code and selected32/writer48 relations. Tests mutate every counted literal and redirect an actual pointer: the previous579-pair data relation still passes while the affected new pairing is rejected. A positive boundary control changes a byte immediately beyond one count and confirms it is not included. Filesystem and source-archive controls enforce the packet and Cargo.lock bindings.

This establishes exact **byte intervals**, not complete allocations, string-object extents, log-output behavior, arbitrary dispatch, runtime equivalence or whole-ELF identity. The bytes outside the counts and all unselected references remain outside this proof. No compiler, VM, network request or target code runs.

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B verify.py --repo /absolute/path/to/pumpfun-source
PYTHONDONTWRITEBYTECODE=1 python3 -B test_verify.py
```
