# SweepFees address-selection control on qualified436

Naming the Rent value and data length, then reusing three typed AccountInfo references for the trader, quote ATA and token program, produces a complete 8,400-byte SweepFees candidate. The original has the same size. All 189 CFG blocks map bijectively; the entire opcode and register sequence agrees. All 51 immediate callee shapes and 13 Source values agree. **1,047 of 1,050 normalized eight-byte words match; this is not a complete normalized or raw body match.**

The remaining differences are three address operands. At byte offsets 776 and 808, the original chooses 176 or 232, while the candidate chooses 520 or 576. At byte offset 1176 the original load adds 344; the candidate load adds zero. These instruction sequences calculate the same selected field address, but they are not byte-identical. The strict original matcher remains unchanged and does not admit this body.

The full candidate preserves 436 normalized windows, 141 raw-local bodies, 429 direct-call-closed windows, 4,473 positive immediate edges and 486 Source observations. Two root compilations using isolated reused dependency caches agree. The exact 67-file source, delta against qualified436, compiler/linker records and complete images are retained. Tests cover source, filesystem, allocated images, CFG recomputation and repeat-build bindings.

There is no fresh runtime qualification for this candidate, no general semantic proof and no whole-ELF identity. Qualified436 runtime receipts are not transferred. No assembly, binary patch, dummy operation or matcher relaxation is used.

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current436-sweep-address-selection-20261028/verify.py
```
