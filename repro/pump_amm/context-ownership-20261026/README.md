# Legacy trade context ownership recovery

Two controlled builds start from the accepted standalone `f2e3d097…` source.
Neither changes business logic, arithmetic, diagnostics, source paths, compiler
flags or the pinned dependency lock. The final proposal changes four declarations
in each of `LegacyBuy` and `LegacySell`:

- `protocol_fee_recipient`, `event_authority` and `coin_creator_vault_authority`
  become owned `AccountInfo` values rather than borrowed `UncheckedAccount` values.
- `fee_config` becomes an inline `Account<TradeFeeConfig>` rather than a box.

The source patch is `owned-info-inline-fee.patch`. Main source remains untouched.
Runtime/full-regression acceptance is pending; parent work will compose and test
this proposal with independently measured changes.

## Controlled compiler results

| Build | Candidate | Normalized original windows | Raw windows | Gain/loss from baseline |
|---|---|---:|---:|---|
| Accepted baseline | `f2e3d097…` | 503/785 | 113 | — |
| Three owned account-info fields only | `b1b0ddf2…` | 505/785 | 113 | +2 / 0 |
| Owned account-info fields and inline fee account | `b890b868…` | 510/785 | 113 | +7 / 0 |

Both complete compiler outputs, unstripped symbols, build records, command logs,
and all source inputs are under `results/`. Their manifests hash retained bytes.
The builds use the existing pinned direct-Cargo v1.44 compiler/v1.52 strip recipe;
original bytes are comparison inputs after compilation. Neither build is equal
to the original complete ELF.

## Exact layout evidence

Before the change, the two original exit bodies and reconstructed exits had
identical lengths, opcodes, branch offsets and relocation patterns; only context
field-load offsets differed. The combined proposal restores the complete
normalized exits and both parent constructors. Representative field offsets:

| Field loaded by exit | Baseline context offset | Original and final offset |
|---|---:|---:|
| Pool account pointer | 0 | 288 |
| User base token account | 40 | 328 |
| User quote token account | 48 | 336 |
| Pool base token account | 56 | 344 |
| Pool quote token account | 64 | 352 |
| Protocol token account | 80 | 360 |
| Creator token account | 136 | 408 |
| User volume account (buy only) | 160 | 424 |

The final seven gained original windows are:

| Original start | Bytes | Candidate start | Meaning |
|---|---:|---|---|
| `0xaafd8` | 17,368 | `0x52438` | LegacyBuy account parser |
| `0xb1370` | 2,344 | `0x5b2c0` | LegacyBuy exit |
| `0xbfa90` | 14,120 | `0x5bbe8` | LegacySell account parser |
| `0xc31b8` | 5,496 | `0x56810` | Init closure |
| `0xc4730` | 5,496 | `0x57d88` | Init closure |
| `0xc5ca8` | 2,184 | `0x5f310` | LegacySell exit |
| `0xe84c8` | 1,568 | `0x9fe70` | Public sell wrapper |

Names are candidate symbol attributions; original boundaries remain inferred.
There was no inline-Pool trial: the actual pool-pointer load and shared Pool
serializer support keeping Pool boxed. The exact restored output supports the
four-declaration proposal more strongly than a layout guess alone.

## Actual immediate call targets

`owned-info-inline-fee-all-edges.json` checks encoded call offsets against actual
candidate destinations, rather than counting masked root instructions alone.

| Restored root | Immediate targets with complete normalized correspondence |
|---|---:|
| Buy parser | 147/148 |
| Sell parser | 122/122 |
| Buy exit | 31/31 |
| Sell exit | 29/29 |
| Each init closure | 22/22 |
| Sell wrapper | 5/6 |

The Buy parser's remaining call is original `0xaf3b0` to candidate `0x59300`, an
8,128-byte initialization closure with two source-metadata differences. The sell
wrapper's remaining call is original `0x49b50` to candidate `0xb2148`, the business
handler, whose body remains unmatched. All relocated data references are listed
as unclosed. Immediate body correspondence does not establish recursive/data
identity or exhaustive semantic equivalence.

Recheck actual call destinations with `check_edges.py`, passing the final
candidate, unstripped symbols, saved measurement and a new output path.
