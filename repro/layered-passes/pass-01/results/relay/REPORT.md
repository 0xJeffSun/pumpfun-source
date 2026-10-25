# Relay missing-work inventory at frozen c1ffdd0

The captured relay has **no source-built candidate in this baseline**. Its original ELF is 830,448 bytes, SHA-256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. Whole-file equality, positional mismatch counts, mismatching ranges and original/candidate function correspondence are **unavailable**, not zero or 492. The 492 rows are inferred original windows, not proven source functions or mismatches. All historical source identities remain unresolved.

This publication binds inputs to immutable commit `c1ffdd0667608d4755227e68aab9f27a7e9a0d37`. It inventories concrete but **uncompiled, unintegrated proposals** for eleven business branches, seven reserved IDL operations and their runtime/dependency boundaries. Runtime integration ongoing outside this snapshot is a pending root-owned action. Nothing here changes accepted handler counts, comparison receipts or whole-original identity claims. No build, typecheck, transaction, target execution, fixture, network request, signature bypass or new repository search was performed. Only the explicitly named public packet trees were enumerated and read using `git show` at the frozen revision.

## Deliverables and reproducibility

- `input-provenance.json`: 429 exact frozen input files, repository paths, immutable revision, Git blob IDs, SHA-256 and sizes. Nested predecessor manifests and original files remain unchanged.
- `residual-ledger.json`: every original row and original evidence field, fresh signed-call/branch decoding, ELF headers/sections/symbols/relocations, all uncovered intervals, source declarations, dependency closures, and future candidate fields. No original row is filtered out.
- `obligations.json`: prioritized application, ownership, linked-helper, diagnostic/data, toolchain, ambiguous and stopped work, with evidence and closure requirements.
- `tracker.py`: deterministic original inventory and future real ELF/symbol comparison. It invokes no compiler or target binary.
- `manifest.json` / `manifest.sha256`: immutable content seal, with no circular self-hash. This is integrity, not an externally signed attestation.
- `verify.py`: check exact file set, every input and payload hash, rederive the inventory and run four retained static packet verifiers. Temporary extraction stays in the caller-supplied workspace directory.

Run `python3 -B verify.py --scratch /absolute/path/inside/assigned-workspace/static-temp` from a complete separate copy. The scratch directory must be outside the sealed package. For the next root-owned accepted snapshot, run:

```sh
python3 -B tracker.py --candidate /path/to/real-relay.so \
  --symbol-elf /path/to/real-relay-symbols.so \
  --output /path/outside/sealed-package/next-relay-ledger.json
```

The optional symbol ELF is separately hashed. Every real function-symbol row is preserved, including duplicates, zero-sized and unmapped symbols. Symbol-body bytes are checked at mapped addresses; a mismatch is explicitly untrusted. Independently inferred candidate windows are added without replacing symbol records. Uncovered symbol intervals remain visible. All raw/normalized alternatives remain ambiguous unless separately established; no greedy one-to-one matching discards rows. A stripped candidate can be consumed without invented symbols. The candidate code path is delivered for the first future real candidate; it was not exercised with a fabricated or substituted candidate.

Normalization masks only internal signed call immediates and relocated LDDW address words. It does not mask branches, other constants, external calls or indirect calls. Paired target-body byte checks are bounded witnesses, not historical callee identity. Referenced-data and actual-function-identity fields stay unknown until justified. Hash/structural correspondence is not semantic equivalence.

## Complete original-byte accounting

The `.text` extent is `[288,752776)`, 752,488 bytes, with all 492 inferred windows retained and rederived by the existing static analyzer. There are no gaps between these inferred text windows. This does not prove correct historical boundaries: a fallthrough or cross-window branch can join what the inference divided. Every branch displacement and endpoint, unresolved indirect call, original source-path label and possible cross-window dependency survives in the ledger.

Fresh decoding records **4,508 calls: 4,320 signed relative, 99 external/absolute, and 89 indirect**; **11,172 branches**; **1,815 historical address/data references**; **2,327 relocation records** and **17 ELF dynamic-symbol rows**. Calls use signed operands, not disassembler annotations. The 99 external/absolute calls retain relocation/symbol records and still require the loader/syscall ABI. The 89 indirect targets are not guessed. Data extraction is an address-immediate/relocation inventory, not complete pointer analysis.

