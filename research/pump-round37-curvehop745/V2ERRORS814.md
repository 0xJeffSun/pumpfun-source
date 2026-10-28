# V2 quote funding and owned error-source stage

The optional `v2errors814` stage follows `next369810` and retains all thirteen prior source stages and the default. It changes only `migrate_v2.rs` and `sell_v2.rs`; the other 59 inputs remain exact, for 61 source inputs total. The negative receiver-ownership experiment is not included.

## Attribution and exact rebase

This stage credits [#371](https://github.com/lalalune/pumpfun-source/pull/371) for migration post-completion quote accounting and [#375](https://github.com/lalalune/pumpfun-source/pull/375) for sell fee-error boundaries. The supplied patches were authenticated at cumulative head `0b3cd8341fd7f40aa0384851c8a4e7ddf67c0f01`.

One migration hunk carried stale manual Token-2022 harvest code as context. The local rebase explicitly replaces that context with the unchanged, previously qualified harvest-wrapper invocation on both sides before strict hunk application. It does not fuzz away or overwrite the earlier validation/account-info-order repair. The entire appended harvest wrapper is retained. Existing migration line count and external instruction signatures remain unchanged.

The four named lazy callbacks are inferred source boundaries, not proven historical function names. Their ordinary `inline(never)` declarations are backed by original standalone 520-byte error bodies and actual incoming failure roles, rather than adopted solely because an upstream patch used the attributes. No compiler/SDK modification, forced layout, custom IR pass or optimization sweep is used.

## Accepted bounded static-plus-repeat result

The accepted checkpoint has **814 / 1,035 injective normalized original windows and 133 raw windows**, with every accepted 810/133 identity retained. Four new original 520-byte bodies are recovered: migration quote-balance error, and sell protocol-fee, creator-fee and transfer-fee errors. The existing migration addition/subtraction error bodies were requalified and are not counted as new gains.

All six complete error bodies, immediate callee identities/sizes, 42 concrete data operands, three typed records, imports and owned Result interfaces were checked. Error 6024 and physical Source locations `migrate_v2.rs:309/313/326` and `sell_v2.rs:366/368/386` match the original evidence.

## Actual caller order and domain

Migration intentionally repairs funding: checked real quote plus post-completion quote precedes native-only checked fee subtraction. Actual fields +96/+152 and global +1040, the zero-quote-mint native predicate, scalar funding argument and post-funding balance subtraction were inspected. Addition overflow and native underflow return owned errors before funding; balance underflow returns before the subsequent success block. Nonnative funding uses the sum. This changes nonzero/invalid-input behavior relative to the incomplete baseline and is not claimed baseline-equivalent. Cached Anchor fields and the absence of an explicit reload are source observations, not guarantees about arbitrary external CPI account state.

Sell retains protocol subtraction, creator subtraction, native-zero or token transfer-fee calculation, transfer-fee subtraction, minimum-output comparison, reserve arithmetic and later transfer ordering. Actual local scalar slots, callback targets and error CFGs are checked. The new source changes error provenance intentionally while preserving those bounded numeric/error-order roles.

All 236 old direct-call occurrences inside the two changed handlers are classified, along with 56 data-pointer occurrences and resolved dynamic-import names. Migration retains its 103 old calls and adds the balance callback. Sell replaces four old shared-sub occurrences with three callbacks: the fourth was a repeated pure subtraction on `require_gte`'s comparison-error formatting arm, after the same subtraction had already succeeded. Its actual two scalar arguments remain unchanged on that path. The eliminated error-drop arm belonged only to the impossible repeated-underflow case; this is not a general permission to omit reachable owned-error cleanup. Other old callee multiplicities remain, and full callee bodies retain their prior identities. This inventory is not a claim that linear instruction offsets establish whole-handler execution order.

The prior Token-2022 harvest chain and typed incoming account-pointer, clone, constructor-validation and info-order checks remain qualified. All 30 prior clamp-helper argument sites are retained, including the changed sell caller's Source 82/error 6022. No runtime or unrestricted indirect-control-flow claim follows from those checks.

## Global preservation and open work

Exactly two existing handler bodies change. The other 976 complete bodies retain normalized instructions, typed targets, imports, 10,678 direct edges and 5,063 pointers. Every old readonly literal, all 32,059 rodata bytes and all 645 readonly-record relocations remain exact under transport. Dispatcher/selectors remain preserved; the two changed business handlers are still original-unmatched. No unresolved panic-coordinate change occurs in this stage.

The fee calculator's 696-versus-640 and inverse wrapper's 688-versus-632 original-body gaps remain open. Earlier BondingCurve dispatcher, bounded PDA extents, specialized-handler gaps, unresolved panic origins, duplicate historical-instance ambiguity and original split consumer 527864 remain limited. FeeConfig's recovered 1,176-byte boundary and all other accepted roots remain retained.

The 102 pure source tests pass across fourteen selectable stages. A separate compilation of the exact same source reproduced both complete generated ELF files byte-for-byte. Independent preservation and backend-diagnostic checks passed. This is the accepted bounded static-plus-repeat checkpoint, not runtime validation. Runtime, VM, CPI fixtures and all held Mayhem execution remain **NOT RUN**. Full original binary identity remains **false**; no transactions, merge or deployment are included.
