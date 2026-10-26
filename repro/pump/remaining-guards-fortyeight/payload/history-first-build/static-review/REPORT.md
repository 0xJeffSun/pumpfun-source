# f290 bounded emitted CTO guard/error review

Candidate f2901021fde9354bf2d89098a3e8d8a425b60eda0faa856a2c8aef0d64e3f12f / symbols750456180883c72cc7e94692b75503043357f35222aebad6d67049af8ee2ed99. Build/controller/inventory actual exits0, source37 before/after equal, external/current/tool/SDK53/dependency252 gates recorded. Cargo0 is separately qualified by stack/backend gate0 on actual log. This review executes no target and authorizes no runtime.

## Guard closure

New full app441928..469728 is retained alongside full original141840..169240 and before441928..469744. Source incomingr4 feeOption discriminant is saved442632 at-2552; normalized holder saved443720 at-2576. Holder Some/newNone selects PDA; nonholder/newSome selects option payload, with existing missing/forbidden-option failures unchanged. Both pass the zero-target check443864/443888 first. Holder skips6019 via443912 to443928; nonholder enters446080. HolderPDA find_program_address442928 is copied to-1920; target-1888 vs holder-1920 is compared446120, equal446144 ->446304. Non-equal then fetches named sharing_config key from context168 and compares446272, equalfallthrough ->446304, non-equal446296 rejoins443928. Parser/wrapper complete normalized+relocation bodies remain equal to before (shifted16bytes); full parser and caller are retained, preserving admitted named-field mapping rather than assigning roles from offsets alone.

Both holder and nonholder converge at443928 before the single feeSome gate443952/443960. None jumps447232 past all quote tests. Some checks BondingCurve quote+40: default444040 with zero stack32, then WSOL444152, then Global+936 whitelist444240. Equal branches444064/444176/444264 all reach446520. Subsequent cashback/configuration/range guards follow this check. Source proof34ea contains the original two holder/nonholder feeSome domains and shared flag/constructor proof.

## Plain owned errors

6019 constructor446304..446512 uses ordinal19 literal1465156, typedname1196168, ToString45688, comparedNone2 at446408, code6019 at446440, natural source107/file src/admin_cto.rs, owned AnchorError converter1355368 at446480, then direct common return445448.6091 constructor446520..446728 similarly uses ordinal91 literal1465112, name446552, ToString446592, comparedNone2 at446624, code6091 at446656, natural108, converter446696, commonreturn. Neither touches with_pubkeys or with_account_name. Full converter136-byte body matches original1686320; it allocates/copies160bytes, a separate size claim. Enum names and Display selections match original InvalidCreator and CreatorFeeNotConfigurableForQuote.

## Preserved paths and exact limits

6030 remains owned CreatorShouldNotBeZero, currentline107, and compares target first/zero second via445896 converter and446048 with_pubkeys; verifier checks every32-byte tuple store.2006 remains framework ConstraintSeeds atline118 with actual holder_creator_vault key first/derivedPDA second via454816/455016; everytuple load/store checked. Both6092 remain numeric ProgramError conversions449208/456640 and borrow/reload the same current_creator header+41 through context+64. No6092 ownership restoration or late-guard removal is claimed; separate01bd/8278 packets remain immutable.

**Concrete residual:** the inline WSOL pubkey macro emits runtime from_str_const1401320 ->decode_32_const1414920 ->decode_const1410632 (and panic unwrap1410112 on invalid input). It is not an original-style direct32-byte literal comparison. Full direct helper bodies and exact43-byte token are retained. Standard base58 decoding independently equals original literal1793224, establishing intended value, but does not erase the runtime resource/order/error-path difference or prove recursive callee equivalence. Root requested a separate one-choice const refinement; f290/source/control6940 remain unchanged. This review accepts the bounded guard/owned-error observations while preserving that remaining mismatch.

## Full inventory and reproducibility

Complete original/current function/call/branch/relocation/data inventory is build-bound at analysis/full-before-after-inventory.json.gz, generated with one consistent method. Both before/after:1035original inferredwindows,780candidate symbolwindows,780candidate inferredwindows,454original/427candidate call-consistent pattern windows,1080call-consistent pairs,99ambiguous candidate rows. These are structural counts, not semantic completion or whole-program identity. Raw diagnostic/source-coordinate differences remain natural and unnormalized. No new runtime coverage exists.

`python3 -B verify_static.py --check` checks exact bound build inputs and reproduces full selected windows. `input-bindings.json` binds every external build file used, including raw ELF/symbols and actual log/attempt/exits. The packet's manifest is separately sealed. An exploratory helper-print command had a Python spacing SyntaxError before analysis ran; no compiler/VM result was changed. No ignored gate or retry occurred.
