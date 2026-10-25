# Fees legacy delta handoff

No concrete new source correctness/security regression established; no patch proposed. Reviewed only frozen candidate e5c811e2… under manifest56fcdea691… against published corrected proposal and pass04/audit-fees. All26 baseline/candidate source inputs checked; only sharing_update.rs changes. Candidate/symbol artifacts rehashed read-only.

Legacy authorization, slice preprocessing, recipient filtering/rescaling, owned CPI construction, early serialization and validation order agree with recorded original contracts at the reviewed source level. F1–F5 remain unresolved; F5 now describes conditional prepared payout. V2 is unchanged; its preprocessing/payout gaps remain. Full legacy and AMM CPI compiled equivalence, cleanup/data closure and lifecycle assumptions remain open.

17,461 comparisons plus10 separate donation steps are existing saved evidence; this worker did not replay them or build. No full-original or security-signoff claim. Main, excluded implementations and binaries were not edited.

Read REPORT.md and functions.json for exact spans. Run `python3 -B verify.py`; PORTABILITY.json records separate-copy verification and permitted text/missing-artifact negative tests. Export only this handoff directory, using ownedmap.json and SEAL.sha256.
