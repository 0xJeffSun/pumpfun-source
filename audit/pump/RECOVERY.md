# Pump recovery and dependency assessment

## Implemented scope

Four complete administrative instruction paths are implemented in `programs/pump`,
including Anchor entrypoint, argument decode, Global account decode/encode,
permissions/PDA checks and state updates. The local original-versus-candidate SBF
suite has 93 matching cases. Cases cover success in both toggle directions,
unchanged toggles, invalid bool, u8 boundaries, missing/trailing instruction bytes,
short and unknown dispatch data, wrong/missing accounts, authority signer/writable
and ownership checks, global discriminator/data bounds, PDA substitution, and
readonly state rollback. This is bounded coverage, not an audit of the whole Pump
program. The other 52 published instructions remain unreconstructed.

## Token dependencies

Fresh read-only registry evidence identifies the exact public source commits for
two captured token dependencies. `scripts/pump_verify_dependencies.py` independently
hashes each capture after removing trailing zero allocation bytes and checks it
against both executable and on-chain hashes in the saved registry response.

- SPL Token: `solana-program/token` commit
  `a94dd19750dc3b2409f73e15bb74754935b2a489`, Pinocchio implementation.
- Token2022: `solana-program/token-2022` commit
  `8867f751c0f69367ba03af4f85510b5611989491`.
- Associated Token Account: registry reports unverified; source attribution and
  build settings remain unresolved.

Registry responses, content-addressed build lookup responses and hashes of the
checked-out Rust/Cargo source trees are under `repro/pump/`. Exact source trees
were checked out under `work/pump-recovery/{token-source,token-2022-source}`.
The registry's source attribution matches these captured deployments, but does
not prove a fresh local rebuild. A fresh local SPL Token build from the pinned
source with platform-tools v1.52 produced 111,144 bytes and a different normalized
hash; its command, hashes and build log are retained. Build-environment recovery
is still required. Docker is installed but its daemon was unavailable at inspection;
no Docker verification was performed.

## Unresolved security work

No new vulnerability is established by the administrative tests. Trade paths,
fee calculation and rounding, state transitions, reserve invariants, token CPI
constraints/extensions, transfer hooks, migrations, creator controls and reward
flows require implementation and independent tests. Local VM builtin token
programs must not be treated as equivalent to the captured Pinocchio Token and
Token2022 dependencies. Valid trade tests should load the pinned captured programs
and state all remaining runtime differences.
