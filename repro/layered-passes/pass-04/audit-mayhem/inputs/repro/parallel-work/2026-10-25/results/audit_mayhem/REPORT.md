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
