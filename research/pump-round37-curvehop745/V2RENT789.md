# Optional v2 rent stage: 789

Select `--stage v2rent789` on the ordinary SBPF profile. The default `curvehop745` and all six earlier selectable source stages remain unchanged, with SBF780 and unchanged-source SBPF785 still distinct profiles. No SBF result is asserted for this stage.

This isolated `v2_native_payments.rs` hunk is credited to [PR #323](https://github.com/lalalune/pumpfun-source/pull/323), exact head `e8a20069315b8c6fd645b7f3b1e7990de07b6b0d`. It retains an unused `_size` argument, uses `minimum_balance(0)`, calls the existing public legacy transfer helper, and removes the private duplicate transfer implementation. The other 59 source inputs, source caller expressions, dispatcher declarations, prior clamp/visibility changes, SDK, dependencies and flags remain unchanged. See `v2rent.patch` and `v2rent-pins.json`; the full upstream patch was not applied. Earlier attribution remains in the preceding reports.

## Measured result and argument domain

The independently qualified composition has **789 / 1,035 injective normalized windows and 131 raw windows**, retaining every visibility788 normalized and raw match. The new normalized body is original v2 rent `0x3b598`, 416 bytes; it is not a new raw match. All five direct callee bodies are same-sized and normalized-equal, including the already matched public 1,200-byte transfer. The root has no direct ELF-data operands. A separate same-source root recompilation reproduced both complete generated ELF files byte-for-byte, with all 355 compiled dependencies unchanged. Earlier unique artifacts remain preserved; the inactive historical SBF cache is explicitly archived and verified as archived, not misrepresented as a live cache. No upstream count or runtime claim is transferred.

**The source-equivalence argument is restricted to the observed zero-size callers.** Two source sites (`buy_v2.rs:229` and `sell_v2.rs:105`) produce three actual compiled callers, all previously passing literal size zero. For a hypothetical nonzero size, the new helper changes behavior; arbitrary nonzero-input API equivalence is not claimed.

The original-matched helper obtains Rent, handles its error before calculating minimum balance, passes zero to minimum balance, reads destination lamports, and transfers the full minimum only when needed. The existing public transfer has the same source signature/body as the removed private helper except visibility. No CPI was executed.

All three actual caller bodies were compared with visibility788: their complete normalized control flow differs only by removal of the unused `r2 = 0` assignment and the corresponding mechanical local-branch displacement changes. Surviving Program/Signer/destination/return argument setup, immediate pointer roles and direct-call identities remain equal; only the separately qualified v2 rent callee changes body. Additional encoded-entry checks find no local branch or explicit call/code pointer bypassing the argument setup. These checks do not establish arbitrary indirect control flow, historical caller identity or whole-program equivalence.

The four existing legacy rent callers retain complete normalized bodies and immediate call/data roles. The public transfer now has two rent callers; the obsolete private 1,192-byte transfer instance is absent. Helper and immediate callee import identities were verified.

## Preserved routes and limits

All four prior entry/IDL/event/entrypoint bodies and selectors, 113 immediate callee identities and bodies, 20 immediate data roles, entire readonly-data bytes, 644 relocated-data graph edges and 56 Anchor handler symbols remain unchanged. No new smart-contract instruction routes were observed. All earlier bounded qualified roots and caller/record bindings were rebound to this output.

The pure source suite has **52 passing tests**, including all seven stages, exact one-file change, preserved zero-size source calls and invalid-parent rejection. Materialization and these tests do not compile or execute the program.

**Runtime: NOT RUN. Whole-original binary identity: false.** The FeeConfig 1,176-versus-408 and BondingCurve dispatcher 624-versus-600 decoder gaps remain. The 27 PDA seed uses across four categories retain unresolved consumer extents/dominance. TypeId duplicate historical identity remains ambiguous; original clamp Source line 57 differs from current line 2911. No universal immediate-data, recursive-callee, allocator, general indirect-flow, whole-program semantic or historical-build equivalence is claimed. No binaries, IR, SDK/archive payloads, raw build/runtime receipts or runtime fixtures are included.
