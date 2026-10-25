# Integrated relay natural-source hypothesis

This package assembles **all 11 IDL instruction bodies** into one Rust source tree with shared state, argument/account/event codecs, checked donation arithmetic, stable-remainder allocation, explicit token/System/Jupiter CPI construction, and distinct wrapper phases. It is a static, uncompiled reconstruction hypothesis. It is **not an original-source recovery, deployable program, accepted implementation, or whole-program equivalence result**. All top-level instruction contexts remain incomplete at the exact boundaries listed below. No handler, completion, comparison-case, or binary-match count changes.

The program-source baseline is fixed published `476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40`. `docs/COMPLETION.md` and `docs/PARALLEL_WORK.md`, retained as `inputs/`, were read with `git show`. The captured relay ELF, IDL, window inventory and dispatch were independently reread from this same checkpoint and compared with the approved donation study's copies. The later checkpoint is not substituted. ELF: **830448 bytes**, SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`; IDL SHA256 `b075f7b39b019630067e5f6a67015396ccbd66d282c7da048753660506472d6c`.

`source/handlers.rs` contains the concrete bodies. `source/runtime.rs` exposes low-level CPI/token decoding/log/syscall primitives, not a trait per business action. The arithmetic and transfer-recipient loop are implemented locally. `source/anchor_contexts.rs` supplies natural typed Anchor declarations for all eleven contexts, with uncertain receipt/output-ATA initialization explicitly marked. It is not wired into the ordinary source modules because no historical dependency graph or faithful generated parser has been established. `dependency-provenance.json` records that boundary; there is no invented Cargo.lock or toolchain version.

## Integration decisions grounded in caller bytes

### Config, epoch, share and amount types

A single `Key = [u8;32]` represents config bytes and key bytes in the ordinary model. The public pubkey-config variants use the same existing 32 bytes; they do not hash, derive an authority, or fetch a config account. Argument readers preserve `amount:u64`, config32, `tip_bps:u16`, Borsh UTF-8 string and credited_to32. Epochs are **u128**, including 16 little-endian seed bytes. Pubkey versus byte-array declaration is retained in the Anchor hypotheses and IDL argument ledger.

Account wire common prefix is discriminator8, bump1, state1, config32, mint32. Tracker epoch begins at74 (90-byte account); debouncer total at74 (82 bytes); distribution epoch at74 and amount90 (98 bytes). Receipt is discriminator8, bump1, distribution32, output_amount8 (49 bytes), with no state enum. The previous workers' internal offsets refer to different parsed-context/Rust layouts and are never copied into the wire codec.

Share wire is kind1/address32/bps2, **35 bytes**, while original memory stride is36, with address0/bps32/kind34. Kind values0/1/2 become Beneficiary/Fee/Tip metadata. Shared108 compares recipient **decoded token authority** to share.address, not the token-account address, at123632. It then compares mint at123704, program owner at124032, and only afterwards skips a zero-amount CPI. No new ATA, recipient uniqueness, positive weight or native-transfer rule is introduced. Receipt order remains original share order, including zero allocations and duplicates.

### Corrected shared108 source/authority inversion

The distribution study's report/interface labels K+16 as authority and K+160 as source. The swap study identifies the opposite. Original caller100 resolves this disagreement:

* 109464 loads the output token AccountInfo through parsed context+736. Its key is loaded109520, saved109656, then copied111024/111032 to caller frame-368 = **K+16** (K is frame-384).
* 110304 loads the distribution AccountInfo through context+384. Its key flows110424/110432/110648/110656 to frame-224 = **K+160**.
* 111256..111288 passes K to shared108 with signed relative CALL target119440. Callee copies K+16 at119496..119528 into frame-1088 and K+160 at119632..119672 into frame-944.

The integrated source uses **source vault, mint, token program, distribution authority** at K+16/+64/+112/+160. `integration-anchors.json` preserves exact original instruction bytes. This is a correction to interpretation, not a change to either predecessor publication. Their original reports, source proposals and manifests remain byte-for-byte preserved under `studies/`.

### Donations and native endpoints

All five donation functions call the same concrete shared body after context admission. Regular token variants source the donor's canonical ATA and send to the debouncer ATA. The with-payer variant changes account-init rent funding only; transfer authority remains `from`. credited_to is event data, not an immediate recipient or signer. Config and mint bind tracker/debouncer PDAs without an epoch seed.

Native92/93 perform System transfer from→temporary PDA, then SyncNative, shared token donation, then CloseAccount temporary→from with from authority. The temp PDA uses `[donate_native_wsol_tmp_v1, from, token_program]`; it is not a canonical ATA. Failures short-circuit; close is not a finally operation. Native donations still accumulate wrapped token units at the debouncer ATA.

