# Fees initializer context layout: static field-change evidence

The eight-byte event-account shift is explained by **the candidate's boxed `pump_global`, versus the original parser's inline 744-byte account representation**. The proposed change is confined to `programs/pump-fees/src/contexts.rs:54`:

```diff
- pub pump_global: Box<Account<'info, crate::pump_global::Global>>,
+ pub pump_global: Account<'info, crate::pump_global::Global>,
```

This proposal is supported by original parse-result dataflow, not inferred window similarity alone. It is **not applied or compiled**. Historical source spelling is not uniquely recovered: an equivalent inline wrapper could have produced the observed representation. Changed-source code generation, stack behavior, transitive equivalence and whole-byte identity remain unverified. No other field change is proposed.

## Accepted inputs and macro correction

The implementation baseline is accepted checkpoint `8099031`; subsequent publication commits do not change that baseline. Earlier function inventories predate accepted Fees candidate `e501ca2`. This study uses the prior `fees_functions/focused-proof.json` and report as immutable leads; it does not relabel historical inventory counts as current proof.

| Input | SHA-256 |
|---|---|
| Original Fees ELF | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |
| Accepted Fees candidate | `e501ca2c744373e5653a5ac7e25a3fd20f6058765808b888c3605fd03adba60f` |
| Candidate symbol ELF | `173b1310cd99717906797d9253a01d40c56ba6fc8421f93828c49e860d353b78` |
| Accepted Cargo.lock | `c198e9ce0aac25cf7b7ec20402b79739c8e670a40d2c8ae3a25bb7c0ad2cab3e` |

**The actual selected macro crates are 0.31.2, not 0.31.1.** `anchor-lang` itself is pinned to 0.31.1; the accepted lock selects `anchor-syn`, `anchor-derive-accounts`, `anchor-attribute-event` and `anchor-attribute-program` 0.31.2. The relevant `anchor-attribute-account` and `anchor-derive-serde` crates are also 0.31.2. `solana-account-info` is 2.3.0. The verifier checks the cached crate archive hashes against that lock, then checks each source copy byte-for-byte against its archive member. The lock, program manifest, source files and Pump IDL are bound to the accepted candidate's retained `source-sha256.json`. Candidate symbol text equals the accepted executable text. This proves selected-source bindings, not unique historical original dependencies.

The prior study's 0.31.1 event macro remains preserved as `inputs/prior-anchor-event-cpi-0.31.1.rs`. The selected 0.31.2 macro also emits by-value event `AccountInfo` fields. Its syntax does not account for the eight-byte difference by itself.

## Types and actual physical layout

Source declaration order is authority, pump_global, fee_program_global, system_program, then the two macro-added accounts. **Rust physical order is different.** Offsets below are relative to the accounts aggregate, not the outer `Context`, serialized account data, ELF start, or parser stack.

| Field | Selected candidate type | Candidate byte range | Original byte range |
|---|---|---|---|
| fee_program_global | `Account<FeeProgramGlobal>` | [0,344) | [0,344) |
| authority | `Signer`, one `&AccountInfo` | [344,352) | [344,352) |
| pump_global | `Box<Account<Global>>` | [352,360), pointer to 744 bytes | [456,1200), inline 744 bytes |
| system_program | `Program<System>`, reference plus zero-size marker | [360,368) | [352,360) |
| event_authority | `AccountInfo` by value | [368,416) | [360,408) |
| program | `AccountInfo` by value | [416,464) | [408,456) |

The original context is **1200 bytes**, candidate **464 bytes**: total difference **736**, not eight. The eight-byte local shift occurs because the candidate's box pointer precedes the system/event fields, whereas the original inline account follows them. This is an observed layout explanation; it is not a promise that a future compiler invocation will reproduce the entire ELF.

Selected sources: `inputs/contexts.rs:47–58`; `anchor-event-cpi.rs:28–70`; `event-attribute.rs:230–237`; `derive-accounts.rs:632–635`; `try-accounts.rs:16–80,175–198`; `anchor-syn-lib.rs:317–328`; `anchor-boxed.rs:23–32`. `try_accounts` consumes accounts in declaration order and constructs the named struct; it does not impose a C field layout. The non-init boxed field uses `T::try_accounts(...).map(Box::new)`. The `init` boxing branch in `anchor-syn-lib.rs` is not the path used for this Pump Global field.

