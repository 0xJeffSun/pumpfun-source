# PumpSwap administrative recovery checkpoint

This is a partial, independently compiled implementation of ten of the 38
published instructions. It is not the historical source, a complete security
audit, or a byte-identical program. Unknown instructions use Anchor's fallback;
they are not silently accepted or represented by successful empty handlers.

Implemented instructions:

- `disable`: replace bits 0–4 individually while preserving bits 5–7; emit both
  the log event and the signed event CPI.
- `update_admin`: assign the unchecked new account's public key, including a zero
  key; emit the old admin and new admin through both event paths.
- `toggle_mayhem_mode`: reject unchanged state with 6043; change the bool otherwise.
- `toggle_cashback_enabled`: reject unchanged state with 6051; change the bool otherwise.
- `toggle_boost`: require a nonzero boost authority (6005), then assign the bool.

- `update_buyback_config`: optional basis points up to 10,000; optional exactly
  eight remaining recipient accounts, each nonzero and pairwise distinct. Preserve
  supplied order. Invalid basis points precede recipient errors. No event.
- `update_fee_config`: independently limit LP/protocol/creator fees to 1,000 bps
  each; require eight nonzero, strictly sorted, unique protocol recipients. Set
  the admin-set-creator authority without imposing a nonzero requirement. Emit
  the event through both paths.
- `set_boost_authority`: extend a legacy global config to 949 bytes and top up
  rent via System Program if needed, then store the new key, including zero.
  Emit old/new authorities through both event paths.
- `update_creator_fee_config`: same resizing and rent handling; assign the bool
  and u64 maximum, including zero and u64 max. No invented fee cap is imposed.
  Emit through both event paths.
- `set_reserved_fee_recipients`: require the canonical global-config PDA and at
  least eight remaining accounts. Use the first eight, reject zero keys, preserve
  order and accept duplicates. Set the supplied whitelist key and emit recipients.

Every handler requires a signing admin related to the writable GlobalConfig.
A wrong admin returns custom error 6005, not Anchor's generic HasOne error.
The event-bearing account contexts also check the event PDA even for the two
simple toggles that emit no event. `toggle_boost` takes just two fixed accounts.
The tested noncanonical config address is accepted when its owner, serialized
state and admin relationship are valid. This is observed behavior, not a finding.

Original binary anchors: disable wrapper `0xe1508`, handler `0x17960`;
update_admin wrapper `0xe1cc0`, handler `0x1bdb0`; toggle_mayhem_mode handler
`0x1bb00`; toggle_cashback_enabled handler `0x1b510`; toggle_boost handler
`0x1b7c0`. The original GlobalConfig deserializer at `0x5e7xx`/`0x5e978`
checks legacy payload lengths 899, 932, and 941 after the discriminator: total
account lengths 907, 940 and 949. The candidate preserves the three layout
boundaries, rejects an invalid discriminator/minimum length as InvalidAccountData,
and forwards malformed bools as BorshIoError. Short writable legacy accounts can
execute the handler and emit events before failing to serialize the larger state;
transaction rollback prevents the state change from committing. The resize-enabled paths compare the complete reserialized state, including
legacy fields defaulted to zero; lengths 907, 908, 939, 940, 941 and 948 are covered.

The differential harness tests all 256 preexisting flag bytes against all 32
requested flag combinations, authority/signature/owner/writeability errors,
noncanonical config addresses, event/program substitution, malformed arguments,
short dispatch, legacy layout boundaries, invalid bool fields, administrative
key replacement and toggle transitions. It compares committed config bytes,
transaction error codes, log-event payloads and rollback. It does not require
compute-unit counts or source-location text to match and does not assert an
exact inner-instruction trace. Resize tests additionally compare payer, admin and
config lamport deltas, covering genuine System Program transfers and rollback. These are bounded behavioral checks, not proof
of all possible inputs or original compiler identity.

## Dependencies and limits

The candidate pins Anchor 0.31.1. Anchor 0.30.1's short-dispatch behavior differs
from the captured originals; 0.31.1 is a behavioral candidate, not a proven
historical version. Cargo.lock pins the independently rebuilt dependencies,
including solana-program 2.3.0, solana-cpi 2.2.1, solana-pubkey 2.4.0 and Borsh
0.10.4/1.8.1. Platform-tools v1.52 is selected for this partial full-program build.
The recovered function and ELF comparisons still differ from the original.

The implemented paths use Clock, signed self-CPI for events, and System Program
transfer CPI for rent top-ups during legacy account resizing. They do not
exercise token/Token-2022/ATA transfers, Pump/Fees pricing CPI, transfer-fee or
transfer-hook extensions, token authority checks, donations, migrations or
multi-hop trading. Those dependencies remain required for the other 28 handlers.
Original dependency captures and the imported signed trading fixtures are available
for subsequent original-versus-rebuilt tests; their presence is not candidate
acceptance evidence.

No confirmed vulnerability is claimed. Synthetic accounts and authority replacement
are test fixtures; they do not establish control of production state or keys.


## Versioned checkpoints

`repro/pump_amm/admin-five/` preserves the earlier five-handler checkpoint.
`repro/pump_amm/admin-ten/` preserves the current ten-handler clean build,
source/test snapshot, separate complete case reports and their hashes. The
candidate binary is compared unmodified with the complete original payload;
length mismatch and differing instruction bytes remain explicit. Nothing in a
passing bounded suite changes that whole-program mismatch.

The current ten-handler checkpoint has **9,311** total SBF differential cases
and zero observed mismatches across all five suites on the same candidate ELF.
