# Relay shared checks and arithmetic: static continuation

The six assigned windows now have a byte-backed call, branch, memory-operand and data-reference ledger. The strongest new result is the arithmetic distinction between ordinal112's checked-u64 multiplication **before division** and ordinal113's wide-product floor/remainder computation. Small-sort remainder ordering is recoverable; full handler semantics and the larger sort's tie contract are not claimed.

**All 492 inferred windows retain unresolved original-source identity.** No source-built relay candidate, whole-byte equality, exhaustive security result or new runtime comparison is claimed. The accepted implementation checkpoint remains `8099031` (Pump92575cd, Fees e501ca2, AMM5a68db, Mayhem9e4e19). The copied dependency inventory is the earlier baseline; it is not refreshed Pump/Fees candidate evidence. Prior worker outputs remain unchanged.

Only existing evidence and analytical Python were used. No builds, Rust/SBF execution or emulation, runtime probes, network/chain activity, transfers, Token/Jupiter implementation, private audit material, workers, commits or publication were performed. Publication belongs to the parent. Mutable worker telemetry is excluded from the bundle.

## Evidence convention and coverage

All PCs/ranges are decimal half-open ELF file offsets. This ELF has equal text virtual addresses and file offsets. Captured ELF: 830448 bytes, SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. Original bytes are preserved unchanged in `inputs/deployed.so`. `manifest.json` seals every publication input, script, report, sketch and ledger, excluding the manifest itself and the later verification receipt. `witnesses.json` provides exact ranges, hashes and bytes for semantic landmarks.

`roots.json` records every direct/external/indirect call and every branch/data reference for the six roots. There are 130 direct call sites and two external abort sites. `helper-ledger.json` includes all recursively reachable direct-call windows, every call site with preceding context, every memory load/store operand, and every direct file-address reference. `disassembly/` contains complete byte-bearing instruction listings for that closure. This is complete **direct-call enumeration**, not complete interprocedural semantics: seven indirect sites remain in that closure. Dynamic pointed-to data and invocation-boundary effects are explicitly unresolved; local call context is not a complete argument proof. Full raw ELF preservation prevents loss of referenced static bytes but is not a claim that every consumed extent has been identified.

## Assigned windows

| Ordinal | Range | Local result and consumed inputs |
|---|---|---|
|104|[114032,114568)|Unsigned entry r3 <256; success tag2 written to output at entry r1. Otherwise builds IDL error6009 InvalidMessageLength. Entry r2 is carried as success payload; this sketch does not assign it a source type.|
|105|[114568,115456)|Loads pointer from [entry r2+0], copies its32 bytes, compares against [752896,752928) using475/sol_memcmp_. Zero comparison is success tag2; nonzero builds6015 SignerIsNotRelayer with compared-key payload. No signer/authentication semantics inferred from this comparison alone.|
|107|[118896,119440)|Masks entry r2 to low16 bits, accepts <=10000, otherwise6018 InvalidBps. Entry r3 is carried on success.|
|112|[131136,141384)|Message-length check104 precedes bps check107. Conditional arithmetic tail checks balance difference, product fit and accumulator fit, then floors division. Surrounding account checks/calls remain boundary evidence.|
|108|[119440,127704)|Copies input records, checks key/program relation and available count, extracts u16 weights at offset32 of36-byte records, passes total/weights/count into113, propagates its error sentinel. Subsequent invocation/recipient effects are not reconstructed.|
|113|[141384,143608)|Empty-list shortcut; allocation; wide products /10000; floor-sum checks; remainder records; sort and at-most-one leftover increment per selected index. Raw ABI/allocator and larger-sort contract remain incomplete.|

104/107 each directly call114,116,284 and406 on error/formatting paths. 105 additionally calls475 for comparison and287 for compared keys. The complete larger call lists are in `roots.json`; no calls were removed because their inferred role seemed incidental. 114's string/error-name selection, 116's formatter indirect call, 284/287 error representation, 406 panic formatting and allocator paths are retained dependencies, not reimplemented Rust errors.

## Checks and precedence

In112, entry r3 is saved as r9; its +16 u64 feeds104 at131256. Only success tag2 at131272 permits loading its +64 u16 and calling107 at131320. A failing104 therefore takes precedence over failing107 on this entry path. Both precede later pointer/refcount operations. This does not establish precedence against caller validation before112.

104 tests at114048 and stores6009 at114368. 107 masks/tests at118912/118920 and stores6018 at119240. 105 compares at114688, branches on the low32-bit result at114720 and stores6015 at115040. Fixed key extent and hash are in `witnesses.json`. The IDL supplies names; literal error numbers and predicates are independently present in bytes. Helper115 adds6000 at152360 to its enum argument, establishing enum8 ->6008 ArithmeticOverflow. Allocation/formatting can fail before error delivery; these fragments model only the business arithmetic result.