Shared112 checks byte-length<256 (6009), bps<=10000 (6018), supported mint owner (6029), then builtin/whitelist bypass or the fallible safety predicate106 (false→6031). The non-bypass branch at132272 jumps forward to134304, so the later numerical PC of106 does not mean safety runs after initialization. It rejoins the success path before state mutation. Tracker and debouncer initialize only from uninitialized state. Checks then run tracker config, debouncer config, debouncer mint/state, tracker mint/state (6002/6006/6007). No invented amount>0 gate occurs.

The token destination is decoded before and after transfer. Actual delta, not requested amount, feeds the event and accumulation. Ordered checked operations are delta subtraction, **u64** delta*bps, total+delta; failure6008. Tip is product/10000 and is not removed from total or immediately paid. A u128 product replacement would incorrectly admit some original overflow cases. Predicate106 is an explicit incomplete application function, not an external runtime method or a permissive stub. Bypass paths can use the concrete body under context/runtime premises; arbitrary non-whitelisted mint safety cannot.

### Epoch, swap and distribution lifecycle

Close96 uses recorded debouncer.total_amount, rejects zero6012, then requires full tracker.current_epoch==argument epoch6011. It copies stored debouncer identities into a new distribution; it does not substitute argument config bytes, add a state guard, or require equality with the live token balance. TransferChecked uses debouncer PDA seeds. After CPI success it zeroes total, then checked-increments u128 epoch (6008), then returns a preincrement epoch event. A late error relies on transaction rollback.

Just-swap99 checks closed epoch6028, initialized state6007, debouncer/distribution mint6006 and non-settlement input6006. Combined100 checks closed epoch, checked-u32 BPS sum=10000 and enough remaining accounts; it does **not** repeat the three extra just-swap checks. Its recipient prefix goes to108 and Jupiter suffix to91. Context checks are separate and remain required.

Jupiter helper90 constructs ordered metas whose signer bit is key==distribution.key, with writable copied from AccountInfo; it does not preserve arbitrary incoming signer bits. Opaque data and that account slice go unchanged to the address-constrained Jupiter program. Helper91 snapshots cached balances, invokes, reloads input then output, checked-subtracts input, requires spent==distribution.total (6021), checked-subtracts output, and requires positive output delta (6023). No minimum-output guard or equality of starting balance and recorded amount is invented.

Just-swap writes receipt.distribution, observed output and canonical bump; reloads/burns residual input and closes the input token account. Its wrapper later serializes distribution and receipt; both remain live. After-swap parser146 independently binds receipt.distribution to the actual distribution key (6033 at412024/412032). After-swap97 selects receipt.output_amount, requires positive value and sufficient cached source balance (6012). Non-swap98 selects distribution.total_amount and only requires sufficient balance; zero total is allowed locally. Its mint is nevertheless constrained to settlement in the original context; the body does not invent another guard.

Both distribution routes call the concrete shared recipient loop, reload the source, burn any residual, then close its token account to the relayer. Residual is a fresh token decode, not old_balance-total. Combined calls108 with measured output, finalizes input the same way, then closes output directly (no additional invented output burn). Burn is tag8+u64; close is tag9; TransferChecked is tag12+u64+decimals. Genuine external token semantics may reject or apply extension effects. Transfer receipts record requested debits, not measured net recipient credits.

After event and return-data phases, after-swap exit147 closes distribution then receipt; non-swap149 and combined155 close distribution. Helper282's concrete normal close fragment reads destination/source lamports, checked-adds, writes destination, zeros source, assigns System, reallocates zero. It preserves sequential alias-sensitive effects; overflow is a framework failure, not fabricated custom6008. Full generated exits also perform owner/closed/borrow/serialization operations; that integration is explicitly incomplete.

### Arithmetic and wrapper phases

The callers accumulate u16 weights in checked u32 and require exactly10000. There is no business max113 shares:113 is decoder initial capacity. Under admitted sum, each weight<=10000, q=floor(total*weight/10000) fits u64, sum(q)<=total and leftover L<n. Sum remainders=10000*L. Stable decreasing remainder order awards one to the first L records, and results are placed by original index. Equal remainders retain input occurrence order. Zero-weight entries cannot win a leftover. `arithmetic.rs` implements this natural successful-value hypothesis with a stable sort; it does not claim the historical sort algorithm, resource cost or failure mutations. The imported conditional sort composition closes the large-input ordering premise under valid allocations/storage, frame separation, copy semantics and adequate resources.

