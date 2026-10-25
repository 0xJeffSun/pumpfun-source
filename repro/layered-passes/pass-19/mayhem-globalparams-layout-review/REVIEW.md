# Mayhem GlobalParams representation lead — source-only interim proof

The raw array groups hide distinct serialized members. The previously admitted full original GlobalParams serializer (66fd0..676f8,1832 bytes) establishes27 ordered writes: one8-byte discriminator write plus26 payload-member writes covering246 bytes. `member-map.json` records every native offset, wire offset, width, source instruction and actual writer call. This is concrete representation evidence, not yet sufficient for a full Rust type restoration. No source patch is proposed at this checkpoint.

## Admission and exact scope

Only the original serializer previously selected in `global-params-remaining-field-review/field-ledger.json` was decoded. Its SHA256 matches the prior bounded witness840b3b5f0ec9f4a2401fbe788c9ae8d0836883d4cb15df6df68650881aaede04. The latest complete inventory labels its encompassing original row opaque; this review does not reinterpret that label as permission to explore adjacent or other opaque bodies. The earlier explicitly retained bounded serializer is the sole original code window used here. No original Admin parser or checked/unchecked deserializer was opened. They need an independently admitted complete attribution before use.

Current admitted codec rows are N0173(407664..408712) and N0174(408712..411336). Their full rows and assembly are retained. The frozen current complete inventory reports no normalized counterpart. Both have unchanged normalized hashes versus the preceding candidate; the latest result-error change did not create the codec mismatch. Current GlobalParams declaration only was excerpted; no stopped initializer body was read. Original full binary hashing is only identity binding, not permission to decode excluded bytes.

## Full original member transport map

All offsets below are decimal. Account offsets include discriminator; native offsets are from serializer r7 and are not account offsets.

| Wire offset | Width | Original native offset | Current source member |
|---:|---:|---:|---|
|8|4|232|reset_prefix[0..4], field_0|
|12|4|236|reset_prefix[4..8], field_1|
|16|8|96|reset_prefix[8..16], field_2|
|24|8|104|reset_prefix[16..24], field_3|
|32|8|112|reset_prefix[24..32], field_4|
|40|8|120|reset_prefix[32..40], field_5|
|48|1|245|paused|
|49|32|0|admin|
|81|32|32|trader|
|113|16|64|sol_deployed|
|129|8|128|preserved_middle_a, field_9|
|137|1|244|reset_middle[0], field_6|
|138|8|136|reset_middle[1..9], neutral slot_138|
|146|8|144|reset_middle[9..17], field_7|
|154|8|152|reset_middle[17..25], field_8|
|162|4|240|version|
|166|8|160|field_10|
|174|8|168|max_sol_per_sweep|
|182|8|176|reset_stable_prefix[0..8], field_11|
|190|8|184|reset_stable_prefix[8..16], field_12|
|198|8|192|reset_stable_prefix[16..24], field_13|
|206|16|80|stable_deployed|
|222|8|200|reset_stable_suffix[0..8], field_14|
|230|8|208|reset_stable_suffix[8..16], field_15|
|238|8|216|reset_stable_suffix[16..24], neutral slot_238|
|246|8|224|max_stable_per_sweep|

Every original field writer calls actual target0x97730; the verifier checks the immediate length immediately before each call. The26 payload-member writes plus discriminator write transport the whole account. Scalars are copied to a stack temporary before writing; Pubkeys and the single byte at137 use member addresses directly. Two i128-sized members transport two64-bit limbs. The map proves discrete serializer transport units and their order; serialization alone cannot distinguish u64 from i64 or [u8;8], nor i128 from another16-byte representation. Existing source/previous trade evidence separately supports signed counters, named keys and the paused flag.

## Supported direction and unresolved gate

Known public update argument widths support field_0/1 as u32, field_6 as u8 and the remaining exposed fields as eight-byte values. Previously retained trade code gives some of those values roles, but absence of a consumer is not evidence of reservation or deadness. Neutral names must remain neutral. No guessed policy name, offset annotation, explicit layout attribute or padding should be introduced.

A complete typed-restoration patch must resolve at least slot_138 and slot_238 from allowed source semantics/constructor/decoder provenance. The current source stores them within reset groups; serialization only proves their eight-byte transfer width, not original Rust types. Replacing them with guessed u64 merely because the original native offsets resemble an aligned scalar run would be layout steering. Likewise, exact complete original decoder/error paths are not yet admitted here, so this report does not claim equivalent bool/error/short-buffer behavior or predict a byte match after typing known fields.

The N0173/N0174 mismatch is a credible consequence of byte-array grouping, but causality and a natural complete fix remain unproved. No build, runtime, initializer workaround, new fixture or main change was performed. A next step should use only an already admitted complete original decoder/constructor or an allowed typed consumer with resolved ownership; otherwise keep this as precise unresolved evidence.
