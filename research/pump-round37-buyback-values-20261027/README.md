# Buyback recipient compared-value recovery

The existing pairwise equality checks use require_neq rather than require_keys_neq, retaining the generic string compared-values representation observed in the original binary. Source locations move into the existing blank lib.rs region: nonzero validation at 1895 and duplicate validation at 1905. The checks and admission order are otherwise unchanged. This reproduces the original 5,464-byte method at 0x98af0.

Native Linux research matches rise from 789 to 790 / 1,035, retaining every earlier match. Fresh repeated builds reproduce both ELF artifacts identically. The method has a closed bounded direct-call graph of 32 matching function pairs and 145 edges. Readonly/data bindings, indirect calls and whole ELF equality remain outside this check.

The existing 351-case configuration suite never supplies recipient accounts. A new focused harness therefore checks 42 lists: a valid list, zero keys, all 28 duplicate pairs, and account counts. It reuses the existing configuration fixture setup/execution via an AST adaptation that only adds remaining account metas; no binary or instruction implementation is altered. Compared-value log lines are checked explicitly in addition to errors, account bytes/lamports, balances, events and inner instructions.

The exact 790 candidate passes all 42 targeted cases and the existing 351 configuration cases. The retained 789 control fails exactly the 28 duplicate-pair cases, solely on compared-value log formatting. These suites are reported separately; their controls can overlap. Maintained source/checkpoint unchanged. No original executable bytes enter compilation and no linked output is edited.
