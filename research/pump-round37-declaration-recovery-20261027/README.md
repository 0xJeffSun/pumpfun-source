# Pump declaration recovery: 766 → 777 / 1,035

Eleven additional original function windows match under the existing instruction normalization, with all 766 parent matches retained. This extends PR #343 and reaches 33 additional windows from maintained Round37's 744.

| Native stage | Matched windows | Change |
| --- | ---: | --- |
| Parent | 766 | PR #343 research source |
| Migration | 769 | Restore checked-subtraction error source lines |
| Legacy buy | 770 | Restore generated account error source line |
| Ceiling division | 771 | Move unchanged helper to inferred source lines |
| Global method | 772 | Restore buyback basis-points validation source line |
| Declaration paths | 776 | Move Initialize, Create and LegacyBuy declarations to lib.rs; move InitUserVolume to its original module path |
| Reserved fees | 777 | Move unchanged checked fee-sum helper to lib.rs at its inferred source line |

The declaration and helper moves use ordinary Rust definitions and imports. Fields, constraints, arithmetic operations and validation conditions remain the same. The PumpError enum is moved into an existing blank region to make room for the Global method while preserving other declaration coordinates. Inferred positions and observed filenames do not prove the complete historical source arrangement.

`declaration-only.patch` applies to the 766 research source. Complete primary inputs, native artifacts, compiler logs and build records are archived for each stage. Repeated native builds at 771 and 777 produce identical stripped and unstripped artifacts. `verify.py` independently checks input bindings, native hashes, every stage's normalized match multiplicities, preservation of all prior matches and the actual source filename references for eleven recovered roots.

The direct-call traversal visits 122 matched function pairs and 588 edges, with one differing callee explicitly retained in `declaration-closure.json`. It is not a complete direct-call closure certificate. Indirect calls, data identity, host-toolchain qualification and whole ELF identity remain unresolved. No original executable bytes are build inputs; no compiler or linker output is patched.

The exact 777 candidate's own 44-suite regression run is in progress. Earlier binaries' runtime results are not reused. Maintained programs/pump, the selected Round37 checkpoint and the repository headline metrics remain unchanged.
