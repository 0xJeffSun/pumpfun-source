# Shared Clock snapshot for multi-hop events

The original per-hop function acquires Clock once and uses the same timestamp in
TradeEvent, CompleteEvent and PostCompleteBuyEvent. Current main after merged
PR #711 acquires Clock separately for those three constructors. This three-line
source change restores the single consumed snapshot at the original pre-event
acquisition point. Earlier fee-accrual recovery is already accepted in #711 and
is not claimed again here. No event, payment, guard, Source position or field
ordering changes.

Base: `f57bbf0dd856b101acd02c242cb5c4a56bf276b1`. Before source SHA256 is
`734bdae1189dd4e4f54a27fd215624611228f36b92d3877b63f00df19ccc9e44`;
after is `5871a2cf35ebe0db502eb242db0f1652ef93e51e4971e56483016d900349ac2b`.
`MAIN-65-BOUND.json` binds all 65 current-main standalone source Git blobs to
the actual compiled archive; this is the sole changed file. All 66 actual
workspace inputs and both local-crate compilation entries are retained in the
native cold-build evidence.

The original Clock call at `0x5b3b0+0x3018` defines timestamp `r9` at `+0x30e8`.
The full conservative instruction CFG proves that definition is the sole
reaching value at all three timestamp uses. The actual candidate Clock call at
`0x67860+0x3760` defines `r7` at `+0x3958`, again the sole reaching value at
trade-event argument `+0x3b00`, completion field `+0x3cb8`, and post-event field
`+0x4008`. Clock dominates all three uses. All conditional successors are retained;
no runtime path is forced. The actual callee-identity count changes are exactly
Clock::get 3→1 and its ProgramError conversion 3→1. All other complete callee
identities and occurrence counts remain unchanged from the accepted parent.

[Native run 40795474496](https://github.com/shawkkkkk/pumpfun-source/actions/runs/40795474496)
produces stripped `0bc4a222f4040ad49b7228cd5ce7476ce8a3c96725a4634c476bc07fd5f83c89`
and symbols `4f8f22984af1a35d9c6b0978e4d33b9e9bfe13a80188c6aabc41eb85fe3a0b14`.
The actual body is 18,056 bytes / 94 direct calls; original is 18,584 / 107,
accepted parent 18,536 / 98. It remains unmatched. The complete 1,035-window
census retains **1,019 normalized / 188 raw, zero gains and losses**. No shorter
length, whole-function equality, whole-ELF identity or security acceptance is claimed.

Fresh strict replays against original/current c0e29/candidate 0bc4 pass:

| Corpus | Parameter cases | Executed outcomes | Signature occurrences | Distinct serialized transactions |
| --- | ---: | ---: | ---: | ---: |
| Existing creation | 14 | 42 | 84 | 10 |
| Existing multi-hop | 13 | 39 | 39 | 6 |

All 81 executions use the actual captured Pump loader. Multi-hop uses the genuine
captured AMM→Pump CPI and default signature/PDA checks. All ordered log lines
except complete compute-meter lines agree, including unchanged Source records.
The middle control is the accepted **c0e29** image. The 199fd image is explicitly
the historical SDK-cohort anchor, never relabeled current.

A separate unchanged eight-case signed crossing corpus passes on original,
historical 199fd, current c0e29 and candidate 0bc4: 32 executed outcomes / 32
signature occurrences, two distinct serialized messages. Two admitted crossings
emit all three event types; four ordinary successes and two whitelist rejections
also agree. The report's historical labels `control/perhop/clock` refer to
199fd/current c0e29/candidate 0bc4 respectively. Preflight binds the unchanged
fixture SHA, actual outer AMM and inner Pump multi-hop selectors and real signer
roles before execution. No field mutation, Mayhem state, initializer, filtered
BuyV3 instruction or signer/owner/PDA bypass is introduced. Every outcome retains
its own loader observation; the wrapper's final receipt holds its last observation.
These eight records remain separate from the 13+14 corpus.

The accepted parent packets and artifacts remain untouched. This packet retains
one actual changed-source cold build, all commands/source/tool/dependency receipts,
raw reports and exact before/after source. It does not promote a new maintained
canonical image or claim the parent's complete 44-suite checkpoint for this new
source. Independent identical-source repetition is not claimed. Historical
proposal descriptors remain dispatch-time evidence, not current qualification status.

Draft pending completion of the portable final verifier and the unchanged
maintained twelve-case counter replay. Source/build/census and the above finite
runtime results are already concrete; no additional compiler variant is queued.
