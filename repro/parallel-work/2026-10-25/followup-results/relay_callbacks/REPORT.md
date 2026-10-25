# Relay callback constructions and ordinary arithmetic error fragment

This package closes **725720 → 713040 in one explicit argument-record context**, derives the actual object/table transfer for both nested407 sites, and closes the no-op cleanup calls for an unchanged ordinary arithmetic-error object. The two407 sites remain parametric: no concrete originating caller that both sets the underlying table and reaches the alternate-format branch is established here. This is a partial callback result, not all-context closure.

No original source was modified. `fragment.txt` is reviewable byte-level pseudocode, not invented Rust, a patch, or promoted source. No builds, target execution, fixtures, probes, relocation application, binary edits, chain calls, workers, commits or pushes occurred. Window ordinals are inferred boundaries, not historical identities. All ranges below are decimal half-open ELF offsets.

## Authority and retained inputs

The fixed checkpoint is `517d77db988d8c63b6cf476f0be138c5a4f3128a`. The relay ELF has SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563` and Git blob `ee966e35883678341e4c964741f512e7fb7bc320`. `provenance.json` records complete SHA256, sizes and Git blob IDs for frozen inputs. The two root-reviewed public predecessor reports and their original seals are copied exactly; the math result/provenance are also retained. Pending public-package files have no invented checkpoint Git attribution. Their seal membership is checked only for the selected copied members, not claimed for omitted package contents.

All evidence is relay-only. No excluded body or private input was opened. Prior inventory baselines do not override the assignment: current Pump/Fees differ, AMM/Mayhem unchanged, all four original whole-file comparisons false, and the 140 bounded/five partial/five unrecovered count is unchanged.

## 427: an actual record and formatter construction

Window288's no-origin branch builds three16-byte records at frame-240 through frame-192, [653320,653584):

| Index | Value pointer | Callback |
|---|---|---|
|0|entry_object+32|648672|
|1|frame-56 (conversion result)|741160|
|2|entry_object+32|690744 (window336)|

The 48-byte argument descriptor at frame-128 contains pieces775056, piece count4, record pointer frame-240, record count3 and format pointer0. The unused format-count word is not initialized or consumed on this simple path. At653616 it calls387 with this descriptor. At[712648,712720),387 creates a three-word append object at its frame-32 and passes table **778488** to422. At[721496,721544),422 embeds that exact object/table into formatter+32/+40. At721744, record2 calls690744 with r1=entry_object+32 and r2=this formatter. This is a producer-to-consumer proof, not a match between similar table shapes.

For the selected subcontext `u64[entry_object+32] = 0x8000000000000018`,336's [690744,691344) selector reaches[692040,692080), supplies pointer767621,length20 and calls427 at692376. The consumed value extent is exactly[object+32,object+40). The literal is the complete [767621,767641), `Account is immutable`, without a terminator.427 loads formatter+32/+40 and table+24 at[725688,725728). The actual type8 relocation at778512 encodes **713040**, so the singleton points-to set for725720 in this context is `{713040}`. This is a local invocation context, conditional on preceding callbacks/allocation returning; handler admission of that input is not proved.

713040 appends the20 bytes, reserving through711144 if necessary, copying through743376, advancing the length, then returning0 at713208.427 returns the callback's r0 unchanged;336 returns it unchanged at692384.422 maps any nonzero callback result to1 at722608 and returns0 only on full success.387 turns nonzero422 into its716352 failure path at[712920,713000); it does not return a completed ordinary buffer on that path.

The complete four descriptor records[775056,775120), all their relocation records, and all four literal pointee extents are in `static-evidence.json.descriptor_arrays`. Record0/1 formatting and allocation failure remain transitive boundaries; this selected callback proof does not certify their consumed data or success. In particular this generic error formatter is not being renamed as the custom arithmetic constructor115.

## 407: exact caller-specific transfer, still not concrete originating targets

Let W(t) mean the encoded callback in table slot t+24, subject to the retained relocation encoding. The constructions are:

| Actual constructor context | Object passed to407 | Two site target sets |
|---|---|---|
|410, direct calls718432/718488|frame-96 = `[old_formatter.+32, old_formatter.+40, &frame[-65]]`|`{W(old_formatter.+40)}` at717224 and717408|
|410, nested formatter passed at718544|new formatter frame-64 has +32=frame-96,+40=778896|outer writer resolves716584; its two sites retain the same underlying set|
|413, nested formatter passed at719520 and final write719584|frame-96 stores the old object/table and state pointer; frame-64 installs778896|outer writer resolves716584; both inner sites retain `{W(old_formatter.+40)}`|

Construction witnesses are[718200,718552) and[719264,719592). At[716624,716672),407 saves object+8 (underlying table), object+0 (underlying object), object+16 (state pointer). Both[717168,717232) and[717376,717416) fetch that saved table+24. **Neither loads778896 merely because the surrounding formatter used it.** The relocation at778920 proves the outer wrapper target716584, not the nested sink.

The finite *conditional substitutions* are772792→50616,774912→647008,778488→713040,778896→716584, each backed by its exact relocation record. These are not an exhaustive points-to set, nor proof that all four reach either407 site.410 requires old formatter flags+52 bit4 and no prior error;413 likewise uses bit4 to select its wrapper path. The concrete288→387→422 context above initializes flags+52=0 (the u64 store32 at721520), so it cannot supply a reachable407 witness through413's alternate branch. Constructor115 likewise initializes those flags to0 and calls116 directly. In that ordinary construction path all three assigned sites are unreachable: its actual writer is153936→50616.

For407 the full object metadata read is[O,O+24), the state pointee is one byte, and the selected underlying table slot is[t+24,t+32).717224 forwards the entire four-space literal[754652,754656) only when the state is nonzero.717408 forwards a segment of the incoming pointer/length, including its terminating newline when present. The byte at incoming_pointer+segment_end-1 is read only when end!=start. Before717408 the state byte is set according to that last byte. A nonzero sink result is normalized to1 and returned immediately; successful chunks loop and eventual success returns0. Failure does not roll back the already-written state byte. Input scanning may call729480 for spans>15; its internal read footprint is an explicit unclosed boundary here. Dynamic incoming bytes are not invented or copied from accounts.

Concrete next prerequisite: provide/trace an actual upstream format record setting bit4, its argument callback/vtable, and a fixed old formatter table through431/413 or429/410. The constructor equations above identify exactly which inherited field must be grounded. No all-context claim or fabricated originating witness replaces that missing proof.

## Ordinary arithmetic construction and cleanup

`fragment.txt` gives an auditable normal-return construction with explicit unknown bytes.115 stores enum8 and calls114. Its selector reaches[146464,146624), reserving18 bytes;[149304,149400) constructs the entire `ArithmeticOverflow` from two8-byte immediates and a2-byte suffix. The returned words are[18,pointer,18] at[152016,152048). The message is independently the entire19-byte[755544,755563), `Arithmetic overflow`, routed by116 to50616 using the real772792 table. Failure at152256 goes to716352, not an ordinary6008 result.

On success115's160-byte source record at R=frame-280 defines:

| Offset | Defined bytes |
|---|---|
|0..8|u64 tag2|
|32..56|name capacity18,pointer,length18|
|56..80|message capacity,pointer,length19|
|80|byte tag2|
|152..156|u32 code6008|

The rest is unspecified by this fragment, **not zero padding**.284 allocates160 with alignment8 and copies the complete160-byte record at[652448,652480), including those unspecified bytes. It returns `[0,allocation_pointer]`, and115 copies both words to its output at[152432,152464). Thus a faithful ordinary fragment cannot claim a fully initialized portable Rust structure from the observed fields alone.

The unmodified pair's tag0 consumer at657016 writes `u64 out+0 = 0x8000000000000000` and `u32 out+8 = object.code` **before cleanup** at[657040,657080). It tests name capacity at+32 and message capacity at+56 and conditionally calls566680 with their pointers at+40/+64. Tag2 at+0 skips origin-owned fields; byte2 at+80 skips compared-value fields; the final call is566680(object,160,8) at657632. All these calls target exactly[566680,566688), a single `exit`. They read no allocation pointee and write no allocator state. This closes the selected cleanup calls as no-ops; calling them deallocation that reclaims storage would be incorrect. No indirect drop occurs on this unchanged tag0/2/2 path. The destination+12..+16 is not written here, and r0 is not its output contract.

The complete local dynamic read extents for this cleanup specialization are P+[0,8),[32,48),[56,72),[80,81),[152,156); pointer words are read only when their capacities are nonzero. Payload pointees are not read by566680. Pointer validity/allocation success remain prerequisites.566472's[566472,566680) body is a descending heap allocator, with alignment masking and a lower bound; its mutable heap-state word is at12884901888. This does not establish allocator failure/panic semantics. The allocation itself and heap contents are not runtime observations.

Dispatcher[516136,516208) logs before invoking657016. Logging may allocate/fail and callers may replace metadata, so this fragment does not prove an uninterrupted handler-to-final-return route. It closes ordinary construction and the selected unchanged-object cleanup, not all logging, all error variants, or resource exhaustion. The no-origin logger's full literal descriptor array[775328,775392) and its pointees are additionally retained to bound that next step; its argument callbacks remain a frontier.

## Verification and limitations

Run `python3 -B verify.py` from any copy. It checks the exact file set and hashes, frozen Git blob identities, copied public seal membership, rederived relocations/literals/descriptor pointees/name stores, and byte-bearing listings. It does not execute the relay or prove the handwritten dataflow. `result.json` marks each context as concrete, parametric or unreachable and retains precise outstanding obligations. The copied-directory receipt is outside the seal.

This advances ordinary error construction and one concrete427 context. Original source/build identity, reachable concrete407 origin, all-context callback closure, the scanner's full footprint, formatter/allocation failures, full record padding validity, and full error/logging closure remain unresolved. No source completeness, security certificate, or whole-file equality follows.
