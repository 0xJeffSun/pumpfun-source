# Layered reconstruction pass 03

The exact acceptance measure remains **0/4 core programs** and **2/5 dependency captured payloads**. This pass follows published `0cbb40c702d662922573bf9382cd4e05d0e9aa6b` and applies one reviewed source correction to Relay, then builds, replays the unchanged ordinary cases and repeats the complete byte comparison. The four core candidates and their53,787 saved comparisons are unchanged. The security audit remains incomplete.

## Source correction, build and runtime

The [complete Relay review](../../donation-relay/next-layer-static-review/README.md) identified a concrete allocation/write difference: four original account serializers write fields directly into a borrowed account buffer, while the prior reconstruction first allocated complete byte vectors. The [one-file source correction](../../donation-relay/source-build-05-streaming/proposal/source-proposal.patch) uses natural Cursor/write_all operations with the recorded field order, owner/live-account gates and short-write behavior.

[Build05](../../donation-relay/source-build-05-streaming/README.md) uses exactly the preceding pinned recipe and dependency graph. The compiler and launcher exit0 with no backend stack-limit diagnostic. The candidate is452,432 bytes, SHA-256 `885e288c4a644f81dc836fda72647ecc9916c4e2b0093eabf253bf5f0fb9995e`; the complete symbol file is separately retained. All21 source inputs, seven tool identities,53 SDK files and232 registry packages remain bound. No compiler/version/flag search, retry or binary edit was used.

The [fresh ordinary comparison](../../donation-relay/build05-ordinary12/README.md) passes all12 unchanged cases: five donation and seven IDL operations. It uses24 submissions,12 unique signed transactions and50 encoded signature fields. The only harness adaptation is the expected candidate hash, explicitly recorded in the root adapter. Fixtures, comparator, effects, signature/blockhash/history controls and original harness source are unchanged. Independent saved verification checks every signed message, privilege, effect and receipt. No new unique coverage is claimed.

## Analysis after the change

| Corrected relocation-first measure | Build04 | Build05 |
| --- | ---: | ---: |
| Original inferred windows |492|492|
| Candidate symbol windows |282|279|
| Original windows with a raw body match |29|29|
| Original windows with a normalized shape |110|110|
| Original windows without a normalized shape |382|382|
| Normalized pairs |277|277|
| Internal-call-shape fixed-point pairs |111|111|
| Different common-position bytes |247,326|247,460|
| Original-only bytes |380,432|378,016|
| Complete original payload equal |No|No|

Every row, call, relocation-backed data reference, ambiguity and raw residual remains in the [build ledger](../../donation-relay/source-build-05-streaming/comparison-summary.json). Direct r10 accesses in all279 candidate windows stay within4096 bytes; this is not a dynamic-stack proof. Normalized shapes and raw instruction bodies do not establish external relocation-target or data equivalence. The source correction improves fidelity of the observed serialization structure without increasing these shape counts. Code movement changes positional differences; these figures are not completion percentages.

[All nine current program/dependency comparisons](current-bytes/summary.json) and [every differing range](current-bytes/all-byte-ranges.json.gz) are regenerated. The two raw compiler supplements remain separate from retained allocation images. No original byte is omitted, and no candidate was padded or patched.

## Remaining work and next review

- **Pump:** five partial instructions; authentic BuyV3 preparation, mode, vault and settlement dependencies; unmatched helper/call/data and historical build provenance. The partial composition remains non-integratable and does not preserve the117 saved rows.
- **AMM:** actual scalar-helper specialization, recipient/initializer diagnostic origins, transitive calls/data and genuine successful initializer replay. No evidence supports changing the already-correct scalar limit just to force a code match.
- **Fees:** full review of the interrupted legacy caller proposal, nonzero-quote payout implementation, named context/remaining-account correspondence, error/data origins and unmatched bodies. Static contracts are not accepted replacements.
- **Mayhem:** non-initializer source/lowering gaps and five unknown field meanings. The Burn formatting review establishes no justified source patch.
- **ATA and Metaplex:**307 and1,509 differing captured positions respectively; existing evidence supplies no authentic replacement recipe. No layout/flag brute force is substituted.
- **Relay:**382 unmatched original shapes, fixed-relayer routes without genuine authority messages, original source and error/data ABI, and deeper serializer/callee correspondence. Build04's first rejection comparison failed source-origin logging; it was not rerun on build05 and remains unresolved. The two later planned rejection cases remain unexecuted.

Previously stopped scopes remain excluded. No audit sign-off or deployable replacement is claimed. Parallel workers reached the account usage limit; root completed this build, replay and report from their preserved evidence. Further code work requires continuing the same review → source correction → build → comparison process, retaining failures and all unresolved rows.
