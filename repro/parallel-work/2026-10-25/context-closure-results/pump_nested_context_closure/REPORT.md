# Ordinary create_v2 context continuation

**Outer context, account identities, quote routing, and remaining-slice plumbing recovered; full transitive initialization admission remains incomplete. No source patch or guard removal.** This extends the prior prefix through the complete local context CFG, all three initialization-helper CFGs and their post-init owner readers, the ordinary handler routing, and the wrapper exit. It does not certify external CPI behavior, all decoder semantics, dynamic errors, or source equivalence.

All new program/source retrievals are frozen Git blobs at `4d3c19e3c58427f3604caede144b3322fa56d2b5`. `provenance.json` records full Git blob/SHA256 identities. Original Pump remains blob `85cb0059f2814c86224fdfea778c56df770dd920`, SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Disassembly remains blob `4c37a9b4931438cfab0311bea6c6398c5d909321`, SHA256 `d4a29dc6921d25d9d2e8e7a0f8b4d68027005f2ab74a8151d5ac8a8ab575ba0d`. Addresses are original ELF byte offsets; intervals are half-open. `windows.json` maps every interval to exact inclusive upstream assembly lines and matching ELF bytes. Names below describe caller-bound roles, not recovered original Rust symbols. Angle-bracket disassembler labels are displaced and never used to resolve branches.

`prior/` is the unchanged complete **root-reviewed pending-publication package** `route-closure-results/pump_nested_create_admission`, including its original seal. Its newly admitted evidence is not reattributed to the frozen commit. Its nested historical reports retain their original checkpoint statements. No other pending package was needed.

## Admission and mode restriction

The inherited discriminator/caller chain is create_v2 -> wrapper `0x1268a8`, context call `0x126fe8 -> 0xac6c8`, handler call `0x1272b8 -> 0x1e7c0`, nested-walk call `0x21e90 -> 0x18678`. The prior IDL excerpt identifies 16 fixed accounts. The frozen candidate declarations are retained at `inputs/create_v2-lines-1-100.rs`, particularly lines 12–34. They establish intended names/types, not original-byte equivalence.

The first four cursor advances, followed by Global at `0xac928`, bind `0xacaa0 -> 0x127a0` to **user**, and `0xacae8 -> 0x13b80` to **system_program**. These identities precede interpreting either reader. Subsequent direct calls bind `0xacb30 -> 0x13ff0` to Token-2022 and `0xacb78 -> 0x13938` to associated-token program. The sequential slots, not callee proximity, establish the mapping. `0xad0c0` and `0xad210` bind the same `0x2ca8` copying cursor to event_authority and program.

The wrapper consumes creator's 32 bytes, then reads the boolean at `0x126be0`; stores at `0x126ce0`, normalizes at `0x127098..0x1270a8`, passes at `0x127230`, and the handler loads it into r8 at `0x1e7f8`. Ordinary-mode traversal takes fallthrough at `0x1e800` and `0x1ec98`, and at `0x21310` follows `0x21318 -> 0x21370`. It never follows the Mayhem-specific call `0x21338 -> 0x8a530`. `cfg.json` records these explicit gates. Later error-only r8 reuse is not interpreted as a mode flag. No Mayhem initializer body, prohibited Pump body, stopped extension lane, or runtime probe was followed.

## Fixed accounts and outer validation order

All 16 slots must exist even in ordinary mode. Each AccountInfo occupies 48 bytes. `0xac6c8..0xad2b8` consumes them before initialization, leaving the shared cursor at `(A+16*48,N-16)`. Missing-account constructor argument is 3005. The context continues to `0xb0158` (exclusive); this end is obtained by following local branches to returns, not by assuming a neighboring symbol boundary. It is 1,810 assembly lines, upstream 84991–86800.

