# Metaplex diagnostic coordinate source trial

This uncompiled proposal reconstructs source formatting from the retained target's panic location records. It is based on the reviewed positive-guard package and preserves its Rust tokens. It adds leading blank lines in nine files and spaces inside one indexing expression to reproduce observed line/column constraints. The literal historical whitespace/comments are unknown; no original-source attribution is claimed.

The proposal's baseline and patched archives contain the same 18 public-source files as the positive-guard package. Nine differ from that proposal only in whitespace. `coordinate-proposal.json` gives each line delta and its source record. The edition conversion's subtraction expression is shifted from column 10 to column 30 while the indexing expression stays at column 5. This does not change arithmetic or evaluation order.

The remaining guard experiment must first produce the target executable section before dispatching this follow-on trial. This packet does not presume that result. The build uses the same upstream commit, lockfile, pinned Linux/amd64 image and ordinary Rust compiler pipeline. It mounts only public source and the disclosed Rust source patch. Target executables are read after compilation for comparison; no target instructions or prebuilt target objects are source-build inputs.

`build.py` is a frozen copy of the existing dependency builder with a packet-relative root, an explicit `analyze` import path, dedicated flag/package spelling and accurate source-scope wording. `builder-origin.json` binds the owning helper and lists those adaptations. This avoids changing a helper whose existing hash is bound by other evidence packages.

```sh
python3 repro/pump/metaplex-diagnostic-coordinate-recovery/build.py \
  --dependency token_metadata --metaplex-diagnostic-coordinate-recovery \
  --source <fresh-pinned-upstream-checkout> --output <fresh-output-directory>
```

No compiler profile, dependency, metadata, linker, binary patch or instruction-byte override is introduced. Complete compiled-byte equality is the acceptance test. Even equality would establish a reconstructed source recipe, not uniquely recover the historical comments or formatting.
