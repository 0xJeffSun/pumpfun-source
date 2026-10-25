# Mayhem24 field-role crosswalk

This read-only crosswalk explains neutral fields in the accepted Mayhem24 source. It does not rename them, change account layouts, compile a candidate, run transactions or add handler/comparison coverage. Exact historical field names and original Rust types remain unavailable. Roles below describe the recovered candidate; parity with the captured original is limited to the previously published finite fixtures. This is not a fresh proof of every original field use or a completed security audit.

The frozen source archive and all fourteen compiler inputs are bound in `inputs.json`. `crosswalk.json` records exact source lines for the six accepted trade bodies: legacy buy/sell, v2 buy/sell and PumpSwap buy/sell. Offsets below are serialized account byte offsets **including the eight-byte discriminator**, not Rust memory offsets or instruction-argument offsets. `Option` argument encoding is variable length and is not described by these offsets.

## GlobalParams update arguments

The serialized account is 254 bytes. The sixteen option arguments write the fields below through `update_global_params`; their names remain neutral. Seven fields lack a demonstrated role in the six trade bodies reviewed here. Their absence from those reads is not proof they are unused elsewhere.

| Argument | Account offset | Bytes | Observed role in recovered trade bodies |
| --- | ---: | ---: | --- |
| `field_0` | 8 | 4 | Unresolved by the six trade-body reads examined here. |
| `field_1` | 12 | 4 | Unresolved by the six trade-body reads examined here. |
| `field_2` | 16 | 8 | Optional per-trade quote budget cap in native accounting; zero leaves this cap inactive. |
| `field_3` | 24 | 8 | Unresolved by the six trade-body reads examined here. |
| `field_4` | 32 | 8 | Strict overall native quote-deployment limit on buys with a positive counter; compares the low u64 limb. |
| `field_5` | 40 | 8 | Strict per-coin native quote-deployment limit on buys with a positive counter; compares the low u64 limb. |
| `field_6` | 137 | 1 | Unresolved by the six trade-body reads examined here. |
| `field_7` | 146 | 8 | Trade interval, decoded as i64 in the six recovered trade bodies; skipped when interval or last timestamp is zero. |
| `field_8` | 154 | 8 | Unresolved by the six trade-body reads examined here. |
| `field_9` | 129 | 8 | Minimum native quote reserves on transition from a state other than Variant1; real reserves for Pump, effective reserves for PumpSwap. |
| `field_10` | 166 | 8 | Unresolved by the six trade-body reads examined here. |
| `field_11` | 182 | 8 | Optional per-trade quote budget cap for non-native accounting; zero leaves this cap inactive. |
| `field_12` | 190 | 8 | Strict overall non-native quote-deployment limit on buys with a positive counter; compares the low u64 limb. |
| `field_13` | 198 | 8 | Strict per-coin non-native quote-deployment limit on buys with a positive counter; compares the low u64 limb. |
| `field_14` | 222 | 8 | Minimum non-native quote reserves on transition from a state other than Variant1. |
| `field_15` | 230 | 8 | Unresolved by the six trade-body reads examined here. |

Native accounting uses SOL/default or WSOL classification as implemented by each handler. Non-native accounting selects the separate quote cap, risk limits and reserve floor. Native accounting, native transfer mechanics and event masking are distinct conditions in the recovered v2/PumpSwap source; this table does not collapse them into one behavior.

The interval argument is serialized as u64 but interpreted as i64 by these trade bodies. The quote-deployment counters use signed i128 arithmetic; the buy-side risk check tests positivity and then compares a truncated u64 limb. Those are observed candidate operations retained from earlier bounded recovery, not a recommendation to change arithmetic or a new vulnerability finding.

## MayhemState

The recovered serialized account is 106 bytes. These role descriptions do not establish historical names, all signedness choices or a complete state machine.

| Field | Account offset | Bytes | Observed role |
| --- | ---: | ---: | --- |
| `field_8` | 8 | 8 | No role established in the six trade bodies. |
| `end_timestamp` | 16 | 8 | Signed timestamp upper bound for trading. |
| `mint` | 24 | 32 | Serialized mint field; this crosswalk does not infer all validation or initializer behavior. |
| `field_56` | 56 | 16 | Per-coin signed net quote deployment: buy adds the measured quote/SOL-vault balance decrease; sell subtracts the measured balance increase. |
| `field_72` | 72 | 16 | Signed base-token net accounting: buy subtracts actual tokens received; sell adds actual tokens sent. |
| `flag_88` | 88 | 1 | No role established in the six trade bodies. |
| `field_89` | 89 | 8 | Last trade timestamp written from Clock; read as i64 for interval checking. |
| `status` | 97 | 1 | Three-variant decoder; trade bodies check Variant1 and set it after the minimum-reserve check. No full lifecycle inferred. |
| `burned_amount` | 98 | 8 | Not read in the six trade bodies; the name comes from the separately recovered burn path. |

Native PumpSwap measures the SOL-vault balance after closing the WSOL quote account back into it. The measured change therefore includes account-close proceeds and does not isolate swap consideration.

The initializer remains outside this work. No caller, signer or initializer workaround was examined. Current whole-program byte identity is false, and previously documented diagnostic differences remain.

Run `python3 repro/mayhem/field-role-crosswalk/verify.py` to check frozen source/archive bindings and every quoted source line. This verifies document provenance only; it does not execute Mayhem or prove the semantic descriptions exhaustively.
