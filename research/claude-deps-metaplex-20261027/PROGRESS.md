# deps-metaplex lane progress (2026-10-27)

Frontier at start: `repro/pump/metaplex-owned-uses-20261026` (selected by
`repro/pump/metaplex-current.json`): 1250/1251 raw-equal windows, 80 differing
allocation positions (79 `.text` in window 346 = `process_utilize`, 1 `.rel.dyn`),
candidate raw SHA-256 `0b9e2666…`, original `31f0a627…`.

## Environment (lane-local, primary checkout untouched)
- Build tree: `SP/lanes/deps-metaplex/out/build/{source,base-source,cargo}`; target `SP/lanes/deps-metaplex/target/linux`.
- Copied (read-only source) from `REPO/work/rea-metaplex-location-usage-local-20261026/source` (812 files verified
  against the owned-uses `source-manifest.json`) and the warm cargo/target of `rea-metaplex-coordinates-20261026`.
- SDK `REPO/work/metaplex-linux-sdk` and registry `REPO/work/metaplex-linux-registry` mounted read-only.
- Tool: `tools/build_variant.py` (sbf pool 6 -> podman pool 2, `--cpus=2 --memory=3g`, `--network none`,
  container `claude-deps-metaplex-*` removed after each run), `tools/compare.py`, `tools/guard.py`.
- Gotcha: copied sources keep old mtimes, so cargo silently reuses a stale `token_metadata` artifact
  (first rebuild produced `d5c2968c…`).  The tool now touches the crate sources and deletes the cached
  `token_metadata` artifacts before every build.
- Native `llvm-objcopy --strip-all` (platform-tools v1.43 / v1.54) reproduces the in-container strip
  byte-for-byte (`0b9e2666…`).

## Verified so far
- Local rebuild of the owned-uses checkpoint reproduces `0b9e2666…` exactly (run `00-baseline-owned-uses`).
- `--emit=llvm-ir,link` does not change the binary (run `01-ir-baseline`).

## Diagnosis of the 80 bytes
- Original: inline 24-byte copy of `metadata.uses` (move) then `Option<Uses>::unwrap`; guard
  `JEQ n,0 -> ERR; JUGT n,total -> ERR; JGE rem,n -> SUCC`, ERR (with the Metadata drop tail) falls through.
- owned-uses: out-of-line `<Option<Uses> as Clone>::clone` call (window 183) instead of the copy, and
  `JUGT n,rem -> ERR(next); JA SUCC` (one extra instruction).  Same length overall, so all other bytes align.
- Move + two-disjunct guard (`rea-metaplex-let-else-owned`, `d5c2968c…`) equals the original
  instruction-for-instruction except those two B2 instructions (extra JA, +8 bytes, everything after shifts).
- Mechanism (owned-uses optimized IR): zero/total guard -> ERR_A (`bb101`); the checked_sub block `bb103`
  is laid out immediately before `bb101` but targets a separate identical ERR_B (`bb109`).  ISel cannot
  invert (true target is not the next block), BPF `analyzeBranch` cannot fold conditional branches later,
  tail-merge later fuses ERR_A/ERR_B, leaving `JUGT -> next; JA SUCC`.  The original needs the third
  check's failure edge to be the *same* IR block that follows it.

## Next
- Per-pass IR (`-print-after-all`, filtered to process_utilize) to see where the blocks are created/merged.
- Source forms that keep the third check in its own block but share the first guard's error block.

## VERIFIED GAIN (06:45): whole-artifact equality
- Variant `v01-move-sepzero-upstream` (tree 2): Utilize = upstream guard unchanged + a separate
  `if number_of_uses == 0 { return Err(MetadataError::NotEnoughUses.into()); }` placed before it,
  with upstream's moving `let metadata_uses = metadata.uses.unwrap();` (line 85, col 39).
- Raw ELF 707,448 bytes, SHA-256 `99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff`
  (unstripped compiler output `d38edf7b…`); equals the captured prefix byte-for-byte; captured tail
  86,543 bytes all zero; padded image SHA-256 = original `31f0a627…`.  1251/1251 raw windows.
- `v02-move-option-match` (tree 1, different source spelling) produced the identical binary.
- Second exact build on the independent tree 1 (`v01-repeat-tree1`): identical (`99ee61a5…`, compiler `d38edf7b…`);
  a diagnostic MIR/IR build also identical; in-image v1.37 strip identical (`strip-receipt.json`).
- Runtime: 6 suites, 147 cases / 294 signature-verified transactions, 0 mismatches (`run_validation.py`).
- Patch chain re-verified from 18 upstream Git blobs (`patch-application.json`).
- v01 IR confirms the mechanism: `exit91: br n==0` ; separate `bb99` (total||remaining select chain)
  laid out directly before its own error block `bb103` -> ISel inverts -> `JGE rem,n -> SUCC`.

## State: DONE for window 346 / whole artifact.  Packet committed on branch claude/deps-metaplex-20261027.
Remaining optional follow-ups (not required for identity): dispatch the pinned hosted `cargo build-sbf`
workflow on this patch for a third, independent recipe; coordinator may point
`repro/pump/metaplex-current.json` at this packet.
