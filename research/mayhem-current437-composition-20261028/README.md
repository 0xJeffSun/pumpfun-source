# Mayhem qualified437 composition

This ordinary Rust source recovers the complete **8,400-byte SweepFees body O0076**. It passes the existing GlobalParams account into the sweep helper explicitly, preserving the original two-stage field-address calculation. Named Rent locals and reused AccountInfo references preserve the observed storage lifetimes. Only `src/instructions/fee_recipients.rs` changes from the [qualified436 parent](../mayhem-current436-composition-20261027/README.md).

The unchanged matcher finds **437/441 normalized windows (99.09%)**: **141 raw-local**, **296 normalized-only**, and **four unmatched**. Matched text is **642,952/706,744 bytes (90.97%)**; **63,792 bytes (9.03%)** remain unmatched. Ordered recursive direct-call closure covers **431 windows**, with **4,525 supported immediate edges and 499 matching Source observations**. All parent matches, raw bodies, edges and Source profiles survive. SweepFees has all 1,050 normalized eight-byte words, all 51 ordered direct calls and all 13 Source observations equal to the original. It is not raw byte-equal.

Three root compilations agree on the complete candidate and symbol images. They use isolated reused dependency caches, the same compiler/linker recipe and unchanged linked dependency bytes; they are not fresh dependency builds or proof of the historical toolchain. No assembly, patched binary, synthetic source operation or matcher change is used. The exact 67-file source, parent delta, build records and full images are preserved.

| Fresh local qualification | Cases | Signed transaction records |
| --- | ---: | ---: |
| Trade pairs | 6,636 | 13,272 |
| Initializer pairs, including setup | 69 | 168 |
| Sweep three-way cases | 692 | 2,076 |
| Rate three-way cases | 150 | 450 |
| Targeted rate three-way cases | 856 | 2,568 |

All compared non-executable account state, return data, inner calls, event bytes and non-compute logs agree in their stated scopes. The verifier decodes and checks actual signatures and loaded program hashes. These suites overlap; their **18,534 signed records are not unique scenarios or exhaustive behavioral proof**. Old436 runtime receipts are not relabeled.

**Whole-ELF identity remains false.** AMM Buy, AMM Sell, BuyV2 and SellV2 remain unmatched. Full data, indirect-call, relocation/layout and historical source/toolchain obligations remain open. Earlier data proofs remain bound to their own artifacts unless separately recomputed.

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-composition-20261028/verify.py
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-composition-20261028/test_verify.py
PYTHONDONTWRITEBYTECODE=1 python3 -B research/mayhem-current437-composition-20261028/test_runtime.py
```

Default verification checks static and runtime evidence. Use `--static-only` for the static subset. Verification never compiles or executes an ELF. Compiler invocations retain their original local paths as provenance; reproducing a build requires the matching external SDK and dependency cache.
