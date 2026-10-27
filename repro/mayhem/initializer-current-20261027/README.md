# Current Mayhem initializer checkpoint

This independent checkpoint builds the current 14-file Mayhem source, including `initialize_mayhem_state`, with the existing official native v1.54 direct-Cargo recipe. It does not alter or relabel the prior selected `compiler-v154-main` packet, and it does not promote the separate 428-window research artifact.

The first and second root-crate builds produced identical candidate and unstripped bytes. `build.json` and `repeat-build.json` retain the actual commands, environment, compiler identity, source inventory, output hashes and times. Their broad pre-build inventory also captured seven pre-existing generated Rust files under the copied source's `target` directory; these are preserved under `recorded-generated-inputs/` and excluded from the exact 14-file application source inventory. The active compiler output directory was the separate private `CARGO_TARGET_DIR` recorded in both logs. This is repeatability evidence using a primed cache, not a hermetic dependency rebuild or a unique historical compiler claim.

Fresh execution against this candidate passed all 21 existing baseline suites: 9,592 cases/sequences, or 9,595 instruction comparisons because the three burn sequences each execute twice. All 15 unchanged independent saved-receipt checkers passed. The sidecars retain 19,190 signed baseline transactions; the verifier cryptographically checks all signatures and pairs identical original/candidate messages, including administrative transactions that older packets did not retain.

The initializer was exercised through the genuine original Pump program on both sides. Pump's real `invoke_signed` supplies its mint-authority PDA; no fabricated PDA signature is used. The 16 cases include 9 successful Mayhem-mode creates and cover initialization, malformed/invalid paths and ordinary-create routing. Complete per-transaction account snapshots and all returned fields agree after only exact compute-consumption-line and source-coordinate normalization. The inherited unused `creator` case is explicitly excluded. These 62 transactions carry 94 verified signatures. Initializer program binding is recorded by the sealed producer and its candidate/original hash fields; unlike the baseline sidecars, initializer sidecars do not independently record each VM loader call.

The combined receipt set contains 19,252 transactions and 38,286 signatures. Baseline diagnostic policy remains explicit: trade normalized-log differences are retained in `diagnostic-differences.json`; the burn difference is only second-burn source coordinates after compute lines. No full raw-log equality claim is made. No new runtime is executed by the verifier.

Run from the repository root (replace SEAL with this packet's manifest SHA-256):

```sh
python -B repro/mayhem/initializer-current-20261027/verify.py --current-source . --expected-seal SEAL
```

`--current-source` hashes the complete current application source inventory and rejects both changed and added source inputs. It also checks the original Mayhem artifact hash. `verify.py` seals all packet files, verifies both build records and all transaction signatures, recomputes each baseline comparator's semantic fields, and rechecks every initializer result and transaction snapshot. The 15 independent checker outputs and the unchanged producers are preserved. The packet proves a current-source build and this bounded runtime corpus; full deployed ELF equality and full historical source recovery remain false.
