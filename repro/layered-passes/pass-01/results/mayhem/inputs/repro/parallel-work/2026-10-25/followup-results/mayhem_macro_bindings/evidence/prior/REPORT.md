# Mayhem current9e4 manual source security review

Scratch handoff for parent review only. No external disclosure, source patch, build, probe, signature operation, commit or parent edit was performed. All inputs are fixed Git-tracked public blobs at `517d77db988d8c63b6cf476f0be138c5a4f3128a`.

**Result:** manually inspected all 24 included handlers, 15 Accounts contexts, 61 explicit function bodies and 15 non-context struct/event rows. `initialize_mayhem_state` is excluded entirely and absent from the included source; no original body or mixed entry/body exploration was performed. The 24 count includes `initialize_global_params` and `initialize_fee_recipient`, as the assignment permits. No confirmed exploitable vulnerability is asserted. Six concrete review observations below preserve candidate behavior, missing reachability and next prerequisites.

Candidate SHA256: `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b`. Retained original metadata SHA256: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. The original is not byte-identical; this run hashes the copied candidate and compares the accepted source hashes to the retained build comparison and summary. It does not rebuild or certify the historical original. Other programs are outside this review; their original equality is not inferred.

Starting points were the requested published [BACKLOG](evidence/repro/parallel-work/2026-10-24/wave2-results/public_audit_coverage/BACKLOG.md) and [coverage](evidence/repro/parallel-work/2026-10-24/wave2-results/public_audit_coverage/coverage.json). Their accepted checkpoint is older; every cited Mayhem span and current source hash is rechecked here. Their lexical inventory was used to enumerate bodies, not as a substitute for this manual review. No prior private audit worker or private security review was consumed.

## Interpretation and assurance boundary

Explicit source constraints establish what this candidate requests: role signers, PDA/address checks, typed accounts, fixed external targets, fixed CPI vectors and arithmetic. Statements about generated owner/discriminator/ATA checks describe the declared contract, not an inspected complete macro expansion. Matching Anchor1.0.0 account/event/token macro sources are not retained in the public source paths discovered for this task. The checked System wrapper and retained error generator were inspected directly. External token/AMM/Pump checks and transaction rollback remain explicit obligations.

All source references have exact line ranges, zero-based UTF-8 byte ranges and full SHA256 span digests in [result.json](result.json). [provenance.json](provenance.json) records full SHA256, byte length and Git blob object identity for every copied input. Code comments containing original addresses are evidence annotations only; this review does not treat those addresses as newly established historical function identities. There are no inferred binary function windows in this output.

## Substantive observations

### M-01: Bootstrap and fee-recipient payer are permissionless

Initialization of global parameters pins only a PDA, not an authorized bootstrap identity. Fee-recipient initialization checks no stored admin relation, confirmed by saved wrong-admin payer success. The latter creates program custody, so no payer theft established.

Status: candidate behavior established; vulnerability not established. Sources: lib.rs:117-126, lib.rs:313-345.

Unclosed: Current initialized deployment state, intended bootstrap policy and any hypothetical uninitialized-deployment reachability are absent. Next prerequisite: Parent supplies public deployment initialization/authority evidence; no new initialization probe.

### M-02: Sweep dynamic pairs are typed but not canonical or unique

Eight arbitrary typed recipient/token pairs are accepted. Only nonzero token transfers exercise stored bump/index signing. Duplicate pairs serialize/reload in sequence and respect invocation cap; caller is already stored trader/admin. A zero token transfer does not validate ATA/mint/seeds.

Status: candidate control boundary established; fund-loss impact unproved. Sources: lib.rs:401-429.

Unclosed: Cannot prove creation of attacker-controlled Mayhem-owned FeeRecipient or a transfer into an unauthorized destination from missing constraints alone. Rent floor and cumulative counter bounds need reachable states. Next prerequisite: Use public state-origin and existing saved-case provenance to establish legal recipient universe and balances; preserve initializer exclusion.

### M-03: Shared nonnative risk/caps have raw-unit semantics

All nonnative quotes use one stable_deployed and common limits without mint decimals or unit normalization. Mayhem does not locally impose quote allowlist or pool-to-mint relationship beyond described constraints; fixed Pump/AMM CPI must provide missing relationships.

Status: candidate arithmetic fact; economic impact unproved. Sources: buy_v2.rs:108-115, buy_pump_swap.rs:119-126, lib.rs:36-37, lib.rs:181-183.

Unclosed: Supported live quote set, decimals, CPI configuration and actual route reachability are not established. No mixed-asset risk bypass claimed. Next prerequisite: Retained matching external-program source/configuration and public quote policy before economic conclusions; excluded Pump sell_v2 remains out of scope.

### M-04: Arithmetic failures are bounded rejection behavior, not proved exploits

Release overflow checks are enabled. Unbounded retained bps can underflow, zero quote reserves can reach checked_div.unwrap, signed time additions can overflow, sweep rent subtraction can underflow, and previous+total-before_total can overflow before subtraction. Buy risk compares positive i128 low-u64 limbs. Some failures have matching saved synthetic receipts.

Status: candidate failure conditions established; harmful reachable preconditions unproved. Sources: lib.rs:49-50, lib.rs:65-69, lib.rs:418-425, buy.rs:74-98, sell.rs:87-106.

Unclosed: Authorized caller/configuration or legal state constraints matter; no unauthenticated persistent denial or fund loss established. External supply/fee and lifecycle invariants are unproved. Next prerequisite: Prove reachable balances/counters/configurations from permitted public evidence before assigning severity or proposing source changes.

### M-05: AMM native accounting includes WSOL closure rent and existing balance

Snapshot sol-vault before AMM then close entire WSOL quote account to it. Buy measured spend can be reduced by returned rent/preexisting WSOL; small buy may unsigned-underflow and abort. Sell receipt includes all returned WSOL/rent. No separate asset-only adjustment.

Status: candidate source behavior and saved verification metadata; not a new exploit finding. Sources: buy_pump_swap.rs:102-126, sell_pump_swap.rs:99-112.

Unclosed: Existing published cases establish a bounded reconstruction behavior, not all native balance states. New security impact and policy mismatch are unproved. Next prerequisite: Parent evaluates rent/accounting policy against retained known cases; no new fixtures or probes.

### M-06: Pause and resets are narrower than all asset movement

Stop gates trades only. Admin withdrawal, both sweeps and permissionless expired burn remain available. Reset_state clears intervals/counters and unpauses but preserves authorities/version/sweep caps and per-mint state. Single-step role changes accept unusable pubkeys.

Status: candidate privilege semantics established; no unauthorized access established. Sources: lib.rs:185-214, lib.rs:35-78, burn.rs:38-64.

Unclosed: Intended emergency/rotation/reset policy not given. These behaviors are admin-authorized or time-guarded, not privilege bypass by themselves. Next prerequisite: Compare to explicit responsible-owner operational policy before classifying a defect.

## Handler matrix

Each row below is a manual conclusion. The complete eight-family assessment (authorization, dynamic layout, CPI/events, arithmetic, lifecycle/rent, token assets, time/configuration, errors/rollback) is in the detailed entries that follow and machine-readable result.

