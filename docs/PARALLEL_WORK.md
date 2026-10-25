# Parallel reconstruction workers

Nine additional independent Codex CLI workers were launched after publishing checkpoint `8099031`; all nine emitted `turn.started` and began their assigned analysis. Three native agents separately owned ordinary-token two-curve recovery, portable evidence publication and Linux pipeline review. This is a launch checkpoint, not a claim that twelve workers remain active indefinitely or that any unfinished task is complete.

| CLI worker | Assigned scope |
| --- | --- |
| pump_event | Final TradeEvent u64 attribution from ordinary legacy paths |
| pump_partials | Every remaining branch in four partial creation/trading handlers |
| amm_functions | All residual AMM function windows and create_config prerequisites |
| fees_functions | Refresh all residual Fees windows against current e501 candidate |
| mayhem_abi | Non-initializer ABI, code generation and state-field attribution |
| ata_recipe | All ATA residual windows and missing authentic build recipe |
| metaplex_utilize | Remaining Utilize body and source/relocation differences |
| donation_relay | All source-unattributed windows, dispatches and codec recovery |
| audit_coverage | Current-source audit applicability and per-function backlog |

The [launch record and exact prompts](../repro/parallel-work/2026-10-24/launch.json) retain the assignments. Each worker writes only to its own scratch directory; root reviews and integrates results. Static analysis is the first phase because the remaining binary differences require source attribution before speculative changes. The routing worker separately prepares a concrete source patch and legitimate offline fixtures. Previously stopped work is explicitly excluded from reassignment.

The installed CLI is 0.156.1. Workers use the user's configured model, the workspace-write sandbox, JSON event logs and an output file. Nested spawning is disabled in these nine processes to keep ownership explicit. No global Codex configuration was changed.

For future sessions, official OpenAI documentation exposes this configuration:

```toml
[agents]
max_concurrent_threads_per_session = 12
```

This caps spawned threads excluding the primary; `max_threads` remains a legacy alias. A host can impose a lower session limit, and changing a configuration file does not itself prove an existing chat's capacity changed. See [global subagent settings](https://learn.chatgpt.com/docs/agent-configuration/subagents#global-settings).

Independent workers can also be launched with `codex exec --sandbox workspace-write -C <assigned-directory> --json -o <result-file> -`, supplying the task on stdin. That creates separate CLI runs rather than increasing this chat's native agent allowance. See [non-interactive mode](https://developers.openai.com/codex/noninteractive). More workers consume the same account's available usage and should retain disjoint writable scopes.

## Follow-up wave

All nine initial CLI tasks exited successfully. Eight public research handoffs are [published with portable verifiers](../repro/parallel-work/2026-10-24/results/README.md). The initial audit package was withheld because it copied previously private review inputs; it does not establish audit completion. A separate public-source-only audit worker recomputes the public coverage evidence. No private audit records are included in the published worker packages.

[Seven follow-up workers](../repro/parallel-work/2026-10-24/wave2/launch.json) started on Fees initializer context layout, Fees account module reconstruction, relay fixed codecs, relay shared arithmetic, Pump ordinary partial-fill behavior, Mayhem field roles and public-source audit applicability. They preserve prior results and write separate reviewable packages. The native routing worker has positive original-only ordinary Tokenkeg two-curve fixtures and is separately authorized for one fixed-recipe candidate build and bounded regression. These are work assignments, not accepted source changes or increased completion counts.