`Account<T>` contains `T` and an `&AccountInfo` (`anchor-account.rs:227–230`). In these binaries the reference is at wrapper offset 0. `Signer` is a reference (`anchor-signer.rs:38–40`); `Program` is a reference plus `PhantomData` (`anchor-program.rs:78–81`). Their SBF pointer width and alignment are eight bytes. `AccountInfo` is explicitly `repr(C)` (`account-info.rs:20–39`), 48 bytes with alignment eight:

| Member | Type | Relative offset | Size |
|---|---|---:|---:|
| key | `&Pubkey` | 0 | 8 |
| lamports | `Rc<RefCell<&mut u64>>` | 8 | 8 |
| data | `Rc<RefCell<&mut [u8]>>` | 16 | 8 |
| owner | `&Pubkey` | 24 | 8 |
| rent_epoch | `u64` | 32 | 8 |
| is_signer | `bool` | 40 | 1 |
| is_writable | `bool` | 41 | 1 |
| executable | `bool` | 42 | 1 |
| trailing padding | — | 43 | 5 |

The original parser clones both event accounts, including incrementing their Rc counts, into the two 48-byte slots. Input account consumption advances by 48 bytes. These are not boxed event accounts.

`FeeProgramGlobal` is defined at `types.rs:80–88`. Its six data fields are bump `u8`, authority `Pubkey`, disable_flags `u8`, social_claim_authority `Pubkey`, claim_rate_limit `u64`, reserved `[u8;256]`. The selected ordinary account macro (`attribute-account.rs:225–226`) retains the struct and adds serialization/deserialization/Clone derives; it does not add a representation attribute. The two binaries share handler writes to aggregate offsets 336 (bump), 264–295 (authority), 337 (disable flags), 296–327 (social authority), 328–335 (rate). The account reference occupies [0,8); the reserved array occupies [8,264); trailing padding [338,344). The serialized payload is 330 bytes, plus eight discriminator bytes = the declared 338-byte allocation. That wire size is **not** the 344-byte Rust account wrapper size.

The Pump account is generated from retained `inputs/pump.json`, type `Global`, via `lib.rs:27`, `pump_global.rs:4`, `declare-accounts.rs:6–115`, and `declare-common.rs:158–232`. Its complete field schema is preserved in the IDL; it has no explicit representation override. The original parser receives an account wrapper with reference at +0, authority Pubkey at +8, and total size 744 (Global value size 736). The original `has_one` path compares that authority with the first input account key. This study does **not** assign unneeded internal in-memory offsets to every other Global field from IDL serialization order; those offsets remain outside this proof.

The outer `Context` is a separate object (`anchor-context.rs:24–36`): program-id reference at 0, accounts reference at 8, remaining slice pointer/count at 16/24, three bump bytes at 32–34. The handler loads its accounts pointer at +40 from context +8. Its fee-global bump comes from context +33. `bumps.rs:13–79` generates the three `u8` bump members for pump_global, fee_program_global and event_authority. None of this is an eight-byte bump insertion.

## Original parser dataflow

All ranges are ELF file offsets with exclusive ends. LLVM listings display instruction slot numbers; multiply them by eight. `result.json` contains full range hashes, raw trace blocks and decoded instruction anchors; raw executable inputs are retained.

