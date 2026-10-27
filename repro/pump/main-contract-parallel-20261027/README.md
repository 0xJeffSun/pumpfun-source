# Main Pump parallel recovery checkpoint

This checkpoint advances only the captured main Pump contract. It does **not** establish complete source reconstruction or whole-ELF identity.

The integrated Rust source fixes account ownership/lifetimes and validation ordering, historical migration serialization, creator-fee gating, Token-2022 transfer-fee handling and unknown-extension parsing, completion accounting, and shared incentive-worker structure. The remaining reconstruction-only admission guards have been removed by implementing the observed paths. It also selects the older Solana dependency family supported by additional matching runtime functions.

Validation against the immutable captured main program passed:

- 44 existing suites / **10,468 cases**.
- 32 focused suites / **2,657 additional executions**. These corpora overlap; they are not 13,125 unique input states.
- **13,121 paired log cases** with matching panic text, Anchor error code/message, error-origin kind/account and Left/Right values. Four other legacy cases have empty pre-execution logs.
- Clean builds reproduce stripped and unstripped ELFs. The actual canonical build is recorded separately.

The loader profile uses the captured upgradeable main program's 36-byte executable account and 10 MiB ProgramData allocation, including its real header. Candidate ELF bytes remain unchanged; unused account capacity is zero-filled. This corrects the prior raw-loader account-size asymmetry. Ordinary, first-completion and dual-completion controls match at 200k and 600k compute limits under this profile. Other programs retain existing fixture setup; this is not live-chain acceptance.

Current strict instruction-window inventory is **568 / 1,035 normalized matches**, including **111 raw matches**. Normalization masks only internal direct-call targets and pointers into known ELF sections. The matched windows cover 447,056 of 1,792,208 original text bytes (about 24.9%). A separate 132-window subset has closed matching direct calls and no unresolved data references. These measures must not be interpreted as whole-program equivalence.

The shared claim worker still has 48 excess bytes, and many business bodies, parser layouts, data references, indirect calls, source coordinates and historical build details remain unresolved. The goal remains active.

The target is the captured 2026-10-24 deployment with payload SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`; no current-chain identity is claimed. Candidate SHA256 is `fc136a1cedff132ab147fb5f20234bde504036875d9da107cfecf30b962161b2`.

Run the checkpoint verifier from this repository using a Python environment with `solders`:

```sh
work/test-env/bin/python repro/pump/main-contract-parallel-20261027/verify.py
```

It checks archived file hashes, source/build bindings, recorded case/log coverage, available transaction signatures, actual normalized/raw window bytes and the closed direct-call subset. The original oracle is read from `evidence/original/pump/deployed.so`. Verification of recorded receipts is separate from re-executing the cases.

To build and run the portable main-only corpus:

```sh
python3 scripts/pump_build_verified.py --output work/main-rebuild
work/test-env/bin/python scripts/pump_validate_parallel.py \
  --candidate work/main-rebuild/candidate.so \
  --source-directory programs/pump \
  --build-comparison work/main-rebuild/build-comparison.json \
  --captured-loader --workers 3 --output work/main-rebuild/full.json.gz
```

The installed v1.44 SDK and locked dependency cache are required. This checkpoint is not a hermetic toolchain bundle. Earlier per-suite source inventories are historical metadata; the build records and archived `source/` provide the actual compilation binding.
