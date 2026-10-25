# AMM create_config and shared setters: source-only proposal

A complete readable **behavioral source proposal** is supplied for `create_config`, its Anchor context/event, and the four shared GlobalConfig setters. It is based on the captured instruction, the six complete historical instruction matches, and the accepted current source. It has **not been built or executed**. The historical comparison is not validation of this new source tree or proof of exact original Rust. No main file was changed.

The proposal preserves the original fixed administrator, signer requirement, PDA constraints, System program account and init/exit ordering. It provides the genuine second caller of the shared scalar methods; no dummy caller, alternate administrator, copied binary input, padding, inline attribute, compiler flag or version experiment is proposed. Successful initializer runtime coverage remains **zero**. The current 37 bounded AMM handlers and existing runtime corpus must not be incremented on the basis of this package.

## Inputs and scope

The frozen prerequisite package is copied intact under `prerequisites/`, with manifest SHA-256 `d4f0ef70d0eaa53476c9430d561ad664c8e05b691ab27a2c571040696cabb887`. It supplies:

| Artifact | SHA-256 |
|---|---|
| Captured original AMM ELF | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| Accepted scalar-guard-order candidate | `a6dbd0dc24e28a9459e50858136a2cfabb59fb8aa8399d58499d047a76ec291f` |
| Historical static-only create-config candidate | `ff7818d7b6c3a3222e46a99bd9cb3fda6f8bff52d951eaefd40c1e2bba8c3a28` |

`baseline-source-sha256.json` binds the 18 accepted inputs. `source/` copies those inputs, changes only `src/lib.rs` and one module declaration in `src/state.rs`, and adds four files in natural module directories. `proposed-source-sha256.json` binds all 22 files. Cargo manifests, locks, profiles, codecs, other instructions and error definitions are unchanged. `source-only-proposal.patch` reproduces the exact six-file difference.

The ten public dependency source files in `dependency-source/` were checked byte-for-byte against three retained `.crate` archives, whose SHA-256 values equal the unchanged lockfile checksums. These are source evidence only; no dependency tool was executed. The missing cached checksum-file attempt and two corrected analyzer count assertions are retained under `diagnostics/`.

## Instruction identity and full-body evidence

The IDL discriminator is `c9cff3724b6f2fbd`. Original dispatch loads it at `0xdbd28`, selects block `0xdc318` at `0xdbd38`, and calls wrapper `0xe0bf8` at `0xdc368`. Wrapper call `0xe1248` reaches handler `0x16d88`. This ties the initializer to dispatch, not to a nearby string.

| Routine | Original address | Historical address | Complete bytes |
|---|---:|---:|---:|
| Instruction wrapper | `0xe0bf8` | `0x945f8` | 2,320 |
| Handler | `0x16d88` | `0xa04d0` | 3,032 |
| Accounts parser/constraints | `0x80fb8` | `0x46470` | 5,752 |
| Init closure | `0x82630` | `0x47ae8` | 5,896 |
| Recipient setter | `0x61d68` | `0x101c0` | 2,336 |
| Event serialization | `0x83d38` | `0x491f0` | 744 |

Original target extents are identified from original call/relocation entry boundaries and cross-checked against the historical symbol sizes. All six complete instruction ranges match after the existing narrowly defined relocation normalization, with identical relocation shapes. The analyzer writes no normalized executable. Their **112 immediate direct callsites** have individual original/historical addresses, lengths, raw/normalized hashes and symbol attribution in `static-closure.json`. **109 target bodies match completely**. The only three mismatches are the scalar setters: original 616 bytes each versus historical 608 bytes. This includes full direct-target matches for the 1,024-byte unchecked Account load at `0x3240`, the 1,648-byte GlobalConfig exit at `0x4f00`, all four System CPI helpers, the error conversion helpers and event machinery. It does not claim recursive closure of every target's targets/data.

Four external call relocations are retained separately. Public symbol names come from the historical unstripped ELF and are attribution evidence for the paired body, not recovered original symbol names.

## Accounts, authorization and init ordering

The context has five declared positional accounts:

1. `admin: Signer`, writable, equal to `8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8`, with custom `InvalidAdmin` on the address failure.
2. `global_config: Account<GlobalConfig>`, `init`, payer `admin`, space **949**, canonical PDA from `[b"global_config"]` plus Anchor's bump under this program.
3. `system_program: Program<System>`.
4. Event authority AccountInfo, canonical `[b"__event_authority"]` PDA plus bump.
5. Event `program: AccountInfo`, added by the existing Anchor event macro. The original macro leaves this field unchecked; no stronger or weaker substitute check is invented.

