# FeeConfig serialization source trial

Replacing explicit `ProgramError` mappings in `FeeConfig::try_serialize` with direct `?` conversion reproduces the captured exit serializer. This is a source-only scratch build; main source and earlier packages are unchanged.

The candidate ELF is **769,000 bytes**, SHA-256 `a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa`. Captured original remains **948,944 bytes**, SHA-256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`. Full byte equality is false.

| Body | Candidate → original entry | Bytes | Direct-call evidence |
|---|---|---:|---|
| FeeConfig exit | 23280 → 24192 | 992 | All 14 targets supported |
| Update-admin handler | 493504 → 94072 | 2824 | All 9 targets supported |
| Update-admin parser | 124104 → 326272 | 5664 | All 32 targets supported |
| Update-admin dispatcher | 373808 → 634776 | 1384 | All 5 targets supported |

Every listed body matches the original's entire inferred entry-bounded instruction sequence after only address/call-immediate normalization; relocation offsets/types/symbols match. Every direct internal call is independently accounted for. The exit's sole rodata relocation points to the identical eight-byte FeeConfig discriminator. The prior unmatched 1568-byte exit is now 992 bytes, resolving the dispatcher exit target noted in the preceding checkpoint. This does not recursively equate arbitrary rodata or the full call graph, and it does not identify unique original Rust spelling.

Captured exit failures converge on original entry 709528, matching Anchor's `Error::from(std::io::Error)` implementation. The previous reconstructed discriminator mapped its error to `InvalidAccountData`; its field serializer explicitly formatted `BorshIoError`. The scratch source uses `writer.write_all(...)?; self.serialize(writer)?; Ok(())`. No output bytes, flags, source positions, or padding are manipulated. The local Anchor 0.31.1 source excerpts and file hashes, original disassembly, and exact matching evidence are retained.

Validation retains **17,440 prior comparison receipts**, plus **one repeated existing serialization-failure case** with stronger exact error-log, rollback, and signed-transaction assertions: **17,441 total receipts**. The 56 retained transfer repeats and this one failure repeat add no new unique inputs. All comparisons pass. The ten-step donation sequence also passes with 20 ordinary signed transactions. The serialization failure produces the same complete `ProgramError` log and rolls back FeeConfig data, owner, and lamports in both programs. This reaches a real serializer write failure in the local fixture; it does not separately exercise an unreachable discriminator-write failure through the normal parser.

Historical initializer messages/signatures are unchanged; only historical blockhash freshness is adapted. This is not a complete historical bank. Other receipts use ordinary test-owned signatures and synthetic local state. Full raw logs and compute units remain distinct outside explicitly compared error-log fields. No live submission occurred.

All 22 source/workspace/IDL inputs, actually used build helpers, official v1.44 tool hashes, registry package inputs, runtime dependencies, complete harness snapshots, and receipts are bound in the bundle. Build uses locked/offline dependencies. `analyze.py` reproduces static matching against the retained scratch paths; `reproduce-build.sh` extracts a fresh source workspace and requires whole-ELF identity. `reproduce-validation.sh` preserves the actual prior-suite command sequence, followed by `serialization_error.py` for the focused repeat. `handoff.json` records the one-file patch and baseline input hashes for a future controlled promotion.
