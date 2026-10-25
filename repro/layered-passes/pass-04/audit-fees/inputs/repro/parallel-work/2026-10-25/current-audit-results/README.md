# Current-source review applicability

Two immutable source reviews reconcile the published 7a9cf01 Fees and AMM implementations with earlier public observations. Fees accounts for 62 declarations,31 handlers and30 contexts; AMM accounts for117 declarations,38 instruction rows and30 contexts. These are source indices, not security coverage scores. The reviews preserve all historical observations, narrow their current applicability, and supply no new target execution or security sign-off.

Root read both full reports and passed each portable verifier before and after copying. Verification establishes input integrity and explicit source/saved-data bindings, not the truth of every semantic argument.

- [Fees review](fees_current_source_audit/REPORT.md)
- [AMM review](amm_current_source_audit/REPORT.md)
