# Review of parallel research PR #264

Reviewed head: `204ee2513d0532193ad88ca4ea43f00a765bcc99`. All seven lane packets are retained as research. Their different baselines and gains are not added together or promoted into the maintained Pump/AMM selections.

| Packet | Independently checked during review | Remaining limitation |
| --- | --- | --- |
| [Metaplex](../claude-deps-metaplex-20261027/README.md) | Entire 707,448-byte stripped ELF equals the original prefix; 1,251/1,251 raw windows; 147 retained cases and 294 transaction signatures; upstream Utilize source plus the three patches reproduce the submitted source hash | The 86,543 zero bytes form a separate allocation image. Unstripped repeat-build outputs are not retained; no fresh build or loader deployment was performed by this review. Selection is unchanged. |
| [AMM layout](../claude-layout-amm-20261027/README.md) | Regenerated linker scripts, measured both layouts at 599 normalized / 166 raw, and confirmed no lost baseline matches | Measured against the older 599-window baseline. The 17,462-case runtime evidence here is summarized, not a new independent replay. |
| [Pump layout](../claude-layout-pump-20261027/README.md) | Recomputed Round20/21/22 layouts, preserved normalized sets, verified whole-file translation and seven corruption controls | Gains of twelve raw windows apply to each recorded old baseline; current source composition is pending. |
| [AMM low](../claude-amm-lo-20261027/README.md) | Reviewed source proposal, build/measurement records and stated source-coordinate assumptions | Candidate ELF absent; reported 624-window result is not independently remeasured. May overlap the maintained 623-window recovery. |
| [AMM middle](../claude-amm-mid-20261027/README.md) | Reviewed event-builder source proposal and retained focused results | Candidate ELF absent; reported 600-window result is not independently remeasured. |
| [AMM high](../claude-amm-hi-20261027/README.md) | Reviewed source proposal and native-only qualification | Candidate ELF absent; Linux and runtime validation remain pending. |
| [Pump high](../claude-pump-hi-20261027/README.md) | Reviewed dispatcher/authority source proposal and Round23 records | Candidate ELF absent; reported 714-window result is not independently remeasured or composed with the current checkpoint. |

The three executable packet verifiers now reject extra files, symlinks, special files and optimized Python. Metaplex signature verification requires `solders`. `test_integrity.py` checks those twelve rejection cases in isolated copies; it changes no source or captured artifact.

`metaplex-source-replay.json` records the independently authenticated upstream Git blob and resulting patched source hash. Build receipts establish reported repeat output hashes; they do not substitute for missing unstripped artifacts or a new rebuild. The Metaplex artifact result is genuine byte equality, separate from claims about historical source spelling or runtime environment.
