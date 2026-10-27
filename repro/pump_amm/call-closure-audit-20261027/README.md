# AMM call-closure and bounded-data audit

This read-only audit binds the captured original to candidate
`fe3c75511a1499b496649313dc57a8fce0cacc88ceb23406a59be522dae458bf`.
It tightens the existing function-window evidence without changing the retained
normalization or the executable.

The 540 original windows with matching bodies have 1,639 candidate body-pairs,
because many small generic functions have several possible matches. Starting
from that relation, the verifier removes each pair whose actual direct call at
the corresponding instruction points outside the relation. Repeating to a fixed
point handles cycles and rejects misleading same-shaped callers.

| Verified structural scope | Original windows | Candidate pairs |
| --- | ---: | ---: |
| Existing body matches | 540 | 1,639 |
| Internally closed direct-call relation | 480 | 1,270 |
| Also no transitive indirect calls | 259 | 967 |
| Also no transitive external calls or recorded static-data relocations | 71 | 733 |

These are non-injective structural relations, not a one-to-one original source
mapping. External provider behavior, unrecognized static addresses, indirect
targets, memory semantics and whole-program identity remain unproved. In
particular the entrypoint body matches but its dispatch target does not; the
whole AMM is not inside the closed set.

`frontier.json` ranks the actual target pairs rejected from the initial relation.
It includes incoming original-caller counts, candidate symbols, original target
sizes, and instruction differences where sizes agree. Of 227 target-pairs, 191
are alternate-alias mismatches (another candidate already matches the original
callee). The other 36 comprise 17 likely source-metadata-only differences, 18
unresolved/different target shapes, and the equal-size entry dispatcher with a
different instruction comparison order. The metadata labels are documented
heuristics and do not admit a pair or erase a difference.

`literal_constraints.py` independently tracks straight-block registers to
identified string-slice or memcmp consumers across all body-pairs. All 580
observed uses match, covering 91 distinct original pointer/length slices in 108
original windows. Those checks do not cover every static reference or every
path. Observed unequal slices would remove the pair and its dependent direct
callers; none were found in this bounded set.

The dispatcher finding led to a separate source-order recovery in
[`../dispatch-order-20261027`](../dispatch-order-20261027/README.md).

Run `work/test-env/bin/python -B repro/pump_amm/call-closure-audit-20261027/verify.py`
to authenticate the reports and recompute all three audits.
