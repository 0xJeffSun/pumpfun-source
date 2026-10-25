# Metaplex Utilize positive-guard source experiment

This is **one unbuilt, unaccepted source hypothesis**, over the rejected candidate12 experiment. It retains all18 patched public-source files on upstream `17e99434af5ead3e989c08f32af33609821d0bc0`; only Utilize changes, and the other17 patched files are byte-identical. Accepted candidate11 and the prior candidate12 package remain unchanged.

[The complete candidate12 review](../metaplex-candidate-build-12-review/REPORT.md) measured196,601 raw payload differences instead of candidate11's1,509. Read-only address correspondence reduces the executable explanation to one reversed conditional plus an extra unconditional jump; mapped correspondence is not raw identity. The target checks remaining>=requested and branches positively to a dominated subtraction. This experiment preserves the earlier zero/total guard and replaces only candidate12's `checked_sub(...).ok_or(NotEnoughUses)?` with the reviewed positive `if` and dominated subtraction in `positive-guard.fragment.rs`. It does not predict that the compiler will eliminate the extra jump or produce exact bytes.

For every unsigned64-bit requested/remaining/total triple, the prior checked subtraction and proposed explicit guard have the same local failure domain and successful result. Subtraction cannot underflow after remaining>=requested; the initial zero/over-total rejection, metadata assignment and later effects retain their order. [The reviewed proof](../metaplex-candidate-build-12-review/REPORT.md#single-candidate13-source-hypothesis-reviewed) also checks the error conversion. `guard-equivalence.smt2` and `guard-equivalence.json` retain the Z3 UNSAT query/result. This local arithmetic proof does not establish full instruction semantics, target reachability, runtime coverage or generated-byte identity.

`baseline-source.tar.gz` contains the18 changed files from the pinned public upstream Git objects. `proposed-source.tar.gz` contains their proposed bytes. Both archives are deterministic, with every file hash bound by `source-inputs.json`. `verify.py` regenerates the full unified patch from these bytes, checks the one-file delta against both11 and12 manifests, and checks all local/external/proof hashes without invoking a compiler, VM, network or archive extraction.

Explicit workflow input: `token_metadata_utilize_positive_guard_recovered`, or:

```sh
python3 scripts/pump_build_token_dependency.py --dependency token_metadata \
  --metaplex-utilize-positive-guard-recovery --source <fresh-upstream-checkout> \
  --output <fresh-output-directory>
```

The flag is mutually exclusive with earlier recovery flags and valid only for Metaplex. This uses the same pinned Linux/amd64 image, public upstream commit, source-only build command and lock as candidate11/12. Host Rust1.69.0 and selected SBF platform-tools v1.37 / Rust1.68.0-dev remain separate phases. No compiler/profile/dependency/metadata/whitespace-padding/path flags are added. The captured ELF is read only after source compilation finishes for honest comparison; it is never mounted into the source build. No build, VM transaction, deployment or acceptance claim is made by this package. Only the measured full-payload comparison of the pinned experiment can decide whether to continue this hypothesis.

## Measured result: rejected, no improvement

The [single pinned build40190519595](https://github.com/lalalune/pumpfun-source/actions/runs/40190519595) compiled this source successfully. Its complete raw output is byte-for-byte identical to rejected candidate12, still differing from target at196,601 padded payload positions. The [portable result review](../metaplex-candidate-build-13-review/REPORT.md) binds the exact dispatched source, compiler, image and output and recomputes the full body/call/relocation/data analysis. The explicit positive `if` canonicalized to the same extra-jump layout. Candidate11 remains the accepted earlier comparison. The proposal text above records the pre-build hypothesis; this measured result supersedes its unbuilt status.
