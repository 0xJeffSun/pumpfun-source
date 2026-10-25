# Relay selector and wrapper source proposal (N09)

This is a concrete, **uncompiled** orchestration proposal for the eleven relay business instructions and the generated event-recursion admission branch. It calls the existing body functions and the separately recovered generated exits through explicit typed frame views. It does not implement the reserved IDL operations, a real context bridge, framework error ABI, or a runtime. No build, typecheck, transaction, target execution or new accepted handler is claimed.

`proposal/dispatch.rs` supplies program-ID/selector routing, instruction-name logging, decode→admission→body sequencing, event phases, return data and the exact selected generated exit. `proposal/interfaces.rs` specifies the required admitted body/exit views and runtime effects without default implementations or successful placeholder hooks. The full frozen integrated predecessor and three completed context/exit publications are preserved in exact archives. Their manifests and file inventories remain unchanged.

Original ELF: 830,448 bytes, SHA-256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. The source predecessor is the integrated publication sealed as `e6110209c65ccbc5c9f68f654a6b47606a2b7545c68751319a9c5346ea8ab565`, reviewed by the additive composition packet sealed as `4fab3ea189b8829028b968b2e6d517e4f24fcef917ddb3f6b3c2b98bd2d64ef1`. All addresses below are half-open original file/virtual-address windows; ordinals are analysis labels.

## Dispatch and generated event admission

Original169 is `[515416,517632)`. Its first comparison, 515488→743448, checks the supplied program ID against the captured 32-byte declared ID at758342. Mismatch branches to error4100 at516056, **before** checking instruction length. With the correct ID, 515536 sends length<8 to the same error101 construction at516000 used by an unknown selector. This binary does not have a distinct short-input100 branch here. No instruction-name log or argument/context work precedes these errors.

Eleven selector constants and branch targets are reproduced in `evidence/contracts.json`. Each accepted business branch subtracts8 from length, adds8 to its pointer, and calls its wrapper. The source passes the entire remaining suffix to the existing decoder and context bridge; it adds no exhaustion check, account-count preflight, whitelist limit or maximum-share policy. Known wrappers log their exact `Instruction: …` string before attempting argument decoding. Each wrapper maps decode failure to102; the retained normal-allocation codec is a source hypothesis, with rich failed-cursor/allocation behavior still outside its proof.

Two reserved selectors are separate from the business inventory:

- `40f4bc78a7e9690a` reaches170 at517528, with the selector removed. The full `[517632,521664)` window contains seven reachable IDL operation discriminants. The new source deliberately returns an analysis-only `Unrecovered` boundary here; it does not replace that path with fallback101, accept it as success, or claim recovery of its effects.
- `e445a52e51cb9a1d` reaches189 at517600. Original189 never reads instruction payload bytes. It first requires at least one account (552056; missing account goes through the captured ProgramError conversion552464). It reads the **first** account's signer flag at552064; unsigned fails2002 with account name `event_authority`. Only then does552152 call canonical PDA helper341 for `[b"__event_authority"]` under the checked executing program. The helper uses the real PDA syscall695408; nonzero syscall result panics rather than supplying a fabricated bump. Key comparison552336 fails2006, names the same account, and attaches compared keys in actual-then-derived order at553296. Success returns directly. Additional accounts and event payload are not decoded or rejected; there is no event log, self-CPI, return-data clear or generated exit on this recursion branch.

The seed descriptor's actual RELATIVE relocation at811184, its raw data words at773760, the reference552120 and seed bytes756958..756975 are retained together. The report does not infer a unique loader implementation from those words. The proposal imports real PDA derivation with the recorded failure contract.

## Wrapper composition

Every business wrapper follows log → argument decoding → actual context parsing/initialization → business access control/body → successful event phases → generated exit. Body/context errors bypass the successful phases. The inherited natural body functions already contain the relayer check where original adapters call105; the new wrappers do not duplicate it or move it ahead of parser effects. The whitelist wrapper188 instead performs its decoded-vector parse, parser156, access-control105/body101 and exit158; it has no event adapter or set-return-data call and must not clear earlier return data.

| Business family | Wrapper | Parser | Adapter/body | Exit |
| --- | --- | --- | --- | --- |
| Donate bytes / pubkey |178 /179|121 /135|190→94|125|
| Native bytes / pubkey |180 /181|126 /131|191→92 /192→93|130|
| Donate with payer |182|138|193→95|141|
| Close epoch |183|142|204→96|145|
| Swap then distribute |184|154|203→100|155|
| Just swap |185|150|202→99|153|
| Distribute after swap |186|146|201→97|147|
| Distribute non-swap |187|148|200→98|149|
| Upsert whitelist |188|156|105 then101|158|

