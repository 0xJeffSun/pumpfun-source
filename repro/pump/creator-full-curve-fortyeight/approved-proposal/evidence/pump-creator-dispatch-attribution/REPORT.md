# Creator dispatch and serializer attribution

New static attribution closes the original dispatch-to-wrapper ambiguity for three allowed creator paths. These are exact discriminator comparisons and signed relative-call targets, not inferred original symbol names. No runtime, build, main edit or stopped-scope work occurred.

The original dispatcher complete window is[1161048,1169744). It compares each eight-byte discriminator then advances instruction data by8 before invoking its wrapper:

| Instruction | Discriminator bytes | Comparison / destination | Wrapper call |
|---|---|---|---|
| set_metaplex_creator |8a60aed93055c5f6|1162312→1167096|1167176→1232784|
| set_creator |fe94ff70cf8eaaa5|1162344→1167208|1167288→1233936|
| migrate_bonding_curve_creator |577c34bf3426d6e8|1162664→1168328|1168408→1247424|

The complete wrappers have sizes1152,1520,1152 respectively. Their exact parser/application/curve-exit calls are:

- set_metaplex_creator: parser830912 at1232952; application239544 at1233208; shared curve exit23080 at1233296; later cleanup10544.
- set_creator: parser822264 at1234312; application233408 at1234568; shared curve exit23080 at1234656; later cleanup10544. Its extra argument decoding/error calls are preserved in the full body.
- migration: parser816272 at1247592; application228872 at1247848; shared curve exit23080 at1247936; later cleanup10544.

Application success tag2 gates shared curve exit. The return/cleanup branches are retained in each full wrapper assembly, rather than omitted from a successful slice. The dispatcher returns each wrapper's result through the same common result path. This provides the required route provenance for the current source names; earlier reports that treated original mappings as unproven remain historical, not overwritten.

## Concrete serializer consequence

All three original wrappers call the **same full1840-byte curve exit at23080**, already independently attributed as the complete BondingCurve serializer with25 immediate calls and discriminator17b7f83760d8ac60. They do not invoke a separate creator-only166-byte raw-buffer writer. This newly connects the allowed creator routes to the full typed curve serialization contract, and makes the current SetterCurve/MigratingCurve whole-buffer serializers a concrete source-model difference rather than merely a suspicious coding style.

The source currently copies/clones a166-byte buffer, changes creator bytes49..81 and writes the whole buffer once. Original23080 contains owner/closed/borrow gates plus discriminator and individual typed field writes. Therefore replacing only the buffer write with a new raw writer would not restore typed decoder defaults, field validation, short-write I/O error construction, borrowed guard lifetime or per-field operation sequence. A coherent change requires matching the parser outputs and application field offsets to the already-recovered full BondingCurve type.

The full original application bodies239544(3552B),233408(6136B),228872(4536B) and serializer23080(1840B) are retained here. Their complete call/error/event branches are now available for the next field-role pass. The migration application first reads its curve object through context+8; its holder/creator-fee predicates use that decoded object, not raw account offsets. These are decoded layout values and cannot be equated to the current partial structs by offset alone.

## Remaining work and permissible source correction

The next precise proof is parser816272/822264/830912 output layout and their field mapping into these applications. In particular bind creator read/store, holder and fee flags, and the actual shared23080 input pointer to the decoded full curve. After that, using the existing full BondingCurve type in a dedicated creator context may be justified. It must preserve discriminator/owner failures and application mutation/event ordering. The present attribution does not itself certify that replacing all partial structs is safe.

Other original windows remain opaque. No administrative setter, incentive, sell_v2 or extension branch was interpreted. Full-file equality is unchanged and no new original/candidate matching count is claimed. The artifact consists only of static disassemblies and exact route/call attribution.