For event-bearing instructions the schedule is argument decode → context parsing/init → access control if applicable → body → event serialization/log → signed event self-CPI → wrapper return serialization/set-return-data → generated exit. Event self-CPI targets the **embedded relay key**, not a newly imposed equality constraint on the supplied program AccountInfo. The ordinary source keeps those phases separate. Upsert has no event/return-event phase: after decoding/allocating keys, parsing/init and access control it rejects len>32 (6032), replaces the vector and bump, then runs whitelist serialization. It retains duplicates and ordering. Shorter writes leave the unused account tail unchanged.

Return/event payload starts with inner tags0 donation,1 close,2 processed,3 swapped. Logs add the respective Anchor event discriminator; self-CPI adds `e445a52e51cb9a1d` before that; return data contains the bare inner payload. An emitted log or set return data does not establish successful exit or transaction commitment.

## Exact unresolved boundaries

| Function/boundary | Status and consequence |
|---|---|
| `parse_context` for all11; original121/126/131/135/138/142/146/148/150/154/156 | **Incomplete application integration.** Typed Anchor hypotheses retain known seeds, ownership types, signer/writable/address/ATA relationships. Full generated precedence, fresh/prefunded creation and alias/borrow branches are not implemented. No unchecked-account admission replacement is supplied. |
| `safe_mint_106` [115456,118896) | **Incomplete application policy.** Authority options and Token2022 TLV scans cannot be replaced by a generic safe=true or blanket6031. Returns analysis-only `Incomplete`. |
| Receipt constructor151 and output ATA152 | Original constructors and call schedule are retained; exact source init attributes/transitive behavior remain unresolved. Anchor file marks these gaps instead of choosing init_if_needed. |
| Native predicate103 and temp init129/134 | Mint/program gate and distinct native temp path retained in ledger/study; complete natural parser remains incomplete. |
| `account_exit`125/130/141/145/147/149/153/155/158 | **Incomplete integration.** Concrete wire serializers and helper282 fragment exist; full owner/closed/borrow/error metadata and generated order still need translation. No successful no-op exit. |
| Error representation | Numeric relay/framework codes and order are modeled. Compared values, origins, allocation, formatting, cleanup, panic and historical error-return ABI are not equivalent. `Incomplete` is a local analysis boundary, never a deployable error code. |
| Runtime/Token/Jupiter/syscalls | Genuine AccountInfo aliasing/borrow, token decoding/extensions, PDA signer privilege, CPI effects/failure, rent/system/ATA semantics, rollback, logging and return-data are bounded external premises. They do not absorb the incomplete application functions above. |
| Dependency/build provenance | Unknown historical Rust/SDK/Anchor/SPL versions and lockfile; no Cargo package or authenticated historical lock invented. No compilation, typecheck, execution or acceptance. |

`source/context_existing.rs` concretely factors the checked-decoded existing-account size/owner/rent continuation (90/82/1037). It does not implement the System-owned branch or bypass the preceding typed-owner gate. The Anchor sketches do not insert has_one=config, initialized-only epoch-close, unique recipients, positive donation, stricter trailing-data exhaustion, input-balance equality or signer bypasses.

## Integrity and review procedure

`instruction-ledger.json` binds every instruction to source line spans, original wrapper/parser/adapter/body/serializer/exit ranges and helper windows. `source-byte-ledger.json` binds all source components. `consumed-code.json` records selected half-open ELF ranges, whole-window SHA256 and regenerated call/branch operands. Signed relative calls use `pc+8+8*imm` only when source nibble1; indirect call operands remain unresolved. Window numbers are inferred inventory extents, not historical function identities. Whole-input hashes in `input-manifest.json` are provenance, **not semantic acceptance of every byte**. Text source ranges are one-based inclusive; ELF ranges are half-open.

Original predecessor manifests/seals are retained verbatim. This is a selected evidence extract, not a copy of every predecessor file: omitted scripts/caches/other inputs are not silently claimed as locally verified. The verifier checks every retained predecessor artifact covered by its original manifest, plus this package's complete sealed inventory. Supporting earlier reports remain conditional source arguments, with their original historical checkpoint qualifications intact.

Run `python3 -B verify.py` in a separate copy. It uses only the Python standard library and copied inputs; verifies seals, whole inputs, original selected bytes, instruction phase edges, source ledger coverage, and independent hard-coded operand anchors. It performs **no target execution, Rust parsing/typechecking/building, transaction generation or runtime probing**. Passing demonstrates evidence consistency and immutability, not proof of the handwritten Rust semantics. Root must review and separately authorize/perform actual implementation tests before promotion. Verification receipts and CLI telemetry remain outside publication.