| Original region | File offset | Bytes | Remaining obligation |
|---|---:|---:|---|
| ELF/program-header prefix | 0 | 288 | exact headers and layout |
| `.text` | 288 | 752488 | all 492 original windows, dependencies and eventual candidate |
| `.rodata` | 752776 | 19863 | literals, keys, diagnostics and unexplained data |
| alignment byte | 772639 | 1 | preserve actual byte, do not manufacture padding |
| `.data.rel.ro` | 772640 | 6928 | nested pointers, tables and loader interpretation |
| `.dynamic` | 779568 | 176 | dynamic records and linkage |
| `.dynsym` | 779744 | 408 | all 17 records |
| `.dynstr` | 780152 | 247 | exact symbol strings |
| alignment byte | 780399 | 1 | preserve actual byte |
| `.rel.dyn` | 780400 | 37232 | all 2327 records and sites |
| `.shstrtab` | 817632 | 72 | exact section names |
| remaining file suffix | 817704 | 12744 | section headers and other unclaimed bytes, split further in ledger |

Outside inferred text the exact uncovered intervals are `[0,288)` and `[752776,830448)`, with hashes in the ledger. `whole_file_regions` further divides by observed section/header boundaries. No suffix is assumed to be zero, dispensable allocation or matching a nonexistent candidate. Every relocation has its raw record and site bytes, enclosing-window mapping and unresolved semantic target extent. LDDW records retain raw encoded values even where no file address is recognized. Full original bytes permit later deeper data attribution without losing unrecognized bytes.

Historical groups are preserved exactly: five account discriminator windows; eleven wrappers; 29 other embedded-local-path windows; two exports; 238 shared business direct dependencies; 39 single-business dependencies; 168 outside business direct closure. The groups are not function identities. The ledger's explicit application-role map has 94 window rows; the other **398 rows lack that particular role assignment**. This is not 94 implemented functions or 398 missing bodies. Several of those 398 are already consumed as helpers by source packets; consumption is separately listed and is not implementation or historical attribution. All 492 still need historical attribution and compiled correspondence. Named dispatch/parser/body/exit roles are source hypotheses whose supporting bytes and sources remain reviewable.

The original 26 local-path strings and 34 referencing windows remain available in `inputs/repro/parallel-work/2026-10-24/results/donation_relay/evidence/source-evidence.json` and `windows.json`. The `fair_distribution.rs` string alone does not identify W113. Its concrete amount contract is instead supported by caller/dataflow studies. No new source origin is invented from a captured diagnostic tuple.

## Eleven business branches

Every row below has a complete pending source path in the context/dispatch packets. The last column describes the branch-specific preservation requirement, not accepted compiled behavior. The ledger additionally retains the full IDL instruction and its original selector/call evidence in the unchanged input packet.

| Business instruction | Wrapper / parser / adapter → body / exit | Distinct pending contract |
|---|---|---|
| donate_v1 | 178 / 121 / 190→94 /125 | config32; donor token authority; actual transfer delta |
| donate_pubkey_config_id_v1 |179 /135 /190→94 /125|same config bytes with pubkey interface, no hashing/config account invented|
| donate_native_v1 |180 /126 /191→92 /130|temporary account initialization then native predicate; fund/sync/donate/close|
| donate_native_pubkey_config_id_v1 |181 /131 /192→93 /130|distinct native parser, identical required effect sequencing|
| donate_pubkey_config_id_with_payer_v1 |182 /138 /193→95 /141|payer funds initialization; donor remains transfer authority|
| close_donation_epoch_v1 |183 /142 /204→96 /145|unconditional distribution/ATA initialization; recorded total; epoch checked increment after transfer|
| swap_then_distribute_v1 |184 /154 /203→100 /155|recipient prefix/Jupiter suffix; preserve combined-specific guards; close distribution|
| just_swap_v1 |185 /150 /202→99 /153|receipt49 and output ATA initialization; measured output; persist receipt/distribution|
| distribute_after_just_swapping_v1 |186 /146 /201→97 /147|receipt relation6033; use receipt.output_amount; close distribution then receipt|
| distribute_non_swap_output_mint_v1 |187 /148 /200→98 /149|use distribution.total_amount; no invented positive-total gate|
| upsert_mint_whitelist_v1 |188 /156 /105→101 /158|max32 in body; retain ordering/duplicates; no event/return-data clear|

Donation shared112 checks message byte length<256, bps<=10000 and supported live mint owner before built-in/whitelist bypass or policy106. It initializes states only after policy success. Actual destination delta, not requested amount, feeds the checked u64 product and total accumulation. Widening the product to u128 would alter overflow admission; preserve u64 here. Distribution fair amounts deliberately use u128 under a different caller domain.

