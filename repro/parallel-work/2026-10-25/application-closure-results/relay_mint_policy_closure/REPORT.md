# Relay mint policy closure (static)

The application decisions of inferred relay window106 **[115456,118896)** are implemented in `source/mint_policy.rs`, including six independent TLV lookups. This closes the incomplete application predicate in the existing integrated hypothesis, under the ordinary borrow/decode/error-adapter premises below. It is not recovered historical source, a compiled candidate, a whole-program equivalence proof or an accepted handler. Root integration and tests remain outstanding; no completion counts change.

Inputs come from `git show 476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40:<path>`, plus explicitly permitted completed publications. No moving parent source is used as checkpoint evidence. No build, typecheck, target execution, probe, fixture, network request or prohibited lane was used. The full deployed input is retained and hashed; only the identified code/data windows below are interpreted. The inherited publications and their seals are unchanged.

## Exact entry, decode and return order

1. At115472–115520, borrow the mint AccountInfo's data cell immutably and increment the borrow count. A count above `i64::MAX-1` takes the panic helper at116016, not a normal policy false. The guard is decremented at118792–118808 on all normal returns. Ordinary valid RefCell layout, stable borrowed bytes, memcmp semantics and allocation/panic machinery are imported runtime premises.
2. At115560 call **28824**, derived from the signed relative operand. W33 first rejects total size<82 or exactly355 (28832–28864), then W250 decodes the first82 bytes. Mint authority COption tag at[0,4) and freeze authority tag at[46,50) each must be little-endian0 or1; invalid tags produce encoded ProgramError `0x8000000000000003`. Initialized byte45 must first be0 or1; then W33 rejects0 with `0x8000000000000009`. Decimals44, supply[36,44), and authority key bytes have no additional safety tests. These are natural names for InvalidAccountData and UninitializedAccount; exact conversion to the enclosing Anchor error is the existing helper652528 premise.
3. W33 also validates the extension envelope **before** application authority rejection, regardless of owner: total82 gives an empty TLV slice; all other admitted lengths must be **>=167 and !=355**, bytes[82,165) must be zero, byte165 must equal1, and TLV is[166,total). In particular total166 is rejected, while total167 is admitted with a one-byte TLV tail. Evidence: residual `n-82` test29608 against85, zero83-byte comparison29896–29976, account-type check29984–30000. Heap allocation of the83-byte zero comparison buffer is a bounded runtime premise; its failure is not reclassified as a policy result.
4. Base/envelope errors take115592–115736 through652528 and propagate; they do not become6031. After successful unpack, tags at decoded offsets0 and52 are ORed at115744–115776. Any Some mint authority or Some freeze authority returns **Ok(false)**. Some(all-zero pubkey) still fails; None ignores its32 payload bytes. Both absent are required even for ordinary Tokenkeg.
5. Compare owner to ELF literal[753152,753184) at115888–115952. Non-Token2022 returns **Ok(true)** after base/authority validation. The function itself does not reject arbitrary owners; shared112 already does that. Token2022 continues through the following table, short-circuiting false in this order.

## Policy when a typed lookup succeeds

All payload offsets below are relative to the extension value, not the mint header. `None` for a key means all32 bytes zero; helper643240 compares exactly32 bytes against zero and returns tag0/1. It does not perform curve or pubkey validity checks.

|Order / tag / natural label|Exact value size|Admitted contents|Original decisions|
|---|---:|---|---|
|1 / 1 / TransferFeeConfig|108|Configuration authority[0,32) absent; older fee bps u16 at88 and newer bps u16 at106 both zero|116464–116832; presence helper116776|
|2 / 14 / TransferHook|64|Authority[0,32) and program_id[32,64) both absent|117304–117720; presence helpers117584/117704|
|3 / 12 / PermanentDelegate|32|Never admitted when lookup succeeds, including zero delegate|118168–118320 jumps to116840|
|4 / 3 / MintCloseAuthority|32|Authority[0,32) absent|118368 calls27600;118520/118544 presence check|
|5 / 6 / DefaultAccountState|1|Payload byte exactly1;0,2 and every other byte fail|118600 calls26376;118656–118672|
|6 / 9 / NonTransferable|0|Never admitted when lookup succeeds|118712 calls25160;118744|

TransferFeeConfig withdrawal authority[32,64), withheld amount[64,72), older epoch[72,80), older maximum fee[80,88), newer epoch[90,98), and newer maximum fee[98,106) do not influence policy. This is not a general ban on fee-related authorities or nonzero maximum fees. TransferHook admits only None/None; None/Some, Some/None and Some/Some fail. PermanentDelegate is an existence test, unlike MintCloseAuthority's optional-key test. DefaultAccountState is an exact byte comparison, not a generic boolean/non-frozen check.

The helper **ordinals32/31/30 are not extension IDs32/31/30**. Their actual type comparisons are tag3 at27992, tag6 at26768, and tag9 at25552. All names in this table are interpretive type labels supported by the retained dependency enum (lines1050–1144); original identity/version is not inferred from them.

## TLV scan semantics, including malformed and trailing data

Each lookup starts afresh at TLV cursor0, not at the preceding lookup's end. At cursor `c`, helper629120 produces `(c, saturating_add(c,2), saturating_add(c,4))`. A full four-byte header must be available **before** reading the tag. Type conversion630256 accepts exactly two bytes and numeric tags0..27. A tag>27 terminates that lookup. The three inline scans and three out-of-line helpers use the same recognized mint-type set:

`{1,3,4,6,9,10,12,14,16,18,19,20,21,22,23,24,25,26}`.

