# AMM transfer-creator static reconciliation

The immutable accepted report has **267 comparisons and zero mismatches**, including **100 rent-edge rows and 24 destination-data rows**. The 17,462-comparison aggregate includes this suite; it does not override its limitations. The separate user-owned “8/267” claim is **unverified**: its report, eight row identities, original/candidate hashes and runner were not supplied. Neither a wrong binary nor wrong runner semantics can be diagnosed from the count alone.

There is a **grounded static source gap**, separate from that claim: the original native path derives the destination rent minimum from its actual data length; the accepted source uses `minimum_balance(0)`. `proposal/destination-rent.patch` changes only that argument. It is pending, uncompiled, unexecuted and not integrated. It does not establish a mismatch for an empty rent-sized destination or whole-program equivalence.

## Inputs and immutable provenance

Repository snapshot: `c1ffdd0667608d4755227e68aab9f27a7e9a0d37`. All additional repository inputs were exported with `git show` against that exact commit. No moving branch or parent source was edited. `input-provenance.json` records repository paths, Git blob identities, bytes and SHA-256. The specifically permitted frozen `layer01_amm/publication` is copied intact as `layer01/`, including its original manifest/seal and its own baseline input provenance. Its baseline COMPLETION and PARALLEL_WORK documents were read. The outer seal includes every inner file without changing the inner seal.

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| Original complete capture | 10,485,715 | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| Accepted candidate | 1,199,048 | `d27be7e97d00a5f4ce249bd0f9bceec697db3d6e43a2264ec159d9de5a0013d1` |
| Candidate symbol ELF | 1,682,424 | `1288a48824e53fb7e02d0864ae5b8b5779a0b9810abb5973ee63d49f2cffb192` |
| Unchanged suite source | see provenance | `6b4454364d1c0dff6619164bce04a70c7b6a4dbe7d2d7d304b917c02cd705322` |
| Accepted transfer source | see provenance | `a9c11eb18cd6e246e03221699abaf7fa9023253c492921b6c2876978555aebb3` |

The published and scratch saved transfer reports have identical decoded content. Their candidate/original/script fields bind the above bytes. The saved observer has 534 transactions, ordered original then candidate per row; the new static analysis checks every stored transaction byte hash and AMM binary binding. Observer-recorded signature verification remains historical evidence; this worker does not execute transactions or claim a new cryptographic verification. The separately stored main/scratch source bindings bind the same transfer source and accepted executable. Runtime environment records Python 3.12.11, solders 0.27.1 and extension SHA-256 `a39f7bd790676cd4cf8cfde92d743b9647fb292245feb142ae1239c55414962d`.

## Exact saved comparison contract

`analysis/receipt-ledger.json` retains all 267 row identities, field-by-field equality, original/candidate transaction bindings, declared rent setups, destination poststates and flattened inner counts. The original complete reports retain every state, error, event and inner instruction, not just summaries. The suite compares exactly:

* `error`: rendered transaction error or null.
* `states`: for instruction account metas, absent account versus full data hex, lamports and owner; executable accounts are excluded.
* `inner`: complete saved inner-instruction JSON, including ordering, indices, data and stack heights.
* `events`: only logs starting with `Program data: `.

The suite removes `logs` before comparing. Ordinary log text, consumed compute, diagnostic source locations, execution timings and accounts outside that selected set are not compared. Payer inclusion differs between legacy and v2 account metas. No field normalization beyond selecting event logs is performed on these four saved fields. The analyzer recomputes differences using the union of keys, so a missing key is not silently equal to null. All rows still have zero differences.

The unchanged runner calls `transfer` directly for each instruction. Its unused `collect` helper is not the transfer test path. It loads the supplied original or candidate separately through `acquire_harness`; the cached key is the resolved program path. The reset wrapper remembers explicit account setup and writable message accounts, restores them before another case, and caches dependency loads. `PUMP_AMM_FRESH_VM=1` is an existing alternative, not exercised or changed here. The underlying Harness retains its existing transaction-history configuration. No signing, blockhash or history controls were changed. These source observations are not a proof that an unavailable external runner used the same behavior.

## Rent-edge reconciliation and coverage hole

The retained grid covers both instructions with destination balances 0, 1, 890879, 890880 and 890881; token amounts 0, 1, 890879, 890880 and 890881; and authority balances 0 and 1,000,000,000. For example rows 173/174 (`rent-edge=(890880, 0, 0/1000000000)`, legacy) record seven inner instructions, including close, recreate and final System transfer; both programs agree. V2 corresponding rows 235/236 also agree. These are actual retained receipts, not newly simulated outcomes.