| Slot | Caller-bound account | Read / validation evidence |
|---|---|---|
| 0 | mint | saved at frame -0x708; initialization `0xad4c8 -> 0xb0158`; post-init writable `0xad5a0`, signer `0xad5b0`, then rent check sequence `0xad5d8..0xad790` |
| 1 | mint_authority | frame -0x700; PDA derivation/comparison `0xae5c0..0xae6d8`, error argument 2006 |
| 2 | bonding_curve | frame -0x6f8; PDA against mint key `0xad820..0xad9d0`; initialization `0xae018 -> 0xb3b90`; writable `0xae058`; rent `0xae080..0xae240` |
| 3 | associated_bonding_curve | frame -0x6f0; initialization `0xae390 -> 0xb54d0`; writable `0xae3d0`; rent `0xae3f8..0xae5b8` |
| 4 | global | inherited cursor/decode at `0xac928 -> 0x13270`; boxed decoded object r9; PDA comparison `0xae6e0..0xae7f8` |
| 5 | user | frame -0x6e8; signer reader chain below; writable `0xaef80..0xaef90` |
| 6 | system_program | frame -0x6e0; reader validates zero key then executable |
| 7 | token_program | frame -0x6d8; reader validates Token-2022 key then executable |
| 8 | associated_token_program | frame -0x6d0; reader validates associated-token key then executable |
| 9 | mayhem_program_id | frame -0xbd8; writable `0xaefa0`; fixed-address comparison `0xaf028..0xaf040` |
| 10 | global_params | frame -0xbe0; PDA derivation/comparison `0xaf048..0xaf1c8` |
| 11 | sol_vault | frame -0xbe8; PDA `0xaf540..0xaf6c0`, then writable `0xaf800` |
| 12 | mayhem_state | frame -0xbf0; mint-key PDA `0xaf810..0xafa20`, then writable `0xafbd8` |
| 13 | mayhem_token_vault | frame -0xc08; writable `0xafbf0`; no local token-type/owner test |
| 14 | event_authority | copied by `0xad0c0 -> 0x2ca8`; PDA comparison `0xafc00..0xafd10` |
| 15 | program | copied by `0xad210 -> 0x2ca8`; no local address/executable constraint in this context |

The Mayhem-named account constraints above are **unconditional fixed-context validation**, not execution of the excluded initializer. PDA calls use ordinary Pump program ID for mint authority/curve/global/event authority and the fixed Mayhem ID for its three named PDAs. Seed identities agree with the admitted IDL and frozen source declarations; bounded literal seed bytes are retained. Seed-descriptor relocation mechanics and PDA syscall implementation remain delegated, rather than claimed independently proven here.

Execution order matters: fixed-account readers (including user signer and program IDs) run before the initial Rent retrieval `0xad338`. Mint initialization precedes mint mutability/signer/rent checks, then curve PDA/init/writable/rent, then associated-token init/writable/rent, then mint_authority and Global PDA constraints, then user writable and the remaining fixed-account constraints in table order. A CPI/reader failure can therefore precede a later explicit writable or seed error. No source-macro order is substituted for this original order.

Outer failures forward error words and set context tag 2, returning through `0xacd50..0xacd68` or cleanup `0xade30..0xadf48`. Successful packing `0xafd18..0xaff28` preserves decoded mint representation and fixed account fields, then returns via `0xacd68`. The first word of the context is not the same success discriminator used by the program readers.

## Readers and initialization boundary

`0x127a0..0x12850` decrements count and advances pointer by 48 before `0x12840 -> 0x19b4e0`. The latter reads AccountInfo+0x28: nonzero returns tag 2 and the same AccountInfo pointer; zero constructs 3010 and returns tag 0 plus its error payload. The context checks tag 2 at `0xacab8`, otherwise attaches the user name at `0xacc38..0xacc78`.

The system, Token-2022 and ATA readers each check count before consumption, key before executable (+0x2a), and return `[2,AccountInfo*]` on success. Missing slot uses 3005, wrong ID 3008, non-executable 3009. System compares 32 zero bytes (`0x13c00..0x13c60`); the two others compare operand-addressed 32-byte constants at `0x1b5ca8` and `0x1b5ae8`. The user reader has no owner requirement; none of these program readers adds an owner check. `0x2ca8..0x2e48` clones the AccountInfo fields and reference counters without signer/owner/address checks. Reference-count wrap invokes an unresolved call relocation; it is not asserted to recurse into itself.

The three init helpers are now identity-bound from argument bundles and retained completely:

