# Relay large-sort static continuation

The >=21-record dependency now has a grounded comparator, local tie rules, index-carry rules, and scratch-allocation/error ordering. The comparator is **unsigned descending 128-bit remainder only**. Index is payload, not a secondary key. Forward/backward merges, strict-run reversal, stable partition, and the four-record leaf all have stability-preserving local rules. This substantially narrows the missing proof, but **a complete all-admitted-records source-level sort contract is not established**: the run scheduler, recursive predecessor invariant, and simultaneous two-ended merge need a complete composition proof. The supplied mathematical fragment keeps that substitution conditional.

No source changes were made. No program execution, builds, fixtures, runtime/security probes, network actions, commits or parent edits occurred. `fragment.txt` is review material only. This does not reconstruct the relay, establish historical function names, or change any prior whole-file comparison.

## Evidence and identity boundary

All offsets below are decimal half-open ELF file offsets. `known113`, `59`, etc. denote the **inferred windows** in the accepted public inventory, not original function identities. The fixed checkpoint is `517d77db988d8c63b6cf476f0be138c5a4f3128a`. Git blob IDs, complete SHA256, original paths and sizes are recorded in `provenance.json`. The ELF SHA256 is `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`.

The root-reviewed public `relay_math_closure` report, result, fragment, provenance and seal were copied under explicit permission. Their current bytes are verified against the copied prior seal; no pending-publication Git provenance is invented for them. Frozen listings and ELF come from Git blobs. Existing public disassembler code is retained verbatim and used solely for static decoding. Full selected listings, byte-range witnesses and direct-call edges are included. No excluded original body was followed. The generic failure sinks are identified by call edge and retained boundary only; their full transitive ABI is not claimed.

## Comparator, record layout and actual data consumed

113 writes original loop index at record+0, remainder low limb at+8, high limb at+16 ([142904,143016)). Each record is 24 bytes, without a missing fourth/padding word. The sort consumes records [base,base+24*n). Comparator reads are [record+8,record+24); moves also read and write [record,record+8). It never sorts on a recipient key or original index. 108 supplies u16 weights copied from [source+36*i+32,source+36*i+34) at [121528,121608); 113's weight read is142352. Keys and other record bytes are not arithmetic operands.

For two records A,B the repeated numeric predicate is `A.hi<B.hi || (A.hi==B.hi && A.lo<B.lo)`, using unsigned branches. Evidence includes [37280,37480), [39264,39480), [39928,40032), [43296,43392), [44128,44224), [47808,47904), [48544,48640), [48952,49168). Reverse ordering is expressed by the selection of the larger operand, not by a signed cast or negation. No comparator callback is present in windows57–61.

The earlier wide-arithmetic finding remains: q=floor(total*weight/10000), share=low64(q), remainder=total*weight-q*10000, for arbitrary arithmetic u16 weights. Consequently remainder<10000 and its high limb is zero on this graph. The generic sort still compares both limbs. This is not proof that the handler admits every u16 value, count, account configuration, or weight sum.

## Tie and index preservation at each transformation

**Insertion / small-sort baseline.** 58 [35648,36192) shifts only on strict numeric less; equality skips movement. The new leaves in61 have the same strict insertion rules at [47448,47984) and [48048,48728). Every shifted element carries index and both limbs. Thus the <=20 stable-descending result is the appropriate reference contract.

**Run recognition and reversal.** 60 [39928,40048) distinguishes the first strictly increasing pair from a non-increasing pair. [40144,40320) continues the non-increasing run and stops on strict increase. [40480,40696) continues the increasing run and stops on greater-or-equal, so it cannot reverse equal records. [40760,40880) rechecks direction. [40880,41120) reverses all three words of each pair. Hence recognizing/reversing a run itself preserves equality order.

**One-ended merges.** At [37280,37480), r2 is left scratch and r7 is right input: r4=(left<right). r5 selects right only if r4 is true, otherwise left. Equality selects left; the companion >= flag advances left while the strict flag advances right. Writes [37104,37176) carry all three words. In the backward counterpart [39264,39480), r1 is the left end, r3 is right scratch end. Strict left<right selects left into the last output position; equality selects right. Since the output cursor moves backward this places left equals before right equals in final order. Writes are [39136,39216). The tail copy is through743376 ([37216,37232)), whose retained body names `sol_memcpy_`; byte copying is an explicit external primitive assumption, not an executed observation.

**Four-record leaf.** [44944,46072) and [46080,47192) first stably order adjacent pairs, then select extremes and sort the two remaining candidates. `fragment.txt` gives the exact pointer-selection equations and all four boolean cases. Strict comparisons retain earlier elements on equality, including the central cross-pair comparison. Stores [45872,46072) and [46984,47192) copy precisely four complete records. This is an algebraic reduction of existing branches, not testing newly invented records.

**Partition.** [43176,43856) scans the original sequence. Greater-than-pivot elements append at the scratch front; the complementary group prepends at the back. The pivot itself is inserted at its original scan position through [43536,43648), not swapped to the start. Copy-back reverses the back traversal ([43776,43856)), restoring relative order in that group. Thus both groups are stable, including ties with the pivot. [44008,44680) uses greater-or-equal for the front group and applies the same double-reversal principle. The >= specialization is selected using the predecessor key at [43032,43160); skipping that front group as already sorted requires the inherited upper-bound invariant. We have not promoted that invariant from a local comparison to an all-path proof.