| Handler | Exact entry | Context | Transition and control conclusion |
| --- | --- | --- | --- |
| update_admin | [programs/mayhem/src/lib.rs:169-172](evidence/programs/mayhem/src/lib.rs#L169) | Admin | Replaces admin with arbitrary new_admin Pubkey. Single-step replacement; zero/unusable key can permanently lock administration. No acceptance signature, version bump or event. |
| update_trader | [programs/mayhem/src/lib.rs:173-176](evidence/programs/mayhem/src/lib.rs#L173) | Admin | Replaces trader with arbitrary new_trader Pubkey. New signer immediately controls all six trades and trader sweeps; zero key disables ordinary trading. Does not pause or reset counters. |
| update_max_sol_per_sweep | [programs/mayhem/src/lib.rs:177-180](evidence/programs/mayhem/src/lib.rs#L177) | Admin | Stores full u64 native sweep cap. Cap is per call, not time-based; admin sweep ignores it. |
| update_max_stable_per_sweep | [programs/mayhem/src/lib.rs:181-184](evidence/programs/mayhem/src/lib.rs#L181) | Admin | Stores full u64 nonnative sweep cap. One cap shared across all nonnative quote mints; admin sweep ignores it. |
| reset_sol_deployed | [programs/mayhem/src/lib.rs:185-188](evidence/programs/mayhem/src/lib.rs#L185) | Admin | Sets global signed SOL deployment counter to zero. Reopens global buy budget without withdrawing assets or resetting per-coin counters; can run while paused. |
| reset_stable_deployed | [programs/mayhem/src/lib.rs:189-192](evidence/programs/mayhem/src/lib.rs#L189) | Admin | Sets global signed stable deployment counter to zero. Reopens shared nonnative budget without moving tokens; future signed sell deltas can make it negative. |
| reset_state | [programs/mayhem/src/lib.rs:193-203](evidence/programs/mayhem/src/lib.rs#L193) | Admin | Clears reset_prefix, reset_middle, reset_stable_prefix/suffix and both deployed counters; sets paused=false. Preserves admin,trader,version,field_10,preserved_middle_a and both sweep caps. Clears withdrawal/trade intervals but not per-mint trade timestamp/state. Also resumes trading. |
| stop_trading | [programs/mayhem/src/lib.rs:204-208](evidence/programs/mayhem/src/lib.rs#L204) | Admin | Requires paused=false then writes true. Gates six trades; does not gate burns, withdrawals, sweeps or admin/reset. |
| resume_trading | [programs/mayhem/src/lib.rs:209-214](evidence/programs/mayhem/src/lib.rs#L209) | Admin | Requires paused=true then writes false. Repeated resume fails with TradingPaused (same code as repeated stop), despite active state. |
| initialize_global_params | [programs/mayhem/src/lib.rs:123-126](evidence/programs/mayhem/src/lib.rs#L123) | InitializeGlobalParams | Sets only admin; trader stays zero, paused false. Bootstrap authority is not pinned. |
| initialize_fee_recipient | [programs/mayhem/src/lib.rs:117-122](evidence/programs/mayhem/src/lib.rs#L117) | InitializeFeeRecipient | No stored-admin relationship required. Payer cannot choose fee recipient key independently of index. |
| update_global_params | [programs/mayhem/src/lib.rs:127-168](evidence/programs/mayhem/src/lib.rs#L127) | Admin | Version increments even with all None. Changes trade interval/reserve/risk and withdraw intervals but not roles, pause, sweep caps or deployed counters. |
| withdraw_admin | [programs/mayhem/src/lib.rs:60-78](evidence/programs/mayhem/src/lib.rs#L60) | WithdrawAdmin | Gate bypassed if last==0 or interval==0. Negative configured interval can weaken delay. Pause ignored; does not reconcile deployed counters. |
| withdraw_quote_admin | [programs/mayhem/src/lib.rs:44-59](evidence/programs/mayhem/src/lib.rs#L44) | WithdrawQuoteAdmin | Pause ignored; no quote allowlist; shared timestamp may throttle otherwise unrelated quote withdrawals. |
| extend_account | [programs/mayhem/src/lib.rs:79-116](evidence/programs/mayhem/src/lib.rs#L79) | ExtendAccount | Permissionless extension; does not migrate logical fields or increment version. Trailing space is not a new state codec. |
| sweep_fees | [programs/mayhem/src/lib.rs:35-39](evidence/programs/mayhem/src/lib.rs#L35) | SweepFees | No pause/rate test; trader updates per-recipient timestamp, admin does not. Per-call cap can be used repeatedly by authorized signer. Order determines which recipient is drained first. |
| sweep_fees_admin | [programs/mayhem/src/lib.rs:40-43](evidence/programs/mayhem/src/lib.rs#L40) | SweepFeesAdmin | No pause/rate test; trader updates per-recipient timestamp, admin does not. Per-call cap can be used repeatedly by authorized signer. Order determines which recipient is drained first. |
| burn_tokens | [programs/mayhem/src/lib.rs:32-34](evidence/programs/mayhem/src/lib.rs#L32) | BurnTokens | Burn ignores pause; requires end<=Clock and not Ended. Sets Ended only after events. Stored state.mint not independently compared to supplied mint. |
| buy | [programs/mayhem/src/lib.rs:28-28](evidence/programs/mayhem/src/lib.rs#L28) | LegacyBuy | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Buy adds actual spend to global and field_56 and subtracts tokens from field_72; strict post-CPI risk limits. |
| sell | [programs/mayhem/src/lib.rs:29-31](evidence/programs/mayhem/src/lib.rs#L29) | LegacySell | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Sell subtracts actual receipt from global and field_56; adds spent tokens to field_72. |
| buy_v2 | [programs/mayhem/src/lib.rs:26-26](evidence/programs/mayhem/src/lib.rs#L26) | BuyV2 | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Buy adds actual spend to global and field_56 and subtracts tokens from field_72; strict post-CPI risk limits. |
| sell_v2 | [programs/mayhem/src/lib.rs:27-27](evidence/programs/mayhem/src/lib.rs#L27) | SellV2 | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Sell subtracts actual receipt from global and field_56; adds spent tokens to field_72. |
| buy_pump_swap | [programs/mayhem/src/lib.rs:24-24](evidence/programs/mayhem/src/lib.rs#L24) | BuyPumpSwap | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Buy adds actual spend to global and field_56 and subtracts tokens from field_72; strict post-CPI risk limits. |
| sell_pump_swap | [programs/mayhem/src/lib.rs:25-25](evidence/programs/mayhem/src/lib.rs#L25) | SellPumpSwap | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Sell subtracts actual receipt from global and field_56; adds spent tokens to field_72. |

### update_admin

[programs/mayhem/src/lib.rs:169-172](evidence/programs/mayhem/src/lib.rs#L169).

- **authorization_accounts**: Admin context: mutable stored admin signer + canonical typed global PDA; see context matrix for System/event accounts.
- **dynamic_accounts_layout**: Fixed Borsh state and arguments; no remaining accounts, loops or account creation.
- **cpi_events**: No token/System transfer or event emission in this body; required context accounts still parse.
- **arithmetic**: No arithmetic.
- **lifecycle_rent**: No allocation, rent or balance movement. Serialized state changes commit only on instruction success.
- **token_assets**: No asset transfer; role/configuration change affects later authorized operations.
- **state_time_configuration**: Replaces admin with arbitrary new_admin Pubkey. Single-step replacement; zero/unusable key can permanently lock administration. No acceptance signature, version bump or event.
- **errors_order_rollback**: All checks precede mutation except fixed parsing; repeated pause/resume returns 6000. No event exists for these transitions.

Unclosed: Establish intended authority rotation policy and deployment key custody; no unauthorized rotation follows from this code. Full Accounts/event macro semantics remain dependency-bound.

### update_trader

[programs/mayhem/src/lib.rs:173-176](evidence/programs/mayhem/src/lib.rs#L173).

- **authorization_accounts**: Admin context: mutable stored admin signer + canonical typed global PDA; see context matrix for System/event accounts.
- **dynamic_accounts_layout**: Fixed Borsh state and arguments; no remaining accounts, loops or account creation.
- **cpi_events**: No token/System transfer or event emission in this body; required context accounts still parse.
- **arithmetic**: No arithmetic.
- **lifecycle_rent**: No allocation, rent or balance movement. Serialized state changes commit only on instruction success.
- **token_assets**: No asset transfer; role/configuration change affects later authorized operations.
- **state_time_configuration**: Replaces trader with arbitrary new_trader Pubkey. New signer immediately controls all six trades and trader sweeps; zero key disables ordinary trading. Does not pause or reset counters.
- **errors_order_rollback**: All checks precede mutation except fixed parsing; repeated pause/resume returns 6000. No event exists for these transitions.

Unclosed: Obtain intended trader privilege policy; this does not constrain trader market choices. Full Accounts/event macro semantics remain dependency-bound.

### update_max_sol_per_sweep

[programs/mayhem/src/lib.rs:177-180](evidence/programs/mayhem/src/lib.rs#L177).

- **authorization_accounts**: Admin context: mutable stored admin signer + canonical typed global PDA; see context matrix for System/event accounts.
- **dynamic_accounts_layout**: Fixed Borsh state and arguments; no remaining accounts, loops or account creation.
- **cpi_events**: No token/System transfer or event emission in this body; required context accounts still parse.
- **arithmetic**: 0 prevents amounts in trader native sweep; u64::MAX permits full availability.
- **lifecycle_rent**: No allocation, rent or balance movement. Serialized state changes commit only on instruction success.
- **token_assets**: No asset transfer; role/configuration change affects later authorized operations.
- **state_time_configuration**: Stores full u64 native sweep cap. Cap is per call, not time-based; admin sweep ignores it.
- **errors_order_rollback**: All checks precede mutation except fixed parsing; repeated pause/resume returns 6000. No event exists for these transitions.

Unclosed: Determine whether a temporal withdrawal limit was intended; no such guarantee is present. Full Accounts/event macro semantics remain dependency-bound.

### update_max_stable_per_sweep

[programs/mayhem/src/lib.rs:181-184](evidence/programs/mayhem/src/lib.rs#L181).

- **authorization_accounts**: Admin context: mutable stored admin signer + canonical typed global PDA; see context matrix for System/event accounts.
- **dynamic_accounts_layout**: Fixed Borsh state and arguments; no remaining accounts, loops or account creation.
- **cpi_events**: No token/System transfer or event emission in this body; required context accounts still parse.
- **arithmetic**: No decimals conversion; cap in raw quote token units.
- **lifecycle_rent**: No allocation, rent or balance movement. Serialized state changes commit only on instruction success.
- **token_assets**: No asset transfer; role/configuration change affects later authorized operations.
- **state_time_configuration**: Stores full u64 nonnative sweep cap. One cap shared across all nonnative quote mints; admin sweep ignores it.
- **errors_order_rollback**: All checks precede mutation except fixed parsing; repeated pause/resume returns 6000. No event exists for these transitions.

Unclosed: Establish quote allowlist/decimals policy externally. Full Accounts/event macro semantics remain dependency-bound.

### reset_sol_deployed

[programs/mayhem/src/lib.rs:185-188](evidence/programs/mayhem/src/lib.rs#L185).

- **authorization_accounts**: Admin context: mutable stored admin signer + canonical typed global PDA; see context matrix for System/event accounts.
- **dynamic_accounts_layout**: Fixed Borsh state and arguments; no remaining accounts, loops or account creation.
- **cpi_events**: No token/System transfer or event emission in this body; required context accounts still parse.
- **arithmetic**: Cannot overflow; does not change per-state field_56.
- **lifecycle_rent**: No allocation, rent or balance movement. Serialized state changes commit only on instruction success.
- **token_assets**: No asset transfer; role/configuration change affects later authorized operations.
- **state_time_configuration**: Sets global signed SOL deployment counter to zero. Reopens global buy budget without withdrawing assets or resetting per-coin counters; can run while paused.
- **errors_order_rollback**: All checks precede mutation except fixed parsing; repeated pause/resume returns 6000. No event exists for these transitions.

Unclosed: Reconcile intended net-exposure policy after privileged reset. Full Accounts/event macro semantics remain dependency-bound.

### reset_stable_deployed

[programs/mayhem/src/lib.rs:189-192](evidence/programs/mayhem/src/lib.rs#L189).

- **authorization_accounts**: Admin context: mutable stored admin signer + canonical typed global PDA; see context matrix for System/event accounts.
- **dynamic_accounts_layout**: Fixed Borsh state and arguments; no remaining accounts, loops or account creation.
- **cpi_events**: No token/System transfer or event emission in this body; required context accounts still parse.
- **arithmetic**: Cannot overflow; no per-state reset.
- **lifecycle_rent**: No allocation, rent or balance movement. Serialized state changes commit only on instruction success.
- **token_assets**: No asset transfer; role/configuration change affects later authorized operations.
- **state_time_configuration**: Sets global signed stable deployment counter to zero. Reopens shared nonnative budget without moving tokens; future signed sell deltas can make it negative.
- **errors_order_rollback**: All checks precede mutation except fixed parsing; repeated pause/resume returns 6000. No event exists for these transitions.

Unclosed: Establish supported quote units and privileged reset policy. Full Accounts/event macro semantics remain dependency-bound.

### reset_state

[programs/mayhem/src/lib.rs:193-203](evidence/programs/mayhem/src/lib.rs#L193).

- **authorization_accounts**: Admin context: mutable stored admin signer + canonical typed global PDA; see context matrix for System/event accounts.
- **dynamic_accounts_layout**: Fixed Borsh state and arguments; no remaining accounts, loops or account creation.
- **cpi_events**: No token/System transfer or event emission in this body; required context accounts still parse.
- **arithmetic**: Fixed-size zero fills; no arithmetic.
- **lifecycle_rent**: No allocation, rent or balance movement. Serialized state changes commit only on instruction success.
- **token_assets**: No asset transfer; role/configuration change affects later authorized operations.
- **state_time_configuration**: Clears reset_prefix, reset_middle, reset_stable_prefix/suffix and both deployed counters; sets paused=false. Preserves admin,trader,version,field_10,preserved_middle_a and both sweep caps. Clears withdrawal/trade intervals but not per-mint trade timestamp/state. Also resumes trading.
- **errors_order_rollback**: All checks precede mutation except fixed parsing; repeated pause/resume returns 6000. No event exists for these transitions.

Unclosed: Confirm operational reset semantics; do not infer full state reset or balance reset. Full Accounts/event macro semantics remain dependency-bound.

### stop_trading

[programs/mayhem/src/lib.rs:204-208](evidence/programs/mayhem/src/lib.rs#L204).

- **authorization_accounts**: Admin context: mutable stored admin signer + canonical typed global PDA; see context matrix for System/event accounts.
- **dynamic_accounts_layout**: Fixed Borsh state and arguments; no remaining accounts, loops or account creation.
- **cpi_events**: No token/System transfer or event emission in this body; required context accounts still parse.
- **arithmetic**: Boolean guard only.
- **lifecycle_rent**: No allocation, rent or balance movement. Serialized state changes commit only on instruction success.
- **token_assets**: No asset transfer; role/configuration change affects later authorized operations.
- **state_time_configuration**: Requires paused=false then writes true. Gates six trades; does not gate burns, withdrawals, sweeps or admin/reset.
- **errors_order_rollback**: All checks precede mutation except fixed parsing; repeated pause/resume returns 6000. No event exists for these transitions.

Unclosed: Confirm pause scope; stored role remains able to sweep while paused. Full Accounts/event macro semantics remain dependency-bound.

### resume_trading

[programs/mayhem/src/lib.rs:209-214](evidence/programs/mayhem/src/lib.rs#L209).

- **authorization_accounts**: Admin context: mutable stored admin signer + canonical typed global PDA; see context matrix for System/event accounts.
- **dynamic_accounts_layout**: Fixed Borsh state and arguments; no remaining accounts, loops or account creation.
- **cpi_events**: No token/System transfer or event emission in this body; required context accounts still parse.
- **arithmetic**: Boolean guard only.
- **lifecycle_rent**: No allocation, rent or balance movement. Serialized state changes commit only on instruction success.
- **token_assets**: No asset transfer; role/configuration change affects later authorized operations.
- **state_time_configuration**: Requires paused=true then writes false. Repeated resume fails with TradingPaused (same code as repeated stop), despite active state.
- **errors_order_rollback**: All checks precede mutation except fixed parsing; repeated pause/resume returns 6000. No event exists for these transitions.

Unclosed: Historical diagnostics/ABI remain bounded; no dedicated TradingActive emission here. Full Accounts/event macro semantics remain dependency-bound.

### initialize_global_params

[programs/mayhem/src/lib.rs:123-126](evidence/programs/mayhem/src/lib.rs#L123).

- **authorization_accounts**: Permissionless first signer becomes stored admin; init canonical global PDA prevents ordinary duplicate initialization.
- **dynamic_accounts_layout**: 254 bytes = discriminator +246 serialized fields. Untouched fields initially zero by init contract.
- **cpi_events**: System creation via Accounts init; checked System ID explicit. No handler event.
- **arithmetic**: No handler arithmetic. Zero config means zero buy risk limits until changed.
- **lifecycle_rent**: Payer funds rent; no close/reinitialize path among included handlers.
- **token_assets**: No vault funded or token account created.
- **state_time_configuration**: Sets only admin; trader stays zero, paused false. Bootstrap authority is not pinned.
- **errors_order_rollback**: Init happens before body; creation failure aborts. No already-initialized overwrite branch.

Unclosed: No live uninitialized-deployment precondition established; permissionless bootstrap is candidate behavior, not a demonstrated takeover. Retain exact init macro semantics and deployment initialization evidence.

### initialize_fee_recipient

[programs/mayhem/src/lib.rs:117-122](evidence/programs/mayhem/src/lib.rs#L117).

- **authorization_accounts**: Signer named admin is only the payer: global-params has seeds and mutability but NO has_one=admin. WSOL address, legacy Token program, ATA program, index-derived recipient PDA and recipient WSOL ATA constrain asset custody. Index <8 runs after account initialization; failure needs transaction rollback. Recipient authority is the PDA, not payer; no theft follows merely from permissionless creation.
- **dynamic_accounts_layout**: u8 index; only 0..7 succeeds; recipient occupies 42 bytes, including opaque32. No dynamic accounts.
- **cpi_events**: Init System + legacy Token/ATA CPIs derive recipient(index) then recipient WSOL ATA.
- **arithmetic**: No fee arithmetic; bump/index assigned after index bound.
- **lifecycle_rent**: Signer funds rent; init is one-time; no payer withdrawal authority is stored.
- **token_assets**: WSOL only, fixed Tokenkeg; recipient PDA is ATA authority.
- **state_time_configuration**: No stored-admin relationship required. Payer cannot choose fee recipient key independently of index.
- **errors_order_rollback**: Out-of-range check after generated init; expected rollback of created accounts on failure; saved cases 0,7,8,264 support boundary and permissionless behavior.

Unclosed: Full init/ATA macro source absent; permissionless creation is not established fund loss.

### update_global_params

[programs/mayhem/src/lib.rs:127-168](evidence/programs/mayhem/src/lib.rs#L127).

- **authorization_accounts**: Admin context: mutable stored admin signer + canonical typed global PDA; see context matrix for System/event accounts.
- **dynamic_accounts_layout**: 16 Option fields with fixed widths/offsets; None preserves bytes. Event reconstructs complete new field values.
- **cpi_events**: No asset CPI; emit! and emit_cpi! after update; event discriminator explicitly overridden.
- **arithmetic**: version.checked_add prevents wrap. Field values themselves are unrestricted u64/u32/u8, including interval bits later reinterpreted as i64.
- **lifecycle_rent**: No balance changes; overflow/event failure requires rollback of earlier field assignments.
- **token_assets**: Raw asset-unit caps/thresholds; no fee calculation or decimals normalization here.
- **state_time_configuration**: Version increments even with all None. Changes trade interval/reserve/risk and withdraw intervals but not roles, pause, sweep caps or deployed counters.
- **errors_order_rollback**: Fixed slice unwraps are in-bounds; overflow maps MathOverflow; event ABI remains candidate serialization rather than historical type identity.

Unclosed: Semantic policy for opaque fields and allowed intervals unproved; negative reinterpretations can disable intended delay. Exact event CPI generator, serialization ABI and historical dependency revision remain unproved.

### withdraw_admin

[programs/mayhem/src/lib.rs:60-78](evidence/programs/mayhem/src/lib.rs#L60).

- **authorization_accounts**: Mutable stored admin signer; canonical mutable global and sol-vault PDAs. Vault has no local owner/data-length check; System transfer must enforce spending semantics. Destination cannot be caller-selected independently of admin. No dynamic accounts, token assets or explicit rent floor.
- **dynamic_accounts_layout**: Reads reset_middle[1..9] last and [17..25] interval as i64; amount u64.
- **cpi_events**: System transfer from sol-vault to admin signed by [sol-vault,canonical bump]; target checked System.
- **arithmetic**: last+interval plain signed addition can panic under release overflow checks; no explicit rent-floor/balance subtraction in Mayhem.
- **lifecycle_rent**: Updates last even for zero amount before CPI; insufficient balance/non-system vault failure relies on atomic rollback. Entire usable vault balance can be withdrawn.
- **token_assets**: Native lamports only; no fee.
- **state_time_configuration**: Gate bypassed if last==0 or interval==0. Negative configured interval can weaken delay. Pause ignored; does not reconcile deployed counters.
- **errors_order_rollback**: No event. Rate rejection before timestamp write; CPI errors propagated after write. Saved cases distinguish role rejection, overflow, accepted negative interval.

Unclosed: Reachable production interval/counter states and exact System runtime semantics not established.

### withdraw_quote_admin

[programs/mayhem/src/lib.rs:44-59](evidence/programs/mayhem/src/lib.rs#L44).

- **authorization_accounts**: Stored admin signer; mutable canonical global and sol-vault. Typed quote mint and vault ATA linked to mint/vault/selected token program; admin ATA initialized if needed using admin rent. TokenInterface accepts either family at the declaration level, whereas handler uses legacy token::transfer. No extension accounts or transfer_checked decimals supplied. Saved Token2022 cases reject; this is not broad Token2022 support.
- **dynamic_accounts_layout**: reset_stable_suffix[16..24] last, [8..16] interval. One shared last across all quote mints.
- **cpi_events**: Legacy token::transfer using supplied TokenInterface key, vault PDA authority, no mint/decimals/hook accounts.
- **arithmetic**: Same signed addition hazard; amount passed directly with no local cap/fee adjustment.
- **lifecycle_rent**: ATA init_if_needed may charge admin rent before rate guard; failure should roll back. Zero transfer can update global quote last.
- **token_assets**: Declaration admits Token2022; saved token2022 ordinary case 56 fails MissingAccount. No assertion of extension compatibility.
- **state_time_configuration**: Pause ignored; no quote allowlist; shared timestamp may throttle otherwise unrelated quote withdrawals.
- **errors_order_rollback**: No event; timestamp written before transfer. Saved legacy missing-admin-ATA case 6 succeeds; wrong admin case1 rejects.

Unclosed: Need matching retained anchor-spl transfer implementation to prove precise program-ID handling; no external runtime probe permitted. External token-extension semantics remain unproved.

### extend_account

[programs/mayhem/src/lib.rs:79-116](evidence/programs/mayhem/src/lib.rs#L79).

- **authorization_accounts**: Any signer may extend a mutable Mayhem-owned account with one of three recognized discriminators. No role, canonical account seed or full state decoder check. User lacks outer mut constraint; funding CPI requires writable payer only when top-up is positive. Event authority is seeded; program unchecked. Growth-only bounded targets prevent arbitrary allocation or shrink.
- **dynamic_accounts_layout**: Discriminator-only dispatch to sizes 318(global),74(recipient),170(state). Reads first8 with get; shorter rejects; no full decode.
- **cpi_events**: Only positive rent deficit triggers System transfer; event emit + self-CPI after resize.
- **arithmetic**: Rent.minimum_balance(target).saturating_sub(lamports) prevents deficit underflow; no growth beyond fixed targets.
- **lifecycle_rent**: If already target/larger returns success with no event and no rent top-up. Shrink absent; growth resize contract zero-fill unproved from retained runtime source.
- **token_assets**: No token asset operation.
- **state_time_configuration**: Permissionless extension; does not migrate logical fields or increment version. Trailing space is not a new state codec.
- **errors_order_rollback**: Owned account validation precedes handler; readonly user is accepted if funded already, fails PrivilegeEscalation on top-up (saved34/35).

Unclosed: Retain resize/runtime source and full generated Accounts constraints to prove zero-fill and duplicate behavior; no new build/probe.

### sweep_fees

[programs/mayhem/src/lib.rs:35-39](evidence/programs/mayhem/src/lib.rs#L35).

- **authorization_accounts**: Stored trader signer on global PDA, canonical trader quote ATA, typed mint, fixed legacy Token program and ATA program. Event PDA constrained; event program unchecked. Exactly 16 remaining accounts consumed as eight recipient/token pairs by helper. No pause or time gate here; cap is per invocation.
- **dynamic_accounts_layout**: Exactly16 remaining accounts. Eight typed FeeRecipient/TokenAccount pairs; NO uniqueness/order/index<8/recipient PDA/ATA relationship check before helper use.
- **cpi_events**: Token transfer uses stored recipient index+bump seeds only when token_amount>0. Native lamports move directly from program-owned recipient to role signer. Emit SweepEvent after loop.
- **arithmetic**: Total starts0; each amount=min(available,cap-total) preserves total<=cap when subtraction valid. Rent subtraction and cumulative counter/destination additions are unchecked; previous+total-before_total may overflow intermediate. Configured max_sol_per_sweep or max_stable_per_sweep.
- **lifecycle_rent**: Keeps recipient data_len rent floor if initially funded; underfunded native recipient can panic. Never closes ATA/recipient. Explicit recipient.exit each pair means aliases observe serialized prior updates.
- **token_assets**: Fixed legacy token target; nonzero transfer enforces mint/authority in callee. Zero token branch does not validate stored signer seeds or token mint relationship. WSOL tokens + native lamports counted together.
- **state_time_configuration**: No pause/rate test; trader updates per-recipient timestamp, admin does not. Per-call cap can be used repeatedly by authorized signer. Order determines which recipient is drained first.
- **errors_order_rollback**: Errors after prior transfers/exit need whole transaction rollback; saved duplicate pairs succeed, wrong bump/index succeed with zero tokens and reject at nonzero transfer. Event total is transferred raw units, not fee percentage.

Unclosed: Recipient creation/reachability outside reviewed source remains unproved; missing PDA checks alone do not establish arbitrary attacker-owned recipient. Prove reachable cumulative counter/rent bounds before classifying overflow as a vulnerability. Token CPI, Accounts exit and event macro exact semantics remain dependency-bound.

### sweep_fees_admin

[programs/mayhem/src/lib.rs:40-43](evidence/programs/mayhem/src/lib.rs#L40).

- **authorization_accounts**: Stored admin signer and canonical global PDA/admin quote ATA with legacy Token program. Same pair parser as trader sweep; amount cap deliberately u64::MAX and recipient timestamps not updated. No pause or rate guard; remaining account owner/discriminator checks are in helper.
- **dynamic_accounts_layout**: Exactly16 remaining accounts. Eight typed FeeRecipient/TokenAccount pairs; NO uniqueness/order/index<8/recipient PDA/ATA relationship check before helper use.
- **cpi_events**: Token transfer uses stored recipient index+bump seeds only when token_amount>0. Native lamports move directly from program-owned recipient to role signer. Emit SweepEvent after loop.
- **arithmetic**: Total starts0; each amount=min(available,cap-total) preserves total<=cap when subtraction valid. Rent subtraction and cumulative counter/destination additions are unchecked; previous+total-before_total may overflow intermediate. u64::MAX independent of configured cap.
- **lifecycle_rent**: Keeps recipient data_len rent floor if initially funded; underfunded native recipient can panic. Never closes ATA/recipient. Explicit recipient.exit each pair means aliases observe serialized prior updates.
- **token_assets**: Fixed legacy token target; nonzero transfer enforces mint/authority in callee. Zero token branch does not validate stored signer seeds or token mint relationship. WSOL tokens + native lamports counted together.
- **state_time_configuration**: No pause/rate test; trader updates per-recipient timestamp, admin does not. Per-call cap can be used repeatedly by authorized signer. Order determines which recipient is drained first.
- **errors_order_rollback**: Errors after prior transfers/exit need whole transaction rollback; saved duplicate pairs succeed, wrong bump/index succeed with zero tokens and reject at nonzero transfer. Event total is transferred raw units, not fee percentage.

Unclosed: Recipient creation/reachability outside reviewed source remains unproved; missing PDA checks alone do not establish arbitrary attacker-owned recipient. Prove reachable cumulative counter/rent bounds before classifying overflow as a vulnerability. Token CPI, Accounts exit and event macro exact semantics remain dependency-bound.

### burn_tokens

[programs/mayhem/src/lib.rs:32-34](evidence/programs/mayhem/src/lib.rs#L32).

- **authorization_accounts**: Permissionless; mutable canonical mayhem-state(mint), sol-vault, mint and vault ATA. Vault ATA uses mint owner as token program. External curve is Pump-owned/discriminated with Pump bonding-curve PDA and mutability, despite being unused in body. Pump ID fixed but global/event inputs unchecked and unused. TokenInterface enforces allowed ID family, no explicit equality with mint.owner; burn CPI must reject incompatible inputs. No global pause/admin/trader required.
- **dynamic_accounts_layout**: Typed MayhemState bool/status discriminate variants; strict external BondingCurve codec differs from padded trade decoder. No remaining accounts.
- **cpi_events**: Burn entire vault amount via token_interface burn signed by sol-vault; no actual Pump CPI despite Pump accounts. Emit BurnEvent in log and self-CPI.
- **arithmetic**: Amount is existing u64 vault balance, no computed fee. Assign burned_amount (not accumulate).
- **lifecycle_rent**: Permissionless after deadline; status!=Ended blocks second burn. No close or rent reclamation.
- **token_assets**: Mint/vault links declared; token program family accepted, exact mint-owner/program compatibility delegated. All token extensions unproved.
- **state_time_configuration**: Burn ignores pause; requires end<=Clock and not Ended. Sets Ended only after events. Stored state.mint not independently compared to supplied mint.
- **errors_order_rollback**: Clock unwrap may panic; token/event failure before Ended relies on rollback. Burned amount recorded before event; saved burn verification is metadata only here.

Unclosed: Initializer excluded: legal state origins/status/end-time and state.mint invariant cannot be closed. Retain matching token burn/event dependency source for extension and event behavior.

### buy

[programs/mayhem/src/lib.rs:28-28](evidence/programs/mayhem/src/lib.rs#L28) → [programs/mayhem/src/instructions/buy.rs:53-101](evidence/programs/mayhem/src/instructions/buy.rs#L53).

- **authorization_accounts**: Configured mutable trader signer, canonical mutable global/mayhem-state(mint)/sol-vault; vault and curve ATAs tied to mint owner, curve typed Pump-owned with external PDA. Fixed executable Token2022 and self-program; checked System. Pump address fixed. global, fee recipient, creator vault, Pump event authority, fee config/program, volume accumulators and buyback recipient rely on Pump CPI; mutable flags explicitly forwarded. bonding-curve-v2 is derived under Mayhem, not Pump, and readonly. State.mint equality is not separately checked; creation invariant is unproved.
- **dynamic_accounts_layout**: SellCurve copies min(len,141) into zero padding, checks discriminator and five bool offsets, reads four u64 reserve fields. No remaining accounts forwarded; fixed CPI vector and explicit writable map. 
- **cpi_events**: Pump fixed ID; PDA signer only index6 in 18 accounts. Buy discriminator + LE(input,maximum_quote)+zero volume flag. Seed [sol-vault,bump]. See exact CPI source span.
- **arithmetic**: vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs+output)) capped to real token reserve. Buy also has 0/0 if vs==output==0. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Positive deployment checked by strict limit>low-u64(counter), not full i128.
- **lifecycle_rent**: No outer allocation/closure; callee may allocate external accounts. All pre-CPI timestamp/status changes and post-CPI risk failures rely on atomic rollback.
- **token_assets**: Native SOL balance + Token2022 base vault; no explicit local fee calculation. Fee calculation/authority validation delegated to Pump. Fees included in measured balance deltas if CPI behaves as assumed; transfer-fee/hook/withheld extensions not established.
- **state_time_configuration**: Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Buy adds actual spend to global and field_56 and subtracts tokens from field_72; strict post-CPI risk limits.
- **errors_order_rollback**: CPI failures mapped to PumpCpiFailed(6008). Reloads changed token balances and curve before event. Event side 0 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original.

Unclosed: Pump/AMM downstream account and fee invariants are not proved by local constraints; excluded Pump sell_v2 body not inspected. Retain matching external dependency source/identity and supported mint/configuration lifecycle before security closure. Counters above u64, signed intervals, quote-switching and rent/prebalance states require reachability evidence; no exploit or loss established. Original ABI/error layout and historical field identities remain unresolved; fixed source spans are candidate identities only.

CPI vector ([programs/mayhem/src/instructions/buy.rs:84-89](evidence/programs/mayhem/src/instructions/buy.rs#L84)); each index is zero-based. Signer added locally only for sol-vault; AMM trailing accounts preserve already granted outer privileges:

| Index | Account | Writable | Signer |
| --- | --- | --- | --- |
| 0 | global | False | False |
| 1 | fee_recipient | True | False |
| 2 | mint | False | False |
| 3 | bonding_curve | True | False |
| 4 | associated_bonding_curve | True | False |
| 5 | mayhem_token_vault | True | False |
| 6 | sol_vault | True | True |
| 7 | system_program | False | False |
| 8 | token_program | False | False |
| 9 | creator_vault | True | False |
| 10 | pump_event_authority | False | False |
| 11 | pump_program | False | False |
| 12 | global_volume_accumulator | True | False |
| 13 | user_volume_accumulator | True | False |
| 14 | fee_config | False | False |
| 15 | fee_program | False | False |
| 16 | bonding_curve_v2 | False | False |
| 17 | buyback_recipient | True | False |

### sell

[programs/mayhem/src/lib.rs:29-31](evidence/programs/mayhem/src/lib.rs#L29) → [programs/mayhem/src/instructions/sell.rs:67-109](evidence/programs/mayhem/src/instructions/sell.rs#L67).

- **authorization_accounts**: Same configured trader/global/state/vault controls as LegacyBuy, with sol-vault earlier in outer order. Typed external curve PDA and both ATAs constrained. Token2022/self/System identities enforced. Fee/config/creator/global/event/buyback relationships delegated to Pump; no volume accounts in this CPI. Mayhem-derived readonly bonding-curve-v2 is passed through. No remaining accounts consumed.
- **dynamic_accounts_layout**: SellCurve copies min(len,141) into zero padding, checks discriminator and five bool offsets, reads four u64 reserve fields. No remaining accounts forwarded; fixed CPI vector and explicit writable map. 
- **cpi_events**: Pump fixed ID; PDA signer only index6 in 16 accounts. Sell discriminator + LE(input,output.saturating_sub(1)). Seed [sol-vault,bump]. See exact CPI source span.
- **arithmetic**: vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs-output)); with vt>0 and vs>0 the first output is strictly <vs, so denominator positive under valid retained<=10000; vs==0 gives 0/0 panic. Buy also has 0/0 if vs==output==0. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Sell decreases deployed and increases net-token counter; negative deployed is allowed; no buy-style risk cap.
- **lifecycle_rent**: No outer allocation/closure; callee may allocate external accounts. All pre-CPI timestamp/status changes and post-CPI risk failures rely on atomic rollback.
- **token_assets**: Native SOL balance + Token2022 base vault; no explicit local fee calculation. Fee calculation/authority validation delegated to Pump. Fees included in measured balance deltas if CPI behaves as assumed; transfer-fee/hook/withheld extensions not established.
- **state_time_configuration**: Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Sell subtracts actual receipt from global and field_56; adds spent tokens to field_72.
- **errors_order_rollback**: Legacy sell propagates raw Pump CPI error. Reloads changed token balances and curve before event. Event side 1 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original.

Unclosed: Pump/AMM downstream account and fee invariants are not proved by local constraints; excluded Pump sell_v2 body not inspected. Retain matching external dependency source/identity and supported mint/configuration lifecycle before security closure. Counters above u64, signed intervals, quote-switching and rent/prebalance states require reachability evidence; no exploit or loss established. Original ABI/error layout and historical field identities remain unresolved; fixed source spans are candidate identities only.

CPI vector ([programs/mayhem/src/instructions/sell.rs:96-101](evidence/programs/mayhem/src/instructions/sell.rs#L96)); each index is zero-based. Signer added locally only for sol-vault; AMM trailing accounts preserve already granted outer privileges:

| Index | Account | Writable | Signer |
| --- | --- | --- | --- |
| 0 | global | False | False |
| 1 | fee_recipient | True | False |
| 2 | mint | False | False |
| 3 | bonding_curve | True | False |
| 4 | associated_bonding_curve | True | False |
| 5 | mayhem_token_vault | True | False |
| 6 | sol_vault | True | True |
| 7 | system_program | False | False |
| 8 | creator_vault | True | False |
| 9 | token_program | False | False |
| 10 | pump_event_authority | False | False |
| 11 | pump_program | False | False |
| 12 | fee_config | False | False |
| 13 | fee_program | False | False |
| 14 | bonding_curve_v2 | False | False |
| 15 | buyback_recipient | True | False |

### buy_v2

[programs/mayhem/src/lib.rs:26-26](evidence/programs/mayhem/src/lib.rs#L26) → [programs/mayhem/src/instructions/buy_v2.rs:69-118](evidence/programs/mayhem/src/instructions/buy_v2.rs#L69).

- **authorization_accounts**: Configured trader and canonical global/state/vault; typed base mint and base ATAs. Quote mint is unchecked; quote vault ATA uses quote account owner for derivation, but selected quote TokenInterface is not locally compared to that owner. Pump curve owner/PDA verified. Creator/fee/buyback/volume quote ATAs, sharing config, fee program and external globals are unchecked and depend on Pump. Global volume is readonly; user volume and its ATA mutable. Token2022 base and self/System/ATA program identities constrained.
- **dynamic_accounts_layout**: SellCurve copies min(len,141) into zero padding, checks discriminator and five bool offsets, reads four u64 reserve fields. No remaining accounts forwarded; fixed CPI vector and explicit writable map. 
- **cpi_events**: Pump fixed ID; PDA signer only index13 in 27 accounts. Buy discriminator + LE(input,maximum_quote)+zero volume flag. Seed [sol-vault,bump]. See exact CPI source span.
- **arithmetic**: vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs+output)) capped to real token reserve. Buy also has 0/0 if vs==output==0. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Positive deployment checked by strict limit>low-u64(counter), not full i128.
- **lifecycle_rent**: No outer allocation/closure; callee may allocate external accounts. All pre-CPI timestamp/status changes and post-CPI risk failures rely on atomic rollback.
- **token_assets**: Native WSOL key reads sol-vault lamports, nonnative reads/reloads quote token vault. Default key uses native accounting but nonnative balance branch; reachability not established. Shared stable counter uses raw units across quotes. Fee calculation/authority validation delegated to Pump. Fees included in measured balance deltas if CPI behaves as assumed; transfer-fee/hook/withheld extensions not established.
- **state_time_configuration**: Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Buy adds actual spend to global and field_56 and subtracts tokens from field_72; strict post-CPI risk limits.
- **errors_order_rollback**: CPI failures mapped to PumpCpiFailed(6008). Reloads changed token balances and curve before event. Event side 0 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original.

Unclosed: Pump/AMM downstream account and fee invariants are not proved by local constraints; excluded Pump sell_v2 body not inspected. Retain matching external dependency source/identity and supported mint/configuration lifecycle before security closure. Counters above u64, signed intervals, quote-switching and rent/prebalance states require reachability evidence; no exploit or loss established. Original ABI/error layout and historical field identities remain unresolved; fixed source spans are candidate identities only.

CPI vector ([programs/mayhem/src/instructions/buy_v2.rs:99-104](evidence/programs/mayhem/src/instructions/buy_v2.rs#L99)); each index is zero-based. Signer added locally only for sol-vault; AMM trailing accounts preserve already granted outer privileges:

| Index | Account | Writable | Signer |
| --- | --- | --- | --- |
| 0 | global | False | False |
| 1 | mint | False | False |
| 2 | quote_mint | False | False |
| 3 | token_program | False | False |
| 4 | quote_token_program | False | False |
| 5 | associated_token_program | False | False |
| 6 | fee_recipient | True | False |
| 7 | fee_recipient_ata | True | False |
| 8 | buyback_recipient | True | False |
| 9 | buyback_recipient_ata | True | False |
| 10 | bonding_curve | True | False |
| 11 | associated_base_bonding_curve | True | False |
| 12 | associated_quote_bonding_curve | True | False |
| 13 | sol_vault | True | True |
| 14 | mayhem_base_token_vault | True | False |
| 15 | mayhem_quote_token_vault | True | False |
| 16 | creator_vault | True | False |
| 17 | associated_creator_vault | True | False |
| 18 | sharing_config | False | False |
| 19 | global_volume_accumulator | False | False |
| 20 | user_volume_accumulator | True | False |
| 21 | associated_user_volume_accumulator | True | False |
| 22 | fee_config | False | False |
| 23 | fee_program | False | False |
| 24 | system_program | False | False |
| 25 | pump_event_authority | False | False |
| 26 | pump_program | False | False |

### sell_v2

[programs/mayhem/src/lib.rs:27-27](evidence/programs/mayhem/src/lib.rs#L27) → [programs/mayhem/src/instructions/sell_v2.rs:67-112](evidence/programs/mayhem/src/instructions/sell_v2.rs#L67).

- **authorization_accounts**: Same base/quote ATA and canonical signer/PDA controls as BuyV2. Quote mint unchecked; downstream Pump must link quote program/mint and all external fee/creator/sharing/buyback/volume accounts. Omits global-volume account; includes mutable user-volume/ATA. Self program fixed; Pump address fixed; no optional remaining accounts forwarded. External Pump sell_v2 implementation is excluded from this review.
- **dynamic_accounts_layout**: SellCurve copies min(len,141) into zero padding, checks discriminator and five bool offsets, reads four u64 reserve fields. No remaining accounts forwarded; fixed CPI vector and explicit writable map. 
- **cpi_events**: Pump fixed ID; PDA signer only index13 in 26 accounts. Sell discriminator + LE(input,output.saturating_sub(1)). Seed [sol-vault,bump]. See exact CPI source span.
- **arithmetic**: vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs-output)); with vt>0 and vs>0 the first output is strictly <vs, so denominator positive under valid retained<=10000; vs==0 gives 0/0 panic. Buy also has 0/0 if vs==output==0. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Sell decreases deployed and increases net-token counter; negative deployed is allowed; no buy-style risk cap.
- **lifecycle_rent**: No outer allocation/closure; callee may allocate external accounts. All pre-CPI timestamp/status changes and post-CPI risk failures rely on atomic rollback.
- **token_assets**: Native WSOL key reads sol-vault lamports, nonnative reads/reloads quote token vault. Default key uses native accounting but nonnative balance branch; reachability not established. Shared stable counter uses raw units across quotes. Fee calculation/authority validation delegated to Pump. Fees included in measured balance deltas if CPI behaves as assumed; transfer-fee/hook/withheld extensions not established.
- **state_time_configuration**: Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Sell subtracts actual receipt from global and field_56; adds spent tokens to field_72.
- **errors_order_rollback**: CPI failures mapped to PumpCpiFailed(6008). Reloads changed token balances and curve before event. Event side 1 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original.

Unclosed: Pump/AMM downstream account and fee invariants are not proved by local constraints; excluded Pump sell_v2 body not inspected. Retain matching external dependency source/identity and supported mint/configuration lifecycle before security closure. Counters above u64, signed intervals, quote-switching and rent/prebalance states require reachability evidence; no exploit or loss established. Original ABI/error layout and historical field identities remain unresolved; fixed source spans are candidate identities only.

CPI vector ([programs/mayhem/src/instructions/sell_v2.rs:98-103](evidence/programs/mayhem/src/instructions/sell_v2.rs#L98)); each index is zero-based. Signer added locally only for sol-vault; AMM trailing accounts preserve already granted outer privileges:

| Index | Account | Writable | Signer |
| --- | --- | --- | --- |
| 0 | global | False | False |
| 1 | mint | False | False |
| 2 | quote_mint | False | False |
| 3 | token_program | False | False |
| 4 | quote_token_program | False | False |
| 5 | associated_token_program | False | False |
| 6 | fee_recipient | True | False |
| 7 | fee_recipient_ata | True | False |
| 8 | buyback_recipient | True | False |
| 9 | buyback_recipient_ata | True | False |
| 10 | bonding_curve | True | False |
| 11 | associated_base_bonding_curve | True | False |
| 12 | associated_quote_bonding_curve | True | False |
| 13 | sol_vault | True | True |
| 14 | mayhem_base_token_vault | True | False |
| 15 | mayhem_quote_token_vault | True | False |
| 16 | creator_vault | True | False |
| 17 | associated_creator_vault | True | False |
| 18 | sharing_config | False | False |
| 19 | user_volume_accumulator | True | False |
| 20 | associated_user_volume_accumulator | True | False |
| 21 | fee_config | False | False |
| 22 | fee_program | False | False |
| 23 | system_program | False | False |
| 24 | pump_event_authority | False | False |
| 25 | pump_program | False | False |

### buy_pump_swap

[programs/mayhem/src/lib.rs:24-24](evidence/programs/mayhem/src/lib.rs#L24) → [programs/mayhem/src/instructions/buy_pump_swap.rs:73-129](evidence/programs/mayhem/src/instructions/buy_pump_swap.rs#L73).

- **authorization_accounts**: Configured trader and global/state/vault PDAs; base ATA linked to mint.owner; quote ATA init_if_needed with trader rent. Base program fixed Token2022, quote program fixed Tokenkeg. Pool is AMM-owned/discriminated mutable but lacks local seeds/has_one; global config also only typed. Pool token accounts are typed/mutable without local mint/authority/address linkage. Protocol/creator quote ATAs are constrained to supplied authorities; authority legitimacy, fee config/program, volume and buyback rely on AMM. pool-v2 is Mayhem-derived and parsed but not passed to AMM. Last two CPI accounts preserve outer privilege flags.
- **dynamic_accounts_layout**: Pool padded to287, GlobalConfig strict418-prefix; pool token balances + signed virtual quote used for sizing. No remaining accounts forwarded; fixed CPI vector and explicit writable map. 
- **cpi_events**: AMM fixed ID; PDA signer only index1 in 25 accounts. Final two accounts retain outer flags; pool_v2 omitted. Buy discriminator + LE(input,maximum_quote)+zero volume flag. Seed [sol-vault,bump]. See exact CPI source span.
- **arithmetic**: vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs+output)). Buy also has 0/0 if vs==output==0. Effective quote checked i128 sum then checked u64 conversion prevents negative/out-of-range virtual reserve use. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Positive deployment checked by strict limit>low-u64(counter), not full i128.
- **lifecycle_rent**: Quote ATA may be created at trader expense. Native buy transfers budget, SyncNative(17), AMM call, CloseAccount(9). Closure returns all quote-vault lamports, including preexisting WSOL and rent, to sol-vault; actual balance delta includes these. Small native buys may underflow spent delta. All pre-CPI timestamp/status changes and post-CPI risk failures rely on atomic rollback.
- **token_assets**: Native WSOL key reads sol-vault lamports, nonnative reads/reloads quote token vault. Default key uses native accounting but nonnative balance branch; reachability not established. Shared stable counter uses raw units across quotes. Quote target fixed Tokenkeg; base Token2022. Fees included in measured balance deltas if CPI behaves as assumed; transfer-fee/hook/withheld extensions not established.
- **state_time_configuration**: Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Buy adds actual spend to global and field_56 and subtracts tokens from field_72; strict post-CPI risk limits.
- **errors_order_rollback**: CPI failures mapped to PumpSwapCpiFailed(6010). Reloads changed token balances and pool token accounts (pool itself not reloaded) before event. Event side 0 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original.

Unclosed: Pump/AMM downstream account and fee invariants are not proved by local constraints; excluded Pump sell_v2 body not inspected. Retain matching external dependency source/identity and supported mint/configuration lifecycle before security closure. Counters above u64, signed intervals, quote-switching and rent/prebalance states require reachability evidence; no exploit or loss established. Original ABI/error layout and historical field identities remain unresolved; fixed source spans are candidate identities only.

CPI vector ([programs/mayhem/src/instructions/buy_pump_swap.rs:110-115](evidence/programs/mayhem/src/instructions/buy_pump_swap.rs#L110)); each index is zero-based. Signer added locally only for sol-vault; AMM trailing accounts preserve already granted outer privileges:

| Index | Account | Writable | Signer |
| --- | --- | --- | --- |
| 0 | pool | True | False |
| 1 | sol_vault | True | True |
| 2 | global_config | False | False |
| 3 | mint | False | False |
| 4 | quote_mint | False | False |
| 5 | mayhem_token_vault | True | False |
| 6 | mayhem_quote_vault | True | False |
| 7 | pool_base_token_account | True | False |
| 8 | pool_quote_token_account | True | False |
| 9 | protocol_fee_recipient | False | False |
| 10 | protocol_fee_recipient_token_account | True | False |
| 11 | base_token_program | False | False |
| 12 | quote_token_program | False | False |
| 13 | system_program | False | False |
| 14 | associated_token_program | False | False |
| 15 | pump_swap_event_authority | False | False |
| 16 | pump_swap_program | False | False |
| 17 | coin_creator_vault_ata | True | False |
| 18 | coin_creator_vault_authority | False | False |
| 19 | global_volume_accumulator | True | False |
| 20 | user_volume_accumulator | True | False |
| 21 | fee_config | False | False |
| 22 | fee_program | False | False |
| 23 | buyback_recipient | outer is_writable | outer is_signer |
| 24 | buyback_recipient_ata | outer is_writable | outer is_signer |

### sell_pump_swap

[programs/mayhem/src/lib.rs:25-25](evidence/programs/mayhem/src/lib.rs#L25) → [programs/mayhem/src/instructions/sell_pump_swap.rs:69-115](evidence/programs/mayhem/src/instructions/sell_pump_swap.rs#L69).

- **authorization_accounts**: Same local AMM pool/global/token relationship gaps and canonical Mayhem signer/PDA controls as BuyPumpSwap. Quote ATA can be created at trader expense. No volume accounts. Protocol recipient outer mutable but CPI readonly; buyback recipient/ATA use outer flags. Mayhem-derived pool-v2 is validated but unused by body/CPI. Fixed Tokenkeg quote means Token2022 quotes are not supported.
- **dynamic_accounts_layout**: Pool padded to287, GlobalConfig strict418-prefix; pool token balances + signed virtual quote used for sizing. No remaining accounts forwarded; fixed CPI vector and explicit writable map. 
- **cpi_events**: AMM fixed ID; PDA signer only index1 in 23 accounts. Final two accounts retain outer flags; pool_v2 omitted. Sell discriminator + LE(input,output.saturating_sub(1)). Seed [sol-vault,bump]. See exact CPI source span.
- **arithmetic**: vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs-output)); with vt>0 and vs>0 the first output is strictly <vs, so denominator positive under valid retained<=10000; vs==0 gives 0/0 panic. Buy also has 0/0 if vs==output==0. Effective quote checked i128 sum then checked u64 conversion prevents negative/out-of-range virtual reserve use. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Sell decreases deployed and increases net-token counter; negative deployed is allowed; no buy-style risk cap.
- **lifecycle_rent**: Quote ATA may be created at trader expense. Native sell AMM call then CloseAccount(9). Closure returns all quote-vault lamports, including preexisting WSOL and rent, to sol-vault; actual balance delta includes these. Small native buys may underflow spent delta. All pre-CPI timestamp/status changes and post-CPI risk failures rely on atomic rollback.
- **token_assets**: Native WSOL key reads sol-vault lamports, nonnative reads/reloads quote token vault. Default key uses native accounting but nonnative balance branch; reachability not established. Shared stable counter uses raw units across quotes. Quote target fixed Tokenkeg; base Token2022. Fees included in measured balance deltas if CPI behaves as assumed; transfer-fee/hook/withheld extensions not established.
- **state_time_configuration**: Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Sell subtracts actual receipt from global and field_56; adds spent tokens to field_72.
- **errors_order_rollback**: CPI failures mapped to PumpSwapCpiFailed(6010). Reloads changed token balances and pool token accounts (pool itself not reloaded) before event. Event side 1 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original.

Unclosed: Pump/AMM downstream account and fee invariants are not proved by local constraints; excluded Pump sell_v2 body not inspected. Retain matching external dependency source/identity and supported mint/configuration lifecycle before security closure. Counters above u64, signed intervals, quote-switching and rent/prebalance states require reachability evidence; no exploit or loss established. Original ABI/error layout and historical field identities remain unresolved; fixed source spans are candidate identities only.

CPI vector ([programs/mayhem/src/instructions/sell_pump_swap.rs:101-106](evidence/programs/mayhem/src/instructions/sell_pump_swap.rs#L101)); each index is zero-based. Signer added locally only for sol-vault; AMM trailing accounts preserve already granted outer privileges:

| Index | Account | Writable | Signer |
| --- | --- | --- | --- |
| 0 | pool | True | False |
| 1 | sol_vault | True | True |
| 2 | global_config | False | False |
| 3 | mint | False | False |
| 4 | quote_mint | False | False |
| 5 | mayhem_token_vault | True | False |
| 6 | mayhem_quote_vault | True | False |
| 7 | pool_base_token_account | True | False |
| 8 | pool_quote_token_account | True | False |
| 9 | protocol_fee_recipient | False | False |
| 10 | protocol_fee_recipient_token_account | True | False |
| 11 | base_token_program | False | False |
| 12 | quote_token_program | False | False |
| 13 | system_program | False | False |
| 14 | associated_token_program | False | False |
| 15 | pump_swap_event_authority | False | False |
| 16 | pump_swap_program | False | False |
| 17 | coin_creator_vault_ata | True | False |
| 18 | coin_creator_vault_authority | False | False |
| 19 | fee_config | False | False |
| 20 | fee_program | False | False |
| 21 | buyback_recipient | outer is_writable | outer is_signer |
| 22 | buyback_recipient_ata | outer is_writable | outer is_signer |

## Accounts and dynamic accounts

Each declared account field has its own exact range in result.json; the following conclusions cover every context. Remaining sweep pairs are covered by sweep_remaining and both sweep handler entries. No other included body consumes remaining_accounts.

- **BurnTokens** ([programs/mayhem/src/instructions/burn.rs:7-36](evidence/programs/mayhem/src/instructions/burn.rs#L7)): Permissionless; mutable canonical mayhem-state(mint), sol-vault, mint and vault ATA. Vault ATA uses mint owner as token program. External curve is Pump-owned/discriminated with Pump bonding-curve PDA and mutability, despite being unused in body. Pump ID fixed but global/event inputs unchecked and unused. TokenInterface enforces allowed ID family, no explicit equality with mint.owner; burn CPI must reject incompatible inputs. No global pause/admin/trader required.
- **LegacyBuy** ([programs/mayhem/src/instructions/buy.rs:14-51](evidence/programs/mayhem/src/instructions/buy.rs#L14)): Configured mutable trader signer, canonical mutable global/mayhem-state(mint)/sol-vault; vault and curve ATAs tied to mint owner, curve typed Pump-owned with external PDA. Fixed executable Token2022 and self-program; checked System. Pump address fixed. global, fee recipient, creator vault, Pump event authority, fee config/program, volume accumulators and buyback recipient rely on Pump CPI; mutable flags explicitly forwarded. bonding-curve-v2 is derived under Mayhem, not Pump, and readonly. State.mint equality is not separately checked; creation invariant is unproved.
- **BuyPumpSwap** ([programs/mayhem/src/instructions/buy_pump_swap.rs:18-70](evidence/programs/mayhem/src/instructions/buy_pump_swap.rs#L18)): Configured trader and global/state/vault PDAs; base ATA linked to mint.owner; quote ATA init_if_needed with trader rent. Base program fixed Token2022, quote program fixed Tokenkeg. Pool is AMM-owned/discriminated mutable but lacks local seeds/has_one; global config also only typed. Pool token accounts are typed/mutable without local mint/authority/address linkage. Protocol/creator quote ATAs are constrained to supplied authorities; authority legitimacy, fee config/program, volume and buyback rely on AMM. pool-v2 is Mayhem-derived and parsed but not passed to AMM. Last two CPI accounts preserve outer privilege flags.
- **BuyV2** ([programs/mayhem/src/instructions/buy_v2.rs:15-67](evidence/programs/mayhem/src/instructions/buy_v2.rs#L15)): Configured trader and canonical global/state/vault; typed base mint and base ATAs. Quote mint is unchecked; quote vault ATA uses quote account owner for derivation, but selected quote TokenInterface is not locally compared to that owner. Pump curve owner/PDA verified. Creator/fee/buyback/volume quote ATAs, sharing config, fee program and external globals are unchecked and depend on Pump. Global volume is readonly; user volume and its ATA mutable. Token2022 base and self/System/ATA program identities constrained.
- **LegacySell** ([programs/mayhem/src/instructions/sell.rs:11-44](evidence/programs/mayhem/src/instructions/sell.rs#L11)): Same configured trader/global/state/vault controls as LegacyBuy, with sol-vault earlier in outer order. Typed external curve PDA and both ATAs constrained. Token2022/self/System identities enforced. Fee/config/creator/global/event/buyback relationships delegated to Pump; no volume accounts in this CPI. Mayhem-derived readonly bonding-curve-v2 is passed through. No remaining accounts consumed.
- **SellPumpSwap** ([programs/mayhem/src/instructions/sell_pump_swap.rs:18-66](evidence/programs/mayhem/src/instructions/sell_pump_swap.rs#L18)): Same local AMM pool/global/token relationship gaps and canonical Mayhem signer/PDA controls as BuyPumpSwap. Quote ATA can be created at trader expense. No volume accounts. Protocol recipient outer mutable but CPI readonly; buyback recipient/ATA use outer flags. Mayhem-derived pool-v2 is validated but unused by body/CPI. Fixed Tokenkeg quote means Token2022 quotes are not supported.
- **SellV2** ([programs/mayhem/src/instructions/sell_v2.rs:15-65](evidence/programs/mayhem/src/instructions/sell_v2.rs#L15)): Same base/quote ATA and canonical signer/PDA controls as BuyV2. Quote mint unchecked; downstream Pump must link quote program/mint and all external fee/creator/sharing/buyback/volume accounts. Omits global-volume account; includes mutable user-volume/ATA. Self program fixed; Pump address fixed; no optional remaining accounts forwarded. External Pump sell_v2 implementation is excluded from this review.
- **Admin** ([programs/mayhem/src/lib.rs:218-229](evidence/programs/mayhem/src/lib.rs#L218)): Mutable signer must equal stored admin on the canonical global-params PDA. Typed state supplies owner/discriminator decoding; checked System ID is explicit. Event PDA is constrained, but program is unchecked. No remaining account consumption. This is a single-step fully privileged admin, not a pending/accept authority transfer.
- **InitializeGlobalParams** ([programs/mayhem/src/lib.rs:313-319](evidence/programs/mayhem/src/lib.rs#L313)): Any mutable signer can pay to initialize the single canonical global-params PDA (254 bytes) and become admin. No upgrade-authority or fixed bootstrap key check exists. Init, rather than init_if_needed, prevents ordinary reinitialization of an existing initialized account. Whether a live uninitialized deployment exists is unproved.
- **InitializeFeeRecipient** ([programs/mayhem/src/lib.rs:330-345](evidence/programs/mayhem/src/lib.rs#L330)): Signer named admin is only the payer: global-params has seeds and mutability but NO has_one=admin. WSOL address, legacy Token program, ATA program, index-derived recipient PDA and recipient WSOL ATA constrain asset custody. Index <8 runs after account initialization; failure needs transaction rollback. Recipient authority is the PDA, not payer; no theft follows merely from permissionless creation.
- **ExtendAccount** ([programs/mayhem/src/lib.rs:348-359](evidence/programs/mayhem/src/lib.rs#L348)): Any signer may extend a mutable Mayhem-owned account with one of three recognized discriminators. No role, canonical account seed or full state decoder check. User lacks outer mut constraint; funding CPI requires writable payer only when top-up is positive. Event authority is seeded; program unchecked. Growth-only bounded targets prevent arbitrary allocation or shrink.
- **WithdrawAdmin** ([programs/mayhem/src/lib.rs:371-380](evidence/programs/mayhem/src/lib.rs#L371)): Mutable stored admin signer; canonical mutable global and sol-vault PDAs. Vault has no local owner/data-length check; System transfer must enforce spending semantics. Destination cannot be caller-selected independently of admin. No dynamic accounts, token assets or explicit rent floor.
- **WithdrawQuoteAdmin** ([programs/mayhem/src/lib.rs:383-397](evidence/programs/mayhem/src/lib.rs#L383)): Stored admin signer; mutable canonical global and sol-vault. Typed quote mint and vault ATA linked to mint/vault/selected token program; admin ATA initialized if needed using admin rent. TokenInterface accepts either family at the declaration level, whereas handler uses legacy token::transfer. No extension accounts or transfer_checked decimals supplied. Saved Token2022 cases reject; this is not broad Token2022 support.
- **SweepFees** ([programs/mayhem/src/lib.rs:433-446](evidence/programs/mayhem/src/lib.rs#L433)): Stored trader signer on global PDA, canonical trader quote ATA, typed mint, fixed legacy Token program and ATA program. Event PDA constrained; event program unchecked. Exactly 16 remaining accounts consumed as eight recipient/token pairs by helper. No pause or time gate here; cap is per invocation.
- **SweepFeesAdmin** ([programs/mayhem/src/lib.rs:449-462](evidence/programs/mayhem/src/lib.rs#L449)): Stored admin signer and canonical global PDA/admin quote ATA with legacy Token program. Same pair parser as trader sweep; amount cap deliberately u64::MAX and recipient timestamps not updated. No pause or rate guard; remaining account owner/discriminator checks are in helper.

## Per-function matrix

| Function | Exact source | Manual conclusion |
| --- | --- | --- |
| try_from | [programs/mayhem/src/checked_program.rs:18-23](evidence/programs/mayhem/src/checked_program.rs#L18) | Checks exact System ID before Program::try_from; delegated executable check requires retained Program source to close. Wrong ID fails before executable validation. |
| try_accounts | [programs/mayhem/src/checked_program.rs:27-37](evidence/programs/mayhem/src/checked_program.rs#L27) | Consumes exactly one account using split_first; missing account returns AccountNotEnoughKeys; advances slice before validating. No dynamic indexing panic or mutation of on-chain data. |
| to_account_metas | [programs/mayhem/src/checked_program.rs:41-43](evidence/programs/mayhem/src/checked_program.rs#L41) | Delegates meta generation to inner System Program; signer override semantics require dependency source. |
| to_account_infos | [programs/mayhem/src/checked_program.rs:46-46](evidence/programs/mayhem/src/checked_program.rs#L46) | Returns inner account info vector unchanged; no account duplication/privilege escalation locally. |
| as_ref | [programs/mayhem/src/checked_program.rs:49-49](evidence/programs/mayhem/src/checked_program.rs#L49) | Borrows inner AccountInfo without validation changes. |
| deref | [programs/mayhem/src/checked_program.rs:53-53](evidence/programs/mayhem/src/checked_program.rs#L53) | Deref returns inner AccountInfo; no independent mutable ownership rights. |
| key | [programs/mayhem/src/checked_program.rs:57-57](evidence/programs/mayhem/src/checked_program.rs#L57) | Returns underlying System key already validated on construction. |
| to_account_metas | [programs/mayhem/src/checked_program.rs:66-68](evidence/programs/mayhem/src/checked_program.rs#L66) | Client shape emits one readonly non-signer meta; deliberately ignores requested signer override. |
| to_account_metas | [programs/mayhem/src/checked_program.rs:75-77](evidence/programs/mayhem/src/checked_program.rs#L75) | CPI client shape emits one readonly non-signer meta; ignores signer override. |
| to_account_infos | [programs/mayhem/src/checked_program.rs:80-80](evidence/programs/mayhem/src/checked_program.rs#L80) | Returns exactly the supplied account clone; no additional program or authority. |
| duplicate_mutable_account_keys | [programs/mayhem/src/checked_program.rs:85-85](evidence/programs/mayhem/src/checked_program.rs#L85) | Reports no duplicate mutable keys; appropriate for readonly System wrapper, not a duplicate check for remaining FeeRecipient pairs. |
| handler | [programs/mayhem/src/instructions/burn.rs:38-65](evidence/programs/mayhem/src/instructions/burn.rs#L38) | Amount is existing u64 vault balance, no computed fee. Assign burned_amount (not accumulate). Clock unwrap may panic; token/event failure before Ended relies on rollback. Burned amount recorded before event; saved burn verification is metadata only here. |
| math | [programs/mayhem/src/instructions/buy.rs:52-52](evidence/programs/mayhem/src/instructions/buy.rs#L52) | Pure conversion of MathOverflow to Anchor Error; no state, accounts or arithmetic. Candidate error number follows default6000+2; diagnostic Error ABI exact historical layout unresolved. |
| handler | [programs/mayhem/src/instructions/buy.rs:53-101](evidence/programs/mayhem/src/instructions/buy.rs#L53) | vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs+output)) capped to real token reserve. Buy also has 0/0 if vs==output==0. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Positive deployment checked by strict limit>low-u64(counter), not full i128. CPI failures mapped to PumpCpiFailed(6008). Reloads changed token balances and curve before event. Event side 0 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original. |
| math | [programs/mayhem/src/instructions/buy_pump_swap.rs:72-72](evidence/programs/mayhem/src/instructions/buy_pump_swap.rs#L72) | Pure conversion of MathOverflow to Anchor Error; no state, accounts or arithmetic. Candidate error number follows default6000+2; diagnostic Error ABI exact historical layout unresolved. |
| handler | [programs/mayhem/src/instructions/buy_pump_swap.rs:73-129](evidence/programs/mayhem/src/instructions/buy_pump_swap.rs#L73) | vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs+output)). Buy also has 0/0 if vs==output==0. Effective quote checked i128 sum then checked u64 conversion prevents negative/out-of-range virtual reserve use. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Positive deployment checked by strict limit>low-u64(counter), not full i128. CPI failures mapped to PumpSwapCpiFailed(6010). Reloads changed token balances and pool token accounts (pool itself not reloaded) before event. Event side 0 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original. |
| math | [programs/mayhem/src/instructions/buy_v2.rs:68-68](evidence/programs/mayhem/src/instructions/buy_v2.rs#L68) | Pure conversion of MathOverflow to Anchor Error; no state, accounts or arithmetic. Candidate error number follows default6000+2; diagnostic Error ABI exact historical layout unresolved. |
| handler | [programs/mayhem/src/instructions/buy_v2.rs:69-118](evidence/programs/mayhem/src/instructions/buy_v2.rs#L69) | vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs+output)) capped to real token reserve. Buy also has 0/0 if vs==output==0. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Positive deployment checked by strict limit>low-u64(counter), not full i128. CPI failures mapped to PumpCpiFailed(6008). Reloads changed token balances and curve before event. Event side 0 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original. |
| owner | [programs/mayhem/src/instructions/pump_swap_types.rs:29-29](evidence/programs/mayhem/src/instructions/pump_swap_types.rs#L29) | SwapPool Owner fixed AMM ID; owner alone does not bind pool to mint/vaults. |
| try_deserialize | [programs/mayhem/src/instructions/pump_swap_types.rs:32-38](evidence/programs/mayhem/src/instructions/pump_swap_types.rs#L32) | Safe length handling: pads input shorter than287 then validates eight-byte pool discriminator, Borsh decodes fields including bools. Accepts discriminator-only short data padded to zero; not arbitrary ownership bypass. |
| try_deserialize_unchecked | [programs/mayhem/src/instructions/pump_swap_types.rs:39-42](evidence/programs/mayhem/src/instructions/pump_swap_types.rs#L39) | Unchecked Pool decoder pads to287 and skips discriminator; only suitable after identity established. Typed regular Account parsing should use checked path; macro path unproved. |
| try_serialize | [programs/mayhem/src/instructions/pump_swap_types.rs:45-45](evidence/programs/mayhem/src/instructions/pump_swap_types.rs#L45) | Writes discriminator then all fields; write/Borsh errors mapped. Foreign-owned typed Account exit should skip serialization; exact Anchor exit source unavailable. |
| owner | [programs/mayhem/src/instructions/pump_swap_types.rs:62-62](evidence/programs/mayhem/src/instructions/pump_swap_types.rs#L62) | SwapGlobalConfig Owner fixed AMM ID, no canonical key restriction here. |
| try_deserialize | [programs/mayhem/src/instructions/pump_swap_types.rs:65-69](evidence/programs/mayhem/src/instructions/pump_swap_types.rs#L65) | Requires >=8 then correct discriminator; delegates strict Borsh prefix decode, no padding. |
| try_deserialize_unchecked | [programs/mayhem/src/instructions/pump_swap_types.rs:70-73](evidence/programs/mayhem/src/instructions/pump_swap_types.rs#L70) | Unchecked config decoder requires>=8 then full old410-byte payload, rejects short data; trailing fields not consumed into this type. |
| try_serialize | [programs/mayhem/src/instructions/pump_swap_types.rs:76-76](evidence/programs/mayhem/src/instructions/pump_swap_types.rs#L76) | Writes discriminator and old418-byte prefix; use only with authorized owner/length. No assurance that it preserves newer trailing fields if called for writing. |
| owner | [programs/mayhem/src/instructions/sell.rs:54-54](evidence/programs/mayhem/src/instructions/sell.rs#L54) | SellCurve owner fixed Pump ID; typed owner plus external PDA constrain attacker-fabricated reserves. |
| try_deserialize | [programs/mayhem/src/instructions/sell.rs:57-57](evidence/programs/mayhem/src/instructions/sell.rs#L57) | Checked entry delegates unchecked implementation, which itself enforces discriminator; does not accidentally skip it. |
| try_deserialize_unchecked | [programs/mayhem/src/instructions/sell.rs:58-64](evidence/programs/mayhem/src/instructions/sell.rs#L58) | Copies at most141 bytes into fixed zero buffer. Discriminator checked after padding, bool offsets48/81/82/123/124 restricted0/1. Reads reserves8/16/24/32 as little-endian u64. Short legitimate Pump account can decode zero fields; reachable canonical short accounts unproved. Empty AccountSerialize impl does not model historical serializer. |
| math | [programs/mayhem/src/instructions/sell.rs:66-66](evidence/programs/mayhem/src/instructions/sell.rs#L66) | Pure conversion of MathOverflow to Anchor Error; no state, accounts or arithmetic. Candidate error number follows default6000+2; diagnostic Error ABI exact historical layout unresolved. |
| handler | [programs/mayhem/src/instructions/sell.rs:67-109](evidence/programs/mayhem/src/instructions/sell.rs#L67) | vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs-output)); with vt>0 and vs>0 the first output is strictly <vs, so denominator positive under valid retained<=10000; vs==0 gives 0/0 panic. Buy also has 0/0 if vs==output==0. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Sell decreases deployed and increases net-token counter; negative deployed is allowed; no buy-style risk cap. Legacy sell propagates raw Pump CPI error. Reloads changed token balances and curve before event. Event side 1 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original. |
| math | [programs/mayhem/src/instructions/sell_pump_swap.rs:68-68](evidence/programs/mayhem/src/instructions/sell_pump_swap.rs#L68) | Pure conversion of MathOverflow to Anchor Error; no state, accounts or arithmetic. Candidate error number follows default6000+2; diagnostic Error ABI exact historical layout unresolved. |
| handler | [programs/mayhem/src/instructions/sell_pump_swap.rs:69-115](evidence/programs/mayhem/src/instructions/sell_pump_swap.rs#L69) | vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs-output)); with vt>0 and vs>0 the first output is strictly <vs, so denominator positive under valid retained<=10000; vs==0 gives 0/0 panic. Buy also has 0/0 if vs==output==0. Effective quote checked i128 sum then checked u64 conversion prevents negative/out-of-range virtual reserve use. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Sell decreases deployed and increases net-token counter; negative deployed is allowed; no buy-style risk cap. CPI failures mapped to PumpSwapCpiFailed(6010). Reloads changed token balances and pool token accounts (pool itself not reloaded) before event. Event side 1 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original. |
| math | [programs/mayhem/src/instructions/sell_v2.rs:66-66](evidence/programs/mayhem/src/instructions/sell_v2.rs#L66) | Pure conversion of MathOverflow to Anchor Error; no state, accounts or arithmetic. Candidate error number follows default6000+2; diagnostic Error ABI exact historical layout unresolved. |
| handler | [programs/mayhem/src/instructions/sell_v2.rs:67-112](evidence/programs/mayhem/src/instructions/sell_v2.rs#L67) | vt==0 errors; u64*u64 products fit u128, vt+tokens fits65 bits and price vs*10^15 fits114 bits. Checked reference*tolerance and checked band bounds; inclusive band. No tolerance<=10000 guard; retained=10000-u16 can underflow. Output=floor(vs*tokens/(vt+tokens)), optional raw cap, then retained reserve cap. Input=floor(output*vt/(vs-output)); with vt>0 and vs>0 the first output is strictly <vs, so denominator positive under valid retained<=10000; vs==0 gives 0/0 panic. Buy also has 0/0 if vs==output==0. Post-CPI unsigned deltas assume correct direction; checked i128 counters prevent signed wrap. Sell decreases deployed and increases net-token counter; negative deployed is allowed; no buy-style risk cap. CPI failures mapped to PumpCpiFailed(6008). Reloads changed token balances and curve before event. Event side 1 uses actual deltas, version and reserves; AMM event reserves omit virtual quote adjustment. Clock unwrap/plain arithmetic can panic; diagnostics not identical to original. |
| buy_pump_swap | [programs/mayhem/src/lib.rs:24-24](evidence/programs/mayhem/src/lib.rs#L24) | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Buy adds actual spend to global and field_56 and subtracts tokens from field_72; strict post-CPI risk limits. |
| sell_pump_swap | [programs/mayhem/src/lib.rs:25-25](evidence/programs/mayhem/src/lib.rs#L25) | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Sell subtracts actual receipt from global and field_56; adds spent tokens to field_72. |
| buy_v2 | [programs/mayhem/src/lib.rs:26-26](evidence/programs/mayhem/src/lib.rs#L26) | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Buy adds actual spend to global and field_56 and subtracts tokens from field_72; strict post-CPI risk limits. |
| sell_v2 | [programs/mayhem/src/lib.rs:27-27](evidence/programs/mayhem/src/lib.rs#L27) | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Sell subtracts actual receipt from global and field_56; adds spent tokens to field_72. |
| buy | [programs/mayhem/src/lib.rs:28-28](evidence/programs/mayhem/src/lib.rs#L28) | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Buy adds actual spend to global and field_56 and subtracts tokens from field_72; strict post-CPI risk limits. |
| sell | [programs/mayhem/src/lib.rs:29-31](evidence/programs/mayhem/src/lib.rs#L29) | Requires configured trader, !paused, now>=last+interval when both nonzero, then writes time; strict now<end. If status!=Variant1 reserve threshold checked and status becomesVariant1. No explicit Ended rejection before deadline; legal lifecycle requires invariant from excluded initializer. Sell subtracts actual receipt from global and field_56; adds spent tokens to field_72. |
| burn_tokens | [programs/mayhem/src/lib.rs:32-34](evidence/programs/mayhem/src/lib.rs#L32) | Burn ignores pause; requires end<=Clock and not Ended. Sets Ended only after events. Stored state.mint not independently compared to supplied mint. |
| sweep_fees | [programs/mayhem/src/lib.rs:35-39](evidence/programs/mayhem/src/lib.rs#L35) | No pause/rate test; trader updates per-recipient timestamp, admin does not. Per-call cap can be used repeatedly by authorized signer. Order determines which recipient is drained first. |
| sweep_fees_admin | [programs/mayhem/src/lib.rs:40-43](evidence/programs/mayhem/src/lib.rs#L40) | No pause/rate test; trader updates per-recipient timestamp, admin does not. Per-call cap can be used repeatedly by authorized signer. Order determines which recipient is drained first. |
| withdraw_quote_admin | [programs/mayhem/src/lib.rs:44-59](evidence/programs/mayhem/src/lib.rs#L44) | Pause ignored; no quote allowlist; shared timestamp may throttle otherwise unrelated quote withdrawals. |
| withdraw_admin | [programs/mayhem/src/lib.rs:60-78](evidence/programs/mayhem/src/lib.rs#L60) | Gate bypassed if last==0 or interval==0. Negative configured interval can weaken delay. Pause ignored; does not reconcile deployed counters. |
| extend_account | [programs/mayhem/src/lib.rs:79-116](evidence/programs/mayhem/src/lib.rs#L79) | Permissionless extension; does not migrate logical fields or increment version. Trailing space is not a new state codec. |
| initialize_fee_recipient | [programs/mayhem/src/lib.rs:117-122](evidence/programs/mayhem/src/lib.rs#L117) | No stored-admin relationship required. Payer cannot choose fee recipient key independently of index. |
| initialize_global_params | [programs/mayhem/src/lib.rs:123-126](evidence/programs/mayhem/src/lib.rs#L123) | Sets only admin; trader stays zero, paused false. Bootstrap authority is not pinned. |
| update_global_params | [programs/mayhem/src/lib.rs:127-168](evidence/programs/mayhem/src/lib.rs#L127) | Version increments even with all None. Changes trade interval/reserve/risk and withdraw intervals but not roles, pause, sweep caps or deployed counters. |
| update_admin | [programs/mayhem/src/lib.rs:169-172](evidence/programs/mayhem/src/lib.rs#L169) | Replaces admin with arbitrary new_admin Pubkey. Single-step replacement; zero/unusable key can permanently lock administration. No acceptance signature, version bump or event. |
| update_trader | [programs/mayhem/src/lib.rs:173-176](evidence/programs/mayhem/src/lib.rs#L173) | Replaces trader with arbitrary new_trader Pubkey. New signer immediately controls all six trades and trader sweeps; zero key disables ordinary trading. Does not pause or reset counters. |
| update_max_sol_per_sweep | [programs/mayhem/src/lib.rs:177-180](evidence/programs/mayhem/src/lib.rs#L177) | Stores full u64 native sweep cap. Cap is per call, not time-based; admin sweep ignores it. |
| update_max_stable_per_sweep | [programs/mayhem/src/lib.rs:181-184](evidence/programs/mayhem/src/lib.rs#L181) | Stores full u64 nonnative sweep cap. One cap shared across all nonnative quote mints; admin sweep ignores it. |
| reset_sol_deployed | [programs/mayhem/src/lib.rs:185-188](evidence/programs/mayhem/src/lib.rs#L185) | Sets global signed SOL deployment counter to zero. Reopens global buy budget without withdrawing assets or resetting per-coin counters; can run while paused. |
| reset_stable_deployed | [programs/mayhem/src/lib.rs:189-192](evidence/programs/mayhem/src/lib.rs#L189) | Sets global signed stable deployment counter to zero. Reopens shared nonnative budget without moving tokens; future signed sell deltas can make it negative. |
| reset_state | [programs/mayhem/src/lib.rs:193-203](evidence/programs/mayhem/src/lib.rs#L193) | Clears reset_prefix, reset_middle, reset_stable_prefix/suffix and both deployed counters; sets paused=false. Preserves admin,trader,version,field_10,preserved_middle_a and both sweep caps. Clears withdrawal/trade intervals but not per-mint trade timestamp/state. Also resumes trading. |
| stop_trading | [programs/mayhem/src/lib.rs:204-208](evidence/programs/mayhem/src/lib.rs#L204) | Requires paused=false then writes true. Gates six trades; does not gate burns, withdrawals, sweeps or admin/reset. |
| resume_trading | [programs/mayhem/src/lib.rs:209-214](evidence/programs/mayhem/src/lib.rs#L209) | Requires paused=true then writes false. Repeated resume fails with TradingPaused (same code as repeated stop), despite active state. |
| sweep_remaining | [programs/mayhem/src/lib.rs:401-430](evidence/programs/mayhem/src/lib.rs#L401) | Exactly16 remaining accounts. Eight typed FeeRecipient/TokenAccount pairs; NO uniqueness/order/index<8/recipient PDA/ATA relationship check before helper use. Total starts0; each amount=min(available,cap-total) preserves total<=cap when subtraction valid. Rent subtraction and cumulative counter/destination additions are unchecked; previous+total-before_total may overflow intermediate. Configured max_sol_per_sweep or max_stable_per_sweep. Errors after prior transfers/exit need whole transaction rollback; saved duplicate pairs succeed, wrong bump/index succeed with zero tokens and reject at nonzero transfer. Event total is transferred raw units, not fee percentage. |
| owner | [programs/mayhem/src/state.rs:35-35](evidence/programs/mayhem/src/state.rs#L35) | BondingCurve Owner fixed Pump ID; strict account-derived Borsh decoder used by burn, not padded SellCurve trade decoder. No body mutation. |

## State, codec and event matrix

| Type | Source | Conclusion |
| --- | --- | --- |
| CheckedSystemProgram | [programs/mayhem/src/checked_program.rs:64-64](evidence/programs/mayhem/src/checked_program.rs#L64) | Client-only one-key/account wrapper; no on-chain data codec or mutable authority. |
| CheckedSystemProgram | [programs/mayhem/src/checked_program.rs:73-73](evidence/programs/mayhem/src/checked_program.rs#L73) | Client-only one-key/account wrapper; no on-chain data codec or mutable authority. |
| BurnEvent | [programs/mayhem/src/instructions/burn.rs:68-73](evidence/programs/mayhem/src/instructions/burn.rs#L68) | amount,mint,state,timestamp; emitted twice through log/self-CPI before status becomes Ended. Final committed state only meaningful for successful transaction. |
| SwapPool | [programs/mayhem/src/instructions/pump_swap_types.rs:9-28](evidence/programs/mayhem/src/instructions/pump_swap_types.rs#L9) | Padded287 codec. Pool addresses/mints are decoded but outer Mayhem constraints do not check supplied token accounts against them. signed virtual_quote_reserves245 affects sizing but not event reserve fields. |
| SwapGlobalConfig | [programs/mayhem/src/instructions/pump_swap_types.rs:50-61](evidence/programs/mayhem/src/instructions/pump_swap_types.rs#L50) | Strict418-byte historical prefix; typed owner+discriminator, no canonical address in Mayhem. Fields not used in local trade sizing; forwarded to AMM. |
| SellCurve | [programs/mayhem/src/instructions/sell.rs:50-53](evidence/programs/mayhem/src/instructions/sell.rs#L50) | Trade-only four reserves extracted by padded141-byte decoder; owner Pump, custom discriminator check; cannot stand in for burn strict codec. |
| SellEvent | [programs/mayhem/src/instructions/sell.rs:111-118](evidence/programs/mayhem/src/instructions/sell.rs#L111) | Shared303-byte event incl8 discriminator; side, actual SOL/token/quote deltas, vault balances, signed counters, reserves,version,retained bps,quote mint. Native quote represented by zero pubkey; nonnative native-only fields zero. AMM reserves omit virtual adjustment. |
| GlobalParams | [programs/mayhem/src/lib.rs:234-249](evidence/programs/mayhem/src/lib.rs#L234) | Serialized254-byte prefix: admin49,trader81; signed sol113 and stable206; version162; caps174/246. Reset clears only named slices, pause and counters. Extend adds trailing64 without codec change. Opaque roles remain candidate behavioral labels. |
| UpdateGlobalParamsArgs | [programs/mayhem/src/lib.rs:269-286](evidence/programs/mayhem/src/lib.rs#L269) | Fixed16 optional fields with exact integer widths; tags/trailing instruction behavior comes from dependency deserializer. No semantic bounds imposed on option values. |
| GlobalParamsUpdateEvent | [programs/mayhem/src/lib.rs:291-310](evidence/programs/mayhem/src/lib.rs#L291) | Explicit8-byte discriminator plus old/new version and full resulting config values. Event type historical name not established. No roles/deployed counters included. |
| FeeRecipient | [programs/mayhem/src/lib.rs:322-326](evidence/programs/mayhem/src/lib.rs#L322) | 42-byte prefix: bump8,index9,opaque10..42; sweep opaque timestamp0/counter8 native, counter16/timestamp24 nonnative. Extension74 adds uninterpreted trailing32. |
| ExtendAccountEvent | [programs/mayhem/src/lib.rs:362-368](evidence/programs/mayhem/src/lib.rs#L362) | Explicit discriminator; account,user,old/new sizes,timestamp. Emitted only on actual growth, not no-op or funding failure. |
| SweepEvent | [programs/mayhem/src/lib.rs:400-400](evidence/programs/mayhem/src/lib.rs#L400) | Explicit discriminator; aggregate raw amount and timestamp only, not recipient/mint/authority. Consumers need transaction accounts to interpret asset. |
| MayhemState | [programs/mayhem/src/state.rs:7-17](evidence/programs/mayhem/src/state.rs#L7) | Serialized106-byte prefix; mint24, end16, two signed-candidate i128 at56/72, bool88,u64 time89,status97,burned98. State originates outside review; signedness/historical names not proven. Extend170 does not add interpreted fields. |
| BondingCurve | [programs/mayhem/src/state.rs:25-34](evidence/programs/mayhem/src/state.rs#L25) | Strict82-byte discriminator/Borsh prefix for burn; external Pump owner. Burn requires parser/PDA but body ignores reserve fields. |

## Saved evidence actually consumed

Six public compressed differential files were copied byte-for-byte. Thirty selected case objects were inspected; the verifier compares their non-log original/candidate outputs and the selected observed error, without a VM, signature verification or new transaction. Full original and candidate objects differ in diagnostics; logs are deliberately not normalized into equivalence. Case observations are [saved_observations.json](saved_observations.json). The entire compressed input hashes are in provenance; each observation uses an exact JSON pointer into its decompressed data.

Concrete checks: admin cases40/41/42/67 show mutability/signature/has_one rejections; fee_recipient0/7/8/264 show valid endpoints, index8 rejection and non-admin payer acceptance; extend34/35 distinguish rent-topup privilege escalation from already-funded success; withdraw139/171/187/235 distinguish admin, signed-overflow and time behavior; quote_withdraw1/6/56/62 distinguish admin, legacy ATA creation and Token2022 rejection; sweep25/27/29/30/98/101/330/331/332/333/336/337 distinguish role/duplicates and zero/nonzero seed enforcement. These cases use synthetic state and do not establish mainnet reachability or universal rollback.

Burn and native AMM verification JSONs are retained metadata only; no new closure is inferred from their success counts. The build-comparison/summary manifests bind copied current sources to the saved9e4 candidate. Counts, manifests and saved tests alone are not exhaustive semantic or security proof. No private fixtures, credentials, CLI telemetry or mutable logs are sealed. Retained logs inside immutable public differential receipts are historical evidence, not current execution telemetry.

## Unclosed dependency and lifecycle obligations

- **D1**: CheckedSystemProgram locally checks ID first; Program executable, typed Account owner/discriminator/exit, InterfaceAccount extension parsing, duplicate-mutable detection, init/ATA and self-event CPI remain dependent on Anchor1.0.0 macros/runtime. Retained public search found error/codegen source but not full matching Accounts/event/token sources. Next prerequisite: Retain exact Cargo.lock-checksum matched Anchor1.0.0 account/derive/event/SPL dependency source from an authorized public source; inspect without build.
- **D2**: Fixed Pump/AMM targets are not arbitrary CPI targets. Several relationship and fee checks are intentionally downstream; current Pump differs from older baseline. No downstream security closure imported from unchanged Mayhem bytes. Next prerequisite: Matching retained callee source, loaded ELF identities and dependency account/configuration provenance. Excluded Pump sell_v2 must stay outside this lane.
- **D3**: Public error codegen49-87 proves default-offset conversion and constructed AnchorError fields for retained source, not historical machine ABI. Exact Rust enum layout and original diagnostics remain unresolved. Next prerequisite: Identity-bound permitted ABI evidence; no compiler/path/version search or source build.
- **D4**: Runtime atomic rollback is a necessary contract for pre-CPI timestamp/status updates and post-CPI risk/event failure. Saved outputs match on selected cases excluding logs; comparison is not an independent replay or proof of all failed state restoration. Next prerequisite: Retained runtime semantics plus existing case pre/post evidence with loaded identities; no new runtime probes.

No whole-program sign-off: missing/excluded initialization, original ELF mismatch, opaque field signedness/roles, original-versus-candidate ABI/diagnostics, externally enforced relationships and unavailable exact macro/runtime sources prevent it. No patch is proposed because complete historical/economic intent and reachable harmful preconditions have not been established.

## Offline verification

Run `python3 verify.py` from any location (script resolves its own directory). SHA256SUMS covers every package file except SHA256SUMS itself, including verify.py. It checks full input Git blob hashes, source span hashes,24/61/15 coverage, source-to-saved-build binding, copied candidate identity, selected saved output comparisons and explicit non-signoff flags. It neither builds nor executes a program. Copy-directory verification outcome is retained outside publication in `verification-outcome.json`.
