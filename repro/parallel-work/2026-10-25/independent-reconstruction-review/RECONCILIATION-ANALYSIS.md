# Why the recovery layer keeps getting reverted — and how to make it stick

_2026-10-25. Written after the recovery layer (pump 56/56 + mayhem 25/25) was pushed to `main`
three times (`998a2275`, `72ef617a`, and this one) and reverted from active source each time. This
is not a race or a bug — it is a deliberate admission policy. This documents what differs, why, and
the options to make the layer durable. Lives under `repro/` on purpose: the reconciliation preserves
`repro/` research even when it reverts active source._

## What the two sides are
- **Active `main` (the "verified projection").** Produced by the layered-pass reconstruction program.
  Its own ledger (`outputs/upstream-reconciliation.md`) states current acceptance: **140/150 bounded
  implemented handlers, 5 partial, 5 unrecovered; exact whole-file identity 0/4 core programs, 2/5
  dependency captures.** Pump's accepted source gates OUT the handlers it has not independently
  admitted (e.g. `create_v2` carries `require!(!is_mayhem_mode, ReconstructionBranchUnsupported)`).
- **The recovery layer** (this push). Ten source files restored to `14ec9b5c`: the three recovered
  pump handlers (`claim_token_incentives`, `admin_update_token_incentives`, `set_mayhem_virtual_params`)
  with their modules + event, the `create_v2` Mayhem branch, the `trade.rs` v3 quote branches, and
  mayhem `initialize_mayhem_state`; plus `status.json` re-pointed to the dispatch-complete candidates.
  These rebuild **byte-identically** from committed source (pump `5392c9a9`, mayhem `cbe8c8e7`) and are
  behaviorally validated (LiteSVM differential oracles, mismatches=[]; the `@pump-fun` SDK flows on
  localnet).

## Why they differ (the actual mechanism)
`main` is governed by an **upstream-reconciliation pipeline**. When a push it did not produce lands on
`main`, the next automation commit (e.g. `9260379a` "Retain incoming source variants and restore
verified compiler bindings"):
1. **Preserves** every incoming blob exactly as passive data under
   `repro/upstream-reconciliation/main-<sha>/incoming/` — with git blob IDs, SHA256, lengths, the
   author commit, a `manifest.json` and a `verify.py`. (My `72ef617a` is archived there in full.)
2. **Restores** the selected compiler inputs + `status.json` to the verified projection — i.e. removes
   the recovery from *active* source.
3. Records the branch disposition in `repro/branch-consolidation/2026-10-25/dispositions.json`.
   `codex/layered-reconstruction` is dispositioned **"archive only; retire superseded/unsafe
   experiment."**

The pipeline's stated reason is a single, consistent **admission bar**, quoted from its own README:
> "Candidate/status promotion and repeat-build equality to a reconstructed candidate **do not
> establish full equality to the original capture.**"

That is the whole story. The recovery layer is **byte-reproducible from source** and **behaviorally
equivalent**, but it is **not byte-identical to the deployed original** (`full_byte_equality = false`,
which the layer itself has always declared). The program admits to *active* source only inputs that
clear byte-equality-to-original / source-binding verification. By that bar the recovery handlers are
"excluded Pump handlers," so every push is correctly quarantined, not adopted.

Two honest, non-contradictory scorecards result:
| view | metric | value |
|---|---|---|
| reconstruction program (byte-equality bar) | accepted implemented handlers | 140/150; **0/4 byte-identical** |
| recovery layer (behavioral/dispatch bar) | pump dispatch / mayhem dispatch | 56/56 · 25/25, SDK-validated, **not byte-identical** |

Neither is wrong; they measure different things. The byte-equality gap is **externally bounded** —
the lost authentic source + `Cargo.lock` cannot be recovered from a stripped binary (proven: even
pump_fees with all handlers + the correct v1.44 compiler is not byte-equal). So the recovery layer
**can never clear the active-source bar** under the current policy.

## What we learned → how to improve
Re-pushing the layer onto active `main` is futile by design: it will be archived + reverted every
time, and it churns `main`. Better paths, in order of recommendation:

1. **Make the behavioral layer the durable, first-class home (works today, no policy change).** The
   layer's real value — local SDK integration testing — does **not** need active-source adoption. The
   persistent pieces already survive reconciliation because they live under `repro/`:
   the byte-reproducible candidate builds (`repro/pump/recovered-dispatch-56-from-main-v144/`,
   `repro/mayhem/recovered-dispatch-25-from-main-v152/`), the SDK harnesses
   (`…/sdk-integration-test/`), and this analysis. Point SDK testing at those candidates and stop
   patching active source. This is the lowest-friction fix and matches the original goal.
2. **Feed the layer through the reconciliation pipeline's review path, not the active-source gate.**
   The pipeline already captures incoming variants with a `verify.py` and keeps them "available for
   later permitted review." Supplying the differential-oracle evidence (mismatches=[]) and the
   byte-reproducibility proof in that folder lets a reviewer *admit* handlers deliberately, instead of
   the automation silently excluding them.
3. **If the team wants these active, it is a policy decision, not a code fix.** The program would need
   a second, explicitly-labeled acceptance tier — "behaviorally validated / dispatch-complete / not
   byte-equal" — distinct from "byte-equal to original." Only the owner of the reconstruction policy
   can add that tier. Until then, active `main` will (correctly, per its own rules) exclude them.

**Bottom line:** the layer and the program disagree only on *one axis* — byte-equality to the original
capture — and that axis is externally blocked. The improvement is to stop fighting the active-source
gate and treat the recovery as the validated behavioral layer it is, under `repro/`, where it persists
and serves the SDK-testing goal.
