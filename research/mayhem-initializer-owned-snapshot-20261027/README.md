# Mayhem initializer owned snapshot control

This ordinary Rust control improves the still-unmatched initializer from **101
to 104 exact eight-byte slots out of 120**, with no new complete-body match.
O0193 remains 960 bytes, and both global counts remain **429/441 normalized and
89 unqualified raw-local windows**. The parent's 100 qualified raw windows are a
separate layout measurement, not this artifact's count.

The source keeps the mint's owned `AccountInfo` and copied `Pubkey` in one typed
snapshot and passes a reference to the copied key into the state initializer.
This gives the two objects the original stack addresses. No padding, dummy
store, assembly, binary edit or extra operation was added. Only `src/state.rs`
differs from the 67-file source archive of the
[trade-origins parent](../mayhem-trade-origins-validator/README.md).
The exact starting work source was `trade-origins-composed-01/programs/mayhem`.
The newer 429/139 historical-macro parser control is a different source and
artifact; it is not composed here and its counts are not claimed by this packet.

The remaining sixteen unequal slots are all before offset 320. Every normalized
slot from offset 320 onward, all five ordered immediate callee shapes and call
positions, and `state.rs:531:43` / `532:32` agree with the original. Slots include
the continuation words of `lddw`; they are not a count of source statements or
decoded instruction rows. `body-proof.json` retains the complete differences.

Two ordinary-controller builds reproduce both complete artifacts:

- Stripped candidate: `0012957150ef8d4ecc28b3945ed159f544e9f29ef8c64977e2c9c1889c17c13a`
- Symbol artifact: `2c8afb775948d7024f0827feba687ca47ee83d409e0de1bdd78db8e666c58740`

The LLVM-IR diagnostic build produces the same stripped candidate. Its symbol
artifact differs, so complete symbol-file parity with the diagnostic build is
not claimed. The retained frame dump is from the prior 101-slot control; its
input hash and command are explicit. It explains the swapped stack slots, not
historical compiler provenance. Native dependency caches were reused; these
are not fresh dependency builds.

Fresh offline execution of the ordinary candidate passes **69 case pairs and
168 signed execution records**, including ten successful creations: 53
initializer rejection cases and 16 genuine original-Pump-to-Mayhem CPI cases.
State, errors, events, inner instructions, return data, transaction bytes and
raw logs agree. The producer attests the actual executable program accounts.
The checker regenerates exact case dictionaries from the frozen case functions,
checks execution multiplicity and program hashes, and optionally rechecks every
signature. No old receipt was relabeled, and no chain deployment occurred.

```sh
python3 -B research/mayhem-initializer-owned-snapshot-20261027/verify.py
python3 -B research/mayhem-initializer-owned-snapshot-20261027/test_verify.py
# In a Python environment with solders installed:
python3 -B research/mayhem-initializer-owned-snapshot-20261027/verify.py --signatures
```

Verification performs no compilation, VM execution or RPC. The default command
checks frozen evidence and reports that signatures were not rechecked in that
invocation; `--signatures` performs that cryptographic check. The interpreter's
small default-Pubkey value provider is used only to regenerate the excluded
zero-creator case from a frozen pure case-list function, never for transaction
signing or execution. Original ELF inputs and the pinned parent packet are
required. Rebuilding also requires the recorded SDK and dependency inputs.

This is a validated partial source control, not a promotion, a new normalized
window, full initializer equivalence, or whole-ELF identity. The sixteen initial
copy-order slots and the other eleven unmatched Mayhem windows remain open.

Integration review also rejects unlisted special files, broken symbolic links,
and optimized Python runs that would disable the evidence assertions.
