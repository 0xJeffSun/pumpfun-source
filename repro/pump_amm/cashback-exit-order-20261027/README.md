# Legacy-buy cashback serialization order

A read-only follow-up from the original shared cashback helper (`0x351a8`–`0x37150`) identifies an unimplemented ordering detail for further recovery.

After the cashback token transfer at `0x36d58`, the original adds the creator fee to the accumulator field, stores it at `0x36ef8`, and calls `Account::exit_with_expected_owner` at `0x36f38`, targeting the 1,288-byte body at `0x48b8`. That serializer writes the eight-byte discriminator at file offset `0x11c5fe`: `56 ff 70 0e 66 35 9a fa`, which equals `sha256("account:UserVolumeAccumulator")[:8]`. Only after checking the serialization result does the helper call pool-v2 validation at `0x36fe0`.

The maintained legacy-buy source increments `cashback_earned` but currently relies on the normal final account exit; it has no explicit exit at that earlier point. End-of-transaction snapshots do not establish this intermediate ordering. The original also eagerly constructs/drops the Overflow error on the successful checked-add path, whereas the current source uses a lazy closure.

A next source experiment should reproduce the explicit early accumulator exit and eager checked-add error construction, then validate existing behavior and the original call ordering. This document is static evidence, not a runtime-observed failure, full helper reconstruction, or claim that an external hook can observe the difference. No source change has been made for this observation yet.
