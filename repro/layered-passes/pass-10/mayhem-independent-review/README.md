# Portable independent Mayhem review

This package reproduces the unchanged independent review using only the published scratch package and the small baseline copies retained here. It does not read the original working directories, compile code, execute an ELF, run a VM, create fixtures, or submit a transaction.

The portable run passed and exactly reproduced the recorded result and counts:

- 9,589 flat functional comparisons plus six sequential burn comparisons =9,595.
- 13,284 retained transaction byte strings independently checked, containing26,500 verified signatures.
- 19,190 is the recorded/derived signed-execution count, not a claim that every administrative signature is retained or independently checked.
- 58 flat diagnostic-difference rows and three known second-burn source-location differences remain explicit.
- The typed original/new-candidate error11/Result-unwrap/Debug path, exact two-file source delta, unchanged remaining source/helpers/runtime inputs, and saved verifier exits remain checked.

## Inputs

`original/` preserves the original independent `review.py`, `review.initial.py`, initial failure log, final log, README, result, counts and original manifest **byte-for-byte**. The original manifest SHA256 is `2eba0a5b9e0e70e6a2d1ab4094bb3001d7904676f247fbcb843c7d79e1cbb5df`. No original assertion is removed or weakened. The initial failed assumption expected a panic-form burn-location line; the actual retained difference is an AnchorError location line. Both original scripts/logs remain available.

`bindings.json` pins the manifest of `repro/mayhem/buy-result-error-twentyfour`. That publication supplies `source`, `build01`, `static`, initial source-review archive, runtime repository archive, and receipts/verification archive. `baseline/` contains exact gzip-preserved copies of only the prior burn comparison and prior residual ledger, with original and compressed hashes in `baseline/provenance.json`.

## Reproduce

From the repository root, using Python with the recorded compatible `solders` installation:

```
python3 -B repro/layered-passes/pass-10/mayhem-independent-review/verify.py --scratch repro/mayhem/buy-result-error-twentyfour --output work/mayhem-independent-recheck
```

`verify.py` checks this package's seal first. `reproduce.py` checks the entire pinned scratch seal, restores a disposable directory, and copies the unchanged reviewer into its expected relative location. The old `work/...` path names exist only inside that temporary directory. There are no symlinks back to original work directories. The script executes with the disposable directory as its current directory and checks exact equality of the resulting result/count files with the recorded originals, including the26,500 signature count.

The disposable tree is deleted on completion. Use an output directory outside the sealed publication. The saved successful portability run is under `runs/portable/`; its stdout/stderr and result/count files are retained. It did not depend on the original working-tree paths. `runtime.json` records the interpreter and solders environment used for this independent rerun.

## Scope

This is saved-evidence verification. It does not establish whole-program equivalence, exact original logs, historical source/toolchain identity, or the separately executed main promotion. The original opaque regions stay opaque. It adds no runtime case and changes no scratch or main publication. Intended destination: `repro/layered-passes/pass-10/mayhem-independent-review`.