**Dual-ended merge.** [48936,49528) uses strict comparison at the front (equality takes left), and strict comparison at the back (equality takes right), with whole-record writes at [49176,49232) and [48760,48816). The odd central record is copied at [49528,49728). Local tie polarity is correct. A proof that advancing both ends never duplicates/drops/reads past a record, with all loop bounds and the terminal cursor check [49728,49760), is still required for a total permutation theorem.

Original index preservation follows locally because every move above carries all three words together. Distinct input indices are initialized in input order. **Conditional on composition being a complete stable permutation**, equality therefore resolves to increasing original input index, without the comparator reading the index. This distinction rules out silently substituting an unstable remainder-only sort.

## Allocation, count thresholds and failure precedence

113 enters sort only after all records/shares have been written, the checked share sum fits u64, sum<=total and sum!=total. n<2 skips sort; 2..20 calls58 at143296; >=21 calls59 at143160. The leftover count is clamped only after sort at [143320,143344). Even a very small positive leftover causes the whole sort path to run.

59 [36192,36280) calculates `m=max(floor(n/2),min(n,333333))`. Although r3 is also raised to48, on the heap branch m>=86 so that raise has no effect. For21..85 it passes stack pointer frame-2048 and capacity85 ([36704,36752)); 85*24=2040 bytes. It does not allocate heap scratch in that interval.

For n>=86 it computes24*m through490 at36352, checks high limb nonzero at [36360,36416), and checks low limb<=2^63-8 at [36416,36440). It then subtracts bytes from the descending heap cursor, rejects unsigned underflow and crossing heap base+8, aligns down to8, and stores the new cursor ([36464,36648)). Failure converges on712224 at36792, not error6008. Successful capacity is m. For86..333333, m=n; for333334..666667, m=333333; for n>=666668, m=floor(n/2). These are branch equations, not admitted-count claims.

The large-sort caller passes an eager flag n<65 ([36656,36752)). Inside60, the minimum run length is min(ceil(n/2),64) for n<=4096 ([36872,36976)); larger n calls436. Its [730072,730488) bit sequence yields b=floor(bit_length(n)/2), then floor((2^b+floor(n/2^b))/2). This auxiliary sizing is separate from heap scratch sizing. No runtime feasibility of such large counts is asserted.

Before any per-weight arithmetic,113 allocates8*n share bytes then24*n remainder bytes ([141440,142184)); size/heap failure takes712224. In the loop it writes the share and remainder before acting on accumulated-share overflow ([142704,143080)). Next come sum>total error, equality fast return, sort allocation/sort, then indexed increments. Therefore resource failure in59 precedes every increment but follows arithmetic/sum checks. Sort itself exposes abort/bounds/assertion boundaries at [49728,49864), not a Result carrying enum8. It also has calls to generic failure helpers at44712 and49752; their transitive messages/ABI are not closed here.

The increment loop checks index bounds before checking MAX_U64 ([143368,143424)); index failure calls716152, max-share failure constructs enum8 via115. Under a correct permutation these two errors are unreachable on the successful arithmetic path: each index is in[0,n), and nonnegative shares satisfy share_i<=sum<total<=MAX_U64, hence share_i<MAX_U64. Each index is chosen at most once. This conclusion needs the permutation theorem and does not remove the actual checks or their order from review material. Internal writes already occurred when errors are constructed; no rollback claim is made.

The heap constants alone are not a caller-admission theorem. This package does not assume a fresh heap, erase prior allocation cost, or infer that all mathematically possible n can reach sorting. There is also no claim that an arbitrary host-language allocator or sort reproduces the target's resource-failure order.

## Precise unclosed proof and next prerequisite

The local comparator/tie/allocation facts above are grounded; the following global obligations remain:

1. For60, prove the run-stack invariant over [37488,39664) and [41152,41720): entries encode `2*length + sorted_bit`, represent disjoint adjacent runs covering exactly the processed prefix, remain within the stack arrays, and every merge/sort receives the represented extents and sufficient scratch. Prove the final41704 branch delivers the entire input sorted. The leading-zero merge-priority arithmetic is present in the retained listing; its scheduling invariant has not been supplied.
2. For61, prove recursive predecessor bound preservation at [43032,43160), [43856,43992), [44680,44800); prove the depth fallback at [47200,47248) and60's eager flag together terminate. The pivot selector57 returns a sampled record pointer without moving records, but pivot identity alone does not discharge those induction obligations.
3. Complete the dual-ended merge exhaustion/aliasing proof for [48392,49760), plus memory bounds for both small-leaf insertion halves. No local equality rule substitutes for those proofs.

Concrete next prerequisite: an instruction-to-invariant proof ledger for these exact ranges, using the frozen ELF and the record/scratch preconditions above. No build, runtime fixture, unknown source retrieval or new probe is needed for that prerequisite. Only after it is checked may the conditional stable-descending substitution in `fragment.txt` become an all-record arithmetic contract. Caller admission and original relay source/build attribution remain separate prerequisites, even then.

## Verification scope

Run `python3 -B verify.py` in any copied package directory. It checks the exact sealed file set, SHA256, Git blob IDs, selected inferred-window bytes, byte-for-byte reproduction of retained listings, raw claim ranges and direct-call edges, and the copied prior-package seal entries. It does not execute the relay, simulate the sort, generate input fixtures, or certify the handwritten invariant arguments. The verification receipt from a copied directory is stored outside this publication seal.