The recipient loop checks decoded token authority against share.address, then mint, then owner before skipping zero-amount CPI. Source/mint/program/authority are K+16/+64/+112/+160. An earlier prose inversion survives in historical input packets but must not replace the corrected frame mapping. Zero allocations and duplicate recipients remain in original occurrence order. Combined does not inherit just-swap's three extra body checks. Jupiter input bytes/accounts are opaque and preserve order; signed metadata identifies distribution authority, and actual runtime privilege validation is required.

Source fields, exact bytes/hashes and one-based declaration lines for the current proposals are in `source_inventory` (361 declaration occurrences, including traits and duplicate additive views). They are not 361 implemented routines. Full file hashes bind method bodies; the declaration list is a navigation index, not a Rust typecheck or syntax completeness proof.

## Seven reserved IDL operations

The IDL packet supersedes the **analysis stop only in its additive view**. Frozen N09 and context dispatch still contain their explicit old stop. Reporting IDL as unrecovered without mentioning the concrete later proposal is stale; reporting it as integrated is also wrong. Root must compose the additive patch with context/runtime changes.

Selector `40f4bc78a7e9690a` dispatches to W170 `[517632,521664)`. Empty/unknown/truncated arguments fail102 before account admission and IDL logging. Extra bytes/accounts are accepted. Header44 is discriminator8 + authority32 + data_len u32; declared length is not checked against payload capacity by the decoder.

| Tag | Operation | Parser / body / exit | Source behavior to preserve |
|---:|---|---|---|
|0|Create(u64 payload size)|215 /171 /direct216|checked +44; space cap10000; seeded System create; actual post-CPI unchecked decode; payer authority|
|1|CreateBuffer|209 /174 /210|Rent before zero-prefix/type checks; retain initial immutable borrow; replace authority, preserve length|
|2|Write(Vec bytes)|213 /175 /214|cache length before mutable borrow; checked additions/conversion; bounds/borrow panic, not a new capacity error|
|3|SetBuffer|207 /177 /208|cache length then destination mutable/source immutable borrow; source checks before capacity2506; persist buffer then destination|
|4|SetAuthority(pubkey)|213 /176 /214|new zero key allowed; no new-key signature or writability rule|
|5|Close|205 /173 /206|body only log; destination-before-source close effect, then assign System and resize0|
|6|Resize(u64 total size)|211 /172 /212|length must be0; shrink panic; growth cap10000; checked rent subtraction; zero-amount transfer still called; zero-filled realloc|

Resize overfunding panics under checked subtraction; substituting saturating subtraction changes behavior. Realloc's 10240 original-entry growth bound and zero-fill are separate helper requirements. No IDL operation emits a donation event, self-CPI or return-data clear. Origins already observed in the ELF remain evidence; new Rust must not be placed at fabricated historical coordinates to imitate them.

## Concrete codecs, math, sort, contexts, exits and policy

The current source proposals should be carried forward, not reimplemented in a second worker tree. `obligations.json` names exact files and ordinals for each requirement.

1. **Codecs:** fixed state totals are debouncer82, distribution98, tracker90, receipt49; whitelist is13+32*n. Epoch is u128. Shares are35 bytes on wire and36 in observed memory. Checked short prefix3001 differs from unchecked slice panic; payload truncation3003 and discriminator3002 are distinct. Tails are not rejected. Natural vector/string allocation and successful wire values do not establish historical cursor, cleanup, OOM or panic equivalence.
2. **Math/sort:** checked-u32 caller weights sum to10000. For total T, q_i=floor(T*w_i/10000), r_i=(T*w_i)%10000, L=T−sum(q_i); sum(r_i)=10000*L and 0≤L<n for nonempty admitted shares. Stable decreasing remainder order awards one unit to first L and restores original indices. Equal remainders retain occurrence order. This bounds successful values; it does not identify the historical sort implementation, allocation, comparisons, helper inlining or failure mutation. Capacity113 is not a maximum-share policy.
3. **Contexts:** sequential typed consumption must allow an earlier type error to precede missing later accounts. Distinguish canonical versus stored bumps; existing versus System-owned initialization; destination ATA conditional Create versus lifecycle unconditional Create; original donor versus rent payer; native temporary initialization before native pair check. Token2022 sizing uses the mint's live owner. The source bridge must use actual decoded values and shared account backing storage.
4. **Exits:** cached interface owner and live owner/empty-data closed test differ. “Closed” means System owner AND empty data, not zero lamports. Interface exit can fail its mutable borrow without writing data. Streamed state serialization may modify a prefix before failing. Close reads destination then source lamports, checked-adds, writes in order, assigns System, then resizes; rollback is a runtime property. A log or return event is not transaction success.
5. **Policy:** decode base/envelope before rejecting mint/freeze authority presence. For Token2022 perform six independent first-match scans: transfer-fee config108 (absent config authority and both bps zero), hook64 (both optional keys absent), permanent-delegate32 (always reject successful lookup), close-authority32 (absent), default-state1 (exactly1), nontransferable0 (reject presence). Lookup errors are suppressed at these callers only. Do not turn this into a globally strict TLV validator or add bans on skipped extension authorities. Preserve base decode/borrow errors separately from false→6031. This is relay evidence, not resumption of stopped Pump extension work.
6. **Dispatch/event phases:** executing-program mismatch4100 precedes short/unknown101. Business wrapper names log before decoding; IDL logs after admission. Dynamic event paths serialize three times, for log, signed self-CPI and bare return. Event recursion validates first signer/PDA and otherwise returns without payload decode or exit. Real PDA derivation, signer enforcement and serialization panic behavior remain required.

