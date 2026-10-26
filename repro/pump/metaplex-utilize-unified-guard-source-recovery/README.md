# Candidate14: unified guard with dominated subtraction

This is one unbuilt, unaccepted compiler experiment over accepted candidate11. It retains candidate11's complete ordered guard (`n == 0`, `n > total`, `n > remaining`) and replaces only the subsequent `checked_sub(n).ok_or(NotEnoughUses)?` with `remaining - n`. The other 17 patched public upstream files are identical to candidate11. Accepted artifacts and the default build remain unchanged.

Public upstream source is fixed at [17e99434af5ead3e989c08f32af33609821d0bc0](https://github.com/metaplex-foundation/mpl-token-metadata/tree/17e99434af5ead3e989c08f32af33609821d0bc0). `source-inputs.json` hashes all 18 original and proposed files. The deterministic archives contain those files; `source.patch` is the complete public-upstream patch. `utilize.before.rs` hashes to `9ce4753676e73e6565b957d86eecf113ce16cade3f782d849e2f7a97b640bed7`; the reviewed proposal hashes to `2f403b698750ab295ffd88d71eb75cb594dd27eff67edcc7a260688e33f67ca3`.

The exact source replacement preserves behavior for every u64 input: guard success implies `1 <= n <= remaining`, so subtraction cannot underflow and the removed `checked_sub` error is unreachable. The delegated record's separate checked subtraction remains unchanged. The proof packet retains the independent review, full source, single-change patch, hash manifest, and original target guard/cleanup/subtraction instruction anchors. Run `python3 proof/verify.py --repo REPO` to rehash those external bytes. The reference executable is verification evidence only and is not a compiler input.

The target's common error block and dominated subtraction motivate this one distinct hypothesis. Failed candidates12 and13 used a split initial guard and produced identical worse output; this proposal instead preserves candidate11's unified three-disjunct guard. Source equivalence and target control evidence do not promise LLVM output, historical source attribution, native layout, or byte identity. The target and accepted11 are not changed by this package.

From the repository root, verify with:

```sh
python3 repro/pump/metaplex-utilize-unified-guard-source-recovery/verify.py
```

The explicitly selected, mutually exclusive builder flag is `--metaplex-utilize-unified-guard-recovery`. The workflow choice is `token_metadata_utilize_unified_guard_recovered`. It uses the existing pinned dependency-build recipe, public upstream source, dependency versions, lockfile, build profile and SDK. No metadata, padding, source-coordinate, path, or compiler-flag variation is introduced. Host Rust and the SDK's SBF compiler remain separate inputs. Preparation does not dispatch the workflow or run a compiler or VM.

`manifest.json` covers every package file, including the nested proof manifest. `external-inputs.json` pins the accepted11 map and retained accepted source archive. The verifier checks the complete patch, all 18 archived source files, the single delta against accepted11, guard order and the saved target evidence using only Python's standard library. `readiness-validation.json` records source-only patch application and wiring checks; these are not a candidate build.
