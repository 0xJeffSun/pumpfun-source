# Mayhem tagged I/O message and empty-table data contracts

This static successor bounds the **three remaining unresolved references** in
the [account-data extent audit](../mayhem-account-data-extents/README.md), on
that audit's exact shared-sell candidate. All three have equal typed content.
This adds **zero instruction matches, zero raw-local matches and no whole-file
identity**. No compiler, target VM or runtime replay is run by this packet.

The parent artifact is fixed, not a moving source composition:

- Stripped candidate: `fa4f81eb1d5953eb7f31b83bf783f7fc4f89b9573f1403b7c4e1efab76f763c4`.
- Symbols: `cc56231724a7973fb9cecfd3c24ab390875dd828925f79b33388a05c71f12d25`.
- Original: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.

The parent already reports 426/441 normalized original windows and 70 raw-local
matches. Its 153 earlier typed-equal observations are credited to the parent;
this packet checks the remaining three rather than silently rewriting its
inventory. Fifteen original bodies and all four whole core identities remain
unresolved. Relay is outside that four-program identity goal.

## Newly bounded observations

| Reference | Original / candidate body | Offset | Observed data contract |
| --- | --- | ---: | --- |
| O0116 | 250656 / 314560, 7904 bytes | 512 | Static tagged I/O message |
| O0184 | 524888 / 409168, 3224 bytes | 880 | Same static tagged I/O message |
| O0116 | 250656 / 314560 | 5216 | Empty hash-table initializer and eight-byte control read |

The I/O record at original `0xb1220` / candidate `0xa6fa8` has seventeen
meaningful bytes: a relocated message pointer, an eight-byte length of 27,
and the kind byte 37. The aligned argument selects the tag-zero path of the
complete matching Borsh conversion helper, which actually reads byte `+16`
and compares it to 37. The message is exactly `failed to fill whole buffer`.
Seven following alignment bytes are **not** included in this contract; no
24-byte allocation-size inference is needed.

An independent matching I/O Debug consumer routes `record + 16` through a
size-one/alignment-one kind vtable and `record + 0` through a
size-sixteen/alignment-eight string vtable. The string adapter really loads
the pointer and length at offsets zero and eight. The kind formatter reads
one byte; its actual index-37 pointer/length entry resolves to the thirteen
bytes `UnexpectedEof`. Both vtable targets and the downstream complete
string-formatting body match under the unchanged normalizer. This is selected
pointer routing, not recursive formatter or indirect-dispatch closure.

The parent's label **“empty formatting prefix” is corrected**. Original
`0xb1340` / candidate `0xa70c8` initializes a hash table, not a string slice.
The caller loads exactly four words, writes them to a contiguous stack region,
adds two zero words, and copies all 48 bytes through the matching `memcpy`
wrapper bound to `sol_memcpy_`. The real next consumer is the complete matching
`hashbrown::map::HashMap::insert` specialization. Its reads establish the
table/control pointer and zero bucket-mask/growth/items words, followed by
the two hasher words; the item count is also read/incremented at `+24`.
Its control-group operation loads **eight bytes**, all `0xff` in both images.
The following bytes spelling `IO Error` are outside that read extent.

The empty map's zero growth takes the reserve path before probing. The checker
therefore does **not** claim that this insertion dynamically reads the initial
sentinel, that the sentinel's entire allocation is eight bytes, or that the
map is behaviorally proved for every input. The result is the bounded
representation/read-width contract, with that branch explicitly retained.

## Verification and limits

```sh
python3 -I -B research/mayhem-tagged-error-data/verify.py
python3 -I -B research/mayhem-tagged-error-data/test_scope.py
```

These are standard-library-only checks. Four exact root inputs are pinned by
hash: original ELF, compressed parent symbols, the parent's original cohort
report and frozen `scripts/analyze.py`. Missing or altered inputs fail; there
is no Git/history, compiler, SDK, VM or network fallback. The two reader modules
are byte-exact copies from the earlier pause-data packet. Candidate aliases
must have the complete inferred window size. Only actual relocated LDDW
operands and encoded local CALL displacements are normalized; imported names
are bound. Registers, stack locations, scalars and branches are not masked.

Normal and minimal isolated verification pass. Eleven actual mutation controls
reject changed message bytes/pointers/lengths/kind, table counts/control bytes,
consumer read widths, copy size, incoming calls and vtable routing. A twelfth
boundary test changes the excluded padding and neighbor bytes: selected
contracts deliberately stay unchanged, while whole-artifact hashes change and
the input-integrity check would reject the artifacts. Reference files are never
modified by these tests.

The generated report binds two account bodies and seven existing helper bodies.
It is not a new build/source recovery, a complete recomputation of all 156
parent references, a count of additional covered machine code, a transitive
call/data proof, historical type attribution, runtime proof or whole ELF
comparison. No selected program, checkpoint, workflow, frozen script or ledger
is changed. Whole core raw identity remains **0/4**.
