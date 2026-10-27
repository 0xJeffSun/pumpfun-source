# Fees: safe allocation and named-result causal controls

Source-only research, not a new function recovery or selected checkpoint. These distinct ordinary-Rust controls preserve the locally measured 583/585 normalized and 143 raw-local matches but do not recover Crank or CreateDonation. Whole-binary identity remains false. The public 200-raw ordered-layout recipe is a different checkpoint, not silently composed here.

## Exact prerequisite and separate branches

Use the 48-file reconstructed source snapshot at [PR302's immutable commit](https://github.com/lalalune/pumpfun-source/tree/d6466ed793dd2fa68c23ba1c22c5b26a715e1082/research/fees-causal582-source/source). This packet does not contain a duplicate snapshot or automatically download one. Supply that source directory locally; the materializer rejects missing, extra, altered or symlinked inputs. It does not accept an arbitrary repository root. Each exact stage map binds every source byte.

1. parent → sweep: two-file prerequisite from the attributed [Sweep299](https://github.com/lalalune/pumpfun-source/pull/299) / [qualified301](https://github.com/lalalune/pumpfun-source/pull/301) source composition. This recovery is not our discovery. The exact historical source commits are pinned in source-stages.json. Later #308/#312 revisions are not imported.
2. sweep → event: one Crank source line restores the witnessed key/address event producers, retaining the prior typed try-result handling.
3. event → capacity: two files change. Safe Vec::try_with_capacity(3) plus the pinned compiler's existing library feature replaces the fixed vec constructor. Allocation failure passes the exact fixed-array Layout to handle_alloc_error. Key values are constructed only after allocation succeeds. No application error conversion or project unsafe code is introduced.
4. capacity → box: two files change. Safe Box::try_new_uninit, Box::write and boxed-slice into_vec express owned three-value aggregate initialization. Only the required pinned allocator_api/new_uninit feature gates replace try_with_capacity; no SDK, dependency, optimization or linker edits.
5. sweep → donation: an independent one-file negative control replaces the two-key tuple success type with a named struct, separating field declaration order from initializer evaluation order. It is NOT composed with either Crank allocator control.

Patch application is exact, reversible and zero-fuzz. Every stage preserves its original physical source line count. Named fields have no repr, Drop or Clone implementation; no physical layout is guaranteed. Every formulation is inferred, not historical-source identification.

## Observed local native results; executable evidence not distributed

The safe-capacity Crank control is a causal finding, not a recovered body. It retains 583 normalized/143 raw, 188 measured Locations, and 4,136 positive actual direct edges, full Sweep qualification and prior Donation proofs. Its actual 35-callee multiset equals original, but call order does not. Crank measures 15,832 bytes versus 15,976 original and 15,776 parent. The allocation route matches the intended fixed 102-byte allocation/failure semantics more closely, while the failure helper remains at the tail and keys stream directly to Vec instead of the original intermediate stack staging. Separate full six-handle cleanup/try-payload/event proof was not completed for this unselected binary. No repeat or runtime qualification is transferred to it.

The safe Box aggregate control also retains 583/143, all 188 measured Locations, 4,136 positive edges, full Sweep qualification and prior Donation proofs. Its allocation is inlined at 102 bytes/alignment 1 without an extra helper. Actual instruction witnesses show the second and third keys staged on the stack before the first heap-slot writes, unlike the streaming capacity control. This recovers a specific aggregate-initialization effect, not the whole function. Its 35 actual callee shapes match the original multiset, but the allocation-failure call remains at the tail rather than the original position. Crank is 15,960 bytes/1,948 instructions versus original 15,976/1,950; broader spill, register and branch differences remain. The two-instruction size difference is not a proven causal explanation of all remaining differences. Full Crank copy/drop/event qualification against the original remains open; this is not a claim that only two instructions remain. No new normalized body, repeat, VM or historical-source claim follows.

The named Donation result is a measured negative: 13,864 bytes versus 13,800 original, unchanged 583/143 counts. Its extra 32-byte quote copy persists at offsets 1,864–1,920; scratch storage moves from −816 to −512 rather than disappearing. Creator/quote intermediate placement remains different from original. 173 same-offset 8-byte slots change, not a body gain. Independent byte-label tracing preserves the observed creator 7 + creator 16 + creator 9 / quote 32 success fragments and all 32 destination bytes of both keys. All 77 actual callee shapes remain equal in order, and the existing typed-reference/Location scopes pass. Common validation cleanup remains but its borrowed Ref frame moves −1,320 → −1,288 and 41-byte payload destination −872 → −840; the old exact-frame check correctly failed before a new explicitly measured witness recorded these differences. No stack/register renaming is used as equality. Four producer mutations and eight return-flow mutations reject in local diagnostics.

Each control uses one ordinary pinned native compile and authenticated existing dependencies. No original binary bytes enter compiler inputs, no hand-coded assembly/custom IR/output patching, and no whole-file equality claim. Donation's build emitted 42 warnings and no backend errors; absence of backend errors is not a warning-free or exhaustive-semantics claim. No VM or repeat is authorized or implied by this packet. Full captured logs, ELF files, IR, archives, build/runtime receipts and encoded forms are deliberately absent. The prose describes local observations, not independently downloadable runtime proof.

## Source-only reproduction

First obtain the exact public PR302 source directory identified above. Then run:

```sh
python3 -B source_tools.py --parent /path/to/pr302/source
FEES_SOURCE_PARENT=/path/to/pr302/source python3 -B -m unittest discover -s . -p 'test_source.py'
python3 -B source_tools.py --parent /path/to/pr302/source --stage capacity --output /fresh/path/capacity-source
```

Choose sweep, event, capacity, box or donation as the stage. Output must be absent and outside packet/parent directories. No command downloads files, invokes a compiler or runs a target program. Source test success is not native/runtime success. The source hashes and patches are the only machine-readable evidence distributed here; all claimed binary behavior requires separate legitimate reproduction.
