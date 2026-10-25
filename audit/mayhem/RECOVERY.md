# Mayhem: recovered administration paths

The fourteen implemented paths and 1,932 differential cases are a partial security
review. No complete byte-identical program or complete Mayhem audit exists yet.

## Observed controls and behavior

The ten shared-context existing-state admin instructions require a signing, writable administrator;
GlobalParams must have the correct program owner, discriminator, valid Borsh
layout, writable flag, `global-params` PDA and matching stored admin. The System
program ID is validated. These paths also require the event-authority PDA and a
fifth program account. Even when no event is emitted, missing event/program
accounts reject. In the ten existing-state paths, account data shorter than 254
bytes fails deserialization; invalid paused booleans also fail.

The nine existing-state paths other than `update_global_params` do not validate
the fifth program key in the tested fixtures. `update_global_params` performs a
self-CPI and fails/rolls back when that provided account cannot support the CPI.
This difference is reproduced, not called a vulnerability: the first nine paths
perform no CPI through that unchecked account.

`initialize_global_params` takes three accounts, creates the 254-byte PDA via
the System program, and installs the signing payer as admin with other fields
zero. A synthetic uninitialized PDA may be initialized by the signer. This is not
a claim about the live PDA's present state, upgrade access, or exploitability.

Resetting SOL or stable deployment zeroes its respective 16-byte counter.
`reset_state` clears the observed risk/accounting ranges and unpauses trading
while preserving administrator, trader, version and the retained limit fields.
`stop_trading` requires active state; `resume_trading` requires paused state.
Both invalid transitions return 6000 (`TradingPaused`), including resume when
already active. This unusual error name is observed original behavior.

`update_global_params` accepts sixteen Borsh options in the recovered order. It
increments a u32 version even when all options are None. At u32::MAX it returns
6002 (`MathOverflow`) and rolls back all field updates. The event contains old
and new versions followed by the sixteen resulting values, totaling 129 bytes
including its discriminator. The original emits this both as log data and a
self-CPI; both are reproduced and compared.

## Dependency observations

Covered paths exercise the System program and the Mayhem self-event entrypoint.
They do not establish the behavior of external token/trading dependencies.
The original Mayhem ELF contains full 32-byte constants for Pump at 0xae2ac,
PumpSwap at 0xae2e2, SPL Token at 0xad168/0xae302, and Token2022 at 0xae322.
This locates references for remaining CPI recovery; it is not proof of each
call's constraints or dependency build identity. A full-byte constant scan did
not find the captured Metaplex, donation relay or ATA IDs, but absence from that
scan does not prove absence of use. No unobserved Metaplex/relay CPI is assumed.

## Remaining work

Eleven currently identified paths remain unimplemented: two sweep handlers; quote withdrawal; Mayhem
state initialization; token burn; and six Pump/PumpSwap buy/sell paths. Their
account/CPI constraints, price impact, risk accounting, rate limits, arithmetic,
rollback and dependency equivalence remain to be recovered and audited.
Historical source/build fidelity, executable layout and all bytes remain
unresolved. Current tests do not establish safety of those paths or the program
as a whole. No confirmed vulnerability is claimed by this partial work.

## Fee-recipient initialization and captured dependencies

The twelfth recovered path, `initialize_fee_recipient`, is covered by 306 further
strict differential cases, loading the exact captured Token, Token2022 and ATA
ELFs rather than relying on LiteSVM's builtin token programs. Valid indices 0–7
create a 42-byte program-owned FeeRecipient PDA and its native-WSOL ATA. Indices
8–255 return 6017 after the initialization CPIs and roll everything back. The
PDA seeds are `fee-recipient` plus the one-byte index. Its first two serialized
fields are bump and index; the remaining 32 bytes initialize to zero.

This initialization path requires a signing writable payer, but does not require
the payer to match GlobalParams.admin. GlobalParams must still be the correct
writable program-owned PDA. The native WSOL mint and legacy SPL Token addresses
are constrained; a valid Token2022 mint/program pair can reach initialization
CPIs but subsequently fails the token-program address constraint and rolls back.
These controls and ordering are reproduced. Permissionless creation of a fixed
program-owned fee-recipient PDA is not by itself a confirmed vulnerability.

The successful original calls establish actual ATA and token dependency use.
The earlier full-byte constant scan's missing ATA key was only a scan limitation.
Dependency source/build identity remains unproven even though captured binaries
are used for these local calls. Metaplex and donation-relay use remains unproven.

## Account extension and SOL withdrawal

`extend_account` accepts program-owned accounts with the recovered GlobalParams,
FeeRecipient or MayhemState discriminators, extending them to 318, 74 or 170
bytes respectively. It does not require a PDA or stored administrator. The signer
pays any rent shortfall, appended bytes are zeroed, and a log plus self-CPI event
records account, payer, old/new lengths and timestamp. Already large accounts
return without funding or events. Unknown types fail with 6016. The 301 cases
cover these boundaries and failed CPI rollback; permissionless rent-funded
extension alone does not demonstrate unauthorized fund extraction.

`withdraw_admin` requires the signing writable stored administrator, correct
GlobalParams PDA and `sol-vault` PDA, and transfers from the vault to that
administrator through the System program. The recovered rate check reads signed
i64 timestamp and interval at serialized offsets 138 and 154. When both are
nonzero, current time must be at least their sum; signed overflow panics as in
the original. A successful call writes current time even for zero amount. Failed
transfer and rate-limit calls roll back. Its 274 cases include extreme synthetic
configuration values; these do not prove an unprivileged party can create such
states or deny service on the deployed program.

The initialized FeeRecipient's trailing 32 bytes are zero, not the initializer's
public key. Preliminary original-only sweep probes further show stored trader
authorization for `sweep_fees` and stored administrator authorization for
`sweep_fees_admin`, with the authorized signer's wallet/ATA as destination.
Unauthorized signer fixtures fail the has-one constraint. These observations
reduce the initial creation-race concern but are not a complete sweep audit;
recipient-pair validation and token transfer paths remain under investigation.
