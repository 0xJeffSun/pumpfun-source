## Summary

Research package `research/claude-pump-integration-20261027/r37-layout-24`: main-Pump layout composite **L24** on Codex Round37 (successor of `r37-layout-15`, #425).

- Archived repository build (`scripts/pump_build_verified.py --workspace-layout`, `linux-v1.44-sbf` profile, fresh target): **977/1035 normalized, 148 raw**, 1,416,296 matched text bytes; control build of Round37 primary with the same builder: 744 / 121. `verify.py` authenticates these ELFs.
- Identity-recipe build of the same source (official Linux v1.44 `sbpf-solana-solana` target libraries; retained in `identity-run/`, not authenticated by `verify.py`): 982/1035, 166 raw. The 5-window difference is the target-library TypeId functions, as in #396/#401/#425.
- vs #425 (L15): +10 normalized (`0x2d920` `0x63cf0` `0x7f010` `0x1db88` `0x45fa0` `0x1367c0` `0x6a8a8` `0x1557e8` `0x62aa0` `0x17bc48`), +1 raw (`0x17bc48`); 0 normalized and 0 raw losses. vs L12 (#401): +75 / 0 losses.
- Each window comes from a mega-run lane delivery composed one per step (L16-L24), three-way merged against the base the lane worked on; every step built clean (no stack-offset warnings) with 0 losses.

## Synthetic layout

Layout composite like L12/L15: `// layout-pad` blocks hold Source sites on the original lines; the README's contribution table marks deliveries that added or re-laid pad lines, and `0x178e0` stays labelled as a placement-only match.

## Verification

The 44-suite captured-loader corpus passes against this exact candidate: 10,468 cases, 10,464 paired diagnostic logs, 0 mismatches (`full.json.gz`, 248 s). The packet verifier passes with an empty `HOME`.

```sh
python research/claude-pump-integration-20261027/r37-layout-24/verify.py
```

Not a promoted checkpoint; `programs/pump` is unchanged and whole-ELF identity remains false.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
