# Relay build06: writer errors and four serializer boundaries

The writer's remaining constructor mismatch does not justify changing the allocator, forcing inlining, or replacing the standard error representation. The original allocator and deallocator are already raw full-body matches. The four serializer boundaries do reveal a separate source-model gap: original code constructs an owned Anchor error on serialization failure, whereas the current adapter retains a small enum and borrowed account name. That is a concrete next source-review target; this diagnostic layer changes no source and does not approve a build.

This report binds the original `367f07a6…` (830,448 bytes), build06 `522a9799…` (451,896 bytes), its genuine symbol ELF `09e82937…`, all22 compiled sources and the existing ordinary12 receipt. Full hashes are in `summary.json` and `input-bindings.json`. No target was compiled, loaded or executed. The ordinary12 evidence is retained unchanged: 24 submissions, 12 unique signed transactions, 50 encoded signature fields. Its finite coverage does not include every serializer failure or the unavailable fixed-authority routes. The known strict6009 source-origin mismatch remains open.

## Constructor and actual data targets

| Contract | Original | Build06 | Finding |
| --- | --- | --- | --- |
| Writer | 651064 / 288B | 62424 / 288B | Complete normalized match; same relocated `sol_memcpy_` import |
| WriteZero constructor | 645296 / 288B | 1744 / 520B | Unequal: called allocation versus inlined allocation |
| Allocator | 566472 / 208B | 342760 / 208B | Raw match, including heap bounds and alignment |
| Deallocator | 566680 / 8B | 342968 / 8B | Raw match: no operation |
| `io::Error::_new` | 707248 / 120B | 362904 / 120B | Complete normalized match; allocator targets raw match |
| StringError destruction | 645888 / 48B | 6048 / 8B | Original conditionally calls the no-op deallocator; candidate is no-op |

Both constructors first request 28 bytes, alignment1, and store exactly `failed to write whole buffer`. Next comes a 24-byte, alignment8 StringError containing the String capacity, pointer and length; `_new` requests another 24-byte, alignment8 Custom containing the boxed error pointer, vtable and WriteZero tag23. Its return pointer is tagged by adding1. `function-comparisons.json` contains the complete raw and normalized bodies, all signed relative-call targets, data references and external relocation identities. No executable was normalized on disk.

The selected SDK allocator is `solana-program-entrypoint`2.3.0, resolved by the unchanged lock. Its exact public crate checksum, compiled-source manifest and extracted `GlobalAlloc` implementation are bound. The first two inline paths in candidate1 implement this allocator's zero-cursor fallback, saturating subtraction, alignment and lower-bound check. The original invokes the identical general helper. A custom allocator or `inline(never)` wrapper would be a code-generation experiment unsupported by a different source contract.

`StringError-vtables.json` decodes the actual 88-byte error tables and separate32-byte Display tables using the ELF's type8 relocations, rather than treating raw high-word pointer encodings as addresses. Size24 and alignment8 agree. Description and default source/cause/provide bodies agree raw; Debug/Display wrappers agree normalized but their formatting targets are not asserted equivalent. The type-id methods retain different128-bit constants, and the destructors have the difference above. The vtable is therefore not byte-identical and full formatting/error closure is not proved. The selected compiler's `Error::new` already carries `#[inline(never)]`; its standard conversions naturally allocate a String and boxed StringError. Inventing a different error type to match type-id bytes is not a supported correction.

The original constructor's raw-Vec OOM helper accepts a caller location; the selected candidate helper has different capacity-overflow/location lowering. On this constructor's fixed28-byte allocation path, the error value has nonzero alignment1, so both wrappers select their allocation-error branch. This bounded branch observation does not prove the entire panic/OOM closure. No OOM transaction was run.

Six exact Rust library source members were extracted from retained official v1.44 artifact `66e20d13…` and compared byte-for-byte with the installed sources. `upstream/provenance.json` records artifact identity and member hashes; the large artifact is not duplicated. These explain the selected build, not a uniquely established historical compiler. Anchor0.31.1 is an authenticated reference archive whose writer bytes match the source; Anchor is not a current build06 dependency, so it is not described as the current locked framework.

## Four complete serializer boundaries

| Account | Original window / bytes | Candidate window / bytes | Preserved field widths |
| --- | --- | --- | --- |
| Tracker | 18 / 968 | 73 / 1392 | 8,1,1,32,32,16 |
| Debouncer | 17 / 952 | 75 / 1376 | 8,1,1,32,32,8 |
| Distribution | 20 / 1040 | 74 / 1464 | 8,1,1,32,32,16,8 |
| Receipt | 153 / 4056 | 88 / 31608 | 8,1,32,8 |

Receipt values above identify enclosing exit/just-swap windows, not a pair of isolated serializer functions. All23 field sites and four complete8-byte discriminators are checked. The first four writes are inlined in each current fixed serializer; remaining fields call writer72. There is no supported field order, width or discriminator correction in this layer.

The original first checks the declared owner against the invocation program, then closed-account state, then acquires the mutable data borrow. Partial writes retain their copied prefix. On failure it drops the I/O error before constructing code3004. The original conversion call is 14848/15816/17624/466592 for Debouncer/Tracker/Distribution/Receipt. The corresponding mutable-borrow release follows that conversion. Complete bodies are retained, including the first-discriminator failure paths and subsequent-field paths; no successful-field shortcut is treated as proof of the error path.

Original helper297 at665312 is592 bytes. It obtains an owned error-name String from296, formats the error message, allocates160 bytes at alignment8, initializes no-origin/no-compared-values tags and stores code3004. The reference Anchor Error is `AnchorError(Box<AnchorError>)` or `ProgramError(Box<ProgramErrorWithOrigin>)`, with owned Strings and origin metadata. Current `write_error()` constructs `Cause::AccountDidNotSerialize` plus `None`; `named()` attaches a borrowed `&'static str`, and reporting separately looks up/formats the code. The current source deliberately omits the owned framework representation. This is a source-model boundary, independent of the matched bump allocator.

A follow-up should trace the account-name decorator, wrapper propagation, conversion/logging and final destruction before proposing the smallest coherent owned-error replacement. It must preserve the program-error branch, allocation-before-borrow-release ordering and existing12 cases, and cannot claim full Anchor compatibility from a struct size. This report does not treat that work as impossible or attempt to hide the gap by counting the matching writer as a complete serializer.

## Transitive inventory and limits

The fresh pass rechecks all492 original inferred windows and289 candidate symbol windows against the exact ELF files. Starting with the four serializers/writer and adding the decoded StringError method targets yields62 original and118 candidate windows,228/221 bounded data references and19/16 indirect sites. Every direct target resolves to a retained window. The candidate envelope includes all of just-swap; its larger count is not coverage improvement. `expanded-*-closure.json` retains every row and actual call/data operand, and `incoming-calls.json` lists all direct parents of the selected boundaries.

The indirect sites outside the decoded StringError table, arbitrary data-object extents, complete formatting/panic paths, original framework account/error ABI, reference-count overflow/destruction timing, and missing authority routes remain explicit obligations. Original inferred windows are not established source functions. Normalized equality and call-shape equality are not semantic equivalence. No overall completion percentage, new runtime coverage or source improvement is claimed.

## Verification

Run `python3 -B /path/to/package/verify.py`; `--repo /path/to/repository` additionally checks the retained public input paths. The default is standalone and requires no work directory, compiler or VM. The verifier recomputes selected complete bodies, expanded direct closures, vtables, actual call sites, discriminators and source bindings. Portable positive and missing-artifact/source/derived-evidence negatives are recorded in `verification-tests.json`. No binary bytes are modified even in disposable tests.