Signer parsing calls `0xfa58` at `0x80ff0`; System program parsing calls `0x10b50` at `0x81078`. Global PDA derivation calls `0x10e068` at `0x81660`, using the one-seed descriptor `0x122a00`, containing the 13-byte `global_config` seed. The config key comparison is at `0x81740`, and init helper invocation is at `0x81980`.

**Init happens before the fixed-admin address check.** This is the pinned Anchor generator's deliberate ordering: `try_accounts.rs:141-173` emits all init constraints before non-init access checks. The original fixed-key memcmp is `0x81fb8`, with explicit length 32; nonzero branches at `0x81fd0` to the `InvalidAdmin` path (`0x82240`), then adds `admin` and the compared public keys. The exact 32-byte original constant is decoded and asserted by the analyzer. Event PDA derivation follows at `0x82008`; its key comparison is `0x820d8`. This proposal preserves that order even though it cannot exercise an authenticated successful initializer. System/state effects before a later failure are not a successful initialization and must not be presented as one.

The init helper has two real branches:

- Zero lamports: rent minimum for 949 bytes, then System `create_account` at `0x82dc0`, signed by `[global_config, bump]` and owned by the AMM program.
- Prefunded: reject payer key equal to the new account (error 4101), compute `minimum_balance(949).max(1).saturating_sub(current_lamports)`, transfer only a positive deficit at `0x834b8`, allocate 949 at `0x83878`, then assign the AMM owner at `0x83c08`, using the same actual PDA signer seeds for allocate/assign.

Both converge on the unchecked typed account load at `0x83c48`, with `global_config` error annotation. Exact branch instructions and CPI targets are in the ledger; the locked generator at `constraints.rs:1621-1677` independently expresses these same operations. No synthetic PDA signature or administrator replacement is part of the proposal.

## Handler stores, defaults, error precedence and exit

The original copies the admin key into GlobalConfig first (`0x16e20..0x16e38`). It then passes the same config reference (`r6 = r9 + 0x78`) to the following four methods, short-circuiting after each failure:

| Order | Meaning | Create call | Update call | Original target |
|---|---|---:|---:|---:|
| 1 | LP fee, unsigned u64 <= 1000, then store | `0x16e70` | `0x1d8f0` | `0x61630` |
| 2 | Protocol fee, unsigned u64 <= 1000, then store | `0x16ed0` | `0x1d958` | `0x61898` |
| 3 | Eight recipients all nonzero, then strictly sorted/unique, then store | `0x16f10` | `0x1d9a0` | `0x61d68` |
| 4 | Creator fee, unsigned u64 <= 1000, then store | `0x16f50` | `0x1d9e8` | `0x61b00` |

The three scalar errors are 6000 with compared values **(1000, supplied fee)**. These are the previously accepted guard/order semantics. The recipient routine performs eight 32-byte zero comparisons, then seven lexicographic adjacent comparisons and only then a 256-byte copy. Errors are 6011 and 6012 respectively, constructed with source origin but **without `with_pubkeys`/`with_values`**. The existing current inline zero-recipient path uses `require_keys_neq!`; this proposal changes that diagnostic to the original plain `require!` path. This narrow additional diagnostic correction is explicit and has no fresh runtime validation here.

Each original setter has exactly two identified direct callers, the two real handlers above. The historical static candidate had only the creation call for the scalar methods and kept update guards inline. Thus the prior 608-byte result did not reconstruct the observed sharing graph. The new ordinary impl restores both real source callsites. A particular resulting compiler specialization or a 616-byte body is **not predicted**.

After all setters succeed, the handler writes `disable_flags = 0` at `0x16f78`, writes all four words of `admin_set_coin_creator_authority` at `0x16f90..0x16fc0`, and calls Clock at `0x16fd8`. The remaining fields have **no explicit handler writes**. Under a successfully created/allocated zero-filled 949-byte account and the unchanged typed decoder, the untouched public keys/arrays/numbers decode as zero and booleans as false. This is a conditional source/dataflow consequence, not a recorded successful initializer state. `field-stores-and-defaults.json` separates the explicit stores from this zero-initialization dependency and lists every serialized field through byte 949.

