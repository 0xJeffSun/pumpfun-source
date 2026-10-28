# AMM Buy partial on the 437-window parent

Moving the existing `sol_amount` field later in the AMM Buy event initializer extends this partial's exact normalized prefix to **7,200 bytes** of the 9,736-byte original body. The earlier native-event control's exact prefix was 7,176 bytes (its published conservative boundary was 7,144). Two actual root builds agree byte for byte.

The candidate retains **437/441 normalized windows, 141 raw-local windows, 431 recursively direct/code-reference-closed windows, 4,525 positive immediate calls and 499 Source observations**. It adds no complete function match. AMM Buy still differs after byte 7,200; whole-ELF identity is not established.

This is ordinary Rust field evaluation order. The parent and candidate each contain 67 source files; only `src/instructions/buy_pump_swap.rs` changes. The same 25 field expressions remain in the initializer, with `sol_amount` moved immediately after `global_quote_deployed`. The compiler recipe and ordered linker are unchanged. Original target bytes are comparison inputs only. No assembly, binary patch, dummy operation or extra normalization rule is used.

Candidate SHA-256: `064dda9b45a9b6a758e30e6bf4b9c78ab555829f79b5ff90ec282f77ac8b6f64`.
Symbols SHA-256: `03f218e02bfaf2c81622430d30edbce534616e170b4941f6fd90dc6bfee6b94f`.

Fresh offline VM evidence covers 36 AMM native/token pairs, 72 signed transaction records and 144 verified signature fields, including seven successful original cases. All compared states, complete event/CPI data, rollback, executable program hashes and non-compute logs agree. This finite matrix belongs only to this candidate. It does not inherit the broader 437 selection's runtime tests.

`search-a/` preserves the producer ledger and logs for 30 additional ordinary-Rust field-order controls; none improved this partial. The other controls' executable images remain in private work storage and are not claims verified by this packet. They add no coverage or completion count.

Run `python -B verify.py --repo /absolute/repository/path` and `python -B test_verify.py` using a Python environment with `solders`. The offline verifier authenticates exact directory membership and external readers, reconstructs the source delta, checks allocated image pairing, recomputes full-window preservation and closure, verifies the exact prefix and its first mismatch, and rechecks all signed runtime evidence. It does not compile or execute a target. Negative tests corrupt an actual prefix register, signature bytes and source patch, and check portable replay plus unlisted files, symlinks and FIFOs.
