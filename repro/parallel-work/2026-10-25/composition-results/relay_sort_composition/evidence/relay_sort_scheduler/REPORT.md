# Window 60 scheduler: instruction-to-invariant proof

The scheduler composition is proved **conditionally on the explicit contracts below**. In particular, the run stack is bounded without assuming that the priority is an optimal merge-tree priority; strict ordering of its 64 possible nonterminal values suffices. The final branch at 41704 concerns the whole input, not merely its last discovered run. This does not close the recursive-sort or dual-ended-merge proof, nor establish a historical function identity or a formal machine-checked theorem.

No source patch is proposed. All addresses are decimal half-open ELF file offsets. Windows 59, 60 and 436 are inferred inventory windows, not recovered historical names. The frozen checkpoint is `517d77db988d8c63b6cf476f0be138c5a4f3128a`. Full SHA256, Git blob IDs, sizes and original paths are in `provenance.json`. The consumed ELF SHA256 is `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. Listings include exact instruction bytes. Prior report and provenance are copied with their exact public seal; no Git identity is invented for pending-publication files.

## Preconditions and explicit imports

P0. On entry at 36800, B=r1 points to n=r2 complete writable 24-byte records, S=r3 points to C=r4 complete scratch records, and e=r5 is the eager flag. The spans are disjoint, properly aligned, valid, and do not wrap. For the caller path considered here, n>=21 and 24*n<=2^63-1. This is an explicit valid-slice/caller admission precondition, not inferred from a successful hash check or from the scratch allocation alone. No assertion is made that all such counts are admitted by the handler. ABI calls preserve r6..r9 and the caller's frame, except explicit outgoing argument slots; arithmetic has unsigned 64-bit register semantics.

P1. C is exactly 85 for 21<=n<=85; otherwise C=max(floor(n/2),min(n,333333)). Scratch allocation succeeds and provides those bytes disjoint from input and this frame. [36192,36760) establishes this capacity choice; wide multiply at 36352, allocation validity and failure behavior remain imported from the prior allocation analysis and allocator contract. In particular C>=floor(n/2) and C>=32. The stack scratch occupies [caller_fp-2048,caller_fp-8), exactly 2040 bytes. On the heap path the requested usable record extent is 24*C bytes, with 8-byte alignment; this is capacity, not a claim of fresh or sufficient global heap.

P2. Comparator is unsigned descending (hi at +16, lo at +8), comparing hi first; index at +0 is payload. Sorting and movement preserve the entire record. This established comparator is imported from the copied prior report. No recipient/account data is consumed here.

P3. CALL 42160, for positive k<=C, input [A,A+24*k), scratch [S,S+24*C), depth d=2*floor(log2(k)), predecessor argument zero, returns a stable descending permutation, stays within these extents, preserves ABI and terminates. The eager call at 39864 instead passes d=0 and k<=32, and requires the corresponding small-sort contract. **These contracts are unproven here**: recursive predecessor, fallback, leaf bounds and dual-ended merge are assigned elsewhere. This report proves the scheduler supplies their extents, capacity and depth; it does not prove their bodies. No body of window 61 is consumed.

P4. CALL 743376 implements nonoverlapping byte copy for the requested count (including zero), preserves ABI, and returns without other memory effects. Its import/system implementation is not proved here.

P5. The run-discovery block [39664,41152) returns a positive k<=n-x for a nonempty suffix, preserves all records and returns either a sorted run or an unsorted run with k<=M. Sorted natural runs preserve equal-record order (strict ascending reversal); this local contract is established in the prior report but retained as an imported boundary here. Its eager call is covered by P3. At EOF it returns the empty sentinel through 39688..39712. M is min(ceil(n/2),64) for n<=4096, otherwise floor((2^b+floor(n/2^b))/2), b=floor(bit_length(n)/2), from window 436. The sizing formula is imported, with exact listing retained; its capacity consequence is proved below.

## State and invariant

Use E[i]=u64[fp-600+8*i], P[i]=u8[fp-66+i]. E encodes 2*L+s, s in {0,1}; L=E>>1. Bit zero means sorting deferred, not known to be out of order. At 39664 let x=r4, h=r8 and current Ecur=r5. E[0]=1 is a zero-length sorted sentinel after initialization. Real stored runs occupy indices 1..h-1; the current run ends at x. The stored real runs followed by current form disjoint adjacent intervals covering [0,x). The current run is empty only during initial discovery (x=h=0); every subsequent real run is positive. Each run is a stable permutation of its original interval; s=1 additionally certifies sortedness. Every s=0 run has length <=C.

At 41152 the newly discovered next run N lies in [x,x+k), separately from the prefix. Its encoding is saved at fp-696. At the merge loop, x stays fixed: only runs ending at x collapse. The next run is never accidentally merged early. fp-672=x, fp-704=n, fp-688=B, fp-616=S, fp-624=C. fp-640=B+24*x and fp-712=B+24*x-24 bound forward/backward merge output; these are initialized at [41624,41672) before a merge. The current run's immediately preceding run has length a, current has length b; therefore a+b<=x and start A=B+24*(x-a-b).

Priorities P[1]..P[h-1] are strictly increasing, each in [0,63]. P[0] is unused in comparisons. The register r8 is reused inside merging; r7 is the remaining top index and saved at fp-656 across calls. This distinction is necessary: r8 is not a live stack count throughout the whole window.

## Instruction ledger and inductive transitions

| Byte range | Transfer and invariant consequence |
|---|---|
| [36800,37096) | Save B,n,S,C,e. Set q=floor((n+2^62-1)/n)=ceil(2^62/n), x=0, Ecur=1, h=0. Set base-minus-one-record and scanning pointers. |
| [39664,39720) | Save x. Set next encoding to 1 and priority to 0 before EOF branch. If x<n, discover the next run; otherwise go to 41616 with sentinel priority 0. |
| [41152,41256) | Save next E; set u=2*x-Lcur, v=2*x+Lnext. Compute z=(q*u) XOR (q*v). The arithmetic uses lengths, not encoded values. |
| [41256,41616) | Priority p=clz64(z), with z=0 giving 64. Successive OR-shifts spread the highest set bit downwards; complement and SWAR population count count the leading zeros. For nonterminal valid states z is nonzero, hence p<=63. |
| [41616,41704) | If h<2, store without reading a prior priority. Otherwise save end pointers and p, set r7=h, enter pop loop. |
| [37488,37544) | Decrement r7 to preceding stack index j. Read P[j]. If P[j]<p, stop: insert current at index j+1 (the saved predecrement r1). Otherwise consume E[j]. Index 0 is never compared. |
| [37544,37648) | Store p and current E at the same index. Reload n. If x<n advance with saved next run; otherwise go to final branch. |
| [37648,37792) | Load left E, decode a=r8 and b=r6, t=a+b. If t<=C and both low bits are zero, go to 39536: deferred concatenation, no data movement. Otherwise prepare sorting/merge. |
| [37792,37912) | Derive A=B+24*(x-t), save t, both encodings and j. If left sorted, skip its sort. |
| [37912,38392) | Compute left depth 2*floor(log2(a)); outgoing slots fp-4096=depth, fp-4088=0. CALL 42160 at 38336 gets (A,a,S,C,fp). Restore scheduler state. Only an unsorted positive left run reaches this call, so a<=C. |
| [38392,38920) | If right unsorted, CALL 42160 at 38864 with (A+24*a,b,S,C,fp), depth 2*floor(log2(b)), predecessor zero. b<=C. Restore state. |
| [38920,38976) | Empty-run and capacity skip edges converge to sorted result. For real merges both encodings>=2, so empty skips are unreachable. min(a,b)<=floor((a+b)/2)<=floor(n/2)<=C, so capacity skip is also unreachable under P0/P1. |
| [38976,39136) | Copy exactly 24*min(a,b) bytes to S via 39072. If b<a copy right [A+24*a,A+24*(a+b)); else copy left [A,A+24*a). Select backward or forward merge respectively. |
| [39136,39480), [39552,39608), [37104,37488) | One-ended merges described below. Finish by restoring x,p,j,t; no next-run records are touched. |
| [39480,39536) | Encode merged run 2*t+1. If j>1 continue popping from j-1; otherwise store at index 1. Sorted union follows P3/P4 and the one-ended merge argument. |
| [39536,39552) | Encode 2*t without sorting only if both runs were deferred and t<=C. Preserves deferred-length invariant. Join the common pop/store continuation. |
| [39608,39664) | Load saved next encoding, advance x by its decoded length, set h=stored_index+1 and current=next. Because next covered [old_x,old_x+k), prefix coverage extends exactly to new x. |
| [41704,41720) | Test current low bit. Sorted exits at 42152; deferred continues to whole-input sort. EOF collapse proves current represents [0,n), as below. |
| [41720,42160) | Compute depth 2*floor(log2(n)), predecessor zero; CALL 42160 at 42144 gets (B,n,S,C,fp), then return. Deferred-length invariant implies n<=C. |

Every interval here refers to the retained listings; `result.json` contains the corresponding raw range hashes and instruction coverage. The ledger covers both assigned ranges in full. Extra boundary ranges are necessary to identify the next run, terminal state and outgoing final call.

## Arithmetic, capacity and stack bounds

No encoded length overflows: L<=n<2^59 under P0, hence 2*L+1<2^60. All represented byte extents are subsets of the valid input span. The bit-depth idiom spreads the bits of positive L, complements, and counts c=clz(L). Its final `(2*c) XOR 126` equals 2*(63-c)=2*floor(log2(L)) for c in [0,63]. The `& -2` before counting changes nothing because the complemented spread has low bit zero. This proof applies to the three depth sites, not to arbitrary zero lengths; no such zero sort call is reachable.

Initial deferred runs fit C. For n<=4096, M<=64<=C (C=85 for small n and C>=n for 86..4096). For n>4096, b>=6; writing 2^(2*b-1)<=n<2^(2*b+2) is sufficient, and 2^b<=n/2 and floor(n/2^b)<=floor(n/2) hold. Thus M<=floor(n/2)<=C. A sharper characterization is unnecessary. Eager lengths <=32 fit C. Only deferred/deferred concatenation can create a larger deferred run, and its explicit t<=C guard preserves the invariant. Sorted runs may exceed C; they are never sent to 42160 by this scheduler.

For priorities, 0<=u<v<=2*n for every nonterminal boundary, including the initial sentinel where u=0 and v=Lnext>0. q>0, and q*2*n < 2^63+2*n <2^64 under P0. Thus multiplication is exact, qu<qv, z!=0, and p is in [0,63]. The SWAR count in [41272,41608) counts at most 63 complement bits for this nonzero z, so the top-byte sum is exact. The z=0 arm is unreachable here; EOF does not use this arithmetic and supplies p=0 directly.

Push induction: if h<2 there is no real stored priority, and writing index 0 or 1 is safe. Otherwise pop every top priority >=p, then store after the first priority <p, or at index 1 if all real runs collapsed. Hence the stored real priorities remain strictly increasing. Since [0,63] has 64 values, at most 64 real priorities are stored. The largest write is index 64, and next discovery can have h=65 (64 stored real runs plus current). It must pop at least once before any further push: a 65th strictly increasing value in [0,63] is impossible. No priority at index 65 is read or written.

Consequently all E accesses lie in [fp-600,fp-80), indices 0..64 (520 bytes), and all P accesses lie in [fp-66,fp-1), indices 0..64 (65 bytes). These are proven maximum accessed spans, not asserted original array declarations. They are disjoint, with a 14-byte gap; local spills are at/below fp-608 and do not overlap them. Pop reads only indices >=1. A transient h=65 is a count, not an array access. Outgoing argument stores [fp-4096,fp-4080) are separate and require the ABI frame contract P0. No merge balance, optimality or historical algorithm name is needed for these bounds.

Termination of scheduler control follows two measures: every discovery consumes positive k, so x increases toward n; within a collapse phase each merge decreases the real-run count and x is unchanged. Callee and discovery termination remain P3/P5. The final EOF phase sets p=0, which is <= every stored real priority. It therefore collapses all real entries into current at index 1; h=1 also takes this store directly. Since x=n and the sentinel contributes no records, current has length n. The next encoding 1 is not advanced because 37632 takes the final edge. Sorted low bit returns the whole sorted prefix; deferred low bit invokes precisely the entire [B,B+24*n) span, with n<=C. This proves the meaning of 41704, conditional on the stated sorting contracts.

## One-ended merge extents and preservation

These are the inline scheduler merges, not window 61's dual-ended merge. Let t=a+b, A=B+24*(x-t), D=A+24*t. Both runs are positive and sorted after optional calls. The left/scratch tie wins at the forward end; the right/scratch tie wins at the backward end, using the established unsigned comparator.

If a<=b, [39552,39608) starts output O=A, scratch cursor Q=S, right cursor R=A+24*a, scratch end S+24*a and right end D. Each iteration [37280,37488) selects exactly one source; [37104,37216) copies all three words, advances O by 24 and exactly the selected cursor by 24. In record units, R-O=remaining_scratch. Until scratch exhausts this gap is positive, so a store cannot overwrite unread right input. Exhaustion tests occur before the next comparator. If scratch empties, remaining right records are already in their final places (O=R); copy size is zero. If right empties first, [37216,37232) copies the remaining scratch suffix to O. Its length is exactly the remaining output extent, nonoverlapping by P0. Input and scratch read extents never exceed their respective runs.

If b<a, [39112,39136) starts output at D-24, exclusive left end L=A+24*a, exclusive scratch end Q=S+24*b. Each [39264,39480) selects the smaller end element for the last output position, equality selecting right scratch. It first subtracts 24 from both cursors, then [39184,39216) adds 24 back to precisely the unselected cursor. Thus exactly one end element is consumed. In exclusive-end record coordinates Oend-L=remaining_scratch; while scratch remains, the output lies strictly after every unread left element. The actual record is loaded completely before the next iteration. Left exhaustion [39232] jumps to tail copy with r1=A, r2=S, r3=remaining scratch end: the remaining prefix fits [A,current output end). Scratch exhaustion [39256] requests zero tail copy; remaining left records are already placed. Only the nonterminal path decrements the output cursor for another comparison. No read occurs after either required source exhausts.

Both directions consume one complete record per iteration and preserve order within each run; the tie polarity makes their union stable. Scratch receives exactly the smaller run (24*min(a,b)<=24*C). No dual-ended state, pivot or recursive partition is used in this proof.

## Remaining obligations and verification scope

This closes the scheduler's interval partition, capacity, extent, stack-bound and final-result composition argument under P0..P5. It does **not** discharge P3's stable-permutation/termination/memory contract or P5's imported discovery proof, allocator/admission validity in P0/P1, the arithmetic helper sizing formula, or the external memcpy contract. The next substantive prerequisite for an unconditional all-record result is the separately owned CALL 42160 contract with exactly the entry conditions listed here, plus checked acceptance of these imports. Hash verification is not that proof. A weaker caller-capacity premise would leave the 38968 skip edge unsound as a sortedness proof, so C>=floor(n/2) must not be dropped.

`python3 -B verify.py` from any copied directory checks exact file set and SHA256, reconstructs Git blob IDs, matches every retained listing's instruction bytes to the frozen ELF, validates decoded branch/call destinations against listing text, checks range witnesses/ledger coverage and the selected copied inputs against the prior seal. It performs no target execution, sort simulation, fixtures, builds or theorem proving. The copied-directory receipt is outside this seal. No excluded lane, private audit, telemetry, credentials or mutable log is included.