- Mint `0xb0158..0xb3b90` (lines 86801–88635): bundle built `0xad418..0xad4c8` contains mint, rent, user, system, Token-2022, mint_authority. Lamport-dependent arms begin `0xb0180..0xb0258`; payer/target-key comparison is `0xb0328`. Multiple external builder/CPI calls precede post-init reader `0xb3ab0 -> 0x32d8`.
- Curve `0xb3b90..0xb54d0` (88636–89428): bundle `0xadf50..0xae018` contains curve, rent, user, system, mint, bump, current program ID. It uses space **166** (`0xb3be8`, `0xb3d58`), lamport-dependent arms and payer/target comparison `0xb3d30`, then post-init reader `0xb5318 -> 0x4238`.
- ATA `0xb54d0..0xb61d0` (89429–89839): bundle `0xae2d0..0xae390` contains associated account, ATA program, user, curve, mint, system, Token-2022. The external call `0xb5fe0 -> 0x17e088` must return tag 2 before post-init reader `0xb6010 -> 0x2e48`.

Post-init readers recover **owner-before-data-decode precedence**. Mint/ATA first test system owner and lamports (zero-lamport system account constructs 3012), then membership in the two token-program owner constants (3007 on mismatch), then data borrow, then decoder at `0x3508 -> 0x1862f0` / `0x3078 -> 0x185ed0`. Curve similarly tests system-owner/zero-lamports, Pump owner (3007), data borrow, then `0x44c8 -> 0x9b430`. These are initialization readers, not the inherited ancestor parser; do not substitute ancestor discriminator/default rules without a separate equality proof. Their downstream decoder bodies have not been interpreted here.

Thus complete outer control flow is available, but **init semantics are not closed merely because their CFGs are retained**. Exact CPI data/metas, supported extension initialization, allocation/top-up/assign paths and post-init decoder behavior remain the principal admission boundary. `results.json` records exact call sites. No executable test or fixture substitutes for those obligations.

## Remaining slice and ordinary quote selection

The context mutates the wrapper cursor at frame `-0x308` (pointer) and `-0x300` (count). Wrapper `0x127158..0x127190` packages those values in handler context +0x10/+0x18, beside program ID and fixed-context pointer. Handler `0x1ec00` reads count; `0x1f008` saves it at `-0x730`; `0x1f470..0x1f488` saves the remaining pointer at `-0x748`. This is the **original remaining slice after 16 fixed accounts**, not an already stripped five-account chain.

For the nested branch, ordering is:

1. Global create-enabled byte (+0x43b) at `0x1ebf0..0x1ebf8` precedes account-count handling. Zero count takes the ordinary native setup. Nonzero count must exceed two (`0x1f010`).
2. Account 2 key is loaded from remaining+0x60, compared against Tokenkeg then Token-2022 at `0x1f500`/`0x1f548`; executable byte at remaining+0x8a is checked at `0x1f570`. Account 0 key is then read. Zero and WSOL keys select native normalization `0x20aa0`; those paths are not nested. Other constant-key rejection at `0x1f6a8` is retained without assigning a guessed original semantic name.
3. The non-native route tests Global decoded+0x3a8 against quote key (`0x21cf8..0x21d48`). A match bypasses quote-control/nested lookup. Otherwise count==3 passes null to the quote-control reader; larger counts pass remaining+0x90 (`0x21d50..0x21d88`). Reader `0x17cf0` rejects absent control with 6063, checks derived PDA first (`0x17f08`), then Pump owner (`0x182a0`), forwarding 6075 on address/owner failure. No Mayhem branch is needed for this reader.
4. `0x18568` borrows control data and calls `0x6a1e0`. This requires length>=108 **before** checking discriminator `38f423eec1d5a2c9`; count is u32 at +104. `0x68918` computes 108+40*count, using inherited wide multiplication; for this u32 domain no u64 overflow is possible. Bounds require that size <= data length. Entries are scanned in order and first matching 32-byte mint returns its u64 reserve. A missing entry returns success with found=0; malformed data/error is a different tag. Extra data after the declared entries is not examined by this lookup.
5. Lookup failure returns before the walk. Found=1 bypasses the walk. Found=0 calls `0x21e90 -> 0x18678` with r2=original remaining pointer, r3=original remaining count, r4=Global decoded payload (+8 from boxed Global). Walk success supplies seed at output+8 and depth at +16; handler stores them at `-0x758`/`-0x750` (`0x21e98..0x21ec8`). It does not receive an updated cursor/count from the walk.
6. Quote mint owner equality with account 2 occurs **after** this selection (`0x1f7e8..0x1f820`). Token-2022-specific validation is reached at `0x1f860 -> 0x21fa8`, including call `0x22008 -> 0x1a918`; that decoder remains opaque here. Quote ATA address derivation/comparison at `0x1f930`/`0x1f9a8` follows. Its creation passes exactly six AccountInfos, including only remaining 0/1/2, at `0x22348`; it does not pass the tail after the walk.

