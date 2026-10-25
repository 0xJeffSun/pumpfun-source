# Pump ordinary route depth: static result, scope unchanged

The captured dispatcher supports iteration beyond two curves. This package establishes its length/flag contract and the previous-hop state transition, and isolates the new middle-leg proof obligation. It does **not** establish a complete per-leg implementation for more than two curves. No source patch is supplied; the current one-curve and two-curve guards must remain.

All inputs were read from Git checkpoint `517d77db988d8c63b6cf476f0be138c5a4f3128a`. `provenance.json` records each copied input's full SHA256, Git blob ID, size and path. `original-ranges.json` records bounded original byte ranges and the complete original ELF identity: SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. The ELF was read for hashing and bounded extraction, not executed or patched. No unrelated instruction body was followed. References below are original ELF file offsets; binary range ends in metadata are exclusive. Descriptive helper labels and inferred ends are not historical Rust function names.

## Identity and exact loop contract

The instruction identity is established by `e1 9a 75 16 d7 56 f6 67` at `0x11bab8`, comparison at `0x11bac8`, matching dispatch at `0x11c9b8`, wrapper call at `0x11ca08 -> 0x1295c0`, and wrapper handler call at `0x129888 -> 0x567d8`. The wrapper decodes a u64 amount and byte vector and returns two u64s. The copied `dispatch_match`, `dispatch_branch`, `wrapper`, `handler`, `hop_context` and `curve_hop` ASM/JSON files reside under `inputs/repro/pump/native-curve-partial-fortyeight/static-mapping/`. Their raw ranges were freshly compared to the fixed original ELF; they are not merely accepted from the old manifest.

| Property | Exact original evidence | Consequence at depth >2 |
|---|---|---|
| Amount | zero branch `0x567e8`; error constant `0x56ba0 = 6020` | One initial nonzero check, before route shape checks. |
| Length | `0x567f8..0x56828`: at least five accounts, divide by five and multiply back | N five-account groups; no explicit two-curve maximum in this handler. This is not an unlimited transaction/account/compute guarantee. |
| Flags | `0x56830..0x56880`: vector length equals N and every byte <4; `0x56d90 = 6106` | Any vector in `{0,1,2,3}^N` passes this structural check. It need not pass later leg validation. |
| Bad account count | `0x56cb0 = 6027` | Precedes flag checking. |
| Iteration | `0x57248..0x572c8` parses five accounts; `0x57000` advances AccountInfo pointer by 240; `0x57010` advances consumed count by five; `0x57028` compares index with N | No special second/third-leg dispatch. |
| Leg inputs | `0x57320..0x57438` | Carries current mint, amount, optional previous-hop state, curve bump, current flag, and `index == N-1` into the same body `0x5b3b0`. |
| Leg commit order | `0x57458`, `0x57570`, `0x57580`, `0x57938..0x57978` | Body success, hop exit success, previous-state replacement, checked buyback accumulation, next leg. Parser/body/exit errors propagate; accumulation overflow branches to `0x57c38`. |
| Route completion | `0x57030..0x57070`; `0x57100 = 6098`; `0x57980..0x57998` | Final carried mint must equal destination mint; result is final carried amount plus accumulated buyback. |

Supported loop hypothesis, deliberately leaving the business operation opaque:

```text
reject amount == 0
reject remaining_count < 5 or remaining_count % 5 != 0
N = remaining_count / 5
reject len(flags) != N or any flag >= 4
mint = source.mint; amount = amount_in; previous = None; buyback = 0
for i in 0..N:
    hop, bump = parse_five_accounts(group[i])?
    r = identified_body_0x5b3b0(context, hop, bump, mint, amount,
                              previous, flags[i], i == N-1)?
    exit_hop(hop)?
    previous = carried_state(hop.base_mint, r.output_account,
                             hop.curve_account, bump)
    mint = r.output_mint; amount = r.amount_out
    buyback = checked_add(buyback, r.buyback_fee)?
reject mint != destination.mint
return (amount, buyback)
```

The byte stores for carried amount (`0x574f8`), mint (`0x57460..0x57490`, `0x57910..0x57930`, `0x56fa8..0x56fc0`) and previous-state replacement (`0x57590..0x57908`) support this transition. This is a loop hypothesis, **not** a replacement source implementation: opaque result fields still need their complete ordinary-branch producer proof.

## What depth three changes

The current AMM caller source at `inputs/programs/pump-amm/src/multi_hop.rs:263-308` groups adjacent Pump legs and assigns flags by positions in the entire outer route. For an all-curve monotone route of N>1 legs, it produces `[1, 0, ..., 0, 2]` for buys and `[2, 0, ..., 0, 1]` for sells. At N=3 these are `[1,0,2]` and `[2,0,1]`. This is a derivation from the recovered caller, not an additional constraint proved in original Pump, and not a runtime observation. For mixed outer routes, endpoints are outer-route positions, not local Pump-group positions.

The middle leg is materially different from either tested two-leg endpoint. In the original curve body, flag bit 0 is isolated at `0x5c480..0x5c498`; bit 1 at `0x5b448..0x5b470`. Calls to the fee selector `0x89ec8` at **`0x5cdb8` and `0x5cef8` occur before fee masks** (`0x5cdd0..0x5ce18`, `0x5cf28..0x5cf78`). Errors from that selector are tested before masks. With both flags clear, selected fee inputs are zeroed, but the fee-selection call is not eliminated. Therefore, “middle legs have no fees, so skip fee configuration/selection” is not a supported reconstruction. Zero fee amounts alone also do not prove quote rounding, successful transfer, event fields or error ordering.

