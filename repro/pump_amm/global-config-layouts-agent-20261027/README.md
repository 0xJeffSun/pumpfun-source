# GlobalConfig legacy-layout recovery

The original GlobalConfig account implementation consumes the eight-byte discriminator prefix, then selects one of three historical payload layouts:899,932 or941 bytes. The checked frontend is `0x5e778`/512 bytes; the unchecked frontend is `0x5e978`/384 bytes. They call readers at `0x5eaf8`/3,336 bytes, `0x5f800`/3,736 bytes, and `0x60698`/3,992 bytes.

The reconstruction's earlier implementation zero-padded to the newest layout and decoded one derived structure. This experiment replaces it with the observed payload dispatch and typed field-by-field reads, applying the same error conversion at each read. Absent later fields retain their documented zero/false defaults. No source coordinates, executable bytes, padding or compiler layout attributes are fabricated.

On top of the independently validated Pool reader recovery, the isolated candidate `891046afecd5db0484f87c8327038aedba39f7e703a2da149a4723d2e7020d69` matches all five complete original GlobalConfig functions and all their actual direct callee bodies under the retained normalization. It reaches554/785 normalized original windows and109 raw matches, gaining five windows with no losses. Whole-ELF identity and complete referenced-data/deeper-call closure remain unproved.

The frozen combined `state.rs` is in `work/amm-pool-layouts-agent-20261027/source-global-layouts`; `source.patch` applies just the GlobalConfig part on the Pool field-wise source, and `pool-and-global.patch` applies both recoveries on the diagnostic-parity base. Root owns integration with the separately recovered FeeConfig, creator-flag and trade-helper changes. Full25 runtime validation for this isolated combination passes17,462 cases/35,074 signed transactions, with35,418 verified signature fields and zero direct original differences (15,567 recorded log pairs;17,537 identical signed-message pairs).

`verify_static.py` and the two static evidence JSON files check the five GlobalConfig functions and eight Pool readers against complete original windows and direct calls.

The fixed-manifest `results/` archive contains source/build identity, all runtime receipts and signed sidecars, and measurements. `verify_saved.py` passed independently, including all13 recovered original functions and their direct callees. `--current-source` is only appropriate after root integrates this exact source.