This byte order is stronger than treating frozen candidate lines 47–77 as a proof of original precedence. In particular, selection/walk errors can precede quote mint owner rejection. No change to the accepted source is proposed from this observation.

## Walk composition and trailing accounts

Consume the unchanged prior typed, pricing and walk contracts: n=immediate_parent.depth+1, one account per Curve group or four per Pool group, 4+n+3m total remaining accounts consumed locally; positional ancestor-depth equality is absent locally; terminal account-3 data borrow occurs even on a native-root chain. Pricing records are nearest-first and evaluated in reverse. The five wide arithmetic contracts remain supported by **manual bounded instruction/algebra arguments**, not an automated all-input semantic proof. This package's size-helper composition uses the same multiplication entry `0x1b55c8`; the prior arithmetic byte equality and its limitations remain intact.

The handler resumes after nested success using the original slice. It never obtains the walk's tail position. Its later quote-account CPI is explicitly a six-account array assembled at `0x22160..0x22348`, with remaining accounts 0,1,2 plus fixed accounts. Later metadata/token helpers receive fixed-context fields (`0x212f8`, ordinary `0x213a0`); event construction at `0x21520` receives strings, creator and fixed accounts. No later top-level equality-to-consumed-count check exists in the retained ordinary CFG.

Wrapper success calls `0x1272f8 -> 0xb61d0` with fixed context and program ID, **not the remaining slice**. The exit uses fixed-context mint at +0x58, curve at +0xe8, ATA at +0xf0; its curve serialization call is `0xb6338 -> 0x5a28`. It then returns and releases fixed AccountInfo references. The wrapper itself does not compare or iterate remaining count after the handler.

Accordingly the previous “walk-local lack of tail rejection” now extends to **caller plumbing and direct handler/context-exit control flow**. This is not an unconditional whole-instruction acceptance theorem: opaque CPIs/decoders, account aliasing and resource behavior still constrain whether an instruction succeeds. No semantic proof is claimed for all transitive callees merely from their fixed argument lists.

## Precise residual obligations and verification limits

Full admission and source promotion are withheld pending:

- Init helper CPI/builder contracts, specifically all call edges inside the three named init windows; their exact transaction data/metas and zero/nonzero-lamport arms. `call-edges.json` enumerates every edge, including unresolved relocation calls separately. No token-runtime/Mayhem execution is authorized by this ledger.
- Init reader decoders `0x1862f0`, `0x185ed0`, `0x9b430`, and quote Token-2022 reader `0x1a918`, admitted at the exact sites above; the final curve serializer `0x5a28`. Complete compatibility/error behavior is not inferred from candidate type declarations.
- Full dynamic constructor/formatter payloads and allocation/borrow/resource failure behavior. Numeric arguments and observed tag/cursor order are established; serialized Anchor error equivalence is not.
- A source promotion must preserve original quote-selection precedence, all 16 fixed-account requirements, unconditional ordinary-context constraints, compatibility decoding and inherited walk/pricing contracts. Existing depth/native/complete guards remain unchanged.

All four original whole-byte comparisons remain false. Recovery accounting stays 140/150 bounded implementations, five partial, five unrecovered. Saved tests and manifests do not prove exhaustive semantics or security. No build, runtime, fixture, network/chain action, signature, binary patch, source patch, compiler search, commit, staging, push, parent write, or modification to any existing seal was performed.

`python3 verify.py` checks the exact file set and SHA256 seal, the unchanged prior full seal, every new assembly-byte interval and continuity, local CFG closure under the explicit ordinary gates, direct relative-call decoding, and operand-addressed constants. It does not prove prose, CPI semantics, or absent full-object Git provenance independently. Full original objects were hash-checked at extraction; portable verification uses bounded evidence. The copied-directory outcome is retained **outside** the seal at `../verification-outcome.json`.