The 24 `destination-data-rent` rows declare destination sizes 1, 8, 165 or 1000, but set their lamports to zero. Every resulting destination is absent or has zero-length data in the saved states. Row 194 (`destination-data-rent=(1, 890880)`) records seven inner instructions and an empty System-owned destination with 1,000,890,880 lamports. Thus its label alone does not prove the original handled a live one-byte destination. Runtime treatment of zero-lamport accounts is a plausible explanation, but the receipts contain no pre-handler account snapshot or execution trace establishing that mechanism. Do not promote these rows into verified nonempty-destination coverage.

For actual empty destination data, the proposed rent-argument correction equals the accepted zero argument. It cannot, on that basis alone, explain eight mismatches involving otherwise identical empty rent-sized accounts. Pending external evidence may reveal different code, dependencies, setup, compared fields or another cause. None is selected as fact here.

## Entire bodies and actual targets

`analysis/focused-entire-call-closure.json` records every instruction in 122 original and 119 candidate reachable windows. It includes original native/v2 bodies and their wrappers; all nine current transfer-named symbol ranges, including contexts/exits, are roots. All direct targets are decoded from signed operands, not assembler comments. Each window includes its complete prior row: raw/normalized hashes, branches, calls, relocation records, wide immediates, ambiguity and unresolved semantic/data obligations. `analysis/direct-target-ledger.json` preserves all immediate root callees and every original matching candidate alternative.

| Scope | Original range (exclusive end) | Candidate range(s) | Status |
|---|---|---|---|
| Legacy body | `0x26da8..0x28dd0` (8232 bytes) | `0xb8510..0xb8e18` (2312) plus shared helper | no complete normalized correspondence |
| V2 body | `0x28dd0..0x2b8e0` (11024) | `0xb8e18..0xbaae8` (7376) plus shared helper | no complete normalized correspondence |
| Native shared helper | inlined in both originals | `0x3ec40..0x40048` (5128) | extracted ownership/layout differs |
| Legacy wrapper | `0xec230..0xec4c0` | `0x979b8..0x97de8` | unequal complete bodies |
| V2 wrapper | `0xec4c0..0xec738` | `0x97de8..0x98200` | unequal complete bodies |

Original wrapper calls at `0xec3f0` and `0xec668` reach the respective original bodies. The original body identification is supported by these call edges, native/v2 shape, instruction-specific source-path references and native close/recreate/transfer versus non-native token CPI flow. Inferred original windows are not authenticated historical function boundaries. Current contexts/exits remain residual and are not inferred equivalent just from successful saved cases.

The original legacy dataflow is explicit: `0x26e58` selects AccountInfo at context+440; `0x26e68` calls actual `0x108f48` (complete-body match to `AccountInfo::data_len`); `0x26e80` moves the returned length into r2; `0x26e88` calls actual `0x106fe8` (`Rent::minimum_balance`). That same context+440 pointer is saved at stack -784 and later cloned at `0x28c18..0x28c20` into the second (destination) transfer AccountInfo; context+392 is the authority source. Destination lamports are obtained through `0x26ff8 -> 0x108ed0`. `0x27170..0x271b0` implements saturating subtraction; `0x271c8` supplies 165 to a second minimum-balance call at `0x271d0`; checked addition follows at `0x271d8..0x27210`. The v2 native branch repeats the data-length chain at `0x2a348..0x2a378`. The candidate instead sets r2=0 at `0x3ed70` before `0x3ed78 -> 0xf7c78`. No assembly annotation is used to substitute another callee.

Original legacy `0x277e8` is unsigned JLT (opcode 0xad): if available vault lamports are below the computed minimum, it branches to formatting/logging and returns success. Equality proceeds to CPI. The candidate retains the `< minimum` guard. The proposal does not switch this to `<=`, add authority funds to the preflight balance, replace checked addition, or remove saturating subtraction.

