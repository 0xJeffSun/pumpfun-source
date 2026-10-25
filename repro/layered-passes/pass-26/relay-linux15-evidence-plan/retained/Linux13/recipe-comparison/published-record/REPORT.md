# Relay13 saved recipe comparison: selected v1.44 versus measured Linux v1.48

The unchanged `reference-build12-analyze.py` method independently recomputes the prior selected Relay13 candidate at122 normalized target windows,33 raw windows and370 unmatched, versus actual Linux13 at225 normalized,58 raw and267 unmatched. All122 previous normalized matches and33 previous raw matches remain. There are103 normalized gains,25 raw gains and no losses under this method. This is a static comparison of saved artifacts, not a new build, runtime result, candidate selection or attribution to compiler version alone.

## Exact comparison and retained negatives

| Target status before → after | Windows |
|---|---:|
| Unmatched → unmatched |267|
| Unmatched → normalized shape only |83|
| Unmatched → raw body |20|
| Normalized shape only → normalized shape only |84|
| Normalized shape only → raw body |5|
| Raw body → raw body |33|

Normalized includes raw. The25 raw gains comprise20 previously unmatched windows and5 upgrades from normalized shape. All492 original inferred windows, their complete candidate alternatives, raw/normalized hashes, calls, relocations, bounded data references, ambiguous matches, negative rows and coverage are retained in both complete compressed method outputs. `transitions.json.gz` records all492 target rows, including before/after candidate symbol names, bounds and closure limits; `transition-table.tsv` is a compact complete status table. Indices and positions are artifact-specific, not function semantics or semantic distance.

Prior candidate SHA256 `e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244` is473688bytes; its complete unstripped artifact SHA256 `2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596` supplies330 distinct function windows. Actual Linux13 candidate SHA256 `506b11353f8eb15d079794656eaf6c10d1a8da2c50d2e90cbdbe949a3ecdd0fb` is501576bytes; symbols artifact `8a451b77cfe634bc0628209c96457c7a68524c6d4fcfbffc6cce9d8a67d669ac` supplies344windows. Both compare the same830448byte original `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563` and the same492 saved inferred bounds.

## What the newly matched candidate names support

The103 normalized gains have candidate-spelling categories44 `core` prefixes,24 `alloc` prefixes,19 trait/type spellings containing Rust library paths,15 other symbols and1 `donation_relay_source_proposal` symbol. These categories come only from matched candidate symbols, not original names. They are intentionally coarse spelling labels, not a reconstruction of original crate ownership, monomorphized types or source. Every actual mangled name and all alternatives remain in the transition records.

Examples, identified by target byte window rather than inferred original symbol:

| Original start / complete bytes | Actual matched candidate name | Result / boundary |
|---|---|---|
|4192 /712|`generated_exit::exit_error::Error::with_account_name`|Normalized shape, closed direct-call shape;1 bounded data reference differs. Candidate name only.|
|36192 /608|`core::slice::sort::stable::driftsort_main`|Normalized shape,3 direct calls shape-closed;1 bounded data reference differs.|
|721496 /1128|`core::fmt::write`|Full raw body;5 indirect calls remain unresolved.|
|735760 /704|`core::unicode::printable::check`|Normalized shape,3 direct calls shape-closed;3 bounded data samples differ.|
|736464 /696|`core::unicode::printable::is_printable`|Normalized shape,1 direct call shape-closed;6 bounded samples equal, without complete object-extent proof.|
|751104 /352|`compiler_builtins::int::mul::Mul::mul`|Full raw body, no direct/indirect calls or data references.|
|752688 /72|`__multi3`, plus2 other normalized alternatives|Only actual `__multi3` candidate439736 has recursively closed direct-call shape; `__lshrti3` and `__ashlti3` alternatives fail that constraint. All3 alternatives retained.|

The final row illustrates why full body shape alone must not assign original names. The same3 normalized wrapper alternatives appear at other72byte original windows; different actual callees survive. No substring-only result is substituted for a complete body. The whole target-body ledger remains267 windows unmatched, not silently omitted.

## Method and causation limits

The copied method is byte-identical to the saved reference method SHA256 `095fc2d63be0fe4233bdf4e5946cac8d03d9b1747fd39147eea9a98c12dda175`, also used by the measured Linux driver. It compares complete original inferred windows with complete candidate STT_FUNC windows, requires complete `.text` coverage for each artifact and confirms all allocated stripped sections equal their unstripped sections. Normalization zeros relative direct-call displacements and relocated LDDW immediates. It retains actual direct-call targets and computes greatest-fixed-point normalized direct-call-shape closure; the before/after counts of closed pairs are167/307. Those are pairs, not target windows or semantic proofs. The total candidate alternatives are377/456 pairs.

Relocation normalization permits data-pointer differences. Bounded samples are at most64bytes and explicitly do not prove complete object extents. Fixed-point direct-call closure does not establish indirect calls, full data graphs, runtime ABI or behavior. External-call relocation records remain in the full function ledgers; this packet does not independently claim a complete dynamic/external call closure. Original bounds remain inferred; named candidate symbols do not retrospectively name original functions. Full raw body equality is code equality within that body, not whole-program or runtime equivalence.

All23 selected source inputs, including manifest and lock, have identical bytes in the two saved source trees and are individually rehashed by the verifier. The selected-v1.44 and actual Linux-v1.48 recipes nevertheless differ in compiler/tool distributions, OS/native environment, stripping and cache/build context. Source equality does not establish an identical Cargo unit graph, exact historical invocation or same full recipe. These results therefore establish a measured recipe-associated improvement under one analysis method, not version-only causation, a unique historical compiler, source percentage, or equivalence with the capture.

The method's whole-file positional differing-byte counts increase259384→274442 while normalized window matches improve. Layout shifts and file lengths affect positional metrics; those counts and section positions are retained solely as byte facts and must not be read as semantic distance or regression.

## Reproduction and scope

`python3 -B verify.py --repo /absolute/path/to/pr8-review` uses standard-library saved-byte analysis only. It rehashes all referenced binaries/method/source inputs, recomputes both complete method outputs, compares every actual Linux result with the hosted saved full ledger, reconstructs every transition and verifies the source23 equality. `input-references.json` pins the existing source/evidence paths; binaries are referenced rather than duplicated. The two complete ledger directories use `.gz` for every JSON output (including residuals). Prior selected source/binary/evidence and all older packets remain immutable.

No compiler, SDK, VM, build, network, probe or target code was executed. No selection/current source/lock/status was edited; Linux13 remains unselected. Existing runtime claims, if any, are outside this packet and are not transferred between artifacts.
