# Future normal-operation validation matrix — descriptions only

No cases, fixtures, transactions or signatures are supplied or executed. Parent review must decide whether and when any validation is appropriate. These are normal-operation observations, not security probes or permission to reopen stopped lanes.

| Area | Future admitted normal operation | Evidence to compare after separate approval |
|---|---|---|
| Generic buy route | Distinct ordinary curves, depth 3 and a longer available route, caller-produced [1,0,...,2] | Per-hop mint/amount, actual prior curve seed mint/bump, target vault, event, final result |
| Generic sell route | Reverse distinct ordinary chain, [2,0,...,1] | Quote token transferred under preceding base-curve authority; reserve/accrual/output order |
| Local fee flags | Valid fee configuration and positive ordinary trades with each structurally allowed flag | Selector still runs for flag 0; fee masks independent of last-hop transfer; event rates/amounts |
| Selector branches | Admitted decoded native/special/stable/ordinary quote configurations of established lengths | Exact constants, first-threshold gate, reverse qualifying entry, flat/exotic enable by any of three words, creator override |
| Budget/reserves | Positive normal budgets within noncompleting reserve capacity | Ceil fees fixed before estimate correction; Q=B-pf-cf; Q-1 adapter; input precedes VB,RB,VQ,RQ stores |
| Native root buy/sell | Valid user-funded ordinary zero-quote endpoints with admitted rent state | User-to-curve System transfer; optional top-up; buyback before native sell output; stored zero versus stored WSOL |
| Existing quote vault | Valid canonical existing ordinary vault | Address then owner/data/mint admission; no added decoded-authority condition |
| Raw buyback account | Suitable normal destination supplied through raw writable slot | No parser token-membership guard; exact Tokenkeg transfer or native move/self-CPI/SyncNative interfaces |
| Event | Successful ordinary buy/sell, native and nonnative quote | 401-byte event including discriminator, 409-byte self-CPI, log ordering, final u64 zero with adapter-difference meaning |
| Serialization/return | Successful hop and complete ordinary route | Hop exit before previous-state replacement and total buyback addition; final mint check; curve vault carried even on final leg |

Compilation/API review is separately required before any of these observations. No exceptional allocator, alias, security or stopped-mode experiment is proposed. A normal-operation observation would remain finite evidence, not full historical or binary equality.
