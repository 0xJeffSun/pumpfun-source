# Pubkey source-coordinate attribution

Cached public `solana-pubkey` **2.2.1** matches both source coordinates retained
in the captured original Fees ELF: **131:18** for the `PubkeyError::from` panic
and **612:32** for the `find_program_address` panic. The current candidate's
pinned 2.4.0 source places those same tokens at **134:18** and **802:32**.
Four corresponding source blocks are text-identical between the two archives.
The previously matched complete 464-byte create helper and 312-byte find helper
remain bound to the original and candidate bytes.

This is evidence for a **source candidate or family**, not a unique historical
version or build recipe. Only the two already cached releases were examined.
Other crate regions differ; features, the complete dependency graph, compiler,
OS and flags remain unresolved. Whole-program byte equality remains false. This
publication adds no implementation, runtime receipt, build or version change.

`research-evidence.tar.gz` preserves all **32 original sealed research files**
and their unchanged manifest, SHA-256
`f52fac5cf1e2ded943c3e56d97743d4e66c584c499b7001ab1e5d9c3846703ee`.
It includes the report, source/coordinate analysis, raw helper and location
records, prior closure evidence, both cached public crate archives, their exact
source copies and registry/VCS metadata. Archive hashes equal the retained
crates.io index checksums. Historical local paths remain in the archived records
as provenance; the public verifier does not read those paths or execute the old
research scripts. It reads the archive in memory without extracting files.

From a repository checkout:

```sh
python3 repro/pump_fees/pubkey-source-coordinate-attribution/verify.py
```

For a copied package outside the repository:

```sh
python3 /path/to/package/verify.py --repo /path/to/pumpfun-source
```

Alternatively supply both `--original /path/to/original.so` and
`--candidate /path/to/candidate.so`. The large reference ELFs are not duplicated;
their exact paths, byte lengths and hashes are bound in `provenance.json`.
All source evidence needed by the verifier is packaged, and no `work/` directory,
Cargo cache, installed Rust toolchain, network connection or third-party Python
package is required. Verification checks the original seal, crate/source hashes,
exact line/column pairs, four identical source blocks, raw ELF windows and records,
and the two complete normalized helper comparisons. Normalization changes only
temporary in-memory copies; no executable is written or executed.
