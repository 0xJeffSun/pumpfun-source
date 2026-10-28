# Round37 reserve synchronization: one more complete function

Making the widened numerator addition explicit with `checked_add` recovers the
complete **1,168-byte** `sync_virtual_quote_reserves` helper at original `0xa23f0`.
The current native research source reaches **750/1,035 normalized windows**,
retaining the previous 749 matched windows and exactly the same 131 raw matches.
This ports the arithmetic idea credited to [PR323](https://github.com/lalalune/pumpfun-source/pull/323)
onto maintained Round37 plus [PR338](https://github.com/lalalune/pumpfun-source/pull/338)'s
native Linux recipe. It does not import that older packet's other source changes.

Only one expression changes among the 56 primary source inputs; physical line
counts stay fixed. The accounts, generated types, namespace, errors, event and
other function bodies are unchanged. Both summands are widened `u64` values,
so their sum is at most `2^65 - 2`, below the `u128` limit. The new addition's
failure arm is unreachable for this source domain. Subsequent checked multiply,
divide, narrowing and caps retain their ordering.

The actual compiler output changes in **four bytes total**, for both the complete
symbol ELF and complete stripped ELF. Two adjacent independent stack loads swap
order. Both read aligned valid-frame slots through `r10`, write distinct registers,
and have no branch entering the second instruction. The verifier checks these
preconditions against actual instruction bytes. This is a bounded commutation
argument under valid generated control flow and stack access, not a general
whole-program equivalence theorem. All function extents, remaining machine code,
readonly data, relocation tables, symbols and other file bytes are identical to
the native parent.

The recovered body's nine actual immediate callees independently match their
original complete normalized bodies. It contains no opaque data-pointer operands
under the existing normalizer. Recursive callee/data/indirect-call identity remains
outside this bounded check. The helper is normalized-equal, rather than raw-equal,
because linked call operands still differ from the captured original.

Two actual root compilations reproduce both complete proposed outputs with the
unmodified official Linux v1.44 SDK and locked dependencies:

- Stripped: `782f5e1e89151c191358cb787e8d09a3c887e8424be57f4874b9107d595547a1`
- Symbols: `46ae93c201ef73e0e767cd0df6f5bd6e69771b1ff2085e20933f965d70e12e8f`

The unchanged public synthetic signer-forwarder oracle was run freshly on both
native parent and proposal: **84 cases each, 168 original/candidate comparisons**,
with 82 successes and two rejections per artifact, and zero compared differences.
It compares errors, selected reserve fields, serialized events and its filtered
instruction/error logs. The fixture deliberately loads a signer-forwarder stub at
the Mayhem address; these are synthetic CPIs, not captured-system reachability or
execution by the original Mayhem program. No serialized-signature audit or new
unique case definition is claimed. All raw oracle reports and actual commands are
retained, with unchanged producer and input-file hashes.

```sh
python3 -B research/pump-round37-sync-checked-add/verify.py --controls
```

The Python-standard-library verifier checks both full source snapshots, the exact
source patch, all compiler receipts and SDK bindings, the unchanged normalization,
injective counts, complete-file delta, nine actual call targets and every saved
oracle case. Its controls reject an actual branch into the second swapped load
and an actual wrong call target hidden by ordinary call normalization.

The selected Round37 checkpoint stays at **744/175**; this separate native recipe
has **750/131** and 285 unmatched windows. The SDK archive binding and prior
native-build controls remain credited to PR338. No original binary enters a
compiler/linker, no captured bytes are patched into outputs, and no Source field,
scalar/branch/register mask, padding, SDK library, frozen script/workflow or
progress ledger changes. Whole original ELF identity remains false.