The original compares the current carried mint with both hop mints at `0x5c5c8..0x5c720`, producing discontinuity error 6098 at `0x5c7b0`; the comparison also feeds direction selection at `0x5cbc0`. The loop itself does not prove all legs share one direction. The current two-curve source fixes direction once at line 189 and restricts the two quotes at lines 194-196 and 212. A depth-three extension cannot merely change `0..2` to `0..N`: on SOL→A→B→C, the third quote is B, while the current non-native guard accepts only the fixed root A. This is a source-level structural obstruction, not a newly probed original failure.

## Authority and reserves: proved portions and limits

The previous-state record passed into the transfer helper has a 32-byte seed mint at offset 0, output AccountInfo at `+0x20`, authority AccountInfo at `+0x50`, and bump at `+0x80`. The caller builds this record in `0x577d0..0x57908`; `0x5a260` receives its optional pointer. Its non-null path compares previous output key with the target at `0x5aa60..0x5ab40`, returns without a transfer for equal keys, and constructs three seed components at `0x5ab68..0x5abe8`: `bonding-curve` (13 bytes), **previous** base mint (32 bytes), bump (one byte). The authority/output AccountInfo copies at `0x5aca8..0x5b0a0` feed the call at `0x5b390`. The null-previous path uses the fixed source/source-authority, reaching the transfer wrapper at `0x5aa40`. These are address-bound identities, not inferred historical helper names.

This explains why reverse chains must preserve the previous curve's seed mint even when the token being transferred is its quote mint. For C→B→A→SOL, the second leg would consume B under C's curve authority; the third would consume A under B's curve authority. That seed progression follows the loop record, conditional on the ordinary producer mapping being closed. It does not certify the whole three-leg transfer sequence.

There is original reserve-write evidence, not just copied two-leg arithmetic: input transfer call `0x5d360` precedes reserve mutation call `0x5d420 -> 0xa13e0`. That helper adds its r3 input to fields `+0x40` and `+0x50` with overflow tests, then subtracts r4 from fields `+0x48` and `+0x58` with underflow tests (`0xa13e8..0xa1470`, `0xa1540..0xa1558`, `0xa1708..0xa1730`, `0xa1ad8..0xa1ae0`). These are in-memory offsets, not serialized-account offsets. This does not close the other direction, every fee accrual, alias behavior, or all return fields.

The current source's formulas at `inputs/programs/pump/src/multi_hop_curve.rs:235-260` use ceil bps fees, a buy fee estimate followed by `q.saturating_sub(1)`, and constant-product sell division; reserves and accrued fees then change at lines 264-265. They remain current **bounded implementation evidence**. This package does not lift those formulas to arbitrary depth or equate selector outputs, arithmetic inputs and error order for the unobserved middle-leg state.

## Saved evidence and precise unclosed obligations

The verifier decodes existing inner-instruction payloads directly from the two immutable saved receipts. It runs no transaction and generates no fixture:

| Saved receipt | Cases | Pump CPI cases | Successful transactions | Observed Pump flag vectors |
|---|---:|---:|---:|---|
| `differential/multi_hop_curve_partial.json.gz` | 56 | 50 | 11 | `[3]` |
| `differential/tokenkeg_two_curve.json.gz` | 20 | 18 | 16 | `[1,2]`, `[2,1]` |

Both are copied under `inputs/repro/pump/tokenkeg-two-curve-fortyeight/`; both identify current candidate `5c1c1c2d1cd2c334b3e054b6a8fb5ac0638d80d13495c1c18d935ad20bfd62bb`. All saved comparison mismatch lists are empty. Eight cases stop before Pump. No observed Pump vector has depth >2 or a middle zero flag. Existing signatures are preserved, not regenerated; this verifier does not reverify signatures or re-execute receipts. Their contents are observations, not exhaustive semantic/security proof.

`result.json` supplies O1–O4 with exact call sites, missing proof and next prerequisites. The decisive prerequisite is an ordinary-path producer/consumer map through fee selector `0x89ec8`, arithmetic calls at `0x5ce50 -> 0x806c8`, `0x5cfb8/0x5d118 -> 0x80488`, and `0x5d160 -> 0xa0838`, including flag-zero errors, quote outputs, both reserve directions and fee/event/return order. The identified call edges establish where to begin a bounded static continuation; this package has not assigned historical identities to those arithmetic callees or analyzed unknown bodies. The required depth induction must also establish each quote mint and authority transition; repeated or aliased curve accounts remain outside the proved hypothesis. The absence of deeper fixtures alone is not a proof that static reconstruction is impossible.

Current source lines 70-75 and 186-212 intentionally reject deeper routes. Preserve them until those obligations close. No extension, holder, cashback, Mayhem, sell_v2, incentives, initializer or extra Metaplex lane was pursued. No build, new runtime/security probe, signed-message modification, broadcast, staging, commit or parent edit occurred. Existing whole-program inequality and incomplete historical/security reconstruction are unchanged.

## Offline verification

Run `python3 verify.py` from any working directory. Standard-library-only verification checks the exact sealed file set, SHA256, Git blob hashes of whole copied inputs, extracted-window hashes against saved mapping, direct-call and branch targets from raw SBF bytes, selected raw instruction assertions, saved receipt payload vectors and their finite coverage summary. It does not certify the prose's semantic interpretation. Full original ELF SHA256/Git identity and extraction provenance are recorded; without the full ELF or Git repository, a portable copy cannot independently rederive the association of a slice with that full blob. The association was checked during collection from the pinned Git object.

`manifest-sha256.json` excludes itself. A fresh copied-directory verification result is retained outside this seal in the worker's `verification-outcome.json`. No telemetry, mutable run log, credential or signed URL is included.
