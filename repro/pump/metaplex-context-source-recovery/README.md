# Metaplex account-context and seed-vector source trial

This patch extends the ten-file Uses trial with two source corrections inferred from the captured instructions. Metadata creation checks the supplied system-program identity before account allocation and returns error 126 for the wrong identity. The burn handler moves its edition seed vector into concatenation instead of cloning it; the original copies the three vector fields and preserves conditional-drop state, whereas candidate 6 calls the vector clone helper.

Eight normally signed offline creation comparisons test the system-program account. Five controls agree. Three validly signed cases with a wrong system-program position and the real system program in the remaining accounts return 126 in the original but succeed in candidate 6. Keeping the real program available lets the earlier creation-fee CPI complete; omitting it yields MissingAccount before the target check in both executables. Full watched state, errors, inner instructions, signatures and failure rollback are retained. This is a reconstruction mismatch, not a claim of a vulnerability in the deployed capture.

Static evidence records the original comparison at file offsets 323128–323216 and the seed-vector ownership difference near 85256. Branch/address masking is read-only analysis; no executable is rewritten. Both changes are ordinary Rust source. All ten baseline and patched files are hash-bound; exact historical source spelling and full binary identity remain unproved. Compilation and post-patch runtime checks are pending.

The original probe preserves its historical work-directory root. Use the portable runner after compilation, plus the preceding Uses and edition regression runners.

The retained burn regression uses a test-owned NFT and its canonical edition PDA. All 21 owner-signed boundary comparisons (42 transactions) pass on candidate 6, including four successes; nonce, supply, edition key/length and amount variants retain rollback evidence. This establishes a bounded behavioral baseline for the ownership-only source change, not full burn coverage.
