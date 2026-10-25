# Relay Unicode extent-link hardening

This sibling copy adds static caller/callee argument evidence to the prior raw full-array and pointer binding. Original `work/relay-compiler-family-audit/` and its manifest inventory remain unchanged. No compiler, new build, network request, VM or target execution occurred.

At the two branch prefixes, actual decoded instructions store NORMAL1 length 486 and SINGLETONS1L length 208, or NORMAL0 length 297 and SINGLETONS0L length 290, at caller stack slots -4080 and -4096. They store the corresponding normal pointer at -4088, pass the same caller frame as r5, lower pointer as r4, upper pointer as r2 and upper count as r3. The common call reaches the actual 704-byte helper.

The helper loads normal pointer/length and lower length from those exact r5-relative slots. It shifts upper count left 1, reads both tuple bytes at offsets 0/1, advances upper cursor by 2 and compares against the byte end. Counts 44 and 40 therefore pass complete 88-byte and 80-byte upper tuple slices. The lower byte loop receives full 208/290-byte bounds; the normal byte loop receives full 486/297-byte bounds and checks its second-byte/end cases. `unicode-extent-links.json` retains all exact raw and decoded anchors, register/stack argument bindings and source-array lengths.

The six full source-defined extents are thus passed to the consumer and used by its bounded slice iteration. This does not claim every byte is read for a particular character input, prove the whole algorithm's runtime behavior, close the downstream panic graph or identify a unique compiler.

Only `verify.py` and `manifest.json` change relative to the original packet. Added files are this note, `verify_extent_links.py` and `unicode-extent-links.json`. All retained original captures, source bytes, helper analyses, build/provenance receipts and reports remain byte-identical. The verifier independently decodes the actual target bytes and asserts these links before accepting the prior full-array claim.
