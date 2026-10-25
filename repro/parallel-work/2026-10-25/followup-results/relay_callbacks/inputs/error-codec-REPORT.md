# Relay error codec follow-up

The normal-return error contract is now linked from fixed account decoder checks to embedded names/messages, optional metadata, two IDL-identified dispatcher routes, and final u64 return conversion. **Exact total historical error ABI remains incomplete.** No Rust fragment is supplied because allocation, formatting, indirect cleanup and historical dependency identity are not fully closed. This is a substantive static extension of `wave2-results/relay_codecs`, not a source-equivalence or security certificate.

All byte ranges are decimal, half-open ELF offsets. Instruction PCs refer to the same captured relay. Function ranges in the ledger remain inferred windows, never source identities. No source build or runtime probe was performed.

## Frozen input and authority

Checkpoint: `517d77db988d8c63b6cf476f0be138c5a4f3128a`. Binary: 830448 bytes; SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. `provenance.json` records full Git blob IDs, SHA256, size and frozen paths for every copied input; extracted source members retain their archive/member provenance. No parent work files, excluded audit packages, private inputs, or prohibited function bodies were consumed.

The copied predecessor REPORT is evidence of the previous scope only. Its 8099031 implementation checkpoint is stale and superseded here by the assigned checkpoint. Pump5c1c1c2d and Fees01fedce5 are current per assignment; AMM5a68db and Mayhem9e4e19 are unchanged. All four original whole-file comparisons remain false; the assigned 140 bounded / five partial / five unrecovered handler counts are not changed by this relay analysis.

## Exact normal parser decisions

| Parser | Checked window / body | Discriminator | Minimum bytes |
|---|---|---|---:|
| DebouncerV1 | [505216,506304) / [506304,507440) | 8989c04d6eb8bd1c | 82 |
| DistributionV1 | [507440,508560) / [508560,509800) | e4af7289a5120b0e | 98 |
| EpochTrackerV1 | [509800,510920) / [510920,512088) | 820c32e2aa6da09b | 90 |
| SwapReceiptV1 | [513680,514800) / [514800,515416) | e6ee2c1cfc1b42de | 49 |

1. Fewer than eight discriminator bytes selects 3001. Otherwise mismatch selects 3002 before any body decode.
2. A matching discriminator with insufficient body data selects 3003. For the first three accounts, lengths 8/9 fail before the state load; available state byte [9,10) accepts 0/1 and rejects every other value before later field-length checks.
3. Invalid state also selects **3003**, with no rejected-byte payload in the outward error. The formatter temporarily retains the rejected byte, but its error is discarded/cleaned before returning the numeric builder result. Intermediate constant 20 is not the returned program code.
4. Trailing bytes are accepted by these fixed bodies. There is no final slice-exhaustion check or caller slice-cursor write. This does not prove all surrounding account policies permit every such account.

Retained IDL `types` associates tags 0/1 with `Uninitialized`/`Initialized` for the three state enums; the bytes establish tag acceptance independently. This attribution is not historical Rust identity. SwapReceiptV1 has no state enum. None of these four wire structures contains an Option field. Optional *error metadata* is addressed separately below.

The predecessor's full checks, byte loads and short/invalid-state paths are rederived under `static-evidence.json.prior_wire_evidence`. Key state PCs: 506376/506392/506400, 508632/508648/508656, 510992/511008/511016. Short-body entries: 506448, 508704, 511064, 514936. Their helper result flows to the builder at 665312 with code 3003, including invalid-state convergence. Unchecked <8-byte panic edges remain outside the checked API and are not silently converted to errors.

## New name/message binding

The two selectors at 662256 and 665904 are traced by folding only their constant comparison trees for the already-proven codes. Every visited instruction is retained. This is static branch analysis, not program execution. It establishes selected data, rather than assuming that adjacent strings belong to these errors.

| Code | Name and bytes | Message and bytes | Message descriptor |
|---:|---|---|---|
| 3001 | AccountDiscriminatorNotFound [762027,762055) | No discriminator was found on the account [765030,765071) | [776520,776536) |
| 3002 | AccountDiscriminatorMismatch [762055,762083) | Account discriminator did not match what was expected [765071,765124) | [776536,776552) |
| 3003 | AccountDidNotDeserialize [762083,762107) | Failed to deserialize the account [765124,765157) | [776552,776568) |

Name-selector leaves are 663584, 664632, 662448 respectively. They converge at 664752 through the name-copy helper [646064,646272); 3003 gets length 24 at 664744. Message leaves are 667048, 667864, 666080, converging at [668360,668456). Each descriptor has a retained type-8 ELF relocation record. Its raw upper word equals the listed string offset and its length equals the exact message length. No relocation was applied and no binary was patched; resolving this encoding into live pointer values remains a separate obligation.

Retained Anchor `inputs/anchor-error.rs:205-216` defines these names/messages and numbers; line 21 specifies offset zero (not the custom-error offset 6000). `inputs/anchor-syn-0.31.2-error.rs:59-91` constructs the named error with both optional fields None. `inputs/anchor-attribute-account-0.31.2-lib.rs:242-258` supplies precisely the check order and maps every deserialize error to AccountDidNotDeserialize. These are independent retained reference sources, **not a proven dependency lock for this relay**. The deployed selectors and consumer paths, rather than a layout resemblance, ground the binary claims.

## New optional-field and caller dataflow