There are **three separate event serializations**, not two with shared bytes. For donation adapter190: serialize554408→159032; log554576→662240; serialize555088→159032; signed self-CPI556152→668496. Wrapper178 then serializes531584→159032; sets bare return data531624→669720; exits531672→201768. The other event adapters have the same three-phase relationship with their respective serializers; all edges are retained. This refines the older integrated `phases.rs`, which reused the first serialized bytes for self-CPI.

The log contains the event discriminator plus enum-tagged payload. The self-CPI serializes anew, prefixes the reserved event selector and event discriminator, and targets the fixed relay ID with one readonly signer meta for the admitted event authority. Its signing group is `[b"__event_authority", [canonical_bump]]`. The final serialization supplies the bare enum-tagged payload to set-return-data, without event discriminator or event-CPI selector. Complete generated exit follows and can still fail.

For dynamic serializers, original wrappers/adapters branch from a nonzero serializer result to the retained unwrap-panic helper406, rather than returning an invented ordinary account/handler error. The proposal uses natural `unwrap()` and real allocation; it does **not** claim historical panic text, source coordinates, allocation capacity, heap shape or cleanup equivalence. Fixed Closed/Swapped serializers have no length-dependent failure in their recorded layouts. The separately frozen exit proposal's return adapter has the same panic distinction.

Original169 logs ordinary propagated errors via286 at516168 and then lowers them through290 at516200. `process` marks this reporting point, but the actual error formatting and lowering are required runtime/framework adapters. The new dispatch-generated failures retain the evidenced numeric code, account name and compared-key ordering. Predecessor body `Error` and several parser proposal errors are simplified; their full messages, origins, allocation and ABI must be unified before claiming complete failure equivalence. Analysis-only `Unrecovered` is never mapped to a relay code or success.

## Context and exit interfaces

The input closure publications are terminal-success and sealed:

- Donation contexts: `9654eb62d1e34169e8fd9c33b7cb6e1d429b81e7da3cdde1de5518b06c10d391`.
- Lifecycle contexts: `248b83e3408f2d453ea4ee7a524217c7d5aed1b9fbfa145d8efd547af6af140f`.
- Generated exits: `d4d4b7c2db26634227761225421d7e74707e6e3a6c8a64989cd04cb3cf693ff9`.

Donation admission must call the published `parse_donation_accounts` (ordered `admit` then `constraints`) and map its real decoded tracker/debouncer/whitelist states, from/payer roles and canonical bumps into `DonationFrame`. Remaining account handles are retained. The lifecycle publication is a concrete Python source proposal; it still needs Rust translation, including unconditional receipt49 initialization and unconditional output ATA Create. N09 does not duplicate or silently replace that work.

Each frame exposes a typed body view and a typed exit view over the **same** mutated states and aliased real accounts. The exit view uses the generated-exit publication's `DonationExit`, `EpochExit`, `AfterExit`, `NonSwapExit`, `JustSwapExit`, `CombinedExit` or whitelist `StateAccount`. N09 calls the concrete `account_exit125/130/141/145/147/149/153/155/158` functions directly. There is no arbitrary application-exit success callback. Views must retain cached interface owners separately from live owner checks and map `model::Account` handles to genuine `AccountRuntime::A` aliases without independent backing data. The supplied checked program ID is passed to admission and exit.

`Admission` and frame traits intentionally have no implementations here. This is an explicit integration dependency on the separately recovered parsers and a coherent runtime, not permission to supply accepting stubs. Existing valid state must not be fabricated; no initializer, real signer, owner or CPI check is bypassed. No token/AMM/chain probes are introduced.

## Portable static verification

```sh
python -B /absolute/path/to/relay-dispatch-source-proposal/verify.py
```

Optional `--repo /absolute/path/to/pumpfun-source` rebinds the original ELF to the public repository marker. Default verification is self-contained. It checks this package's exact inventory, four complete retained source archives and their existing static verifiers, selected source members, 47 complete original windows, all eleven selector/name/phase contracts, bounded error/event/relocation anchors, and proposal source correspondences. It executes no Rust, SBF, compiler, VM, transaction or reconstruction function. Passing proves reproducible byte/source evidence, not semantic equivalence or deployment readiness.

`result.json` and `limitations.json` preserve zero count changes and the remaining IDL, runtime, rich-error, codec-resource and integration obligations. Original packages, original ELF bytes, current programs, status and workflows were not edited.
