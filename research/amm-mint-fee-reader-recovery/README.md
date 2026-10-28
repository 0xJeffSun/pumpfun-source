# AMM mint transfer-fee reader

Recover the complete 1,312-byte original `from_mint` body at `0x74128` under the unchanged CALL/relocation normalization. The source reads Clock after every successful Token-2022 decode, including an absent fee extension; legacy token owners return before borrowing or reading Clock. Malformed decoding still produces `UnsupportedQuoteMint` at `transfer_fee.rs:32`.

Review `source.patch` and `proposed/transfer_fee.rs`. One compiled source file changes. The decoder retains its existing algorithm behind an explicit non-inlined boundary. A safe constant `Ok(None)` supplies the original early-return stores in the pinned compiler. This reconstructs the observed instructions; historical Rust syntax and portable enum-padding behavior are not established. Existing error locations, including the inverse-fee error at line 67, remain fixed.

The 52-input parent composes merged [#383](https://github.com/lalalune/pumpfun-source/pull/383) (including #374/#379/#319) with [#381](https://github.com/lalalune/pumpfun-source/pull/381)'s deposit and public-module context (crediting #314). Both public source archives, their exact composition and all compiled inputs are retained. Upstream was refreshed to `842a263682d883d39fd033b4b401faf54c7a7b51`; no other contributor's recovery is counted as this PR's new gain.

- **730 → 731 / 785 injective normalized windows**, all prior matches and **148 raw-local matches** retained.
- Full recovered body, eight typed data references and **9/10 direct calls** checked. The decoder remains unmatched: original 664 bytes versus candidate 456 bytes. The inverse-fee helper also remains open. Whole original ELF/capture equality is false.
- Two genuine offline Linux v1.44 builds reproduce complete stripped and symbols artifacts; all 52 source inputs and 257 locked registry archives are checked. Three source ablations lose the match: runtime None construction, decoder inlining, or late Clock reading.
- The exact candidate passes all **25 AMM suites / 17,462 cases**, with **35,074 observed signed sends / 35,418 verified signature fields**. These suite oracles compare their documented functional fields, not complete raw logs or compute usage.
- **96 additional fresh-VM triples / 288 signed sends** compare all non-executable message-account state and transaction metadata after excluding only compute measurements/log lines. Cases include absent extensions, TLV boundaries, duplicate configurations and epoch transitions: 64 successes, 12 actual helper rejections, and 20 earlier account-validation controls. Rejected transactions preserve program state; payer fees remain. These corpora overlap.

Raw receipts, signed inputs, source/harness snapshots, compiler logs, rejected builds and typed-reference corruption controls are included. No Clock-syscall failure was injected. Existing unrelated admin-incentives backend frame diagnostics remain in the build logs. Maintained checkpoints are unchanged.

Verify with Python 3.11+ and `solders==0.27.1`:

```sh
python -I -B research/amm-mint-fee-reader-recovery/verify.py
python -I -B research/amm-mint-fee-reader-recovery/mutation_controls.py
```

Rebuild without downloading dependencies, using existing authenticated Linux v1.44 SDK/Cargo inputs and the recorded host strip tool:

```sh
python -I -B research/amm-mint-fee-reader-recovery/rebuild.py \
  --sdk /path/to/sdk --cargo-home /path/to/cargo-home \
  --target-dir /path/to/build-cache --strip-tool /path/to/llvm-objcopy \
  --output /path/to/new-output
```

The build uses the pinned Docker image, normal release profile, read-only source/SDK mounts, `--locked --offline`, no network and no original executable input. It checks actual root compilation, unchanged sources and both complete output hashes. `--variant parent` rebuilds the composed control. Saved runtime replays require the repository harness paths recorded in `harness-inputs.tar.gz`; `replay.py` runs the unchanged full corpus against an explicit candidate.