The builder [665312,665904) allocates 160 bytes, stores the code at +152, stores 2 at +0 and +80, and returns `(0,pointer)` through its output pointer. The consumer at [652688,652752) sends tag 0 to the logger at 655256. That logger's +0 branches choose Source on 0, AccountName on 1, otherwise the no-origin format. Its +80 byte equal to 2 exits before compared-value logging. The actual descriptor strings are retained at [775328,775568): “AnchorError occurred”, “AnchorError thrown in”, and “AnchorError caused by account”. This producer/consumer evidence links the optional tags to their semantic meanings; it does not assert a portable Rust layout.

Thus normal 3001/3003 construction has origin=None and compared_values=None. Mismatch construction initially attaches source coordinates, then overwrites origin with the account **type** name and tag 1. For Debouncer, [505568,505672) constructs the initial object and [505880,505960) writes `DebouncerV1`, pointer/length and origin tag 1. The analogous full checked windows are retained for all four. None retains expected/actual discriminator bytes as compared_values. This agrees with `anchor-error.rs:337-346,485-551` and account macro lines 249-250.

The following routes are grounded in IDL discriminator constants, their dispatcher comparisons/calls, and verified direct call operands. They cover all four parsers through two instruction routes, not every instruction/account policy:

| Parser | IDL dispatch call | Subsequent call PCs → targets |
|---|---:|---|
| Debouncer | close_donation_epoch_v1 at 516856 → 542112 | 542536→372816; 374120→62736; 62904→19368; 20024→505216 |
| EpochTracker | close_donation_epoch_v1 at 516856 → 542112 | 542536→372816; 373552→63304; 63472→21392; 22048→509800 |
| Distribution | distribute_after_just_swapping_v1 at 517192 → 547224 | 547520→402000; 403184→62552; 62720→22416; 23072→507440 |
| SwapReceipt | distribute_after_just_swapping_v1 at 517192 → 547224 | 547520→402000; 403968→63488; 63656→18400; 19056→513680 |

Direct caller error forwarding is visible at [20032,20096), [22056,22120), [23080,23144), [19064,19128). The intermediate account-list wrappers call with the output pointer preserved. The larger account-context callers replace origin for **all three codes** with instruction account names, so returning the parser object directly would misrepresent observable diagnostics:

- `debouncer`: [374128,374440) writes a 9-byte name; [375072,375104) writes origin tag 1, forwards the two error words and returns context error tag 2 at [373096,373112).
- `epoch_tracker`: [373560,373880) writes 13 bytes, then shares that same error return.
- `distribution`: [403192,403472), [404744,404800) write 12 bytes/tag 1; [402400,402416) forwards the tag word and [402904,402920) returns context error tag 2.
- `swap_receipt`: [403976,404008) branches on the account result; [404800,405096) writes 12 bytes/tag 1 and joins the same return.

These writes preserve +152 code and +80 compared-values sentinel. Dispatcher wrappers forward those words at [542544,542600), [542760,542784), and [547528,547568), [548360,548384), [549072,549104). These observations are conditional on the ordinary allocation/formatting path completing; resource failures can preempt the error return.

## New outward return representation

All dispatcher arms join [516088,516216). The normal error arm logs the pair via 652688, then calls 657016 with r2=tag and r3=object pointer. On the tag-0 path, [657016,657080) reads **u32 object+152** and writes an intermediate result whose first word is `0x8000000000000000` and whose code is at +8. This is an observed internal representation, not the final Solana return value.

The ELF entry is 566024. After calling the dispatcher at 566152 it distinguishes the success sentinel `0x800000000000001a`, then calls 692392 at 566264 for errors. The custom arm [692952,693000) loads the u32 at +8 and, when nonzero, copies it to the return accumulator. [693416,693432) returns that accumulator; [566328,566344) returns it from the entry. Therefore an ordinarily completed traced parser-error route returns **u64 3001, 3002 or 3003**, unshifted. The high-bit intermediate tag and the state-error constant 20 are not outward codes.

This agrees with retained Anchor conversion `anchor-error.rs:569-578` (AnchorError→ProgramError::Custom(code)) and Solana `solana-program-error.rs:243-285` (nonzero Custom→u64 code; zero is special). No dependency version or historical source symbol is inferred from this agreement.

## Remaining exact obligations

| Obligation | Concrete prerequisite |
|---|---|
| Total error path including allocation failure, formatter failure, panic and abort | Close the reachable allocator/formatter failure edges (566472, 712224, 712256, 716352) and their return/nonreturn contracts using retained public source and static bytes. |
| Discarded invalid-state/short-input object cleanup | Resolve the descriptor/vtable and indirect drop calls at 506616, 508872, 511232, 515096, including whether cleanup can preempt the outward error. |
| Exact live pointer and representation ABI | Establish the deployed loader relocation contract for these recorded type-8 entries and the actual historical Rust/dependency/toolchain identity. Do not patch bytes to obtain it. |
| Exhaustive caller semantics | Audit the remaining callers beyond the two proven instruction routes before generalizing metadata replacement or admission behavior to every instruction. |
| Historical source identity | Obtain a public revision/dependency lock or other independent identity evidence; the 0.31.1/0.31.2 retained references alone do not pin the relay source. |

Accordingly `exact_error_abi_recovered=false`, `historical_source_recovered=false`, and no scratch Rust is emitted. This work changes no core source, prior package, handler count, deployment, or whole-byte result. No fixtures, runtime tests, builds, signature changes, network calls, additional workers, commits or pushes were performed.

## Verification

Run `python3 verify.py` from any copy of this directory. It checks the complete SHA256 manifest (excluding itself), recomputes Git blob hashes for copied blobs, verifies archive-member provenance, and rederives the wire evidence, selected constant paths, relocation records, dispatch edges and return operands from the copied binary. The report and result are bound by the manifest; static assertions are not a semantic/security proof. Copied-directory verification outcome is kept outside the seal in the worker's `verification-outcome.json`.
