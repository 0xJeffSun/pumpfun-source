# Mayhem: recovered administration paths

The eleven implemented paths and 1,051 differential cases are a partial security
review. No complete byte-identical program or complete Mayhem audit exists yet.

## Observed controls and behavior

Existing-state admin instructions require a signing, writable administrator;
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

Fourteen currently identified paths remain unimplemented: fee-recipient
initialization; two sweep handlers; two withdrawals; account extension; Mayhem
state initialization; token burn; and six Pump/PumpSwap buy/sell paths. Their
account/CPI constraints, price impact, risk accounting, rate limits, arithmetic,
rollback and dependency equivalence remain to be recovered and audited.
Historical source/build fidelity, executable layout and all bytes remain
unresolved. Current tests do not establish safety of those paths or the program
as a whole. No confirmed vulnerability is claimed by this partial work.
