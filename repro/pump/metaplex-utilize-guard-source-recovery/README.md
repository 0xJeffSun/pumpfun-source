# Metaplex Utilize guard source hypothesis

This experiment retains candidate11's eighteen-file patch on upstream `17e99434af5ead3e989c08f32af33609821d0bc0`, changing only its Utilize count guard. It removes the redundant `number_of_uses > metadata_uses.remaining` disjunct and leaves the existing immediately following `checked_sub(number_of_uses).ok_or(NotEnoughUses)` to enforce that bound. Zero-use and total-use rejection, signer/account validation, subsequent state mutation and operation order stay in place. It adds no whitespace padding, custom metadata, linker/relocation rewrite or captured executable input to the build.

The target-derived question comes from the retained 5,104-byte Utilize body and one branch-polarity/block-placement difference in the independently decoded target. The source change is a hypothesis until the pinned source build and full byte comparison finish. It must not be called a 1,479-byte fix merely because a simplified CFG predicts it. Existing candidate11's 1,509 differing positions, including30 diagnostic bytes, remain the accepted comparison until measured otherwise.

`source-inputs.json` binds all18 changed public-source files to both the pristine upstream hashes and proposed hashes. Seventeen proposed files equal candidate11; only `processor/uses/utilize.rs` changes. `source.patch` is the complete public-baseline patch; the before/proposed Utilize files make the one-file delta reviewable. `verify.py` checks these sources and the prior candidate's manifest without executing any program.

Use workflow input `token_metadata_utilize_guard_recovered` or:

```sh
python3 scripts/pump_build_token_dependency.py --dependency token_metadata \
  --metaplex-utilize-guard-recovery --source <fresh-upstream-checkout> \
  --output <fresh-output-directory>
```

The build uses the same pinned Linux/amd64 image and command as candidate11. The host Rust toolchain is1.69.0; the actual SBF compiler in the retained recipe is platform-tools v1.37 / Rust1.68.0-dev. These are separate phases. No new runtime acceptance is claimed by this source package. Full original identity remains false until an actual rebuilt payload matches every byte.

## Measured result: rejected

The [pinned hosted build](https://github.com/lalalune/pumpfun-source/actions/runs/40188763483) compiled successfully, then failed the final full-byte comparison. Candidate12 has196,601 differing positions versus candidate11's1,509 and must not replace candidate11. The [portable independent review](../metaplex-candidate-build-12-review/REPORT.md) binds the source, toolchain, build log and complete artifact. It traces the discrepancy to a complementary branch plus one extra8-byte jump and the resulting address propagation, while the30 diagnostic-coordinate differences persist. This mapping explains the mismatch; it is not raw identity. A separately reviewed positive-guard source fragment is only a future experiment, with no build or acceptance claimed.
