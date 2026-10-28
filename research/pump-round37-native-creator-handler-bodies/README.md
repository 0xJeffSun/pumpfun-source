# Native Round37 creator handler body recovery

Credits merged PR402 (head 2e57fa3ed7444b165345664874b4b6b366e11f2a) for the ordinary two-line source form: snapshot mint/curve keys, match metadata creators, emit without cloning a temporary, and return explicitly in the Some arm. Only src/set_creator.rs changes from the qualified PR433 source; all physical newlines, namespaces, generated references, root lib.rs and account constraints are held. No synthetic layout is adopted.

Two actual official Linux SDK1.44 SBPF root compilations reproduce both complete outputs. Source58 and SDK2775 fingerprints remain unchanged before/after each root; dependencies are reused warm. Deployment SHA256 e3aa42609266c7f9b9e3e16aa2bd9ded9aea374daa0a4b03adb3c9c144341493; symbols fdeaf9b0d02b5e3e56e4e3be4f2be59ad9c4e0bce1a01b1def554829de9cbb3a.

The unchanged injective/membership instruction census rises 758 to760/1035, retaining131raw and every old matched set. Exact gains:233408/6136 and239544/3552. Both actual wrapper-bound handlers have all29 same-offset immediate callee bodies equal after unchanged CALL/ELF-pointer normalization.

**Open data obligations:** original panic Source records are programs/pump/src/creator/set_creator.rs:63:31 and programs/pump/src/creator/set_metaplex_creator.rs:43:31; current records are programs/pump/src/set_creator.rs:21:313 and :22:245. The verifier requires these actual differences to remain explicit. No source-coordinate/path spoofing or placement is attempted. This is a verified instruction-body increment, not data/recursive/runtime/whole identity or historical-source provenance. Qualified prior758 remains the earlier separately sealed evidence;760 records this packet's narrower body census. No selected source/checkpoint is promoted.

ZERO fresh VM cases, no borrowed runtime receipts. Upstream402 runtime belongs to its different candidate and is not transferred. Originals remain comparison-only, never compiler/linker inputs.

Run python -B verify.py. The exact-five-regular-file preflight runs before metadata reads, authenticates all capture bytes before executing captured helpers, tests eight malformed inventories, checks two complete outputs, the original census, Source differences and four real instruction/call/callee/Source corruptions. Optimized Python rejects.