The wrapper invokes the handler before account exit. Only its success branch `0xe1260 -> 0xe1270` reaches GlobalConfig exit at `0xe12a0`; failure branch `0xe1268 -> 0xe13f8` skips it. The existing `Account::exit_with_expected_owner` persists only when the expected owner is this program and the account is not closed; its discriminator and serialization implementation are unchanged. Clock/event/self-CPI errors also short-circuit before successful wrapper exit. There is no claim that static ordering alone supplies runtime rollback evidence.

## Event and CPI order

The event is `CreateConfigEvent`, discriminator **`6b34598137e25116`**, and serializes exactly 360 bytes: discriminator (8), timestamp i64 (8), admin (32), LP fee (8), protocol fee (8), recipients (256), creator fee (8), and authority (32). All field offsets and original serializer instructions are retained.

Original serialization at `0x171b8` precedes `sol_log_data` at `0x17200`. Serialization at `0x17320` then produces the event-CPI bytes; inline tag `0x1d9acb512ea545e4` is the unchanged Anchor event prefix, making 368 bytes. Instruction construction at `0x17648` uses the real AMM program id and the event authority as a readonly signer. `invoke_signed` at `0x17780` receives one seed group `[b"__event_authority", &[bump]]`. It happens before wrapper account exit. The ten retained locked source files include the exact event macro, appended context accounts and tag; no event order or signer substitution is introduced.

## Bounded literal closure and unresolved data

The six bodies contain **44 type-8 data references**. The ledger bounds **33** by explicit instruction lengths, the public-key/u32 type, or a single seed fat pointer. All 33 consumed spans equal their historical counterparts, including the fixed administrator, AMM id, both PDA seeds, account names, initializer instruction log, 55-byte Display panic string, enum constants and source-path slices. The eight-byte event discriminator and event-CPI tag are separately checked as inline constants.

**Eleven references remain outside a complete recursive compiler metadata proof**:

| References | Original pointer | Open data boundary |
|---|---:|---|
| Wrapper `0xe0da0`, `0xe0e20` | `0x1221c8` | Static std::io error representation used by Borsh unexpected-length conversion |
| Handler `0x17900` | `0x1220d0` | fmt::Arguments panic piece descriptor |
| Handler `0x17948` | `0x1220e0` | Rust panic Location descriptor and referenced compiler path |
| Init `0x82e28`; recipients `0x62320`, `0x623e8` | `0x1221e0` | Error-formatting trait-object/vtable metadata |
| Init `0x82ed0`; recipients `0x62490` | `0x122210` | Display unwrap panic trait-object metadata |
| Init `0x82ee0`; recipients `0x624a0` | `0x122230` | Display unwrap panic Location metadata |

Exact pointer sites and complete historical consumer-body matches are preserved; adjacent bytes are not treated as a consumed extent or equality proof. These open dependency metadata graphs and the three scalar body mismatches prevent a claim of full original closure. Exact source line coordinates, module/method spelling/visibility, compiler choices and transitive target/data equality remain unproved. Original source filenames support the natural new module placement, but the proposal intentionally does not copy the historical source's inline attributes, blank-line padding or path directives.

## Suggested acceptance boundary

Root can review this as **complete semantic source with static-only initializer evidence**, including the shared-recipient diagnostic correction. It is suitable for a separately authorized single fixed-recipe source build and fresh symbol/body/target/data comparison; this package does not perform that build or claim it will match. Any later integration should keep the initializer labeled static-only, keep the current bounded handler count unchanged, and retain authentic positive execution as unavailable. Existing normal signer rejection evidence cannot substitute for that acceptance.

The approved update guard behavior is preserved. Any later changed executable would need the existing ordinary AMM regression corpus and appropriate saved-case diagnostic checks before replacing the current candidate. No initializer success fixture, signing workaround, historical-message alteration or stopped lane is proposed. No main files, compiler binaries, tool recipes, frozen packages or published status were edited here.

Run the portable read-only verification with `python3 -B work/amm-create-config-source-proposal/verify.py`. Optional `--current-source /path/to/repository` checks the 18 accepted source inputs against the live checkout. The verifier verifies the complete prerequisite seal, archive/member hashes, source diff, static ledgers and this package's seal. It compiles and executes no Solana program.
