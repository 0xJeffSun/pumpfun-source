# Controlled source-path remap on the latest Pump PR #5 ELF

This experiment uses the exact Pump PR #5 source at `6ed6bf75871e6c337f870f4ea557e1d96ff46e23`. A clean Agave 2.1.21 SBF platform-tools v1.44 build held all **37** compiler-input source hashes, **53** SDK file hashes and the rustc hash fixed. A scoped `RUSTC_WRAPPER` added `--remap-path-prefix=src=programs/pump/src` only while compiling `pump_recovered`. The wrapper and declared invocation are saved; the build helper did not independently record that environment variable. The [analysis](analysis.json) and [source-checkout verifier](verify.py) pin the candidate and decode only relocation-backed source-location records.

| Measure | Unremapped PR #5 | Path-remapped | Captured Pump |
| --- | ---: | ---: | ---: |
| ELF extent | 1,679,528 | **1,679,928** | 1,934,800 |
| `.text` bytes | 1,553,808 | **1,553,808** | 1,792,208 |
| `.rodata` bytes | 29,415 | **29,815** | 32,031 |
| Relocation gap to target | -859 | **-859** | 0 |

The remapped ELF SHA-256 is `9b22da6b56b1661fa86306b8f4e96b472ac6466c298881d01dd162faa1728ff6`; the unremapped ELF is `c7292be9c92690f0b4f19603411c7e7f76e0c2a3dbc4a0239141cb2f7e30b786`. Both differ from the captured Pump ProgramData at byte 24. The remapped ELF is still **254,872 bytes shorter** than the deployed ELF, including a **238,400-byte `.text` gap**.

The unremapped ELF has 127 records with source-manifest-compatible `src/*.rs` names. Comparison with the remapped build separates **91 Pump-attributed records** from **36 generic `src/lib.rs` records** that remain unchanged and may belong to dependencies. All 91 Pump-attributed paths gain the target's prefix, stored length and no-trailing-NUL policy. Yet just **one** path/line/column triple overlaps the target's 54 records (`quote_control/state.rs:16:1`). This is a measured source-layout gap, not a proof that the other handlers behave incorrectly. The remap does not change `.text` size or relocation count, and it does not establish the historical build flags.

The [full source-bound verifier](verify.py) passes in this PR #5 checkout; it compares the source manifest, captured original ELF, wrapper, build report and relocation-backed records. The [snapshot verifier](snapshot_verify.py) separately checks the retained file hashes and measured claims without executing a program. The remapped ELF, build attempt/comparison/log, wrapper, invocation and analysis are retained here. Run both with:

```sh
python3 repro/pump/pr5-517-path-remap/verify.py
python3 repro/pump/pr5-517-path-remap/snapshot_verify.py
```

No public transaction, deployment or real funds were used.
