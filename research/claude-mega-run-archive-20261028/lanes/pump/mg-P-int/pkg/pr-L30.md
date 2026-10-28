## Summary

Research package `research/claude-pump-integration-20261027/r37-layout-30`: main-Pump layout composite **L30** on Codex Round37 (successor of `r37-layout-24`, #428).

| build | normalized | raw |
|---|---:|---:|
| source only, repository builder (`candidate.so`/`unstripped.so`, authenticated by `verify.py`) | **989/1035** | **166** |
| source + generated link order (`layout-run/`, link-only replay, not authenticated by `verify.py`) | 989/1035 | **204** |

- Builder: `scripts/pump_build_verified.py --workspace-layout --target-library-profile linux-v1.44-sbpf` (official Linux x86_64 v1.44 `sbpf-solana-solana` target libraries). This profile reproduces the lane identity recipe exactly, so the 5-window TypeId gap of the earlier `linux-v1.44-sbf` packets is gone; the Round37 control uses the same profile (749 / 133).
- vs #428 (L24, 977 archived / 982 identity): +7 normalized (`0x1c880` `0x89258` `0x58f58` `0x4eb28` `0x5a260` `0x8bbd0` `0x76a28`), each from a mega-run lane delivery composed one per step with 0 normalized and 0 raw losses. vs L12 (#401): +82, 0 losses.
- **Layout layer (labelled):** `layout-run/ordered.ld` lists `.text`, `.rodata` and `.data.rel.ro` input sections in the order **generated from the original ELF** (precedent: Fees #392, Mayhem #432; mega-run rule 4b), regenerated for this exact source with the mg-P-raw lane's generator. It adds 38 raw-equal windows and no normalized change. The source-only build remains the reference.

## Synthetic layout

Layout composite like L12: `// layout-pad` blocks hold Source sites on the original lines; the README's contribution table marks deliveries that added or re-laid pad lines, and `0x178e0` stays labelled as a placement-only match.

## Verification

The 44-suite captured-loader corpus passes against this exact (source-only) candidate: 10,468 cases, 10,464 paired diagnostic logs, 0 mismatches (`full.json.gz`, 198 s). The packet verifier passes with an empty `HOME`.

```sh
python research/claude-pump-integration-20261027/r37-layout-30/verify.py
```

Not a promoted checkpoint; `programs/pump` is unchanged and whole-ELF identity remains false.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