For the requested type, read little-endian u16 length atc+2, saturate `(c+4)+length`, require it within TLV bounds and require the exact size from the table. Return the **first** matching typed value. A first occurrence of the wanted tag with wrong size or truncated data terminates the lookup; it does not search for a later valid duplicate.

For another recognized mint type, skip to `(c+4)+length` with saturation, without checking that type's expected size or validating its payload. If the skip reaches/passes the slice end, the lookup stops. All other recognized types `{2,5,7,8,11,13,15,17,27}` terminate as wrong account category. Tag0 also terminates. The first success does not inspect trailing bytes, later duplicates, or later invalid headers. A trailing1–3 bytes fails the header check and terminates. There is no global rejection of duplicates, unknown extensions, zero terminators, wrong-category extensions, wrong lengths or malformed trailing data in106.

**Every lookup failure is suppressed at this call site**, so the next independent policy check runs. Inline failures converge to116872,117736,118328; helper failures fall through118408,118640,118752. Consequently a malformed or unrecognized prefix can hide a later policy-bearing extension from all six scans. A recognized but unchecked type may contain arbitrary payload/authority bytes and is skipped; no authority restrictions on ConfidentialTransferMint, InterestBearingConfig, metadata/group pointers, ConfidentialTransferFeeConfig, ConfidentialMintBurn, ScaledUiAmount or Pausable are invented. This is a description of captured control flow, not an endorsement or new vulnerability finding against a deployed system.

The shared `lookup` source collapses errors to `Option` only at this observational boundary. It is **not** proposed as a replacement for the original general-purpose extension helpers, whose detailed ProgramError variants remain distinct to other callers. Original bounds-panic edges118824/118856 and helper tail panic edges are retained in the analysis. With valid finite64-bit slices, cursor starts0 and advances by at least4; the header-in-bounds check implies both intermediate ranges are ordered/in bounds. This is the explicit premise under which the natural loop avoids those impossible range failures. No target execution was used to infer these consequences.

## Shared112 admission and bypass

The existing shared112 body checks message bytes<256 (6009), tip bps<=10000 (6018), then owner Tokenkeg or Token2022 (6029). The policy cannot run ahead of these. After owner admission, builtin mint keys at[753184,753216) and[752800,752832), then32-byte whitelist membership bypass106. A bypass skips106's borrow, base parsing, authorities and extension policy entirely **at this gate**; it does not waive downstream token decoding/transfer checks.

132272 jumps to134304 only after whitelist exhaustion;134336 calls115456. Result tag!=2 at134352 propagates the underlying error through134520/134528. Successful false at134360–134384 constructs6031 at134848. Successful true returns via134488/134512 to132560, before tracker/debouncer initialization. Thus numerical PC order does not put policy after mutation. The source integration sketch preserves this distinction; upstream account-context admission and downstream checks/exit remain those of the prior integrated hypothesis.

## Evidence, verifier and remaining premises

`consumed-ranges.json` lists whole input SHA-256, exact consumed binary byte intervals and dependency source line/byte intervals. `analysis/*.txt` are raw instruction listings generated only for the allowed windows. `anchors.json` records signed call destinations, branch destinations, masks and key loads/length comparisons. `verify.py` uses only Python's standard library: verifies the sealed file set, recomputes hashes, regenerates listings, resolves calls from signed operands, checks policy anchors and reconciles all six skip masks with the source mint-type set. It does **not** execute the source hypothesis or target, fabricate transaction inputs or assert runtime equivalence. A separate directory copy is used for verification.

Explicit unresolved premises: authentic source/module/compiler identity; allocator/panic/error-object construction and cleanup details; exact error conversion652528 and enclosing diagnostic metadata; runtime AccountInfo representation and immutable borrow behavior; context/wrapper/exit correctness inherited from the integrated work; integration with that work's runtime interface and subsequent acceptance tests. These are bounded runtime/integration premises, not missing application-policy decisions delegated to success stubs. The policy implementation performs every authority decision and TLV scan reached in106. No other Token2022 version or policy is substituted, and no whole-program or historical-input behavior outside this window/caller contract is claimed.

## Delivery and integration boundary

Replace the predecessor `source/runtime.rs:43–47` incomplete predicate with an adapter that borrows mint data, calls this package's `safe_mint_data`, and preserves the original error conversion and borrow lifetime. The predecessor shared gate remains at `source/handlers.rs:10–16`; do not move the predicate ahead of owner admission or into a bypass path. These predecessor excerpts and their original manifests are retained verbatim under `inputs/predecessors/`. Only selected retained files are revalidated against those manifests; omitted predecessor artifacts are not certified by this verifier.

The source hypothesis and static analysis are complete for the assigned application decisions. This delivery does not implement the prior runtime adapter, context parser, or exit machinery. Message/tip numeric contracts are inherited from the prior integrated hypothesis; this package checks their call order in112 without re-attributing those helper bodies. `analysis/shared112.txt` retains the full identified caller window for audit, while only its admission/bypass/predicate/error ordering is claimed here. Diagnostic pointers are listed but their strings and downstream helper bodies are not interpreted.

All byte intervals use zero-based half-open offsets into the retained whole input. Source lines are one-based inclusive. `manifest.sha256` seals `manifest.json`, which seals every other publication file including the verifier; it is a content-addressed integrity seal, not an external signature. Run `python3 -B verify.py` from any separate copy. Verification receipts stay outside the sealed publication. The verifier checks static operands and source bindings, not a proof that the handwritten Rust is equivalent. No source build, typecheck, target execution or synthetic transaction is part of this delivery.
