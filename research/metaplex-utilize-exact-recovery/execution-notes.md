# Execution notes

The source/build/trace commands are preserved as JSON argument arrays beside
their results, with compressed compiler logs. They contain no credentials.
Original files and prior sealed manifests were not changed.

The exact selected build was first produced by the cached experimental builder
(`builds/cached`), then by two independent empty-target builds (`builds/fresh`
and `builds/portable`). The latter verifies the entire SDK archive contents and
all extracted Cargo inputs before compilation. The same selected Rust source
also reproduced exactly with MIR/LLVM/pass tracing enabled.

## Setup failures, retained separately from compiler results

1. `/home/ahi200/pumpfun-work/20261027-metaplex/fresh-confirmation`:
   Docker exited 125 before compiler launch because the nested target mountpoint
   did not exist in the read-only source tree. `builds/failed-mount-setup` keeps
   its original command, log and result. Creating the empty mountpoint before
   mounting source read-only fixed this; `fresh-confirmation2` passed.
2. `portable-confirmation`: SDK validation passed, then the non-root host audit
   could not read the root-owned cache file `base64-0.12.3/.gitignore`.
   No compiler command ran and no candidate was emitted.
3. `portable-confirmation2`: running the driver as root reached Git's ownership
   check on the upstream clone and stopped before compilation. The final driver
   uses a command-local `safe.directory` for that explicit path; it does not
   change global Git configuration.
4. `portable-confirmation3`: all preflight checks and compilation passed.
   The exact invocation was the README command with upstream, SDK, archive and
   cargo-cache under `/home/ahi200/pumpfun-work/20261027-metaplex`, executed via
   `wsl -u root python3`; output was `portable-confirmation3` in that directory.

The first fresh dependency audit used `.cargo-checksum.json` discovery, but this
Cargo extraction has no such files. The zero count in that original receipt is
preserved honestly. The final driver enumerates all `.crate` members and compares
their bytes with extracted source files; it additionally checks the Git checkout
even though its `Cargo.toml` is below the repository root.

Only the `admission-early-cleanup` Rust hypothesis is accepted. Other source
trials and the edited-IR controls are retained as negative or diagnostic
evidence. They are not substituted into the candidate or runtime receipts.
