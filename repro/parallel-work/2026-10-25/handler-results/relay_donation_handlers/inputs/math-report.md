# Relay arithmetic and callback closure continuation

This package advances the frozen wave2 `relay_shared_math` evidence: it resolves a concrete formatter sink, gives four caller-specific writer targets, traces the donation operands to an exact dynamic data offset, and removes an unnecessary weight restriction from the small-distribution mathematical fragment. It does **not** reconstruct relay. All 492 windows remain inferred boundaries without original source attribution. No source changes, builds, program execution, runtime probes or chain calls were performed.

Inputs are Git blobs from checkpoint `517d77db988d8c63b6cf476f0be138c5a4f3128a`; full Git object IDs, SHA256 and sizes are in `provenance.json`. The only binary is the prior public relay ELF, SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. The prior report/baseline are immutable context, not current Pump/Fees inventory claims. This work makes no whole-file source equality claim for any program. The retained baseline's 11 dispatch comparisons are verified against bytes; dispatch association does not identify original functions.

All numbers below are decimal, ranges half-open ELF offsets. `result.json` contains raw range witnesses and complete selected literal extents. `disassembly/` supplies byte-bearing listings. No excluded Pump/Mayhem body was consulted.

## Concrete indirect targets, with context limits

At 152560/152568/152576, window116 reads its formatter's `+32` object and `+40` table, then loads the table's `+24` callback. The arithmetic error constructor115 installs table772792 at 152144–152160, object `frame-96` at152168–152184, and passes formatter `frame-72` at152224–152248. Thus callx153936 has target **50616 (window64)** on this constructor path. Check104 installs the identical table/object arrangement at114096–114232. This conclusion uses caller stores and a relocation record, not a shape match.

The slot [772816,772824) is a type8 relocation in `.rel.dyn`. Its unmodified file word stores the encoded target in its upper32 bits. `result.json` retains both raw bytes and the complete16-byte relocation record. Decoding this existing encoding is static interpretation; no binary was relocated, patched, loaded or executed. The target equals an inferred window start. No original Rust symbol is established.

Window64 [50616,50800) reads capacity/pointer/length from object+0/+8/+16, reserves through53616 when remaining capacity is insufficient, copies exactly r3 bytes from r2 through743376, advances length and returns0. For arithmetic enum8, window116 passes exactly [755544,755563), `Arithmetic overflow`, length19 (153432–153456). All34 alternative pointer/length pairs and their full literal bytes are retained in `literals_116`; no NUL terminator is assumed consumed. Resource failures remain possible before returning0.

Three writer sites in window422 (721696,721952,722576) load `entry_r2+24`. Concrete caller specializations are:

| Caller and setup | Table | Slot | Encoded target/window |
|---|---:|---:|---|
|42,31736–31768|772792|772816|50616 /64|
|261,645832–645864|774912|774936|647008 /271|
|372,710304–710336; 387 setup712688|778488|778512|713040 /390|
|421,721456–721488|778896|778920|716584 /407|

These resolve all three writer sites **only for those caller contexts**, not every invocation of422. Target407 introduces two further indirect writer sites (717224,717408). The original count of seven indirect sites was a direct-closure count and must not be treated as a complete expanded closure.

The other422 sites obtain callback pointers from argument records:721744 reads `[args+16*i+8]`;722408 reads `[args+16*format_record.index+8]`, where the format index is loaded at722344. Concrete examples: caller336's branch692120–692288 installs one record whose callback is690672 and selects the simple path (format pointer0); its branch691464–691712 installs callback690720 and one explicit format record whose index is0. These resolve721744 and722408 respectively for those branches. Caller443's simple path installs739096 then741160 when its entry byte+8 equals1, otherwise741160 alone (733456–733792). These are byte targets, not function-name or type identities.

Callx725720 in427 loads `[formatter.+40 +24]` and forwards formatter.+32 with the input pointer/length unchanged. It returns the callback's r0 unchanged. It therefore resolves to50616 **if** its formatter carries772792; the generic427 entry does not prove that table. This remains a conditional target, not a globally closed site.

For422 every callback's nonzero return branches to722608 and returns1; complete success returns0 at722592. In116 and427 the callback return passes directly to the caller. In115 a nonzero formatter return takes152472–152544 into406, then403/363 and external `custom_panic`/`abort`; it does not become ordinary error6008. This is a distinct resource/formatting boundary.

## Donation operands beyond stack-slot labels

Let C be window112 entry r2, A its entry r3. The bps operand is `u16[A+64]`, checked by107 at131320 and retained atframe-976 at131584. The earlier length check uses `u64[A+16]` at131232 and takes precedence locally.

The before snapshot is no longer an unexplained frame-944 value. At138248–138296,112 passes **C+32** to110 with output frame-480. Successful decoding supplies output+64 (=frame-416), copied toframe-944 at138360–138368. At140728–140752 it calls110 again with the same saved C+32, after the existing614432 invocation boundary returns success. The new output+64 is the after operand at140808.

The complete successful offset chain is:

