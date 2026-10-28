# SweepFees Rent lifetime control on qualified436

The source binds `Rent::get()?` and the recipient data length to named locals before calculating the exempt balance. This is ordinary Rust with the same rent query and subtraction. It improves the outer-native control from seven opcode-differing CFG blocks to one. O0076 is **8,392 bytes versus 8,400 original bytes**. All **189 mapped CFG blocks**, **51 ordered direct callee shapes** and **13 Source values** agree at their stated comparison scope. Register, stack, address-selection and whole-body differences remain; no new function match is claimed.

The complete candidate preserves **436 normalized windows, 141 raw-local bodies, 429 direct-call-closed windows, 4,473 positive immediate edges and 486 Source observations**. Two root compilations using isolated reused dependency caches agree. The exact 67-file source, delta against qualified436, compiler/linker records, full images and CFG diagnostic are retained. The verifier recomputes the window and CFG comparisons and checks all regular-file hashes; corruption tests reject unexpected files, links, special files, image divergence and source-delta mutation.

There is **no fresh runtime qualification** for this exact candidate. Qualified436 runtime receipts are not transferred to it. This control does not prove full semantic, data, relocation, historical compiler or whole-ELF identity. No patched bytes, assembly substitution, dummy source operations or matcher relaxation are used.

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current436-sweep-rent-lifetime-20261028/verify.py
```
