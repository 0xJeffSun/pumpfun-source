# V2 correction record

Initial control is preserved unchanged at `work/sdk-action-account-matrix/`, manifest seal `c16db7a89cfb3785ad587b3417c4ffb6f1cf341a54d4a86cb34dd33b7c62651b`. Every initial manifest file was hash-checked while preparing this copy. V2 supersedes its supplement extraction and candidate labels.

The old raw first-semicolon search truncated block-bodied arrow declarations. The replacement uses the existing quote/comment-aware token reader, balanced parentheses/brackets/braces, and a top-level semicolon terminator. Missing terminators are rejected (including before the next export); arbitrary ASI/TypeScript AST support is not claimed. Eight tests include nested block arrows, inner semicolons, strings, escaped quotes, comments, templates, regex literals, nested/non-export decoys, missing terminators, and authenticated retained Relay declaration closures. No JS is evaluated.

Thirteen Pump pda.ts declarations now retain their complete source:

- `getGlobalParamsPda`
- `getMayhemStatePda`
- `getSolVaultPda`
- `getTokenVaultPda`
- `feeSharingConfigPda`
- `ammCreatorVaultPda`
- `socialFeePda`
- `donationFeePda`
- `donationRelayPda`
- `donationRelayEpochTrackerPda`
- `donationRelayDebouncerPda`
- `donationRelayMintWhitelistPda`
- `donationRelayEventAuthorityPda`

The 103 observations are renamed **lexical pda-module declaration candidates** (including `isLegacyQuoteMint` and `normalizeQuoteMint`), not 103 PDA derivations. The 88 observations are renamed **general return-object candidates**, not 88 account-meta producers; admission/depth/rate return objects remain visible without semantic classification. Only 48 separately shape-tested literals are labeled AccountMeta-shaped candidates, still without executed-path/order claims.

All original authenticated source snapshots, SDK source matrix, account/public action matrices, compiled-entrypoint observations, and external receipt/archive bytes remain unchanged. The 104-site/121-wrapper account proof is unaffected. The complete supplement and all rendered outputs were recomputed. No runtime, network, build, source edit or excluded-logic research was performed.

Exact modified existing files (plus regenerated `MANIFEST.json`):

- `COMMANDS.md`
- `REPORT.md`
- `supplement.json`
- `supplement.py`
- `ts_static.py`
- `verify.py`

Exact added files:

- `CORRECTIONS.md`
- `test_ts_static.py`

82 other initial packet files are byte-identical.