1. The original wrapper [618504,620112) calls the parser at **618936 → 308352**, then the handler at **619224 → 85560**. The candidate wrapper [365488,367112) calls **365920 → 102056**, then **366224 → 463456**. Attribution thus follows the incoming handler caller and parser call, not a best-scoring similar window.
2. Original parser [308352,315176) receives its return destination in r1 and keeps it in r6. The first account call is at 308408; the second at **308488 → 71656**, with output at stack -2008. The error branch supplies the literal `pump_global` (pointer at 308560, length 11 at 308576). Account order, literal, subsequent authority comparison, and the selected source identify the second field.
3. The original second-account helper [71656,71840) consumes one input `AccountInfo`, then calls [35064,36072). The complete normalized helper windows and relocation patterns match candidate [59104,59288) and [28568,29576), respectively. This is supporting evidence, not transitive semantic closure. The `Account::try_from` success block [35912,36072) writes the input account reference at return +0 (instruction **36032**).
4. After the second parse returns, the original saves its first two words from stack -2008/-2000. It copies **723 bytes** from stack -1992 to -1264 (instructions [308720,308768)), retaining the tail bool/four bytes separately. On final success [314680,315176), it copies those 723 bytes to **return +472**, writes the original first two words at **+456/+464**, and tail bytes at **+1195/+1196**. Together these account for an inline [456,1200) value. The `has_one` path [312784,313160) uses its +8 authority and compares 32 bytes against the first input account key.
5. The candidate second-account path [102056,102608) instead allocates **744 bytes**, aligned to eight, copies the complete account return into that allocation, and keeps the allocation pointer in r7. Final success writes **r7 to return +352 at 108864**. Original success writes the system reference at +352, event key at +360; candidate writes system at +360, event key at +368. The original is not merely dropping an arbitrary field or packing an event struct.
6. Wrapper movement corroborates sizes: original copies 1179 bytes after its first 16 bytes, then separately moves the remaining five bytes (1200 total). Candidate copies 442 bytes after its first 16 bytes, then moves six bytes (464 total). Both place the resulting aggregate address into outer Context +8 before invoking the handler.

The original parser SHA-256 is `aa2508c6e822a6828951c157b01b908ad6e49258784d52b917d0c346bf2e8d2a`; candidate parser SHA-256 is `ca9851ccd760bdb7f1fc6f75b10761b53a41414ab9ed35f09a4ee658db02f310`. Original wrapper SHA-256 is `261ba8ee1ba4cbc3a48e665dcb6d6decd3c24db0a4559f005d93d0c5ec140f05`. All other range hashes are in `result.json`.

## Eight handler loads

The complete handler windows are candidate [463456,466448), original [85560,88552). Normalizing only call operands and relocated pointer immediates leaves exactly these eight differences:

| Handler-relative instruction | Member | Candidate displacement | Original displacement |
|---:|---|---:|---:|
| 968 | event_authority.lamports | 376 | 368 |
| 1008 | event_authority.key | 368 | 360 |
| 1048 | event_authority.data | 384 | 376 |
| 1304 | event_authority.executable | 410 | 402 |
| 1320 | event_authority.is_writable | 409 | 401 |
| 1336 | event_authority.is_signer | 408 | 400 |
| 1352 | event_authority.rent_epoch | 400 | 392 |
| 1368 | event_authority.owner | 392 | 384 |

The prior focused proof's nine immediate calls and two literal spans remain inherited evidence, preserved verbatim. The new verifier recomputes the whole handler difference and the parser/layout proof; it does not claim to rerun all the prior study's transitive checks.

## Verification and remaining boundary

Run from a copied `publication/` directory with Python 3.11+:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 verify.py
```

The standard-library verifier checks the publication manifest, accepted source bindings, archive provenance, exact handler deltas, wrapper/parser call edges, helper normalized bodies, instruction-level transfer anchors, output stores and complete regenerated `result.json`. It requires no external repository, LLVM, build tools or network. Raw bytes are never patched. Trace instruction decoding includes raw eight-byte slots; an LDDW continuation slot is data, not an independent instruction.

The verifier was run successfully from a separate copied directory within this worker's assigned directory. Manifest coverage excludes the manifest itself and Python caches; no mutable CLI telemetry was copied or sealed. The sealed files are reviewable evidence, source, analysis and code only. Root REPORT.md/result.json are convenience copies outside the seal.

No builds, runtime probes, chain calls, source edits, commits, external messages, publication, further workers or excluded research were performed. Removing the Box is now a specific static proposal, but acceptance still requires separately authorized fixed-recipe compilation and appropriate retained checks. Existing whole-byte completion remains 0/4; bounded comparisons are not semantic or exhaustive-security proof.
