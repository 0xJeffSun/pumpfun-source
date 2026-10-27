# Bounded historical AMM research archive

This archive preserves completed deposit/withdraw shape and logical-module
trials, workspace materialization experiments, and portable source-gate
prototypes. These are historical research artifacts, not the selected
reconstruction or a replacement for its sealed proof. The separately published
structural-tlv-recovery-20261027 checkpoint is authoritative for 5c1e.

Completed negative trials are explicitly retained: deposit early-capture
553b5253 and withdraw discarded-narrowing cb21f6c1. Neither is proposed for
selection. The preferred private trials are deposit 2f8a5c65, withdraw
8653ee22 and predicate 285e71bc. Their source, patches, complete successful
build records, stripped/unstripped ELF files, diagnostics and signed receipts
are retained. No stopped build attempt or target/dependency build cache is
included. A bounded 169-file copied dependency fixture and eight authentic
crate proof archives are retained solely to make the prototype tests auditable.

The workspace prototype's 5c250b4a build and the source-gate prototype's 5c1e
inputs are under support/. They support the saved verification claims; their
presence does not select them. Root's sealed 5c1e proof owns runtime acceptance.
Historical scripts may contain their original local paths, preserved verbatim.
Use the archive-level verify_archive.py for portable inventory, local input,
ELF and signed receipt verification. Python plus solders is required. Saved
runtime summaries are observations, not a new replay performed by this verifier.

manifest.json lists every retained file and its original relative path, length
and SHA256. Archive metadata is deterministic (sorted names, timestamps and
ownership zeroed, regular-file mode0644, gzip mtime0). Original work directories
were read without changes. Root publication decides where to store this archive.
