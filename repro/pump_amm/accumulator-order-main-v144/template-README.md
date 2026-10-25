# Portable main-acceptance package template

Prepared independently; this directory is an unpopulated template, not a successful main acceptance claim. The tested package remains immutable at `repro/pump_amm/accumulator-order-v144`, manifest `51dc9359eb90ce9109860d5814402d387b35a513502db3305e68db2ec2a092b8`.

After a successful root-owned main build, populate a new destination from its records:

```
python -B populate.py --main-run /path/to/repo/work/amm-accumulator-order-main \
  --repo /path/to/repo --output /path/to/new/main-package \
  --runner-exit /path/to/observed-runner-exit.json
python -B /path/to/new/main-package/verify.py --current-main /path/to/repo
```

`populate.py` only copies successful records and measures current source/helpers/tools/SDK files. It never builds, executes a transaction or edits repository source. Required `--runner-exit FILE` preserves the separately captured outer runner exit and must report zero; exact build and dependency subprocess exit files are also mandatory.

The populated package contains the complete 22-file source plus README snapshot, main executable and symbols, exact build recipe, command/log/identity/exit records, dependency before/after witnesses, all unchanged helper files, and packaging-time tool/SDK observations. `reference/` holds tested binaries and selected proof files bound to the entire frozen tested manifest. The portable verifier compares the main ELF and symbol files byte for byte against these tested files, checks all source and README hashes and build manifests, verifies the zero subprocess exits, unchanged tool/helper/dependency records and absence of backend errors. `--current-main` additionally checks the live repository's 22 inputs and README; it does not need the original build directory, cargo cache or machine-specific tool paths.

The verifier is standard-library Python and does not execute a build or transaction. No fresh runtime is needed after full executable and symbol equality: the package references the immutable tested package's 17,462 successful comparisons and 35,418 saved signature checks. The small template copies only those tested summary proofs rather than duplicating the full transaction corpus. Independent full signature replay remains available in the tested package's verifier.

Before-build tool/SDK checking is supported by the exact executed frozen promotion script and its successful completion records. Packaging-time observations independently recheck those identities later; they do not invent a per-process compiler trace. This package cannot establish original historical provenance, complete semantics, whole-original equality or new runtime coverage. `status-proposal.json` is an unapplied metadata proposal; root must decide publication and central updates.
