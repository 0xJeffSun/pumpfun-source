# Portable verification

The final package is tested from a separate copy with Python's standard library. No original/candidate binary is executed or modified. Verification checks integrity and static composition, not Rust type correctness, execution behavior or original identity.

Checks: positive standalone verification; copied proposed-source text change with manifest re-sealed rejected; copied named-account binding change with manifest/origin re-sealed rejected; unexpected public file rejected. Final positive-copy result and command status are retained in `verification.json`.

The manifest is an integrity seal, not a signature. Authenticity still depends on retaining its externally reviewed digest. Negative checks target specific source/binding invariants; they do not prove resistance to an adversary rewriting both the verifier and every seal.