## Runtime, transitive dependencies and remaining attribution

The concrete source packets import bounded normal-runtime premises; those do not erase the following obligations:

- Invocation loader ABI, account arena lifetime, authentic metadata, duplicate alias resolution, Rc clone/drop/overflow and RefCell borrow errors; separate decoded caches from live CPI-mutated storage.
- PDA and create-with-seed behavior, Rent and its float lowering, realloc serialized/live lengths, zeroing, actual System/ATA/token/Jupiter/self-CPI execution and rollback. External dependency identity is not established merely because a public program ID or syscall name is recognized.
- SPL base/extension unpacking and required-account sizing, plus owner/error conversion and reload semantics. Existing Token/Token2022 byte recovery elsewhere does not automatically establish which linked relay helper version was used.
- Error object allocation/layout, field origins, compared key/value direction, ProgramError conversions, report286/lower290, formatting, panic literals and cleanup. Bare numeric codes are insufficient.
- Allocator, memcmp/copy/set, sorting, integer/soft-float runtime and every indirect function-pointer target. The full original closure, not only immediate business callees, is required. `direct_dependency_closures` covers every business wrapper, all seven IDL parser roots, IDL dispatch and event recursion; branches/fallthroughs are separately retained and are not assumed to be normal returning calls.
- Every referenced literal/object and nested relocation: data extents remain unknown unless bounded in a retained packet. Raw record equality would still not prove a relocated pointee's semantics or transitive closure.
- Historical source/dependency/build provenance: source revision, crate lock/features, compiler/LLVM/SDK/sysroot, target, linker/strip phases, module organization, section ordering and all bytes outside text. The earlier unavailable source repository is not fetched or searched again. Do not brute-force compiler, flags, source layout or paths.

The ledger retains all source-unattributed rows and every old ambiguity. It does not characterize an unconsumed helper as safe, dead or matched. The explicit stopped cross-program lanes remain excluded; no semantic implementation or inspection of those windows was undertaken.

## Prioritized next actions and acceptance boundary

**First, root completes source composition** from the current context proposal and exact additive IDL patch, preserving the fixed N09 dispatch/event contracts and implementing real runtime/error adapters. This is existing authorized root work, not assumed complete at c1ffdd0. No new application patch is justified by this inventory: duplicating the concrete packets would create competing ownership without new evidence. The already-published IDL integration patch is retained unchanged and explicitly pending.

**Second, root supplies the first authorized real candidate and actual symbol ELF**, exact source/dependency/tool manifests and any independently authorized validation evidence. Re-run this tracker on those artifacts. It will report full-file sizes/hashes, exact positional mismatch ranges/counts including tails, section/header/relocation records and every candidate row. Do not compare against another program or pass the original as a pretend source-built candidate.

**Third, work the exact residuals by dependency group**: source/API composition errors first; then body/call/data correspondence, unresolved function pointers and linked helpers; finally evidence-supported build/layout attribution. Retain each ambiguous pair and uncovered region through every iteration. A normalized body match cannot close raw byte identity; a moved raw body cannot close file layout; callee byte matches cannot close referenced data; finite saved comparisons cannot close whole-program equivalence or security.

**Closure is exact complete original/candidate file equality**, with evidence provenance intact. At this snapshot there is no candidate and thus no mismatch-reduction iteration to perform. The completed deliverable is a reproducible missing-work inventory and future-candidate tracker, not a claim that relay reconstruction is complete.
