# Relay build04: complete next-layer static review

This package re-enumerates **all 492 original inferred function windows and 282 candidate symbol windows**, every classified call site, every relocation-backed data reference, every candidate/original shape pair, section differences, and all residual bytes. It also supplies one narrowly grounded, **uncompiled one-file source proposal**: stream four fixed account serializers directly to the borrowed output instead of constructing temporary `Vec<u8>` values. No compiler, target, transaction, network request, flag/version search or main-source edit was performed.

The candidate remains the accepted build04 ELF, 450016 bytes/SHA `4954fdc437beed0f73e00d25f1df656ce7fdf0279f8f9bb8e70ca0bced4b53dd`. The original remains 830448 bytes/SHA `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. `baseline/` retains selected files byte-for-byte from build04 seal `c2377cfab442a00405243e8a85c8ce49f549f4facfa8b8a6e6a4fdddeec024f9`, including original analyzer/output, both binaries, unstripped symbols, full window ledgers and residual archive. The old manifest is preserved as a manifest of the larger original package, not a claim that all of that package's historical archives were recopied here.

## Important analyzer classification correction

The original analyzer classified every call with source nibble 1 as a relative internal call before consulting relocations. These binaries also use that nibble for **type 10 external syscall relocations**, whose immediate is −1. It therefore reported zero external calls and assigned those instructions a false target equal to their own PC.

`analyze_relocation_first.py` is the original algorithm with only the explicit type 10-relocation check inserted before relative-call classification. It never modifies executable bytes. `analysis-classification.patch` is the exact change. `classification-delta.json` lists all 146 affected instructions, actual raw relocation records and symbols, every removed/added pair and both summaries. The first preliminary review using the inherited classification is preserved separately in `preliminary-nibble-only.tar.gz` with its original hashes.

| Measure | Historical nibble-first view | Corrected relocation-first view |
|---|---:|---:|
| Original raw complete-body matches |29|29|
| Original normalized complete-body shapes |112|110|
| Original windows without a normalized counterpart |380|382|
| Normalized candidate/original pairs |335|277|
| Recursive **internal call-shape** fixed-point pairs |109|111|
| Original internal/external calls |4419 /0|4320 /99|
| Candidate internal/external calls |1719 /0|1672 /47|

No raw bytes, raw-window hashes, section differences or whole-file residuals change. Fifty-eight former normalized pairs disappear because the old algorithm erased both genuine relative-call immediates and external-call immediates. Only original 409 [717688,717720) and 412 [718896,718928) lose every normalized counterpart: their internal helper calls had falsely matched the candidate memcpy/memmove syscall wrappers. The increased internal call-shape fixed point reflects removing bogus self-address call edges, not stronger semantic equivalence.

Even the corrected shape view contains **13 pairs calling different external symbols**, all explicitly listed in `complete-pair-alignments.json`. Examples include `sol_log_data` versus `sol_set_return_data`, and memcpy versus memmove. Raw identical instruction bytes do not prove identical relocation targets. These pairs remain gaps, never semantic matches. Indirect target identity and full data-object extents remain unresolved.

## Complete inventory

| Side | Functions | Internal calls | External calls | Indirect calls | Data references |
|---|---:|---:|---:|---:|---:|
| Original |492|4320|99|89|1869|
| Candidate |282|1672|47|74|1205|

`original-gap-ledger.json` and `candidate-gap-ledger.json` include every function and all counterpart lists. Candidate symbols identify 91 functions with at least one normalized counterpart, 33 with a raw counterpart, and 191 without a normalized counterpart. `all-call-sites.json` and `all-data-references.json` cover every site on both sides, including functions with no counterpart. `complete-pair-alignments.json` aligns the union of call/reference offsets, preserves actual external symbols, and does not silently truncate unmatched sites. There are no unpaired call/reference offsets in the surviving 277 shape pairs.

Original boundaries are inferred; candidate boundaries use 296 actual STT_FUNC symbols including aliases. Coverage is gap-free for both text sections. Normalization masks only internal relative-call immediates and relocation-backed address immediates in memory. It is a comparison device, not binary reconstruction. Data references retain bounded samples of up to 64 bytes, which can cross object boundaries; **no full data-object extent is asserted**. Recursive internal-call compatibility does not establish indirect-call, external-symbol, data, allocator/error ABI or historical-source equivalence.

The unchanged full residual archive records 247326 differing common-position bytes in 63049 ranges including the tail record, plus the 380432-byte original-only tail. It is verified by rerunning the original analyzer. Section-level differences and allocated stripped/unstripped identity are preserved independently.

## Highest-confidence natural source correction

Original serializers 17 (Debouncer), 18 (Tracker), 20 (Distribution), and inline receipt serialization in 153 stream their fields through writer 281 directly into the borrowed account buffer. Writer 281 carries data pointer/length/position, copies `min(available,requested)`, advances position and returns a short-write error. The retained field call sites establish these exact lengths/order:

| State | Ordered field byte lengths | Total |
|---|---|---:|
| Tracker |8,1,1,32,32,16|90|
| Debouncer |8,1,1,32,32,8|82|
| Distribution |8,1,1,32,32,16,8|98|
| SwapReceipt |8,1,32,8|49|

`serializer-proof.json` binds every call/length operand, complete original functions and relevant candidate functions. Candidate persistence specialization 70 loads the tracker discriminator at 64344; 72 loads the debouncer discriminator at 66192. Distribution's named builder 54 loads its discriminator at 27344 and is called by persistence 71. Receipt builder 55 loads its discriminator at 27976 and is called from just-swap wrapper 85 at 197352. Their real named call edges reach `RawVec` growth/reserve helpers or an intermediate vector-prefix builder. Current source explicitly creates complete vectors before copying their bytes, introducing temporary allocation and growth on these paths. The original successful field-write sequence uses the existing output and has no such temporary vector builder.

The exact patch changes **only `src/generated_exit.rs`**. It keeps the declared-owner and live-closed gates, acquires the same mutable data borrow, then uses natural `std::io::Cursor`/`Write::write_all` calls in the recorded field order. Short writes preserve their copied prefix and stop before later fields. The I/O error is dropped before conversion to the existing serialization error; outer account-name decoration and borrow release remain in the same layers. All event/return serialization, whitelist streaming, IDL, body, context, authority checks and dependencies are unchanged. The old public codec vector helpers remain unmodified and are simply no longer called by these four persistence paths.

This is a correction to an evidenced allocation/write structure, **not a compiler-layout trick or byte-match prediction**. The original report already acknowledged that its whole-vector copy gave the same ordinary final bytes under adequate-allocation assumptions. Direct streaming removes that unnecessary allocation premise for these fixed writes and more closely follows the original error/write ordering. It does not prove full resource behavior, error-heap ABI, source identity or a future raw match. Current stdlib implementations may compile differently. The new source has not been compiled or typechecked; stack and code-size effects remain unmeasured. Further build/runtime work needs parent review.

## Existing runtime evidence and open limits

The two copied runtime verification records are bound to their original immutable manifests: twelve ordinary successes, followed by a separate first-rejection failure on source-origin logging (0 pass/1 attempted/2 not run). The build snapshot's `runtime_cases:0` and `execution_suitable:false` fields remain untouched historical pre-runtime metadata. This package adds **zero** runtime cases and does not relabel the strict rejection as successful.

The six fixed-relayer success paths remain unavailable without genuine authority: epoch close, after-swap distribution, non-swap distribution, just-swap, combined swap/distribution and whitelist update. No signer substitution, signature bypass, new probe or Jupiter stub is proposed. Their existing byte/source contracts remain evidence, not runtime coverage. Source-origin recovery stays explicitly unresolved; the prior natural-origin proposal is neither built nor retried here. Broader framework/error/allocator/data provenance gaps remain in the complete ledgers, and no speculative source/flag/version correction is inferred from the 382 unmatched shapes.

## Verification

```sh
python3 -B work/relay-next-layer-review/verify.py
python3 -B work/relay-next-layer-review/verify.py --repo /absolute/path/to/pumpfun-source
```

The standard-library-only verifier checks seals and selected source provenance, reproduces every historical analyzer output including all residual bytes, checks the exact analyzer patch, regenerates the entire corrected inventory/classification delta, verifies all serializer operand proofs and the exact one-file/21-input source proposal, and binds the two existing runtime records. It runs no compiler, VM, transaction, network or source-level execution. `--repo` is an optional read-only rebind to the original frozen inputs; default verification works on a copied directory.
