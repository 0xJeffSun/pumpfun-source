# Live-repo reconciliation (this checkout is shared + actively mutating)

This review ran while **one or more sibling sessions were actively working the same
checkout**. Observed during the session:

- HEAD was reported as `476ecf0` in the session-start snapshot but is actually
  **`f0c80ca`** ("Recover AMM event borrowing and publish reconstruction proposals");
  `origin/main` == local HEAD (siblings commit and push).
- Tracked files were edited under us at 00:18–00:19 by a sibling worker:
  `docs/COMPLETION.md`, `docs/PARALLEL_WORK.md`, `programs/pump-fees/README.md`,
  `programs/pump-fees/src/donation.rs` (all currently **unstaged** in the tree).
- New untracked sibling output appeared under `repro/parallel-work/2026-10-25/*`
  (handler-results, integration-hypothesis-*, pump-source-review-results,
  route-preflight-followup, application-closure-followups), `repro/ci/relay-shared108-*`,
  and `repro/pump_fees/donation-business-v144/`.

## pump_amm "stale candidate" — RESOLVED (transient read, not a bug)

Agent A read `status.json` while it still pointed at the prior AMM checkpoint
`create-config-shared-methods-v144` (`80701082…`), whose committed `candidate.so`
does not rebuild from current source. **The live `status.json` now points at
`update-event-borrow-v144` (`d27be7e9…`)**, and current `programs/pump-amm/` source
rebuilds to exactly `d27be7e9…` (confirmed by two independent fresh builds). So a
sibling was mid-promotion; the current repo is self-consistent and needs no fix.

**Net: all four current candidates of record reproduce deterministically from current
source** — pump `5c1c1c2d…` (v1.44), pump_amm `d27be7e9…` (v1.44, update-event-borrow),
pump_fees `8f89dbeb…` (v1.44), mayhem `9e4e19df…` (v1.52).

## Consequence for pushing

Because this is a single working tree with **others' uncommitted changes in it**, a
broad `git add -A` / commit would capture sibling work (including `donation.rs`).
Any push from this session must:
- stage only this review's own explicitly-listed new paths,
- never stage the sibling-modified tracked files or their untracked dirs,
- go to a dedicated branch, never directly to `main`.
