# PumpSwap administrative recovery checkpoint

This is a partial, independently compiled implementation of five of the 38
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
transaction rollback prevents the state change from committing. Default values
of fields absent from legacy layouts remain a limited recovery: the current five
handlers do not independently establish every default's value.

The differential harness tests all 256 preexisting flag bytes against all 32
requested flag combinations, authority/signature/owner/writeability errors,
noncanonical config addresses, event/program substitution, malformed arguments,
short dispatch, legacy layout boundaries, invalid bool fields, administrative
key replacement and toggle transitions. It compares committed config bytes,
transaction error codes, log-event payloads and rollback. It does not require
compute-unit counts or source-location text to match and does not assert an
exact inner-instruction trace. These are bounded behavioral checks, not proof
of all possible inputs or original compiler identity.

## Dependencies and limits

The candidate pins Anchor 0.31.1. Anchor 0.30.1's short-dispatch behavior differs
from the captured originals; 0.31.1 is a behavioral candidate, not a proven
historical version. Cargo.lock pins the independently rebuilt dependencies,
including solana-program 2.3.0, solana-cpi 2.2.1, solana-pubkey 2.4.0 and Borsh
0.10.4/1.8.1. Platform-tools v1.52 is selected for this partial full-program build.
The recovered function and ELF comparisons still differ from the original.

The five implemented paths use Clock and signed self-CPI for events. They do not
exercise token/Token-2022/ATA transfers, Pump/Fees pricing CPI, transfer-fee or
transfer-hook extensions, token authority checks, donations, migrations or
multi-hop trading. Those dependencies remain required for the other 33 handlers.
Original dependency captures and the imported signed trading fixtures are available
for subsequent original-versus-rebuilt tests; their presence is not candidate
acceptance evidence.

No confirmed vulnerability is claimed. Synthetic accounts and authority replacement
are test fixtures; they do not establish control of production state or keys.