* 110 calls331 at130584. At690016,331 reads B=`u64[(C+32)+16]`, checks/increments the borrow counter atB+16, and exposes the two-word slice atB+24/B+32 through130640–130664. The data pointer is therefore D=`u64[B+24]`, length=`u64[B+32]`.
* 110 calls231 at130696. 231 rejects length355 and length<165 (624888–624904), then calls251 on the first165 bytes at624936–624952. Additional successful-path checks reject state0 and inspect byteD+165 for non165 lengths (625216–625528); this is not an extension-runtime reconstruction.
* 251 reads `u64[D+64]` at642072 and writes parser output+64 at643176. The84-byte copies in231 (625024–625064,625280–625320,625656–625696) preserve offsets24..108, hence preserve+64 exactly. 110 writes into112's frame-480, giving the claimed frame-416 operand.

Thus delta is checked subtraction of two decoded **u64[D+64] values from the same input wrapper**, subject to successful borrow/decode each time. D may be obtained afresh after the invocation. This does not prove what the invocation changes, ownership, historical source field names or account authenticity.

Successful251 reads the fixed data extent [D,D+165) conditionally: base [0,72), tag[72,76), payload[76,108) only for tag1, state[108,109), tag[109,113), payload[113,121) only for tag1, [121,129), tag[129,133), payload[133,165) only for tag1. The tags require upper bytes0 and low byte0/1; state must be<3. 231 adds state!=0 and, for length neither165 nor166 nor355, reads [D+165,D+166) and requires2. Dynamic bytes are not in this package; the extents and pointer chain are the evidence. No claim is made about unread suffix bytes.

At140896,490 receives `(delta,0,bps,0)`; high limb atframe-856 must be0. Then `u64[u64[C+8]+72] + delta` is checked and written at141184, before low product division by10000 at141256. Failure precedence is subtraction, product fit, accumulator fit; all construct enum8 through115. The counter is not inferred to be the same data object as D. Allocation and callback failure can interrupt error construction. The tuple of constructed error words is routed via137080/134248, not reinterpreted as an idealized language exception.

## Distribution caller, wide arithmetic and exact local sequence

108 captures record pointer=`u64[entry_arg3+0]`, count=`u64[entry_arg3+8]`, total=`u64[entry_arg3+32]` at119680–119720. After the available-count gate120024–120040, total inr1 survives to121280, then reaches113 inr2 at121624. The loop121528–121600 consumes exactly [records+36*i+32,records+36*i+34) for each i<count and copies to a two-byte-stride buffer. Keys/padding are not arithmetic operands. Caller validation and later recipient invocation remain separate.

`arithmetic_calls` records all five focused multiply/divide callers, including the count*24 allocation product. For the per-weight calculation,490/483 receives `(u16_weight,0,total,0)` at142400;480/479 receives the full product and `(10000,0)` at142472. 479 returns quotient atout+0/+8 and remainder atout+16/+24 (745808–745832). 480 copies **only quotient limbs** to its caller. 113 recomputes remainder as `product - full_quotient*10000`, using explicit low-limb borrow at142544–142608 and142904–142928. Treating480's result as quotient plus remainder is incorrect.

For arbitrary u16 weights the product is less than2^80 and fits128 bits. The full quotient can exceed64 bits. The observed share is **low64(quotient)** (142496–142512,142728–142736); no quotient-high rejection occurs. Full quotient remains the operand of the second multiplication, so the remainder is still the full-product remainder. This extends the prior restricted mathematical fragment to all u16 weights for the local small-sort path. It says nothing about whether a handler admits such weights.

The low64 shares are summed with overflow checks. Their vector entry and remainder record have already been written when a sum overflow is reported. Sum>total constructs enum8; sum==total skips sorting. Otherwise sort remainders, choose min(total-sum,count), and increment each chosen original index once, checking max-u64. For2..20 records,58's strict movement gives descending stable remainder order; >=21 calls59 and remains outside this fragment. Index bounds lead to405 rather than6008. Error113 writes `[2^63, error_word0, error_word1]` at143224–143264;108 copies all three words at121704–121736 before cleanup. This is not an atomic-rollback claim about internal scratch writes.

`fragments.txt` and `static_equation_vectors` are mathematical review material, not executable target tests or runtime observations. In particular, zero weights need not conserve total, and truncating an oversized quotient is distinct from a checked narrowing operation.

## Literal/error construction and closure boundary

For enum8,114 allocates18 bytes through146464–146616, then149328–149384 writes two8-byte immediate chunks and a2-byte suffix: `ArithmeticOverflow`. The complete consumed instruction extent is retained; this name is assembled from instructions, not a pointer to a guessed string. It returns pointer/length/capacity at152016–152040. 116 independently copies the19-byte message above. 115 adds6000 at152360 and284 allocates160 bytes/copies the error record at652392–652528. The full error representation and padding validity are not reconstructed by this package.

Still open: all-context callback points-to sets (including new407 sites), original source names and provenance, large-sort tie contract, complete allocator/error ABI and transitive literal/pointee consumption, caller admission and actual invocation effects, and remaining relay windows. Concrete next prerequisites are the caller formatter/table constructions for each unresolved edge, an explicit all-path large-sort comparison proof, and original relay source/build provenance. Dynamic data extents above are complete for the selected successful parser and arithmetic reads; they are not complete consumed-data coverage of every transitive error/invocation path.

Run `python3 -B verify.py` from any copied directory. It verifies the exact file set, SHA256, Git blob IDs,492 window digests,11 dispatch witnesses, relocation records, generated listings and deterministic static extraction/equation vectors. It does not certify the handwritten semantics. The verification receipt is kept outside the sealed publication.