Original native CPI sites are `0x27f78 -> 0xf6190` (close), `0x28b90 -> 0xf42f0` (ATA creation), and `0x28d90 -> 0x104f28` (System transfer). Immediately before the last, `0x28d60 -> 0x108ed0` reads authority lamports and `0x28d88` supplies that returned amount in r3. Candidate sites are `0x3f980 -> 0xe6df8`, `0x3fea8 -> 0xe4f58`, then `0x3fed0 -> 0xf94a0` to read the amount and `0x40000 -> 0xf5bb8` to transfer. The CPI constructors, seed lengths and source evidence support retaining close/recreate/transfer order and transferring the entire remaining authority balance. Existing seeds, account constraints, writable requirements and `?` error propagation are preserved exactly by the proposal.

The complete original ATA wrapper normalizes against both candidate create and create-idempotent wrappers. Those are alternatives, not interchangeable semantics: the original wrapper actually calls `0x101068`, whereas candidate create calls `0xf1e60` and idempotent calls `0xf1e88`. The preserved closure follows those distinct constructor targets. The original constructor stores opcode 0 at `0x101070`, just as candidate create does at `0xf1e68`; candidate idempotent instead stores 1 at `0xf1e90`. The saved successful native receipt's ATA instruction byte is also 0. V2 also retains original nonnative `0x2a2b8 -> 0xf4a30` and candidate `0xba6d8 -> 0xe5698` transfer_checked calls. No new nonnative behavior is proposed.

Rent/data_len/lamports and close/create/System-transfer helper matches are code correspondences, not proof of all referenced data or every allocation/error path. Original Rent retrieval occurs twice and calculation order differs from the shared candidate helper. The minimal proposal relies on the bounded ordinary premise of an unchanged Rent sysvar within this invocation; it is not a failure-path identity proof. All indirect calls, diagnostic objects, allocator branches and unresolved data extents remain open in the retained ledgers.

## Whole-file and all-residual inventory

Whole original equality remains **false**. There are 670,956 unequal positions in the common file extent and 9,286,667 original-only tail positions: 9,957,623 differing/missing positions total. The original has an observed 9,217,211-byte zero capture tail after its declared ELF extent. No tail was manufactured or removed. `layer01/analysis/whole-file.json` retains every exact maximal mismatch interval including excess tails. Its section/header/layout files retain all section differences, headers and relocation entries. The `.text` sizes are 1,162,040 versus 1,103,880; `.rodata` 25,715 versus 24,155; `.rel.dyn` 70,384 versus 60,608.

`residual-ledger.json` adds this continuation's dispositions while explicitly referring to the complete preserved ledger: 785 original inferred windows, 653 candidate symbol ranges (aliases preserved), and 653 independently inferred candidate windows. No old row, alternative, unknown branch or unclaimed byte interval is removed. The historical reconciliation, every symbol, file-region coverage, dependency provenance, transitive data graph and near-shape alternatives remain intact. Raw function bytes at changed placement, normalized code, actual target correspondence and referenced data are separate properties. Unknown is never marked matched. The earlier layer's “no grounded patch found” conclusion is retained as historical, superseded only by TC-01 in this continuation.

## Priorities and acceptance plan

1. Review TC-01 and the one-argument pending patch against the complete original/v2 chains and candidate source. Root owns integration and a separately authorized build. No count or accepted binary changes here.
2. If root accepts a build, rerun the **unchanged already-accepted** transfer suite and all 25 existing suites with existing signing/history controls. Bind new executable, source, dependencies, script hashes and full receipts; preserve failures. Require all four compared fields across the same 267 rows and all 17,462 existing comparisons. This worker performs none of those operations.
3. The unchanged data rows are a coverage limitation, so passing them cannot validate a genuinely live nonempty destination. Keep that acceptance gate unresolved; do not create fixtures or change the suite under this assignment. Preserve complete logs if they already exist, but do not pretend discarded logs can be reconstructed from receipts.
4. Obtain the external report as a frozen input under root authorization, then compare its exact eight identities, binary bindings, runner source, setup and normalization to `analysis/receipt-ledger.json`. No external report was sought via network or other scratch directories.
5. After each accepted snapshot, regenerate the static inventory with newly bound inputs. Continue whole-file, header/relocation, complete-body, actual-target and data comparisons. Whole-byte identity remains an exact gate, never an aggregate percentage.

`verify.py` is stdlib-only and portable. It verifies both seals, baseline Git blob identities, pending patch applicability and source scope, reruns the complete prior layer static verifiers, and regenerates this analysis in a temporary directory **inside its own copy**. No runner is imported. No compiler, typecheck, target executable, transaction, fixture or network request is run. The delivery was verified from a separate copy within the assigned worker directory; the verification receipt is outside the sealed publication to avoid a self-referential hash.