108's initial comparison is set up at119824–119944; inequality goes to the6025 construction at120104, before the available-count comparison at120032 and enum30 construction at120064 (6030 by115). Counts and input values are memory/register facts rather than verified original Rust field identities. At121272–121640, count is read from entry argument3+8, total from argument3+32, and the source record pointer from argument3+0. Nonempty records contribute u16[record+32], advancing36 bytes per record. The extracted contiguous u16 slice and count feed113. The result sentinel `0x8000000000000000` is checked at121688 and propagated at121704–121736. No weight-sum validation is asserted for this local path.

## Donation arithmetic tail112

This is conditional on the preceding helper at140752 and its result check at140800, and on earlier account/invocation work succeeding. It does not implement those operations.

1. At140808–140848, `after = stack[-416]`, `before = stack[-944]`; `after < before` branches to enum8 at141048. Otherwise delta=after-before.
2. At140856–140952, multiply delta by bps retained at stack[-976], using490 ->483. High product limb nonzero branches to enum8 at140976. The input bps originated at131288, was checked by107 and stored at131584. The multiply helper computes a full128-bit product; this caller explicitly rejects a nonzero high64 limb.
3. At141088–141192, load accumulated from `*(*(entry_arg2+8)+72)`. Unsigned wrap in accumulated+delta selects enum8 at141216; otherwise write updated accumulated at141184. Thus this local write occurs after the product-fit check and before division.
4. At141256, divide the low product by10000 (unsigned floor), then store quotient at output+32 and delta at output+24. Other output fields are copied from surrounding state and are not assigned domain names here.

The order is **subtraction underflow -> product overflow -> accumulator overflow -> division**. It is not equivalent to an unlimited-u128 multiplication followed by floor/narrow. For bps=10000 the largest admitted delta under the product check is1844674407370955; delta1844674407370956 would have a mathematically fitting final quotient but hits the product-overflow branch. This is a mathematical consequence of the byte predicate, not a runtime observation or security finding.

## Distribution core113 and helper chain

Entry r1 is result storage, r2 total, r3 pointer to u16 weights, r4 count. Zero count at141400 returns the three words [0,8,0] without checking total. For nonempty input, allocation guards and bump-allocator operations precede arithmetic: count*8 and count*24 capacities, upper-bound/overflow and allocation-error calls382 at141928/141960. Helpers68 and69 remain possible vector growth paths. The scratch fragment assumes successful allocations and accessible buffers.

For each weight, [142352,142408) calls490 with `(weight,0,total,0)` as two limbs per operand. 490 [752688,752760) calls483 [751104,751456), whose32-bit partial products/carries assemble the low128-bit product. For u16*u64 it is exact. At142472,480 calls479 [743872,749088) for quotient/remainder; divisor limbs are10000,0. The special small-denominator paths at745208–745272 and745536–745840 use unsigned divisions and successive32-bit limbs. The general long-division path is preserved but not needed for this fixed positive divisor.

At142496–142536 the quotient low limb is saved as the share and the full quotient is multiplied by10000. Subtracting that product from the original product at142904–142928 gives the remainder with explicit borrow. The quotient **high limb is not separately rejected here**; the scratch model restricts weights<=10000 so quotient<=total<=u64::MAX. No behavior claim for out-of-domain weights is hidden in the sketch.

Records hold [input_index, remainder_low64, remainder_high64] in24 bytes, written at142976–142992. A checked floor-sum addition at142848–143048 precedes the next iteration. After the loop, sum>total errors at143080/143200; sum==total returns without sorting. Otherwise leftover=total-sum. It sorts only when count>=2; counts2..20 call58 at143296, counts>=21 call59 at143160. 59 calls60 and other helpers retained in the ledger; its full tie behavior is left unresolved.

Small sorter58 compares high then low remainder limbs in descending unsigned order. At36072–36144, already greater-or-equal pairs stay in place; backward shifts at35864–35944 occur only for strictly smaller predecessors. Equal remainders retain input order for this small path. Index is moved as payload rather than used as a comparison key.

At143320–143336, increment count=min(leftover,recipient_count). At143368–143464, each selected record indexes the original output vector; index bounds lead to405, and max-u64 amount leads to enum8 at143544. Each selected output is incremented once. This local core neither repeatedly cycles over recipients nor enforces sum(weights)==10000. With valid normalized weights, the usual floor/remainder argument gives conservation, but malformed or unnormalized admission is outside this study. Empty/non-normalized behavior must not be silently replaced by an idealized fair-allocation algorithm.

## Portable verification and remaining work

Run `python3 -B verify.py` inside a copy of this publication directory. It verifies manifest hashes, re-derives all492 windows from ELF calls/relocations, checks every baseline hash, re-derives the closure and all ledgers/witnesses, and checks every generated disassembly. It does not build, execute or emulate the program; handwritten semantic conclusions remain reviewable rather than machine-proven. `verification.json` is produced by the copied-directory run.

`fragments.rs` contains only supported local checks, the donation tail and the restricted small distribution model. It has no transfers or invocations. It is uncompiled, and does not preserve Anchor result/error representation, allocations, panics or lifecycle effects. Missing evidence remains: original source/function boundaries, complete indirect target resolution and pointee consumption, all caller preconditions, large-sort tie behavior, full error ABI/resource precedence, and full invocation effects. All492 source identities remain unresolved.
