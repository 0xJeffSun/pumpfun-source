# Fees readonly ordering recovered from Rust declarations

The reconstructed Rust build now reproduces all **21,079 bytes of `.rodata`** in their original relative order. This closes the previous 73-byte gap. It preserves **578 normalized function matches,198 raw-local function matches, all 586 compiled function bodies,4587 compiled direct-call targets,105 Source records and 379 checked data-pointer targets**.

This is a data-section result. Seven original functions, absolute addresses and the complete ELF/capture remain unequal. The reconstructed Rust build is still the final acceptance requirement.

Three source files change declaration order. The state module follows instructions; admin precedes fee sharing; the fee-share update module precedes the associated-token helper. A Rust macro expands the original FeeError tokens before the program module while preserving their original source lines. These changes recover first-emission order within the compiler's merged constant pools. The four pools total 1320 bytes; every pool now matches. All other readonly allocations retain their established order.

The linker script rebinds complete compiler-emitted input sections to the prior qualified layout. No data bytes or instructions are inserted, split, copied from the target, or patched after compilation. The original binary is a comparison input. The compiler receives reconstructed Rust, pinned dependencies and the layout recipe.

Two native builds reproduce identical stripped and symbol artifacts. Fresh execution runs all 17,331 cases across 18 suites, including the parent checks for application-log equality. These bounded runtime observations do not prove whole-program byte identity.

```sh
python 3 -B research/fees-readonly-order-recovery/verify.py
python 3 -B research/fees-readonly-order-recovery/test_verify.py
python 3 -B research/fees-readonly-order-recovery/verify.py --materialize /absolute/new/source
```

The verifier authenticates the parent and source transformation, rederives all 586 function bindings using actual object ownership, checks all 4587 direct-call targets, checks the linker selectors against the emitted map, compares the full readonly section and all 379 data targets, and verifies both build receipts and saved runtime cases. The materializer recovers 46 source files plus the recorded linker script and wrapper. The original build controllers retain their local mounted paths; adapt those paths for another host while preserving their pinned inputs and flags.

The snapshot of all earlier unfinished source and experiments remains in [the work checkpoint](https://github.com/lalalune/pumpfun-source/pull/251). The parent of this accepted data-order change is [the Sharing recovery](../fees-sharing-handler-recovery/README.md).
