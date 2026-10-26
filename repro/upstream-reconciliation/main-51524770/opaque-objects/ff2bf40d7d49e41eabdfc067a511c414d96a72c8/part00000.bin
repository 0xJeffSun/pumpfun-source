# CTO6091: boxed-field and second-route proof; unapplied proposal

This is one bounded static continuation of sibling `pump-error-static-next-lead` (manifest38ea25fee0b527ac98384c8929029fe0af66ac6c66c5b75f68220837f09ce469), which remains unchanged. It follows exactly the Global78448 and bonding-curve15208 account-reader chains, their owning parse variants and the second6091 predecessor. All retained bytes are from the existing captured original and sealed pass24 ledger. No new original source, SDK, network, compiler, transaction, VM or stopped-lane work is used.

The two compared boxed fields are now attributable to current declaration fields: `global.whitelisted_quote_mints[0]` and `bonding_curve.quote_mint`. Their identities follow serialized input parsing and explicit copy offsets, not a guess about Rust struct layout. Original eligibility is `quote==default || quote==wrapped_SOL || quote==whitelist[0]`, gated by a present fee argument after applicable earlier CTO creator guards. The present source guard omits explicit wrapped SOL and constructs a numeric ProgramError. `proposal.patch` changes only this one guard/constructor; it is not applied, compiled or accepted.

## Complete owning chains and global field

All22 selected function bodies are retained in `*.asm`, with complete entry/end and raw/call/data records from the sealed ledger in `bounded-ledger.json`. These are inferred original entry bounds, not recovered target debug symbols. The two original entry readers and every directly needed owning wrapper/parser are included.

Global78448..78632 advances one48-byte AccountInfo and calls38608. Complete38608..39600 obtains account data, calls1441232, and on success copies1063 bytes from parse-result offset16 to Account-wrapper offset24 (39512). This is an explicit +8 mapping for the compared bytes, with no assumption about memory padding. Parser caller747424 copies the resulting1088-byte Account value into the global box used at application context+8.

1441232..1441960 checks the Global discriminator and delegates to complete1441960..1447344. The latter consumes initial fields, two seven-Pubkey arrays, the eight-Pubkey buyback array at1444728, two immediate u64 reads1444880/1444960, then the one-Pubkey array reader66272 at1445032, followed by a boolean reader1445192 and next u64. The complete owning32-byte reader66272..66544 decreases input length32, advances input pointer32, and returns the exact32 input bytes at result+1..+32. This sequence agrees with current Global declaration's buyback_fee_recipients[8], buyback_basis_points, initial_virtual_quote_reserves, whitelisted_quote_mints[1], creator_fee_configurable, max_configurable_creator_fee_bps. The declaration prefix occupies1013 account bytes including discriminator; whitelist bytes are [1013,1045). `proof.json` records every field/width in that serialized prefix.

1445064..1445152 retains all seven split pieces of the whitelist Pubkey. Stores1446440/1446424/1446952/1446488/1446472/1446456 populate result[928,960) through overlapping four-byte first pieces plus8/8/8/1-byte pieces. The +8 Account wrapper mapping yields box[936,968), exactly the application comparison at142848. Initial global/status failures return an error and never expose these successful output fields. This is the sole whitelist slot; no unseen second slot is invented.

## Bonding-curve field, every admitted historical length

15208..15560 calls77896, which advances one48-byte AccountInfo and calls33568. Complete33568..34576 obtains data and calls635208; success copies141 bytes from parsed-result offset16 to Account offset24 at34472. Complete15208 then copies the resulting168-byte Account to its box at15528. Thus the application's box[40,72) comes from parse result[32,64), with an explicit +8 mapping.

635208..635952 checks the exact bonding-curve discriminator, skips8 bytes, rejects remaining payload<41 and dispatches by remaining payload length. Every directly dispatched variant is retained, including layouts that may be absent from retained fixtures:

