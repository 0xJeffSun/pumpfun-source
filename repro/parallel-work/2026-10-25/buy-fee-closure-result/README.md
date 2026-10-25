# Ordinary BuyV3 fee source proposal

The [reviewed fee-selection packet](pump_buy_fee_selection_closure/REPORT.md) traces the actual BuyV3 caller to the retained fee decoder/selector and supplies concrete source corrections. It uses actual base-mint supply, complete mandatory numeric decoding, stored quote-key table selection, the configurable creator gate, and independent per-leg rounding. Original context admission/error representation and composition with the other source fragments remain separate obligations.

Root read the full report and passed its portable verifier before and after copying. No build, target execution, accepted handler count or whole-binary equivalence is supplied by this source packet.
