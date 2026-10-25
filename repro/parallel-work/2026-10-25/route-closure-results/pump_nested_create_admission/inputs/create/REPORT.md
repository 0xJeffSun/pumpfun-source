# Ordinary native-root nested create_v2: missing cursor and pricing path

Result: a dispatch-linked static control-flow recovery, **not a source recovery accepted for integration**. No Rust patch is supplied. The next missing path is ancestor selection and reverse pricing inside the ordinary nested quote branch. Removing the depth-zero guard is insufficient. No builds, runtime executions, new fixtures, signatures or broadcasts were performed.

## Frozen inputs and identity

Checkpoint: `517d77db988d8c63b6cf476f0be138c5a4f3128a`. All consumed inputs came from Git blobs at this checkpoint, not the working tree. Full SHA256, Git blob IDs, sizes, paths and extraction descriptions are in `provenance.json`. The original Pump ELF is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` (10,485,715 bytes). This is the original, not the current reconstructed Pump binary. No current-vs-original whole-file equivalence is claimed.

The discriminator `d6904cec5f8b31b4` selects the branch at 1164968; the call at 1165048 reaches wrapper 1206440 (`0x1268a8`). The wrapper calls the account-context parser at `0xac6c8` from `0x126fe8`, then handler entry `0x1e7c0` from `0x1272b8`. The handler calls `0x18678` at `0x21e90`; that callee consumes the remaining-account slice and is the subject of the nested-walk analysis. These are byte-checked direct-call edges, not recovered Rust symbol names. The context parser's body is not recovered here.

Every assembly window has exact upstream line ranges and half-open byte ranges in `windows.json`. These addresses equal ELF file offsets for the selected instruction bytes, verified against the copied original. The old disassembler's angle-bracket `.text+...` annotations are offset by the section base: use numeric addresses and encoded signed branch offsets, not those annotations. All direct calls here are decoded as `site + 8 + signed_imm * 8`.

## What the current source actually implements

`programs/pump/src/create_v2.rs:44-74` selects remaining accounts 0=mint, 1=child quote ATA, 2=quote token program, 3=quote-control if needed, 4=immediate quote coin's curve. Global whitelist and quote-control entry success bypass the nested path. Parent PDA/owner/deserialization precede checked `parent.depth + 1`, the global/cap-5 bound, the Mayhem eligibility rejection, then the explicit `parent.depth == 0` stop at line 69. Line 70 requires native quote; line 71 rejects complete curves. No ancestor account is consumed.

Lines 121-142 compute one native-root conversion from the global graduation target, including hypothetical curve completion and migration liquidity for that single root. They accept no account slice or external pool balances. Lines 98-100 persist and emit the chosen depth and reserve seed. The missing implementation is between parent admission and those final stores, not another event field or a missing depth increment.

## Byte-backed recovery

| Boundary | Original byte evidence (half-open) | Consequence for reconstruction |
|---|---|---|
| Immediate parent | `0x18678..0x18738` | Count is tested against 4, four prefix accounts are subtracted, and cursor advances `0xc0` before calling curve parser `0x19ec8`. With the independently documented 48-byte account stride this selects remaining account 4. Zero accounts after the prefix takes the unsupported-quote error path. |
| Parent depth | `0x187b8..0x18820`, `0x60a80..0x60ae8` | Parent is passed to a depth gate before the subsequent eligibility byte test. Gate reads byte `+0x98`, adds one, checks narrowing to u8, then compares with `min(global byte +0x430, 5)`. It does not recursively decrement parent.depth. These are in-memory offsets, not serialized offsets. |
| Ordinary eligibility | `0x18808..0x18a20` | Stack byte `-0x266` gates an error construction with code 6100 at `0x189b8`. Mapping this flag to Mayhem mode is supported by the source/IDL contract; the complete original decoded-type layout is still an obligation. |
| Ancestor cursor | `0x18e48..0x18f70` | After the first record, the next key is copied from the prior decoded record at stack `-0x2e0`. An empty remaining slice calls `0x19cc0`, which builds error 6109 (`QuoteChainAccountsRequired`) at `0x19e50`. Otherwise the same curve parser `0x19ec8` is called at `0x18f00`. |
| Migration branch | `0x190b0..0x191c8` | Four u64 values at stack `-0x2c0,-0x2b0,-0x2b8,-0x2a8` are tested for zero. The all-zero route goes to the pool-account count test at `0x191c0`. Otherwise byte `-0x267` gates the error path at `0x195e8`, constructing 6107 at `0x19728`. This is more specific than a single `complete` boolean. Do not label these four values or encode this predicate in Rust without completing the layout mapping. |
| Curve-only group | `0x19440..0x194a8` | Remaining cursor advances `0x30`, remaining count decreases by 1; control returns to record accumulation. |
| Pool-backed group | `0x191c0..0x191c8`, `0x18cd0..0x18d88` | Requires more than three remaining accounts including the curve; passes cursor+`0x30`, +`0x60`, +`0x90` into callee `0x65eb0`. Success advances cursor by `0xc0`, count by -4. The pool/vault callee body is not assigned a recovered type here. |
| Bounded record accumulation | `0x18b28..0x18b48`, `0x18d98..0x18e30` | Record stride is `0x38` (56 bytes). Counter advances 56; termination compares against the requested record span and `0x118` (five records). This is a bounded loop, not evidence of Rust recursion or arbitrary graph traversal. |
| Reverse pricing | `0x18a68..0x18ad8`, `0x19518..0x19540`, `0x63940..0x63a88` | Calls `0x63940` with record array/count. That helper first calls `0x61348`, walks records from `base + (count-1)*56` backwards through `0x62aa0`, then calls `0x617e8` and checks the resulting reserve seed is nonzero. These three dependencies remain address-identified, not fully recovered arithmetic implementations. |

The parent/ancestor parser window `0x19ec8..0x1a918` constructs a PDA using the 13-byte seed at `0x1b683a`, compares the supplied key, compares owner against the program ID at `0x1b79df`, then borrows/deserializes data. It is reached both for the immediate parent and each next ancestor. It is not justified to replace later ancestors with arbitrary accounts whose serialized depth merely looks plausible.

## Account-order result and its evidence level

The IDL projection documents the chain in **nearest-parent-first account order**. With remaining-account indices starting at zero, prefix `[Q mint, child quote ATA, token program, quote-control]` is followed by Q's group at index 4. A trading group has one curve; a migrated group has curve, canonical pool, base vault, quote vault. Thus if Q trades its ancestor begins at 5; if Q is migrated its ancestor begins at 8. Each subsequent group advances by one or four. This documented ordering is corroborated by the cursor arithmetic above. No new account fixture was generated to demonstrate it.

The native root's pool quote seed is documented as WSOL; pool index is 0 under Pump's pool-authority PDA. The byte window `0x18bb8..0x18c90` constructs five seed slices and calls a PDA helper; `0x19290..0x19508` includes native/non-native key selection. Exact Pool type, vault mint/owner relationships and validation/error precedence inside `0x65eb0` remain unclosed. Documentation and seed counts alone are insufficient to promote those relationships as a fully recovered parser.

Pricing runs in the reverse direction from selection: native graduation target -> root output -> next child output -> Q output -> rescale once into the new curve's virtual quote reserve. Repeated calls to current `nested_sol_reserves` would repeatedly reseed from Global and rescale, losing the intermediate quote amount. The reverse record walk corroborates the direction; complete integer rounding and migration arithmetic for every record is not yet established.

## Concrete next prerequisite and retained obligations

Before a reviewable Rust proposal, recover a typed dataflow ledger for `0x19ec8`'s decoded result and its consumers: identify every field copied into the 56-byte pricing record, the four-word migration predicate, the complete/eligibility flags, and the quote-mint link. Bind serialized offsets to decoded in-memory offsets using the called deserializer, not the current Rust declaration's apparent order. Then establish the precise accepted pool/vault types and account relationships in the create-linked callee `0x65eb0`, and the arithmetic contracts of `0x61348`, `0x62aa0`, `0x617e8`. Establish each callee's permitted identity and bounds before reading further bodies.

Also unresolved: whether each ancestor's stored depth is explicitly checked against its position; excess trailing-account handling; all early-error precedence; whether malformed depth/key combinations terminate solely through the bounded record count. A cap of five does not prove acyclic ancestry, exact decrementing depths, or eligibility of every possible ancestor. These are static recovery obligations, not requests for new probes.

This package narrows the next source change to a cursor-based chain parser plus a reverse pricing fold, with separate curve/pool cases and native-root terminal quote selection. It deliberately does not supply pseudocode pretending to close unknown types. Excluded handler bodies, Mayhem initializer, token-extension recovery and Metaplex probes were not pursued. Existing packages and parent source are unchanged.

## Verification

Run `python3 verify.py` from any directory. The verifier checks the exact file set and SHA256 seal, original ELF SHA256 and Git blob identity, every retained assembly byte, window hashes, direct-call targets and selected control-flow anchors. It does not execute program code or establish exhaustive semantics/security. Source and JSON excerpt full-blob provenance is recorded from frozen Git retrieval; only the copied original binary's complete Git object is independently recomputed offline. Excerpt hashes and the seal are independently checked. The copied-directory outcome is retained outside the seal as `verification-outcome.json` in the worker directory.