| Payload length after discriminator | Complete owning variant | Quote result[32,64) |
|---|---:|---|
|41..72|636576..637992|zero, via complete64-byte initialized zero block|
|73|637992..639552|four zero u64 stores|
|74|639552..641272|four zero u64 stores|
|75..106|641272..643080|four zero u64 stores|
|107..115|643080..645200|payload[75,107)|
|116|645200..647544|payload[75,107)|
|117..132|647544..649968|payload[75,107)|
|133..157|649968..652544|payload[75,107)|
|158 and above|652544..655472|payload[75,107)|

For each long form, the prefix reads five u64 values (40bytes), validates complete(bool1), reads creator(Pubkey32), validates two additional booleans, then calls complete32-byte Pubkey reader64176 for quote. Its cursor is therefore75. The two preceding bool readers are53352, whose complete body consumes exactly one byte and rejects other boolean values. The second Pubkey call in each long variant is recorded exactly. All32 quote bytes, including split/overlapping first seven bytes and final byte, are retained through stores to result[32,64). No field normalization converts an explicit wrapped-SOL key to default. The existing selected `historical_curve` source likewise reads quote only at historical payload length>=107; its field is named quote_mint. This establishes the same field across all admitted lengths while keeping malformed/truncated parse errors separate.

## Second route and precedence

145344 reloads saved eligibility frame-2312 into r4. Both relevant straight-line paths contain no intervening calls or r4 writes before147232:

- Shared-flag-zero:145360→147104, retain creator pieces, fee tag147216/147224; a present fee falls into147232.
- Shared-flag-nonzero:145360 fallthrough145368, retain previous creator pieces, fee tag145456/145464; a present fee jumps145472→147232.

147232 masks r4 to one bit;147256 copies it into r1 before147280 reuses r4 for other data.147288 branches to144720 if eligibility1. Fee-None takes the alternate paths and does not reach this6091 edge. The first holder-side route at144648/144672/144704 separately tests fee presence and the same saved bit. Neither route is assumed unreachable.

The owning6091 branch/name/message/source/converter is unchanged from the first packet. On these admitted routes it precedes cashback testing147312, fee-configurability147536, and fee range147560. Existing earlier holder/new-creator/target-zero/6019 guards remain predecessors as appropriate; this proposal moves none of them. Other6019 second-comparison attribution and6092 ownership work remain unresolved, so this is not a claim of complete CTO predicate/error/cleanup equivalence.

## Concrete proposal and prescribed validation

The single guard in `proposal.patch` adds the authentic wrapped-SOL constant to the existing default/whitelist disjunction and replaces `err(6091)` with the existing named `error!(PumpError::CreatorFeeNotConfigurableForQuote)` ownership family. Fee presence, whitelist lookup, guard location and all following operations remain the same. The error name/message/ordinal91 and original160-byte owned Anchor constructor were already independently proved in the unchanged first packet. No historical326 line is manufactured.

This packet's standard-library verifier rehashes external inputs, all complete function bounds/raw bytes and decoded files, selected source declarations, input-width/output-copy/quote-store anchors, exact eligibility routes, and the one unapplied diff. It is a reproducible byte/structure witness, not a formal whole-function semantics proof. Review the full saved parsing code and explicit provenance chain before authorizing implementation.

Only after coordinator review should a source change be considered. A later separately authorized single frozen build would need exact source/profile/tool receipts, emitted named constructor/operand/guard-order comparison, and all existing finite regression evidence retained. Existing suites do not establish new6091 branch coverage. Any runtime/transaction/new fixture work requires separate scope; none is launched or implied here. Global data/OOM/syscall/parser-error transitive closure, original whole-application identity and every possible account state remain unproved.

Run `python3 -B verify.py --repo /path/to/pr8-review`. The prior packet seal is checked unchanged. Two early local preparation typos were corrected before witness generation; neither invoked tools or mutated checkout bytes.
