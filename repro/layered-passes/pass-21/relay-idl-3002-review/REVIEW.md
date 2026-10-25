# Relay IDL3002 owned-error boundary — source-only review

A concrete remaining source-model discrepancy is established on the already admitted checked-header discriminator-mismatch arm. Current candidate34c54b8e retains `code(3002)` plus borrowed `IdlAccount`; original W217 constructs an owned source-bearing Anchor error and then replaces its source origin with an allocated account name before returning. A coherent minimal replacement is not yet proved in this packet, so no Rust patch is supplied. This is a positive gap attribution with explicit remaining closure, not a claim that the current adapter is equivalent.

## Admission and current binding

The frozen build11 proposal already admits complete W217[609848,610936), W24[20392,21392), W218[610936,611424), and their retained ownership/error closure. This review uses those complete saved windows, not a new original opaque body. original-rows.json preserves their full calls/branches/data and original boundary qualifications. The current source is copied from the exact34c54b8e build source; no active source is edited. No fixed-authority path or success bypass is involved.

## Original mismatch arm

W217 checks length at609856/609864 and discriminator equality at609904. The equality branch continues to unchecked W218 at610696. The mismatch arm starts609912, calls662256 at609944 for name construction and665904 at610088 for formatting, then constructs error3002 at610224. The source metadata includes line36 (610240), filename length29 (610248), and literal `programs/contracts/src/lib.rs` at758374. Call652392 at610296 performs the owned error conversion. The full formatting-failure and allocation paths at610816/610896 remain retained.

The next block allocates10 bytes for `IdlAccount`, with exact inline stores at610512..610536, then stores the owned name pointer/capacity/length and AccountName origin at610560..610584. Two original enum/tag alternatives join those same final stores. Thus the transient Source origin is subsequently replaced before W217 returns; it is not legitimate to omit the intermediate construction merely because the final error is named. Original allocation/drop/error lowering remains part of the source-fidelity obligation.

The separate length<8 arm at610608..610680 constructs owned3001 and contains none of these3002 formatting/source/name operations; build11 already corrected it. This review does not regress or merge those arms. Unchecked3003 and serialization3004 remain separate boundaries.

W24 calls W217 at21048 while holding immutable account data. On error it moves tag/pointer at21080..21104 and joins cleanup at21360 before returning to the generated parser. The outer source `Cursor::typed` wraps the typed result in named(...), replacing the name again after the typed loader's borrowed guard exits. Full W24 is retained; no error-identity claim is based solely on a call offset.

## Current source discrepancy

Current checked_header has `let mut e = code(3002); e.account = Some("IdlAccount"); return Err(e)`. `code` stores only Cause::Framework(number), clears origin and allocates no owned AnchorError/name/message. named(...) mutates borrowed account for this Framework case. In contrast the same existing adapter already supports Cause::Owned for3001/3003 and `.with_account_name`, making the gap localized and actionable in principle.

A natural future correction would route3002 through the existing owned error type with authentic error name/message construction, a truthful current Source origin, and `.with_account_name("IdlAccount")` before returning. It must not insert the original filename/line as synthetic constants. However, this packet has not closed the full source-bearing constructor's name/message formatting, replacement-drop semantics and downstream lowering/logger behavior for that new Cause::Owned arm. Simply invoking the no-origin account_io_error helper would omit proved source construction; hand-writing a box/name solely from size would also be insufficient. No partial patch is advertised as complete.

## Precise next proof gate

Use only the previously retained conversion652392/full owned error name/message and drop closure to map3002's complete construction and both replacement stages into the existing source API. Verify old Source replacement destruction, name allocation-before-borrow-release, and outer parser rename/lowering in the complete caller set. Historical program module ownership/root source remains unknown; truthful Source coordinates are allowed to differ. A later concrete source diff requires root review and a separate build authorization. No new runtime fixture is proposed; ordinary12 does not cover every mismatch/header/formatter/OOM path.

Whole original byte identity, transitive formatting/data/indirect-call closure and historical build provenance remain unresolved. No compiler shaping, guessed fields, original opaque expansion, private security material, build/runtime, source/main/branch/index change or duplicate fee/Pump work occurred. `verify.py --repo .` checks exact inputs, current source branch and the admitted original machine witnesses only.
